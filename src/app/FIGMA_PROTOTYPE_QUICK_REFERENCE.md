# 🎨 **FIGMA PROTOTYPE - QUICK REFERENCE GUIDE**

**Project**: TRADIE Commodity Trading App  
**Format**: 12 Mobile Screens (1080×2400)  
**Style**: Low-Fidelity Wireframe  

---

## 🚀 **QUICK START**

### **Method 1: Figma AI (Make)**

1. Open Figma → New Design File
2. Click **Figma AI** button (top toolbar)
3. Copy the **Enhanced Figma AI Prompt** from `/FIGMA_12_SCREEN_PROTOTYPE_SPEC.md`
4. Paste into Figma AI
5. Wait 30-60 seconds
6. Review 12 generated screens

### **Method 2: Magicul Plugin**

1. Figma → Plugins → Magicul AI
2. Choose "Import from text"
3. Paste the enhanced prompt
4. Select "Low-Fidelity Wireframes"
5. Click Generate
6. Done!

---

## 📱 **12-SCREEN FLOW MAP**

```
START
  ↓
[1] Splash & Welcome
  ↓
[2] Country & Language ────→ Auto-detect location
  ↓
[3] Sign-Up & OTP ─────────→ Email + SMS verification
  ↓
[4] Role Selection ────────→ Multi-select (8 roles)
  ↓
[5] Basic KYC (Tier 1) ────→ ID + Face verification
  ↓
[6] Role-based KYC (Tier 2) → Entity type & documents
  ↓
├─→ [7] Producer Verification → Land documents
├─→ [8] Buyer Onboarding ──→ AI commodity discovery
└─→ [9] Commission Agent ──→ Agency + staff setup
  ↓
[10] Dashboard ────────────→ AI Insights + Commit Coins
  ↓
├─→ [11] Financial Dashboard → Bill discounting
└─→ [12] Notifications ────→ Color-coded alerts
```

---

## 🎨 **DESIGN TOKENS - COPY/PASTE READY**

### **Colors**

```css
/* Paste into Figma color styles */

Background Gradient:
#F7FAFC → #E8F4FC → #D9F2FF

Gold Accent:
Primary: #FFD700
Hover: #FFC700
Shadow: rgba(255, 215, 0, 0.3)

Blue Accent:
Primary: #003E6D
Light: #0066B2
Shadow: rgba(0, 62, 109, 0.3)

Status Colors:
Success: #27AE60
Warning: #F2C94C
Error: #EB5757
Info: #2F80ED

Text Colors:
Primary: #191919
Secondary: #5A6B7A
Muted: #8B9AA8
```

### **Typography**

```
Headings:
Font: Playfair Display
Weight: Bold (700)
Sizes: 24px, 28px, 32px

Labels/Buttons:
Font: Montserrat
Weight: Semi-Bold (600)
Sizes: 14px, 16px, 18px

Body Text:
Font: Lato
Weight: Regular (400)
Sizes: 14px, 16px
```

### **Spacing**

```
Margins: 16px, 24px, 32px
Padding: 12px, 16px, 20px
Gaps: 8px, 12px, 16px
Border Radius: 8px, 12px, 16px
```

### **Button Styles**

```css
Gold Primary Button:
background: linear-gradient(135deg, #FFD700 0%, #FFC700 100%);
padding: 16px 32px;
border-radius: 12px;
box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
font: Montserrat Semi-Bold 16px;
color: #003E6D;

Blue Secondary Button:
background: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);
padding: 16px 32px;
border-radius: 12px;
box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
font: Montserrat Semi-Bold 16px;
color: #FFFFFF;
```

---

## 📱 **SCREEN CHECKLIST**

Use this to verify all screens are complete:

### **Screen 1: Splash & Welcome**
- [ ] TRADIE logo (120px height)
- [ ] Tagline text
- [ ] 2 gradient buttons (Get Started, Sign In)
- [ ] Gradient background

### **Screen 2: Country & Language**
- [ ] Back button in header
- [ ] Country dropdown with flags
- [ ] Language dropdown
- [ ] Auto-populated country code
- [ ] Continue button

### **Screen 3: Sign-Up & OTP**
- [ ] Part A: 5 input fields + biometric toggle
- [ ] Part B: 2 OTP sections (6 digits each)
- [ ] Countdown timer
- [ ] Progress indicator
- [ ] Continue button

### **Screen 4: Role Selection**
- [ ] 8 role cards in 4×2 grid
- [ ] Icons (emojis) on each card
- [ ] Selected state (gold border)
- [ ] Selected text at bottom
- [ ] Continue button

### **Screen 5: Basic KYC**
- [ ] Progress bar (40%)
- [ ] DOB picker
- [ ] Gender buttons
- [ ] Address fields (4)
- [ ] ID type dropdown
- [ ] Upload buttons (Camera, Gallery)
- [ ] Face verification preview
- [ ] Continue button

