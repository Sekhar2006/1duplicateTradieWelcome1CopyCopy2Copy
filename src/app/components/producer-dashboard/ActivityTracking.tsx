import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Plus,
  Leaf,
  Droplet,
  Bug,
  Sprout,
  Package,
  Camera,
  Mic,
  FileText,
  Calendar,
  QrCode,
  Award,
  ChevronDown,
  ChevronRight,
  Check,
  AlertTriangle,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Bot,
  X,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { grokAI, GrokVerification } from "./GrokAIService";

const { colors, typography, spacing } = designTokens;

interface CropEntry {
  id: string;
  category: string;
  crop: string;
  variety: string;
  acres: number;
  registeredDate: Date;
}

interface Activity {
  id: string;
  cropId: string;
  type: "sowing" | "watering" | "pesticide" | "fungicide" | "health-check" | "harvesting" | "packing" | "sale";
  title: string;
  description: string;
  date: Date;
  images?: string[];
  voiceNotes?: string[];
  soilFertility?: string;
  infections?: string;
}

const commodityCategories = {
  Spices: ["Turmeric", "Chili", "Coriander", "Cumin", "Black Pepper"],
  Pulses: ["Chickpea", "Pigeon Pea", "Lentil", "Mung Bean", "Black Gram"],
  Grains: ["Wheat", "Rice", "Barley", "Maize", "Sorghum"],
  Oilseeds: ["Mustard", "Groundnut", "Sunflower", "Sesame", "Soybean"],
  Vegetables: ["Tomato", "Onion", "Potato", "Cabbage", "Cauliflower"],
  Fruits: ["Mango", "Banana", "Apple", "Grapes", "Orange"],
};

const activityTypes = [
  { value: "sowing", label: "Sowing", icon: <Sprout size={16} />, color: colors.status.success },
  { value: "watering", label: "Watering", icon: <Droplet size={16} />, color: colors.status.info },
  { value: "pesticide", label: "Pesticide", icon: <Bug size={16} />, color: colors.status.warning },
  { value: "fungicide", label: "Fungicide", icon: <Bug size={16} />, color: "#9333EA" },
  { value: "health-check", label: "Health Check", icon: <Check size={16} />, color: colors.status.success },
  { value: "harvesting", label: "Harvesting", icon: <Package size={16} />, color: colors.accent.gold },
  { value: "packing", label: "Packing", icon: <Package size={16} />, color: colors.status.info },
  { value: "sale", label: "Sale", icon: <Award size={16} />, color: colors.accent.gold },
];

