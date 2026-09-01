import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Database, Plus, Search, ChevronRight, Package, TrendingUp, Shield, AlertTriangle, Bot } from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

const { colors, typography, spacing } = designTokens;

interface Commodity {
  name: string;
  varieties: string[];
  icon: string;
}

const commoditiesData: Record<string, Commodity[]> = {
  Spices: [
    { name: "Turmeric", varieties: ["Alleppey Finger", "Rajapore", "Erode"], icon: "🌿" },
    { name: "Chili", varieties: ["Teja", "Sannam", "Byadgi"], icon: "🌶️" },
    { name: "Coriander", varieties: ["Eagle", "Scooter", "Sadhana"], icon: "🍃" },
    { name: "Cumin", varieties: ["Gujarat", "Rajasthan", "Kota"], icon: "🌾" },
    { name: "Black Pepper", varieties: ["Panniyur", "Subhakara", "Sreekara"], icon: "⚫" },
  ],
  Pulses: [
    { name: "Chickpea", varieties: ["Kabuli", "Desi"], icon: "🥜" },
    { name: "Pigeon Pea", varieties: ["Asha", "Amar", "Bahar"], icon: "🌰" },
    { name: "Lentil", varieties: ["Masoor", "Malka"], icon: "🔴" },
    { name: "Mung Bean", varieties: ["Pusa Bold", "Pusa Vishal"], icon: "🟢" },
    { name: "Black Gram", varieties: ["T9", "Pant U19"], icon: "⚫" },
  ],
  Grains: [
    { name: "Wheat", varieties: ["PBW 343", "HD 2967", "DBW 17"], icon: "🌾" },
    { name: "Rice", varieties: ["Basmati", "IR64", "Sona Masuri"], icon: "🍚" },
    { name: "Barley", varieties: ["RD 2552", "PL 426"], icon: "🌾" },
    { name: "Maize", varieties: ["DHM 117", "Vivek Hybrid"], icon: "🌽" },
    { name: "Sorghum", varieties: ["CSH 16", "SPV 462"], icon: "🌾" },
  ],
  Oilseeds: [
    { name: "Mustard", varieties: ["Pusa Bold", "Varuna", "Kranti"], icon: "🌻" },
    { name: "Groundnut", varieties: ["TMV 13", "Kadiri"], icon: "🥜" },
    { name: "Sunflower", varieties: ["KBSH 1", "PSH 569"], icon: "🌻" },
    { name: "Sesame", varieties: ["Gujarat TKG 55", "RT 346"], icon: "🌰" },
    { name: "Soybean", varieties: ["JS 335", "JS 93-05"], icon: "🌱" },
  ],
  Vegetables: [
    { name: "Tomato", varieties: ["Pusa Ruby", "Roma", "Cherry"], icon: "🍅" },
    { name: "Onion", varieties: ["Nasik Red", "Poona White"], icon: "🧅" },
    { name: "Potato", varieties: ["Kufri Jyoti", "Kufri Pukhraj"], icon: "🥔" },
    { name: "Cabbage", varieties: ["Pride of India", "Golden Acre"], icon: "🥬" },
    { name: "Cauliflower", varieties: ["Pusa Snowball", "Early Kunwari"], icon: "🥦" },
  ],
  Fruits: [
    { name: "Mango", varieties: ["Alphonso", "Dasheri", "Langra"], icon: "🥭" },
    { name: "Banana", varieties: ["Robusta", "Dwarf Cavendish"], icon: "🍌" },
    { name: "Apple", varieties: ["Red Delicious", "Royal Gala"], icon: "🍎" },
    { name: "Grapes", varieties: ["Thompson Seedless", "Bangalore Blue"], icon: "🍇" },
    { name: "Orange", varieties: ["Nagpur", "Coorg"], icon: "🍊" },
  ],
};

