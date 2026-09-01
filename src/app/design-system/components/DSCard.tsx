// Design System Card Component
import { HTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { designTokens } from '../tokens';

type CardVariant = 'default' | 'elevated' | 'gold';
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface DSCardProps extends Omit<HTMLMotionProps<'div'>, 'style'> {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  children?: React.ReactNode;
}

const { colors, spacing, components, animations } = designTokens;

const paddingStyles = {
  none: '0',
  sm: spacing[4],
  md: spacing[6],
  lg: spacing[8],
  xl: spacing[10],
};

export function DSCard({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  children,
  className = '',
  ...props
}: DSCardProps) {
  const variantStyle = components.card[variant];

  const baseStyle: React.CSSProperties = {
    backgroundColor: variantStyle.bg,
    border: variantStyle.border,
    borderRadius: variantStyle.radius,
    boxShadow: variantStyle.shadow,
    padding: paddingStyles[padding],
    transition: animations.transition.all,
    overflow: 'hidden',
  };

  return (
    <motion.div
      style={baseStyle}
      className={className}
      whileHover={hoverable ? {
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
      } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Card Header Component
interface DSCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DSCardHeader({ children, className = '' }: DSCardHeaderProps) {
  const style: React.CSSProperties = {
    marginBottom: spacing[4],
    paddingBottom: spacing[4],
    borderBottom: `1px solid ${colors.border.light}`,
  };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}

// Card Title Component
interface DSCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function DSCardTitle({ children, className = '' }: DSCardTitleProps) {
  const { typography, colors } = designTokens;
  
  const style: React.CSSProperties = {
    ...typography.styles.h3,
    color: colors.blue.primary,
    margin: 0,
  };

  return (
    <h3 style={style} className={className}>
      {children}
    </h3>
  );
}

// Card Description Component
interface DSCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function DSCardDescription({ children, className = '' }: DSCardDescriptionProps) {
  const { typography, colors } = designTokens;
  
  const style: React.CSSProperties = {
    ...typography.styles.bodySmall,
    color: colors.text.secondary,
    margin: 0,
    marginTop: spacing[2],
  };

  return (
    <p style={style} className={className}>
      {children}
    </p>
  );
}

// Card Content Component
interface DSCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DSCardContent({ children, className = '' }: DSCardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Card Footer Component
interface DSCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function DSCardFooter({ children, className = '' }: DSCardFooterProps) {
  const style: React.CSSProperties = {
    marginTop: spacing[4],
    paddingTop: spacing[4],
    borderTop: `1px solid ${colors.border.light}`,
    display: 'flex',
    gap: spacing[3],
    alignItems: 'center',
  };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}
