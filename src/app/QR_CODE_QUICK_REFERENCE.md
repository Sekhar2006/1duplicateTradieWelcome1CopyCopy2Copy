# QR Code System - Quick Reference

## ⚡ 30-Second Start

**In Browser:**
```
http://localhost:5173 → Click "📱 QR Code Manager (NEW)"
```

**In Code:**
```typescript
import QRCodeManager from './components/QRCodeManager';

<QRCodeManager mode="both" />
```

---

## 📋 Usage Patterns

### Pattern 1: Display Only
```typescript
<QRCodeManager
  mode="display"
  qrData={{
    tokenId: "TRD-SPI-789456",
    qrCodeUrl: "https://...",
    commodity: "Spices",
    grade: "A"
  }}
/>
```

### Pattern 2: Scan Only
```typescript
<QRCodeManager
  mode="scan"
  onScanComplete={(token) => console.log(token)}
  apiUrl="http://localhost:3000"
/>
```

### Pattern 3: Both (Tabbed)
```typescript
<QRCodeManager
  mode="both"
  qrData={myQRData}
  onScanComplete={handleScan}
  onBack={() => navigate('/')}
/>
```

---

## 🔧 Props Cheat Sheet

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `mode` | `'display'` \| `'scan'` \| `'both'` | No | `'both'` | Component mode |
| `qrData` | `QRCodeData` | No | `null` | QR data to display |
| `onScanComplete` | `(token) => void` | No | `undefined` | Scan callback |
| `onBack` | `() => void` | No | `undefined` | Back button handler |
| `apiUrl` | `string` | No | `'http://localhost:3000'` | Backend API URL |

---

## 📡 API Integration

### Verify Token
```bash
curl -X POST http://localhost:3000/api/quality-check/TRD-SPI-789456/verify
```

### Get Token Details
```bash
curl http://localhost:3000/api/quality-check/TRD-SPI-789456
```

---

## 💻 Common Tasks

### Task 1: Display QR After Submission
```typescript
const [qrData, setQRData] = useState(null);

const handleSubmit = async (formData) => {
  const response = await submitQualityCheck(formData);
  setQRData({
    tokenId: response.data.tokenId,
    qrCodeUrl: response.data.qrCodeUrl,
    commodity: response.data.commodity,
    grade: response.data.grade
  });
};

return qrData ? (
  <QRCodeManager mode="display" qrData={qrData} />
) : (
  <QualityCheckForm onSubmit={handleSubmit} />
);
```

### Task 2: Scan and Verify
```typescript
const handleScan = async (tokenDetails) => {
  if (tokenDetails.status === 'active') {
    alert(`Valid token: ${tokenDetails.tokenId}`);
  }
};

<QRCodeManager
  mode="scan"
  onScanComplete={handleScan}
/>
```

### Task 3: Download QR Code
```typescript
// Built-in - just click download button
// Or programmatically:
const downloadQR = async (qrCodeUrl, tokenId) => {
  const response = await fetch(qrCodeUrl);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${tokenId}_qr_code.png`;
  link.click();
};
```

---

## 🎨 Features Quick Reference

### Display Tab
- ✅ Show QR code image (300x300)
- ✅ Display token ID (copyable)
- ✅ Show commodity details
- ✅ Download button
- ✅ Share button

### Scan Tab
- ✅ Camera scan (simulated)
- ✅ Image upload
- ✅ Manual token entry
- ✅ API verification
- ✅ Token details display

---

## 🔄 State Management

```typescript
// Component state
const [activeTab, setActiveTab] = useState('display');
const [isScanning, setIsScanning] = useState(false);
const [scanMode, setScanMode] = useState(null);
const [scannedToken, setScannedToken] = useState(null);
const [isVerifying, setIsVerifying] = useState(false);
```

---

## 🧪 Quick Tests

### Test 1: Display
```typescript
const testData = {
  tokenId: "TRD-TEST-123456",
  qrCodeUrl: "https://api.qrserver.com/v1/...",
  commodity: "Test Commodity",
  grade: "A"
};

<QRCodeManager mode="display" qrData={testData} />
```

### Test 2: Manual Entry
```
1. Click "📱 QR Code Manager"
2. Go to "Scan QR Code" tab
3. Enter: TRD-SPI-789456
4. Click Search
5. Verify token displays
```

### Test 3: Backend API
```bash
# Start simple server
node api/simple-quality-server.js

# Submit quality check (get token)
curl -X POST http://localhost:3000/api/quality-check \
  -H "Content-Type: application/json" \
  -d '{"producerId":"PROD1234","commodity":"Spices",...}'

# Verify token
curl -X POST http://localhost:3000/api/quality-check/TRD-SPI-789456/verify
```

---

## 🎯 Scan Methods

### Camera Scan
```
Click "Camera Scan" → Point at QR → Auto detect → Verify
```

### Upload Image
```
Click "Upload Image" → Select file → Decode QR → Verify
```

### Manual Entry
```
Type token ID → Click Search → Verify
```

---

## 📦 Installation (Real QR Scanning)

```bash
# Install QR scanning library
npm install react-qr-reader

# Import in component
import { QrReader } from 'react-qr-reader';

# Use in scan mode
<QrReader
  onResult={(result) => {
    if (result) verifyToken(result.text);
  }}
  constraints={{ facingMode: 'environment' }}
/>
```

---

## 🚨 Troubleshooting

### Issue: QR code not displaying
**Solution:** Check qrData prop has valid qrCodeUrl

### Issue: Scan not working
**Solution:** Install react-qr-reader for real scanning

### Issue: Token verification fails
**Solution:** Ensure backend server is running on correct port

### Issue: Download not working
**Solution:** Check CORS settings and qrCodeUrl accessibility

---

## 📚 Related Files

- `/components/QRCodeManager.tsx` - Main component
- `/components/QualityCheckWithQR.tsx` - Integration example
- `/QR_CODE_SYSTEM_COMPLETE.md` - Full documentation
- `/api/simple-quality-server.js` - Backend server

---

## ✅ Quick Checklist

**Display:**
- [ ] QR code shows
- [ ] Token ID displays
- [ ] Download works
- [ ] Share works

**Scan:**
- [ ] Manual entry works
- [ ] API verification works
- [ ] Token details display
- [ ] Error handling works

**Integration:**
- [ ] Backend running
- [ ] API endpoints working
- [ ] Props passed correctly
- [ ] Callbacks firing

---

## 💡 Pro Tips

1. **Always verify tokens** - Don't trust client-side data
2. **Use HTTPS in production** - Secure QR code URLs
3. **Add rate limiting** - Prevent abuse of verification API
4. **Cache verified tokens** - Reduce API calls
5. **Implement offline mode** - Store QR codes locally

---

**Status:** ✅ Ready to use

**Last Updated:** October 22, 2025
