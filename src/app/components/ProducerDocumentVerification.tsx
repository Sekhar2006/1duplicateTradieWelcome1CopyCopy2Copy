import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileCheck, CheckCircle, AlertCircle, Shield, ArrowLeft, ChevronDown } from "lucide-react";
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

interface ProducerDocumentVerificationProps {
  onComplete: () => void;
  onBack?: () => void;
}

// Document types for different countries/states
const documentTypes = [
  { value: "pattadar-ap", label: "Pattadar Passbook (Andhra Pradesh)" },
  { value: "pattadar-telangana", label: "Pattadar Passbook (Telangana)" },
  { value: "pattadar-karnataka", label: "Pattadar Passbook (Karnataka)" },
  { value: "land-records", label: "Land Records / 7/12 Extract (Maharashtra)" },
  { value: "bhulekh", label: "Bhulekh / Land Records (UP, MP, Rajasthan)" },
  { value: "jamabandi", label: "Jamabandi / Fard (Punjab, Haryana)" },
  { value: "phodi", label: "Phodi / ROR (Gujarat)" },
  { value: "khasra-khatoni", label: "Khasra Khatoni (Bihar, Jharkhand)" },
  { value: "farm-certificate", label: "Farm Registration Certificate" },
  { value: "cooperative-member", label: "Cooperative Society Membership" },
  { value: "fpo-member", label: "FPO Membership Certificate" },
  { value: "mandi-license", label: "Mandi License / Trading License" },
  { value: "agriculture-id", label: "Agriculture Department ID" },
  { value: "farmer-card", label: "Farmer ID Card / Kisan Card" },
  { value: "land-lease", label: "Land Lease Agreement" },
  { value: "others", label: "Others (Please Specify)" },
];

