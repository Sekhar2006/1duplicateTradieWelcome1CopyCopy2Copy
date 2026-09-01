import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Plus, Trash2, Edit, Save, X, Mail, User, 
  UserCheck, UserX, Shield, ChevronRight, CheckCircle, AlertCircle
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Alert, AlertDescription } from "./ui/alert";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner@2.0.3";
import { EntityData } from "./EntityRegistration";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface StaffManagementProps {
  onComplete: () => void;
  onBack: () => void;
  entityData: EntityData;
  roleType: string;
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  roles: string[];
  status: "active" | "pending" | "inactive";
}

// Role options based on entity type
const getRoleOptions = (entityType: string): string[] => {
  const commonRoles = ["Admin", "Manager", "Operator", "Viewer"];
  
  const specificRoles: Record<string, string[]> = {
    "commission-agent": ["Agent", "Coordinator", "Sales"],
    "buyer": ["Procurement", "Quality", "Logistics"],
    "trader": ["Trading", "Analytics", "Risk Management"],
    "storage": ["Warehouse Manager", "Inventory", "Operations"],
    "logistics": ["Fleet Manager", "Driver", "Dispatcher"],
    "bank": ["Loan Officer", "Compliance", "Customer Service"],
    "insurance": ["Underwriter", "Claims", "Sales"],
    "regulatory": ["Inspector", "Compliance", "Auditor"]
  };

  return [...commonRoles, ...(specificRoles[entityType] || [])];
};

