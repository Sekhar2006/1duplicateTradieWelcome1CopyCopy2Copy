import { useState } from "react";
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
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "sonner@2.0.3";
import { format } from "date-fns";

const { colors, typography, spacing } = designTokens;

export interface Activity {
  id: string;
  type: string;
  subType?: string;
  date: Date;
  description: string;
  quantity?: string;
  method?: string;
  photos?: string[];
  videos?: string[];
  voiceNotes?: string[];
  notes?: string;
  completed: boolean;
}

const activityTypes = [
  {
    id: "ploughing",
    label: "Ploughing",
    icon: <Sprout size={20} />,
    color: "#8B4513",
    subTypes: ["Manual", "Tractor", "Bullock"],
  },
  {
    id: "sowing",
    label: "Sowing/Transplanting",
    icon: <Sprout size={20} />,
    color: "#22C55E",
    subTypes: ["Direct Sowing", "Transplanting", "Broadcasting", "Drill Sowing"],
  },
  {
    id: "irrigation",
    label: "Irrigation/Watering",
    icon: <Droplets size={20} />,
    color: "#3B82F6",
    subTypes: ["Drip", "Sprinkler", "Flood", "Manual"],
  },
  {
    id: "fertilizer",
    label: "Fertilizer Application",
    icon: <Leaf size={20} />,
    color: "#10B981",
    subTypes: ["NPK Chemical", "Organic Manure", "Compost", "Bio-fertilizer", "Foliar Spray"],
  },
  {
    id: "pesticide",
    label: "Pesticide/Fungicide",
    icon: <Bug size={20} />,
    color: "#EF4444",
    subTypes: ["Insecticide", "Fungicide", "Weedicide", "Nematicide", "Organic Pest Control"],
  },
  {
    id: "weeding",
    label: "Weeding",
    icon: <Leaf size={20} />,
    color: "#F59E0B",
    subTypes: ["Manual", "Mechanical", "Chemical"],
  },
  {
    id: "mulching",
    label: "Mulching/Soil Amendment",
    icon: <Leaf size={20} />,
    color: "#84CC16",
    subTypes: ["Organic Mulch", "Plastic Mulch", "Lime Application", "Gypsum"],
  },
  {
    id: "intercultural",
    label: "Intercultural Operations",
    icon: <Scissors size={20} />,
    color: "#8B5CF6",
    subTypes: ["Thinning", "Earthing Up", "Gap Filling", "Propping"],
  },
  {
    id: "pest-scouting",
    label: "Disease/Pest Scouting",
    icon: <Bug size={20} />,
    color: "#DC2626",
    subTypes: ["Visual Inspection", "Trap Monitoring", "Symptom Recording"],
  },
  {
    id: "health-check",
    label: "Crop Health Check",
    icon: <TrendingUp size={20} />,
    color: "#059669",
    subTypes: ["Height Measurement", "Leaf Color Check", "Biomass Assessment", "Stage Recording"],
  },
  {
    id: "pruning",
    label: "Pruning/Training",
    icon: <Scissors size={20} />,
    color: "#7C3AED",
    subTypes: ["Pruning", "Training", "Staking", "Trellising"],
  },
  {
    id: "harvesting",
    label: "Harvesting",
    icon: <Package size={20} />,
    color: "#D97706",
    subTypes: ["Partial Harvest", "Final Harvest", "Selective Picking"],
  },
  {
    id: "post-harvest",
    label: "Post-Harvest",
    icon: <Package size={20} />,
    color: "#92400E",
    subTypes: ["Drying", "Storage", "Grading", "Packing", "Sale"],
  },
  {
    id: "inspection",
    label: "Field Visit/Inspection",
    icon: <User size={20} />,
    color: "#1E40AF",
    subTypes: ["Agronomist Visit", "Buyer Visit", "Government Inspection", "Self Inspection"],
  },
  {
    id: "custom",
    label: "Custom Activity",
    icon: <FileText size={20} />,
    color: "#6B7280",
    subTypes: ["Other"],
  },
];

