# ☁️ TRADIE Cloud Deployment Guide (MySQL)

**Deploy TRADIE to cloud platforms with MySQL database**

---

## 🎯 Overview

This guide covers deploying your **MySQL-based** TRADIE application to popular cloud platforms. Unlike MongoDB examples, TRADIE uses MySQL for better relational data handling.

---

## 📋 Pre-Deployment Checklist

### 1. Prepare Your Application

✅ **Backend & Frontend work locally**
```bash
# Test backend
cd api
npm install
npm start
# Should run on http://localhost:3001

# Test frontend
npm install
npm start
# Should run on http://localhost:3000
```

✅ **Environment variables configured**
```bash
# Check .env file exists
cat api/.env

# Required variables:
# - DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
# - JWT_SECRET, PROVENANCE_JWT_SECRET
# - CORS_ORIGIN
```

✅ **Build React frontend**
```bash
npm run build
# Creates /build folder with static files
```

### 2. Dockerize Your App

✅ **Build Docker image**
```bash
# Build
docker build -t tradie-app .

# Test locally
docker run -e DB_HOST=mysql \
  -e DB_PASSWORD=password \
  -e JWT_SECRET=secret \
  -p 3001:3001 tradie-app
```

---

## ☁️ Cloud Platform Options

### Option 1: Railway (Easiest) ⭐

**Best for:** Quick deployment, auto-scaling, built-in MySQL

**Pros:**
- One-click MySQL database
- Auto-deploy from GitHub
- Free tier available
- Simple environment variables

**Deployment Steps:**

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your TRADIE repository

3. **Add MySQL Database**
   - Click "+ New" → "Database" → "MySQL"
   - Railway auto-provisions MySQL
   - Connection string auto-populated

4. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=3001
   
   # Database (auto-filled from MySQL service)
   DATABASE_URL=${{MySQL.DATABASE_URL}}
   # Or manually:
   DB_HOST=${{MySQL.MYSQL_HOST}}
   DB_PORT=${{MySQL.MYSQL_PORT}}
   DB_USER=${{MySQL.MYSQL_USER}}
   DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
   DB_NAME=${{MySQL.MYSQL_DATABASE}}
   
   # Generate these:
   JWT_SECRET=<64-char-random-string>
   PROVENANCE_JWT_SECRET=<64-char-random-string>
   
   # Your domain
   CORS_ORIGIN=${{RAILWAY_PUBLIC_DOMAIN}}
   ```

5. **Deploy**
   - Railway auto-detects Dockerfile
   - Builds and deploys automatically
   - Gets a public URL: `your-app.up.railway.app`

6. **Initialize Database**
   ```bash
   # Connect to Railway MySQL
   railway connect mysql
   
   # Import schemas
   source database/schema_mysql.sql;
   source database/schema_provenance.sql;
   source database/schema_services_aligned.sql;
   source database/additional_tables.sql;
   ```

7. **Custom Domain (Optional)**
   - Settings → Domains → Add custom domain
   - Update DNS records
   - SSL auto-configured

**Cost:** ~$5-20/month (scales with usage)

---

### Option 2: DigitalOcean App Platform

**Best for:** Simplicity, managed MySQL, good documentation

**Pros:**
- Managed MySQL database
- Auto-scaling
- Built-in monitoring
- Free static site tier

**Deployment Steps:**

1. **Create DigitalOcean Account**
   - Go to [digitalocean.com](https://www.digitalocean.com)
   - Get $200 credit (new users)

2. **Create MySQL Database**
   - Dashboard → Databases → Create
   - Choose MySQL 8
   - Select plan (Basic $15/mo)
   - Note connection details

3. **Create App**
   - Apps → Create App
   - Choose GitHub repo
   - Select "Dockerfile" as source

4. **Configure App**
   - Detected: Dockerfile
   - Region: Choose closest to users
   - Resources: Basic ($5/mo)

5. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=3001
   
   # Database (from DigitalOcean database)
   DB_HOST=your-db-cluster.db.ondigitalocean.com
   DB_PORT=25060
   DB_USER=doadmin
   DB_PASSWORD=<from-database-dashboard>
   DB_NAME=tradie_production
   
   JWT_SECRET=<generate-64-chars>
   PROVENANCE_JWT_SECRET=<generate-64-chars>
   
   CORS_ORIGIN=https://your-app.ondigitalocean.app
   ```

