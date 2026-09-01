import React, { useState } from 'react';
import { 
  Tractor, Droplet, Users, Truck, Wrench, Star, Phone,
  Calendar, DollarSign, FileText, TrendingUp, Shield,
  CheckCircle, Globe, Mic, HelpCircle, Download, Upload
} from 'lucide-react';
import {
  TopBar, BottomNav, Header, ActionCard, PrimaryButton,
  FormField, StatusChip, KPICard, EmptyState, OTPModal
} from './GlobalComponents';

// ============================================================================
// SERVICES WIREFRAMES (S1-S4)
// ============================================================================

// S1: Services Home
export const S1_ServicesHome: React.FC = () => {
  const services = [
    { icon: Tractor, label: 'JCB/Dozer', color: 'text-yellow-600' },
    { icon: Tractor, label: 'Tractor & Implements', color: 'text-green-600' },
    { icon: Droplet, label: 'Borewell & Pumps', color: 'text-blue-600' },
    { icon: Wrench, label: 'Spray & Drones', color: 'text-purple-600' },
    { icon: Users, label: 'Skilled Labor', color: 'text-orange-600' },
    { icon: Users, label: 'Unskilled Labor', color: 'text-gray-600' },
    { icon: Users, label: 'Labor Groups', color: 'text-indigo-600' },
    { icon: Truck, label: 'Mini/Truck Logistics', color: 'text-red-600' },
    { icon: Wrench, label: 'Equipment Rental', color: 'text-cyan-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TopBar title="Services Marketplace" />
      
      <div className="flex-1 p-4 overflow-auto pb-20">
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-800 font-medium">🔧 Book services easily</p>
          <p className="text-xs text-blue-700 mt-1">All providers are verified with KYC</p>
        </div>

        <h3 className="font-medium text-gray-800 mb-3">Available Services</h3>

        <div className="grid grid-cols-2 gap-3">
          {services.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className="bg-white border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-gray-50"
            >
              <div className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-800 text-center">{label}</span>
              <button className="text-xs text-gray-600 underline">
                <Phone className="w-3 h-3 inline mr-1" />
                Call
              </button>
            </button>
          ))}
        </div>
      </div>

      <BottomNav activeTab="services" />
    </div>
  );
};

