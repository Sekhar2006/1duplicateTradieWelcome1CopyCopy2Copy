import React, { useState } from 'react';
import { Send, Lock, CheckCircle, User, Package, MapPin } from 'lucide-react';
import { DSButton } from '../../design-system/components/DSButton';
import { DSCard } from '../../design-system/components/DSCard';
import { DSInput } from '../../design-system/components/DSInput';

interface TransactionOTPConfirmationProps {
  onComplete?: () => void;
  onBack?: () => void;
}

export default function TransactionOTPConfirmation({ onComplete, onBack }: TransactionOTPConfirmationProps) {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const transactionDetails = {
    buyer: {
      name: 'Maharashtra Grains Co.',
      location: 'Mumbai, Maharashtra',
      rating: 4.8,
      verified: true
    },
    seller: {
      name: 'Ramesh Kumar (You)',
      location: 'Pune, Maharashtra',
      rating: 4.6,
      verified: true
    },
    commodity: {
      name: 'Premium Wheat',
      grade: 'Grade A',
      quantity: '50 MT',
      price: '₹23,500/MT',
      totalValue: '₹11,75,000'
    },
    terms: {
      deliveryDate: '15 Nov 2025',
      paymentTerms: '50% Advance, 50% on Delivery',
      location: 'Mumbai APMC, Maharashtra',
      transportMode: 'Truck'
    }
  };

  const handleSendOTP = async () => {
    // Simulate sending OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOtpSent(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleConfirm = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) return;

    setIsVerifying(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsVerifying(false);
    setIsConfirmed(true);

    // Wait a moment before calling onComplete
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF] flex items-center justify-center p-6">
        <DSCard className="max-w-md w-full text-center p-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-[#003E6D] mb-4">Transaction Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your transaction has been successfully logged and all parties have been notified.
          </p>
          <DSButton variant="primary" onClick={onComplete} className="w-full">
            View Transaction Details
          </DSButton>
        </DSCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[#003E6D] mb-2">Confirm Transaction</h1>
          <p className="text-gray-600">Review details and verify with OTP</p>
        </div>

        {/* Transaction Summary */}
        <DSCard className="mb-6">
          <div className="p-6">
            <h3 className="text-[#003E6D] mb-6">Transaction Summary</h3>

            {/* Parties */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Seller */}
              <div className="p-4 bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF]/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-[#003E6D]" />
                  <span className="text-sm text-gray-600">Seller</span>
                </div>
                <h4 className="text-[#003E6D] mb-1">{transactionDetails.seller.name}</h4>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {transactionDetails.seller.location}
                </p>
              </div>

              {/* Buyer */}
              <div className="p-4 bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF]/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-[#003E6D]" />
                  <span className="text-sm text-gray-600">Buyer</span>
                </div>
                <h4 className="text-[#003E6D] mb-1">{transactionDetails.buyer.name}</h4>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {transactionDetails.buyer.location}
                </p>
              </div>
            </div>

            {/* Commodity Details */}
            <div className="mb-6 p-4 bg-white/60 rounded-lg border border-[#FFD700]/30">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-[#003E6D]" />
                <h4 className="text-[#003E6D]">Commodity Details</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-xs text-gray-600 block mb-1">Commodity</span>
                  <span className="text-[#003E6D]">{transactionDetails.commodity.name}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-600 block mb-1">Grade</span>
                  <span className="text-[#003E6D]">{transactionDetails.commodity.grade}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-600 block mb-1">Quantity</span>
                  <span className="text-[#003E6D]">{transactionDetails.commodity.quantity}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-600 block mb-1">Price</span>
                  <span className="text-[#003E6D]">{transactionDetails.commodity.price}</span>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-xs text-gray-600 block mb-1">Delivery Date</span>
                <span className="text-[#003E6D]">{transactionDetails.terms.deliveryDate}</span>
              </div>
              <div>
                <span className="text-xs text-gray-600 block mb-1">Payment Terms</span>
                <span className="text-[#003E6D]">{transactionDetails.terms.paymentTerms}</span>
              </div>
              <div>
                <span className="text-xs text-gray-600 block mb-1">Delivery Location</span>
                <span className="text-[#003E6D]">{transactionDetails.terms.location}</span>
              </div>
              <div>
                <span className="text-xs text-gray-600 block mb-1">Transport Mode</span>
                <span className="text-[#003E6D]">{transactionDetails.terms.transportMode}</span>
              </div>
            </div>

            {/* Total Value */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-[#003E6D]">Total Transaction Value</span>
                <span className="text-[#FFD700]">{transactionDetails.commodity.totalValue}</span>
              </div>
            </div>
          </div>
        </DSCard>

        {/* OTP Section */}
        <DSCard className="mb-6">
          <div className="p-6">
            <h3 className="text-[#003E6D] mb-6">OTP Verification</h3>

            {!otpSent ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFD700]/50 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-[#003E6D]" />
                </div>
                <p className="text-gray-600 mb-6">
                  Click below to send a verification code to your registered mobile number ending with ***789
                </p>
                <DSButton
                  variant="primary"
                  onClick={handleSendOTP}
                  className="flex items-center gap-2 mx-auto"
                >
                  <Send className="w-4 h-4" />
                  Send OTP
                </DSButton>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4 text-center">
                  Enter the 6-digit code sent to your mobile ***789
                </p>

                {/* OTP Input */}
                <div className="flex justify-center gap-2 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-[#FFD700] focus:outline-none transition-colors"
                    />
                  ))}
                </div>

                {/* Resend OTP */}
                <p className="text-center text-sm text-gray-600 mb-6">
                  Didn't receive the code?{' '}
                  <button
                    onClick={handleSendOTP}
                    className="text-[#FFD700] hover:underline"
                  >
                    Resend OTP
                  </button>
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {onBack && (
                    <DSButton variant="outline" onClick={onBack} className="flex-1">
                      Cancel
                    </DSButton>
                  )}
                  <DSButton
                    variant="primary"
                    onClick={handleConfirm}
                    disabled={otp.join('').length !== 6 || isVerifying}
                    className="flex-1"
                  >
                    {isVerifying ? 'Verifying...' : 'Confirm & Log'}
                  </DSButton>
                </div>
              </div>
            )}
          </div>
        </DSCard>

        {/* Security Note */}
        <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-[#FFD700]/30">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[#003E6D] mb-1">Secure Transaction</h4>
              <p className="text-sm text-gray-600">
                This transaction is protected by dual OTP verification and will be logged on the blockchain for complete transparency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
