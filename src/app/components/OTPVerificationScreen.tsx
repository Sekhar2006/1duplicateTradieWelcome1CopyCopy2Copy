import { useState } from "react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./ui/input-otp";
import { ProgressIndicator } from "./ProgressIndicator";
import { DSButton, designTokens } from "../design-system";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface OTPVerificationScreenProps {
  onVerifySuccess: () => void;
  onBackToSignUp: () => void;
  mobile: string;
  countryCode: string;
}

const { colors, typography, spacing, radius, shadows, animations } = designTokens;

export function OTPVerificationScreen({ 
  onVerifySuccess,
  onBackToSignUp,
  mobile, 
  countryCode 
}: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError("Please enter a complete 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    setError("");

    // Simulate OTP verification
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      
      // Transition to next screen after success animation
      setTimeout(() => {
        onVerifySuccess();
      }, 1500);
    }, 1500);
  };

  const handleResendOTP = () => {
    setOtp("");
    setError("");
    // Simulate resending OTP
    console.log("Resending OTP...");
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
      
      {/* Success Confetti */}
      {isSuccess && (
        <>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? colors.accent.gold : colors.blue.primary,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                y: [0, -50, 100],
                x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, Math.random() * 360, Math.random() * 720],
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
      
      {/* Back Button - Only show if verification is not in progress or successful */}
      {!isVerifying && !isSuccess && (
        <motion.button
          onClick={onBackToSignUp}
          className="fixed top-4 left-4 md:top-6 md:left-6 z-50 backdrop-blur-sm p-3 rounded-full border transition-all group"
          style={{
            backgroundColor: `${colors.surface.primary}90`,
            boxShadow: shadows.lg,
            borderColor: `${colors.surface.primary}50`,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to sign up"
        >
          <ArrowLeft 
            className="w-5 h-5 md:w-6 md:h-6 transition-colors" 
            style={{ color: colors.blue.primary }}
          />
        </motion.button>
      )}
      
      {/* Progress Indicator */}
      {!isSuccess && (
        <ProgressIndicator 
          currentStep={1} 
          totalSteps={4}
          labels={['Sign Up', 'Verify', 'Bonus', 'Refer']}
        />
      )}
      
      {/* Main Container */}
      <div className="w-full max-w-[480px] md:max-w-[600px] lg:max-w-[700px] relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-10">
          {/* Logo */}
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 blur-2xl opacity-30 scale-110" style={{ backgroundColor: colors.accent.gold }}></div>
              <div className="absolute inset-0 blur-xl opacity-20 scale-105" style={{ backgroundColor: colors.blue.primary }}></div>
              <img 
                src={tradieLogo} 
                alt="TRADIE Logo" 
                className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 relative z-10 drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="mb-3 text-2xl md:text-3xl lg:text-4xl" 
            style={{ 
              ...typography.styles.h1,
              color: colors.blue.primary,
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Verify Your Mobile Number
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p 
              className="text-sm md:text-base mb-2"
              style={{ 
                fontFamily: typography.fonts.caption,
                fontWeight: typography.weights.light,
                color: `${colors.blue.primary}70`,
                letterSpacing: typography.letterSpacing.normal,
              }}
            >
              Enter the 6-digit OTP sent to
            </p>
            <p 
              className="text-base md:text-lg"
              style={{ 
                fontFamily: typography.fonts.label,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
              }}
            >
              {countryCode} {mobile}
            </p>
          </motion.div>
        </div>

        {/* OTP Section */}
        <motion.div 
          className="backdrop-blur-md p-6 md:p-8 lg:p-10 mb-6"
          style={{
            backgroundColor: `${colors.surface.primary}85`,
            borderRadius: radius['3xl'],
            boxShadow: shadows['2xl'],
            border: `1px solid ${colors.surface.primary}50`,
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          
          {!isSuccess ? (
            <>
              {/* OTP Input with Pop-in Animation */}
              <div className="flex flex-col items-center space-y-6 mb-8">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    setError("");
                  }}
                >
                  <InputOTPGroup className="gap-2 md:gap-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.5 + (index * 0.1),
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <InputOTPSlot
                          index={index}
                          className="w-12 h-14 md:w-14 md:h-16 text-xl md:text-2xl rounded-xl bg-white/90 transition-all"
                          style={{ 
                            fontFamily: typography.fonts.label, 
                            fontWeight: typography.weights.bold,
                            border: `2px solid ${colors.border.default}`,
                          }}
                        />
                      </motion.div>
                    ))}
                  </InputOTPGroup>
                </InputOTP>

                {error && (
                  <motion.p 
                    className="text-sm" 
                    style={{ 
                      fontFamily: typography.fonts.caption,
                      color: colors.status.error,
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              {/* Verify Button */}
              <DSButton
                onClick={handleVerify}
                disabled={isVerifying}
                variant="primary"
                size="xl"
                fullWidth
                isLoading={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </DSButton>

              {/* Resend OTP */}
              <div className="text-center mt-6">
                <p 
                  className="text-sm mb-2"
                  style={{ 
                    fontFamily: typography.fonts.caption,
                    fontWeight: typography.weights.light,
                    color: `${colors.blue.primary}70`,
                  }}
                >
                  Didn't receive the OTP?
                </p>
                <motion.button
                  onClick={handleResendOTP}
                  className="underline decoration-2 underline-offset-2"
                  style={{ 
                    fontFamily: typography.fonts.label,
                    fontWeight: typography.weights.semibold,
                    color: colors.accent.gold,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Resend OTP
                </motion.button>
              </div>
            </>
          ) : (
            /* Success Animation with Gold Glow */
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="relative mb-6">
                {/* Pulsing Gold Glow */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 blur-3xl rounded-full"
                  style={{ 
                    backgroundColor: colors.accent.gold,
                    width: '150%',
                    height: '150%',
                    left: '-25%',
                    top: '-25%',
                  }}
                />
                
                {/* Check Icon with Bounce */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <CheckCircle2 
                    className="w-24 h-24 relative z-10" 
                    strokeWidth={2}
                    style={{ color: colors.accent.gold }}
                  />
                </motion.div>
              </div>
              
              {/* Success Text */}
              <motion.h2 
                className="text-2xl md:text-3xl mb-2"
                style={{ 
                  ...typography.styles.h2,
                  color: colors.blue.primary,
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Verification Successful!
              </motion.h2>
              <motion.p 
                className="text-base"
                style={{ 
                  fontFamily: typography.fonts.caption,
                  fontWeight: typography.weights.light,
                  color: `${colors.blue.primary}70`,
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Redirecting to your rewards...
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}