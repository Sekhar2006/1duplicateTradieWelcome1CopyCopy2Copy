# 🎨 Producer AI Dashboard - Complete Design Specification

**Figma-Ready Design System for TRADIE Producer Dashboard**

---

## 📋 Overview

This document provides comprehensive design specifications for the Producer AI Dashboard, ready for Figma implementation or direct React development.

---

## 🎯 Design Requirements Summary

### Core Features
1. ✅ Sidebar navigation with 7 main sections
2. ✅ Top navigation with profile, notifications, logout
3. ✅ Responsive design (desktop + tablet)
4. ✅ Dashboard home with summary cards
5. ✅ Crop batch management with search/filter
6. ✅ Quality check forms with AI suggestions
7. ✅ Token & QR code generation/scanning
8. ✅ Timeline-based history logs
9. ✅ AI insights with visualizations
10. ✅ User profile & settings

---

## 🎨 Visual Design System

### Color Palette

**Primary Colors (Natural Tones)**
```
Primary Green:      #22C55E (Success, Growth)
Primary Blue:       #3B82F6 (Trust, Technology)
Deep Forest:        #16A34A (Dark Green Accent)
Sky Blue:           #60A5FA (Light Blue Accent)
```

**Semantic Colors**
```
Success:            #22C55E
Warning:            #F59E0B
Error:              #EF4444
Info:               #3B82F6
```

**Neutral Palette**
```
Background:         #F8FAFC
Surface:            #FFFFFF
Border:             #E2E8F0
Text Primary:       #1E293B
Text Secondary:     #64748B
Text Tertiary:      #94A3B8
```

**Gradient Backgrounds**
```
Primary Gradient:   linear-gradient(135deg, #F7FAFC 0%, #D9F2FF 100%)
Success Gradient:   linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)
Warning Gradient:   linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)
```

**Gold Accents (Premium Features)**
```
Soft Gold:          #FFD700
Gold Hover:         #FFC700
Gold Light:         #FFF4CC
```

### Typography Hierarchy

**Font Families**
```css
/* Headings: Playfair Display */
--font-heading: 'Playfair Display', serif;

/* Labels & Buttons: Montserrat */
--font-label: 'Montserrat', sans-serif;

/* Body Text: Lato */
--font-body: 'Lato', sans-serif;
```

**Type Scale**
```css
/* Headings */
h1: 36px / 44px - Playfair Display Bold (#003E6D)
h2: 30px / 38px - Playfair Display Bold (#003E6D)
h3: 24px / 32px - Playfair Display SemiBold (#1E293B)
h4: 20px / 28px - Playfair Display SemiBold (#1E293B)
h5: 18px / 26px - Playfair Display Medium (#1E293B)
h6: 16px / 24px - Playfair Display Medium (#475569)

/* Labels & Buttons */
button-lg: 16px / 24px - Montserrat SemiBold
button-md: 14px / 20px - Montserrat SemiBold
button-sm: 12px / 18px - Montserrat Medium
label: 14px / 20px - Montserrat Medium (#475569)
caption: 12px / 18px - Montserrat Medium (#64748B)

/* Body Text */
body-lg: 18px / 28px - Lato Regular
body-md: 16px / 24px - Lato Regular
body-sm: 14px / 22px - Lato Regular
body-xs: 12px / 20px - Lato Regular
```

**Font Weights**
```
Light: 300
Regular: 400
Medium: 500
SemiBold: 600
Bold: 700
ExtraBold: 800
```

### Spacing System

```css
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
--space-3xl: 64px
--space-4xl: 96px
```

**Component Padding**
```
Card: 24px
Button: 12px 24px
Input: 12px 16px
Modal: 32px
Sidebar: 16px
```

### Border Radius

```css
--radius-sm: 6px    /* Buttons, Inputs */
--radius-md: 8px    /* Cards */
--radius-lg: 12px   /* Modals */
--radius-xl: 16px   /* Large Cards */
--radius-full: 999px /* Pills, Avatars */
```

### Shadows

```css
/* Card Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)

/* Interactive Shadows */
--shadow-focus: 0 0 0 3px rgba(59, 130, 246, 0.1)
--shadow-hover: 0 8px 16px -4px rgba(0, 0, 0, 0.15)
```

### Icons

**Icon Library:** Lucide React  
**Icon Sizes:**
```
xs: 14px
sm: 16px
md: 20px
lg: 24px
xl: 32px
2xl: 48px
```

