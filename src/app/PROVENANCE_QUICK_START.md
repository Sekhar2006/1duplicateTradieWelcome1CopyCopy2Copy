# 🚀 Crop Batch Provenance & Tokenization - QUICK START

**Get up and running in 5 minutes!**

---

## ⚡ Quick Setup (3 Commands)

```bash
# 1. Install backend dependencies
cd api && npm install

# 2. Create database tables
mysql -u root -p tradie_db < ../database/schema_provenance.sql

# 3. Start backend server
npm run dev
```

**Done!** API running at `http://localhost:3001`

---

## 📝 Basic Workflow

### 1️⃣ Create Crop Batch → Get Unique ID

```bash
curl -X POST http://localhost:3001/api/provenance/crop-batch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "producerId": "1",
    "category": "Vegetables",
    "variety": "Tomato",
    "farmLocation": {"state": "Karnataka", "district": "Bangalore"},
    "initialData": {
      "plantingDate": "2025-01-15",
      "estimatedHarvest": "2025-04-15",
      "quantity": 500,
      "unit": "kg"
    }
  }'
```

**Response:** Crop Batch ID = `CB-VEG-TOM-L5X7M2ABC`

---

### 2️⃣ Add Quality Check History

```bash
curl -X POST http://localhost:3001/api/provenance/crop-batch/CB-VEG-TOM-L5X7M2ABC/history \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "stage": "grading",
    "eventType": "quality_graded",
    "description": "Graded as Premium A quality",
    "data": {
      "grade": "A",
      "size": "Large",
      "color": "Deep Red",
      "moisture": "12%"
    },
    "createdBy": "1"
  }'
```

---

### 3️⃣ Tokenize → Generate NFT + QR Code

```bash
curl -X POST http://localhost:3001/api/provenance/tokenize/CB-VEG-TOM-L5X7M2ABC \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "tokenMetadata": {
      "certifications": [
        {"type": "Organic Certificate", "issuer": "IOCA"}
      ],
      "packingDetails": {
        "numberOfBags": 10,
        "packingDate": "2025-04-15"
      }
    }
  }'
```

**Response:**
- Token ID: `NFT-TRD-L5X7M2ABC123`
- QR Code Data URL: `data:image/png;base64,iVBORw0KGgo...`
- Verification URL: `https://tradie.app/verify/NFT-TRD-L5X7M2ABC123`

---

### 4️⃣ Scan QR Code → Get Full History (PUBLIC - No Auth!)

```bash
curl http://localhost:3001/api/provenance/token/NFT-TRD-L5X7M2ABC123
```

**Response:** Complete crop history from planting to tokenization!

---

## 🎨 Frontend Integration (React/TypeScript)

### Import API Service

```typescript
import ProvenanceAPI from './components/producer-dashboard/ProvenanceAPI';
```

### 1. Create Crop Batch

```typescript
const result = await ProvenanceAPI.createCropBatch({
  producerId: '1',
  category: 'Vegetables',
  variety: 'Tomato',
  farmLocation: { state: 'Karnataka', district: 'Bangalore' },
  initialData: {
    plantingDate: '2025-01-15',
    estimatedHarvest: '2025-04-15',
    quantity: 500,
    unit: 'kg'
  }
});

const cropBatchId = result.data.cropBatchId;
```

### 2. Add History

```typescript
await ProvenanceAPI.addCropBatchHistory(cropBatchId, {
  stage: 'harvesting',
  eventType: 'harvest_completed',
  description: 'Harvested 450kg',
  data: { actualQuantity: 450 },
  createdBy: '1'
});
```

### 3. Tokenize

```typescript
const token = await ProvenanceAPI.tokenizeCropBatch(cropBatchId, {
  certifications: [{ type: 'Organic', issuer: 'IOCA' }]
});

console.log('QR Code:', token.data.qrCodeDataUrl);
```

### 4. Scan QR (No Auth Required!)

```typescript
const data = await ProvenanceAPI.getTokenData('NFT-TRD-L5X7M2ABC123');

console.log('Producer:', data.data.producer.name);
console.log('Timeline:', data.data.timeline);
```

---

## 🗄️ Database Tables Quick Reference

| Table | Purpose |
|-------|---------|
| `crop_batches` | Main crop batch records |
| `crop_batch_history` | Multi-stage event tracking |
| `crop_batch_tokens` | NFT tokens & QR codes |
| `token_verifications` | QR scan tracking |
| `provenance_documents` | Certificates & documents |

---

## 📊 API Endpoints Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/provenance/crop-batch` | ✅ | Create batch |
| POST | `/provenance/crop-batch/:id/history` | ✅ | Add history |
| GET | `/provenance/crop-batch/:id` | ❌ | Get batch details |
| GET | `/provenance/crop-batch/producer/:id` | ✅ | List producer batches |
| POST | `/provenance/tokenize/:cropBatchId` | ✅ | Generate NFT + QR |
| GET | `/provenance/token/:tokenId` | ❌ | **QR Scan endpoint** |
| PUT | `/provenance/token/:tokenId/verify` | ❌ | Record scan |
| GET | `/provenance/token/:tokenId/verifications` | ❌ | Scan history |
| GET | `/provenance/stats/:producerId` | ✅ | Statistics |

