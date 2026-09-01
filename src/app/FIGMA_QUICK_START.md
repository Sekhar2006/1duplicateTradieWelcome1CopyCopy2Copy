# 🚀 **FIGMA 12-SCREEN QUICK START GUIDE**

**Ready to generate your complete TRADIE mobile app prototype in Figma AI!**

---

## ⚡ **3-MINUTE SETUP**

### **Step 1: Open Figma**

1. Go to [Figma.com](https://figma.com)
2. Create new file: **"TRADIE Mobile Prototype v1"**
3. Set canvas size: **1080×2400** (mobile)

### **Step 2: Copy Prompts**

Open: `/FIGMA_12_SCREEN_COMPLETE_SPECIFICATION.md`

Each screen has a **"Figma AI Prompt"** section → Copy it!

### **Step 3: Generate**

Paste into Figma AI and generate each screen.

---

## 📱 **12 SCREENS - QUICK REFERENCE**

### **Screen 1: Splash + Welcome**
```
Gradient: #F7FAFC → #D9F2FF
Logo: 400×120
Button: Gold gradient "Get Started →"
```
**Prompt location**: Line ~180

---

### **Screen 2: Country & Language**
```
Country dropdown with flags
Multi-language checkboxes
"Continue →" button
```
**Prompt location**: Line ~340

---

### **Screen 3: Sign-Up / OTP**
```
Full name, mobile, email inputs
6-digit OTP boxes
Password + PIN
Biometric toggles
```
**Prompt location**: Line ~540

---

### **Screen 4: Role Selection**
```
8 role cards (multi-select)
Producer, Trader, Buyer, etc.
"Continue → (2)" with count
```
**Prompt location**: Line ~740

---

### **Screen 5: Basic KYC**
```
Personal info form
ID document upload
AI face recognition (400×400)
```
**Prompt location**: Line ~980

---

### **Screen 6: Role-Based KYC**
```
Entity type (7 options)
Registration details
License upload
```
**Prompt location**: Line ~1,200

---

### **Screen 7: Producer Verification**
```
Regional documents (India/USA)
Pattadar, FSA Card, etc.
Land area + GPS
```
**Prompt location**: Line ~1,430

---

### **Screen 8: Buyer Onboarding**
```
Commodity grid (2 cols)
Quality preferences
Auto-bid settings
```
**Prompt location**: Line ~1,650

---

### **Screen 9: Commission Agent**
```
Staff management (up to 30)
Role % allocation
APMC license
```
**Prompt location**: Line ~1,870

---

### **Screen 10: Dashboard**
```
Commit Coins wallet (gold gradient)
AI insights (3 cards)
Quick actions (4 buttons)
```
**Prompt location**: Line ~2,100

---

### **Screen 11: Financial Dashboard**
```
Financial overview (3 cards)
Bill discounting
Credit lines
AI payment alerts
```
**Prompt location**: Line ~2,350

---

### **Screen 12: Notifications**
```
Color-coded alerts
Status badges
Timeline layout
```
**Prompt location**: Line ~2,580

---

## 🎨 **DESIGN TOKENS - COPY/PASTE**

### **Colors**

```css
/* Backgrounds */
--bg-gradient: linear-gradient(135deg, #F7FAFC 0%, #D9F2FF 100%);
--bg-card: #FFFFFF;

/* Brand */
--gold: #FFD700;
--gold-gradient: linear-gradient(135deg, #FFD700, #FFA500);
--blue: #003E6D;

/* Status */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;
```

### **Typography**

```css
/* Fonts */
--heading: 'Playfair Display', serif;
--label: 'Montserrat', sans-serif;
--body: 'Lato', sans-serif;

/* Sizes (Mobile 2× scale) */
--text-xs: 24px;
--text-sm: 28px;
--text-base: 32px;
--text-lg: 36px;
--text-xl: 40px;
--text-2xl: 48px;
--text-3xl: 60px;
--text-4xl: 72px;
```

### **Spacing**

```css
--space-2: 16px;
--space-3: 24px;
--space-4: 32px;
--space-6: 48px;
--space-8: 64px;
--space-12: 96px;
--space-16: 128px;
```

### **Components**

```css
/* Buttons */
--btn-height-lg: 120px;
--btn-height-md: 100px;
--btn-height-sm: 80px;

/* Inputs */
--input-height: 120px;

/* Cards */
--card-radius: 16px;
--card-padding: 32px;

/* Grid */
--grid-gap: 24px;
--page-padding: 64px;
```

---

## 🔥 **FIGMA AI PROMPT TEMPLATE**

Use this structure for custom screens:

```
Create [screen name] (1080×2400).

Header (128px height):
- Back arrow (left, 48px)
- Title: "[Title]" (Montserrat 36px, #003E6D)

Content (scroll area, 64px padding):

Section 1: [Name]
- Label: "[Text]" (Montserrat 32px semibold)
- Component description

[Component 1] (900×120, radius 16px):
- Background: white
- Border: 2px #E2E8F0
- Font: Lato 32px
- Placeholder: "[Text]"

Bottom fixed button (64px from bottom):
- "[Button Text] →" (900×120, gold gradient)
- Font: Montserrat 36px bold, white
- Shadow: 0 8px 24px rgba(255,215,0,0.3)
```

---

## 📐 **LAYOUT PATTERNS**

### **Standard Screen Layout**

```
┌─────────────────────────────────────┐
│  [←]  Screen Title            [?]  │ ← 128px header
├─────────────────────────────────────┤
│                                     │
│  64px padding                       │
│                                     │
│  Content area (scroll)              │
│                                     │
│  900px wide components              │
│  32px vertical spacing              │
│                                     │
│                                     │
│  ┌───────────────────────────┐   │
│  │  Fixed Bottom Button       │   │ ← 64px from bottom
│  └───────────────────────────┘   │   900×120px
│                                     │
└─────────────────────────────────────┘
```

### **Input Field Pattern**

```
900×120px
┌─────────────────────────────────────┐
│ Label (Montserrat 28px, #003E6D)   │ ← Outside, 16px above
├─────────────────────────────────────┤
│ [icon] Input Text Here              │ ← Lato 32px
│        (placeholder gray #94A3B8)   │   32px padding
└─────────────────────────────────────┘
Border: 2px #E2E8F0, radius 16px
Focus: border #FFD700
```

### **Card Pattern**

```
900×auto, radius 16px
┌─────────────────────────────────────┐
│  32px padding                       │
│                                     │
│  Icon (64×64) + Title               │
│  ━━━━━━━━━━━━━━━━━━━━━━           │ ← Gold line
│                                     │
│  Content text (Lato 28px)           │
│                                     │
│  Badge or metric                    │
│                                     │
│  [Action Button]                    │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎯 **TIPS FOR BEST RESULTS**

### **Do's ✅**

- ✅ Use exact measurements from spec
- ✅ Copy color codes verbatim
- ✅ Include all spacing details
- ✅ Specify font families
- ✅ Add shadow specifications
- ✅ Include interactive states

### **Don'ts ❌**

- ❌ Skip measurements
- ❌ Use approximate colors
- ❌ Forget mobile scale (2×)
- ❌ Omit accessibility labels
- ❌ Mix design tokens

### **Pro Tips 💡**

1. **Generate in sequence** (1-12) for consistency
2. **Create components** for reusable elements (buttons, inputs)
3. **Use Auto Layout** for responsive behavior
4. **Name layers** descriptively
5. **Create variants** for interactive states
6. **Export as PDF** for documentation

---

## 🚀 **QUICK GENERATION WORKFLOW**

### **15-Minute Complete Prototype**

```
1. Screens 1-4 (Auth & Onboarding) → 5 mins
   └─ Splash, Language, Sign-Up, Roles

2. Screens 5-7 (KYC System) → 5 mins
   └─ Basic KYC, Entity KYC, Producer Verification

3. Screens 8-9 (Role-Specific) → 2 mins
   └─ Buyer, Commission Agent

4. Screens 10-12 (Dashboards) → 3 mins
   └─ Main Dashboard, Financial, Notifications
```

### **After Generation**

1. ✅ Link screens with prototype flows
2. ✅ Add navigation arrows
3. ✅ Set up interactions
4. ✅ Test user flow
5. ✅ Export & share

---

## 📤 **EXPORT OPTIONS**

### **For Development**

```
1. Select all frames
2. Export → PNG (2× resolution)
3. Create folder structure:
   /screens/01-splash.png
   /screens/02-language.png
   etc.
```

### **For Documentation**

```
1. Select all frames
2. Export → PDF
3. Name: "TRADIE_Mobile_Prototype_v1.pdf"
```

### **For Stakeholders**

```
1. Create prototype flow
2. Share Figma link
3. Set view-only permissions
```

---

## 🔗 **QUICK LINKS**

### **Files You Need**

1. **Main Specification**: `/FIGMA_12_SCREEN_COMPLETE_SPECIFICATION.md`
2. **Producer Flow Doc**: `/PRODUCER_CHRONOLOGICAL_FLOW_COMPLETE.md`
3. **Complete Summary**: `/COMPLETE_DELIVERY_SUMMARY.md`

### **Component Mapping**

All screens map to existing React components in:
- `/components/` (auth, KYC, onboarding)
- `/components/producer-dashboard/` (producer features)
- `/components/kyc/` (KYC system)

### **Design System**

Full tokens available in:
- `/design-system/tokens.ts`
- `/styles/globals.css`

---

## ✨ **EXAMPLE: Generate Screen 1**

### **Step-by-Step**

1. Open `/FIGMA_12_SCREEN_COMPLETE_SPECIFICATION.md`
2. Scroll to **"SCREEN 1: SPLASH + WELCOME"**
3. Find **"Figma AI Prompt"** section
4. Copy entire prompt (starts with "Create a mobile splash screen...")
5. Paste into Figma AI
6. Click Generate
7. ✅ Done! First screen ready

### **The Prompt**

```
Create a mobile splash screen (1080×2400).

Background: Linear gradient from #F7FAFC (top) to #D9F2FF (bottom).

Center content:
- TRADIE logo (wheat icon + text) - 400×120, centered, 200px from top
- Tagline: "Empowering Global Commodity Trading with AI & Trust"
  Font: Lato 32px, color #475569, centered, 48px below logo

Bottom section (200px from bottom):
- Primary button: "Get Started →"
  Size: 900×120, border-radius: 60px
  Gradient: #FFD700 to #FFA500
  Text: Montserrat 36px, white, bold
  Drop shadow: 0 8px 24px rgba(255,215,0,0.3)
  
- Text link: "Already a member? Sign In"
  Font: Lato 28px, color #003E6D
  Underline on "Sign In", 48px below button
```

---

## 🎊 **YOU'RE READY!**

Everything you need:
- ✅ 12 complete screen specifications
- ✅ Copy-paste Figma AI prompts
- ✅ Design system tokens
- ✅ Layout patterns
- ✅ Component mapping

**Time to generate: 15 minutes**  
**Result: Complete 12-screen mobile prototype**

---

**🚀 START GENERATING YOUR FIGMA PROTOTYPE NOW! 🚀**
