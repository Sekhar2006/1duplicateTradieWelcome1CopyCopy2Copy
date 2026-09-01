import React, { useState } from 'react';
import { 
  TrendingUp, Package, DollarSign, Truck, Search, Filter,
  Eye, Video, AlertCircle, Scale, FileText, Download,
  Users, CreditCard, Calendar, CheckCircle, XCircle
} from 'lucide-react';
import {
  TopBar, BottomNav, Header, KPICard, ActionCard,
  PrimaryButton, FormField, StatusChip, EmptyState
} from './GlobalComponents';

// ============================================================================
// TRADER WIREFRAMES (T1-T5)
// ============================================================================

// T1: Trader Dashboard
export const T1_TraderDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TopBar title="Trader Dashboard" role="Trader" />
      
      <div className="flex-1 p-4 overflow-auto pb-20">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <KPICard label="Open Bids" value="12" icon={<TrendingUp className="w-4 h-4" />} />
          <KPICard label="Purchases" value="45" icon={<Package className="w-4 h-4" />} />
          <KPICard label="Dues" value="₹2.4L" trend="down" />
          <KPICard label="Arrivals" value="8" icon={<Truck className="w-4 h-4" />} />
        </div>

        <h3 className="font-medium text-gray-800 mb-3">Quick Actions</h3>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <ActionCard
            icon={<Search className="w-6 h-6 text-gray-600" />}
            title="Browse Lots"
            subtitle="Find commodities"
          />
          <ActionCard
            icon={<FileText className="w-6 h-6 text-gray-600" />}
            title="Post Requirement"
            subtitle="What you need"
          />
          <ActionCard
            icon={<Users className="w-6 h-6 text-gray-600" />}
            title="Assign Staff"
            subtitle="Manage team"
          />
          <ActionCard
            icon={<CreditCard className="w-6 h-6 text-gray-600" />}
            title="Payments"
            subtitle="View ledger"
          />
        </div>

        <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3">Recent Activity</h3>
          <EmptyState
            message="No recent activity"
            actionText="Browse Lots"
          />
        </div>
      </div>

      <BottomNav activeTab="home" />
    </div>
  );
};

