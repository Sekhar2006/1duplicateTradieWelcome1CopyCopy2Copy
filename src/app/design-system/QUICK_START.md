# 🚀 TRADIE Design System - Quick Start Guide

## Installation & Setup

The TRADIE Design System is already integrated into your project. All components and tokens are ready to use!

---

## 📦 Import Design System Components

### Option 1: Import Individual Components

```tsx
import { DSButton } from './design-system/components/DSButton';
import { DSInput } from './design-system/components/DSInput';
import { DSCard } from './design-system/components/DSCard';
```

### Option 2: Import from Index (Recommended)

```tsx
import { 
  DSButton, 
  DSInput, 
  DSCard, 
  DSAlert,
  DSBadge,
  designTokens 
} from './design-system';
```

---

## 🎨 Using Design Tokens

### Method 1: Direct Import

```tsx
import { designTokens } from './design-system/tokens';

const { colors, typography, spacing } = designTokens;

// Use in your component
const myStyle = {
  color: colors.blue.primary,
  fontFamily: typography.fonts.heading,
  padding: spacing[4],
};
```

### Method 2: Custom Hook

```tsx
import { useDesignTokens } from './design-system/hooks/useDesignTokens';

function MyComponent() {
  const tokens = useDesignTokens();
  
  return (
    <div style={{ color: tokens.colors.accent.gold }}>
      Premium Content
    </div>
  );
}
```

### Method 3: CSS Variables (from globals.css)

```tsx
<div style={{ 
  backgroundColor: 'var(--accent-gold)',
  color: 'var(--text-inverse)'
}}>
  Gold Button
</div>
```

---

## 🧩 Component Examples

### 1. Buttons

```tsx
import { DSButton } from './design-system';

// Primary button
<DSButton variant="primary" size="lg">
  Get Started
</DSButton>

// With icon
<DSButton variant="secondary" leftIcon={<Icon />}>
  Continue
</DSButton>

// Loading state
<DSButton variant="primary" isLoading>
  Processing...
</DSButton>

// Full width
<DSButton variant="primary" fullWidth>
  Submit
</DSButton>
```

### 2. Inputs

```tsx
import { DSInput } from './design-system';
import { Mail } from 'lucide-react';

// Basic input
<DSInput
  label="Email"
  placeholder="your.email@example.com"
  helperText="We'll never share your email"
/>

// With icon
<DSInput
  label="Email"
  leftIcon={<Mail size={20} />}
  placeholder="your.email@example.com"
/>

// Password with toggle
<DSInput
  label="Password"
  type="password"
  showPasswordToggle
/>

// Error state
<DSInput
  label="Username"
  variant="error"
  errorText="Username is required"
/>
```

### 3. Cards

```tsx
import { 
  DSCard, 
  DSCardHeader, 
  DSCardTitle, 
  DSCardDescription,
  DSCardContent,
  DSCardFooter,
  DSButton 
} from './design-system';

<DSCard variant="gold" hoverable>
  <DSCardHeader>
    <DSCardTitle>Welcome Bonus</DSCardTitle>
    <DSCardDescription>
      Claim your 100 coins reward
    </DSCardDescription>
  </DSCardHeader>
  
  <DSCardContent>
    <p>Complete your KYC to unlock this bonus</p>
  </DSCardContent>
  
  <DSCardFooter>
    <DSButton variant="primary">Claim Now</DSButton>
  </DSCardFooter>
</DSCard>
```

### 4. Alerts

```tsx
import { DSAlert } from './design-system';

// Success
<DSAlert 
  variant="success" 
  title="Success!" 
  description="Your account has been verified"
  dismissible
  onDismiss={() => console.log('Dismissed')}
/>

// Warning
<DSAlert 
  variant="warning" 
  title="Session Expiring"
  description="Your session will expire in 5 minutes"
/>

// Error
<DSAlert 
  variant="error" 
  title="Error"
  description="Failed to process payment"
/>
```

### 5. Badges

```tsx
import { DSBadge } from './design-system';

<DSBadge variant="success" dot>Verified</DSBadge>
<DSBadge variant="gold" size="lg">Premium</DSBadge>
<DSBadge variant="warning">Pending</DSBadge>
```

---

## 🎯 Common Patterns

### Creating a Form

```tsx
import { DSInput, DSButton } from './design-system';

function LoginForm() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <DSInput
        label="Email"
        type="email"
        placeholder="your.email@example.com"
      />
      
      <DSInput
        label="Password"
        type="password"
        showPasswordToggle
      />
      
      <DSButton variant="primary" fullWidth>
        Sign In
      </DSButton>
    </form>
  );
}
```

### Creating a Card Grid

