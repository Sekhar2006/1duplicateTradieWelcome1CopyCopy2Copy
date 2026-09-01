# 💰 Input Cost & Activity Expense Tracking - Complete Documentation

## Overview
Comprehensive cost tracking system for producers to manage input purchases, activity expenses, and daily profit analysis integrated into the Producer AI Dashboard.

---

## 🎯 Features Implemented

### 1. Input Costs & Inventory Management

#### Table Display
- ✅ **Product Name** - Name of input purchased
- ✅ **Category** - Seeds, Fertilizers, Pesticides, etc.
- ✅ **Purchase Date** - Date of purchase
- ✅ **Quantity Purchased** - Amount bought with unit
- ✅ **Quantity Used** - Amount consumed
- ✅ **Remaining Quantity** - Available for future use
- ✅ **Price per Unit** - Cost per kg/liter/bag
- ✅ **Total Cost** - Calculated total expense
- ✅ **Supplier** - Vendor information

#### Add Input Purchase Modal
- ✅ Product name (text input)
- ✅ Category dropdown with "Others" option
- ✅ Quantity purchased (number input)
- ✅ Unit dropdown (kg, liters, bags, etc.) with "Others"
- ✅ Price per unit (₹)
- ✅ Purchase date (date picker)
- ✅ Supplier name
- ✅ Auto-calculated total cost display
- ✅ **File Upload Options:**
  - 📄 Invoice/Receipt (PDF, JPG, PNG)
  - 📷 Photo capture (camera integration)
  - 🎤 Voice note recording
- ✅ Notes/remarks textarea
- ✅ Real-time validation

#### Inventory Features
- ✅ Total inventory value calculation
- ✅ Remaining stock tracking
- ✅ Visual indicators for stock levels
- ✅ Edit/Delete actions per item

### 2. Activity Expenses Section

#### Table Display
- ✅ **Activity Name** - Description of work done
- ✅ **Activity Type** - Dropdown category
- ✅ **Date** - When activity was performed
- ✅ **Associated Input** - Linked to input purchases
- ✅ **Labor Cost** - Wages paid
- ✅ **Machinery Rent** - Equipment costs
- ✅ **Other Costs** - Miscellaneous expenses
- ✅ **Total Expense** - Sum of all costs

#### Add Activity Expense Modal
- ✅ Activity name (text input)
- ✅ Activity type dropdown with 12 predefined types + "Others"
- ✅ Date picker
- ✅ Associated input selector (links to purchases)
- ✅ **Expense Breakdown:**
  - Labor cost (₹)
  - Machinery rent (₹)
  - Other costs (₹)
  - Auto-calculated total
- ✅ **File Upload Options:**
  - 📄 Receipt upload
  - 📷 Photo evidence
- ✅ Notes/remarks
- ✅ Real-time total calculation

#### Activity Types (12 + Others)
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
12. Others (custom input)

### 3. Daily Expense & Profit Summary

#### Summary Cards (4 Cards)
1. **Input Costs Today**
   - Total purchases for selected date
   - Red indicator
   - Shopping cart icon

2. **Activity Expenses**
   - Total activity costs for selected date
   - Orange indicator
   - Package icon

3. **Sales Income**
   - Total sales revenue for selected date
   - Green indicator
   - Trending up icon

4. **Net Profit**
   - Calculated: Income - (Input Costs + Activity Expenses)
   - Green if positive, Red if negative
   - Dynamic icon (up/down arrow)

#### Features
- ✅ Date selector to view any day's summary
- ✅ Real-time calculations
- ✅ Color-coded indicators
- ✅ Export report button
- ✅ Currency formatting (₹)

### 4. Custom Options ("Others" Functionality)

#### Category Dropdown
- ✅ "Others" option at bottom
- ✅ Opens popup form for custom input
- ✅ Custom category saved and used immediately
- ✅ Toast notification confirmation

#### Activity Type Dropdown
- ✅ "Others" option at bottom
- ✅ Popup form for custom activity type
- ✅ Instant save and apply
- ✅ User-friendly feedback

#### Unit Dropdown
- ✅ "Others" option for custom units
- ✅ Quick add functionality
- ✅ Persistent across entries

### 5. File Upload & Evidence System

#### Supported File Types
- **Invoices/Receipts:** PDF, JPG, PNG, JPEG
- **Photos:** All image formats, camera capture
- **Voice Notes:** Audio files

#### Upload Methods
1. **Browse Files** - Traditional file picker
2. **Camera Capture** - Direct photo from device camera
3. **Voice Recording** - Audio notes for hands-free entry

#### Features
- ✅ Multiple file support per entry
- ✅ File size validation (50 MB max)
- ✅ Preview before upload
- ✅ Toast notifications for success/error
- ✅ Secure storage references

