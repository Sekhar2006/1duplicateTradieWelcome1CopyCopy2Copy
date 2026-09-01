import React from 'react';
import { Card } from '../ui/card';
import { BeautifulButton } from '../ui/beautiful-buttons';
import { BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';

interface CropJournalingTokenizationProps {
  producerId: string;
  cropData?: any;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const CropJournalingTokenization: React.FC<CropJournalingTokenizationProps> = ({
  producerId,
  cropData,
  onComplete,
  onBack
}) => {
  const handleComplete = () => {
    onComplete({
      journalId: 'JOURNAL-001',
      crop: cropData?.crop || 'Wheat',
      startDate: new Date().toISOString(),
      status: 'active'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <Card className="max-w-4xl mx-auto p-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Crop Journaling & Tokenization</h1>
            <p className="text-gray-600">Track your crop lifecycle and mint quality tokens</p>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-12 rounded-xl text-center mb-8">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h2 className="text-2xl font-bold mb-2">Crop Journaling Coming Soon</h2>
          <p className="text-gray-700 mb-4">
            Track planting, irrigation, fertilization, and growth stages
          </p>
          <p className="text-sm text-gray-600">
            Producer: {producerId} | Crop: {cropData?.crop || 'Not Selected'}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <BeautifulButton
            variant="secondary"
            size="lg"
            icon={ArrowLeft}
            onClick={onBack}
          >
            Back
          </BeautifulButton>

          <BeautifulButton
            variant="gradient"
            size="lg"
            icon={ArrowRight}
            onClick={handleComplete}
          >
            Continue to Harvest
          </BeautifulButton>
        </div>
      </Card>
    </div>
  );
};

export default CropJournalingTokenization;
