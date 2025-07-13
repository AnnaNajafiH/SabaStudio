# Authentication System Documentation

## Backend Files

### 1. Models
- `server/src/models/User.ts`
  - Defines user schema
  - Handles password hashing
  - Email uniqueness validation
  - Fields: name, email, password, role, isActive
  - Pre-save middleware for password hashing
  - Methods for password comparison

### 2. Controllers
- `server/src/controllers/authController.ts`
  - Handles signup logic
  - Handles login logic
  - Handles logout
  - Profile retrieval
  - Password change
  - User CRUD operations
  - Key functions:
    - signup(): Creates new user
    - login(): Authenticates user
    - logout(): Clears auth cookie
    - getProfile(): Gets user profile
    - changePassword(): Updates password

### 3. Routes
- `server/src/routes/authRoutes.ts`
  - Defines API endpoints
  - Routes:
    - POST /auth/signup
    - POST /auth/login
    - POST /auth/logout
    - GET /auth/profile
    - PUT /auth/change-password/:id
    - GET /auth/check-email (diagnostic)

### 4. Middleware
- `server/src/middleware/auth.ts`
  - Token verification
  - Route protection
  - User authentication

- `server/src/middleware/adminAuth.ts`
  - Admin role verification
  - Admin route protection

- `server/src/middleware/middleware.config.ts`
  - CORS configuration
  - Cookie settings
  - Body parsing
  - Security headers

### 5. Validation
- `server/src/validation/authValidation.ts`
  - Input validation for signup
  - Input validation for login
  - Password requirements
  - Email format validation

### 6. Configuration
- `server/src/config/app.config.ts`
  - Environment variables
  - CORS settings
  - Cookie settings
  - JWT configuration

## Frontend Files

### 1. Components
- `client/src/pages/Auth.tsx`
  - Login/Signup form
  - Form validation
  - Error handling
  - Loading states
  - Success redirects

### 2. Services
- `client/src/services/api.ts`
  - API client setup
  - Authentication endpoints
  - Axios configuration
  - Cookie handling
  - Error handling
  - Methods:
    - signup()
    - signin()
    - signout()
    - getProfile()

### 3. Hooks
- `client/src/hooks/useAuth.tsx`
  - Authentication context
  - User state management
  - Authentication methods
  - Loading states
  - Error handling
  - Auto-authentication check

### 4. Types
- `client/src/types/index.ts`
  - User interface
  - API response types
  - Authentication types
  - Error types

### 5. Context
- AuthContext (in useAuth.tsx)
  - Global auth state
  - User information
  - Authentication status
  - Loading states

## Database Configuration

### 1. MongoDB Indexes
Required indexes in the users collection:
```javascript
{
  "email": 1,
  "unique": true,
  "collation": { "locale": "en", "strength": 2 }
}
```

### 2. Environment Variables
Required environment variables:
```env
# Backend (.env)
JWT_SECRET=your-secret-key
MONGODB_URI=your-mongodb-uri
NODE_ENV=development|production

# Frontend (.env)
VITE_API_URL=http://localhost:3002/api/v1
```

## Authentication Flow

### 1. Signup Flow
1. User fills signup form (`Auth.tsx`)
2. Frontend validates input
3. Makes POST request to `/auth/signup`
4. Backend validates input (`authValidation.ts`)
5. Checks email uniqueness
6. Creates user in database
7. Sets authentication cookie
8. Returns user data
9. Frontend updates auth context
10. Redirects to home page

### 2. Login Flow
1. User fills login form (`Auth.tsx`)
2. Frontend validates input
3. Makes POST request to `/auth/login`
4. Backend validates credentials
5. Sets authentication cookie
6. Returns user data
7. Frontend updates auth context
8. Redirects to home page

### 3. Logout Flow
1. User clicks logout
2. Frontend calls signout
3. Backend clears auth cookie
4. Frontend clears auth context
5. Redirects to login page

### 4. Auto-Authentication
1. App loads
2. useAuth hook checks for existing session
3. Makes GET request to `/auth/profile`
4. If valid cookie exists, returns user data
5. Updates auth context with user data

## Security Considerations

1. Password Security:
   - Minimum 6 characters
   - Hashed using bcrypt
   - Salt rounds: 10

2. Cookie Security:
   - HttpOnly
   - Secure in production
   - SameSite policy
   - Domain restricted

3. CORS Security:
   - Whitelist of allowed origins
   - Credentials enabled
   - Methods restricted
   - Headers restricted

4. Input Validation:
   - Email format
   - Password requirements
   - Required fields
   - XSS prevention

## Error Handling

1. Frontend Errors:
   - Form validation
   - API error display
   - Network error handling
   - Loading states

2. Backend Errors:
   - Validation errors
   - Database errors
   - Authentication errors
   - Server errors

## Testing

### Frontend Tests:
- Form validation
- Authentication flow
- Protected routes
- Error states

### Backend Tests:
- Route authentication
- Input validation
- User creation
- Login/logout flow

## Deployment Considerations

1. Environment Variables:
   - Set all required env vars
   - Use production values
   - Secure secrets

2. Security Headers:
   - CORS configuration
   - CSP headers
   - Rate limiting

3. Database:
   - Proper indexes
   - Connection pooling
   - Error handling
