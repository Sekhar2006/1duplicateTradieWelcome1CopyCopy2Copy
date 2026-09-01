# 🎨 Storage & Sell Dashboard - Figma Design Specification

## 📐 Layout Structure

### Overall Dimensions
- **Canvas**: 1440px × 1024px (Desktop)
- **Mobile**: 375px × 812px
- **Tablet**: 768px × 1024px

### Main Container
- **Width**: 1440px max-width
- **Padding**: 24px horizontal, 24px vertical
- **Background**: Linear gradient
  - Start: #F7FAFC (top-left)
  - Middle: #E8F4FC (center)
  - End: #D9F2FF (bottom-right)
  - Angle: 135°

## 🎨 Color Palette

### Primary Colors
```
Gold Primary: #FFD700
Gold Dark: #FFC700
Deep Blue: #003E6D
Light Blue: #2F80ED
```

### Status Colors
```
Success Green: #27AE60
Success Light: #6FCF97
Warning Yellow: #E2B93B
Error Red: #E74C3C
Info Blue: #2F80ED
```

### Surface Colors
```
White: #FFFFFF
Light Gray: #F7FAFC
Medium Gray: #E8F4FC
Dark Gray: #5A6B7A
Text Gray: #8B9AA8
```

### Gradient Backgrounds
```
Success Gradient:
  - From: #27AE60
  - To: #6FCF97
  - Angle: 135°

Gold Gradient:
  - From: #FFD700
  - To: #FFC700
  - Angle: 135°

White-to-Light:
  - From: #FFFFFF
  - To: #F7FAFC
  - Angle: 135°

White-to-Gold:
  - From: #FFFFFF
  - To: #FFFEF0
  - Angle: 135°
```

## 📝 Typography

### Font Families
```css
Headings: Playfair Display, serif
Subheadings: Poppins, sans-serif
Body: Lato, sans-serif
Labels/Buttons: Montserrat, sans-serif
```

### Font Sizes
```
H1 (Page Title): 36px
H2 (Section Title): 24px
H3 (Card Title): 18px
H4 (Subsection): 16px
Body Large: 16px
Body: 14px
Body Small: 13px
Caption: 12px
Tiny: 11px
```

### Font Weights
```
Playfair Display: 700 (Bold only)
Poppins: 600 (Semibold)
Montserrat: 600 (Semibold), 700 (Bold)
Lato: 400 (Regular)
```

### Line Heights
```
Headings: 1.2 (tight)
Body: 1.5 (normal)
Labels: 1.4
```

### Letter Spacing
```
Headings: 0.5px
Labels: 0.5px
Buttons: 0.5px
Body: 0px
```

## 🎯 Component Specifications

### 1. Tokenization Success Banner

