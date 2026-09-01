# 🎨 TRADIE Design System - Visual Style Guide

**Version:** 1.0.0  
**Date:** October 19, 2025  
**Platform:** TRADIE - Commodity Trading Platform

---

## 📋 Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components Library](#components-library)
6. [Iconography](#iconography)
7. [States & Interactions](#states--interactions)
8. [Responsive Grid](#responsive-grid)
9. [Accessibility](#accessibility)
10. [Do's and Don'ts](#dos-and-donts)

---

## Brand Identity

### Brand Essence

**TRADIE** represents trust, transparency, and technology in commodity trading.

**Personality:**
- Professional yet approachable
- Modern and innovative
- Trustworthy and secure
- User-focused and intuitive

### Visual Tone

- **Clean & Minimal**: Uncluttered interfaces with breathing room
- **Gradient Softness**: Gentle blue gradients evoke trust and calm
- **Gold Accents**: Premium feel with strategic gold highlights
- **Data-Driven**: Clear hierarchy for financial information

---

## Color Palette

### Primary Colors

#### 🌊 Gradient Background
```
Start:  #F7FAFC (Light Blue-Gray)
Middle: #E8F4FC (Sky Blue)
End:    #D9F2FF (Soft Cyan)

Usage: Main app backgrounds, creating depth and dimension
```

#### ✨ Accent Gold
```
Primary: #FFD700 (Gold)
Dark:    #FFC700 (Hover State)
Light:   #FFE55C (Highlights)

Usage: CTAs, important actions, premium features, rewards
```

#### 🔵 Deep Blue
```
Primary: #003E6D (Navy Blue)
Light:   #0066B2 (Interactive)
Dark:    #002847 (Emphasis)

Usage: Headers, navigation, trust indicators, primary text
```

### Secondary Colors

#### Text Hierarchy
```
Primary:   #191919 (Almost Black)   - Main content
Secondary: #5A6B7A (Blue-Gray)      - Supporting text
Muted:     #8B9AA8 (Light Gray)     - Captions, placeholders
Disabled:  #C4CDD5 (Very Light)     - Disabled states
Inverse:   #FFFFFF (White)          - Dark backgrounds
```

#### Status Colors
```
Success:  #27AE60 (Green)   - Confirmations, positive actions
Warning:  #E2B93B (Yellow)  - Warnings, caution
Error:    #E74C3C (Red)     - Errors, destructive actions
Info:     #2F80ED (Blue)    - Information, tips
```

### Color Combinations

**✅ High Contrast Pairings (WCAG AAA):**
- Gold (#FFD700) + White (#FFFFFF)
- Navy (#003E6D) + White (#FFFFFF)
- Dark Text (#191919) + Light Background (#F7FAFC)

**⚠️ Medium Contrast (WCAG AA):**
- Secondary Text (#5A6B7A) + White (#FFFFFF)
- Navy (#003E6D) + Light Blue (#D9F2FF)

---

## Typography

### Font Families

**Playfair Display** (Serif)
```
Purpose: Display headings, hero titles
Weight:  600, 700, 800
Tone:    Elegant, authoritative, premium
```

**Poppins** (Sans-serif)
```
Purpose: Section headers, subheadings
Weight:  400, 600, 700
Tone:    Modern, clean, friendly
```

**Inter** (Sans-serif)
```
Purpose: Body text, paragraphs, descriptions
Weight:  400, 500, 600
Tone:    Readable, professional, neutral
```

**Montserrat** (Sans-serif)
```
Purpose: Labels, buttons, navigation
Weight:  600, 700
Tone:    Compact, clear, technical
```

**Lato** (Sans-serif)
```
Purpose: Captions, timestamps, metadata
Weight:  300, 400, 700
Tone:    Friendly, approachable, soft
```

### Type Scale

| Style | Font | Size | Weight | Line Height | Letter Spacing | Use Case |
|-------|------|------|--------|-------------|----------------|----------|
| **H1** | Playfair Display | 36px | 700 | 1.2 | 0.5px | Welcome screens, hero titles |
| **H2** | Poppins | 28px | 600 | 1.3 | 0.3px | Section headers |
| **H3** | Poppins | 20px | 600 | 1.4 | 0.2px | Card headers, modal titles |
| **Body Large** | Inter | 18px | 400 | 1.5 | 0 | Emphasized paragraphs |
| **Body** | Inter | 16px | 400 | 1.5 | 0 | Main content |
| **Body Small** | Inter | 14px | 400 | 1.5 | 0 | Secondary content |
| **Label** | Montserrat | 14px | 600 | 1.4 | 0.5px | Form labels, buttons |
| **Caption** | Lato | 12px | 400 | 1.4 | 0.3px | Timestamps, helper text |

### Typography Examples

```
H1: "Welcome to TRADIE"
H2: "Your Trading Dashboard"
H3: "Market Insights"
Body: "Access real-time commodity prices and AI-powered market analysis."
Label: "EMAIL ADDRESS"
Caption: "Last updated: 2 minutes ago"
```

---

## Spacing & Layout

### 8px Grid System

All spacing follows an 8px base unit for visual consistency:

```
4px   (0.25rem) - Tight spacing between related elements
8px   (0.5rem)  - Base unit, minimum spacing
12px  (0.75rem) - Small gaps
16px  (1rem)    - Default spacing (paragraphs, form fields)
24px  (1.5rem)  - Large gaps (section spacing)
32px  (2rem)    - Major spacing (between components)
48px  (3rem)    - Extra large (page sections)
64px  (4rem)    - Maximum (hero sections)
```

### Layout Principles

**Container Widths:**
- Mobile: 100% (with 16px padding)
- Tablet: 100% (with 24px padding)
- Desktop: Max 1440px (centered)

**Card Padding:**
- Small: 16px
- Medium: 24px (Default)
- Large: 32px
- XLarge: 40px

**Vertical Rhythm:**
- Consistent spacing between sections (32px or 48px)
- Paragraph spacing: 16px
- Heading margins: 24px top, 16px bottom

---

## Components Library

### Buttons

#### Primary Button
```
Background: Gold (#FFD700)
Text: White (#FFFFFF)
Height: 48px (Default)
Padding: 16px 24px
Border Radius: 16px
Font: Montserrat, 16px, Bold, 0.5px spacing

States:
- Hover: Darker gold (#FFC700), scale 1.02
- Active: Scale 0.98
- Disabled: Gray background, 50% opacity
- Loading: Spinner animation
```

#### Secondary Button
```
Background: Transparent
Border: 2px solid Gold (#FFD700)
Text: Navy (#003E6D)
Height: 48px
Padding: 16px 24px
Border Radius: 16px

States:
- Hover: Gold background (15% opacity)
- Active: Scale 0.98
- Disabled: Gray border, 50% opacity
```

#### Ghost Button
```
Background: Transparent
Border: None
Text: Secondary (#5A6B7A)
Height: 48px
Padding: 16px 24px

States:
- Hover: Navy background (8% opacity)
- Active: Scale 0.98
```

### Input Fields

#### Default Input
```
Background: White (#FFFFFF)
Border: 2px solid Navy (20% opacity)
Height: 48px
Padding: 12px 16px
Border Radius: 16px
Font: Inter, 16px, Regular

States:
- Focus: Gold border (#FFD700)
- Error: Red border (#E74C3C)
- Disabled: Gray background, gray border
```

#### Label
```
Font: Montserrat, 14px, SemiBold
Color: Navy (#003E6D)
Margin Bottom: 8px
Letter Spacing: 0.5px
```

### Cards

#### Default Card
```
Background: White (#FFFFFF)
Border: 1px solid Navy (10% opacity)
Border Radius: 24px
Padding: 24px
Shadow: 0 4px 6px rgba(0,0,0,0.1)
```

#### Elevated Card
```
Background: White (#FFFFFF)
Border: None
Border Radius: 24px
Padding: 24px
Shadow: 0 10px 15px rgba(0,0,0,0.1)
```

#### Gold Card (Premium)
```
Background: White (#FFFFFF)
Border: 2px solid Gold (#FFD700)
Border Radius: 24px
Padding: 24px
Shadow: 0 10px 30px rgba(255,215,0,0.3)
```

### Alerts

#### Success Alert
```
Background: Green (15% opacity)
Border: 1px solid Green (#27AE60)
Icon: CheckCircle (Green)
Text: Green (#27AE60)
Border Radius: 12px
Padding: 16px
```

#### Error Alert
```
Background: Red (15% opacity)
Border: 1px solid Red (#E74C3C)
Icon: AlertCircle (Red)
Text: Red (#E74C3C)
Border Radius: 12px
Padding: 16px
```

### Badges

#### Status Badge
```
Height: 24px
Padding: 4px 12px
Border Radius: Full (9999px)
Font: Montserrat, 14px, Medium

Variants:
- Success: Green background (20% opacity), green text
- Warning: Yellow background (20% opacity), yellow text
- Error: Red background (20% opacity), red text
- Gold: Gold background (20% opacity), gold text
```

---

## Iconography

### Icon Library

**Primary Source:** Lucide React
**Style:** Outlined, minimalist
**Sizes:**
- XSmall: 16px
- Small: 20px
- Medium: 24px (Default)
- Large: 32px
- XLarge: 48px

### Icon Colors

```
Primary: Navy (#003E6D)      - Default state
Gold: #FFD700                - Active, selected states
Muted: #8B9AA8               - Disabled, inactive
Success: #27AE60             - Positive actions
Error: #E74C3C               - Warnings, errors
```

### Common Icons

```
Navigation:
- Home, TrendingUp, Wallet, User, Menu

Actions:
- Plus, Edit, Trash, Download, Upload

Status:
- CheckCircle, AlertCircle, Info, X

Trading:
- TrendingUp, TrendingDown, BarChart, PieChart

Security:
- Lock, Shield, Eye, EyeOff
```

---

## States & Interactions

### Interactive States

#### Hover
```
Duration: 200ms
Easing: ease-in-out
Effects:
- Scale: 1.02 (buttons, cards)
- Shadow: Elevated
- Color: Slightly darker/lighter
```

#### Active/Pressed
```
Duration: 150ms
Easing: ease-in-out
Effects:
- Scale: 0.98
- Shadow: Reduced
```

#### Focus
```
Outline: 2px solid Gold (#FFD700)
Outline Offset: 2px
Border Radius: Inherit
```

#### Disabled
```
Opacity: 0.5
Cursor: not-allowed
Pointer Events: none
```

#### Loading
```
Opacity: 0.8
Spinner: Rotating icon
Cursor: wait
Disabled: true
```

### Transitions

```
Fast:    150ms (micro-interactions)
Normal:  200ms (default transitions)
Slow:    300ms (page transitions)
Slower:  400ms (complex animations)
```

### Animation Patterns

**Fade In**
```
Initial: opacity: 0
Animate: opacity: 1
Duration: 200ms
```

**Slide Up**
```
Initial: opacity: 0, y: 20px
Animate: opacity: 1, y: 0
Duration: 300ms
```

**Success Checkmark**
```
Initial: scale: 0
Animate: scale: 1
Duration: 400ms
Easing: bounce
```

---

## Responsive Grid

### Breakpoints

```
Mobile:      320px - 767px   (Portrait phones)
Mobile Lg:   480px - 767px   (Landscape phones)
Tablet:      768px - 1023px  (Tablets)
Tablet Lg:   1024px - 1279px (Large tablets)
Desktop:     1280px - 1439px (Laptops)
Desktop Lg:  1440px+         (Desktops)
Wide:        1920px+         (Wide screens)
```

### Layout Patterns

#### Mobile (320px - 767px)
```
- Single column layout
- Full-width cards
- Stack navigation vertically
- Hide secondary content
- Touch-optimized (min 44px tap targets)
```

#### Tablet (768px - 1023px)
```
- 2-column grid for cards
- Side-by-side forms
- Sticky navigation
- Show more content
```

#### Desktop (1280px+)
```
- 3-4 column grid for cards
- Sidebar navigation
- Multi-column forms
- Full feature set
- Hover interactions
```

---

## Accessibility

### WCAG 2.1 Compliance

**Color Contrast:**
- AAA Rating for text (7:1 ratio)
- AA Rating for large text (4.5:1 ratio)
- AA Rating for UI components (3:1 ratio)

**Interactive Elements:**
- Minimum touch target: 44x44px
- Clear focus indicators
- Keyboard navigation support
- Screen reader friendly

**Typography:**
- Minimum body text: 16px
- Scalable fonts (rem units)
- Readable line height (1.5)
- Adequate letter spacing

### Accessibility Checklist

✅ All images have alt text  
✅ Color is not the only indicator  
✅ Forms have proper labels  
✅ Buttons have descriptive text  
✅ Focus states are visible  
✅ Keyboard navigation works  
✅ Screen reader tested  
✅ Semantic HTML used  

---

## Do's and Don'ts

### Colors

✅ **DO:**
- Use gold for primary CTAs and rewards
- Use navy for trust and authority
- Maintain color contrast ratios
- Use status colors consistently

❌ **DON'T:**
- Mix gold with red (poor readability)
- Use navy on dark backgrounds
- Override status color meanings
- Use more than 3 accent colors per screen

### Typography

✅ **DO:**
- Use Playfair Display for hero titles
- Maintain type hierarchy
- Keep line length under 80 characters
- Use proper letter spacing

❌ **DON'T:**
- Mix more than 3 font families
- Use all caps for long text
- Set body text below 16px
- Ignore line height

### Spacing

✅ **DO:**
- Follow the 8px grid system
- Use consistent padding in cards
- Maintain vertical rhythm
- Group related elements

❌ **DON'T:**
- Use random spacing values
- Overcrowd components
- Ignore mobile spacing
- Mix spacing units (px, rem, em)

### Components

✅ **DO:**
- Use design system components
- Follow component guidelines
- Test all interactive states
- Maintain consistency

❌ **DON'T:**
- Create custom buttons when variants exist
- Override component styles unnecessarily
- Ignore disabled/loading states
- Mix component variants randomly

### Responsive Design

✅ **DO:**
- Design mobile-first
- Test on real devices
- Use flexible layouts
- Optimize touch targets

❌ **DON'T:**
- Fixed pixel widths
- Ignore tablet breakpoints
- Use hover-only interactions
- Assume mouse input

---

## Version History

**v1.0.0** (October 19, 2025)
- Initial design system release
- Core color palette established
- Typography system defined
- Base components created
- Responsive guidelines set

---

## Credits

**Design System:** TRADIE Platform Team  
**Typography:** Google Fonts  
**Icons:** Lucide React  
**Framework:** React + TypeScript  
**Styling:** Tailwind CSS v4.0  

---

**For questions or contributions, refer to the main README.md**

