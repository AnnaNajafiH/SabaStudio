import express, { Router } from 'express';
import { validateLogin, validateSignup } from '../validation/authValidation';
import { 
  login, 
  signup, 
  logout,
  getProfile, 
  changePassword, 
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { isAdmin } from '../middleware/adminAuth';
import { checkEmailExists } from '../controllers/authController';

const router = Router();

// Public routes
router.post('/login', validateLogin, login);
router.post('/signup', validateSignup, signup);
router.post('/logout', logout);

// Diagnostic route - Remove in production
router.get('/check-email', checkEmailExists);

// Protected routes - require authentication
router.get('/profile', authenticateToken, getProfile);
router.put('/change-password/:id', authenticateToken, changePassword);
router.put('/users/:id', authenticateToken, updateUser);
router.get('/users/:id', authenticateToken, getUser);
router.delete('/users/:id', authenticateToken, deleteUser);

// Admin only routes
router.get('/users', authenticateToken, isAdmin, getAllUsers);


// API documentation route
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Auth API endpoints',
    endpoints: {
      public: {
        'POST /auth/login': 'Login with email and password',
        'POST /auth/signup': 'Create new user account',
        'POST /auth/logout': 'Logout current user'
      },
      protected: {
        'GET /auth/profile': 'Get current user profile (requires auth)',
        'PUT /auth/change-password/:id': 'Change user password (requires auth)',
        'PUT /auth/users/:id': 'Update user profile (requires auth)',
        'GET /auth/users/:id': 'Get user by ID (requires auth)',
        'DELETE /auth/users/:id': 'Delete user (requires auth)'
      },
      admin: {
        'GET /auth/users': 'Get all users (requires admin)'
      }
    }
  });
});

export default router;
