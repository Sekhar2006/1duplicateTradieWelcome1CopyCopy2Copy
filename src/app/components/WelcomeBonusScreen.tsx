import { motion } from "motion/react";
import { Coins, Sparkles } from "lucide-react";
import { ProgressIndicator } from "./ProgressIndicator";
import { DSButton, DSBadge, designTokens } from "../design-system";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface WelcomeBonusScreenProps {
  onNext: () => void;
}

const { colors, typography, spacing, radius, shadows } = designTokens;

export function WelcomeBonusScreen({ onNext }: WelcomeBonusScreenProps) {
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
      
      {/* Animated Confetti */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? colors.accent.gold : colors.blue.primary,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Progress Indicator */}
      <ProgressIndicator 
        currentStep={2} 
        totalSteps={4}
        labels={['Sign Up', 'Verify', 'Bonus', 'Refer']}
      />
      
      {/* Main Container */}
      <div className="w-full max-w-[480px] md:max-w-[600px] lg:max-w-[700px] relative z-10">
        
        {/* Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
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
              Welcome Bonus <span className="text-4xl md:text-5xl">🎉</span>
            </h1>
          </div>

          {/* Coin Illustration */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              {/* Glow effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 blur-3xl rounded-full scale-150"
                style={{ backgroundColor: colors.accent.gold }}
              ></motion.div>
              
              {/* Coins */}
              <div className="relative flex items-center justify-center">
                <div 
                  className="rounded-full p-8 md:p-12"
                  style={{
                    background: `linear-gradient(to bottom right, ${colors.accent.gold}, #FFA500)`,
                    boxShadow: shadows['2xl'],
                  }}
                >
                  <Coins 
                    className="w-20 h-20 md:w-24 md:h-24" 
                    strokeWidth={2.5}
                    style={{ color: colors.surface.primary }}
                  />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles 
                    className="w-8 h-8" 
                    fill={colors.accent.gold}
                    style={{ color: colors.accent.gold }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Congratulations Message */}
          <div className="text-center mb-8">
            <div 
              className="inline-block px-8 py-4 mb-4"
              style={{
                background: `linear-gradient(to right, ${colors.accent.gold}20, ${colors.blue.primary}10)`,
                borderRadius: radius['2xl'],
                border: `2px solid ${colors.accent.gold}30`,
              }}
            >
              <DSBadge 
                variant="gold" 
                size="lg"
              >
                +5 Commit Coins
              </DSBadge>
            </div>
            <p 
              className="text-base md:text-lg px-4"
              style={{ 
                fontFamily: typography.fonts.body,
                fontWeight: typography.weights.regular,
                color: `${colors.blue.primary}80`,
                lineHeight: '1.8',
              }}
            >
              You've received 5 Commit Coins for signing up! Use them to enhance your trading experience.
            </p>
          </div>

          {/* Next Button */}
          <DSButton
            onClick={onNext}
            variant="primary"
            size="xl"
            fullWidth
          >
            Next
          </DSButton>
        </motion.div>
      </div>
    </div>
  );
}