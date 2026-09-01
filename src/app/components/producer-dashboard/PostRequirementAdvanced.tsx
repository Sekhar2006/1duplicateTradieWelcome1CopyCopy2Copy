import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Trash2,
  Copy,
  ChevronRight,
  ChevronLeft,
  X,
  Save,
  Calendar,
  Users,
  Leaf,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Bot,
  Shield,
  Activity as ActivityIcon,
  BarChart3,
  Eye,
  Sun,
  CloudRain,
  DollarSign,
  FileText,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { toast } from "sonner@2.0.3";
import { ActivityLoggerEnhanced, Activity } from "./ActivityLoggerEnhanced";
import { grokAI, GrokAlert } from "./GrokAIService";

const { colors, typography, spacing } = designTokens;

// Comprehensive commodity database
const commodityDatabase = {
  Spices: {
    commodities: [
      { name: "Red Chili", varieties: ["Teja", "Sannam", "Byadgi", "Guntur", "Kashmiri"] },
      { name: "Turmeric", varieties: ["Alleppey Finger", "Rajapore", "Erode", "Salem", "Nizamabad"] },
      { name: "Coriander", varieties: ["Eagle", "Scooter", "Sadhana", "Badami"] },
      { name: "Cumin", varieties: ["Gujarat", "Rajasthan", "Kota", "Unjha"] },
      { name: "Black Pepper", varieties: ["Panniyur", "Subhakara", "Sreekara", "Malabar"] },
      { name: "Cardamom", varieties: ["Malabar", "Mysore", "Vazhukka"] },
    ],
  },
  Pulses: {
    commodities: [
      { name: "Chickpea", varieties: ["Kabuli", "Desi", "Chafa", "JG 130"] },
      { name: "Pigeon Pea", varieties: ["Asha", "Amar", "Bahar", "ICPL 87119"] },
      { name: "Lentil", varieties: ["Masoor", "Malka", "PL 406", "JL 3"] },
      { name: "Mung Bean", varieties: ["Pusa Bold", "Pusa Vishal", "IPM 02-14"] },
      { name: "Black Gram", varieties: ["T9", "Pant U19", "PU 31"] },
    ],
  },
  Grains: {
    commodities: [
      { name: "Wheat", varieties: ["PBW 343", "HD 2967", "DBW 17", "Lok 1", "WH 542"] },
      { name: "Rice", varieties: ["Basmati", "IR64", "Sona Masuri", "Swarna", "Pusa 1121"] },
      { name: "Barley", varieties: ["RD 2552", "PL 426", "BH 393"] },
      { name: "Maize", varieties: ["DHM 117", "Vivek Hybrid", "Ganga 5", "HQPM 1"] },
      { name: "Sorghum", varieties: ["CSH 16", "SPV 462", "M 35-1"] },
    ],
  },
  Oilseeds: {
    commodities: [
      { name: "Mustard", varieties: ["Pusa Bold", "Varuna", "Kranti", "RH 30"] },
      { name: "Groundnut", varieties: ["TMV 13", "Kadiri", "TAG 24", "ICGS 76"] },
      { name: "Sunflower", varieties: ["KBSH 1", "PSH 569", "Morden"] },
      { name: "Sesame", varieties: ["Gujarat TKG 55", "RT 346", "Purva 1"] },
      { name: "Soybean", varieties: ["JS 335", "JS 93-05", "MAUS 71"] },
    ],
  },
  "Cash Crops": {
    commodities: [
      { name: "Cotton", varieties: ["Bt Cotton", "Suraj", "LRA 5166", "Ankur 651"] },
      { name: "Sugarcane", varieties: ["Co 86032", "CoC 671", "Co 0238"] },
      { name: "Tobacco", varieties: ["Virginia", "Burley", "FCV"] },
      { name: "Jute", varieties: ["JRO 524", "JRC 212", "Suren"] },
      { name: "Coffee", varieties: ["Arabica", "Robusta", "Liberica"] },
    ],
  },
  Vegetables: {
    commodities: [
      { name: "Tomato", varieties: ["Pusa Ruby", "Roma", "Cherry", "Arka Vikas"] },
      { name: "Onion", varieties: ["Nasik Red", "Poona White", "Agrifound Dark Red"] },
      { name: "Potato", varieties: ["Kufri Jyoti", "Kufri Pukhraj", "Kufri Badshah"] },
      { name: "Cabbage", varieties: ["Pride of India", "Golden Acre", "Pusa Mukta"] },
      { name: "Cauliflower", varieties: ["Pusa Snowball", "Early Kunwari", "Pant Gobhi"] },
    ],
  },
  Fruits: {
    commodities: [
      { name: "Mango", varieties: ["Alphonso", "Dasheri", "Langra", "Kesar", "Totapuri"] },
      { name: "Banana", varieties: ["Robusta", "Dwarf Cavendish", "Rasthali", "Nendran"] },
      { name: "Apple", varieties: ["Red Delicious", "Royal Gala", "Granny Smith"] },
      { name: "Grapes", varieties: ["Thompson Seedless", "Bangalore Blue", "Anab-e-Shahi"] },
      { name: "Orange", varieties: ["Nagpur", "Coorg", "Kinnow"] },
    ],
  },
  Fishery: {
    commodities: [
      { name: "Rohu", varieties: ["Catla-Rohu-Mrigal", "IMC Rohu", "Jayanti Rohu"] },
      { name: "Mackerel", varieties: ["Indian Mackerel", "King Mackerel"] },
      { name: "Shrimp", varieties: ["Tiger Shrimp", "White Shrimp", "Vannamei"] },
      { name: "Carp", varieties: ["Common Carp", "Grass Carp", "Silver Carp"] },
      { name: "Tilapia", varieties: ["Nile Tilapia", "Mozambique Tilapia"] },
    ],
  },
  Metals: {
    commodities: [
      { name: "Gold", varieties: ["24 Karat", "22 Karat", "18 Karat"] },
      { name: "Silver", varieties: ["Fine Silver", "Sterling Silver"] },
      { name: "Copper", varieties: ["Electrolytic Copper", "Copper Cathode"] },
      { name: "Aluminum", varieties: ["Primary Aluminum", "Aluminum Alloy"] },
      { name: "Iron Ore", varieties: ["Hematite", "Magnetite"] },
    ],
  },
};

