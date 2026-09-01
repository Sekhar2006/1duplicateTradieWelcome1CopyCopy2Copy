import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sprout,
  Droplet,
  Sun,
  Leaf,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  X,
  Save,
  Plus,
  Eye,
  FileText,
  DollarSign,
  Target,
  Activity,
  Sparkles,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { toast } from "sonner@2.0.3";

const { colors } = designTokens;

// Comprehensive commodity database
const commodityDatabase = {
  "Cereals & Grains": {
    commodities: [
      { name: "Wheat", varieties: ["PBW 343", "HD 2967", "DBW 17", "Lok 1", "WH 542"], season: "Rabi", duration: "120-150 days" },
      { name: "Rice", varieties: ["Basmati", "IR64", "Sona Masuri", "Swarna", "Pusa 1121"], season: "Kharif", duration: "120-160 days" },
      { name: "Maize", varieties: ["DHM 117", "Vivek Hybrid", "Ganga 5", "HQPM 1"], season: "Both", duration: "90-120 days" },
      { name: "Barley", varieties: ["RD 2552", "PL 426", "BH 393"], season: "Rabi", duration: "110-130 days" },
      { name: "Sorghum", varieties: ["CSH 16", "SPV 462", "M 35-1"], season: "Kharif", duration: "100-140 days" },
    ],
  },
  "Pulses & Legumes": {
    commodities: [
      { name: "Chickpea", varieties: ["Kabuli", "Desi", "Chafa", "JG 130"], season: "Rabi", duration: "100-120 days" },
      { name: "Pigeon Pea", varieties: ["Asha", "Amar", "Bahar", "ICPL 87119"], season: "Kharif", duration: "150-180 days" },
      { name: "Lentil", varieties: ["Masoor", "Malka", "PL 406", "JL 3"], season: "Rabi", duration: "110-130 days" },
      { name: "Mung Bean", varieties: ["Pusa Bold", "Pusa Vishal", "IPM 02-14"], season: "Summer", duration: "60-70 days" },
      { name: "Black Gram", varieties: ["T9", "Pant U19", "PU 31"], season: "Kharif", duration: "70-90 days" },
    ],
  },
  Spices: {
    commodities: [
      { name: "Turmeric", varieties: ["Alleppey Finger", "Rajapore", "Erode", "Salem"], season: "Kharif", duration: "7-9 months" },
      { name: "Red Chili", varieties: ["Teja", "Sannam", "Byadgi", "Guntur", "Kashmiri"], season: "Both", duration: "150-180 days" },
      { name: "Coriander", varieties: ["Eagle", "Scooter", "Sadhana", "Badami"], season: "Rabi", duration: "90-110 days" },
      { name: "Cumin", varieties: ["Gujarat", "Rajasthan", "Kota", "Unjha"], season: "Rabi", duration: "100-120 days" },
    ],
  },
  Vegetables: {
    commodities: [
      { name: "Tomato", varieties: ["Pusa Ruby", "Roma", "Cherry", "Arka Vikas"], season: "Both", duration: "60-90 days" },
      { name: "Onion", varieties: ["Nasik Red", "Poona White", "Agrifound Dark Red"], season: "Rabi", duration: "120-150 days" },
      { name: "Potato", varieties: ["Kufri Jyoti", "Kufri Pukhraj", "Kufri Badshah"], season: "Rabi", duration: "90-120 days" },
      { name: "Cabbage", varieties: ["Pride of India", "Golden Acre", "Pusa Mukta"], season: "Rabi", duration: "80-100 days" },
    ],
  },
  Fruits: {
    commodities: [
      { name: "Mango", varieties: ["Alphonso", "Dasheri", "Langra", "Kesar"], season: "Perennial", duration: "100-150 days (fruiting)" },
      { name: "Banana", varieties: ["Robusta", "Dwarf Cavendish", "Rasthali"], season: "Perennial", duration: "9-12 months" },
      { name: "Grapes", varieties: ["Thompson Seedless", "Bangalore Blue"], season: "Perennial", duration: "4-5 months" },
    ],
  },
  Oilseeds: {
    commodities: [
      { name: "Groundnut", varieties: ["TMV 13", "Kadiri", "TAG 24", "ICGS 76"], season: "Kharif", duration: "100-130 days" },
      { name: "Mustard", varieties: ["Pusa Bold", "Varuna", "Kranti", "RH 30"], season: "Rabi", duration: "90-120 days" },
      { name: "Sunflower", varieties: ["KBSH 1", "PSH 569", "Morden"], season: "Both", duration: "90-110 days" },
      { name: "Soybean", varieties: ["JS 335", "JS 93-05", "MAUS 71"], season: "Kharif", duration: "90-120 days" },
    ],
  },
};

