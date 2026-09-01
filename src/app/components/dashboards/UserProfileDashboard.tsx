import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Edit,
  Save,
  X,
  Bell,
  Lock,
  HelpCircle,
  FileText,
  MessageSquare,
  Settings,
  Shield,
  Globe,
  Eye,
  EyeOff,
  Upload,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  Award,
  Star,
  TrendingUp,
  Package,
  DollarSign,
  Camera,
  Key,
  Smartphone,
  Monitor,
  LogOut,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { cn } from '../ui/utils';

// ==================== INTERFACES ====================

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  businessName: string;
  registrationDate: string;
  avatar?: string;
  role: string;
}

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  email: boolean;
  sms: boolean;
  push: boolean;
}

interface SupportTicket {
  id: string;
  title: string;
  category: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  date: string;
  priority: 'Low' | 'Medium' | 'High';
}

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'Verified' | 'Pending' | 'Rejected';
}

// ==================== MOCK DATA ====================

const userProfile: UserProfile = {
  name: 'Harpreet Singh',
  email: 'harpreet@farmproducer.com',
  phone: '+91-98765-43210',
  location: 'Ludhiana, Punjab, India',
  businessName: 'Harpreet Singh Farm',
  registrationDate: '2023-05-15',
  role: 'Producer'
};

const notificationPreferences: NotificationPreference[] = [
  {
    id: 'orders',
    label: 'Order Updates',
    description: 'Notifications about order status, shipment, and delivery',
    email: true,
    sms: true,
    push: true
  },
  {
    id: 'payments',
    label: 'Payment Alerts',
    description: 'Updates on payments, transactions, and wallet activity',
    email: true,
    sms: false,
    push: true
  },
  {
    id: 'prices',
    label: 'Price Alerts',
    description: 'Market price changes and trending commodities',
    email: false,
    sms: false,
    push: true
  },
  {
    id: 'marketing',
    label: 'Marketing & Promotions',
    description: 'Offers, discounts, and new features',
    email: true,
    sms: false,
    push: false
  },
  {
    id: 'regulatory',
    label: 'Regulatory Updates',
    description: 'Compliance changes and policy updates',
    email: true,
    sms: true,
    push: true
  }
];

const supportTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    title: 'Payment not received for Order ORD-2025-001',
    category: 'Payment Issues',
    status: 'In Progress',
    date: '2025-10-22',
    priority: 'High'
  },
  {
    id: 'TKT-002',
    title: 'How to update quality check report?',
    category: 'General Query',
    status: 'Resolved',
    date: '2025-10-20',
    priority: 'Low'
  },
  {
    id: 'TKT-003',
    title: 'Cannot access storage facility details',
    category: 'Technical Issue',
    status: 'Open',
    date: '2025-10-23',
    priority: 'Medium'
  }
];

const activeSessions: ActiveSession[] = [
  {
    id: 'session1',
    device: 'Chrome on Windows',
    location: 'Ludhiana, Punjab',
    lastActive: '2 minutes ago',
    current: true
  },
  {
    id: 'session2',
    device: 'TRADIE Mobile App (Android)',
    location: 'Ludhiana, Punjab',
    lastActive: '1 hour ago',
    current: false
  },
  {
    id: 'session3',
    device: 'Safari on iPhone',
    location: 'Jalandhar, Punjab',
    lastActive: '2 days ago',
    current: false
  }
];

const documents: Document[] = [
  {
    id: 'doc1',
    name: 'Aadhaar Card',
    type: 'Identity Proof',
    size: '2.4 MB',
    uploadDate: '2023-05-15',
    status: 'Verified'
  },
  {
    id: 'doc2',
    name: 'Land Ownership Certificate',
    type: 'Land Documents',
    size: '1.8 MB',
    uploadDate: '2023-05-15',
    status: 'Verified'
  },
  {
    id: 'doc3',
    name: 'Bank Account Statement',
    type: 'Financial Documents',
    size: '3.2 MB',
    uploadDate: '2023-05-20',
    status: 'Verified'
  },
  {
    id: 'doc4',
    name: 'Quality Certificate - Wheat',
    type: 'Quality Documents',
    size: '1.5 MB',
    uploadDate: '2025-10-15',
    status: 'Pending'
  }
];

const faqs = [
  {
    question: 'How do I create a lot and tokenize my produce?',
    answer: 'Navigate to the Producer Dashboard > Create Lot. Fill in commodity details, conduct quality check with AI assistance, and complete tokenization. You will receive a unique QR code for tracking.'
  },
  {
    question: 'What are the commission rates for different selling methods?',
    answer: 'Direct Sale: 0%, Commission Agent: 2-3%, Online Marketplace: 3%, Contract Farming: 1.5%. Rates may vary based on agent and commodity.'
  },
  {
    question: 'How do I track my order status?',
    answer: 'Go to Orders & Transactions dashboard. Click on any order to see detailed tracking information, including shipment status, expected delivery, and real-time updates.'
  },
  {
    question: 'What documents are required for KYC verification?',
    answer: 'For producers: Aadhaar/PAN, Land ownership documents, Bank account details, and Recent photograph. Processing takes 2-3 business days.'
  },
  {
    question: 'How do I withdraw funds from my wallet?',
    answer: 'Go to Orders & Transactions > Transactions tab. Click "Withdraw" button, enter amount and bank details. Funds will be transferred in 1-2 business days.'
  }
];

