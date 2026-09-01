import React from 'react';
import { 
  Home, ShoppingCart, Package, Wallet, User, 
  Mic, Globe, Bell, ChevronLeft, HelpCircle,
  Camera, Share2, FileDown
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

// Mid-fi agritech color palette (soft greens/blues with gradients)
export const wireframeColors = {
  // Backgrounds
  bg: '#F0F9F4', // Soft green tint
  bgBlue: '#F0F7FC', // Soft blue tint
  surface: '#FFFFFF',
  
  // Gradients
  gradientGreen: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
  gradientBlue: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
  gradientPrimary: 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)',
  gradientAccent: 'linear-gradient(135deg, #42A5F5 0%, #2196F3 100%)',
  
  // Borders
  border: '#D4E7D7',
  borderBlue: '#CFE2F3',
  
  // Text
  text: '#2C3E2C',
  textLight: '#5A6B5A',
  textMuted: '#8FA18F',
  
  // Primary colors
  primary: '#4CAF50',
  primaryDark: '#388E3C',
  primaryLight: '#81C784',
  
  // Accent colors
  accent: '#2196F3',
  accentDark: '#1976D2',
  accentLight: '#64B5F6',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FFA726',
  error: '#EF5350',
  info: '#29B6F6',
  
  // Shadows
  shadowSm: '0 1px 3px rgba(76, 175, 80, 0.12)',
  shadowMd: '0 4px 6px rgba(76, 175, 80, 0.15)',
  shadowLg: '0 10px 15px rgba(76, 175, 80, 0.2)',
};

// Top Bar Component
interface TopBarProps {
  title?: string;
  role?: 'Producer' | 'Trader' | 'Buyer' | 'Commission Agent';
  onLanguageClick?: () => void;
  onVoiceClick?: () => void;
  onNotificationClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  title = 'TRADIE',
  role,
  onLanguageClick,
  onVoiceClick,
  onNotificationClick
}) => {
  return (
    <div 
      className="px-4 py-4 flex items-center justify-between shadow-sm"
      style={{ 
        background: wireframeColors.gradientGreen,
        borderBottom: `2px solid ${wireframeColors.border}`
      }}
    >
      <div className="flex items-center gap-3">
        <h1 
          className="font-semibold text-lg"
          style={{ color: wireframeColors.text }}
        >{title}</h1>
        {role && (
          <Badge 
            variant="outline" 
            className="border-2"
            style={{ 
              backgroundColor: wireframeColors.surface,
              color: wireframeColors.primary,
              borderColor: wireframeColors.primary
            }}
          >
            {role}
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onLanguageClick}
          className="p-2.5 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          style={{ 
            backgroundColor: wireframeColors.surface,
            boxShadow: wireframeColors.shadowSm
          }}
          aria-label="Change Language"
        >
          <Globe className="w-5 h-5" style={{ color: wireframeColors.primary }} />
        </button>
        <button
          onClick={onVoiceClick}
          className="p-2.5 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          style={{ 
            backgroundColor: wireframeColors.surface,
            boxShadow: wireframeColors.shadowSm
          }}
          aria-label="Voice Help"
        >
          <Mic className="w-5 h-5" style={{ color: wireframeColors.accent }} />
        </button>
        <button
          onClick={onNotificationClick}
          className="p-2.5 rounded-lg relative transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          style={{ 
            backgroundColor: wireframeColors.surface,
            boxShadow: wireframeColors.shadowSm
          }}
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" style={{ color: wireframeColors.text }} />
          <span 
            className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: wireframeColors.error }}
          />
        </button>
      </div>
    </div>
  );
};

// Bottom Navigation Component
interface BottomNavProps {
  activeTab?: 'home' | 'trade' | 'services' | 'wallet' | 'profile';
  onTabChange?: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  activeTab = 'home',
  onTabChange
}) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'trade', icon: ShoppingCart, label: 'Trade' },
    { id: 'services', icon: Package, label: 'Services' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div 
      className="px-2 py-2.5 grid grid-cols-5 gap-1.5 shadow-lg"
      style={{ 
        backgroundColor: wireframeColors.surface,
        borderTop: `2px solid ${wireframeColors.border}`
      }}
    >
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onTabChange?.(id)}
          className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all min-h-[48px]"
          style={activeTab === id 
            ? { 
                background: wireframeColors.gradientPrimary,
                color: wireframeColors.surface,
                boxShadow: wireframeColors.shadowMd
              } 
            : {
                color: wireframeColors.textMuted,
                backgroundColor: 'transparent'
              }
          }
        >
          <Icon className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

