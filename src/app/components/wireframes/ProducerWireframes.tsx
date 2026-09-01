import React, { useState } from 'react';
import { 
  User, Lock, Camera, FileText, Package, CheckCircle, 
  Truck, ShoppingBag, Warehouse, Scale, Receipt, Coins,
  Activity, Droplet, Sprout, Calendar, Upload, QrCode,
  TrendingUp, MessageSquare, Video, DollarSign
} from 'lucide-react';
import {
  TopBar, BottomNav, OTPModal, ActionCard, PrimaryButton,
  FormField, EmptyState, StatusChip, QuickActions, Header, KPICard
} from './GlobalComponents';

// P1: Quick Login & Role
export const P1_QuickLogin: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  const [showOTP, setShowOTP] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #F0F9F4 0%, #E8F5E9 100%)' }}>
      <TopBar title="TRADIE Login" />
      
      <div className="flex-1 p-5 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="rounded-2xl p-8" style={{ 
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFF9 100%)',
          boxShadow: '0 10px 30px rgba(76, 175, 80, 0.15)',
          border: '2px solid #D4E7D7'
        }}>
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-gray-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome to TRADIE</h1>
            <p className="text-sm text-gray-600">Login to continue</p>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setLoginMethod('mobile')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                loginMethod === 'mobile'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Mobile
            </button>
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                loginMethod === 'email'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Email
            </button>
          </div>

          <FormField
            label={loginMethod === 'mobile' ? 'Mobile Number' : 'Email Address'}
            type={loginMethod === 'mobile' ? 'tel' : 'email'}
            placeholder={loginMethod === 'mobile' ? '+91 XXXXX XXXXX' : 'your@email.com'}
            hint="We'll send you an OTP to verify"
            required
          />

          <PrimaryButton onClick={() => setShowOTP(true)}>
            Send OTP
          </PrimaryButton>

          <div className="mt-4 space-y-2">
            <PrimaryButton variant="outline">
              Change Role
            </PrimaryButton>
            <PrimaryButton variant="secondary">
              Help (Voice)
            </PrimaryButton>
          </div>
        </div>
      </div>

      <OTPModal
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onSubmit={(otp) => console.log('OTP:', otp)}
      />
    </div>
  );
};

// P2: KYC & Basics
export const P2_KYCBasics: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Basic Details" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-md mx-auto">
          <FormField
            label="Full Name"
            placeholder="Enter your full name"
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Male', 'Female', 'Other', 'Prefer not to say'].map((option) => (
                <label key={option} className="flex items-center gap-2 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="gender" className="w-4 h-4" />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Producer ID Type <span className="text-red-500">*</span>
            </label>
            <select className="w-full h-12 border-2 border-gray-300 rounded-lg px-3">
              <option>Select ID Type</option>
              <option>Aadhaar Card</option>
              <option>PAN Card</option>
              <option>Voter ID</option>
              <option>Passport</option>
            </select>
          </div>

          <label className="flex items-center gap-3 p-3 bg-gray-50 border-2 border-gray-300 rounded-lg mb-6">
            <input type="checkbox" className="w-5 h-5" />
            <span className="text-sm text-gray-700">Use Virtual Number (hide my real number)</span>
          </label>

          <div className="space-y-3">
            <PrimaryButton>Continue</PrimaryButton>
            <PrimaryButton variant="outline">Save & Finish Later</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// P3: Producer Dashboard
