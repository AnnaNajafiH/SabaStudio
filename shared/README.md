# Shared

Shared TypeScript types, interfaces, and utilities used by both client and server.

## 🎯 Purpose

This package contains common code shared between the frontend (client) and backend (server) applications:

- **Type Definitions** - Shared TypeScript interfaces and types
- **API Schemas** - Request/response type definitions
- **Utility Functions** - Common helper functions
- **Constants** - Shared application constants
- **Validation Schemas** - Common validation logic

## 📁 Project Structure

```
shared/
├── src/
│   ├── types/          # TypeScript type definitions
│   │   ├── project.ts  # Project-related types
│   │   ├── user.ts     # User/auth types
│   │   ├── api.ts      # API request/response types
│   │   └── common.ts   # Common utility types
│   ├── interfaces/     # TypeScript interfaces
│   │   ├── IProject.ts # Project interface
│   │   ├── IUser.ts    # User interface
│   │   └── IContact.ts # Contact interface
│   ├── constants/      # Application constants
│   │   ├── api.ts      # API endpoints and status codes
│   │   ├── project.ts  # Project categories, statuses
│   │   └── validation.ts # Validation rules
│   ├── utils/          # Utility functions
│   │   ├── validation.ts # Common validation helpers
│   │   ├── formatting.ts # Data formatting utilities
│   │   └── date.ts     # Date manipulation helpers
│   └── index.ts        # Main export file
├── dist/               # Compiled JavaScript output
├── package.json        # Package configuration
├── tsconfig.json       # TypeScript configuration
└── README.md          # This file
```

## 🛠️ Development

### Prerequisites
- Node.js (v18 or higher)
- TypeScript

### Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build the package**
   ```bash
   npm run build
   ```

3. **Development mode (watch)**
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Watch mode for development
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 📝 Usage

### In Client (React)
```typescript
import { IProject, ProjectStatus, API_ENDPOINTS } from '@sabaarchitect/shared';

const project: IProject = {
  id: '1',
  title: 'Modern Villa',
  status: ProjectStatus.COMPLETED,
  // ...
};
```

### In Server (Node.js)
```typescript
import { IProject, validateProject, API_ENDPOINTS } from '@sabaarchitect/shared';

app.get(API_ENDPOINTS.PROJECTS, (req, res) => {
  // Use shared types and utilities
});
```

##  Type Definitions

### Core Interfaces

#### IProject
```typescript
interface IProject {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### IUser
```typescript
interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}
```

#### IContact
```typescript
interface IContact {
  id: string;
  name: string;
  email: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
}
```

### API Types

#### API Response Wrapper
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

#### Pagination
```typescript
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

## 📊 Constants

### Project Categories
- Residential
- Commercial  
- Industrial
- Landscape
- Interior Design
- Urban Planning

### Project Status
- Draft
- In Progress
- Under Review
- Completed
- Archived

### API Endpoints
Centralized API endpoint definitions for consistent usage across client and server.

## 🔧 Utilities

### Validation Helpers
- Email validation
- Phone number validation
- File type validation
- Date range validation

### Formatting Utilities
- Date formatting
- Currency formatting
- File size formatting
- Text truncation

## 🧪 Benefits

1. **Type Safety** - Shared types ensure consistency
2. **DRY Principle** - Avoid code duplication
3. **Maintainability** - Single source of truth
4. **Development Speed** - Reusable components
5. **Error Prevention** - Compile-time type checking
