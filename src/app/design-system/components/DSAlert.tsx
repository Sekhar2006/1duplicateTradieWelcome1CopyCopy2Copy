// Design System Alert Component
import { HTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { designTokens } from '../tokens';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

type AlertVariant = 'success' | 'warning' | 'error' | 'info';

interface DSAlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const { colors, spacing, radius, typography, components, animations } = designTokens;

const icons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

export function DSAlert({
  variant = 'info',
  title,
  description,
  dismissible = false,
  onDismiss,
  icon,
  children,
  className = '',
  ...props
}: DSAlertProps) {
  const variantStyle = components.alert[variant];
  const Icon = icons[variant];

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    gap: spacing[3],
    padding: spacing[4],
    backgroundColor: variantStyle.bg,
    border: variantStyle.border,
    borderRadius: radius.lg,
    color: variantStyle.color,
  };

  const iconStyle: React.CSSProperties = {
    flexShrink: 0,
    marginTop: spacing[1],
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: typography.fonts.subheading,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: variantStyle.color,
    margin: 0,
  };

  const descriptionStyle: React.CSSProperties = {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    margin: 0,
  };

  const dismissButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: spacing[3],
    right: spacing[3],
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: spacing[1],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    transition: animations.transition.all,
    color: variantStyle.color,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={containerStyle}
      className={className}
      {...props}
    >
      <div style={iconStyle}>
        {icon || <Icon size={20} />}
      </div>
      
      <div style={contentStyle}>
        {title && <h4 style={titleStyle}>{title}</h4>}
        {description && <p style={descriptionStyle}>{description}</p>}
        {children}
      </div>
      
      {dismissible && (
        <button
          style={dismissButtonStyle}
          onClick={onDismiss}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${variantStyle.color}15`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </button>
      )}
    </motion.div>
  );
}
