# 🚀 Input Cost & Expense Tracking - Implementation Guide

## Quick Integration Steps

### Step 1: Import the Enhanced Component

Replace the old InputCostTracker with the new enhanced version in your ProducerDashboardScreen:

```typescript
// In ProducerDashboardScreen.tsx
import { InputCostTrackerEnhanced } from "./producer-dashboard/InputCostTrackerEnhanced";

// In the dashboard render, where you currently show the costs section:
{selectedSection === "costs" && <InputCostTrackerEnhanced />}
```

### Step 2: Database Setup

Run the SQL migration scripts:

```bash
# Navigate to database directory
cd database

# Run the migration
mysql -u your_username -p tradie_db < migrations/cost_tracking_v2.sql
```

Or manually execute:

```sql
-- Create input_purchases table
CREATE TABLE input_purchases (
    purchase_id INT PRIMARY KEY AUTO_INCREMENT,
    producer_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    purchase_date DATE NOT NULL,
    quantity_purchased DECIMAL(12, 3) NOT NULL,
    quantity_used DECIMAL(12, 3) DEFAULT 0,
    remaining_quantity DECIMAL(12, 3) AS (quantity_purchased - quantity_used) STORED,
    unit VARCHAR(50) NOT NULL,
    price_per_unit DECIMAL(12, 3) NOT NULL,
    total_cost DECIMAL(15, 2) AS (quantity_purchased * price_per_unit) STORED,
    supplier VARCHAR(255),
    invoice_url VARCHAR(500),
    photo_url VARCHAR(500),
    voice_note_url VARCHAR(500),
    notes TEXT,
    grok_risk_score INT DEFAULT 0,
    grok_risk_level ENUM('safe', 'low', 'medium', 'high', 'critical') DEFAULT 'safe',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE,
    INDEX idx_producer_date (producer_id, purchase_date),
    INDEX idx_category (category),
    INDEX idx_risk_level (grok_risk_level)
);

-- Create activity_expenses table
CREATE TABLE activity_expenses (
    expense_id INT PRIMARY KEY AUTO_INCREMENT,
    producer_id INT NOT NULL,
    activity_name VARCHAR(255) NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    activity_date DATE NOT NULL,
    related_inputs TEXT,
    expense_amount DECIMAL(12, 3) NOT NULL,
    labor_cost DECIMAL(12, 3) DEFAULT 0,
    machinery_rent DECIMAL(12, 3) DEFAULT 0,
    other_cost DECIMAL(12, 3) DEFAULT 0,
    receipt_url VARCHAR(500),
    photo_url VARCHAR(500),
    notes TEXT,
    grok_risk_score INT DEFAULT 0,
    grok_risk_level ENUM('safe', 'low', 'medium', 'high', 'critical') DEFAULT 'safe',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE,
    INDEX idx_producer_date (producer_id, activity_date),
    INDEX idx_activity_type (activity_type),
    INDEX idx_risk_level (grok_risk_level)
);

-- Create sales table
CREATE TABLE sales (
    sale_id INT PRIMARY KEY AUTO_INCREMENT,
    producer_id INT NOT NULL,
    crop_product VARCHAR(255) NOT NULL,
    quantity DECIMAL(12, 3) NOT NULL,
    price_per_unit DECIMAL(12, 3) NOT NULL,
    total_income DECIMAL(15, 2) AS (quantity * price_per_unit) STORED,
    sale_date DATE NOT NULL,
    buyer VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE,
    INDEX idx_producer_date (producer_id, sale_date)
);

-- Update producers table
ALTER TABLE producers 
ADD COLUMN daily_profit DECIMAL(15,2) DEFAULT 0,
ADD COLUMN total_input_cost DECIMAL(15,2) DEFAULT 0,
ADD COLUMN total_activity_expense DECIMAL(15,2) DEFAULT 0,
ADD COLUMN total_sales_income DECIMAL(15,2) DEFAULT 0,
ADD COLUMN inventory_value DECIMAL(15,2) DEFAULT 0;
```

### Step 3: Backend API Routes

Create new API routes in your Express server:

