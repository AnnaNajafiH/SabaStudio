import express, { Router, Request, Response } from 'express';
import {
  getProjects,
  getProject,
  getFeaturedProjects,
  getProjectsByCategory,
  getProjectCategories,
  createProject,
  updateProject,
  deleteProject,
  toggleFeatured,
  togglePublished
} from '../controllers/projectController';
import { authenticateToken } from '../middleware/auth';
import { isAdmin } from '../middleware/adminAuth';

const router = Router();

// Public routes
router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/categories', getProjectCategories);
router.get('/category/:category', getProjectsByCategory);
router.get('/:id', getProject);

// Admin routes - protected with authentication and admin check
router.post('/', authenticateToken, isAdmin, createProject);
router.put('/:id', authenticateToken, isAdmin, updateProject);
router.delete('/:id', authenticateToken, isAdmin, deleteProject);
router.patch('/:id/featured', authenticateToken, isAdmin, toggleFeatured);
router.patch('/:id/published', authenticateToken, isAdmin, togglePublished);

export default router;