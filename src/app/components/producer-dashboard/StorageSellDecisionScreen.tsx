import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle2, Warehouse, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface StorageSellDecisionScreenProps {
  onStore: () => void;
  onSell: () => void;
  onBack: () => void;
  lotData?: {
    id: string;
    tokenId: string;
    quality: string;
    quantity: number;
  };
}

export const StorageSellDecisionScreen: React.FC<StorageSellDecisionScreenProps> = ({
  onStore,
  onSell,
  onBack,
  lotData = {
    id: 'LOT-001',
    tokenId: 'TKN-LOT-001-1729584000000',
    quality: 'A',
    quantity: 1000,
  },
}) => {
  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#FFD700' }}>
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-2" style={{ color: '#003E6D' }}>Store or Sell Your Commodity</h1>
          <p className="text-gray-600 mb-4">Your lot and tokenization are complete.</p>
          <p className="text-gray-700">Choose how to proceed:</p>
        </div>

        {/* Lot Summary */}
        <Card className="p-6 mb-8 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Lot ID</p>
              <p className="font-mono" style={{ color: '#003E6D' }}>{lotData.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Quality</p>
              <p style={{ color: '#003E6D' }}>Grade {lotData.quality}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Quantity</p>
              <p style={{ color: '#003E6D' }}>{lotData.quantity} kg</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Token ID</p>
              <p className="font-mono text-sm" style={{ color: '#003E6D' }}>
                {lotData.tokenId.substring(0, 15)}...
              </p>
            </div>
          </div>
        </Card>

        {/* Decision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Store Option */}
          <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-blue-100">
                <Warehouse className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="mb-4" style={{ color: '#003E6D' }}>Store</h2>
              <p className="text-gray-600 mb-6">
                Store produce in nearby or selected storage facilities and await best prices.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm text-gray-700">Wait for better market prices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <Warehouse className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm text-gray-700">Professional storage facilities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm text-gray-700">Maximize profit potential</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={onStore}
                className="w-full text-white"
                style={{ backgroundColor: '#003E6D' }}
              >
                Select Storage
              </Button>
            </div>
          </Card>

          {/* Sell Option */}
          <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-green-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ backgroundColor: '#FFD70020' }}>
                <DollarSign className="w-10 h-10" style={{ color: '#FFD700' }} />
              </div>
              <h2 className="mb-4" style={{ color: '#003E6D' }}>Sell</h2>
              <p className="text-gray-600 mb-6">
                Sell now by listing your commodity.
              </p>
              
              <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#FFD70010' }}>
                <div className="flex items-start gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 mt-0.5" style={{ color: '#FFD700' }} />
                  <div className="text-left">
                    <p className="text-sm text-gray-700">Immediate market access</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <DollarSign className="w-5 h-5 mt-0.5" style={{ color: '#FFD700' }} />
                  <div className="text-left">
                    <p className="text-sm text-gray-700">Get paid quickly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5" style={{ color: '#FFD700' }} />
                  <div className="text-left">
                    <p className="text-sm text-gray-700">Connect with verified buyers</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={onSell}
                className="w-full text-white"
                style={{ backgroundColor: '#FFD700' }}
              >
                List for Sale
              </Button>
            </div>
          </Card>
        </div>

        {/* Back Button */}
        <div className="flex justify-start">
          <Button variant="outline" onClick={onBack}>
            Back to Verification
          </Button>
        </div>
      </div>
    </div>
  );
};
