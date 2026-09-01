# Provenance Tracker - Quick Reference

## ⚡ 30-Second Start

**In Browser:**
```
http://localhost:5173 → Click "🔗 Provenance Tracker (NFT/QR)"
```

---

## 📋 6-Step Workflow

### Step 1: Select Commodity
```
Choose category → Select variety → Generate Batch ID
Example: Vegetables → Tomato → VEG-123456-AB7C
```

### Step 2: Harvest Details
```
Date + Location + Method = Saved
```

### Step 3: Grading (Multiple Stages)
```
Fill criteria → Add stage → Repeat → Finalize
```

### Step 4: Verification
```
Type + Name + Rating + Comments → Add
```

### Step 5: Generate Token
```
Click button → Get Token ID + QR Code
```

### Step 6: View History
```
See complete timeline + Download PDF + Share link
```

---

## 🌾 9 Commodity Categories

| Category | Icon | Example Varieties | Criteria Count |
|----------|------|------------------|----------------|
| Vegetables | 🥬 | Tomato, Potato, Onion | 5 |
| Fruits | 🍎 | Mango, Banana, Apple | 5 |
| Spices | 🌶️ | Red Chili, Pepper, Turmeric | 5 |
| Pulses | 🫘 | Toor Dal, Moong, Chana | 5 |
| Grains | 🌾 | Basmati, Wheat, Maize | 5 |
| Nuts | 🥜 | Cashew, Almond, Walnut | 5 |
| Flowers | 🌸 | Jasmine, Rose, Marigold | 5 |
| Herbs | 🌿 | Basil, Mint, Lemongrass | 5 |
| Oil Seeds | 🌻 | Sunflower, Sesame, Mustard | 5 |

**Total:** 80+ varieties across 9 categories

---

## 🔑 Key IDs

### Crop Batch ID
```
Format: XXX-NNNNNN-XXXX
Example: VEG-123456-AB7C

XXX = Category prefix
NNNNNN = Timestamp
XXXX = Random unique
```

### Token ID
```
Format: TKN-[CROP_BATCH_ID]
Example: TKN-VEG-123456-AB7C
```

---

## 📊 Grading Criteria by Commodity

### Vegetables
- Size, Color, Firmness, Texture, Freshness

### Fruits
- Color, Size, Firmness, Sweetness, Ripeness

### Spices
- Aroma, Color, Moisture, Purity, Size

### Pulses
- Size, Color, Moisture, Purity, Uniformity

### Grains
- Size, Color, Moisture, Purity, Broken %

### Nuts
- Size, Color, Moisture, Oil Content, Defects

### Flowers
- Freshness, Color, Size, Fragrance, Stem Length

### Herbs
- Aroma, Color, Leaf Quality, Moisture, Freshness

### Oil Seeds
- Size, Color, Moisture, Oil Content, Purity

---

## 🔄 Timeline Stages

| Stage | Icon | Description |
|-------|------|-------------|
| Harvest | 🌱 | Initial creation |
| Grading | ⭐ | Quality assessment |
| Verification | 🛡️ | External validation |
| Packaging | 📦 | Packing details |
| Sale | 💰 | Transaction |
| Transport | 🚚 | Logistics |

---

## 🎯 Common Tasks

### Task 1: Quick Batch
```
1. Select → Vegetables → Tomato
2. Harvest → Today, Farm A, Labor, 50kg
3. Grade → Large, Rich, Firm, Smooth, Fresh
4. Generate Token
```

### Task 2: Export Quality
```
1. Select → Spices → Red Chili
2. Harvest → Date, Guntur, Labor, 50 quintal
3. Multi-stage grading:
   - Stage 1: Field inspection
   - Stage 2: Post-drying
   - Stage 3: Final export check
4. Verifications:
   - Self assessment
   - Lab report
   - APEDA certification
5. Generate Token
```

