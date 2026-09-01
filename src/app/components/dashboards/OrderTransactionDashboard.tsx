import React, { useState } from 'react';
import {
  FileText,
  DollarSign,
  CreditCard,
  Wallet,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Filter,
  Search,
  RefreshCw,
  Receipt,
  FileCheck,
  Truck,
  Package,
  ArrowRight,
  BarChart3,
  Plus,
  Mail,
  Printer,
  Zap,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '../ui/utils';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// ==================== INTERFACES ====================

interface Order {
  id: string;
  commodity: string;
  quantity: number;
  pricePerUnit: number;
  buyer: string;
  seller: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Completed' | 'Cancelled';
  orderDate: string;
  deliveryDate?: string;
  paymentStatus: 'Pending' | 'Partial' | 'Paid' | 'Refunded';
  paymentMethod: 'UPI' | 'Bank Transfer' | 'Cash' | 'Credit';
  tracking?: string;
}

interface Transaction {
  id: string;
  orderId: string;
  type: 'Credit' | 'Debit';
  amount: number;
  status: 'Success' | 'Pending' | 'Failed';
  date: string;
  method: string;
  description: string;
}

interface WalletData {
  balance: number;
  pendingCredits: number;
  totalEarned: number;
  totalSpent: number;
}

interface Invoice {
  id: string;
  orderId: string;
  date: string;
  amount: number;
  status: 'Generated' | 'Sent' | 'Paid';
  dueDate: string;
}

// ==================== MOCK DATA ====================

const orders: Order[] = [
  {
    id: 'ORD-2025-001',
    commodity: 'Wheat (Grade A)',
    quantity: 50,
    pricePerUnit: 2340,
    buyer: 'ABC Mills Pvt Ltd',
    seller: 'Harpreet Singh Farm',
    status: 'Completed',
    orderDate: '2025-10-15',
    deliveryDate: '2025-10-18',
    paymentStatus: 'Paid',
    paymentMethod: 'Bank Transfer',
    tracking: 'TRK-45678'
  },
  {
    id: 'ORD-2025-002',
    commodity: 'Rice (Basmati)',
    quantity: 75,
    pricePerUnit: 4500,
    buyer: 'XYZ Traders',
    seller: 'Harpreet Singh Farm',
    status: 'Shipped',
    orderDate: '2025-10-20',
    deliveryDate: '2025-10-25',
    paymentStatus: 'Partial',
    paymentMethod: 'UPI',
    tracking: 'TRK-45679'
  },
  {
    id: 'ORD-2025-003',
    commodity: 'Maize',
    quantity: 100,
    pricePerUnit: 1890,
    buyer: 'FarmDirect Buyers',
    seller: 'Harpreet Singh Farm',
    status: 'Processing',
    orderDate: '2025-10-22',
    paymentStatus: 'Pending',
    paymentMethod: 'Credit',
    tracking: 'TRK-45680'
  },
  {
    id: 'ORD-2025-004',
    commodity: 'Pulses (Moong)',
    quantity: 30,
    pricePerUnit: 7850,
    buyer: 'Premium Foods Ltd',
    seller: 'Harpreet Singh Farm',
    status: 'Pending',
    orderDate: '2025-10-23',
    paymentStatus: 'Pending',
    paymentMethod: 'Bank Transfer'
  },
];

const transactions: Transaction[] = [
  {
    id: 'TXN-001',
    orderId: 'ORD-2025-001',
    type: 'Credit',
    amount: 117000,
    status: 'Success',
    date: '2025-10-18',
    method: 'Bank Transfer',
    description: 'Payment received for Wheat order'
  },
  {
    id: 'TXN-002',
    orderId: 'ORD-2025-002',
    type: 'Credit',
    amount: 168750,
    status: 'Pending',
    date: '2025-10-22',
    method: 'UPI',
    description: 'Partial payment for Rice order'
  },
  {
    id: 'TXN-003',
    orderId: 'ORD-2025-003',
    type: 'Debit',
    amount: 5000,
    status: 'Success',
    date: '2025-10-22',
    method: 'Wallet',
    description: 'Platform fee deducted'
  },
  {
    id: 'TXN-004',
    orderId: 'ORD-2025-004',
    type: 'Credit',
    amount: 235500,
    status: 'Pending',
    date: '2025-10-23',
    method: 'Bank Transfer',
    description: 'Payment pending for Pulses order'
  },
];

const wallet: WalletData = {
  balance: 245000,
  pendingCredits: 404250,
  totalEarned: 3450000,
  totalSpent: 285000
};

const invoices: Invoice[] = [
  { id: 'INV-001', orderId: 'ORD-2025-001', date: '2025-10-15', amount: 117000, status: 'Paid', dueDate: '2025-10-25' },
  { id: 'INV-002', orderId: 'ORD-2025-002', date: '2025-10-20', amount: 337500, status: 'Sent', dueDate: '2025-10-30' },
  { id: 'INV-003', orderId: 'ORD-2025-003', date: '2025-10-22', amount: 189000, status: 'Generated', dueDate: '2025-11-01' },
  { id: 'INV-004', orderId: 'ORD-2025-004', date: '2025-10-23', amount: 235500, status: 'Generated', dueDate: '2025-11-02' },
];

const monthlyData = [
  { month: 'May', orders: 45, revenue: 2350000 },
  { month: 'Jun', orders: 52, revenue: 2780000 },
  { month: 'Jul', orders: 48, revenue: 2540000 },
  { month: 'Aug', orders: 58, revenue: 3120000 },
  { month: 'Sep', orders: 54, revenue: 2890000 },
  { month: 'Oct', orders: 63, revenue: 3450000 },
];

const paymentMethodData = [
  { month: 'May', upi: 850000, bank: 1200000, cash: 250000, credit: 50000 },
  { month: 'Jun', upi: 980000, bank: 1400000, cash: 300000, credit: 100000 },
  { month: 'Jul', upi: 920000, bank: 1300000, cash: 270000, credit: 50000 },
  { month: 'Aug', upi: 1150000, bank: 1600000, cash: 320000, credit: 50000 },
  { month: 'Sep', upi: 1050000, bank: 1500000, cash: 290000, credit: 50000 },
  { month: 'Oct', upi: 1280000, bank: 1800000, cash: 320000, credit: 50000 },
];

// ==================== MAIN COMPONENT ====================

const OrderTransactionDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('orders');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => ['Pending', 'Processing', 'Shipped'].includes(o.status)).length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const pendingPayments = orders.filter(o => o.paymentStatus === 'Pending' || o.paymentStatus === 'Partial').length;

  return (
    <div className="p-6 space-y-6">
      
      {/* ==================== STATS CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-cyan-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Wallet Balance</h3>
            <Wallet className="w-5 h-5 text-cyan-600" />
          </div>
          <p className="text-3xl font-bold">₹{(wallet.balance / 1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-600 mt-1">₹{(wallet.pendingCredits / 1000).toFixed(0)}K pending</p>
        </Card>

        <Card className="p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Active Orders</h3>
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">{activeOrders}</p>
          <p className="text-sm text-gray-600 mt-1">Out of {totalOrders} total</p>
        </Card>

        <Card className="p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Completed</h3>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold">{completedOrders}</p>
          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +18% vs last month
          </p>
        </Card>

        <Card className="p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Pending Payments</h3>
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold">{pendingPayments}</p>
          <p className="text-sm text-gray-600 mt-1">Requires attention</p>
        </Card>
      </div>

      {/* ==================== WALLET OVERVIEW ==================== */}
      <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-6">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Wallet className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-3">💰 Wallet Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm opacity-90 mb-1">Current Balance</p>
                <p className="text-2xl font-bold">₹{(wallet.balance / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm opacity-90 mb-1">Pending Credits</p>
                <p className="text-2xl font-bold">₹{(wallet.pendingCredits / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm opacity-90 mb-1">Total Earned</p>
                <p className="text-2xl font-bold">₹{(wallet.totalEarned / 1000000).toFixed(2)}M</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm opacity-90 mb-1">Total Spent</p>
                <p className="text-2xl font-bold">₹{(wallet.totalSpent / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ==================== MAIN TABS ==================== */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* ==================== ORDERS TAB ==================== */}
        <TabsContent value="orders" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">All Orders</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {orders
                .filter(order => 
                  statusFilter === 'all' || order.status.toLowerCase() === statusFilter
                )
                .filter(order =>
                  searchQuery === '' ||
                  order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  order.commodity.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((order) => (
                  <Card key={order.id} className="p-6 border hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold">{order.id}</h4>
                          <Badge className={cn(
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          )}>
                            {order.status}
                          </Badge>
                          <Badge className={cn(
                            order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                            order.paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                            order.paymentStatus === 'Refunded' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          )}>
                            Payment: {order.paymentStatus}
                          </Badge>
                        </div>
                        <p className="text-lg font-semibold text-gray-900 mb-2">{order.commodity}</p>
                        <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600">Quantity</p>
                            <p className="font-semibold">{order.quantity} qtl</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Price/Unit</p>
                            <p className="font-semibold">₹{order.pricePerUnit}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Amount</p>
                            <p className="font-semibold text-green-600">₹{(order.quantity * order.pricePerUnit).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Payment Method</p>
                            <p className="font-semibold">{order.paymentMethod}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span>Buyer: <span className="font-semibold text-gray-900">{order.buyer}</span></span>
                          <span>Order Date: <span className="font-semibold text-gray-900">{order.orderDate}</span></span>
                          {order.deliveryDate && (
                            <span>Delivery: <span className="font-semibold text-gray-900">{order.deliveryDate}</span></span>
                          )}
                          {order.tracking && (
                            <span className="flex items-center gap-1">
                              <Truck className="w-4 h-4" />
                              Tracking: <span className="font-mono font-semibold text-gray-900">{order.tracking}</span>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline" className="gap-2">
                          <Eye className="w-4 h-4" />
                          View Details
                        </Button>
                        {order.tracking && (
                          <Button size="sm" variant="outline" className="gap-2">
                            <Truck className="w-4 h-4" />
                            Track Order
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="gap-2">
                          <Download className="w-4 h-4" />
                          Invoice
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar for Order Status */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-2">
                        <span className={order.status !== 'Pending' ? 'text-green-600 font-semibold' : ''}>Pending</span>
                        <span className={order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' || order.status === 'Completed' ? 'text-green-600 font-semibold' : ''}>Processing</span>
                        <span className={order.status === 'Shipped' || order.status === 'Delivered' || order.status === 'Completed' ? 'text-green-600 font-semibold' : ''}>Shipped</span>
                        <span className={order.status === 'Delivered' || order.status === 'Completed' ? 'text-green-600 font-semibold' : ''}>Delivered</span>
                        <span className={order.status === 'Completed' ? 'text-green-600 font-semibold' : ''}>Completed</span>
                      </div>
                      <Progress 
                        value={
                          order.status === 'Pending' ? 20 :
                          order.status === 'Processing' ? 40 :
                          order.status === 'Shipped' ? 60 :
                          order.status === 'Delivered' ? 80 :
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  </Card>
                ))}
            </div>
          </Card>
        </TabsContent>

        {/* ==================== TRANSACTIONS TAB ==================== */}
        <TabsContent value="transactions" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Transaction History</h3>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="credit">Credits</SelectItem>
                    <SelectItem value="debit">Debits</SelectItem>
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
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Transaction ID</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Order ID</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Type</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Method</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-sm">{txn.id}</td>
                      <td className="px-4 py-3 font-mono text-sm">{txn.orderId}</td>
                      <td className="px-4 py-3">
                        <Badge className={cn(
                          txn.type === 'Credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        )}>
                          {txn.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        <span className={txn.type === 'Credit' ? 'text-green-600' : 'text-red-600'}>
                          {txn.type === 'Credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{txn.method}</td>
                      <td className="px-4 py-3">
                        <Badge className={cn(
                          txn.status === 'Success' ? 'bg-green-100 text-green-800' :
                          txn.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        )}>
                          {txn.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">{txn.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{txn.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Plus className="w-6 h-6" />
                <span>Add Funds</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <ArrowRight className="w-6 h-6" />
                <span>Withdraw</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <Download className="w-6 h-6" />
                <span>Statement</span>
              </Button>
              <Button className="h-20 flex-col gap-2" variant="outline">
                <CreditCard className="w-6 h-6" />
                <span>Payment Methods</span>
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* ==================== INVOICES TAB ==================== */}
        <TabsContent value="invoices" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Invoices</h3>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Generate Invoice
              </Button>
            </div>

            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Receipt className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold font-mono">{invoice.id}</p>
                        <Badge className={cn(
                          invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'Sent' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        )}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Order: {invoice.orderId}</p>
                      <p className="text-sm text-gray-600">Date: {invoice.date} • Due: {invoice.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="text-xl font-bold">₹{invoice.amount.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Mail className="w-4 h-4" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ==================== ANALYTICS TAB ==================== */}
        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Orders & Revenue Trend */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Orders & Revenue (6 Months)</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                  <YAxis yAxisId="left" style={{ fontSize: '12px' }} />
                  <YAxis yAxisId="right" orientation="right" style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} name="Orders" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="Revenue (₹)" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Payment Methods */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Payment Methods (6 Months)</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={paymentMethodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                  <YAxis style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="upi" fill="#8B5CF6" name="UPI" />
                  <Bar dataKey="bank" fill="#3B82F6" name="Bank Transfer" />
                  <Bar dataKey="cash" fill="#10B981" name="Cash" />
                  <Bar dataKey="credit" fill="#F59E0B" name="Credit" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Summary Statistics */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Financial Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">₹{(orders.reduce((sum, o) => sum + (o.quantity * o.pricePerUnit), 0) / 1000000).toFixed(2)}M</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold">₹{(orders.reduce((sum, o) => sum + (o.quantity * o.pricePerUnit), 0) / orders.length / 1000).toFixed(0)}K</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold">₹{(wallet.pendingCredits / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderTransactionDashboard;
