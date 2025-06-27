# Server (Backend)

Node.js + Express + TypeScript backend API for SabaArchitect.

## 🚀 Technologies

- **Node.js** 
- **Express.js** 
- **TypeScript** 
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Joi** - Data validation

## 📁 Project Structure

```
server/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/         # Database models (Mongoose)
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── config/         # Configuration files
│   ├── validators/     # Request validation schemas
│   └── server.ts       # Main server file
├── uploads/            # File uploads directory
├── tests/              # Test files
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── .env.example        # Environment variables example
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

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Start production server**
   ```bash
   npm start
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server directory:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/sabaarchitect
DB_NAME=sabaarchitect

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

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
- Inquiry forms
- Client messages
- Contact information

## 🛡️ Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt for secure passwords
- **Input Validation** - Joi schemas for request validation
- **File Upload Security** - Secure file handling with Multer

## 📡 API Endpoints

### Public Routes
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/contact` - Submit contact form
- `GET /api/services` - Get services information

### Protected Routes (Admin)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get admin profile
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/upload` - Upload files

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
