import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Upload, FileCheck, CheckCircle, AlertCircle, ArrowLeft, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface ProducerIdentityConfirmationProps {
  onSubmit: () => void;
  onSkip: () => void;
  onBack?: () => void;
}

// Country data with flags and document types
const countryDocuments = {
  india: {
    flag: "🇮🇳",
    name: "India",
    documents: [
      { value: "pattadar", label: "Pattadar Passbook" },
      { value: "farmer-id", label: "Farmer ID Card / Kisan Card" },
      { value: "rythu-bharosa", label: "Rythu Bharosa Card" },
      { value: "aadhar-ref", label: "Aadhar (For Reference Only)" },
      { value: "pm-kisan", label: "PM-Kisan Registration" },
      { value: "land-records", label: "Land Records / Revenue Document" },
      { value: "others", label: "Others (Please Specify)" },
    ],
  },
  usa: {
    flag: "🇺🇸",
    name: "USA",
    documents: [
      { value: "fsa-registration", label: "Farm Service Agency (FSA) Registration" },
      { value: "ag-license", label: "Agricultural License" },
      { value: "tax-id-ag", label: "Tax ID (Agriculture)" },
      { value: "usda-registration", label: "USDA Producer Registration" },
      { value: "farm-number", label: "Farm Number / Tract Number" },
      { value: "others", label: "Others (Please Specify)" },
    ],
  },
  brazil: {
    flag: "🇧🇷",
    name: "Brazil",
    documents: [
      { value: "caf-registration", label: "CAF Registration" },
      { value: "cpr-document", label: "CPR Document (Cadastro de Pessoa Rural)" },
      { value: "rural-producer-id", label: "Rural Producer ID" },
      { value: "incra-registration", label: "INCRA Registration" },
      { value: "dap", label: "DAP (Declaração de Aptidão ao Pronaf)" },
      { value: "others", label: "Others (Please Specify)" },
    ],
  },
  kenya: {
    flag: "🇰🇪",
    name: "Kenya",
    documents: [
      { value: "farmer-coop-card", label: "Farmer Cooperative Membership Card" },
      { value: "ncpb-registration", label: "NCPB Registration" },
      { value: "national-id", label: "National ID (Producer Verification)" },
      { value: "agri-extension", label: "Agriculture Extension Certificate" },
      { value: "land-title", label: "Land Title Deed" },
      { value: "others", label: "Others (Please Specify)" },
    ],
  },
  nigeria: {
    flag: "🇳🇬",
    name: "Nigeria",
    documents: [
      { value: "farmer-id", label: "Farmer ID Card" },
      { value: "agric-cooperative", label: "Agricultural Cooperative Membership" },
      { value: "nafdac-registration", label: "NAFDAC Registration (Food Producers)" },
      { value: "land-certificate", label: "Land Certificate of Occupancy" },
      { value: "others", label: "Others (Please Specify)" },
    ],
  },
  australia: {
    flag: "🇦🇺",
    name: "Australia",
    documents: [
      { value: "pic", label: "Property Identification Code (PIC)" },
      { value: "abn", label: "Australian Business Number (ABN)" },
      { value: "nlis", label: "NLIS Registration" },
      { value: "farm-business-id", label: "Farm Business Registration" },
      { value: "others", label: "Others (Please Specify)" },
    ],
  },
  canada: {
    flag: "🇨🇦",
    name: "Canada",
    documents: [
      { value: "farm-registration", label: "Farm Registration Number" },
      { value: "business-number", label: "Business Number (Agriculture)" },
      { value: "premises-id", label: "Premises Identification Number" },
      { value: "agri-insurance", label: "Agricultural Insurance Document" },
      { value: "others", label: "Others (Please Specify)" },
    ],
  },
  others: {
    flag: "🌍",
    name: "Others",
    documents: [
      { value: "producer-registration", label: "Producer/Farmer Registration ID" },
      { value: "agricultural-license", label: "Agricultural License" },
      { value: "cooperative-membership", label: "Cooperative Membership Card" },
      { value: "land-ownership", label: "Land Ownership Document" },
      { value: "others", label: "Others (Please Specify)" },
    ],
  },
};

const countries = [
  { value: "india", ...countryDocuments.india },
  { value: "usa", ...countryDocuments.usa },
  { value: "brazil", ...countryDocuments.brazil },
  { value: "kenya", ...countryDocuments.kenya },
  { value: "nigeria", ...countryDocuments.nigeria },
  { value: "australia", ...countryDocuments.australia },
  { value: "canada", ...countryDocuments.canada },
  { value: "others", ...countryDocuments.others },
];

