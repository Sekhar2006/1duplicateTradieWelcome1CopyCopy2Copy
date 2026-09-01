# Figma Component Mapping Guide - TRADIE Design System

## 🎯 Overview

**Complete mapping guide** from React/shadcn components to Figma Auto Layout components. This guide helps you recreate the exact component structure from the code implementation in Figma for design consistency.

**Created**: October 22, 2025  
**Purpose**: React → Figma Component Translation  
**Design System**: TRADIE Agricultural Trading Platform

---

## 📚 Component Library Structure in Figma

### Recommended Page Organization

```
📄 TRADIE Design System
├── 🎨 Design Tokens
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Shadows
│   └── Border Radius
├── 🧩 Foundation Components
│   ├── Buttons
│   ├── Inputs
│   ├── Badges
│   ├── Cards
│   └── Icons
├── 🔧 Form Components
│   ├── Text Input
│   ├── Select/Dropdown
│   ├── Checkbox
│   ├── Radio
│   ├── OTP Input
│   └── File Upload
├── 📊 Data Display
│   ├── Tables
│   ├── Lists
│   ├── Progress Bars
│   └── Charts
├── 🎭 Overlays
│   ├── Modal/Dialog
│   ├── Toast/Alert
│   ├── Popover
│   └── Tooltip
├── 🧭 Navigation
│   ├── Tabs
│   ├── Breadcrumbs
│   └── Pagination
└── 📱 Screen Templates
    ├── Mobile (390px)
    ├── Tablet (768px)
    └── Desktop (1440px)
```

---

## 🔄 React to Figma Mapping

### 1. Button Component

#### React Code (shadcn/ui)
```tsx
<Button 
  variant="default" 
  size="lg"
  className="bg-[#FFD700]"
>
  <Icon className="w-5 h-5 mr-2" />
  Button Text
</Button>
```

#### Figma Recreation
**Component Name**: `Button/Primary/Large`

**Structure**:
1. Create Frame (Auto Layout Horizontal)
2. Settings:
   - Padding: 12px (V) × 24px (H)
   - Gap: 8px
   - Fill: #FFD700
   - Corner radius: 8px
   - Alignment: Center, Middle
   - Resizing: Hug contents (both)

3. **Add Elements**:
   - Icon (20×20px frame from Iconify plugin)
   - Text layer: "Button Text"

4. **Create Component** (⌘⌥K / Ctrl+Alt+K)

5. **Add Variants**:
   - Property: `Variant` → Primary, Secondary, Outline, Ghost
   - Property: `Size` → Small (40px), Medium (48px), Large (56px)
   - Property: `State` → Default, Hover, Pressed, Disabled
   - Property: `Icon` → None, Left, Right, Both

6. **Set Up States**:
   - **Default**: Normal appearance
   - **Hover**: Lighten fill 10%
   - **Pressed**: Darken fill 10%, scale 0.95
   - **Disabled**: Opacity 50%, cursor not-allowed

**Figma Auto Layout Settings**:
```
Container: Auto Layout Horizontal
├─ Icon (optional): 20×20px, Fixed size
├─ Text: Hug contents, Center aligned
Padding: 12px 24px (varies by size)
Gap: 8px
Fill: Color variable (variant-dependent)
Stroke: 0px or 2px (outline variant)
Corner radius: 8px
```

---

### 2. Input Field

#### React Code
```tsx
<div className="space-y-2">
  <Label htmlFor="name">Name</Label>
  <Input 
    id="name" 
    placeholder="Enter your name"
    className="h-12"
  />
</div>
```

#### Figma Recreation
**Component Name**: `Input/Text/Default`

**Structure**:
1. Create Frame (Auto Layout Vertical)
2. Label Settings:
   - Text: "Label"
   - Style: Label/Medium
   - Fill: Gray/700
   - Margin bottom: 8px

3. Input Box:
   - Create Frame (Auto Layout Horizontal)
   - Padding: 12px × 16px
   - Fill: Gray/50
   - Stroke: 1px Gray/300
   - Corner radius: 8px
   - Height: 48px
   - Width: Fill container

