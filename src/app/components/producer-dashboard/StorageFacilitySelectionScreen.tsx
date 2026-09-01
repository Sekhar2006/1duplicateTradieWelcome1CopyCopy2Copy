import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Warehouse, MapPin, Star, DollarSign, Gauge, Search, Map } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface StorageFacility {
  id: string;
  name: string;
  distance: number;
  pricePerKg: number;
  reputationScore: number;
  capacity: number;
  availableCapacity: number;
  location: string;
  features: string[];
  rating: number;
}

interface StorageFacilitySelectionScreenProps {
  onSelectFacility: (facility: StorageFacility) => void;
  onBack: () => void;
  lotData?: {
    quantity: number;
  };
}

export const StorageFacilitySelectionScreen: React.FC<StorageFacilitySelectionScreenProps> = ({
  onSelectFacility,
  onBack,
  lotData = { quantity: 1000 },
}) => {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    maxDistance: 'all',
    minReputation: 'all',
    priceRange: 'all',
  });

  // Mock storage facilities data
  const facilities: StorageFacility[] = [
    {
      id: 'SF-001',
      name: 'Punjab Agri Storage',
      distance: 5.2,
      pricePerKg: 2.5,
      reputationScore: 95,
      capacity: 50000,
      availableCapacity: 25000,
      location: 'Ludhiana, Punjab',
      features: ['Climate Controlled', 'Pest Management', '24/7 Security'],
      rating: 4.8,
    },
    {
      id: 'SF-002',
      name: 'Green Valley Warehouse',
      distance: 12.8,
      pricePerKg: 2.0,
      reputationScore: 88,
      capacity: 75000,
      availableCapacity: 40000,
      location: 'Jalandhar, Punjab',
      features: ['Climate Controlled', 'Insurance Available'],
      rating: 4.5,
    },
    {
      id: 'SF-003',
      name: 'Modern Cold Storage',
      distance: 8.5,
      pricePerKg: 3.0,
      reputationScore: 92,
      capacity: 30000,
      availableCapacity: 15000,
      location: 'Amritsar, Punjab',
      features: ['Cold Storage', 'Pest Management', '24/7 Security', 'Insurance'],
      rating: 4.7,
    },
    {
      id: 'SF-004',
      name: 'Farmer\'s Choice Storage',
      distance: 18.3,
      pricePerKg: 1.8,
      reputationScore: 85,
      capacity: 100000,
      availableCapacity: 60000,
      location: 'Patiala, Punjab',
      features: ['Large Capacity', 'Affordable Rates'],
      rating: 4.3,
    },
  ];

  const getReputationColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const filteredFacilities = facilities.filter((facility) => {
    if (searchQuery && !facility.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.maxDistance !== 'all' && facility.distance > Number(filters.maxDistance)) {
      return false;
    }
    if (filters.minReputation !== 'all' && facility.reputationScore < Number(filters.minReputation)) {
      return false;
    }
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (facility.pricePerKg < min || facility.pricePerKg > max) {
        return false;
      }
    }
    return true;
  });

  const handleSelectFacility = (facility: StorageFacility) => {
    if (facility.availableCapacity < lotData.quantity) {
      toast.error('Insufficient storage capacity available');
      return;
    }
    onSelectFacility(facility);
    toast.success(`Selected ${facility.name}`);
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2" style={{ color: '#003E6D' }}>Select Storage Facility</h1>
          <p className="text-gray-600">Find the best storage facility for your commodity</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search facilities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Tabs value={view} onValueChange={(v) => setView(v as 'list' | 'map')} className="w-auto">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Max Distance (km)</label>
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

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Min Reputation</label>
              <Select value={filters.minReputation} onValueChange={(v) => setFilters({ ...filters, minReputation: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="90">Excellent (90+)</SelectItem>
                  <SelectItem value="80">Good (80+)</SelectItem>
                  <SelectItem value="70">Fair (70+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Price Range (₹/kg)</label>
              <Select value={filters.priceRange} onValueChange={(v) => setFilters({ ...filters, priceRange: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-2">₹0 - ₹2</SelectItem>
                  <SelectItem value="2-3">₹2 - ₹3</SelectItem>
                  <SelectItem value="3-5">₹3 - ₹5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* View Content */}
        {view === 'map' ? (
          <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col items-center justify-center py-20">
              <Map className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-500 mb-2">Interactive Map View</p>
              <p className="text-sm text-gray-400">
                Color-coded markers showing facility ratings and distances
              </p>
              <div className="mt-6 flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">Excellent (90+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Good (80-89)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-600">Fair (70-79)</span>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredFacilities.length === 0 ? (
              <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-lg">
                <div className="text-center text-gray-500">
                  <Warehouse className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No storage facilities match your filters</p>
                  <p className="text-sm text-gray-400 mt-2">Try adjusting your search criteria</p>
                </div>
              </Card>
            ) : (
              filteredFacilities.map((facility) => (
                <Card key={facility.id} className="p-6 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Facility Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Warehouse className="w-10 h-10 text-blue-600" />
                      </div>
                    </div>

                    {/* Facility Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="mb-1" style={{ color: '#003E6D' }}>{facility.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {facility.location}
                          </div>
                        </div>
                        <Badge className={`${getReputationColor(facility.reputationScore)} text-white`}>
                          Score: {facility.reputationScore}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Distance</p>
                          <p style={{ color: '#003E6D' }}>{facility.distance} km</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p style={{ color: '#003E6D' }}>₹{facility.pricePerKg}/kg</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Rating</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span style={{ color: '#003E6D' }}>{facility.rating}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Available</p>
                          <p style={{ color: '#003E6D' }}>
                            {facility.availableCapacity.toLocaleString()} kg
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {facility.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleSelectFacility(facility)}
                          className="text-white"
                          style={{ backgroundColor: '#FFD700' }}
                        >
                          Select This Facility
                        </Button>
                        <Button variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

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