// T2: Browse & Filter Lots
export const T2_BrowseFilterLots: React.FC = () => {
  const lots = [
    { id: 'TRD-001', commodity: 'Wheat Grade A', qty: '50 qtl', location: 'Punjab', price: '₹3,200/qtl' },
    { id: 'TRD-002', commodity: 'Rice Basmati', qty: '30 qtl', location: 'Haryana', price: '₹5,500/qtl' },
    { id: 'TRD-003', commodity: 'Cotton Long', qty: '20 qtl', location: 'Gujarat', price: '₹8,200/qtl' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Browse Lots" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search commodity..."
            className="flex-1 h-12 border-2 border-gray-300 rounded-lg px-4"
          />
          <button className="h-12 w-12 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="bg-white border-2 border-gray-300 rounded-lg p-3 mb-4">
          <h4 className="text-sm font-medium text-gray-800 mb-2">Filters</h4>
          <div className="flex flex-wrap gap-2">
            {['Commodity', 'Grade', 'Quantity', 'Location', 'Price'].map((filter) => (
              <button
                key={filter}
                className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg text-xs"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <h3 className="font-medium text-gray-800 mb-3">Available Lots</h3>

        <div className="space-y-3">
          {lots.map((lot) => (
            <div key={lot.id} className="bg-white border-2 border-gray-300 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-800">{lot.commodity}</h4>
                  <p className="text-sm text-gray-600">Token: {lot.id}</p>
                </div>
                <p className="font-semibold text-gray-800">{lot.price}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                <span>📦 {lot.qty}</span>
                <span>•</span>
                <span>📍 {lot.location}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 h-10 bg-gray-700 text-white rounded-lg text-sm">
                  <Eye className="w-4 h-4 inline mr-1" />
                  View
                </button>
                <button className="flex-1 h-10 bg-white border-2 border-gray-300 rounded-lg text-sm">
                  Bid
                </button>
                <button className="h-10 w-10 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                  <Video className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// T3: Bid Room
export const T3_BidRoom: React.FC = () => {
  const bids = [
    { trader: 'You', amount: '₹3,200', time: '1 min ago', status: 'leading' },
    { trader: 'Sharma Trading', amount: '₹3,150', time: '3 min ago', status: 'outbid' },
    { trader: 'Kumar Mills', amount: '₹3,100', time: '5 min ago', status: 'outbid' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Bid Room" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-gray-800 mb-2">Lot Details</h3>
          <p className="text-sm text-gray-600 mb-1">Wheat Grade A • 50 quintals</p>
          <p className="text-sm text-gray-600">Token: TRD-2024-0045</p>
          <div className="flex gap-1 mt-2">
            <StatusChip label="Quality Verified" variant="success" />
            <StatusChip label="Video Available" variant="info" />
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-3 mb-4">
          <p className="text-sm text-green-800 font-medium">💰 Min price locked: ₹3,000/quintal</p>
        </div>

        <h3 className="font-medium text-gray-800 mb-3">Current Bids</h3>

        <div className="space-y-2 mb-4">
          {bids.map((bid, i) => (
            <div key={i} className={`border-2 rounded-lg p-3 ${
              bid.status === 'leading' 
                ? 'bg-green-50 border-green-300' 
                : 'bg-white border-gray-300'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{bid.trader}</p>
                  <p className="text-xs text-gray-600">{bid.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{bid.amount}</p>
                  <StatusChip
                    label={bid.status === 'leading' ? 'Leading' : 'Outbid'}
                    variant={bid.status === 'leading' ? 'success' : 'default'}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Your Bid (₹/quintal)
          </label>
          <input
            type="number"
            placeholder="Enter bid amount"
            className="w-full h-12 border-2 border-gray-300 rounded-lg px-4 mb-3"
          />
          <p className="text-xs text-gray-600">Total: ₹1,60,000 (50 qtl × ₹3,200)</p>
        </div>

        <div className="space-y-3">
          <PrimaryButton>Place Bid</PrimaryButton>
          <PrimaryButton variant="outline">Withdraw Bid</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// T4: Weighing Co-Supervisor
export const T4_WeighingCoSupervisor: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Weighing (Trader View)" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-800 font-medium">📱 Ready to Sync with Producer</p>
        </div>

        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-gray-800 mb-3">Your Weighing Data</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Bag 001:</span>
              <input
                type="number"
                placeholder="Enter weight"
                className="w-24 h-8 border border-gray-300 rounded px-2 text-right"
              />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bag 002:</span>
              <input
                type="number"
                placeholder="Enter weight"
                className="w-24 h-8 border border-gray-300 rounded px-2 text-right"
              />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bag 003:</span>
              <input
                type="number"
                placeholder="Enter weight"
                className="w-24 h-8 border border-gray-300 rounded px-2 text-right"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <PrimaryButton>
            <Scale className="w-4 h-4 inline mr-2" />
            Sync with Producer
          </PrimaryButton>
          <PrimaryButton variant="outline">
            <AlertCircle className="w-4 h-4 inline mr-2" />
            Report Issue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// T5: Ledger & Payments
export const T5_LedgerPayments: React.FC = () => {
  const transactions = [
    { date: '10 Dec', party: 'Ram Producer', type: 'debit', amount: '₹1,60,000', status: 'paid' },
    { date: '8 Dec', party: 'Kumar Mills', type: 'credit', amount: '₹2,20,000', status: 'pending' },
    { date: '5 Dec', party: 'Sharma Farms', type: 'debit', amount: '₹85,000', status: 'overdue' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Ledger & Payments" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <KPICard label="Total Payable" value="₹2.45L" trend="down" />
          <KPICard label="Total Receivable" value="₹3.10L" trend="up" />
        </div>

        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-800 font-medium">⚠️ 2 payments overdue</p>
        </div>

        <h3 className="font-medium text-gray-800 mb-3">Recent Transactions</h3>

        <div className="space-y-2 mb-4">
          {transactions.map((txn, i) => (
            <div key={i} className="bg-white border-2 border-gray-300 rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-800">{txn.party}</p>
                  <p className="text-xs text-gray-600">{txn.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    txn.type === 'debit' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {txn.type === 'debit' ? '-' : '+'} {txn.amount}
                  </p>
                </div>
              </div>
              <StatusChip
                label={txn.status === 'paid' ? 'Paid' : txn.status === 'pending' ? 'Pending' : 'Overdue'}
                variant={txn.status === 'paid' ? 'success' : txn.status === 'pending' ? 'warning' : 'error'}
              />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <PrimaryButton>Record Payment</PrimaryButton>
          <PrimaryButton variant="outline">
            <Download className="w-4 h-4 inline mr-2" />
            Export CSV/PDF
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// BUYER WIREFRAMES (B1-B4)
// ============================================================================

// B1: Buyer Dashboard
export const B1_BuyerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TopBar title="Buyer Dashboard" role="Buyer" />
      
      <div className="flex-1 p-4 overflow-auto pb-20">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <KPICard label="Orders" value="8" icon={<Package className="w-4 h-4" />} />
          <KPICard label="Active Bids" value="5" icon={<TrendingUp className="w-4 h-4" />} />
          <KPICard label="Deliveries" value="3" icon={<Truck className="w-4 h-4" />} />
          <KPICard label="Dues" value="₹1.8L" trend="neutral" />
        </div>

        <h3 className="font-medium text-gray-800 mb-3">Quick Actions</h3>

        <div className="grid grid-cols-2 gap-3">
          <ActionCard
            icon={<Search className="w-6 h-6 text-gray-600" />}
            title="Discover"
            subtitle="Find products"
          />
          <ActionCard
            icon={<Video className="w-6 h-6 text-gray-600" />}
            title="Inspect"
            subtitle="Video check"
          />
          <ActionCard
            icon={<CheckCircle className="w-6 h-6 text-gray-600" />}
            title="Quality Check"
            subtitle="Request QC"
          />
          <ActionCard
            icon={<DollarSign className="w-6 h-6 text-gray-600" />}
            title="Payments"
            subtitle="Pay bills"
          />
        </div>
      </div>

      <BottomNav activeTab="home" />
    </div>
  );
};

// B2: Discover Listings
export const B2_DiscoverListings: React.FC = () => {
  const listings = [
    { id: 'TRD-101', commodity: 'Wheat Grade A', qty: '50 qtl', price: '₹3,200', quality: 'Verified' },
    { id: 'TRD-102', commodity: 'Rice Basmati', qty: '30 qtl', price: '₹5,500', quality: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Discover Listings" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 h-12 border-2 border-gray-300 rounded-lg px-4"
          />
          <button className="h-12 w-12 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-3">
          {listings.map((item) => (
            <div key={item.id} className="bg-white border-2 border-gray-300 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-800">{item.commodity}</h4>
                  <p className="text-sm text-gray-600">{item.id} • {item.qty}</p>
                </div>
                <p className="font-semibold text-gray-800">{item.price}/qtl</p>
              </div>
              <div className="mb-3">
                <StatusChip
                  label={`Quality: ${item.quality}`}
                  variant={item.quality === 'Verified' ? 'success' : 'warning'}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button className="h-10 bg-white border-2 border-gray-300 rounded-lg text-xs">
                  Request QC
                </button>
                <button className="h-10 bg-gray-700 text-white rounded-lg text-xs">
                  Place Bid
                </button>
                <button className="h-10 bg-white border-2 border-gray-300 rounded-lg text-xs flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// B3: Purchase & Confirmation
export const B3_PurchaseConfirmation: React.FC = () => {
  const [showOTP, setShowOTP] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Purchase Confirmation" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-md mx-auto">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">Purchase Summary</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Seller:</span>
                <span className="font-medium">Ram Kumar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Commodity:</span>
                <span className="font-medium">Wheat Grade A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">50 quintals</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price/qtl:</span>
                <span className="font-medium">₹3,200</span>
              </div>
              <div className="flex justify-between border-t-2 border-gray-200 pt-2 mt-2">
                <span className="font-medium">Total Amount:</span>
                <span className="font-semibold text-lg">₹1,60,000</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 mb-4">
            <p className="text-xs text-blue-800">✓ Quality verified • Payment terms: 7 days</p>
          </div>

          <div className="space-y-3">
            <PrimaryButton onClick={() => setShowOTP(true)}>
              Confirm Purchase (OTP)
            </PrimaryButton>
            <PrimaryButton variant="outline">Cancel</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// B4: Delivery & Storage
export const B4_DeliveryStorage: React.FC = () => {
  const [mode, setMode] = useState<'delivery' | 'storage' | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Delivery & Storage" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        {!mode && (
          <div className="grid grid-cols-1 gap-4 mb-4">
            <button
              onClick={() => setMode('delivery')}
              className="bg-white border-2 border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50"
            >
              <Truck className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">Deliver to Location</h3>
              <p className="text-sm text-gray-600">Direct delivery to your address</p>
            </button>
            
            <button
              onClick={() => setMode('storage')}
              className="bg-white border-2 border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50"
            >
              <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-1">Send to Storage</h3>
              <p className="text-sm text-gray-600">Store in warehouse facility</p>
            </button>
          </div>
        )}

        {mode === 'delivery' && (
          <div className="max-w-md mx-auto">
            <FormField label="Delivery Address" placeholder="Enter address" required />
            <FormField label="Delivery Date" type="date" required />
            
            <label className="flex items-center gap-3 p-3 bg-white border-2 border-gray-300 rounded-lg mb-4">
              <input type="checkbox" className="w-5 h-5" />
              <span className="text-sm">Attach insurance (₹500)</span>
            </label>

            <PrimaryButton>Confirm Delivery</PrimaryButton>
          </div>
        )}

        {mode === 'storage' && (
          <div className="max-w-md mx-auto">
            <FormField label="Storage Facility" placeholder="Select facility" required />
            <FormField label="Duration (months)" type="number" placeholder="Enter duration" />
            
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 mb-4">
              <p className="text-xs text-yellow-800">Storage cost: ₹500/month</p>
            </div>

            <PrimaryButton>Send to Storage</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMMISSION AGENT WIREFRAMES (C1-C4)
// ============================================================================

// C1: Agent Dashboard
export const C1_AgentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TopBar title="Commission Agent" role="Commission Agent" />
      
      <div className="flex-1 p-4 overflow-auto pb-20">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <KPICard label="Producers" value="24" icon={<Users className="w-4 h-4" />} />
          <KPICard label="Active Lots" value="18" icon={<Package className="w-4 h-4" />} />
          <KPICard label="Advances" value="₹3.2L" trend="up" />
          <KPICard label="Bills" value="12" icon={<FileText className="w-4 h-4" />} />
        </div>

        <h3 className="font-medium text-gray-800 mb-3">Quick Actions</h3>

        <div className="grid grid-cols-2 gap-3">
          <ActionCard
            icon={<Users className="w-6 h-6 text-gray-600" />}
            title="Add Producer"
            subtitle="OTP auth"
          />
          <ActionCard
            icon={<DollarSign className="w-6 h-6 text-gray-600" />}
            title="Advances"
            subtitle="Monitor dues"
          />
          <ActionCard
            icon={<TrendingUp className="w-6 h-6 text-gray-600" />}
            title="Price Lock"
            subtitle="Set minimum"
          />
          <ActionCard
            icon={<FileText className="w-6 h-6 text-gray-600" />}
            title="Bill Purchase"
            subtitle="Discount bills"
          />
        </div>
      </div>

      <BottomNav activeTab="home" />
    </div>
  );
};

// C2: Advances & Monitoring
export const C2_AdvancesMonitoring: React.FC = () => {
  const producers = [
    { name: 'Ram Kumar', debit: '₹50,000', credit: '₹45,000', advance: '₹5,000', alert: false },
    { name: 'Shyam Singh', debit: '₹80,000', credit: '₹60,000', advance: '₹20,000', alert: true },
    { name: 'Mohan Lal', debit: '₹30,000', credit: '₹35,000', advance: '-₹5,000', alert: false },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Advances & Monitoring" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <h3 className="font-medium text-gray-800 mb-3">Producer Accounts</h3>

        <div className="space-y-3 mb-4">
          {producers.map((p) => (
            <div key={p.name} className={`border-2 rounded-lg p-4 ${
              p.alert ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-gray-300'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-800">{p.name}</h4>
                {p.alert && <StatusChip label="Alert" variant="warning" />}
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-gray-600">Debit</p>
                  <p className="font-medium text-red-600">{p.debit}</p>
                </div>
                <div>
                  <p className="text-gray-600">Credit</p>
                  <p className="font-medium text-green-600">{p.credit}</p>
                </div>
                <div>
                  <p className="text-gray-600">Advance</p>
                  <p className={`font-medium ${
                    p.advance.startsWith('-') ? 'text-green-600' : 'text-red-600'
                  }`}>{p.advance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <PrimaryButton>Give Advance (OTP)</PrimaryButton>
          <PrimaryButton variant="outline">View History</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// C3: Price-Lock & Listings
export const C3_PriceLockListings: React.FC = () => {
  const lots = [
    { id: 'TRD-201', commodity: 'Wheat A', producer: 'Ram', minPrice: '₹3,000', status: 'active' },
    { id: 'TRD-202', commodity: 'Rice B', producer: 'Shyam', minPrice: '₹5,200', status: 'paused' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Price-Lock & Listings" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="space-y-3 mb-4">
          {lots.map((lot) => (
            <div key={lot.id} className="bg-white border-2 border-gray-300 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-800">{lot.commodity}</h4>
                  <p className="text-sm text-gray-600">Producer: {lot.producer}</p>
                  <p className="text-sm text-gray-600">Token: {lot.id}</p>
                </div>
                <StatusChip
                  label={lot.status === 'active' ? 'Active' : 'Paused'}
                  variant={lot.status === 'active' ? 'success' : 'default'}
                />
              </div>
              <div className="bg-gray-50 border border-gray-300 rounded p-2 mb-3">
                <p className="text-xs text-gray-600">Min Price Lock</p>
                <p className="font-semibold text-gray-800">{lot.minPrice}/qtl</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="h-10 bg-white border-2 border-gray-300 rounded-lg text-sm">
                  Edit Lock
                </button>
                <button className="h-10 bg-white border-2 border-gray-300 rounded-lg text-sm">
                  {lot.status === 'active' ? 'Pause' : 'Resume'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <PrimaryButton>Apply New Price Lock</PrimaryButton>
          <PrimaryButton variant="outline">Invite Buyers</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// C4: Bill Purchase (Discounting)
export const C4_BillPurchase: React.FC = () => {
  const [showDualOTP, setShowDualOTP] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="Bill Purchase" onBack={() => {}} onHelp={() => {}} />
      
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-md mx-auto">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">Bill Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Bill #:</span>
                <span className="font-medium">INV-2024-0128</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Producer:</span>
                <span className="font-medium">Ram Kumar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-lg">₹1,60,000</span>
              </div>
            </div>
          </div>

          <FormField
            label="Select Financier"
            placeholder="Choose financier"
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Discount % <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter discount percentage"
              className="w-full h-12 border-2 border-gray-300 rounded-lg px-4"
            />
          </div>

          <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-800 mb-2">Preview</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Bill Amount:</span>
                <span>₹1,60,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount (5%):</span>
                <span className="text-red-600">- ₹8,000</span>
              </div>
              <div className="flex justify-between border-t-2 border-gray-300 pt-2 mt-2">
                <span className="font-medium">Net Amount:</span>
                <span className="font-semibold">₹1,52,000</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <PrimaryButton onClick={() => setShowDualOTP(true)}>
              Sell Bill (Dual OTP)
            </PrimaryButton>
            <PrimaryButton variant="outline">Cancel</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
