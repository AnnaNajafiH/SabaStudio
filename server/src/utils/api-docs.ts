// contains a structured overview of your API
import { config } from '../config/app.config';

export const apiDocs = {
// Main welcome/overview
  root: {
    status: 'success',
    message: 'Welcome to S-Studio API',
    version: config.api.version,
    description: config.api.description,
    endpoints: {
      health: '/health',
      api: config.api.prefix,
      projects: `${config.api.prefix}/projects`,
      contact: `${config.api.prefix}/contact`,
      auth: `${config.api.prefix}/auth`
    },
    documentation: {
      projects: {
        'GET /api/v1/projects': 'Get all projects with pagination and filtering',
        'GET /api/v1/projects/featured': 'Get featured projects',
        'GET /api/v1/projects/categories': 'Get project categories',
        'GET /api/v1/projects/:id': 'Get specific project by ID'
      },
      contact: {
        'POST /api/v1/contact': 'Submit contact form',
        'GET /api/v1/contact/test': 'Test email service (admin only)'
      }
    }
  },
  
// Health check endpoint response
  health: {
    status: 'OK',
    message: 'S-Studio API is running'
  }
};
