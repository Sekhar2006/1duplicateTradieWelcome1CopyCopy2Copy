import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, TrendingUp, Package, Truck, MapPin, Gavel, Scale, FileText, Warehouse, Activity, Eye, Sparkles } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import CropSelectionWithAI from './CropSelectionWithAI';
import { CropLifecycleTracker } from './CropLifecycleTracker';
import { ActivityLoggerEnhanced } from './ActivityLoggerEnhanced';
import { CommodityListingScreen } from './CommodityListingScreen';
import TransportBooking from './TransportBooking';
import DestinationReceiving from './DestinationReceiving';
import MarketDisplayAuction from './MarketDisplayAuction';
import EnhancedQualityCheckWithAI from './EnhancedQualityCheckWithAI';
import { EnhancedStorageSelectionScreen } from './EnhancedStorageSelectionScreen';
import { CropHistoryWithGrokInsights, generateMockCropHistory } from './CropHistoryWithGrokInsights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type FlowStep = 
  | 'overview'
  | 'crop-selection'
  | 'activity-logging'
  | 'crop-journaling'
  | 'harvest-listing'
  | 'storage-decision'
  | 'storage-selection'
  | 'buyer-history-view'
  | 'transport'
  | 'destination'
  | 'market-auction'
  | 'sampling-quality'
  | 'weighing-settlement';

interface ProducerCompleteFlowProps {
  producerName?: string;
  producerId?: string;
  onBack?: () => void;
}

