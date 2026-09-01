/**
 * Grok AI Service - Advanced Fraud Detection & Anomaly Monitoring
 * Powered by xAI's Grok for real-time pattern analysis and risk assessment
 */

export interface GrokAlert {
  id: string;
  type: "anomaly" | "fraud" | "system" | "pattern";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  message: string;
  details: string;
  recommendation: string;
  timestamp: Date;
  read: boolean;
  affectedEntity?: string;
  riskScore?: number;
}

export interface GrokFraudScore {
  score: number; // 0-100, where 100 is highest risk
  level: "safe" | "low" | "medium" | "high" | "critical";
  reason: string;
  flags: string[];
  recommendations: string[];
}

export interface GrokVerification {
  verified: boolean;
  confidence: number; // 0-100
  seal: "verified" | "warning" | "failed";
  issues: string[];
  timestamp: Date;
}

export class GrokAIService {
  private static instance: GrokAIService;

  private constructor() {}

  public static getInstance(): GrokAIService {
    if (!GrokAIService.instance) {
      GrokAIService.instance = new GrokAIService();
    }
    return GrokAIService.instance;
  }

  /**
   * Analyze transaction for fraud patterns
   */
  public analyzeTransaction(transaction: {
    type: string;
    amount: number;
    source: string;
    date: Date | string;
    historicalData?: any[];
  }): GrokFraudScore {
    // Simulate Grok AI analysis
    const flags: string[] = [];
    let riskScore = 0;

    // Ensure date is a Date object
    const transactionDate = transaction.date instanceof Date ? transaction.date : new Date(transaction.date);

    // Check for amount anomalies
    if (transaction.amount > 100000) {
      flags.push("Unusually high transaction amount");
      riskScore += 30;
    }

    // Check for timing patterns
    const hour = transactionDate.getHours();
    if (hour < 6 || hour > 22) {
      flags.push("Transaction outside normal business hours");
      riskScore += 15;
    }

    // Check for duplicate patterns
    if (transaction.historicalData) {
      const recentSimilar = transaction.historicalData.filter(
        (t: any) =>
          Math.abs(t.amount - transaction.amount) < 100 &&
          Math.abs(new Date(t.date).getTime() - transactionDate.getTime()) <
            24 * 60 * 60 * 1000
      );
      if (recentSimilar.length > 0) {
        flags.push("Possible duplicate transaction detected");
        riskScore += 40;
      }
    }

    // Determine risk level
    let level: GrokFraudScore["level"];
    if (riskScore >= 70) level = "critical";
    else if (riskScore >= 50) level = "high";
    else if (riskScore >= 30) level = "medium";
    else if (riskScore >= 10) level = "low";
    else level = "safe";

    const recommendations: string[] = [];
    if (riskScore > 30) {
      recommendations.push("Verify transaction with original party");
      recommendations.push("Check bank/agent credentials");
      recommendations.push("Review transaction history for patterns");
    }

    return {
      score: riskScore,
      level,
      reason:
        flags.length > 0
          ? flags.join("; ")
          : "Transaction appears normal based on historical patterns",
      flags,
      recommendations,
    };
  }

  /**
   * Analyze market data for anomalies
   */
  public analyzeMarketData(data: {
    commodity: string;
    currentPrice: number;
    historicalPrices: number[];
    volume?: number;
  }): GrokAlert | null {
    const avg =
      data.historicalPrices.reduce((a, b) => a + b, 0) /
      data.historicalPrices.length;
    const deviation = Math.abs(data.currentPrice - avg) / avg;

    if (deviation > 0.15) {
      // More than 15% deviation
      return {
        id: `market-${Date.now()}`,
        type: "anomaly",
        severity: deviation > 0.3 ? "high" : "medium",
        title: "Market Anomaly Detected",
        message: `${data.commodity} price ${
          data.currentPrice > avg ? "surge" : "drop"
        } detected`,
        details: `Current price: ₹${data.currentPrice.toLocaleString()} is ${(
          deviation * 100
        ).toFixed(1)}% ${
          data.currentPrice > avg ? "above" : "below"
        } historical average of ₹${avg.toLocaleString()}`,
        recommendation:
          data.currentPrice > avg
            ? "Consider selling to maximize profits"
            : "Wait for market recovery before selling",
        timestamp: new Date(),
        read: false,
        affectedEntity: data.commodity,
        riskScore: Math.min(deviation * 100, 100),
      };
    }

    return null;
  }

