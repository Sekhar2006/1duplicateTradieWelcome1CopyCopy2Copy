import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  Box,
  Container,
  Layers,
  Palette,
  Tag,
  Shield,
  Snowflake,
  Droplet,
  Lock,
  Zap,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  Star,
  TrendingUp,
  User,
  Phone,
  Mail,
  Calculator,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../ui/tooltip';
import { Checkbox } from '../ui/checkbox';
import { cn } from '../ui/utils';

// ==================== PACKAGING TYPE INTERFACES ====================

interface PackagingType {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  suitableFor: string[];
  priceRange: { min: number; max: number };
  unit: string;
  minOrder: number;
  aiRecommended?: boolean;
  popular?: boolean;
}

interface PackagingSupplier {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  pricePerUnit: number;
  minOrder: number;
  delivery: string;
  reliability: number;
  contact: {
    phone: string;
    email: string;
  };
  anomaly?: {
    type: 'price_high' | 'price_low' | 'quality_issue';
    message: string;
  };
}

interface PackagingCategoryConfig {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  description: string;
  expanded: boolean;
}

// ==================== PACKAGING DATA ====================

const packagingCategories: PackagingCategoryConfig[] = [
  {
    id: 'sacks-bags',
    name: 'Sacks & Bags',
    icon: ShoppingBag,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    description: 'Traditional and modern bag solutions for bulk commodities',
    expanded: true
  },
  {
    id: 'rigid-containers',
    name: 'Rigid Containers',
    icon: Box,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Sturdy containers for secure transport and storage',
    expanded: false
  },
  {
    id: 'bulk-packaging',
    name: 'Bulk Packaging',
    icon: Container,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Large-scale packaging for high-volume shipments',
    expanded: false
  },
  {
    id: 'palletizing',
    name: 'Palletizing & Wrapping',
    icon: Layers,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Secure stacking and protection solutions',
    expanded: false
  },
  {
    id: 'specialized',
    name: 'Specialized Packaging',
    icon: Snowflake,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    description: 'Advanced packaging for specific requirements',
    expanded: false
  },
  {
    id: 'accessories',
    name: 'Accessories & Materials',
    icon: Tag,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    description: 'Supporting materials and finishing touches',
    expanded: false
  }
];

