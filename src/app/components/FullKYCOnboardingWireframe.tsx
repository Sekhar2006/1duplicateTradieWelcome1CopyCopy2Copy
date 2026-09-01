import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft, ChevronDown, Upload, Plus, Trash2, Check, Info, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";

export function FullKYCOnboardingWireframe() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Welcome & Sign Up",
    "OTP Verification",
    "Password & Security",
    "Basic KYC Form",
    "Producer Identity",
    "Trading Role Selection",
    "Entity Details",
    "Entity Documents",
    "Ownership & Key Persons",
    "Permissions Matrix",
    "Review & Confirm",
    "Submission Status"
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Full User KYC and Role Onboarding
          </h1>
          <p className="text-gray-600">Low-Fidelity Wireframe Flow (390×844px frames)</p>
          <p className="text-sm text-gray-500 mt-2">
            Complete journey: Sign Up → Basic KYC → Producer/Entity Identity → Role Selection → Verification
          </p>
        </div>

        {/* Step Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex items-center justify-start gap-2 min-w-max pb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(index)}
                  className={`px-3 py-2 rounded-lg text-xs transition-all whitespace-nowrap ${
                    currentStep === index
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {index + 1}. {step}
                </button>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-400 mx-1 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Screen Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* STEP 1: Welcome & Sign Up */}
          {currentStep === 0 && (
            <div className="max-w-md mx-auto">
              <Card className="p-8 bg-white border-2 border-gray-300">
                {/* Logo Placeholder */}
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">LOGO</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  Welcome to TRADIE
                </h2>
                <p className="text-sm text-gray-600 text-center mb-8">
                  Connect, Trade, and Grow with Confidence
                </p>

                <div className="space-y-4 mb-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50"></div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <div className="flex gap-2">
                      <div className="w-24 h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">+91</span>
                      </div>
                      <div className="flex-1 h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50"></div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                      <span className="text-xs text-gray-600">Use Virtual Number to Hide Real Number</span>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email (Optional)
                    </label>
                    <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full h-12 bg-gray-900 text-white rounded-lg font-semibold">
                    Get OTP
                  </button>
                  <button className="w-full h-12 border-2 border-gray-300 text-gray-700 rounded-lg">
                    Already have an account? <span className="underline">Log In</span>
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-6">
                  By continuing, you agree to our Terms of Use and Privacy Policy
                </p>
              </Card>
            </div>
          )}

          {/* STEP 2: OTP Verification */}
          {currentStep === 1 && (
            <div className="max-w-md mx-auto">
              <Card className="p-8 bg-white border-2 border-gray-300">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  Verify OTP
                </h2>
                <p className="text-sm text-gray-600 text-center mb-8">
                  Enter the 6-digit code sent to<br />
                  <strong>+91 98765 43210</strong>
                </p>

                {/* OTP Input Boxes */}
                <div className="flex gap-3 justify-center mb-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-14 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-center"
                    >
                      <span className="text-gray-400">•</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">
                    Didn't receive code?{" "}
                    <button className="text-gray-900 underline font-semibold">Resend OTP</button>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">00:45 seconds remaining</p>
                </div>

                <button className="w-full h-12 bg-gray-900 text-white rounded-lg font-semibold mb-3">
                  Verify & Continue
                </button>
                <button className="w-full h-12 border-2 border-gray-300 text-gray-700 rounded-lg">
                  Back
                </button>
              </Card>
            </div>
          )}

          {/* STEP 3: Password & Security Setup */}
          {currentStep === 2 && (
            <div className="max-w-md mx-auto">
              <Card className="p-8 bg-white border-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Set Up Security
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Create a secure password and PIN for your account
                </p>

                <div className="space-y-6">
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center px-3 justify-between">
                        <span className="text-gray-400">••••••••</span>
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="w-4 h-4 border border-gray-400 rounded-full"></span>
                        At least 8 characters
                      </p>
                      <p className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="w-4 h-4 border border-gray-400 rounded-full"></span>
                        1 uppercase letter
                      </p>
                      <p className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="w-4 h-4 border border-gray-400 rounded-full"></span>
                        1 lowercase letter
                      </p>
                      <p className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="w-4 h-4 border border-gray-400 rounded-full"></span>
                        1 special character (@, #, $, etc.)
                      </p>
                    </div>
                  </div>

                  {/* 6-Digit PIN */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      6-Digit PIN *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="flex-1 h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-center"
                        >
                          <span className="text-gray-400">•</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Used for quick authentication</p>
                  </div>

                  {/* Biometric */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 border-2 border-gray-400 rounded mt-1"></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-700">
                          Enable Biometric Authentication (Optional)
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Use fingerprint or face recognition for quick login
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button className="w-full h-12 bg-gray-900 text-white rounded-lg font-semibold">
                    Continue to KYC
                  </button>
                  <button className="w-full h-12 border-2 border-gray-300 text-gray-700 rounded-lg">
                    Back
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* STEP 4: Basic KYC Form */}
          {currentStep === 3 && (
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 bg-white border-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Basic KYC Information
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Please provide your identity details
                </p>

                <Alert className="border-blue-400 bg-blue-50 mb-6">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-gray-700 text-sm">
                    Document requirements differ by country. Field labels will adapt automatically.
                  </AlertDescription>
                </Alert>

                <div className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name (as per ID) *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center px-3">
                        <span className="text-gray-400 text-sm">📅 DD/MM/YYYY</span>
                      </div>
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Gender *
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {["Male", "Female", "Other", "Prefer not to say"].map((option) => (
                        <div key={option} className="border-2 border-gray-300 rounded-lg p-3 text-center">
                          <div className="w-4 h-4 border-2 border-gray-400 rounded-full mx-auto mb-2"></div>
                          <span className="text-sm text-gray-700">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Country *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-3">
                        <span className="text-gray-400 text-sm">Select country...</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State/Region *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-3">
                        <span className="text-gray-400 text-sm">Select state...</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        District *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-3">
                        <span className="text-gray-400 text-sm">Select...</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Place/City *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        PIN/Postal Code *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50"></div>
                    </div>
                  </div>

                  {/* Government ID Upload */}
                  <div className="border-2 border-gray-400 rounded-lg p-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Upload Government ID *
                      <span className="text-xs font-normal text-gray-500 ml-2">
                        (Aadhaar / National ID / Passport / Driver's License)
                      </span>
                    </label>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:border-gray-500">
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Upload Front</p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG (max 5MB)</p>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:border-gray-500">
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Upload Back</p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG (max 5MB)</p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-3 italic">
                      💡 Country-specific: Label changes to "Aadhaar" in India, "SSN" in USA, "National ID" elsewhere
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg">
                    Back
                  </button>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold">
                    Next → Producer / Entity Identity
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* STEP 5: Producer Identity Verification */}
          {currentStep === 4 && (
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 bg-white border-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  🌾 Producer Identity Verification
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Upload producer-specific documents based on your location
                </p>

                <Alert className="border-amber-400 bg-amber-50 mb-6">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-gray-700 text-sm">
                    <strong>Field names and document requirements change per country/state.</strong><br/>
                    Select your location to see applicable documents.
                  </AlertDescription>
                </Alert>

                <div className="space-y-6">
                  {/* Location Selection */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Country *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-3">
                        <span className="text-gray-400 text-sm">India (selected)</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-3">
                        <span className="text-gray-400 text-sm">Andhra Pradesh</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Document Examples */}
                  <div className="border-2 border-gray-400 rounded-lg p-4 bg-gray-50">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      📋 Accepted Producer IDs (India / Andhra Pradesh)
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>• Pattadar Passbook</p>
                      <p>• 7/12 Land Record Extract</p>
                      <p>• Revenue Record (ROR)</p>
                      <p>• Kisan Credit Card</p>
                      <p>• Farmer Registration Certificate</p>
                      <p>• Others (with description)</p>
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select and Upload Document *
                    </label>
                    
                    <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-3 mb-4">
                      <span className="text-gray-400 text-sm">Select document type...</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:border-gray-500">
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Upload Document</p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG (max 10MB)</p>
                      </div>
                      <div className="border-2 border-gray-300 rounded-lg h-40 flex items-center justify-center bg-gray-100">
                        <p className="text-sm text-gray-400">Preview</p>
                      </div>
                    </div>
                  </div>

                  {/* Others Option */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      If "Others" Selected
                    </label>
                    <div className="space-y-3">
                      <div className="h-10 border border-gray-300 rounded bg-white"></div>
                      <div className="h-20 border border-gray-300 rounded bg-white"></div>
                      <p className="text-xs text-gray-500 italic">
                        Provide document name and brief description
                      </p>
                    </div>
                  </div>

                  {/* Country Examples */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border border-gray-300 rounded p-3 bg-white">
                      <p className="text-xs font-semibold text-gray-700 mb-1">🇺🇸 USA</p>
                      <p className="text-xs text-gray-600">FSA Farm Registration, County Agri Certificate</p>
                    </div>
                    <div className="border border-gray-300 rounded p-3 bg-white">
                      <p className="text-xs font-semibold text-gray-700 mb-1">🇧🇷 Brazil</p>
                      <p className="text-xs text-gray-600">CAR (Rural Environmental Registry)</p>
                    </div>
                    <div className="border border-gray-300 rounded p-3 bg-white">
                      <p className="text-xs font-semibold text-gray-700 mb-1">🇰🇪 Kenya</p>
                      <p className="text-xs text-gray-600">County Agricultural License</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg">
                    Back
                  </button>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold">
                    Next → Role Selection
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* STEP 6: Trading Role Selection */}
          {currentStep === 5 && (
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-white border-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  📊 Select Your Trading Role(s)
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Choose one or multiple roles. You can switch roles anytime in Settings.
                </p>

                <Alert className="border-blue-400 bg-blue-50 mb-6">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-gray-700 text-sm">
                    <strong>💡 Note:</strong> Back-office features are available for all roles except producers, unless you upgrade to Platinum Membership.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    { role: "Producer", emoji: "🧑‍🌾" },
                    { role: "Commission Agent", emoji: "🧾" },
                    { role: "Trader", emoji: "���" },
                    { role: "Buyer", emoji: "🛒" },
                    { role: "3rd Party Verifier", emoji: "🧩" },
                    { role: "Bank/Finance", emoji: "🏦" },
                    { role: "Logistics/Transport", emoji: "🚚" },
                    { role: "Storage Facility", emoji: "🏠" },
                    { role: "Insurance Company", emoji: "🛡️" },
                    { role: "Regulatory Authority", emoji: "🧑‍💻" }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-dashed border-gray-400 rounded-lg p-4 hover:border-gray-600 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                        <span className="text-2xl">{item.emoji}</span>
                        <span className="text-gray-700 font-semibold">{item.role}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-2 border-amber-300 rounded-lg p-4 bg-amber-50 mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>🧑‍🌾 For Producers:</strong> Request Platinum Membership to unlock Back-Office features (analytics, team mgmt, automation).
                  </p>
                </div>

                <div className="flex justify-between">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg">
                    Back
                  </button>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold">
                    Next → Entity Details
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* STEP 7: Entity Details */}
          {currentStep === 6 && (
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 bg-white border-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  🏢 Entity Details
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Provide your organization information
                </p>

                <Alert className="border-blue-400 bg-blue-50 mb-6">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-gray-700 text-sm">
                    Field labels and requirements adapt to the selected country and state.
                  </AlertDescription>
                </Alert>

                <div className="space-y-6">
                  {/* Entity Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Entity Name *
                    </label>
                    <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50"></div>
                  </div>

                  {/* Country & State */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Country *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-3">
                        <span className="text-gray-400 text-sm">Select...</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State/Region *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-3">
                        <span className="text-gray-400 text-sm">Depends on Country</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Entity Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Type of Entity *
                    </label>
                    <div className="space-y-2">
                      {[
                        "Proprietor",
                        "Partnership Firm",
                        "LLP",
                        "Limited Company",
                        "Society/Association",
                        "Trust",
                        "Other"
                      ].map((type) => (
                        <div key={type} className="border border-gray-300 rounded px-4 py-2 flex items-center gap-3">
                          <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                          <span className="text-gray-700">{type}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 h-10 border border-gray-300 rounded bg-gray-50">
                      <p className="text-xs text-gray-500 px-3 py-2">
                        If "Other" selected → show description field
                      </p>
                    </div>
                  </div>

                  {/* Category & Tax ID */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-3">
                        <span className="text-gray-400 text-sm">Micro/MSME/Startup/Large</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Entity PAN / Tax ID *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50"></div>
                      <p className="text-xs text-gray-500 mt-1">Country-aware label</p>
                    </div>
                  </div>

                  {/* Other Fields (Collapsed) */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                    <p className="text-sm text-gray-600">
                      Additional fields: Udyam Aadhaar (India only), Registered Address, Area of Operation (Local/Inter-State/International), License Authority, License Number, Registration Date
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg">
                    Back
                  </button>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold">
                    Next → Documents
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* STEP 8: Entity Documents */}
          {currentStep === 7 && (
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-white border-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  📄 Upload Regulatory Documents
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Required documents based on: Country + State + Role
                </p>

                <Alert className="border-blue-400 bg-blue-50 mb-6">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-gray-700 text-sm">
                    <strong>Dynamic Document List:</strong> Requirements adapt based on your selections (Country, State, Entity Type, Role)
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  {/* Example Documents */}
                  {[
                    { name: "Shop & Establishment Certificate", required: true },
                    { name: "Market Committee License (APMC)", required: true },
                    { name: "GST Registration Certificate", required: true },
                    { name: "PAN Card", required: true },
                    { name: "Bank Account Proof", required: true }
                  ].map((doc, idx) => (
                    <div key={idx} className="border-2 border-gray-400 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold text-gray-700">
                          {doc.name}
                          {doc.required && <span className="text-red-500 ml-1">*</span>}
                        </p>
                        {doc.required && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded border border-red-300">
                            Required
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-gray-300 rounded h-28 flex flex-col items-center justify-center bg-gray-50">
                          <Upload className="w-6 h-6 text-gray-400 mb-1" />
                          <p className="text-xs text-gray-500">Upload</p>
                        </div>
                        <div className="border border-gray-300 rounded h-28 flex items-center justify-center bg-gray-100">
                          <p className="text-xs text-gray-400">Preview</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Others */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                    <p className="font-semibold text-gray-700 mb-3">Others (Optional)</p>
                    <div className="space-y-2">
                      <div className="h-10 border border-gray-300 rounded bg-white"></div>
                      <div className="h-16 border border-gray-300 rounded bg-white"></div>
                      <div className="border-2 border-dashed border-gray-300 rounded h-20 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">Upload Document</span>
                      </div>
                    </div>
                  </div>

                  {/* Country Examples */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { country: "USA", docs: "State Business Reg., FSA/USDA, EIN" },
                      { country: "Brazil", docs: "CNPJ, CAF Registration" },
                      { country: "Kenya", docs: "Business Permit, NCPB, PIN" }
                    ].map((example, idx) => (
                      <div key={idx} className="border border-gray-300 rounded p-3 bg-white">
                        <p className="text-xs font-semibold text-gray-700">{example.country}</p>
                        <p className="text-xs text-gray-600 mt-1">{example.docs}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg">
                    Back
                  </button>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold">
                    Next → Ownership
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* STEP 9: Ownership & Key Persons */}
          {currentStep === 8 && (
            <div className="max-w-5xl mx-auto">
              <Card className="p-8 bg-white border-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  👥 Ownership / Key Persons
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Add up to 30 key persons (max). Ownership % must total 100%.
                </p>

                <Alert className="border-amber-400 bg-amber-50 mb-6">
                  <Info className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-gray-700 text-sm">
                    <strong>Proprietor:</strong> All admin rights vest with the Proprietor by default. Staff permissions can be assigned below.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  {/* Person 1 */}
                  <div className="border-2 border-gray-400 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-700">Person #1</h3>
                      <button className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="h-10 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center px-2">
                        <span className="text-xs text-gray-400">Full Name</span>
                      </div>
                      <div className="h-10 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-2">
                        <span className="text-xs text-gray-400">Designation</span>
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                      <div className="h-10 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-2">
                        <span className="text-xs text-gray-400">Roles (multi)</span>
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      <div className="h-10 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center px-2">
                        <span className="text-xs text-gray-400">Email</span>
                      </div>
                      <div className="h-10 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center px-2">
                        <span className="text-xs text-gray-400">Mobile</span>
                      </div>
                      <div className="h-10 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center px-2">
                        <span className="text-xs text-gray-400">Govt ID</span>
                      </div>
                      <div className="h-10 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center px-2">
                        <span className="text-xs text-gray-400">Own %</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-10 h-6 border-2 border-gray-400 rounded-full bg-gray-100"></div>
                      <span className="text-sm text-gray-600">Administrative Rights</span>
                    </div>
                  </div>

                  {/* Person 2 (lighter) */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                    <p className="text-sm text-gray-500 text-center py-4">
                      Person #2 [Same structure]
                    </p>
                  </div>

                  {/* Add More */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-400">... up to 30 persons ...</p>
                  </div>
                </div>

                <button className="w-full border-2 border-dashed border-gray-400 rounded-lg py-3 mt-4 flex items-center justify-center gap-2 hover:border-gray-600">
                  <Plus className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 font-semibold">Add Person (Max 30)</span>
                </button>

                {/* Ownership Total */}
                <div className="mt-6 bg-amber-50 border-2 border-amber-400 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Ownership Total:</span>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-900">65%</span>
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded border border-amber-400">
                        ⚠️ Must equal 100%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Designation Reference */}
                <Alert className="border-gray-400 bg-gray-50 mt-6">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-xs text-gray-700">
                    <strong>Designations by Entity Type:</strong><br/>
                    Partnership: Managing Partner, Partner | LLP: Designated Partner, Partner | Company: Chairman, MD, CEO, Director | Society: President, VP | Trust: Managing Trustee, Trustee
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between mt-8">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg">
                    Back
                  </button>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold">
                    Next → Permissions
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* STEP 10: Permissions Matrix */}
          {currentStep === 9 && (
            <div className="max-w-6xl mx-auto">
              <Card className="p-8 bg-white border-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  🔐 Permissions & Access
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Assign module permissions for each key person
                </p>

                {/* Quick Presets */}
                <div className="mb-6 flex gap-2">
                  <span className="text-sm font-semibold text-gray-700">Quick Presets:</span>
                  {["Admin", "Ops", "Finance", "Auditor"].map((preset) => (
                    <button
                      key={preset}
                      className="px-3 py-1 border-2 border-gray-400 rounded text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Permissions Table (Lo-Fi) */}
                <div className="overflow-x-auto border-2 border-gray-400 rounded-lg">
                  <table className="w-full">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border-r-2 border-gray-400 p-3 text-left text-sm font-semibold">
                          Module
                        </th>
                        <th className="border-r-2 border-gray-400 p-3 text-center text-sm font-semibold" colSpan={4}>
                          Person #1
                        </th>
                        <th className="p-3 text-center text-sm font-semibold" colSpan={4}>
                          Person #2
                        </th>
                      </tr>
                      <tr className="bg-gray-100">
                        <th className="border-r-2 border-gray-400 p-2"></th>
                        {[1, 2].map((person) => (
                          <React.Fragment key={person}>
                            <th className="border-l border-gray-300 p-2 text-xs">View</th>
                            <th className="border-l border-gray-300 p-2 text-xs">Create</th>
                            <th className="border-l border-gray-300 p-2 text-xs">Approve</th>
                            <th className={`border-l border-gray-300 p-2 text-xs ${person === 1 ? 'border-r-2 border-gray-400' : ''}`}>
                              Admin
                            </th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {["Trades", "Wallet", "KYC", "Buyers/Suppliers", "Logistics", "Storage", "Finance", "Reports", "Settings"].map((module, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border-r-2 border-t border-gray-400 p-3 font-semibold text-sm">
                            {module}
                          </td>
                          {[1, 2].map((person) => (
                            <React.Fragment key={person}>
                              {[1, 2, 3, 4].map((permission) => (
                                <td
                                  key={permission}
                                  className={`border-l border-t border-gray-300 p-3 text-center ${
                                    permission === 4 && person === 1 ? 'border-r-2 border-gray-400' : ''
                                  }`}
                                >
                                  <div className="w-5 h-5 border-2 border-gray-400 rounded mx-auto"></div>
                                </td>
                              ))}
                            </React.Fragment>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Alert className="border-blue-400 bg-blue-50 mt-6">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-gray-700 text-sm">
                    <strong>Permission Levels:</strong> View = Read-only | Create = Add new | Approve = Authorize | Admin = Full control
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between mt-8">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg">
                    Back
                  </button>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold">
                    Next → Review
                  </button>
                </div>
              </Card>
            </div>
          )}

          {/* STEP 11: Review & Confirm */}
          {currentStep === 10 && (
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-white border-2 border-gray-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  ✅ Review & Confirm
                </h2>

                <div className="space-y-6">
                  {/* Entity Details */}
                  <div className="border-2 border-gray-400 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-4">1️⃣ Entity Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Entity Name:</p>
                        <p className="font-semibold">ABC Trading Company Pvt. Ltd.</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Country:</p>
                        <p className="font-semibold">India</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Entity Type:</p>
                        <p className="font-semibold">Limited Company</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Category:</p>
                        <p className="font-semibold">MSME</p>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="border-2 border-gray-400 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-4">2️⃣ Documents Uploaded</h3>
                    <div className="space-y-2">
                      {["Shop & Establishment", "APMC License", "GST Certificate", "PAN Card", "Bank Proof"].map((doc) => (
                        <div key={doc} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{doc}</span>
                          <span className="ml-auto text-xs text-gray-500">✓ Uploaded</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ownership */}
                  <div className="border-2 border-gray-400 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-4">3️⃣ Ownership & Key Persons</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-semibold">Rajesh Kumar</p>
                          <p className="text-xs text-gray-600">Managing Director</p>
                        </div>
                        <span className="px-3 py-1 bg-gray-900 text-white text-sm rounded">51%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-semibold">Priya Singh</p>
                          <p className="text-xs text-gray-600">Director</p>
                        </div>
                        <span className="px-3 py-1 bg-gray-900 text-white text-sm rounded">49%</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 border border-green-400 rounded">
                      <p className="text-sm text-green-700">
                        <Check className="w-4 h-4 inline mr-2" />
                        Ownership Total: <strong>100%</strong> ✓
                      </p>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="border-2 border-gray-400 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-4">4️⃣ Permissions Snapshot</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="font-semibold mb-1">Rajesh Kumar</p>
                        <p className="text-xs text-gray-600">Admin access to all modules</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="font-semibold mb-1">Priya Singh</p>
                        <p className="text-xs text-gray-600">Finance & Reports (View, Create, Approve)</p>
                      </div>
                    </div>
                  </div>

                  {/* Confirmations */}
                  <div className="border-2 border-gray-400 rounded-lg p-6 bg-gray-50">
                    <h3 className="font-bold text-gray-900 mb-4">Confirmations Required</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5"></div>
                        <label className="text-sm">
                          I certify that all documents are authentic and valid for the selected jurisdiction.
                        </label>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5"></div>
                        <label className="text-sm">
                          I accept responsibility for the assigned roles and permissions.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-4 mt-8">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg">
                    Back
                  </button>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 border-2 border-gray-400 text-gray-700 rounded-lg">
                      💾 Save as Draft
                    </button>
                    <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold">
                      <Check className="w-5 h-5 inline mr-2" />
                      Submit for Verification
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* STEP 12: Submission Status */}
          {currentStep === 11 && (
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 bg-white border-2 border-gray-300 text-center">
                {/* Success Icon */}
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-12 h-12 text-green-600" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  ✅ KYC Submitted Successfully!
                </h2>
                
                <div className="inline-block bg-gray-100 px-4 py-2 rounded mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Application ID:</strong> KYC-2025-001234
                  </p>
                </div>

                <Alert className="border-blue-400 bg-blue-50 mb-6 text-left">
                  <Info className="h-5 w-5 text-blue-600" />
                  <AlertDescription className="text-gray-700">
                    <strong className="block mb-2">Verification Timeline:</strong>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Producers:</strong> 2-10 working days</li>
                      <li>• <strong>Other entities:</strong> Up to 15 working days</li>
                      <li>• Physical verification may be required for non-producer roles</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                {/* What Happens Next */}
                <div className="border-2 border-gray-400 rounded-lg p-6 mb-6 text-left">
                  <h3 className="font-bold text-gray-900 mb-4">What Happens Next?</h3>
                  <div className="space-y-3">
                    {[
                      "Document verification by KYC team",
                      "Ownership & key person validation",
                      "Physical verification (if required)",
                      "Final approval and account activation"
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold">
                    🏠 Go to Limited Dashboard
                  </button>
                  <button className="px-8 py-4 border-2 border-gray-400 text-gray-700 rounded-lg font-semibold">
                    ➕ Add Another Entity
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-8">
                  Questions? Contact support at <strong>support@tradie.com</strong>
                </p>
              </Card>
            </div>
          )}
        </motion.div>

        {/* Navigation Helper */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Click step numbers above to navigate between screens</p>
          <p className="text-xs mt-2">
            Low-fidelity wireframe • All frames 390×844px • Grayscale design
          </p>
        </div>
      </div>
    </div>
  );
}

// Add React import
import React from "react";
