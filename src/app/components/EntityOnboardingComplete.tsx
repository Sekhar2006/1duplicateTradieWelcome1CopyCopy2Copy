import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, ArrowLeft, ChevronDown, Upload, Plus, Trash2, 
  Check, Info, AlertCircle, X, FileText, Building2, Users, 
  Shield, CheckCircle2, Crown, Search, Eye, Edit
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner@2.0.3";
import { countries } from "./CountryLanguageData";
import { getDistrictsByState, getStateNames } from "./IndiaLocationData";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface EntityOnboardingCompleteProps {
  onComplete: () => void;
  onBack: () => void;
  userName?: string;
  userRole?: string;
}

interface KeyPerson {
  id: string;
  fullName: string;
  designation: string;
  roles: string[];
  email: string;
  mobile: string;
  govId: string;
  ownershipPercent: number;
  adminRights: boolean;
  permissions: Record<string, string[]>;
}

interface DocumentUpload {
  id: string;
  name: string;
  required: boolean;
  file: File | null;
  uploaded: boolean;
  description?: string;
}

const entityTypes = [
  { id: "proprietor", label: "Proprietor" },
  { id: "partnership", label: "Partnership Firm" },
  { id: "llp", label: "LLP (Limited Liability Partnership)" },
  { id: "limited", label: "Limited Company" },
  { id: "society", label: "Society/Association" },
  { id: "trust", label: "Trust" },
  { id: "other", label: "Other" }
];

const categories = [
  { id: "micro", label: "Micro", description: "Turnover < ₹5 Cr" },
  { id: "msme", label: "MSME", description: "Turnover ₹5-250 Cr" },
  { id: "startup", label: "Startup", description: "Registered as Startup" },
  { id: "large", label: "Large Enterprise", description: "Turnover > ₹250 Cr" }
];

const designations: Record<string, string[]> = {
  proprietor: ["Proprietor"],
  partnership: ["Managing Partner", "Partner"],
  llp: ["Designated Partner", "Partner"],
  limited: ["Chairman", "Managing Director", "CEO", "Director", "Treasurer"],
  society: ["President", "Vice-President", "Treasurer", "Director", "Member"],
  trust: ["Managing Trustee", "Trustee"],
  other: ["Owner", "Director", "Manager", "Partner"]
};

const roleOptions = [
  "Admin", "Operations", "Trades", "Settlement", 
  "KYC", "Finance", "Reports", "Staff-Mgmt", "Settings"
];

const modules = [
  "Trades", "Wallet", "KYC", "Finance", "Reports", "Settings"
];

const permissionLevels = ["View", "Create", "Approve", "Admin"];

const permissionPresets = {
  admin: {
    Trades: ["View", "Create", "Approve", "Admin"],
    Wallet: ["View", "Create", "Approve", "Admin"],
    KYC: ["View", "Create", "Approve", "Admin"],
    Finance: ["View", "Create", "Approve", "Admin"],
    Reports: ["View", "Admin"],
    Settings: ["View", "Admin"]
  },
  operations: {
    Trades: ["View", "Create"],
    Wallet: ["View"],
    KYC: ["View"],
    Finance: ["View"],
    Reports: ["View"],
    Settings: []
  },
  finance: {
    Trades: ["View"],
    Wallet: ["View", "Create", "Approve"],
    KYC: ["View"],
    Finance: ["View", "Create", "Approve"],
    Reports: ["View"],
    Settings: []
  },
  auditor: {
    Trades: ["View"],
    Wallet: ["View"],
    KYC: ["View"],
    Finance: ["View"],
    Reports: ["View"],
    Settings: []
  }
};

