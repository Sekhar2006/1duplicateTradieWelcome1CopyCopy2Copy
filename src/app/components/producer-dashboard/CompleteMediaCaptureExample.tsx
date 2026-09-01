import React, { useState } from 'react';
import { AIMediaCaptureCamera } from './AIMediaCaptureCamera';
import { AIAnalysisCard } from './AIAnalysisCard';
import { MediaUploadModal } from './MediaUploadModal';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { MediaCompressor } from './utils/MediaCompressor';
import { mediaCache } from './utils/OfflineMediaCache';
import { toast } from 'sonner@2.0.3';
import { Camera, Upload, Sparkles, Leaf, Droplets, Ruler, Eye } from 'lucide-react';

interface AIAnalysisResult {
  size: { value: string; confidence: number };
  color: { value: string; confidence: number };
  quality: { value: string; confidence: number };
  moisture: { value: string; confidence: number };
  fraudAlert: {
    severity: 'low' | 'medium' | 'high';
    message: string;
    details?: string;
  };
  recommendation: string;
  imageUrl: string;
  timestamp: Date;
  processingTime: number;
}

export const CompleteMediaCaptureExample: React.FC = () => {
  // State management
  const [showCamera, setShowCamera] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Handle camera capture
  const handleCameraCapture = async (capturedData: any) => {
    try {
      setShowCamera(false);
      setCapturedImage(capturedData.dataUrl);
      
      // Compress image
      toast.info('Compressing image...');
      const compressionResult = await MediaCompressor.compressImage(
        new File([capturedData.blob], 'quality_check.jpg'),
        {
          maxSizeMB: 2,
          quality: 0.85,
        }
      );

      toast.success(
        `Compressed: ${MediaCompressor.formatFileSize(compressionResult.originalSize)} → ` +
        `${MediaCompressor.formatFileSize(compressionResult.compressedSize)}`
      );

      // Queue upload (works offline)
      const mediaId = await mediaCache.queueUpload(
        compressionResult.file,
        `wheat_quality_${Date.now()}.jpg`,
        '/api/quality-check/upload',
        {
          commodityType: 'wheat',
          checkType: 'visual',
        }
      );

      // Simulate AI analysis
      analyzeImage(capturedData.dataUrl);
    } catch (error) {
      console.error('Capture error:', error);
      toast.error('Failed to process image');
    }
  };

  // Simulate AI analysis
  const analyzeImage = async (imageUrl: string) => {
    setIsAnalyzing(true);
    const startTime = Date.now();

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock AI analysis results
    const mockResult: AIAnalysisResult = {
      size: {
        value: 'Large (6-8mm)',
        confidence: 95,
      },
      color: {
        value: 'Golden Yellow',
        confidence: 92,
      },
      quality: {
        value: 'Premium Grade',
        confidence: 88,
      },
      moisture: {
        value: '12.5%',
        confidence: 90,
      },
      fraudAlert: {
        severity: 'low',
        message: 'No anomalies detected',
        details: 'Sample appears authentic with consistent grain structure',
      },
      recommendation:
        'Excellent quality detected. Consider capturing additional angles for complete assessment. Lighting conditions are optimal.',
      imageUrl,
      timestamp: new Date(),
      processingTime: Date.now() - startTime,
    };

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
    toast.success('AI analysis complete!');
  };

  // Handle upload modal completion
  const handleUploadComplete = async (files: any[]) => {
    toast.info('Processing uploaded files...');
    
    // Process first file (for demo)
    if (files.length > 0 && files[0].status === 'success') {
      analyzeImage(files[0].preview);
    }
  };

  // Handle retake
  const handleRetake = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setShowCamera(true);
  };

  // Handle accept
  const handleAccept = () => {
    toast.success('Quality check saved successfully!');
    setCapturedImage(null);
    setAnalysisResult(null);
  };

  // Handle flag for review
  const handleFlagForReview = () => {
    toast.info('Flagged for manual review by quality expert');
  };

  return (
    <div className="min-h-screen p-4" style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #D9F2FF 100%)' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl mb-2"
            style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}
          >
            AI Quality Assessment
          </h1>
          <p className="text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
            Capture or upload photos for instant AI-powered quality analysis
          </p>
        </div>

        {/* No Image Yet - Show Options */}
        {!capturedImage && !analysisResult && (
          <Card className="p-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div
                  className="p-4 rounded-full"
                  style={{ backgroundColor: '#D9F2FF' }}
                >
                  <Sparkles className="w-12 h-12" style={{ color: '#003E6D' }} />
                </div>
              </div>

              <div>
                <h2
                  className="text-2xl mb-2"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}
                >
                  Start Quality Check
                </h2>
                <p className="text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Choose how you'd like to provide images for analysis
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button
                  onClick={() => setShowCamera(true)}
                  className="flex-1 h-24 flex-col gap-2 text-white"
                  style={{ backgroundColor: '#FFD700' }}
                >
                  <Camera className="w-8 h-8" />
                  <div>
                    <div className="text-base" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Use Camera
                    </div>
                    <div className="text-xs opacity-90">AI-guided capture</div>
                  </div>
                </Button>

                <Button
                  onClick={() => setShowUploadModal(true)}
                  variant="outline"
                  className="flex-1 h-24 flex-col gap-2"
                  style={{ borderColor: '#003E6D', color: '#003E6D' }}
                >
                  <Upload className="w-8 h-8" />
                  <div>
                    <div className="text-base" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Upload Files
                    </div>
                    <div className="text-xs opacity-70">Photos or videos</div>
                  </div>
                </Button>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mt-8">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
                      AI Analysis
                    </p>
                    <p className="text-xs text-gray-600">Instant results</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
                      Quality Metrics
                    </p>
                    <p className="text-xs text-gray-600">Size, color, grade</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Droplets className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
                      Moisture Check
                    </p>
                    <p className="text-xs text-gray-600">Visual estimation</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Leaf className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
                      Fraud Detection
                    </p>
                    <p className="text-xs text-gray-600">Authenticity check</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Analyzing State */}
        {isAnalyzing && (
          <Card className="p-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div
                  className="p-4 rounded-full animate-pulse"
                  style={{ backgroundColor: '#D9F2FF' }}
                >
                  <Sparkles className="w-12 h-12 animate-spin" style={{ color: '#003E6D' }} />
                </div>
              </div>
              <div>
                <h3
                  className="text-xl mb-2"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}
                >
                  Analyzing Your Sample...
                </h3>
                <p className="text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Our AI is examining size, color, quality, and detecting any anomalies
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && !isAnalyzing && (
          <AIAnalysisCard
            metrics={[
              {
                label: 'Grain Size',
                value: analysisResult.size.value,
                confidence: analysisResult.size.confidence,
                icon: <Ruler className="w-4 h-4" />,
                trend: 'up',
              },
              {
                label: 'Color Grade',
                value: analysisResult.color.value,
                confidence: analysisResult.color.confidence,
                icon: <Eye className="w-4 h-4" />,
                trend: 'stable',
              },
              {
                label: 'Quality Rating',
                value: analysisResult.quality.value,
                confidence: analysisResult.quality.confidence,
                icon: <Sparkles className="w-4 h-4" />,
                trend: 'up',
              },
              {
                label: 'Moisture Content',
                value: analysisResult.moisture.value,
                confidence: analysisResult.moisture.confidence,
                icon: <Droplets className="w-4 h-4" />,
                trend: 'stable',
              },
            ]}
            fraudAlert={analysisResult.fraudAlert}
            recommendation={analysisResult.recommendation}
            imageUrl={analysisResult.imageUrl}
            onRetake={handleRetake}
            onAccept={handleAccept}
            onFlagForReview={handleFlagForReview}
            analysisTimestamp={analysisResult.timestamp}
            processingTime={analysisResult.processingTime}
          />
        )}

        {/* Helper Text */}
        {!analysisResult && !isAnalyzing && (
          <div className="text-center">
            <p className="text-sm text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
              💡 For best results, ensure good lighting and capture multiple angles of your commodity
            </p>
          </div>
        )}
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <AIMediaCaptureCamera
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
          mode="quality"
          autoCapture={true}
          showConfidence={true}
          guidanceOverlay={true}
        />
      )}

      {/* Upload Modal */}
      <MediaUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadComplete={handleUploadComplete}
        onCameraCapture={() => {
          setShowUploadModal(false);
          setShowCamera(true);
        }}
        title="Upload Quality Check Images"
        description="Add clear photos of your commodity for AI analysis"
        maxFiles={5}
        showCameraOption={true}
      />
    </div>
  );
};

export default CompleteMediaCaptureExample;
