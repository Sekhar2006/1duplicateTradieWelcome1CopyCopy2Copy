# 🎨 Mid-Fi Visual Quick Reference

## ⚡ 30-Second Color Guide

### Primary Palette
```
🟢 Primary Green:   #4CAF50
🔵 Accent Blue:     #2196F3
⚪ Surface White:   #FFFFFF
🌿 Background:      #F0F9F4 (soft green tint)
💙 Alt Background:  #F0F7FC (soft blue tint)
```

### Gradients (Copy-Paste Ready)
```css
/* Green Gradient (Primary) */
background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);

/* Blue Gradient (Accent) */
background: linear-gradient(135deg, #42A5F5 0%, #2196F3 100%);

/* Soft Green (Cards) */
background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);

/* Soft Blue (Info) */
background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
```

---

## 📐 Sizing Reference

### Touch Targets
```
Minimum:     44px (standard)
Our Target:  48px (enhanced)
Buttons:     56px height
Icons:       24px size
```

### Typography
```
Base Text:   18px (font-medium)
Labels:      16px (font-semibold)
Headings:    22-28px (font-bold)
Hints:       14px (font-medium)
Line Height: ≥1.4
```

### Spacing
```
Card Padding:     20-24px (p-5, p-6)
Element Gaps:     16-20px (gap-4, gap-5)
Section Margins:  20px (mb-5)
Border Radius:    12-16px (rounded-xl, rounded-2xl)
```

---

## 🎭 Component Styles

### Button Variants

**Primary (Green Gradient)**
```tsx
<PrimaryButton variant="primary">
  // Green gradient, white text, shadow
</PrimaryButton>
```

**Secondary (Blue Gradient)**
```tsx
<PrimaryButton variant="secondary">
  // Blue gradient, dark text, shadow
</PrimaryButton>
```

**Outline (White + Border)**
```tsx
<PrimaryButton variant="outline">
  // White bg, green border, shadow
</PrimaryButton>
```

### Status Chips

**Success** 🟢
```tsx
<StatusChip label="Verified" variant="success" />
// Green gradient: #E8F5E9 → #C8E6C9
```

**Warning** 🟡
```tsx
<StatusChip label="Pending" variant="warning" />
// Orange gradient: #FFF3E0 → #FFE0B2
```

**Error** 🔴
```tsx
<StatusChip label="Failed" variant="error" />
// Red gradient: #FFEBEE → #FFCDD2
```

**Info** 🔵
```tsx
<StatusChip label="New" variant="info" />
// Blue gradient: #E3F2FD → #BBDEFB
```

### Cards

**Action Card**
```tsx
<ActionCard
  icon={<Icon className="w-6 h-6 text-primary" />}
  title="Action Title"
  subtitle="Brief description"
/>
// White surface + green gradient background
// 64px icon container, shadows, rounded-xl
```

**KPI Card**
```tsx
<KPICard
  label="Metric Name"
  value="123"
  trend="up"
  icon={<Icon />}
/>
// Blue gradient background
// Large value text (3xl)
// Icon in white container
```

---

## 🎨 Color Applications

### Backgrounds
```css
/* Screen backgrounds */
Full screen: linear-gradient(180deg, #F0F9F4 0%, #E8F5E9 100%)

/* Card backgrounds */
Cards: linear-gradient(135deg, #FFFFFF 0%, #F8FFF9 100%)
```

### Borders
```css
Standard:    2px solid #D4E7D7 (soft green)
Blue:        2px solid #CFE2F3 (soft blue)
Accent:      2px solid #4CAF50 (primary green)
```

### Shadows
```css
/* Soft green-tinted shadows */
Small:    0 1px 3px rgba(76, 175, 80, 0.12)
Medium:   0 4px 6px rgba(76, 175, 80, 0.15)
Large:    0 10px 15px rgba(76, 175, 80, 0.2)
```

---

## 📱 Layout Patterns

### Screen Structure
```
┌─────────────────────────────────┐
│ TopBar (Gradient Green)         │ ← 2px border, shadow
├─────────────────────────────────┤
│                                 │
│ Content Area (Gradient BG)      │ ← Full height
│ - Cards with shadows            │
│ - Roomy spacing (20-24px)       │
│ - Large buttons (56px)          │
│                                 │
├─────────────────────────────────┤
│ BottomNav (White + Shadow)      │ ← Active = gradient
└─────────────────────────────────┘
```

### Card Layout
```
┌─────────────────────────────────┐
│  ┌───┐                          │
│  │ 🎨 │  Bold Title             │ ← Icon 64px container
│  └───┘  Subtitle text           │    with gradient
│                                 │
│  [  Primary Button (56px)  ]   │ ← Full-width
│  [  Secondary (outline)    ]   │
└─────────────────────────────────┘
Rounded-xl, shadow-md, gradient bg
```

---

## 🎯 Quick Dos & Don'ts

### ✅ DO
- Use soft greens/blues consistently
- Apply subtle gradients
- Maintain ≥48px touch targets
- Use 18-20px base text
- Add soft shadows for depth
- Keep one primary action per screen
- Use icon + text labels

### ❌ DON'T
- Use harsh, bright colors
- Overuse gradients (subtle only)
- Make touch targets < 44px
- Use text < 16px
- Forget shadows (depth important)
- Crowd multiple actions
- Use icons without text

---

## 🔍 Accessibility Checklist

