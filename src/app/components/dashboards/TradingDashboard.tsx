import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Activity,
  Eye,
  Star,
  Bell,
  Plus,
  RefreshCw,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  Zap,
  Globe,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { cn } from '../ui/utils';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// ==================== MOCK DATA ====================

const marketOverview = [
  {
    commodity: 'Wheat',
    price: 2340,
    change: 5.2,
    volume: 12450,
    trend: 'up' as const,
    volatility: 'low' as const
  },
  {
    commodity: 'Rice',
    price: 3450,
    change: -2.3,
    volume: 8930,
    trend: 'down' as const,
    volatility: 'medium' as const
  },
  {
    commodity: 'Maize',
    price: 1890,
    change: 8.7,
    volume: 15670,
    trend: 'up' as const,
    volatility: 'high' as const
  },
  {
    commodity: 'Pulses',
    price: 7850,
    change: 1.5,
    volume: 5430,
    trend: 'up' as const,
    volatility: 'low' as const
  }
];

const priceHistory = [
  { date: 'Oct 15', wheat: 2180, rice: 3520, maize: 1750 },
  { date: 'Oct 16', wheat: 2200, rice: 3510, maize: 1780 },
  { date: 'Oct 17', wheat: 2220, rice: 3480, maize: 1820 },
  { date: 'Oct 18', wheat: 2250, rice: 3460, maize: 1850 },
  { date: 'Oct 19', wheat: 2280, rice: 3445, maize: 1870 },
  { date: 'Oct 20', wheat: 2300, rice: 3430, maize: 1885 },
  { date: 'Oct 21', wheat: 2320, rice: 3455, maize: 1895 },
  { date: 'Oct 22', wheat: 2310, rice: 3465, maize: 1890 },
  { date: 'Oct 23', wheat: 2340, rice: 3450, maize: 1890 },
];

const watchlist = [
  { commodity: 'Wheat', target: 2500, current: 2340, alert: true },
  { commodity: 'Soybean', target: 4200, current: 4150, alert: false },
  { commodity: 'Cotton', target: 5800, current: 5650, alert: false },
];

const marketNews = [
  {
    id: 1,
    title: 'Wheat Demand Surge Expected',
    summary: 'Industry experts predict 12% increase in wheat demand over next quarter',
    time: '2 hours ago',
    impact: 'positive' as const,
    source: 'AI Analysis'
  },
  {
    id: 2,
    title: 'New Export Policies Announced',
    summary: 'Government eases export restrictions on rice and pulses',
    time: '5 hours ago',
    impact: 'positive' as const,
    source: 'Regulatory Update'
  },
  {
    id: 3,
    title: 'Monsoon Impact on Maize Production',
    summary: 'Late monsoon may affect maize yields in key regions',
    time: '1 day ago',
    impact: 'negative' as const,
    source: 'Weather Alert'
  }
];

const orderBook = [
  { type: 'Buy', commodity: 'Wheat', qty: 50, price: 2340, total: 117000, time: '10:45 AM' },
  { type: 'Sell', commodity: 'Rice', qty: 30, price: 3450, total: 103500, time: '10:42 AM' },
  { type: 'Buy', commodity: 'Maize', qty: 100, price: 1890, total: 189000, time: '10:38 AM' },
  { type: 'Buy', commodity: 'Wheat', qty: 75, price: 2335, total: 175125, time: '10:35 AM' },
];

// ==================== MAIN COMPONENT ====================

