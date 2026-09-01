import { useState } from "react";
import { motion } from "motion/react";
import { 
  User, Building2, ShoppingBag, TrendingUp, Warehouse, 
  Truck, Landmark, Shield, FileCheck, ChevronRight, 
  Users, Check, Info
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface EnhancedRoleSelectionProps {
  onRoleSelected: (roleId: string, isEntity: boolean) => void;
  onBack: () => void;
  userName?: string;
}

interface RoleOption {
  id: string;
  label: string;
  icon: any;
  description: string;
  isEntity: boolean;
  entitySubtitle?: string;
  color: string;
  gradient: string;
}

const roleOptions: RoleOption[] = [
  {
    id: "producer",
    label: "Producer",
    icon: User,
    description: "Individual farmer or agricultural producer",
    isEntity: false,
    color: "#10B981",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: "commission-agent",
    label: "Commission Agent",
    icon: Users,
    description: "Represent producers in commodity trading",
    isEntity: true,
    entitySubtitle: "Register your organization and manage authorized staff",
    color: "#3B82F6",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: "buyer",
    label: "Buyer",
    icon: ShoppingBag,
    description: "Purchase commodities for processing or resale",
    isEntity: true,
    entitySubtitle: "Register your organization and manage authorized staff",
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-600"
  },
  {
    id: "trader",
    label: "Trader",
    icon: TrendingUp,
    description: "Buy and sell commodities in the market",
    isEntity: true,
    entitySubtitle: "Register your organization and manage authorized staff",
    color: "#8B5CF6",
    gradient: "from-purple-500 to-violet-600"
  },
  {
    id: "storage",
    label: "Storage Provider",
    icon: Warehouse,
    description: "Warehouse and cold storage facilities",
    isEntity: true,
    entitySubtitle: "Register your organization and manage authorized staff",
    color: "#EC4899",
    gradient: "from-pink-500 to-rose-600"
  },
  {
    id: "logistics",
    label: "Logistics/Transport",
    icon: Truck,
    description: "Transportation and logistics services",
    isEntity: true,
    entitySubtitle: "Register your organization and manage authorized staff",
    color: "#14B8A6",
    gradient: "from-teal-500 to-cyan-600"
  },
  {
    id: "bank",
    label: "Bank / Financial Institution",
    icon: Landmark,
    description: "Financial services and credit providers",
    isEntity: true,
    entitySubtitle: "Register your organization and manage authorized staff",
    color: "#0EA5E9",
    gradient: "from-sky-500 to-blue-600"
  },
  {
    id: "insurance",
    label: "Insurance Company",
    icon: Shield,
    description: "Agricultural and commodity insurance",
    isEntity: true,
    entitySubtitle: "Register your organization and manage authorized staff",
    color: "#EF4444",
    gradient: "from-red-500 to-rose-600"
  },
  {
    id: "regulatory",
    label: "Regulatory Authority",
    icon: FileCheck,
    description: "Government oversight and compliance",
    isEntity: true,
    entitySubtitle: "Register your organization and manage authorized staff",
    color: "#6366F1",
    gradient: "from-indigo-500 to-purple-600"
  }
];

export function EnhancedRoleSelection({ onRoleSelected, onBack, userName }: EnhancedRoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const selectedRoleObj = roleOptions.find(r => r.id === selectedRole);

  const handleNext = () => {
    if (selectedRole) {
      const role = roleOptions.find(r => r.id === selectedRole);
      if (role) {
        onRoleSelected(selectedRole, role.isEntity);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4FC] to-[#D9F2FF] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#003E6D]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* Header */}
      <motion.header
        className="bg-white/80 backdrop-blur-lg border-b border-white/50 shadow-sm sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              ← Back
            </Button>
            <div className="flex items-center gap-2">
              <img src={tradieLogo} alt="TRADIE" className="w-10 h-10" />
              <span className="text-[#003E6D] font-bold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
                TRADIE
              </span>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-[#003E6D] mb-3" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "2.5rem" }}>
              Select Your Role or Entity Type
            </h1>
            {userName && (
              <p className="text-[#003E6D]/70 text-lg mb-4">
                Welcome, <span className="font-semibold text-[#003E6D]">{userName}</span>!
              </p>
            )}
            <p className="text-[#003E6D]/70 text-lg">
              Please choose your role or register your entity to continue
            </p>
          </div>

          {/* Info Alert */}
          <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Individual Producers:</strong> Select "Producer" for quick personal sign-up. 
              <br />
              <strong>Organizations:</strong> Select an entity type to register your organization and manage authorized staff members.
            </AlertDescription>
          </Alert>

          {/* Role Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roleOptions.map((role, index) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              const isHovered = hoveredRole === role.id;

              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredRole(role.id)}
                  onHoverEnd={() => setHoveredRole(null)}
                >
                  <Card
                    onClick={() => setSelectedRole(role.id)}
                    className={`relative p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                      isSelected 
                        ? "border-4 border-[#FFD700] shadow-2xl scale-105" 
                        : "border-2 border-[#003E6D]/10 hover:border-[#FFD700]/50"
                    }`}
                    style={{
                      background: isSelected || isHovered
                        ? `linear-gradient(to bottom right, ${role.color}10, ${role.color}05)`
                        : "white"
                    }}
                  >
                    {/* Selected Checkmark */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-6 h-6 text-white" />
                      </motion.div>
                    )}

                    {/* Entity Badge */}
                    {role.isEntity && (
                      <Badge 
                        className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                      >
                        Entity
                      </Badge>
                    )}

                    {/* Icon */}
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${role.color}20, ${role.color}10)`
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: role.color }} />
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-[#003E6D] mb-2"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.25rem" }}
                    >
                      {role.label}
                    </h3>

                    {/* Description */}
                    <p className="text-[#003E6D]/70 text-sm mb-3 min-h-[40px]">
                      {role.description}
                    </p>

                    {/* Entity Subtitle */}
                    {role.isEntity && role.entitySubtitle && (
                      <div className="pt-3 border-t border-[#003E6D]/10">
                        <div className="flex items-start gap-2">
                          <Building2 className="w-4 h-4 text-[#003E6D]/60 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-[#003E6D]/60 italic">
                            {role.entitySubtitle}
                          </p>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Selection Summary */}
          {selectedRoleObj && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 border-2 border-[#FFD700]/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${selectedRoleObj.color}, ${selectedRoleObj.color}CC)`
                      }}
                    >
                      <selectedRoleObj.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-[#003E6D]/70 mb-1">You selected:</p>
                      <h4 className="text-[#003E6D] font-semibold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {selectedRoleObj.label}
                      </h4>
                      <p className="text-xs text-[#003E6D]/60 mt-1">
                        {selectedRoleObj.isEntity ? "Organization Registration" : "Individual Sign-up"}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {selectedRoleObj.isEntity ? "🏢 Entity" : "👤 Individual"}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Fixed Bottom Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-[#003E6D]/10 shadow-2xl z-40"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${selectedRole ? "bg-green-500" : "bg-gray-300"}`}></div>
              <span className="text-sm text-[#003E6D]/70">
                {selectedRole ? "Role selected" : "Please select a role"}
              </span>
            </div>
            <Button
              onClick={handleNext}
              disabled={!selectedRole}
              className="h-12 px-8 bg-gradient-to-r from-[#003E6D] to-[#005A9C] hover:from-[#005A9C] hover:to-[#003E6D] text-white rounded-xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
