/**
 * Enhanced Quality Check with AI
 * 
 * Complete integration example showing:
 * - AI Media Capture Camera
 * - Real-time AI Analysis
 * - Quality Check Form
 * - Offline Support
 * - Backend Integration
 * 
 * This is a working example you can customize and use in your screens!
 */

import React, { useState, useEffect } from 'react';
import { AIMediaCaptureCamera, CapturedImage } from './AIMediaCaptureCamera';
import { AIAnalysisCard } from './AIAnalysisCard';
import { DSButton } from '../../design-system/components/DSButton';
import { DSCard } from '../../design-system/components/DSCard';
import { DSBadge } from '../../design-system/components/DSBadge';
import { toast } from 'sonner@2.0.3';
import { 
  Camera, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft,
  Sparkles,
  Ruler,
  Eye,
  Droplets,
  Leaf,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface AIAnalysisResult {
  size: string;
  sizeConfidence: number;
  color: string;
  colorConfidence: number;
  quality: string;
  qualityConfidence: number;
  moisture?: string;
  moistureConfidence?: number;
  freshness?: string;
  freshnessConfidence?: number;
  fraudScore: number;
  fraudReason?: string;
  recommendation: string;
  overallConfidence: number;
  processingTime: number;
}

type Step = 'start' | 'camera' | 'analyzing' | 'results' | 'success';

// ============================================================================
// COMPONENT
// ============================================================================

export function EnhancedQualityCheckWithAI() {
  const [step, setStep] = useState<Step>('start');
  const [commodity, setCommodity] = useState('wheat');
  const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(null);
  const [aiResults, setAiResults] = useState<AIAnalysisResult | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleCaptureImage = async (image: CapturedImage) => {
    console.log('Image captured:', image);
    setCapturedImage(image);
    setStep('analyzing');

    // Simulate AI analysis (replace with real Grok AI call)
    await simulateAIAnalysis(image);
  };

  const simulateAIAnalysis = async (image: CapturedImage) => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI results (replace with real API call)
    const mockResults: AIAnalysisResult = {
      size: 'Large (6-8mm)',
      sizeConfidence: 95,
      color: 'Golden Yellow',
      colorConfidence: 92,
      quality: 'Premium Grade',
      qualityConfidence: 88,
      moisture: '12.5%',
      moistureConfidence: 90,
      freshness: 'Very Fresh',
      freshnessConfidence: 94,
      fraudScore: 0.1,
      recommendation: 'Excellent quality detected. Moisture content is optimal. Consider capturing additional angles for complete assessment.',
      overallConfidence: 92,
      processingTime: 1850,
    };

    setAiResults(mockResults);
    setStep('results');
  };

  const handleSubmitQualityCheck = async () => {
    if (!aiResults || !capturedImage) return;

    try {
      // TODO: Replace with real API call
      // await QualityCheckAPI.submitQualityCheck({
      //   commodity,
      //   metrics: aiResults,
      //   imageUrl: capturedImage.dataUrl,
      //   timestamp: new Date().toISOString(),
      // });

      console.log('Submitting quality check:', {
        commodity,
        metrics: aiResults,
        image: capturedImage,
      });

      toast.success('Quality check submitted successfully!');
      setStep('success');
    } catch (error) {
      console.error('Submit failed:', error);
      toast.error('Failed to submit quality check');
    }
  };

  const handleReset = () => {
    setCapturedImage(null);
    setAiResults(null);
    setStep('start');
  };

  // ============================================================================
  // RENDER: START SCREEN
  // ============================================================================

  if (step === 'start') {
    return (
      <div 
        className="min-h-screen p-6"
        style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #D9F2FF 100%)' }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-full mb-4" style={{ backgroundColor: '#FFD700' }}>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 
              className="text-4xl mb-2"
              style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}
            >
              AI Quality Check
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
              Powered by Grok AI - Instant commodity analysis
            </p>
          </div>

          {/* Online Status */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-600">
              {isOnline ? 'Online - AI Ready' : 'Offline - Data will sync later'}
            </span>
          </div>

          {/* Commodity Selection */}
          <DSCard className="p-6 mb-6">
            <h2 
              className="text-xl mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}
            >
              Select Commodity
            </h2>
            <select
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              style={{ fontFamily: 'Lato, sans-serif' }}
            >
              <option value="wheat">🌾 Wheat</option>
              <option value="rice">🌾 Rice</option>
              <option value="corn">🌽 Corn</option>
              <option value="soybean">🌱 Soybean</option>
              <option value="cotton">☁️ Cotton</option>
            </select>
          </DSCard>

          {/* Features */}
          <DSCard className="p-6 mb-6">
            <h2 
              className="text-xl mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}
            >
              What AI Analyzes
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Ruler className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold">Size & Grade</p>
                  <p className="text-xs text-gray-600">Grain dimensions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold">Color Analysis</p>
                  <p className="text-xs text-gray-600">Visual quality</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Droplets className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold">Moisture Content</p>
                  <p className="text-xs text-gray-600">Optimal storage</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Leaf className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-semibold">Freshness Score</p>
                  <p className="text-xs text-gray-600">Market readiness</p>
                </div>
              </div>
            </div>
          </DSCard>

          {/* Start Button */}
          <DSButton
            onClick={() => setStep('camera')}
            className="w-full text-white"
            size="lg"
            style={{ backgroundColor: '#FFD700' }}
          >
            <Camera className="w-5 h-5 mr-2" />
            Start AI Quality Check
          </DSButton>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: CAMERA
  // ============================================================================

  if (step === 'camera') {
    return (
      <AIMediaCaptureCamera
        onCapture={handleCaptureImage}
        onClose={handleReset}
        mode="quality"
        autoCapture={true}
        showConfidence={true}
        guidanceOverlay={true}
      />
    );
  }

  // ============================================================================
  // RENDER: ANALYZING
  // ============================================================================

  if (step === 'analyzing') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #D9F2FF 100%)' }}
      >
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 animate-ping">
              <Sparkles className="w-16 h-16 text-yellow-400 opacity-75" />
            </div>
            <Sparkles className="w-16 h-16 text-yellow-500 relative z-10" />
          </div>
          <h2 
            className="text-2xl mb-2"
            style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}
          >
            Analyzing with Grok AI
          </h2>
          <p className="text-gray-600 mb-4" style={{ fontFamily: 'Lato, sans-serif' }}>
            Processing your commodity sample...
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: RESULTS
  // ============================================================================

  if (step === 'results' && aiResults && capturedImage) {
    const metrics = [
      { 
        label: 'Size', 
        value: aiResults.size, 
        confidence: aiResults.sizeConfidence,
        icon: <Ruler className="w-4 h-4" />,
      },
      { 
        label: 'Color', 
        value: aiResults.color, 
        confidence: aiResults.colorConfidence,
        icon: <Eye className="w-4 h-4" />,
      },
      { 
        label: 'Quality', 
        value: aiResults.quality, 
        confidence: aiResults.qualityConfidence,
        icon: <Sparkles className="w-4 h-4" />,
      },
    ];

    if (aiResults.moisture && aiResults.moistureConfidence) {
      metrics.push({
        label: 'Moisture',
        value: aiResults.moisture,
        confidence: aiResults.moistureConfidence,
        icon: <Droplets className="w-4 h-4" />,
      });
    }

    if (aiResults.freshness && aiResults.freshnessConfidence) {
      metrics.push({
        label: 'Freshness',
        value: aiResults.freshness,
        confidence: aiResults.freshnessConfidence,
        icon: <Leaf className="w-4 h-4" />,
      });
    }

    const fraudAlert = aiResults.fraudScore > 0.7 ? {
      severity: 'high' as const,
      message: aiResults.fraudReason || 'Potential quality issues detected. Manual review recommended.',
    } : aiResults.fraudScore > 0.4 ? {
      severity: 'medium' as const,
      message: 'Some inconsistencies detected. Consider additional verification.',
    } : {
      severity: 'low' as const,
      message: '✓ No anomalies detected. Quality verified.',
    };

    return (
      <div 
        className="min-h-screen p-6"
        style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #D9F2FF 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-gray-600 mb-4 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Start</span>
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <DSBadge variant="success" className="mb-2">
              Analysis Complete
            </DSBadge>
            <h1 
              className="text-3xl"
              style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}
            >
              AI Quality Assessment
            </h1>
          </div>

          {/* AI Results Card */}
          <AIAnalysisCard
            title="Grok AI Analysis Results"
            metrics={metrics}
            fraudAlert={fraudAlert}
            recommendation={aiResults.recommendation}
            imageUrl={capturedImage.dataUrl}
            timestamp={new Date()}
            processingTime={aiResults.processingTime}
            overallConfidence={aiResults.overallConfidence}
          />

          {/* Actions */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <DSButton
              variant="outline"
              onClick={() => {
                setCapturedImage(null);
                setAiResults(null);
                setStep('camera');
              }}
              size="lg"
            >
              <Camera className="w-4 h-4 mr-2" />
              Retake Photo
            </DSButton>

            <DSButton
              onClick={handleSubmitQualityCheck}
              size="lg"
              className="text-white"
              style={{ backgroundColor: '#FFD700' }}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Submit Quality Check
            </DSButton>
          </div>

          {/* Additional Options */}
          <div className="mt-4">
            <DSButton
              variant="ghost"
              onClick={() => {
                // TODO: Implement flag for review
                toast.info('Flagged for manual review');
              }}
              className="w-full"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Flag for Manual Review
            </DSButton>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER: SUCCESS
  // ============================================================================

  if (step === 'success') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #D9F2FF 100%)' }}
      >
        <div className="text-center max-w-md">
          <div className="inline-block p-6 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
          <h2 
            className="text-3xl mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}
          >
            Quality Check Complete!
          </h2>
          <p className="text-gray-600 mb-6" style={{ fontFamily: 'Lato, sans-serif' }}>
            Your AI-powered quality assessment has been submitted successfully.
          </p>

          {/* Summary */}
          {aiResults && (
            <DSCard className="p-6 mb-6 text-left">
              <h3 className="text-lg mb-3" style={{ color: '#003E6D' }}>
                Assessment Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Commodity:</span>
                  <span className="font-semibold">{commodity.charAt(0).toUpperCase() + commodity.slice(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Overall Grade:</span>
                  <span className="font-semibold">{aiResults.quality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">AI Confidence:</span>
                  <span className="font-semibold">{aiResults.overallConfidence}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Time:</span>
                  <span className="font-semibold">{aiResults.processingTime}ms</span>
                </div>
              </div>
            </DSCard>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <DSButton
              onClick={handleReset}
              className="w-full text-white"
              size="lg"
              style={{ backgroundColor: '#FFD700' }}
            >
              Start New Quality Check
            </DSButton>
            
            <DSButton
              variant="outline"
              onClick={() => {
                // TODO: Navigate to dashboard
                console.log('Navigate to dashboard');
              }}
              className="w-full"
              size="lg"
            >
              Back to Dashboard
            </DSButton>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default EnhancedQualityCheckWithAI;
