import React, { useState, useEffect } from 'react';
import {
  Warehouse,
  Snowflake,
  Sun,
  Sprout,
  Database,
  Building2,
  Package,
  TrendingUp,
  ShoppingCart,
  Store,
  Users,
  Truck,
  MapPin,
  DollarSign,
  Star,
  Shield,
  CheckCircle,
  AlertTriangle,
  Zap,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  User,
  Headphones,
  MessageCircle,
  Search,
  Filter,
  Clock,
  Calendar,
  ThermometerSun,
  Lock,
  Award,
  Bell,
  Info,
  X,
  ArrowRight,
  Home,
  BarChart3,
  Settings,
  FileCheck,
  BadgeCheck,
  UserCheck,
  Sparkles,
  ShoppingBag,
  Box,
  Container,
  Layers,
  Tag,
  Droplet,
  CloudRain,
  Cloud,
  Heart,
  BookmarkPlus,
  Compare,
  Download,
  Share2,
  Calculator,
  Lightbulb,
  Globe,
  Handshake,
  Navigation,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../ui/tooltip';
import { cn } from '../ui/utils';

// Import the comprehensive packaging selector
import ComprehensivePackagingSelector from './ComprehensivePackagingSelector';

// ==================== INTERFACES ====================

interface StorageFacility {
  id: string;
  name: string;
  type: 'warehouse' | 'cold_storage' | 'open_storage' | 'farm_storage' | 'silo';
  location: string;
  distance: number;
  capacity: number;
  availableSpace: number;
  services: string[];
  temperatureControl: boolean;
  temperatureRange?: string;
  security: string[];
  compliance: {
    status: 'compliant' | 'warning' | 'expired';
    certifications: string[];
    lastUpdated: Date;
    alerts: string[];
  };
  rent: {
    amount: number;
    unit: string;
    negotiable: boolean;
    discount?: number;
  };
  rating: number;
  reviews: number;
  advantages: string[];
  agentAvailable: boolean;
}

interface Agent {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  languages: string[];
  certifications: string[];
  availability: 'Available' | 'Busy' | 'Offline';
  rating: number;
  successRate: number;
  responseTime: string;
  clientsServed: number;
  aiScore: number;
  commission?: number;
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
  };
}

interface SellingMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  commission: number;
  timeToSale: string;
  marketReach: 'Local' | 'Regional' | 'National' | 'International';
  advantages: string[];
  agentRequired: boolean;
  aiInsights?: string[];
}

