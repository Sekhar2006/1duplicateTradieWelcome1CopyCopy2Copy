import { useState } from "react";
import { motion } from "motion/react";
import { Upload, FileText, Check, AlertCircle, Sprout, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface ProducerConfirmationProps {
  onSubmit: () => void;
  onSkip: () => void;
  onBack?: () => void;
}

export function ProducerConfirmation({ onSubmit, onSkip, onBack }: ProducerConfirmationProps) {
  const [passbookNumber, setPassbookNumber] = useState("");
  const [passbookFile, setPassbookFile] = useState<File | null>(null);
  const [otherDocuments, setOtherDocuments] = useState<File[]>([]);
  const [documentType, setDocumentType] = useState("");
  const [description, setDescription] = useState("");
  const [showReviewMessage, setShowReviewMessage] = useState(false);

  const handlePassbookUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPassbookFile(e.target.files[0]);
    }
  };

  const handleOtherDocsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setOtherDocuments(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    // Validation could be added here
    setShowReviewMessage(true);
    // After 3 seconds, proceed to next step
    setTimeout(() => {
      onSubmit();
    }, 3000);
  };

  const handleSkipNow = () => {
    onSkip();
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

  // If showing review message
  if (showReviewMessage) {
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
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
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
              Submission Received! ✓
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Alert className="bg-[#FFD700]/10 border-[#FFD700]/30 mb-6">
                <AlertCircle className="h-4 w-4 text-[#FFD700]" />
                <AlertDescription
                  className="text-[#003E6D]"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                  }}
                >
                  Your KYC is under review. Verification may take <strong>1–10 working days</strong>.
                  You can still access limited dashboard features while we confirm your producer details.
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
                We'll notify you via SMS and email once verification is complete. In the meantime, explore your dashboard!
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
                  Redirecting to dashboard...
                </p>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    );
  }

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
          {/* Motivational Banner */}
          <motion.div
            variants={itemVariants}
            className="mb-8 relative overflow-hidden rounded-3xl"
          >
            <Card className="bg-gradient-to-br from-[#FFD700]/20 via-[#FFC700]/10 to-[#FFD700]/20 border-2 border-[#FFD700]/30 shadow-xl">
              <div className="p-6 md:p-8 relative">
                <div className="absolute top-0 right-0 opacity-10">
                  <Sprout className="w-32 h-32 text-[#003E6D]" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-[#FFD700] text-[#003E6D] border-0">
                      Priority Producer
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
                    🌾 Confirm Your Producer Identity
                  </h1>
                  <p
                    className="text-[#003E6D]/80"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    To get verified and receive trading priority, please provide your farm and producer details.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Form Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8 mb-6">
              <div className="space-y-6">
                {/* Producer Passbook Number */}
                <div className="space-y-2">
                  <Label
                    htmlFor="passbook-number"
                    className="text-[#003E6D]"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    Producer Passbook Number *
                  </Label>
                  <Input
                    id="passbook-number"
                    placeholder="Enter your passbook number"
                    value={passbookNumber}
                    onChange={(e) => setPassbookNumber(e.target.value)}
                    className="bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700]"
                    style={{
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                </div>

                {/* Upload Passbook Copy */}
                <div className="space-y-2">
                  <Label
                    className="text-[#003E6D]"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    Upload Passbook Copy *
                  </Label>
                  <div className="relative">
                    <input
                      type="file"
                      id="passbook-file"
                      accept="image/*,.pdf"
                      onChange={handlePassbookUpload}
                      className="hidden"
                    />
                    <label htmlFor="passbook-file">
                      <motion.div
                        className="flex items-center justify-center gap-3 p-6 bg-gradient-to-br from-[#FFD700]/10 to-[#FFC700]/10 border-2 border-dashed border-[#FFD700]/40 rounded-2xl cursor-pointer hover:border-[#FFD700] transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#FFD700] blur-md opacity-30"></div>
                          <div className="relative bg-gradient-to-br from-[#FFD700] to-[#FFC700] rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                            <Upload className="w-6 h-6 text-white" />
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
                            {passbookFile ? passbookFile.name : "Click to upload passbook"}
                          </p>
                          <p
                            className="text-[#003E6D]/60"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "0.75rem",
                            }}
                          >
                            JPG, PNG, or PDF (Max 5MB)
                          </p>
                        </div>
                      </motion.div>
                    </label>
                  </div>
                </div>

                {/* Upload Other Documents */}
                <div className="space-y-2">
                  <Label
                    className="text-[#003E6D]"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    Upload Other Documents (Optional)
                  </Label>
                  <p
                    className="text-[#003E6D]/60 mb-2"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                    }}
                  >
                    Land lease, ID proofs, cooperative membership, etc.
                  </p>
                  <div className="relative">
                    <input
                      type="file"
                      id="other-docs"
                      accept="image/*,.pdf"
                      multiple
                      onChange={handleOtherDocsUpload}
                      className="hidden"
                    />
                    <label htmlFor="other-docs">
                      <motion.div
                        className="flex items-center justify-center gap-3 p-6 bg-gradient-to-br from-[#E8F4FC] to-[#D9F2FF] border-2 border-dashed border-[#003E6D]/20 rounded-2xl cursor-pointer hover:border-[#FFD700] transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#003E6D] blur-md opacity-10"></div>
                          <div className="relative bg-gradient-to-br from-[#003E6D] to-[#004A7C] rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                            <FileText className="w-6 h-6 text-white" />
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
                            {otherDocuments.length > 0
                              ? `${otherDocuments.length} file(s) selected`
                              : "Click to upload additional documents"}
                          </p>
                          <p
                            className="text-[#003E6D]/60"
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "0.75rem",
                            }}
                          >
                            Multiple files allowed
                          </p>
                        </div>
                      </motion.div>
                    </label>
                  </div>
                </div>

                {/* Other Document Type */}
                <div className="space-y-2">
                  <Label
                    htmlFor="doc-type"
                    className="text-[#003E6D]"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    Other Document Type (Optional)
                  </Label>
                  <Input
                    id="doc-type"
                    placeholder="e.g., Land Lease Agreement, Cooperative ID"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700]"
                    style={{
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                </div>

                {/* Short Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-[#003E6D]"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    Short Description (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Any additional notes or remarks about your farm or production..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="bg-white/90 border-[#003E6D]/20 focus:border-[#FFD700] focus:ring-[#FFD700] resize-none"
                    style={{
                      fontFamily: "Inter, sans-serif",
                    }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Notes Section */}
          <motion.div variants={itemVariants} className="mb-6">
            <Card className="bg-gradient-to-br from-[#003E6D]/5 to-[#003E6D]/10 border border-[#003E6D]/20 rounded-2xl shadow-lg">
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
                      Why Verify Your Identity?
                    </h3>
                    <p
                      className="text-[#003E6D]/80 mb-3"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        lineHeight: "1.6",
                      }}
                    >
                      <strong className="text-[#FFD700]">Serious producers receive:</strong>
                    </p>
                    <ul className="space-y-2 ml-4">
                      {[
                        "✓ Higher visibility in trader searches",
                        "✓ Priority listing and featured placement",
                        "✓ Enhanced AI trading insights and support",
                        "✓ Faster settlement and payment processing",
                        "✓ Exclusive rewards and bonuses",
                      ].map((benefit, index) => (
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
                          <span className="text-[#FFD700]">●</span>
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <p
                      className="text-[#003E6D]/70 mt-4"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        lineHeight: "1.6",
                      }}
                    >
                      Complete your KYC to unlock premium trading insights and faster settlement support.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Button
              onClick={handleSubmit}
              disabled={!passbookNumber || !passbookFile}
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed h-14 rounded-2xl"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              <Check className="w-5 h-5 mr-2" />
              Submit for Verification
            </Button>

            <Button
              onClick={handleSkipNow}
              variant="outline"
              className="w-full border-[#003E6D]/20 text-[#003E6D] hover:bg-[#003E6D]/5 h-12 rounded-2xl"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              Skip for Now (Limited Access)
            </Button>
          </motion.div>

          {/* Helper Text */}
          <motion.p
            variants={itemVariants}
            className="text-center text-[#003E6D]/60 mt-4"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.75rem",
            }}
          >
            * Required fields must be filled to submit for verification
          </motion.p>
        </motion.div>
      </main>
    </div>
  );
}