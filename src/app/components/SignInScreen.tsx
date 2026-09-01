import { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Fingerprint, 
  ScanFace, 
  Lock, 
  Mail, 
  Phone,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

interface SignInScreenProps {
  onSignInSuccess: () => void;
  onRegisterClick: () => void;
  onBack: () => void;
  selectedCountryCode?: string;
}

export function SignInScreen({ 
  onSignInSuccess, 
  onRegisterClick,
  onBack,
  selectedCountryCode = "+91"
}: SignInScreenProps) {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [usePin, setUsePin] = useState(false);
  const [useBiometric, setUseBiometric] = useState(false);
  const [useThumbprint, setUseThumbprint] = useState(false);
  const [useFaceId, setUseFaceId] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Detect if input is email or phone
  const isEmail = emailOrPhone.includes("@");
  const isPhone = /^\+?\d+$/.test(emailOrPhone.replace(/\s/g, ""));

  // Password validation
  const validatePassword = (pwd: string): boolean => {
    const hasMinLength = pwd.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const getPasswordStrength = (pwd: string): { strength: string; color: string } => {
    if (pwd.length === 0) return { strength: "", color: "" };
    if (pwd.length < 8) return { strength: "Weak", color: "#EF4444" };
    if (!validatePassword(pwd)) return { strength: "Medium", color: "#F59E0B" };
    return { strength: "Strong", color: "#10B981" };
  };

  const passwordStrength = getPasswordStrength(password);

  // PIN input handling
  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newPin = [...pin];
    newPin[index] = value.slice(-1); // Only take last digit
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!emailOrPhone.trim()) {
      errors.push("Email or mobile number is required");
    } else if (!isEmail && !isPhone) {
      errors.push("Please enter a valid email or mobile number");
    }

    if (usePin) {
      if (pin.some(digit => !digit)) {
        errors.push("Please enter complete 6-digit PIN");
      }
    } else {
      if (!password) {
        errors.push("Password is required");
      } else if (!validatePassword(password)) {
        errors.push("Password does not meet security requirements");
      }
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  // Handle sign in
  const handleSignIn = () => {
    if (validateForm()) {
      // Simulate authentication
      console.log("Signing in with:", { 
        emailOrPhone, 
        usePin, 
        useBiometric,
        useThumbprint,
        useFaceId,
        rememberMe 
      });
      onSignInSuccess();
    }
  };

  // Handle biometric authentication
  const handleBiometricAuth = (type: "thumbprint" | "faceId") => {
    console.log(`Authenticating with ${type}`);
    // Simulate biometric authentication
    setTimeout(() => {
      onSignInSuccess();
    }, 1000);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4F8] to-[#D9F2FF] p-6">
      <motion.div
        className="max-w-md mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full mb-4 shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1
            className="text-[#003E6D] mb-3"
            style={{ 
              fontFamily: "Playfair Display, serif", 
              fontWeight: 700, 
              fontSize: "2rem" 
            }}
          >
            🔐 Sign In Securely
          </h1>
          <p
            className="text-[#003E6D]/70"
            style={{ 
              fontFamily: "Inter, sans-serif", 
              lineHeight: "1.6",
              fontSize: "0.95rem"
            }}
          >
            Access your TRADIE account safely and continue trading confidently.
          </p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white/80 backdrop-blur-sm border-[#003E6D]/20 p-6 shadow-xl">
            <div className="space-y-6">
              {/* Email/Mobile Field */}
              <div className="space-y-2">
                <Label
                  className="text-[#003E6D]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  {isEmail ? "📧 Email Address" : "📱 Mobile Number"} *
                </Label>
                <div className="relative">
                  {isEmail ? (
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#003E6D]/40" />
                  ) : (
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#003E6D]/40" />
                  )}
                  <Input
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="Enter your registered mobile number or email"
                    className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl pl-11"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
                {isPhone && (
                  <p
                    className="text-[#003E6D]/50 text-xs"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Country code: {selectedCountryCode} (auto-detected)
                  </p>
                )}
              </div>

              {/* Authentication Method Tabs */}
              <div className="flex gap-2">
                <Button
                  variant={!usePin ? "default" : "outline"}
                  onClick={() => setUsePin(false)}
                  className={`flex-1 rounded-xl ${
                    !usePin 
                      ? "bg-[#FFD700] hover:bg-[#FFC700] text-[#003E6D]" 
                      : "border-[#003E6D]/20 text-[#003E6D]/70"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Password
                </Button>
                <Button
                  variant={usePin ? "default" : "outline"}
                  onClick={() => setUsePin(true)}
                  className={`flex-1 rounded-xl ${
                    usePin 
                      ? "bg-[#FFD700] hover:bg-[#FFC700] text-[#003E6D]" 
                      : "border-[#003E6D]/20 text-[#003E6D]/70"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  PIN
                </Button>
              </div>

              {/* Password Field */}
              {!usePin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label
                    className="text-[#003E6D]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    🔒 Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#003E6D]/40" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl pl-11 pr-11"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003E6D]/40 hover:text-[#003E6D]/70 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-[#003E6D]/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ 
                              width: password.length < 8 ? "33%" : 
                                     !validatePassword(password) ? "66%" : "100%" 
                            }}
                            style={{ backgroundColor: passwordStrength.color }}
                            className="h-full"
                          />
                        </div>
                        <span
                          className="text-xs"
                          style={{ 
                            fontFamily: "Inter, sans-serif",
                            color: passwordStrength.color 
                          }}
                        >
                          {passwordStrength.strength}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Password Requirements */}
                  <Card className="bg-[#003E6D]/5 border-[#003E6D]/10 p-3">
                    <p
                      className="text-[#003E6D]/60 text-xs mb-2"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                    >
                      Password Requirements:
                    </p>
                    <ul className="space-y-1 text-xs text-[#003E6D]/70" style={{ fontFamily: "Inter, sans-serif" }}>
                      <li className="flex items-center gap-2">
                        {password.length >= 8 ? (
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border-2 border-[#003E6D]/30" />
                        )}
                        At least 8 characters
                      </li>
                      <li className="flex items-center gap-2">
                        {/[A-Z]/.test(password) ? (
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border-2 border-[#003E6D]/30" />
                        )}
                        1 uppercase letter
                      </li>
                      <li className="flex items-center gap-2">
                        {/[a-z]/.test(password) ? (
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border-2 border-[#003E6D]/30" />
                        )}
                        1 lowercase letter
                      </li>
                      <li className="flex items-center gap-2">
                        {/\d/.test(password) ? (
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border-2 border-[#003E6D]/30" />
                        )}
                        1 number
                      </li>
                      <li className="flex items-center gap-2">
                        {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? (
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border-2 border-[#003E6D]/30" />
                        )}
                        1 special character (!@#$%^&*)
                      </li>
                    </ul>
                  </Card>
                </motion.div>
              )}

              {/* PIN Field */}
              {usePin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label
                    className="text-[#003E6D]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    🔢 6-Digit PIN *
                  </Label>
                  <div className="flex justify-between gap-2">
                    {pin.map((digit, index) => (
                      <Input
                        key={index}
                        id={`pin-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handlePinChange(index, e.target.value)}
                        onKeyDown={(e) => handlePinKeyDown(index, e)}
                        className="w-12 h-12 text-center border-2 border-[#003E6D]/20 focus:border-[#FFD700] rounded-xl text-xl"
                        style={{ fontFamily: "Inter, sans-serif", fontWeight: 700 }}
                      />
                    ))}
                  </div>
                  <p
                    className="text-[#003E6D]/60 text-xs italic"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    💡 Tip: You can use PIN for faster sign-in next time.
                  </p>
                </motion.div>
              )}

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-[#003E6D]/30"
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-[#003E6D]/70 cursor-pointer text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Remember me on this device
                </Label>
              </div>

              <Separator className="bg-[#003E6D]/10" />

              {/* Biometric Access Section */}
              <Card className="bg-gradient-to-br from-[#FFD700]/10 to-[#003E6D]/5 border-[#FFD700]/30 p-4">
                <div className="space-y-4">
                  <div>
                    <h4
                      className="text-[#003E6D] mb-1"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                    >
                      🔐 Biometric Access (Optional)
                    </h4>
                    <p
                      className="text-[#003E6D]/60 text-xs"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Faster and more secure authentication
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Thumbprint */}
                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-[#003E6D]/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                          <Fingerprint className="w-5 h-5 text-[#003E6D]" />
                        </div>
                        <div>
                          <p
                            className="text-[#003E6D] text-sm"
                            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                          >
                            👍 Use Thumbprint
                          </p>
                          <p
                            className="text-[#003E6D]/60 text-xs"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {useThumbprint ? "Enabled" : "If enabled"}
                          </p>
                        </div>
                      </div>
                      <Checkbox
                        checked={useThumbprint}
                        onCheckedChange={(checked) => {
                          setUseThumbprint(checked as boolean);
                          if (checked) handleBiometricAuth("thumbprint");
                        }}
                        className="border-[#003E6D]/30"
                      />
                    </div>

                    {/* Face ID */}
                    <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-[#003E6D]/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                          <ScanFace className="w-5 h-5 text-[#003E6D]" />
                        </div>
                        <div>
                          <p
                            className="text-[#003E6D] text-sm"
                            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                          >
                            📸 Use Face ID / Recognition
                          </p>
                          <p
                            className="text-[#003E6D]/60 text-xs"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {useFaceId ? "Enabled" : "If supported"}
                          </p>
                        </div>
                      </div>
                      <Checkbox
                        checked={useFaceId}
                        onCheckedChange={(checked) => {
                          setUseFaceId(checked as boolean);
                          if (checked) handleBiometricAuth("faceId");
                        }}
                        className="border-[#003E6D]/30"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <Card className="bg-red-50 border-red-200 p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      {validationErrors.map((error, index) => (
                        <p
                          key={index}
                          className="text-red-700 text-sm"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {error}
                        </p>
                      ))}
                    </div>
                  </div>
                </Card>
              )}

              {/* Sign In Button */}
              <Button
                onClick={handleSignIn}
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-white rounded-xl py-6 transition-all hover:shadow-xl hover:shadow-[#FFD700]/40 shadow-lg"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem" }}
              >
                Sign In Securely
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {/* Forgot Password Link */}
              <div className="text-center">
                <button
                  className="text-[#003E6D] hover:text-[#FFD700] transition-colors text-sm underline"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  🔄 Forgot Password / Reset PIN?
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* New User Registration */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <Card className="bg-white/60 backdrop-blur-sm border-[#003E6D]/20 p-4">
            <p
              className="text-[#003E6D]/70 text-sm mb-2"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Don't have an account?
            </p>
            <Button
              onClick={onRegisterClick}
              variant="outline"
              className="w-full border-2 border-[#003E6D]/30 hover:border-[#FFD700] hover:bg-[#FFD700]/10 text-[#003E6D] rounded-xl py-5"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              ✨ New User? Register Here
            </Button>
          </Card>
        </motion.div>

        {/* Back Button */}
        <motion.div variants={itemVariants} className="mt-4 text-center">
          <button
            onClick={onBack}
            className="text-[#003E6D]/70 hover:text-[#003E6D] transition-colors text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ← Back to Welcome
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
