import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Shield, 
  Lock, 
  RefreshCw, 
  CheckCircle2, 
  XCircle,
  Loader2,
  Edit,
  Sparkles,
  Zap,
  PartyPopper
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

interface TwoStepVerificationScreenProps {
  onVerifySuccess: () => void;
  onChangeContact: () => void;
  onBack: () => void;
  contactInfo: string; // Phone or email
  contactType: "phone" | "email";
}

export function TwoStepVerificationScreen({ 
  onVerifySuccess, 
  onChangeContact,
  onBack,
  contactInfo,
  contactType = "phone"
}: TwoStepVerificationScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "error">("idle");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [showAutoDetect, setShowAutoDetect] = useState(false);
  const [autoDetecting, setAutoDetecting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // Auto-detect OTP simulation (simulates SMS auto-read on mobile)
  useEffect(() => {
    // Show auto-detect option after 3 seconds
    const autoDetectTimer = setTimeout(() => {
      if (otp.every(digit => digit === "") && verificationStatus === "idle") {
        setShowAutoDetect(true);
      }
    }, 3000);

    return () => clearTimeout(autoDetectTimer);
  }, [otp, verificationStatus]);

  // Auto-fill OTP when auto-detect is triggered
  const handleAutoDetect = () => {
    setAutoDetecting(true);
    setShowAutoDetect(false);
    
    // Simulate reading OTP from SMS
    const mockOtp = "123456".split("");
    
    // Animate OTP entry digit by digit
    mockOtp.forEach((digit, index) => {
      setTimeout(() => {
        setOtp(prev => {
          const newOtp = [...prev];
          newOtp[index] = digit;
          return newOtp;
        });
        
        // Auto-verify when last digit is filled
        if (index === 5) {
          setTimeout(() => {
            setAutoDetecting(false);
            handleVerifyOtp(true);
          }, 500);
        }
      }, index * 150);
    });
  };

  // Mask contact info for privacy
  const maskContactInfo = (contact: string, type: "phone" | "email"): string => {
    if (!contact) return ""; // Safety check for undefined/null
    
    if (type === "phone") {
      // Mask middle digits: +91 •••• 45 67
      const digits = contact.replace(/\D/g, '');
      if (digits.length >= 10) {
        const lastFour = digits.slice(-4);
        return `+91 •••• ${lastFour.slice(0, 2)} ${lastFour.slice(2)}`;
      }
      return contact;
    } else {
      // Mask email: example••@mail.com
      const [username, domain] = contact.split('@');
      if (username && domain) {
        const visiblePart = username.slice(0, Math.min(3, username.length));
        return `${visiblePart}••@${domain}`;
      }
      return contact;
    }
  };

  const maskedContact = maskContactInfo(contactInfo, contactType);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last digit
    setOtp(newOtp);

    // Reset error state when user starts typing
    if (verificationStatus === "error") {
      setVerificationStatus("idle");
    }

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-2fa-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle OTP input keydown
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-2fa-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Handle OTP paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    pastedData.split('').forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus last filled input
    const lastIndex = Math.min(pastedData.length - 1, 5);
    const lastInput = document.getElementById(`otp-2fa-${lastIndex}`);
    lastInput?.focus();
  };

  // Verify OTP
  const handleVerifyOtp = async (autoDetected?: boolean) => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setVerificationStatus("error");
      return;
    }

    setIsVerifying(true);
    setVerificationStatus("idle");

    // Simulate API call
    setTimeout(() => {
      // Mock verification - accept "123456" as valid OTP
      if (otpCode === "123456" || otpCode.length === 6) {
        setVerificationStatus("success");
        setIsVerifying(false);
        
        // Show success animation overlay
        setShowSuccessAnimation(true);
        
        // Navigate to next screen after success animation
        setTimeout(() => {
          onVerifySuccess();
        }, 3500); // Extended time for animation
      } else {
        setVerificationStatus("error");
        setIsVerifying(false);
        // Clear OTP on error
        setOtp(["", "", "", "", "", ""]);
        const firstInput = document.getElementById("otp-2fa-0");
        firstInput?.focus();
      }
    }, 2000);
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (!canResend) return;
    
    console.log("Resending OTP to:", contactInfo);
    setResendTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    setVerificationStatus("idle");
    
    // Focus first input
    const firstInput = document.getElementById("otp-2fa-0");
    firstInput?.focus();
  };

  const isOtpComplete = otp.every(digit => digit !== "");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4F8] to-[#D9F2FF] p-6 relative">
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#003E6D]/95 via-[#005A9C]/95 to-[#FFD700]/95 backdrop-blur-md"
          >
            <div className="text-center">
              {/* Animated Success Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  duration: 0.6 
                }}
                className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full mb-6 shadow-2xl relative"
              >
                <CheckCircle2 className="w-20 h-20 text-white" strokeWidth={3} />
                
                {/* Pulsing rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-[#FFD700]"
                  animate={{ 
                    scale: [1, 1.5, 2],
                    opacity: [0.8, 0.4, 0]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-[#FFD700]"
                  animate={{ 
                    scale: [1, 1.5, 2],
                    opacity: [0.8, 0.4, 0]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.5
                  }}
                />
              </motion.div>

              {/* Success Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 
                  className="text-white mb-3"
                  style={{ 
                    fontFamily: "Playfair Display, serif", 
                    fontWeight: 700, 
                    fontSize: "2.5rem" 
                  }}
                >
                  🎉 Verification Successful!
                </h2>
                <p 
                  className="text-white/90 text-lg mb-6"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Welcome to TRADIE Trading Platform
                </p>
              </motion.div>

              {/* Animated Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="space-y-3"
              >
                <p 
                  className="text-white/80 text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Redirecting to your Dashboard...
                </p>
                
                {/* Animated loading bar */}
                <div className="w-64 mx-auto h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#FFD700] to-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>

              {/* Sparkles Animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ 
                      x: Math.random() * window.innerWidth,
                      y: window.innerHeight + 100,
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{ 
                      y: -100,
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 1,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 2
                    }}
                  >
                    <Sparkles 
                      className="text-[#FFD700]" 
                      size={16 + Math.random() * 16} 
                    />
                  </motion.div>
                ))}
              </div>

              {/* Confetti Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={`confetti-${i}`}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FFC700" : "#FFFFFF",
                      left: `${Math.random() * 100}%`,
                      top: "-10%"
                    }}
                    animate={{
                      y: window.innerHeight + 100,
                      x: [0, (Math.random() - 0.5) * 200],
                      rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 0.5,
                      ease: "easeIn"
                    }}
                  />
                ))}
              </div>

              {/* Lightning bolts */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`lightning-${i}`}
                  className="absolute"
                  style={{
                    left: `${(i * 12.5) + 6.25}%`,
                    top: "50%"
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.5 + (i * 0.1),
                    repeat: 2
                  }}
                >
                  <Zap className="text-[#FFD700]" size={24} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="max-w-md mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#003E6D] to-[#005A9C] rounded-full mb-4 shadow-lg relative">
            <Shield className="w-10 h-10 text-white" />
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
          </div>
          <h1
            className="text-[#003E6D] mb-3"
            style={{ 
              fontFamily: "Playfair Display, serif", 
              fontWeight: 700, 
              fontSize: "2rem" 
            }}
          >
            🔐 Verify Your Identity
          </h1>
          <p
            className="text-[#003E6D]/70"
            style={{ 
              fontFamily: "Inter, sans-serif", 
              lineHeight: "1.6",
              fontSize: "0.95rem"
            }}
          >
            Enter the 6-digit OTP sent to your registered {contactType === "phone" ? "mobile number" : "email address"}.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white/80 backdrop-blur-sm border-[#003E6D]/20 p-6 shadow-xl">
            <div className="space-y-6">
              {/* Masked Contact Info */}
              <Card className="bg-gradient-to-r from-[#003E6D]/5 to-[#FFD700]/5 border-[#003E6D]/20 p-4">
                <div className="text-center">
                  <p
                    className="text-[#003E6D]/60 text-sm mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    OTP sent to:
                  </p>
                  <p
                    className="text-[#003E6D] tracking-wider"
                    style={{ 
                      fontFamily: "Poppins, sans-serif", 
                      fontWeight: 600,
                      fontSize: "1.1rem"
                    }}
                  >
                    {contactType === "phone" ? "📱" : "📧"} {maskedContact}
                  </p>
                </div>
              </Card>

              {/* OTP Input */}
              <div className="space-y-3">
                <label
                  className="block text-center text-[#003E6D]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Enter 6-Digit OTP
                </label>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-2fa-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      disabled={isVerifying || verificationStatus === "success"}
                      className={`w-12 h-14 text-center border-2 rounded-xl text-xl transition-all ${
                        verificationStatus === "error" 
                          ? "border-red-500 bg-red-50" 
                          : verificationStatus === "success"
                          ? "border-green-500 bg-green-50"
                          : digit
                          ? "border-[#FFD700] bg-[#FFD700]/5"
                          : "border-[#003E6D]/20"
                      }`}
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
                    />
                  ))}
                </div>
              </div>

              {/* Auto-detect OTP */}
              {showAutoDetect && (
                <div className="text-center space-y-2">
                  <Button
                    onClick={handleAutoDetect}
                    disabled={autoDetecting}
                    variant="ghost"
                    className="text-[#003E6D] hover:text-[#FFD700] transition-colors disabled:opacity-50"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                  >
                    <Sparkles className={`w-4 h-4 mr-2 ${autoDetecting ? "animate-spin" : ""}`} />
                    Auto-detect OTP
                  </Button>
                </div>
              )}

              {/* Validation Feedback */}
              {verificationStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <Card className="bg-green-50 border-green-200 p-4">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <p
                        className="text-green-700"
                        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                      >
                        ✅ OTP Verified Successfully!
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )}

              {verificationStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <Card className="bg-red-50 border-red-200 p-4">
                    <div className="flex items-center justify-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <p
                        className="text-red-700"
                        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                      >
                        ❌ Invalid OTP. Please try again.
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Verify Button */}
              <Button
                onClick={handleVerifyOtp}
                disabled={!isOtpComplete || isVerifying || verificationStatus === "success"}
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-white rounded-xl py-6 transition-all hover:shadow-xl hover:shadow-[#FFD700]/40 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem" }}
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </span>
                ) : verificationStatus === "success" ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Verified!
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Verify OTP
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>

              {/* Loading Indicator Reference */}
              {isVerifying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p
                    className="text-[#003E6D]/60 text-sm italic"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    🔄 Verifying your OTP...
                  </p>
                </motion.div>
              )}

              {/* Resend OTP */}
              <div className="text-center space-y-2">
                <Button
                  onClick={handleResendOtp}
                  disabled={!canResend || isVerifying}
                  variant="ghost"
                  className="text-[#003E6D] hover:text-[#FFD700] transition-colors disabled:opacity-50"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${!canResend ? "" : "hover:rotate-180 transition-transform duration-500"}`} />
                  {canResend ? "Resend OTP" : `Resend OTP (in ${resendTimer}s)`}
                </Button>
                
                <p
                  className="text-[#003E6D]/50 text-xs"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Didn't receive the code? Check your spam folder
                </p>
              </div>

              {/* Change Contact */}
              <div className="text-center pt-4 border-t border-[#003E6D]/10">
                <button
                  onClick={onChangeContact}
                  disabled={isVerifying}
                  className="text-[#003E6D] hover:text-[#FFD700] transition-colors text-sm flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <Edit className="w-4 h-4" />
                  Change Number / Email
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Info Card */}
        <motion.div variants={itemVariants} className="mt-6">
          <Card className="bg-white/60 backdrop-blur-sm border-[#003E6D]/20 p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-[#003E6D]" />
              </div>
              <div>
                <p
                  className="text-[#003E6D] text-sm mb-1"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  🔒 Why 2-Step Verification?
                </p>
                <p
                  className="text-[#003E6D]/70 text-xs"
                  style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}
                >
                  This extra layer of security ensures that only you can access your TRADIE account, even if someone knows your password.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Back Button */}
        <motion.div variants={itemVariants} className="mt-4 text-center">
          <button
            onClick={onBack}
            disabled={isVerifying}
            className="text-[#003E6D]/70 hover:text-[#003E6D] transition-colors text-sm disabled:opacity-50"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ← Back to Sign In
          </button>
        </motion.div>

        {/* Flow Indicator */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <p
            className="text-[#003E6D]/50 text-xs italic"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Next: {verificationStatus === "success" ? "Redirecting to Dashboard..." : "KYC / Role Selection → Dashboard"}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}