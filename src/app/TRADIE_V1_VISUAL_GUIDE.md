# 🎨 TRADIE v1 - Visual Design Guide

## 🎯 Quick Visual Reference

### **Color Palette** (Copy-Paste Ready)

```css
/* Primary */
--tradie-gold: #F4D03F;
--tradie-success: #27AE60;
--tradie-error: #E74C3C;

/* Neutrals */
--tradie-white: #FFFFFF;
--tradie-gray-dark: #4A4A4A;
--tradie-gray-light: #BFBFBF;
--tradie-gray-bg: #F5F5F5;

/* Gradients */
--gradient-gold: linear-gradient(135deg, #F4D03F 0%, #F39C12 100%);
--gradient-green: linear-gradient(135deg, #66BB6A 0%, #27AE60 100%);
--gradient-warm: linear-gradient(135deg, #FFD700 0%, #F39C12 100%);
--gradient-background: linear-gradient(to bottom right, #FFF8E1, #FFF3E0, #FFE0B2);
```

---

### **Typography Scale**

```css
/* Headings */
h1 { font-size: 32px; font-weight: bold; }
h2 { font-size: 24px; font-weight: bold; }
h3 { font-size: 20px; font-weight: 600; }

/* Body */
body { font-size: 16px; }
small { font-size: 14px; }

/* Font Family */
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

---

### **Spacing System** (8px Grid)

```css
--space-xs: 8px;   /* Tight spacing */
--space-sm: 16px;  /* Normal spacing */
--space-md: 24px;  /* Section spacing */
--space-lg: 32px;  /* Large gaps */
--space-xl: 48px;  /* Extra large */
```

---

### **Border Radius**

```css
--radius-square: 8px;     /* All buttons, cards, inputs */
--radius-round: 9999px;   /* Circular elements */
```

---

### **Shadows**

```css
--shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
--shadow-md: 0 4px 6px rgba(0,0,0,0.16);
--shadow-lg: 0 10px 20px rgba(0,0,0,0.20);
--shadow-glow: 0 0 20px rgba(244, 208, 63, 0.5);
```

---

## 📱 **Component Specifications**

### **Button Variants**

#### **Primary Button**
```css
background: linear-gradient(135deg, #F4D03F 0%, #F39C12 100%);
color: #FFFFFF;
border-radius: 8px;
min-height: 48px;
padding: 12px 24px;
font-size: 16px;
font-weight: 600;
box-shadow: 0 4px 6px rgba(0,0,0,0.16);
transition: all 0.15s ease;

/* Hover */
transform: scale(1.05);

/* Active */
transform: scale(0.95);
```

#### **Secondary Button**
```css
background: #FFFFFF;
color: #F4D03F;
border: 2px solid #F4D03F;
border-radius: 8px;
min-height: 48px;
padding: 12px 24px;
font-size: 16px;
font-weight: 600;
```

#### **Ghost Button**
```css
background: transparent;
color: #4A4A4A;
border: none;
padding: 12px 24px;
font-size: 16px;
```

---

### **Input Fields**

#### **Text Input**
```css
border: 2px solid #BFBFBF;
border-radius: 8px;
height: 56px;
padding: 16px;
font-size: 16px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12);

/* Focus */
border-color: #F4D03F;
box-shadow: 0 0 0 3px rgba(244, 208, 63, 0.2);
```

#### **Large Dropdown**
```css
border: 2px solid #BFBFBF;
border-radius: 8px;
height: 64px;
padding: 16px;
font-size: 16px;
cursor: pointer;

/* Chevron Icon */
position: absolute;
right: 16px;
transition: transform 0.2s;
transform: rotate(0deg); /* Down */
/* Open: transform: rotate(180deg); */
```

#### **Voice Input Icon**
```css
width: 48px;
height: 48px;
border-radius: 8px;
display: flex;
align-items: center;
justify-content: center;

/* Default */
color: #F4D03F;

/* Listening */
color: #E74C3C;
```

---

### **Cards**

#### **Standard Card**
```css
background: #FFFFFF;
border: 2px solid #E0E0E0;
border-radius: 8px;
padding: 24px;
box-shadow: 0 4px 6px rgba(0,0,0,0.16);
transition: all 0.3s ease;

