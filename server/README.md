# Server (Backend)

Node.js + Express + TypeScript backend API for SabaArchitect.

## 🚀 Technologies

- **Node.js** 
- **Express.js** 
- **TypeScript** 
- **MongoDB** - NoSQL database with Mongoose ODM
- **Nodemailer** - Email service for notifications
- **Express-validator** - Input validation and sanitization
- **Express-rate-limit** - Rate limiting for API protection
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
server/
├── src/
│   ├── controllers/     # Route controllers (MVC pattern)
│   ├── middleware/      # Custom middleware (rate limiting, etc.)
│   ├── models/         # Database models (Mongoose)
│   ├── routes/         # API routes (clean routing)
│   ├── services/       # Business logic (email service, etc.)
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── config/         # Configuration files
│   ├── validation/     # Request validation schemas
│   ├── server.ts       # Main server file
│   └── test-server.ts  # Test server (no database required)
├── uploads/            # File uploads directory
├── tests/              # Test files
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── .env.example        # Environment variables example
└── .env               # Environment variables (not in git)
```

## 🛠️ Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Quick Start (Test Server - No Database Required)**
   ```bash
   npm run test-server
   ```
   
4. **Full Development Setup**
   ```bash
   # Make sure MongoDB is running locally or configure cloud URI
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Start production server**
   ```bash
   npm start
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run test-server` - Start test server (no database required)
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run seed` - Seed database with sample data

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server directory:

```env
# Server
PORT=3002
NODE_ENV=development
HOST=localhost

# Database
MONGODB_URI=mongodb://localhost:27017/sabaarchitect
DB_NAME=sabaarchitect

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Email Service (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@sabaarchitect.com
ADMIN_NAME=SabaArchitect Admin

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# CORS
CORS_ORIGIN=http://localhost:5173
```

## 🗃️ Database Models

### Project
- Title, description, category
- Images, documents
- Client information
- Timeline, status

### User (Admin)
- Authentication credentials
- Profile information
- Permissions

### Contact
- **Contact form submissions** - With validation and email notifications
- **Admin contact management** - CRUD operations for contact messages
- **Email notifications** - Automated admin and customer emails
- **Anti-spam protection** - Rate limiting and validation

## 🛡️ Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt for secure passwords
- **Input Validation** - Joi schemas for request validation
- **File Upload Security** - Secure file handling with Multer

## 📡 API Endpoints

### Contact Routes (Public)
- `POST /api/v1/contact` - Submit contact form
- `POST /api/v1/contact/test-email` - Test email functionality

### Contact Management (Admin)
- `GET /api/v1/contact` - Get all contact messages (with pagination)
- `GET /api/v1/contact/:id` - Get specific contact message
- `PUT /api/v1/contact/:id/status` - Update contact status
- `DELETE /api/v1/contact/:id` - Delete contact message

### Project Routes (Planned)
- `GET /api/v1/projects` - Get all projects
- `GET /api/v1/projects/:id` - Get project by ID
- `POST /api/v1/projects` - Create new project (admin)
- `PUT /api/v1/projects/:id` - Update project (admin)
- `DELETE /api/v1/projects/:id` - Delete project (admin)

### Authentication (Planned)
- `POST /api/v1/auth/login` - Admin login
- `GET /api/v1/auth/profile` - Get admin profile
- `POST /api/v1/auth/logout` - Admin logout

### Error Handling
- Centralized error handling middleware
- Consistent error response format
- Proper HTTP status codes
- Detailed error logging

## 🧪 Testing

- **Jest** - Testing framework
- **Supertest** - HTTP assertions
- Unit tests for utilities and services
- Integration tests for API endpoints

## 📊 Logging & Monitoring

- **Morgan** - HTTP request logging
- **Custom Logger** - Application-specific logging
- **Error Tracking** - Comprehensive error logging
- **Performance Monitoring** - Request timing and metrics

## 🏗️ Architecture

### MVC Pattern Implementation

The backend follows **Model-View-Controller (MVC)** architecture with clear separation of concerns:

#### **Models** (`src/models/`)
- **Contact.ts** - Contact form data with validation, indexes, and methods
- **Project.ts** - Project information with virtual properties
- **User.ts** - User authentication and profile data
- **index.ts** - Model exports and database connection

#### **Controllers** (`src/controllers/`)
- **contactController.ts** - Business logic for contact operations
- Clean, testable methods with proper error handling
- No direct database queries in routes

#### **Views/Routes** (`src/routes/`)
- **contactRoutes.ts** - Clean routing with middleware and validation
- **authRoutes.ts** - Authentication routes
- **index.ts** - Route organization and API versioning

#### **Supporting Architecture**
- **Middleware** (`src/middleware/`) - Rate limiting, authentication, error handling
- **Validation** (`src/validation/`) - Input validation schemas
- **Services** (`src/services/`) - Email service, external API integrations
- **Configuration** (`src/config/`) - Database, environment setup

### Benefits
- **Maintainable** - Clear code organization
- **Testable** - Isolated business logic
- **Scalable** - Easy to add new features
- **Professional** - Industry-standard patterns