```tsx
import { DSCard, DSCardTitle, DSCardContent } from './design-system';
import { designTokens } from './design-system/tokens';

function CardGrid() {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: designTokens.spacing[6],
  };

  return (
    <div style={gridStyle}>
      <DSCard variant="elevated" hoverable>
        <DSCardTitle>Card 1</DSCardTitle>
        <DSCardContent>Content here</DSCardContent>
      </DSCard>
      
      <DSCard variant="elevated" hoverable>
        <DSCardTitle>Card 2</DSCardTitle>
        <DSCardContent>Content here</DSCardContent>
      </DSCard>
    </div>
  );
}
```

### Using Gradient Backgrounds

```tsx
import { getGradientBackground } from './design-system/hooks/useDesignTokens';

function HeroSection() {
  return (
    <div style={{
      background: getGradientBackground('to-br'),
      minHeight: '100vh',
      padding: '2rem',
    }}>
      <h1>Welcome to TRADIE</h1>
    </div>
  );
}
```

---

## 📱 Responsive Design

### Using Responsive Hook

```tsx
import { useResponsiveValue } from './design-system/hooks/useDesignTokens';

function MyComponent() {
  const padding = useResponsiveValue({
    mobile: '1rem',
    tablet: '1.5rem',
    desktop: '2rem',
    default: '1rem',
  });

  return (
    <div style={{ padding }}>
      Responsive content
    </div>
  );
}
```

### Manual Breakpoints

```tsx
import { designTokens } from './design-system/tokens';

const { breakpoints } = designTokens;

// In CSS-in-JS
const styles = {
  container: {
    padding: '1rem',
    
    [`@media (min-width: ${breakpoints.tablet})`]: {
      padding: '2rem',
    },
    
    [`@media (min-width: ${breakpoints.desktop})`]: {
      padding: '3rem',
    },
  },
};
```

---

## 🎨 Color Usage Guide

### Primary Actions
```tsx
// Use Accent Gold for CTAs
<DSButton variant="primary">Primary Action</DSButton>
```

### Headers & Trust Elements
```tsx
// Use Deep Blue for authority
<h1 style={{ color: designTokens.colors.blue.primary }}>
  TRADIE Platform
</h1>
```

### Status Indicators
```tsx
// Success - Green
<DSBadge variant="success">Verified</DSBadge>

// Warning - Yellow
<DSBadge variant="warning">Pending</DSBadge>

// Error - Red
<DSBadge variant="error">Failed</DSBadge>

// Info - Blue
<DSBadge variant="info">New</DSBadge>
```

---

## ✨ Animation Examples

### Button with Custom Animation

```tsx
import { motion } from 'motion/react';
import { designTokens } from './design-system/tokens';

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ 
    duration: designTokens.animations.duration.fast,
    ease: designTokens.animations.easing.easeInOut 
  }}
  style={{
    background: designTokens.colors.accent.gold,
    padding: designTokens.spacing[4],
    borderRadius: designTokens.radius.xl,
  }}
>
  Animated Button
</motion.button>
```

### Fade In Animation

```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Fading in content
</motion.div>
```

---

## 🔧 Customization

### Extending Button Variants

```tsx
import { DSButton } from './design-system';
import { designTokens } from './design-system/tokens';

// Custom styled button using base component
function DangerButton(props) {
  return (
    <DSButton 
      {...props}
      style={{
        backgroundColor: designTokens.colors.status.error,
        color: '#FFFFFF',
        ...props.style
      }}
    />
  );
}
```

### Creating Custom Components

```tsx
import { designTokens } from './design-system/tokens';

function CustomCard({ children }) {
  const style = {
    backgroundColor: designTokens.colors.surface.primary,
    borderRadius: designTokens.radius['2xl'],
    padding: designTokens.spacing[6],
    boxShadow: designTokens.shadows.lg,
  };

  return <div style={style}>{children}</div>;
}
```

---

## 📖 View Full Documentation

For complete documentation, see:
- **[README.md](./README.md)** - Full design system documentation
- **[tokens.ts](./tokens.ts)** - All design tokens
- **[DesignSystemShowcase.tsx](./DesignSystemShowcase.tsx)** - Visual showcase of all components

---

## 🎯 Best Practices

✅ **DO:**
- Use design tokens instead of hard-coded values
- Use semantic component variants (primary, secondary, etc.)
- Follow the 8px spacing grid
- Test responsive behavior

❌ **DON'T:**
- Hard-code colors like `#FFD700` (use `colors.accent.gold`)
- Mix custom styling with design system components unnecessarily
- Create duplicate components
- Override typography without reason

---

## 🆘 Troubleshooting

### Import Errors

If you get import errors, make sure you're importing from the correct path:
```tsx
// ✅ Correct
import { DSButton } from './design-system';

// ❌ Incorrect
import { DSButton } from 'design-system';
```

### TypeScript Errors

Ensure all props match the component's interface:
```tsx
// ✅ Correct
<DSButton variant="primary" size="lg">Click</DSButton>

// ❌ Incorrect (invalid variant)
<DSButton variant="large">Click</DSButton>
```

---

**Need help? Check the main [README.md](./README.md) for detailed documentation!**
