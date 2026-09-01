# Figma Design Specification - Commission Agent Flow

## 🎯 Overview

**Complete Figma design specification** for the 8-screen Commission Agent Order Flow in the TRADIE app. This guide provides exact measurements, layouts, component specifications, and prototyping instructions for creating a pixel-perfect, interactive Figma mockup.

**Created**: October 22, 2025  
**Status**: ✅ Ready for Figma Implementation  
**Screens**: 8 complete screens  
**Platform**: Mobile-first (375x812px base), Responsive to Desktop

---

## 📐 Design Foundation

### Artboard Sizes

**Mobile (Primary)**
- iPhone 14/15: 390x844px
- Safe Area: 16px padding all sides
- Bottom Nav Bar: 80px height (if applicable)

**Tablet**
- iPad: 768x1024px
- Safe Area: 24px padding all sides

**Desktop**
- Web: 1440x900px
- Max Content Width: 1280px
- Centered with auto margins

### Grid System

**Mobile Grid**
- Columns: 4
- Gutter: 16px
- Margin: 16px

**Tablet Grid**
- Columns: 8
- Gutter: 16px
- Margin: 24px

**Desktop Grid**
- Columns: 12
- Gutter: 24px
- Margin: 40px

---

## 🎨 Design Tokens (Figma Styles)

### Color Styles

Create these as Figma color styles:

**Primary Colors**
- `Primary/Blue/Base` - #003E6D
- `Primary/Blue/Light` - #0056A3
- `Primary/Blue/Dark` - #002947

**Accent Colors**
- `Accent/Gold/Base` - #FFD700
- `Accent/Gold/Light` - #FFED4E
- `Accent/Gold/Dark` - #CCB000

**Gradients**
- `Background/Gradient` - Linear gradient from #F7FAFC (top) to #D9F2FF (bottom)

**Semantic Colors**
- `Success/Green` - #10B981
- `Error/Red` - #EF4444
- `Warning/Yellow` - #F59E0B
- `Info/Blue` - #3B82F6

**Neutral Colors**
- `Gray/50` - #F9FAFB
- `Gray/100` - #F3F4F6
- `Gray/200` - #E5E7EB
- `Gray/300` - #D1D5DB
- `Gray/600` - #4B5563
- `Gray/900` - #111827

**Surface Colors**
- `Surface/Card` - #FFFFFF with 90% opacity
- `Surface/Overlay` - #000000 with 50% opacity

### Typography Styles

**Headings (Playfair Display)**
- `H1/Desktop` - 48px, Bold, Line 56px, Letter -0.5px
- `H1/Mobile` - 32px, Bold, Line 40px, Letter -0.5px
- `H2/Desktop` - 36px, SemiBold, Line 44px, Letter -0.3px
- `H2/Mobile` - 24px, SemiBold, Line 32px, Letter -0.3px
- `H3/Desktop` - 28px, SemiBold, Line 36px, Letter -0.2px
- `H3/Mobile` - 20px, SemiBold, Line 28px, Letter -0.2px

**Labels (Montserrat)**
- `Label/Large` - 16px, SemiBold, Line 24px, Letter 0px
- `Label/Medium` - 14px, SemiBold, Line 20px, Letter 0px
- `Label/Small` - 12px, SemiBold, Line 16px, Letter 0.5px

**Body (Lato)**
- `Body/Large` - 16px, Regular, Line 24px, Letter 0px
- `Body/Medium` - 14px, Regular, Line 20px, Letter 0px
- `Body/Small` - 12px, Regular, Line 16px, Letter 0px

### Spacing Scale

Create these as Figma spacing tokens (use 8px base grid):
- `Space/XXS` - 4px
- `Space/XS` - 8px
- `Space/SM` - 12px
- `Space/MD` - 16px
- `Space/LG` - 24px
- `Space/XL` - 32px
- `Space/XXL` - 48px
- `Space/XXXL` - 64px

### Border Radius

- `Radius/SM` - 4px (small elements)
- `Radius/MD` - 8px (inputs, buttons)
- `Radius/LG` - 12px (cards)
- `Radius/XL` - 16px (modal dialogs)
- `Radius/Full` - 9999px (pills, badges)

### Shadows

