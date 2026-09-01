import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Lot {
  id: string;
  quality: string;
  quantity: number;
  description: string;
  notes: string;
}

interface CreateLotsScreenProps {
  onProceedToTokenization: (lots: Lot[]) => void;
  onBack: () => void;
  batchId?: string;
  availableGrades?: { grade: string; available: number }[];
}

export const CreateLotsScreen: React.FC<CreateLotsScreenProps> = ({
  onProceedToTokenization,
  onBack,
  batchId = 'BTH-2025-001234',
  availableGrades = [
    { grade: 'A', available: 2000 },
    { grade: 'B', available: 2500 },
    { grade: 'C', available: 500 },
  ],
}) => {
  const [lots, setLots] = useState<Lot[]>([]);
  const [currentLot, setCurrentLot] = useState<Lot>({
    id: '',
    quality: '',
    quantity: 0,
    description: '',
    notes: '',
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddLot = () => {
    if (!currentLot.quality || currentLot.quantity <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    const selectedGrade = availableGrades.find((g) => g.grade === currentLot.quality);
    const usedQuantity = lots
      .filter((l) => l.quality === currentLot.quality)
      .reduce((sum, l) => sum + l.quantity, 0);

    if (selectedGrade && usedQuantity + currentLot.quantity > selectedGrade.available) {
      toast.error(`Not enough quantity available for Grade ${currentLot.quality}`);
      return;
    }

    if (editingIndex !== null) {
      const updatedLots = [...lots];
      updatedLots[editingIndex] = { ...currentLot, id: `LOT-${Date.now()}` };
      setLots(updatedLots);
      setEditingIndex(null);
      toast.success('Lot updated successfully');
    } else {
      setLots([...lots, { ...currentLot, id: `LOT-${Date.now()}` }]);
      toast.success('Lot added successfully');
    }

    setCurrentLot({ id: '', quality: '', quantity: 0, description: '', notes: '' });
  };

  const handleEditLot = (index: number) => {
    setCurrentLot(lots[index]);
    setEditingIndex(index);
  };

  const handleDeleteLot = (index: number) => {
    const updatedLots = lots.filter((_, i) => i !== index);
    setLots(updatedLots);
    toast.success('Lot deleted successfully');
  };

  const handleProceed = () => {
    if (lots.length === 0) {
      toast.error('Please add at least one lot');
      return;
    }
    onProceedToTokenization(lots);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-500';
      case 'B':
        return 'bg-blue-500';
      case 'C':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      {/* Step Indicator */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm" style={{ color: '#003E6D' }}>Grading</span>
          </div>
          <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFD700' }}>
              <span className="text-sm text-white">2</span>
            </div>
            <span className="text-sm" style={{ color: '#003E6D' }}>Lots</span>
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

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2" style={{ color: '#003E6D' }}>Create Lots</h1>
          <p className="text-gray-600">Add lots with quality grades, quantities, and descriptions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Create Lot Form */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
            <h3 className="mb-4" style={{ color: '#003E6D' }}>
              {editingIndex !== null ? 'Edit Lot' : 'Create New Lot'}
            </h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="quality">Lot Quality *</Label>
                <Select
                  value={currentLot.quality}
                  onValueChange={(value) => setCurrentLot({ ...currentLot, quality: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableGrades.map((grade) => (
                      <SelectItem key={grade.grade} value={grade.grade}>
                        Grade {grade.grade} - Available: {grade.available} kg
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">Quantity (kg) *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={currentLot.quantity || ''}
                  onChange={(e) => setCurrentLot({ ...currentLot, quantity: Number(e.target.value) })}
                  placeholder="Enter quantity in kg"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={currentLot.description}
                  onChange={(e) => setCurrentLot({ ...currentLot, description: e.target.value })}
                  placeholder="Enter lot description"
                />
              </div>

              <div>
                <Label htmlFor="notes">Special Notes</Label>
                <Textarea
                  id="notes"
                  value={currentLot.notes}
                  onChange={(e) => setCurrentLot({ ...currentLot, notes: e.target.value })}
                  placeholder="Any special handling or storage requirements"
                  rows={3}
                />
              </div>

              <Button
                onClick={handleAddLot}
                className="w-full text-white"
                style={{ backgroundColor: '#FFD700' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                {editingIndex !== null ? 'Update Lot' : 'Add Lot'}
              </Button>
            </div>
          </Card>

          {/* Right Column - Lots List */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
            <h3 className="mb-4" style={{ color: '#003E6D' }}>Lots Added</h3>

            {lots.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p>No lots created yet</p>
                <p className="text-sm">Add your first lot to get started</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {lots.map((lot, index) => (
                  <div key={lot.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={`${getGradeColor(lot.quality)} text-white`}>
                          Grade {lot.quality}
                        </Badge>
                        <span style={{ color: '#003E6D' }}>{lot.quantity} kg</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditLot(index)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Edit2 className="w-4 h-4 text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleDeleteLot(index)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    {lot.description && (
                      <p className="text-sm text-gray-600 mb-1">{lot.description}</p>
                    )}
                    {lot.notes && (
                      <p className="text-sm text-gray-500 italic">{lot.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            Back to Grading
          </Button>
          <Button
            onClick={handleProceed}
            className="text-white"
            style={{ backgroundColor: '#003E6D' }}
            disabled={lots.length === 0}
          >
            Proceed to Tokenization
          </Button>
        </div>
      </div>
    </div>
  );
};
