# 🔐 JWT Provenance System - QUICK REFERENCE CARD

**Version:** 2.0 (JWT-Enhanced) | **Date:** October 22, 2025

---

## ⚡ Quick Setup (2 Minutes)

```bash
# 1. Add JWT secret to .env
echo "JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")" >> api/.env

# 2. Install jsonwebtoken (already in package.json)
cd api && npm install

# 3. Start server
npm run dev

# 4. Use React component
# Import: ProvenanceTrackerWithAuth.tsx
```

---

## 🎯 Two Methods Available

| Method | QR Contains | Endpoint | Security |
|--------|-------------|----------|----------|
| **JWT** | Signed Token | `/validate/:jwtToken` | 🔒 High |
| **Simple** | Token ID | `/token/:tokenId` | ⚡ Medium |

---

## 📦 Component Usage

```tsx
import ProvenanceTrackerWithAuth from './components/producer-dashboard/ProvenanceTrackerWithAuth';

function App() {
  return <ProvenanceTrackerWithAuth />;
}
```

**Features:**
- ✅ JWT login (localStorage)
- ✅ Create crop batch → Unique ID
- ✅ Add history (6 stages)
- ✅ Tokenize → JWT-signed QR
- ✅ Scan QR → Verify crop
- ✅ Timeline visualization

---

## 🔌 Key API Endpoints

### Create Crop Batch
```bash
POST /api/provenance/crop-batch
Headers: Authorization: Bearer {JWT}
Body: {producerId, category, variety, farmLocation, initialData}
Response: {cropBatchId: "CB-VEG-TOM-ABC123"}
```

### Tokenize (Generate JWT QR)
```bash
POST /api/provenance/tokenize/:cropBatchId
Headers: Authorization: Bearer {JWT}
Response: {tokenId, qrCodeDataUrl, ...}
```

### Validate JWT QR (PUBLIC)
```bash
GET /api/provenance/validate/:jwtToken
No Auth Required!
Response: {cropBatchId, history, producer, ...}
```

### Validate Simple Token (PUBLIC)
```bash
GET /api/provenance/token/:tokenId
No Auth Required!
Response: {tokenData, timeline, stats, ...}
```

---

## 🔑 JWT Token Structure

```json
{
  "tokenId": "NFT-TRD-ABC123",
  "cropBatchId": "CB-VEG-TOM-DEF456",
  "category": "Vegetables",
  "variety": "Tomato",
  "producerId": "1",
  "iat": 1729604400,
  "exp": 1732196400  // 30 days
}
```

---

## 🎨 Frontend Examples

### Login
```tsx
const handleLogin = async () => {
  // Component handles automatically
  // JWT stored in localStorage as 'tradie_auth_token'
};
```

### Create Crop Batch
```tsx
const result = await ProvenanceAPI.createCropBatch({
  producerId: '1',
  category: 'Vegetables',
  variety: 'Tomato',
  farmLocation: {state: 'Karnataka', district: 'Bangalore'},
  initialData: {plantingDate: '2025-01-15', estimatedHarvest: '2025-04-15', quantity: 500, unit: 'kg'}
});
// Returns: {cropBatchId: "CB-VEG-TOM-L5X7M2ABC"}
```

### Add History
```tsx
await ProvenanceAPI.addCropBatchHistory(cropBatchId, {
  stage: 'harvesting',
  eventType: 'harvest_completed',
  description: 'Harvested 450kg',
  data: {actualQuantity: 450},
  createdBy: '1'
});
```

### Tokenize
```tsx
const token = await ProvenanceAPI.tokenizeCropBatch(cropBatchId, {
  certifications: [{type: 'Organic', issuer: 'IOCA'}]
});
// Returns: {tokenId, qrCodeDataUrl}
```

### Scan QR
```tsx
const handleQRScan = async (scannedData) => {
  // Extract JWT or token ID
  if (scannedData.includes('/validate/')) {
    const jwt = scannedData.split('/validate/')[1];
    const res = await fetch(`/api/provenance/validate/${jwt}`);
    const data = await res.json();
    // Show crop history
  } else {
    const tokenId = scannedData.split('/').pop();
    const data = await ProvenanceAPI.getTokenData(tokenId);
    // Show crop history
  }
};
```

