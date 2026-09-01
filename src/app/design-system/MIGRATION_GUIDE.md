# 🔄 Design System Migration Guide

This guide helps you migrate existing TRADIE components to use the new Design System.

---

## Overview

The TRADIE Design System provides:
- ✅ Consistent design tokens (colors, typography, spacing)
- ✅ Reusable components with built-in variants
- ✅ TypeScript types for better DX
- ✅ Responsive utilities
- ✅ Accessibility best practices

---

## Migration Strategy

### Phase 1: Non-Breaking Changes ✅ (Current)

**What to do:**
- Keep existing components working
- Gradually introduce design system where beneficial
- Use design tokens for new features

**What NOT to do:**
- Don't rewrite everything at once
- Don't break existing flows
- Don't force migration before testing

### Phase 2: Gradual Adoption (Recommended)

**Priority Order:**
1. New features → Use design system from the start
2. Existing screens being updated → Migrate during updates
3. Stable screens → Migrate when convenient

---

## Step-by-Step Migration

### 1. Replace Hard-Coded Colors

**❌ Before:**
```tsx
<button style={{ backgroundColor: '#FFD700', color: '#FFFFFF' }}>
  Click Me
</button>
```

**✅ After:**
```tsx
import { designTokens } from './design-system/tokens';

<button style={{ 
  backgroundColor: designTokens.colors.accent.gold,
  color: designTokens.colors.text.inverse 
}}>
  Click Me
</button>
```

**Or better yet:**
```tsx
import { DSButton } from './design-system';

<DSButton variant="primary">Click Me</DSButton>
```

---

### 2. Standardize Typography

**❌ Before:**
```tsx
<h1 style={{ 
  fontFamily: 'Playfair Display',
  fontSize: '36px',
  fontWeight: 700,
  color: '#003E6D' 
}}>
  Welcome
</h1>
```

**✅ After:**
```tsx
import { designTokens } from './design-system/tokens';

const { typography, colors } = designTokens;

<h1 style={{
  ...typography.styles.h1,
  color: colors.blue.primary
}}>
  Welcome
</h1>
```

---

### 3. Use Consistent Spacing

**❌ Before:**
```tsx
<div style={{ 
  padding: '20px',
  marginBottom: '25px',
  gap: '15px' 
}}>
  Content
</div>
```

**✅ After:**
```tsx
import { designTokens } from './design-system/tokens';

<div style={{ 
  padding: designTokens.spacing[5],      // 20px → 1.25rem
  marginBottom: designTokens.spacing[6],  // 24px (closest to 25px)
  gap: designTokens.spacing[4]            // 16px (closest to 15px)
}}>
  Content
</div>
```

**💡 Tip:** Round to nearest 8px increment: 20px → 24px, 15px → 16px

---

### 4. Replace Custom Buttons

**❌ Before:**
```tsx
<button
  onClick={handleClick}
  className="bg-gradient-to-r from-[#FFD700] to-[#FFC700] text-white rounded-xl py-6 px-8"
  style={{ fontFamily: 'Montserrat, sans-serif' }}
>
  Continue
</button>
```

**✅ After:**
```tsx
import { DSButton } from './design-system';

<DSButton 
  variant="primary" 
  size="lg"
  onClick={handleClick}
>
  Continue
</DSButton>
```

**Benefits:**
- Built-in hover/active states
- Loading state support
- Consistent styling
- Accessibility built-in

---

### 5. Standardize Input Fields

**❌ Before:**
```tsx
<div>
  <label style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
    Email
  </label>
  <input
    type="email"
    placeholder="your.email@example.com"
    className="h-12 rounded-xl border-2 border-[#003E6D]/20"
  />
  {error && <p style={{ color: '#E74C3C' }}>{error}</p>}
</div>
```

**✅ After:**
```tsx
import { DSInput } from './design-system';

<DSInput
  label="Email"
  type="email"
  placeholder="your.email@example.com"
  errorText={error}
  variant={error ? 'error' : 'default'}
/>
```

---

### 6. Upgrade Cards

**❌ Before:**
```tsx
<div 
  className="bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8"
>
  <h2>Card Title</h2>
  <p>Card content</p>
  <button>Action</button>
</div>
```

**✅ After:**
```tsx
import { 
  DSCard, 
  DSCardHeader, 
  DSCardTitle, 
  DSCardContent, 
  DSCardFooter,
  DSButton 
} from './design-system';

<DSCard variant="elevated" padding="lg">
  <DSCardHeader>
    <DSCardTitle>Card Title</DSCardTitle>
  </DSCardHeader>
  <DSCardContent>
    <p>Card content</p>
  </DSCardContent>
  <DSCardFooter>
    <DSButton variant="primary">Action</DSButton>
  </DSCardFooter>
</DSCard>
```

---

### 7. Use Alerts Instead of Custom Messages

**❌ Before:**
```tsx
{success && (
  <div style={{
    backgroundColor: 'rgba(39, 174, 96, 0.15)',
    border: '1px solid #27AE60',
    borderRadius: '12px',
    padding: '16px',
    color: '#27AE60'
  }}>
    ✓ Success message
  </div>
)}
```

**✅ After:**
```tsx
import { DSAlert } from './design-system';

{success && (
  <DSAlert 
    variant="success"
    title="Success"
    description="Success message"
    dismissible
    onDismiss={() => setSuccess(false)}
  />
)}
```

---

### 8. Standardize Badges

**❌ Before:**
```tsx
<span style={{
  display: 'inline-flex',
  padding: '4px 12px',
  backgroundColor: 'rgba(255, 215, 0, 0.2)',
  color: '#FFD700',
  borderRadius: '9999px',
  fontSize: '14px',
  fontWeight: 500
}}>
  Premium
</span>
```

