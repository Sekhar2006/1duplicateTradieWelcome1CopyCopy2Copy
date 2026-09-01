import React, { useState, useEffect } from 'react';
import {
  Sprout,
  TrendingUp,
  TrendingDown,
  Droplets,
  Sun,
  MapPin,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { BeautifulButton, ButtonGroup } from '../ui/beautiful-buttons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Slider } from '../ui/slider';
import { cn } from '../ui/utils';

// ==================== INTERFACES ====================

interface CropSelectionData {
  // Land Details
  acresAvailable: number;
  soilType: string;
  waterAvailability: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  
  // Optional History
  previousCrop?: string;
  variety?: string;
  irrigationSchedule?: string;
  fertilizers?: string;
  pesticides?: string;
  harvestingMethod?: string;
  processingMethod?: string;
  
  // Selected Crop
  selectedCrop?: string;
  alternativeCrops?: string[];
}

interface AIRecommendation {
  crop: string;
  confidence: number;
  demandSupply: {
    demand: number;
    supply: number;
    trend: 'up' | 'down' | 'stable';
  };
  pricePrediction: {
    current: number;
    predicted: number;
    change: number;
  };
  suitability: number;
  pros: string[];
  cons: string[];
}

interface CropSelectionProps {
  producerId: string;
  onComplete: (data: CropSelectionData) => void;
  onBack: () => void;
}

// ==================== MOCK DATA ====================

const soilTypes = [
  'Alluvial Soil',
  'Black Soil (Regur)',
  'Red Soil',
  'Laterite Soil',
  'Desert Soil',
  'Mountain Soil',
  'Saline Soil'
];

const waterAvailabilityOptions = [
  'Abundant (River/Canal)',
  'Moderate (Well/Borewell)',
  'Limited (Rainfed)',
  'Drip Irrigation',
  'Sprinkler System'
];

const aiRecommendations: AIRecommendation[] = [
  {
    crop: 'Wheat (Grade A)',
    confidence: 94,
    demandSupply: {
      demand: 85,
      supply: 65,
      trend: 'up'
    },
    pricePrediction: {
      current: 2340,
      predicted: 2520,
      change: 7.7
    },
    suitability: 92,
    pros: [
      'High demand in your region',
      'Weather conditions favorable',
      'Soil type highly suitable',
      'Expected 8% price increase'
    ],
    cons: [
      'Requires consistent irrigation',
      'Harvest timing critical'
    ]
  },
  {
    crop: 'Rice (Basmati)',
    confidence: 88,
    demandSupply: {
      demand: 78,
      supply: 72,
      trend: 'stable'
    },
    pricePrediction: {
      current: 3450,
      predicted: 3580,
      change: 3.8
    },
    suitability: 85,
    pros: [
      'Premium pricing available',
      'Export opportunities',
      'Water availability adequate'
    ],
    cons: [
      'Longer growing period',
      'Higher input costs',
      'Market competition moderate'
    ]
  },
  {
    crop: 'Maize (Yellow)',
    confidence: 76,
    demandSupply: {
      demand: 70,
      supply: 75,
      trend: 'down'
    },
    pricePrediction: {
      current: 1890,
      predicted: 1850,
      change: -2.1
    },
    suitability: 78,
    pros: [
      'Low input costs',
      'Short growing period',
      'Drought resistant'
    ],
    cons: [
      'Oversupply expected',
      'Price declining trend',
      'Storage requirements high'
    ]
  }
];

// ==================== MAIN COMPONENT ====================

const CropSelectionWithAI: React.FC<CropSelectionProps> = ({
  producerId,
  onComplete,
  onBack
}) => {
  const [formData, setFormData] = useState<CropSelectionData>({
    acresAvailable: 5,
    soilType: '',
    waterAvailability: '',
    location: {
      lat: 30.7333,
      lng: 76.7794,
      address: 'Chandigarh, Punjab, India'
    }
  });

  const [showHistory, setShowHistory] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<AIRecommendation | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulate AI analysis
  const analyzeAndRecommend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (formData.soilType && formData.waterAvailability) {
      analyzeAndRecommend();
    }
  }, [formData.soilType, formData.waterAvailability]);

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleCropSelect = (crop: AIRecommendation) => {
    setSelectedCrop(crop);
    handleInputChange('selectedCrop', crop.crop);
  };

  const handleSubmit = () => {
    if (!selectedCrop) {
      alert('Please select a crop to continue');
      return;
    }

    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">🌾 Crop Selection with AI Insights</h1>
            <p className="text-gray-600">
              Get AI-powered recommendations based on your land and market conditions
            </p>
          </div>
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Input Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Land Details Card */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Land Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Acres Available */}
                <div className="md:col-span-2">
                  <Label htmlFor="acres">
                    Available Land (Acres): {formData.acresAvailable}
                  </Label>
                  <Slider
                    id="acres"
                    min={1}
                    max={100}
                    step={0.5}
                    value={[formData.acresAvailable]}
                    onValueChange={(val) => handleInputChange('acresAvailable', val[0])}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Adjust slider to set available land area
                  </p>
                </div>

                {/* Soil Type */}
                <div>
                  <Label htmlFor="soil">Soil Type</Label>
                  <Select
                    value={formData.soilType}
                    onValueChange={(val) => handleInputChange('soilType', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map((soil) => (
                        <SelectItem key={soil} value={soil}>
                          {soil}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Water Availability */}
                <div>
                  <Label htmlFor="water">Water Availability</Label>
                  <Select
                    value={formData.waterAvailability}
                    onValueChange={(val) => handleInputChange('waterAvailability', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select water source" />
                    </SelectTrigger>
                    <SelectContent>
                      {waterAvailabilityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      value={formData.location.address}
                      readOnly
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Lat: {formData.location.lat}, Lng: {formData.location.lng}
                  </p>
                </div>
              </div>
            </Card>

            {/* Optional: Cultivation History */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  Cultivation History (Optional)
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  {showHistory ? 'Hide' : 'Add History'}
                </Button>
              </div>

              {showHistory && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Previous Crop</Label>
                    <Input
                      value={formData.previousCrop || ''}
                      onChange={(e) => handleInputChange('previousCrop', e.target.value)}
                      placeholder="e.g., Wheat"
                    />
                  </div>

                  <div>
                    <Label>Variety</Label>
                    <Input
                      value={formData.variety || ''}
                      onChange={(e) => handleInputChange('variety', e.target.value)}
                      placeholder="e.g., HD-2967"
                    />
                  </div>

                  <div>
                    <Label>Irrigation Schedule</Label>
                    <Input
                      value={formData.irrigationSchedule || ''}
                      onChange={(e) => handleInputChange('irrigationSchedule', e.target.value)}
                      placeholder="e.g., Weekly"
                    />
                  </div>

                  <div>
                    <Label>Fertilizers Used</Label>
                    <Input
                      value={formData.fertilizers || ''}
                      onChange={(e) => handleInputChange('fertilizers', e.target.value)}
                      placeholder="e.g., NPK, Urea"
                    />
                  </div>

                  <div>
                    <Label>Pesticides Used</Label>
                    <Input
                      value={formData.pesticides || ''}
                      onChange={(e) => handleInputChange('pesticides', e.target.value)}
                      placeholder="e.g., Organic pesticides"
                    />
                  </div>

                  <div>
                    <Label>Harvesting Method</Label>
                    <Input
                      value={formData.harvestingMethod || ''}
                      onChange={(e) => handleInputChange('harvestingMethod', e.target.value)}
                      placeholder="e.g., Combine harvester"
                    />
                  </div>
                </div>
              )}
            </Card>

            {/* AI Recommendations */}
            {formData.soilType && formData.waterAvailability && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    <h3 className="text-xl font-semibold">AI Recommendations</h3>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={analyzeAndRecommend}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </>
                    )}
                  </Button>
                </div>

                {loading ? (
                  <div className="py-12 text-center">
                    <div className="animate-pulse">
                      <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                      <p className="text-gray-600">AI is analyzing your land conditions...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {aiRecommendations.map((rec, idx) => (
                      <CropRecommendationCard
                        key={idx}
                        recommendation={rec}
                        isSelected={selectedCrop?.crop === rec.crop}
                        onSelect={() => handleCropSelect(rec)}
                      />
                    ))}
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Right: Selection Summary */}
          <div className="space-y-6">
            
            {/* Selected Crop Summary */}
            {selectedCrop && (
              <Card className="p-6 bg-gradient-to-br from-green-600 to-emerald-600 text-white sticky top-6">
                <h3 className="text-xl font-semibold mb-4">Selected Crop</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Crop</p>
                    <p className="text-2xl font-bold">{selectedCrop.crop}</p>
                  </div>

                  <div>
                    <p className="text-sm opacity-90 mb-1">AI Confidence</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/20 rounded-full h-2">
                        <div
                          className="bg-white h-2 rounded-full"
                          style={{ width: `${selectedCrop.confidence}%` }}
                        />
                      </div>
                      <span className="font-bold">{selectedCrop.confidence}%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm opacity-90 mb-1">Price Forecast</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold">
                        ₹{selectedCrop.pricePrediction.predicted}
                      </p>
                      <Badge className={cn(
                        'text-white',
                        selectedCrop.pricePrediction.change > 0 ? 'bg-green-700' : 'bg-red-700'
                      )}>
                        {selectedCrop.pricePrediction.change > 0 ? '↗' : '↘'}
                        {Math.abs(selectedCrop.pricePrediction.change)}%
                      </Badge>
                    </div>
                    <p className="text-xs opacity-75 mt-1">per quintal (predicted)</p>
                  </div>

                  <div>
                    <p className="text-sm opacity-90 mb-2">Land Allocation</p>
                    <p className="text-lg font-bold">
                      {formData.acresAvailable} Acres
                    </p>
                  </div>

                  <BeautifulButton
                    variant="gold"
                    size="lg"
                    fullWidth
                    icon={ArrowRight}
                    iconPosition="right"
                    shimmer
                    glow
                    onClick={handleSubmit}
                  >
                    Confirm & Continue
                  </BeautifulButton>
                </div>
              </Card>
            )}

            {/* Market Insights */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Market Insights</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>Wheat demand up 12% this quarter</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600">
                  <Sun className="w-4 h-4" />
                  <span>Weather favorable for Rabi crops</span>
                </div>
                <div className="flex items-center gap-2 text-orange-600">
                  <Calendar className="w-4 h-4" />
                  <span>Best planting window: Next 2 weeks</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== CROP RECOMMENDATION CARD ====================

interface CropRecommendationCardProps {
  recommendation: AIRecommendation;
  isSelected: boolean;
  onSelect: () => void;
}

const CropRecommendationCard: React.FC<CropRecommendationCardProps> = ({
  recommendation,
  isSelected,
  onSelect
}) => {
  const trendIcon = recommendation.demandSupply.trend === 'up' ? TrendingUp :
    recommendation.demandSupply.trend === 'down' ? TrendingDown : null;

  return (
    <Card className={cn(
      'p-4 cursor-pointer transition-all border-2',
      isSelected
        ? 'border-green-600 bg-green-50 shadow-lg'
        : 'border-gray-200 hover:border-green-300 hover:shadow-md'
    )}
    onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-lg">{recommendation.crop}</h4>
            {isSelected && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Badge className="bg-purple-100 text-purple-800">
              AI Match: {recommendation.confidence}%
            </Badge>
            <Badge className={cn(
              recommendation.suitability >= 85 ? 'bg-green-100 text-green-800' :
              recommendation.suitability >= 70 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            )}>
              Suitability: {recommendation.suitability}%
            </Badge>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            ₹{recommendation.pricePrediction.predicted}
          </p>
          <div className="flex items-center gap-1 text-sm">
            {trendIcon && React.createElement(trendIcon, {
              className: cn(
                'w-4 h-4',
                recommendation.pricePrediction.change > 0 ? 'text-green-600' : 'text-red-600'
              )
            })}
            <span className={cn(
              recommendation.pricePrediction.change > 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {recommendation.pricePrediction.change > 0 ? '+' : ''}
              {recommendation.pricePrediction.change}%
            </span>
          </div>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="font-semibold text-green-700 mb-2">✓ Advantages</p>
          <ul className="space-y-1">
            {recommendation.pros.slice(0, 2).map((pro, idx) => (
              <li key={idx} className="text-gray-700 text-xs">• {pro}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-red-700 mb-2">⚠ Considerations</p>
          <ul className="space-y-1">
            {recommendation.cons.slice(0, 2).map((con, idx) => (
              <li key={idx} className="text-gray-700 text-xs">• {con}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Demand/Supply */}
      <div className="mt-3 pt-3 border-t">
        <div className="flex items-center justify-between text-xs">
          <div>
            <p className="text-gray-600">Demand</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600"
                  style={{ width: `${recommendation.demandSupply.demand}%` }}
                />
              </div>
              <span className="font-semibold">{recommendation.demandSupply.demand}%</span>
            </div>
          </div>
          <div>
            <p className="text-gray-600">Supply</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${recommendation.demandSupply.supply}%` }}
                />
              </div>
              <span className="font-semibold">{recommendation.demandSupply.supply}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CropSelectionWithAI;
