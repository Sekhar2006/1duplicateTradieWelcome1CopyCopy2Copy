import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Camera,
  Mic,
  Video,
  Plus,
  Check,
  AlertCircle,
  Sprout,
  Droplets,
  Leaf,
  Bug,
  Scissors,
  Package,
  TrendingUp,
  FileText,
  User,
  X,
  Clock,
  Image as ImageIcon,
  Play,
  ChevronRight,
  ChevronLeft,
  Eye,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "sonner@2.0.3";
import { format } from "date-fns";
import { grokAI } from "./GrokAIService";

const { colors, typography, spacing } = designTokens;

export interface ActivityMedia {
  id: string;
  type: "photo" | "video" | "voice";
  url: string;
  timestamp: Date;
  caption?: string;
}

export interface Activity {
  id: string;
  type: string;
  date: Date;
  completed: boolean;
  status: "completed" | "due" | "overdue";
  
  // Common fields
  remarks?: string;
  media: ActivityMedia[];
  voiceNote?: string;
  
  // Ploughing
  ploughingMethod?: "manual" | "tractor" | "bullock";
  
  // Sowing
  sowingMethod?: "direct" | "transplanting" | "broadcasting" | "drill";
  seedSource?: string;
  seedVariety?: string;
  
  // Irrigation
  irrigationType?: "drip" | "flood" | "sprinkler" | "manual";
  waterVolume?: number;
  waterUnit?: "liters" | "cubic_meters";
  
  // Fertilizer
  fertilizerType?: "npk" | "organic" | "compost" | "biofertilizer" | "foliar";
  nValue?: number;
  pValue?: number;
  kValue?: number;
  fertilizerName?: string;
  dosage?: string;
  applicationMethod?: string;
  
  // Pesticide
  pesticideType?: "insecticide" | "fungicide" | "weedicide" | "nematicide" | "organic";
  chemicalName?: string;
  pesticideDosage?: string;
  pesticideMethod?: string;
  preHarvestInterval?: number;
  
  // Weeding
  weedingMethod?: "manual" | "mechanical" | "chemical";
  timeTaken?: number;
  
  // Mulching
  mulchingType?: string;
  mulchingReason?: string;
  
  // Intercultural
  interculturalOperation?: string;
  
  // Pest scouting
  symptoms?: string;
  actionTaken?: string;
  
  // Health check
  cropHeight?: number;
  leafColor?: string;
  biomassIndex?: string;
  growthStage?: string;
  healthNotes?: string;
  
  // Pruning
  pruningMethod?: string;
  
  // Harvesting
  harvestType?: "partial" | "final" | "selective";
  yieldEstimate?: number;
  yieldUnit?: "kg" | "quintals" | "tons";
  actualYield?: number;
  
  // Post-harvest
  postHarvestActivity?: "drying" | "storage" | "grading" | "packing" | "transport" | "sale";
  location?: string;
  output?: string;
  salePrice?: number;
  
  // Inspection
  inspectedBy?: string;
  inspectionPurpose?: string;
  inspectionNotes?: string;
  
  // AI Analysis
  aiWarnings?: string[];
  aiSuggestions?: string[];
  riskLevel?: "low" | "medium" | "high";
}

const activityTypes = [
  {
    id: "ploughing",
    label: "Ploughing",
    icon: <Sprout size={20} />,
    color: "#8B4513",
  },
  {
    id: "sowing",
    label: "Sowing/Transplanting",
    icon: <Sprout size={20} />,
    color: "#22C55E",
  },
  {
    id: "irrigation",
    label: "Irrigation/Watering",
    icon: <Droplets size={20} />,
    color: "#3B82F6",
  },
  {
    id: "fertilizer",
    label: "Fertilizer Application",
    icon: <Leaf size={20} />,
    color: "#10B981",
  },
  {
    id: "pesticide",
    label: "Pesticide/Fungicide",
    icon: <Bug size={20} />,
    color: "#EF4444",
  },
  {
    id: "weeding",
    label: "Weeding",
    icon: <Leaf size={20} />,
    color: "#F59E0B",
  },
  {
    id: "mulching",
    label: "Mulching/Soil Amendment",
    icon: <Leaf size={20} />,
    color: "#84CC16",
  },
  {
    id: "intercultural",
    label: "Intercultural Operations",
    icon: <Scissors size={20} />,
    color: "#8B5CF6",
  },
  {
    id: "pest-scouting",
    label: "Disease/Pest Scouting",
    icon: <Bug size={20} />,
    color: "#DC2626",
  },
  {
    id: "health-check",
    label: "Crop Health Check",
    icon: <TrendingUp size={20} />,
    color: "#059669",
  },
  {
    id: "pruning",
    label: "Pruning/Training",
    icon: <Scissors size={20} />,
    color: "#7C3AED",
  },
  {
    id: "harvesting",
    label: "Harvesting",
    icon: <Package size={20} />,
    color: "#D97706",
  },
  {
    id: "post-harvest",
    label: "Post-Harvest",
    icon: <Package size={20} />,
    color: "#92400E",
  },
  {
    id: "inspection",
    label: "Field Visit/Inspection",
    icon: <User size={20} />,
    color: "#1E40AF",
  },
  {
    id: "custom",
    label: "Custom Activity",
    icon: <FileText size={20} />,
    color: "#6B7280",
  },
];

