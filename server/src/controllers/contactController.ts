import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Contact } from '../models';
import { emailService } from '../services/emailService';

/**
 * Contact Controller
 * Handles all contact form related business logic
 */
export class ContactController {
  
  /**
   * Submit a new contact form
   * POST /api/v1/contact
   */
  static async submitContact(req: Request, res: Response): Promise<void> {
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
      const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
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

      // Send email notifications (don't wait for completion)
      Promise.all([
        emailService.sendAdminNotification(savedContact),
        emailService.sendCustomerConfirmation(savedContact)
      ]).then(([adminSent, customerSent]) => {
        console.log(`📧 Email notifications: Admin=${adminSent ? '✅' : '❌'}, Customer=${customerSent ? '✅' : '❌'}`);
      }).catch((emailError) => {
        console.error('📧 Email notification error:', emailError);
      });

      // Return success response (don't expose internal details)
      res.status(201).json({
        status: 'success',
        message: 'Thank you for your message! We will get back to you soon.',
        data: {
          id: savedContact._id,
          submittedAt: savedContact.createdAt
        }
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      
      // Handle duplicate email within short time frame
      if (error && typeof error === 'object' && 'code' in error && (error as any).code === 11000) {
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
  }

  /**
   * Get all contact messages with pagination and filtering
   * GET /api/v1/contact
   */
  static async getAllContacts(req: Request, res: Response): Promise<void> {
    try {
      const { status, page = 1, limit = 10 } = req.query;
      
      // Build query
      let query = {};
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
  }

  /**
   * Get a specific contact message by ID
   * GET /api/v1/contact/:id
   */
  static async getContactById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const contact = await Contact.findById(id);
      
      if (!contact) {
        res.status(404).json({
          status: 'error',
          message: 'Contact message not found',
          data: null
        });
        return;
      }

      // Mark as read if it's new
      if (contact.status === 'new') {
        await contact.markAsRead();
      }

      res.json({
        status: 'success',
        message: 'Contact message retrieved successfully',
        data: { contact }
      });

    } catch (error) {
      console.error('Get contact error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Unable to retrieve contact message',
        data: null
      });
    }
  }

  /**
   * Update contact message status
   * PUT /api/v1/contact/:id/status
   */
  static async updateContactStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = ['new', 'read', 'replied', 'archived'];
      if (!validStatuses.includes(status)) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid status. Must be one of: ' + validStatuses.join(', '),
          data: null
        });
        return;
      }

      const contact = await Contact.findById(id);
      
      if (!contact) {
        res.status(404).json({
          status: 'error',
          message: 'Contact message not found',
          data: null
        });
        return;
      }

      contact.status = status;
      await contact.save();

      res.json({
        status: 'success',
        message: 'Contact message status updated successfully',
        data: { contact }
      });

    } catch (error) {
      console.error('Update contact status error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Unable to update contact message status',
        data: null
      });
    }
  }

  /**
   * Delete a contact message
   * DELETE /api/v1/contact/:id
   */
  static async deleteContact(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const contact = await Contact.findById(id);
      
      if (!contact) {
        res.status(404).json({
          status: 'error',
          message: 'Contact message not found',
          data: null
        });
        return;
      }

      await Contact.findByIdAndDelete(id);

      res.json({
        status: 'success',
        message: 'Contact message deleted successfully',
        data: null
      });

    } catch (error) {
      console.error('Delete contact error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Unable to delete contact message',
        data: null
      });
    }
  }

  /**
   * Test email functionality
   * POST /api/v1/contact/test-email
   */
  static async testEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      
      if (!email) {
        res.status(400).json({
          status: 'error',
          message: 'Email address is required for testing',
          data: null
        });
        return;
      }

      const success = await emailService.sendTestEmail(email);
      
      if (success) {
        res.json({
          status: 'success',
          message: `Test email sent successfully to ${email}`,
          data: { emailSent: true }
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'Failed to send test email. Check server logs for details.',
          data: { emailSent: false }
        });
      }

    } catch (error) {
      console.error('Test email error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Unable to send test email',
        data: null
      });
    }
  }
}