---

## 🎨 Design & UI

### Color Scheme
- **Input Costs:** Red (#EF4444) - Expenses
- **Activity Expenses:** Orange (#F59E0B) - Operations
- **Sales Income:** Green (#10B981) - Revenue
- **Net Profit:** Green/Red based on value

### Layout
- **Responsive grid:** 1/2/4 columns based on screen size
- **Card-based design:** Consistent with TRADIE design system
- **Tables:** Horizontal scroll on mobile
- **Modals:** Max-width optimized, scrollable content

### Typography
- **Headings:** Playfair Display
- **Labels:** Montserrat
- **Body:** Lato
- **Numbers:** Bold, prominent display

### Animations
- ✅ Motion.js fade-in effects
- ✅ Staggered card appearances
- ✅ Smooth transitions
- ✅ Loading states

---

## 📊 Sample Data Structure

### Input Purchase Object
```typescript
interface InputPurchase {
  id: string;
  productName: string;
  category: string;
  quantityPurchased: number;
  quantityUsed: number;
  unit: string;
  pricePerUnit: number;
  totalCost: number;
  purchaseDate: string;
  supplier: string;
  invoiceUrl?: string;
  photoUrl?: string;
  voiceNoteUrl?: string;
  notes?: string;
}
```

### Activity Expense Object
```typescript
interface ActivityExpense {
  id: string;
  activityName: string;
  activityType: string;
  date: string;
  associatedInput?: string;
  expenseAmount: number;
  laborCost?: number;
  machineryRent?: number;
  otherCost?: number;
  receiptUrl?: string;
  photoUrl?: string;
  notes?: string;
}
```

### Sales Entry Object
```typescript
interface SalesEntry {
  id: string;
  crop: string;
  quantity: number;
  pricePerUnit: number;
  totalIncome: number;
  saleDate: string;
  buyer: string;
}
```

---

## 🗄️ Database Schema Integration

### New Tables Required

#### 1. input_purchases
```sql
CREATE TABLE input_purchases (
    purchase_id INT PRIMARY KEY AUTO_INCREMENT,
    producer_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    quantity_purchased DECIMAL(10,2) NOT NULL,
    quantity_used DECIMAL(10,2) DEFAULT 0,
    unit VARCHAR(20) NOT NULL,
    price_per_unit DECIMAL(10,2) NOT NULL,
    total_cost DECIMAL(12,2) NOT NULL,
    purchase_date DATE NOT NULL,
    supplier VARCHAR(255),
    invoice_url TEXT,
    photo_url TEXT,
    voice_note_url TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE,
    INDEX idx_producer (producer_id),
    INDEX idx_date (purchase_date),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### 2. activity_expenses
```sql
CREATE TABLE activity_expenses (
    expense_id INT PRIMARY KEY AUTO_INCREMENT,
    producer_id INT NOT NULL,
    crop_id INT,
    activity_name VARCHAR(255) NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    expense_date DATE NOT NULL,
    associated_input_id INT,
    labor_cost DECIMAL(10,2),
    machinery_rent DECIMAL(10,2),
    other_cost DECIMAL(10,2),
    total_expense DECIMAL(12,2) NOT NULL,
    receipt_url TEXT,
    photo_url TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE,
    FOREIGN KEY (crop_id) REFERENCES crops(crop_id) ON DELETE SET NULL,
    FOREIGN KEY (associated_input_id) REFERENCES input_purchases(purchase_id) ON DELETE SET NULL,
    INDEX idx_producer (producer_id),
    INDEX idx_date (expense_date),
    INDEX idx_type (activity_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### 3. sales_records
```sql
CREATE TABLE sales_records (
    sale_id INT PRIMARY KEY AUTO_INCREMENT,
    producer_id INT NOT NULL,
    crop_id INT,
    crop_name VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    price_per_unit DECIMAL(10,2) NOT NULL,
    total_income DECIMAL(12,2) NOT NULL,
    sale_date DATE NOT NULL,
    buyer_name VARCHAR(255),
    buyer_contact VARCHAR(100),
    payment_status VARCHAR(50),
    invoice_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE,
    FOREIGN KEY (crop_id) REFERENCES crops(crop_id) ON DELETE SET NULL,
    INDEX idx_producer (producer_id),
    INDEX idx_date (sale_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 🔌 API Endpoints

### Input Purchases

#### GET /api/producers/:producerId/input-purchases
```javascript
// Get all input purchases
router.get('/:producerId/input-purchases', auth, async (req, res) => {
  const { producerId } = req.params;
  const { startDate, endDate, category } = req.query;
  
  let query = `
    SELECT * FROM input_purchases
    WHERE producer_id = ?
  `;
  const params = [producerId];
  
  if (startDate && endDate) {
    query += ` AND purchase_date BETWEEN ? AND ?`;
    params.push(startDate, endDate);
  }
  
  if (category) {
    query += ` AND category = ?`;
    params.push(category);
  }
  
  query += ` ORDER BY purchase_date DESC`;
  
  const [purchases] = await db.query(query, params);
  res.json(purchases);
});
```

#### POST /api/input-purchases
```javascript
// Add new input purchase
router.post('/', auth, async (req, res) => {
  const {
    producerId, productName, category, quantityPurchased,
    unit, pricePerUnit, purchaseDate, supplier, notes
  } = req.body;
  
  const totalCost = quantityPurchased * pricePerUnit;
  
  const [result] = await db.query(`
    INSERT INTO input_purchases 
    (producer_id, product_name, category, quantity_purchased, 
     unit, price_per_unit, total_cost, purchase_date, supplier, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [producerId, productName, category, quantityPurchased,
      unit, pricePerUnit, totalCost, purchaseDate, supplier, notes]);
  
  res.status(201).json({
    purchaseId: result.insertId,
    totalCost
  });
});
```

#### PUT /api/input-purchases/:purchaseId/usage
```javascript
// Update quantity used
router.put('/:purchaseId/usage', auth, async (req, res) => {
  const { purchaseId } = req.params;
  const { quantityUsed } = req.body;
  
  await db.query(`
    UPDATE input_purchases
    SET quantity_used = quantity_used + ?
    WHERE purchase_id = ?
  `, [quantityUsed, purchaseId]);
  
  res.json({ message: 'Usage updated' });
});
```

### Activity Expenses

#### GET /api/producers/:producerId/activity-expenses
```javascript
router.get('/:producerId/activity-expenses', auth, async (req, res) => {
  const { producerId } = req.params;
  const { date, activityType } = req.query;
  
  let query = `
    SELECT ae.*, ip.product_name as associated_input_name
    FROM activity_expenses ae
    LEFT JOIN input_purchases ip ON ae.associated_input_id = ip.purchase_id
    WHERE ae.producer_id = ?
  `;
  const params = [producerId];
  
  if (date) {
    query += ` AND ae.expense_date = ?`;
    params.push(date);
  }
  
  if (activityType) {
    query += ` AND ae.activity_type = ?`;
    params.push(activityType);
  }
  
  query += ` ORDER BY ae.expense_date DESC`;
  
  const [expenses] = await db.query(query, params);
  res.json(expenses);
});
```

#### POST /api/activity-expenses
```javascript
router.post('/', auth, async (req, res) => {
  const {
    producerId, cropId, activityName, activityType,
    expenseDate, associatedInputId, laborCost,
    machineryRent, otherCost, notes
  } = req.body;
  
  const totalExpense = (laborCost || 0) + (machineryRent || 0) + (otherCost || 0);
  
  const [result] = await db.query(`
    INSERT INTO activity_expenses 
    (producer_id, crop_id, activity_name, activity_type,
     expense_date, associated_input_id, labor_cost,
     machinery_rent, other_cost, total_expense, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [producerId, cropId, activityName, activityType,
      expenseDate, associatedInputId, laborCost,
      machineryRent, otherCost, totalExpense, notes]);
  
  res.status(201).json({
    expenseId: result.insertId,
    totalExpense
  });
});
```

### Daily Summary

#### GET /api/producers/:producerId/daily-summary
```javascript
router.get('/:producerId/daily-summary', auth, async (req, res) => {
  const { producerId } = req.params;
  const { date } = req.query;
  
  // Get input costs
  const [inputCosts] = await db.query(`
    SELECT COALESCE(SUM(total_cost), 0) as total_input_cost
    FROM input_purchases
    WHERE producer_id = ? AND purchase_date = ?
  `, [producerId, date]);
  
  // Get activity expenses
  const [activityExpenses] = await db.query(`
    SELECT COALESCE(SUM(total_expense), 0) as total_activity_expense
    FROM activity_expenses
    WHERE producer_id = ? AND expense_date = ?
  `, [producerId, date]);
  
  // Get sales income
  const [salesIncome] = await db.query(`
    SELECT COALESCE(SUM(total_income), 0) as total_income
    FROM sales_records
    WHERE producer_id = ? AND sale_date = ?
  `, [producerId, date]);
  
  const totalInputCost = inputCosts[0].total_input_cost;
  const totalActivityExpense = activityExpenses[0].total_activity_expense;
  const totalIncome = salesIncome[0].total_income;
  const netProfit = totalIncome - (totalInputCost + totalActivityExpense);
  
  res.json({
    date,
    totalInputCost,
    totalActivityExpense,
    totalIncome,
    netProfit
  });
});
```

---

## 📱 User Flow

### Adding Input Purchase
1. User clicks "Add Input Purchase" button
2. Modal opens with form
3. User fills in:
   - Product name
   - Category (select or custom)
   - Quantity + Unit
   - Price per unit
   - Purchase date
   - Supplier (optional)
4. System auto-calculates total cost
5. User uploads invoice/photo/voice note (optional)
6. User adds notes (optional)
7. User clicks "Add Purchase"
8. System validates and saves
9. Toast notification confirms
10. Modal closes, table refreshes

### Adding Activity Expense
1. User clicks "Add Activity Expense" button
2. Modal opens with form
3. User fills in:
   - Activity name
   - Activity type (select or custom)
   - Date
   - Associated input (optional)
   - Cost breakdown (labor, machinery, other)
4. System auto-calculates total expense
5. User uploads receipt/photo (optional)
6. User adds notes (optional)
7. User clicks "Add Expense"
8. System validates and saves
9. Toast notification confirms
10. Modal closes, table refreshes

### Viewing Daily Summary
1. User selects date from date picker
2. System filters all data for that date
3. Summary cards update:
   - Input costs
   - Activity expenses
   - Sales income
   - Net profit
4. Tables filter to show only that date's entries
5. User can export report

---

## ✅ Testing Checklist

### Functionality
- [ ] Add input purchase works
- [ ] Add activity expense works
- [ ] Date filter updates summary correctly
- [ ] Custom category creation works
- [ ] Custom activity type creation works
- [ ] Custom unit creation works
- [ ] File uploads process successfully
- [ ] Edit/delete buttons function
- [ ] Total calculations are accurate
- [ ] Remaining quantity calculates correctly

### UI/UX
- [ ] Forms validate before submission
- [ ] Error messages display properly
- [ ] Success toasts appear
- [ ] Modal animations smooth
- [ ] Tables are responsive
- [ ] Cards display correctly on mobile
- [ ] Colors match design system
- [ ] Typography is consistent

### Data
- [ ] Sample data loads correctly
- [ ] Database queries optimize
- [ ] Foreign keys enforce properly
- [ ] Dates format consistently
- [ ] Currency formats correctly (₹)

---

## 📈 Analytics & Reporting

### Future Enhancements
1. **Monthly/Yearly Reports**
   - Trend analysis
   - Profit/loss graphs
   - Category-wise breakdown

2. **Export Options**
   - PDF reports
   - Excel spreadsheets
   - CSV downloads

3. **Predictive Analytics**
   - AI-powered cost forecasting
   - Budget recommendations
   - Expense optimization suggestions

4. **Integrations**
   - Link with crop activities
   - Connect to sales module
   - Sync with finance dashboard

---

## 🎯 Key Benefits

### For Producers
1. **Complete Financial Visibility** - Track every rupee spent and earned
2. **Better Planning** - Know input costs before purchasing
3. **Inventory Management** - Never run out of critical inputs
4. **Profit Tracking** - Daily, weekly, monthly profit analysis
5. **Evidence Storage** - Keep all receipts and invoices digitally
6. **Tax Preparation** - Organized records for filing

### For Business
1. **Data-Driven Decisions** - Insights into farming economics
2. **Cost Optimization** - Identify areas to reduce expenses
3. **Supplier Management** - Track best suppliers and prices
4. **Activity Costing** - Know exact cost per operation
5. **Compliance** - Maintain records for audits

---

## 📄 File Structure

```
/components
  /producer-dashboard
    ├── InputCostTracker.tsx         (New - Main component)
    ├── ProducerAIDashboard.tsx      (Updated - Integrated new tab)
    └── ... (other components)

/database
  └── schema_mysql.sql               (Updated - New tables)

/api
  /routes
    ├── input-purchases.js           (New - API routes)
    ├── activity-expenses.js         (New - API routes)
    ├── sales-records.js             (New - API routes)
    └── daily-summary.js             (New - API routes)
```

---

## 🚀 Deployment Steps

1. **Database Migration**
   ```bash
   mysql -u root -p tradie_producer < updated_schema.sql
   ```

2. **API Deployment**
   ```bash
   cd api
   npm install
   npm start
   ```

3. **Frontend Update**
   ```bash
   # Component already integrated in ProducerAIDashboard
   # No additional steps needed
   ```

4. **Test Integration**
   - Navigate to Producer Dashboard
   - Click on "💰 Costs" tab
   - Test all features

---

## 📞 Support

For issues or questions:
- **Documentation:** This file
- **Component:** `/components/producer-dashboard/InputCostTracker.tsx`
- **API Guide:** `/API_INTEGRATION_COMPLETE.md`

---

**Version:** 1.0  
**Last Updated:** October 21, 2025  
**Status:** ✅ Complete & Integrated  
**Dashboard Tab:** 💰 Costs (4th tab)
