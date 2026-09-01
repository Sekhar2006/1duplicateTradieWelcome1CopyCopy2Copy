# 🔗 ProvenanceTracker Integration Example

**Complete code examples for integrating the Provenance API with your ProvenanceTracker.tsx component**

---

## 📦 Import Setup

```typescript
// In ProvenanceTracker.tsx
import React, { useState, useEffect } from 'react';
import ProvenanceAPI, {
  CropBatch,
  TokenData,
  getStageDisplayName,
  getStageColor
} from './ProvenanceAPI';
import { toast } from 'sonner@2.0.3';
import QRCode from 'qrcode';
```

---

## 🌱 1. Commodity Selection → Create Crop Batch

```typescript
const ProvenanceTracker = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVariety, setSelectedVariety] = useState('');
  const [cropBatchId, setCropBatchId] = useState('');
  const [isCreatingBatch, setIsCreatingBatch] = useState(false);

  // When user selects commodity and variety
  const handleCommoditySelect = async (category: string, variety: string) => {
    try {
      setIsCreatingBatch(true);
      
      // Get current user/producer info
      const producerId = localStorage.getItem('producer_id') || '1';
      const farmLocation = JSON.parse(
        localStorage.getItem('farm_location') || '{"state":"Karnataka","district":"Bangalore"}'
      );

      // Create crop batch
      const result = await ProvenanceAPI.createCropBatch({
        producerId,
        category,
        variety,
        farmLocation,
        initialData: {
          plantingDate: new Date().toISOString().split('T')[0],
          estimatedHarvest: calculateEstimatedHarvestDate(90), // 90 days from now
          quantity: 0,
          unit: 'kg'
        }
      });

      // Store the unique crop batch ID
      setCropBatchId(result.data.cropBatchId);
      
      toast.success(`Crop Batch Created: ${result.data.cropBatchId}`);
      
      // Move to next stage
      setCurrentStage('planting');
      
    } catch (error) {
      console.error('Failed to create crop batch:', error);
      toast.error('Failed to create crop batch');
    } finally {
      setIsCreatingBatch(false);
    }
  };

  // Helper function
  const calculateEstimatedHarvestDate = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  return (
    <div>
      {/* Commodity Selection UI */}
      <Select onValueChange={(value) => {
        const [cat, var] = value.split('|');
        setSelectedCategory(cat);
        setSelectedVariety(var);
        handleCommoditySelect(cat, var);
      }}>
        <SelectTrigger>Select Commodity</SelectTrigger>
        <SelectContent>
          <SelectItem value="Vegetables|Tomato">Tomato</SelectItem>
          <SelectItem value="Fruits|Mango">Mango</SelectItem>
          {/* ... more options */}
        </SelectContent>
      </Select>

      {cropBatchId && (
        <div className="crop-batch-id-display">
          <Label>Crop Batch ID</Label>
          <Input value={cropBatchId} readOnly />
          <Button onClick={() => navigator.clipboard.writeText(cropBatchId)}>
            Copy ID
          </Button>
        </div>
      )}
    </div>
  );
};
```

---

## 📝 2. Multi-Stage History Tracking