interface Intercrop {
  id: string;
  commodity: string;
  variety: string;
  proportion: string;
}

interface CropBlock {
  id: string;
  plotName: string;
  category: string;
  commodity: string;
  variety: string;
  area: number;
  unit: "acres" | "hectares";
  hasIntercrop: boolean;
  intercrops: Intercrop[];
  sowingDate?: Date;
  expectedHarvestDate?: Date;
  expectedYield?: number;
  stage: "planning" | "sown" | "growing" | "flowering" | "harvesting" | "harvested";
  activities: Activity[];
}

interface AIInsight {
  type: "success" | "warning" | "error" | "info";
  category: string;
  message: string;
  icon: React.ReactNode;
}

interface PostRequirementAdvancedProps {
  onClose?: () => void;
}

export function PostRequirementAdvanced({ onClose }: PostRequirementAdvancedProps) {
  const [activeTab, setActiveTab] = useState<"plots" | "activities" | "overview" | "insights">("plots");
  const [cropBlocks, setCropBlocks] = useState<CropBlock[]>([
    {
      id: "1",
      plotName: "Plot 1",
      category: "",
      commodity: "",
      variety: "",
      area: 0,
      unit: "acres",
      hasIntercrop: false,
      intercrops: [],
      stage: "planning",
      activities: [],
    },
  ]);

  const [selectedBlockIndex, setSelectedBlockIndex] = useState(0);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [grokAlerts, setGrokAlerts] = useState<GrokAlert[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const selectedBlock = cropBlocks[selectedBlockIndex];

  // Get available commodities based on selected category
  const getAvailableCommodities = (category: string) => {
    if (!category || !commodityDatabase[category as keyof typeof commodityDatabase]) return [];
    return commodityDatabase[category as keyof typeof commodityDatabase].commodities;
  };

  // Get varieties for selected commodity
  const getVarieties = (category: string, commodity: string) => {
    if (!category || !commodity) return [];
    const categoryData = commodityDatabase[category as keyof typeof commodityDatabase];
    if (!categoryData) return [];
    const commodityData = categoryData.commodities.find((c) => c.name === commodity);
    return commodityData?.varieties || [];
  };

  // Generate AI insights for selected crop
  useEffect(() => {
    if (selectedBlock?.commodity) {
      generateAIInsights(selectedBlock.category, selectedBlock.commodity);
      runGrokAnalysis(selectedBlock);
    }
  }, [selectedBlock?.commodity]);

  const generateAIInsights = (category: string, commodity: string) => {
    const insights: AIInsight[] = [];

    // Soil suitability
    insights.push({
      type: "success",
      category: "Soil",
      message: `${commodity} grows well in loamy soil with pH 6.5-7.5. Your region shows 85% compatibility.`,
      icon: <Leaf size={20} />,
    });

    // Climate prediction
    const climateTypes = ["favorable", "moderate", "risky"];
    const climateType = climateTypes[Math.floor(Math.random() * climateTypes.length)];
    insights.push({
      type: climateType === "favorable" ? "success" : climateType === "moderate" ? "info" : "warning",
      category: "Climate",
      message:
        climateType === "favorable"
          ? `Weather forecast favorable for next 120 days. Optimal rainfall expected.`
          : climateType === "moderate"
          ? `Moderate drought risk in next 60 days. Consider drip irrigation.`
          : `High flood risk predicted. Delay sowing by 2 weeks recommended.`,
      icon: climateType === "risky" ? <CloudRain size={20} /> : <Sun size={20} />,
    });

    // Market trends
    const marketTrend = Math.random() > 0.5 ? "high" : "moderate";
    insights.push({
      type: marketTrend === "high" ? "success" : "info",
      category: "Market",
      message:
        marketTrend === "high"
          ? `${commodity} demand expected to rise 18% in next quarter. Best time to sow!`
          : `Stable market conditions. Current price: ₹${Math.floor(Math.random() * 5000 + 2000)}/quintal.`,
      icon: <TrendingUp size={20} />,
    });

    // Government policies
    if (Math.random() > 0.6) {
      insights.push({
        type: "warning",
        category: "Policy",
        message: `Export restriction possible for ${commodity}. Government reviewing MSP changes.`,
        icon: <AlertTriangle size={20} />,
      });
    } else {
      insights.push({
        type: "success",
        category: "Incentive",
        message: `₹5,000/acre subsidy available for ${commodity}. Apply before sowing!`,
        icon: <DollarSign size={20} />,
      });
    }

    setAiInsights(insights);
  };

  const runGrokAnalysis = async (block: CropBlock) => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const alerts: GrokAlert[] = [];

      // Check activities for anomalies
      if (block.activities.length > 0) {
        const recentActivities = block.activities.filter(
          (a) => new Date().getTime() - new Date(a.date).getTime() < 7 * 24 * 60 * 60 * 1000
        );

        if (recentActivities.length > 10) {
          alerts.push({
            id: `alert-${Date.now()}`,
            type: "anomaly",
            severity: "medium",
            title: "High Activity Frequency",
            message: `${recentActivities.length} activities logged in last 7 days. Verify for accuracy.`,
            timestamp: new Date(),
            actionRequired: true,
          });
        }
      }

      // Check for intercrop compatibility
      if (block.hasIntercrop && block.intercrops.length > 0) {
        alerts.push({
          id: `alert-${Date.now()}-1`,
          type: "info",
          severity: "low",
          title: "Intercrop Analysis",
          message: `${block.commodity} + ${block.intercrops[0].commodity} intercropping detected. Monitor spacing and nutrient competition.`,
          timestamp: new Date(),
          actionRequired: false,
        });
      }

      setGrokAlerts(alerts);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleUpdateBlock = (index: number, field: string, value: any) => {
    setCropBlocks(
      cropBlocks.map((block, idx) => {
        if (idx === index) {
          const updated = { ...block, [field]: value };
          
          // Reset dependent fields
          if (field === "category") {
            updated.commodity = "";
            updated.variety = "";
          }
          if (field === "commodity") {
            updated.variety = "";
          }
          
          return updated;
        }
        return block;
      })
    );
  };

  const handleAddCropBlock = () => {
    setCropBlocks([
      ...cropBlocks,
      {
        id: Date.now().toString(),
        plotName: `Plot ${cropBlocks.length + 1}`,
        category: "",
        commodity: "",
        variety: "",
        area: 0,
        unit: "acres",
        hasIntercrop: false,
        intercrops: [],
        stage: "planning",
        activities: [],
      },
    ]);
    setSelectedBlockIndex(cropBlocks.length);
  };

  const handleRemoveCropBlock = (index: number) => {
    if (cropBlocks.length > 1) {
      setCropBlocks(cropBlocks.filter((_, idx) => idx !== index));
      if (selectedBlockIndex >= cropBlocks.length - 1) {
        setSelectedBlockIndex(Math.max(0, selectedBlockIndex - 1));
      }
    }
  };

  const handleCopyPreviousBlock = () => {
    if (selectedBlockIndex > 0) {
      const previousBlock = cropBlocks[selectedBlockIndex - 1];
      handleUpdateBlock(selectedBlockIndex, "category", previousBlock.category);
      handleUpdateBlock(selectedBlockIndex, "commodity", previousBlock.commodity);
      handleUpdateBlock(selectedBlockIndex, "variety", previousBlock.variety);
      toast.success("Copied data from previous plot");
    }
  };

  const handleAddIntercrop = () => {
    if (!selectedBlock) return;
    
    const updatedBlock = {
      ...selectedBlock,
      intercrops: [
        ...selectedBlock.intercrops,
        {
          id: Date.now().toString(),
          commodity: "",
          variety: "",
          proportion: "30%",
        },
      ],
    };
    
    setCropBlocks(cropBlocks.map((b, idx) => (idx === selectedBlockIndex ? updatedBlock : b)));
  };

  const handleRemoveIntercrop = (intercropId: string) => {
    if (!selectedBlock) return;
    
    const updatedBlock = {
      ...selectedBlock,
      intercrops: selectedBlock.intercrops.filter((ic) => ic.id !== intercropId),
    };
    
    setCropBlocks(cropBlocks.map((b, idx) => (idx === selectedBlockIndex ? updatedBlock : b)));
  };

  const handleUpdateIntercrop = (intercropId: string, field: string, value: any) => {
    if (!selectedBlock) return;
    
    const updatedBlock = {
      ...selectedBlock,
      intercrops: selectedBlock.intercrops.map((ic) =>
        ic.id === intercropId ? { ...ic, [field]: value } : ic
      ),
    };
    
    setCropBlocks(cropBlocks.map((b, idx) => (idx === selectedBlockIndex ? updatedBlock : b)));
  };

  const handleActivitiesUpdate = (activities: Activity[]) => {
    handleUpdateBlock(selectedBlockIndex, "activities", activities);
  };

  const handleSave = () => {
    // Validate blocks
    const invalidBlocks = cropBlocks.filter(
      (b) => !b.category || !b.commodity || !b.variety || b.area <= 0
    );

    if (invalidBlocks.length > 0) {
      toast.error("Please complete all required fields in all plots");
      return;
    }

    toast.success("Crop planning saved successfully! ✓");
    console.log("Saved crop blocks:", cropBlocks);
    
    if (onClose) {
      onClose();
    }
  };

  const getStageColor = (stage: CropBlock["stage"]) => {
    const colors: Record<CropBlock["stage"], string> = {
      planning: "#6B7280",
      sown: "#10B981",
      growing: "#22C55E",
      flowering: "#F59E0B",
      harvesting: "#EF4444",
      harvested: "#3B82F6",
    };
    return colors[stage];
  };

  const getStageLabel = (stage: CropBlock["stage"]) => {
    const labels: Record<CropBlock["stage"], string> = {
      planning: "📋 Planning",
      sown: "🌱 Sown",
      growing: "🌿 Growing",
      flowering: "🌸 Flowering",
      harvesting: "🌾 Harvesting",
      harvested: "📦 Harvested",
    };
    return labels[stage];
  };

  const insightColors = {
    success: colors.status.success,
    warning: colors.status.warning,
    error: colors.status.error,
    info: colors.status.info,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes["2xl"],
              fontWeight: typography.weights.bold,
              color: colors.blue.primary,
            }}
          >
            🌾 Advanced Multi-Crop Planner
          </h2>
          <p
            style={{
              fontSize: typography.sizes.sm,
              color: colors.text.secondary,
              marginTop: spacing.xs,
            }}
          >
            Plan multiple crops, track activities, and get AI-powered insights
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            <X size={24} style={{ color: colors.text.muted }} />
          </button>
        )}
      </div>

      {/* Grok Alerts Banner */}
      <AnimatePresence>
        {grokAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <DSCard
              variant="default"
              padding="md"
              className="border-2"
              style={{
                borderColor:
                  grokAlerts[0].severity === "high"
                    ? colors.status.error
                    : grokAlerts[0].severity === "medium"
                    ? colors.status.warning
                    : colors.status.info,
              }}
            >
              <div className="flex items-start gap-3">
                <Shield
                  size={24}
                  style={{
                    color:
                      grokAlerts[0].severity === "high"
                        ? colors.status.error
                        : grokAlerts[0].severity === "medium"
                        ? colors.status.warning
                        : colors.accent.gold,
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      style={{
                        fontSize: typography.sizes.base,
                        fontWeight: typography.weights.semibold,
                        color: colors.text.primary,
                      }}
                    >
                      🤖 Grok AI: {grokAlerts[0].title}
                    </h4>
                    <DSBadge
                      variant={
                        grokAlerts[0].severity === "high"
                          ? "error"
                          : grokAlerts[0].severity === "medium"
                          ? "warning"
                          : "info"
                      }
                      size="sm"
                    >
                      {grokAlerts[0].severity.toUpperCase()}
                    </DSBadge>
                  </div>
                  <p
                    style={{
                      fontSize: typography.sizes.sm,
                      color: colors.text.secondary,
                    }}
                  >
                    {grokAlerts[0].message}
                  </p>
                </div>
                <button
                  onClick={() => setGrokAlerts([])}
                  className="p-1 rounded hover:bg-white/20"
                >
                  <X size={16} style={{ color: colors.text.muted }} />
                </button>
              </div>
            </DSCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plot Navigation */}
      <DSCard variant="elevated" padding="md">
        <div className="flex items-center justify-between mb-3">
          <h3
            style={{
              fontSize: typography.sizes.base,
              fontWeight: typography.weights.semibold,
              color: colors.text.primary,
            }}
          >
            Your Plots ({cropBlocks.length})
          </h3>
          <DSButton variant="primary" size="sm" leftIcon={<Plus size={16} />} onClick={handleAddCropBlock}>
            Add Plot
          </DSButton>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-2">
          {cropBlocks.map((block, idx) => (
            <button
              key={block.id}
              onClick={() => setSelectedBlockIndex(idx)}
              className="flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all min-w-[140px]"
              style={{
                borderColor: idx === selectedBlockIndex ? colors.accent.gold : colors.border.default,
                backgroundColor: idx === selectedBlockIndex ? `${colors.accent.gold}10` : colors.surface.primary,
              }}
            >
              <div className="text-left">
                <p
                  style={{
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.primary,
                  }}
                >
                  {block.plotName}
                </p>
                <p
                  style={{
                    fontSize: typography.sizes.xs,
                    color: colors.text.secondary,
                  }}
                >
                  {block.commodity || "Not set"}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getStageColor(block.stage) }}
                  />
                  <span
                    style={{
                      fontSize: typography.sizes.xs,
                      color: colors.text.muted,
                    }}
                  >
                    {block.activities.length} activities
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </DSCard>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="plots">🌾 Crop Details</TabsTrigger>
          <TabsTrigger value="activities">📅 Activities</TabsTrigger>
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="insights">💡 AI Insights</TabsTrigger>
        </TabsList>

        {/* Crop Details Tab */}
        <TabsContent value="plots" className="space-y-4">
          {selectedBlock && (
            <motion.div
              key={selectedBlock.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <DSCard variant="elevated" padding="lg">
                {/* Plot Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Input
                      value={selectedBlock.plotName}
                      onChange={(e) => handleUpdateBlock(selectedBlockIndex, "plotName", e.target.value)}
                      className="max-w-[200px]"
                      style={{
                        fontSize: typography.sizes.lg,
                        fontWeight: typography.weights.semibold,
                      }}
                    />
                    <Select
                      value={selectedBlock.stage}
                      onValueChange={(v) => handleUpdateBlock(selectedBlockIndex, "stage", v)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">📋 Planning</SelectItem>
                        <SelectItem value="sown">🌱 Sown</SelectItem>
                        <SelectItem value="growing">🌿 Growing</SelectItem>
                        <SelectItem value="flowering">🌸 Flowering</SelectItem>
                        <SelectItem value="harvesting">🌾 Harvesting</SelectItem>
                        <SelectItem value="harvested">📦 Harvested</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    {selectedBlockIndex > 0 && (
                      <DSButton variant="outline" size="sm" leftIcon={<Copy size={16} />} onClick={handleCopyPreviousBlock}>
                        Copy Previous
                      </DSButton>
                    )}
                    {cropBlocks.length > 1 && (
                      <DSButton
                        variant="outline"
                        size="sm"
                        leftIcon={<Trash2 size={16} />}
                        onClick={() => handleRemoveCropBlock(selectedBlockIndex)}
                      >
                        Delete Plot
                      </DSButton>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Category */}
                  <div>
                    <label
                      style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.medium,
                        color: colors.text.primary,
                        display: "block",
                        marginBottom: spacing.xs,
                      }}
                    >
                      Commodity Category *
                    </label>
                    <Select
                      value={selectedBlock.category}
                      onValueChange={(value) => handleUpdateBlock(selectedBlockIndex, "category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(commodityDatabase).map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Commodity */}
                  <div>
                    <label
                      style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.medium,
                        color: colors.text.primary,
                        display: "block",
                        marginBottom: spacing.xs,
                      }}
                    >
                      Commodity Name *
                    </label>
                    <Select
                      value={selectedBlock.commodity}
                      onValueChange={(value) => handleUpdateBlock(selectedBlockIndex, "commodity", value)}
                      disabled={!selectedBlock.category}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select commodity" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableCommodities(selectedBlock.category).map((comm) => (
                          <SelectItem key={comm.name} value={comm.name}>
                            {comm.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Variety */}
                  <div>
                    <label
                      style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.medium,
                        color: colors.text.primary,
                        display: "block",
                        marginBottom: spacing.xs,
                      }}
                    >
                      Variety *
                    </label>
                    <Select
                      value={selectedBlock.variety}
                      onValueChange={(value) => handleUpdateBlock(selectedBlockIndex, "variety", value)}
                      disabled={!selectedBlock.commodity}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select variety" />
                      </SelectTrigger>
                      <SelectContent>
                        {getVarieties(selectedBlock.category, selectedBlock.commodity).map((variety) => (
                          <SelectItem key={variety} value={variety}>
                            {variety}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Area */}
                  <div>
                    <label
                      style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.medium,
                        color: colors.text.primary,
                        display: "block",
                        marginBottom: spacing.xs,
                      }}
                    >
                      Area *
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        min="0"
                        step="0.1"
                        value={selectedBlock.area || ""}
                        onChange={(e) =>
                          handleUpdateBlock(selectedBlockIndex, "area", parseFloat(e.target.value) || 0)
                        }
                        placeholder="Enter area"
                        className="flex-1"
                      />
                      <Select
                        value={selectedBlock.unit}
                        onValueChange={(value) => handleUpdateBlock(selectedBlockIndex, "unit", value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="acres">Acres</SelectItem>
                          <SelectItem value="hectares">Hectares</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Expected Yield */}
                  <div>
                    <label
                      style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.medium,
                        color: colors.text.primary,
                        display: "block",
                        marginBottom: spacing.xs,
                      }}
                    >
                      Expected Yield (Quintals)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={selectedBlock.expectedYield || ""}
                      onChange={(e) =>
                        handleUpdateBlock(selectedBlockIndex, "expectedYield", parseFloat(e.target.value) || 0)
                      }
                      placeholder="Optional"
                    />
                  </div>
                </div>

                {/* Intercropping Section */}
                <div className="border-t pt-4" style={{ borderColor: colors.border.default }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={selectedBlock.hasIntercrop}
                        onCheckedChange={(checked) =>
                          handleUpdateBlock(selectedBlockIndex, "hasIntercrop", checked)
                        }
                      />
                      <div>
                        <label
                          style={{
                            fontSize: typography.sizes.sm,
                            fontWeight: typography.weights.medium,
                            color: colors.text.primary,
                          }}
                        >
                          Enable Intercropping
                        </label>
                        <p
                          style={{
                            fontSize: typography.sizes.xs,
                            color: colors.text.secondary,
                          }}
                        >
                          Grow multiple crops together in the same plot
                        </p>
                      </div>
                    </div>
                    {selectedBlock.hasIntercrop && (
                      <DSButton
                        variant="outline"
                        size="sm"
                        leftIcon={<Plus size={16} />}
                        onClick={handleAddIntercrop}
                      >
                        Add Intercrop
                      </DSButton>
                    )}
                  </div>

                  {selectedBlock.hasIntercrop && selectedBlock.intercrops.length > 0 && (
                    <div className="space-y-3">
                      {selectedBlock.intercrops.map((intercrop) => (
                        <div
                          key={intercrop.id}
                          className="p-4 rounded-lg border"
                          style={{
                            backgroundColor: colors.surface.secondary,
                            borderColor: colors.border.default,
                          }}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label
                                style={{
                                  fontSize: typography.sizes.xs,
                                  color: colors.text.secondary,
                                  display: "block",
                                  marginBottom: spacing.xs,
                                }}
                              >
                                Intercrop Commodity
                              </label>
                              <Input
                                value={intercrop.commodity}
                                onChange={(e) =>
                                  handleUpdateIntercrop(intercrop.id, "commodity", e.target.value)
                                }
                                placeholder="e.g., Mung Bean"
                              />
                            </div>
                            <div>
                              <label
                                style={{
                                  fontSize: typography.sizes.xs,
                                  color: colors.text.secondary,
                                  display: "block",
                                  marginBottom: spacing.xs,
                                }}
                              >
                                Variety
                              </label>
                              <Input
                                value={intercrop.variety}
                                onChange={(e) =>
                                  handleUpdateIntercrop(intercrop.id, "variety", e.target.value)
                                }
                                placeholder="e.g., Pusa Bold"
                              />
                            </div>
                            <div>
                              <label
                                style={{
                                  fontSize: typography.sizes.xs,
                                  color: colors.text.secondary,
                                  display: "block",
                                  marginBottom: spacing.xs,
                                }}
                              >
                                Proportion
                              </label>
                              <div className="flex gap-2">
                                <Input
                                  value={intercrop.proportion}
                                  onChange={(e) =>
                                    handleUpdateIntercrop(intercrop.id, "proportion", e.target.value)
                                  }
                                  placeholder="30%"
                                />
                                <DSButton
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoveIntercrop(intercrop.id)}
                                >
                                  <Trash2 size={16} />
                                </DSButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </DSCard>
            </motion.div>
          )}
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-4">
          {selectedBlock && selectedBlock.commodity ? (
            <ActivityLoggerEnhanced
              cropId={selectedBlock.id}
              cropName={`${selectedBlock.plotName} - ${selectedBlock.commodity} ${selectedBlock.variety}`}
              onActivitiesUpdate={handleActivitiesUpdate}
              existingActivities={selectedBlock.activities}
            />
          ) : (
            <DSCard variant="elevated" padding="lg">
              <div className="text-center py-8">
                <ActivityIcon size={48} className="mx-auto mb-3" style={{ color: colors.text.muted }} />
                <p
                  style={{
                    fontSize: typography.sizes.base,
                    color: colors.text.secondary,
                  }}
                >
                  Please select a commodity in the Crop Details tab to start logging activities
                </p>
              </div>
            </DSCard>
          )}
        </TabsContent>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DSCard variant="elevated" padding="md">
              <div className="text-center">
                <p
                  style={{
                    fontSize: typography.sizes["3xl"],
                    fontWeight: typography.weights.bold,
                    color: colors.blue.primary,
                  }}
                >
                  {cropBlocks.length}
                </p>
                <p
                  style={{
                    fontSize: typography.sizes.sm,
                    color: colors.text.secondary,
                  }}
                >
                  Total Plots
                </p>
              </div>
            </DSCard>

            <DSCard variant="elevated" padding="md">
              <div className="text-center">
                <p
                  style={{
                    fontSize: typography.sizes["3xl"],
                    fontWeight: typography.weights.bold,
                    color: colors.status.success,
                  }}
                >
                  {cropBlocks.reduce((sum, b) => sum + b.area, 0).toFixed(1)}
                </p>
                <p
                  style={{
                    fontSize: typography.sizes.sm,
                    color: colors.text.secondary,
                  }}
                >
                  Total Area ({cropBlocks[0]?.unit || "acres"})
                </p>
              </div>
            </DSCard>

            <DSCard variant="elevated" padding="md">
              <div className="text-center">
                <p
                  style={{
                    fontSize: typography.sizes["3xl"],
                    fontWeight: typography.weights.bold,
                    color: colors.accent.gold,
                  }}
                >
                  {cropBlocks.reduce((sum, b) => sum + b.activities.length, 0)}
                </p>
                <p
                  style={{
                    fontSize: typography.sizes.sm,
                    color: colors.text.secondary,
                  }}
                >
                  Total Activities
                </p>
              </div>
            </DSCard>
          </div>

          {/* Plots Summary */}
          <DSCard variant="elevated" padding="lg">
            <h3
              style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
                marginBottom: spacing.md,
              }}
            >
              Plots Summary
            </h3>
            <div className="space-y-3">
              {cropBlocks.map((block, idx) => (
                <div
                  key={block.id}
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: colors.surface.secondary,
                    borderColor: colors.border.default,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4
                          style={{
                            fontSize: typography.sizes.sm,
                            fontWeight: typography.weights.semibold,
                            color: colors.text.primary,
                          }}
                        >
                          {block.plotName}
                        </h4>
                        <DSBadge
                          variant={
                            block.stage === "planning"
                              ? "blue"
                              : block.stage === "sown" || block.stage === "growing"
                              ? "success"
                              : block.stage === "harvested"
                              ? "info"
                              : "warning"
                          }
                          size="sm"
                        >
                          {getStageLabel(block.stage)}
                        </DSBadge>
                      </div>
                      <p
                        style={{
                          fontSize: typography.sizes.sm,
                          color: colors.text.secondary,
                        }}
                      >
                        {block.commodity ? `${block.commodity} ${block.variety}` : "Not configured"}
                        {" • "}
                        {block.area} {block.unit}
                        {block.hasIntercrop && block.intercrops.length > 0 && (
                          <span> • {block.intercrops.length} intercrops</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        style={{
                          fontSize: typography.sizes.lg,
                          fontWeight: typography.weights.semibold,
                          color: colors.accent.gold,
                        }}
                      >
                        {block.activities.length}
                      </p>
                      <p
                        style={{
                          fontSize: typography.sizes.xs,
                          color: colors.text.secondary,
                        }}
                      >
                        Activities
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DSCard>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          {aiInsights.length > 0 && selectedBlock?.commodity ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiInsights.map((insight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <DSCard
                    variant="default"
                    padding="md"
                    className="border-l-4"
                    style={{
                      borderLeftColor: insightColors[insight.type],
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${insightColors[insight.type]}20`,
                          color: insightColors[insight.type],
                        }}
                      >
                        {insight.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4
                            style={{
                              fontSize: typography.sizes.sm,
                              fontWeight: typography.weights.semibold,
                              color: colors.text.primary,
                            }}
                          >
                            {insight.category}
                          </h4>
                          <DSBadge variant={insight.type} size="sm">
                            AI
                          </DSBadge>
                        </div>
                        <p
                          style={{
                            fontSize: typography.sizes.sm,
                            color: colors.text.secondary,
                            lineHeight: 1.5,
                          }}
                        >
                          {insight.message}
                        </p>
                      </div>
                    </div>
                  </DSCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <DSCard variant="elevated" padding="lg">
              <div className="text-center py-8">
                <Bot size={48} className="mx-auto mb-3" style={{ color: colors.text.muted }} />
                <p
                  style={{
                    fontSize: typography.sizes.base,
                    color: colors.text.secondary,
                  }}
                >
                  Configure a crop in the Crop Details tab to see AI-powered insights
                </p>
              </div>
            </DSCard>
          )}
        </TabsContent>
      </Tabs>

      {/* Navigation Footer */}
      <div
        className="flex gap-3 sticky bottom-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border"
        style={{ borderColor: colors.border.light }}
      >
        <DSButton
          variant="outline"
          size="lg"
          leftIcon={<ChevronLeft size={20} />}
          onClick={() => setSelectedBlockIndex(Math.max(0, selectedBlockIndex - 1))}
          disabled={selectedBlockIndex === 0}
        >
          Previous Plot
        </DSButton>
        <DSButton
          variant="outline"
          size="lg"
          rightIcon={<ChevronRight size={20} />}
          onClick={() =>
            setSelectedBlockIndex(Math.min(cropBlocks.length - 1, selectedBlockIndex + 1))
          }
          disabled={selectedBlockIndex === cropBlocks.length - 1}
        >
          Next Plot
        </DSButton>
        <div className="flex-1" />
        <DSButton variant="outline" size="lg" onClick={onClose}>
          Cancel
        </DSButton>
        <DSButton variant="primary" size="lg" leftIcon={<Save size={20} />} onClick={handleSave}>
          Complete Entry & Save
        </DSButton>
      </div>
    </div>
  );
}
