# 🔐 JWT-Enhanced Provenance System - COMPLETE INTEGRATION

**Status:** ✅ **PRODUCTION READY**  
**Version:** 2.0 (JWT-Enhanced)  
**Date:** October 22, 2025

---

## 🎯 What's New

Your provenance system now supports **TWO authentication methods**, giving you flexibility and enhanced security:

### Method 1: JWT-Signed QR Codes (NEW - Like MongoDB Example) 🔐
- QR code contains **signed JWT token**
- Token includes crop batch data and expires in 30 days
- Enhanced security - tamper-proof verification
- No database lookup needed for initial validation
- Perfect for offline verification

### Method 2: Simple Token ID QR Codes (Original) ⚡
- QR code contains **simple token ID**
- Requires database lookup
- Faster QR code generation
- Lower QR code size
- Perfect for online verification

---

## 🏗️ Architecture Overview

```
User Scans QR Code
       ↓
   QR Contains?
       ↓
┌──────────────────────────────────┐
│  JWT Token                       │  OR   │  Simple Token ID           │
│  (Signed, Tamper-Proof)          │       │  (NFT-TRD-ABC123)          │
├──────────────────────────────────┤       ├────────────────────────────┤
│  Endpoint:                       │       │  Endpoint:                 │
│  GET /api/provenance/validate/   │       │  GET /api/provenance/token/│
│      {JWT_TOKEN}                 │       │      {TOKEN_ID}            │
├──────────────────────────────────┤       ├────────────────────────────┤
│  1. Verify JWT signature         │       │  1. Query database         │
│  2. Check expiration (30 days)   │       │  2. Fetch token record     │
│  3. Decode crop batch info       │       │  3. Join with crop batch   │
│  4. Query DB for full history    │       │  4. Return full history    │
└──────────────────────────────────┘       └────────────────────────────┘
               ↓                                      ↓
        Return Complete Crop History
```

---

## 📦 New Files Created

### 1. ProvenanceTrackerWithAuth.tsx (550+ lines)
**Location:** `/components/producer-dashboard/ProvenanceTrackerWithAuth.tsx`

Complete React component with:
- ✅ JWT login flow (stores token in localStorage)
- ✅ Crop batch creation with unique ID
- ✅ Multi-stage history tracking
- ✅ NFT tokenization with JWT-signed QR
- ✅ QR scanner for verification
- ✅ Beautiful timeline visualization
- ✅ Producer dashboard

### 2. Enhanced Backend Routes (Updated)
**Location:** `/api/routes/provenance.js`

New endpoints added:
- ✅ `GET /api/provenance/validate/:jwtToken` - JWT validation endpoint
- ✅ Enhanced tokenization with JWT signing
- ✅ All existing endpoints maintained

---

## 🔑 JWT Token Structure

### JWT Payload (Embedded in QR Code)

```json
{
  "tokenId": "NFT-TRD-L5X7M2ABC123",
  "cropBatchId": "CB-VEG-TOM-L5X7M2DEF",
  "category": "Vegetables",
  "variety": "Tomato",
  "producerId": "1",
  "iat": 1729604400,
  "exp": 1732196400
}
```

### QR Code Content

**JWT Method:**
```
https://tradie.app/api/provenance/validate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiTkZULVRSRC1MNVY3TTJBQkMxMjMiLCJjcm9wQmF0Y2hJZCI6IkNCLVZFRy1UT00tTDVYN00yREVGIiwiY2F0ZWdvcnkiOiJWZWdldGFibGVzIiwidmFyaWV0eSI6IlRvbWF0byIsInByb2R1Y2VySWQiOiIxIiwiaWF0IjoxNzI5NjA0NDAwLCJleHAiOjE3MzIxOTY0MDB9.signature_here
```

**Simple Method:**
```
https://tradie.app/verify/NFT-TRD-L5X7M2ABC123
```

---

## 🚀 Quick Start Guide

### Step 1: Install Dependencies

```bash
cd api
npm install jsonwebtoken
```

### Step 2: Configure JWT Secret

Add to `/api/.env`:

```env
# JWT Secret for Provenance Tokens
JWT_SECRET=your_super_secure_secret_key_change_this_in_production_2025

# App URL for QR codes
APP_URL=https://tradie.app
```

