# 🚀 Producer 7-Screen System - Quick Reference

## 📱 Screen Overview

| # | Screen | Component | Purpose | Key Features |
|---|--------|-----------|---------|--------------|
| 1 | 🏠 Dashboard | `ProducerAIDashboard.tsx` | Central hub | Grok AI, Quick actions, Finance, Alerts |
| 2 | 🌾 Post Requirement | `PostRequirementAdvanced.tsx` | Crop planning | Multi-crop, Intercropping, AI insights |
| 3 | 📅 Activities | `ActivityLoggerEnhanced.tsx` | Daily logging | 15 types, Evidence, AI analysis |
| 4 | 🌿 Crop Health | `CropHealthMonitor.tsx` | Health tracking | 6 metrics, Issues, Weather |
| 5 | 📦 Inventory | `InventoryStorage.tsx` | Storage mgmt | Quality, NFT, Certifications |
| 6 | 👤 Profile | `ProducerProfile.tsx` | Account info | Personal, Farm, KYC, Bank |
| 7 | ⚙️ Settings | `SettingsSupport.tsx` | Config & help | Language, Support, Legal |

---

## 🗄️ Database Quick Reference

```
producers → crops → activities → evidence
         ↓       ↓
       plots   crop_health → health_issues
                ↓
              storage
              
All linked via alerts & schedule tables
```

### Key Tables
```sql
users          -- Authentication (user_id)
producers      -- Profile (producer_id, user_id FK)
plots          -- Land (plot_id, producer_id FK)
crops          -- Cultivation (crop_id, producer_id FK, plot_id FK)
activities     -- Daily logs (activity_id, crop_id FK)
evidence       -- Media (evidence_id, activity_id FK)
crop_health    -- Monitoring (health_id, crop_id FK)
storage        -- Inventory (storage_id, producer_id FK)
alerts         -- Notifications (alert_id, producer_id FK)
```

---

## 🔄 Common User Flows

### Flow 1: New Crop Registration
```
1. Dashboard → Click "Post Requirement"
2. Add crop details (category, commodity, variety, area)
3. Enable intercropping (optional)
4. Review AI recommendations
5. Save → Crop record created
```

### Flow 2: Daily Activity Logging
```
1. Dashboard → Activities tab
2. Select crop → Click "Log Activity"
3. Choose activity type (e.g., Irrigation)
4. Fill specific fields (type, volume)
5. Upload photos (optional)
6. Save → Grok analyzes → Shows warnings if any
```

### Flow 3: Health Monitoring
```
1. Dashboard → Crop Health tab
2. View health scores for all crops
3. Click crop to see details
4. Review active issues
5. Click issue → See evidence & recommendations
6. Take action
```

### Flow 4: Post-Harvest Storage
```
1. Dashboard → Inventory tab
2. Click "Add Entry"
3. Enter commodity, quantity, grade, location
4. Set storage conditions
5. Save → Optional: Tokenize NFT
```

---

## 🎯 Quick Actions Reference

| Action | Shortcut | Location |
|--------|----------|----------|
| Post Requirement | Dashboard → Quick Actions | Opens Post Requirement screen |
| Log Activity | Activities → Log Activity button | Opens activity form modal |
| View Health | Crop Health tab | Shows all crop health metrics |
| Add Inventory | Inventory → Add New tab | Opens storage form |
| Edit Profile | Profile → Edit Profile button | Enables profile editing |
| Change Language | Settings → Language dropdown | Select from 94 languages |
| Contact Support | Settings → Support tab | Live chat, phone, email |

---

## 🤖 Grok AI Features

### Real-Time Monitoring
- ✅ Duplicate transaction detection
- ✅ Unusual pattern recognition
- ✅ Pre-harvest interval validation
- ✅ Activity sequence checking
- ✅ Disease symptom analysis
- ✅ Intercrop compatibility

### Alert Levels
```
🔴 CRITICAL → Immediate action required
🟡 HIGH    → Review within 24 hours
🟠 MEDIUM  → Review this week
🔵 LOW     → Informational
```

---

## 📊 Activity Types Cheat Sheet

| Type | Icon | Key Fields | Example |
|------|------|------------|---------|
| Ploughing | 🌱 | Method | Manual, Tractor, Bullock |
| Sowing | 🌱 | Method, Variety, Source | Direct, PBW 343, Govt Store |
| Irrigation | 💧 | Type, Volume | Drip, 2000 L |
| Fertilizer | 🌿 | Type, NPK, Dosage | NPK 20-20-0, 2 bags/acre |
| Pesticide | 🐛 | Type, Chemical, PHI | Insecticide, Chlorpyrifos, 15 days |
| Weeding | 🌿 | Method, Time | Manual, 4 hours |
| Mulching | 🌿 | Type, Reason | Organic, Moisture retention |
| Intercultural | ✂️ | Operation | Thinning, Earthing up |
| Pest Scouting | 🐛 | Symptoms, Action | Yellow spots, Spray applied |
| Health Check | 📈 | Height, Color, Stage | 45cm, Green, Tillering |
| Pruning | ✂️ | Method | Pruning, Training |
| Harvesting | 📦 | Type, Yield | Final, 20 quintals |
| Post-Harvest | 📦 | Activity, Price | Sale, ₹3200/quintal |
| Inspection | 👤 | By, Purpose | Agronomist, Quality check |
| Custom | 📄 | Free text | Any custom activity |

