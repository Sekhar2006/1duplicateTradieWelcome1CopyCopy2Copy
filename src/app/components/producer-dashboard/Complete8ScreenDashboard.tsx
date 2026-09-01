import React, { useState } from 'react';
import {
  Home,
  Warehouse,
  Snowflake,
  Sun,
  Sprout,
  Database,
  Package,
  ShoppingBag,
  Box,
  Container,
  Layers,
  Tag,
  TrendingUp,
  Store,
  Users,
  Globe,
  FileCheck,
  Bell,
  User,
  Search,
  Filter,
  MapPin,
  Star,
  Shield,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Phone,
  Mail,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
  Info,
  Zap,
  ThermometerSun,
  Lock,
  Clock,
  Award,
  Sparkles,
  Settings,
  BarChart3,
  TrendingDown,
  Calendar,
  Truck,
  Headphones,
  BadgeCheck,
  X,
  Heart,
  Navigation,
  Calculator,
  FileText,
  Download,
  Plus,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../ui/tooltip';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { cn } from '../ui/utils';
import ComprehensivePackagingSelector from './ComprehensivePackagingSelector';

// ==================== TYPES & INTERFACES ====================

type Screen = 
  | 'home'
  | 'storage-selection'
  | 'packaging-selection'
  | 'packing-vendors'
  | 'sell-overview'
  | 'direct-sale'
  | 'commission-agent'
  | 'online-market';

interface TokenizationData {
  lotId: string;
  tokenId: string;
  commodity: string;
  quantity: number;
  quality: string;
  timestamp: Date;
}

interface StorageFacility {
  id: string;
  name: string;
  type: 'warehouse' | 'cold_storage' | 'open_storage' | 'farm_storage' | 'silo';
  location: string;
  distance: number;
  capacity: number;
  availableSpace: number;
  rating: number;
  reviews: number;
  services: string[];
  temperatureControl: boolean;
  temperatureRange?: string;
  security: string[];
  rent: {
    amount: number;
    unit: string;
    negotiable: boolean;
  };
  compliance: {
    status: 'compliant' | 'warning' | 'expired';
    certifications: string[];
    alerts: string[];
  };
  agentAvailable: boolean;
  categoryAdvantages?: string[];
}

interface PackingVendor {
  id: string;
  name: string;
  type: 'material' | 'labor' | 'machine';
  category: string;
  rating: number;
  reliability: number;
  priceRange: { min: number; max: number };
  location: string;
  availability: 'Available' | 'Busy' | 'Unavailable';
  anomaly?: {
    type: 'price_high' | 'price_low' | 'quality_issue';
    message: string;
  };
}

interface Agent {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  commission: number;
  workload: 'Light' | 'Medium' | 'Heavy';
  availability: 'Available' | 'Busy' | 'Offline';
  languages: string[];
  successRate: number;
  aiScore: number;
  contact: {
    phone: string;
    email: string;
  };
}

interface Notification {
  id: string;
  type: 'regulatory' | 'price' | 'commission' | 'demand' | 'agent';
  severity: 'info' | 'warning' | 'success';
  title: string;
  message: string;
  timestamp: Date;
}

// ==================== MOCK DATA ====================

const mockTokenization: TokenizationData = {
  lotId: 'LOT-2025-001',
  tokenId: 'TKN-45A3B9C',
  commodity: 'Wheat (Grade A, Organic)',
  quantity: 50,
  quality: 'Premium',
  timestamp: new Date()
};

const mockFacilities: StorageFacility[] = [
  {
    id: 'fac1',
    name: 'Agri-Cool Cold Storage',
    type: 'cold_storage',
    location: 'Ludhiana, Punjab',
    distance: 15,
    capacity: 1000,
    availableSpace: 450,
    rating: 4.8,
    reviews: 234,
    services: ['Temperature Control', '24/7 Security', 'Pest Control', 'Quality Monitoring', 'Loading/Unloading'],
    temperatureControl: true,
    temperatureRange: '2°C to 8°C',
    security: ['CCTV', 'Armed Guards', 'Access Control'],
    rent: {
      amount: 750,
      unit: 'per quintal/month',
      negotiable: true
    },
    compliance: {
      status: 'compliant',
      certifications: ['WDRA', 'FSSAI', 'ISO 9001', 'Cold Chain Certified'],
      alerts: []
    },
    agentAvailable: true,
    categoryAdvantages: ['Extended shelf life', 'Premium quality maintenance', 'Export ready']
  },
  {
    id: 'fac2',
    name: 'Punjab Grain Warehouse',
    type: 'warehouse',
    location: 'Jalandhar, Punjab',
    distance: 8,
    capacity: 2000,
    availableSpace: 890,
    rating: 4.5,
    reviews: 178,
    services: ['Security', 'Pest Control', 'Loading Equipment', 'Insurance Available'],
    temperatureControl: false,
    security: ['CCTV', 'Night Watchman', 'Fire Safety'],
    rent: {
      amount: 450,
      unit: 'per quintal/month',
      negotiable: true
    },
    compliance: {
      status: 'compliant',
      certifications: ['WDRA', 'Fire Safety', 'APMC Approved'],
      alerts: []
    },
    agentAvailable: true,
    categoryAdvantages: ['Large capacity', 'Flexible terms', 'Near market yard']
  }
];

const mockVendors: PackingVendor[] = [
  {
    id: 'v1',
    name: 'Quality Packaging Supplies',
    type: 'material',
    category: 'Jute Sacks',
    rating: 4.7,
    reliability: 92,
    priceRange: { min: 35, max: 55 },
    location: 'Ludhiana',
    availability: 'Available',
    anomaly: {
      type: 'price_low',
      message: 'Price 12% below market average - excellent deal!'
    }
  },
  {
    id: 'v2',
    name: 'Express Packing Labor Services',
    type: 'labor',
    category: 'Packing Teams',
    rating: 4.8,
    reliability: 95,
    priceRange: { min: 500, max: 800 },
    location: 'Jalandhar',
    availability: 'Available'
  },
  {
    id: 'v3',
    name: 'AgriTech Machine Rentals',
    type: 'machine',
    category: 'Packing Machines',
    rating: 4.6,
    reliability: 88,
    priceRange: { min: 2000, max: 5000 },
    location: 'Patiala',
    availability: 'Busy'
  }
];

const mockAgents: Agent[] = [
  {
    id: 'agent1',
    name: 'Harpreet Singh',
    specialization: 'Cold Storage Expert',
    rating: 4.9,
    commission: 2.5,
    workload: 'Light',
    availability: 'Available',
    languages: ['Punjabi', 'Hindi', 'English'],
    successRate: 94,
    aiScore: 95,
    contact: {
      phone: '+91-98765-43210',
      email: 'harpreet@tradie.com'
    }
  },
  {
    id: 'agent2',
    name: 'Meena Patel',
    specialization: 'Commission Sales Expert',
    rating: 4.7,
    commission: 2.0,
    workload: 'Medium',
    availability: 'Available',
    languages: ['Gujarati', 'Hindi', 'English'],
    successRate: 91,
    aiScore: 88,
    contact: {
      phone: '+91-98765-54321',
      email: 'meena@tradie.com'
    }
  },
  {
    id: 'agent3',
    name: 'Rajesh Kumar',
    specialization: 'Online Marketplace Specialist',
    rating: 4.8,
    commission: 3.0,
    workload: 'Heavy',
    availability: 'Busy',
    languages: ['Hindi', 'English', 'Bengali'],
    successRate: 92,
    aiScore: 82,
    contact: {
      phone: '+91-98765-99999',
      email: 'rajesh@tradie.com'
    }
  }
];

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'regulatory',
    severity: 'info',
    title: 'New FSSAI Guidelines',
    message: 'Updated food safety standards effective Nov 1, 2025',
    timestamp: new Date()
  },
  {
    id: 'n2',
    type: 'price',
    severity: 'warning',
    title: 'Price Anomaly',
    message: 'Cold storage rates 15% above regional average',
    timestamp: new Date()
  },
  {
    id: 'n3',
    type: 'demand',
    severity: 'success',
    title: 'High Demand Alert',
    message: 'Wheat demand up 12% - good time to sell',
    timestamp: new Date()
  }
];

