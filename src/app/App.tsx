import React, { useState } from "react";
import { motion } from "motion/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { countries, languages } from "./components/CountryLanguageData";
import { getTranslation } from "./components/Translations";
import { SignUpScreen } from "./components/SignUpScreen";
import { SignInScreen } from "./components/SignInScreen";
import { TwoStepVerificationScreen } from "./components/TwoStepVerificationScreen";
import { OTPVerificationScreen } from "./components/OTPVerificationScreen";
import { WelcomeBonusScreen } from "./components/WelcomeBonusScreen";
import { ReferEarnScreen } from "./components/ReferEarnScreen";
import { RoleSelectionScreen } from "./components/RoleSelectionScreen";
import { KYCFlow } from "./components/KYCFlow";
import { ProducerConfirmation } from "./components/ProducerConfirmation";
import { ProducerDocumentVerification } from "./components/ProducerDocumentVerification";
import { ExtendedProducerIdentityVerification } from "./components/ExtendedProducerIdentityVerification";
import { DashboardScreenEnhanced } from "./components/DashboardScreenEnhanced";
import { WebDashboardScreen } from "./components/WebDashboardScreen";
import { OnboardingWireframe } from "./components/OnboardingWireframe";
import { EntityOnboardingWireframe } from "./components/EntityOnboardingWireframe";
import { FullKYCOnboardingWireframe } from "./components/FullKYCOnboardingWireframe";
import { TradingRoleSelectionScreen } from "./components/TradingRoleSelectionScreen";
import { EntityOnboardingComplete } from "./components/EntityOnboardingComplete";
import { EntityKYCWireframeLowFi } from "./components/EntityKYCWireframeLowFi";
import { KYCSystemDocumentation } from "./components/KYCSystemDocumentation";
import { KYCStatusDemo } from "./components/KYCStatusDemo";
import { UserManagementFlow } from "./components/UserManagementFlow";
import { ResponsiveUserManagementWireframe } from "./components/ResponsiveUserManagementWireframe";
import { MultiPlatformUserManagement } from "./components/MultiPlatformUserManagement";
import { ProducerLoginScreen } from "./components/ProducerLoginScreen";
import { ProducerDashboardScreen } from "./components/ProducerDashboardScreen";
import { ChatGPTIntegrationDemo } from "./components/ChatGPTIntegrationDemo";
import { ProducerAIDashboard } from "./components/ProducerAIDashboard";
import { ProducerAIDashboardWireframe } from "./components/ProducerAIDashboardWireframe";
import { InputCostDemo } from "./components/InputCostDemo";
import QualityTokenDemo from "./components/QualityTokenDemo";
import SimplifiedQualityCheckForm from "./components/producer-dashboard/SimplifiedQualityCheckForm";
import QRCodeManager from "./components/QRCodeManager";
import ProvenanceTracker from "./components/producer-dashboard/ProvenanceTracker";
import LotCreationTokenizationWorkflow from "./components/producer-dashboard/LotCreationTokenizationWorkflow";
import LotTokenizationFlowDiagram from "./components/producer-dashboard/LotTokenizationFlowDiagram";
import LotTokenizationGuide from "./components/producer-dashboard/LotTokenizationGuide";
import { LotManagementWireframes } from "./components/producer-dashboard/LotManagementWireframes";
import { PostTokenizationFlowWireframes } from "./components/producer-dashboard/PostTokenizationFlowWireframes";
import { CompleteMediaCaptureExample } from "./components/producer-dashboard/CompleteMediaCaptureExample";
import { SimpleMediaCaptureFlow } from "./components/producer-dashboard/SimpleWrappers";
import { FigmaJSONExporter } from "./components/producer-dashboard/FigmaJSONExporter";
import { EnhancedQualityCheckWithAI } from "./components/producer-dashboard/EnhancedQualityCheckWithAI";
import TRADIEProducerFlowPrototype from "./components/TRADIEProducerFlowPrototype";
import { TRADIEProducerFlowPrototypeRefined } from "./components/TRADIEProducerFlowPrototypeRefined";
import { CameraPermissionTest } from "./components/producer-dashboard/CameraPermissionTest";
import { ComprehensiveKYCSystem } from "./components/kyc/ComprehensiveKYCSystem";
import { EntityTypeSelection } from "./components/kyc/EntityTypeSelection";
import { RegionalDocumentRequirements } from "./components/kyc/RegionalDocumentRequirements";
import { AIDocumentVerification } from "./components/kyc/AIDocumentVerification";
import { TeamMemberManagement } from "./components/kyc/TeamMemberManagement";
import { StorageAndSellDashboard } from "./components/producer-dashboard/StorageAndSellDashboard";
import ProducerMasterFlowNavigator from "./components/producer-dashboard/ProducerMasterFlowNavigator";
import Producer12ScreenPresentation from "./components/producer-dashboard/Producer12ScreenPresentation";
import ProducerCompleteFlow from "./components/producer-dashboard/ProducerCompleteFlow";
import { Toaster } from "./components/ui/sonner";
import { useIsMobile } from "./components/ui/use-mobile";
import { DSButton, designTokens } from "./design-system";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";
import WireframeNavigator from "./components/wireframes/WireframeNavigator";