4. Placeholder Text:
   - Text: "Placeholder text"
   - Style: Body/Large
   - Fill: Gray/400

**Variants**:
- Property: `State` → Default, Focus, Error, Disabled, Filled
- Property: `Has Icon` → Boolean
- Property: `Label Visible` → Boolean

**State Specifications**:
- **Default**: Gray/50 fill, 1px Gray/300 stroke
- **Focus**: White fill, 2px Primary/Blue stroke
- **Error**: Red/50 fill, 2px Error/Red stroke
- **Disabled**: Gray/100 fill, Gray/300 text
- **Filled**: White fill, text visible

**Figma Auto Layout**:
```
Container: Auto Layout Vertical
├─ Label: Hug contents
├─ Input Box: Fill container (width), Fixed 48px (height)
   ├─ Icon (optional): 20×20px
   ├─ Text/Placeholder: Fill container
Padding (Input): 12px 16px
Gap: 8px (between label and input)
```

---

### 3. Card Component

#### React Code
```tsx
<Card className="p-6 bg-white/90 backdrop-blur-sm">
  <div className="flex items-center gap-3 mb-4">
    <Icon className="w-6 h-6 text-blue-900" />
    <h3>Card Title</h3>
  </div>
  <p>Card content goes here...</p>
</Card>
```

#### Figma Recreation
**Component Name**: `Card/Default`

**Structure**:
1. Create Frame (Auto Layout Vertical)
2. Settings:
   - Padding: 24px
   - Gap: 16px
   - Fill: #FFFFFF at 90% opacity
   - Corner radius: 12px
   - Effects: Add shadow (Shadow/MD)
   - Backdrop blur: 8px (Layer Blur effect)

3. **Header Section** (Auto Layout Horizontal):
   - Icon: 24×24px
   - Title: H3/Mobile style
   - Gap: 12px
   - Alignment: Center (vertical)

4. **Content Section**:
   - Body text: Body/Medium style
   - Fill container width

**Variants**:
- Property: `Padding` → Compact (16px), Default (24px), Spacious (32px)
- Property: `Has Shadow` → Boolean
- Property: `Header Style` → Icon+Text, Text Only, None

**Figma Auto Layout**:
```
Container: Auto Layout Vertical
├─ Header: Auto Layout Horizontal
│  ├─ Icon: 24×24px
│  └─ Title: Hug contents
├─ Content: Fill container
Padding: 24px
Gap: 16px
Fill: White 90%
Shadow: 0px 4px 6px rgba(0,0,0,0.1)
Corner radius: 12px
```

---

### 4. Badge Component

#### React Code
```tsx
<Badge className="bg-green-500 text-white">
  Verified
</Badge>
```

#### Figma Recreation
**Component Name**: `Badge/Success`

