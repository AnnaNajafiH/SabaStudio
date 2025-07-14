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
  const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      console.log(`🌐 CORS request from origin: ${origin || 'No Origin'}`);
      
      if (config.server.env === 'development') {
        console.log('✅ Development mode - allowing all origins');
        callback(null, true);
        return;
      }

      // In production, check against allowed origins
      const allowedOrigins = [config.cors.origin];
      
      // Allow requests with no origin (like mobile apps, curl)
      if (!origin) {
        console.log('✅ No origin - allowing request');
        callback(null, true);
        return;
      }

      if (allowedOrigins.includes(origin)) {
        console.log(`✅ Origin ${origin} allowed`);
        callback(null, true);
        return;
      }

      console.log(`❌ Origin ${origin} not allowed`);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  };

  console.log('🔧 CORS Configuration:', {
    environment: config.server.env,
    allowedOrigins: config.server.env === 'development' ? ['all'] : [config.cors.origin],
    credentials: true
  });

  app.use(cors(corsOptions));

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

  // Ensure uploads directory exists and is accessible
  const uploadsPath = path.join(__dirname, '..', '..', 'uploads');
  app.use('/uploads', express.static(uploadsPath, {
    maxAge: '1d',
    fallthrough: false // Return 404 if file not found
  }));
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
