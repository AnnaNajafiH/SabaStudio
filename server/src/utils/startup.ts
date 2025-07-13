import { config } from '../config/app.config';
import { connectDatabase } from '../config/database';
import { Application } from 'express';

export const startServer = async (app: Application): Promise<void> => {
  try {
    try {
      await connectDatabase();
    } catch (dbError) {
      console.warn('⚠️ Database connection failed, running without database:', (dbError as Error).message);
    }
    
    // Start HTTP server
    app.listen(config.server.port, () => {
      console.log(`🚀 Server is running on port ${config.server.port}`);
      console.log(`📖 Environment: ${config.server.env}`);
      console.log(`🔗 Health check: http://localhost:${config.server.port}/health`);
      console.log(`📡 API endpoint: http://localhost:${config.server.port}${config.api.prefix}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};
