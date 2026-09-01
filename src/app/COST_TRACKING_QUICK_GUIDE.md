# 💰 Cost Tracking Quick Guide

## 🎯 What's New

**New Tab Added:** 💰 **Costs** (4th position in Producer Dashboard)

---

## 📊 Dashboard Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Producer AI Dashboard - Welcome, Rajesh Kumar 🌾            │
├──────────────────────────────────────────────────────────────┤
│  🏠 Dashboard | 🌾 Post | 📅 Activities | 💰 COSTS | ...    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────┐ │
│  │ Input Costs│ │  Activity  │ │   Sales    │ │   Net    │ │
│  │   Today    │ │  Expenses  │ │   Income   │ │  Profit  │ │
│  │            │ │            │ │            │ │          │ │
│  │  ₹14,000   │ │  ₹4,300    │ │  ₹33,000   │ │ +₹14,700 │ │
│  └────────────┘ └────────────┘ └────────────┘ └──────────┘ │
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 📦 Input Costs & Inventory    [+ Add Input Purchase]    ││
│  ├──────────────────────────────────────────────────────────┤│
│  │ Product   │Category│Date│Qty│Used│Remaining│Price│Total ││
│  │─────────────────────────────────────────────────────────││
│  │ NPK 20-20 │Fert.   │Oct │100│ 45 │   55 kg │ ₹35 │₹3500 ││
│  │ Seeds     │Seeds   │Oct │ 50│ 50 │    0 kg │₹120 │₹6000 ││
│  │ Pesticide │Pest.   │Oct │ 10│  3 │  7 ltr  │₹450 │₹4500 ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 💼 Activity Expenses          [+ Add Activity Expense]  ││
│  ├──────────────────────────────────────────────────────────┤│
│  │ Activity  │Type │Date│Input│Labor│Machine│Other│Total   ││
│  │─────────────────────────────────────────────────────────││
│  │ Ploughing │Plou.│Oct │  -  │ ₹800│  ₹700 │  -  │ ₹1500 ││
│  │ Fertilizer│Fert.│Oct │NPK  │ ₹600│   -   │  -  │  ₹600 ││
│  │ Mulching  │Mulch│Oct │  -  │₹1200│   -   │₹1000│ ₹2200 ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Actions

### Add Input Purchase

**Steps:**
1. Click **[+ Add Input Purchase]**
2. Fill form:
   - Product Name: "NPK Fertilizer"
   - Category: "Fertilizers" (or "Others" → custom)
   - Quantity: 50
   - Unit: "kg" (or "Others" → custom)
   - Price/Unit: ₹35
   - Date: Select date
   - Supplier: "Krishi Kendra"
3. **Optional:** Upload invoice/photo/voice note
4. Click **Add Purchase**
5. ✅ Done!

**Auto-calculated:** Total Cost = ₹1,750

---

### Add Activity Expense

**Steps:**
1. Click **[+ Add Activity Expense]**
2. Fill form:
   - Activity Name: "Field Ploughing"
   - Type: "Ploughing" (or "Others" → custom)
   - Date: Select date
   - Associated Input: Optional
3. **Breakdown:**
   - Labor Cost: ₹800
   - Machinery Rent: ₹700
   - Other: ₹0
4. **Optional:** Upload receipt/photo
5. Click **Add Expense**
6. ✅ Done!

**Auto-calculated:** Total = ₹1,500

---

## 📅 View Daily Summary

**Steps:**
1. Select date from **"View Date"** picker
2. Summary cards auto-update:
   - 🛒 Input Costs
   - 💼 Activity Expenses
   - 💰 Sales Income
   - 📈 Net Profit
3. Tables filter to show that date only

---

## 🎨 Color Guide

| Color | Meaning |
|-------|---------|
| 🔴 Red | Input Costs (expenses) |
| 🟠 Orange | Activity Expenses |
| 🟢 Green | Sales Income (profit) |
| 🟢/🔴 | Net Profit (positive/negative) |

---

## 📋 Predefined Options

### Input Categories (9 + Others)
1. Seeds
2. Fertilizers
3. Pesticides
4. Herbicides
5. Growth Regulators
6. Irrigation Equipment
7. Mulching Material
8. Farm Tools
9. **Others** → Enter custom

### Activity Types (12 + Others)
1. Ploughing
2. Sowing/Transplanting
3. Irrigation
4. Fertilizer Application
5. Pesticide Application
6. Weeding
7. Mulching
8. Intercultural Operations
9. Pruning/Training
10. Harvesting
11. Post-Harvest
12. **Others** → Enter custom

### Units (7 + Others)
1. kg
2. liters
3. bags
4. packets
5. pieces
6. meters
7. **Others** → Enter custom

---

## 📎 File Upload Options

### For Input Purchases:
- 📄 **Invoice** - PDF, JPG, PNG
- 📷 **Photo** - Camera capture
- 🎤 **Voice Note** - Audio recording

