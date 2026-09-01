import React, { useState } from 'react';
import { StorageSellDecisionScreen } from './StorageSellDecisionScreen';
import { StorageFacilitySelectionScreen } from './StorageFacilitySelectionScreen';
import { MarketplaceAgentBrowsingScreen } from './MarketplaceAgentBrowsingScreen';
import { CommodityListingScreen } from './CommodityListingScreen';
import { ChatScreen } from './ChatScreen';
import { CommissionAgentEngagementScreen } from './CommissionAgentEngagementScreen';
import { OrderConfirmationVerificationScreen } from './OrderConfirmationVerificationScreen';
import { GrokAIQualityAssessmentScreen } from './GrokAIQualityAssessmentScreen';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type Screen =
  | 'decision'
  | 'storage'
  | 'marketplace'
  | 'listing'
  | 'chat'
  | 'agent'
  | 'confirmation'
  | 'ai-assessment';

export const PostTokenizationFlowWireframes: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('decision');
  const [mode, setMode] = useState<'producer' | 'demo'>('producer');
  const [selectedPath, setSelectedPath] = useState<'store' | 'sell' | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [listing, setListing] = useState<any>(null);

  // Mock data
  const lotData = {
    id: 'LOT-001',
    tokenId: 'TKN-LOT-001-1729584000000',
    quality: 'A',
    quantity: 1000,
    commodity: 'Wheat',
  };

  const mockAgent = {
    id: 'AGT-001',
    name: 'Rajesh Sharma',
    company: 'PSR & Co',
    rating: 4.9,
    successfulDeals: 342,
    commission: 2.5,
    specialties: ['Wheat', 'Rice'],
    services: ['Direct Sale Assistance', 'Representation for Sale'],
  };

  const mockOrderDetails = {
    orderId: 'ORD-2025-001234',
    commodity: 'Wheat',
    quantity: 1000,
    qualityGrade: 'A',
    agreedPrice: 2900,
    buyer: {
      name: 'Amit Singh',
      company: 'Golden Harvest Traders',
      verified: true,
    },
    agent: {
      name: 'Rajesh Sharma',
      company: 'PSR & Co',
    },
    deliveryDate: '2025-11-15',
  };

  const mockChatWith = {
    name: 'Amit Singh',
    type: 'buyer' as const,
    virtualPhone: '+91-XXXX-XX-1234',
    verified: true,
  };

  const handleStoreDecision = () => {
    setSelectedPath('store');
    setCurrentScreen('storage');
  };

  const handleSellDecision = () => {
    setSelectedPath('sell');
    setCurrentScreen('marketplace');
  };

  const handleSelectFacility = (facility: any) => {
    setSelectedFacility(facility);
    console.log('Selected facility:', facility);
    setCurrentScreen('decision');
  };

  const handleContactMarketplace = (marketplace: any) => {
    console.log('Contacting marketplace:', marketplace);
    setCurrentScreen('listing');
  };

  const handleEngageAgent = (agent: any) => {
    setSelectedAgent(agent);
    setCurrentScreen('agent');
  };

  const handleListForSale = (listingData: any) => {
    setListing(listingData);
    console.log('Listing created:', listingData);
    setCurrentScreen('chat');
  };

  const handleRequestContact = () => {
    console.log('Contact exchange requested');
  };

  const handleConfirmEngagement = (type: 'direct' | 'representation', otp: string) => {
    console.log('Agent engaged:', type, otp);
    setCurrentScreen('confirmation');
  };

  const handleConfirmOrder = (otp: string, hasMedia: boolean) => {
    console.log('Order confirmed:', otp, hasMedia);
    if (hasMedia) {
      setCurrentScreen('ai-assessment');
    } else {
      setCurrentScreen('decision');
    }
  };

  const handleCaptureMedia = () => {
    setCurrentScreen('ai-assessment');
  };

  const handleApproveAI = (results: any) => {
    console.log('AI results approved:', results);
    setCurrentScreen('decision');
  };

  const handleRejectAI = () => {
    console.log('AI results rejected');
    setCurrentScreen('confirmation');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'decision':
        return (
          <StorageSellDecisionScreen
            onStore={handleStoreDecision}
            onSell={handleSellDecision}
            onBack={() => console.log('Back to tokenization')}
            lotData={lotData}
          />
        );

      case 'storage':
        return (
          <StorageFacilitySelectionScreen
            onSelectFacility={handleSelectFacility}
            onBack={() => setCurrentScreen('decision')}
            lotData={{ quantity: lotData.quantity }}
          />
        );

      case 'marketplace':
        return (
          <MarketplaceAgentBrowsingScreen
            onContactMarketplace={handleContactMarketplace}
            onEngageAgent={handleEngageAgent}
            onBack={() => setCurrentScreen('decision')}
          />
        );

      case 'listing':
        return (
          <CommodityListingScreen
            onListForSale={handleListForSale}
            onBack={() => setCurrentScreen('marketplace')}
            lotData={lotData}
          />
        );

      case 'chat':
        return (
          <ChatScreen
            chatWith={mockChatWith}
            onRequestContact={handleRequestContact}
            onBack={() => setCurrentScreen('listing')}
          />
        );

      case 'agent':
        return (
          <CommissionAgentEngagementScreen
            agent={selectedAgent || mockAgent}
            onConfirmEngagement={handleConfirmEngagement}
            onBack={() => setCurrentScreen('marketplace')}
          />
        );

      case 'confirmation':
        return (
          <OrderConfirmationVerificationScreen
            orderDetails={mockOrderDetails}
            onConfirmOrder={handleConfirmOrder}
            onCaptureMedia={handleCaptureMedia}
            onBack={() => setCurrentScreen('agent')}
          />
        );

      case 'ai-assessment':
        return (
          <GrokAIQualityAssessmentScreen
            onApprove={handleApproveAI}
            onReject={handleRejectAI}
            onBack={() => setCurrentScreen('confirmation')}
            productData={{
              name: lotData.commodity,
              grade: lotData.quality,
              quantity: lotData.quantity,
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Demo Mode Switcher - For demo purposes */}
      <div className="fixed top-4 right-4 z-50">
        <Card className="p-4 bg-white shadow-lg">
          <p className="text-sm text-gray-600 mb-2">Demo Mode:</p>
          <Tabs value={mode} onValueChange={(v) => setMode(v as 'producer' | 'demo')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="producer">Producer</TabsTrigger>
              <TabsTrigger value="demo">Demo</TabsTrigger>
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
              variant={currentScreen === 'decision' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('decision')}
              style={currentScreen === 'decision' ? { backgroundColor: '#FFD700', color: 'white' } : {}}
            >
              1. Decision
            </Button>
            <Button
              size="sm"
              variant={currentScreen === 'storage' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('storage')}
              style={currentScreen === 'storage' ? { backgroundColor: '#FFD700', color: 'white' } : {}}
            >
              2. Storage
            </Button>
            <Button
              size="sm"
              variant={currentScreen === 'marketplace' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('marketplace')}
              style={currentScreen === 'marketplace' ? { backgroundColor: '#FFD700', color: 'white' } : {}}
            >
              3. Marketplace
            </Button>
            <Button
              size="sm"
              variant={currentScreen === 'listing' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('listing')}
              style={currentScreen === 'listing' ? { backgroundColor: '#FFD700', color: 'white' } : {}}
            >
              4. Listing
            </Button>
            <Button
              size="sm"
              variant={currentScreen === 'chat' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('chat')}
              style={currentScreen === 'chat' ? { backgroundColor: '#FFD700', color: 'white' } : {}}
            >
              5. Chat
            </Button>
            <Button
              size="sm"
              variant={currentScreen === 'agent' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('agent')}
              style={currentScreen === 'agent' ? { backgroundColor: '#FFD700', color: 'white' } : {}}
            >
              6. Agent
            </Button>
            <Button
              size="sm"
              variant={currentScreen === 'confirmation' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('confirmation')}
              style={currentScreen === 'confirmation' ? { backgroundColor: '#FFD700', color: 'white' } : {}}
            >
              7. Order
            </Button>
            <Button
              size="sm"
              variant={currentScreen === 'ai-assessment' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('ai-assessment')}
              style={currentScreen === 'ai-assessment' ? { backgroundColor: '#003E6D', color: 'white' } : {}}
            >
              8. AI Check
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
