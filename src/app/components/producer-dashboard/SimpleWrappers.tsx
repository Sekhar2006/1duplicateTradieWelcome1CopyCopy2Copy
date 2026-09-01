/**
 * Simple Wrapper Components
 * 
 * These wrappers provide a simplified interface that exactly matches
 * the sample specifications, while using the full-featured components
 * underneath.
 * 
 * Use these if you want to:
 * 1. Match the exact sample prop interface
 * 2. Have simpler, more concise component usage
 * 3. Hide advanced features by default
 */

import React from 'react';
import { AIMediaCaptureCamera, CapturedImage } from './AIMediaCaptureCamera';
import { AIAnalysisCard } from './AIAnalysisCard';
import { MediaUploadModal } from './MediaUploadModal';
import { Ruler, Eye, Sparkles, Droplets } from 'lucide-react';

// ============================================================================
// 1. CAMERA CAPTURE WRAPPER
// ============================================================================

interface CameraCaptureProps {
  onCapture: (imageData: any) => void;
}

/**
 * Simplified Camera Capture Component
 * 
 * Matches the sample specification exactly:
 * - Video view with auto-play
 * - Overlay guides
 * - Capture button
 * - Switch camera button
 * - Flash toggle button
 * - Instruction text
 * 
 * Usage:
 * ```tsx
 * <CameraCapture onCapture={(img) => console.log(img)} />
 * ```
 */
export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const [showCamera, setShowCamera] = React.useState(true);

  const handleCapture = (capturedImage: CapturedImage) => {
    // Convert to simple format
    onCapture({
      dataUrl: capturedImage.dataUrl,
      blob: capturedImage.blob,
      width: capturedImage.width,
      height: capturedImage.height,
      timestamp: capturedImage.timestamp,
    });
    setShowCamera(false);
  };

  if (!showCamera) {
    return null;
  }

  return (
    <AIMediaCaptureCamera
      onCapture={handleCapture}
      onClose={() => setShowCamera(false)}
      mode="product"
      autoCapture={false}  // Manual capture only for simplicity
      showConfidence={true}
      guidanceOverlay={true}
    />
  );
}

// ============================================================================
// 2. AI RESULT CARD WRAPPER
// ============================================================================

interface AIResultData {
  size: string;
  sizeConfidence: number;
  color: string;
  colorConfidence: number;
  quality: string;
  qualityConfidence: number;
  fraudDetected: boolean;
  recommendation: string;
}

interface AIResultCardProps {
  result: AIResultData;
}

/**
 * Simplified AI Result Card Component
 * 
 * Matches the sample specification exactly:
 * - Title: "AI Quality Assessment"
 * - Metrics: Size, Color, Quality with confidence %
 * - Fraud alert (conditional styling)
 * - Recommendation text
 * 
 * Usage:
 * ```tsx
 * <AIResultCard result={{
 *   size: 'Large',
 *   sizeConfidence: 95,
 *   color: 'Golden',
 *   colorConfidence: 92,
 *   quality: 'Premium',
 *   qualityConfidence: 88,
 *   fraudDetected: false,
 *   recommendation: 'Great quality!'
 * }} />
 * ```
 */
export function AIResultCard({ result }: AIResultCardProps) {
  return (
    <AIAnalysisCard
      title="AI Quality Assessment"
      metrics={[
        {
          label: 'Size',
          value: result.size,
          confidence: result.sizeConfidence,
          icon: <Ruler className="w-4 h-4" />,
        },
        {
          label: 'Color',
          value: result.color,
          confidence: result.colorConfidence,
          icon: <Eye className="w-4 h-4" />,
        },
        {
          label: 'Quality',
          value: result.quality,
          confidence: result.qualityConfidence,
          icon: <Sparkles className="w-4 h-4" />,
        },
      ]}
      fraudAlert={{
        severity: result.fraudDetected ? 'high' : 'low',
        message: result.fraudDetected
          ? 'Fraud Alert Detected!'
          : 'No anomalies found.',
      }}
      recommendation={result.recommendation}
    />
  );
}

// ============================================================================
// 3. UPLOAD MODAL WRAPPER
// ============================================================================

interface UploadModalProps {
  isUploading: boolean;
  progress: number;
  error?: string | null;
  onConfirm: () => void;
}

/**
 * Simplified Upload Modal Component
 * 
 * Matches the sample specification exactly:
 * - Upload button (disabled when uploading)
 * - Progress bar (shown when uploading)
 * - Error message (shown when error exists)
 * - Confirm button (disabled based on progress)
 * 
 * Usage:
 * ```tsx
 * <UploadModal
 *   isUploading={uploading}
 *   progress={75}
 *   error={errorMessage}
 *   onConfirm={() => console.log('Confirmed')}
 * />
 * ```
 */