**Structure**:
1. Create Frame (Auto Layout Horizontal)
2. Settings:
   - Padding: 4px (V) × 12px (H)
   - Fill: Success/Green (#10B981)
   - Corner radius: 9999px (full pill)
   - Height: Hug contents
   - Width: Hug contents

3. Text:
   - Style: Label/Small
   - Fill: White
   - Letter spacing: 0.5px

**Variants**:
- Property: `Type` → Success, Error, Warning, Info, Neutral
- Property: `Size` → Small (20px), Medium (24px), Large (28px)
- Property: `Has Icon` → Boolean

**Color Mapping by Type**:
- Success: Green/500, White text
- Error: Red/500, White text
- Warning: Yellow/500, Gray/900 text
- Info: Blue/500, White text
- Neutral: Gray/200, Gray/700 text

**Figma Auto Layout**:
```
Container: Auto Layout Horizontal
├─ Icon (optional): 14×14px
├─ Text: Hug contents
Padding: 4px 12px
Gap: 4px
Fill: Color (variant dependent)
Corner radius: 9999px
```

---

### 5. OTP Input Component

#### React Code
```tsx
<div className="flex gap-3">
  {[1,2,3,4,5,6].map(i => (
    <Input 
      key={i}
      className="w-12 h-12 text-center text-2xl"
      maxLength={1}
    />
  ))}
</div>
```

#### Figma Recreation
**Component Name**: `OTP/Single-Box`

**Individual Box Structure**:
1. Create Frame: 48×48px (mobile), 56×56px (desktop)
2. Settings:
   - Fill: Gray/50
   - Stroke: 2px Gray/300
   - Corner radius: 8px
   - Text: H2/Mobile, Center aligned
   - Text fill: Primary/Blue

**Variants for Single Box**:
- Property: `State` → Empty, Filled, Active
- Property: `Size` → Mobile (48px), Desktop (56px)

**State Specifications**:
- **Empty**: Gray/50 fill, Gray/300 stroke, no text
- **Filled**: Primary/Blue 5% fill, Primary/Blue stroke, digit visible
- **Active**: Accent/Gold stroke, scale 1.05, cursor visible

**Complete OTP Component**: `OTP/6-Digit`
- Create Frame (Auto Layout Horizontal)
- Add 6 instances of `OTP/Single-Box`
- Gap: 12px (mobile), 16px (desktop)
- Alignment: Center

**Figma Auto Layout**:
```
Container: Auto Layout Horizontal
├─ Box 1: 48×48px Fixed
├─ Box 2: 48×48px Fixed
├─ Box 3: 48×48px Fixed
├─ Box 4: 48×48px Fixed
├─ Box 5: 48×48px Fixed
└─ Box 6: 48×48px Fixed
Gap: 12px
Alignment: Center
```

---

### 6. Progress Bar

#### React Code
```tsx
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Overall Progress</span>
    <span>75%</span>
  </div>
  <Progress value={75} className="h-2" />
</div>
```

#### Figma Recreation
**Component Name**: `Progress/Bar`

**Structure**:
1. **Label Row** (Auto Layout Horizontal):
   - Label text: "Progress Label"
   - Percentage: "75%"
   - Space between: Justify content
   - Margin bottom: 8px

2. **Progress Track**:
   - Frame: Fill container width, 8px height
   - Fill: Gray/200
   - Corner radius: 9999px (full pill)

3. **Progress Fill** (inside track):
   - Frame: 75% width, 8px height
   - Fill: Linear gradient Gold/Base → Gold/Light
   - Corner radius: 9999px
   - Position: Absolute, left 0

**Component Properties**:
- Property: `Progress Value` → 0-100 (instance swap or text override)
- Property: `Show Label` → Boolean
- Property: `Height` → Thin (4px), Default (8px), Thick (12px)

**Figma Auto Layout**:
```
Container: Auto Layout Vertical
├─ Label Row: Auto Layout Horizontal, Fill container
│  ├─ Label: Hug contents
│  └─ Percentage: Hug contents (pushed right)
├─ Track: Fill container (width), Fixed height
   └─ Fill: Width based on percentage
Gap: 8px
```

**Animation Notes** (for prototype):
- Use Smart Animate between progress states
- Transition: 300ms ease-in-out

---

### 7. Checkbox Component

#### React Code
```tsx
<div className="flex items-center gap-3">
  <Checkbox id="terms" />
  <label htmlFor="terms">I agree to terms</label>
</div>
```

#### Figma Recreation
**Component Name**: `Checkbox`

**Structure**:
1. Create Frame: 20×20px
2. Settings:
   - Fill: Transparent (unchecked) / Primary/Blue (checked)
   - Stroke: 2px Gray/400 (unchecked) / Primary/Blue (checked)
   - Corner radius: 4px

3. **Checkmark** (for checked state):
   - Use icon from Iconify (check icon)
   - Size: 14×14px
   - Color: White
   - Center aligned

**Variants**:
- Property: `State` → Unchecked, Checked, Indeterminate
- Property: `Disabled` → Boolean

**State Specifications**:
- **Unchecked**: Transparent fill, Gray/400 stroke
- **Checked**: Primary/Blue fill, checkmark visible
- **Indeterminate**: Primary/Blue fill, minus icon
- **Disabled**: Gray/100 fill, Gray/300 stroke, 50% opacity

**With Label Component**: `Checkbox/With-Label`
- Create Frame (Auto Layout Horizontal)
- Checkbox instance + Text label
- Gap: 12px
- Alignment: Center (vertical)

---

### 8. Select/Dropdown Component

#### React Code
```tsx
<Select>
  <SelectTrigger className="h-12">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

#### Figma Recreation
**Component Name**: `Select/Trigger`

**Trigger Structure**:
1. Create Frame (Auto Layout Horizontal)
2. Settings:
   - Padding: 12px × 16px
   - Height: 48px
   - Width: Fill container
   - Fill: Gray/50
   - Stroke: 1px Gray/300
   - Corner radius: 8px
   - Space between: Justify

3. Elements:
   - Selected text: "Selected Value" (Body/Large)
   - Chevron icon: 20×20px (chevron-down)

**Variants**:
- Property: `State` → Default, Open, Disabled
- Property: `Has Value` → Boolean (placeholder vs value)

**Dropdown Component**: `Select/Dropdown`
1. Create Frame (Auto Layout Vertical)
2. Settings:
   - Padding: 8px
   - Fill: White
   - Shadow: Shadow/LG
   - Corner radius: 8px
   - Max height: 300px (scrollable)

3. **Option Item** (component):
   - Frame (Auto Layout Horizontal)
   - Padding: 12px × 16px
   - Height: 44px
   - Hover state: Gray/50 fill

**Figma Auto Layout**:
```
Trigger: Auto Layout Horizontal
├─ Value Text: Fill container
└─ Chevron Icon: 20×20px Fixed
Padding: 12px 16px
Space between: Justify
Height: 48px

Dropdown: Auto Layout Vertical
├─ Option 1: Auto Layout Horizontal (Hug)
├─ Option 2: Auto Layout Horizontal (Hug)
└─ Option N: Auto Layout Horizontal (Hug)
Padding: 8px
Gap: 2px
```

---

### 9. Alert/Toast Component

#### React Code
```tsx
import { toast } from 'sonner';

toast.success('Operation successful!');
```

#### Figma Recreation
**Component Name**: `Toast/Success`

**Structure**:
1. Create Frame (Auto Layout Horizontal)
2. Settings:
   - Padding: 16px
   - Gap: 12px
   - Fill: White
   - Shadow: Shadow/XL
   - Corner radius: 8px
   - Width: 360px (fixed)

3. Elements:
   - Status icon: 24×24px (check-circle for success)
   - Content column (Auto Layout Vertical):
     - Title: Label/Medium
     - Message: Body/Small, Gray/600
   - Close button: 20×20px (X icon)

**Variants**:
- Property: `Type` → Success, Error, Warning, Info
- Property: `Has Close` → Boolean

**Color Coding**:
- Success: Green/500 icon, Green/50 background (optional)
- Error: Red/500 icon, Red/50 background (optional)
- Warning: Yellow/500 icon, Yellow/50 background (optional)
- Info: Blue/500 icon, Blue/50 background (optional)

**Figma Auto Layout**:
```
Container: Auto Layout Horizontal
├─ Icon: 24×24px Fixed
├─ Content: Auto Layout Vertical (Fill)
│  ├─ Title: Hug
│  └─ Message: Fill
└─ Close Button: 20×20px Fixed
Padding: 16px
Gap: 12px
Width: 360px
```

---

### 10. Modal/Dialog Component

#### React Code
```tsx
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description text...
      </DialogDescription>
    </DialogHeader>
    <div>{/* Content */}</div>
    <DialogFooter>
      <Button>Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### Figma Recreation
**Component Name**: `Dialog/Modal`

**Structure**:
1. **Overlay** (Full Screen Frame):
   - Size: 390×844px (mobile) or screen size
   - Fill: Black 50% opacity
   - Alignment: Center

2. **Modal Container** (Auto Layout Vertical):
   - Padding: 24px
   - Gap: 24px
   - Fill: White
   - Corner radius: 16px
   - Max width: 90% (mobile), 500px (desktop)
   - Shadow: Shadow/XL

3. **Header** (Auto Layout Vertical):
   - Gap: 8px
   - Title: H3/Mobile
   - Description: Body/Medium, Gray/600

4. **Content Area**:
   - Fill container
   - Scrollable if needed

5. **Footer** (Auto Layout Horizontal):
   - Gap: 12px
   - Alignment: Right
   - Two button instances

**Variants**:
- Property: `Size` → Small, Medium, Large, Full
- Property: `Has Footer` → Boolean

**Figma Auto Layout**:
```
Overlay: Frame (Fill container)
└─ Modal: Auto Layout Vertical (Center aligned)
   ├─ Header: Auto Layout Vertical
   │  ├─ Title: Hug
   │  └─ Description: Fill
   ├─ Content: Fill container
   └─ Footer: Auto Layout Horizontal
      ├─ Cancel Button
      └─ Confirm Button
   Padding: 24px
   Gap: 24px
   Corner radius: 16px
```

---

## 🎨 Design Token Variables in Figma

### Setting Up Variables (Figma Variables Feature)

1. **Create Variable Collections**:
   - Colors
   - Spacing
   - Typography (as styles)
   - Effects

2. **Color Variables**:
```
Collection: Colors
├─ Primary
│  ├─ Blue/Base → #003E6D
│  ├─ Blue/Light → #0056A3
│  └─ Blue/Dark → #002947
├─ Accent
│  ├─ Gold/Base → #FFD700
│  ├─ Gold/Light → #FFED4E
│  └─ Gold/Dark → #CCB000
├─ Semantic
│  ├─ Success → #10B981
│  ├─ Error → #EF4444
│  ├─ Warning → #F59E0B
│  └─ Info → #3B82F6
└─ Neutral
   ├─ Gray/50 → #F9FAFB
   ├─ Gray/100 → #F3F4F6
   └─ ... (all gray scales)
```

3. **Spacing Variables**:
```
Collection: Spacing
├─ XXS → 4px
├─ XS → 8px
├─ SM → 12px
├─ MD → 16px
├─ LG → 24px
├─ XL → 32px
├─ XXL → 48px
└─ XXXL → 64px
```

4. **Apply Variables to Components**:
   - Button padding → Spacing/MD
   - Card padding → Spacing/LG
   - Button background → Colors/Accent/Gold/Base
   - Text color → Colors/Primary/Blue/Base

---

## 🔧 Figma Plugins for Component Creation

### Essential Plugins

1. **Iconify**
   - Purpose: Import Lucide React icons
   - Usage: Insert exact icons from code
   - Components: All icon elements

2. **Content Reel**
   - Purpose: Realistic placeholder data
   - Usage: Populate forms, cards, lists
   - Components: Text fields, lists

3. **Stark**
   - Purpose: Accessibility checking
   - Usage: Verify contrast ratios
   - Components: All text and color combinations

4. **Auto Layout Grid**
   - Purpose: Quick grid creation
   - Usage: Set up 8px grid system
   - Components: All frames

5. **Component Page Extractor**
   - Purpose: Organize components
   - Usage: Extract components to library pages
   - Components: All components

6. **Design Lint**
   - Purpose: Consistency checking
   - Usage: Find inconsistent spacing, colors, fonts
   - Components: All designs

---

## 📋 Component Checklist

### For Each Component

- [ ] Create base structure with Auto Layout
- [ ] Add all variants (states, sizes, types)
- [ ] Apply design token variables
- [ ] Set proper constraints and resizing
- [ ] Add component description
- [ ] Create interactive states (hover, pressed, etc.)
- [ ] Test with different content lengths
- [ ] Verify accessibility (contrast, sizes)
- [ ] Add to component library
- [ ] Document usage in component description

---

## 🎯 Quick Reference: shadcn/ui to Figma

| shadcn Component | Figma Component Type | Key Properties |
|------------------|---------------------|----------------|
| `Button` | Auto Layout (H) + Text + Icon | Variants: variant, size, state |
| `Input` | Auto Layout (V) + Label + Frame | States: default, focus, error |
| `Card` | Auto Layout (V) + Sections | Padding, shadow, blur |
| `Badge` | Auto Layout (H) + Text | Type, size, icon |
| `Checkbox` | Frame + Icon (conditional) | States: checked, unchecked |
| `Select` | Auto Layout + Dropdown | Trigger + options list |
| `Dialog` | Overlay + Modal frame | Size variants |
| `Toast` | Auto Layout (H) + Icon + Text | Type-based colors |
| `Progress` | Frame + Fill bar | Value percentage |
| `Tabs` | Auto Layout (H) + Indicators | Active state |

---

## 💡 Pro Tips

### Auto Layout Best Practices

1. **Use Hug vs Fill Correctly**:
   - Buttons: Hug contents (both directions)
   - Inputs: Fill (width), Fixed (height)
   - Cards: Fill (width), Hug (height)

2. **Nested Auto Layouts**:
   - Use for complex components
   - Parent defines overall structure
   - Children define content flow

3. **Space Between**:
   - Use for toolbars, headers with left/right content
   - Saves manual positioning

4. **Min/Max Width**:
   - Set on text elements for responsive behavior
   - Prevents breaking at extreme sizes

### Component Variants

1. **Organize by Property**:
   - State (default, hover, pressed, disabled)
   - Size (small, medium, large)
   - Type (primary, secondary, etc.)

2. **Boolean Properties**:
   - Has Icon
   - Has Label
   - Is Disabled

3. **Instance Swap Properties**:
   - Icon selection
   - Content variations

---

## 🎨 Component Library Naming Convention

### Format
```
Category/Component/Variant
```

### Examples
```
Button/Primary/Large
Input/Text/Focus
Card/Default/With-Shadow
Badge/Success/Small
OTP/Single-Box/Filled
Progress/Bar/Default
```

### Benefits
- Easy to find
- Logical grouping
- Clear hierarchy
- Scalable structure

---

## 🚀 Getting Started Workflow

### Day 1: Foundation
1. Set up artboard (390×844px)
2. Create design token styles (colors, typography)
3. Set up 8px grid
4. Create foundation components (Button, Input, Card)

### Day 2: Forms & Data Entry
1. Create form components (Checkbox, Select, OTP)
2. Build compound components (Input with Label)
3. Create validation states

### Day 3: Layout & Navigation
1. Create navigation components (Tabs, Breadcrumbs)
2. Build layout components (Headers, Footers)
3. Create progress indicators

### Day 4: Feedback & Overlays
1. Create Toast/Alert components
2. Build Modal/Dialog components
3. Add loading states

### Day 5: Screen Assembly
1. Create first screen using components
2. Test component flexibility
3. Refine spacing and alignment

### Day 6-8: Complete All Screens
1. Build remaining 7 screens
2. Create responsive variants
3. Set up prototype connections

---

## ✅ Final Checklist

- [ ] All color variables created
- [ ] All text styles created
- [ ] All spacing consistent with 8px grid
- [ ] All components have variants
- [ ] All interactive states defined
- [ ] Component descriptions added
- [ ] Components organized in library
- [ ] All 8 screens created
- [ ] Prototype connections complete
- [ ] Responsive variants created
- [ ] Accessibility checked
- [ ] Design tokens documented
- [ ] Developer handoff ready

---

## 📦 Deliverables

**Figma File Structure**:
```
TRADIE-CommissionAgentFlow.fig
├── Cover Page (project info)
├── Design Tokens (colors, typography, etc.)
├── Component Library (all components)
├── Mobile Screens (390px - all 8 screens)
├── Tablet Screens (768px - key screens)
├── Desktop Screens (1440px - key screens)
├── Prototypes (connected flows)
└── Developer Handoff (annotations, measurements)
```

**Export Package**:
- Figma file (.fig)
- Shared link (prototype)
- PDF (all screens with annotations)
- PNG exports (@2x for mockups)
- Icon assets (SVG)
- Design token documentation

---

**Created**: October 22, 2025  
**Version**: 1.0  
**Status**: Ready for Implementation  
**Next**: Start building in Figma following this guide