interface ActivityLoggerEnhancedProps {
  cropId?: string;
  cropName?: string;
  onActivitiesUpdate?: (activities: Activity[]) => void;
  existingActivities?: Activity[];
}

export function ActivityLoggerEnhanced({
  cropId = "default-crop",
  cropName = "My Crop",
  onActivitiesUpdate = () => {},
  existingActivities = [],
}: ActivityLoggerEnhancedProps) {
  const [activities, setActivities] = useState<Activity[]>(existingActivities);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [selectedActivityMedia, setSelectedActivityMedia] = useState<ActivityMedia[]>([]);
  
  // Form state - Common
  const [activityType, setActivityType] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [remarks, setRemarks] = useState("");
  const [media, setMedia] = useState<ActivityMedia[]>([]);
  const [voiceNote, setVoiceNote] = useState("");
  
  // Ploughing
  const [ploughingMethod, setPloughingMethod] = useState<"manual" | "tractor" | "bullock">("manual");
  
  // Sowing
  const [sowingMethod, setSowingMethod] = useState("");
  const [seedSource, setSeedSource] = useState("");
  const [seedVariety, setSeedVariety] = useState("");
  
  // Irrigation
  const [irrigationType, setIrrigationType] = useState("");
  const [waterVolume, setWaterVolume] = useState("");
  const [waterUnit, setWaterUnit] = useState<"liters" | "cubic_meters">("liters");
  
  // Fertilizer
  const [fertilizerType, setFertilizerType] = useState("");
  const [nValue, setNValue] = useState("");
  const [pValue, setPValue] = useState("");
  const [kValue, setKValue] = useState("");
  const [fertilizerName, setFertilizerName] = useState("");
  const [dosage, setDosage] = useState("");
  const [applicationMethod, setApplicationMethod] = useState("");
  
  // Pesticide
  const [pesticideType, setPesticideType] = useState("");
  const [chemicalName, setChemicalName] = useState("");
  const [pesticideDosage, setPesticideDosage] = useState("");
  const [pesticideMethod, setPesticideMethod] = useState("");
  const [preHarvestInterval, setPreHarvestInterval] = useState("");
  
  // Weeding
  const [weedingMethod, setWeedingMethod] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  
  // Mulching
  const [mulchingType, setMulchingType] = useState("");
  const [mulchingReason, setMulchingReason] = useState("");
  
  // Intercultural
  const [interculturalOperation, setInterculturalOperation] = useState("");
  
  // Pest scouting
  const [symptoms, setSymptoms] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  
  // Health check
  const [cropHeight, setCropHeight] = useState("");
  const [leafColor, setLeafColor] = useState("");
  const [biomassIndex, setBiomassIndex] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [healthNotes, setHealthNotes] = useState("");
  
  // Pruning
  const [pruningMethod, setPruningMethod] = useState("");
  
  // Harvesting
  const [harvestType, setHarvestType] = useState("");
  const [yieldEstimate, setYieldEstimate] = useState("");
  const [yieldUnit, setYieldUnit] = useState<"kg" | "quintals" | "tons">("quintals");
  const [actualYield, setActualYield] = useState("");
  
  // Post-harvest
  const [postHarvestActivity, setPostHarvestActivity] = useState("");
  const [location, setLocation] = useState("");
  const [output, setOutput] = useState("");
  const [salePrice, setSalePrice] = useState("");
  
  // Inspection
  const [inspectedBy, setInspectedBy] = useState("");
  const [inspectionPurpose, setInspectionPurpose] = useState("");
  const [inspectionNotes, setInspectionNotes] = useState("");

  const resetForm = () => {
    setActivityType("");
    setDate(new Date());
    setRemarks("");
    setMedia([]);
    setVoiceNote("");
    
    // Reset all specific fields
    setPloughingMethod("manual");
    setSowingMethod("");
    setSeedSource("");
    setSeedVariety("");
    setIrrigationType("");
    setWaterVolume("");
    setFertilizerType("");
    setNValue("");
    setPValue("");
    setKValue("");
    setFertilizerName("");
    setDosage("");
    setApplicationMethod("");
    setPesticideType("");
    setChemicalName("");
    setPesticideDosage("");
    setPesticideMethod("");
    setPreHarvestInterval("");
    setWeedingMethod("");
    setTimeTaken("");
    setMulchingType("");
    setMulchingReason("");
    setInterculturalOperation("");
    setSymptoms("");
    setActionTaken("");
    setCropHeight("");
    setLeafColor("");
    setBiomassIndex("");
    setGrowthStage("");
    setHealthNotes("");
    setPruningMethod("");
    setHarvestType("");
    setYieldEstimate("");
    setActualYield("");
    setPostHarvestActivity("");
    setLocation("");
    setOutput("");
    setSalePrice("");
    setInspectedBy("");
    setInspectionPurpose("");
    setInspectionNotes("");
    
    setEditingActivity(null);
  };

  const handleAddPhoto = () => {
    const newPhoto: ActivityMedia = {
      id: `photo-${Date.now()}`,
      type: "photo",
      url: `https://via.placeholder.com/400x300?text=Crop+Photo`,
      timestamp: new Date(),
    };
    setMedia([...media, newPhoto]);
    toast.success("Photo added (simulated)");
  };

  const handleAddVideo = () => {
    const newVideo: ActivityMedia = {
      id: `video-${Date.now()}`,
      type: "video",
      url: `https://via.placeholder.com/400x300?text=Video`,
      timestamp: new Date(),
    };
    setMedia([...media, newVideo]);
    toast.success("Video added (simulated)");
  };

  const handleAddVoiceNote = () => {
    setVoiceNote(`Voice note recorded at ${format(new Date(), "HH:mm:ss")}`);
    toast.success("Voice note recorded (simulated)");
  };

  const runGrokAnalysis = async (activity: Partial<Activity>) => {
    const warnings: string[] = [];
    const suggestions: string[] = [];
    let riskLevel: "low" | "medium" | "high" = "low";

    // Fertilizer + Pesticide timing check
    if (activity.type === "pesticide") {
      const recentFertilizer = activities.find(
        (a) =>
          a.type === "fertilizer" &&
          new Date(activity.date!).getTime() - new Date(a.date).getTime() < 2 * 24 * 60 * 60 * 1000
      );
      if (recentFertilizer) {
        warnings.push("Pesticide applied within 2 days of fertilizer. This may reduce effectiveness.");
        riskLevel = "medium";
      }
    }

    // Pre-harvest interval check
    if (activity.type === "pesticide" && activity.preHarvestInterval) {
      suggestions.push(
        `Allow ${activity.preHarvestInterval} days before harvesting to ensure safety compliance.`
      );
    }

    // Irrigation scheduling
    if (activity.type === "irrigation") {
      const lastIrrigation = activities
        .filter((a) => a.type === "irrigation")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      
      if (lastIrrigation) {
        const daysSince = (new Date(activity.date!).getTime() - new Date(lastIrrigation.date).getTime()) / (24 * 60 * 60 * 1000);
        if (daysSince < 2) {
          warnings.push("Irrigation frequency may be too high. Check soil moisture.");
          riskLevel = "medium";
        }
      }
    }

    // Pest detection
    if (activity.type === "pest-scouting" && activity.symptoms) {
      if (activity.symptoms.toLowerCase().includes("yellow") || activity.symptoms.toLowerCase().includes("wilting")) {
        warnings.push("Symptoms suggest possible disease. Consider expert consultation.");
        suggestions.push("Upload clear photos for AI disease identification.");
        riskLevel = "high";
      }
    }

    // Health check analysis
    if (activity.type === "health-check") {
      if (activity.leafColor?.toLowerCase().includes("yellow") || activity.leafColor?.toLowerCase().includes("brown")) {
        warnings.push("Leaf discoloration detected. May indicate nutrient deficiency or disease.");
        suggestions.push("Consider soil testing and nutrient analysis.");
        riskLevel = "medium";
      }
    }

    return { warnings, suggestions, riskLevel };
  };

  const handleSaveActivity = async () => {
    if (!activityType) {
      toast.error("Please select an activity type");
      return;
    }

    const newActivity: Activity = {
      id: editingActivity?.id || `activity-${Date.now()}`,
      type: activityType,
      date,
      completed: true,
      status: "completed",
      remarks,
      media,
      voiceNote,
      
      // Specific fields based on type
      ...(activityType === "ploughing" && { ploughingMethod }),
      ...(activityType === "sowing" && { sowingMethod, seedSource, seedVariety }),
      ...(activityType === "irrigation" && {
        irrigationType,
        waterVolume: parseFloat(waterVolume) || undefined,
        waterUnit,
      }),
      ...(activityType === "fertilizer" && {
        fertilizerType,
        nValue: parseFloat(nValue) || undefined,
        pValue: parseFloat(pValue) || undefined,
        kValue: parseFloat(kValue) || undefined,
        fertilizerName,
        dosage,
        applicationMethod,
      }),
      ...(activityType === "pesticide" && {
        pesticideType,
        chemicalName,
        pesticideDosage,
        pesticideMethod,
        preHarvestInterval: parseFloat(preHarvestInterval) || undefined,
      }),
      ...(activityType === "weeding" && {
        weedingMethod,
        timeTaken: parseFloat(timeTaken) || undefined,
      }),
      ...(activityType === "mulching" && { mulchingType, mulchingReason }),
      ...(activityType === "intercultural" && { interculturalOperation }),
      ...(activityType === "pest-scouting" && { symptoms, actionTaken }),
      ...(activityType === "health-check" && {
        cropHeight: parseFloat(cropHeight) || undefined,
        leafColor,
        biomassIndex,
        growthStage,
        healthNotes,
      }),
      ...(activityType === "pruning" && { pruningMethod }),
      ...(activityType === "harvesting" && {
        harvestType,
        yieldEstimate: parseFloat(yieldEstimate) || undefined,
        yieldUnit,
        actualYield: parseFloat(actualYield) || undefined,
      }),
      ...(activityType === "post-harvest" && {
        postHarvestActivity,
        location,
        output,
        salePrice: parseFloat(salePrice) || undefined,
      }),
      ...(activityType === "inspection" && {
        inspectedBy,
        inspectionPurpose,
        inspectionNotes,
      }),
    };

    // Run Grok AI analysis
    const analysis = await runGrokAnalysis(newActivity);
    newActivity.aiWarnings = analysis.warnings;
    newActivity.aiSuggestions = analysis.suggestions;
    newActivity.riskLevel = analysis.riskLevel;

    let updatedActivities: Activity[];
    if (editingActivity) {
      updatedActivities = activities.map((a) => (a.id === editingActivity.id ? newActivity : a));
      toast.success("Activity updated successfully");
    } else {
      updatedActivities = [...activities, newActivity];
      toast.success("Activity logged successfully");
    }

    // Show AI warnings if any
    if (analysis.warnings.length > 0) {
      setTimeout(() => {
        analysis.warnings.forEach((warning) => {
          toast.warning(warning, { duration: 5000 });
        });
      }, 500);
    }

    setActivities(updatedActivities);
    onActivitiesUpdate(updatedActivities);
    setShowAddForm(false);
    resetForm();
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setActivityType(activity.type);
    setDate(activity.date);
    setRemarks(activity.remarks || "");
    setMedia(activity.media || []);
    setVoiceNote(activity.voiceNote || "");
    
    // Load specific fields
    if (activity.ploughingMethod) setPloughingMethod(activity.ploughingMethod);
    if (activity.sowingMethod) setSowingMethod(activity.sowingMethod);
    if (activity.seedSource) setSeedSource(activity.seedSource);
    if (activity.seedVariety) setSeedVariety(activity.seedVariety);
    if (activity.irrigationType) setIrrigationType(activity.irrigationType);
    if (activity.waterVolume) setWaterVolume(activity.waterVolume.toString());
    if (activity.waterUnit) setWaterUnit(activity.waterUnit);
    if (activity.fertilizerType) setFertilizerType(activity.fertilizerType);
    if (activity.nValue) setNValue(activity.nValue.toString());
    if (activity.pValue) setPValue(activity.pValue.toString());
    if (activity.kValue) setKValue(activity.kValue.toString());
    if (activity.fertilizerName) setFertilizerName(activity.fertilizerName);
    if (activity.dosage) setDosage(activity.dosage);
    if (activity.applicationMethod) setApplicationMethod(activity.applicationMethod);
    if (activity.pesticideType) setPesticideType(activity.pesticideType);
    if (activity.chemicalName) setChemicalName(activity.chemicalName);
    if (activity.pesticideDosage) setPesticideDosage(activity.pesticideDosage);
    if (activity.pesticideMethod) setPesticideMethod(activity.pesticideMethod);
    if (activity.preHarvestInterval) setPreHarvestInterval(activity.preHarvestInterval.toString());
    if (activity.weedingMethod) setWeedingMethod(activity.weedingMethod);
    if (activity.timeTaken) setTimeTaken(activity.timeTaken.toString());
    if (activity.mulchingType) setMulchingType(activity.mulchingType);
    if (activity.mulchingReason) setMulchingReason(activity.mulchingReason);
    if (activity.interculturalOperation) setInterculturalOperation(activity.interculturalOperation);
    if (activity.symptoms) setSymptoms(activity.symptoms);
    if (activity.actionTaken) setActionTaken(activity.actionTaken);
    if (activity.cropHeight) setCropHeight(activity.cropHeight.toString());
    if (activity.leafColor) setLeafColor(activity.leafColor);
    if (activity.biomassIndex) setBiomassIndex(activity.biomassIndex);
    if (activity.growthStage) setGrowthStage(activity.growthStage);
    if (activity.healthNotes) setHealthNotes(activity.healthNotes);
    if (activity.pruningMethod) setPruningMethod(activity.pruningMethod);
    if (activity.harvestType) setHarvestType(activity.harvestType);
    if (activity.yieldEstimate) setYieldEstimate(activity.yieldEstimate.toString());
    if (activity.yieldUnit) setYieldUnit(activity.yieldUnit);
    if (activity.actualYield) setActualYield(activity.actualYield.toString());
    if (activity.postHarvestActivity) setPostHarvestActivity(activity.postHarvestActivity);
    if (activity.location) setLocation(activity.location);
    if (activity.output) setOutput(activity.output);
    if (activity.salePrice) setSalePrice(activity.salePrice.toString());
    if (activity.inspectedBy) setInspectedBy(activity.inspectedBy);
    if (activity.inspectionPurpose) setInspectionPurpose(activity.inspectionPurpose);
    if (activity.inspectionNotes) setInspectionNotes(activity.inspectionNotes);
    
    setShowAddForm(true);
  };

  const handleDeleteActivity = (id: string) => {
    const updatedActivities = activities.filter((a) => a.id !== id);
    setActivities(updatedActivities);
    onActivitiesUpdate(updatedActivities);
    toast.success("Activity deleted");
  };

  const handleViewMedia = (activityMedia: ActivityMedia[]) => {
    setSelectedActivityMedia(activityMedia);
    setShowMediaGallery(true);
  };

  const getActivityTypeConfig = (typeId: string) => {
    return activityTypes.find((t) => t.id === typeId);
  };

  const getStatusColor = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return colors.status.success;
      case "due":
        return colors.status.warning;
      case "overdue":
        return colors.status.error;
      default:
        return colors.text.muted;
    }
  };

  const getRiskColor = (risk?: "low" | "medium" | "high") => {
    switch (risk) {
      case "high":
        return colors.status.error;
      case "medium":
        return colors.status.warning;
      case "low":
        return colors.status.success;
      default:
        return colors.text.muted;
    }
  };

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const renderActivitySpecificFields = () => {
    switch (activityType) {
      case "ploughing":
        return (
          <div className="space-y-4">
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Ploughing Method *
              </label>
              <Select value={ploughingMethod} onValueChange={(v: any) => setPloughingMethod(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="tractor">Tractor</SelectItem>
                  <SelectItem value="bullock">Bullock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "sowing":
        return (
          <div className="space-y-4">
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Sowing Method *
              </label>
              <Select value={sowingMethod} onValueChange={setSowingMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">Direct Sowing</SelectItem>
                  <SelectItem value="transplanting">Transplanting</SelectItem>
                  <SelectItem value="broadcasting">Broadcasting</SelectItem>
                  <SelectItem value="drill">Drill Sowing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Seed Variety
                </label>
                <Input value={seedVariety} onChange={(e) => setSeedVariety(e.target.value)} placeholder="e.g., PBW 343" />
              </div>
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Seed Source
                </label>
                <Input value={seedSource} onChange={(e) => setSeedSource(e.target.value)} placeholder="e.g., Government Store" />
              </div>
            </div>
          </div>
        );

      case "irrigation":
        return (
          <div className="space-y-4">
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Irrigation Type *
              </label>
              <Select value={irrigationType} onValueChange={setIrrigationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drip">Drip</SelectItem>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="sprinkler">Sprinkler</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Water Volume
              </label>
              <div className="flex gap-2">
                <Input type="number" value={waterVolume} onChange={(e) => setWaterVolume(e.target.value)} placeholder="Amount" className="flex-1" />
                <Select value={waterUnit} onValueChange={(v: any) => setWaterUnit(v)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="liters">Liters</SelectItem>
                    <SelectItem value="cubic_meters">Cubic m³</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case "fertilizer":
        return (
          <div className="space-y-4">
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Fertilizer Type *
              </label>
              <Select value={fertilizerType} onValueChange={setFertilizerType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="npk">NPK Chemical</SelectItem>
                  <SelectItem value="organic">Organic Manure</SelectItem>
                  <SelectItem value="compost">Compost</SelectItem>
                  <SelectItem value="biofertilizer">Bio-fertilizer</SelectItem>
                  <SelectItem value="foliar">Foliar Spray</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {fertilizerType === "npk" && (
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label style={{ fontSize: typography.sizes.xs, color: colors.text.secondary, display: "block", marginBottom: spacing.xs }}>
                    N (%)
                  </label>
                  <Input type="number" value={nValue} onChange={(e) => setNValue(e.target.value)} placeholder="0" />
                </div>
                <div>
                  <label style={{ fontSize: typography.sizes.xs, color: colors.text.secondary, display: "block", marginBottom: spacing.xs }}>
                    P (%)
                  </label>
                  <Input type="number" value={pValue} onChange={(e) => setPValue(e.target.value)} placeholder="0" />
                </div>
                <div>
                  <label style={{ fontSize: typography.sizes.xs, color: colors.text.secondary, display: "block", marginBottom: spacing.xs }}>
                    K (%)
                  </label>
                  <Input type="number" value={kValue} onChange={(e) => setKValue(e.target.value)} placeholder="0" />
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Product Name
                </label>
                <Input value={fertilizerName} onChange={(e) => setFertilizerName(e.target.value)} placeholder="e.g., Urea, DAP" />
              </div>
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Dosage
                </label>
                <Input value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="e.g., 2 bags/acre" />
              </div>
            </div>
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Application Method
              </label>
              <Input value={applicationMethod} onChange={(e) => setApplicationMethod(e.target.value)} placeholder="e.g., Broadcasting, Basal" />
            </div>
          </div>
        );

      case "pesticide":
        return (
          <div className="space-y-4">
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Pesticide Type *
              </label>
              <Select value={pesticideType} onValueChange={setPesticideType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="insecticide">Insecticide</SelectItem>
                  <SelectItem value="fungicide">Fungicide</SelectItem>
                  <SelectItem value="weedicide">Weedicide</SelectItem>
                  <SelectItem value="nematicide">Nematicide</SelectItem>
                  <SelectItem value="organic">Organic Pest Control</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Chemical Name *
                </label>
                <Input value={chemicalName} onChange={(e) => setChemicalName(e.target.value)} placeholder="e.g., Chlorpyrifos" />
              </div>
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Dosage *
                </label>
                <Input value={pesticideDosage} onChange={(e) => setPesticideDosage(e.target.value)} placeholder="e.g., 2 ml/liter" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Application Method
                </label>
                <Input value={pesticideMethod} onChange={(e) => setPesticideMethod(e.target.value)} placeholder="e.g., Spray, Drench" />
              </div>
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Pre-Harvest Interval (days)
                </label>
                <Input type="number" value={preHarvestInterval} onChange={(e) => setPreHarvestInterval(e.target.value)} placeholder="e.g., 15" />
              </div>
            </div>
          </div>
        );

      case "weeding":
        return (
          <div className="space-y-4">
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Weeding Method *
              </label>
              <Select value={weedingMethod} onValueChange={setWeedingMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="mechanical">Mechanical</SelectItem>
                  <SelectItem value="chemical">Chemical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Time Taken (hours)
              </label>
              <Input type="number" value={timeTaken} onChange={(e) => setTimeTaken(e.target.value)} placeholder="e.g., 4" />
            </div>
          </div>
        );

      case "mulching":
        return (
          <div className="space-y-4">
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Mulching Type *
              </label>
              <Input value={mulchingType} onChange={(e) => setMulchingType(e.target.value)} placeholder="e.g., Organic, Plastic" />
            </div>
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Reason/Comment
              </label>
              <Textarea value={mulchingReason} onChange={(e) => setMulchingReason(e.target.value)} placeholder="Why mulching was done..." rows={2} />
            </div>
          </div>
        );

      case "intercultural":
        return (
          <div className="space-y-4">
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Operation Type *
              </label>
              <Select value={interculturalOperation} onValueChange={setInterculturalOperation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thinning">Thinning</SelectItem>
                  <SelectItem value="earthing-up">Earthing Up</SelectItem>
                  <SelectItem value="gap-filling">Gap Filling</SelectItem>
                  <SelectItem value="propping">Propping</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "pest-scouting":
        return (
          <div className="space-y-4">
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Symptoms Observed *
              </label>
              <Textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Describe what you observed..." rows={3} />
            </div>
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Action Taken
              </label>
              <Textarea value={actionTaken} onChange={(e) => setActionTaken(e.target.value)} placeholder="What action was taken..." rows={2} />
            </div>
          </div>
        );

      case "health-check":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Crop Height (cm)
                </label>
                <Input type="number" value={cropHeight} onChange={(e) => setCropHeight(e.target.value)} placeholder="e.g., 45" />
              </div>
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Leaf Color
                </label>
                <Input value={leafColor} onChange={(e) => setLeafColor(e.target.value)} placeholder="e.g., Dark Green" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Biomass Index
                </label>
                <Input value={biomassIndex} onChange={(e) => setBiomassIndex(e.target.value)} placeholder="e.g., Good, Average" />
              </div>
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Growth Stage
                </label>
                <Select value={growthStage} onValueChange={setGrowthStage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="germination">Germination</SelectItem>
                    <SelectItem value="vegetative">Vegetative</SelectItem>
                    <SelectItem value="tillering">Tillering</SelectItem>
                    <SelectItem value="flowering">Flowering</SelectItem>
                    <SelectItem value="grain-filling">Grain Filling</SelectItem>
                    <SelectItem value="maturity">Maturity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Additional Notes
              </label>
              <Textarea value={healthNotes} onChange={(e) => setHealthNotes(e.target.value)} placeholder="Any observations..." rows={2} />
            </div>
          </div>
        );

      case "pruning":
        return (
          <div className="space-y-4">
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Pruning/Training Method *
              </label>
              <Select value={pruningMethod} onValueChange={setPruningMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pruning">Pruning</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="staking">Staking</SelectItem>
                  <SelectItem value="trellising">Trellising</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "harvesting":
        return (
          <div className="space-y-4">
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Harvest Type *
              </label>
              <Select value={harvestType} onValueChange={setHarvestType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="partial">Partial Harvest</SelectItem>
                  <SelectItem value="final">Final Harvest</SelectItem>
                  <SelectItem value="selective">Selective Picking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Yield Estimate
                </label>
                <div className="flex gap-2">
                  <Input type="number" value={yieldEstimate} onChange={(e) => setYieldEstimate(e.target.value)} placeholder="Amount" className="flex-1" />
                  <Select value={yieldUnit} onValueChange={(v: any) => setYieldUnit(v)}>
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="quintals">quintals</SelectItem>
                      <SelectItem value="tons">tons</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Actual Yield (if known)
                </label>
                <Input type="number" value={actualYield} onChange={(e) => setActualYield(e.target.value)} placeholder="Actual" />
              </div>
            </div>
          </div>
        );

      case "post-harvest":
        return (
          <div className="space-y-4">
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Post-Harvest Activity *
              </label>
              <Select value={postHarvestActivity} onValueChange={setPostHarvestActivity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drying">Drying</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                  <SelectItem value="grading">Grading</SelectItem>
                  <SelectItem value="packing">Packing</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Location/Place
                </label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Warehouse, Market" />
              </div>
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Output/Result
                </label>
                <Input value={output} onChange={(e) => setOutput(e.target.value)} placeholder="e.g., Grade A, 50 bags" />
              </div>
            </div>
            {postHarvestActivity === "sale" && (
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Sale Price (₹/quintal)
                </label>
                <Input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="e.g., 3500" />
              </div>
            )}
          </div>
        );

      case "inspection":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Inspected By *
                </label>
                <Input value={inspectedBy} onChange={(e) => setInspectedBy(e.target.value)} placeholder="Name/Organization" />
              </div>
              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Purpose
                </label>
                <Select value={inspectionPurpose} onValueChange={setInspectionPurpose}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agronomist">Agronomist Visit</SelectItem>
                    <SelectItem value="buyer">Buyer Visit</SelectItem>
                    <SelectItem value="government">Government Inspection</SelectItem>
                    <SelectItem value="self">Self Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                Inspection Notes
              </label>
              <Textarea value={inspectionNotes} onChange={(e) => setInspectionNotes(e.target.value)} placeholder="Findings and recommendations..." rows={3} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.blue.primary }}>
            📅 Activity Log - {cropName}
          </h3>
          <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary, marginTop: spacing.xs }}>
            {activities.length} activities • {activities.filter((a) => a.media.length > 0).length} with evidence
          </p>
        </div>
        <DSButton variant="primary" size="md" leftIcon={<Plus size={18} />} onClick={() => setShowAddForm(true)}>
          Log Activity
        </DSButton>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-3">
        {sortedActivities.length > 0 ? (
          sortedActivities.map((activity) => {
            const typeConfig = getActivityTypeConfig(activity.type);
            return (
              <motion.div key={activity.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <DSCard variant="default" padding="md" className="border-l-4" style={{ borderLeftColor: typeConfig?.color || colors.border.default }}>
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${typeConfig?.color}20`, color: typeConfig?.color }}>
                      {typeConfig?.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                            {typeConfig?.label}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                              {format(new Date(activity.date), "MMM dd, yyyy")}
                            </p>
                            <DSBadge variant="success" size="sm">
                              <Check size={12} /> Completed
                            </DSBadge>
                            {activity.riskLevel && (
                              <DSBadge
                                variant={activity.riskLevel === "high" ? "error" : activity.riskLevel === "medium" ? "warning" : "success"}
                                size="sm"
                              >
                                {activity.riskLevel.toUpperCase()} RISK
                              </DSBadge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* AI Warnings */}
                      {activity.aiWarnings && activity.aiWarnings.length > 0 && (
                        <div className="mb-3 p-3 rounded-lg" style={{ backgroundColor: `${colors.status.warning}10`, borderLeft: `3px solid ${colors.status.warning}` }}>
                          <div className="flex items-start gap-2">
                            <AlertTriangle size={16} style={{ color: colors.status.warning, marginTop: 2 }} />
                            <div className="flex-1">
                              <p style={{ fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: colors.text.primary, marginBottom: 4 }}>
                                Grok AI Warnings:
                              </p>
                              {activity.aiWarnings.map((warning, idx) => (
                                <p key={idx} style={{ fontSize: typography.sizes.xs, color: colors.text.secondary, marginBottom: 2 }}>
                                  • {warning}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* AI Suggestions */}
                      {activity.aiSuggestions && activity.aiSuggestions.length > 0 && (
                        <div className="mb-3 p-3 rounded-lg" style={{ backgroundColor: `${colors.status.info}10`, borderLeft: `3px solid ${colors.status.info}` }}>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 size={16} style={{ color: colors.status.info, marginTop: 2 }} />
                            <div className="flex-1">
                              <p style={{ fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: colors.text.primary, marginBottom: 4 }}>
                                Grok AI Suggestions:
                              </p>
                              {activity.aiSuggestions.map((suggestion, idx) => (
                                <p key={idx} style={{ fontSize: typography.sizes.xs, color: colors.text.secondary, marginBottom: 2 }}>
                                  • {suggestion}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Remarks */}
                      {activity.remarks && (
                        <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary, marginBottom: spacing.sm }}>
                          {activity.remarks}
                        </p>
                      )}

                      {/* Media */}
                      {activity.media.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {activity.media.slice(0, 3).map((m) => (
                            <div key={m.id} className="w-16 h-16 rounded-lg overflow-hidden border" style={{ borderColor: colors.border.default }}>
                              <img src={m.url} alt="Evidence" className="w-full h-full object-cover" />
                            </div>
                          ))}
                          {activity.media.length > 3 && (
                            <button
                              onClick={() => handleViewMedia(activity.media)}
                              className="w-16 h-16 rounded-lg border flex items-center justify-center"
                              style={{ borderColor: colors.border.default, backgroundColor: colors.surface.secondary }}
                            >
                              <span style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>+{activity.media.length - 3}</span>
                            </button>
                          )}
                          {activity.media.length <= 3 && activity.media.length > 0 && (
                            <DSButton variant="outline" size="sm" leftIcon={<Eye size={14} />} onClick={() => handleViewMedia(activity.media)}>
                              View All
                            </DSButton>
                          )}
                        </div>
                      )}

                      {/* Voice Note */}
                      {activity.voiceNote && (
                        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                          <Mic size={14} style={{ color: colors.accent.gold }} />
                          <span style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>{activity.voiceNote}</span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 mt-3">
                        <DSButton variant="outline" size="sm" onClick={() => handleEditActivity(activity)}>
                          Edit
                        </DSButton>
                        <DSButton variant="outline" size="sm" onClick={() => handleDeleteActivity(activity.id)}>
                          Delete
                        </DSButton>
                        {activity.media.length > 0 && (
                          <DSButton variant="outline" size="sm" leftIcon={<ImageIcon size={14} />} onClick={() => handleViewMedia(activity.media)}>
                            {activity.media.length} Media
                          </DSButton>
                        )}
                      </div>
                    </div>
                  </div>
                </DSCard>
              </motion.div>
            );
          })
        ) : (
          <DSCard variant="elevated" padding="lg">
            <div className="text-center py-8">
              <Calendar size={48} className="mx-auto mb-3" style={{ color: colors.text.muted }} />
              <p style={{ fontSize: typography.sizes.base, color: colors.text.secondary }}>
                No activities logged yet. Start tracking your crop activities!
              </p>
            </div>
          </DSCard>
        )}
      </div>

      {/* Add/Edit Activity Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => {
              setShowAddForm(false);
              resetForm();
            }}
          >
            <div className="min-h-screen px-4 py-8 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-2xl">
                <DSCard variant="elevated" padding="lg">
                  {/* Form Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.semibold, color: colors.blue.primary }}>
                      {editingActivity ? "Edit Activity" : "Log New Activity"}
                    </h3>
                    <button onClick={() => { setShowAddForm(false); resetForm(); }} className="p-2 rounded-lg hover:bg-white/30 transition-colors">
                      <X size={24} style={{ color: colors.text.muted }} />
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    {/* Activity Type */}
                    <div>
                      <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                        Activity Type *
                      </label>
                      <Select value={activityType} onValueChange={setActivityType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                        <SelectContent>
                          {activityTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              <div className="flex items-center gap-2">
                                {type.icon}
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date */}
                    <div>
                      <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                        Date *
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <DSButton variant="outline" size="md" fullWidth>
                            <Calendar size={16} />
                            {format(date, "PPP")}
                          </DSButton>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Activity-Specific Fields */}
                    {activityType && renderActivitySpecificFields()}

                    {/* Remarks */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary }}>
                          Remarks/Notes
                        </label>
                        <DSButton variant="outline" size="sm" leftIcon={<Mic size={14} />} onClick={handleAddVoiceNote}>
                          Voice Input
                        </DSButton>
                      </div>
                      <Textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Additional comments..." rows={3} />
                    </div>

                    {/* Evidence Upload */}
                    <div>
                      <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                        Evidence (Optional)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <DSButton variant="outline" size="sm" leftIcon={<Camera size={16} />} onClick={handleAddPhoto}>
                          Add Photo ({media.filter((m) => m.type === "photo").length})
                        </DSButton>
                        <DSButton variant="outline" size="sm" leftIcon={<Video size={16} />} onClick={handleAddVideo}>
                          Add Video ({media.filter((m) => m.type === "video").length})
                        </DSButton>
                        <DSButton variant="outline" size="sm" leftIcon={<Mic size={16} />} onClick={handleAddVoiceNote}>
                          Voice Note {voiceNote && "✓"}
                        </DSButton>
                      </div>
                      {media.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {media.map((m) => (
                            <div key={m.id} className="relative w-16 h-16 rounded-lg overflow-hidden border" style={{ borderColor: colors.border.default }}>
                              <img src={m.url} alt="Evidence" className="w-full h-full object-cover" />
                              <button
                                onClick={() => setMedia(media.filter((item) => item.id !== m.id))}
                                className="absolute top-0 right-0 p-1 rounded-bl-lg"
                                style={{ backgroundColor: colors.status.error }}
                              >
                                <X size={12} color="white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t" style={{ borderColor: colors.border.default }}>
                      <DSButton variant="outline" size="lg" fullWidth onClick={() => { setShowAddForm(false); resetForm(); }}>
                        Cancel
                      </DSButton>
                      <DSButton variant="primary" size="lg" fullWidth onClick={handleSaveActivity}>
                        {editingActivity ? "Update Activity" : "Save Activity"}
                      </DSButton>
                    </div>
                  </div>
                </DSCard>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Gallery Modal */}
      <AnimatePresence>
        {showMediaGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
            onClick={() => setShowMediaGallery(false)}
          >
            <div className="min-h-screen px-4 py-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.semibold, color: "white" }}>
                  Media Gallery ({selectedActivityMedia.length})
                </h3>
                <button onClick={() => setShowMediaGallery(false)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <X size={24} color="white" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedActivityMedia.map((m) => (
                  <div key={m.id} className="rounded-lg overflow-hidden">
                    <img src={m.url} alt="Evidence" className="w-full h-64 object-cover" />
                    <div className="p-3" style={{ backgroundColor: colors.surface.secondary }}>
                      <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                        {format(new Date(m.timestamp), "PPP 'at' p")}
                      </p>
                      {m.caption && (
                        <p style={{ fontSize: typography.sizes.sm, color: colors.text.primary, marginTop: spacing.xs }}>
                          {m.caption}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
