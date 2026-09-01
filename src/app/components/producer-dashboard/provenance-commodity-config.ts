/**
 * Provenance Tracker Commodity Configuration
 * TypeScript module exporting commodity data
 */

export const commodityConfig = {
  commodities: {
    "Vegetables": [
      "Tomato",
      "Potato",
      "Onion",
      "Carrot",
      "Cabbage",
      "Cauliflower",
      "Brinjal",
      "Beans",
      "Peas",
      "Okra",
      "Bell Pepper",
      "Cucumber",
      "Radish",
      "Beetroot",
      "Pumpkin"
    ],
    "Fruits": [
      "Mango",
      "Banana",
      "Papaya",
      "Guava",
      "Orange",
      "Pineapple",
      "Apple",
      "Pomegranate",
      "Watermelon",
      "Muskmelon",
      "Grapes",
      "Lemon",
      "Lime",
      "Coconut"
    ],
    "Spices": [
      "Red Chili",
      "Black Pepper",
      "Clove",
      "Cardamom",
      "Turmeric",
      "Cinnamon",
      "Cumin",
      "Coriander",
      "Fennel",
      "Mustard",
      "Ginger",
      "Garlic",
      "Star Anise",
      "Fenugreek Seeds"
    ],
    "Pulses": [
      "Red Gram (Toor Dal)",
      "Green Gram (Moong Dal)",
      "Black Gram (Urad Dal)",
      "Chickpea (Chana)",
      "Lentils (Masoor)",
      "Horse Gram",
      "Cowpea",
      "Bengal Gram",
      "Pigeon Pea"
    ],
    "Grains": [
      "Basmati Rice",
      "Sona Masuri Rice",
      "Jasmine Rice",
      "Wheat",
      "Maize",
      "Barley",
      "Jowar (Sorghum)",
      "Bajra (Pearl Millet)",
      "Ragi (Finger Millet)",
      "Quinoa",
      "Brown Rice"
    ],
    "Nuts": [
      "Cashew",
      "Almond",
      "Walnut",
      "Pistachio",
      "Peanut",
      "Hazelnut",
      "Macadamia",
      "Pine Nuts",
      "Brazil Nuts"
    ],
    "Flowers": [
      "Jasmine",
      "Rose",
      "Marigold",
      "Lotus",
      "Hibiscus",
      "Lily",
      "Orchid",
      "Chrysanthemum",
      "Tuberose",
      "Carnation"
    ],
    "Herbs": [
      "Basil",
      "Mint",
      "Curry Leaves",
      "Lemongrass",
      "Thyme",
      "Oregano",
      "Cilantro",
      "Parsley",
      "Rosemary",
      "Sage",
      "Dill"
    ],
    "Oil Seeds": [
      "Sunflower",
      "Groundnut",
      "Sesame",
      "Castor",
      "Soybean",
      "Mustard Seeds",
      "Safflower",
      "Linseed",
      "Cotton Seed"
    ],
    "Leafy Vegetables": [
      "Spinach",
      "Fenugreek Leaves (Methi)",
      "Amaranth",
      "Mustard Greens",
      "Coriander Leaves",
      "Kale",
      "Lettuce",
      "Cabbage Leaves",
      "Celery"
    ],
    "Berries": [
      "Strawberry",
      "Raspberry",
      "Blueberry",
      "Blackberry",
      "Gooseberry",
      "Mulberry",
      "Cranberry"
    ],
    "Others": []
  },
  harvestMethods: [
    "Labor",
    "Machine",
    "Handpicked",
    "Mechanical Harvester",
    "Semi-Mechanical"
  ],
  gradingCriteria: {
    "Red Chili": {
      criteria: ["color", "size", "aroma", "spice_level", "moisture"],
      options: {
        color: ["Light Red", "Medium Red", "Deep Red", "Dark Red"],
        size: ["Small", "Medium", "Large", "Extra Large"],
        aroma: ["Mild", "Moderate", "Strong", "Excellent"],
        spice_level: ["Mild", "Medium", "Hot", "Extra Hot"],
        moisture: ["Above 15%", "10-15%", "Below 10%", "Below 8%"]
      }
    },
    "Black Pepper": {
      criteria: ["color", "size", "moisture", "aroma", "purity"],
      options: {
        color: ["Light Black", "Black", "Deep Black"],
        size: ["Small", "Medium", "Large"],
        moisture: ["Above 12%", "10-12%", "Below 10%"],
        aroma: ["Mild", "Moderate", "Strong", "Pungent"],
        purity: ["90-95%", "95-98%", "98-99%", "Above 99%"]
      }
    },
    "Mango": {
      criteria: ["color", "size", "firmness", "sweetness", "ripeness"],
      options: {
        color: ["Green", "Yellow-Green", "Yellow", "Golden Yellow"],
        size: ["Small", "Medium", "Large", "Extra Large"],
        firmness: ["Hard", "Slightly Firm", "Firm", "Soft"],
        sweetness: ["Low", "Medium", "Sweet", "Very Sweet"],
        ripeness: ["Unripe", "Under Ripe", "Ripe", "Fully Ripe"]
      }
    },
    "Tomato": {
      criteria: ["color", "firmness", "size", "texture", "freshness"],
      options: {
        color: ["Green", "Light Red", "Red", "Deep Red"],
        firmness: ["Soft", "Medium", "Firm", "Very Firm"],
        size: ["Small", "Medium", "Large", "Extra Large"],
        texture: ["Smooth", "Slightly Rough", "Uniform"],
        freshness: ["Fresh", "Very Fresh", "Excellent"]
      }
    },
    "Basmati Rice": {
      criteria: ["size", "color", "moisture", "purity", "broken_percentage"],
      options: {
        size: ["Short Grain", "Medium Grain", "Long Grain", "Extra Long"],
        color: ["White", "Creamy White", "Golden"],
        moisture: ["Above 15%", "12-15%", "10-12%", "Below 10%"],
        purity: ["90-95%", "95-98%", "98-99%", "Above 99%"],
        broken_percentage: ["<5%", "5-10%", "10-15%", ">15%"]
      }
    },
    "Turmeric": {
      criteria: ["color", "size", "aroma", "moisture", "purity"],
      options: {
        color: ["Light Yellow", "Yellow", "Golden Yellow", "Deep Golden"],
        size: ["Small", "Medium", "Large"],
        aroma: ["Mild", "Moderate", "Strong", "Excellent"],
        moisture: ["Above 15%", "10-15%", "Below 10%", "Below 8%"],
        purity: ["90-95%", "95-98%", "98-99%", "Above 99%"]
      }
    },
    "Cashew": {
      criteria: ["size", "color", "moisture", "oil_content", "defects"],
      options: {
        size: ["Small (W320)", "Medium (W240)", "Large (W180)", "Jumbo (W150)"],
        color: ["White", "Pale White", "Creamy"],
        moisture: ["Above 5%", "3-5%", "Below 3%"],
        oil_content: ["Low", "Medium", "High", "Very High"],
        defects: ["None", "Minimal (<2%)", "Low (<5%)", "Moderate"]
      }
    },
    "Spinach": {
      criteria: ["freshness", "color", "leaf_quality", "moisture", "texture"],
      options: {
        freshness: ["Fresh", "Very Fresh", "Excellent", "Premium"],
        color: ["Light Green", "Green", "Dark Green", "Deep Green"],
        leaf_quality: ["Fair", "Good", "Excellent", "Premium"],
        moisture: ["Dry", "Slightly Moist", "Moist", "Very Fresh"],
        texture: ["Tender", "Crisp", "Firm"]
      }
    },
    "Strawberry": {
      criteria: ["color", "size", "firmness", "sweetness", "freshness"],
      options: {
        color: ["Light Red", "Red", "Deep Red", "Bright Red"],
        size: ["Small", "Medium", "Large", "Extra Large"],
        firmness: ["Soft", "Medium", "Firm", "Very Firm"],
        sweetness: ["Tart", "Sweet", "Very Sweet"],
        freshness: ["Fresh", "Very Fresh", "Premium"]
      }
    },
    "default": {
      criteria: ["size", "color", "grade", "quality", "freshness"],
      options: {
        size: ["Small", "Medium", "Large", "Extra Large"],
        color: ["Light", "Medium", "Rich", "Vibrant"],
        grade: ["A", "B", "C", "Premium"],
        quality: ["Fair", "Good", "Excellent", "Premium"],
        freshness: ["Fresh", "Very Fresh", "Excellent"]
      }
    }
  },
  categoryIcons: {
    "Vegetables": "🥬",
    "Fruits": "🍎",
    "Spices": "🌶️",
    "Pulses": "🫘",
    "Grains": "🌾",
    "Nuts": "🥜",
    "Flowers": "🌸",
    "Herbs": "🌿",
    "Oil Seeds": "🌻",
    "Leafy Vegetables": "🥬",
    "Berries": "🍓",
    "Others": "📦"
  },
  batchIdPrefixes: {
    "Vegetables": "VEG",
    "Fruits": "FRT",
    "Spices": "SPI",
    "Pulses": "PUL",
    "Grains": "GRN",
    "Nuts": "NUT",
    "Flowers": "FLW",
    "Herbs": "HRB",
    "Oil Seeds": "OIL",
    "Leafy Vegetables": "LFV",
    "Berries": "BER",
    "Others": "OTH"
  },
  units: [
    "kg",
    "quintal",
    "metric tons",
    "bags",
    "boxes",
    "bundles",
    "pieces"
  ]
} as const;

export type CommodityConfig = typeof commodityConfig;
