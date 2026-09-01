import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Info, CheckCircle2, Shield, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { RoleIcon } from "./RoleIcons";
import { Badge } from "./ui/badge";

interface RoleSelectionScreenProps {
  onRoleSelected: (roleId: string) => void;
  onBack: () => void;
  userName?: string;
}

const roles = [
  {
    id: "producer",
    label: "Producer",
    iconType: "producer" as const,
    description: "Grow and sell commodities directly",
    pricing: "FREE",
    features: ["Direct market access", "Price tracking", "Basic analytics"],
    kycRequired: "Basic + Identity Verification",
    recommended: true,
  },
  {
    id: "commission-agent",
    label: "Commission Agent",
    iconType: "commission-agent" as const,
    description: "Represent producers in trades",
    pricing: "₹2,499/year",
    features: ["Producer management", "Commission tracking", "Advanced tools"],
    kycRequired: "Enhanced KYC + Business Verification",
    recommended: false,
  },
  {
    id: "trader",
    label: "Trader",
    iconType: "trader" as const,
    description: "Buy and sell commodities for profit",
    pricing: "₹1,999/year",
    features: ["Market analytics", "Trading tools", "Portfolio management"],
    kycRequired: "Standard KYC + Financial Verification",
    recommended: false,
  },
  {
    id: "buyer",
    label: "Buyer",
    iconType: "buyer" as const,
    description: "Purchase commodities for use",
    pricing: "FREE",
    features: ["Browse listings", "Direct purchase", "Delivery tracking"],
    kycRequired: "Basic KYC",
    recommended: false,
  },
  {
    id: "verifier",
    label: "3rd Party Verifier",
    iconType: "verifier" as const,
    description: "Verify quality and authenticity",
    pricing: "₹4,999/year",
    features: ["Quality certification", "Report generation", "Verification tools"],
    kycRequired: "Professional KYC + Certification",
    recommended: false,
  },
  {
    id: "bank",
    label: "Bank / Financial Institution",
    iconType: "bank" as const,
    description: "Provide financial services",
    pricing: "Custom",
    features: ["Loan management", "Payment processing", "Credit assessment"],
    kycRequired: "Institutional KYC + RBI Compliance",
    recommended: false,
  },
  {
    id: "logistics",
    label: "Logistics / Transporter",
    iconType: "logistics" as const,
    description: "Handle commodity transportation",
    pricing: "₹1,499/year",
    features: ["Route optimization", "Fleet management", "Tracking system"],
    kycRequired: "Business KYC + Vehicle Registration",
    recommended: false,
  },
];