/* Hover */
transform: translateY(-4px);
box-shadow: 0 10px 20px rgba(0,0,0,0.20);
```

#### **AI Insights Card**
```css
background: linear-gradient(135deg, #F4D03F 0%, #27AE60 100%);
border-radius: 8px;
padding: 24px;
color: #FFFFFF;
box-shadow: 0 10px 20px rgba(0,0,0,0.20);
position: relative;
overflow: hidden;

/* Badge */
.ai-badge {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 14px;
}
```

#### **Wallet Card** (Shimmer Effect)
```css
background: linear-gradient(135deg, #F4D03F 0%, #F39C12 100%);
border-radius: 8px;
padding: 24px;
color: #FFFFFF;
box-shadow: 0 10px 20px rgba(244, 208, 63, 0.6);
position: relative;
overflow: hidden;

/* Shimmer Overlay */
.shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}
```

---

### **Badges**

#### **KYC Tier Badge**
```css
/* Minimum */
background: #BFBFBF;
color: #4A4A4A;

/* Gold */
background: linear-gradient(135deg, #FFD700 0%, #F39C12 100%);
color: #FFFFFF;

/* Platinum */
background: linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 100%);
color: #4A4A4A;

/* Common Styles */
padding: 4px 12px;
border-radius: 999px;
font-size: 14px;
font-weight: 600;
```

#### **Quality Grade Badge**
```css
/* A+ */
background: #1B5E20;
color: #FFFFFF;

/* A */
background: #27AE60;
color: #FFFFFF;

/* B */
background: #F4D03F;
color: #4A4A4A;

/* Common */
padding: 4px 12px;
border-radius: 4px;
font-size: 14px;
font-weight: bold;
```

---

## 🎬 **Animation Specifications**

### **Token Burst**

```css
@keyframes tokenBurst {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.5) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
}

.token-burst {
  animation: tokenBurst 1s ease-out;
}
```

---

### **Sparkle Radiation**

```css
@keyframes sparkle {
  0% {
    transform: translate(0, 0) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--x), var(--y)) scale(0);
    opacity: 0;
  }
}

.sparkle {
  animation: sparkle 1.5s ease-out infinite;
}

/* 8 directions */
.sparkle-1 { --x: 100px; --y: 0px; }
.sparkle-2 { --x: 71px; --y: 71px; }
.sparkle-3 { --x: 0px; --y: 100px; }
/* ... etc */
```

---

### **Card Slide-Up**

```css
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

