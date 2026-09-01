# 📡 TRADIE API Specification

**Version:** 2.0  
**Base URL:** `https://api.tradie.app` (Production) | `http://localhost:3001` (Development)  
**Protocol:** REST  
**Authentication:** JWT Bearer Token  
**Data Format:** JSON

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Crop Batch Management](#crop-batch-management)
3. [Provenance & Tokenization](#provenance--tokenization)
4. [Quality Check System](#quality-check-system)
5. [Services & Resources](#services--resources)
6. [Producer Management](#producer-management)
7. [Activity Tracking](#activity-tracking)
8. [Error Codes](#error-codes)
9. [Rate Limiting](#rate-limiting)

---

## 🔐 Authentication

### Login

**Endpoint:** `POST /api/auth/login`  
**Auth Required:** ❌ No

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "1",
    "username": "producer123",
    "role": "producer",
    "producerId": "PROD001",
    "name": "Ramesh Kumar",
    "email": "ramesh@example.com",
    "phone": "+91-9876543210"
  }
}
```

**Error (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Using JWT Token

**All authenticated endpoints require:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example:**
```bash
curl -X GET https://api.tradie.app/api/producers/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🌾 Crop Batch Management

### Create Crop Batch

**Endpoint:** `POST /api/provenance/crop-batch`  
**Auth Required:** ✅ Yes

**Request:**
```json
{
  "producerId": "1",
  "category": "Vegetables",
  "variety": "Tomato",
  "farmLocation": {
    "state": "Karnataka",
    "district": "Bangalore",
    "village": "Whitefield",
    "pincode": "560066"
  },
  "initialData": {
    "plantingDate": "2025-01-15",
    "estimatedHarvest": "2025-04-15",
    "quantity": 500,
    "unit": "kg"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Crop batch created successfully",
  "data": {
    "cropBatchId": "CB-VEG-TOM-L5X7M2ABC",
    "producerId": "1",
    "category": "Vegetables",
    "variety": "Tomato",
    "farmLocation": {
      "state": "Karnataka",
      "district": "Bangalore",
      "village": "Whitefield",
      "pincode": "560066"
    },
    "plantingDate": "2025-01-15",
    "estimatedHarvestDate": "2025-04-15",
    "currentStage": "planting",
    "status": "active",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

### Get Crop Batch

**Endpoint:** `GET /api/provenance/crop-batch/:cropBatchId`  
**Auth Required:** ❌ No (Public)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "cropBatchId": "CB-VEG-TOM-L5X7M2ABC",
    "producerId": "1",
    "category": "Vegetables",
    "variety": "Tomato",
    "currentStage": "harvesting",
    "status": "active",
    "farmLocation": {...},
    "history": [
      {
        "id": "1",
        "stage": "planting",
        "eventType": "planting_completed",
        "description": "Seeds planted in field 5A",
        "timestamp": "2025-01-15T10:30:00Z",
        "data": {
          "seedType": "Hybrid",
          "quantity": "2kg",
          "weather": "Clear"
        }
      }
    ],
    "token": {
      "tokenId": "NFT-TRD-L5X7M2ABC123",
      "qrCodeUrl": "https://tradie.app/api/provenance/validate/...",
      "createdAt": "2025-04-15T12:00:00Z"
    }
  }
}
```

### Add History Entry

**Endpoint:** `POST /api/provenance/crop-batch/:cropBatchId/history`  
**Auth Required:** ✅ Yes

**Request:**
```json
{
  "stage": "harvesting",
  "eventType": "harvest_completed",
  "description": "Harvested 450kg of tomatoes",
  "data": {
    "actualQuantity": 450,
    "unit": "kg",
    "quality": "Grade A",
    "weather": "Sunny",
    "temperature": "28°C"
  },
  "createdBy": "1"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "History entry added successfully",
  "data": {
    "id": "5",
    "cropBatchId": "CB-VEG-TOM-L5X7M2ABC",
    "stage": "harvesting",
    "eventType": "harvest_completed",
    "description": "Harvested 450kg of tomatoes",
    "timestamp": "2025-04-10T08:00:00Z",
    "data": {
      "actualQuantity": 450,
      "unit": "kg",
      "quality": "Grade A"
    }
  }
}
```

### List Producer Crop Batches

**Endpoint:** `GET /api/provenance/crop-batch/producer/:producerId`  
**Auth Required:** ✅ Yes  
**Query Parameters:**
- `category` (optional): Filter by category
- `stage` (optional): Filter by current stage
- `status` (optional): Filter by status (default: 'active')
- `limit` (optional): Results per page (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Example:**
```bash
GET /api/provenance/crop-batch/producer/1?category=Vegetables&status=active&limit=20
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "cropBatchId": "CB-VEG-TOM-L5X7M2ABC",
      "category": "Vegetables",
      "variety": "Tomato",
      "currentStage": "harvesting",
      "status": "active",
      "history_count": 5,
      "token_id": "NFT-TRD-L5X7M2ABC123",
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "total": 1
  }
}
```

---

## 🔐 Provenance & Tokenization

### Tokenize Crop Batch (Generate NFT & QR)

**Endpoint:** `POST /api/provenance/tokenize/:cropBatchId`  
**Auth Required:** ✅ Yes

**Request:**
```json
{
  "tokenMetadata": {
    "certifications": [
      {
        "type": "Organic",
        "issuer": "IOCA",
        "certificateNumber": "ORG-2025-12345"
      }
    ],
    "qualityReport": {
      "grade": "A",
      "pestResidues": "None detected",
      "moistureContent": "12%"
    },
    "packingDetails": {
      "numberOfBags": 10,
      "packingDate": "2025-04-15",
      "packingMethod": "Vacuum sealed"
    }
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Crop batch tokenized successfully",
  "data": {
    "tokenId": "NFT-TRD-L5X7M2ABC123",
    "cropBatchId": "CB-VEG-TOM-L5X7M2ABC",
    "qrCodeUrl": "https://tradie.app/api/provenance/validate/eyJhbGciOiJIUzI1NiIs...",
    "qrCodeDataUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "category": "Vegetables",
    "variety": "Tomato",
    "qualityGrade": "A",
    "status": "active",
    "createdAt": "2025-04-15T12:00:00Z",
    "expiresAt": "2025-05-15T12:00:00Z"
  }
}
```

### Validate JWT Token (QR Code Scan) 🆕

**Endpoint:** `GET /api/provenance/validate/:jwtToken`  
**Auth Required:** ❌ No (Public)

**Example:**
```bash
GET /api/provenance/validate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "cropBatchId": "CB-VEG-TOM-L5X7M2ABC",
    "category": "Vegetables",
    "variety": "Tomato",
    "farmLocation": {
      "state": "Karnataka",
      "district": "Bangalore",
      "village": "Whitefield"
    },
    "plantingDate": "2025-01-15",
    "actualHarvestDate": "2025-04-10",
    "quantity": 450,
    "unit": "kg",
    "qualityGrade": "A",
    "currentStage": "tokenized",
    "status": "active",
    "tokenId": "NFT-TRD-L5X7M2ABC123",
    "tokenCreatedAt": "2025-04-15T12:00:00Z",
    "producer": {
      "name": "Ramesh Kumar",
      "contact": "+91-9876543210",
      "location": {
        "state": "Karnataka",
        "district": "Bangalore"
      }
    },
    "history": [
      {
        "timestamp": "2025-01-15T10:30:00Z",
        "stage": "planting",
        "eventType": "planting_completed",
        "description": "Seeds planted",
        "data": {...}
      },
      {
        "timestamp": "2025-04-10T08:00:00Z",
        "stage": "harvesting",
        "eventType": "harvest_completed",
        "description": "Harvested 450kg",
        "data": {...}
      }
    ]
  }
}
```

**Error (401 Unauthorized - Expired Token):**
```json
{
  "success": false,
  "message": "Invalid or expired token",
  "error": "jwt expired"
}
```

### Get Token Data (Simple Token ID)

**Endpoint:** `GET /api/provenance/token/:tokenId`  
**Auth Required:** ❌ No (Public)

**Example:**
```bash
GET /api/provenance/token/NFT-TRD-L5X7M2ABC123
```

**Response:** Similar to JWT validation response above

### Verify Token (Record Scan)

**Endpoint:** `PUT /api/provenance/token/:tokenId/verify`  
**Auth Required:** ❌ No (Public)

**Request:**
```json
{
  "verifiedBy": "BUYER001",
  "verificationType": "qr_scan",
  "location": {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "city": "Bangalore"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Token verified successfully",
  "data": {
    "verificationId": "VER-123456",
    "tokenId": "NFT-TRD-L5X7M2ABC123",
    "verifiedBy": "BUYER001",
    "verificationType": "qr_scan",
    "verifiedAt": "2025-04-20T14:30:00Z",
    "totalVerifications": 5
  }
}
```

### Get Token Verification History

**Endpoint:** `GET /api/provenance/token/:tokenId/verifications`  
**Auth Required:** ❌ No (Public)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "verificationId": "VER-123456",
      "verifiedBy": "BUYER001",
      "verificationType": "qr_scan",
      "location": {
        "city": "Bangalore"
      },
      "verifiedAt": "2025-04-20T14:30:00Z"
    }
  ],
  "stats": {
    "totalVerifications": 5,
    "uniqueVerifiers": 3,
    "firstVerification": "2025-04-15T12:00:00Z",
    "lastVerification": "2025-04-20T14:30:00Z"
  }
}
```

### Get Producer Statistics

**Endpoint:** `GET /api/provenance/stats/:producerId`  
**Auth Required:** ✅ Yes

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "producerId": "1",
    "totalCropBatches": 25,
    "activeBatches": 8,
    "completedBatches": 17,
    "totalTokensGenerated": 15,
    "totalVerifications": 127,
    "categoriesGrown": ["Vegetables", "Fruits", "Spices"],
    "topVarieties": [
      {"variety": "Tomato", "count": 8},
      {"variety": "Potato", "count": 5}
    ],
    "averageGrowingDays": 85,
    "totalQuantityProduced": 12500,
    "unit": "kg"
  }
}
```

---

## ✅ Quality Check System

### Create Quality Check

**Endpoint:** `POST /api/quality-check`  
**Auth Required:** ✅ Yes

**Request:**
```json
{
  "producerId": "1",
  "commodityType": "Vegetables",
  "variety": "Tomato",
  "quantity": 500,
  "unit": "kg",
  "qualityGrade": "A",
  "testResults": {
    "appearance": "Excellent",
    "color": "Bright red",
    "size": "Medium to large",
    "firmness": "Firm",
    "pestResidues": "None detected",
    "moistureContent": "12%"
  },
  "certifications": [
    {
      "type": "Organic",
      "issuer": "IOCA",
      "certificateNumber": "ORG-2025-12345"
    }
  ],
  "inspectorId": "INS001",
  "inspectionDate": "2025-04-15"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Quality check created successfully",
  "data": {
    "qualityCheckId": "QC-VEG-TOM-ABC123",
    "tokenId": "TOK-VEG-TOM-XYZ789",
    "producerId": "1",
    "commodityType": "Vegetables",
    "variety": "Tomato",
    "qualityGrade": "A",
    "qrCodeDataUrl": "data:image/png;base64,iVBORw0KG...",
    "status": "active",
    "createdAt": "2025-04-15T10:00:00Z"
  }
}
```

### Get Quality Check

**Endpoint:** `GET /api/quality-check/:qualityCheckId`  
**Auth Required:** ❌ No (Public)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "qualityCheckId": "QC-VEG-TOM-ABC123",
    "tokenId": "TOK-VEG-TOM-XYZ789",
    "producerId": "1",
    "producerName": "Ramesh Kumar",
    "commodityType": "Vegetables",
    "variety": "Tomato",
    "quantity": 500,
    "unit": "kg",
    "qualityGrade": "A",
    "testResults": {...},
    "certifications": [...],
    "inspectorId": "INS001",
    "inspectionDate": "2025-04-15",
    "status": "active",
    "createdAt": "2025-04-15T10:00:00Z"
  }
}
```

### Validate Quality Token

**Endpoint:** `GET /api/quality-check/token/:tokenId`  
**Auth Required:** ❌ No (Public)

**Response:** Similar to Get Quality Check

### List Quality Checks by Producer

**Endpoint:** `GET /api/quality-check/producer/:producerId`  
**Auth Required:** ✅ Yes  
**Query Parameters:**
- `commodityType` (optional)
- `variety` (optional)
- `qualityGrade` (optional)
- `limit` (default: 50)
- `offset` (default: 0)

---

## 🛠️ Services & Resources

### Get Service Providers

**Endpoint:** `GET /api/service-providers`  
**Auth Required:** ❌ No  
**Query Parameters:**
- `category` (optional): e.g., "Transport", "Storage"
- `location` (optional): Filter by state/district
- `availability` (optional): true/false
- `limit` (default: 50)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "providerId": "SP001",
      "name": "Fast Transport Services",
      "category": "Transport",
      "services": ["Cold Storage Transport", "Bulk Transport"],
      "location": {
        "state": "Karnataka",
        "city": "Bangalore"
      },
      "rating": 4.5,
      "priceRange": "₹500-₹2000 per ton",
      "availability": true,
      "contact": {
        "phone": "+91-9876543210",
        "email": "info@fasttransport.com"
      }
    }
  ]
}
```

### Book Service

**Endpoint:** `POST /api/service-bookings`  
**Auth Required:** ✅ Yes

**Request:**
```json
{
  "producerId": "1",
  "providerId": "SP001",
  "serviceType": "Transport",
  "bookingDate": "2025-04-20",
  "details": {
    "pickupLocation": "Whitefield, Bangalore",
    "deliveryLocation": "APMC Market, Bangalore",
    "quantity": 500,
    "unit": "kg",
    "commodityType": "Vegetables"
  },
  "estimatedCost": 1500
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Service booking created successfully",
  "data": {
    "bookingId": "BOOK-123456",
    "producerId": "1",
    "providerId": "SP001",
    "serviceType": "Transport",
    "bookingDate": "2025-04-20",
    "status": "pending",
    "estimatedCost": 1500,
    "createdAt": "2025-04-15T14:00:00Z"
  }
}
```

---

## 👤 Producer Management

### Get Producer Profile

**Endpoint:** `GET /api/producers/profile`  
**Auth Required:** ✅ Yes (Producer only)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "producerId": "1",
    "name": "Ramesh Kumar",
    "email": "ramesh@example.com",
    "phone": "+91-9876543210",
    "location": {
      "state": "Karnataka",
      "district": "Bangalore",
      "village": "Whitefield",
      "pincode": "560066"
    },
    "farmDetails": {
      "totalLandArea": 5.5,
      "unit": "acres",
      "irrigationType": "Drip",
      "soilType": "Red soil"
    },
    "kycStatus": "verified",
    "rating": 4.7,
    "totalSales": 12500,
    "joinedDate": "2024-01-15"
  }
}
```

### Update Producer Profile

**Endpoint:** `PUT /api/producers/profile`  
**Auth Required:** ✅ Yes (Producer only)

**Request:**
```json
{
  "phone": "+91-9876543211",
  "farmDetails": {
    "totalLandArea": 6.0,
    "irrigationType": "Sprinkler"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {...}
}
```

---

## 📊 Activity Tracking

### Log Activity

**Endpoint:** `POST /api/activities`  
**Auth Required:** ✅ Yes

**Request:**
```json
{
  "userId": "1",
  "userType": "producer",
  "activityType": "crop_created",
  "description": "Created new crop batch CB-VEG-TOM-ABC123",
  "metadata": {
    "cropBatchId": "CB-VEG-TOM-ABC123",
    "category": "Vegetables",
    "variety": "Tomato"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Activity logged successfully",
  "data": {
    "activityId": "ACT-123456",
    "timestamp": "2025-04-15T10:30:00Z"
  }
}
```

### Get User Activities

**Endpoint:** `GET /api/activities/user/:userId`  
**Auth Required:** ✅ Yes  
**Query Parameters:**
- `activityType` (optional)
- `startDate` (optional): ISO 8601 format
- `endDate` (optional): ISO 8601 format
- `limit` (default: 50)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "activityId": "ACT-123456",
      "activityType": "crop_created",
      "description": "Created new crop batch CB-VEG-TOM-ABC123",
      "metadata": {...},
      "timestamp": "2025-04-15T10:30:00Z"
    }
  ]
}
```

---

## ⚠️ Error Codes

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Server temporarily unavailable |

### Error Response Format

```json
{
  "success": false,
  "message": "Error message description",
  "error": "Detailed error information",
  "code": "ERROR_CODE",
  "timestamp": "2025-04-15T10:30:00Z"
}
```

### Common Validation Errors

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "quantity",
      "message": "Quantity must be greater than 0"
    }
  ]
}
```

---

## 🚦 Rate Limiting

### Default Limits

- **Public endpoints:** 100 requests per 15 minutes
- **Authenticated endpoints:** 200 requests per 15 minutes
- **Sensitive operations:** 10 requests per hour

### Rate Limit Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1729604400
```

