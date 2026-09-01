import { useState } from "react";
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
}

interface ActivityExpense {
  id: string;
  activityName: string;
  activityType: string;
  date: string;
  associatedInput?: string;
  expenseAmount: number;
  laborCost?: number;
  machineryRent?: number;
  otherCost?: number;
  receiptUrl?: string;
  photoUrl?: string;
  notes?: string;
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

export function InputCostTracker() {
  const [showAddPurchase, setShowAddPurchase] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddSale, setShowAddSale] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [showCustomActivity, setShowCustomActivity] = useState(false);
  const [showCustomUnit, setShowCustomUnit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

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
      associatedInput: "NPK 20-20-0 Fertilizer",
      expenseAmount: 600,
      laborCost: 600,
      notes: "2 laborers for spreading",
    },
    {
      id: "e3",
      activityName: "Mulching",
      activityType: "Mulching",
      date: "2025-10-20",
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
    associatedInput: undefined,
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

    const purchase: InputPurchase = {
      id: `p${Date.now()}`,
      productName: newPurchase.productName!,
      category: newPurchase.category || "Others",
      quantityPurchased: newPurchase.quantityPurchased!,
      quantityUsed: 0,
      unit: newPurchase.unit || "kg",
      pricePerUnit: newPurchase.pricePerUnit!,
      totalCost: newPurchase.quantityPurchased! * newPurchase.pricePerUnit!,
      purchaseDate: newPurchase.purchaseDate!,
      supplier: newPurchase.supplier || "",
      notes: newPurchase.notes,
    };

    setPurchases([purchase, ...purchases]);
    setShowAddPurchase(false);
    setNewPurchase({ 
      purchaseDate: new Date().toISOString().split("T")[0],
      category: undefined,
      unit: undefined,
    });
    toast.success("Input purchase added successfully!");
  };

  const handleAddExpense = () => {
    if (!newExpense.activityName || !newExpense.expenseAmount) {
      toast.error("Please fill all required fields");
      return;
    }

    const expense: ActivityExpense = {
      id: `e${Date.now()}`,
      activityName: newExpense.activityName!,
      activityType: newExpense.activityType || "Others",
      date: newExpense.date!,
      associatedInput: newExpense.associatedInput,
      expenseAmount: newExpense.expenseAmount!,
      laborCost: newExpense.laborCost,
      machineryRent: newExpense.machineryRent,
      otherCost: newExpense.otherCost,
      notes: newExpense.notes,
    };

    setExpenses([expense, ...expenses]);
    setShowAddExpense(false);
    setNewExpense({ 
      date: new Date().toISOString().split("T")[0],
      activityType: undefined,
      associatedInput: undefined,
    });
    toast.success("Activity expense added successfully!");
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
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
          <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
            Track purchases, activity costs, and daily profit
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
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchases.map((purchase) => {
                  const remaining = purchase.quantityPurchased - purchase.quantityUsed;
                  return (
                    <TableRow key={purchase.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package size={16} style={{ color: colors.accent.gold }} />
                          <span style={{ fontWeight: typography.weights.medium }}>
                            {purchase.productName}
                          </span>
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
                        {purchase.quantityUsed} {purchase.unit}
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
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => toast.info("Edit feature coming soon")}
                          >
                            <Edit size={14} style={{ color: colors.status.info }} />
                          </button>
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={() => toast.error("Delete feature coming soon")}
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
                  <TableHead>Associated Input</TableHead>
                  <TableHead className="text-right">Labor Cost</TableHead>
                  <TableHead className="text-right">Machinery</TableHead>
                  <TableHead className="text-right">Other</TableHead>
                  <TableHead className="text-right">Total Expense</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>
                      <span style={{ fontWeight: typography.weights.medium }}>
                        {expense.activityName}
                      </span>
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
                      {expense.associatedInput ? (
                        <DSBadge variant="blue">{expense.associatedInput}</DSBadge>
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
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => toast.info("Edit feature coming soon")}
                        >
                          <Edit size={14} style={{ color: colors.status.info }} />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => toast.error("Delete feature coming soon")}
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
                  value={newPurchase.category || undefined}
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
                  value={newPurchase.unit || undefined}
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
              <DSButton onClick={handleAddPurchase}>Add Purchase</DSButton>
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
              associatedInput: undefined,
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
                  value={newExpense.activityType || undefined}
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
                <Label>Associated Input (Optional)</Label>
                <Select
                  value={newExpense.associatedInput || undefined}
                  onValueChange={(value) => {
                    if (value === "none") {
                      setNewExpense({ ...newExpense, associatedInput: undefined });
                    } else {
                      setNewExpense({ ...newExpense, associatedInput: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select input" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {purchases.map((p) => (
                      <SelectItem key={p.id} value={p.productName}>
                        {p.productName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Expense Breakdown</Label>
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
              <Label>Notes</Label>
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
                    associatedInput: undefined,
                  });
                }}
              >
                Cancel
              </DSButton>
              <DSButton onClick={handleAddExpense}>Add Expense</DSButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom Category Dialog */}
      <Dialog open={showCustomCategory} onOpenChange={setShowCustomCategory}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Custom Category</DialogTitle>
            <DialogDescription>
              Create a new input category for organizing your purchases.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Category Name</Label>
              <Input
                placeholder="Enter category name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value;
                    if (value) {
                      setNewPurchase({ ...newPurchase, category: value });
                      setShowCustomCategory(false);
                      toast.success(`Custom category "${value}" added`);
                    }
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-3">
              <DSButton variant="outline" onClick={() => setShowCustomCategory(false)}>
                Cancel
              </DSButton>
              <DSButton
                onClick={() => {
                  const input = document.querySelector(
                    'input[placeholder="Enter category name"]'
                  ) as HTMLInputElement;
                  const value = input?.value;
                  if (value) {
                    setNewPurchase({ ...newPurchase, category: value });
                    setShowCustomCategory(false);
                    toast.success(`Custom category "${value}" added`);
                  }
                }}
              >
                Add
              </DSButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Similar dialogs for Custom Activity and Custom Unit */}
      <Dialog open={showCustomActivity} onOpenChange={setShowCustomActivity}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Custom Activity Type</DialogTitle>
            <DialogDescription>
              Create a new activity type for tracking specific farm operations.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Activity Type Name</Label>
              <Input
                placeholder="Enter activity type"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value;
                    if (value) {
                      setNewExpense({ ...newExpense, activityType: value });
                      setShowCustomActivity(false);
                      toast.success(`Custom activity type "${value}" added`);
                    }
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-3">
              <DSButton variant="outline" onClick={() => setShowCustomActivity(false)}>
                Cancel
              </DSButton>
              <DSButton
                onClick={() => {
                  const input = document.querySelector(
                    'input[placeholder="Enter activity type"]'
                  ) as HTMLInputElement;
                  const value = input?.value;
                  if (value) {
                    setNewExpense({ ...newExpense, activityType: value });
                    setShowCustomActivity(false);
                    toast.success(`Custom activity type "${value}" added`);
                  }
                }}
              >
                Add
              </DSButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
