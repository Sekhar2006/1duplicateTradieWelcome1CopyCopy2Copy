import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, RotateCw, Zap, ZapOff, Maximize2, CheckCircle2, AlertCircle, Loader2, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export interface AIMediaCaptureCameraProps {
  onCapture: (imageData: CapturedImage) => void;
  onClose: () => void;
  mode?: 'document' | 'product' | 'quality';
  autoCapture?: boolean;
  showConfidence?: boolean;
  guidanceOverlay?: boolean;
}

export interface CapturedImage {
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
  timestamp: number;
  compressed?: boolean;
}

interface DetectionState {
  edgesDetected: boolean;
  confidence: number;
  feedback: string;
}

export const AIMediaCaptureCamera: React.FC<AIMediaCaptureCameraProps> = ({
  onCapture,
  onClose,
  mode = 'product',
  autoCapture = true,
  showConfidence = true,
  guidanceOverlay = true,
}) => {
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // State
  const [cameraActive, setCameraActive] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isCapturing, setIsCapturing] = useState(false);
  const [detection, setDetection] = useState<DetectionState>({
    edgesDetected: false,
    confidence: 0,
    feedback: 'Align object within frame',
  });
  const [gridEnabled, setGridEnabled] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [processingImage, setProcessingImage] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showPermissionHelp, setShowPermissionHelp] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize camera
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  // Auto-detection loop
  useEffect(() => {
    if (!cameraActive || !videoRef.current) return;

    const detectionInterval = setInterval(() => {
      performEdgeDetection();
    }, 500);

    return () => clearInterval(detectionInterval);
  }, [cameraActive]);

  // Auto-capture when confidence is high
  useEffect(() => {
    if (autoCapture && detection.confidence >= 90 && detection.edgesDetected && !isCapturing) {
      handleCapture();
    }
  }, [detection.confidence, autoCapture]);

  const startCamera = async () => {
    try {
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setCameraActive(true);
    } catch (error: any) {
      // Handle specific error types with user-friendly messages
      let errorMessage = 'Failed to access camera. ';
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage = 'Camera permission denied. Please allow camera access in your browser settings.';
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMessage = 'No camera found. Please connect a camera and try again.';
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        errorMessage = 'Camera is already in use by another application.';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = 'Camera does not support the requested settings.';
      } else if (error.name === 'SecurityError') {
        errorMessage = 'Camera access blocked. Please use HTTPS or allow insecure localhost.';
      } else if (error.message) {
        errorMessage += error.message;
      }
      
      // Show permission help screen instead of error toast
      setCameraError(errorMessage);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const performEdgeDetection = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data for analysis
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Simple edge detection simulation
    // In production, this would use TensorFlow.js or similar
    const mockDetection = simulateEdgeDetection(imageData);

    setDetection(mockDetection);
  };

  const simulateEdgeDetection = (imageData: ImageData): DetectionState => {
    // Mock edge detection - replace with actual ML model
    // This simulates real-time object/document detection
    
    const brightness = calculateBrightness(imageData);
    const contrast = calculateContrast(imageData);
    
    let confidence = 0;
    let feedback = '';
    let edgesDetected = false;

    // Simulate detection logic
    if (brightness < 50) {
      feedback = 'Too dark - increase lighting';
      confidence = 20;
    } else if (brightness > 200) {
      feedback = 'Too bright - reduce glare';
      confidence = 30;
    } else if (contrast < 20) {
      feedback = 'Low contrast - adjust background';
      confidence = 40;
    } else {
      // Good conditions - simulate increasing confidence
      const baseConfidence = Math.random() * 30 + 60; // 60-90
      confidence = Math.min(100, baseConfidence + (contrast / 2));
      
      if (confidence > 85) {
        feedback = '✓ Perfect! Capturing...';
        edgesDetected = true;
      } else if (confidence > 70) {
        feedback = 'Hold steady...';
        edgesDetected = true;
      } else {
        feedback = 'Align object within frame';
      }
    }

    return {
      edgesDetected,
      confidence: Math.round(confidence),
      feedback,
    };
  };

  const calculateBrightness = (imageData: ImageData): number => {
    const data = imageData.data;
    let totalBrightness = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      totalBrightness += avg;
    }
    
    return totalBrightness / (data.length / 4);
  };

  const calculateContrast = (imageData: ImageData): number => {
    const data = imageData.data;
    const brightnesses: number[] = [];
    
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      brightnesses.push(avg);
    }
    
    const max = Math.max(...brightnesses);
    const min = Math.min(...brightnesses);
    
    return max - min;
  };

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current || isCapturing) return;

    setIsCapturing(true);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Canvas context not available');

      // Flash effect
      if (flashEnabled && streamRef.current) {
        const track = streamRef.current.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        
        if ('torch' in capabilities) {
          // @ts-ignore - torch is not in standard types yet
          await track.applyConstraints({ advanced: [{ torch: true }] });
          setTimeout(async () => {
            // @ts-ignore
            await track.applyConstraints({ advanced: [{ torch: false }] });
          }, 100);
        }
      }

      // Capture frame
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error('Failed to create blob'));
          },
          'image/jpeg',
          0.95
        );
      });

      // Create data URL for preview
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);

      // Show preview
      setCapturedImage(dataUrl);
    } catch (error) {
      // Silently handle capture errors - user can try again
      setIsCapturing(false);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleConfirmCapture = async () => {
    if (!canvasRef.current || !capturedImage) return;

    setProcessingImage(true);

    try {
      const canvas = canvasRef.current;
      
      // Create blob from canvas
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b) resolve(b);
            else reject(new Error('Failed to create blob'));
          },
          'image/jpeg',
          0.95
        );
      });

      const capturedData: CapturedImage = {
        blob,
        dataUrl: capturedImage,
        width: canvas.width,
        height: canvas.height,
        timestamp: Date.now(),
        compressed: false,
      };

      onCapture(capturedData);
    } catch (error) {
      // Silently handle processing errors
      setProcessingImage(false);
      setCapturedImage(null);
    } finally {
      setProcessingImage(false);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setIsCapturing(false);
  };

  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled);
    toast.info(flashEnabled ? 'Flash disabled' : 'Flash enabled');
  };

  const toggleCamera = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
    toast.info('Switching camera...');
  };

  const toggleGrid = () => {
    setGridEnabled(!gridEnabled);
  };

  // Render preview after capture
  if (capturedImage) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* Preview Image */}
        <div className="relative h-full w-full">
          <img
            src={capturedImage}
            alt="Captured"
            className="h-full w-full object-contain"
          />

          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-lg">Preview</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRetake}
                className="text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleRetake}
                className="flex-1 text-white border-white hover:bg-white/20"
              >
                Retake
              </Button>
              <Button
                onClick={handleConfirmCapture}
                disabled={processingImage}
                className="flex-1 text-white"
                style={{ backgroundColor: '#FFD700' }}
              >
                {processingImage ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirm
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle file upload as fallback
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        
        // Create blob from file
        const capturedData: CapturedImage = {
          blob: file,
          dataUrl,
          width: 1920,
          height: 1080,
          timestamp: Date.now(),
          compressed: false,
        };

        onCapture(capturedData);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      // Silently handle upload errors - user can try again
      setCameraError('Failed to upload image. Please try again or use the camera instead.');
    }
  };

  // If camera error, show permission help
  if (cameraError) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6">
          {/* Error Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-red-600" />
            </div>
          </div>

          {/* Error Title */}
          <h2 className="text-2xl text-center mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}>
            Camera Access Required
          </h2>

          {/* Error Message */}
          <p className="text-gray-600 text-center mb-6" style={{ fontFamily: 'Lato, sans-serif' }}>
            {cameraError}
          </p>

          {/* Help Instructions */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2 text-sm" style={{ color: '#003E6D' }}>
              How to fix this:
            </h3>
            <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
              <li>Click the camera icon in your browser's address bar</li>
              <li>Select "Allow" for camera access</li>
              <li>Reload the page if needed</li>
              <li>Try again</li>
            </ol>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => {
                setCameraError(null);
                startCamera();
              }}
              className="w-full text-white"
              style={{ backgroundColor: '#FFD700' }}
            >
              <Camera className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image Instead
            </Button>

            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full"
            >
              Cancel
            </Button>
          </div>

          {/* Browser-specific help */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <details className="text-xs text-gray-600">
              <summary className="cursor-pointer font-semibold mb-2">
                Browser-specific instructions
              </summary>
              <div className="space-y-2 pl-2">
                <p><strong>Chrome/Edge:</strong> Click the camera icon in the address bar → Allow</p>
                <p><strong>Firefox:</strong> Click the crossed-out camera icon → Allow</p>
                <p><strong>Safari:</strong> Safari → Settings → Websites → Camera → Allow</p>
                <p><strong>Mobile:</strong> Go to Settings → App → Permissions → Camera → Allow</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    );
  }

  // Render camera view
  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Video Feed */}
      <div className="relative h-full w-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full object-cover"
        />

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Frame Guide Overlay */}
        {guidanceOverlay && cameraActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`relative border-2 ${
                detection.edgesDetected && detection.confidence > 80
                  ? 'border-green-500'
                  : 'border-white'
              } rounded-lg transition-colors duration-300`}
              style={{
                width: mode === 'document' ? '85%' : '70%',
                height: mode === 'document' ? '60%' : '70%',
                maxWidth: '600px',
              }}
            >
              {/* Corner Markers */}
              {[
                'top-0 left-0',
                'top-0 right-0',
                'bottom-0 left-0',
                'bottom-0 right-0',
              ].map((position, index) => (
                <div
                  key={index}
                  className={`absolute w-6 h-6 ${
                    detection.edgesDetected ? 'bg-green-500' : 'bg-white'
                  } ${position}`}
                  style={{
                    clipPath:
                      index === 0
                        ? 'polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%)'
                        : index === 1
                        ? 'polygon(0 0, 100% 0, 100% 100%, 70% 100%, 70% 30%, 0 30%)'
                        : index === 2
                        ? 'polygon(0 0, 30% 0, 30% 70%, 100% 70%, 100% 100%, 0 100%)'
                        : 'polygon(70% 0, 100% 0, 100% 100%, 0 100%, 0 70%, 70% 70%)',
                  }}
                />
              ))}

              {/* Grid Overlay */}
              {gridEnabled && (
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="border border-white/30"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2">
              <Badge className="bg-white/20 text-white backdrop-blur-sm">
                {mode === 'document' ? 'Document' : mode === 'product' ? 'Product' : 'Quality Check'}
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleGrid}
                className="text-white"
              >
                <Maximize2 className={`w-5 h-5 ${gridEnabled ? 'text-yellow-400' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* AI Confidence Meter */}
        {showConfidence && cameraActive && (
          <div className="absolute top-20 left-4 right-4">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm">AI Confidence</span>
                <span className="text-white text-sm">{detection.confidence}%</span>
              </div>
              <Progress
                value={detection.confidence}
                className="h-2"
              />
              <p className="text-white text-xs mt-2 flex items-center gap-2">
                {detection.confidence > 80 ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                )}
                {detection.feedback}
              </p>
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex items-center justify-center gap-8">
            {/* Flash Toggle */}
            <Button
              variant="ghost"
              size="lg"
              onClick={toggleFlash}
              className="text-white"
            >
              {flashEnabled ? (
                <Zap className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ) : (
                <ZapOff className="w-6 h-6" />
              )}
            </Button>

            {/* Capture Button */}
            <Button
              onClick={handleCapture}
              disabled={isCapturing}
              className="w-20 h-20 rounded-full border-4 border-white p-0 overflow-hidden"
              style={{
                backgroundColor: detection.confidence > 80 ? '#10B981' : '#FFD700',
              }}
            >
              {isCapturing ? (
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              ) : (
                <Camera className="w-8 h-8 text-white" />
              )}
            </Button>

            {/* Flip Camera */}
            <Button
              variant="ghost"
              size="lg"
              onClick={toggleCamera}
              className="text-white"
            >
              <RotateCw className="w-6 h-6" />
            </Button>
          </div>

          {/* Hints */}
          <div className="mt-4 text-center">
            <p className="text-white text-sm">
              {autoCapture
                ? 'Camera will auto-capture when aligned'
                : 'Tap capture button when ready'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMediaCaptureCamera;
