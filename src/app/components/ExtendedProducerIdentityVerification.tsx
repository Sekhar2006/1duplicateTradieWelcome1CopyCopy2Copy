import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Upload, 
  FileCheck, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft, 
  Globe,
  MapPin,
  Info,
  Image as ImageIcon,
  X
} from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface ExtendedProducerIdentityVerificationProps {
  onNext: () => void;
  onBack?: () => void;
}

// Regional document configuration
const regionalDocuments = {
  india: {
    flag: "🇮🇳",
    name: "India",
    regions: {
      "andhra-pradesh": {
        name: "Andhra Pradesh",
        documents: [
          { value: "pattadar", label: "Pattadar Passbook" },
          { value: "farmer-id", label: "Farmer ID Card" },
          { value: "lease-certificate", label: "Lease Certificate" },
          { value: "others", label: "Others (Please Specify)" },
        ],
      },
      maharashtra: {
        name: "Maharashtra",
        documents: [
          { value: "7-12-extract", label: "7/12 Extract (Satbara Utara)" },
          { value: "farmer-id", label: "Farmer ID Card" },
          { value: "fmb-sketch", label: "FMB Sketch" },
          { value: "others", label: "Others (Please Specify)" },
        ],
      },
      karnataka: {
        name: "Karnataka",
        documents: [
          { value: "rct-land-records", label: "RTC (Record of Rights)" },
          { value: "farmer-id", label: "Farmer ID Card" },
          { value: "pahani", label: "Pahani Document" },
          { value: "others", label: "Others (Please Specify)" },
        ],
      },
      "tamil-nadu": {
        name: "Tamil Nadu",
        documents: [
          { value: "pattadar-passbook", label: "Pattadar Passbook" },
          { value: "farmer-id", label: "Farmer ID Card" },
          { value: "chitta", label: "Chitta / Adangal" },
          { value: "others", label: "Others (Please Specify)" },
        ],
      },
      punjab: {
        name: "Punjab",
        documents: [
          { value: "jamabandi", label: "Jamabandi (Land Records)" },
          { value: "farmer-id", label: "Farmer ID Card" },
          { value: "fard", label: "Fard Document" },
          { value: "others", label: "Others (Please Specify)" },
        ],
      },
      "other-states": {
        name: "Other States",
        documents: [
          { value: "land-records", label: "State Land Records Document" },
          { value: "farmer-id", label: "Farmer ID Card" },
          { value: "revenue-document", label: "Revenue Department Certificate" },
          { value: "others", label: "Others (Please Specify)" },
        ],
      },
    },
  },
  usa: {
    flag: "🇺🇸",
    name: "USA",
    regions: {
      all: {
        name: "All States",
        documents: [
          { value: "fsa-registration", label: "FSA Registration Certificate" },
          { value: "land-ownership-deed", label: "Land Ownership Deed" },
          { value: "farm-number", label: "Farm Number Documentation" },
          { value: "usda-certificate", label: "USDA Producer Certificate" },
          { value: "others", label: "Others (Please Specify)" },
        ],
      },
    },
  },
  brazil: {
    flag: "🇧🇷",
    name: "Brazil",
    regions: {
      all: {
        name: "All Regions",
        documents: [
          { value: "caf-declaration", label: "CAF Declaration (Cadastro de Atividade Rural)" },
          { value: "rural-land-certificate", label: "Rural Land Certificate" },
          { value: "incra-document", label: "INCRA Registration Document" },
          { value: "dap", label: "DAP (Declaração de Aptidão ao Pronaf)" },
          { value: "others", label: "Others (Please Specify)" },
        ],
      },
    },
  },
  kenya: {
    flag: "🇰🇪",
    name: "Kenya",
    regions: {
      all: {
        name: "All Counties",
        documents: [
          { value: "agri-land-registration", label: "Agricultural Land Registration Certificate" },
          { value: "land-title-deed", label: "Land Title Deed" },
          { value: "ncpb-registration", label: "NCPB Registration" },
          { value: "cooperative-membership", label: "Farmer Cooperative Membership Card" },
          { value: "others", label: "Others (Please Specify)" },
        ],
      },
    },
  },
  ghana: {
    flag: "🇬🇭",
    name: "Ghana",
    regions: {
      all: {
        name: "All Regions",
        documents: [
          { value: "mofa-registration", label: "MoFA Farmer Registration Certificate" },
          { value: "land-certificate", label: "Land Use Certificate" },
          { value: "fbo-membership", label: "FBO Membership Card" },
          { value: "others", label: "Others (Please Specify)" },
        ],
      },
    },
  },
  nigeria: {
    flag: "🇳🇬",
    name: "Nigeria",
    regions: {
      all: {
        name: "All States",
        documents: [
          { value: "farmer-id", label: "E-Wallet Farmer ID" },
          { value: "land-certificate", label: "Certificate of Occupancy (C of O)" },
          { value: "cooperative-id", label: "Agricultural Cooperative ID" },
          { value: "others", label: "Others (Please Specify)" },
        ],
      },
    },
  },
  others: {
    flag: "🌍",
    name: "Other Countries",
    regions: {
      all: {
        name: "All Regions",
        documents: [
          { value: "govt-producer-id", label: "Government-issued Producer ID" },
          { value: "land-tenancy-proof", label: "Land Tenancy / Lease Proof" },
          { value: "agricultural-license", label: "Agricultural License" },
          { value: "others", label: "Others (Please Specify)" },
        ],
      },
    },
  },
};

