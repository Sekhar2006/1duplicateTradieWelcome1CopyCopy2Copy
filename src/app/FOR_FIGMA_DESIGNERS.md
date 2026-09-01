# 🎨 For Figma Designers - TRADIE Wireframes Reference

## 🚀 Quick Start (30 Seconds)

1. **Run the app** → Welcome screen loads
2. **Click "Wireframes"** category (6th box)
3. **Click green button**: "🎨 LOW-FI WIREFRAMES (36 Screens) NEW!"
4. **Browse all 36 screens** organized by role

---

## 📐 Your Complete Reference System

This React implementation serves as a **complete specification reference** for creating high-fidelity designs in Figma.

### What You Get
✅ 36 screens with exact functionality
✅ All interactions defined
✅ Complete component library
✅ Precise measurements
✅ Color palette defined
✅ Typography specifications
✅ Spacing system documented

---

## 🎨 Design System Quick Reference

### Colors (Copy to Figma)
```
Primary Green:   #4CAF50
Accent Blue:     #2196F3
Background:      #F0F9F4
Surface White:   #FFFFFF
Text Dark:       #2C3E2C
Text Light:      #5A6B5A
Border:          #D4E7D7
```

### Gradients
```
Green Primary:   135deg, #66BB6A → #4CAF50
Blue Accent:     135deg, #42A5F5 → #2196F3
Soft Green:      135deg, #E8F5E9 → #C8E6C9
Soft Blue:       135deg, #E3F2FD → #BBDEFB
```

### Typography
```
Headings:   22-28px, Bold, Line 1.4
Labels:     16px, Semibold, Line 1.4
Body:       18px, Medium, Line 1.4
Hints:      14px, Medium, Line 1.4
```

### Spacing (8px Grid)
```
XS:  8px   (gap-2)
SM:  12px  (gap-3)
MD:  16px  (gap-4)
LG:  20px  (gap-5)
XL:  24px  (gap-6)
```

### Sizing
```
Touch Targets: ≥48px (standard: 44px)
Buttons:       56px height
Icons:         24px size
Inputs:        56px height
Cards:         Variable, min 120px
```

### Corners
```
Small:   8px   (rounded-lg)
Medium:  12px  (rounded-xl)
Large:   16px  (rounded-2xl)
```

### Shadows (Green-tinted)
```
Small:   0 1px 3px rgba(76, 175, 80, 0.12)
Medium:  0 4px 6px rgba(76, 175, 80, 0.15)
Large:   0 10px 15px rgba(76, 175, 80, 0.2)
```

---

## 📱 Screen Dimensions

### Mobile (Primary)
```
Width:  360px - 414px (common phones)
Optimal: 1080px (design at this)
Height: 2400px
Ratio:  9:20
```

### Tablet
```
Width:  768px - 1024px
Height: 1024px - 1366px
Ratio:  3:4 or 4:3
```

### Desktop
```
Width:  1440px - 1920px
Height: 900px - 1080px
Max Content: 1200px centered
```

---

## 🧩 Component Library Map

### Global Components (14)

#### 1. TopBar
```
Height: 64px
Background: Green gradient (#E8F5E9 → #C8E6C9)
Border: 2px solid #D4E7D7

Elements:
- Title (left): 20px, Bold
- Role Chip: 14px, Border 2px green
- Language Icon: 48px touch target
- Voice Icon: 48px touch target
- Notification Icon: 48px touch target (with red dot)
```

#### 2. BottomNav
```
Height: 72px
Background: White
Border Top: 2px solid #D4E7D7
Shadow: Large upward

5 Tabs:
- Home, Trade, Services, Wallet, Profile
- Icons: 24px
- Label: 12px, Medium
- Active: Green gradient background
- Inactive: Transparent
- Touch: 48px height each
```