### Rate Limit Exceeded Response

```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later.",
  "retryAfter": 900
}
```

---

## 📝 Request Examples

### cURL Examples

**Login:**
```bash
curl -X POST https://api.tradie.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"producer123","password":"securepassword"}'
```

**Create Crop Batch:**
```bash
curl -X POST https://api.tradie.app/api/provenance/crop-batch \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "producerId":"1",
    "category":"Vegetables",
    "variety":"Tomato",
    "farmLocation":{"state":"Karnataka","district":"Bangalore"},
    "initialData":{"plantingDate":"2025-01-15","estimatedHarvest":"2025-04-15","quantity":500,"unit":"kg"}
  }'
```

**Tokenize Crop Batch:**
```bash
curl -X POST https://api.tradie.app/api/provenance/tokenize/CB-VEG-TOM-ABC123 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tokenMetadata":{}}'
```

**Validate JWT Token (Public):**
```bash
curl https://api.tradie.app/api/provenance/validate/eyJhbGciOiJIUzI1NiIs...
```

### JavaScript Examples

**Using Fetch API:**

```javascript
// Login
const login = async (username, password) => {
  const response = await fetch('https://api.tradie.app/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('auth_token', data.token);
  }
  return data;
};

// Create Crop Batch
const createCropBatch = async (batchData) => {
  const token = localStorage.getItem('auth_token');
  const response = await fetch('https://api.tradie.app/api/provenance/crop-batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(batchData)
  });
  return await response.json();
};

// Validate JWT Token
const validateToken = async (jwtToken) => {
  const response = await fetch(`https://api.tradie.app/api/provenance/validate/${jwtToken}`);
  return await response.json();
};
```

---

## 🔗 Additional Resources

- **Postman Collection:** `/api/TRADIE_Provenance_Postman_Collection.json`
- **OpenAPI/Swagger:** Coming soon
- **Integration Guide:** `/PROVENANCE_JWT_INTEGRATION_COMPLETE.md`
- **Quick Reference:** `/PROVENANCE_JWT_QUICK_REFERENCE.md`
- **Deployment Guide:** `/DEPLOYMENT_PRODUCTION_READY.md`

---

**Version:** 2.0 | **Status:** ✅ PRODUCTION READY  
**Last Updated:** October 22, 2025