**Icon Colors:**
```
Default: #64748B
Active: #3B82F6
Success: #22C55E
Warning: #F59E0B
Error: #EF4444
```

---

## 📐 Layout Structure

### Grid System

**Desktop (1440px+)**
```
Columns: 12
Gutter: 24px
Margin: 48px
```

**Tablet (768px - 1439px)**
```
Columns: 8
Gutter: 16px
Margin: 32px
```

**Mobile (< 768px)**
```
Columns: 4
Gutter: 16px
Margin: 16px
```

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Top Navigation Bar (72px height)                               │
├──────────┬──────────────────────────────────────────────────────┤
│          │                                                       │
│  Sidebar │  Main Content Area                                   │
│  (260px) │  (Responsive width)                                  │
│          │                                                       │
│  - Nav   │  ┌─────────────────────────────────────────────┐    │
│  - Menu  │  │  Summary Cards (4 cards in row)             │    │
│  - Icons │  └─────────────────────────────────────────────┘    │
│          │                                                       │
│          │  ┌─────────────────────────────────────────────┐    │
│          │  │  Quick Actions (6 buttons)                  │    │
│          │  └─────────────────────────────────────────────┘    │
│          │                                                       │
│          │  ┌──────────────┬──────────────────────────────┐    │
│          │  │  Activity    │  AI Insights                 │    │
│          │  │  Feed        │  & Alerts                    │    │
│          │  │  (Left)      │  (Right)                     │    │
│          │  └──────────────┴──────────────────────────────┘    │
│          │                                                       │
└──────────┴───────────────────────────────────────────────────────┘
```

---

## 🧩 Component Specifications

### 1. Top Navigation Bar

**Dimensions:**
- Height: 72px
- Padding: 16px 48px

**Elements (Left to Right):**
1. **Logo** (180px width)
   - TRADIE Logo
   - Font: Montserrat Bold 24px
   - Color: #003E6D

2. **Search Bar** (400px width)
   - Placeholder: "Search batches, tokens, history..."
   - Border: 1px solid #E2E8F0
   - Radius: 8px
   - Height: 40px

3. **Right Section** (Auto width)
   - Notification Bell (with badge counter)
   - User Avatar + Name
   - Dropdown Menu

**Visual:**
```
┌──────────────────────────────────────────────────────────────┐
│  [TRADIE]  [🔍 Search...]    🔔(3)  👤 Rajesh Kumar ▼  ⚙️    │
└──────────────────────────────────────────────────────────────┘
```

### 2. Sidebar Navigation

**Dimensions:**
- Width: 260px (expanded) / 72px (collapsed)
- Background: White
- Border-right: 1px solid #E2E8F0

**Menu Items (7 sections):**

1. **Dashboard Home** 📊
   - Icon: Home
   - Active: #3B82F6 background
   - Badge: None

2. **Crop Batches** 📦
   - Icon: Package
   - Badge: "12 active"

3. **Quality Checks** ✅
   - Icon: ClipboardCheck
   - Badge: "3 pending"

4. **Tokenization** 🏷️
   - Icon: Award
   - Badge: "8 tokens"

5. **History Logs** 📜
   - Icon: FileText
   - Badge: None

6. **AI Insights** 🤖
   - Icon: Bot
   - Badge: "2 alerts"

7. **Profile** 👤
   - Icon: User
   - Badge: None

**Visual:**
```
┌──────────────┐
│ 📊 Dashboard │ ← Active
│ 📦 Batches   │
│ ✅ Quality   │
│ 🏷️ Tokens    │
│ 📜 History   │
│ 🤖 AI Insights│
│ 👤 Profile   │
└──────────────┘
```

### 3. Summary Cards (Dashboard Home)

**Layout:** 4 cards in a row (responsive)

**Card Structure:**
- Width: 25% (desktop) / 50% (tablet) / 100% (mobile)
- Height: 140px
- Padding: 24px
- Border-radius: 12px
- Shadow: 0 4px 6px rgba(0,0,0,0.1)

**Card Types:**

**A. Total Crop Batches**
```
┌────────────────────────────────┐
│ 📦                        ↗️ +12%│
│ Total Crop Batches             │
│                                 │
│ 48                              │
│ (4 pending quality check)       │
└────────────────────────────────┘
```
- Background: Gradient (#ECFDF5 → #D1FAE5)
- Icon: Package (32px, #22C55E)
- Number: 48px Playfair Bold #003E6D
- Label: 14px Montserrat #64748B
- Trend: 16px Lato #22C55E

**B. Pending Quality Checks**
```
┌────────────────────────────────┐
│ ✅                        ⏱️ 3   │
│ Pending Quality Checks          │
│                                 │
│ 7                               │
│ (2 urgent)                      │
└────────────────────────────────┘
```
- Background: Gradient (#FFFBEB → #FEF3C7)
- Icon: ClipboardCheck (32px, #F59E0B)

**C. Tokens Created**
```
┌────────────────────────────────┐
│ 🏆                        ✓ 8   │
│ Tokens Created                  │
│                                 │
│ 35                              │
│ (8 this month)                  │
└────────────────────────────────┘
```
- Background: Gradient (#EFF6FF → #DBEAFE)
- Icon: Award (32px, #3B82F6)

**D. Recent History Entries**
```
┌────────────────────────────────┐
│ 📜                        📊    │
│ Recent History Entries          │
│                                 │
│ 124                             │
│ (15 today)                      │
└────────────────────────────────┘
```
- Background: Gradient (#F5F3FF → #EDE9FE)
- Icon: FileText (32px, #8B5CF6)

### 4. Quick Action Buttons

**Layout:** 6 buttons in 2 rows of 3

**Button Structure:**
- Width: Auto (fit content)
- Height: 48px
- Padding: 12px 24px
- Border-radius: 8px
- Font: Montserrat SemiBold 14px
- Shadow: 0 2px 4px rgba(0,0,0,0.1)

**Buttons:**

1. **Add New Crop Batch**
   - Icon: Plus
   - Color: #22C55E (Primary)
   - Text: White

2. **Start Quality Check**
   - Icon: ClipboardCheck
   - Color: #3B82F6
   - Text: White

3. **Generate Token & QR**
   - Icon: QrCode
   - Color: #8B5CF6
   - Text: White

4. **Scan QR Code**
   - Icon: Camera
   - Color: #F59E0B
   - Text: White

5. **View Analytics**
   - Icon: TrendingUp
   - Color: #06B6D4
   - Text: White

6. **AI Assistant**
   - Icon: Bot
   - Color: #EC4899
   - Text: White

**Visual:**
```
┌─────────────────────────────────────────────────────────┐
│  [+ New Batch]  [✓ Quality Check]  [🏷️ Generate Token]  │
│  [📷 Scan QR]   [📊 Analytics]      [🤖 AI Assistant]    │
└─────────────────────────────────────────────────────────┘
```

### 5. Activity Feed Panel

**Layout:** Left column (60% width)

**Structure:**
- Background: White
- Border-radius: 12px
- Padding: 24px
- Max-height: 600px
- Scroll: Auto

**Feed Item:**
```
┌────────────────────────────────────────┐
│ [Icon] Activity Title                   │
│        Subtitle / Details               │
│        Timestamp                        │
│        ──────────────────────────       │
└────────────────────────────────────────┘
```

**Item Types:**

1. **Batch Created**
   - Icon: Package (Green)
   - Example: "New batch #TB-2025-001 created"

2. **Quality Check**
   - Icon: ClipboardCheck (Blue)
   - Example: "Quality check passed for batch #TB-2025-001"

3. **Token Generated**
   - Icon: Award (Purple)
   - Example: "NFT token #NFT-001 generated"

4. **AI Alert**
   - Icon: Bot (Pink)
   - Example: "AI detected anomaly in batch #TB-2025-003"

### 6. AI Insights & Alerts Panel

**Layout:** Right column (40% width)

**Structure:**
- Background: White
- Border-radius: 12px
- Padding: 24px

**Alert Card:**
```
┌────────────────────────────────────┐
│ 🤖 AI Insight              [High]  │
│                                     │
│ Anomaly Detected                    │
│ Quality score dropped by 15% for   │
│ batch #TB-2025-003. Review inputs. │
│                                     │
│ [View Details] [Dismiss]            │
└────────────────────────────────────┘
```

**Severity Levels:**
- Critical: Red background (#FEE2E2)
- High: Orange background (#FFEDD5)
- Medium: Yellow background (#FEF3C7)
- Low: Blue background (#DBEAFE)

---

## 📱 Screen Specifications

### Screen 1: Dashboard Home

**Components:**
1. Top Navigation (fixed)
2. Sidebar Navigation (fixed)
3. Summary Cards (grid 4 columns)
4. Quick Actions (grid 3 columns, 2 rows)
5. Activity Feed (left 60%)
6. AI Insights (right 40%)

**Interactions:**
- Hover: Cards lift with shadow
- Click: Navigate to detail views
- Real-time: Activity feed updates

### Screen 2: Crop Batch Management

**Components:**
1. Search Bar (full width)
2. Filter Dropdowns (Category, Variety, Status)
3. Table/Grid View Toggle
4. Batch List (with pagination)
5. Create New Batch Button (floating)

**Table Columns:**
- Crop Batch ID
- Category Icon + Name
- Variety
- Creation Date
- Token Status (Badge)
- Actions (View, Edit, Delete)

**Visual:**
```
┌─────────────────────────────────────────────────────────┐
│ [🔍 Search] [Category ▼] [Variety ▼] [Status ▼] [+New] │
├─────────────────────────────────────────────────────────┤
│ ID         Category    Variety    Date       Token      │
│ TB-001     🌾 Wheat    Durum      Jan 15    ✓ Created  │
│ TB-002     🌾 Rice     Basmati    Jan 16    ⏱️ Pending  │
│ TB-003     🥕 Carrot   Imperator  Jan 17    ✓ Created  │
└─────────────────────────────────────────────────────────┘
```

### Screen 3: Quality Check Form

**Components:**
1. Batch Selector (dropdown)
2. Quality Parameters (dynamic based on commodity)
3. Grade Selection (A+, A, B+, B, C)
4. Photo Upload (drag & drop)
5. AI Suggestions Panel (right sidebar)
6. Submit Button

**Form Layout:**
```
┌──────────────────────────┬─────────────────────┐
│ Quality Check Form       │ AI Suggestions      │
│                          │                     │
│ Select Batch: [TB-001▼] │ 🤖 AI Recommends:   │
│                          │                     │
│ Parameters:              │ • Grade: A          │
│ ☐ Moisture: [12%]       │ • Moisture: 12-14%  │
│ ☐ Purity: [98%]         │ • Check for pests   │
│ ☐ Color: [Good]         │                     │
│                          │ ⚠️ Alert:            │
│ Grade: [A ▼]            │ Moisture slightly   │
│                          │ high for storage    │
│ Photos: [Upload]         │                     │
│                          │                     │
│      [Submit Check]      │                     │
└──────────────────────────┴─────────────────────┘
```

### Screen 4: Tokenization & QR

**Layout:** Split view (50/50)

**Left: Token Generation**
```
┌─────────────────────────────┐
│ Generate Token & QR         │
│                             │
│ Batch: [TB-001 ▼]          │
│ Token Type: NFT             │
│                             │
│ [Generate Token]            │
│                             │
│ ──────────────────────      │
│                             │
│ Token: NFT-TB001-2025       │
│                             │
│ [QR Code Image]             │
│                             │
│ [Download QR] [Share]       │
└─────────────────────────────┘
```

**Right: QR Scanner**
```
┌─────────────────────────────┐
│ Scan QR Code                │
│                             │
│ ┌───────────────────┐       │
│ │                   │       │
│ │   Camera View     │       │
│ │                   │       │
│ └───────────────────┘       │
│                             │
│ Or Upload Image:            │
│ [Choose File]               │
│                             │
│ ──────────────────────      │
│                             │
│ Scanned Result:             │
│ Batch: TB-001               │
│ Token: NFT-TB001-2025       │
│ Status: ✓ Verified          │
│                             │
│ [View Full History]         │
└─────────────────────────────┘
```

### Screen 5: History Logs (Timeline View)

**Components:**
1. Filter Bar (Date range, Batch, Category)
2. Timeline View (vertical)
3. Event Cards
4. Charts Panel (quality trends)

**Timeline Visual:**
```
┌──────────────────────────────────────────────────┐
│ [Date Range] [Batch ▼] [Category ▼]             │
├──────────────────────────────────────────────────┤
│                                                  │
│ Jan 17, 2025                                     │
│ ────●─── Quality Check Completed                │
│         Batch: TB-003 | Grade: A                │
│                                                  │
│ Jan 16, 2025                                     │
│ ────●─── Token Generated                        │
│         Token: NFT-TB002-2025                   │
│                                                  │
│ Jan 15, 2025                                     │
│ ────●─── Batch Created                          │
│         Category: Wheat | Variety: Durum        │
│                                                  │
├──────────────────────────────────────────────────┤
│ Quality Trend Chart                             │
│ [Line chart showing quality over time]          │
└──────────────────────────────────────────────────┘
```

### Screen 6: AI Insights Dashboard

**Components:**
1. Alert Summary Cards (top)
2. Recommendations List (left)
3. Visualizations (right)
   - Quality trends
   - Risk heat map
   - Batch performance

**Visual:**
```
┌───────────────────────────────────────────────────┐
│ [2 Critical] [5 High] [8 Medium] [12 Low]        │
├──────────────────────┬────────────────────────────┤
│ AI Recommendations   │ Quality Trend (30 days)   │
│                      │                            │
│ 🔴 Critical:         │ [Line Chart]               │
│ • Review batch TB-003│                            │
│   Quality drop 15%   │                            │
│                      │ Risk Heat Map              │
│ 🟠 High:             │                            │
│ • Moisture levels    │ [Heat Map Grid]            │
│   above threshold    │                            │
│                      │                            │
│ 🟡 Medium:           │ Performance Metrics        │
│ • Delay in quality   │                            │
│   check for TB-004   │ [Bar Chart]                │
└──────────────────────┴────────────────────────────┘
```

### Screen 7: Profile & Settings

**Tabs:**
1. User Profile
2. API Keys & Tokens
3. Notification Preferences
4. Security Settings

**Profile Tab:**
```
┌─────────────────────────────────────────┐
│ Profile Settings                        │
│                                         │
│ [Avatar]  Rajesh Kumar                  │
│           Producer ID: PR-12345         │
│           Member since: Jan 2024        │
│                                         │
│ Contact Information                     │
│ ├─ Email: rajesh@example.com           │
│ ├─ Phone: +91 98765 43210              │
│ └─ Location: Punjab, India             │
│                                         │
│ Farm Details                            │
│ ├─ Farm Name: Kumar Farms               │
│ ├─ Area: 25 acres                      │
│ ├─ Main Crops: Wheat, Rice             │
│ └─ Certification: Organic              │
│                                         │
│ [Edit Profile] [Change Password]        │
└─────────────────────────────────────────┘
```

---

## 🎭 Interactive States

### Button States

**Default:**
- Background: Primary color
- Border: None
- Shadow: 0 2px 4px rgba(0,0,0,0.1)

**Hover:**
- Background: Darker shade (-10%)
- Shadow: 0 4px 8px rgba(0,0,0,0.15)
- Transform: translateY(-2px)
- Transition: all 0.2s ease

**Active/Pressed:**
- Background: Darkest shade (-20%)
- Shadow: 0 1px 2px rgba(0,0,0,0.1)
- Transform: translateY(0)

**Disabled:**
- Background: #E2E8F0
- Color: #94A3B8
- Cursor: not-allowed
- Opacity: 0.6

### Card States

**Default:**
- Shadow: 0 2px 4px rgba(0,0,0,0.05)

**Hover:**
- Shadow: 0 8px 16px rgba(0,0,0,0.1)
- Transform: translateY(-4px)
- Transition: all 0.3s ease

**Active:**
- Border: 2px solid #3B82F6
- Shadow: 0 0 0 3px rgba(59,130,246,0.1)

### Input States

**Default:**
- Border: 1px solid #E2E8F0
- Background: White

**Focus:**
- Border: 2px solid #3B82F6
- Shadow: 0 0 0 3px rgba(59,130,246,0.1)
- Outline: None

**Error:**
- Border: 2px solid #EF4444
- Shadow: 0 0 0 3px rgba(239,68,68,0.1)

**Success:**
- Border: 2px solid #22C55E
- Icon: CheckCircle (right side)

---

## 🎬 Animations & Transitions

### Page Transitions

**Fade In:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
duration: 0.3s
easing: ease-out
```

