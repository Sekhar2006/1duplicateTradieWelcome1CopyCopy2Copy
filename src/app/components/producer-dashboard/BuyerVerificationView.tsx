import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Shield,
  CheckCircle2,
  Search,
  QrCode,
  FileText,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
  BarChart3,
  Download,
  Share2,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface BuyerVerificationViewProps {
  tokenId?: string;
}

export const BuyerVerificationView: React.FC<BuyerVerificationViewProps> = ({
  tokenId: initialTokenId,
}) => {
  const [searchToken, setSearchToken] = useState(initialTokenId || '');
  const [verifiedData, setVerifiedData] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Mock verification data
  const mockData = {
    tokenId: 'TKN-LOT-001-1729584000000',
    globalBatchId: 'GBL-2025-A-1729584000000',
    status: 'verified',
    product: {
      name: 'Premium Wheat',
      grade: 'A',
      quantity: 1000,
      lotId: 'LOT-001',
      batchId: 'BTH-2025-001234',
    },
    producer: {
      name: 'Rajesh Kumar',
      location: 'Punjab, India',
      verified: true,
      rating: 4.8,
    },
    timeline: [
      { event: 'Sowing', date: '2025-06-15', location: 'Farm 123, Punjab' },
      { event: 'Growth Monitoring', date: '2025-08-20', location: 'Farm 123, Punjab' },
      { event: 'Harvesting', date: '2025-10-10', location: 'Farm 123, Punjab' },
      { event: 'Quality Grading', date: '2025-10-15', location: 'QC Lab, Punjab' },
      { event: 'Lot Creation', date: '2025-10-20', location: 'Storage Facility' },
      { event: 'Tokenization', date: '2025-10-22', location: 'Blockchain Network' },
    ],
    certificates: [
      { name: 'Quality Certificate', issuer: 'FSSAI', date: '2025-10-15' },
      { name: 'Organic Certification', issuer: 'India Organic', date: '2025-10-10' },
      { name: 'Lab Test Report', issuer: 'AgriLab Punjab', date: '2025-10-15' },
    ],
    verification: {
      verifiedBy: 'Dr. Sharma',
      organization: 'Punjab Agricultural University',
      date: '2025-10-20',
      comments: 'Excellent quality wheat, meets all standards for Grade A classification.',
    },
    aiInsights: [
      { type: 'Quality Score', value: '94/100', status: 'excellent' },
      { type: 'Fraud Risk', value: 'Low (2%)', status: 'safe' },
      { type: 'Market Value', value: '₹2,850/quintal', status: 'premium' },
    ],
    blockchainHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    qrCode: 'https://tradie.verify/TKN-LOT-001-1729584000000',
  };

  const handleVerify = async () => {
    if (!searchToken) {
      toast.error('Please enter a token ID or scan QR code');
      return;
    }

    setIsVerifying(true);

    // Simulate API call
    setTimeout(() => {
      setVerifiedData(mockData);
      setIsVerifying(false);
      toast.success('Product verified successfully!');
    }, 1500);
  };

  const handleScanQR = () => {
    // In a real app, this would open camera for QR scanning
    toast.info('QR scanner would open here');
  };

  const handleShare = () => {
    toast.success('Verification link copied to clipboard');
  };

  const handleDownloadReport = () => {
    toast.success('Downloading verification report...');
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#FFD700' }}>
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-2" style={{ color: '#003E6D' }}>Product & History Details</h1>
          <p className="text-gray-600">Verify product authenticity and view complete cultivation history</p>
        </div>

        {/* Search Card */}
        <Card className="p-6 mb-8 bg-white/90 backdrop-blur-sm shadow-lg">
          <h3 className="mb-4" style={{ color: '#003E6D' }}>Token/NFT Input</h3>
          <p className="text-sm text-gray-600 mb-4">Enter token ID or scan QR code</p>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Token ID or Batch ID"
                  value={searchToken}
                  onChange={(e) => setSearchToken(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
                />
                <Button onClick={handleVerify} disabled={isVerifying} className="text-white" style={{ backgroundColor: '#FFD700' }}>
                  <Search className="w-4 h-4 mr-2" />
                  {isVerifying ? 'Verifying...' : 'Verify'}
                </Button>
              </div>
            </div>
            <Button variant="outline" onClick={handleScanQR}>
              <QrCode className="w-4 h-4 mr-2" />
              Scan QR Code
            </Button>
          </div>
        </Card>

        {/* Verification Results */}
        {verifiedData && (
          <>
            {/* Status Banner */}
            <Card className="p-6 mb-6 bg-green-50 border-2 border-green-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                  <div>
                    <h3 className="mb-1" style={{ color: '#003E6D' }}>Verified Product Information</h3>
                    <p className="text-sm text-gray-600">
                      This product has been verified on the blockchain and all certifications are valid
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                    <Download className="w-4 h-4 mr-1" />
                    Report
                  </Button>
                </div>
              </div>
            </Card>

            {/* Product Overview */}
            <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="mb-4" style={{ color: '#003E6D' }}>Product Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Product</p>
                  <p style={{ color: '#003E6D' }}>{verifiedData.product.name}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Quality Grade</p>
                  <Badge className="bg-green-500 text-white">Grade {verifiedData.product.grade}</Badge>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Quantity</p>
                  <p style={{ color: '#003E6D' }}>{verifiedData.product.quantity} kg</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Token ID</p>
                  <p className="text-sm font-mono" style={{ color: '#003E6D' }}>
                    {verifiedData.tokenId.substring(0, 15)}...
                  </p>
                </div>
              </div>
            </Card>

            {/* Producer Info */}
            <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="mb-4" style={{ color: '#003E6D' }}>Producer Information</h3>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: '#FFD700' }}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p style={{ color: '#003E6D' }}>{verifiedData.producer.name}</p>
                    {verifiedData.producer.verified && (
                      <Badge className="bg-blue-500 text-white">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {verifiedData.producer.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Rating: {verifiedData.producer.rating}/5.0
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tabs for detailed info */}
            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
              </TabsList>

              {/* Timeline Tab */}
              <TabsContent value="timeline">
                <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
                  <h3 className="mb-4" style={{ color: '#003E6D' }}>Cultivation Timeline</h3>
                  <p className="text-sm text-gray-600 mb-4">View complete journey from sowing to harvest</p>
                  <div className="space-y-4">
                    {verifiedData.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              index === verifiedData.timeline.length - 1 ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                          >
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </div>
                          {index < verifiedData.timeline.length - 1 && (
                            <div className="w-0.5 h-16 bg-blue-200"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <p style={{ color: '#003E6D' }}>{event.event}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Certificates Tab */}
              <TabsContent value="certificates">
                <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
                  <h3 className="mb-4" style={{ color: '#003E6D' }}>Certificates and Proofs</h3>
                  <p className="text-sm text-gray-600 mb-4">View all linked certificates and verification documents</p>
                  <div className="space-y-4 mb-6">
                    {verifiedData.certificates.map((cert: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5" style={{ color: '#FFD700' }} />
                          <div>
                            <p style={{ color: '#003E6D' }}>{cert.name}</p>
                            <p className="text-sm text-gray-600">
                              Issued by {cert.issuer} on {cert.date}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-500 text-white">Valid</Badge>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="mb-2" style={{ color: '#003E6D' }}>Verified By</p>
                    <p className="text-sm text-gray-700 mb-1">
                      {verifiedData.verification.verifiedBy} - {verifiedData.verification.organization}
                    </p>
                    <p className="text-sm text-gray-600 italic">"{verifiedData.verification.comments}"</p>
                  </div>
                </Card>
              </TabsContent>

              {/* AI Insights Tab */}
              <TabsContent value="insights">
                <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-6 h-6" style={{ color: '#FFD700' }} />
                    <h3 style={{ color: '#003E6D' }}>AI-Driven Insights Summary</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">View AI-powered quality analysis and fraud detection</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {verifiedData.aiInsights.map((insight: any, index: number) => (
                      <div key={index} className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                        <p className="text-sm text-gray-600 mb-2">{insight.type}</p>
                        <p className="text-2xl mb-2" style={{ color: '#003E6D' }}>
                          {insight.value}
                        </p>
                        <Badge
                          className={`${
                            insight.status === 'excellent' ? 'bg-green-500' :
                            insight.status === 'safe' ? 'bg-blue-500' :
                            'bg-yellow-500'
                          } text-white`}
                        >
                          {insight.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p style={{ color: '#003E6D' }}>Fraud Detection: All Clear</p>
                        <p className="text-sm text-gray-600 mt-1">
                          No anomalies detected. All cultivation events and quality checks align with expected patterns.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Blockchain Tab */}
              <TabsContent value="blockchain">
                <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
                  <h3 className="mb-4" style={{ color: '#003E6D' }}>Blockchain Verification</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-2">Global Batch ID</p>
                      <p className="font-mono text-sm" style={{ color: '#003E6D' }}>
                        {verifiedData.globalBatchId}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-2">Token ID</p>
                      <p className="font-mono text-sm" style={{ color: '#003E6D' }}>
                        {verifiedData.tokenId}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-2">Blockchain Transaction Hash</p>
                      <p className="font-mono text-xs break-all" style={{ color: '#003E6D' }}>
                        {verifiedData.blockchainHash}
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <div>
                          <p style={{ color: '#003E6D' }}>Blockchain Verified</p>
                          <p className="text-sm text-gray-600">
                            This record is immutable and permanently stored on the blockchain
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* Empty State */}
        {!verifiedData && !isVerifying && (
          <Card className="p-12 text-center bg-white/90 backdrop-blur-sm shadow-lg">
            <QrCode className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2" style={{ color: '#003E6D' }}>Ready to Verify</h3>
            <p className="text-gray-600">Enter a token ID or scan a QR code to verify product authenticity</p>
          </Card>
        )}
      </div>
    </div>
  );
};
