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

const router = Router();

// Public routes
router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/categories', getProjectCategories);
router.get('/category/:category', getProjectsByCategory);
router.get('/:id', getProject);

// Admin routes (would need authentication middleware)
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.patch('/:id/featured', toggleFeatured);
router.patch('/:id/published', togglePublished);

export default router;