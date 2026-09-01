import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { CheckCircle2, AlertTriangle, AlertCircle, TrendingUp, Camera, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface MetricData {
  label: string;
  value: string;
  confidence: number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
}

interface FraudAlert {
  severity: 'low' | 'medium' | 'high';
  message: string;
  details?: string;
}

interface AIAnalysisCardProps {
  title?: string;
  metrics: MetricData[];
  fraudAlert?: FraudAlert;
  recommendation?: string;
  imageUrl?: string;
  onRetake?: () => void;
  onAccept?: () => void;
  onFlagForReview?: () => void;
  analysisTimestamp?: Date;
  processingTime?: number;
}

export const AIAnalysisCard: React.FC<AIAnalysisCardProps> = ({
  title = 'AI Quality Assessment',
  metrics,
  fraudAlert,
  recommendation,
  imageUrl,
  onRetake,
  onAccept,
  onFlagForReview,
  analysisTimestamp,
  processingTime,
}) => {
  // Calculate overall confidence
  const overallConfidence = metrics.length > 0
    ? Math.round(metrics.reduce((sum, m) => sum + m.confidence, 0) / metrics.length)
    : 0;

  // Determine overall status
  const getOverallStatus = () => {
    if (fraudAlert && fraudAlert.severity === 'high') return 'danger';
    if (fraudAlert && fraudAlert.severity === 'medium') return 'warning';
    if (overallConfidence >= 85) return 'excellent';
    if (overallConfidence >= 70) return 'good';
    return 'fair';
  };

  const status = getOverallStatus();

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden">
      {/* Header */}
      <div
        className="p-6 pb-4"
        style={{
          background: 'linear-gradient(135deg, #F7FAFC 0%, #D9F2FF 100%)',
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: '#FFD700' }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3
                className="text-2xl"
                style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}
              >
                {title}
              </h3>
              {analysisTimestamp && (
                <p className="text-sm text-gray-600 mt-1">
                  Analyzed {analysisTimestamp.toLocaleTimeString()}
                  {processingTime && ` • ${processingTime}ms`}
                </p>
              )}
            </div>
          </div>

          {/* Overall Confidence Badge */}
          <Badge
            className="text-white"
            style={{
              backgroundColor:
                status === 'excellent'
                  ? '#10B981'
                  : status === 'good'
                  ? '#3B82F6'
                  : status === 'warning'
                  ? '#F59E0B'
                  : status === 'danger'
                  ? '#EF4444'
                  : '#6B7280',
            }}
          >
            {overallConfidence}% Confident
          </Badge>
        </div>

        {/* Image Preview */}
        {imageUrl && (
          <div className="mt-4 rounded-lg overflow-hidden border-2 border-white shadow-sm">
            <img
              src={imageUrl}
              alt="Analyzed commodity"
              className="w-full h-48 object-cover"
            />
          </div>
        )}
      </div>

      {/* Metrics Section */}
      <div className="p-6 space-y-4">
        <h4
          className="text-lg mb-3"
          style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}
        >
          Quality Metrics
        </h4>

        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-white to-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {metric.icon && (
                  <div className="text-gray-600">{metric.icon}</div>
                )}
                <span
                  className="text-sm"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: '#6B7280' }}
                >
                  {metric.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-base"
                  style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}
                >
                  {metric.value}
                </span>
                {metric.trend && (
                  <TrendingUp
                    className={`w-4 h-4 ${
                      metric.trend === 'up'
                        ? 'text-green-500'
                        : metric.trend === 'down'
                        ? 'text-red-500 rotate-180'
                        : 'text-gray-400'
                    }`}
                  />
                )}
              </div>
            </div>

            {/* Confidence Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Confidence</span>
                <span>{metric.confidence}%</span>
              </div>
              <Progress
                value={metric.confidence}
                className="h-2"
                style={{
                  backgroundColor: '#E5E7EB',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Fraud Alert Section */}
      {fraudAlert && (
        <div className="px-6 pb-4">
          <div
            className={`p-4 rounded-lg border-2 ${
              fraudAlert.severity === 'high'
                ? 'bg-red-50 border-red-200'
                : fraudAlert.severity === 'medium'
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-green-50 border-green-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {fraudAlert.severity === 'high' ? (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              ) : fraudAlert.severity === 'medium' ? (
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h5
                  className={`text-sm mb-1 ${
                    fraudAlert.severity === 'high'
                      ? 'text-red-900'
                      : fraudAlert.severity === 'medium'
                      ? 'text-yellow-900'
                      : 'text-green-900'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {fraudAlert.severity === 'high'
                    ? 'Fraud Alert'
                    : fraudAlert.severity === 'medium'
                    ? 'Attention Required'
                    : 'All Clear'}
                </h5>
                <p
                  className={`text-sm ${
                    fraudAlert.severity === 'high'
                      ? 'text-red-800'
                      : fraudAlert.severity === 'medium'
                      ? 'text-yellow-800'
                      : 'text-green-800'
                  }`}
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  {fraudAlert.message}
                </p>
                {fraudAlert.details && (
                  <p
                    className={`text-xs mt-1 ${
                      fraudAlert.severity === 'high'
                        ? 'text-red-700'
                        : fraudAlert.severity === 'medium'
                        ? 'text-yellow-700'
                        : 'text-green-700'
                    }`}
                    style={{ fontFamily: 'Lato, sans-serif' }}
                  >
                    {fraudAlert.details}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendation Section */}
      {recommendation && (
        <div className="px-6 pb-4">
          <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5
                  className="text-sm text-blue-900 mb-1"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  AI Recommendation
                </h5>
                <p
                  className="text-sm text-blue-800"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  {recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-6 pt-2 flex gap-3">
        {onRetake && (
          <Button
            onClick={onRetake}
            variant="outline"
            className="flex-1"
            style={{ borderColor: '#003E6D', color: '#003E6D' }}
          >
            <Camera className="w-4 h-4 mr-2" />
            Retake Photo
          </Button>
        )}

        {onFlagForReview && (
          <Button
            onClick={onFlagForReview}
            variant="outline"
            className="flex-1"
            style={{ borderColor: '#F59E0B', color: '#F59E0B' }}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Flag for Review
          </Button>
        )}

        {onAccept && (
          <Button
            onClick={onAccept}
            className="flex-1 text-white"
            style={{ backgroundColor: '#FFD700' }}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Accept Analysis
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AIAnalysisCard;
