import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Info, CheckCircle2, Settings, AlertCircle, Crown } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { RoleIcon } from "./RoleIcons";

interface TradingRoleSelectionScreenProps {
  onNext: (selectedRoles: string[]) => void;
  onBack: () => void;
  userName?: string;
}

interface RoleDefinition {
  id: string;
  label: string;
  emoji: string;
  iconType: "producer" | "commission-agent" | "trader" | "buyer" | "verifier" | "bank" | "logistics";
  description: string;
  hasStaff: boolean;
  staffRoles?: string[];
  backOfficeAccess: boolean;
  permissions: string[];
  isPremium?: boolean;
}

const roles: RoleDefinition[] = [
  {
    id: "producer",
    label: "Producer",
    emoji: "🧑‍🌾",
    iconType: "producer",
    description: "Grow and sell commodities directly. Access to listings, market prices, and direct sales.",
    hasStaff: false,
    backOfficeAccess: false,
    permissions: ["Create listings", "View market prices", "Direct sales", "Track shipments"],
    isPremium: false,
  },
  {
    id: "commission-agent",
    label: "Commission Agent (on behalf of producers)",
    emoji: "🧾",
    iconType: "commission-agent",
    description: "Represent producers in trades. Access to live auctions, settlements, and producer management.",
    hasStaff: true,
    staffRoles: ["Marketing Agent", "Procurement Agent", "Settlement Officer", "Field Agent"],
    backOfficeAccess: true,
    permissions: ["Producer management", "Commission tracking", "Auction participation", "Settlement processing"],
  },
  {
    id: "commission-agent-staff",
    label: "Staff of Commission Agent",
    emoji: "🧑‍💼",
    iconType: "commission-agent",
    description: "Support commission agent operations with assigned permissions.",
    hasStaff: false,
    backOfficeAccess: true,
    permissions: ["Limited producer access", "Report generation", "Data entry", "Customer support"],
  },
  {
    id: "trader",
    label: "Trader",
    emoji: "💰",
    iconType: "trader",
    description: "Buy and sell commodities for profit. Access to live auctions, settlements, finance, and storage records.",
    hasStaff: true,
    staffRoles: ["Trading Analyst", "Risk Manager", "Settlement Officer", "Operations Manager"],
    backOfficeAccess: true,
    permissions: ["Live auctions", "Portfolio management", "Finance tracking", "Storage access", "Market analytics"],
  },
  {
    id: "trader-staff",
    label: "Staff of Trader",
    emoji: "🏢",
    iconType: "trader",
    description: "Assist in trading operations with specific permissions assigned by trader.",
    hasStaff: false,
    backOfficeAccess: true,
    permissions: ["Trade execution", "Report viewing", "Data analysis", "Customer coordination"],
  },
  {
    id: "buyer",
    label: "Buyer",
    emoji: "🛒",
    iconType: "buyer",
    description: "Purchase commodities for use. Browse listings, direct purchase, and delivery tracking.",
    hasStaff: true,
    staffRoles: ["Procurement Manager", "Quality Inspector", "Logistics Coordinator", "Payment Officer"],
    backOfficeAccess: true,
    permissions: ["Browse listings", "Place orders", "Track deliveries", "Payment processing", "Quality checks"],
  },
  {
    id: "buyer-staff",
    label: "Staff of Buyer",
    emoji: "🧾",
    iconType: "buyer",
    description: "Support buying operations with delegated permissions.",
    hasStaff: false,
    backOfficeAccess: true,
    permissions: ["Order tracking", "Vendor communication", "Report generation", "Delivery coordination"],
  },
  {
    id: "verifier",
    label: "3rd Party Verifier",
    emoji: "🧩",
    iconType: "verifier",
    description: "Verify quality and authenticity. Issue certification, generate reports, and conduct inspections.",
    hasStaff: true,
    staffRoles: ["Quality Inspector", "Lab Technician", "Certification Officer", "Field Auditor"],
    backOfficeAccess: true,
    permissions: ["Quality certification", "Inspection reports", "Lab testing", "Compliance verification"],
  },
  {
    id: "bank",
    label: "Bank / Financial Institution",
    emoji: "🏦",
    iconType: "bank",
    description: "Provide financial services. Loan management, payment processing, and credit assessment.",
    hasStaff: true,
    staffRoles: ["Loan Officer", "Credit Analyst", "Payment Processor", "Compliance Officer"],
    backOfficeAccess: true,
    permissions: ["Loan management", "Payment gateway", "Credit scoring", "Risk assessment", "Transaction monitoring"],
  },
  {
    id: "bank-staff",
    label: "Staff of Bank / Financial Institution",
    emoji: "🧍‍♂️",
    iconType: "bank",
    description: "Support banking operations with role-based access.",
    hasStaff: false,
    backOfficeAccess: true,
    permissions: ["Customer verification", "Document processing", "Report generation", "Customer support"],
  },
  {
    id: "logistics",
    label: "Logistics / Transporter",
    emoji: "🚚",
    iconType: "logistics",
    description: "Handle commodity transportation. Route optimization, fleet management, and tracking system.",
    hasStaff: true,
    staffRoles: ["Fleet Manager", "Dispatch Officer", "Driver Coordinator", "Operations Manager"],
    backOfficeAccess: true,
    permissions: ["Route planning", "Fleet tracking", "Delivery scheduling", "Driver management", "Invoice processing"],
  },
  {
    id: "logistics-staff",
    label: "Staff of Logistics / Transporter",
    emoji: "🧍‍♀️",
    iconType: "logistics",
    description: "Assist in logistics operations with assigned permissions.",
    hasStaff: false,
    backOfficeAccess: true,
    permissions: ["Delivery tracking", "Driver coordination", "Customer updates", "Documentation"],
  },
  {
    id: "storage",
    label: "Storage Facility",
    emoji: "🏠",
    iconType: "logistics",
    description: "Manage warehousing and storage. Inventory tracking, quality preservation, and stock management.",
    hasStaff: true,
    staffRoles: ["Warehouse Manager", "Inventory Officer", "Quality Controller", "Security Officer"],
    backOfficeAccess: true,
    permissions: ["Inventory management", "Storage allocation", "Quality monitoring", "Stock reports", "Billing"],
  },
  {
    id: "storage-staff",
    label: "Staff of Storage Facility",
    emoji: "🧑‍🏭",
    iconType: "logistics",
    description: "Support storage operations with delegated access.",
    hasStaff: false,
    backOfficeAccess: true,
    permissions: ["Stock entry", "Quality checks", "Report generation", "Customer service"],
  },
  {
    id: "insurance",
    label: "Insurance Company",
    emoji: "🛡️",
    iconType: "bank",
    description: "Provide insurance coverage for commodities and shipments. Risk assessment and claims processing.",
    hasStaff: true,
    staffRoles: ["Underwriter", "Claims Officer", "Risk Assessor", "Policy Manager"],
    backOfficeAccess: true,
    permissions: ["Policy issuance", "Claims processing", "Risk evaluation", "Premium calculation", "Damage assessment"],
  },
  {
    id: "regulatory",
    label: "Regulatory Authority",
    emoji: "🧑‍💻",
    iconType: "verifier",
    description: "Monitor and regulate trading activities. Ensure compliance and enforce standards.",
    hasStaff: true,
    staffRoles: ["Compliance Officer", "Auditor", "Legal Advisor", "Enforcement Officer"],
    backOfficeAccess: true,
    permissions: ["Platform audits", "Compliance monitoring", "License verification", "Enforcement actions", "Reporting"],
  },
];

