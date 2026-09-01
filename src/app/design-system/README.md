# 🎨 TRADIE Design System

A comprehensive design system for the TRADIE commodity trading platform, ensuring visual and functional consistency across mobile, web, and desktop applications.

---

## 📚 Table of Contents

1. [Overview](#overview)
2. [Colors](#colors)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Components](#components)
6. [Responsive Design](#responsive-design)
7. [Animations](#animations)
8. [Usage Guide](#usage-guide)

---

## Overview

The TRADIE Design System provides a centralized foundation of design tokens, components, and guidelines to maintain consistency across all platforms and screens.

### Key Principles

- **Consistency**: Unified visual language across all touchpoints
- **Accessibility**: WCAG 2.1 AA compliant
- **Scalability**: Built for growth and extensibility
- **Performance**: Optimized for speed and efficiency

---

## Colors

### Primary Gradient

```typescript
gradient: {
  start: '#F7FAFC',   // Light blue-gray
  middle: '#E8F4FC',  // Sky blue
  end: '#D9F2FF',     // Soft cyan
}
```

**Usage**: Main background for app screens, creates a soft, professional atmosphere.

### Accent Colors

```typescript
accent: {
  gold: '#FFD700',       // Primary gold
  goldDark: '#FFC700',   // Hover state
  goldLight: '#FFE55C',  // Highlights
}
```

**Usage**: Primary CTAs, important highlights, success indicators, premium features.

### Deep Blue

```typescript
blue: {
  primary: '#003E6D',  // Headers, primary text
  light: '#0066B2',    // Interactive elements
  dark: '#002847',     // Dark mode, emphasis
}
```

**Usage**: Headers, primary navigation, trust indicators, professional tone.

### Text Colors

```typescript
text: {
  primary: '#191919',      // Main content
  secondary: '#5A6B7A',    // Supporting text
  muted: '#8B9AA8',        // Placeholder, captions
  disabled: '#C4CDD5',     // Disabled states
  inverse: '#FFFFFF',      // Text on dark backgrounds
}
```

### Status Colors

```typescript
status: {
  success: '#27AE60',      // Positive actions, confirmations
  warning: '#E2B93B',      // Warnings, caution
  error: '#E74C3C',        // Errors, destructive actions
  info: '#2F80ED',         // Information, tips
}
```

### Surface Colors

```typescript
surface: {
  primary: '#FFFFFF',      // Cards, modals
  secondary: '#F8FAFB',    // Subtle backgrounds
  tertiary: '#EEF2F6',     // Hover states
  overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlays
}
```

---

## Typography

### Font Families

- **Heading**: Playfair Display (Serif) - Elegant, authoritative
- **Subheading**: Poppins (Sans-serif) - Modern, clean
- **Body**: Inter (Sans-serif) - Readable, professional
- **Label**: Montserrat (Sans-serif) - Compact, clear
- **Caption**: Lato (Sans-serif) - Friendly, approachable

### Text Styles

#### H1 - Display Heading
```typescript
{
  fontFamily: 'Playfair Display, serif',
  fontSize: '2.25rem', // 36px
  fontWeight: 700,
  lineHeight: 1.2,
  letterSpacing: '0.5px',
}
```
**Usage**: Welcome screens, main page titles

#### H2 - Section Header
```typescript
{
  fontFamily: 'Poppins, sans-serif',
  fontSize: '1.75rem', // 28px
  fontWeight: 600,
  lineHeight: 1.3,
  letterSpacing: '0.3px',
}
```
**Usage**: Section headers, card titles

#### H3 - Subsection Header
```typescript
{
  fontFamily: 'Poppins, sans-serif',
  fontSize: '1.25rem', // 20px
  fontWeight: 600,
  lineHeight: 1.4,
  letterSpacing: '0.2px',
}
```
**Usage**: Card headers, modal titles

#### Body Text
```typescript
{
  fontFamily: 'Inter, sans-serif',
  fontSize: '1rem', // 16px
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: '0',
}
```
**Usage**: Main content, descriptions

#### Label
```typescript
{
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.875rem', // 14px
  fontWeight: 600,
  lineHeight: 1.4,
  letterSpacing: '0.5px',
}
```
**Usage**: Form labels, buttons, navigation

#### Caption
```typescript
{
  fontFamily: 'Lato, sans-serif',
  fontSize: '0.75rem', // 12px
  fontWeight: 400,
  lineHeight: 1.4,
  letterSpacing: '0.3px',
}
```
**Usage**: Helper text, timestamps, metadata

---

## Spacing

Based on an 8px grid system:

```typescript
spacing: {
  1: '0.25rem',  // 4px  - Tight spacing
  2: '0.5rem',   // 8px  - Base unit
  3: '0.75rem',  // 12px - Small gaps
  4: '1rem',     // 16px - Default spacing
  5: '1.25rem',  // 20px - Medium gaps
  6: '1.5rem',   // 24px - Large gaps
  8: '2rem',     // 32px - Section spacing
  10: '2.5rem',  // 40px - Large sections
  12: '3rem',    // 48px - Major sections
}
```

---

## Components

### DSButton

Primary action button with multiple variants.

**Variants**: `primary` | `secondary` | `ghost`  
**Sizes**: `sm` | `md` | `lg` | `xl`

```tsx
import { DSButton } from './design-system/components/DSButton';

<DSButton variant="primary" size="lg" fullWidth>
  Get Started
</DSButton>

<DSButton 
  variant="secondary" 
  leftIcon={<Icon />}
  isLoading
>
  Submit
</DSButton>
```

**States**:
- Default
- Hover (scale: 1.02, shadow)
- Active (scale: 0.98)
- Disabled (opacity: 0.5)
- Loading (spinner icon)

---

### DSInput

Form input with validation states.

**Variants**: `default` | `error`  
**Sizes**: `sm` | `md` | `lg` | `xl`

```tsx
import { DSInput } from './design-system/components/DSInput';

<DSInput
  label="Email Address"
  placeholder="your.email@example.com"
  helperText="We'll never share your email"
  leftIcon={<Mail />}
/>

<DSInput
  label="Password"
  type="password"
  showPasswordToggle
  errorText="Password must be at least 8 characters"
  variant="error"
/>
```

**Features**:
- Auto-focus indication
- Password visibility toggle
- Icon support (left/right)
- Error/helper text
- Disabled state

---

### DSCard

Container for content with multiple styles.

**Variants**: `default` | `elevated` | `gold`  
**Padding**: `none` | `sm` | `md` | `lg` | `xl`

```tsx
import { 
  DSCard, 
  DSCardHeader, 
  DSCardTitle, 
  DSCardDescription,
  DSCardContent,
  DSCardFooter 
} from './design-system/components/DSCard';

<DSCard variant="gold" hoverable>
  <DSCardHeader>
    <DSCardTitle>Welcome Bonus</DSCardTitle>
    <DSCardDescription>Claim your rewards</DSCardDescription>
  </DSCardHeader>
  <DSCardContent>
    {/* Card content */}
  </DSCardContent>
  <DSCardFooter>
    <DSButton>Claim Now</DSButton>
  </DSCardFooter>
</DSCard>
```

**Features**:
- Hover animations (optional)
- Nested components (Header, Title, Description, Content, Footer)
- Multiple variants for different contexts

---

### DSAlert

Notification and message component.

**Variants**: `success` | `warning` | `error` | `info`

```tsx
import { DSAlert } from './design-system/components/DSAlert';

<DSAlert 
  variant="success" 
  title="KYC Verified" 
  description="Your account has been successfully verified"
  dismissible
  onDismiss={() => console.log('Dismissed')}
/>
```

**Features**:
- Auto icon based on variant
- Custom icons support
- Dismissible option
- Fade-in animation

---

### DSBadge

Small status indicators and labels.

**Variants**: `default` | `success` | `warning` | `error` | `info` | `gold`  
**Sizes**: `sm` | `md` | `lg`

```tsx
import { DSBadge } from './design-system/components/DSBadge';

<DSBadge variant="success" dot>Verified</DSBadge>
<DSBadge variant="gold" size="lg">Premium</DSBadge>
```

**Features**:
- Optional dot indicator
- Multiple sizes
- Color-coded variants

---

## Responsive Design

### Breakpoints

```typescript
breakpoints: {
  mobile: '320px',      // Small phones
  mobileLg: '480px',    // Large phones
  tablet: '768px',      // Tablets
  tabletLg: '1024px',   // Large tablets
  desktop: '1280px',    // Desktops
  desktopLg: '1440px',  // Large desktops
  wide: '1920px',       // Wide screens
}
```

### Usage

```tsx
import { useResponsiveValue } from './design-system/hooks/useDesignTokens';

const fontSize = useResponsiveValue({
  mobile: '14px',
  tablet: '16px',
  desktop: '18px',
  default: '16px',
});
```

### Screen-Specific Variants

- **Mobile**: 1080×2400 (Portrait)
- **Tablet**: 1280×800 (Landscape)
- **Desktop**: 1440×1024
- **Web**: Fluid/Responsive

---

## Animations

### Duration

```typescript
duration: {
  fast: '150ms',      // Quick transitions
  normal: '200ms',    // Default
  slow: '300ms',      // Deliberate animations
  slower: '400ms',    // Large movements
}
```

### Easing

```typescript
easing: {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
}
```

### Common Transitions

- **Fade In**: `opacity 200ms ease-out`
- **Scale**: `transform 200ms ease-in-out`
- **Button Tap**: Scale to 0.98 for 150ms
- **Success Check**: Bounce easing at 400ms

---

## Usage Guide

### 1. Import Design Tokens

```tsx
import { designTokens } from './design-system/tokens';
import { useDesignTokens } from './design-system/hooks/useDesignTokens';

const { colors, typography, spacing } = designTokens;
```

### 2. Use Components

```tsx
import { DSButton } from './design-system/components/DSButton';
import { DSInput } from './design-system/components/DSInput';
import { DSCard } from './design-system/components/DSCard';
```

### 3. Apply Styles

```tsx
const headingStyle = {
  ...typography.styles.h1,
  color: colors.blue.primary,
  marginBottom: spacing[6],
};

<h1 style={headingStyle}>Welcome to TRADIE</h1>
```

### 4. Create Gradients

```tsx
import { getGradientBackground } from './design-system/hooks/useDesignTokens';

const style = {
  background: getGradientBackground('to-br'),
};
```

---

## Best Practices

### ✅ Do

- Use design tokens for all colors, spacing, and typography
- Follow the 8px spacing grid
- Use semantic color names (e.g., `status.success` not `#27AE60`)
- Leverage component variants instead of custom styling
- Test responsive behavior on all breakpoints

### ❌ Don't

- Hard-code colors or spacing values
- Create custom components that duplicate existing ones
- Override component styles without good reason
- Use inconsistent font families
- Ignore animation timing guidelines

---

## Component Checklist

When creating new components:

- [ ] Uses design tokens from `tokens.ts`
- [ ] Includes responsive behavior
- [ ] Has proper TypeScript types
- [ ] Includes all necessary states (default, hover, active, disabled)
- [ ] Follows accessibility guidelines
- [ ] Has proper animations with correct timing
- [ ] Documented with examples

---

## Future Additions

Components planned for future releases:

- **Navigation Bar** - Mobile/desktop navigation with gold active state
- **Progress Stepper** - Multi-step flow indicator
- **OTP Input** - 6-digit code entry
- **Face Recognition Frame** - Circular preview with scanning states
- **Wallet Card** - Balance display with gold glow
- **Trade Card** - Commodity trading interface
- **Insight Card** - AI-powered market insights
- **Toast Notifications** - Snackbar-style alerts
- **Modal/Dialog** - Overlay popups
- **Dropdown/Select** - Enhanced country/language selection

---

## Maintenance

### Version History

- **v1.0.0** (2025-10-19): Initial design system release
  - Core tokens (colors, typography, spacing)
  - Base components (Button, Input, Card, Alert, Badge)
  - Responsive utilities
  - Animation presets

### Contributing

When adding to the design system:

1. Add tokens to `tokens.ts`
2. Create component in `/design-system/components/`
3. Export from index file
4. Document in this README
5. Test across all breakpoints

---

## Support

For questions or suggestions about the design system:

- Review existing components in `/design-system/components/`
- Check token definitions in `/design-system/tokens.ts`
- Refer to usage examples in this README

---

**Built with ❤️ for TRADIE - The Future of Commodity Trading**