#### 3. ActionCard
```
Min Height: 140px
Background: White with green tint gradient
Border: 2px solid #D4E7D7
Corners: 16px (rounded-xl)
Shadow: Medium
Padding: 20px

Structure:
- Icon Container: 64px circle, green gradient
  - Icon: 24px white
- Title: 16px, Semibold, #2C3E2C
- Subtitle: 14px, Medium, #5A6B5A
```

#### 4. PrimaryButton
```
Height: 56px
Width: 100% (full-width)
Corners: 12px (rounded-xl)
Font: 16px, Semibold
Shadow: Medium

Variants:
- Primary: Green gradient (#66BB6A → #4CAF50), white text
- Secondary: Blue gradient (#E3F2FD → #BBDEFB), dark text
- Outline: White bg, 2px green border, green text
```

#### 5. FormField
```
Label:
- Size: 16px, Semibold
- Color: #2C3E2C
- Margin Bottom: 8px
- Required Star: Red

Input:
- Height: 56px
- Border: 2px solid #D4E7D7
- Corners: 12px
- Font: 18px, Medium
- Padding: 16px
- Shadow: Small
- Focus: Green border

Hint:
- Size: 14px, Medium
- Color: #5A6B5A
- Margin Top: 8px
```

#### 6. StatusChip
```
Height: 32px
Padding: 16px × 6px
Corners: Full (rounded-full)
Border: 2px
Font: 14px, Medium

Variants (with gradients):
- Success: Green (#E8F5E9 → #C8E6C9), #2E7D32 text
- Warning: Orange (#FFF3E0 → #FFE0B2), #E65100 text
- Error: Red (#FFEBEE → #FFCDD2), #C62828 text
- Info: Blue (#E3F2FD → #BBDEFB), #1565C0 text
- Default: Gray (#F5F5F5 → #E0E0E0), #424242 text
```

#### 7. KPICard
```
Height: 120px
Background: Blue gradient (#E3F2FD → #BBDEFB)
Border: 2px solid #CFE2F3
Corners: 16px
Shadow: Medium
Padding: 20px

Structure:
- Label: 14px, Medium, #5A6B5A (top)
- Icon: 40px circle, white bg (top right)
- Value: 32px, Bold, colored by trend
  - Up: #4CAF50
  - Down: #EF5350
  - Neutral: #2C3E2C
```

#### 8. OTPModal
```
Modal:
- Width: 90% max 400px
- Background: Green gradient (#E8F5E9 → #C8E6C9)
- Border: 3px solid #D4E7D7
- Corners: 24px
- Shadow: Extra Large
- Backdrop: Black 60% with blur

Title: 24px, Bold, #2C3E2C
Description: 16px, Medium, #5A6B5A

OTP Boxes (6):
- Size: 56px × 56px
- Gap: 10px
- Border: 3px solid #D4E7D7 (empty)
- Border: 3px solid #4CAF50 (filled)
- Background: White
- Font: 28px, Bold, centered
- Shadow: Small (empty) → Medium (filled)

Buttons:
- Cancel + Verify in row
- Each 48% width
```

#### 9. EmptyState
```
Min Height: 200px
Background: #F0F9F4
Border: 2px dashed #D4E7D7
Corners: 24px
Padding: 32px
Text Align: Center

Message: 16px, Medium, #5A6B5A
Button: Primary variant, auto-width (not full)
```

#### 10. Header
```
Height: 64px
Background: Blue gradient (#E3F2FD → #BBDEFB)
Border Bottom: 2px solid #CFE2F3
Padding: 16px

Back Button:
- Size: 48px × 48px
- Background: White
- Icon: 24px green
- Shadow: Small
- Corners: 12px

Title: 20px, Bold, #2C3E2C (center)

Help Button:
- Size: 48px × 48px
- Same style as back button
- Icon: Blue question mark
```

#### 11-14. Supporting Components
- QuickActions: Grid of small action buttons
- SearchBar: 56px height, full-width, with icon
- FilterSection: Accordion with filter options
- CardList: Vertical stack with gaps