interface TokenizationData {
  lotId: string;
  tokenId: string;
  commodity: string;
  quantity: number;
  quality: string;
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

const mockStorageFacilities: StorageFacility[] = [
  {
    id: 'fac1',
    name: 'Agri-Cool Cold Storage',
    type: 'cold_storage',
    location: 'Ludhiana, Punjab',
    distance: 15,
    capacity: 1000,
    availableSpace: 450,
    services: ['Temperature Control', '24/7 Security', 'Pest Control', 'Quality Monitoring'],
    temperatureControl: true,
    temperatureRange: '2°C to 8°C',
    security: ['CCTV', 'Armed Guards', 'Access Control'],
    compliance: {
      status: 'compliant',
      certifications: ['WDRA', 'FSSAI', 'ISO 9001'],
      lastUpdated: new Date(),
      alerts: []
    },
    rent: {
      amount: 750,
      unit: 'per quintal/month',
      negotiable: true,
      discount: 10
    },
    rating: 4.8,
    reviews: 234,
    advantages: ['Temperature controlled', 'Near highway', 'Bulk discounts'],
    agentAvailable: true
  },
  {
    id: 'fac2',
    name: 'Green Valley Warehouse',
    type: 'warehouse',
    location: 'Jalandhar, Punjab',
    distance: 8,
    capacity: 2000,
    availableSpace: 890,
    services: ['Security', 'Pest Control', 'Loading Equipment'],
    temperatureControl: false,
    security: ['CCTV', 'Night Watchman'],
    compliance: {
      status: 'compliant',
      certifications: ['WDRA', 'Fire Safety'],
      lastUpdated: new Date(),
      alerts: []
    },
    rent: {
      amount: 450,
      unit: 'per quintal/month',
      negotiable: true
    },
    rating: 4.5,
    reviews: 178,
    advantages: ['Large capacity', 'Low rates', 'Flexible terms'],
    agentAvailable: true
  },
  {
    id: 'fac3',
    name: 'FarmFresh Open Storage',
    type: 'open_storage',
    location: 'Patiala, Punjab',
    distance: 22,
    capacity: 500,
    availableSpace: 320,
    services: ['Security', 'Tarpaulin Cover'],
    temperatureControl: false,
    security: ['Fencing', 'Guard'],
    compliance: {
      status: 'warning',
      certifications: ['Basic Registration'],
      lastUpdated: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      alerts: ['Fire safety certification pending renewal']
    },
    rent: {
      amount: 180,
      unit: 'per quintal/month',
      negotiable: true,
      discount: 15
    },
    rating: 4.2,
    reviews: 89,
    advantages: ['Very affordable', 'Quick access', 'Weather protected'],
    agentAvailable: false
  }
];

const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Harpreet Singh',
    specialization: 'Cold Storage & Warehouse Specialist',
    experience: 8,
    languages: ['Punjabi', 'Hindi', 'English'],
    certifications: ['WDRA Certified', 'Cold Chain Management', 'Food Safety'],
    availability: 'Available',
    rating: 4.9,
    successRate: 94,
    responseTime: '15 mins',
    clientsServed: 234,
    aiScore: 95,
    contact: {
      phone: '+91-98765-43210',
      email: 'harpreet@tradieagents.com',
      whatsapp: '+91-98765-43210'
    }
  },
  {
    id: 'agent-2',
    name: 'Meena Patel',
    specialization: 'Commission Sales & Market Expert',
    experience: 6,
    languages: ['Gujarati', 'Hindi', 'English'],
    certifications: ['APMC Licensed', 'Agricultural Marketing', 'Quality Grading'],
    availability: 'Available',
    rating: 4.7,
    successRate: 91,
    responseTime: '30 mins',
    clientsServed: 189,
    aiScore: 88,
    commission: 2.5,
    contact: {
      phone: '+91-98765-54321',
      email: 'meena@tradieagents.com',
      whatsapp: '+91-98765-54321'
    }
  },
  {
    id: 'agent-3',
    name: 'Rajesh Kumar',
    specialization: 'Online Marketplace & Export Specialist',
    experience: 10,
    languages: ['Hindi', 'English', 'Bengali'],
    certifications: ['Export License', 'Digital Marketing', 'E-commerce'],
    availability: 'Busy',
    rating: 4.8,
    successRate: 92,
    responseTime: '20 mins',
    clientsServed: 312,
    aiScore: 82,
    commission: 3.0,
    contact: {
      phone: '+91-98765-99999',
      email: 'rajesh@tradieagents.com',
      whatsapp: '+91-98765-99999'
    }
  }
];

