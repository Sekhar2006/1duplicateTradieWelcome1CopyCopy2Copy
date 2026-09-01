# ⚡ TRADIE Deployment - Quick Commands Reference

**Copy-paste commands for quick deployment**

---

## 🐳 Docker Commands

### Build & Test Locally

```bash
# Build production image
docker build -t tradie-app .

# Run locally
docker run -p 3001:3001 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=3306 \
  -e DB_USER=tradie_user \
  -e DB_PASSWORD=password \
  -e DB_NAME=tradie_production \
  -e JWT_SECRET=$(openssl rand -hex 64) \
  -e PROVENANCE_JWT_SECRET=$(openssl rand -hex 64) \
  -e CORS_ORIGIN=http://localhost:3000 \
  tradie-app

# Test health
curl http://localhost:3001/api/health
```

### Docker Compose

```bash
# Development (hot-reload)
docker-compose -f docker-compose.dev.yml up -d

# Production
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Rebuild
docker-compose build --no-cache

# Backup database
docker-compose exec mysql mysqldump -u root -p tradie_production > backup.sql
```

---

## ☁️ Railway Deployment

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
railway init

# 4. Link to project
railway link

# 5. Add MySQL
railway add mysql

# 6. Set environment variables
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=$(openssl rand -hex 64)
railway variables set PROVENANCE_JWT_SECRET=$(openssl rand -hex 64)

# 7. Deploy
railway up

# 8. Connect to MySQL and initialize
railway connect mysql

# In MySQL shell:
source database/schema_mysql.sql;
source database/schema_provenance.sql;
source database/schema_services_aligned.sql;
source database/additional_tables.sql;

# 9. View logs
railway logs

# 10. Open app
railway open
```

---

## 🌊 DigitalOcean Deployment

```bash
# 1. Install doctl
brew install doctl  # macOS
# or: snap install doctl  # Linux

# 2. Authenticate
doctl auth init

# 3. Create MySQL database
doctl databases create tradie-mysql \
  --engine mysql \
  --version 8 \
  --size db-s-1vcpu-1gb \
  --region nyc1

# 4. Get connection details
doctl databases connection tradie-mysql

# 5. Build and push to DigitalOcean Container Registry
doctl registry create tradie-registry
doctl registry login

docker build -t registry.digitalocean.com/tradie-registry/tradie-app .
docker push registry.digitalocean.com/tradie-registry/tradie-app

# 6. Create app (via web UI easier, or use YAML spec)

# 7. Initialize database
mysql -h <db-host> -P 25060 -u doadmin -p \
  tradie_production < database/schema_mysql.sql
```

---

## ☁️ AWS Deployment (ECS + RDS)

```bash
# 1. Configure AWS CLI
aws configure

# 2. Create RDS MySQL
aws rds create-db-instance \
  --db-instance-identifier tradie-mysql \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --engine-version 8.0 \
  --master-username admin \
  --master-user-password YourStrongPassword123 \
  --allocated-storage 20 \
  --publicly-accessible

# 3. Create ECR repository
aws ecr create-repository --repository-name tradie-app

# 4. Login to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS \
  --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# 5. Build and push
docker build -t tradie-app .
docker tag tradie-app:latest \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com/tradie-app:latest
docker push \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com/tradie-app:latest

# 6. Create ECS cluster
aws ecs create-cluster --cluster-name tradie-cluster

# 7. Register task definition (use task-def.json)
aws ecs register-task-definition --cli-input-json file://task-def.json

# 8. Create service
aws ecs create-service \
  --cluster tradie-cluster \
  --service-name tradie-service \
  --task-definition tradie-app \
  --desired-count 1 \
  --launch-type FARGATE

# 9. Initialize RDS database
mysql -h <rds-endpoint>.rds.amazonaws.com -u admin -p \
  tradie_production < database/schema_mysql.sql
```

---

## 🌐 Google Cloud Run

```bash
# 1. Install gcloud CLI
# Visit: https://cloud.google.com/sdk/docs/install

# 2. Initialize
gcloud init

# 3. Create Cloud SQL MySQL
gcloud sql instances create tradie-mysql \
  --database-version=MYSQL_8_0 \
  --tier=db-f1-micro \
  --region=us-central1

# 4. Set root password
gcloud sql users set-password root \
  --host=% \
  --instance=tradie-mysql \
  --password=YourStrongPassword123

# 5. Create database
gcloud sql databases create tradie_production \
  --instance=tradie-mysql

# 6. Build and push to Container Registry
gcloud auth configure-docker

docker build -t gcr.io/<project-id>/tradie-app .
docker push gcr.io/<project-id>/tradie-app

# 7. Deploy to Cloud Run
gcloud run deploy tradie-app \
  --image gcr.io/<project-id>/tradie-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,PORT=3001 \
  --set-env-vars JWT_SECRET=$(openssl rand -hex 64) \
  --add-cloudsql-instances <project>:us-central1:tradie-mysql

# 8. Initialize database via Cloud SQL Proxy
cloud_sql_proxy -instances=<project>:us-central1:tradie-mysql=tcp:3306 &
mysql -h 127.0.0.1 -u root -p tradie_production < database/schema_mysql.sql
```

---

## 🟣 Heroku Deployment

```bash
# 1. Install Heroku CLI
brew tap heroku/brew && brew install heroku  # macOS
# or: npm install -g heroku  # All platforms

# 2. Login
heroku login

# 3. Create app
heroku create tradie-app

# 4. Add ClearDB MySQL
heroku addons:create cleardb:ignite

# 5. Get database URL
heroku config:get CLEARDB_DATABASE_URL
# mysql://user:password@host/database?reconnect=true

