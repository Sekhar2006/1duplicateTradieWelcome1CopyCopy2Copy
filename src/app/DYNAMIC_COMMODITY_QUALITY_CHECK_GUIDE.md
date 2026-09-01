# Dynamic Commodity Quality Check - Complete Guide

## 🎯 Overview
This guide explains how the TRADIE Quality Check system dynamically adapts grading criteria based on commodity selection, making the form intelligent and context-aware.

---

## 🔄 How Dynamic Fields Work

### Concept
Different commodities require different quality parameters:
- **Spices** → Aroma, Color, Moisture, Grade
- **Fruits** → Color, Size, Firmness, Grade  
- **Grains** → Size, Color, Moisture, Grade
- **Vegetables** → Size, Color, Firmness, Texture, Grade

### Implementation Flow

```
User selects commodity
         ↓
useEffect detects change
         ↓
Load commodity-specific config
         ↓
Reset grading state with new fields
         ↓
Render dynamic form fields
         ↓
User fills commodity-specific criteria
         ↓
Submit to API
```

---

## 📋 Configuration Structure

### 1. Grading Criteria Map

```typescript
const gradingCriteriaConfig = {
  default: {
    fields: ["size", "color", "grade"],
    labels: { size: "Size", color: "Color", grade: "Grade" },
    options: {
      size: ["Small", "Medium", "Large", "Extra Large"],
      color: ["Light", "Medium", "Dark", "Uniform Color"],
      grade: ["Grade C", "Grade B", "Grade A", "Premium (A+)"]
    }
  },
  Spices: {
    fields: ["aroma", "color", "moisture", "grade"],
    labels: { 
      aroma: "Aroma", 
      color: "Color", 
      moisture: "Moisture Content", 
      grade: "Grade" 
    },
    options: {
      aroma: ["Mild", "Moderate", "Strong", "Excellent/Strong"],
      color: ["Light Color", "Medium Color", "Rich Color", "Deep Color"],
      moisture: ["Above 15%", "10-15%", "Below 10%", "Below 8%"],
      grade: ["Grade C", "Grade B", "Grade A", "Export Quality"]
    }
  },
  // ... more commodities
};
```

---

## 🔧 React Implementation

### Step 1: State Management

```typescript
const [formData, setFormData] = useState({
  commodity: '',
  grading: {},
  // ... other fields
});

// Get current commodity config
const currentConfig = gradingCriteriaConfig[formData.commodity] || gradingCriteriaConfig.default;
```

### Step 2: Dynamic Field Reset

```typescript
useEffect(() => {
  if (!formData.commodity) return;

  // Get config for selected commodity
  const config = gradingCriteriaConfig[formData.commodity] || gradingCriteriaConfig.default;
  
  // Reset grading to match new fields
  const newGrading = {};
  config.fields.forEach(field => {
    newGrading[field] = '';
  });
  
  setFormData(prev => ({ ...prev, grading: newGrading }));
}, [formData.commodity]);
```

### Step 3: Dynamic Rendering

```tsx
{currentConfig.fields.map((field) => (
  <div key={field}>
    <Label htmlFor={field}>
      {currentConfig.labels[field]} *
    </Label>
    <Select
      value={formData.grading[field] || ''}
      onValueChange={(value) => handleGradingChange(field, value)}
    >
      <SelectTrigger id={field}>
        <SelectValue placeholder={`Select ${currentConfig.labels[field]}`} />
      </SelectTrigger>
      <SelectContent>
        {currentConfig.options[field]?.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
))}
```

---

## 📊 Complete Commodity Configurations

