import React, { useState } from 'react';
import { FileText, MapPin, Globe, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { EntityType } from './EntityTypeSelection';

export interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  mandatory: boolean;
  category: 'identity' | 'address' | 'business' | 'tax' | 'bank' | 'certification';
  acceptedFormats: string[];
  maxSize: number; // in MB
  aiVerification: boolean;
  examples: string[];
}

interface RegionalDocumentRequirementsProps {
  country: string;
  state?: string;
  entityType: EntityType;
  onCountryChange: (country: string) => void;
  onStateChange: (state: string) => void;
  onRequirementsLoaded?: (requirements: DocumentRequirement[]) => void;
}

// Comprehensive document database
const getDocumentRequirements = (
  country: string,
  state: string | undefined,
  entityType: EntityType
): DocumentRequirement[] => {
  const baseRequirements: DocumentRequirement[] = [];

  // Identity Documents (All Entity Types)
  if (entityType === 'individual' || entityType === 'family_enterprise') {
    baseRequirements.push({
      id: 'national_id',
      name: country === 'India' ? 'Aadhaar Card' : 'National ID Card',
      description: 'Government-issued national identification',
      mandatory: true,
      category: 'identity',
      acceptedFormats: ['image/jpeg', 'image/png', 'application/pdf'],
      maxSize: 5,
      aiVerification: true,
      examples: ['Aadhaar (India)', 'SSN (USA)', 'NIN (UK)', 'ID Card'],
    });

    if (country === 'India') {
      baseRequirements.push({
        id: 'pan_card',
        name: 'PAN Card',
        description: 'Permanent Account Number for tax purposes',
        mandatory: true,
        category: 'tax',
        acceptedFormats: ['image/jpeg', 'image/png', 'application/pdf'],
        maxSize: 5,
        aiVerification: true,
        examples: ['Format: ABCDE1234F'],
      });
    }
  }

  // Business Registration Documents
  if (['business', 'cooperative', 'partnership', 'corporation'].includes(entityType)) {
    baseRequirements.push({
      id: 'business_registration',
      name: country === 'India' ? 'GST Registration' : 'Business Registration Certificate',
      description: 'Official business registration document',
      mandatory: true,
      category: 'business',
      acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png'],
      maxSize: 10,
      aiVerification: true,
      examples: country === 'India' 
        ? ['GST Certificate', 'MSME Registration', 'Shop Act License']
        : ['Business License', 'Articles of Incorporation', 'Registration Certificate'],
    });

    if (country === 'India') {
      baseRequirements.push({
        id: 'gst_certificate',
        name: 'GST Certificate',
        description: 'Goods and Services Tax registration',
        mandatory: true,
        category: 'tax',
        acceptedFormats: ['application/pdf'],
        maxSize: 5,
        aiVerification: true,
        examples: ['15-digit GSTIN'],
      });
    }

    if (entityType === 'cooperative') {
      baseRequirements.push({
        id: 'cooperative_registration',
        name: country === 'India' ? 'Cooperative Society Registration' : 'Cooperative Certificate',
        description: 'Cooperative society registration document',
        mandatory: true,
        category: 'business',
        acceptedFormats: ['application/pdf'],
        maxSize: 10,
        aiVerification: false,
        examples: ['Multi-State Cooperative Society Act', 'State Cooperative Act'],
      });
    }

    if (entityType === 'corporation') {
      baseRequirements.push({
        id: 'articles_of_incorporation',
        name: 'Articles of Incorporation',
        description: 'Corporate charter and bylaws',
        mandatory: true,
        category: 'business',
        acceptedFormats: ['application/pdf'],
        maxSize: 20,
        aiVerification: false,
        examples: ['Corporate Charter', 'Memorandum of Association'],
      });
    }
  }

  // Address Proof (All Types)
  baseRequirements.push({
    id: 'address_proof',
    name: 'Address Proof',
    description: 'Proof of business/residential address',
    mandatory: true,
    category: 'address',
    acceptedFormats: ['image/jpeg', 'image/png', 'application/pdf'],
    maxSize: 5,
    aiVerification: true,
    examples: country === 'India'
      ? ['Electricity Bill', 'Property Tax Receipt', 'Rent Agreement']
      : ['Utility Bill', 'Bank Statement', 'Lease Agreement'],
  });

  // Bank Account Proof
  baseRequirements.push({
    id: 'bank_statement',
    name: 'Bank Account Proof',
    description: 'Bank account verification document',
    mandatory: true,
    category: 'bank',
    acceptedFormats: ['application/pdf'],
    maxSize: 10,
    aiVerification: true,
    examples: ['Cancelled Cheque', 'Bank Statement', 'Passbook Copy'],
  });

  // Agricultural/Trade Certifications
  if (country === 'India') {
    if (state === 'Maharashtra' || state === 'Karnataka' || state === 'Punjab') {
      baseRequirements.push({
        id: 'land_records',
        name: 'Land Ownership Records',
        description: 'Agricultural land ownership proof',
        mandatory: entityType === 'individual' || entityType === 'family_enterprise',
        category: 'certification',
        acceptedFormats: ['application/pdf', 'image/jpeg'],
        maxSize: 10,
        aiVerification: false,
        examples: ['7/12 Extract (Maharashtra)', 'RTC (Karnataka)', 'Fard (Punjab)'],
      });
    }

    baseRequirements.push({
      id: 'apmc_license',
      name: 'APMC License',
      description: 'Agricultural Produce Market Committee License',
      mandatory: false,
      category: 'certification',
      acceptedFormats: ['application/pdf'],
      maxSize: 5,
      aiVerification: false,
      examples: ['APMC Trader License', 'Commission Agent License'],
    });
  }

  // International Certifications
  if (country !== 'India') {
    baseRequirements.push({
      id: 'tax_id',
      name: 'Tax Identification Number',
      description: 'Government-issued tax ID',
      mandatory: true,
      category: 'tax',
      acceptedFormats: ['application/pdf', 'image/jpeg', 'image/png'],
      maxSize: 5,
      aiVerification: true,
      examples: ['EIN (USA)', 'VAT Number (EU)', 'TIN'],
    });
  }

  // Export/Import License (for Corporation)
  if (entityType === 'corporation') {
    baseRequirements.push({
      id: 'import_export_license',
      name: 'Import/Export License',
      description: 'License for international trade',
      mandatory: false,
      category: 'certification',
      acceptedFormats: ['application/pdf'],
      maxSize: 10,
      aiVerification: false,
      examples: country === 'India' 
        ? ['IEC Code', 'RCMC Certificate']
        : ['Import/Export License', 'Trade License'],
    });
  }

  return baseRequirements;
};

