import { motion } from "motion/react";
import { 
  ArrowRight, ArrowLeft, ChevronDown, Upload, Plus, Trash2, 
  Check, Info, AlertCircle, X, FileText, Users, 
  Shield, CheckCircle2, Phone, Mail, Building2
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

export function EntityKYCWireframeLowFi() {
  const frameWidth = "390px";
  const frameHeight = "844px";

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#333] mb-2">
            Other-Role KYC & Entity Onboarding (Lo-Fi)
          </h1>
          <p className="text-[#666]">Low-fidelity wireframe flow • 390×844px frames</p>
        </div>

        {/* Flow Container */}
        <div className="space-y-12">
          
          {/* Frame 1: Role Entry (Non-Producer) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div 
              className="bg-white border-4 border-[#333] rounded-lg shadow-xl overflow-hidden"
              style={{ width: frameWidth, height: frameHeight }}
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="bg-[#E0E0E0] border-b-2 border-[#333] p-4">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 border-2 border-[#333] rounded flex items-center justify-center">
                      <ArrowLeft className="w-5 h-5 text-[#333]" />
                    </div>
                    <div className="text-center flex-1">
                      <div className="font-bold text-[#333]">TRADIE</div>
                      <div className="text-xs text-[#666]">Step 1/7</div>
                    </div>
                    <div className="w-8"></div>
                  </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    <div>
                      <div className="font-bold text-lg text-[#333] mb-1">Choose Your Role(s)</div>
                      <div className="text-sm text-[#666]">Select all that apply</div>
                    </div>

                    <Separator className="bg-[#333]" />

                    {/* Role Chips */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Commission Agent",
                        "Buyer",
                        "Trader",
                        "Logistics/Transport",
                        "Storage Facility",
                        "Insurance",
                        "Bank/Financial Inst.",
                        "Regulatory Authority"
                      ].map((role, idx) => (
                        <div
                          key={role}
                          className={`border-2 border-[#333] rounded-lg p-3 text-center text-sm ${
                            idx === 0 || idx === 2 ? "bg-[#D0D0D0]" : "bg-white"
                          }`}
                        >
                          <div className="font-semibold text-[#333]">{role}</div>
                        </div>
                      ))}
                    </div>

                    {/* Selected Roles */}
                    <div className="border-2 border-dashed border-[#666] rounded-lg p-3 bg-[#F9F9F9]">
                      <div className="text-xs text-[#666] mb-2">Selected:</div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-[#333] text-[#333]">
                          Commission Agent
                        </Badge>
                        <Badge variant="outline" className="border-[#333] text-[#333]">
                          Trader
                        </Badge>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="border-t-2 border-[#333] bg-[#E0E0E0] p-4">
                  <div className="border-2 border-[#333] bg-white rounded-lg py-3 text-center font-bold text-[#333]">
                    CONTINUE TO ENTITY DETAILS →
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[#666]">
              <ArrowRight className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Frame 2: Entity Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <div 
              className="bg-white border-4 border-[#333] rounded-lg shadow-xl overflow-hidden"
              style={{ width: frameWidth, height: frameHeight }}
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="bg-[#E0E0E0] border-b-2 border-[#333] p-4">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 border-2 border-[#333] rounded flex items-center justify-center">
                      <ArrowLeft className="w-5 h-5 text-[#333]" />
                    </div>
                    <div className="text-center flex-1">
                      <div className="font-bold text-[#333]">Entity Details</div>
                      <div className="text-xs text-[#666]">Step 2/7</div>
                    </div>
                    <div className="w-8"></div>
                  </div>
                  <div className="mt-2 bg-[#333] h-1 rounded-full">
                    <div className="bg-white h-full w-[29%] rounded-full"></div>
                  </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {/* Entity Name */}
                    <div>
                      <div className="text-xs font-semibold text-[#666] mb-1">ENTITY NAME *</div>
                      <div className="border-2 border-[#333] rounded p-2 bg-white">
                        <div className="text-sm text-[#999]">ABC Trading Company</div>
                      </div>
                    </div>

                    {/* Country & State */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs font-semibold text-[#666] mb-1">COUNTRY *</div>
                        <div className="border-2 border-[#333] rounded p-2 bg-white flex items-center justify-between">
                          <div className="text-sm text-[#333]">🇮🇳 India</div>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#666] mb-1">STATE *</div>
                        <div className="border-2 border-[#333] rounded p-2 bg-white flex items-center justify-between">
                          <div className="text-sm text-[#999]">Select...</div>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <div className="text-xs font-semibold text-[#666] mb-1">REGISTERED ADDRESS *</div>
                      <div className="border-2 border-[#333] rounded p-2 bg-white h-16">
                        <div className="text-sm text-[#999]">123 Market Street...</div>
                      </div>
                    </div>

                    {/* Entity Type & Category */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs font-semibold text-[#666] mb-1">ENTITY TYPE *</div>
                        <div className="border-2 border-[#333] rounded p-2 bg-white flex items-center justify-between">
                          <div className="text-sm text-[#999]">Select...</div>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#666] mb-1">CATEGORY *</div>
                        <div className="border-2 border-[#333] rounded p-2 bg-white flex items-center justify-between">
                          <div className="text-sm text-[#999]">MSME</div>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* PAN & Udyam */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs font-semibold text-[#666] mb-1">PAN *</div>
                        <div className="border-2 border-[#333] rounded p-2 bg-white">
                          <div className="text-sm text-[#999]">ABCDE1234F</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#666] mb-1">UDYAM (Optional)</div>
                        <div className="border-2 border-[#333] rounded p-2 bg-white">
                          <div className="text-sm text-[#999]">UDYAM-XX...</div>
                        </div>
                      </div>
                    </div>

                    {/* Area of Operation */}
                    <div>
                      <div className="text-xs font-semibold text-[#666] mb-1">AREA OF OPERATION *</div>
                      <div className="flex gap-2">
                        {["Local", "Inter-State", "International"].map((area) => (
                          <div key={area} className="flex-1 border-2 border-[#333] rounded p-2 bg-[#D0D0D0] text-center">
                            <div className="text-xs font-semibold">{area}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* License Info */}
                    <div className="border-2 border-dashed border-[#666] rounded p-3 bg-[#F9F9F9]">
                      <div className="text-xs font-semibold text-[#666] mb-2">LICENSE DETAILS (Optional)</div>
                      <div className="space-y-2">
                        <div className="border border-[#666] rounded p-2 bg-white">
                          <div className="text-xs text-[#999]">Issuing Authority</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="border border-[#666] rounded p-2 bg-white">
                            <div className="text-xs text-[#999]">License No.</div>
                          </div>
                          <div className="border border-[#666] rounded p-2 bg-white">
                            <div className="text-xs text-[#999]">Date</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="border-t-2 border-[#333] bg-[#E0E0E0] p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 border-2 border-[#333] bg-white rounded py-2 text-center text-sm font-bold text-[#333]">
                      ← BACK
                    </div>
                    <div className="flex-1 border-2 border-[#333] bg-[#D0D0D0] rounded py-2 text-center text-sm font-bold text-[#333]">
                      NEXT →
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[#666]">
              <ArrowRight className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Frame 3: Regulatory Documents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div 
              className="bg-white border-4 border-[#333] rounded-lg shadow-xl overflow-hidden"
              style={{ width: frameWidth, height: frameHeight }}
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="bg-[#E0E0E0] border-b-2 border-[#333] p-4">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 border-2 border-[#333] rounded flex items-center justify-center">
                      <ArrowLeft className="w-5 h-5 text-[#333]" />
                    </div>
                    <div className="text-center flex-1">
                      <div className="font-bold text-[#333]">Regulatory Documents</div>
                      <div className="text-xs text-[#666]">Step 3/7 • India/AP Commission Agent</div>
                    </div>
                    <div className="w-8"></div>
                  </div>
                  <div className="mt-2 bg-[#333] h-1 rounded-full">
                    <div className="bg-white h-full w-[43%] rounded-full"></div>
                  </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    <div className="border-2 border-[#666] rounded p-2 bg-[#F0F0F0]">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-[#666] mt-0.5" />
                        <div className="text-xs text-[#666]">
                          Upload required documents for India/Andhra Pradesh Commission Agent
                        </div>
                      </div>
                    </div>

                    {/* Document Upload Items */}
                    {[
                      { name: "APMC/Market License", required: true, uploaded: true },
                      { name: "GST Certificate", required: true, uploaded: true },
                      { name: "PAN Card", required: true, uploaded: false },
                      { name: "Shop & Establishment", required: true, uploaded: false },
                      { name: "Bank Account Proof", required: true, uploaded: false },
                      { name: "Others", required: false, uploaded: false }
                    ].map((doc) => (
                      <div key={doc.name} className="border-2 border-[#333] rounded p-3 bg-white">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#666]" />
                            <div>
                              <div className="text-sm font-semibold text-[#333]">
                                {doc.name} {doc.required && "*"}
                              </div>
                              {doc.uploaded && (
                                <div className="text-xs text-[#666] mt-1">document.pdf (2.3 MB)</div>
                              )}
                            </div>
                          </div>
                          {doc.uploaded ? (
                            <CheckCircle2 className="w-5 h-5 text-[#333]" />
                          ) : (
                            <Upload className="w-5 h-5 text-[#666]" />
                          )}
                        </div>
                        {doc.name === "Others" && (
                          <div className="border border-[#666] rounded p-2 bg-[#F9F9F9] mt-2">
                            <div className="text-xs text-[#999]">Document Type & Description...</div>
                          </div>
                        )}
                        {!doc.uploaded && (
                          <div className="border-2 border-dashed border-[#999] rounded p-2 mt-2 text-center">
                            <div className="text-xs text-[#999]">Click to upload (PDF/JPG/PNG, max 5MB)</div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Upload Summary */}
                    <div className="border-2 border-[#666] rounded p-3 bg-[#F9F9F9]">
                      <div className="text-xs font-semibold text-[#666] mb-1">Upload Status:</div>
                      <div className="text-sm text-[#333]">2 of 5 required documents uploaded</div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="border-t-2 border-[#333] bg-[#E0E0E0] p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 border-2 border-[#333] bg-white rounded py-2 text-center text-sm font-bold text-[#333]">
                      ← BACK
                    </div>
                    <div className="flex-1 border-2 border-[#333] bg-[#999] rounded py-2 text-center text-sm font-bold text-white">
                      NEXT →
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[#666]">
              <ArrowRight className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Frame 4: Ownership & Key Persons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div 
              className="bg-white border-4 border-[#333] rounded-lg shadow-xl overflow-hidden"
              style={{ width: frameWidth, height: frameHeight }}
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="bg-[#E0E0E0] border-b-2 border-[#333] p-4">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 border-2 border-[#333] rounded flex items-center justify-center">
                      <ArrowLeft className="w-5 h-5 text-[#333]" />
                    </div>
                    <div className="text-center flex-1">
                      <div className="font-bold text-[#333]">Ownership & Key Persons</div>
                      <div className="text-xs text-[#666]">Step 4/7 • Max 30 persons</div>
                    </div>
                    <div className="w-8"></div>
                  </div>
                  <div className="mt-2 bg-[#333] h-1 rounded-full">
                    <div className="bg-white h-full w-[57%] rounded-full"></div>
                  </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {/* Ownership Validation */}
                    <div className="border-2 border-[#666] rounded p-3 bg-[#F0F0F0]">
                      <div className="text-xs text-[#666] mb-1">Total Ownership:</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#333] h-2 rounded-full">
                          <div className="bg-white h-full w-[70%] rounded-full"></div>
                        </div>
                        <div className="text-sm font-bold text-[#666]">70%</div>
                      </div>
                      <div className="text-xs text-[#999] mt-1">Must equal 100% to proceed</div>
                    </div>

                    {/* Person 1 */}
                    <div className="border-2 border-[#333] rounded p-3 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-[#666]" />
                          <div className="font-semibold text-[#333]">Person 1</div>
                        </div>
                        <Badge variant="outline" className="border-[#333] text-[#333] text-xs">
                          Admin
                        </Badge>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-[#666] mb-1">Full Name</div>
                            <div className="border border-[#666] rounded p-1 bg-[#F9F9F9]">Rajesh Kumar</div>
                          </div>
                          <div>
                            <div className="text-[#666] mb-1">Designation</div>
                            <div className="border border-[#666] rounded p-1 bg-[#F9F9F9]">Managing Partner</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-[#666] mb-1">Email</div>
                            <div className="border border-[#666] rounded p-1 bg-[#F9F9F9]">rajesh@abc.com</div>
                          </div>
                          <div>
                            <div className="text-[#666] mb-1">Mobile</div>
                            <div className="border border-[#666] rounded p-1 bg-[#F9F9F9]">+91 98765...</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-[#666] mb-1">Govt ID</div>
                            <div className="border border-[#666] rounded p-1 bg-[#F9F9F9]">ABCDE1234F</div>
                          </div>
                          <div>
                            <div className="text-[#666] mb-1">Ownership %</div>
                            <div className="border border-[#666] rounded p-1 bg-[#F9F9F9]">50%</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 pt-1">
                          <Badge variant="outline" className="text-xs border-[#666]">Admin</Badge>
                          <Badge variant="outline" className="text-xs border-[#666]">Operations</Badge>
                          <Badge variant="outline" className="text-xs border-[#666]">Trades</Badge>
                          <Badge variant="outline" className="text-xs border-[#666]">Finance</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Person 2 */}
                    <div className="border-2 border-[#333] rounded p-3 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-[#666]" />
                          <div className="font-semibold text-[#333]">Person 2</div>
                        </div>
                        <Trash2 className="w-4 h-4 text-[#666]" />
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-[#666] mb-1">Full Name</div>
                            <div className="border border-[#666] rounded p-1 bg-[#F9F9F9]">Priya Sharma</div>
                          </div>
                          <div>
                            <div className="text-[#666] mb-1">Designation</div>
                            <div className="border border-[#666] rounded p-1 bg-[#F9F9F9]">Partner</div>
                          </div>
                        </div>
                        <div className="text-[#666]">Email • Mobile • Govt ID • Ownership: 20%</div>
                        <div className="flex flex-wrap gap-1 pt-1">
                          <Badge variant="outline" className="text-xs border-[#666]">Operations</Badge>
                          <Badge variant="outline" className="text-xs border-[#666]">Reports</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Add Person Button */}
                    <div className="border-2 border-dashed border-[#666] rounded p-3 text-center bg-[#F9F9F9]">
                      <Plus className="w-5 h-5 text-[#666] mx-auto mb-1" />
                      <div className="text-sm font-semibold text-[#666]">Add Person (2/30)</div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="border-t-2 border-[#333] bg-[#E0E0E0] p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 border-2 border-[#333] bg-white rounded py-2 text-center text-sm font-bold text-[#333]">
                      ← BACK
                    </div>
                    <div className="flex-1 border-2 border-[#333] bg-[#999] rounded py-2 text-center text-sm font-bold text-white">
                      NEXT →
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[#666]">
              <ArrowRight className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Frame 5: Permissions Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div 
              className="bg-white border-4 border-[#333] rounded-lg shadow-xl overflow-hidden"
              style={{ width: frameWidth, height: frameHeight }}
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="bg-[#E0E0E0] border-b-2 border-[#333] p-4">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 border-2 border-[#333] rounded flex items-center justify-center">
                      <ArrowLeft className="w-5 h-5 text-[#333]" />
                    </div>
                    <div className="text-center flex-1">
                      <div className="font-bold text-[#333]">Permissions Matrix</div>
                      <div className="text-xs text-[#666]">Step 5/7</div>
                    </div>
                    <div className="w-8"></div>
                  </div>
                  <div className="mt-2 bg-[#333] h-1 rounded-full">
                    <div className="bg-white h-full w-[71%] rounded-full"></div>
                  </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {/* Quick Presets */}
                    <div>
                      <div className="text-xs font-semibold text-[#666] mb-2">QUICK PRESETS:</div>
                      <div className="grid grid-cols-4 gap-1">
                        {["Admin", "Ops", "Finance", "Auditor"].map((preset) => (
                          <div key={preset} className="border border-[#666] rounded p-1 text-center text-xs bg-white">
                            {preset}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-[#666]" />

                    {/* Permissions Table */}
                    <div className="text-xs font-semibold text-[#666] mb-2">MODULE PERMISSIONS:</div>
                    
                    {/* Person 1 - Rajesh */}
                    <div className="border-2 border-[#333] rounded p-2 bg-white">
                      <div className="font-semibold text-[#333] mb-2 flex items-center justify-between">
                        <span>Rajesh Kumar</span>
                        <Badge variant="outline" className="text-xs border-[#666]">Admin Preset</Badge>
                      </div>
                      <div className="space-y-1">
                        {[
                          { module: "Trades", perms: ["V", "C", "A", "★"] },
                          { module: "Wallet", perms: ["V", "C", "A", "★"] },
                          { module: "KYC", perms: ["V", "C", "A", "★"] },
                          { module: "Finance", perms: ["V", "C", "A", "★"] },
                          { module: "Reports", perms: ["V", "—", "—", "★"] },
                          { module: "Settings", perms: ["V", "—", "—", "★"] }
                        ].map((row) => (
                          <div key={row.module} className="flex items-center gap-1 text-xs">
                            <div className="w-16 text-[#666]">{row.module}</div>
                            <div className="flex gap-1 flex-1">
                              {row.perms.map((p, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 text-center border rounded ${
                                    p !== "—" ? "border-[#333] bg-[#D0D0D0]" : "border-[#999] bg-white"
                                  }`}
                                >
                                  {p}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-[#999] mt-2">V=View • C=Create • A=Approve • ★=Admin</div>
                    </div>

                    {/* Person 2 - Priya */}
                    <div className="border-2 border-[#333] rounded p-2 bg-white">
                      <div className="font-semibold text-[#333] mb-2 flex items-center justify-between">
                        <span>Priya Sharma</span>
                        <Badge variant="outline" className="text-xs border-[#666]">Ops Preset</Badge>
                      </div>
                      <div className="space-y-1">
                        {[
                          { module: "Trades", perms: ["V", "C", "—", "—"] },
                          { module: "Wallet", perms: ["V", "—", "—", "—"] },
                          { module: "KYC", perms: ["V", "—", "—", "—"] },
                          { module: "Finance", perms: ["V", "—", "—", "—"] },
                          { module: "Reports", perms: ["V", "—", "—", "—"] },
                          { module: "Settings", perms: ["—", "—", "—", "—"] }
                        ].map((row) => (
                          <div key={row.module} className="flex items-center gap-1 text-xs">
                            <div className="w-16 text-[#666]">{row.module}</div>
                            <div className="flex gap-1 flex-1">
                              {row.perms.map((p, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 text-center border rounded ${
                                    p !== "—" ? "border-[#333] bg-[#D0D0D0]" : "border-[#999] bg-white"
                                  }`}
                                >
                                  {p}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="border-t-2 border-[#333] bg-[#E0E0E0] p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 border-2 border-[#333] bg-white rounded py-2 text-center text-sm font-bold text-[#333]">
                      ← BACK
                    </div>
                    <div className="flex-1 border-2 border-[#333] bg-[#D0D0D0] rounded py-2 text-center text-sm font-bold text-[#333]">
                      NEXT →
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[#666]">
              <ArrowRight className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Frame 6: Review & Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <div 
              className="bg-white border-4 border-[#333] rounded-lg shadow-xl overflow-hidden"
              style={{ width: frameWidth, height: frameHeight }}
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="bg-[#E0E0E0] border-b-2 border-[#333] p-4">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 border-2 border-[#333] rounded flex items-center justify-center">
                      <ArrowLeft className="w-5 h-5 text-[#333]" />
                    </div>
                    <div className="text-center flex-1">
                      <div className="font-bold text-[#333]">Review & Submit</div>
                      <div className="text-xs text-[#666]">Step 6/7</div>
                    </div>
                    <div className="w-8"></div>
                  </div>
                  <div className="mt-2 bg-[#333] h-1 rounded-full">
                    <div className="bg-white h-full w-[86%] rounded-full"></div>
                  </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {/* Entity Summary */}
                    <div className="border-2 border-[#333] rounded p-3 bg-[#F0F0F0]">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-[#666]" />
                        <div className="font-bold text-[#333]">ENTITY DETAILS</div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#666]">Name:</span>
                          <span className="text-[#333] font-semibold">ABC Trading Company</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#666]">Type:</span>
                          <span className="text-[#333]">Partnership</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#666]">Location:</span>
                          <span className="text-[#333]">Andhra Pradesh, India</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#666]">Category:</span>
                          <span className="text-[#333]">MSME</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#666]">PAN:</span>
                          <span className="text-[#333]">ABCDE1234F</span>
                        </div>
                      </div>
                    </div>

                    {/* Documents Summary */}
                    <div className="border-2 border-[#333] rounded p-3 bg-white">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-[#666]" />
                        <div className="font-bold text-[#333]">DOCUMENTS (5/5)</div>
                      </div>
                      <div className="space-y-1 text-xs">
                        {["APMC License", "GST Certificate", "PAN Card", "S&E Certificate", "Bank Proof"].map((doc) => (
                          <div key={doc} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-[#333]" />
                            <span className="text-[#666]">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ownership Summary */}
                    <div className="border-2 border-[#333] rounded p-3 bg-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-[#666]" />
                        <div className="font-bold text-[#333]">KEY PERSONS (2)</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs bg-[#F9F9F9] p-2 rounded">
                          <div>
                            <div className="font-semibold text-[#333]">Rajesh Kumar</div>
                            <div className="text-[#666]">Managing Partner</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-[#333]">50%</div>
                            <Badge variant="outline" className="text-xs border-[#666] mt-1">Admin</Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs bg-[#F9F9F9] p-2 rounded">
                          <div>
                            <div className="font-semibold text-[#333]">Priya Sharma</div>
                            <div className="text-[#666]">Partner</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-[#333]">50%</div>
                            <div className="text-[#666] text-xs mt-1">Ops</div>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-[#666] mt-2 pt-2 text-xs">
                        <div className="flex justify-between font-semibold">
                          <span className="text-[#666]">Total Ownership:</span>
                          <span className="text-[#333]">100% ✓</span>
                        </div>
                      </div>
                    </div>

                    {/* Confirmations */}
                    <div className="border-2 border-[#333] rounded p-3 bg-[#F9F9F9]">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-4 h-4 border-2 border-[#333] rounded bg-[#D0D0D0] flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-[#333]" />
                          </div>
                          <div className="text-xs text-[#666]">I confirm that all uploaded documents are authentic and accurate</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-4 h-4 border-2 border-[#333] rounded bg-[#D0D0D0] flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-[#333]" />
                          </div>
                          <div className="text-xs text-[#666]">I accept full responsibility for the roles and permissions assigned to team members</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="border-t-2 border-[#333] bg-[#E0E0E0] p-4">
                  <div className="space-y-2">
                    <div className="border-2 border-[#333] bg-[#D0D0D0] rounded py-3 text-center font-bold text-[#333]">
                      SUBMIT FOR VERIFICATION
                    </div>
                    <div className="border-2 border-[#666] bg-white rounded py-2 text-center text-sm text-[#666]">
                      Save Draft
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[#666]">
              <ArrowRight className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Frame 7: KYC Status Screens (3 variants) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 7a: Pending - Producer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <div 
                className="bg-white border-4 border-[#333] rounded-lg shadow-xl overflow-hidden"
                style={{ width: frameWidth, height: frameHeight }}
              >
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="bg-[#E0E0E0] border-b-2 border-[#333] p-4">
                    <div className="text-center">
                      <div className="font-bold text-[#333]">TRADIE</div>
                      <div className="text-xs text-[#666]">KYC Status</div>
                    </div>
                  </div>

                  {/* Content */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {/* Status Icon */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border-4 border-[#333] bg-[#D0D0D0] flex items-center justify-center mb-2">
                          <div className="text-2xl">⏱️</div>
                        </div>
                        <div className="font-bold text-lg text-[#333]">Under Review</div>
                        <div className="text-sm text-[#666] text-center">Producer (7-day review)</div>
                      </div>

                      {/* SMS Box */}
                      <div className="border-2 border-[#333] rounded p-3 bg-[#F9F9F9]">
                        <div className="flex items-start gap-2 mb-2">
                          <Phone className="w-4 h-4 text-[#666] mt-0.5" />
                          <div className="text-xs font-semibold text-[#666]">SMS SENT (160 chars)</div>
                        </div>
                        <div className="text-xs text-[#333] leading-relaxed">
                          "Congratulations! You have signed up successfully. Your KYC is under review (few hours – 7 working days). Meanwhile, you can access all app features."
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="border-2 border-[#333] rounded p-3 bg-white">
                        <div className="text-xs font-semibold text-[#666] mb-2">Review Timeline:</div>
                        <div className="bg-[#333] h-2 rounded-full mb-1">
                          <div className="bg-[#D0D0D0] h-full w-[20%] rounded-full"></div>
                        </div>
                        <div className="text-xs text-[#666]">Few hours – 7 working days</div>
                      </div>

                      {/* What You Can Do */}
                      <div className="border-2 border-dashed border-[#666] rounded p-3 bg-[#F9F9F9]">
                        <div className="text-xs font-semibold text-[#666] mb-2">Meanwhile, you can:</div>
                        <div className="space-y-1 text-xs text-[#666]">
                          <div className="flex items-center gap-2">
                            <Check className="w-3 h-3" />
                            <span>Browse commodities</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-3 h-3" />
                            <span>Explore buyers/suppliers</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-3 h-3" />
                            <span>Set up your profile</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>

                  {/* Footer */}
                  <div className="border-t-2 border-[#333] bg-[#E0E0E0] p-4">
                    <div className="border-2 border-[#333] bg-[#D0D0D0] rounded py-3 text-center font-bold text-[#333]">
                      GO TO DASHBOARD
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs font-semibold text-[#666]">Status: Pending (Producer)</div>
            </motion.div>

            {/* 7b: Pending - Other Roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col items-center"
            >
              <div 
                className="bg-white border-4 border-[#333] rounded-lg shadow-xl overflow-hidden"
                style={{ width: frameWidth, height: frameHeight }}
              >
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="bg-[#E0E0E0] border-b-2 border-[#333] p-4">
                    <div className="text-center">
                      <div className="font-bold text-[#333]">TRADIE</div>
                      <div className="text-xs text-[#666]">KYC Status</div>
                    </div>
                  </div>

                  {/* Content */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-3">
                      {/* Status Icon */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border-4 border-[#333] bg-[#D0D0D0] flex items-center justify-center mb-2">
                          <div className="text-2xl">⏱️</div>
                        </div>
                        <div className="font-bold text-lg text-[#333]">Under Review</div>
                        <div className="text-sm text-[#666] text-center">Other Roles (15-day review)</div>
                      </div>

                      {/* SMS Box */}
                      <div className="border-2 border-[#333] rounded p-3 bg-[#F9F9F9]">
                        <div className="flex items-start gap-2 mb-2">
                          <Phone className="w-4 h-4 text-[#666] mt-0.5" />
                          <div className="text-xs font-semibold text-[#666]">SMS SENT (160 chars)</div>
                        </div>
                        <div className="text-xs text-[#333] leading-relaxed">
                          "Congratulations! You have signed up successfully. Your KYC is under review (few hours – 15 working days). Meanwhile, you can access all app features."
                        </div>
                      </div>

                      {/* Physical Verification Benefits */}
                      <div className="border-2 border-[#666] rounded p-3 bg-[#F0F0F0]">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-[#666]" />
                          <div className="text-xs font-semibold text-[#666]">PHYSICAL VERIFICATION BENEFITS:</div>
                        </div>
                        <div className="text-xs text-[#666] space-y-1">
                          <div>After paid subscription upgrade:</div>
                          <div className="grid grid-cols-2 gap-1 mt-1">
                            <div className="flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>Priority listing</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>Verified badge</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>Higher limits</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>Finance access</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>Logistics/Insurance</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              <span>Dedicated support</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="border-2 border-[#333] rounded p-2 bg-white">
                        <div className="text-xs font-semibold text-[#666] mb-1">Review Timeline:</div>
                        <div className="bg-[#333] h-2 rounded-full mb-1">
                          <div className="bg-[#D0D0D0] h-full w-[15%] rounded-full"></div>
                        </div>
                        <div className="text-xs text-[#666]">Few hours – 15 working days</div>
                      </div>
                    </div>
                  </ScrollArea>

                  {/* Footer */}
                  <div className="border-t-2 border-[#333] bg-[#E0E0E0] p-4">
                    <div className="border-2 border-[#333] bg-[#D0D0D0] rounded py-3 text-center font-bold text-[#333]">
                      GO TO DASHBOARD
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs font-semibold text-[#666]">Status: Pending (Other Roles)</div>
            </motion.div>

            {/* 7c: Failure - Retry */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center"
            >
              <div 
                className="bg-white border-4 border-[#333] rounded-lg shadow-xl overflow-hidden"
                style={{ width: frameWidth, height: frameHeight }}
              >
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="bg-[#E0E0E0] border-b-2 border-[#333] p-4">
                    <div className="text-center">
                      <div className="font-bold text-[#333]">TRADIE</div>
                      <div className="text-xs text-[#666]">KYC Status</div>
                    </div>
                  </div>

                  {/* Content */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {/* Status Icon */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border-4 border-[#333] bg-[#999] flex items-center justify-center mb-2">
                          <X className="w-10 h-10 text-white" />
                        </div>
                        <div className="font-bold text-lg text-[#333]">Verification Failed</div>
                        <div className="text-sm text-[#666] text-center">Action required</div>
                      </div>

                      {/* SMS Box */}
                      <div className="border-2 border-[#333] rounded p-3 bg-[#F9F9F9]">
                        <div className="flex items-start gap-2 mb-2">
                          <Phone className="w-4 h-4 text-[#666] mt-0.5" />
                          <div className="text-xs font-semibold text-[#666]">SMS SENT (160 chars)</div>
                        </div>
                        <div className="text-xs text-[#333] leading-relaxed">
                          "Your KYC could not be verified. Please re-submit the required documents to complete verification and continue using all features of the app."
                        </div>
                      </div>

                      {/* Limited Access Notice */}
                      <div className="border-2 border-[#666] rounded p-3 bg-[#F0F0F0]">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-[#666] mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-[#666] mb-1">LIMITED ACCESS MODE</div>
                            <div className="text-xs text-[#666]">
                              Your account is in limited access mode. Re-submit KYC documents to unlock all features.
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reasons */}
                      <div className="border-2 border-[#333] rounded p-3 bg-white">
                        <div className="text-xs font-semibold text-[#666] mb-2">Verification Issues:</div>
                        <div className="space-y-1 text-xs text-[#666]">
                          <div className="flex items-start gap-2">
                            <X className="w-3 h-3 mt-0.5" />
                            <span>Documents unclear/invalid</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <X className="w-3 h-3 mt-0.5" />
                            <span>Information mismatch</span>
                          </div>
                        </div>
                      </div>

                      {/* Support */}
                      <div className="border-2 border-dashed border-[#666] rounded p-2 bg-[#F9F9F9]">
                        <div className="text-xs text-[#666] space-y-1">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            <span>1800-XXX-XXXX</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            <span>support@tradie.app</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>

                  {/* Footer */}
                  <div className="border-t-2 border-[#333] bg-[#E0E0E0] p-4">
                    <div className="space-y-2">
                      <div className="border-2 border-[#333] bg-[#D0D0D0] rounded py-2 text-center font-bold text-sm text-[#333]">
                        RE-SUBMIT KYC
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="border-2 border-[#666] bg-white rounded py-2 text-center text-xs text-[#666]">
                          Limited Dashboard
                        </div>
                        <div className="border-2 border-[#666] bg-white rounded py-2 text-center text-xs text-[#666]">
                          Contact Support
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs font-semibold text-[#666]">Status: Failed (Retry)</div>
            </motion.div>
          </div>

          {/* Legend */}
          <div className="mt-12 border-2 border-[#666] rounded-lg p-6 bg-white max-w-3xl mx-auto">
            <h3 className="font-bold text-lg text-[#333] mb-4">Wireframe Key</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#666]">
              <div>
                <div className="font-semibold text-[#333] mb-2">Visual Elements:</div>
                <ul className="space-y-1">
                  <li>• Frame size: 390×844px (mobile)</li>
                  <li>• Grayscale palette (no colors)</li>
                  <li>• Border-based layouts</li>
                  <li>• Simple icons and checkmarks</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-[#333] mb-2">Flow Structure:</div>
                <ul className="space-y-1">
                  <li>• 7 main screens + 3 status variants</li>
                  <li>• Back buttons on all screens</li>
                  <li>• Progress indicators (2-6)</li>
                  <li>• Arrow connectors between frames</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