---

## 🎨 Design Tokens Quick Access

```typescript
import { designTokens } from "../design-system";

// Colors
colors.blue.primary      // #003E6D (headings)
colors.accent.gold       // #FFD700 (highlights)
colors.status.success    // #10B981 (good)
colors.status.warning    // #F59E0B (caution)
colors.status.error      // #EF4444 (critical)

// Typography
typography.sizes.xs      // 12px
typography.sizes.sm      // 14px
typography.sizes.base    // 16px
typography.sizes.lg      // 18px
typography.sizes.xl      // 20px

// Components
<DSButton variant="primary" size="md" />
<DSCard variant="elevated" padding="lg" />
<DSBadge variant="success" size="sm" />
```

---

## 🔐 Security Notes

### What to NEVER Store
- ❌ Raw Aadhaar numbers
- ❌ Bank passwords
- ❌ OTP codes
- ❌ Unencrypted PII

### What's Safe
- ✅ Masked account numbers (****1234)
- ✅ Crop data
- ✅ Activity logs
- ✅ Health metrics
- ✅ Inventory records

---

## 📱 Mobile Tips

### Touch Targets
- All buttons: minimum 44x44px
- Tap areas clearly defined
- Swipe gestures supported on tabs

### Offline Support (Coming Soon)
- Activities cached locally
- Sync when connection restored
- Conflict resolution automatic

---

## 🆘 Troubleshooting

### Common Issues

**Problem:** Can't see activities  
**Solution:** Select commodity in Crop Details tab first

**Problem:** NFT tokenization not available  
**Solution:** Ensure storage entry is saved first

**Problem:** Grok alerts not showing  
**Solution:** Log a few activities to trigger analysis

**Problem:** Profile won't save  
**Solution:** Check all required fields are filled

**Problem:** Language not changing  
**Solution:** Refresh app after language selection

---

## 📞 Support Contacts

**Phone:** 1800-123-4567 (Toll Free)  
**Email:** support@tradie.com  
**Live Chat:** Available 24/7 in app  
**Hours:** Monday-Sunday, 6 AM - 10 PM IST

---

## 🎓 Training Resources

### In-App
- ✅ Tooltips on every field
- ✅ Example values shown
- ✅ Contextual help icons
- ✅ Video tutorials (5 topics)
- ✅ FAQs (15 questions)

### External
- User manual (PDF)
- YouTube channel
- Community forum
- WhatsApp support group

---

## 📈 Performance Benchmarks

**Target Metrics:**
- Page load: < 1.5s
- Tab switch: < 0.3s
- Form submit: < 0.5s
- Image upload: < 3s

**Data Limits:**
- Activities per crop: Unlimited
- Photos per activity: 10 max
- Video size: 50 MB max
- Voice notes: 5 min max

---

## 🔄 Version Information

**Current Version:** 3.0  
**Release Date:** October 21, 2025  
**Platform Support:** Android, iOS, Web, Desktop  
**Minimum Requirements:**  
- Android 8.0+  
- iOS 13+  
- Chrome 90+  
- 2 GB RAM minimum

---

## ✅ Pre-Launch Checklist

### Before Using
- [ ] Complete KYC verification
- [ ] Add bank details
- [ ] Set language preference
- [ ] Enable notifications
- [ ] Review privacy policy

### First Crop
- [ ] Select correct category
- [ ] Choose right variety
- [ ] Enter accurate area
- [ ] Set sowing date
- [ ] Review AI recommendations

### Regular Use
- [ ] Log activities daily
- [ ] Upload evidence
- [ ] Check health weekly
- [ ] Review alerts promptly
- [ ] Update inventory after harvest

---

## 🎯 Success Metrics

### Track Your Progress
- ✅ Activities logged per week
- ✅ Evidence uploads
- ✅ Health checks completed
- ✅ Grok alerts addressed
- ✅ Inventory updated
- ✅ NFTs tokenized

### Goals to Achieve
- 🎯 Log 5+ activities/week
- 🎯 Upload evidence for critical activities
- 🎯 Weekly health checks
- 🎯 100% alert resolution
- 🎯 Timely inventory updates

---

## 📊 Data Export

### What You Can Export
- ✅ Complete profile
- ✅ All crop records
- ✅ Activity history
- ✅ Health data
- ✅ Inventory records
- ✅ Trade history

### Format Options
- JSON (programmatic access)
- CSV (spreadsheet)
- PDF (readable report)

### How to Export
```
Settings → Data Management → Export My Data
→ Select format → Download
```

---

## 🌍 Multi-Language Support

### Indian Languages (34)
Hindi, Punjabi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Odia, Assamese, Urdu, Sanskrit, and more...

### Global Languages (60+)
English, Spanish, French, German, Chinese, Arabic, and more...

### How to Change
```
Settings → Language & Region → Select Language → Save
```

---

**Quick Reference Version:** 1.0  
**Last Updated:** October 21, 2025  
**For:** TRADIE Producer Module v3.0