export const P3_ProducerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #F0F9F4 0%, #E8F5E9 100%)' }}>
      <TopBar title="Producer Dashboard" role="Producer" />
      
      <div className="flex-1 p-5 overflow-auto pb-24">
        <div 
          className="rounded-2xl p-5 mb-5"
          style={{
            background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
            border: '2px solid #90CAF9',
            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.2)'
          }}
        >
          <p className="text-base font-bold mb-2" style={{ color: '#1565C0' }}>
            💡 What's next?
          </p>
          <p className="text-sm font-medium" style={{ color: '#1976D2' }}>
            Start a new cycle to track your production
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <ActionCard
            icon={<Activity className="w-6 h-6 text-gray-600" />}
            title="Start Cycle"
            subtitle="Begin tracking"
          />
          <ActionCard
            icon={<FileText className="w-6 h-6 text-gray-600" />}
            title="Activity Log"
            subtitle="View history"
          />
          <ActionCard
            icon={<Package className="w-6 h-6 text-gray-600" />}
            title="Create Lot"
            subtitle="Tokenize crop"
          />
          <ActionCard
            icon={<CheckCircle className="w-6 h-6 text-gray-600" />}
            title="Quality Check"
            subtitle="Verify grade"
          />
          <ActionCard
            icon={<Truck className="w-6 h-6 text-gray-600" />}
            title="Transport"
            subtitle="Book vehicle"
          />
          <ActionCard
            icon={<ShoppingBag className="w-6 h-6 text-gray-600" />}
            title="Sell/Storage"
            subtitle="List or store"
          />
          <ActionCard
            icon={<Coins className="w-6 h-6 text-gray-600" />}
            title="Wallet"
            subtitle="View balance"
          />
          <ActionCard
            icon={<TrendingUp className="w-6 h-6 text-gray-600" />}
            title="AI Insights"
            subtitle="Get tips"
          />
        </div>

        <PrimaryButton>Start New Cycle</PrimaryButton>
      </div>

      <BottomNav activeTab="home" />
    </div>
  );
};

