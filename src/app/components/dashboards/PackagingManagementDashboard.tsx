import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  Box,
  Container,
  Layers,
  Tag,
  Search,
  Filter,
  Plus,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Calendar,
  Truck,
  Users,
  Clock,
  BarChart3,
  FileText,
  Download,
  RefreshCw,
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
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// ==================== INTERFACES ====================

interface PackagingCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  types: PackagingType[];
  totalItems: number;
  inUse: number;
}

interface PackagingType {
  id: string;
  name: string;
  description: string;
  inStock: number;
  costPerUnit: number;
  minOrder: number;
  supplier: string;
}

interface Vendor {
  id: string;
  name: string;
  type: 'material' | 'labor' | 'machine';
  category: string;
  rating: number;
  reliability: number;
  priceRange: { min: number; max: number };
  location: string;
  availability: 'Available' | 'Busy' | 'Unavailable';
  contactPhone: string;
  contactEmail: string;
  anomaly?: {
    type: 'price_high' | 'price_low' | 'quality_issue';
    message: string;
  };
}

interface PackagingOrder {
  id: string;
  packageType: string;
  quantity: number;
  vendor: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  orderDate: string;
  expectedDelivery: string;
  totalCost: number;
}

// ==================== MOCK DATA ====================

const packagingCategories: PackagingCategory[] = [
  {
    id: 'sacks-bags',
    name: 'Sacks & Bags',
    icon: ShoppingBag,
    totalItems: 5,
    inUse: 3,
    types: [
      { id: 'jute', name: 'Jute Sacks', description: '50kg capacity, eco-friendly', inStock: 250, costPerUnit: 45, minOrder: 50, supplier: 'GreenPack Ltd' },
      { id: 'pp', name: 'PP Woven Bags', description: 'Durable, water-resistant', inStock: 500, costPerUnit: 35, minOrder: 100, supplier: 'PolySupply Co' },
      { id: 'gunny', name: 'Gunny Bags', description: 'Traditional, breathable', inStock: 180, costPerUnit: 40, minOrder: 50, supplier: 'TradiPack' },
      { id: 'plastic', name: 'Plastic Sacks', description: 'Heavy-duty plastic', inStock: 320, costPerUnit: 30, minOrder: 100, supplier: 'PlasticWorld' },
      { id: 'paper', name: 'Paper Bags', description: 'Biodegradable option', inStock: 150, costPerUnit: 25, minOrder: 100, supplier: 'EcoBag India' },
    ]
  },
  {
    id: 'rigid-containers',
    name: 'Rigid Containers',
    icon: Box,
    totalItems: 4,
    inUse: 2,
    types: [
      { id: 'plastic-crate', name: 'Plastic Crates', description: 'Stackable, reusable', inStock: 120, costPerUnit: 180, minOrder: 20, supplier: 'CrateTech' },
      { id: 'wooden-crate', name: 'Wooden Crates', description: 'Heavy-duty shipping', inStock: 80, costPerUnit: 250, minOrder: 10, supplier: 'WoodPack Pro' },
      { id: 'steel', name: 'Steel Containers', description: 'Industrial strength', inStock: 45, costPerUnit: 850, minOrder: 5, supplier: 'MetalBox Ltd' },
      { id: 'cardboard', name: 'Cardboard Boxes', description: 'Lightweight, recyclable', inStock: 600, costPerUnit: 15, minOrder: 100, supplier: 'BoxMaster' },
    ]
  },
  {
    id: 'bulk',
    name: 'Bulk Packaging',
    icon: Container,
    totalItems: 3,
    inUse: 1,
    types: [
      { id: 'fibc', name: 'FIBC/Jumbo Bags', description: '1000kg capacity', inStock: 50, costPerUnit: 450, minOrder: 10, supplier: 'BulkPack Industries' },
      { id: 'pallets', name: 'Wooden Pallets', description: 'Standard size 1200x1000mm', inStock: 200, costPerUnit: 120, minOrder: 20, supplier: 'PalletPro' },
      { id: 'bulk-bins', name: 'Bulk Bins', description: 'Large capacity storage', inStock: 35, costPerUnit: 680, minOrder: 5, supplier: 'BinMaster' },
    ]
  },
  {
    id: 'palletizing',
    name: 'Palletizing & Wrapping',
    icon: Layers,
    totalItems: 3,
    inUse: 2,
    types: [
      { id: 'stretch-wrap', name: 'Stretch Wrap', description: 'Industrial film rolls', inStock: 80, costPerUnit: 85, minOrder: 10, supplier: 'WrapTech' },
      { id: 'shrink-wrap', name: 'Shrink Wrap', description: 'Heat-seal protection', inStock: 60, costPerUnit: 95, minOrder: 10, supplier: 'ShrinkPro' },
      { id: 'pallet-collars', name: 'Pallet Collars', description: 'Height extension system', inStock: 90, costPerUnit: 45, minOrder: 20, supplier: 'CollarTech' },
    ]
  },
  {
    id: 'specialized',
    name: 'Specialized',
    icon: Package,
    totalItems: 4,
    inUse: 1,
    types: [
      { id: 'vacuum', name: 'Vacuum Packs', description: 'Extended freshness', inStock: 300, costPerUnit: 12, minOrder: 100, supplier: 'VacuumSeal Co' },
      { id: 'insulated', name: 'Insulated Packaging', description: 'Temperature control', inStock: 75, costPerUnit: 220, minOrder: 20, supplier: 'ThermalPack' },
      { id: 'mesh', name: 'Mesh Bags', description: 'Breathable for produce', inStock: 400, costPerUnit: 8, minOrder: 100, supplier: 'MeshMaster' },
      { id: 'containers', name: 'Food-grade Containers', description: 'BPA-free plastic', inStock: 250, costPerUnit: 35, minOrder: 50, supplier: 'SafePack' },
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: Tag,
    totalItems: 4,
    inUse: 3,
    types: [
      { id: 'sealing-tape', name: 'Sealing Tape', description: 'Heavy-duty adhesive', inStock: 150, costPerUnit: 25, minOrder: 20, supplier: 'TapeWorld' },
      { id: 'labels', name: 'Labels & Stickers', description: 'Custom printed', inStock: 5000, costPerUnit: 2, minOrder: 500, supplier: 'LabelPrint Pro' },
      { id: 'straps', name: 'Strapping & Ties', description: 'Secure bundling', inStock: 200, costPerUnit: 18, minOrder: 50, supplier: 'StrapTech' },
      { id: 'cushioning', name: 'Cushioning Material', description: 'Bubble wrap, foam', inStock: 100, costPerUnit: 40, minOrder: 20, supplier: 'CushionPro' },
    ]
  }
];

const vendors: Vendor[] = [
  {
    id: 'v1',
    name: 'Quality Packaging Supplies',
    type: 'material',
    category: 'Jute Sacks',
    rating: 4.7,
    reliability: 92,
    priceRange: { min: 35, max: 55 },
    location: 'Ludhiana, Punjab',
    availability: 'Available',
    contactPhone: '+91-98765-43210',
    contactEmail: 'sales@qualitypkg.com',
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
    location: 'Jalandhar, Punjab',
    availability: 'Available',
    contactPhone: '+91-98765-54321',
    contactEmail: 'booking@expresspack.com'
  },
  {
    id: 'v3',
    name: 'AgriTech Machine Rentals',
    type: 'machine',
    category: 'Packing Machines',
    rating: 4.6,
    reliability: 88,
    priceRange: { min: 2000, max: 5000 },
    location: 'Patiala, Punjab',
    availability: 'Busy',
    contactPhone: '+91-98765-99999',
    contactEmail: 'rentals@agritech.com'
  },
  {
    id: 'v4',
    name: 'BulkPack Industries',
    type: 'material',
    category: 'FIBC/Jumbo Bags',
    rating: 4.5,
    reliability: 90,
    priceRange: { min: 400, max: 500 },
    location: 'Amritsar, Punjab',
    availability: 'Available',
    contactPhone: '+91-98765-11111',
    contactEmail: 'info@bulkpack.com'
  }
];

const orders: PackagingOrder[] = [
  { id: 'ORD-001', packageType: 'Jute Sacks', quantity: 200, vendor: 'Quality Packaging Supplies', status: 'Delivered', orderDate: '2025-10-15', expectedDelivery: '2025-10-20', totalCost: 9000 },
  { id: 'ORD-002', packageType: 'PP Woven Bags', quantity: 500, vendor: 'PolySupply Co', status: 'Shipped', orderDate: '2025-10-18', expectedDelivery: '2025-10-25', totalCost: 17500 },
  { id: 'ORD-003', packageType: 'Plastic Crates', quantity: 50, vendor: 'CrateTech', status: 'Processing', orderDate: '2025-10-20', expectedDelivery: '2025-10-28', totalCost: 9000 },
  { id: 'ORD-004', packageType: 'Stretch Wrap', quantity: 30, vendor: 'WrapTech', status: 'Pending', orderDate: '2025-10-22', expectedDelivery: '2025-10-30', totalCost: 2550 },
];

const costTrendData = [
  { month: 'May', cost: 45000 },
  { month: 'Jun', cost: 52000 },
  { month: 'Jul', cost: 48000 },
  { month: 'Aug', cost: 55000 },
  { month: 'Sep', cost: 51000 },
  { month: 'Oct', cost: 58000 },
];

const categoryDistribution = [
  { name: 'Sacks & Bags', value: 35, color: '#3B82F6' },
  { name: 'Rigid Containers', value: 25, color: '#10B981' },
  { name: 'Bulk Packaging', value: 15, color: '#F59E0B' },
  { name: 'Specialized', value: 12, color: '#8B5CF6' },
  { name: 'Palletizing', value: 8, color: '#EC4899' },
  { name: 'Accessories', value: 5, color: '#06B6D4' },
];

// ==================== MAIN COMPONENT ====================

const PackagingManagementDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('inventory');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const totalItems = packagingCategories.reduce((sum, cat) => sum + cat.totalItems, 0);
  const totalInUse = packagingCategories.reduce((sum, cat) => sum + cat.inUse, 0);
  const totalCostThisMonth = costTrendData[costTrendData.length - 1].cost;
  const activeOrders = orders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length;

  return (
    <div className="p-6 space-y-6">
      
      {/* ==================== STATS CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Total Package Types</h3>
            <Package className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold">{totalItems}</p>
          <p className="text-sm text-gray-600 mt-1">{totalInUse} categories in use</p>
        </Card>

        <Card className="p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Active Orders</h3>
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">{activeOrders}</p>
          <p className="text-sm text-gray-600 mt-1">Out of {orders.length} total</p>
        </Card>

        <Card className="p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Cost This Month</h3>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold">₹{(totalCostThisMonth / 1000).toFixed(0)}K</p>
          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12% vs last month
          </p>
        </Card>

        <Card className="p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600">Active Vendors</h3>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold">{vendors.filter(v => v.availability === 'Available').length}</p>
          <p className="text-sm text-gray-600 mt-1">Out of {vendors.length} total</p>
        </Card>
      </div>

      {/* ==================== AI INSIGHTS ==================== */}
      <Card className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-6">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Zap className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-3">🤖 AI Packaging Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold mb-1">Cost Optimization</p>
                <p className="text-sm opacity-90">Switch to bulk orders of PP bags - save 15% on next purchase</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold mb-1">Stock Alert</p>
                <p className="text-sm opacity-90">Jute sacks running low (250 left). Reorder by Oct 28</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold mb-1">Vendor Recommendation</p>
                <p className="text-sm opacity-90">Quality Packaging Supplies has 12% lower prices this week!</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ==================== MAIN TABS ==================== */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* ==================== INVENTORY TAB ==================== */}
        <TabsContent value="inventory" className="space-y-6 mt-6">
          
          {/* Category Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {packagingCategories.map((category) => (
              <Card
                key={category.id}
                className={cn(
                  "p-4 cursor-pointer transition-all hover:shadow-lg",
                  selectedCategory === category.id ? "border-2 border-orange-500 bg-orange-50" : ""
                )}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className={cn(
                    "p-3 rounded-full",
                    selectedCategory === category.id ? "bg-orange-100" : "bg-gray-100"
                  )}>
                    <category.icon className={cn(
                      "w-6 h-6",
                      selectedCategory === category.id ? "text-orange-600" : "text-gray-600"
                    )} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{category.name}</p>
                    <p className="text-xs text-gray-600">{category.totalItems} types</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Package Types List */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Package Types</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search packages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Button size="sm" variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {packagingCategories
                .filter(cat => selectedCategory === 'all' || cat.id === selectedCategory)
                .flatMap(cat => cat.types)
                .filter(type => 
                  searchQuery === '' || 
                  type.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((type) => (
                  <div key={type.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{type.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {type.supplier}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">In Stock: <span className="font-semibold">{type.inStock}</span></span>
                          <span className="text-gray-600">Cost: <span className="font-semibold">₹{type.costPerUnit}/unit</span></span>
                          <span className="text-gray-600">Min Order: <span className="font-semibold">{type.minOrder}</span></span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" className="gap-2">
                          <Plus className="w-4 h-4" />
                          Order
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>

        {/* ==================== VENDORS TAB ==================== */}
        <TabsContent value="vendors" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Packaging Vendors</h3>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vendors</SelectItem>
                  <SelectItem value="material">Material Suppliers</SelectItem>
                  <SelectItem value="labor">Labor Services</SelectItem>
                  <SelectItem value="machine">Machine Rentals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {vendors.map((vendor) => (
                <Card key={vendor.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-xl font-bold">{vendor.name}</h4>
                        <Badge className={cn(
                          vendor.type === 'material' ? 'bg-blue-100 text-blue-800' :
                          vendor.type === 'labor' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        )}>
                          {vendor.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{vendor.category}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {vendor.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{vendor.rating}</span>
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

                  {/* Price Range */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Price Range:</p>
                        <p className="text-lg font-bold text-blue-600">
                          ₹{vendor.priceRange.min} - ₹{vendor.priceRange.max}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Reliability:</p>
                        <p className="text-lg font-bold">{vendor.reliability}%</p>
                      </div>
                    </div>
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
                        <Zap className="w-4 h-4" />
                        AI Alert: {vendor.anomaly.message}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1">Order Now</Button>
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
          </Card>
        </TabsContent>

        {/* ==================== ORDERS TAB ==================== */}
        <TabsContent value="orders" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Packaging Orders</h3>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Order
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Order ID</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Package Type</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Vendor</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Quantity</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Expected Delivery</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Cost</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-sm">{order.id}</td>
                      <td className="px-4 py-3 font-medium">{order.packageType}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{order.vendor}</td>
                      <td className="px-4 py-3 text-right">{order.quantity}</td>
                      <td className="px-4 py-3">
                        <Badge className={cn(
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        )}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">{order.expectedDelivery}</td>
                      <td className="px-4 py-3 text-right font-semibold">₹{order.totalCost.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <Button size="sm" variant="outline">Track</Button>
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
            
            {/* Cost Trend Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Cost Trend (6 Months)</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={costTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" style={{ fontSize: '12px' }} />
                  <YAxis style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cost" stroke="#F97316" strokeWidth={2} name="Cost (₹)" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Category Distribution */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Category Distribution</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Summary Stats */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Summary Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold">₹{(orders.reduce((sum, o) => sum + o.totalCost, 0) / 1000).toFixed(0)}K</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold">₹{(orders.reduce((sum, o) => sum + o.totalCost, 0) / orders.length / 1000).toFixed(1)}K</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold">{vendors.length}</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PackagingManagementDashboard;