### Vegetables
```typescript
Vegetables: {
  fields: ["size", "color", "firmness", "texture", "grade"],
  labels: {
    size: "Size",
    color: "Color",
    firmness: "Firmness",
    texture: "Texture",
    grade: "Grade"
  },
  options: {
    size: ["Small", "Medium", "Large", "Extra Large"],
    color: ["Light", "Medium", "Dark", "Uniform Color"],
    firmness: ["Soft", "Medium Firm", "Firm", "Very Firm"],
    texture: ["Rough", "Medium", "Smooth", "Very Smooth"],
    grade: ["Grade C", "Grade B", "Grade A", "Premium (A+)"]
  }
}
```

### Spices
```typescript
Spices: {
  fields: ["aroma", "color", "moisture", "grade"],
  labels: {
    aroma: "Aroma Intensity",
    color: "Color Quality",
    moisture: "Moisture Content",
    grade: "Quality Grade"
  },
  options: {
    aroma: ["Mild", "Moderate", "Strong", "Excellent/Strong"],
    color: ["Light Color", "Medium Color", "Rich Color", "Deep Color"],
    moisture: ["Above 15%", "10-15%", "Below 10%", "Below 8%"],
    grade: ["Grade C", "Grade B", "Grade A", "Export Quality"]
  }
}
```

### Fruits
```typescript
Fruits: {
  fields: ["color", "size", "firmness", "grade"],
  labels: {
    color: "Color",
    size: "Size",
    firmness: "Firmness",
    grade: "Grade"
  },
  options: {
    color: ["Pale", "Light", "Medium", "Rich/Vibrant"],
    size: ["Small", "Medium", "Large", "Jumbo"],
    firmness: ["Soft", "Medium Firm", "Firm", "Very Firm"],
    grade: ["Grade C", "Grade B", "Grade A", "Premium (A+)"]
  }
}
```

### Grains
```typescript
Grains: {
  fields: ["size", "color", "moisture", "grade"],
  labels: {
    size: "Grain Size",
    color: "Color",
    moisture: "Moisture Content",
    grade: "Grade"
  },
  options: {
    size: ["Small", "Medium", "Bold", "Extra Bold"],
    color: ["Off-White", "Creamy", "Golden", "Uniform Color"],
    moisture: ["Above 14%", "12-14%", "10-12%", "Below 10%"],
    grade: ["Grade C", "Grade B", "Grade A", "Premium"]
  }
}
```

### Herbs
```typescript
Herbs: {
  fields: ["aroma", "color", "leafQuality", "moisture", "grade"],
  labels: {
    aroma: "Aroma",
    color: "Color",
    leafQuality: "Leaf Quality",
    moisture: "Moisture Content",
    grade: "Grade"
  },
  options: {
    aroma: ["Mild", "Moderate", "Strong", "Excellent"],
    color: ["Pale Green", "Light Green", "Medium Green", "Rich Green"],
    leafQuality: ["Fair", "Good", "Very Good", "Excellent"],
    moisture: ["Above 15%", "10-15%", "8-10%", "Below 8%"],
    grade: ["Grade C", "Grade B", "Grade A", "Premium"]
  }
}
```

### Oil Seeds
```typescript
"Oil Seeds": {
  fields: ["size", "color", "moisture", "oilContent", "grade"],
  labels: {
    size: "Size",
    color: "Color",
    moisture: "Moisture Content",
    oilContent: "Oil Content",
    grade: "Grade"
  },
  options: {
    size: ["Small", "Medium", "Large", "Bold"],
    color: ["Light", "Medium", "Dark", "Rich Color"],
    moisture: ["Above 10%", "8-10%", "6-8%", "Below 6%"],
    oilContent: ["Below 30%", "30-35%", "35-40%", "Above 40%"],
    grade: ["Grade C", "Grade B", "Grade A", "Premium"]
  }
}
```

---

## 🔄 API Payload Transformation

### Example 1: Spices Submission

**UI State:**
```typescript
{
  commodity: "Spices",
  grading: {
    aroma: "Excellent/Strong",
    color: "Rich Color",
    moisture: "Below 10%",
    grade: "Export Quality"
  }
}
```