export const RegionalDocumentRequirements: React.FC<RegionalDocumentRequirementsProps> = ({
  country,
  state,
  entityType,
  onCountryChange,
  onStateChange,
  onRequirementsLoaded,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [selectedState, setSelectedState] = useState(state);

  const countries = [
    { code: 'India', name: 'India', flag: '🇮🇳' },
    { code: 'USA', name: 'United States', flag: '🇺🇸' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'UAE', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: 'Australia', name: 'Australia', flag: '🇦🇺' },
    { code: 'Singapore', name: 'Singapore', flag: '🇸🇬' },
  ];

  const indianStates = [
    'Andhra Pradesh', 'Karnataka', 'Kerala', 'Tamil Nadu', 'Telangana',
    'Maharashtra', 'Gujarat', 'Rajasthan', 'Madhya Pradesh',
    'Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'West Bengal',
  ];

  const requirements = getDocumentRequirements(selectedCountry, selectedState, entityType);
  const mandatoryCount = requirements.filter(r => r.mandatory).length;
  const optionalCount = requirements.filter(r => r.mandatory === false).length;
  const aiVerifiedCount = requirements.filter(r => r.aiVerification).length;

  React.useEffect(() => {
    onRequirementsLoaded?.(requirements);
  }, [selectedCountry, selectedState, entityType]);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedState(undefined);
    onCountryChange(value);
  };

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    onStateChange(value);
  };

  const getCategoryColor = (category: DocumentRequirement['category']) => {
    const colors = {
      identity: '#2F80ED',
      address: '#27AE60',
      business: '#003E6D',
      tax: '#E2B93B',
      bank: '#9B59B6',
      certification: '#FFD700',
    };
    return colors[category];
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 
          className="mb-2"
          style={{ 
            fontFamily: 'Playfair Display, serif',
            color: '#003E6D'
          }}
        >
          Document Requirements
        </h2>
        <p 
          style={{
            fontFamily: 'Lato, sans-serif',
            color: '#5A6B7A'
          }}
        >
          Requirements based on your location and entity type
        </p>
      </div>

      {/* Location Selection */}
      <Card className="p-6 mb-6" style={{ borderRadius: '16px', border: '2px solid rgba(0,62,109,0.1)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label 
              className="block mb-2"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                color: '#003E6D',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              <Globe className="inline-block w-4 h-4 mr-2" />
              Country
            </label>
            <Select value={selectedCountry} onValueChange={handleCountryChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCountry === 'India' && (
            <div>
              <label 
                className="block mb-2"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#003E6D',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                <MapPin className="inline-block w-4 h-4 mr-2" />
                State
              </label>
              <Select value={selectedState} onValueChange={handleStateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[rgba(0,62,109,0.1)]">
          <div className="text-center">
            <div 
              className="mb-1"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#E74C3C',
                fontSize: '1.5rem',
                fontWeight: 600,
              }}
            >
              {mandatoryCount}
            </div>
            <div style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '0.75rem' }}>
              Mandatory
            </div>
          </div>
          <div className="text-center">
            <div 
              className="mb-1"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#27AE60',
                fontSize: '1.5rem',
                fontWeight: 600,
              }}
            >
              {optionalCount}
            </div>
            <div style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '0.75rem' }}>
              Optional
            </div>
          </div>
          <div className="text-center">
            <div 
              className="mb-1"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#FFD700',
                fontSize: '1.5rem',
                fontWeight: 600,
              }}
            >
              {aiVerifiedCount}
            </div>
            <div style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '0.75rem' }}>
              AI Verified
            </div>
          </div>
        </div>
      </Card>

      {/* Document List */}
      <div className="space-y-4">
        {requirements.map((req, index) => (
          <Card 
            key={req.id}
            className="p-5 hover:shadow-lg transition-shadow"
            style={{ 
              borderRadius: '16px',
              border: `2px solid ${req.mandatory ? 'rgba(231,76,60,0.2)' : 'rgba(0,62,109,0.1)'}`,
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${getCategoryColor(req.category)}15` }}
                >
                  <FileText className="w-5 h-5" style={{ color: getCategoryColor(req.category) }} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        color: '#003E6D',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                      }}
                    >
                      {req.name}
                    </h4>
                    {req.mandatory && (
                      <Badge 
                        variant="destructive"
                        className="text-xs px-2 py-0.5"
                        style={{
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '0.625rem',
                          fontWeight: 600,
                        }}
                      >
                        REQUIRED
                      </Badge>
                    )}
                    {req.aiVerification && (
                      <Badge 
                        className="text-xs px-2 py-0.5"
                        style={{
                          background: '#FFD700',
                          color: '#003E6D',
                          fontFamily: 'Montserrat, sans-serif',
                          fontSize: '0.625rem',
                          fontWeight: 600,
                        }}
                      >
                        AI Verified
                      </Badge>
                    )}
                  </div>
                  
                  <p 
                    className="mb-3"
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      color: '#5A6B7A',
                      fontSize: '0.8125rem',
                    }}
                  >
                    {req.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {req.examples.map((example, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded"
                        style={{
                          background: 'rgba(0,62,109,0.05)',
                          fontFamily: 'Lato, sans-serif',
                          color: '#5A6B7A',
                          fontSize: '0.75rem',
                        }}
                      >
                        {example}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span style={{ fontFamily: 'Lato, sans-serif', color: '#8B9AA8' }}>
                      Max size: {req.maxSize}MB
                    </span>
                    <span style={{ fontFamily: 'Lato, sans-serif', color: '#8B9AA8' }}>
                      Formats: {req.acceptedFormats.map(f => f.split('/')[1]).join(', ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div 
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3"
                style={{ 
                  borderColor: req.mandatory ? '#E74C3C' : 'rgba(0,62,109,0.2)',
                  background: 'white',
                }}
              >
                {req.mandatory ? (
                  <AlertCircle className="w-3 h-3" style={{ color: '#E74C3C' }} />
                ) : (
                  <CheckCircle2 className="w-3 h-3" style={{ color: '#27AE60' }} />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RegionalDocumentRequirements;
