/**
 * Quality Check with QR Code Integration
 * Combines quality check submission with QR code display
 */

import React, { useState } from 'react';
import SimplifiedQualityCheckForm from './producer-dashboard/SimplifiedQualityCheckForm';
import QRCodeManager from './QRCodeManager';
import { Button } from './ui/button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface QRData {
  tokenId: string;
  qrCodeUrl: string;
  commodity: string;
  grade?: string;
}

export default function QualityCheckWithQR() {
  const [step, setStep] = useState<'form' | 'qr'>('form');
  const [qrData, setQRData] = useState<QRData | null>(null);

  const handleSubmitSuccess = (response: any) => {
    // Extract QR data from API response
    const data: QRData = {
      tokenId: response.data.tokenId,
      qrCodeUrl: response.data.qrCodeUrl,
      commodity: response.data.commodity,
      grade: response.data.grade
    };

    setQRData(data);
    setStep('qr');
  };

  const handleReset = () => {
    setStep('form');
    setQRData(null);
  };

  if (step === 'qr' && qrData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F7FAFC] to-[#D9F2FF]">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-8 h-8" />
              <h1 className="text-2xl">Quality Check Submitted!</h1>
            </div>
            <p className="text-green-100">
              Your quality token has been generated successfully
            </p>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="p-6">
          <QRCodeManager
            mode="display"
            qrData={qrData}
          />

          {/* Actions */}
          <div className="max-w-4xl mx-auto mt-6">
            <Button
              onClick={handleReset}
              className="bg-[#003E6D] text-white hover:bg-[#003E6D]/90 w-full md:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Submit Another Quality Check
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SimplifiedQualityCheckForm
        onSubmitSuccess={handleSubmitSuccess}
      />
    </div>
  );
}
