# 🚀 TRADIE Production Deployment Guide

**Version:** 2.0 (JWT-Enhanced with MySQL)  
**Last Updated:** October 22, 2025  
**Status:** ✅ PRODUCTION READY

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup (MySQL)](#database-setup-mysql)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Environment Variables](#environment-variables)
6. [Security Configuration](#security-configuration)
7. [SSL/HTTPS Setup](#sslhttps-setup)
8. [Process Management (PM2)](#process-management-pm2)
9. [Monitoring & Logging](#monitoring--logging)
10. [Backup & Recovery](#backup--recovery)
11. [Performance Optimization](#performance-optimization)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

### System Requirements

- **Node.js**: v18.x or higher
- **MySQL**: v8.0 or higher
- **npm**: v8.x or higher
- **Operating System**: Ubuntu 20.04+ / CentOS 8+ / macOS / Windows Server

### Recommended Hosting Providers

**Backend:**
- AWS EC2
- DigitalOcean Droplet
- Google Cloud Platform
- Railway
- Heroku
- Azure Virtual Machines

**Frontend:**
- Vercel ⭐ (Recommended for React)
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting
- Cloudflare Pages

**Database:**
- AWS RDS (MySQL)
- Google Cloud SQL
- DigitalOcean Managed Database
- PlanetScale ⭐ (Serverless MySQL)
- MySQL on self-hosted VPS

---

## 🗄️ Database Setup (MySQL)

### Option 1: Managed Database (Recommended)

#### AWS RDS MySQL

```bash
# 1. Create RDS MySQL instance
# - Engine: MySQL 8.0
# - Instance class: db.t3.micro (dev) or db.t3.medium (prod)
# - Storage: 20GB SSD
# - Enable automatic backups
# - Multi-AZ: Yes (for production)

# 2. Get connection details
# Host: your-instance.region.rds.amazonaws.com
# Port: 3306
# User: admin
# Password: <your-secure-password>
# Database: tradie_production
```

#### DigitalOcean Managed MySQL

```bash
# 1. Create Managed MySQL Database
# - Version: MySQL 8
# - Plan: Basic (1GB RAM, 10GB Storage for dev)
# - Datacenter: Closest to your users

# 2. Add trusted sources (your backend server IP)

# 3. Get connection string from dashboard
```

#### PlanetScale (Serverless - Recommended) ⭐

```bash
# 1. Sign up at planetscale.com
# 2. Create database: tradie-production
# 3. Create branch: main
# 4. Get connection string (includes SSL)

# Example connection string:
# mysql://user:pass@aws.connect.psdb.cloud/tradie-production?sslaccept=strict
```

### Option 2: Self-Hosted MySQL

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server -y

# Start MySQL
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure installation
sudo mysql_secure_installation

# Create database and user
sudo mysql -u root -p

# In MySQL shell:
CREATE DATABASE tradie_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'tradie_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON tradie_production.* TO 'tradie_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Database Schema Setup

```bash
# 1. Clone repository
git clone https://github.com/your-org/tradie-app.git
cd tradie-app

# 2. Navigate to database folder
cd database

# 3. Import schemas (in order)
mysql -u tradie_user -p tradie_production < schema_mysql.sql
mysql -u tradie_user -p tradie_production < schema_provenance.sql
mysql -u tradie_user -p tradie_production < schema_services_aligned.sql
mysql -u tradie_user -p tradie_production < additional_tables.sql

# 4. Verify tables
mysql -u tradie_user -p tradie_production -e "SHOW TABLES;"

# Expected output:
# +------------------------------+
# | Tables_in_tradie_production  |
# +------------------------------+
# | activities                   |
# | crop_batches                 |
# | crop_batch_history           |
# | crop_batch_tokens            |
# | crops                        |
# | input_costs                  |
# | producers                    |
# | quality_checks               |
# | service_bookings             |
# | service_providers            |
# | token_verifications          |
# | users                        |
# +------------------------------+
```

### Quick Setup Script

```bash
# Make executable
chmod +x database/quick_setup.sh

# Run setup (will prompt for MySQL password)
./database/quick_setup.sh
```

---

## 🔧 Backend Deployment

### Step 1: Server Setup

```bash
# 1. SSH into your server
ssh user@your-server-ip

# 2. Update system
sudo apt update && sudo apt upgrade -y

# 3. Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Verify installation
node --version  # Should be v18.x
npm --version   # Should be v8.x

# 5. Install PM2 (process manager)
sudo npm install -g pm2

# 6. Install Git
sudo apt install git -y
```

### Step 2: Deploy Backend Code

```bash
# 1. Clone repository
cd /var/www
sudo git clone https://github.com/your-org/tradie-app.git
cd tradie-app/api

# 2. Install dependencies
npm install --production

# 3. Create production environment file
sudo nano .env
```

**Production `.env` file:**

```env
# ============================================================================
# TRADIE BACKEND - PRODUCTION ENVIRONMENT
# ============================================================================

# Server Configuration
NODE_ENV=production
PORT=3001
APP_URL=https://tradie.app

# Database Configuration (MySQL)
DB_HOST=your-rds-instance.region.rds.amazonaws.com
DB_PORT=3306
DB_USER=tradie_user
DB_PASSWORD=your_secure_database_password_here
DB_NAME=tradie_production

# Database Connection Pool
DB_CONNECTION_LIMIT=10
DB_QUEUE_LIMIT=0

# JWT Authentication
JWT_SECRET=a8f7d9e6c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=b9e8d7c6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8
JWT_REFRESH_EXPIRES_IN=30d

# JWT Provenance (for crop batch tokens)
PROVENANCE_JWT_SECRET=c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1
PROVENANCE_JWT_EXPIRES_IN=30d

# CORS Configuration
CORS_ORIGIN=https://tradie.app,https://www.tradie.app
ALLOWED_ORIGINS=https://tradie.app,https://www.tradie.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=/var/www/tradie-app/uploads

# External APIs
GROK_API_KEY=your_grok_api_key_here
GROK_API_URL=https://api.x.ai/v1

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=notifications@tradie.app
SMTP_PASSWORD=your_smtp_password_here
EMAIL_FROM=noreply@tradie.app

# SMS Configuration (for OTP)
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/tradie/backend.log

# Session
SESSION_SECRET=d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3

# Security
BCRYPT_ROUNDS=12
HELMET_ENABLED=true
```

### Step 3: Generate Secure Secrets

```bash
# Generate JWT_SECRET
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# Generate PROVENANCE_JWT_SECRET
node -e "console.log('PROVENANCE_JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# Generate SESSION_SECRET
node -e "console.log('SESSION_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# Copy these to your .env file
```

### Step 4: Security Configuration

Update `api/server.js` for production:

```javascript
// At the top of server.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Add security middleware
app.use(helmet());
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api', limiter);

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

Install security packages:

```bash
npm install helmet express-rate-limit express-mongo-sanitize
```

### Step 5: Start Backend with PM2

```bash
# 1. Start application
pm2 start server.js --name tradie-backend

# 2. Configure auto-restart on system reboot
pm2 startup
# Follow the instructions printed

# 3. Save PM2 process list
pm2 save

# 4. Check status
pm2 status

# 5. View logs
pm2 logs tradie-backend

# 6. Monitor in real-time
pm2 monit
```

### Step 6: Configure Nginx Reverse Proxy

```bash
# 1. Install Nginx
sudo apt install nginx -y

# 2. Create Nginx config
sudo nano /etc/nginx/sites-available/tradie-api
```

**Nginx configuration:**

```nginx
server {
    listen 80;
    server_name api.tradie.app;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.tradie.app;

    # SSL Configuration (will be auto-configured by Certbot)
    ssl_certificate /etc/letsencrypt/live/api.tradie.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.tradie.app/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Proxy to Node.js backend
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
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req zone=api_limit burst=20 nodelay;

    # Max body size (for file uploads)
    client_max_body_size 10M;

    # Logs
    access_log /var/log/nginx/tradie-api-access.log;
    error_log /var/log/nginx/tradie-api-error.log;
}
```

```bash
# 3. Enable site
sudo ln -s /etc/nginx/sites-available/tradie-api /etc/nginx/sites-enabled/

# 4. Test configuration
sudo nginx -t

# 5. Reload Nginx
sudo systemctl reload nginx
```

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended) ⭐

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Navigate to project root
cd /path/to/tradie-app

# 3. Login to Vercel
vercel login

# 4. Deploy
vercel --prod

# 5. Set environment variables in Vercel dashboard
# NEXT_PUBLIC_API_URL=https://api.tradie.app
```

**Or use Vercel Git Integration:**

1. Push code to GitHub
2. Import repository at vercel.com
3. Set environment variables
4. Deploy automatically on push

### Option 2: Netlify

```bash
# 1. Build React app
npm run build

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Login
netlify login

# 4. Deploy
netlify deploy --prod --dir=build

# 5. Set environment variables
netlify env:set REACT_APP_API_URL https://api.tradie.app
```

### Option 3: Self-Hosted (Nginx)

```bash
# 1. Build React app
npm run build

# 2. Copy build to server
scp -r build/* user@your-server:/var/www/tradie-frontend/

# 3. Create Nginx config
sudo nano /etc/nginx/sites-available/tradie-frontend
```

**Nginx config for React app:**

```nginx
server {
    listen 80;
    server_name tradie.app www.tradie.app;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tradie.app www.tradie.app;

    ssl_certificate /etc/letsencrypt/live/tradie.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tradie.app/privkey.pem;

    root /var/www/tradie-frontend;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # React Router support
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

```bash
# Enable and reload
sudo ln -s /etc/nginx/sites-available/tradie-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Frontend Environment Variables

Create `.env.production`:

```env
# API Configuration
REACT_APP_API_URL=https://api.tradie.app
REACT_APP_API_VERSION=v1

# App Configuration
REACT_APP_NAME=TRADIE
REACT_APP_URL=https://tradie.app

# Feature Flags
REACT_APP_ENABLE_GROK_AI=true
REACT_APP_ENABLE_PROVENANCE=true
REACT_APP_ENABLE_QUALITY_CHECK=true

# External Services
REACT_APP_GROK_WS_URL=wss://api.tradie.app/grok
```

---

## 🔒 SSL/HTTPS Setup

### Let's Encrypt (Free SSL)

```bash
# 1. Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# 2. Get SSL certificate for API
sudo certbot --nginx -d api.tradie.app

# 3. Get SSL certificate for frontend
sudo certbot --nginx -d tradie.app -d www.tradie.app

# 4. Test auto-renewal
sudo certbot renew --dry-run

# 5. Certbot auto-renews every 12 hours via cron
```

### Cloudflare SSL (Alternative)

1. Add domain to Cloudflare
2. Update nameservers
3. SSL/TLS → Full (strict)
4. Auto HTTPS rewrites: On
5. Always use HTTPS: On

---

## 🔐 Security Configuration

### Firewall Setup (UFW)

```bash
# 1. Install UFW
sudo apt install ufw -y

# 2. Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 3. Allow SSH
sudo ufw allow 22/tcp

# 4. Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 5. Allow MySQL (only from backend server)
sudo ufw allow from backend-server-ip to any port 3306

# 6. Enable firewall
sudo ufw enable

# 7. Check status
sudo ufw status
```

### MySQL Security

```bash
# 1. Create read-only user for analytics
mysql -u root -p

CREATE USER 'tradie_readonly'@'%' IDENTIFIED BY 'readonly_password';
GRANT SELECT ON tradie_production.* TO 'tradie_readonly'@'%';
FLUSH PRIVILEGES;

# 2. Restrict root access
UPDATE mysql.user SET host='localhost' WHERE user='root';
FLUSH PRIVILEGES;

# 3. Remove test database
DROP DATABASE IF EXISTS test;
```

### Environment Variable Security

```bash
# 1. Restrict .env file permissions
chmod 600 /var/www/tradie-app/api/.env
chown www-data:www-data /var/www/tradie-app/api/.env

# 2. Never commit .env to git
echo ".env" >> .gitignore

# 3. Use environment variable management
# - AWS Secrets Manager
# - HashiCorp Vault
# - Doppler
```

---

## 📊 Monitoring & Logging

### PM2 Monitoring

```bash
# 1. Install PM2 monitoring
pm2 install pm2-logrotate

# 2. Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# 3. View logs
pm2 logs tradie-backend --lines 100

# 4. Real-time monitoring
pm2 monit

# 5. Web dashboard (optional)
pm2 plus
```

### Application Logging

Install Winston for structured logging:

```bash
npm install winston winston-daily-rotate-file
```

Create `api/utils/logger.js`:

```javascript
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d'
    }),
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

### Error Tracking (Sentry)

```bash
# Install Sentry
npm install @sentry/node
```

Add to `api/server.js`:

```javascript
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0
});

// Before other middleware
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// After all routes, before error handlers
app.use(Sentry.Handlers.errorHandler());
```

---

## 💾 Backup & Recovery

### Automated MySQL Backups

Create backup script `/usr/local/bin/backup-tradie-db.sh`:

```bash
#!/bin/bash

# Configuration
DB_NAME="tradie_production"
DB_USER="tradie_user"
DB_PASS="your_password"
BACKUP_DIR="/var/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_DIR/tradie_$DATE.sql.gz

# Remove old backups
find $BACKUP_DIR -name "tradie_*.sql.gz" -mtime +$RETENTION_DAYS -delete

# Upload to S3 (optional)
# aws s3 cp $BACKUP_DIR/tradie_$DATE.sql.gz s3://your-bucket/backups/

echo "Backup completed: tradie_$DATE.sql.gz"
```

```bash
# Make executable
chmod +x /usr/local/bin/backup-tradie-db.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-tradie-db.sh
```

### Database Restore

```bash
# Restore from backup
gunzip < /var/backups/mysql/tradie_20251022_020000.sql.gz | mysql -u tradie_user -p tradie_production
```

---

## ⚡ Performance Optimization

### MySQL Optimization

Edit `/etc/mysql/mysql.conf.d/mysqld.cnf`:

```ini
[mysqld]
# Connection settings
max_connections = 200
connect_timeout = 10

# Buffer settings
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 2

# Query cache
query_cache_type = 1
query_cache_size = 64M

# Slow query log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2
```

```bash
# Restart MySQL
sudo systemctl restart mysql
```

### Node.js Optimization

Update `api/server.js`:

```javascript
// Cluster mode for multi-core CPUs
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster && process.env.NODE_ENV === 'production') {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.id} died, starting new worker...`);
    cluster.fork();
  });
} else {
  // Start Express server
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} running on port ${PORT}`);
  });
}
```

### PM2 Cluster Mode

```bash
# Start with cluster mode
pm2 start server.js -i max --name tradie-backend

