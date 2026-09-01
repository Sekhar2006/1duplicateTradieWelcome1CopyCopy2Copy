// Design System Badge Component
import { HTMLAttributes } from 'react';
import { designTokens } from '../tokens';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'gold' | 'blue';
type BadgeSize = 'sm' | 'md' | 'lg';

interface DSBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  dot?: boolean;
}

const { colors, spacing, radius, typography } = designTokens;

const variantStyles = {
  default: {
    bg: colors.surface.tertiary,
    color: colors.text.primary,
  },
  success: {
    bg: `${colors.status.success}20`,
    color: colors.status.success,
  },
  warning: {
    bg: `${colors.status.warning}20`,
    color: colors.status.warning,
  },
  error: {
    bg: `${colors.status.error}20`,
    color: colors.status.error,
  },
  info: {
    bg: `${colors.status.info}20`,
    color: colors.status.info,
  },
  gold: {
    bg: `${colors.accent.gold}20`,
    color: colors.accent.gold,
  },
  blue: {
    bg: `${colors.blue.primary}20`,
    color: colors.blue.primary,
  },
};

const sizeStyles = {
  sm: {
    padding: `${spacing[1]} ${spacing[2]}`,
    fontSize: typography.sizes.xs,
    height: '1.25rem',
  },
  md: {
    padding: `${spacing[1]} ${spacing[3]}`,
    fontSize: typography.sizes.sm,
    height: '1.5rem',
  },
  lg: {
    padding: `${spacing[2]} ${spacing[4]}`,
    fontSize: typography.sizes.base,
    height: '2rem',
  },
};

export function DSBadge({
  variant = 'default',
  size = 'md',
  children,
  dot = false,
  className = '',
  ...props
}: DSBadgeProps) {
  const variantStyle = variantStyles[variant] || variantStyles.default;
  const sizeStyle = sizeStyles[size] || sizeStyles.md;

  // Development warning for invalid variants (safe for browser environment)
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    if (!variantStyles[variant]) {
      console.warn(`DSBadge: Invalid variant "${variant}" provided. Using "default" instead. Valid variants: default, success, warning, error, info, gold, blue`);
    }
  }

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1],
    backgroundColor: variantStyle.bg,
    color: variantStyle.color,
    borderRadius: radius.full,
    fontFamily: typography.fonts.label,
    fontWeight: typography.weights.medium,
    ...sizeStyle,
  };

  const dotStyle: React.CSSProperties = {
    width: '6px',
    height: '6px',
    borderRadius: radius.full,
    backgroundColor: variantStyle.color,
  };

  return (
    <span style={badgeStyle} className={className} {...props}>
      {dot && <span style={dotStyle} />}
      {children}
    </span>
  );
}
