import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Gift,
  ArrowUpRight,
  ArrowDownRight,
  History,
  Award,
  Zap,
  DollarSign,
  RefreshCw,
  Download,
  Plus,
  Minus,
  CreditCard,
  ShoppingCart,
  Users,
  Star,
  Sparkles,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BeautifulButton, IconButton } from '../ui/beautiful-buttons';
import { cn } from '../ui/utils';

// ==================== INTERFACES ====================

interface CommitCoin {
  balance: number;
  totalEarned: number;
  totalSpent: number;
  pendingRewards: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
}

interface Transaction {
  id: string;
  type: 'earn' | 'spend' | 'bonus';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

interface Reward {
  id: string;
  title: string;
  description: string;
  coins: number;
  icon: string;
  unlocked: boolean;
}

// ==================== MOCK DATA ====================

const walletData: CommitCoin = {
  balance: 2450,
  totalEarned: 5680,
  totalSpent: 3230,
  pendingRewards: 150,
  tier: 'Gold'
};

const transactions: Transaction[] = [
  {
    id: 'TXN-001',
    type: 'earn',
    amount: 100,
    description: 'Lot tokenization completed',
    date: '2025-10-23',
    status: 'completed'
  },
  {
    id: 'TXN-002',
    type: 'earn',
    amount: 50,
    description: 'Quality check passed',
    date: '2025-10-22',
    status: 'completed'
  },
  {
    id: 'TXN-003',
    type: 'bonus',
    amount: 200,
    description: 'Monthly bonus reward',
    date: '2025-10-20',
    status: 'completed'
  },
  {
    id: 'TXN-004',
    type: 'spend',
    amount: -75,
    description: 'Premium storage upgrade',
    date: '2025-10-19',
    status: 'completed'
  },
  {
    id: 'TXN-005',
    type: 'earn',
    amount: 150,
    description: 'Referral bonus',
    date: '2025-10-18',
    status: 'pending'
  }
];

const rewards: Reward[] = [
  {
    id: 'reward1',
    title: 'First Lot',
    description: 'Create your first lot',
    coins: 100,
    icon: '🎯',
    unlocked: true
  },
  {
    id: 'reward2',
    title: 'Quality Master',
    description: 'Pass 10 quality checks',
    coins: 250,
    icon: '⭐',
    unlocked: true
  },
  {
    id: 'reward3',
    title: 'Top Seller',
    description: 'Sell 50 lots',
    coins: 500,
    icon: '🏆',
    unlocked: false
  },
  {
    id: 'reward4',
    title: 'Community Hero',
    description: 'Refer 5 producers',
    coins: 300,
    icon: '👥',
    unlocked: false
  }
];

const tierBenefits = {
  Bronze: { discount: 0, priority: false, support: 'Standard' },
  Silver: { discount: 5, priority: false, support: 'Priority' },
  Gold: { discount: 10, priority: true, support: 'Premium' },
  Platinum: { discount: 15, priority: true, support: 'VIP' },
  Diamond: { discount: 20, priority: true, support: 'Dedicated' }
};

// ==================== MAIN COMPONENT ====================

const CommitCoinsWallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [wallet] = useState<CommitCoin>(walletData);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'from-orange-700 to-amber-700';
      case 'Silver': return 'from-gray-400 to-gray-600';
      case 'Gold': return 'from-yellow-500 to-amber-600';
      case 'Platinum': return 'from-indigo-500 to-purple-600';
      case 'Diamond': return 'from-cyan-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Bronze': return '🥉';
      case 'Silver': return '🥈';
      case 'Gold': return '🥇';
      case 'Platinum': return '💎';
      case 'Diamond': return '💠';
      default: return '🏅';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ==================== WALLET HERO CARD ==================== */}
      <Card className={cn(
        'relative overflow-hidden p-8',
        'bg-gradient-to-r',
        getTierColor(wallet.tier)
      )}>
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent)]" />
        </div>

        <div className="relative z-10 text-white">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-6 h-6" />
                <h3 className="text-lg opacity-90">Commit Coins Wallet</h3>
              </div>
              <div className="flex items-baseline gap-3">
                <h1 className="text-5xl font-bold">{wallet.balance.toLocaleString()}</h1>
                <span className="text-xl opacity-90">CC</span>
              </div>
            </div>
            
            {/* Tier Badge */}
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
              <p className="text-4xl mb-1">{getTierIcon(wallet.tier)}</p>
              <p className="text-sm font-semibold">{wallet.tier} Tier</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" />
                <p className="text-sm opacity-90">Earned</p>
              </div>
              <p className="text-2xl font-bold">{wallet.totalEarned.toLocaleString()}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4" />
                <p className="text-sm opacity-90">Spent</p>
              </div>
              <p className="text-2xl font-bold">{wallet.totalSpent.toLocaleString()}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Gift className="w-4 h-4" />
                <p className="text-sm opacity-90">Pending</p>
              </div>
              <p className="text-2xl font-bold">{wallet.pendingRewards.toLocaleString()}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 mt-6">
            <BeautifulButton
              variant="gold"
              size="md"
              icon={Plus}
              className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              Earn Coins
            </BeautifulButton>
            <BeautifulButton
              variant="gold"
              size="md"
              icon={ShoppingCart}
              className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              Redeem
            </BeautifulButton>
            <IconButton
              icon={RefreshCw}
              variant="gold"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
            />
          </div>
        </div>
      </Card>

      {/* ==================== TABS ==================== */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        {/* ==================== OVERVIEW TAB ==================== */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          
          {/* Tier Benefits */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your {wallet.tier} Benefits</h3>
              <Badge className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
                <Sparkles className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-600 mb-1">Discount</p>
                <p className="text-2xl font-bold text-blue-600">
                  {tierBenefits[wallet.tier].discount}%
                </p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <Zap className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm text-gray-600 mb-1">Priority Access</p>
                <p className="text-xl font-bold text-purple-600">
                  {tierBenefits[wallet.tier].priority ? 'Yes' : 'No'}
                </p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <Award className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-gray-600 mb-1">Support</p>
                <p className="text-xl font-bold text-green-600">
                  {tierBenefits[wallet.tier].support}
                </p>
              </div>
            </div>
          </Card>

          {/* Ways to Earn */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Ways to Earn Commit Coins</h3>
            <div className="space-y-3">
              {[
                { icon: '🎯', action: 'Create a Lot', coins: 100 },
                { icon: '⭐', action: 'Pass Quality Check', coins: 50 },
                { icon: '📦', action: 'Complete Sale', coins: 200 },
                { icon: '👥', action: 'Refer a Producer', coins: 150 },
                { icon: '📸', action: 'Upload Crop Photos', coins: 25 },
                { icon: '✅', action: 'Complete Profile', coins: 75 }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium">{item.action}</span>
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
                    +{item.coins} CC
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ==================== HISTORY TAB ==================== */}
        <TabsContent value="history" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Transaction History</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>

            <div className="space-y-3">
              {transactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'p-3 rounded-full',
                      txn.type === 'earn' ? 'bg-green-100' :
                      txn.type === 'bonus' ? 'bg-purple-100' :
                      'bg-red-100'
                    )}>
                      {txn.type === 'earn' && <ArrowUpRight className="w-5 h-5 text-green-600" />}
                      {txn.type === 'bonus' && <Gift className="w-5 h-5 text-purple-600" />}
                      {txn.type === 'spend' && <ArrowDownRight className="w-5 h-5 text-red-600" />}
                    </div>
                    <div>
                      <p className="font-medium">{txn.description}</p>
                      <p className="text-sm text-gray-600">
                        {txn.date} • {txn.id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      'text-xl font-bold',
                      txn.amount > 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {txn.amount > 0 ? '+' : ''}{txn.amount} CC
                    </p>
                    <Badge className={cn(
                      txn.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    )}>
                      {txn.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ==================== REWARDS TAB ==================== */}
        <TabsContent value="rewards" className="space-y-4 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Achievements & Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  className={cn(
                    'p-6 rounded-xl border-2 transition-all',
                    reward.unlocked
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'text-4xl p-3 rounded-full',
                      reward.unlocked ? 'bg-green-100' : 'bg-gray-200'
                    )}>
                      {reward.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{reward.title}</h4>
                        {reward.unlocked && (
                          <Badge className="bg-green-600 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Unlocked
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
                        {reward.coins} CC
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommitCoinsWallet;