# Or specify number of instances
pm2 start server.js -i 4 --name tradie-backend
```

### Nginx Caching

Add to Nginx config:

```nginx
# Cache configuration
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=1g inactive=60m;
proxy_cache_key "$scheme$request_method$host$request_uri";

location /api {
    proxy_cache api_cache;
    proxy_cache_valid 200 10m;
    proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;
    add_header X-Cache-Status $upstream_cache_status;
    
    proxy_pass http://localhost:3001;
}
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Fails

```bash
# Check MySQL is running
sudo systemctl status mysql

# Test connection
mysql -u tradie_user -p -h localhost tradie_production

# Check logs
sudo tail -f /var/log/mysql/error.log

# Verify environment variables
cat /var/www/tradie-app/api/.env | grep DB_
```

#### 2. PM2 Process Crashes

```bash
# View error logs
pm2 logs tradie-backend --err --lines 50

# Restart process
pm2 restart tradie-backend

# Clear logs and restart
pm2 flush
pm2 restart tradie-backend
```

#### 3. JWT Token Errors

```bash
# Regenerate JWT secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Update .env and restart
pm2 restart tradie-backend
```

#### 4. CORS Errors

Update `server.js`:

```javascript
app.use(cors({
  origin: [
    'https://tradie.app',
    'https://www.tradie.app',
    'http://localhost:3000' // For local dev
  ],
  credentials: true
}));
```