const packagingTypes: PackagingType[] = [
  // SACKS & BAGS
  {
    id: 'jute-sacks',
    name: 'Jute Sacks',
    category: 'sacks-bags',
    icon: ShoppingBag,
    description: 'Eco-friendly natural fiber bags',
    suitableFor: ['Wheat', 'Rice', 'Pulses', 'Coffee', 'Cocoa'],
    priceRange: { min: 35, max: 55 },
    unit: 'bag (50 kg)',
    minOrder: 100,
    aiRecommended: true,
    popular: true
  },
  {
    id: 'pp-bags',
    name: 'Polypropylene (PP) Bags',
    category: 'sacks-bags',
    icon: ShoppingBag,
    description: 'Durable, moisture-resistant synthetic bags',
    suitableFor: ['Wheat', 'Rice', 'Maize', 'Sugar', 'Fertilizer'],
    priceRange: { min: 28, max: 45 },
    unit: 'bag (40 kg)',
    minOrder: 100,
    popular: true
  },
  {
    id: 'gunny-bags',
    name: 'Gunny Bags',
    category: 'sacks-bags',
    icon: ShoppingBag,
    description: 'Traditional burlap bags for grains',
    suitableFor: ['Wheat', 'Rice', 'Barley', 'Oats'],
    priceRange: { min: 30, max: 50 },
    unit: 'bag (50 kg)',
    minOrder: 50,
  },
  {
    id: 'plastic-bags',
    name: 'Plastic Bags',
    category: 'sacks-bags',
    icon: ShoppingBag,
    description: 'Lightweight, waterproof bags',
    suitableFor: ['Vegetables', 'Fruits', 'Processed goods'],
    priceRange: { min: 5, max: 15 },
    unit: 'bag (5-10 kg)',
    minOrder: 500,
  },
  {
    id: 'paper-bags',
    name: 'Paper Bags',
    category: 'sacks-bags',
    icon: ShoppingBag,
    description: 'Biodegradable kraft paper bags',
    suitableFor: ['Organic produce', 'Retail packaging', 'Flour'],
    priceRange: { min: 8, max: 20 },
    unit: 'bag (10-25 kg)',
    minOrder: 200,
    aiRecommended: true
  },

  // RIGID CONTAINERS
  {
    id: 'plastic-crates',
    name: 'Plastic Crates',
    category: 'rigid-containers',
    icon: Box,
    description: 'Reusable, stackable plastic containers',
    suitableFor: ['Fruits', 'Vegetables', 'Eggs', 'Bakery'],
    priceRange: { min: 150, max: 400 },
    unit: 'crate (15-30 kg)',
    minOrder: 20,
    popular: true
  },
  {
    id: 'wooden-crates',
    name: 'Wooden Crates',
    category: 'rigid-containers',
    icon: Box,
    description: 'Sturdy wooden boxes for heavy loads',
    suitableFor: ['Fruits', 'Vegetables', 'Export goods'],
    priceRange: { min: 200, max: 600 },
    unit: 'crate (20-50 kg)',
    minOrder: 10,
  },
  {
    id: 'steel-containers',
    name: 'Steel Containers',
    category: 'rigid-containers',
    icon: Container,
    description: 'Heavy-duty metal containers',
    suitableFor: ['Oils', 'Liquids', 'Chemicals', 'Long-term storage'],
    priceRange: { min: 800, max: 2500 },
    unit: 'container (50-200 L)',
    minOrder: 5,
  },
  {
    id: 'cardboard-boxes',
    name: 'Cardboard Boxes',
    category: 'rigid-containers',
    icon: Box,
    description: 'Corrugated cardboard for retail',
    suitableFor: ['Fruits', 'Vegetables', 'Retail products', 'Export'],
    priceRange: { min: 25, max: 80 },
    unit: 'box (5-15 kg)',
    minOrder: 100,
    popular: true
  },

  // BULK PACKAGING
  {
    id: 'fibc-bags',
    name: 'Bulk Bags (FIBC/Jumbo)',
    category: 'bulk-packaging',
    icon: Container,
    description: 'Large flexible intermediate bulk containers',
    suitableFor: ['Grains', 'Sand', 'Fertilizer', 'Bulk shipments'],
    priceRange: { min: 350, max: 800 },
    unit: 'bag (500-1500 kg)',
    minOrder: 10,
    aiRecommended: true
  },
  {
    id: 'pallets-wrap',
    name: 'Pallets with Stretch Wrap',
    category: 'bulk-packaging',
    icon: Layers,
    description: 'Palletized goods secured with plastic wrap',
    suitableFor: ['Bulk shipments', 'Warehouse storage', 'Export'],
    priceRange: { min: 400, max: 1200 },
    unit: 'pallet (500-1000 kg)',
    minOrder: 5,
    popular: true
  },
  {
    id: 'bulk-bins',
    name: 'Bulk Bins',
    category: 'bulk-packaging',
    icon: Container,
    description: 'Large storage and transport bins',
    suitableFor: ['Grains', 'Seeds', 'Industrial materials'],
    priceRange: { min: 600, max: 2000 },
    unit: 'bin (300-1000 kg)',
    minOrder: 3,
  },

  // PALLETIZING & WRAPPING
  {
    id: 'pallets',
    name: 'Pallets',
    category: 'palletizing',
    icon: Layers,
    description: 'Wooden or plastic pallets for stacking',
    suitableFor: ['All commodities', 'Warehouse storage', 'Transport'],
    priceRange: { min: 300, max: 800 },
    unit: 'pallet (reusable)',
    minOrder: 5,
    popular: true
  },
  {
    id: 'stretch-wrap',
    name: 'Stretch/Shrink Wraps',
    category: 'palletizing',
    icon: Package,
    description: 'Plastic film for securing loads',
    suitableFor: ['Palletized goods', 'Bundling', 'Weather protection'],
    priceRange: { min: 800, max: 1500 },
    unit: 'roll (1500m)',
    minOrder: 2,
  },
  {
    id: 'pallet-collars',
    name: 'Pallet Collars',
    category: 'palletizing',
    icon: Layers,
    description: 'Stackable wooden frames for pallets',
    suitableFor: ['Increasing pallet height', 'Flexible storage'],
    priceRange: { min: 250, max: 600 },
    unit: 'collar (600x800mm)',
    minOrder: 4,
  },

  // SPECIALIZED PACKAGING
  {
    id: 'vacuum-sealed',
    name: 'Vacuum-Sealed Packs',
    category: 'specialized',
    icon: Lock,
    description: 'Airtight packaging for freshness',
    suitableFor: ['Coffee', 'Spices', 'Processed foods', 'Dry fruits'],
    priceRange: { min: 3, max: 12 },
    unit: 'pack (0.5-5 kg)',
    minOrder: 500,
    aiRecommended: true
  },
  {
    id: 'insulated-packs',
    name: 'Insulated Packaging',
    category: 'specialized',
    icon: Snowflake,
    description: 'Temperature-controlled packaging',
    suitableFor: ['Dairy', 'Meat', 'Fish', 'Pharmaceuticals'],
    priceRange: { min: 50, max: 200 },
    unit: 'pack (5-20 kg)',
    minOrder: 50,
  },
  {
    id: 'mesh-bags',
    name: 'Mesh Bags',
    category: 'specialized',
    icon: ShoppingBag,
    description: 'Breathable net bags for produce',
    suitableFor: ['Onions', 'Potatoes', 'Garlic', 'Citrus fruits'],
    priceRange: { min: 8, max: 20 },
    unit: 'bag (10-25 kg)',
    minOrder: 200,
    popular: true
  },
  {
    id: 'tin-cans-drums',
    name: 'Tin Cans/Drums',
    category: 'specialized',
    icon: Container,
    description: 'Metal containers for liquids',
    suitableFor: ['Oils', 'Ghee', 'Honey', 'Liquid products'],
    priceRange: { min: 50, max: 300 },
    unit: 'can/drum (1-50 L)',
    minOrder: 20,
  },

  // ACCESSORIES
  {
    id: 'sealing-tape',
    name: 'Sealing Tapes',
    category: 'accessories',
    icon: Tag,
    description: 'Strong adhesive tapes for sealing',
    suitableFor: ['All packaging types', 'Box sealing', 'Bundling'],
    priceRange: { min: 50, max: 150 },
    unit: 'roll (50m)',
    minOrder: 10,
  },
  {
    id: 'labels-stickers',
    name: 'Labels & Stickers',
    category: 'accessories',
    icon: Tag,
    description: 'Branding and identification labels',
    suitableFor: ['All products', 'Branding', 'Compliance'],
    priceRange: { min: 100, max: 500 },
    unit: '1000 labels',
    minOrder: 1,
    popular: true
  },
  {
    id: 'packing-straps',
    name: 'Packing Straps/Bands',
    category: 'accessories',
    icon: Shield,
    description: 'Strapping for heavy loads',
    suitableFor: ['Pallets', 'Crates', 'Heavy packages'],
    priceRange: { min: 300, max: 800 },
    unit: 'roll (1000m)',
    minOrder: 2,
  },
  {
    id: 'cushioning',
    name: 'Cushioning Materials',
    category: 'accessories',
    icon: Package,
    description: 'Bubble wrap, foam, protective padding',
    suitableFor: ['Fragile goods', 'Electronics', 'Premium products'],
    priceRange: { min: 200, max: 600 },
    unit: 'roll (50m)',
    minOrder: 5,
  },
];

