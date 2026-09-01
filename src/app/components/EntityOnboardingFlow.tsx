import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, ArrowLeft, ChevronDown, Upload, Plus, Trash2, 
  Check, Info, AlertCircle, X, FileText, Building2, Users, 
  Shield, CheckCircle2, Crown
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
import { countries } from "./CountryLanguageData";
import { indianStates } from "./IndiaLocationData";

interface EntityOnboardingFlowProps {
  onComplete: () => void;
  onBack: () => void;
  userName?: string;
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
}

interface DocumentUpload {
  id: string;
  name: string;
  required: boolean;
  file: File | null;
  uploaded: boolean;
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
  { id: "micro", label: "Micro" },
  { id: "msme", label: "MSME" },
  { id: "startup", label: "Startup" },
  { id: "large", label: "Large Enterprise" }
];

const designations = {
  proprietor: ["Proprietor"],
  partnership: ["Managing Partner", "Partner"],
  llp: ["Designated Partner", "Partner"],
  limited: ["Chairman", "Managing Director", "CEO", "Director", "Treasurer"],
  society: ["President", "Vice-President", "Treasurer", "Director", "Member"],
  trust: ["Managing Trustee", "Trustee"],
  other: ["Owner", "Director", "Manager"]
};

const roleOptions = [
  "Admin", "Operations", "Trades", "Settlement", 
  "KYC", "Finance", "Reports", "Staff-Mgmt", "Settings"
];

const modules = [
  "Trades", "Wallet", "KYC", "Buyers/Suppliers", 
  "Logistics", "Storage", "Finance", "Reports", "Settings"
];

const permissionLevels = ["View", "Create", "Approve", "Admin"];