// OTP Modal Component
interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
  title?: string;
  description?: string;
}

export const OTPModal: React.FC<OTPModalProps> = ({ 
  isOpen,
  onClose,
  onSubmit,
  title = 'Enter OTP',
  description = 'Please enter the 6-digit code sent to your mobile'
}) => {
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    onSubmit(otp.join(''));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div 
        className="rounded-2xl p-8 max-w-md w-full"
        style={{
          background: wireframeColors.gradientGreen,
          boxShadow: wireframeColors.shadowLg,
          border: `3px solid ${wireframeColors.border}`
        }}
      >
        <h2 
          className="text-2xl font-bold mb-3"
          style={{ color: wireframeColors.text }}
        >{title}</h2>
        <p 
          className="text-base mb-8"
          style={{ color: wireframeColors.textLight }}
        >{description}</p>
        
        <div className="flex gap-2.5 justify-center mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center border-3 rounded-xl focus:outline-none text-2xl font-bold transition-all"
              style={{
                borderColor: digit ? wireframeColors.primary : wireframeColors.border,
                backgroundColor: wireframeColors.surface,
                color: wireframeColors.text,
                boxShadow: digit ? wireframeColors.shadowMd : wireframeColors.shadowSm
              }}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <PrimaryButton
            onClick={onClose}
            variant="outline"
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton
            onClick={handleSubmit}
            disabled={otp.some(d => !d)}
          >
            Verify
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// Action Card Component
interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({ 
  icon,
  title,
  subtitle,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="rounded-xl p-5 flex flex-col items-center justify-center text-center transition-all min-h-[140px] active:scale-95"
      style={{
        backgroundColor: wireframeColors.surface,
        border: `2px solid ${wireframeColors.border}`,
        boxShadow: wireframeColors.shadowMd
      }}
    >
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
        style={{
          background: wireframeColors.gradientGreen,
          boxShadow: wireframeColors.shadowSm
        }}
      >
        {icon}
      </div>
      <h3 
        className="font-semibold mb-1 text-base"
        style={{ color: wireframeColors.text }}
      >{title}</h3>
      {subtitle && (
        <p 
          className="text-sm"
          style={{ color: wireframeColors.textMuted }}
        >{subtitle}</p>
      )}
    </button>
  );
};

// Primary Button
interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children,
  onClick,
  disabled = false,
  fullWidth = true,
  variant = 'primary'
}) => {
  const baseClasses = "h-14 font-semibold rounded-xl transition-all min-h-[52px] text-base active:scale-95";
  
  const getVariantStyle = () => {
    if (disabled) {
      return {
        backgroundColor: '#E0E0E0',
        color: '#9E9E9E',
        boxShadow: 'none',
        cursor: 'not-allowed'
      };
    }
    
    switch (variant) {
      case 'primary':
        return {
          background: wireframeColors.gradientPrimary,
          color: wireframeColors.surface,
          boxShadow: wireframeColors.shadowMd,
          border: 'none'
        };
      case 'secondary':
        return {
          background: wireframeColors.gradientBlue,
          color: wireframeColors.text,
          boxShadow: wireframeColors.shadowSm,
          border: 'none'
        };
      case 'outline':
        return {
          backgroundColor: wireframeColors.surface,
          color: wireframeColors.primary,
          boxShadow: wireframeColors.shadowSm,
          border: `2px solid ${wireframeColors.primary}`
        };
      default:
        return {};
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${fullWidth ? 'w-full' : 'px-8'}`}
      style={getVariantStyle()}
    >
      {children}
    </button>
  );
};

// Form Field Component
interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  hint,
  error,
  value,
  onChange,
  required = false
}) => {
  return (
    <div className="mb-5">
      <label 
        className="block text-base font-semibold mb-2"
        style={{ color: wireframeColors.text }}
      >
        {label} {required && <span style={{ color: wireframeColors.error }}>*</span>}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-14 border-2 rounded-xl text-base font-medium"
        style={{
          borderColor: error ? wireframeColors.error : wireframeColors.border,
          backgroundColor: wireframeColors.surface,
          color: wireframeColors.text,
          boxShadow: wireframeColors.shadowSm
        }}
      />
      {hint && !error && (
        <p 
          className="text-sm mt-2"
          style={{ color: wireframeColors.textMuted }}
        >{hint}</p>
      )}
      {error && (
        <p 
          className="text-sm mt-2 font-medium"
          style={{ color: wireframeColors.error }}
        >{error}</p>
      )}
    </div>
  );
};

// Empty State Component
interface EmptyStateProps {
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  actionText,
  onAction
}) => {
  return (
    <div 
      className="border-2 border-dashed rounded-2xl p-8 text-center"
      style={{
        backgroundColor: wireframeColors.bg,
        borderColor: wireframeColors.border
      }}
    >
      <p 
        className="text-base font-medium mb-5"
        style={{ color: wireframeColors.textLight }}
      >{message}</p>
      {actionText && (
        <PrimaryButton onClick={onAction} fullWidth={false}>
          {actionText}
        </PrimaryButton>
      )}
    </div>
  );
};

// Status Chip Component
interface StatusChipProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
}

export const StatusChip: React.FC<StatusChipProps> = ({
  label,
  variant = 'default'
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'success':
        return {
          background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
          color: '#2E7D32',
          borderColor: '#81C784'
        };
      case 'warning':
        return {
          background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
          color: '#E65100',
          borderColor: '#FFB74D'
        };
      case 'error':
        return {
          background: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)',
          color: '#C62828',
          borderColor: '#E57373'
        };
      case 'info':
        return {
          background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
          color: '#1565C0',
          borderColor: '#64B5F6'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)',
          color: '#424242',
          borderColor: '#BDBDBD'
        };
    }
  };

  return (
    <span 
      className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border-2"
      style={getVariantStyle()}
    >
      {label}
    </span>
  );
};

// Quick Action Buttons
export const QuickActions: React.FC = () => {
  return (
    <div className="flex gap-2 justify-center py-2">
      <button className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors min-h-[44px] min-w-[44px]">
        <Camera className="w-5 h-5 text-gray-700" />
      </button>
      <button className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors min-h-[44px] min-w-[44px]">
        <Share2 className="w-5 h-5 text-gray-700" />
      </button>
      <button className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors min-h-[44px] min-w-[44px]">
        <FileDown className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};

// Header with Back Button
interface HeaderProps {
  title: string;
  onBack?: () => void;
  onHelp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  onHelp
}) => {
  return (
    <div 
      className="flex items-center justify-between px-4 py-4 shadow-sm"
      style={{
        background: wireframeColors.gradientBlue,
        borderBottom: `2px solid ${wireframeColors.borderBlue}`
      }}
    >
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl transition-all min-h-[48px] min-w-[48px] flex items-center justify-center active:scale-95"
            style={{
              backgroundColor: wireframeColors.surface,
              boxShadow: wireframeColors.shadowSm
            }}
          >
            <ChevronLeft className="w-6 h-6" style={{ color: wireframeColors.primary }} />
          </button>
        )}
        <h1 
          className="font-bold text-xl"
          style={{ color: wireframeColors.text }}
        >{title}</h1>
      </div>
      {onHelp && (
        <button
          onClick={onHelp}
          className="p-2.5 rounded-xl transition-all min-h-[48px] min-w-[48px] flex items-center justify-center active:scale-95"
          style={{
            backgroundColor: wireframeColors.surface,
            boxShadow: wireframeColors.shadowSm
          }}
        >
          <HelpCircle className="w-6 h-6" style={{ color: wireframeColors.accent }} />
        </button>
      )}
    </div>
  );
};

// KPI Card Component
interface KPICardProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  trend,
  icon
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return wireframeColors.success;
      case 'down':
        return wireframeColors.error;
      default:
        return wireframeColors.text;
    }
  };

  return (
    <div 
      className="rounded-xl p-5"
      style={{
        background: wireframeColors.gradientBlue,
        border: `2px solid ${wireframeColors.borderBlue}`,
        boxShadow: wireframeColors.shadowMd
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <p 
          className="text-sm font-medium"
          style={{ color: wireframeColors.textLight }}
        >{label}</p>
        {icon && (
          <div 
            className="p-2 rounded-lg"
            style={{ 
              backgroundColor: wireframeColors.surface,
              color: wireframeColors.accent
            }}
          >{icon}</div>
        )}
      </div>
      <p 
        className="text-3xl font-bold"
        style={{ color: getTrendColor() }}
      >
        {value}
      </p>
    </div>
  );
};
