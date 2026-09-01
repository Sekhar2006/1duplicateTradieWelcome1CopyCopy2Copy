# Quality Check API - Quick Start Guide

## 🚀 5-Minute Setup

Get the Quality Verification API up and running in 5 minutes!

---

## Step 1: Start Backend Server (2 minutes)

```bash
# Navigate to API directory
cd api

# Install dependencies (first time only)
npm install

# Create .env file
cat > .env << EOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tradie_db
PORT=3001
JWT_SECRET=your_secret_key_here
EOF

# Start server
npm run dev
```

**Expected output:**
```
╔════════════════════════════════════════╗
║  TRADIE Producer API Server            ║
║  Status: ✅ Running                    ║
║  Port: 3001                            ║
╚════════════════════════════════════════╝

Quality Check & Tokenization:
- POST   /api/quality-check
- GET    /api/quality-check/token/:tokenId
✅ Server ready!
```

---

## Step 2: Test with Postman (1 minute)

### Import Collection
1. Open Postman
2. Click **Import**
3. Select `/api/TRADIE_QualityCheck_Postman_Collection.json`
4. Collection imported! ✅

### Run First Test
1. Open **Authentication** → **Login**
2. Click **Send**
3. Token automatically saved
4. Open **Quality Check - Submit** → **Submit Spices Quality Check**
5. Click **Send**
6. Success! You'll get back a `tokenId` and `qrCodeUrl`

---

## Step 3: Frontend Integration (2 minutes)

### In your React component:

```typescript
import { submitQualityCheck } from './components/producer-dashboard/QualityCheckAPI';

// Submit quality check
const handleSubmit = async () => {
  try {
    const response = await submitQualityCheck({
      producerId: 'PROD1234',
      commodity: 'Spices',
      grading: {
        aroma: 'Strong',
        color: 'Rich Red',
        grade: 'A'
      },
      harvestMethod: ['labor'],
      processingDone: true,
      qualityCheckTiers: {
        selfAssessment: true
      },
      packingDetails: {
        numberOfBags: 25,
        variety: 'Cinnamon',
        harvestDate: '2025-10-15',
        packingDate: '2025-10-20'
      }
    });

    console.log('Token ID:', response.data.tokenId);
    console.log('QR Code:', response.data.qrCodeUrl);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

**Done!** Your quality check is submitted and token generated.

---

## Common Tasks

### Task 1: Scan QR Code
```typescript
import { getQualityCheckByToken } from './components/producer-dashboard/QualityCheckAPI';

const handleScan = async (tokenId: string) => {
  const response = await getQualityCheckByToken(tokenId);
  console.log(response.data); // All quality check details
};
```

### Task 2: Get Producer History
```typescript
import { getProducerQualityChecks } from './components/producer-dashboard/QualityCheckAPI';

const loadHistory = async () => {
  const response = await getProducerQualityChecks('PROD1234', {
    limit: 10,
    offset: 0
  });
  console.log(response.data); // Array of quality checks
};
```

### Task 3: Add Feedback
```typescript
import { addQualityCheckFeedback } from './components/producer-dashboard/QualityCheckAPI';

const addFeedback = async () => {
  await addQualityCheckFeedback(123, {
    stage: 'Market Yard',
    rating: 4.2,
    comment: 'Good quality',
    source: 'Market Inspector'
  });
};
```

---

## API Endpoints Cheat Sheet

| What do you want to do? | Endpoint | Method |
|--------------------------|----------|--------|
| Submit quality check | `/api/quality-check` | POST |
| Scan QR code | `/api/quality-check/token/:tokenId` | GET |
| View quality check | `/api/quality-check/:id` | GET |
| List producer checks | `/api/quality-check/producer/:id` | GET |
| Add feedback | `/api/quality-check/:id/feedback` | POST |
| Update quality check | `/api/quality-check/:id` | PUT |

---

## Sample Request/Response

### Submit Quality Check
**Request:**
```json
POST /api/quality-check
{
  "producerId": "PROD1234",
  "commodity": "Spices",
  "grading": {
    "aroma": "Strong",
    "grade": "A"
  },
  "harvestMethod": ["labor"],
  "processingDone": true,
  "qualityCheckTiers": {
    "selfAssessment": true
  },
  "packingDetails": {
    "numberOfBags": 25,
    "variety": "Cinnamon",
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
    "qualityCheckId": 123,
    "tokenId": "TRD-SPI-456789",
    "qrCodeUrl": "https://api.qrserver.com/v1/...",
    "commodity": "Spices",
    "grade": "A"
  }
}
```

### Scan QR Code
**Request:**
```
GET /api/quality-check/token/TRD-SPI-456789
```

**Response:** Full token details with producer info, grading, certifications, feedback

---

## Environment Variables

Create `/api/.env`:
```env
# Required
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tradie_db

# Optional (defaults shown)
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=7d
```

---

## Troubleshooting

### Error: "Cannot connect to database"
```bash
# Check MySQL is running
mysql -u root -p

# Create database
CREATE DATABASE tradie_db;

# Run schema
mysql -u root -p tradie_db < database/schema_mysql.sql
```

### Error: "Invalid token"
```bash
# Login first to get token
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Error: "Route not found"
```bash
# Make sure server is running on correct port
curl http://localhost:3001/health
# Should return: {"status":"ok"}
```

---

## Testing with cURL

### Submit Quality Check
```bash
curl -X POST http://localhost:3001/api/quality-check \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "producerId": "PROD1234",
    "commodity": "Spices",
    "grading": {"aroma": "Strong", "grade": "A"},
    "harvestMethod": ["labor"],
    "processingDone": true,
    "qualityCheckTiers": {"selfAssessment": true},
    "packingDetails": {
      "numberOfBags": 25,
      "variety": "Cinnamon",
      "harvestDate": "2025-10-15",
      "packingDate": "2025-10-20"
    }
  }'
```

### Scan Token (No auth required)
```bash
curl http://localhost:3001/api/quality-check/token/TRD-SPI-456789
```

---

## Next Steps

1. ✅ **Read Full Documentation:** [QUALITY_CHECK_API_INTEGRATION_COMPLETE.md](./QUALITY_CHECK_API_INTEGRATION_COMPLETE.md)
2. ✅ **Explore Postman Collection:** Test all endpoints
3. ✅ **Integrate Frontend:** Use QualityCheckAPI.ts in React components
4. ✅ **Add Authentication:** Implement login flow
5. ✅ **Test QR Scanning:** Use mobile app or web scanner

---

## Quick Links

- 📄 [Full API Documentation](./QUALITY_CHECK_API_INTEGRATION_COMPLETE.md)
- 📋 [Postman Collection](./api/TRADIE_QualityCheck_Postman_Collection.json)
- 🗄️ [Database Schema](./DATABASE_SCHEMA_COMPLETE.md)
- 🎨 [UI Components](./QUALITY_VERIFICATION_UI_SPEC_COMPLETE.md)
- ⚙️ [Configuration Guide](./QUALITY_VERIFICATION_DYNAMIC_CONFIG_COMPLETE.md)

---

## Support

**Issues?** Check:
1. Server logs in terminal
2. Database connection
3. Environment variables
4. Port 3001 not in use

**Still stuck?** See [QUALITY_CHECK_API_INTEGRATION_COMPLETE.md](./QUALITY_CHECK_API_INTEGRATION_COMPLETE.md) for detailed troubleshooting.

---

**🎉 You're ready to go! Start submitting quality checks and scanning QR codes!**
