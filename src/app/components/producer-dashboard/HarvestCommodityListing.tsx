import React from 'react';
import { Card } from '../ui/card';
import { BeautifulButton } from '../ui/beautiful-buttons';
import { ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';

interface HarvestCommodityListingProps {
  producerId: string;
  journalData?: any;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const HarvestCommodityListing: React.FC<HarvestCommodityListingProps> = ({
  producerId,
  journalData,
  onComplete,
  onBack
}) => {
  const handleComplete = () => {
    onComplete({
      lotId: 'LOT-001',
      commodity: 'Wheat Grade A',
      quantity: 100,
      unit: 'quintals',
      priceExpectation: 2400
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <Card className="max-w-4xl mx-auto p-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Harvest & Commodity Listing</h1>
            <p className="text-gray-600">Create commodity lots for market listing</p>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-12 rounded-xl text-center mb-8">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-orange-600" />
          <h2 className="text-2xl font-bold mb-2">Commodity Listing Coming Soon</h2>
          <p className="text-gray-700 mb-4">
            List your harvested commodities and create tradeable lots
          </p>
          <p className="text-sm text-gray-600">
            Producer: {producerId} | Journal: {journalData?.journalId || 'N/A'}
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
            Continue to Transport
          </BeautifulButton>
        </div>
      </Card>
    </div>
  );
};

export default HarvestCommodityListing;
