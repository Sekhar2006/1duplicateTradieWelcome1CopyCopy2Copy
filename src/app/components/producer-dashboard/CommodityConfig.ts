// Commodity Configuration Data for Quality Check Workflow
// This configuration drives dynamic form rendering based on commodity type

export interface CommodityGradingCriteria {
  size?: boolean;
  color?: boolean;
  grade?: boolean;
  aroma?: boolean;
  moisture?: boolean;
  texture?: boolean;
  firmness?: boolean;
  oilContent?: boolean;
  petalCount?: boolean;
  leafQuality?: boolean;
  custom?: boolean;
}

export interface CommodityConfig {
  gradingCriteria: CommodityGradingCriteria;
  processingRequired: boolean;
  dryingMandatory: boolean;
  specificGrades?: string[];
  qualityParameters?: string[];
}

export interface CommodityConfigMap {
  [key: string]: CommodityConfig;
}

// Commodity Types Array
export const commodityTypes = [
  "Vegetables",
  "Leafy Vegetables",
  "Berries",
  "Fruits",
  "Grains",
  "Nuts",
  "Spices",
  "Flowers",
  "Pulses",
  "Herbs",
  "Oil Seeds",
  "Others"
];

// Quality Check Form Configuration per Commodity
export const qualityCheckFormConfig: CommodityConfigMap = {
  "Vegetables": {
    gradingCriteria: {
      size: true,
      color: true,
      grade: true,
      firmness: true,
      texture: true
    },
    processingRequired: true,
    dryingMandatory: false,
    specificGrades: ["Premium (A+)", "Grade A", "Grade B", "Grade C"],
    qualityParameters: [
      "Size uniformity",
      "Color consistency",
      "Surface blemishes",
      "Firmness",
      "Shape regularity"
    ]
  },
  
  "Leafy Vegetables": {
    gradingCriteria: {
      color: true,
      grade: true,
      leafQuality: true,
      texture: true
    },
    processingRequired: true,
    dryingMandatory: false,
    specificGrades: ["Fresh Grade A", "Fresh Grade B", "Fresh Grade C"],
    qualityParameters: [
      "Leaf color intensity",
      "Wilting level",
      "Pest damage",
      "Freshness",
      "Crispness"
    ]
  },
  
  "Berries": {
    gradingCriteria: {
      size: true,
      color: true,
      grade: true,
      firmness: true
    },
    processingRequired: true,
    dryingMandatory: false,
    specificGrades: ["Premium", "Grade A", "Grade B", "Processing Grade"],
    qualityParameters: [
      "Berry size",
      "Color uniformity",
      "Ripeness",
      "Firmness",
      "Sugar content"
    ]
  },
  
  "Fruits": {
    gradingCriteria: {
      size: true,
      color: true,
      grade: true,
      firmness: true,
      texture: true
    },
    processingRequired: true,
    dryingMandatory: false,
    specificGrades: ["Export Quality", "Premium", "Grade A", "Grade B", "Grade C"],
    qualityParameters: [
      "Size and weight",
      "Color development",
      "Ripeness level",
      "Blemishes",
      "Firmness"
    ]
  },
  
  "Grains": {
    gradingCriteria: {
      size: true,
      color: true,
      grade: true,
      moisture: true
    },
    processingRequired: true,
    dryingMandatory: true,
    specificGrades: ["Grade A", "Grade B", "Grade C", "FAQ (Fair Average Quality)"],
    qualityParameters: [
      "Moisture content",
      "Foreign matter",
      "Broken grains",
      "Color uniformity",
      "Insect damage"
    ]
  },
  
  "Nuts": {
    gradingCriteria: {
      size: true,
      color: true,
      grade: true,
      moisture: true
    },
    processingRequired: true,
    dryingMandatory: true,
    specificGrades: ["Premium", "Grade A", "Grade B", "Industrial Grade"],
    qualityParameters: [
      "Moisture content",
      "Shell integrity",
      "Kernel quality",
      "Size consistency",
      "Rancidity"
    ]
  },
  
  "Spices": {
    gradingCriteria: {
      aroma: true,
      color: true,
      grade: true,
      moisture: true
    },
    processingRequired: true,
    dryingMandatory: true,
    specificGrades: ["Export Quality", "Premium", "Grade A", "Grade B"],
    qualityParameters: [
      "Aroma intensity",
      "Color richness",
      "Moisture content",
      "Oil content",
      "Foreign matter"
    ]
  },
  
  "Flowers": {
    gradingCriteria: {
      color: true,
      grade: true,
      petalCount: true,
      texture: true
    },
    processingRequired: false,
    dryingMandatory: false,
    specificGrades: ["Premium", "Grade A", "Grade B", "Bulk"],
    qualityParameters: [
      "Bloom fullness",
      "Petal count",
      "Color vibrancy",
      "Stem strength",
      "Freshness"
    ]
  },
  
  "Pulses": {
    gradingCriteria: {
      size: true,
      color: true,
      grade: true,
      moisture: true
    },
    processingRequired: true,
    dryingMandatory: true,
    specificGrades: ["Grade A", "Grade B", "Grade C", "FAQ"],
    qualityParameters: [
      "Moisture content",
      "Split percentage",
      "Foreign matter",
      "Size uniformity",
      "Insect damage"
    ]
  },
  
  "Herbs": {
    gradingCriteria: {
      aroma: true,
      color: true,
      grade: true,
      leafQuality: true,
      moisture: true
    },
    processingRequired: true,
    dryingMandatory: true,
    specificGrades: ["Organic Premium", "Premium", "Grade A", "Grade B"],
    qualityParameters: [
      "Aroma potency",
      "Leaf integrity",
      "Color retention",
      "Moisture content",
      "Essential oil content"
    ]
  },
  
  "Oil Seeds": {
    gradingCriteria: {
      size: true,
      color: true,
      grade: true,
      moisture: true,
      oilContent: true
    },
    processingRequired: true,
    dryingMandatory: true,
    specificGrades: ["Premium", "Grade A", "Grade B", "Industrial"],
    qualityParameters: [
      "Oil content",
      "Moisture level",
      "Foreign matter",
      "Damaged seeds",
      "Rancidity"
    ]
  },
  
  "Others": {
    gradingCriteria: {
      custom: true
    },
    processingRequired: false,
    dryingMandatory: false,
    specificGrades: ["Premium", "Grade A", "Grade B", "Grade C"],
    qualityParameters: [
      "Visual inspection",
      "Weight/quantity",
      "Quality consistency",
      "Market standards"
    ]
  }
};