const mockSellingMethods: SellingMethod[] = [
  {
    id: 'direct',
    name: 'Direct Sale at Production Site',
    description: 'Sell directly to buyers who visit your farm/warehouse',
    icon: Home,
    commission: 0,
    timeToSale: '1-3 days',
    marketReach: 'Local',
    advantages: ['No commission', 'Instant payment', 'Full control'],
    agentRequired: false,
    aiInsights: ['Best for small quantities', 'High local demand detected', 'Price premium possible']
  },
  {
    id: 'commission',
    name: 'Market Yard via Commission Agent',
    description: 'Professional agent handles sale at mandi/market yard',
    icon: Users,
    commission: 2.5,
    timeToSale: '2-5 days',
    marketReach: 'Regional',
    advantages: ['Wide buyer network', 'Professional negotiation', 'Market insights'],
    agentRequired: true,
    aiInsights: ['AI recommends: Meena Patel (2.5% commission)', 'Current mandi price: ₹2,340/quintal', 'Expected premium: 5-8%']
  },
  {
    id: 'online',
    name: 'Online Marketplace Listing',
    description: 'List on TRADIE platform for national/international buyers',
    icon: Globe,
    commission: 3.0,
    timeToSale: '3-10 days',
    marketReach: 'National',
    advantages: ['Maximum visibility', 'Best price discovery', 'Buyer competition'],
    agentRequired: false,
    aiInsights: ['1,247 active wheat buyers online', 'Avg price 8% higher than mandi', 'Peak buying hours: 10 AM - 2 PM']
  },
  {
    id: 'contract',
    name: 'Contract Farming / Forward Sale',
    description: 'Pre-arranged sale with guaranteed price and buyer',
    icon: FileCheck,
    commission: 1.5,
    timeToSale: 'Pre-arranged',
    marketReach: 'National',
    advantages: ['Price certainty', 'Guaranteed buyer', 'Lower risk'],
    agentRequired: true,
    aiInsights: ['3 contract opportunities available', 'Price lock: ₹2,450/quintal', 'Delivery: 30-60 days']
  }
];

// ==================== MAIN COMPONENT ====================

