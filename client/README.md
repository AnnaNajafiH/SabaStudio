# Client (Frontend)

React + TypeScript frontend for SabaArchitect.

## 🚀 Technologies

- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

## 📁 Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API service functions
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── styles/         # Global styles
│   ├── App.tsx         # Main App component
│   └── main.tsx        # React entry point
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## 🛠️ Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start development server (usually on http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🎨 Design System

The frontend uses Tailwind CSS for styling with a focus on:
- **Responsive Design** - Mobile-first approach
- **Modern Architecture Aesthetics** - Clean, minimalistic design
- **Professional Color Palette** - Sophisticated architectural themes
- **Typography** - Clear, readable fonts suitable for professional content

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=SabaArchitect
```

### Key Features
- Modern React functional components with hooks
- TypeScript for type safety
- Responsive design with Tailwind CSS
- Client-side routing with React Router
- API integration with Axios
- Component-based architecture
- Hot module replacement for fast development

## 📱 Pages Structure

- **Home** - Landing page with hero section and featured content
- **About** - Company and architect information
- **Projects** - Portfolio showcase (planned)
- **Services** - Architecture services offered  
- **Contact** - ✅ **Fully functional contact form with validation**
- **Admin** - Administrative dashboard (planned)

## 🎯 Implemented Features

### ✅ Contact Form (Completed)
- **Form Validation** - Real-time client-side validation
- **Error Handling** - User-friendly error messages
- **Success Feedback** - Confirmation messages
- **Loading States** - Visual feedback during submission
- **API Integration** - Connected to backend contact service
- **Responsive Design** - Works on all device sizes

### 📋 Form Fields
- **Name** - Required, 2-100 characters
- **Email** - Required, valid email format
- **Phone** - Optional, international format support
- **Subject** - Required, 5-200 characters  
- **Message** - Required, 10-2000 characters

## 🧩 Component Structure

### Layout Components
- **Header** - Navigation and branding
- **Footer** - Contact info and links
- **Layout** - Page wrapper with consistent structure

### UI Components  
- **LoadingSpinner** - Loading state indicator
- **ErrorBoundary** - Error handling wrapper
- **Buttons, Cards, Forms** - Reusable UI elements

### Feature Components
- **Contact Form** - ✅ Fully implemented with validation
- **Project Gallery** - Portfolio showcase (planned)
- **Service Cards** - Service information display
- **Hero Section** - Landing page banner

### Utility Components
- **API Service** - HTTP client with error handling
- **Custom Hooks** - useAuth, useProjects for state management
- **Type Definitions** - Shared TypeScript interfaces
