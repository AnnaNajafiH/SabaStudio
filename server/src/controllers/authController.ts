import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';



//==========================================================================
// Register new user
//==========================================================================
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res
      .cookie('token', token, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(201)
      .json({
        status: 'success',
        data: {
          token,
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
        },
      });
  } catch (error: any) {

    // Duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Email address is already registered',
      });
    }

    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        status: 'error',
        message: messages.join(', '),
      });
    }

    // Generic error
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};



//==========================================================================
// Login user
//==========================================================================

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Send cookie and response
    res
      .cookie('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({
        status: 'success',
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
  } catch (error) {
    console.error('Login error:', error);
    next(error); // Use centralized error handler
  }
};


//==========================================================================
// Logout user
//==========================================================================
export const userLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.clearCookie('token', {
      httpOnly: true,    // Should match how you set the cookie
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error)
  }
};

//==========================================================================
// Change password
//==========================================================================
export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new Error("User not found! Please login!"));
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return next(new Error("Invalid old password! Please try again!"));
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    try {
      await user.save();
    } catch {
      return next(new Error("New password could not be saved! Please try again!"));
    }

    res.status(200).json({
      success: true,
      result: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Password is successfully updated!",
    });
  } catch {
    next(new Error("Server error! Please try again!"));
  }
};

//==========================================================================
// Get user profile
//==========================================================================

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Get user ID from authenticated request
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized',
      });
    }

    // Find user by ID (excluding password)
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // Return user info
    res.json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

//==========================================================================
// Get all users (Admin only)
//==========================================================================
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      status: 'success',
      data: users
    });
  } catch (error) {
    next(error);
  }
};

//==========================================================================
// Get single user
//==========================================================================
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

//==========================================================================
// Update user
//==========================================================================
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Check if user is updating their own profile or is admin
    const requestingUserId = (req as any).user?.id;
    const requestingUserRole = (req as any).user?.role;
    
    if (userId !== requestingUserId && requestingUserRole !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this user'
      });
    }

    // If email is being changed, check if new email already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'Email already in use'
        });
      }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      status: 'success',
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

//==========================================================================
// Delete user
//==========================================================================
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const requestingUser = (req as any).user;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Only allow admin to delete other users, or users to delete their own account
    if (userId !== requestingUser.id && requestingUser.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this user'
      });
    }

    // Don't allow the last admin to be deleted
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({
          status: 'error',
          message: 'Cannot delete the last admin user'
        });
      }
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      status: 'success',
      message: 'User successfully deleted'
    });
  } catch (error) {
    next(error);
  }
};

//==========================================================================
// Logout user
//==========================================================================
export const logout = async (req: Request, res: Response) => {
  try {
    // Clear the JWT cookie
    res.cookie('token', '', {
      path: '/',
      httpOnly: true,
      expires: new Date(0), // Expire immediately
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully logged out'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error during logout'
    });
  }
};
