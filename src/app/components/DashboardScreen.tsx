import { useState } from "react";
import { motion } from "motion/react";
import {
  Home,
  TrendingUp,
  Wallet,
  User,
  ArrowRight,
  Plus,
  FileText,
  DollarSign,
  Truck,
  Shield,
  TrendingDown,
  Brain,
  BarChart3,
  Clock,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

interface DashboardScreenProps {
  userName?: string;
  commitCoins?: number;
  onBack?: () => void;
}

export function DashboardScreen({
  userName = "Rajesh Kumar",
  commitCoins = 75,
  onBack,
}: DashboardScreenProps) {
  const [activeTab, setActiveTab] = useState<"home" | "trades" | "wallet" | "profile">("home");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Quick actions data
  const quickActions = [
    { id: 1, label: "Add Producer", icon: Plus, color: "from-[#FFD700] to-[#FFC700]" },
    { id: 2, label: "Add Transaction", icon: FileText, color: "from-[#FFD700] to-[#FFC700]" },
    { id: 3, label: "Request Advance", icon: DollarSign, color: "from-[#FFD700] to-[#FFC700]" },
    { id: 4, label: "Book Transport", icon: Truck, color: "from-[#FFD700] to-[#FFC700]" },
    { id: 5, label: "Buy Insurance", icon: Shield, color: "from-[#FFD700] to-[#FFC700]" },
  ];

  // AI Insights data
  const aiInsights = [
    {
      id: 1,
      icon: "📊",
      title: "Demand & Supply Trends",
      description: "Live commodity trend overview",
      gradient: "from-blue-50 to-cyan-50",
      accentColor: "text-blue-600",
    },
    {
      id: 2,
      icon: "🧠",
      title: "Smart Sell Suggestions",
      description: "AI suggests optimal sell window",
      gradient: "from-purple-50 to-pink-50",
      accentColor: "text-purple-600",
    },
    {
      id: 3,
      icon: "📈",
      title: "Price Forecast",
      description: "Future price projection chart preview",
      gradient: "from-green-50 to-emerald-50",
      accentColor: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4FC] to-[#D9F2FF] pb-24">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#003E6D]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 px-4 pt-6 pb-8 max-w-md mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Section - Greeting & Avatar */}
        <motion.div className="mb-6" variants={itemVariants}>
          {/* Soft Gold Back Button */}
          {onBack && (
            <motion.div 
              className="mb-4 flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
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
              >
                <ArrowLeft 
                  className="w-5 h-5" 
                  style={{ color: '#FFD700' }}
                />
              </motion.button>
            </motion.div>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-[#FFD700] shadow-lg">
                <AvatarImage src="" alt={userName} />
                <AvatarFallback className="bg-gradient-to-br from-[#FFD700] to-[#FFC700] text-white">
                  {userName.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1
                  className="text-[#003E6D]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "1.25rem",
                  }}
                >
                  Welcome back,
                </h1>
                <p
                  className="text-[#003E6D]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    marginTop: "-0.25rem",
                  }}
                >
                  {userName}!
                </p>
              </div>
            </div>
            {/* TRADIE Logo Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#FFD700] blur-xl opacity-40"></div>
              <div className="relative bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <span className="text-[#FFD700]">✨</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Commit Coin Wallet Card */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-white to-[#FFD700]/5 border-2 border-[#FFD700]/30 shadow-xl rounded-3xl p-6 mb-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p
                  className="text-[#003E6D]/70 mb-1"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                  }}
                >
                  Your Wallet
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  <h2
                    className="text-[#003E6D]"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: "2rem",
                    }}
                  >
                    {commitCoins}
                  </h2>
                  <span
                    className="text-[#003E6D]"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "1.25rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Commit Coins
                  </span>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  className="text-[#003E6D] hover:text-[#FFD700] hover:bg-[#FFD700]/10"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
            <Button
              variant="link"
              className="text-[#003E6D] hover:text-[#FFD700] p-0 h-auto"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
              }}
            >
              View Transaction History <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Card>
        </motion.div>

        {/* Motivational Tagline */}
        <motion.div variants={itemVariants} className="mb-8">
          <p
            className="text-center text-[#003E6D]/70 italic px-4"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.875rem",
              lineHeight: "1.6",
            }}
          >
            "Empowering producers, traders, and agents — powered by AI."
          </p>
        </motion.div>

        {/* AI Insights Section */}
        <motion.div variants={fadeInVariants} className="mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3
              className="text-[#003E6D]"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "1.125rem",
              }}
            >
              AI Insights
            </h3>
            <Button
              variant="ghost"
              className="text-[#003E6D]/60 hover:text-[#FFD700] p-0 h-auto"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
              }}
            >
              See all
            </Button>
          </div>

          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`bg-gradient-to-br ${insight.gradient} border border-white/50 shadow-lg rounded-2xl p-5 cursor-pointer hover:shadow-xl transition-shadow`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#FFD700] blur-md opacity-30"></div>
                        <div className="relative bg-white rounded-2xl w-14 h-14 flex items-center justify-center shadow-md">
                          <span className="text-3xl">{insight.icon}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`${insight.accentColor} mb-1`}
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 600,
                          fontSize: "1rem",
                        }}
                      >
                        {insight.title}
                      </h4>
                      <p
                        className="text-[#003E6D]/70"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.875rem",
                        }}
                      >
                        {insight.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#003E6D]/40 flex-shrink-0" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div variants={fadeInVariants} className="mb-4">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3
              className="text-[#003E6D]"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "1.125rem",
              }}
            >
              Quick Actions
            </h3>
          </div>

          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.id}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-shrink-0"
                  >
                    <div className="flex flex-col items-center gap-3 w-24">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#FFD700] blur-lg opacity-40"></div>
                        <Button
                          className={`relative bg-gradient-to-br ${action.color} hover:shadow-xl shadow-lg rounded-full w-16 h-16 p-0`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </Button>
                      </div>
                      <p
                        className="text-[#003E6D] text-center leading-tight"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.75rem",
                        }}
                      >
                        {action.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </ScrollArea>
        </motion.div>
      </motion.div>

      {/* Bottom Navigation Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-white/50 shadow-2xl z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-around">
            {[
              { id: "home", icon: Home, label: "Home" },
              { id: "trades", icon: TrendingUp, label: "Trades" },
              { id: "wallet", icon: Wallet, label: "Wallet" },
              { id: "profile", icon: User, label: "Profile" },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="flex flex-col items-center gap-1 relative"
                  whileTap={{ scale: 0.9 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute -inset-2 bg-[#FFD700]/20 rounded-2xl"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative">
                    {isActive && (
                      <div className="absolute inset-0 bg-[#FFD700] blur-lg opacity-60"></div>
                    )}
                    <Icon
                      className={`w-6 h-6 relative z-10 ${
                        isActive ? "text-[#FFD700]" : "text-[#003E6D]/60"
                      }`}
                    />
                  </div>
                  <span
                    className={`${
                      isActive ? "text-[#FFD700]" : "text-[#003E6D]/60"
                    } relative z-10`}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}