const TradingDashboard: React.FC = () => {
  const [selectedCommodity, setSelectedCommodity] = useState<string>('Wheat');
  const [activeTab, setActiveTab] = useState<string>('overview');

  return (
    <div className="p-6 space-y-6">
      
      {/* ==================== MARKET OVERVIEW CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketOverview.map((item) => (
          <Card
            key={item.commodity}
            className={cn(
              "p-4 cursor-pointer transition-all hover:shadow-lg",
              selectedCommodity === item.commodity ? "border-2 border-blue-500 bg-blue-50" : ""
            )}
            onClick={() => setSelectedCommodity(item.commodity)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600">{item.commodity}</p>
                <p className="text-2xl font-bold" style={{ color: '#003E6D' }}>
                  ₹{item.price}
                  <span className="text-sm font-normal text-gray-600">/qtl</span>
                </p>
              </div>
              {item.trend === 'up' ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className={cn(
                "font-semibold",
                item.change > 0 ? "text-green-600" : "text-red-600"
              )}>
                {item.change > 0 ? '+' : ''}{item.change}%
              </span>
              <Badge className={cn(
                "text-xs",
                item.volatility === 'low' ? 'bg-green-100 text-green-800' :
                item.volatility === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              )}>
                {item.volatility} volatility
              </Badge>
            </div>

            <div className="mt-2 pt-2 border-t text-xs text-gray-600">
              Volume: {item.volume.toLocaleString()} qtl
            </div>
          </Card>
        ))}
      </div>

      {/* ==================== AI INSIGHTS BANNER ==================== */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Zap className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">🤖 AI Market Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold mb-1">Best Time to Sell Wheat</p>
                <p className="text-sm opacity-90">Price expected to peak in 3-5 days. Optimal selling window approaching.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold mb-1">Rice Demand Alert</p>
                <p className="text-sm opacity-90">1,247 active buyers online. 8% premium over mandi prices possible.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold mb-1">Maize Opportunity</p>
                <p className="text-sm opacity-90">Export demand up 15%. Consider holding for better margins.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ==================== MAIN TABS ==================== */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="news">News & Trends</TabsTrigger>
          <TabsTrigger value="orders">Order Flow</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Price Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Price Trends (7 Days)</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">1W</Button>
                  <Button variant="outline" size="sm">1M</Button>
                  <Button variant="outline" size="sm">3M</Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" style={{ fontSize: '12px' }} />
                  <YAxis style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="wheat" stroke="#2563EB" strokeWidth={2} name="Wheat" />
                  <Line type="monotone" dataKey="rice" stroke="#16A34A" strokeWidth={2} name="Rice" />
                  <Line type="monotone" dataKey="maize" stroke="#F59E0B" strokeWidth={2} name="Maize" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Volume Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Trading Volume</h3>
                <Badge className="bg-blue-100 text-blue-800">
                  <Activity className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketOverview}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="commodity" style={{ fontSize: '12px' }} />
                  <YAxis style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Bar dataKey="volume" fill="#3B82F6" name="Volume (qtl)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button className="bg-green-600 hover:bg-green-700 h-20 flex-col gap-2">
                <TrendingUp className="w-6 h-6" />
                <span>Buy Now</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <TrendingDown className="w-6 h-6" />
                <span>Sell Now</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Plus className="w-6 h-6" />
                <span>Add to Watchlist</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Bell className="w-6 h-6" />
                <span>Set Alert</span>
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* WATCHLIST TAB */}
        <TabsContent value="watchlist" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">My Watchlist</h3>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Commodity
              </Button>
            </div>

            <div className="space-y-3">
              {watchlist.map((item) => (
                <div key={item.commodity} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4 flex-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <div>
                      <p className="font-semibold">{item.commodity}</p>
                      <p className="text-sm text-gray-600">Current: ₹{item.current}/qtl</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Target: ₹{item.target}/qtl</p>
                    {item.alert && (
                      <Badge className="mt-1 bg-green-100 text-green-800">
                        <Bell className="w-3 h-3 mr-1" />
                        Alert Active
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="ml-4">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* NEWS TAB */}
        <TabsContent value="news" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Market News & AI Analytics</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>

            <div className="space-y-3">
              {marketNews.map((news) => (
                <div key={news.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-full flex-shrink-0",
                      news.impact === 'positive' ? 'bg-green-100' :
                      news.impact === 'negative' ? 'bg-red-100' :
                      'bg-blue-100'
                    )}>
                      {news.impact === 'positive' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : news.impact === 'negative' ? (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      ) : (
                        <Globe className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold">{news.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {news.source}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {news.time}
                        </span>
                        <Badge className={cn(
                          "text-xs",
                          news.impact === 'positive' ? 'bg-green-100 text-green-800' :
                          news.impact === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        )}>
                          {news.impact === 'positive' ? 'Positive' :
                           news.impact === 'negative' ? 'Negative' :
                           'Neutral'} Impact
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ORDERS TAB */}
        <TabsContent value="orders" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Order Flow & Recent Trades</h3>
              <Badge className="bg-blue-100 text-blue-800">
                <Activity className="w-3 h-3 mr-1" />
                Live Updates
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Commodity</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Qty (qtl)</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Price</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Total</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {orderBook.map((order, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Badge className={cn(
                          order.type === 'Buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        )}>
                          {order.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-medium">{order.commodity}</td>
                      <td className="px-4 py-3 text-right">{order.qty}</td>
                      <td className="px-4 py-3 text-right">₹{order.price}</td>
                      <td className="px-4 py-3 text-right font-semibold">₹{order.total.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-sm text-gray-600">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradingDashboard;
