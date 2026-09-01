import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Loader2, 
  Eye,
  Sparkles,
  Shield,
  FileText,
  Zap
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { AIMediaCaptureCamera, CapturedImage } from '../producer-dashboard/AIMediaCaptureCamera';
import { GrokAIService, GrokVerification } from '../producer-dashboard/GrokAIService';
import { DocumentRequirement } from './RegionalDocumentRequirements';

interface AIDocumentVerificationProps {
  document: DocumentRequirement;
  onVerificationComplete: (result: VerificationResult) => void;
  onSkip?: () => void;
}

export interface VerificationResult {
  documentId: string;
  verified: boolean;
  confidence: number;
  aiAnalysis: GrokVerification;
  imageData: CapturedImage | null;
  uploadedFile?: File;
  verificationTime: number;
  issues: string[];
  extractedData?: Record<string, any>;
}

type VerificationStatus = 'idle' | 'capturing' | 'analyzing' | 'verified' | 'failed';

export const AIDocumentVerification: React.FC<AIDocumentVerificationProps> = ({
  document,
  onVerificationComplete,
  onSkip,
}) => {
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [aiResult, setAiResult] = useState<GrokVerification | null>(null);
  const [extractedData, setExtractedData] = useState<Record<string, any> | null>(null);

  const grokService = GrokAIService.getInstance();

  // Simulate AI document verification
  const performAIVerification = async (imageData: CapturedImage | null, file: File | null) => {
    setStatus('analyzing');
    setVerificationProgress(0);
    
    const startTime = Date.now();

    // Simulate progressive analysis
    const steps = [
      { progress: 20, delay: 300, message: 'Analyzing document type...' },
      { progress: 40, delay: 500, message: 'Extracting text and data...' },
      { progress: 60, delay: 600, message: 'Verifying authenticity...' },
      { progress: 80, delay: 400, message: 'Checking for tampering...' },
      { progress: 100, delay: 300, message: 'Finalizing verification...' },
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setVerificationProgress(step.progress);
    }

    // Simulate AI analysis results
    const confidence = 75 + Math.random() * 20; // 75-95%
    const verified = confidence >= 80;
    
    const issues: string[] = [];
    if (confidence < 90) {
      issues.push('Document quality could be improved');
    }
    if (!verified) {
      issues.push('Unable to verify all security features');
      issues.push('Please ensure document is clearly visible');
    }

    const verification: GrokVerification = {
      verified,
      confidence,
      seal: verified ? 'verified' : confidence > 70 ? 'warning' : 'failed',
      issues,
      timestamp: new Date(),
    };

    // Simulate data extraction based on document type
    const extracted = simulateDataExtraction(document.id, verified);
    
    setAiResult(verification);
    setExtractedData(extracted);
    setStatus(verified ? 'verified' : 'failed');

    const result: VerificationResult = {
      documentId: document.id,
      verified,
      confidence,
      aiAnalysis: verification,
      imageData,
      uploadedFile: file || undefined,
      verificationTime: Date.now() - startTime,
      issues,
      extractedData: extracted,
    };

    // Wait a bit to show results before completing
    setTimeout(() => {
      onVerificationComplete(result);
    }, 2000);
  };

  const simulateDataExtraction = (documentId: string, success: boolean): Record<string, any> | undefined => {
    if (!success) return undefined;

    const extractions: Record<string, Record<string, any>> = {
      national_id: {
        documentNumber: 'XXXX-XXXX-' + Math.floor(Math.random() * 10000),
        name: 'Sample Name',
        dateOfBirth: '01/01/1990',
        expiryDate: '01/01/2030',
      },
      pan_card: {
        panNumber: 'ABCDE1234F',
        name: 'Sample Name',
        fatherName: 'Sample Father Name',
      },
      gst_certificate: {
        gstin: '29ABCDE1234F1Z5',
        businessName: 'Sample Business Pvt Ltd',
        registrationDate: '01/01/2020',
      },
      address_proof: {
        address: '123 Sample Street, Sample City - 123456',
        accountHolder: 'Sample Name',
        billDate: new Date().toLocaleDateString(),
      },
      bank_statement: {
        accountNumber: 'XXXX-XXXX-' + Math.floor(Math.random() * 10000),
        ifscCode: 'SBIN0001234',
        accountHolder: 'Sample Name',
        bankName: 'Sample Bank',
      },
    };

    return extractions[documentId] || { status: 'Data extracted successfully' };
  };

  const handleCameraCapture = async (image: CapturedImage) => {
    setCapturedImage(image);
    setShowCamera(false);
    await performAIVerification(image, null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      const isValidFormat = document.acceptedFormats.some(format => file.type === format);
      const isValidSize = file.size <= document.maxSize * 1024 * 1024;

      if (!isValidFormat) {
        alert(`Invalid format. Accepted: ${document.acceptedFormats.join(', ')}`);
        return;
      }

      if (!isValidSize) {
        alert(`File too large. Max size: ${document.maxSize}MB`);
        return;
      }

      setUploadedFile(file);
      
      // Create image data from file
      const reader = new FileReader();
      reader.onload = async (event) => {
        const img = new Image();
        img.onload = async () => {
          const capturedData: CapturedImage = {
            blob: file,
            dataUrl: event.target?.result as string,
            width: img.width,
            height: img.height,
            timestamp: Date.now(),
          };
          setCapturedImage(capturedData);
          await performAIVerification(capturedData, file);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'verified': return '#27AE60';
      case 'failed': return '#E74C3C';
      case 'analyzing': return '#FFD700';
      default: return '#5A6B7A';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'verified': return <CheckCircle2 className="w-6 h-6" />;
      case 'failed': return <XCircle className="w-6 h-6" />;
      case 'analyzing': return <Loader2 className="w-6 h-6 animate-spin" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

  if (showCamera) {
    return (
      <AIMediaCaptureCamera
        mode="document"
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
        autoCapture={true}
        showConfidence={true}
        guidanceOverlay={true}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 
              className="mb-1"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#003E6D'
              }}
            >
              {document.name}
            </h2>
            <p 
              style={{
                fontFamily: 'Lato, sans-serif',
                color: '#5A6B7A',
                fontSize: '0.875rem',
              }}
            >
              {document.description}
            </p>
          </div>
          
          {document.aiVerification && (
            <Badge 
              className="px-3 py-1.5"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
                color: '#003E6D',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              <Sparkles className="w-3 h-3 mr-1 inline-block" />
              AI Powered
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Badge 
            variant={document.mandatory ? "destructive" : "secondary"}
            className="text-xs"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {document.mandatory ? 'REQUIRED' : 'OPTIONAL'}
          </Badge>
          <span style={{ fontFamily: 'Lato, sans-serif', color: '#8B9AA8', fontSize: '0.75rem' }}>
            Max {document.maxSize}MB • {document.acceptedFormats.map(f => f.split('/')[1]).join(', ').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Upload Options */}
      {status === 'idle' && !capturedImage && (
        <Card className="p-8 text-center" style={{ borderRadius: '24px', border: '2px dashed rgba(0,62,109,0.2)' }}>
          <div 
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #D9F2FF 0%, #E8F4FC 100%)' }}
          >
            <FileText className="w-10 h-10" style={{ color: '#003E6D' }} />
          </div>

          <h3 
            className="mb-2"
            style={{
              fontFamily: 'Poppins, sans-serif',
              color: '#003E6D',
            }}
          >
            Upload {document.name}
          </h3>

          <p 
            className="mb-6"
            style={{
              fontFamily: 'Lato, sans-serif',
              color: '#5A6B7A',
              fontSize: '0.875rem',
            }}
          >
            {document.aiVerification 
              ? 'Capture or upload your document for AI-powered verification'
              : 'Capture or upload your document for manual review'
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowCamera(true)}
              className="gap-2"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
                color: '#003E6D',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.5px',
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
              }}
            >
              <Camera className="w-5 h-5" />
              Capture with Camera
            </Button>

            <label>
              <input
                type="file"
                accept={document.acceptedFormats.join(',')}
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                className="gap-2 w-full"
                style={{
                  border: '2px solid #FFD700',
                  color: '#003E6D',
                  background: 'transparent',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  (e.currentTarget.previousElementSibling as HTMLInputElement)?.click();
                }}
              >
                <Upload className="w-5 h-5" />
                Upload File
              </Button>
            </label>
          </div>

          {!document.mandatory && onSkip && (
            <Button
              variant="ghost"
              onClick={onSkip}
              className="mt-4"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                color: '#5A6B7A',
              }}
            >
              Skip for now
            </Button>
          )}
        </Card>
      )}

      {/* Processing State */}
      {status === 'analyzing' && (
        <Card 
          className="p-8"
          style={{ 
            borderRadius: '24px',
            border: '2px solid rgba(255,215,0,0.3)',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFEF0 100%)',
          }}
        >
          <div className="text-center">
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
              }}
            >
              <Loader2 className="w-10 h-10 animate-spin" style={{ color: '#003E6D' }} />
            </div>

            <h3 
              className="mb-2"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#003E6D',
              }}
            >
              AI Verification in Progress
            </h3>

            <p 
              className="mb-6"
              style={{
                fontFamily: 'Lato, sans-serif',
                color: '#5A6B7A',
                fontSize: '0.875rem',
              }}
            >
              Analyzing document with advanced AI technology...
            </p>

            <Progress value={verificationProgress} className="mb-2" />
            <p 
              className="text-center"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                color: '#003E6D',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              {verificationProgress}%
            </p>
          </div>
        </Card>
      )}

      {/* Verification Result */}
      {(status === 'verified' || status === 'failed') && aiResult && (
        <div className="space-y-6">
          {/* Preview */}
          {capturedImage && (
            <Card className="p-4" style={{ borderRadius: '16px' }}>
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4" style={{ color: '#5A6B7A' }} />
                <span style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D', fontSize: '0.875rem', fontWeight: 600 }}>
                  Document Preview
                </span>
              </div>
              <img 
                src={capturedImage.dataUrl} 
                alt="Document preview"
                className="w-full rounded-lg"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            </Card>
          )}

          {/* Result Card */}
          <Card 
            className="p-6"
            style={{ 
              borderRadius: '24px',
              border: `2px solid ${status === 'verified' ? 'rgba(39,174,96,0.3)' : 'rgba(231,76,60,0.3)'}`,
              background: status === 'verified' 
                ? 'linear-gradient(135deg, #FFFFFF 0%, #F0FFF4 100%)'
                : 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)',
            }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ 
                  background: status === 'verified' 
                    ? 'linear-gradient(135deg, #27AE60 0%, #6FCF97 100%)'
                    : 'linear-gradient(135deg, #E74C3C 0%, #EB5757 100%)',
                  color: 'white',
                }}
              >
                {getStatusIcon()}
              </div>

              <div className="flex-1">
                <h3 
                  className="mb-2"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    color: status === 'verified' ? '#27AE60' : '#E74C3C',
                  }}
                >
                  {status === 'verified' ? 'Verification Successful' : 'Verification Failed'}
                </h3>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ fontFamily: 'Montserrat, sans-serif', color: '#5A6B7A', fontSize: '0.875rem' }}>
                      Confidence Score
                    </span>
                    <span 
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        color: '#003E6D',
                        fontWeight: 600,
                      }}
                    >
                      {Math.round(aiResult.confidence)}%
                    </span>
                  </div>
                  <Progress value={aiResult.confidence} />
                </div>

                {aiResult.issues.length > 0 && (
                  <div className="space-y-2">
                    {aiResult.issues.map((issue, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#E2B93B' }} />
                        <p style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '0.8125rem' }}>
                          {issue}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {extractedData && (
                  <div className="mt-4 p-4 rounded-lg" style={{ background: 'rgba(0,62,109,0.05)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-4 h-4" style={{ color: '#FFD700' }} />
                      <span 
                        style={{ 
                          fontFamily: 'Montserrat, sans-serif', 
                          color: '#003E6D',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        }}
                      >
                        Extracted Data
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(extractedData).map(([key, value]) => (
                        <div key={key}>
                          <span 
                            className="block"
                            style={{ 
                              fontFamily: 'Lato, sans-serif', 
                              color: '#8B9AA8', 
                              fontSize: '0.75rem',
                              textTransform: 'capitalize',
                            }}
                          >
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span 
                            className="block"
                            style={{ 
                              fontFamily: 'Montserrat, sans-serif', 
                              color: '#003E6D',
                              fontSize: '0.875rem',
                              fontWeight: 500,
                            }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIDocumentVerification;