- `Shadow/SM` - X:0, Y:1, Blur:2, Spread:0, Color:#00000010
- `Shadow/MD` - X:0, Y:4, Blur:6, Spread:-1, Color:#00000010
- `Shadow/LG` - X:0, Y:10, Blur:15, Spread:-3, Color:#00000010
- `Shadow/XL` - X:0, Y:20, Blur:25, Spread:-5, Color:#00000010

---

## 🧩 Figma Component Library

### 1. Buttons

**Primary Button**
- Size: Auto-layout horizontal
- Padding: 12px (vertical) × 24px (horizontal)
- Background: `Accent/Gold/Base` (#FFD700)
- Border Radius: `Radius/MD` (8px)
- Text: `Label/Large`, Color: `Gray/900`
- Height: 48px (min)
- Icon: 20×20px, Spacing: 8px from text
- States: Default, Hover, Pressed, Disabled

**Secondary Button**
- Same as Primary
- Background: Transparent
- Border: 2px solid `Primary/Blue/Base`
- Text Color: `Primary/Blue/Base`

**Outline Button**
- Same as Secondary
- Border: 1px solid `Gray/300`
- Text Color: `Gray/700`

**Component Variants in Figma**
- Property: `Type` - Primary, Secondary, Outline
- Property: `State` - Default, Hover, Pressed, Disabled
- Property: `Size` - Small (40px), Medium (48px), Large (56px)
- Property: `Icon` - None, Left, Right, Both

### 2. Input Fields

**Text Input**
- Width: Fill container
- Height: 48px
- Padding: 12px (vertical) × 16px (horizontal)
- Background: `Gray/50`
- Border: 1px solid `Gray/300`
- Border Radius: `Radius/MD` (8px)
- Text: `Body/Large`, Color: `Gray/900`
- Placeholder: `Body/Large`, Color: `Gray/400`

**Label Above Input**
- Text: `Label/Medium`, Color: `Gray/700`
- Margin Bottom: 8px

**States**
- Default
- Focus (Border: 2px solid `Primary/Blue/Base`)
- Error (Border: 2px solid `Error/Red`)
- Disabled (Background: `Gray/100`, Text: `Gray/400`)

**Component Variants**
- Property: `State` - Default, Focus, Error, Disabled
- Property: `Has Icon` - Boolean
- Property: `Label` - Visible, Hidden

### 3. Cards

**Base Card**
- Auto-layout vertical
- Padding: 24px
- Background: `Surface/Card` (#FFFFFF 90%)
- Border Radius: `Radius/LG` (12px)
- Shadow: `Shadow/MD`
- Backdrop Blur: 8px (if supported)

**Card Header**
- Auto-layout horizontal
- Spacing: 12px
- Align Items: Center
- Margin Bottom: 16px
- Icon: 24×24px
- Title: `H3/Mobile`, Color: `Primary/Blue/Base`

**Component Variants**
- Property: `Padding` - Compact (16px), Default (24px), Spacious (32px)
- Property: `Has Shadow` - Boolean
- Property: `Background Style` - Solid, Glass (with blur)

### 4. Badges

**Badge Component**
- Auto-layout horizontal
- Padding: 4px (vertical) × 12px (horizontal)
- Border Radius: `Radius/Full`
- Text: `Label/Small`
- Height: 24px

**Badge Variants**
- `Success` - Background: `Success/Green`, Text: White
- `Error` - Background: `Error/Red`, Text: White
- `Warning` - Background: `Warning/Yellow`, Text: `Gray/900`
- `Info` - Background: `Info/Blue`, Text: White
- `Neutral` - Background: `Gray/200`, Text: `Gray/700`

**Component Properties**
- Property: `Type` - Success, Error, Warning, Info, Neutral
- Property: `Size` - Small (20px), Medium (24px), Large (28px)
- Property: `Has Icon` - Boolean

### 5. OTP Input

**6-Digit OTP Component**
- Auto-layout horizontal
- Spacing: 12px
- 6 individual input boxes

**Single OTP Box**
- Size: 48×48px (mobile), 56×56px (tablet/desktop)
- Background: `Gray/50`
- Border: 2px solid `Gray/300`
- Border Radius: `Radius/MD` (8px)
- Text: `H2/Mobile`, Center aligned, Color: `Primary/Blue/Base`

**States**
- Empty - Border: `Gray/300`
- Filled - Border: `Primary/Blue/Base`, Background: `Primary/Blue/Base` 5% opacity
- Active/Focus - Border: `Accent/Gold/Base`, Scale: 1.05

### 6. Progress Bar

**Progress Component**
- Width: Fill container
- Height: 8px
- Background: `Gray/200`
- Border Radius: `Radius/Full`

**Progress Fill**
- Background: Linear gradient from `Accent/Gold/Base` to `Accent/Gold/Light`
- Border Radius: `Radius/Full`
- Width: Based on percentage (0-100%)
- Animation: Smooth transition 0.3s ease

**With Label**
- Text above: `Label/Small`, Color: `Gray/600`
- Percentage: `Label/Small`, Color: `Gray/900`, Right aligned

### 7. Checkbox & Radio

**Checkbox**
- Size: 20×20px
- Border: 2px solid `Gray/400`
- Border Radius: `Radius/SM` (4px)
- Checked: Background `Primary/Blue/Base`, Checkmark icon white
- Disabled: Background `Gray/100`, Border `Gray/300`

**Radio Button**
- Size: 20×20px
- Border: 2px solid `Gray/400`
- Border Radius: `Radius/Full`
- Selected: Border `Primary/Blue/Base`, Inner circle 10×10px `Primary/Blue/Base`

### 8. Selection Cards (Radio as Cards)

**Selectable Card**
- Same as Base Card
- Border: 2px solid transparent (default)
- Selected: Border: 2px solid `Primary/Blue/Base`, Background tint: `Primary/Blue/Base` 5%
- Hover: Border: 2px solid `Gray/300`
- Padding: 16px
- Cursor: Pointer

**Component Structure**
- Auto-layout vertical
- Header with icon (left) and checkbox/radio (right)
- Title: `Label/Large`, Color: `Primary/Blue/Base`
- Description: `Body/Medium`, Color: `Gray/600`

---

## 📱 Screen-by-Screen Specifications

### Screen 1: Storage or Sell Decision

**Artboard**: 390×844px (iPhone 14/15)

**Layout Structure**:
```
┌─────────────────────────────────┐
│ [Gradient Background]           │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Icon (Gold) + Title         │ │ ← Header, 16px from top
│ │ "Store or Sell Your         │ │
│ │ Commodity"                  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │ ← Info Card
│ │ ✓ Your lot and tokenization │ │   24px margin
│ │   are complete              │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │ ← Store Button
│ │ [Warehouse Icon]            │ │   Selection Card
│ │ Store                       │ │   24px spacing
│ │ Find secure storage...      │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │ ← Sell Button
│ │ [Shopping Cart Icon]        │ │   Selection Card
│ │ Sell                        │ │
│ │ List your commodity...      │ │
│ └─────────────────────────────┘ │
│                                 │
│ [Continue Button]               │ ← Bottom, 16px margin
└─────────────────────────────────┘
```

**Measurements**:
- Header from top: 16px + safe area
- Icon size: 32×32px (Gold)
- Title: H2/Mobile style
- Info card height: Auto (min 60px)
- Selection cards: 
  - Height: 100px
  - Spacing between: 16px
  - Icon: 40×40px
  - Title: Label/Large
  - Description: Body/Medium
- Continue button: 
  - Height: 56px
  - Margin from bottom: 16px + safe area
  - Full width minus 32px margin

**Interactive States**:
- Store card: Tap → Border blue, background tint
- Sell card: Tap → Border blue, background tint
- Continue button: Enabled only after selection

### Screen 2: Storage Facility Selection

**Artboard**: 390×844px

**Layout Structure**:
```
┌─────────────────────────────────┐
│ [← Back] Storage Selection      │ ← Header Bar, sticky
│ ─────────────────────────────── │
│                                 │
│ ┌─────────────────────────────┐ │
│ │                             │ │ ← Map View
│ │     [Map with Markers]      │ │   Height: 250px
│ │                             │ │
│ └─────────────────────────────┘ │
│                                 │
│ [Filter Chips]                  │ ← Horizontal scroll
│ Capacity | Price | Distance     │   48px height
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Punjab Storage Co           │ │ ← Facility Card 1
│ │ ★★★★★ 4.8                   │ │
│ │ 📍 5.2 km  💰 ₹25/kg/mo    │ │
│ │ [Select This Facility]      │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │ ← Facility Card 2
│ │ Modern Warehousing          │ │
│ │ ★★★★☆ 4.5                   │ │
│ │ 📍 7.8 km  💰 ₹22/kg/mo    │ │
│ │ [Select This Facility]      │ │
│ └─────────────────────────────┘ │
│                                 │
│ [Scrollable List Continues...]  │
└─────────────────────────────────┘
```

**Measurements**:
- Header bar: 56px height, sticky
- Back button: 40×40px tap target
- Map view: 250px height, full width
- Filter chips:
  - Height: 36px
  - Padding: 8px × 16px
  - Spacing: 8px
  - Horizontal scroll
- Facility cards:
  - Height: Auto (min 120px)
  - Padding: 16px
  - Spacing: 12px
  - Star rating: 16px icons
  - Metadata icons: 16×16px
  - Select button: 40px height

**Map Component**:
- Use Figma plugin for map (Mapsicle or similar)
- Markers: Custom 32×32px icons
- User location: Blue dot 12×12px
- Zoom controls: Bottom-right, 40×40px each

### Screen 3: Marketplace & Agent Browsing

**Artboard**: 390×844px

**Layout Structure**:
```
┌─────────────────────────────────┐
│ [← Back] Browse Agents          │ ← Header Bar
│ ─────────────────────────────── │
│ [🔍 Search agents...]           │ ← Search Bar, 48px
│                                 │
│ [Marketplaces] [Agents ✓]      │ ← Tabs, 48px
│ ─────────────────────────────── │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ [Avatar] PSR & Co           │ │ ← Agent Card 1
│ │ Rajesh Sharma               │ │
│ │ ★★★★★ 4.9  [Verified ✓]    │ │
│ │ 📍 Ludhiana  💰 2.5%        │ │
│ │                             │ │
│ │ [Contact] [Engage Agent]    │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │ ← Agent Card 2
│ │ [Avatar] Kumar Trading      │ │
│ │ Amit Kumar                  │ │
│ │ ★★★★☆ 4.7                   │ │
│ │ 📍 Jalandhar  💰 3.0%       │ │
│ │                             │ │
│ │ [Contact] [Engage Agent]    │ │
│ └─────────────────────────────┘ │
│                                 │
│ [More agents...]                │
└─────────────────────────────────┘
```

**Measurements**:
- Search bar:
  - Height: 48px
  - Padding: 12px × 16px
  - Icon: 20×20px (left)
  - Border radius: 24px (pill shape)
- Tab selector:
  - Height: 48px
  - Each tab: 50% width
  - Active indicator: 3px bottom border gold
- Agent cards:
  - Height: Auto (min 160px)
  - Padding: 20px
  - Avatar: 64×64px circle, top-left
  - Company name: Label/Large
  - Agent name: Body/Medium, Gray/600
  - Rating + verified: Horizontal auto-layout
  - Metadata: Body/Small icons 16×16px
  - Buttons: 
    - Contact: Outline style, 40px height
    - Engage: Primary style, 40px height
    - Spacing: 8px

### Screen 4: Commodity Listing for Sale

**Artboard**: 390×844px

**Layout Structure**:
```
┌─────────────────────────────────┐
│ [← Back] List Commodity         │
│ ─────────────────────────────── │
│                                 │ ← Scrollable form
│ Location (auto-filled)          │
│ [📍 Ludhiana, Punjab] [GPS]    │
│                                 │
│ Commodity Type                  │
│ [Wheat ▼]                       │
│                                 │
│ Quantity (kg)                   │
│ [1000]                          │
│                                 │
│ Quality Grade                   │
│ [Grade A ▼]                     │
│                                 │
│ Expected Price (per kg)         │
│ [₹ 2500]                        │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ [📷 Upload Photos/Videos]   │ │ ← Upload area
│ │ Drag or click to upload     │ │   Dashed border
│ └─────────────────────────────┘ │   120px height
│                                 │
│ [Preview Grid: 3 columns]       │ ← Media preview
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🤖 AI Assessment            │ │ ← AI Results Card
│ │ Size: Medium to Large       │ │   (after analysis)
│ │ Color: Golden yellow        │ │
│ │ Quality: Grade A confirmed  │ │
│ │ Confidence: 94%             │ │
│ └─────────────────────────────┘ │
│                                 │
│ [List for Sale]                 │ ← Bottom button
└─────────────────────────────────┘
```

**Measurements**:
- Form spacing: 24px between fields
- Input fields: 48px height
- Dropdown indicators: 20×20px chevron icon
- GPS button: 40×40px
- Upload area:
  - Height: 120px
  - Border: 2px dashed Gray/300
  - Border radius: 12px
  - Icon: 48×48px camera
  - Text: Body/Medium
- Media preview grid:
  - 3 columns
  - Gap: 8px
  - Each thumbnail: Square, aspect 1:1
- AI card:
  - Padding: 20px
  - Background: Blue/50 tint
  - Icon: 24×24px robot
  - Results: Auto-layout vertical, 8px spacing
- Submit button: 56px height, 16px from bottom

### Screen 5: Chat Screen

**Artboard**: 390×844px

**Layout Structure**:
```
┌─────────────────────────────────┐
│ [← Back] [Avatar] Buyer Name    │ ← Header, 56px
│ Virtual: +91-***-***-1234       │   Gray/600
│ ─────────────────────────────── │
│                                 │
│ ┌───────────────────────┐       │ ← Incoming message
│ │ Hello, interested in  │       │   Left aligned
│ │ your wheat lot        │       │   Gray/100 bg
│ │            10:30 AM ✓│       │   Body/Medium
│ └───────────────────────┘       │
│                                 │
│       ┌───────────────────────┐ │ ← Outgoing message
│       │ Yes, Grade A quality  │ │   Right aligned
│       │ 1000kg available      │ │   Blue/500 bg
│       │ 10:32 AM ✓✓          │ │   White text
│       └───────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │ ← Quick action
│ │ 📋 Share Lot Details        │ │   Button
│ └─────────────────────────────┘ │
│                                 │
│ [Type message...]  [📎] [➤]    │ ← Input bar, 64px
└─────────────────────────────────┘   Bottom sticky
```

**Measurements**:
- Header:
  - Height: 56px
  - Avatar: 40×40px circle
  - Name: Label/Large
  - Virtual number: Body/Small, Gray/600
- Message bubbles:
  - Max width: 75% of screen
  - Padding: 12px × 16px
  - Border radius: 16px (incoming: top-right sharp, outgoing: top-left sharp)
  - Margin between: 8px
  - Timestamp: Body/Small, 10px margin top
  - Read receipts: 16×16px checkmarks
- Quick actions:
  - Height: 48px
  - Full width minus 32px margin
  - Outline style
  - Icon: 20×20px left
- Input bar:
  - Height: 64px
  - Background: White
  - Shadow: Top shadow only
  - Input field: Flex-grow
  - Attachment button: 40×40px
  - Send button: 40×40px, Gold background

### Screen 6: Commission Agent Engagement

**Artboard**: 390×844px

**Layout Structure**:
```
┌─────────────────────────────────┐
│ [← Back] Engage Agent           │
│ ─────────────────────────────── │
│                                 │
│ ┌─────────────────────────────┐ │ ← Agent Profile Card
│ │ [Avatar 80×80]              │ │
│ │ PSR & Co                    │ │
│ │ Rajesh Sharma               │ │
│ │ ★★★★★ 4.9  [Verified ✓]    │ │
│ │ 📞 +91-98123-45678          │ │
│ │ 📍 Ludhiana, Punjab         │ │
│ │ 💰 Commission: 2.5%         │ │
│ └─────────────────────────────┘ │
│                                 │
│ Select engagement type:         │
│                                 │
│ ┌─────────────────────────────┐ │ ← Service option 1
│ │ ○ Direct Sale Assistance   │ │   Radio card
│ │ Agent helps you find buyers │ │
│ │ and negotiate...            │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │ ← Service option 2
│ │ ○ Representation for Sale  │ │   Radio card
│ │ Agent fully represents you │ │
│ │ in sale...                  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │ ← OTP Section
│ │ 🛡️ OTP Confirmation         │ │
│ │                             │ │
│ │ Producer OTP                │ │
│ │ [1][2][3][4][5][6]         │ │
│ │                             │ │
│ │ Agent OTP                   │ │
│ │ [7][8][9][0][1][2]         │ │
│ │                             │ │
│ │ [Send OTP] [Verify OTP]    │ │
│ └─────────────────────────────┘ │
│                                 │
│ [Confirm Engagement]            │
└─────────────────────────────────┘
```

**Measurements**:
- Agent profile card:
  - Padding: 24px
  - Avatar: 80×80px, center top
  - Company: H3/Mobile
  - Name: Body/Large, Gray/600
  - Metadata: Auto-layout vertical, 8px spacing, icons 16×16px
- Service selection cards:
  - Height: Auto (min 100px)
  - Padding: 16px
  - Radio: 20×20px, top-left
  - Title: Label/Large, 8px from radio
  - Description: Body/Medium, Gray/600
  - Spacing: 12px between cards
- OTP section:
  - Padding: 20px
  - Background: Gray/50
  - Border radius: 12px
  - OTP grid: 6 boxes × 48px
  - Spacing: 8px
  - Labels: Label/Medium, 12px margin bottom
  - Buttons: 40px height, inline, 8px spacing
- Confirm button: 56px height, disabled until verified

### Screen 7: Order Confirmation & Verification

**Artboard**: 390×844px (Scrollable)

**Layout Structure**:
```
┌─────────────────────────────────┐
│ [← Back] Order Confirmation     │
│ ─────────────────────────────── │
│                                 │ ← Scroll container
│ Order Summary                   │
│ ┌─────────────────────────────┐ │
│ │ Producer: Rajesh Kumar      │ │
│ │ Contact: +91-98765-43210    │ │
│ │ Location: Ludhiana          │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Commodity: Wheat            │ │
│ │ Lot IDs: LOT-001, LOT-002   │ │
│ │ Quantity: 1000 kg           │ │
│ │ Grade: A                    │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Agent: PSR & Co             │ │
│ │ Commission: 2.5%            │ │
│ └─────────────────────────────┘ │
│                                 │
│ Enter OTP to confirm            │
│ [1][2][3][4][5][6]             │
│ [Resend OTP]                    │
│                                 │
│ ┌─────────────────────────────┐ │ ← Media upload
│ │ 📷 Capture for AI Analysis  │ │
│ │ [Upload] [Camera]           │ │
│ │                             │ │
│ │ [Preview thumbnails...]     │ │
│ └─────────────────────────────┘ │
│                                 │
│ ☐ I agree to terms & conditions │
│                                 │
│ Digital Signature               │
│ [Type your full name...]        │
│                                 │
│ Date: October 22, 2025          │
│                                 │
│ [Confirm Order]                 │
└─────────────────────────────────┘
```

**Measurements**:
- Summary sections:
  - Padding: 16px
  - Background: Gray/50
  - Border radius: 8px
  - Spacing: 12px between sections
  - Text: Body/Medium
  - Labels: Body/Small, Gray/600
- OTP input: Same as Screen 6
- Media upload:
  - Height: Auto
  - Padding: 20px
  - Border: 2px dashed
  - Buttons: 40px, side-by-side
  - Preview: 3 columns, 80×80px each
- Checkbox: 20×20px
- Signature input: 48px height
- Date: Body/Medium, Gray/600, background Gray/50, 12px padding
- Confirm button: 56px, gold, full width

### Screen 8: Grok AI Quality Assessment

**Artboard**: 390×844px

**Layout Structure**:
```
┌─────────────────────────────────┐
│ [← Back] AI Quality Validation  │
│ ─────────────────────────────── │
│                                 │
│ ┌─────────────────────────────┐ │ ← Camera viewport
│ │                             │ │   Full width
│ │                             │ │   16:9 aspect
│ │      [Live Camera View]     │ │   Or video player
│ │                             │ │
│ │      [Grid Overlay]         │ │
│ │                             │ │
│ │ [Flash] [Flip] [Grid]      │ │ ← Controls
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │ ← Real-time analysis
│ │ 🤖 Analyzing... 87%         │ │   (during capture)
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░         │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │ ← Results (after)
│ │ ✅ AI Assessment Complete   │ │
│ │                             │ │
│ │ Size Analysis               │ │
│ │ Medium to Large grains      │ │
│ │ (4.5-5.2mm)                │ │
│ │                             │ │
│ │ Color Quality               │ │
│ │ Golden yellow - Premium     │ │
│ │                             │ │
│ │ Overall Quality             │ │
│ │ Grade A confirmed           │ │
│ │                             │ │
│ │ Fraud Alert: ✅ No Issues   │ │
│ │                             │ │
│ │ Confidence Score: 94%       │ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 94%   │ │
│ └─────────────────────────────┘ │
│                                 │
│ [Approve and Continue]          │
└─────────────────────────────────┘
```

**Measurements**:
- Camera viewport:
  - Aspect ratio: 16:9 or 4:3
  - Width: Full container
  - Border radius: 12px
  - Controls: 40×40px each, bottom overlay
- Analysis progress:
  - Height: 80px
  - Padding: 16px
  - Icon: 24×24px animated
  - Progress bar: 8px height
  - Text: Label/Large
- Results card:
  - Padding: 24px
  - Background: White
  - Border: 2px solid Green (if pass) or Red (if fail)
  - Each result section: 12px spacing
  - Label: Label/Medium, Gray/700
  - Value: Body/Large, Primary/Blue
  - Confidence: Large progress bar, 12px height
  - Fraud alert: Prominent with icon
- Approve button: 56px, only enabled if pass

---

## 🔗 Prototyping Connections

### Flow Diagram in Figma

Create frames for all 8 screens, then connect with these interactions:

**From Screen 1 (Storage/Sell Decision)**
- Store button → Navigate to Screen 2 (Storage Facility Selection)
  - Animation: Push from right, 300ms ease
- Sell button → Navigate to Screen 4 (Commodity Listing)
  - Animation: Push from right, 300ms ease

**From Screen 2 (Storage Facility Selection)**
- Back button → Navigate back to Screen 1
  - Animation: Push from left, 300ms ease
- Select facility button → Navigate to Screen 3 (Marketplace Browsing)
  - Animation: Push from right, 300ms ease

**From Screen 3 (Marketplace Browsing)**
- Back button → Navigate to previous screen (conditional)
- Engage Agent button → Navigate to Screen 6 (Agent Engagement)
  - Animation: Push from right, 300ms ease
- Contact Marketplace → Navigate to Screen 5 (Chat)
  - Animation: Push from right, 300ms ease

**From Screen 4 (Commodity Listing)**
- Back button → Navigate to Screen 1
- List for Sale button → Navigate to Screen 5 (Chat) OR Screen 3
  - Animation: Push from right, 300ms ease

**From Screen 5 (Chat)**
- Back button → Navigate to previous screen

**From Screen 6 (Agent Engagement)**
- Back button → Navigate to Screen 3
- Confirm Engagement → Navigate to Screen 7 (Order Confirmation)
  - Animation: Push from right, 300ms ease

**From Screen 7 (Order Confirmation)**
- Back button → Navigate to Screen 6
- Confirm Order → Navigate to Screen 8 (AI Assessment)
  - Animation: Push from right, 300ms ease

**From Screen 8 (AI Assessment)**
- Back button → Navigate to Screen 7
- Approve and Continue → Navigate to Success Screen / Dashboard
  - Animation: Fade + Scale, 400ms ease

### Interactive Elements

**Buttons**
- On Click: Scale to 0.95, 100ms
- After Touch Up: Scale to 1.0, 200ms ease-out

**Input Focus**
- On Focus: Border width 2px, color Primary/Blue
- Animation: 200ms ease

**Card Selection**
- On Click: Border 2px Primary/Blue, background tint
- Animation: 150ms ease-out

**OTP Inputs**
- On Focus: Scale 1.05, border Accent/Gold
- Animation: 200ms ease-out-back

**Progress Bars**
- Change: Smooth transition 300ms ease

---

## 🎨 Creating Components in Figma

### Step-by-Step Component Creation

#### 1. Create Primary Button
1. Create rectangle: 200×48px
2. Fill: `Accent/Gold/Base`
3. Corner radius: 8px
4. Add text: "Button Text"
5. Create auto-layout: Padding 12px × 24px
6. Add icon (optional): 20×20px, 8px spacing
7. Create component (Cmd/Ctrl + Alt + K)
8. Add variants:
   - Default (normal state)
   - Hover (lightened background)
   - Pressed (darkened background)
   - Disabled (gray, 50% opacity)

#### 2. Create Input Field
1. Create rectangle: 327×48px (mobile width minus margins)
2. Fill: `Gray/50`
3. Stroke: 1px `Gray/300`
4. Corner radius: 8px
5. Add placeholder text inside
6. Create auto-layout: Padding 12px × 16px
7. Create component
8. Add variants for states

#### 3. Create Card
1. Create rectangle: 327×auto
2. Fill: White 90% opacity
3. Effects: Add `Shadow/MD` + Backdrop blur 8px
4. Corner radius: 12px
5. Create auto-layout: Padding 24px, spacing 16px
6. Add header (icon + text)
7. Add content area
8. Create component

#### 4. Create OTP Input Set
1. Create 6 squares: 48×48px each
2. Fill: `Gray/50`, Stroke: 2px `Gray/300`
3. Corner radius: 8px
4. Create auto-layout horizontal: Spacing 12px
5. Add center-aligned text placeholders
6. Create component with variants for empty/filled

---

## 📐 Responsive Behavior

### Mobile → Tablet Adaptation

**Changes at 768px breakpoint**:
- Grid: 4 columns → 8 columns
- Padding: 16px → 24px
- Cards: Stack vertical → 2-column grid
- OTP boxes: 48px → 56px
- Font sizes: Scale up 1.125x
- Buttons: 48px → 52px height

### Tablet → Desktop Adaptation

**Changes at 1024px breakpoint**:
- Max content width: 1280px, centered
- Grid: 8 columns → 12 columns
- Cards: 2 columns → 3 columns (where applicable)
- Side panels for detail views
- Hover states become active
- Larger spacing overall

---

## 🎬 Animation & Motion

### Micro-interactions

**Button Press**
- Keyframes: Scale 1.0 → 0.95 → 1.0
- Duration: 100ms + 200ms
- Easing: ease-out-back

**Input Focus**
- Border color: Gray/300 → Primary/Blue
- Border width: 1px → 2px
- Duration: 200ms
- Easing: ease

**Card Selection**
- Border: Transparent → Primary/Blue (2px)
- Background: White → Blue 5% tint
- Duration: 150ms
- Easing: ease-out

**Progress Bar Fill**
- Width: Animate from current to new percentage
- Duration: 300ms
- Easing: ease-in-out

**Modal/Sheet Entry**
- Transform: translateY(100%) → translateY(0%)
- Opacity: 0 → 1
- Duration: 400ms
- Easing: ease-out-expo

### Page Transitions

**Push Navigation**
- Current page: translateX(0%) → translateX(-30%), opacity 1 → 0.3
- New page: translateX(100%) → translateX(0%)
- Duration: 300ms
- Easing: ease-in-out

**Back Navigation**
- Reverse of push
- Duration: 300ms

---

## 🔧 Figma Plugins to Use

### Recommended Plugins

1. **Content Reel** - For realistic data population
2. **Unsplash** - For placeholder images
3. **Iconify** - For Lucide React icons
4. **Figmotion** - For complex animations
5. **Mapsicle** - For map views
6. **Stark** - For accessibility checking
7. **Autoflow** - For flow diagrams
8. **Design Lint** - For consistency checks

---

## ✅ Design Checklist

### Before Handoff

- [ ] All 8 screens created at 390×844px
- [ ] Tablet variant (768×1024px) for key screens
- [ ] Desktop variant (1440×900px) for key screens
- [ ] All colors defined as styles
- [ ] All text styles created
- [ ] All spacing consistent with 8px grid
- [ ] Components created for reusable elements
- [ ] Variants created for component states
- [ ] Prototype connections complete
- [ ] Animations defined
- [ ] Accessibility contrast checked (WCAG AA)
- [ ] Mobile safe areas respected
- [ ] Touch targets min 44×44px
- [ ] Developer handoff notes added
- [ ] Design system documentation linked

---

## 📦 Export Settings

### For Development

**Images**:
- Format: PNG (with transparency), JPG (photos)
- Scale: @1x, @2x, @3x (iOS), mdpi, xhdpi, xxhdpi (Android)

**Icons**:
- Format: SVG (preferred), PNG @2x
- Size: Export at design size

**Mockups**:
- Format: PNG @2x
- Include device frames (optional)

### For Presentation

**Prototype Link**:
- Share link with "Can view prototype" permission
- Set starting frame to Screen 1
- Enable hotspot hints

**PDF Export**:
- Include all screens
- Show prototype connections
- Add annotations

---

## 🎯 Summary

This specification provides everything needed to create a pixel-perfect Figma mockup of the Commission Agent Order Flow:

✅ 8 complete screen layouts with exact measurements  
✅ Component specifications with variants  
✅ Design token definitions  
✅ Prototype connection diagram  
✅ Animation specifications  
✅ Responsive behavior rules  
✅ Plugin recommendations  
✅ Export guidelines  

**Status**: Ready for Figma implementation  
**Next Step**: Create Figma file using these specifications

---

**Created**: October 22, 2025  
**Version**: 1.0  
**For**: TRADIE Commission Agent Flow  
**Platform**: Mobile-first, responsive to Desktop
