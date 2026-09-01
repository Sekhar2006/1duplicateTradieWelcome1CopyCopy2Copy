// 🎨 TRADIE Design System - Design Tokens
// Foundation for all mobile, web, and desktop screens

// ============================================================================
// 1️⃣ COLORS
// ============================================================================

export const colors = {
  // Primary Gradient
  gradient: {
    start: '#F7FAFC',
    middle: '#E8F4FC',
    end: '#D9F2FF',
  },
  
  // Accent Colors
  accent: {
    gold: '#FFD700',
    goldDark: '#FFC700',
    goldLight: '#FFE55C',
  },
  
  // Deep Blue
  blue: {
    primary: '#003E6D',
    light: '#0066B2',
    dark: '#002847',
  },
  
  // Text Colors
  text: {
    primary: '#191919',
    secondary: '#5A6B7A',
    muted: '#8B9AA8',
    disabled: '#C4CDD5',
    inverse: '#FFFFFF',
  },
  
  // Status Colors
  status: {
    success: '#27AE60',
    successLight: '#6FCF97',
    warning: '#E2B93B',
    warningLight: '#F2C94C',
    error: '#E74C3C',
    errorLight: '#EB5757',
    info: '#2F80ED',
    infoLight: '#56CCF2',
  },
  
  // Surface Colors
  surface: {
    primary: '#FFFFFF',
    secondary: '#F8FAFB',
    tertiary: '#EEF2F6',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Border Colors
  border: {
    light: 'rgba(0, 62, 109, 0.1)',
    default: 'rgba(0, 62, 109, 0.2)',
    dark: 'rgba(0, 62, 109, 0.3)',
    gold: '#FFD700',
  },
  
  // Shadow Colors
  shadow: {
    sm: 'rgba(0, 0, 0, 0.05)',
    md: 'rgba(0, 0, 0, 0.10)',
    lg: 'rgba(0, 0, 0, 0.15)',
    xl: 'rgba(0, 0, 0, 0.20)',
    gold: 'rgba(255, 215, 0, 0.3)',
  },
} as const;

// ============================================================================
// 2️⃣ TYPOGRAPHY
// ============================================================================

export const typography = {
  // Font Families
  fonts: {
    heading: 'Playfair Display, serif',
    subheading: 'Poppins, sans-serif',
    body: 'Inter, sans-serif',
    label: 'Montserrat, sans-serif',
    caption: 'Lato, sans-serif',
    mono: 'Courier New, monospace',
  },
  
  // Font Sizes (rem based)
  sizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    md: '1.125rem',     // 18px
    lg: '1.25rem',      // 20px
    xl: '1.5rem',       // 24px
    '2xl': '1.75rem',   // 28px
    '3xl': '2rem',      // 32px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
  
  // Font Weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  // Line Heights
  lineHeights: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Text Styles (Presets)
  styles: {
    h1: {
      fontFamily: 'Playfair Display, serif',
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '0.5px',
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.3px',
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.2px',
    },
    body: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0',
    },
    bodyLarge: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0',
    },
    bodySmall: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0',
    },
    label: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.5px',
    },
    caption: {
      fontFamily: 'Lato, sans-serif',
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.3px',
    },
    button: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '0.5px',
    },
  },
} as const;

// ============================================================================
// 3️⃣ SPACING
// ============================================================================

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

// ============================================================================
// 4️⃣ SIZING
// ============================================================================

export const sizing = {
  // Icon Sizes
  icon: {
    xs: '1rem',      // 16px
    sm: '1.25rem',   // 20px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '2.5rem',    // 40px
    '2xl': '3rem',   // 48px
  },
  
  // Input Heights
  input: {
    sm: '2rem',      // 32px
    md: '2.5rem',    // 40px
    lg: '3rem',      // 48px
    xl: '3.5rem',    // 56px
  },
  
  // Button Heights
  button: {
    sm: '2rem',      // 32px
    md: '2.5rem',    // 40px
    lg: '3rem',      // 48px
    xl: '3.5rem',    // 56px
  },
} as const;

// ============================================================================
// 5️⃣ BORDER RADIUS
// ============================================================================

export const radius = {
  none: '0',
  sm: '0.375rem',   // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  '3xl': '2rem',    // 32px
  full: '9999px',
} as const;

// ============================================================================
// 6️⃣ SHADOWS
// ============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  gold: '0 10px 30px -5px rgba(255, 215, 0, 0.3)',
  goldLg: '0 20px 40px -10px rgba(255, 215, 0, 0.4)',
} as const;

// ============================================================================
// 7️⃣ BREAKPOINTS
// ============================================================================

export const breakpoints = {
  mobile: '320px',
  mobileLg: '480px',
  tablet: '768px',
  tabletLg: '1024px',
  desktop: '1280px',
  desktopLg: '1440px',
  wide: '1920px',
} as const;

// ============================================================================
// 8️⃣ Z-INDEX
// ============================================================================

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const;

// ============================================================================
// 9️⃣ ANIMATIONS & MOTION
// ============================================================================

