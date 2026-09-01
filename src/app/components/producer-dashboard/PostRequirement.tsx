import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Trash2,
  Camera,
  Mic,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Info,
  Bot,
  Users,
  Leaf,
  MapPin,
  CloudRain,
  Sun,
  Droplet,
  DollarSign,
  FileText,
  Save,
  ChevronRight,
  X,
  Shield,
  Clock,
  Award,
  Target,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { grokAI, GrokAlert } from "./GrokAIService";
import { toast } from "sonner@2.0.3";

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

interface CommodityEntry {
  id: string;
  category: string;
  commodity: string;
  variety: string;
  area: number;
  unit: "acres" | "hectares";
  sowingDate?: Date;
  harvestDate?: Date;
  expectedYield?: number;
}

interface AIInsight {
  type: "success" | "warning" | "error" | "info";
  category: string;
  message: string;
  icon: React.ReactNode;
}

interface ProducerStats {
  registered: number;
  sown: number;
  avgYield: string;
  marketPrice: string;
}

interface PostRequirementProps {
  onClose?: () => void;
}

export function PostRequirement({ onClose }: PostRequirementProps) {
  const [activeTab, setActiveTab] = useState<"entry" | "history" | "insights">("entry");
  const [entries, setEntries] = useState<CommodityEntry[]>([
    {
      id: "1",
      category: "",
      commodity: "",
      variety: "",
      area: 0,
      unit: "acres",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [producerStats, setProducerStats] = useState<ProducerStats>({
    registered: 0,
    sown: 0,
    avgYield: "0",
    marketPrice: "0",
  });
  const [showGrokAssistant, setShowGrokAssistant] = useState(false);
  const [grokQuery, setGrokQuery] = useState("");
  const [grokResponse, setGrokResponse] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [grokAlerts, setGrokAlerts] = useState<GrokAlert[]>([]);

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

  // Update AI insights when commodity changes
  useEffect(() => {
    if (selectedCommodity) {
      generateAIInsights(selectedCategory, selectedCommodity);
      updateProducerStats(selectedCommodity);
      runGrokAnalysis(selectedCategory, selectedCommodity);
    }
  }, [selectedCommodity, selectedCategory]);

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

  const updateProducerStats = (commodity: string) => {
    // Simulated data - in real app, fetch from database
    setProducerStats({
      registered: Math.floor(Math.random() * 500 + 100),
      sown: Math.floor(Math.random() * 300 + 50),
      avgYield: `${Math.floor(Math.random() * 20 + 15)} quintals/acre`,
      marketPrice: `₹${Math.floor(Math.random() * 3000 + 2000)}/quintal`,
    });
  };

  const runGrokAnalysis = async (category: string, commodity: string) => {
    setIsAnalyzing(true);
    
    // Simulate Grok AI analysis
    setTimeout(() => {
      const alerts: GrokAlert[] = [];

      // Check for fraud patterns
      if (Math.random() > 0.7) {
        alerts.push({
          id: `alert-${Date.now()}`,
          type: "fraud",
          severity: "medium",
          title: "Unusual Pattern Detected",
          message: `Multiple producers in your area reported ${commodity} crop failure last season. Verify soil conditions before proceeding.`,
          timestamp: new Date(),
          actionRequired: true,
        });
      }

      // Market anomaly
      if (Math.random() > 0.6) {
        alerts.push({
          id: `alert-${Date.now()}-1`,
          type: "anomaly",
          severity: "low",
          title: "Price Volatility Alert",
          message: `${commodity} prices fluctuated 22% in last 30 days. Consider forward contracts to lock prices.`,
          timestamp: new Date(),
          actionRequired: false,
        });
      }

      setGrokAlerts(alerts);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleAddEntry = () => {
    setEntries([
      ...entries,
      {
        id: Date.now().toString(),
        category: "",
        commodity: "",
        variety: "",
        area: 0,
        unit: "acres",
      },
    ]);
  };

  const handleRemoveEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter((e) => e.id !== id));
    }
  };

  const handleUpdateEntry = (id: string, field: string, value: any) => {
    setEntries(
      entries.map((entry) => {
        if (entry.id === id) {
          const updated = { ...entry, [field]: value };
          
          // Update selected category/commodity for AI insights
          if (field === "category") {
            setSelectedCategory(value);
            updated.commodity = "";
            updated.variety = "";
          }
          if (field === "commodity") {
            setSelectedCommodity(value);
            updated.variety = "";
          }
          
          return updated;
        }
        return entry;
      })
    );
  };

  const handleGrokQuery = async () => {
    if (!grokQuery.trim()) return;
    
    setIsAnalyzing(true);
    const response = await grokAI.processVoiceQuery(grokQuery);
    setGrokResponse(response);
    setIsAnalyzing(false);
  };

  const handleSave = () => {
    // Validate entries
    const invalidEntries = entries.filter(
      (e) => !e.category || !e.commodity || !e.variety || e.area <= 0
    );

    if (invalidEntries.length > 0) {
      toast.error("Please complete all fields before saving");
      return;
    }

    // Run Grok verification
    const verification = grokAI.verifyActivityData({
      cropId: "POST-REQ-" + Date.now(),
      cropName: entries.map((e) => e.commodity).join(", "),
      activities: entries.map((e) => ({
        type: "planning",
        date: new Date(),
        description: `Planning to sow ${e.area} ${e.unit} of ${e.commodity} (${e.variety})`,
      })),
      area: entries.reduce((sum, e) => sum + e.area, 0),
    });

    if (!verification.verified) {
      toast.error("Grok AI detected issues. Please review before saving.");
      return;
    }

    toast.success("Requirement posted successfully! ✓");
    console.log("Saved entries:", entries);
    
    // Reset form or close
    if (onClose) {
      onClose();
    }
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
            📝 Post Requirement
          </h2>
          <p
            style={{
              fontSize: typography.sizes.sm,
              color: colors.text.secondary,
              marginTop: spacing.xs,
            }}
          >
            Plan your sowing with AI-powered insights and real-time market data
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

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="entry">📝 Entry</TabsTrigger>
          <TabsTrigger value="history">📊 History</TabsTrigger>
          <TabsTrigger value="insights">💡 AI Insights</TabsTrigger>
        </TabsList>

        {/* Entry Tab */}
        <TabsContent value="entry" className="space-y-6">
          {/* Producer Stats */}
          {selectedCommodity && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <DSCard variant="elevated" padding="md">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={20} style={{ color: colors.accent.gold }} />
                  <h3
                    style={{
                      fontSize: typography.sizes.base,
                      fontWeight: typography.weights.semibold,
                      color: colors.text.primary,
                    }}
                  >
                    {selectedCommodity} - Producer Network
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p
                      style={{
                        fontSize: typography.sizes["2xl"],
                        fontWeight: typography.weights.bold,
                        color: colors.blue.primary,
                      }}
                    >
                      {producerStats.registered}
                    </p>
                    <p
                      style={{
                        fontSize: typography.sizes.xs,
                        color: colors.text.secondary,
                      }}
                    >
                      Registered
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      style={{
                        fontSize: typography.sizes["2xl"],
                        fontWeight: typography.weights.bold,
                        color: colors.status.success,
                      }}
                    >
                      {producerStats.sown}
                    </p>
                    <p
                      style={{
                        fontSize: typography.sizes.xs,
                        color: colors.text.secondary,
                      }}
                    >
                      Already Sown
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      style={{
                        fontSize: typography.sizes.base,
                        fontWeight: typography.weights.bold,
                        color: colors.text.primary,
                      }}
                    >
                      {producerStats.avgYield}
                    </p>
                    <p
                      style={{
                        fontSize: typography.sizes.xs,
                        color: colors.text.secondary,
                      }}
                    >
                      Avg. Yield
                    </p>
                  </div>
                  <div className="text-center">
                    <p
                      style={{
                        fontSize: typography.sizes.base,
                        fontWeight: typography.weights.bold,
                        color: colors.accent.gold,
                      }}
                    >
                      {producerStats.marketPrice}
                    </p>
                    <p
                      style={{
                        fontSize: typography.sizes.xs,
                        color: colors.text.secondary,
                      }}
                    >
                      Market Price
                    </p>
                  </div>
                </div>
              </DSCard>
            </motion.div>
          )}

          {/* Commodity Entries */}
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <DSCard variant="elevated" padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      style={{
                        fontSize: typography.sizes.lg,
                        fontWeight: typography.weights.semibold,
                        color: colors.blue.primary,
                      }}
                    >
                      Commodity #{index + 1}
                    </h3>
                    {entries.length > 1 && (
                      <button
                        onClick={() => handleRemoveEntry(entry.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={18} style={{ color: colors.status.error }} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category Dropdown */}
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
                        value={entry.category}
                        onValueChange={(value) => handleUpdateEntry(entry.id, "category", value)}
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

                    {/* Commodity Dropdown */}
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
                        value={entry.commodity}
                        onValueChange={(value) => handleUpdateEntry(entry.id, "commodity", value)}
                        disabled={!entry.category}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select commodity" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableCommodities(entry.category).map((comm) => (
                            <SelectItem key={comm.name} value={comm.name}>
                              {comm.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Variety Selection */}
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
                        value={entry.variety}
                        onValueChange={(value) => handleUpdateEntry(entry.id, "variety", value)}
                        disabled={!entry.commodity}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select variety" />
                        </SelectTrigger>
                        <SelectContent>
                          {getVarieties(entry.category, entry.commodity).map((variety) => (
                            <SelectItem key={variety} value={variety}>
                              {variety}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Area Input */}
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
                        Area to be Sown *
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          min="0"
                          step="0.1"
                          value={entry.area || ""}
                          onChange={(e) =>
                            handleUpdateEntry(entry.id, "area", parseFloat(e.target.value) || 0)
                          }
                          placeholder="Enter area"
                          className="flex-1"
                        />
                        <Select
                          value={entry.unit}
                          onValueChange={(value) => handleUpdateEntry(entry.id, "unit", value)}
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
                        value={entry.expectedYield || ""}
                        onChange={(e) =>
                          handleUpdateEntry(entry.id, "expectedYield", parseFloat(e.target.value) || 0)
                        }
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  {/* Media Upload */}
                  <div className="flex gap-2 mt-4">
                    <DSButton variant="outline" size="sm" leftIcon={<Camera size={16} />}>
                      Upload Soil Photo
                    </DSButton>
                    <DSButton variant="outline" size="sm" leftIcon={<Mic size={16} />}>
                      Voice Note
                    </DSButton>
                    <DSButton variant="outline" size="sm" leftIcon={<FileText size={16} />}>
                      Add Document
                    </DSButton>
                  </div>
                </DSCard>
              </motion.div>
            ))}

            {/* Add More Button */}
            <DSButton
              variant="outline"
              size="md"
              fullWidth
              leftIcon={<Plus size={20} />}
              onClick={handleAddEntry}
            >
              Add Another Commodity
            </DSButton>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 sticky bottom-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border"
            style={{ borderColor: colors.border.light }}
          >
            <DSButton variant="outline" size="lg" fullWidth onClick={onClose}>
              Cancel
            </DSButton>
            <DSButton
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<Save size={20} />}
              onClick={handleSave}
            >
              Save & Post Requirement
            </DSButton>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <DSCard variant="elevated" padding="lg">
            <h3
              style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
                marginBottom: spacing.md,
              }}
            >
              📜 Past Requirements
            </h3>
            
            {/* Mock history data */}
            <div className="space-y-3">
              {[
                { crop: "Wheat PBW 343", area: "5 acres", date: "Oct 15, 2024", status: "Sown" },
                { crop: "Mustard Pusa Bold", area: "3 acres", date: "Sep 20, 2024", status: "Planning" },
                { crop: "Chickpea Kabuli", area: "2 acres", date: "Sep 10, 2024", status: "Harvested" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border flex items-center justify-between"
                  style={{
                    backgroundColor: colors.surface.secondary,
                    borderColor: colors.border.default,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Leaf size={20} style={{ color: colors.status.success }} />
                    <div>
                      <p
                        style={{
                          fontSize: typography.sizes.sm,
                          fontWeight: typography.weights.semibold,
                          color: colors.text.primary,
                        }}
                      >
                        {item.crop}
                      </p>
                      <p
                        style={{
                          fontSize: typography.sizes.xs,
                          color: colors.text.secondary,
                        }}
                      >
                        {item.area} • {item.date}
                      </p>
                    </div>
                  </div>
                  <DSBadge
                    variant={
                      item.status === "Sown"
                        ? "success"
                        : item.status === "Planning"
                        ? "warning"
                        : "blue"
                    }
                    size="sm"
                  >
                    {item.status}
                  </DSBadge>
                </div>
              ))}
            </div>
          </DSCard>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          {/* Insights Grid */}
          {aiInsights.length > 0 ? (
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
                  Select a commodity to see AI-powered insights
                </p>
              </div>
            </DSCard>
          )}

          {/* Ask Grok AI */}
          <DSCard variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${colors.accent.gold}20` }}
              >
                <Bot size={24} style={{ color: colors.accent.gold }} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: typography.sizes.lg,
                    fontWeight: typography.weights.semibold,
                    color: colors.blue.primary,
                  }}
                >
                  Ask Grok AI
                </h3>
                <p
                  style={{
                    fontSize: typography.sizes.sm,
                    color: colors.text.secondary,
                  }}
                >
                  Get personalized advice and risk analysis
                </p>
              </div>
            </div>

            {/* Quick Questions */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "Best time to sow?",
                "Soil preparation tips?",
                "Market forecast?",
                "Government schemes?",
                "Risk analysis?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setGrokQuery(q);
                    handleGrokQuery();
                  }}
                  className="px-3 py-1.5 rounded-full text-sm transition-colors"
                  style={{
                    backgroundColor: `${colors.accent.gold}15`,
                    color: colors.text.primary,
                    border: `1px solid ${colors.accent.gold}40`,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Query Input */}
            <div className="flex gap-2 mb-3">
              <Input
                value={grokQuery}
                onChange={(e) => setGrokQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleGrokQuery()}
                placeholder="Type your question or use voice..."
                className="flex-1"
              />
              <DSButton variant="outline" size="md" onClick={handleGrokQuery}>
                <Mic size={18} />
              </DSButton>
              <DSButton variant="primary" size="md" onClick={handleGrokQuery} disabled={isAnalyzing}>
                {isAnalyzing ? "..." : "Ask"}
              </DSButton>
            </div>

            {/* Response */}
            {grokResponse && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: colors.surface.secondary,
                }}
              >
                <div className="flex items-start gap-2">
                  <Bot size={16} className="flex-shrink-0 mt-0.5" style={{ color: colors.accent.gold }} />
                  <p
                    style={{
                      fontSize: typography.sizes.sm,
                      color: colors.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {grokResponse}
                  </p>
                </div>
              </motion.div>
            )}
          </DSCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