export function StaffManagement({ onComplete, onBack, entityData, roleType }: StaffManagementProps) {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRoles, setFormRoles] = useState<string[]>([]);

  const roleOptions = getRoleOptions(roleType);

  const resetForm = () => {
    setFormName("");
    setFormEmail("");
    setFormRoles([]);
    setEditingId(null);
  };

  const handleAddStaff = () => {
    if (!formName || !formEmail || formRoles.length === 0) {
      toast.error("Please fill all fields and select at least one role");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (editingId) {
      // Update existing
      setStaffMembers(prev => 
        prev.map(member => 
          member.id === editingId 
            ? { ...member, name: formName, email: formEmail, roles: formRoles }
            : member
        )
      );
      toast.success("Staff member updated successfully!");
    } else {
      // Add new
      const newMember: StaffMember = {
        id: Date.now().toString(),
        name: formName,
        email: formEmail,
        roles: formRoles,
        status: "pending"
      };
      setStaffMembers(prev => [...prev, newMember]);
      toast.success("Staff member added successfully!");
    }

    resetForm();
    setShowAddDialog(false);
  };

  const handleEditStaff = (member: StaffMember) => {
    setEditingId(member.id);
    setFormName(member.name);
    setFormEmail(member.email);
    setFormRoles(member.roles);
    setShowAddDialog(true);
  };

  const handleDeleteStaff = (id: string) => {
    setStaffMembers(prev => prev.filter(member => member.id !== id));
    toast.info("Staff member removed");
  };

  const toggleStaffStatus = (id: string) => {
    setStaffMembers(prev =>
      prev.map(member =>
        member.id === id
          ? { ...member, status: member.status === "active" ? "inactive" : "active" }
          : member
      )
    );
  };

  const toggleRole = (role: string) => {
    setFormRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleComplete = () => {
    if (staffMembers.length === 0) {
      toast.error("Please add at least one staff member");
      return;
    }

    const hasAdmin = staffMembers.some(m => m.roles.includes("Admin"));
    if (!hasAdmin) {
      toast.error("At least one staff member must have Admin role");
      return;
    }

    toast.success("Staff management setup complete!");
    setTimeout(() => {
      onComplete();
    }, 1000);
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
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <img src={tradieLogo} alt="TRADIE" className="w-10 h-10" />
              <span className="text-[#003E6D] font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                Staff Management
              </span>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Title */}
          <div className="text-center">
            <h1 className="text-[#003E6D] mb-3" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "2.5rem" }}>
              Manage Staff and Assign Roles
            </h1>
            <p className="text-[#003E6D]/70 text-lg">
              {entityData.organizationName}
            </p>
          </div>

          {/* Alert */}
          <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Add staff members and assign appropriate roles. At least one member must have <strong>Admin</strong> role to manage the organization.
            </AlertDescription>
          </Alert>

          {/* Add Staff Button */}
          <div className="flex justify-end">
            <Button
              onClick={() => {
                resetForm();
                setShowAddDialog(true);
              }}
              className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-[#003E6D] shadow-lg"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Staff Member
            </Button>
          </div>

          {/* Staff List */}
          {staffMembers.length === 0 ? (
            <Card className="p-12 bg-white/90 backdrop-blur-sm border-2 border-dashed border-[#003E6D]/20">
              <div className="text-center">
                <User className="w-16 h-16 mx-auto mb-4 text-[#003E6D]/30" />
                <h3 className="text-[#003E6D] mb-2 font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
                  No Staff Members Added
                </h3>
                <p className="text-[#003E6D]/60 mb-6">
                  Click "Add Staff Member" to start building your team
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[#003E6D] font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Staff Members ({staffMembers.length})
                </h3>
                {staffMembers.some(m => m.roles.includes("Admin")) && (
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Admin Assigned
                  </Badge>
                )}
              </div>

              {staffMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 bg-white/90 backdrop-blur-sm border-2 border-[#003E6D]/10 hover:border-[#FFD700]/50 transition-all">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#003E6D] to-[#005A9C] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-[#003E6D] font-semibold truncate" style={{ fontFamily: "Poppins, sans-serif" }}>
                            {member.name}
                          </h4>
                          <Badge 
                            variant={member.status === "active" ? "default" : member.status === "pending" ? "secondary" : "outline"}
                            className={
                              member.status === "active" ? "bg-green-500" :
                              member.status === "pending" ? "bg-amber-500" :
                              "bg-gray-500"
                            }
                          >
                            {member.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#003E6D]/60 mb-2 truncate">
                          {member.email}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {member.roles.map(role => (
                            <Badge 
                              key={role} 
                              variant="outline"
                              className={role === "Admin" ? "border-[#FFD700] text-[#FFD700]" : ""}
                            >
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditStaff(member)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStaffStatus(member.id)}
                          className={
                            member.status === "active" 
                              ? "text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                              : "text-green-600 hover:text-green-700 hover:bg-green-50"
                          }
                        >
                          {member.status === "active" ? (
                            <UserX className="w-4 h-4" />
                          ) : (
                            <UserCheck className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStaff(member.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Complete Button */}
          {staffMembers.length > 0 && (
            <div className="flex gap-4">
              <Button
                onClick={onBack}
                variant="outline"
                className="flex-1 h-14 border-2 border-[#003E6D]/20 text-[#003E6D] hover:border-[#FFD700] hover:bg-[#FFD700]/10 rounded-xl"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Back
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!staffMembers.some(m => m.roles.includes("Admin"))}
                className="flex-1 h-14 bg-gradient-to-r from-[#003E6D] to-[#005A9C] hover:from-[#005A9C] hover:to-[#003E6D] text-white rounded-xl shadow-xl disabled:opacity-50"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Complete Setup
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </motion.div>
      </main>

      {/* Add/Edit Staff Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif" }}>
              {editingId ? "Edit Staff Member" : "Add Staff Member"}
            </DialogTitle>
            <DialogDescription>
              Enter staff details and assign appropriate roles
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-[#003E6D]">
                <User className="w-4 h-4" />
                Staff Name *
              </Label>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Enter full name"
                className="border-2 border-[#003E6D]/20 focus:border-[#FFD700]"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-[#003E6D]">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="staff@example.com"
                className="border-2 border-[#003E6D]/20 focus:border-[#FFD700]"
              />
            </div>

            {/* Roles */}
            <div className="space-y-2">
              <Label className="text-[#003E6D]">
                Assign Roles * (Select multiple)
              </Label>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-2 border-2 border-[#003E6D]/10 rounded-lg">
                {roleOptions.map(role => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${role}`}
                      checked={formRoles.includes(role)}
                      onCheckedChange={() => toggleRole(role)}
                    />
                    <label
                      htmlFor={`role-${role}`}
                      className="text-sm text-[#003E6D] cursor-pointer"
                    >
                      {role}
                    </label>
                  </div>
                ))}
              </div>
              {formRoles.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formRoles.map(role => (
                    <Badge key={role} variant="outline" className={role === "Admin" ? "border-[#FFD700] text-[#FFD700]" : ""}>
                      {role}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => {
                  resetForm();
                  setShowAddDialog(false);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddStaff}
                disabled={!formName || !formEmail || formRoles.length === 0}
                className="flex-1 bg-gradient-to-r from-[#003E6D] to-[#005A9C] hover:from-[#005A9C] hover:to-[#003E6D] text-white disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingId ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
