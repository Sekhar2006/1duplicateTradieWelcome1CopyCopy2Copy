# 🗺️ Input Cost & Expense Tracking - Component Structure Map

## 📐 Visual Component Hierarchy

```
InputCostTrackerEnhanced
├── 📊 Header Section
│   ├── Title + Grok Health Badge
│   ├── Date Picker
│   └── Export Report Button
│
├── 💳 Summary Cards (4-Column Grid)
│   ├── Card 1: Total Input Costs (Red)
│   ├── Card 2: Total Activity Expenses (Yellow)
│   ├── Card 3: Sales Income (Green) + Quick Add Button
│   └── Card 4: Net Profit (Dynamic Color)
│
├── 📦 Input Costs & Inventory Section
│   ├── Section Header
│   │   ├── Title + Inventory Value
│   │   └── "Add Input Purchase" Button
│   │
│   ├── Data Table
│   │   ├── Table Header (11 columns)
│   │   └── Table Rows
│   │       ├── Product Name + Grok Risk Badge
│   │       ├── Category Badge
│   │       ├── Purchase Date
│   │       ├── Qty Purchased
│   │       ├── **Qty Used (Editable Inline)** ⭐
│   │       │   ├── Display Mode (clickable)
│   │       │   └── Edit Mode (input + Save/Cancel)
│   │       ├── **Remaining Qty (Auto-calc)** ⭐
│   │       ├── Price/Unit
│   │       ├── Total Cost (Auto-calc)
│   │       ├── Supplier
│   │       ├── Upload Buttons (Invoice/Photo)
│   │       └── Actions (Edit/Delete)
│   │
│   └── Add Purchase Modal
│       ├── Product Name Input
│       ├── Category Dropdown (with "Others")
│       ├── Quantity + Unit + Price Fields
│       ├── Purchase Date Picker
│       ├── Supplier Input
│       ├── Total Cost Display (Auto-calc)
│       ├── Upload Buttons (Invoice/Photo/Voice)
│       ├── Notes Textarea
│       └── Save Button (with Grok Check)
│
├── 💰 Activity Expenses Section
│   ├── Section Header
│   │   ├── Title
│   │   └── "Add Activity Expense" Button
│   │
│   ├── Data Table
│   │   ├── Table Header (10 columns)
│   │   └── Table Rows
│   │       ├── Activity Name + Grok Risk Badge
│   │       ├── Activity Type Badge
│   │       ├── Activity Date
│   │       ├── **Related Inputs (Multi-Badge Display)** ⭐
│   │       ├── Labor Cost
│   │       ├── Machinery Rent
│   │       ├── Other Costs
│   │       ├── Total Expense (Auto-calc)
│   │       ├── Upload Buttons (Receipt/Photo)
│   │       └── Actions (Edit/Delete)
│   │
│   └── Add Expense Modal
│       ├── Activity Name + Type Inputs
│       ├── Date Picker
│       ├── **Related Inputs Multi-Select** ⭐
│       │   ├── Show/Hide Toggle (with count)
│       │   └── Checkbox List (all purchases)
│       ├── Expense Breakdown Section
│       │   ├── Labor Cost Input
│       │   ├── Machinery Rent Input
│       │   └── Other Cost Input
│       ├── Total Expense Display (Auto-calc)
│       ├── Upload Buttons (Receipt/Photo)
│       ├── Remarks Textarea
│       └── Save Button (with Grok Check)
│
└── 💵 Add Sale Modal (Triggered from Summary Card)
    ├── Crop/Product Input
    ├── Quantity + Price Inputs
    ├── Sale Date Picker
    ├── Buyer Input
    ├── Total Income Display (Auto-calc)
    └── Save Button
```

---

## 🎨 Design System Component Usage

```typescript
// From design-system/
DSButton      → All action buttons
DSCard        → Summary cards, section containers
DSBadge       → Category, type, risk level indicators
designTokens  → Colors, typography, spacing

// From components/ui/
Dialog        → Add purchase, expense, sale modals
Input         → All text/number/date inputs
Label         → Form field labels
Select        → Dropdown selectors (category, type, unit)
Textarea      → Notes/remarks fields
Table         → Data display tables
Checkbox      → Related inputs multi-select
Separator     → Section dividers

// Icons (lucide-react)
Plus          → Add buttons
Package       → Input costs icon
ShoppingCart  → Purchases icon
Calendar      → Date fields
DollarSign    → Currency
Upload        → File upload
Camera        → Photo capture
Mic           → Voice notes
Edit          → Edit actions
Trash2        → Delete actions
TrendingUp    → Profit/income icons
TrendingDown  → Loss/expense icons
Download      → Export button
AlertCircle   → Risk warnings
Sparkles      → Grok AI indicators
Check         → Save/confirm
XCircle       → Cancel
```

---

## 🔄 Data Flow Diagram

