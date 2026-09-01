# 🎨 Create Custom Dashboard - Quick Guide

**Time to Create**: 15-30 minutes per dashboard  
**Difficulty**: Easy  
**Template-Based**: Yes  

---

## 🚀 **Quick Start Template**

### **Step 1: Copy This Template**

```tsx
// /components/dashboards/YourDashboard.tsx

import React, { useState } from 'react';
import {
  YourIcon,  // Replace with your icon from lucide-react
  Search,
  Filter,
  Plus,
  // ... other icons you need
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '../ui/utils';

// ==================== INTERFACES ====================
interface YourDataType {
  id: string;
  name: string;
  // ... add your fields
}

// ==================== MOCK DATA ====================
const mockData: YourDataType[] = [
  {
    id: '1',
    name: 'Example Item',
    // ... add your data
  }
];

// ==================== MAIN COMPONENT ====================
const YourDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="p-6 space-y-6">
      
      {/* ==================== STATS CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="text-sm text-gray-600 mb-2">Metric 1</h3>
          <p className="text-3xl font-bold">123</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-gray-600 mb-2">Metric 2</h3>
          <p className="text-3xl font-bold">456</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm text-gray-600 mb-2">Metric 3</h3>
          <p className="text-3xl font-bold">789</p>
        </Card>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Overview</h3>
            {/* Your overview content */}
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Data List</h3>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add New
              </Button>
            </div>
            {/* Your data list */}
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Settings</h3>
            {/* Your settings */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default YourDashboard;
```

---

### **Step 2: Register in Navigator**

```tsx
// /components/dashboards/DashboardNavigator.tsx

// 1. Import your dashboard
import YourDashboard from './YourDashboard';

// 2. Add to dashboards array (around line 60)
const dashboards: DashboardConfig[] = [
  // ... existing dashboards
  {
    id: 'your-dashboard',
    name: 'Your Dashboard',
    icon: YourIcon,  // Your chosen icon
    description: 'Description of your dashboard',
    color: 'teal',   // Choose a color
    badge: 0,        // Optional notification count
    component: YourDashboard
  }
];
```

---

### **Step 3: Done!** 🎉

Your dashboard now appears in the sidebar and is fully integrated!

---

## 📋 **Common Patterns**

### **Stats Cards Row**

```tsx
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <Card className="p-6">
    <div className="flex items-center gap-3">
      <Icon className="w-8 h-8 text-blue-600" />
      <div>
        <p className="text-sm text-gray-600">Label</p>
        <p className="text-2xl font-bold">Value</p>
      </div>
    </div>
  </Card>
</div>
```

### **Data Table**

```tsx
<div className="overflow-x-auto">
  <table className="w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
          Column 1
        </th>
        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">
          Column 2
        </th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id} className="border-b hover:bg-gray-50">
          <td className="px-4 py-3">{item.field1}</td>
          <td className="px-4 py-3">{item.field2}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### **Search & Filter Bar**

```tsx
<div className="flex gap-4 mb-6">
  <div className="flex-1 relative">
    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
    <Input
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-10"
    />
  </div>
  <Button variant="outline" className="gap-2">
    <Filter className="w-4 h-4" />
    Filters
  </Button>
</div>
```

### **Action Buttons Grid**

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
  <Button className="h-20 flex-col gap-2">
    <Icon className="w-6 h-6" />
    <span>Action 1</span>
  </Button>
  <Button variant="outline" className="h-20 flex-col gap-2">
    <Icon className="w-6 h-6" />
    <span>Action 2</span>
  </Button>
</div>
```

### **List with Actions**

```tsx
<div className="space-y-3">
  {items.map((item) => (
    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex items-center gap-4">
        <Icon className="w-5 h-5 text-gray-500" />
        <div>
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline">View</Button>
        <Button size="sm">Edit</Button>
      </div>
    </div>
  ))}
</div>
```

---

## 🎨 **Design Guidelines**

### **Spacing**
```
Outer container: p-6 space-y-6
Cards: p-6
Sections: space-y-4
Small gaps: gap-2 or gap-3
Medium gaps: gap-4
```

### **Typography**
```tsx
// Main title
<h2 style={{ fontFamily: 'Playfair Display', color: '#003E6D' }}>
  Dashboard Title
</h2>

// Section title
<h3 className="text-lg font-semibold">Section</h3>

// Card title
<h3 className="text-lg font-semibold mb-4">Card Title</h3>

// Labels
<p className="text-sm text-gray-600">Label</p>

// Values
<p className="text-2xl font-bold">Value</p>
```

### **Colors**
```
Primary Blue: #003E6D
Success Green: #16A34A
Warning Yellow: #F59E0B
Error Red: #EF4444
Purple: #9333EA
Cyan: #06B6D4
Orange: #F97316
```

### **Badges**
```tsx
// Status badges
<Badge className="bg-green-100 text-green-800">Active</Badge>
<Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
<Badge className="bg-red-100 text-red-800">Inactive</Badge>

// Count badges
<Badge className="bg-blue-600 text-white">{count}</Badge>
```

---

## 📊 **Sample Dashboards**

### **Analytics Dashboard Template**

```tsx
const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard icon={TrendingUp} label="Revenue" value="₹1,25,000" change="+12%" />
        {/* ... more KPIs */}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3>Revenue Trend</h3>
          <LineChart data={data} />
        </Card>
        <Card className="p-6">
          <h3>Category Breakdown</h3>
          <BarChart data={data} />
        </Card>
      </div>

      {/* Tables */}
      <Card className="p-6">
        <h3>Recent Transactions</h3>
        <Table data={transactions} />
      </Card>
    </div>
  );
};
```

### **Management Dashboard Template**

```tsx
const ManagementDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <StatsRow stats={[...]} />

      {/* Tabs for different views */}
      <Tabs>
        <TabsList>
          <TabsTrigger value="active">Active Items</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <ItemList items={activeItems} />
        </TabsContent>
        {/* ... other tabs */}
      </Tabs>
    </div>
  );
};
```

---

## ✅ **Checklist**

Before completing your dashboard:

- [ ] Stats cards at top
- [ ] Consistent spacing (p-6, space-y-6)
- [ ] Proper typography
- [ ] Search/filter if needed
- [ ] Action buttons where appropriate
- [ ] Loading states
- [ ] Empty states
- [ ] Error handling
- [ ] Responsive grid
- [ ] Icons from lucide-react
- [ ] Colors from TRADIE palette
- [ ] Exported as default

---

## 🚀 **Quick Deploy**

After creating your dashboard:

1. **Test locally**
   ```bash
   npm run dev
   ```

2. **Verify**
   - Dashboard appears in sidebar
   - All features work
   - Responsive on mobile
   - No console errors

3. **Commit**
   ```bash
   git add .
   git commit -m "Add [Your Dashboard] dashboard"
   ```

4. **Done!** 🎉

---

## 💡 **Tips**

1. **Start Simple**: Build basic structure first, add features later
2. **Copy Patterns**: Use Trading Dashboard as reference
3. **Mock Data First**: Don't wait for APIs, use mock data
4. **Iterate**: Add features incrementally
5. **Test Often**: Check after each section
6. **Ask for Help**: Reference other dashboards

---

## 📚 **Resources**

- **Lucide Icons**: https://lucide.dev
- **Recharts**: https://recharts.org
- **Tailwind**: https://tailwindcss.com
- **React**: https://react.dev

---

**🎊 You're ready to create custom dashboards! Start with the template above and customize to your needs!**
