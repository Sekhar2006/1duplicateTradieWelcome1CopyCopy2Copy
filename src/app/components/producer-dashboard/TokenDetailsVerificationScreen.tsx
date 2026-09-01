import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CheckCircle2, Upload, FileText, User, BarChart3, Calendar, AlertCircle, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Certificate {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
}

interface VerifierInfo {
  name: string;
  organization: string;
  role: string;
  comments: string;
}

interface AIInsight {
  type: string;
  message: string;
  confidence: number;
  timestamp: string;
}

interface TokenDetailsVerificationScreenProps {
  tokenData: {
    globalBatchId: string;
    tokenId: string;
    qrCode: string;
    blockchainHash: string;
    timestamp: string;
  };
  onSaveAndPublish: (details: any) => void;
  onBack: () => void;
  lotData?: {
    id: string;
    quality: string;
    quantity: number;
  };
}

export const TokenDetailsVerificationScreen: React.FC<TokenDetailsVerificationScreenProps> = ({
  tokenData,
  onSaveAndPublish,
  onBack,
  lotData = {
    id: 'LOT-001',
    quality: 'A',
    quantity: 1000,
  },
}) => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 'cert-1',
      name: 'Quality Certificate',
      type: 'PDF',
      uploadDate: new Date().toISOString(),
    },
  ]);

  const [verifierInfo, setVerifierInfo] = useState<VerifierInfo>({
    name: '',
    organization: '',
    role: '',
    comments: '',
  });

  const [aiInsights] = useState<AIInsight[]>([
    {
      type: 'Quality Prediction',
      message: 'Premium quality detected based on historical data',
      confidence: 94,
      timestamp: new Date().toISOString(),
    },
    {
      type: 'Fraud Detection',
      message: 'No anomalies detected in cultivation timeline',
      confidence: 98,
      timestamp: new Date().toISOString(),
    },
    {
      type: 'Market Insight',
      message: 'Current market demand high for Grade A wheat',
      confidence: 87,
      timestamp: new Date().toISOString(),
    },
  ]);

  const [historyLog] = useState([
    { event: 'Token Created', timestamp: tokenData.timestamp, user: 'System' },
    { event: 'Blockchain Verified', timestamp: tokenData.timestamp, user: 'System' },
    { event: 'QR Code Generated', timestamp: tokenData.timestamp, user: 'System' },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newCertificates = Array.from(files).map((file) => ({
        id: `cert-${Date.now()}-${Math.random()}`,
        name: file.name,
        type: file.type,
        uploadDate: new Date().toISOString(),
      }));
      setCertificates([...certificates, ...newCertificates]);
      toast.success(`${files.length} certificate(s) uploaded successfully`);
    }
  };

  const handleRemoveCertificate = (id: string) => {
    setCertificates(certificates.filter((cert) => cert.id !== id));
    toast.success('Certificate removed');
  };

  const handleSaveVerifier = () => {
    if (!verifierInfo.name || !verifierInfo.organization) {
      toast.error('Please fill in verifier name and organization');
      return;
    }
    toast.success('Verifier information saved');
  };

  const handlePublish = () => {
    if (certificates.length === 0) {
      toast.error('Please upload at least one certificate');
      return;
    }

    const details = {
      tokenData,
      certificates,
      verifierInfo,
      aiInsights,
      historyLog,
    };

    onSaveAndPublish(details);
    toast.success('Token published successfully!');
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      {/* Step Indicator */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm" style={{ color: '#003E6D' }}>Grading</span>
          </div>
          <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm" style={{ color: '#003E6D' }}>Lots</span>
          </div>
          <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm" style={{ color: '#003E6D' }}>Tokenization</span>
          </div>
          <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFD700' }}>
              <span className="text-sm text-white">4</span>
            </div>
            <span className="text-sm" style={{ color: '#003E6D' }}>Verification</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2" style={{ color: '#003E6D' }}>Token Details & Verification</h1>
          <p className="text-gray-600">Upload certificates, add verifier comments, view AI insights, and review history</p>
        </div>

        {/* Token Summary Card */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Token ID</p>
              <p className="font-mono text-sm" style={{ color: '#003E6D' }}>{tokenData.tokenId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lot</p>
              <div className="flex items-center gap-2">
                <span style={{ color: '#003E6D' }}>{lotData.id}</span>
                <Badge className="bg-green-500 text-white">Grade {lotData.quality}</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Quantity</p>
              <p style={{ color: '#003E6D' }}>{lotData.quantity} kg</p>
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="certificates" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="verifier">Verifier Info</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="history">History Log</TabsTrigger>
          </TabsList>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="mb-4">
                <h3 className="mb-2" style={{ color: '#003E6D' }}>Upload Certificates</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload quality certificates, lab reports, and other documents
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-500 hover:underline">Click to upload</span>
                    <span className="text-gray-500"> or drag and drop</span>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">PDF, JPG, PNG, DOC up to 10MB</p>
                </div>
              </div>

              {certificates.length > 0 && (
                <div className="mt-6">
                  <h4 className="mb-3" style={{ color: '#003E6D' }}>Uploaded Certificates</h4>
                  <div className="space-y-2">
                    {certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5" style={{ color: '#FFD700' }} />
                          <div>
                            <p style={{ color: '#003E6D' }}>{cert.name}</p>
                            <p className="text-sm text-gray-500">
                              Uploaded {new Date(cert.uploadDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveCertificate(cert.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Verifier Info Tab */}
          <TabsContent value="verifier">
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="mb-4" style={{ color: '#003E6D' }}>Verifier Comments</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="verifier-name">Verifier Name *</Label>
                  <Input
                    id="verifier-name"
                    value={verifierInfo.name}
                    onChange={(e) => setVerifierInfo({ ...verifierInfo, name: e.target.value })}
                    placeholder="Enter verifier's full name"
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Organization *</Label>
                  <Input
                    id="organization"
                    value={verifierInfo.organization}
                    onChange={(e) => setVerifierInfo({ ...verifierInfo, organization: e.target.value })}
                    placeholder="Enter organization name"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role/Position</Label>
                  <Input
                    id="role"
                    value={verifierInfo.role}
                    onChange={(e) => setVerifierInfo({ ...verifierInfo, role: e.target.value })}
                    placeholder="e.g., Quality Inspector, Lab Technician"
                  />
                </div>
                <div>
                  <Label htmlFor="comments">Comments</Label>
                  <Textarea
                    id="comments"
                    value={verifierInfo.comments}
                    onChange={(e) => setVerifierInfo({ ...verifierInfo, comments: e.target.value })}
                    placeholder="Add verification comments and observations"
                    rows={4}
                  />
                </div>
                <Button onClick={handleSaveVerifier} className="text-white" style={{ backgroundColor: '#FFD700' }}>
                  <User className="w-4 h-4 mr-2" />
                  Save Verifier Info
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights">
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-6 h-6" style={{ color: '#FFD700' }} />
                <h3 style={{ color: '#003E6D' }}>AI Insights Display</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">View AI-powered insights with charts and statistics</p>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500 text-white">{insight.type}</Badge>
                        <span className="text-sm text-gray-500">
                          Confidence: {insight.confidence}%
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(insight.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{insight.message}</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${insight.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" />
                  <div>
                    <p style={{ color: '#003E6D' }}>AI Fraud Detection Active</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Grok AI continuously monitors for anomalies and suspicious patterns across the entire supply chain
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* History Log Tab */}
          <TabsContent value="history">
            <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="mb-4" style={{ color: '#003E6D' }}>History Log</h3>
              <p className="text-sm text-gray-600 mb-4">Scrollable list of verifications and updates</p>
              <div className="space-y-3">
                {historyLog.map((log, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border-l-2 border-gray-300 hover:bg-gray-50">
                    <Calendar className="w-5 h-5 mt-1" style={{ color: '#FFD700' }} />
                    <div className="flex-1">
                      <p style={{ color: '#003E6D' }}>{log.event}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">by {log.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            Back to Tokenization
          </Button>
          <Button onClick={handlePublish} className="text-white" style={{ backgroundColor: '#003E6D' }}>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Save & Publish
          </Button>
        </div>
      </div>
    </div>
  );
};
