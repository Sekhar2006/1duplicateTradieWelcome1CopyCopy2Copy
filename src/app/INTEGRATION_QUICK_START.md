# 🚀 Integration Quick Start Guide

**Get Your Complete Backend Running in 15 Minutes**  
**Date:** October 22, 2025

---

## ✅ Prerequisites

- Node.js 16+ installed
- MySQL 8+ installed and running
- Git repository cloned
- Terminal access

---

## 📋 Step-by-Step Setup

### **Step 1: Install Dependencies** (2 minutes)

```bash
cd api
npm install express mysql2 cors dotenv jsonwebtoken bcryptjs express-rate-limit multer node-cache
```

### **Step 2: Configure Environment** (1 minute)

Create `/api/.env`:

```bash
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=tradie_db

# Server
PORT=3001
NODE_ENV=development

# JWT Secrets (CHANGE THESE IN PRODUCTION!)
JWT_SECRET=tradie-super-secret-jwt-key-change-in-production-2025
REFRESH_TOKEN_SECRET=tradie-refresh-token-secret-change-in-production-2025
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:3000
```

### **Step 3: Setup Database** (3 minutes)

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS tradie_db;"

# Run schemas in order
cd database

# 1. Core services schema (aligned)
mysql -u root -p tradie_db < schema_services_aligned.sql

# 2. Additional tables (users, documents, etc.)
mysql -u root -p tradie_db < additional_tables.sql

# Verify tables created
mysql -u root -p tradie_db -e "SHOW TABLES;"
```

**Expected output (18 tables):**
```
+----------------------------+
| Tables_in_tradie_db        |
+----------------------------+
| activity_log               |
| documents                  |
| email_verification_tokens  |
| equipment_details          |
| labor_details              |
| notifications              |
| payments                   |
| provider_availability      |
| provider_certifications    |
| provider_reviews           |
| saved_providers            |
| search_history             |
| seasonal_alerts            |
| seller_products            |
| service_providers          |
| service_requests           |
| users                      |
| worker_support_services    |
+----------------------------+
```

### **Step 4: Update Server Configuration** (2 minutes)

Update `/api/server.js`:

```javascript
// Add after existing requires
const pool = require('./config/database'); // Database connection

// Add new routes (after existing routes)
const authRoutes = require('./routes/auth');
const availabilityRoutes = require('./routes/availability');
const searchRoutes = require('./routes/search');
const documentsRoutes = require('./routes/documents');

// Mount new routes
app.use('/api/auth', authRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/documents', documentsRoutes);
```

### **Step 5: Update Service Provider Routes** (3 minutes)

Update `/api/routes/service-providers.js`:

Add at the top:
```javascript
const pool = require('../config/database');
const { 
  authenticateUser, 
  authorizeRoles, 
  optionalAuth,
  requireActive 
} = require('../middleware/auth');
```

Update existing routes:
```javascript
// Make POST routes require authentication
router.post('/providers', authenticateUser, requireActive, async (req, res) => {
  // Change req.userId to req.user.user_id
  const created_by = req.user.user_id;
  // ... rest of code
});

router.post('/service-requests', authenticateUser, authorizeRoles('producer'), async (req, res) => {
  const producer_id = req.user.user_id;
  // ... rest of code
});
```

### **Step 6: Create Missing Route Files** (5 minutes)

You need to create these files (code is in COMPLETE_BACKEND_INTEGRATION_ROADMAP.md):

1. `/api/routes/auth.js` - Authentication endpoints
2. `/api/routes/availability.js` - Availability management
3. `/api/routes/search.js` - Advanced search
4. `/api/routes/documents.js` - File uploads

Copy the code from the roadmap document to create these files.

### **Step 7: Create Uploads Directory** (30 seconds)

```bash
cd api
mkdir -p uploads
chmod 755 uploads
```

### **Step 8: Start Server** (30 seconds)

```bash
cd api
npm start
```

**Expected output:**
```
╔════════════════════════════════════════╗
║  TRADIE Producer API Server            ║
║  Status: ✅ Running                    ║
║  Port: 3001                            ║
╚════════════════════════════════════════╝

✅ Database connected successfully

Available Routes:
- POST   /api/auth/register
- POST   /api/auth/login
- POST   /api/auth/refresh
- POST   /api/auth/logout
- GET    /api/providers
- POST   /api/providers (🔒 auth required)
... (all endpoints)

Press CTRL+C to stop
```

---

## ✅ Quick Test

### Test 1: Register User

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@producer.com",
    "password": "Producer@123",
    "name": "Test Producer",
    "role": "producer",
    "phone": "+919876543210"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "user_id": 4,
      "email": "test@producer.com",
      "name": "Test Producer",
      "role": "producer"
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "expiresIn": "1h"
    }
  }
}
```

### Test 2: Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@producer.com",
    "password": "Producer@123"
  }'