6. **Initialize Database**
   ```bash
   # Get connection string from dashboard
   mysql -u doadmin -p -h your-db.db.ondigitalocean.com -P 25060
   
   # Create database
   CREATE DATABASE tradie_production;
   USE tradie_production;
   
   # Import schemas (from local machine)
   mysql -u doadmin -p -h your-db.db.ondigitalocean.com -P 25060 \
     tradie_production < database/schema_mysql.sql
   # Repeat for other schemas
   ```

7. **Deploy**
   - Click "Deploy"
   - Wait 5-10 minutes
   - App URL: `your-app.ondigitalocean.app`

**Cost:** ~$20/month (App $5 + Database $15)

---

### Option 3: AWS (ECS + RDS)

**Best for:** Enterprise, scaling, full control

**Pros:**
- Highly scalable
- RDS managed MySQL
- AWS ecosystem integration
- Auto-scaling

**Deployment Steps:**

1. **Create RDS MySQL Instance**
   ```bash
   # Install AWS CLI
   aws configure
   
   # Create RDS MySQL
   aws rds create-db-instance \
     --db-instance-identifier tradie-mysql \
     --db-instance-class db.t3.micro \
     --engine mysql \
     --engine-version 8.0 \
     --master-username admin \
     --master-user-password YourStrongPassword123 \
     --allocated-storage 20 \
     --publicly-accessible
   ```

2. **Create ECR Repository**
   ```bash
   # Create repository for Docker images
   aws ecr create-repository --repository-name tradie-app
   
   # Get login token
   aws ecr get-login-password --region us-east-1 | \
     docker login --username AWS \
     --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
   
   # Build and push
   docker build -t tradie-app .
   docker tag tradie-app:latest \
     <account-id>.dkr.ecr.us-east-1.amazonaws.com/tradie-app:latest
   docker push \
     <account-id>.dkr.ecr.us-east-1.amazonaws.com/tradie-app:latest
   ```

3. **Create ECS Task Definition**
   ```json
   {
     "family": "tradie-app",
     "containerDefinitions": [
       {
         "name": "tradie-backend",
         "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/tradie-app:latest",
         "memory": 512,
         "cpu": 256,
         "essential": true,
         "portMappings": [
           {
             "containerPort": 3001,
             "protocol": "tcp"
           }
         ],
         "environment": [
           {"name": "NODE_ENV", "value": "production"},
           {"name": "PORT", "value": "3001"},
           {"name": "DB_HOST", "value": "your-rds-endpoint.rds.amazonaws.com"},
           {"name": "DB_PORT", "value": "3306"},
           {"name": "DB_USER", "value": "admin"},
           {"name": "DB_PASSWORD", "value": "YourStrongPassword123"},
           {"name": "DB_NAME", "value": "tradie_production"},
           {"name": "JWT_SECRET", "value": "your-jwt-secret"},
           {"name": "PROVENANCE_JWT_SECRET", "value": "your-provenance-secret"}
         ]
       }
     ]
   }
   ```

4. **Create ECS Service**
   ```bash
   # Create cluster
   aws ecs create-cluster --cluster-name tradie-cluster
   
   # Register task definition
   aws ecs register-task-definition --cli-input-json file://task-def.json
   
   # Create service
   aws ecs create-service \
     --cluster tradie-cluster \
     --service-name tradie-service \
     --task-definition tradie-app \
     --desired-count 1 \
     --launch-type FARGATE
   ```

5. **Initialize RDS Database**
   ```bash
   # Connect to RDS
   mysql -h your-rds-endpoint.rds.amazonaws.com -u admin -p
   
   # Create database
   CREATE DATABASE tradie_production;
   USE tradie_production;
   
   # Import schemas (from EC2 or local)
   mysql -h your-rds-endpoint.rds.amazonaws.com -u admin -p \
     tradie_production < database/schema_mysql.sql
   ```

**Cost:** ~$30-50/month (RDS $15 + ECS $10 + other services)

---

### Option 4: Google Cloud Run

**Best for:** Serverless, auto-scaling, pay-per-use

**Pros:**
- Pay only when running
- Auto-scales to zero
- Cloud SQL managed MySQL
- Simple deployment