**Slide In (from right):**
```css
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
duration: 0.4s
easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### Component Animations

**Card Hover:**
- Duration: 0.3s
- Easing: ease-out
- Properties: transform, box-shadow

**Button Click:**
- Duration: 0.15s
- Easing: ease-in-out
- Properties: transform, box-shadow

**Loading Spinner:**
- Duration: 1s
- Easing: linear
- Iteration: infinite

**Toast Notifications:**
- Slide in from top: 0.3s
- Stay: 3s
- Fade out: 0.3s

### Micro-interactions

**Success Checkmark:**
- Draw animation: 0.5s
- Scale pulse: 0.3s
- Color: #22C55E

**Error Shake:**
- Shake horizontal: 0.4s
- Distance: 10px
- Iterations: 2

**Number Counter:**
- Count up animation: 1s
- Easing: ease-out

---

## 📊 Component Library

### Buttons

**Variants:**
1. Primary (Solid)
2. Secondary (Outline)
3. Ghost (Transparent)
4. Danger (Red)
5. Success (Green)

**Sizes:**
- Small: 32px height
- Medium: 40px height
- Large: 48px height

### Cards

**Variants:**
1. Default (White background)
2. Elevated (With shadow)
3. Outlined (Border, no shadow)
4. Gradient (Background gradient)

### Badges

**Variants:**
1. Success (Green)
2. Warning (Yellow)
3. Error (Red)
4. Info (Blue)
5. Neutral (Gray)

**Sizes:**
- Small: 20px height
- Medium: 24px height

### Forms

**Components:**
1. Text Input
2. Number Input
3. Select Dropdown
4. Multi-select
5. Date Picker
6. File Upload (Drag & Drop)
7. Radio Group
8. Checkbox Group
9. Toggle Switch
10. Slider

### Modals

**Sizes:**
- Small: 400px width
- Medium: 600px width
- Large: 800px width
- Full: 90% width

**Overlay:**
- Background: rgba(0,0,0,0.5)
- Backdrop filter: blur(4px)

### Loading States

**Spinners:**
1. Circular (default)
2. Dots (three dots)
3. Progress bar

**Skeletons:**
- Card skeleton
- Table skeleton
- List skeleton

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
  --sidebar-width: 0 (hidden)
  --card-columns: 1
  --padding: 16px
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1439px) {
  --sidebar-width: 72px (collapsed)
  --card-columns: 2
  --padding: 24px
}

/* Desktop */
@media (min-width: 1440px) {
  --sidebar-width: 260px
  --card-columns: 4
  --padding: 48px
}
```