export function ProducerDocumentVerification({ onComplete, onBack }: ProducerDocumentVerificationProps) {
  const [documentType, setDocumentType] = useState("");
  const [otherDocumentName, setOtherDocumentName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [issuingAuthority, setIssuingAuthority] = useState("");
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocumentFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!documentType || !documentFiles.length) {
      return;
    }
    
    if (documentType === "others" && !otherDocumentName.trim()) {
      return;
    }

    // Show success message
    setShowSuccess(true);

    // Auto-proceed after 3 seconds
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  const isFormValid = () => {
    const hasDocumentType = documentType !== "";
    const hasFiles = documentFiles.length > 0;
    const hasOtherName = documentType === "others" ? otherDocumentName.trim() !== "" : true;
    
    return hasDocumentType && hasFiles && hasOtherName;
  };

  // Get selected document label
  const selectedDocLabel = documentTypes.find(doc => doc.value === documentType)?.label || "";

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
              Documents Verified! ✓
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
                  Your regulatory documents have been submitted successfully. 
                  Our verification team will review them within <strong>24-48 hours</strong>.
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
                You'll receive a notification once your producer identity is fully verified. 
                You can now proceed to choose your subscription plan!
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
                  Proceeding to subscription...
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
          {/* Header Banner */}
          <motion.div
            variants={itemVariants}
            className="mb-8 relative overflow-hidden rounded-3xl"
          >
            <Card className="bg-gradient-to-br from-[#003E6D]/10 via-[#FFD700]/5 to-[#003E6D]/10 border-2 border-[#003E6D]/20 shadow-xl">
              <div className="p-6 md:p-8 relative">
                <div className="absolute top-0 right-0 opacity-10">
                  <Shield className="w-32 h-32 text-[#003E6D]" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-[#003E6D] text-white border-0">
                      Regulatory Verification
                    </Badge>
                  </div>
                  <h1
                    className="text-[#003E6D] mb-2"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.75rem",
                    }}
                  >
                    📋 Verify Your Producer Identity
                  </h1>
                  <p
                    className="text-[#003E6D]/80"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    Submit your regulatory documents (Pattadar passbooks, land records, etc.) 
                    to complete your producer verification and unlock premium features.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Form Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8 mb-6">
              <div className="space-y-6">
                {/* Document Type Dropdown */}
                <div className="space-y-2">
                  <Label
                    htmlFor="document-type"
                    className="text-[#003E6D]"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    Document Type *
                  </Label>
                  <p
                    className="text-[#003E6D]/60 mb-2"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                    }}
                  >
                    Select the regulatory document issued by your state/country authority
                  </p>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger 
                      className="w-full h-12 rounded-xl bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700]"
                      style={{
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <SelectValue placeholder="🔍 Choose your document type" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {documentTypes.map((doc) => (
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

                  {/* Show selected document type */}
                  {documentType && documentType !== "others" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 p-3 bg-[#FFD700]/10 rounded-xl border border-[#FFD700]/30"
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
                </div>

                {/* Others - Custom Document Name */}
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
                        htmlFor="other-document"
                        className="text-[#003E6D]"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      >
                        Specify Document Name *
                      </Label>
                      <Input
                        id="other-document"
                        placeholder="Enter the name of your document"
                        value={otherDocumentName}
                        onChange={(e) => setOtherDocumentName(e.target.value)}
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
                        Example: Tribal Land Certificate, Forest Lease Agreement, etc.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Document Number (Optional) */}
                {documentType && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="document-number"
                      className="text-[#003E6D]"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    >
                      Document Number / ID (Optional)
                    </Label>
                    <Input
                      id="document-number"
                      placeholder="Enter document reference number"
                      value={documentNumber}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                      className="bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700]"
                      style={{
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                  </motion.div>
                )}

                {/* Issuing Authority (Optional) */}
                {documentType && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="issuing-authority"
                      className="text-[#003E6D]"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    >
                      Issuing Authority (Optional)
                    </Label>
                    <Input
                      id="issuing-authority"
                      placeholder="e.g., Revenue Department, Agriculture Ministry"
                      value={issuingAuthority}
                      onChange={(e) => setIssuingAuthority(e.target.value)}
                      className="bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700]"
                      style={{
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                  </motion.div>
                )}

                {/* Document Upload */}
                <div className="space-y-2">
                  <Label
                    className="text-[#003E6D]"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    Upload Document(s) *
                  </Label>
                  <p
                    className="text-[#003E6D]/60 mb-2"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                    }}
                  >
                    Upload clear photos or scanned copies (JPG, PNG, PDF - Max 10MB each)
                  </p>
                  <div className="relative">
                    <input
                      type="file"
                      id="document-files"
                      accept="image/*,.pdf"
                      multiple
                      onChange={handleDocumentUpload}
                      className="hidden"
                    />
                    <label htmlFor="document-files">
                      <motion.div
                        className="flex items-center justify-center gap-3 p-6 bg-gradient-to-br from-[#003E6D]/5 to-[#003E6D]/10 border-2 border-dashed border-[#003E6D]/30 rounded-2xl cursor-pointer hover:border-[#FFD700] transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#003E6D] blur-md opacity-20"></div>
                          <div className="relative bg-gradient-to-br from-[#003E6D] to-[#004A7C] rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                            <FileCheck className="w-6 h-6 text-white" />
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
                            {documentFiles.length > 0
                              ? `${documentFiles.length} file(s) selected`
                              : "Click to upload documents"}
                          </p>
                          <p
                            className="text-[#003E6D]/60"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "0.75rem",
                            }}
                          >
                            Multiple files allowed • Clear photos preferred
                          </p>
                        </div>
                      </motion.div>
                    </label>

                    {/* Show uploaded files */}
                    {documentFiles.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 space-y-2"
                      >
                        {documentFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/30"
                          >
                            <FileCheck className="w-4 h-4 text-[#FFD700]" />
                            <span
                              className="text-[#003E6D] flex-1 truncate"
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.75rem",
                              }}
                            >
                              {file.name}
                            </span>
                            <span
                              className="text-[#003E6D]/60"
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.75rem",
                              }}
                            >
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Additional Notes */}
                {documentType && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="notes"
                      className="text-[#003E6D]"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    >
                      Additional Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional information about your documents or land ownership..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      rows={3}
                      className="bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700] resize-none"
                      style={{
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Info Section */}
          <motion.div variants={itemVariants} className="mb-6">
            <Card className="bg-gradient-to-br from-[#FFD700]/10 to-[#FFC700]/5 border border-[#FFD700]/30 rounded-2xl shadow-lg">
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#FFD700] blur-md opacity-30"></div>
                      <div className="relative bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                        <AlertCircle className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-[#003E6D] mb-2"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: "1rem",
                      }}
                    >
                      Why We Need This
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Ensures genuine producers get priority access",
                        "Helps maintain trust and quality in the platform",
                        "Required for regulatory compliance",
                        "Unlocks premium trading features and AI insights",
                        "Provides better protection for your transactions",
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
              className="w-full bg-gradient-to-r from-[#003E6D] to-[#004A7C] hover:from-[#004A7C] hover:to-[#003E6D] text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed h-14 rounded-2xl"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Submit for Verification
            </Button>

            <p
              className="text-center text-[#003E6D]/60"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
              }}
            >
              * Required fields must be filled to continue
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
