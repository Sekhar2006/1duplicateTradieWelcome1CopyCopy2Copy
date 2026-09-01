# 🔌 Complete API Integration Guide - MySQL to React

## Overview
This guide connects your MySQL database schema to the 7-screen producer system with complete REST API endpoints.

---

## 🗄️ Database → Frontend Mapping

### Screen-to-Table Mapping

| Screen | Component | Primary Tables | Related Tables |
|--------|-----------|----------------|----------------|
| 🏠 Dashboard | ProducerAIDashboard.tsx | producers, crops | activities, alerts, storage |
| 🌾 Post Requirement | PostRequirementAdvanced.tsx | crops, plots | varieties, schedule |
| 📅 Activities | ActivityLoggerEnhanced.tsx | activities | evidence, crops |
| 🌿 Crop Health | CropHealthMonitor.tsx | crops, activities | alerts |
| 📦 Inventory | InventoryStorage.tsx | storage | crops, producers |
| 👤 Profile | ProducerProfile.tsx | producers, users | plots, crops |
| ⚙️ Settings | SettingsSupport.tsx | users, producers | - |

---

## 📡 REST API Endpoints

### Authentication & Users

#### POST /api/auth/register
**Request:**
```json
{
  "phone": "+919876543210",
  "password": "secure_password",
  "name": "Rajesh Kumar",
  "accountType": "producer"
}
```

**Database:**
```sql
INSERT INTO users (phone_number, password_hash, account_type, full_name)
VALUES (?, ?, ?, ?);

INSERT INTO producers (user_id, name, contact_phone)
VALUES (LAST_INSERT_ID(), ?, ?);
```

**Response:**
```json
{
  "success": true,
  "userId": 1,
  "producerId": 1,
  "token": "jwt_token_here"
}
```

#### POST /api/auth/login
**Request:**
```json
{
  "phone": "+919876543210",
  "password": "secure_password"
}
```

**Database:**
```sql
SELECT u.*, p.*
FROM users u
LEFT JOIN producers p ON u.user_id = p.user_id
WHERE u.phone_number = ?;
```

**Response:**
```json
{
  "success": true,
  "user": {
    "userId": 1,
    "producerId": 1,
    "name": "Rajesh Kumar",
    "accountType": "producer",
    "kycCompleted": true
  },
  "token": "jwt_token_here"
}
```

---

### Producer Profile APIs

#### GET /api/producers/:producerId
**Component:** ProducerProfile.tsx

**Database:**
```sql
SELECT 
  p.*,
  COUNT(DISTINCT c.crop_id) as total_crops,
  COUNT(DISTINCT pl.plot_id) as total_plots,
  SUM(c.area) as total_cultivated_area
FROM producers p
LEFT JOIN crops c ON p.producer_id = c.producer_id
LEFT JOIN plots pl ON p.producer_id = pl.producer_id
WHERE p.producer_id = ?
GROUP BY p.producer_id;
```

**Response:**
```json
{
  "producerId": 1,
  "name": "Rajesh Kumar",
  "contact": "+919876543210",
  "location": "Ludhiana, Punjab",
  "farmSize": 15.00,
  "totalCrops": 3,
  "totalPlots": 2,
  "rating": 4.8,
  "totalTrades": 47,
  "preferences": {
    "language": "en",
    "notifications": true
  }
}
```

#### PUT /api/producers/:producerId
**Request:**
```json
{
  "name": "Rajesh Kumar Singh",
  "location": "Ludhiana, Punjab, India",
  "farmSize": 16.5
}
```

**Database:**
```sql
UPDATE producers
SET name = ?, location = ?, farm_size = ?, updated_at = NOW()
WHERE producer_id = ?;
```

---

### Plots APIs

#### GET /api/producers/:producerId/plots
**Database:**
```sql
SELECT 
  p.*,
  COUNT(c.crop_id) as crop_count
FROM plots p
LEFT JOIN crops c ON p.plot_id = c.plot_id
WHERE p.producer_id = ?
GROUP BY p.plot_id;
```

**Response:**
```json
[
  {
    "plotId": 1,
    "plotName": "North Field",
    "totalArea": 5.00,
    "soilType": "Loamy",
    "irrigationType": "Flood",
    "cropCount": 2
  }
]
```

#### POST /api/plots
**Request:**
```json
{
  "producerId": 1,
  "plotName": "South Field",
  "totalArea": 3.5,
  "soilType": "Clay",
  "irrigationType": "Drip"
}
```

**Database:**
```sql
INSERT INTO plots (producer_id, plot_name, total_area, soil_type, irrigation_type)
VALUES (?, ?, ?, ?, ?);
```

---

### Crops APIs

#### GET /api/producers/:producerId/crops
**Component:** PostRequirementAdvanced.tsx, CropHealthMonitor.tsx

