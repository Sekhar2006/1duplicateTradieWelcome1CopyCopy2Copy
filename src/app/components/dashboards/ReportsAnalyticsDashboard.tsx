import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Warehouse,
  AlertTriangle,
  CheckCircle,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  Target,
  Award,
  Clock,
  Zap,
  FileText,
  PieChart as PieChartIcon,
  Activity,
  Globe,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '../ui/utils';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

// ==================== INTERFACES ====================

interface PortfolioMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface CommodityPerformance {
  commodity: string;
  quantity: number;
  revenue: number;
  avgPrice: number;
  growth: number;
  marketShare: number;
}

interface RiskAlert {
  id: string;
  type: 'price' | 'quality' | 'compliance' | 'payment';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  date: string;
}

// ==================== MOCK DATA ====================

const portfolioMetrics: PortfolioMetric[] = [
  {
    label: 'Total Revenue',
    value: '₹3.45M',
    change: 15.3,
    trend: 'up',
    icon: DollarSign,
    color: '#10B981'
  },
  {
    label: 'Total Inventory',
    value: '2,450 qtl',
    change: -5.2,
    trend: 'down',
    icon: Package,
    color: '#3B82F6'
  },
  {
    label: 'Active Buyers',
    value: 247,
    change: 18.7,
    trend: 'up',
    icon: Users,
    color: '#8B5CF6'
  },
  {
    label: 'Storage Utilization',
    value: '68%',
    change: 8.4,
    trend: 'up',
    icon: Warehouse,
    color: '#F59E0B'
  }
];

const commodityPerformance: CommodityPerformance[] = [
  { commodity: 'Wheat', quantity: 850, revenue: 1987000, avgPrice: 2338, growth: 12.5, marketShare: 35 },
  { commodity: 'Rice', quantity: 650, revenue: 2925000, avgPrice: 4500, growth: 18.3, marketShare: 28 },
  { commodity: 'Maize', quantity: 950, revenue: 1795500, avgPrice: 1890, growth: -3.2, marketShare: 22 },
  { commodity: 'Pulses', quantity: 400, revenue: 3140000, avgPrice: 7850, growth: 25.7, marketShare: 15 },
];

const priceTrends = [
  { month: 'May', wheat: 2180, rice: 4320, maize: 1750, pulses: 7200 },
  { month: 'Jun', wheat: 2220, rice: 4380, maize: 1780, pulses: 7350 },
  { month: 'Jul', wheat: 2250, rice: 4410, maize: 1820, pulses: 7450 },
  { month: 'Aug', wheat: 2280, rice: 4450, maize: 1850, pulses: 7600 },
  { month: 'Sep', wheat: 2310, rice: 4480, maize: 1880, pulses: 7750 },
  { month: 'Oct', wheat: 2338, rice: 4500, maize: 1890, pulses: 7850 },
];

const demandForecast = [
  { month: 'Nov', wheat: 2400, rice: 4650, maize: 1920, pulses: 8000 },
  { month: 'Dec', wheat: 2450, rice: 4750, maize: 1950, pulses: 8150 },
  { month: 'Jan', wheat: 2500, rice: 4850, maize: 2000, pulses: 8300 },
];

const riskAlerts: RiskAlert[] = [
  {
    id: 'risk1',
    type: 'price',
    severity: 'high',
    title: 'Price Volatility Alert',
    description: 'Maize prices showing 15% volatility in last 7 days. Consider hedging strategies.',
    date: '2025-10-23'
  },
  {
    id: 'risk2',
    type: 'compliance',
    severity: 'medium',
    title: 'Storage Compliance Due',
    description: 'Cold storage facility certification expires in 15 days. Renewal required.',
    date: '2025-10-22'
  },
  {
    id: 'risk3',
    type: 'payment',
    severity: 'high',
    title: 'Payment Delay',
    description: '3 buyers with pending payments exceeding 30 days. Follow-up recommended.',
    date: '2025-10-21'
  },
  {
    id: 'risk4',
    type: 'quality',
    severity: 'low',
    title: 'Quality Check Pending',
    description: '5 lots awaiting quality verification for grade certification.',
    date: '2025-10-20'
  }
];

