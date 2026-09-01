import React, { useState } from 'react';
import {
  Sprout, BookOpen, ShoppingCart, Truck, MapPin, Gavel, FlaskConical,
  Scale, LayoutDashboard, CheckCircle, Circle, ChevronRight, ArrowLeft,
  Home, User, Activity, DollarSign, Package, QrCode, Shield, Warehouse,
  TrendingUp, History, Brain, Leaf, ChevronDown, ChevronUp,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { BeautifulButton, ButtonGroup } from '../ui/beautiful-buttons';
import { Progress } from '../ui/progress';
import { cn } from '../ui/utils';

// ── Existing flow screens ──────────────────────────────────────────────────
import CropSelectionWithAI from './CropSelectionWithAI';
import CropJournalingTokenization from './CropJournalingTokenization';
import HarvestCommodityListing from './HarvestCommodityListing';
import TransportBooking from './TransportBooking';
import DestinationReceiving from './DestinationReceiving';
import MarketDisplayAuction from './MarketDisplayAuction';
import SamplingQualityCheck from './SamplingQualityCheck';
import WeighingConfirmation from './WeighingConfirmation';
import { ProducerAIDashboardComplete } from '../ProducerAIDashboardComplete';

// ── Additional producer capability screens ────────────────────────────────
import { ProducerProfile } from './ProducerProfile';
import { ActivityLoggerEnhanced } from './ActivityLoggerEnhanced';
import { InputCostTrackerEnhanced } from './InputCostTrackerEnhanced';
import { CropHealthMonitor } from './CropHealthMonitor';
import { CreateLotWorkflow } from './CreateLotWorkflow';
import { GradingCompletionScreen } from './GradingCompletionScreen';
import { EnhancedQualityCheckWithAI } from './EnhancedQualityCheckWithAI';
import ProvenanceTracker from './ProvenanceTracker';
import LotCreationTokenizationWorkflow from './LotCreationTokenizationWorkflow';
import { StorageSellDecisionScreen } from './StorageSellDecisionScreen';
import { EnhancedStorageSelectionScreen } from './EnhancedStorageSelectionScreen';
import { CommissionAgentEngagementScreen } from './CommissionAgentEngagementScreen';
import { MarketplaceAgentBrowsingScreen } from './MarketplaceAgentBrowsingScreen';
import MatchmakingScreen from './MatchmakingScreen';
import { BuyerVerificationView } from './BuyerVerificationView';
import { OrderConfirmationVerificationScreen } from './OrderConfirmationVerificationScreen';

// ── Phase groups ───────────────────────────────────────────────────────────

const PHASES = [
  { id: 'setup',       label: '① Setup',          color: '#6366F1' },
  { id: 'farm',        label: '② Farm & Crops',    color: '#10B981' },
  { id: 'harvest',     label: '③ Harvest & Lot',   color: '#F59E0B' },
  { id: 'quality',     label: '④ Quality',          color: '#8B5CF6' },
  { id: 'decision',    label: '⑤ Store / Sell',    color: '#EF4444' },
  { id: 'selling',     label: '⑥ Selling',          color: '#F97316' },
  { id: 'transaction', label: '⑦ Transaction',     color: '#0EA5E9' },
  { id: 'complete',    label: '⑧ Complete',         color: '#22C55E' },
];

// ── Types ──────────────────────────────────────────────────────────────────

type FlowStage =
  // Phase 1: Setup
  | 'dashboard'
  | 'profile'
  // Phase 2: Farm & Crops
  | 'crop-selection'
  | 'activities'
  | 'input-cost'
  | 'crop-journaling'
  | 'crop-health'
  // Phase 3: Harvest & Lot
  | 'harvest-listing'
  | 'lot-management'
  // Phase 4: Quality & Traceability
  | 'sampling-quality'
  | 'ai-quality'
  | 'grading'
  | 'traceability'
  | 'tokenization'
  // Phase 5: Store or Sell
  | 'storage-sell-decision'
  | 'storage'
  | 'commission-agent'
  // Phase 6: Selling (sell path only)
  | 'marketplace-browse'
  | 'matchmaking'
  | 'buyer-verification'
  | 'order-confirmation'
  // Phase 7: Transaction
  | 'market-auction'
  | 'transport-booking'
  | 'destination-receiving'
  | 'weighing-confirmation'
  // Phase 8
  | 'complete';

interface FlowStep {
  id: FlowStage;
  title: string;
  description: string;
  icon: React.ElementType;
  phase: string;
  completed: boolean;
  optional?: boolean;
}

interface ProducerData {
  producerId: string;
  name: string;
  profileData?: any;
  cropSelection?: any;
  activities?: any[];
  costData?: any;
  journalData?: any;
  commodityListing?: any;
  lotData?: any;
  qualityCheck?: any;
  aiQuality?: any;
  provenanceData?: any;
  tokenData?: any;
  sellPath?: 'store' | 'sell';
  storageData?: any;
  agentData?: any;
  transportBooking?: any;
  receivingConfirmation?: any;
  auctionData?: any;
  weighingData?: any;
  marketplaceData?: any;
  orderData?: any;
}

interface ProducerMasterFlowNavigatorProps {
  onBack?: () => void;
}

// ── Utility: Stage Wrapper ─────────────────────────────────────────────────
// For components that don't expose onBack/onComplete props themselves.

const StageWrapper: React.FC<{
  onBack: () => void;
  onContinue: () => void;
  continueLabel?: string;
  children: React.ReactNode;
}> = ({ onBack, onContinue, continueLabel = 'Save & Continue', children }) => (
  <div className="relative min-h-screen">
    {/* Sticky nav bar */}
    <div
      className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-sm"
      style={{ backgroundColor: 'rgba(255,255,255,0.97)', borderBottom: '1px solid #E5E7EB' }}
    >
      <BeautifulButton variant="outline" size="sm" icon={ArrowLeft} onClick={onBack}>
        Back
      </BeautifulButton>
      <BeautifulButton variant="gradient" size="sm" icon={ChevronRight} onClick={onContinue}>
        {continueLabel}
      </BeautifulButton>
    </div>
    {children}
  </div>
);

// ── Mock commission agent ──────────────────────────────────────────────────
const MOCK_AGENT = {
  id: 'CA-001',
  name: 'Arjun Mehta',
  company: 'Mehta Agri Commission',
  rating: 4.8,
  successfulDeals: 342,
  commission: 2.5,
  specialties: ['Wheat', 'Rice', 'Pulses'],
  services: ['Market access', 'Transport assistance', 'Storage links', 'Finance'],
};

// ══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════

const ProducerMasterFlowNavigator: React.FC<ProducerMasterFlowNavigatorProps> = ({ onBack }) => {
  const [currentStage, setCurrentStage] = useState<FlowStage>('dashboard');
  const [completedStages, setCompletedStages] = useState<FlowStage[]>([]);
  const [producerData, setProducerData] = useState<ProducerData>({
    producerId: 'PROD-2025-001',
    name: 'Rajesh Kumar',
  });
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    setup: true, farm: true, harvest: true, quality: true,
    decision: true, transaction: true, complete: true,
  });

  // ── Flow step definitions ────────────────────────────────────────────────

  const flowSteps: FlowStep[] = [
    // Phase 1
    { id: 'dashboard',    title: 'Dashboard',           description: 'AI overview & quick actions',   icon: LayoutDashboard, phase: 'setup',       completed: completedStages.includes('dashboard') },
    { id: 'profile',      title: 'Producer Profile',    description: 'Identity & documents',          icon: User,            phase: 'setup',       completed: completedStages.includes('profile') },
    // Phase 2
    { id: 'crop-selection',  title: 'Crop Selection',   description: 'AI-powered recommendations',   icon: Sprout,          phase: 'farm',        completed: completedStages.includes('crop-selection') },
    { id: 'activities',      title: 'Log Activities',   description: 'Ploughing, irrigation, etc.',  icon: Activity,        phase: 'farm',        completed: completedStages.includes('activities') },
    { id: 'input-cost',      title: 'Input & Cost',     description: 'Cost tracking by activity',    icon: DollarSign,      phase: 'farm',        completed: completedStages.includes('input-cost') },
    { id: 'crop-journaling', title: 'Crop Lifecycle',   description: 'Monitor & journal progress',   icon: BookOpen,        phase: 'farm',        completed: completedStages.includes('crop-journaling') },
    { id: 'crop-health',     title: 'Crop Health & AI', description: 'AI-powered health monitoring', icon: Leaf,            phase: 'farm',        completed: completedStages.includes('crop-health') },
    // Phase 3
    { id: 'harvest-listing', title: 'Harvest & Listing', description: 'Record harvest & lots',       icon: ShoppingCart,    phase: 'harvest',     completed: completedStages.includes('harvest-listing') },
    { id: 'lot-management',  title: 'Lot Management',   description: 'Create & manage lots',         icon: Package,         phase: 'harvest',     completed: completedStages.includes('lot-management') },
    // Phase 4
    { id: 'sampling-quality', title: 'Sampling & Quality', description: 'Quality verification',      icon: FlaskConical,    phase: 'quality',     completed: completedStages.includes('sampling-quality') },
    { id: 'ai-quality',      title: 'AI Quality Check', description: 'Grok AI assessment',          icon: Brain,           phase: 'quality',     completed: completedStages.includes('ai-quality') },
    { id: 'grading',         title: 'Grading',          description: 'Final lot grading & grades',   icon: Scale,           phase: 'quality',     completed: completedStages.includes('grading') },
    { id: 'traceability',    title: 'QR & Provenance',  description: 'NFT traceability record',      icon: QrCode,          phase: 'quality',     completed: completedStages.includes('traceability') },
    { id: 'tokenization',    title: 'Tokenization',     description: 'Digital lot identity',         icon: Shield,          phase: 'quality',     completed: completedStages.includes('tokenization') },
    // Phase 5
    { id: 'storage-sell-decision', title: 'Store or Sell',  description: 'Choose your path',         icon: Leaf,            phase: 'decision',    completed: completedStages.includes('storage-sell-decision') },
    { id: 'storage',               title: 'Storage',         description: 'Storage facility selection', icon: Warehouse,     phase: 'decision',    completed: completedStages.includes('storage'), optional: true },
    // Phase 6: Selling (sell path: Marketplace → Matchmaking → Agent → Buyer → Order)
    { id: 'marketplace-browse',    title: 'Marketplace',     description: 'Browse markets & agents',    icon: ShoppingCart,   phase: 'selling',     completed: completedStages.includes('marketplace-browse'), optional: true },
    { id: 'matchmaking',           title: 'Matchmaking',     description: 'Match with buyers',           icon: Gavel,          phase: 'selling',     completed: completedStages.includes('matchmaking'), optional: true },
    { id: 'commission-agent',      title: 'Commission Agent', description: 'Agent engagement & deal',   icon: TrendingUp,     phase: 'selling',     completed: completedStages.includes('commission-agent'), optional: true },
    { id: 'buyer-verification',    title: 'Buyer Verification', description: 'Verify buyer token',      icon: Shield,         phase: 'selling',     completed: completedStages.includes('buyer-verification'), optional: true },
    { id: 'order-confirmation',    title: 'Order Confirmation', description: 'OTP & media confirmation', icon: CheckCircle,  phase: 'selling',     completed: completedStages.includes('order-confirmation'), optional: true },
    // Phase 7: Transaction
    { id: 'market-auction',    title: 'Market & Auction', description: 'Live bidding & price',        icon: Gavel,           phase: 'transaction', completed: completedStages.includes('market-auction') },
    { id: 'transport-booking', title: 'Transport',      description: 'Arrange logistics',            icon: Truck,           phase: 'transaction', completed: completedStages.includes('transport-booking') },
    { id: 'destination-receiving', title: 'Destination', description: 'OTP confirmation',           icon: MapPin,          phase: 'transaction', completed: completedStages.includes('destination-receiving') },
    { id: 'weighing-confirmation', title: 'Weighing & Settlement', description: 'Final payment',    icon: Scale,           phase: 'transaction', completed: completedStages.includes('weighing-confirmation') },
    // Phase 7
    { id: 'complete',        title: 'Complete',         description: 'History & AI intelligence',   icon: CheckCircle,     phase: 'complete',    completed: completedStages.includes('complete') },
  ];

  const totalSteps = flowSteps.filter(s => s.id !== 'complete').length;
  const progress = (completedStages.filter(s => s !== 'complete').length / totalSteps) * 100;

  // ── Navigation handlers ─────────────────────────────────────────────────

  const handleStageComplete = (stage: FlowStage, data?: any) => {
    if (!completedStages.includes(stage)) {
      setCompletedStages(prev => [...prev, stage]);
    }
    if (data) {
      setProducerData(prev => ({ ...prev, ...data }));
    }
    // Store path: after storage, skip sell-only stages → go straight to complete
    if (stage === 'storage' && producerData.sellPath === 'store') {
      setCurrentStage('complete');
      return;
    }
    // Sell path: after order-confirmation skip directly to market-auction
    if (stage === 'order-confirmation') {
      setCurrentStage('market-auction');
      return;
    }
    const idx = flowSteps.findIndex(s => s.id === stage);
    if (idx < flowSteps.length - 1) {
      setCurrentStage(flowSteps[idx + 1].id);
    } else {
      setCurrentStage('complete');
    }
  };

  const handleBack = () => {
    const idx = flowSteps.findIndex(s => s.id === currentStage);
    if (idx > 0) {
      setCurrentStage(flowSteps[idx - 1].id);
    } else if (onBack) {
      onBack();
    }
  };

  const handleNavigateToStage = (stage: FlowStage) => {
    const stepIdx = flowSteps.findIndex(s => s.id === stage);
    const isAccessible = stepIdx === 0 || completedStages.includes(flowSteps[stepIdx - 1]?.id);
    if (isAccessible) setCurrentStage(stage);
  };

  const togglePhase = (phaseId: string) =>
    setExpandedPhases(prev => ({ ...prev, [phaseId]: !prev[phaseId] }));

  // ── Stage content renderer ──────────────────────────────────────────────

  const renderStageContent = () => {
    switch (currentStage) {

      // ── Phase 1: Setup ──────────────────────────────────────────────────

      case 'dashboard':
        return (
          <div className="relative">
            <ProducerAIDashboardComplete
              producerName={producerData.name}
              onBack={onBack}
            />
            {/* Begin flow CTA */}
            <div className="fixed bottom-8 right-8 z-50">
              <BeautifulButton
                variant="gradient"
                size="lg"
                icon={ChevronRight}
                onClick={() => handleStageComplete('dashboard')}
              >
                Begin Producer Flow
              </BeautifulButton>
            </div>
          </div>
        );

      case 'profile':
        return (
          <StageWrapper
            onBack={handleBack}
            onContinue={() => handleStageComplete('profile')}
            continueLabel="Profile Saved — Continue"
          >
            <ProducerProfile />
          </StageWrapper>
        );

      // ── Phase 2: Farm & Crops ───────────────────────────────────────────

      case 'crop-selection':
        return (
          <CropSelectionWithAI
            producerId={producerData.producerId}
            onComplete={(data) => handleStageComplete('crop-selection', { cropSelection: data })}
            onBack={handleBack}
          />
        );

      case 'activities':
        return (
          <StageWrapper
            onBack={handleBack}
            onContinue={() => handleStageComplete('activities')}
            continueLabel="Activities Saved — Continue"
          >
            <ActivityLoggerEnhanced
              cropId={producerData.cropSelection?.id || 'default-crop'}
              cropName={producerData.cropSelection?.name || 'My Crop'}
              onActivitiesUpdate={(activities) =>
                setProducerData(prev => ({ ...prev, activities }))
              }
            />
          </StageWrapper>
        );

      case 'input-cost':
        return (
          <StageWrapper
            onBack={handleBack}
            onContinue={() => handleStageComplete('input-cost')}
            continueLabel="Costs Saved — Continue"
          >
            <InputCostTrackerEnhanced />
          </StageWrapper>
        );

      case 'crop-journaling':
        return (
          <CropJournalingTokenization
            producerId={producerData.producerId}
            cropData={producerData.cropSelection}
            onComplete={(data) => handleStageComplete('crop-journaling', { journalData: data })}
            onBack={handleBack}
          />
        );

      case 'crop-health':
        return (
          <StageWrapper
            onBack={handleBack}
            onContinue={() => handleStageComplete('crop-health')}
            continueLabel="Health Checked — Continue"
          >
            <CropHealthMonitor />
          </StageWrapper>
        );

      // ── Phase 3: Harvest & Lot ──────────────────────────────────────────

      case 'harvest-listing':
        return (
          <HarvestCommodityListing
            producerId={producerData.producerId}
            journalData={producerData.journalData}
            onComplete={(data) => handleStageComplete('harvest-listing', { commodityListing: data })}
            onBack={handleBack}
          />
        );

      case 'lot-management':
        return (
          <StageWrapper
            onBack={handleBack}
            onContinue={() => handleStageComplete('lot-management')}
            continueLabel="Lot Created — Continue"
          >
            <CreateLotWorkflow
              onClose={() => handleStageComplete('lot-management')}
              productionData={producerData.commodityListing}
            />
          </StageWrapper>
        );

      // ── Phase 4: Quality & Traceability ────────────────────────────────

      case 'sampling-quality':
        return (
          <SamplingQualityCheck
            producerId={producerData.producerId}
            auctionData={producerData.auctionData}
            onComplete={(data) => handleStageComplete('sampling-quality', { qualityCheck: data })}
            onBack={handleBack}
          />
        );

      case 'ai-quality':
        return (
          <StageWrapper
            onBack={handleBack}
            onContinue={() => handleStageComplete('ai-quality')}
            continueLabel="AI Assessment Done — Continue"
          >
            <EnhancedQualityCheckWithAI />
          </StageWrapper>
        );

      case 'grading':
        return (
          <GradingCompletionScreen
            onCreateLots={() => handleStageComplete('grading')}
            batchData={{
              batchId: `BATCH-${producerData.producerId}-001`,
              commodity: producerData.cropSelection?.name || 'Wheat',
              totalQuantity: 500,
              gradingDate: new Date().toISOString().split('T')[0],
              location: 'Field A',
              grades: [
                { grade: 'A', quantity: 300, percentage: 60 },
                { grade: 'B', quantity: 150, percentage: 30 },
                { grade: 'C', quantity: 50,  percentage: 10 },
              ],
            }}
          />
        );

      case 'traceability':
        return (
          <StageWrapper
            onBack={handleBack}
            onContinue={() => handleStageComplete('traceability')}
            continueLabel="Traceability Recorded — Continue"
          >
            <ProvenanceTracker />
          </StageWrapper>
        );

      case 'tokenization':
        return (
          <StageWrapper
            onBack={handleBack}
            onContinue={() => handleStageComplete('tokenization')}
            continueLabel="Token Created — Continue"
          >
            <LotCreationTokenizationWorkflow />
          </StageWrapper>
        );

      // ── Phase 5: Store or Sell Decision ────────────────────────────────

      case 'storage-sell-decision':
        return (
          <StorageSellDecisionScreen
            onBack={handleBack}
            onStore={() => {
              if (!completedStages.includes('storage-sell-decision')) {
                setCompletedStages(prev => [...prev, 'storage-sell-decision']);
              }
              setProducerData(prev => ({ ...prev, sellPath: 'store' }));
              setCurrentStage('storage');
            }}
            onSell={() => {
              if (!completedStages.includes('storage-sell-decision')) {
                setCompletedStages(prev => [...prev, 'storage-sell-decision']);
              }
              setProducerData(prev => ({ ...prev, sellPath: 'sell' }));
              setCurrentStage('marketplace-browse');
            }}
            lotData={{
              id: 'LOT-2025-001',
              tokenId: 'TKN-LOT-001-' + Date.now(),
              quality: 'A',
              quantity: 500,
            }}
          />
        );

      case 'storage':
        return (
          <EnhancedStorageSelectionScreen
            onSelectFacility={(facility) => {
              setProducerData(prev => ({ ...prev, storageData: facility }));
              handleStageComplete('storage', { storageData: facility });
            }}
            onBack={handleBack}
            lotData={{
              commodity: producerData.cropSelection?.name || 'Wheat',
              quality: 'A',
              quantity: 500,
            }}
          />
        );

      case 'commission-agent':
        return (
          <CommissionAgentEngagementScreen
            agent={MOCK_AGENT}
            onConfirmEngagement={(type, otp) => {
              handleStageComplete('commission-agent', { agentData: { type, otp, agent: MOCK_AGENT } });
            }}
            onBack={handleBack}
          />
        );

      // ── Phase 6: Selling ────────────────────────────────────────────────

      case 'marketplace-browse':
        return (
          <MarketplaceAgentBrowsingScreen
            onContactMarketplace={(marketplace) => {
              setProducerData(prev => ({ ...prev, marketplaceData: marketplace }));
              handleStageComplete('marketplace-browse', { marketplaceData: marketplace });
            }}
            onEngageAgent={(agent) => {
              setProducerData(prev => ({ ...prev, agentData: agent }));
              handleStageComplete('marketplace-browse', { agentData: agent });
            }}
            onBack={handleBack}
          />
        );

      case 'matchmaking':
        return (
          <StageWrapper
            onBack={handleBack}
            onContinue={() => handleStageComplete('matchmaking')}
            continueLabel="Match Selected — Continue"
          >
            <MatchmakingScreen />
          </StageWrapper>
        );

      case 'buyer-verification':
        return (
          <StageWrapper
            onBack={handleBack}
            onContinue={() => handleStageComplete('buyer-verification')}
            continueLabel="Buyer Verified — Continue"
          >
            <BuyerVerificationView
              tokenId={producerData.tokenData?.tokenId || 'TKN-LOT-001'}
            />
          </StageWrapper>
        );

      case 'order-confirmation':
        return (
          <OrderConfirmationVerificationScreen
            orderDetails={{
              orderId: `ORD-${Date.now()}`,
              commodity: producerData.cropSelection?.name || 'Wheat',
              quantity: producerData.weighingData?.totalWeight || 500,
              qualityGrade: 'A',
              agreedPrice: 2400,
              buyer: {
                name: 'Ramesh Traders',
                company: 'Ramesh Agri Pvt Ltd',
                verified: true,
              },
              agent: producerData.agentData
                ? { name: MOCK_AGENT.name, company: MOCK_AGENT.company }
                : undefined,
              deliveryDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
            }}
            onConfirmOrder={(otp, hasMedia) => {
              handleStageComplete('order-confirmation', { orderData: { otp, hasMedia } });
            }}
            onCaptureMedia={() => {/* media capture handled inside component */}}
            onBack={handleBack}
          />
        );

      // ── Phase 7: Transaction ────────────────────────────────────────────

      case 'market-auction':
        return (
          <MarketDisplayAuction
            producerId={producerData.producerId}
            commodityData={producerData.commodityListing}
            onComplete={(data) => handleStageComplete('market-auction', { auctionData: data })}
            onBack={handleBack}
          />
        );

      case 'transport-booking':
        return (
          <TransportBooking
            producerId={producerData.producerId}
            commodityData={producerData.commodityListing}
            onComplete={(data) => handleStageComplete('transport-booking', { transportBooking: data })}
            onBack={handleBack}
          />
        );

      case 'destination-receiving':
        return (
          <DestinationReceiving
            producerId={producerData.producerId}
            transportData={producerData.transportBooking}
            onComplete={(data) => handleStageComplete('destination-receiving', { receivingConfirmation: data })}
            onBack={handleBack}
          />
        );

      case 'weighing-confirmation':
        return (
          <WeighingConfirmation
            producerId={producerData.producerId}
            qualityData={producerData.qualityCheck}
            onComplete={(data) => handleStageComplete('weighing-confirmation', { weighingData: data })}
            onBack={handleBack}
          />
        );

      // ── Phase 7: Complete ───────────────────────────────────────────────

      case 'complete':
        return (
          <CompletionScreen
            producerData={producerData}
            onReturnToDashboard={() => setCurrentStage('dashboard')}
            onStartNewCycle={() => {
              setCompletedStages([]);
              setProducerData({ producerId: 'PROD-2025-002', name: 'Rajesh Kumar' });
              setCurrentStage('crop-selection');
            }}
          />
        );

      default:
        return null;
    }
  };

  // ── Sidebar ─────────────────────────────────────────────────────────────

  const showSidebar = currentStage !== 'dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top bar when on dashboard */}
      {!showSidebar && onBack && (
        <div className="sticky top-0 z-50 bg-white/95 shadow-sm px-4 py-2 flex items-center gap-3">
          <BeautifulButton variant="outline" size="sm" icon={ArrowLeft} onClick={onBack}>
            Back to Home
          </BeautifulButton>
          <span className="text-sm text-gray-500">Producer Platform</span>
        </div>
      )}

      <div className="flex">

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        {showSidebar && (
          <div
            className="hidden md:flex w-72 bg-white border-r border-gray-200 min-h-screen flex-col"
            style={{ position: 'sticky', top: 0, maxHeight: '100vh', overflowY: 'auto' }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                {onBack && (
                  <BeautifulButton variant="outline" size="sm" icon={ArrowLeft} onClick={onBack}>
                    Exit
                  </BeautifulButton>
                )}
                <BeautifulButton variant="primary" size="sm" icon={Home} onClick={() => setCurrentStage('dashboard')}>
                  Dashboard
                </BeautifulButton>
              </div>
              <h2 className="text-base font-bold mb-1">Producer Flow</h2>
              <p className="text-xs text-gray-500">{producerData.name} · {producerData.producerId}</p>
              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">Progress</span>
                  <span className="text-gray-500">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-1.5" />
                <p className="text-xs text-gray-400 mt-1">
                  {completedStages.filter(s => s !== 'complete').length} of {totalSteps} stages
                </p>
              </div>
            </div>

            {/* Grouped steps */}
            <div className="flex-1 p-3 space-y-2">
              {PHASES.map((phase) => {
                const phaseSteps = flowSteps.filter(s => s.phase === phase.id);
                const isOpen = expandedPhases[phase.id];
                const phaseCompleted = phaseSteps.every(s => s.completed);

                return (
                  <div key={phase.id} className="rounded-lg border border-gray-100 overflow-hidden">
                    {/* Phase header */}
                    <button
                      onClick={() => togglePhase(phase.id)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold hover:bg-gray-50 transition-colors"
                      style={{ color: phase.color }}
                    >
                      <span className="flex items-center gap-1">
                        {phaseCompleted && <CheckCircle className="w-3 h-3" />}
                        {phase.label}
                      </span>
                      {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {/* Phase steps */}
                    {isOpen && (
                      <div className="divide-y divide-gray-50">
                        {phaseSteps.map((step, idx) => {
                          const Icon = step.icon;
                          const isActive = currentStage === step.id;
                          const isCompleted = step.completed;
                          const stepIdx = flowSteps.findIndex(s => s.id === step.id);
                          const isAccessible = stepIdx === 0 || completedStages.includes(flowSteps[stepIdx - 1]?.id);

                          return (
                            <button
                              key={step.id}
                              onClick={() => isAccessible && handleNavigateToStage(step.id)}
                              disabled={!isAccessible}
                              className={cn(
                                'w-full text-left px-3 py-2.5 transition-all flex items-start gap-2',
                                isActive && 'bg-blue-50 border-l-2 border-blue-500',
                                !isActive && isCompleted && 'hover:bg-green-50',
                                !isActive && !isCompleted && isAccessible && 'hover:bg-gray-50',
                                !isAccessible && 'opacity-40 cursor-not-allowed',
                              )}
                            >
                              <div className={cn(
                                'p-1 rounded-md mt-0.5 flex-shrink-0',
                                isActive && 'bg-blue-100',
                                !isActive && isCompleted && 'bg-green-100',
                                !isActive && !isCompleted && 'bg-gray-100',
                              )}>
                                {isCompleted && !isActive
                                  ? <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                                  : <Icon className={cn(
                                      'w-3.5 h-3.5',
                                      isActive ? 'text-blue-600' : 'text-gray-500',
                                    )} />
                                }
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={cn(
                                  'text-xs font-semibold truncate',
                                  isActive ? 'text-blue-700' : 'text-gray-700',
                                )}>
                                  {step.title}
                                  {step.optional && (
                                    <span className="ml-1 text-gray-400 font-normal">(opt)</span>
                                  )}
                                </p>
                                <p className="text-xs text-gray-400 truncate">{step.description}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick stats */}
            <div className="p-3 border-t border-gray-100">
              <Card className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50">
                <h4 className="text-xs font-bold mb-2 text-gray-700">Quick Stats</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Active Lots</span>
                    <Badge className="bg-blue-600 text-xs px-1.5 py-0">3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">In Transit</span>
                    <Badge className="bg-orange-500 text-xs px-1.5 py-0">1</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">At Auction</span>
                    <Badge className="bg-green-600 text-xs px-1.5 py-0">2</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Path</span>
                    <Badge
                      className="text-xs px-1.5 py-0"
                      style={{ backgroundColor: producerData.sellPath === 'store' ? '#0E7490' : '#7C3AED', color: 'white' }}
                    >
                      {producerData.sellPath === 'store' ? '🏪 Store' : producerData.sellPath === 'sell' ? '💰 Sell' : '—'}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ── Mobile progress strip ────────────────────────────────────── */}
        {showSidebar && (
          <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm px-3 py-2">
            <div className="flex items-center gap-2 mb-1">
              <BeautifulButton variant="outline" size="sm" icon={ArrowLeft} onClick={handleBack}>
                Back
              </BeautifulButton>
              <span className="text-xs font-semibold text-gray-600 flex-1 text-center truncate">
                {flowSteps.find(s => s.id === currentStage)?.title}
              </span>
              <span className="text-xs text-gray-400">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}

        {/* ── Main content ─────────────────────────────────────────────── */}
        <div className={cn('flex-1', showSidebar && 'md:overflow-auto')}>
          {/* Mobile top padding to clear the fixed strip */}
          {showSidebar && <div className="md:hidden h-14" />}
          {renderStageContent()}
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// COMPLETION SCREEN
// ══════════════════════════════════════════════════════════════════════════

interface CompletionScreenProps {
  producerData: ProducerData;
  onReturnToDashboard: () => void;
  onStartNewCycle: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({
  producerData,
  onReturnToDashboard,
  onStartNewCycle,
}) => {
  const historyItems = [
    { label: 'Activity Log', value: `${producerData.activities?.length ?? 4} entries`, icon: '📋' },
    { label: 'Crop', value: producerData.cropSelection?.name || 'Wheat Grade A', icon: '🌾' },
    { label: 'Commodity', value: producerData.commodityListing?.commodity || 'Wheat Grade A', icon: '📦' },
    { label: 'Quantity', value: `${producerData.weighingData?.totalWeight || 100} quintals`, icon: '⚖️' },
    { label: 'Final Price', value: `₹${(producerData.weighingData?.finalAmount || 240000).toLocaleString()}`, icon: '💰' },
    { label: 'Path', value: producerData.sellPath === 'store' ? 'Stored in Warehouse' : 'Sold via Agent/Market', icon: '🛤️' },
    { label: 'Payment', value: 'Processing (24-48h)', icon: '🏦' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(to bottom right, #F7FAFC, #D9F2FF)' }}>
      <Card className="max-w-2xl w-full p-8 text-center shadow-2xl">
        <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-2" style={{ color: '#003E6D' }}>🎉 Transaction Complete!</h1>
        <p className="text-gray-500 mb-8">Your full producer cycle has been completed successfully.</p>

        {/* History summary */}
        <Card className="p-5 mb-8 bg-gradient-to-br from-green-50 to-emerald-50 text-left">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <History className="w-4 h-4 text-green-600" />
            Transaction Summary & History
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {historyItems.map((item) => (
              <div key={item.label}>
                <p className="text-gray-400 text-xs">{item.icon} {item.label}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <ButtonGroup orientation="horizontal" className="justify-center flex-wrap gap-3">
          <BeautifulButton variant="gradient" size="lg" icon={LayoutDashboard} onClick={onReturnToDashboard}>
            Return to Dashboard
          </BeautifulButton>
          <BeautifulButton variant="success" size="lg" icon={Sprout} onClick={onStartNewCycle}>
            Start New Cycle
          </BeautifulButton>
        </ButtonGroup>

        <div className="mt-8 text-left">
          <h4 className="font-semibold mb-3 text-sm">Next Steps</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            {[
              'Payment credited within 24–48 hours',
              'Commission deducted automatically',
              'Transaction receipt sent to your email',
              'Quality tokens updated in your profile',
              'Activity history saved to your records',
            ].map((step) => (
              <li key={step} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                {step}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default ProducerMasterFlowNavigator;
