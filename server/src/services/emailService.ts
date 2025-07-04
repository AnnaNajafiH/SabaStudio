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
    this.fromEmail = process.env.FROM_EMAIL || 'noreply@sstudio.com';
    this.adminEmail = process.env.ADMIN_EMAIL || 'admin@sstudio.com';

    console.log('🔍 Email Service Debug:');
    console.log('  EMAIL_ENABLED:', process.env.EMAIL_ENABLED);
    console.log('  SMTP_USER:', process.env.SMTP_USER ? 'SET' : 'NOT SET');
    console.log('  SMTP_PASS:', process.env.SMTP_PASS ? 'SET (length: ' + process.env.SMTP_PASS.length + ')' : 'NOT SET');

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
      console.warn('  User:', emailConfig.auth.user ? 'SET' : 'MISSING');
      console.warn('  Pass:', emailConfig.auth.pass ? 'SET' : 'MISSING');
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
        subject: `Thank you for contacting S\\Studio - We received your message`,
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
          .urgent { background: #fef2f2; border-color: #ef4444; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Contact Form Submission</h1>
            <p>S\\Studio - Admin Notification</p>
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
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${contact.email}?subject=Re: ${contact.subject}" 
                 style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                📧 Reply to Customer
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated notification from your S\\Studio contact form.</p>
            <p>Status: ${contact.status} | IP: ${contact.ipAddress || 'Unknown'}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Generate plain text email for admin notification
  private generateAdminEmailText(contact: IContact): string {
    return `
🎯 NEW CONTACT FORM SUBMISSION - S\\Studio

Subject: ${contact.subject}
Name: ${contact.name}
Email: ${contact.email}
${contact.phone ? `Phone: ${contact.phone}` : ''}
Received: ${contact.formattedDate}

Message:
${contact.message}

---
Reply to customer: ${contact.email}
Status: ${contact.status}
IP Address: ${contact.ipAddress || 'Unknown'}

This is an automated notification from your S\\Studio contact form.
    `;
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
          .highlight { background: white; padding: 15px; border-left: 4px solid #10b981; margin: 15px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          .contact-info { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Thank You for Contacting Us!</h1>
            <p>S\\Studio - Message Received</p>
          </div>
          
          <div class="content">
            <p>Dear ${contact.name},</p>
            
            <div class="highlight">
              <h3>🎉 Your message has been successfully received!</h3>
              <p>We've received your inquiry about "<strong>${contact.subject}</strong>" and will get back to you as soon as possible.</p>
            </div>
            
            <h3>📋 What happens next?</h3>
            <ul>
              <li>✅ Your message has been logged and assigned to our team</li>
              <li>⏰ We typically respond within 24-48 hours during business days</li>
              <li>📧 You'll receive a detailed response at ${contact.email}</li>
              <li>📱 If urgent, we may call you at ${contact.phone || 'the number you provided'}</li>
            </ul>
            
            <div class="contact-info">
              <h3>📞 Need immediate assistance?</h3>
              <p><strong>Phone:</strong> +49 123 456 7890</p>
              <p><strong>Email:</strong> info@sstudio.com</p>
              <p><strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM (CET)</p>
            </div>
            
            <p>Thank you for considering S\\Studio for your architectural needs. We look forward to discussing your project!</p>
            
            <p>Best regards,<br>
            <strong>The S\\Studio Team</strong></p>
          </div>
          
          <div class="footer">
            <p>This is an automated confirmation email.</p>
            <p>If you did not submit this form, please contact us immediately.</p>
            <p>© 2024 S\\Studio. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Generate plain text email for customer confirmation
  private generateCustomerEmailText(contact: IContact): string {
    return `
✅ THANK YOU FOR CONTACTING S\\STUDIO!

Dear ${contact.name},

Your message has been successfully received!

Subject: ${contact.subject}
Received: ${contact.formattedDate}

WHAT HAPPENS NEXT?
• Your message has been logged and assigned to our team
• We typically respond within 24-48 hours during business days  
• You'll receive a detailed response at ${contact.email}
• If urgent, we may call you at ${contact.phone || 'the number you provided'}

NEED IMMEDIATE ASSISTANCE?
Phone: +49 123 456 7890
Email: info@sstudio.com
Office Hours: Monday - Friday, 9:00 AM - 6:00 PM (CET)

Thank you for considering S\\Studio for your architectural needs. 
We look forward to discussing your project!

Best regards,
The S\\Studio Team

---
This is an automated confirmation email.
If you did not submit this form, please contact us immediately.
© 2024 S\\Studio. All rights reserved.
    `;
  }

  // Test email functionality
  async sendTestEmail(to: string): Promise<boolean> {
    if (!this.emailEnabled || !this.transporter) {
      console.log('📧 Email disabled - cannot send test email');
      return false;
    }

    try {
      const mailOptions = {
        from: this.fromEmail,
        to: to,
        subject: '🧪 SabaArchitect Email Service Test',
        html: `
          <h2>✅ Email Service Test Successful!</h2>
          <p>This is a test email from your SabaArchitect contact form system.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p>If you received this email, your email configuration is working correctly.</p>
        `,
        text: `
✅ EMAIL SERVICE TEST SUCCESSFUL!

This is a test email from your SabaArchitect contact form system.
Timestamp: ${new Date().toISOString()}

If you received this email, your email configuration is working correctly.
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Test email sent successfully:', info.messageId);
      return true;
    } catch (error) {
      console.error('❌ Test email failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();
export default emailService;
