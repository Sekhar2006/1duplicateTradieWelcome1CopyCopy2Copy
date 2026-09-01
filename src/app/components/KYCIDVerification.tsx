import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Upload, Eye, Sparkles, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./ui/input-otp";

interface KYCIDVerificationProps {
  onNext: () => void;
  onBack: () => void;
}

export function KYCIDVerification({ onNext, onBack }: KYCIDVerificationProps) {
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [faceRecognitionDone, setFaceRecognitionDone] = useState(false);
  const [showFaceRecognition, setShowFaceRecognition] = useState(false);
  const [faceRecognitionProgress, setFaceRecognitionProgress] = useState(0);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

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
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const handleStartFaceRecognition = () => {
    setShowFaceRecognition(true);
    setFaceRecognitionProgress(0);

    // Simulate face recognition progress
    const interval = setInterval(() => {
      setFaceRecognitionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowFaceRecognition(false);
            setFaceRecognitionDone(true);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleGetOTP = () => {
    setOtpSent(true);
    setShowOTPDialog(true);
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setShowOTPDialog(false);
      // Success animation, then move to next screen
      setTimeout(() => {
        onNext();
      }, 500);
    }
  };

  const isFormValid = () => {
    return aadhaar && pan && faceRecognitionDone;
  };

  return (
    <>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Aadhaar / National ID */}
        <motion.div variants={itemVariants} className="space-y-2">
          <Label
            className="text-[#003E6D]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            Aadhaar / National ID *
          </Label>
          <div className="flex gap-2">
            <Input
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              placeholder="Enter Aadhaar/National ID number"
              className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl flex-1"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <Button
              variant="outline"
              className="border-2 border-[#003E6D]/20 hover:border-[#FFD700] hover:bg-[#FFD700]/10 h-12 px-4"
            >
              <Upload className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* PAN / Tax ID */}
        <motion.div variants={itemVariants} className="space-y-2">
          <Label
            className="text-[#003E6D]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            PAN / Tax ID *
          </Label>
          <div className="flex gap-2">
            <Input
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              placeholder="Enter PAN/Tax ID"
              className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl flex-1"
              style={{ fontFamily: "Inter, sans-serif" }}
              maxLength={10}
            />
            <Button
              variant="outline"
              className="border-2 border-[#003E6D]/20 hover:border-[#FFD700] hover:bg-[#FFD700]/10 h-12 px-4"
            >
              <Upload className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Driving License (Optional) */}
        <motion.div variants={itemVariants} className="space-y-2">
          <Label
            className="text-[#003E6D]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
          >
            Driving License (Optional)
          </Label>
          <div className="flex gap-2">
            <Input
              value={drivingLicense}
              onChange={(e) => setDrivingLicense(e.target.value.toUpperCase())}
              placeholder="Enter driving license number"
              className="border-2 border-[#003E6D]/20 focus:border-[#FFD700] h-12 rounded-xl flex-1"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <Button
              variant="outline"
              className="border-2 border-[#003E6D]/20 hover:border-[#FFD700] hover:bg-[#FFD700]/10 h-12 px-4"
            >
              <Upload className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Face Recognition */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-[#FFD700]/5 to-[#003E6D]/5 border-[#FFD700]/30 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FFD700] blur-md opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-white to-[#E8F4FC] rounded-2xl w-16 h-16 flex items-center justify-center shadow-md">
                    {faceRecognitionDone ? (
                      <Check className="w-8 h-8 text-green-600" />
                    ) : (
                      <Eye className="w-8 h-8 text-[#003E6D]" />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h4
                  className="text-[#003E6D] mb-2"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem" }}
                >
                  {faceRecognitionDone ? "✓ Face Recognition Complete" : "Face Recognition (AI-assisted)"}
                </h4>
                <p
                  className="text-[#003E6D]/70 text-sm mb-4"
                  style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}
                >
                  Look straight and blink twice — AI will verify minimal expressions for KYC approval.
                </p>
                {!faceRecognitionDone && (
                  <Button
                    onClick={handleStartFaceRecognition}
                    className="bg-gradient-to-r from-[#003E6D] to-[#004E8D] hover:from-[#004E8D] hover:to-[#003E6D] text-white shadow-md hover:shadow-lg"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start AI Verification
                  </Button>
                )}
                {faceRecognitionDone && (
                  <Alert className="bg-green-50 border-green-200">
                    <Check className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-green-800" style={{ fontFamily: "Inter, sans-serif" }}>
                      Face verification successful!
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Get OTP Button */}
        <motion.div variants={itemVariants}>
          <Button
            onClick={handleGetOTP}
            disabled={!isFormValid()}
            className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-white rounded-xl py-6 transition-all hover:shadow-xl hover:shadow-[#FFD700]/40 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1rem" }}
          >
            Get OTP
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Face Recognition Modal */}
      <Dialog open={showFaceRecognition} onOpenChange={setShowFaceRecognition}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle
              className="text-[#003E6D]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              AI Face Recognition
            </DialogTitle>
            <DialogDescription style={{ fontFamily: "Inter, sans-serif" }}>
              Please look straight at the camera and blink twice
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#FFD700] blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-48 h-48 rounded-full border-4 border-[#FFD700] bg-gradient-to-br from-[#E8F4FC] to-[#D9F2FF] flex items-center justify-center overflow-hidden">
                <div className="text-6xl">👤</div>
                {/* Scanning effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/30 to-transparent"
                  animate={{
                    y: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span
                  className="text-[#003E6D]/70"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Verifying...
                </span>
                <span
                  className="text-[#003E6D]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  {faceRecognitionProgress}%
                </span>
              </div>
              <div className="h-2 bg-[#003E6D]/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFC700]"
                  initial={{ width: 0 }}
                  animate={{ width: `${faceRecognitionProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* OTP Dialog */}
      <Dialog open={showOTPDialog} onOpenChange={setShowOTPDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle
              className="text-[#003E6D]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              Enter OTP
            </DialogTitle>
            <DialogDescription style={{ fontFamily: "Inter, sans-serif" }}>
              We've sent a 6-digit OTP to your registered mobile number
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-6">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="border-[#003E6D]/20 focus:border-[#FFD700] h-14 w-12 text-lg" />
                <InputOTPSlot index={1} className="border-[#003E6D]/20 focus:border-[#FFD700] h-14 w-12 text-lg" />
                <InputOTPSlot index={2} className="border-[#003E6D]/20 focus:border-[#FFD700] h-14 w-12 text-lg" />
                <InputOTPSlot index={3} className="border-[#003E6D]/20 focus:border-[#FFD700] h-14 w-12 text-lg" />
                <InputOTPSlot index={4} className="border-[#003E6D]/20 focus:border-[#FFD700] h-14 w-12 text-lg" />
                <InputOTPSlot index={5} className="border-[#003E6D]/20 focus:border-[#FFD700] h-14 w-12 text-lg" />
              </InputOTPGroup>
            </InputOTP>
            <Button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6}
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-white shadow-lg disabled:opacity-50"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
            >
              <Check className="w-5 h-5 mr-2" />
              Verify OTP
            </Button>
            <button
              className="text-[#003E6D] hover:text-[#FFD700] text-sm underline"
              style={{ fontFamily: "Inter, sans-serif" }}
              onClick={handleGetOTP}
            >
              Resend OTP
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}