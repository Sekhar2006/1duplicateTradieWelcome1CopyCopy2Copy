import React from 'react';
import { Card } from '../ui/card';
import { BeautifulButton } from '../ui/beautiful-buttons';
import { Scale, ArrowLeft, CheckCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

interface WeighingConfirmationProps {
  producerId: string;
  qualityData?: any;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const WeighingConfirmation: React.FC<WeighingConfirmationProps> = ({
  producerId,
  qualityData,
  onComplete,
  onBack
}) => {
  const handleComplete = () => {
    onComplete({
      weighingId: 'WEIGH-001',
      totalWeight: 100,
      finalAmount: 240000,
      paymentStatus: 'processing',
      settlementDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-6">
      <Card className="max-w-4xl mx-auto p-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Weighing & Final Settlement</h1>
            <p className="text-gray-600">Confirm weight and finalize payment</p>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="bg-gradient-to-br from-green-100 to-teal-100 p-12 rounded-xl text-center mb-8">
          <Scale className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h2 className="text-2xl font-bold mb-2">Final Weighing & Payment</h2>
          <p className="text-gray-700 mb-4">
            Confirm final weight and receive your payment
          </p>

          {/* Mock Summary */}
          <div className="mt-6 bg-white p-6 rounded-xl max-w-md mx-auto">
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Producer:</span>
                <span className="font-semibold">{producerId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Quality Grade:</span>
                <Badge className="bg-green-600">{qualityData?.grade || 'A'}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Weight:</span>
                <span className="font-semibold">100 quintals</span>
              </div>
              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-gray-600">Final Amount:</span>
                <span className="font-bold text-green-600 text-xl">₹2,40,000</span>
              </div>
            </div>
          </div>
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
            variant="success"
            size="lg"
            icon={CheckCircle}
            onClick={handleComplete}
          >
            Complete Transaction
          </BeautifulButton>
        </div>
      </Card>
    </div>
  );
};

export default WeighingConfirmation;