```

### Test 3: Get Providers (with auth)

```bash
# Save token from login response
TOKEN="eyJhbGc..."

curl http://localhost:3001/api/providers \
  -H "Authorization: Bearer $TOKEN"
```

### Test 4: Create Service Request (auth required)

```bash
curl -X POST http://localhost:3001/api/service-requests \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "provider_id": 1,
    "service_type": "equipment",
    "request_description": "Need JCB for land leveling",
    "location": "My Farm, Guntur",
    "start_date": "2025-10-28",
    "budget": 25000
  }'
```

---

## 🎯 Verification Checklist

After setup, verify:

- [ ] Database has 18 tables
- [ ] Server starts without errors
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Receive JWT tokens
- [ ] Can access protected endpoints with token
- [ ] Can get providers list
- [ ] Can create service request (with auth)
- [ ] Can upload documents
- [ ] Can search providers

---

## 📊 What You Now Have

### ✅ **Complete Authentication System**
- User registration with password hashing
- Login with JWT tokens
- Token refresh mechanism
- Role-based access control
- Rate limiting

### ✅ **Service Provider System**
- 4 sample providers pre-loaded
- CRUD operations with auth
- Advanced filtering
- Search functionality

### ✅ **Service Request System**
- Producers can request services
- Grok AI fraud detection
- Status tracking
- Review system

### ✅ **File Upload System**
- Document upload
- Secure download
- Verification workflow

### ✅ **Availability Management**
- Provider calendar
- Slot booking
- Double-booking prevention

### ✅ **Advanced Search**
- Multi-criteria filtering
- Autocomplete
- Location-based search

---

## 🔧 Troubleshooting

### Issue: Database connection failed

```bash
# Check MySQL is running
sudo systemctl status mysql

# Test connection
mysql -u root -p -e "SELECT 1;"

# Check credentials in .env
cat api/.env
```

### Issue: Missing tables

```bash
# Re-run schemas
cd database
mysql -u root -p tradie_db < schema_services_aligned.sql
mysql -u root -p tradie_db < additional_tables.sql
```

### Issue: Authentication not working

```bash
# Check JWT secrets in .env
# Make sure they're set and not empty

# Verify middleware is imported correctly
grep "authenticateUser" api/routes/service-providers.js
```

### Issue: Cannot upload files

```bash
# Check uploads directory exists and has permissions
ls -la api/uploads
chmod 755 api/uploads

# Install multer if missing
cd api && npm install multer
```

---

## 📱 Frontend Integration

Update your React frontend to use authentication:

```typescript
// Create API client
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const { data } = await axios.post('/api/auth/refresh', { refreshToken });
        localStorage.setItem('accessToken', data.data.accessToken);
        // Retry original request
        error.config.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 🚀 Next Steps

### Immediate (Today)
1. ✅ Test all endpoints with Postman
2. ✅ Update Postman collection with auth
3. ✅ Test frontend integration
4. ✅ Verify file uploads work

### This Week
1. Add email verification
2. Implement notifications
3. Add payment integration
4. Set up error monitoring
5. Load testing

### This Month
1. Deploy to production
2. Set up CI/CD
3. Configure AWS S3
4. Add analytics
5. Launch to users

---

## 📚 Documentation References

- **Complete Roadmap:** `/COMPLETE_BACKEND_INTEGRATION_ROADMAP.md`
- **API Examples:** `/api/PRACTICAL_API_EXAMPLES.md`
- **Auth Guide:** `/api/AUTH_IMPLEMENTATION_COMPLETE.md`
- **Database Schema:** `/database/schema_services_aligned.sql`
- **Postman Collection:** `/api/TRADIE_Services_Postman_Collection.json`

---

## ✅ Success Criteria

You're done when:

1. ✅ Server starts without errors
2. ✅ Can register new users
3. ✅ Can login and get JWT tokens
4. ✅ Protected endpoints require auth
5. ✅ Can create service requests
6. ✅ Can upload documents
7. ✅ All Postman tests pass
8. ✅ Frontend can authenticate

---

**🎉 Congratulations! Your complete backend is now running with authentication, service providers, file uploads, and advanced search!**

**Time to completion:** ~15 minutes  
**Next:** Update your frontend to use the new authentication system