const stats = [
  { label: 'Account Age', value: '1 Year 5 Months', icon: Calendar, color: '#3B82F6' },
  { label: 'Total Sales', value: '156', icon: TrendingUp, color: '#10B981' },
  { label: 'Total Revenue', value: '₹8.45M', icon: DollarSign, color: '#F59E0B' },
  { label: 'Success Rate', value: '94%', icon: Award, color: '#8B5CF6' },
];

// ==================== MAIN COMPONENT ====================

const UserProfileDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile>(userProfile);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <div className="p-6 space-y-6">
      
      {/* ==================== PROFILE HEADER ==================== */}
      <Card className="p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-32 h-32">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
              variant="outline"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display', color: '#003E6D' }}>
                  {profile.name}
                </h2>
                <p className="text-gray-600 mt-1">{profile.businessName}</p>
                <Badge className="mt-2 bg-blue-100 text-blue-800">
                  <User className="w-3 h-3 mr-1" />
                  {profile.role}
                </Badge>
              </div>
              <Button
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                className="gap-2"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-lg">
                  <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* ==================== MAIN TABS ==================== */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        {/* ==================== PROFILE TAB ==================== */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <Input
                  value={profile.businessName}
                  onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Input
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">App Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-sm text-gray-600">Choose your preferred language</p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                    <SelectItem value="pa">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                    <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-gray-600">Light or dark mode</p>
                </div>
                <Select defaultValue="light">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Currency</p>
                  <p className="text-sm text-gray-600">Default currency display</p>
                </div>
                <Select defaultValue="inr">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr">INR (₹)</SelectItem>
                    <SelectItem value="usd">USD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ==================== NOTIFICATIONS TAB ==================== */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
            <p className="text-sm text-gray-600 mb-6">
              Choose how you want to receive notifications for different activities
            </p>

            <div className="space-y-6">
              {notificationPreferences.map((pref) => (
                <div key={pref.id}>
                  <div className="mb-3">
                    <p className="font-medium">{pref.label}</p>
                    <p className="text-sm text-gray-600">{pref.description}</p>
                  </div>
                  <div className="flex items-center gap-8 ml-4">
                    <div className="flex items-center gap-2">
                      <Switch checked={pref.email} />
                      <span className="text-sm">Email</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={pref.sms} />
                      <span className="text-sm">SMS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={pref.push} />
                      <span className="text-sm">Push</span>
                    </div>
                  </div>
                  <Separator className="mt-6" />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ==================== SECURITY TAB ==================== */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                />
              </div>
              <Button className="w-full gap-2">
                <Lock className="w-4 h-4" />
                Update Password
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-gray-700 mb-2">
                  Add an extra layer of security to your account by enabling two-factor authentication
                </p>
                <p className="text-sm text-gray-600">
                  Status: <Badge className="bg-red-100 text-red-800">Not Enabled</Badge>
                </p>
              </div>
              <Button className="gap-2">
                <Smartphone className="w-4 h-4" />
                Enable 2FA
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {session.device.includes('Mobile') ? (
                        <Smartphone className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Monitor className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{session.device}</p>
                        {session.current && (
                          <Badge className="bg-green-100 text-green-800 text-xs">Current</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{session.location}</p>
                      <p className="text-xs text-gray-500">Last active: {session.lastActive}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button size="sm" variant="outline" className="gap-2">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ==================== DOCUMENTS TAB ==================== */}
        <TabsContent value="documents" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">My Documents</h3>
              <Button className="gap-2">
                <Upload className="w-4 h-4" />
                Upload Document
              </Button>
            </div>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-600">{doc.type} • {doc.size} • Uploaded {doc.uploadDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={cn(
                      doc.status === 'Verified' ? 'bg-green-100 text-green-800' :
                      doc.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    )}>
                      {doc.status === 'Verified' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {doc.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                      {doc.status === 'Rejected' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {doc.status}
                    </Badge>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ==================== SUPPORT TAB ==================== */}
        <TabsContent value="support" className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Support Tickets</h3>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Ticket
              </Button>
            </div>

            <div className="space-y-3">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{ticket.id}</p>
                        <Badge className={cn(
                          ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          ticket.status === 'Closed' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        )}>
                          {ticket.status}
                        </Badge>
                        <Badge className={cn(
                          ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                          ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        )}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-900 mb-1">{ticket.title}</p>
                      <p className="text-sm text-gray-600">{ticket.category} • {ticket.date}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-2">{faq.question}</p>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Phone className="w-6 h-6" />
                <span>Call Support</span>
                <span className="text-xs text-gray-600">1800-XXX-XXXX</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Mail className="w-6 h-6" />
                <span>Email Support</span>
                <span className="text-xs text-gray-600">support@tradie.com</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <MessageSquare className="w-6 h-6" />
                <span>Live Chat</span>
                <span className="text-xs text-green-600">Available Now</span>
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfileDashboard;
