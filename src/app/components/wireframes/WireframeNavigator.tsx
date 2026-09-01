import React, { useState } from 'react';
import { ChevronRight, Users, ShoppingCart, Package, DollarSign, Settings, Sparkles } from 'lucide-react';

// Producer Wireframes
import {
  P1_QuickLogin,
  P2_KYCBasics,
  P3_ProducerDashboard,
  P4_CostActivityLog,
  P5_CreateLotTokenization,
  P6_QualityCheck,
  P7_TransportPermit,
  P8_SellOrStore,
  P9_BiddingOffers,
  P10_SaleConfirmation,
  P11_Weighing,
  P12_BillingPayment
} from './ProducerWireframes';

// Trader, Buyer, Agent Wireframes
import {
  T1_TraderDashboard,
  T2_BrowseFilterLots,
  T3_BidRoom,
  T4_WeighingCoSupervisor,
  T5_LedgerPayments,
  B1_BuyerDashboard,
  B2_DiscoverListings,
  B3_PurchaseConfirmation,
  B4_DeliveryStorage,
  C1_AgentDashboard,
  C2_AdvancesMonitoring,
  C3_PriceLockListings,
  C4_BillPurchase
} from './TraderBuyerAgentWireframes';

// Services, Wallet, AI, Settings Wireframes
import {
  S1_ServicesHome,
  S2_ProviderList,
  S3_BookingDetails,
  S4_JobSummary,
  W1_WalletOverview,
  W2_TokenRewards,
  A1_AIInsights,
  A2_BlockchainInfo,
  H1_MultilingualVoice,
  H2_Feedback,
  H3_ProfileKYC
} from './ServicesWalletAIWireframes';

interface WireframeScreen {
  id: string;
  title: string;
  component: React.FC;
  description: string;
}

interface WireframeCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  screens: WireframeScreen[];
}

interface WireframeNavigatorProps {
  onBack?: () => void;
}

