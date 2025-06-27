# SabaArchitect

A professional web application for architecture services built with modern fullstack technologies.

##  Project Structure

```
SabaArchitect/
├── client/          # React + TypeScript frontend
├── server/          # Node.js + Express + TypeScript backend
├── shared/          # Shared types and interfaces
├── docker/          # Docker configuration files
├── README.md        # This file
└── .gitignore       # Git ignore rules
```

## 🚀 Technologies

### Frontend (Client)
- **React** 
- **TypeScript** 
- **Vite**
- **Tailwind CSS** 

### Backend (Server)
- **Node.js** 
- **Express** 
- **TypeScript** 
- **MongoDB** 

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker & Docker Compose

## 🛠️ Getting Started

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SabaArchitect
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Start development servers**
   ```bash
   # Terminal 1 - Start client
   cd client
   npm run dev
   
   # Terminal 2 - Start server
   cd server
   npm run dev
   ```

### Docker Setup

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

## 📁 Detailed Structure

### Client (Frontend)
- Modern React application with TypeScript
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

## 🎯 Features (Planned)

- [ ] Project portfolio showcase
- [ ] Client management system
- [ ] Project timeline tracking
- [ ] Document and image management
- [ ] Contact and inquiry forms
- [ ] Admin dashboard
- [ ] Responsive design
- [ ] SEO optimization

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

**Saba Architect**
- Professional Architecture Services
- Modern Web Solutions

---

*Built with ❤️ for SabaArchitect*
# SabaArchitect