export function TradingRoleSelectionScreen({
  onNext,
  onBack,
  userName = "User",
}: TradingRoleSelectionScreenProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleRoleToggle = (roleId: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleContinue = () => {
    if (selectedRoles.length > 0 && confirmed) {
      onNext(selectedRoles);
    }
  };

  const selectedRoleData = roles.filter((role) =>
    selectedRoles.includes(role.id)
  );

  const hasProducerRole = selectedRoles.includes("producer");
  const hasBackOfficeRole = selectedRoleData.some((role) => role.backOfficeAccess);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
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
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <h1
            className="text-[#003E6D] mb-2"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "2.5rem",
            }}
          >
            📊 Select Your Trading Role(s)
          </h1>
          <p
            className="text-[#003E6D]/70 text-lg max-w-3xl mx-auto mb-2"
            style={{
              fontFamily: "Inter, sans-serif",
              lineHeight: "1.6",
            }}
          >
            You can switch roles anytime. Back-office features are available for all except producers, unless upgraded to Platinum Membership.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#003E6D]/5 rounded-full border border-[#003E6D]/20">
            <Settings className="w-4 h-4 text-[#003E6D]/60" />
            <p
              className="text-[#003E6D]/60 text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ⚙️ You can switch roles anytime in Settings
            </p>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div variants={itemVariants} className="mb-6">
          <Alert className="bg-gradient-to-r from-[#003E6D]/5 to-[#FFD700]/5 border-[#003E6D]/20">
            <Info className="h-5 w-5 text-[#003E6D]" />
            <AlertDescription
              className="text-[#003E6D]"
              style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.7" }}
            >
              <strong className="block mb-2">💡 Important Information:</strong>
              You can take multiple roles — for yourself or for your organization. Producers can later upgrade to marketing or procurement agents. Back-office is available for traders, buyers, financial, and logistics roles.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Producer Note */}
        {hasProducerRole && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6"
          >
            <Alert className="bg-gradient-to-r from-[#FFD700]/10 to-[#FFC700]/10 border-[#FFD700]/50">
              <Crown className="h-5 w-5 text-[#FFD700]" />
              <AlertDescription
                className="text-[#003E6D]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <strong>🧑‍🌾 Producer Note:</strong> Producers may request{" "}
                <span className="text-[#FFD700] font-semibold">
                  Platinum Membership
                </span>{" "}
                to unlock Back-Office features including advanced analytics, team management, and automation tools.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Role Selection Grid - 2/3 width */}
          <div className="lg:col-span-2">
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 backdrop-blur-sm border-[#003E6D]/20 p-6 shadow-xl">
                <h2
                  className="text-[#003E6D] mb-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "1.25rem",
                  }}
                >
                  Available Roles
                </h2>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {roles.map((role) => {
                    const isSelected = selectedRoles.includes(role.id);
                    const isHovered = hoveredRole === role.id;

                    return (
                      <motion.div
                        key={role.id}
                        whileHover={{ x: 4 }}
                        onHoverStart={() => setHoveredRole(role.id)}
                        onHoverEnd={() => setHoveredRole(null)}
                      >
                        <Card
                          onClick={() => handleRoleToggle(role.id)}
                          className={`cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? "border-[#FFD700] border-2 bg-gradient-to-r from-[#FFD700]/10 to-white shadow-lg"
                              : "border-[#003E6D]/20 hover:border-[#FFD700]/50 bg-white"
                          }`}
                        >
                          <div className="p-4 flex items-center gap-4">
                            {/* Checkbox */}
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => handleRoleToggle(role.id)}
                              className="border-[#003E6D]/30"
                            />

                            {/* Role Emoji */}
                            <div
                              className={`text-3xl transition-transform duration-200 ${
                                isHovered ? "scale-110" : "scale-100"
                              }`}
                            >
                              {role.emoji}
                            </div>

                            {/* Role Info */}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3
                                  className="text-[#003E6D]"
                                  style={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 600,
                                    fontSize: "0.95rem",
                                  }}
                                >
                                  {role.label}
                                </h3>
                                {role.backOfficeAccess && (
                                  <Badge
                                    variant="outline"
                                    className="border-[#003E6D]/30 text-[#003E6D] text-xs"
                                  >
                                    Back-Office
                                  </Badge>
                                )}
                                {role.hasStaff && (
                                  <Badge
                                    variant="outline"
                                    className="border-[#FFD700]/50 text-[#FFD700] text-xs"
                                  >
                                    Staff Available
                                  </Badge>
                                )}
                              </div>
                              <p
                                className="text-[#003E6D]/70 text-sm line-clamp-1"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                {role.description}
                              </p>
                            </div>

                            {/* Selected Indicator */}
                            {isSelected && (
                              <CheckCircle2 className="w-6 h-6 text-[#FFD700]" />
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Dynamic Role Info Panel - 1/3 width */}
          <div className="lg:col-span-1">
            <motion.div variants={itemVariants} className="sticky top-6">
              <Card className="bg-gradient-to-br from-white/90 to-[#FFD700]/5 backdrop-blur-sm border-[#003E6D]/20 p-6 shadow-xl">
                <h2
                  className="text-[#003E6D] mb-4 flex items-center gap-2"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "1.25rem",
                  }}
                >
                  <Info className="w-5 h-5" />
                  Selected Roles
                </h2>

                <AnimatePresence mode="wait">
                  {selectedRoleData.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                    >
                      <AlertCircle className="w-12 h-12 text-[#003E6D]/30 mx-auto mb-3" />
                      <p
                        className="text-[#003E6D]/60 text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Select one or more roles to see details
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="selected"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4 max-h-[500px] overflow-y-auto pr-2"
                    >
                      {selectedRoleData.map((role) => (
                        <Card
                          key={role.id}
                          className="bg-white border-[#FFD700]/30 p-4"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="text-2xl">{role.emoji}</div>
                            <div className="flex-1">
                              <h3
                                className="text-[#003E6D] mb-1"
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontWeight: 600,
                                  fontSize: "0.95rem",
                                }}
                              >
                                {role.label}
                              </h3>
                              <p
                                className="text-[#003E6D]/70 text-xs mb-3"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                {role.description}
                              </p>
                            </div>
                          </div>

                          {/* Permissions */}
                          <div className="mb-3">
                            <p
                              className="text-[#003E6D] text-xs mb-2"
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 600,
                              }}
                            >
                              Permissions:
                            </p>
                            <div className="space-y-1">
                              {role.permissions.slice(0, 3).map((permission, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-[#FFD700] mt-0.5 flex-shrink-0" />
                                  <span
                                    className="text-[#003E6D]/80 text-xs"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                  >
                                    {permission}
                                  </span>
                                </div>
                              ))}
                              {role.permissions.length > 3 && (
                                <p
                                  className="text-[#003E6D]/50 text-xs italic ml-5"
                                  style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                  +{role.permissions.length - 3} more...
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Staff Roles */}
                          {role.hasStaff && role.staffRoles && (
                            <div className="border-t border-[#003E6D]/10 pt-3">
                              <p
                                className="text-[#003E6D] text-xs mb-2"
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontWeight: 600,
                                }}
                              >
                                Staff Roles You Can Assign:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {role.staffRoles.map((staffRole, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="border-[#003E6D]/20 text-[#003E6D] text-xs"
                                  >
                                    {staffRole}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </Card>
                      ))}

                      {/* Summary */}
                      <div className="border-t border-[#003E6D]/20 pt-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span
                              className="text-[#003E6D]/70 text-sm"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              Total Roles:
                            </span>
                            <Badge className="bg-[#003E6D] text-white">
                              {selectedRoleData.length}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span
                              className="text-[#003E6D]/70 text-sm"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              Back-Office Access:
                            </span>
                            <Badge
                              className={
                                hasBackOfficeRole
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-400 text-white"
                              }
                            >
                              {hasBackOfficeRole ? "Yes" : "No"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        {selectedRoleData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card className="bg-gradient-to-r from-[#003E6D]/5 to-[#FFD700]/5 border-[#003E6D]/20 p-6">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="confirm"
                  checked={confirmed}
                  onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                  className="mt-1"
                />
                <label
                  htmlFor="confirm"
                  className="text-[#003E6D] cursor-pointer flex-1"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "1.6",
                  }}
                >
                  ✅ I confirm I understand my responsibilities for the selected role(s) and agree to comply with all platform guidelines and regulatory requirements.
                </label>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="mt-6 flex gap-4 justify-center">
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
            disabled={selectedRoleData.length === 0 || !confirmed}
            className="px-8 py-6 bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-white rounded-xl transition-all hover:shadow-xl hover:shadow-[#FFD700]/40 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            Continue with {selectedRoleData.length} Role{selectedRoleData.length !== 1 ? "s" : ""}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Help Text */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <p
            className="text-[#003E6D]/50 text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            💡 Next step: Subscription selection or role-specific KYC verification
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
