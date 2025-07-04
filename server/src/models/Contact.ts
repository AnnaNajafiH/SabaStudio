import mongoose, { Document, Schema } from 'mongoose';

// Interface for TypeScript type checking
export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  location?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  // Virtual properties
  formattedDate: string;
  // Instance methods
  markAsRead(): Promise<IContact>;
  markAsReplied(): Promise<IContact>;
  archive(): Promise<IContact>;
}

// Mongoose schema definition
const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address'
      ]
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^[\+]?[1-9][\d]{0,15}$/,
        'Please provide a valid phone number'
      ]
    },
    company: {
      type: String,
      trim: true,
      maxlength: [200, 'Company name cannot exceed 200 characters']
    },
    projectType: {
      type: String,
      trim: true,
      enum: [
        'Residential Design',
        'Commercial Architecture', 
        'Interior Design',
        'Landscape Architecture',
        'Planning & Consulting',
        'Renovation/Addition',
        'Other'
      ]
    },
    budget: {
      type: String,
      trim: true,
      enum: [
        'Under $100k',
        '$100k - $250k',
        '$250k - $500k', 
        '$500k - $1M',
        '$1M - $2M',
        'Over $2M',
        'To be determined'
      ]
    },
    timeline: {
      type: String,
      trim: true,
      enum: [
        'ASAP',
        '1-3 months',
        '3-6 months',
        '6-12 months', 
        '1+ years',
        'Flexible'
      ]
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters']
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      minlength: [5, 'Subject must be at least 5 characters long'],
      maxlength: [200, 'Subject cannot exceed 200 characters']
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters long'],
      maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new'
    },
    ipAddress: {
      type: String,
      trim: true
    },
    userAgent: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: 'contacts'
  }
);

// Indexes for better query performance and make database searches super fast
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

// Virtual for formatted creation date
contactSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Ensure virtual fields are serialized
contactSchema.set('toJSON', { virtuals: true });

// Pre-save middleware for additional validation
contactSchema.pre('save', function(next) {
  // Remove any potential XSS attempts
  this.name = this.name.replace(/<[^>]*>?/gm, '');
  this.subject = this.subject.replace(/<[^>]*>?/gm, '');
  this.message = this.message.replace(/<[^>]*>?/gm, '');
  
  next();
});

// Static methods
contactSchema.statics.findByStatus = function(status: string) {
  return this.find({ status }).sort({ createdAt: -1 });
};

contactSchema.statics.findRecent = function(limit: number = 10) {
  return this.find().sort({ createdAt: -1 }).limit(limit);
};

// Instance methods
contactSchema.methods.markAsRead = function() {
  this.status = 'read';
  return this.save();
};

contactSchema.methods.markAsReplied = function() {
  this.status = 'replied';
  return this.save();
};

contactSchema.methods.archive = function() {
  this.status = 'archived';
  return this.save();
};

// Create and export the model
const Contact = mongoose.model<IContact>('Contact', contactSchema);

export default Contact;
