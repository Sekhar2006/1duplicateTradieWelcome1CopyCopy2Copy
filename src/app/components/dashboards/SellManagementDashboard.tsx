import React, { useState } from 'react';
import {
  ShoppingCart,
  TrendingUp,
  Users,
  Globe,
  FileCheck,
  DollarSign,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Calendar,
  MapPin,
  Target,
  Award,
  Zap,
  Plus,
  Filter,
  Search,
  Download,
  RefreshCw,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '../ui/utils';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// ==================== INTERFACES ====================

interface SellMethod {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  commission: string;
  timeToSale: string;
  totalSales: number;
  revenue: number;
  activeListings: number;
  color: string;
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
  totalSales: number;
  revenue: number;
  contact: {
    phone: string;
    email: string;
  };
}

interface Sale {
  id: string;
  commodity: string;
  quantity: number;
  pricePerUnit: number;
  method: string;
  buyer: string;
  status: 'Listed' | 'Negotiating' | 'Confirmed' | 'Completed';
  date: string;
  agent?: string;
}

// ==================== MOCK DATA ====================

const sellMethods: SellMethod[] = [
  {
    id: 'direct',
    name: 'Direct Sale',
    icon: ShoppingCart,
    description: 'Sell directly at your production site',
    commission: '0%',
    timeToSale: '1-3 days',
    totalSales: 45,
    revenue: 2450000,
    activeListings: 12,
    color: '#10B981'
  },
  {
    id: 'commission',
    name: 'Commission Agent',
    icon: Users,
    description: 'Sell through market yard agents',
    commission: '2-3%',
    timeToSale: '2-5 days',
    totalSales: 78,
    revenue: 4320000,
    activeListings: 18,
    color: '#3B82F6'
  },
  {
    id: 'online',
    name: 'Online Marketplace',
    icon: Globe,
    description: 'List on TRADIE platform',
    commission: '3%',
    timeToSale: '3-10 days',
    totalSales: 34,
    revenue: 1890000,
    activeListings: 8,
    color: '#8B5CF6'
  },
  {
    id: 'contract',
    name: 'Contract Farming',
    icon: FileCheck,
    description: 'Pre-arranged forward sale',
    commission: '1.5%',
    timeToSale: 'Pre-arranged',
    totalSales: 23,
    revenue: 1560000,
    activeListings: 5,
    color: '#F59E0B'
  }
];

const agents: Agent[] = [
  {
    id: 'agent1',
    name: 'Harpreet Singh',
    specialization: 'Cold Storage & Premium Grains',
    rating: 4.9,
    commission: 2.5,
    workload: 'Light',
    availability: 'Available',
    languages: ['Punjabi', 'Hindi', 'English'],
    successRate: 94,
    aiScore: 95,
    totalSales: 156,
    revenue: 8450000,
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
    totalSales: 234,
    revenue: 12340000,
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
    totalSales: 189,
    revenue: 9870000,
    contact: {
      phone: '+91-98765-99999',
      email: 'rajesh@tradie.com'
    }
  },
  {
    id: 'agent4',
    name: 'Lakshmi Reddy',
    specialization: 'Contract Farming Specialist',
    rating: 4.9,
    commission: 1.5,
    workload: 'Light',
    availability: 'Available',
    languages: ['Telugu', 'Hindi', 'English'],
    successRate: 96,
    aiScore: 92,
    totalSales: 145,
    revenue: 7650000,
    contact: {
      phone: '+91-98765-11111',
      email: 'lakshmi@tradie.com'
    }
  }
];

const sales: Sale[] = [
  { id: 'SALE-001', commodity: 'Wheat (Grade A)', quantity: 50, pricePerUnit: 2340, method: 'Direct Sale', buyer: 'ABC Mills Pvt Ltd', status: 'Completed', date: '2025-10-20', agent: undefined },
  { id: 'SALE-002', commodity: 'Rice (Basmati)', quantity: 75, pricePerUnit: 4500, method: 'Commission Agent', buyer: 'XYZ Traders', status: 'Confirmed', date: '2025-10-22', agent: 'Harpreet Singh' },
  { id: 'SALE-003', commodity: 'Maize', quantity: 100, pricePerUnit: 1890, method: 'Online Marketplace', buyer: 'FarmDirect Buyers', status: 'Negotiating', date: '2025-10-23', agent: 'Rajesh Kumar' },
  { id: 'SALE-004', commodity: 'Pulses (Moong)', quantity: 30, pricePerUnit: 7850, method: 'Contract Farming', buyer: 'Premium Foods Ltd', status: 'Listed', date: '2025-10-23', agent: 'Lakshmi Reddy' },
];

const revenueTrend = [
  { month: 'May', direct: 180000, commission: 320000, online: 140000, contract: 120000 },
  { month: 'Jun', direct: 220000, commission: 380000, online: 160000, contract: 140000 },
  { month: 'Jul', direct: 190000, commission: 420000, online: 150000, contract: 130000 },
  { month: 'Aug', direct: 250000, commission: 460000, online: 180000, contract: 160000 },
  { month: 'Sep', direct: 230000, commission: 440000, online: 170000, contract: 150000 },
  { month: 'Oct', direct: 280000, commission: 500000, online: 190000, contract: 170000 },
];

const methodDistribution = [
  { name: 'Commission Agent', value: 43, color: '#3B82F6' },
  { name: 'Direct Sale', value: 25, color: '#10B981' },
  { name: 'Online Marketplace', value: 19, color: '#8B5CF6' },
  { name: 'Contract Farming', value: 13, color: '#F59E0B' },
];

// ==================== MAIN COMPONENT ====================

const SellManagementDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');

  const totalRevenue = sellMethods.reduce((sum, method) => sum + method.revenue, 0);
  const totalSales = sellMethods.reduce((sum, method) => sum + method.totalSales, 0);
  const activeListings = sellMethods.reduce((sum, method) => sum + method.activeListings, 0);
  const availableAgents = agents.filter(a => a.availability === 'Available').length;

  return (
    <div className="p-6 space-y-6">
      
      {/* ==================== STATS CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Total Revenue</h3>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold">₹{(totalRevenue / 1000000).toFixed(2)}M</p>
          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +15.3% vs last month
          </p>
        </Card>

        <Card className="p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Total Sales</h3>
            <ShoppingCart className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">{totalSales}</p>
          <p className="text-sm text-gray-600 mt-1">This month</p>
        </Card>

        <Card className="p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Active Listings</h3>
            <Target className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold">{activeListings}</p>
          <p className="text-sm text-gray-600 mt-1">Across all methods</p>
        </Card>

        <Card className="p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Available Agents</h3>
            <Users className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold">{availableAgents}</p>
          <p className="text-sm text-gray-600 mt-1">Out of {agents.length} total</p>
        </Card>
      </div>

      {/* ==================== AI INSIGHTS ==================== */}
      <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Zap className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-3">🤖 AI Sales Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold mb-1">Best Method</p>
                <p className="text-sm opacity-90">Commission agents showing 25% higher prices this week. Consider switching.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold mb-1">Agent Match</p>
                <p className="text-sm opacity-90">Harpreet Singh is 95% match for your wheat grade. Assign now!</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold mb-1">Demand Alert</p>
                <p className="text-sm opacity-90">1,247 active buyers online for wheat. List on marketplace today!</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ==================== MAIN TABS ==================== */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* ==================== OVERVIEW TAB ==================== */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          
          {/* Selling Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sellMethods.map((method) => (
              <Card
                key={method.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-500"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${method.color}20` }}>
                    <method.icon className="w-6 h-6" style={{ color: method.color }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{method.name}</h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Commission</p>
                    <p className="font-semibold">{method.commission}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Time to Sale</p>
                    <p className="font-semibold">{method.timeToSale}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Active</p>
                    <p className="font-semibold">{method.activeListings}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Revenue This Month</p>
                      <p className="text-xl font-bold" style={{ color: method.color }}>
                        ₹{(method.revenue / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Sales</p>
                      <p className="text-xl font-bold">{method.totalSales}</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full" style={{ backgroundColor: method.color }}>
                  Create {method.name} Listing
                </Button>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Performance Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg Sale Price</p>
                <p className="text-2xl font-bold">₹3,145</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg Time to Sale</p>
                <p className="text-2xl font-bold">3.5 days</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Repeat Buyers</p>
                <p className="text-2xl font-bold">67%</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ==================== AGENTS TAB ==================== */}
        <TabsContent value="agents" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Commission Agents</h3>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="busy">Busy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {agents.map((agent) => (
                <Card key={agent.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-xl font-bold">{agent.name}</h4>
                        <Badge className="bg-yellow-400 text-white">
                          ⭐ AI Score: {agent.aiScore}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{agent.specialization}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {agent.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{agent.rating}</span>
                      </div>
                      <Badge className={cn(
                        agent.availability === 'Available' ? 'bg-green-100 text-green-800' :
                        agent.availability === 'Busy' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      )}>
                        {agent.availability}
                      </Badge>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Commission</p>
                      <p className="text-lg font-bold text-blue-600">{agent.commission}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Success Rate</p>
                      <p className="text-lg font-bold">{agent.successRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Sales</p>
                      <p className="text-lg font-bold">{agent.totalSales}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-lg font-bold">₹{(agent.revenue / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>

                  {/* Workload */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Current Workload</span>
                      <span className="font-semibold">{agent.workload}</span>
                    </div>
                    <Progress 
                      value={
                        agent.workload === 'Light' ? 30 :
                        agent.workload === 'Medium' ? 60 :
                        90
                      } 
                      className="h-2"
                    />
                  </div>

                  {/* AI Recommendation */}
                  {agent.availability === 'Available' && agent.aiScore > 90 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <p className="text-sm font-semibold text-green-900 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        AI Recommendation: Highly recommended for your commodity profile!
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      Assign Agent
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Phone className="w-4 h-4" />
                      Call
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ==================== SALES TAB ==================== */}
        <TabsContent value="sales" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Sales</h3>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sales</SelectItem>
                    <SelectItem value="listed">Listed</SelectItem>
                    <SelectItem value="negotiating">Negotiating</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Sale ID</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Commodity</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Quantity</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Price/Unit</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Method</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Buyer</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Agent</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-sm">{sale.id}</td>
                      <td className="px-4 py-3 font-medium">{sale.commodity}</td>
                      <td className="px-4 py-3 text-right">{sale.quantity} qtl</td>
                      <td className="px-4 py-3 text-right">₹{sale.pricePerUnit}</td>
                      <td className="px-4 py-3 text-sm">{sale.method}</td>
                      <td className="px-4 py-3 text-sm">{sale.buyer}</td>
                      <td className="px-4 py-3 text-sm">{sale.agent || '-'}</td>
                      <td className="px-4 py-3">
                        <Badge className={cn(
                          sale.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          sale.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                          sale.status === 'Negotiating' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        )}>
                          {sale.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        ₹{(sale.quantity * sale.pricePerUnit).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* ==================== ANALYTICS TAB ==================== */}
        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Revenue Trend */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Revenue by Method (6 Months)</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                  <YAxis style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="direct" fill="#10B981" name="Direct" />
                  <Bar dataKey="commission" fill="#3B82F6" name="Commission" />
                  <Bar dataKey="online" fill="#8B5CF6" name="Online" />
                  <Bar dataKey="contract" fill="#F59E0B" name="Contract" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Method Distribution */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Sales by Method</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={methodDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {methodDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Key Performance Indicators</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">₹{(totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg Sale Value</p>
                <p className="text-2xl font-bold">₹56K</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Commission Paid</p>
                <p className="text-2xl font-bold">₹{((totalRevenue * 0.025) / 1000).toFixed(0)}K</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Active Agents</p>
                <p className="text-2xl font-bold">{agents.length}</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellManagementDashboard;
