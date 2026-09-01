import { useState } from "react";
import { motion } from "motion/react";
import {
  Home,
  TrendingUp,
  Wallet,
  User,
  HelpCircle,
  Bell,
  Settings,
  Plus,
  FileText,
  DollarSign,
  Truck,
  Shield,
  ChevronRight,
  ArrowUpRight,
  TrendingDown,
  ArrowLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

interface WebDashboardScreenProps {
  userName?: string;
  commitCoins?: number;
  onBack?: () => void;
}

export function WebDashboardScreen({
  userName = "Rajesh Kumar",
  commitCoins = 75,
  onBack,
}: WebDashboardScreenProps) {
  const [activeNav, setActiveNav] = useState<"home" | "trades" | "wallet" | "profile" | "help">("home");
  const [notifications] = useState(3);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // AI Insights data
  const aiInsights = [
    {
      id: 1,
      icon: "📊",
      title: "Demand & Supply Trends",
      description: "Live commodity trend overview",
      trend: "+12.5%",
      trendUp: true,
      accentColor: "bg-blue-500",
    },
    {
      id: 2,
      icon: "🧠",
      title: "Smart Sell Suggestions",
      description: "AI suggests optimal sell window",
      trend: "Peak in 3 days",
      trendUp: true,
      accentColor: "bg-purple-500",
    },
    {
      id: 3,
      icon: "📈",
      title: "Price Forecast",
      description: "Future price projection chart preview",
      trend: "+8.3%",
      trendUp: true,
      accentColor: "bg-green-500",
    },
  ];

  // Quick actions data
  const quickActions = [
    { id: 1, label: "Add Producer", icon: Plus, color: "from-[#FFD700] to-[#FFC700]" },
    { id: 2, label: "Add Transaction", icon: FileText, color: "from-[#FFD700] to-[#FFC700]" },
    { id: 3, label: "Request Advance", icon: DollarSign, color: "from-[#FFD700] to-[#FFC700]" },
    { id: 4, label: "Book Transport", icon: Truck, color: "from-[#FFD700] to-[#FFC700]" },
    { id: 5, label: "Buy Insurance", icon: Shield, color: "from-[#FFD700] to-[#FFC700]" },
  ];

  // Recent transactions mock data
  const recentTransactions = [
    { id: 1, description: "Welcome Bonus", amount: "+50", date: "Today" },
    { id: 2, description: "Referral Reward", amount: "+25", date: "Yesterday" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4FC] to-[#D9F2FF] relative">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-[#FFD700]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-[#003E6D]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* Sticky Header Bar */}
      <motion.header
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back Button (if provided) + Logo */}
            <div className="flex items-center gap-4">
              {/* Soft Gold Back Button */}
              {onBack && (
                <motion.button
                  onClick={onBack}
                  className="flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md border shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, #FFFFFF95, #FFFFFF85)`,
                    borderColor: `#FFD70040`,
                    boxShadow: `0 4px 12px #FFD70020, 0 2px 4px #003E6D10`,
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: `0 6px 20px #FFD70030, 0 3px 6px #003E6D15`,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <ArrowLeft 
                    className="w-5 h-5" 
                    style={{ color: '#FFD700' }}
                  />
                </motion.button>
              )}
              
              <div className="relative">
                <div className="absolute inset-0 bg-[#FFD700] blur-xl opacity-40"></div>
                <img
                  src={tradieLogo}
                  alt="TRADIE"
                  className="relative w-12 h-12 drop-shadow-lg"
                />
              </div>
              <div>
                <h1
                  className="text-[#003E6D]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "1.5rem",
                  }}
                >
                  TRADIE
                </h1>
                <p
                  className="text-[#003E6D]/60 -mt-1"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.75rem",
                  }}
                >
                  Commodity Trading Platform
                </p>
              </div>
            </div>

            {/* Center: Page Title */}
            <div className="hidden md:block">
              <h2
                className="text-[#003E6D]"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                }}
              >
                Dashboard
              </h2>
            </div>

            {/* Right: User Info & Actions */}
            <div className="flex items-center gap-4">
              {/* Commit Coins Indicator */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-[#FFD700]/10 to-[#FFC700]/10 border-[#FFD700]/30 hover:border-[#FFD700] hover:bg-[#FFD700]/20"
                >
                  <span className="text-xl mr-2">💰</span>
                  <span
                    className="text-[#003E6D]"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {commitCoins} Coins
                  </span>
                </Button>
              </motion.div>

              {/* Notification Bell */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5 text-[#003E6D]" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {notifications}
                    </Badge>
                  )}
                </Button>
              </motion.div>

              {/* Settings */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5 text-[#003E6D]" />
                </Button>
              </motion.div>

              {/* User Avatar */}
              <div className="flex items-center gap-3 pl-2 border-l border-[#003E6D]/20">
                <div className="text-right hidden lg:block">
                  <p
                    className="text-[#003E6D]"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    {userName}
                  </p>
                  <p
                    className="text-[#003E6D]/60 -mt-1"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                    }}
                  >
                    Trader
                  </p>
                </div>
                <Avatar className="w-10 h-10 border-2 border-[#FFD700] shadow-md cursor-pointer hover:scale-105 transition-transform">
                  <AvatarImage src="" alt={userName} />
                  <AvatarFallback className="bg-gradient-to-br from-[#FFD700] to-[#FFC700] text-white">
                    {userName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content - 2 Column Grid */}
      <main className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - AI Insights */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            variants={slideInLeft}
          >
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <h3
                className="text-[#003E6D]"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "1.5rem",
                }}
              >
                AI Insights
              </h3>
              <Button
                variant="link"
                className="text-[#003E6D]/60 hover:text-[#FFD700]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.875rem",
                }}
              >
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* AI Insights Cards */}
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-white border border-white/50 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                    {/* Gold Accent Bar */}
                    <div className={`h-1 ${insight.accentColor}`}></div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          {/* Icon */}
                          <div className="flex-shrink-0">
                            <div className="relative">
                              <div className="absolute inset-0 bg-[#FFD700] blur-md opacity-20"></div>
                              <div className="relative bg-gradient-to-br from-[#F7FAFC] to-[#E8F4FC] rounded-xl w-16 h-16 flex items-center justify-center shadow-sm">
                                <span className="text-3xl">{insight.icon}</span>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <h4
                              className="text-[#003E6D] mb-2"
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 600,
                                fontSize: "1.125rem",
                              }}
                            >
                              {insight.title}
                            </h4>
                            <p
                              className="text-[#003E6D]/70 mb-4"
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.875rem",
                              }}
                            >
                              {insight.description}
                            </p>

                            {/* Mini Chart Placeholder */}
                            <div className="bg-gradient-to-r from-[#E8F4FC] to-[#D9F2FF] rounded-lg p-4 h-24 flex items-end gap-1">
                              {[40, 55, 45, 70, 60, 85, 75, 90].map((height, i) => (
                                <motion.div
                                  key={i}
                                  className="flex-1 bg-gradient-to-t from-[#FFD700] to-[#FFC700] rounded-t"
                                  style={{ height: `${height}%` }}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${height}%` }}
                                  transition={{ delay: index * 0.1 + i * 0.05, duration: 0.5 }}
                                ></motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Trend Badge */}
                          <div className="flex-shrink-0">
                            <Badge
                              className={`${
                                insight.trendUp
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              } border-0`}
                            >
                              {insight.trendUp ? (
                                <ArrowUpRight className="w-3 h-3 mr-1" />
                              ) : (
                                <TrendingDown className="w-3 h-3 mr-1" />
                              )}
                              {insight.trend}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Wallet & Quick Actions */}
          <motion.div
            className="lg:col-span-5 space-y-6"
            variants={slideInRight}
          >
            {/* Wallet Summary Card */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-white to-[#FFD700]/10 border-2 border-[#FFD700]/30 shadow-xl rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="text-[#003E6D]"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: "1.25rem",
                      }}
                    >
                      Commit Coin Wallet
                    </h3>
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      <span className="text-3xl">💰</span>
                    </motion.div>
                  </div>

                  <div className="mb-6">
                    <p
                      className="text-[#003E6D]/60 mb-2"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                      }}
                    >
                      Current Balance
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h2
                        className="text-[#003E6D]"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 700,
                          fontSize: "3rem",
                        }}
                      >
                        {commitCoins}
                      </h2>
                      <span
                        className="text-[#003E6D]/70"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 600,
                          fontSize: "1.25rem",
                        }}
                      >
                        Coins
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-white shadow-lg hover:shadow-xl transition-all"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    View Transaction History
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Recent Transactions */}
                  <div className="mt-6 pt-6 border-t border-[#003E6D]/10">
                    <h4
                      className="text-[#003E6D] mb-4"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        fontSize: "1rem",
                      }}
                    >
                      Recent Transactions
                    </h4>
                    <div className="space-y-3">
                      {recentTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-3 bg-white/50 rounded-lg"
                        >
                          <div>
                            <p
                              className="text-[#003E6D]"
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                              }}
                            >
                              {transaction.description}
                            </p>
                            <p
                              className="text-[#003E6D]/60"
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.75rem",
                              }}
                            >
                              {transaction.date}
                            </p>
                          </div>
                          <span
                            className="text-green-600"
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: 600,
                              fontSize: "0.875rem",
                            }}
                          >
                            {transaction.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions Card */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border border-white/50 shadow-lg rounded-2xl overflow-hidden">
                <div className="p-6">
                  <h3
                    className="text-[#003E6D] mb-6"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "1.25rem",
                    }}
                  >
                    Quick Actions
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <motion.div
                          key={action.id}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            className="w-full h-auto flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-[#F7FAFC] to-[#E8F4FC] hover:from-[#FFD700]/10 hover:to-[#FFC700]/10 border border-[#003E6D]/10 hover:border-[#FFD700]/50 text-[#003E6D] hover:text-[#003E6D] shadow-sm hover:shadow-md transition-all"
                            variant="outline"
                          >
                            <div className="relative">
                              <div className="absolute inset-0 bg-[#FFD700] blur-lg opacity-30"></div>
                              <div className={`relative bg-gradient-to-br ${action.color} rounded-full w-12 h-12 flex items-center justify-center shadow-md`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                            </div>
                            <span
                              className="text-center leading-tight"
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                              }}
                            >
                              {action.label}
                            </span>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer Navigation */}
      <motion.footer
        className="sticky bottom-0 z-40 bg-white/60 backdrop-blur-lg border-t border-white/50 mt-12"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Navigation Items */}
            <nav className="flex items-center gap-1">
              {[
                { id: "home", icon: Home, label: "Home" },
                { id: "trades", icon: TrendingUp, label: "Trades" },
                { id: "wallet", icon: Wallet, label: "Wallet" },
                { id: "profile", icon: User, label: "Profile" },
                { id: "help", icon: HelpCircle, label: "Help" },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveNav(item.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-[#FFD700]/20 text-[#003E6D]"
                        : "text-[#003E6D]/60 hover:text-[#003E6D] hover:bg-[#003E6D]/5"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-[#FFD700]" : ""}`} />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Footer Tagline */}
            <p
              className="text-[#003E6D]/60 italic hidden lg:block"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
              }}
            >
              "Empowering producers, traders, and agents — powered by AI and Commit Coins."
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}