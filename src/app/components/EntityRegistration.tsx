import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Upload, X, FileText, Building2, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface EntityRegistrationProps {
  onComplete: (data: EntityData) => void;
  onBack: () => void;
  roleType: string;
}

export interface EntityData {
  organizationName: string;
  registrationNumber: string;
  phone: string;
  email: string;
  address: string;
  documents: File[];
}

export function EntityRegistration({ onComplete, onBack, roleType }: EntityRegistrationProps) {
  const [organizationName, setOrganizationName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const progress = (() => {
    let count = 0;
    if (organizationName) count++;
    if (registrationNumber) count++;
    if (phone) count++;
    if (email) count++;
    if (address) count++;
    if (documents.length > 0) count++;
    return (count / 6) * 100;
  })();

  const isValid = organizationName && registrationNumber && phone && email && address && documents.length > 0;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setDocuments(prev => [...prev, ...fileArray]);
            toast.success(`${fileArray.length} document(s) uploaded successfully!`);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
    toast.info("Document removed");
  };

  const handleSubmit = () => {
    if (!isValid) {
      toast.error("Please fill all required fields");
      return;
    }

    const data: EntityData = {
      organizationName,
      registrationNumber,
      phone,
      email,
      address,
      documents
    };

    toast.success("Organization registered successfully!");
    setTimeout(() => {
      onComplete(data);
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
        <div className="max-w-4xl mx-auto px-4 py-4">
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
                Entity Registration
              </span>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Title */}
          <div className="text-center">
            <h1 className="text-[#003E6D] mb-3" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "2.5rem" }}>
              Register Your Organization
            </h1>
            <p className="text-[#003E6D]/70 text-lg mb-4">
              {roleType.charAt(0).toUpperCase() + roleType.slice(1)} Registration
            </p>
          </div>

          {/* Progress Bar */}
          <Card className="p-4 bg-white/90 backdrop-blur-sm border-2 border-[#003E6D]/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#003E6D]">Registration Progress</span>
              <span className="text-sm font-semibold text-[#003E6D]">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </Card>

          {/* Form Card */}
          <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-[#003E6D]/10 shadow-xl">
            <div className="space-y-6">
              {/* Organization Name */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-[#003E6D]">
                  <Building2 className="w-4 h-4" />
                  Organization Name *
                </Label>
                <Input
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="Enter your organization's legal name"
                  className="h-12 border-2 border-[#003E6D]/20 focus:border-[#FFD700]"
                />
              </div>

              {/* Registration Number */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-[#003E6D]">
                  <FileText className="w-4 h-4" />
                  Registration Number (Government ID) *
                </Label>
                <Input
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  placeholder="e.g., PAN, GST, Company Registration Number"
                  className="h-12 border-2 border-[#003E6D]/20 focus:border-[#FFD700]"
                />
              </div>

              {/* Contact Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[#003E6D]">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </Label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="h-12 border-2 border-[#003E6D]/20 focus:border-[#FFD700]"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@organization.com"
                    className="h-12 border-2 border-[#003E6D]/20 focus:border-[#FFD700]"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-[#003E6D]">
                  <MapPin className="w-4 h-4" />
                  Registered Address *
                </Label>
                <Textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter complete registered address including city, state, and pincode"
                  rows={4}
                  className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] resize-none"
                />
              </div>

              {/* Document Upload */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-[#003E6D]">
                  <Upload className="w-4 h-4" />
                  Upload Registration Proof Documents *
                </Label>
                
                <Alert className="bg-blue-50 border-2 border-blue-200">
                  <AlertDescription className="text-blue-800 text-sm">
                    Please upload: Registration certificate, PAN card, GST certificate, or other relevant government-issued documents
                  </AlertDescription>
                </Alert>

                {/* Upload Button */}
                <div className="relative">
                  <Input
                    type="file"
                    id="document-upload"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={handleFileUpload}
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("document-upload")?.click()}
                    className="w-full h-14 border-2 border-dashed border-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/10"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Click to Upload Documents
                  </Button>
                </div>

                {/* Upload Progress */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Card className="p-3 bg-blue-50 border-2 border-blue-200">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#003E6D]">Uploading...</span>
                          <span className="text-sm font-semibold text-[#003E6D]">{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Uploaded Documents List */}
                {documents.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-[#003E6D]/70">
                      Uploaded Documents ({documents.length})
                    </p>
                    {documents.map((doc, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="p-3 bg-green-50 border-2 border-green-200">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-[#003E6D] truncate font-semibold">
                                  {doc.name}
                                </p>
                                <p className="text-xs text-[#003E6D]/60">
                                  {(doc.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDocument(index)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Submit Button */}
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
              onClick={handleSubmit}
              disabled={!isValid}
              className="flex-1 h-14 bg-gradient-to-r from-[#003E6D] to-[#005A9C] hover:from-[#005A9C] hover:to-[#003E6D] text-white rounded-xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              Submit & Continue
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
