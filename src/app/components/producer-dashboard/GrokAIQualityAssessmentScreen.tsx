import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Camera, CheckCircle2, AlertCircle, XCircle, Loader2, Image as ImageIcon, Gauge, TrendingUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AIAnalysisResult {
  metric: string;
  value: string;
  score: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  details: string;
}

interface GrokAIQualityAssessmentScreenProps {
  onApprove: (results: any) => void;
  onReject: () => void;
  onBack: () => void;
  productData?: {
    name: string;
    grade: string;
    quantity: number;
  };
}

export const GrokAIQualityAssessmentScreen: React.FC<GrokAIQualityAssessmentScreenProps> = ({
  onApprove,
  onReject,
  onBack,
  productData = {
    name: 'Wheat',
    grade: 'A',
    quantity: 1000,
  },
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [capturedMedia, setCapturedMedia] = useState<string[]>([]);
  const [aiResults, setAiResults] = useState<AIAnalysisResult[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [fraudDetected, setFraudDetected] = useState(false);

  const mockAnalysisResults: AIAnalysisResult[] = [
    {
      metric: 'Grain Size',
      value: 'Medium to Large (4.5-5.2mm)',
      score: 94,
      status: 'excellent',
      details: 'Consistent grain size indicates premium quality',
    },
    {
      metric: 'Color Analysis',
      value: 'Golden Yellow',
      score: 92,
      status: 'excellent',
      details: 'Ideal color for Grade A wheat, no discoloration detected',
    },
    {
      metric: 'Quality Grade',
      value: 'Grade A Confirmed',
      score: 95,
      status: 'excellent',
      details: 'Meets all parameters for Grade A classification',
    },
    {
      metric: 'Moisture Content',
      value: '12.5% (Optimal)',
      score: 90,
      status: 'excellent',
      details: 'Within ideal range for storage and processing',
    },
    {
      metric: 'Authenticity Check',
      value: 'Verified',
      score: 98,
      status: 'excellent',
      details: 'No fraud indicators detected, product matches declared specifications',
    },
  ];

  const handleCapture = () => {
    setIsCapturing(true);
    toast.info('Camera interface would open here');

    // Simulate capturing images
    setTimeout(() => {
      const mockImages = [
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
        'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400',
        'https://images.unsplash.com/photo-1605367331962-59f7e3fc04bc?w=400',
      ];
      setCapturedMedia(mockImages);
      setIsCapturing(false);
      toast.success('3 photos captured successfully');
    }, 2000);
  };

  const handleAnalyze = () => {
    if (capturedMedia.length === 0) {
      toast.error('Please capture photos first');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate AI analysis
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalysisComplete(true);
          setAiResults(mockAnalysisResults);
          setOverallScore(93);
          setFraudDetected(false);
          toast.success('AI analysis complete!');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'fair':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'fair':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'poor':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#FFD700' }}>
            <Gauge className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-2" style={{ color: '#003E6D' }}>AI Quality Validation</h1>
          <p className="text-gray-600">Grok AI-powered real-time quality assessment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Camera and Capture Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Info */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="mb-4" style={{ color: '#003E6D' }}>Product Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Commodity</p>
                  <p style={{ color: '#003E6D' }}>{productData.name}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Grade</p>
                  <Badge className="bg-green-500 text-white">Grade {productData.grade}</Badge>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p style={{ color: '#003E6D' }}>{productData.quantity} kg</p>
                </div>
              </div>
            </Card>

            {/* Camera Interface */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="mb-4" style={{ color: '#003E6D' }}>Capture Product Images</h3>

              {capturedMedia.length === 0 ? (
                <div className="bg-gray-100 rounded-lg p-12 text-center mb-4">
                  {isCapturing ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-3" />
                      <p className="text-gray-600">Opening camera...</p>
                    </div>
                  ) : (
                    <div>
                      <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600 mb-2">Real-time Camera Viewfinder</p>
                      <p className="text-sm text-gray-500">Position product clearly in frame</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {capturedMedia.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-green-500">
                      <img src={image} alt={`Capture ${index + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleCapture}
                  disabled={isCapturing || capturedMedia.length > 0}
                  className="flex-1 text-white"
                  style={{ backgroundColor: '#FFD700' }}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {capturedMedia.length > 0 ? 'Photos Captured' : 'Snap Photos'}
                </Button>
                {capturedMedia.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setCapturedMedia([])}
                  >
                    Retake
                  </Button>
                )}
              </div>
            </Card>

            {/* Analysis Results */}
            {analysisComplete && (
              <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
                <h3 className="mb-4" style={{ color: '#003E6D' }}>Analysis Results</h3>

                <div className="space-y-3">
                  {aiResults.map((result, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(result.status)}
                          <div>
                            <p style={{ color: '#003E6D' }}>{result.metric}</p>
                            <p className="text-sm text-gray-600">{result.value}</p>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(result.status)} text-white`}>
                          {result.score}%
                        </Badge>
                      </div>
                      <Progress value={result.score} className="h-2 mb-2" />
                      <p className="text-sm text-gray-500">{result.details}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar - Analysis and Actions */}
          <div className="space-y-6">
            {/* AI Status */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="mb-4" style={{ color: '#003E6D' }}>AI Status</h3>

              {!isAnalyzing && !analysisComplete && (
                <div>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-900 mb-2">Ready for Analysis</p>
                    <p className="text-sm text-blue-700">
                      Grok AI will analyze size, color, quality, and authenticity
                    </p>
                  </div>
                  <Button
                    onClick={handleAnalyze}
                    disabled={capturedMedia.length === 0}
                    className="w-full text-white"
                    style={{ backgroundColor: '#003E6D' }}
                  >
                    Start AI Analysis
                  </Button>
                </div>
              )}

              {isAnalyzing && (
                <div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm" style={{ color: '#003E6D' }}>Analyzing...</span>
                      <span className="text-sm" style={{ color: '#003E6D' }}>{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} className="h-3" />
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      <span>Processing images...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      <span>Analyzing quality parameters...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      <span>Running fraud detection...</span>
                    </div>
                  </div>
                </div>
              )}

              {analysisComplete && (
                <div>
                  <div className="mb-4 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-3" style={{ backgroundColor: '#10B98120' }}>
                      <span className="text-3xl" style={{ color: '#10B981' }}>{overallScore}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Overall Quality Score</p>
                    <Badge className="bg-green-500 text-white">Excellent</Badge>
                  </div>

                  <div className={`rounded-lg p-4 mb-4 ${fraudDetected ? 'bg-red-50' : 'bg-green-50'}`}>
                    <div className="flex items-start gap-2">
                      {fraudDetected ? (
                        <>
                          <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                          <div>
                            <p className="text-sm text-red-900 mb-1">Fraud Alert</p>
                            <p className="text-sm text-red-700">Discrepancies detected. Review required.</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="text-sm text-green-900 mb-1">Fraud Detection: All Clear</p>
                            <p className="text-sm text-green-700">Product verified as authentic</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* AI Suggestions */}
            {analysisComplete && (
              <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg border-2" style={{ borderColor: '#FFD700' }}>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5" style={{ color: '#FFD700' }} />
                  <h3 style={{ color: '#003E6D' }}>AI Recommendations</h3>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    <p className="text-gray-700">Product quality matches Grade A standards</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    <p className="text-gray-700">Recommended price: ₹2,850-3,000/quintal</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    <p className="text-gray-700">Ideal for premium buyers and export</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    <p className="text-gray-700">Storage conditions: Optimal</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Action Buttons */}
            {analysisComplete && (
              <div className="space-y-3">
                <Button
                  onClick={() => onApprove({ aiResults, overallScore, fraudDetected })}
                  className="w-full text-white"
                  style={{ backgroundColor: '#FFD700' }}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Approve and Continue
                </Button>
                <Button
                  onClick={onReject}
                  variant="outline"
                  className="w-full"
                >
                  Reject Assessment
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-start mt-8">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
