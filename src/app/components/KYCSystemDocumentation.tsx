import { motion } from "motion/react";
import { 
  FileText, Users, Building2, Shield, CheckCircle, 
  Clock, XCircle, Award, TrendingUp, Sparkles,
  ArrowLeft, ChevronDown, ChevronRight, Info
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface KYCSystemDocumentationProps {
  onBack: () => void;
}

export function KYCSystemDocumentation({ onBack }: KYCSystemDocumentationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4FC] to-[#D9F2FF]">
      {/* Header */}
      <motion.header
        className="bg-white/80 backdrop-blur-lg border-b border-white/50 shadow-sm sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
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
              <span className="text-[#003E6D] font-bold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
                KYC System Guide
              </span>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Hero Section */}
          <Card className="p-8 bg-gradient-to-br from-white to-[#F7FAFC] border-2 border-[#003E6D]/10 shadow-xl">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-[#003E6D] mb-3" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "2.5rem" }}>
                  Complete KYC System
                </h1>
                <p className="text-[#003E6D]/70 text-lg leading-relaxed">
                  Comprehensive Know Your Customer (KYC) verification system supporting multiple user roles, 
                  entity types, and country-specific document requirements with role-based permissions and 
                  physical verification for enhanced trust.
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: "User Roles", value: "8", color: "#003E6D" },
              { icon: Building2, label: "Entity Types", value: "7", color: "#FFD700" },
              { icon: FileText, label: "Document Types", value: "20+", color: "#003E6D" },
              { icon: Award, label: "Max Key Persons", value: "30", color: "#FFD700" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="p-4 bg-white/90 backdrop-blur-sm border-2 border-[#003E6D]/10 hover:border-[#FFD700]/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                      <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold" style={{ color: stat.color, fontFamily: "Poppins, sans-serif" }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-[#003E6D]/60">{stat.label}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Documentation Sections */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-[#003E6D]/10">
            <ScrollArea className="h-[600px] pr-4">
              <Accordion type="multiple" className="space-y-4">
                
                {/* User Roles */}
                <AccordionItem value="roles" className="border-2 border-[#003E6D]/10 rounded-lg px-4 bg-gradient-to-r from-white to-[#F7FAFC]">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-[#003E6D]" />
                      <span className="font-semibold text-[#003E6D]">User Roles (8 Types)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-4">
                    {[
                      { name: "Producer", desc: "Individual farmers/producers", days: "7", type: "Basic KYC" },
                      { name: "Commission Agent", desc: "Works on behalf of producers", days: "15", type: "Entity KYC" },
                      { name: "Buyer", desc: "Purchases commodities", days: "15", type: "Entity KYC" },
                      { name: "Trader", desc: "Buys and sells commodities", days: "15", type: "Entity KYC" },
                      { name: "Storage Facilities", desc: "Warehouse/storage providers", days: "15", type: "Entity KYC + Licenses" },
                      { name: "Transport/Logistics", desc: "Transportation services", days: "15", type: "Entity KYC + Permits" },
                      { name: "Bank/Financial", desc: "Financial services", days: "15", type: "Enhanced KYC" },
                      { name: "Insurance", desc: "Insurance services", days: "15", type: "Compliance KYC" }
                    ].map((role) => (
                      <div key={role.name} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#003E6D]/10">
                        <CheckCircle className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-[#003E6D]">{role.name}</span>
                            <Badge variant="outline" className="text-xs">{role.days} days</Badge>
                          </div>
                          <p className="text-sm text-[#003E6D]/70 mb-1">{role.desc}</p>
                          <p className="text-xs text-[#FFD700]">Type: {role.type}</p>
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Entity Types */}
                <AccordionItem value="entities" className="border-2 border-[#003E6D]/10 rounded-lg px-4 bg-gradient-to-r from-white to-[#F7FAFC]">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-[#003E6D]" />
                      <span className="font-semibold text-[#003E6D]">Entity Types (7 Structures)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-4">
                    {[
                      { name: "Proprietor Firm", roles: ["Proprietor"], ownership: "100% (auto)" },
                      { name: "Partnership Firm", roles: ["Managing Partner", "Partner"], ownership: "Split among partners" },
                      { name: "LLP", roles: ["Designated Partner", "Partner"], ownership: "Shared liability" },
                      { name: "Limited Company", roles: ["Chairman", "MD", "CEO", "Director", "Treasurer"], ownership: "Board structure" },
                      { name: "Society/Association", roles: ["President", "VP", "Treasurer", "Director", "Member"], ownership: "Non-profit" },
                      { name: "Trust", roles: ["Managing Trustee", "Trustee"], ownership: "Trust governance" },
                      { name: "Other", roles: ["Custom"], ownership: "User defined" }
                    ].map((entity) => (
                      <div key={entity.name} className="p-3 bg-white rounded-lg border border-[#003E6D]/10">
                        <div className="font-semibold text-[#003E6D] mb-2">{entity.name}</div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {entity.roles.map((role) => (
                            <Badge key={role} variant="outline" className="text-xs">{role}</Badge>
                          ))}
                        </div>
                        <p className="text-xs text-[#003E6D]/60">Ownership: {entity.ownership}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Documents */}
                <AccordionItem value="documents" className="border-2 border-[#003E6D]/10 rounded-lg px-4 bg-gradient-to-r from-white to-[#F7FAFC]">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#003E6D]" />
                      <span className="font-semibold text-[#003E6D]">Document Requirements (Country-Specific)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    
                    {/* India */}
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-green-50 rounded-lg border-2 border-orange-200">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🇮🇳</span>
                        <span className="font-semibold text-[#003E6D]">India</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div><strong>Common:</strong> PAN Card ✓, GST Certificate ✓, Bank Proof ✓</div>
                        <div><strong>AP (Commission Agent/Trader):</strong> APMC License ✓, Market License ✓</div>
                        <div><strong>Maharashtra (Storage):</strong> S&E Certificate ✓, APMC ✓, 7/12 Extract ✓</div>
                        <div className="text-[#003E6D]/60"><em>Optional: Udyam Registration, Shop & Establishment</em></div>
                      </div>
                    </div>

                    {/* USA */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg border-2 border-blue-200">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🇺🇸</span>
                        <span className="font-semibold text-[#003E6D]">United States</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div><strong>Required:</strong> State Business Registration ✓, EIN ✓</div>
                        <div><strong>Optional:</strong> USDA/FSA License</div>
                      </div>
                    </div>

                    {/* Brazil */}
                    <div className="p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg border-2 border-green-200">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🇧🇷</span>
                        <span className="font-semibold text-[#003E6D]">Brazil</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div><strong>Required:</strong> CNPJ Registration ✓</div>
                        <div><strong>Optional:</strong> CAF/Agricultural Registration</div>
                      </div>
                    </div>

                    {/* Kenya */}
                    <div className="p-4 bg-gradient-to-r from-red-50 to-green-50 rounded-lg border-2 border-red-200">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🇰🇪</span>
                        <span className="font-semibold text-[#003E6D]">Kenya</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div><strong>Required:</strong> Business Permit ✓, PIN Certificate ✓</div>
                        <div><strong>Optional:</strong> NCPB/Agricultural Board Registration</div>
                      </div>
                    </div>

                    <div className="p-3 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/30">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#003E6D]/80">
                          <strong>"Others" option</strong> is always available for all countries. 
                          When selected, users must provide Document Type and Description.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* SMS Messages */}
                <AccordionItem value="sms" className="border-2 border-[#003E6D]/10 rounded-lg px-4 bg-gradient-to-r from-white to-[#F7FAFC]">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📱</span>
                      <span className="font-semibold text-[#003E6D]">SMS Messages (≤160 chars)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    
                    {/* Producer Pending */}
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-green-600">Pending - Producer (7 days)</Badge>
                        <Badge variant="outline">160/160</Badge>
                      </div>
                      <p className="text-sm text-[#003E6D] leading-relaxed bg-white p-3 rounded border border-green-300">
                        "Congratulations! You have signed up successfully. Your KYC is under review (few hours – 7 working days). Meanwhile, you can access all app features."
                      </p>
                    </div>

                    {/* Other Roles Pending */}
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-blue-600">Pending - Other Roles (15 days)</Badge>
                        <Badge variant="outline">160/160</Badge>
                      </div>
                      <p className="text-sm text-[#003E6D] leading-relaxed bg-white p-3 rounded border border-blue-300">
                        "Congratulations! You have signed up successfully. Your KYC is under review (few hours – 15 working days). Meanwhile, you can access all app features."
                      </p>
                    </div>

                    {/* Failure */}
                    <div className="p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-lg border-2 border-red-200">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-red-600">Failure - Retry</Badge>
                        <Badge variant="outline">157/160</Badge>
                      </div>
                      <p className="text-sm text-[#003E6D] leading-relaxed bg-white p-3 rounded border border-red-300">
                        "Your KYC could not be verified. Please re-submit the required documents to complete verification and continue using all features of the app."
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Physical Verification Benefits */}
                <AccordionItem value="benefits" className="border-2 border-[#003E6D]/10 rounded-lg px-4 bg-gradient-to-r from-white to-[#F7FAFC]">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-[#FFD700]" />
                      <span className="font-semibold text-[#003E6D]">Physical Verification Benefits</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-4">
                    <p className="text-sm text-[#003E6D]/80 mb-4">
                      After upgrading to a paid subscription, our team will call and visit for physical verification. 
                      This unlocks premium benefits:
                    </p>
                    {[
                      { icon: TrendingUp, title: "Priority Listing", desc: "Featured at top of search results" },
                      { icon: Award, title: "Verified Badge", desc: "Premium trust indicator badge" },
                      { icon: Shield, title: "Higher Limits", desc: "Increased transaction and credit limits" },
                      { icon: Sparkles, title: "Finance Access", desc: "Loans, credit, and insurance options" },
                      { icon: Users, title: "Dedicated Support", desc: "Priority customer service & AI assistance" }
                    ].map((benefit) => (
                      <div key={benefit.title} className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#FFD700]/10 to-white rounded-lg border border-[#FFD700]/30">
                        <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-5 h-5 text-[#003E6D]" />
                        </div>
                        <div>
                          <div className="font-semibold text-[#003E6D]">{benefit.title}</div>
                          <p className="text-sm text-[#003E6D]/60">{benefit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Permissions Matrix */}
                <AccordionItem value="permissions" className="border-2 border-[#003E6D]/10 rounded-lg px-4 bg-gradient-to-r from-white to-[#F7FAFC]">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-[#003E6D]" />
                      <span className="font-semibold text-[#003E6D]">Permissions Matrix</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <p className="text-sm text-[#003E6D]/80">
                      Granular module-level permissions for up to 30 key persons:
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {["Trades", "Wallet", "KYC", "Finance", "Reports", "Settings"].map((module) => (
                        <div key={module} className="p-3 bg-white rounded-lg border border-[#003E6D]/10">
                          <div className="font-semibold text-[#003E6D] mb-2">{module}</div>
                          <div className="flex flex-wrap gap-1">
                            {(module === "Reports" || module === "Settings" 
                              ? ["View", "Admin"] 
                              : ["View", "Create", "Approve", "Admin"]
                            ).map((perm) => (
                              <Badge key={perm} variant="outline" className="text-xs">{perm}</Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-[#003E6D]">Quick Presets:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { name: "Admin", desc: "Full access to all modules" },
                          { name: "Operations", desc: "Trades create + view others" },
                          { name: "Finance", desc: "Wallet & finance management" },
                          { name: "Auditor", desc: "Read-only access everywhere" }
                        ].map((preset) => (
                          <div key={preset.name} className="p-2 bg-gradient-to-br from-[#FFD700]/10 to-white rounded border border-[#FFD700]/30">
                            <div className="font-semibold text-[#003E6D] text-sm">{preset.name}</div>
                            <p className="text-xs text-[#003E6D]/60">{preset.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </ScrollArea>
          </Card>

          {/* Footer CTA */}
          <Card className="p-6 bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 border-2 border-[#FFD700]/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#003E6D] font-semibold text-lg mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                  ✅ Fully Implemented & Ready
                </h3>
                <p className="text-[#003E6D]/70 text-sm">
                  All screens, flows, validations, and messaging are complete and production-ready!
                </p>
              </div>
              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-[#003E6D] to-[#005A9C] hover:from-[#005A9C] hover:to-[#003E6D] text-white"
              >
                Try Demo
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>

        </motion.div>
      </main>
    </div>
  );
}