// Document requirements by country/state/role
const getDocumentRequirements = (country: string, state: string, role: string) => {
  const docs: Array<{ name: string; required: boolean }> = [];

  if (country === "India") {
    // Common India documents
    docs.push(
      { name: "PAN Card", required: true },
      { name: "GST Certificate", required: true },
      { name: "Bank Account Proof", required: true }
    );

    if (state === "Andhra Pradesh" && (role === "commission-agent" || role === "trader")) {
      docs.push(
        { name: "APMC License", required: true },
        { name: "Market Committee License", required: true }
      );
    }

    if (state === "Maharashtra" && role === "storage") {
      docs.push(
        { name: "Shop & Establishment Certificate", required: true },
        { name: "APMC Registration", required: true },
        { name: "7/12 Land Extract", required: true }
      );
    }

    docs.push({ name: "Udyam Registration Certificate", required: false });
    docs.push({ name: "Shop & Establishment Certificate", required: false });
    
  } else if (country === "United States") {
    docs.push(
      { name: "State Business Registration", required: true },
      { name: "EIN (Employer Identification Number)", required: true },
      { name: "USDA/FSA License", required: false }
    );
  } else if (country === "Brazil") {
    docs.push(
      { name: "CNPJ Registration", required: true },
      { name: "CAF/Agricultural Registration", required: false }
    );
  } else if (country === "Kenya") {
    docs.push(
      { name: "Business Permit", required: true },
      { name: "NCPB/Agricultural Board Registration", required: false },
      { name: "PIN Certificate", required: true }
    );
  }

  // Always add "Others"
  docs.push({ name: "Others", required: false });

  return docs;
};

