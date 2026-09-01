# 🚀 API Quick Start Guide

## Complete Backend Setup in 10 Minutes

---

## 📋 Prerequisites

- Node.js 16+ installed
- MySQL 8.0+ running
- Database created (use `/database/quick_setup.sh`)

---

## ⚡ Quick Setup

### Step 1: Install Dependencies (2 minutes)

```bash
# Navigate to API directory
cd api/

# Install packages
npm install
```

### Step 2: Configure Environment (1 minute)

Create `.env` file in `/api/` directory:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tradie_producer
DB_USER=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRES_IN=7d

# Server
PORT=3001
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:3000

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=52428800
```

### Step 3: Create Missing Files (2 minutes)

#### Create Database Connection (`/api/db/connection.js`):

```bash
mkdir -p api/db
```

Create `/api/db/connection.js`:

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

module.exports = pool;
```

#### Create Auth Middleware (`/api/middleware/auth.js`):

```bash
mkdir -p api/middleware
```

Create `/api/middleware/auth.js`:

```javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No authentication token' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
```

#### Create Auth Routes (`/api/routes/auth.js`):

Create `/api/routes/auth.js`:

```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');

// Register
router.post('/register', async (req, res) => {
  try {
    const { phone, password, name, accountType } = req.body;
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user
    const [userResult] = await db.query(`
      INSERT INTO users (phone_number, password_hash, account_type, full_name)
      VALUES (?, ?, ?, ?)
    `, [phone, passwordHash, accountType || 'producer', name]);
    
    const userId = userResult.insertId;
    
    // Create producer profile if account type is producer
    let producerId = null;
    if (accountType === 'producer' || !accountType) {
      const [producerResult] = await db.query(`
        INSERT INTO producers (user_id, name, contact_phone)
        VALUES (?, ?, ?)
      `, [userId, name, phone]);
      
      producerId = producerResult.insertId;
    }
    
    // Generate token
    const token = jwt.sign(
      { userId, producerId, accountType },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    res.status(201).json({
      success: true,
      userId,
      producerId,
      token,
      message: 'Registration successful'
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Phone number already registered' });
    }
    
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    // Get user
    const [users] = await db.query(`
      SELECT u.*, p.producer_id
      FROM users u
      LEFT JOIN producers p ON u.user_id = p.user_id
      WHERE u.phone_number = ?
    `, [phone]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { 
        userId: user.user_id,
        producerId: user.producer_id,
        accountType: user.account_type
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    res.json({
      success: true,
      user: {
        userId: user.user_id,
        producerId: user.producer_id,
        name: user.full_name,
        accountType: user.account_type,
        kycCompleted: user.kyc_completed
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
```

#### Create Other Route Files:

Create simple versions of remaining routes:

`/api/routes/storage.js`:
```javascript
const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const { producerId } = req.query;
    const [storage] = await db.query(
      'SELECT * FROM storage WHERE producer_id = ?',
      [producerId]
    );
    res.json(storage);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const [result] = await db.query(
      'INSERT INTO storage (producer_id, crop_id, quantity, grade, certification, location, entry_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.body.producerId, req.body.cropId, req.body.quantity, req.body.grade, req.body.certification, req.body.location, req.body.entryDate]
    );
    res.status(201).json({ storageId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
```

`/api/routes/alerts.js`:
```javascript
const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const { cropId } = req.query;
    const [alerts] = await db.query(
      'SELECT * FROM alerts WHERE crop_id = ? ORDER BY timestamp DESC',
      [cropId]
    );
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const [result] = await db.query(
      'INSERT INTO alerts (crop_id, type, message, status) VALUES (?, ?, ?, ?)',
      [req.body.cropId, req.body.type, req.body.message, req.body.status]
    );
    res.status(201).json({ alertId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
```

`/api/routes/schedule.js`:
```javascript
const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const { cropId } = req.query;
    const [schedule] = await db.query(
      'SELECT * FROM schedule WHERE crop_id = ? ORDER BY due_date',
      [cropId]
    );
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const [result] = await db.query(
      'INSERT INTO schedule (crop_id, planned_activity, due_date, status) VALUES (?, ?, ?, ?)',
      [req.body.cropId, req.body.plannedActivity, req.body.dueDate, req.body.status]
    );
    res.status(201).json({ scheduleId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
```

`/api/routes/evidence.js`:
```javascript
const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../db/connection');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const [result] = await db.query(
      'INSERT INTO evidence (activity_id, media_type, url) VALUES (?, ?, ?)',
      [req.body.activityId, req.body.mediaType, `/uploads/${req.file.filename}`]
    );
    res.status(201).json({ 
      evidenceId: result.insertId,
      url: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
```

`/api/routes/varieties.js`:
```javascript
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const [varieties] = await db.query('SELECT * FROM varieties');
    res.json(varieties);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
```

### Step 4: Create Uploads Directory

```bash
mkdir -p api/uploads
```

### Step 5: Start Server (1 minute)

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║  TRADIE Producer API Server            ║
║  Status: ✅ Running                    ║
║  Port: 3001                            ║
║  Environment: development              ║
╚════════════════════════════════════════╝
```

---

## ✅ Test the API

### 1. Health Check
```bash
curl http://localhost:3001/health
```

Expected:
```json
{"status":"ok","timestamp":"2025-10-21T..."}
```

### 2. Register User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919876543210",
    "password": "password123",
    "name": "Rajesh Kumar",
    "accountType": "producer"
  }'
```

Expected:
```json
{
  "success": true,
  "userId": 1,
  "producerId": 1,
  "token": "eyJhbGci...",
  "message": "Registration successful"
}
```

### 3. Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919876543210",
    "password": "password123"
  }'
```

### 4. Get Producer Profile (with token)
```bash
curl http://localhost:3001/api/producers/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🔧 Frontend Integration

### Update React .env:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

### Test from Frontend:

```typescript
// Example: Login from React
const handleLogin = async () => {
  const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: '+919876543210',
      password: 'password123'
    })
  });
  
  const data = await response.json();
  
  if (data.success) {
    localStorage.setItem('token', data.token);
    // Redirect to dashboard
  }
};
```

---

## 📁 Final Directory Structure

```
/api
├── db
│   └── connection.js
├── middleware
│   └── auth.js
├── routes
│   ├── auth.js
│   ├── producers.js
│   ├── crops.js
│   ├── activities.js
│   ├── evidence.js
│   ├── storage.js
│   ├── alerts.js
│   ├── schedule.js
│   └── varieties.js
├── uploads/
├── .env
├── package.json
└── server.js
```

---

## 🐛 Troubleshooting

**Port 3001 already in use:**
```bash
# Change PORT in .env to 3002
PORT=3002
```

**Database connection error:**
```bash
# Check MySQL is running
mysql -u root -p -e "SELECT 1"

# Verify database exists
mysql -u root -p -e "SHOW DATABASES LIKE 'tradie_producer'"
```

**CORS errors:**
```bash
# Update FRONTEND_URL in .env
FRONTEND_URL=http://localhost:3000
```

---

## 🎉 You're Done!

Your API is now running and ready to connect to the 7-screen producer system!

**Next Steps:**
1. Import API service in React (`/services/api.ts`)
2. Update components to use API
3. Test all screens
4. Deploy to production

---

**Setup Time:** ~10 minutes  
**Status:** ✅ Ready for Development  
**Documentation:** See `/API_INTEGRATION_COMPLETE.md`