```
User Input
    ↓
Form Validation
    ↓
Grok AI Analysis ← Historical Data
    ↓
Risk Score Calculated
    ↓
Data Saved to State
    ↓
API Call (POST/PUT) → Database
    ↓
Response Received
    ↓
UI Updates:
├── Table Row Added/Updated
├── Summary Cards Recalculated
├── Inventory Value Updated
└── Toast Notification
```

---

## 📊 State Management

```typescript
// Component State
const [purchases, setPurchases] = useState<InputPurchase[]>([...])
const [expenses, setExpenses] = useState<ActivityExpense[]>([...])
const [sales, setSales] = useState<SalesEntry[]>([...])

// Form States
const [newPurchase, setNewPurchase] = useState<Partial<InputPurchase>>({...})
const [newExpense, setNewExpense] = useState<Partial<ActivityExpense>>({...})
const [newSale, setNewSale] = useState<Partial<SalesEntry>>({...})

// UI States
const [showAddPurchase, setShowAddPurchase] = useState(false)
const [showAddExpense, setShowAddExpense] = useState(false)
const [showAddSale, setShowAddSale] = useState(false)
const [selectedDate, setSelectedDate] = useState(today)
const [editingPurchaseId, setEditingPurchaseId] = useState<string | null>(null)
const [editingQtyUsed, setEditingQtyUsed] = useState<number>(0)
const [showRelatedInputs, setShowRelatedInputs] = useState(false)

// Computed States
const dailySummary = calculateDailySummary(selectedDate)
const totalInventoryValue = calculateInventoryValue(purchases)
const systemHealth = grokAI.getSystemHealth({...})
```

---

## 🎯 Key Event Handlers

```typescript
// Purchase Handlers
handleAddPurchase()           // Validates, runs Grok AI, saves
handleUpdateQuantityUsed()    // Inline edit save
handleDeletePurchase()        // Remove with confirmation

// Expense Handlers
handleAddExpense()            // Validates, runs Grok AI, saves
handleToggleRelatedInput()    // Multi-select checkbox toggle
handleDeleteExpense()         // Remove with confirmation

// Sale Handlers
handleAddSale()               // Validates, saves

// UI Handlers
handleFileUpload()            // Process invoice/photo/voice uploads
setSelectedDate()             // Filter by date, recalculate
```

---

## 🗂️ File Structure

```
/components/producer-dashboard/
├── InputCostTrackerEnhanced.tsx    (Main component - 2000+ lines)
├── GrokAIService.tsx               (AI fraud detection service)
├── ActivityLogger.tsx              (Related component)
├── FinanceSection.tsx              (Related component)
└── ... (other producer dashboard components)

/components/
├── InputCostDemo.tsx               (Demo wrapper)
└── ui/                             (Shadcn components)
    ├── dialog.tsx
    ├── input.tsx
    ├── select.tsx
    ├── table.tsx
    ├── checkbox.tsx
    └── ...

/design-system/
├── components/
│   ├── DSButton.tsx
│   ├── DSCard.tsx
│   └── DSBadge.tsx
└── tokens.ts                       (Design tokens)
```

---

## 🔌 API Integration Points

```typescript
// Purchase API
POST   /api/purchases/add
PUT    /api/purchases/:id/update-quantity
GET    /api/purchases/:producer_id
DELETE /api/purchases/:id

// Expense API
POST   /api/expenses/add
GET    /api/expenses/:producer_id
DELETE /api/expenses/:id

// Sale API
POST   /api/sales/add
GET    /api/sales/:producer_id

// Summary API
GET    /api/financial-summary/:producer_id?date=YYYY-MM-DD

// File Upload API
POST   /api/uploads/invoice
POST   /api/uploads/photo
POST   /api/uploads/voice

// Grok AI API
POST   /api/grok/analyze-transaction
GET    /api/grok/system-health
```

---

## 🎨 Styling Breakdown

```typescript
// Colors Used
Blue Primary (#003E6D)     → Headings, text
Gold (#FFD700)             → Buttons, accents, borders
Gradient Background        → #F7FAFC → #D9F2FF
Green (#27AE60)            → Success, profit
Red (#E74C3C)              → Error, loss, costs
Yellow (#E2B93B)           → Warning, expenses
Info Blue (#2F80ED)        → Info badges

// Typography
Playfair Display (heading) → Main titles
Montserrat (label)         → Buttons, labels, badges
Lato (body)                → Table content, descriptions

// Spacing
padding: 24px              → Cards, sections
gap: 16px                  → Grid gaps
margin-bottom: 24px        → Section spacing

// Radius
rounded-2xl (32px)         → Cards
rounded-lg (12px)          → Buttons, badges
rounded (8px)              → Inputs, tables
```

---

## 📱 Responsive Layout

