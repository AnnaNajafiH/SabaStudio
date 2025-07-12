# SabaStudio

A professional web application for architecture services built with modern fullstack technologies.

## 🚀 Technologies

### Frontend (Client)
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **Context API** - State management

### Backend (Server)
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe development
- **MongoDB** - Database with Mongoose ODM
- **Nodemailer** - Email service integration
- **Express-validator** - Input validation
- **Express-rate-limit** - Rate limiting middleware
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB database

## 🛠️ Getting Started

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SabaStudio
   ```

2. **Install dependencies**
   ```bash
   # Root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Server environment
   cd server
   cp .env.example .env
   # Edit .env with your:
   # - MongoDB URI
   # - JWT secret
   # - Email credentials (optional)
   ```

4. **Start development servers**
   ```bash
   # Terminal 1 - Start client
   cd client
   npm run dev
   
   # Terminal 2 - Start server
   cd server
   npm run dev
   ```

## 📁 Project Structure

```
SabaStudio/
├── client/                # React frontend
│   ├── public/           # Static files
│   └── src/
│       ├── components/   # Reusable components
│       ├── constants/    # App constants
│       ├── hooks/        # Custom hooks
│       ├── pages/        # Page components
│       ├── services/     # API services
│       └── types/        # TypeScript types
│
├── server/               # Express backend
│   └── src/
│       ├── config/      # App configuration
│       ├── controllers/ # Route controllers
│       ├── middleware/  # Express middleware
│       ├── models/      # Database models
│       ├── routes/      # API routes
│       └── services/    # Business logic
│
└── README.md            # Project documentation
- Responsive design for architecture showcase
- Component-based architecture
- State management (Context API/Redux)

### Server (Backend)
- RESTful API with Express and TypeScript
- Authentication and authorization
- Database integration
- File upload handling for architectural assets

### Shared
- Common TypeScript interfaces and types
- Utility functions used by both client and server
- API response schemas

### Docker
- Development and production Dockerfiles
- Docker Compose configuration
- Environment-specific configurations

## 🎯 Features

### ✅ Completed
- [x] **Contact Form** - Fully functional with validation and email notifications
- [x] **Email Service** - Professional email templates with Nodemailer
- [x] **Admin API** - Contact management with CRUD operations
- [x] **Rate Limiting** - Anti-spam protection for forms
- [x] **Input Validation** - Comprehensive form validation
- [x] **Error Handling** - Robust error handling and user feedback
- [x] **Responsive Design** - Mobile-first responsive layout
- [x] **TypeScript** - Full type safety across the application

### 🚧 In Progress
- [ ] Project portfolio showcase
- [ ] Client management system
- [ ] Project timeline tracking
- [ ] Document and image management
- [ ] Admin dashboard UI
- [ ] Authentication system
- [ ] SEO optimization

### 💡 Planned
- [ ] Project filtering and search
- [ ] Image gallery with lightbox
- [ ] Blog/news section
- [ ] Multi-language support
- [ ] Analytics integration

## 🔧 Development

### Available Scripts

**Client:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Server:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Start production server

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request



## 👤 Author
- Nahid Najafi 

**SStudio**
- Professional Architecture Services
- Modern Web Solutions

---

*Built with ❤️ for SStudio*
# SStudio
