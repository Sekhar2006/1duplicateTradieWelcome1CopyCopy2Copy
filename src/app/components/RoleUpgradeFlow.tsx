import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Check,
  Crown,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Sparkles,
  ChevronRight,
  Info,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { DSButton, DSCard, DSBadge, designTokens } from "../design-system";
import { Alert, AlertDescription } from "./ui/alert";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

interface RoleUpgradeFlowProps {
  currentRole?: "producer" | "producer-plus" | null;
  onComplete: (role: string, teamMembers?: TeamMember[]) => void;
  onBack?: () => void;
}

interface TeamMember {
  name: string;
  mobile: string;
  verified: boolean;
}

const { colors, typography, spacing, radius, shadows } = designTokens;

export function RoleUpgradeFlow({ 
  currentRole = null, 
  onComplete,
  onBack 
}: RoleUpgradeFlowProps) {
  const [step, setStep] = useState<"select" | "upgrade" | "commission" | "team">("select");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberMobile, setNewMemberMobile] = useState("");
  const [isAddingMember, setIsAddingMember] = useState(false);

  // Producer role cards
  const producerRoles = [
    {
      id: "producer",
      title: "Producer",
      subtitle: "Start Simple",
      icon: "🌾",
      price: "Free",
      gradient: "from-green-50 to-emerald-50",
      borderColor: colors.status.success,
      features: [
        "List and sell your harvest",
        "Direct market access",
        "Basic price alerts",
        "Simple dashboard",
        "Commission-based pricing",
      ],
      recommended: currentRole === null,
    },
    {
      id: "producer-plus",
      title: "Producer Plus",
      subtitle: "Added Benefits",
      icon: "⭐",
      price: "₹999/year",
      gradient: "from-yellow-50 to-amber-50",
      borderColor: colors.accent.gold,
      features: [
        "Everything in Producer",
        "Priority listing visibility",
        "Advanced analytics dashboard",
        "Price trend predictions",
        "Storage recommendations",
        "Bulk order management",
        "Reduced commission rates",
        "Dedicated support",
      ],
      badge: "POPULAR",
      recommended: currentRole === "producer",
    },
    {
      id: "commission-agent",
      title: "Marketing & Procurement",
      subtitle: "Commission Agent",
      icon: "💼",
      price: "₹2,499/year",
      gradient: "from-blue-50 to-cyan-50",
      borderColor: colors.blue.primary,
      features: [
        "Everything in Producer Plus",
        "Add up to 5 team members",
        "Buy/procure from others",
        "Sell on behalf of producers",
        "Team OTP verification",
        "Commission tracking",
        "Multi-producer management",
        "Advanced reporting",
        "Market insights",
      ],
      badge: "PRO",
      recommended: currentRole === "producer-plus",
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    
    if (roleId === "producer") {
      onComplete(roleId);
    } else if (roleId === "producer-plus") {
      setStep("upgrade");
    } else if (roleId === "commission-agent") {
      setStep("commission");
    }
  };

  const handleUpgrade = () => {
    if (selectedRole === "producer-plus") {
      onComplete(selectedRole);
      toast.success("Upgraded to Producer Plus!");
    }
  };

  const handleCommissionSetup = () => {
    setStep("team");
  };

  const handleAddTeamMember = () => {
    if (!newMemberName || !newMemberMobile) {
      toast.error("Please enter both name and mobile number");
      return;
    }

    if (teamMembers.length >= 5) {
      toast.error("Maximum 5 team members allowed");
      return;
    }

    if (newMemberMobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsAddingMember(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      const newMember: TeamMember = {
        name: newMemberName,
        mobile: newMemberMobile,
        verified: true,
      };
      
      setTeamMembers([...teamMembers, newMember]);
      setNewMemberName("");
      setNewMemberMobile("");
      setIsAddingMember(false);
      toast.success(`${newMemberName} added successfully!`);
    }, 1500);
  };

  const handleRemoveTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
    toast.success("Team member removed");
  };

  const handleCompleteTeamSetup = () => {
    onComplete("commission-agent", teamMembers);
    toast.success("Commission Agent setup complete!");
  };

  // Animation variants
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

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})`,
      }}
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: `${colors.accent.gold}10` }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" style={{ backgroundColor: `${colors.blue.primary}10` }}></div>

      <div className="w-full max-w-6xl relative z-10">
        <AnimatePresence mode="wait">
          {/* Step 1: Role Selection */}
          {step === "select" && (
            <motion.div
              key="select"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
              variants={containerVariants}
            >
              {/* Header */}
              <motion.div className="text-center mb-8" variants={itemVariants}>
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="w-16 h-16" style={{ color: colors.accent.gold }} />
                  </motion.div>
                </div>
                <h1
                  style={{
                    ...typography.styles.h1,
                    color: colors.blue.primary,
                  }}
                >
                  Choose Your Trading Role
                </h1>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: typography.fonts.caption,
                    fontSize: typography.sizes.base,
                    color: `${colors.blue.primary}70`,
                  }}
                >
                  Start simple and upgrade anytime as your business grows
                </p>
              </motion.div>

              {/* Info Alert */}
              <motion.div variants={itemVariants} className="mb-8">
                <Alert 
                  className="border-2"
                  style={{
                    background: `linear-gradient(to right, ${colors.accent.gold}10, ${colors.blue.primary}05)`,
                    borderColor: `${colors.accent.gold}30`,
                  }}
                >
                  <Info className="w-5 h-5" style={{ color: colors.blue.primary }} />
                  <AlertDescription
                    className="ml-2"
                    style={{ 
                      fontFamily: typography.fonts.caption,
                      color: colors.blue.primary,
                      lineHeight: typography.lineHeights.relaxed,
                    }}
                  >
                    <strong style={{ fontWeight: typography.weights.semibold }}>
                      Full transparency and control.
                    </strong>{" "}
                    Switch roles anytime, add trusted team members, and choose your trading activities.
                    All roles include access to market yard and retail pricing.
                  </AlertDescription>
                </Alert>
              </motion.div>

              {/* Role Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {producerRoles.map((role, index) => (
                  <motion.div
                    key={role.id}
                    variants={itemVariants}
                    custom={index}
                  >
                    <motion.div
                      className="relative h-full cursor-pointer"
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRoleSelect(role.id)}
                    >
                      <div
                        className={`h-full rounded-3xl p-6 border-2 bg-gradient-to-br ${role.gradient}`}
                        style={{
                          borderColor: role.recommended ? role.borderColor : `${colors.border.default}`,
                          boxShadow: role.recommended ? shadows.goldLg : shadows.md,
                        }}
                      >
                        {/* Badge */}
                        {role.badge && (
                          <div className="absolute -top-3 -right-3">
                            <DSBadge variant={role.badge === "POPULAR" ? "gold" : "default"} size="md">
                              {role.badge}
                            </DSBadge>
                          </div>
                        )}

                        {/* Recommended Ribbon */}
                        {role.recommended && (
                          <motion.div
                            className="absolute top-4 left-4 px-3 py-1 rounded-full flex items-center gap-1"
                            style={{
                              backgroundColor: colors.accent.gold,
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                          >
                            <Sparkles className="w-3 h-3 text-white" />
                            <span
                              style={{
                                fontFamily: typography.fonts.label,
                                fontSize: typography.sizes.xs,
                                fontWeight: typography.weights.bold,
                                color: colors.text.inverse,
                              }}
                            >
                              RECOMMENDED
                            </span>
                          </motion.div>
                        )}

                        {/* Icon */}
                        <div className="flex justify-center mb-4 mt-8">
                          <div
                            className="rounded-full w-20 h-20 flex items-center justify-center text-5xl"
                            style={{
                              backgroundColor: colors.surface.primary,
                              boxShadow: shadows.md,
                            }}
                          >
                            {role.icon}
                          </div>
                        </div>

                        {/* Title */}
                        <h3
                          className="text-center mb-1"
                          style={{
                            ...typography.styles.h3,
                            color: colors.blue.primary,
                          }}
                        >
                          {role.title}
                        </h3>
                        <p
                          className="text-center mb-4"
                          style={{
                            fontFamily: typography.fonts.caption,
                            fontSize: typography.sizes.sm,
                            color: `${colors.blue.primary}70`,
                          }}
                        >
                          {role.subtitle}
                        </p>

                        {/* Price */}
                        <div className="text-center mb-6">
                          <div
                            className="inline-block px-4 py-2 rounded-full"
                            style={{
                              backgroundColor: `${colors.accent.gold}20`,
                            }}
                          >
                            <span
                              style={{
                                fontFamily: typography.fonts.subheading,
                                fontSize: typography.sizes.xl,
                                fontWeight: typography.weights.bold,
                                color: colors.blue.primary,
                              }}
                            >
                              {role.price}
                            </span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-3">
                          {role.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check 
                                className="w-5 h-5 flex-shrink-0 mt-0.5" 
                                style={{ color: colors.status.success }}
                              />
                              <span
                                style={{
                                  fontFamily: typography.fonts.caption,
                                  fontSize: typography.sizes.sm,
                                  color: colors.blue.primary,
                                  lineHeight: typography.lineHeights.relaxed,
                                }}
                              >
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Button */}
                        <div className="mt-6">
                          <DSButton
                            variant={role.recommended ? "primary" : "secondary"}
                            size="lg"
                            fullWidth
                            icon={<ChevronRight className="w-5 h-5" />}
                          >
                            {currentRole && role.id !== "producer" ? "Upgrade" : "Get Started"}
                          </DSButton>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Producer Plus Upgrade */}
          {step === "upgrade" && (
            <motion.div
              key="upgrade"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div 
                className="max-w-2xl mx-auto rounded-3xl p-8 md:p-12"
                style={{
                  backgroundColor: `${colors.surface.primary}90`,
                  backdropFilter: 'blur(16px)',
                  boxShadow: shadows['2xl'],
                  border: `1px solid ${colors.surface.primary}50`,
                }}
              >
                {/* Crown Icon */}
                <motion.div 
                  className="flex justify-center mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div
                    className="rounded-full w-24 h-24 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(to bottom right, ${colors.accent.gold}, ${colors.accent.goldDark})`,
                      boxShadow: shadows.goldLg,
                    }}
                  >
                    <Crown className="w-12 h-12 text-white" />
                  </div>
                </motion.div>

                <h2
                  className="text-center mb-4"
                  style={{
                    ...typography.styles.h1,
                    color: colors.blue.primary,
                  }}
                >
                  Upgrade to Producer Plus
                </h2>
                
                <p
                  className="text-center mb-8"
                  style={{
                    fontFamily: typography.fonts.caption,
                    fontSize: typography.sizes.base,
                    color: `${colors.blue.primary}70`,
                    lineHeight: typography.lineHeights.relaxed,
                  }}
                >
                  Unlock advanced features and grow your commodity trading business
                </p>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: <TrendingUp className="w-6 h-6" />, title: "Priority Visibility", desc: "Your listings appear higher" },
                    { icon: <Shield className="w-6 h-6" />, title: "Advanced Analytics", desc: "Detailed insights & reports" },
                    { icon: <Zap className="w-6 h-6" />, title: "Price Predictions", desc: "AI-powered trend forecasts" },
                    { icon: <Users className="w-6 h-6" />, title: "Bulk Management", desc: "Handle large orders easily" },
                  ].map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-2xl"
                      style={{
                        backgroundColor: `${colors.accent.gold}10`,
                        border: `1px solid ${colors.accent.gold}20`,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div style={{ color: colors.accent.gold }}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4
                          style={{
                            fontFamily: typography.fonts.subheading,
                            fontWeight: typography.weights.semibold,
                            fontSize: typography.sizes.base,
                            color: colors.blue.primary,
                          }}
                        >
                          {benefit.title}
                        </h4>
                        <p
                          style={{
                            fontFamily: typography.fonts.caption,
                            fontSize: typography.sizes.sm,
                            color: `${colors.blue.primary}70`,
                          }}
                        >
                          {benefit.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pricing */}
                <div 
                  className="text-center p-6 rounded-2xl mb-8"
                  style={{
                    background: `linear-gradient(to right, ${colors.accent.gold}20, ${colors.accent.goldDark}20)`,
                    border: `2px solid ${colors.accent.gold}`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: typography.fonts.caption,
                      fontSize: typography.sizes.sm,
                      color: `${colors.blue.primary}70`,
                    }}
                  >
                    Annual Subscription
                  </p>
                  <div className="flex items-center justify-center gap-2 my-2">
                    <span
                      style={{
                        fontFamily: typography.fonts.subheading,
                        fontSize: typography.sizes['4xl'],
                        fontWeight: typography.weights.bold,
                        color: colors.blue.primary,
                      }}
                    >
                      ₹999
                    </span>
                    <span
                      style={{
                        fontFamily: typography.fonts.caption,
                        fontSize: typography.sizes.base,
                        color: `${colors.blue.primary}70`,
                      }}
                    >
                      /year
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: typography.fonts.caption,
                      fontSize: typography.sizes.sm,
                      color: colors.status.success,
                      fontWeight: typography.weights.semibold,
                    }}
                  >
                    Save 30% vs monthly • Cancel anytime
                  </p>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <DSButton
                    onClick={handleUpgrade}
                    variant="primary"
                    size="xl"
                    fullWidth
                    icon={<Crown className="w-5 h-5" />}
                  >
                    Upgrade to Producer Plus
                  </DSButton>
                  <DSButton
                    onClick={() => setStep("select")}
                    variant="ghost"
                    size="lg"
                    fullWidth
                  >
                    Back to Options
                  </DSButton>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Commission Agent Setup */}
          {step === "commission" && (
            <motion.div
              key="commission"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div 
                className="max-w-2xl mx-auto rounded-3xl p-8 md:p-12"
                style={{
                  backgroundColor: `${colors.surface.primary}90`,
                  backdropFilter: 'blur(16px)',
                  boxShadow: shadows['2xl'],
                  border: `1px solid ${colors.surface.primary}50`,
                }}
              >
                <motion.div 
                  className="flex justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <div
                    className="rounded-full w-24 h-24 flex items-center justify-center text-5xl"
                    style={{
                      backgroundColor: colors.blue.primary,
                      boxShadow: shadows.lg,
                    }}
                  >
                    💼
                  </div>
                </motion.div>

                <h2
                  className="text-center mb-4"
                  style={{
                    ...typography.styles.h1,
                    color: colors.blue.primary,
                  }}
                >
                  Marketing & Procurement Agent
                </h2>
                
                <p
                  className="text-center mb-8"
                  style={{
                    fontFamily: typography.fonts.caption,
                    fontSize: typography.sizes.base,
                    color: `${colors.blue.primary}70`,
                    lineHeight: typography.lineHeights.relaxed,
                  }}
                >
                  Become a commission agent and manage trading on behalf of producers
                </p>

                {/* What You Can Do */}
                <div className="mb-8">
                  <h3
                    className="mb-4"
                    style={{
                      ...typography.styles.h3,
                      color: colors.blue.primary,
                    }}
                  >
                    What You Can Do:
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Buy/procure commodities from other producers",
                      "Sell on behalf of producers for better market prices",
                      "Add up to 5 trusted team members (OTP verified)",
                      "Access market yard and retail pricing",
                      "Track commissions and earnings",
                      "Manage multiple producer relationships",
                      "Advanced reporting and insights",
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Check 
                          className="w-5 h-5 flex-shrink-0 mt-0.5" 
                          style={{ color: colors.status.success }}
                        />
                        <span
                          style={{
                            fontFamily: typography.fonts.caption,
                            fontSize: typography.sizes.base,
                            color: colors.blue.primary,
                          }}
                        >
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div 
                  className="text-center p-6 rounded-2xl mb-8"
                  style={{
                    background: `linear-gradient(to right, ${colors.blue.primary}20, ${colors.blue.light}20)`,
                    border: `2px solid ${colors.blue.primary}`,
                  }}
                >
                  <div className="flex items-center justify-center gap-2 my-2">
                    <span
                      style={{
                        fontFamily: typography.fonts.subheading,
                        fontSize: typography.sizes['4xl'],
                        fontWeight: typography.weights.bold,
                        color: colors.blue.primary,
                      }}
                    >
                      ₹2,499
                    </span>
                    <span
                      style={{
                        fontFamily: typography.fonts.caption,
                        fontSize: typography.sizes.base,
                        color: `${colors.blue.primary}70`,
                      }}
                    >
                      /year
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <DSButton
                    onClick={handleCommissionSetup}
                    variant="primary"
                    size="xl"
                    fullWidth
                    icon={<Users className="w-5 h-5" />}
                  >
                    Continue to Team Setup
                  </DSButton>
                  <DSButton
                    onClick={() => setStep("select")}
                    variant="ghost"
                    size="lg"
                    fullWidth
                  >
                    Back to Options
                  </DSButton>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Team Member Management */}
          {step === "team" && (
            <motion.div
              key="team"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div 
                className="max-w-2xl mx-auto rounded-3xl p-8 md:p-12"
                style={{
                  backgroundColor: `${colors.surface.primary}90`,
                  backdropFilter: 'blur(16px)',
                  boxShadow: shadows['2xl'],
                  border: `1px solid ${colors.surface.primary}50`,
                }}
              >
                <motion.div 
                  className="flex justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Users 
                    className="w-16 h-16" 
                    style={{ color: colors.blue.primary }}
                  />
                </motion.div>

                <h2
                  className="text-center mb-4"
                  style={{
                    ...typography.styles.h1,
                    color: colors.blue.primary,
                  }}
                >
                  Add Team Members
                </h2>
                
                <p
                  className="text-center mb-8"
                  style={{
                    fontFamily: typography.fonts.caption,
                    fontSize: typography.sizes.base,
                    color: `${colors.blue.primary}70`,
                  }}
                >
                  Add up to 5 trusted members (optional - you can do this later)
                </p>

                {/* Current Team */}
                {teamMembers.length > 0 && (
                  <div className="mb-6">
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: typography.fonts.subheading,
                        fontWeight: typography.weights.semibold,
                        fontSize: typography.sizes.base,
                        color: colors.blue.primary,
                      }}
                    >
                      Team Members ({teamMembers.length}/5)
                    </h3>
                    <div className="space-y-2">
                      {teamMembers.map((member, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center justify-between p-4 rounded-xl"
                          style={{
                            backgroundColor: `${colors.status.success}10`,
                            border: `1px solid ${colors.status.success}30`,
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{
                                backgroundColor: colors.status.success,
                              }}
                            >
                              <Check className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p
                                style={{
                                  fontFamily: typography.fonts.subheading,
                                  fontWeight: typography.weights.semibold,
                                  fontSize: typography.sizes.base,
                                  color: colors.blue.primary,
                                }}
                              >
                                {member.name}
                              </p>
                              <p
                                style={{
                                  fontFamily: typography.fonts.caption,
                                  fontSize: typography.sizes.sm,
                                  color: `${colors.blue.primary}70`,
                                }}
                              >
                                +91 {member.mobile}
                              </p>
                            </div>
                          </div>
                          <motion.button
                            onClick={() => handleRemoveTeamMember(idx)}
                            className="p-2 rounded-full"
                            style={{
                              backgroundColor: `${colors.status.error}20`,
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <X className="w-4 h-4" style={{ color: colors.status.error }} />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Member */}
                {teamMembers.length < 5 && (
                  <div className="mb-8">
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: typography.fonts.subheading,
                        fontWeight: typography.weights.semibold,
                        fontSize: typography.sizes.base,
                        color: colors.blue.primary,
                      }}
                    >
                      {teamMembers.length > 0 ? "Add Another Member" : "Add Your First Member"}
                    </h3>
                    <div className="space-y-3">
                      <Input
                        placeholder="Full Name"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        className="h-12"
                      />
                      <Input
                        placeholder="Mobile Number (10 digits)"
                        value={newMemberMobile}
                        onChange={(e) => setNewMemberMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="h-12"
                        maxLength={10}
                      />
                      <DSButton
                        onClick={handleAddTeamMember}
                        variant="secondary"
                        size="lg"
                        fullWidth
                        isLoading={isAddingMember}
                        icon={<Plus className="w-5 h-5" />}
                      >
                        {isAddingMember ? "Sending OTP..." : "Add Member (OTP Verification)"}
                      </DSButton>
                    </div>
                    <p
                      className="mt-2 text-center"
                      style={{
                        fontFamily: typography.fonts.caption,
                        fontSize: typography.sizes.xs,
                        color: `${colors.blue.primary}50`,
                      }}
                    >
                      Member will receive OTP for consent verification
                    </p>
                  </div>
                )}

                <Separator className="my-6" />

                {/* Complete Setup */}
                <div className="space-y-3">
                  <DSButton
                    onClick={handleCompleteTeamSetup}
                    variant="primary"
                    size="xl"
                    fullWidth
                    icon={<Check className="w-5 h-5" />}
                  >
                    {teamMembers.length > 0 ? "Complete Setup" : "Skip & Complete Setup"}
                  </DSButton>
                  <DSButton
                    onClick={() => setStep("commission")}
                    variant="ghost"
                    size="lg"
                    fullWidth
                  >
                    Back
                  </DSButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
