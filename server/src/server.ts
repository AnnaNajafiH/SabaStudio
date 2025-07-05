import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'path';

// Import custom modules
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import apiRoutes from './routes';

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Environment variables with defaults
const PORT = process.env.PORT || 3002;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration - support multiple origins for development
const allowedOrigins = NODE_ENV === 'development' 
  ? [
      'http://localhost:5173', 
      'http://localhost:5174', 
      'http://localhost:3001',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001'
    ]
  : [
      'https://sabastudio-frontend.onrender.com',
      CORS_ORIGIN
    ];

console.log(`🔧 CORS Configuration:`, {
  NODE_ENV,
  CORS_ORIGIN,
  allowedOrigins
});

app.use(cors({
  origin: (origin, callback) => {
    console.log(`🌐 CORS request from origin: ${origin}`);
    
    // Allow requests with no origin (mobile apps, curl, Postman, etc.)
    if (!origin) {
      console.log(`✅ No origin - allowing request`);
      return callback(null, true);
    }
    
    // In development mode, be more permissive
    if (NODE_ENV === 'development') {
      if (allowedOrigins.includes(origin)) {
        console.log(`✅ Origin ${origin} allowed (in allowed list)`);
        return callback(null, true);
      }
      // For development, allow localhost and 127.0.0.1 on any port
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        console.log(`✅ Origin ${origin} allowed (localhost/127.0.0.1)`);
        return callback(null, true);
      }
    } else {
      // Production mode - strict checking
      if (allowedOrigins.includes(origin)) {
        console.log(`✅ Origin ${origin} allowed (production)`);
        return callback(null, true);
      }
    }
    
    const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
    console.log(`❌ ${msg}`);
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Compression middleware
app.use(compression());

// Logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'S-Studio API is running',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});

// Root endpoint - Welcome message
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to S-Studio API',
    version: '1.0.0',
    description: 'Backend API for SabaStudio Architecture Website',
    endpoints: {
      health: '/health',
      api: '/api/v1',
      projects: '/api/v1/projects',
      contact: '/api/v1/contact',
      auth: '/api/v1/auth'
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
    },
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});

// Database test endpoint
app.get('/test-db', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const connectionState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({
      status: 'success',
      database: {
        state: states[connectionState],
        host: mongoose.connection.host,
        name: mongoose.connection.name,
        port: mongoose.connection.port
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database test failed',
      error: (error as Error).message
    });
  }
});

// API routes
app.use('/api/v1', apiRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server function
const startServer = async (): Promise<void> => {
  try {
    // Try to connect to database (optional for development)
    try {
      await connectDatabase();
    } catch (dbError) {
      console.warn('⚠️ Database connection failed, running without database:', (dbError as Error).message);
    }
    
    // Start HTTP server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📖 Environment: ${NODE_ENV}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`📡 API endpoint: http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown:

// this signal sent when the system or a container manager tells the process to terminate (e.g., docker stop or Railway shutting down the container).
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

// this Signal sent when you press Ctrl+C in the terminal (interrupt signal).
process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer();

export default app;