### Contrast Ratios
```
✅ Text (#2C3E2C) on White: 12.6:1 (AAA)
✅ Primary (#4CAF50) on White: 3.4:1 (AA Large)
✅ Accent (#2196F3) on White: 3.1:1 (AA Large)
```

### Touch Targets
```
✅ All buttons:        ≥48px
✅ All icons:          ≥44px
✅ Form inputs:        56px
✅ Navigation tabs:    48px
✅ OTP boxes:          56px
```

### Typography
```
✅ Base text:          18px
✅ All headings:       ≥22px
✅ Line height:        ≥1.4
✅ Font weight:        Medium+
```

---

## 🎨 Example Implementations

### Login Screen
```tsx
<div style={{ 
  background: 'linear-gradient(180deg, #F0F9F4 0%, #E8F5E9 100%)',
  minHeight: '100vh'
}}>
  <TopBar title="TRADIE Login" />
  
  <div className="p-5">
    <div style={{
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFF9 100%)',
      border: '2px solid #D4E7D7',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 10px 30px rgba(76, 175, 80, 0.15)'
    }}>
      <FormField label="Mobile/Email" />
      <PrimaryButton>Send OTP</PrimaryButton>
    </div>
  </div>
</div>
```

### Dashboard Card
```tsx
<ActionCard
  icon={<Activity className="w-6 h-6" />}
  title="Start Cycle"
  subtitle="Begin tracking"
/>
// Auto-applies:
// - White + green gradient background
// - 64px icon container with gradient
// - Shadows and rounded corners
// - 140px min-height
```

### Status Display
```tsx
<div className="flex gap-2">
  <StatusChip label="Verified" variant="success" />
  <StatusChip label="Pending" variant="warning" />
  <StatusChip label="New" variant="info" />
</div>
// Each chip has gradient background
// 14px font-medium, 2px border
```

---

## 🎨 Color Psychology

### Why Green?
- 🌱 **Agriculture**: Natural association
- ✅ **Success**: Positive, verified
- 🌍 **Growth**: Progress, development
- 💚 **Trust**: Reliable, safe

### Why Blue?
- 💻 **Technology**: Digital, modern
- 🔒 **Trust**: Secure, professional
- 🌊 **Calm**: Peaceful, clear
- ℹ️ **Information**: Helpful, guiding

### Why Gradients?
- 📈 **Depth**: Visual hierarchy
- ✨ **Modern**: Contemporary design
- 🎯 **Focus**: Direct attention
- 🌈 **Subtle**: Not overwhelming

---

## 📊 Visual Hierarchy

### Level 1: Primary Actions
```
Green gradient button
56px height, full-width
Semibold text, white color
Prominent shadow
```

### Level 2: Secondary Actions
```
Blue gradient or outline button
56px height, optional width
Medium text, dark color
Light shadow
```

### Level 3: Tertiary Actions
```
Text link or icon button
Smaller size (44px)
Lighter color
Minimal shadow
```

---

## 🎯 Brand Alignment

### Agritech Modern
```
Primary:   Soft green (#4CAF50)
Accent:    Tech blue (#2196F3)
Feel:      Natural + Digital
Tone:      Professional + Friendly
```

### Trust & Growth
```
Colors:    Nature-inspired
Shadows:   Soft, elevated
Corners:   Rounded (friendly)
Spacing:   Generous (calm)
```

---

## 🚀 Quick Start

### 1. Set Background
```tsx
style={{ background: 'linear-gradient(180deg, #F0F9F4 0%, #E8F5E9 100%)' }}
```

### 2. Add TopBar
```tsx
<TopBar title="Screen Title" role="Producer" />
```

### 3. Create Cards
```tsx
<ActionCard
  icon={<Icon />}
  title="Action"
  subtitle="Description"
/>
```

### 4. Add Button
```tsx
<PrimaryButton variant="primary">
  Continue
</PrimaryButton>
```

### 5. Add BottomNav
```tsx
<BottomNav activeTab="home" />
```

---

## 💡 Pro Tips

### Consistency
- Use same gradient direction (135deg)
- Apply same shadow levels
- Maintain same border radius
- Keep same spacing rhythm

### Performance
- Gradients are CSS (fast)
- Shadows are hardware accelerated
- No images needed
- Scales perfectly

### Maintenance
- All colors in one place (GlobalComponents)
- Easy to rebrand
- Consistent across screens
- Self-documenting

---

## ✅ Checklist for New Screens

- [ ] Background: Green gradient
- [ ] TopBar with gradients
- [ ] Cards with shadows
- [ ] Buttons: 56px height
- [ ] Text: ≥18px base
- [ ] Touch targets: ≥48px
- [ ] Icons: 24px size
- [ ] Spacing: 20-24px
- [ ] Borders: 2px green
- [ ] Corners: 12-16px radius

---

## 🎨 Color Picker Values

### Primary Green
```
HEX:  #4CAF50
RGB:  76, 175, 80
HSL:  122, 39%, 49%
```

### Accent Blue
```
HEX:  #2196F3
RGB:  33, 150, 243
HSL:  207, 90%, 54%
```

### Soft Green
```
HEX:  #E8F5E9
RGB:  232, 245, 233
HSL:  125, 41%, 94%
```

### Soft Blue
```
HEX:  #E3F2FD
RGB:  227, 242, 253
HSL:  205, 79%, 94%
```

---

**Quick reference for beautiful, consistent Mid-Fi designs! 🎨**

**Copy these values directly into your design tools or code!** ✨
