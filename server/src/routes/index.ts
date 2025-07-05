import express, { Router, Request, Response } from 'express';
import projectRoutes from './projectRoutes';
import authRoutes from './authRoutes';
import contactRoutes from './contactRoutes';

const router = Router();

// API Routes
router.use('/projects', projectRoutes);
router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);

// Welcome route
router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Welcome to S-Studio API v1',
    version: '1.0.0',
    endpoints: {
      projects: {
        base: '/api/v1/projects',
        featured: '/api/v1/projects/featured',
        categories: '/api/v1/projects/categories',
        byCategory: '/api/v1/projects/category/:category',
        byId: '/api/v1/projects/:id'
      },
      contact: {
        submit: 'POST /api/v1/contact',
        test: 'GET /api/v1/contact/test'
      },
      auth: {
        login: 'POST /api/v1/auth/login'
      }
    },
    timestamp: new Date().toISOString()
  });
});

export default router;
