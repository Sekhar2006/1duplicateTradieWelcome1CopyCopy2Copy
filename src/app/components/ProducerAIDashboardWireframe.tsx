import { useState } from "react";
import {
  Home,
  Package,
  ClipboardCheck,
  Award,
  FileText,
  Bot,
  User,
  Bell,
  Settings,
  LogOut,
  Search,
  Plus,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  QrCode,
  Camera,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { DSButton, DSCard, DSBadge } from "../design-system";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";

interface WireframeProps {
  variant?: "desktop" | "tablet";
}

export function ProducerAIDashboardWireframe({ variant = "desktop" }: WireframeProps) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard Home", icon: Home, badge: null },
    { id: "batches", label: "Crop Batches", icon: Package, badge: "12 active" },
    { id: "quality", label: "Quality Checks", icon: ClipboardCheck, badge: "3 pending" },
    { id: "tokens", label: "Tokenization", icon: Award, badge: "8 tokens" },
    { id: "history", label: "History Logs", icon: FileText, badge: null },
    { id: "ai", label: "AI Insights", icon: Bot, badge: "2 alerts" },
    { id: "profile", label: "Profile", icon: User, badge: null },
  ];

  const summaryCards = [
    {
      title: "Total Crop Batches",
      value: "48",
      subtitle: "4 pending quality check",
      icon: Package,
      gradient: "from-green-50 to-emerald-100",
      iconColor: "text-green-600",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Pending Quality Checks",
      value: "7",
      subtitle: "2 urgent",
      icon: ClipboardCheck,
      gradient: "from-amber-50 to-yellow-100",
      iconColor: "text-amber-600",
      trend: "3 today",
      trendUp: false,
    },
    {
      title: "Tokens Created",
      value: "35",
      subtitle: "8 this month",
      icon: Award,
      gradient: "from-blue-50 to-sky-100",
      iconColor: "text-blue-600",
      trend: "✓ 8",
      trendUp: true,
    },
    {
      title: "Recent History Entries",
      value: "124",
      subtitle: "15 today",
      icon: FileText,
      gradient: "from-purple-50 to-violet-100",
      iconColor: "text-purple-600",
      trend: "📊",
      trendUp: true,
    },
  ];

  const quickActions = [
    { label: "Add New Crop Batch", icon: Plus, color: "bg-green-600" },
    { label: "Start Quality Check", icon: ClipboardCheck, color: "bg-blue-600" },
    { label: "Generate Token & QR", icon: QrCode, color: "bg-purple-600" },
    { label: "Scan QR Code", icon: Camera, color: "bg-amber-600" },
    { label: "View Analytics", icon: BarChart3, color: "bg-cyan-600" },
    { label: "AI Assistant", icon: Bot, color: "bg-pink-600" },
  ];

  const activities = [
    {
      type: "batch",
      title: "New batch created",
      subtitle: "Batch #TB-2025-001 - Wheat (Durum)",
      time: "2 minutes ago",
      icon: Package,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      type: "quality",
      title: "Quality check completed",
      subtitle: "Batch #TB-2025-001 - Grade: A",
      time: "15 minutes ago",
      icon: CheckCircle,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      type: "token",
      title: "NFT token generated",
      subtitle: "Token #NFT-TB001-2025",
      time: "1 hour ago",
      icon: Award,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      type: "alert",
      title: "AI Alert: Anomaly detected",
      subtitle: "Review batch #TB-2025-003",
      time: "2 hours ago",
      icon: AlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  const aiInsights = [
    {
      severity: "high",
      title: "Quality Score Drop",
      message: "Batch #TB-2025-003 shows 15% decrease in quality. Review input costs.",
      severityColor: "bg-orange-100 border-orange-300 text-orange-800",
    },
    {
      severity: "medium",
      title: "Moisture Level Alert",
      message: "Moisture levels above threshold for storage. Consider drying.",
      severityColor: "bg-yellow-100 border-yellow-300 text-yellow-800",
    },
    {
      severity: "low",
      title: "Recommendation",
      message: "Based on weather forecast, optimal harvest window is next week.",
      severityColor: "bg-blue-100 border-blue-300 text-blue-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 h-18 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="font-bold text-2xl tracking-tight" style={{ color: '#003E6D', fontFamily: 'Montserrat, sans-serif' }}>
              TRADIE
            </div>
            
            {/* Search Bar */}
            {variant === "desktop" && (
              <div className="relative w-96 ml-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search batches, tokens, history..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                />
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-slate-100 rounded-lg">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <Avatar>
                <AvatarFallback className="bg-blue-600 text-white">RK</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <div className="text-sm font-semibold text-slate-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Rajesh Kumar
                </div>
                <div className="text-xs text-slate-500" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Producer
                </div>
              </div>
            </div>

            {/* Settings */}
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <Settings className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex pt-18">
        {/* Sidebar Navigation */}
        <div 
          className={`bg-white border-r border-slate-200 fixed left-0 top-18 bottom-0 transition-all duration-300 ${
            sidebarCollapsed ? 'w-18' : 'w-64'
          }`}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <DSBadge variant={isActive ? "default" : "secondary"} size="sm">
                          {item.badge}
                        </DSBadge>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Collapse Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-2 hover:bg-slate-100 rounded-lg"
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-18' : 'ml-64'}`}>
          <div className="p-8">
            {/* Dashboard Home View */}
            {activeSection === "dashboard" && (
              <div className="space-y-8">
                {/* Summary Cards */}
                <div>
                  <h2 className="text-2xl mb-6" style={{ 
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 700,
                    color: '#003E6D'
                  }}>
                    Dashboard Overview
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {summaryCards.map((card, index) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={index}
                          className={`p-6 rounded-xl bg-gradient-to-br ${card.gradient} border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <Icon className={`w-8 h-8 ${card.iconColor}`} />
                            <span className="text-sm font-medium text-slate-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                              {card.trend}
                            </span>
                          </div>
                          
                          <div className="text-3xl font-bold mb-1" style={{ 
                            fontFamily: 'Playfair Display, serif',
                            color: '#003E6D'
                          }}>
                            {card.value}
                          </div>
                          
                          <div className="text-sm font-medium text-slate-900 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {card.title}
                          </div>
                          
                          <div className="text-xs text-slate-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                            {card.subtitle}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-xl mb-4" style={{ 
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 600,
                    color: '#1E293B'
                  }}>
                    Quick Actions
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={index}
                          className={`${action.color} text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex items-center gap-3`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-semibold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {action.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Activity Feed & AI Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Activity Feed (Left - 2 columns) */}
                  <div className="lg:col-span-2">
                    <DSCard className="h-full">
                      <div className="p-6">
                        <h3 className="text-lg mb-4" style={{ 
                          fontFamily: 'Playfair Display, serif',
                          fontWeight: 600,
                          color: '#1E293B'
                        }}>
                          Recent Activity
                        </h3>
                        
                        <ScrollArea className="h-96">
                          <div className="space-y-4">
                            {activities.map((activity, index) => {
                              const Icon = activity.icon;
                              return (
                                <div key={index} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors">
                                  <div className={`${activity.iconBg} p-3 rounded-lg`}>
                                    <Icon className={`w-5 h-5 ${activity.iconColor}`} />
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="font-semibold text-sm text-slate-900 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                      {activity.title}
                                    </div>
                                    <div className="text-sm text-slate-600 mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                                      {activity.subtitle}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                      <Clock className="w-3 h-3" />
                                      {activity.time}
                                    </div>
                                  </div>
                                  
                                  <button className="text-slate-400 hover:text-slate-600">
                                    <ChevronRight className="w-4 h-4" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </ScrollArea>
                      </div>
                    </DSCard>
                  </div>

                  {/* AI Insights (Right - 1 column) */}
                  <div className="lg:col-span-1">
                    <DSCard className="h-full">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Bot className="w-5 h-5 text-pink-600" />
                          <h3 className="text-lg" style={{ 
                            fontFamily: 'Playfair Display, serif',
                            fontWeight: 600,
                            color: '#1E293B'
                          }}>
                            AI Insights
                          </h3>
                        </div>
                        
                        <div className="space-y-4">
                          {aiInsights.map((insight, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border ${insight.severityColor}`}
                            >
                              <div className="flex items-start gap-2 mb-2">
                                <AlertTriangle className="w-4 h-4 mt-0.5" />
                                <div className="font-semibold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                  {insight.title}
                                </div>
                              </div>
                              
                              <div className="text-sm mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>
                                {insight.message}
                              </div>
                              
                              <div className="flex gap-2">
                                <button className="px-3 py-1 bg-white rounded text-xs font-medium hover:bg-opacity-80">
                                  View Details
                                </button>
                                <button className="px-3 py-1 bg-white rounded text-xs font-medium hover:bg-opacity-80">
                                  Dismiss
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DSCard>
                  </div>
                </div>
              </div>
            )}

            {/* Other Sections Placeholder */}
            {activeSection !== "dashboard" && (
              <div className="text-center py-12">
                <h2 className="text-2xl mb-4" style={{ 
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 700,
                  color: '#003E6D'
                }}>
                  {menuItems.find(item => item.id === activeSection)?.label}
                </h2>
                <p className="text-slate-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                  This section will display {activeSection} content
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Design System Showcase */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-slate-200">
        <div className="text-xs text-slate-600 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Design System Applied:
        </div>
        <div className="space-y-1 text-xs" style={{ fontFamily: 'Lato, sans-serif' }}>
          <div className="text-green-600">✓ Playfair Display (Headings)</div>
          <div className="text-blue-600">✓ Montserrat (Labels/Buttons)</div>
          <div className="text-purple-600">✓ Lato (Body Text)</div>
          <div className="text-amber-600">✓ Soft Gold Accents (#FFD700)</div>
          <div className="text-slate-700">✓ Deep Blue Headings (#003E6D)</div>
        </div>
      </div>
    </div>
  );
}
