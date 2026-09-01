import { useState, useId } from "react";
import { motion } from "motion/react";
import { Bot, Mic, TrendingUp, Calendar, Sparkles, Shield } from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { grokAI } from "./GrokAIService";

const { colors, typography } = designTokens;

const demandSupplyData = [
  { month: "Oct", demand: 85, supply: 75 },
  { month: "Nov", demand: 92, supply: 78 },
  { month: "Dec", demand: 88, supply: 82 },
  { month: "Jan", demand: 95, supply: 80 },
  { month: "Feb", demand: 100, supply: 85 },
  { month: "Mar", demand: 105, supply: 88 },
];

const SUGGESTED_QUERIES = [
  "Any fraud detected?",
  "Check for anomalies",
  "Best time to sell?",
  "Review my transactions",
  "Scan for unusual patterns",
];

export function AIInsightsCard() {
  const uid = useId().replace(/:/g, "");
  const demandGradId = `demand_${uid}`;
  const supplyGradId = `supply_${uid}`;

  const [isListening, setIsListening] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const processGrokQuery = async (query: string) => {
    setIsProcessing(true);
    setTimeout(async () => {
      const response = await grokAI.processVoiceQuery(query);
      setAiResponse(response);
      setIsProcessing(false);
    }, 1000);
  };

  const handleVoiceQuery = () => {
    setIsListening((prev) => {
      if (!prev) {
        setTimeout(() => {
          const queries = [
            "Any fraud detected in my last trade?",
            "What's the best time to sell wheat?",
            "Check for anomalies in my transactions",
            "Review my recent activities for issues",
          ];
          const randomQuery = queries[Math.floor(Math.random() * queries.length)];
          setAiQuery(randomQuery);
          setIsListening(false);
          processGrokQuery(randomQuery);
        }, 2000);
      }
      return !prev;
    });
  };

  const handleAskGrok = () => {
    if (aiQuery.trim()) processGrokQuery(aiQuery);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <DSCard variant="gold" padding="lg" className="border-2" style={{ borderColor: colors.accent.gold }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${colors.accent.gold}, ${colors.accent.goldDark})` }}
          >
            <Sparkles size={24} style={{ color: "white" }} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: typography.fonts.subheading,
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.bold,
                color: colors.blue.primary,
              }}
            >
              Grok AI Insights &amp; Fraud Detection
            </h3>
            <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
              Powered by xAI Grok - Real-time Analysis &amp; Anomaly Detection
            </p>
          </div>
        </div>

        {/* Demand/Supply Chart */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4
              style={{
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.semibold,
                color: colors.text.primary,
              }}
            >
              📊 Demand &amp; Supply Forecast
            </h4>
            <DSBadge variant="success" size="sm">Next 6 Months</DSBadge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demandSupplyData}>
                <defs>
                  <linearGradient id={demandGradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.status.success} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={colors.status.success} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id={supplyGradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.status.info} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={colors.status.info} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border.light} />
                <XAxis dataKey="month" stroke={colors.text.muted} />
                <YAxis stroke={colors.text.muted} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: colors.surface.primary,
                    border: `1px solid ${colors.border.default}`,
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="demand"
                  stroke={colors.status.success}
                  fillOpacity={1}
                  fill={`url(#${demandGradId})`}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="supply"
                  stroke={colors.status.info}
                  fillOpacity={1}
                  fill={`url(#${supplyGradId})`}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.status.success }} />
              <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>Market Demand</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.status.info }} />
              <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>Your Supply</span>
            </div>
          </div>
        </div>

        {/* Best Time to Sell */}
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `${colors.status.success}15` }}>
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: colors.status.success }}
            >
              <TrendingUp size={20} style={{ color: "white" }} />
            </div>
            <div className="flex-1">
              <h4
                className="mb-2"
                style={{
                  fontSize: typography.sizes.base,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.primary,
                }}
              >
                🎯 Best Time to Sell
              </h4>
              <p
                className="mb-3"
                style={{ fontSize: typography.sizes.sm, color: colors.text.secondary, lineHeight: 1.6 }}
              >
                Based on AI analysis of market trends, weather patterns, and historical data:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} style={{ color: colors.status.success }} />
                  <span style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium }}>
                    <strong>Wheat:</strong> 10-14 days (Expected +8-10% price increase)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} style={{ color: colors.status.warning }} />
                  <span style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium }}>
                    <strong>Mustard:</strong> Wait 3-4 weeks (Demand building up)
                  </span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <DSBadge variant="success" size="sm">High Confidence</DSBadge>
                <DSBadge variant="blue" size="sm">95% Accuracy</DSBadge>
              </div>
            </div>
          </div>
        </div>

        {/* Grok Voice Assistant */}
        <div
          className="p-4 rounded-lg border-2 border-dashed"
          style={{ borderColor: colors.accent.gold, backgroundColor: `${colors.accent.gold}05` }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Shield size={24} style={{ color: colors.accent.gold }} />
              <Bot size={24} style={{ color: colors.accent.gold }} />
            </div>
            <h4
              style={{
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.semibold,
                color: colors.text.primary,
              }}
            >
              Ask Grok AI Assistant
            </h4>
            <DSBadge variant="gold" size="sm">Fraud Detection</DSBadge>
          </div>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAskGrok()}
              placeholder="Ask about market trends, fraud detection, anomalies..."
              className="flex-1 px-4 py-2 rounded-lg border outline-none"
              style={{ borderColor: colors.border.default, fontSize: typography.sizes.sm }}
            />
            <DSButton
              variant={isListening ? "primary" : "outline"}
              size="md"
              onClick={handleVoiceQuery}
              className={isListening ? "animate-pulse" : ""}
              disabled={isProcessing}
            >
              <Mic size={18} />
            </DSButton>
            <DSButton variant="primary" size="md" onClick={handleAskGrok} disabled={isProcessing}>
              {isProcessing ? "..." : "Ask"}
            </DSButton>
          </div>

          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-3 rounded-lg mb-3"
              style={{
                backgroundColor: colors.surface.secondary,
                border: `1px solid ${colors.border.light}`,
              }}
            >
              <div className="flex items-start gap-2">
                <Bot size={18} style={{ color: colors.accent.gold, marginTop: "2px" }} />
                <p style={{ fontSize: typography.sizes.sm, color: colors.text.primary, lineHeight: 1.6 }}>
                  {aiResponse}
                </p>
              </div>
            </motion.div>
          )}

          <div className="flex flex-wrap gap-2">
            <span style={{ fontSize: typography.sizes.xs, color: colors.text.muted }}>
              Suggested Grok queries:
            </span>
            {SUGGESTED_QUERIES.map((query) => (
              <button
                key={query}
                onClick={() => {
                  setAiQuery(query);
                  processGrokQuery(query);
                }}
                className="px-3 py-1 rounded-full text-xs hover:bg-white/50 transition-colors"
                style={{
                  backgroundColor: colors.surface.secondary,
                  color: colors.text.secondary,
                  border: `1px solid ${colors.border.light}`,
                }}
                disabled={isProcessing}
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      </DSCard>
    </motion.div>
  );
}