**Deployment Steps:**

1. **Create Cloud SQL Instance**
   ```bash
   # Install gcloud CLI
   gcloud init
   
   # Create MySQL instance
   gcloud sql instances create tradie-mysql \
     --database-version=MYSQL_8_0 \
     --tier=db-f1-micro \
     --region=us-central1
   
   # Set root password
   gcloud sql users set-password root \
     --host=% \
     --instance=tradie-mysql \
     --password=YourStrongPassword123
   
   # Create database
   gcloud sql databases create tradie_production \
     --instance=tradie-mysql
   ```

2. **Build and Push to Container Registry**
   ```bash
   # Configure Docker
   gcloud auth configure-docker
   
   # Build
   docker build -t gcr.io/your-project-id/tradie-app .
   
   # Push
   docker push gcr.io/your-project-id/tradie-app
   ```

3. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy tradie-app \
     --image gcr.io/your-project-id/tradie-app \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars NODE_ENV=production \
     --set-env-vars PORT=3001 \
     --set-env-vars DB_HOST=/cloudsql/your-project:us-central1:tradie-mysql \
     --set-env-vars DB_USER=root \
     --set-env-vars DB_PASSWORD=YourStrongPassword123 \
     --set-env-vars DB_NAME=tradie_production \
     --set-env-vars JWT_SECRET=your-jwt-secret \
     --add-cloudsql-instances your-project:us-central1:tradie-mysql
   ```

4. **Initialize Database**
   ```bash
   # Connect via Cloud SQL Proxy
   cloud_sql_proxy -instances=your-project:us-central1:tradie-mysql=tcp:3306
   
   # In another terminal
   mysql -h 127.0.0.1 -u root -p tradie_production < database/schema_mysql.sql
   ```

**Cost:** ~$10-25/month (Cloud SQL $7 + Cloud Run $3-18)

---

### Option 5: Heroku

**Best for:** Quick prototyping, simple deployment

**Pros:**
- Very simple deployment
- ClearDB MySQL add-on
- Free tier available
- Git-based deployment

**Deployment Steps:**

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Login
   heroku login
   ```

2. **Create App**
   ```bash
   heroku create tradie-app
   ```

3. **Add ClearDB MySQL**
   ```bash
   # Add MySQL database (free tier: 5MB, $9.99/mo: 1GB)
   heroku addons:create cleardb:ignite
   
   # Get connection URL
   heroku config:get CLEARDB_DATABASE_URL
   # mysql://user:password@host/database?reconnect=true
   ```

4. **Set Environment Variables**
   ```bash
   # Parse CLEARDB_DATABASE_URL or set manually
   heroku config:set NODE_ENV=production
   heroku config:set PORT=3001
   heroku config:set DB_HOST=<from-cleardb-url>
   heroku config:set DB_USER=<from-cleardb-url>
   heroku config:set DB_PASSWORD=<from-cleardb-url>
   heroku config:set DB_NAME=<from-cleardb-url>
   heroku config:set JWT_SECRET=$(openssl rand -hex 64)
   heroku config:set PROVENANCE_JWT_SECRET=$(openssl rand -hex 64)
   ```

5. **Deploy**
   ```bash
   # Add Heroku remote
   heroku git:remote -a tradie-app
   
   # Set stack to container (for Dockerfile)
   heroku stack:set container
   
   # Deploy
   git push heroku main
   
   # Open app
   heroku open
   ```

6. **Initialize Database**
   ```bash
   # Get database credentials
   heroku config:get CLEARDB_DATABASE_URL
   
   # Connect
   mysql -h <host> -u <user> -p <database>
   
   # Import schemas
   mysql -h <host> -u <user> -p <database> < database/schema_mysql.sql
   ```

**Cost:** Free tier (5MB DB) or ~$10/month (1GB DB)

---

## 🔐 Security Best Practices

### 1. Generate Strong Secrets

