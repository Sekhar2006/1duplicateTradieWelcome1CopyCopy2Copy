# Simple Quality Check API Server - Quick Guide

## 🎯 Overview
Simplified, standalone Quality Check API server for **quick testing** and **frontend development**. Uses in-memory storage (no database required).

---

## 🚀 Quick Start

### 1. Start the Server
```bash
# Option 1: Using shell script
cd api
chmod +x start-simple-server.sh
./start-simple-server.sh

# Option 2: Direct node command
cd api
npm install
node simple-quality-server.js
```

Server starts on: **http://localhost:3000**

---

## 📡 API Endpoints

### 1. **Submit Quality Check** (Main Endpoint)
```bash
POST http://localhost:3000/api/quality-check
Content-Type: application/json

{
  "producerId": "PROD1234",
  "commodity": "Spices",
  "grading": {
    "aroma": "Excellent/Strong",
    "color": "Rich Color",
    "moisture": "Below 10%",
    "grade": "Export Quality"
  },
  "harvestMethod": ["labor"],
  "processingDone": true,
  "qualityCheckTiers": {
    "selfAssessment": {
      "completed": true,
      "comments": "All quality checks passed"
    },
    "externalAssessment": {
      "type": "Lab Report",
      "rating": 4.8,
      "comments": "High quality confirmed"
    }
  },
  "packingDetails": {
    "numberOfBags": 50,
    "variety": "Guntur Sannam Chili",
    "harvestDate": "2025-10-15",
    "packingDate": "2025-10-20"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "qualityCheckId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "tokenId": "TRD-SPI-789456",
    "qrCodeUrl": "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=...",
    "commodity": "Spices",
    "grade": "Export Quality",
    "status": "active",
    "message": "Quality check submitted successfully"
  }
}
```

---

### 2. **Get Quality Check by Token**
```bash
GET http://localhost:3000/api/quality-check/TRD-SPI-789456
```

**Response:**
```json
{
  "success": true,
  "data": {
    "qualityCheckId": "...",
    "tokenId": "TRD-SPI-789456",
    "producerId": "PROD1234",
    "commodity": "Spices",
    "grading": { ... },
    "qrCodeUrl": "...",
    "status": "active",
    "createdAt": "2025-10-22T10:30:00.000Z"
  }
}
```

---

### 3. **Get All Quality Checks for Producer**
```bash
GET http://localhost:3000/api/quality-check/producer/PROD1234
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "qualityCheckId": "...",
      "tokenId": "TRD-SPI-789456",
      "commodity": "Spices",
      "grade": "Export Quality",
      "createdAt": "2025-10-22T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

---

### 4. **Verify Token (QR Scan)**
```bash
POST http://localhost:3000/api/quality-check/TRD-SPI-789456/verify
Content-Type: application/json

{}
```

**Response:**
```json
{
  "success": true,
  "verified": true,
  "data": {
    "tokenId": "TRD-SPI-789456",
    "commodity": "Spices",
    "producerId": "PROD1234",
    "grade": "Export Quality",
    "quality": { ... },
    "packingDetails": { ... },
    "createdAt": "2025-10-22T10:30:00.000Z",
    "status": "active"
  }
}
```

---

### 5. **Get Statistics**
```bash
GET http://localhost:3000/api/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalQualityChecks": 15,
    "activeTokens": 15,
    "commodityBreakdown": {
      "Spices": 5,
      "Vegetables": 4,
      "Fruits": 3,
      "Grains": 3
    },
    "lastUpdated": "2025-10-22T10:30:00.000Z"
  }
}
```

---

### 6. **Health Check**
```bash
GET http://localhost:3000/health
```

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "message": "Simple Quality Check API is running",
  "timestamp": "2025-10-22T10:30:00.000Z",
  "totalRecords": 15
}
```

---

## 🧪 cURL Testing Examples

### Example 1: Submit Spices Quality Check
```bash
curl -X POST http://localhost:3000/api/quality-check \
  -H "Content-Type: application/json" \
  -d '{
    "producerId": "PROD1234",
    "commodity": "Spices",
    "grading": {
      "aroma": "Excellent/Strong",
      "color": "Rich Color",
      "grade": "Export Quality"
    },
    "harvestMethod": ["labor"],
    "processingDone": true,
    "qualityCheckTiers": {
      "selfAssessment": {
        "completed": true,
        "comments": "Quality is excellent"
      }
    },
    "packingDetails": {
      "numberOfBags": 50,
      "variety": "Chili",
      "harvestDate": "2025-10-15",
      "packingDate": "2025-10-20"
    }
  }'
```

