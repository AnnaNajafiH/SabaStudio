#!/bin/bash

echo "🚀 Deploying SabaArchitect with Docker..."

# Stop and remove existing containers
echo "📝 Stopping existing containers..."
docker-compose down

# Remove old images (optional - uncomment if you want to rebuild from scratch)
# docker-compose down --rmi all --volumes --remove-orphans

# Build and start all services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service status
echo "📊 Checking service status..."
docker-compose ps

# Show logs for troubleshooting (optional)
echo "📝 Recent logs:"
docker-compose logs --tail=20

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Access your application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3001/api/v1"
echo "   MongoDB: mongodb://admin:password123@localhost:27017/sabaarchitect"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker-compose logs -f [service_name]"
echo "   Stop all: docker-compose down"
echo "   Restart: docker-compose restart [service_name]"
echo "   Shell access: docker-compose exec [service_name] sh"
