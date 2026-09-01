import React, { useState, useEffect, useId } from 'react';
import {
  Warehouse,
  Snowflake,
  Sun,
  Sprout,
  Database,
  Building2,
  Search,
  Filter,
  MapPin,
  Shield,
  Clock,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Package,
  Users,
  Truck,
  Store,
  ShoppingCart,
  UserCheck,
  Sparkles,
  Bell,
  Settings,
  Info,
  Star,
  Award,
  Zap,
  ThermometerSun,
  Lock,
  FileCheck,
  BadgeCheck,
  TrendingDown,
  ArrowRight,
  Calendar,
  Phone,
  Mail,
  UserPlus,
  Headphones,
  MessageCircle,
  X,
  Heart,
  BookmarkPlus,
  Download,
  Share2,
  QrCode,
  FileText,
  BarChart3,
  CloudRain,
  Cloud,
  CloudSnow,
  Layers,
  Compare,
  Calculator,
  Navigation,
  XCircle,
  Plus,
  Minus,
  RefreshCw,
  User,
  Handshake,
  Globe,
  Lightbulb,
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
import { cn } from '../ui/utils';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../ui/tooltip';

// ==================== NEW FEATURES ====================

// 1. REAL-TIME MARKET PRICE TRACKER
interface MarketPrice {
  id: string;
  commodity: string;
  mandi: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
}

// 2. WEATHER INTEGRATION
interface WeatherData {
  location: string;
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  humidity: number;
  forecast: {
    day: string;
    temp: number;
    condition: string;
  }[];
  storageImpact: 'favorable' | 'moderate' | 'unfavorable';
  recommendations: string[];
}

// 3. CONTRACT TEMPLATES
interface Contract {
  id: string;
  type: 'storage' | 'sales' | 'commission';
  facilityName?: string;
  agentName?: string;
  duration: number;
  amount: number;
  terms: string[];
  generatedDate: Date;
}

// 4. MULTI-LOT MANAGEMENT
interface Lot {
  id: string;
  commodity: string;
  quantity: number;
  quality: string;
  tokenId: string;
  status: 'active' | 'stored' | 'sold';
}

// 5. FAVORITES/BOOKMARKS
interface Favorite {
  id: string;
  type: 'facility' | 'agent';
  itemId: string;
  name: string;
  savedDate: Date;
}

// 6. COMPARISON DATA
interface ComparisonItem {
  id: string;
  name: string;
  type: string;
  rent?: number;
  rating: number;
  services: string[];
  distance: number;
}

// Storage Agent Interface
interface StorageAgent {
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
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
  };
}

