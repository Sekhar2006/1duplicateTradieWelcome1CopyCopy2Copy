import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, List } from 'lucide-react';
import { DSButton } from '../../design-system/components/DSButton';
import { OTPVerificationScreen } from '../OTPVerificationScreen';
import { ComprehensiveKYCSystem } from '../kyc/ComprehensiveKYCSystem';
import ProducerTypeSelection from './ProducerTypeSelection';
import { ProducerDashboardScreen } from '../ProducerDashboardScreen';
import { ProducerProfile } from './ProducerProfile';
import ProvenanceTracker from './ProvenanceTracker';
import { ActivityLoggerEnhanced } from './ActivityLoggerEnhanced';
import QualityCheckWorkflow from './QualityCheckWorkflow';
import { PostRequirement } from './PostRequirement';
import MatchmakingScreen from './MatchmakingScreen';
import TransactionOTPConfirmation from './TransactionOTPConfirmation';
import AdvanceRecordingScreen from './AdvanceRecordingScreen';

interface Screen {
  id: number;
  name: string;
  description: string;
  component: React.ReactNode;
}

export default function Producer12ScreenPresentation() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const screens: Screen[] = [
    {
      id: 1,
      name: 'Onboarding: OTP & Role Selection',
      description: 'Welcome screen with mobile/email input, 6-digit OTP, and multi-role selection',
      component: (
        <OTPVerificationScreen 
          onVerifySuccess={() => setCurrentScreen(1)}
          onBackToSignUp={() => setCurrentScreen(0)}
          mobile="98765 43210"
          countryCode="+91"
        />
      )
    },
    {
      id: 2,
      name: 'Onboarding: KYC License Submission',
      description: 'Complete KYC verification with document uploads and tier selection',
      component: <ComprehensiveKYCSystem onComplete={() => setCurrentScreen(2)} />
    },
    {
      id: 3,
      name: 'Producer Type Selection',
      description: 'Choose producer type (Type 1, Type 2, Type 3) and sync to dashboard',
      component: (
        <ProducerTypeSelection
          onComplete={() => setCurrentScreen(3)}
          onBack={() => setCurrentScreen(1)}
        />
      )
    },
    {
      id: 4,
      name: 'Producer Main Dashboard',
      description: 'Role selector, quick actions grid, live feed, and AI insights',
      component: <ProducerDashboardScreen />
    },
    {
      id: 5,
      name: 'Producer Profile View',
      description: 'User details, roles, KYC status, ranking, and synced records',
      component: <ProducerProfile />
    },
    {
      id: 6,
      name: 'Producer Journal (Accordion Timeline)',
      description: 'Timeline with Seeds, Sowing, Inputs, Harvest stages and token generation',
      component: <ProvenanceTracker />
    },
    {
      id: 7,
      name: 'Activity History & Tokenization',
      description: 'Token history timeline, ranking impact chart, export and share options',
      component: <ActivityLoggerEnhanced />
    },
    {
      id: 8,
      name: 'Create Lot Quality Control (QC)',
      description: 'QC form with commodity, grade, quantity, photos, and verification options',
      component: <QualityCheckWorkflow />
    },
    {
      id: 9,
      name: 'Post Requirement Screen',
      description: 'RFQ form with commodity details, price range, and AI-driven lot matching',
      component: <PostRequirement />
    },
    {
      id: 10,
      name: 'Matchmaking Screen',
      description: 'AI-powered match cards with filters, ratings, and action buttons',
      component: <MatchmakingScreen onBack={() => setCurrentScreen(3)} />
    },
    {
      id: 11,
      name: 'Transaction OTP Confirmation',
      description: 'Transaction summary with buyer/seller details and dual OTP verification',
      component: (
        <TransactionOTPConfirmation
          onComplete={() => setCurrentScreen(11)}
          onBack={() => setCurrentScreen(9)}
        />
      )
    },
    {
      id: 12,
      name: 'Advance Recording Screen',
      description: 'Record advances with credit/debit type, linked lots, and OTP confirmation',
      component: (
        <AdvanceRecordingScreen
          onComplete={() => setCurrentScreen(0)}
          onBack={() => setCurrentScreen(10)}
        />
      )
    }
  ];

  const handlePrevious = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleScreenSelect = (index: number) => {
    setCurrentScreen(index);
    setShowMenu(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Current Screen Display */}
      <div className="min-h-screen">
        {screens[currentScreen].component}
      </div>

      {/* Navigation Control Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Screen Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#FFD700] text-[#003E6D] rounded-full text-sm">
                  {currentScreen + 1} of {screens.length}
                </span>
                <h3 className="text-[#003E6D]">{screens[currentScreen].name}</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">{screens[currentScreen].description}</p>
            </div>

            {/* Menu Toggle */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <List className="w-6 h-6 text-[#003E6D]" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFD700]/70 transition-all duration-500"
                style={{ width: `${((currentScreen + 1) / screens.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <DSButton
              variant="outline"
              onClick={handlePrevious}
              disabled={currentScreen === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </DSButton>

            <DSButton
              variant="outline"
              onClick={() => setCurrentScreen(0)}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Reset to Start
            </DSButton>

            <DSButton
              variant="primary"
              onClick={handleNext}
              disabled={currentScreen === screens.length - 1}
              className="flex items-center gap-2 ml-auto"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </DSButton>
          </div>
        </div>
      </div>

      {/* Screen Selection Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setShowMenu(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF] p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[#003E6D]">All Screens</h2>
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/60 flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 text-sm">Jump to any screen in the presentation</p>
            </div>

            <div className="p-4 space-y-2">
              {screens.map((screen, index) => (
                <button
                  key={screen.id}
                  onClick={() => handleScreenSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    currentScreen === index
                      ? 'border-[#FFD700] bg-[#FFD700]/10'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        currentScreen === index
                          ? 'bg-[#FFD700] text-[#003E6D]'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h3
                        className={`mb-1 ${
                          currentScreen === index ? 'text-[#003E6D]' : 'text-gray-700'
                        }`}
                      >
                        {screen.name}
                      </h3>
                      <p className="text-sm text-gray-600">{screen.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Helper Text */}
      <div className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-[#FFD700]/30 z-30">
        <p className="text-sm text-gray-600">
          <span className="text-[#FFD700]">🎯</span> Figma AI Presentation Mode
        </p>
      </div>
    </div>
  );
}
