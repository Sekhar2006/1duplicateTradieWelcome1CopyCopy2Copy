import React, { useState } from 'react';
import { MessageCircle, Shield, TrendingUp, MapPin, Star, Filter } from 'lucide-react';
import { DSButton } from '../../design-system/components/DSButton';
import { DSCard } from '../../design-system/components/DSCard';
import { DSBadge } from '../../design-system/components/DSBadge';

interface MatchmakingScreenProps {
  onBack?: () => void;
}

export default function MatchmakingScreen({ onBack }: MatchmakingScreenProps) {
  const [filterType, setFilterType] = useState<'all' | 'verified' | 'premium'>('all');
  const [filterHistory, setFilterHistory] = useState<'all' | 'repeat' | 'new'>('all');

  const potentialMatches = [
    {
      id: 1,
      name: 'Maharashtra Grains Co.',
      type: 'Buyer',
      commodity: 'Wheat',
      quantity: '50 MT',
      location: 'Mumbai, Maharashtra',
      rating: 4.8,
      completedDeals: 127,
      verified: true,
      premium: true,
      history: 'repeat',
      matchScore: 95,
      priceRange: '₹22,000 - ₹24,000/MT'
    },
    {
      id: 2,
      name: 'Punjab Agricultural Traders',
      type: 'Buyer',
      commodity: 'Rice',
      quantity: '100 MT',
      location: 'Ludhiana, Punjab',
      rating: 4.6,
      completedDeals: 89,
      verified: true,
      premium: false,
      history: 'new',
      matchScore: 88,
      priceRange: '₹28,000 - ₹30,000/MT'
    },
    {
      id: 3,
      name: 'Karnataka Quality Lots',
      type: 'Lot',
      commodity: 'Coffee Beans',
      quantity: '25 MT',
      location: 'Chikmagalur, Karnataka',
      rating: 4.9,
      completedDeals: 56,
      verified: true,
      premium: true,
      history: 'repeat',
      matchScore: 92,
      priceRange: '₹180,000 - ₹200,000/MT'
    },
    {
      id: 4,
      name: 'Gujarat Commodity Exchange',
      type: 'Buyer',
      commodity: 'Cotton',
      quantity: '75 MT',
      location: 'Ahmedabad, Gujarat',
      rating: 4.7,
      completedDeals: 143,
      verified: true,
      premium: false,
      history: 'repeat',
      matchScore: 85,
      priceRange: '₹52,000 - ₹55,000/MT'
    }
  ];

  const filteredMatches = potentialMatches.filter(match => {
    if (filterType === 'verified' && !match.verified) return false;
    if (filterType === 'premium' && !match.premium) return false;
    if (filterHistory !== 'all' && match.history !== filterHistory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#003E6D] mb-2">Smart Matchmaking</h1>
          <p className="text-gray-600">AI-powered matches based on your profile and preferences</p>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-[#003E6D]" />
            <span className="text-[#003E6D]">Filters</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Match Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    filterType === 'all'
                      ? 'bg-[#FFD700] text-[#003E6D]'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('verified')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    filterType === 'verified'
                      ? 'bg-[#FFD700] text-[#003E6D]'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Verified Only
                </button>
                <button
                  onClick={() => setFilterType('premium')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    filterType === 'premium'
                      ? 'bg-[#FFD700] text-[#003E6D]'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Premium
                </button>
              </div>
            </div>

            {/* History Filter */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Transaction History</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterHistory('all')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    filterHistory === 'all'
                      ? 'bg-[#FFD700] text-[#003E6D]'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterHistory('repeat')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    filterHistory === 'repeat'
                      ? 'bg-[#FFD700] text-[#003E6D]'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Repeat Partners
                </button>
                <button
                  onClick={() => setFilterHistory('new')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    filterHistory === 'new'
                      ? 'bg-[#FFD700] text-[#003E6D]'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  New Partners
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Match Cards */}
        <div className="space-y-4 mb-6">
          {filteredMatches.map((match) => (
            <DSCard key={match.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-[#003E6D]">{match.name}</h3>
                      {match.verified && (
                        <Shield className="w-5 h-5 text-green-600" />
                      )}
                      {match.premium && (
                        <DSBadge variant="warning">Premium</DSBadge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {match.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                        {match.rating} ({match.completedDeals} deals)
                      </span>
                    </div>
                  </div>
                  
                  {/* Match Score */}
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFD700]/50 flex items-center justify-center mb-1">
                      <span className="text-[#003E6D]">{match.matchScore}%</span>
                    </div>
                    <span className="text-xs text-gray-600">Match</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF]/30 rounded-lg">
                  <div>
                    <span className="text-xs text-gray-600 block mb-1">Type</span>
                    <span className="text-[#003E6D]">{match.type}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-600 block mb-1">Commodity</span>
                    <span className="text-[#003E6D]">{match.commodity}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-600 block mb-1">Quantity</span>
                    <span className="text-[#003E6D]">{match.quantity}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-600 block mb-1">Price Range</span>
                    <span className="text-[#003E6D]">{match.priceRange}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <DSButton variant="primary" className="flex-1 flex items-center justify-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Propose Price
                  </DSButton>
                  <DSButton variant="outline" className="flex-1 flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </DSButton>
                  <DSButton variant="outline" className="flex-1 flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    Request Verification
                  </DSButton>
                </div>
              </div>
            </DSCard>
          ))}
        </div>

        {/* Back Button */}
        {onBack && (
          <DSButton variant="outline" onClick={onBack} className="w-full">
            Back to Dashboard
          </DSButton>
        )}
      </div>
    </div>
  );
}