#### 5. 502 Bad Gateway

```bash
# Check backend is running
pm2 status

# Check port is correct
sudo netstat -tlnp | grep 3001

# Restart Nginx
sudo systemctl restart nginx
```

---

## 📋 Deployment Checklist

### Pre-Deployment

- [ ] Database schema imported
- [ ] Environment variables configured
- [ ] JWT secrets generated (64+ characters)
- [ ] CORS origins configured
- [ ] SSL certificates installed
- [ ] Firewall rules configured
- [ ] Backup script configured

### Security

- [ ] HTTPS enabled (all traffic)
- [ ] Strong JWT secrets
- [ ] Database user has minimal privileges
- [ ] File upload limits set
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] .env file permissions restricted (600)

### Performance

- [ ] MySQL optimized
- [ ] PM2 cluster mode enabled
- [ ] Nginx caching configured
- [ ] Gzip compression enabled
- [ ] Static assets cached

### Monitoring

- [ ] PM2 log rotation enabled
- [ ] Error tracking (Sentry) configured
- [ ] Database backups automated
- [ ] Uptime monitoring enabled
- [ ] Log aggregation configured

### Testing

- [ ] All API endpoints tested
- [ ] JWT authentication tested
- [ ] QR code generation tested
- [ ] File uploads tested
- [ ] CORS tested from frontend
- [ ] Load testing completed

