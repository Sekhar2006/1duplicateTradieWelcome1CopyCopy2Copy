import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Upload, FileText, X, CheckCircle, RefreshCw } from "lucide-react";
import { KYCStatusScreen } from "./KYCStatusScreen";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { toast } from "sonner@2.0.3";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface KYCStatusDemoProps {
  onBack: () => void;
}

type DemoState = "pending-producer" | "pending-other" | "failure" | "approved" | "upload";
type UserRole = "producer" | "non-producer";

interface DocumentUpload {
  id: string;
  name: string;
  file: File | null;
  uploaded: boolean;
}

export function KYCStatusDemo({ onBack }: KYCStatusDemoProps) {
  const [currentState, setCurrentState] = useState<DemoState>("pending-producer");
  const [userRole, setUserRole] = useState<UserRole>("producer");
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    { id: "1", name: "Aadhaar Card", file: null, uploaded: false },
    { id: "2", name: "PAN Card", file: null, uploaded: false },
    { id: "3", name: "Land Documents", file: null, uploaded: false },
    { id: "4", name: "Bank Statement", file: null, uploaded: false }
  ]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDocumentUpload = (documentId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setDocuments(prev => 
              prev.map(doc => 
                doc.id === documentId 
                  ? { ...doc, file, uploaded: true }
                  : doc
              )
            );
            toast.success(`${file.name} uploaded successfully!`);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const handleRemoveDocument = (documentId: string) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, file: null, uploaded: false }
          : doc
      )
    );
    toast.info("Document removed");
  };

  const handleSubmitDocuments = () => {
    const uploadedCount = documents.filter(d => d.uploaded).length;
    if (uploadedCount === 0) {
      toast.error("Please upload at least one document");
      return;
    }
    
    toast.success("Documents submitted for verification!");
    setTimeout(() => {
      setCurrentState("pending-producer");
    }, 1500);
  };

  const renderUploadScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4FC] to-[#D9F2FF] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#003E6D]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* Header */}
      <motion.header
        className="bg-white/80 backdrop-blur-lg border-b border-white/50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setCurrentState("failure")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <img src={tradieLogo} alt="TRADIE" className="w-10 h-10" />
              <span className="text-[#003E6D] font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
                Re-Submit KYC
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
          {/* Instructions */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-[#003E6D] font-semibold mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Document Upload Guidelines
                </h3>
                <ul className="text-sm text-[#003E6D]/80 space-y-1">
                  <li>• Upload clear, legible copies of your documents</li>
                  <li>• Accepted formats: PDF, JPG, PNG (Max 5MB per file)</li>
                  <li>• Ensure all text and details are visible</li>
                  <li>• Documents must be valid and not expired</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Document Upload Cards */}
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 bg-white/90 backdrop-blur-sm border-2 border-[#003E6D]/10 hover:border-[#FFD700]/50 transition-all">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        doc.uploaded 
                          ? "bg-green-100" 
                          : "bg-[#FFD700]/20"
                      }`}>
                        {doc.uploaded ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <Upload className="w-6 h-6 text-[#003E6D]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Label className="text-[#003E6D] font-semibold">
                          {doc.name}
                        </Label>
                        {doc.uploaded && doc.file && (
                          <p className="text-xs text-[#003E6D]/60 mt-1">
                            {doc.file.name} ({(doc.file.size / 1024).toFixed(1)} KB)
                          </p>
                        )}
                        {!doc.uploaded && (
                          <p className="text-xs text-[#003E6D]/60 mt-1">
                            No file selected
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {doc.uploaded ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveDocument(doc.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      ) : (
                        <div className="relative">
                          <Input
                            type="file"
                            id={`upload-${doc.id}`}
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleDocumentUpload(doc.id, e)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById(`upload-${doc.id}`)?.click()}
                            className="border-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/10"
                          >
                            <Upload className="w-4 h-4 mr-1" />
                            Upload
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Upload Progress */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card className="p-4 bg-blue-50 border-2 border-blue-200">
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

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              onClick={handleSubmitDocuments}
              disabled={documents.filter(d => d.uploaded).length === 0}
              className="flex-1 h-14 bg-gradient-to-r from-[#003E6D] to-[#005A9C] hover:from-[#005A9C] hover:to-[#003E6D] text-white rounded-xl shadow-xl disabled:opacity-50"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              <FileText className="w-5 h-5 mr-2" />
              Submit for Verification
              <Badge className="ml-2 bg-white text-[#003E6D]">
                {documents.filter(d => d.uploaded).length}/{documents.length}
              </Badge>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );

  const renderDemoControls = () => (
    <div className="fixed top-20 right-4 z-50">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-4 bg-white/95 backdrop-blur-lg border-2 border-[#FFD700]/50 shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw className="w-4 h-4 text-[#003E6D]" />
              <span className="font-semibold text-[#003E6D] text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                Demo Controls
              </span>
            </div>
            
            <div className="space-y-2">
              <Button
                variant={currentState === "pending-producer" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentState("pending-producer");
                  setUserRole("producer");
                }}
                className="w-full justify-start text-xs"
              >
                📊 Pending - Producer
              </Button>
              
              <Button
                variant={currentState === "pending-other" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentState("pending-other");
                  setUserRole("non-producer");
                }}
                className="w-full justify-start text-xs"
              >
                🏢 Pending - Other Roles
              </Button>
              
              <Button
                variant={currentState === "failure" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentState("failure");
                }}
                className="w-full justify-start text-xs"
              >
                ❌ Failure - Retry
              </Button>
              
              <Button
                variant={currentState === "approved" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentState("approved");
                }}
                className="w-full justify-start text-xs"
              >
                ✅ Approved
              </Button>
            </div>

            <div className="pt-3 border-t border-[#003E6D]/10">
              <p className="text-xs text-[#003E6D]/60 mb-2">Current State:</p>
              <Badge variant="outline" className="text-xs">
                {currentState === "pending-producer" && "Pending (Producer - 7 days)"}
                {currentState === "pending-other" && "Pending (Other - 15 days)"}
                {currentState === "failure" && "Verification Failed"}
                {currentState === "approved" && "Verified & Approved"}
                {currentState === "upload" && "Document Upload"}
              </Badge>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );

  // Show upload screen
  if (currentState === "upload") {
    return (
      <>
        {renderUploadScreen()}
        {renderDemoControls()}
      </>
    );
  }

  // Show KYC Status Screen
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentState}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <KYCStatusScreen
            status={
              currentState === "approved" ? "approved" :
              currentState === "failure" ? "rejected" :
              "pending"
            }
            userRole={userRole}
            onGoToDashboard={() => {
              toast.success("Redirecting to Dashboard...");
              setTimeout(() => onBack(), 1500);
            }}
            onResubmitKYC={() => {
              setCurrentState("upload");
            }}
            onContactSupport={() => {
              toast.info("Opening support chat...");
            }}
          />
        </motion.div>
      </AnimatePresence>
      {renderDemoControls()}
    </>
  );
}
