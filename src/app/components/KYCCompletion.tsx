import { motion } from "motion/react";
import { ArrowRight, Edit, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface KYCCompletionProps {
  onGoToDashboard: () => void;
  onEditDetails: () => void;
}

export function KYCCompletion({ onGoToDashboard, onEditDetails }: KYCCompletionProps) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
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
    <motion.div
      className="flex flex-col items-center justify-center text-center space-y-8 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Success Animation */}
      <motion.div
        className="relative"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-[#FFD700] blur-3xl opacity-30 animate-pulse"></div>
        <div className="relative">
          <motion.div
            className="w-32 h-32 bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full flex items-center justify-center shadow-2xl"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            <CheckCircle2 className="w-16 h-16 text-white" />
          </motion.div>
          {/* Sparkle effects */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#FFD700] rounded-full"
              style={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: [0, Math.cos(i * 60 * (Math.PI / 180)) * 80],
                y: [0, Math.sin(i * 60 * (Math.PI / 180)) * 80],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h2
          className="text-[#003E6D] text-3xl"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
        >
          🎉 KYC Complete!
        </h2>
        <p
          className="text-[#003E6D]/70 text-lg max-w-md mx-auto"
          style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}
        >
          You can now access your role-specific dashboard and start trading.
        </p>
      </motion.div>

      {/* Benefits Card */}
      <motion.div variants={itemVariants} className="w-full max-w-md">
        <Card className="bg-gradient-to-br from-[#FFD700]/10 to-[#003E6D]/10 border-[#FFD700]/30 p-6">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-1" />
            <div className="text-left">
              <h3
                className="text-[#003E6D] mb-2"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                What's Next?
              </h3>
              <ul
                className="space-y-2 text-[#003E6D]/70 text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <li className="flex items-start gap-2">
                  <span className="text-[#FFD700] flex-shrink-0">✓</span>
                  <span>Access your personalized dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFD700] flex-shrink-0">✓</span>
                  <span>Start trading with verified buyers and sellers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFD700] flex-shrink-0">✓</span>
                  <span>Earn Commit Coins on every transaction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FFD700] flex-shrink-0">✓</span>
                  <span>Get AI-powered insights and suggestions</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="w-full max-w-md space-y-4">
        <Button
          onClick={onGoToDashboard}
          className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-white rounded-xl py-6 transition-all hover:shadow-xl hover:shadow-[#FFD700]/40 shadow-lg"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem" }}
        >
          Go to Dashboard
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <Button
          onClick={onEditDetails}
          variant="outline"
          className="w-full border-2 border-[#003E6D]/20 hover:border-[#FFD700] hover:bg-[#FFD700]/10 text-[#003E6D] rounded-xl py-6"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
        >
          <Edit className="w-5 h-5 mr-2" />
          Edit My Details
        </Button>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div variants={itemVariants} className="pt-4">
        <p
          className="text-[#003E6D]/60 italic text-sm max-w-md"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          "Your identity. Your roles. Your control. — Powered by Commit & AI."
        </p>
      </motion.div>
    </motion.div>
  );
}
