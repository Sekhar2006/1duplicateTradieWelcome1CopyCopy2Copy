import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode,
  Camera,
  Upload,
  Download,
  Share2,
  FileText,
  Package,
  Shield,
  CheckCircle2,
  Star,
  Award,
  Calendar,
  Hash,
  MapPin,
  User,
  TrendingUp,
  Info,
  X,
  ChevronRight,
  ExternalLink,
  ClipboardCheck,
  BarChart3
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { toast } from 'sonner';
import { copyToClipboard } from '../ui/clipboard-utils';

// Types
interface TokenData {
  tokenId: string;
  commodityType: string;
  varietyName: string;
  qualityGrade: string;
  numberOfBags: number;
  harvestDate: string;
  processingDate: string;
  packingDate: string;
  producerName: string;
  producerLocation: string;
  harvestMethod: {
    labor: boolean;
    machinery: boolean;
  };
  qualityTier: {
    selfAssessment: boolean;
    externalAssessment: string;
    verifierName?: string;
    rating?: number;
    comments?: string;
  };
  salesChannel: {
    atCultivation: boolean;
    commissionAgent: boolean;
    agentRating?: number;
    marketYardRating?: number;
  };
  certifications: Array<{
    type: string;
    issuer: string;
    date: string;
    status: string;
  }>;
  complianceScore: number;
  generatedAt: string;
}

interface QualityTokenScannerProps {
  standalone?: boolean;
  onClose?: () => void;
}