interface CropStage {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  duration: string;
  completed: boolean;
  activities: string[];
}

interface CropLifecycle {
  category: string;
  commodity: string;
  variety: string;
  area: number;
  unit: "acres" | "hectares";
  sowingDate: string;
  expectedHarvestDate: string;
  currentStage: number;
  stages: CropStage[];
  notes: string;
}

const defaultStages: CropStage[] = [
  {
    id: "selection",
    name: "Crop Selection",
    icon: <Target className="w-5 h-5" />,
    description: "Choose crop based on season, soil, and market demand",
    duration: "1-2 days",
    completed: false,
    activities: [
      "Soil testing",
      "Market research",
      "Season planning",
      "Variety selection",
    ],
  },
  {
    id: "land-prep",
    name: "Land Preparation",
    icon: <Activity className="w-5 h-5" />,
    description: "Prepare field for sowing",
    duration: "5-7 days",
    completed: false,
    activities: [
      "Ploughing",
      "Leveling",
      "Fertilizer application",
      "Irrigation setup",
    ],
  },
  {
    id: "sowing",
    name: "Sowing/Planting",
    icon: <Sprout className="w-5 h-5" />,
    description: "Plant seeds or seedlings",
    duration: "1-3 days",
    completed: false,
    activities: [
      "Seed treatment",
      "Sowing",
      "Spacing",
      "Initial watering",
    ],
  },
  {
    id: "germination",
    name: "Germination",
    icon: <Sun className="w-5 h-5" />,
    description: "Seeds sprout and emerge",
    duration: "5-15 days",
    completed: false,
    activities: [
      "Monitor emergence",
      "Light irrigation",
      "Weed control",
      "Pest watch",
    ],
  },
  {
    id: "vegetative",
    name: "Vegetative Growth",
    icon: <Leaf className="w-5 h-5" />,
    description: "Plant develops leaves and stems",
    duration: "30-60 days",
    completed: false,
    activities: [
      "Regular irrigation",
      "Fertilizer top-dressing",
      "Pest management",
      "Weed management",
    ],
  },
  {
    id: "flowering",
    name: "Flowering/Fruiting",
    icon: <Sparkles className="w-5 h-5" />,
    description: "Flowers bloom, fruits form",
    duration: "20-40 days",
    completed: false,
    activities: [
      "Pollination support",
      "Nutrient spray",
      "Disease control",
      "Water management",
    ],
  },
  {
    id: "maturation",
    name: "Maturation",
    icon: <TrendingUp className="w-5 h-5" />,
    description: "Crop reaches harvest readiness",
    duration: "15-30 days",
    completed: false,
    activities: [
      "Monitor maturity",
      "Reduce irrigation",
      "Pre-harvest prep",
      "Quality assessment",
    ],
  },
  {
    id: "harvesting",
    name: "Harvesting",
    icon: <CheckCircle2 className="w-5 h-5" />,
    description: "Collect mature crop",
    duration: "3-7 days",
    completed: false,
    activities: [
      "Harvest timing",
      "Manual/mechanical harvest",
      "Collection",
      "Initial sorting",
    ],
  },
  {
    id: "post-harvest",
    name: "Post-Harvest",
    icon: <FileText className="w-5 h-5" />,
    description: "Process and prepare for market",
    duration: "5-10 days",
    completed: false,
    activities: [
      "Cleaning",
      "Grading",
      "Packaging",
      "Storage/Transport",
    ],
  },
];