```typescript
const ProvenanceTracker = () => {
  const [currentStage, setCurrentStage] = useState('planting');
  const [stageData, setStageData] = useState({});

  // Planting Stage
  const handlePlantingStage = async (formData: any) => {
    try {
      const producerId = localStorage.getItem('producer_id') || '1';
      
      await ProvenanceAPI.addCropBatchHistory(cropBatchId, {
        stage: 'planting',
        eventType: 'seeds_planted',
        description: `Planted ${formData.seeds} ${selectedVariety} seeds`,
        data: {
          seeds: formData.seeds,
          seedVariety: formData.seedVariety,
          soilType: formData.soilType,
          weather: formData.weather,
          temperature: formData.temperature
        },
        createdBy: producerId
      });

      toast.success('Planting stage recorded!');
      setCurrentStage('growing');
      
    } catch (error) {
      console.error('Failed to record planting:', error);
      toast.error('Failed to record planting stage');
    }
  };

  // Growing Stage
  const handleGrowingStage = async (formData: any) => {
    try {
      const producerId = localStorage.getItem('producer_id') || '1';
      
      await ProvenanceAPI.addCropBatchHistory(cropBatchId, {
        stage: 'growing',
        eventType: 'fertilizer_applied',
        description: `Applied ${formData.quantity} of ${formData.fertilizer}`,
        data: {
          fertilizer: formData.fertilizer,
          quantity: formData.quantity,
          method: formData.method,
          irrigation: formData.irrigation
        },
        createdBy: producerId
      });

      toast.success('Growing stage recorded!');
      setCurrentStage('harvesting');
      
    } catch (error) {
      console.error('Failed to record growing:', error);
      toast.error('Failed to record growing stage');
    }
  };

  // Harvesting Stage
  const handleHarvestingStage = async (formData: any) => {
    try {
      const producerId = localStorage.getItem('producer_id') || '1';
      
      await ProvenanceAPI.addCropBatchHistory(cropBatchId, {
        stage: 'harvesting',
        eventType: 'harvest_completed',
        description: `Harvested ${formData.actualQuantity}kg of ${selectedVariety}`,
        data: {
          harvestDate: formData.harvestDate,
          actualQuantity: formData.actualQuantity,
          unit: 'kg',
          harvestMethod: formData.harvestMethod,
          weather: formData.weather,
          cropsLoss: formData.cropsLoss || 0
        },
        createdBy: producerId
      });

      toast.success('Harvesting stage recorded!');
      setCurrentStage('grading');
      
    } catch (error) {
      console.error('Failed to record harvesting:', error);
      toast.error('Failed to record harvesting stage');
    }
  };

  // Grading Stage
  const handleGradingStage = async (formData: any) => {
    try {
      const producerId = localStorage.getItem('producer_id') || '1';
      
      await ProvenanceAPI.addCropBatchHistory(cropBatchId, {
        stage: 'grading',
        eventType: 'quality_graded',
        description: `Graded as ${formData.grade} quality`,
        data: {
          grade: formData.grade,
          size: formData.size,
          color: formData.color,
          texture: formData.texture,
          moisture: formData.moisture,
          brixLevel: formData.brixLevel,
          defects: formData.defects || 'None'
        },
        createdBy: producerId
      });

      toast.success('Grading stage recorded!');
      setCurrentStage('processing');
      
    } catch (error) {
      console.error('Failed to record grading:', error);
      toast.error('Failed to record grading stage');
    }
  };

  // Processing Stage
  const handleProcessingStage = async (formData: any) => {
    try {
      const producerId = localStorage.getItem('producer_id') || '1';
      
      await ProvenanceAPI.addCropBatchHistory(cropBatchId, {
        stage: 'processing',
        eventType: 'processing_completed',
        description: `${formData.processingType} completed`,
        data: {
          processingType: formData.processingType,
          equipment: formData.equipment,
          duration: formData.duration,
          rejectedQuantity: formData.rejectedQuantity || 0,
          finalQuantity: formData.finalQuantity
        },
        createdBy: producerId
      });

      toast.success('Processing stage recorded!');
      setCurrentStage('packing');
      
    } catch (error) {
      console.error('Failed to record processing:', error);
      toast.error('Failed to record processing stage');
    }
  };

  // Packing Stage
  const handlePackingStage = async (formData: any) => {
    try {
      const producerId = localStorage.getItem('producer_id') || '1';
      
      await ProvenanceAPI.addCropBatchHistory(cropBatchId, {
        stage: 'packing',
        eventType: 'packing_completed',
        description: `Packed in ${formData.numberOfBags} bags`,
        data: {
          numberOfBags: formData.numberOfBags,
          bagWeight: formData.bagWeight,
          packingDate: formData.packingDate,
          packingMethod: formData.packingMethod,
          storageConditions: formData.storageConditions,
          expiryDays: formData.expiryDays
        },
        createdBy: producerId
      });

      toast.success('Packing stage recorded!');
      setCurrentStage('tokenization');
      
    } catch (error) {
      console.error('Failed to record packing:', error);
      toast.error('Failed to record packing stage');
    }
  };

  return (
    <div>
      {/* Stage-specific forms */}
      {currentStage === 'planting' && <PlantingForm onSubmit={handlePlantingStage} />}
      {currentStage === 'growing' && <GrowingForm onSubmit={handleGrowingStage} />}
      {currentStage === 'harvesting' && <HarvestingForm onSubmit={handleHarvestingStage} />}
      {currentStage === 'grading' && <GradingForm onSubmit={handleGradingStage} />}
      {currentStage === 'processing' && <ProcessingForm onSubmit={handleProcessingStage} />}
      {currentStage === 'packing' && <PackingForm onSubmit={handlePackingStage} />}
    </div>
  );
};
```