export function EntityOnboardingComplete({ 
  onComplete, 
  onBack, 
  userName = "User",
  userRole = "trader"
}: EntityOnboardingCompleteProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Step 1: Entity Basics
  const [entityName, setEntityName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [entityType, setEntityType] = useState("");
  const [category, setCategory] = useState("");
  const [taxId, setTaxId] = useState("");
  const [udyamId, setUdyamId] = useState("");
  const [areaOfOperation, setAreaOfOperation] = useState<string[]>([]);
  const [licensingAuthority, setLicensingAuthority] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [otherEntityType, setOtherEntityType] = useState("");
  
  // Step 2: Documents
  const [documents, setDocuments] = useState<DocumentUpload[]>([]);
  const [othersDescription, setOthersDescription] = useState("");
  
  // Step 3: Key Persons & Ownership
  const [keyPersons, setKeyPersons] = useState<KeyPerson[]>([]);
  const [editingPerson, setEditingPerson] = useState<string | null>(null);
  
  // UI States
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [currentPersonForPermissions, setCurrentPersonForPermissions] = useState<string | null>(null);

  const isIndia = selectedCountry === "India";
  const indianStateNames = getStateNames();
  const districts = isIndia ? getDistrictsByState(selectedState) : [];

  // Initialize documents when country/state/role changes
  useEffect(() => {
    if (selectedCountry) {
      const docReqs = getDocumentRequirements(selectedCountry, selectedState, userRole);
      setDocuments(docReqs.map((doc, idx) => ({
        id: `doc-${idx}`,
        name: doc.name,
        required: doc.required,
        file: null,
        uploaded: false,
        description: ""
      })));
    }
  }, [selectedCountry, selectedState, userRole]);

  // Auto-add proprietor as first key person
  useEffect(() => {
    if (entityType === "proprietor" && keyPersons.length === 0) {
      const proprietor: KeyPerson = {
        id: "person-0",
        fullName: userName,
        designation: "Proprietor",
        roles: ["Admin"],
        email: "",
        mobile: "",
        govId: "",
        ownershipPercent: 100,
        adminRights: true,
        permissions: permissionPresets.admin
      };
      setKeyPersons([proprietor]);
    }
  }, [entityType, userName]);

  const steps = [
    { id: "basics", label: "Entity Basics" },
    { id: "documents", label: "Documents" },
    { id: "ownership", label: "Ownership & Key Persons" },
    { id: "review", label: "Review & Submit" }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  // Helper Functions
  const toggleAreaOfOperation = (area: string) => {
    setAreaOfOperation(prev =>
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const addKeyPerson = () => {
    if (keyPersons.length >= 30) {
      toast.error("Maximum 30 key persons allowed");
      return;
    }
    
    const newPerson: KeyPerson = {
      id: `person-${Date.now()}`,
      fullName: "",
      designation: "",
      roles: [],
      email: "",
      mobile: "",
      govId: "",
      ownershipPercent: 0,
      adminRights: false,
      permissions: {}
    };
    
    setKeyPersons([...keyPersons, newPerson]);
    setEditingPerson(newPerson.id);
  };

  const removeKeyPerson = (id: string) => {
    if (entityType === "proprietor" && keyPersons.length === 1) {
      toast.error("Proprietor cannot be removed");
      return;
    }
    setKeyPersons(keyPersons.filter(p => p.id !== id));
  };

  const updateKeyPerson = (id: string, field: keyof KeyPerson, value: any) => {
    setKeyPersons(keyPersons.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const applyPermissionPreset = (personId: string, preset: keyof typeof permissionPresets) => {
    updateKeyPerson(personId, "permissions", permissionPresets[preset]);
    toast.success(`Applied ${preset} preset`);
  };

  const getTotalOwnership = () => {
    return keyPersons.reduce((sum, person) => sum + person.ownershipPercent, 0);
  };

  const handleDocumentUpload = (docId: string, file: File) => {
    setDocuments(docs => docs.map(d => 
      d.id === docId ? { ...d, file, uploaded: true } : d
    ));
    toast.success("Document uploaded successfully");
  };

  const isStep1Valid = () => {
    if (!entityName || !selectedCountry || !entityType || !category || !taxId) return false;
    if (entityType === "other" && !otherEntityType) return false;
    if (isIndia && (!selectedState || !selectedDistrict)) return false;
    if (!registeredAddress || areaOfOperation.length === 0) return false;
    return true;
  };

  const isStep2Valid = () => {
    const requiredDocs = documents.filter(d => d.required);
    const uploadedRequired = requiredDocs.every(d => d.uploaded);
    const othersDoc = documents.find(d => d.name === "Others");
    if (othersDoc?.uploaded && !othersDoc.description) return false;
    return uploadedRequired;
  };

  const isStep3Valid = () => {
    if (keyPersons.length === 0) return false;
    const totalOwnership = getTotalOwnership();
    if (entityType !== "proprietor" && totalOwnership !== 100) return false;
    const allFieldsFilled = keyPersons.every(p => 
      p.fullName && p.designation && p.email && p.mobile && p.govId
    );
    return allFieldsFilled;
  };

  const handleNext = () => {
    if (currentStep === 0 && !isStep1Valid()) {
      toast.error("Please fill all required fields");
      return;
    }
    if (currentStep === 1 && !isStep2Valid()) {
      toast.error("Please upload all required documents");
      return;
    }
    if (currentStep === 2 && !isStep3Valid()) {
      toast.error("Please complete ownership details (must sum to 100%)");
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    toast.success("KYC submitted successfully!");
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4FC] to-[#D9F2FF] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#003E6D]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => currentStep === 0 ? onBack() : setCurrentStep(currentStep - 1)}
              className="text-[#003E6D] hover:bg-[#003E6D]/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2">
              <img src={tradieLogo} alt="TRADIE" className="w-10 h-10" />
              <span
                className="text-[#003E6D]"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.125rem" }}
              >
                TRADIE
              </span>
            </div>

            <div className="w-10"></div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p
                className="text-[#003E6D]/70 text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Step {currentStep + 1} of {steps.length}
              </p>
              <p
                className="text-[#003E6D] text-sm"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                {Math.round(progress)}%
              </p>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8">
              
              {/* Step 1: Entity Basics */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2
                      className="text-[#003E6D] mb-2"
                      style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem" }}
                    >
                      🏢 Entity Information
                    </h2>
                    <p
                      className="text-[#003E6D]/60"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Provide your organization's basic details
                    </p>
                  </div>

                  <Separator />

                  {/* Entity Name */}
                  <div className="space-y-2">
                    <Label className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                      📝 Entity Name *
                    </Label>
                    <Input
                      value={entityName}
                      onChange={(e) => setEntityName(e.target.value)}
                      placeholder="Enter registered business name"
                      className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                      🌍 Country *
                    </Label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.name} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* State (India only) */}
                  {isIndia && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                          📍 State *
                        </Label>
                        <Select value={selectedState} onValueChange={setSelectedState}>
                          <SelectTrigger className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStateNames.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                          📍 District *
                        </Label>
                        <Select value={selectedDistrict} onValueChange={setSelectedDistrict} disabled={!selectedState}>
                          <SelectTrigger className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl">
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            {districts.map((district) => (
                              <SelectItem key={district} value={district}>
                                {district}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Registered Address */}
                  <div className="space-y-2">
                    <Label className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                      🏠 Registered Address *
                    </Label>
                    <Textarea
                      value={registeredAddress}
                      onChange={(e) => setRegisteredAddress(e.target.value)}
                      placeholder="Enter complete registered address"
                      className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] rounded-xl min-h-[100px]"
                    />
                  </div>

                  {/* Entity Type & Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                        🏛️ Entity Type *
                      </Label>
                      <Select value={entityType} onValueChange={setEntityType}>
                        <SelectTrigger className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl">
                          <SelectValue placeholder="Select entity type" />
                        </SelectTrigger>
                        <SelectContent>
                          {entityTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                        📊 Category *
                      </Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              <div>
                                <div>{cat.label}</div>
                                <div className="text-xs text-[#003E6D]/60">{cat.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Other Entity Type Description */}
                  {entityType === "other" && (
                    <div className="space-y-2">
                      <Label className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                        📝 Describe Entity Type *
                      </Label>
                      <Input
                        value={otherEntityType}
                        onChange={(e) => setOtherEntityType(e.target.value)}
                        placeholder="Specify your entity type"
                        className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl"
                      />
                    </div>
                  )}

                  {/* Tax IDs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                        🆔 {isIndia ? "PAN" : "Tax ID"} *
                      </Label>
                      <Input
                        value={taxId}
                        onChange={(e) => setTaxId(e.target.value.toUpperCase())}
                        placeholder={isIndia ? "ABCDE1234F" : "Enter Tax ID"}
                        className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl"
                      />
                    </div>

                    {isIndia && (
                      <div className="space-y-2">
                        <Label className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                          🏭 Udyam Registration (Optional)
                        </Label>
                        <Input
                          value={udyamId}
                          onChange={(e) => setUdyamId(e.target.value.toUpperCase())}
                          placeholder="UDYAM-XX-00-0000000"
                          className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl"
                        />
                      </div>
                    )}
                  </div>

                  {/* Area of Operation */}
                  <div className="space-y-2">
                    <Label className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                      🌐 Area of Operation * <span className="text-sm font-normal">(Select all that apply)</span>
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {["Local", "Inter-State", "International"].map((area) => (
                        <div
                          key={area}
                          onClick={() => toggleAreaOfOperation(area)}
                          className={`flex items-center space-x-2 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                            areaOfOperation.includes(area)
                              ? "border-[#FFD700] bg-[#FFD700]/10"
                              : "border-[#003E6D]/20 hover:border-[#FFD700]/50"
                          }`}
                        >
                          <Checkbox
                            checked={areaOfOperation.includes(area)}
                            className="pointer-events-none"
                          />
                          <Label className="cursor-pointer flex-1" style={{ fontFamily: "Inter, sans-serif" }}>
                            {area}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* License Details */}
                  <div className="space-y-4">
                    <h3 className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                      📜 License Details (Optional)
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[#003E6D]" style={{ fontFamily: "Inter, sans-serif" }}>
                          Licensing Authority
                        </Label>
                        <Input
                          value={licensingAuthority}
                          onChange={(e) => setLicensingAuthority(e.target.value)}
                          placeholder="e.g., APMC, State Govt"
                          className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[#003E6D]" style={{ fontFamily: "Inter, sans-serif" }}>
                          License Number
                        </Label>
                        <Input
                          value={licenseNumber}
                          onChange={(e) => setLicenseNumber(e.target.value)}
                          placeholder="Enter license number"
                          className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#003E6D]" style={{ fontFamily: "Inter, sans-serif" }}>
                        Registration Date
                      </Label>
                      <Input
                        type="date"
                        value={registrationDate}
                        onChange={(e) => setRegistrationDate(e.target.value)}
                        className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!isStep1Valid()}
                    className="w-full h-12 bg-gradient-to-r from-[#003E6D] to-[#005A9C] hover:from-[#005A9C] hover:to-[#003E6D] text-white rounded-xl"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    Continue to Documents
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}

              {/* Step 2: Documents */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2
                      className="text-[#003E6D] mb-2"
                      style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem" }}
                    >
                      📄 Document Upload
                    </h2>
                    <p
                      className="text-[#003E6D]/60"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Upload required documents for {selectedCountry}
                      {isIndia && selectedState && `, ${selectedState}`}
                    </p>
                  </div>

                  <Alert className="bg-blue-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      All documents marked with * are mandatory. Ensure files are clear and readable (PDF, JPG, PNG, max 5MB each).
                    </AlertDescription>
                  </Alert>

                  <Separator />

                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <Card key={doc.id} className="p-4 border-2 border-[#003E6D]/20 hover:border-[#FFD700]/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-5 h-5 text-[#003E6D]" />
                              <Label className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                                {doc.name} {doc.required && "*"}
                              </Label>
                            </div>
                            
                            {doc.name === "Others" && (
                              <Textarea
                                value={doc.description || ""}
                                onChange={(e) => {
                                  setDocuments(docs => docs.map(d =>
                                    d.id === doc.id ? { ...d, description: e.target.value } : d
                                  ));
                                }}
                                placeholder="Describe the document you're uploading"
                                className="mb-2 border-2 border-[#003E6D]/20 focus:border-[#FFD700] rounded-xl"
                                rows={2}
                              />
                            )}

                            {doc.uploaded && doc.file && (
                              <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{doc.file.name}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button
                              onClick={() => {
                                const input = document.createElement("input");
                                input.type = "file";
                                input.accept = ".pdf,.jpg,.jpeg,.png";
                                input.onchange = (e: any) => {
                                  const file = e.target?.files?.[0];
                                  if (file) {
                                    if (file.size > 5 * 1024 * 1024) {
                                      toast.error("File size must be less than 5MB");
                                      return;
                                    }
                                    handleDocumentUpload(doc.id, file);
                                  }
                                };
                                input.click();
                              }}
                              size="sm"
                              variant={doc.uploaded ? "outline" : "default"}
                              className={doc.uploaded ? "" : "bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#003E6D]"}
                            >
                              {doc.uploaded ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Uploaded
                                </>
                              ) : (
                                <>
                                  <Upload className="w-4 h-4 mr-2" />
                                  Upload
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      variant="outline"
                      className="flex-1 h-12 border-2 border-[#003E6D]/20 text-[#003E6D] rounded-xl"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!isStep2Valid()}
                      className="flex-1 h-12 bg-gradient-to-r from-[#003E6D] to-[#005A9C] hover:from-[#005A9C] hover:to-[#003E6D] text-white rounded-xl"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                    >
                      Continue to Ownership
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Key Persons & Ownership */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2
                      className="text-[#003E6D] mb-2"
                      style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem" }}
                    >
                      👥 Ownership & Key Persons
                    </h2>
                    <p
                      className="text-[#003E6D]/60"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Add owners and key personnel (max 30 persons)
                    </p>
                  </div>

                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      {entityType === "proprietor" 
                        ? "As a proprietor, you have 100% ownership by default."
                        : `Total ownership must equal 100%. Current: ${getTotalOwnership()}%`}
                    </AlertDescription>
                  </Alert>

                  <Separator />

                  {/* Key Persons List */}
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {keyPersons.map((person, index) => (
                        <Card key={person.id} className="p-4 border-2 border-[#003E6D]/20 hover:border-[#FFD700]/50 transition-colors">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                                  <Users className="w-5 h-5 text-[#003E6D]" />
                                </div>
                                <div>
                                  <h4
                                    className="text-[#003E6D]"
                                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                                  >
                                    {person.fullName || `Person ${index + 1}`}
                                  </h4>
                                  <p className="text-sm text-[#003E6D]/60">
                                    {person.designation || "No designation"}
                                    {person.ownershipPercent > 0 && ` • ${person.ownershipPercent}% ownership`}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {person.adminRights && (
                                  <Badge className="bg-[#FFD700] text-[#003E6D]">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Admin
                                  </Badge>
                                )}
                                {entityType !== "proprietor" && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeKeyPerson(person.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>

                            {editingPerson === person.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-4 pt-4 border-t border-[#003E6D]/10"
                              >
                                {/* Full Name & Designation */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-[#003E6D] text-sm">Full Name *</Label>
                                    <Input
                                      value={person.fullName}
                                      onChange={(e) => updateKeyPerson(person.id, "fullName", e.target.value)}
                                      placeholder="Enter full name"
                                      className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-10 rounded-lg"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-[#003E6D] text-sm">Designation *</Label>
                                    <Select
                                      value={person.designation}
                                      onValueChange={(value) => updateKeyPerson(person.id, "designation", value)}
                                    >
                                      <SelectTrigger className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-10 rounded-lg">
                                        <SelectValue placeholder="Select designation" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {designations[entityType as keyof typeof designations]?.map((des) => (
                                          <SelectItem key={des} value={des}>
                                            {des}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                {/* Email & Mobile */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-[#003E6D] text-sm">Email *</Label>
                                    <Input
                                      type="email"
                                      value={person.email}
                                      onChange={(e) => updateKeyPerson(person.id, "email", e.target.value)}
                                      placeholder="email@example.com"
                                      className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-10 rounded-lg"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label className="text-[#003E6D] text-sm">Mobile *</Label>
                                    <Input
                                      type="tel"
                                      value={person.mobile}
                                      onChange={(e) => updateKeyPerson(person.id, "mobile", e.target.value)}
                                      placeholder="+91 98765 43210"
                                      className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-10 rounded-lg"
                                    />
                                  </div>
                                </div>

                                {/* Gov ID & Ownership */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-[#003E6D] text-sm">Government ID *</Label>
                                    <Input
                                      value={person.govId}
                                      onChange={(e) => updateKeyPerson(person.id, "govId", e.target.value)}
                                      placeholder="Aadhaar/PAN/Passport"
                                      className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-10 rounded-lg"
                                    />
                                  </div>

                                  {entityType !== "proprietor" && (
                                    <div className="space-y-2">
                                      <Label className="text-[#003E6D] text-sm">Ownership % *</Label>
                                      <Input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={person.ownershipPercent}
                                        onChange={(e) => updateKeyPerson(person.id, "ownershipPercent", parseFloat(e.target.value) || 0)}
                                        placeholder="0-100"
                                        className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-10 rounded-lg"
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* Admin Rights */}
                                <div className="flex items-center justify-between p-3 bg-[#F7FAFC] rounded-lg border border-[#003E6D]/10">
                                  <Label className="text-[#003E6D]" style={{ fontFamily: "Inter, sans-serif" }}>
                                    Grant Admin Rights
                                  </Label>
                                  <Switch
                                    checked={person.adminRights}
                                    onCheckedChange={(checked) => updateKeyPerson(person.id, "adminRights", checked)}
                                  />
                                </div>

                                {/* Role Tags */}
                                <div className="space-y-2">
                                  <Label className="text-[#003E6D] text-sm">Role Tags</Label>
                                  <div className="flex flex-wrap gap-2">
                                    {roleOptions.map((role) => (
                                      <Badge
                                        key={role}
                                        variant={person.roles.includes(role) ? "default" : "outline"}
                                        className={`cursor-pointer ${
                                          person.roles.includes(role)
                                            ? "bg-[#FFD700] text-[#003E6D]"
                                            : "border-[#003E6D]/30 text-[#003E6D]/60 hover:border-[#FFD700]"
                                        }`}
                                        onClick={() => {
                                          const newRoles = person.roles.includes(role)
                                            ? person.roles.filter(r => r !== role)
                                            : [...person.roles, role];
                                          updateKeyPerson(person.id, "roles", newRoles);
                                        }}
                                      >
                                        {role}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {/* Permission Presets */}
                                <div className="space-y-2">
                                  <Label className="text-[#003E6D] text-sm">Quick Permission Presets</Label>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {Object.keys(permissionPresets).map((preset) => (
                                      <Button
                                        key={preset}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => applyPermissionPreset(person.id, preset as keyof typeof permissionPresets)}
                                        className="capitalize border-[#003E6D]/20 hover:border-[#FFD700] hover:bg-[#FFD700]/10"
                                      >
                                        {preset}
                                      </Button>
                                    ))}
                                  </div>
                                </div>

                                <Button
                                  onClick={() => setEditingPerson(null)}
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-[#003E6D]/20"
                                >
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Done Editing
                                </Button>
                              </motion.div>
                            )}

                            {editingPerson !== person.id && person.fullName && (
                              <Button
                                onClick={() => setEditingPerson(person.id)}
                                variant="outline"
                                size="sm"
                                className="w-full border-[#003E6D]/20 hover:border-[#FFD700]"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Details
                              </Button>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Add Person Button */}
                  {keyPersons.length < 30 && entityType !== "proprietor" && (
                    <Button
                      onClick={addKeyPerson}
                      variant="outline"
                      className="w-full h-12 border-2 border-dashed border-[#003E6D]/30 hover:border-[#FFD700] hover:bg-[#FFD700]/10 text-[#003E6D] rounded-xl"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Key Person ({keyPersons.length}/30)
                    </Button>
                  )}

                  {/* Ownership Validation */}
                  {entityType !== "proprietor" && getTotalOwnership() !== 100 && (
                    <Alert className="bg-red-50 border-red-200">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        Total ownership is {getTotalOwnership()}%. It must equal exactly 100% to proceed.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      variant="outline"
                      className="flex-1 h-12 border-2 border-[#003E6D]/20 text-[#003E6D] rounded-xl"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!isStep3Valid()}
                      className="flex-1 h-12 bg-gradient-to-r from-[#003E6D] to-[#005A9C] hover:from-[#005A9C] hover:to-[#003E6D] text-white rounded-xl"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                    >
                      Review & Submit
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2
                      className="text-[#003E6D] mb-2"
                      style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem" }}
                    >
                      ✅ Review & Submit
                    </h2>
                    <p
                      className="text-[#003E6D]/60"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Review your information before final submission
                    </p>
                  </div>

                  <Separator />

                  {/* Entity Summary */}
                  <Card className="p-6 bg-gradient-to-br from-[#F7FAFC] to-[#E8F4FC] border-2 border-[#003E6D]/10">
                    <h3
                      className="text-[#003E6D] mb-4"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.25rem" }}
                    >
                      🏢 Entity Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-[#003E6D]/60 text-sm">Entity Name</p>
                        <p className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                          {entityName}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#003E6D]/60 text-sm">Entity Type</p>
                        <p className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                          {entityTypes.find(t => t.id === entityType)?.label}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#003E6D]/60 text-sm">Location</p>
                        <p className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                          {isIndia ? `${selectedDistrict}, ${selectedState}, India` : selectedCountry}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#003E6D]/60 text-sm">Category</p>
                        <p className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                          {categories.find(c => c.id === category)?.label}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#003E6D]/60 text-sm">{isIndia ? "PAN" : "Tax ID"}</p>
                        <p className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                          {taxId}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#003E6D]/60 text-sm">Area of Operation</p>
                        <p className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                          {areaOfOperation.join(", ")}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Documents Summary */}
                  <Card className="p-6 bg-gradient-to-br from-[#F7FAFC] to-[#E8F4FC] border-2 border-[#003E6D]/10">
                    <h3
                      className="text-[#003E6D] mb-4"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.25rem" }}
                    >
                      📄 Documents
                    </h3>
                    <div className="space-y-2">
                      {documents.filter(d => d.uploaded).map((doc) => (
                        <div key={doc.id} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-[#003E6D]">{doc.name}</span>
                          {doc.file && <span className="text-[#003E6D]/60 text-sm">({doc.file.name})</span>}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Key Persons Summary */}
                  <Card className="p-6 bg-gradient-to-br from-[#F7FAFC] to-[#E8F4FC] border-2 border-[#003E6D]/10">
                    <h3
                      className="text-[#003E6D] mb-4"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.25rem" }}
                    >
                      👥 Key Persons ({keyPersons.length})
                    </h3>
                    <div className="space-y-3">
                      {keyPersons.map((person) => (
                        <div key={person.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#003E6D]/10">
                          <div>
                            <p className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                              {person.fullName}
                            </p>
                            <p className="text-[#003E6D]/60 text-sm">
                              {person.designation} • {person.ownershipPercent}% ownership
                            </p>
                          </div>
                          {person.adminRights && (
                            <Badge className="bg-[#FFD700] text-[#003E6D]">
                              <Crown className="w-3 h-3 mr-1" />
                              Admin
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Verification Timeline Alert */}
                  <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <p className="font-semibold mb-2">Expected Verification Timeline:</p>
                      <p className="text-sm">
                        Your KYC will be reviewed within <strong>few hours to 15 working days</strong>. Physical verification may be conducted for enhanced benefits including priority listing, verified badge, higher limits, and access to finance/logistics/insurance services.
                      </p>
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      variant="outline"
                      className="flex-1 h-12 border-2 border-[#003E6D]/20 text-[#003E6D] rounded-xl"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="flex-1 h-12 bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-[#003E6D] rounded-xl shadow-lg"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Submit KYC
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