export function ProducerIdentityConfirmation({ onSubmit, onSkip, onBack }: ProducerIdentityConfirmationProps) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [customDocumentType, setCustomDocumentType] = useState("");
  const [customDocumentDescription, setCustomDocumentDescription] = useState("");
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [producerId, setProducerId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Get current country data
  const currentCountry = countries.find(c => c.value === selectedCountry);
  const availableDocuments = currentCountry?.documents || [];

  // Get selected document label
  const selectedDocLabel = availableDocuments.find(doc => doc.value === documentType)?.label || "";

  // Handle country change - reset document selection
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setDocumentType("");
    setCustomDocumentType("");
    setCustomDocumentDescription("");
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!selectedCountry || !documentType || !documentFile) {
      return;
    }

    if (documentType === "others" && (!customDocumentType.trim() || !customDocumentDescription.trim())) {
      return;
    }

    // Show success message
    setShowSuccess(true);

    // Auto-proceed after 4 seconds
    setTimeout(() => {
      onSubmit();
    }, 4000);
  };

  const isFormValid = () => {
    const hasCountry = selectedCountry !== "";
    const hasDocType = documentType !== "";
    const hasFile = documentFile !== null;
    const hasCustomDetails = documentType === "others" 
      ? (customDocumentType.trim() !== "" && customDocumentDescription.trim() !== "")
      : true;

    return hasCountry && hasDocType && hasFile && hasCustomDetails;
  };

  // Animation variants
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Success screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4FC] to-[#D9F2FF] relative overflow-hidden flex items-center justify-center">
        {/* Decorative Background */}
        <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#003E6D]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <motion.div
          className="max-w-md mx-auto px-4 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/90 backdrop-blur-md shadow-2xl border border-white/50 p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-[#FFD700] blur-2xl opacity-40"></div>
                <div className="relative bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
              </div>
            </motion.div>

            <motion.h2
              className="text-[#003E6D] mb-4"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "1.5rem",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Identity Submitted! ✓
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Alert className="bg-[#FFD700]/10 border-[#FFD700]/30 mb-6">
                <Shield className="h-4 w-4 text-[#FFD700]" />
                <AlertDescription
                  className="text-[#003E6D]"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                  }}
                >
                  <strong>Your documents are under verification.</strong> This process may take{" "}
                  <strong>1–10 working days</strong> depending on your country's regulatory requirements.
                </AlertDescription>
              </Alert>

              <p
                className="text-[#003E6D]/70 mb-6"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.875rem",
                  lineHeight: "1.6",
                }}
              >
                You'll receive notifications via SMS and email once your producer identity is verified. 
                You can now proceed to complete your KYC verification!
              </p>

              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse"></div>
                <p
                  className="text-[#003E6D]/60"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.75rem",
                  }}
                >
                  Proceeding to KYC verification...
                </p>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Main form screen
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
          <div className="flex items-center justify-between">
            {/* Back Button */}
            {onBack && (
              <motion.button
                onClick={onBack}
                className="flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md border shadow-lg"
                style={{
                  background: `linear-gradient(135deg, #FFFFFF95, #FFFFFF85)`,
                  borderColor: `#FFD70040`,
                  boxShadow: `0 4px 12px #FFD70020, 0 2px 4px #003E6D10`,
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0 6px 20px #FFD70030, 0 3px 6px #003E6D15`,
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ArrowLeft className="w-5 h-5" style={{ color: '#FFD700' }} />
              </motion.button>
            )}
            {!onBack && <div className="w-10"></div>}

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

            {/* Spacer */}
            <div className="w-10"></div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Banner with Verification Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 relative overflow-hidden rounded-3xl"
          >
            <Card className="bg-gradient-to-br from-[#003E6D]/10 via-[#FFD700]/5 to-[#003E6D]/10 border-2 border-[#FFD700]/30 shadow-xl">
              <div className="p-6 md:p-8 relative">
                {/* Gold Seal Badge */}
                <div className="absolute top-0 right-0 opacity-10">
                  <div className="relative w-32 h-32">
                    <Shield className="w-32 h-32 text-[#FFD700]" />
                    <CheckCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-[#003E6D]" />
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-[#FFD700] text-[#003E6D] border-0">
                      Identity Verification
                    </Badge>
                    <Badge className="bg-[#003E6D] text-white border-0">
                      Priority Access
                    </Badge>
                  </div>
                  <h1
                    className="text-[#003E6D] mb-2"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.875rem",
                    }}
                  >
                    🛡️ Confirm Your Producer Identity
                  </h1>
                  <p
                    className="text-[#003E6D]/80"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    Provide official producer identification based on your country's standards.
                    Verified producers get priority listing and access to premium features.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Form Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8 mb-6">
              <div className="space-y-6">
                {/* Country Selection */}
                <div className="space-y-2">
                  <Label
                    htmlFor="country"
                    className="text-[#003E6D] flex items-center gap-2"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    <Globe className="w-4 h-4" />
                    Select Country *
                  </Label>
                  <p
                    className="text-[#003E6D]/60 mb-2"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                    }}
                  >
                    Choose your country to see available producer identity documents
                  </p>
                  <Select value={selectedCountry} onValueChange={handleCountryChange}>
                    <SelectTrigger 
                      className="w-full h-12 rounded-xl bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700]"
                      style={{
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <SelectValue placeholder="🌍 Choose your country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {countries.map((country) => (
                        <SelectItem 
                          key={country.value} 
                          value={country.value}
                          className="cursor-pointer"
                          style={{
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-lg">{country.flag}</span>
                            <span>{country.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Show selected country */}
                  {selectedCountry && currentCountry && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 p-3 bg-[#FFD700]/10 rounded-xl border border-[#FFD700]/30"
                    >
                      <p
                        className="text-[#003E6D] flex items-center gap-2"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.875rem",
                        }}
                      >
                        <span className="text-xl">{currentCountry.flag}</span>
                        <span>
                          ✓ Selected: <strong>{currentCountry.name}</strong>
                        </span>
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Document Type Selection - Only shows when country is selected */}
                <AnimatePresence>
                  {selectedCountry && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <Label
                        htmlFor="document-type"
                        className="text-[#003E6D]"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      >
                        Select Document Type *
                      </Label>
                      <p
                        className="text-[#003E6D]/60 mb-2"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.75rem",
                        }}
                      >
                        Choose from {currentCountry?.name}'s recognized producer identity documents
                      </p>
                      <Select value={documentType} onValueChange={setDocumentType}>
                        <SelectTrigger 
                          className="w-full h-12 rounded-xl bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700]"
                          style={{
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          <SelectValue placeholder="📄 Choose document type" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {availableDocuments.map((doc) => (
                            <SelectItem 
                              key={doc.value} 
                              value={doc.value}
                              className="cursor-pointer"
                              style={{
                                fontFamily: "Inter, sans-serif",
                              }}
                            >
                              {doc.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Show selected document */}
                      {documentType && documentType !== "others" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 p-3 bg-[#003E6D]/10 rounded-xl border border-[#003E6D]/30"
                        >
                          <p
                            className="text-[#003E6D]"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "0.875rem",
                            }}
                          >
                            ✓ Selected: <strong>{selectedDocLabel}</strong>
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Others - Custom Document Fields */}
                <AnimatePresence>
                  {documentType === "others" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Custom Document Type */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="custom-doc-type"
                          className="text-[#003E6D]"
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                          }}
                        >
                          Specify Document Type *
                        </Label>
                        <Input
                          id="custom-doc-type"
                          placeholder="e.g., Tribal Land Certificate, Producer License"
                          value={customDocumentType}
                          onChange={(e) => setCustomDocumentType(e.target.value)}
                          className="bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700]"
                          style={{
                            fontFamily: "Inter, sans-serif",
                          }}
                        />
                      </div>

                      {/* Description Box */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="custom-doc-description"
                          className="text-[#003E6D]"
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                          }}
                        >
                          Document Description *
                        </Label>
                        <p
                          className="text-[#003E6D]/60 mb-2"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.75rem",
                          }}
                        >
                          Describe the document or ID that certifies your producer status
                        </p>
                        <Textarea
                          id="custom-doc-description"
                          placeholder="Explain what this document is, who issued it, and how it proves your producer/farmer status..."
                          value={customDocumentDescription}
                          onChange={(e) => setCustomDocumentDescription(e.target.value)}
                          rows={4}
                          className="bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700] resize-none"
                          style={{
                            fontFamily: "Inter, sans-serif",
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Producer ID Number */}
                <AnimatePresence>
                  {documentType && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="space-y-2"
                    >
                      <Label
                        htmlFor="producer-id"
                        className="text-[#003E6D]"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      >
                        Producer Passbook / Farm ID Number (Optional)
                      </Label>
                      <Input
                        id="producer-id"
                        placeholder="Enter your producer ID or registration number"
                        value={producerId}
                        onChange={(e) => setProducerId(e.target.value)}
                        className="bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700]"
                        style={{
                          fontFamily: "Inter, sans-serif",
                        }}
                      />
                      <p
                        className="text-[#003E6D]/60"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.75rem",
                        }}
                      >
                        Your unique producer/farmer identification number (if applicable)
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Document Upload */}
                <AnimatePresence>
                  {documentType && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="space-y-2"
                    >
                      <Label
                        className="text-[#003E6D]"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      >
                        Upload Document Copy *
                      </Label>
                      <p
                        className="text-[#003E6D]/60 mb-2"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.75rem",
                        }}
                      >
                        Upload clear photo or scanned copy (JPG, PNG, PDF - Max 10MB)
                      </p>
                      <div className="relative">
                        <input
                          type="file"
                          id="document-file"
                          accept="image/*,.pdf"
                          onChange={handleDocumentUpload}
                          className="hidden"
                        />
                        <label htmlFor="document-file">
                          <motion.div
                            className="flex items-center justify-center gap-3 p-6 bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 border-2 border-dashed border-[#FFD700]/40 rounded-2xl cursor-pointer hover:border-[#FFD700] transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="relative">
                              <div className="absolute inset-0 bg-[#FFD700] blur-md opacity-20"></div>
                              <div className="relative bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                                {documentFile ? (
                                  <FileCheck className="w-6 h-6 text-white" />
                                ) : (
                                  <Upload className="w-6 h-6 text-white" />
                                )}
                              </div>
                            </div>
                            <div>
                              <p
                                className="text-[#003E6D]"
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontWeight: 600,
                                  fontSize: "0.875rem",
                                }}
                              >
                                {documentFile
                                  ? `✓ ${documentFile.name}`
                                  : "Click to upload document"}
                              </p>
                              <p
                                className="text-[#003E6D]/60"
                                style={{
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: "0.75rem",
                                }}
                              >
                                {documentFile
                                  ? `${(documentFile.size / 1024 / 1024).toFixed(2)} MB`
                                  : "Clear photo or scan preferred"}
                              </p>
                            </div>
                          </motion.div>
                        </label>

                        {/* File preview */}
                        {documentFile && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 p-3 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/30"
                          >
                            <div className="flex items-center gap-2">
                              <FileCheck className="w-4 h-4 text-[#FFD700]" />
                              <span
                                className="text-[#003E6D] flex-1"
                                style={{
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: "0.875rem",
                                }}
                              >
                                File uploaded successfully ✓
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          {/* Help Text Section */}
          <motion.div variants={itemVariants} className="mb-6">
            <Card className="bg-gradient-to-br from-[#003E6D]/10 to-[#003E6D]/5 border border-[#003E6D]/20 rounded-2xl shadow-lg">
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#003E6D] blur-md opacity-30"></div>
                      <div className="relative bg-gradient-to-br from-[#003E6D] to-[#004A7C] rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                        <AlertCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-[#003E6D] mb-3"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: "1rem",
                      }}
                    >
                      Why Identity Verification Matters
                    </h3>
                    <p
                      className="text-[#003E6D]/80 mb-4"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        lineHeight: "1.7",
                      }}
                    >
                      Identity verification ensures genuine participation and priority listing for verified producers.
                      Complete verification to gain access to all features, including:
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Premium AI insights and price predictions",
                        "Better visibility and priority listing",
                        "Access to financial services and credit",
                        "Verified badge on your producer profile",
                        "Enhanced trust with buyers and traders",
                        "Protection and dispute resolution support",
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="text-[#003E6D]/70 flex items-start gap-2"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.875rem",
                          }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <span className="text-[#FFD700] mt-1">●</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-[#003E6D] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed h-14 rounded-2xl"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Submit for Review
            </Button>

            <Button
              onClick={onSkip}
              variant="outline"
              className="w-full border-2 border-[#003E6D]/30 bg-white/50 hover:bg-[#003E6D]/5 text-[#003E6D] h-12 rounded-2xl"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Skip for Now (Limited Access)
            </Button>

            <p
              className="text-center text-[#003E6D]/60"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
              }}
            >
              * Required fields must be filled to submit for priority verification
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
