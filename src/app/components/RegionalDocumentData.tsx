// Regional Document Configuration Data
// This file contains document requirements for different countries and regions

export interface DocumentOption {
  id: string;
  name: string;
  required: boolean;
  alternateFor?: string; // Can be used as alternate for this document
  description: string;
  formats: string[];
  maxSize: number; // in MB
}

export interface RegionDocuments {
  region: string;
  basicDocuments: DocumentOption[];
  advancedDocuments: DocumentOption[];
  physicalVerificationFee: number; // in USD
  currency: string;
}

export interface CountryKYCConfig {
  country: string;
  code: string;
  flag: string;
  defaultCurrency: string;
  regions: RegionDocuments[];
  nationalDocuments: DocumentOption[]; // Documents applicable across all regions
}

// India Configuration
const indiaKYCConfig: CountryKYCConfig = {
  country: "India",
  code: "+91",
  flag: "🇮🇳",
  defaultCurrency: "INR",
  nationalDocuments: [
    {
      id: "pan",
      name: "PAN Card",
      required: true,
      description: "Permanent Account Number issued by Income Tax Department",
      formats: ["PDF", "JPG", "PNG"],
      maxSize: 5
    },
    {
      id: "aadhaar",
      name: "Aadhaar Card",
      required: false,
      alternateFor: "pan",
      description: "Unique Identification Number issued by UIDAI",
      formats: ["PDF", "JPG", "PNG"],
      maxSize: 5
    },
    {
      id: "voter-id",
      name: "Voter ID Card",
      required: false,
      alternateFor: "pan",
      description: "Electoral Photo Identity Card",
      formats: ["PDF", "JPG", "PNG"],
      maxSize: 5
    },
    {
      id: "driving-license",
      name: "Driving License",
      required: false,
      alternateFor: "pan",
      description: "Valid Driving License",
      formats: ["PDF", "JPG", "PNG"],
      maxSize: 5
    }
  ],
  regions: [
    {
      region: "Maharashtra",
      basicDocuments: [
        {
          id: "gst",
          name: "GST Registration",
          required: true,
          description: "Goods and Services Tax Registration Certificate",
          formats: ["PDF"],
          maxSize: 5
        },
        {
          id: "shop-act",
          name: "Shop & Establishment License",
          required: false,
          alternateFor: "gst",
          description: "Maharashtra Shop & Establishment Act License",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        },
        {
          id: "address-proof",
          name: "Address Proof",
          required: true,
          description: "Utility bill, rent agreement, or property documents",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        }
      ],
      advancedDocuments: [
        {
          id: "bank-statement",
          name: "Bank Statement (6 months)",
          required: true,
          description: "Last 6 months bank statement",
          formats: ["PDF"],
          maxSize: 10
        },
        {
          id: "itr",
          name: "Income Tax Returns",
          required: true,
          description: "Last 2 years ITR with acknowledgment",
          formats: ["PDF"],
          maxSize: 10
        },
        {
          id: "udyam",
          name: "Udyam Registration",
          required: false,
          description: "MSME Udyam Registration Certificate",
          formats: ["PDF"],
          maxSize: 5
        }
      ],
      physicalVerificationFee: 50,
      currency: "USD"
    },
    {
      region: "Karnataka",
      basicDocuments: [
        {
          id: "gst",
          name: "GST Registration",
          required: true,
          description: "Goods and Services Tax Registration Certificate",
          formats: ["PDF"],
          maxSize: 5
        },
        {
          id: "trade-license",
          name: "Trade License",
          required: false,
          alternateFor: "gst",
          description: "Karnataka Trade License",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        },
        {
          id: "address-proof",
          name: "Address Proof",
          required: true,
          description: "Utility bill, rent agreement, or property documents",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        }
      ],
      advancedDocuments: [
        {
          id: "bank-statement",
          name: "Bank Statement (6 months)",
          required: true,
          description: "Last 6 months bank statement",
          formats: ["PDF"],
          maxSize: 10
        },
        {
          id: "itr",
          name: "Income Tax Returns",
          required: true,
          description: "Last 2 years ITR with acknowledgment",
          formats: ["PDF"],
          maxSize: 10
        }
      ],
      physicalVerificationFee: 45,
      currency: "USD"
    },
    {
      region: "Delhi",
      basicDocuments: [
        {
          id: "gst",
          name: "GST Registration",
          required: true,
          description: "Goods and Services Tax Registration Certificate",
          formats: ["PDF"],
          maxSize: 5
        },
        {
          id: "trade-license",
          name: "Trade License",
          required: false,
          alternateFor: "gst",
          description: "Delhi Municipal Corporation Trade License",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        },
        {
          id: "address-proof",
          name: "Address Proof",
          required: true,
          description: "Utility bill, rent agreement, or property documents",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        }
      ],
      advancedDocuments: [
        {
          id: "bank-statement",
          name: "Bank Statement (6 months)",
          required: true,
          description: "Last 6 months bank statement",
          formats: ["PDF"],
          maxSize: 10
        },
        {
          id: "itr",
          name: "Income Tax Returns",
          required: true,
          description: "Last 2 years ITR with acknowledgment",
          formats: ["PDF"],
          maxSize: 10
        },
        {
          id: "pollution-cert",
          name: "Pollution Certificate",
          required: false,
          description: "Pollution Under Control Certificate",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        }
      ],
      physicalVerificationFee: 55,
      currency: "USD"
    }
  ]
};

