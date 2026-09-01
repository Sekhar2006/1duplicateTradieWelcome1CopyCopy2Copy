import React, { useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Warehouse,
  Package,
  ShoppingCart,
  FileText,
  BarChart3,
  User,
  Menu,
  X,
  ChevronRight,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';

// Import individual dashboards
import TradingDashboard from './TradingDashboard';
import StorageManagementDashboard from './StorageManagementDashboard';
import PackagingManagementDashboard from './PackagingManagementDashboard';
import SellManagementDashboard from './SellManagementDashboard';
import OrderTransactionDashboard from './OrderTransactionDashboard';
import ReportsAnalyticsDashboard from './ReportsAnalyticsDashboard';
import UserProfileDashboard from './UserProfileDashboard';

// ==================== TYPES ====================

type DashboardType = 
  | 'trading'
  | 'storage'
  | 'packaging'
  | 'sell'
  | 'orders'
  | 'reports'
  | 'profile';

interface DashboardConfig {
  id: DashboardType;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  badge?: number;
  component: React.ComponentType<any>;
}

// ==================== DASHBOARD CONFIGS ====================

const dashboards: DashboardConfig[] = [
  {
    id: 'trading',
    name: 'Trading',
    icon: TrendingUp,
    description: 'Real-time market, prices, and trading',
    color: 'blue',
    badge: 3,
    component: TradingDashboard
  },
  {
    id: 'storage',
    name: 'Storage Management',
    icon: Warehouse,
    description: 'Facilities, rental, and compliance',
    color: 'purple',
    component: StorageManagementDashboard
  },
  {
    id: 'packaging',
    name: 'Packaging',
    icon: Package,
    description: 'Materials, vendors, and inventory',
    color: 'orange',
    component: PackagingManagementDashboard
  },
  {
    id: 'sell',
    name: 'Sell Management',
    icon: ShoppingCart,
    description: 'Sales methods, agents, and revenue',
    color: 'green',
    badge: 5,
    component: SellManagementDashboard
  },
  {
    id: 'orders',
    name: 'Orders & Transactions',
    icon: FileText,
    description: 'Order tracking and payments',
    color: 'cyan',
    component: OrderTransactionDashboard
  },
  {
    id: 'reports',
    name: 'Reports & Analytics',
    icon: BarChart3,
    description: 'Performance metrics and insights',
    color: 'indigo',
    component: ReportsAnalyticsDashboard
  },
  {
    id: 'profile',
    name: 'Profile & Settings',
    icon: User,
    description: 'Account and preferences',
    color: 'gray',
    component: UserProfileDashboard
  }
];

// ==================== MAIN COMPONENT ====================

const DashboardNavigator: React.FC = () => {
  const [activeDashboard, setActiveDashboard] = useState<DashboardType>('trading');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [notificationCount, setNotificationCount] = useState<number>(8);

  const currentDashboard = dashboards.find(d => d.id === activeDashboard);
  const DashboardComponent = currentDashboard?.component;

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      
      {/* ==================== SIDEBAR ==================== */}
      <div className={cn(
        "bg-white border-r shadow-lg transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-64" : "w-20"
      )}>
        
        {/* Logo & Toggle */}
        <div className="p-4 border-b flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display', color: '#003E6D' }}>
              TRADIE
            </h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {dashboards.map((dashboard) => (
            <button
              key={dashboard.id}
              onClick={() => setActiveDashboard(dashboard.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all relative",
                activeDashboard === dashboard.id
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <dashboard.icon className={cn(
                "w-5 h-5 flex-shrink-0",
                activeDashboard === dashboard.id ? "text-blue-600" : "text-gray-500"
              )} />
              
              {sidebarOpen && (
                <>
                  <div className="flex-1 text-left">
                    <div className="text-sm">{dashboard.name}</div>
                    {activeDashboard === dashboard.id && (
                      <div className="text-xs opacity-75">{dashboard.description}</div>
                    )}
                  </div>
                  {dashboard.badge && dashboard.badge > 0 && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {dashboard.badge}
                    </Badge>
                  )}
                </>
              )}
              
              {!sidebarOpen && dashboard.badge && dashboard.badge > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {dashboard.badge}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            size="sm"
          >
            <HelpCircle className="w-5 h-5" />
            {sidebarOpen && <span>Help & Support</span>}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            size="sm"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Bar */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display', color: '#003E6D' }}>
              {currentDashboard?.name}
            </h2>
            <p className="text-sm text-gray-600">{currentDashboard?.description}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="outline" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5">
                  {notificationCount}
                </Badge>
              )}
            </Button>

            {/* Settings */}
            <Button variant="outline" size="sm">
              <Settings className="w-5 h-5" />
            </Button>

            {/* User Avatar */}
            <Button variant="outline" size="sm" className="gap-2">
              <User className="w-5 h-5" />
              <span className="hidden md:inline">Producer</span>
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto">
          {DashboardComponent && <DashboardComponent />}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavigator;