export function CommoditiesDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Spices");
  const [expandedCommodity, setExpandedCommodity] = useState<string | null>(null);
  const [uploadActivityDetected, setUploadActivityDetected] = useState(false);

  const categories = Object.keys(commoditiesData);

  // Simulate Grok monitoring for unusual upload patterns
  useEffect(() => {
    // Simulated: Check for repetitive uploads or odd classification
    const checkInterval = setInterval(() => {
      // Random simulation - in real app, this would check actual upload patterns
      const hasAnomalousActivity = Math.random() > 0.9;
      setUploadActivityDetected(hasAnomalousActivity);
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkInterval);
  }, []);

  const filteredCommodities = searchTerm
    ? Object.entries(commoditiesData).flatMap(([category, commodities]) =>
        commodities
          .filter((c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.varieties.some((v) => v.toLowerCase().includes(searchTerm.toLowerCase()))
          )
          .map((c) => ({ ...c, category }))
      )
    : commoditiesData[activeCategory].map((c) => ({ ...c, category: activeCategory }));

  const totalCommodities = Object.values(commoditiesData).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const totalVarieties = Object.values(commoditiesData).reduce(
    (sum, arr) => sum + arr.reduce((vSum, c) => vSum + c.varieties.length, 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Grok Monitoring Alert */}
      {uploadActivityDetected && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DSCard
            variant="default"
            padding="md"
            className="border-2"
            style={{ borderColor: colors.status.warning }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle size={24} style={{ color: colors.status.warning }} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4
                    style={{
                      fontSize: typography.sizes.base,
                      fontWeight: typography.weights.semibold,
                      color: colors.text.primary,
                    }}
                  >
                    Grok AI: Upload Pattern Alert
                  </h4>
                  <DSBadge variant="warning" size="sm">
                    Medium Risk
                  </DSBadge>
                </div>
                <p
                  style={{
                    fontSize: typography.sizes.sm,
                    color: colors.text.secondary,
                    marginBottom: spacing.sm,
                  }}
                >
                  Unusual commodity upload pattern detected. Multiple similar entries in short timeframe.
                </p>
                <div className="flex gap-2">
                  <DSButton variant="outline" size="sm" leftIcon={<Bot size={16} />}>
                    Review with Grok
                  </DSButton>
                  <DSButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setUploadActivityDetected(false)}
                  >
                    Dismiss
                  </DSButton>
                </div>
              </div>
            </div>
          </DSCard>
        </motion.div>
      )}

      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DSCard variant="default" padding="md">
          <div className="text-center">
            <Database size={24} className="mx-auto mb-2" style={{ color: colors.blue.primary }} />
            <p
              style={{
                fontSize: typography.sizes["2xl"],
                fontWeight: typography.weights.bold,
                color: colors.text.primary,
              }}
            >
              {categories.length}
            </p>
            <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
              Categories
            </p>
          </div>
        </DSCard>

        <DSCard variant="default" padding="md">
          <div className="text-center">
            <Package size={24} className="mx-auto mb-2" style={{ color: colors.status.success }} />
            <p
              style={{
                fontSize: typography.sizes["2xl"],
                fontWeight: typography.weights.bold,
                color: colors.text.primary,
              }}
            >
              {totalCommodities}
            </p>
            <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
              Commodities
            </p>
          </div>
        </DSCard>

        <DSCard variant="default" padding="md">
          <div className="text-center">
            <TrendingUp size={24} className="mx-auto mb-2" style={{ color: colors.accent.gold }} />
            <p
              style={{
                fontSize: typography.sizes["2xl"],
                fontWeight: typography.weights.bold,
                color: colors.text.primary,
              }}
            >
              {totalVarieties}
            </p>
            <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
              Varieties
            </p>
          </div>
        </DSCard>

        <DSCard variant="gold" padding="md">
          <div className="text-center">
            <DSButton variant="primary" size="sm" leftIcon={<Plus size={16} />} fullWidth>
              Add New
            </DSButton>
            <p
              className="mt-2"
              style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}
            >
              Report commodity
            </p>
          </div>
        </DSCard>
      </div>

      {/* Main Database */}
      <DSCard variant="elevated" padding="lg">
        <div className="flex items-center justify-between mb-6">
          <h3
            style={{
              fontFamily: typography.fonts.subheading,
              fontSize: typography.sizes.lg,
              fontWeight: typography.weights.semibold,
              color: colors.blue.primary,
            }}
          >
            📚 Commodities Database
          </h3>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: colors.text.muted }}
            />
            <Input
              type="text"
              placeholder="Search commodities or varieties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Tabs */}
        {!searchTerm && (
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mb-6">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat} ({commoditiesData[cat].length})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {/* Commodities List */}
        <ScrollArea className="h-[600px]">
          <div className="space-y-3">
            {filteredCommodities.length > 0 ? (
              filteredCommodities.map((commodity, index) => (
                <motion.div
                  key={`${commodity.category}-${commodity.name}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <DSCard
                    variant="default"
                    padding="md"
                    hoverable
                    onClick={() =>
                      setExpandedCommodity(
                        expandedCommodity === commodity.name ? null : commodity.name
                      )
                    }
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                          style={{ backgroundColor: `${colors.blue.primary}10` }}
                        >
                          {commodity.icon}
                        </div>
                        <div className="flex-1">
                          <p
                            style={{
                              fontSize: typography.sizes.base,
                              fontWeight: typography.weights.semibold,
                              color: colors.text.primary,
                            }}
                          >
                            {commodity.name}
                          </p>
                          <p
                            style={{
                              fontSize: typography.sizes.xs,
                              color: colors.text.secondary,
                              marginTop: spacing.xs,
                            }}
                          >
                            {commodity.varieties.length} varieties available
                          </p>
                          {searchTerm && (
                            <DSBadge variant="blue" size="sm" className="mt-2">
                              {commodity.category}
                            </DSBadge>
                          )}
                        </div>
                      </div>
                      <ChevronRight
                        size={20}
                        className="flex-shrink-0"
                        style={{ color: colors.text.muted }}
                      />
                    </div>

                    {expandedCommodity === commodity.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="mt-4 pt-4 border-t"
                        style={{ borderColor: colors.border.light }}
                      >
                        <p
                          className="mb-2"
                          style={{
                            fontSize: typography.sizes.sm,
                            fontWeight: typography.weights.medium,
                            color: colors.text.primary,
                          }}
                        >
                          Available Varieties:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {commodity.varieties.map((variety) => (
                            <DSBadge key={variety} variant="blue" size="sm">
                              {variety}
                            </DSBadge>
                          ))}
                        </div>

                        <div className="mt-4 flex gap-2">
                          <DSButton variant="outline" size="sm">
                            View Market Price
                          </DSButton>
                          <DSButton variant="outline" size="sm">
                            Add to My Crops
                          </DSButton>
                        </div>
                      </motion.div>
                    )}
                  </DSCard>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Database size={48} className="mx-auto mb-4" style={{ color: colors.text.muted }} />
                <p
                  style={{
                    fontSize: typography.sizes.base,
                    color: colors.text.secondary,
                  }}
                >
                  No commodities found matching "{searchTerm}"
                </p>
                <DSButton variant="outline" size="sm" className="mt-4" onClick={() => setSearchTerm("")}>
                  Clear Search
                </DSButton>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer Info */}
        <div
          className="mt-6 pt-6 border-t"
          style={{ borderColor: colors.border.light }}
        >
          <div className="flex items-center justify-between">
            <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
              Can't find your commodity?
            </p>
            <DSButton variant="primary" size="sm" leftIcon={<Plus size={16} />}>
              Report New Commodity
            </DSButton>
          </div>
        </div>
      </DSCard>

      {/* Category Quick Links */}
      <DSCard variant="default" padding="lg">
        <h3
          className="mb-4"
          style={{
            fontFamily: typography.fonts.subheading,
            fontSize: typography.sizes.base,
            fontWeight: typography.weights.semibold,
            color: colors.blue.primary,
          }}
        >
          Browse by Category
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setSearchTerm("");
              }}
              className="p-4 rounded-lg text-left hover:shadow-md transition-all border"
              style={{
                backgroundColor:
                  activeCategory === category ? `${colors.blue.primary}10` : colors.surface.secondary,
                borderColor:
                  activeCategory === category ? colors.blue.primary : colors.border.default,
              }}
            >
              <p
                style={{
                  fontSize: typography.sizes.sm,
                  fontWeight: typography.weights.semibold,
                  color: activeCategory === category ? colors.blue.primary : colors.text.primary,
                }}
              >
                {category}
              </p>
              <p
                style={{
                  fontSize: typography.sizes.xs,
                  color: colors.text.secondary,
                  marginTop: spacing.xs,
                }}
              >
                {commoditiesData[category].length} commodities
              </p>
            </button>
          ))}
        </div>
      </DSCard>
    </div>
  );
}