---

## 🎯 Quick Commands Reference

```bash
# Backend
pm2 start server.js --name tradie-backend   # Start
pm2 restart tradie-backend                   # Restart
pm2 stop tradie-backend                      # Stop
pm2 logs tradie-backend                      # View logs
pm2 monit                                    # Monitor

# Database
mysql -u tradie_user -p tradie_production   # Connect
mysqldump -u tradie_user -p tradie_production > backup.sql  # Backup
mysql -u tradie_user -p tradie_production < backup.sql      # Restore

# Nginx
sudo nginx -t                                # Test config
sudo systemctl reload nginx                  # Reload
sudo systemctl restart nginx                 # Restart
sudo tail -f /var/log/nginx/error.log       # View errors

# SSL
sudo certbot renew                           # Renew certs
sudo certbot certificates                    # List certs

# System
sudo ufw status                              # Firewall status
htop                                         # Monitor resources
df -h                                        # Disk usage
free -h                                      # Memory usage
```

---

## 📞 Support

For deployment issues:
- Check logs: `pm2 logs tradie-backend`
- Review documentation: `/DEPLOYMENT_PRODUCTION_READY.md`
- Database migration: `/database/MIGRATION_GUIDE.md`
- API reference: `/API_COMPLETE_READY.md`

---

**Version:** 2.0 | **Status:** ✅ PRODUCTION READY
**Last Updated:** October 22, 2025