type Screen =
  | "welcome"
  // Producer primary flows
  | "tradie-producer-prototype"
  | "tradie-producer-prototype-v1"
  | "producer-complete-flow"
  | "producer-12-screen-presentation"
  | "producer-flow-navigator"
  // Producer dashboard & AI
  | "producer-dashboard"
  | "producer-ai-dashboard"
  // Producer profile & identity
  | "producer-login"
  | "producer-confirmation"
  | "producer-documents"
  | "producer-identity"
  | "extended-producer-identity"
  // KYC & verification
  | "comprehensive-kyc"
  | "kyc-entity-selection"
  | "kyc-regional-docs"
  | "kyc-ai-verification"
  | "kyc-team-management"
  | "kyc"
  | "entity-onboarding"
  | "kyc-status"
  | "kyc-documentation"
  | "entity-kyc-wireframe-low-fi"
  // Activities & cost
  | "input-cost-demo"
  // Quality management
  | "quality-check"
  | "quality-check-simple"
  | "enhanced-quality-check"
  // Lot & tokenization
  | "lot-tokenization"
  | "lot-flow-diagram"
  | "lot-guide"
  | "lot-wireframes"
  | "post-tokenization-flow"
  // Traceability
  | "qr-code-manager"
  | "provenance-tracker"
  // Storage & selling
  | "storage-sell-dashboard"
  // Media capture
  | "ai-media-capture"
  | "simple-media-capture"
  | "camera-permission-test"
  // AI intelligence
  | "chatgpt-demo"
  | "figma-json-exporter"
  // Wireframes & reference
  | "lowfi-wireframes"
  | "wireframe"
  | "entity-wireframe"
  | "full-kyc-wireframe"
  // Kept for internal routing (not shown in main nav)
  | "signin"
  | "two-step-verification"
  | "signup"
  | "otp"
  | "welcome-bonus"
  | "refer-earn"
  | "role-selection"
  | "trading-role-selection"
  | "dashboard"
  | "user-management"
  | "role-based-login"
  | "responsive-wireframe"
  | "multi-platform";

