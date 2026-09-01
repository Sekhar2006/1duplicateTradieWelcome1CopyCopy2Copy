# 🎨 TRADIE Design System - Cheat Sheet

Quick reference for common tasks. Keep this handy while coding!

---

## 🚀 Quick Imports

```tsx
// Import everything
import { 
  DSButton, 
  DSInput, 
  DSCard, 
  DSAlert, 
  DSBadge,
  designTokens 
} from './design-system';

// Import specific components
import { DSButton } from './design-system/components/DSButton';

// Import hooks
import { 
  useDesignTokens, 
  getGradientBackground 
} from './design-system/hooks/useDesignTokens';
```

---

## 🎨 Colors

```tsx
// Gradient
designTokens.colors.gradient.start    // #F7FAFC
designTokens.colors.gradient.middle   // #E8F4FC
designTokens.colors.gradient.end      // #D9F2FF

// Gold
designTokens.colors.accent.gold       // #FFD700
designTokens.colors.accent.goldDark   // #FFC700

// Blue
designTokens.colors.blue.primary      // #003E6D
designTokens.colors.blue.light        // #0066B2

// Text
designTokens.colors.text.primary      // #191919
designTokens.colors.text.secondary    // #5A6B7A
designTokens.colors.text.muted        // #8B9AA8

// Status
designTokens.colors.status.success    // #27AE60
designTokens.colors.status.warning    // #E2B93B
designTokens.colors.status.error      // #E74C3C
designTokens.colors.status.info       // #2F80ED
```

---

## ✍️ Typography

```tsx
// Pre-configured styles
typography.styles.h1              // Playfair Display, 36px, Bold
typography.styles.h2              // Poppins, 28px, SemiBold
typography.styles.h3              // Poppins, 20px, SemiBold
typography.styles.body            // Inter, 16px, Regular
typography.styles.label           // Montserrat, 14px, SemiBold
typography.styles.caption         // Lato, 12px, Regular

// Font families
typography.fonts.heading          // Playfair Display, serif
typography.fonts.subheading       // Poppins, sans-serif
typography.fonts.body             // Inter, sans-serif
typography.fonts.label            // Montserrat, sans-serif
typography.fonts.caption          // Lato, sans-serif

// Sizes
typography.sizes.xs               // 12px
typography.sizes.sm               // 14px
typography.sizes.base             // 16px
typography.sizes.lg               // 20px
typography.sizes.xl               // 24px
typography.sizes['2xl']           // 28px
typography.sizes['3xl']           // 32px
typography.sizes['4xl']           // 36px

// Usage
<h1 style={typography.styles.h1}>Title</h1>
<p style={typography.styles.body}>Content</p>
```

---

## 📏 Spacing

```tsx
spacing[1]    // 4px  (0.25rem)
spacing[2]    // 8px  (0.5rem)  ← Base unit
spacing[3]    // 12px (0.75rem)
spacing[4]    // 16px (1rem)    ← Default
spacing[5]    // 20px (1.25rem)
spacing[6]    // 24px (1.5rem)
spacing[8]    // 32px (2rem)
spacing[10]   // 40px (2.5rem)
spacing[12]   // 48px (3rem)

// Usage
style={{ padding: spacing[6], gap: spacing[4] }}
```

---

## 🔘 Buttons

```tsx
// Primary (Gold background, white text)
<DSButton variant="primary" size="lg">
  Submit
</DSButton>

// Secondary (Outline)
<DSButton variant="secondary">
  Cancel
</DSButton>

// Ghost (Transparent)
<DSButton variant="ghost">
  Learn More
</DSButton>

// With icon
<DSButton variant="primary" leftIcon={<Icon />}>
  Continue
</DSButton>

// Loading
<DSButton variant="primary" isLoading>
  Processing...
</DSButton>

// Disabled
<DSButton variant="primary" disabled>
  Disabled
</DSButton>

// Full width
<DSButton variant="primary" fullWidth>
  Submit
</DSButton>

// Sizes: sm, md (default), lg, xl
<DSButton size="xl">Large Button</DSButton>
```