---

## 🎯 Figma Deliverables Checklist

### Wireframes
- [ ] Dashboard Home (Desktop)
- [ ] Dashboard Home (Tablet)
- [ ] Crop Batch List (Desktop)
- [ ] Crop Batch List (Tablet)
- [ ] Quality Check Form (Desktop)
- [ ] Tokenization View (Desktop)
- [ ] History Timeline (Desktop)
- [ ] AI Insights (Desktop)
- [ ] Profile Settings (Desktop)

### Interactive Prototype
- [ ] Navigation flows between screens
- [ ] Button hover states
- [ ] Form input interactions
- [ ] Modal open/close
- [ ] Dropdown menus
- [ ] Tab switching
- [ ] Toast notifications

### Component Library
- [ ] Buttons (all variants & sizes)
- [ ] Cards (all variants)
- [ ] Forms (all input types)
- [ ] Badges (all variants)
- [ ] Icons (all used icons)
- [ ] Modals (all sizes)
- [ ] Loading states
- [ ] Navigation components
- [ ] Summary cards
- [ ] Alert cards

### Style Guide
- [ ] Color palette swatches
- [ ] Typography specimens
- [ ] Spacing examples
- [ ] Shadow examples
- [ ] Border radius examples
- [ ] Icon library reference

---

## 🎨 Figma Organization

