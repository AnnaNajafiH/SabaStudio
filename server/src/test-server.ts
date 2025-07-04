// Use test-server.ts when:
// ❌ Database is not available
// ❌ You want quick API testing
// ❌ Testing frontend without full backend
// ❌ Developing contact form functionality

import express, { Request, Response } from 'express';
import cors from 'cors';
import { body, validationResult } from 'express-validator';

const app = express();
const PORT = process.env.PORT || 3003; 

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// In-memory storage for testing (replace with database in production)
const contacts: any[] = [];

// Contact form validation
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

// Test contact form submission
app.post('/api/v1/contact', contactValidation, (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        data: {
          errors: errors.array()
        }
      });
    }

    const { name, email, phone, subject, message } = req.body;

    // Create contact object
    const contact = {
      id: Date.now(),
      name,
      email,
      phone: phone || null,
      subject,
      message,
      status: 'new',
      createdAt: new Date(),
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    // Store in memory (replace with database)
    contacts.push(contact);

    console.log('📧 New contact form submission:', {
      name,
      email,
      subject,
      timestamp: contact.createdAt
    });

    // Simulate email sending (replace with actual email service)
    console.log('📧 Email notifications would be sent to:');
    console.log(`   - Admin notification: New contact from ${name}`);
    console.log(`   - Customer confirmation: Thank you ${name}`);

    // Return success response
    return res.status(201).json({
      status: 'success',
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: contact.id,
        submittedAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Unable to submit your message at this time. Please try again later.',
      data: null
    });
  }
});

// Get all contacts (for testing)
app.get('/api/v1/contact', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Contacts retrieved successfully',
    data: {
      contacts: contacts.map(c => ({
        id: c.id,
        name: c.name,
        email: c.email,
        subject: c.subject,
        status: c.status,
        createdAt: c.createdAt
      })),
      total: contacts.length
    }
  });
});

// Welcome route
app.get('/api/v1', (req: Request, res: Response) => {
  res.json({
    message: 'SabaArchitect API - Test Server',
    version: '1.0.0-test',
    endpoints: {
      contact: '/api/v1/contact',
      testContacts: 'GET /api/v1/contact'
    },
    database: 'In-memory (for testing)',
    totalContacts: contacts.length
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    data: null
  });
});

// Error handler
app.use((error: any, req: Request, res: Response, next: any) => {
  console.error('Server error:', error);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    data: null
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Test server started successfully');
  console.log(`📍 Server running on: http://localhost:${PORT}`);
  console.log('📋 Available endpoints:');
  console.log(`   - API Info: http://localhost:${PORT}/api/v1`);
  console.log(`   - Contact Form: POST http://localhost:${PORT}/api/v1/contact`);
  console.log(`   - View Contacts: GET http://localhost:${PORT}/api/v1/contact`);
  console.log('');
  console.log('💡 This is a test server without database dependency');
  console.log('📧 Email notifications are simulated (logged to console)');
});