const StorageAndSellDashboardEnhanced: React.FC = () => {
  const uid = useId().replace(/:/g, "");
  const priceGradId = `colorPrice_${uid}`;

  // Existing State
  const [activeTab, setActiveTab] = useState<string>('storage');
  const [selectedStorageType, setSelectedStorageType] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('');
  const [complianceFilter, setComplianceFilter] = useState<string>('');
  const [servicesFilter, setServicesFilter] = useState<string>('');
  
  // NEW Feature States
  const [showMarketPrices, setShowMarketPrices] = useState<boolean>(true);
  const [showWeather, setShowWeather] = useState<boolean>(true);
  const [selectedLots, setSelectedLots] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [comparisonList, setComparisonList] = useState<ComparisonItem[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);
  const [showContractGenerator, setShowContractGenerator] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [agentDialogOpen, setAgentDialogOpen] = useState<boolean>(false);
  const [assignmentContext, setAssignmentContext] = useState<'storage' | 'sales'>('storage');

  // ==================== MOCK DATA ====================

  // Market Prices Data
  const mockMarketPrices: MarketPrice[] = [
    {
      id: 'mp1',
      commodity: 'Wheat',
      mandi: 'Ludhiana',
      price: 2340,
      change: 60,
      changePercent: 2.6,
      lastUpdated: new Date(),
      trend: 'up'
    },
    {
      id: 'mp2',
      commodity: 'Wheat',
      mandi: 'Khanna',
      price: 2310,
      change: 40,
      changePercent: 1.8,
      lastUpdated: new Date(),
      trend: 'up'
    },
    {
      id: 'mp3',
      commodity: 'Rice',
      mandi: 'Amritsar',
      price: 3450,
      change: -25,
      changePercent: -0.7,
      lastUpdated: new Date(),
      trend: 'down'
    },
  ];

  // Weather Data
  const mockWeather: WeatherData = {
    location: 'Ludhiana, Punjab',
    temperature: 28,
    condition: 'sunny',
    humidity: 65,
    forecast: [
      { day: 'Today', temp: 28, condition: 'Sunny' },
      { day: 'Tomorrow', temp: 30, condition: 'Partly Cloudy' },
      { day: 'Day 3', temp: 27, condition: 'Cloudy' },
      { day: 'Day 4', temp: 26, condition: 'Light Rain' },
      { day: 'Day 5', temp: 25, condition: 'Rainy' },
    ],
    storageImpact: 'favorable',
    recommendations: [
      'Current conditions ideal for open storage',
      'Low humidity - good for grain quality',
      'Rain expected in 3 days - secure storage recommended'
    ]
  };

  // Price Trend Data for Charts
  const priceTrendData = [
    { date: 'Oct 15', price: 2180, mandi: 'Ludhiana' },
    { date: 'Oct 16', price: 2200, mandi: 'Ludhiana' },
    { date: 'Oct 17', price: 2220, mandi: 'Ludhiana' },
    { date: 'Oct 18', price: 2250, mandi: 'Ludhiana' },
    { date: 'Oct 19', price: 2280, mandi: 'Ludhiana' },
    { date: 'Oct 20', price: 2300, mandi: 'Ludhiana' },
    { date: 'Oct 21', price: 2320, mandi: 'Ludhiana' },
    { date: 'Oct 22', price: 2310, mandi: 'Ludhiana' },
    { date: 'Oct 23', price: 2340, mandi: 'Ludhiana' },
  ];

  // Multi-Lot Data
  const mockLots: Lot[] = [
    { id: 'lot1', commodity: 'Wheat', quantity: 50, quality: 'Grade A', tokenId: 'TKN-45A3B9C', status: 'active' },
    { id: 'lot2', commodity: 'Wheat', quantity: 30, quality: 'Grade A', tokenId: 'TKN-78X9Y2Z', status: 'active' },
    { id: 'lot3', commodity: 'Rice', quantity: 40, quality: 'Grade B', tokenId: 'TKN-12M3N4P', status: 'stored' },
  ];

  // Mock Agents
  const mockAgents: StorageAgent[] = [
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
      specialization: 'Farm Storage & Silo Management Expert',
      experience: 6,
      languages: ['Gujarati', 'Hindi', 'English'],
      certifications: ['Agricultural Storage', 'Quality Management', 'APMC Licensed'],
      availability: 'Busy',
      rating: 4.7,
      successRate: 91,
      responseTime: '30 mins',
      clientsServed: 189,
      aiScore: 88,
      contact: {
        phone: '+91-98765-54321',
        email: 'meena@tradieagents.com',
        whatsapp: '+91-98765-54321'
      }
    },
    {
      id: 'agent-3',
      name: 'Rajesh Kumar',
      specialization: 'Open Storage & Warehouse Specialist',
      experience: 10,
      languages: ['Hindi', 'English', 'Bengali'],
      certifications: ['Warehouse Management', 'Logistics', 'ISO Certified'],
      availability: 'Available',
      rating: 4.8,
      successRate: 92,
      responseTime: '20 mins',
      clientsServed: 312,
      aiScore: 82,
      contact: {
        phone: '+91-98765-99999',
        email: 'rajesh@tradieagents.com',
        whatsapp: '+91-98765-99999'
      }
    }
  ];

  // ==================== NEW FEATURE FUNCTIONS ====================

  // 1. Add to Favorites
  const addToFavorites = (type: 'facility' | 'agent', itemId: string, name: string) => {
    const newFavorite: Favorite = {
      id: `fav-${Date.now()}`,
      type,
      itemId,
      name,
      savedDate: new Date()
    };
    setFavorites([...favorites, newFavorite]);
  };

  const removeFromFavorites = (favoriteId: string) => {
    setFavorites(favorites.filter(f => f.id !== favoriteId));
  };

  const isFavorite = (itemId: string): boolean => {
    return favorites.some(f => f.itemId === itemId);
  };

  // 2. Add to Comparison
  const addToComparison = (item: ComparisonItem) => {
    if (comparisonList.length < 4) {
      setComparisonList([...comparisonList, item]);
    }
  };

  const removeFromComparison = (itemId: string) => {
    setComparisonList(comparisonList.filter(c => c.id !== itemId));
  };

  const isInComparison = (itemId: string): boolean => {
    return comparisonList.some(c => c.id === itemId);
  };

  // 3. Toggle Lot Selection
  const toggleLotSelection = (lotId: string) => {
    if (selectedLots.includes(lotId)) {
      setSelectedLots(selectedLots.filter(id => id !== lotId));
    } else {
      setSelectedLots([...selectedLots, lotId]);
    }
  };

  // 4. Export Functions
  const exportToPDF = () => {
    // In real implementation, use jsPDF or similar
    alert('Exporting to PDF... (Feature demo)');
  };

  const exportToExcel = () => {
    // In real implementation, use xlsx or similar
    alert('Exporting to Excel... (Feature demo)');
  };

  const generateQRCode = () => {
    alert('Generating QR Code for mobile access... (Feature demo)');
  };

  // 5. Contract Generator
  const generateContract = (type: 'storage' | 'sales', details: any) => {
    const contract: Contract = {
      id: `contract-${Date.now()}`,
      type,
      facilityName: details.facilityName,
      agentName: details.agentName,
      duration: details.duration || 30,
      amount: details.amount,
      terms: [
        'Rental period starts from date of agreement',
        'Monthly rent payable in advance',
        'Facility responsible for quality maintenance',
        'Insurance coverage included',
        'Early termination penalty: 10% of remaining contract value'
      ],
      generatedDate: new Date()
    };
    
    // In real implementation, generate PDF/document
    console.log('Generated Contract:', contract);
    alert(`Contract generated for ${details.facilityName || details.agentName}`);
  };

  // 6. Weather Icon Helper
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="w-6 h-6 text-gray-400" />;
      case 'rainy':
      case 'light rain':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      default:
        return <Sun className="w-6 h-6" />;
    }
  };

  // Agent Dialog Functions
  const openAgentDialog = (context: 'storage' | 'sales') => {
    setAssignmentContext(context);
    setAgentDialogOpen(true);
  };

  const assignAgent = (agent: StorageAgent) => {
    alert(`Agent ${agent.name} assigned successfully!`);
    setAgentDialogOpen(false);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* ==================== HEADER WITH NEW FEATURES ==================== */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display', color: '#003E6D' }}>
                Storage & Sell Dashboard
              </h1>
              <p className="text-gray-600 mt-1" style={{ fontFamily: 'Lato' }}>
                Enhanced with AI-powered insights and smart tools
              </p>
            </div>
            
            {/* NEW: Quick Actions */}
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMarketPrices(!showMarketPrices)}
                    className="gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    {showMarketPrices ? 'Hide' : 'Show'} Prices
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle market price tracker</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowWeather(!showWeather)}
                    className="gap-2"
                  >
                    <CloudRain className="w-4 h-4" />
                    {showWeather ? 'Hide' : 'Show'} Weather
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle weather forecast</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowExportModal(true)}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Export data to PDF/Excel</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowComparisonModal(true)}
                    className="gap-2"
                    disabled={comparisonList.length === 0}
                  >
                    <Compare className="w-4 h-4" />
                    Compare ({comparisonList.length})
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {comparisonList.length === 0 ? 'Add items to compare' : 'View comparison'}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* ==================== NEW FEATURE 1: MARKET PRICE TRACKER ==================== */}
          {showMarketPrices && (
            <Card className="p-6 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: '#003E6D' }}>
                  <BarChart3 className="w-5 h-5" />
                  📊 Real-Time Market Prices
                </h2>
                <Badge className="bg-green-500 text-white">
                  <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                  Live
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {mockMarketPrices.map((price) => (
                  <div
                    key={price.id}
                    className="bg-white rounded-lg p-4 border-2 hover:border-blue-500 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{price.commodity}</h3>
                        <p className="text-sm text-gray-600">{price.mandi} Mandi</p>
                      </div>
                      {price.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-2xl font-bold" style={{ color: '#003E6D' }}>
                        ₹{price.price}
                        <span className="text-sm font-normal text-gray-600">/quintal</span>
                      </div>
                      <div className={cn(
                        "text-sm font-medium mt-1",
                        price.change > 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {price.change > 0 ? '+' : ''}{price.change} ({price.changePercent > 0 ? '+' : ''}{price.changePercent}%)
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Updated {price.lastUpdated.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Trend Chart */}
              <div className="bg-white rounded-lg p-4 border">
                <h3 className="font-semibold text-gray-900 mb-4">7-Day Price Trend (Wheat - Ludhiana)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={priceTrendData}>
                    <defs>
                      <linearGradient id={priceGradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2F80ED" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2F80ED" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" style={{ fontSize: '12px' }} />
                    <YAxis style={{ fontSize: '12px' }} />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="price" stroke="#2F80ED" fillOpacity={1} fill={`url(#${priceGradId})`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          {/* ==================== NEW FEATURE 2: WEATHER INTEGRATION ==================== */}
          {showWeather && (
            <Card className="p-6 border-2" style={{ borderColor: '#FFD700' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: '#003E6D' }}>
                  <CloudRain className="w-5 h-5" />
                  🌤️ Weather Forecast & Storage Impact
                </h2>
                <Badge className={cn(
                  "text-white",
                  mockWeather.storageImpact === 'favorable' ? 'bg-green-500' :
                  mockWeather.storageImpact === 'moderate' ? 'bg-yellow-500' :
                  'bg-red-500'
                )}>
                  {mockWeather.storageImpact.charAt(0).toUpperCase() + mockWeather.storageImpact.slice(1)} Conditions
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Weather */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border-2 border-blue-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">📍 {mockWeather.location}</p>
                      <div className="flex items-center gap-3">
                        <div className="text-4xl font-bold" style={{ color: '#003E6D' }}>
                          {mockWeather.temperature}°C
                        </div>
                        {getWeatherIcon(mockWeather.condition)}
                      </div>
                      <p className="text-sm text-gray-700 mt-2 capitalize">{mockWeather.condition}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Humidity</span>
                      <span className="font-semibold">{mockWeather.humidity}%</span>
                    </div>
                  </div>
                </div>

                {/* 5-Day Forecast */}
                <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">5-Day Forecast</h3>
                  <div className="space-y-2">
                    {mockWeather.forecast.map((day, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <span className="text-sm font-medium text-gray-700 w-24">{day.day}</span>
                        <div className="flex items-center gap-2 flex-1">
                          {getWeatherIcon(day.condition)}
                          <span className="text-xs text-gray-600">{day.condition}</span>
                        </div>
                        <span className="text-sm font-semibold" style={{ color: '#003E6D' }}>{day.temp}°C</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weather Recommendations */}
              <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  💡 AI Recommendations Based on Weather
                </h3>
                <ul className="space-y-1">
                  {mockWeather.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-yellow-800 flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )}

          {/* ==================== NEW FEATURE 3: MULTI-LOT MANAGEMENT ==================== */}
          <Card className="p-6 border-2 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: '#003E6D' }}>
                <Layers className="w-5 h-5" />
                📦 Manage Multiple Lots
              </h2>
              <Badge className="bg-purple-500 text-white">
                {selectedLots.length} Selected
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockLots.map((lot) => (
                <div
                  key={lot.id}
                  className={cn(
                    "bg-white rounded-lg p-4 border-2 cursor-pointer transition-all",
                    selectedLots.includes(lot.id) ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-purple-300"
                  )}
                  onClick={() => toggleLotSelection(lot.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{lot.commodity}</h3>
                      <p className="text-sm text-gray-600">Token: {lot.tokenId}</p>
                    </div>
                    <Checkbox
                      checked={selectedLots.includes(lot.id)}
                      onCheckedChange={() => toggleLotSelection(lot.id)}
                    />
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-semibold">{lot.quantity} quintals</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quality:</span>
                      <span className="font-semibold">{lot.quality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={cn(
                        lot.status === 'active' ? 'bg-green-100 text-green-800' :
                        lot.status === 'stored' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      )}>
                        {lot.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedLots.length > 0 && (
              <div className="mt-4 bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-3">Bulk Actions for Selected Lots</h3>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Warehouse className="w-4 h-4 mr-2" />
                    Book Storage for All
                  </Button>
                  <Button size="sm" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    List All for Sale
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Combined Contract
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Total Value
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* ==================== TOKENIZATION SUCCESS BANNER ==================== */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 p-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-500 text-white p-3 rounded-full">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  🎉 Congratulations! Your lot has been successfully tokenized
                </h3>
                <div className="bg-white rounded-lg p-4 space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Lot ID:</span>
                    <span className="font-semibold text-gray-900">LOT-2025-001</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Token ID:</span>
                    <span className="font-semibold text-gray-900">TKN-45A3B9C</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Commodity:</span>
                    <span className="font-semibold text-gray-900">Wheat (Grade A, Organic)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold text-gray-900">50 quintals</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={() => setActiveTab('storage')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Warehouse className="w-4 h-4 mr-2" />
                    Proceed to Storage Options
                  </Button>
                  <Button
                    onClick={() => setActiveTab('sell')}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Proceed to Sell
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* ==================== AI ALERTS ==================== */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              🤖 AI Insights & Alerts
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-start gap-3">
                  <div className="bg-red-500 p-2 rounded-full">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1">🔴 PRICE ANOMALY DETECTED</p>
                    <p className="text-sm text-blue-100 mb-2">
                      Cold storage prices 15% above regional average
                    </p>
                    <p className="text-xs bg-white/20 rounded px-2 py-1 inline-block">
                      → Recommendation: Consider negotiating rates
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500 p-2 rounded-full">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1">🟢 MARKET OPPORTUNITY</p>
                    <p className="text-sm text-blue-100 mb-2">
                      Wheat demand increasing 8-12% this week
                    </p>
                    <p className="text-xs bg-white/20 rounded px-2 py-1 inline-block">
                      → Recommendation: List on online marketplace
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-500 p-2 rounded-full">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1">🟡 REGULATORY UPDATE</p>
                    <p className="text-sm text-blue-100 mb-2">
                      New FSSAI guidelines effective from Nov 1, 2025
                    </p>
                    <p className="text-xs bg-white/20 rounded px-2 py-1 inline-block">
                      → Action: Review compliance requirements
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1">🔵 BEST AGENT MATCH</p>
                    <p className="text-sm text-blue-100 mb-2">
                      Harpreet Singh: AI Score 95/100 for your needs
                    </p>
                    <p className="text-xs bg-white/20 rounded px-2 py-1 inline-block">
                      → Action: Assign for personalized assistance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* ==================== MAIN TABS ==================== */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="storage" className="flex items-center gap-2">
                <Warehouse className="w-4 h-4" />
                Storage
              </TabsTrigger>
              <TabsTrigger value="packing" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Packing
              </TabsTrigger>
              <TabsTrigger value="sell" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Sell
              </TabsTrigger>
              <TabsTrigger value="ai-insights" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                AI Insights
              </TabsTrigger>
            </TabsList>

            {/* STORAGE TAB */}
            <TabsContent value="storage" className="space-y-6 mt-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: '#003E6D' }}>
                  Select Storage Type
                </h2>
                <p className="text-gray-600 mb-6">Choose the storage facility that best suits your commodity needs</p>
                
                {/* Storage Type Icons remain the same */}
                <div className="text-center py-12 text-gray-500">
                  Storage facility selection interface here...
                  <br />
                  <small>Full storage workflow from original component</small>
                </div>
              </Card>
            </TabsContent>

            {/* PACKING TAB */}
            <TabsContent value="packing" className="space-y-6 mt-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: '#003E6D' }}>
                  Packing Options
                </h2>
                <div className="text-center py-12 text-gray-500">
                  Packing materials and services interface here...
                  <br />
                  <small>Full packing workflow from original component</small>
                </div>
              </Card>
            </TabsContent>

            {/* SELL TAB */}
            <TabsContent value="sell" className="space-y-6 mt-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: '#003E6D' }}>
                  Selling Options
                </h2>
                <div className="text-center py-12 text-gray-500">
                  Selling routes and agent assignment interface here...
                  <br />
                  <small>Full selling workflow from original component</small>
                </div>
              </Card>
            </TabsContent>

            {/* AI INSIGHTS TAB */}
            <TabsContent value="ai-insights" className="space-y-6 mt-6">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: '#003E6D' }}>
                  AI Insights & Analytics
                </h2>
                <div className="text-center py-12 text-gray-500">
                  AI analytics and recommendations interface here...
                  <br />
                  <small>Full AI insights from original component</small>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* ==================== NEW FEATURE 6: FAVORITES PANEL ==================== */}
          {favorites.length > 0 && (
            <Card className="p-6 border-2 border-pink-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: '#003E6D' }}>
                  <Heart className="w-5 h-5 text-pink-500" />
                  ❤️ Your Favorites
                </h2>
                <Badge className="bg-pink-500 text-white">
                  {favorites.length} Saved
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map((fav) => (
                  <div key={fav.id} className="bg-white rounded-lg p-4 border flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{fav.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{fav.type}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Saved {fav.savedDate.toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFromFavorites(fav.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* ==================== NEW FEATURE 7: EXPORT MODAL ==================== */}
        <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Dashboard Data
              </DialogTitle>
              <DialogDescription>
                Choose your preferred export format
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-4">
              <Button
                className="w-full justify-start gap-3"
                variant="outline"
                onClick={exportToPDF}
              >
                <FileText className="w-5 h-5 text-red-600" />
                <div className="text-left flex-1">
                  <div className="font-semibold">Export to PDF</div>
                  <div className="text-xs text-gray-500">Printable format with all details</div>
                </div>
              </Button>

              <Button
                className="w-full justify-start gap-3"
                variant="outline"
                onClick={exportToExcel}
              >
                <Download className="w-5 h-5 text-green-600" />
                <div className="text-left flex-1">
                  <div className="font-semibold">Export to Excel</div>
                  <div className="text-xs text-gray-500">Editable spreadsheet format</div>
                </div>
              </Button>

              <Button
                className="w-full justify-start gap-3"
                variant="outline"
                onClick={generateQRCode}
              >
                <QrCode className="w-5 h-5 text-blue-600" />
                <div className="text-left flex-1">
                  <div className="font-semibold">Generate QR Code</div>
                  <div className="text-xs text-gray-500">Access on mobile device</div>
                </div>
              </Button>

              <Button
                className="w-full justify-start gap-3"
                variant="outline"
                onClick={() => alert('Sharing link copied!')}
              >
                <Share2 className="w-5 h-5 text-purple-600" />
                <div className="text-left flex-1">
                  <div className="font-semibold">Share Link</div>
                  <div className="text-xs text-gray-500">Share with team members</div>
                </div>
              </Button>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowExportModal(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ==================== NEW FEATURE 8: COMPARISON MODAL ==================== */}
        <Dialog open={showComparisonModal} onOpenChange={setShowComparisonModal}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Compare className="w-5 h-5" />
                Compare Facilities & Agents
              </DialogTitle>
              <DialogDescription>
                Side-by-side comparison of your selected items
              </DialogDescription>
            </DialogHeader>

            {comparisonList.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Compare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No items added to comparison yet</p>
                <p className="text-sm mt-1">Click "Add to Compare" on facility cards to start</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border p-3 text-left font-semibold">Feature</th>
                      {comparisonList.map((item) => (
                        <th key={item.id} className="border p-3 text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{item.name}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromComparison(item.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{item.type}</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3 font-medium bg-gray-50">Rent/Commission</td>
                      {comparisonList.map((item) => (
                        <td key={item.id} className="border p-3">
                          {item.rent ? `₹${item.rent}/quintal` : 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium bg-gray-50">Rating</td>
                      {comparisonList.map((item) => (
                        <td key={item.id} className="border p-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {item.rating}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium bg-gray-50">Distance</td>
                      {comparisonList.map((item) => (
                        <td key={item.id} className="border p-3">
                          {item.distance} km
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="border p-3 font-medium bg-gray-50">Services</td>
                      {comparisonList.map((item) => (
                        <td key={item.id} className="border p-3">
                          <div className="space-y-1">
                            {item.services.map((service, idx) => (
                              <div key={idx} className="text-sm flex items-center gap-1">
                                <Check className="w-3 h-3 text-green-600" />
                                {service}
                              </div>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowComparisonModal(false)}>
                Close
              </Button>
              <Button onClick={exportToPDF} className="gap-2">
                <Download className="w-4 h-4" />
                Export Comparison
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ==================== AGENT ASSIGNMENT DIALOG ==================== */}
        <Dialog open={agentDialogOpen} onOpenChange={setAgentDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                Assign {assignmentContext === 'storage' ? 'Storage' : 'Sales'} Agent
              </DialogTitle>
              <DialogDescription>
                Select an expert to help with your {assignmentContext} needs
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {mockAgents.map((agent) => (
                <div key={agent.id} className="border-2 rounded-lg p-6 hover:border-blue-500 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-4 rounded-full">
                      <User className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-blue-900 mb-1">
                        {agent.name}
                      </h3>
                      <p className="text-gray-600 mb-2">{agent.specialization}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          ⭐ AI Match Score: {agent.aiScore}/100
                        </div>
                        
                        <div className={cn(
                          "px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1",
                          agent.availability === 'Available' ? "bg-green-100 text-green-800" :
                          agent.availability === 'Busy' ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        )}>
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            agent.availability === 'Available' ? "bg-green-500" :
                            agent.availability === 'Busy' ? "bg-yellow-500" :
                            "bg-gray-500"
                          )} />
                          {agent.availability}
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
                          <p className="text-sm text-gray-600">Clients Served</p>
                          <p className="font-semibold">{agent.clientsServed}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Certifications:</p>
                        <div className="flex flex-wrap gap-2">
                          {agent.certifications.map((cert) => (
                            <span key={cert} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                              🎖️ {cert}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Languages:</p>
                        <div className="flex flex-wrap gap-2">
                          {agent.languages.map((lang) => (
                            <span key={lang} className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-sm">
                              🗣️ {lang}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                          <Phone className="w-4 h-4" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Chat
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToFavorites('agent', agent.id, agent.name)}
                          disabled={isFavorite(agent.id)}
                          className="ml-auto"
                        >
                          <Heart className={cn(
                            "w-4 h-4",
                            isFavorite(agent.id) ? "fill-pink-500 text-pink-500" : ""
                          )} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => assignAgent(agent)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg transition-all"
                  >
                    ✅ Assign {agent.name}
                  </Button>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default StorageAndSellDashboardEnhanced;