### **Screen 6: Role-based KYC**
- [ ] Progress bar (60%)
- [ ] Entity type buttons (4)
- [ ] Business name field
- [ ] Registration number field
- [ ] License upload area
- [ ] Operational area checkboxes
- [ ] Documents list
- [ ] Continue button

### **Screen 7: Producer Verification**
- [ ] Progress bar (80%)
- [ ] Document type radio buttons (5)
- [ ] File upload dropzone
- [ ] Uploaded files list
- [ ] GPS location display
- [ ] Farm size input
- [ ] AI verification badge
- [ ] Submit button

### **Screen 8: Buyer Onboarding**
- [ ] Progress bar (80%)
- [ ] Search bar
- [ ] AI recommendations (4 cards)
- [ ] Selected commodities chips
- [ ] Order size input
- [ ] Packaging buttons (3)
- [ ] Delivery selector
- [ ] Start Bidding button

### **Screen 9: Commission Agent**
- [ ] Progress bar (80%)
- [ ] Agency details (3 fields)
- [ ] Commission rate input
- [ ] Commodities checkboxes
- [ ] Add Staff button
- [ ] Staff list cards
- [ ] License upload buttons
- [ ] Bank details (3 fields)
- [ ] Complete Setup button

### **Screen 10: Dashboard**
- [ ] Top header (menu, title, bell, profile)
- [ ] Commit Coins wallet card
- [ ] 3 AI insight cards
- [ ] 4 quick action buttons
- [ ] 2 recent activity cards
- [ ] Bottom navigation (4 icons)

### **Screen 11: Financial Dashboard**
- [ ] Wallet overview card
- [ ] 2 invoice cards with discount info
- [ ] Liquidity flow chart
- [ ] 3 bank partner boxes
- [ ] Withdraw button

### **Screen 12: Notifications**
- [ ] Header with settings icon
- [ ] Filter tabs (All, Urgent, Info)
- [ ] 4 color-coded alert cards:
  - [ ] Red (urgent)
  - [ ] Blue (opportunity)
  - [ ] Yellow (warning)
  - [ ] Gray (info)
- [ ] Mark all as read button

---

## 🎯 **ICON LIBRARY**

Copy these emojis for use in Figma:

### **Role Icons**
```
🌾 Producer
🏪 Trader
🤝 Commission Agent
🛒 Buyer
🏢 Storage
🚚 Logistics
💰 Finance
🛡️ Insurance
```

### **Feature Icons**
```
🎯 Create/Target
📦 Orders/Package
💵 Payment/Money
📊 Statistics/Analytics
📸 Camera
📁 Gallery/Files
📍 Location/GPS
📅 Calendar/Date
🔔 Notifications
👤 Profile/User
⚙️ Settings
🔍 Search
✉️ Email
📱 Mobile/SMS
🔐 Security/Lock
⏱️ Timer/Clock
✅ Success/Check
⚠️ Warning
🚨 Alert/Error
📈 Trending Up
💡 Insight/Idea
🤖 AI/Automation
🥇 Gold Tier
🥈 Silver Tier
🥉 Bronze Tier
⭐ Star/Rating
```

### **Commodity Icons**
```
🌾 Wheat
🌾 Rice
🌽 Maize/Corn
🫘 Pulses/Beans
🥔 Potato
🧅 Onion
🍅 Tomato
```

---

## 🔗 **NAVIGATION FLOW**

### **Screen Transitions**

```
Screen 1 → Screen 2: "Get Started" button
Screen 2 → Screen 3: "Continue" button
Screen 3A → Screen 3B: "Send OTP" button
Screen 3B → Screen 4: "Verify & Continue" button
Screen 4 → Screen 5: "Continue" button (single role)
Screen 4 → Screen 5: "Continue" button (multi-role)
Screen 5 → Screen 6: "Continue" button
Screen 6 → Screen 7/8/9: Based on role selected
Screen 7/8/9 → Screen 10: "Submit/Complete" button
Screen 10 → Screen 11: Tap wallet or financial icon
Screen 10 → Screen 12: Tap bell icon
```

### **Back Navigation**

All screens (except Screen 1) have:
- `[← Back]` button in top-left header
- Returns to previous screen
- No data loss (save progress)

---

## 📐 **LAYOUT GUIDELINES**

### **Screen Structure**

```
┌─────────────────────────────────┐ ← 1080px width
│  Header (80px height)           │
├─────────────────────────────────┤
│                                 │
│  Content Area                   │ ← 2240px height
│  (scrollable)                   │
│                                 │
│                                 │
├─────────────────────────────────┤
│  Footer/Nav (80px height)       │
└─────────────────────────────────┘
                                   ↓ 2400px total height
```

### **Component Spacing**

