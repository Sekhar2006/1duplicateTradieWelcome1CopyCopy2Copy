// Design System Button Component
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { motion } from 'motion/react';
import { designTokens } from '../tokens';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface DSButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const { colors, spacing, radius, typography, components, animations } = designTokens;

const sizeStyles = {
  sm: {
    height: '2rem',
    padding: `${spacing[2]} ${spacing[4]}`,
    fontSize: typography.sizes.sm,
  },
  md: {
    height: '2.5rem',
    padding: `${spacing[3]} ${spacing[5]}`,
    fontSize: typography.sizes.base,
  },
  lg: {
    height: '3rem',
    padding: `${spacing[4]} ${spacing[6]}`,
    fontSize: typography.sizes.md,
  },
  xl: {
    height: '3.5rem',
    padding: `${spacing[5]} ${spacing[8]}`,
    fontSize: typography.sizes.lg,
  },
};

export const DSButton = forwardRef<HTMLButtonElement, DSButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      icon,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // Ensure variant exists in components.button, fallback to primary
    const buttonVariants = components.button as Record<string, any>;
    const variantStyle = buttonVariants[variant] || buttonVariants.primary;
    const sizeStyle = sizeStyles[size];
    const isDisabled = disabled || isLoading;

    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing[2],
      fontFamily: typography.styles.button.fontFamily,
      fontWeight: typography.styles.button.fontWeight,
      letterSpacing: typography.styles.button.letterSpacing,
      borderRadius: radius.xl,
      transition: `all ${animations.duration.normal} ${animations.easing.easeInOut}`,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      border: variantStyle.border,
      opacity: isDisabled ? 0.5 : 1,
      width: fullWidth ? '100%' : 'auto',
      boxShadow: variantStyle.shadow,
      position: 'relative',
      overflow: 'hidden',
      ...sizeStyle,
      ...(isDisabled
        ? {
            backgroundColor: components.button.disabled.bg,
            color: components.button.disabled.color,
          }
        : {
            backgroundColor: variantStyle.bg,
            color: variantStyle.color,
          }),
    };

    // Enhanced animation variants
    const hoverVariant = !isDisabled ? {
      scale: 1.02,
      y: -2,
      boxShadow: variant === 'primary' 
        ? animations.glow.goldSubtle.boxShadow
        : variantStyle.shadowHover,
      backgroundColor: variantStyle.bgHover,
      transition: {
        duration: 0.15,
        ease: animations.easing.easeOut,
      }
    } : {};

    const tapVariant = !isDisabled ? {
      scale: 0.96,
      y: 0,
      transition: {
        duration: 0.1,
        ease: animations.easing.easeIn,
      }
    } : {};

    return (
      <motion.button
        ref={ref}
        style={baseStyle}
        className={className}
        disabled={isDisabled}
        whileHover={hoverVariant}
        whileTap={tapVariant}
        initial={{ scale: 1 }}
        {...props}
      >
        {isLoading && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'flex' }}
          >
            <Loader2 style={{ width: '1rem', height: '1rem' }} />
          </motion.span>
        )}
        {!isLoading && (leftIcon || icon) && (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {leftIcon || icon}
          </span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {rightIcon}
          </span>
        )}
      </motion.button>
    );
  }
);

DSButton.displayName = 'DSButton';