// USA Configuration
const usaKYCConfig: CountryKYCConfig = {
  country: "United States",
  code: "+1",
  flag: "🇺🇸",
  defaultCurrency: "USD",
  nationalDocuments: [
    {
      id: "ssn",
      name: "Social Security Number",
      required: true,
      description: "Social Security Card or Document with SSN",
      formats: ["PDF", "JPG", "PNG"],
      maxSize: 5
    },
    {
      id: "passport",
      name: "US Passport",
      required: false,
      alternateFor: "ssn",
      description: "Valid US Passport",
      formats: ["PDF", "JPG", "PNG"],
      maxSize: 5
    },
    {
      id: "drivers-license",
      name: "Driver's License",
      required: false,
      alternateFor: "ssn",
      description: "Valid State-issued Driver's License",
      formats: ["PDF", "JPG", "PNG"],
      maxSize: 5
    }
  ],
  regions: [
    {
      region: "California",
      basicDocuments: [
        {
          id: "ein",
          name: "EIN (Employer Identification Number)",
          required: true,
          description: "Federal Tax ID from IRS",
          formats: ["PDF"],
          maxSize: 5
        },
        {
          id: "business-license",
          name: "Business License",
          required: false,
          alternateFor: "ein",
          description: "California Business License",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        },
        {
          id: "address-proof",
          name: "Proof of Address",
          required: true,
          description: "Utility bill or lease agreement",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        }
      ],
      advancedDocuments: [
        {
          id: "bank-statement",
          name: "Bank Statement (3 months)",
          required: true,
          description: "Last 3 months business bank statement",
          formats: ["PDF"],
          maxSize: 10
        },
        {
          id: "tax-returns",
          name: "Tax Returns",
          required: true,
          description: "Last 2 years business tax returns (Form 1120 or 1065)",
          formats: ["PDF"],
          maxSize: 10
        },
        {
          id: "articles-incorporation",
          name: "Articles of Incorporation",
          required: false,
          description: "Certificate of Incorporation from California SOS",
          formats: ["PDF"],
          maxSize: 5
        }
      ],
      physicalVerificationFee: 150,
      currency: "USD"
    },
    {
      region: "New York",
      basicDocuments: [
        {
          id: "ein",
          name: "EIN (Employer Identification Number)",
          required: true,
          description: "Federal Tax ID from IRS",
          formats: ["PDF"],
          maxSize: 5
        },
        {
          id: "dba",
          name: "DBA Certificate",
          required: false,
          alternateFor: "ein",
          description: "Doing Business As Certificate",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        },
        {
          id: "address-proof",
          name: "Proof of Address",
          required: true,
          description: "Utility bill or lease agreement",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        }
      ],
      advancedDocuments: [
        {
          id: "bank-statement",
          name: "Bank Statement (3 months)",
          required: true,
          description: "Last 3 months business bank statement",
          formats: ["PDF"],
          maxSize: 10
        },
        {
          id: "tax-returns",
          name: "Tax Returns",
          required: true,
          description: "Last 2 years business tax returns",
          formats: ["PDF"],
          maxSize: 10
        },
        {
          id: "certificate-authority",
          name: "Certificate of Authority",
          required: false,
          description: "NY State Certificate of Authority",
          formats: ["PDF"],
          maxSize: 5
        }
      ],
      physicalVerificationFee: 175,
      currency: "USD"
    },
    {
      region: "Texas",
      basicDocuments: [
        {
          id: "ein",
          name: "EIN (Employer Identification Number)",
          required: true,
          description: "Federal Tax ID from IRS",
          formats: ["PDF"],
          maxSize: 5
        },
        {
          id: "franchise-tax",
          name: "Franchise Tax Certificate",
          required: false,
          alternateFor: "ein",
          description: "Texas Franchise Tax Account Status",
          formats: ["PDF"],
          maxSize: 5
        },
        {
          id: "address-proof",
          name: "Proof of Address",
          required: true,
          description: "Utility bill or lease agreement",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        }
      ],
      advancedDocuments: [
        {
          id: "bank-statement",
          name: "Bank Statement (3 months)",
          required: true,
          description: "Last 3 months business bank statement",
          formats: ["PDF"],
          maxSize: 10
        },
        {
          id: "tax-returns",
          name: "Tax Returns",
          required: true,
          description: "Last 2 years business tax returns",
          formats: ["PDF"],
          maxSize: 10
        }
      ],
      physicalVerificationFee: 125,
      currency: "USD"
    }
  ]
};

