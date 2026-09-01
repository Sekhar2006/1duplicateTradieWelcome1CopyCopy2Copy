import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle2, Package, TrendingUp, Calendar, MapPin } from 'lucide-react';

interface GradingCompletionScreenProps {
  onCreateLots: () => void;
  batchData?: {
    batchId: string;
    commodity: string;
    totalQuantity: number;
    gradingDate: string;
    location: string;
    grades: {
      grade: string;
      quantity: number;
      percentage: number;
    }[];
  };
}

export const GradingCompletionScreen: React.FC<GradingCompletionScreenProps> = ({
  onCreateLots,
  batchData = {
    batchId: 'BTH-2025-001234',
    commodity: 'Wheat',
    totalQuantity: 5000,
    gradingDate: '2025-10-22',
    location: 'Punjab, India',
    grades: [
      { grade: 'A', quantity: 2000, percentage: 40 },
      { grade: 'B', quantity: 2500, percentage: 50 },
      { grade: 'C', quantity: 500, percentage: 10 },
    ],
  },
}) => {
  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      {/* Step Indicator */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm" style={{ color: '#003E6D' }}>Grading</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm">2</span>
            </div>
            <span className="text-sm text-gray-500">Lots</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm">3</span>
            </div>
            <span className="text-sm text-gray-500">Tokenization</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm">4</span>
            </div>
            <span className="text-sm text-gray-500">Verification</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#FFD700' }}>
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="mb-4" style={{ color: '#003E6D' }}>Grading Completed</h1>
            <p className="text-lg text-gray-700">
              The grading for batch {batchData.batchId} is done.
            </p>
          </div>

          {/* Batch Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 mt-1" style={{ color: '#FFD700' }} />
              <div>
                <p className="text-sm text-gray-500">Batch ID</p>
                <p style={{ color: '#003E6D' }}>{batchData.batchId}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 mt-1" style={{ color: '#FFD700' }} />
              <div>
                <p className="text-sm text-gray-500">Commodity</p>
                <p style={{ color: '#003E6D' }}>{batchData.commodity}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 mt-1" style={{ color: '#FFD700' }} />
              <div>
                <p className="text-sm text-gray-500">Grading Date</p>
                <p style={{ color: '#003E6D' }}>{batchData.gradingDate}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1" style={{ color: '#FFD700' }} />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p style={{ color: '#003E6D' }}>{batchData.location}</p>
              </div>
            </div>
          </div>

          {/* Grading Results */}
          <div className="mb-8">
            <h3 className="mb-4" style={{ color: '#003E6D' }}>Grading Results</h3>
            <div className="space-y-4">
              {batchData.grades.map((grade) => (
                <div key={grade.grade} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`
                          ${grade.grade === 'A' ? 'bg-green-500' : ''}
                          ${grade.grade === 'B' ? 'bg-blue-500' : ''}
                          ${grade.grade === 'C' ? 'bg-orange-500' : ''}
                          text-white
                        `}
                      >
                        Grade {grade.grade}
                      </Badge>
                      <span style={{ color: '#003E6D' }}>{grade.quantity} kg</span>
                    </div>
                    <span className="text-gray-600">{grade.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        grade.grade === 'A' ? 'bg-green-500' : 
                        grade.grade === 'B' ? 'bg-blue-500' : 
                        'bg-orange-500'
                      }`}
                      style={{ width: `${grade.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Summary */}
          <div className="bg-blue-50 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Quantity</span>
              <span style={{ color: '#003E6D' }}>{batchData.totalQuantity} kg</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <Button
              onClick={onCreateLots}
              className="px-8 py-3 text-white"
              style={{ backgroundColor: '#FFD700' }}
            >
              Create Lots
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