---

## 🎨 3. NFT Tokenization + QR Code Generation

```typescript
const ProvenanceTracker = () => {
  const [tokenId, setTokenId] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [isTokenizing, setIsTokenizing] = useState(false);
  const [certifications, setCertifications] = useState([]);

  const handleTokenize = async () => {
    try {
      setIsTokenizing(true);

      // Prepare token metadata
      const metadata = {
        certifications: certifications.map(cert => ({
          type: cert.type,
          issuer: cert.issuer,
          documentUrl: cert.documentUrl,
          issueDate: cert.issueDate
        })),
        qualityReport: {
          grade: stageData.grading?.grade || 'A',
          moistureContent: stageData.grading?.moisture || 'N/A',
          pesticides: 'None detected',
          labName: 'AgriTest Labs',
          reportDate: new Date().toISOString().split('T')[0]
        },
        packingDetails: {
          numberOfBags: stageData.packing?.numberOfBags || 0,
          packingDate: stageData.packing?.packingDate || new Date().toISOString().split('T')[0],
          packingMethod: stageData.packing?.packingMethod || 'Standard',
          storageConditions: stageData.packing?.storageConditions || 'Cool and dry',
          shelfLife: `${stageData.packing?.expiryDays || 30} days`
        }
      };

      // Tokenize crop batch
      const result = await ProvenanceAPI.tokenizeCropBatch(cropBatchId, metadata);

      // Store token ID and QR code
      setTokenId(result.data.tokenId);
      setQrCodeDataUrl(result.data.qrCodeDataUrl);

      toast.success(`NFT Token Created: ${result.data.tokenId}`);
      
      // Show QR code modal
      setShowQRModal(true);

    } catch (error) {
      console.error('Tokenization failed:', error);
      toast.error('Failed to tokenize crop batch');
    } finally {
      setIsTokenizing(false);
    }
  };

  return (
    <div>
      {currentStage === 'tokenization' && (
        <Card>
          <CardHeader>
            <CardTitle>Tokenize Crop Batch</CardTitle>
            <CardDescription>
              Generate NFT Token and QR Code for verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Certification upload section */}
            <div className="certifications-section">
              <Label>Certifications (Optional)</Label>
              {/* Upload UI for certifications */}
            </div>

            <Button 
              onClick={handleTokenize} 
              disabled={isTokenizing}
              className="w-full"
            >
              {isTokenizing ? 'Generating Token...' : 'Generate NFT Token & QR Code'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* QR Code Display Modal */}
      {showQRModal && (
        <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>NFT Token & QR Code</DialogTitle>
              <DialogDescription>
                Share this QR code for verification
              </DialogDescription>
            </DialogHeader>
            
            <div className="qr-display">
              <div className="token-id">
                <Label>Token ID</Label>
                <div className="flex gap-2">
                  <Input value={tokenId} readOnly />
                  <Button 
                    size="sm" 
                    onClick={() => navigator.clipboard.writeText(tokenId)}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div className="qr-code">
                <img 
                  src={qrCodeDataUrl} 
                  alt="Crop QR Code" 
                  className="w-64 h-64 mx-auto"
                />
              </div>

              <div className="actions">
                <Button onClick={downloadQRCode}>Download QR Code</Button>
                <Button onClick={shareQRCode}>Share QR Code</Button>
                <Button onClick={downloadPDF}>Download Full Report (PDF)</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
```