**API Payload:**
```json
{
  "commodity": "Spices",
  "grading": {
    "aroma": "Excellent/Strong",
    "color": "Rich Color",
    "moisture": "Below 10%",
    "grade": "Export Quality"
  }
}
```

### Example 2: Vegetables Submission

**UI State:**
```typescript
{
  commodity: "Vegetables",
  grading: {
    size: "Large",
    color: "Uniform Color",
    firmness: "Firm",
    texture: "Smooth",
    grade: "Premium (A+)"
  }
}
```

**API Payload:**
```json
{
  "commodity": "Vegetables",
  "grading": {
    "size": "Large",
    "color": "Uniform Color",
    "firmness": "Firm",
    "texture": "Smooth",
    "grade": "Premium (A+)"
  }
}
```

---

## 💡 User Experience Flow

### Scenario: Producer Submitting Spices Quality Check

**Step 1: Select Commodity**
```
User selects "Spices" from dropdown
→ Form shows: Aroma, Color, Moisture, Grade fields
→ Badge displays: "📊 4 grading criteria for Spices"
```

**Step 2: Fill Grading Criteria**
```
Aroma: "Excellent/Strong"
Color: "Rich Color"
Moisture: "Below 10%"
Grade: "Export Quality"
```

**Step 3: Complete Other Fields**
```
Harvest Method: Manual Labor ✓
Processing Done: Yes ✓
Self-Assessment: Completed ✓
  Comments: "Excellent aroma, rich color, properly dried"
Packing Details:
  - Number of Bags: 50
  - Variety: "Guntur Sannam Chili"
  - Harvest Date: 2025-10-15
  - Packing Date: 2025-10-20
```

**Step 4: Submit**
```
Backend receives:
{
  "producerId": "PROD1234",
  "commodity": "Spices",
  "grading": {
    "aroma": "Excellent/Strong",
    "color": "Rich Color",
    "moisture": "Below 10%",
    "grade": "Export Quality"
  },
  "harvestMethod": ["labor"],
  "processingDone": true,
  "qualityCheckTiers": {
    "selfAssessment": {
      "completed": true,
      "comments": "Excellent aroma, rich color, properly dried"
    }
  },
  "packingDetails": {
    "numberOfBags": 50,
    "variety": "Guntur Sannam Chili",
    "harvestDate": "2025-10-15",
    "packingDate": "2025-10-20"
  }
}
```

**Step 5: Success**
```
✅ Quality check submitted successfully!
Token ID: TRD-SPI-789456
QR Code: [Generated QR Code URL]
```

---

## 🧪 Testing Different Commodities

### Test 1: Switch from Vegetables to Spices

**Initial State (Vegetables):**
```typescript
commodity: "Vegetables"
grading: {
  size: "Large",
  color: "Uniform Color",
  firmness: "Firm",
  texture: "Smooth",
  grade: "A"
}
```

**After Switching to Spices:**
```typescript
commodity: "Spices"
grading: {
  aroma: "",      // NEW FIELD
  color: "",      // RESET
  moisture: "",   // NEW FIELD
  grade: ""       // RESET
}
// Fields removed: size, firmness, texture
```

### Test 2: "Others" Commodity

**When selecting "Others":**
```tsx
{
  commodity: "Others",
  otherCommodity: "Turmeric Powder",
  grading: {
    quality: "Excellent",
    appearance: "Good",
    grade: "Premium"
  }
}
```

---

## 📝 Implementation Checklist

### Basic Implementation
- ✅ Create commodity list array
- ✅ Create grading criteria config object
- ✅ Set up form state with grading object
- ✅ Add useEffect to reset grading on commodity change
- ✅ Implement dynamic field rendering
- ✅ Add proper labels and options
- ✅ Handle "Others" commodity case

### Advanced Features
- ✅ Add field validation
- ✅ Show active field count badge
- ✅ Provide default options for each field
- ✅ Handle API submission
- ✅ Show success/error states
- ✅ Add loading indicators