---

## 🔒 Security Checklist

- [ ] Generate strong JWT_SECRET (64+ chars)
- [ ] Use HTTPS in production
- [ ] Never commit JWT_SECRET to git
- [ ] Rotate JWT_SECRET periodically
- [ ] Set appropriate expiration (30 days default)
- [ ] Validate JWT signature on every request
- [ ] Handle expired tokens gracefully

---

## 🧪 Testing Commands

```bash
# 1. Login
TOKEN=$(curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}' | jq -r '.token')

# 2. Create crop batch
BATCH=$(curl -X POST http://localhost:3001/api/provenance/crop-batch \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"producerId":"1","category":"Vegetables","variety":"Tomato",...}' \
  | jq -r '.data.cropBatchId')

# 3. Tokenize
JWT_QR=$(curl -X POST http://localhost:3001/api/provenance/tokenize/$BATCH \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tokenMetadata":{}}' | jq -r '.data.qrCodeUrl')

# 4. Extract JWT from URL
JWT_TOKEN=$(echo $JWT_QR | sed 's/.*validate\///')

# 5. Validate JWT (PUBLIC - no auth!)
curl http://localhost:3001/api/provenance/validate/$JWT_TOKEN
```

---

## 🐛 Common Issues

### "Invalid or expired token"
```bash
# Check expiration
node -e "console.log(new Date(require('jsonwebtoken').decode('YOUR_JWT').exp * 1000))"

# Regenerate if expired
curl -X POST .../tokenize/{cropBatchId}
```

### "jwt malformed"
- Ensure complete JWT scan
- Check QR quality
- JWT must start with `eyJ`

### QR too large
```javascript
// Reduce error correction in provenance.js
errorCorrectionLevel: 'L' // instead of 'H'
```

---

## 📊 JWT vs Simple Comparison

| Feature | JWT QR | Simple QR |
|---------|--------|-----------|
| Security | ✅ High | ⚠️ Medium |
| QR Size | Larger | Smaller |
| Expiration | 30 days | None |
| Offline | Partial | No |
| Revocation | Blacklist | DB status |

**Recommendation:** Use **JWT for exports**, **Simple for internal tracking**

---

## 🎯 Stage Flow

```
planting → growing → harvesting → grading → processing → packing → tokenization
```

Each stage can have history entries with custom data.

---

## 📁 File Locations

```
/components/producer-dashboard/
  ProvenanceTrackerWithAuth.tsx  (NEW - JWT login + QR scan)
  ProvenanceAPI.ts              (API service)
  
/api/routes/
  provenance.js                 (UPDATED - JWT validation)
  
/api/
  .env                          (Add JWT_SECRET here)
```

---

## 🚀 Deployment Checklist

- [ ] Set production JWT_SECRET
- [ ] Update APP_URL in .env
- [ ] Enable HTTPS
- [ ] Test JWT validation endpoint
- [ ] Test token expiration
- [ ] Monitor QR scan rate
- [ ] Set up error logging

---

## 📚 Full Documentation

- **Complete Guide:** `PROVENANCE_JWT_INTEGRATION_COMPLETE.md`
- **Original Docs:** `PROVENANCE_TOKENIZATION_API_COMPLETE.md`
- **Quick Start:** `PROVENANCE_QUICK_START.md`
- **Integration Examples:** `PROVENANCE_INTEGRATION_EXAMPLE.md`

---

## ✅ Summary

**What You Have:**
- ✅ JWT-signed QR codes (tamper-proof)
- ✅ Simple token QR codes (backward compatible)
- ✅ Complete React component with auth
- ✅ MySQL backend with 10 endpoints
- ✅ Public validation (no auth required)
- ✅ 30-day token expiration
- ✅ Full timeline visualization

**Ready to use!** 🎉

---

**Version:** 2.0 | **Status:** ✅ PRODUCTION READY
