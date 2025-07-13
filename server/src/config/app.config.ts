import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 3003,
    env: process.env.NODE_ENV || 'development',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'https://sabastudio-frontend.onrender.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['set-cookie'],
    preflightContinue: true,
    optionsSuccessStatus: 204,
    developmentOrigins: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3001',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'https://sabastudio-frontend.onrender.com'
    ]
  },
  api: {
    prefix: '/api/v1',
    version: '1.0.0',
    description: 'Backend API for SabaStudio Architecture Website'
  },
  uploads: {
    directory: '../uploads',   //his tells the app where to store uploaded files (like images, PDFs, etc.).
    maxSize: '10mb'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '7d'
  }
};