export function ActivityTracking() {
  const [crops, setCrops] = useState<CropEntry[]>([
    {
      id: "1",
      category: "Grains",
      crop: "Wheat",
      variety: "PBW 343",
      acres: 5,
      registeredDate: new Date("2024-09-01"),
    },
    {
      id: "2",
      category: "Oilseeds",
      crop: "Mustard",
      variety: "Pusa Bold",
      acres: 3,
      registeredDate: new Date("2024-09-15"),
    },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      cropId: "1",
      type: "sowing",
      title: "Wheat Sowing Completed",
      description: "Sowed 5 acres with PBW 343 variety. Soil prepared with tractor.",
      date: new Date("2024-09-05"),
    },
    {
      id: "2",
      cropId: "1",
      type: "watering",
      title: "First Irrigation",
      description: "Drip irrigation for 4 hours",
      date: new Date("2024-09-12"),
    },
    {
      id: "3",
      cropId: "1",
      type: "pesticide",
      title: "Applied Pesticide",
      description: "Sprayed Chlorpyrifos for aphid control",
      date: new Date("2024-09-20"),
      infections: "Aphids detected on leaves",
    },
  ]);

  const [showAddCrop, setShowAddCrop] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<string>("all");
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);
  const [cropVerifications, setCropVerifications] = useState<Record<string, GrokVerification>>({});
  const [showGrokAssistant, setShowGrokAssistant] = useState(false);
  const [grokQuery, setGrokQuery] = useState("");
  const [grokResponse, setGrokResponse] = useState("");

  // Verify crop activities with Grok AI
  useEffect(() => {
    const verifications: Record<string, GrokVerification> = {};
    crops.forEach((crop) => {
      const cropActivities = activities.filter(a => a.cropId === crop.id);
      if (cropActivities.length > 0) {
        const verification = grokAI.verifyActivityData({
          cropId: crop.id,
          cropName: crop.crop,
          activities: cropActivities,
          area: crop.acres,
        });
        verifications[crop.id] = verification;
      }
    });
    setCropVerifications(verifications);
  }, [activities, crops]);

  const handleGrokQuery = async () => {
    if (!grokQuery.trim()) return;
    const response = await grokAI.processVoiceQuery(grokQuery);
    setGrokResponse(response);
  };

  const [newCrop, setNewCrop] = useState({
    category: "",
    crop: "",
    variety: "",
    acres: "",
  });

  const [newActivity, setNewActivity] = useState({
    cropId: "",
    type: "",
    title: "",
    description: "",
    soilFertility: "",
    infections: "",
  });

  const handleAddCrop = () => {
    if (newCrop.category && newCrop.crop && newCrop.acres) {
      const crop: CropEntry = {
        id: Date.now().toString(),
        category: newCrop.category,
        crop: newCrop.crop,
        variety: newCrop.variety,
        acres: parseFloat(newCrop.acres),
        registeredDate: new Date(),
      };
      setCrops([...crops, crop]);
      setNewCrop({ category: "", crop: "", variety: "", acres: "" });
      setShowAddCrop(false);
    }
  };

  const handleAddActivity = () => {
    if (newActivity.cropId && newActivity.type && newActivity.title) {
      const activity: Activity = {
        id: Date.now().toString(),
        cropId: newActivity.cropId,
        type: newActivity.type as any,
        title: newActivity.title,
        description: newActivity.description,
        date: new Date(),
        soilFertility: newActivity.soilFertility,
        infections: newActivity.infections,
      };
      setActivities([activity, ...activities]);
      setNewActivity({
        cropId: "",
        type: "",
        title: "",
        description: "",
        soilFertility: "",
        infections: "",
      });
      setShowAddActivity(false);
    }
  };

  const filteredActivities = selectedCrop && selectedCrop !== "all"
    ? activities.filter((a) => a.cropId === selectedCrop)
    : activities;

  const getActivityIcon = (type: string) => {
    const actType = activityTypes.find((t) => t.value === type);
    return actType?.icon || <FileText size={16} />;
  };

  const getActivityColor = (type: string) => {
    const actType = activityTypes.find((t) => t.value === type);
    return actType?.color || colors.text.secondary;
  };

  return (
    <div className="space-y-6">
      {/* Crop Registration */}
      <DSCard variant="elevated" padding="lg">
        <div className="flex items-center justify-between mb-4">
          <h3
            style={{
              fontFamily: typography.fonts.subheading,
              fontSize: typography.sizes.lg,
              fontWeight: typography.weights.semibold,
              color: colors.blue.primary,
            }}
          >
            🌾 Registered Crops
          </h3>
          <DSButton
            variant="primary"
            size="sm"
            leftIcon={<Plus size={18} />}
            onClick={() => setShowAddCrop(!showAddCrop)}
          >
            Add Crop
          </DSButton>
        </div>

        {/* Add Crop Form */}
        {showAddCrop && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="mb-4 p-4 rounded-lg border"
            style={{
              backgroundColor: colors.surface.secondary,
              borderColor: colors.border.default,
            }}
          >
            <div className="space-y-3">
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
                <Select value={newCrop.category} onValueChange={(v) => setNewCrop({ ...newCrop, category: v, crop: "" })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(commodityCategories).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newCrop.category && (
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
                    Crop *
                  </label>
                  <Select value={newCrop.crop} onValueChange={(v) => setNewCrop({ ...newCrop, crop: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {commodityCategories[newCrop.category as keyof typeof commodityCategories].map((crop) => (
                        <SelectItem key={crop} value={crop}>
                          {crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

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
                  Variety
                </label>
                <input
                  type="text"
                  value={newCrop.variety}
                  onChange={(e) => setNewCrop({ ...newCrop, variety: e.target.value })}
                  placeholder="e.g., PBW 343"
                  className="w-full px-3 py-2 rounded-lg border outline-none"
                  style={{
                    borderColor: colors.border.default,
                    fontSize: typography.sizes.sm,
                  }}
                />
              </div>

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
                  Area (acres) *
                </label>
                <input
                  type="number"
                  value={newCrop.acres}
                  onChange={(e) => setNewCrop({ ...newCrop, acres: e.target.value })}
                  placeholder="Enter area in acres"
                  className="w-full px-3 py-2 rounded-lg border outline-none"
                  style={{
                    borderColor: colors.border.default,
                    fontSize: typography.sizes.sm,
                  }}
                />
              </div>

              <div className="flex gap-2">
                <DSButton variant="primary" size="sm" onClick={handleAddCrop}>
                  Save Crop
                </DSButton>
                <DSButton variant="outline" size="sm" onClick={() => setShowAddCrop(false)}>
                  Cancel
                </DSButton>
              </div>
            </div>
          </motion.div>
        )}

        {/* Crops List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {crops.map((crop) => {
            const verification = cropVerifications[crop.id];
            return (
            <div
              key={crop.id}
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: colors.surface.secondary,
                borderColor: verification && verification.seal === "failed"
                  ? colors.status.error
                  : verification && verification.seal === "warning"
                  ? colors.status.warning
                  : colors.border.default,
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.status.success}20` }}
                  >
                    <Leaf size={20} style={{ color: colors.status.success }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p
                        style={{
                          fontSize: typography.sizes.sm,
                          fontWeight: typography.weights.semibold,
                          color: colors.text.primary,
                        }}
                      >
                        {crop.crop} {crop.variety && `(${crop.variety})`}
                      </p>
                      {verification && (
                        <div className="flex items-center gap-1">
                          {verification.seal === "verified" ? (
                            <ShieldCheck size={16} style={{ color: colors.status.success }} />
                          ) : verification.seal === "warning" ? (
                            <ShieldAlert size={16} style={{ color: colors.status.warning }} />
                          ) : (
                            <AlertTriangle size={16} style={{ color: colors.status.error }} />
                          )}
                        </div>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: typography.sizes.xs,
                        color: colors.text.secondary,
                        marginTop: spacing.xs,
                      }}
                    >
                      {crop.category} • {crop.acres} acres
                    </p>
                    <p
                      style={{
                        fontSize: typography.sizes.xs,
                        color: colors.text.muted,
                        marginTop: spacing.xs,
                      }}
                    >
                      Registered: {crop.registeredDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <DSBadge variant="success" size="sm">
                    Active
                  </DSBadge>
                  {verification && (
                    <DSBadge
                      variant={
                        verification.seal === "verified" ? "success" :
                        verification.seal === "warning" ? "warning" : "error"
                      }
                      size="sm"
                    >
                      {verification.seal === "verified" ? "✓ Verified" :
                       verification.seal === "warning" ? "⚠ Review" : "✗ Issues"}
                    </DSBadge>
                  )}
                </div>
              </div>

              {/* Grok Verification Details */}
              {verification && verification.seal !== "verified" && verification.issues.length > 0 && (
                <div
                  className="mt-2 p-2 rounded-lg"
                  style={{
                    backgroundColor: verification.seal === "failed"
                      ? `${colors.status.error}10`
                      : `${colors.status.warning}10`,
                  }}
                >
                  <div className="flex items-start gap-2">
                    <Bot size={14} className="flex-shrink-0 mt-0.5" style={{ color: colors.accent.gold }} />
                    <div className="flex-1">
                      <p
                        style={{
                          fontSize: typography.sizes.xs,
                          fontWeight: typography.weights.semibold,
                          color: colors.text.primary,
                          marginBottom: spacing.xs,
                        }}
                      >
                        Grok AI Detected Issues:
                      </p>
                      <ul className="space-y-1">
                        {verification.issues.slice(0, 2).map((issue, idx) => (
                          <li
                            key={idx}
                            style={{
                              fontSize: typography.sizes.xs,
                              color: colors.text.secondary,
                            }}
                          >
                            • {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            );
          })}
        </div>
      </DSCard>

      {/* Activity Log */}
      <DSCard variant="elevated" padding="lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3
              style={{
                fontFamily: typography.fonts.subheading,
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
              }}
            >
              📋 Activity Timeline
            </h3>
            <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
              Track all farming activities
            </p>
          </div>
          <DSButton
            variant="primary"
            size="sm"
            leftIcon={<Plus size={18} />}
            onClick={() => setShowAddActivity(!showAddActivity)}
          >
            Log Activity
          </DSButton>
        </div>

        {/* Filter by Crop */}
        <div className="mb-4">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger>
              <SelectValue placeholder="All crops" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All crops</SelectItem>
              {crops.map((crop) => (
                <SelectItem key={crop.id} value={crop.id}>
                  {crop.crop} {crop.variety && `(${crop.variety})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Add Activity Form */}
        {showAddActivity && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="mb-4 p-4 rounded-lg border"
            style={{
              backgroundColor: `${colors.accent.gold}10`,
              borderColor: colors.accent.gold,
            }}
          >
            <div className="space-y-3">
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
                  Select Crop *
                </label>
                <Select value={newActivity.cropId} onValueChange={(v) => setNewActivity({ ...newActivity, cropId: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop.id} value={crop.id}>
                        {crop.crop} {crop.variety && `(${crop.variety})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                  Activity Type *
                </label>
                <Select value={newActivity.type} onValueChange={(v) => setNewActivity({ ...newActivity, type: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          {type.icon}
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                  Title *
                </label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  placeholder="e.g., Applied first irrigation"
                  className="w-full px-3 py-2 rounded-lg border outline-none"
                  style={{
                    borderColor: colors.border.default,
                    fontSize: typography.sizes.sm,
                  }}
                />
              </div>

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
                  Description
                </label>
                <Textarea
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  placeholder="Add details about the activity..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                    Soil Fertility
                  </label>
                  <input
                    type="text"
                    value={newActivity.soilFertility}
                    onChange={(e) => setNewActivity({ ...newActivity, soilFertility: e.target.value })}
                    placeholder="e.g., Good, Moderate"
                    className="w-full px-3 py-2 rounded-lg border outline-none"
                    style={{
                      borderColor: colors.border.default,
                      fontSize: typography.sizes.sm,
                    }}
                  />
                </div>

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
                    Infections/Diseases
                  </label>
                  <input
                    type="text"
                    value={newActivity.infections}
                    onChange={(e) => setNewActivity({ ...newActivity, infections: e.target.value })}
                    placeholder="e.g., Aphids, None"
                    className="w-full px-3 py-2 rounded-lg border outline-none"
                    style={{
                      borderColor: colors.border.default,
                      fontSize: typography.sizes.sm,
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <DSButton variant="outline" size="sm" leftIcon={<Camera size={16} />}>
                  Add Photo
                </DSButton>
                <DSButton variant="outline" size="sm" leftIcon={<Mic size={16} />}>
                  Voice Note
                </DSButton>
              </div>

              <div className="flex gap-2 pt-2">
                <DSButton variant="primary" size="sm" onClick={handleAddActivity}>
                  Save Activity
                </DSButton>
                <DSButton variant="outline" size="sm" onClick={() => setShowAddActivity(false)}>
                  Cancel
                </DSButton>
              </div>
            </div>
          </motion.div>
        )}

        {/* Timeline */}
        <div className="space-y-3">
          {filteredActivities.map((activity, index) => {
            const crop = crops.find((c) => c.id === activity.cropId);
            return (
              <div
                key={activity.id}
                className="border rounded-lg overflow-hidden"
                style={{ borderColor: colors.border.default }}
              >
                <button
                  onClick={() =>
                    setExpandedActivity(expandedActivity === activity.id ? null : activity.id)
                  }
                  className="w-full p-4 flex items-center justify-between hover:bg-white/30 transition-colors"
                  style={{ backgroundColor: colors.surface.secondary }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${getActivityColor(activity.type)}20`,
                        color: getActivityColor(activity.type),
                      }}
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="text-left">
                      <p
                        style={{
                          fontSize: typography.sizes.sm,
                          fontWeight: typography.weights.semibold,
                          color: colors.text.primary,
                        }}
                      >
                        {activity.title}
                      </p>
                      <p
                        style={{
                          fontSize: typography.sizes.xs,
                          color: colors.text.secondary,
                        }}
                      >
                        {crop?.crop} • {activity.date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <DSBadge variant="blue" size="sm">
                      {activityTypes.find((t) => t.value === activity.type)?.label}
                    </DSBadge>
                    {expandedActivity === activity.id ? (
                      <ChevronDown size={20} style={{ color: colors.text.muted }} />
                    ) : (
                      <ChevronRight size={20} style={{ color: colors.text.muted }} />
                    )}
                  </div>
                </button>

                {expandedActivity === activity.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-4 pb-4"
                    style={{ backgroundColor: colors.surface.secondary }}
                  >
                    <div className="space-y-2 pt-2">
                      {activity.description && (
                        <div>
                          <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                            Description:
                          </p>
                          <p style={{ fontSize: typography.sizes.sm, color: colors.text.primary }}>
                            {activity.description}
                          </p>
                        </div>
                      )}
                      {activity.soilFertility && (
                        <div>
                          <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                            Soil Fertility:
                          </p>
                          <p style={{ fontSize: typography.sizes.sm, color: colors.text.primary }}>
                            {activity.soilFertility}
                          </p>
                        </div>
                      )}
                      {activity.infections && (
                        <div className="flex items-start gap-2">
                          <AlertTriangle size={16} style={{ color: colors.status.warning, marginTop: "2px" }} />
                          <div>
                            <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                              Infections/Diseases:
                            </p>
                            <p style={{ fontSize: typography.sizes.sm, color: colors.status.warning }}>
                              {activity.infections}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </DSCard>

      {/* NFT Tokenization */}
      <DSCard variant="gold" padding="lg" className="border-2" style={{ borderColor: colors.accent.gold }}>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${colors.accent.gold}, ${colors.accent.goldDark})`,
            }}
          >
            <Award size={24} style={{ color: "white" }} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: typography.fonts.subheading,
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
              }}
            >
              🏆 NFT Tokenization
            </h3>
            <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
              Create digital certificates for your crops
            </p>
          </div>
        </div>

        <p
          className="mb-4"
          style={{
            fontSize: typography.sizes.sm,
            color: colors.text.primary,
            lineHeight: 1.6,
          }}
        >
          Package your crop data, activities, and quality certifications into a blockchain-backed NFT
          token that buyers can verify instantly. <strong>Grok AI validates all data before tokenization.</strong>
        </p>

        {/* Grok Verification Status for NFT */}
        {selectedCrop && cropVerifications[selectedCrop] && (
          <div
            className="mb-4 p-4 rounded-lg"
            style={{
              backgroundColor: cropVerifications[selectedCrop].seal === "verified"
                ? `${colors.status.success}10`
                : cropVerifications[selectedCrop].seal === "warning"
                ? `${colors.status.warning}10`
                : `${colors.status.error}10`,
              border: `1px solid ${
                cropVerifications[selectedCrop].seal === "verified"
                  ? colors.status.success
                  : cropVerifications[selectedCrop].seal === "warning"
                  ? colors.status.warning
                  : colors.status.error
              }`,
            }}
          >
            <div className="flex items-start gap-3">
              {cropVerifications[selectedCrop].seal === "verified" ? (
                <ShieldCheck size={24} style={{ color: colors.status.success }} />
              ) : cropVerifications[selectedCrop].seal === "warning" ? (
                <ShieldAlert size={24} style={{ color: colors.status.warning }} />
              ) : (
                <AlertTriangle size={24} style={{ color: colors.status.error }} />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4
                    style={{
                      fontSize: typography.sizes.base,
                      fontWeight: typography.weights.semibold,
                      color: colors.text.primary,
                    }}
                  >
                    Grok AI Verification
                  </h4>
                  <DSBadge
                    variant={
                      cropVerifications[selectedCrop].seal === "verified"
                        ? "success"
                        : cropVerifications[selectedCrop].seal === "warning"
                        ? "warning"
                        : "error"
                    }
                    size="sm"
                  >
                    {cropVerifications[selectedCrop].confidence}% Confidence
                  </DSBadge>
                </div>
                <p
                  style={{
                    fontSize: typography.sizes.sm,
                    color: colors.text.secondary,
                    marginBottom: spacing.sm,
                  }}
                >
                  {cropVerifications[selectedCrop].verified
                    ? "✓ All activity data verified. Ready for NFT tokenization."
                    : "⚠ Issues detected in activity data. Review before tokenization."}
                </p>
                {cropVerifications[selectedCrop].issues.length > 0 && (
                  <ul className="space-y-1">
                    {cropVerifications[selectedCrop].issues.map((issue, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: typography.sizes.xs,
                          color: colors.text.secondary,
                        }}
                      >
                        • {issue}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <DSButton 
            variant="primary" 
            size="md" 
            leftIcon={<Award size={18} />}
            disabled={selectedCrop && cropVerifications[selectedCrop] && !cropVerifications[selectedCrop].verified}
          >
            Create Grok-Verified NFT
          </DSButton>
          <DSButton variant="outline" size="md" leftIcon={<QrCode size={18} />}>
            Generate QR Code
          </DSButton>
        </div>

        <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: `${colors.accent.gold}10` }}>
          <div className="flex items-start gap-2">
            <Shield size={16} className="flex-shrink-0 mt-0.5" style={{ color: colors.accent.gold }} />
            <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
              <strong>🤖 Grok AI Protection:</strong> All NFT tokens include Grok verification seal. Buyers scanning QR codes receive instant AI-generated risk assessment with fraud probability scoring. NFTs with detected anomalies require manual review before minting.
            </p>
          </div>
        </div>
      </DSCard>

      {/* Grok AI Assistant Floating Button */}
      {showGrokAssistant && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 right-4 z-40"
        >
          <DSCard variant="elevated" padding="md" className="w-80 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bot size={20} style={{ color: colors.accent.gold }} />
                <h4
                  style={{
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.primary,
                  }}
                >
                  Ask Grok AI
                </h4>
              </div>
              <button
                onClick={() => setShowGrokAssistant(false)}
                className="p-1 rounded hover:bg-white/30"
              >
                <X size={16} style={{ color: colors.text.muted }} />
              </button>
            </div>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={grokQuery}
                onChange={(e) => setGrokQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleGrokQuery()}
                placeholder="Check for anomalies..."
                className="flex-1 px-3 py-2 rounded-lg border outline-none text-sm"
                style={{ borderColor: colors.border.default }}
              />
              <DSButton variant="primary" size="sm" onClick={handleGrokQuery}>
                Ask
              </DSButton>
            </div>
            {grokResponse && (
              <div
                className="mt-2 p-2 rounded-lg"
                style={{ backgroundColor: colors.surface.secondary }}
              >
                <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                  {grokResponse}
                </p>
              </div>
            )}
          </DSCard>
        </motion.div>
      )}

      {/* Floating Grok Assistant Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowGrokAssistant(!showGrokAssistant)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-xl flex items-center justify-center z-50"
        style={{
          background: `linear-gradient(135deg, ${colors.accent.gold}, ${colors.accent.goldDark})`,
        }}
      >
        <Bot size={24} style={{ color: "white" }} />
      </motion.button>
    </div>
  );
}
