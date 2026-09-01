import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  Shield,
  Eye,
  Sparkles,
  QrCode,
  TrendingUp,
  Calendar,
  MapPin,
  User,
  Award,
  History,
  Download
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

// Types
interface Batch {
  id: string;
  name: string;
  commodity: string;
  harvestDate: string;
  quantity: number;
  unit: string;
}

interface Lot {
  id: string;
  batchId: string;
  lotNumber: string;
  grade: string;
  quantity: number;
  unit: string;
  status: 'pending' | 'tokenizing' | 'tokenized';
  tokenId?: string;
  globalBatchId?: string;
  createdAt: string;
}

interface TokenData {
  lotId: string;
  tokenId: string;
  globalBatchId: string;
  certificates: Certificate[];
  verifications: Verification[];
  cultivationHistory: HistoryEntry[];
  aiInsights?: AIInsight;
}

interface Certificate {
  id: string;
  name: string;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
  fileUrl: string;
}

interface Verification {
  id: string;
  verifierName: string;
  verifierRole: string;
  verifiedAt: string;
  status: 'verified' | 'pending' | 'rejected';
  notes: string;
}

interface HistoryEntry {
  id: string;
  stage: string;
  date: string;
  description: string;
  verifiedBy?: string;
}

interface AIInsight {
  qualityScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  fraudProbability: number;
  recommendations: string[];
  marketTrends: string;
}

// Mock data
const mockBatches: Batch[] = [
  {
    id: 'B001',
    name: 'Wheat Harvest 2025-Q1',
    commodity: 'Wheat',
    harvestDate: '2025-03-15',
    quantity: 5000,
    unit: 'kg'
  },
  {
    id: 'B002',
    name: 'Rice Premium Batch',
    commodity: 'Rice',
    harvestDate: '2025-03-10',
    quantity: 3500,
    unit: 'kg'
  }
];

const gradeOptions = [
  { value: 'A+', label: 'A+ Grade (Premium)', color: 'bg-green-500' },
  { value: 'A', label: 'A Grade (High Quality)', color: 'bg-green-400' },
  { value: 'B+', label: 'B+ Grade (Good)', color: 'bg-blue-500' },
  { value: 'B', label: 'B Grade (Standard)', color: 'bg-blue-400' },
  { value: 'C', label: 'C Grade (Fair)', color: 'bg-yellow-500' }
];