```css
/* Mobile (< 768px) */
.summary-grid {
  grid-template-columns: 1fr;  /* Single column */
}
.table {
  overflow-x: auto;            /* Horizontal scroll */
}
.modal {
  max-width: 95vw;             /* Full width modal */
}

/* Tablet (768px - 1024px) */
.summary-grid {
  grid-template-columns: repeat(2, 1fr);  /* 2 columns */
}

/* Desktop (> 1024px) */
.summary-grid {
  grid-template-columns: repeat(4, 1fr);  /* 4 columns */
}
.table {
  width: 100%;                 /* Full table width */
}
```

---

## 🔥 Performance Optimizations

```typescript
// Memoization
const TableRow = React.memo(({ purchase }) => {...})

// Debouncing
const debouncedSearch = useDebouncedCallback(searchFn, 300)

// Lazy Loading
const expensesData = useLazyQuery(GET_EXPENSES, { 
  variables: { date: selectedDate } 
})

// Virtual Scrolling (for large datasets)
import { useVirtualizer } from '@tanstack/react-virtual'

// Code Splitting
const InputCostTracker = lazy(() => 
  import('./components/producer-dashboard/InputCostTrackerEnhanced')
)
```

---

## 🧪 Testing Strategy

```typescript
// Unit Tests
describe('InputCostTrackerEnhanced', () => {
  test('renders summary cards')
  test('calculates daily profit correctly')
  test('validates quantity used <= purchased')
  test('multi-select related inputs works')
  test('Grok AI risk scoring')
})

// Integration Tests
test('Add purchase → saves to DB → updates UI')
test('Edit quantity → validates → updates remaining')
test('Delete expense → removes from DB → recalculates summary')

// E2E Tests
test('Complete purchase flow from button to table')
test('Complete expense flow with related inputs')
test('Date filter updates all sections')
```

---

## 🎯 Component Props Interface

```typescript
interface InputCostTrackerEnhancedProps {
  // No required props - component is self-contained
  // Optional:
  producerId?: number;        // Filter data by producer
  onDataChange?: () => void;  // Callback when data changes
  readOnly?: boolean;         // Disable editing
  showGrokAI?: boolean;       // Toggle AI features
}
```

---

## 🔗 Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "motion": "^11.x",              // Animations
    "lucide-react": "^0.x",         // Icons
    "sonner@2.0.3": "^2.x",        // Toast notifications
    "@radix-ui/react-*": "^1.x",   // UI primitives
    "tailwindcss": "^4.x"           // Styling
  }
}
```

---

## 📊 Data Models (TypeScript)

```typescript
interface InputPurchase {
  id: string;
  productName: string;
  category: string;
  quantityPurchased: number;
  quantityUsed: number;            // Editable
  unit: string;
  pricePerUnit: number;
  totalCost: number;               // Calculated
  purchaseDate: string;
  supplier: string;
  invoiceUrl?: string;
  photoUrl?: string;
  voiceNoteUrl?: string;
  notes?: string;
  grokScore?: GrokFraudScore;      // AI analysis
}

interface ActivityExpense {
  id: string;
  activityName: string;
  activityType: string;
  date: string;
  relatedInputs: string[];         // Multi-select array
  expenseAmount: number;           // Total
  laborCost?: number;
  machineryRent?: number;
  otherCost?: number;
  receiptUrl?: string;
  photoUrl?: string;
  notes?: string;
  grokScore?: GrokFraudScore;
}

interface SalesEntry {
  id: string;
  crop: string;
  quantity: number;
  pricePerUnit: number;
  totalIncome: number;             // Calculated
  saleDate: string;
  buyer: string;
}

interface GrokFraudScore {
  score: number;                   // 0-100
  level: "safe" | "low" | "medium" | "high" | "critical";
  reason: string;
  flags: string[];
  recommendations: string[];
}
```

---

## 🎓 Learning Path

**For New Developers:**

1. **Start Here:** Review `INPUT_COST_EXPENSE_TRACKING_V2_COMPLETE.md`
2. **Understand Design:** Check `/design-system/tokens.ts`
3. **Study Component:** Read `InputCostTrackerEnhanced.tsx` comments
4. **Test Locally:** Run demo from App.tsx welcome screen
5. **Review API:** Check `COST_TRACKING_IMPLEMENTATION_GUIDE.md`
6. **Database:** Understand schema from this document
7. **Deploy:** Follow deployment checklist

**Time to Proficiency:** 2-3 hours with provided docs

---

## 🚀 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Access demo
# Open browser → Welcome → Producer Flow → Cost Tracking (NEW)

# 4. Database setup
cd database
mysql -u root -p < schema_mysql.sql

# 5. Start API server
cd api
npm install
npm start
```

---

**🗺️ Use this map to navigate the codebase efficiently!**  
**Print and keep handy for development reference.**

---

*Component Structure Map v9.0*  
*Last Updated: October 22, 2025*
