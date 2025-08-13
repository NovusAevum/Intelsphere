# 🚀 IntelSphere Production Deployment Guide

## Overview
IntelSphere is an enterprise-grade unified intelligence command platform with advanced AI capabilities, OSINT intelligence, and comprehensive business intelligence features.

## 🏗️ Architecture
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (Neon) - Optional
- **AI Services**: OpenAI, Anthropic, Cohere, Google Gemini, XAI - Optional
- **Security**: Rate limiting, security headers, CORS protection

## 📋 Prerequisites
- Node.js 18+ 
- npm 9+
- Docker & Docker Compose (for containerized deployment)
- PostgreSQL database (optional)
- AI service API keys (optional)

## 🚀 Quick Start

### 1. Environment Setup
```bash
# Clone the repository
git clone <repository-url>
cd HanisPlayground

# Install dependencies
npm install
cd client && npm install && cd ..
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.production .env

# Edit environment variables
nano .env
```

**Required Environment Variables:**
```env
NODE_ENV=production
PORT=3005
DATABASE_URL=your_production_database_url_here
OPENAI_API_KEY=your_openai_api_key_here
COHERE_API_KEY=your_cohere_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
XAI_API_KEY=your_xai_api_key_here
```

### 3. Production Build
```bash
# Run production deployment script
./deploy-production.sh

# Or manually:
cd client && npm run build && cd ..
rm -rf dist && cp -r client/dist dist
```

### 4. Start Production Server
```bash
# Start with PM2 (recommended)
npm install -g pm2
pm2 start npm --name "intelsphere" -- start

# Or start directly
npm start
```

## 🐳 Docker Deployment

### 1. Build and Run
```bash
# Build production image
docker build -f Dockerfile.production -t intelsphere:latest .

# Run with docker-compose
docker-compose -f docker-compose.production.yml up -d
```

### 2. Environment Variables
```bash
# Set environment variables
export DATABASE_URL="your_database_url"
export OPENAI_API_KEY="your_openai_key"
# ... other API keys

# Start services
docker-compose -f docker-compose.production.yml up -d
```

## 🔒 Security Features

### Production Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

### Rate Limiting
- 100 requests per 15 minutes per IP
- Configurable limits in server configuration

### Error Handling
- Production-safe error messages
- Comprehensive logging
- Request/response monitoring

## 📊 Monitoring & Health Checks

### Health Endpoints
- **Basic Health**: `/api/health`
- **Detailed Health**: `/api/health/detailed`
- **APEX Status**: `/api/apex/enterprise-status`

### Health Check Response
```json
{
  "status": "healthy",
  "timestamp": "2024-08-13T06:00:00.000Z",
  "uptime": 3600,
  "memory": {
    "rss": 123456789,
    "heapTotal": 987654321,
    "heapUsed": 123456789
  },
  "environment": "production",
  "version": "v18.16.0",
  "platform": "linux",
  "arch": "x64"
}
```

## 🔧 Configuration

### Server Configuration
- **Port**: Configurable via PORT environment variable
- **Static Files**: Served from `/dist` directory
- **API Rate Limiting**: 100 requests per 15 minutes
- **Request Size Limit**: 10MB
- **Caching**: Production-optimized static file caching

### Client Configuration
- **Build Output**: Optimized for production
- **Code Splitting**: Enabled for better performance
- **Asset Optimization**: CSS/JS minification and compression

## 📈 Performance Optimization

### Frontend
- Code splitting and lazy loading
- Optimized bundle sizes
- Static asset caching
- Responsive design optimization

### Backend
- Efficient database queries
- API response caching
- Rate limiting and throttling
- Production logging and monitoring

## 🚨 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
lsof -i :3005

# Kill the process
kill -9 <PID>
```

#### 2. Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear client build cache
cd client && rm -rf node_modules package-lock.json && npm install
```

#### 3. Database Connection Issues
```bash
# Check database URL format
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Logs
```bash
# Server logs
tail -f server.log

# PM2 logs (if using PM2)
pm2 logs intelsphere

# Docker logs (if using Docker)
docker-compose logs -f intelsphere
```

## 🔄 Updates & Maintenance

### Updating the Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
./deploy-production.sh
pm2 restart intelsphere

# Or with Docker
docker-compose -f docker-compose.production.yml down
docker-compose -f docker-compose.production.yml up -d --build
```

### Database Migrations
```bash
# Run database migrations
npm run db:push
```

## 📞 Support

### Production Issues
- Check health endpoints for system status
- Review server logs for error details
- Monitor rate limiting and API usage
- Verify environment variable configuration

### Performance Issues
- Monitor memory usage and uptime
- Check API response times
- Review database query performance
- Analyze frontend bundle sizes

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Database connection established (if applicable)
- [ ] AI service API keys configured (if applicable)
- [ ] Security headers enabled
- [ ] Rate limiting configured
- [ ] Error handling configured
- [ ] Logging enabled
- [ ] Health checks passing
- [ ] Static files optimized
- [ ] SSL/TLS configured (if using Nginx)
- [ ] Monitoring and alerting configured
- [ ] Backup strategy implemented
- [ ] Disaster recovery plan ready

## 🚀 Deployment Success

Once deployed, your IntelSphere platform will be available at:
- **Main Platform**: http://your-domain:3005
- **Health Check**: http://your-domain:3005/api/health
- **API Documentation**: Available through the platform interface

The platform includes:
- ✅ Advanced AI Assistant with 8 AI models
- ✅ Comprehensive OSINT intelligence gathering
- ✅ Business intelligence and market research
- ✅ Neural network visualization and AI analytics
- ✅ Real-time data widgets and live feeds
- ✅ Enterprise-grade security and monitoring
- ✅ Production-ready deployment configuration

**Welcome to IntelSphere - Your Advanced Intelligence Command Center! 🎉**