const UnifiedStorageSellPackagingDashboard: React.FC = () => {
  // Navigation & Progress State
  const [activeTab, setActiveTab] = useState<string>('tokenization');
  const [workflowStep, setWorkflowStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Storage State
  const [selectedStorageType, setSelectedStorageType] = useState<string>('');
  const [selectedFacility, setSelectedFacility] = useState<string>('');
  const [storageSearchQuery, setStorageSearchQuery] = useState<string>('');
  const [storageFilters, setStorageFilters] = useState({
    location: '',
    priceRange: '',
    compliance: '',
    services: ''
  });

  // Packing State
  const [selectedPackaging, setSelectedPackaging] = useState<string[]>([]);

  // Selling State
  const [selectedSellingMethod, setSelectedSellingMethod] = useState<string>('');
  const [selectedSalesAgent, setSelectedSalesAgent] = useState<string>('');

  // Agent Dialog State
  const [agentDialogOpen, setAgentDialogOpen] = useState<boolean>(false);
  const [agentContext, setAgentContext] = useState<'storage' | 'sales'>('storage');
  const [selectedAgent, setSelectedAgent] = useState<string>('');

  // AI Notifications
  const [aiNotifications, setAiNotifications] = useState<any[]>([
    {
      id: 'notif1',
      type: 'price_alert',
      severity: 'warning',
      title: 'Price Anomaly Detected',
      message: 'Cold storage prices 15% above regional average',
      action: 'Review alternatives'
    },
    {
      id: 'notif2',
      type: 'opportunity',
      severity: 'success',
      title: 'Market Opportunity',
      message: 'Wheat demand increasing 8-12% this week',
      action: 'List on marketplace'
    },
    {
      id: 'notif3',
      type: 'compliance',
      severity: 'info',
      title: 'Regulatory Update',
      message: 'New FSSAI guidelines effective Nov 1',
      action: 'Review requirements'
    }
  ]);

  // Progress Calculation
  const calculateProgress = () => {
    const steps = ['tokenization', 'storage', 'packing', 'selling'];
    const completed = completedSteps.length;
    return (completed / steps.length) * 100;
  };

  // Mark Step Complete
  const markStepComplete = (step: string) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  // Agent Assignment Functions
  const openAgentDialog = (context: 'storage' | 'sales') => {
    setAgentContext(context);
    setAgentDialogOpen(true);
  };

  const assignAgent = (agentId: string) => {
    setSelectedAgent(agentId);
    if (agentContext === 'sales') {
      setSelectedSalesAgent(agentId);
    }
    setAgentDialogOpen(false);
    alert(`Agent assigned successfully!`);
  };

  // Get filtered agents based on context
  const getRelevantAgents = () => {
    if (agentContext === 'storage') {
      return mockAgents.filter(a => 
        a.specialization.includes('Storage') || 
        a.specialization.includes('Warehouse')
      );
    } else {
      return mockAgents.filter(a => 
        a.specialization.includes('Sales') || 
        a.specialization.includes('Market') ||
        a.specialization.includes('Commission')
      );
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen p-4 md:p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* ==================== HEADER ==================== */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Playfair Display', color: '#003E6D' }}>
                Storage & Sell Dashboard
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1" style={{ fontFamily: 'Lato' }}>
                Complete workflow: Tokenization → Storage → Packing → Selling
              </p>
            </div>

            {/* AI Notifications Badge */}
            <div className="relative">
              <Button variant="outline" className="gap-2">
                <Bell className="w-4 h-4" />
                AI Alerts
                {aiNotifications.length > 0 && (
                  <Badge className="bg-red-500 text-white ml-1">{aiNotifications.length}</Badge>
                )}
              </Button>
            </div>
          </div>

          {/* ==================== PROGRESS INDICATOR ==================== */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Workflow Progress</h3>
              <Badge className="bg-blue-600 text-white">
                {completedSteps.length}/4 Steps Complete
              </Badge>
            </div>
            
            <Progress value={calculateProgress()} className="h-3 mb-4" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'tokenization', label: 'Tokenization', icon: BadgeCheck },
                { id: 'storage', label: 'Storage', icon: Warehouse },
                { id: 'packing', label: 'Packing', icon: Package },
                { id: 'selling', label: 'Selling', icon: TrendingUp }
              ].map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg border-2 transition-all",
                    completedSteps.includes(step.id) 
                      ? "bg-green-50 border-green-500" 
                      : activeTab === step.id
                      ? "bg-blue-50 border-blue-500"
                      : "bg-white border-gray-200"
                  )}
                >
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <step.icon className={cn(
                      "w-5 h-5",
                      activeTab === step.id ? "text-blue-600" : "text-gray-400"
                    )} />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{step.label}</p>
                    <p className="text-xs text-gray-600">Step {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* ==================== AI NOTIFICATIONS PANEL ==================== */}
          {aiNotifications.length > 0 && (
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                🤖 AI Insights & Alerts
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-full",
                        notif.severity === 'warning' ? "bg-red-500" :
                        notif.severity === 'success' ? "bg-green-500" :
                        "bg-blue-500"
                      )}>
                        {notif.severity === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                         notif.severity === 'success' ? <TrendingUp className="w-5 h-5" /> :
                         <Info className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold mb-1">{notif.title}</p>
                        <p className="text-sm text-blue-100 mb-2">{notif.message}</p>
                        <p className="text-xs bg-white/20 rounded px-2 py-1 inline-block">
                          → {notif.action}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ==================== MAIN TABS ==================== */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="tokenization" className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4" />
                <span className="hidden md:inline">Tokenization</span>
                <span className="md:hidden">Token</span>
              </TabsTrigger>
              <TabsTrigger value="storage" className="flex items-center gap-2">
                <Warehouse className="w-4 h-4" />
                <span className="hidden md:inline">Storage</span>
                <span className="md:hidden">Store</span>
              </TabsTrigger>
              <TabsTrigger value="packing" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span className="hidden md:inline">Packing</span>
                <span className="md:hidden">Pack</span>
              </TabsTrigger>
              <TabsTrigger value="selling" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden md:inline">Selling</span>
                <span className="md:hidden">Sell</span>
              </TabsTrigger>
            </TabsList>

            {/* ==================== TAB 1: TOKENIZATION ==================== */}
            <TabsContent value="tokenization" className="space-y-6 mt-6">
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500 text-white p-3 rounded-full">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-green-800 mb-2">
                      🎉 Congratulations! Your lot has been successfully tokenized
                    </h3>
                    
                    <div className="bg-white rounded-lg p-4 space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Lot ID:</span>
                        <span className="font-semibold text-gray-900">{mockTokenization.lotId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Token ID:</span>
                        <span className="font-semibold text-gray-900">{mockTokenization.tokenId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Commodity:</span>
                        <span className="font-semibold text-gray-900">{mockTokenization.commodity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-semibold text-gray-900">{mockTokenization.quantity} quintals</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Quality:</span>
                        <Badge className="bg-green-100 text-green-800">{mockTokenization.quality}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-green-700 mb-4">
                      💡 <strong>What's next?</strong> Choose your preferred path: Store your commodity safely or proceed to sell immediately.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button
                        size="lg"
                        onClick={() => {
                          setActiveTab('storage');
                          markStepComplete('tokenization');
                        }}
                        className="bg-blue-600 hover:bg-blue-700 w-full"
                      >
                        <Warehouse className="w-5 h-5 mr-2" />
                        Proceed to Storage Options
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button
                        size="lg"
                        onClick={() => {
                          setActiveTab('selling');
                          markStepComplete('tokenization');
                        }}
                        className="bg-green-600 hover:bg-green-700 w-full"
                      >
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Proceed to Sell
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Quality Verified</h4>
                      <p className="text-sm text-gray-600">AI quality check completed</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-l-4 border-green-500">
                  <div className="flex items-start gap-3">
                    <Lock className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Blockchain Secured</h4>
                      <p className="text-sm text-gray-600">Immutable record created</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border-l-4 border-purple-500">
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-purple-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Market Ready</h4>
                      <p className="text-sm text-gray-600">Ready for trading</p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* ==================== TAB 2: STORAGE ==================== */}
            <TabsContent value="storage" className="space-y-6 mt-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold" style={{ color: '#003E6D' }}>
                      Select Storage Type
                    </h2>
                    <p className="text-gray-600 mt-1">Choose the facility that best suits your commodity needs</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAgentDialog('storage')}
                    className="gap-2"
                  >
                    <Headphones className="w-4 h-4" />
                    Get Expert Help
                  </Button>
                </div>

                {/* Storage Type Icons */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                  {[
                    { id: 'warehouse', icon: Warehouse, label: 'Warehouse', color: 'blue' },
                    { id: 'cold_storage', icon: Snowflake, label: 'Cold Storage', color: 'cyan' },
                    { id: 'open_storage', icon: Sun, label: 'Open Storage', color: 'yellow' },
                    { id: 'farm_storage', icon: Sprout, label: 'Farm Storage', color: 'green' },
                    { id: 'silo', icon: Database, label: 'Silo', color: 'purple' }
                  ].map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setSelectedStorageType(type.id)}
                      className={cn(
                        "cursor-pointer rounded-lg p-4 border-2 transition-all hover:shadow-lg",
                        selectedStorageType === type.id
                          ? `bg-${type.color}-50 border-${type.color}-500`
                          : "bg-white border-gray-200 hover:border-blue-300"
                      )}
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className={cn(
                          "p-3 rounded-full",
                          selectedStorageType === type.id ? `bg-${type.color}-100` : "bg-gray-100"
                        )}>
                          <type.icon className={cn(
                            "w-6 h-6",
                            selectedStorageType === type.id ? `text-${type.color}-600` : "text-gray-600"
                          )} />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{type.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Search and Filters */}
                {selectedStorageType && (
                  <>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          placeholder="Search facilities..."
                          value={storageSearchQuery}
                          onChange={(e) => setStorageSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filters
                      </Button>
                    </div>

                    {/* Facilities List */}
                    <div className="space-y-4">
                      {mockStorageFacilities
                        .filter(f => selectedStorageType === '' || f.type === selectedStorageType)
                        .map((facility) => (
                        <Card key={facility.id} className="p-6 hover:shadow-lg transition-all border-2 hover:border-blue-300">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-900">{facility.name}</h3>
                                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                    <MapPin className="w-4 h-4" />
                                    {facility.location} • {facility.distance} km away
                                  </p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-semibold">{facility.rating}</span>
                                  <span className="text-sm text-gray-500">({facility.reviews})</span>
                                </div>
                              </div>

                              {/* Services */}
                              <div className="mb-3">
                                <p className="text-sm text-gray-600 mb-2">Services:</p>
                                <div className="flex flex-wrap gap-2">
                                  {facility.services.map((service) => (
                                    <Badge key={service} variant="outline" className="text-xs">
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Compliance */}
                              <div className="flex items-center gap-2 mb-3">
                                <Badge className={cn(
                                  facility.compliance.status === 'compliant' ? 'bg-green-100 text-green-800' :
                                  facility.compliance.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                )}>
                                  {facility.compliance.status === 'compliant' ? <CheckCircle className="w-3 h-3 mr-1" /> :
                                   <AlertTriangle className="w-3 h-3 mr-1" />}
                                  {facility.compliance.status.toUpperCase()}
                                </Badge>
                                <div className="flex flex-wrap gap-1">
                                  {facility.compliance.certifications.map((cert) => (
                                    <Badge key={cert} variant="outline" className="text-xs">
                                      {cert}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Pricing */}
                              <div className="bg-blue-50 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm text-gray-600">Rental Price:</p>
                                    <p className="text-xl font-bold text-blue-600">
                                      ₹{facility.rent.amount}
                                      <span className="text-sm font-normal text-gray-600">/{facility.rent.unit}</span>
                                    </p>
                                  </div>
                                  {facility.rent.negotiable && (
                                    <Badge className="bg-green-100 text-green-800">
                                      Negotiable
                                    </Badge>
                                  )}
                                  {facility.rent.discount && (
                                    <Badge className="bg-red-100 text-red-800">
                                      {facility.rent.discount}% Discount
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 md:w-48">
                              <Button
                                className="bg-blue-600 hover:bg-blue-700 w-full"
                                onClick={() => {
                                  setSelectedFacility(facility.id);
                                  markStepComplete('storage');
                                  setActiveTab('packing');
                                }}
                              >
                                Select Facility
                              </Button>
                              {facility.agentAvailable && (
                                <Button
                                  variant="outline"
                                  className="w-full gap-2"
                                  onClick={() => openAgentDialog('storage')}
                                >
                                  <Headphones className="w-4 h-4" />
                                  Assign Agent
                                </Button>
                              )}
                              <Button variant="outline" className="w-full gap-2">
                                <Info className="w-4 h-4" />
                                Details
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </Card>
            </TabsContent>

            {/* ==================== TAB 3: PACKING ==================== */}
            <TabsContent value="packing" className="space-y-6 mt-6">
              <ComprehensivePackagingSelector 
                commodity={mockTokenization.commodity.split('(')[0].trim()}
              />

              {/* Continue Button */}
              <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Ready to Continue?</h3>
                    <p className="text-sm text-gray-600">Proceed to selling options once packaging is confirmed</p>
                  </div>
                  <Button
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => {
                      markStepComplete('packing');
                      setActiveTab('selling');
                    }}
                  >
                    Continue to Selling
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* ==================== TAB 4: SELLING ==================== */}
            <TabsContent value="selling" className="space-y-6 mt-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold" style={{ color: '#003E6D' }}>
                      Choose Your Selling Method
                    </h2>
                    <p className="text-gray-600 mt-1">Select the best sales channel for your commodity</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAgentDialog('sales')}
                    className="gap-2"
                  >
                    <Headphones className="w-4 h-4" />
                    Sales Expert Help
                  </Button>
                </div>

                {/* Selling Methods */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockSellingMethods.map((method) => (
                    <Card
                      key={method.id}
                      className={cn(
                        "p-6 cursor-pointer border-2 transition-all hover:shadow-lg",
                        selectedSellingMethod === method.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-blue-300"
                      )}
                      onClick={() => setSelectedSellingMethod(method.id)}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={cn(
                          "p-3 rounded-lg",
                          selectedSellingMethod === method.id ? "bg-green-100" : "bg-gray-100"
                        )}>
                          <method.icon className={cn(
                            "w-6 h-6",
                            selectedSellingMethod === method.id ? "text-green-600" : "text-gray-600"
                          )} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                        {selectedSellingMethod === method.id && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                      </div>

                      {/* Method Details */}
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Commission:</span>
                          <span className="font-semibold">
                            {method.commission}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Time to Sale:</span>
                          <span className="font-semibold">{method.timeToSale}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Market Reach:</span>
                          <Badge variant="outline">{method.marketReach}</Badge>
                        </div>
                      </div>

                      {/* Advantages */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Advantages:</p>
                        <div className="space-y-1">
                          {method.advantages.map((adv, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{adv}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AI Insights */}
                      {method.aiInsights && method.aiInsights.length > 0 && (
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <p className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            AI Insights:
                          </p>
                          <div className="space-y-1">
                            {method.aiInsights.map((insight, idx) => (
                              <p key={idx} className="text-xs text-blue-800">• {insight}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Agent Required */}
                      {method.agentRequired && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3 gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            openAgentDialog('sales');
                          }}
                        >
                          <Users className="w-4 h-4" />
                          Assign Sales Agent
                        </Button>
                      )}

                      {/* Select Button */}
                      {selectedSellingMethod === method.id && (
                        <Button
                          size="lg"
                          className="w-full mt-3 bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            markStepComplete('selling');
                            alert('Proceeding to ' + method.name);
                          }}
                        >
                          Proceed with {method.name}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Summary Card */}
              {completedSteps.length === 4 && (
                <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500 text-white p-3 rounded-full">
                      <Award className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-green-800 mb-2">
                        🎉 Workflow Complete!
                      </h3>
                      <p className="text-green-700 mb-4">
                        You've successfully completed all steps. Your commodity is tokenized, storage arranged, packing selected, and selling method chosen!
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-600">Token ID</p>
                          <p className="font-semibold text-sm">{mockTokenization.tokenId}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-600">Storage</p>
                          <p className="font-semibold text-sm">
                            {selectedFacility ? 'Selected' : 'Pending'}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-600">Packing</p>
                          <p className="font-semibold text-sm">
                            {selectedPackaging.length} types
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-600">Selling</p>
                          <p className="font-semibold text-sm">
                            {selectedSellingMethod ? 'Selected' : 'Pending'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* ==================== AGENT ASSIGNMENT DIALOG ==================== */}
        <Dialog open={agentDialogOpen} onOpenChange={setAgentDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                Assign {agentContext === 'storage' ? 'Storage' : 'Sales'} Expert
              </DialogTitle>
              <DialogDescription>
                Get personalized assistance from certified professionals
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {getRelevantAgents().map((agent) => (
                <Card key={agent.id} className="p-6 border-2 hover:border-blue-500 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-4 rounded-full">
                      <User className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-blue-900">{agent.name}</h3>
                          <p className="text-gray-600">{agent.specialization}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            ⭐ AI Score: {agent.aiScore}/100
                          </div>
                          <div className={cn(
                            "px-3 py-1 rounded-full text-sm font-semibold",
                            agent.availability === 'Available' ? "bg-green-100 text-green-800" :
                            agent.availability === 'Busy' ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100 text-gray-800"
                          )}>
                            {agent.availability}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Experience</p>
                          <p className="font-semibold">{agent.experience} years</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Success Rate</p>
                          <p className="font-semibold">{agent.successRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Response Time</p>
                          <p className="font-semibold">{agent.responseTime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Clients</p>
                          <p className="font-semibold">{agent.clientsServed}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Languages:</p>
                        <div className="flex flex-wrap gap-2">
                          {agent.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="text-xs">
                              🗣️ {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Certifications:</p>
                        <div className="flex flex-wrap gap-2">
                          {agent.certifications.map((cert) => (
                            <Badge key={cert} className="bg-blue-50 text-blue-700 text-xs">
                              🎖️ {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 mb-4">
                        <Button size="sm" variant="outline" className="gap-2">
                          <Phone className="w-4 h-4" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Chat
                        </Button>
                      </div>

                      <Button
                        onClick={() => assignAgent(agent.id)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg"
                      >
                        ✅ Assign {agent.name}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default UnifiedStorageSellPackagingDashboard;
