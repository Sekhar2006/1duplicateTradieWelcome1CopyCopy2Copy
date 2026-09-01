import { useState } from "react";
import { motion } from "motion/react";
import {
  QrCode,
  Camera,
  Shield,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { grokAI, GrokVerification } from "./GrokAIService";
import { Progress } from "../ui/progress";

const { colors, typography, spacing } = designTokens;

interface QRScanResult {
  cropId: string;
  cropName: string;
  variety: string;
  producerName: string;
  area: number;
  sowingDate: Date;
  expectedHarvest: Date;
  activities: any[];
  nftTokenId?: string;
}

interface GrokQRScannerProps {
  onClose: () => void;
}

export function GrokQRScanner({ onClose }: GrokQRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<QRScanResult | null>(null);
  const [verification, setVerification] = useState<GrokVerification | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setIsAnalyzing(true);

    // Simulate QR code scan
    setTimeout(() => {
      const mockResult: QRScanResult = {
        cropId: "CROP-2024-001",
        cropName: "Wheat",
        variety: "PBW 343",
        producerName: "Rajesh Kumar",
        area: 5,
        sowingDate: new Date("2024-09-05"),
        expectedHarvest: new Date("2025-04-15"),
        activities: [
          { type: "sowing", date: new Date("2024-09-05") },
          { type: "watering", date: new Date("2024-09-12") },
          { type: "pesticide", date: new Date("2024-09-20") },
          { type: "pesticide", date: new Date("2024-09-21") }, // Duplicate - will be flagged
          { type: "fungicide", date: new Date("2024-10-01") },
        ],
        nftTokenId: "NFT-WHEAT-001",
      };

      setScanResult(mockResult);
      setIsScanning(false);

      // Analyze with Grok AI
      setTimeout(() => {
        const grokVerification = grokAI.verifyActivityData({
          cropId: mockResult.cropId,
          cropName: mockResult.cropName,
          activities: mockResult.activities,
          area: mockResult.area,
        });

        setVerification(grokVerification);
        setIsAnalyzing(false);
      }, 1500);
    }, 2000);
  };

  const getRiskLevel = () => {
    if (!verification) return "analyzing";
    if (verification.seal === "verified") return "safe";
    if (verification.seal === "warning") return "caution";
    return "high-risk";
  };

  const riskLevel = getRiskLevel();

  const riskColors = {
    safe: colors.status.success,
    caution: colors.status.warning,
    "high-risk": colors.status.error,
    analyzing: colors.status.info,
  };

  const riskIcons = {
    safe: <ShieldCheck size={48} />,
    caution: <ShieldAlert size={48} />,
    "high-risk": <AlertTriangle size={48} />,
    analyzing: <Shield size={48} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg"
      >
        <DSCard variant="elevated" padding="lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${colors.accent.gold}20` }}
              >
                <QrCode size={24} style={{ color: colors.accent.gold }} />
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
                  Grok QR Scanner
                </h3>
                <p
                  style={{
                    fontSize: typography.sizes.sm,
                    color: colors.text.secondary,
                  }}
                >
                  AI-powered fraud detection
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              <X size={20} style={{ color: colors.text.muted }} />
            </button>
          </div>

          {/* Scanner Area */}
          {!scanResult && (
            <div className="space-y-4">
              <div
                className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-8"
                style={{
                  borderColor: isScanning ? colors.accent.gold : colors.border.default,
                  backgroundColor: isScanning
                    ? `${colors.accent.gold}05`
                    : colors.surface.secondary,
                }}
              >
                {isScanning ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Camera size={64} style={{ color: colors.accent.gold }} />
                  </motion.div>
                ) : (
                  <QrCode size={64} style={{ color: colors.text.muted }} />
                )}
                <p
                  className="mt-4 text-center"
                  style={{
                    fontSize: typography.sizes.base,
                    fontWeight: typography.weights.medium,
                    color: colors.text.primary,
                  }}
                >
                  {isScanning ? "Scanning QR Code..." : "Position QR Code in frame"}
                </p>
                <p
                  className="mt-2 text-center"
                  style={{
                    fontSize: typography.sizes.sm,
                    color: colors.text.secondary,
                  }}
                >
                  {isScanning
                    ? "Grok AI is analyzing..."
                    : "Scan crop or transaction QR code"}
                </p>
              </div>

              <DSButton
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleScan}
                disabled={isScanning}
              >
                {isScanning ? "Scanning..." : "Start Scan"}
              </DSButton>
            </div>
          )}

          {/* Scan Results */}
          {scanResult && (
            <div className="space-y-4">
              {/* Risk Status Card */}
              <div
                className="p-6 rounded-xl text-center"
                style={{
                  backgroundColor: `${riskColors[riskLevel]}10`,
                  border: `2px solid ${riskColors[riskLevel]}`,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center justify-center mb-3"
                  style={{ color: riskColors[riskLevel] }}
                >
                  {riskIcons[riskLevel]}
                </motion.div>
                <h4
                  style={{
                    fontSize: typography.sizes.xl,
                    fontWeight: typography.weights.bold,
                    color: colors.text.primary,
                    marginBottom: spacing.xs,
                  }}
                >
                  {isAnalyzing
                    ? "Analyzing..."
                    : riskLevel === "safe"
                    ? "No Anomalies Detected"
                    : riskLevel === "caution"
                    ? "Review Recommended"
                    : "Issues Detected"}
                </h4>
                {verification && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <p
                      style={{
                        fontSize: typography.sizes.sm,
                        color: colors.text.secondary,
                      }}
                    >
                      Confidence Score:
                    </p>
                    <DSBadge
                      variant={
                        verification.confidence >= 80
                          ? "success"
                          : verification.confidence >= 50
                          ? "warning"
                          : "error"
                      }
                      size="md"
                    >
                      {verification.confidence}%
                    </DSBadge>
                  </div>
                )}
              </div>

              {/* Crop Details */}
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: colors.surface.secondary }}
              >
                <h5
                  style={{
                    fontSize: typography.sizes.base,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.primary,
                    marginBottom: spacing.sm,
                  }}
                >
                  Crop Information
                </h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span
                      style={{
                        fontSize: typography.sizes.sm,
                        color: colors.text.secondary,
                      }}
                    >
                      Crop:
                    </span>
                    <span
                      style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.medium,
                      }}
                    >
                      {scanResult.cropName} ({scanResult.variety})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      style={{
                        fontSize: typography.sizes.sm,
                        color: colors.text.secondary,
                      }}
                    >
                      Producer:
                    </span>
                    <span
                      style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.medium,
                      }}
                    >
                      {scanResult.producerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      style={{
                        fontSize: typography.sizes.sm,
                        color: colors.text.secondary,
                      }}
                    >
                      Area:
                    </span>
                    <span
                      style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.medium,
                      }}
                    >
                      {scanResult.area} acres
                    </span>
                  </div>
                  {scanResult.nftTokenId && (
                    <div className="flex justify-between">
                      <span
                        style={{
                          fontSize: typography.sizes.sm,
                          color: colors.text.secondary,
                        }}
                      >
                        NFT Token:
                      </span>
                      <DSBadge variant="gold" size="sm">
                        {scanResult.nftTokenId}
                      </DSBadge>
                    </div>
                  )}
                </div>
              </div>

              {/* Grok Analysis */}
              {verification && verification.issues.length > 0 && (
                <div
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor:
                      verification.seal === "failed"
                        ? `${colors.status.error}10`
                        : `${colors.status.warning}10`,
                  }}
                >
                  <div className="flex items-start gap-2 mb-3">
                    <Shield
                      size={20}
                      className="flex-shrink-0 mt-0.5"
                      style={{
                        color:
                          verification.seal === "failed"
                            ? colors.status.error
                            : colors.status.warning,
                      }}
                    />
                    <h5
                      style={{
                        fontSize: typography.sizes.base,
                        fontWeight: typography.weights.semibold,
                        color: colors.text.primary,
                      }}
                    >
                      Grok AI Analysis
                    </h5>
                  </div>
                  <ul className="space-y-2">
                    {verification.issues.map((issue, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2"
                        style={{
                          fontSize: typography.sizes.sm,
                          color: colors.text.secondary,
                        }}
                      >
                        <AlertTriangle
                          size={14}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: colors.status.warning }}
                        />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <DSButton variant="outline" size="md" fullWidth onClick={onClose}>
                  Close
                </DSButton>
                <DSButton variant="primary" size="md" fullWidth onClick={() => {
                  setScanResult(null);
                  setVerification(null);
                }}>
                  Scan Another
                </DSButton>
              </div>
            </div>
          )}
        </DSCard>
      </motion.div>
    </motion.div>
  );
}
