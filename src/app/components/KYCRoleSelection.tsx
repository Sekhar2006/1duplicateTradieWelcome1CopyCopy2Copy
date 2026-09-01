import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Card } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { RoleIcon } from "./RoleIcons";

interface KYCRoleSelectionProps {
  onNext: (roles: string[]) => void;
  onBack: () => void;
}

const roles = [
  {
    id: "producer",
    label: "Producer",
    iconType: "producer",
    description: "Grow and sell commodities directly",
  },
  {
    id: "commission-agent",
    label: "Commission Agent (on behalf of producers)",
    iconType: "commission-agent",
    description: "Represent producers in trades",
  },
  {
    id: "commission-agent-staff",
    label: "Staff of Commission Agent (assign roles)",
    iconType: "commission-agent",
    description: "Support commission agent operations",
  },
  {
    id: "trader",
    label: "Trader",
    iconType: "trader",
    description: "Buy and sell commodities for profit",
  },
  {
    id: "trader-staff",
    label: "Trader Staff (assign roles)",
    iconType: "trader",
    description: "Support trading operations",
  },
  {
    id: "buyer",
    label: "Buyer",
    iconType: "buyer",
    description: "Purchase commodities for use",
  },
  {
    id: "buyer-staff",
    label: "Buyer Staff (assign roles)",
    iconType: "buyer",
    description: "Support buying operations",
  },
  {
    id: "verifier",
    label: "3rd Party Verifier",
    iconType: "verifier",
    description: "Verify quality and authenticity",
  },
  {
    id: "bank",
    label: "Bank / Financial Institution",
    iconType: "bank",
    description: "Provide financial services",
  },
  {
    id: "bank-staff",
    label: "Staff of Bank / Financial Institution (assign roles)",
    iconType: "bank",
    description: "Support banking operations",
  },
  {
    id: "logistics",
    label: "Logistics / Transporter",
    iconType: "logistics",
    description: "Handle commodity transportation",
  },
  {
    id: "logistics-staff",
    label: "Staff of Logistics / Transporter (assign roles)",
    iconType: "logistics",
    description: "Support logistics operations",
  },
  {
    id: "storage",
    label: "Storage Facility",
    iconType: "storage",
    description: "Provide storage and warehousing",
  },
  {
    id: "storage-staff",
    label: "Staff of Storage Facility (assign roles)",
    iconType: "storage",
    description: "Manage storage operations",
  },
  {
    id: "insurance",
    label: "Insurance Company",
    iconType: "insurance",
    description: "Provide commodity insurance",
  },
  {
    id: "regulatory",
    label: "Regulatory Authority",
    iconType: "regulatory",
    description: "Oversee and regulate trades",
  },
];

export function KYCRoleSelection({ onNext, onBack }: KYCRoleSelectionProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleRoleToggle = (roleId: string) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleContinue = () => {
    if (selectedRoles.length > 0) {
      onNext(selectedRoles);
    }
  };

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
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Info Card */}
      <motion.div variants={itemVariants}>
        <Alert className="bg-gradient-to-br from-[#FFD700]/10 to-[#003E6D]/10 border-[#FFD700]/30">
          <Info className="w-5 h-5 text-[#003E6D]" />
          <AlertDescription
            className="text-[#003E6D] ml-2"
            style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}
          >
            <p className="mb-2">
              <strong style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                You can switch roles anytime.
              </strong>
            </p>
            <p className="text-sm">
              Each role helps build the commodity ecosystem — choose how you participate. Back-office
              tools are available for all roles except Producers, unless upgraded to Platinum
              Membership or on special request.
            </p>
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* Role Selection Grid */}
      <div className="grid grid-cols-1 gap-3">
        {roles.map((role, index) => (
          <motion.div
            key={role.id}
            variants={itemVariants}
            custom={index}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Card
              className={`p-4 cursor-pointer transition-all border-2 ${
                selectedRoles.includes(role.id)
                  ? "bg-gradient-to-br from-[#FFD700]/10 to-[#FFC700]/5 border-[#FFD700] shadow-lg"
                  : "bg-white border-[#003E6D]/10 hover:border-[#FFD700]/50 hover:shadow-md"
              }`}
              onClick={() => handleRoleToggle(role.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={role.id}
                  checked={selectedRoles.includes(role.id)}
                  onCheckedChange={() => handleRoleToggle(role.id)}
                  className="mt-1 border-[#003E6D]/30"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <RoleIcon type={role.iconType} size="md" />
                    <label
                      htmlFor={role.id}
                      className="text-[#003E6D] cursor-pointer"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                    >
                      {role.label}
                    </label>
                  </div>
                  <p
                    className="text-[#003E6D]/70 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {role.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Selected Count */}
      {selectedRoles.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <p
            className="text-[#003E6D]/70"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
          >
            <span
              className="text-[#FFD700]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              {selectedRoles.length}
            </span>{" "}
            {selectedRoles.length === 1 ? "role" : "roles"} selected
          </p>
        </motion.div>
      )}

      {/* Continue Button */}
      <motion.div variants={itemVariants}>
        <Button
          onClick={handleContinue}
          disabled={selectedRoles.length === 0}
          className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-white rounded-xl py-6 transition-all hover:shadow-xl hover:shadow-[#FFD700]/40 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem" }}
        >
          Complete Setup
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}