### Example 2: Submit Vegetables Quality Check
```bash
curl -X POST http://localhost:3000/api/quality-check \
  -H "Content-Type: application/json" \
  -d '{
    "producerId": "PROD5678",
    "commodity": "Vegetables",
    "grading": {
      "size": "Large",
      "color": "Uniform Color",
      "firmness": "Firm",
      "grade": "Premium (A+)"
    },
    "harvestMethod": ["labor"],
    "processingDone": false,
    "qualityCheckTiers": {
      "selfAssessment": {
        "completed": true,
        "comments": "Fresh harvest, excellent quality"
      }
    },
    "packingDetails": {
      "numberOfBags": 30,
      "variety": "Tomatoes",
      "harvestDate": "2025-10-22",
      "packingDate": "2025-10-22"
    }
  }'
```

### Example 3: Get Token Details
```bash
curl http://localhost:3000/api/quality-check/TRD-SPI-789456
```

### Example 4: Verify Token
```bash
curl -X POST http://localhost:3000/api/quality-check/TRD-SPI-789456/verify
```

### Example 5: Get Producer's Quality Checks
```bash
curl http://localhost:3000/api/quality-check/producer/PROD1234
```

### Example 6: Get Statistics
```bash
curl http://localhost:3000/api/stats
```

---

## ⚡ Frontend Integration

### Using Fetch API
```javascript
// Submit quality check
async function submitQualityCheck(data) {
  const response = await fetch('http://localhost:3000/api/quality-check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  
  if (result.success) {
    console.log('Token ID:', result.data.tokenId);
    console.log('QR Code:', result.data.qrCodeUrl);
  }
  
  return result;
}

// Usage
const payload = {
  producerId: "PROD1234",
  commodity: "Spices",
  grading: {
    aroma: "Excellent/Strong",
    color: "Rich Color",
    grade: "Export Quality"
  },
  harvestMethod: ["labor"],
  processingDone: true,
  qualityCheckTiers: {
    selfAssessment: {
      completed: true,
      comments: "Quality is excellent"
    }
  },
  packingDetails: {
    numberOfBags: 50,
    variety: "Chili",
    harvestDate: "2025-10-15",
    packingDate: "2025-10-20"
  }
};

submitQualityCheck(payload);
```

