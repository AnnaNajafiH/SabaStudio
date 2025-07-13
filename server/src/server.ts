import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
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
    await connectDatabase();
    console.log('🗄️ Database connection successful');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