```
Section Margins: 24px left/right
Element Gaps: 16px vertical
Card Padding: 16px all sides
Button Height: 56px (touch-friendly)
Input Height: 48px
Icon Size: 24px (UI), 40px (feature)
```

### **Grid System**

```
Columns: 12-column grid
Gutter: 16px
Margins: 24px
Breakpoint: 1080px (mobile)
```

---

## 🎨 **COMPONENT LIBRARY**

### **Buttons**

```
Primary (Gold):
- Width: 100% or auto
- Height: 56px
- Padding: 16px 32px
- Border radius: 12px
- Font: Montserrat 600, 16px
- Gradient: #FFD700 → #FFC700

Secondary (Blue):
- Same as primary
- Gradient: #3B82F6 → #06B6D4
- Text: White

Tertiary (Outline):
- Border: 2px solid #E0E0E0
- Background: transparent
- Text: #5A6B7A
```

### **Input Fields**

```
Default:
- Width: 100%
- Height: 48px
- Padding: 12px 16px
- Border: 1px solid #E0E0E0
- Border radius: 8px
- Font: Lato 400, 16px

Focused:
- Border: 2px solid #FFD700
- Shadow: 0 0 0 3px rgba(255, 215, 0, 0.1)

Error:
- Border: 2px solid #EB5757
- Helper text: Red
```

### **Cards**

```
Default:
- Background: #FFFFFF
- Border radius: 12px
- Padding: 16px
- Shadow: 0 2px 8px rgba(0, 0, 0, 0.05)

Hover:
- Shadow: 0 4px 16px rgba(0, 0, 0, 0.1)
- Transform: translateY(-2px)

Selected:
- Border: 2px solid #FFD700
- Background: #FFF9E6
```

---

## ✅ **QUALITY CHECKLIST**

Before finalizing Figma prototype:

### **Visual Consistency**
- [ ] All screens use same color palette
- [ ] Typography is consistent across screens
- [ ] Spacing follows 8px grid
- [ ] Buttons have consistent styling
- [ ] Icons are same size within categories

### **Navigation**
- [ ] All screens have back button (except splash)
- [ ] All screens have next/continue button
- [ ] Progress bars accurate (KYC screens)
- [ ] Bottom nav present on dashboard

### **Content**
- [ ] All text is readable (16px minimum)
- [ ] Form labels are clear
- [ ] Error states are indicated
- [ ] Success states are shown
- [ ] Loading states are included

### **Functionality**
- [ ] All inputs have placeholders
- [ ] All buttons have clear labels
- [ ] All dropdowns show default values
- [ ] All checkboxes/radios are visible
- [ ] All icons are meaningful

### **Accessibility**
- [ ] Touch targets are 44×44px minimum
- [ ] Contrast ratio is 4.5:1 minimum
- [ ] Focus states are visible
- [ ] Error messages are descriptive
- [ ] Alt text for icons (in notes)

---

## 🚀 **EXPORT OPTIONS**

### **For Development**

1. **Figma → React Components**
   - Use Figma Dev Mode
   - Export as React components
   - Import into `/components`

2. **Design Tokens**
   - Export colors as CSS variables
   - Export typography as font tokens
   - Save to `/styles/design-tokens.css`

3. **Assets**
   - Export icons as SVG (24×24, 40×40)
   - Export illustrations as PNG (2x)
   - Save to `/public/assets`

### **For Documentation**

1. **PDF Export**
   - File → Export → PDF
   - Include all 12 screens
   - Add page numbers

2. **PNG Export**
   - Select all frames
   - Export → PNG @ 2x
   - For presentations

3. **Interactive Prototype**
   - Use Figma Prototype mode
   - Add transitions between screens
   - Share link with team

---

## 📚 **RELATED DOCUMENTATION**

1. **FIGMA_12_SCREEN_PROTOTYPE_SPEC.md**
   - Complete specifications
   - Enhanced Figma prompt
   - Detailed layouts

2. **CORE_APP_REQUIREMENTS_IMPLEMENTATION.md**
   - Beautiful buttons
   - Commit Coins wallet
   - OTP verification
   - Integration guides

3. **ALL_5_DASHBOARDS_COMPLETE.md**
   - Dashboard system
   - Component library
   - Production code

---

## 🎊 **READY TO GENERATE!**

### **Your Next Steps**

1. ✅ Open Figma
2. ✅ Use Figma AI or Magicul
3. ✅ Paste enhanced prompt
4. ✅ Generate 12 screens
5. ✅ Review and refine
6. ✅ Export to development

### **Support**

- **Prompt**: See `/FIGMA_12_SCREEN_PROTOTYPE_SPEC.md`
- **Components**: See `/components` directory
- **Tokens**: See `/styles/globals.css`
- **Examples**: See existing screens in `/App.tsx`

---

**🎨 HAPPY PROTOTYPING!**

**Your complete 12-screen TRADIE prototype is ready to generate in Figma!**