const agentPerformance = [
  { name: 'Harpreet Singh', sales: 156, revenue: 8450000, commission: 211250, rating: 4.9, successRate: 94 },
  { name: 'Meena Patel', sales: 234, revenue: 12340000, commission: 246800, rating: 4.7, successRate: 91 },
  { name: 'Rajesh Kumar', sales: 189, revenue: 9870000, commission: 296100, rating: 4.8, successRate: 92 },
  { name: 'Lakshmi Reddy', sales: 145, revenue: 7650000, commission: 114750, rating: 4.9, successRate: 96 },
];

const facilityUtilization = [
  { facility: 'Cold Storage A', capacity: 1000, used: 750, efficiency: 75 },
  { facility: 'Warehouse B', capacity: 2000, used: 1400, efficiency: 70 },
  { facility: 'Open Storage C', capacity: 500, used: 200, efficiency: 40 },
  { facility: 'Farm Storage D', capacity: 800, used: 560, efficiency: 70 },
];

const revenueBreakdown = [
  { name: 'Direct Sales', value: 2450000, percentage: 25, color: '#10B981' },
  { name: 'Commission Agent', value: 4320000, percentage: 43, color: '#3B82F6' },
  { name: 'Online Marketplace', value: 1890000, percentage: 19, color: '#8B5CF6' },
  { name: 'Contract Farming', value: 1560000, percentage: 13, color: '#F59E0B' },
];

const seasonalTrends = [
  { subject: 'Spring', A: 120, B: 110 },
  { subject: 'Summer', A: 98, B: 130 },
  { subject: 'Monsoon', A: 86, B: 85 },
  { subject: 'Autumn', A: 99, B: 100 },
  { subject: 'Winter', A: 140, B: 115 },
];

// ==================== MAIN COMPONENT ====================

const ReportsAnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [timeRange, setTimeRange] = useState<string>('6months');

  return (
    <div className="p-6 space-y-6">
      
      {/* ==================== PORTFOLIO METRICS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {portfolioMetrics.map((metric, idx) => (
          <Card key={idx} className="p-6" style={{ borderLeft: `4px solid ${metric.color}` }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-600">{metric.label}</h3>
              <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
            </div>
            <p className="text-3xl font-bold mb-1">{metric.value}</p>
            <div className="flex items-center gap-1 text-sm">
              {metric.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={cn(
                "font-semibold",
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              )}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
              <span className="text-gray-600">vs last period</span>
            </div>
          </Card>
        ))}
      </div>

      {/* ==================== AI INSIGHTS ==================== */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Zap className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-3">🤖 AI-Powered Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold mb-1">Revenue Forecast</p>
                <p className="text-sm opacity-90">Expected 22% growth in Q4 based on current trends and market conditions.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold mb-1">Best Performer</p>
                <p className="text-sm opacity-90">Pulses showing highest growth (25.7%). Consider increasing inventory.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold mb-1">Optimization</p>
                <p className="text-sm opacity-90">Open Storage C underutilized (40%). Reallocate to maximize efficiency.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ==================== TIME RANGE SELECTOR ==================== */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-700">Time Range:</span>
          </div>
          <div className="flex gap-2">
            {['1month', '3months', '6months', '1year'].map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? 'default' : 'outline'}
                onClick={() => setTimeRange(range)}
              >
                {range === '1month' ? '1M' : range === '3months' ? '3M' : range === '6months' ? '6M' : '1Y'}
              </Button>
            ))}
            <Button size="sm" variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export All
            </Button>
          </div>
        </div>
      </Card>

      {/* ==================== MAIN TABS ==================== */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
          <TabsTrigger value="risks">Risk Alerts</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
        </TabsList>

        {/* ==================== OVERVIEW TAB ==================== */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Price Trends */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Price Trends (6 Months)</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                  <YAxis style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="wheat" stroke="#10B981" strokeWidth={2} name="Wheat" />
                  <Line type="monotone" dataKey="rice" stroke="#3B82F6" strokeWidth={2} name="Rice" />
                  <Line type="monotone" dataKey="maize" stroke="#F59E0B" strokeWidth={2} name="Maize" />
                  <Line type="monotone" dataKey="pulses" stroke="#8B5CF6" strokeWidth={2} name="Pulses" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Revenue Breakdown */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Revenue by Method</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Demand Forecast */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">AI Demand Forecast (Next 3 Months)</h3>
              <Badge className="bg-purple-100 text-purple-800">
                <Zap className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={demandForecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="wheat" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Wheat" />
                <Area type="monotone" dataKey="rice" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Rice" />
                <Area type="monotone" dataKey="maize" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} name="Maize" />
                <Area type="monotone" dataKey="pulses" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} name="Pulses" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* ==================== COMMODITIES TAB ==================== */}
        <TabsContent value="commodities" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Commodity Performance Analysis</h3>
            <div className="space-y-4">
              {commodityPerformance.map((commodity) => (
                <Card key={commodity.commodity} className="p-6 border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold mb-1">{commodity.commodity}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={cn(
                          commodity.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        )}>
                          {commodity.growth > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {commodity.growth > 0 ? '+' : ''}{commodity.growth}% Growth
                        </Badge>
                        <Badge variant="outline">
                          {commodity.marketShare}% Market Share
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">Total Quantity</p>
                      <p className="text-xl font-bold text-blue-600">{commodity.quantity} qtl</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-xl font-bold text-green-600">₹{(commodity.revenue / 1000000).toFixed(2)}M</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">Avg Price</p>
                      <p className="text-xl font-bold text-purple-600">₹{commodity.avgPrice}/qtl</p>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Market Share</span>
                      <span className="font-semibold">{commodity.marketShare}%</span>
                    </div>
                    <Progress value={commodity.marketShare} className="h-2" />
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Seasonal Trends */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Seasonal Performance Radar</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={seasonalTrends}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="This Year" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Radar name="Last Year" dataKey="B" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* ==================== RISK ALERTS TAB ==================== */}
        <TabsContent value="risks" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Risk Alerts & Warnings</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            <div className="space-y-3">
              {riskAlerts.map((alert) => (
                <Card key={alert.id} className={cn(
                  "p-4 border-l-4",
                  alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                  alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                )}>
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-2 rounded-full",
                      alert.severity === 'high' ? 'bg-red-100' :
                      alert.severity === 'medium' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    )}>
                      <AlertTriangle className={cn(
                        "w-5 h-5",
                        alert.severity === 'high' ? 'text-red-600' :
                        alert.severity === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      )} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <Badge className={cn(
                          alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        )}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                      <p className="text-xs text-gray-500">{alert.date}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Resolve
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ==================== AGENTS TAB ==================== */}
        <TabsContent value="agents" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Agent Performance Metrics</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Agent Name</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Total Sales</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Revenue</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Commission Paid</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Rating</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Success Rate</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {agentPerformance.map((agent) => (
                    <tr key={agent.name} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">{agent.name}</td>
                      <td className="px-4 py-3 text-right">{agent.sales}</td>
                      <td className="px-4 py-3 text-right font-semibold">₹{(agent.revenue / 1000000).toFixed(2)}M</td>
                      <td className="px-4 py-3 text-right">₹{(agent.commission / 1000).toFixed(0)}K</td>
                      <td className="px-4 py-3 text-center">
                        <Badge className="bg-yellow-100 text-yellow-800">
                          ⭐ {agent.rating}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center font-semibold">{agent.successRate}%</td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={cn(
                              "h-2 rounded-full",
                              agent.successRate >= 95 ? "bg-green-500" :
                              agent.successRate >= 90 ? "bg-blue-500" :
                              "bg-yellow-500"
                            )}
                            style={{ width: `${agent.successRate}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Agent Comparison Chart */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Agent Revenue Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={agentPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#3B82F6" name="Revenue (₹)" />
                <Bar dataKey="commission" fill="#F59E0B" name="Commission (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* ==================== FACILITIES TAB ==================== */}
        <TabsContent value="facilities" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Storage Facility Utilization</h3>
            <div className="space-y-4">
              {facilityUtilization.map((facility) => (
                <div key={facility.facility} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Warehouse className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">{facility.facility}</h4>
                        <p className="text-sm text-gray-600">
                          {facility.used} / {facility.capacity} qtl
                        </p>
                      </div>
                    </div>
                    <Badge className={cn(
                      facility.efficiency >= 70 ? 'bg-green-100 text-green-800' :
                      facility.efficiency >= 50 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    )}>
                      {facility.efficiency}% Efficiency
                    </Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Utilization</span>
                      <span className="font-semibold">{((facility.used / facility.capacity) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={(facility.used / facility.capacity) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Facility Efficiency Chart */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Facility Efficiency Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={facilityUtilization}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="facility" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="efficiency" fill="#10B981" name="Efficiency (%)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAnalyticsDashboard;