export default function ProducerCompleteFlow({ 
  producerName = "Rajesh Kumar",
  producerId = "PROD001",
  onBack 
}: ProducerCompleteFlowProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('overview');
  const [completedSteps, setCompletedSteps] = useState<Set<FlowStep>>(new Set());
  const [flowData, setFlowData] = useState({
    cropSelection: null,
    activityLogging: null,
    journaling: null,
    listing: null,
    storageDecision: null,
    storageSelection: null,
    transport: null,
    destination: null,
    auction: null,
    sampling: null,
    weighing: null
  });

  const steps = [
    { 
      id: 'crop-selection' as FlowStep, 
      title: 'Crop Selection', 
      icon: TrendingUp, 
      color: 'bg-green-500',
      description: 'Grok AI-driven crop recommendation'
    },
    { 
      id: 'activity-logging' as FlowStep, 
      title: 'Activity Logging', 
      icon: Activity, 
      color: 'bg-emerald-500',
      description: 'Track all farming activities'
    },
    { 
      id: 'crop-journaling' as FlowStep, 
      title: 'Crop Lifecycle', 
      icon: FileText, 
      color: 'bg-blue-500',
      description: 'Monitor cultivation journey'
    },
    { 
      id: 'harvest-listing' as FlowStep, 
      title: 'Harvest & Tokenization', 
      icon: Package, 
      color: 'bg-purple-500',
      description: 'Tokenize and create digital history'
    },
    { 
      id: 'storage-decision' as FlowStep, 
      title: 'Store or Sell', 
      icon: Warehouse, 
      color: 'bg-cyan-500',
      description: 'Choose storage or direct sale'
    },
    { 
      id: 'storage-selection' as FlowStep, 
      title: 'Storage Selection', 
      icon: Warehouse, 
      color: 'bg-blue-500',
      description: 'Choose from 4 storage types'
    },
    { 
      id: 'buyer-history-view' as FlowStep, 
      title: 'Buyer Verification', 
      icon: Eye, 
      color: 'bg-indigo-500',
      description: 'View history with Grok insights'
    },
    { 
      id: 'transport' as FlowStep, 
      title: 'Transport', 
      icon: Truck, 
      color: 'bg-orange-500',
      description: 'Book transport to market'
    },
    { 
      id: 'market-auction' as FlowStep, 
      title: 'Market & Auction', 
      icon: Gavel, 
      color: 'bg-yellow-500',
      description: 'Live bidding process'
    },
    { 
      id: 'sampling-quality' as FlowStep, 
      title: 'Quality Check', 
      icon: CheckCircle2, 
      color: 'bg-teal-500',
      description: 'AI-powered quality verification'
    },
    { 
      id: 'weighing-settlement' as FlowStep, 
      title: 'Settlement', 
      icon: Scale, 
      color: 'bg-pink-500',
      description: 'Final payment'
    }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progress = currentStep === 'overview' ? 0 : ((currentStepIndex + 1) / steps.length) * 100;

  const markStepComplete = (step: FlowStep) => {
    setCompletedSteps(prev => new Set([...prev, step]));
  };

  const goToNextStep = (data?: any) => {
    if (data) {
      setFlowData(prev => ({ ...prev, [currentStep]: data }));
    }
    markStepComplete(currentStep);
    
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const goToPreviousStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    } else {
      setCurrentStep('overview');
    }
  };

  const goToStep = (step: FlowStep) => {
    setCurrentStep(step);
  };

  // Overview Screen
  if (currentStep === 'overview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4FC] to-[#D9F2FF] p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            {onBack && (
              <Button onClick={onBack} variant="outline" className="bg-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            )}
            <div className="flex-1 text-center">
              <h1 
                className="text-4xl mb-2"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  color: '#003E6D',
                  fontWeight: 700
                }}
              >
                Complete Producer Journey
              </h1>
              <p className="text-lg" style={{ color: '#003E6D99' }}>
                End-to-End Commodity Trading Flow
              </p>
            </div>
            <div className="w-32" /> {/* Spacer for alignment */}
          </div>

          {/* Producer Info */}
          <Card className="p-6 mb-8 bg-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}>
                  {producerName}
                </h2>
                <p className="text-sm" style={{ color: '#003E6D99' }}>Producer ID: {producerId}</p>
              </div>
              <Badge className="bg-green-500 text-white px-4 py-2 text-lg">
                Active Producer
              </Badge>
            </div>
          </Card>

          {/* Flow Description */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="text-xl mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
              📋 Complete Trading Flow with Grok AI ({steps.length} Steps)
            </h3>
            <p className="mb-4" style={{ color: '#003E6D' }}>
              Follow this comprehensive journey from AI-powered crop selection to final settlement. Track every activity, 
              get Grok AI insights, choose from 4 storage options, and ensure complete traceability with tokenization.
            </p>
            <div className="flex items-center gap-2 text-sm flex-wrap" style={{ color: '#003E6D99' }}>
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span>Grok AI Insights</span>
              </div>
              <CheckCircle2 className="h-4 w-4 text-green-600 ml-2" />
              <span>Activity Tracking</span>
              <CheckCircle2 className="h-4 w-4 text-green-600 ml-2" />
              <span>4 Storage Options</span>
              <CheckCircle2 className="h-4 w-4 text-green-600 ml-2" />
              <span>Complete Transparency</span>
            </div>
          </Card>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.filter(step => step.id !== 'storage-selection').map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = completedSteps.has(step.id);
              
              return (
                <Card 
                  key={step.id}
                  className={`p-6 cursor-pointer transition-all hover:shadow-xl ${
                    isCompleted ? 'bg-green-50 border-2 border-green-500' : 'bg-white'
                  }`}
                  onClick={() => goToStep(step.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${step.color}`}>
                      <StepIcon className="h-6 w-6 text-white" />
                    </div>
                    {isCompleted && (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Step {index + 1}
                    </Badge>
                    <h3 
                      className="text-lg flex-1"
                      style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm mb-4" style={{ color: '#003E6D99' }}>
                    {step.description}
                  </p>
                  
                  <Button 
                    className="w-full"
                    variant={isCompleted ? "outline" : "default"}
                  >
                    {isCompleted ? 'Review' : 'Start'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card className="p-6 mt-8 bg-gradient-to-r from-[#FFD700]20 to-[#FFD700]10">
            <h3 className="text-xl mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
              🚀 Quick Start
            </h3>
            <div className="flex gap-4">
              <Button 
                size="lg"
                className="flex-1"
                style={{ backgroundColor: '#003E6D', color: 'white' }}
                onClick={() => setCurrentStep('crop-selection')}
              >
                Start New Journey
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="flex-1"
              >
                View Past Transactions
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Individual Step Screens
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4FC] to-[#D9F2FF]">
      {/* Progress Header */}
      <div className="bg-white shadow-lg p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button 
              onClick={goToPreviousStep} 
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {currentStepIndex === 0 ? 'Overview' : 'Previous'}
            </Button>
            
            <div className="flex-1 mx-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: '#003E6D', fontFamily: 'Montserrat, sans-serif' }}>
                  {currentStepIndex >= 0 ? `Step ${currentStepIndex + 1} of ${steps.length}` : 'In Progress'}
                </span>
                <span className="text-sm" style={{ color: '#003E6D99' }}>
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <Badge className="bg-[#003E6D] text-white px-4 py-2">
              {currentStepIndex >= 0 ? steps[currentStepIndex].title : 'Processing'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        {currentStep === 'crop-selection' && (
          <CropSelectionWithAI 
            producerId={producerId}
            onComplete={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        
        {currentStep === 'activity-logging' && (
          <div className="max-w-7xl mx-auto">
            <Card className="p-6 bg-white shadow-xl">
              <h2 className="text-2xl mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}>
                Activity Logging
              </h2>
              <p className="text-gray-600 mb-6">
                Track all farming activities including fertilizers, pesticides, fungicides, labor, equipment rental, and more.
              </p>
              <ActivityLoggerEnhanced 
                cropId={flowData.cropSelection?.selectedCrop || 'default-crop'}
                cropName={flowData.cropSelection?.selectedCrop || 'My Crop'}
                onActivitiesUpdate={(activities) => {
                  setFlowData(prev => ({ ...prev, activityLogging: activities }));
                }}
              />
              <div className="flex gap-4 mt-6">
                <Button onClick={goToPreviousStep} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={goToNextStep} className="flex-1 bg-[#003E6D] text-white">
                  Continue to Crop Lifecycle
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        )}
        
        {currentStep === 'crop-journaling' && (
          <CropLifecycleTracker 
            onComplete={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        
        {currentStep === 'harvest-listing' && (
          <CommodityListingScreen 
            onListForSale={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        
        {currentStep === 'storage-decision' && (
          <StorageDecisionScreen
            onStore={() => {
              setFlowData(prev => ({ ...prev, storageDecision: 'store' }));
              setCurrentStep('storage-selection');
            }}
            onSell={() => {
              setFlowData(prev => ({ ...prev, storageDecision: 'sell' }));
              goToNextStep();
            }}
            onBack={goToPreviousStep}
          />
        )}
        
        {currentStep === 'storage-selection' && (
          <EnhancedStorageSelectionScreen
            onSelectFacility={(facility) => {
              setFlowData(prev => ({ ...prev, storageSelection: facility }));
              goToNextStep();
            }}
            onBack={() => setCurrentStep('storage-decision')}
            lotData={{
              commodity: flowData.cropSelection?.selectedCrop || 'Wheat',
              quality: 'A',
              quantity: 1000
            }}
          />
        )}
        
        {currentStep === 'buyer-history-view' && (
          <CropHistoryWithGrokInsights
            history={generateMockCropHistory()}
            viewMode="full"
            onClose={() => {
              markStepComplete('buyer-history-view');
              goToNextStep();
            }}
          />
        )}
        
        {currentStep === 'transport' && (
          <TransportBooking 
            onComplete={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        
        {currentStep === 'destination' && (
          <DestinationReceiving 
            onComplete={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        
        {currentStep === 'market-auction' && (
          <MarketDisplayAuction 
            onComplete={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        
        {currentStep === 'sampling-quality' && (
          <EnhancedQualityCheckWithAI 
            onComplete={goToNextStep}
            onBack={goToPreviousStep}
          />
        )}
        
        {currentStep === 'weighing-settlement' && (
          <WeighingSettlementScreen 
            onComplete={() => {
              markStepComplete('weighing-settlement');
              setCurrentStep('overview');
            }}
            onBack={goToPreviousStep}
          />
        )}
      </div>
    </div>
  );
}

// Storage Decision Screen Component
function StorageDecisionScreen({ onStore, onSell, onBack }: { onStore: () => void; onSell: () => void; onBack: () => void }) {
  return (
    <div className="max-w-5xl mx-auto">
      <Card className="p-8 bg-white shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#FFD70020' }}>
            <Warehouse className="h-8 w-8" style={{ color: '#FFD700' }} />
          </div>
          <h2 
            className="text-3xl mb-2"
            style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}
          >
            Store or Sell Your Produce?
          </h2>
          <p style={{ color: '#003E6D99' }}>
            Choose the best option for your commodity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Store Option */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-blue-100">
                <Warehouse className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
                Store
              </h3>
              <p className="text-gray-600 mb-6">
                Choose from 4 storage options and wait for better market prices
              </p>
              
              <div className="bg-white rounded-lg p-4 mb-6 text-left">
                <p className="text-sm mb-3" style={{ color: '#003E6D' }}>Available Storage Types:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Warehouse className="w-4 h-4 text-blue-600" />
                    <span>Warehouse Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-cyan-600" />
                    <span>Cold Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span>Farm Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-orange-600" />
                    <span>Silo Storage</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={onStore}
                className="w-full text-white"
                style={{ backgroundColor: '#003E6D' }}
              >
                Select Storage Option
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Sell Option */}
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-yellow-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ backgroundColor: '#FFD70020' }}>
                <TrendingUp className="w-10 h-10" style={{ color: '#FFD700' }} />
              </div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
                Sell Now
              </h3>
              <p className="text-gray-600 mb-6">
                List your commodity for immediate sale
              </p>
              
              <div className="bg-white rounded-lg p-4 mb-6 text-left">
                <p className="text-sm mb-3" style={{ color: '#003E6D' }}>Benefits:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Immediate market access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Quick payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Verified buyers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Transparent pricing</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={onSell}
                className="w-full text-white"
                style={{ backgroundColor: '#FFD700' }}
              >
                List for Sale
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Back Button */}
        <div className="flex justify-start">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </Card>
    </div>
  );
}

// Weighing & Settlement Screen Component
function WeighingSettlementScreen({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
  const [otpVerified, setOtpVerified] = useState(false);
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 bg-white shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <Scale className="h-8 w-8 text-green-600" />
          </div>
          <h2 
            className="text-3xl mb-2"
            style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}
          >
            Weighing & Final Settlement
          </h2>
          <p style={{ color: '#003E6D99' }}>
            Confirm final weight and complete payment settlement
          </p>
        </div>

        {/* Settlement Details */}
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm mb-1" style={{ color: '#003E6D99' }}>Total Bags</p>
              <p className="text-2xl" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
                45 Bags
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm mb-1" style={{ color: '#003E6D99' }}>Variety</p>
              <p className="text-2xl" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
                Basmati 1121
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm mb-1" style={{ color: '#003E6D99' }}>Total Weight</p>
              <p className="text-2xl" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
                2,250 kg
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm mb-1" style={{ color: '#003E6D99' }}>Final Price</p>
              <p className="text-2xl" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
                ₹3,50,000
              </p>
            </div>
          </div>

          {/* Ledger - Advances */}
          <Card className="p-4 bg-yellow-50">
            <h3 className="text-lg mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
              📋 Advances Taken
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Commission Agent Advance</span>
                <span className="font-semibold text-red-600">- ₹50,000</span>
              </div>
              <div className="flex justify-between">
                <span>Bank Agricultural Loan</span>
                <span className="font-semibold text-red-600">- ₹30,000</span>
              </div>
              <div className="flex justify-between">
                <span>Input Purchase Advance</span>
                <span className="font-semibold text-red-600">- ₹20,000</span>
              </div>
              <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between text-lg">
                <span style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>Net Payable</span>
                <span className="font-bold text-green-600">₹2,50,000</span>
              </div>
            </div>
          </Card>

          {/* OTP Confirmation */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="text-lg mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
              🔐 OTP Verification for Final Settlement
            </h3>
            <div className="flex gap-3">
              <input 
                type="text"
                placeholder="Enter 6-digit OTP"
                className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300"
                maxLength={6}
              />
              <Button 
                onClick={() => setOtpVerified(true)}
                className="bg-[#003E6D]"
              >
                Verify OTP
              </Button>
            </div>
            {otpVerified && (
              <div className="mt-3 flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span>OTP Verified Successfully!</span>
              </div>
            )}
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button 
            onClick={onBack}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={onComplete}
            size="lg"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            disabled={!otpVerified}
          >
            Complete Settlement
            <CheckCircle2 className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
