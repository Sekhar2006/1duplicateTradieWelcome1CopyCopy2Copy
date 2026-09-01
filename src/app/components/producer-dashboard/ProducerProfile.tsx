import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Award,
  TrendingUp,
  DollarSign,
  Star,
  Edit,
  Camera,
  Building,
  Sprout,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Shield,
  FileText,
  CreditCard,
  History,
  Settings,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner@2.0.3";

const { colors, typography, spacing } = designTokens;

interface ProducerData {
  producerId: string;
  name: string;
  phone: string;
  email: string;
  profileImage?: string;
  location: {
    state: string;
    district: string;
    village: string;
    pincode: string;
  };
  farmSize: number;
  farmUnit: "acres" | "hectares";
  kycStatus: "pending" | "verified" | "rejected";
  rating: number;
  totalTrades: number;
  registeredCommodities: string[];
  certifications: string[];
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    upiId?: string;
  };
}

export function ProducerProfile() {
  const [activeTab, setActiveTab] = useState<"profile" | "farm" | "kyc" | "bank" | "history">("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Sample producer data
  const [producerData, setProducerData] = useState<ProducerData>({
    producerId: "PROD-2025-0001",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@example.com",
    profileImage: "https://ui-avatars.com/api/?name=Rajesh+Kumar&size=200&background=003E6D&color=fff",
    location: {
      state: "Punjab",
      district: "Ludhiana",
      village: "Kila Raipur",
      pincode: "141118",
    },
    farmSize: 15,
    farmUnit: "acres",
    kycStatus: "verified",
    rating: 4.8,
    totalTrades: 47,
    registeredCommodities: ["Wheat", "Rice", "Cotton"],
    certifications: ["Organic Farming", "Good Agricultural Practices (GAP)"],
    bankDetails: {
      accountNumber: "****1234",
      ifscCode: "SBIN0001234",
      bankName: "State Bank of India",
      upiId: "rajesh@paytm",
    },
  });

  const [editForm, setEditForm] = useState({
    name: producerData.name,
    email: producerData.email,
    village: producerData.location.village,
    pincode: producerData.location.pincode,
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({
      name: producerData.name,
      email: producerData.email,
      village: producerData.location.village,
      pincode: producerData.location.pincode,
    });
  };

  const handleSave = () => {
    setProducerData({
      ...producerData,
      name: editForm.name,
      email: editForm.email,
      location: {
        ...producerData.location,
        village: editForm.village,
        pincode: editForm.pincode,
      },
    });
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const tradeHistory = [
    { id: 1, commodity: "Wheat", quantity: "50 quintals", date: "2025-09-15", buyer: "ABC Traders", amount: 160000 },
    { id: 2, commodity: "Rice", quantity: "30 quintals", date: "2025-08-22", buyer: "XYZ Mills", amount: 180000 },
    { id: 3, commodity: "Cotton", quantity: "20 quintals", date: "2025-07-10", buyer: "Cotton Corp", amount: 120000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2
          style={{
            fontFamily: typography.fonts.heading,
            fontSize: typography.sizes["2xl"],
            fontWeight: typography.weights.bold,
            color: colors.blue.primary,
          }}
        >
          👤 Producer Profile & Account
        </h2>
        <p
          style={{
            fontSize: typography.sizes.sm,
            color: colors.text.secondary,
            marginTop: spacing.xs,
          }}
        >
          Manage your profile, farm details, and account settings
        </p>
      </div>

      {/* Profile Header Card */}
      <DSCard variant="elevated" padding="lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={producerData.profileImage} alt={producerData.name} />
              <AvatarFallback style={{ backgroundColor: colors.blue.primary, color: "white" }}>
                {producerData.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <button
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: colors.accent.gold, color: "white" }}
            >
              <Camera size={16} />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3
                style={{
                  fontSize: typography.sizes.xl,
                  fontWeight: typography.weights.bold,
                  color: colors.text.primary,
                }}
              >
                {producerData.name}
              </h3>
              {producerData.kycStatus === "verified" && (
                <DSBadge variant="success" size="sm">
                  <CheckCircle2 size={12} /> Verified
                </DSBadge>
              )}
            </div>
            <p
              style={{
                fontSize: typography.sizes.sm,
                color: colors.text.secondary,
                marginBottom: spacing.sm,
              }}
            >
              Producer ID: {producerData.producerId}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Star size={16} style={{ color: colors.accent.gold, fill: colors.accent.gold }} />
                <span
                  style={{
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.primary,
                  }}
                >
                  {producerData.rating}
                </span>
                <span style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                  ({producerData.totalTrades} trades)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sprout size={16} style={{ color: colors.status.success }} />
                <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                  {producerData.farmSize} {producerData.farmUnit}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} style={{ color: colors.status.info }} />
                <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                  {producerData.location.village}, {producerData.location.district}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <DSButton variant="outline" size="md" leftIcon={<Edit size={16} />} onClick={handleEdit}>
              Edit Profile
            </DSButton>
          )}
        </div>
      </DSCard>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DSCard variant="elevated" padding="md">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${colors.status.success}20`, color: colors.status.success }}
            >
              <TrendingUp size={24} />
            </div>
            <div>
              <p
                style={{
                  fontSize: typography.sizes["2xl"],
                  fontWeight: typography.weights.bold,
                  color: colors.blue.primary,
                }}
              >
                {producerData.totalTrades}
              </p>
              <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Total Trades</p>
            </div>
          </div>
        </DSCard>

        <DSCard variant="elevated" padding="md">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${colors.accent.gold}20`, color: colors.accent.gold }}
            >
              <DollarSign size={24} />
            </div>
            <div>
              <p
                style={{
                  fontSize: typography.sizes.xl,
                  fontWeight: typography.weights.bold,
                  color: colors.blue.primary,
                }}
              >
                ₹4.6L
              </p>
              <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Total Earnings</p>
            </div>
          </div>
        </DSCard>

        <DSCard variant="elevated" padding="md">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${colors.status.info}20`, color: colors.status.info }}
            >
              <Sprout size={24} />
            </div>
            <div>
              <p
                style={{
                  fontSize: typography.sizes["2xl"],
                  fontWeight: typography.weights.bold,
                  color: colors.blue.primary,
                }}
              >
                {producerData.registeredCommodities.length}
              </p>
              <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Commodities</p>
            </div>
          </div>
        </DSCard>

        <DSCard variant="elevated" padding="md">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${colors.blue.primary}20`, color: colors.blue.primary }}
            >
              <Award size={24} />
            </div>
            <div>
              <p
                style={{
                  fontSize: typography.sizes["2xl"],
                  fontWeight: typography.weights.bold,
                  color: colors.blue.primary,
                }}
              >
                {producerData.certifications.length}
              </p>
              <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Certifications</p>
            </div>
          </div>
        </DSCard>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">👤 Profile</TabsTrigger>
          <TabsTrigger value="farm">🏡 Farm Details</TabsTrigger>
          <TabsTrigger value="kyc">🛡️ KYC</TabsTrigger>
          <TabsTrigger value="bank">💳 Bank</TabsTrigger>
          <TabsTrigger value="history">📜 History</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <DSCard variant="elevated" padding="lg">
            <h3
              style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
                marginBottom: spacing.md,
              }}
            >
              Personal Information
            </h3>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      color: colors.text.primary,
                      display: "block",
                      marginBottom: spacing.xs,
                    }}
                  >
                    Full Name
                  </label>
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      color: colors.text.primary,
                      display: "block",
                      marginBottom: spacing.xs,
                    }}
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.medium,
                        color: colors.text.primary,
                        display: "block",
                        marginBottom: spacing.xs,
                      }}
                    >
                      Village
                    </label>
                    <Input
                      value={editForm.village}
                      onChange={(e) => setEditForm({ ...editForm, village: e.target.value })}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.medium,
                        color: colors.text.primary,
                        display: "block",
                        marginBottom: spacing.xs,
                      }}
                    >
                      Pincode
                    </label>
                    <Input
                      value={editForm.pincode}
                      onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <DSButton variant="outline" size="md" onClick={handleCancel}>
                    Cancel
                  </DSButton>
                  <DSButton variant="primary" size="md" onClick={handleSave}>
                    Save Changes
                  </DSButton>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                  <Phone size={20} style={{ color: colors.text.muted }} />
                  <div>
                    <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Phone</p>
                    <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary }}>
                      {producerData.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                  <Mail size={20} style={{ color: colors.text.muted }} />
                  <div>
                    <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Email</p>
                    <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary }}>
                      {producerData.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                  <MapPin size={20} style={{ color: colors.text.muted }} />
                  <div>
                    <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Address</p>
                    <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary }}>
                      {producerData.location.village}, {producerData.location.district}, {producerData.location.state} - {producerData.location.pincode}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DSCard>
        </TabsContent>

        {/* Farm Tab */}
        <TabsContent value="farm" className="space-y-4">
          <DSCard variant="elevated" padding="lg">
            <h3
              style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
                marginBottom: spacing.md,
              }}
            >
              Farm Information
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border" style={{ borderColor: colors.border.default }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Sprout size={20} style={{ color: colors.status.success }} />
                    <h4 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                      Farm Size
                    </h4>
                  </div>
                  <p style={{ fontSize: typography.sizes["2xl"], fontWeight: typography.weights.bold, color: colors.blue.primary }}>
                    {producerData.farmSize} {producerData.farmUnit}
                  </p>
                </div>

                <div className="p-4 rounded-lg border" style={{ borderColor: colors.border.default }}>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={20} style={{ color: colors.status.info }} />
                    <h4 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                      Location
                    </h4>
                  </div>
                  <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                    {producerData.location.state}, {producerData.location.district}
                  </p>
                </div>
              </div>

              <div>
                <h4
                  style={{
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.primary,
                    marginBottom: spacing.sm,
                  }}
                >
                  Registered Commodities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {producerData.registeredCommodities.map((commodity, idx) => (
                    <DSBadge key={idx} variant="blue" size="md">
                      {commodity}
                    </DSBadge>
                  ))}
                </div>
              </div>

              <div>
                <h4
                  style={{
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.primary,
                    marginBottom: spacing.sm,
                  }}
                >
                  Certifications
                </h4>
                <div className="space-y-2">
                  {producerData.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ backgroundColor: colors.surface.secondary }}
                    >
                      <Award size={20} style={{ color: colors.accent.gold }} />
                      <span style={{ fontSize: typography.sizes.sm, color: colors.text.primary }}>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DSCard>
        </TabsContent>

        {/* KYC Tab */}
        <TabsContent value="kyc" className="space-y-4">
          <DSCard variant="elevated" padding="lg">
            <div className="flex items-center justify-between mb-6">
              <h3
                style={{
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.semibold,
                  color: colors.blue.primary,
                }}
              >
                KYC Verification Status
              </h3>
              <DSBadge variant="success" size="md">
                <CheckCircle2 size={14} /> Verified
              </DSBadge>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: `${colors.status.success}10` }}>
                <div className="flex items-start gap-3">
                  <Shield size={24} style={{ color: colors.status.success }} />
                  <div>
                    <h4
                      style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.semibold,
                        color: colors.text.primary,
                        marginBottom: spacing.xs,
                      }}
                    >
                      KYC Completed
                    </h4>
                    <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                      Your KYC verification was completed successfully. All documents have been verified and approved.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border" style={{ borderColor: colors.border.default }}>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={20} style={{ color: colors.status.info }} />
                    <h4 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                      Aadhaar Verification
                    </h4>
                  </div>
                  <DSBadge variant="success" size="sm">
                    <CheckCircle2 size={12} /> Verified
                  </DSBadge>
                </div>

                <div className="p-4 rounded-lg border" style={{ borderColor: colors.border.default }}>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={20} style={{ color: colors.status.info }} />
                    <h4 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                      Land Documents
                    </h4>
                  </div>
                  <DSBadge variant="success" size="sm">
                    <CheckCircle2 size={12} /> Verified
                  </DSBadge>
                </div>

                <div className="p-4 rounded-lg border" style={{ borderColor: colors.border.default }}>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={20} style={{ color: colors.status.info }} />
                    <h4 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                      Bank Account
                    </h4>
                  </div>
                  <DSBadge variant="success" size="sm">
                    <CheckCircle2 size={12} /> Verified
                  </DSBadge>
                </div>

                <div className="p-4 rounded-lg border" style={{ borderColor: colors.border.default }}>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={20} style={{ color: colors.status.info }} />
                    <h4 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                      Phone Verification
                    </h4>
                  </div>
                  <DSBadge variant="success" size="sm">
                    <CheckCircle2 size={12} /> Verified
                  </DSBadge>
                </div>
              </div>
            </div>
          </DSCard>
        </TabsContent>

        {/* Bank Tab */}
        <TabsContent value="bank" className="space-y-4">
          <DSCard variant="elevated" padding="lg">
            <h3
              style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
                marginBottom: spacing.md,
              }}
            >
              Bank Details
            </h3>

            {producerData.bankDetails && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                  <Building size={20} style={{ color: colors.text.muted }} />
                  <div>
                    <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Bank Name</p>
                    <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary }}>
                      {producerData.bankDetails.bankName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                  <CreditCard size={20} style={{ color: colors.text.muted }} />
                  <div>
                    <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Account Number</p>
                    <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary }}>
                      {producerData.bankDetails.accountNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                  <FileText size={20} style={{ color: colors.text.muted }} />
                  <div>
                    <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>IFSC Code</p>
                    <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary }}>
                      {producerData.bankDetails.ifscCode}
                    </p>
                  </div>
                </div>

                {producerData.bankDetails.upiId && (
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                    <DollarSign size={20} style={{ color: colors.text.muted }} />
                    <div>
                      <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>UPI ID</p>
                      <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary }}>
                        {producerData.bankDetails.upiId}
                      </p>
                    </div>
                  </div>
                )}

                <DSButton variant="outline" size="md" leftIcon={<Edit size={16} />} className="mt-4">
                  Update Bank Details
                </DSButton>
              </div>
            )}
          </DSCard>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <DSCard variant="elevated" padding="lg">
            <h3
              style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
                marginBottom: spacing.md,
              }}
            >
              Trade History
            </h3>

            <div className="space-y-3">
              {tradeHistory.map((trade) => (
                <div
                  key={trade.id}
                  className="p-4 rounded-lg border"
                  style={{ borderColor: colors.border.default }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4
                        style={{
                          fontSize: typography.sizes.sm,
                          fontWeight: typography.weights.semibold,
                          color: colors.text.primary,
                        }}
                      >
                        {trade.commodity}
                      </h4>
                      <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                        {trade.quantity}
                      </p>
                    </div>
                    <DSBadge variant="success" size="sm">
                      Completed
                    </DSBadge>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: colors.border.light }}>
                    <div>
                      <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                        <Calendar size={12} className="inline mr-1" />
                        {trade.date}
                      </p>
                      <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                        Buyer: {trade.buyer}
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: typography.sizes.base,
                        fontWeight: typography.weights.semibold,
                        color: colors.status.success,
                      }}
                    >
                      ₹{trade.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DSCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