### Task 3: Premium Branding
```
1. Select → Grains → Rice - Basmati
2. Harvest → Organic farm details
3. Multiple quality checks
4. Third-party organic certification
5. Generate Token with full provenance
6. Share QR on premium packaging
```

---

## 💻 Code Snippets

### Basic Import
```typescript
import ProvenanceTracker from './components/producer-dashboard/ProvenanceTracker';

<ProvenanceTracker />
```

### Batch ID Format
```typescript
const generateCropBatchId = (category: string, variety: string) => {
  const prefix = category.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};
```

---

## 📡 API Quick Reference

### Create Batch
```bash
POST /api/crop-batch
{ "cropBatchId": "VEG-123456-AB7C", "commodityType": "Vegetables", "variety": "Tomato" }
```

### Add Grading
```bash
POST /api/crop-batch/:batchId/grading
{ "criteria": { "size": "Large" }, "notes": "Excellent" }
```

### Generate Token
```bash
POST /api/crop-batch/:batchId/tokenize
# Returns: { "tokenId": "TKN-VEG-123456-AB7C", "qrCodeUrl": "..." }
```

### Verify Token
```bash
POST /api/verify/:tokenId
# Returns: Complete provenance history
```

---

## 🧪 Quick Tests

### Test 1: Vegetables
```
Tomato → 100kg → Size:Large, Color:Rich → Third-party verification → Token
```

### Test 2: Spices
```
Red Chili → 50 quintal → Aroma:Excellent → Lab report → Token
```

### Test 3: Grains
```
Basmati → 5 tons → Purity:99% → Government certification → Token
```

---

## 📦 Export Options

| Action | Output |
|--------|--------|
| Download QR | PNG image |
| Download PDF | Full history report |
| Share Link | `https://tradie.app/verify/[batchId]` |
| Copy IDs | Batch ID / Token ID to clipboard |

---

## 🎨 Visual Indicators

### Status Badges
```
🟢 Active      - Batch in progress
🔵 Completed   - All stages done
🟡 Verified    - Token generated
```

### Progress Steps
```
[●] Select → [●] Harvest → [●] Grade → [○] Verify → [○] Token → [○] History
```

---

## ⚠️ Validation Rules

### Required Fields
- **Commodity:** Must select category and variety
- **Harvest:** Date, Location, Method (at least one)
- **Grading:** At least one criterion per stage
- **Verification:** Verifier name and comments

### Optional Fields
- Harvest: Quantity, Weather, Soil
- Grading: Notes
- Verification: Rating, Certificate

---

## 💡 Pro Tips

1. **Multiple Grading Stages** - Use for different inspection points
2. **Clear Notes** - Add detailed observations
3. **External Verification** - Adds credibility
4. **Shareable Links** - Use for marketing
5. **PDF Reports** - Keep for records

---

## 🔍 Troubleshooting

### Issue: Can't generate Batch ID
**Solution:** Ensure both category and variety are selected

### Issue: Can't add grading stage
**Solution:** Fill at least one grading criterion

### Issue: Token not generating
**Solution:** Complete at least harvest and one grading stage

---

## 📚 Related Documentation

- **Complete Guide:** [PROVENANCE_TRACKER_COMPLETE.md](./PROVENANCE_TRACKER_COMPLETE.md)
- **Quality Check:** [QUALITY_CHECK_COMPLETE_SUMMARY.md](./QUALITY_CHECK_COMPLETE_SUMMARY.md)
- **QR System:** [QR_CODE_SYSTEM_COMPLETE.md](./QR_CODE_SYSTEM_COMPLETE.md)

---

## ✅ Quick Checklist

**Before Production:**
- [ ] Test all 9 commodity types
- [ ] Add multiple grading stages
- [ ] Test verification workflow
- [ ] Verify token generation
- [ ] Test PDF export
- [ ] Implement backend API
- [ ] Connect database
- [ ] Test shareable links

---

**Status:** ✅ Ready to use

**Last Updated:** October 22, 2025