### User Experience
- ✅ Smooth transitions when switching commodities
- ✅ Clear field labels
- ✅ Helpful placeholder text
- ✅ Visual feedback for selected commodity
- ✅ Error messages for missing fields

---

## 🎨 UI Components Used

### SimplifiedQualityCheckForm.tsx
```typescript
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
```

### Styling
- Gradient background: `bg-gradient-to-b from-[#F7FAFC] to-[#D9F2FF]`
- Primary text color: `text-[#003E6D]`
- Accent color: `bg-[#FFD700]`
- Card transparency: `bg-white/90 backdrop-blur-sm`

---

## 🚀 How to Use

### For Developers

**1. Import the Component:**
```typescript
import SimplifiedQualityCheckForm from './components/producer-dashboard/SimplifiedQualityCheckForm';
```

**2. Add to Your App:**
```tsx
function App() {
  return (
    <SimplifiedQualityCheckForm />
  );
}
```

**3. Customize Commodity Config:**
Edit the `gradingCriteriaConfig` object to add/modify commodities

### For Producers

**1. Select Commodity:**
- Choose from 12 commodity types
- Or select "Others" and specify

**2. Fill Grading Criteria:**
- Form automatically shows relevant fields
- All options are pre-defined dropdowns

**3. Complete Other Sections:**
- Harvest method
- Processing status
- Quality assessment
- Packing details

**4. Submit:**
- Click "Submit Quality Check"
- Receive token ID and QR code

---

## 📊 Comparison: Static vs Dynamic

### Static Form (Old Way)
```tsx
// All fields shown for all commodities
<Input name="size" />
<Input name="color" />
<Input name="aroma" />
<Input name="moisture" />
<Input name="firmness" />
<Input name="oilContent" />
// ... many more fields
```

**Problems:**
- ❌ Confusing for users
- ❌ Irrelevant fields
- ❌ Poor UX
- ❌ Data quality issues

### Dynamic Form (New Way)
```tsx
// Only relevant fields shown
{currentConfig.fields.map(field => (
  <Select key={field}>
    {/* Field-specific options */}
  </Select>
))}
```

**Benefits:**
- ✅ Clean, focused UI
- ✅ Only relevant fields
- ✅ Better UX
- ✅ Higher data quality
- ✅ Faster completion

---

## 🎯 Files Structure

```
components/producer-dashboard/
├── SimplifiedQualityCheckForm.tsx       # Simplified demo
├── QualityCheckWorkflow.tsx             # Full workflow (6 steps)
├── QualityCheckAPI.ts                   # API service
├── CommodityConfig.ts                   # TypeScript config
└── commodity-config.json                # JSON config
```

---

## 📚 Related Documentation

- [QUALITY_CHECK_API_INTEGRATION_COMPLETE.md](./QUALITY_CHECK_API_INTEGRATION_COMPLETE.md) - Full API docs
- [QUALITY_CHECK_REACT_BACKEND_INTEGRATION.md](./QUALITY_CHECK_REACT_BACKEND_INTEGRATION.md) - Integration guide
- [QUALITY_VERIFICATION_DYNAMIC_CONFIG_COMPLETE.md](./QUALITY_VERIFICATION_DYNAMIC_CONFIG_COMPLETE.md) - Config system
- [QUALITY_VERIFICATION_UI_SPEC_COMPLETE.md](./QUALITY_VERIFICATION_UI_SPEC_COMPLETE.md) - UI specifications

---

## ✅ Status: COMPLETE

**Last Updated:** October 22, 2025

**Components:**
- ✅ SimplifiedQualityCheckForm.tsx (demo)
- ✅ QualityCheckWorkflow.tsx (full system)
- ✅ Dynamic commodity configuration
- ✅ 12 commodity types supported
- ✅ 60+ grading criteria options
- ✅ Backend API integration
- ✅ Validation & error handling

**Ready for:** Production Use 🚀