// S2: Provider List
export const S2_ProviderList: React.FC = () => {
  const providers = [
    { 
      name: 'Ram Services', 
      rating: '4.8', 
      price: '₹800/hour',
      badges: ['KYC Verified', 'Top Rated'],
      experience: '5 years'
    },
    { 
      name: 'Shyam Equipment', 
      rating: '4.6', 
      price: '₹750/hour',
      badges: ['KYC Verified'],
      experience: '3 years'
    },
    { 
      name: 'Mohan Contractors', 
      rating: '4.9', 
      price: '₹850/hour',
      badges: ['KYC Verified', 'Top Rated', 'Fast Response'],
      experience: '7 years'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="JCB/Dozer Providers" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex gap-2 mb-4">
          <button className="flex-1 h-10 bg-gray-700 text-white rounded-lg text-sm">
            Today
          </button>
          <button className="flex-1 h-10 bg-white border-2 border-gray-300 rounded-lg text-sm">
            Tomorrow
          </button>
          <button className="flex-1 h-10 bg-white border-2 border-gray-300 rounded-lg text-sm">
            Pick Date
          </button>
        </div>

        <h3 className="font-medium text-gray-800 mb-3">Available Providers</h3>

        <div className="space-y-3">
          {providers.map((provider) => (
            <div key={provider.name} className="bg-white border-2 border-gray-300 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-800">{provider.name}</h4>
                  <p className="text-sm text-gray-600">
                    {provider.rating} ⭐ • {provider.experience}
                  </p>
                </div>
                <p className="font-semibold text-gray-800">{provider.price}</p>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {provider.badges.map((badge) => (
                  <StatusChip key={badge} label={badge} variant="success" />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="h-10 bg-gray-700 text-white rounded-lg text-sm">
                  Book
                </button>
                <button className="h-10 bg-white border-2 border-gray-300 rounded-lg text-sm flex items-center justify-center gap-1">
                  <Phone className="w-4 h-4" />
                  Call
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// S3: Booking Details
export const S3_BookingDetails: React.FC = () => {
  const [showStartOTP, setShowStartOTP] = useState(false);
  const [showEndOTP, setShowEndOTP] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Booking Details" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-md mx-auto">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-2">Provider</h3>
            <p className="text-sm text-gray-600">Ram Services</p>
            <p className="text-sm text-gray-600">4.8 ⭐ • ₹800/hour</p>
          </div>

          <FormField
            label="Team Size"
            type="number"
            placeholder="Number of people/equipment"
            required
          />

          <FormField
            label="Duration (hours)"
            type="number"
            placeholder="Expected duration"
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Preferred Language
            </label>
            <select className="w-full h-12 border-2 border-gray-300 rounded-lg px-3">
              <option>Hindi</option>
              <option>English</option>
              <option>Punjabi</option>
              <option>Tamil</option>
            </select>
          </div>

          <div className="space-y-2 mb-4">
            <label className="flex items-center gap-3 p-3 bg-white border-2 border-gray-300 rounded-lg">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-sm">Provider arranges transport</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-white border-2 border-gray-300 rounded-lg">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-sm">Provide meals</span>
            </label>
          </div>

          <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-800 mb-2">Cost Estimate</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base rate (8 hrs):</span>
                <span>₹6,400</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transport:</span>
                <span>₹500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Meals:</span>
                <span>₹200</span>
              </div>
              <div className="flex justify-between border-t-2 border-gray-300 pt-2 mt-2">
                <span className="font-medium">Total:</span>
                <span className="font-semibold">₹7,100</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <PrimaryButton onClick={() => setShowStartOTP(true)}>
              Confirm Booking
            </PrimaryButton>
            <PrimaryButton variant="outline">Cancel</PrimaryButton>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
            <p className="text-xs text-yellow-800">
              💡 OTP required at job start and completion
            </p>
          </div>
        </div>
      </div>

      <OTPModal
        isOpen={showStartOTP}
        onClose={() => setShowStartOTP(false)}
        onSubmit={(otp) => console.log('Job started:', otp)}
        title="Start Job"
        description="Enter OTP to confirm job start"
      />

      <OTPModal
        isOpen={showEndOTP}
        onClose={() => setShowEndOTP(false)}
        onSubmit={(otp) => console.log('Job completed:', otp)}
        title="Complete Job"
        description="Enter OTP to confirm job completion"
      />
    </div>
  );
};

// S4: Job Summary
export const S4_JobSummary: React.FC = () => {
  const timeline = [
    { status: 'Booked', time: '10:00 AM', completed: true },
    { status: 'Started', time: '11:30 AM', completed: true },
    { status: 'In Progress', time: '12:00 PM', completed: false },
    { status: 'Completed', time: '-', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Job Summary" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-md mx-auto">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">Job Status</h3>
            
            <div className="space-y-3">
              {timeline.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.completed 
                      ? 'bg-green-100 border-2 border-green-500' 
                      : 'bg-gray-100 border-2 border-gray-300'
                  }`}>
                    {item.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.status}</p>
                    <p className="text-xs text-gray-600">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Service Cost:</span>
                <span>₹6,400</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Additional:</span>
                <span>₹700</span>
              </div>
              <div className="flex justify-between border-t-2 border-gray-200 pt-2 mt-2">
                <span className="font-medium">Total:</span>
                <span className="font-semibold text-lg">₹7,100</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <PrimaryButton>Pay Now</PrimaryButton>
            <PrimaryButton variant="outline">Add to Ledger</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// WALLET & LEDGER WIREFRAMES (W1-W2)
// ============================================================================

// W1: Wallet Overview
export const W1_WalletOverview: React.FC = () => {
  const transactions = [
    { type: 'Seed Purchase', amount: '- ₹5,000', date: '10 Dec' },
    { type: 'Wheat Sale', amount: '+ ₹1,60,000', date: '8 Dec' },
    { type: 'Transport', amount: '- ₹2,500', date: '5 Dec' },
    { type: 'Fertilizer', amount: '- ₹8,000', date: '3 Dec' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TopBar title="Wallet & Ledger" />
      
      <div className="flex-1 p-4 overflow-auto pb-20">
        <div className="bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-lg p-6 mb-4">
          <p className="text-sm opacity-80 mb-1">Total Balance</p>
          <p className="text-3xl font-semibold mb-4">₹1,44,500</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="opacity-80">Credits</p>
              <p className="font-medium">₹1,60,000</p>
            </div>
            <div>
              <p className="opacity-80">Debits</p>
              <p className="font-medium">₹15,500</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <button className="flex-1 h-12 bg-white border-2 border-gray-300 rounded-lg text-sm font-medium">
            Add Cost
          </button>
          <button className="flex-1 h-12 bg-white border-2 border-gray-300 rounded-lg text-sm font-medium">
            <Download className="w-4 h-4 inline mr-1" />
            Export
          </button>
        </div>

        <h3 className="font-medium text-gray-800 mb-3">Recent Activity</h3>

        <div className="space-y-2">
          {transactions.map((txn, i) => (
            <div key={i} className="bg-white border-2 border-gray-300 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{txn.type}</p>
                  <p className="text-xs text-gray-600">{txn.date}</p>
                </div>
                <p className={`font-semibold ${
                  txn.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {txn.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav activeTab="wallet" />
    </div>
  );
};

// W2: Token Rewards
export const W2_TokenRewards: React.FC = () => {
  const activities = [
    { activity: 'Quality Check Completed', tokens: '+50', date: '10 Dec' },
    { activity: 'Sale Transaction', tokens: '+100', date: '8 Dec' },
    { activity: 'KYC Verification', tokens: '+200', date: '1 Dec' },
    { activity: 'Referral Bonus', tokens: '+150', date: '25 Nov' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Tradie Token Rewards" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-lg p-6 mb-4">
          <p className="text-sm opacity-90 mb-1">Your Tradie Tokens</p>
          <p className="text-4xl font-semibold mb-2">2,450 🪙</p>
          <p className="text-xs opacity-80">Tier: Silver Member</p>
        </div>

        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-gray-800 mb-3">How to Earn</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">✓ Complete KYC</span>
              <span className="font-medium">200 tokens</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">✓ Each Sale</span>
              <span className="font-medium">100 tokens</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">✓ Quality Check</span>
              <span className="font-medium">50 tokens</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">✓ Refer Friend</span>
              <span className="font-medium">150 tokens</span>
            </div>
          </div>
        </div>

        <h3 className="font-medium text-gray-800 mb-3">Recent Earnings</h3>

        <div className="space-y-2 mb-4">
          {activities.map((item, i) => (
            <div key={i} className="bg-white border-2 border-gray-300 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{item.activity}</p>
                  <p className="text-xs text-gray-600">{item.date}</p>
                </div>
                <p className="font-semibold text-green-600">{item.tokens}</p>
              </div>
            </div>
          ))}
        </div>

        <PrimaryButton variant="outline">View Rules</PrimaryButton>
      </div>
    </div>
  );
};

// ============================================================================
// AI & BLOCKCHAIN WIREFRAMES (A1-A2)
// ============================================================================

// A1: AI Insights
export const A1_AIInsights: React.FC = () => {
  const insights = [
    {
      title: 'Price Forecast',
      content: 'Wheat prices expected to rise 8% in next 2 weeks',
      confidence: 'High',
      icon: TrendingUp,
    },
    {
      title: 'Demand/Supply',
      content: 'High demand for Rice Basmati in Punjab region',
      confidence: 'Medium',
      icon: TrendingUp,
    },
    {
      title: 'Best Market',
      content: 'Delhi Mandi offering best rates for your crop',
      confidence: 'High',
      icon: TrendingUp,
    },
    {
      title: 'Transport',
      content: 'Book transport 2 days ahead to save 15%',
      confidence: 'Medium',
      icon: Truck,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="AI Insights" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4 mb-4">
          <p className="text-sm text-purple-800 font-medium">🤖 AI-Powered Recommendations</p>
          <p className="text-xs text-purple-700 mt-1">Based on market data and your activity</p>
        </div>

        <div className="space-y-3 mb-4">
          {insights.map((insight, i) => (
            <div key={i} className="bg-white border-2 border-gray-300 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <insight.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-600">{insight.content}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusChip
                  label={`Confidence: ${insight.confidence}`}
                  variant={insight.confidence === 'High' ? 'success' : 'warning'}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <PrimaryButton>See Details</PrimaryButton>
          <PrimaryButton variant="outline">Refresh Insights</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// A2: Blockchain Info
export const A2_BlockchainInfo: React.FC = () => {
  const features = [
    {
      title: 'Transaction Verification',
      description: 'Every sale is recorded on blockchain for transparency',
      icon: CheckCircle,
    },
    {
      title: 'Quality Assurance',
      description: 'Quality checks are permanently stored and cannot be altered',
      icon: Shield,
    },
    {
      title: 'Token Management',
      description: 'Your Tradie tokens use blockchain for security',
      icon: DollarSign,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Blockchain Info" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-800 font-medium">🔗 Blockchain-Secured Platform</p>
          <p className="text-xs text-blue-700 mt-1">Your transactions are safe and transparent</p>
        </div>

        <h3 className="font-medium text-gray-800 mb-3">How We Use Blockchain</h3>

        <div className="space-y-3 mb-4">
          {features.map((feature, i) => (
            <div key={i} className="bg-white border-2 border-gray-300 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Your Transaction Stats</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Verified Transactions:</span>
              <span className="font-medium">45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quality Checks:</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tokens Earned:</span>
              <span className="font-medium">2,450</span>
            </div>
          </div>
        </div>

        <PrimaryButton variant="outline">Learn More</PrimaryButton>
      </div>
    </div>
  );
};

// ============================================================================
// SETTINGS & HELP WIREFRAMES (H1-H3)
// ============================================================================

// H1: Multilingual & Voice
export const H1_MultilingualVoice: React.FC = () => {
  const languages = [
    'English', 'हिंदी (Hindi)', 'ਪੰਜਾਬੀ (Punjabi)', 'தமிழ் (Tamil)',
    'తెలుగు (Telugu)', 'ಕನ್ನಡ (Kannada)', 'मराठी (Marathi)', 'বাংলা (Bengali)'
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Language & Voice" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-md mx-auto">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">Select Language</h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <label
                  key={lang}
                  className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input type="radio" name="language" className="w-4 h-4" />
                  <span className="text-sm">{lang}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">Voice Settings</h3>
            
            <label className="flex items-center justify-between p-3 bg-gray-50 border border-gray-300 rounded-lg mb-2">
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-gray-600" />
                <span className="text-sm">Enable Voice Help</span>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>

            <label className="flex items-center justify-between p-3 bg-gray-50 border border-gray-300 rounded-lg">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="text-sm">Auto-detect Language</span>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </label>
          </div>

          <div className="space-y-3">
            <PrimaryButton>Save Settings</PrimaryButton>
            <PrimaryButton variant="outline">Test Voice</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// H2: Feedback
export const H2_Feedback: React.FC = () => {
  const categories = [
    'Bug Report',
    'Feature Request',
    'Quality Issue',
    'Payment Problem',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Feedback" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-md mx-auto">
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800">We value your feedback! Help us improve TRADIE.</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select className="w-full h-12 border-2 border-gray-300 rounded-lg px-3">
              <option>Select category</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full h-32 border-2 border-gray-300 rounded-lg p-3 resize-none"
              placeholder="Describe your issue or suggestion..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Attach Photo (Optional)
            </label>
            <button className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50">
              <Upload className="w-6 h-6 mr-2" />
              <span className="text-sm">Upload Screenshot</span>
            </button>
          </div>

          <div className="space-y-3">
            <PrimaryButton>Submit Feedback</PrimaryButton>
            <PrimaryButton variant="outline">Cancel</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// H3: Profile & KYC
export const H3_ProfileKYC: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Profile & KYC" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto pb-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Ram Kumar</h3>
                <p className="text-sm text-gray-600">Producer</p>
                <p className="text-xs text-gray-500">+91 98XXX XXXXX</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <StatusChip label="KYC Verified" variant="success" />
              <StatusChip label="Virtual Number ON" variant="info" />
            </div>
          </div>

          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">KYC Documents</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-gray-700">Aadhaar Card</span>
                <StatusChip label="✓ Verified" variant="success" />
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-gray-700">PAN Card</span>
                <StatusChip label="✓ Verified" variant="success" />
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-gray-700">Bank Details</span>
                <StatusChip label="✓ Verified" variant="success" />
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">Privacy Settings</h3>
            
            <label className="flex items-center justify-between p-3 bg-gray-50 border border-gray-300 rounded-lg mb-2">
              <span className="text-sm">Use Virtual Number</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>

            <label className="flex items-center justify-between p-3 bg-gray-50 border border-gray-300 rounded-lg">
              <span className="text-sm">Show Profile to Buyers</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </label>
          </div>

          <div className="space-y-3">
            <PrimaryButton>Update Profile</PrimaryButton>
            <PrimaryButton variant="outline">Re-submit KYC Documents</PrimaryButton>
          </div>
        </div>
      </div>

      <BottomNav activeTab="profile" />
    </div>
  );
};