**Frame**: 1392px × 160px
**Padding**: 24px all sides
**Border**: 2px solid #27AE60
**Border Radius**: 24px
**Background**: Linear gradient (#FFFFFF → #F0FFF4)

**Elements**:
1. **Icon Circle**
   - Size: 64px × 64px
   - Background: Linear gradient (#27AE60 → #6FCF97)
   - Icon: CheckCircle2, 32px, white
   
2. **Title**
   - Font: Poppins Semibold, 24px
   - Color: #27AE60
   - Text: "Tokenization Complete! 🎉"
   
3. **Description**
   - Font: Lato Regular, 14px
   - Color: #5A6B7A
   - Max width: 600px
   
4. **Primary Button**
   - Width: 200px, Height: 48px
   - Background: Linear gradient (#FFD700 → #FFC700)
   - Border Radius: 12px
   - Font: Montserrat Bold, 16px
   - Color: #003E6D
   - Icon: Warehouse, 20px, left aligned
   
5. **Secondary Button**
   - Width: 180px, Height: 48px
   - Background: Transparent
   - Border: 2px solid #FFD700
   - Border Radius: 12px
   - Font: Montserrat Semibold, 16px
   - Color: #003E6D

---

### 2. AI Alerts Card

**Frame**: 1392px × Auto
**Padding**: 16px
**Border**: 2px solid rgba(255, 215, 0, 0.3)
**Border Radius**: 16px
**Background**: Linear gradient (#FFFFFF → #FFFEF0)

**Header**:
- Icon: Sparkles, 20px, #FFD700
- Title: Poppins Semibold, 15px, #003E6D
- Badge: "2 Active", Gold background

**Alert Item** (Each):
- Frame: Auto × Auto
- Padding: 12px
- Border Radius: 12px
- Background: rgba(231, 76, 60, 0.1) for high severity
- Background: rgba(226, 179, 59, 0.1) for medium severity

Elements:
- Icon: AlertTriangle, 20px, color based on severity
- Message: Lato Regular, 14px, #003E6D
- Recommendation: Lato Regular, 13px, #5A6B7A, prefixed with 💡

---

### 3. Tab Navigation

**Frame**: 1392px × 56px
**Background**: White
**Border**: 2px solid rgba(0, 62, 109, 0.1)
**Border Radius**: 16px
**Padding**: 4px

**Grid**: 4 columns, equal width

**Tab Item**:
- Inactive State:
  - Background: Transparent
  - Color: #5A6B7A
  - Font: Montserrat Semibold, 14px
  
- Active State:
  - Background: White
  - Border: 1px solid rgba(0, 62, 109, 0.1)
  - Box Shadow: 0 2px 4px rgba(0, 0, 0, 0.08)
  - Color: #003E6D
  
- Icon: 16px, aligned left with 8px gap

---

### 4. Storage Type Selection Grid

**Grid**: 6 columns (desktop), 3 columns (tablet), 2 columns (mobile)
**Gap**: 16px

**Storage Type Card**:
- Size: Auto × 180px
- Padding: 16px
- Border Radius: 16px
- Cursor: Pointer

States:
- **Unselected**:
  - Background: rgba(0, 62, 109, 0.05)
  - Border: None
  
- **Selected**:
  - Background: Color with 15% opacity (e.g., #2F80ED15)
  - Ring: 2px solid, color matches type
  
- **Hover**:
  - Transform: translateY(-2px)
  - Shadow: 0 4px 12px rgba(0, 0, 0, 0.1)

Elements:
1. **Icon Circle**
   - Size: 48px × 48px
   - Background: Type color with 20% opacity
   - Icon: 24px, type color
   - Margin: 0 auto 12px
   
2. **Title**
   - Font: Montserrat Semibold, 13px
   - Color: #003E6D
   - Align: Center
   
3. **Description**
   - Font: Lato Regular, 12px
   - Color: #5A6B7A
   - Align: Center

**Storage Type Colors**:
- Warehouse: #2F80ED
- Cold Storage: #56CCF2
- Open Storage: #27AE60
- Farm Storage: #F2994A
- Silo: #9B59B6
- Specialized: #FFD700

---

### 5. Search & Filter Bar

**Frame**: 1392px × 56px
**Background**: White
**Border Radius**: 16px
**Padding**: 16px

**Layout**: Flexbox, space-between

**Search Input**:
- Width: Flex-grow
- Height: 48px
- Padding: 12px 12px 12px 40px
- Border: 2px solid rgba(0, 62, 109, 0.1)
- Border Radius: 12px
- Icon: Search, 20px, #8B9AA8, positioned left
- Placeholder: Lato Regular, 14px, #8B9AA8

**Filter Button**:
- Width: 140px, Height: 48px
- Border: 2px solid rgba(0, 62, 109, 0.1)
- Border Radius: 12px
- Font: Montserrat Semibold, 14px
- Icon: Filter, 20px
- Gap: 8px

---

### 6. Facility Card

**Frame**: 1392px × Auto
**Padding**: 24px
**Border**: 2px solid
  - Default: rgba(0, 62, 109, 0.1)
  - Selected: #FFD700
**Border Radius**: 24px
**Background**:
  - Default: White
  - Selected: Linear gradient (#FFFFFF → #FFFEF0)

**Header Section**:
1. **Icon Box**
   - Size: 64px × 64px
   - Border Radius: 16px
   - Background: Storage type color with 15% opacity
   - Icon: Warehouse, 32px, storage type color
   
2. **Title Area**
   - Title: Poppins Semibold, 18px, #003E6D
   - Subtitle: Lato Regular, 14px, #5A6B7A
   - Badges: Inline, 8px gap
   
3. **Expand Button**
   - Size: 40px × 40px
   - Icon: ChevronDown/ChevronUp, 20px

**Metrics Grid**:
- Layout: 4 columns
- Gap: 16px
- Each metric:
  - Label: Lato Regular, 12px, #8B9AA8
  - Value: Poppins Semibold, 16px, #003E6D
  - Unit: Lato Regular, 12px, #8B9AA8

**Services Section**:
- Title: Montserrat Semibold, 14px, #003E6D
- Badges: Flex wrap, 8px gap
- Badge:
  - Padding: 6px 12px
  - Border: 1px solid rgba(0, 62, 109, 0.2)
  - Border Radius: 8px
  - Font: Lato Regular, 13px

**Expanded Details** (When expanded):
- Padding top: 16px
- Border top: 1px solid rgba(0, 62, 109, 0.1)
- Sections: Temperature, Security, Certifications, etc.
- Section spacing: 16px vertical

**Action Buttons** (Bottom):
- Layout: Flexbox, 12px gap
- Primary Button:
  - Flex: 1
  - Height: 48px
  - Background: Linear gradient (#FFD700 → #FFC700)
  - Border Radius: 12px
  - Font: Montserrat Bold, 14px
  
- Secondary Button:
  - Flex: 1
  - Height: 48px
  - Border: 2px solid #FFD700
  - Border Radius: 12px
  - Font: Montserrat Semibold, 14px

---

### 7. Badge Variants

**Size**: Auto × 24px
**Padding**: 4px 8px
**Border Radius**: 6px
**Font**: Montserrat Semibold, 12px

**Types**:

1. **Qualified**
   - Background: #FFD700
   - Color: #003E6D
   - Icon: Star, 12px
   
2. **AI Recommended**
   - Background: #FFD700
   - Color: #003E6D
   - Icon: Sparkles, 12px
   
3. **Compliant**
   - Background: rgba(39, 174, 96, 0.15)
   - Color: #27AE60
   - Icon: CheckCircle2, 12px
   
4. **Warning**
   - Background: rgba(226, 179, 59, 0.15)
   - Color: #E2B93B
   - Icon: AlertTriangle, 12px
   
5. **Negotiable**
   - Background: Transparent
   - Border: 1px solid #27AE60
   - Color: #27AE60
   
6. **Availability - Available**
   - Background: rgba(39, 174, 96, 0.15)
   - Color: #27AE60
   
7. **Availability - Busy**
   - Background: rgba(226, 179, 59, 0.15)
   - Color: #E2B93B

---

### 8. Packing Material Card

**Frame**: 1392px × 140px
**Padding**: 16px
**Border**: 2px solid
  - AI Recommended: #FFD700
  - Default: rgba(0, 62, 109, 0.1)
**Border Radius**: 12px
**Background**:
  - AI Recommended: Linear gradient (#FFFFFF → #FFFEF0)
  - Default: White

**Layout**: Flexbox, space-between

**Left Section**:
1. **Title Row**
   - Title: Poppins Semibold, 16px, #003E6D
   - Badges: Inline, 8px gap
   
2. **Meta Info**
   - Font: Lato Regular, 14px, #5A6B7A
   - Separator: " • "
   
3. **Anomaly Alert** (if present)
   - Font: Lato Regular, 12px, #E74C3C
   - Icon: AlertTriangle, 12px
   
4. **Certifications**
   - Badges: Flex wrap, 8px gap
   - Badge size: Auto × 22px
   - Font: Lato Regular, 12px

**Right Section**:
1. **Price Display**
   - Amount: Poppins Bold, 20px, #003E6D
   - Trend Icon: 20px, color based on trend
     - Up: #E74C3C
     - Down: #27AE60
     - Stable: #5A6B7A
   
2. **Unit**
   - Font: Lato Regular, 12px, #8B9AA8
   
3. **Order Button**
   - Width: 120px, Height: 36px
   - Background: Gradient if AI recommended
   - Font: Montserrat Semibold, 14px

---

### 9. Selling Path Card

**Size**: 640px × 400px (in 2-column grid)
**Padding**: 24px
**Border Radius**: 16px
**Cursor**: Pointer

States:
- **Unselected**:
  - Background: rgba(0, 62, 109, 0.05)
  - Border: None
  
- **Selected**:
  - Background: Path color with 15% opacity
  - Ring: 2px solid, path color

**Elements**:
1. **Icon Circle**
   - Size: 64px × 64px
   - Background: Path color with 20% opacity
   - Icon: 32px, path color
   - Margin bottom: 16px
   
2. **Title**
   - Font: Poppins Semibold, 18px, #003E6D
   - Margin bottom: 8px
   
3. **Description**
   - Font: Lato Regular, 14px, #5A6B7A
   - Margin bottom: 16px
   
4. **Benefits List**
   - Items: 3 benefits
   - Icon: CheckCircle2, 16px, path color
   - Text: Lato Regular, 13px, #5A6B7A
   - Gap: 8px
   
5. **Continue Button** (when selected)
   - Width: 100%, Height: 48px
   - Background: Linear gradient (path color)
   - Border Radius: 12px
   - Font: Montserrat Bold, 16px, white
   - Icon: ArrowRight, 20px, right aligned
   - Margin top: 16px

**Path Colors**:
- Store: #2F80ED
- Direct: #27AE60
- Agent: #FFD700
- Marketplace: #9B59B6

---

### 10. Commission Agent Card

**Frame**: 1392px × 160px
**Padding**: 20px
**Border**: 2px solid
  - Best Match: #FFD700
  - Default: rgba(0, 62, 109, 0.1)
**Border Radius**: 12px
**Background**:
  - Best Match: Linear gradient (#FFFFFF → #FFFEF0)
  - Default: White

**Layout**: Flexbox, space-between

**Left Section**:
1. **Title Row**
   - Name: Poppins Semibold, 16px, #003E6D
   - Badges: Inline, 8px gap
   
2. **Meta Info**
   - Font: Lato Regular, 14px, #5A6B7A
   - Format: "Market • Deals count"
   
3. **Specialization Tags**
   - Badges: Flex wrap, 8px gap
   - Size: Auto × 24px
   
4. **Metrics Row**
   - Items: Rating, Commission, AI Score
   - Font: Lato Regular, 14px, #5A6B7A
   - Icons: 16px
   - Gap: 16px

**Right Section**:
- **Engage Button**
  - Width: 160px, Height: 48px
  - Background: Linear gradient (#FFD700 → #FFC700) if available
  - Background: rgba(0, 62, 109, 0.1) if busy
  - Border Radius: 12px
  - Font: Montserrat Bold, 14px

---

### 11. AI Insights Card

**Frame**: 1392px × Auto
**Padding**: 20px
**Border Radius**: 12px
**Margin bottom**: 16px

**Backgrounds by Type**:
- Price Trend: rgba(47, 128, 237, 0.1)
- Anomaly: rgba(231, 76, 60, 0.1)
- Success: rgba(39, 174, 96, 0.1)
- Info: rgba(226, 179, 59, 0.1)

**Layout**:
1. **Icon**
   - Size: 24px × 24px
   - Color: Matches card type
   - Float: Left
   - Margin right: 12px
   
2. **Title**
   - Font: Poppins Semibold, 16px, #003E6D
   - Margin bottom: 8px
   
3. **Message**
   - Font: Lato Regular, 14px, #5A6B7A
   - Line height: 1.5
   
4. **Recommendation Badge**
   - Margin top: 12px
   - Padding: 6px 12px
   - Background: Card type color
   - Color: White
   - Border Radius: 8px
   - Font: Montserrat Semibold, 13px

---

## 📱 Responsive Breakpoints

### Desktop (1440px)
- 3-column grid for storage types
- 2-column grid for selling paths
- Full facility details visible
- Side-by-side layout

### Tablet (768px)
- 2-column grid for storage types
- 1-column grid for selling paths
- Collapsed facility details
- Stacked layout

### Mobile (375px)
- 2-column grid for storage types
- 1-column for everything else
- Always collapsed details
- Bottom navigation
- Larger touch targets (min 44px)

## 🎯 Spacing System

```
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 20px
2xl: 24px
3xl: 32px
4xl: 48px
```

**Component Spacing**:
- Section gaps: 24px
- Card gaps: 16px
- Element gaps: 8-12px
- Icon gaps: 8px
- Badge gaps: 8px

## 🖼️ Shadow System

```css
/* Card Shadow */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

/* Card Hover Shadow */
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

/* Selected Card Shadow */
box-shadow: 0 8px 24px rgba(255, 215, 0, 0.2);

/* Gold Glow */
box-shadow: 0 0 0 2px #FFD700,
            0 10px 30px -5px rgba(255, 215, 0, 0.3);
```

## 🎨 Icon Library

**Source**: Lucide React (https://lucide.dev)

**Used Icons**:
- Warehouse, Snowflake, Home, Building2
- Search, Filter, MapPin, Star
- Shield, Lock, ThermometerSun, FileCheck
- CheckCircle2, AlertTriangle, Info
- Package, Users, Truck, Store
- ShoppingCart, UserCheck, Settings
- Sparkles, Bell, Zap, Award
- TrendingUp, TrendingDown, ArrowRight
- Calendar, Phone, Mail
- ChevronDown, ChevronUp

**Size Guide**:
- Tab icons: 16px
- Badge icons: 12px
- Card icons: 20-24px
- Large icons: 32px
- Hero icons: 64px

## 📐 Grid System

**Container**:
- Max width: 1440px
- Padding: 24px
- Margin: 0 auto

**Columns**:
- Desktop: 12 columns
- Tablet: 8 columns
- Mobile: 4 columns

**Gutter**: 16px

## ✨ Animation Specifications

### Transitions
```css
/* Default */
transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

/* Hover */
transition: transform 150ms ease;
transform: translateY(-2px);

/* Click/Tap */
transition: transform 100ms ease;
transform: scale(0.98);
```

### Keyframes
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Expand */
@keyframes expand {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 1000px;
    opacity: 1;
  }
}
```

## 🎯 Interactive States

### Buttons
```
Default → Shadow: none
Hover → Shadow: 0 4px 12px rgba(0, 0, 0, 0.15)
Active → Scale: 0.98
Disabled → Opacity: 0.5, Cursor: not-allowed
```

### Cards
```
Default → Border: rgba(0, 62, 109, 0.1)
Hover → Shadow: 0 4px 16px rgba(0, 0, 0, 0.12)
Selected → Border: #FFD700, Glow effect
Active → Transform: scale(0.99)
```

### Inputs
```
Default → Border: rgba(0, 62, 109, 0.1)
Focus → Border: #FFD700, Outline: 2px
Error → Border: #E74C3C
Success → Border: #27AE60
```

## 📊 Component Hierarchy

```
StorageAndSellDashboard
├── TokenizationBanner
├── AIAlertsCard
├── TabNavigation
│   ├── StorageTab
│   │   ├── StorageTypeGrid
│   │   ├── SearchFilterBar
│   │   └── FacilityList
│   │       └── FacilityCard (expandable)
│   ├── PackingTab
│   │   ├── PackingMaterialsList
│   │   ├── LaborServicesList
│   │   └── MachineRentalsList
│   ├── SellTab
│   │   ├── SellingPathGrid
│   │   └── CommissionAgentsList
│   └── AIInsightsTab
│       ├── InsightCardsList
│       └── PerformanceMetrics
```

## 🎨 Figma Auto Layout Settings

### Tokenization Banner
```
Direction: Horizontal
Spacing: 16px
Padding: 24px
Horizontal resizing: Fill
Vertical resizing: Hug
Alignment: Top
```

### Facility Card
```
Direction: Vertical
Spacing: 16px
Padding: 24px
Horizontal resizing: Fill
Vertical resizing: Hug
```

### Button
```
Direction: Horizontal
Spacing: 8px
Padding: 12px 24px
Horizontal resizing: Hug
Vertical resizing: Fixed (48px)
Alignment: Center
```

## 📏 Export Settings

### Images
- Format: PNG
- Resolution: 2x (Retina)
- Background: Transparent

### Icons
- Format: SVG
- Size: Fixed (don't scale)
- Outline: None

### Components
- Export as: Component
- Include: All variants
- Format: Figma components

---

## 🚀 Quick Start for Designers

1. **Create New File** in Figma
2. **Set Canvas** to 1440 × 1024
3. **Apply Background Gradient**
4. **Import Lucide Icons** from plugin
5. **Set up Text Styles**:
   - H1, H2, H3, Body, Caption, Label
6. **Create Color Styles**:
   - Primary, Success, Warning, Error, Gold
7. **Build Components** in this order:
   - Buttons first
   - Badges second
   - Cards third
   - Complex layouts last
8. **Use Auto Layout** everywhere
9. **Create Variants** for states
10. **Test Responsive** layouts

---

**Design Status**: ✅ Specification Complete
**Version**: 1.0.0
**Last Updated**: October 23, 2025
**Compatible**: Figma, Adobe XD, Sketch
