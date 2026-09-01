import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ProgressIndicator } from "./ProgressIndicator";
import { CaptchaVerification } from "./CaptchaVerification";
import { DSButton, DSInput, designTokens } from "../design-system";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface SignUpScreenProps {
  onGetOTP: (data: { fullName: string; mobile: string; email: string }) => void;
  onBackToWelcome: () => void;
  onNavigateToLogin: () => void;
  countryCode: string;
  selectedLanguage: string;
}

const { colors, typography, spacing, radius, shadows } = designTokens;

export function SignUpScreen({ 
  onGetOTP, 
  onBackToWelcome, 
  onNavigateToLogin, 
  countryCode,
  selectedLanguage 
}: SignUpScreenProps) {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; mobile?: string }>({});

  const validateForm = () => {
    const newErrors: { fullName?: string; mobile?: string } = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm() && isCaptchaVerified) {
      onGetOTP({ fullName, mobile, email });
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})`,
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: `${colors.accent.gold}10` }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" style={{ backgroundColor: `${colors.blue.primary}10` }}></div>
      
      {/* Back Button */}
      <button
        onClick={onBackToWelcome}
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 backdrop-blur-sm p-3 rounded-full border transition-all hover:scale-110 active:scale-95 group"
        style={{
          backgroundColor: `${colors.surface.primary}90`,
          boxShadow: shadows.lg,
          borderColor: `${colors.surface.primary}50`,
        }}
        aria-label="Back to welcome screen"
      >
        <ArrowLeft 
          className="w-5 h-5 md:w-6 md:h-6 transition-colors" 
          style={{ color: colors.blue.primary }}
        />
      </button>
      
      {/* Progress Indicator */}
      <ProgressIndicator 
        currentStep={0} 
        totalSteps={4}
        labels={['Sign Up', 'Verify', 'Bonus', 'Refer']}
      />
      
      {/* Main Container */}
      <div className="w-full max-w-[480px] md:max-w-[600px] lg:max-w-[700px] relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl opacity-30 scale-110" style={{ backgroundColor: colors.accent.gold }}></div>
              <div className="absolute inset-0 blur-xl opacity-20 scale-105" style={{ backgroundColor: colors.blue.primary }}></div>
              <img 
                src={tradieLogo} 
                alt="TRADIE Logo" 
                className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Title */}
          <h1 
            className="mb-3 text-2xl md:text-3xl lg:text-4xl" 
            style={{ 
              ...typography.styles.h1,
              color: colors.blue.primary,
            }}
          >
            Create Your TRADIE Account
          </h1>

          {/* Subtitle */}
          <p 
            className="text-sm md:text-base"
            style={{ 
              fontFamily: typography.fonts.caption,
              fontWeight: typography.weights.light,
              color: `${colors.blue.primary}70`,
              letterSpacing: typography.letterSpacing.normal,
            }}
          >
            Get started with secure, verified trading.
          </p>
        </div>

        {/* Form Section */}
        <div 
          className="backdrop-blur-md p-6 md:p-8 lg:p-10 mb-6"
          style={{
            backgroundColor: `${colors.surface.primary}85`,
            borderRadius: radius['3xl'],
            boxShadow: shadows['2xl'],
            border: `1px solid ${colors.surface.primary}50`,
          }}
        >
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
            {/* Full Name */}
            <DSInput
              label="Full Name *"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              variant={errors.fullName ? 'error' : 'default'}
              errorText={errors.fullName}
              size="lg"
            />

            {/* Mobile Number */}
            <div>
              <label 
                htmlFor="mobile" 
                style={{ 
                  display: 'block',
                  fontFamily: typography.fonts.label,
                  fontSize: typography.sizes.sm,
                  fontWeight: typography.weights.semibold,
                  color: colors.blue.primary,
                  marginBottom: spacing[2],
                  letterSpacing: typography.letterSpacing.wide,
                }}
              >
                Mobile Number *
              </label>
              <div style={{ display: 'flex', gap: spacing[2] }}>
                <div 
                  className="w-24 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    border: `2px solid ${colors.border.default}`,
                    background: `linear-gradient(to right, ${colors.accent.gold}10, ${colors.blue.primary}05)`,
                  }}
                >
                  <span 
                    style={{ 
                      fontFamily: typography.fonts.label,
                      fontWeight: typography.weights.bold,
                      color: colors.blue.primary,
                    }}
                  >
                    {countryCode || "+91"}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <DSInput
                    id="mobile"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    variant={errors.mobile ? 'error' : 'default'}
                    errorText={errors.mobile}
                    size="lg"
                  />
                </div>
              </div>
            </div>

            {/* Email Address (Optional) */}
            <DSInput
              label={
                <span>
                  Email Address{' '}
                  <span style={{ color: `${colors.blue.primary}50` }}>(Optional)</span>
                </span>
              }
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
            />
          </div>

          {/* Captcha Verification */}
          <div style={{ marginTop: spacing[6] }}>
            <CaptchaVerification
              onVerify={setIsCaptchaVerified}
              isVerified={isCaptchaVerified}
            />
          </div>

          {/* Get OTP Button */}
          <div style={{ marginTop: spacing[8], display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
            <DSButton
              onClick={handleSubmit}
              disabled={!isCaptchaVerified}
              variant="primary"
              size="xl"
              fullWidth
            >
              Get OTP
            </DSButton>

            <button
              onClick={onNavigateToLogin}
              className="w-full py-3 rounded-lg transition-all"
              style={{
                fontFamily: typography.fonts.body,
                fontWeight: typography.weights.regular,
                color: colors.blue.primary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.accent.gold;
                e.currentTarget.style.backgroundColor = `${colors.blue.primary}05`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.blue.primary;
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Already have an account? <span className="underline decoration-2 underline-offset-2">Log In</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="text-center px-4 py-3"
          style={{
            backgroundColor: `${colors.surface.primary}40`,
            backdropFilter: 'blur(8px)',
            borderRadius: radius['2xl'],
            border: `1px solid ${colors.surface.primary}60`,
          }}
        >
          <p 
            className="text-sm leading-relaxed"
            style={{ 
              fontFamily: typography.fonts.caption,
              fontWeight: typography.weights.light,
              color: `${colors.blue.primary}70`,
            }}
          >
            By continuing, you agree to our{" "}
            <a 
              href="#" 
              className="underline decoration-2 underline-offset-2 transition-colors"
              style={{ color: colors.blue.primary }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.accent.gold}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.blue.primary}
            >
              Terms of Use
            </a>{" "}
            and{" "}
            <a 
              href="#" 
              className="underline decoration-2 underline-offset-2 transition-colors"
              style={{ color: colors.blue.primary }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.accent.gold}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.blue.primary}
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}