```bash
# JWT Secret (64 characters)
openssl rand -hex 64

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or using Docker
docker run --rm node:18-alpine node -e \
  "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2. Database Security

✅ **Use private networks** (VPC, Private Link)  
✅ **Enable SSL/TLS** for database connections  
✅ **Restrict IP access** (whitelist your app IPs only)  
✅ **Use strong passwords** (20+ characters)  
✅ **Regular backups** (automated daily)  
✅ **Separate dev/prod databases**  

### 3. Environment Variables

**Never commit:**
```bash
# Add to .gitignore
.env
.env.*
!.env.example
```

**Use secrets management:**
- AWS Secrets Manager
- Google Cloud Secret Manager
- HashiCorp Vault
- Platform-specific (Railway, Heroku config vars)

---

## 🔧 Database Migration

### Initial Setup

```bash
# 1. Connect to cloud database
mysql -h <cloud-db-host> -u <user> -p <database>

# 2. Import schemas in order
mysql -h <host> -u <user> -p <db> < database/schema_mysql.sql
mysql -h <host> -u <user> -p <db> < database/schema_provenance.sql
mysql -h <host> -u <user> -p <db> < database/schema_services_aligned.sql
mysql -h <host> -u <user> -p <db> < database/additional_tables.sql

# 3. Verify tables
mysql -h <host> -u <user> -p <db> -e "SHOW TABLES;"
```

### Using Cloud Platform Tools

**Railway:**
```bash
railway connect mysql
source database/schema_mysql.sql;
```

**DigitalOcean:**
```bash
# Via web console or CLI
doctl databases connection mysql-db
```

**AWS RDS:**
```bash
aws rds describe-db-instances --db-instance-identifier tradie-mysql
```

---

## 📊 Monitoring & Logging

### Application Monitoring

**Railway:** Built-in logs, metrics  
**DigitalOcean:** App Platform insights  
**AWS:** CloudWatch logs & metrics  
**Google Cloud:** Cloud Logging  
**Heroku:** Heroku logs  

### External Services

- **Sentry** - Error tracking
- **Datadog** - APM & monitoring
- **New Relic** - Performance monitoring
- **UptimeRobot** - Uptime monitoring

### Setup Sentry (Example)

```bash
# Install
npm install @sentry/node

# In api/server.js
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

---

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] Code tested locally
- [ ] Docker image builds successfully
- [ ] Environment variables documented
- [ ] Database schemas ready
- [ ] Secrets generated (JWT, etc.)

### Cloud Setup

- [ ] MySQL database provisioned
- [ ] Database schemas imported
- [ ] Environment variables configured
- [ ] CORS origins set correctly
- [ ] SSL/HTTPS enabled

### Post-Deployment

- [ ] Health check endpoint works
- [ ] Can create user/login
- [ ] Database queries work
- [ ] QR code generation works
- [ ] File uploads work
- [ ] Monitoring configured
- [ ] Backups automated

---

## 🆘 Troubleshooting

### Database Connection Issues

```bash
# Test connection
mysql -h <host> -P <port> -u <user> -p

# Check firewall/security groups
# Allow your app's IP to connect

# Verify environment variables
echo $DB_HOST
echo $DB_USER
```

### CORS Errors

```bash
# Update CORS_ORIGIN in environment
CORS_ORIGIN=https://your-app.railway.app,https://www.your-domain.com
```

### Build Failures

```bash
# Check Dockerfile builds locally
docker build -t tradie-app .

# Check logs
docker logs <container-id>

# Rebuild without cache
docker build --no-cache -t tradie-app .
```

---

## 💰 Cost Comparison

| Platform | MySQL DB | App Hosting | Total/Month | Free Tier |
|----------|----------|-------------|-------------|-----------|
| **Railway** | Included | $5-20 | $5-20 | Yes (limited) |
| **DigitalOcean** | $15 | $5 | $20 | $200 credit |
| **AWS** | $15 | $10-30 | $25-45 | Yes (1 year) |
| **Google Cloud** | $7 | $3-18 | $10-25 | $300 credit |
| **Heroku** | $10 | Free-$7 | $10-17 | Yes (limited) |

**Recommendation:** Start with **Railway** for easiest setup, move to **DigitalOcean** or **AWS** for production.

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [MySQL 8.0 Reference](https://dev.mysql.com/doc/refman/8.0/)
- [Railway Docs](https://docs.railway.app/)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [AWS ECS Guide](https://docs.aws.amazon.com/ecs/)

---

**Status:** ✅ PRODUCTION READY  
**Version:** 2.0 | **Last Updated:** October 22, 2025