---

## 📱 4. QR Code Scanning & Verification

```typescript
const QRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<TokenData | null>(null);

  const handleQRScan = async (scannedText: string) => {
    try {
      // Extract token ID from scanned URL
      // Format: https://tradie.app/verify/NFT-TRD-L5X7M2ABC123
      const tokenId = scannedText.split('/').pop() || scannedText;

      toast.info('Fetching crop history...');

      // Fetch token data (public endpoint - no auth required)
      const result = await ProvenanceAPI.getTokenData(tokenId);

      // Record the verification
      await ProvenanceAPI.verifyToken(tokenId, {
        verifiedBy: localStorage.getItem('user_id') || 'anonymous',
        verificationType: 'qr_scan',
        location: {
          address: 'Bangalore Market' // You can get this from browser geolocation
        }
      });

      setScannedData(result.data);
      setScanning(false);

      toast.success('Crop history loaded!');

    } catch (error) {
      console.error('QR scan failed:', error);
      toast.error('Invalid QR code or crop not found');
    }
  };

  return (
    <div>
      {!scanning ? (
        <Button onClick={() => setScanning(true)}>
          Scan QR Code
        </Button>
      ) : (
        <div className="qr-scanner">
          <QrReader
            delay={300}
            onError={(error) => console.error(error)}
            onScan={(data) => {
              if (data) handleQRScan(data);
            }}
            style={{ width: '100%' }}
          />
          <Button onClick={() => setScanning(false)}>Cancel</Button>
        </div>
      )}

      {/* Display scanned data */}
      {scannedData && (
        <CropHistoryDisplay data={scannedData} />
      )}
    </div>
  );
};
```

---

## 🗂️ 5. Timeline Visualization

```typescript
const CropHistoryDisplay = ({ data }: { data: TokenData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Provenance History</CardTitle>
        <CardDescription>
          Token ID: {data.tokenId}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Producer Information */}
        <div className="producer-info mb-6">
          <h3 className="font-semibold mb-2">Producer Information</h3>
          <p><strong>Name:</strong> {data.producer.name}</p>
          <p><strong>Contact:</strong> {data.producer.contact}</p>
          <p><strong>Location:</strong> {data.producer.location.district}, {data.producer.location.state}</p>
          {data.producer.certifications.length > 0 && (
            <p><strong>Certifications:</strong> {data.producer.certifications.join(', ')}</p>
          )}
        </div>

        {/* Crop Details */}
        <div className="crop-details mb-6">
          <h3 className="font-semibold mb-2">Crop Details</h3>
          <p><strong>Category:</strong> {data.category}</p>
          <p><strong>Variety:</strong> {data.variety}</p>
          <p><strong>Quality Grade:</strong> {data.qualityGrade}</p>
          <p><strong>Quantity:</strong> {data.quantity} {data.unit}</p>
        </div>

        {/* Timeline */}
        <div className="timeline">
          <h3 className="font-semibold mb-4">Complete Journey</h3>
          <div className="space-y-4">
            {data.timeline.map((event, index) => (
              <div 
                key={event.id} 
                className="timeline-event flex gap-4"
                style={{ borderLeft: `4px solid ${getStageColor(event.stage)}` }}
              >
                <div className="event-marker">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getStageColor(event.stage) }}
                  />
                </div>
                <div className="event-content flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge 
                        style={{ backgroundColor: getStageColor(event.stage) }}
                      >
                        {getStageDisplayName(event.stage)}
                      </Badge>
                      <p className="font-medium mt-2">{event.description}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {/* Event details */}
                  {Object.keys(event.data).length > 0 && (
                    <div className="mt-2 text-sm">
                      {Object.entries(event.data).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {String(value)}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="stats mt-6">
          <h3 className="font-semibold mb-2">Statistics</h3>
          <p><strong>Total Events:</strong> {data.stats.totalEvents}</p>
          <p><strong>Stages:</strong> {data.stats.stages.join(' → ')}</p>
          {data.stats.daysFromPlantingToHarvest && (
            <p>
              <strong>Days from Planting to Harvest:</strong>{' '}
              {data.stats.daysFromPlantingToHarvest} days
            </p>
          )}
        </div>

        {/* Certifications */}
        {data.metadata.certifications && data.metadata.certifications.length > 0 && (
          <div className="certifications mt-6">
            <h3 className="font-semibold mb-2">Certifications</h3>
            {data.metadata.certifications.map((cert, idx) => (
              <div key={idx} className="cert-card p-3 border rounded mb-2">
                <p><strong>{cert.type}</strong></p>
                <p className="text-sm">Issued by: {cert.issuer}</p>
                {cert.issueDate && (
                  <p className="text-sm">Date: {cert.issueDate}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="actions mt-6 flex gap-2">
          <Button onClick={() => downloadPDF(data)}>
            Download Full Report
          </Button>
          <Button variant="outline" onClick={() => shareHistory(data)}>
            Share History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
```

