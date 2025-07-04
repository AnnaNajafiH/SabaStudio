import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for TypeScript type checking
export interface IProject extends Document {
  title: string;
  description: string;
  fullDescription?: string;
  category: 'residential' | 'commercial' | 'interior' | 'landscape' | 'renovation';
  status: 'completed' | 'in-progress' | 'planning' | 'on-hold';
  images: string[];
  thumbnailImage: string;
  location: string;
  year: number;
  client?: string;
  area?: number; // in square meters
  budget?: number;
  tags: string[];
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  // Instance methods
  toggleFeatured(): Promise<IProject>;
  togglePublished(): Promise<IProject>;
  addTag(tag: string): Promise<IProject>;
  removeTag(tag: string): Promise<IProject>;
}

// Interface for static methods
export interface IProjectModel extends Model<IProject> {
  findFeatured(): Promise<IProject[]>;
  findByCategory(category: string): Promise<IProject[]>;
  findByStatus(status: string): Promise<IProject[]>;
  findByYear(year: number): Promise<IProject[]>;
}

// Mongoose schema definition
const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long'],
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    fullDescription: {
      type: String,
      trim: true,
      maxlength: [5000, 'Full description cannot exceed 5000 characters']
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: {
        values: ['residential', 'commercial', 'interior', 'landscape', 'renovation'],
        message: 'Category must be one of: residential, commercial, interior, landscape, renovation'
      }
    },
    status: {
      type: String,
      required: [true, 'Project status is required'],
      enum: {
        values: ['completed', 'in-progress', 'planning', 'on-hold'],
        message: 'Status must be one of: completed, in-progress, planning, on-hold'
      },
      default: 'planning'
    },
    images: [{
      type: String,
      required: true,
      match: [
        /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
        'Please provide valid image URLs'
      ]
    }],
    thumbnailImage: {
      type: String,
      required: [true, 'Thumbnail image is required'],
      match: [
        /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
        'Please provide a valid thumbnail image URL'
      ]
    },
    location: {
      type: String,
      required: [true, 'Project location is required'],
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters']
    },
    year: {
      type: Number,
      required: [true, 'Project year is required'],
      min: [1900, 'Year must be after 1900'],
      max: [new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future']
    },
    client: {
      type: String,
      trim: true,
      maxlength: [200, 'Client name cannot exceed 200 characters']
    },
    area: {
      type: Number,
      min: [0, 'Area must be a positive number']
    },
    budget: {
      type: Number,
      min: [0, 'Budget must be a positive number']
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [50, 'Each tag cannot exceed 50 characters']
    }],
    featured: {
      type: Boolean,
      default: false
    },
    published: {
      type: Boolean,
      default: true
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9-]+$/,
        'Slug can only contain lowercase letters, numbers, and hyphens'
      ]
    }
  },
  {
    timestamps: true,
    collection: 'projects'
  }
);

// Indexes for better query performance
projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ published: 1 });
projectSchema.index({ year: -1 });
projectSchema.index({ slug: 1 }, { unique: true });
projectSchema.index({ tags: 1 });

// Virtual for formatted year
projectSchema.virtual('displayYear').get(function() {
  return this.year.toString();
});

// Virtual for formatted area
projectSchema.virtual('formattedArea').get(function() {
  return this.area ? `${this.area.toLocaleString()} m²` : null;
});

// Virtual for formatted budget
projectSchema.virtual('formattedBudget').get(function() {
  return this.budget ? `$${this.budget.toLocaleString()}` : null;
});

// Ensure virtual fields are serialized
projectSchema.set('toJSON', { virtuals: true });

// Pre-save middleware to generate slug
projectSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  }
  next();
});

// Static methods
projectSchema.statics.findPublished = function() {
  return this.find({ published: true }).sort({ year: -1, createdAt: -1 });
};

projectSchema.statics.findFeatured = function() {
  return this.find({ featured: true, published: true }).sort({ year: -1 });
};

projectSchema.statics.findByCategory = function(category: string) {
  return this.find({ category, published: true }).sort({ year: -1 });
};

projectSchema.statics.findByStatus = function(status: string) {
  return this.find({ status }).sort({ year: -1 });
};

projectSchema.statics.findByYear = function(year: number) {
  return this.find({ year, published: true }).sort({ createdAt: -1 });
};

// Instance methods
projectSchema.methods.toggleFeatured = function() {
  this.featured = !this.featured;
  return this.save();
};

projectSchema.methods.togglePublished = function() {
  this.published = !this.published;
  return this.save();
};

projectSchema.methods.addTag = function(tag: string) {
  if (!this.tags.includes(tag.toLowerCase())) {
    this.tags.push(tag.toLowerCase());
    return this.save();
  }
  return this;
};

projectSchema.methods.removeTag = function(tag: string) {
  this.tags = this.tags.filter((t: string) => t !== tag.toLowerCase());
  return this.save();
};

// Create and export the model
const Project = mongoose.model<IProject, IProjectModel>('Project', projectSchema);

export default Project;