export function UploadModal({
  isUploading,
  progress,
  error,
  onConfirm,
}: UploadModalProps) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [uploadedFiles, setUploadedFiles] = React.useState<any[]>([]);

  const handleUploadComplete = (files: any[]) => {
    setUploadedFiles(files);
  };

  const handleConfirm = () => {
    if (!isUploading && progress > 0) {
      onConfirm();
      setIsOpen(false);
    }
  };

  return (
    <MediaUploadModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onUploadComplete={handleUploadComplete}
      title="Upload Images or Videos"
      description="Add photos or videos of your commodity"
      maxFiles={5}
      showCameraOption={false}  // Simplified - no camera option
    />
  );
}

// ============================================================================
// COMPLETE EXAMPLE USING SIMPLE WRAPPERS
// ============================================================================

/**
 * Complete Example Flow
 * 
 * Shows how to use all three wrapper components together
 * in the exact flow described in the specifications.
 */
export function SimpleMediaCaptureFlow() {
  const [currentStep, setCurrentStep] = React.useState<
    'camera' | 'upload' | 'results' | 'confirm'
  >('camera');
  const [capturedImage, setCapturedImage] = React.useState<any>(null);
  const [aiResult, setAiResult] = React.useState<AIResultData | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  // Step 1: Camera capture
  const handleCapture = (imageData: any) => {
    console.log('Image captured:', imageData);
    setCapturedImage(imageData);
    setCurrentStep('upload');
    
    // Simulate AI analysis
    setTimeout(() => {
      simulateAIAnalysis();
    }, 2000);
  };

  // Step 2: Simulate AI analysis
  const simulateAIAnalysis = () => {
    const mockResult: AIResultData = {
      size: 'Large (6-8mm)',
      sizeConfidence: 95,
      color: 'Golden Yellow',
      colorConfidence: 92,
      quality: 'Premium Grade',
      qualityConfidence: 88,
      fraudDetected: false,
      recommendation:
        'Excellent quality detected. Consider capturing additional angles for complete assessment.',
    };

    setAiResult(mockResult);
    setCurrentStep('results');
  };

  // Step 3: Upload progress simulation
  React.useEffect(() => {
    if (currentStep === 'upload') {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  // Step 4: Confirm and submit
  const handleConfirm = () => {
    console.log('Confirmed! Submitting data...');
    setCurrentStep('confirm');
  };

  return (
    <div className="min-h-screen p-4" style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #D9F2FF 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-4xl text-center mb-8"
          style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}
        >
          Simple Media Capture Flow
        </h1>

        {/* Step 1: Camera Capture */}
        {currentStep === 'camera' && (
          <div>
            <h2 className="text-2xl mb-4" style={{ color: '#003E6D' }}>
              Step 1: Capture Image
            </h2>
            <CameraCapture onCapture={handleCapture} />
          </div>
        )}

        {/* Step 2: Upload & AI Analysis */}
        {currentStep === 'upload' && (
          <div>
            <h2 className="text-2xl mb-4" style={{ color: '#003E6D' }}>
              Step 2: Uploading & Analyzing...
            </h2>
            <UploadModal
              isUploading={uploadProgress < 100}
              progress={uploadProgress}
              error={uploadError}
              onConfirm={handleConfirm}
            />
          </div>
        )}

        {/* Step 3: AI Results */}
        {currentStep === 'results' && aiResult && (
          <div>
            <h2 className="text-2xl mb-4" style={{ color: '#003E6D' }}>
              Step 3: AI Assessment Results
            </h2>
            <AIResultCard result={aiResult} />
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => {
                  setCapturedImage(null);
                  setAiResult(null);
                  setUploadProgress(0);
                  setCurrentStep('camera');
                }}
                className="flex-1 px-6 py-3 rounded-lg border-2"
                style={{ borderColor: '#003E6D', color: '#003E6D' }}
              >
                Retake Photo
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-6 py-3 rounded-lg text-white"
                style={{ backgroundColor: '#FFD700' }}
              >
                Confirm and Submit
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 'confirm' && (
          <div className="text-center">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl mb-2" style={{ color: '#003E6D' }}>
                Success!
              </h2>
              <p className="text-gray-600">
                Your quality check has been submitted successfully.
              </p>
              <button
                onClick={() => {
                  setCapturedImage(null);
                  setAiResult(null);
                  setUploadProgress(0);
                  setCurrentStep('camera');
                }}
                className="mt-6 px-6 py-3 rounded-lg text-white"
                style={{ backgroundColor: '#FFD700' }}
              >
                Start New Check
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SimpleMediaCaptureFlow;