**✅ After:**
```tsx
import { DSBadge } from './design-system';

<DSBadge variant="gold">Premium</DSBadge>
```

---

## Component Mapping Table

| Old Pattern | New Component | Benefits |
|-------------|---------------|----------|
| Custom button | `DSButton` | States, variants, accessibility |
| Custom input | `DSInput` | Validation, icons, password toggle |
| Div with styles | `DSCard` | Consistent styling, sub-components |
| Status message | `DSAlert` | Icons, animations, dismissible |
| Custom label | `DSBadge` | Color-coded, size variants |

---

## Existing Components to Migrate

### High Priority (Active Screens)

#### ✅ SignUpScreen.tsx
**Current:** Uses custom inputs and buttons  
**Action:** Already functional, can optionally migrate to design system components for consistency

**Example migration:**
```tsx
// Current (working fine)
<Input className="h-12 rounded-xl" />

// Optional upgrade
<DSInput size="lg" />
```

#### ✅ WelcomeScreen
**Current:** Custom gradient backgrounds  
**Action:** Already uses design tokens in inline styles  
**Status:** ✅ Compatible, no changes needed

### Medium Priority (Less Frequently Updated)

#### OTPVerificationScreen.tsx
**Suggested changes:**
- Use `DSButton` instead of custom button
- Use `DSAlert` for error messages
- Use design tokens for spacing

#### KYCFlow.tsx
**Suggested changes:**
- Use `DSCard` for step cards
- Use `DSButton` for navigation
- Use `DSBadge` for status indicators

### Low Priority (Stable Components)

#### DashboardScreen.tsx
**Status:** Working well as-is  
**Action:** Migrate when adding new features

---

## Common Patterns

### Pattern 1: Gradient Backgrounds

**✅ Using Design System:**
```tsx
import { getGradientBackground } from './design-system/hooks/useDesignTokens';

<div style={{
  background: getGradientBackground('to-br'),
  minHeight: '100vh'
}}>
  Content
</div>
```

### Pattern 2: Responsive Spacing

**✅ Using Design System:**
```tsx
import { useResponsiveValue } from './design-system/hooks/useDesignTokens';

const padding = useResponsiveValue({
  mobile: '1rem',
  tablet: '1.5rem',
  desktop: '2rem',
  default: '1rem',
});

<div style={{ padding }}>Content</div>
```

### Pattern 3: Typography Styles

**✅ Using Design System:**
```tsx
import { getTypographyStyle } from './design-system/hooks/useDesignTokens';

<h1 style={getTypographyStyle('h1')}>
  Welcome to TRADIE
</h1>
```

---

## Migration Checklist

### For Each Component:

- [ ] Replace hard-coded colors with design tokens
- [ ] Replace hard-coded spacing with spacing scale
- [ ] Use typography styles for text
- [ ] Replace custom buttons with `DSButton`
- [ ] Replace custom inputs with `DSInput`
- [ ] Replace custom cards with `DSCard`
- [ ] Use `DSAlert` for notifications
- [ ] Use `DSBadge` for status indicators
- [ ] Test all interactive states
- [ ] Verify responsive behavior
- [ ] Check accessibility (keyboard navigation, screen readers)

---

## Testing After Migration

### Visual Testing
```
✓ Component looks the same or better
✓ Colors match design tokens
✓ Spacing is consistent
✓ Typography is correct
```

### Functional Testing
```
✓ All interactions work (click, hover, focus)
✓ Form validation works
✓ Loading states work
✓ Error states display correctly
```

### Responsive Testing
```
✓ Mobile (320px - 767px)
✓ Tablet (768px - 1023px)
✓ Desktop (1280px+)
```

### Accessibility Testing
```
✓ Keyboard navigation works
✓ Focus indicators visible
✓ Screen reader friendly
✓ Color contrast sufficient
```

---

## Troubleshooting

### Issue: Component looks different after migration

**Solution:**
1. Check if you're using the correct variant
2. Verify spacing values match (round to 8px grid)
3. Ensure correct size prop is used
4. Check if custom styles are overriding component styles

### Issue: TypeScript errors

**Solution:**
1. Ensure correct prop types
2. Check for typos in variant names
3. Verify imports are correct
4. Use `as` for style objects if needed

### Issue: Styling not applying

**Solution:**
1. Check CSS specificity (design system uses inline styles)
2. Ensure className doesn't override component styles
3. Use `style` prop for additional custom styles
4. Check if component accepts the prop you're passing

---

## Getting Help

### Resources
- **Design Tokens:** `/design-system/tokens.ts`
- **Components:** `/design-system/components/`
- **Examples:** `/design-system/examples/`
- **Visual Guide:** `/design-system/VISUAL_GUIDE.md`
- **Quick Start:** `/design-system/QUICK_START.md`

### Support
- Review component source code for available props
- Check examples for usage patterns
- Refer to TypeScript types for prop definitions

---

## Best Practices

### ✅ DO
- Migrate one component at a time
- Test thoroughly after each change
- Keep backward compatibility during transition
- Document custom overrides
- Use design tokens even in custom components

### ❌ DON'T
- Migrate everything at once
- Skip testing
- Override component styles without reason
- Mix old and new patterns in same component
- Ignore TypeScript warnings

---

## Next Steps

1. **Start Small:** Pick one component to migrate
2. **Test Thoroughly:** Ensure everything works
3. **Document Changes:** Note any custom requirements
4. **Repeat:** Move to next component
5. **Celebrate:** Enjoy consistent, maintainable code! 🎉

---

**Remember:** The design system is here to help, not hinder. If something doesn't fit your use case, you can always extend or customize while still using the tokens!

