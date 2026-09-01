# 🐳 TRADIE Docker Deployment Guide

**Complete containerized deployment with Docker & Docker Compose**

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Development Setup](#development-setup)
5. [Production Deployment](#production-deployment)
6. [Configuration](#configuration)
7. [Management Commands](#management-commands)
8. [Troubleshooting](#troubleshooting)

---

## ⚡ Quick Start

### Development (3 commands)

```bash
# 1. Clone repository
git clone https://github.com/your-org/tradie-app.git
cd tradie-app

# 2. Start development environment
docker-compose -f docker-compose.dev.yml up -d

# 3. Access application
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
# phpMyAdmin: http://localhost:8080
# MySQL: localhost:3307
```

### Production (5 minutes)

```bash
# 1. Copy environment file
cp .env.docker .env

# 2. Generate secure secrets
docker run --rm node:18-alpine node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
# Update JWT_SECRET and PROVENANCE_JWT_SECRET in .env

# 3. Update database passwords in .env
nano .env

# 4. Build and start
docker-compose up -d

# 5. Verify
docker-compose ps
curl http://localhost:3001/api/health
```

---

## 🏗️ Architecture

### Container Stack

```
┌─────────────────────────────────────────────────────────────┐
│                      Nginx (Optional)                       │
│              Reverse Proxy + SSL Termination                │
│                   Port 80, 443 → 3001                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     TRADIE App Container                    │
│         Node.js Backend + React Frontend (static)           │
│                        Port 3001                            │
│  ┌────────────────┐          ┌────────────────┐            │
│  │ Backend API    │  ←────→  │ React Frontend │            │
│  │ (Express.js)   │          │ (Static Build) │            │
│  └────────────────┘          └────────────────┘            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     MySQL 8.0 Container                     │
│              Database with persistent storage               │
│                        Port 3306                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Databases:                                         │    │
│  │ - tradie_production (or tradie_development)        │    │
│  │                                                    │    │
│  │ Auto-initialized with schemas:                     │    │
│  │ 1. schema_mysql.sql                                │    │
│  │ 2. schema_provenance.sql                           │    │
│  │ 3. schema_services_aligned.sql                     │    │
│  │ 4. additional_tables.sql                           │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Multi-Stage Build

```
Stage 1: frontend-builder
  - Node.js 18 Alpine
  - Build React app
  - Output: /app/frontend/build

Stage 2: backend-builder  
  - Node.js 18 Alpine
  - Install production dependencies
  - Copy frontend build

Stage 3: production
  - Node.js 18 Alpine + MySQL client
  - Copy from builders
  - Run as non-root user
  - Health checks enabled
```

---

## 📋 Prerequisites

### Required

- **Docker**: v20.10+ ([Install](https://docs.docker.com/get-docker/))
- **Docker Compose**: v2.0+ ([Install](https://docs.docker.com/compose/install/))

### Verify Installation

```bash
docker --version
# Docker version 24.0.0 or higher

docker-compose --version
# Docker Compose version v2.20.0 or higher
```

### System Requirements

**Minimum:**
- 2 GB RAM
- 10 GB disk space
- 2 CPU cores

**Recommended:**
- 4 GB RAM
- 20 GB disk space
- 4 CPU cores

---

## 🔧 Development Setup

### 1. Start Development Environment

```bash
# Start all services with hot-reload
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

### 2. Development Services

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | - |
| **Backend API** | http://localhost:3001 | - |
| **MySQL** | localhost:3307 | User: `tradie_dev`<br>Pass: `dev_password` |
| **phpMyAdmin** | http://localhost:8080 | Same as MySQL |
| **MailHog** | http://localhost:8025 | - |

### 3. Enable Optional Tools

```bash
# Start with phpMyAdmin and MailHog
docker-compose -f docker-compose.dev.yml --profile tools up -d
```

### 4. Access MySQL in Development

```bash
# Using Docker exec
docker exec -it tradie-mysql-dev mysql -u tradie_dev -pdev_password tradie_development

# Using local MySQL client
mysql -h 127.0.0.1 -P 3307 -u tradie_dev -pdev_password tradie_development

# Using phpMyAdmin
# Open http://localhost:8080
```

### 5. View Logs

```bash
# All services
docker-compose -f docker-compose.dev.yml logs -f

# Specific service
docker-compose -f docker-compose.dev.yml logs -f backend

# Last 50 lines
docker-compose -f docker-compose.dev.yml logs --tail=50 backend
```

### 6. Restart Services

```bash
# Restart all
docker-compose -f docker-compose.dev.yml restart

# Restart specific service
docker-compose -f docker-compose.dev.yml restart backend

# Rebuild and restart (after code changes)
docker-compose -f docker-compose.dev.yml up -d --build
```

---

## 🚀 Production Deployment

### 1. Configure Environment

```bash
# Copy template
cp .env.docker .env

# Edit configuration
nano .env
```

**Critical settings to update:**

```env
# Generate with: docker run --rm node:18-alpine node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=<64-char-random-string>
PROVENANCE_JWT_SECRET=<64-char-random-string>

# Strong passwords
DB_PASSWORD=<strong-password>
DB_ROOT_PASSWORD=<strong-root-password>

# Your domain
APP_URL=https://tradie.app
CORS_ORIGIN=https://tradie.app,https://www.tradie.app

# External API keys
GROK_API_KEY=<your-grok-api-key>
```

### 2. Build Images

```bash
# Build production image
docker-compose build

# Build without cache (clean build)
docker-compose build --no-cache

# View images
docker images | grep tradie
```

### 3. Start Production Stack

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### 4. Verify Deployment

```bash
# Health check
curl http://localhost:3001/api/health

# Expected response:
# {"status":"ok","timestamp":"2025-10-22T12:00:00.000Z"}

# Test login endpoint
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'
```

### 5. SSL/HTTPS Setup (Production)

**Option 1: Let's Encrypt (Recommended)**

```bash
# Install Certbot in host
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d tradie.app -d www.tradie.app

# Copy certificates to nginx/ssl/
sudo cp /etc/letsencrypt/live/tradie.app/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/tradie.app/privkey.pem nginx/ssl/

# Start Nginx
docker-compose --profile production up -d
```

**Option 2: Custom SSL Certificates**

```bash
# Create ssl directory
mkdir -p nginx/ssl

# Copy your certificates
cp /path/to/fullchain.pem nginx/ssl/
cp /path/to/privkey.pem nginx/ssl/

# Set permissions
chmod 644 nginx/ssl/fullchain.pem
chmod 600 nginx/ssl/privkey.pem

# Start Nginx
docker-compose --profile production up -d
```

### 6. Production with Nginx

```bash
# Start with Nginx reverse proxy
docker-compose --profile production up -d

# Services will be available at:
# http://localhost:80 → redirects to HTTPS
# https://localhost:443 → main application
```

---

## ⚙️ Configuration

### Environment Variables

**Database:**
```env
DB_HOST=mysql               # Container name
DB_PORT=3306                # Internal port
DB_USER=tradie_user         # Database user
DB_PASSWORD=secure_password # Database password
DB_NAME=tradie_production   # Database name
DB_ROOT_PASSWORD=root_pass  # Root password
```

**Backend:**
```env
NODE_ENV=production
PORT=3001
APP_URL=https://tradie.app
LOG_LEVEL=info
```

**JWT:**
```env
JWT_SECRET=<64-char-hex>
JWT_EXPIRES_IN=7d
PROVENANCE_JWT_SECRET=<64-char-hex>
PROVENANCE_JWT_EXPIRES_IN=30d
```

**CORS:**
```env
CORS_ORIGIN=https://tradie.app,https://www.tradie.app,https://api.tradie.app
```

### Docker Compose Profiles

**Default profile** (no flag needed):
- MySQL
- Backend + Frontend

**Production profile** (`--profile production`):
- All default services
- Nginx reverse proxy

**Tools profile** (`--profile tools`):
- phpMyAdmin
- MailHog

**Example:**
```bash
# Start with all profiles
docker-compose --profile production --profile tools up -d
```

### Volumes

**Persistent data:**

| Volume | Purpose | Location |
|--------|---------|----------|
| `mysql-data` | Database files | `/var/lib/mysql` |
| `app-logs` | Application logs | `/app/logs` |
| `app-uploads` | File uploads | `/app/uploads` |
| `nginx-logs` | Nginx logs | `/var/log/nginx` |

**Backup volumes:**
```bash
# List volumes
docker volume ls | grep tradie

# Backup MySQL data
docker run --rm -v tradie_mysql-data:/data -v $(pwd):/backup \
  ubuntu tar czf /backup/mysql-backup.tar.gz /data

# Restore MySQL data
docker run --rm -v tradie_mysql-data:/data -v $(pwd):/backup \
  ubuntu tar xzf /backup/mysql-backup.tar.gz -C /
```

---

## 🔧 Management Commands

### Container Management

```bash
# View all containers
docker-compose ps

# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Restart specific service
docker-compose restart app

# View logs
docker-compose logs -f app

# Execute command in container
docker-compose exec app sh

# Access MySQL shell
docker-compose exec mysql mysql -u root -p
```

### Database Management

```bash
# Create database backup
docker-compose exec mysql mysqldump -u root -p \
  tradie_production > backup_$(date +%Y%m%d).sql

# Restore database
docker-compose exec -T mysql mysql -u root -p \
  tradie_production < backup_20251022.sql

# Import schema
docker-compose exec -T mysql mysql -u root -p \
  tradie_production < database/schema_mysql.sql

# Run SQL query
docker-compose exec mysql mysql -u root -p tradie_production \
  -e "SELECT COUNT(*) FROM crop_batches;"
```

### Maintenance

```bash
# Remove unused containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes (CAREFUL!)
docker volume prune

# Clean everything (CAREFUL!)
docker system prune -a --volumes

# Update images
docker-compose pull
docker-compose up -d
```

### Scaling

```bash
# Scale app containers (requires load balancer)
docker-compose up -d --scale app=3

# View scaled containers
docker-compose ps
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Container won't start

```bash
# Check logs
docker-compose logs app

# Check container status
docker-compose ps

# Inspect container
docker inspect tradie-app

# Remove and recreate
docker-compose down
docker-compose up -d
```

#### 2. Database connection fails

```bash
# Check MySQL is running
docker-compose ps mysql

# Check MySQL logs
docker-compose logs mysql

# Test connection
docker-compose exec app nc -zv mysql 3306

# Verify credentials in .env
cat .env | grep DB_
```

#### 3. Port already in use

```bash
# Find process using port
sudo lsof -i :3001

# Kill process
sudo kill -9 <PID>

# Or use different port in .env
APP_PORT=3002
```

#### 4. Permission denied errors

```bash
# Fix volume permissions
docker-compose exec app chown -R nodejs:nodejs /app/logs /app/uploads

# Or run as root temporarily
docker-compose exec -u root app sh
```

#### 5. Out of disk space

```bash
# Check disk usage
df -h

# Clean Docker
docker system df
docker system prune -a

# Remove old images
docker images | grep '<none>' | awk '{print $3}' | xargs docker rmi
```

#### 6. Slow build times

```bash
# Use BuildKit
DOCKER_BUILDKIT=1 docker-compose build

# Build with more CPU
docker-compose build --parallel

# Clear build cache
docker builder prune
```

### Health Checks

```bash
# Check app health
curl http://localhost:3001/api/health

# Check container health
docker-compose ps
# Look for (healthy) status

# View health check logs
docker inspect tradie-app | jq '.[0].State.Health'
```

### Debug Mode

```bash
# Run in foreground (see all logs)
docker-compose up

# Attach to running container
docker attach tradie-app

# Execute shell in container
docker-compose exec app sh

# View environment variables
docker-compose exec app env
```

---

## 📊 Monitoring

### Basic Monitoring

```bash
# Container stats
docker stats

# Specific container
docker stats tradie-app

# Resource usage
docker-compose top
```

### Logs

```bash
# All logs
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100

# Since timestamp
docker-compose logs --since 2025-10-22T12:00:00

# Export logs
docker-compose logs > app-logs.txt
```

### Advanced Monitoring (Optional)

**Prometheus + Grafana:**

Add to `docker-compose.yml`:

```yaml
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3030:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

---

## 🔐 Security Best Practices

### 1. Use Secrets

```bash
# Generate secure secrets
openssl rand -hex 64

# Or using Docker
docker run --rm node:18-alpine node -e \
  "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2. Don't Commit .env

```bash
# Add to .gitignore
echo ".env" >> .gitignore
echo ".env.docker" >> .gitignore
```

### 3. Run as Non-Root

Already configured in Dockerfile:

```dockerfile
USER nodejs
```

### 4. Limit Resources

Add to `docker-compose.yml`:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

### 5. Network Isolation

```bash
# Use custom networks (already configured)
# Services can only communicate within tradie-network
```

### 6. Regular Updates

```bash
# Update base images
docker-compose pull
docker-compose up -d

# Update dependencies
docker-compose exec app npm update
```

---

## 📚 Additional Resources

### Docker Commands Cheat Sheet

```bash
# Build
docker-compose build [service]

# Start
docker-compose up -d

# Stop
docker-compose down

# Restart
docker-compose restart [service]

# Logs
docker-compose logs -f [service]

# Execute command
docker-compose exec [service] [command]

# Shell access
docker-compose exec [service] sh

# List containers
docker-compose ps

# Remove volumes
docker-compose down -v
```

### Related Documentation

- **Deployment Guide:** `/DEPLOYMENT_PRODUCTION_READY.md`
- **Quick Start:** `/DEPLOYMENT_QUICK_START.md`
- **API Documentation:** `/API_SPECIFICATION_COMPLETE.md`
- **Database Schema:** `/database/README.md`
- **Environment Variables:** `/api/.env.example`

---

## 🎯 Summary

✅ **Development:** Hot-reload enabled, phpMyAdmin, MailHog  
✅ **Production:** Multi-stage build, health checks, Nginx  
✅ **Security:** Non-root user, secrets management, SSL  
✅ **Persistence:** MySQL data, logs, uploads  
✅ **Monitoring:** Health checks, logs, stats  
✅ **Scaling:** Ready for horizontal scaling  

**Status:** ✅ PRODUCTION READY

---

**Version:** 2.0 | **Last Updated:** October 22, 2025