**Database:**
```sql
SELECT 
  c.*,
  p.plot_name,
  COUNT(a.activity_id) as activity_count,
  MAX(a.date) as last_activity_date
FROM crops c
LEFT JOIN plots p ON c.plot_id = p.plot_id
LEFT JOIN activities a ON c.crop_id = a.crop_id
WHERE c.producer_id = ?
GROUP BY c.crop_id
ORDER BY c.sowing_date DESC;
```

**Response:**
```json
[
  {
    "cropId": 1,
    "category": "Grains",
    "name": "Wheat",
    "variety": "PBW 343",
    "area": 5.00,
    "plotId": 1,
    "plotName": "North Field",
    "sowingDate": "2025-11-15",
    "currentStage": "planning",
    "hasIntercrop": false,
    "activityCount": 0,
    "lastActivityDate": null
  }
]
```

#### POST /api/crops
**Request:**
```json
{
  "producerId": 1,
  "plotId": 1,
  "category": "Grains",
  "name": "Wheat",
  "variety": "PBW 343",
  "area": 5.0,
  "sowingDate": "2025-11-15",
  "hasIntercrop": false
}
```

**Database:**
```sql
INSERT INTO crops 
(producer_id, plot_id, category, name, variety, area, sowing_date, intercrop_id)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);
```

#### GET /api/crops/:cropId
**Database:**
```sql
SELECT 
  c.*,
  p.plot_name,
  p.total_area as plot_area,
  ic.name as intercrop_name,
  ic.variety as intercrop_variety
FROM crops c
LEFT JOIN plots p ON c.plot_id = p.plot_id
LEFT JOIN crops ic ON c.intercrop_id = ic.crop_id
WHERE c.crop_id = ?;
```

---

### Activities APIs

#### GET /api/crops/:cropId/activities
**Component:** ActivityLoggerEnhanced.tsx, ActivityTracking.tsx

**Database:**
```sql
SELECT 
  a.*,
  COUNT(e.evidence_id) as evidence_count
FROM activities a
LEFT JOIN evidence e ON a.activity_id = e.activity_id
WHERE a.crop_id = ?
ORDER BY a.date DESC;
```

**Response:**
```json
[
  {
    "activityId": 1,
    "cropId": 1,
    "date": "2025-10-15",
    "type": "irrigation",
    "method": "Flood irrigation",
    "inputUsed": "Water - 2000L",
    "remarks": "First irrigation after sowing",
    "evidenceCount": 2
  }
]
```

#### POST /api/activities
**Request:**
```json
{
  "cropId": 1,
  "date": "2025-10-20",
  "type": "fertilizer",
  "method": "Broadcasting",
  "inputUsed": "NPK 20-20-0, 2 bags",
  "remarks": "First fertilizer dose"
}
```

**Database:**
```sql
INSERT INTO activities (crop_id, date, type, method, input_used, remarks)
VALUES (?, ?, ?, ?, ?, ?);
```

#### POST /api/activities/:activityId/evidence
**Request:** (multipart/form-data)
```
file: [image/video/audio file]
mediaType: "photo"
caption: "Irrigation in progress"
```

**Database:**
```sql
-- First upload file to storage, get URL
INSERT INTO evidence (activity_id, media_type, url, timestamp)
VALUES (?, ?, ?, NOW());
```

**Response:**
```json
{
  "evidenceId": 1,
  "url": "https://storage.example.com/evidence/123.jpg",
  "mediaType": "photo"
}
```

---

### Varieties APIs

#### GET /api/varieties
**Component:** PostRequirementAdvanced.tsx (commodities dropdown)

**Database:**
```sql
SELECT DISTINCT 
  crop_id,
  name,
  traits,
  recommended_area
FROM varieties
ORDER BY name;
```

**Response:**
```json
[
  {
    "varietyId": 1,
    "cropId": 1,
    "name": "PBW 343",
    "traits": "High-yielding, disease-resistant",
    "recommendedArea": "Punjab, Haryana"
  }
]
```

#### GET /api/varieties/:cropName
**Database:**
```sql
SELECT * FROM varieties
WHERE crop_id = (SELECT crop_id FROM crops WHERE name = ? LIMIT 1);
```

---

### Alerts APIs

#### GET /api/producers/:producerId/alerts
**Component:** ProducerAIDashboard.tsx (notifications)

**Database:**
```sql
SELECT 
  al.*,
  c.name as crop_name,
  c.variety as crop_variety
FROM alerts al
LEFT JOIN crops c ON al.crop_id = c.crop_id
WHERE c.producer_id = ?
  AND al.status = 'new'
ORDER BY al.timestamp DESC
LIMIT 20;
```