export function RoleSelectionScreen({ 
  onRoleSelected, 
  onBack,
  userName = "User"
}: RoleSelectionScreenProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelected(selectedRole);
    }
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole);

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
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4F8] to-[#D9F2FF] p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#003E6D]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#003E6D] to-[#005A9C] rounded-full mb-4 shadow-lg">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1
            className="text-[#003E6D] mb-3"
            style={{ 
              fontFamily: "Playfair Display, serif", 
              fontWeight: 700, 
              fontSize: "2.5rem" 
            }}
          >
            Welcome, {userName}! 👋
          </h1>
          <p
            className="text-[#003E6D]/70 text-lg max-w-2xl mx-auto"
            style={{ 
              fontFamily: "Inter, sans-serif", 
              lineHeight: "1.6"
            }}
          >
            Choose your role to get started on the TRADIE platform. You can add more roles later.
          </p>
        </motion.div>

        {/* Info Alert */}
        <motion.div variants={itemVariants} className="mb-6">
          <Alert className="bg-gradient-to-r from-[#003E6D]/5 to-[#FFD700]/5 border-[#003E6D]/20">
            <Info className="h-4 w-4 text-[#003E6D]" />
            <AlertDescription className="text-[#003E6D]" style={{ fontFamily: "Inter, sans-serif" }}>
              <strong>Important:</strong> Each role requires specific KYC verification. Choose the role that best matches your primary activity.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Role Cards Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        >
          {roles.map((role) => {
            const isSelected = selectedRole === role.id;
            const isHovered = hoveredRole === role.id;

            return (
              <motion.div
                key={role.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredRole(role.id)}
                onHoverEnd={() => setHoveredRole(null)}
              >
                <Card
                  onClick={() => handleRoleSelect(role.id)}
                  className={`cursor-pointer transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? "border-[#FFD700] border-2 shadow-xl shadow-[#FFD700]/30 bg-gradient-to-br from-[#FFD700]/10 to-white"
                      : "border-[#003E6D]/20 hover:border-[#FFD700]/50 bg-white/80 backdrop-blur-sm"
                  }`}
                >
                  {/* Recommended Badge */}
                  {role.recommended && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-gradient-to-r from-[#FFD700] to-[#FFC700] text-white border-0">
                        Recommended
                      </Badge>
                    </div>
                  )}

                  {/* Selected Checkmark */}
                  {isSelected && (
                    <div className="absolute top-3 left-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    {/* Role Icon */}
                    <div className="flex justify-center">
                      <div className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                        <RoleIcon 
                          type={role.iconType} 
                          size={64} 
                          gradient={isSelected}
                        />
                      </div>
                    </div>

                    {/* Role Info */}
                    <div className="text-center space-y-2">
                      <h3
                        className="text-[#003E6D]"
                        style={{ 
                          fontFamily: "Poppins, sans-serif", 
                          fontWeight: 600,
                          fontSize: "1.25rem"
                        }}
                      >
                        {role.label}
                      </h3>
                      <p
                        className="text-[#003E6D]/70 text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {role.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="text-center py-2">
                      <span
                        className={`inline-block px-4 py-2 rounded-full ${
                          role.pricing === "FREE"
                            ? "bg-green-100 text-green-700"
                            : "bg-[#003E6D]/10 text-[#003E6D]"
                        }`}
                        style={{ 
                          fontFamily: "Poppins, sans-serif", 
                          fontWeight: 600,
                          fontSize: "0.9rem"
                        }}
                      >
                        {role.pricing}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 border-t border-[#003E6D]/10 pt-4">
                      {role.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                          <span
                            className="text-[#003E6D]/80 text-xs"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* KYC Required */}
                    <div className="border-t border-[#003E6D]/10 pt-4">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-[#003E6D]/60 mt-0.5 flex-shrink-0" />
                        <div>
                          <p
                            className="text-[#003E6D]/60 text-xs"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            <strong>KYC Required:</strong> {role.kycRequired}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Selected Role Summary */}
        {selectedRoleData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="bg-gradient-to-r from-[#003E6D]/5 to-[#FFD700]/5 border-[#FFD700]/50 p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full flex items-center justify-center shadow-lg">
                  <RoleIcon type={selectedRoleData.iconType} size={32} />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-[#003E6D] mb-1"
                    style={{ 
                      fontFamily: "Poppins, sans-serif", 
                      fontWeight: 600,
                      fontSize: "1.25rem"
                    }}
                  >
                    Selected: {selectedRoleData.label}
                  </h3>
                  <p
                    className="text-[#003E6D]/70 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Next: Complete {selectedRoleData.kycRequired} to unlock all features
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="text-[#003E6D] text-sm mb-1"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    {selectedRoleData.pricing}
                  </p>
                  <Badge variant="outline" className="border-[#FFD700] text-[#003E6D]">
                    Ready to Continue
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex gap-4 justify-center">
          <Button
            onClick={onBack}
            variant="outline"
            className="px-8 py-6 border-[#003E6D]/20 text-[#003E6D] hover:border-[#003E6D] hover:bg-[#003E6D]/5 rounded-xl"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            ← Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="px-8 py-6 bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-white rounded-xl transition-all hover:shadow-xl hover:shadow-[#FFD700]/40 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            {selectedRole ? `Continue as ${selectedRoleData?.label}` : "Select a Role"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Help Text */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <p
            className="text-[#003E6D]/50 text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            💡 You can add additional roles later from your account settings
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