const { colors, typography, spacing, radius, shadows } = designTokens;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [selectedCountry, setSelectedCountry] = useState<string>("IN");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [userRole, setUserRole] = useState<string>("");

  const isMobile = useIsMobile();

  const getTranslatedText = (key: string): string => {
    return getTranslation(selectedLanguage, key);
  };

  const handleSignUp = (data: any) => {
    console.log("Sign up data:", data);
    setCurrentScreen("otp");
  };

  const handleOTPVerified = () => {
    setCurrentScreen("welcome-bonus");
  };

  const handleBonusComplete = () => {
    setCurrentScreen("refer-earn");
  };

  const handleReferComplete = () => {
    setCurrentScreen("role-selection");
  };

  const handleRoleSelected = (role: string) => {
    setUserRole(role);
    if (role === "producer") {
      setCurrentScreen("producer-confirmation");
    } else {
      setCurrentScreen("trading-role-selection");
    }
  };

  const handleTradingRoleConfirmed = () => {
    setCurrentScreen("entity-onboarding");
  };

  const handleEntityOnboardingComplete = () => {
    setCurrentScreen("kyc-status");
  };

  const handleKYCComplete = () => {
    setCurrentScreen("dashboard");
  };

  // Render welcome screen — Producer Platform Navigation Hub
  if (currentScreen === "welcome") {
    const sectionCard = (
      title: string,
      children: React.ReactNode,
      accentColor?: string
    ) => (
      <div
        className="bg-white rounded-xl p-5 shadow-md border-2"
        style={{ borderColor: accentColor ? accentColor : `${colors.accent.gold}40` }}
      >
        <h3
          className="mb-3 flex items-center gap-2"
          style={{
            fontFamily: typography.fonts.heading,
            color: colors.blue.primary,
            fontSize: '1rem',
            fontWeight: typography.weights.bold,
          }}
        >
          {title}
        </h3>
        <div className="space-y-2">{children}</div>
      </div>
    );

    return (
      <div
        className="min-h-screen p-4 pb-12"
        style={{
          background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})`,
        }}
      >
        <div className="w-full max-w-7xl mx-auto">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 pt-6"
          >
            <img src={tradieLogo} alt="TRADIE" className="w-16 h-16 mx-auto mb-4" />
            <h1
              className="mb-2"
              style={{
                fontFamily: typography.fonts.heading,
                color: colors.blue.primary,
                fontWeight: typography.weights.bold,
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              }}
            >
              TRADIE Producer Platform
            </h1>
            <p style={{ color: `${colors.blue.primary}90`, fontSize: '1.05rem' }}>
              Complete End-to-End Producer Flow — Identity → Farm → Activities → Harvest → Quality → Lot → Traceability → Storage → Sale
            </p>
            <p className="text-sm mt-1" style={{ color: `${colors.blue.primary}70` }}>
              Multi-language • Role-based Access • AI-Powered • Responsive Design
            </p>

          </motion.div>

          {/* ── Hero: Primary Producer Flow Entry ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl p-6 mb-8 shadow-2xl"
            style={{
              background: `linear-gradient(135deg, #003E6D 0%, #005A9C 50%, #0072C6 100%)`,
              border: '3px solid #FFD700',
            }}
          >
            <div className="text-center mb-5">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs mb-3"
                style={{ backgroundColor: '#FFD700', color: '#003E6D', fontWeight: 700 }}
              >
                ⭐ PRIMARY ENTRY POINT
              </span>
              <h2 style={{ color: '#FFD700', fontFamily: typography.fonts.heading, fontSize: '1.4rem', fontWeight: 700 }}>
                Complete Producer Flow
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Start here — full 18-screen producer journey from profile to transaction
              </p>
            </div>

            <DSButton
              onClick={() => setCurrentScreen("tradie-producer-prototype")}
              fullWidth
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #F39C12 100%)',
                color: '#003E6D',
                fontWeight: 800,
                fontSize: '1.05rem',
                padding: '14px 24px',
                boxShadow: '0 6px 20px rgba(255, 215, 0, 0.5)',
                border: '2px solid #FFD700',
                borderRadius: '12px',
                marginBottom: '12px',
              }}
            >
              ✨ TRADIE V1 Refined — 18-Screen Complete Producer Journey
            </DSButton>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <DSButton
                onClick={() => setCurrentScreen("producer-complete-flow")}
                fullWidth
                style={{ backgroundColor: '#8B5CF6', color: 'white', fontWeight: 700 }}
              >
                🚀 End-to-End Trading Flow (11 Steps)
              </DSButton>
              <DSButton
                onClick={() => setCurrentScreen("producer-12-screen-presentation")}
                fullWidth
                style={{ backgroundColor: '#FF6B00', color: 'white', fontWeight: 700 }}
              >
                🎯 12-Screen Figma Presentation
              </DSButton>
              <DSButton
                onClick={() => setCurrentScreen("producer-flow-navigator")}
                fullWidth
                style={{ backgroundColor: '#10B981', color: 'white', fontWeight: 700 }}
              >
                🌾 Complete Flow Navigator
              </DSButton>
            </div>
          </motion.div>

          {/* ── Producer IA Sections Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* 1. Producer Dashboard & AI */}
            {sectionCard(
              '📊 Producer Dashboard & AI',
              <>
                <DSButton onClick={() => setCurrentScreen("producer-dashboard")} size="sm" fullWidth
                  style={{ backgroundColor: colors.blue.primary, color: 'white' }}>
                  Producer Operational Dashboard
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("producer-ai-dashboard")} size="sm" fullWidth
                  style={{ backgroundColor: '#6366F1', color: 'white' }}>
                  ✨ Producer AI Insights Dashboard
                </DSButton>
              </>,
              '#6366F140'
            )}

            {/* 2. Producer Profile & Identity */}
            {sectionCard(
              '👤 Producer Profile & Identity',
              <>
                <DSButton onClick={() => setCurrentScreen("producer-login")} size="sm" fullWidth>
                  Producer Login
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("producer-confirmation")} size="sm" fullWidth variant="outline">
                  Producer Confirmation
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("producer-documents")} size="sm" fullWidth variant="outline">
                  Producer Documents
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("extended-producer-identity")} size="sm" fullWidth variant="outline">
                  Extended Identity Verification
                </DSButton>
              </>
            )}

            {/* 3. KYC & Verification */}
            {sectionCard(
              '✅ KYC & Verification',
              <>
                <DSButton onClick={() => setCurrentScreen("comprehensive-kyc")} size="sm" fullWidth
                  style={{ backgroundColor: colors.accent.gold, color: colors.blue.primary, fontWeight: 700 }}>
                  🚀 Comprehensive KYC System
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("kyc-entity-selection")} size="sm" fullWidth>
                  Entity Type Selection
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("kyc-regional-docs")} size="sm" fullWidth>
                  Regional Document Requirements
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("kyc-ai-verification")} size="sm" fullWidth>
                  AI Document Verification
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("kyc-team-management")} size="sm" fullWidth>
                  Team Management (30 Members)
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("kyc")} size="sm" fullWidth variant="outline">
                  Basic KYC Flow
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("entity-onboarding")} size="sm" fullWidth variant="outline">
                  Entity Onboarding
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("kyc-status")} size="sm" fullWidth variant="outline">
                  KYC Status
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("kyc-documentation")} size="sm" fullWidth variant="outline">
                  KYC Documentation
                </DSButton>
              </>,
              `${colors.accent.gold}50`
            )}

            {/* 4. Activities & Cost Management */}
            {sectionCard(
              '💰 Activities & Cost Management',
              <>
                <DSButton onClick={() => setCurrentScreen("input-cost-demo")} size="sm" fullWidth
                  style={{ backgroundColor: '#059669', color: 'white' }}>
                  💰 Input Cost & Activity Tracker
                </DSButton>
              </>
            )}

            {/* 5. Quality Management */}
            {sectionCard(
              '🎯 Quality Management',
              <>
                <DSButton onClick={() => setCurrentScreen("enhanced-quality-check")} size="sm" fullWidth
                  style={{ backgroundColor: '#7C3AED', color: 'white', fontWeight: 700 }}>
                  ✨ Complete AI Quality Check
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("quality-check")} size="sm" fullWidth>
                  Quality Check (Token Demo)
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("quality-check-simple")} size="sm" fullWidth variant="outline">
                  📋 Dynamic Quality Form
                </DSButton>
              </>,
              '#7C3AED40'
            )}

            {/* 6. Lot Management */}
            {sectionCard(
              '🏷️ Lot Management & Tokenization',
              <>
                <DSButton onClick={() => setCurrentScreen("lot-tokenization")} size="sm" fullWidth
                  style={{ backgroundColor: '#0E7490', color: 'white' }}>
                  🏷️ Lot Creation & Tokenization
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("lot-flow-diagram")} size="sm" fullWidth>
                  📊 Lot Flow Diagram (Visual Guide)
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("lot-guide")} size="sm" fullWidth>
                  📚 Complete Lot Guide & Tutorial
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("lot-wireframes")} size="sm" fullWidth variant="outline">
                  🖼️ Lot Management Wireframes (6 Screens)
                </DSButton>
              </>,
              '#0E749040'
            )}

            {/* 7. Traceability */}
            {sectionCard(
              '🔗 Traceability — QR & Provenance',
              <>
                <DSButton onClick={() => setCurrentScreen("qr-code-manager")} size="sm" fullWidth
                  style={{ backgroundColor: '#0F766E', color: 'white' }}>
                  📱 QR Code Manager
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("provenance-tracker")} size="sm" fullWidth
                  style={{ backgroundColor: '#065F46', color: 'white' }}>
                  🔗 Provenance Tracker (NFT/QR)
                </DSButton>
              </>,
              '#0F766E40'
            )}

            {/* 8. Storage & Selling */}
            {sectionCard(
              '🏪 Storage & Selling',
              <>
                <DSButton onClick={() => setCurrentScreen("storage-sell-dashboard")} size="sm" fullWidth
                  style={{ backgroundColor: '#FFD700', color: '#003E6D', fontWeight: 700 }}>
                  🚀 Storage & Sell Dashboard
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("post-tokenization-flow")} size="sm" fullWidth>
                  🏪 Storage / Sell Flow (8 Screens)
                </DSButton>
              </>,
              '#FFD70050'
            )}

            {/* 9. Media Capture */}
            {sectionCard(
              '📸 Media Capture',
              <>
                <DSButton onClick={() => setCurrentScreen("ai-media-capture")} size="sm" fullWidth
                  style={{ backgroundColor: '#DC2626', color: 'white' }}>
                  📸 AI Media Capture (Full Demo)
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("simple-media-capture")} size="sm" fullWidth>
                  📸 Simple Media Capture
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("camera-permission-test")} size="sm" fullWidth
                  style={{ backgroundColor: '#EF4444', color: 'white' }}>
                  🔴 Camera Permission States Test
                </DSButton>
              </>
            )}

            {/* 10. AI Intelligence */}
            {sectionCard(
              '✨ AI Intelligence',
              <>
                <DSButton onClick={() => setCurrentScreen("chatgpt-demo")} size="sm" fullWidth
                  style={{ backgroundColor: '#10A37F', color: 'white' }}>
                  ChatGPT / Grok AI Assistant
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("figma-json-exporter")} size="sm" fullWidth variant="outline">
                  🎨 Figma JSON Exporter
                </DSButton>
              </>,
              '#10A37F40'
            )}

            {/* 11. Wireframes & Reference */}
            {sectionCard(
              '📐 Wireframes & Reference',
              <>
                <DSButton onClick={() => setCurrentScreen("lowfi-wireframes")} size="sm" fullWidth
                  style={{ backgroundColor: '#10B981', color: 'white', fontWeight: 700 }}>
                  🎨 Low-Fi Wireframes (36 Screens)
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("wireframe")} size="sm" fullWidth variant="outline">
                  Onboarding Wireframe
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("entity-wireframe")} size="sm" fullWidth variant="outline">
                  Entity Wireframe
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("full-kyc-wireframe")} size="sm" fullWidth variant="outline">
                  Full KYC Wireframe
                </DSButton>
                <DSButton onClick={() => setCurrentScreen("entity-kyc-wireframe-low-fi")} size="sm" fullWidth variant="outline">
                  Entity KYC Low-Fi
                </DSButton>
              </>,
              '#10B98140'
            )}

          </div>

          {/* ── Language & Country Selector ── */}
          <div className="mt-10 flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: colors.blue.primary }}>🌍 Country:</span>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.slice(0, 10).map((country, index) => (
                    <SelectItem key={`country-${index}-${country.name}`} value={country.code}>
                      {country.flag} {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm" style={{ color: colors.blue.primary }}>🗣️ Language:</span>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.slice(0, 10).map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Toaster />
      </div>
    );
  }

  // Render screens
  return (
    <>
      {currentScreen === "signin" && (
        <SignInScreen 
          onSignIn={() => setCurrentScreen("two-step-verification")}
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "two-step-verification" && (
        <TwoStepVerificationScreen 
          onVerifySuccess={() => setCurrentScreen("dashboard")}
          onChangeContact={() => setCurrentScreen("signin")}
          onBack={() => setCurrentScreen("signin")}
          contactInfo="+91 98765 43210"
          contactType="phone"
        />
      )}

      {currentScreen === "signup" && (
        <SignUpScreen 
          onSignUp={handleSignUp}
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "otp" && (
        <OTPVerificationScreen 
          onVerifySuccess={handleOTPVerified}
          onBackToSignUp={() => setCurrentScreen("signup")}
          mobile="234 567 8900"
          countryCode="+1"
        />
      )}

      {currentScreen === "welcome-bonus" && (
        <WelcomeBonusScreen 
          onContinue={handleBonusComplete}
          onBack={() => setCurrentScreen("otp")}
        />
      )}

      {currentScreen === "refer-earn" && (
        <ReferEarnScreen 
          onContinue={handleReferComplete}
          onBack={() => setCurrentScreen("welcome-bonus")}
        />
      )}

      {currentScreen === "role-selection" && (
        <RoleSelectionScreen 
          onRoleSelected={handleRoleSelected}
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "trading-role-selection" && (
        <TradingRoleSelectionScreen 
          onContinue={handleTradingRoleConfirmed}
          onBack={() => setCurrentScreen("role-selection")}
        />
      )}

      {currentScreen === "kyc" && (
        <KYCFlow 
          onComplete={handleKYCComplete}
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "entity-onboarding" && (
        <EntityOnboardingComplete 
          onComplete={handleEntityOnboardingComplete}
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "kyc-status" && (
        <KYCStatusDemo 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "entity-kyc-wireframe-low-fi" && (
        <EntityKYCWireframeLowFi 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "kyc-documentation" && (
        <KYCSystemDocumentation 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "producer-confirmation" && (
        <ProducerConfirmation 
          onConfirm={() => setCurrentScreen("producer-documents")}
          onDecline={() => setCurrentScreen("role-selection")}
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "producer-documents" && (
        <ProducerDocumentVerification 
          onComplete={() => setCurrentScreen("extended-producer-identity")}
          onBack={() => setCurrentScreen("producer-confirmation")}
        />
      )}

      {currentScreen === "extended-producer-identity" && (
        <ExtendedProducerIdentityVerification 
          onComplete={() => setCurrentScreen("dashboard")}
          onBack={() => setCurrentScreen("producer-documents")}
        />
      )}

      {currentScreen === "wireframe" && (
        <OnboardingWireframe 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "entity-wireframe" && (
        <EntityOnboardingWireframe 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "full-kyc-wireframe" && (
        <FullKYCOnboardingWireframe 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "dashboard" && (
        <DashboardScreenEnhanced 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "user-management" && (
        <UserManagementFlow 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "responsive-wireframe" && (
        <ResponsiveUserManagementWireframe 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "multi-platform" && (
        <MultiPlatformUserManagement 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "tradie-producer-prototype" && (
        <TRADIEProducerFlowPrototypeRefined 
          onClose={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "tradie-producer-prototype-v1" && (
        <TRADIEProducerFlowPrototype 
          onClose={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "producer-login" && (
        <ProducerLoginScreen 
          onLoginSuccess={() => setCurrentScreen("producer-dashboard")}
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "producer-dashboard" && (
        <ProducerDashboardScreen 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "chatgpt-demo" && (
        <ChatGPTIntegrationDemo 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "producer-ai-dashboard" && (
        <ProducerAIDashboard 
          producerName="Producer"
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "input-cost-demo" && (
        <InputCostDemo 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "quality-check" && (
        <QualityTokenDemo 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "quality-check-simple" && (
        <SimplifiedQualityCheckForm 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "qr-code-manager" && (
        <QRCodeManager 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "provenance-tracker" && (
        <ProvenanceTracker 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "lot-tokenization" && (
        <LotCreationTokenizationWorkflow 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "lot-flow-diagram" && (
        <LotTokenizationFlowDiagram 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "lot-guide" && (
        <LotTokenizationGuide 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "lot-wireframes" && (
        <LotManagementWireframes 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "post-tokenization-flow" && (
        <PostTokenizationFlowWireframes 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "ai-media-capture" && (
        <CompleteMediaCaptureExample 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "simple-media-capture" && (
        <SimpleMediaCaptureFlow 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "figma-json-exporter" && (
        <FigmaJSONExporter 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "enhanced-quality-check" && (
        <EnhancedQualityCheckWithAI 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "camera-permission-test" && (
        <CameraPermissionTest 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "comprehensive-kyc" && (
        <ComprehensiveKYCSystem 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "kyc-entity-selection" && (
        <EntityTypeSelection 
          onSelect={(type) => {
            console.log('Selected entity type:', type);
            // You can navigate to next screen or store the selection
            setCurrentScreen("welcome");
          }}
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "kyc-regional-docs" && (
        <RegionalDocumentRequirements 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "kyc-ai-verification" && (
        <AIDocumentVerification 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "kyc-team-management" && (
        <TeamMemberManagement 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "storage-sell-dashboard" && (
        <StorageAndSellDashboard 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "producer-flow-navigator" && (
        <ProducerMasterFlowNavigator 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "producer-12-screen-presentation" && (
        <Producer12ScreenPresentation 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "producer-complete-flow" && (
        <ProducerCompleteFlow 
          onBack={() => setCurrentScreen("welcome")}
        />
      )}

      {currentScreen === "lowfi-wireframes" && (
        <WireframeNavigator onBack={() => setCurrentScreen("welcome")} />
      )}

      <Toaster />
    </>
  );
}
