import express, { Router, Request, Response } from 'express';
import { Contact } from '../models';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

const router = Router();

// Rate limiting for contact form submissions
const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    status: 'error',
    message: 'Too many contact form submissions. Please try again later.',
    data: null
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Simple validation rules for contact form
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .trim(),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

// POST /api/v1/contact - Submit contact form
router.post('/', contactRateLimit, contactValidation, async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        data: {
          errors: errors.array()
        }
      });
      return;
    }

    const { name, email, phone, subject, message } = req.body;

    // Get client information for security tracking
    const clientIP = req.ip || req.connection?.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';

    // Create new contact message
    const contactMessage = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      ipAddress: clientIP,
      userAgent
    });

    // Save to database
    const savedContact = await contactMessage.save();

    // Try to send email notifications (don't fail if email fails)
    try {
      // Dynamic import to avoid startup errors if email service fails
      const { emailService } = await import('../services/emailService');
      
      // Send emails in background (don't wait)
      Promise.all([
        emailService.sendAdminNotification(savedContact),
        emailService.sendCustomerConfirmation(savedContact)
      ]).then(([adminSent, customerSent]) => {
        console.log(`📧 Email notifications: Admin=${adminSent ? '✅' : '❌'}, Customer=${customerSent ? '✅' : '❌'}`);
      }).catch((emailError) => {
        console.warn('📧 Email notification error (non-critical):', emailError.message);
      });
    } catch (emailImportError) {
      console.warn('📧 Email service not available (non-critical):', (emailImportError as Error).message || 'Unknown error');
    }

    // Return success response
    res.status(201).json({
      status: 'success',
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: savedContact._id,
        submittedAt: savedContact.createdAt
      }
    });

  } catch (error: any) {
    console.error('Contact form submission error:', error);
    
    // Handle duplicate submissions
    if (error.code === 11000) {
      res.status(429).json({
        status: 'error',
        message: 'A message from this email was recently submitted. Please wait before submitting again.',
        data: null
      });
      return;
    }

    // Generic error response
    res.status(500).json({
      status: 'error',
      message: 'Unable to submit your message at this time. Please try again later.',
      data: null
    });
  }
});

// GET /api/v1/contact - Get all contact messages (simplified)
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    // Build query
    let query: any = {};
    if (status && typeof status === 'string') {
      query = { status };
    }

    // Calculate pagination
    const pageNum = Math.max(1, parseInt(page as string));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string)));
    const skip = (pageNum - 1) * limitNum;

    // Get contacts with pagination
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-ipAddress -userAgent'); // Hide sensitive data

    // Get total count for pagination
    const total = await Contact.countDocuments(query);

    res.json({
      status: 'success',
      message: 'Contact messages retrieved successfully',
      data: {
        contacts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Unable to retrieve contact messages',
      data: null
    });
  }
});

// Health check endpoint
router.get('/health', (req: Request, res: Response): void => {
  res.json({
    status: 'success',
    message: 'Contact API is healthy',
    data: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  });
});

export default router;