⚠️ **IMPORTANT:** Use a strong, random secret in production!

```bash
# Generate secure secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 3: Start Backend

```bash
cd api
npm run dev
```

### Step 4: Use React Component

```tsx
import ProvenanceTrackerWithAuth from './components/producer-dashboard/ProvenanceTrackerWithAuth';

function App() {
  return <ProvenanceTrackerWithAuth />;
}
```

---

## 💻 Complete Usage Examples

### Frontend: Login & Create Crop Batch

```tsx
// Component automatically handles login
// User enters credentials, JWT stored in localStorage

const handleCreateBatch = async () => {
  const result = await ProvenanceAPI.createCropBatch({
    producerId: localStorage.getItem('producer_id'),
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
  
  console.log('Crop Batch ID:', result.data.cropBatchId);
  // Output: CB-VEG-TOM-L5X7M2ABC
};
```

### Frontend: Tokenize with JWT-Signed QR

```tsx
const handleTokenize = async () => {
  const result = await ProvenanceAPI.tokenizeCropBatch(cropBatchId, {
    certifications: [
      { type: 'Organic', issuer: 'IOCA' }
    ]
  });
  
  // QR code now contains signed JWT!
  console.log('Token ID:', result.data.tokenId);
  console.log('QR Data URL:', result.data.qrCodeDataUrl);
  
  // QR contains: https://tradie.app/api/provenance/validate/{JWT}
};
```

### Frontend: Scan QR Code (JWT or Simple)

```tsx
const handleQRScan = async (scannedData: string) => {
  // Scanned data could be:
  // 1. JWT URL: https://tradie.app/api/provenance/validate/{JWT}
  // 2. Simple URL: https://tradie.app/verify/NFT-TRD-ABC123
  // 3. Just token ID: NFT-TRD-ABC123

  // Extract token from URL or use directly
  let endpoint = scannedData;
  
  if (scannedData.includes('/validate/')) {
    // JWT method - call validate endpoint
    const jwt = scannedData.split('/validate/')[1];
    const response = await fetch(`${API_BASE}/api/provenance/validate/${jwt}`);
    const data = await response.json();
    
    if (data.success) {
      displayCropHistory(data.data);
    }
  } else {
    // Simple method - extract token ID
    const tokenId = scannedData.split('/').pop() || scannedData;
    const result = await ProvenanceAPI.getTokenData(tokenId);
    
    if (result.success) {
      displayCropHistory(result.data);
    }
  }
};
```

---

## 🔌 Backend API Endpoints

### NEW: JWT Validation Endpoint

**Endpoint:** `GET /api/provenance/validate/:jwtToken`  
**Auth:** ❌ Not Required (Public)  

**Example Request:**
```bash
curl https://tradie.app/api/provenance/validate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "cropBatchId": "CB-VEG-TOM-L5X7M2ABC",
    "category": "Vegetables",
    "variety": "Tomato",
    "tokenId": "NFT-TRD-L5X7M2ABC123",
    "tokenCreatedAt": "2025-04-15T12:00:00Z",
    "producer": {
      "name": "Ramesh Kumar",
      "contact": "+91-9876543210",
      "location": { "state": "Karnataka", "district": "Bangalore" }
    },
    "history": [
      {
        "timestamp": "2025-01-15T06:00:00Z",
        "stage": "planting",
        "description": "Crop batch created",
        "data": {...}
      },
      ...
    ]
  }
}
```

**Error Responses:**

```json
// Expired token
{
  "success": false,
  "message": "Invalid or expired token",
  "error": "jwt expired"
}

// Invalid signature
{
  "success": false,
  "message": "Invalid or expired token",
  "error": "invalid signature"
}

