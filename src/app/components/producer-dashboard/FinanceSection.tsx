import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Building2,
  User,
  Calendar,
  ChevronDown,
  ChevronRight,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { grokAI, GrokFraudScore } from "./GrokAIService";

const { colors, typography, spacing } = designTokens;

interface Advance {
  id: string;
  source: string;
  sourceType: "agent" | "bank";
  amount: number;
  date: Date;
  purpose: string;
  settled: boolean;
  settledAmount?: number;
  dueDate?: Date;
}

interface Loan {
  id: string;
  bank: string;
  amount: number;
  purpose: string;
  disbursed: boolean;
  emi: number;
  tenure: number;
  paidEmis: number;
  nextDueDate: Date;
}

export function FinanceSection() {
  const [expandedAdvance, setExpandedAdvance] = useState<string | null>(null);
  const [fraudScores, setFraudScores] = useState<Record<string, GrokFraudScore>>({});

  const advances: Advance[] = [
    {
      id: "1",
      source: "Sharma Commission Agent",
      sourceType: "agent",
      amount: 50000,
      date: new Date("2024-09-15"),
      purpose: "Seed & Fertilizer Purchase",
      settled: false,
      dueDate: new Date("2024-10-30"),
    },
    {
      id: "2",
      source: "Kumar Traders",
      sourceType: "agent",
      amount: 30000,
      date: new Date("2024-08-20"),
      purpose: "Equipment Rental",
      settled: true,
      settledAmount: 30000,
    },
  ];

  // Analyze transactions with Grok AI
  useEffect(() => {
    const scores: Record<string, GrokFraudScore> = {};
    advances.forEach((advance) => {
      const fraudScore = grokAI.analyzeTransaction({
        type: "advance",
        amount: advance.amount,
        source: advance.source,
        date: advance.date,
        historicalData: advances.filter(a => a.id !== advance.id),
      });
      scores[advance.id] = fraudScore;
    });
    setFraudScores(scores);
  }, []);

  const loans: Loan[] = [
    {
      id: "1",
      bank: "State Bank of India",
      amount: 200000,
      purpose: "Crop Cultivation Loan",
      disbursed: true,
      emi: 12000,
      tenure: 24,
      paidEmis: 8,
      nextDueDate: new Date("2024-11-05"),
    },
    {
      id: "2",
      bank: "HDFC Bank",
      amount: 100000,
      purpose: "Farm Equipment Purchase",
      disbursed: true,
      emi: 6000,
      tenure: 18,
      paidEmis: 12,
      nextDueDate: new Date("2024-11-10"),
    },
  ];

  const pendingSettlements = [
    {
      id: "1",
      party: "Grain Market Co.",
      type: "sale",
      amount: 45000,
      dueDate: new Date("2024-10-25"),
      description: "Wheat sale payment pending",
    },
    {
      id: "2",
      party: "Quality Control Fee",
      type: "refund",
      amount: 2500,
      dueDate: new Date("2024-10-28"),
      description: "QC inspection refund",
    },
  ];

  const totalAdvances = advances.reduce((sum, adv) => sum + adv.amount, 0);
  const settledAdvances = advances.filter((a) => a.settled).reduce((sum, adv) => sum + adv.amount, 0);
  const pendingAdvances = totalAdvances - settledAdvances;

  const totalLoans = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const paidLoans = loans.reduce(
    (sum, loan) => sum + loan.emi * loan.paidEmis,
    0
  );

  const totalPendingSettlements = pendingSettlements.reduce(
    (sum, settlement) => sum + settlement.amount,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <DSCard variant="elevated" padding="lg">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${colors.status.success}20` }}
          >
            <Wallet size={24} style={{ color: colors.status.success }} />
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
              💰 Finance Dashboard
            </h3>
            <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
              Advances, Loans & Settlements
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: `${colors.status.warning}10` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.text.secondary,
                }}
              >
                Total Advances
              </span>
              <User size={18} style={{ color: colors.status.warning }} />
            </div>
            <p
              style={{
                fontSize: typography.sizes["2xl"],
                fontWeight: typography.weights.bold,
                color: colors.text.primary,
              }}
            >
              ₹{(totalAdvances / 1000).toFixed(0)}K
            </p>
            <p style={{ fontSize: typography.sizes.xs, color: colors.text.muted, marginTop: spacing.xs }}>
              Pending: ₹{(pendingAdvances / 1000).toFixed(0)}K
            </p>
          </div>

          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: `${colors.status.info}10` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.text.secondary,
                }}
              >
                Active Loans
              </span>
              <Building2 size={18} style={{ color: colors.status.info }} />
            </div>
            <p
              style={{
                fontSize: typography.sizes["2xl"],
                fontWeight: typography.weights.bold,
                color: colors.text.primary,
              }}
            >
              ₹{(totalLoans / 1000).toFixed(0)}K
            </p>
            <p style={{ fontSize: typography.sizes.xs, color: colors.text.muted, marginTop: spacing.xs }}>
              Paid: ₹{(paidLoans / 1000).toFixed(0)}K
            </p>
          </div>

          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: `${colors.status.success}10` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                style={{
                  fontSize: typography.sizes.sm,
                  color: colors.text.secondary,
                }}
              >
                Pending Settlements
              </span>
              <Clock size={18} style={{ color: colors.status.success }} />
            </div>
            <p
              style={{
                fontSize: typography.sizes["2xl"],
                fontWeight: typography.weights.bold,
                color: colors.text.primary,
              }}
            >
              ₹{(totalPendingSettlements / 1000).toFixed(0)}K
            </p>
            <p style={{ fontSize: typography.sizes.xs, color: colors.text.muted, marginTop: spacing.xs }}>
              {pendingSettlements.length} items due
            </p>
          </div>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="advances">
          <TabsList>
            <TabsTrigger value="advances">Advances ({advances.length})</TabsTrigger>
            <TabsTrigger value="loans">Loans ({loans.length})</TabsTrigger>
            <TabsTrigger value="settlements">Settlements ({pendingSettlements.length})</TabsTrigger>
          </TabsList>

          {/* Advances Tab */}
          <TabsContent value="advances" className="space-y-3 mt-4">
            {advances.map((advance) => {
              const fraudScore = fraudScores[advance.id];
              return (
              <div
                key={advance.id}
                className="border rounded-lg overflow-hidden"
                style={{ 
                  borderColor: fraudScore && fraudScore.level === "high" || fraudScore?.level === "critical" 
                    ? colors.status.error 
                    : fraudScore?.level === "medium"
                    ? colors.status.warning
                    : colors.border.default 
                }}
              >
                <button
                  onClick={() =>
                    setExpandedAdvance(expandedAdvance === advance.id ? null : advance.id)
                  }
                  className="w-full p-4 flex items-center justify-between hover:bg-white/30 transition-colors"
                  style={{ backgroundColor: colors.surface.secondary }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: advance.settled
                          ? `${colors.status.success}20`
                          : `${colors.status.warning}20`,
                      }}
                    >
                      {advance.settled ? (
                        <CheckCircle2
                          size={20}
                          style={{ color: colors.status.success }}
                        />
                      ) : (
                        <Clock size={20} style={{ color: colors.status.warning }} />
                      )}
                    </div>
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-2">
                        <p
                          style={{
                            fontSize: typography.sizes.sm,
                            fontWeight: typography.weights.semibold,
                            color: colors.text.primary,
                          }}
                        >
                          {advance.source}
                        </p>
                        {fraudScore && fraudScore.level !== "safe" && (
                          <Shield 
                            size={16} 
                            style={{ 
                              color: fraudScore.level === "critical" || fraudScore.level === "high" 
                                ? colors.status.error 
                                : colors.status.warning 
                            }} 
                          />
                        )}
                      </div>
                      <p
                        style={{
                          fontSize: typography.sizes.xs,
                          color: colors.text.secondary,
                        }}
                      >
                        ₹{advance.amount.toLocaleString()} • {advance.date.toLocaleDateString()}
                      </p>
                      {fraudScore && fraudScore.level !== "safe" && (
                        <p
                          className="mt-1"
                          style={{
                            fontSize: typography.sizes.xs,
                            color: fraudScore.level === "critical" || fraudScore.level === "high"
                              ? colors.status.error
                              : colors.status.warning,
                            fontWeight: typography.weights.medium,
                          }}
                        >
                          🤖 Grok: {fraudScore.reason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    {fraudScore && fraudScore.level !== "safe" && (
                      <DSBadge
                        variant={
                          fraudScore.level === "critical" ? "error" :
                          fraudScore.level === "high" ? "warning" :
                          "info"
                        }
                        size="sm"
                      >
                        Risk: {fraudScore.score}%
                      </DSBadge>
                    )}
                    <DSBadge
                      variant={advance.settled ? "success" : "warning"}
                      size="sm"
                    >
                      {advance.settled ? "Settled" : "Pending"}
                    </DSBadge>
                    {expandedAdvance === advance.id ? (
                      <ChevronDown size={20} style={{ color: colors.text.muted }} />
                    ) : (
                      <ChevronRight size={20} style={{ color: colors.text.muted }} />
                    )}
                  </div>
                </button>

                {expandedAdvance === advance.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-4 pb-4"
                    style={{ backgroundColor: colors.surface.secondary }}
                  >
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between">
                        <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                          Purpose:
                        </span>
                        <span
                          style={{
                            fontSize: typography.sizes.sm,
                            fontWeight: typography.weights.medium,
                          }}
                        >
                          {advance.purpose}
                        </span>
                      </div>
                      {!advance.settled && advance.dueDate && (
                        <div className="flex justify-between">
                          <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                            Due Date:
                          </span>
                          <span
                            style={{
                              fontSize: typography.sizes.sm,
                              fontWeight: typography.weights.medium,
                              color: colors.status.error,
                            }}
                          >
                            {advance.dueDate.toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {advance.settled && (
                        <div className="flex justify-between">
                          <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                            Settled Amount:
                          </span>
                          <span
                            style={{
                              fontSize: typography.sizes.sm,
                              fontWeight: typography.weights.medium,
                              color: colors.status.success,
                            }}
                          >
                            ₹{advance.settledAmount?.toLocaleString()}
                          </span>
                        </div>
                      )}

                      {/* Grok AI Analysis */}
                      {fraudScore && fraudScore.level !== "safe" && (
                        <div
                          className="mt-3 p-3 rounded-lg"
                          style={{
                            backgroundColor: fraudScore.level === "critical" || fraudScore.level === "high"
                              ? `${colors.status.error}10`
                              : `${colors.status.warning}10`,
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <Shield
                              size={16}
                              className="flex-shrink-0 mt-0.5"
                              style={{
                                color: fraudScore.level === "critical" || fraudScore.level === "high"
                                  ? colors.status.error
                                  : colors.status.warning,
                              }}
                            />
                            <div className="flex-1">
                              <p
                                style={{
                                  fontSize: typography.sizes.sm,
                                  fontWeight: typography.weights.semibold,
                                  color: colors.text.primary,
                                  marginBottom: spacing.xs,
                                }}
                              >
                                Grok AI Fraud Analysis:
                              </p>
                              {fraudScore.flags.length > 0 && (
                                <ul className="space-y-1 mb-2">
                                  {fraudScore.flags.map((flag, idx) => (
                                    <li
                                      key={idx}
                                      style={{
                                        fontSize: typography.sizes.xs,
                                        color: colors.text.secondary,
                                      }}
                                    >
                                      • {flag}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {fraudScore.recommendations.length > 0 && (
                                <div>
                                  <p
                                    style={{
                                      fontSize: typography.sizes.xs,
                                      fontWeight: typography.weights.semibold,
                                      color: colors.text.primary,
                                      marginTop: spacing.sm,
                                      marginBottom: spacing.xs,
                                    }}
                                  >
                                    Recommendations:
                                  </p>
                                  <ul className="space-y-1">
                                    {fraudScore.recommendations.map((rec, idx) => (
                                      <li
                                        key={idx}
                                        style={{
                                          fontSize: typography.sizes.xs,
                                          color: colors.text.secondary,
                                        }}
                                      >
                                        ✓ {rec}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {!advance.settled && (
                        <DSButton variant="primary" size="sm" fullWidth className="mt-3">
                          Record Settlement
                        </DSButton>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            );
            })}
          </TabsContent>

          {/* Loans Tab */}
          <TabsContent value="loans" className="space-y-3 mt-4">
            {loans.map((loan) => {
              const progress = (loan.paidEmis / loan.tenure) * 100;
              const remainingAmount = loan.amount - loan.emi * loan.paidEmis;

              return (
                <div
                  key={loan.id}
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: colors.surface.secondary,
                    borderColor: colors.border.default,
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${colors.status.info}20` }}
                      >
                        <Building2 size={20} style={{ color: colors.status.info }} />
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: typography.sizes.sm,
                            fontWeight: typography.weights.semibold,
                            color: colors.text.primary,
                          }}
                        >
                          {loan.bank}
                        </p>
                        <p
                          style={{
                            fontSize: typography.sizes.xs,
                            color: colors.text.secondary,
                            marginTop: spacing.xs,
                          }}
                        >
                          {loan.purpose}
                        </p>
                      </div>
                    </div>
                    <DSBadge variant={loan.disbursed ? "success" : "warning"} size="sm">
                      {loan.disbursed ? "Active" : "Pending"}
                    </DSBadge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: colors.text.secondary }}>Loan Amount:</span>
                      <span style={{ fontWeight: typography.weights.semibold }}>
                        ₹{loan.amount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span style={{ color: colors.text.secondary }}>EMI:</span>
                      <span style={{ fontWeight: typography.weights.semibold }}>
                        ₹{loan.emi.toLocaleString()}/month
                      </span>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span style={{ color: colors.text.secondary }}>Repayment Progress:</span>
                        <span style={{ fontWeight: typography.weights.semibold }}>
                          {loan.paidEmis}/{loan.tenure} EMIs
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm">
                      <span style={{ color: colors.text.secondary }}>Remaining:</span>
                      <span
                        style={{
                          fontWeight: typography.weights.semibold,
                          color: colors.status.warning,
                        }}
                      >
                        ₹{remainingAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span style={{ color: colors.text.secondary }}>Next Due:</span>
                      <span style={{ fontWeight: typography.weights.semibold }}>
                        {loan.nextDueDate.toLocaleDateString()}
                      </span>
                    </div>

                    <DSButton variant="outline" size="sm" fullWidth className="mt-2">
                      View EMI Schedule
                    </DSButton>
                  </div>
                </div>
              );
            })}
          </TabsContent>

          {/* Settlements Tab */}
          <TabsContent value="settlements" className="space-y-3 mt-4">
            {pendingSettlements.map((settlement) => (
              <div
                key={settlement.id}
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: colors.surface.secondary,
                  borderColor: colors.border.default,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor:
                          settlement.type === "sale"
                            ? `${colors.status.success}20`
                            : `${colors.status.info}20`,
                      }}
                    >
                      <DollarSign
                        size={20}
                        style={{
                          color:
                            settlement.type === "sale"
                              ? colors.status.success
                              : colors.status.info,
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p
                        style={{
                          fontSize: typography.sizes.sm,
                          fontWeight: typography.weights.semibold,
                          color: colors.text.primary,
                        }}
                      >
                        {settlement.party}
                      </p>
                      <p
                        style={{
                          fontSize: typography.sizes.xs,
                          color: colors.text.secondary,
                          marginTop: spacing.xs,
                        }}
                      >
                        {settlement.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar size={14} style={{ color: colors.text.muted }} />
                        <span
                          style={{
                            fontSize: typography.sizes.xs,
                            color: colors.text.muted,
                          }}
                        >
                          Due: {settlement.dueDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      style={{
                        fontSize: typography.sizes.lg,
                        fontWeight: typography.weights.bold,
                        color:
                          settlement.type === "sale"
                            ? colors.status.success
                            : colors.status.info,
                      }}
                    >
                      ₹{settlement.amount.toLocaleString()}
                    </p>
                    <DSBadge
                      variant={settlement.type === "sale" ? "success" : "blue"}
                      size="sm"
                      className="mt-2"
                    >
                      {settlement.type === "sale" ? "Receivable" : "Refund"}
                    </DSBadge>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </DSCard>
    </motion.div>
  );
}
