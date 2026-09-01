import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner@2.0.3";
import { DSButton, DSCard, DSBadge, designTokens } from "../design-system";

interface DashboardScreenProps {
  userName?: string;
  commitCoins?: number;
  onBack?: () => void;
}

const { colors, typography, spacing, radius, shadows, animations } = designTokens;

// Enhanced motion tokens for dashboard
const dashboardMotion = {
  refresh: {
    duration: 1.5,
    ease: 'easeInOut',
  },
  coin: {
    duration: 0.8,
    ease: 'easeOut',
  },
  cardUpdate: {
    duration: 0.25,
    ease: 'easeOut',
  },
  pulse: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
  tooltip: {
    duration: 0.3,
    ease: 'easeInOut',
  },
};

interface AIInsight {
  id: string;
  icon: string;
  title: string;
  description: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  state: 'idle' | 'loading' | 'updated' | 'error';
  lastUpdated?: string;
}

export function DashboardScreenEnhanced({
  userName = "Rajesh Kumar",
  commitCoins: initialCoins = 75,
  onBack,
}: DashboardScreenProps) {
  const [activeTab, setActiveTab] = useState<"home" | "trades" | "wallet" | "profile">("home");
  const [commitCoins, setCommitCoins] = useState(initialCoins);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([
    {
      id: "demand",
      icon: "📊",
      title: "Demand & Supply Trends",
      description: "Live commodity trend overview",
      value: "High Demand",
      change: 12.5,
      trend: "up",
      state: "idle",
      lastUpdated: "Just now",
    },
    {
      id: "sell",
      icon: "🧠",
      title: "Best Time to Sell",
      description: "AI suggests optimal sell window",
      value: "Next 48 hours",
      change: 8.3,
      trend: "up",
      state: "idle",
      lastUpdated: "2 min ago",
    },
    {
      id: "advances",
      icon: "💰",
      title: "Advances Issued",
      description: "Total advances this month",
      value: "₹45,000",
      change: 15.2,
      trend: "up",
      state: "idle",
      lastUpdated: "5 min ago",
    },
    {
      id: "settlements",
      icon: "📈",
      title: "Pending Settlements",
      description: "Awaiting settlement completion",
      value: "3 Pending",
      change: -5.1,
      trend: "down",
      state: "idle",
      lastUpdated: "10 min ago",
    },
  ]);

  // Simulate live data updates
  const refreshData = useCallback(async () => {
    setIsRefreshing(true);
    
    // Set all cards to loading
    setAiInsights(prev => prev.map(insight => ({
      ...insight,
      state: 'loading' as const
    })));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update with new random data
    setAiInsights(prev => prev.map(insight => {
      const newChange = Math.random() * 20 - 5;
      const newTrend = newChange > 0 ? 'up' : 'down';
      
      return {
        ...insight,
        change: parseFloat(newChange.toFixed(1)),
        trend: newTrend as 'up' | 'down',
        state: 'updated' as const,
        lastUpdated: 'Just now',
      };
    }));

    setIsRefreshing(false);
    toast.success("Dashboard refreshed!");

    // Reset to idle after animation
    setTimeout(() => {
      setAiInsights(prev => prev.map(insight => ({
        ...insight,
        state: 'idle' as const
      })));
    }, 2000);
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshData();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, refreshData]);

  // Simulate coin reward
  const addCoins = (amount: number) => {
    setShowCoinAnimation(true);
    setTimeout(() => {
      setCommitCoins(prev => prev + amount);
      setShowCoinAnimation(false);
      toast.success(`+${amount} Commit Coins earned!`);
    }, 800);
  };

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

  // Card state variants
  const cardStateVariants = {
    idle: {
      scale: 1,
      boxShadow: shadows.md,
    },
    loading: {
      scale: 1,
      boxShadow: shadows.lg,
    },
    updated: {
      scale: 1.02,
      boxShadow: shadows.goldLg,
      transition: {
        duration: 0.25,
      }
    },
    error: {
      scale: 1,
      boxShadow: `0 10px 30px -5px rgba(239, 68, 68, 0.3)`,
    },
  };

  return (
    <div className="min-h-screen pb-24" style={{
      background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})`,
    }}>
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ backgroundColor: `${colors.accent.gold}10` }}></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" style={{ backgroundColor: `${colors.blue.primary}10` }}></div>

      {/* Falling Coins Animation */}
      <AnimatePresence>
        {showCoinAnimation && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="fixed w-8 h-8 text-3xl pointer-events-none"
                style={{
                  left: `${40 + Math.random() * 20}%`,
                  bottom: '10%',
                  zIndex: 1000,
                }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  y: -200,
                  x: Math.random() * 100 - 50,
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
              >
                💰
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="relative z-10 px-4 pt-6 pb-8 max-w-md mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Section - Greeting & Controls */}
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
                  background: `linear-gradient(135deg, ${colors.surface.primary}95, ${colors.surface.primary}85)`,
                  borderColor: `${colors.accent.gold}40`,
                  boxShadow: `0 4px 12px ${colors.accent.gold}20, 0 2px 4px ${colors.blue.primary}10`,
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: `0 6px 20px ${colors.accent.gold}30, 0 3px 6px ${colors.blue.primary}15`,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft 
                  className="w-5 h-5" 
                  style={{ color: colors.accent.gold }}
                />
              </motion.button>
            </motion.div>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className="w-12 h-12 border-2 shadow-lg" style={{ borderColor: colors.accent.gold }}>
                  <AvatarImage src="" alt={userName} />
                  <AvatarFallback 
                    className="text-white"
                    style={{
                      background: `linear-gradient(to bottom right, ${colors.accent.gold}, ${colors.accent.goldDark})`,
                    }}
                  >
                    {userName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <div>
                <h1
                  style={{
                    ...typography.styles.h3,
                    color: colors.blue.primary,
                    marginBottom: spacing[1],
                  }}
                >
                  Welcome back,
                </h1>
                <p
                  style={{
                    ...typography.styles.h2,
                    color: colors.blue.primary,
                    marginTop: 0,
                  }}
                >
                  {userName.split(" ")[0]}! 👋
                </p>
              </div>
            </div>
            
            {/* Refresh & Auto-refresh Controls */}
            <div className="flex gap-2">
              {/* Auto-refresh Toggle */}
              <motion.button
                onClick={() => {
                  setAutoRefresh(!autoRefresh);
                  toast.success(autoRefresh ? "Auto-refresh disabled" : "Auto-refresh enabled");
                }}
                className="relative p-2 rounded-full border backdrop-blur-sm"
                style={{
                  backgroundColor: autoRefresh ? `${colors.accent.gold}20` : `${colors.surface.primary}90`,
                  borderColor: autoRefresh ? colors.accent.gold : `${colors.border.default}`,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {autoRefresh && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${colors.accent.gold}` }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
                <Brain 
                  className="w-5 h-5" 
                  style={{ color: autoRefresh ? colors.accent.gold : colors.blue.primary }}
                />
              </motion.button>

              {/* Refresh Button */}
              <motion.button
                onClick={refreshData}
                disabled={isRefreshing}
                className="p-2 rounded-full border backdrop-blur-sm"
                style={{
                  backgroundColor: `${colors.surface.primary}90`,
                  borderColor: `${colors.border.default}`,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                  transition={isRefreshing ? {
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  } : {}}
                >
                  <RefreshCw 
                    className="w-5 h-5" 
                    style={{ color: colors.blue.primary }}
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Commit Coin Wallet Card with Pulse */}
        <motion.div variants={itemVariants}>
          <motion.div
            className="rounded-3xl p-6 mb-6 border-2 shadow-xl"
            style={{
              background: `linear-gradient(to bottom right, ${colors.surface.primary}, ${colors.accent.gold}05)`,
              borderColor: `${colors.accent.gold}30`,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p
                  className="mb-1"
                  style={{
                    fontFamily: typography.fonts.caption,
                    fontSize: typography.sizes.sm,
                    color: `${colors.blue.primary}70`,
                  }}
                >
                  Your Wallet
                </p>
                <div className="flex items-center gap-2">
                  <motion.span 
                    className="text-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    💰
                  </motion.span>
                  <motion.h2
                    key={commitCoins}
                    initial={{ scale: 1.2, color: colors.accent.gold }}
                    animate={{ scale: 1, color: colors.blue.primary }}
                    transition={{ duration: 0.5 }}
                    style={{
                      fontFamily: typography.fonts.subheading,
                      fontWeight: typography.weights.bold,
                      fontSize: typography.sizes['3xl'],
                    }}
                  >
                    {commitCoins}
                  </motion.h2>
                  <span
                    style={{
                      fontFamily: typography.fonts.subheading,
                      fontWeight: typography.weights.semibold,
                      fontSize: typography.sizes.lg,
                      color: colors.blue.primary,
                      marginTop: spacing[2],
                    }}
                  >
                    Commit Coins
                  </span>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <DSButton variant="ghost" size="sm">
                  <ArrowRight className="w-5 h-5" />
                </DSButton>
              </motion.div>
            </div>
            
            {/* Pulsing Gold Glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                boxShadow: `0 0 20px ${colors.accent.gold}40`,
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            <button
              onClick={() => {}}
              className="p-0 h-auto underline decoration-2 underline-offset-2"
              style={{
                fontFamily: typography.fonts.caption,
                fontSize: typography.sizes.sm,
                color: colors.blue.primary,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.accent.gold}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.blue.primary}
            >
              View Transaction History <ChevronRight className="w-4 h-4 ml-1 inline" />
            </button>
          </motion.div>
        </motion.div>

        {/* Motivational Tagline */}
        <motion.div variants={itemVariants} className="mb-8">
          <p
            className="text-center italic px-4"
            style={{
              fontFamily: typography.fonts.caption,
              fontSize: typography.sizes.sm,
              color: `${colors.blue.primary}70`,
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            "Empowering producers, traders, and agents — powered by AI."
          </p>
        </motion.div>

        {/* AI Insights Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <h3
                style={{
                  ...typography.styles.h3,
                  color: colors.blue.primary,
                }}
              >
                AI Insights
              </h3>
              {autoRefresh && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <DSBadge variant="gold" size="sm">
                    Live
                  </DSBadge>
                </motion.div>
              )}
            </div>
            <button
              className="p-0 h-auto"
              style={{
                fontFamily: typography.fonts.caption,
                fontSize: typography.sizes.sm,
                color: `${colors.blue.primary}60`,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.accent.gold}
              onMouseLeave={(e) => e.currentTarget.style.color = `${colors.blue.primary}60`}
            >
              See all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="relative rounded-2xl p-5 cursor-pointer overflow-hidden"
                  style={{
                    backgroundColor: colors.surface.primary,
                    border: `1px solid ${colors.border.light}`,
                  }}
                  variants={cardStateVariants}
                  animate={insight.state}
                >
                  {/* Shimmer Loading Effect */}
                  {insight.state === 'loading' && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${colors.accent.gold}20, transparent)`,
                      }}
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  )}

                  {/* Updated Pulse Glow */}
                  {insight.state === 'updated' && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        boxShadow: `0 0 20px ${colors.accent.gold}60`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1 }}
                    />
                  )}

                  <div className="flex items-start gap-4 relative z-10">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 blur-md opacity-30" style={{ backgroundColor: colors.accent.gold }}></div>
                        <div 
                          className="relative rounded-2xl w-14 h-14 flex items-center justify-center shadow-md"
                          style={{ backgroundColor: colors.surface.primary }}
                        >
                          <span className="text-3xl">{insight.icon}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4
                        className="mb-1"
                        style={{
                          fontFamily: typography.fonts.subheading,
                          fontWeight: typography.weights.semibold,
                          fontSize: typography.sizes.base,
                          color: colors.blue.primary,
                        }}
                      >
                        {insight.title}
                      </h4>
                      <p
                        className="mb-2"
                        style={{
                          fontFamily: typography.fonts.caption,
                          fontSize: typography.sizes.sm,
                          color: `${colors.blue.primary}70`,
                        }}
                      >
                        {insight.description}
                      </p>
                      
                      {/* Value with Trend */}
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          style={{
                            fontFamily: typography.fonts.label,
                            fontWeight: typography.weights.bold,
                            fontSize: typography.sizes.base,
                            color: colors.blue.primary,
                          }}
                        >
                          {insight.value}
                        </span>
                        <motion.div
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: insight.trend === 'up' 
                              ? `${colors.status.success}15` 
                              : `${colors.status.error}15`,
                          }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {insight.trend === 'up' ? (
                            <ArrowUpRight className="w-3 h-3" style={{ color: colors.status.success }} />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" style={{ color: colors.status.error }} />
                          )}
                          <span
                            style={{
                              fontFamily: typography.fonts.label,
                              fontSize: typography.sizes.xs,
                              fontWeight: typography.weights.semibold,
                              color: insight.trend === 'up' ? colors.status.success : colors.status.error,
                            }}
                          >
                            {Math.abs(insight.change)}%
                          </span>
                        </motion.div>
                      </div>

                      {/* Last Updated */}
                      <motion.p
                        className="text-xs flex items-center gap-1"
                        style={{
                          fontFamily: typography.fonts.caption,
                          fontSize: typography.sizes.xs,
                          color: `${colors.blue.primary}50`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Clock className="w-3 h-3" />
                        {insight.lastUpdated}
                      </motion.p>
                    </div>
                    <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: `${colors.blue.primary}40` }} />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Test Coin Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <DSButton
            onClick={() => addCoins(3)}
            variant="secondary"
            size="md"
            fullWidth
            icon={<Sparkles className="w-5 h-5" />}
          >
            Simulate Coin Reward (+3)
          </DSButton>
        </motion.div>
      </motion.div>

      {/* Bottom Navigation Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 border-t shadow-2xl z-50"
        style={{
          backgroundColor: `${colors.surface.primary}80`,
          backdropFilter: 'blur(16px)',
          borderColor: `${colors.surface.primary}50`,
        }}
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
                      className="absolute -inset-2 rounded-2xl"
                      style={{ backgroundColor: `${colors.accent.gold}20` }}
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative">
                    {isActive && (
                      <div className="absolute inset-0 blur-lg opacity-60" style={{ backgroundColor: colors.accent.gold }}></div>
                    )}
                    <Icon
                      className="w-6 h-6 relative z-10"
                      style={{ color: isActive ? colors.accent.gold : `${colors.blue.primary}60` }}
                    />
                  </div>
                  <span
                    className="relative z-10"
                    style={{
                      fontFamily: typography.fonts.caption,
                      fontSize: typography.sizes.xs,
                      fontWeight: isActive ? typography.weights.semibold : typography.weights.regular,
                      color: isActive ? colors.accent.gold : `${colors.blue.primary}60`,
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