const WireframeNavigator: React.FC<WireframeNavigatorProps> = ({ onBack }) => {
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: WireframeCategory[] = [
    {
      title: 'Producer Screens',
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      screens: [
        { id: 'P1', title: 'P1: Quick Login & Role', component: P1_QuickLogin, description: 'Login with mobile/email, OTP verification' },
        { id: 'P2', title: 'P2: KYC & Basics', component: P2_KYCBasics, description: 'Basic details, gender, ID type, virtual number' },
        { id: 'P3', title: 'P3: Producer Dashboard', component: P3_ProducerDashboard, description: 'Main hub with 8 quick actions' },
        { id: 'P4', title: 'P4: Cost & Activity Log', component: P4_CostActivityLog, description: 'Track costs: seed, sowing, fertilizer, harvest' },
        { id: 'P5', title: 'P5: Create Lot & Tokenization', component: P5_CreateLotTokenization, description: 'Generate token ID, QR code, split lots' },
        { id: 'P6', title: 'P6: Quality Check', component: P6_QualityCheck, description: 'Select checker, enter parameters, OTP confirm' },
        { id: 'P7', title: 'P7: Transport & Permit', component: P7_TransportPermit, description: 'Browse transporters, KYC badges, book' },
        { id: 'P8', title: 'P8: Sell or Store', component: P8_SellOrStore, description: 'Choose sell/store, set price, video inspection' },
        { id: 'P9', title: 'P9: Bidding / Offers', component: P9_BiddingOffers, description: 'Live bids, price lock, accept/invite buyers' },
        { id: 'P10', title: 'P10: Sale Confirmation', component: P10_SaleConfirmation, description: 'Sale summary, parties, OTP confirmation' },
        { id: 'P11', title: 'P11: Weighing (2-Device)', component: P11_Weighing, description: 'Bag-by-bag sync, mismatch detection' },
        { id: 'P12', title: 'P12: Billing & Payment', component: P12_BillingPayment, description: 'Bill confirm, payment, bill purchase (dual OTP)' },
      ]
    },
    {
      title: 'Trader Screens',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      screens: [
        { id: 'T1', title: 'T1: Trader Dashboard', component: T1_TraderDashboard, description: 'KPIs: bids, purchases, dues, arrivals' },
        { id: 'T2', title: 'T2: Browse & Filter Lots', component: T2_BrowseFilterLots, description: 'Search, filter, view lots, place bids' },
        { id: 'T3', title: 'T3: Bid Room', component: T3_BidRoom, description: 'Current bids, price lock, place/withdraw bid' },
        { id: 'T4', title: 'T4: Weighing Co-Supervisor', component: T4_WeighingCoSupervisor, description: 'Trader weighing view, sync with producer' },
        { id: 'T5', title: 'T5: Ledger & Payments', component: T5_LedgerPayments, description: 'Payable/receivable, record payment, export' },
      ]
    },
    {
      title: 'Buyer Screens',
      icon: <Package className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      screens: [
        { id: 'B1', title: 'B1: Buyer Dashboard', component: B1_BuyerDashboard, description: 'Orders, bids, deliveries, dues overview' },
        { id: 'B2', title: 'B2: Discover Listings', component: B2_DiscoverListings, description: 'Search, quality chips, request QC, video call' },
        { id: 'B3', title: 'B3: Purchase Confirmation', component: B3_PurchaseConfirmation, description: 'Purchase summary, OTP confirmation' },
        { id: 'B4', title: 'B4: Delivery & Storage', component: B4_DeliveryStorage, description: 'Choose delivery or storage, insurance option' },
      ]
    },
    {
      title: 'Commission Agent',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      screens: [
        { id: 'C1', title: 'C1: Agent Dashboard', component: C1_AgentDashboard, description: 'Producers, lots, advances, bills KPIs' },
        { id: 'C2', title: 'C2: Advances & Monitoring', component: C2_AdvancesMonitoring, description: 'Producer accounts, debit/credit, alerts' },
        { id: 'C3', title: 'C3: Price-Lock & Listings', component: C3_PriceLockListings, description: 'Set min price, pause/resume listings' },
        { id: 'C4', title: 'C4: Bill Purchase', component: C4_BillPurchase, description: 'Select financier, discount %, dual OTP' },
      ]
    },
    {
      title: 'Services',
      icon: <Package className="w-6 h-6" />,
      color: 'from-cyan-500 to-cyan-600',
      screens: [
        { id: 'S1', title: 'S1: Services Home', component: S1_ServicesHome, description: '9 service types: JCB, tractor, labor, logistics' },
        { id: 'S2', title: 'S2: Provider List', component: S2_ProviderList, description: 'KYC badges, ratings, quick pick dates' },
        { id: 'S3', title: 'S3: Booking Details', component: S3_BookingDetails, description: 'Team size, duration, language, cost estimate' },
        { id: 'S4', title: 'S4: Job Summary', component: S4_JobSummary, description: 'Timeline, payment, add to ledger' },
      ]
    },
    {
      title: 'Wallet & AI',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-yellow-500 to-yellow-600',
      screens: [
        { id: 'W1', title: 'W1: Wallet Overview', component: W1_WalletOverview, description: 'Balance, credits/debits, recent activity' },
        { id: 'W2', title: 'W2: Token Rewards', component: W2_TokenRewards, description: 'Tradie tokens, earning methods, tier system' },
        { id: 'A1', title: 'A1: AI Insights', component: A1_AIInsights, description: 'Price forecast, demand/supply, market tips' },
        { id: 'A2', title: 'A2: Blockchain Info', component: A2_BlockchainInfo, description: 'Transaction verification, quality assurance' },
      ]
    },
    {
      title: 'Settings & Help',
      icon: <Settings className="w-6 h-6" />,
      color: 'from-gray-500 to-gray-600',
      screens: [
        { id: 'H1', title: 'H1: Multilingual & Voice', component: H1_MultilingualVoice, description: '8 languages, voice help toggle' },
        { id: 'H2', title: 'H2: Feedback', component: H2_Feedback, description: 'Category, message, optional photo upload' },
        { id: 'H3', title: 'H3: Profile & KYC', component: H3_ProfileKYC, description: 'Profile, KYC status, privacy settings' },
      ]
    }
  ];

  const SelectedScreenComponent = selectedScreen
    ? categories
        .flatMap(cat => cat.screens)
        .find(screen => screen.id === selectedScreen)?.component
    : null;

  // Home view - Category selection
  if (!selectedCategory) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F0F9F4 0%, #E8F5E9 100%)' }}>
        <div 
          className="p-6 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)',
            color: '#FFFFFF'
          }}
        >
          {onBack && (
            <button
              onClick={onBack}
              className="text-base opacity-95 mb-4 hover:opacity-100 flex items-center gap-2 font-medium transition-all px-4 py-2 rounded-xl active:scale-95"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              ← Back to Main Menu
            </button>
          )}
          <h1 className="text-3xl font-bold mb-2">TRADIE Wireframes</h1>
          <p className="text-base opacity-95 font-medium">Mid-Fidelity Agritech Design • 36 Screens</p>
        </div>

        <div className="p-5 space-y-4">
          <div 
            className="rounded-2xl p-5"
            style={{
              background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
              border: '2px solid #90CAF9',
              boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)'
            }}
          >
            <p className="text-base font-bold mb-2" style={{ color: '#1565C0' }}>
              📱 Mobile-First Agritech Design (1080×2400)
            </p>
            <p className="text-sm font-medium" style={{ color: '#1976D2' }}>
              Soft greens/blues • 18-20px text • ≥48px touch targets • AI hints • Voice help
            </p>
          </div>

          <div 
            className="rounded-2xl p-5 mb-3"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFF9 100%)',
              border: '2px solid #D4E7D7',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.15)'
            }}
          >
            <h2 className="font-bold text-xl mb-2" style={{ color: '#2C3E2C' }}>
              Screen Categories
            </h2>
            <p className="text-base" style={{ color: '#5A6B5A' }}>
              Select a category to explore wireframes
            </p>
          </div>

          {categories.map((category) => (
            <button
              key={category.title}
              onClick={() => setSelectedCategory(category.title)}
              className="w-full rounded-2xl p-5 transition-all active:scale-98"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFF9 100%)',
                border: '2px solid #D4E7D7',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.12)'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className={`w-16 h-16 bg-gradient-to-br ${category.color} text-white rounded-2xl flex items-center justify-center shadow-md`}
                  >
                    {category.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg" style={{ color: '#2C3E2C' }}>
                      {category.title}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: '#5A6B5A' }}>
                      {category.screens.length} screens
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6" style={{ color: '#4CAF50' }} />
              </div>
            </button>
          ))}

          <div 
            className="rounded-2xl p-5 text-center"
            style={{
              background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
              border: '2px solid #81C784',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
            }}
          >
            <p className="text-lg font-bold mb-2" style={{ color: '#2E7D32' }}>
              Total Screens: 36
            </p>
            <p className="text-sm font-medium" style={{ color: '#388E3C' }}>
              P1-P12 (12) • T1-T5 (5) • B1-B4 (4) • C1-C4 (4) • S1-S4 (4) • W1-W2, A1-A2 (4) • H1-H3 (3)
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Screen selection view
  if (!selectedScreen) {
    const category = categories.find(cat => cat.title === selectedCategory)!;

    return (
      <div className="min-h-screen bg-gray-100">
        <div className={`bg-gradient-to-r ${category.color} text-white p-6`}>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-sm opacity-90 mb-2 hover:opacity-100"
          >
            ← Back to Categories
          </button>
          <h1 className="text-2xl font-semibold mb-1">{category.title}</h1>
          <p className="text-sm opacity-90">{category.screens.length} Screens</p>
        </div>

        <div className="p-4 space-y-3">
          {category.screens.map((screen) => (
            <button
              key={screen.id}
              onClick={() => setSelectedScreen(screen.id)}
              className="w-full bg-white border-2 border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-800">{screen.title}</h3>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
              <p className="text-xs text-gray-600">{screen.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Screen detail view
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => setSelectedScreen(null)}
          className="text-sm hover:opacity-80"
        >
          ← Back to Screens
        </button>
        <span className="text-sm font-medium">{selectedScreen}</span>
        <button
          onClick={() => {
            setSelectedScreen(null);
            setSelectedCategory(null);
          }}
          className="text-sm hover:opacity-80"
        >
          Home
        </button>
      </div>
      
      {SelectedScreenComponent && <SelectedScreenComponent />}
    </div>
  );
};

export default WireframeNavigator;