const countries = [
  { value: "india", ...regionalDocuments.india },
  { value: "usa", ...regionalDocuments.usa },
  { value: "brazil", ...regionalDocuments.brazil },
  { value: "kenya", ...regionalDocuments.kenya },
  { value: "ghana", ...regionalDocuments.ghana },
  { value: "nigeria", ...regionalDocuments.nigeria },
  { value: "others", ...regionalDocuments.others },
];

export function ExtendedProducerIdentityVerification({ 
  onNext, 
  onBack 
}: ExtendedProducerIdentityVerificationProps) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [customDocumentDescription, setCustomDocumentDescription] = useState("");
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get current country and region data
  const currentCountry = countries.find(c => c.value === selectedCountry);
  const availableRegions = currentCountry?.regions || {};
  const regionKeys = Object.keys(availableRegions);
  const currentRegion = selectedRegion ? availableRegions[selectedRegion] : null;
  const availableDocuments = currentRegion?.documents || [];

  // Handle country change - reset region and document
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedRegion("");
    setDocumentType("");
    setCustomDocumentDescription("");
    setDocumentFile(null);
    setFilePreview(null);
  };

  // Handle region change - reset document
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setDocumentType("");
    setCustomDocumentDescription("");
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDocumentFile(file);

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        // For PDFs, use a placeholder
        setFilePreview(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setDocumentFile(null);
    setFilePreview(null);
  };

  const handleSubmit = () => {
    // Validation
    if (!selectedCountry || !selectedRegion || !documentType || !documentFile) {
      return;
    }

    if (documentType === "others" && !customDocumentDescription.trim()) {
      return;
    }

    // Show success animation
    setShowSuccess(true);

    // Auto-proceed after 2 seconds
    setTimeout(() => {
      onNext();
    }, 2000);
  };

  const isFormValid = () => {
    const hasCountry = selectedCountry !== "";
    const hasRegion = selectedRegion !== "";
    const hasDocType = documentType !== "";
    const hasFile = documentFile !== null;
    const hasCustomDesc = documentType === "others" 
      ? customDocumentDescription.trim() !== ""
      : true;

    return hasCountry && hasRegion && hasDocType && hasFile && hasCustomDesc;
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

  // Success overlay
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4FC] to-[#D9F2FF] relative overflow-hidden flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#FFD700] blur-2xl opacity-40"></div>
              <div className="relative bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full w-24 h-24 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          <motion.h2
            className="text-[#003E6D] mb-2"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "2rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Verification Submitted! ✓
          </motion.h2>

          <motion.p
            className="text-[#003E6D]/70"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Proceeding to subscription options...
          </motion.p>
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
        <div className="max-w-4xl mx-auto px-4 py-4">
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
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FFD700] blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-2xl w-16 h-16 flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h1
                  className="text-[#003E6D] mb-2"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "2rem",
                  }}
                >
                  Verify Your Producer Identity
                </h1>
                <p
                  className="text-[#003E6D]/70"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "1rem",
                    lineHeight: "1.6",
                  }}
                >
                  To ensure secure trading and fair participation, please upload region-specific proof of ownership or authorization.
                </p>
              </div>
            </div>

            <Alert className="bg-[#003E6D]/10 border-[#003E6D]/30">
              <AlertCircle className="h-4 w-4 text-[#003E6D]" />
              <AlertDescription
                className="text-[#003E6D]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.875rem",
                }}
              >
                Ensure your document is clear and matches the selected region. KYC verification may take <strong>5–10 working days</strong>.
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Form Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 md:p-8 mb-6">
              <div className="space-y-6">
                {/* Country Selection */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
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
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-[#003E6D]/50" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">Available document types are region-specific and based on your country's regulatory authorities.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
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

                {/* Region/State Selection - Only shows when country is selected */}
                <AnimatePresence>
                  {selectedCountry && regionKeys.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="region"
                          className="text-[#003E6D] flex items-center gap-2"
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                          }}
                        >
                          <MapPin className="w-4 h-4" />
                          Select State / Region *
                        </Label>
                      </div>
                      <p
                        className="text-[#003E6D]/60 mb-2"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.75rem",
                        }}
                      >
                        Document types will be filtered based on your region
                      </p>
                      <Select value={selectedRegion} onValueChange={handleRegionChange}>
                        <SelectTrigger 
                          className="w-full h-12 rounded-xl bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700]"
                          style={{
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          <SelectValue placeholder="📍 Choose your state/region" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {regionKeys.map((regionKey) => (
                            <SelectItem 
                              key={regionKey} 
                              value={regionKey}
                              className="cursor-pointer"
                              style={{
                                fontFamily: "Inter, sans-serif",
                              }}
                            >
                              {availableRegions[regionKey].name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Show selected region */}
                      {selectedRegion && currentRegion && (
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
                            ✓ Selected: <strong>{currentRegion.name}</strong>
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Document Type Selection - Only shows when region is selected */}
                <AnimatePresence>
                  {selectedRegion && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
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
                        {currentRegion?.name} - {currentCountry?.name}
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
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Others - Custom Document Description */}
                <AnimatePresence>
                  {documentType === "others" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <Label
                        htmlFor="custom-doc-description"
                        className="text-[#003E6D]"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      >
                        Describe Your Document Type *
                      </Label>
                      <Textarea
                        id="custom-doc-description"
                        placeholder="Describe the document type you're uploading (e.g., 'Tribal land certificate issued by local authority for agricultural use')..."
                        value={customDocumentDescription}
                        onChange={(e) => setCustomDocumentDescription(e.target.value)}
                        rows={4}
                        className="bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700] resize-none"
                        style={{
                          fontFamily: "Inter, sans-serif",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Document Upload - Only shows when document type is selected */}
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
                        Upload Document Copy (PDF / JPG / PNG) *
                      </Label>
                      <p
                        className="text-[#003E6D]/60 mb-2"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.75rem",
                        }}
                      >
                        Clear photo or scanned copy - Max 10MB
                      </p>

                      {/* Upload Area */}
                      {!documentFile && (
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
                              className="flex items-center justify-center gap-3 p-8 bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 border-2 border-dashed border-[#FFD700]/40 rounded-2xl cursor-pointer hover:border-[#FFD700] transition-all"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="text-center">
                                <div className="relative inline-block mb-4">
                                  <div className="absolute inset-0 bg-[#FFD700] blur-md opacity-20"></div>
                                  <div className="relative bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                                    <Upload className="w-8 h-8 text-white" />
                                  </div>
                                </div>
                                <p
                                  className="text-[#003E6D] mb-1"
                                  style={{
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                  }}
                                >
                                  Click to upload document
                                </p>
                                <p
                                  className="text-[#003E6D]/60"
                                  style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  PDF, JPG, or PNG up to 10MB
                                </p>
                              </div>
                            </motion.div>
                          </label>
                        </div>
                      )}

                      {/* File Preview */}
                      {documentFile && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-[#FFD700]/10 rounded-xl border border-[#FFD700]/30"
                        >
                          <div className="flex items-start gap-4">
                            {/* Thumbnail */}
                            <div className="flex-shrink-0">
                              {filePreview ? (
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-[#FFD700]/30">
                                  <img 
                                    src={filePreview} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-20 h-20 rounded-lg bg-[#003E6D]/10 flex items-center justify-center border-2 border-[#003E6D]/30">
                                  <FileCheck className="w-8 h-8 text-[#003E6D]" />
                                </div>
                              )}
                            </div>

                            {/* File Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <p
                                    className="text-[#003E6D] truncate"
                                    style={{
                                      fontFamily: "Poppins, sans-serif",
                                      fontWeight: 600,
                                      fontSize: "0.875rem",
                                    }}
                                  >
                                    {documentFile.name}
                                  </p>
                                  <p
                                    className="text-[#003E6D]/60"
                                    style={{
                                      fontFamily: "Inter, sans-serif",
                                      fontSize: "0.75rem",
                                    }}
                                  >
                                    {(documentFile.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                                    <span
                                      className="text-[#FFD700]"
                                      style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                      }}
                                    >
                                      File uploaded successfully
                                    </span>
                                  </div>
                                </div>

                                {/* Remove button */}
                                <button
                                  onClick={handleRemoveFile}
                                  className="flex-shrink-0 p-1 rounded-full hover:bg-red-100 transition-colors"
                                >
                                  <X className="w-5 h-5 text-red-500" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
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
              Next → Subscription Options
            </Button>

            <p
              className="text-center text-[#003E6D]/60"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
              }}
            >
              * All fields are required to proceed to subscription
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}