export const animations = {
  // Duration
  duration: {
    instant: '50ms',
    fast: '100ms',
    normal: '250ms',
    slow: '400ms',
    slower: '600ms',
    slowest: '1000ms',
  },
  
  // Timing Functions (Easing) - Motion library format
  easing: {
    linear: 'linear' as const,
    easeIn: [0.4, 0, 1, 1] as const,
    easeOut: [0, 0, 0.2, 1] as const,
    easeInOut: [0.4, 0, 0.2, 1] as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
    spring: [0.175, 0.885, 0.32, 1.275] as const,
    smooth: [0.25, 0.46, 0.45, 0.94] as const,
  },
  
  // Common Transitions
  transition: {
    all: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'background-color 250ms, border-color 250ms, color 250ms',
    transform: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Motion Presets (for Framer Motion)
  motion: {
    // Button interactions
    button: {
      hover: { scale: 1.02, y: -2, transition: { duration: 0.15 } },
      tap: { scale: 0.96, transition: { duration: 0.1 } },
      release: { 
        scale: [0.96, 1.04, 1], 
        transition: { duration: 0.3, times: [0, 0.5, 1] }
      },
    },
    
    // Pop-in animation (for OTP digits, modals)
    popIn: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.3
      }
    },
    
    // Fade animations
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.25 }
    },
    
    // Slide animations
    slideLeft: {
      initial: { x: '20%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-20%', opacity: 0 },
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    },
    
    slideUp: {
      initial: { y: '20%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '-20%', opacity: 0 },
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    },
    
    // Bounce animation
    bounce: {
      animate: {
        y: [0, -10, 0],
        transition: {
          duration: 0.6,
          ease: 'easeInOut',
        }
      }
    },
    
    // Pulse/glow animation
    pulse: {
      animate: {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }
      }
    },
    
    // Shimmer loading
    shimmer: {
      animate: {
        x: ['-100%', '100%'],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }
      }
    },
    
    // Count-up number animation
    countUp: {
      transition: {
        duration: 1,
        ease: 'easeOut',
      }
    },
    
    // Confetti particles
    confetti: {
      animate: {
        y: [0, -30, 0],
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        transition: {
          duration: 2,
          ease: 'easeInOut',
        }
      }
    },
  },
  
  // Glow effects
  glow: {
    gold: {
      boxShadow: '0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2)',
      filter: 'brightness(1.1)',
    },
    goldSubtle: {
      boxShadow: '0 0 12px rgba(255, 215, 0, 0.25)',
    },
    blue: {
      boxShadow: '0 0 20px rgba(0, 62, 109, 0.3)',
    },
  },
  
  // Stagger children animations
  stagger: {
    container: {
      animate: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        }
      }
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    }
  },
} as const;

// ============================================================================
// 🔟 COMPONENT TOKENS
// ============================================================================

export const components = {
  // Button Variants
  button: {
    primary: {
      bg: colors.accent.gold,
      bgHover: colors.accent.goldDark,
      color: '#FFFFFF',
      border: 'none',
      shadow: shadows.md,
      shadowHover: shadows.gold,
    },
    secondary: {
      bg: 'rgba(0, 0, 0, 0)',
      bgHover: `${colors.accent.gold}15`,
      color: colors.blue.primary,
      border: `2px solid ${colors.accent.gold}`,
      shadow: shadows.none,
      shadowHover: shadows.sm,
    },
    outline: {
      bg: 'rgba(0, 0, 0, 0)',
      bgHover: `${colors.accent.gold}15`,
      color: colors.blue.primary,
      border: `2px solid ${colors.accent.gold}`,
      shadow: shadows.none,
      shadowHover: shadows.sm,
    },
    ghost: {
      bg: 'rgba(0, 0, 0, 0)',
      bgHover: `${colors.blue.primary}08`,
      color: colors.text.secondary,
      border: 'none',
      shadow: shadows.none,
      shadowHover: shadows.none,
    },
    disabled: {
      bg: colors.surface.tertiary,
      color: colors.text.disabled,
      border: 'none',
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
  
  // Input Variants
  input: {
    default: {
      bg: colors.surface.primary,
      border: `2px solid ${colors.border.default}`,
      borderFocus: `2px solid ${colors.accent.gold}`,
      color: colors.text.primary,
      placeholder: colors.text.muted,
    },
    error: {
      bg: `${colors.status.error}08`,
      border: `2px solid ${colors.status.error}`,
      borderFocus: `2px solid ${colors.status.error}`,
      color: colors.text.primary,
    },
    disabled: {
      bg: colors.surface.tertiary,
      border: `2px solid ${colors.border.light}`,
      color: colors.text.disabled,
      cursor: 'not-allowed',
    },
  },
  
  // Card Variants
  card: {
    default: {
      bg: colors.surface.primary,
      border: `1px solid ${colors.border.light}`,
      shadow: shadows.md,
      radius: radius['2xl'],
    },
    elevated: {
      bg: colors.surface.primary,
      border: 'none',
      shadow: shadows.lg,
      radius: radius['2xl'],
    },
    gold: {
      bg: colors.surface.primary,
      border: `2px solid ${colors.accent.gold}`,
      shadow: shadows.gold,
      radius: radius['2xl'],
    },
  },
  
  // Alert Variants
  alert: {
    success: {
      bg: `${colors.status.success}15`,
      border: `1px solid ${colors.status.success}`,
      color: colors.status.success,
      icon: colors.status.success,
    },
    warning: {
      bg: `${colors.status.warning}15`,
      border: `1px solid ${colors.status.warning}`,
      color: colors.status.warning,
      icon: colors.status.warning,
    },
    error: {
      bg: `${colors.status.error}15`,
      border: `1px solid ${colors.status.error}`,
      color: colors.status.error,
      icon: colors.status.error,
    },
    info: {
      bg: `${colors.status.info}15`,
      border: `1px solid ${colors.status.info}`,
      color: colors.status.info,
      icon: colors.status.info,
    },
  },
} as const;

// ============================================================================
// Export All Tokens
// ============================================================================

export const designTokens = {
  colors,
  typography,
  spacing,
  sizing,
  radius,
  shadows,
  breakpoints,
  zIndex,
  animations,
  components,
} as const;

export default designTokens;