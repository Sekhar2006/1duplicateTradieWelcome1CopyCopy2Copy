import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Star, Award, TrendingUp, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CommissionAgentEngagementScreenProps {
  agent: {
    id: string;
    name: string;
    company: string;
    rating: number;
    successfulDeals: number;
    commission: number;
    specialties: string[];
    services: string[];
  };
  onConfirmEngagement: (type: 'direct' | 'representation', otp: string) => void;
  onBack: () => void;
}

export const CommissionAgentEngagementScreen: React.FC<CommissionAgentEngagementScreenProps> = ({
  agent,
  onConfirmEngagement,
  onBack,
}) => {
  const [serviceType, setServiceType] = useState<'direct' | 'representation' | null>(null);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSelectService = (type: 'direct' | 'representation') => {
    setServiceType(type);
    toast.info(`Selected: ${type === 'direct' ? 'Direct Sale Assistance' : 'Representation for Sale'}`);
  };

  const handleSendOTP = () => {
    if (!serviceType) {
      toast.error('Please select a service type');
      return;
    }
    setOtpSent(true);
    toast.success('OTP sent to your registered mobile number');
  };

  const handleConfirm = () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    if (serviceType) {
      onConfirmEngagement(serviceType, otp);
      toast.success('Commission agent engaged successfully!');
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2" style={{ color: '#003E6D' }}>Engage Commission Agent</h1>
          <p className="text-gray-600">Select service type and authorize the engagement</p>
        </div>

        {/* Agent Profile */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="flex items-start gap-6">
            <div
              className="w-20 h-20 rounded-lg flex items-center justify-center text-white text-2xl"
              style={{ backgroundColor: '#FFD700' }}
            >
              {agent.name.charAt(0)}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="mb-1" style={{ color: '#003E6D' }}>{agent.name}</h2>
                  <p className="text-gray-600 mb-2">{agent.company}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span style={{ color: '#003E6D' }}>{agent.rating}</span>
                    </div>
                    <Badge className="bg-blue-500 text-white">Verified Agent</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Successful Deals</p>
                  <p className="text-lg" style={{ color: '#003E6D' }}>{agent.successfulDeals}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Commission Rate</p>
                  <p className="text-lg" style={{ color: '#003E6D' }}>{agent.commission}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="text-lg" style={{ color: '#003E6D' }}>{agent.rating}/5.0</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {agent.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Service Selection */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <h3 className="mb-4" style={{ color: '#003E6D' }}>Select Service Type</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Direct Sale Assistance */}
            <div
              onClick={() => handleSelectService('direct')}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                serviceType === 'direct'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="mb-1" style={{ color: '#003E6D' }}>Direct Sale Assistance</h4>
                  <p className="text-sm text-gray-600">
                    Agent helps you find buyers and negotiate, but you handle the final transaction
                  </p>
                </div>
              </div>
              {serviceType === 'direct' && (
                <div className="flex items-center gap-2 text-blue-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">Selected</span>
                </div>
              )}
            </div>

            {/* Representation for Sale */}
            <div
              onClick={() => handleSelectService('representation')}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                serviceType === 'representation'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <Award className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="mb-1" style={{ color: '#003E6D' }}>Representation for Sale</h4>
                  <p className="text-sm text-gray-600">
                    Agent fully represents you in sale, handles all negotiations and transactions
                  </p>
                </div>
              </div>
              {serviceType === 'representation' && (
                <div className="flex items-center gap-2 text-blue-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">Selected</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* OTP Verification */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <h3 className="mb-4" style={{ color: '#003E6D' }}>Authorize Engagement</h3>

          {!otpSent ? (
            <div>
              <div className="bg-yellow-50 rounded-lg p-4 mb-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800 mb-1">Verification Required</p>
                  <p className="text-sm text-yellow-700">
                    An OTP will be sent to your registered mobile number to authorize this engagement
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={!serviceType}
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
                <Shield className="w-4 h-4 mr-2" />
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

        {/* Terms and Conditions */}
        <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <h3 className="mb-3" style={{ color: '#003E6D' }}>Terms of Engagement</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
              <p>Commission rate: {agent.commission}% of final sale price</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
              <p>Payment terms: Agent fee paid upon successful transaction</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
              <p>Service guarantee: Full transparency in all dealings</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
              <p>Cancellation: Can be terminated with 24 hours notice</p>
            </div>
          </div>
        </Card>

        {/* Back Button */}
        <div className="flex justify-start">
          <Button variant="outline" onClick={onBack}>
            Back to Agents
          </Button>
        </div>
      </div>
    </div>
  );
};
