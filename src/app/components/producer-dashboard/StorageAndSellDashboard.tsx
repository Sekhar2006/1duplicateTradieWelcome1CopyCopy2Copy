import React, { useState } from 'react';
import {
  Warehouse,
  Snowflake,
  Home,
  Building2,
  Search,
  Filter,
  MapPin,
  Shield,
  Clock,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { GrokAIService } from './GrokAIService';

interface StorageFacility {
  id: string;
  name: string;
  type: 'warehouse' | 'cold_storage' | 'open_storage' | 'farm_storage' | 'silo' | 'specialized';
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
  qualified: boolean;
  advantages: string[];
  contact: {
    phone: string;
    email: string;
    manager: string;
  };
}

interface PackingMaterial {
  id: string;
  name: string;
  type: string;
  commodity: string[];
  seller: string;
  price: number;
  unit: string;
  available: boolean;
  quality: string;
  certifications: string[];
  aiRecommended: boolean;
  priceTrend: 'up' | 'down' | 'stable';
  anomaly?: string;
}

interface LaborService {
  id: string;
  provider: string;
  service: string;
  workers: number;
  rate: number;
  unit: string;
  availability: 'immediate' | 'scheduled' | 'limited';
  rating: number;
  experience: string;
}

interface MachineRental {
  id: string;
  machine: string;
  provider: string;
  type: string;
  rate: number;
  unit: string;
  available: boolean;
  condition: string;
  operator: boolean;
}

interface CommissionAgent {
  id: string;
  name: string;
  market: string;
  commission: number;
  specialization: string[];
  availability: 'available' | 'busy' | 'offline';
  rating: number;
  deals: number;
  aiScore: number;
  bestForCommodity: string[];
}

interface StorageAgent {
  id: string;
  name: string;
  photo: string;
  specialization: string[];
  experience: string;
  availability: 'available' | 'busy' | 'offline';
  rating: number;
  completedJobs: number;
  languages: string[];
  services: string[];
  responseTime: string;
  successRate: number;
  phone: string;
  email: string;
  certifications: string[];
  aiScore: number;
}

export const StorageAndSellDashboard: React.FC = () => {
  const [tokenizationComplete, setTokenizationComplete] = useState(true);
  const [selectedStorageType, setSelectedStorageType] = useState<string | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<StorageFacility | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPath, setSelectedPath] = useState<'store' | 'direct' | 'agent' | 'marketplace' | null>(null);
  const [showAgentDialog, setShowAgentDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<StorageAgent | null>(null);
  const [aiAlerts, setAiAlerts] = useState<any[]>([
    {
      id: '1',
      type: 'pricing',
      severity: 'high',
      message: 'Unusual pricing detected for Cold Storage in Punjab - 15% above market average',
      recommendation: 'Consider alternative facilities or negotiate',
    },
    {
      id: '2',
      type: 'compliance',
      severity: 'medium',
      message: 'New FSSAI regulation effective next week - Update required for cold storage',
      recommendation: 'Contact facility manager for compliance confirmation',
    },
  ]);

  const grokService = GrokAIService.getInstance();

  // Storage type options
  const storageTypes = [
    {
      id: 'warehouse',
      name: 'Warehouse Storage',
      icon: <Warehouse className="w-6 h-6" />,
      description: 'Climate-controlled general storage',
      color: '#2F80ED',
    },
    {
      id: 'cold_storage',
      name: 'Cold Storage',
      icon: <Snowflake className="w-6 h-6" />,
      description: 'Temperature-controlled for perishables',
      color: '#56CCF2',
    },
    {
      id: 'open_storage',
      name: 'Open Storage',
      icon: <Home className="w-6 h-6" />,
      description: 'Outdoor covered storage',
      color: '#27AE60',
    },
    {
      id: 'farm_storage',
      name: 'Farm Storage',
      icon: <Building2 className="w-6 h-6" />,
      description: 'On-farm storage facilities',
      color: '#F2994A',
    },
    {
      id: 'silo',
      name: 'Silo Storage',
      icon: <Building2 className="w-6 h-6" />,
      description: 'Bulk grain storage silos',
      color: '#9B59B6',
    },
    {
      id: 'specialized',
      name: 'Specialized Storage',
      icon: <Award className="w-6 h-6" />,
      description: 'Commodity-specific facilities',
      color: '#FFD700',
    },
  ];

  // Mock storage facilities
  const storageFacilities: StorageFacility[] = [
    {
      id: 'wh-001',
      name: 'Punjab Agricultural Warehouse',
      type: 'warehouse',
      location: 'Ludhiana, Punjab',
      distance: 12,
      capacity: 5000,
      availableSpace: 2300,
      services: ['Loading/Unloading', 'Grading', 'Cleaning', 'Security', 'Insurance'],
      temperatureControl: true,
      temperatureRange: '15-25°C',
      security: ['24/7 CCTV', 'Armed Guards', 'Fire System', 'Pest Control'],
      compliance: {
        status: 'compliant',
        certifications: ['WDRA', 'FSSAI', 'ISO 9001', 'Organic Certified'],
        lastUpdated: new Date('2025-10-15'),
        alerts: [],
      },
      rent: {
        amount: 450,
        unit: 'per ton/month',
        negotiable: true,
        discount: 10,
      },
      rating: 4.8,
      reviews: 124,
      qualified: true,
      advantages: ['Government subsidized', 'Easy loan facility', 'Quality certification'],
      contact: {
        phone: '+91 98765 43210',
        email: 'manager@pawh.com',
        manager: 'Rajesh Kumar',
      },
    },
    {
      id: 'cs-001',
      name: 'Modern Cold Chain Facility',
      type: 'cold_storage',
      location: 'Amritsar, Punjab',
      distance: 28,
      capacity: 3000,
      availableSpace: 800,
      services: ['Pre-cooling', 'Blast Freezing', 'Ripening Chambers', 'Quality Testing'],
      temperatureControl: true,
      temperatureRange: '2-8°C',
      security: ['24/7 Monitoring', 'Temperature Sensors', 'Backup Power', 'Access Control'],
      compliance: {
        status: 'compliant',
        certifications: ['FSSAI', 'HACCP', 'ISO 22000', 'APEDA'],
        lastUpdated: new Date('2025-10-20'),
        alerts: [],
      },
      rent: {
        amount: 850,
        unit: 'per ton/month',
        negotiable: false,
      },
      rating: 4.9,
      reviews: 89,
      qualified: true,
      advantages: ['Export quality', 'Direct market access', 'Premium pricing'],
      contact: {
        phone: '+91 98765 43211',
        email: 'info@moderncc.com',
        manager: 'Priya Sharma',
      },
    },
    {
      id: 'wh-002',
      name: 'National Commodity Warehouse',
      type: 'warehouse',
      location: 'Jalandhar, Punjab',
      distance: 18,
      capacity: 8000,
      availableSpace: 4200,
      services: ['Fumigation', 'Weighing', 'Sorting', 'Packing', 'Transport'],
      temperatureControl: true,
      temperatureRange: '10-20°C',
      security: ['CCTV', 'Security Guards', 'Fire Alarm', 'Quality Monitoring'],
      compliance: {
        status: 'warning',
        certifications: ['WDRA', 'ISO 9001'],
        lastUpdated: new Date('2025-09-01'),
        alerts: ['FSSAI renewal pending - Due by Nov 15'],
      },
      rent: {
        amount: 520,
        unit: 'per ton/month',
        negotiable: true,
        discount: 15,
      },
      rating: 4.5,
      reviews: 156,
      qualified: false,
      advantages: ['Large capacity', 'Good connectivity'],
      contact: {
        phone: '+91 98765 43212',
        email: 'contact@ncw.com',
        manager: 'Amit Singh',
      },
    },
  ];

  // Mock packing materials
  const packingMaterials: PackingMaterial[] = [
    {
      id: 'pm-001',
      name: 'Jute Bags (50kg)',
      type: 'Natural Fiber',
      commodity: ['Wheat', 'Rice', 'Pulses'],
      seller: 'AgriPack Industries',
      price: 35,
      unit: 'per bag',
      available: true,
      quality: 'Premium',
      certifications: ['Food Grade', 'Biodegradable'],
      aiRecommended: true,
      priceTrend: 'stable',
    },
    {
      id: 'pm-002',
      name: 'Plastic Crates (Stackable)',
      type: 'Reusable',
      commodity: ['Fruits', 'Vegetables'],
      seller: 'ModernPack Solutions',
      price: 185,
      unit: 'per crate',
      available: true,
      quality: 'Standard',
      certifications: ['Food Safe', 'UV Resistant'],
      aiRecommended: false,
      priceTrend: 'up',
      anomaly: 'Price increased 18% in last week',
    },
    {
      id: 'pm-003',
      name: 'Corrugated Boxes (10kg)',
      type: 'Cardboard',
      commodity: ['All commodities'],
      seller: 'EcoPack Ltd',
      price: 28,
      unit: 'per box',
      available: true,
      quality: 'Premium',
      certifications: ['Recycled', 'Food Grade'],
      aiRecommended: true,
      priceTrend: 'down',
    },
  ];

  // Mock labor services
  const laborServices: LaborService[] = [
    {
      id: 'ls-001',
      provider: 'Farm Labour Cooperative',
      service: 'Harvesting & Packing',
      workers: 25,
      rate: 450,
      unit: 'per worker/day',
      availability: 'immediate',
      rating: 4.7,
      experience: '10+ years',
    },
    {
      id: 'ls-002',
      provider: 'AgriWork Services',
      service: 'Loading & Transport',
      workers: 15,
      rate: 500,
      unit: 'per worker/day',
      availability: 'scheduled',
      rating: 4.5,
      experience: '5+ years',
    },
  ];

  // Mock machine rentals
  const machineRentals: MachineRental[] = [
    {
      id: 'mr-001',
      machine: 'Grain Cleaning Machine',
      provider: 'AgriTech Rentals',
      type: 'Cleaning',
      rate: 2500,
      unit: 'per day',
      available: true,
      condition: 'Excellent',
      operator: true,
    },
    {
      id: 'mr-002',
      machine: 'Packaging Machine',
      provider: 'ModernAgri Equipment',
      type: 'Packing',
      rate: 3500,
      unit: 'per day',
      available: true,
      condition: 'Good',
      operator: false,
    },
  ];

  // Mock commission agents
  const commissionAgents: CommissionAgent[] = [
    {
      id: 'ca-001',
      name: 'Ramesh Traders',
      market: 'Ludhiana Grain Market',
      commission: 2.5,
      specialization: ['Wheat', 'Rice', 'Pulses'],
      availability: 'available',
      rating: 4.9,
      deals: 1250,
      aiScore: 95,
      bestForCommodity: ['Wheat'],
    },
    {
      id: 'ca-002',
      name: 'Modern Commission Agency',
      market: 'Amritsar APMC',
      commission: 2.0,
      specialization: ['Fruits', 'Vegetables'],
      availability: 'busy',
      rating: 4.7,
      deals: 890,
      aiScore: 88,
      bestForCommodity: ['Fruits'],
    },
  ];

  // Mock storage agents
  const storageAgents: StorageAgent[] = [
    {
      id: 'sa-001',
      name: 'Harpreet Singh',
      photo: '👨‍💼',
      specialization: ['Cold Storage', 'Warehouse', 'Logistics'],
      experience: '8+ years in storage management',
      availability: 'available',
      rating: 4.9,
      completedJobs: 347,
      languages: ['Punjabi', 'Hindi', 'English'],
      services: [
        'Storage facility booking',
        'Logistics coordination',
        'Quality monitoring',
        'Documentation assistance',
        'Insurance guidance',
      ],
      responseTime: '< 2 hours',
      successRate: 98,
      phone: '+91 98765 11111',
      email: 'harpreet@storageagent.com',
      certifications: ['Certified Storage Manager', 'WDRA Approved'],
      aiScore: 96,
    },
    {
      id: 'sa-002',
      name: 'Meena Patel',
      photo: '👩‍💼',
      specialization: ['Farm Storage', 'Silo', 'Grain Management'],
      experience: '12+ years in agricultural storage',
      availability: 'available',
      rating: 4.8,
      completedJobs: 582,
      languages: ['Gujarati', 'Hindi', 'English'],
      services: [
        'Storage selection consultation',
        'Pest control coordination',
        'Temperature monitoring',
        'Transport arrangements',
        'Compliance assistance',
      ],
      responseTime: '< 1 hour',
      successRate: 97,
      phone: '+91 98765 22222',
      email: 'meena@storageagent.com',
      certifications: ['Grain Storage Expert', 'FSSAI Certified'],
      aiScore: 94,
    },
    {
      id: 'sa-003',
      name: 'Rajesh Kumar',
      photo: '👨‍💼',
      specialization: ['Cold Storage', 'Perishables', 'Export Logistics'],
      experience: '10+ years in cold chain management',
      availability: 'busy',
      rating: 4.7,
      completedJobs: 421,
      languages: ['Hindi', 'English'],
      services: [
        'Cold storage expertise',
        'Export documentation',
        'Quality certification',
        'Cold chain logistics',
        'Market linkage',
      ],
      responseTime: '< 3 hours',
      successRate: 95,
      phone: '+91 98765 33333',
      email: 'rajesh@storageagent.com',
      certifications: ['Cold Chain Expert', 'Export Certified'],
      aiScore: 91,
    },
  ];

  const getStorageTypeColor = (type: string) => {
    const typeData = storageTypes.find((t) => t.id === type);
    return typeData?.color || '#5A6B7A';
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return '#27AE60';
      case 'warning':
        return '#E2B93B';
      case 'expired':
        return '#E74C3C';
      default:
        return '#5A6B7A';
    }
  };

  const filteredFacilities = storageFacilities.filter((facility) => {
    if (selectedStorageType && facility.type !== selectedStorageType) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        facility.name.toLowerCase().includes(query) ||
        facility.location.toLowerCase().includes(query) ||
        facility.services.some((s) => s.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div
      className="min-h-screen py-6 px-4"
      style={{
        background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F4FC 50%, #D9F2FF 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Tokenization Success Banner */}
        {tokenizationComplete && (
          <Card
            className="p-6 mb-6 border-2"
            style={{
              borderColor: '#27AE60',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F0FFF4 100%)',
              borderRadius: '24px',
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #27AE60 0%, #6FCF97 100%)' }}
                >
                  <CheckCircle2 className="w-8 h-8" style={{ color: 'white' }} />
                </div>
                <div className="flex-1">
                  <h2
                    className="mb-2"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      color: '#27AE60',
                    }}
                  >
                    Tokenization Complete! 🎉
                  </h2>
                  <p
                    className="mb-4"
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      color: '#5A6B7A',
                    }}
                  >
                    Your lot has been successfully tokenized. You can now choose to store your commodity or
                    proceed directly to selling.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      className="gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
                        color: '#003E6D',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                        border: 'none',
                      }}
                    >
                      <Warehouse className="w-5 h-5" />
                      Storage Options
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2"
                      style={{
                        border: '2px solid #FFD700',
                        color: '#003E6D',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 600,
                      }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Sell Directly
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTokenizationComplete(false)}
              >
                <ChevronUp className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        )}

        {/* AI Alerts Section */}
        {aiAlerts.length > 0 && (
          <Card
            className="p-4 mb-6"
            style={{
              borderRadius: '16px',
              border: '2px solid rgba(255,215,0,0.3)',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFEF0 100%)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5" style={{ color: '#FFD700' }} />
              <h3
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#003E6D',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                }}
              >
                AI Insights & Alerts
              </h3>
              <Badge
                className="ml-auto"
                style={{
                  background: '#FFD700',
                  color: '#003E6D',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                {aiAlerts.length} Active
              </Badge>
            </div>
            <div className="space-y-2">
              {aiAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-lg flex items-start gap-3"
                  style={{
                    background:
                      alert.severity === 'high'
                        ? 'rgba(231,76,60,0.1)'
                        : 'rgba(226,179,59,0.1)',
                  }}
                >
                  <AlertTriangle
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    style={{
                      color: alert.severity === 'high' ? '#E74C3C' : '#E2B93B',
                    }}
                  />
                  <div className="flex-1">
                    <p
                      className="mb-1"
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        color: '#003E6D',
                        fontSize: '0.875rem',
                      }}
                    >
                      {alert.message}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        color: '#5A6B7A',
                        fontSize: '0.8125rem',
                      }}
                    >
                      💡 {alert.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Main Navigation Tabs */}
        <Tabs defaultValue="storage" className="mb-6">
          <TabsList
            className="grid w-full grid-cols-4 p-1"
            style={{
              background: 'white',
              borderRadius: '16px',
              border: '2px solid rgba(0,62,109,0.1)',
            }}
          >
            <TabsTrigger
              value="storage"
              className="gap-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <Warehouse className="w-4 h-4" />
              Storage
            </TabsTrigger>
            <TabsTrigger
              value="packing"
              className="gap-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <Package className="w-4 h-4" />
              Packing
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="gap-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <ShoppingCart className="w-4 h-4" />
              Sell
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="gap-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <Sparkles className="w-4 h-4" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          {/* Storage Tab */}
          <TabsContent value="storage" className="mt-6">
            <StorageTab
              storageTypes={storageTypes}
              selectedStorageType={selectedStorageType}
              setSelectedStorageType={setSelectedStorageType}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              filteredFacilities={filteredFacilities}
              selectedFacility={selectedFacility}
              setSelectedFacility={setSelectedFacility}
              getStorageTypeColor={getStorageTypeColor}
              getComplianceColor={getComplianceColor}
              onAssignAgent={() => setShowAgentDialog(true)}
            />
          </TabsContent>

          {/* Packing Tab */}
          <TabsContent value="packing" className="mt-6">
            <PackingTab
              packingMaterials={packingMaterials}
              laborServices={laborServices}
              machineRentals={machineRentals}
            />
          </TabsContent>

          {/* Sell Tab */}
          <TabsContent value="sell" className="mt-6">
            <SellTab
              commissionAgents={commissionAgents}
              selectedPath={selectedPath}
              setSelectedPath={setSelectedPath}
              onAssignAgent={() => {
                setSelectedAgent(null);
                setShowAgentDialog(true);
              }}
            />
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="mt-6">
            <AIInsightsTab />
          </TabsContent>
        </Tabs>

        {/* Storage Agent Assignment Dialog */}
        <Dialog open={showAgentDialog} onOpenChange={setShowAgentDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#003E6D',
                  fontSize: '1.5rem',
                }}
              >
                <Headphones className="w-6 h-6 inline-block mr-2" style={{ color: '#FFD700' }} />
                Assign Storage Agent
              </DialogTitle>
              <DialogDescription
                style={{
                  fontFamily: 'Lato, sans-serif',
                  color: '#5A6B7A',
                }}
              >
                Get personalized assistance with storage selection, booking, and logistics management
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {storageAgents.map((agent) => (
                <Card
                  key={agent.id}
                  className={`p-6 cursor-pointer transition-all ${
                    selectedAgent?.id === agent.id ? 'ring-2' : ''
                  }`}
                  style={{
                    borderRadius: '16px',
                    border: `2px solid ${selectedAgent?.id === agent.id ? '#FFD700' : 'rgba(0,62,109,0.1)'}`,
                    background:
                      selectedAgent?.id === agent.id
                        ? 'linear-gradient(135deg, #FFFFFF 0%, #FFFEF0 100%)'
                        : 'white',
                  }}
                  onClick={() => setSelectedAgent(agent)}
                >
                  <div className="flex items-start gap-4">
                    {/* Agent Photo/Avatar */}
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-4xl flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)',
                      }}
                    >
                      {agent.photo}
                    </div>

                    {/* Agent Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4
                              style={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#003E6D',
                                fontSize: '1.125rem',
                                fontWeight: 600,
                              }}
                            >
                              {agent.name}
                            </h4>
                            {agent.aiScore > 93 && (
                              <Badge
                                style={{
                                  background: '#FFD700',
                                  color: '#003E6D',
                                  fontFamily: 'Montserrat, sans-serif',
                                  fontSize: '0.75rem',
                                }}
                              >
                                <Sparkles className="w-3 h-3 mr-1 inline-block" />
                                Top Rated
                              </Badge>
                            )}
                            <Badge
                              style={{
                                background:
                                  agent.availability === 'available'
                                    ? 'rgba(39,174,96,0.15)'
                                    : 'rgba(226,179,59,0.15)',
                                color: agent.availability === 'available' ? '#27AE60' : '#E2B93B',
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '0.75rem',
                              }}
                            >
                              {agent.availability === 'available' ? '🟢 Available' : '🟡 Busy'}
                            </Badge>
                          </div>
                          <p
                            className="mb-2"
                            style={{
                              fontFamily: 'Lato, sans-serif',
                              color: '#5A6B7A',
                              fontSize: '0.875rem',
                            }}
                          >
                            {agent.experience}
                          </p>
                        </div>

                        {/* Rating & Stats */}
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-5 h-5" style={{ color: '#FFD700', fill: '#FFD700' }} />
                            <span
                              style={{
                                fontFamily: 'Poppins, sans-serif',
                                color: '#003E6D',
                                fontWeight: 600,
                              }}
                            >
                              {agent.rating}
                            </span>
                          </div>
                          <p
                            style={{
                              fontFamily: 'Lato, sans-serif',
                              color: '#5A6B7A',
                              fontSize: '0.75rem',
                            }}
                          >
                            {agent.completedJobs} jobs
                          </p>
                        </div>
                      </div>

                      {/* Specialization */}
                      <div className="mb-3">
                        <p
                          className="mb-1"
                          style={{
                            fontFamily: 'Montserrat, sans-serif',
                            color: '#003E6D',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        >
                          Specialization
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {agent.specialization.map((spec, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              style={{
                                fontFamily: 'Lato, sans-serif',
                                fontSize: '0.75rem',
                              }}
                            >
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Services Offered */}
                      <div className="mb-3">
                        <p
                          className="mb-1"
                          style={{
                            fontFamily: 'Montserrat, sans-serif',
                            color: '#003E6D',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        >
                          Services Offered
                        </p>
                        <div className="grid grid-cols-2 gap-1">
                          {agent.services.slice(0, 4).map((service, i) => (
                            <div key={i} className="flex items-start gap-1">
                              <CheckCircle2
                                className="w-3 h-3 mt-0.5 flex-shrink-0"
                                style={{ color: '#27AE60' }}
                              />
                              <span
                                style={{
                                  fontFamily: 'Lato, sans-serif',
                                  color: '#5A6B7A',
                                  fontSize: '0.75rem',
                                }}
                              >
                                {service}
                              </span>
                            </div>
                          ))}
                        </div>
                        {agent.services.length > 4 && (
                          <p
                            className="mt-1"
                            style={{
                              fontFamily: 'Lato, sans-serif',
                              color: '#2F80ED',
                              fontSize: '0.75rem',
                            }}
                          >
                            +{agent.services.length - 4} more services
                          </p>
                        )}
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p
                            style={{
                              fontFamily: 'Lato, sans-serif',
                              color: '#8B9AA8',
                              fontSize: '0.6875rem',
                            }}
                          >
                            Response Time
                          </p>
                          <p
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              color: '#27AE60',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                            }}
                          >
                            {agent.responseTime}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              fontFamily: 'Lato, sans-serif',
                              color: '#8B9AA8',
                              fontSize: '0.6875rem',
                            }}
                          >
                            Success Rate
                          </p>
                          <p
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              color: '#27AE60',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                            }}
                          >
                            {agent.successRate}%
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              fontFamily: 'Lato, sans-serif',
                              color: '#8B9AA8',
                              fontSize: '0.6875rem',
                            }}
                          >
                            AI Score
                          </p>
                          <p
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              color: '#FFD700',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                            }}
                          >
                            {agent.aiScore}/100
                          </p>
                        </div>
                      </div>

                      {/* Languages & Certifications */}
                      <div className="flex gap-6 mb-3">
                        <div>
                          <p
                            style={{
                              fontFamily: 'Montserrat, sans-serif',
                              color: '#003E6D',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                            }}
                          >
                            Languages: {agent.languages.join(', ')}
                          </p>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {agent.certifications.map((cert, i) => (
                          <Badge
                            key={i}
                            style={{
                              background: 'rgba(255,215,0,0.15)',
                              color: '#003E6D',
                              fontFamily: 'Lato, sans-serif',
                              fontSize: '0.75rem',
                            }}
                          >
                            <BadgeCheck className="w-3 h-3 mr-1 inline-block" />
                            {cert}
                          </Badge>
                        ))}
                      </div>

                      {/* Contact Info */}
                      <div className="flex gap-4 text-sm mb-3">
                        <a
                          href={`tel:${agent.phone}`}
                          className="flex items-center gap-1 hover:underline"
                          style={{
                            fontFamily: 'Lato, sans-serif',
                            color: '#2F80ED',
                            fontSize: '0.875rem',
                          }}
                        >
                          <Phone className="w-4 h-4" />
                          {agent.phone}
                        </a>
                        <a
                          href={`mailto:${agent.email}`}
                          className="flex items-center gap-1 hover:underline"
                          style={{
                            fontFamily: 'Lato, sans-serif',
                            color: '#2F80ED',
                            fontSize: '0.875rem',
                          }}
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                        <button
                          className="flex items-center gap-1 hover:underline"
                          style={{
                            fontFamily: 'Lato, sans-serif',
                            color: '#2F80ED',
                            fontSize: '0.875rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <MessageCircle className="w-4 h-4" />
                          Chat
                        </button>
                      </div>

                      {/* Action Buttons */}
                      {selectedAgent?.id === agent.id && (
                        <div className="flex gap-3 pt-3 border-t">
                          <Button
                            className="flex-1 gap-2"
                            disabled={agent.availability !== 'available'}
                            style={{
                              background:
                                agent.availability === 'available'
                                  ? 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)'
                                  : 'rgba(0,62,109,0.1)',
                              color: agent.availability === 'available' ? '#003E6D' : '#8B9AA8',
                              fontFamily: 'Montserrat, sans-serif',
                              fontWeight: 700,
                              border: 'none',
                            }}
                            onClick={() => {
                              // Handle agent assignment
                              alert(`Agent ${agent.name} has been assigned! They will contact you within ${agent.responseTime}.`);
                              setShowAgentDialog(false);
                            }}
                          >
                            <UserPlus className="w-5 h-5" />
                            {agent.availability === 'available' ? 'Assign This Agent' : 'Currently Busy'}
                          </Button>
                          <Button
                            variant="outline"
                            className="gap-2"
                            style={{
                              fontFamily: 'Montserrat, sans-serif',
                              fontWeight: 600,
                            }}
                            onClick={() => setSelectedAgent(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {storageAgents.filter((a) => a.availability === 'available').length === 0 && (
                <Card className="p-8 text-center" style={{ borderRadius: '16px' }}>
                  <Headphones className="w-16 h-16 mx-auto mb-4" style={{ color: '#8B9AA8' }} />
                  <h4
                    className="mb-2"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      color: '#003E6D',
                    }}
                  >
                    All Agents Currently Busy
                  </h4>
                  <p
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      color: '#5A6B7A',
                    }}
                  >
                    Please try again later or leave a request
                  </p>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// Storage Tab Component
const StorageTab: React.FC<any> = ({
  storageTypes,
  selectedStorageType,
  setSelectedStorageType,
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  filteredFacilities,
  selectedFacility,
  setSelectedFacility,
  getStorageTypeColor,
  getComplianceColor,
  onAssignAgent,
}) => {
  return (
    <div>
      {/* Storage Type Selection */}
      <Card className="p-6 mb-6" style={{ borderRadius: '24px' }}>
        <h3
          className="mb-4"
          style={{
            fontFamily: 'Poppins, sans-serif',
            color: '#003E6D',
          }}
        >
          Select Storage Type
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {storageTypes.map((type) => (
            <div
              key={type.id}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                selectedStorageType === type.id ? 'ring-2' : ''
              }`}
              style={{
                background:
                  selectedStorageType === type.id
                    ? `${type.color}15`
                    : 'rgba(0,62,109,0.05)',
                ringColor: type.color,
              }}
              onClick={() => setSelectedStorageType(type.id)}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: `${type.color}20`, color: type.color }}
              >
                {type.icon}
              </div>
              <p
                className="text-center mb-1"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#003E6D',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                }}
              >
                {type.name}
              </p>
              <p
                className="text-center text-xs"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  color: '#5A6B7A',
                }}
              >
                {type.description}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Search and Filters */}
      <Card className="p-4 mb-6" style={{ borderRadius: '16px' }}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: '#8B9AA8' }}
            />
            <Input
              placeholder="Search facilities by name, location, or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
            }}
          >
            <Filter className="w-5 h-5" />
            Filters
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                className="block mb-2"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#003E6D',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Max Distance
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Within 10 km</SelectItem>
                  <SelectItem value="25">Within 25 km</SelectItem>
                  <SelectItem value="50">Within 50 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                className="block mb-2"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#003E6D',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Compliance Status
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compliant">Compliant Only</SelectItem>
                  <SelectItem value="warning">Include Warnings</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                className="block mb-2"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#003E6D',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Rating
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="4.0">4.0+ Stars</SelectItem>
                  <SelectItem value="3.5">3.5+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </Card>

      {/* Facilities List */}
      <div className="space-y-4">
        {filteredFacilities.map((facility) => (
          <FacilityCard
            key={facility.id}
            facility={facility}
            isSelected={selectedFacility?.id === facility.id}
            onSelect={() => setSelectedFacility(facility)}
            getStorageTypeColor={getStorageTypeColor}
            getComplianceColor={getComplianceColor}
            onAssignAgent={onAssignAgent}
          />
        ))}

        {filteredFacilities.length === 0 && (
          <Card className="p-12 text-center" style={{ borderRadius: '24px' }}>
            <Warehouse className="w-16 h-16 mx-auto mb-4" style={{ color: '#8B9AA8' }} />
            <h3
              className="mb-2"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#003E6D',
              }}
            >
              No Facilities Found
            </h3>
            <p
              style={{
                fontFamily: 'Lato, sans-serif',
                color: '#5A6B7A',
              }}
            >
              Try adjusting your filters or search query
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

// Facility Card Component
const FacilityCard: React.FC<any> = ({
  facility,
  isSelected,
  onSelect,
  getStorageTypeColor,
  getComplianceColor,
  onAssignAgent,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className={`p-6 cursor-pointer transition-all ${isSelected ? 'ring-2' : ''}`}
      style={{
        borderRadius: '24px',
        border: `2px solid ${isSelected ? '#FFD700' : 'rgba(0,62,109,0.1)'}`,
        background: isSelected
          ? 'linear-gradient(135deg, #FFFFFF 0%, #FFFEF0 100%)'
          : 'white',
      }}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${getStorageTypeColor(facility.type)}15`,
              color: getStorageTypeColor(facility.type),
            }}
          >
            <Warehouse className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#003E6D',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                }}
              >
                {facility.name}
              </h4>
              {facility.qualified && (
                <Badge
                  className="px-2 py-0.5"
                  style={{
                    background: '#FFD700',
                    color: '#003E6D',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.75rem',
                  }}
                >
                  <Star className="w-3 h-3 mr-1 inline-block" />
                  Qualified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm mb-2">
              <span
                className="flex items-center gap-1"
                style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A' }}
              >
                <MapPin className="w-4 h-4" />
                {facility.location} • {facility.distance} km
              </span>
              <span
                className="flex items-center gap-1"
                style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A' }}
              >
                <Star className="w-4 h-4" style={{ color: '#FFD700' }} />
                {facility.rating} ({facility.reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </Button>
      </div>

      {/* Key Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p
            className="mb-1"
            style={{
              fontFamily: 'Lato, sans-serif',
              color: '#8B9AA8',
              fontSize: '0.75rem',
            }}
          >
            Capacity
          </p>
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              color: '#003E6D',
              fontWeight: 600,
            }}
          >
            {facility.capacity} tons
          </p>
        </div>
        <div>
          <p
            className="mb-1"
            style={{
              fontFamily: 'Lato, sans-serif',
              color: '#8B9AA8',
              fontSize: '0.75rem',
            }}
          >
            Available
          </p>
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              color: '#27AE60',
              fontWeight: 600,
            }}
          >
            {facility.availableSpace} tons
          </p>
        </div>
        <div>
          <p
            className="mb-1"
            style={{
              fontFamily: 'Lato, sans-serif',
              color: '#8B9AA8',
              fontSize: '0.75rem',
            }}
          >
            Rent
          </p>
          <div className="flex items-center gap-2">
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#003E6D',
                fontWeight: 600,
              }}
            >
              ₹{facility.rent.amount}
            </p>
            {facility.rent.negotiable && (
              <Badge
                className="text-xs"
                variant="outline"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#27AE60',
                  borderColor: '#27AE60',
                }}
              >
                Negotiable
              </Badge>
            )}
          </div>
          <p
            style={{
              fontFamily: 'Lato, sans-serif',
              color: '#8B9AA8',
              fontSize: '0.75rem',
            }}
          >
            {facility.rent.unit}
          </p>
        </div>
        <div>
          <p
            className="mb-1"
            style={{
              fontFamily: 'Lato, sans-serif',
              color: '#8B9AA8',
              fontSize: '0.75rem',
            }}
          >
            Compliance
          </p>
          <Badge
            style={{
              background: `${getComplianceColor(facility.compliance.status)}15`,
              color: getComplianceColor(facility.compliance.status),
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            {facility.compliance.status === 'compliant' && (
              <CheckCircle2 className="w-3 h-3 mr-1 inline-block" />
            )}
            {facility.compliance.status === 'warning' && (
              <AlertTriangle className="w-3 h-3 mr-1 inline-block" />
            )}
            {facility.compliance.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Services */}
      <div className="mb-4">
        <p
          className="mb-2"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            color: '#003E6D',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          Services Provided
        </p>
        <div className="flex flex-wrap gap-2">
          {facility.services.slice(0, expanded ? undefined : 5).map((service, index) => (
            <Badge
              key={index}
              variant="outline"
              style={{
                fontFamily: 'Lato, sans-serif',
                fontSize: '0.8125rem',
              }}
            >
              {service}
            </Badge>
          ))}
          {!expanded && facility.services.length > 5 && (
            <Badge variant="outline">+{facility.services.length - 5} more</Badge>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="space-y-4 pt-4 border-t">
          {/* Temperature Control */}
          {facility.temperatureControl && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ThermometerSun className="w-5 h-5" style={{ color: '#2F80ED' }} />
                <p
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#003E6D',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  Temperature Controlled: {facility.temperatureRange}
                </p>
              </div>
            </div>
          )}

          {/* Security Features */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5" style={{ color: '#27AE60' }} />
              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#003E6D',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Security Features
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {facility.security.map((feature, index) => (
                <Badge
                  key={index}
                  style={{
                    background: 'rgba(39,174,96,0.1)',
                    color: '#27AE60',
                    fontFamily: 'Lato, sans-serif',
                  }}
                >
                  <Shield className="w-3 h-3 mr-1 inline-block" />
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="w-5 h-5" style={{ color: '#FFD700' }} />
              <p
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#003E6D',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Certifications
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {facility.compliance.certifications.map((cert, index) => (
                <Badge
                  key={index}
                  style={{
                    background: 'rgba(255,215,0,0.15)',
                    color: '#003E6D',
                    fontFamily: 'Lato, sans-serif',
                  }}
                >
                  <BadgeCheck className="w-3 h-3 mr-1 inline-block" />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          {/* Compliance Alerts */}
          {facility.compliance.alerts.length > 0 && (
            <div
              className="p-3 rounded-lg"
              style={{ background: 'rgba(226,179,59,0.1)' }}
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#E2B93B' }} />
                <div>
                  {facility.compliance.alerts.map((alert, index) => (
                    <p
                      key={index}
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        color: '#003E6D',
                        fontSize: '0.875rem',
                      }}
                    >
                      {alert}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Advantages (for qualified producers) */}
          {facility.qualified && facility.advantages.length > 0 && (
            <div
              className="p-4 rounded-lg"
              style={{ background: 'rgba(255,215,0,0.1)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5" style={{ color: '#FFD700' }} />
                <p
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#003E6D',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  Special Advantages (Qualified Producers Only)
                </p>
              </div>
              <ul className="space-y-1">
                {facility.advantages.map((advantage, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2"
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      color: '#5A6B7A',
                      fontSize: '0.875rem',
                    }}
                  >
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: '#27AE60' }}
                    />
                    {advantage}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Information */}
          <div>
            <p
              className="mb-2"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                color: '#003E6D',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              Contact Information
            </p>
            <div className="space-y-1">
              <p
                className="flex items-center gap-2"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  color: '#5A6B7A',
                  fontSize: '0.875rem',
                }}
              >
                <UserCheck className="w-4 h-4" />
                Manager: {facility.contact.manager}
              </p>
              <p
                className="flex items-center gap-2"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  color: '#5A6B7A',
                  fontSize: '0.875rem',
                }}
              >
                <Phone className="w-4 h-4" />
                {facility.contact.phone}
              </p>
              <p
                className="flex items-center gap-2"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  color: '#5A6B7A',
                  fontSize: '0.875rem',
                }}
              >
                <Mail className="w-4 h-4" />
                {facility.contact.email}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <Button
                className="flex-1 gap-2"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
                  color: '#003E6D',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                }}
              >
                <Calendar className="w-5 h-5" />
                Schedule Visit
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                style={{
                  border: '2px solid #FFD700',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                }}
              >
                <CheckCircle2 className="w-5 h-5" />
                Select Facility
              </Button>
            </div>
            
            {/* Assign Storage Agent Button */}
            <Button
              variant="outline"
              className="w-full gap-2"
              style={{
                border: '2px solid #2F80ED',
                color: '#2F80ED',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onAssignAgent();
              }}
            >
              <Headphones className="w-5 h-5" />
              Assign Storage Agent
              <span
                className="ml-auto"
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'Lato, sans-serif',
                  color: '#27AE60',
                }}
              >
                Get Expert Help
              </span>
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

// Packing Tab Component
const PackingTab: React.FC<any> = ({ packingMaterials, laborServices, machineRentals }) => {
  return (
    <div className="space-y-6">
      {/* Packing Materials */}
      <Card className="p-6" style={{ borderRadius: '24px' }}>
        <div className="flex items-center justify-between mb-4">
          <h3
            style={{
              fontFamily: 'Poppins, sans-serif',
              color: '#003E6D',
            }}
          >
            Packing Materials
          </h3>
          <Badge
            style={{
              background: '#FFD700',
              color: '#003E6D',
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            <Sparkles className="w-3 h-3 mr-1 inline-block" />
            AI Recommendations
          </Badge>
        </div>

        <div className="space-y-4">
          {packingMaterials.map((material) => (
            <div
              key={material.id}
              className="p-4 rounded-lg border-2 transition-all hover:shadow-md"
              style={{
                borderColor: material.aiRecommended ? '#FFD700' : 'rgba(0,62,109,0.1)',
                background: material.aiRecommended
                  ? 'linear-gradient(135deg, #FFFFFF 0%, #FFFEF0 100%)'
                  : 'white',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        color: '#003E6D',
                        fontWeight: 600,
                      }}
                    >
                      {material.name}
                    </h4>
                    {material.aiRecommended && (
                      <Badge
                        className="text-xs"
                        style={{
                          background: '#FFD700',
                          color: '#003E6D',
                          fontFamily: 'Montserrat, sans-serif',
                        }}
                      >
                        <Sparkles className="w-3 h-3 mr-1 inline-block" />
                        AI Recommended
                      </Badge>
                    )}
                    {material.anomaly && (
                      <Badge
                        className="text-xs"
                        style={{
                          background: 'rgba(231,76,60,0.15)',
                          color: '#E74C3C',
                          fontFamily: 'Montserrat, sans-serif',
                        }}
                      >
                        <AlertTriangle className="w-3 h-3 mr-1 inline-block" />
                        Price Alert
                      </Badge>
                    )}
                  </div>
                  <p
                    className="mb-2"
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      color: '#5A6B7A',
                      fontSize: '0.875rem',
                    }}
                  >
                    {material.type} • Seller: {material.seller}
                  </p>
                  {material.anomaly && (
                    <p
                      className="text-xs mb-2"
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        color: '#E74C3C',
                      }}
                    >
                      ⚠️ {material.anomaly}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {material.certifications.map((cert, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs"
                        style={{ fontFamily: 'Lato, sans-serif' }}
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <p
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        color: '#003E6D',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                      }}
                    >
                      ₹{material.price}
                    </p>
                    {material.priceTrend === 'up' && (
                      <TrendingUp className="w-5 h-5" style={{ color: '#E74C3C' }} />
                    )}
                    {material.priceTrend === 'down' && (
                      <TrendingDown className="w-5 h-5" style={{ color: '#27AE60' }} />
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      color: '#8B9AA8',
                      fontSize: '0.75rem',
                    }}
                  >
                    {material.unit}
                  </p>
                  <Button
                    size="sm"
                    className="mt-2"
                    style={{
                      background: material.aiRecommended
                        ? 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)'
                        : 'rgba(0,62,109,0.1)',
                      color: material.aiRecommended ? '#003E6D' : '#5A6B7A',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 600,
                      border: 'none',
                    }}
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Labor Services */}
      <Card className="p-6" style={{ borderRadius: '24px' }}>
        <h3
          className="mb-4"
          style={{
            fontFamily: 'Poppins, sans-serif',
            color: '#003E6D',
          }}
        >
          Labor Services
        </h3>
        <div className="space-y-3">
          {laborServices.map((service) => (
            <div
              key={service.id}
              className="p-4 rounded-lg flex items-center justify-between"
              style={{ background: 'rgba(0,62,109,0.05)' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(47,128,237,0.15)', color: '#2F80ED' }}
                >
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      color: '#003E6D',
                      fontWeight: 600,
                    }}
                  >
                    {service.provider}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      color: '#5A6B7A',
                      fontSize: '0.875rem',
                    }}
                  >
                    {service.service} • {service.workers} workers • {service.experience}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      style={{
                        background:
                          service.availability === 'immediate'
                            ? 'rgba(39,174,96,0.15)'
                            : 'rgba(226,179,59,0.15)',
                        color: service.availability === 'immediate' ? '#27AE60' : '#E2B93B',
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '0.75rem',
                      }}
                    >
                      {service.availability}
                    </Badge>
                    <span
                      className="flex items-center gap-1"
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        color: '#5A6B7A',
                        fontSize: '0.75rem',
                      }}
                    >
                      <Star className="w-3 h-3" style={{ color: '#FFD700' }} />
                      {service.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#003E6D',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                  }}
                >
                  ₹{service.rate}
                </p>
                <p
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    color: '#8B9AA8',
                    fontSize: '0.75rem',
                  }}
                >
                  {service.unit}
                </p>
                <Button size="sm" variant="outline" className="mt-2">
                  Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Machine Rentals */}
      <Card className="p-6" style={{ borderRadius: '24px' }}>
        <h3
          className="mb-4"
          style={{
            fontFamily: 'Poppins, sans-serif',
            color: '#003E6D',
          }}
        >
          Machine Rentals
        </h3>
        <div className="space-y-3">
          {machineRentals.map((machine) => (
            <div
              key={machine.id}
              className="p-4 rounded-lg flex items-center justify-between"
              style={{ background: 'rgba(0,62,109,0.05)' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(155,89,182,0.15)', color: '#9B59B6' }}
                >
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      color: '#003E6D',
                      fontWeight: 600,
                    }}
                  >
                    {machine.machine}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      color: '#5A6B7A',
                      fontSize: '0.875rem',
                    }}
                  >
                    {machine.provider} • {machine.type} • Condition: {machine.condition}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      style={{
                        background: machine.available
                          ? 'rgba(39,174,96,0.15)'
                          : 'rgba(231,76,60,0.15)',
                        color: machine.available ? '#27AE60' : '#E74C3C',
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '0.75rem',
                      }}
                    >
                      {machine.available ? 'Available' : 'Busy'}
                    </Badge>
                    {machine.operator && (
                      <Badge
                        variant="outline"
                        style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.75rem' }}
                      >
                        Operator Included
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#003E6D',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                  }}
                >
                  ₹{machine.rate}
                </p>
                <p
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    color: '#8B9AA8',
                    fontSize: '0.75rem',
                  }}
                >
                  {machine.unit}
                </p>
                <Button size="sm" variant="outline" className="mt-2" disabled={!machine.available}>
                  Rent
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Sell Tab Component  
const SellTab: React.FC<any> = ({ commissionAgents, selectedPath, setSelectedPath, onAssignAgent }) => {
  const sellOptions = [
    {
      id: 'store',
      name: 'Store First, Sell Later',
      description: 'Store your commodity and sell when market is favorable',
      icon: <Warehouse className="w-8 h-8" />,
      color: '#2F80ED',
      benefits: ['Wait for better prices', 'Seasonal advantage', 'Risk management'],
    },
    {
      id: 'direct',
      name: 'Direct Sale',
      description: 'Sell directly to buyers at current market price',
      icon: <ShoppingCart className="w-8 h-8" />,
      color: '#27AE60',
      benefits: ['Immediate payment', 'No storage costs', 'Quick transaction'],
    },
    {
      id: 'agent',
      name: 'Commission Agent',
      description: 'Let expert agents sell at market yards for best prices',
      icon: <UserCheck className="w-8 h-8" />,
      color: '#FFD700',
      benefits: ['Expert negotiation', 'Market connections', 'Better prices'],
    },
    {
      id: 'marketplace',
      name: 'Online Marketplace',
      description: 'List on digital marketplace and reach wider buyers',
      icon: <Store className="w-8 h-8" />,
      color: '#9B59B6',
      benefits: ['Wide reach', 'Competitive pricing', 'Transparent process'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Sell Options */}
      <Card className="p-6" style={{ borderRadius: '24px' }}>
        <h3
          className="mb-4"
          style={{
            fontFamily: 'Poppins, sans-serif',
            color: '#003E6D',
          }}
        >
          Choose Your Selling Path
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sellOptions.map((option) => (
            <div
              key={option.id}
              className={`p-6 rounded-xl cursor-pointer transition-all ${
                selectedPath === option.id ? 'ring-2' : ''
              }`}
              style={{
                background:
                  selectedPath === option.id
                    ? `${option.color}15`
                    : 'rgba(0,62,109,0.05)',
                ringColor: option.color,
              }}
              onClick={() => setSelectedPath(option.id as any)}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: `${option.color}20`, color: option.color }}
              >
                {option.icon}
              </div>
              <h4
                className="mb-2"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#003E6D',
                  fontWeight: 600,
                }}
              >
                {option.name}
              </h4>
              <p
                className="mb-4"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  color: '#5A6B7A',
                  fontSize: '0.875rem',
                }}
              >
                {option.description}
              </p>
              <div className="space-y-1">
                {option.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: option.color }}
                    />
                    <span
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        color: '#5A6B7A',
                        fontSize: '0.8125rem',
                      }}
                    >
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
              {selectedPath === option.id && (
                <Button
                  className="w-full mt-4 gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${option.color} 0%, ${option.color}CC 100%)`,
                    color: 'white',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    border: 'none',
                  }}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Assign Sales Agent - Always Visible */}
      <Card
        className="p-6"
        style={{
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%)',
          border: '2px solid #2F80ED',
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)',
              }}
            >
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3
                className="mb-2"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#003E6D',
                  fontWeight: 600,
                }}
              >
                Need Expert Help with Sales?
              </h3>
              <p
                className="mb-3"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  color: '#5A6B7A',
                  fontSize: '0.875rem',
                }}
              >
                Our specialized sales agents can help you with commission negotiation, market yard connections, pricing optimization, and buyer engagement. Get personalized assistance tailored to your commodity and location.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  variant="outline"
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '0.75rem',
                  }}
                >
                  <CheckCircle2 className="w-3 h-3 mr-1 inline-block" style={{ color: '#27AE60' }} />
                  Commission Optimization
                </Badge>
                <Badge
                  variant="outline"
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '0.75rem',
                  }}
                >
                  <CheckCircle2 className="w-3 h-3 mr-1 inline-block" style={{ color: '#27AE60' }} />
                  Market Yard Connections
                </Badge>
                <Badge
                  variant="outline"
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '0.75rem',
                  }}
                >
                  <CheckCircle2 className="w-3 h-3 mr-1 inline-block" style={{ color: '#27AE60' }} />
                  Buyer Engagement
                </Badge>
                <Badge
                  variant="outline"
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    fontSize: '0.75rem',
                  }}
                >
                  <CheckCircle2 className="w-3 h-3 mr-1 inline-block" style={{ color: '#27AE60' }} />
                  Price Negotiation
                </Badge>
              </div>
              <Button
                className="gap-2"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
                  color: '#003E6D',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  border: 'none',
                }}
                onClick={onAssignAgent}
              >
                <UserPlus className="w-5 h-5" />
                Assign Sales Agent
                <Badge
                  style={{
                    background: '#27AE60',
                    color: 'white',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.6875rem',
                    marginLeft: '0.5rem',
                  }}
                >
                  3 Available Now
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Commission Agents (if agent path selected) */}
      {selectedPath === 'agent' && (
        <Card className="p-6" style={{ borderRadius: '24px' }}>
          <div className="flex items-center justify-between mb-4">
            <h3
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#003E6D',
              }}
            >
              Available Commission Agents
            </h3>
            <Badge
              style={{
                background: '#FFD700',
                color: '#003E6D',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              <Sparkles className="w-3 h-3 mr-1 inline-block" />
              AI Ranked
            </Badge>
          </div>

          <div className="space-y-4">
            {commissionAgents.map((agent) => (
              <div
                key={agent.id}
                className="p-5 rounded-lg border-2"
                style={{
                  borderColor: agent.aiScore > 90 ? '#FFD700' : 'rgba(0,62,109,0.1)',
                  background:
                    agent.aiScore > 90
                      ? 'linear-gradient(135deg, #FFFFFF 0%, #FFFEF0 100%)'
                      : 'white',
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          color: '#003E6D',
                          fontWeight: 600,
                        }}
                      >
                        {agent.name}
                      </h4>
                      {agent.aiScore > 90 && (
                        <Badge
                          style={{
                            background: '#FFD700',
                            color: '#003E6D',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '0.75rem',
                          }}
                        >
                          <Zap className="w-3 h-3 mr-1 inline-block" />
                          Best Match
                        </Badge>
                      )}
                      <Badge
                        style={{
                          background:
                            agent.availability === 'available'
                              ? 'rgba(39,174,96,0.15)'
                              : 'rgba(226,179,59,0.15)',
                          color: agent.availability === 'available' ? '#27AE60' : '#E2B93B',
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '0.75rem',
                        }}
                      >
                        {agent.availability}
                      </Badge>
                    </div>
                    <p
                      className="mb-2"
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        color: '#5A6B7A',
                        fontSize: '0.875rem',
                      }}
                    >
                      {agent.market} • {agent.deals} successful deals
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {agent.specialization.map((spec, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.75rem' }}
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className="flex items-center gap-1"
                        style={{
                          fontFamily: 'Lato, sans-serif',
                          color: '#5A6B7A',
                          fontSize: '0.875rem',
                        }}
                      >
                        <Star className="w-4 h-4" style={{ color: '#FFD700' }} />
                        {agent.rating} Rating
                      </span>
                      <span
                        style={{
                          fontFamily: 'Lato, sans-serif',
                          color: '#5A6B7A',
                          fontSize: '0.875rem',
                        }}
                      >
                        Commission: {agent.commission}%
                      </span>
                      <span
                        className="flex items-center gap-1"
                        style={{
                          fontFamily: 'Lato, sans-serif',
                          color: '#5A6B7A',
                          fontSize: '0.875rem',
                        }}
                      >
                        <Sparkles className="w-4 h-4" style={{ color: '#FFD700' }} />
                        AI Score: {agent.aiScore}/100
                      </span>
                    </div>
                  </div>
                  <Button
                    className="gap-2"
                    style={{
                      background:
                        agent.availability === 'available'
                          ? 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)'
                          : 'rgba(0,62,109,0.1)',
                      color: agent.availability === 'available' ? '#003E6D' : '#8B9AA8',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 700,
                      border: 'none',
                    }}
                    disabled={agent.availability !== 'available'}
                  >
                    {agent.availability === 'available' ? 'Engage Agent' : 'Busy'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

// AI Insights Tab Component
const AIInsightsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card
        className="p-6"
        style={{
          borderRadius: '24px',
          border: '2px solid rgba(255,215,0,0.3)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFEF0 100%)',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)' }}
          >
            <Sparkles className="w-8 h-8" style={{ color: '#003E6D' }} />
          </div>
          <div>
            <h2
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#003E6D',
              }}
            >
              AI-Powered Insights
            </h2>
            <p
              style={{
                fontFamily: 'Lato, sans-serif',
                color: '#5A6B7A',
              }}
            >
              Real-time market intelligence and anomaly detection
            </p>
          </div>
        </div>

        {/* Market Insights */}
        <div className="space-y-4">
          <div
            className="p-5 rounded-lg"
            style={{ background: 'rgba(47,128,237,0.1)' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <TrendingUp className="w-6 h-6 flex-shrink-0" style={{ color: '#2F80ED' }} />
              <div>
                <h4
                  className="mb-1"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#003E6D',
                    fontWeight: 600,
                  }}
                >
                  Price Trend Alert
                </h4>
                <p
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    color: '#5A6B7A',
                    fontSize: '0.875rem',
                  }}
                >
                  Wheat prices expected to rise 8-12% in next 2 weeks due to reduced supply from
                  neighboring states.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge
                style={{
                  background: '#27AE60',
                  color: 'white',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                Recommendation: Store for 2 weeks
              </Badge>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{ background: 'rgba(231,76,60,0.1)' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" style={{ color: '#E74C3C' }} />
              <div>
                <h4
                  className="mb-1"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#003E6D',
                    fontWeight: 600,
                  }}
                >
                  Storage Cost Anomaly Detected
                </h4>
                <p
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    color: '#5A6B7A',
                    fontSize: '0.875rem',
                  }}
                >
                  Cold storage rates in Amritsar are 18% higher than regional average. Consider
                  facilities in Ludhiana or Jalandhar.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge
                style={{
                  background: '#E74C3C',
                  color: 'white',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                Potential savings: ₹8,500/month
              </Badge>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{ background: 'rgba(39,174,96,0.1)' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: '#27AE60' }} />
              <div>
                <h4
                  className="mb-1"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#003E6D',
                    fontWeight: 600,
                  }}
                >
                  Best Commission Agent Match
                </h4>
                <p
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    color: '#5A6B7A',
                    fontSize: '0.875rem',
                  }}
                >
                  Based on your wheat quality and quantity, Ramesh Traders has 95% success rate for
                  similar lots with 12% better pricing.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge
                style={{
                  background: '#27AE60',
                  color: 'white',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                Expected premium: ₹450-620 per quintal
              </Badge>
            </div>
          </div>

          <div
            className="p-5 rounded-lg"
            style={{ background: 'rgba(226,179,59,0.1)' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <Info className="w-6 h-6 flex-shrink-0" style={{ color: '#E2B93B' }} />
              <div>
                <h4
                  className="mb-1"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#003E6D',
                    fontWeight: 600,
                  }}
                >
                  Regulatory Update
                </h4>
                <p
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    color: '#5A6B7A',
                    fontSize: '0.875rem',
                  }}
                >
                  New FSSAI guidelines for cold storage facilities effective from Nov 1, 2025.
                  Ensure selected facility is compliant.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge
                style={{
                  background: '#E2B93B',
                  color: 'white',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                Action: Verify compliance before booking
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Performance Metrics */}
      <Card className="p-6" style={{ borderRadius: '24px' }}>
        <h3
          className="mb-4"
          style={{
            fontFamily: 'Poppins, sans-serif',
            color: '#003E6D',
          }}
        >
          AI Performance Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(0,62,109,0.05)' }}>
            <div
              className="mb-2"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#2F80ED',
                fontSize: '2rem',
                fontWeight: 700,
              }}
            >
              94%
            </div>
            <div
              style={{
                fontFamily: 'Lato, sans-serif',
                color: '#5A6B7A',
                fontSize: '0.875rem',
              }}
            >
              Prediction Accuracy
            </div>
          </div>
          <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(0,62,109,0.05)' }}>
            <div
              className="mb-2"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#27AE60',
                fontSize: '2rem',
                fontWeight: 700,
              }}
            >
              ₹24.5K
            </div>
            <div
              style={{
                fontFamily: 'Lato, sans-serif',
                color: '#5A6B7A',
                fontSize: '0.875rem',
              }}
            >
              Avg. Savings/Month
            </div>
          </div>
          <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(0,62,109,0.05)' }}>
            <div
              className="mb-2"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#FFD700',
                fontSize: '2rem',
                fontWeight: 700,
              }}
            >
              12.8%
            </div>
            <div
              style={{
                fontFamily: 'Lato, sans-serif',
                color: '#5A6B7A',
                fontSize: '0.875rem',
              }}
            >
              Better Pricing
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StorageAndSellDashboard;