export function CropLifecycleTracker({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState<"select" | "track">("select");
  const [lifecycle, setLifecycle] = useState<CropLifecycle>({
    category: "",
    commodity: "",
    variety: "",
    area: 0,
    unit: "acres",
    sowingDate: "",
    expectedHarvestDate: "",
    currentStage: 0,
    stages: defaultStages,
    notes: "",
  });

  const [savedCrops, setSavedCrops] = useState<CropLifecycle[]>([]);
  const [viewMode, setViewMode] = useState<"create" | "view">("create");

  const getAvailableCommodities = (category: string) => {
    if (!category || !commodityDatabase[category as keyof typeof commodityDatabase]) return [];
    return commodityDatabase[category as keyof typeof commodityDatabase].commodities;
  };

  const getVarieties = (category: string, commodity: string) => {
    if (!category || !commodity) return [];
    const categoryData = commodityDatabase[category as keyof typeof commodityDatabase];
    if (!categoryData) return [];
    const commodityData = categoryData.commodities.find((c) => c.name === commodity);
    return commodityData?.varieties || [];
  };

  const calculateExpectedHarvestDate = (sowingDate: string, commodity: string) => {
    if (!sowingDate) return "";
    
    const sowing = new Date(sowingDate);
    // Default duration based on commodity type (in days)
    const durations: { [key: string]: number } = {
      Wheat: 135,
      Rice: 140,
      Maize: 105,
      Chickpea: 110,
      Turmeric: 240,
      Tomato: 75,
      Mango: 120,
      Groundnut: 115,
    };
    
    const duration = durations[commodity] || 120;
    const harvest = new Date(sowing.getTime() + duration * 24 * 60 * 60 * 1000);
    return harvest.toISOString().split('T')[0];
  };

  const handleCategoryChange = (category: string) => {
    setLifecycle({
      ...lifecycle,
      category,
      commodity: "",
      variety: "",
    });
  };

  const handleCommodityChange = (commodity: string) => {
    const expectedHarvest = calculateExpectedHarvestDate(lifecycle.sowingDate, commodity);
    setLifecycle({
      ...lifecycle,
      commodity,
      variety: "",
      expectedHarvestDate: expectedHarvest,
    });
  };

  const handleSowingDateChange = (date: string) => {
    const expectedHarvest = calculateExpectedHarvestDate(date, lifecycle.commodity);
    setLifecycle({
      ...lifecycle,
      sowingDate: date,
      expectedHarvestDate: expectedHarvest,
    });
  };

  const handleStartTracking = () => {
    if (!lifecycle.category || !lifecycle.commodity || !lifecycle.variety) {
      toast.error("Please fill all required fields");
      return;
    }

    // Mark first stage as completed
    const updatedStages = [...lifecycle.stages];
    updatedStages[0].completed = true;

    setLifecycle({
      ...lifecycle,
      stages: updatedStages,
      currentStage: 1,
    });
    setStep("track");
    toast.success("Crop lifecycle tracking started!");
  };

  const handleStageComplete = (stageIndex: number) => {
    const updatedStages = [...lifecycle.stages];
    updatedStages[stageIndex].completed = true;

    setLifecycle({
      ...lifecycle,
      stages: updatedStages,
      currentStage: Math.min(stageIndex + 1, lifecycle.stages.length - 1),
    });

    toast.success(`${lifecycle.stages[stageIndex].name} marked as complete!`);
  };

  const handleSaveCrop = () => {
    setSavedCrops([...savedCrops, { ...lifecycle }]);
    toast.success("Crop lifecycle saved successfully!");
    
    // Reset for new crop
    setLifecycle({
      category: "",
      commodity: "",
      variety: "",
      area: 0,
      unit: "acres",
      sowingDate: "",
      expectedHarvestDate: "",
      currentStage: 0,
      stages: defaultStages.map(s => ({ ...s, completed: false })),
      notes: "",
    });
    setStep("select");
  };

  const calculateProgress = () => {
    const completedStages = lifecycle.stages.filter(s => s.completed).length;
    return (completedStages / lifecycle.stages.length) * 100;
  };

  const getDaysToHarvest = () => {
    if (!lifecycle.expectedHarvestDate) return null;
    const today = new Date();
    const harvest = new Date(lifecycle.expectedHarvestDate);
    const diff = Math.ceil((harvest.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl" style={{ color: colors.blue.primary }}>
              Crop Lifecycle Tracker
            </h1>
            <p className="text-slate-600 mt-1">
              Track your crop from selection to harvesting
            </p>
          </div>
          <div className="flex gap-3">
            {step === "track" && (
              <DSButton
                variant="outline"
                onClick={() => setStep("select")}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </DSButton>
            )}
            {savedCrops.length > 0 && (
              <DSButton
                variant="outline"
                onClick={() => setViewMode(viewMode === "create" ? "view" : "create")}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Saved Crops ({savedCrops.length})
              </DSButton>
            )}
            {onClose && (
              <DSButton variant="ghost" onClick={onClose}>
                <X className="w-4 h-4" />
              </DSButton>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* View Saved Crops */}
          {viewMode === "view" && (
            <motion.div
              key="saved-crops"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DSCard className="p-6">
                <h2 className="text-xl mb-4" style={{ color: colors.blue.primary }}>
                  Saved Crop Lifecycles
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {savedCrops.map((crop, index) => (
                    <DSCard key={index} variant="elevated" className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{crop.commodity}</h3>
                          <p className="text-sm text-slate-600">{crop.variety}</p>
                        </div>
                        <DSBadge variant="success">
                          {crop.stages.filter(s => s.completed).length}/{crop.stages.length} Stages
                        </DSBadge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Area:</span>
                          <span>{crop.area} {crop.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Sowing Date:</span>
                          <span>{new Date(crop.sowingDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Expected Harvest:</span>
                          <span>{new Date(crop.expectedHarvestDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Progress value={(crop.stages.filter(s => s.completed).length / crop.stages.length) * 100} className="mt-3" />
                    </DSCard>
                  ))}
                </div>
              </DSCard>
            </motion.div>
          )}

          {/* Step 1: Crop Selection */}
          {viewMode === "create" && step === "select" && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <DSCard className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl" style={{ color: colors.blue.primary }}>
                      Step 1: Crop Selection
                    </h2>
                    <p className="text-slate-600">Choose your crop and planting details</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={lifecycle.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger id="category">
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
                    <Label htmlFor="commodity">Commodity *</Label>
                    <Select
                      value={lifecycle.commodity}
                      onValueChange={handleCommodityChange}
                      disabled={!lifecycle.category}
                    >
                      <SelectTrigger id="commodity">
                        <SelectValue placeholder="Select commodity" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableCommodities(lifecycle.category).map((comm) => (
                          <SelectItem key={comm.name} value={comm.name}>
                            {comm.name} ({comm.season} - {comm.duration})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Variety */}
                  <div>
                    <Label htmlFor="variety">Variety *</Label>
                    <Select
                      value={lifecycle.variety}
                      onValueChange={(v) => setLifecycle({ ...lifecycle, variety: v })}
                      disabled={!lifecycle.commodity}
                    >
                      <SelectTrigger id="variety">
                        <SelectValue placeholder="Select variety" />
                      </SelectTrigger>
                      <SelectContent>
                        {getVarieties(lifecycle.category, lifecycle.commodity).map((variety) => (
                          <SelectItem key={variety} value={variety}>
                            {variety}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Area */}
                  <div>
                    <Label htmlFor="area">Area Cultivated *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="area"
                        type="number"
                        value={lifecycle.area || ""}
                        onChange={(e) => setLifecycle({ ...lifecycle, area: parseFloat(e.target.value) })}
                        placeholder="Enter area"
                        className="flex-1"
                      />
                      <Select
                        value={lifecycle.unit}
                        onValueChange={(u: "acres" | "hectares") => setLifecycle({ ...lifecycle, unit: u })}
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

                  {/* Sowing Date */}
                  <div>
                    <Label htmlFor="sowingDate">Sowing Date *</Label>
                    <Input
                      id="sowingDate"
                      type="date"
                      value={lifecycle.sowingDate}
                      onChange={(e) => handleSowingDateChange(e.target.value)}
                    />
                  </div>

                  {/* Expected Harvest Date */}
                  <div>
                    <Label htmlFor="harvestDate">Expected Harvest Date</Label>
                    <Input
                      id="harvestDate"
                      type="date"
                      value={lifecycle.expectedHarvestDate}
                      onChange={(e) => setLifecycle({ ...lifecycle, expectedHarvestDate: e.target.value })}
                      disabled
                    />
                    <p className="text-xs text-slate-500 mt-1">Auto-calculated based on crop type</p>
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-6">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={lifecycle.notes}
                    onChange={(e) => setLifecycle({ ...lifecycle, notes: e.target.value })}
                    placeholder="Add any additional notes about this crop..."
                    rows={3}
                  />
                </div>

                {/* Action Button */}
                <div className="mt-8 flex justify-end">
                  <DSButton onClick={handleStartTracking} size="lg">
                    Start Lifecycle Tracking
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </DSButton>
                </div>
              </DSCard>
            </motion.div>
          )}

          {/* Step 2: Track Lifecycle */}
          {viewMode === "create" && step === "track" && (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Summary Card */}
              <DSCard className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl mb-1" style={{ color: colors.blue.primary }}>
                      {lifecycle.commodity} - {lifecycle.variety}
                    </h2>
                    <p className="text-slate-600">{lifecycle.category}</p>
                    <p className="text-sm text-slate-500 mt-2">
                      {lifecycle.area} {lifecycle.unit} • Sown on {new Date(lifecycle.sowingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    {getDaysToHarvest() !== null && (
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="text-2xl font-bold" style={{ color: colors.status.success }}>
                          {getDaysToHarvest()}
                        </div>
                        <p className="text-xs text-slate-600">days to harvest</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-slate-600">{Math.round(calculateProgress())}%</span>
                  </div>
                  <Progress value={calculateProgress()} />
                </div>
              </DSCard>

              {/* Lifecycle Stages */}
              <DSCard className="p-6">
                <h3 className="text-xl mb-6" style={{ color: colors.blue.primary }}>
                  Crop Lifecycle Stages
                </h3>

                <div className="space-y-6">
                  {lifecycle.stages.map((stage, index) => (
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative ${
                        index < lifecycle.stages.length - 1 ? "pb-6" : ""
                      }`}
                    >
                      {/* Connecting Line */}
                      {index < lifecycle.stages.length - 1 && (
                        <div
                          className={`absolute left-6 top-12 w-0.5 h-full ${
                            stage.completed ? "bg-green-500" : "bg-slate-200"
                          }`}
                        />
                      )}

                      <div
                        className={`relative flex gap-4 p-4 rounded-lg border-2 transition-all ${
                          stage.completed
                            ? "bg-green-50 border-green-200"
                            : index === lifecycle.currentStage
                            ? "bg-blue-50 border-blue-200"
                            : "bg-white border-slate-200"
                        }`}
                      >
                        {/* Stage Icon */}
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                            stage.completed
                              ? "bg-green-500 text-white"
                              : index === lifecycle.currentStage
                              ? "bg-blue-500 text-white"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {stage.completed ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            stage.icon
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-lg">{stage.name}</h4>
                              <p className="text-sm text-slate-600">{stage.description}</p>
                              <p className="text-xs text-slate-500 mt-1">
                                <Clock className="w-3 h-3 inline mr-1" />
                                {stage.duration}
                              </p>
                            </div>
                            {!stage.completed && index <= lifecycle.currentStage && (
                              <DSButton
                                size="sm"
                                onClick={() => handleStageComplete(index)}
                              >
                                Mark Complete
                              </DSButton>
                            )}
                          </div>

                          {/* Activities */}
                          <div className="mt-3">
                            <p className="text-sm font-medium text-slate-700 mb-2">Key Activities:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {stage.activities.map((activity, i) => (
                                <div
                                  key={i}
                                  className={`text-sm flex items-center gap-2 ${
                                    stage.completed ? "text-green-700" : "text-slate-600"
                                  }`}
                                >
                                  {stage.completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Circle className="w-4 h-4" />
                                  )}
                                  {activity}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Save Button */}
                {lifecycle.stages[lifecycle.stages.length - 1].completed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-green-50 rounded-lg border-2 border-green-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-green-900 mb-1">
                          🎉 Crop Lifecycle Complete!
                        </h4>
                        <p className="text-green-700">
                          All stages completed successfully. Save this crop record for future reference.
                        </p>
                      </div>
                      <DSButton onClick={handleSaveCrop} size="lg">
                        <Save className="w-5 h-5 mr-2" />
                        Save Crop Record
                      </DSButton>
                    </div>
                  </motion.div>
                )}
              </DSCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
