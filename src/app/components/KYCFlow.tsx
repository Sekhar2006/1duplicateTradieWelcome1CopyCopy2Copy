import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { KYCBasicDetails } from "./KYCBasicDetails";
import { KYCIDVerification } from "./KYCIDVerification";
import { KYCRoleSelection } from "./KYCRoleSelection";
import { RoleUpgradeFlow } from "./RoleUpgradeFlow";
import { KYCCompletion } from "./KYCCompletion";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface KYCFlowProps {
  onComplete: () => void;
  useSimplifiedFlow?: boolean; // Use new role upgrade flow
  onBack?: () => void; // Navigate back to previous screen
  selectedUserRole?: string | null; // User's selected role from RoleSelectionScreen
}

type KYCStep = "basic" | "verification" | "roles" | "role-upgrade" | "completion";

export function KYCFlow({ onComplete, useSimplifiedFlow = true, onBack, selectedUserRole }: KYCFlowProps) {
  const [currentStep, setCurrentStep] = useState<KYCStep>("basic");
  const [basicData, setBasicData] = useState<any>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  const steps = useSimplifiedFlow
    ? [
        { id: "basic", label: "Basic Details" },
        { id: "verification", label: "ID Verification" },
        { id: "role-upgrade", label: "Choose Role" },
        { id: "completion", label: "Complete" },
      ]
    : [
        { id: "basic", label: "Basic Details" },
        { id: "verification", label: "ID Verification" },
        { id: "roles", label: "Role Selection" },
        { id: "completion", label: "Complete" },
      ];

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleBasicDetailsNext = (data: any) => {
    setBasicData(data);
    setCurrentStep("verification");
  };

  const handleVerificationNext = () => {
    // Check if user is NOT a producer - go to entity onboarding
    if (selectedUserRole && selectedUserRole !== "producer") {
      // For non-producers, go to entity onboarding instead of completion
      setCurrentStep("completion");
    } else if (useSimplifiedFlow) {
      // For producers or no role selected, show role upgrade flow
      setCurrentStep("role-upgrade");
    } else {
      setCurrentStep("roles");
    }
  };

  const handleRolesNext = (roles: string[]) => {
    setSelectedRoles(roles);
    setCurrentStep("completion");
  };

  const handleRoleUpgradeComplete = (role: string, members?: any[]) => {
    setSelectedRole(role);
    setSelectedRoles([role]);
    if (members) {
      setTeamMembers(members);
    }
    setCurrentStep("completion");
  };

  const handleBack = () => {
    if (currentStep === "basic") {
      // If on the first step and onBack is provided, go back to previous screen
      if (onBack) {
        onBack();
      }
    } else if (currentStep === "verification") {
      setCurrentStep("basic");
    } else if (currentStep === "roles" || currentStep === "role-upgrade") {
      setCurrentStep("verification");
    }
  };

  const handleEditDetails = () => {
    setCurrentStep("basic");
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4FC] to-[#D9F2FF] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#003E6D]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            {/* Back Button */}
            {currentStep !== "completion" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="text-[#003E6D] hover:bg-[#003E6D]/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            {currentStep === "completion" && <div className="w-10"></div>}

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#FFD700] blur-lg opacity-40"></div>
                <img src={tradieLogo} alt="TRADIE" className="relative w-10 h-10" />
              </div>
              <span
                className="text-[#003E6D]"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.125rem" }}
              >
                TRADIE
              </span>
            </div>

            {/* Help Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-[#003E6D] hover:bg-[#003E6D]/10"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          {currentStep !== "completion" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p
                  className="text-[#003E6D]/70 text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Step {currentStepIndex + 1} of {steps.length - 1}
                </p>
                <p
                  className="text-[#003E6D] text-sm"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  {Math.round((currentStepIndex / (steps.length - 1)) * 100)}%
                </p>
              </div>
              <Progress value={(currentStepIndex / (steps.length - 1)) * 100} className="h-2" />
            </div>
          )}
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8 mb-6">
          {/* Step Title */}
          {currentStep !== "completion" && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1
                className="text-[#003E6D] text-2xl md:text-3xl mb-2"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                {currentStep === "basic" && "Complete Your KYC"}
                {currentStep === "verification" && "Upload or Link Your IDs"}
                {currentStep === "roles" && "Select Your Role(s)"}
                {currentStep === "role-upgrade" && "Choose Your Role"}
              </h1>
              {currentStep === "roles" && (
                <p
                  className="text-[#003E6D]/70"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  You can switch roles anytime
                </p>
              )}
            </motion.div>
          )}

          {/* Step Content with Animation */}
          <AnimatePresence mode="wait">
            {currentStep === "basic" && (
              <motion.div
                key="basic"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <KYCBasicDetails 
                  onNext={handleBasicDetailsNext} 
                  onBack={handleBack}
                  userRole={selectedUserRole || selectedRole || undefined}
                />
              </motion.div>
            )}

            {currentStep === "verification" && (
              <motion.div
                key="verification"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <KYCIDVerification onNext={handleVerificationNext} onBack={handleBack} />
              </motion.div>
            )}

            {currentStep === "roles" && (
              <motion.div
                key="roles"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <KYCRoleSelection onNext={handleRolesNext} onBack={handleBack} />
              </motion.div>
            )}

            {currentStep === "role-upgrade" && (
              <motion.div
                key="role-upgrade"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <RoleUpgradeFlow
                  onComplete={handleRoleUpgradeComplete}
                  onBack={handleBack}
                />
              </motion.div>
            )}

            {currentStep === "completion" && (
              <motion.div
                key="completion"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <KYCCompletion onGoToDashboard={onComplete} onEditDetails={handleEditDetails} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {currentStep !== "completion" && (
          <motion.footer
            className="text-center px-4 py-3 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p
              className="text-[#003E6D]/70 text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Need help?{" "}
              <a
                href="#"
                className="text-[#003E6D] hover:text-[#FFD700] underline decoration-2 underline-offset-2 transition-colors"
              >
                Contact Support
              </a>
            </p>
            <button
              onClick={onComplete}
              className="mt-2 text-[#003E6D]/50 hover:text-[#003E6D] text-xs underline"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Skip KYC for now (Limited access)
            </button>
          </motion.footer>
        )}
      </main>
    </div>
  );
}