// P4: Cost & Activity Log
export const P4_CostActivityLog: React.FC = () => {
  const activities = [
    { icon: Sprout, label: 'Seed', color: 'text-green-600' },
    { icon: Calendar, label: 'Sowing', color: 'text-blue-600' },
    { icon: Droplet, label: 'Watering', color: 'text-cyan-600' },
    { icon: Package, label: 'Fertilizer', color: 'text-amber-600' },
    { icon: Activity, label: 'Pesticide', color: 'text-red-600' },
    { icon: CheckCircle, label: 'Harvest', color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Cost & Activity Log" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {activities.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className="bg-white border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-gray-50"
            >
              <div className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-800">{label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-gray-800 mb-3">Add Activity</h3>
          
          <FormField
            label="Amount (₹)"
            type="number"
            placeholder="Enter cost"
          />
          
          <FormField
            label="Date"
            type="date"
          />
          
          <FormField
            label="Notes"
            placeholder="Optional description"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">Photo</label>
            <button className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50">
              <Upload className="w-6 h-6 mr-2" />
              <span className="text-sm">Attach Photo</span>
            </button>
          </div>

          <PrimaryButton>Save Activity</PrimaryButton>
        </div>

        <div className="flex gap-3">
          <PrimaryButton variant="outline">
            📊 View Report (PDF/CSV)
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// P5: Create Lot & Tokenization
export const P5_CreateLotTokenization: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Create Lot & Tokenize" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-md mx-auto">
          <FormField
            label="Commodity"
            placeholder="Select commodity"
            required
          />
          
          <FormField
            label="Variety"
            placeholder="Enter variety"
            required
          />
          
          <FormField
            label="Grade"
            placeholder="Select grade"
            required
          />
          
          <FormField
            label="Quantity"
            type="number"
            placeholder="Enter quantity"
            required
          />
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">Unit</label>
            <div className="h-12 border-2 border-gray-300 rounded-lg px-3 flex items-center bg-gray-50">
              <span className="text-gray-600">Quintals (auto-detected)</span>
            </div>
          </div>

          <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-800">Token Preview</span>
              <QrCode className="w-5 h-5 text-gray-600" />
            </div>
            <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded mx-auto flex items-center justify-center">
              <span className="text-xs text-gray-400">QR Code</span>
            </div>
            <p className="text-xs text-center text-gray-600 mt-2">Token: TRD-XXXX-XXXX</p>
          </div>

          <label className="flex items-center gap-3 p-3 bg-white border-2 border-gray-300 rounded-lg mb-4">
            <input type="checkbox" className="w-5 h-5" />
            <span className="text-sm text-gray-700">Split into sub-lots (A/B/C)</span>
          </label>

          <div className="space-y-3">
            <PrimaryButton>Generate Token</PrimaryButton>
            <PrimaryButton variant="outline">Split Grades</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// P6: Quality Check
export const P6_QualityCheck: React.FC = () => {
  const [showOTP, setShowOTP] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Quality Check" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Select Quality Checker <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {[
                'Self Quality Check',
                'Trusted 3rd-party',
                'Government Inspector',
                'Lab Report',
                'Buyer-side Inspector',
                'Market Yard'
              ].map((option) => (
                <label key={option} className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="checker" className="w-4 h-4" />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">Quality Parameters</h3>
            
            <FormField
              label="Moisture (%)"
              type="number"
              placeholder="Enter value"
            />
            
            <FormField
              label="Purity (%)"
              type="number"
              placeholder="Enter value"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800 mb-2">Upload Images/PDF</label>
              <button className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50">
                <Camera className="w-6 h-6 mr-2" />
                <span className="text-sm">Capture / Upload</span>
              </button>
            </div>
          </div>

          <StatusChip label="Quality locked" variant="success" />

          <div className="mt-4 space-y-3">
            <PrimaryButton onClick={() => setShowOTP(true)}>
              Confirm Quality (OTP)
            </PrimaryButton>
            <PrimaryButton variant="outline">Schedule QC</PrimaryButton>
          </div>
        </div>
      </div>

      <OTPModal
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onSubmit={(otp) => console.log('Quality confirmed:', otp)}
        title="Confirm Quality Check"
        description="Enter OTP to lock quality parameters"
      />
    </div>
  );
};

// P7: Transport & Permit
export const P7_TransportPermit: React.FC = () => {
  const transporters = [
    { name: 'Ram Transport', price: '₹2,500', rating: '4.8', badges: ['KYC', 'On-time'] },
    { name: 'Shyam Logistics', price: '₹2,200', rating: '4.6', badges: ['KYC', 'Safe'] },
    { name: 'Mohan Trucks', price: '₹2,800', rating: '4.9', badges: ['KYC', 'On-time', 'Safe'] },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Transport & Permit" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 mb-4">
          <p className="text-xs text-yellow-800">💡 Hint: Last destination loads first</p>
        </div>

        <h3 className="font-medium text-gray-800 mb-3">Nearby Transporters</h3>

        <div className="space-y-3 mb-4">
          {transporters.map((t) => (
            <div key={t.name} className="bg-white border-2 border-gray-300 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-800">{t.name}</h4>
                  <p className="text-sm text-gray-600">Rating: {t.rating} ⭐</p>
                </div>
                <p className="font-semibold text-gray-800">{t.price}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {t.badges.map((badge) => (
                  <StatusChip key={badge} label={badge} variant="info" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <PrimaryButton>Book Transport</PrimaryButton>
          <PrimaryButton variant="outline">
            Generate Permit (QR)
          </PrimaryButton>
          <PrimaryButton variant="secondary">
            Track Vehicle
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// P8: Sell or Store
export const P8_SellOrStore: React.FC = () => {
  const [mode, setMode] = useState<'sell' | 'store' | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Sell or Store" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        {!mode && (
          <div className="grid grid-cols-1 gap-4 mb-4">
            <button
              onClick={() => setMode('sell')}
              className="bg-white border-2 border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50"
            >
              <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">List for Sale</h3>
              <p className="text-sm text-gray-600">Find buyers & get best price</p>
            </button>
            
            <button
              onClick={() => setMode('store')}
              className="bg-white border-2 border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50"
            >
              <Warehouse className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">Send to Storage</h3>
              <p className="text-sm text-gray-600">Store safely & sell later</p>
            </button>
          </div>
        )}

        {mode === 'sell' && (
          <div className="max-w-md mx-auto">
            <FormField label="Quantity" type="number" placeholder="Enter qty" required />
            <FormField label="Grade" placeholder="Select grade" required />
            <FormField label="Target Price (₹/quintal)" type="number" placeholder="Enter price" required />
            
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 mb-4">
              <p className="text-xs text-yellow-800">Min price lock protects your earnings</p>
            </div>

            <label className="flex items-center gap-3 p-3 bg-white border-2 border-gray-300 rounded-lg mb-4">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-sm">Enable Video Inspection</span>
            </label>

            <div className="space-y-3">
              <PrimaryButton>Post Listing</PrimaryButton>
              <PrimaryButton variant="outline">Invite Buyers</PrimaryButton>
            </div>
          </div>
        )}

        {mode === 'store' && (
          <div className="max-w-md mx-auto">
            <FormField label="Storage Facility" placeholder="Select facility" required />
            <FormField label="Chamber/Section" placeholder="Enter location" />
            <FormField label="Bond Number" placeholder="Enter bond #" />
            
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 mb-4">
              <p className="text-xs text-red-800">⚠️ Storage dues: ₹500/month</p>
            </div>

            <PrimaryButton>Send to Storage</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

// P9: Bidding / Offers
export const P9_BiddingOffers: React.FC = () => {
  const bids = [
    { buyer: 'Amit Traders', price: '₹3,200', time: '2 min ago', status: 'active' },
    { buyer: 'Raja Mills', price: '₹3,150', time: '5 min ago', status: 'active' },
    { buyer: 'Sharma Export', price: '₹3,100', time: '8 min ago', status: 'outbid' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Bidding & Offers" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-medium text-gray-800">Lot TRD-2024-0045</h3>
              <p className="text-sm text-gray-600">Wheat Grade A • 50 quintals</p>
            </div>
            <QrCode className="w-8 h-8 text-gray-600" />
          </div>
          <div className="flex flex-wrap gap-1">
            <StatusChip label="Golden color" variant="info" />
            <StatusChip label="Large grain" variant="info" />
            <StatusChip label="Fresh smell" variant="success" />
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3 mb-4">
          <p className="text-sm text-green-800 font-medium">💰 Price locked at minimum ₹3,000/quintal</p>
        </div>

        <h3 className="font-medium text-gray-800 mb-3">Live Bids</h3>

        <div className="space-y-2 mb-4">
          {bids.map((bid, i) => (
            <div key={i} className="bg-white border-2 border-gray-300 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{bid.buyer}</p>
                  <p className="text-xs text-gray-600">{bid.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{bid.price}</p>
                  <StatusChip
                    label={bid.status === 'active' ? 'Active' : 'Outbid'}
                    variant={bid.status === 'active' ? 'success' : 'default'}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <PrimaryButton>Accept Offer</PrimaryButton>
          <PrimaryButton variant="outline">
            <Video className="w-4 h-4 inline mr-2" />
            Video Call
          </PrimaryButton>
          <PrimaryButton variant="secondary">Invite Buyers</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// P10: Sale Confirmation
export const P10_SaleConfirmation: React.FC = () => {
  const [showOTP, setShowOTP] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Sale Confirmation" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-md mx-auto">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">Sale Summary</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Producer:</span>
                <span className="font-medium">Ram Kumar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Buyer:</span>
                <span className="font-medium">Amit Traders</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lot:</span>
                <span className="font-medium">TRD-2024-0045</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Commodity:</span>
                <span className="font-medium">Wheat Grade A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">50 quintals</span>
              </div>
              <div className="flex justify-between border-t-2 border-gray-200 pt-2 mt-2">
                <span className="text-gray-800 font-medium">Total Price:</span>
                <span className="font-semibold text-lg">₹1,60,000</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 mb-4">
            <p className="text-xs text-blue-800">✓ Quality verified • Transport arranged • Payment terms: 7 days</p>
          </div>

          <div className="space-y-3">
            <PrimaryButton onClick={() => setShowOTP(true)}>
              Confirm Sale (OTP)
            </PrimaryButton>
            <PrimaryButton variant="outline">Cancel</PrimaryButton>
          </div>
        </div>
      </div>

      <OTPModal
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onSubmit={(otp) => console.log('Sale confirmed:', otp)}
        title="Confirm Sale"
        description="Enter OTP to finalize the transaction"
      />
    </div>
  );
};

// P11: Weighing (Two-Device Sync)
export const P11_Weighing: React.FC = () => {
  const bags = [
    { serial: 'BAG-001', seller: '50.2', buyer: '50.2', status: 'match' },
    { serial: 'BAG-002', seller: '49.8', buyer: '50.1', status: 'mismatch' },
    { serial: 'BAG-003', seller: '50.5', buyer: '50.5', status: 'match' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Weighing (2-Device Sync)" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2">Bag Serial</th>
                <th className="text-right py-2">Seller</th>
                <th className="text-right py-2">Buyer</th>
                <th className="text-center py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bags.map((bag) => (
                <tr key={bag.serial} className="border-b border-gray-100">
                  <td className="py-2 font-medium">{bag.serial}</td>
                  <td className="text-right">{bag.seller} kg</td>
                  <td className="text-right">{bag.buyer} kg</td>
                  <td className="text-center">
                    {bag.status === 'match' ? (
                      <StatusChip label="✓" variant="success" />
                    ) : (
                      <StatusChip label="Mismatch" variant="error" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Total Bags:</span>
            <span className="font-medium">3</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Weight:</span>
            <span className="font-semibold text-lg">150.5 kg</span>
          </div>
        </div>

        <div className="space-y-3">
          <PrimaryButton>Sync Mobiles</PrimaryButton>
          <PrimaryButton variant="outline">
            Re-sync Mismatch Bags
          </PrimaryButton>
          <PrimaryButton variant="secondary">Complete Weighing</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// P12: Billing, Payment & Bill Purchase
export const P12_BillingPayment: React.FC = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [showDualOTP, setShowDualOTP] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Billing & Payment" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-md mx-auto">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">Bill Details</h3>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Bill #:</span>
                <span className="font-medium">INV-2024-0128</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-lg">₹1,60,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Due Date:</span>
                <span className="font-medium">15 Dec 2024</span>
              </div>
            </div>

            <StatusChip label="Payment Due" variant="warning" />
          </div>

          <div className="space-y-3 mb-4">
            <PrimaryButton onClick={() => setShowOTP(true)}>
              Confirm Bill (OTP)
            </PrimaryButton>
            <PrimaryButton variant="outline">
              Record Payment (Full/Partial)
            </PrimaryButton>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-800 mb-2">Bill Purchase (Discounting)</h4>
            <p className="text-xs text-gray-700 mb-3">Get immediate cash by selling this bill at a discount</p>
            
            <div className="space-y-2 text-sm mb-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Bill Amount:</span>
                <span>₹1,60,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount (5%):</span>
                <span className="text-red-600">- ₹8,000</span>
              </div>
              <div className="flex justify-between border-t-2 border-yellow-300 pt-2">
                <span className="font-medium">You Receive:</span>
                <span className="font-semibold">₹1,52,000</span>
              </div>
            </div>

            <PrimaryButton onClick={() => setShowDualOTP(true)}>
              Sell Bill (Dual OTP)
            </PrimaryButton>
          </div>

          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3">
            <p className="text-xs text-red-800">⚠️ Payment overdue by 3 days</p>
            <button className="text-xs text-red-800 font-medium underline mt-1">
              Send Reminder
            </button>
          </div>
        </div>
      </div>

      <OTPModal
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onSubmit={(otp) => console.log('Bill confirmed:', otp)}
        title="Confirm Bill"
      />

      <OTPModal
        isOpen={showDualOTP}
        onClose={() => setShowDualOTP(false)}
        onSubmit={(otp) => console.log('Bill sold:', otp)}
        title="Dual OTP Verification"
        description="Enter OTP from both Producer and Financier"
      />
    </div>
  );
};