const QualityTokenScanner: React.FC<QualityTokenScannerProps> = ({ 
  standalone = true, 
  onClose 
}) => {
  const [scanMode, setScanMode] = useState<'camera' | 'upload' | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedToken, setScannedToken] = useState<TokenData | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock database of tokens (in real app, this would be API call)
  const mockTokenDatabase: Record<string, TokenData> = {
    'TRD-VEG-123456': {
      tokenId: 'TRD-VEG-123456',
      commodityType: 'Vegetables',
      varietyName: 'Guntur Sannam Chili',
      qualityGrade: 'premium',
      numberOfBags: 50,
      harvestDate: '2025-10-15',
      processingDate: '2025-10-18',
      packingDate: '2025-10-20',
      producerName: 'Rajesh Kumar',
      producerLocation: 'Guntur, Andhra Pradesh',
      harvestMethod: {
        labor: true,
        machinery: false
      },
      qualityTier: {
        selfAssessment: true,
        externalAssessment: 'third-party',
        verifierName: 'SGS Verification & Testing',
        rating: 5,
        comments: 'Premium quality with excellent color and size consistency. No defects detected.'
      },
      salesChannel: {
        atCultivation: true,
        commissionAgent: false,
        marketYardRating: 4.8
      },
      certifications: [
        {
          type: 'Third-Party Verification',
          issuer: 'SGS Verification & Testing',
          date: '2025-10-19',
          status: 'Verified'
        },
        {
          type: 'APEDA Certification',
          issuer: 'APEDA - District Office',
          date: '2025-10-19',
          status: 'Active'
        }
      ],
      complianceScore: 95,
      generatedAt: '2025-10-20T14:30:00Z'
    },
    'TRD-FRU-789012': {
      tokenId: 'TRD-FRU-789012',
      commodityType: 'Fruits',
      varietyName: 'Alphonso Mango',
      qualityGrade: 'grade-a',
      numberOfBags: 30,
      harvestDate: '2025-10-10',
      processingDate: '2025-10-12',
      packingDate: '2025-10-14',
      producerName: 'Priya Sharma',
      producerLocation: 'Ratnagiri, Maharashtra',
      harvestMethod: {
        labor: true,
        machinery: false
      },
      qualityTier: {
        selfAssessment: true,
        externalAssessment: 'lab',
        verifierName: 'NABL Accredited Lab - Mumbai',
        rating: 4,
        comments: 'Good quality with minor size variations. Pesticide residue within limits.'
      },
      salesChannel: {
        atCultivation: false,
        commissionAgent: true,
        agentRating: 4,
        marketYardRating: 4.5
      },
      certifications: [
        {
          type: 'Lab Report',
          issuer: 'NABL Accredited Lab',
          date: '2025-10-13',
          status: 'Verified'
        }
      ],
      complianceScore: 85,
      generatedAt: '2025-10-14T10:15:00Z'
    }
  };

  const qualityGradeInfo: Record<string, { label: string; color: string; bgColor: string }> = {
    'premium': { label: 'Premium (A+)', color: 'text-green-700', bgColor: 'bg-green-100 border-green-500' },
    'grade-a': { label: 'Grade A', color: 'text-green-600', bgColor: 'bg-green-50 border-green-400' },
    'grade-b': { label: 'Grade B', color: 'text-yellow-600', bgColor: 'bg-yellow-50 border-yellow-400' },
    'grade-c': { label: 'Grade C', color: 'text-orange-600', bgColor: 'bg-orange-50 border-orange-400' },
    'grade-d': { label: 'Grade D', color: 'text-red-600', bgColor: 'bg-red-50 border-red-400' }
  };

  // Handle camera scan
  const handleCameraScan = () => {
    setScanMode('camera');
    setIsScanning(true);
    
    // Simulate camera scanning
    setTimeout(() => {
      // Randomly pick a token for demo
      const tokenId = Math.random() > 0.5 ? 'TRD-VEG-123456' : 'TRD-FRU-789012';
      const token = mockTokenDatabase[tokenId];
      
      setScannedToken(token);
      setIsScanning(false);
      setScanMode(null);
      toast.success('QR Code scanned successfully!', {
        description: `Token ${token.tokenId} retrieved`
      });
    }, 2500);
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setScanMode('upload');
    setIsScanning(true);

    // Simulate QR code processing from image
    setTimeout(() => {
      const tokenId = 'TRD-VEG-123456'; // In real app, would decode QR from image
      const token = mockTokenDatabase[tokenId];
      
      setScannedToken(token);
      setIsScanning(false);
      setScanMode(null);
      toast.success('QR Code processed successfully!', {
        description: `Token ${token.tokenId} retrieved`
      });
    }, 2000);
  };

  // Handle manual token entry
  const handleManualEntry = (tokenId: string) => {
    const token = mockTokenDatabase[tokenId];
    if (token) {
      setScannedToken(token);
      toast.success('Token found!', {
        description: `Token ${tokenId} retrieved`
      });
    } else {
      toast.error('Token not found', {
        description: 'Please check the token ID and try again'
      });
    }
  };

  // Generate PDF report
  const handleDownloadReport = () => {
    if (!scannedToken) return;
    
    toast.success('Downloading quality report...', {
      description: 'PDF report will be downloaded shortly'
    });
    
    // In real app, would generate and download PDF
    setTimeout(() => {
      toast.success('Report downloaded', {
        description: `${scannedToken.tokenId}_quality_report.pdf`
      });
    }, 1500);
  };

  // Share token details
  const handleShare = () => {
    if (!scannedToken) return;
    
    const shareText = `Quality Token: ${scannedToken.tokenId}\nCommodity: ${scannedToken.commodityType} - ${scannedToken.varietyName}\nGrade: ${qualityGradeInfo[scannedToken.qualityGrade].label}\nCompliance: ${scannedToken.complianceScore}%`;
    
    copyToClipboard(shareText, {
      successMessage: 'Token details copied to clipboard!',
      fallbackMessage: shareText
    });
  };

  // Get compliance status
  const getComplianceStatus = (score: number) => {
    if (score >= 90) return { color: 'bg-green-500', text: 'Excellent', icon: CheckCircle2 };
    if (score >= 75) return { color: 'bg-blue-500', text: 'Good', icon: CheckCircle2 };
    if (score >= 60) return { color: 'bg-yellow-500', text: 'Fair', icon: Info };
    return { color: 'bg-red-500', text: 'Needs Review', icon: Info };
  };

  const renderScanInterface = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFD700]/20 mb-4">
          <QrCode className="w-10 h-10 text-[#003E6D]" />
        </div>
        <h2 className="text-2xl text-[#003E6D] mb-2">
          Scan Quality Token
        </h2>
        <p className="text-gray-600">
          Scan QR code to view complete quality verification details
        </p>
      </div>

      {/* Scanning Animation */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-8 bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 rounded-xl border-2 border-[#FFD700] text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-4"
            >
              {scanMode === 'camera' ? (
                <Camera className="w-16 h-16 text-[#FFD700]" />
              ) : (
                <Upload className="w-16 h-16 text-[#FFD700]" />
              )}
            </motion.div>
            <p className="text-lg text-[#003E6D]">
              {scanMode === 'camera' ? 'Scanning QR Code...' : 'Processing image...'}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Please wait while we retrieve token details
            </p>
            <Progress value={66} className="mt-4 h-2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scan Options */}
      {!isScanning && !scannedToken && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className="p-6 cursor-pointer hover:border-[#FFD700] hover:shadow-lg transition-all group"
            onClick={handleCameraScan}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 group-hover:bg-[#FFD700]/20 transition-colors">
                <Camera className="w-8 h-8 text-blue-600 group-hover:text-[#003E6D]" />
              </div>
              <h3 className="text-lg text-[#003E6D] mb-2">
                Camera Scan
              </h3>
              <p className="text-sm text-gray-600">
                Use device camera to scan QR code
              </p>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:border-[#FFD700] hover:shadow-lg transition-all group"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4 group-hover:bg-[#FFD700]/20 transition-colors">
                <Upload className="w-8 h-8 text-purple-600 group-hover:text-[#003E6D]" />
              </div>
              <h3 className="text-lg text-[#003E6D] mb-2">
                Upload Image
              </h3>
              <p className="text-sm text-gray-600">
                Upload QR code image from device
              </p>
            </div>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </Card>
        </div>
      )}

      {/* Manual Entry */}
      {!isScanning && !scannedToken && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#F7FAFC] px-2 text-gray-500">Or enter manually</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Enter Token ID (e.g., TRD-VEG-123456)"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleManualEntry((e.target as HTMLInputElement).value);
                }
              }}
            />
            <Button
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                handleManualEntry(input.value);
              }}
              className="bg-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/90"
            >
              Search
            </Button>
          </div>
        </>
      )}
    </div>
  );

  const renderTokenDetails = () => {
    if (!scannedToken) return null;

    const gradeInfo = qualityGradeInfo[scannedToken.qualityGrade];
    const complianceStatus = getComplianceStatus(scannedToken.complianceScore);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header with Token ID */}
        <Card className="p-6 bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/10 border-2 border-[#FFD700]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center">
                <Hash className="w-6 h-6 text-[#003E6D]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Token ID</p>
                <code className="text-lg font-mono text-[#003E6D]">
                  {scannedToken.tokenId}
                </code>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(scannedToken.tokenId, {
                successMessage: 'Token ID copied!'
              })}
            >
              Copy
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={`${gradeInfo.bgColor} ${gradeInfo.color} border-2`}>
              <Award className="w-3 h-3 mr-1" />
              {gradeInfo.label}
            </Badge>
            <Badge className={`${complianceStatus.color} text-white border-0`}>
              <complianceStatus.icon className="w-3 h-3 mr-1" />
              {complianceStatus.text} - {scannedToken.complianceScore}%
            </Badge>
          </div>
        </Card>

        {/* Tabbed Details */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="certs">Certificates</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card className="p-6 bg-white/90">
              <h3 className="flex items-center gap-2 text-lg text-[#003E6D] mb-4">
                <Package className="w-5 h-5" />
                Commodity Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600 text-sm">Commodity Type</Label>
                  <p className="text-[#003E6D]">{scannedToken.commodityType}</p>
                </div>
                <div>
                  <Label className="text-gray-600 text-sm">Variety</Label>
                  <p className="text-[#003E6D]">{scannedToken.varietyName}</p>
                </div>
                <div>
                  <Label className="text-gray-600 text-sm">Number of Bags</Label>
                  <p className="text-[#003E6D]">{scannedToken.numberOfBags} units</p>
                </div>
                <div>
                  <Label className="text-gray-600 text-sm">Quality Grade</Label>
                  <Badge className={gradeInfo.bgColor + ' ' + gradeInfo.color}>
                    {gradeInfo.label}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/90">
              <h3 className="flex items-center gap-2 text-lg text-[#003E6D] mb-4">
                <Calendar className="w-5 h-5" />
                Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm">Harvest Date</span>
                  </div>
                  <span className="text-sm font-medium text-[#003E6D]">
                    {new Date(scannedToken.harvestDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm">Processing Date</span>
                  </div>
                  <span className="text-sm font-medium text-[#003E6D]">
                    {new Date(scannedToken.processingDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
                    <span className="text-sm">Packing Date</span>
                  </div>
                  <span className="text-sm font-medium text-[#003E6D]">
                    {new Date(scannedToken.packingDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/90">
              <h3 className="flex items-center gap-2 text-lg text-[#003E6D] mb-4">
                <User className="w-5 h-5" />
                Producer Details
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Name</span>
                  <span className="text-sm font-medium text-[#003E6D]">
                    {scannedToken.producerName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Location</span>
                  <span className="text-sm font-medium text-[#003E6D] flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {scannedToken.producerLocation}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Harvest Method</span>
                  <div className="flex gap-2">
                    {scannedToken.harvestMethod.labor && (
                      <Badge variant="outline" className="text-xs">Labor</Badge>
                    )}
                    {scannedToken.harvestMethod.machinery && (
                      <Badge variant="outline" className="text-xs">Machinery</Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Quality Tab */}
          <TabsContent value="quality" className="space-y-4">
            <Card className="p-6 bg-white/90">
              <h3 className="flex items-center gap-2 text-lg text-[#003E6D] mb-4">
                <Shield className="w-5 h-5" />
                Quality Verification
              </h3>
              
              <div className="space-y-4">
                {/* Tier 1: Self-Assessment */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                        1
                      </div>
                      <span className="font-medium text-[#003E6D]">Self-Assessment</span>
                    </div>
                    {scannedToken.qualityTier.selfAssessment && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 ml-8">
                    Producer's quality evaluation completed
                  </p>
                </div>

                {/* Tier 2: External Assessment */}
                {scannedToken.qualityTier.externalAssessment !== 'none' && (
                  <div className="p-4 bg-[#FFD700]/10 rounded-lg border-2 border-[#FFD700]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#FFD700] text-[#003E6D] flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <span className="font-medium text-[#003E6D]">External Verification</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-500">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    
                    <div className="ml-8 space-y-3 mt-3">
                      <div>
                        <Label className="text-gray-600 text-xs">Verification Type</Label>
                        <p className="text-sm text-[#003E6D] capitalize">
                          {scannedToken.qualityTier.externalAssessment}
                        </p>
                      </div>
                      
                      {scannedToken.qualityTier.verifierName && (
                        <div>
                          <Label className="text-gray-600 text-xs">Verified By</Label>
                          <p className="text-sm text-[#003E6D] flex items-center gap-1">
                            <Award className="w-4 h-4 text-[#FFD700]" />
                            {scannedToken.qualityTier.verifierName}
                          </p>
                        </div>
                      )}
                      
                      {scannedToken.qualityTier.rating && (
                        <div>
                          <Label className="text-gray-600 text-xs">Quality Rating</Label>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= scannedToken.qualityTier.rating!
                                    ? 'fill-[#FFD700] text-[#FFD700]'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                              {scannedToken.qualityTier.rating}/5
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {scannedToken.qualityTier.comments && (
                        <div>
                          <Label className="text-gray-600 text-xs">Comments</Label>
                          <p className="text-sm text-gray-700 bg-white p-2 rounded mt-1">
                            {scannedToken.qualityTier.comments}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Compliance Score */}
            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg text-[#003E6D] mb-1">Compliance Score</h3>
                  <p className="text-sm text-gray-600">Overall quality compliance rating</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl text-green-600">
                    {scannedToken.complianceScore}%
                  </div>
                  <Badge className={`${complianceStatus.color} text-white mt-2`}>
                    {complianceStatus.text}
                  </Badge>
                </div>
              </div>
              <Progress 
                value={scannedToken.complianceScore} 
                className="mt-4 h-3"
              />
            </Card>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-4">
            <Card className="p-6 bg-white/90">
              <h3 className="flex items-center gap-2 text-lg text-[#003E6D] mb-4">
                <TrendingUp className="w-5 h-5" />
                Sales Channels
              </h3>
              
              <div className="space-y-3">
                {scannedToken.salesChannel.atCultivation && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-[#003E6D]">Place of Cultivation</p>
                          <p className="text-xs text-gray-600">Direct farm sale</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                  </div>
                )}

                {scannedToken.salesChannel.commissionAgent && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-[#003E6D]">Commission Agent</p>
                          <p className="text-xs text-gray-600">Agent-assisted sale</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                    </div>
                    
                    {scannedToken.salesChannel.agentRating && (
                      <div className="ml-8">
                        <Label className="text-gray-600 text-xs">Agent Rating</Label>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= scannedToken.salesChannel.agentRating!
                                  ? 'fill-[#FFD700] text-[#FFD700]'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {scannedToken.salesChannel.marketYardRating && (
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-[#003E6D]">Market Yard Rating</p>
                          <p className="text-xs text-gray-600">Average buyer rating</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                          <span className="text-lg font-semibold text-[#003E6D]">
                            {scannedToken.salesChannel.marketYardRating}
                          </span>
                          <span className="text-sm text-gray-600">/5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certs" className="space-y-4">
            <Card className="p-6 bg-white/90">
              <h3 className="flex items-center gap-2 text-lg text-[#003E6D] mb-4">
                <Award className="w-5 h-5" />
                Certifications & Documents
              </h3>
              
              {scannedToken.certifications.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No certifications available
                </p>
              ) : (
                <div className="space-y-3">
                  {scannedToken.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gradient-to-r from-green-50 to-white rounded-lg border-2 border-green-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-[#003E6D]">{cert.type}</p>
                            <p className="text-xs text-gray-600">{cert.issuer}</p>
                          </div>
                        </div>
                        <Badge 
                          className={
                            cert.status === 'Verified' 
                              ? 'bg-green-100 text-green-700 border-green-500'
                              : 'bg-yellow-100 text-yellow-700 border-yellow-500'
                          }
                        >
                          {cert.status}
                        </Badge>
                      </div>
                      <div className="ml-13 flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          Issued: {new Date(cert.date).toLocaleDateString()}
                        </span>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleDownloadReport}
            className="bg-[#003E6D] text-white hover:bg-[#003E6D]/90"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button
            onClick={handleShare}
            className="bg-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/90"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Details
          </Button>
        </div>

        {/* Scan Another */}
        <Button
          onClick={() => {
            setScannedToken(null);
            setScanMode(null);
          }}
          variant="outline"
          className="w-full"
        >
          <QrCode className="w-4 h-4 mr-2" />
          Scan Another Token
        </Button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7FAFC] to-[#D9F2FF] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[#003E6D] mb-2">
                Quality Token Scanner
              </h1>
              <p className="text-gray-600">
                Scan QR codes to view complete quality verification details
              </p>
            </div>
            {onClose && standalone && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Info Banner */}
          {!scannedToken && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-900">
                    <strong>How it works:</strong> Each quality-verified commodity batch has a unique token ID and QR code. 
                    Scan to instantly view harvest details, quality grades, certifications, and full traceability information.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <Card className="p-6 md:p-8 bg-white/90 backdrop-blur-sm">
          {scannedToken ? renderTokenDetails() : renderScanInterface()}
        </Card>

        {/* Quick Access Tokens (Demo) */}
        {!scannedToken && !isScanning && (
          <Card className="mt-6 p-4 bg-white/80 backdrop-blur-sm">
            <p className="text-sm text-gray-600 mb-3">Quick Access (Demo Tokens):</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleManualEntry('TRD-VEG-123456')}
              >
                TRD-VEG-123456
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleManualEntry('TRD-FRU-789012')}
              >
                TRD-FRU-789012
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QualityTokenScanner;
