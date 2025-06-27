import { Router } from 'express';
import projectRoutes from './projectRoutes';
import authRoutes from './authRoutes';
import contactRoutes from './contactRoutes';

const router = Router();

// API Routes
router.use('/projects', projectRoutes);
router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);

// Welcome route
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SabaArchitect API',
    version: '1.0.0',
    endpoints: {
      projects: '/api/v1/projects',
      auth: '/api/v1/auth',
      contact: '/api/v1/contact'
    }
  });
});

export default router;
