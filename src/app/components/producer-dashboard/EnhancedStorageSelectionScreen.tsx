import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Warehouse, 
  Snowflake, 
  Home, 
  Database,
  MapPin, 
  Star, 
  DollarSign, 
  Thermometer,
  Search, 
  Filter,
  Clock,
  Shield,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowLeft,
  Zap
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type StorageType = 'warehouse' | 'cold-storage' | 'farm-storage' | 'silo-storage';

interface StorageFacility {
  id: string;
  name: string;
  type: StorageType;
  distance: number;
  pricePerKg: number;
  priceUnit: string;
  reputationScore: number;
  capacity: number;
  availableCapacity: number;
  location: string;
  features: string[];
  rating: number;
  temperature?: string;
  humidity?: string;
  securityLevel: 'basic' | 'standard' | 'premium';
  certification?: string[];
  specialization?: string[];
}

interface EnhancedStorageSelectionScreenProps {
  onSelectFacility: (facility: StorageFacility) => void;
  onBack: () => void;
  lotData?: {
    commodity: string;
    quality: string;
    quantity: number;
  };
}

export const EnhancedStorageSelectionScreen: React.FC<EnhancedStorageSelectionScreenProps> = ({
  onSelectFacility,
  onBack,
  lotData = { 
    commodity: 'Wheat',
    quality: 'A', 
    quantity: 1000 
  },
}) => {
  const [selectedType, setSelectedType] = useState<StorageType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'rating'>('distance');

  // Mock storage facilities data with all 4 types
  const facilities: StorageFacility[] = [
    // WAREHOUSE STORAGE
    {
      id: 'WH-001',
      name: 'Punjab Agri Warehouse',
      type: 'warehouse',
      distance: 5.2,
      pricePerKg: 2.5,
      priceUnit: '₹/kg/month',
      reputationScore: 95,
      capacity: 50000,
      availableCapacity: 25000,
      location: 'Ludhiana, Punjab',
      features: ['Climate Controlled', 'Pest Management', '24/7 Security', 'FSSAI Certified'],
      rating: 4.8,
      temperature: '15-25°C',
      humidity: '60-70%',
      securityLevel: 'premium',
      certification: ['FSSAI', 'ISO 9001', 'WDRA'],
      specialization: ['Grains', 'Pulses', 'Oilseeds'],
    },
    {
      id: 'WH-002',
      name: 'Green Valley Warehouse',
      type: 'warehouse',
      distance: 12.8,
      pricePerKg: 2.0,
      priceUnit: '₹/kg/month',
      reputationScore: 88,
      capacity: 75000,
      availableCapacity: 40000,
      location: 'Jalandhar, Punjab',
      features: ['Fumigation Available', 'Insurance Coverage', 'Quality Testing Lab'],
      rating: 4.5,
      temperature: '18-28°C',
      humidity: '55-65%',
      securityLevel: 'standard',
      certification: ['FSSAI', 'WDRA'],
      specialization: ['Grains', 'Rice'],
    },
    
    // COLD STORAGE
    {
      id: 'CS-001',
      name: 'Arctic Cold Storage',
      type: 'cold-storage',
      distance: 8.5,
      pricePerKg: 4.5,
      priceUnit: '₹/kg/month',
      reputationScore: 92,
      capacity: 30000,
      availableCapacity: 15000,
      location: 'Amritsar, Punjab',
      features: ['Temperature Controlled', 'Humidity Monitoring', 'Backup Power', 'Real-time Alerts'],
      rating: 4.7,
      temperature: '2-8°C',
      humidity: '85-95%',
      securityLevel: 'premium',
      certification: ['FSSAI', 'ISO 22000', 'HACCP'],
      specialization: ['Vegetables', 'Fruits', 'Dairy Products'],
    },
    {
      id: 'CS-002',
      name: 'FreshKeep Cold Storage',
      type: 'cold-storage',
      distance: 15.3,
      pricePerKg: 4.0,
      priceUnit: '₹/kg/month',
      reputationScore: 90,
      capacity: 40000,
      availableCapacity: 20000,
      location: 'Patiala, Punjab',
      features: ['Multi-Chamber System', 'Blast Freezing', 'IoT Monitoring'],
      rating: 4.6,
      temperature: '0-4°C',
      humidity: '80-90%',
      securityLevel: 'premium',
      certification: ['FSSAI', 'ISO 22000'],
      specialization: ['Perishables', 'Processed Foods'],
    },
    
    // FARM STORAGE
    {
      id: 'FS-001',
      name: 'Farm Direct Storage Hub',
      type: 'farm-storage',
      distance: 2.1,
      pricePerKg: 1.2,
      priceUnit: '₹/kg/month',
      reputationScore: 85,
      capacity: 20000,
      availableCapacity: 12000,
      location: 'Local Farm Area',
      features: ['On-Farm Facility', 'Quick Access', 'Lower Costs', 'Community Storage'],
      rating: 4.3,
      temperature: 'Ambient',
      humidity: 'Natural',
      securityLevel: 'standard',
      certification: ['Basic FSSAI'],
      specialization: ['Raw Produce', 'Grains'],
    },
    {
      id: 'FS-002',
      name: 'Farmers Collective Storage',
      type: 'farm-storage',
      distance: 3.8,
      pricePerKg: 1.5,
      priceUnit: '₹/kg/month',
      reputationScore: 82,
      capacity: 35000,
      availableCapacity: 18000,
      location: 'Village Storage Complex',
      features: ['Cooperative Model', 'Shared Facility', 'Local Management'],
      rating: 4.2,
      temperature: 'Ambient',
      humidity: 'Natural',
      securityLevel: 'basic',
      certification: ['FSSAI'],
      specialization: ['Mixed Produce'],
    },
    
    // SILO STORAGE
    {
      id: 'SI-001',
      name: 'Modern Grain Silos',
      type: 'silo-storage',
      distance: 10.5,
      pricePerKg: 1.8,
      priceUnit: '₹/kg/month',
      reputationScore: 94,
      capacity: 100000,
      availableCapacity: 60000,
      location: 'Moga, Punjab',
      features: ['Automated System', 'Aeration', 'Moisture Control', 'Bulk Storage'],
      rating: 4.9,
      temperature: 'Controlled',
      humidity: 'Monitored',
      securityLevel: 'premium',
      certification: ['FSSAI', 'ISO 9001', 'WDRA', 'FCI Approved'],
      specialization: ['Grains', 'Wheat', 'Rice', 'Maize'],
    },
    {
      id: 'SI-002',
      name: 'Punjab State Grain Silos',
      type: 'silo-storage',
      distance: 18.7,
      pricePerKg: 1.6,
      priceUnit: '₹/kg/month',
      reputationScore: 96,
      capacity: 150000,
      availableCapacity: 80000,
      location: 'Sangrur, Punjab',
      features: ['Government Facility', 'Scientific Storage', 'MSP Support', 'Quality Preservation'],
      rating: 4.8,
      temperature: 'Controlled',
      humidity: 'Monitored',
      securityLevel: 'premium',
      certification: ['FSSAI', 'FCI', 'WDRA', 'BIS'],
      specialization: ['Food Grains', 'Strategic Reserve'],
    },
  ];

  const storageTypes = [
    {
      id: 'all',
      label: 'All Storage',
      icon: Package,
      color: '#6B7280',
      description: 'View all available options',
    },
    {
      id: 'warehouse',
      label: 'Warehouse',
      icon: Warehouse,
      color: '#3B82F6',
      description: 'General purpose storage with climate control',
    },
    {
      id: 'cold-storage',
      label: 'Cold Storage',
      icon: Snowflake,
      color: '#06B6D4',
      description: 'Temperature controlled for perishables',
    },
    {
      id: 'farm-storage',
      label: 'Farm Storage',
      icon: Home,
      color: '#22C55E',
      description: 'On-farm or nearby community storage',
    },
    {
      id: 'silo-storage',
      label: 'Silo Storage',
      icon: Database,
      color: '#F59E0B',
      description: 'Automated bulk grain storage',
    },
  ];

  const getStorageTypeConfig = (type: string) => {
    return storageTypes.find(t => t.id === type);
  };

  const getReputationColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getSecurityBadgeColor = (level: string) => {
    switch (level) {
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFacilities = facilities
    .filter((facility) => {
      if (selectedType !== 'all' && facility.type !== selectedType) return false;
      if (searchQuery && !facility.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance': return a.distance - b.distance;
        case 'price': return a.pricePerKg - b.pricePerKg;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
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
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="mb-2" style={{ color: '#003E6D', fontFamily: 'Playfair Display, serif' }}>
                Select Storage Facility
              </h1>
              <p className="text-gray-600">
                Choose the best storage option for your {lotData.commodity} ({lotData.quantity} kg)
              </p>
            </div>
          </div>
        </div>

        {/* Storage Type Selector */}
        <Card className="p-6 mb-6 bg-white shadow-lg">
          <h3 className="mb-4" style={{ color: '#003E6D', fontFamily: 'Montserrat, sans-serif' }}>
            Storage Type
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {storageTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              
              return (
                <TooltipProvider key={type.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card
                        className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                          isSelected ? 'border-2 shadow-lg' : 'border'
                        }`}
                        style={{
                          borderColor: isSelected ? type.color : '#E5E7EB',
                          backgroundColor: isSelected ? `${type.color}10` : 'white',
                        }}
                        onClick={() => setSelectedType(type.id as StorageType | 'all')}
                      >
                        <div className="text-center">
                          <div
                            className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-2"
                            style={{ backgroundColor: `${type.color}20` }}
                          >
                            <Icon className="h-6 w-6" style={{ color: type.color }} />
                          </div>
                          <p className="text-sm" style={{ color: '#003E6D' }}>
                            {type.label}
                          </p>
                          {isSelected && (
                            <CheckCircle className="h-4 w-4 mx-auto mt-1" style={{ color: type.color }} />
                          )}
                        </div>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{type.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </Card>

        {/* Search and Filters */}
        <Card className="p-6 mb-6 bg-white shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
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
            <div className="flex gap-3">
              <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Sort by Distance</SelectItem>
                  <SelectItem value="price">Sort by Price</SelectItem>
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Facilities List */}
        <div className="space-y-4">
          {filteredFacilities.length === 0 ? (
            <Card className="p-8 bg-white shadow-lg">
              <div className="text-center text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No storage facilities found</p>
                <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
              </div>
            </Card>
          ) : (
            filteredFacilities.map((facility) => {
              const typeConfig = getStorageTypeConfig(facility.type);
              const TypeIcon = typeConfig?.icon || Warehouse;
              const isCapacitySufficient = facility.availableCapacity >= lotData.quantity;
              
              return (
                <Card key={facility.id} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Facility Icon */}
                    <div className="flex-shrink-0">
                      <div
                        className="w-20 h-20 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${typeConfig?.color}20` }}
                      >
                        <TypeIcon className="w-10 h-10" style={{ color: typeConfig?.color }} />
                      </div>
                      <Badge
                        className="mt-2 w-full justify-center"
                        style={{ backgroundColor: typeConfig?.color, color: 'white' }}
                      >
                        {typeConfig?.label}
                      </Badge>
                    </div>

                    {/* Facility Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="mb-1" style={{ color: '#003E6D', fontFamily: 'Montserrat, sans-serif' }}>
                            {facility.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {facility.location}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={`${getReputationColor(facility.reputationScore)} text-white`}>
                            Score: {facility.reputationScore}
                          </Badge>
                          <Badge className={getSecurityBadgeColor(facility.securityLevel)}>
                            {facility.securityLevel}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Distance</p>
                          <p style={{ color: '#003E6D' }}>{facility.distance} km</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p style={{ color: '#003E6D' }}>{facility.priceUnit}</p>
                          <p className="text-lg" style={{ color: '#FFD700' }}>₹{facility.pricePerKg}</p>
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
                          <p style={{ color: isCapacitySufficient ? '#22C55E' : '#EF4444' }}>
                            {facility.availableCapacity.toLocaleString()} kg
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Conditions</p>
                          <div className="flex items-center gap-1 text-xs">
                            <Thermometer className="w-3 h-3" />
                            <span>{facility.temperature}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Droplets className="w-3 h-3" />
                            <span>{facility.humidity}</span>
                          </div>
                        </div>
                      </div>

                      {/* Features and Certifications */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {facility.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        {facility.certification && facility.certification.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {facility.certification.map((cert) => (
                              <Badge key={cert} className="text-xs bg-blue-100 text-blue-800">
                                <Shield className="w-3 h-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Capacity Warning */}
                      {!isCapacitySufficient && (
                        <div className="flex items-center gap-2 p-3 mb-3 bg-red-50 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <p className="text-sm text-red-700">
                            Insufficient capacity. Need {lotData.quantity} kg, available {facility.availableCapacity} kg
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleSelectFacility(facility)}
                          disabled={!isCapacitySufficient}
                          className="text-white"
                          style={{ backgroundColor: isCapacitySufficient ? '#FFD700' : '#9CA3AF' }}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Select This Facility
                        </Button>
                        <Button variant="outline">
                          <Info className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for Droplets icon (if not imported)
const Droplets: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 16.3c2.2 0 4-1.8 4-4 0-1.5-.5-2.9-1.5-4L7 4.5 4.5 8.3C3.5 9.4 3 10.8 3 12.3c0 2.2 1.8 4 4 4z" />
    <path d="M17 16.3c2.2 0 4-1.8 4-4 0-1.5-.5-2.9-1.5-4L17 4.5l-2.5 3.8c-1 1.1-1.5 2.5-1.5 4 0 2.2 1.8 4 4 4z" />
  </svg>
);