**Response:**
```json
[
  {
    "alertId": 1,
    "cropId": 1,
    "cropName": "Wheat",
    "type": "pest_warning",
    "message": "High aphid activity detected in your region",
    "status": "new",
    "timestamp": "2025-10-20T10:30:00Z"
  }
]
```

#### POST /api/alerts
**Request:**
```json
{
  "cropId": 1,
  "type": "irrigation_due",
  "message": "Irrigation scheduled for tomorrow",
  "status": "new"
}
```

**Database:**
```sql
INSERT INTO alerts (crop_id, type, message, status, timestamp)
VALUES (?, ?, ?, ?, NOW());
```

#### PUT /api/alerts/:alertId
**Request:**
```json
{
  "status": "acknowledged"
}
```

**Database:**
```sql
UPDATE alerts
SET status = ?
WHERE alert_id = ?;
```

---

### Storage APIs

#### GET /api/producers/:producerId/storage
**Component:** InventoryStorage.tsx

**Database:**
```sql
SELECT 
  s.*,
  c.name as crop_name,
  c.variety as crop_variety
FROM storage s
LEFT JOIN crops c ON s.crop_id = c.crop_id
WHERE s.producer_id = ?
ORDER BY s.entry_date DESC;
```

**Response:**
```json
[
  {
    "storageId": 1,
    "producerId": 1,
    "cropId": 1,
    "cropName": "Wheat",
    "variety": "PBW 343",
    "quantity": 50.000,
    "grade": "A",
    "certification": "Organic",
    "location": "Warehouse A",
    "entryDate": "2025-10-15"
  }
]
```

#### POST /api/storage
**Request:**
```json
{
  "producerId": 1,
  "cropId": 1,
  "quantity": 50.0,
  "grade": "A",
  "certification": "Organic",
  "location": "Warehouse A",
  "entryDate": "2025-10-15"
}
```

**Database:**
```sql
INSERT INTO storage 
(producer_id, crop_id, quantity, grade, certification, location, entry_date)
VALUES (?, ?, ?, ?, ?, ?, ?);
```

---

### Schedule APIs

#### GET /api/crops/:cropId/schedule
**Database:**
```sql
SELECT *
FROM schedule
WHERE crop_id = ?
  AND status != 'completed'
ORDER BY due_date ASC;
```

**Response:**
```json
[
  {
    "scheduleId": 1,
    "cropId": 1,
    "plannedActivity": "Second irrigation",
    "dueDate": "2025-10-25",
    "status": "pending"
  }
]
```

#### POST /api/schedule
**Request:**
```json
{
  "cropId": 1,
  "plannedActivity": "Fertilizer application",
  "dueDate": "2025-11-01",
  "status": "pending"
}
```

**Database:**
```sql
INSERT INTO schedule (crop_id, planned_activity, due_date, status)
VALUES (?, ?, ?, ?);
```

---

### Dashboard APIs

#### GET /api/producers/:producerId/dashboard
**Component:** ProducerAIDashboard.tsx

**Database:**
```sql
-- Multiple queries combined
SELECT 
  (SELECT COUNT(*) FROM crops WHERE producer_id = ?) as total_crops,
  (SELECT COUNT(*) FROM activities WHERE crop_id IN (SELECT crop_id FROM crops WHERE producer_id = ?)) as total_activities,
  (SELECT COUNT(*) FROM alerts WHERE crop_id IN (SELECT crop_id FROM crops WHERE producer_id = ?) AND status = 'new') as active_alerts,
  (SELECT SUM(quantity) FROM storage WHERE producer_id = ?) as total_inventory,
  (SELECT COUNT(*) FROM schedule WHERE crop_id IN (SELECT crop_id FROM crops WHERE producer_id = ?) AND status = 'pending') as pending_tasks;
```

**Response:**
```json
{
  "stats": {
    "totalCrops": 3,
    "activeCrops": 2,
    "totalActivities": 15,
    "activeAlerts": 2,
    "totalInventory": 150.5,
    "pendingTasks": 4
  },
  "recentActivities": [...],
  "upcomingSchedule": [...],
  "alerts": [...]
}
```

---

## 🔧 Backend Implementation Examples

### Node.js + Express + MySQL2

#### Setup
```bash
npm install express mysql2 bcrypt jsonwebtoken dotenv
```

