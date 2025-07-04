import nodemailer from 'nodemailer';
import { IContact } from '../models/Contact';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class EmailService {
  private transporter: nodemailer.Transporter | null;
  private fromEmail: string;
  private adminEmail: string;
  private emailEnabled: boolean;

  constructor() {
    this.emailEnabled = process.env.EMAIL_ENABLED === 'true';
    this.fromEmail = process.env.FROM_EMAIL || 'noreply@sabaarchitect.com';
    this.adminEmail = process.env.ADMIN_EMAIL || 'admin@sabaarchitect.com';

    if (!this.emailEnabled) {
      console.log('📧 Email service disabled - contact forms will work without sending emails');
      this.transporter = null;
      return;
    }

    // Email configuration from environment variables
    const emailConfig: EmailConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    };

    // Validate email configuration
    if (!emailConfig.auth.user || !emailConfig.auth.pass) {
      console.warn('⚠️ Email credentials missing - disabling email service');
      this.emailEnabled = false;
      this.transporter = null;
      return;
    }

    // Create transporter
    this.transporter = nodemailer.createTransport(emailConfig);

    // Verify connection configuration
    this.verifyConnection();
  }

  private async verifyConnection(): Promise<void> {
    if (!this.transporter) {
      return;
    }
    
    try {
      await this.transporter.verify();
      console.log('✅ Email service is ready to send messages');
    } catch (error) {
      console.warn('⚠️ Email service verification failed:', error);
      console.warn('📧 Emails will not be sent. Please check your SMTP configuration.');
      this.emailEnabled = false;
    }
  }

  // Send notification to admin when new contact form is submitted
  async sendAdminNotification(contact: IContact): Promise<boolean> {
    if (!this.emailEnabled || !this.transporter) {
      console.log('📧 Email disabled - skipping admin notification');
      return true; // Return true so contact form still works
    }

    try {
      const mailOptions = {
        from: this.fromEmail,
        to: this.adminEmail,
        subject: `🎯 New Contact Form Submission - ${contact.subject}`,
        html: this.generateAdminEmailTemplate(contact),
        text: this.generateAdminEmailText(contact),
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Admin notification email sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('❌ Failed to send admin notification email:', error);
      return false;
    }
  }

  // Send auto-reply confirmation to customer
  async sendCustomerConfirmation(contact: IContact): Promise<boolean> {
    if (!this.emailEnabled || !this.transporter) {
      console.log('📧 Email disabled - skipping customer confirmation');
      return true; // Return true so contact form still works
    }

    try {
      const mailOptions = {
        from: this.fromEmail,
        to: contact.email,
        subject: `Thank you for contacting SabaArchitect - We received your message`,
        html: this.generateCustomerEmailTemplate(contact),
        text: this.generateCustomerEmailText(contact),
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Customer confirmation email sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('❌ Failed to send customer confirmation email:', error);
      return false;
    }
  }

  // Generate HTML email template for admin notification
  private generateAdminEmailTemplate(contact: IContact): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 15px; }
          .field strong { color: #374151; }
          .message-box { background: white; padding: 15px; border-left: 4px solid #2563eb; margin: 15px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Contact Form Submission</h1>
            <p>SabaArchitect - Admin Notification</p>
          </div>
          
          <div class="content">
            <div class="field">
              <strong>📝 Subject:</strong> ${contact.subject}
            </div>
            
            <div class="field">
              <strong>👤 Name:</strong> ${contact.name}
            </div>
            
            <div class="field">
              <strong>📧 Email:</strong> 
              <a href="mailto:${contact.email}">${contact.email}</a>
            </div>
            
            ${contact.phone ? `
            <div class="field">
              <strong>📱 Phone:</strong> 
              <a href="tel:${contact.phone}">${contact.phone}</a>
            </div>
            ` : ''}
            
            <div class="field">
              <strong>📅 Received:</strong> ${new Date(contact.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            
            <div class="message-box">
              <strong>💬 Message:</strong>
              <div style="margin-top: 10px; white-space: pre-wrap;">${contact.message}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated notification from SabaArchitect contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Generate plain text email for admin notification
  private generateAdminEmailText(contact: IContact): string {
    return `
New Contact Form Submission - SabaArchitect

Subject: ${contact.subject}
Name: ${contact.name}
Email: ${contact.email}
${contact.phone ? `Phone: ${contact.phone}` : ''}
Received: ${new Date(contact.createdAt).toLocaleDateString()}

Message:
${contact.message}

---
This is an automated notification from SabaArchitect contact form.
    `.trim();
  }

  // Generate HTML email template for customer confirmation
  private generateCustomerEmailTemplate(contact: IContact): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .highlight { background: #dbeafe; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Thank You for Contacting Us!</h1>
            <p>SabaArchitect - Message Confirmation</p>
          </div>
          
          <div class="content">
            <p>Dear ${contact.name},</p>
            
            <p>Thank you for reaching out to SabaArchitect! We have successfully received your message and our team will review it shortly.</p>
            
            <div class="highlight">
              <strong>📋 Your Submission Summary:</strong><br>
              <strong>Subject:</strong> ${contact.subject}<br>
              <strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            
            <p><strong>🕒 What's Next?</strong></p>
            <ul>
              <li>Our team will review your inquiry within 24-48 hours during business days</li>
              <li>We'll respond to your message at: <strong>${contact.email}</strong></li>
              <li>For urgent matters, please call us at: <strong>+1 (234) 567-8900</strong></li>
            </ul>
            
            <p>We appreciate your interest in SabaArchitect and look forward to discussing your project with you!</p>
            
            <p>Best regards,<br>
            <strong>The SabaArchitect Team</strong></p>
          </div>
          
          <div class="footer">
            <p>SabaArchitect | 123 Architecture Ave, Design District</p>
            <p>Email: hello@sabaarchitect.com | Phone: +1 (234) 567-8900</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Generate plain text email for customer confirmation
  private generateCustomerEmailText(contact: IContact): string {
    return `
Thank You for Contacting SabaArchitect!

Dear ${contact.name},

Thank you for reaching out to SabaArchitect! We have successfully received your message and our team will review it shortly.

Your Submission Summary:
Subject: ${contact.subject}
Submitted: ${new Date(contact.createdAt).toLocaleDateString()}

What's Next?
- Our team will review your inquiry within 24-48 hours during business days
- We'll respond to your message at: ${contact.email}
- For urgent matters, please call us at: +1 (234) 567-8900

We appreciate your interest in SabaArchitect and look forward to discussing your project with you!

Best regards,
The SabaArchitect Team

---
SabaArchitect | 123 Architecture Ave, Design District
Email: hello@sabaarchitect.com | Phone: +1 (234) 567-8900
    `.trim();
  }
}

export const emailService = new EmailService();
