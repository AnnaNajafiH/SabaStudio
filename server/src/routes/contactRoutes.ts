import { Router } from 'express';
import { ContactController } from '../controllers/contactController';
import { contactValidation, testEmailValidation } from '../validation/contactValidation';
import { contactRateLimit, adminRateLimit } from '../middleware/rateLimiting';

const router = Router();

/**
 * Contact Routes
 * Clean and organized routing with separated concerns
 */

// Public Routes (for contact form submission)
router.post('/', contactRateLimit, contactValidation, ContactController.submitContact);

// Admin Routes (for managing contact messages)
// Note: In production, these should be protected with authentication middleware
router.get('/', adminRateLimit, ContactController.getAllContacts);
router.get('/:id', adminRateLimit, ContactController.getContactById);
router.put('/:id/status', adminRateLimit, ContactController.updateContactStatus);
router.delete('/:id', adminRateLimit, ContactController.deleteContact);

// Utility Routes
router.post('/test-email', adminRateLimit, testEmailValidation, ContactController.testEmail);

export default router;
