import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Home,
  Warehouse,
  ShoppingCart,
  MessageCircle,
  Handshake,
  FileText,
  Camera,
  Map
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

// Import all screen components
import { StorageSellDecisionScreen } from './StorageSellDecisionScreen';
import { StorageFacilitySelectionScreen } from './StorageFacilitySelectionScreen';
import { MarketplaceAgentBrowsingScreen } from './MarketplaceAgentBrowsingScreen';
import { CommodityListingScreen } from './CommodityListingScreen';
import { ChatScreen } from './ChatScreen';
import { CommissionAgentEngagementScreen } from './CommissionAgentEngagementScreen';
import { OrderConfirmationVerificationScreen } from './OrderConfirmationVerificationScreen';
import { GrokAIQualityAssessmentScreen } from './GrokAIQualityAssessmentScreen';

// Import flow configuration
import flowConfig from './CommissionAgentFlowConfig.json';

interface FlowData {
  lotId?: string;
  commodityType?: string;
  quantity?: number;
  qualityGrade?: string;
  producerId?: string;
  producerName?: string;
  producerContact?: string;
  producerLocation?: string;
  decision?: 'store' | 'sell';
  selectedFacility?: any;
  selectedAgent?: any;
  listingId?: string;
  conversationId?: any;
  engagementType?: 'direct' | 'representation';
  orderId?: string;
  assessmentId?: string;
  [key: string]: any;
}

interface CommissionAgentFlowNavigatorProps {
  initialData?: FlowData;
  onFlowComplete?: (data: FlowData) => void;
  onExit?: () => void;
}

const SCREEN_ICONS: { [key: string]: any } = {
  storage_or_sell_decision: Home,
  storage_facility_selection: Warehouse,
  marketplace_agent_browsing: Map,
  commodity_listing_sell: ShoppingCart,
  chat_screen: MessageCircle,
  commission_agent_engagement: Handshake,
  order_confirmation: FileText,
  grok_ai_quality_assessment: Camera,
};

