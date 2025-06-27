// This is a test file to verify imports work correctly
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import apiRoutes from './routes';

console.log('All imports working correctly!');
console.log('connectDatabase:', typeof connectDatabase);
console.log('errorHandler:', typeof errorHandler);
console.log('notFoundHandler:', typeof notFoundHandler);
console.log('apiRoutes:', typeof apiRoutes);

export {};
