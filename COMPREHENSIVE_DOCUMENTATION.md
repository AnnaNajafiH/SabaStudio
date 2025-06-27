# 🏗️ SabaArchitect - Professional Architecture Web Application

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Backend API Documentation](#backend-api-documentation)
6. [Frontend Documentation](#frontend-documentation)
7. [Database Schema](#database-schema)
8. [Authentication & Security](#authentication--security)
9. [File Upload System](#file-upload-system)
10. [Deployment Guide](#deployment-guide)
11. [Development Workflow](#development-workflow)
12. [Testing Strategy](#testing-strategy)
13. [Performance Optimization](#performance-optimization)
14. [Troubleshooting](#troubleshooting)
15. [Contributing Guidelines](#contributing-guidelines)

---

## 🎯 Project Overview

**SabaArchitect** is a modern, professional web application designed for architecture firms to showcase their work, manage projects, and interact with clients. Built with cutting-edge technologies and following industry best practices.

### ✨ Key Features

- **📱 Responsive Design** - Mobile-first approach for all devices
- **🎨 Modern UI/UX** - Clean, professional interface tailored for architecture
- **🔐 Secure Authentication** - JWT-based admin authentication system
- **📁 Project Management** - Complete CRUD operations for architectural projects
- **🖼️ Image Gallery** - Advanced image upload and management
- **📞 Contact System** - Client inquiry management
- **🚀 Performance Optimized** - Fast loading and smooth user experience
- **🔒 Security First** - Comprehensive security measures implemented
- **📊 RESTful API** - Well-documented API following REST principles
- **🐳 Docker Ready** - Containerized for easy deployment

### 🎨 Design Philosophy

- **Minimalism**: Clean, uncluttered design that highlights architectural work
- **Professionalism**: Sophisticated color palette and typography
- **Accessibility**: WCAG 2.1 compliant for inclusive user experience
- **Performance**: Optimized for speed and efficiency

---

## 🏛️ Architecture & Technology Stack

### 🔧 Backend Technologies

| Technology | Version | Purpose | Why We Chose It |
|------------|---------|---------|-----------------|
| **Node.js** | 18+ | Runtime Environment | Non-blocking I/O, excellent for APIs |
| **Express.js** | 4.18+ | Web Framework | Minimalist, flexible, industry standard |
| **TypeScript** | 5.3+ | Programming Language | Type safety, better development experience |
| **MongoDB** | 8.0+ | Database | Flexible schema, excellent for content management |
| **Mongoose** | 8.0+ | ODM | Object modeling, validation, middleware |
| **JWT** | 9.0+ | Authentication | Stateless, secure token-based auth |
| **Bcrypt** | 2.4+ | Password Hashing | Industry standard for password security |
| **Multer** | 1.4+ | File Upload | Multipart form handling for images |
| **Helmet** | 7.1+ | Security | Security headers and protection |
| **CORS** | 2.8+ | Cross-Origin | Enable secure cross-origin requests |
| **Morgan** | 1.10+ | Logging | HTTP request logging |
| **Joi** | 17.11+ | Validation | Schema validation for requests |
| **Compression** | 1.7+ | Performance | Response compression |

### 🎨 Frontend Technologies

| Technology | Version | Purpose | Why We Chose It |
|------------|---------|---------|-----------------|
| **React** | 18.2+ | UI Library | Component-based, reactive updates |
| **TypeScript** | 5.2+ | Programming Language | Type safety in frontend development |
| **Vite** | 5.0+ | Build Tool | Lightning-fast development and builds |
| **Tailwind CSS** | 3.3+ | CSS Framework | Utility-first, highly customizable |
| **React Router** | 6.20+ | Routing | Client-side navigation |
| **Axios** | 1.6+ | HTTP Client | Promise-based HTTP requests |

### 🐳 DevOps & Deployment

| Technology | Purpose | Benefits |
|------------|---------|----------|
| **Docker** | Containerization | Consistent environments |
| **Docker Compose** | Multi-container orchestration | Simplified development setup |
| **ESLint** | Code linting | Code quality and consistency |
| **Prettier** | Code formatting | Consistent code style |
| **Nodemon** | Development server | Hot reload during development |
| **Jest** | Testing framework | Comprehensive testing capabilities |

---

## 📁 Project Structure

```
SabaArchitect/
├── 📁 client/                    # React frontend application
│   ├── 📁 public/               # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable UI components
│   │   ├── 📁 pages/           # Page components
│   │   ├── 📁 hooks/           # Custom React hooks
│   │   ├── 📁 services/        # API service functions
│   │   ├── 📁 types/           # TypeScript type definitions
│   │   ├── 📁 utils/           # Utility functions
│   │   ├── 📁 styles/          # Global styles
│   │   ├── 📄 App.tsx          # Main App component
│   │   └── 📄 main.tsx         # React entry point
│   ├── 📄 package.json         # Frontend dependencies
│   ├── 📄 tsconfig.json        # TypeScript configuration
│   ├── 📄 vite.config.ts       # Vite configuration
│   └── 📄 tailwind.config.js   # Tailwind CSS configuration
│
├── 📁 server/                   # Node.js backend application
│   ├── 📁 src/
│   │   ├── 📁 config/          # Configuration files
│   │   │   └── 📄 database.ts   # MongoDB connection
│   │   ├── 📁 controllers/     # Route controllers
│   │   ├── 📁 middleware/      # Custom middleware
│   │   │   ├── 📄 errorHandler.ts
│   │   │   └── 📄 notFoundHandler.ts
│   │   ├── 📁 models/          # Mongoose models
│   │   ├── 📁 routes/          # API routes
│   │   │   ├── 📄 index.ts     # Main router
│   │   │   ├── 📄 authRoutes.ts
│   │   │   ├── 📄 contactRoutes.ts
│   │   │   └── 📄 projectRoutes.ts
│   │   ├── 📁 services/        # Business logic
│   │   ├── 📁 types/           # TypeScript definitions
│   │   │   └── 📄 index.ts
│   │   ├── 📁 utils/           # Utility functions
│   │   │   └── 📄 helpers.ts
│   │   └── 📄 server.ts        # Main server file
│   ├── 📁 uploads/             # File upload directory
│   ├── 📄 .env                 # Environment variables
│   ├── 📄 .env.example         # Environment template
│   ├── 📄 package.json         # Backend dependencies
│   ├── 📄 tsconfig.json        # TypeScript configuration
│   ├── 📄 nodemon.json         # Nodemon configuration
│   └── 📄 .eslintrc.json       # ESLint configuration
│
├── 📁 shared/                   # Shared types and utilities
│   ├── 📁 src/
│   │   ├── 📁 types/           # Shared TypeScript types
│   │   ├── 📁 interfaces/      # Shared interfaces
│   │   ├── 📁 constants/       # Application constants
│   │   ├── 📁 utils/           # Shared utility functions
│   │   └── 📄 index.ts         # Main export file
│   ├── 📄 package.json         # Shared package configuration
│   └── 📄 tsconfig.json        # TypeScript configuration
│
├── 📁 docker/                   # Docker configuration
│   ├── 📄 Dockerfile.client    # Client container
│   ├── 📄 Dockerfile.server    # Server container
│   └── 📄 docker-compose.yml   # Multi-container setup
│
├── 📄 README.md                 # Project overview
├── 📄 .gitignore               # Git ignore rules
└── 📄 package.json             # Root package configuration
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **MongoDB** (local or cloud) - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - Version control
- **VS Code** (recommended) - Code editor

### 🔧 Installation Steps

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd SabaArchitect
```

#### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Install shared dependencies
cd ../shared
npm install
```

#### 3. Environment Configuration

**Server Environment** (`server/.env`):
```env
# Server Configuration
PORT=3001
NODE_ENV=development
HOST=localhost

# Database
MONGODB_URI=mongodb://localhost:27017/sabaarchitect
DB_NAME=sabaarchitect

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# CORS
CORS_ORIGIN=http://localhost:5173

# API
API_PREFIX=/api/v1

# Logging
LOG_LEVEL=info
```

**Client Environment** (`client/.env`):
```env
VITE_API_URL=http://localhost:3001/api/v1
VITE_APP_NAME=SabaArchitect
VITE_MAX_FILE_SIZE=10485760
```

#### 4. Start Development Servers

```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm run dev
```

#### 5. Verify Installation

- **Backend API**: http://localhost:3001/health
- **Frontend App**: http://localhost:5173
- **API Documentation**: http://localhost:3001/api/v1

---

## 📡 Backend API Documentation

### 🔗 Base URL
```
Development: http://localhost:3001/api/v1
Production: https://your-domain.com/api/v1
```

### 📋 API Endpoints

#### 🏥 Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "OK",
  "message": "SabaArchitect API is running",
  "timestamp": "2025-06-27T10:48:19.695Z",
  "environment": "development"
}
```

#### 🏠 API Welcome
```http
GET /api/v1
```
**Response:**
```json
{
  "message": "Welcome to SabaArchitect API",
  "version": "1.0.0",
  "endpoints": {
    "projects": "/api/v1/projects",
    "auth": "/api/v1/auth",
    "contact": "/api/v1/contact"
  }
}
```

### 🏗️ Projects API

#### Get All Projects
```http
GET /api/v1/projects
```
**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category
- `status` (optional): Filter by status

**Response:**
```json
{
  "status": "success",
  "data": {
    "projects": [],
    "pagination": {
      "total": 0,
      "page": 1,
      "limit": 10,
      "totalPages": 0
    }
  }
}
```

#### Get Project by ID
```http
GET /api/v1/projects/:id
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "project_id",
    "title": "Modern Villa",
    "description": "Contemporary residential design",
    "category": "Residential",
    "status": "Completed",
    "images": ["image1.jpg", "image2.jpg"],
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

#### Create New Project (Admin Only)
```http
POST /api/v1/projects
Authorization: Bearer <jwt_token>
Content-Type: application/json
```
**Request Body:**
```json
{
  "title": "Modern Villa",
  "description": "Contemporary residential design",
  "category": "Residential",
  "status": "In Progress",
  "images": ["image1.jpg", "image2.jpg"]
}
```

#### Update Project (Admin Only)
```http
PUT /api/v1/projects/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Delete Project (Admin Only)
```http
DELETE /api/v1/projects/:id
Authorization: Bearer <jwt_token>
```

### 🔐 Authentication API

#### Admin Login
```http
POST /api/v1/auth/login
Content-Type: application/json
```
**Request Body:**
```json
{
  "email": "admin@sabaarchitect.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "admin@sabaarchitect.com",
      "name": "Admin Name",
      "role": "admin"
    }
  },
  "message": "Login successful"
}
```

#### Get Admin Profile
```http
GET /api/v1/auth/profile
Authorization: Bearer <jwt_token>
```

#### Admin Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer <jwt_token>
```

### 📞 Contact API

#### Submit Contact Form
```http
POST /api/v1/contact
Content-Type: application/json
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in your architectural services.",
  "phone": "+1234567890"
}
```

#### Get Contact Messages (Admin Only)
```http
GET /api/v1/contact
Authorization: Bearer <jwt_token>
```

### 📁 File Upload API

#### Upload Images
```http
POST /api/v1/upload
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```
**Form Data:**
- `images`: Multiple image files (jpg, png, webp)
- `category`: Upload category (optional)

**Response:**
```json
{
  "status": "success",
  "data": {
    "files": [
      {
        "filename": "image_1703123456789.jpg",
        "originalname": "villa.jpg",
        "size": 1024000,
        "url": "/uploads/image_1703123456789.jpg"
      }
    ]
  },
  "message": "Files uploaded successfully"
}
```

### 🚨 Error Responses

All API errors follow this format:
```json
{
  "status": "fail" | "error",
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

---

## 🎨 Frontend Documentation

### 🏗️ Component Structure

#### 📱 Layout Components
- **Header** - Navigation and branding
- **Footer** - Contact info and links
- **Sidebar** - Admin navigation
- **Layout** - Main layout wrapper

#### 🧩 UI Components
- **Button** - Various button styles
- **Card** - Content containers
- **Modal** - Overlay dialogs
- **Form** - Form components
- **Loading** - Loading indicators
- **Error** - Error boundaries

#### 🎯 Feature Components
- **ProjectGallery** - Project showcase
- **ProjectCard** - Individual project display
- **ContactForm** - Contact form
- **AdminDashboard** - Admin interface
- **ImageUpload** - File upload component

### 📄 Page Structure

#### 🏠 Public Pages
```
/                    # Home - Hero section and featured projects
/about               # About - Company and architect info
/projects            # Projects - Full portfolio showcase
/projects/:id        # Project Detail - Individual project view
/services            # Services - Architecture services offered
/contact             # Contact - Contact form and information
```

#### 🔐 Admin Pages
```
/admin               # Admin Dashboard - Overview
/admin/login         # Admin Login
/admin/projects      # Project Management
/admin/projects/new  # Create New Project
/admin/projects/edit/:id  # Edit Project
/admin/contacts      # Contact Messages
/admin/settings      # Admin Settings
```

### 🎨 Design System

#### 🎨 Color Palette
```css
/* Primary Colors */
--color-primary: #1a1a1a;      /* Charcoal Black */
--color-secondary: #f5f5f5;    /* Light Gray */
--color-accent: #d4af37;       /* Gold Accent */

/* Neutral Colors */
--color-white: #ffffff;
--color-gray-100: #f8f9fa;
--color-gray-200: #e9ecef;
--color-gray-300: #dee2e6;
--color-gray-400: #ced4da;
--color-gray-500: #adb5bd;
--color-gray-600: #6c757d;
--color-gray-700: #495057;
--color-gray-800: #343a40;
--color-gray-900: #212529;

/* Status Colors */
--color-success: #28a745;
--color-warning: #ffc107;
--color-error: #dc3545;
--color-info: #17a2b8;
```

#### 📝 Typography
```css
/* Font Families */
--font-primary: 'Inter', sans-serif;
--font-secondary: 'Playfair Display', serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

#### 📏 Spacing System
```css
/* Spacing Scale (Tailwind-based) */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

### 📱 Responsive Breakpoints
```css
/* Mobile First Approach */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */
```

---

## 🗄️ Database Schema

### 📊 MongoDB Collections

#### 👤 Users Collection
```javascript
{
  _id: ObjectId,
  email: String,          // Unique admin email
  password: String,       // Hashed password
  name: String,          // Admin name
  role: String,          // 'admin'
  avatar: String,        // Profile image URL
  isActive: Boolean,     // Account status
  lastLogin: Date,       // Last login timestamp
  createdAt: Date,       // Account creation
  updatedAt: Date        // Last update
}
```

#### 🏗️ Projects Collection
```javascript
{
  _id: ObjectId,
  title: String,           // Project title
  slug: String,           // URL-friendly slug
  description: String,    // Project description
  longDescription: String, // Detailed project info
  category: String,       // Project category
  status: String,         // Project status
  images: [String],       // Array of image URLs
  thumbnail: String,      // Main project image
  client: String,         // Client name
  location: String,       // Project location
  area: Number,          // Project area (sq ft/m)
  year: Number,          // Completion year
  budget: Number,        // Project budget
  tags: [String],        // Project tags
  features: [String],    // Key features
  isPublished: Boolean,  // Visibility status
  isFeatured: Boolean,   // Featured project
  viewCount: Number,     // View statistics
  createdAt: Date,       // Creation timestamp
  updatedAt: Date        // Last update
}
```

#### 📞 Contacts Collection
```javascript
{
  _id: ObjectId,
  name: String,          // Contact name
  email: String,         // Contact email
  phone: String,         // Phone number
  company: String,       // Company name
  message: String,       // Inquiry message
  subject: String,       // Message subject
  status: String,        // 'new', 'read', 'replied', 'closed'
  priority: String,      // 'low', 'medium', 'high'
  source: String,        // Contact source
  adminNotes: String,    // Internal notes
  repliedAt: Date,       // Reply timestamp
  repliedBy: ObjectId,   // Admin who replied
  createdAt: Date,       // Submission timestamp
  updatedAt: Date        // Last update
}
```

#### 🖼️ Media Collection
```javascript
{
  _id: ObjectId,
  filename: String,      // File name
  originalname: String,  // Original file name
  mimetype: String,      // File MIME type
  size: Number,          // File size in bytes
  path: String,          // File path
  url: String,           // Public URL
  alt: String,           // Alt text
  caption: String,       // Image caption
  category: String,      // Media category
  projectId: ObjectId,   // Associated project
  uploadedBy: ObjectId,  // Admin who uploaded
  isPublic: Boolean,     // Public visibility
  createdAt: Date,       // Upload timestamp
  updatedAt: Date        // Last update
}
```

### 📋 Data Validation Rules

#### Project Validation
```javascript
{
  title: {
    required: true,
    minLength: 3,
    maxLength: 100
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 500
  },
  category: {
    required: true,
    enum: ['Residential', 'Commercial', 'Industrial', 'Landscape', 'Interior', 'Urban Planning']
  },
  status: {
    required: true,
    enum: ['Draft', 'In Progress', 'Under Review', 'Completed', 'Archived']
  },
  year: {
    min: 1900,
    max: new Date().getFullYear() + 5
  }
}
```

#### Contact Validation
```javascript
{
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    format: 'email',
    maxLength: 100
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000
  }
}
```

---

## 🔐 Authentication & Security

### 🛡️ Security Measures

#### 1. Authentication System
- **JWT Tokens** - Stateless authentication
- **Secure Headers** - Helmet.js implementation
- **Password Hashing** - Bcrypt with salt rounds
- **Token Expiration** - Configurable token lifetime
- **Refresh Tokens** - Extended session management

#### 2. API Security
```javascript
// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS Configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

#### 3. Input Validation
```javascript
// Joi Validation Schema Example
const projectSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  category: Joi.string().valid(
    'Residential', 'Commercial', 'Industrial', 
    'Landscape', 'Interior', 'Urban Planning'
  ).required(),
  status: Joi.string().valid(
    'Draft', 'In Progress', 'Under Review', 
    'Completed', 'Archived'
  ).required()
});
```

#### 4. File Upload Security
```javascript
// Multer Configuration
const upload = multer({
  dest: './uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});
```

### 🔑 Environment Variables Security

#### Production Environment
```env
# Strong JWT Secret (64+ characters)
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-64-characters-long

# Secure Database Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sabaarchitect

# Production CORS
CORS_ORIGIN=https://your-production-domain.com

# Secure Cookies
COOKIE_SECURE=true
COOKIE_HTTPONLY=true
COOKIE_SAMESITE=strict

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 📁 File Upload System

### 🖼️ Image Upload Configuration

#### Supported Formats
- **JPEG** (.jpg, .jpeg) - Optimized for photos
- **PNG** (.png) - Supports transparency
- **WebP** (.webp) - Modern format with better compression

#### File Size Limits
- **Maximum Size**: 10MB per file
- **Multiple Upload**: Up to 5 files simultaneously
- **Total Limit**: 50MB per request

#### Image Processing Pipeline
```javascript
// Image processing with Sharp (if implemented)
const processImage = async (file) => {
  const processed = await sharp(file.path)
    .resize(1920, 1080, { 
      fit: 'inside', 
      withoutEnlargement: true 
    })
    .jpeg({ quality: 85 })
    .toBuffer();
  
  // Generate thumbnail
  const thumbnail = await sharp(file.path)
    .resize(400, 300, { fit: 'cover' })
    .jpeg({ quality: 75 })
    .toBuffer();
  
  return { processed, thumbnail };
};
```

#### Storage Structure
```
uploads/
├── projects/
│   ├── thumbnails/
│   └── full/
├── gallery/
├── temp/
└── avatars/
```

---

## 🚀 Deployment Guide

### 🐳 Docker Deployment

#### Docker Compose Setup
```yaml
version: '3.8'

services:
  # MongoDB Database
  mongodb:
    image: mongo:7
    container_name: sabaarchitect-db
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secure_password
      MONGO_INITDB_DATABASE: sabaarchitect
    volumes:
      - mongodb_data:/data/db
    ports:
      - "27017:27017"

  # Backend API
  api:
    build:
      context: ./server
      dockerfile: ../docker/Dockerfile.server
    container_name: sabaarchitect-api
    restart: unless-stopped
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://admin:secure_password@mongodb:27017/sabaarchitect?authSource=admin
      JWT_SECRET: your-production-jwt-secret-key
      CORS_ORIGIN: https://your-domain.com
    volumes:
      - ./uploads:/app/uploads
    ports:
      - "3001:3001"
    depends_on:
      - mongodb

  # Frontend Application
  client:
    build:
      context: ./client
      dockerfile: ../docker/Dockerfile.client
    container_name: sabaarchitect-client
    restart: unless-stopped
    ports:
      - "80:80"
    depends_on:
      - api

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: sabaarchitect-nginx
    restart: unless-stopped
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - client
      - api

volumes:
  mongodb_data:
```

#### Production Environment Setup
```bash
# 1. Clone and setup
git clone <repository-url>
cd SabaArchitect

# 2. Create production environment files
cp server/.env.example server/.env.production
cp client/.env.example client/.env.production

# 3. Update production variables
nano server/.env.production
nano client/.env.production

# 4. Build and deploy
docker-compose -f docker-compose.prod.yml up -d --build

# 5. Setup SSL (Let's Encrypt)
docker run -it --rm \
  -v ./ssl:/etc/letsencrypt \
  -v ./ssl-challenges:/var/www/certbot \
  certbot/certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email \
  -d your-domain.com
```

### ☁️ Cloud Deployment Options

#### 1. Digital Ocean App Platform
```yaml
# .do/app.yaml
name: sabaarchitect
services:
- name: api
  source_dir: /server
  build_command: npm run build
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: MONGODB_URI
    value: ${DATABASE_URL}

- name: client
  source_dir: /client
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs

databases:
- name: sabaarchitect-db
  engine: MONGODB
  version: "5"
```

#### 2. AWS Deployment
```bash
# Using AWS ECS with Fargate
aws ecs create-cluster --cluster-name sabaarchitect

# Create task definitions
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create services
aws ecs create-service \
  --cluster sabaarchitect \
  --service-name sabaarchitect-api \
  --task-definition sabaarchitect-api:1 \
  --desired-count 2
```

#### 3. Vercel + Railway
```bash
# Deploy frontend to Vercel
npm i -g vercel
cd client
vercel --prod

# Deploy backend to Railway
cd server
railway login
railway init
railway up
```

---

## 🔄 Development Workflow

### 🌿 Git Workflow

#### Branch Strategy
```
main                 # Production branch
├── develop         # Development integration
├── feature/*       # Feature branches
├── hotfix/*        # Production hotfixes
└── release/*       # Release branches
```

#### Commit Convention
```
feat: add project gallery component
fix: resolve image upload validation bug
docs: update API documentation
style: format code with prettier
refactor: optimize database queries
test: add unit tests for auth service
chore: update dependencies
```

### 🧪 Development Scripts

#### Package.json Scripts
```json
{
  "scripts": {
    "dev": "concurrently \"npm run server:dev\" \"npm run client:dev\"",
    "server:dev": "cd server && npm run dev",
    "client:dev": "cd client && npm run dev",
    "build": "npm run server:build && npm run client:build",
    "server:build": "cd server && npm run build",
    "client:build": "cd client && npm run build",
    "test": "npm run server:test && npm run client:test",
    "server:test": "cd server && npm test",
    "client:test": "cd client && npm test",
    "lint": "npm run server:lint && npm run client:lint",
    "lint:fix": "npm run server:lint:fix && npm run client:lint:fix",
    "docker:dev": "docker-compose up --build",
    "docker:prod": "docker-compose -f docker-compose.prod.yml up -d --build"
  }
}
```

### 📝 Code Quality Tools

#### ESLint Configuration
```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off"
  }
}
```

#### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

#### Husky Git Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```

---

## 🧪 Testing Strategy

### 🔬 Backend Testing

#### Unit Tests Example
```javascript
// tests/auth.test.js
describe('Authentication', () => {
  test('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
  });

  test('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'wrongpassword'
      });
    
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
```

#### Integration Tests
```javascript
// tests/projects.test.js
describe('Projects API', () => {
  let authToken;

  beforeAll(async () => {
    // Login and get token
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@test.com', password: 'password123' });
    
    authToken = loginResponse.body.data.token;
  });

  test('should create a new project', async () => {
    const response = await request(app)
      .post('/api/v1/projects')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Project',
        description: 'Test Description',
        category: 'Residential',
        status: 'Draft'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.data.title).toBe('Test Project');
  });
});
```

### 🎨 Frontend Testing

#### Component Tests
```javascript
// tests/ProjectCard.test.tsx
import { render, screen } from '@testing-library/react';
import ProjectCard from '../components/ProjectCard';

describe('ProjectCard', () => {
  const mockProject = {
    id: '1',
    title: 'Test Project',
    description: 'Test Description',
    category: 'Residential',
    images: ['test.jpg']
  };

  test('renders project information', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Residential')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const mockOnClick = jest.fn();
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);
    
    const card = screen.getByRole('button');
    card.click();
    
    expect(mockOnClick).toHaveBeenCalledWith(mockProject.id);
  });
});
```

### 📊 Test Coverage Goals
- **Backend**: Minimum 80% coverage
- **Frontend**: Minimum 70% coverage
- **Critical Paths**: 100% coverage (auth, payment, data loss scenarios)

---

## ⚡ Performance Optimization

### 🚀 Backend Optimization

#### Database Optimization
```javascript
// MongoDB Indexes
db.projects.createIndex({ "category": 1, "status": 1 });
db.projects.createIndex({ "createdAt": -1 });
db.projects.createIndex({ "title": "text", "description": "text" });
db.contacts.createIndex({ "createdAt": -1 });
db.users.createIndex({ "email": 1 }, { unique: true });

// Aggregation Pipeline Optimization
const getProjectStats = async () => {
  return await Project.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
        averageViewCount: { $avg: "$viewCount" }
      }
    },
    { $sort: { count: -1 } }
  ]);
};
```

#### API Response Optimization
```javascript
// Response Compression
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    return compression.filter(req, res);
  }
}));

// Response Caching
const cache = require('memory-cache');

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl;
    const cached = cache.get(key);
    
    if (cached) {
      res.send(cached);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

// Apply caching to project routes
app.get('/api/v1/projects', cacheMiddleware(300), getProjects);
```

### 🎨 Frontend Optimization

#### Code Splitting
```javascript
// Lazy loading components
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

// Route-based code splitting
const AppRouter = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  </Router>
);
```

#### Image Optimization
```javascript
// Image lazy loading component
const OptimizedImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
```

#### Bundle Optimization
```javascript
// Vite configuration
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
});
```

---

## 🔧 Troubleshooting

### 🐛 Common Issues & Solutions

#### 1. Server Won't Start
**Problem**: Server fails to start with port errors
```bash
Error: listen EADDRINUSE: address already in use :::3001
```
**Solution**:
```bash
# Find process using port 3001
lsof -i :3001
# Or on Windows
netstat -ano | findstr :3001

# Kill the process
kill -9 <PID>
# Or on Windows
taskkill /PID <PID> /F

# Or change port in .env
PORT=3002
```

#### 2. MongoDB Connection Failed
**Problem**: Cannot connect to MongoDB
```bash
MongoNetworkError: failed to connect to server
```
**Solutions**:
```bash
# Check if MongoDB is running
brew services start mongodb-community
# Or with systemctl
sudo systemctl start mongod

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/sabaarchitect

# For MongoDB Atlas, check whitelist and credentials
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sabaarchitect
```

#### 3. TypeScript Compilation Errors
**Problem**: Module resolution errors in VS Code
```typescript
Cannot find module './config/database' or its corresponding type declarations.
```
**Solutions**:
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"

# Rebuild the project
npm run build

# Check tsconfig.json paths
{
  "compilerOptions": {
    "moduleResolution": "node",
    "baseUrl": "./src"
  }
}
```

#### 4. CORS Errors
**Problem**: Cross-origin requests blocked
```javascript
Access to fetch at 'http://localhost:3001/api/v1/projects' from origin 'http://localhost:5173' has been blocked by CORS policy
```
**Solution**:
```javascript
// Update server CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Check .env file
CORS_ORIGIN=http://localhost:5173
```

#### 5. File Upload Issues
**Problem**: Files not uploading or size errors
```javascript
Error: File too large
```
**Solutions**:
```javascript
// Check multer configuration
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

// Check body parser limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure uploads directory exists
mkdir -p server/uploads
```

### 📋 Health Check Checklist

#### Server Health Check
```bash
# 1. Check server status
curl http://localhost:3001/health

# 2. Check API endpoints
curl http://localhost:3001/api/v1

# 3. Check database connection
curl http://localhost:3001/api/v1/projects

# 4. Check file uploads
ls -la server/uploads/

# 5. Check logs
tail -f server/logs/app.log
```

#### Client Health Check
```bash
# 1. Check client build
cd client && npm run build

# 2. Check dev server
npm run dev

# 3. Check API connection
# Open browser dev tools → Network tab
# Navigate to http://localhost:5173
# Check for failed API requests
```

---

## 🤝 Contributing Guidelines

### 📝 How to Contribute

#### 1. Fork & Clone
```bash
# Fork the repository on GitHub
git clone https://github.com/your-username/SabaArchitect.git
cd SabaArchitect
```

#### 2. Set Up Development Environment
```bash
# Install dependencies
npm install
cd server && npm install
cd ../client && npm install

# Copy environment files
cp server/.env.example server/.env
cp client/.env.example client/.env

# Start development servers
npm run dev
```

#### 3. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

#### 4. Make Changes
- Follow existing code style
- Add tests for new features
- Update documentation if needed
- Ensure all tests pass

#### 5. Commit Changes
```bash
# Stage changes
git add .

# Commit with conventional commit format
git commit -m "feat: add project search functionality"
# or
git commit -m "fix: resolve image upload validation bug"
```

#### 6. Push & Create PR
```bash
git push origin feature/your-feature-name
# Create Pull Request on GitHub
```

### 📋 Code Style Guidelines

#### TypeScript/JavaScript
```javascript
// Use meaningful variable names
const userAuthenticationToken = generateToken(user);

// Prefer const over let, avoid var
const apiUrl = process.env.API_URL;
let isLoading = false;

// Use async/await over promises
const fetchProjects = async () => {
  try {
    const response = await axios.get('/api/v1/projects');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};

// Type annotations for function parameters
const createProject = (projectData: ProjectData): Promise<Project> => {
  return Project.create(projectData);
};
```

#### React Components
```jsx
// Use functional components with hooks
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(project.id);
    }
  }, [onClick, project.id]);

  return (
    <div className="project-card" onClick={handleClick}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  );
};
```

#### CSS/Tailwind
```css
/* Use semantic class names */
.project-card {
  @apply bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow;
}

/* Group related styles */
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-md;
  @apply hover:bg-blue-700 focus:ring-2 focus:ring-blue-500;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}
```

### 🧪 Testing Requirements

#### Backend Tests
```javascript
// Test files should end with .test.js or .spec.js
// tests/auth.test.js

describe('Authentication Service', () => {
  beforeEach(async () => {
    // Setup test database
    await setupTestDatabase();
  });

  afterEach(async () => {
    // Cleanup test data
    await cleanupTestDatabase();
  });

  test('should authenticate valid user', async () => {
    // Test implementation
  });
});
```

#### Frontend Tests
```javascript
// Component tests with React Testing Library
// components/__tests__/ProjectCard.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from '../ProjectCard';

describe('ProjectCard Component', () => {
  const mockProject = {
    id: '1',
    title: 'Test Project',
    description: 'Test Description'
  };

  test('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
```

### 📋 Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Code is commented, particularly in hard-to-understand areas
- [ ] Corresponding changes to documentation made
- [ ] No new warnings introduced
```

---

## 📚 Additional Resources

### 📖 Learning Resources

#### Architecture & Design
- [Architectural Photography Best Practices](https://example.com)
- [Modern Web Design for Architecture Firms](https://example.com)
- [UX Design Principles for Professional Services](https://example.com)

#### Technical Documentation
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [MongoDB Schema Design Patterns](https://www.mongodb.com/blog/post/building-with-patterns-a-summary)

#### Tools & Libraries
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)

### 🔗 Useful Links

#### Development Tools
- [VS Code Extensions for React](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)
- [Postman API Testing](https://www.postman.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

#### Deployment Platforms
- [Vercel](https://vercel.com/) - Frontend deployment
- [Railway](https://railway.app/) - Backend deployment
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database hosting
- [Cloudinary](https://cloudinary.com/) - Image management

#### Monitoring & Analytics
- [Sentry](https://sentry.io/) - Error tracking
- [LogRocket](https://logrocket.com/) - Frontend monitoring
- [New Relic](https://newrelic.com/) - Application performance

---

## 🎉 Conclusion

**SabaArchitect** is now a fully functional, professional-grade architecture web application built with modern technologies and best practices. This documentation provides everything needed to understand, develop, deploy, and maintain the application.

### 🚀 What We've Built

✅ **Complete Fullstack Application**
- Modern React frontend with TypeScript
- Robust Node.js backend with Express
- MongoDB database with optimized schemas
- Professional Docker containerization

✅ **Production-Ready Features**
- Secure JWT authentication
- File upload system with validation
- Comprehensive error handling
- API documentation and testing
- Responsive, accessible design

✅ **Developer Experience**
- Hot reload development environment
- Type safety throughout the stack
- Comprehensive testing setup
- Code quality tools (ESLint, Prettier)
- Detailed documentation

✅ **Security & Performance**
- Industry-standard security measures
- Optimized database queries
- Image optimization and lazy loading
- Comprehensive error handling
- Production deployment guide

### 🎯 Next Steps

1. **Implement Advanced Features**
   - Real-time notifications
   - Advanced search and filtering
   - Social media integration
   - SEO optimization

2. **Enhance User Experience**
   - Progressive Web App features
   - Offline functionality
   - Advanced animations
   - Accessibility improvements

3. **Scale & Optimize**
   - Implement caching strategies
   - Add CDN for asset delivery
   - Database optimization
   - Performance monitoring

### 👨‍💻 Support & Community

- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Join the community discussions
- **Documentation**: Keep this documentation updated
- **Contributing**: Follow the contribution guidelines

---

**Built with ❤️ for architectural excellence**

*Last updated: June 27, 2025*
