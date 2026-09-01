# Producer AI Dashboard Wireframes - Text Content & UI Specification

## Complete Text Content & UI Components by Screen

---

## 1️⃣ Grading Completion Screen

### Screen Title
**"Grading Completed"**

### Text Content
- **Main heading**: "Grading Completed"
- **Primary message**: "Harvest batch [BatchID] grading is complete."
- **Secondary message**: "You can now create lots with different quality grades."

### UI Components
- ✅ Header text (h1)
- ✅ Paragraph text (2 lines)
- ✅ Large primary button: **"Create Lots"** (Gold #FFD700)
- ✅ Step progress indicator (1 of 4 active)
- ✅ Batch summary section with:
  - Batch ID
  - Commodity name
  - Total quantity
  - Grading date
  - Location
- ✅ Grading results cards with:
  - Grade badges (A/B/C - color coded)
  - Quantity per grade
  - Percentage breakdown
  - Visual progress bars

### Color Coding
- Grade A: Green (`#10B981`)
- Grade B: Blue (`#3B82F6`)
- Grade C: Orange (`#F97316`)

---

## 2️⃣ Create Lots Screen

### Screen Title
**"Create Lots for Batch [BatchID]"**

### Text Content
- **Instruction**: "Add multiple lots with their quality grades and quantities."
- **Form labels**:
  - "Lot Quality" (dropdown)
  - "Quantity" (numeric input)
  - "Description" (text input)

### UI Components
- ✅ Dropdown for Lot Quality
  - Options: Grade A, Grade B, Grade C
  - Shows available quantity per grade
- ✅ Numeric input for Quantity (kg)
  - Placeholder: "Enter quantity in kg"
  - Validation for max available
- ✅ Text input for Description
  - Placeholder: "Enter lot description"
- ✅ Multiline text input for Special Notes
  - Placeholder: "Any special handling or storage requirements"
- ✅ **Button**: "Add Lot" (Gold #FFD700)
- ✅ Table/list showing added lots with:
  - Lot ID
  - Quality Grade badge
  - Quantity
  - Description
  - Edit icon (blue pencil)
  - Delete icon (red trash)
- ✅ **Button**: "Proceed to Tokenization" (Blue #003E6D)
- ✅ Step progress indicator (2 of 4 active)

### Visual Elements
- Two-column layout (desktop)
  - Left: Form
  - Right: Lots list
- Single column (mobile)
- Color-coded grade badges throughout
- Toast notifications for actions

---

## 3️⃣ Lots Overview Screen

### Screen Title
**"Lots Overview"**

### Text Content
- **Column headers**:
  - Lot ID
  - Quality Grade
  - Quantity
  - Tokenization Status
  - Actions
- **Button per lot**: "Initiate Tokenization" or "View" or "Retry"
- **Global Batch ID**: Displayed prominently in highlighted section

### UI Components
- ✅ Table with sortable columns
  - Lot ID (font-mono)
  - Quality Grade (color-coded badge)
  - Quantity (with kg unit)
  - Description (gray text)
  - Tokenization Status (status badge)
  - Token ID (if completed)
  - Actions (contextual buttons)
- ✅ Status badges (color-coded):
  - **"Not Tokenized"** - Gray (`#9CA3AF`)
  - **"In Progress"** - Blue (`#3B82F6`)
  - **"Tokenized"** - Green (`#10B981`)
  - **"Failed"** - Red (`#EF4444`)
- ✅ Action buttons in each row:
  - "Start" (Gold) - for not started
  - "Processing..." (disabled) - for in progress
  - "View" (outline) - for completed
  - "Retry" (outline) - for failed
- ✅ Global Batch ID card (highlighted, gold accent)
- ✅ Stats cards showing:
  - Total Lots
  - Completed
  - In Progress
  - Not Started
- ✅ Step progress indicator (3 of 4 active)

### Visual Elements
- Full-width responsive table
- Card-based stats above table
- Prominent global batch ID display
- Icons for each status

---

## 4️⃣ Tokenization Process Screen

### Screen Title
**"Tokenization Process"**

### Text Content
- **Header**: "Tokenization Process"
- **Subtitle**: "Generating unique token IDs for each lot..."
- **Status message**: "Ready to generate unique token ID" (before start)
- **Progress message**: Updates per step
- **Success message**: "Tokenization Successful!"
- **Button**: "Add/Edit Token Details" (after success)

### UI Components
- ✅ Progress bar (0-100%)
- ✅ Overall progress percentage display
- ✅ 6-step process visualization:
  1. Validating Lot Data
  2. Generating Global Batch ID
  3. Generating Unique Token ID
  4. Recording on Blockchain
  5. Generating QR Code
  6. Preparing Metadata
- ✅ Status icons per step:
  - Pending: Empty circle
  - In Progress: Spinning loader (blue)
  - Completed: Green checkmark
  - Failed: Red X
- ✅ Success notification card showing:
  - Global Batch ID
  - Token ID
  - Blockchain Hash
- ✅ Action buttons:
  - "Start Tokenization" (Gold) - initial
  - "Add/Edit Token Details" (Blue) - on success
  - "Retry Tokenization" (outline) - on failure
- ✅ Step progress indicator (3 of 4 active)

### Visual Elements
- Centered layout
- Large progress bar at top
- Step cards with status colors
- Success card with green border
- Icons for each step

---

## 5️⃣ Token Details & Verification Screen

### Screen Title
**"Token Details & Verification"**

### Text Content
- **Header**: "Token Details & Verification"
- **Subtitle**: "Upload certificates, add verifier comments, and review AI-powered insights from Grok"

### Sections/Tabs

#### Tab 1: Certificates Upload
- **Label**: "Certificates"
- **Heading**: "Certificates Upload"
- **Instructions**: "Upload quality certificates, lab reports, and verification documents"
- **Upload area text**: "Click to upload or drag and drop"
- **File types**: "PDF, JPG, PNG, DOC up to 10MB"
- **Uploaded list**: Shows file name, upload date, download/remove buttons

#### Tab 2: Verifier Comments
- **Label**: "Verifier Info"
- **Heading**: "Verifier Comments"
- **Form fields**:
  - Verifier Name * (required)
  - Organization * (required)
  - Role/Position
  - Comments (multiline textarea)
- **Button**: "Save Verifier Info" (Gold)

#### Tab 3: AI Insights
- **Label**: "AI Insights"
- **Heading**: "AI Insights Summary"
- **Subtitle**: "AI-powered insights from Grok dashboard with charts and alerts"
- **Insight cards showing**:
  - Type (badge)
  - Message
  - Confidence percentage
  - Visual confidence bar
  - Timestamp
- **Alert box**: "AI Fraud Detection Active"

#### Tab 4: History Log
- **Label**: "History Log"
- **Heading**: "History Log"
- **Subtitle**: "Complete audit trail of all updates and verifications over time"
- **Log entries showing**:
  - Event name
  - Timestamp
  - User who performed action

### UI Components
- ✅ 4-tab navigation (horizontal)
- ✅ File upload component with drag-and-drop
- ✅ Text inputs for verifier details
- ✅ Multiline textarea for comments
- ✅ Analytics cards for AI insights with:
  - Confidence bars
  - Color-coded badges
  - Timestamps
- ✅ Scrollable history log
- ✅ **Buttons**:
  - "Save Verifier Info" (per tab)
  - "Save & Publish" (bottom, Blue #003E6D)
- ✅ Step progress indicator (4 of 4 active)
- ✅ Icons: Upload, FileText, User, BarChart3, Calendar, AlertCircle

### Visual Elements
- Tabbed interface
- Card-based sections
- Drag-and-drop upload zone
- Color-coded insight cards
- Timeline-style history

---

## 6️⃣ Buyer Verification View

### Screen Title
**"Product & History Details"**

### Text Content
- **Main heading**: "Product & History Details"
- **Subtitle**: "Verify product authenticity and view complete cultivation history"
- **Search section heading**: "Token/NFT Verification"
- **Search instructions**: "Enter token ID or scan QR code to verify product authenticity"
- **Status banner**: "Verified Product Information"
- **Status message**: "This product has been verified on the blockchain and all certifications are valid"

### Sections/Tabs

#### Search/Input Area
- Input placeholder: "Enter Token ID or Batch ID"
- **Buttons**:
  - "Verify" (Gold)
  - "Scan QR Code" (outline)

#### Verification Result Banner
- **Green success banner** with:
  - Checkmark icon
  - "Verified Product Information"
  - Verification message
  - Share button
  - Download Report button

#### Product Overview (Cards)
- Product name
- Quality Grade (badge)
- Quantity
- Token ID (abbreviated with ...)

#### Producer Information
- Producer name with verified badge
- Location
- Rating (stars/5.0)
- Verified icon

#### Tab 1: Timeline
- **Label**: "Timeline"
- **Heading**: "Cultivation Timeline Details"
- **Subtitle**: "Complete journey from sowing to tokenization"
- **Timeline entries** showing:
  - Event name
  - Date
  - Location
  - Visual timeline connector

#### Tab 2: Certificates
- **Label**: "Certificates"
- **Heading**: "Certificates & Verification Proofs"
- **Subtitle**: "All linked certificates and official verification documents"
- **Certificate cards** showing:
  - Certificate name
  - Issuer
  - Issue date
  - "Valid" badge (green)
- **Verifier section** showing:
  - Verifier name
  - Organization
  - Comments (quoted)

#### Tab 3: AI Insights
- **Label**: "AI Insights"
- **Heading**: "AI Insights Summary"
- **Subtitle**: "AI-powered quality analysis and fraud detection powered by Grok"
- **Insight cards** showing:
  - Quality Score: 94/100 (excellent)
  - Fraud Risk: Low (2%) (safe)
  - Market Value: ₹2,850/quintal (premium)
- **Alert box**: "Fraud Detection: All Clear"

#### Tab 4: Blockchain
- **Label**: "Blockchain"
- **Heading**: "Blockchain Verification"
- **Fields displayed**:
  - Global Batch ID
  - Token ID
  - Blockchain Transaction Hash
- **Verification badge**: "Blockchain Verified" with checkmark

### UI Components
- ✅ Search input with verify button
- ✅ QR code scanner button
- ✅ Timeline component (vertical, connected)
- ✅ List/card views for certificates
- ✅ Highlighted insights panel with metrics
- ✅ 4-tab navigation
- ✅ Blockchain verification section
- ✅ Share and download buttons
- ✅ Icons: Shield, Search, QrCode, CheckCircle2, FileText, BarChart3, Calendar, MapPin, Award, TrendingUp

### Visual Elements
- Clean, public-facing design
- Large verification banner
- Color-coded status (green for verified)
- Timeline visualization
- Certificate cards
- AI insight metrics
- Blockchain proof section

---

## General UI Specifications

### Color-Coded Elements

#### Grade Badges
- **Grade A**: Green background `#10B981`, white text
- **Grade B**: Blue background `#3B82F6`, white text
- **Grade C**: Orange background `#F97316`, white text

#### Status Badges
- **Not Tokenized**: Gray `#9CA3AF`
- **In Progress**: Blue `#3B82F6`
- **Tokenized/Completed**: Green `#10B981`
- **Failed**: Red `#EF4444`

#### Verification Status
- **Verified**: Green `#10B981`
- **Pending**: Yellow/Orange `#F59E0B`
- **Invalid**: Red `#EF4444`

### Step Progress Bar
All screens (except buyer view) include a 4-step progress indicator at the top:

```
1. Grading → 2. Lots → 3. Tokenization → 4. Verification
```

- Active step: Gold circle `#FFD700`
- Completed steps: Green circle `#10B981` with checkmark
- Pending steps: Gray circle `#D1D5DB`
- Connecting lines: Change from gray to green as steps complete

### Primary Action Buttons
- **Large size** for main CTAs
- **Gold background** `#FFD700` for primary actions
- **Blue background** `#003E6D` for secondary important actions
- **Outline style** for tertiary actions
- **Prominent placement** (centered or right-aligned)

### Icons Used
- **Edit**: Pencil/Edit2 (blue)
- **Delete**: Trash2 (red)
- **Upload**: Upload (gray/gold)
- **Info**: AlertCircle (blue/yellow)
- **Success**: CheckCircle2 (green)
- **Warning**: AlertCircle (yellow)
- **Error**: XCircle (red)
- **Processing**: Loader2 (blue, spinning)

### Responsive Layout
- **Desktop**: Multi-column layouts, side-by-side forms
- **Tablet**: Adjusted columns, collapsible sections
- **Mobile**: Single column, stacked elements, bottom sheet modals
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

---

## Typography Hierarchy

### Headings
- **Screen titles (h1)**: Playfair Display, color `#003E6D`
- **Section titles (h3)**: Playfair Display, color `#003E6D`
- **Card headings**: Montserrat, color `#003E6D`

### Body Text
- **Primary text**: Lato, color `#1F2937`
- **Secondary text**: Lato, color `#6B7280`
- **Helper text**: Lato, color `#9CA3AF`, smaller size

### Labels
- **Form labels**: Montserrat, color `#374151`
- **Button text**: Montserrat, uppercase or sentence case
- **Badge text**: Montserrat, white on colored background

---

## Gradient Background
All screens use consistent gradient:
```css
background: linear-gradient(to bottom, #F7FAFC, #D9F2FF);
```

---

## Spacing & Layout

### Card Padding
- Desktop: `p-8` (2rem)
- Mobile: `p-6` (1.5rem)

### Section Spacing
- Between sections: `mb-6` to `mb-8` (1.5rem - 2rem)
- Between elements: `mb-4` (1rem)
- Between form fields: `space-y-4` (1rem gap)

### Grid Layouts
- Stats cards: 2-4 columns (responsive)
- Form + List: 2 columns on desktop, 1 on mobile
- Overview cards: 3-4 columns (responsive)

---

## Interactive States

### Buttons
- **Hover**: Slight darkening, shadow increase
- **Active**: Pressed effect
- **Disabled**: Opacity 50%, cursor not-allowed
- **Loading**: Spinner icon, text changes

### Form Inputs
- **Focus**: Blue border, slight shadow
- **Error**: Red border, error message below
- **Success**: Green border (if validated)
- **Disabled**: Gray background, cursor not-allowed

### Table Rows
- **Hover**: Light gray background `#F9FAFB`
- **Selected**: Light blue background (if applicable)

---

## Validation & Feedback

### Toast Notifications
- **Success**: Green icon, "Success!" message
- **Error**: Red icon, "Error!" message
- **Info**: Blue icon, "Info" message
- **Warning**: Yellow icon, "Warning!" message

### Inline Validation
- Real-time validation on blur
- Error messages below inputs
- Success checkmarks for valid fields

### Loading States
- Skeleton loaders for data loading
- Spinners for actions in progress
- Progress bars for multi-step processes

---

## Accessibility

### Screen Reader Support
- Proper heading hierarchy (h1 → h3)
- ARIA labels on icons
- Form labels properly associated
- Status announcements for dynamic changes

### Keyboard Navigation
- Tab order follows visual flow
- Enter key submits forms
- Escape key closes modals
- Arrow keys navigate tables

### Color Contrast
- All text meets WCAA AA standards
- Color not sole indicator (icons + text)
- Focus indicators clearly visible

---

## Implementation Checklist

- [x] Screen 1: Exact text content
- [x] Screen 2: Exact text content
- [x] Screen 3: Exact text content & status badges
- [x] Screen 4: Exact text content & progress messages
- [x] Screen 5: Exact text content & section labels
- [x] Screen 6: Exact text content & verification labels
- [x] Color-coded grade badges
- [x] Color-coded status badges
- [x] Step progress bar on all producer screens
- [x] Large primary action buttons
- [x] Clear edit/delete/upload/info icons
- [x] Responsive layout (mobile + desktop)
- [x] Gradient backgrounds
- [x] Typography hierarchy
- [x] Toast notifications
- [x] Form validation
- [x] Loading states

---

**Status**: ✅ All text content and UI components match specification
**Last Updated**: October 22, 2025
