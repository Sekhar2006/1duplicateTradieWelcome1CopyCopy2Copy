import { motion } from "motion/react";
import { 
  Clock, CheckCircle, XCircle, AlertTriangle, 
  Phone, Mail, FileText, Shield, TrendingUp, 
  Award, Headphones, Sparkles, ArrowRight
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface KYCStatusScreenProps {
  status: "pending" | "approved" | "rejected";
  userRole: "producer" | "non-producer";
  onGoToDashboard: () => void;
  onResubmitKYC?: () => void;
  onContactSupport?: () => void;
}

const producerSMS = "Congratulations! You have signed up successfully. Your KYC is under review (few hours – 7 working days). Meanwhile, you can access all app features.";

const nonProducerSMS = "Congratulations! You have signed up successfully. Your KYC is under review (few hours – 15 working days). Meanwhile, you can access all app features.";

const failureSMS = "Your KYC could not be verified. Please re-submit the required documents to complete verification and continue using all features of the app.";

const physicalVerificationBenefits = [
  {
    icon: Award,
    title: "Verified Badge",
    description: "Stand out with a premium verified badge"
  },
  {
    icon: TrendingUp,
    title: "Priority Listing",
    description: "Get featured at the top of search results"
  },
  {
    icon: Shield,
    title: "Higher Limits",
    description: "Increased transaction and credit limits"
  },
  {
    icon: Sparkles,
    title: "Finance & Insurance",
    description: "Access to loans, credit, and insurance"
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Priority customer support & AI assistance"
  }
];

export function KYCStatusScreen({
  status,
  userRole,
  onGoToDashboard,
  onResubmitKYC,
  onContactSupport
}: KYCStatusScreenProps) {
  const isProducer = userRole === "producer";
  const reviewPeriod = isProducer ? "few hours – 7 working days" : "few hours – 15 working days";
  const smsMessage = status === "rejected" ? failureSMS : (isProducer ? producerSMS : nonProducerSMS);

  return (
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
          <div className="flex items-center justify-center gap-2">
            <img src={tradieLogo} alt="TRADIE" className="w-10 h-10" />
            <span
              className="text-[#003E6D]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.125rem" }}
            >
              TRADIE
            </span>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Status Header */}
          <div className="text-center">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 mx-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              style={{
                background: status === "pending" 
                  ? "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
                  : status === "approved"
                  ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                  : "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
              }}
            >
              {status === "pending" && <Clock className="w-10 h-10 text-white" />}
              {status === "approved" && <CheckCircle className="w-10 h-10 text-white" />}
              {status === "rejected" && <XCircle className="w-10 h-10 text-white" />}
            </motion.div>

            <h1
              className="text-[#003E6D] mb-3"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "2.5rem" }}
            >
              {status === "pending" && "KYC Under Review"}
              {status === "approved" && "KYC Verified!"}
              {status === "rejected" && "KYC Verification Failed"}
            </h1>

            <p
              className="text-[#003E6D]/70 text-lg max-w-2xl mx-auto"
              style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}
            >
              {status === "pending" && `Your KYC application is being reviewed. You'll receive an update within ${reviewPeriod}.`}
              {status === "approved" && "Your account has been successfully verified. You now have full access to all features."}
              {status === "rejected" && "We couldn't verify your documents. Please review and resubmit the required information."}
            </p>
          </div>

          {/* SMS Message Card */}
          <Card className="p-6 bg-white/90 backdrop-blur-md border-2 border-[#003E6D]/10 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#003E6D]" />
              </div>
              <div className="flex-1">
                <h3
                  className="text-[#003E6D] mb-2"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.125rem" }}
                >
                  📱 SMS Notification Sent
                </h3>
                <div className="bg-[#F7FAFC] rounded-lg p-4 border-l-4 border-[#FFD700]">
                  <p
                    className="text-[#003E6D]/80 text-sm"
                    style={{ fontFamily: "Inter, sans-serif", lineHeight: "1.6" }}
                  >
                    {smsMessage}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-[#003E6D]/60">
                    <span>Message length: {smsMessage.length}/160 characters</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Status-specific Content */}
          {status === "pending" && (
            <>
              {/* Timeline Progress */}
              <Card className="p-6 bg-white/90 backdrop-blur-md border-2 border-[#003E6D]/10 shadow-lg">
                <h3
                  className="text-[#003E6D] mb-4"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.125rem" }}
                >
                  ⏱️ Review Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#003E6D]/60">Expected completion:</span>
                    <span className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                      {reviewPeriod}
                    </span>
                  </div>
                  <Progress value={15} className="h-2" />
                  <p className="text-xs text-[#003E6D]/60">
                    Our verification team is reviewing your documents. You'll be notified via SMS and email once the review is complete.
                  </p>
                </div>
              </Card>

              {/* Physical Verification Benefits (Non-Producer Only) */}
              {!isProducer && (
                <Card className="p-6 bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10 border-2 border-[#FFD700]/30 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-6 h-6 text-[#FFD700]" />
                    <h3
                      className="text-[#003E6D]"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.25rem" }}
                    >
                      ⭐ Physical Verification Benefits
                    </h3>
                  </div>
                  
                  <Alert className="bg-blue-50 border-blue-200 mb-4">
                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800 text-sm">
                      Physical verification may be required to unlock premium benefits and enhanced features.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {physicalVerificationBenefits.map((benefit, index) => (
                      <motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex gap-3 p-4 bg-white/70 rounded-xl border border-[#003E6D]/10"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-5 h-5 text-[#003E6D]" />
                        </div>
                        <div>
                          <h4
                            className="text-[#003E6D] mb-1"
                            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                          >
                            {benefit.title}
                          </h4>
                          <p className="text-[#003E6D]/60 text-sm">
                            {benefit.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              )}

              {/* What You Can Do Now */}
              <Card className="p-6 bg-white/90 backdrop-blur-md border-2 border-[#003E6D]/10 shadow-lg">
                <h3
                  className="text-[#003E6D] mb-4"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.125rem" }}
                >
                  ✅ Meanwhile, You Can:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-[#003E6D]">Browse commodities and market prices</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-[#003E6D]">Explore buyers and suppliers</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-[#003E6D]">Set up your profile and preferences</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-[#003E6D]">Access educational resources</p>
                  </div>
                </div>
              </Card>
            </>
          )}

          {status === "rejected" && (
            <>
              {/* Failure Reasons */}
              <Card className="p-6 bg-red-50 border-2 border-red-200 shadow-lg">
                <h3
                  className="text-red-800 mb-4"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.125rem" }}
                >
                  ⚠️ Verification Issues
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800">One or more documents could not be verified</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800">Please ensure all documents are clear, valid, and match the information provided</p>
                  </div>
                </div>
              </Card>

              {/* Limited Access Notice */}
              <Alert className="bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  <p className="font-semibold mb-1">Limited Access Mode</p>
                  <p className="text-sm">
                    Your account is currently in limited access mode. Re-submit your KYC documents to unlock all features and continue trading.
                  </p>
                </AlertDescription>
              </Alert>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={onResubmitKYC}
                  className="h-14 bg-gradient-to-r from-[#003E6D] to-[#005A9C] hover:from-[#005A9C] hover:to-[#003E6D] text-white rounded-xl shadow-lg"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Re-Submit KYC
                </Button>
                <Button
                  onClick={onContactSupport}
                  variant="outline"
                  className="h-14 border-2 border-[#003E6D]/20 text-[#003E6D] hover:border-[#FFD700] hover:bg-[#FFD700]/10 rounded-xl"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  <Headphones className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
              </div>
            </>
          )}

          {status === "approved" && (
            <>
              {/* Success Benefits */}
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg">
                <h3
                  className="text-green-800 mb-4"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.125rem" }}
                >
                  🎉 You Now Have Full Access To:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Create and manage trades",
                    "Access wallet and payments",
                    "Connect with verified buyers/sellers",
                    "Apply for finance and insurance",
                    "Track shipments and logistics",
                    "Generate reports and analytics"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <p className="text-green-800">{feature}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          <Separator />

          {/* Contact Support Card */}
          <Card className="p-6 bg-white/90 backdrop-blur-md border-2 border-[#003E6D]/10 shadow-lg">
            <h3
              className="text-[#003E6D] mb-4"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.125rem" }}
            >
              📞 Need Help?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-[#F7FAFC] rounded-lg border border-[#003E6D]/10">
                <Phone className="w-5 h-5 text-[#003E6D]" />
                <div>
                  <p className="text-[#003E6D]/60 text-sm">Call Us</p>
                  <p className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                    1800-XXX-XXXX
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#F7FAFC] rounded-lg border border-[#003E6D]/10">
                <Mail className="w-5 h-5 text-[#003E6D]" />
                <div>
                  <p className="text-[#003E6D]/60 text-sm">Email Us</p>
                  <p className="text-[#003E6D]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                    support@tradie.app
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Go to Dashboard Button */}
          {status !== "rejected" && (
            <Button
              onClick={onGoToDashboard}
              className="w-full h-14 bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] text-[#003E6D] rounded-xl shadow-xl"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "1.125rem" }}
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </motion.div>
      </main>
    </div>
  );
}
