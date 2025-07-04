# SabaArchitect Docker Deployment Guide

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Ports 3000, 3001, and 27017 available

### Deploy the Application

1. **Clone and navigate to the project:**
   ```bash
   cd SabaArchitect
   ```

2. **Deploy with Docker Compose:**
   ```bash
   # Make deploy script executable (Linux/Mac)
   chmod +x deploy.sh
   ./deploy.sh
   
   # Or run directly with Docker Compose
   docker-compose up --build -d
   ```

3. **Access the application:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:3001/api/v1
   - **MongoDB:** mongodb://admin:password123@localhost:27017/sabaarchitect

## Services

### Frontend (Client)
- **Port:** 3000
- **Technology:** React + Vite + Tailwind CSS
- **Container:** `sabaarchitect-client`

### Backend (Server)
- **Port:** 3001
- **Technology:** Node.js + Express + TypeScript
- **Container:** `sabaarchitect-server`

### Database (MongoDB)
- **Port:** 27017
- **Technology:** MongoDB
- **Container:** `sabaarchitect-mongo`
- **Credentials:** admin / password123

## Configuration

### Environment Variables

**Backend (.env):**
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb://admin:password123@mongodb:27017/sabaarchitect?authSource=admin
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env.production):**
```env
VITE_API_URL=http://localhost:3001/api/v1
VITE_APP_NAME=SabaArchitect
```

### Email Configuration (Optional)
Add to docker-compose.yml environment section:
```yaml
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@sabaarchitect.com
ADMIN_EMAIL=admin@sabaarchitect.com
```

## Docker Commands

### Basic Commands
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart a service
docker-compose restart server

# Shell access
docker-compose exec server sh
docker-compose exec client sh
docker-compose exec mongodb mongosh
```

### Monitoring
```bash
# Check service status
docker-compose ps

# View resource usage
docker stats

# View logs for specific service
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f mongodb
```

### Maintenance
```bash
# Update and rebuild
docker-compose down
docker-compose up --build -d

# Clean up (removes volumes)
docker-compose down --volumes --remove-orphans

# Remove unused Docker resources
docker system prune -a
```

## Data Persistence

- **MongoDB Data:** Stored in `mongodb_data` volume
- **Server Uploads:** Stored in `server_uploads` volume
- **Volumes persist** between container restarts

## Health Checks

- **Server:** Built-in health check on `/api/v1`
- **MongoDB:** Native MongoDB health monitoring
- **Client:** Nginx serves static files with reverse proxy

## Production Considerations

### Security
1. Change default MongoDB credentials
2. Use strong JWT secrets
3. Enable HTTPS with SSL certificates
4. Configure firewall rules
5. Use environment-specific configurations

### Performance
1. Enable MongoDB authentication in production
2. Configure nginx caching for static assets
3. Set up proper logging and monitoring
4. Use Docker resource limits

### Scaling
1. Use Docker Swarm or Kubernetes for orchestration
2. Set up load balancing for multiple instances
3. Use external MongoDB service for better scalability
4. Implement proper backup strategies

## Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Check what's using the ports
netstat -tlnp | grep :3000
netstat -tlnp | grep :3001
netstat -tlnp | grep :27017
```

**Container not starting:**
```bash
# Check logs
docker-compose logs [service_name]

# Check container status
docker-compose ps
```

**Database connection issues:**
```bash
# Connect to MongoDB directly
docker-compose exec mongodb mongosh -u admin -p password123

# Check network connectivity
docker-compose exec server ping mongodb
```

**Frontend not loading:**
```bash
# Check if API is accessible
curl http://localhost:3001/api/v1

# Check nginx configuration
docker-compose exec client cat /etc/nginx/conf.d/default.conf
```

## Development vs Production

### Development
- Use `npm run dev` for hot reload
- Expose individual ports
- Use development environment variables

### Production (Docker)
- Optimized builds
- Production-ready nginx configuration
- Proper health checks and monitoring
- Secure defaults and authentication
