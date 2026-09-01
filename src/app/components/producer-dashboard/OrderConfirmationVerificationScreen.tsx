import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Camera, CheckCircle2, AlertCircle, Package, User, DollarSign, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface OrderConfirmationVerificationScreenProps {
  orderDetails: {
    orderId: string;
    commodity: string;
    quantity: number;
    qualityGrade: string;
    agreedPrice: number;
    buyer: {
      name: string;
      company: string;
      verified: boolean;
    };
    agent?: {
      name: string;
      company: string;
    };
    deliveryDate: string;
  };
  onConfirmOrder: (otp: string, hasMedia: boolean) => void;
  onCaptureMedia: () => void;
  onBack: () => void;
}

export const OrderConfirmationVerificationScreen: React.FC<OrderConfirmationVerificationScreenProps> = ({
  orderDetails,
  onConfirmOrder,
  onCaptureMedia,
  onBack,
}) => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [mediaCaptured, setMediaCaptured] = useState(false);

  const handleSendOTP = () => {
    setOtpSent(true);
    toast.success('OTP sent to your registered mobile number');
  };

  const handleConfirm = () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    onConfirmOrder(otp, mediaCaptured);
  };

  const handleCaptureMedia = () => {
    onCaptureMedia();
    setMediaCaptured(true);
    toast.success('Photos/videos captured for AI validation');
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="mb-2" style={{ color: '#003E6D' }}>Confirm Order & Authorize Agent</h1>
          <p className="text-gray-600">Review order details and complete verification</p>
        </div>

        {/* Order Summary */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 style={{ color: '#003E6D' }}>Order Summary</h3>
              <p className="text-sm text-gray-500">Order ID: {orderDetails.orderId}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Commodity</p>
              <p style={{ color: '#003E6D' }}>{orderDetails.commodity}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Quality Grade</p>
              <Badge className="bg-green-500 text-white">Grade {orderDetails.qualityGrade}</Badge>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Quantity</p>
              <p style={{ color: '#003E6D' }}>{orderDetails.quantity} kg</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Agreed Price</p>
              <p style={{ color: '#003E6D' }}>₹{orderDetails.agreedPrice.toLocaleString()}/quintal</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Delivery Date</p>
              <p style={{ color: '#003E6D' }}>{orderDetails.deliveryDate}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Total Value</p>
              <p className="text-lg" style={{ color: '#FFD700' }}>
                ₹{((orderDetails.quantity / 100) * orderDetails.agreedPrice).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Buyer Information */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 style={{ color: '#003E6D' }}>Buyer Information</h3>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p style={{ color: '#003E6D' }}>{orderDetails.buyer.name}</p>
                <p className="text-sm text-gray-600">{orderDetails.buyer.company}</p>
              </div>
              {orderDetails.buyer.verified && (
                <Badge className="bg-blue-500 text-white">Verified Buyer</Badge>
              )}
            </div>
          </div>
        </Card>

        {/* Agent Information (if present) */}
        {orderDetails.agent && (
          <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#FFD70020' }}
              >
                <User className="w-6 h-6" style={{ color: '#FFD700' }} />
              </div>
              <div>
                <h3 style={{ color: '#003E6D' }}>Commission Agent</h3>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p style={{ color: '#003E6D' }}>{orderDetails.agent.name}</p>
              <p className="text-sm text-gray-600">{orderDetails.agent.company}</p>
            </div>
          </Card>
        )}

        {/* Media Capture for AI Validation */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg border-2" style={{ borderColor: mediaCaptured ? '#10B981' : '#FFD700' }}>
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-6 h-6" style={{ color: mediaCaptured ? '#10B981' : '#FFD700' }} />
            <div>
              <h3 style={{ color: '#003E6D' }}>Product Verification (Optional)</h3>
              <p className="text-sm text-gray-600">Capture real-time photos/videos for Grok AI evaluation</p>
            </div>
          </div>

          {!mediaCaptured ? (
            <div>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-900 mb-2">Why capture media?</p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• AI validates product quality and authenticity</li>
                  <li>• Prevents fraud and disputes</li>
                  <li>• Creates permanent record on blockchain</li>
                  <li>• Increases buyer confidence</li>
                </ul>
              </div>

              <Button
                onClick={handleCaptureMedia}
                className="w-full text-white"
                style={{ backgroundColor: '#FFD700' }}
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Real-time Photos/Videos
              </Button>
            </div>
          ) : (
            <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm text-green-800 mb-1">Media Captured Successfully</p>
                <p className="text-sm text-green-700">
                  Photos and videos ready for AI quality assessment
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* OTP Verification */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <h3 className="mb-4" style={{ color: '#003E6D' }}>Authorize Order</h3>

          {!otpSent ? (
            <div>
              <div className="bg-yellow-50 rounded-lg p-4 mb-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800 mb-1">Verification Required</p>
                  <p className="text-sm text-yellow-700">
                    An OTP will be sent to your registered mobile number to confirm this order
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSendOTP}
                className="w-full text-white"
                style={{ backgroundColor: '#003E6D' }}
              >
                Send OTP
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm text-green-800 mb-1">OTP Sent Successfully</p>
                  <p className="text-sm text-green-700">
                    Please enter the 6-digit code sent to your mobile
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Enter OTP</label>
                <Input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit OTP"
                  className="text-center text-lg tracking-widest"
                />
              </div>

              <Button
                onClick={handleConfirm}
                disabled={otp.length !== 6}
                className="w-full text-white"
                style={{ backgroundColor: '#FFD700' }}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Confirm Order
              </Button>

              <Button
                onClick={handleSendOTP}
                variant="outline"
                className="w-full"
              >
                Resend OTP
              </Button>
            </div>
          )}
        </Card>

        {/* Back Button */}
        <div className="flex justify-start">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
