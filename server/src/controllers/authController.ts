import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { config } from '../config/app.config';

//==========================================================================
// Helper function to set auth cookie
//==========================================================================
const setAuthCookie = (res: Response, token: string) => {
  // Set httpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: config.server.env === 'production', // true in production
    sameSite: config.server.env === 'production' ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/'
  });
};

//==========================================================================
// Register new user
//==========================================================================
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.body.name;
    const email = req.body.email?.toLowerCase().trim(); // Normalize email
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;


    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Passwords do not match',
      });
    }

    // Check if user exists with case-insensitive email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Signup failed: Email already exists:', email);
      return res.status(400).json({
        status: 'error',
        message: 'Email address is already registered',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword, 
      //no need to save confirmedpassword in database
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Set auth cookie
    setAuthCookie(res, token);

    console.log('✅ Signup successful for:', email);

    // Send response
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    console.error('❌ Signup error:', error);
    next(error);
  }
};

//==========================================================================
// Login user
//==========================================================================
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();

    console.log('🔐 Login attempt for email:', normalizedEmail);

    // Find user
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) {
      console.log('❌ Login failed: User not found:', normalizedEmail);
      return res.status(401).json({
        status: 'error',
        message: 'no user found with this email address'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Login failed: Invalid password for:', normalizedEmail);
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Set auth cookie
    setAuthCookie(res, token);

    console.log('✅ Login successful for:', normalizedEmail);

    // Send response
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    next(error);
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
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: config.server.env === 'production',
      sameSite: config.server.env === 'production' ? 'strict' : 'lax',
      path: '/'
    });

    res.status(200).json({ 
      status: 'success',
      message: 'Logged out successfully' 
    });
  } catch (error) {
    next(error);
  }
};

//==========================================================================
// Diagnostic route - Remove in production
//==========================================================================
export const checkEmailExists = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email parameter is required' });
    }

    // Find all users with similar email (case insensitive)
    const users = await User.find({
      email: { $regex: new RegExp(email as string, 'i') }
    }).select('email');

    res.json({
      exists: users.length > 0,
      matches: users.map(u => u.email),
      searchedFor: email
    });
  } catch (error) {
    console.error('Email check error:', error);
    res.status(500).json({ message: 'Error checking email' });
  }
};
