import React, { useState } from 'react';
import {
  Truck,
  Users,
  MapPin,
  Calendar,
  Phone,
  DollarSign,
  Shield,
  Navigation,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Camera,
  Package,
  TrendingUp,
  Award,
  ArrowRight,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { BeautifulButton, ButtonGroup } from '../ui/beautiful-buttons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import OTPDoubleVerification from '../OTPDoubleVerification';
import { cn } from '../ui/utils';

// ==================== INTERFACES ====================

interface TransportBookingProps {
  producerId: string;
  commodityData: any;
  onComplete: (data: TransportBookingData) => void;
  onBack: () => void;
}

interface TransportBookingData {
  transportType: 'individual' | 'shared';
  transporter: Transporter;
  vehicleNumber: string;
  driverMobile: string;
  route: string;
  pickupDate: string;
  pickupTime: string;
  expectedDeliveryDate: string;
  commissionAgent?: CommissionAgent;
  insurance: boolean;
  liveTracking: boolean;
  estimatedCost: number;
  otpConfirmed: boolean;
}

interface Transporter {
  id: string;
  name: string;
  rating: number;
  reliability: number;
  onTimeDelivery: number;
  safetyScore: number;
  pricePerKm: number;
  vehicleType: string;
  completedTrips: number;
}

interface CommissionAgent {
  id: string;
  name: string;
  licenseNumber: string;
  commissionRate: number;
  location: string;
}

// ==================== MOCK DATA ====================

const transporters: Transporter[] = [
  {
    id: 'T001',
    name: 'Punjab Transport Co.',
    rating: 4.8,
    reliability: 95,
    onTimeDelivery: 92,
    safetyScore: 98,
    pricePerKm: 12,
    vehicleType: 'Covered Truck',
    completedTrips: 450
  },
  {
    id: 'T002',
    name: 'Fast Logistics',
    rating: 4.6,
    reliability: 88,
    onTimeDelivery: 90,
    safetyScore: 94,
    pricePerKm: 10,
    vehicleType: 'Open Truck',
    completedTrips: 320
  },
  {
    id: 'T003',
    name: 'Safe Cargo Services',
    rating: 4.9,
    reliability: 98,
    onTimeDelivery: 96,
    safetyScore: 99,
    pricePerKm: 15,
    vehicleType: 'Refrigerated Truck',
    completedTrips: 580
  }
];

const commissionAgents: CommissionAgent[] = [
  {
    id: 'CA001',
    name: 'Rajesh Kumar & Associates',
    licenseNumber: 'CA/PB/2020/001',
    commissionRate: 2.5,
    location: 'Chandigarh Mandi'
  },
  {
    id: 'CA002',
    name: 'Singh Traders',
    licenseNumber: 'CA/PB/2019/045',
    commissionRate: 3.0,
    location: 'Ludhiana Market'
  },
  {
    id: 'CA003',
    name: 'Modern Agro Solutions',
    licenseNumber: 'CA/PB/2021/089',
    commissionRate: 2.0,
    location: 'Amritsar APMC'
  }
];

// ==================== MAIN COMPONENT ====================

const TransportBooking: React.FC<TransportBookingProps> = ({
  producerId,
  commodityData,
  onComplete,
  onBack
}) => {
  const [transportType, setTransportType] = useState<'individual' | 'shared'>('individual');
  const [selectedTransporter, setSelectedTransporter] = useState<Transporter | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<CommissionAgent | null>(null);
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    driverMobile: '',
    route: 'Farm → Highway → Mandi',
    pickupDate: '',
    pickupTime: '',
    expectedDeliveryDate: '',
    insurance: false,
    liveTracking: false
  });
  const [showOTP, setShowOTP] = useState(false);
  const [showAIRecommendation, setShowAIRecommendation] = useState(true);

  // AI recommended transporter (best overall)
  const aiRecommended = transporters[2]; // Safe Cargo Services

  // Calculate costs
  const distance = 120; // km
  const baseCost = selectedTransporter ? selectedTransporter.pricePerKm * distance : 0;
  const insuranceCost = formData.insurance ? baseCost * 0.05 : 0;
  const trackingCost = formData.liveTracking ? 500 : 0;
  const totalCost = baseCost + insuranceCost + trackingCost;

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleTransporterSelect = (transporter: Transporter) => {
    setSelectedTransporter(transporter);
    setShowAIRecommendation(false);
  };

  const handleBookingSubmit = () => {
    if (!selectedTransporter) {
      alert('Please select a transporter');
      return;
    }
    if (!formData.vehicleNumber || !formData.driverMobile || !formData.pickupDate) {
      alert('Please fill all required fields');
      return;
    }
    if (!selectedAgent) {
      alert('Please select a commission agent');
      return;
    }

    // Show OTP verification
    setShowOTP(true);
  };

  const handleOTPComplete = () => {
    const bookingData: TransportBookingData = {
      transportType,
      transporter: selectedTransporter!,
      vehicleNumber: formData.vehicleNumber,
      driverMobile: formData.driverMobile,
      route: formData.route,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      expectedDeliveryDate: formData.expectedDeliveryDate,
      commissionAgent: selectedAgent!,
      insurance: formData.insurance,
      liveTracking: formData.liveTracking,
      estimatedCost: totalCost,
      otpConfirmed: true
    };

    onComplete(bookingData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">🚚 Transport Booking</h1>
            <p className="text-gray-600">
              Arrange safe and reliable transport for your commodity
            </p>
          </div>
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Commodity Summary */}
            <Card className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <h3 className="text-xl font-semibold mb-4">Commodity Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm opacity-90 mb-1">Commodity</p>
                  <p className="text-lg font-bold">{commodityData?.commodity || 'Wheat Grade A'}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-1">Quantity</p>
                  <p className="text-lg font-bold">{commodityData?.quantity || '100'} quintals</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-1">Bags</p>
                  <p className="text-lg font-bold">{commodityData?.bags || '50'} bags</p>
                </div>
              </div>
            </Card>

            {/* Transport Type Selection */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Transport Type</h3>
              <RadioGroup
                value={transportType}
                onValueChange={(val: any) => setTransportType(val)}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="individual" id="individual" className="peer sr-only" />
                  <Label
                    htmlFor="individual"
                    className={cn(
                      'flex flex-col items-center justify-between rounded-lg border-2 p-6 cursor-pointer transition-all',
                      transportType === 'individual'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    )}
                  >
                    <Truck className="w-12 h-12 mb-3 text-purple-600" />
                    <div className="text-center">
                      <p className="font-semibold mb-1">Individual</p>
                      <p className="text-xs text-gray-600">Dedicated vehicle</p>
                    </div>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="shared" id="shared" className="peer sr-only" />
                  <Label
                    htmlFor="shared"
                    className={cn(
                      'flex flex-col items-center justify-between rounded-lg border-2 p-6 cursor-pointer transition-all',
                      transportType === 'shared'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    )}
                  >
                    <Users className="w-12 h-12 mb-3 text-purple-600" />
                    <div className="text-center">
                      <p className="font-semibold mb-1">Shared</p>
                      <p className="text-xs text-gray-600">Cost-effective</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {transportType === 'shared' && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Shared transport</strong> can reduce costs by up to 40%. 
                    We'll find other producers shipping to the same destination.
                  </p>
                </div>
              )}
            </Card>

            {/* AI Recommendation */}
            {showAIRecommendation && (
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-600 rounded-full">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      🤖 AI Recommended Transporter
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Based on safety, reliability, and price, we recommend:
                    </p>
                    <TransporterCard
                      transporter={aiRecommended}
                      isSelected={selectedTransporter?.id === aiRecommended.id}
                      isRecommended={true}
                      onSelect={() => handleTransporterSelect(aiRecommended)}
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Transporter Selection */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Select Transporter</h3>
              <div className="space-y-4">
                {transporters.map((transporter) => (
                  <TransporterCard
                    key={transporter.id}
                    transporter={transporter}
                    isSelected={selectedTransporter?.id === transporter.id}
                    isRecommended={transporter.id === aiRecommended.id}
                    onSelect={() => handleTransporterSelect(transporter)}
                  />
                ))}
              </div>
            </Card>

            {/* Vehicle & Driver Details */}
            {selectedTransporter && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Vehicle & Driver Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vehicle">Vehicle Number *</Label>
                    <Input
                      id="vehicle"
                      placeholder="PB-01-AB-1234"
                      value={formData.vehicleNumber}
                      onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="driver">Driver Mobile *</Label>
                    <Input
                      id="driver"
                      type="tel"
                      placeholder="+91-98765-43210"
                      value={formData.driverMobile}
                      onChange={(e) => handleInputChange('driverMobile', e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="route">Route</Label>
                    <Select
                      value={formData.route}
                      onValueChange={(val) => handleInputChange('route', val)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Farm → Highway → Mandi">Farm → Highway → Mandi (120 km)</SelectItem>
                        <SelectItem value="Farm → Ring Road → Mandi">Farm → Ring Road → Mandi (135 km)</SelectItem>
                        <SelectItem value="Farm → Expressway → Mandi">Farm → Expressway → Mandi (110 km, Fastest)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="pickupDate">Pickup Date *</Label>
                    <Input
                      id="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <Label htmlFor="pickupTime">Pickup Time *</Label>
                    <Input
                      id="pickupTime"
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="delivery">Expected Delivery</Label>
                    <Input
                      id="delivery"
                      type="date"
                      value={formData.expectedDeliveryDate}
                      onChange={(e) => handleInputChange('expectedDeliveryDate', e.target.value)}
                      min={formData.pickupDate}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Estimated delivery: {formData.pickupDate ? 'Same day' : 'Select pickup date'}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Commission Agent Selection */}
            {selectedTransporter && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Select Commission Agent</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Choose an agent at the destination market to handle your commodity
                </p>
                
                <div className="space-y-3">
                  {commissionAgents.map((agent) => (
                    <div
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent)}
                      className={cn(
                        'p-4 rounded-lg border-2 cursor-pointer transition-all',
                        selectedAgent?.id === agent.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{agent.name}</h4>
                            {selectedAgent?.id === agent.id && (
                              <CheckCircle className="w-5 h-5 text-purple-600" />
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-gray-600">License</p>
                              <p className="font-medium">{agent.licenseNumber}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Commission</p>
                              <p className="font-medium text-green-600">{agent.commissionRate}%</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-gray-600">Location</p>
                              <p className="font-medium flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {agent.location}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Optional Services */}
            {selectedTransporter && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Optional Services</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="insurance"
                      checked={formData.insurance}
                      onCheckedChange={(checked) => handleInputChange('insurance', checked)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="insurance" className="flex items-center gap-2 cursor-pointer">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span className="font-semibold">Insurance Cover</span>
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Protect your commodity against damage or loss during transit
                      </p>
                      <p className="text-sm font-semibold text-green-600 mt-1">
                        +₹{insuranceCost.toLocaleString()} (5% of transport cost)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg border hover:bg-gray-50">
                    <Checkbox
                      id="tracking"
                      checked={formData.liveTracking}
                      onCheckedChange={(checked) => handleInputChange('liveTracking', checked)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="tracking" className="flex items-center gap-2 cursor-pointer">
                        <Navigation className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold">Live Tracking</span>
                        <Badge className="bg-blue-600">Premium</Badge>
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Track your commodity in real-time with GPS updates every 15 minutes
                      </p>
                      <p className="text-sm font-semibold text-blue-600 mt-1">
                        +₹500 per trip
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right: Summary & Actions */}
          <div className="space-y-6">
            
            {/* Cost Summary */}
            {selectedTransporter && (
              <Card className="p-6 bg-gradient-to-br from-green-600 to-emerald-600 text-white sticky top-6">
                <h3 className="text-xl font-semibold mb-4">Cost Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-white/20">
                    <span>Transport ({distance} km)</span>
                    <span className="font-bold">₹{baseCost.toLocaleString()}</span>
                  </div>

                  {formData.insurance && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        Insurance
                      </span>
                      <span className="font-bold">₹{insuranceCost.toLocaleString()}</span>
                    </div>
                  )}

                  {formData.liveTracking && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Navigation className="w-4 h-4" />
                        Live Tracking
                      </span>
                      <span className="font-bold">₹{trackingCost.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <span className="text-lg">Total Cost</span>
                    <span className="text-3xl font-bold">₹{totalCost.toLocaleString()}</span>
                  </div>

                  {selectedAgent && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <p className="text-sm opacity-90 mb-1">Commission Agent</p>
                      <p className="font-semibold">{selectedAgent.name}</p>
                      <p className="text-sm opacity-90">{selectedAgent.commissionRate}% commission</p>
                    </div>
                  )}
                </div>

                <BeautifulButton
                  variant="gold"
                  size="lg"
                  fullWidth
                  icon={ArrowRight}
                  iconPosition="right"
                  shimmer
                  glow
                  onClick={handleBookingSubmit}
                  className="mt-6"
                  disabled={!selectedTransporter || !selectedAgent}
                >
                  Confirm Booking
                </BeautifulButton>
              </Card>
            )}

            {/* Delivery Timeline */}
            {formData.pickupDate && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Delivery Timeline</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Package className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Pickup</p>
                      <p className="text-gray-600">{formData.pickupDate} at {formData.pickupTime}</p>
                    </div>
                  </div>
                  
                  <div className="ml-4 border-l-2 border-dashed border-gray-300 h-6"></div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Truck className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">In Transit</p>
                      <p className="text-gray-600">~3-4 hours</p>
                    </div>
                  </div>
                  
                  <div className="ml-4 border-l-2 border-dashed border-gray-300 h-6"></div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Delivery</p>
                      <p className="text-gray-600">{formData.expectedDeliveryDate || 'Same day'}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Help Card */}
            <Card className="p-6 bg-blue-50">
              <h4 className="font-semibold mb-2">Need Help?</h4>
              <p className="text-sm text-gray-700 mb-3">
                Our transport coordinator is available 24/7
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOTP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <OTPDoubleVerification
              transactionType="transport_booking"
              transactionAmount={totalCost}
              requireBoth={true}
              onComplete={handleOTPComplete}
              onCancel={() => setShowOTP(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== TRANSPORTER CARD ====================

interface TransporterCardProps {
  transporter: Transporter;
  isSelected: boolean;
  isRecommended: boolean;
  onSelect: () => void;
}

const TransporterCard: React.FC<TransporterCardProps> = ({
  transporter,
  isSelected,
  isRecommended,
  onSelect
}) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'p-4 rounded-lg border-2 cursor-pointer transition-all',
        isSelected
          ? 'border-purple-600 bg-purple-50 shadow-lg'
          : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-lg">{transporter.name}</h4>
            {isRecommended && (
              <Badge className="bg-purple-600">
                <Award className="w-3 h-3 mr-1" />
                AI Pick
              </Badge>
            )}
            {isSelected && (
              <CheckCircle className="w-5 h-5 text-purple-600" />
            )}
          </div>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{transporter.rating}</span>
            <span className="text-sm text-gray-600">
              ({transporter.completedTrips} trips)
            </span>
          </div>
          <p className="text-sm text-gray-600">{transporter.vehicleType}</p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            ₹{transporter.pricePerKm}
          </p>
          <p className="text-xs text-gray-600">per km</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-green-50 rounded">
          <p className="text-xs text-gray-600 mb-1">Reliability</p>
          <p className="font-bold text-green-600">{transporter.reliability}%</p>
        </div>
        <div className="text-center p-2 bg-blue-50 rounded">
          <p className="text-xs text-gray-600 mb-1">On-Time</p>
          <p className="font-bold text-blue-600">{transporter.onTimeDelivery}%</p>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded">
          <p className="text-xs text-gray-600 mb-1">Safety</p>
          <p className="font-bold text-purple-600">{transporter.safetyScore}%</p>
        </div>
      </div>
    </div>
  );
};

export default TransportBooking;
