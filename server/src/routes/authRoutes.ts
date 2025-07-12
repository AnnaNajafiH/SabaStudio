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

const router = Router();

// Public routes
router.post('/login', validateLogin, login);
router.post('/signup', validateSignup, signup);
router.post('/logout', logout);

// Protected routes - require authentication
router.get('/profile', authenticateToken, getProfile);
router.put('/change-password/:id', authenticateToken, changePassword);
router.put('/users/:id', authenticateToken, updateUser);
router.get('/users/:id', authenticateToken, getUser);
router.delete('/users/:id', authenticateToken, deleteUser);

// Admin only routes
router.get('/users', authenticateToken, isAdmin, getAllUsers);

export default router;