export const CommissionAgentFlowNavigator: React.FC<CommissionAgentFlowNavigatorProps> = ({
  initialData = {},
  onFlowComplete,
  onExit,
}) => {
  const [currentScreenId, setCurrentScreenId] = useState('storage_or_sell_decision');
  const [flowData, setFlowData] = useState<FlowData>(initialData);
  const [screenHistory, setScreenHistory] = useState<string[]>([]);
  const [completedScreens, setCompletedScreens] = useState<string[]>([]);

  // Get current screen config
  const currentScreen = flowConfig.screens.find(s => s.id === currentScreenId);
  const flowProgress = (completedScreens.length / flowConfig.screens.length) * 100;

  // Navigation handler
  const navigateTo = (screenId: string, data?: Partial<FlowData>) => {
    // Add current screen to history
    setScreenHistory([...screenHistory, currentScreenId]);
    
    // Mark current screen as completed
    if (!completedScreens.includes(currentScreenId)) {
      setCompletedScreens([...completedScreens, currentScreenId]);
    }

    // Update flow data
    if (data) {
      setFlowData({ ...flowData, ...data });
    }

    // Navigate to new screen
    setCurrentScreenId(screenId);
    
    toast.success(`Navigated to ${flowConfig.screens.find(s => s.id === screenId)?.title}`);
  };

  // Back navigation
  const goBack = () => {
    if (screenHistory.length > 0) {
      const previousScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory(screenHistory.slice(0, -1));
      setCurrentScreenId(previousScreen);
    } else if (onExit) {
      onExit();
    }
  };

  // Complete flow
  const completeFlow = (finalData?: Partial<FlowData>) => {
    const completedData = { ...flowData, ...finalData };
    toast.success('Flow completed successfully!');
    if (onFlowComplete) {
      onFlowComplete(completedData);
    }
  };

  // Render current screen
  const renderCurrentScreen = () => {
    switch (currentScreenId) {
      case 'storage_or_sell_decision':
        return (
          <StorageSellDecisionScreen
            lotId={flowData.lotId || 'LOT-001'}
            commodityType={flowData.commodityType || 'Wheat'}
            quantity={flowData.quantity || 1000}
            onDecision={(decision) => {
              if (decision === 'store') {
                navigateTo('storage_facility_selection', { decision });
              } else {
                navigateTo('commodity_listing_sell', { decision });
              }
            }}
          />
        );

      case 'storage_facility_selection':
        return (
          <StorageFacilitySelectionScreen
            commodityType={flowData.commodityType || 'Wheat'}
            quantity={flowData.quantity || 1000}
            userLocation={flowData.producerLocation || 'Ludhiana, Punjab'}
            onSelectFacility={(facility) => {
              navigateTo('marketplace_agent_browsing', { selectedFacility: facility });
            }}
            onBack={goBack}
          />
        );

      case 'marketplace_agent_browsing':
        return (
          <MarketplaceAgentBrowsingScreen
            commodityType={flowData.commodityType || 'Wheat'}
            userLocation={flowData.producerLocation || 'Ludhiana, Punjab'}
            onEngageAgent={(agent) => {
              navigateTo('commission_agent_engagement', { selectedAgent: agent });
            }}
            onContactMarketplace={(marketplace) => {
              navigateTo('chat_screen', { conversationId: marketplace.id });
            }}
            onBack={goBack}
          />
        );

      case 'commodity_listing_sell':
        return (
          <CommodityListingScreen
            lotId={flowData.lotId || 'LOT-001'}
            commodityType={flowData.commodityType || 'Wheat'}
            quantity={flowData.quantity || 1000}
            qualityGrade={flowData.qualityGrade || 'A'}
            producerLocation={flowData.producerLocation || 'Ludhiana, Punjab'}
            onListingCreated={(listingId) => {
              navigateTo('chat_screen', { listingId });
            }}
            onEngageAgent={() => {
              navigateTo('marketplace_agent_browsing', {});
            }}
            onBack={goBack}
          />
        );

      case 'chat_screen':
        return (
          <ChatScreen
            conversationId={flowData.conversationId || 'CONV-001'}
            participantName="Buyer Name"
            lotDetails={{
              lotId: flowData.lotId || 'LOT-001',
              commodityType: flowData.commodityType || 'Wheat',
              quantity: flowData.quantity || 1000,
              qualityGrade: flowData.qualityGrade || 'A',
            }}
            onBack={goBack}
          />
        );

      case 'commission_agent_engagement':
        return (
          <CommissionAgentEngagementScreen
            agent={flowData.selectedAgent || {
              id: 'AGT-001',
              name: 'Rajesh Sharma',
              company: 'PSR & Co',
              rating: 4.9,
              commission: 2.5,
              verified: true,
            }}
            lotId={flowData.lotId || 'LOT-001'}
            onConfirm={(engagementType) => {
              navigateTo('order_confirmation', { 
                engagementType,
                orderId: `ORD-${Date.now()}` 
              });
            }}
            onBack={goBack}
          />
        );

      case 'order_confirmation':
        return (
          <OrderConfirmationVerificationScreen
            orderId={flowData.orderId || 'ORD-001'}
            producerDetails={{
              name: flowData.producerName || 'Rajesh Kumar',
              contact: flowData.producerContact || '+91-98765-43210',
              location: flowData.producerLocation || 'Ludhiana, Punjab',
            }}
            commodityDetails={{
              commodityType: flowData.commodityType || 'Wheat',
              lotIds: [flowData.lotId || 'LOT-001'],
              quantity: flowData.quantity || 1000,
              qualityGrade: flowData.qualityGrade || 'A',
            }}
            agentDetails={flowData.selectedAgent || {
              id: 'AGT-001',
              name: 'Rajesh Sharma',
              company: 'PSR & Co',
              commission: 2.5,
            }}
            engagementType={flowData.engagementType || 'representation'}
            onConfirm={(mediaUrls) => {
              navigateTo('grok_ai_quality_assessment', { 
                assessmentId: `ASS-${Date.now()}`,
                mediaUrls 
              });
            }}
            onBack={goBack}
          />
        );

      case 'grok_ai_quality_assessment':
        return (
          <GrokAIQualityAssessmentScreen
            assessmentId={flowData.assessmentId || 'ASS-001'}
            orderId={flowData.orderId || 'ORD-001'}
            commodityType={flowData.commodityType || 'Wheat'}
            qualityGrade={flowData.qualityGrade || 'A'}
            mediaUrls={flowData.mediaUrls || []}
            onApprove={(assessmentResults) => {
              completeFlow({ assessmentResults });
            }}
            onBack={goBack}
          />
        );

      default:
        return (
          <div className="p-6 text-center">
            <p className="text-gray-600">Screen not found</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      {/* Flow Progress Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Navigation Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={goBack}
                disabled={screenHistory.length === 0 && !onExit}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h2 className="text-lg" style={{ color: '#003E6D' }}>
                  {currentScreen?.title || 'Loading...'}
                </h2>
                <p className="text-sm text-gray-600">
                  Step {completedScreens.length + 1} of {flowConfig.screens.length}
                </p>
              </div>
            </div>
            
            {onExit && (
              <Button variant="outline" size="sm" onClick={onExit}>
                Exit Flow
              </Button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Overall Progress</span>
              <span>{Math.round(flowProgress)}%</span>
            </div>
            <Progress value={flowProgress} className="h-2" />
          </div>

          {/* Breadcrumb Navigation */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
            {flowConfig.screens.map((screen, index) => {
              const Icon = SCREEN_ICONS[screen.id] || Circle;
              const isCompleted = completedScreens.includes(screen.id);
              const isCurrent = currentScreenId === screen.id;
              
              return (
                <div key={screen.id} className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all ${
                      isCurrent
                        ? 'bg-blue-100 text-blue-900 border-2 border-blue-500'
                        : isCompleted
                        ? 'bg-green-100 text-green-900'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Icon className="w-3 h-3" />
                    )}
                    <span className="hidden sm:inline">{screen.title.split(' ')[0]}</span>
                  </div>
                  {index < flowConfig.screens.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Screen Content */}
      <div className="max-w-7xl mx-auto">
        {renderCurrentScreen()}
      </div>

      {/* Flow Data Debug Panel (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 max-w-sm">
          <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-lg">
            <h3 className="text-xs mb-2" style={{ color: '#003E6D' }}>
              Flow Data (Dev)
            </h3>
            <pre className="text-xs text-gray-600 overflow-auto max-h-32">
              {JSON.stringify(flowData, null, 2)}
            </pre>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CommissionAgentFlowNavigator;
