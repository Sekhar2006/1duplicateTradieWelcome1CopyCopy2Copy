import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Fingerprint, Scan, AlertCircle, CheckCircle2 } from "lucide-react";
import { DSButton, DSInput, designTokens } from "../design-system";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";

const { colors, typography, spacing, radius, shadows } = designTokens;

interface ProducerLoginScreenProps {
  onLogin: (credentials: LoginCredentials) => void;
  onForgotPassword?: () => void;
  onBack?: () => void;
}

interface LoginCredentials {
  username: string;
  password: string;
  pin: string;
  viewOnlyMode: boolean;
  biometricType?: "face" | "fingerprint";
}

export function ProducerLoginScreen({ onLogin, onForgotPassword, onBack }: ProducerLoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [viewOnlyMode, setViewOnlyMode] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validation states
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pinError, setPinError] = useState("");

  const validateUsername = (value: string) => {
    if (!value) {
      setUsernameError("Phone number or username is required");
      return false;
    }
    if (value.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("Password is required");
      return false;
    }
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validatePin = (value: string) => {
    if (!value) {
      setPinError("PIN is required");
      return false;
    }
    if (!/^\d{4,6}$/.test(value)) {
      setPinError("PIN must be 4-6 digits");
      return false;
    }
    setPinError("");
    return true;
  };

  const handlePinChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 6) {
      setPin(numericValue);
      if (numericValue) {
        validatePin(numericValue);
      }
    }
  };

  const handleBiometricLogin = async (type: "face" | "fingerprint") => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate biometric authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const biometricName = type === "face" ? "Face ID" : "Fingerprint";
      setSuccess(`${biometricName} authentication successful!`);
      
      setTimeout(() => {
        onLogin({
          username: "biometric_user",
          password: "",
          pin: "",
          viewOnlyMode,
          biometricType: type,
        });
      }, 1000);
    } catch (err) {
      setError("Biometric authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate all fields
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);
    const isPinValid = validatePin(pin);

    if (!isUsernameValid || !isPasswordValid || !isPinValid) {
      setError("Please fix the errors above");
      return;
    }

    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      setSuccess("Login successful!");
      
      setTimeout(() => {
        onLogin({
          username,
          password,
          pin,
          viewOnlyMode,
        });
      }, 500);
    }, 1000);
  };

  const isFormValid = username && password && pin && !usernameError && !passwordError && !pinError;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-sm"
            style={{ color: colors.blue.primary }}
          >
            ← Back
          </button>
        )}

        {/* Login Card */}
        <div
          className="bg-white rounded-3xl p-8 shadow-lg"
          style={{
            borderRadius: radius["2xl"],
            boxShadow: shadows.lg,
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent.gold}, ${colors.accent.goldDark})`,
                  boxShadow: shadows.gold,
                }}
              >
                <span className="text-3xl">🌾</span>
              </div>
            </motion.div>

            <h1
              className="mb-2"
              style={{
                fontFamily: typography.fonts.heading,
                fontSize: typography.sizes["3xl"],
                color: colors.blue.primary,
                fontWeight: typography.weights.bold,
              }}
            >
              Producer Login
            </h1>
            <p style={{ color: colors.text.secondary, fontSize: typography.sizes.sm }}>
              Welcome back! Sign in to manage your produce
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert
                variant="destructive"
                className="mb-4"
                style={{ borderColor: colors.status.error, backgroundColor: `${colors.status.error}15` }}
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Alert
                className="mb-4"
                style={{ borderColor: colors.status.success, backgroundColor: `${colors.status.success}15` }}
              >
                <CheckCircle2 className="h-4 w-4" style={{ color: colors.status.success }} />
                <AlertDescription style={{ color: colors.status.success }}>{success}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username/Phone Input */}
            <DSInput
              label="Phone Number or Username"
              type="text"
              placeholder="Enter phone or username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (e.target.value) {
                  validateUsername(e.target.value);
                }
              }}
              onBlur={() => validateUsername(username)}
              variant={usernameError ? "error" : "default"}
              errorMessage={usernameError}
              size="lg"
            />

            {/* Password Input */}
            <div className="relative">
              <DSInput
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value) {
                    validatePassword(e.target.value);
                  }
                }}
                onBlur={() => validatePassword(password)}
                variant={passwordError ? "error" : "default"}
                errorMessage={passwordError}
                size="lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9"
                style={{ color: colors.text.muted }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* PIN Input */}
            <DSInput
              label="PIN (4-6 digits)"
              type="text"
              inputMode="numeric"
              placeholder="Enter your PIN"
              value={pin}
              onChange={(e) => handlePinChange(e.target.value)}
              onBlur={() => validatePin(pin)}
              variant={pinError ? "error" : "default"}
              errorMessage={pinError}
              helperText="Numeric only, 4-6 digits"
              size="lg"
            />

            {/* View-Only Mode Toggle */}
            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
              <div className="flex-1">
                <Label htmlFor="view-only-mode" className="cursor-pointer">
                  <div style={{ fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                    View-Only Mode
                  </div>
                  <div style={{ fontSize: typography.sizes.xs, color: colors.text.muted }}>
                    Login without edit permissions
                  </div>
                </Label>
              </div>
              <Switch
                id="view-only-mode"
                checked={viewOnlyMode}
                onCheckedChange={setViewOnlyMode}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm hover:underline"
                style={{ color: colors.blue.light }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <DSButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </DSButton>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: colors.border.light }}></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white" style={{ color: colors.text.muted }}>
                Or continue with
              </span>
            </div>
          </div>

          {/* Biometric Options */}
          <div className="grid grid-cols-2 gap-4">
            {/* Face ID */}
            <motion.button
              type="button"
              onClick={() => handleBiometricLogin("face")}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all"
              style={{
                borderColor: colors.border.default,
                backgroundColor: colors.surface.primary,
              }}
            >
              <Scan
                size={32}
                style={{ color: colors.blue.primary, marginBottom: spacing[2] }}
              />
              <span style={{ fontSize: typography.sizes.sm, color: colors.text.primary }}>
                Face ID
              </span>
            </motion.button>

            {/* Fingerprint */}
            <motion.button
              type="button"
              onClick={() => handleBiometricLogin("fingerprint")}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all"
              style={{
                borderColor: colors.border.default,
                backgroundColor: colors.surface.primary,
              }}
            >
              <Fingerprint
                size={32}
                style={{ color: colors.accent.gold, marginBottom: spacing[2] }}
              />
              <span style={{ fontSize: typography.sizes.sm, color: colors.text.primary }}>
                Fingerprint
              </span>
            </motion.button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p style={{ fontSize: typography.sizes.xs, color: colors.text.muted }}>
              Secure login powered by TRADIE
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