// Token not found in database
{
  "success": false,
  "message": "Crop batch or token not found"
}
```

### UPDATED: Tokenization Endpoint

**Endpoint:** `POST /api/provenance/tokenize/:cropBatchId`  
**Auth:** ✅ Required  

**What Changed:**
- Now generates **signed JWT token**
- QR code contains JWT validation URL
- JWT expires in 30 days
- Enhanced security with signature verification

**Request:**
```bash
curl -X POST https://tradie.app/api/provenance/tokenize/CB-VEG-TOM-ABC \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tokenMetadata": {
      "certifications": [{"type": "Organic", "issuer": "IOCA"}]
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Crop batch tokenized successfully",
  "data": {
    "tokenId": "NFT-TRD-L5X7M2ABC123",
    "cropBatchId": "CB-VEG-TOM-L5X7M2ABC",
    "qrCodeUrl": "https://tradie.app/api/provenance/validate/{SIGNED_JWT}",
    "qrCodeDataUrl": "data:image/png;base64,iVBORw0KG...",
    "category": "Vegetables",
    "variety": "Tomato",
    "qualityGrade": "A",
    "status": "active",
    "createdAt": "2025-04-15T12:00:00Z"
  }
}
```

---

## 🔒 Security Considerations

### JWT Token Security

✅ **DO:**
- Use strong, random JWT_SECRET (64+ characters)
- Rotate JWT_SECRET periodically
- Set reasonable expiration (30 days default)
- Verify signature on every request
- Use HTTPS in production

❌ **DON'T:**
- Use default or weak secrets
- Store sensitive data in JWT payload
- Share JWT_SECRET publicly
- Ignore expiration errors

### Environment Variables

```env
# Development
JWT_SECRET=dev_secret_only_for_testing

# Production
JWT_SECRET=a8f7d9e6c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7
```

---

## 🧪 Testing Guide

### Test 1: Create Crop Batch

```bash
# Login first
TOKEN=$(curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}' \
  | jq -r '.token')

# Create crop batch
curl -X POST http://localhost:3001/api/provenance/crop-batch \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "producerId": "1",
    "category": "Vegetables",
    "variety": "Tomato",
    "farmLocation": {"state":"Karnataka","district":"Bangalore"},
    "initialData": {"plantingDate":"2025-01-15","estimatedHarvest":"2025-04-15","quantity":500,"unit":"kg"}
  }'
```

### Test 2: Tokenize & Get JWT QR

```bash
BATCH_ID="CB-VEG-TOM-ABC123"

curl -X POST http://localhost:3001/api/provenance/tokenize/$BATCH_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tokenMetadata":{}}'
```

**Save the JWT from qrCodeUrl!**

### Test 3: Validate JWT (Public - No Auth!)

```bash
JWT_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl http://localhost:3001/api/provenance/validate/$JWT_TOKEN
```

### Test 4: Test Expired Token

```bash
# Create a token with 1 second expiry (for testing)
# Modify tokenization code temporarily:
# const signedJWT = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '1s' });

# Wait 2 seconds, then try to validate
sleep 2
curl http://localhost:3001/api/provenance/validate/$JWT_TOKEN

