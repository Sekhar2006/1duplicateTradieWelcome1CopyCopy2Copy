import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { DSButton } from '../../design-system/components/DSButton';
import { DSCard } from '../../design-system/components/DSCard';

interface ProducerTypeSelectionProps {
  onComplete?: (selectedType: string) => void;
  onBack?: () => void;
}

export default function ProducerTypeSelection({ onComplete, onBack }: ProducerTypeSelectionProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const producerTypes = [
    {
      id: 'type1',
      name: 'Type 1: Small-Scale Producer',
      description: 'Individual farmers with less than 5 acres',
      features: ['Direct market access', 'Basic tokenization', 'Community support']
    },
    {
      id: 'type2',
      name: 'Type 2: Medium-Scale Producer',
      description: 'Farmers with 5-50 acres or cooperative groups',
      features: ['Advanced tokenization', 'Bulk trading', 'Premium verification']
    },
    {
      id: 'type3',
      name: 'Type 3: Large-Scale Producer',
      description: 'Commercial farms over 50 acres or producer organizations',
      features: ['Enterprise features', 'Contract farming', 'Export capabilities']
    }
  ];

  const handleSaveAndSync = async () => {
    if (!selectedType) return;
    
    setIsSyncing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSyncing(false);
    
    if (onComplete) {
      onComplete(selectedType);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[#003E6D] mb-2">Select Your Producer Type</h1>
          <p className="text-gray-600">Choose the category that best describes your farming operation</p>
        </div>

        {/* Producer Type Cards */}
        <div className="space-y-4 mb-8">
          {producerTypes.map((type) => (
            <DSCard
              key={type.id}
              className={`cursor-pointer transition-all duration-300 ${
                selectedType === type.id
                  ? 'border-2 border-[#FFD700] shadow-lg'
                  : 'border border-gray-200 hover:border-[#FFD700]/50'
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="flex items-start gap-4 p-6">
                {/* Selection Indicator */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                    selectedType === type.id
                      ? 'bg-[#FFD700] border-[#FFD700]'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedType === type.id && <Check className="w-4 h-4 text-[#003E6D]" />}
                </div>

                {/* Type Details */}
                <div className="flex-1">
                  <h3 className="text-[#003E6D] mb-2">{type.name}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {type.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-[#FFD700]/10 to-[#FFD700]/5 text-[#003E6D] rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </DSCard>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {onBack && (
            <DSButton
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              Back
            </DSButton>
          )}
          <DSButton
            variant="primary"
            onClick={handleSaveAndSync}
            disabled={!selectedType || isSyncing}
            className="flex-1"
          >
            {isSyncing ? 'Syncing...' : 'Save & Sync'}
          </DSButton>
        </div>

        {/* Info Note */}
        {selectedType && (
          <div className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-[#FFD700]/30">
            <p className="text-sm text-gray-600">
              <span className="text-[#FFD700]">✓</span> You can change your producer type later in your profile settings
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