### Using Axios
```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const submitQualityCheck = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/quality-check`, data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getTokenDetails = async (tokenId) => {
  try {
    const response = await axios.get(`${API_URL}/api/quality-check/${tokenId}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

---

## 🔄 React Component Integration

### Update SimplifiedQualityCheckForm.tsx
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = {
      producerId: "PROD1234",
      commodity: selectedCommodity,
      grading: formData.grading,
      harvestMethod: [
        ...(formData.harvestMethod.labor ? ['labor'] : []),
        ...(formData.harvestMethod.machine ? ['machine'] : [])
      ],
      processingDone: formData.processingDone,
      qualityCheckTiers: {
        selfAssessment: formData.selfAssessment,
        ...(formData.externalAssessment.type !== 'none' && {
          externalAssessment: formData.externalAssessment
        })
      },
      packingDetails: formData.packingDetails
    };

    // Use simple server endpoint
    const response = await fetch('http://localhost:3000/api/quality-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.success) {
      toast.success('Quality check submitted!', {
        description: `Token: ${result.data.tokenId}`
      });
      setSubmitted(true);
    } else {
      toast.error('Submission failed', {
        description: result.error
      });
    }
  } catch (error) {
    toast.error('Error submitting quality check');
  } finally {
    setLoading(false);
  }
};
```

---

## 📊 Sample Test Data

### Spices
```json
{
  "producerId": "PROD1234",
  "commodity": "Spices",
  "grading": {
    "aroma": "Excellent/Strong",
    "color": "Rich Color",
    "moisture": "Below 10%",
    "grade": "Export Quality"
  },
  "harvestMethod": ["labor"],
  "processingDone": true,
  "qualityCheckTiers": {
    "selfAssessment": {
      "completed": true,
      "comments": "Excellent aroma and color"
    }
  },
  "packingDetails": {
    "numberOfBags": 50,
    "variety": "Guntur Sannam Chili",
    "harvestDate": "2025-10-15",
    "packingDate": "2025-10-20"
  }
}
```

### Vegetables
```json
{
  "producerId": "PROD5678",
  "commodity": "Vegetables",
  "grading": {
    "size": "Large",
    "color": "Uniform Color",
    "firmness": "Firm",
    "texture": "Smooth",
    "grade": "Premium (A+)"
  },
  "harvestMethod": ["labor"],
  "processingDone": false,
  "qualityCheckTiers": {
    "selfAssessment": {
      "completed": true,
      "comments": "Fresh harvest"
    }
  },
  "packingDetails": {
    "numberOfBags": 30,
    "variety": "Organic Tomatoes",
    "harvestDate": "2025-10-22",
    "packingDate": "2025-10-22"
  }
}
```

### Fruits
```json
{
  "producerId": "PROD9012",
  "commodity": "Fruits",
  "grading": {
    "color": "Rich/Vibrant",
    "size": "Large",
    "firmness": "Firm",
    "grade": "Premium (A+)"
  },
  "harvestMethod": ["labor"],
  "processingDone": false,
  "qualityCheckTiers": {
    "selfAssessment": {
      "completed": true,
      "comments": "Perfect ripeness"
    },
    "externalAssessment": {
      "type": "Government Appointee",
      "rating": 4.7,
      "comments": "Meets export standards"
    }
  },
  "packingDetails": {
    "numberOfBags": 25,
    "variety": "Alphonso Mango",
    "harvestDate": "2025-10-20",
    "packingDate": "2025-10-21"
  }
}
```

---

## 🔍 Console Output

When server is running, you'll see detailed logs:
```
✅ Quality check created: f47ac10b-58cc-4372-a567-0e02b2c3d479
🎫 Token generated: TRD-SPI-789456
📊 Commodity: Spices
⭐ Grade: Export Quality
```

---

## 📝 Key Differences: Simple vs Full Server

### Simple Server (simple-quality-server.js)
- ✅ In-memory storage (no database)
- ✅ Quick start (no setup required)
- ✅ Perfect for frontend development
- ✅ Instant token generation
- ✅ 6 endpoints
- ⚠️ Data lost on restart
- ⚠️ No authentication
- ⚠️ Not for production

### Full Server (server.js + routes/quality-check.js)
- ✅ MySQL database
- ✅ Persistent storage
- ✅ JWT authentication
- ✅ Transaction support
- ✅ 7+ endpoints
- ✅ Production-ready
- ✅ Activity logging
- ✅ Certification tracking

---

## 🎯 When to Use Which?

### Use Simple Server When:
- ⚡ Quick frontend testing
- 🧪 API exploration
- 📱 Mobile app development
- 🎨 UI/UX prototyping
- 🚀 Demo presentations

### Use Full Server When:
- 🏭 Production deployment
- 💾 Data persistence needed
- 🔐 Authentication required
- 📊 Analytics/reporting needed
- 🔄 Multi-user environment

---

## 🚨 Important Notes

1. **In-Memory Storage**: All data is lost when server restarts
2. **No Authentication**: Anyone can submit quality checks
3. **Development Only**: Not suitable for production use
4. **CORS Enabled**: Allows requests from any origin
5. **Rate Limiting**: Not implemented (unlimited requests)

---

## 🔄 Migration Path

When ready for production:

1. **Switch to full server**:
   ```bash
   node api/server.js
   ```

2. **Update frontend API URL**:
   ```typescript
   // Development
   const API_URL = 'http://localhost:3000';
   
   // Production
   const API_URL = 'http://localhost:3001'; // Full server port
   ```

3. **Add authentication**:
   ```typescript
   headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
   }
   ```

---

## ✅ Success Checklist

- [ ] Server starts without errors
- [ ] Health check returns 200
- [ ] Can submit quality check
- [ ] Token ID is generated
- [ ] QR code URL is valid
- [ ] Can retrieve token details
- [ ] Can verify token
- [ ] Stats endpoint works

---

## 📚 Related Files

- `/api/simple-quality-server.js` - Simple server implementation
- `/api/server.js` - Full production server
- `/api/routes/quality-check.js` - Complete API routes
- `/components/producer-dashboard/SimplifiedQualityCheckForm.tsx` - React form
- `/QUALITY_CHECK_COMPLETE_SUMMARY.md` - Complete documentation

---

**Status:** ✅ Ready for Testing

**Last Updated:** October 22, 2025
