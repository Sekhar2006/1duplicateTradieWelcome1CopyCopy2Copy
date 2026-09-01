import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Package,
  Award,
  Sparkles,
  ArrowRight,
  Check,
  Plus,
  X,
  QrCode,
  Eye,
  Edit,
  Save,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  FileText,
  Camera,
  MapPin,
  Calendar,
  User,
  Shield,
  Bot,
  Layers,
  Hash,
  Info,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription } from "../ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const { colors, typography, spacing } = designTokens;

interface CreateLotWorkflowProps {
  onClose?: () => void;
  productionData?: any; // From post-requirement or crop lifecycle
}

interface Lot {
  id: string;
  lotNumber: string;
  grade: string;
  quantity: number;
  unit: string;
  qualityScore: number;
  tokenId?: string;
  status: "pending" | "graded" | "tokenized";
  gradingDetails?: GradingDetails;
  aiInsights?: AIInsights;
  verifications?: Verification[];
}

interface GradingDetails {
  moisture: number;
  purity: number;
  foreignMatter: number;
  brokenGrains: number;
  finalGrade: string;
  gradedBy: string;
  gradedAt: Date;
  certificate?: string;
}

interface AIInsights {
  qualityPrediction: string;
  marketValue: string;
  improvements: string[];
  riskFactors: string[];
  recommendations: string[];
}

interface Verification {
  id: string;
  type: "quality" | "certification" | "transport" | "storage";
  verifiedBy: string;
  verifiedAt: Date;
  status: "verified" | "pending" | "rejected";
  certificate: string;
  notes: string;
}

const gradeOptions = [
  { value: "A+", label: "A+ Grade (Premium)", color: "#10B981", score: 95 },
  { value: "A", label: "A Grade (Excellent)", color: "#22C55E", score: 85 },
  { value: "B+", label: "B+ Grade (Good)", color: "#84CC16", score: 75 },
  { value: "B", label: "B Grade (Average)", color: "#EAB308", score: 65 },
  { value: "C", label: "C Grade (Below Average)", color: "#F59E0B", score: 50 },
];