export function EntityOnboardingFlow({ 
  onComplete, 
  onBack, 
  userName = "User" 
}: EntityOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Step 1: Organization Roles
  const [selectedOrgRoles, setSelectedOrgRoles] = useState<string[]>([]);
  
  // Step 2: Entity Details
  const [entityName, setEntityName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [entityType, setEntityType] = useState("");
  const [category, setCategory] = useState("");
  const [taxId, setTaxId] = useState("");
  const [msmeId, setMsmeId] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [areaOfOperation, setAreaOfOperation] = useState<string[]>([]);
  const [licensingAuthority, setLicensingAuthority] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [otherEntityType, setOtherEntityType] = useState("");
  
  // Step 3: Documents
  const [documents, setDocuments] = useState<DocumentUpload[]>([]);
  
  // Step 4: Key Persons
  const [keyPersons, setKeyPersons] = useState<KeyPerson[]>([]);
  
  // Step 5: Permissions
  const [permissions, setPermissions] = useState<Record<string, Record<string, string[]>>>({});
  
  // Step 6: Confirmations
  const [confirmedDocuments, setConfirmedDocuments] = useState(false);
  const [confirmedResponsibility, setConfirmedResponsibility] = useState(false);

  const steps = [
    "Organization Type",
    "Entity Details",
    "Documents",
    "Key Persons",
    "Permissions",
    "Review & Submit",
    "Verification"
  ];

  const orgRolesList = [
    { id: "commission-agent", label: "Commission Agent", emoji: "🧾" },
    { id: "buyer", label: "Buyer", emoji: "🛒" },
    { id: "trader", label: "Trader", emoji: "💰" },
    { id: "logistics", label: "Logistics/Transport", emoji: "🚚" },
    { id: "storage", label: "Storage Facility", emoji: "🏠" },
    { id: "insurance", label: "Insurance Company", emoji: "🛡️" },
    { id: "bank", label: "Bank/Financial Inst.", emoji: "🏦" },
    { id: "regulatory", label: "Regulatory Authority", emoji: "🧑‍💻" }
  ];

  const toggleOrgRole = (roleId: string) => {
    setSelectedOrgRoles(prev =>
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const toggleAreaOfOperation = (area: string) => {
    setAreaOfOperation(prev =>
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const addKeyPerson = () => {
    if (keyPersons.length >= 30) return;
    
    const newPerson: KeyPerson = {
      id: `person-${Date.now()}`,
      fullName: "",
      designation: "",
      roles: [],
      email: "",
      mobile: "",
      govId: "",
      ownershipPercent: 0,
      adminRights: entityType === "proprietor"
    };
    
    setKeyPersons([...keyPersons, newPerson]);
  };

  const removeKeyPerson = (id: string) => {
    setKeyPersons(keyPersons.filter(p => p.id !== id));
  };

  const updateKeyPerson = (id: string, field: keyof KeyPerson, value: any) => {
    setKeyPersons(keyPersons.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const getTotalOwnership = () => {
    return keyPersons.reduce((sum, person) => sum + person.ownershipPercent, 0);
  };

  const getDocumentsList = () => {
    // Dynamic document list based on country/state/role
    if (selectedCountry === "India") {
      if (selectedState === "Andhra Pradesh") {
        return [
          { name: "Shop & Establishment Certificate", required: true },
          { name: "Market Committee License (APMC)", required: true },
          { name: "GST Registration Certificate", required: true },
          { name: "PAN Card", required: true },
          { name: "Bank Account Proof", required: true }
        ];
      } else if (selectedState === "Maharashtra") {
        return [
          { name: "Shop & Establishment Certificate", required: true },
          { name: "APMC/Market License", required: true },
          { name: "7/12 Land Record", required: false },
          { name: "GST Registration Certificate", required: true },
          { name: "PAN Card", required: true }
        ];
      }
      // Default India docs
      return [
        { name: "GST Registration Certificate", required: true },
        { name: "PAN Card", required: true },
        { name: "Bank Account Proof", required: true }
      ];
    } else if (selectedCountry === "United States") {
      return [
        { name: "State Business Registration", required: true },
        { name: "FSA/USDA License", required: false },
        { name: "EIN/Tax ID", required: true }
      ];
    } else if (selectedCountry === "Brazil") {
      return [
        { name: "CNPJ", required: true },
        { name: "CAF/Agri Registration", required: true }
      ];
    } else if (selectedCountry === "Kenya") {
      return [
        { name: "Business Permit", required: true },
        { name: "NCPB/Agri Board Registration", required: true },
        { name: "PIN", required: true }
      ];
    }
    
    // Default generic docs
    return [
      { name: "Business Registration", required: true },
      { name: "Tax ID", required: true }
    ];
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedOrgRoles.length > 0;
      case 1:
        return entityName && selectedCountry && entityType && category && taxId;
      case 2:
        return documents.filter(d => d.required).every(d => d.uploaded);
      case 3:
        return keyPersons.length > 0 && 
               (entityType === "proprietor" || getTotalOwnership() === 100);
      case 4:
        return true;
      case 5:
        return confirmedDocuments && confirmedResponsibility;
      default:
        return true;
    }
  };

  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4F8] to-[#D9F2FF] p-4 md:p-6 lg:p-8">
      {/* Background decorations */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#003E6D]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1
            className="text-[#003E6D] mb-2"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "2rem",
            }}
          >
            🏢 Entity Onboarding
          </h1>
          <p
            className="text-[#003E6D]/70"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Complete your organization registration
          </p>
        </motion.div>

        {/* Progress Bar */}
        <Card className="bg-white/80 backdrop-blur-sm border-[#003E6D]/20 p-6 mb-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span
                className="text-sm text-[#003E6D]"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                {steps[currentStep]}
              </span>
              <span
                className="text-sm text-[#003E6D]/60"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          <div className="flex items-center justify-between text-xs text-[#003E6D]/50">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`flex items-center ${
                  idx <= currentStep ? "text-[#003E6D]" : "text-[#003E6D]/30"
                }`}
              >
                {idx < currentStep ? (
                  <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      idx === currentStep
                        ? "border-[#FFD700] bg-[#FFD700]/20"
                        : "border-[#003E6D]/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Organization Type */}
            {currentStep === 0 && (
              <Card className="bg-white/90 backdrop-blur-sm border-[#003E6D]/20 p-6 md:p-8">
                <h2
                  className="text-[#003E6D] mb-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "1.5rem",
                  }}
                >
                  Choose Organization Type
                </h2>
                <p className="text-[#003E6D]/70 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                  Select one or more roles for your organization
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {orgRolesList.map((role) => (
                    <Card
                      key={role.id}
                      onClick={() => toggleOrgRole(role.id)}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedOrgRoles.includes(role.id)
                          ? "border-[#FFD700] border-2 bg-gradient-to-r from-[#FFD700]/10 to-white shadow-lg"
                          : "border-[#003E6D]/20 hover:border-[#FFD700]/50"
                      }`}
                    >
                      <div className="p-4 flex items-center gap-4">
                        <Checkbox
                          checked={selectedOrgRoles.includes(role.id)}
                          className="border-[#003E6D]/30"
                        />
                        <div className="text-2xl">{role.emoji}</div>
                        <div className="flex-1">
                          <p
                            className="text-[#003E6D]"
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            {role.label}
                          </p>
                        </div>
                        {selectedOrgRoles.includes(role.id) && (
                          <CheckCircle2 className="w-5 h-5 text-[#FFD700]" />
                        )}
                      </div>
                    </Card>
                  ))}
                </div>

                <Alert className="border-[#003E6D]/20 bg-[#003E6D]/5">
                  <Info className="h-4 w-4 text-[#003E6D]" />
                  <AlertDescription className="text-[#003E6D]" style={{ fontFamily: "Inter, sans-serif" }}>
                    You can select multiple roles. Each role will require specific documentation and verification.
                  </AlertDescription>
                </Alert>
              </Card>
            )}

            {/* Step 2: Entity Details */}
            {currentStep === 1 && (
              <Card className="bg-white/90 backdrop-blur-sm border-[#003E6D]/20 p-6 md:p-8">
                <h2
                  className="text-[#003E6D] mb-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "1.5rem",
                  }}
                >
                  Entity Details
                </h2>

                <Alert className="border-blue-400 bg-blue-50 mb-6">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                    Field labels and requirements adapt to your selected country and state
                  </AlertDescription>
                </Alert>

                <div className="space-y-6">
                  {/* Entity Name */}
                  <div>
                    <Label htmlFor="entityName" className="text-[#003E6D]">
                      Entity Name *
                    </Label>
                    <Input
                      id="entityName"
                      value={entityName}
                      onChange={(e) => setEntityName(e.target.value)}
                      placeholder="Enter your organization name"
                      className="mt-2"
                    />
                  </div>

                  {/* Country & State */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country" className="text-[#003E6D]">
                        Country *
                      </Label>
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.name} value={country.name}>
                              {country.flag} {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedCountry === "India" && (
                      <div>
                        <Label htmlFor="state" className="text-[#003E6D]">
                          State/Region *
                        </Label>
                        <Select value={selectedState} onValueChange={setSelectedState}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* Entity Type */}
                  <div>
                    <Label className="text-[#003E6D] mb-3 block">Type of Entity *</Label>
                    <RadioGroup value={entityType} onValueChange={setEntityType}>
                      <div className="grid md:grid-cols-2 gap-3">
                        {entityTypes.map((type) => (
                          <div
                            key={type.id}
                            className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50"
                          >
                            <RadioGroupItem value={type.id} id={type.id} />
                            <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                              {type.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>

                    {entityType === "other" && (
                      <Input
                        value={otherEntityType}
                        onChange={(e) => setOtherEntityType(e.target.value)}
                        placeholder="Describe entity type"
                        className="mt-3"
                      />
                    )}
                  </div>

                  {/* Category & Tax ID */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="text-[#003E6D]">
                        Category *
                      </Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="taxId" className="text-[#003E6D]">
                        {selectedCountry === "India" ? "PAN" : "Tax ID"} *
                      </Label>
                      <Input
                        id="taxId"
                        value={taxId}
                        onChange={(e) => setTaxId(e.target.value)}
                        placeholder={selectedCountry === "India" ? "ABCDE1234F" : "Enter tax ID"}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  {/* MSME ID (India only) */}
                  {selectedCountry === "India" && (
                    <div>
                      <Label htmlFor="msmeId" className="text-[#003E6D] flex items-center gap-2">
                        Udyam Aadhaar / MSME ID
                        <Badge variant="outline" className="text-xs">Optional</Badge>
                      </Label>
                      <Input
                        id="msmeId"
                        value={msmeId}
                        onChange={(e) => setMsmeId(e.target.value)}
                        placeholder="UDYAM-XX-00-0000000"
                        className="mt-2"
                      />
                    </div>
                  )}

                  {/* Registered Address */}
                  <div>
                    <Label htmlFor="address" className="text-[#003E6D]">
                      Registered Address *
                    </Label>
                    <Textarea
                      id="address"
                      value={registeredAddress}
                      onChange={(e) => setRegisteredAddress(e.target.value)}
                      placeholder="Enter complete registered address"
                      className="mt-2"
                      rows={3}
                    />
                  </div>

                  {/* Area of Operation */}
                  <div>
                    <Label className="text-[#003E6D] mb-3 block">Area of Operation *</Label>
                    <div className="flex gap-4">
                      {["Local", "Inter-State", "International"].map((area) => (
                        <div key={area} className="flex items-center gap-2">
                          <Checkbox
                            id={area}
                            checked={areaOfOperation.includes(area)}
                            onCheckedChange={() => toggleAreaOfOperation(area)}
                          />
                          <Label htmlFor={area} className="cursor-pointer">{area}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* License Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="authority" className="text-[#003E6D]">
                        License/Registration Issuing Authority *
                      </Label>
                      <Input
                        id="authority"
                        value={licensingAuthority}
                        onChange={(e) => setLicensingAuthority(e.target.value)}
                        placeholder="Enter govt. dept./board name"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="licenseNo" className="text-[#003E6D]">
                        License/Registration Number *
                      </Label>
                      <Input
                        id="licenseNo"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        placeholder="Enter license number"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  {/* Registration Date */}
                  <div>
                    <Label htmlFor="regDate" className="text-[#003E6D]">
                      Registration Date *
                    </Label>
                    <Input
                      id="regDate"
                      type="date"
                      value={registrationDate}
                      onChange={(e) => setRegistrationDate(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 2 && (
              <Card className="bg-white/90 backdrop-blur-sm border-[#003E6D]/20 p-6 md:p-8">
                <h2
                  className="text-[#003E6D] mb-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "1.5rem",
                  }}
                >
                  Upload Regulatory Documents
                </h2>

                <Alert className="border-blue-400 bg-blue-50 mb-6">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                    Documents required based on: {selectedCountry}
                    {selectedState && ` / ${selectedState}`}
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  {getDocumentsList().map((doc, idx) => (
                    <Card key={idx} className="border-[#003E6D]/20 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-[#003E6D]">
                            {doc.name}
                            {doc.required && <span className="text-red-500 ml-1">*</span>}
                          </p>
                        </div>
                        {doc.required && (
                          <Badge className="bg-red-100 text-red-700 border-red-300">Required</Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:border-[#FFD700] transition-all">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload</p>
                          <p className="text-xs text-gray-400">PDF, JPG, PNG</p>
                        </div>
                        <div className="border-2 border-gray-300 rounded-lg h-32 flex items-center justify-center bg-gray-100">
                          <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                    </Card>
                  ))}

                  {/* Others Option */}
                  <Card className="border-[#003E6D]/20 p-4 bg-gray-50">
                    <p className="font-semibold text-[#003E6D] mb-3">Others (Optional)</p>
                    <div className="space-y-3">
                      <Input placeholder="Document Type" />
                      <Textarea placeholder="Short Description" rows={2} />
                      <div className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-[#FFD700]">
                        <Upload className="w-6 h-6 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">Upload Document</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            )}

            {/* Step 4: Key Persons */}
            {currentStep === 3 && (
              <Card className="bg-white/90 backdrop-blur-sm border-[#003E6D]/20 p-6 md:p-8">
                <h2
                  className="text-[#003E6D] mb-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "1.5rem",
                  }}
                >
                  Ownership / Key Persons
                </h2>

                {entityType === "proprietor" && (
                  <Alert className="border-amber-400 bg-amber-50 mb-6">
                    <Crown className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                      <strong>Proprietor:</strong> All admin rights vest with the Proprietor by default. You can assign staff permissions below.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4 mb-6">
                  {keyPersons.map((person, idx) => (
                    <Card key={person.id} className="border-[#003E6D]/20 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-[#003E6D]">Person #{idx + 1}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeKeyPerson(person.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <Input
                          placeholder="Full Name *"
                          value={person.fullName}
                          onChange={(e) => updateKeyPerson(person.id, "fullName", e.target.value)}
                        />
                        <Input
                          placeholder="Email *"
                          type="email"
                          value={person.email}
                          onChange={(e) => updateKeyPerson(person.id, "email", e.target.value)}
                        />
                        <Input
                          placeholder="Mobile *"
                          value={person.mobile}
                          onChange={(e) => updateKeyPerson(person.id, "mobile", e.target.value)}
                        />
                        <Input
                          placeholder={selectedCountry === "India" ? "PAN" : "Govt. ID *"}
                          value={person.govId}
                          onChange={(e) => updateKeyPerson(person.id, "govId", e.target.value)}
                        />
                        <Input
                          placeholder="Ownership %"
                          type="number"
                          min="0"
                          max="100"
                          value={person.ownershipPercent || ""}
                          onChange={(e) => updateKeyPerson(person.id, "ownershipPercent", Number(e.target.value))}
                        />
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={person.adminRights}
                            onCheckedChange={(checked) => updateKeyPerson(person.id, "adminRights", checked)}
                          />
                          <Label className="text-sm">Admin Rights</Label>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Button
                  onClick={addKeyPerson}
                  variant="outline"
                  className="w-full border-[#003E6D]/30 text-[#003E6D] hover:border-[#FFD700] hover:bg-[#FFD700]/10 mb-6"
                  disabled={keyPersons.length >= 30}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Person (Max 30)
                </Button>

                {entityType !== "proprietor" && (
                  <Card className={`p-4 ${getTotalOwnership() === 100 ? "bg-green-50 border-green-400" : "bg-amber-50 border-amber-400"}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Ownership Total:</span>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold">{getTotalOwnership()}%</span>
                        {getTotalOwnership() !== 100 && (
                          <Badge className="bg-amber-100 text-amber-700 border-amber-400">
                            Must equal 100%
                          </Badge>
                        )}
                        {getTotalOwnership() === 100 && (
                          <Badge className="bg-green-100 text-green-700 border-green-400">
                            <Check className="w-3 h-3 mr-1" /> Complete
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                )}
              </Card>
            )}

            {/* Step 5: Permissions (Simplified) */}
            {currentStep === 4 && (
              <Card className="bg-white/90 backdrop-blur-sm border-[#003E6D]/20 p-6 md:p-8">
                <h2
                  className="text-[#003E6D] mb-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "1.5rem",
                  }}
                >
                  Permissions & Access
                </h2>

                <Alert className="border-blue-400 bg-blue-50 mb-6">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
                    Permissions can be fine-tuned later in the dashboard. This is a basic assignment.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  {keyPersons.map((person, idx) => (
                    <Card key={person.id} className="border-[#003E6D]/20 p-4">
                      <h3 className="font-semibold text-[#003E6D] mb-3">
                        {person.fullName || `Person #${idx + 1}`}
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {modules.map((module) => (
                          <div key={module} className="flex items-center gap-2">
                            <Checkbox id={`${person.id}-${module}`} />
                            <Label htmlFor={`${person.id}-${module}`} className="text-sm">
                              {module}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* Step 6: Review & Confirm */}
            {currentStep === 5 && (
              <Card className="bg-white/90 backdrop-blur-sm border-[#003E6D]/20 p-6 md:p-8">
                <h2
                  className="text-[#003E6D] mb-6"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "1.5rem",
                  }}
                >
                  Review & Confirm
                </h2>

                <div className="space-y-6">
                  {/* Entity Details */}
                  <Card className="border-[#003E6D]/20 p-6">
                    <h3 className="font-bold text-[#003E6D] mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Entity Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Entity Name:</p>
                        <p className="font-semibold text-gray-900">{entityName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Country:</p>
                        <p className="font-semibold text-gray-900">{selectedCountry}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Entity Type:</p>
                        <p className="font-semibold text-gray-900">
                          {entityTypes.find(t => t.id === entityType)?.label}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Category:</p>
                        <p className="font-semibold text-gray-900">
                          {categories.find(c => c.id === category)?.label}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Key Persons */}
                  <Card className="border-[#003E6D]/20 p-6">
                    <h3 className="font-bold text-[#003E6D] mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Key Persons ({keyPersons.length})
                    </h3>
                    {entityType !== "proprietor" && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-400 rounded">
                        <p className="text-sm text-green-700">
                          <Check className="w-4 h-4 inline mr-2" />
                          Ownership Total: <strong>{getTotalOwnership()}%</strong>
                        </p>
                      </div>
                    )}
                    <div className="space-y-3">
                      {keyPersons.map((person, idx) => (
                        <div key={person.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-semibold text-gray-900">{person.fullName}</p>
                            <p className="text-xs text-gray-600">{person.email}</p>
                          </div>
                          {person.ownershipPercent > 0 && (
                            <Badge className="bg-[#003E6D] text-white">
                              {person.ownershipPercent}%
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Confirmations */}
                  <Card className="border-[#003E6D]/20 p-6 bg-[#003E6D]/5">
                    <h3 className="font-bold text-[#003E6D] mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Confirmations Required
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="confirm-docs"
                          checked={confirmedDocuments}
                          onCheckedChange={(checked) => setConfirmedDocuments(checked as boolean)}
                        />
                        <Label htmlFor="confirm-docs" className="text-sm text-[#003E6D] cursor-pointer">
                          I certify that all documents are authentic and valid for the selected jurisdiction.
                        </Label>
                      </div>

                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="confirm-resp"
                          checked={confirmedResponsibility}
                          onCheckedChange={(checked) => setConfirmedResponsibility(checked as boolean)}
                        />
                        <Label htmlFor="confirm-resp" className="text-sm text-[#003E6D] cursor-pointer">
                          I accept responsibility for the assigned roles and permissions.
                        </Label>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            )}

            {/* Step 7: Success */}
            {currentStep === 6 && (
              <Card className="bg-white/90 backdrop-blur-sm border-[#003E6D]/20 p-8 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-12 h-12 text-green-600" />
                </div>
                
                <h2
                  className="text-[#003E6D] mb-4"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontWeight: 700,
                    fontSize: "2rem",
                  }}
                >
                  Submitted for Verification ✓
                </h2>
                
                <p className="text-[#003E6D]/70 text-lg mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                  Your entity onboarding application has been submitted successfully!
                </p>

                <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Application ID:</strong> ENT-{Date.now().toString().slice(-6)}
                  </p>
                </div>

                <Alert className="border-blue-400 bg-blue-50 mb-6 text-left">
                  <Info className="h-5 w-5 text-blue-600" />
                  <AlertDescription className="text-gray-700">
                    <strong className="block mb-2">Verification Timeline:</strong>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Producers:</strong> Up to 10 working days</li>
                      <li>• <strong>Other entities:</strong> Up to 15 working days</li>
                      <li>• Physical verification may be required for non-producer roles</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={onComplete}
                    className="bg-[#003E6D] hover:bg-[#002A4D] text-white"
                  >
                    Go to Limited Dashboard
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(0)}
                    variant="outline"
                    className="border-[#003E6D]/30"
                  >
                    Add Another Entity
                  </Button>
                </div>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentStep < 6 && (
          <div className="flex justify-between mt-6">
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="border-[#003E6D]/30 text-[#003E6D] hover:border-[#003E6D]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-white shadow-lg disabled:opacity-50"
            >
              {currentStep === 5 ? "Submit for Verification" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
