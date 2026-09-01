// Hook for accessing design tokens in React components
import { designTokens } from '../tokens';

export function useDesignTokens() {
  return designTokens;
}

// Helper function to get responsive values based on screen size
export function useResponsiveValue<T>(values: {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  default: T;
}): T {
  if (typeof window === 'undefined') {
    return values.default;
  }

  const width = window.innerWidth;

  if (width >= 1280 && values.desktop !== undefined) {
    return values.desktop;
  }
  if (width >= 768 && values.tablet !== undefined) {
    return values.tablet;
  }
  if (width < 768 && values.mobile !== undefined) {
    return values.mobile;
  }

  return values.default;
}

// Helper to apply typography styles
export function getTypographyStyle(variant: keyof typeof designTokens.typography.styles) {
  return designTokens.typography.styles[variant];
}

// Helper to create gradient backgrounds
export function getGradientBackground(direction: 'to-br' | 'to-r' | 'to-b' = 'to-br') {
  const { start, middle, end } = designTokens.colors.gradient;
  
  const directions = {
    'to-br': 'linear-gradient(to bottom right',
    'to-r': 'linear-gradient(to right',
    'to-b': 'linear-gradient(to bottom',
  };
  
  return `${directions[direction]}, ${start}, ${middle}, ${end})`;
}

// Helper to create component styles
export function getComponentStyle(
  component: keyof typeof designTokens.components,
  variant: string
) {
  const componentStyles = designTokens.components[component];
  return componentStyles[variant as keyof typeof componentStyles];
}