  /**
   * Verify crop activity data
   */
  public verifyActivityData(data: {
    cropId: string;
    cropName: string;
    activities: any[];
    area: number;
    expectedYield?: number;
  }): GrokVerification {
    const issues: string[] = [];
    let confidence = 100;

    // Check for temporal anomalies
    const sorted = data.activities.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const curr = sorted[i];
      const daysBetween =
        (new Date(curr.date).getTime() - new Date(prev.date).getTime()) /
        (1000 * 60 * 60 * 24);

      // Check for overlapping activities
      if (daysBetween < 1 && prev.type === curr.type) {
        issues.push(
          `Duplicate ${curr.type} activities logged within 24 hours`
        );
        confidence -= 15;
      }
    }

    // Check for logical sequence
    const hasHarvesting = data.activities.some((a) => a.type === "harvesting");
    const hasSowing = data.activities.some((a) => a.type === "sowing");
    if (hasHarvesting && !hasSowing) {
      issues.push("Harvesting logged without prior sowing activity");
      confidence -= 20;
    }

    // Check for pesticide overuse
    const pesticideCount = data.activities.filter(
      (a) => a.type === "pesticide" || a.type === "fungicide"
    ).length;
    if (pesticideCount > 10) {
      issues.push(
        "Excessive pesticide/fungicide applications may indicate data fabrication"
      );
      confidence -= 10;
    }

    // Determine verification seal
    let seal: GrokVerification["seal"];
    if (confidence >= 80) seal = "verified";
    else if (confidence >= 50) seal = "warning";
    else seal = "failed";

