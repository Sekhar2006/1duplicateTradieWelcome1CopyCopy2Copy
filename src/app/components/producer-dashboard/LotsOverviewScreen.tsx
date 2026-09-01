import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { CheckCircle2, Clock, XCircle, PlayCircle, Eye, Package } from 'lucide-react';

interface Lot {
  id: string;
  quality: string;
  quantity: number;
  description: string;
  notes: string;
  tokenizationStatus: 'not_started' | 'in_progress' | 'completed' | 'failed';
  tokenId?: string;
}

interface LotsOverviewScreenProps {
  lots: Lot[];
  onInitiateTokenization: (lotId: string) => void;
  onViewDetails: (lotId: string) => void;
  onBack: () => void;
  batchId?: string;
  globalBatchId?: string;
}

export const LotsOverviewScreen: React.FC<LotsOverviewScreenProps> = ({
  lots: initialLots,
  onInitiateTokenization,
  onViewDetails,
  onBack,
  batchId = 'BTH-2025-001234',
  globalBatchId = 'GBL-2025-WHEAT-001234',
}) => {
  const [lots, setLots] = useState<Lot[]>(
    initialLots.map((lot) => ({
      ...lot,
      tokenizationStatus: lot.tokenizationStatus || 'not_started',
    }))
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 text-white">Tokenized</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500 text-white">In Progress</Badge>;
      case 'failed':
        return <Badge className="bg-red-500 text-white">Failed</Badge>;
      default:
        return <Badge className="bg-gray-400 text-white">Not Tokenized</Badge>;
    }
  };

  const getGradeBadge = (grade: string) => {
    const colorMap: { [key: string]: string } = {
      A: 'bg-green-500',
      B: 'bg-blue-500',
      C: 'bg-orange-500',
    };
    return <Badge className={`${colorMap[grade] || 'bg-gray-500'} text-white`}>Grade {grade}</Badge>;
  };

  const stats = {
    total: lots.length,
    completed: lots.filter((l) => l.tokenizationStatus === 'completed').length,
    inProgress: lots.filter((l) => l.tokenizationStatus === 'in_progress').length,
    notStarted: lots.filter((l) => l.tokenizationStatus === 'not_started').length,
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      {/* Step Indicator */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm" style={{ color: '#003E6D' }}>Grading</span>
          </div>
          <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm" style={{ color: '#003E6D' }}>Lots</span>
          </div>
          <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFD700' }}>
              <span className="text-sm text-white">3</span>
            </div>
            <span className="text-sm" style={{ color: '#003E6D' }}>Tokenization</span>
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

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2" style={{ color: '#003E6D' }}>Lots Overview</h1>
          <p className="text-gray-600">Manage and track tokenization status for all lots</p>
        </div>

        {/* Global Batch ID Card */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFD700' }}>
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Global Batch ID</p>
                <p className="text-xl" style={{ color: '#003E6D' }}>{globalBatchId}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Batch ID</p>
              <p style={{ color: '#003E6D' }}>{batchId}</p>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-white/90 backdrop-blur-sm">
            <p className="text-sm text-gray-500 mb-1">Total Lots</p>
            <p className="text-2xl" style={{ color: '#003E6D' }}>{stats.total}</p>
          </Card>
          <Card className="p-4 bg-green-50">
            <p className="text-sm text-gray-500 mb-1">Completed</p>
            <p className="text-2xl text-green-600">{stats.completed}</p>
          </Card>
          <Card className="p-4 bg-blue-50">
            <p className="text-sm text-gray-500 mb-1">In Progress</p>
            <p className="text-2xl text-blue-600">{stats.inProgress}</p>
          </Card>
          <Card className="p-4 bg-gray-50">
            <p className="text-sm text-gray-500 mb-1">Not Started</p>
            <p className="text-2xl text-gray-600">{stats.notStarted}</p>
          </Card>
        </div>

        {/* Lots Table */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lot ID</TableHead>
                  <TableHead>Quality Grade</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Token ID</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lots.map((lot) => (
                  <TableRow key={lot.id} className="hover:bg-gray-50">
                    <TableCell>
                      <span className="font-mono text-sm">{lot.id}</span>
                    </TableCell>
                    <TableCell>{getGradeBadge(lot.quality)}</TableCell>
                    <TableCell>{lot.quantity} kg</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{lot.description || '-'}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(lot.tokenizationStatus)}
                        {getStatusBadge(lot.tokenizationStatus)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {lot.tokenId ? (
                        <span className="font-mono text-sm">{lot.tokenId}</span>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {lot.tokenizationStatus === 'not_started' && (
                          <Button
                            size="sm"
                            onClick={() => onInitiateTokenization(lot.id)}
                            className="text-white"
                            style={{ backgroundColor: '#FFD700' }}
                          >
                            <PlayCircle className="w-4 h-4 mr-1" />
                            Start
                          </Button>
                        )}
                        {lot.tokenizationStatus === 'completed' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onViewDetails(lot.id)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        )}
                        {lot.tokenizationStatus === 'in_progress' && (
                          <Button size="sm" variant="outline" disabled>
                            Processing...
                          </Button>
                        )}
                        {lot.tokenizationStatus === 'failed' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onInitiateTokenization(lot.id)}
                          >
                            Retry
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack}>
            Back to Create Lots
          </Button>
          <Button
            className="text-white"
            style={{ backgroundColor: '#003E6D' }}
            disabled={stats.completed === 0}
          >
            Continue to Verification
          </Button>
        </div>
      </div>
    </div>
  );
};