#### Database Connection
```javascript
// db/connection.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

#### Example: Get Producer Profile
```javascript
// routes/producers.js
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET /api/producers/:producerId
router.get('/:producerId', async (req, res) => {
  try {
    const { producerId } = req.params;
    
    const [rows] = await db.query(`
      SELECT 
        p.*,
        COUNT(DISTINCT c.crop_id) as total_crops,
        COUNT(DISTINCT pl.plot_id) as total_plots,
        SUM(c.area) as total_cultivated_area
      FROM producers p
      LEFT JOIN crops c ON p.producer_id = c.producer_id
      LEFT JOIN plots pl ON p.producer_id = pl.producer_id
      WHERE p.producer_id = ?
      GROUP BY p.producer_id
    `, [producerId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Producer not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
```

#### Example: Create Activity
```javascript
// routes/activities.js
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// POST /api/activities
router.post('/', async (req, res) => {
  try {
    const { cropId, date, type, method, inputUsed, remarks } = req.body;
    
    const [result] = await db.query(`
      INSERT INTO activities (crop_id, date, type, method, input_used, remarks)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [cropId, date, type, method, inputUsed, remarks]);
    
    res.status(201).json({
      activityId: result.insertId,
      message: 'Activity created successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
```

#### Example: File Upload (Evidence)
```javascript
// routes/evidence.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../db/connection');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// POST /api/activities/:activityId/evidence
router.post('/:activityId/evidence', upload.single('file'), async (req, res) => {
  try {
    const { activityId } = req.params;
    const { mediaType, caption } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;
    
    const [result] = await db.query(`
      INSERT INTO evidence (activity_id, media_type, url, caption)
      VALUES (?, ?, ?, ?)
    `, [activityId, mediaType, fileUrl, caption]);
    
    res.status(201).json({
      evidenceId: result.insertId,
      url: fileUrl,
      mediaType
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
```

#### Main Server
```javascript
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/producers', require('./routes/producers'));
app.use('/api/crops', require('./routes/crops'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/evidence', require('./routes/evidence'));
app.use('/api/storage', require('./routes/storage'));
app.use('/api/alerts', require('./routes/alerts'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🔌 Frontend Integration

### API Service Layer
```typescript
// services/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async put(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async delete(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return response.json();
  }

  async uploadFile(endpoint: string, file: File, data: any) {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: formData
    });
    return response.json();
  }
}

export const api = new ApiService();
```

### Producer Service
```typescript
// services/producerService.ts
import { api } from './api';

export const producerService = {
  async getProfile(producerId: number) {
    return api.get(`/producers/${producerId}`);
  },

  async updateProfile(producerId: number, data: any) {
    return api.put(`/producers/${producerId}`, data);
  },

  async getCrops(producerId: number) {
    return api.get(`/producers/${producerId}/crops`);
  },

  async getStorage(producerId: number) {
    return api.get(`/producers/${producerId}/storage`);
  },

  async getDashboard(producerId: number) {
    return api.get(`/producers/${producerId}/dashboard`);
  }
};
```

### Activity Service
```typescript
// services/activityService.ts
import { api } from './api';

export const activityService = {
  async getActivities(cropId: number) {
    return api.get(`/crops/${cropId}/activities`);
  },

  async createActivity(data: any) {
    return api.post('/activities', data);
  },

  async uploadEvidence(activityId: number, file: File, mediaType: string) {
    return api.uploadFile(`/activities/${activityId}/evidence`, file, {
      mediaType
    });
  }
};
```

### Component Integration Example
```typescript
// components/producer-dashboard/ProducerProfile.tsx
import { useEffect, useState } from 'react';
import { producerService } from '../../services/producerService';

export function ProducerProfile() {
  const [producer, setProducer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadProducerData();
  }, []);
  
  const loadProducerData = async () => {
    try {
      const producerId = 1; // Get from auth context
      const data = await producerService.getProfile(producerId);
      setProducer(data);
    } catch (error) {
      console.error('Failed to load producer data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdate = async (updatedData: any) => {
    try {
      await producerService.updateProfile(producer.producerId, updatedData);
      await loadProducerData(); // Refresh
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>{producer.name}</h2>
      {/* Rest of component */}
    </div>
  );
}
```

---

## 🔐 Authentication Flow

### JWT Authentication
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
```

### Usage in Routes
```javascript
// routes/producers.js
const authMiddleware = require('../middleware/auth');

router.get('/:producerId', authMiddleware, async (req, res) => {
  // Only allow access to own producer profile
  if (req.user.producerId !== parseInt(req.params.producerId)) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  // ... rest of code
});
```

---

## 📦 Environment Variables

```env
# .env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tradie_producer
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

PORT=3001

# File upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=52428800

# API
API_URL=http://localhost:3001
```

---

## ✅ Integration Checklist

- [ ] Database schema created
- [ ] API endpoints implemented
- [ ] Authentication middleware added
- [ ] File upload configured
- [ ] Frontend API service created
- [ ] Components integrated with API
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] CORS configured
- [ ] Environment variables set
- [ ] Testing completed

---

**Version:** 1.0  
**Last Updated:** October 21, 2025  
**Status:** ✅ Complete Integration Guide
