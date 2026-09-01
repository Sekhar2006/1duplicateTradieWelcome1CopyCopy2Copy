import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { DSCard, DSBadge, designTokens } from "../../design-system";
import { grokAI, GrokAlert } from "./GrokAIService";
import { Progress } from "../ui/progress";

const { colors, typography, spacing } = designTokens;

interface GrokMonitorProps {
  alerts?: GrokAlert[];
  totalTransactions?: number;
  flaggedTransactions?: number;
  verifiedActivities?: number;
  totalActivities?: number;
}

export function GrokMonitor({
  alerts = [],
  totalTransactions = 0,
  flaggedTransactions = 0,
  verifiedActivities = 0,
  totalActivities = 0,
}: GrokMonitorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get system health from Grok AI
  const systemHealth = grokAI.getSystemHealth({
    totalTransactions,
    flaggedTransactions,
    activeAlerts: alerts.filter((a) => !a.read).length,
    verifiedActivities,
    totalActivities,
  });

  const statusColors = {
    healthy: colors.status.success,
    warning: colors.status.warning,
    critical: colors.status.error,
  };

  const statusIcons = {
    healthy: <ShieldCheck size={20} />,
    warning: <ShieldAlert size={20} />,
    critical: <ShieldAlert size={20} />,
  };

  const activeAlerts = alerts.filter((a) => !a.read);
  const criticalAlerts = activeAlerts.filter((a) => a.severity === "critical");
  const highAlerts = activeAlerts.filter((a) => a.severity === "high");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <DSCard
        variant="elevated"
        padding="lg"
        className="border-2"
        style={{
          borderColor:
            systemHealth.status === "healthy"
              ? colors.status.success
              : systemHealth.status === "warning"
              ? colors.status.warning
              : colors.status.error,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${statusColors[systemHealth.status]}20`,
                color: statusColors[systemHealth.status],
              }}
            >
              {statusIcons[systemHealth.status]}
            </div>
            <div>
              <h3
                style={{
                  fontFamily: typography.fonts.subheading,
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.semibold,
                  color: colors.blue.primary,
                }}
              >
                🤖 Grok AI Monitor
              </h3>
              <p
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.text.secondary,
                }}
              >
                Real-time fraud detection & anomaly analysis
              </p>
            </div>
          </div>

          <DSBadge
            variant={
              systemHealth.status === "healthy"
                ? "success"
                : systemHealth.status === "warning"
                ? "warning"
                : "error"
            }
            size="md"
          >
            {systemHealth.status === "healthy"
              ? "All Clear"
              : systemHealth.status === "warning"
              ? "Review Needed"
              : "Action Required"}
          </DSBadge>
        </div>

        {/* Health Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span
              style={{
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.medium,
                color: colors.text.primary,
              }}
            >
              System Health Score
            </span>
            <span
              style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.bold,
                color: statusColors[systemHealth.status],
              }}
            >
              {systemHealth.score}/100
            </span>
          </div>
          <Progress
            value={systemHealth.score}
            className="h-3"
            style={{
              backgroundColor: `${statusColors[systemHealth.status]}20`,
            }}
          />
          <p
            className="mt-2"
            style={{
              fontSize: typography.sizes.sm,
              color: colors.text.secondary,
            }}
          >
            {systemHealth.message}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.surface.secondary }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Activity size={16} style={{ color: colors.status.info }} />
              <span
                style={{
                  fontSize: typography.sizes.xs,
                  color: colors.text.secondary,
                }}
              >
                Active Alerts
              </span>
            </div>
            <p
              style={{
                fontSize: typography.sizes.xl,
                fontWeight: typography.weights.bold,
                color: colors.text.primary,
              }}
            >
              {activeAlerts.length}
            </p>
          </div>

          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.surface.secondary }}
          >
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle
                size={16}
                style={{ color: colors.status.error }}
              />
              <span
                style={{
                  fontSize: typography.sizes.xs,
                  color: colors.text.secondary,
                }}
              >
                Critical
              </span>
            </div>
            <p
              style={{
                fontSize: typography.sizes.xl,
                fontWeight: typography.weights.bold,
                color: colors.status.error,
              }}
            >
              {criticalAlerts.length}
            </p>
          </div>

          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.surface.secondary }}
          >
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert size={16} style={{ color: colors.status.warning }} />
              <span
                style={{
                  fontSize: typography.sizes.xs,
                  color: colors.text.secondary,
                }}
              >
                Flagged
              </span>
            </div>
            <p
              style={{
                fontSize: typography.sizes.xl,
                fontWeight: typography.weights.bold,
                color: colors.status.warning,
              }}
            >
              {flaggedTransactions}
            </p>
          </div>

          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: colors.surface.secondary }}
          >
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 size={16} style={{ color: colors.status.success }} />
              <span
                style={{
                  fontSize: typography.sizes.xs,
                  color: colors.text.secondary,
                }}
              >
                Verified
              </span>
            </div>
            <p
              style={{
                fontSize: typography.sizes.xl,
                fontWeight: typography.weights.bold,
                color: colors.status.success,
              }}
            >
              {verifiedActivities}
            </p>
          </div>
        </div>

        {/* Details Section */}
        {systemHealth.details.length > 0 && (
          <div
            className="p-3 rounded-lg mb-4"
            style={{ backgroundColor: `${statusColors[systemHealth.status]}10` }}
          >
            <div className="flex items-start gap-2">
              <Info
                size={16}
                className="flex-shrink-0 mt-0.5"
                style={{ color: statusColors[systemHealth.status] }}
              />
              <div className="flex-1">
                <p
                  className="mb-2"
                  style={{
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.primary,
                  }}
                >
                  Grok Analysis:
                </p>
                <ul className="space-y-1">
                  {systemHealth.details.map((detail, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: typography.sizes.sm,
                        color: colors.text.secondary,
                      }}
                    >
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Recent Alerts Preview */}
        {activeAlerts.length > 0 && (
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full text-left mb-3"
              style={{
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
              }}
            >
              {isExpanded ? "▼" : "▶"} Recent Alerts ({activeAlerts.length})
            </button>

            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="space-y-2"
              >
                {activeAlerts.slice(0, 3).map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 rounded-lg border"
                    style={{
                      backgroundColor: colors.surface.secondary,
                      borderColor:
                        alert.severity === "critical"
                          ? colors.status.error
                          : alert.severity === "high"
                          ? colors.status.warning
                          : colors.border.default,
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{
                          color:
                            alert.severity === "critical"
                              ? colors.status.error
                              : alert.severity === "high"
                              ? colors.status.warning
                              : colors.status.info,
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p
                            style={{
                              fontSize: typography.sizes.sm,
                              fontWeight: typography.weights.semibold,
                              color: colors.text.primary,
                            }}
                          >
                            {alert.title}
                          </p>
                          <DSBadge
                            variant={
                              alert.severity === "critical"
                                ? "error"
                                : alert.severity === "high"
                                ? "warning"
                                : "info"
                            }
                            size="sm"
                          >
                            {alert.severity}
                          </DSBadge>
                        </div>
                        <p
                          style={{
                            fontSize: typography.sizes.xs,
                            color: colors.text.secondary,
                          }}
                        >
                          {alert.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {activeAlerts.length > 3 && (
                  <p
                    className="text-center"
                    style={{
                      fontSize: typography.sizes.xs,
                      color: colors.text.muted,
                    }}
                  >
                    +{activeAlerts.length - 3} more alerts
                  </p>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* Grok Status Indicator */}
        <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border.light }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Shield size={20} style={{ color: colors.status.success }} />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: colors.status.success }}
                />
              </div>
              <span
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.text.primary,
                }}
              >
                Grok AI actively monitoring
              </span>
            </div>
            <span
              style={{
                fontSize: typography.sizes.xs,
                color: colors.text.muted,
              }}
            >
              Last scan: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </DSCard>
    </motion.div>
  );
}
