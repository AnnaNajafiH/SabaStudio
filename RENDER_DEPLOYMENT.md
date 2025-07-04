# S\Studio Backend Deployment Guide

## Deploy to Render

### Option 1: Automatic Deployment with render.yaml

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Connect to Render:**
   - Go to [Render.com](https://render.com)
   - Sign up/Login with GitHub
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

3. **Environment Variables (Auto-configured in render.yaml):**
   - `NODE_ENV`: production
   - `PORT`: 10000
   - `MONGODB_URI`: Auto-generated from database
   - `CORS_ORIGIN`: https://sstudio-client.onrender.com
   - `JWT_SECRET`: Auto-generated
   - `EMAIL_ENABLED`: false

### Option 2: Manual Web Service Deployment

1. **Create Web Service:**
   - Go to Render Dashboard
   - Click "New" → "Web Service"
   - Connect GitHub repository
   - Select `server` as root directory

2. **Build & Start Commands:**
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm start`

3. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your-mongodb-connection-string>
   DB_NAME=SabaStudio
   CORS_ORIGIN=<your-frontend-url>
   JWT_SECRET=<generate-random-string>
   EMAIL_ENABLED=false
   ```

## Database Setup

### Option 1: MongoDB Atlas (Recommended)
- Use your existing MongoDB Atlas connection
- Update `MONGODB_URI` with Atlas connection string

### Option 2: Render PostgreSQL
- If you want to switch to PostgreSQL, we can help migrate

## Post-Deployment

1. **Test API Health:**
   ```
   GET https://your-app.onrender.com/health
   ```

2. **Seed Database:**
   - Connect to your deployed service
   - Run: `npm run seed` (if needed)

3. **API Endpoints:**
   ```
   GET  /api/v1/projects
   GET  /api/v1/projects/featured  
   POST /api/v1/contact
   GET  /health
   ```

## Troubleshooting

1. **Build Fails:**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in package.json

2. **App Crashes:**
   - Check environment variables
   - Verify database connection
   - Check logs in Render dashboard

3. **CORS Issues:**
   - Update `CORS_ORIGIN` to match your frontend URL
   - Allow multiple origins if needed

## Performance Tips

1. **Free Tier Limitations:**
   - Service spins down after 15 minutes of inactivity
   - Cold starts can take 30+ seconds
   - 512MB RAM limit

2. **Optimization:**
   - Enable response compression (already configured)
   - Use MongoDB connection pooling (already configured)
   - Implement proper error handling (already configured)

## Security

- Environment variables are encrypted at rest
- HTTPS is provided by default
- Rate limiting is configured
- Helmet security headers are enabled
- Input validation with express-validator

## Monitoring

- Check Render logs for errors
- Monitor response times
- Set up uptime monitoring if needed