// Mock Suppliers
const mockSuppliers: PackagingSupplier[] = [
  {
    id: 'sup1',
    name: 'Punjab Packaging Solutions',
    location: 'Ludhiana, Punjab',
    rating: 4.7,
    reviews: 89,
    pricePerUnit: 42,
    minOrder: 100,
    delivery: '2-3 days',
    reliability: 92,
    contact: {
      phone: '+91-98765-12345',
      email: 'sales@punjabpkg.com'
    }
  },
  {
    id: 'sup2',
    name: 'Green Pack Industries',
    location: 'Jalandhar, Punjab',
    rating: 4.9,
    reviews: 156,
    pricePerUnit: 38,
    minOrder: 200,
    delivery: '3-5 days',
    reliability: 96,
    contact: {
      phone: '+91-98765-54321',
      email: 'info@greenpack.com'
    },
    anomaly: {
      type: 'price_low',
      message: 'Price 12% below market average - excellent deal!'
    }
  },
  {
    id: 'sup3',
    name: 'Reliable Jute Suppliers',
    location: 'Patiala, Punjab',
    rating: 4.5,
    reviews: 67,
    pricePerUnit: 52,
    minOrder: 50,
    delivery: '1-2 days',
    reliability: 88,
    contact: {
      phone: '+91-98765-99999',
      email: 'contact@reliablejute.com'
    },
    anomaly: {
      type: 'price_high',
      message: 'Price 18% above average - consider negotiating'
    }
  }
];

// ==================== COMPONENT ====================

