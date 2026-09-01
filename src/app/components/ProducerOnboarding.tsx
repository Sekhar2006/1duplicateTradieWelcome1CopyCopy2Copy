import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Check,
  Upload,
  Camera,
  MapPin,
  Shield,
  Star,
  TrendingUp,
  Users,
  FileText,
  Sparkles,
  Info,
  X,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Crown,
  Award,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { DSButton, DSCard, DSBadge, DSAlert, designTokens } from "../design-system";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface ProducerOnboardingProps {
  onComplete: (data: any) => void;
  userName?: string;
}

type OnboardingStep = 
  | "welcome" 
  | "producer-type" 
  | "identity" 
  | "face-verify"
  | "roles" 
  | "kyc-tier" 
  | "ranking";

interface IdentityData {
  fullName: string;
  country: string;
  state: string;
  district: string;
  village: string;
  pinCode: string;
  mobile: string;
  alternateMobile?: string;
  email?: string;
  hideRealMobile: boolean;
}

const { colors, typography, spacing, radius, shadows, animations } = designTokens;

export function ProducerOnboarding({ 
  onComplete,
  userName = "Producer" 
}: ProducerOnboardingProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const [producerType, setProducerType] = useState<string>("own-produce");
  const [includeTrustedMembers, setIncludeTrustedMembers] = useState(false);
  const [identityData, setIdentityData] = useState<Partial<IdentityData>>({
    hideRealMobile: false,
  });
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["producer"]);
  const [faceVerified, setFaceVerified] = useState(false);
  const [kycTier, setKycTier] = useState(1);
  const [producerRank, setProducerRank] = useState("Bronze");
  const [commitCoins, setCommitCoins] = useState(5);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Role options
  const roleOptions = [
    { id: "producer", label: "Producer", icon: "🌾", description: "Grow and sell commodities" },
    { id: "commission-agent", label: "Commission Agent", icon: "🧾", description: "On behalf of Producer" },
    { id: "staff", label: "Staff", icon: "🧑‍🌾", description: "Roles assigned by Producer" },
    { id: "trader", label: "Trader", icon: "📈", description: "Buy and sell for profit" },
    { id: "buyer", label: "Buyer", icon: "💼", description: "Purchase commodities" },
    { id: "verifier", label: "Third-Party Verifier", icon: "🔍", description: "Quality verification" },
    { id: "bank", label: "Financial Institution", icon: "🏦", description: "Banking services" },
    { id: "logistics", label: "Transport/Logistics", icon: "🚛", description: "Transportation" },
    { id: "storage", label: "Storage Facility", icon: "🏢", description: "Warehousing" },
    { id: "insurance", label: "Insurance", icon: "🛡️", description: "Commodity insurance" },
    { id: "regulatory", label: "Regulatory Authority", icon: "⚖️", description: "Oversight & regulation" },
  ];

  const handleFileUpload = (docType: string) => {
    if (!uploadedDocs.includes(docType)) {
      setUploadedDocs([...uploadedDocs, docType]);
      toast.success(`${docType} uploaded successfully!`);
    }
  };

  const simulateFaceCapture = () => {
    toast.info("Capturing face...");
    setTimeout(() => {
      setFaceVerified(true);
      toast.success("Face verified successfully!");
      setTimeout(() => {
        setCurrentStep("roles");
      }, 1500);
    }, 2000);
  };

  const handleRoleToggle = (roleId: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleKYCSubmit = () => {
    setCurrentStep("kyc-tier");
    // Simulate KYC processing
    setTimeout(() => {
      setKycTier(2);
    }, 2000);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})`,
      }}
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ backgroundColor: `${colors.accent.gold}10` }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" style={{ backgroundColor: `${colors.blue.primary}10` }}></div>

      <AnimatePresence mode="wait">
        {/* Screen 1: Welcome to Your Trading Partner */}
        {currentStep === "welcome" && (
          <motion.div
            key="welcome"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="min-h-screen flex items-center justify-center p-4 relative z-10"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-md w-full"
            >
              {/* Logo */}
              <motion.div 
                className="flex justify-center mb-8"
                variants={itemVariants}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 blur-2xl opacity-40"
                    style={{ backgroundColor: colors.accent.gold }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <img 
                    src={tradieLogo} 
                    alt="TRADIE Logo" 
                    className="w-32 h-32 relative z-10 drop-shadow-2xl"
                  />
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-center mb-3"
                style={{
                  ...typography.styles.h1,
                  color: colors.blue.primary,
                  fontSize: typography.sizes['4xl'],
                }}
                variants={itemVariants}
              >
                Welcome to Your Trading Partner
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-center mb-8"
                style={{
                  fontFamily: typography.fonts.caption,
                  fontSize: typography.sizes.lg,
                  color: `${colors.blue.primary}90`,
                  lineHeight: typography.lineHeights.relaxed,
                }}
                variants={itemVariants}
              >
                Turn your harvest into fair profits with ease.
              </motion.p>

              {/* Benefits Card */}
              <motion.div variants={itemVariants}>
                <div
                  className="rounded-3xl p-6 mb-6"
                  style={{
                    backgroundColor: `${colors.surface.primary}90`,
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${colors.surface.primary}50`,
                    boxShadow: shadows['2xl'],
                  }}
                >
                  <div className="space-y-4">
                    {[
                      "List your produce in minutes",
                      "Get transparent prices and secure OTP-verified payments",
                      "Access trusted buyers, traders & services",
                      "AI insights on demand & supply trends",
                      "Guidance on the best time to harvest and sell",
                    ].map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                      >
                        <div
                          className="rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            backgroundColor: `${colors.status.success}20`,
                          }}
                        >
                          <Check className="w-4 h-4" style={{ color: colors.status.success }} />
                        </div>
                        <span
                          style={{
                            fontFamily: typography.fonts.caption,
                            fontSize: typography.sizes.base,
                            color: colors.blue.primary,
                            lineHeight: typography.lineHeights.relaxed,
                          }}
                        >
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div className="space-y-3" variants={itemVariants}>
                <DSButton
                  onClick={() => setCurrentStep("producer-type")}
                  variant="primary"
                  size="xl"
                  fullWidth
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Get Started
                </DSButton>
                <DSButton
                  onClick={() => toast.info("Learn more about TRADIE")}
                  variant="ghost"
                  size="lg"
                  fullWidth
                >
                  Learn More
                </DSButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Screen 2: Producer Type Selection */}
        {currentStep === "producer-type" && (
          <motion.div
            key="producer-type"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen flex items-center justify-center p-4 relative z-10"
          >
            <div className="max-w-2xl w-full">
              <div
                className="rounded-3xl p-8 md:p-12"
                style={{
                  backgroundColor: `${colors.surface.primary}90`,
                  backdropFilter: 'blur(16px)',
                  boxShadow: shadows['2xl'],
                  border: `1px solid ${colors.surface.primary}50`,
                }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                    style={{
                      background: `linear-gradient(to bottom right, ${colors.accent.gold}, ${colors.accent.goldDark})`,
                      boxShadow: shadows.goldLg,
                    }}
                  >
                    <Users className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2
                    style={{
                      ...typography.styles.h1,
                      color: colors.blue.primary,
                      marginBottom: spacing[3],
                    }}
                  >
                    Start your journey as a Producer
                  </h2>
                  <p
                    style={{
                      fontFamily: typography.fonts.caption,
                      fontSize: typography.sizes.base,
                      color: `${colors.blue.primary}70`,
                      lineHeight: typography.lineHeights.relaxed,
                    }}
                  >
                    Start with a simple Producer Sign-Up to list and sell your harvest.
                    Upgrade anytime to Producer Plus for added benefits, or register as a 
                    Marketing & Procurement (Commission Agent).
                  </p>
                </div>

                {/* Producer Type Selection */}
                <div className="mb-8">
                  <h3
                    className="mb-4"
                    style={{
                      fontFamily: typography.fonts.subheading,
                      fontWeight: typography.weights.semibold,
                      fontSize: typography.sizes.lg,
                      color: colors.blue.primary,
                    }}
                  >
                    What would you like to do?
                  </h3>
                  <RadioGroup value={producerType} onValueChange={setProducerType}>
                    <div className="space-y-3">
                      {[
                        { id: "own-produce", label: "Sell my own produce", icon: "🌾" },
                        { id: "procure", label: "Procure from others", icon: "🛒" },
                        { id: "commission", label: "Sell on behalf of others (Commission Agent)", icon: "💼" },
                      ].map((option) => (
                        <motion.div
                          key={option.id}
                          className="flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all"
                          style={{
                            backgroundColor: producerType === option.id 
                              ? `${colors.accent.gold}10` 
                              : colors.surface.primary,
                            borderColor: producerType === option.id 
                              ? colors.accent.gold 
                              : `${colors.border.default}`,
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setProducerType(option.id)}
                        >
                          <RadioGroupItem value={option.id} id={option.id} />
                          <span className="text-2xl">{option.icon}</span>
                          <Label
                            htmlFor={option.id}
                            className="flex-1 cursor-pointer"
                            style={{
                              fontFamily: typography.fonts.subheading,
                              fontWeight: typography.weights.medium,
                              fontSize: typography.sizes.base,
                              color: colors.blue.primary,
                            }}
                          >
                            {option.label}
                          </Label>
                        </motion.div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Include Trusted Members */}
                <div className="mb-8">
                  <div
                    className="flex items-start gap-3 p-4 rounded-xl"
                    style={{
                      backgroundColor: `${colors.blue.primary}05`,
                      border: `1px solid ${colors.border.light}`,
                    }}
                  >
                    <Checkbox
                      id="trusted-members"
                      checked={includeTrustedMembers}
                      onCheckedChange={(checked) => setIncludeTrustedMembers(checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="trusted-members"
                        className="cursor-pointer flex items-center gap-2"
                        style={{
                          fontFamily: typography.fonts.subheading,
                          fontWeight: typography.weights.semibold,
                          fontSize: typography.sizes.base,
                          color: colors.blue.primary,
                        }}
                      >
                        Include trusted members (up to 5, with OTP consent)
                        <Info className="w-4 h-4" style={{ color: `${colors.blue.primary}50` }} />
                      </Label>
                      <p
                        className="mt-1"
                        style={{
                          fontFamily: typography.fonts.caption,
                          fontSize: typography.sizes.sm,
                          color: `${colors.blue.primary}70`,
                        }}
                      >
                        You can modify or remove roles later anytime.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <DSButton
                  onClick={() => setCurrentStep("identity")}
                  variant="primary"
                  size="xl"
                  fullWidth
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Continue to Identity Verification
                </DSButton>

                <button
                  onClick={() => setCurrentStep("welcome")}
                  className="w-full text-center mt-4 underline"
                  style={{
                    fontFamily: typography.fonts.caption,
                    fontSize: typography.sizes.sm,
                    color: `${colors.blue.primary}70`,
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Screen 3: Identity Verification */}
        {currentStep === "identity" && (
          <motion.div
            key="identity"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen p-4 py-8 relative z-10"
          >
            <div className="max-w-2xl mx-auto">
              <div
                className="rounded-3xl p-8"
                style={{
                  backgroundColor: `${colors.surface.primary}90`,
                  backdropFilter: 'blur(16px)',
                  boxShadow: shadows['2xl'],
                  border: `1px solid ${colors.surface.primary}50`,
                }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring" }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{
                      backgroundColor: colors.blue.primary,
                      boxShadow: shadows.lg,
                    }}
                  >
                    <Shield className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2
                    style={{
                      ...typography.styles.h1,
                      color: colors.blue.primary,
                      marginBottom: spacing[2],
                    }}
                  >
                    Verify Your Identity
                  </h2>
                  <p
                    style={{
                      fontFamily: typography.fonts.caption,
                      fontSize: typography.sizes.base,
                      color: `${colors.blue.primary}70`,
                    }}
                  >
                    To ensure trust and transparency in trading.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 mb-8">
                  {/* Full Name */}
                  <div>
                    <Label
                      style={{
                        fontFamily: typography.fonts.label,
                        fontSize: typography.sizes.sm,
                        color: colors.blue.primary,
                      }}
                    >
                      Full Name *
                    </Label>
                    <Input
                      placeholder="Enter your full name"
                      value={identityData.fullName || ""}
                      onChange={(e) => setIdentityData({...identityData, fullName: e.target.value})}
                      className="mt-1 h-12"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <Label
                      style={{
                        fontFamily: typography.fonts.label,
                        fontSize: typography.sizes.sm,
                        color: colors.blue.primary,
                      }}
                    >
                      Country *
                    </Label>
                    <Select value={identityData.country} onValueChange={(value) => setIdentityData({...identityData, country: value})}>
                      <SelectTrigger className="mt-1 h-12">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="india">🇮🇳 India</SelectItem>
                        <SelectItem value="usa">🇺🇸 United States</SelectItem>
                        <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label style={{ fontFamily: typography.fonts.label, fontSize: typography.sizes.sm, color: colors.blue.primary }}>State *</Label>
                      <Input placeholder="State" value={identityData.state || ""} onChange={(e) => setIdentityData({...identityData, state: e.target.value})} className="mt-1 h-12" />
                    </div>
                    <div>
                      <Label style={{ fontFamily: typography.fonts.label, fontSize: typography.sizes.sm, color: colors.blue.primary }}>District *</Label>
                      <Input placeholder="District" value={identityData.district || ""} onChange={(e) => setIdentityData({...identityData, district: e.target.value})} className="mt-1 h-12" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label style={{ fontFamily: typography.fonts.label, fontSize: typography.sizes.sm, color: colors.blue.primary }}>Village/Town *</Label>
                      <Input placeholder="Village/Town" value={identityData.village || ""} onChange={(e) => setIdentityData({...identityData, village: e.target.value})} className="mt-1 h-12" />
                    </div>
                    <div>
                      <Label style={{ fontFamily: typography.fonts.label, fontSize: typography.sizes.sm, color: colors.blue.primary }}>Pin Code *</Label>
                      <Input placeholder="Pin Code" value={identityData.pinCode || ""} onChange={(e) => setIdentityData({...identityData, pinCode: e.target.value})} className="mt-1 h-12" />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <Label style={{ fontFamily: typography.fonts.label, fontSize: typography.sizes.sm, color: colors.blue.primary }}>Mobile Number *</Label>
                    <div className="flex gap-2 mt-1">
                      <Input value="+91" disabled className="w-20 h-12" />
                      <Input placeholder="9876543210" value={identityData.mobile || ""} onChange={(e) => setIdentityData({...identityData, mobile: e.target.value})} className="flex-1 h-12" maxLength={10} />
                    </div>
                  </div>

                  {/* Hide Mobile Option */}
                  <div className="flex items-center gap-2 p-3 rounded-xl" style={{ backgroundColor: `${colors.accent.gold}10`, border: `1px solid ${colors.accent.gold}30` }}>
                    <Checkbox
                      id="hide-mobile"
                      checked={identityData.hideRealMobile}
                      onCheckedChange={(checked) => setIdentityData({...identityData, hideRealMobile: checked as boolean})}
                    />
                    <Label htmlFor="hide-mobile" className="cursor-pointer flex-1" style={{ fontFamily: typography.fonts.caption, fontSize: typography.sizes.sm, color: colors.blue.primary }}>
                      Hide my real mobile number (use virtual number for trades)
                    </Label>
                  </div>

                  {/* Optional Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label style={{ fontFamily: typography.fonts.label, fontSize: typography.sizes.sm, color: `${colors.blue.primary}70` }}>Alternate Mobile</Label>
                      <Input placeholder="Optional" className="mt-1 h-12" />
                    </div>
                    <div>
                      <Label style={{ fontFamily: typography.fonts.label, fontSize: typography.sizes.sm, color: `${colors.blue.primary}70` }}>Email</Label>
                      <Input placeholder="Optional" type="email" className="mt-1 h-12" />
                    </div>
                  </div>
                </div>

                {/* Document Upload Section */}
                <Separator className="my-6" />
                <div className="mb-8">
                  <h3 className="mb-4" style={{ fontFamily: typography.fonts.subheading, fontWeight: typography.weights.semibold, fontSize: typography.sizes.lg, color: colors.blue.primary }}>
                    Upload Documents
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: "aadhaar", label: "Aadhaar / National ID", required: true },
                      { id: "pan", label: "PAN Card", required: true },
                      { id: "land", label: "Farmer Passbook / Land Lease", required: false },
                      { id: "additional", label: "Additional Proof (License, Tax Card)", required: false },
                    ].map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all"
                        style={{
                          backgroundColor: uploadedDocs.includes(doc.id) ? `${colors.status.success}10` : colors.surface.primary,
                          borderColor: uploadedDocs.includes(doc.id) ? colors.status.success : `${colors.border.default}`,
                        }}
                        onClick={() => handleFileUpload(doc.id)}
                      >
                        <div className="flex items-center gap-3">
                          {uploadedDocs.includes(doc.id) ? (
                            <CheckCircle2 className="w-5 h-5" style={{ color: colors.status.success }} />
                          ) : (
                            <Upload className="w-5 h-5" style={{ color: colors.blue.primary }} />
                          )}
                          <div>
                            <p style={{ fontFamily: typography.fonts.subheading, fontWeight: typography.weights.medium, fontSize: typography.sizes.base, color: colors.blue.primary }}>
                              {doc.label} {doc.required && <span style={{ color: colors.status.error }}>*</span>}
                            </p>
                            {uploadedDocs.includes(doc.id) && (
                              <p style={{ fontFamily: typography.fonts.caption, fontSize: typography.sizes.xs, color: colors.status.success }}>
                                Uploaded successfully
                              </p>
                            )}
                          </div>
                        </div>
                        {!uploadedDocs.includes(doc.id) && (
                          <ChevronRight className="w-5 h-5" style={{ color: `${colors.blue.primary}40` }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continue Button */}
                <DSButton
                  onClick={() => setCurrentStep("face-verify")}
                  variant="primary"
                  size="xl"
                  fullWidth
                  icon={<Camera className="w-5 h-5" />}
                  disabled={!identityData.fullName || !identityData.country || uploadedDocs.length < 2}
                >
                  Continue to Face Verification
                </DSButton>

                <button
                  onClick={() => setCurrentStep("producer-type")}
                  className="w-full text-center mt-4 underline"
                  style={{ fontFamily: typography.fonts.caption, fontSize: typography.sizes.sm, color: `${colors.blue.primary}70` }}
                >
                  Back
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Screen 3.5: Face Verification */}
        {currentStep === "face-verify" && (
          <motion.div
            key="face-verify"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen flex items-center justify-center p-4 relative z-10"
          >
            <div className="max-w-md w-full">
              <div
                className="rounded-3xl p-8 text-center"
                style={{
                  backgroundColor: `${colors.surface.primary}90`,
                  backdropFilter: 'blur(16px)',
                  boxShadow: shadows['2xl'],
                  border: `1px solid ${colors.surface.primary}50`,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                  style={{
                    background: `linear-gradient(to bottom right, ${colors.accent.gold}, ${colors.accent.goldDark})`,
                    boxShadow: shadows.goldLg,
                  }}
                >
                  <Camera className="w-10 h-10 text-white" />
                </motion.div>

                <h2
                  className="mb-3"
                  style={{
                    ...typography.styles.h2,
                    color: colors.blue.primary,
                  }}
                >
                  Verify Your Face
                </h2>
                <p
                  className="mb-8"
                  style={{
                    fontFamily: typography.fonts.caption,
                    fontSize: typography.sizes.base,
                    color: `${colors.blue.primary}70`,
                    lineHeight: typography.lineHeights.relaxed,
                  }}
                >
                  For security, we need to verify your identity with a neutral expression and a smile.
                </p>

                {/* Camera Preview Placeholder */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden mb-6 mx-auto"
                  style={{
                    width: '280px',
                    height: '280px',
                    backgroundColor: `${colors.blue.primary}10`,
                    border: `3px solid ${faceVerified ? colors.status.success : colors.accent.gold}`,
                  }}
                  animate={!faceVerified ? {
                    borderColor: [colors.accent.gold, colors.accent.goldDark, colors.accent.gold],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {!faceVerified ? (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Camera className="w-16 h-16 mx-auto mb-3" style={{ color: colors.blue.primary }} />
                          <p style={{ fontFamily: typography.fonts.caption, fontSize: typography.sizes.sm, color: `${colors.blue.primary}70` }}>
                            Position your face in the frame
                          </p>
                        </div>
                      </div>
                      {/* Face outline guides */}
                      <div className="absolute inset-8 border-2 border-dashed rounded-full" style={{ borderColor: `${colors.accent.gold}50` }} />
                    </>
                  ) : (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      style={{
                        background: `linear-gradient(to bottom right, ${colors.status.success}20, ${colors.status.successLight}20)`,
                      }}
                    >
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", delay: 0.2 }}
                        >
                          <CheckCircle2 className="w-20 h-20 mx-auto" style={{ color: colors.status.success }} />
                        </motion.div>
                        <p className="mt-3" style={{ fontFamily: typography.fonts.subheading, fontWeight: typography.weights.semibold, fontSize: typography.sizes.lg, color: colors.status.success }}>
                          Verified!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Capture Button */}
                {!faceVerified ? (
                  <DSButton
                    onClick={simulateFaceCapture}
                    variant="primary"
                    size="xl"
                    fullWidth
                    icon={<Camera className="w-5 h-5" />}
                  >
                    Capture Now
                  </DSButton>
                ) : (
                  <DSButton
                    onClick={() => setCurrentStep("roles")}
                    variant="primary"
                    size="xl"
                    fullWidth
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    Continue to Role Selection
                  </DSButton>
                )}

                <div
                  className="mt-4 p-3 rounded-xl"
                  style={{
                    backgroundColor: `${colors.status.info}10`,
                    border: `1px solid ${colors.status.info}30`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: typography.fonts.caption,
                      fontSize: typography.sizes.sm,
                      color: colors.blue.primary,
                      textAlign: 'left',
                    }}
                  >
                    <Info className="w-4 h-4 inline mr-2" style={{ color: colors.status.info }} />
                    You can hide your real mobile number if you wish — a virtual number will be used for trades.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Continue in next part... */}
      </AnimatePresence>
    </div>
  );
}