// Helper function to get config for a commodity
export const getCommodityConfig = (commodityType: string): CommodityConfig | null => {
  return qualityCheckFormConfig[commodityType] || null;
};

// Helper function to get grading criteria labels
export const getGradingCriteriaLabels = (criteria: CommodityGradingCriteria): string[] => {
  const labels: string[] = [];
  
  if (criteria.size) labels.push("Size Classification");
  if (criteria.color) labels.push("Color Classification");
  if (criteria.grade) labels.push("Overall Grade");
  if (criteria.aroma) labels.push("Aroma Quality");
  if (criteria.moisture) labels.push("Moisture Content");
  if (criteria.texture) labels.push("Texture Assessment");
  if (criteria.firmness) labels.push("Firmness Level");
  if (criteria.oilContent) labels.push("Oil Content");
  if (criteria.petalCount) labels.push("Petal Count");
  if (criteria.leafQuality) labels.push("Leaf Quality");
  if (criteria.custom) labels.push("Custom Criteria");
  
  return labels;
};

// Size options (generic, can be overridden per commodity)
export const sizeOptions = {
  generic: ["Extra Large", "Large", "Medium", "Small", "Mixed Sizes"],
  berries: ["Jumbo", "Large", "Medium", "Small"],
  grains: ["Bold", "Medium", "Small", "Broken"],
  nuts: ["Jumbo", "Large", "Medium", "Baby"]
};

// Color options (generic, can be overridden per commodity)
export const colorOptions = {
  generic: ["Uniform Color", "Slightly Varied", "Mixed Colors"],
  leafy: ["Dark Green", "Medium Green", "Light Green", "Varied"],
  berries: ["Deep Color", "Bright Color", "Light Color", "Mixed"],
  spices: ["Rich Color", "Standard Color", "Light Color"]
};

// Moisture content levels
export const moistureOptions = [
  "Below 10%",
  "10-12%",
  "12-14%",
  "14-16%",
  "Above 16%"
];

// Aroma quality levels
export const aromaOptions = [
  "Excellent/Strong",
  "Good/Moderate",
  "Fair/Mild",
  "Poor/Weak"
];

// Texture options
export const textureOptions = [
  "Firm",
  "Slightly Soft",
  "Soft",
  "Very Soft"
];

// Firmness levels
export const firmnessOptions = [
  "Very Firm",
  "Firm",
  "Medium Firm",
  "Soft",
  "Very Soft"
];

// Export all as a single config object for easy import
export const CommodityConfigData = {
  commodityTypes,
  qualityCheckFormConfig,
  getCommodityConfig,
  getGradingCriteriaLabels,
  sizeOptions,
  colorOptions,
  moistureOptions,
  aromaOptions,
  textureOptions,
  firmnessOptions
};

export default CommodityConfigData;
