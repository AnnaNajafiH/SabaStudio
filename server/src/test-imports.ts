// This test-imports.ts file is a diagnostic/debugging tool used to verify that all the TypeScript imports and module dependencies are working correctly in your backend project.

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
