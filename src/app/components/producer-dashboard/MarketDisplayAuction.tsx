import React, { useState, useEffect } from 'react';
import {
  Gavel,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Eye,
  Pause,
  Play,
  Package,
  Star,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Bell,
  Target,
  Award,
  BarChart3,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { BeautifulButton, ButtonGroup } from '../ui/beautiful-buttons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { cn } from '../ui/utils';
import { motion, AnimatePresence } from 'motion/react';

// ==================== INTERFACES ====================

interface MarketDisplayAuctionProps {
  producerId: string;
  commodityData: any;
  onComplete: (data: AuctionData) => void;
  onBack: () => void;
}

interface AuctionData {
  lotId: string;
  startTime: string;
  endTime: string;
  reservePrice?: number;
  highestBid: Bid;
  totalBids: number;
  totalBidders: number;
  status: 'live' | 'paused' | 'completed' | 'scheduled';
  winnerSelected: boolean;
}

interface Bid {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerRating: number;
  amount: number;
  timestamp: string;
  status: 'active' | 'outbid' | 'winner';
}

interface BidHistory {
  bids: Bid[];
  currentHighest: Bid | null;
}

// ==================== MOCK DATA ====================

const mockBids: Bid[] = [
  {
    id: 'BID-001',
    buyerId: 'BUY-123',
    buyerName: 'Grain Traders Ltd',
    buyerRating: 4.8,
    amount: 248000,
    timestamp: new Date(Date.now() - 300000).toISOString(),
    status: 'active'
  },
  {
    id: 'BID-002',
    buyerId: 'BUY-456',
    buyerName: 'Punjab Commodities',
    buyerRating: 4.6,
    amount: 245000,
    timestamp: new Date(Date.now() - 600000).toISOString(),
    status: 'outbid'
  },
  {
    id: 'BID-003',
    buyerId: 'BUY-789',
    buyerName: 'Modern Agri Corp',
    buyerRating: 4.9,
    amount: 242000,
    timestamp: new Date(Date.now() - 900000).toISOString(),
    status: 'outbid'
  },
];

// ==================== MAIN COMPONENT ====================

const MarketDisplayAuction: React.FC<MarketDisplayAuctionProps> = ({
  producerId,
  commodityData,
  onComplete,
  onBack
}) => {
  const [auctionStatus, setAuctionStatus] = useState<'scheduled' | 'live' | 'paused' | 'completed'>('live');
  const [bids, setBids] = useState<Bid[]>(mockBids);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [showControls, setShowControls] = useState(false);
  const [newBidAlert, setNewBidAlert] = useState(false);

  const highestBid = bids[0];
  const secondHighestBid = bids[1];
  const totalBidders = new Set(bids.map(b => b.buyerId)).size;

  // Countdown timer
  useEffect(() => {
    if (auctionStatus !== 'live') return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setAuctionStatus('completed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [auctionStatus]);

  // Simulate new bids coming in
  useEffect(() => {
    if (auctionStatus !== 'live') return;

    const bidInterval = setInterval(() => {
      const shouldReceiveBid = Math.random() > 0.7; // 30% chance every interval
      
      if (shouldReceiveBid) {
        const newBid: Bid = {
          id: `BID-${Date.now()}`,
          buyerId: `BUY-${Math.floor(Math.random() * 1000)}`,
          buyerName: ['AgriMax Trading', 'Global Grains', 'FarmFresh Corp', 'Harvest Hub'][Math.floor(Math.random() * 4)],
          buyerRating: 4.5 + Math.random() * 0.4,
          amount: highestBid.amount + 1000 + Math.floor(Math.random() * 5000),
          timestamp: new Date().toISOString(),
          status: 'active'
        };

        setBids(prev => {
          const updated = prev.map(b => ({ ...b, status: 'outbid' as const }));
          return [newBid, ...updated];
        });

        setNewBidAlert(true);
        setTimeout(() => setNewBidAlert(false), 2000);
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(bidInterval);
  }, [auctionStatus, highestBid]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePauseAuction = () => {
    setAuctionStatus('paused');
    setShowControls(false);
  };

  const handleResumeAuction = () => {
    setAuctionStatus('live');
  };

  const handleMoveToStorage = () => {
    // Logic to move commodity to storage
    alert('Commodity will be moved to storage. Auction will be rescheduled.');
    onBack();
  };

  const handleAcceptBid = (bid: Bid) => {
    setSelectedBid(bid);
    setAuctionStatus('completed');
    
    const auctionData: AuctionData = {
      lotId: commodityData?.lotId || 'LOT-2025-001',
      startTime: new Date(Date.now() - 3600000).toISOString(),
      endTime: new Date().toISOString(),
      highestBid: bid,
      totalBids: bids.length,
      totalBidders,
      status: 'completed',
      winnerSelected: true
    };

    setTimeout(() => {
      onComplete(auctionData);
    }, 2000);
  };

  const percentageAboveReserve = ((highestBid.amount - (commodityData?.expectedPrice || 240000)) / (commodityData?.expectedPrice || 240000)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">⚖️ Market Display & Live Auction</h1>
            <p className="text-gray-600">
              Real-time bidding and price discovery for your commodity
            </p>
          </div>
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Auction Display */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Status Banner */}
            <Card className={cn(
              'p-6',
              auctionStatus === 'live' && 'bg-gradient-to-r from-green-600 to-emerald-600',
              auctionStatus === 'paused' && 'bg-gradient-to-r from-orange-600 to-amber-600',
              auctionStatus === 'completed' && 'bg-gradient-to-r from-purple-600 to-pink-600',
              'text-white'
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'w-4 h-4 rounded-full',
                    auctionStatus === 'live' && 'bg-white animate-pulse'
                  )} />
                  <div>
                    <p className="text-sm opacity-90">Auction Status</p>
                    <p className="text-2xl font-bold uppercase">{auctionStatus}</p>
                  </div>
                </div>

                {auctionStatus === 'live' && (
                  <div className="text-right">
                    <p className="text-sm opacity-90 mb-1">Time Remaining</p>
                    <p className="text-3xl font-bold font-mono">{formatTime(timeRemaining)}</p>
                  </div>
                )}

                {auctionStatus === 'completed' && (
                  <CheckCircle className="w-16 h-16" />
                )}
              </div>
            </Card>

            {/* Commodity Display */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <Badge className="bg-blue-600 mb-3">Token ID: {commodityData?.lotId || 'LOT-2025-001'}</Badge>
                  <h2 className="text-2xl font-bold mb-2">{commodityData?.commodity || 'Wheat Grade A'}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      {commodityData?.quantity || '100'} quintals
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      Quality Score: 95/100
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Reserve Price</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{(commodityData?.expectedPrice || 240000).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Photos/Quality */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Photo 1</span>
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Quality Report</span>
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Token Details</span>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Moisture</p>
                  <p className="font-bold">12%</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Grade</p>
                  <p className="font-bold">A</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Bags</p>
                  <p className="font-bold">{commodityData?.bags || '50'}</p>
                </div>
              </div>
            </Card>

            {/* Current Highest Bid */}
            <AnimatePresence>
              {newBidAlert && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 bg-green-600 text-white rounded-lg flex items-center gap-3"
                >
                  <Bell className="w-6 h-6 animate-bounce" />
                  <span className="font-semibold">New bid received!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Current Highest Bid</p>
                  <p className="text-4xl font-bold text-green-600 mb-4">
                    ₹{highestBid.amount.toLocaleString()}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Bidder</p>
                      <p className="font-semibold">{highestBid.buyerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Rating</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {highestBid.buyerRating}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Above Reserve</p>
                      <p className="font-semibold text-green-600">
                        +{percentageAboveReserve.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <Badge className="bg-green-600">Leading</Badge>
                </div>
              </div>
            </Card>

            {/* Bid History */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Bid History</h3>
                <Badge>{bids.length} Total Bids</Badge>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {bids.map((bid, idx) => (
                  <motion.div
                    key={bid.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      'p-4 rounded-lg border-2 transition-all',
                      bid.status === 'active' && 'border-green-300 bg-green-50',
                      bid.status === 'outbid' && 'border-gray-200 bg-gray-50 opacity-60'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{bid.buyerName}</p>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{bid.buyerRating}</span>
                          {bid.status === 'active' && (
                            <Badge className="bg-green-600 text-xs">Highest</Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">
                          {new Date(bid.timestamp).toLocaleTimeString()}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          ₹{bid.amount.toLocaleString()}
                        </p>
                        {idx > 0 && (
                          <p className="text-xs text-gray-600">
                            +₹{(bid.amount - bids[idx - 1].amount).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: Controls & Stats */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <Card className="p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
              <h3 className="text-xl font-semibold mb-4">Auction Stats</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-90 mb-1">Total Bids</p>
                  <p className="text-3xl font-bold">{bids.length}</p>
                </div>

                <div>
                  <p className="text-sm opacity-90 mb-1">Active Bidders</p>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    <Users className="w-8 h-8" />
                    {totalBidders}
                  </p>
                </div>

                <div>
                  <p className="text-sm opacity-90 mb-1">Bid Increment</p>
                  <p className="text-2xl font-bold">
                    ₹{secondHighestBid ? (highestBid.amount - secondHighestBid.amount).toLocaleString() : '0'}
                  </p>
                </div>

                <div>
                  <p className="text-sm opacity-90 mb-1">Watching</p>
                  <p className="text-2xl font-bold flex items-center gap-2">
                    <Eye className="w-6 h-6" />
                    {15 + totalBidders}
                  </p>
                </div>
              </div>
            </Card>

            {/* Producer Controls */}
            {auctionStatus !== 'completed' && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Producer Controls</h3>
                
                <div className="space-y-3">
                  {auctionStatus === 'live' && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handlePauseAuction}
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pause Auction
                    </Button>
                  )}

                  {auctionStatus === 'paused' && (
                    <Button
                      variant="outline"
                      className="w-full justify-start border-green-600 text-green-600"
                      onClick={handleResumeAuction}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Resume Auction
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleMoveToStorage}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Move to Storage
                  </Button>

                  {highestBid && (
                    <BeautifulButton
                      variant="success"
                      fullWidth
                      icon={CheckCircle}
                      onClick={() => handleAcceptBid(highestBid)}
                    >
                      Accept Highest Bid
                    </BeautifulButton>
                  )}
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    💡 You can monitor this auction remotely and take actions anytime
                  </p>
                </div>
              </Card>
            )}

            {/* Market Trends */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Market Trends
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Market Avg Price</span>
                  <span className="font-semibold">₹2,380/quintal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Your Bid</span>
                  <span className="font-semibold text-green-600">
                    ₹{(highestBid.amount / (commodityData?.quantity || 100)).toLocaleString()}/quintal
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Premium</span>
                  <span className="font-semibold text-green-600">
                    +₹{((highestBid.amount / (commodityData?.quantity || 100)) - 2380).toFixed(0)}/quintal
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>Prices up 5% this week</span>
                </div>
              </div>
            </Card>

            {/* Winner Announcement */}
            {auctionStatus === 'completed' && selectedBid && (
              <Card className="p-6 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                <div className="text-center">
                  <Award className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Auction Complete!</h3>
                  <p className="mb-4">Winner: {selectedBid.buyerName}</p>
                  <p className="text-3xl font-bold mb-6">
                    ₹{selectedBid.amount.toLocaleString()}
                  </p>
                  
                  <BeautifulButton
                    variant="gold"
                    size="lg"
                    fullWidth
                    icon={ArrowRight}
                    iconPosition="right"
                    shimmer
                    glow
                    onClick={() => onComplete({
                      lotId: commodityData?.lotId || 'LOT-2025-001',
                      startTime: new Date(Date.now() - 3600000).toISOString(),
                      endTime: new Date().toISOString(),
                      highestBid: selectedBid,
                      totalBids: bids.length,
                      totalBidders,
                      status: 'completed',
                      winnerSelected: true
                    })}
                  >
                    Proceed to Quality Check
                  </BeautifulButton>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDisplayAuction;
