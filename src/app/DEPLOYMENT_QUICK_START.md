# ⚡ TRADIE Deployment - QUICK START

**Get your TRADIE app deployed in 30 minutes!**

---

## 🎯 Overview

This guide will help you deploy TRADIE with:
- ✅ MySQL database (managed or self-hosted)
- ✅ Node.js backend with JWT authentication
- ✅ React frontend
- ✅ SSL/HTTPS
- ✅ PM2 process management

---

## 📋 Prerequisites Checklist

- [ ] Server with Ubuntu 20.04+ (2GB RAM minimum, 4GB recommended)
- [ ] Domain name (e.g., tradie.app, api.tradie.app)
- [ ] MySQL database (managed or self-hosted)
- [ ] SSH access to server
- [ ] GitHub repository (optional)

---

## 🚀 30-Minute Deployment

### Step 1: Database Setup (5 minutes)

**Option A: PlanetScale (Easiest - Recommended)** ⭐

```bash
# 1. Sign up at planetscale.com (free tier available)
# 2. Create database: tradie-production
# 3. Copy connection string
# Example: mysql://user:pass@aws.connect.psdb.cloud/tradie?sslaccept=strict
```

**Option B: Self-Hosted MySQL**

```bash
# Install MySQL
sudo apt update && sudo apt install mysql-server -y

# Secure installation
sudo mysql_secure_installation

# Create database
sudo mysql -u root -p <<EOF
CREATE DATABASE tradie_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'tradie_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON tradie_production.* TO 'tradie_user'@'localhost';
FLUSH PRIVILEGES;
EOF
```

### Step 2: Server Setup (5 minutes)

```bash
# SSH into server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install Certbot (for SSL)
apt install -y certbot python3-certbot-nginx

# Verify installations
node --version   # Should be v18.x
npm --version    # Should be v8.x
pm2 --version
nginx -v
```

### Step 3: Deploy Backend (10 minutes)

```bash
# Clone repository
cd /var/www
git clone https://github.com/your-org/tradie-app.git
cd tradie-app

# Import database schemas
cd database
mysql -u tradie_user -p tradie_production < schema_mysql.sql
mysql -u tradie_user -p tradie_production < schema_provenance.sql
mysql -u tradie_user -p tradie_production < schema_services_aligned.sql
mysql -u tradie_user -p tradie_production < additional_tables.sql

# Navigate to API folder
cd ../api

# Install dependencies
npm install --production

# Create .env file
cat > .env << 'EOF'
NODE_ENV=production
PORT=3001
APP_URL=https://api.tradie.app

DB_HOST=localhost
DB_PORT=3306
DB_USER=tradie_user
DB_PASSWORD=STRONG_PASSWORD_HERE
DB_NAME=tradie_production

JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
PROVENANCE_JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")

CORS_ORIGIN=https://tradie.app,https://www.tradie.app
EOF

# Generate secrets (replace in .env)
echo "JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")"
echo "PROVENANCE_JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")"

# Start with PM2
pm2 start server.js --name tradie-backend
pm2 startup
pm2 save

# Check status
pm2 status
```

### Step 4: Configure Nginx (5 minutes)

```bash
# Create API config
cat > /etc/nginx/sites-available/tradie-api << 'EOF'
server {
    listen 80;
    server_name api.tradie.app;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    client_max_body_size 10M;
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/tradie-api /etc/nginx/sites-enabled/

# Test and reload
nginx -t
systemctl reload nginx
```

### Step 5: SSL Certificate (3 minutes)

```bash
# Get SSL certificate
certbot --nginx -d api.tradie.app

# Choose option 2 (redirect HTTP to HTTPS)
# Certificate auto-renews every 12 hours

# Test auto-renewal
certbot renew --dry-run
```

### Step 6: Deploy Frontend (2 minutes)

**Option A: Vercel (Recommended)** ⭐

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project root
cd /var/www/tradie-app

# Login and deploy
vercel login
vercel --prod

# Set environment variable in Vercel dashboard:
# REACT_APP_API_URL = https://api.tradie.app
```

**Option B: Self-Hosted**

```bash
# Build React app
npm run build