---

## 📋 Screen Templates

### Standard Screen Structure
```
┌─────────────────────────────────┐
│ TopBar (64px)                   │ ← Green gradient
├─────────────────────────────────┤
│                                 │
│ Content Area                    │ ← Gradient background
│ - Padding: 20px                 │
│ - Max Width: 100%               │
│ - Scrollable                    │
│                                 │
│                                 │
├─────────────────────────────────┤
│ BottomNav (72px)                │ ← White with shadow
└─────────────────────────────────┘
```

### Login/Form Screen
```
┌─────────────────────────────────┐
│ TopBar                          │
├─────────────────────────────────┤
│                                 │
│   ┌───────────────────────┐    │
│   │                       │    │
│   │  Card Container       │    │
│   │  - White gradient bg  │    │
│   │  - Shadow large       │    │
│   │  - Padding: 32px      │    │
│   │                       │    │
│   │  [Form Fields]        │    │
│   │                       │    │
│   │  [Primary Button]     │    │
│   │                       │    │
│   └───────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

### Dashboard Screen
```
┌─────────────────────────────────┐
│ TopBar (with role chip)         │
├─────────────────────────────────┤
│                                 │
│ [AI Coachmark Card]             │ ← Blue gradient
│                                 │
│ ┌──────────┬──────────┐         │
│ │ Action 1 │ Action 2 │         │ ← 2-column grid
│ ├──────────┼──────────┤         │
│ │ Action 3 │ Action 4 │         │
│ ├──────────┼──────────┤         │
│ │ Action 5 │ Action 6 │         │
│ └──────────┴──────────┘         │
│                                 │
├─────────────────────────────────┤
│ BottomNav                       │
└─────────────────────────────────┘
```

### List Screen
```
┌─────────────────────────────────┐
│ Header (with back)              │
├─────────────────────────────────┤
│                                 │
│ [Search Bar]                    │
│ [Filter Chips]                  │
│                                 │
│ ┌─────────────────────────┐    │
│ │ List Item 1             │    │
│ │ - Icon + Text + Action  │    │
│ └─────────────────────────┘    │
│                                 │
│ ┌─────────────────────────┐    │
│ │ List Item 2             │    │
│ └─────────────────────────┘    │
│                                 │
│ [...more items...]              │
│                                 │
├─────────────────────────────────┤
│ BottomNav                       │
└─────────────────────────────────┘
```

---

## 🎯 36 Screen Checklist for Figma

### Producer Screens (P1-P12)
- [ ] P1: Login with OTP modal
- [ ] P2: KYC form with big radios and dropdowns
- [ ] P3: Dashboard with 8 action tiles + AI coachmark
- [ ] P4: Cost logger with 6 category cards
- [ ] P5: Lot creation with token QR preview
- [ ] P6: Quality check with 6 options + OTP
- [ ] P7: Transport list with AI ranking
- [ ] P8: Sell/Store decision with two big cards
- [ ] P9: Bidding screen with live bids
- [ ] P10: Sale confirmation with OTP
- [ ] P11: Weighing table with sync
- [ ] P12: Billing with dual OTP option

### Trader Screens (T1-T5)
- [ ] T1: Dashboard with 4 KPIs
- [ ] T2: Browse lots with filters
- [ ] T3: Bid room with live updates
- [ ] T4: Weighing co-supervisor
- [ ] T5: Ledger with payment tracking

### Buyer Screens (B1-B4)
- [ ] B1: Dashboard with orders
- [ ] B2: Discover listings with search
- [ ] B3: Purchase confirmation with OTP
- [ ] B4: Delivery/Storage selection

### Commission Agent Screens (C1-C4)
- [ ] C1: Dashboard with producers managed
- [ ] C2: Advances with producer cards
- [ ] C3: Price lock management
- [ ] C4: Bill purchase with dual OTP

### Services Screens (S1-S4)
- [ ] S1: Services home with 9 categories
- [ ] S2: Provider list with ratings
- [ ] S3: Booking form with OTP
- [ ] S4: Job summary with timeline

### Wallet & AI Screens (W1-W2, A1-A2)
- [ ] W1: Wallet with transactions
- [ ] W2: Token rewards with chart
- [ ] A1: AI insights with "Why?" links
- [ ] A2: Blockchain explainer cards

### Settings Screens (H1-H3)
- [ ] H1: Language selector with toggle
- [ ] H2: Feedback form with photo
- [ ] H3: Profile with KYC status

---

## 🎨 Creating in Figma

### Step 1: Setup
1. Create pages: Producer, Trader, Buyer, Agent, Services, Wallet, AI, Settings
2. Set frame size: 360px × 800px (or 1080px × 2400px)
3. Import color palette as styles
4. Create typography styles
5. Set up 8px grid

### Step 2: Components
1. Create TopBar component (variants: with/without role)
2. Create BottomNav component (5 tab states)
3. Create ActionCard component
4. Create Button components (3 variants)
5. Create FormField component
6. Create StatusChip component (5 variants)
7. Create KPICard component
8. Create OTPModal component
9. Create all other global components

### Step 3: Build Screens
1. Start with P1 (Login) - simplest
2. Build P3 (Dashboard) - uses most components
3. Complete all Producer screens P1-P12
4. Repeat for other roles
5. Ensure consistency across all screens

### Step 4: Interactions
1. Add button hover states
2. Add OTP modal open/close
3. Add dropdown expand/collapse
4. Add tab switching
5. Add form validation states

### Step 5: Export
1. Export components as reusable library
2. Export each screen as PNG/PDF
3. Create prototypes with interactions
4. Share with team for feedback

---

## 📐 Measurements Reference

### Common Patterns

**Card Spacing**
```
Between cards: 16px (gap-4)
Card padding: 20px (p-5)
Card margin from edge: 20px
```

**Form Spacing**
```
Between fields: 20px (mb-5)
Label to input: 8px
Input to hint: 8px
Field to button: 24px
```

**List Items**
```
Item height: min 80px
Item padding: 16px
Between items: 12px (gap-3)
```

**Grid Layouts**
```
Columns: 2 (on mobile)
Gap: 16px (gap-4)
Min card width: 160px
```

---

## 🎯 Design Principles

### 1. Ultra-Simple
- One primary action per screen (never more than 1)
- Max 2 secondary actions
- Clear visual hierarchy
- Large, tappable elements

### 2. Low-Literacy Friendly
- Icon + text labels on everything
- Short, plain language
- Visual feedback for all actions
- No jargon or technical terms

### 3. High Contrast
- Text: #2C3E2C on white (12.6:1 ratio)
- Large text size (18-20px base)
- Clear borders (2px)
- Distinct colors for status

### 4. Accessible
- Touch targets ≥48px (exceeds standard)
- Voice help on every screen
- Language selector on every screen
- High contrast throughout
- Clear focus states

### 5. Modern Agritech
- Nature-inspired greens
- Technology blues
- Soft, subtle gradients
- Professional yet friendly
- Trustworthy appearance

---

## 💡 Pro Tips for Figma

### Components
- Create component variants for states (default, hover, active, disabled)
- Use auto-layout for responsive sizing
- Create component library for reusability
- Document component usage

### Colors
- Save all colors as styles
- Use color variables for easy theming
- Test contrast ratios with plugins
- Export palette as JSON for developers

### Typography
- Create text styles for all variants
- Use line-height for readability
- Test text truncation at various widths
- Consider localization (longer text in some languages)

### Layout
- Use auto-layout for responsive grids
- Set constraints for different screen sizes
- Test on multiple device sizes
- Consider safe areas for mobile

### Prototyping
- Create interactive prototype with all flows
- Add OTP modal interactions
- Show form validation
- Demonstrate all user journeys

---

## 📱 Device Testing

### Test These Sizes
```
Small Phone:  360px × 640px
Medium Phone: 375px × 667px
Large Phone:  414px × 896px
Optimal:      1080px × 2400px
Tablet:       768px × 1024px
Desktop:      1440px × 900px
```

### What to Check
- All text readable
- All buttons tappable (≥44px)
- No horizontal scroll
- Proper spacing maintained
- Images scale properly
- Gradients look good
- Shadows render correctly

---

## 🔍 Quality Checklist

Before finalizing designs:

### Visual
- [ ] All screens use color palette
- [ ] Typography consistent
- [ ] Spacing follows 8px grid
- [ ] All corners rounded appropriately
- [ ] Shadows applied correctly
- [ ] Gradients at 135deg

### Functional
- [ ] All 36 screens designed
- [ ] All components created
- [ ] All interactions defined
- [ ] All states shown (empty, loading, error, success)
- [ ] All OTP points have modals
- [ ] All dropdowns have helpers

### Accessibility
- [ ] Contrast ratios meet WCAG AA
- [ ] Touch targets ≥44px
- [ ] Text size ≥18px base
- [ ] Voice help on every screen
- [ ] Language selector on every screen
- [ ] Clear focus indicators

### Consistency
- [ ] TopBar same on all screens
- [ ] BottomNav same on main screens
- [ ] Buttons same style throughout
- [ ] Forms same style throughout
- [ ] Cards same style throughout
- [ ] Status chips consistent

---

## 📦 Deliverables

### For Development Team
1. **Component Library**: Figma file with all components
2. **Screen Designs**: All 36 screens at 1080px × 2400px
3. **Style Guide**: Colors, typography, spacing documented
4. **Prototype**: Interactive flows for all user journeys
5. **Assets**: All icons, images exported
6. **Specs**: Measurements and behaviors documented

### For Stakeholders
1. **PDF Export**: All screens in one PDF
2. **Prototype Link**: Interactive demo
3. **Overview Presentation**: Key features highlighted
4. **User Flow Diagrams**: Complete journeys mapped

---

## 🚀 Next Steps

1. **Review Reference**: Browse all 36 screens in the app
2. **Extract Specs**: Note all measurements and behaviors
3. **Create Components**: Build Figma component library
4. **Design Screens**: Create high-fidelity versions
5. **Add Interactions**: Prototype all flows
6. **Test**: With team and users
7. **Iterate**: Based on feedback
8. **Handoff**: To development team

---

## 📚 Additional Resources

### Documentation
- `/MIDFI_WIREFRAMES_UPGRADE_COMPLETE.md` - Full technical spec
- `/MIDFI_QUICK_VISUAL_GUIDE.md` - Quick color/size reference
- `/FIGMA_PROMPT_SPECIFICATION_MATCH.md` - Detailed screen specs

### Code Reference
- `/components/wireframes/GlobalComponents.tsx` - Component implementations
- `/components/wireframes/ProducerWireframes.tsx` - Producer screens
- `/components/wireframes/TraderBuyerAgentWireframes.tsx` - Other role screens
- `/components/wireframes/ServicesWalletAIWireframes.tsx` - Service screens

---

## 💬 Questions?

If anything is unclear:
1. Run the app and see the live implementation
2. Check the documentation files
3. Review the code comments
4. Test the interactive prototype
5. Compare with the Figma prompt specification

---

**You have a complete, production-ready reference for creating beautiful, accessible, high-fidelity designs in Figma!** 🎨

**All 36 screens are implemented with exact specifications, ready for you to use as a reference.** ✨

---

**Quick Start**: Main Menu → Wireframes → Green Button → Browse 36 Screens
**Time Needed**: 15-20 minutes to review all screens
**Export**: Use ScreenExportPlugin or WireframeBatchExporter
