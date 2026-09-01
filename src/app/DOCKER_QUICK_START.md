# 🐳 TRADIE Docker - QUICK START

**Get TRADIE running with Docker in 5 minutes!**

---

## ⚡ Ultra Quick Start

### Development (3 commands)

```bash
# 1. Start
docker-compose -f docker-compose.dev.yml up -d

# 2. Access
# Frontend: http://localhost:3000
# Backend:  http://localhost:3001
# MySQL:    localhost:3307

# 3. Stop
docker-compose -f docker-compose.dev.yml down
```

### Production (5 commands)

```bash
# 1. Setup
./docker-deploy.sh setup

# 2. Edit .env (update passwords & secrets)
nano .env

# 3. Build
docker-compose build

# 4. Start
docker-compose up -d

# 5. Verify
curl http://localhost:3001/api/health
```

---

## 🎯 Quick Commands

### Using Helper Script

```bash
# Make executable
chmod +x docker-deploy.sh

# Interactive menu
./docker-deploy.sh

# Direct commands
./docker-deploy.sh setup      # Setup environment
./docker-deploy.sh dev        # Start development
./docker-deploy.sh prod       # Start production
./docker-deploy.sh status     # Show status
./docker-deploy.sh stop dev   # Stop development
./docker-deploy.sh backup     # Backup database
./docker-deploy.sh clean      # Clean resources
```

### Manual Commands

**Development:**
```bash
# Start
docker-compose -f docker-compose.dev.yml up -d

# Logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop
docker-compose -f docker-compose.dev.yml down

# Restart
docker-compose -f docker-compose.dev.yml restart
```

**Production:**
```bash
# Build
docker-compose build

# Start
docker-compose up -d

# Logs
docker-compose logs -f

# Stop
docker-compose down

# Restart
docker-compose restart app
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

# Since timestamp
docker-compose logs --since 2025-10-22T12:00:00
```

### Database Access

```bash
# MySQL shell
docker-compose exec mysql mysql -u root -p

# Import schema
docker-compose exec -T mysql mysql -u root -p tradie_production < database/schema_mysql.sql

# Backup
docker-compose exec mysql mysqldump -u root -p tradie_production > backup.sql

# Restore
docker-compose exec -T mysql mysql -u root -p tradie_production < backup.sql
```

### Container Management

```bash
# List containers
docker-compose ps

# Shell access
docker-compose exec app sh

# Execute command
docker-compose exec app npm --version

# View stats
docker stats

# Inspect container
docker inspect tradie-app
```

---

## 🐛 Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs app

# Rebuild
docker-compose build --no-cache app
docker-compose up -d
```

### Database connection fails

```bash
# Check MySQL is up
docker-compose ps mysql

# Check logs
docker-compose logs mysql

# Restart MySQL
docker-compose restart mysql
```

### Port already in use

```bash
# Find process
sudo lsof -i :3001

# Kill process
sudo kill -9 <PID>

# Or change port in .env
APP_PORT=3002
```

### Out of disk space

```bash
# Check usage
docker system df

# Clean up
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
| MailHog | http://localhost:8025 | - |

### Production

| Service | URL | Credentials |
|---------|-----|-------------|
| Application | http://localhost:3001 | - |
| MySQL | localhost:3306 | From .env file |
| Nginx (optional) | http://localhost:80 | - |

---

## ⚙️ Configuration

### Generate Secrets

```bash
# Using Docker
docker run --rm node:18-alpine node -e \
  "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using OpenSSL
openssl rand -hex 64

# Using helper script
./docker-deploy.sh secrets
```

### Update .env

```bash
# Copy template
cp .env.docker .env

# Edit file
nano .env

# Required updates:
# - JWT_SECRET (64 chars)
# - PROVENANCE_JWT_SECRET (64 chars)
# - DB_PASSWORD (strong password)
# - DB_ROOT_PASSWORD (strong password)
# - APP_URL (your domain)
# - CORS_ORIGIN (your domain)
```

---

## 📦 Docker Compose Files

### docker-compose.yml (Production)

**Services:**
- MySQL 8.0
- TRADIE App (Backend + Frontend)
- Nginx (optional, with `--profile production`)

**Usage:**
```bash
docker-compose up -d                    # Start
docker-compose --profile production up  # With Nginx
docker-compose down                     # Stop
```

### docker-compose.dev.yml (Development)

**Services:**
- MySQL 8.0
- Backend (hot-reload)
- Frontend (hot-reload)
- phpMyAdmin (optional, with `--profile tools`)
- MailHog (optional, with `--profile tools`)

**Usage:**
```bash
docker-compose -f docker-compose.dev.yml up -d              # Start
docker-compose -f docker-compose.dev.yml --profile tools up # With tools
docker-compose -f docker-compose.dev.yml down               # Stop
```

---

## 🔐 Security Checklist

- [ ] Generated secure JWT secrets (64+ chars)
- [ ] Updated database passwords
- [ ] Set proper CORS_ORIGIN
- [ ] Using HTTPS in production
- [ ] .env file not committed to git
- [ ] Running as non-root user (done in Dockerfile)
- [ ] Resource limits set (optional)
- [ ] Regular backups configured

---

## 📚 Full Documentation

**Comprehensive Guide:** `/DOCKER_DEPLOYMENT_COMPLETE.md`

Includes:
- Architecture diagrams
- Complete configuration guide
- SSL/HTTPS setup
- Monitoring & logging
- Scaling instructions
- Advanced troubleshooting

---

## 🎯 Quick Reference

### Start Fresh

```bash
# Remove everything
docker-compose down -v

# Rebuild and start
docker-compose build --no-cache
docker-compose up -d
```

### Update Code

```bash
# Pull latest
git pull

# Rebuild
docker-compose build

# Restart
docker-compose up -d
```

### Backup & Restore

```bash
# Backup
./docker-deploy.sh backup

# Or manually
docker-compose exec mysql mysqldump -u root -p \
  tradie_production > backup.sql

# Restore
docker-compose exec -T mysql mysql -u root -p \
  tradie_production < backup.sql
```

### Monitor

```bash
# Container status
docker-compose ps

# Resource usage
docker stats

# Health check
curl http://localhost:3001/api/health
```

---

## 🆘 Get Help

**Quick Diagnostics:**
```bash
# Run all checks
docker-compose ps
docker-compose logs --tail=50
curl http://localhost:3001/api/health
```

**Common Issues:**
1. Port conflict → Change APP_PORT in .env
2. DB connection → Check credentials in .env
3. Build fails → Run `docker-compose build --no-cache`
4. Slow performance → Increase Docker memory (Docker Desktop settings)

**Documentation:**
- Full guide: `/DOCKER_DEPLOYMENT_COMPLETE.md`
- Deployment: `/DEPLOYMENT_PRODUCTION_READY.md`
- API docs: `/API_SPECIFICATION_COMPLETE.md`

---

**Status:** ✅ PRODUCTION READY  
**Version:** 2.0 | **Last Updated:** October 22, 2025