---

## 📝 Inputs

```tsx
// Basic
<DSInput
  label="Email"
  placeholder="your.email@example.com"
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

// With helper text
<DSInput
  label="Username"
  helperText="Choose a unique username"
/>

// Error state
<DSInput
  label="Email"
  variant="error"
  errorText="Invalid email address"
/>

// Sizes: sm, md (default), lg, xl
<DSInput size="lg" label="Large Input" />
```

---

## 🃏 Cards

```tsx
// Basic card
<DSCard variant="default" padding="lg">
  <p>Card content</p>
</DSCard>

// Elevated (more shadow)
<DSCard variant="elevated" padding="lg">
  <p>Important content</p>
</DSCard>

// Gold (premium)
<DSCard variant="gold" padding="lg">
  <p>Premium content</p>
</DSCard>

// Hoverable
<DSCard variant="elevated" hoverable>
  <p>Hover me!</p>
</DSCard>

// Complete card with sub-components
<DSCard variant="elevated" padding="lg">
  <DSCardHeader>
    <DSCardTitle>Card Title</DSCardTitle>
    <DSCardDescription>Description text</DSCardDescription>
  </DSCardHeader>
  
  <DSCardContent>
    <p>Main content goes here</p>
  </DSCardContent>
  
  <DSCardFooter>
    <DSButton variant="primary">Action</DSButton>
  </DSCardFooter>
</DSCard>

// Padding: none, sm, md (default), lg, xl
<DSCard padding="xl">Extra padding</DSCard>
```

---

## 🚨 Alerts

```tsx
// Success
<DSAlert 
  variant="success" 
  title="Success!" 
  description="Action completed successfully"
/>

// Warning
<DSAlert 
  variant="warning" 
  title="Warning"
  description="Please review before continuing"
/>

// Error
<DSAlert 
  variant="error" 
  title="Error"
  description="Something went wrong"
/>

// Info
<DSAlert 
  variant="info" 
  title="Info"
  description="Here's some helpful information"
/>

// Dismissible
<DSAlert 
  variant="success"
  title="Success!"
  dismissible
  onDismiss={() => console.log('Dismissed')}
/>

// Custom icon
<DSAlert 
  variant="info"
  icon={<CustomIcon />}
  title="Custom"
/>
```

---

## 🏷️ Badges

```tsx
// Variants
<DSBadge variant="default">Default</DSBadge>
<DSBadge variant="success">Verified</DSBadge>
<DSBadge variant="warning">Pending</DSBadge>
<DSBadge variant="error">Failed</DSBadge>
<DSBadge variant="info">New</DSBadge>
<DSBadge variant="gold">Premium</DSBadge>

// With dot
<DSBadge variant="success" dot>Active</DSBadge>

// Sizes: sm, md (default), lg
<DSBadge size="lg" variant="gold">Large</DSBadge>
```

---

## 🎨 Common Patterns

### Gradient Background
```tsx
import { getGradientBackground } from './design-system';

<div style={{
  background: getGradientBackground('to-br'),
  minHeight: '100vh'
}}>
  Content
</div>
```

### Form with Validation
```tsx
<form onSubmit={handleSubmit}>
  <DSInput
    label="Email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    errorText={errors.email}
    variant={errors.email ? 'error' : 'default'}
  />
  
  <DSInput
    label="Password"
    type="password"
    showPasswordToggle
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    errorText={errors.password}
    variant={errors.password ? 'error' : 'default'}
  />
  
  <DSButton variant="primary" fullWidth type="submit">
    Sign In
  </DSButton>
</form>
```

### Card Grid
```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: designTokens.spacing[6]
}}>
  <DSCard variant="elevated" hoverable>
    <DSCardTitle>Card 1</DSCardTitle>
  </DSCard>
  
  <DSCard variant="elevated" hoverable>
    <DSCardTitle>Card 2</DSCardTitle>
  </DSCard>
</div>
```

### Status with Badge
```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
  <span>Status:</span>
  <DSBadge variant="success" dot>Active</DSBadge>
</div>
```