### For Activity Expenses:
- 📄 **Receipt** - PDF, JPG, PNG
- 📷 **Photo** - Camera capture

**Max Size:** 50 MB per file

---

## 💡 Smart Features

### Auto-Calculations
- ✅ Total Cost = Quantity × Price/Unit
- ✅ Remaining = Purchased - Used
- ✅ Total Expense = Labor + Machinery + Other
- ✅ Net Profit = Income - (Input + Activity)

### Real-Time Updates
- ✅ Summary cards update instantly
- ✅ Date filter applies immediately
- ✅ Tables refresh after add/edit
- ✅ Toast notifications for actions

### Inventory Tracking
- ✅ Shows remaining stock
- ✅ Calculates total inventory value
- ✅ Visual indicators for low stock
- ✅ Links to activity usage

---

## 📊 Example Calculation

**Date: October 21, 2025**

### Inputs
```
NPK Fertilizer:  100 kg × ₹35  = ₹3,500
Wheat Seeds:      50 kg × ₹120 = ₹6,000
Pesticide:        10 L  × ₹450 = ₹4,500
                          Total = ₹14,000
```

### Activities
```
Ploughing:     ₹800 + ₹700 = ₹1,500
Fertilization: ₹600         = ₹600
Mulching:      ₹1,200 + ₹1,000 = ₹2,200
                        Total = ₹4,300
```

### Sales
```
Wheat: 150 kg × ₹220 = ₹33,000
```

### Profit
```
Income:           ₹33,000
Input Costs:     -₹14,000
Activity Costs:  -₹4,300
─────────────────────────
Net Profit:      +₹14,700 ✅
```

---

## 🔧 Actions Available

### Per Input Purchase
- ✏️ **Edit** - Modify details
- 🗑️ **Delete** - Remove entry
- 📄 **View** - See all details + files

### Per Activity Expense
- ✏️ **Edit** - Modify details
- 🗑️ **Delete** - Remove entry
- 📄 **View** - See breakdown + files

### Bulk Actions
- 📊 **Export Report** - Download data
- 📅 **Filter by Date** - View specific period
- 🔍 **Search** - Find specific entries

---

## ⚠️ Tips & Best Practices

### Data Entry
- ✅ Enter purchases immediately after buying
- ✅ Log activities same day they're performed
- ✅ Upload receipts for verification
- ✅ Use voice notes for quick entries

### Cost Tracking
- ✅ Review daily summary every evening
- ✅ Compare costs week-over-week
- ✅ Track seasonal variations
- ✅ Identify cost-saving opportunities

### Inventory Management
- ✅ Update quantity used regularly
- ✅ Reorder before stock runs out
- ✅ Track supplier performance
- ✅ Monitor price changes

---

## 🎯 Common Use Cases

### 1. Planning Season Budget
- View previous season costs
- Estimate current season needs
- Budget for inputs and activities
- Track actual vs. planned

### 2. Expense Claim
- Filter by date range
- Export report with receipts
- Submit for reimbursement
- Keep digital records

### 3. Profit Analysis
- Compare different crops
- Identify profitable activities
- Optimize resource allocation
- Make data-driven decisions

### 4. Tax Preparation
- Year-end expense summary
- Organized receipts
- Category-wise breakdown
- Digital audit trail

---

## 📱 Mobile Experience

### Optimized for:
- ✅ Small screens
- ✅ Touch interactions
- ✅ Camera integration
- ✅ Voice recording
- ✅ Offline data entry

### Features:
- 📱 Swipe tables horizontally
- 📷 Quick photo capture
- 🎤 Hands-free voice notes
- 💾 Auto-save drafts

---

## 🆘 Troubleshooting

### Upload Failed
- Check file size (< 50 MB)
- Ensure stable internet
- Try different format
- Contact support

### Total Not Calculating
- Check all fields filled
- Ensure numbers are valid
- Refresh page
- Clear browser cache

### Date Filter Not Working
- Ensure date is selected
- Check data exists for date
- Refresh component
- Try different date

---

## 📞 Need Help?

**Support Channels:**
- 📖 Full Documentation: `/INPUT_COST_EXPENSE_TRACKING_COMPLETE.md`
- 💻 Component File: `/components/producer-dashboard/InputCostTracker.tsx`
- 🔌 API Guide: `/API_INTEGRATION_COMPLETE.md`
- 📧 Email: support@tradie.com

---

## ✅ Quick Checklist

Daily:
- [ ] Log today's input purchases
- [ ] Record activity expenses
- [ ] Upload receipts/photos
- [ ] Check daily profit

Weekly:
- [ ] Review total expenses
- [ ] Update inventory usage
- [ ] Analyze profit trends
- [ ] Plan next week's activities

Monthly:
- [ ] Export expense report
- [ ] Review supplier prices
- [ ] Optimize costs
- [ ] Plan next month

---

**Feature:** Input Cost & Expense Tracking  
**Tab:** 💰 Costs  
**Version:** 1.0  
**Status:** ✅ Live in Dashboard
