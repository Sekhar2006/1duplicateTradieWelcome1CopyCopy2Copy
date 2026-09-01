import { useState } from "react";
import { motion } from "motion/react";
import {
  Home,
  TrendingUp,
  MessageSquare,
  Menu,
  Plus,
  ShoppingCart,
  DollarSign,
  ClipboardCheck,
  User,
  Settings,
  LogOut,
  Bell,
  Package,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../design-system";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";

const { colors, typography, spacing, radius, shadows } = designTokens;

interface ProducerDashboardScreenProps {
  producerName?: string;
  onBack?: () => void;
  onAddProduce?: () => void;
  onViewOrders?: () => void;
  onRequestPayment?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

interface MetricCard {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color: string;
}

interface Notification {
  id: string;
  type: "sale" | "inspection" | "payment" | "order";
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

export function ProducerDashboardScreen({
  producerName = "Rajesh Kumar",
  onBack,
  onAddProduce,
  onViewOrders,
  onRequestPayment,
  onSettings,
  onLogout,
}: ProducerDashboardScreenProps) {
  const [activeTab, setActiveTab] = useState<"home" | "trends" | "messages" | "more">("home");

  // Mock data
  const metrics: MetricCard[] = [
    {
      label: "Total Produce Listed",
      value: "24",
      icon: <Package size={24} />,
      trend: "+3 this week",
      trendUp: true,
      color: colors.status.success,
    },
    {
      label: "Active Orders",
      value: "12",
      icon: <ShoppingCart size={24} />,
      trend: "5 pending",
      trendUp: false,
      color: colors.status.warning,
    },
    {
      label: "Payments Received",
      value: "₹45,230",
      icon: <DollarSign size={24} />,
      trend: "+12% this month",
      trendUp: true,
      color: colors.accent.gold,
    },
    {
      label: "Pending Inspections",
      value: "3",
      icon: <ClipboardCheck size={24} />,
      trend: "2 scheduled",
      trendUp: false,
      color: colors.status.info,
    },
  ];

  const notifications: Notification[] = [
    {
      id: "1",
      type: "sale",
      title: "Sale Approved",
      message: "Your wheat listing (500 kg) has been approved for sale",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: "2",
      type: "inspection",
      title: "Inspection Completed",
      message: "Quality verification passed for rice batch #R2024",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Received",
      message: "₹8,500 credited to your account for order #ORD-2401",
      time: "1 day ago",
      unread: false,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <CheckCircle2 size={20} style={{ color: colors.status.success }} />;
      case "inspection":
        return <ClipboardCheck size={20} style={{ color: colors.status.info }} />;
      case "payment":
        return <DollarSign size={20} style={{ color: colors.accent.gold }} />;
      default:
        return <Bell size={20} style={{ color: colors.text.muted }} />;
    }
  };

  return (
    <div
      className="min-h-screen pb-20"
      style={{
        background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})`,
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 backdrop-blur-sm"
        style={{
          background: `${colors.surface.primary}F0`,
          borderBottom: `1px solid ${colors.border.light}`,
        }}
      >
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Greeting */}
            <div>
              <h1
                style={{
                  fontFamily: typography.fonts.heading,
                  fontSize: typography.sizes.xl,
                  color: colors.blue.primary,
                  fontWeight: typography.weights.bold,
                }}
              >
                Welcome, {producerName}
              </h1>
              <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  <Avatar className="h-12 w-12 border-2" style={{ borderColor: colors.accent.gold }}>
                    <AvatarImage src="" alt={producerName} />
                    <AvatarFallback style={{ backgroundColor: colors.blue.primary, color: "white" }}>
                      {producerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={onSettings}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="p-4 space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <DSCard variant="elevated" padding="md">
                  <div className="flex flex-col">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                      style={{
                        backgroundColor: `${metric.color}15`,
                        color: metric.color,
                      }}
                    >
                      {metric.icon}
                    </div>
                    <div
                      className="mb-1"
                      style={{
                        fontSize: typography.sizes["2xl"],
                        fontWeight: typography.weights.bold,
                        color: colors.text.primary,
                      }}
                    >
                      {metric.value}
                    </div>
                    <div
                      className="mb-2"
                      style={{
                        fontSize: typography.sizes.xs,
                        color: colors.text.secondary,
                      }}
                    >
                      {metric.label}
                    </div>
                    {metric.trend && (
                      <div
                        className="text-xs"
                        style={{
                          color: metric.trendUp ? colors.status.success : colors.status.warning,
                        }}
                      >
                        {metric.trend}
                      </div>
                    )}
                  </div>
                </DSCard>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
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

            <div className="grid grid-cols-2 gap-3">
              <DSButton
                variant="primary"
                size="lg"
                onClick={onAddProduce}
                leftIcon={<Plus size={20} />}
                fullWidth
              >
                Add Produce
              </DSButton>

              <DSButton
                variant="outline"
                size="lg"
                onClick={onViewOrders}
                leftIcon={<ShoppingCart size={20} />}
                fullWidth
              >
                View Orders
              </DSButton>

              <DSButton
                variant="outline"
                size="lg"
                onClick={onRequestPayment}
                leftIcon={<DollarSign size={20} />}
                fullWidth
              >
                Request Payment
              </DSButton>

              <DSButton
                variant="outline"
                size="lg"
                onClick={onSettings}
                leftIcon={<Settings size={20} />}
                fullWidth
              >
                Settings
              </DSButton>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                style={{
                  fontFamily: typography.fonts.subheading,
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.semibold,
                  color: colors.blue.primary,
                }}
              >
                Recent Notifications
              </h2>
              <DSBadge variant="gold" size="sm">
                {notifications.filter((n) => n.unread).length} New
              </DSBadge>
            </div>

            <div className="space-y-3">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <DSCard
                    variant={notification.unread ? "gold" : "default"}
                    padding="md"
                    hoverable
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            style={{
                              fontSize: typography.sizes.sm,
                              fontWeight: typography.weights.semibold,
                              color: colors.text.primary,
                            }}
                          >
                            {notification.title}
                          </h3>
                          {notification.unread && (
                            <div
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: colors.accent.gold }}
                            />
                          )}
                        </div>
                        <p
                          className="mt-1"
                          style={{
                            fontSize: typography.sizes.xs,
                            color: colors.text.secondary,
                          }}
                        >
                          {notification.message}
                        </p>
                        <div
                          className="flex items-center gap-1 mt-2"
                          style={{
                            fontSize: typography.sizes.xs,
                            color: colors.text.muted,
                          }}
                        >
                          <Clock size={12} />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} style={{ color: colors.text.muted }} />
                    </div>
                  </DSCard>
                </motion.div>
              ))}
            </div>

            <button
              className="w-full mt-4 py-2 text-center"
              style={{
                color: colors.blue.light,
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.medium,
              }}
            >
              View All Notifications
            </button>
          </motion.div>
        </div>
      </ScrollArea>

      {/* Bottom Navigation */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 backdrop-blur-sm"
        style={{
          background: `${colors.surface.primary}F5`,
          borderTop: `1px solid ${colors.border.light}`,
          boxShadow: shadows.lg,
        }}
      >
        <div className="flex items-center justify-around py-3 px-2">
          {[
            { id: "home", label: "Home", icon: Home },
            { id: "trends", label: "Trends", icon: TrendingUp },
            { id: "messages", label: "Messages", icon: MessageSquare },
            { id: "more", label: "More", icon: Menu },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex flex-col items-center justify-center min-w-0 px-3 py-1 transition-all"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`p-2 rounded-xl transition-all ${
                      isActive ? "shadow-md" : ""
                    }`}
                    style={{
                      backgroundColor: isActive ? `${colors.accent.gold}20` : "transparent",
                      color: isActive ? colors.accent.gold : colors.text.muted,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <span
                    className="mt-1 text-xs truncate"
                    style={{
                      color: isActive ? colors.accent.gold : colors.text.muted,
                      fontWeight: isActive ? typography.weights.semibold : typography.weights.regular,
                    }}
                  >
                    {tab.label}
                  </span>
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
