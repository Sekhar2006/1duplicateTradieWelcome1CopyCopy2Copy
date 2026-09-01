import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Package,
  ShoppingCart,
  Calendar,
  DollarSign,
  Upload,
  Camera,
  Mic,
  FileText,
  Trash2,
  Edit,
  TrendingUp,
  TrendingDown,
  Download,
  X,
  AlertCircle,
  Save,
  Eye,
  Check,
  XCircle,
  Sparkles,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Separator } from "../ui/separator";
import { toast } from "sonner@2.0.3";
import { grokAI, type GrokFraudScore } from "./GrokAIService";
import { Checkbox } from "../ui/checkbox";

const { colors, typography, spacing, radius } = designTokens;

interface InputPurchase {
  id: string;
  productName: string;
  category: string;
  quantityPurchased: number;
  quantityUsed: number;
  unit: string;
  pricePerUnit: number;
  totalCost: number;
  purchaseDate: string;
  supplier: string;
  invoiceUrl?: string;
  photoUrl?: string;
  voiceNoteUrl?: string;
  notes?: string;
  grokScore?: GrokFraudScore;
}

interface ActivityExpense {
  id: string;
  activityName: string;
  activityType: string;
  date: string;
  relatedInputs: string[]; // Changed to array for multi-select
  expenseAmount: number;
  laborCost?: number;
  machineryRent?: number;
  otherCost?: number;
  receiptUrl?: string;
  photoUrl?: string;
  notes?: string;
  grokScore?: GrokFraudScore;
}

interface SalesEntry {
  id: string;
  crop: string;
  quantity: number;
  pricePerUnit: number;
  totalIncome: number;
  saleDate: string;
  buyer: string;
}

const inputCategories = [
  "Seeds",
  "Fertilizers",
  "Pesticides",
  "Herbicides",
  "Growth Regulators",
  "Irrigation Equipment",
  "Mulching Material",
  "Farm Tools",
  "Others",
];

const activityTypes = [
  "Ploughing",
  "Sowing/Transplanting",
  "Irrigation",
  "Fertilizer Application",
  "Pesticide Application",
  "Weeding",
  "Mulching",
  "Intercultural Operations",
  "Pruning/Training",
  "Harvesting",
  "Post-Harvest",
  "Others",
];

const units = ["kg", "liters", "bags", "packets", "pieces", "meters", "Others"];

