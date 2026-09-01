# Producer AI Dashboard Wireframes - Simplified Text Specification

## 📋 Complete Text Content & UI Components (Simplified Version)

---

## 1️⃣ Grading Completion Screen

### Content

**Title**: "Grading Completed"

**Message**: "The grading for batch [BatchID] is done."

**Button**: "Create Lots"

### Components

- ✅ Headline text (h1 - Playfair Display, #003E6D)
- ✅ Paragraph text (Lato, gray)
- ✅ Primary Button (large, centered, gold #FFD700)
- ✅ Step progress indicator (1 of 4)
- ✅ Batch summary cards
- ✅ Grade breakdown with progress bars

### Implementation

```tsx
Title: "Grading Completed"
Message: "The grading for batch BTH-2025-001234 is done."
Button: "Create Lots" (Gold background)
```

---

## 2️⃣ Create Lots Screen

### Content

**Title**: "Create Lots"

**Instruction**: "Add lots with quality grades, quantities, and descriptions."

**Inputs**:
- Dropdown for "Lot Quality" (A, B, C grades)
- Numeric input for "Quantity"
- Multiline text box for "Description"

**Buttons**:
- "Add Lot"
- "Proceed to Tokenization"

**List/Table**: "Lots Added" with Edit/Delete icons per row

### Components

- ✅ Select / Dropdown (quality grades)
- ✅ Number Input (quantity in kg)
- ✅ Textarea (description)
- ✅ List or Table with action icons
- ✅ Buttons (Add Lot - Gold, Proceed - Blue)
- ✅ Edit icon (blue pencil)
- ✅ Delete icon (red trash)
- ✅ Step progress indicator (2 of 4)

### Implementation

```tsx
Title: "Create Lots"
Instruction: "Add lots with quality grades, quantities, and descriptions."

Form Fields:
- Label: "Lot Quality *"
  - Dropdown: Grade A, Grade B, Grade C
- Label: "Quantity (kg) *"
  - Input: Number field
- Label: "Description"
  - Input: Text field
- Label: "Special Notes"
  - Textarea: Multi-line input

Button: "Add Lot" (Gold #FFD700)

List Header: "Lots Added"
- Shows count of lots created
- Each row has Edit and Delete icons
- Color-coded grade badges

Bottom Button: "Proceed to Tokenization" (Blue #003E6D)
```

---

## 3️⃣ Lots Overview Screen

### Content

**Title**: "Lots Overview"

**Columns**: "Lot ID," "Quality Grade," "Quantity," "Tokenization Status," "Actions"

**Token Status badges**: 
- "Not Tokenized" (Gray)
- "In Progress" (Blue)
- "Tokenized" (Green)

### Components

- ✅ Table component with sortable columns
- ✅ Status badges (color coded)
- ✅ Action Buttons in table rows
- ✅ Global Batch ID display (highlighted)
- ✅ Stats cards (Total, Completed, In Progress, Not Started)
- ✅ Step progress indicator (3 of 4)

### Implementation

```tsx
Title: "Lots Overview"

Stats Cards:
- Total Lots
- Completed
- In Progress  
- Not Started

Table Columns:
1. Lot ID (font-mono)
2. Quality Grade (color badge: Green/Blue/Orange)
3. Quantity (kg)
4. Description
5. Tokenization Status (badge)
6. Token ID (if completed)
7. Actions (buttons)

Status Badges:
- "Not Tokenized" - Gray (#9CA3AF)
- "In Progress" - Blue (#3B82F6)
- "Tokenized" - Green (#10B981)
- "Failed" - Red (#EF4444)

Action Buttons:
- "Start" - for not started
- "Processing..." - for in progress
- "View" - for completed
- "Retry" - for failed
```

---

## 4️⃣ Tokenization Process Screen

### Content

**Title**: "Tokenization Process"

**Status message**: "Generating token IDs for each lot..."

**Progress indicator** (spinner/bar)

**Button**: "Add/Edit Token Details"

### Components

- ✅ Progress Bar or Spinner
- ✅ Notification Text
- ✅ Button
- ✅ 6-step process visualization
- ✅ Status icons (pending/in-progress/completed/failed)
- ✅ Step progress indicator (3 of 4)

### Implementation

```tsx
Title: "Tokenization Process"
Subtitle: "Generating token IDs for each lot..."

Initial Status: "Ready to generate token ID"
Button: "Start Tokenization" (Gold)

Progress Steps:
1. Validating Lot Data
2. Generating Global Batch ID
3. Generating Unique Token ID
4. Recording on Blockchain
5. Generating QR Code
6. Preparing Metadata

Status Icons:
- Pending: Empty circle
- In Progress: Blue spinner
- Completed: Green checkmark
- Failed: Red X

Success Card:
- "Tokenization Successful!"
- Global Batch ID
- Token ID
- Blockchain Hash
- Timestamp

Button: "Add/Edit Token Details" (Blue #003E6D)
```

---

## 5️⃣ Token Details & Verification Screen

### Content

**Title**: "Token Details & Verification"

**Sections**:
1. Upload certificates
2. Verifier comments (multi-line input)
3. AI insights display (charts, stats)
4. History log of verifications and updates

**Buttons**: "Add Verifier Info," "Save & Publish"

### Components

- ✅ File Upload (drag-and-drop)
- ✅ Text Input (multi-line textarea)
- ✅ Card or Chart components
- ✅ Scrollable history list
- ✅ Buttons
- ✅ 4-tab navigation
- ✅ Step progress indicator (4 of 4)

### Implementation

```tsx
Title: "Token Details & Verification"
Subtitle: "Upload certificates, add verifier comments, view AI insights, and review history"

Tab 1: Certificates
- Heading: "Upload Certificates"
- Description: "Upload quality certificates, lab reports, and other documents"
- File types: PDF, JPG, PNG, DOC up to 10MB
- Upload area: Drag and drop or click
- Uploaded list: File name, date, download/remove buttons

Tab 2: Verifier Info
- Heading: "Verifier Comments"
- Fields:
  * Verifier Name *
  * Organization *
  * Role/Position
  * Comments (textarea)
- Button: "Save Verifier Info" (Gold)

Tab 3: AI Insights
- Heading: "AI Insights Display"
- Description: "View AI-powered insights with charts and statistics"
- Insight cards showing:
  * Type badge
  * Message
  * Confidence % with progress bar
  * Timestamp
- Alert: "AI Fraud Detection Active"

Tab 4: History Log
- Heading: "History Log"
- Description: "Scrollable list of verifications and updates"
- Log entries:
  * Event name
  * Timestamp
  * User/action

Bottom Button: "Save & Publish" (Blue #003E6D)
```

---

## 6️⃣ Buyer Verification View

### Content

**Title**: "Product & History Details"

**Details**:
- Summary of product information
- Cultivation timeline
- Certificates and proofs
- AI-driven insights summary
- Token/NFT input or QR code scan section

### Components

- ✅ Timeline component
- ✅ List or Card views
- ✅ QR Code Scanner or Input Box
- ✅ Highlight panels for insights
- ✅ 4-tab detailed information
- ✅ Share & Download buttons

### Implementation

```tsx
Title: "Product & History Details"
Subtitle: "Verify product authenticity and view complete cultivation history"

Search Section:
- Heading: "Token/NFT Input"
- Description: "Enter token ID or scan QR code"
- Input: "Enter Token ID or Batch ID"
- Buttons: "Verify" (Gold), "Scan QR Code" (outline)

Verified Banner:
- Green background with checkmark
- "Verified Product Information"
- Message: "This product has been verified on the blockchain and all certifications are valid"
- Buttons: "Share", "Download Report"

Product Overview Cards:
- Product name
- Quality Grade badge
- Quantity
- Token ID (abbreviated)

Producer Info:
- Producer name (verified badge)
- Location
- Rating (5.0 stars)

Tab 1: Timeline
- Heading: "Cultivation Timeline"
- Description: "View complete journey from sowing to harvest"
- Timeline entries with dates and locations

Tab 2: Certificates
- Heading: "Certificates and Proofs"
- Description: "View all linked certificates and verification documents"
- Certificate cards with:
  * Name
  * Issuer
  * Issue date
  * "Valid" badge (green)
- Verifier section with comments

Tab 3: AI Insights
- Heading: "AI-Driven Insights Summary"
- Description: "View AI-powered quality analysis and fraud detection"
- Metrics:
  * Quality Score: 94/100 (excellent)
  * Fraud Risk: Low 2% (safe)
  * Market Value: ₹2,850/quintal (premium)
- Alert: "Fraud Detection: All Clear"

Tab 4: Blockchain
- Heading: "Blockchain Verification"
- Fields:
  * Global Batch ID
  * Token ID
  * Blockchain Transaction Hash
- Badge: "Blockchain Verified" ✓
```

---

## 🎨 General UI Specifications

### Consistent Colors for Qualities and Statuses

#### Quality Grades
- **Grade A**: Green `#10B981`
- **Grade B**: Blue `#3B82F6`
- **Grade C**: Orange `#F97316`

#### Tokenization Status
- **Not Tokenized**: Gray `#9CA3AF`
- **In Progress**: Blue `#3B82F6`
- **Tokenized**: Green `#10B981`
- **Failed**: Red `#EF4444`

#### Verification Status
- **Verified**: Green `#10B981`
- **Pending**: Yellow `#F59E0B`
- **Invalid**: Red `#EF4444`

### Stepper / Progress Bar

All producer screens (1-5) include 4-step progress:

```
1. Grading → 2. Lots → 3. Tokenization → 4. Verification
```

- **Active**: Gold circle `#FFD700`
- **Completed**: Green circle `#10B981` with ✓
- **Pending**: Gray circle `#D1D5DB`
- **Lines**: Gray → Green as progress

### Clear Primary Buttons with Action Emphasis

- **Primary CTAs**: Gold background `#FFD700`, white text, large size
- **Secondary CTAs**: Blue background `#003E6D`, white text
- **Tertiary**: Outline style with gray border
- **Placement**: Centered or right-aligned, prominent

### Intuitive Icons

| Action | Icon | Color |
|--------|------|-------|
| Edit | Edit2 / Pencil | Blue |
| Delete | Trash2 | Red |
| Upload | Upload | Gray/Gold |
| Download | Download | Gray |
| Info | AlertCircle | Blue/Yellow |
| Success | CheckCircle2 | Green |
| Warning | AlertCircle | Yellow |
| Error | XCircle | Red |
| Processing | Loader2 (spinning) | Blue |
| QR Scan | QrCode | Gray |
| Share | Share2 | Gray |
| View | Eye | Gray |

### Responsive Design

#### Desktop (> 1024px)
- Two-column layouts
- Side-by-side forms
- Full tables visible
- Large buttons

#### Tablet (768px - 1024px)
- Adjusted columns
- Some stacking
- Collapsible sections
- Medium buttons

#### Mobile (< 768px)
- Single column
- Stacked elements
- Bottom sheets for modals
- Full-width buttons
- Touch-friendly spacing

---

## 📐 Layout Patterns

### Card-Based Layout
All screens use white cards with:
- `bg-white/90` (90% opacity white)
- `backdrop-blur-sm` (blur effect)
- `shadow-lg` (large shadow)
- Rounded corners
- Padding: `p-6` to `p-8`

### Gradient Background
All screens share:
```css
background: linear-gradient(to bottom, #F7FAFC, #D9F2FF);
```

### Spacing System
- Between sections: `mb-6` to `mb-8` (1.5rem - 2rem)
- Between elements: `mb-4` (1rem)
- Between form fields: `space-y-4` (1rem gap)
- Card padding: `p-6` mobile, `p-8` desktop

---

## 🔤 Typography Hierarchy

### Headings
- **h1 (Screen titles)**: Playfair Display, `#003E6D`, large
- **h3 (Section titles)**: Playfair Display, `#003E6D`, medium

### Body Text
- **Primary**: Lato, `#1F2937`
- **Secondary**: Lato, `#6B7280`
- **Helper**: Lato, `#9CA3AF`, smaller

### Labels & Buttons
- **Form labels**: Montserrat, `#374151`
- **Button text**: Montserrat, sentence case
- **Badges**: Montserrat, white on colored background

---

## ✅ Implementation Checklist

### Screen 1: Grading Completion
- [x] Title: "Grading Completed"
- [x] Message: "The grading for batch [BatchID] is done."
- [x] Button: "Create Lots" (Gold, large, centered)
- [x] Step progress (1/4)
- [x] Batch summary
- [x] Grade breakdown

### Screen 2: Create Lots
- [x] Title: "Create Lots"
- [x] Instruction text simplified
- [x] Dropdown: "Lot Quality"
- [x] Number input: "Quantity"
- [x] Textarea: "Description"
- [x] Button: "Add Lot"
- [x] List: "Lots Added"
- [x] Edit/Delete icons
- [x] Button: "Proceed to Tokenization"
- [x] Step progress (2/4)

### Screen 3: Lots Overview
- [x] Title: "Lots Overview"
- [x] Table columns defined
- [x] Status badges: Not Tokenized, In Progress, Tokenized
- [x] Action buttons per row
- [x] Global Batch ID highlighted
- [x] Stats cards
- [x] Step progress (3/4)

### Screen 4: Tokenization Process
- [x] Title: "Tokenization Process"
- [x] Message: "Generating token IDs for each lot..."
- [x] Progress bar/spinner
- [x] 6-step process
- [x] Status icons
- [x] Button: "Add/Edit Token Details"
- [x] Step progress (3/4)

### Screen 5: Token Details & Verification
- [x] Title: "Token Details & Verification"
- [x] Tab 1: Upload Certificates
- [x] Tab 2: Verifier Comments
- [x] Tab 3: AI Insights Display
- [x] Tab 4: History Log
- [x] File upload component
- [x] Multi-line inputs
- [x] Charts/stats display
- [x] Scrollable history
- [x] Buttons: "Add Verifier Info", "Save & Publish"
- [x] Step progress (4/4)

### Screen 6: Buyer Verification View
- [x] Title: "Product & History Details"
- [x] Search: "Token/NFT Input"
- [x] QR code scanner button
- [x] Verified banner
- [x] Product summary cards
- [x] Producer information
- [x] Tab 1: Cultivation Timeline
- [x] Tab 2: Certificates and Proofs
- [x] Tab 3: AI-Driven Insights Summary
- [x] Tab 4: Blockchain Verification
- [x] Share & Download buttons

### General UI
- [x] Color-coded grades (Green/Blue/Orange)
- [x] Color-coded statuses (Gray/Blue/Green/Red)
- [x] 4-step progress bar on producer screens
- [x] Large primary buttons (Gold/Blue)
- [x] Intuitive icons (Edit/Delete/Upload/Info)
- [x] Responsive layout (mobile + desktop)
- [x] Gradient backgrounds
- [x] Typography hierarchy
- [x] Card-based layout

---

## 📊 Component Summary

### Forms
- ✅ Dropdowns/Select for grade selection
- ✅ Number inputs for quantities
- ✅ Text inputs for descriptions
- ✅ Textareas for multi-line content
- ✅ File upload with drag-and-drop
- ✅ All with proper labels and validation

### Tables
- ✅ Sortable columns
- ✅ Color-coded badges
- ✅ Action buttons in rows
- ✅ Responsive scrolling
- ✅ Empty states

### Status Indicators
- ✅ Progress bars (horizontal)
- ✅ Step indicators (4-step)
- ✅ Spinners (loading)
- ✅ Badges (status/grade)
- ✅ Icons (checkmark/error)

### Navigation
- ✅ Tab navigation (4 tabs on screens 5 & 6)
- ✅ Back buttons
- ✅ Breadcrumb-style progress
- ✅ Demo mode toggles

### Feedback
- ✅ Toast notifications
- ✅ Success banners
- ✅ Error messages
- ✅ Inline validation
- ✅ Loading states

---

## 🎯 Key Differences from Previous Version

1. **Simplified Titles**
   - "Create Lots for Batch [BatchID]" → "Create Lots"
   - "Generating unique token IDs" → "Generating token IDs"

2. **Concise Descriptions**
   - Removed redundant words
   - More direct language
   - Shorter instructions

3. **Clearer Section Names**
   - "Certificates Upload" → "Upload Certificates"
   - "AI-Powered Insights from Grok" → "AI Insights Display"
   - "Update & Verification History" → "History Log"

4. **Simplified Messages**
   - "Harvest batch X grading is complete. You can now create lots..." → "The grading for batch X is done."
   - More straightforward, less verbose

5. **Consistent Button Labels**
   - "Add Token Details" → "Add/Edit Token Details"
   - Clearer action indication

---

## 📝 Notes for Developers

- All text content is now simplified and production-ready
- No placeholder text - all real content
- Responsive breakpoints tested
- Icon library: lucide-react
- Design system: Custom TRADIE system
- All forms include validation
- All actions have loading states
- All status changes show toast notifications

---

**Status**: ✅ All text simplified and implemented
**Version**: 2.0 (Simplified)
**Last Updated**: October 22, 2025
