import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Store, Users, MapPin, Star, Search, Phone, Award, TrendingUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Marketplace {
  id: string;
  name: string;
  location: string;
  distance: number;
  rating: number;
  totalTrades: number;
  specialties: string[];
  verified: boolean;
}

interface CommissionAgent {
  id: string;
  name: string;
  company: string;
  location: string;
  rating: number;
  successfulDeals: number;
  specialties: string[];
  commission: number;
  verified: boolean;
}

interface MarketplaceAgentBrowsingScreenProps {
  onContactMarketplace: (marketplace: Marketplace) => void;
  onEngageAgent: (agent: CommissionAgent) => void;
  onBack: () => void;
}

export const MarketplaceAgentBrowsingScreen: React.FC<MarketplaceAgentBrowsingScreenProps> = ({
  onContactMarketplace,
  onEngageAgent,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'marketplaces' | 'agents'>('marketplaces');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    minRating: 'all',
    specialty: 'all',
    maxDistance: 'all',
  });

  // Mock marketplaces data
  const marketplaces: Marketplace[] = [
    {
      id: 'MKT-001',
      name: 'Punjab Mandi',
      location: 'Ludhiana, Punjab',
      distance: 8.5,
      rating: 4.7,
      totalTrades: 15420,
      specialties: ['Wheat', 'Rice', 'Cotton'],
      verified: true,
    },
    {
      id: 'MKT-002',
      name: 'Green Valley Market',
      location: 'Jalandhar, Punjab',
      distance: 15.2,
      rating: 4.5,
      totalTrades: 8930,
      specialties: ['Wheat', 'Maize', 'Pulses'],
      verified: true,
    },
    {
      id: 'MKT-003',
      name: 'Farmer\'s Hub',
      location: 'Amritsar, Punjab',
      distance: 12.3,
      rating: 4.8,
      totalTrades: 12150,
      specialties: ['Wheat', 'Vegetables', 'Fruits'],
      verified: true,
    },
  ];

  // Mock commission agents data
  const agents: CommissionAgent[] = [
    {
      id: 'AGT-001',
      name: 'Rajesh Sharma',
      company: 'PSR & Co',
      location: 'Ludhiana, Punjab',
      rating: 4.9,
      successfulDeals: 342,
      specialties: ['Wheat', 'Rice'],
      commission: 2.5,
      verified: true,
    },
    {
      id: 'AGT-002',
      name: 'Amit Singh',
      company: 'Golden Harvest Traders',
      location: 'Jalandhar, Punjab',
      rating: 4.6,
      successfulDeals: 218,
      specialties: ['Wheat', 'Cotton', 'Maize'],
      commission: 3.0,
      verified: true,
    },
    {
      id: 'AGT-003',
      name: 'Priya Patel',
      company: 'Agri Connect Solutions',
      location: 'Amritsar, Punjab',
      rating: 4.8,
      successfulDeals: 289,
      specialties: ['All Crops', 'Export Specialist'],
      commission: 2.8,
      verified: true,
    },
  ];

  const filteredMarketplaces = marketplaces.filter((marketplace) => {
    if (searchQuery && !marketplace.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.minRating !== 'all' && marketplace.rating < Number(filters.minRating)) {
      return false;
    }
    if (filters.maxDistance !== 'all' && marketplace.distance > Number(filters.maxDistance)) {
      return false;
    }
    return true;
  });

  const filteredAgents = agents.filter((agent) => {
    if (searchQuery && !agent.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.minRating !== 'all' && agent.rating < Number(filters.minRating)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2" style={{ color: '#003E6D' }}>Browse Marketplaces & Commission Agents</h1>
          <p className="text-gray-600">Connect with verified marketplaces and trusted commission agents</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={activeTab === 'marketplaces' ? 'Search marketplaces...' : 'Search agents...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Min Rating</label>
              <Select value={filters.minRating} onValueChange={(v) => setFilters({ ...filters, minRating: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Specialty</label>
              <Select value={filters.specialty} onValueChange={(v) => setFilters({ ...filters, specialty: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {activeTab === 'marketplaces' && (
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Distance</label>
                <Select value={filters.maxDistance} onValueChange={(v) => setFilters({ ...filters, maxDistance: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Distances</SelectItem>
                    <SelectItem value="10">Within 10 km</SelectItem>
                    <SelectItem value="20">Within 20 km</SelectItem>
                    <SelectItem value="50">Within 50 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'marketplaces' | 'agents')}>
          <TabsList className="mb-6">
            <TabsTrigger value="marketplaces">
              <Store className="w-4 h-4 mr-2" />
              Marketplaces
            </TabsTrigger>
            <TabsTrigger value="agents">
              <Users className="w-4 h-4 mr-2" />
              Commission Agents
            </TabsTrigger>
          </TabsList>

          {/* Marketplaces Tab */}
          <TabsContent value="marketplaces">
            <div className="space-y-4">
              {filteredMarketplaces.map((marketplace) => (
                <Card key={marketplace.id} className="p-6 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-lg bg-green-100 flex items-center justify-center">
                        <Store className="w-10 h-10 text-green-600" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 style={{ color: '#003E6D' }}>{marketplace.name}</h3>
                            {marketplace.verified && (
                              <Badge className="bg-blue-500 text-white text-xs">Verified</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {marketplace.location} • {marketplace.distance} km
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span style={{ color: '#003E6D' }}>{marketplace.rating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Total Trades</p>
                          <p style={{ color: '#003E6D' }}>{marketplace.totalTrades.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Specialties</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {marketplace.specialties.slice(0, 3).map((specialty) => (
                              <Badge key={specialty} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => {
                            onContactMarketplace(marketplace);
                            toast.success(`Contacting ${marketplace.name}`);
                          }}
                          className="text-white"
                          style={{ backgroundColor: '#FFD700' }}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Marketplace
                        </Button>
                        <Button variant="outline">View Reviews</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Commission Agents Tab */}
          <TabsContent value="agents">
            <div className="space-y-4">
              {filteredAgents.map((agent) => (
                <Card key={agent.id} className="p-6 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFD70020' }}>
                        <Users className="w-10 h-10" style={{ color: '#FFD700' }} />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 style={{ color: '#003E6D' }}>{agent.name}</h3>
                            {agent.verified && (
                              <Badge className="bg-blue-500 text-white text-xs">Verified</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{agent.company}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <MapPin className="w-4 h-4" />
                            {agent.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span style={{ color: '#003E6D' }}>{agent.rating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Successful Deals</p>
                          <p style={{ color: '#003E6D' }}>{agent.successfulDeals}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Commission</p>
                          <p style={{ color: '#003E6D' }}>{agent.commission}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Specialties</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {agent.specialties.slice(0, 2).map((specialty) => (
                              <Badge key={specialty} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => {
                            onEngageAgent(agent);
                            toast.success(`Engaging ${agent.name}`);
                          }}
                          className="text-white"
                          style={{ backgroundColor: '#FFD700' }}
                        >
                          <Award className="w-4 h-4 mr-2" />
                          Engage Commission Agent
                        </Button>
                        <Button variant="outline">View Profile</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Back Button */}
        <div className="flex justify-start mt-8">
          <Button variant="outline" onClick={onBack}>
            Back to Decision
          </Button>
        </div>
      </div>
    </div>
  );
};