// ==================== MAIN COMPONENT ====================

const Complete8ScreenDashboard: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [selectedPackaging, setSelectedPackaging] = useState<string[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [agentDialogOpen, setAgentDialogOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Navigation
  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    const navigationMap: Record<Screen, Screen> = {
      'home': 'home',
      'storage-selection': 'home',
      'packaging-selection': 'storage-selection',
      'packing-vendors': 'packaging-selection',
      'sell-overview': 'home',
      'direct-sale': 'sell-overview',
      'commission-agent': 'sell-overview',
      'online-market': 'sell-overview'
    };
    navigateTo(navigationMap[currentScreen]);
  };

  // ==================== SHARED TOP NAVIGATION ====================
  const TopNav = () => (
    <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentScreen !== 'home' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <h1 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display', color: '#003E6D' }}>
              TRADIE Platform
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNotificationsOpen(true)}
              className="gap-2 relative"
            >
              <Bell className="w-4 h-4" />
              {mockNotifications.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5">
                  {mockNotifications.length}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            <Button variant="outline" size="sm" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Profile</span>
            </Button>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <Home className="w-4 h-4" />
          <ChevronRight className="w-3 h-3" />
          <span className="capitalize">{currentScreen.replace('-', ' ')}</span>
        </div>
      </div>
    </div>
  );

  // ==================== SCREEN 1: HOME ====================
  const Screen1Home = () => (
    <div className="space-y-6">
      {/* Tokenization Success Banner */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 p-6">
        <div className="flex items-start gap-4">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              🎉 Tokenization Successful!
            </h2>
            <p className="text-green-700 mb-4">
              Your lot has been successfully tokenized and is now ready for the next steps.
            </p>

            {/* Tokenization Details */}
            <div className="bg-white rounded-lg p-4 space-y-2 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Lot ID</p>
                  <p className="font-semibold">{mockTokenization.lotId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Token ID</p>
                  <p className="font-semibold">{mockTokenization.tokenId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Commodity</p>
                  <p className="font-semibold">{mockTokenization.commodity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-semibold">{mockTokenization.quantity} quintals</p>
                </div>
              </div>
            </div>

            {/* Two Large Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                size="lg"
                onClick={() => navigateTo('storage-selection')}
                className="bg-blue-600 hover:bg-blue-700 h-20 text-lg"
              >
                <Warehouse className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold">Go to Storage Management</div>
                  <div className="text-xs opacity-90">Find & book storage facilities</div>
                </div>
                <ChevronRight className="w-5 h-5 ml-auto" />
              </Button>

              <Button
                size="lg"
                onClick={() => navigateTo('sell-overview')}
                className="bg-green-600 hover:bg-green-700 h-20 text-lg"
              >
                <TrendingUp className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold">Go to Sell Dashboard</div>
                  <div className="text-xs opacity-90">List your commodity for sale</div>
                </div>
                <ChevronRight className="w-5 h-5 ml-auto" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <Warehouse className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Available Storage</p>
              <p className="text-2xl font-bold">1,340 qtl</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Current Market Price</p>
              <p className="text-2xl font-bold">₹2,340<span className="text-sm">/qtl</span></p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-purple-500">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Active Buyers</p>
              <p className="text-2xl font-bold">1,247</p>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Notifications Panel */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          AI Insights & Alerts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockNotifications.map((notif) => (
            <div key={notif.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2 rounded-full",
                  notif.severity === 'warning' ? 'bg-red-500' :
                  notif.severity === 'success' ? 'bg-green-500' :
                  'bg-blue-500'
                )}>
                  {notif.severity === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                   notif.severity === 'success' ? <TrendingUp className="w-4 h-4" /> :
                   <Info className="w-4 h-4" />}
                </div>
                <div>
                  <p className="font-semibold mb-1">{notif.title}</p>
                  <p className="text-sm opacity-90">{notif.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // ==================== SCREEN 2: STORAGE FACILITY SELECTION ====================
  const Screen2StorageSelection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#003E6D' }}>
            Storage Facility Selection
          </h2>
          <p className="text-gray-600 mt-1">Choose the best storage solution for your commodity</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setAgentDialogOpen(true)}
          className="gap-2"
        >
          <Headphones className="w-4 h-4" />
          Get Expert Help
        </Button>
      </div>

      {/* Storage Type Selector */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Select Storage Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { id: 'warehouse', icon: Warehouse, label: 'Warehouse', color: 'blue' },
            { id: 'cold_storage', icon: Snowflake, label: 'Cold Storage', color: 'cyan' },
            { id: 'open_storage', icon: Sun, label: 'Open Storage', color: 'yellow' },
            { id: 'farm_storage', icon: Sprout, label: 'Farm Storage', color: 'green' },
            { id: 'silo', icon: Database, label: 'Silo', color: 'purple' }
          ].map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedStorage(type.id)}
              className={cn(
                "cursor-pointer rounded-lg p-4 border-2 transition-all hover:shadow-lg",
                selectedStorage === type.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              )}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className={cn(
                  "p-3 rounded-full",
                  selectedStorage === type.id ? "bg-blue-100" : "bg-gray-100"
                )}>
                  <type.icon className={cn(
                    "w-6 h-6",
                    selectedStorage === type.id ? "text-blue-600" : "text-gray-600"
                  )} />
                </div>
                <span className="text-sm font-semibold">{type.label}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters and Search */}
      {selectedStorage && (
        <>
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input placeholder="Search facilities..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ludhiana">Ludhiana</SelectItem>
                  <SelectItem value="jalandhar">Jalandhar</SelectItem>
                  <SelectItem value="patiala">Patiala</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">₹0-500</SelectItem>
                  <SelectItem value="mid">₹500-1000</SelectItem>
                  <SelectItem value="high">₹1000+</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </Card>

          {/* Facility List */}
          <div className="space-y-4">
            {mockFacilities.map((facility) => (
              <Card key={facility.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: Facility Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{facility.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="w-4 h-4" />
                          {facility.location} • {facility.distance} km away
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{facility.rating}</span>
                        <span className="text-sm text-gray-500">({facility.reviews})</span>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-2">Services Offered:</p>
                      <div className="flex flex-wrap gap-2">
                        {facility.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Capacity */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Available Space</span>
                        <span className="font-semibold">{facility.availableSpace} / {facility.capacity} qtl</span>
                      </div>
                      <Progress value={(facility.availableSpace / facility.capacity) * 100} className="h-2" />
                    </div>

                    {/* Compliance */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={cn(
                        facility.compliance.status === 'compliant' ? 'bg-green-100 text-green-800' :
                        facility.compliance.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      )}>
                        <Shield className="w-3 h-3 mr-1" />
                        {facility.compliance.status.toUpperCase()}
                      </Badge>
                      {facility.compliance.certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>

                    {/* Category Advantages */}
                    {facility.categoryAdvantages && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <p className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          Eligible Advantages:
                        </p>
                        <div className="space-y-1">
                          {facility.categoryAdvantages.map((adv, idx) => (
                            <p key={idx} className="text-xs text-blue-800 flex items-start gap-1">
                              <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              {adv}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rental Terms */}
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Rental Price:</p>
                          <p className="text-xl font-bold text-green-600">
                            ₹{facility.rent.amount}
                            <span className="text-sm font-normal text-gray-600">/{facility.rent.unit}</span>
                          </p>
                        </div>
                        {facility.rent.negotiable && (
                          <Badge className="bg-green-100 text-green-800">
                            <DollarSign className="w-3 h-3 mr-1" />
                            Negotiable
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-2 md:w-48">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 w-full"
                      onClick={() => navigateTo('packaging-selection')}
                    >
                      Select Facility
                    </Button>
                    {facility.agentAvailable && (
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => setAgentDialogOpen(true)}
                      >
                        <Headphones className="w-4 h-4" />
                        Assign Agent
                      </Button>
                    )}
                    <Button variant="outline" className="w-full gap-2">
                      <Info className="w-4 h-4" />
                      View Details
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Phone className="w-4 h-4" />
                      Contact
                    </Button>
                  </div>
                </div>

                {/* AI Alerts */}
                {facility.compliance.alerts.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-yellow-900 mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        AI Alert:
                      </p>
                      {facility.compliance.alerts.map((alert, idx) => (
                        <p key={idx} className="text-xs text-yellow-800">{alert}</p>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );

  // ==================== SCREEN 3: PACKAGING SELECTION ====================
  const Screen3PackagingSelection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#003E6D' }}>
            Packaging Category Selection
          </h2>
          <p className="text-gray-600 mt-1">Choose packaging materials for your commodity</p>
        </div>
        <Button
          onClick={() => navigateTo('packing-vendors')}
          className="bg-purple-600 hover:bg-purple-700 gap-2"
        >
          Continue to Vendors
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <ComprehensivePackagingSelector 
        commodity={mockTokenization.commodity.split('(')[0].trim()}
      />
    </div>
  );

  // ==================== SCREEN 4: PACKING VENDORS ====================
  const Screen4PackingVendors = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#003E6D' }}>
            Packing Vendors & Services
          </h2>
          <p className="text-gray-600 mt-1">Find suppliers, labor, and equipment for packaging</p>
        </div>
        <Button
          onClick={() => navigateTo('sell-overview')}
          className="bg-green-600 hover:bg-green-700 gap-2"
        >
          Continue to Sell
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Vendor Type Tabs */}
      <Tabs defaultValue="material">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="material">Material Suppliers</TabsTrigger>
          <TabsTrigger value="labor">Labor Services</TabsTrigger>
          <TabsTrigger value="machine">Machine Rental</TabsTrigger>
        </TabsList>

        <TabsContent value="material" className="space-y-4 mt-6">
          {mockVendors.filter(v => v.type === 'material').map((vendor) => (
            <Card key={vendor.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{vendor.name}</h3>
                  <p className="text-sm text-gray-600">{vendor.category}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    {vendor.location}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{vendor.rating}</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Price Range:</p>
                    <p className="text-lg font-bold text-blue-600">
                      ₹{vendor.priceRange.min}-{vendor.priceRange.max}/unit
                    </p>
                  </div>
                  <Badge className={cn(
                    vendor.availability === 'Available' ? 'bg-green-100 text-green-800' :
                    vendor.availability === 'Busy' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  )}>
                    {vendor.availability}
                  </Badge>
                </div>
              </div>

              {/* Reliability */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Reliability Score</span>
                  <span className="font-semibold">{vendor.reliability}%</span>
                </div>
                <Progress value={vendor.reliability} className="h-2" />
              </div>

              {/* AI Anomaly */}
              {vendor.anomaly && (
                <div className={cn(
                  "rounded-lg p-3 mb-4",
                  vendor.anomaly.type === 'price_low' ? 'bg-green-50 border border-green-200' :
                  vendor.anomaly.type === 'price_high' ? 'bg-red-50 border border-red-200' :
                  'bg-yellow-50 border border-yellow-200'
                )}>
                  <p className={cn(
                    "text-sm font-semibold flex items-center gap-2",
                    vendor.anomaly.type === 'price_low' ? 'text-green-800' :
                    vendor.anomaly.type === 'price_high' ? 'text-red-800' :
                    'text-yellow-800'
                  )}>
                    <Sparkles className="w-4 h-4" />
                    AI Alert: {vendor.anomaly.message}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1">Book Now</Button>
                <Button variant="outline" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button variant="outline" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="labor" className="space-y-4 mt-6">
          {mockVendors.filter(v => v.type === 'labor').map((vendor) => (
            <Card key={vendor.id} className="p-6">
              {/* Similar structure as material */}
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-semibold">{vendor.name}</p>
                <p className="text-sm">{vendor.category}</p>
                <p className="text-lg font-bold mt-2">₹{vendor.priceRange.min}-{vendor.priceRange.max}/day</p>
                <Button className="mt-4">Book Labor Team</Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="machine" className="space-y-4 mt-6">
          {mockVendors.filter(v => v.type === 'machine').map((vendor) => (
            <Card key={vendor.id} className="p-6">
              {/* Similar structure as material */}
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-semibold">{vendor.name}</p>
                <p className="text-sm">{vendor.category}</p>
                <p className="text-lg font-bold mt-2">₹{vendor.priceRange.min}-{vendor.priceRange.max}/day</p>
                <Button className="mt-4">Rent Machine</Button>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );

  // ==================== SCREEN 5: SELL OVERVIEW ====================
  const Screen5SellOverview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: '#003E6D' }}>
        Sell Dashboard - Overview
      </h2>

      {/* Inventory Summary */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="font-semibold text-lg mb-4">Inventory Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Quantity</p>
            <p className="text-2xl font-bold">{mockTokenization.quantity} qtl</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600">Current Market Rate</p>
            <p className="text-2xl font-bold text-green-600">₹2,340/qtl</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600">Estimated Value</p>
            <p className="text-2xl font-bold">₹1,17,000</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600">Price Trend</p>
            <p className="text-2xl font-bold text-green-600 flex items-center gap-1">
              +5.2%
              <TrendingUp className="w-5 h-5" />
            </p>
          </div>
        </div>
      </Card>

      {/* Selling Methods */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Choose Selling Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              id: 'direct-sale',
              icon: Home,
              title: 'Direct Sale',
              description: 'Sell directly at your production site',
              commission: '0%',
              time: '1-3 days',
              screen: 'direct-sale' as Screen
            },
            {
              id: 'commission-agent',
              icon: Users,
              title: 'Commission Agent',
              description: 'Sell through market yard agents',
              commission: '2-3%',
              time: '2-5 days',
              screen: 'commission-agent' as Screen
            },
            {
              id: 'online-market',
              icon: Globe,
              title: 'Online Marketplace',
              description: 'List on TRADIE platform',
              commission: '3%',
              time: '3-10 days',
              screen: 'online-market' as Screen
            },
            {
              id: 'contract',
              icon: FileCheck,
              title: 'Contract Farming',
              description: 'Pre-arranged forward sale',
              commission: '1.5%',
              time: 'Pre-arranged',
              screen: 'direct-sale' as Screen
            }
          ].map((method) => (
            <Card
              key={method.id}
              className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-500"
              onClick={() => navigateTo(method.screen)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-50">
                  <method.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">{method.title}</h4>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Commission</p>
                  <p className="font-semibold">{method.commission}</p>
                </div>
                <div>
                  <p className="text-gray-600">Time to Sale</p>
                  <p className="font-semibold">{method.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Market Updates
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900">Demand Increased</p>
              <p className="text-sm text-green-700">Wheat demand up 12% - favorable time to sell</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <Users className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900">New Agents Available</p>
              <p className="text-sm text-blue-700">3 commission agents with <2.5% rates registered</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  // ==================== SCREENS 6-8: SELLING METHODS (Simplified for length) ====================
  const Screen6DirectSale = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: '#003E6D' }}>Direct Sale Setup</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Details</label>
            <Input placeholder="Enter product specifications" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Sale Location</label>
            <Input placeholder="Enter location" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price Per Quintal</label>
            <Input type="number" placeholder="₹2,340" />
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-2">AI Pricing Guide:</p>
            <p className="text-sm text-blue-700">Suggested price range: ₹2,300 - ₹2,400 based on current market</p>
          </div>
          <Button className="w-full" size="lg">List for Direct Sale</Button>
        </div>
      </Card>
    </div>
  );

  const Screen7CommissionAgent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: '#003E6D' }}>Commission Agent Sales</h2>
      
      {/* Agent List */}
      <div className="space-y-4">
        {mockAgents.filter(a => a.specialization.includes('Commission')).map((agent) => (
          <Card key={agent.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{agent.name}</h3>
                <p className="text-sm text-gray-600">{agent.specialization}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Workload: {agent.workload} • Success Rate: {agent.successRate}%
                </p>
              </div>
              <Badge className={cn(
                agent.availability === 'Available' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              )}>
                {agent.availability}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Commission</p>
                <p className="text-lg font-bold text-blue-600">{agent.commission}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-lg font-bold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {agent.rating}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">AI Score</p>
                <p className="text-lg font-bold text-purple-600">{agent.aiScore}/100</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-3 mb-4">
              <p className="text-sm font-semibold text-green-900 mb-1">AI Recommendation:</p>
              <p className="text-sm text-green-700">Optimal commission split: {agent.commission}% for {agent.name}</p>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">Assign Agent</Button>
              <Button variant="outline" className="gap-2">
                <Phone className="w-4 h-4" />
                Call
              </Button>
              <Button variant="outline" className="gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const Screen8OnlineMarket = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: '#003E6D' }}>Online Market Listing</h2>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Title</label>
            <Input placeholder="e.g., Premium Grade A Organic Wheat" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea placeholder="Describe your product..." rows={4} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price Per Quintal</label>
              <Input type="number" placeholder="₹2,340" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Available Quantity</label>
              <Input type="number" placeholder="50" />
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-purple-900 mb-2 flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              AI Dynamic Pricing & Demand Forecast:
            </p>
            <div className="space-y-1">
              <p className="text-sm text-purple-700">• 1,247 active wheat buyers online now</p>
              <p className="text-sm text-purple-700">• Average online price 8% higher than mandi</p>
              <p className="text-sm text-purple-700">• Peak buying hours: 10 AM - 2 PM</p>
              <p className="text-sm text-purple-700">• Suggested price: ₹2,520/qtl for quick sale</p>
            </div>
          </div>

          <Button className="w-full" size="lg">List on TRADIE Marketplace</Button>
        </div>
      </Card>
    </div>
  );

  // ==================== NOTIFICATIONS DIALOG ====================
  const NotificationsDialog = () => (
    <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </DialogTitle>
          <DialogDescription>
            Recent updates and alerts for your account
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {mockNotifications.map((notif) => (
            <div key={notif.id} className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2 rounded-full flex-shrink-0",
                  notif.severity === 'warning' ? 'bg-red-100' :
                  notif.severity === 'success' ? 'bg-green-100' :
                  'bg-blue-100'
                )}>
                  {notif.severity === 'warning' ? <AlertTriangle className="w-4 h-4 text-red-600" /> :
                   notif.severity === 'success' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                   <Info className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{notif.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {notif.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  // ==================== AGENT DIALOG ====================
  const AgentDialog = () => (
    <Dialog open={agentDialogOpen} onOpenChange={setAgentDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Headphones className="w-5 h-5" />
            Assign Expert Agent
          </DialogTitle>
          <DialogDescription>
            Get personalized assistance from our certified professionals
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {mockAgents.map((agent) => (
            <Card key={agent.id} className="p-6 border-2 hover:border-blue-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-4 rounded-full">
                  <User className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{agent.name}</h3>
                      <p className="text-gray-600">{agent.specialization}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-400 text-white">
                        ⭐ AI Score: {agent.aiScore}
                      </Badge>
                      <Badge className={cn(
                        agent.availability === 'Available' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      )}>
                        {agent.availability}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {agent.rating}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Success Rate</p>
                      <p className="font-semibold">{agent.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Commission</p>
                      <p className="font-semibold">{agent.commission}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Workload</p>
                      <p className="font-semibold">{agent.workload}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Languages:</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Assign {agent.name}</Button>
                    <Button variant="outline" className="gap-2">
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  // ==================== MAIN RENDER ====================
  return (
    <TooltipProvider>
      <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
        <TopNav />
        
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          {currentScreen === 'home' && <Screen1Home />}
          {currentScreen === 'storage-selection' && <Screen2StorageSelection />}
          {currentScreen === 'packaging-selection' && <Screen3PackagingSelection />}
          {currentScreen === 'packing-vendors' && <Screen4PackingVendors />}
          {currentScreen === 'sell-overview' && <Screen5SellOverview />}
          {currentScreen === 'direct-sale' && <Screen6DirectSale />}
          {currentScreen === 'commission-agent' && <Screen7CommissionAgent />}
          {currentScreen === 'online-market' && <Screen8OnlineMarket />}
        </div>

        <NotificationsDialog />
        <AgentDialog />
      </div>
    </TooltipProvider>
  );
};

export default Complete8ScreenDashboard;
