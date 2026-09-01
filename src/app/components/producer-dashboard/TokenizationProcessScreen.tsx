import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { CheckCircle2, AlertCircle, Loader2, Hash, FileText, Shield } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TokenizationStep {
  id: string;
  label: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  message?: string;
}

interface TokenizationProcessScreenProps {
  lotId: string;
  onComplete: (tokenData: any) => void;
  onBack: () => void;
  lotData?: {
    id: string;
    quality: string;
    quantity: number;
  };
}

export const TokenizationProcessScreen: React.FC<TokenizationProcessScreenProps> = ({
  lotId,
  onComplete,
  onBack,
  lotData = {
    id: 'LOT-001',
    quality: 'A',
    quantity: 1000,
  },
}) => {
  const [steps, setSteps] = useState<TokenizationStep[]>([
    { id: 'validate', label: 'Validating Lot Data', status: 'pending' },
    { id: 'generate_batch', label: 'Generating Global Batch ID', status: 'pending' },
    { id: 'generate_token', label: 'Generating Token ID', status: 'pending' },
    { id: 'blockchain', label: 'Recording on Blockchain', status: 'pending' },
    { id: 'qr_code', label: 'Generating QR Code', status: 'pending' },
    { id: 'metadata', label: 'Preparing Metadata', status: 'pending' },
  ]);

  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tokenData, setTokenData] = useState<any>(null);

  const processTokenization = React.useCallback(async () => {
    const stepDuration = 1500; // milliseconds per step

    for (let i = 0; i < steps.length; i++) {
      // Update current step to in_progress
      setSteps((prev) =>
        prev.map((step, idx) =>
          idx === i ? { ...step, status: 'in_progress' } : step
        )
      );

      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, stepDuration));

      // Update current step to completed
      const isLastStep = i === steps.length - 1;
      const randomFail = Math.random() < 0.05; // 5% chance of failure for demo

      if (randomFail && !isLastStep) {
        setSteps((prev) =>
          prev.map((step, idx) =>
            idx === i
              ? { ...step, status: 'failed', message: 'Network error occurred' }
              : step
          )
        );
        toast.error('Tokenization failed. Please try again.');
        setIsProcessing(false);
        return;
      }

      setSteps((prev) =>
        prev.map((step, idx) =>
          idx === i
            ? { ...step, status: 'completed', message: 'Success' }
            : step
        )
      );

      setProgress(((i + 1) / steps.length) * 100);

      // If last step, generate token data
      if (isLastStep) {
        const generatedTokenData = {
          globalBatchId: `GBL-2025-${lotData.quality}-${Date.now()}`,
          tokenId: `TKN-${lotId}-${Date.now()}`,
          qrCode: `https://tradie.verify/${lotId}`,
          blockchainHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          timestamp: new Date().toISOString(),
        };
        setTokenData(generatedTokenData);
        toast.success('Tokenization completed successfully!');
      }
    }

    setIsProcessing(false);
  }, [lotId, lotData.quality, steps.length]);

  useEffect(() => {
    if (isProcessing) {
      processTokenization();
    }
  }, [isProcessing, processTokenization]);

  const handleStart = () => {
    setIsProcessing(true);
  };

  const handleRetry = () => {
    setSteps((prev) =>
      prev.map((step) => ({ ...step, status: 'pending', message: undefined }))
    );
    setProgress(0);
    setTokenData(null);
    setIsProcessing(true);
  };

  const handleAddDetails = () => {
    if (tokenData) {
      onComplete(tokenData);
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

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

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="mb-2" style={{ color: '#003E6D' }}>Tokenization Process</h1>
          <p className="text-gray-600">Generating token IDs for each lot...</p>
        </div>

        {/* Lot Info Card */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Processing Lot</p>
              <p style={{ color: '#003E6D' }}>{lotData.id}</p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Quality</p>
                <Badge className="bg-green-500 text-white">Grade {lotData.quality}</Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Quantity</p>
                <p style={{ color: '#003E6D' }}>{lotData.quantity} kg</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Progress Card */}
        <Card className="p-8 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span style={{ color: '#003E6D' }}>Overall Progress</span>
              <span style={{ color: '#003E6D' }}>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start gap-4 p-4 rounded-lg transition-all ${
                  step.status === 'in_progress' ? 'bg-blue-50' : ''
                } ${step.status === 'completed' ? 'bg-green-50' : ''} ${
                  step.status === 'failed' ? 'bg-red-50' : ''
                }`}
              >
                <div className="mt-1">{getStepIcon(step.status)}</div>
                <div className="flex-1">
                  <p style={{ color: '#003E6D' }}>{step.label}</p>
                  {step.message && (
                    <p className={`text-sm ${step.status === 'failed' ? 'text-red-600' : 'text-gray-500'}`}>
                      {step.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Status Message */}
          {!isProcessing && !tokenData && (
            <div className="text-center mt-8">
              <p className="text-gray-500 mb-4">Ready to generate token ID</p>
              <Button
                onClick={handleStart}
                className="px-8 text-white"
                style={{ backgroundColor: '#FFD700' }}
              >
                Start Tokenization
              </Button>
            </div>
          )}

          {steps.some((s) => s.status === 'failed') && !isProcessing && (
            <div className="text-center mt-8">
              <Button onClick={handleRetry} variant="outline">
                Retry Tokenization
              </Button>
            </div>
          )}
        </Card>

        {/* Success Card */}
        {tokenData && (
          <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-lg border-2 border-green-500">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2" style={{ color: '#003E6D' }}>Tokenization Successful!</h3>
              <p className="text-gray-600">Your lot has been successfully tokenized</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Hash className="w-5 h-5 mt-1" style={{ color: '#FFD700' }} />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Global Batch ID</p>
                  <p className="font-mono text-sm" style={{ color: '#003E6D' }}>{tokenData.globalBatchId}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 mt-1" style={{ color: '#FFD700' }} />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Token ID</p>
                  <p className="font-mono text-sm" style={{ color: '#003E6D' }}>{tokenData.tokenId}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 mt-1" style={{ color: '#FFD700' }} />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Blockchain Hash</p>
                  <p className="font-mono text-xs break-all" style={{ color: '#003E6D' }}>
                    {tokenData.blockchainHash}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <Button
                onClick={handleAddDetails}
                className="px-8 text-white"
                style={{ backgroundColor: '#003E6D' }}
              >
                Add/Edit Token Details
              </Button>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onBack} disabled={isProcessing}>
            Back to Overview
          </Button>
        </div>
      </div>
    </div>
  );
};