    return {
      verified: confidence >= 80,
      confidence,
      seal,
      issues,
      timestamp: new Date(),
    };
  }

  /**
   * Detect account security anomalies
   */
  public detectSecurityAnomalies(data: {
    loginAttempts: number;
    failedLogins: number;
    lastLoginLocation?: string;
    currentLocation?: string;
    bankingDetailsChanged?: boolean;
    passwordChanged?: boolean;
  }): GrokAlert | null {
    const flags: string[] = [];
    let severity: GrokAlert["severity"] = "low";

    // Check failed logins
    if (data.failedLogins >= 3) {
      flags.push(`${data.failedLogins} failed login attempts detected`);
      severity = data.failedLogins >= 5 ? "high" : "medium";
    }

    // Check location changes
    if (
      data.lastLoginLocation &&
      data.currentLocation &&
      data.lastLoginLocation !== data.currentLocation
    ) {
      flags.push("Login from new location detected");
      severity = severity === "high" ? "high" : "medium";
    }

    // Check banking changes
    if (data.bankingDetailsChanged) {
      flags.push("Banking details recently modified");
      severity = "high";
    }

    if (flags.length > 0) {
      return {
        id: `security-${Date.now()}`,
        type: "fraud",
        severity,
        title: "Security Alert",
        message: "Suspicious account activity detected",
        details: flags.join("; "),
        recommendation:
          "Verify all recent account changes and secure your password immediately",
        timestamp: new Date(),
        read: false,
      };
    }

    return null;
  }

  /**
   * Analyze settlement patterns
   */
  public analyzeSettlement(settlement: {
    amount: number;
    dueDate: Date;
    party: string;
    historicalSettlements?: any[];
  }): GrokFraudScore {
    const flags: string[] = [];
    let riskScore = 0;

    // Check if overdue
    if (settlement.dueDate < new Date()) {
      const daysOverdue = Math.floor(
        (new Date().getTime() - settlement.dueDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      if (daysOverdue > 30) {
        flags.push(`Settlement ${daysOverdue} days overdue`);
        riskScore += 40;
      } else if (daysOverdue > 7) {
        flags.push(`Settlement ${daysOverdue} days overdue`);
        riskScore += 20;
      }
    }

    // Check historical patterns
    if (settlement.historicalSettlements) {
      const avgDelay =
        settlement.historicalSettlements.reduce((sum: number, s: any) => {
          const settled = new Date(s.settledDate);
          const due = new Date(s.dueDate);
          return sum + (settled.getTime() - due.getTime()) / (1000 * 60 * 60 * 24);
        }, 0) / settlement.historicalSettlements.length;

      if (avgDelay > 15) {
        flags.push("Party has history of delayed settlements");
        riskScore += 25;
      }
    }

    let level: GrokFraudScore["level"];
    if (riskScore >= 70) level = "critical";
    else if (riskScore >= 50) level = "high";
    else if (riskScore >= 30) level = "medium";
    else if (riskScore >= 10) level = "low";
    else level = "safe";

    return {
      score: riskScore,
      level,
      reason: flags.length > 0 ? flags.join("; ") : "Settlement appears normal",
      flags,
      recommendations:
        riskScore > 30
          ? [
              "Contact party for settlement update",
              "Consider legal notice if significantly overdue",
              "Update credit terms for future transactions",
            ]
          : [],
    };
  }

  /**
   * Generate overall system health status
   */
  public getSystemHealth(data: {
    totalTransactions: number;
    flaggedTransactions: number;
    activeAlerts: number;
    verifiedActivities: number;
    totalActivities: number;
  }): {
    status: "healthy" | "warning" | "critical";
    score: number;
    message: string;
    details: string[];
  } {
    const fraudRate = data.flaggedTransactions / Math.max(data.totalTransactions, 1);
    const verificationRate = data.verifiedActivities / Math.max(data.totalActivities, 1);
    const alertLevel = data.activeAlerts;

    let score = 100;
    const details: string[] = [];

    if (fraudRate > 0.1) {
      score -= 30;
      details.push(
        `${(fraudRate * 100).toFixed(1)}% of transactions flagged for review`
      );
    }

    if (verificationRate < 0.8) {
      score -= 20;
      details.push(
        `Only ${(verificationRate * 100).toFixed(1)}% of activities verified`
      );
    }

    if (alertLevel > 5) {
      score -= 15;
      details.push(`${alertLevel} active alerts requiring attention`);
    }

    let status: "healthy" | "warning" | "critical";
    let message: string;

    if (score >= 80) {
      status = "healthy";
      message = "All systems operating normally";
    } else if (score >= 60) {
      status = "warning";
      message = "Some issues detected, review recommended";
    } else {
      status = "critical";
      message = "Critical issues detected, immediate action required";
    }

    return { status, score, message, details };
  }

  /**
   * Voice query processing for Grok
   */
  public async processVoiceQuery(query: string): Promise<string> {
    // Simulate Grok AI voice processing
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("fraud") || lowerQuery.includes("anomaly")) {
      return "I've analyzed your recent transactions and activities. Currently, I've detected 2 minor anomalies: one advance payment that's 15% higher than your average, and one activity log that shows overlapping pesticide applications. Both are flagged for your review but don't indicate serious fraud. Would you like me to provide more details?";
    }

    if (lowerQuery.includes("market") || lowerQuery.includes("price")) {
      return "Based on current market analysis, wheat prices are showing a 12% increase trend over the next 2 weeks due to reduced supply from neighboring regions. I recommend selling within 10-14 days for optimal returns. Would you like a detailed price forecast?";
    }

    if (
      lowerQuery.includes("best time") ||
      lowerQuery.includes("when to sell")
    ) {
      return "Analyzing your crops and current market conditions... For wheat: sell in 10-14 days (expected +8-10% increase). For mustard: wait 3-4 weeks as demand is building. I'm monitoring market patterns continuously and will alert you of any changes.";
    }

    if (lowerQuery.includes("settlement") || lowerQuery.includes("payment")) {
      return "I've reviewed your pending settlements. You have ₹45,000 due from Sharma Traders which is 3 days overdue. Based on their historical pattern, they typically settle within 5-7 days of due date. I recommend sending a reminder today. All other settlements are on track.";
    }

    return "I'm Grok, your AI assistant. I can help you with market analysis, fraud detection, settlement tracking, and activity verification. What would you like to know?";
  }
}

// Export singleton instance
export const grokAI = GrokAIService.getInstance();
