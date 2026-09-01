import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft, ChevronDown, Upload, Plus, Trash2, Check, Info, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription } from "./ui/alert";

export function EntityOnboardingWireframe() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Role Entry",
    "Entity Details",
    "Document Upload",
    "Ownership & Key Persons",
    "Permissions Matrix",
    "Review & Confirm",
    "Submission States"
  ];

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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Entity Onboarding (Non-Producer)
          </h1>
          <p className="text-gray-600">Low-Fidelity Wireframe Flow</p>
          <p className="text-sm text-gray-500 mt-2">
            Applies to: Commission Agent, Buyer, Trader, Logistics/Transport, Storage, Insurance, Bank/Financial, Regulatory
          </p>
        </motion.div>

        {/* Step Navigation */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(index)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    currentStep === index
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {index + 1}. {step}
                </button>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-400 mx-1" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Screen Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1: Role Entry */}
          {currentStep === 0 && (
            <Card className="p-8 bg-white border-2 border-gray-300">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Choose Organization Type
                </h2>

                <div className="space-y-4 mb-8">
                  <p className="text-sm text-gray-600">
                    Select one or more roles for your organization:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Commission Agent",
                      "Buyer",
                      "Trader",
                      "Logistics/Transport",
                      "Storage Facility",
                      "Insurance Company",
                      "Bank/Financial Inst.",
                      "Regulatory Authority"
                    ].map((role, idx) => (
                      <div
                        key={idx}
                        className="border-2 border-dashed border-gray-400 rounded-lg p-4 hover:border-gray-600 cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                          <span className="text-gray-700">{role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Alert className="border-gray-300 bg-gray-50 mb-6">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-gray-700">
                    <strong>Note:</strong> You can select multiple roles. Each role will require specific documentation and verification.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end">
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg flex items-center gap-2">
                    Next → Entity Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Entity Details */}
          {currentStep === 1 && (
            <Card className="p-8 bg-white border-2 border-gray-300">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Entity Details
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Field labels and requirements adapt to the selected country and state
                </p>

                <div className="space-y-6">
                  {/* Entity Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Entity Name *
                    </label>
                    <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50"></div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Country * (with flags)
                    </label>
                    <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-4">
                      <span className="text-gray-400">Select country...</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      → Drives region/state list and document requirements
                    </p>
                  </div>

                  {/* State/Region */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State/Region * (depends on Country)
                    </label>
                    <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-4">
                      <span className="text-gray-400">Select state/region...</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Type of Entity */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Type of Entity *
                    </label>
                    <div className="space-y-2">
                      {[
                        "��� Proprietor",
                        "⚪ Partnership Firm",
                        "⚪ LLP (Limited Liability Partnership)",
                        "⚪ Limited Company",
                        "⚪ Society/Association",
                        "⚪ Trust",
                        "⚪ Other"
                      ].map((option, idx) => (
                        <div key={idx} className="border border-gray-300 rounded px-4 py-2 text-gray-700">
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center justify-between px-4">
                        <span className="text-gray-400">Micro/MSME/Startup/Large</span>
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

                  {/* Udyam Aadhaar */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Udyam Aadhaar / MSME ID
                      <Badge className="ml-2 bg-gray-200 text-gray-700">India Only - Optional</Badge>
                    </label>
                    <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50"></div>
                  </div>

                  {/* Registered Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Registered Address *
                    </label>
                    <div className="h-24 border-2 border-dashed border-gray-400 rounded bg-gray-50"></div>
                  </div>

                  {/* Area of Operation */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Area of Operation *
                    </label>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                        <span className="text-gray-700">Local</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                        <span className="text-gray-700">Inter-State</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                        <span className="text-gray-700">International</span>
                      </div>
                    </div>
                  </div>

                  {/* License Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        License/Registration Issuing Authority *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50"></div>
                      <p className="text-xs text-gray-500 mt-1">Enter govt. dept./board name</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        License/Registration Number *
                      </label>
                      <div className="h-12 border-2 border-dashed border-gray-400 rounded bg-gray-50"></div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Registration Date *
                    </label>
                    <div className="h-12 w-64 border-2 border-dashed border-gray-400 rounded bg-gray-50 flex items-center px-4">
                      <span className="text-gray-400">📅 DD/MM/YYYY</span>
                    </div>
                  </div>

                  {/* Conditional: Other Entity Type */}
                  <Alert className="border-amber-400 bg-amber-50">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-gray-700">
                      <strong>If "Other" selected:</strong> "Describe Entity Type" field appears below
                    </AlertDescription>
                  </Alert>
                </div>

                <div className="flex justify-between mt-8">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg flex items-center gap-2">
                    Next → Document Upload
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 3: Document Upload */}
          {currentStep === 2 && (
            <Card className="p-8 bg-white border-2 border-gray-300">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Upload Regulatory Documents
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Document requirements based on: Country + State/Region + Entity Type
                </p>

                <Alert className="border-blue-400 bg-blue-50 mb-6">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-gray-700">
                    <strong>Dynamic Document List:</strong> Documents shown below adapt based on your selections (Country, State, Entity Type, Role)
                  </AlertDescription>
                </Alert>

                {/* Example for India / Andhra Pradesh */}
                <div className="mb-6">
                  <div className="bg-gray-100 p-3 rounded-lg mb-4">
                    <p className="text-sm font-semibold text-gray-700">
                      Example: India / Andhra Pradesh / Commission Agent
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: "Shop & Establishment Certificate", required: true },
                      { name: "Market Committee License (APMC)", required: true },
                      { name: "GST Registration Certificate", required: true },
                      { name: "PAN Card", required: true },
                      { name: "Bank Account Proof", required: true },
                      { name: "7/12 Land Record", required: false, note: "If agricultural storage" },
                      { name: "Others", required: false }
                    ].map((doc, idx) => (
                      <div key={idx} className="border-2 border-dashed border-gray-400 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold text-gray-700">
                              {doc.name}
                              {doc.required && <span className="text-red-500 ml-1">*</span>}
                            </p>
                            {doc.note && (
                              <p className="text-xs text-gray-500 mt-1">{doc.note}</p>
                            )}
                          </div>
                          {doc.required && (
                            <Badge className="bg-red-100 text-red-700 border-red-300">Required</Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:border-gray-500 transition-all">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Click to upload</p>
                            <p className="text-xs text-gray-400">PDF, JPG, PNG</p>
                          </div>
                          <div className="border-2 border-gray-300 rounded-lg h-32 flex items-center justify-center bg-gray-100">
                            <p className="text-sm text-gray-400">Preview</p>
                          </div>
                        </div>

                        {doc.name === "Others" && (
                          <div className="mt-4 space-y-3 bg-gray-50 p-3 rounded">
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Document Type
                              </label>
                              <div className="h-10 border border-gray-300 rounded bg-white"></div>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Short Description
                              </label>
                              <div className="h-16 border border-gray-300 rounded bg-white"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Examples */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { country: "USA", docs: "State Business Reg., FSA/USDA, EIN/Tax ID" },
                    { country: "Brazil", docs: "CNPJ, CAF/Agri Registration" },
                    { country: "Kenya", docs: "Business Permit, NCPB/Agri Board, PIN" }
                  ].map((example, idx) => (
                    <div key={idx} className="border border-gray-300 rounded-lg p-3 bg-gray-50">
                      <p className="text-xs font-semibold text-gray-700 mb-1">{example.country}</p>
                      <p className="text-xs text-gray-600">{example.docs}</p>
                    </div>
                  ))}
                </div>

                <Alert className="border-gray-400 bg-gray-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-700 text-sm">
                    <strong>Validation:</strong> License No. format may vary by state. At least one regulatory document required.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between mt-8">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg flex items-center gap-2">
                    Next → Ownership & Roles
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 4: Ownership & Key Persons */}
          {currentStep === 3 && (
            <Card className="p-8 bg-white border-2 border-gray-300">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Ownership / Key Persons
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Add up to 30 key persons. For Partnership/LLP/Company/Society/Trust, ownership % must sum to 100%.
                </p>

                <Alert className="border-amber-400 bg-amber-50 mb-6">
                  <Info className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-gray-700">
                    <strong>If Proprietor:</strong> All admin rights vest with the Proprietor by default; staff permissions can be assigned below.
                  </AlertDescription>
                </Alert>

                {/* Person Rows */}
                <div className="space-y-4 mb-6">
                  {/* Person 1 */}
                  <div className="border-2 border-gray-400 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-700">Person #1</h3>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                        <div className="h-10 border border-gray-300 rounded bg-gray-50"></div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Designation *
                        </label>
                        <div className="h-10 border border-gray-300 rounded bg-gray-50 flex items-center justify-between px-3">
                          <span className="text-xs text-gray-400">Select...</span>
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Varies by entity type</p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Role(s) * (multi-select)
                        </label>
                        <div className="h-10 border border-gray-300 rounded bg-gray-50 flex items-center justify-between px-3">
                          <span className="text-xs text-gray-400">Admin, Ops, Trades...</span>
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                        <div className="h-10 border border-gray-300 rounded bg-gray-50"></div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile *</label>
                        <div className="h-10 border border-gray-300 rounded bg-gray-50"></div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Govt. ID * (PAN/SSN/NID)
                        </label>
                        <div className="h-10 border border-gray-300 rounded bg-gray-50"></div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Ownership %</label>
                        <div className="h-10 border border-gray-300 rounded bg-gray-50"></div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                      <span className="text-sm text-gray-700">Administrative Rights</span>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>

                  {/* Person 2 (lighter) */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-600">Person #2</h3>
                      <button className="text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 text-center py-4">
                      [Same field structure as Person #1]
                    </p>
                  </div>

                  {/* Add More Indicator */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center text-gray-400">
                    <p className="text-sm">... up to 30 persons ...</p>
                  </div>
                </div>

                <button className="w-full border-2 border-dashed border-gray-400 rounded-lg py-3 flex items-center justify-center gap-2 text-gray-600 hover:border-gray-600 hover:bg-gray-50 transition-all">
                  <Plus className="w-5 h-5" />
                  Add Person (Max 30)
                </button>

                {/* Running Total */}
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Ownership Total:</span>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-gray-900">65%</span>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-400">
                        ⚠️ Must equal 100%
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Designation Reference */}
                <Alert className="border-gray-400 bg-gray-50 mt-6">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-xs text-gray-700">
                    <strong>Designations by Entity Type:</strong><br/>
                    • Partnership: Managing Partner, Partner<br/>
                    • LLP: Designated Partner, Partner<br/>
                    • Company: Chairman, MD, CEO, Director, Treasurer<br/>
                    • Society: President, VP, Treasurer, Director/Member<br/>
                    • Trust: Managing Trustee, Trustee
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between mt-8">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg flex items-center gap-2">
                    Next → Permissions Matrix
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 5: Permissions Matrix */}
          {currentStep === 4 && (
            <Card className="p-8 bg-white border-2 border-gray-300">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Permissions & Access
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Assign module permissions for each key person
                </p>

                {/* Quick Presets */}
                <div className="mb-6 flex gap-3">
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

                {/* Permissions Grid */}
                <div className="overflow-x-auto border-2 border-gray-400 rounded-lg">
                  <table className="w-full">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="border-r-2 border-gray-400 p-3 text-left text-sm font-semibold text-gray-700">
                          Module
                        </th>
                        <th className="border-r-2 border-gray-400 p-3 text-center text-sm font-semibold text-gray-700" colSpan={4}>
                          Person #1 (Rajesh Kumar)
                        </th>
                        <th className="p-3 text-center text-sm font-semibold text-gray-700" colSpan={4}>
                          Person #2 (Priya Singh)
                        </th>
                      </tr>
                      <tr className="bg-gray-100">
                        <th className="border-r-2 border-gray-400 p-2"></th>
                        {[1, 2].map((person) => (
                          <React.Fragment key={person}>
                            <th className="border-l border-gray-300 p-2 text-xs text-gray-600">View</th>
                            <th className="border-l border-gray-300 p-2 text-xs text-gray-600">Create</th>
                            <th className="border-l border-gray-300 p-2 text-xs text-gray-600">Approve</th>
                            <th className={`border-l border-gray-300 p-2 text-xs text-gray-600 ${person === 1 ? 'border-r-2 border-gray-400' : ''}`}>
                              Admin
                            </th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        "Trades",
                        "Wallet",
                        "KYC",
                        "Buyers/Suppliers",
                        "Logistics",
                        "Storage",
                        "Finance",
                        "Reports",
                        "Settings"
                      ].map((module, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border-r-2 border-t border-gray-400 p-3 font-semibold text-sm text-gray-700">
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
                    <strong>Permission Levels:</strong> View = Read-only | Create = Add new | Approve = Authorize actions | Admin = Full control
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between mt-8">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg flex items-center gap-2">
                    Next → Review & Confirm
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 6: Review & Confirm */}
          {currentStep === 5 && (
            <Card className="p-8 bg-white border-2 border-gray-300">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Review & Confirm
                </h2>

                <div className="space-y-6">
                  {/* Entity Details Summary */}
                  <div className="border-2 border-gray-400 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">1</div>
                      Entity Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Entity Name:</p>
                        <p className="font-semibold text-gray-900">ABC Trading Company Pvt. Ltd.</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Country:</p>
                        <p className="font-semibold text-gray-900">🇮🇳 India</p>
                      </div>
                      <div>
                        <p className="text-gray-600">State:</p>
                        <p className="font-semibold text-gray-900">Andhra Pradesh</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Entity Type:</p>
                        <p className="font-semibold text-gray-900">Limited Company</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Category:</p>
                        <p className="font-semibold text-gray-900">MSME</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tax ID/PAN:</p>
                        <p className="font-semibold text-gray-900">AAACA1234E</p>
                      </div>
                    </div>
                  </div>

                  {/* Documents Summary */}
                  <div className="border-2 border-gray-400 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">2</div>
                      Documents Uploaded
                    </h3>
                    <div className="space-y-2">
                      {[
                        "Shop & Establishment Certificate",
                        "APMC Market Committee License",
                        "GST Registration Certificate",
                        "PAN Card",
                        "Bank Account Proof"
                      ].map((doc, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">{doc}</span>
                          <span className="ml-auto text-xs text-gray-500">✓ Uploaded</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ownership Summary */}
                  <div className="border-2 border-gray-400 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">3</div>
                      Ownership & Key Persons
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "Rajesh Kumar", designation: "Managing Director", ownership: "51%" },
                        { name: "Priya Singh", designation: "Director", ownership: "49%" }
                      ].map((person, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-semibold text-gray-900">{person.name}</p>
                            <p className="text-xs text-gray-600">{person.designation}</p>
                          </div>
                          <Badge className="bg-gray-900 text-white">{person.ownership}</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-green-50 border border-green-400 rounded">
                      <p className="text-sm text-green-700">
                        <Check className="w-4 h-4 inline mr-2" />
                        Ownership Total: <strong>100%</strong> ✓
                      </p>
                    </div>
                  </div>

                  {/* Permissions Summary */}
                  <div className="border-2 border-gray-400 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">4</div>
                      Permissions Snapshot
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="font-semibold text-gray-900 mb-2">Rajesh Kumar</p>
                        <p className="text-xs text-gray-600">Admin access to all modules</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="font-semibold text-gray-900 mb-2">Priya Singh</p>
                        <p className="text-xs text-gray-600">Finance & Reports (View, Create, Approve)</p>
                      </div>
                    </div>
                  </div>

                  {/* Confirmation Checkboxes */}
                  <div className="space-y-4 border-2 border-gray-400 rounded-lg p-6 bg-gray-50">
                    <h3 className="font-bold text-gray-900 mb-4">Confirmations Required</h3>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5"></div>
                      <label className="text-sm text-gray-700">
                        I certify that all documents are authentic and valid for the selected jurisdiction.
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5"></div>
                      <label className="text-sm text-gray-700">
                        I accept responsibility for the assigned roles and permissions.
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-4 mt-8">
                  <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 border-2 border-gray-400 text-gray-700 rounded-lg">
                      💾 Save as Draft
                    </button>
                    <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700">
                      <Check className="w-5 h-5" />
                      Submit for Verification
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Step 7: Submission States */}
          {currentStep === 6 && (
            <Card className="p-8 bg-white border-2 border-gray-300">
              <div className="max-w-3xl mx-auto text-center">
                {/* Success Banner */}
                <div className="mb-8">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Submitted for Verification ✓
                  </h2>
                  <p className="text-gray-600 text-lg mb-2">
                    Your entity onboarding application has been submitted successfully!
                  </p>
                  <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Application ID:</strong> ENT-2025-001234
                    </p>
                  </div>
                </div>

                {/* Timeline Info */}
                <Alert className="border-blue-400 bg-blue-50 mb-8 text-left">
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

                {/* What Happens Next */}
                <div className="border-2 border-gray-400 rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-bold text-gray-900 mb-4">What Happens Next?</h3>
                  <div className="space-y-3">
                    {[
                      { step: "1", text: "Document verification by our KYC team" },
                      { step: "2", text: "Ownership & key person validation" },
                      { step: "3", text: "Physical verification (if required)" },
                      { step: "4", text: "Final approval and account activation" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                          {item.step}
                        </div>
                        <p className="text-gray-700 pt-0.5">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Limited Access Info */}
                <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-6 mb-8">
                  <h3 className="font-bold text-gray-900 mb-2">Limited Dashboard Access</h3>
                  <p className="text-sm text-gray-700">
                    You have access to a limited dashboard while your verification is in progress. Full features will be unlocked once approved.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800">
                    🏠 Go to Limited Dashboard
                  </button>
                  <button className="px-8 py-4 border-2 border-gray-400 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">
                    ➕ Add Another Entity
                  </button>
                </div>

                {/* Help Text */}
                <p className="text-sm text-gray-500 mt-8">
                  Questions? Contact our support team at <strong>support@tradie.com</strong>
                </p>
              </div>
            </Card>
          )}
        </motion.div>

        {/* Navigation Helper */}
        <motion.div
          variants={itemVariants}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>Click step numbers above to navigate between screens</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Add React import for Fragment
import React from "react";