.card {
  animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

### **Button Hover/Press**

```css
.button {
  transition: transform 0.15s ease;
}

.button:hover {
  transform: scale(1.05);
}

.button:active {
  transform: scale(0.95);
}
```

---

## 📐 **Layout Specifications**

### **Mobile (375px)**

```css
/* Container */
.container {
  max-width: 100%;
  padding-left: 16px;
  padding-right: 16px;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* Stack */
.stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

---

### **Tablet (768px)**

```css
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 24px;
    padding-right: 24px;
  }
  
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}
```

---

### **Desktop (1920px)**

```css
@media (min-width: 1920px) {
  .container {
    max-width: 1200px;
  }
  
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## 🎨 **Screen-Specific Designs**

### **Screen 1: Language Select**

```
┌─────────────────────────────────┐
│                                 │
│         ╭───────╮               │
│         │  🌾   │  Logo (96px)  │
│         ╰───────╯               │
│                                 │
│        TRADIE (32px bold)       │
│    Choose Your Language (16px)  │
│                                 │
│  ┌────────────┬────────────┐   │
│  │ 🇬🇧 English │ 🇮🇳 हिंदी   │   │
│  ├────────────┼────────────┤   │
│  │ 🇮🇳 తెలుగు  │ 🇮🇳 தமிழ்   │   │
│  ├────────────┼────────────┤   │
│  │ 🇮🇳 ಕನ್ನಡ   │ 🇮🇳 বাংলা   │   │
│  ├────────────┼────────────┤   │
│  │ 🇮🇳 मराठी   │            │   │
│  └────────────┴────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🎤 Voice Input   ○─○    │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

**Colors**:
- Background: Gradient amber-50 → yellow-50
- Logo: Gold gradient with glow
- Cards: White with 2px gray border
- Selected: Yellow border

---

### **Screen 3: Signup Reward**

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│         ╭─────────╮             │
│         │    🪙    │ Token (128px)
│         │ ✨  ✨  │ Sparkles    │
│         ╰─────────╯             │
│                                 │
│    Welcome to TRADIE! (32px)    │
│                                 │
│      +50 Tradie Tokens (24px)   │
│        Signup Bonus (14px)      │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🪙 Tradie Tokens        │   │
│  │    50                   │   │
│  │    Shimmer effect       │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │   Start Dashboard       │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

**Animations**:
1. Token: Rotate 360° + scale
2. Sparkles: Radiate in 8 directions
3. Wallet: Shimmer sweep left→right
4. Button: Scale on hover

---

### **Screen 4: AI Dashboard**

```
┌─────────────────────────────────┐
│ AI Dashboard    | 🪙 50 Tokens │ Header
├─────────────────────────────────┤
│ ⚠️  Payment Due: ₹5,000 (Red)  │ Alert
├─────────────────────────────────┤
│                                 │
│  ╭─────────────────────────╮   │
│  │ 💡 Powered by AI        │   │
│  │                         │   │
│  │ Top Crop: Coconut       │   │
│  │ (West Coast Tall)       │   │
│  │                         │   │
│  │ +22% ROI ↗️             │   │
│  │ ▂▄▃▆▅▇▆█  Bar Chart     │   │
│  ╰─────────────────────────╯   │
│                                 │
│  ┌─────┬─────┬─────┬─────┐    │
│  │ 🌱  │ 💰  │ 📦  │ ✅  │    │ Tabs
│  │ Act │ Cost│ Svc │ Heal│    │
│  ├─────┼─────┼─────┼─────┤    │
│  │ 📊  │ 👤  │     │     │    │
│  │ Inv │ Prof│     │     │    │
│  └─────┴─────┴─────┴─────┘    │
│                                 │
│  ┌──────────────┬──────────┐   │
│  │ Start New    │ Create   │   │
│  │ Crop 🌾      │ Token 📱 │   │
│  └──────────────┴──────────┘   │
│                                 │
├─────────────────────────────────┤
│ 🏠  🌾  📱  🪙                  │ Bottom Nav
└─────────────────────────────────┘
```

---

## 🎯 **Interactive States**

### **Button States**

| State | Transform | Shadow | Color |
|-------|-----------|--------|-------|
| Default | scale(1) | md | Gold |
| Hover | scale(1.05) | lg | Gold +10% |
| Active | scale(0.95) | sm | Gold -10% |
| Disabled | scale(1) | none | Gray |

---

### **Input States**

| State | Border | Shadow | Background |
|-------|--------|--------|------------|
| Default | 2px gray | sm | White |
| Focus | 2px gold | glow | White |
| Error | 2px red | sm | Red-50 |
| Disabled | 1px gray | none | Gray-100 |

---

### **Voice States**

| State | Icon Color | Bubble | Animation |
|-------|------------|--------|-----------|
| Idle | Yellow-600 | Hidden | None |
| Listening | Red-500 | "Listening..." | Pulse |
| Processing | Blue-500 | "Processing..." | Spinner |
| Complete | Green-500 | "Done!" | Checkmark |

---

## 📏 **Measurement Guide**

### **Touch Targets**

```
Minimum: 44px × 44px (WCAG AA)
Recommended: 48px × 48px (TRADIE standard)
Large buttons: 56px height
Icons: 24px (small) or 48px (touch)
```

---

### **Spacing Between Elements**

```
Tight: 8px (related items)
Normal: 16px (form fields)
Section: 24px (card groups)
Large: 32px (major sections)
Extra Large: 48px (screen sections)
```

---

### **Text Line Heights**

```
Headings: 1.2 (tight)
Body: 1.5 (comfortable)
Small: 1.4 (compact)
```

---

## 🎨 **Brand Guidelines**

### **Logo Usage**

```
Symbol: 🌾 (Leaf emoji or custom SVG)
Background: Gold gradient circle
Size: 96px (large), 48px (small)
Spacing: 16px minimum clearance
```

---

### **Color Combinations**

**Primary Palette** (High Impact):
- Gold + White (buttons, headers)
- Gold + Dark Gray (text on gold)

**Success Palette**:
- Green + White (success messages)
- Green + Dark Gray (verified badges)

**Alert Palette**:
- Red + White (errors)
- Red + Light Red (warning banners)

---

### **Do's and Don'ts**

✅ **Do**:
- Use 8px grid for all spacing
- Keep buttons square (8px radius)
- Maintain 48px touch targets
- Use gold for primary actions
- Add smooth animations (300ms)

❌ **Don't**:
- Use fully rounded buttons
- Mix different radius values
- Create touch targets < 44px
- Use pure black (#000000)
- Skip loading states

---

## 🚀 **Quick Copy-Paste**

### **CSS Variables**

```css
:root {
  /* Colors */
  --color-gold: #F4D03F;
  --color-green: #27AE60;
  --color-red: #E74C3C;
  --color-white: #FFFFFF;
  --color-gray-dark: #4A4A4A;
  --color-gray-light: #BFBFBF;
  
  /* Spacing */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 32px;
  --space-xl: 48px;
  
  /* Typography */
  --font-size-h1: 32px;
  --font-size-h2: 24px;
  --font-size-body: 16px;
  --font-size-small: 14px;
  
  /* Radius */
  --radius-square: 8px;
  --radius-round: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.16);
  --shadow-lg: 0 10px 20px rgba(0,0,0,0.20);
}
```

---

### **Utility Classes**

```css
/* Buttons */
.btn-primary {
  background: linear-gradient(135deg, var(--color-gold) 0%, #F39C12 100%);
  color: var(--color-white);
  border-radius: var(--radius-square);
  min-height: 48px;
  padding: 12px 24px;
  font-weight: 600;
  box-shadow: var(--shadow-md);
  transition: transform 0.15s;
}

.btn-primary:hover {
  transform: scale(1.05);
}

/* Cards */
.card {
  background: var(--color-white);
  border-radius: var(--radius-square);
  padding: var(--space-md);
  box-shadow: var(--shadow-md);
}

/* Grid */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
}
```

---

## 🎉 **Summary**

This visual guide provides **everything you need** to:
- ✅ Match the TRADIE design system
- ✅ Create consistent UIs
- ✅ Implement smooth animations
- ✅ Maintain accessibility
- ✅ Build responsive layouts

**Copy-paste ready** for immediate use in:
- CSS stylesheets
- Figma designs
- Design documentation
- Developer handoff

---

**Quick Reference**: Use this guide alongside `/TRADIE_V1_REFINED_COMPLETE.md` for full implementation details.
