import { useState } from "react";
import { motion } from "motion/react";
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
  Mic,
  Camera,
  QrCode,
  Bot,
  Leaf,
  Droplet,
  Bug,
  Sprout,
  Calendar,
  FileText,
  Award,
  Database,
  ChevronRight,
  ChevronDown,
  Clock,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { AIInsightsCard } from "./producer-dashboard/AIInsightsCard";
import { FinanceSection } from "./producer-dashboard/FinanceSection";
import { ActivityTracking } from "./producer-dashboard/ActivityTracking";
import { CommoditiesDatabase } from "./producer-dashboard/CommoditiesDatabase";
import { GrokMonitor } from "./producer-dashboard/GrokMonitor";
import { grokAI, GrokAlert } from "./producer-dashboard/GrokAIService";
import { GrokQRScanner } from "./producer-dashboard/GrokQRScanner";
import { PostRequirement } from "./producer-dashboard/PostRequirement";
import { PostRequirementAdvanced } from "./producer-dashboard/PostRequirementAdvanced";
import { CropLifecycleTracker } from "./producer-dashboard/CropLifecycleTracker";
import { CropHealthMonitor } from "./producer-dashboard/CropHealthMonitor";
import { InventoryStorage } from "./producer-dashboard/InventoryStorage";
import { ProducerProfile } from "./producer-dashboard/ProducerProfile";
import { SettingsSupport } from "./producer-dashboard/SettingsSupport";
import { InputCostTrackerEnhanced } from "./producer-dashboard/InputCostTrackerEnhanced";
import { ServicesResourcesEnhanced } from "./producer-dashboard/ServicesResourcesEnhanced";

const { colors, typography, spacing, radius, shadows } = designTokens;

interface ProducerAIDashboardV2Props {
  producerName: string;
  onBack?: () => void;
}

