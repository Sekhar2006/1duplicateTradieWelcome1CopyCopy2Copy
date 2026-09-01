import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  Settings,
  LogOut,
  HelpCircle,
  Plus,
  Package,
  ClipboardCheck,
  Users,
  Wallet,
  Warehouse,
  Truck,
  Shield,
  TrendingUp,
  QrCode,
  Bot,
  Leaf,
  Sprout,
  Calendar,
  FileText,
  Award,
  Database,
  DollarSign,
  Home,
  BarChart3,
  Activity as ActivityIcon,
  Briefcase,
  Target,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../design-system";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

// Import all producer dashboard components
import { AIInsightsCard } from "./producer-dashboard/AIInsightsCard";
import { FinanceSection } from "./producer-dashboard/FinanceSection";
import { ActivityTracking } from "./producer-dashboard/ActivityTracking";
import { ActivityLoggerEnhanced } from "./producer-dashboard/ActivityLoggerEnhanced";
import { CommoditiesDatabase } from "./producer-dashboard/CommoditiesDatabase";
import { GrokMonitor } from "./producer-dashboard/GrokMonitor";
import { GrokQRScanner } from "./producer-dashboard/GrokQRScanner";
import { PostRequirementAdvanced } from "./producer-dashboard/PostRequirementAdvanced";
import { CropHealthMonitor } from "./producer-dashboard/CropHealthMonitor";
import { CropLifecycleTracker } from "./producer-dashboard/CropLifecycleTracker";
import { InventoryStorage } from "./producer-dashboard/InventoryStorage";
import { ProducerProfile } from "./producer-dashboard/ProducerProfile";
import { SettingsSupport } from "./producer-dashboard/SettingsSupport";
import { InputCostTrackerEnhanced } from "./producer-dashboard/InputCostTrackerEnhanced";
import { ServicesResourcesEnhanced } from "./producer-dashboard/ServicesResourcesEnhanced";
import ProvenanceTrackerWithAuth from "./producer-dashboard/ProvenanceTrackerWithAuth";
import QualityCheckWorkflow from "./producer-dashboard/QualityCheckWorkflow";

const { colors, typography, spacing } = designTokens;

interface ProducerAIDashboardCompleteProps {
  producerName?: string;
  onBack?: () => void;
}

interface QuickAction {
  id: string;
  label: string;
  icon: any;
  color: string;
  section: string;
  description: string;
}

interface Notification {
  id: string;
  type: "ai" | "alert" | "info" | "fraud" | "anomaly";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  severity?: "low" | "medium" | "high" | "critical";
}

type Section =
  | "dashboard"
  | "post-requirement"
  | "crop-lifecycle"
  | "provenance"
  | "quality-check"
  | "activities"
  | "cost-tracker"
  | "crop-health"
  | "inventory"
  | "finance"
  | "services"
  | "ai-insights"
  | "commodities"
  | "profile"
  | "settings";

