import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from './utils';

// ==================== INTERFACES ====================

interface BeautifulButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'gradient' | 'gold' | 'cyber';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  pulse?: boolean;
  glow?: boolean;
  shimmer?: boolean;
  children: React.ReactNode;
}

// ==================== BUTTON COMPONENT ====================

export const BeautifulButton: React.FC<BeautifulButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  pulse = false,
  glow = false,
  shimmer = false,
  className,
  children,
  disabled,
  ...props
}) => {
  
  // Variant Styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/50',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/50',
    warning: 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg shadow-orange-500/50',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg shadow-red-500/50',
    info: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/50',
    purple: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/50',
    gradient: 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/50',
    gold: 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-lg shadow-yellow-500/50',
    cyber: 'bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 hover:from-teal-500 hover:via-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/50'
  };

  // Size Styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
    xl: 'px-10 py-5 text-xl rounded-2xl'
  };

  // Icon Size
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  return (
    <button
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center gap-2',
        'font-semibold transition-all duration-300 ease-out',
        'transform hover:scale-105 active:scale-95',
        'focus:outline-none focus:ring-4 focus:ring-offset-2',
        
        // Variant & Size
        variantStyles[variant],
        sizeStyles[size],
        
        // Full width
        fullWidth && 'w-full',
        
        // Pulse animation
        pulse && 'animate-pulse',
        
        // Glow effect
        glow && 'after:absolute after:inset-0 after:rounded-[inherit] after:animate-pulse after:bg-white/20',
        
        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
        
        // Custom className
        className
      )}
      disabled={disabled}
      {...props}
    >
      {/* Shimmer effect */}
      {shimmer && !disabled && (
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
          <div className="absolute inset-0 translate-x-[-100%] animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      )}
      
      {/* Icon Left */}
      {Icon && iconPosition === 'left' && (
        <Icon className={iconSizes[size]} />
      )}
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
      
      {/* Icon Right */}
      {Icon && iconPosition === 'right' && (
        <Icon className={iconSizes[size]} />
      )}
    </button>
  );
};

// ==================== ICON BUTTON ====================

interface IconButtonProps extends Omit<BeautifulButtonProps, 'children'> {
  icon: LucideIcon;
  label?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  label,
  size = 'md',
  variant = 'primary',
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
    xl: 'p-5'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center',
        'rounded-full transition-all duration-300 ease-out',
        'transform hover:scale-110 active:scale-95',
        'focus:outline-none focus:ring-4 focus:ring-offset-2',
        sizeClasses[size],
        variant === 'primary' && 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50',
        variant === 'success' && 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/50',
        variant === 'warning' && 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/50',
        variant === 'danger' && 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/50',
        variant === 'gold' && 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/50',
        className
      )}
      title={label}
      {...props}
    >
      <Icon className={iconSizes[size]} />
    </button>
  );
};

// ==================== FLOATING ACTION BUTTON ====================

interface FABProps extends Omit<BeautifulButtonProps, 'children'> {
  icon: LucideIcon;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export const FloatingActionButton: React.FC<FABProps> = ({
  icon: Icon,
  position = 'bottom-right',
  variant = 'primary',
  size = 'lg',
  ...props
}) => {
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6'
  };

  return (
    <div className={positionClasses[position]}>
      <IconButton
        icon={Icon}
        variant={variant}
        size={size}
        className="shadow-2xl"
        {...props}
      />
    </div>
  );
};

// ==================== BUTTON GROUP ====================

interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  className
}) => {
  return (
    <div
      className={cn(
        'inline-flex',
        orientation === 'horizontal' ? 'flex-row gap-3' : 'flex-col gap-2',
        className
      )}
    >
      {children}
    </div>
  );
};

// ==================== SOCIAL BUTTONS ====================

export const SocialButton: React.FC<{
  platform: 'google' | 'facebook' | 'twitter' | 'apple';
  onClick?: () => void;
  fullWidth?: boolean;
}> = ({ platform, onClick, fullWidth }) => {
  const configs = {
    google: {
      bg: 'bg-white hover:bg-gray-50 border-2 border-gray-300',
      text: 'text-gray-700',
      icon: '🔍',
      label: 'Continue with Google'
    },
    facebook: {
      bg: 'bg-gradient-to-r from-blue-600 to-blue-700',
      text: 'text-white',
      icon: '📘',
      label: 'Continue with Facebook'
    },
    twitter: {
      bg: 'bg-gradient-to-r from-sky-500 to-blue-600',
      text: 'text-white',
      icon: '🐦',
      label: 'Continue with Twitter'
    },
    apple: {
      bg: 'bg-gradient-to-r from-gray-900 to-black',
      text: 'text-white',
      icon: '🍎',
      label: 'Continue with Apple'
    }
  };

  const config = configs[platform];

  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl',
        'font-semibold transition-all duration-300',
        'transform hover:scale-105 active:scale-95',
        'shadow-lg',
        config.bg,
        config.text,
        fullWidth && 'w-full'
      )}
    >
      <span className="text-xl">{config.icon}</span>
      <span>{config.label}</span>
    </button>
  );
};

// ==================== CSS for shimmer animation ====================
// Add to globals.css:
/*
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
*/
