import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { 
  FileText, 
  User, 
  Package, 
  Shield, 
  Upload, 
  Camera, 
  CheckCircle2, 
  AlertCircle,
  Award,
  MapPin,
  Phone,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProducerDetails {
  name: string;
  contact: string;
  location: string;
  userId?: string;
}

interface CommodityDetails {
  commodityType: string;
  lotIds: string[];
  quantity: number;
  qualityGrade: string;
  lotData?: any;
}

interface AgentDetails {
  id: string;
  name: string;
  company: string;
  contact: string;
  location: string;
  commission: number;
  rating: number;
  verified: boolean;
}

interface AIAssessment {
  size: string;
  color: string;
  quality: string;
  fraudAlert: boolean;
  confidence: number;
  timestamp?: string;
}

interface CommissionAgentOrderFormProps {
  producerDetails: ProducerDetails;
  commodityDetails: CommodityDetails;
  agentDetails: AgentDetails;
  onConfirmOrder: (orderData: any) => void;
  onCancel: () => void;
}

export const CommissionAgentOrderForm: React.FC<CommissionAgentOrderFormProps> = ({
  producerDetails,
  commodityDetails,
  agentDetails,
  onConfirmOrder,
  onCancel,
}) => {
  // Form state
  const [serviceType, setServiceType] = useState<'direct' | 'representation' | ''>('');
  const [producerOtp, setProducerOtp] = useState('');
  const [agentOtp, setAgentOtp] = useState('');
  const [otpsSent, setOtpsSent] = useState(false);
  const [otpsVerified, setOtpsVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [digitalSignature, setDigitalSignature] = useState('');
  
  // Media upload state
  const [uploadedMedia, setUploadedMedia] = useState<File[]>([]);
  const [mediaPreview, setMediaPreview] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  
  // AI Assessment state
  const [aiAssessment, setAiAssessment] = useState<AIAssessment | null>(null);
  
  // Auto-fill location on mount
  useEffect(() => {
    // Simulate GPS location fetch if not provided
    if (!producerDetails.location) {
      toast.info('Auto-filling location from device GPS');
    }
  }, []);

  // Handle OTP sending
  const handleSendOTPs = () => {
    if (!serviceType) {
      toast.error('Please select a service type first');
      return;
    }
    
    setOtpsSent(true);
    toast.success('OTPs sent to both Producer and Agent');
    // Simulate OTP sent to both parties
  };

  // Handle OTP verification
  const handleVerifyOTPs = () => {
    if (!producerOtp || producerOtp.length !== 6) {
      toast.error('Please enter valid 6-digit Producer OTP');
      return;
    }
    if (!agentOtp || agentOtp.length !== 6) {
      toast.error('Please enter valid 6-digit Agent OTP');
      return;
    }

    // Simulate verification
    setOtpsVerified(true);
    toast.success('OTPs verified successfully!');
  };

  // Handle media upload
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setUploadedMedia([...uploadedMedia, ...fileArray]);

    // Create preview URLs
    const previews = fileArray.map(file => URL.createObjectURL(file));
    setMediaPreview([...mediaPreview, ...previews]);

    toast.success(`${fileArray.length} file(s) uploaded`);
  };

  // Handle AI analysis
  const handleAnalyzeMedia = () => {
    if (uploadedMedia.length === 0) {
      toast.error('Please upload photos or videos first');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate AI analysis with progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          // Set mock AI results
          setAiAssessment({
            size: 'Medium to Large grains (4.5-5.2mm)',
            color: 'Golden yellow - Premium quality',
            quality: `Grade ${commodityDetails.qualityGrade} confirmed`,
            fraudAlert: false,
            confidence: 94,
            timestamp: new Date().toISOString(),
          });
          
          toast.success('Grok AI analysis complete!');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Handle form submission
  const handleConfirmOrder = () => {
    // Validation
    if (!serviceType) {
      toast.error('Please select a service type');
      return;
    }
    if (!otpsVerified) {
      toast.error('Please verify OTPs before confirming');
      return;
    }
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    if (!digitalSignature) {
      toast.error('Please provide digital consent/signature');
      return;
    }

    // Compile order data
    const orderData = {
      producerDetails,
      commodityDetails,
      agentDetails,
      serviceType,
      otpVerification: {
        producerOtp,
        agentOtp,
        verified: otpsVerified,
        timestamp: new Date().toISOString(),
      },
      media: uploadedMedia.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
      aiAssessment,
      authorization: {
        termsAccepted,
        digitalSignature,
        timestamp: new Date().toISOString(),
      },
      orderId: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),
    };

    onConfirmOrder(orderData);
    toast.success('Order confirmed successfully!');
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8" style={{ color: '#FFD700' }} />
            <h1 style={{ color: '#003E6D' }}>Commission Agent Order Form</h1>
          </div>
          <p className="text-gray-600">Complete the form to engage {agentDetails.company}</p>
        </div>

        {/* Producer Details */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-6 h-6" style={{ color: '#003E6D' }} />
            <h2 style={{ color: '#003E6D' }}>Producer Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="producer-name">Name</Label>
              <Input
                id="producer-name"
                value={producerDetails.name}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="producer-contact">Contact</Label>
              <Input
                id="producer-contact"
                value={producerDetails.contact}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="producer-location">Location (auto-filled from app)</Label>
              <div className="flex gap-2">
                <Input
                  id="producer-location"
                  value={producerDetails.location}
                  disabled
                  className="bg-gray-50"
                />
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Commodity Details */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-6 h-6" style={{ color: '#003E6D' }} />
            <h2 style={{ color: '#003E6D' }}>Commodity Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="commodity-type">Commodity Type</Label>
              <Input
                id="commodity-type"
                value={commodityDetails.commodityType}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="lot-ids">Lot ID(s)</Label>
              <Input
                id="lot-ids"
                value={commodityDetails.lotIds.join(', ')}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity (kg)</Label>
              <Input
                id="quantity"
                value={commodityDetails.quantity}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="quality-grade">Quality Grade</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="quality-grade"
                  value={commodityDetails.qualityGrade}
                  disabled
                  className="bg-gray-50"
                />
                <Badge className="bg-green-500 text-white">
                  Grade {commodityDetails.qualityGrade}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Commission Agent Details */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6" style={{ color: '#FFD700' }} />
            <h2 style={{ color: '#003E6D' }}>Commission Agent Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Label>Agent Name</Label>
                {agentDetails.verified && (
                  <Badge className="bg-blue-500 text-white text-xs">Verified</Badge>
                )}
              </div>
              <p style={{ color: '#003E6D' }}>{agentDetails.name}</p>
              <p className="text-sm text-gray-600">{agentDetails.company}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <Label>Agent Contact</Label>
              <p style={{ color: '#003E6D' }}>{agentDetails.contact}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <Label>Agent Location</Label>
              <p style={{ color: '#003E6D' }}>{agentDetails.location}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <Label>Commission Rate</Label>
              <p style={{ color: '#FFD700' }}>{agentDetails.commission}%</p>
            </div>
          </div>
        </Card>

        {/* Services to Engage */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <h3 className="mb-4" style={{ color: '#003E6D' }}>Services to Engage</h3>
          <p className="text-sm text-gray-600 mb-4">Select one service type:</p>

          <div className="space-y-3">
            <div
              onClick={() => setServiceType('direct')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                serviceType === 'direct'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Checkbox checked={serviceType === 'direct'} />
                <div className="flex-1">
                  <p style={{ color: '#003E6D' }}>Direct Sale Assistance</p>
                  <p className="text-sm text-gray-600">
                    Agent helps you find buyers and negotiate, but you handle the final transaction
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setServiceType('representation')}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                serviceType === 'representation'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Checkbox checked={serviceType === 'representation'} />
                <div className="flex-1">
                  <p style={{ color: '#003E6D' }}>Representation for Sale</p>
                  <p className="text-sm text-gray-600">
                    Agent fully represents you in sale, handles all negotiations and transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Order Confirmation with OTP */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6" style={{ color: '#003E6D' }} />
            <h3 style={{ color: '#003E6D' }}>Order Confirmation</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Confirm engagement by exchanging OTPs between Producer and Agent
          </p>

          {!otpsSent ? (
            <div className="bg-yellow-50 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800 mb-1">OTP Verification Required</p>
                  <p className="text-sm text-yellow-700">
                    Both Producer and Agent will receive OTPs to their registered mobile numbers
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm text-green-800 mb-1">OTPs Sent Successfully</p>
                  <p className="text-sm text-green-700">
                    Please enter the 6-digit codes received by both parties
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="producer-otp">Producer OTP</Label>
              <Input
                id="producer-otp"
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={producerOtp}
                onChange={(e) => setProducerOtp(e.target.value.replace(/\D/g, ''))}
                disabled={!otpsSent || otpsVerified}
                className="text-center text-lg tracking-widest"
              />
            </div>
            <div>
              <Label htmlFor="agent-otp">Agent OTP</Label>
              <Input
                id="agent-otp"
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={agentOtp}
                onChange={(e) => setAgentOtp(e.target.value.replace(/\D/g, ''))}
                disabled={!otpsSent || otpsVerified}
                className="text-center text-lg tracking-widest"
              />
            </div>
          </div>

          <div className="flex gap-3">
            {!otpsSent ? (
              <Button
                onClick={handleSendOTPs}
                disabled={!serviceType}
                className="text-white"
                style={{ backgroundColor: '#003E6D' }}
              >
                Send OTPs
              </Button>
            ) : !otpsVerified ? (
              <Button
                onClick={handleVerifyOTPs}
                disabled={producerOtp.length !== 6 || agentOtp.length !== 6}
                className="text-white"
                style={{ backgroundColor: '#FFD700' }}
              >
                Verify OTPs
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span>OTPs Verified Successfully</span>
              </div>
            )}
          </div>
        </Card>

        {/* Documentation and Media */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-6 h-6" style={{ color: '#FFD700' }} />
            <h3 style={{ color: '#003E6D' }}>Documentation and Media</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Upload photos & videos of commodity for Grok AI analysis
          </p>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            <input
              type="file"
              id="media-upload"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaUpload}
              className="hidden"
            />
            <label htmlFor="media-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-600 mb-1">Upload Photos & Videos</p>
              <p className="text-sm text-gray-400">Click to browse or drag and drop</p>
            </label>
          </div>

          {/* Media Preview */}
          {mediaPreview.length > 0 && (
            <div className="mb-4">
              <Label className="mb-2 block">Uploaded Media ({uploadedMedia.length} files)</Label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {mediaPreview.map((preview, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                    <img src={preview} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 bg-white rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Analysis Button */}
          {uploadedMedia.length > 0 && !aiAssessment && (
            <Button
              onClick={handleAnalyzeMedia}
              disabled={isAnalyzing}
              className="w-full text-white"
              style={{ backgroundColor: '#FFD700' }}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing... {analysisProgress}%
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Start Grok AI Analysis
                </>
              )}
            </Button>
          )}

          {/* Analysis Progress */}
          {isAnalyzing && (
            <div className="mt-4">
              <Progress value={analysisProgress} className="h-3" />
            </div>
          )}
        </Card>

        {/* AI Assessment Summary */}
        {aiAssessment && (
          <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg border-2" style={{ borderColor: '#FFD700' }}>
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon className="w-6 h-6" style={{ color: '#FFD700' }} />
              <h3 style={{ color: '#003E6D' }}>AI Assessment Summary (auto-populated)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <Label>Size</Label>
                <p style={{ color: '#003E6D' }}>{aiAssessment.size}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Label>Color</Label>
                <p style={{ color: '#003E6D' }}>{aiAssessment.color}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Label>Quality</Label>
                <p style={{ color: '#003E6D' }}>{aiAssessment.quality}</p>
              </div>
              <div className={`rounded-lg p-4 ${aiAssessment.fraudAlert ? 'bg-red-50' : 'bg-green-50'}`}>
                <Label>Fraud/Anomaly Alert</Label>
                <div className="flex items-center gap-2 mt-1">
                  {aiAssessment.fraudAlert ? (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-900">Yes - Review Required</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-green-900">No - All Clear</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>AI Confidence Score</Label>
                  <p className="text-2xl" style={{ color: '#003E6D' }}>{aiAssessment.confidence}%</p>
                </div>
                <Badge className="bg-green-500 text-white">Verified by Grok AI</Badge>
              </div>
            </div>
          </Card>
        )}

        {/* Authorization */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <h3 style={{ color: '#003E6D' }}>Authorization</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                I authorize {agentDetails.company} (represented by {agentDetails.name}) to act on my behalf for the above engagement.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                I agree to the terms and conditions, including the {agentDetails.commission}% commission rate on successful sale
              </label>
            </div>

            <div>
              <Label htmlFor="signature">Signature or Digital Consent *</Label>
              <Input
                id="signature"
                placeholder="Type your full name as digital signature"
                value={digitalSignature}
                onChange={(e) => setDigitalSignature(e.target.value)}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <Label>Date</Label>
              <p style={{ color: '#003E6D' }}>
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handleConfirmOrder}
            disabled={!otpsVerified || !termsAccepted || !digitalSignature}
            className="flex-1 text-white text-lg py-6"
            style={{ backgroundColor: '#FFD700' }}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Confirm Order
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="px-8 py-6"
          >
            Cancel
          </Button>
        </div>

        {/* Status Summary */}
        <Card className="p-4 mt-6 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${serviceType ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-gray-600">Service Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${otpsVerified ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-gray-600">OTPs Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${aiAssessment ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-gray-600">AI Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${termsAccepted && digitalSignature ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-gray-600">Authorization</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