# Create Nginx config
cat > /etc/nginx/sites-available/tradie-frontend << 'EOF'
server {
    listen 80;
    server_name tradie.app www.tradie.app;

    root /var/www/tradie-app/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/tradie-frontend /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# Get SSL
certbot --nginx -d tradie.app -d www.tradie.app
```

---

## ✅ Verify Deployment

### Test Backend

```bash
# Check PM2 status
pm2 status

# Test API endpoint
curl https://api.tradie.app/api/health
# Expected: {"status":"ok","timestamp":"..."}

# Test login
curl -X POST https://api.tradie.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'
```

### Test Frontend

```bash
# Visit https://tradie.app in browser
# Should load React app

# Check console for errors
# Verify API connection
```

### Test Database

```bash
# Connect to MySQL
mysql -u tradie_user -p tradie_production

# Check tables
SHOW TABLES;

# Should see:
# - crop_batches
# - crop_batch_history
# - crop_batch_tokens
# - producers
# - quality_checks
# - etc.
```

---

## 🔒 Security Checklist

- [ ] Firewall configured (UFW)
- [ ] SSL certificates installed
- [ ] Strong passwords for database
- [ ] JWT secrets are random (64+ chars)
- [ ] .env file permissions set to 600
- [ ] Database backups configured
- [ ] PM2 auto-restart on reboot

### Quick Security Setup

```bash
# Configure firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable

# Secure .env file
chmod 600 /var/www/tradie-app/api/.env

# Set up daily backups
cat > /usr/local/bin/backup-db.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u tradie_user -p'PASSWORD' tradie_production | gzip > /var/backups/tradie_$DATE.sql.gz
find /var/backups -name "tradie_*.sql.gz" -mtime +7 -delete
EOF

chmod +x /usr/local/bin/backup-db.sh

# Add to crontab (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup-db.sh") | crontab -
```

---

## 📊 Monitoring

### PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs tradie-backend

# View last 100 lines
pm2 logs tradie-backend --lines 100

# Configure log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Application Logs

```bash
# Backend logs
tail -f /var/www/tradie-app/api/logs/combined.log

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# MySQL slow query log
tail -f /var/log/mysql/slow.log
```

---

## 🐛 Troubleshooting

### Backend not starting

```bash
# Check PM2 logs
pm2 logs tradie-backend --err

# Check environment variables
cat /var/www/tradie-app/api/.env

# Restart
pm2 restart tradie-backend
```

### Database connection fails

```bash
# Test MySQL connection
mysql -u tradie_user -p -h localhost tradie_production

# Check MySQL is running
systemctl status mysql

# Check MySQL logs
tail -f /var/log/mysql/error.log
```

### 502 Bad Gateway

```bash
# Check backend is running
pm2 status

# Check port
netstat -tlnp | grep 3001

# Restart Nginx
systemctl restart nginx
```

### JWT errors

```bash
# Regenerate secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Update .env with new secrets
nano /var/www/tradie-app/api/.env

# Restart backend
pm2 restart tradie-backend
```

---

## 📚 Next Steps

After deployment:

1. **Test all features:**
   - [ ] Login/authentication
   - [ ] Create crop batch
   - [ ] Add history
   - [ ] Tokenize crop batch
   - [ ] Scan QR code
   - [ ] Quality check

2. **Set up monitoring:**
   - [ ] Error tracking (Sentry)
   - [ ] Uptime monitoring
   - [ ] Performance monitoring

3. **Configure backups:**
   - [ ] Database backups
   - [ ] File backups
   - [ ] Off-site backups

4. **Performance optimization:**
   - [ ] Enable Nginx caching
   - [ ] Configure MySQL optimization
   - [ ] Set up CDN for static assets

5. **Documentation:**
   - [ ] Update README with deployment info
   - [ ] Document API endpoints
   - [ ] Create user guides

---

## 🔗 Useful Commands

```bash
# Backend
pm2 start server.js --name tradie-backend
pm2 restart tradie-backend
pm2 stop tradie-backend
pm2 delete tradie-backend
pm2 logs tradie-backend
pm2 monit

# Database
mysql -u tradie_user -p tradie_production
mysqldump -u tradie_user -p tradie_production > backup.sql
mysql -u tradie_user -p tradie_production < backup.sql

# Nginx
nginx -t
systemctl reload nginx
systemctl restart nginx

# SSL
certbot renew
certbot certificates

# System
ufw status
htop
df -h
free -h
```

---

## 📞 Support

- **Full Deployment Guide:** `/DEPLOYMENT_PRODUCTION_READY.md`
- **API Specification:** `/API_SPECIFICATION_COMPLETE.md`
- **Environment Variables:** `/api/.env.example`
- **Database Migration:** `/database/MIGRATION_GUIDE.md`

---

**Deployment Time:** ~30 minutes  
**Status:** ✅ PRODUCTION READY  
**Version:** 2.0 (JWT-Enhanced with MySQL)
