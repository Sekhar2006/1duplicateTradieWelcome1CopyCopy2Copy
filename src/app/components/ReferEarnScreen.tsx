import { useState } from "react";
import { motion } from "motion/react";
import { Share2, Copy, ArrowRight, Coins, Users } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { ProgressIndicator } from "./ProgressIndicator";
import { DSButton, DSCard, designTokens } from "../design-system";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface ReferEarnScreenProps {
  onNext: () => void;
  referralCode?: string;
}

const { colors, typography, spacing, radius, shadows } = designTokens;

export function ReferEarnScreen({ 
  onNext,
  referralCode = "TRAD2024XYZ"
}: ReferEarnScreenProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    try {
      // Create a temporary textarea element
      const textArea = document.createElement("textarea");
      textArea.value = referralCode;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      // Try to copy using execCommand
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        toast.success("Referral code copied!");
        setTimeout(() => setCopied(false), 2000);
      } else {
        toast.error("Unable to copy. Please copy manually: " + referralCode);
      }
    } catch (err) {
      console.error('Copy failed:', err);
      toast.error("Please copy manually: " + referralCode);
    }
  };

  const handleShareCode = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join TRADIE',
        text: `Use my referral code ${referralCode} to sign up on TRADIE and get +2 Commit Coins!`,
        url: window.location.origin
      }).catch(console.error);
    } else {
      handleCopyCode();
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
      
      {/* Progress Indicator */}
      <ProgressIndicator 
        currentStep={3} 
        totalSteps={4}
        labels={['Sign Up', 'Verify', 'Bonus', 'Refer']}
      />
      
      {/* Main Container */}
      <div className="w-full max-w-[480px] md:max-w-[600px] lg:max-w-[700px] relative z-10">
        
        {/* Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, x: 100 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-md p-8 md:p-12 lg:p-16"
          style={{
            backgroundColor: `${colors.surface.primary}85`,
            borderRadius: radius['3xl'],
            boxShadow: shadows['2xl'],
            border: `1px solid ${colors.surface.primary}50`,
          }}
        >
          
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl opacity-30 scale-110" style={{ backgroundColor: colors.accent.gold }}></div>
              <img 
                src={tradieLogo} 
                alt="TRADIE Logo" 
                className="w-20 h-20 md:w-24 md:h-24 relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Title with Emoji */}
          <div className="text-center mb-6">
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl mb-3 flex items-center justify-center gap-3"
              style={{ 
                ...typography.styles.h1,
                color: colors.blue.primary,
              }}
            >
              Refer & Earn <span className="text-4xl md:text-5xl">🚀</span>
            </h1>
          </div>

          {/* Coin Exchange Illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center items-center mb-8 gap-4"
          >
            {/* Friend Coin */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div 
                className="rounded-full p-6 md:p-8"
                style={{
                  background: `linear-gradient(to bottom right, ${colors.accent.gold}, #FFA500)`,
                  boxShadow: shadows.xl,
                }}
              >
                <Users 
                  className="w-12 h-12 md:w-14 md:h-14" 
                  strokeWidth={2}
                  style={{ color: colors.surface.primary }}
                />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p 
                  className="text-sm"
                  style={{ 
                    fontFamily: typography.fonts.label, 
                    fontWeight: typography.weights.semibold,
                    color: colors.blue.primary,
                  }}
                >
                  Friend +2
                </p>
              </div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight 
                className="w-8 h-8 md:w-10 md:h-10" 
                strokeWidth={2.5}
                style={{ color: colors.accent.gold }}
              />
            </motion.div>

            {/* Your Coin */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="relative"
            >
              <div 
                className="rounded-full p-6 md:p-8"
                style={{
                  background: `linear-gradient(to bottom right, ${colors.blue.primary}, ${colors.blue.dark})`,
                  boxShadow: shadows.xl,
                }}
              >
                <Coins 
                  className="w-12 h-12 md:w-14 md:h-14" 
                  strokeWidth={2}
                  style={{ color: colors.accent.gold }}
                />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p 
                  className="text-sm"
                  style={{ 
                    fontFamily: typography.fonts.label, 
                    fontWeight: typography.weights.semibold,
                    color: colors.blue.primary,
                  }}
                >
                  You +3
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Explanation */}
          <div className="text-center mb-8 mt-12">
            <p 
              className="text-base md:text-lg mb-6 px-4 leading-relaxed"
              style={{ 
                fontFamily: typography.fonts.body,
                fontWeight: typography.weights.regular,
                color: `${colors.blue.primary}80`,
                lineHeight: '1.8',
              }}
            >
              Share your unique referral code with friends. They get <span style={{ color: colors.accent.gold, fontWeight: typography.weights.semibold }}>+2 Commit Coins</span> when they sign up, and you earn <span style={{ color: colors.accent.gold, fontWeight: typography.weights.semibold }}>+3 Commit Coins</span> per successful referral!
            </p>
          </div>

          {/* Referral Code Display */}
          <div className="mb-8">
            <label 
              className="block mb-3 text-center"
              style={{ 
                fontFamily: typography.fonts.label, 
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
              }}
            >
              Your Referral Code
            </label>
            <div 
              className="p-4 flex items-center justify-between gap-3"
              style={{
                background: `linear-gradient(to right, ${colors.accent.gold}20, ${colors.blue.primary}10)`,
                border: `2px solid ${colors.accent.gold}40`,
                borderRadius: radius['2xl'],
              }}
            >
              <p 
                className="text-xl md:text-2xl tracking-wider flex-1 text-center"
                style={{ 
                  fontFamily: typography.fonts.label, 
                  fontWeight: typography.weights.bold,
                  color: colors.blue.primary,
                }}
              >
                {referralCode}
              </p>
              <button
                onClick={handleCopyCode}
                className="p-3 rounded-xl transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: `${colors.surface.primary}80`,
                  boxShadow: shadows.md,
                }}
                title="Copy code"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.surface.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.surface.primary}80`;
                }}
              >
                <Copy 
                  className="w-5 h-5" 
                  style={{ color: copied ? colors.status.success : colors.blue.primary }}
                />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
            <DSButton
              onClick={handleShareCode}
              variant="primary"
              size="xl"
              fullWidth
              icon={<Share2 className="w-5 h-5" />}
            >
              Share Code
            </DSButton>

            <DSButton
              onClick={onNext}
              variant="secondary"
              size="xl"
              fullWidth
              icon={<ArrowRight className="w-5 h-5 ml-2" />}
            >
              Continue to KYC
            </DSButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}