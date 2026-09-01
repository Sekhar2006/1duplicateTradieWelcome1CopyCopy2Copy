# 🐳 TRADIE - Docker Deployment

**Production-ready containerized deployment with MySQL**

[![Docker](https://img.shields.io/badge/Docker-ready-blue.svg)](https://www.docker.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ⚡ Quick Start

### Development (30 seconds)

```bash
docker-compose -f docker-compose.dev.yml up -d
```

**Services:**
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MySQL: localhost:3307
- phpMyAdmin: http://localhost:8080

### Production (5 minutes)

```bash
# 1. Setup
./docker-deploy.sh setup

# 2. Configure
nano .env  # Update passwords & secrets

# 3. Deploy
docker-compose up -d

# 4. Verify
curl http://localhost:3001/api/health
```

---

## 📋 Prerequisites

- [Docker](https://docs.docker.com/get-docker/) 20.10+
- [Docker Compose](https://docs.docker.com/compose/install/) 2.0+

**Verify:**
```bash
docker --version
docker-compose --version
```

---

## 🏗️ Architecture

```
Nginx (SSL/TLS) → TRADIE App (Backend + Frontend) → MySQL 8.0
```

**Features:**
- ✅ Multi-stage optimized build (~150MB)
- ✅ Auto-initialized MySQL with 4 schemas
- ✅ Health checks & auto-restart
- ✅ Hot-reload for development
- ✅ SSL/HTTPS ready
- ✅ Production-grade security

---

## 📦 What's Included

### Docker Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Production multi-stage build |
| `docker-compose.yml` | Production stack (MySQL + App + Nginx) |
| `docker-compose.dev.yml` | Development stack (hot-reload + tools) |
| `api/Dockerfile.dev` | Development backend |
| `.env.docker` | Environment template |
| `.dockerignore` | Build optimization |
| `nginx/nginx.conf` | Reverse proxy configuration |
| `docker-deploy.sh` | Deployment helper script |

### Documentation

| File | Description |
|------|-------------|
| `DOCKER_DEPLOYMENT_COMPLETE.md` | Complete guide (800+ lines) |
| `DOCKER_QUICK_START.md` | Quick reference |
| `DOCKER_DEPLOYMENT_SUMMARY.md` | Delivery summary |

---

## 🚀 Deployment Options

### Option 1: Helper Script (Recommended)

```bash
# Make executable
chmod +x docker-deploy.sh

# Interactive menu
./docker-deploy.sh

# Or direct commands
./docker-deploy.sh setup   # Setup environment
./docker-deploy.sh dev     # Start development
./docker-deploy.sh prod    # Start production
./docker-deploy.sh backup  # Backup database
```

### Option 2: Manual Commands

**Development:**
```bash
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml logs -f
docker-compose -f docker-compose.dev.yml down
```

**Production:**
```bash
docker-compose build
docker-compose up -d
docker-compose logs -f
docker-compose down
```

---

## ⚙️ Configuration

### 1. Generate Secrets

```bash
# Using Docker
docker run --rm node:18-alpine node -e \
  "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use helper script
./docker-deploy.sh secrets
```

### 2. Update .env

```bash
cp .env.docker .env
nano .env
```

**Required updates:**
```env
JWT_SECRET=<64-char-hex>
PROVENANCE_JWT_SECRET=<64-char-hex>
DB_PASSWORD=<strong-password>
DB_ROOT_PASSWORD=<strong-password>
APP_URL=https://tradie.app
CORS_ORIGIN=https://tradie.app,https://www.tradie.app
```

---

## 🔧 Common Tasks

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app

# Last 50 lines
docker-compose logs --tail=50 app
```

### Database Access

```bash
# MySQL shell
docker-compose exec mysql mysql -u root -p

# Backup
docker-compose exec mysql mysqldump -u root -p \
  tradie_production > backup.sql

# Restore
docker-compose exec -T mysql mysql -u root -p \
  tradie_production < backup.sql
```

### Container Management

```bash
# Status
docker-compose ps

# Restart
docker-compose restart app

# Shell access
docker-compose exec app sh

# Resource usage
docker stats
```

---

## 🔒 Security

### Enabled by Default

✅ Non-root execution (nodejs user)  
✅ Network isolation (bridge network)  
✅ Health checks & auto-restart  
✅ Security headers (Nginx)  
✅ Rate limiting (10 req/s)  
✅ SSL/TLS ready  

### SSL Setup (Production)

```bash
# Place certificates
mkdir -p nginx/ssl
cp fullchain.pem nginx/ssl/
cp privkey.pem nginx/ssl/

# Start with Nginx
docker-compose --profile production up -d
```

---

## 🐛 Troubleshooting

### Container won't start

```bash
docker-compose logs app
docker-compose build --no-cache
docker-compose up -d
```

### Database connection fails

```bash
docker-compose ps mysql
docker-compose logs mysql
docker-compose restart mysql
```

### Port already in use

```bash
# Find process
sudo lsof -i :3001

# Kill it
sudo kill -9 <PID>

# Or change port in .env
APP_PORT=3002
```

### Out of disk space

```bash
docker system df
docker system prune -a
```

---

## 📊 Service URLs

### Development

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | - |
| Backend | http://localhost:3001 | - |
| MySQL | localhost:3307 | user: tradie_dev<br>pass: dev_password |
| phpMyAdmin | http://localhost:8080 | Same as MySQL |

### Production

| Service | URL | Credentials |
|---------|-----|-------------|
| Application | http://localhost:3001 | - |
| MySQL | localhost:3306 (internal) | From .env |

---

## 📚 Full Documentation

**Comprehensive Guides:**
- [Docker Deployment Complete](DOCKER_DEPLOYMENT_COMPLETE.md) - Full guide
- [Docker Quick Start](DOCKER_QUICK_START.md) - Quick reference
- [Docker Deployment Summary](DOCKER_DEPLOYMENT_SUMMARY.md) - What's included

**General Deployment:**
- [Production Deployment](DEPLOYMENT_PRODUCTION_READY.md) - Traditional deployment
- [Quick Start](DEPLOYMENT_QUICK_START.md) - 30-minute guide
- [API Documentation](API_SPECIFICATION_COMPLETE.md) - Complete API reference

---

## 🎯 Next Steps

### After Deployment

1. ✅ Test all endpoints
2. ✅ Configure monitoring (Sentry, UptimeRobot)
3. ✅ Set up automated backups
4. ✅ Configure SSL certificates
5. ✅ Review security settings

### Scaling

```bash
# Scale app containers
docker-compose up -d --scale app=3

# Add load balancer
# Update nginx configuration
```

---

## 💡 Tips

**Development:**
- Use `docker-compose.dev.yml` for hot-reload
- Enable tools: `--profile tools` (phpMyAdmin, MailHog)
- Mount volumes for code changes without rebuild

**Production:**
- Always use strong, random secrets
- Enable Nginx profile for SSL/HTTPS
- Set up regular database backups
- Monitor container health and logs

**Performance:**
- Use BuildKit: `DOCKER_BUILDKIT=1 docker-compose build`
- Enable layer caching
- Set resource limits in docker-compose.yml

---

## 🆘 Support

**Quick Diagnostics:**
```bash
docker-compose ps
docker-compose logs --tail=50
curl http://localhost:3001/api/health
```

**Get Help:**
- Check `/DOCKER_DEPLOYMENT_COMPLETE.md`
- Review logs: `docker-compose logs -f`
- Inspect containers: `docker inspect <container>`

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file

---

## 🙏 Acknowledgments

- Node.js
- MySQL
- Docker
- Nginx
- React

---

**Status:** ✅ PRODUCTION READY  
**Version:** 2.0  
**Last Updated:** October 22, 2025

---

**Quick Commands:**

```bash
# Start development
docker-compose -f docker-compose.dev.yml up -d

# Start production
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Backup database
./docker-deploy.sh backup
```

**Happy deploying! 🚀**
