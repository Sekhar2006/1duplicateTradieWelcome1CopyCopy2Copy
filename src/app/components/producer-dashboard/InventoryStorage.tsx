import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Thermometer,
  Droplets,
  Shield,
  FileText,
  QrCode,
  Download,
  X,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "sonner@2.0.3";

const { colors, typography, spacing } = designTokens;

interface StorageEntry {
  id: string;
  commodity: string;
  variety: string;
  quantity: number;
  unit: "kg" | "quintals" | "tons" | "bags";
  grade: string;
  location: string;
  storageType: "warehouse" | "cold-storage" | "farm-storage" | "open-storage";
  entryDate: Date;
  expiryDate?: Date;
  estimatedValue: number;
  certifications: string[];
  qualityScore: number; // 0-100
  status: "fresh" | "good" | "average" | "deteriorating";
  conditions: StorageConditions;
  nftTokenized: boolean;
}

interface StorageConditions {
  temperature: number;
  humidity: number;
  pestControl: boolean;
  fumigated: boolean;
  lastInspection: Date;
}

export function InventoryStorage() {
  const [activeTab, setActiveTab] = useState<"inventory" | "add" | "analytics">("inventory");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<StorageEntry | null>(null);

  // Form state
  const [commodity, setCommodity] = useState("");
  const [variety, setVariety] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState<"kg" | "quintals" | "tons" | "bags">("quintals");
  const [grade, setGrade] = useState("");
  const [location, setLocation] = useState("");
  const [storageType, setStorageType] = useState<"warehouse" | "cold-storage" | "farm-storage" | "open-storage">("warehouse");
  const [estimatedValue, setEstimatedValue] = useState("");

  // Sample data
  const [inventory, setInventory] = useState<StorageEntry[]>([
    {
      id: "1",
      commodity: "Wheat",
      variety: "PBW 343",
      quantity: 45,
      unit: "quintals",
      grade: "Grade A",
      location: "Warehouse A, Sector 12",
      storageType: "warehouse",
      entryDate: new Date("2025-10-10"),
      estimatedValue: 144000,
      certifications: ["Organic", "ISO 22000"],
      qualityScore: 92,
      status: "fresh",
      conditions: {
        temperature: 22,
        humidity: 45,
        pestControl: true,
        fumigated: true,
        lastInspection: new Date("2025-10-20"),
      },
      nftTokenized: true,
    },
    {
      id: "2",
      commodity: "Rice",
      variety: "Basmati 1121",
      quantity: 30,
      unit: "quintals",
      grade: "Grade A+",
      location: "Cold Storage B",
      storageType: "cold-storage",
      entryDate: new Date("2025-09-25"),
      estimatedValue: 180000,
      certifications: ["Export Quality", "GI Tagged"],
      qualityScore: 98,
      status: "fresh",
      conditions: {
        temperature: 15,
        humidity: 40,
        pestControl: true,
        fumigated: true,
        lastInspection: new Date("2025-10-21"),
      },
      nftTokenized: true,
    },
    {
      id: "3",
      commodity: "Cotton",
      variety: "Bt Cotton",
      quantity: 20,
      unit: "quintals",
      grade: "Grade B",
      location: "Farm Storage",
      storageType: "farm-storage",
      entryDate: new Date("2025-08-15"),
      expiryDate: new Date("2026-02-15"),
      estimatedValue: 120000,
      certifications: ["Bt Certified"],
      qualityScore: 78,
      status: "good",
      conditions: {
        temperature: 28,
        humidity: 60,
        pestControl: false,
        fumigated: false,
        lastInspection: new Date("2025-10-15"),
      },
      nftTokenized: false,
    },
  ]);

  const resetForm = () => {
    setCommodity("");
    setVariety("");
    setQuantity("");
    setUnit("quintals");
    setGrade("");
    setLocation("");
    setStorageType("warehouse");
    setEstimatedValue("");
    setEditingEntry(null);
  };

  const handleSaveEntry = () => {
    if (!commodity || !variety || !quantity || !location || !grade) {
      toast.error("Please fill all required fields");
      return;
    }

    const newEntry: StorageEntry = {
      id: editingEntry?.id || `storage-${Date.now()}`,
      commodity,
      variety,
      quantity: parseFloat(quantity),
      unit,
      grade,
      location,
      storageType,
      entryDate: new Date(),
      estimatedValue: parseFloat(estimatedValue) || 0,
      certifications: [],
      qualityScore: 85,
      status: "fresh",
      conditions: {
        temperature: 25,
        humidity: 50,
        pestControl: true,
        fumigated: true,
        lastInspection: new Date(),
      },
      nftTokenized: false,
    };

    if (editingEntry) {
      setInventory(inventory.map((e) => (e.id === editingEntry.id ? newEntry : e)));
      toast.success("Storage entry updated successfully");
    } else {
      setInventory([...inventory, newEntry]);
      toast.success("Storage entry added successfully");
    }

    setShowAddForm(false);
    resetForm();
  };

  const handleEditEntry = (entry: StorageEntry) => {
    setEditingEntry(entry);
    setCommodity(entry.commodity);
    setVariety(entry.variety);
    setQuantity(entry.quantity.toString());
    setUnit(entry.unit);
    setGrade(entry.grade);
    setLocation(entry.location);
    setStorageType(entry.storageType);
    setEstimatedValue(entry.estimatedValue.toString());
    setShowAddForm(true);
  };

  const handleDeleteEntry = (id: string) => {
    setInventory(inventory.filter((e) => e.id !== id));
    toast.success("Storage entry deleted");
  };

  const handleTokenizeNFT = (id: string) => {
    setInventory(
      inventory.map((e) =>
        e.id === id ? { ...e, nftTokenized: true } : e
      )
    );
    toast.success("NFT tokenization initiated successfully");
  };

  const getStatusColor = (status: StorageEntry["status"]) => {
    const colors_map: Record<StorageEntry["status"], string> = {
      fresh: colors.status.success,
      good: "#22C55E",
      average: colors.status.warning,
      deteriorating: colors.status.error,
    };
    return colors_map[status];
  };

  const getStorageTypeIcon = (type: StorageEntry["storageType"]) => {
    const icons: Record<StorageEntry["storageType"], string> = {
      warehouse: "🏢",
      "cold-storage": "❄️",
      "farm-storage": "🏡",
      "open-storage": "📦",
    };
    return icons[type];
  };

  const totalQuantity = inventory.reduce((sum, e) => sum + e.quantity, 0);
  const totalValue = inventory.reduce((sum, e) => sum + e.estimatedValue, 0);
  const nftCount = inventory.filter((e) => e.nftTokenized).length;
  const avgQuality = Math.round(inventory.reduce((sum, e) => sum + e.qualityScore, 0) / inventory.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            style={{
              fontFamily: typography.fonts.heading,
              fontSize: typography.sizes["2xl"],
              fontWeight: typography.weights.bold,
              color: colors.blue.primary,
            }}
          >
            📦 Inventory & Storage
          </h2>
          <p
            style={{
              fontSize: typography.sizes.sm,
              color: colors.text.secondary,
              marginTop: spacing.xs,
            }}
          >
            Manage harvested produce, storage, and quality tracking
          </p>
        </div>
        <DSButton variant="primary" size="md" leftIcon={<Plus size={18} />} onClick={() => setShowAddForm(true)}>
          Add Entry
        </DSButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DSCard variant="elevated" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.accent.gold}20`, color: colors.accent.gold }}>
              <Package size={24} />
            </div>
            <div>
              <p style={{ fontSize: typography.sizes["2xl"], fontWeight: typography.weights.bold, color: colors.blue.primary }}>
                {inventory.length}
              </p>
              <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Total Items</p>
            </div>
          </div>
        </DSCard>

        <DSCard variant="elevated" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.status.info}20`, color: colors.status.info }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <p style={{ fontSize: typography.sizes["2xl"], fontWeight: typography.weights.bold, color: colors.blue.primary }}>
                {totalQuantity}
              </p>
              <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Quintals Stored</p>
            </div>
          </div>
        </DSCard>

        <DSCard variant="elevated" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.status.success}20`, color: colors.status.success }}>
              <DollarSign size={24} />
            </div>
            <div>
              <p style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.blue.primary }}>
                ₹{(totalValue / 1000).toFixed(1)}K
              </p>
              <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Total Value</p>
            </div>
          </div>
        </DSCard>

        <DSCard variant="elevated" padding="md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.blue.primary}20`, color: colors.blue.primary }}>
              <Shield size={24} />
            </div>
            <div>
              <p style={{ fontSize: typography.sizes["2xl"], fontWeight: typography.weights.bold, color: colors.blue.primary }}>
                {nftCount}
              </p>
              <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>NFT Tokenized</p>
            </div>
          </div>
        </DSCard>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">📋 Inventory ({inventory.length})</TabsTrigger>
          <TabsTrigger value="add">➕ Add New</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          {inventory.length > 0 ? (
            inventory.map((entry) => (
              <motion.div key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <DSCard variant="elevated" padding="lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                          {entry.commodity} - {entry.variety}
                        </h3>
                        <DSBadge variant={entry.status === "fresh" ? "success" : entry.status === "good" ? "blue" : "warning"} size="sm">
                          {entry.status.toUpperCase()}
                        </DSBadge>
                        <DSBadge variant="blue" size="sm">
                          {entry.grade}
                        </DSBadge>
                        {entry.nftTokenized && (
                          <DSBadge variant="success" size="sm">
                            <Shield size={12} /> NFT
                          </DSBadge>
                        )}
                      </div>
                      <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                        {getStorageTypeIcon(entry.storageType)} {entry.location} • Entry: {entry.entryDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p style={{ fontSize: typography.sizes["2xl"], fontWeight: typography.weights.bold, color: colors.blue.primary }}>
                        {entry.quantity} {entry.unit}
                      </p>
                      <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                        ₹{entry.estimatedValue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Storage Conditions */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                    <div className="flex items-center gap-2">
                      <Thermometer size={16} style={{ color: colors.status.warning }} />
                      <div>
                        <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Temperature</p>
                        <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                          {entry.conditions.temperature}°C
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets size={16} style={{ color: colors.status.info }} />
                      <div>
                        <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Humidity</p>
                        <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                          {entry.conditions.humidity}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} style={{ color: entry.conditions.pestControl ? colors.status.success : colors.status.error }} />
                      <div>
                        <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Pest Control</p>
                        <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                          {entry.conditions.pestControl ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={16} style={{ color: colors.accent.gold }} />
                      <div>
                        <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Quality Score</p>
                        <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary }}>
                          {entry.qualityScore}/100
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  {entry.certifications.length > 0 && (
                    <div className="mb-4">
                      <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary, marginBottom: spacing.xs }}>
                        Certifications:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {entry.certifications.map((cert, idx) => (
                          <DSBadge key={idx} variant="success" size="sm">
                            <Award size={12} /> {cert}
                          </DSBadge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <DSButton variant="outline" size="sm" leftIcon={<Edit size={14} />} onClick={() => handleEditEntry(entry)}>
                      Edit
                    </DSButton>
                    <DSButton variant="outline" size="sm" leftIcon={<Trash2 size={14} />} onClick={() => handleDeleteEntry(entry.id)}>
                      Delete
                    </DSButton>
                    {!entry.nftTokenized && (
                      <DSButton variant="primary" size="sm" leftIcon={<Shield size={14} />} onClick={() => handleTokenizeNFT(entry.id)}>
                        Tokenize NFT
                      </DSButton>
                    )}
                    {entry.nftTokenized && (
                      <DSButton variant="outline" size="sm" leftIcon={<QrCode size={14} />}>
                        View QR Code
                      </DSButton>
                    )}
                    <DSButton variant="outline" size="sm" leftIcon={<Download size={14} />}>
                      Export Report
                    </DSButton>
                  </div>
                </DSCard>
              </motion.div>
            ))
          ) : (
            <DSCard variant="elevated" padding="lg">
              <div className="text-center py-12">
                <Package size={48} className="mx-auto mb-3" style={{ color: colors.text.muted }} />
                <p style={{ fontSize: typography.sizes.base, color: colors.text.secondary }}>
                  No inventory entries yet. Add your first storage entry!
                </p>
              </div>
            </DSCard>
          )}
        </TabsContent>

        {/* Add Tab */}
        <TabsContent value="add">
          <DSCard variant="elevated" padding="lg">
            <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.blue.primary, marginBottom: spacing.md }}>
              Add Storage Entry
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                    Commodity *
                  </label>
                  <Input value={commodity} onChange={(e) => setCommodity(e.target.value)} placeholder="e.g., Wheat, Rice" />
                </div>
                <div>
                  <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                    Variety *
                  </label>
                  <Input value={variety} onChange={(e) => setVariety(e.target.value)} placeholder="e.g., PBW 343" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                    Quantity *
                  </label>
                  <div className="flex gap-2">
                    <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Amount" className="flex-1" />
                    <Select value={unit} onValueChange={(v: any) => setUnit(v)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="quintals">quintals</SelectItem>
                        <SelectItem value="tons">tons</SelectItem>
                        <SelectItem value="bags">bags</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                    Grade *
                  </label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade A+">Grade A+</SelectItem>
                      <SelectItem value="Grade A">Grade A</SelectItem>
                      <SelectItem value="Grade B">Grade B</SelectItem>
                      <SelectItem value="Grade C">Grade C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                    Storage Type *
                  </label>
                  <Select value={storageType} onValueChange={(v: any) => setStorageType(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warehouse">🏢 Warehouse</SelectItem>
                      <SelectItem value="cold-storage">❄️ Cold Storage</SelectItem>
                      <SelectItem value="farm-storage">🏡 Farm Storage</SelectItem>
                      <SelectItem value="open-storage">📦 Open Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                    Estimated Value (₹) *
                  </label>
                  <Input type="number" value={estimatedValue} onChange={(e) => setEstimatedValue(e.target.value)} placeholder="Total value" />
                </div>
              </div>

              <div>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                  Location *
                </label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Warehouse A, Sector 12" />
              </div>

              <div className="flex gap-3 pt-4">
                <DSButton variant="outline" size="lg" fullWidth onClick={resetForm}>
                  Reset
                </DSButton>
                <DSButton variant="primary" size="lg" fullWidth onClick={handleSaveEntry}>
                  Save Entry
                </DSButton>
              </div>
            </div>
          </DSCard>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <DSCard variant="elevated" padding="lg">
            <div className="text-center py-12">
              <TrendingUp size={48} className="mx-auto mb-3" style={{ color: colors.text.muted }} />
              <p style={{ fontSize: typography.sizes.base, color: colors.text.secondary }}>
                Inventory analytics and insights coming soon
              </p>
            </div>
          </DSCard>
        </TabsContent>
      </Tabs>

      {/* Add Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => {
              setShowAddForm(false);
              resetForm();
            }}
          >
            <div className="min-h-screen px-4 py-8 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-2xl">
                <DSCard variant="elevated" padding="lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.semibold, color: colors.blue.primary }}>
                      {editingEntry ? "Edit Storage Entry" : "Add Storage Entry"}
                    </h3>
                    <button onClick={() => { setShowAddForm(false); resetForm(); }} className="p-2 rounded-lg hover:bg-white/30 transition-colors">
                      <X size={24} style={{ color: colors.text.muted }} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                          Commodity *
                        </label>
                        <Input value={commodity} onChange={(e) => setCommodity(e.target.value)} placeholder="e.g., Wheat, Rice" />
                      </div>
                      <div>
                        <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                          Variety *
                        </label>
                        <Input value={variety} onChange={(e) => setVariety(e.target.value)} placeholder="e.g., PBW 343" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                          Quantity *
                        </label>
                        <div className="flex gap-2">
                          <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Amount" className="flex-1" />
                          <Select value={unit} onValueChange={(v: any) => setUnit(v)}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="quintals">quintals</SelectItem>
                              <SelectItem value="tons">tons</SelectItem>
                              <SelectItem value="bags">bags</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                          Grade *
                        </label>
                        <Select value={grade} onValueChange={setGrade}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Grade A+">Grade A+</SelectItem>
                            <SelectItem value="Grade A">Grade A</SelectItem>
                            <SelectItem value="Grade B">Grade B</SelectItem>
                            <SelectItem value="Grade C">Grade C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                          Storage Type *
                        </label>
                        <Select value={storageType} onValueChange={(v: any) => setStorageType(v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="warehouse">🏢 Warehouse</SelectItem>
                            <SelectItem value="cold-storage">❄️ Cold Storage</SelectItem>
                            <SelectItem value="farm-storage">🏡 Farm Storage</SelectItem>
                            <SelectItem value="open-storage">📦 Open Storage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                          Estimated Value (₹) *
                        </label>
                        <Input type="number" value={estimatedValue} onChange={(e) => setEstimatedValue(e.target.value)} placeholder="Total value" />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary, display: "block", marginBottom: spacing.xs }}>
                        Location *
                      </label>
                      <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Warehouse A, Sector 12" />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <DSButton variant="outline" size="lg" fullWidth onClick={() => { setShowAddForm(false); resetForm(); }}>
                        Cancel
                      </DSButton>
                      <DSButton variant="primary" size="lg" fullWidth onClick={handleSaveEntry}>
                        {editingEntry ? "Update Entry" : "Save Entry"}
                      </DSButton>
                    </div>
                  </div>
                </DSCard>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