### Button Group
```tsx
<div style={{ display: 'flex', gap: spacing[3] }}>
  <DSButton variant="primary">Save</DSButton>
  <DSButton variant="secondary">Cancel</DSButton>
  <DSButton variant="ghost">Delete</DSButton>
</div>
```

---

## 📱 Responsive

```tsx
import { useResponsiveValue } from './design-system';

const padding = useResponsiveValue({
  mobile: spacing[4],    // 16px on mobile
  tablet: spacing[6],    // 24px on tablet
  desktop: spacing[8],   // 32px on desktop
  default: spacing[4],   // fallback
});

<div style={{ padding }}>Responsive content</div>
```

### Breakpoints
```tsx
breakpoints.mobile      // 320px
breakpoints.tablet      // 768px
breakpoints.desktop     // 1280px
breakpoints.wide        // 1920px
```

---

## ✨ Animations

```tsx
// Durations
animations.duration.fast      // 150ms
animations.duration.normal    // 200ms
animations.duration.slow      // 300ms

// Easing
animations.easing.easeInOut   // cubic-bezier(0.4, 0, 0.2, 1)
animations.easing.bounce      // cubic-bezier(0.68, -0.55, 0.265, 1.55)

// Usage with Motion
import { motion } from 'motion/react';

<motion.div
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
  Hover me
</motion.div>
```

---

## 🎯 CSS Variables

Use in regular CSS/Tailwind:

```css
background-color: var(--accent-gold);
color: var(--text-primary);
padding: var(--spacing-6);
```

Available variables:
- `--gradient-start`, `--gradient-middle`, `--gradient-end`
- `--accent-gold`, `--accent-gold-dark`
- `--blue-primary`, `--blue-light`
- `--text-primary`, `--text-secondary`, `--text-muted`
- `--status-success`, `--status-warning`, `--status-error`
- `--surface-primary`, `--surface-secondary`

---

## 🔧 Common Customizations

### Custom Button Style
```tsx
<DSButton 
  variant="primary"
  style={{
    background: `linear-gradient(to right, ${colors.accent.gold}, ${colors.accent.goldLight})`,
  }}
>
  Custom Gradient
</DSButton>
```

### Custom Card Border
```tsx
<DSCard 
  variant="default"
  style={{
    borderLeft: `4px solid ${colors.accent.gold}`,
  }}
>
  Accented card
</DSCard>
```

### Custom Typography
```tsx
<h2 style={{
  ...typography.styles.h2,
  color: colors.accent.gold,
  textAlign: 'center',
}}>
  Custom Heading
</h2>
```

---

## 💡 Pro Tips

**Spacing:**
- Always use `spacing` scale (follows 8px grid)
- Round custom values to nearest 8px increment

**Colors:**
- Use semantic names (`status.success` not `#27AE60`)
- Gold for CTAs, blue for trust, gray for disabled

**Typography:**
- Use pre-configured styles (`typography.styles.h1`)
- Don't mix more than 3 font families per screen

**Components:**
- Use design system components for consistency
- Only create custom when absolutely necessary
- Extend with `style` prop when needed

**Performance:**
- Import only what you need
- Use `designTokens` directly for inline styles
- Avoid creating wrapper components unnecessarily

---

## 🆘 Quick Fixes

**Button not styling correctly?**
→ Check variant name (primary, secondary, ghost)

**Input validation not showing?**
→ Set `variant="error"` and provide `errorText`

**Card not hovering?**
→ Add `hoverable` prop

**Colors not applying?**
→ Use `designTokens.colors.x.y` format

**TypeScript errors?**
→ Check prop types match component interface

---

## 📖 Need More Help?

- **Quick examples:** [QUICK_START.md](./QUICK_START.md)
- **Full docs:** [README.md](./README.md)
- **Visual specs:** [VISUAL_GUIDE.md](./VISUAL_GUIDE.md)
- **Migration:** [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- **Live demo:** `<DesignSystemShowcase />`

---

**Keep this cheat sheet handy for quick reference! 🚀**
