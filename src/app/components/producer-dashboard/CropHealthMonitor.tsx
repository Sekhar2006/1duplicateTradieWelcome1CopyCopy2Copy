import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Sun,
  CloudRain,
  Bug,
  Leaf,
  Activity,
  Calendar,
  MapPin,
  Thermometer,
  Wind,
  Eye,
  Camera,
  AlertCircle,
  Shield,
  ChevronRight,
  X,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner@2.0.3";
import { grokAI, GrokAlert } from "./GrokAIService";

const { colors, typography, spacing } = designTokens;

interface CropHealth {
  cropId: string;
  plotName: string;
  commodity: string;
  variety: string;
  stage: "germination" | "vegetative" | "tillering" | "flowering" | "grain-filling" | "maturity" | "harvest-ready";
  healthScore: number; // 0-100
  status: "excellent" | "good" | "fair" | "poor" | "critical";
  lastChecked: Date;
  issues: HealthIssue[];
  metrics: HealthMetrics;
  weather: WeatherData;
  recommendations: string[];
}

interface HealthIssue {
  id: string;
  type: "pest" | "disease" | "nutrient" | "water" | "weather";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  actionRequired: boolean;
  detectedDate: Date;
  images?: string[];
}

interface HealthMetrics {
  soilMoisture: number; // 0-100%
  leafColorIndex: number; // 0-100
  plantHeight: number; // cm
  biomassIndex: number; // 0-100
  pestPressure: number; // 0-100
  diseaseRisk: number; // 0-100
}

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: "favorable" | "moderate" | "risky";
}

