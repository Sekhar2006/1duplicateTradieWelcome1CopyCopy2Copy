# Simple Quality Check API Server - README

## ⚡ Quick Start (30 seconds)

```bash
# 1. Navigate to api directory
cd api

# 2. Install dependencies (first time only)
npm install

# 3. Start server
node simple-quality-server.js
```

**Server URL:** http://localhost:3000

---

## 🎯 What This Is

A **lightweight, standalone API server** for the TRADIE Quality Check system that:
- ✅ Runs without database setup
- ✅ Stores data in memory (temporary)
- ✅ Perfect for frontend development
- ✅ Great for demos and testing
- ✅ Generates real tokens and QR codes

---

## 🚀 Test It Now

```bash
# Submit a quality check
curl -X POST http://localhost:3000/api/quality-check \
  -H "Content-Type: application/json" \
  -d '{
    "producerId": "PROD1234",
    "commodity": "Spices",
    "grading": { "grade": "A" },
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

**Response:**
```json
{
  "success": true,
  "data": {
    "tokenId": "TRD-SPI-789456",
    "qrCodeUrl": "https://api.qrserver.com/v1/create-qr-code/...",
    "commodity": "Spices",
    "grade": "A"
  }
}
```

---

## 📡 Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/quality-check` | Submit quality check |
| GET | `/api/quality-check/:tokenId` | Get by token |
| GET | `/api/quality-check/producer/:producerId` | Get producer's checks |
| POST | `/api/quality-check/:tokenId/verify` | Verify token (QR scan) |
| GET | `/api/stats` | Get statistics |
| GET | `/health` | Health check |

---

## 💻 Frontend Integration

Update your React component:

```typescript
// SimplifiedQualityCheckForm.tsx
const API_URL = 'http://localhost:3000';

const response = await fetch(`${API_URL}/api/quality-check`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});
```

---

## 📝 Important Notes

### ⚠️ Limitations
- **Data is temporary** - Lost when server restarts
- **No authentication** - Anyone can access
- **Development only** - Not for production

### ✅ Perfect For
- Frontend development
- Quick testing
- Demo presentations
- API exploration
- Learning React integration

### 🏭 For Production
Use the full server instead:
```bash
# Switch to production server
node server.js
# Or
npm start
```

---

## 📚 Full Documentation

- **Complete Guide:** [SIMPLE_SERVER_GUIDE.md](./SIMPLE_SERVER_GUIDE.md)
- **vs Full Server:** [SERVER_COMPARISON.md](./SERVER_COMPARISON.md)
- **Final Delivery:** [/QUALITY_CHECK_FINAL_DELIVERY.md](../QUALITY_CHECK_FINAL_DELIVERY.md)

---

## 🎯 Next Steps

1. ✅ **Test the server** - Run it now!
2. 📱 **Connect frontend** - Update API URL
3. 🧪 **Try all endpoints** - Use Postman or cURL
4. 📖 **Read full docs** - See SIMPLE_SERVER_GUIDE.md
5. 🏭 **Move to production** - Set up full server when ready

---

**Status:** ✅ Ready to use immediately!

**Last Updated:** October 22, 2025
