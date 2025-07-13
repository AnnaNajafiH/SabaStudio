import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';  // Add this import
import { config } from '../config/app.config';
import { apiDocs } from '../utils/api-docs';
import { errorHandler } from './errorHandler';
import { notFoundHandler } from './notFoundHandler';
import apiRoutes from '../routes';

export const configureMiddleware = (app: express.Application) => {
  //==========================================================================
  // Security Middleware
  //==========================================================================

  // Helmet for security headers
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));

  // CORS configuration with proper credentials support
  const allowedOrigins = config.server.env === 'development'
    ? config.cors.developmentOrigins
    : [config.cors.origin];

  console.log(`🔧 CORS Configuration:`, {
    environment: config.server.env,
    allowedOrigins,
    credentials: true
  });

  app.use(cors({
    origin: (origin, callback) => {
      console.log(`🌐 CORS request from origin: ${origin || 'No Origin'}`);
      
      // Allow requests with no origin (mobile apps, curl, Postman, etc.)
      if (!origin) {
        console.log(`✅ No origin - allowing request`);
        return callback(null, true);
      }
      
      // In development mode, be more permissive with localhost
      if (config.server.env === 'development' && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
        console.log(`✅ Origin ${origin} allowed (localhost/127.0.0.1)`);
        return callback(null, true);
      }

      // Check against allowed origins
      if (allowedOrigins.includes(origin)) {
        console.log(`✅ Origin ${origin} allowed (in allowed list)`);
        return callback(null, true);
      }
      
      // If we get here, the origin is not allowed
      console.log(`❌ Origin ${origin} not allowed`);
      callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,  // Enable credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Set-Cookie']  // Expose Set-Cookie header
  }));

  // Cookie parser middleware
  app.use(cookieParser());

  //==========================================================================
  // Performance Middleware
  //==========================================================================
  console.log('🚀 Configuring performance middleware...');

  // Enable compression
  app.use(compression());

  // Configure request logging based on environment
  const morganFormat = config.server.env === 'development' ? 'dev' : 'combined';
  app.use(morgan(morganFormat, {
    skip: (req) => req.url === '/health' // Skip logging health check requests
  }));

  //==========================================================================
  // Body Parsing Middleware
  //==========================================================================
  console.log('📦 Configuring body parsing middleware...');

  app.use(express.json({ 
    limit: config.uploads.maxSize 
  }));
  app.use(express.urlencoded({ 
    extended: true, 
    limit: config.uploads.maxSize 
  }));

  //==========================================================================
  // Static Files
  //==========================================================================
  console.log('📁 Configuring static file serving...');

  const uploadsPath = path.join(__dirname, '..', '..', config.uploads.directory);
  app.use('/uploads', express.static(uploadsPath));
  console.log(`📂 Serving uploads from: ${uploadsPath}`);

  //==========================================================================
  // API Routes
  //==========================================================================
  console.log('🛣️ Configuring API routes...');
  
  // Mount API routes under /api/v1
  app.use(config.api.prefix, apiRoutes);
  console.log(`📡 API Routes mounted at: ${config.api.prefix}`);

  //==========================================================================
  // Basic Routes
  //==========================================================================
  console.log('🛣️ Configuring basic routes...');

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
      ...apiDocs.health,
      timestamp: new Date().toISOString(),
      environment: config.server.env,
      uptime: process.uptime()
    });
  });

  // API Documentation root endpoint
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      ...apiDocs.root,
      timestamp: new Date().toISOString(),
      environment: config.server.env,
      version: config.api.version,
      apiBase: config.api.prefix
    });
  });

  //==========================================================================
  // Error Handling (must be last)
  //==========================================================================
  console.log('🚧 Configuring error handlers...');

  app.use(notFoundHandler);
  app.use(errorHandler);

  console.log('✅ All middleware configured successfully');
};