// UK Configuration
const ukKYCConfig: CountryKYCConfig = {
  country: "United Kingdom",
  code: "+44",
  flag: "🇬🇧",
  defaultCurrency: "GBP",
  nationalDocuments: [
    {
      id: "passport",
      name: "UK Passport",
      required: true,
      description: "Valid UK Passport",
      formats: ["PDF", "JPG", "PNG"],
      maxSize: 5
    },
    {
      id: "national-id",
      name: "National ID Card",
      required: false,
      alternateFor: "passport",
      description: "UK National Identity Card",
      formats: ["PDF", "JPG", "PNG"],
      maxSize: 5
    },
    {
      id: "driving-license",
      name: "Driving License",
      required: false,
      alternateFor: "passport",
      description: "UK Driving License",
      formats: ["PDF", "JPG", "PNG"],
      maxSize: 5
    }
  ],
  regions: [
    {
      region: "England",
      basicDocuments: [
        {
          id: "company-number",
          name: "Company Registration Number",
          required: true,
          description: "Companies House Registration Number",
          formats: ["PDF"],
          maxSize: 5
        },
        {
          id: "vat",
          name: "VAT Registration",
          required: false,
          alternateFor: "company-number",
          description: "VAT Registration Certificate",
          formats: ["PDF"],
          maxSize: 5
        },
        {
          id: "address-proof",
          name: "Proof of Address",
          required: true,
          description: "Council tax bill or utility bill",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        }
      ],
      advancedDocuments: [
        {
          id: "bank-statement",
          name: "Bank Statement (3 months)",
          required: true,
          description: "Last 3 months business bank statement",
          formats: ["PDF"],
          maxSize: 10
        },
        {
          id: "accounts",
          name: "Filed Accounts",
          required: true,
          description: "Last filed accounts with Companies House",
          formats: ["PDF"],
          maxSize: 10
        }
      ],
      physicalVerificationFee: 100,
      currency: "GBP"
    },
    {
      region: "Scotland",
      basicDocuments: [
        {
          id: "company-number",
          name: "Company Registration Number",
          required: true,
          description: "Companies House Scotland Registration",
          formats: ["PDF"],
          maxSize: 5
        },
        {
          id: "vat",
          name: "VAT Registration",
          required: false,
          alternateFor: "company-number",
          description: "VAT Registration Certificate",
          formats: ["PDF"],
          maxSize: 5
        },
        {
          id: "address-proof",
          name: "Proof of Address",
          required: true,
          description: "Council tax bill or utility bill",
          formats: ["PDF", "JPG", "PNG"],
          maxSize: 5
        }
      ],
      advancedDocuments: [
        {
          id: "bank-statement",
          name: "Bank Statement (3 months)",
          required: true,
          description: "Last 3 months business bank statement",
          formats: ["PDF"],
          maxSize: 10
        },
        {
          id: "accounts",
          name: "Filed Accounts",
          required: true,
          description: "Last filed accounts with Companies House",
          formats: ["PDF"],
          maxSize: 10
        }
      ],
      physicalVerificationFee: 95,
      currency: "GBP"
    }
  ]
};

// Export all configurations
export const kycConfigurations: CountryKYCConfig[] = [
  indiaKYCConfig,
  usaKYCConfig,
  ukKYCConfig
];

// Helper function to get configuration by country
export function getKYCConfigByCountry(countryName: string): CountryKYCConfig | undefined {
  return kycConfigurations.find(config => config.country === countryName);
}

// Helper function to get region documents
export function getRegionDocuments(countryName: string, regionName: string): RegionDocuments | undefined {
  const config = getKYCConfigByCountry(countryName);
  if (!config) return undefined;
  return config.regions.find(region => region.region === regionName);
}

// Helper function to get all documents for a region (including national)
export function getAllDocumentsForRegion(countryName: string, regionName: string, tier: 'basic' | 'advanced') {
  const config = getKYCConfigByCountry(countryName);
  if (!config) return [];
  
  const regionData = config.regions.find(r => r.region === regionName);
  if (!regionData) return [];
  
  const regionalDocs = tier === 'basic' ? regionData.basicDocuments : regionData.advancedDocuments;
  
  return {
    nationalDocuments: config.nationalDocuments,
    regionalDocuments: regionalDocs,
    currency: config.defaultCurrency,
    physicalVerificationFee: regionData.physicalVerificationFee
  };
}