---

## 🔑 Unique ID Formats

### Crop Batch ID
**Format:** `CB-[CAT]-[VAR]-[TIME][RAND]`  
**Example:** `CB-VEG-TOM-L5X7M2ABC`

### NFT Token ID
**Format:** `NFT-TRD-[TIME][RAND]`  
**Example:** `NFT-TRD-L5X7M2ABC123`

---

## 🌊 Complete Workflow Example

```typescript
// 1. Producer creates crop batch
const batch = await ProvenanceAPI.createCropBatch({...});
const cropBatchId = batch.data.cropBatchId; // CB-VEG-TOM-L5X7M2ABC

// 2. Add planting stage
await ProvenanceAPI.addCropBatchHistory(cropBatchId, {
  stage: 'planting',
  eventType: 'seeds_planted',
  description: 'Planted 500 tomato seeds',
  data: { seeds: 500 },
  createdBy: '1'
});

// 3. Add growing stage
await ProvenanceAPI.addCropBatchHistory(cropBatchId, {
  stage: 'growing',
  eventType: 'fertilizer_applied',
  description: 'Applied organic fertilizer',
  data: { fertilizer: 'Compost', quantity: '50kg' },
  createdBy: '1'
});

// 4. Add harvesting stage
await ProvenanceAPI.addCropBatchHistory(cropBatchId, {
  stage: 'harvesting',
  eventType: 'harvest_completed',
  description: 'Harvested 450kg',
  data: { actualQuantity: 450, harvestDate: '2025-04-10' },
  createdBy: '1'
});

// 5. Add grading stage
await ProvenanceAPI.addCropBatchHistory(cropBatchId, {
  stage: 'grading',
  eventType: 'quality_graded',
  description: 'Graded as Premium A',
  data: { grade: 'A', size: 'Large', color: 'Red' },
  createdBy: '1'
});

// 6. Tokenize with NFT + QR
const token = await ProvenanceAPI.tokenizeCropBatch(cropBatchId, {
  certifications: [
    { type: 'Organic Certificate', issuer: 'IOCA' }
  ],
  packingDetails: {
    numberOfBags: 10,
    packingDate: '2025-04-15',
    packingMethod: 'Vacuum sealed'
  }
});

const tokenId = token.data.tokenId; // NFT-TRD-L5X7M2ABC123
const qrCode = token.data.qrCodeDataUrl; // Base64 PNG

// 7. Display QR code
<img src={qrCode} alt="Crop QR Code" />

// 8. Someone scans QR → Fetch history (PUBLIC!)
const history = await ProvenanceAPI.getTokenData(tokenId);

console.log('Producer:', history.data.producer.name);
console.log('Category:', history.data.category);
console.log('Variety:', history.data.variety);
console.log('Quality Grade:', history.data.qualityGrade);
console.log('Timeline Events:', history.data.timeline.length);
console.log('Days from Planting to Harvest:', history.data.stats.daysFromPlantingToHarvest);

// 9. Record the scan
await ProvenanceAPI.verifyToken(tokenId, {
  verifiedBy: 'buyer_456',
  verificationType: 'qr_scan',
  location: { address: 'Bangalore Market' }
});
```

---

## 🎯 Key Features

✅ **Automatic Unique ID Generation**  
✅ **Multi-Stage Lifecycle Tracking**  
✅ **NFT Tokenization**  
✅ **QR Code Generation (Base64 PNG)**  
✅ **Public Verification (No Auth)**  
✅ **Complete History Timeline**  
✅ **Producer Information**  
✅ **Quality Grading Records**  
✅ **Certificate Tracking**  
✅ **Scan Statistics**  

---

## 🆘 Troubleshooting

### Server won't start
```bash
# Check if MySQL is running
mysql -u root -p -e "SELECT 1"

# Check if tables exist
mysql -u root -p tradie_db -e "SHOW TABLES LIKE 'crop_%'"

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "Token not found" error
```bash
# Verify token exists in database
mysql -u root -p tradie_db -e "SELECT * FROM crop_batch_tokens WHERE token_id='YOUR_TOKEN_ID'"
```

### QR code not generating
```bash
# Check qrcode package is installed
npm list qrcode

# Reinstall if needed
npm install qrcode@1.5.3
```

---

## 📚 Full Documentation

For complete API reference, database schema details, and advanced usage, see:
- **[PROVENANCE_TOKENIZATION_API_COMPLETE.md](./PROVENANCE_TOKENIZATION_API_COMPLETE.md)**

---

## ✅ Ready to Use!

Your Crop Batch Provenance & NFT Tokenization system is **production-ready** and fully integrated with your existing TRADIE infrastructure!

**Files Created:**
- ✅ `/api/routes/provenance.js` - Backend API
- ✅ `/components/producer-dashboard/ProvenanceAPI.ts` - Frontend service
- ✅ `/database/schema_provenance.sql` - Database schema
- ✅ `/api/package.json` - Updated with dependencies

**Start building amazing provenance tracking features! 🚀**
