import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface CaptchaVerificationProps {
  onVerify: (isValid: boolean) => void;
  isVerified: boolean;
}

export function CaptchaVerification({ onVerify, isVerified }: CaptchaVerificationProps) {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(false);

  // Generate random CAPTCHA text
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed confusing characters
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []);

  const handleRefresh = () => {
    setCaptchaText(generateCaptcha());
    setUserInput("");
    setError(false);
    onVerify(false);
  };

  const handleInputChange = (value: string) => {
    setUserInput(value.toUpperCase());
    setError(false);
    
    // Check if input matches captcha
    if (value.toUpperCase() === captchaText) {
      onVerify(true);
      setError(false);
    } else if (value.length === captchaText.length) {
      onVerify(false);
      setError(true);
    } else {
      onVerify(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm" style={{ fontFamily: "Montserrat, sans-serif", color: "#003E6D" }}>
        Verify you're human
      </label>
      
      <div className="flex items-center gap-3">
        {/* CAPTCHA Display */}
        <motion.div
          className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-4 border-2 border-gray-300 relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gray-400"
                style={{
                  width: Math.random() * 100 + 50 + "px",
                  height: "1px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
          
          {/* CAPTCHA Text */}
          <div className="relative flex items-center justify-center select-none">
            {captchaText.split("").map((char, index) => (
              <span
                key={index}
                className="inline-block mx-1"
                style={{
                  fontFamily: "Courier New, monospace",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: `hsl(${Math.random() * 60 + 200}, 70%, 40%)`,
                  transform: `rotate(${Math.random() * 20 - 10}deg) scale(${0.9 + Math.random() * 0.2})`,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Refresh Button */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          className="h-14 w-14 border-2 border-[#003E6D]/20 hover:border-[#FFD700] hover:bg-[#FFD700]/10"
        >
          <RefreshCw className="w-5 h-5 text-[#003E6D]" />
        </Button>
      </div>

      {/* Input Field */}
      <div>
        <Input
          type="text"
          value={userInput}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter the text above"
          maxLength={6}
          className={`h-12 rounded-xl border-2 transition-all ${
            isVerified
              ? "border-green-500 bg-green-50"
              : error
              ? "border-red-500 bg-red-50"
              : "border-[#003E6D]/20 focus:border-[#FFD700]"
          }`}
          style={{ fontFamily: "Lato, sans-serif", fontSize: "16px" }}
        />
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 text-sm mt-2"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Incorrect CAPTCHA. Please try again.
          </motion.p>
        )}
        
        {isVerified && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 text-sm mt-2 flex items-center gap-1"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            <span>✓</span> Verified successfully!
          </motion.p>
        )}
      </div>
    </div>
  );
}
