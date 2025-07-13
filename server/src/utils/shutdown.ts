import { disconnectDatabase } from '../config/database';

export const setupGracefulShutdown = () => {
  // Handle SIGTERM
  process.on('SIGTERM', async () => {
    console.log('🛑 SIGTERM received, shutting down gracefully');
    await cleanup();
    process.exit(0);
  });

  // Handle SIGINT
  process.on('SIGINT', async () => {
    console.log('🛑 SIGINT received, shutting down gracefully');
    await cleanup();
    process.exit(0);
  });
};

const cleanup = async () => {
  try {
    // Disconnect from database
    await disconnectDatabase();
    console.log('✅ Cleanup completed successfully');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
};