---

## 📊 6. Producer Dashboard Statistics

```typescript
const ProducerDashboard = () => {
  const [stats, setStats] = useState<ProvenanceStats | null>(null);
  const [batches, setBatches] = useState<CropBatch[]>([]);
  const producerId = localStorage.getItem('producer_id') || '1';

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load statistics
      const statsResult = await ProvenanceAPI.getProvenanceStats(producerId);
      setStats(statsResult.data);

      // Load recent batches
      const batchesResult = await ProvenanceAPI.getProducerCropBatches(
        producerId,
        { limit: 10, offset: 0, status: 'active' }
      );
      setBatches(batchesResult.data);

    } catch (error) {
      console.error('Failed to load dashboard:', error);
    }
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      {/* Statistics Cards */}
      <div className="stats-grid grid grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{stats.totalBatches}</CardTitle>
            <CardDescription>Total Crop Batches</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{stats.tokenizedBatches}</CardTitle>
            <CardDescription>Tokenized Batches</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{stats.totalScans}</CardTitle>
            <CardDescription>Total QR Scans</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {((stats.tokenizedBatches / stats.totalBatches) * 100).toFixed(0)}%
            </CardTitle>
            <CardDescription>Tokenization Rate</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>By Category</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(stats.byCategory).map(([category, count]) => (
            <div key={category} className="flex justify-between py-2">
              <span>{category}</span>
              <Badge>{count}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Batches */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Recent Crop Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Variety</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((batch) => (
                <TableRow key={batch.cropBatchId}>
                  <TableCell>{batch.cropBatchId}</TableCell>
                  <TableCell>{batch.variety}</TableCell>
                  <TableCell>
                    <Badge style={{ backgroundColor: getStageColor(batch.currentStage) }}>
                      {getStageDisplayName(batch.currentStage)}
                    </Badge>
                  </TableCell>
                  <TableCell>{batch.status}</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => viewBatch(batch.cropBatchId)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
```

---

## 🎯 Summary

You now have **complete integration examples** for:

✅ **Commodity Selection** → Create Crop Batch with unique ID  
✅ **Multi-Stage Tracking** → Add history entries for each stage  
✅ **NFT Tokenization** → Generate token and QR code  
✅ **QR Scanning** → Retrieve and display full crop history  
✅ **Timeline Visualization** → Show complete journey  
✅ **Dashboard Statistics** → Display provenance analytics  

**Copy and adapt these examples into your ProvenanceTracker.tsx component!**

All API calls use the ProvenanceAPI service for type-safe, consistent integration with your backend.
