import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, ChevronLeft, X, Plus, Edit, Trash2, 
  Building2, Users, User, Truck, Warehouse, Landmark, Shield,
  CheckCircle, AlertCircle, Mail, Phone, MapPin, FileText,
  Upload, Eye, EyeOff, LogIn, Loader2, Search
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { useIsMobile } from "./ui/use-mobile";
import { designTokens } from "../design-system";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

type Screen = "role-selection" | "entity-registration" | "staff-management" | "login" | "role-verification" | "dashboard";
type UserRole = "producer" | "commission-agent" | "buyer" | "trader" | "storage" | "logistics" | "bank" | "insurance" | "regulatory";

interface RoleOption {
  id: UserRole;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  isEntity: boolean;
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  roles: string[];
  status: "active" | "pending" | "inactive";
}

interface EntityData {
  organizationName: string;
  registrationNumber: string;
  phone: string;
  email: string;
  address: string;
  documents: File[];
}

interface MultiPlatformUserManagementProps {
  onComplete?: (role: UserRole, data: any) => void;
  onBack?: () => void;
  userName?: string;
}

const { colors, typography, spacing, radius, shadows } = designTokens;

export function MultiPlatformUserManagement({ 
  onComplete, 
  onBack,
  userName = "User"
}: MultiPlatformUserManagementProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("role-selection");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [entityData, setEntityData] = useState<EntityData>({
    organizationName: "",
    registrationNumber: "",
    phone: "",
    email: "",
    address: "",
    documents: []
  });
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: "1",
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      roles: ["Admin", "Manager"],
      status: "active"
    },
    {
      id: "2",
      name: "Amit Patel",
      email: "amit.patel@example.com",
      roles: ["Operations"],
      status: "pending"
    }
  ]);
  const [showAddStaffDialog, setShowAddStaffDialog] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", email: "", roles: [] as string[] });
  const [loginData, setLoginData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const isMobile = useIsMobile();
  const isTablet = !isMobile && typeof window !== 'undefined' && window.innerWidth < 1024;
  const isDesktop = !isMobile && !isTablet;

  // Role options configuration
  const roleOptions: RoleOption[] = [
    {
      id: "producer",
      title: "Producer",
      subtitle: "Individual farmer or agricultural producer",
      icon: User,
      color: "#10B981",
      isEntity: false
    },
    {
      id: "commission-agent",
      title: "Commission Agent",
      subtitle: "Register your organization and manage authorized staff",
      icon: Users,
      color: "#3B82F6",
      isEntity: true
    },
    {
      id: "buyer",
      title: "Buyer",
      subtitle: "Register your organization and manage authorized staff",
      icon: Building2,
      color: "#8B5CF6",
      isEntity: true
    },
    {
      id: "trader",
      title: "Trader",
      subtitle: "Register your organization and manage authorized staff",
      icon: Building2,
      color: "#EC4899",
      isEntity: true
    },
    {
      id: "storage",
      title: "Storage Provider",
      subtitle: "Register your organization and manage authorized staff",
      icon: Warehouse,
      color: "#F59E0B",
      isEntity: true
    },
    {
      id: "logistics",
      title: "Logistics/Transport Provider",
      subtitle: "Register your organization and manage authorized staff",
      icon: Truck,
      color: "#14B8A6",
      isEntity: true
    },
    {
      id: "bank",
      title: "Bank/Financial Institution",
      subtitle: "Register your organization and manage authorized staff",
      icon: Landmark,
      color: "#6366F1",
      isEntity: true
    },
    {
      id: "insurance",
      title: "Insurance Company",
      subtitle: "Register your organization and manage authorized staff",
      icon: Shield,
      color: "#EF4444",
      isEntity: true
    },
    {
      id: "regulatory",
      title: "Regulatory Authority",
      subtitle: "Register your organization and manage authorized staff",
      icon: Shield,
      color: "#64748B",
      isEntity: true
    }
  ];

  // Available roles for staff assignment
  const availableRoles = [
    "Admin",
    "Manager", 
    "Operations",
    "Trading",
    "Finance",
    "Compliance",
    "Support",
    "Logistics"
  ];

  // Handle role selection
  const handleRoleSelect = (roleId: UserRole) => {
    setSelectedRole(roleId);
  };

  // Handle next from role selection
  const handleRoleNext = () => {
    if (!selectedRole) return;
    
    const role = roleOptions.find(r => r.id === selectedRole);
    if (role?.isEntity) {
      setCurrentScreen("entity-registration");
    } else {
      // Producer goes directly to completion
      onComplete?.(selectedRole, { type: "individual" });
    }
  };

  // Handle entity registration submit
  const handleEntitySubmit = () => {
    if (!entityData.organizationName || !entityData.registrationNumber || 
        !entityData.phone || !entityData.email || !entityData.address) {
      return;
    }
    setCurrentScreen("staff-management");
  };

  // Handle add staff
  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email || newStaff.roles.length === 0) return;
    
    const staff: StaffMember = {
      id: Date.now().toString(),
      name: newStaff.name,
      email: newStaff.email,
      roles: newStaff.roles,
      status: "pending"
    };
    
    setStaffMembers([...staffMembers, staff]);
    setNewStaff({ name: "", email: "", roles: [] });
    setShowAddStaffDialog(false);
  };

  // Handle delete staff
  const handleDeleteStaff = (id: string) => {
    setStaffMembers(staffMembers.filter(s => s.id !== id));
  };

  // Handle complete staff management
  const handleCompleteStaffManagement = () => {
    setCurrentScreen("login");
  };

  // Handle login
  const handleLogin = () => {
    if (!loginData.identifier || !loginData.password) return;
    
    setIsVerifying(true);
    setCurrentScreen("role-verification");
    
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      setCurrentScreen("dashboard");
      
      // Complete flow
      setTimeout(() => {
        onComplete?.(selectedRole!, {
          type: "entity",
          entity: entityData,
          staff: staffMembers,
          login: loginData
        });
      }, 1500);
    }, 2000);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setEntityData({ ...entityData, documents: files });
      }
    }, 100);
  };

  // Render role selection screen
  const renderRoleSelection = () => {
    // Grid columns: mobile = 1, tablet = 2, desktop = 3
    const gridCols = isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-3";
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="min-h-screen p-4 md:p-6 lg:p-8"
        style={{ background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})` }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-4 mb-4">
              <img src={tradieLogo} alt="TRADIE" className="w-12 h-12 md:w-16 md:h-16" />
              <div>
                <h1 
                  className="text-2xl md:text-3xl lg:text-4xl"
                  style={{ 
                    fontFamily: typography.fonts.heading,
                    color: colors.blue.primary,
                    fontWeight: typography.weights.bold
                  }}
                >
                  Select Your Role or Entity Type
                </h1>
                <p 
                  className="text-sm md:text-base mt-1"
                  style={{ color: `${colors.blue.primary}90` }}
                >
                  Please choose your role or register your entity to continue
                </p>
              </div>
            </div>
          </div>

          {/* Role Cards Grid - Responsive */}
          <div className={`grid ${gridCols} gap-4 md:gap-6 mb-6`}>
            {roleOptions.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              
              return (
                <motion.div
                  key={role.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      isSelected ? 'ring-2 shadow-lg' : 'hover:shadow-md'
                    } ${isMobile ? 'min-h-[120px]' : 'min-h-[160px]'}`}
                    style={{
                      borderColor: isSelected ? role.color : colors.border.default,
                      ringColor: isSelected ? role.color : 'transparent'
                    }}
                    onClick={() => handleRoleSelect(role.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select ${role.title} role`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleRoleSelect(role.id);
                      }
                    }}
                  >
                    <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div
                          className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg flex items-center justify-center flex-shrink-0`}
                          style={{ backgroundColor: `${role.color}20` }}
                        >
                          <Icon 
                            className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} 
                            style={{ color: role.color }}
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 
                            className={`font-semibold mb-1 ${isMobile ? 'text-base' : 'text-lg'}`}
                            style={{ color: colors.blue.primary }}
                          >
                            {role.title}
                          </h3>
                          <p 
                            className={`${isMobile ? 'text-xs' : 'text-sm'} mb-2`}
                            style={{ color: `${colors.blue.primary}70` }}
                          >
                            {role.subtitle}
                          </p>
                          <Badge 
                            variant="secondary"
                            className="text-xs"
                            style={{ 
                              backgroundColor: role.isEntity ? `${role.color}20` : '#10B98120',
                              color: role.color
                            }}
                          >
                            {role.isEntity ? 'Entity' : 'Individual'}
                          </Badge>
                        </div>
                        
                        {/* Selection Indicator */}
                        {isSelected && (
                          <CheckCircle 
                            className="w-6 h-6 flex-shrink-0" 
                            style={{ color: role.color }}
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Actions */}
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 justify-between items-center`}>
            {onBack && (
              <Button
                variant="outline"
                onClick={onBack}
                className={isMobile ? 'w-full h-12' : 'h-11'}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            
            <Button
              disabled={!selectedRole}
              onClick={handleRoleNext}
              className={`${isMobile ? 'w-full h-12' : 'ml-auto px-8 h-11'}`}
              style={{
                background: selectedRole 
                  ? `linear-gradient(to right, ${colors.blue.primary}, ${colors.accent.gold}30)`
                  : undefined,
                color: 'white'
              }}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Keyboard Navigation Hint */}
          <Alert className="mt-6 border-2" style={{ borderColor: `${colors.accent.gold}50` }}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Keyboard Navigation:</strong> Use Tab to navigate, Enter/Space to select, Arrow keys to move between options
            </AlertDescription>
          </Alert>
        </div>
      </motion.div>
    );
  };

  // Render entity registration screen
  const renderEntityRegistration = () => {
    const isFormValid = entityData.organizationName && 
                        entityData.registrationNumber && 
                        entityData.phone && 
                        entityData.email && 
                        entityData.address;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="min-h-screen p-4 md:p-6 lg:p-8"
        style={{ background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})` }}
      >
        <div className={`max-w-${isDesktop ? '4xl' : '2xl'} mx-auto`}>
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 
              className="text-2xl md:text-3xl lg:text-4xl mb-2"
              style={{ 
                fontFamily: typography.fonts.heading,
                color: colors.blue.primary,
                fontWeight: typography.weights.bold
              }}
            >
              Register Your Organization
            </h1>
            <p 
              className="text-sm md:text-base"
              style={{ color: `${colors.blue.primary}90` }}
            >
              Complete the form below to register your entity
            </p>
          </div>

          <Card>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={(e) => { e.preventDefault(); handleEntitySubmit(); }}>
                <div className="space-y-6">
                  {/* Organization Name */}
                  <div>
                    <Label 
                      htmlFor="org-name"
                      className="flex items-center gap-2 mb-2"
                    >
                      <Building2 className="w-4 h-4" />
                      Organization Name *
                    </Label>
                    <Input
                      id="org-name"
                      placeholder="Enter your organization's legal name"
                      value={entityData.organizationName}
                      onChange={(e) => setEntityData({ ...entityData, organizationName: e.target.value })}
                      className={isMobile ? 'h-12 text-base' : 'h-11'}
                      required
                      aria-required="true"
                    />
                  </div>

                  {/* Registration Number */}
                  <div>
                    <Label 
                      htmlFor="reg-number"
                      className="flex items-center gap-2 mb-2"
                    >
                      <FileText className="w-4 h-4" />
                      Registration Number *
                    </Label>
                    <Input
                      id="reg-number"
                      placeholder="e.g., PAN, GST, Company Registration Number"
                      value={entityData.registrationNumber}
                      onChange={(e) => setEntityData({ ...entityData, registrationNumber: e.target.value })}
                      className={isMobile ? 'h-12 text-base' : 'h-11'}
                      required
                      aria-required="true"
                    />
                  </div>

                  {/* Contact Details - Responsive Grid */}
                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                    <div>
                      <Label 
                        htmlFor="phone"
                        className="flex items-center gap-2 mb-2"
                      >
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={entityData.phone}
                        onChange={(e) => setEntityData({ ...entityData, phone: e.target.value })}
                        className={isMobile ? 'h-12 text-base' : 'h-11'}
                        required
                        aria-required="true"
                      />
                    </div>

                    <div>
                      <Label 
                        htmlFor="email"
                        className="flex items-center gap-2 mb-2"
                      >
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@organization.com"
                        value={entityData.email}
                        onChange={(e) => setEntityData({ ...entityData, email: e.target.value })}
                        className={isMobile ? 'h-12 text-base' : 'h-11'}
                        required
                        aria-required="true"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <Label 
                      htmlFor="address"
                      className="flex items-center gap-2 mb-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Registered Address *
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Enter complete registered address including city, state, and pincode"
                      value={entityData.address}
                      onChange={(e) => setEntityData({ ...entityData, address: e.target.value })}
                      rows={4}
                      className={isMobile ? 'text-base' : ''}
                      required
                      aria-required="true"
                    />
                  </div>

                  {/* Document Upload */}
                  <div>
                    <Label 
                      htmlFor="documents"
                      className="flex items-center gap-2 mb-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Registration Proof *
                    </Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors"
                      style={{ borderColor: colors.accent.gold }}
                    >
                      <input
                        id="documents"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        aria-label="Upload documents"
                      />
                      <label 
                        htmlFor="documents"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Upload className="w-8 h-8" style={{ color: colors.accent.gold }} />
                        <span className="text-sm font-medium" style={{ color: colors.blue.primary }}>
                          Click to upload documents
                        </span>
                        <span className="text-xs" style={{ color: `${colors.blue.primary}60` }}>
                          PDF, JPG, PNG (Max 10MB each)
                        </span>
                      </label>
                      
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="mt-4">
                          <Progress value={uploadProgress} className="h-2" />
                          <p className="text-xs mt-2" style={{ color: colors.blue.primary }}>
                            Uploading... {uploadProgress}%
                          </p>
                        </div>
                      )}
                      
                      {entityData.documents.length > 0 && (
                        <div className="mt-4">
                          <Alert className="border-green-200 bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">
                              {entityData.documents.length} document(s) uploaded successfully
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions - Stacked on mobile */}
                <div className={`flex ${isMobile ? 'flex-col-reverse' : 'flex-row'} gap-4 mt-8`}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentScreen("role-selection")}
                    className={isMobile ? 'w-full h-12' : 'flex-1 h-11'}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className={isMobile ? 'w-full h-12' : 'flex-1 h-11'}
                    style={{
                      background: isFormValid 
                        ? `linear-gradient(to right, ${colors.blue.primary}, ${colors.accent.gold}30)`
                        : undefined,
                      color: 'white'
                    }}
                  >
                    Submit & Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  };

  // Render staff management screen
  const renderStaffManagement = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="min-h-screen p-4 md:p-6 lg:p-8"
        style={{ background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})` }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 
                  className="text-2xl md:text-3xl lg:text-4xl mb-2"
                  style={{ 
                    fontFamily: typography.fonts.heading,
                    color: colors.blue.primary,
                    fontWeight: typography.weights.bold
                  }}
                >
                  Manage Staff and Assign Roles
                </h1>
                <p 
                  className="text-sm md:text-base"
                  style={{ color: `${colors.blue.primary}90` }}
                >
                  Add staff members and assign appropriate roles
                </p>
              </div>
              
              <Button
                onClick={() => setShowAddStaffDialog(true)}
                className={isMobile ? 'w-full h-12' : 'h-11'}
                style={{
                  background: `linear-gradient(to right, ${colors.accent.gold}, ${colors.accent.gold}CC)`,
                  color: colors.blue.primary
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Staff Member
              </Button>
            </div>
          </div>

          {/* Staff List - Responsive */}
          <div className="space-y-4 mb-6">
            {staffMembers.map((staff) => (
              <Card key={staff.id}>
                <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                  <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4`}>
                    {/* Avatar */}
                    <div
                      className={`${isMobile ? 'w-12 h-12' : 'w-14 h-14'} rounded-full flex items-center justify-center flex-shrink-0`}
                      style={{ background: `linear-gradient(to bottom right, ${colors.blue.primary}, ${colors.accent.gold}30)` }}
                    >
                      <span className="text-white font-bold text-lg">
                        {staff.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <h3 
                            className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}
                            style={{ color: colors.blue.primary }}
                          >
                            {staff.name}
                          </h3>
                          <p 
                            className={`${isMobile ? 'text-xs' : 'text-sm'} truncate`}
                            style={{ color: `${colors.blue.primary}70` }}
                          >
                            {staff.email}
                          </p>
                        </div>
                        <Badge 
                          className="text-xs"
                          style={{
                            backgroundColor: staff.status === 'active' ? '#10B98120' : 
                                           staff.status === 'pending' ? '#F59E0B20' : '#EF444420',
                            color: staff.status === 'active' ? '#10B981' : 
                                   staff.status === 'pending' ? '#F59E0B' : '#EF4444'
                          }}
                        >
                          {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {staff.roles.map((role, idx) => (
                          <Badge 
                            key={idx}
                            variant="outline"
                            className="text-xs"
                            style={{ borderColor: colors.accent.gold, color: colors.blue.primary }}
                          >
                            {role}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className={`flex gap-${isMobile ? '3' : '2'}`}>
                        <Button
                          variant="ghost"
                          size={isMobile ? 'default' : 'sm'}
                          className="text-blue-600 hover:bg-blue-50"
                          aria-label={`Edit ${staff.name}`}
                        >
                          <Edit className="w-4 h-4" />
                          {!isMobile && <span className="ml-2">Edit</span>}
                        </Button>
                        <Button
                          variant="ghost"
                          size={isMobile ? 'default' : 'sm'}
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteStaff(staff.id)}
                          aria-label={`Delete ${staff.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                          {!isMobile && <span className="ml-2">Delete</span>}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Complete Button */}
          <div className={`flex ${isMobile ? 'flex-col-reverse' : 'flex-row'} gap-4`}>
            <Button
              variant="outline"
              onClick={() => setCurrentScreen("entity-registration")}
              className={isMobile ? 'w-full h-12' : 'flex-1 h-11'}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleCompleteStaffManagement}
              className={isMobile ? 'w-full h-12' : 'flex-1 h-11'}
              style={{
                background: `linear-gradient(to right, ${colors.blue.primary}, ${colors.accent.gold}30)`,
                color: 'white'
              }}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Setup
            </Button>
          </div>
        </div>

        {/* Add Staff Dialog */}
        <Dialog open={showAddStaffDialog} onOpenChange={setShowAddStaffDialog}>
          <DialogContent className={isMobile ? 'max-w-[95vw]' : 'max-w-md'}>
            <DialogHeader>
              <DialogTitle>Add Staff Member</DialogTitle>
              <DialogDescription>
                Enter staff details and assign roles
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="staff-name">Name *</Label>
                <Input
                  id="staff-name"
                  placeholder="Enter full name"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className={isMobile ? 'h-12' : 'h-11'}
                />
              </div>
              
              <div>
                <Label htmlFor="staff-email">Email *</Label>
                <Input
                  id="staff-email"
                  type="email"
                  placeholder="email@example.com"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className={isMobile ? 'h-12' : 'h-11'}
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Assign Roles *</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                  {availableRoles.map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox
                        id={`role-${role}`}
                        checked={newStaff.roles.includes(role)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewStaff({ ...newStaff, roles: [...newStaff.roles, role] });
                          } else {
                            setNewStaff({ ...newStaff, roles: newStaff.roles.filter(r => r !== role) });
                          }
                        }}
                      />
                      <Label 
                        htmlFor={`role-${role}`}
                        className="cursor-pointer text-sm font-normal"
                      >
                        {role}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter className={isMobile ? 'flex-col gap-2' : ''}>
              <Button
                variant="outline"
                onClick={() => setShowAddStaffDialog(false)}
                className={isMobile ? 'w-full' : ''}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddStaff}
                disabled={!newStaff.name || !newStaff.email || newStaff.roles.length === 0}
                className={isMobile ? 'w-full' : ''}
                style={{
                  background: (newStaff.name && newStaff.email && newStaff.roles.length > 0)
                    ? `linear-gradient(to right, ${colors.blue.primary}, ${colors.accent.gold}30)`
                    : undefined,
                  color: 'white'
                }}
              >
                Add Staff
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    );
  };

  // Render login screen
  const renderLogin = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})` }}
      >
        <div className={`w-full ${isDesktop ? 'max-w-md' : 'max-w-sm'}`}>
          <Card>
            <CardHeader className="text-center">
              <img 
                src={tradieLogo} 
                alt="TRADIE" 
                className={`mx-auto mb-4 ${isMobile ? 'w-16 h-16' : 'w-20 h-20'}`}
              />
              <CardTitle 
                className={isMobile ? 'text-2xl' : 'text-3xl'}
                style={{ 
                  fontFamily: typography.fonts.heading,
                  color: colors.blue.primary
                }}
              >
                Welcome Back
              </CardTitle>
              <CardDescription>
                Sign in to access your account
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div className="space-y-4">
                  {/* Email/Phone */}
                  <div>
                    <Label htmlFor="identifier" className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4" />
                      Email or Phone
                    </Label>
                    <Input
                      id="identifier"
                      placeholder="your@email.com or +91 XXXXX XXXXX"
                      value={loginData.identifier}
                      onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
                      className={isMobile ? 'h-12 text-base' : 'h-11'}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password" className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className={isMobile ? 'h-12 text-base pr-10' : 'h-11 pr-10'}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" style={{ color: colors.blue.primary }} />
                        ) : (
                          <Eye className="w-4 h-4" style={{ color: colors.blue.primary }} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm cursor-pointer">
                        Remember me
                      </Label>
                    </div>
                    <Button 
                      type="button"
                      variant="link"
                      className="text-sm p-0 h-auto"
                      style={{ color: colors.blue.primary }}
                    >
                      Forgot password?
                    </Button>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={!loginData.identifier || !loginData.password}
                    className={`w-full ${isMobile ? 'h-12 text-base' : 'h-11'}`}
                    style={{
                      background: (loginData.identifier && loginData.password)
                        ? `linear-gradient(to right, ${colors.blue.primary}, ${colors.accent.gold}30)`
                        : undefined,
                      color: 'white'
                    }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </div>
              </form>

              <Separator className="my-6" />

              {/* Register Link */}
              <div className="text-center">
                <p className="text-sm" style={{ color: `${colors.blue.primary}70` }}>
                  Don't have an account?{' '}
                  <Button
                    variant="link"
                    className="p-0 h-auto font-semibold"
                    style={{ color: colors.blue.primary }}
                  >
                    Register Now
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  };

  // Render role verification screen
  const renderRoleVerification = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})` }}
      >
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="relative inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 
                    className="w-16 h-16" 
                    style={{ color: colors.blue.primary }}
                  />
                </motion.div>
              </div>
            </div>
            
            <h2 
              className="text-2xl mb-2"
              style={{ 
                fontFamily: typography.fonts.heading,
                color: colors.blue.primary,
                fontWeight: typography.weights.bold
              }}
            >
              Verifying Your Role
            </h2>
            <p style={{ color: `${colors.blue.primary}70` }}>
              Please wait while we verify your credentials and set up your dashboard...
            </p>
            
            <div className="mt-6">
              <Progress value={66} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // Render dashboard screen
  const renderDashboard = () => {
    const selectedRoleData = roleOptions.find(r => r.id === selectedRole);
    const Icon = selectedRoleData?.icon || Building2;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen p-4 md:p-6 lg:p-8"
        style={{ background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})` }}
      >
        <div className="max-w-6xl mx-auto">
          <Card className="border-2" style={{ borderColor: colors.accent.gold }}>
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <CheckCircle 
                  className="w-20 h-20 mx-auto mb-4" 
                  style={{ color: '#10B981' }}
                />
              </motion.div>
              
              <h1 
                className="text-3xl md:text-4xl mb-4"
                style={{ 
                  fontFamily: typography.fonts.heading,
                  color: colors.blue.primary,
                  fontWeight: typography.weights.bold
                }}
              >
                Welcome to Your Dashboard!
              </h1>
              
              <p className="text-lg mb-6" style={{ color: `${colors.blue.primary}80` }}>
                Your {selectedRoleData?.title} account has been successfully set up.
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${selectedRoleData?.color}20` }}
                >
                  <Icon 
                    className="w-8 h-8" 
                    style={{ color: selectedRoleData?.color }}
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-lg" style={{ color: colors.blue.primary }}>
                    {entityData.organizationName || userName}
                  </p>
                  <p className="text-sm" style={{ color: `${colors.blue.primary}70` }}>
                    {selectedRoleData?.title}
                  </p>
                </div>
              </div>
              
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 text-left">
                  <strong>Setup Complete!</strong> You can now access all features of your {selectedRoleData?.title} dashboard.
                  {selectedRoleData?.isEntity && ` ${staffMembers.length} staff member(s) have been added.`}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  };

  // Main render
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {currentScreen === "role-selection" && renderRoleSelection()}
        {currentScreen === "entity-registration" && renderEntityRegistration()}
        {currentScreen === "staff-management" && renderStaffManagement()}
        {currentScreen === "login" && renderLogin()}
        {currentScreen === "role-verification" && renderRoleVerification()}
        {currentScreen === "dashboard" && renderDashboard()}
      </AnimatePresence>
    </div>
  );
}
