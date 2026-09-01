import { useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, Sparkles, Users, TrendingUp, Settings, Zap } from "lucide-react";
import { TRADIEChatAssistant } from "./TRADIEChatAssistant";
import { DSButton, DSCard, DSBadge, designTokens } from "../design-system";

const { colors, typography, spacing, radius, shadows } = designTokens;

interface ChatGPTIntegrationDemoProps {
  onBack?: () => void;
}

export function ChatGPTIntegrationDemo({ onBack }: ChatGPTIntegrationDemoProps) {
  const [showChat, setShowChat] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Producer");

  const roles = [
    { id: "producer", name: "Producer", icon: "🌾" },
    { id: "trader", name: "Trader", icon: "📊" },
    { id: "buyer", name: "Buyer", icon: "🛒" },
    { id: "agent", name: "Commission Agent", icon: "🤝" },
  ];

  const features = [
    {
      icon: <Sparkles size={24} />,
      title: "Context-Aware Assistance",
      description: "AI understands your role and provides relevant guidance",
      color: colors.accent.gold,
    },
    {
      icon: <MessageSquare size={24} />,
      title: "24/7 Support",
      description: "Get instant answers anytime, anywhere",
      color: colors.status.info,
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Market Insights",
      description: "Real-time commodity prices and market trends",
      color: colors.status.success,
    },
    {
      icon: <Zap size={24} />,
      title: "Quick Actions",
      description: "Navigate platform features with voice commands",
      color: colors.status.warning,
    },
  ];

  const useCases = [
    {
      role: "Producer",
      questions: [
        "How do I add new produce?",
        "What documents do I need for KYC?",
        "How can I check market prices?",
        "When will I receive my payment?",
      ],
    },
    {
      role: "Trader",
      questions: [
        "How do I place bulk orders?",
        "What are the payment terms?",
        "How do I track my shipments?",
        "Can I get credit facilities?",
      ],
    },
    {
      role: "Buyer",
      questions: [
        "How do I verify produce quality?",
        "What are the delivery options?",
        "How do I cancel an order?",
        "Can I negotiate prices?",
      ],
    },
  ];

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})`,
      }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-sm"
            style={{ color: colors.blue.primary }}
          >
            ← Back to Home
          </button>
        )}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${colors.accent.gold}, ${colors.accent.goldDark})`,
              boxShadow: shadows.gold,
            }}
          >
            <Sparkles size={40} style={{ color: "white" }} />
          </div>

          <h1
            className="mb-4"
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes["3xl"],
              color: colors.blue.primary,
              fontWeight: typography.weights.bold,
            }}
          >
            AI-Powered Chat Assistant
          </h1>

          <p
            className="max-w-2xl mx-auto"
            style={{
              fontSize: typography.sizes.lg,
              color: colors.text.secondary,
            }}
          >
            Get instant help with commodity trading, platform navigation, and personalized guidance
            powered by ChatGPT
          </p>

          <div className="flex flex-wrap gap-2 justify-center mt-6">
            <DSBadge variant="gold" size="md">
              🚀 Real-time Responses
            </DSBadge>
            <DSBadge variant="blue" size="md">
              🌐 Multi-language Support
            </DSBadge>
            <DSBadge variant="success" size="md">
              🎯 Role-Based Context
            </DSBadge>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DSCard variant="elevated" padding="lg" hoverable>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${feature.color}20`,
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: typography.fonts.subheading,
                    fontSize: typography.sizes.base,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.primary,
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                  {feature.description}
                </p>
              </DSCard>
            </motion.div>
          ))}
        </div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <DSCard variant="elevated" padding="xl">
            <h2
              className="mb-6 text-center"
              style={{
                fontFamily: typography.fonts.subheading,
                fontSize: typography.sizes.xl,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
              }}
            >
              Try AI Assistant as Different Roles
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.name)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === role.name ? "shadow-lg" : ""
                  }`}
                  style={{
                    borderColor:
                      selectedRole === role.name ? colors.accent.gold : colors.border.default,
                    backgroundColor:
                      selectedRole === role.name
                        ? `${colors.accent.gold}10`
                        : colors.surface.primary,
                  }}
                >
                  <div className="text-3xl mb-2">{role.icon}</div>
                  <div
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight:
                        selectedRole === role.name
                          ? typography.weights.semibold
                          : typography.weights.regular,
                      color:
                        selectedRole === role.name ? colors.accent.gold : colors.text.primary,
                    }}
                  >
                    {role.name}
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center">
              <DSButton
                variant="primary"
                size="lg"
                onClick={() => {
                  setShowChat(true);
                  setIsMinimized(false);
                }}
                leftIcon={<MessageSquare size={20} />}
              >
                Start Chat as {selectedRole}
              </DSButton>
            </div>
          </DSCard>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2
            className="mb-6 text-center"
            style={{
              fontFamily: typography.fonts.subheading,
              fontSize: typography.sizes.xl,
              fontWeight: typography.weights.semibold,
              color: colors.blue.primary,
            }}
          >
            Common Questions by Role
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <DSCard variant="default" padding="lg">
                  <h3
                    className="mb-4 flex items-center gap-2"
                    style={{
                      fontFamily: typography.fonts.subheading,
                      fontSize: typography.sizes.base,
                      fontWeight: typography.weights.semibold,
                      color: colors.blue.primary,
                    }}
                  >
                    {roles.find((r) => r.name === useCase.role)?.icon} {useCase.role}
                  </h3>

                  <div className="space-y-2">
                    {useCase.questions.map((question, qIndex) => (
                      <button
                        key={qIndex}
                        onClick={() => {
                          setSelectedRole(useCase.role);
                          setShowChat(true);
                          setIsMinimized(false);
                        }}
                        className="w-full text-left p-3 rounded-lg hover:bg-white/50 transition-all"
                        style={{
                          backgroundColor: colors.surface.secondary,
                          fontSize: typography.sizes.sm,
                          color: colors.text.primary,
                        }}
                      >
                        "{question}"
                      </button>
                    ))}
                  </div>
                </DSCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integration Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-12"
        >
          <DSCard variant="gold" padding="xl">
            <div className="text-center">
              <Settings size={40} className="mx-auto mb-4" style={{ color: colors.accent.gold }} />
              <h3
                className="mb-3"
                style={{
                  fontFamily: typography.fonts.subheading,
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.semibold,
                  color: colors.blue.primary,
                }}
              >
                Production Integration
              </h3>
              <p
                className="max-w-2xl mx-auto mb-6"
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.text.secondary,
                }}
              >
                This demo uses mock responses. For production, integrate with OpenAI API through a
                secure backend to enable real ChatGPT capabilities with your TRADIE-specific
                context and data.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <DSBadge variant="blue" size="sm">
                  OpenAI GPT-4
                </DSBadge>
                <DSBadge variant="blue" size="sm">
                  Secure API Integration
                </DSBadge>
                <DSBadge variant="blue" size="sm">
                  Context-Aware Training
                </DSBadge>
                <DSBadge variant="blue" size="sm">
                  Multi-language
                </DSBadge>
              </div>
            </div>
          </DSCard>
        </motion.div>
      </div>

      {/* Chat Widget */}
      {showChat && (
        <TRADIEChatAssistant
          userRole={selectedRole}
          userName="Demo User"
          onClose={() => setShowChat(false)}
          isMinimized={isMinimized}
          onToggleMinimize={() => setIsMinimized(!isMinimized)}
        />
      )}
    </div>
  );
}
