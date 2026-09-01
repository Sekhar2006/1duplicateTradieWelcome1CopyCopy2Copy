// Design System Input Component
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { designTokens } from '../tokens';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

type InputVariant = 'default' | 'error';
type InputSize = 'sm' | 'md' | 'lg' | 'xl';

interface DSInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

const { colors, spacing, radius, typography, components, animations } = designTokens;

const sizeStyles = {
  sm: {
    height: '2rem',
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: typography.sizes.sm,
  },
  md: {
    height: '2.5rem',
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: typography.sizes.base,
  },
  lg: {
    height: '3rem',
    padding: `${spacing[4]} ${spacing[5]}`,
    fontSize: typography.sizes.md,
  },
  xl: {
    height: '3.5rem',
    padding: `${spacing[4]} ${spacing[6]}`,
    fontSize: typography.sizes.lg,
  },
};

export const DSInput = forwardRef<HTMLInputElement, DSInputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      label,
      helperText,
      errorText,
      leftIcon,
      rightIcon,
      showPasswordToggle = false,
      type = 'text',
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const hasError = variant === 'error' || !!errorText;
    const variantStyle = hasError ? components.input.error : 
                        disabled ? components.input.disabled : 
                        components.input.default;
    const sizeStyle = sizeStyles[size];
    
    const isPasswordField = type === 'password' && showPasswordToggle;
    const inputType = isPasswordField && showPassword ? 'text' : type;

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[2],
      width: '100%',
    };

    const labelStyle: React.CSSProperties = {
      fontFamily: typography.fonts.label,
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
      color: colors.blue.primary,
      letterSpacing: typography.letterSpacing.wide,
    };

    const inputWrapperStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    };

    const inputStyle: React.CSSProperties = {
      width: '100%',
      fontFamily: typography.fonts.body,
      backgroundColor: variantStyle.bg,
      border: isFocused ? variantStyle.borderFocus : variantStyle.border,
      borderRadius: radius.xl,
      color: variantStyle.color,
      outline: 'none',
      transition: animations.transition.all,
      ...sizeStyle,
      paddingLeft: leftIcon ? `calc(${sizeStyle.padding} + 2rem)` : sizeStyle.padding,
      paddingRight: (rightIcon || isPasswordField) ? `calc(${sizeStyle.padding} + 2rem)` : sizeStyle.padding,
    };

    const iconStyle: React.CSSProperties = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      color: colors.text.muted,
    };

    const leftIconStyle: React.CSSProperties = {
      ...iconStyle,
      left: spacing[3],
    };

    const rightIconStyle: React.CSSProperties = {
      ...iconStyle,
      right: spacing[3],
      pointerEvents: isPasswordField ? 'auto' : 'none',
      cursor: isPasswordField ? 'pointer' : 'default',
    };

    const helperStyle: React.CSSProperties = {
      fontFamily: typography.fonts.body,
      fontSize: typography.sizes.sm,
      color: hasError ? colors.status.error : colors.text.muted,
      display: 'flex',
      alignItems: 'center',
      gap: spacing[1],
    };

    return (
      <div style={containerStyle} className={className}>
        {label && (
          <label style={labelStyle}>
            {label}
          </label>
        )}
        
        <div style={inputWrapperStyle}>
          {leftIcon && (
            <span style={leftIconStyle}>
              {leftIcon}
            </span>
          )}
          
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            style={inputStyle}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          {(rightIcon || isPasswordField) && (
            <span 
              style={rightIconStyle}
              onClick={isPasswordField ? () => setShowPassword(!showPassword) : undefined}
            >
              {isPasswordField ? (
                showPassword ? <EyeOff size={20} /> : <Eye size={20} />
              ) : (
                rightIcon
              )}
            </span>
          )}
        </div>
        
        {(helperText || errorText) && (
          <span style={helperStyle}>
            {hasError && <AlertCircle size={14} />}
            {errorText || helperText}
          </span>
        )}
      </div>
    );
  }
);

DSInput.displayName = 'DSInput';