**Page Structure:**
```
📁 Producer AI Dashboard
  📄 Cover (Project overview)
  📄 Design System
    ├─ Colors
    ├─ Typography
    ├─ Spacing
    ├─ Components
  📄 Wireframes - Desktop
    ├─ Dashboard Home
    ├─ Crop Batches
    ├─ Quality Checks
    ├─ Tokenization
    ├─ History
    ├─ AI Insights
    ├─ Profile
  📄 Wireframes - Tablet
  📄 Interactive Prototype
  📄 Component Library
```

**Naming Convention:**
```
Frames: screen-name-variant
Components: component-type/variant/size
Colors: color-name-shade
Text Styles: type/weight/size
```

---

## ✅ Implementation Status

**Currently Implemented:** ✅ All features are already built in React  
**Location:** `/components/ProducerAIDashboard.tsx`

**This Design Spec provides:**
- Complete visual design system
- Detailed component specifications
- Interaction states & animations
- Responsive layouts
- Figma-ready documentation

**Use this document to:**
1. Create Figma designs matching the React implementation
2. Share with designers for visual refinement
3. Document design decisions
4. Ensure consistency across platforms

---

**Version:** 1.0  
**Last Updated:** October 22, 2025  
**Status:** ✅ COMPLETE & READY FOR FIGMA
