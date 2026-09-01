import React from 'react';
import { Card } from '../ui/card';
import { BeautifulButton } from '../ui/beautiful-buttons';
import { FlaskConical, ArrowLeft, ArrowRight } from 'lucide-react';

interface SamplingQualityCheckProps {
  producerId: string;
  auctionData?: any;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const SamplingQualityCheck: React.FC<SamplingQualityCheckProps> = ({
  producerId,
  auctionData,
  onComplete,
  onBack
}) => {
  const handleComplete = () => {
    onComplete({
      qualityCheckId: 'QC-001',
      grade: 'A',
      moisture: 12,
      purity: 98,
      certification: 'FSSAI-CERTIFIED'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
      <Card className="max-w-4xl mx-auto p-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl">
            <FlaskConical className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Sampling & Quality Check</h1>
            <p className="text-gray-600">Verify commodity quality with lab testing</p>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-12 rounded-xl text-center mb-8">
          <FlaskConical className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
          <h2 className="text-2xl font-bold mb-2">Quality Check Coming Soon</h2>
          <p className="text-gray-700 mb-4">
            Lab testing and quality certification for your commodities
          </p>
          <p className="text-sm text-gray-600">
            Producer: {producerId} | Auction: {auctionData?.auctionId || 'N/A'}
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
            Continue to Weighing
          </BeautifulButton>
        </div>
      </Card>
    </div>
  );
};

export default SamplingQualityCheck;