export function InputCostTrackerEnhanced() {
  const [showAddPurchase, setShowAddPurchase] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddSale, setShowAddSale] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [showCustomActivity, setShowCustomActivity] = useState(false);
  const [showCustomUnit, setShowCustomUnit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [editingPurchaseId, setEditingPurchaseId] = useState<string | null>(null);
  const [editingQtyUsed, setEditingQtyUsed] = useState<number>(0);
  const [showRelatedInputs, setShowRelatedInputs] = useState(false);

  // Sample data
  const [purchases, setPurchases] = useState<InputPurchase[]>([
    {
      id: "p1",
      productName: "NPK 20-20-0 Fertilizer",
      category: "Fertilizers",
      quantityPurchased: 100,
      quantityUsed: 45,
      unit: "kg",
      pricePerUnit: 35,
      totalCost: 3500,
      purchaseDate: "2025-10-15",
      supplier: "Krishi Kendra",
      notes: "Bulk purchase discount 10%",
    },
    {
      id: "p2",
      productName: "Hybrid Wheat Seeds",
      category: "Seeds",
      quantityPurchased: 50,
      quantityUsed: 50,
      unit: "kg",
      pricePerUnit: 120,
      totalCost: 6000,
      purchaseDate: "2025-10-10",
      supplier: "Punjab Seeds Co.",
    },
    {
      id: "p3",
      productName: "Pesticide - Chlorpyrifos",
      category: "Pesticides",
      quantityPurchased: 10,
      quantityUsed: 3,
      unit: "liters",
      pricePerUnit: 450,
      totalCost: 4500,
      purchaseDate: "2025-10-18",
      supplier: "AgroChemicals Ltd",
    },
  ]);

  const [expenses, setExpenses] = useState<ActivityExpense[]>([
    {
      id: "e1",
      activityName: "Field Ploughing",
      activityType: "Ploughing",
      date: "2025-10-12",
      relatedInputs: [],
      expenseAmount: 1500,
      laborCost: 800,
      machineryRent: 700,
      notes: "Tractor rent for 4 hours",
    },
    {
      id: "e2",
      activityName: "Fertilizer Application",
      activityType: "Fertilizer Application",
      date: "2025-10-16",
      relatedInputs: ["NPK 20-20-0 Fertilizer"],
      expenseAmount: 600,
      laborCost: 600,
      notes: "2 laborers for spreading",
    },
    {
      id: "e3",
      activityName: "Mulching",
      activityType: "Mulching",
      date: "2025-10-20",
      relatedInputs: [],
      expenseAmount: 2200,
      laborCost: 1200,
      otherCost: 1000,
      notes: "Organic mulch material + labor",
    },
  ]);

  const [sales, setSales] = useState<SalesEntry[]>([
    {
      id: "s1",
      crop: "Wheat",
      quantity: 150,
      pricePerUnit: 220,
      totalIncome: 33000,
      saleDate: "2025-10-21",
      buyer: "Sharma Traders",
    },
  ]);

  // New purchase form state
  const [newPurchase, setNewPurchase] = useState<Partial<InputPurchase>>({
    purchaseDate: new Date().toISOString().split("T")[0],
    category: undefined,
    unit: undefined,
  });

  // New expense form state
  const [newExpense, setNewExpense] = useState<Partial<ActivityExpense>>({
    date: new Date().toISOString().split("T")[0],
    activityType: undefined,
    relatedInputs: [],
  });

  // New sale form state
  const [newSale, setNewSale] = useState<Partial<SalesEntry>>({
    saleDate: new Date().toISOString().split("T")[0],
  });

  // File upload handlers
  const handleFileUpload = async (
    type: "invoice" | "photo" | "voice",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file upload
      toast.success(`${type} uploaded: ${file.name}`);
      // In real app, upload to server and get URL
    }
  };

  const handleAddPurchase = () => {
    if (!newPurchase.productName || !newPurchase.quantityPurchased || !newPurchase.pricePerUnit) {
      toast.error("Please fill all required fields");
      return;
    }

    const totalCost = newPurchase.quantityPurchased! * newPurchase.pricePerUnit!;

    // Grok AI Fraud Detection
    const grokScore = grokAI.analyzeTransaction({
      type: "input_purchase",
      amount: totalCost,
      source: newPurchase.supplier || "Unknown",
      date: new Date(newPurchase.purchaseDate!),
      historicalData: purchases.map(p => ({
        amount: p.totalCost,
        date: p.purchaseDate,
      })),
    });

    const purchase: InputPurchase = {
      id: `p${Date.now()}`,
      productName: newPurchase.productName!,
      category: newPurchase.category || "Others",
      quantityPurchased: newPurchase.quantityPurchased!,
      quantityUsed: 0,
      unit: newPurchase.unit || "kg",
      pricePerUnit: newPurchase.pricePerUnit!,
      totalCost,
      purchaseDate: newPurchase.purchaseDate!,
      supplier: newPurchase.supplier || "",
      notes: newPurchase.notes,
      grokScore,
    };

    setPurchases([purchase, ...purchases]);
    setShowAddPurchase(false);
    setNewPurchase({ 
      purchaseDate: new Date().toISOString().split("T")[0],
      category: undefined,
      unit: undefined,
    });

    if (grokScore.level === "high" || grokScore.level === "critical") {
      toast.warning(`Grok AI Alert: ${grokScore.reason}`, {
        description: grokScore.recommendations.join(". "),
        duration: 5000,
      });
    } else {
      toast.success("Input purchase added successfully!");
    }
  };

  const handleAddExpense = () => {
    if (!newExpense.activityName || !newExpense.expenseAmount) {
      toast.error("Please fill all required fields");
      return;
    }

    // Grok AI Fraud Detection
    const grokScore = grokAI.analyzeTransaction({
      type: "activity_expense",
      amount: newExpense.expenseAmount!,
      source: newExpense.activityType || "Unknown",
      date: new Date(newExpense.date!),
      historicalData: expenses.map(e => ({
        amount: e.expenseAmount,
        date: e.date,
      })),
    });

    const expense: ActivityExpense = {
      id: `e${Date.now()}`,
      activityName: newExpense.activityName!,
      activityType: newExpense.activityType || "Others",
      date: newExpense.date!,
      relatedInputs: newExpense.relatedInputs || [],
      expenseAmount: newExpense.expenseAmount!,
      laborCost: newExpense.laborCost,
      machineryRent: newExpense.machineryRent,
      otherCost: newExpense.otherCost,
      notes: newExpense.notes,
      grokScore,
    };

    setExpenses([expense, ...expenses]);
    setShowAddExpense(false);
    setNewExpense({ 
      date: new Date().toISOString().split("T")[0],
      activityType: undefined,
      relatedInputs: [],
    });

    if (grokScore.level === "high" || grokScore.level === "critical") {
      toast.warning(`Grok AI Alert: ${grokScore.reason}`, {
        description: grokScore.recommendations.join(". "),
        duration: 5000,
      });
    } else {
      toast.success("Activity expense added successfully!");
    }
  };

  const handleAddSale = () => {
    if (!newSale.crop || !newSale.quantity || !newSale.pricePerUnit) {
      toast.error("Please fill all required fields");
      return;
    }

    const sale: SalesEntry = {
      id: `s${Date.now()}`,
      crop: newSale.crop!,
      quantity: newSale.quantity!,
      pricePerUnit: newSale.pricePerUnit!,
      totalIncome: newSale.quantity! * newSale.pricePerUnit!,
      saleDate: newSale.saleDate!,
      buyer: newSale.buyer || "",
    };

    setSales([sale, ...sales]);
    setShowAddSale(false);
    setNewSale({ 
      saleDate: new Date().toISOString().split("T")[0],
    });
    toast.success("Sale entry added successfully!");
  };

  const handleUpdateQuantityUsed = (purchaseId: string, newQtyUsed: number) => {
    setPurchases(purchases.map(p => {
      if (p.id === purchaseId) {
        if (newQtyUsed > p.quantityPurchased) {
          toast.error("Quantity used cannot exceed quantity purchased");
          return p;
        }
        return { ...p, quantityUsed: newQtyUsed };
      }
      return p;
    }));
    setEditingPurchaseId(null);
    toast.success("Quantity updated successfully!");
  };

  const handleToggleRelatedInput = (inputName: string) => {
    setNewExpense(prev => {
      const current = prev.relatedInputs || [];
      if (current.includes(inputName)) {
        return { ...prev, relatedInputs: current.filter(i => i !== inputName) };
      } else {
        return { ...prev, relatedInputs: [...current, inputName] };
      }
    });
  };

  // Calculate daily summary
  const calculateDailySummary = (date: string) => {
    const dailyPurchases = purchases.filter((p) => p.purchaseDate === date);
    const dailyExpenses = expenses.filter((e) => e.date === date);
    const dailySales = sales.filter((s) => s.saleDate === date);

    const totalInputCost = dailyPurchases.reduce((sum, p) => sum + p.totalCost, 0);
    const totalActivityExpense = dailyExpenses.reduce((sum, e) => sum + e.expenseAmount, 0);
    const totalIncome = dailySales.reduce((sum, s) => sum + s.totalIncome, 0);
    const netProfit = totalIncome - (totalInputCost + totalActivityExpense);

    return {
      totalInputCost,
      totalActivityExpense,
      totalIncome,
      netProfit,
    };
  };

  const dailySummary = calculateDailySummary(selectedDate);

  // Calculate total inventory value
  const totalInventoryValue = purchases.reduce((sum, p) => {
    const remainingQty = p.quantityPurchased - p.quantityUsed;
    return sum + remainingQty * p.pricePerUnit;
  }, 0);

  // Get Grok AI system health
  const systemHealth = grokAI.getSystemHealth({
    totalTransactions: purchases.length + expenses.length,
    flaggedTransactions: [...purchases, ...expenses].filter(
      item => item.grokScore && (item.grokScore.level === "high" || item.grokScore.level === "critical")
    ).length,
    activeAlerts: 0,
    verifiedActivities: purchases.length + expenses.length,
    totalActivities: purchases.length + expenses.length,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2
              style={{
                fontFamily: typography.fonts.heading,
                fontSize: typography.sizes["2xl"],
                color: colors.blue.primary,
                fontWeight: typography.weights.bold,
              }}
            >
              Input Costs & Activity Expenses
            </h2>
            {systemHealth.status !== "healthy" && (
              <DSBadge 
                variant={systemHealth.status === "critical" ? "error" : "warning"}
              >
                <Sparkles size={12} className="mr-1" />
                Grok: {systemHealth.status}
              </DSBadge>
            )}
          </div>
          <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
            Track purchases, activity costs, and daily profit with AI-powered fraud detection
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Label style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
              View Date:
            </Label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40"
            />
          </div>
          <DSButton leftIcon={<Download size={16} />} variant="outline" size="sm">
            Export Report
          </DSButton>
        </div>
      </div>

      {/* Daily Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DSCard>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                  Input Costs Today
                </p>
                <ShoppingCart size={20} style={{ color: colors.status.error }} />
              </div>
              <p
                style={{
                  fontSize: typography.sizes["2xl"],
                  fontWeight: typography.weights.bold,
                  color: colors.status.error,
                }}
              >
                ₹{dailySummary.totalInputCost.toLocaleString()}
              </p>
            </div>
          </DSCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DSCard>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                  Activity Expenses
                </p>
                <Package size={20} style={{ color: colors.status.warning }} />
              </div>
              <p
                style={{
                  fontSize: typography.sizes["2xl"],
                  fontWeight: typography.weights.bold,
                  color: colors.status.warning,
                }}
              >
                ₹{dailySummary.totalActivityExpense.toLocaleString()}
              </p>
            </div>
          </DSCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DSCard>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                  Sales Income
                </p>
                <TrendingUp size={20} style={{ color: colors.status.success }} />
              </div>
              <p
                style={{
                  fontSize: typography.sizes["2xl"],
                  fontWeight: typography.weights.bold,
                  color: colors.status.success,
                }}
              >
                ₹{dailySummary.totalIncome.toLocaleString()}
              </p>
              <DSButton 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowAddSale(true)}
                className="mt-2 w-full"
              >
                <Plus size={14} className="mr-1" />
                Add Sale
              </DSButton>
            </div>
          </DSCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DSCard>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                  Net Profit
                </p>
                {dailySummary.netProfit >= 0 ? (
                  <TrendingUp size={20} style={{ color: colors.status.success }} />
                ) : (
                  <TrendingDown size={20} style={{ color: colors.status.error }} />
                )}
              </div>
              <p
                style={{
                  fontSize: typography.sizes["2xl"],
                  fontWeight: typography.weights.bold,
                  color: dailySummary.netProfit >= 0 ? colors.status.success : colors.status.error,
                }}
              >
                {dailySummary.netProfit >= 0 ? "+" : ""}₹
                {dailySummary.netProfit.toLocaleString()}
              </p>
            </div>
          </DSCard>
        </motion.div>
      </div>

      {/* Input Costs & Inventory Section */}
      <DSCard>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                style={{
                  fontFamily: typography.fonts.heading,
                  fontSize: typography.sizes.lg,
                  color: colors.blue.primary,
                  fontWeight: typography.weights.semibold,
                }}
              >
                Input Costs & Inventory
              </h3>
              <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                Total Inventory Value: ₹{totalInventoryValue.toLocaleString()}
              </p>
            </div>
            <DSButton leftIcon={<Plus size={16} />} onClick={() => setShowAddPurchase(true)}>
              Add Input Purchase
            </DSButton>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead className="text-right">Qty Purchased</TableHead>
                  <TableHead className="text-right">Qty Used</TableHead>
                  <TableHead className="text-right">Remaining</TableHead>
                  <TableHead className="text-right">Price/Unit</TableHead>
                  <TableHead className="text-right">Total Cost</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-center">Upload</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchases.map((purchase) => {
                  const remaining = purchase.quantityPurchased - purchase.quantityUsed;
                  const isEditing = editingPurchaseId === purchase.id;
                  return (
                    <TableRow key={purchase.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package size={16} style={{ color: colors.accent.gold }} />
                          <div>
                            <span style={{ fontWeight: typography.weights.medium }}>
                              {purchase.productName}
                            </span>
                            {purchase.grokScore && purchase.grokScore.level !== "safe" && (
                              <div className="flex items-center gap-1 mt-1">
                                <AlertCircle size={12} style={{ 
                                  color: purchase.grokScore.level === "critical" ? colors.status.error :
                                         purchase.grokScore.level === "high" ? colors.status.warning :
                                         colors.status.info
                                }} />
                                <span style={{ 
                                  fontSize: typography.sizes.xs,
                                  color: colors.text.tertiary
                                }}>
                                  Risk: {purchase.grokScore.level}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DSBadge variant="blue">{purchase.category}</DSBadge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} style={{ color: colors.text.tertiary }} />
                          {new Date(purchase.purchaseDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {purchase.quantityPurchased} {purchase.unit}
                      </TableCell>
                      <TableCell className="text-right">
                        {isEditing ? (
                          <div className="flex items-center gap-1 justify-end">
                            <Input
                              type="number"
                              value={editingQtyUsed}
                              onChange={(e) => setEditingQtyUsed(Number(e.target.value))}
                              className="w-20 h-8"
                              min={0}
                              max={purchase.quantityPurchased}
                            />
                            <button
                              onClick={() => handleUpdateQuantityUsed(purchase.id, editingQtyUsed)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Check size={14} style={{ color: colors.status.success }} />
                            </button>
                            <button
                              onClick={() => setEditingPurchaseId(null)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <XCircle size={14} style={{ color: colors.status.error }} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingPurchaseId(purchase.id);
                              setEditingQtyUsed(purchase.quantityUsed);
                            }}
                            className="hover:underline"
                            style={{ color: colors.blue.primary }}
                          >
                            {purchase.quantityUsed} {purchase.unit}
                          </button>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          style={{
                            fontWeight: typography.weights.semibold,
                            color: remaining > 0 ? colors.status.success : colors.text.tertiary,
                          }}
                        >
                          {remaining} {purchase.unit}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">₹{purchase.pricePerUnit}</TableCell>
                      <TableCell className="text-right">
                        <span style={{ fontWeight: typography.weights.semibold }}>
                          ₹{purchase.totalCost.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>{purchase.supplier}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <label>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => handleFileUpload("invoice", e)}
                            />
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Upload size={14} style={{ color: colors.status.info }} />
                            </button>
                          </label>
                          <label>
                            <input
                              type="file"
                              accept="image/*"
                              capture="environment"
                              className="hidden"
                              onChange={(e) => handleFileUpload("photo", e)}
                            />
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Camera size={14} style={{ color: colors.status.info }} />
                            </button>
                          </label>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => toast.info("Edit feature coming soon")}
                          >
                            <Edit size={14} style={{ color: colors.status.info }} />
                          </button>
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => {
                              setPurchases(purchases.filter(p => p.id !== purchase.id));
                              toast.success("Purchase deleted");
                            }}
                          >
                            <Trash2 size={14} style={{ color: colors.status.error }} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </DSCard>

      {/* Activity Expenses Section */}
      <DSCard>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3
              style={{
                fontFamily: typography.fonts.heading,
                fontSize: typography.sizes.lg,
                color: colors.blue.primary,
                fontWeight: typography.weights.semibold,
              }}
            >
              Activity Expenses
            </h3>
            <DSButton leftIcon={<Plus size={16} />} onClick={() => setShowAddExpense(true)}>
              Add Activity Expense
            </DSButton>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Related Inputs</TableHead>
                  <TableHead className="text-right">Labor Cost</TableHead>
                  <TableHead className="text-right">Machinery</TableHead>
                  <TableHead className="text-right">Other</TableHead>
                  <TableHead className="text-right">Total Expense</TableHead>
                  <TableHead className="text-center">Upload</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>
                      <div>
                        <span style={{ fontWeight: typography.weights.medium }}>
                          {expense.activityName}
                        </span>
                        {expense.grokScore && expense.grokScore.level !== "safe" && (
                          <div className="flex items-center gap-1 mt-1">
                            <AlertCircle size={12} style={{ 
                              color: expense.grokScore.level === "critical" ? colors.status.error :
                                     expense.grokScore.level === "high" ? colors.status.warning :
                                     colors.status.info
                            }} />
                            <span style={{ 
                              fontSize: typography.sizes.xs,
                              color: colors.text.tertiary
                            }}>
                              Risk: {expense.grokScore.level}
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DSBadge variant="info">{expense.activityType}</DSBadge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} style={{ color: colors.text.tertiary }} />
                        {new Date(expense.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {expense.relatedInputs && expense.relatedInputs.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {expense.relatedInputs.map((input, idx) => (
                            <DSBadge key={idx} variant="blue">{input}</DSBadge>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: colors.text.tertiary }}>-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {expense.laborCost ? `₹${expense.laborCost}` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {expense.machineryRent ? `₹${expense.machineryRent}` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {expense.otherCost ? `₹${expense.otherCost}` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        style={{
                          fontWeight: typography.weights.semibold,
                          color: colors.status.warning,
                        }}
                      >
                        ₹{expense.expenseAmount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <label>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={(e) => handleFileUpload("invoice", e)}
                          />
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Upload size={14} style={{ color: colors.status.info }} />
                          </button>
                        </label>
                        <label>
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            onChange={(e) => handleFileUpload("photo", e)}
                          />
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Camera size={14} style={{ color: colors.status.info }} />
                          </button>
                        </label>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => toast.info("Edit feature coming soon")}
                        >
                          <Edit size={14} style={{ color: colors.status.info }} />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => {
                            setExpenses(expenses.filter(e => e.id !== expense.id));
                            toast.success("Expense deleted");
                          }}
                        >
                          <Trash2 size={14} style={{ color: colors.status.error }} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DSCard>

      {/* Add Input Purchase Dialog */}
      <Dialog 
        open={showAddPurchase} 
        onOpenChange={(open) => {
          setShowAddPurchase(open);
          if (!open) {
            setNewPurchase({ 
              purchaseDate: new Date().toISOString().split("T")[0],
              category: undefined,
              unit: undefined,
            });
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Input Purchase</DialogTitle>
            <DialogDescription>
              Record details of seeds, fertilizers, pesticides, or other inputs purchased for your crops.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Product Name *</Label>
                <Input
                  placeholder="Enter product name"
                  value={newPurchase.productName || ""}
                  onChange={(e) => setNewPurchase({ ...newPurchase, productName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={newPurchase.category || ""}
                  onValueChange={(value) => {
                    if (value === "Others") {
                      setShowCustomCategory(true);
                    } else {
                      setNewPurchase({ ...newPurchase, category: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {inputCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Quantity Purchased *</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newPurchase.quantityPurchased || ""}
                  onChange={(e) =>
                    setNewPurchase({ ...newPurchase, quantityPurchased: Number(e.target.value) })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Unit *</Label>
                <Select
                  value={newPurchase.unit || ""}
                  onValueChange={(value) => {
                    if (value === "Others") {
                      setShowCustomUnit(true);
                    } else {
                      setNewPurchase({ ...newPurchase, unit: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Price per Unit (₹) *</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newPurchase.pricePerUnit || ""}
                  onChange={(e) =>
                    setNewPurchase({ ...newPurchase, pricePerUnit: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Purchase Date *</Label>
                <Input
                  type="date"
                  value={newPurchase.purchaseDate || ""}
                  onChange={(e) => setNewPurchase({ ...newPurchase, purchaseDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Supplier</Label>
                <Input
                  placeholder="Enter supplier name"
                  value={newPurchase.supplier || ""}
                  onChange={(e) => setNewPurchase({ ...newPurchase, supplier: e.target.value })}
                />
              </div>
            </div>

            {newPurchase.quantityPurchased && newPurchase.pricePerUnit && (
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: colors.surface.secondary }}
              >
                <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                  Total Cost
                </p>
                <p
                  style={{
                    fontSize: typography.sizes["2xl"],
                    fontWeight: typography.weights.bold,
                    color: colors.blue.primary,
                  }}
                >
                  ₹{(newPurchase.quantityPurchased * newPurchase.pricePerUnit).toLocaleString()}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label>Upload Invoice/Receipt</Label>
              <div className="flex gap-2">
                <label className="flex-1">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFileUpload("invoice", e)}
                  />
                  <DSButton variant="outline" size="sm" leftIcon={<Upload size={14} />} asChild>
                    <span>Invoice</span>
                  </DSButton>
                </label>
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => handleFileUpload("photo", e)}
                  />
                  <DSButton variant="outline" size="sm" leftIcon={<Camera size={14} />} asChild>
                    <span>Photo</span>
                  </DSButton>
                </label>
                <label>
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload("voice", e)}
                  />
                  <DSButton variant="outline" size="sm" leftIcon={<Mic size={14} />} asChild>
                    <span>Voice Note</span>
                  </DSButton>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                placeholder="Additional notes..."
                value={newPurchase.notes || ""}
                onChange={(e) => setNewPurchase({ ...newPurchase, notes: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <DSButton 
                variant="outline" 
                onClick={() => {
                  setShowAddPurchase(false);
                  setNewPurchase({ 
                    purchaseDate: new Date().toISOString().split("T")[0],
                    category: undefined,
                    unit: undefined,
                  });
                }}
              >
                Cancel
              </DSButton>
              <DSButton onClick={handleAddPurchase}>
                <Sparkles size={14} className="mr-2" />
                Add with Grok Check
              </DSButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Activity Expense Dialog */}
      <Dialog 
        open={showAddExpense} 
        onOpenChange={(open) => {
          setShowAddExpense(open);
          if (!open) {
            setNewExpense({ 
              date: new Date().toISOString().split("T")[0],
              activityType: undefined,
              relatedInputs: [],
            });
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Activity Expense</DialogTitle>
            <DialogDescription>
              Record expenses for activities like plowing, sowing, irrigation, harvesting, and more.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Activity Name *</Label>
                <Input
                  placeholder="Enter activity name"
                  value={newExpense.activityName || ""}
                  onChange={(e) => setNewExpense({ ...newExpense, activityName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Activity Type *</Label>
                <Select
                  value={newExpense.activityType || ""}
                  onValueChange={(value) => {
                    if (value === "Others") {
                      setShowCustomActivity(true);
                    } else {
                      setNewExpense({ ...newExpense, activityType: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date *</Label>
                <Input
                  type="date"
                  value={newExpense.date || ""}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Total Expense Amount (₹) *</Label>
                <Input
                  type="number"
                  placeholder="Or enter breakdown below"
                  value={newExpense.expenseAmount || ""}
                  onChange={(e) => setNewExpense({ ...newExpense, expenseAmount: Number(e.target.value) })}
                />
              </div>
            </div>

            {/* Related Inputs - Multi-select */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Related Inputs (Optional)</Label>
                <DSButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRelatedInputs(!showRelatedInputs)}
                >
                  {showRelatedInputs ? "Hide" : "Show"} ({newExpense.relatedInputs?.length || 0} selected)
                </DSButton>
              </div>
              {showRelatedInputs && (
                <div 
                  className="p-4 rounded-lg border space-y-2 max-h-40 overflow-y-auto"
                  style={{ borderColor: colors.border.default }}
                >
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`input-${purchase.id}`}
                        checked={newExpense.relatedInputs?.includes(purchase.productName)}
                        onCheckedChange={() => handleToggleRelatedInput(purchase.productName)}
                      />
                      <Label 
                        htmlFor={`input-${purchase.id}`}
                        className="cursor-pointer flex-1"
                      >
                        {purchase.productName} ({purchase.category})
                      </Label>
                    </div>
                  ))}
                  {purchases.length === 0 && (
                    <p style={{ 
                      fontSize: typography.sizes.sm, 
                      color: colors.text.tertiary,
                      textAlign: "center"
                    }}>
                      No input purchases available
                    </p>
                  )}
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Expense Breakdown (Optional)</Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Labor Cost (₹)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newExpense.laborCost || ""}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        laborCost: Number(e.target.value),
                        expenseAmount:
                          Number(e.target.value) +
                          (newExpense.machineryRent || 0) +
                          (newExpense.otherCost || 0),
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Machinery Rent (₹)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newExpense.machineryRent || ""}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        machineryRent: Number(e.target.value),
                        expenseAmount:
                          (newExpense.laborCost || 0) +
                          Number(e.target.value) +
                          (newExpense.otherCost || 0),
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Other Costs (₹)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newExpense.otherCost || ""}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        otherCost: Number(e.target.value),
                        expenseAmount:
                          (newExpense.laborCost || 0) +
                          (newExpense.machineryRent || 0) +
                          Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {newExpense.expenseAmount && newExpense.expenseAmount > 0 && (
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: colors.surface.secondary }}
              >
                <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                  Total Expense
                </p>
                <p
                  style={{
                    fontSize: typography.sizes["2xl"],
                    fontWeight: typography.weights.bold,
                    color: colors.status.warning,
                  }}
                >
                  ₹{newExpense.expenseAmount.toLocaleString()}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label>Upload Receipt/Photo</Label>
              <div className="flex gap-2">
                <label className="flex-1">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => handleFileUpload("invoice", e)}
                  />
                  <DSButton variant="outline" size="sm" leftIcon={<Upload size={14} />} asChild>
                    <span>Receipt</span>
                  </DSButton>
                </label>
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => handleFileUpload("photo", e)}
                  />
                  <DSButton variant="outline" size="sm" leftIcon={<Camera size={14} />} asChild>
                    <span>Photo</span>
                  </DSButton>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Remarks</Label>
              <Textarea
                placeholder="Additional notes..."
                value={newExpense.notes || ""}
                onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <DSButton 
                variant="outline" 
                onClick={() => {
                  setShowAddExpense(false);
                  setNewExpense({ 
                    date: new Date().toISOString().split("T")[0],
                    activityType: undefined,
                    relatedInputs: [],
                  });
                }}
              >
                Cancel
              </DSButton>
              <DSButton onClick={handleAddExpense}>
                <Sparkles size={14} className="mr-2" />
                Add with Grok Check
              </DSButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Sale Dialog */}
      <Dialog 
        open={showAddSale} 
        onOpenChange={(open) => {
          setShowAddSale(open);
          if (!open) {
            setNewSale({ 
              saleDate: new Date().toISOString().split("T")[0],
            });
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Sales Entry</DialogTitle>
            <DialogDescription>
              Record revenue from selling your produce or crops.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Crop/Product *</Label>
              <Input
                placeholder="Enter crop or product name"
                value={newSale.crop || ""}
                onChange={(e) => setNewSale({ ...newSale, crop: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Quantity Sold *</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newSale.quantity || ""}
                  onChange={(e) => setNewSale({ ...newSale, quantity: Number(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label>Price per Unit (₹) *</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newSale.pricePerUnit || ""}
                  onChange={(e) => setNewSale({ ...newSale, pricePerUnit: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sale Date *</Label>
                <Input
                  type="date"
                  value={newSale.saleDate || ""}
                  onChange={(e) => setNewSale({ ...newSale, saleDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Buyer</Label>
                <Input
                  placeholder="Buyer name"
                  value={newSale.buyer || ""}
                  onChange={(e) => setNewSale({ ...newSale, buyer: e.target.value })}
                />
              </div>
            </div>

            {newSale.quantity && newSale.pricePerUnit && (
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: colors.surface.secondary }}
              >
                <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                  Total Income
                </p>
                <p
                  style={{
                    fontSize: typography.sizes["2xl"],
                    fontWeight: typography.weights.bold,
                    color: colors.status.success,
                  }}
                >
                  ₹{(newSale.quantity * newSale.pricePerUnit).toLocaleString()}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <DSButton 
                variant="outline" 
                onClick={() => {
                  setShowAddSale(false);
                  setNewSale({ 
                    saleDate: new Date().toISOString().split("T")[0],
                  });
                }}
              >
                Cancel
              </DSButton>
              <DSButton onClick={handleAddSale}>Add Sale</DSButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
