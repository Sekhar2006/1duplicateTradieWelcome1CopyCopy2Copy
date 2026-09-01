import React, { useState } from 'react';
import { DollarSign, Send, Lock, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { DSButton } from '../../design-system/components/DSButton';
import { DSCard } from '../../design-system/components/DSCard';
import { DSInput } from '../../design-system/components/DSInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AdvanceRecordingScreenProps {
  onComplete?: () => void;
  onBack?: () => void;
}

export default function AdvanceRecordingScreen({ onComplete, onBack }: AdvanceRecordingScreenProps) {
  const [formData, setFormData] = useState({
    transactionType: '',
    fromEntity: '',
    toEntity: '',
    amount: '',
    purpose: '',
    linkedLot: '',
    creditDebitType: '',
  });
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const lots = [
    { id: 'LOT001', name: 'Premium Wheat - 50 MT', value: '₹11,75,000' },
    { id: 'LOT002', name: 'Basmati Rice - 30 MT', value: '₹8,40,000' },
    { id: 'LOT003', name: 'Coffee Beans - 10 MT', value: '₹18,00,000' },
  ];

  const entities = [
    'Maharashtra Grains Co.',
    'Punjab Agricultural Traders',
    'Karnataka Quality Lots',
    'Gujarat Commodity Exchange',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setShowOTP(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`advance-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleConfirmOTP = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) return;

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsCompleted(true);

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF] flex items-center justify-center p-6">
        <DSCard className="max-w-md w-full text-center p-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-[#003E6D] mb-4">Advance Recorded Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your advance payment of ₹{parseFloat(formData.amount || '0').toLocaleString()} has been logged and reflected in your ledger.
          </p>
          <DSButton variant="primary" onClick={onComplete} className="w-full">
            View Ledger
          </DSButton>
        </DSCard>
      </div>
    );
  }

  if (showOTP) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF] p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-[#003E6D] mb-2">OTP Verification</h1>
            <p className="text-gray-600">Confirm your advance payment transaction</p>
          </div>

          <DSCard className="mb-6">
            <div className="p-6">
              {/* Transaction Summary */}
              <div className="mb-6 p-4 bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF]/30 rounded-lg">
                <h3 className="text-[#003E6D] mb-4">Transaction Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="text-[#003E6D]">
                      {formData.creditDebitType === 'credit' ? 'Credit (Received)' : 'Debit (Paid)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">From</span>
                    <span className="text-[#003E6D]">{formData.fromEntity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To</span>
                    <span className="text-[#003E6D]">{formData.toEntity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="text-[#FFD700]">₹{parseFloat(formData.amount || '0').toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Purpose</span>
                    <span className="text-[#003E6D]">{formData.purpose}</span>
                  </div>
                  {formData.linkedLot && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Linked Lot</span>
                      <span className="text-[#003E6D]">{formData.linkedLot}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* OTP Input */}
              <div className="mb-6">
                <p className="text-gray-600 mb-4 text-center">
                  Enter the 6-digit code sent to your mobile ***789
                </p>
                <div className="flex justify-center gap-2 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`advance-otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-[#FFD700] focus:outline-none transition-colors"
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-gray-600">
                  Didn't receive the code?{' '}
                  <button className="text-[#FFD700] hover:underline">
                    Resend OTP
                  </button>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <DSButton
                  variant="outline"
                  onClick={() => setShowOTP(false)}
                  className="flex-1"
                >
                  Back
                </DSButton>
                <DSButton
                  variant="primary"
                  onClick={handleConfirmOTP}
                  disabled={otp.join('').length !== 6 || isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? 'Processing...' : 'Log & Reflect'}
                </DSButton>
              </div>
            </div>
          </DSCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF] p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[#003E6D] mb-2">Record Advance Payment</h1>
          <p className="text-gray-600">Log advance payments and update your ledger</p>
        </div>

        <DSCard className="mb-6">
          <div className="p-6">
            {/* Transaction Type */}
            <div className="mb-6">
              <label className="block text-[#003E6D] mb-3">Transaction Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleInputChange('creditDebitType', 'credit')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.creditDebitType === 'credit'
                      ? 'border-[#FFD700] bg-[#FFD700]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <ArrowLeft className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#003E6D]">Credit (Received)</span>
                  </div>
                  <p className="text-sm text-gray-600">Money received from buyer</p>
                </button>

                <button
                  onClick={() => handleInputChange('creditDebitType', 'debit')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.creditDebitType === 'debit'
                      ? 'border-[#FFD700] bg-[#FFD700]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#003E6D]">Debit (Paid)</span>
                  </div>
                  <p className="text-sm text-gray-600">Advance paid to supplier</p>
                </button>
              </div>
            </div>

            {/* From/To Entities */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[#003E6D] mb-2">From</label>
                <Select value={formData.fromEntity} onValueChange={(value) => handleInputChange('fromEntity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entity" />
                  </SelectTrigger>
                  <SelectContent>
                    {entities.map(entity => (
                      <SelectItem key={entity} value={entity}>{entity}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-[#003E6D] mb-2">To</label>
                <Select value={formData.toEntity} onValueChange={(value) => handleInputChange('toEntity', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entity" />
                  </SelectTrigger>
                  <SelectContent>
                    {entities.map(entity => (
                      <SelectItem key={entity} value={entity}>{entity}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amount */}
            <div className="mb-6">
              <label className="block text-[#003E6D] mb-2">Amount (₹)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <DSInput
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="Enter amount"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Purpose */}
            <div className="mb-6">
              <label className="block text-[#003E6D] mb-2">Purpose</label>
              <Select value={formData.purpose} onValueChange={(value) => handleInputChange('purpose', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="advance_payment">Advance Payment</SelectItem>
                  <SelectItem value="partial_settlement">Partial Settlement</SelectItem>
                  <SelectItem value="earnest_money">Earnest Money</SelectItem>
                  <SelectItem value="security_deposit">Security Deposit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Linked Lot */}
            <div className="mb-6">
              <label className="block text-[#003E6D] mb-2">Linked Lot (Optional)</label>
              <Select value={formData.linkedLot} onValueChange={(value) => handleInputChange('linkedLot', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select lot" />
                </SelectTrigger>
                <SelectContent>
                  {lots.map(lot => (
                    <SelectItem key={lot.id} value={lot.id}>
                      {lot.name} - {lot.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Security Note */}
            <div className="p-4 bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 rounded-lg border border-[#FFD700]/30 mb-6">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[#003E6D] mb-1">OTP Confirmation Required</h4>
                  <p className="text-sm text-gray-600">
                    This transaction will require OTP verification for security. All advance payments are logged and reflected in your ledger immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {onBack && (
                <DSButton variant="outline" onClick={onBack} className="flex-1">
                  Cancel
                </DSButton>
              )}
              <DSButton
                variant="primary"
                onClick={handleSubmit}
                disabled={!formData.creditDebitType || !formData.fromEntity || !formData.toEntity || !formData.amount || !formData.purpose}
                className="flex-1"
              >
                Proceed to OTP Verification
              </DSButton>
            </div>
          </div>
        </DSCard>
      </div>
    </div>
  );
}
