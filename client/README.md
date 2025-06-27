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

- **Home** - Landing page with hero section
- **About** - Company and architect information
- **Projects** - Portfolio showcase
- **Services** - Architecture services offered
- **Contact** - Contact form and information
- **Admin** - Administrative dashboard (protected)

## 🧩 Component Structure

- **Layout** - Header, Footer, Navigation
- **UI Components** - Buttons, Cards, Forms, Modals
- **Feature Components** - Project Gallery, Service Cards, Contact Form
- **Shared Components** - Loading, Error boundaries, etc.