# Expected: {"success":false,"message":"Invalid or expired token","error":"jwt expired"}
```

---

## 📊 Comparison: JWT vs Simple Token

| Feature | JWT-Signed QR | Simple Token QR |
|---------|---------------|-----------------|
| **Security** | ✅ Tamper-proof | ⚠️ Can be guessed |
| **Expiration** | ✅ 30 days | ❌ No expiration |
| **QR Size** | ⚠️ Larger | ✅ Smaller |
| **DB Lookups** | ✅ One (for history) | ✅ One (for everything) |
| **Offline Validation** | ✅ Partial | ❌ No |
| **Token Revocation** | ⚠️ Requires blacklist | ✅ Update DB status |
| **Speed** | ✅ Fast (verify + 1 query) | ✅ Fast (1 query) |
| **Use Case** | High security, exports | Real-time tracking |

---

## 🎯 When to Use Which Method?

### Use JWT-Signed QR When:
- ✅ Exporting products internationally
- ✅ High-value commodities (organic, premium)
- ✅ Need tamper-proof verification
- ✅ Regulatory compliance required
- ✅ Limited internet connectivity

### Use Simple Token QR When:
- ✅ Quick local verification
- ✅ Real-time tracking needed
- ✅ Smaller QR codes preferred
- ✅ Token revocation is important
- ✅ Always online environment

### Best Practice: Support Both! ✨

Your system now supports **BOTH methods**, so you can:
1. Generate JWT-signed QR for exports
2. Keep simple token ID for internal tracking
3. Let users choose based on their needs

---

## 🔄 Migration Guide

### From Original System to JWT-Enhanced

**No breaking changes!** Your existing system continues to work.

**To enable JWT QR codes:**

1. **Update environment variables:**
   ```bash
   echo "JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")" >> .env
   ```

2. **Restart backend:**
   ```bash
   npm run dev
   ```

3. **Use new React component:**
   ```tsx
   // Old
   import ProvenanceTracker from './components/producer-dashboard/ProvenanceTracker';
   
   // New (with authentication)
   import ProvenanceTrackerWithAuth from './components/producer-dashboard/ProvenanceTrackerWithAuth';
   ```

4. **Test JWT validation:**
   ```bash
   # Tokenize a crop batch and scan the QR
   # It should now use JWT validation endpoint
   ```

**That's it!** Existing QR codes continue to work with `/token/:tokenId` endpoint.

---

## 📚 Complete API Reference

### All Provenance Endpoints (10 Total)

| # | Method | Endpoint | Auth | Purpose |
|---|--------|----------|------|---------|
| 1 | POST | `/provenance/crop-batch` | ✅ | Create crop batch |
| 2 | POST | `/provenance/crop-batch/:id/history` | ✅ | Add history |
| 3 | GET | `/provenance/crop-batch/:id` | ❌ | Get crop batch |
| 4 | GET | `/provenance/crop-batch/producer/:id` | ✅ | List batches |
| 5 | POST | `/provenance/tokenize/:cropBatchId` | ✅ | **Generate JWT QR** |
| 6 | GET | `/provenance/validate/:jwtToken` | ❌ | **Validate JWT** (NEW) |
| 7 | GET | `/provenance/token/:tokenId` | ❌ | Validate simple token |
| 8 | PUT | `/provenance/token/:tokenId/verify` | ❌ | Record scan |
| 9 | GET | `/provenance/token/:tokenId/verifications` | ❌ | Scan history |
| 10 | GET | `/provenance/stats/:producerId` | ✅ | Statistics |

---

## 🆘 Troubleshooting

### Issue: "Invalid or expired token"

**Cause:** JWT expired (after 30 days) or invalid signature

**Solution:**
```bash
# Check token expiration
node -e "
const jwt = require('jsonwebtoken');
const token = 'YOUR_JWT_HERE';
try {
  const decoded = jwt.decode(token);
  console.log('Expires:', new Date(decoded.exp * 1000));
} catch (e) {
  console.log('Invalid token');
}
"

# Regenerate token if expired
curl -X POST .../api/provenance/tokenize/{cropBatchId}
```

### Issue: "jwt malformed"

**Cause:** QR code contains truncated or corrupt JWT

**Solution:**
- Ensure QR code is scanned completely
- Check QR code quality (regenerate if needed)
- Verify JWT format: `eyJ...` (starts with eyJ)

### Issue: QR code too large/complex

**Cause:** JWT tokens are longer than simple IDs

**Solution:**
```javascript
// Switch to simple token mode
// In provenance.js, change:
const qrData = qrDataSimple; // instead of qrDataJWT

// Or reduce QR error correction:
await QRCode.toDataURL(data, {
  errorCorrectionLevel: 'L', // Lowest (was 'H')
  width: 200 // Smaller size
});
```

---

## 🎉 Summary

You now have a **hybrid provenance system** with:

✅ **JWT-Enhanced Security** - Tamper-proof, signed tokens in QR codes  
✅ **Backward Compatible** - Original simple token system still works  
✅ **Complete React Component** - Full authentication and QR scanning  
✅ **Production Ready** - Both MySQL backend and React frontend  
✅ **Flexible** - Choose JWT or simple tokens based on needs  
✅ **Well Documented** - Complete examples and guides  

**Files Updated/Created:**
1. ✅ `/components/producer-dashboard/ProvenanceTrackerWithAuth.tsx` (NEW - 550 lines)
2. ✅ `/api/routes/provenance.js` (UPDATED - Added JWT validation)
3. ✅ `/api/server.js` (UPDATED - Added new endpoint docs)
4. ✅ `PROVENANCE_JWT_INTEGRATION_COMPLETE.md` (NEW - This file)

**Ready to deploy!** 🚀

---

**Last Updated:** October 22, 2025  
**Version:** 2.0 (JWT-Enhanced)  
**Status:** ✅ PRODUCTION READY
