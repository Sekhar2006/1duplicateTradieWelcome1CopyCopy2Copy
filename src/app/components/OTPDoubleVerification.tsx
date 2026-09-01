import React, { useState, useRef, useEffect } from 'react';
import {
  Shield,
  Lock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Mail,
  Smartphone,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { BeautifulButton } from './ui/beautiful-buttons';
import { cn } from './ui/utils';

// ==================== INTERFACES ====================

interface OTPDoubleVerificationProps {
  onComplete: () => void;
  onCancel: () => void;
  transactionAmount?: number;
  transactionType: 'payment' | 'advance' | 'settlement' | 'withdrawal';
  requireBoth?: boolean;
}

interface OTPInput {
  value: string;
  verified: boolean;
  error?: string;
}

// ==================== MAIN COMPONENT ====================

const OTPDoubleVerification: React.FC<OTPDoubleVerificationProps> = ({
  onComplete,
  onCancel,
  transactionAmount,
  transactionType,
  requireBoth = true
}) => {
  const [step, setStep] = useState<'initial' | 'email' | 'sms' | 'both' | 'success'>(
    requireBoth ? 'both' : 'initial'
  );
  
  const [emailOTP, setEmailOTP] = useState<OTPInput>({
    value: '',
    verified: false
  });
  
  const [smsOTP, setSmsOTP] = useState<OTPInput>({
    value: '',
    verified: false
  });

  const [countdown, setCountdown] = useState<number>(120); // 2 minutes
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const emailInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const smsInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  // Handle OTP input
  const handleOTPChange = (
    type: 'email' | 'sms',
    index: number,
    value: string
  ) => {
    if (!/^\d*$/.test(value)) return; // Only numbers

    const refs = type === 'email' ? emailInputRefs : smsInputRefs;
    const setter = type === 'email' ? setEmailOTP : setSmsOTP;
    const current = type === 'email' ? emailOTP : smsOTP;

    const newValue = current.value.split('');
    newValue[index] = value;
    const otpString = newValue.join('');

    setter({
      ...current,
      value: otpString,
      error: undefined
    });

    // Auto-focus next input
    if (value && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    type: 'email' | 'sms',
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      const refs = type === 'email' ? emailInputRefs : smsInputRefs;
      refs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const verifyOTP = async (type: 'email' | 'sms') => {
    setIsVerifying(true);
    const otp = type === 'email' ? emailOTP : smsOTP;
    const setter = type === 'email' ? setEmailOTP : setSmsOTP;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock verification (in production, call actual API)
    const isValid = otp.value.length === 6; // Simple check

    if (isValid) {
      setter({
        ...otp,
        verified: true,
        error: undefined
      });

      // Check if both verified
      if (requireBoth) {
        const otherVerified = type === 'email' ? smsOTP.verified : emailOTP.verified;
        if (otherVerified || !requireBoth) {
          setStep('success');
          setTimeout(() => onComplete(), 1500);
        }
      } else {
        setStep('success');
        setTimeout(() => onComplete(), 1500);
      }
    } else {
      setter({
        ...otp,
        verified: false,
        error: 'Invalid OTP. Please try again.'
      });
    }

    setIsVerifying(false);
  };

  // Resend OTP
  const resendOTP = () => {
    setCountdown(120);
    setCanResend(false);
    // API call to resend OTP
  };

  // Render OTP Input Fields
  const renderOTPFields = (type: 'email' | 'sms') => {
    const otp = type === 'email' ? emailOTP : smsOTP;
    const refs = type === 'email' ? emailInputRefs : smsInputRefs;

    return (
      <div className="flex gap-3 justify-center">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Input
            key={index}
            ref={(el) => (refs.current[index] = el)}
            type="text"
            maxLength={1}
            value={otp.value[index] || ''}
            onChange={(e) => handleOTPChange(type, index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(type, index, e)}
            className={cn(
              'w-14 h-14 text-center text-2xl font-bold',
              otp.verified && 'border-green-500 bg-green-50',
              otp.error && 'border-red-500 bg-red-50'
            )}
            disabled={otp.verified || isVerifying}
          />
        ))}
      </div>
    );
  };

  if (step === 'success') {
    return (
      <Card className="max-w-md mx-auto p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-green-600">Verification Successful!</h2>
        <p className="text-gray-600">Your transaction is being processed...</p>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Transaction Info */}
      <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Shield className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Double OTP Verification Required</h3>
            <p className="opacity-90 mb-3">
              For your security, we need to verify this {transactionType} transaction
            </p>
            {transactionAmount && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 inline-block">
                <p className="text-sm opacity-90">Transaction Amount</p>
                <p className="text-2xl font-bold">₹{transactionAmount.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* OTP Verification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Email OTP */}
        <Card className={cn(
          'p-6 border-2 transition-all',
          emailOTP.verified ? 'border-green-500 bg-green-50' : 'border-gray-200'
        )}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                'p-2 rounded-full',
                emailOTP.verified ? 'bg-green-100' : 'bg-blue-100'
              )}>
                <Mail className={cn(
                  'w-5 h-5',
                  emailOTP.verified ? 'text-green-600' : 'text-blue-600'
                )} />
              </div>
              <div>
                <h4 className="font-semibold">Email OTP</h4>
                <p className="text-xs text-gray-600">Sent to h***@gmail.com</p>
              </div>
            </div>
            {emailOTP.verified && (
              <CheckCircle className="w-6 h-6 text-green-600" />
            )}
          </div>

          {!emailOTP.verified && (
            <>
              {renderOTPFields('email')}
              
              {emailOTP.error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm">{emailOTP.error}</p>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>
                    {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                {canResend ? (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={resendOTP}
                    className="gap-1 text-blue-600"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Resend OTP
                  </Button>
                ) : (
                  <span className="text-gray-500">Resend available soon</span>
                )}
              </div>

              <BeautifulButton
                variant="primary"
                size="md"
                fullWidth
                onClick={() => verifyOTP('email')}
                disabled={emailOTP.value.length !== 6 || isVerifying}
                className="mt-4"
              >
                {isVerifying ? 'Verifying...' : 'Verify Email OTP'}
              </BeautifulButton>
            </>
          )}

          {emailOTP.verified && (
            <div className="text-center py-4">
              <p className="text-green-600 font-semibold">✓ Email Verified</p>
            </div>
          )}
        </Card>

        {/* SMS OTP */}
        <Card className={cn(
          'p-6 border-2 transition-all',
          smsOTP.verified ? 'border-green-500 bg-green-50' : 'border-gray-200'
        )}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                'p-2 rounded-full',
                smsOTP.verified ? 'bg-green-100' : 'bg-purple-100'
              )}>
                <Smartphone className={cn(
                  'w-5 h-5',
                  smsOTP.verified ? 'text-green-600' : 'text-purple-600'
                )} />
              </div>
              <div>
                <h4 className="font-semibold">SMS OTP</h4>
                <p className="text-xs text-gray-600">Sent to +91-****-43210</p>
              </div>
            </div>
            {smsOTP.verified && (
              <CheckCircle className="w-6 h-6 text-green-600" />
            )}
          </div>

          {!smsOTP.verified && (
            <>
              {renderOTPFields('sms')}
              
              {smsOTP.error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm">{smsOTP.error}</p>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>
                    {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                {canResend ? (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={resendOTP}
                    className="gap-1 text-purple-600"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Resend OTP
                  </Button>
                ) : (
                  <span className="text-gray-500">Resend available soon</span>
                )}
              </div>

              <BeautifulButton
                variant="purple"
                size="md"
                fullWidth
                onClick={() => verifyOTP('sms')}
                disabled={smsOTP.value.length !== 6 || isVerifying}
                className="mt-4"
              >
                {isVerifying ? 'Verifying...' : 'Verify SMS OTP'}
              </BeautifulButton>
            </>
          )}

          {smsOTP.verified && (
            <div className="text-center py-4">
              <p className="text-green-600 font-semibold">✓ SMS Verified</p>
            </div>
          )}
        </Card>
      </div>

      {/* Progress Indicator */}
      {requireBoth && (
        <Card className="p-4">
          <div className="flex items-center justify-center gap-4">
            <div className={cn(
              'flex items-center gap-2',
              emailOTP.verified ? 'text-green-600' : 'text-gray-400'
            )}>
              {emailOTP.verified ? <CheckCircle className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              <span className="font-medium">Email</span>
            </div>
            
            <ArrowRight className="w-5 h-5 text-gray-400" />
            
            <div className={cn(
              'flex items-center gap-2',
              smsOTP.verified ? 'text-green-600' : 'text-gray-400'
            )}>
              {smsOTP.verified ? <CheckCircle className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              <span className="font-medium">SMS</span>
            </div>
            
            <ArrowRight className="w-5 h-5 text-gray-400" />
            
            <div className={cn(
              'flex items-center gap-2',
              (emailOTP.verified && smsOTP.verified) ? 'text-green-600' : 'text-gray-400'
            )}>
              <Shield className="w-5 h-5" />
              <span className="font-medium">Verified</span>
            </div>
          </div>
        </Card>
      )}

      {/* Cancel Button */}
      <div className="text-center">
        <Button variant="outline" onClick={onCancel}>
          Cancel Transaction
        </Button>
      </div>
    </div>
  );
};

export default OTPDoubleVerification;
