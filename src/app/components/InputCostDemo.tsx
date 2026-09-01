import { ArrowLeft } from "lucide-react";
import { InputCostTrackerEnhanced } from "./producer-dashboard/InputCostTrackerEnhanced";
import { DSButton, designTokens } from "../design-system";

const { colors, typography } = designTokens;

interface InputCostDemoProps {
  onBack: () => void;
}

export function InputCostDemo({ onBack }: InputCostDemoProps) {
  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <DSButton
            variant="ghost"
            leftIcon={<ArrowLeft size={20} />}
            onClick={onBack}
            className="mb-4"
          >
            Back to Home
          </DSButton>

          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <h1
              style={{
                fontFamily: typography.fonts.heading,
                fontSize: typography.sizes["3xl"],
                color: colors.blue.primary,
                fontWeight: typography.weights.bold,
              }}
              className="mb-2"
            >
              Input Cost & Expense Tracking System
            </h1>
            <p style={{ fontSize: typography.sizes.base, color: colors.text.secondary }}>
              Complete financial management with AI-powered fraud detection for producers
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${colors.status.success}20`,
                  color: colors.status.success,
                  fontFamily: typography.fonts.label,
                  fontWeight: typography.weights.semibold,
                }}
              >
                ✅ Editable Quantity Used
              </span>
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${colors.status.info}20`,
                  color: colors.status.info,
                  fontFamily: typography.fonts.label,
                  fontWeight: typography.weights.semibold,
                }}
              >
                🔗 Multi-Select Related Inputs
              </span>
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${colors.accent.gold}20`,
                  color: colors.blue.primary,
                  fontFamily: typography.fonts.label,
                  fontWeight: typography.weights.semibold,
                }}
              >
                🤖 Grok AI Fraud Detection
              </span>
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${colors.status.warning}20`,
                  color: colors.status.warning,
                  fontFamily: typography.fonts.label,
                  fontWeight: typography.weights.semibold,
                }}
              >
                📊 Real-time Profit Analysis
              </span>
              <span
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${colors.status.error}20`,
                  color: colors.status.error,
                  fontFamily: typography.fonts.label,
                  fontWeight: typography.weights.semibold,
                }}
              >
                📁 Upload/Scan Documents
              </span>
            </div>
          </div>
        </div>

        {/* Main Component */}
        <InputCostTrackerEnhanced />

        {/* Footer Info */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg">
          <h3
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes.lg,
              color: colors.blue.primary,
              fontWeight: typography.weights.semibold,
            }}
            className="mb-4"
          >
            💡 Quick Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4
                style={{
                  fontFamily: typography.fonts.label,
                  fontSize: typography.sizes.sm,
                  color: colors.blue.primary,
                  fontWeight: typography.weights.semibold,
                }}
                className="mb-2"
              >
                📦 Input Purchases
              </h4>
              <ul className="text-sm space-y-1" style={{ color: colors.text.secondary }}>
                <li>• Click "Add Input Purchase" to record new inventory</li>
                <li>• Click on "Qty Used" to edit usage inline</li>
                <li>• Upload invoices using Upload/Camera buttons</li>
                <li>• Grok AI automatically detects anomalies</li>
              </ul>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: typography.fonts.label,
                  fontSize: typography.sizes.sm,
                  color: colors.blue.primary,
                  fontWeight: typography.weights.semibold,
                }}
                className="mb-2"
              >
                💰 Activity Expenses
              </h4>
              <ul className="text-sm space-y-1" style={{ color: colors.text.secondary }}>
                <li>• Click "Add Activity Expense" to log costs</li>
                <li>• Use "Show Related Inputs" to link multiple items</li>
                <li>• Enter breakdown: Labor, Machinery, Other</li>
                <li>• Upload receipts for record-keeping</li>
              </ul>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: typography.fonts.label,
                  fontSize: typography.sizes.sm,
                  color: colors.blue.primary,
                  fontWeight: typography.weights.semibold,
                }}
                className="mb-2"
              >
                📈 Sales Tracking
              </h4>
              <ul className="text-sm space-y-1" style={{ color: colors.text.secondary }}>
                <li>• Click "Add Sale" on Sales Income card</li>
                <li>• Enter crop/product details and buyer</li>
                <li>• System auto-calculates total income</li>
                <li>• View daily profit in summary cards</li>
              </ul>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: typography.fonts.label,
                  fontSize: typography.sizes.sm,
                  color: colors.blue.primary,
                  fontWeight: typography.weights.semibold,
                }}
                className="mb-2"
              >
                🤖 Grok AI Features
              </h4>
              <ul className="text-sm space-y-1" style={{ color: colors.text.secondary }}>
                <li>• Real-time fraud detection on all transactions</li>
                <li>• Risk levels: Safe, Low, Medium, High, Critical</li>
                <li>• Intelligent recommendations for flagged items</li>
                <li>• System health monitoring dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