interface QuickAction {
  id: string;
  label: string;
  icon: any;
  color: string;
  onClick: () => void;
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

export function ProducerAIDashboardV2({ producerName, onBack }: ProducerAIDashboardV2Props) {
  // Grok AI Alerts
  const [grokAlerts, setGrokAlerts] = useState<GrokAlert[]>([
    {
      id: "grok-1",
      type: "anomaly",
      severity: "medium",
      title: "Unusual Transaction Pattern",
      message: "Advance payment 15% higher than average",
      details: "Recent advance of ₹57,500 from Kumar Traders is 15% above your historical average of ₹50,000",
      recommendation: "Verify transaction details with the agent",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      riskScore: 35,
    },
    {
      id: "grok-2",
      type: "fraud",
      severity: "high",
      title: "Potential Duplicate Transaction",
      message: "Similar transaction detected within 24 hours",
      details: "Two advances of ₹50,000 from same party logged within 18 hours",
      recommendation: "Check for duplicate entry or verify both transactions",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      riskScore: 65,
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "anomaly",
      severity: "medium",
      title: "Grok Alert: Market Anomaly",
      message: "Wheat prices show 12% surge - unusual pattern detected",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: "2",
      type: "fraud",
      severity: "high",
      title: "Grok Alert: Transaction Review",
      message: "Duplicate advance pattern flagged for verification",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: "3",
      type: "ai",
      title: "AI Market Alert",
      message: "Wheat prices expected to rise 8% in next 2 weeks. Best time to sell!",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: "4",
      type: "alert",
      title: "Settlement Due",
      message: "₹45,000 settlement due from Sharma Traders on Oct 25",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: "5",
      type: "alert",
      title: "Pest Warning",
      message: "High aphid activity detected in your region. Consider preventive spray.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      read: true,
    },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "dashboard" | "post-requirement" | "crop-lifecycle" | "activities" | "crop-health" | "inventory" | "profile" | "settings" | "commodities" | "costs"
  >("dashboard");
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showCropLifecycle, setShowCropLifecycle] = useState(false);

  const quickActions: QuickAction[] = [
    {
      id: "post-req",
      label: "Post Requirement",
      icon: <Plus size={24} />,
      color: colors.accent.gold,
      onClick: () => setActiveSection("post-requirement"),
    },
    {
      id: "create-lot",
      label: "Create Lot",
      icon: <Package size={24} />,
      color: colors.status.info,
      onClick: () => console.log("Create Lot"),
    },
    {
      id: "request-qc",
      label: "Request QC",
      icon: <ClipboardCheck size={24} />,
      color: colors.status.success,
      onClick: () => console.log("Request QC"),
    },
    {
      id: "assign-agent",
      label: "Assign Agent",
      icon: <Users size={24} />,
      color: colors.status.warning,
      onClick: () => console.log("Assign Agent"),
    },
    {
      id: "record-advance",
      label: "Record Advance",
      icon: <Wallet size={24} />,
      color: "#9333EA",
      onClick: () => console.log("Record Advance"),
    },
    {
      id: "book-storage",
      label: "Book Storage",
      icon: <Warehouse size={24} />,
      color: "#EC4899",
      onClick: () => console.log("Book Storage"),
    },
    {
      id: "book-transport",
      label: "Book Transport",
      icon: <Truck size={24} />,
      color: "#F59E0B",
      onClick: () => console.log("Book Transport"),
    },
    {
      id: "add-insurance",
      label: "Add Insurance",
      icon: <Shield size={24} />,
      color: "#10B981",
      onClick: () => console.log("Add Insurance"),
    },
    {
      id: "scan-qr",
      label: "Grok QR Scan",
      icon: <QrCode size={24} />,
      color: colors.accent.gold,
      onClick: () => setShowQRScanner(true),
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
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
            {/* Left: Greeting */}
            <div>
              <h1
                style={{
                  fontFamily: typography.fonts.heading,
                  fontSize: typography.sizes.xl,
                  color: colors.blue.primary,
                  fontWeight: typography.weights.bold,
                }}
              >
                Welcome, {producerName} 🌾
              </h1>
              <p
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.text.secondary,
                }}
              >
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {/* AI Assistant */}
              <DSButton
                variant="outline"
                size="sm"
                leftIcon={<Bot size={18} />}
                onClick={() => console.log("AI Assistant")}
              >
                Ask AI
              </DSButton>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg hover:bg-white/50 transition-colors"
                >
                  <Bell size={24} style={{ color: colors.blue.primary }} />
                  {unreadCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white"
                      style={{
                        backgroundColor: colors.status.error,
                        fontSize: typography.sizes.xs,
                        fontWeight: typography.weights.semibold,
                      }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-80 rounded-lg shadow-xl overflow-hidden z-50"
                    style={{ backgroundColor: colors.surface.primary }}
                  >
                    <div
                      className="px-4 py-3 border-b"
                      style={{ borderColor: colors.border.light }}
                    >
                      <h3
                        style={{
                          fontFamily: typography.fonts.subheading,
                          fontSize: typography.sizes.base,
                          fontWeight: typography.weights.semibold,
                          color: colors.text.primary,
                        }}
                      >
                        Notifications ({unreadCount} new)
                      </h3>
                    </div>

                    <ScrollArea className="max-h-96">
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification.id)}
                          className="w-full px-4 py-3 text-left hover:bg-white/30 transition-colors border-b"
                          style={{
                            borderColor: colors.border.light,
                            backgroundColor: notification.read
                              ? "transparent"
                              : `${colors.accent.gold}10`,
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{
                                backgroundColor:
                                  notification.type === "fraud" || notification.severity === "critical"
                                    ? `${colors.status.error}20`
                                    : notification.type === "anomaly" || notification.severity === "high"
                                    ? `${colors.status.warning}20`
                                    : notification.type === "ai"
                                    ? `${colors.accent.gold}20`
                                    : notification.type === "alert"
                                    ? `${colors.status.error}20`
                                    : `${colors.status.info}20`,
                              }}
                            >
                              {notification.type === "fraud" ? (
                                <Shield
                                  size={16}
                                  style={{ color: colors.status.error }}
                                />
                              ) : notification.type === "anomaly" ? (
                                <AlertTriangle
                                  size={16}
                                  style={{ color: colors.status.warning }}
                                />
                              ) : notification.type === "ai" ? (
                                <Bot
                                  size={16}
                                  style={{ color: colors.accent.gold }}
                                />
                              ) : notification.type === "alert" ? (
                                <AlertTriangle
                                  size={16}
                                  style={{ color: colors.status.error }}
                                />
                              ) : (
                                <Bell
                                  size={16}
                                  style={{ color: colors.status.info }}
                                />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p
                                  className="truncate"
                                  style={{
                                    fontSize: typography.sizes.sm,
                                    fontWeight: typography.weights.semibold,
                                    color: colors.text.primary,
                                  }}
                                >
                                  {notification.title}
                                </p>
                                {notification.severity && (
                                  <DSBadge 
                                    variant={
                                      notification.severity === "critical" ? "error" :
                                      notification.severity === "high" ? "warning" :
                                      notification.severity === "medium" ? "info" : "default"
                                    }
                                    size="sm"
                                  >
                                    {notification.severity}
                                  </DSBadge>
                                )}
                                {!notification.read && (
                                  <span
                                    className="w-2 h-2 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: colors.accent.gold }}
                                  />
                                )}
                              </div>
                              <p
                                style={{
                                  fontSize: typography.sizes.xs,
                                  color: colors.text.secondary,
                                  marginTop: spacing.xs,
                                }}
                              >
                                {notification.message}
                              </p>
                              <p
                                style={{
                                  fontSize: typography.sizes.xs,
                                  color: colors.text.muted,
                                  marginTop: spacing.xs,
                                }}
                              >
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

                    <div
                      className="px-4 py-3 text-center border-t"
                      style={{ borderColor: colors.border.light }}
                    >
                      <button
                        style={{
                          fontSize: typography.sizes.sm,
                          color: colors.blue.primary,
                          fontWeight: typography.weights.medium,
                        }}
                      >
                        View All Notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

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
                          fontWeight: typography.weights.semibold,
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
                  <DropdownMenuItem onClick={() => setActiveSection("settings")}>
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

      {/* Main Content */}
      <div className="p-4 max-w-7xl mx-auto">
        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: typography.fonts.subheading,
              fontSize: typography.sizes.lg,
              fontWeight: typography.weights.semibold,
              color: colors.blue.primary,
            }}
          >
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <DSCard
                  variant="default"
                  padding="md"
                  hoverable
                  onClick={action.onClick}
                  className="cursor-pointer"
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
                    <p
                      style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.medium,
                        color: colors.text.primary,
                      }}
                    >
                      {action.label}
                    </p>
                  </div>
                </DSCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Tabs */}
        <Tabs value={activeSection} onValueChange={(v: any) => setActiveSection(v)}>
          <TabsList className="mb-6 grid grid-cols-4 md:grid-cols-9">
            <TabsTrigger value="dashboard">🏠 Dashboard</TabsTrigger>
            <TabsTrigger value="post-requirement">🌾 Post</TabsTrigger>
            <TabsTrigger value="activities">📅 Activities</TabsTrigger>
            <TabsTrigger value="costs">💰 Costs</TabsTrigger>
            <TabsTrigger value="services">🛠️ Services</TabsTrigger>
            <TabsTrigger value="crop-health">🌿 Health</TabsTrigger>
            <TabsTrigger value="inventory">📦 Inventory</TabsTrigger>
            <TabsTrigger value="profile">👤 Profile</TabsTrigger>
            <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Grok AI Monitor */}
            <GrokMonitor
              alerts={grokAlerts}
              totalTransactions={15}
              flaggedTransactions={2}
              verifiedActivities={12}
              totalActivities={15}
            />

            {/* AI Insights Card */}
            <AIInsightsCard />

            {/* Finance Section */}
            <FinanceSection />

            {/* History & Compliance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
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
                    📜 History & Compliance
                  </h3>
                  <DSButton variant="outline" size="sm">
                    View All
                  </DSButton>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      season: "Rabi 2024-25",
                      crops: "Wheat, Mustard",
                      yield: "24 quintal/acre",
                      status: "Active",
                    },
                    {
                      season: "Kharif 2024",
                      crops: "Rice, Cotton",
                      yield: "28 quintal/acre",
                      status: "Completed",
                    },
                  ].map((season, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border"
                      style={{
                        backgroundColor: colors.surface.secondary,
                        borderColor: colors.border.default,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p
                            style={{
                              fontSize: typography.sizes.sm,
                              fontWeight: typography.weights.semibold,
                              color: colors.text.primary,
                            }}
                          >
                            {season.season}
                          </p>
                          <p
                            style={{
                              fontSize: typography.sizes.xs,
                              color: colors.text.secondary,
                              marginTop: spacing.xs,
                            }}
                          >
                            Crops: {season.crops} • Yield: {season.yield}
                          </p>
                        </div>
                        <DSBadge
                          variant={season.status === "Active" ? "success" : "blue"}
                          size="sm"
                        >
                          {season.status}
                        </DSBadge>
                      </div>
                    </div>
                  ))}
                </div>
              </DSCard>
            </motion.div>
          </TabsContent>

          {/* Post Requirement Tab */}
          <TabsContent value="post-requirement">
            <PostRequirementAdvanced onClose={() => setActiveSection("dashboard")} />
          </TabsContent>

          {/* Activity Tracking Tab */}
          <TabsContent value="activities">
            <ActivityTracking />
          </TabsContent>

          {/* Input Costs & Expenses Tab */}
          <TabsContent value="costs">
            <InputCostTrackerEnhanced />
          </TabsContent>

          {/* Services & Resources Tab */}
          <TabsContent value="services">
            <ServicesResourcesEnhanced />
          </TabsContent>

          {/* Crop Health Tab */}
          <TabsContent value="crop-health">
            <CropHealthMonitor />
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory">
            <InventoryStorage />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <ProducerProfile />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <SettingsSupport />
          </TabsContent>

          {/* Commodities Tab (Legacy) */}
          <TabsContent value="commodities">
            <CommoditiesDatabase />
          </TabsContent>
        </Tabs>
      </div>

      {/* Blockchain Integration Footer */}
      <div
        className="mt-12 py-6 border-t"
        style={{
          backgroundColor: `${colors.surface.primary}80`,
          borderColor: colors.border.light,
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <p
              style={{
                fontSize: typography.sizes.sm,
                color: colors.text.muted,
              }}
            >
              Powered by Blockchain:
            </p>
            <div className="flex items-center gap-4">
              {["Ethereum", "Polygon", "Solana"].map((chain) => (
                <DSBadge key={chain} variant="blue" size="sm">
                  {chain}
                </DSBadge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grok QR Scanner Modal */}
      {showQRScanner && (
        <GrokQRScanner onClose={() => setShowQRScanner(false)} />
      )}
    </div>
  );
}
