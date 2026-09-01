import React, { useState } from 'react';
import { GradingCompletionScreen } from './GradingCompletionScreen';
import { CreateLotsScreen } from './CreateLotsScreen';
import { LotsOverviewScreen } from './LotsOverviewScreen';
import { TokenizationProcessScreen } from './TokenizationProcessScreen';
import { TokenDetailsVerificationScreen } from './TokenDetailsVerificationScreen';
import { BuyerVerificationView } from './BuyerVerificationView';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type Screen = 
  | 'grading'
  | 'create-lots'
  | 'lots-overview'
  | 'tokenization'
  | 'verification'
  | 'buyer-view';

interface Lot {
  id: string;
  quality: string;
  quantity: number;
  description: string;
  notes: string;
  tokenizationStatus?: 'not_started' | 'in_progress' | 'completed' | 'failed';
  tokenId?: string;
}

export const LotManagementWireframes: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('grading');
  const [lots, setLots] = useState<Lot[]>([]);
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [tokenData, setTokenData] = useState<any>(null);
  const [mode, setMode] = useState<'producer' | 'buyer'>('producer');

  // Mock batch data
  const batchData = {
    batchId: 'BTH-2025-001234',
    commodity: 'Wheat',
    totalQuantity: 5000,
    gradingDate: '2025-10-22',
    location: 'Punjab, India',
    grades: [
      { grade: 'A', quantity: 2000, percentage: 40, available: 2000 },
      { grade: 'B', quantity: 2500, percentage: 50, available: 2500 },
      { grade: 'C', quantity: 500, percentage: 10, available: 500 },
    ],
  };

  const handleCreateLots = () => {
    setCurrentScreen('create-lots');
  };

  const handleProceedToTokenization = (newLots: Lot[]) => {
    setLots(newLots);
    setCurrentScreen('lots-overview');
  };

  const handleInitiateTokenization = (lotId: string) => {
    const lot = lots.find((l) => l.id === lotId);
    if (lot) {
      setSelectedLot(lot);
      // Update lot status to in_progress
      setLots((prevLots) =>
        prevLots.map((l) =>
          l.id === lotId ? { ...l, tokenizationStatus: 'in_progress' } : l
        )
      );
      setCurrentScreen('tokenization');
    }
  };

  const handleTokenizationComplete = (data: any) => {
    setTokenData(data);
    // Update lot status to completed
    if (selectedLot) {
      setLots((prevLots) =>
        prevLots.map((l) =>
          l.id === selectedLot.id
            ? { ...l, tokenizationStatus: 'completed', tokenId: data.tokenId }
            : l
        )
      );
    }
    setCurrentScreen('verification');
  };

  const handleSaveAndPublish = (details: any) => {
    // In a real app, this would save to the backend
    console.log('Publishing token details:', details);
    setCurrentScreen('lots-overview');
  };

  const handleViewDetails = (lotId: string) => {
    const lot = lots.find((l) => l.id === lotId);
    if (lot && lot.tokenId) {
      setSelectedLot(lot);
      // Navigate to buyer view with the token
      setCurrentScreen('buyer-view');
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'grading':
        return (
          <GradingCompletionScreen
            onCreateLots={handleCreateLots}
            batchData={batchData}
          />
        );

      case 'create-lots':
        return (
          <CreateLotsScreen
            onProceedToTokenization={handleProceedToTokenization}
            onBack={() => setCurrentScreen('grading')}
            batchId={batchData.batchId}
            availableGrades={batchData.grades.map((g) => ({
              grade: g.grade,
              available: g.available,
            }))}
          />
        );

      case 'lots-overview':
        return (
          <LotsOverviewScreen
            lots={lots}
            onInitiateTokenization={handleInitiateTokenization}
            onViewDetails={handleViewDetails}
            onBack={() => setCurrentScreen('create-lots')}
            batchId={batchData.batchId}
            globalBatchId="GBL-2025-WHEAT-001234"
          />
        );

      case 'tokenization':
        return selectedLot ? (
          <TokenizationProcessScreen
            lotId={selectedLot.id}
            onComplete={handleTokenizationComplete}
            onBack={() => setCurrentScreen('lots-overview')}
            lotData={selectedLot}
          />
        ) : null;

      case 'verification':
        return tokenData && selectedLot ? (
          <TokenDetailsVerificationScreen
            tokenData={tokenData}
            onSaveAndPublish={handleSaveAndPublish}
            onBack={() => setCurrentScreen('tokenization')}
            lotData={selectedLot}
          />
        ) : null;

      case 'buyer-view':
        return (
          <BuyerVerificationView
            tokenId={selectedLot?.tokenId}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Mode Switcher - For demo purposes */}
      <div className="fixed top-4 right-4 z-50">
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-gray-600 mb-2">Demo Mode:</p>
          <Tabs value={mode} onValueChange={(v) => setMode(v as 'producer' | 'buyer')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="producer"
                onClick={() => setCurrentScreen('grading')}
              >
                Producer
              </TabsTrigger>
              <TabsTrigger
                value="buyer"
                onClick={() => setCurrentScreen('buyer-view')}
              >
                Buyer
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>
      </div>

      {/* Navigation Breadcrumb - For demo purposes */}
      <div className="fixed top-4 left-4 z-50">
        <Card className="p-3 bg-white shadow-lg">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={currentScreen === 'grading' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('grading')}
              style={currentScreen === 'grading' ? { backgroundColor: '#FFD700', color: 'white' } : {}}
            >
              1. Grading
            </Button>
            <Button
              size="sm"
              variant={currentScreen === 'create-lots' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('create-lots')}
              style={currentScreen === 'create-lots' ? { backgroundColor: '#FFD700', color: 'white' } : {}}
              disabled={lots.length === 0 && currentScreen !== 'create-lots'}
            >
              2. Create Lots
            </Button>
            <Button
              size="sm"
              variant={currentScreen === 'lots-overview' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('lots-overview')}
              style={currentScreen === 'lots-overview' ? { backgroundColor: '#FFD700', color: 'white' } : {}}
              disabled={lots.length === 0}
            >
              3. Overview
            </Button>
            <Button
              size="sm"
              variant={currentScreen === 'tokenization' ? 'default' : 'outline'}
              onClick={() => {
                if (selectedLot) setCurrentScreen('tokenization');
              }}
              style={currentScreen === 'tokenization' ? { backgroundColor: '#FFD700', color: 'white' } : {}}
              disabled={!selectedLot}
            >
              4. Tokenize
            </Button>
            <Button
              size="sm"
              variant={currentScreen === 'verification' ? 'default' : 'outline'}
              onClick={() => {
                if (tokenData) setCurrentScreen('verification');
              }}
              style={currentScreen === 'verification' ? { backgroundColor: '#FFD700', color: 'white' } : {}}
              disabled={!tokenData}
            >
              5. Verify
            </Button>
            <Button
              size="sm"
              variant={currentScreen === 'buyer-view' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('buyer-view')}
              style={currentScreen === 'buyer-view' ? { backgroundColor: '#003E6D', color: 'white' } : {}}
            >
              Buyer View
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="pt-20">
        {renderCurrentScreen()}
      </div>
    </div>
  );
};
