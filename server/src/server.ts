import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { connectDatabase, disconnectDatabase } from './config/database';
import { configureMiddleware } from './middleware/middleware.config';

// Load environment variables
dotenv.config();

//==========================================================================
// App Configuration
//==========================================================================
const app = express();
const PORT = process.env.PORT || 3002;

// Configure all middleware (security, compression, parsing, etc.)
configureMiddleware(app);

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to database first
    await connectDatabase();
    console.log('🗄️ Database connection successful');

    // Create uploads directory if it doesn't exist
    const uploadsPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath, { recursive: true });
      console.log(`📁 Created uploads directory at ${uploadsPath}`);
    }

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      console.log(`📤 API base URL: ${process.env.NODE_ENV === 'production' ? 
        'https://sabastudio-backend.onrender.com' : 'http://localhost:' + PORT}`);
    });

    // Handle server shutdown gracefully
    process.on('SIGTERM', () => {
      console.log('🛑 SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('💤 Server closed');
        disconnectDatabase().then(() => process.exit(0));
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    // Log additional diagnostic information
    console.error('Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DATABASE_URL: process.env.MONGODB_URI?.split('@')[1], // Log only the host part of the URL
      CORS_ORIGIN: process.env.CORS_ORIGIN
    });
    
    // Wait a moment before exiting to ensure logs are written
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  }
};

startServer();

export default app;