const LotCreationTokenizationWorkflow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [lots, setLots] = useState<Lot[]>([]);
  const [tokenDataMap, setTokenDataMap] = useState<Map<string, TokenData>>(new Map());
  const [selectedLotForView, setSelectedLotForView] = useState<Lot | null>(null);
  const [buyerViewSelectedLot, setBuyerViewSelectedLot] = useState<Lot | null>(null);

  // Lot creation form state
  const [newLot, setNewLot] = useState({
    grade: '',
    quantity: '',
    unit: 'kg'
  });

  // Certificate upload state
  const [uploadingCert, setUploadingCert] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    name: '',
    type: '',
    notes: ''
  });

  // Step navigation
  const steps = [
    { number: 1, label: 'Create Lots', icon: Package },
    { number: 2, label: 'Tokenization', icon: QrCode },
    { number: 3, label: 'Data Enrichment', icon: FileText },
    { number: 4, label: 'Buyer View', icon: Eye }
  ];

  // Initialize buyer view selected lot when moving to step 4
  useEffect(() => {
    if (currentStep === 4 && !buyerViewSelectedLot) {
      const tokenizedLot = lots.filter(l => l.status === 'tokenized')[0];
      if (tokenizedLot) {
        setBuyerViewSelectedLot(tokenizedLot);
      }
    }
  }, [currentStep, lots, buyerViewSelectedLot]);

  // Handlers
  const handleBatchSelect = (batchId: string) => {
    const batch = mockBatches.find(b => b.id === batchId);
    setSelectedBatch(batch || null);
  };

  const handleAddLot = () => {
    if (!selectedBatch || !newLot.grade || !newLot.quantity) {
      toast.error('Please fill in all required fields');
      return;
    }

    const lot: Lot = {
      id: `LOT-${Date.now()}`,
      batchId: selectedBatch.id,
      lotNumber: `${selectedBatch.id}-${lots.length + 1}`,
      grade: newLot.grade,
      quantity: parseFloat(newLot.quantity),
      unit: newLot.unit,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setLots([...lots, lot]);
    setNewLot({ grade: '', quantity: '', unit: 'kg' });
    toast.success('Lot created successfully');
  };

  const handleRemoveLot = (lotId: string) => {
    setLots(lots.filter(l => l.id !== lotId));
    toast.success('Lot removed');
  };

  const handleInitiateTokenization = (lotId: string) => {
    const lot = lots.find(l => l.id === lotId);
    if (!lot) return;

    // Update lot status
    const updatedLot = {
      ...lot,
      status: 'tokenizing' as const,
      globalBatchId: `GB-${selectedBatch?.id}-${Date.now()}`,
      tokenId: `TKN-${lot.lotNumber}-${Date.now()}`
    };

    setLots(lots.map(l => l.id === lotId ? updatedLot : l));

    // Simulate tokenization process
    setTimeout(() => {
      const finalLot = { ...updatedLot, status: 'tokenized' as const };
      setLots(lots.map(l => l.id === lotId ? finalLot : l));

      // Initialize token data
      const tokenData: TokenData = {
        lotId: finalLot.id,
        tokenId: finalLot.tokenId!,
        globalBatchId: finalLot.globalBatchId!,
        certificates: [],
        verifications: [
          {
            id: 'V1',
            verifierName: 'Initial System Verification',
            verifierRole: 'Automated',
            verifiedAt: new Date().toISOString(),
            status: 'verified',
            notes: 'Lot created and tokenized successfully'
          }
        ],
        cultivationHistory: [
          {
            id: 'H1',
            stage: 'Harvest',
            date: selectedBatch?.harvestDate || new Date().toISOString(),
            description: `${selectedBatch?.commodity} harvested - Batch ${selectedBatch?.id}`,
            verifiedBy: 'Producer'
          },
          {
            id: 'H2',
            stage: 'Grading',
            date: new Date().toISOString(),
            description: `Quality graded as ${finalLot.grade}`,
            verifiedBy: 'Quality Inspector'
          },
          {
            id: 'H3',
            stage: 'Tokenization',
            date: new Date().toISOString(),
            description: 'Lot tokenized on blockchain',
            verifiedBy: 'System'
          }
        ],
        aiInsights: {
          qualityScore: calculateQualityScore(finalLot.grade),
          riskLevel: 'low',
          fraudProbability: 2.5,
          recommendations: [
            'Quality meets premium standards',
            'Suitable for export markets',
            'No fraud indicators detected'
          ],
          marketTrends: 'Current market demand is high for this grade'
        }
      };

      setTokenDataMap(new Map(tokenDataMap.set(finalLot.id, tokenData)));
      toast.success(`Tokenization completed! Token ID: ${finalLot.tokenId}`);
    }, 2000);

    toast.info('Tokenization initiated...');
  };

  const handleTokenizeAll = () => {
    const pendingLots = lots.filter(l => l.status === 'pending');
    pendingLots.forEach(lot => {
      setTimeout(() => handleInitiateTokenization(lot.id), Math.random() * 1000);
    });
  };

  const handleAddCertificate = (lotId: string) => {
    if (!newCertificate.name || !newCertificate.type) {
      toast.error('Please fill in certificate details');
      return;
    }

    const tokenData = tokenDataMap.get(lotId);
    if (!tokenData) return;

    setUploadingCert(true);
    setTimeout(() => {
      const certificate: Certificate = {
        id: `CERT-${Date.now()}`,
        name: newCertificate.name,
        type: newCertificate.type,
        uploadedBy: 'Producer',
        uploadedAt: new Date().toISOString(),
        fileUrl: '#'
      };

      const updatedTokenData = {
        ...tokenData,
        certificates: [...tokenData.certificates, certificate]
      };

      setTokenDataMap(new Map(tokenDataMap.set(lotId, updatedTokenData)));
      setNewCertificate({ name: '', type: '', notes: '' });
      setUploadingCert(false);
      toast.success('Certificate uploaded successfully');
    }, 1000);
  };

  const handleAddVerification = (lotId: string, verifierData: Partial<Verification>) => {
    const tokenData = tokenDataMap.get(lotId);
    if (!tokenData) return;

    const verification: Verification = {
      id: `V-${Date.now()}`,
      verifierName: verifierData.verifierName || 'Unknown',
      verifierRole: verifierData.verifierRole || 'Verifier',
      verifiedAt: new Date().toISOString(),
      status: 'verified',
      notes: verifierData.notes || ''
    };

    const updatedTokenData = {
      ...tokenData,
      verifications: [...tokenData.verifications, verification]
    };

    setTokenDataMap(new Map(tokenDataMap.set(lotId, updatedTokenData)));
    toast.success('Verification added');
  };

  const calculateQualityScore = (grade: string): number => {
    const scoreMap: { [key: string]: number } = {
      'A+': 98,
      'A': 92,
      'B+': 85,
      'B': 78,
      'C': 65
    };
    return scoreMap[grade] || 70;
  };

  const getStatusBadge = (status: Lot['status']) => {
    const statusConfig = {
      pending: { label: 'Not Tokenized', color: 'bg-gray-500', icon: Clock },
      tokenizing: { label: 'In Progress', color: 'bg-yellow-500', icon: Clock },
      tokenized: { label: 'Tokenized', color: 'bg-green-500', icon: CheckCircle }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} text-white`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getGradeBadge = (grade: string) => {
    const gradeInfo = gradeOptions.find(g => g.value === grade);
    return (
      <Badge className={`${gradeInfo?.color || 'bg-gray-500'} text-white`}>
        {grade}
      </Badge>
    );
  };

  const getRiskBadge = (riskLevel: 'low' | 'medium' | 'high') => {
    const config = {
      low: { color: 'bg-green-500', label: 'Low Risk' },
      medium: { color: 'bg-yellow-500', label: 'Medium Risk' },
      high: { color: 'bg-red-500', label: 'High Risk' }
    };
    const risk = config[riskLevel];
    return <Badge className={`${risk.color} text-white`}>{risk.label}</Badge>;
  };

  // Render functions for each step
  const renderLotCreation = () => (
    <div className="space-y-6">
      {/* Batch Selection */}
      <Card className="p-6 bg-white shadow-sm border border-gray-200">
        <h3 className="mb-4">Select or Create Batch</h3>
        <div className="space-y-4">
          <div>
            <Label>Batch/Harvest</Label>
            <Select value={selectedBatch?.id || ''} onValueChange={handleBatchSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a batch" />
              </SelectTrigger>
              <SelectContent>
                {mockBatches.map(batch => (
                  <SelectItem key={batch.id} value={batch.id}>
                    {batch.name} ({batch.commodity}) - {batch.quantity} {batch.unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedBatch && (
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Commodity</p>
                  <p>{selectedBatch.commodity}</p>
                </div>
                <div>
                  <p className="text-gray-600">Harvest Date</p>
                  <p>{new Date(selectedBatch.harvestDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Quantity</p>
                  <p>{selectedBatch.quantity} {selectedBatch.unit}</p>
                </div>
                <div>
                  <p className="text-gray-600">Batch ID</p>
                  <p>{selectedBatch.id}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Add New Lot */}
      {selectedBatch && (
        <Card className="p-6 bg-white shadow-sm border border-gray-200">
          <h3 className="mb-4">Add New Lot</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Grade</Label>
              <Select value={newLot.grade} onValueChange={(value) => setNewLot({ ...newLot, grade: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map(grade => (
                    <SelectItem key={grade.value} value={grade.value}>
                      {grade.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                placeholder="0"
                value={newLot.quantity}
                onChange={(e) => setNewLot({ ...newLot, quantity: e.target.value })}
              />
            </div>
            <div>
              <Label>Unit</Label>
              <Select value={newLot.unit} onValueChange={(value) => setNewLot({ ...newLot, unit: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="tons">Tons</SelectItem>
                  <SelectItem value="quintals">Quintals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleAddLot} className="mt-4 bg-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Lot
          </Button>
        </Card>
      )}

      {/* Lots List */}
      {lots.length > 0 && (
        <Card className="p-6 bg-white shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3>Created Lots ({lots.length})</h3>
          </div>
          <div className="space-y-3">
            {lots.map((lot) => (
              <motion.div
                key={lot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-4 h-4 text-[#003E6D]" />
                      <span>{lot.lotNumber}</span>
                      {getGradeBadge(lot.grade)}
                      {getStatusBadge(lot.status)}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-gray-600">Quantity: {lot.quantity} {lot.unit}</p>
                      <p className="text-gray-600">Created: {new Date(lot.createdAt).toLocaleDateString()}</p>
                      {lot.tokenId && (
                        <p className="text-gray-600 col-span-2">Token ID: {lot.tokenId}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveLot(lot.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {/* Navigation */}
      {lots.length > 0 && (
        <div className="flex justify-end">
          <Button
            onClick={() => setCurrentStep(2)}
            className="bg-[#003E6D] text-white hover:bg-[#003E6D]/90"
          >
            Proceed to Tokenization
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );

  const renderTokenization = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-white shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3>Tokenization Dashboard</h3>
            <p className="text-gray-600 mt-1">Initiate tokenization for your lots</p>
          </div>
          <Button
            onClick={handleTokenizeAll}
            className="bg-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/90"
            disabled={lots.filter(l => l.status === 'pending').length === 0}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Tokenize All Pending
          </Button>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
            <p className="text-gray-600">Total Lots</p>
            <p className="text-2xl">{lots.length}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
            <p className="text-gray-600">Pending</p>
            <p className="text-2xl">{lots.filter(l => l.status === 'pending').length}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <p className="text-gray-600">Tokenized</p>
            <p className="text-2xl">{lots.filter(l => l.status === 'tokenized').length}</p>
          </div>
        </div>

        {/* Lots with Tokenization Actions */}
        <div className="space-y-4">
          {lots.map((lot) => (
            <div
              key={lot.id}
              className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <QrCode className="w-5 h-5 text-[#003E6D]" />
                    <span>{lot.lotNumber}</span>
                    {getGradeBadge(lot.grade)}
                    {getStatusBadge(lot.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-gray-600">Quantity: {lot.quantity} {lot.unit}</p>
                    <p className="text-gray-600">Batch: {lot.batchId}</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleInitiateTokenization(lot.id)}
                  disabled={lot.status !== 'pending'}
                  className="bg-[#003E6D] text-white hover:bg-[#003E6D]/90 disabled:opacity-50"
                >
                  {lot.status === 'pending' && 'Tokenize'}
                  {lot.status === 'tokenizing' && 'Processing...'}
                  {lot.status === 'tokenized' && 'Completed'}
                </Button>
              </div>

              {lot.status === 'tokenizing' && (
                <div className="mt-3">
                  <Progress value={66} className="h-2" />
                  <p className="text-sm text-gray-600 mt-1">Generating blockchain token...</p>
                </div>
              )}

              {lot.status === 'tokenized' && lot.tokenId && (
                <div className="mt-3 p-3 bg-white rounded border border-green-300">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Global Batch ID</p>
                      <p className="font-mono text-xs">{lot.globalBatchId}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Token ID</p>
                      <p className="font-mono text-xs">{lot.tokenId}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={() => setCurrentStep(1)}
          variant="outline"
          className="border-[#003E6D] text-[#003E6D]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lot Creation
        </Button>
        <Button
          onClick={() => setCurrentStep(3)}
          className="bg-[#003E6D] text-white hover:bg-[#003E6D]/90"
          disabled={lots.filter(l => l.status === 'tokenized').length === 0}
        >
          Proceed to Data Enrichment
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderDataEnrichment = () => {
    const tokenizedLots = lots.filter(l => l.status === 'tokenized');

    return (
      <div className="space-y-6">
        <Card className="p-6 bg-white shadow-sm border border-gray-200">
          <h3 className="mb-2">Token Data Enrichment</h3>
          <p className="text-gray-600 mb-6">Add certificates, verifications, and supplementary information</p>

          <Tabs defaultValue={tokenizedLots[0]?.id || ''} className="w-full">
            <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tokenizedLots.length}, 1fr)` }}>
              {tokenizedLots.map((lot) => (
                <TabsTrigger key={lot.id} value={lot.id}>
                  {lot.lotNumber}
                </TabsTrigger>
              ))}
            </TabsList>

            {tokenizedLots.map((lot) => {
              const tokenData = tokenDataMap.get(lot.id);

              return (
                <TabsContent key={lot.id} value={lot.id} className="space-y-6">
                  {/* Token Info */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">Token ID</p>
                        <p className="font-mono text-sm">{lot.tokenId}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Global Batch ID</p>
                        <p className="font-mono text-sm">{lot.globalBatchId}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Grade</p>
                        <div className="mt-1">{getGradeBadge(lot.grade)}</div>
                      </div>
                      <div>
                        <p className="text-gray-600">Quantity</p>
                        <p>{lot.quantity} {lot.unit}</p>
                      </div>
                    </div>
                  </div>

                  {/* Certificates Section */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Certificates ({tokenData?.certificates.length || 0})
                      </h4>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="border-[#003E6D] text-[#003E6D]">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Certificate
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Upload Certificate</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Certificate Name</Label>
                              <Input
                                placeholder="e.g., Organic Certification"
                                value={newCertificate.name}
                                onChange={(e) => setNewCertificate({ ...newCertificate, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Certificate Type</Label>
                              <Select
                                value={newCertificate.type}
                                onValueChange={(value) => setNewCertificate({ ...newCertificate, type: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="organic">Organic</SelectItem>
                                  <SelectItem value="quality">Quality</SelectItem>
                                  <SelectItem value="export">Export</SelectItem>
                                  <SelectItem value="safety">Food Safety</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Notes (Optional)</Label>
                              <Textarea
                                placeholder="Additional notes..."
                                value={newCertificate.notes}
                                onChange={(e) => setNewCertificate({ ...newCertificate, notes: e.target.value })}
                              />
                            </div>
                            <Button
                              onClick={() => handleAddCertificate(lot.id)}
                              disabled={uploadingCert}
                              className="w-full bg-[#003E6D] text-white"
                            >
                              {uploadingCert ? 'Uploading...' : 'Upload Certificate'}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {tokenData?.certificates.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No certificates uploaded yet</p>
                    ) : (
                      <div className="space-y-2">
                        {tokenData?.certificates.map((cert) => (
                          <div key={cert.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <p>{cert.name}</p>
                                <p className="text-sm text-gray-600">
                                  {cert.type} • Uploaded by {cert.uploadedBy} • {new Date(cert.uploadedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <Button size="sm" variant="ghost">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Verifications Section */}
                  <div>
                    <h4 className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4" />
                      Verifications ({tokenData?.verifications.length || 0})
                    </h4>

                    {tokenData?.verifications.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No verifications yet</p>
                    ) : (
                      <div className="space-y-2">
                        {tokenData?.verifications.map((verification) => (
                          <div key={verification.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span>{verification.verifierName}</span>
                              </div>
                              <Badge className="bg-green-500 text-white">
                                {verification.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              Role: {verification.verifierRole} • {new Date(verification.verifiedAt).toLocaleDateString()}
                            </p>
                            {verification.notes && (
                              <p className="text-sm text-gray-700 mt-2">{verification.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Cultivation History */}
                  <div>
                    <h4 className="flex items-center gap-2 mb-3">
                      <History className="w-4 h-4" />
                      Cultivation History
                    </h4>

                    <div className="space-y-3">
                      {tokenData?.cultivationHistory.map((entry, index) => (
                        <div key={entry.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-[#003E6D] text-white flex items-center justify-center text-sm">
                              {index + 1}
                            </div>
                            {index < (tokenData.cultivationHistory.length - 1) && (
                              <div className="w-0.5 h-12 bg-gray-300" />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="flex justify-between items-start mb-1">
                              <span>{entry.stage}</span>
                              <span className="text-sm text-gray-600">
                                {new Date(entry.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{entry.description}</p>
                            {entry.verifiedBy && (
                              <p className="text-xs text-gray-500 mt-1">Verified by: {entry.verifiedBy}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={() => setCurrentStep(2)}
            variant="outline"
            className="border-[#003E6D] text-[#003E6D]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tokenization
          </Button>
          <Button
            onClick={() => setCurrentStep(4)}
            className="bg-[#003E6D] text-white hover:bg-[#003E6D]/90"
          >
            Preview Buyer View
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const renderBuyerView = () => {
    const tokenData = buyerViewSelectedLot ? tokenDataMap.get(buyerViewSelectedLot.id) : null;

    return (
      <div className="space-y-6">
        {/* Token Scanner Simulation */}
        <Card className="p-6 bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF] shadow-lg border-2 border-[#003E6D]">
          <div className="text-center mb-4">
            <QrCode className="w-12 h-12 mx-auto mb-2 text-[#003E6D]" />
            <h3>Scan Token / Enter NFT ID</h3>
            <p className="text-gray-600">Select a lot to view its details</p>
          </div>

          <Select
            value={buyerViewSelectedLot?.id || ''}
            onValueChange={(lotId) => setBuyerViewSelectedLot(lots.find(l => l.id === lotId) || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a tokenized lot" />
            </SelectTrigger>
            <SelectContent>
              {lots.filter(l => l.status === 'tokenized').map((lot) => (
                <SelectItem key={lot.id} value={lot.id}>
                  {lot.tokenId} ({lot.lotNumber})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {buyerViewSelectedLot && tokenData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Product Details */}
            <Card className="p-6 bg-white shadow-sm border border-gray-200">
              <h3 className="mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Product Details
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Token ID</p>
                  <p className="font-mono text-xs mt-1">{tokenData.tokenId}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Lot Number</p>
                  <p className="mt-1">{buyerViewSelectedLot.lotNumber}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Grade</p>
                  <div className="mt-1">{getGradeBadge(buyerViewSelectedLot.grade)}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Quantity</p>
                  <p className="mt-1">{buyerViewSelectedLot.quantity} {buyerViewSelectedLot.unit}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Batch ID</p>
                  <p className="mt-1">{buyerViewSelectedLot.batchId}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Global Batch ID</p>
                  <p className="font-mono text-xs mt-1">{tokenData.globalBatchId}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Commodity</p>
                  <p className="mt-1">{selectedBatch?.commodity || 'N/A'}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Harvest Date</p>
                  <p className="mt-1">{selectedBatch ? new Date(selectedBatch.harvestDate).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </Card>

            {/* AI Insights */}
            {tokenData.aiInsights && (
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 shadow-sm border border-purple-200">
                <h3 className="mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Grok AI Insights
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-gray-600 text-sm mb-1">Quality Score</p>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl text-[#003E6D]">{tokenData.aiInsights.qualityScore}</div>
                      <Award className="w-5 h-5 text-[#FFD700]" />
                    </div>
                    <Progress value={tokenData.aiInsights.qualityScore} className="mt-2 h-2" />
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-gray-600 text-sm mb-1">Risk Level</p>
                    <div className="mt-2">{getRiskBadge(tokenData.aiInsights.riskLevel)}</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-gray-600 text-sm mb-1">Fraud Probability</p>
                    <div className="text-2xl text-green-600">{tokenData.aiInsights.fraudProbability}%</div>
                    <p className="text-xs text-gray-500 mt-1">Low risk detected</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {tokenData.aiInsights.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm mb-1 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Market Trends
                    </h4>
                    <p className="text-sm text-gray-700">{tokenData.aiInsights.marketTrends}</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Cultivation History Timeline */}
            <Card className="p-6 bg-white shadow-sm border border-gray-200">
              <h3 className="mb-4 flex items-center gap-2">
                <History className="w-5 h-5" />
                Cultivation History
              </h3>

              <div className="space-y-4">
                {tokenData.cultivationHistory.map((entry, index) => (
                  <div key={entry.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#003E6D] to-[#0066CC] text-white flex items-center justify-center">
                        {index + 1}
                      </div>
                      {index < tokenData.cultivationHistory.length - 1 && (
                        <div className="w-0.5 h-16 bg-gradient-to-b from-[#003E6D] to-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4>{entry.stage}</h4>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(entry.date).toLocaleDateString()}
                            </p>
                          </div>
                          {entry.verifiedBy && (
                            <Badge variant="outline" className="border-green-500 text-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{entry.description}</p>
                        {entry.verifiedBy && (
                          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {entry.verifiedBy}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Certificates & Verifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Certificates */}
              <Card className="p-6 bg-white shadow-sm border border-gray-200">
                <h4 className="mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Certificates ({tokenData.certificates.length})
                </h4>

                {tokenData.certificates.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No certificates uploaded</p>
                ) : (
                  <div className="space-y-3">
                    {tokenData.certificates.map((cert) => (
                      <div key={cert.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{cert.name}</span>
                          </div>
                          <Badge className="bg-green-500 text-white text-xs">{cert.type}</Badge>
                        </div>
                        <p className="text-xs text-gray-600">
                          Uploaded: {new Date(cert.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Verifications */}
              <Card className="p-6 bg-white shadow-sm border border-gray-200">
                <h4 className="mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verifications ({tokenData.verifications.length})
                </h4>

                <div className="space-y-3">
                  {tokenData.verifications.map((verification) => (
                    <div key={verification.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{verification.verifierName}</span>
                        </div>
                        <Badge className="bg-blue-500 text-white text-xs">
                          {verification.verifierRole}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">
                        {new Date(verification.verifiedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={() => setCurrentStep(3)}
            variant="outline"
            className="border-[#003E6D] text-[#003E6D]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Data Enrichment
          </Button>
          <Button
            onClick={() => {
              setCurrentStep(1);
              toast.success('Workflow completed! You can start a new lot creation.');
            }}
            className="bg-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/90"
          >
            Start New Workflow
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#003E6D] mb-2">Lot Creation & Tokenization Workflow</h1>
          <p className="text-gray-600">Create lots, tokenize on blockchain, enrich data, and preview buyer view</p>
        </div>

        {/* Progress Steps */}
        <Card className="p-6 mb-8 bg-white shadow-sm border border-gray-200">
          <div className="flex justify-between items-center relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
              <motion.div
                className="h-full bg-[#003E6D]"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center relative"
                  style={{ width: `${100 / steps.length}%` }}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#003E6D] text-white'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                      if (step.number <= currentStep || isCompleted) {
                        setCurrentStep(step.number);
                      }
                    }}
                  >
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </motion.div>
                  <p className={`text-sm text-center ${isActive ? 'text-[#003E6D]' : 'text-gray-600'}`}>
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && renderLotCreation()}
            {currentStep === 2 && renderTokenization()}
            {currentStep === 3 && renderDataEnrichment()}
            {currentStep === 4 && renderBuyerView()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LotCreationTokenizationWorkflow;