# 6. Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=$(openssl rand -hex 64)
heroku config:set PROVENANCE_JWT_SECRET=$(openssl rand -hex 64)

# Parse CLEARDB_DATABASE_URL manually or:
heroku config:set DB_HOST=<from-url>
heroku config:set DB_USER=<from-url>
heroku config:set DB_PASSWORD=<from-url>
heroku config:set DB_NAME=<from-url>

# 7. Set stack to container
heroku stack:set container

# 8. Deploy
git push heroku main

# 9. Initialize database
mysql -h <host> -u <user> -p <database> < database/schema_mysql.sql

# 10. View logs
heroku logs --tail

# 11. Open app
heroku open
```

---

## 🔐 Generate Secrets

```bash
# Method 1: OpenSSL
openssl rand -hex 64

# Method 2: Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Method 3: Docker
docker run --rm node:18-alpine node -e \
  "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Method 4: Python
python3 -c "import secrets; print(secrets.token_hex(64))"

# Generate multiple secrets at once
echo "JWT_SECRET=$(openssl rand -hex 64)"
echo "PROVENANCE_JWT_SECRET=$(openssl rand -hex 64)"
echo "SESSION_SECRET=$(openssl rand -hex 64)"
```

---

## 🗄️ Database Commands

### Local MySQL

```bash
# Start MySQL (Docker)
docker run --name tradie-mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:8.0

# Connect
mysql -h localhost -u root -p

# Create database
mysql -u root -p -e "CREATE DATABASE tradie_production;"

# Import schemas
mysql -u root -p tradie_production < database/schema_mysql.sql
mysql -u root -p tradie_production < database/schema_provenance.sql
mysql -u root -p tradie_production < database/schema_services_aligned.sql
mysql -u root -p tradie_production < database/additional_tables.sql

# Verify
mysql -u root -p tradie_production -e "SHOW TABLES;"

# Backup
mysqldump -u root -p tradie_production > backup_$(date +%Y%m%d).sql

# Restore
mysql -u root -p tradie_production < backup_20251022.sql
```

### Cloud Database

```bash
# Connect to cloud MySQL
mysql -h <cloud-host> -P <port> -u <user> -p <database>

# Import via SSL (if required)
mysql -h <host> -u <user> -p --ssl-ca=ca-cert.pem <database> < schema.sql

# Backup from cloud
mysqldump -h <host> -u <user> -p <database> > cloud_backup.sql

# Copy local to cloud
mysqldump -u root -p tradie_local | \
  mysql -h <cloud-host> -u <user> -p <cloud-database>
```

---

## 🧪 Testing Commands

```bash
# Health check
curl http://localhost:3001/api/health

# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'

# Test with authentication
TOKEN="your-jwt-token"
curl http://localhost:3001/api/producers/profile \
  -H "Authorization: Bearer $TOKEN"

# Load test (using Apache Bench)
ab -n 1000 -c 10 http://localhost:3001/api/health

# Load test (using autocannon)
npx autocannon -c 10 -d 30 http://localhost:3001/api/health
```

---

## 📊 Monitoring Commands

```bash
# Docker stats
docker stats

# Docker logs
docker logs -f <container-id>
docker logs --tail=100 <container-id>

# Railway logs
railway logs

# Heroku logs
heroku logs --tail
heroku logs --source app

# AWS CloudWatch
aws logs tail /aws/ecs/tradie-app --follow

# DigitalOcean logs (via web UI)
```

---

## 🔄 Update/Redeploy Commands

### Docker

```bash
# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Railway

```bash
# Just push to GitHub (auto-deploys)
git push origin main

# Or manual
railway up
```

### Heroku

```bash
# Push to deploy
git push heroku main

# Force rebuild
heroku builds:create
```

### AWS ECS

```bash
# Build new image
docker build -t tradie-app .
docker tag tradie-app:latest <ecr-url>:latest
docker push <ecr-url>:latest

# Update service (pulls new image)
aws ecs update-service \
  --cluster tradie-cluster \
  --service tradie-service \
  --force-new-deployment
```

---

## 🆘 Troubleshooting Commands

```bash
# Check if port is in use
lsof -i :3001
netstat -tuln | grep 3001

# Kill process on port
kill -9 $(lsof -t -i:3001)

# Check Docker disk usage
docker system df

# Clean Docker
docker system prune -a

# Check environment variables
docker exec <container> env
railway variables

# Test database connection
nc -zv <db-host> 3306
telnet <db-host> 3306

# Check DNS
nslookup <db-host>
dig <db-host>
```

---

## 📝 Quick Setup Script

```bash
#!/bin/bash
# quick-deploy.sh

# Generate secrets
JWT_SECRET=$(openssl rand -hex 64)
PROV_SECRET=$(openssl rand -hex 64)

echo "Generated secrets:"
echo "JWT_SECRET=$JWT_SECRET"
echo "PROVENANCE_JWT_SECRET=$PROV_SECRET"

# Build Docker image
echo "Building Docker image..."
docker build -t tradie-app .

# Test locally
echo "Testing locally..."
docker run -d -p 3001:3001 \
  -e DB_HOST=host.docker.internal \
  -e DB_USER=root \
  -e DB_PASSWORD=password \
  -e DB_NAME=tradie_production \
  -e JWT_SECRET=$JWT_SECRET \
  -e PROVENANCE_JWT_SECRET=$PROV_SECRET \
  --name tradie-test \
  tradie-app

# Wait and test
sleep 5
curl http://localhost:3001/api/health

echo "Deployment test complete!"
echo "Stop with: docker stop tradie-test && docker rm tradie-test"
```

---

**Quick Reference:** Copy commands as needed for your deployment platform!

**Status:** ✅ READY TO USE  
**Version:** 2.0 | **Last Updated:** October 22, 2025
