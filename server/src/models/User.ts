import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface for TypeScript type checking
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
  lastLogin?: Date;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Instance methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  getFullName(): string;
  updateLastLogin(): Promise<IUser>;
}

// Mongoose schema definition
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
      match: [
        /^[a-z0-9_-]+$/,
        'Username can only contain lowercase letters, numbers, underscores, and hyphens'
      ]
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false // Don't include password in queries by default
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters long'],
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters long'],
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'editor', 'viewer'],
        message: 'Role must be one of: admin, editor, viewer'
      },
      default: 'viewer'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date
    },
    profileImage: {
      type: String,
      match: [
        /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
        'Please provide a valid profile image URL'
      ]
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

// Indexes for better query performance
// Note: email and username unique indexes are already created by the schema unique: true option
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for initials
userSchema.virtual('initials').get(function() {
  return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`.toUpperCase();
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', { 
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password; // Never include password in JSON output
    return ret;
  }
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Pre-save middleware for name formatting
userSchema.pre('save', function(next) {
  // Capitalize first letter of names
  this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase();
  this.lastName = this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase();
  next();
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Instance method to get full name
userSchema.methods.getFullName = function(): string {
  return `${this.firstName} ${this.lastName}`;
};

// Instance method to update last login
userSchema.methods.updateLastLogin = async function(): Promise<IUser> {
  this.lastLogin = new Date();
  return await this.save();
};

// Static methods
userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findByUsername = function(username: string) {
  return this.findOne({ username: username.toLowerCase() });
};

userSchema.statics.findActiveUsers = function() {
  return this.find({ isActive: true }).sort({ createdAt: -1 });
};

userSchema.statics.findByRole = function(role: string) {
  return this.find({ role, isActive: true }).sort({ lastName: 1, firstName: 1 });
};

userSchema.statics.findAdmins = function() {
  return this.find({ role: 'admin', isActive: true }).sort({ lastName: 1, firstName: 1 });
};

// Create and export the model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