```javascript
// api/routes/purchases.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const { grokAnalyzeTransaction } = require('../services/grokAI');

// Add input purchase
router.post('/add', async (req, res) => {
  const {
    producer_id,
    product_name,
    category,
    quantity_purchased,
    unit,
    price_per_unit,
    purchase_date,
    supplier,
    notes
  } = req.body;

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    const total_cost = quantity_purchased * price_per_unit;
    
    // Grok AI fraud detection
    const grokAnalysis = await grokAnalyzeTransaction({
      type: 'input_purchase',
      amount: total_cost,
      source: supplier,
      date: new Date(purchase_date),
      producer_id
    });
    
    const [result] = await connection.execute(
      `INSERT INTO input_purchases 
       (producer_id, product_name, category, quantity_purchased, unit, 
        price_per_unit, purchase_date, supplier, notes, 
        grok_risk_score, grok_risk_level)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        producer_id, product_name, category, quantity_purchased, unit,
        price_per_unit, purchase_date, supplier, notes,
        grokAnalysis.score, grokAnalysis.level
      ]
    );
    
    await connection.end();
    
    res.json({
      success: true,
      purchase_id: result.insertId,
      total_cost,
      grok_analysis: grokAnalysis
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update quantity used
router.put('/:id/update-quantity', async (req, res) => {
  const { id } = req.params;
  const { quantity_used } = req.body;
  
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    await connection.execute(
      'UPDATE input_purchases SET quantity_used = ? WHERE purchase_id = ?',
      [quantity_used, id]
    );
    
    await connection.end();
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get purchases
router.get('/:producer_id', async (req, res) => {
  const { producer_id } = req.params;
  const { date } = req.query;
  
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    let query = 'SELECT * FROM input_purchases WHERE producer_id = ?';
    const params = [producer_id];
    
    if (date) {
      query += ' AND purchase_date = ?';
      params.push(date);
    }
    
    query += ' ORDER BY purchase_date DESC';
    
    const [rows] = await connection.execute(query, params);
    await connection.end();
    
    res.json({ success: true, purchases: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete purchase
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    await connection.execute(
      'DELETE FROM input_purchases WHERE purchase_id = ?',
      [id]
    );
    
    await connection.end();
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

```javascript
// api/routes/expenses.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const { grokAnalyzeTransaction } = require('../services/grokAI');

// Add activity expense
router.post('/add', async (req, res) => {
  const {
    producer_id,
    activity_name,
    activity_type,
    activity_date,
    related_inputs,
    labor_cost,
    machinery_rent,
    other_cost,
    expense_amount,
    notes
  } = req.body;

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    // Grok AI fraud detection
    const grokAnalysis = await grokAnalyzeTransaction({
      type: 'activity_expense',
      amount: expense_amount,
      source: activity_type,
      date: new Date(activity_date),
      producer_id
    });
    
    const [result] = await connection.execute(
      `INSERT INTO activity_expenses 
       (producer_id, activity_name, activity_type, activity_date, 
        related_inputs, labor_cost, machinery_rent, other_cost, 
        expense_amount, notes, grok_risk_score, grok_risk_level)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        producer_id, activity_name, activity_type, activity_date,
        JSON.stringify(related_inputs || []), labor_cost || 0, 
        machinery_rent || 0, other_cost || 0, expense_amount, notes,
        grokAnalysis.score, grokAnalysis.level
      ]
    );
    
    await connection.end();
    
    res.json({
      success: true,
      expense_id: result.insertId,
      grok_analysis: grokAnalysis
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get expenses
router.get('/:producer_id', async (req, res) => {
  const { producer_id } = req.params;
  const { date } = req.query;
  
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    let query = 'SELECT * FROM activity_expenses WHERE producer_id = ?';
    const params = [producer_id];
    
    if (date) {
      query += ' AND activity_date = ?';
      params.push(date);
    }
    
    query += ' ORDER BY activity_date DESC';
    
    const [rows] = await connection.execute(query, params);
    
    // Parse related_inputs JSON
    rows.forEach(row => {
      row.related_inputs = JSON.parse(row.related_inputs || '[]');
    });
    
    await connection.end();
    
    res.json({ success: true, expenses: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

```javascript
// api/routes/sales.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Add sale
router.post('/add', async (req, res) => {
  const {
    producer_id,
    crop_product,
    quantity,
    price_per_unit,
    sale_date,
    buyer
  } = req.body;

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    const [result] = await connection.execute(
      `INSERT INTO sales 
       (producer_id, crop_product, quantity, price_per_unit, sale_date, buyer)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [producer_id, crop_product, quantity, price_per_unit, sale_date, buyer]
    );
    
    await connection.end();
    
    res.json({
      success: true,
      sale_id: result.insertId,
      total_income: quantity * price_per_unit
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

```javascript
// api/routes/financial-summary.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Get daily summary
router.get('/:producer_id', async (req, res) => {
  const { producer_id } = req.params;
  const { date } = req.query;
  const targetDate = date || new Date().toISOString().split('T')[0];

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    // Get input costs
    const [purchases] = await connection.execute(
      'SELECT SUM(total_cost) as total FROM input_purchases WHERE producer_id = ? AND purchase_date = ?',
      [producer_id, targetDate]
    );
    
    // Get activity expenses
    const [expenses] = await connection.execute(
      'SELECT SUM(expense_amount) as total FROM activity_expenses WHERE producer_id = ? AND activity_date = ?',
      [producer_id, targetDate]
    );
    
    // Get sales income
    const [sales] = await connection.execute(
      'SELECT SUM(total_income) as total FROM sales WHERE producer_id = ? AND sale_date = ?',
      [producer_id, targetDate]
    );
    
    // Get inventory value
    const [inventory] = await connection.execute(
      `SELECT SUM(remaining_quantity * price_per_unit) as total 
       FROM input_purchases WHERE producer_id = ?`,
      [producer_id]
    );
    
    await connection.end();
    
    const totalInputCost = purchases[0].total || 0;
    const totalExpense = expenses[0].total || 0;
    const totalIncome = sales[0].total || 0;
    const inventoryValue = inventory[0].total || 0;
    const netProfit = totalIncome - (totalInputCost + totalExpense);
    
    res.json({
      success: true,
      date: targetDate,
      total_input_cost: totalInputCost,
      total_activity_expense: totalExpense,
      total_sales_income: totalIncome,
      net_profit: netProfit,
      inventory_value: inventoryValue
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

### Step 4: Update server.js

```javascript
// In api/server.js, add the new routes:

const purchasesRouter = require('./routes/purchases');
const expensesRouter = require('./routes/expenses');
const salesRouter = require('./routes/sales');
const financialSummaryRouter = require('./routes/financial-summary');

app.use('/api/purchases', purchasesRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/sales', salesRouter);
app.use('/api/financial-summary', financialSummaryRouter);
```

### Step 5: Connect Frontend to Backend

Update the InputCostTrackerEnhanced component to use real API calls instead of local state:

```typescript
// Add API service
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const fetchPurchases = async (producerId: number, date?: string) => {
  const url = date 
    ? `${API_BASE}/purchases/${producerId}?date=${date}`
    : `${API_BASE}/purchases/${producerId}`;
  const response = await fetch(url);
  return response.json();
};

const addPurchase = async (purchase: any) => {
  const response = await fetch(`${API_BASE}/purchases/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(purchase)
  });
  return response.json();
};

// Similar functions for expenses and sales...
```

### Step 6: File Upload Configuration

Set up file upload service (using AWS S3, Google Cloud Storage, or similar):

```javascript
// api/services/fileUpload.js
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

async function uploadFile(file, folder) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${folder}/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'private'
  };
  
  const result = await s3.upload(params).promise();
  return result.Location;
}

module.exports = { upload, uploadFile };
```

### Step 7: Testing

Run the test suite:

```bash
# Unit tests
npm test -- --grep "Cost Tracking"

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e -- --spec "cost-tracking.spec.ts"
```

### Step 8: Deployment Checklist

- [ ] Database migrations applied
- [ ] API routes deployed
- [ ] File upload service configured
- [ ] Grok AI service connected
- [ ] Environment variables set
- [ ] SSL certificates installed
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] Monitoring setup
- [ ] Backup strategy implemented

---

## 🎯 Feature Verification

### Test Scenarios:

1. **Add Input Purchase**
   - Create new purchase
   - Verify Grok AI analysis
   - Check database entry
   - Confirm file upload

2. **Update Quantity Used**
   - Edit quantity inline
   - Verify remaining calculation
   - Check inventory update

3. **Add Activity with Related Inputs**
   - Select multiple inputs
   - Verify expense breakdown
   - Check database storage

4. **Daily Profit Calculation**
   - Add purchases, expenses, sales
   - Verify summary cards
   - Check net profit accuracy

5. **Grok AI Alerts**
   - Create high-risk transaction
   - Verify alert display
   - Check recommendations

---

## 📊 Performance Optimization

### Database Indexing:
```sql
-- Already included in schema:
INDEX idx_producer_date (producer_id, purchase_date)
INDEX idx_category (category)
INDEX idx_risk_level (grok_risk_level)
INDEX idx_activity_type (activity_type)
```

### Frontend Optimization:
- Use React.memo for table rows
- Implement virtual scrolling for large datasets
- Debounce API calls
- Cache Grok AI results

### Backend Optimization:
- Enable query caching
- Use connection pooling
- Implement Redis for session management
- CDN for file uploads

---

## 🔒 Security Checklist

- [ ] Input sanitization on all fields
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] File upload validation (type, size, content)
- [ ] Rate limiting on API endpoints
- [ ] Authentication middleware
- [ ] Authorization checks
- [ ] Encrypted file storage
- [ ] Audit logging

---

## 📞 Support & Troubleshooting

### Common Issues:

**Issue:** Grok AI not working  
**Solution:** Check API credentials, verify service is running

**Issue:** File uploads failing  
**Solution:** Check storage permissions, verify file size limits

**Issue:** Summary cards showing 0  
**Solution:** Verify date filter, check database entries

**Issue:** Quantity used validation error  
**Solution:** Ensure quantity_used <= quantity_purchased

---

## 🎉 You're All Set!

The Input Cost & Expense Tracking system is now fully integrated. Users can:
- ✅ Track all input purchases with AI fraud detection
- ✅ Log activity expenses with multi-input linking
- ✅ Monitor daily profit/loss in real-time
- ✅ Upload invoices, receipts, and photos
- ✅ Get intelligent insights from Grok AI

**Next Steps:**
1. Train producers on the new features
2. Monitor Grok AI alerts
3. Collect feedback for improvements
4. Expand to other user roles (traders, buyers)

Happy tracking! 🚀