const ComprehensivePackagingSelector: React.FC<{ commodity?: string }> = ({ commodity = 'Wheat' }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['sacks-bags']);
  const [selectedPackaging, setSelectedPackaging] = useState<string[]>([]);
  const [showSuppliers, setShowSuppliers] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const togglePackaging = (packagingId: string) => {
    setSelectedPackaging(prev =>
      prev.includes(packagingId)
        ? prev.filter(id => id !== packagingId)
        : [...prev, packagingId]
    );
  };

  const getPackagingByCategory = (categoryId: string) => {
    return packagingTypes.filter(p => p.category === categoryId);
  };

  const getAIRecommendations = () => {
    return packagingTypes.filter(p => 
      p.aiRecommended && 
      p.suitableFor.includes(commodity)
    );
  };

  const filteredPackaging = packagingTypes.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header with AI Recommendations */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'Playfair Display', color: '#003E6D' }}>
              📦 Packaging Selection
            </h2>
            <p className="text-gray-600 mt-1" style={{ fontFamily: 'Lato' }}>
              Choose the right packaging for your {commodity}
            </p>
          </div>

          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Suggestions
          </Badge>
        </div>

        {/* Search Bar */}
        <Card className="p-4">
          <div className="relative">
            <Package className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search packaging types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* AI Recommendations Banner */}
        {getAIRecommendations().length > 0 && (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 p-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-500 text-white p-3 rounded-full">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  🎯 AI Recommended for {commodity}
                </h3>
                <p className="text-sm text-green-700 mb-4">
                  Based on your commodity type, storage conditions, and market trends
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {getAIRecommendations().map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-lg p-3 border-2 border-green-200 hover:border-green-400 transition-all cursor-pointer"
                      onClick={() => togglePackaging(pkg.id)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <pkg.icon className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-900">{pkg.name}</span>
                        {selectedPackaging.includes(pkg.id) && (
                          <Check className="w-4 h-4 text-green-600 ml-auto" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600">
                        ₹{pkg.priceRange.min}-{pkg.priceRange.max}/{pkg.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Selected Packaging Summary */}
        {selectedPackaging.length > 0 && (
          <Card className="bg-blue-50 border-2 border-blue-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">
                  {selectedPackaging.length} Packaging Type{selectedPackaging.length > 1 ? 's' : ''} Selected
                </h3>
                <p className="text-sm text-blue-700">
                  {selectedPackaging.map(id => packagingTypes.find(p => p.id === id)?.name).join(', ')}
                </p>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Cost
              </Button>
            </div>
          </Card>
        )}

        {/* Packaging Categories */}
        <div className="space-y-4">
          {packagingCategories.map((category) => {
            const categoryPackaging = getPackagingByCategory(category.id);
            const isExpanded = expandedCategories.includes(category.id);

            return (
              <Card key={category.id} className="overflow-hidden">
                {/* Category Header */}
                <div
                  className={cn(
                    "p-4 cursor-pointer hover:bg-gray-50 transition-all",
                    category.bgColor
                  )}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg bg-white")}>
                        <category.icon className={cn("w-6 h-6", category.color)} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">
                        {categoryPackaging.length} options
                      </Badge>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Category Content */}
                {isExpanded && (
                  <div className="p-6 bg-white border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoryPackaging.map((pkg) => (
                        <div
                          key={pkg.id}
                          className={cn(
                            "bg-white rounded-lg p-4 border-2 cursor-pointer transition-all hover:shadow-lg",
                            selectedPackaging.includes(pkg.id)
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          )}
                          onClick={() => togglePackaging(pkg.id)}
                        >
                          {/* Package Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={cn(
                                "p-2 rounded-lg",
                                selectedPackaging.includes(pkg.id) ? "bg-blue-100" : "bg-gray-100"
                              )}>
                                <pkg.icon className={cn(
                                  "w-5 h-5",
                                  selectedPackaging.includes(pkg.id) ? "text-blue-600" : "text-gray-600"
                                )} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                                <p className="text-xs text-gray-600 mt-1">{pkg.description}</p>
                              </div>
                            </div>
                            
                            {selectedPackaging.includes(pkg.id) && (
                              <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            )}
                          </div>

                          {/* Badges */}
                          <div className="flex gap-2 mb-3 flex-wrap">
                            {pkg.aiRecommended && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                AI Recommended
                              </Badge>
                            )}
                            {pkg.popular && (
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                          </div>

                          {/* Details */}
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Price Range:</span>
                              <span className="font-semibold">
                                ₹{pkg.priceRange.min}-{pkg.priceRange.max}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Unit:</span>
                              <span className="font-semibold">{pkg.unit}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Min Order:</span>
                              <span className="font-semibold">{pkg.minOrder} units</span>
                            </div>
                          </div>

                          {/* Suitable For */}
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-gray-600 mb-1">Suitable for:</p>
                            <div className="flex flex-wrap gap-1">
                              {pkg.suitableFor.slice(0, 3).map((item) => (
                                <Badge
                                  key={item}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {item}
                                </Badge>
                              ))}
                              {pkg.suitableFor.length > 3 && (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge variant="outline" className="text-xs">
                                      +{pkg.suitableFor.length - 3} more
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{pkg.suitableFor.slice(3).join(', ')}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-4 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowSuppliers(pkg.id);
                              }}
                            >
                              <User className="w-3 h-3 mr-1" />
                              View Suppliers
                            </Button>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="sm" variant="outline" className="px-2">
                                  <Info className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="max-w-xs">
                                  <p className="font-semibold mb-1">{pkg.name}</p>
                                  <p className="text-sm">{pkg.description}</p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Suppliers Modal/Section */}
        {showSuppliers && (
          <Card className="p-6 border-2 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold" style={{ color: '#003E6D' }}>
                📋 Suppliers for {packagingTypes.find(p => p.id === showSuppliers)?.name}
              </h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSuppliers(null)}
              >
                Close
              </Button>
            </div>

            <div className="space-y-4">
              {mockSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="bg-white rounded-lg border-2 p-4 hover:border-blue-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{supplier.name}</h4>
                      <p className="text-sm text-gray-600">{supplier.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{supplier.rating}</span>
                      <span className="text-sm text-gray-500">({supplier.reviews})</span>
                    </div>
                  </div>

                  {/* AI Anomaly Alert */}
                  {supplier.anomaly && (
                    <div className={cn(
                      "mb-3 p-3 rounded-lg border-2",
                      supplier.anomaly.type === 'price_low' ? "bg-green-50 border-green-200" :
                      supplier.anomaly.type === 'price_high' ? "bg-red-50 border-red-200" :
                      "bg-yellow-50 border-yellow-200"
                    )}>
                      <p className={cn(
                        "text-sm font-semibold flex items-center gap-2",
                        supplier.anomaly.type === 'price_low' ? "text-green-800" :
                        supplier.anomaly.type === 'price_high' ? "text-red-800" :
                        "text-yellow-800"
                      )}>
                        {supplier.anomaly.type === 'price_low' && <TrendingUp className="w-4 h-4" />}
                        {supplier.anomaly.type === 'price_high' && <AlertTriangle className="w-4 h-4" />}
                        🤖 AI ALERT: {supplier.anomaly.message}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="font-semibold">₹{supplier.pricePerUnit}/unit</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Min Order</p>
                      <p className="font-semibold">{supplier.minOrder} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Delivery</p>
                      <p className="font-semibold">{supplier.delivery}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Reliability</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${supplier.reliability}%` }}
                          />
                        </div>
                        <span className="font-semibold text-sm">{supplier.reliability}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Request Quote
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Cost Calculator */}
        {selectedPackaging.length > 0 && (
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#003E6D' }}>
              💰 Packaging Cost Estimate
            </h3>
            
            <div className="space-y-3">
              {selectedPackaging.map(id => {
                const pkg = packagingTypes.find(p => p.id === id);
                if (!pkg) return null;
                
                const avgPrice = (pkg.priceRange.min + pkg.priceRange.max) / 2;
                
                return (
                  <div key={id} className="bg-white rounded-lg p-4 border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                        <p className="text-sm text-gray-600">{pkg.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Avg. Price</p>
                        <p className="font-semibold text-purple-600">₹{avgPrice.toFixed(0)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Input
                        type="number"
                        placeholder={`Min: ${pkg.minOrder}`}
                        className="flex-1"
                        min={pkg.minOrder}
                      />
                      <span className="text-sm text-gray-600">units</span>
                    </div>
                  </div>
                );
              })}
              
              <div className="bg-purple-100 rounded-lg p-4 border-2 border-purple-300">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Estimated Total:</span>
                  <span className="text-2xl font-bold text-purple-600">₹ --,---</span>
                </div>
                <p className="text-xs text-purple-700 mt-2">
                  💡 Enter quantities above to calculate total cost
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ComprehensivePackagingSelector;
