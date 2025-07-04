# Deploy SabaArchitect to Railway

## Quick Setup (5 minutes)

### 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Login to Railway
```bash
railway login
```

### 3. Initialize Project
```bash
railway init
# Select "Deploy from current directory"
# Choose a project name
```

### 4. Set Environment Variables
```bash
railway variables set JWT_SECRET="your-production-jwt-secret-here"
railway variables set MONGO_USER="admin"
railway variables set MONGO_PASSWORD="your-secure-password"
```

### 5. Deploy
```bash
railway up
```

### 6. Get Your Public URL
```bash
railway domain
# Your app will be available at: https://your-app-name.railway.app
```

## Alternative: Render Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connect to Render
- Go to https://render.com
- Connect your GitHub repository
- Create new "Web Service"
- Choose Docker deployment
- Set build command: `docker build -f docker/Dockerfile.client .`

## Environment Variables for Production

Add these in your hosting platform:

```env
# Backend
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb://username:password@host:port/database
JWT_SECRET=your-secure-jwt-secret-minimum-32-characters
CORS_ORIGIN=https://your-frontend-domain.com

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# Frontend
VITE_API_URL=https://your-backend-api-domain.com/api/v1
```

## Expected Result

After deployment, you'll get URLs like:
- **Frontend:** `https://sabaarchitect-frontend.railway.app`
- **Backend API:** `https://sabaarchitect-backend.railway.app/api/v1`

You can then share the frontend URL with anyone!