export function ProducerAIDashboardComplete({
  producerName = "Producer",
  onBack,
}: ProducerAIDashboardCompleteProps) {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "ai",
      title: "AI Market Alert",
      message: "Wheat prices expected to rise 8% in next 2 weeks. Best time to sell!",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: "2",
      type: "alert",
      title: "Settlement Due",
      message: "₹45,000 settlement due from Sharma Traders on Oct 25",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: "3",
      type: "anomaly",
      severity: "medium",
      title: "Grok Alert: Unusual Pattern",
      message: "Advance payment 15% higher than average - verify transaction",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false,
    },
  ]);

  // Comprehensive Quick Actions - ALL Producer Features
  const allQuickActions: QuickAction[] = [
    {
      id: "post-requirement",
      label: "Post Requirement",
      icon: <Plus size={24} />,
      color: colors.accent.gold,
      section: "post-requirement",
      description: "Post crop requirements to buyers",
    },
    {
      id: "crop-lifecycle",
      label: "Crop Lifecycle",
      icon: <Sprout size={24} />,
      color: "#22C55E",
      section: "crop-lifecycle",
      description: "Track from selection to harvest",
    },
    {
      id: "provenance",
      label: "Batch Tracking",
      icon: <Package size={24} />,
      color: "#3B82F6",
      section: "provenance",
      description: "Track batches & generate tokens",
    },
    {
      id: "quality-check",
      label: "Quality Check",
      icon: <ClipboardCheck size={24} />,
      color: "#10B981",
      section: "quality-check",
      description: "Submit quality parameters",
    },
    {
      id: "cost-tracker",
      label: "Input Costs",
      icon: <DollarSign size={24} />,
      color: "#F59E0B",
      section: "cost-tracker",
      description: "Track all farming expenses",
    },
    {
      id: "finance",
      label: "Finance",
      icon: <Wallet size={24} />,
      color: "#9333EA",
      section: "finance",
      description: "Manage advances & payments",
    },
    {
      id: "services",
      label: "Services",
      icon: <Briefcase size={24} />,
      color: "#EC4899",
      section: "services",
      description: "Storage, transport, insurance",
    },
    {
      id: "crop-health",
      label: "Crop Health",
      icon: <Leaf size={24} />,
      color: "#84CC16",
      section: "crop-health",
      description: "Monitor crop health & pests",
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: <Warehouse size={24} />,
      color: "#06B6D4",
      section: "inventory",
      description: "Manage stock & storage",
    },
    {
      id: "activities",
      label: "Activities",
      icon: <Calendar size={24} />,
      color: "#8B5CF6",
      section: "activities",
      description: "Log farming activities",
    },
    {
      id: "ai-insights",
      label: "AI Insights",
      icon: <Bot size={24} />,
      color: "#EF4444",
      section: "ai-insights",
      description: "Grok AI recommendations",
    },
    {
      id: "scan-qr",
      label: "QR Scanner",
      icon: <QrCode size={24} />,
      color: colors.accent.gold,
      section: "qr-scanner",
      description: "Scan & verify QR codes",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleQuickActionClick = (action: QuickAction) => {
    if (action.id === "scan-qr") {
      setShowQRScanner(true);
    } else {
      setActiveSection(action.section as Section);
    }
  };

  // Render active section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <DSCard variant="elevated" padding="md">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#22C55E20", color: "#22C55E" }}
                  >
                    <Package size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Total Batches</p>
                    <p className="text-2xl font-bold">48</p>
                  </div>
                </div>
              </DSCard>

              <DSCard variant="elevated" padding="md">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#F59E0B20", color: "#F59E0B" }}
                  >
                    <ClipboardCheck size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Quality Checks</p>
                    <p className="text-2xl font-bold">7</p>
                  </div>
                </div>
              </DSCard>

              <DSCard variant="elevated" padding="md">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#3B82F620", color: "#3B82F6" }}
                  >
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Tokens Issued</p>
                    <p className="text-2xl font-bold">35</p>
                  </div>
                </div>
              </DSCard>

              <DSCard variant="elevated" padding="md">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#9333EA20", color: "#9333EA" }}
                  >
                    <Wallet size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Total Revenue</p>
                    <p className="text-2xl font-bold">₹2.4L</p>
                  </div>
                </div>
              </DSCard>
            </div>

            {/* Quick Actions Grid */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.blue.primary }}>
                Quick Actions - All Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {allQuickActions.map((action, index) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <DSCard
                      variant="default"
                      padding="md"
                      hoverable
                      onClick={() => handleQuickActionClick(action)}
                      className="cursor-pointer h-full"
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: `${action.color}20`,
                            color: action.color,
                          }}
                        >
                          {action.icon}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{action.label}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </DSCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity & AI Insights */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <ActivityTracking />
              </div>
              <div>
                <AIInsightsCard />
              </div>
            </div>
          </div>
        );

      case "post-requirement":
        return <PostRequirementAdvanced onClose={() => setActiveSection("dashboard")} />;

      case "crop-lifecycle":
        return <CropLifecycleTracker onClose={() => setActiveSection("dashboard")} />;

      case "provenance":
        return (
          <ProvenanceTrackerWithAuth
            producerId="PROD001"
            producerName={producerName}
          />
        );

      case "quality-check":
        return <QualityCheckWorkflow />;

      case "cost-tracker":
        return <InputCostTrackerEnhanced />;

      case "finance":
        return <FinanceSection />;

      case "services":
        return <ServicesResourcesEnhanced />;

      case "crop-health":
        return <CropHealthMonitor />;

      case "inventory":
        return <InventoryStorage />;

      case "activities":
        return <ActivityLoggerEnhanced />;

      case "ai-insights":
        return <GrokMonitor />;

      case "commodities":
        return <CommoditiesDatabase />;

      case "profile":
        return <ProducerProfile producerName={producerName} />;

      case "settings":
        return <SettingsSupport />;

      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})`,
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: `${colors.surface.primary}F0`,
          borderColor: colors.border.light,
        }}
      >
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo & Greeting */}
            <div className="flex items-center gap-4">
              {onBack && (
                <DSButton variant="ghost" onClick={onBack}>
                  ← Back
                </DSButton>
              )}
              <div>
                <h1
                  className="text-2xl"
                  style={{
                    fontFamily: typography.fonts.heading,
                    color: colors.blue.primary,
                  }}
                >
                  TRADIE Producer
                </h1>
                <p className="text-sm text-slate-600">Welcome, {producerName}!</p>
              </div>
            </div>

            {/* Right: Notifications & Profile */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative p-2 rounded-lg hover:bg-white/50 transition-colors">
                    <Bell size={20} style={{ color: colors.text.secondary }} />
                    {unreadCount > 0 && (
                      <span
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold"
                        style={{
                          backgroundColor: colors.status.error,
                          color: "white",
                        }}
                      >
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-3 border-b">
                    <h4 className="font-semibold">Notifications</h4>
                  </div>
                  <ScrollArea className="h-64">
                    {notifications.map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        className="w-full text-left p-3 hover:bg-slate-50 border-b"
                      >
                        <div className="flex gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-semibold truncate">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <span
                                  className="w-2 h-2 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: colors.accent.gold }}
                                />
                              )}
                            </div>
                            <p className="text-xs text-slate-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              {new Date(notification.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="outline-none">
                    <Avatar
                      className="w-10 h-10 cursor-pointer border-2"
                      style={{ borderColor: colors.accent.gold }}
                    >
                      <AvatarFallback
                        style={{
                          backgroundColor: colors.blue.primary,
                          color: "white",
                        }}
                      >
                        {producerName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setActiveSection("profile")}>
                    <Users size={16} className="mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveSection("settings")}>
                    <Settings size={16} className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle size={16} className="mr-2" />
                    Help & Support
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onBack}>
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-[72px] z-40">
        <div className="px-4">
          <ScrollArea className="w-full">
            <div className="flex gap-1 py-2">
              {[
                { id: "dashboard", label: "🏠 Dashboard", icon: <Home size={16} /> },
                { id: "post-requirement", label: "🌾 Post", icon: <Plus size={16} /> },
                { id: "crop-lifecycle", label: "🌱 Lifecycle", icon: <Sprout size={16} /> },
                { id: "provenance", label: "📦 Batches", icon: <Package size={16} /> },
                { id: "quality-check", label: "✅ Quality", icon: <ClipboardCheck size={16} /> },
                { id: "cost-tracker", label: "💰 Costs", icon: <DollarSign size={16} /> },
                { id: "finance", label: "💳 Finance", icon: <Wallet size={16} /> },
                { id: "services", label: "🛠️ Services", icon: <Briefcase size={16} /> },
                { id: "crop-health", label: "🌿 Health", icon: <Leaf size={16} /> },
                { id: "inventory", label: "📦 Stock", icon: <Warehouse size={16} /> },
                { id: "activities", label: "📅 Activities", icon: <Calendar size={16} /> },
                { id: "ai-insights", label: "🤖 AI", icon: <Bot size={16} /> },
                { id: "commodities", label: "🗂️ Database", icon: <Database size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as Section)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeSection === tab.id
                      ? "bg-blue-500 text-white font-semibold"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderSectionContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <GrokQRScanner onClose={() => setShowQRScanner(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