export function CropHealthMonitor() {
  const [selectedCrop, setSelectedCrop] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"overview" | "alerts" | "analytics">("overview");
  const [showIssueDetails, setShowIssueDetails] = useState<HealthIssue | null>(null);
  const [grokAlerts, setGrokAlerts] = useState<GrokAlert[]>([]);

  // Sample data - would come from database
  const [cropsHealth, setCropsHealth] = useState<CropHealth[]>([
    {
      cropId: "1",
      plotName: "North Field",
      commodity: "Wheat",
      variety: "PBW 343",
      stage: "tillering",
      healthScore: 85,
      status: "good",
      lastChecked: new Date(),
      issues: [
        {
          id: "i1",
          type: "pest",
          severity: "medium",
          title: "Aphid Infestation Detected",
          description: "Minor aphid population observed on 15% of plants. Early intervention recommended.",
          actionRequired: true,
          detectedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          images: ["https://via.placeholder.com/400x300?text=Aphids"],
        },
      ],
      metrics: {
        soilMoisture: 65,
        leafColorIndex: 88,
        plantHeight: 45,
        biomassIndex: 82,
        pestPressure: 35,
        diseaseRisk: 20,
      },
      weather: {
        temperature: 28,
        humidity: 70,
        rainfall: 5,
        forecast: "favorable",
      },
      recommendations: [
        "Apply neem-based organic pesticide for aphid control",
        "Monitor soil moisture; irrigation needed in 3 days",
        "Good weather conditions for growth - maintain current care",
      ],
    },
    {
      cropId: "2",
      plotName: "South Plot",
      commodity: "Rice",
      variety: "Basmati 1121",
      stage: "vegetative",
      healthScore: 92,
      status: "excellent",
      lastChecked: new Date(),
      issues: [],
      metrics: {
        soilMoisture: 85,
        leafColorIndex: 95,
        plantHeight: 30,
        biomassIndex: 90,
        pestPressure: 10,
        diseaseRisk: 15,
      },
      weather: {
        temperature: 32,
        humidity: 80,
        rainfall: 12,
        forecast: "favorable",
      },
      recommendations: [
        "Crop health excellent - maintain current practices",
        "Consider top dressing with nitrogen fertilizer in 5 days",
        "Continue flood irrigation schedule",
      ],
    },
    {
      cropId: "3",
      plotName: "East Field",
      commodity: "Cotton",
      variety: "Bt Cotton",
      stage: "flowering",
      healthScore: 68,
      status: "fair",
      lastChecked: new Date(),
      issues: [
        {
          id: "i2",
          type: "disease",
          severity: "high",
          title: "Leaf Curl Virus Suspected",
          description: "Yellowing and curling observed on lower leaves. Immediate action needed.",
          actionRequired: true,
          detectedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          images: ["https://via.placeholder.com/400x300?text=Leaf+Curl"],
        },
        {
          id: "i3",
          type: "nutrient",
          severity: "medium",
          title: "Nitrogen Deficiency",
          description: "Pale green coloration indicates nitrogen shortage.",
          actionRequired: true,
          detectedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
      ],
      metrics: {
        soilMoisture: 45,
        leafColorIndex: 62,
        plantHeight: 75,
        biomassIndex: 70,
        pestPressure: 45,
        diseaseRisk: 65,
      },
      weather: {
        temperature: 35,
        humidity: 55,
        rainfall: 0,
        forecast: "risky",
      },
      recommendations: [
        "URGENT: Consult agronomist for leaf curl virus management",
        "Apply nitrogen-rich fertilizer immediately",
        "Increase irrigation frequency due to high temperature",
        "Monitor for whitefly vectors",
      ],
    },
  ]);

  useEffect(() => {
    // Simulate Grok AI analysis
    const criticalIssues = cropsHealth.filter((c) => c.status === "poor" || c.status === "critical");
    if (criticalIssues.length > 0) {
      const alerts: GrokAlert[] = criticalIssues.map((crop) => ({
        id: `alert-${crop.cropId}`,
        type: "anomaly",
        severity: "high",
        title: `${crop.commodity} Health Alert`,
        message: `${crop.plotName} showing ${crop.issues.length} health issues. Immediate attention required.`,
        timestamp: new Date(),
        actionRequired: true,
      }));
      setGrokAlerts(alerts);
    }
  }, [cropsHealth]);

  const getStatusColor = (status: CropHealth["status"]) => {
    const statusColors: Record<CropHealth["status"], string> = {
      excellent: colors.status.success,
      good: "#22C55E",
      fair: colors.status.warning,
      poor: "#F97316",
      critical: colors.status.error,
    };
    return statusColors[status];
  };

  const getSeverityColor = (severity: HealthIssue["severity"]) => {
    const severityColors: Record<HealthIssue["severity"], string> = {
      low: colors.status.info,
      medium: colors.status.warning,
      high: "#F97316",
      critical: colors.status.error,
    };
    return severityColors[severity];
  };

  const getStageLabel = (stage: CropHealth["stage"]) => {
    const labels: Record<CropHealth["stage"], string> = {
      germination: "🌱 Germination",
      vegetative: "🌿 Vegetative",
      tillering: "🌾 Tillering",
      flowering: "🌸 Flowering",
      "grain-filling": "🌾 Grain Filling",
      maturity: "🟡 Maturity",
      "harvest-ready": "✅ Harvest Ready",
    };
    return labels[stage];
  };

  const getIssueIcon = (type: HealthIssue["type"]) => {
    const icons: Record<HealthIssue["type"], React.ReactNode> = {
      pest: <Bug size={20} />,
      disease: <AlertTriangle size={20} />,
      nutrient: <Leaf size={20} />,
      water: <Droplets size={20} />,
      weather: <CloudRain size={20} />,
    };
    return icons[type];
  };

  const filteredCrops = selectedCrop === "all" ? cropsHealth : cropsHealth.filter((c) => c.cropId === selectedCrop);

  const totalIssues = cropsHealth.reduce((sum, c) => sum + c.issues.length, 0);
  const criticalIssues = cropsHealth.reduce((sum, c) => sum + c.issues.filter((i) => i.severity === "critical" || i.severity === "high").length, 0);
  const avgHealthScore = Math.round(cropsHealth.reduce((sum, c) => sum + c.healthScore, 0) / cropsHealth.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2
          style={{
            fontFamily: typography.fonts.heading,
            fontSize: typography.sizes["2xl"],
            fontWeight: typography.weights.bold,
            color: colors.blue.primary,
          }}
        >
          🌿 Crop Health & Alerts
        </h2>
        <p
          style={{
            fontSize: typography.sizes.sm,
            color: colors.text.secondary,
            marginTop: spacing.xs,
          }}
        >
          Real-time monitoring and AI-powered health analysis
        </p>
      </div>

      {/* Grok Alert Banner */}
      <AnimatePresence>
        {grokAlerts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <DSCard variant="default" padding="md" className="border-2" style={{ borderColor: colors.status.error }}>
              <div className="flex items-start gap-3">
                <Shield size={24} style={{ color: colors.status.error }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                      🤖 Grok AI: Critical Health Alert
                    </h4>
                    <DSBadge variant="error" size="sm">
                      HIGH
                    </DSBadge>
                  </div>
                  <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                    {grokAlerts[0].message}
                  </p>
                </div>
                <button onClick={() => setGrokAlerts([])} className="p-1 rounded hover:bg-white/20">
                  <X size={16} style={{ color: colors.text.muted }} />
                </button>
              </div>
            </DSCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DSCard variant="elevated" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.status.success}20`, color: colors.status.success }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <p style={{ fontSize: typography.sizes["2xl"], fontWeight: typography.weights.bold, color: colors.blue.primary }}>
                {avgHealthScore}
              </p>
              <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Avg Health Score</p>
            </div>
          </div>
        </DSCard>

        <DSCard variant="elevated" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.accent.gold}20`, color: colors.accent.gold }}>
              <Activity size={24} />
            </div>
            <div>
              <p style={{ fontSize: typography.sizes["2xl"], fontWeight: typography.weights.bold, color: colors.blue.primary }}>
                {cropsHealth.length}
              </p>
              <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Active Crops</p>
            </div>
          </div>
        </DSCard>

        <DSCard variant="elevated" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.status.warning}20`, color: colors.status.warning }}>
              <AlertCircle size={24} />
            </div>
            <div>
              <p style={{ fontSize: typography.sizes["2xl"], fontWeight: typography.weights.bold, color: colors.blue.primary }}>
                {totalIssues}
              </p>
              <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Total Issues</p>
            </div>
          </div>
        </DSCard>

        <DSCard variant="elevated" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.status.error}20`, color: colors.status.error }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <p style={{ fontSize: typography.sizes["2xl"], fontWeight: typography.weights.bold, color: colors.blue.primary }}>
                {criticalIssues}
              </p>
              <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Critical Issues</p>
            </div>
          </div>
        </DSCard>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Crops</SelectItem>
            {cropsHealth.map((crop) => (
              <SelectItem key={crop.cropId} value={crop.cropId}>
                {crop.plotName} - {crop.commodity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="alerts">⚠️ Alerts ({totalIssues})</TabsTrigger>
          <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {filteredCrops.map((crop) => (
            <motion.div key={crop.cropId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <DSCard variant="elevated" padding="lg">
                {/* Crop Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                        {crop.plotName} - {crop.commodity}
                      </h3>
                      <DSBadge variant={crop.status === "excellent" || crop.status === "good" ? "success" : crop.status === "fair" ? "warning" : "error"} size="sm">
                        {crop.status.toUpperCase()}
                      </DSBadge>
                      <DSBadge variant="blue" size="sm">
                        {getStageLabel(crop.stage)}
                      </DSBadge>
                    </div>
                    <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                      {crop.variety} • Last checked: {crop.lastChecked.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p style={{ fontSize: typography.sizes["3xl"], fontWeight: typography.weights.bold, color: getStatusColor(crop.status) }}>
                      {crop.healthScore}
                    </p>
                    <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Health Score</p>
                  </div>
                </div>

                {/* Health Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Droplets size={16} style={{ color: colors.status.info }} />
                        <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>Soil Moisture</span>
                      </div>
                      <span style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                        {crop.metrics.soilMoisture}%
                      </span>
                    </div>
                    <Progress value={crop.metrics.soilMoisture} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Leaf size={16} style={{ color: colors.status.success }} />
                        <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>Leaf Color</span>
                      </div>
                      <span style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                        {crop.metrics.leafColorIndex}%
                      </span>
                    </div>
                    <Progress value={crop.metrics.leafColorIndex} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} style={{ color: colors.accent.gold }} />
                        <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>Biomass</span>
                      </div>
                      <span style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                        {crop.metrics.biomassIndex}%
                      </span>
                    </div>
                    <Progress value={crop.metrics.biomassIndex} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Bug size={16} style={{ color: colors.status.warning }} />
                        <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>Pest Pressure</span>
                      </div>
                      <span style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                        {crop.metrics.pestPressure}%
                      </span>
                    </div>
                    <Progress value={crop.metrics.pestPressure} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={16} style={{ color: colors.status.error }} />
                        <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>Disease Risk</span>
                      </div>
                      <span style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                        {crop.metrics.diseaseRisk}%
                      </span>
                    </div>
                    <Progress value={crop.metrics.diseaseRisk} className="h-2" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Activity size={16} style={{ color: colors.blue.primary }} />
                        <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>Plant Height</span>
                      </div>
                      <span style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                        {crop.metrics.plantHeight} cm
                      </span>
                    </div>
                  </div>
                </div>

                {/* Weather */}
                <div className="p-3 rounded-lg mb-4" style={{ backgroundColor: colors.surface.secondary }}>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Thermometer size={16} style={{ color: colors.status.warning }} />
                      <div>
                        <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Temperature</p>
                        <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                          {crop.weather.temperature}°C
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets size={16} style={{ color: colors.status.info }} />
                      <div>
                        <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Humidity</p>
                        <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                          {crop.weather.humidity}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CloudRain size={16} style={{ color: colors.status.info }} />
                      <div>
                        <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Rainfall</p>
                        <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                          {crop.weather.rainfall} mm
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun size={16} style={{ color: crop.weather.forecast === "favorable" ? colors.status.success : crop.weather.forecast === "moderate" ? colors.status.warning : colors.status.error }} />
                      <div>
                        <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Forecast</p>
                        <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                          {crop.weather.forecast}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issues */}
                {crop.issues.length > 0 && (
                  <div className="mb-4">
                    <h4 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary, marginBottom: spacing.sm }}>
                      Active Issues ({crop.issues.length})
                    </h4>
                    <div className="space-y-2">
                      {crop.issues.map((issue) => (
                        <div
                          key={issue.id}
                          className="p-3 rounded-lg border-l-4 cursor-pointer hover:bg-white/50 transition-colors"
                          style={{ backgroundColor: colors.surface.secondary, borderLeftColor: getSeverityColor(issue.severity) }}
                          onClick={() => setShowIssueDetails(issue)}
                        >
                          <div className="flex items-start gap-3">
                            <div style={{ color: getSeverityColor(issue.severity) }}>
                              {getIssueIcon(issue.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                                  {issue.title}
                                </h5>
                                <DSBadge
                                  variant={issue.severity === "critical" || issue.severity === "high" ? "error" : issue.severity === "medium" ? "warning" : "info"}
                                  size="sm"
                                >
                                  {issue.severity.toUpperCase()}
                                </DSBadge>
                                {issue.actionRequired && (
                                  <DSBadge variant="error" size="sm">
                                    ACTION REQUIRED
                                  </DSBadge>
                                )}
                              </div>
                              <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                                {issue.description}
                              </p>
                            </div>
                            <ChevronRight size={20} style={{ color: colors.text.muted }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.status.info}10`, borderLeft: `3px solid ${colors.status.info}` }}>
                  <h4 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary, marginBottom: spacing.sm }}>
                    🤖 AI Recommendations
                  </h4>
                  <ul className="space-y-1">
                    {crop.recommendations.map((rec, idx) => (
                      <li key={idx} style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                        • {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </DSCard>
            </motion.div>
          ))}
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-3">
          {cropsHealth.flatMap((crop) =>
            crop.issues.map((issue) => (
              <DSCard key={issue.id} variant="default" padding="md" className="border-l-4" style={{ borderLeftColor: getSeverityColor(issue.severity) }}>
                <div className="flex items-start gap-3">
                  <div style={{ color: getSeverityColor(issue.severity) }}>
                    {getIssueIcon(issue.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                        {issue.title}
                      </h4>
                      <DSBadge variant={issue.severity === "critical" || issue.severity === "high" ? "error" : "warning"} size="sm">
                        {issue.severity.toUpperCase()}
                      </DSBadge>
                    </div>
                    <p style={{ fontSize: typography.sizes.xs, color: colors.text.muted, marginBottom: spacing.xs }}>
                      {crop.plotName} - {crop.commodity} • {issue.detectedDate.toLocaleDateString()}
                    </p>
                    <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                      {issue.description}
                    </p>
                    {issue.actionRequired && (
                      <DSButton variant="primary" size="sm" className="mt-3">
                        Take Action
                      </DSButton>
                    )}
                  </div>
                </div>
              </DSCard>
            ))
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <DSCard variant="elevated" padding="lg">
            <div className="text-center py-12">
              <TrendingUp size={48} className="mx-auto mb-3" style={{ color: colors.text.muted }} />
              <p style={{ fontSize: typography.sizes.base, color: colors.text.secondary }}>
                Detailed analytics and trend charts coming soon
              </p>
            </div>
          </DSCard>
        </TabsContent>
      </Tabs>

      {/* Issue Details Modal */}
      <AnimatePresence>
        {showIssueDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => setShowIssueDetails(null)}
          >
            <div className="min-h-screen px-4 py-8 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-2xl">
                <DSCard variant="elevated" padding="lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.semibold, color: colors.blue.primary }}>
                      Issue Details
                    </h3>
                    <button onClick={() => setShowIssueDetails(null)} className="p-2 rounded-lg hover:bg-white/30 transition-colors">
                      <X size={24} style={{ color: colors.text.muted }} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                          {showIssueDetails.title}
                        </h4>
                        <DSBadge
                          variant={showIssueDetails.severity === "critical" || showIssueDetails.severity === "high" ? "error" : "warning"}
                          size="sm"
                        >
                          {showIssueDetails.severity.toUpperCase()}
                        </DSBadge>
                      </div>
                      <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                        {showIssueDetails.description}
                      </p>
                    </div>

                    {showIssueDetails.images && showIssueDetails.images.length > 0 && (
                      <div>
                        <h5 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary, marginBottom: spacing.sm }}>
                          Evidence Photos
                        </h5>
                        <div className="grid grid-cols-2 gap-3">
                          {showIssueDetails.images.map((img, idx) => (
                            <img key={idx} src={img} alt="Issue evidence" className="w-full h-48 object-cover rounded-lg" />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <DSButton variant="primary" size="lg" fullWidth>
                        Mark as Resolved
                      </DSButton>
                      <DSButton variant="outline" size="lg" fullWidth>
                        Get Expert Help
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