interface ActivityLoggerProps {
  cropId: string;
  cropName: string;
  onActivitiesUpdate: (activities: Activity[]) => void;
  existingActivities?: Activity[];
}

export function ActivityLogger({
  cropId,
  cropName,
  onActivitiesUpdate,
  existingActivities = [],
}: ActivityLoggerProps) {
  const [activities, setActivities] = useState<Activity[]>(existingActivities);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  
  // Form state
  const [activityType, setActivityType] = useState("");
  const [subType, setSubType] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [method, setMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [voiceNotes, setVoiceNotes] = useState<string[]>([]);

  const resetForm = () => {
    setActivityType("");
    setSubType("");
    setDate(new Date());
    setDescription("");
    setQuantity("");
    setMethod("");
    setNotes("");
    setPhotos([]);
    setVoiceNotes([]);
    setEditingActivity(null);
  };

  const handleSaveActivity = () => {
    if (!activityType || !description) {
      toast.error("Please fill in activity type and description");
      return;
    }

    const newActivity: Activity = {
      id: editingActivity?.id || `activity-${Date.now()}`,
      type: activityType,
      subType,
      date,
      description,
      quantity,
      method,
      photos,
      voiceNotes,
      notes,
      completed: true,
    };

    let updatedActivities: Activity[];
    if (editingActivity) {
      updatedActivities = activities.map((a) => (a.id === editingActivity.id ? newActivity : a));
      toast.success("Activity updated successfully");
    } else {
      updatedActivities = [...activities, newActivity];
      toast.success("Activity logged successfully");
    }

    setActivities(updatedActivities);
    onActivitiesUpdate(updatedActivities);
    setShowAddForm(false);
    resetForm();
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setActivityType(activity.type);
    setSubType(activity.subType || "");
    setDate(activity.date);
    setDescription(activity.description);
    setQuantity(activity.quantity || "");
    setMethod(activity.method || "");
    setNotes(activity.notes || "");
    setPhotos(activity.photos || []);
    setVoiceNotes(activity.voiceNotes || []);
    setShowAddForm(true);
  };

  const handleDeleteActivity = (id: string) => {
    const updatedActivities = activities.filter((a) => a.id !== id);
    setActivities(updatedActivities);
    onActivitiesUpdate(updatedActivities);
    toast.success("Activity deleted");
  };

  const getActivityTypeConfig = (typeId: string) => {
    return activityTypes.find((t) => t.id === typeId);
  };

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3
            style={{
              fontSize: typography.sizes.lg,
              fontWeight: typography.weights.semibold,
              color: colors.blue.primary,
            }}
          >
            📅 Activity Log - {cropName}
          </h3>
          <p
            style={{
              fontSize: typography.sizes.sm,
              color: colors.text.secondary,
              marginTop: spacing.xs,
            }}
          >
            {activities.length} activities recorded
          </p>
        </div>
        <DSButton
          variant="primary"
          size="md"
          leftIcon={<Plus size={18} />}
          onClick={() => setShowAddForm(true)}
        >
          Log Activity
        </DSButton>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-3">
        {sortedActivities.length > 0 ? (
          sortedActivities.map((activity) => {
            const typeConfig = getActivityTypeConfig(activity.type);
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <DSCard
                  variant="default"
                  padding="md"
                  className="border-l-4"
                  style={{
                    borderLeftColor: typeConfig?.color || colors.border.default,
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${typeConfig?.color}20`,
                        color: typeConfig?.color,
                      }}
                    >
                      {typeConfig?.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4
                            style={{
                              fontSize: typography.sizes.sm,
                              fontWeight: typography.weights.semibold,
                              color: colors.text.primary,
                            }}
                          >
                            {typeConfig?.label}
                            {activity.subType && ` - ${activity.subType}`}
                          </h4>
                          <p
                            style={{
                              fontSize: typography.sizes.xs,
                              color: colors.text.secondary,
                            }}
                          >
                            {format(new Date(activity.date), "MMM dd, yyyy")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <DSBadge variant="success" size="sm">
                            <Check size={12} />
                          </DSBadge>
                        </div>
                      </div>

                      <p
                        style={{
                          fontSize: typography.sizes.sm,
                          color: colors.text.secondary,
                          marginBottom: spacing.sm,
                        }}
                      >
                        {activity.description}
                      </p>

                      {/* Details */}
                      {(activity.quantity || activity.method) && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {activity.quantity && (
                            <DSBadge variant="blue" size="sm">
                              Qty: {activity.quantity}
                            </DSBadge>
                          )}
                          {activity.method && (
                            <DSBadge variant="blue" size="sm">
                              Method: {activity.method}
                            </DSBadge>
                          )}
                        </div>
                      )}

                      {/* Media indicators */}
                      {(activity.photos?.length || activity.voiceNotes?.length) && (
                        <div className="flex gap-2 mb-2">
                          {activity.photos && activity.photos.length > 0 && (
                            <div className="flex items-center gap-1 text-xs" style={{ color: colors.text.muted }}>
                              <Camera size={14} />
                              <span>{activity.photos.length} photos</span>
                            </div>
                          )}
                          {activity.voiceNotes && activity.voiceNotes.length > 0 && (
                            <div className="flex items-center gap-1 text-xs" style={{ color: colors.text.muted }}>
                              <Mic size={14} />
                              <span>{activity.voiceNotes.length} notes</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 mt-3">
                        <DSButton
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditActivity(activity)}
                        >
                          Edit
                        </DSButton>
                        <DSButton
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteActivity(activity.id)}
                        >
                          Delete
                        </DSButton>
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
              <p
                style={{
                  fontSize: typography.sizes.base,
                  color: colors.text.secondary,
                }}
              >
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
            <div
              className="min-h-screen px-4 py-8 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl"
              >
                <DSCard variant="elevated" padding="lg">
                  {/* Form Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3
                      style={{
                        fontSize: typography.sizes.xl,
                        fontWeight: typography.weights.semibold,
                        color: colors.blue.primary,
                      }}
                    >
                      {editingActivity ? "Edit Activity" : "Log New Activity"}
                    </h3>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        resetForm();
                      }}
                      className="p-2 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <X size={24} style={{ color: colors.text.muted }} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Activity Type */}
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

                    {/* Sub Type */}
                    {activityType && (
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
                          Sub Type
                        </label>
                        <Select value={subType} onValueChange={setSubType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sub type" />
                          </SelectTrigger>
                          <SelectContent>
                            {getActivityTypeConfig(activityType)?.subTypes.map((st) => (
                              <SelectItem key={st} value={st}>
                                {st}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Date */}
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

                    {/* Description */}
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
                        Description *
                      </label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the activity performed..."
                        rows={3}
                      />
                    </div>

                    {/* Quantity & Method */}
                    <div className="grid grid-cols-2 gap-4">
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
                          Quantity/Dosage
                        </label>
                        <Input
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          placeholder="e.g., 2 bags, 5 liters"
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
                          Method
                        </label>
                        <Input
                          value={method}
                          onChange={(e) => setMethod(e.target.value)}
                          placeholder="e.g., Spray, Broadcast"
                        />
                      </div>
                    </div>

                    {/* Additional Notes */}
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
                        Additional Notes
                      </label>
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any observations, issues, or additional details..."
                        rows={2}
                      />
                    </div>

                    {/* Media Upload */}
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
                        Evidence (Optional)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <DSButton variant="outline" size="sm" leftIcon={<Camera size={16} />}>
                          Add Photo
                        </DSButton>
                        <DSButton variant="outline" size="sm" leftIcon={<Video size={16} />}>
                          Add Video
                        </DSButton>
                        <DSButton variant="outline" size="sm" leftIcon={<Mic size={16} />}>
                          Voice Note
                        </DSButton>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <DSButton
                        variant="outline"
                        size="lg"
                        fullWidth
                        onClick={() => {
                          setShowAddForm(false);
                          resetForm();
                        }}
                      >
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
    </div>
  );
}
