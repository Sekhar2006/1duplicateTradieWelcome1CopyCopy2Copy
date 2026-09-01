import { useState } from "react";
import { EnhancedRoleSelection } from "./EnhancedRoleSelection";
import { EntityRegistration, EntityData } from "./EntityRegistration";
import { StaffManagement } from "./StaffManagement";
import { RoleBasedLogin } from "./RoleBasedLogin";
import { AnimatePresence, motion } from "motion/react";

interface UserManagementFlowProps {
  onComplete: (userType: "individual" | "entity", data?: any) => void;
  onBack: () => void;
  startScreen?: "role-selection" | "login";
  userName?: string;
}

type FlowScreen = "role-selection" | "entity-registration" | "staff-management" | "login" | "complete";

export function UserManagementFlow({ 
  onComplete, 
  onBack, 
  startScreen = "role-selection",
  userName 
}: UserManagementFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<FlowScreen>(startScreen);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isEntity, setIsEntity] = useState(false);
  const [entityData, setEntityData] = useState<EntityData | null>(null);

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3
  };

  const handleRoleSelected = (roleId: string, isEntityRole: boolean) => {
    setSelectedRole(roleId);
    setIsEntity(isEntityRole);

    if (isEntityRole) {
      // Entity path: Go to entity registration
      setCurrentScreen("entity-registration");
    } else {
      // Individual producer path: Complete directly
      onComplete("individual", { role: roleId });
    }
  };

  const handleEntityRegistrationComplete = (data: EntityData) => {
    setEntityData(data);
    setCurrentScreen("staff-management");
  };

  const handleStaffManagementComplete = () => {
    // Complete the entity setup
    onComplete("entity", {
      role: selectedRole,
      entityData,
      // In real app, staff data would be saved here
    });
  };

  const handleLoginSuccess = (userType: "individual" | "entity", roles: string[], organizationName?: string) => {
    onComplete(userType, {
      userType,
      roles,
      organizationName
    });
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case "role-selection":
        return (
          <EnhancedRoleSelection
            onRoleSelected={handleRoleSelected}
            onBack={onBack}
            userName={userName}
          />
        );

      case "entity-registration":
        return (
          <EntityRegistration
            onComplete={handleEntityRegistrationComplete}
            onBack={() => setCurrentScreen("role-selection")}
            roleType={selectedRole}
          />
        );

      case "staff-management":
        return entityData ? (
          <StaffManagement
            onComplete={handleStaffManagementComplete}
            onBack={() => setCurrentScreen("entity-registration")}
            entityData={entityData}
            roleType={selectedRole}
          />
        ) : null;

      case "login":
        return (
          <RoleBasedLogin
            onLoginSuccess={handleLoginSuccess}
            onBack={onBack}
          />
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScreen}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        {renderScreen()}
      </motion.div>
    </AnimatePresence>
  );
}