export function CreateLotWorkflow({ onClose, productionData }: CreateLotWorkflowProps) {
  const [currentStep, setCurrentStep] = useState<"create" | "grade" | "tokenize" | "verify" | "view">("create");
  const [lots, setLots] = useState<Lot[]>([]);
  const [mainProductionId, setMainProductionId] = useState(`PROD-${Date.now()}`);
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);

  // Form states for creating lot
  const [lotForm, setLotForm] = useState({
    quantity: "",
    unit: "quintals",
    description: "",
  });

  // Form states for grading
  const [gradingForm, setGradingForm] = useState({
    moisture: "",
    purity: "",
    foreignMatter: "",
    brokenGrains: "",
    gradedBy: "Quality Inspector",
  });

  // Create new lot
  const handleCreateLot = () => {
    if (!lotForm.quantity) return;

    const newLot: Lot = {
      id: `LOT-${Date.now()}`,
      lotNumber: `${mainProductionId}-L${lots.length + 1}`,
      grade: "Pending",
      quantity: parseFloat(lotForm.quantity),
      unit: lotForm.unit,
      qualityScore: 0,
      status: "pending",
    };

    setLots([...lots, newLot]);
    setLotForm({ quantity: "", unit: "quintals", description: "" });
  };

  // Grade a lot
  const handleGradeLot = (lot: Lot) => {
    const { moisture, purity, foreignMatter, brokenGrains } = gradingForm;

    // Calculate quality score
    const qualityScore =
      (100 - parseFloat(moisture) * 2) * 0.3 +
      parseFloat(purity) * 0.4 +
      (100 - parseFloat(foreignMatter) * 5) * 0.2 +
      (100 - parseFloat(brokenGrains) * 3) * 0.1;

    // Determine grade
    const grade = gradeOptions.find((g) => qualityScore >= g.score) || gradeOptions[gradeOptions.length - 1];

    const gradedLot: Lot = {
      ...lot,
      grade: grade.value,
      qualityScore: Math.round(qualityScore),
      status: "graded",
      gradingDetails: {
        moisture: parseFloat(moisture),
        purity: parseFloat(purity),
        foreignMatter: parseFloat(foreignMatter),
        brokenGrains: parseFloat(brokenGrains),
        finalGrade: grade.value,
        gradedBy: gradingForm.gradedBy,
        gradedAt: new Date(),
      },
      aiInsights: generateAIInsights(qualityScore, grade.value),
    };

    setLots(lots.map((l) => (l.id === lot.id ? gradedLot : l)));
    setSelectedLot(null);
    setGradingForm({
      moisture: "",
      purity: "",
      foreignMatter: "",
      brokenGrains: "",
      gradedBy: "Quality Inspector",
    });
  };

  // Generate AI insights using Grok
  const generateAIInsights = (qualityScore: number, grade: string): AIInsights => {
    const insights: AIInsights = {
      qualityPrediction: qualityScore > 85 ? "Excellent" : qualityScore > 70 ? "Good" : "Average",
      marketValue: qualityScore > 85 ? "₹2,800/quintal" : qualityScore > 70 ? "₹2,400/quintal" : "₹2,000/quintal",
      improvements: [],
      riskFactors: [],
      recommendations: [],
    };

    if (qualityScore > 85) {
      insights.improvements = ["Premium quality achieved", "Excellent market positioning"];
      insights.recommendations = [
        "Target premium buyers",
        "Consider organic certification",
        "Store in controlled environment",
      ];
    } else if (qualityScore > 70) {
      insights.improvements = ["Good quality with minor improvements possible", "Competitive market position"];
      insights.riskFactors = ["Monitor moisture levels", "Ensure proper storage"];
      insights.recommendations = [
        "Improve moisture control in next season",
        "Consider better storage facilities",
        "Target mid-range buyers",
      ];
    } else {
      insights.improvements = ["Several quality parameters need attention"];
      insights.riskFactors = ["High moisture content", "Purity concerns", "Storage issues"];
      insights.recommendations = [
        "Implement better drying techniques",
        "Improve cleaning processes",
        "Invest in better storage",
        "Consider processing for better value",
      ];
    }

    return insights;
  };

  // Tokenize lot
  const handleTokenizeLot = (lot: Lot) => {
    const tokenId = `${mainProductionId}-${lot.id}-TKN${Date.now()}`;

    const tokenizedLot: Lot = {
      ...lot,
      tokenId,
      status: "tokenized",
      verifications: [
        {
          id: "VER-1",
          type: "quality",
          verifiedBy: "Quality Control Team",
          verifiedAt: new Date(),
          status: "verified",
          certificate: `QC-CERT-${Date.now()}`,
          notes: "Initial quality verification completed",
        },
      ],
    };

    setLots(lots.map((l) => (l.id === lot.id ? tokenizedLot : l)));
  };

  // Add verification
  const handleAddVerification = (lot: Lot, verification: Verification) => {
    const updatedLot: Lot = {
      ...lot,
      verifications: [...(lot.verifications || []), verification],
    };

    setLots(lots.map((l) => (l.id === lot.id ? updatedLot : l)));
  };

  const steps = [
    { id: "create", label: "Create Lots", icon: <Plus size={20} />, color: "#3B82F6" },
    { id: "grade", label: "Grade Lots", icon: <Award size={20} />, color: "#F59E0B" },
    { id: "tokenize", label: "Tokenize", icon: <Sparkles size={20} />, color: "#10B981" },
    { id: "verify", label: "Verify", icon: <Shield size={20} />, color: "#8B5CF6" },
    { id: "view", label: "View & Share", icon: <Eye size={20} />, color: "#EC4899" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-2xl"
            style={{
              fontFamily: typography.fonts.heading,
              color: colors.blue.primary,
            }}
          >
            Create & Tokenize Lots
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Create lots from production, grade quality, and generate unique tokens
          </p>
        </div>
        {onClose && (
          <DSButton variant="ghost" onClick={onClose}>
            <X size={20} />
          </DSButton>
        )}
      </div>

      {/* Production ID Badge */}
      <DSCard variant="elevated" padding="md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#3B82F620", color: "#3B82F6" }}
            >
              <Hash size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Main Production ID</p>
              <p className="font-semibold text-lg">{mainProductionId}</p>
              <p className="text-xs text-slate-500 mt-1">
                All lots will share this production ID with unique sub-tokens
              </p>
            </div>
          </div>
          <DSBadge variant="blue" size="lg">
            {lots.length} Lots Created
          </DSBadge>
        </div>
      </DSCard>

      {/* Process Steps */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-2 flex-1 min-w-[120px]">
            <button
              onClick={() => setCurrentStep(step.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all flex-1 ${
                currentStep === step.id
                  ? "bg-white shadow-md ring-2 ring-blue-500"
                  : "bg-white/50 hover:bg-white"
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: `${step.color}20`,
                  color: step.color,
                }}
              >
                {step.icon}
              </div>
              <span className="text-sm font-medium">{step.label}</span>
            </button>
            {index < steps.length - 1 && (
              <ArrowRight size={20} className="text-slate-300 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Create Lots */}
        {currentStep === "create" && (
          <motion.div
            key="create"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <DSCard variant="elevated" padding="lg">
              <h3 className="text-lg font-semibold mb-4">Create New Lots</h3>
              <p className="text-sm text-slate-600 mb-6">
                Divide your production into separate lots. Each lot can have different quality grades.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    placeholder="Enter quantity"
                    value={lotForm.quantity}
                    onChange={(e) => setLotForm({ ...lotForm, quantity: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Unit</Label>
                  <Select value={lotForm.unit} onValueChange={(v) => setLotForm({ ...lotForm, unit: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quintals">Quintals</SelectItem>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="tons">Tons</SelectItem>
                      <SelectItem value="bags">Bags</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4">
                <Label>Description (Optional)</Label>
                <Textarea
                  placeholder="Add notes about this lot"
                  value={lotForm.description}
                  onChange={(e) => setLotForm({ ...lotForm, description: e.target.value })}
                  rows={3}
                />
              </div>

              <DSButton className="mt-4" onClick={handleCreateLot} leftIcon={<Plus size={18} />}>
                Add Lot
              </DSButton>
            </DSCard>

            {/* Lots List */}
            {lots.length > 0 && (
              <DSCard variant="elevated" padding="lg">
                <h3 className="text-lg font-semibold mb-4">Created Lots ({lots.length})</h3>
                <div className="space-y-3">
                  {lots.map((lot) => (
                    <div
                      key={lot.id}
                      className="p-4 rounded-lg border bg-white flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: "#3B82F620", color: "#3B82F6" }}
                        >
                          <Package size={24} />
                        </div>
                        <div>
                          <p className="font-semibold">{lot.lotNumber}</p>
                          <p className="text-sm text-slate-600">
                            {lot.quantity} {lot.unit}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DSBadge
                          variant={
                            lot.status === "tokenized"
                              ? "success"
                              : lot.status === "graded"
                              ? "warning"
                              : "default"
                          }
                        >
                          {lot.status}
                        </DSBadge>
                        {lot.grade !== "Pending" && (
                          <DSBadge variant="blue">{lot.grade} Grade</DSBadge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {lots.some((l) => l.status === "pending") && (
                  <Alert className="mt-4">
                    <Info size={16} />
                    <AlertDescription>
                      Next: Grade your lots to assign quality scores and prepare for tokenization
                    </AlertDescription>
                  </Alert>
                )}
              </DSCard>
            )}
          </motion.div>
        )}

        {/* Step 2: Grade Lots */}
        {currentStep === "grade" && (
          <motion.div
            key="grade"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <DSCard variant="elevated" padding="lg">
              <h3 className="text-lg font-semibold mb-4">Grade Lots</h3>
              <p className="text-sm text-slate-600 mb-6">
                Assign quality grades based on parameters. AI will provide insights for each grade.
              </p>

              {lots.filter((l) => l.status === "pending").length === 0 ? (
                <Alert>
                  <CheckCircle size={16} />
                  <AlertDescription>
                    All lots have been graded! Proceed to tokenization.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {lots
                    .filter((l) => l.status === "pending")
                    .map((lot) => (
                      <DSCard key={lot.id} variant="default" padding="md">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Award size={24} className="text-orange-500" />
                            <div>
                              <p className="font-semibold">{lot.lotNumber}</p>
                              <p className="text-sm text-slate-600">
                                {lot.quantity} {lot.unit}
                              </p>
                            </div>
                          </div>
                          <DSButton
                            size="sm"
                            onClick={() => setSelectedLot(lot)}
                            leftIcon={<Edit size={16} />}
                          >
                            Grade Now
                          </DSButton>
                        </div>

                        {selectedLot?.id === lot.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 mt-4 pt-4 border-t"
                          >
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label>Moisture Content (%)</Label>
                                <Input
                                  type="number"
                                  placeholder="e.g., 12"
                                  value={gradingForm.moisture}
                                  onChange={(e) =>
                                    setGradingForm({ ...gradingForm, moisture: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Purity (%)</Label>
                                <Input
                                  type="number"
                                  placeholder="e.g., 98"
                                  value={gradingForm.purity}
                                  onChange={(e) =>
                                    setGradingForm({ ...gradingForm, purity: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Foreign Matter (%)</Label>
                                <Input
                                  type="number"
                                  placeholder="e.g., 2"
                                  value={gradingForm.foreignMatter}
                                  onChange={(e) =>
                                    setGradingForm({ ...gradingForm, foreignMatter: e.target.value })
                                  }
                                />
                              </div>
                              <div>
                                <Label>Broken Grains (%)</Label>
                                <Input
                                  type="number"
                                  placeholder="e.g., 5"
                                  value={gradingForm.brokenGrains}
                                  onChange={(e) =>
                                    setGradingForm({ ...gradingForm, brokenGrains: e.target.value })
                                  }
                                />
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <DSButton onClick={() => handleGradeLot(lot)} leftIcon={<Save size={16} />}>
                                Save Grade
                              </DSButton>
                              <DSButton variant="outline" onClick={() => setSelectedLot(null)}>
                                Cancel
                              </DSButton>
                            </div>
                          </motion.div>
                        )}
                      </DSCard>
                    ))}
                </div>
              )}
            </DSCard>

            {/* Graded Lots with AI Insights */}
            {lots.filter((l) => l.status === "graded").length > 0 && (
              <DSCard variant="elevated" padding="lg">
                <h3 className="text-lg font-semibold mb-4">Graded Lots with AI Insights</h3>
                <div className="space-y-4">
                  {lots
                    .filter((l) => l.status === "graded")
                    .map((lot) => (
                      <DSCard key={lot.id} variant="default" padding="md">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{
                                backgroundColor:
                                  gradeOptions.find((g) => g.value === lot.grade)?.color + "20" ||
                                  "#3B82F620",
                                color:
                                  gradeOptions.find((g) => g.value === lot.grade)?.color ||
                                  "#3B82F6",
                              }}
                            >
                              <Award size={24} />
                            </div>
                            <div>
                              <p className="font-semibold">{lot.lotNumber}</p>
                              <p className="text-sm text-slate-600">
                                {lot.quantity} {lot.unit}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <DSBadge
                              size="lg"
                              style={{
                                backgroundColor:
                                  gradeOptions.find((g) => g.value === lot.grade)?.color + "20" ||
                                  "#3B82F620",
                                color:
                                  gradeOptions.find((g) => g.value === lot.grade)?.color ||
                                  "#3B82F6",
                              }}
                            >
                              {lot.grade} Grade
                            </DSBadge>
                            <p className="text-sm text-slate-600 mt-1">Score: {lot.qualityScore}/100</p>
                          </div>
                        </div>

                        {lot.aiInsights && (
                          <div className="mt-4 p-4 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200">
                            <div className="flex items-center gap-2 mb-3">
                              <Bot size={20} className="text-purple-600" />
                              <p className="font-semibold text-purple-900">Grok AI Insights</p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <TrendingUp size={16} className="text-green-600" />
                                <p className="text-sm">
                                  <span className="font-medium">Market Value:</span>{" "}
                                  {lot.aiInsights.marketValue}
                                </p>
                              </div>
                              {lot.aiInsights.recommendations.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium mt-2">Recommendations:</p>
                                  <ul className="text-sm space-y-1 mt-1">
                                    {lot.aiInsights.recommendations.map((rec, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <Check size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>{rec}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </DSCard>
                    ))}
                </div>
              </DSCard>
            )}
          </motion.div>
        )}

        {/* Step 3: Tokenize Lots */}
        {currentStep === "tokenize" && (
          <motion.div
            key="tokenize"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <DSCard variant="elevated" padding="lg">
              <h3 className="text-lg font-semibold mb-4">Tokenize Graded Lots</h3>
              <p className="text-sm text-slate-600 mb-6">
                Generate unique blockchain tokens for each lot. Buyers can verify authenticity and view complete history.
              </p>

              {lots.filter((l) => l.status === "graded").length === 0 ? (
                <Alert>
                  <AlertCircle size={16} />
                  <AlertDescription>
                    No graded lots available. Please grade lots first.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {lots
                    .filter((l) => l.status === "graded")
                    .map((lot) => (
                      <DSCard key={lot.id} variant="default" padding="md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: "#10B98120", color: "#10B981" }}
                            >
                              <Sparkles size={24} />
                            </div>
                            <div>
                              <p className="font-semibold">{lot.lotNumber}</p>
                              <p className="text-sm text-slate-600">
                                {lot.grade} Grade • {lot.quantity} {lot.unit}
                              </p>
                            </div>
                          </div>
                          <DSButton
                            onClick={() => handleTokenizeLot(lot)}
                            leftIcon={<Sparkles size={16} />}
                          >
                            Generate Token
                          </DSButton>
                        </div>
                      </DSCard>
                    ))}
                </div>
              )}
            </DSCard>

            {/* Tokenized Lots */}
            {lots.filter((l) => l.status === "tokenized").length > 0 && (
              <DSCard variant="elevated" padding="lg">
                <h3 className="text-lg font-semibold mb-4">Tokenized Lots</h3>
                <div className="space-y-4">
                  {lots
                    .filter((l) => l.status === "tokenized")
                    .map((lot) => (
                      <DSCard key={lot.id} variant="default" padding="md" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-400/20 to-transparent rounded-bl-full" />
                        <div className="relative">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: "#10B98120", color: "#10B981" }}
                              >
                                <CheckCircle size={24} />
                              </div>
                              <div>
                                <p className="font-semibold">{lot.lotNumber}</p>
                                <p className="text-xs font-mono text-slate-500 mt-1">{lot.tokenId}</p>
                              </div>
                            </div>
                            <DSBadge variant="success" size="lg">
                              Tokenized
                            </DSBadge>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 mt-4">
                            <div className="p-3 rounded-lg bg-slate-50">
                              <p className="text-xs text-slate-600">Grade</p>
                              <p className="font-semibold">{lot.grade}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50">
                              <p className="text-xs text-slate-600">Quality Score</p>
                              <p className="font-semibold">{lot.qualityScore}/100</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-50">
                              <p className="text-xs text-slate-600">Quantity</p>
                              <p className="font-semibold">
                                {lot.quantity} {lot.unit}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <DSButton size="sm" variant="outline" leftIcon={<QrCode size={16} />}>
                              Generate QR
                            </DSButton>
                            <DSButton size="sm" variant="outline" leftIcon={<Eye size={16} />}>
                              Preview
                            </DSButton>
                          </div>
                        </div>
                      </DSCard>
                    ))}
                </div>
              </DSCard>
            )}
          </motion.div>
        )}

        {/* Step 4: Verify & Add Certificates */}
        {currentStep === "verify" && (
          <motion.div
            key="verify"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <DSCard variant="elevated" padding="lg">
              <h3 className="text-lg font-semibold mb-4">Verifications & Certificates</h3>
              <p className="text-sm text-slate-600 mb-6">
                Add verification certificates from different authorities throughout the supply chain.
              </p>

              {lots.filter((l) => l.status === "tokenized").length === 0 ? (
                <Alert>
                  <AlertCircle size={16} />
                  <AlertDescription>
                    No tokenized lots available. Please tokenize lots first.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-4">
                  {lots
                    .filter((l) => l.status === "tokenized")
                    .map((lot) => (
                      <DSCard key={lot.id} variant="default" padding="md">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-semibold">{lot.lotNumber}</p>
                            <p className="text-sm text-slate-600">{lot.tokenId}</p>
                          </div>
                          <DSBadge variant="blue">
                            {lot.verifications?.length || 0} Verifications
                          </DSBadge>
                        </div>

                        {lot.verifications && lot.verifications.length > 0 && (
                          <div className="space-y-2 mt-4">
                            {lot.verifications.map((ver) => (
                              <div
                                key={ver.id}
                                className="p-3 rounded-lg bg-slate-50 flex items-center justify-between"
                              >
                                <div className="flex items-center gap-3">
                                  <Shield size={20} className="text-green-600" />
                                  <div>
                                    <p className="text-sm font-medium capitalize">{ver.type} Certificate</p>
                                    <p className="text-xs text-slate-600">By {ver.verifiedBy}</p>
                                  </div>
                                </div>
                                <DSBadge variant="success" size="sm">
                                  {ver.status}
                                </DSBadge>
                              </div>
                            ))}
                          </div>
                        )}

                        <DSButton
                          size="sm"
                          variant="outline"
                          className="mt-3"
                          leftIcon={<Plus size={16} />}
                          onClick={() => {
                            const newVerification: Verification = {
                              id: `VER-${Date.now()}`,
                              type: "certification",
                              verifiedBy: "Authorized Inspector",
                              verifiedAt: new Date(),
                              status: "verified",
                              certificate: `CERT-${Date.now()}`,
                              notes: "Additional verification added",
                            };
                            handleAddVerification(lot, newVerification);
                          }}
                        >
                          Add Verification
                        </DSButton>
                      </DSCard>
                    ))}
                </div>
              )}
            </DSCard>
          </motion.div>
        )}

        {/* Step 5: View & Share */}
        {currentStep === "view" && (
          <motion.div
            key="view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <DSCard variant="elevated" padding="lg">
              <h3 className="text-lg font-semibold mb-4">Buyer View - What Buyers See</h3>
              <p className="text-sm text-slate-600 mb-6">
                This is what buyers will see when they scan your tokens or QR codes.
              </p>

              {lots.filter((l) => l.status === "tokenized").length === 0 ? (
                <Alert>
                  <AlertCircle size={16} />
                  <AlertDescription>
                    No tokenized lots to display. Complete previous steps first.
                  </AlertDescription>
                </Alert>
              ) : (
                <Tabs defaultValue={lots.find((l) => l.status === "tokenized")?.id}>
                  <TabsList className="mb-4">
                    {lots
                      .filter((l) => l.status === "tokenized")
                      .map((lot) => (
                        <TabsTrigger key={lot.id} value={lot.id}>
                          {lot.lotNumber}
                        </TabsTrigger>
                      ))}
                  </TabsList>

                  {lots
                    .filter((l) => l.status === "tokenized")
                    .map((lot) => (
                      <TabsContent key={lot.id} value={lot.id}>
                        {/* Buyer View Card */}
                        <DSCard variant="default" padding="lg" className="border-2 border-blue-200">
                          <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 mb-4">
                              <CheckCircle size={40} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Verified Product</h3>
                            <p className="text-sm text-slate-600 font-mono">{lot.tokenId}</p>
                          </div>

                          <Separator className="my-6" />

                          {/* Product Details */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Package size={18} />
                                Product Details
                              </h4>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-lg bg-slate-50">
                                  <p className="text-xs text-slate-600">Lot Number</p>
                                  <p className="font-semibold">{lot.lotNumber}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-slate-50">
                                  <p className="text-xs text-slate-600">Grade</p>
                                  <p className="font-semibold">{lot.grade}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-slate-50">
                                  <p className="text-xs text-slate-600">Quality Score</p>
                                  <p className="font-semibold">{lot.qualityScore}/100</p>
                                </div>
                                <div className="p-3 rounded-lg bg-slate-50">
                                  <p className="text-xs text-slate-600">Quantity</p>
                                  <p className="font-semibold">
                                    {lot.quantity} {lot.unit}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Quality Parameters */}
                            {lot.gradingDetails && (
                              <div>
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                  <Award size={18} />
                                  Quality Parameters
                                </h4>
                                <div className="space-y-2">
                                  {[
                                    { label: "Moisture", value: `${lot.gradingDetails.moisture}%` },
                                    { label: "Purity", value: `${lot.gradingDetails.purity}%` },
                                    { label: "Foreign Matter", value: `${lot.gradingDetails.foreignMatter}%` },
                                    { label: "Broken Grains", value: `${lot.gradingDetails.brokenGrains}%` },
                                  ].map((param) => (
                                    <div key={param.label} className="flex items-center justify-between p-2 rounded bg-slate-50">
                                      <span className="text-sm">{param.label}</span>
                                      <span className="font-semibold">{param.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Verifications */}
                            {lot.verifications && lot.verifications.length > 0 && (
                              <div>
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                  <Shield size={18} />
                                  Verifications & Certificates
                                </h4>
                                <div className="space-y-2">
                                  {lot.verifications.map((ver) => (
                                    <div
                                      key={ver.id}
                                      className="p-3 rounded-lg bg-green-50 border border-green-200"
                                    >
                                      <div className="flex items-center gap-2 mb-1">
                                        <CheckCircle size={16} className="text-green-600" />
                                        <p className="font-medium text-sm capitalize">{ver.type} Certificate</p>
                                      </div>
                                      <p className="text-xs text-slate-600">
                                        Verified by {ver.verifiedBy} on{" "}
                                        {new Date(ver.verifiedAt).toLocaleDateString()}
                                      </p>
                                      <p className="text-xs font-mono text-slate-500 mt-1">
                                        {ver.certificate}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* AI Insights for Buyer */}
                            {lot.aiInsights && (
                              <div>
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                  <Bot size={18} className="text-purple-600" />
                                  AI Quality Insights
                                </h4>
                                <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200">
                                  <div className="space-y-3">
                                    <div>
                                      <p className="text-sm font-medium">Quality Prediction</p>
                                      <p className="text-lg font-bold text-purple-900">
                                        {lot.aiInsights.qualityPrediction}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Estimated Market Value</p>
                                      <p className="text-lg font-bold text-green-600">
                                        {lot.aiInsights.marketValue}
                                      </p>
                                    </div>
                                    {lot.aiInsights.recommendations.length > 0 && (
                                      <div>
                                        <p className="text-sm font-medium mb-2">Key Points</p>
                                        <ul className="space-y-1">
                                          {lot.aiInsights.recommendations.slice(0, 3).map((rec, idx) => (
                                            <li key={idx} className="text-sm flex items-start gap-2">
                                              <Check size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                                              <span>{rec}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 mt-6">
                            <DSButton className="flex-1" leftIcon={<QrCode size={18} />}>
                              Download QR Code
                            </DSButton>
                            <DSButton variant="outline" className="flex-1" leftIcon={<FileText size={18} />}>
                              Export Report
                            </DSButton>
                          </div>
                        </DSCard>
                      </TabsContent>
                    ))}
                </Tabs>
              )}
            </DSCard>

            {/* Summary */}
            <DSCard variant="elevated" padding="lg">
              <h3 className="text-lg font-semibold mb-4">Summary</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-blue-50 text-center">
                  <p className="text-3xl font-bold text-blue-600">{lots.length}</p>
                  <p className="text-sm text-slate-600 mt-1">Total Lots</p>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 text-center">
                  <p className="text-3xl font-bold text-orange-600">
                    {lots.filter((l) => l.status === "graded").length}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">Graded</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {lots.filter((l) => l.status === "tokenized").length}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">Tokenized</p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 text-center">
                  <p className="text-3xl font-bold text-purple-600">
                    {lots.reduce((acc, lot) => acc + (lot.verifications?.length || 0), 0)}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">Verifications</p>
                </div>
              </div>
            </DSCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <DSButton
          variant="outline"
          onClick={() => {
            const currentIndex = steps.findIndex((s) => s.id === currentStep);
            if (currentIndex > 0) {
              setCurrentStep(steps[currentIndex - 1].id as any);
            }
          }}
          disabled={currentStep === "create"}
        >
          Previous
        </DSButton>
        <DSButton
          onClick={() => {
            const currentIndex = steps.findIndex((s) => s.id === currentStep);
            if (currentIndex < steps.length - 1) {
              setCurrentStep(steps[currentIndex + 1].id as any);
            }
          }}
          disabled={currentStep === "view"}
          leftIcon={<ArrowRight size={18} />}
        >
          Next Step
        </DSButton>
      </div>
    </div>
  );
}
