import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle,
  AlertTriangle,
  Camera,
  FileText,
  Clock,
  User,
  Shield,
  Package,
  TrendingUp,
  AlertCircle,
  Eye,
  Lock,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { BeautifulButton } from '../ui/beautiful-buttons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import OTPDoubleVerification from '../OTPDoubleVerification';
import { cn } from '../ui/utils';

// ==================== INTERFACES ====================

interface DestinationReceivingProps {
  producerId: string;
  transportData: any;
  onComplete: (data: ReceivingConfirmationData) => void;
  onBack: () => void;
}

interface ReceivingConfirmationData {
  receivedBy: string;
  receiverRole: 'agent_staff' | 'buyer_representative';
  receivedAt: string;
  otpConfirmed: boolean;
  inspectionChecklist: InspectionItem[];
  damageReport?: DamageReport;
  photos: string[];
  storageLocation: string;
  formallyAccepted: boolean;
  signature: string;
}

interface InspectionItem {
  id: string;
  label: string;
  status: 'pass' | 'fail' | 'pending';
  notes?: string;
}

interface DamageReport {
  type: 'missing' | 'damaged' | 'both';
  description: string;
  affectedBags: number;
  photos: string[];
  reportedAt: string;
}

// ==================== MOCK DATA ====================

const inspectionChecklistItems: InspectionItem[] = [
  { id: 'bags', label: 'Correct number of bags', status: 'pending' },
  { id: 'seals', label: 'All seals intact', status: 'pending' },
  { id: 'moisture', label: 'No moisture damage', status: 'pending' },
  { id: 'contamination', label: 'No contamination', status: 'pending' },
  { id: 'weight', label: 'Weight verification', status: 'pending' },
  { id: 'quality', label: 'Quality maintained', status: 'pending' },
];

// ==================== MAIN COMPONENT ====================

const DestinationReceiving: React.FC<DestinationReceivingProps> = ({
  producerId,
  transportData,
  onComplete,
  onBack
}) => {
  const [currentView, setCurrentView] = useState<'access' | 'inspection' | 'confirmation'>('access');
  const [receiverDetails, setReceiverDetails] = useState({
    name: '',
    role: 'agent_staff' as 'agent_staff' | 'buyer_representative',
    id: '',
    mobile: ''
  });
  const [checklist, setChecklist] = useState<InspectionItem[]>(inspectionChecklistItems);
  const [hasDamage, setHasDamage] = useState(false);
  const [damageReport, setDamageReport] = useState<Partial<DamageReport>>({
    type: 'damaged',
    description: '',
    affectedBags: 0,
    photos: []
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [storageLocation, setStorageLocation] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [accessVerified, setAccessVerified] = useState(false);

  // Check if user has access (in real app, verify with backend)
  const hasAccess = accessVerified || receiverDetails.role === 'agent_staff';

  const handleChecklistUpdate = (id: string, status: 'pass' | 'fail') => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, status } : item
    ));

    // If any item fails, show damage report
    if (status === 'fail') {
      setHasDamage(true);
    }
  };

  const handleVerifyAccess = () => {
    // In real app, verify credentials with backend
    if (!receiverDetails.name || !receiverDetails.id || !receiverDetails.mobile) {
      alert('Please fill all fields');
      return;
    }

    setShowOTP(true);
  };

  const handleAccessOTPComplete = () => {
    setAccessVerified(true);
    setShowOTP(false);
    setCurrentView('inspection');
  };

  const handleFinalConfirmation = () => {
    const allInspected = checklist.every(item => item.status !== 'pending');
    if (!allInspected) {
      alert('Please complete all inspection items');
      return;
    }

    if (!storageLocation) {
      alert('Please assign storage location');
      return;
    }

    // Show OTP for final confirmation
    setShowOTP(true);
  };

  const handleFinalOTPComplete = () => {
    const confirmationData: ReceivingConfirmationData = {
      receivedBy: receiverDetails.name,
      receiverRole: receiverDetails.role,
      receivedAt: new Date().toISOString(),
      otpConfirmed: true,
      inspectionChecklist: checklist,
      damageReport: hasDamage ? damageReport as DamageReport : undefined,
      photos,
      storageLocation,
      formallyAccepted: !hasDamage,
      signature: `${receiverDetails.name}-${Date.now()}`
    };

    onComplete(confirmationData);
  };

  const passedItems = checklist.filter(item => item.status === 'pass').length;
  const failedItems = checklist.filter(item => item.status === 'fail').length;
  const progressPercentage = (passedItems / checklist.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">📍 Destination Receiving</h1>
            <p className="text-gray-600">
              Secure commodity receiving with confidential access control
            </p>
          </div>
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
        </div>

        {/* Progress Steps */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className={cn(
              'flex items-center gap-3',
              currentView === 'access' && 'text-teal-600'
            )}>
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center',
                accessVerified ? 'bg-green-600' : currentView === 'access' ? 'bg-teal-600' : 'bg-gray-300'
              )}>
                {accessVerified ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <Lock className="w-6 h-6 text-white" />
                )}
              </div>
              <span className="font-semibold">Access Verification</span>
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div 
                className={cn('h-full bg-teal-600 transition-all', accessVerified && 'w-full')}
                style={{ width: accessVerified ? '100%' : '0%' }}
              />
            </div>

            <div className={cn(
              'flex items-center gap-3',
              currentView === 'inspection' && 'text-teal-600'
            )}>
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center',
                passedItems === checklist.length ? 'bg-green-600' : currentView === 'inspection' ? 'bg-teal-600' : 'bg-gray-300'
              )}>
                {passedItems === checklist.length ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : (
                  <Eye className="w-6 h-6 text-white" />
                )}
              </div>
              <span className="font-semibold">Physical Inspection</span>
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div 
                className={cn('h-full bg-teal-600 transition-all')}
                style={{ width: currentView === 'confirmation' ? '100%' : '0%' }}
              />
            </div>

            <div className={cn(
              'flex items-center gap-3',
              currentView === 'confirmation' && 'text-teal-600'
            )}>
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center',
                currentView === 'confirmation' ? 'bg-teal-600' : 'bg-gray-300'
              )}>
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold">Formal Acceptance</span>
            </div>
          </div>
        </Card>

        {/* Commodity Info (Always Visible) */}
        <Card className="p-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-3">Commodity Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm opacity-90 mb-1">Token ID</p>
                  <p className="font-bold">{transportData?.lotId || 'LOT-2025-001'}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-1">Commodity</p>
                  <p className="font-bold">{transportData?.commodity || 'Wheat Grade A'}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-1">Quantity</p>
                  <p className="font-bold">{transportData?.quantity || '100'} quintals</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-1">Bags</p>
                  <p className="font-bold">{transportData?.bags || '50'} bags</p>
                </div>
              </div>
            </div>
            <Badge className="bg-white text-teal-600">
              <Shield className="w-4 h-4 mr-1" />
              Confidential
            </Badge>
          </div>
        </Card>

        {/* STEP 1: ACCESS VERIFICATION */}
        {currentView === 'access' && (
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Lock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Authorized Access Only</h3>
                <p className="text-gray-600">
                  Only commission agent staff or buyer representatives can view and receive this commodity.
                  Please verify your identity to proceed.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="receiverName">Full Name *</Label>
                <Input
                  id="receiverName"
                  placeholder="Enter your full name"
                  value={receiverDetails.name}
                  onChange={(e) => setReceiverDetails({...receiverDetails, name: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="receiverId">Employee/Agent ID *</Label>
                <Input
                  id="receiverId"
                  placeholder="Enter your ID"
                  value={receiverDetails.id}
                  onChange={(e) => setReceiverDetails({...receiverDetails, id: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="receiverMobile">Mobile Number *</Label>
                <Input
                  id="receiverMobile"
                  type="tel"
                  placeholder="+91-98765-43210"
                  value={receiverDetails.mobile}
                  onChange={(e) => setReceiverDetails({...receiverDetails, mobile: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="role">Role *</Label>
                <select
                  id="role"
                  value={receiverDetails.role}
                  onChange={(e) => setReceiverDetails({...receiverDetails, role: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="agent_staff">Commission Agent Staff</option>
                  <option value="buyer_representative">Buyer Representative</option>
                </select>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <Shield className="w-4 h-4 inline mr-2" />
                You will receive an OTP on your registered mobile for verification.
                Only authorized personnel can proceed with receiving.
              </p>
            </div>

            <BeautifulButton
              variant="gradient"
              size="lg"
              icon={Smartphone}
              onClick={handleVerifyAccess}
              className="mt-6 w-full md:w-auto"
            >
              Verify with OTP
            </BeautifulButton>
          </Card>
        )}

        {/* STEP 2: PHYSICAL INSPECTION */}
        {currentView === 'inspection' && accessVerified && (
          <div className="space-y-6">
            
            {/* Inspection Progress */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Physical Inspection Checklist</h3>
                <Badge className={cn(
                  progressPercentage === 100 ? 'bg-green-600' : 'bg-blue-600'
                )}>
                  {passedItems} / {checklist.length} Complete
                </Badge>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-semibold">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full transition-all',
                      failedItems > 0 ? 'bg-orange-600' : 'bg-green-600'
                    )}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      'p-4 rounded-lg border-2 transition-all',
                      item.status === 'pass' && 'border-green-200 bg-green-50',
                      item.status === 'fail' && 'border-red-200 bg-red-50',
                      item.status === 'pending' && 'border-gray-200 bg-white'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center',
                          item.status === 'pass' && 'bg-green-600',
                          item.status === 'fail' && 'bg-red-600',
                          item.status === 'pending' && 'bg-gray-300'
                        )}>
                          {item.status === 'pass' && <CheckCircle className="w-5 h-5 text-white" />}
                          {item.status === 'fail' && <AlertTriangle className="w-5 h-5 text-white" />}
                          {item.status === 'pending' && <span className="text-white text-sm">•</span>}
                        </div>
                        <span className="font-semibold">{item.label}</span>
                      </div>

                      {item.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleChecklistUpdate(item.id, 'pass')}
                            className="border-green-600 text-green-600 hover:bg-green-50"
                          >
                            Pass
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleChecklistUpdate(item.id, 'fail')}
                            className="border-red-600 text-red-600 hover:bg-red-50"
                          >
                            Fail
                          </Button>
                        </div>
                      )}

                      {item.status !== 'pending' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setChecklist(checklist.map(i => 
                            i.id === item.id ? { ...i, status: 'pending' } : i
                          ))}
                        >
                          Reset
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Damage Report (if any failed) */}
            {hasDamage && (
              <Card className="p-6 border-2 border-orange-300 bg-orange-50">
                <div className="flex items-start gap-4 mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-orange-900 mb-2">
                      Damage/Issue Report
                    </h3>
                    <p className="text-sm text-orange-800">
                      One or more inspection items failed. Please provide details below.
                      The producer will be automatically notified.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Issue Type</Label>
                    <select
                      value={damageReport.type}
                      onChange={(e) => setDamageReport({...damageReport, type: e.target.value as any})}
                      className="w-full px-3 py-2 border border-orange-300 rounded-lg bg-white"
                    >
                      <option value="damaged">Damaged Goods</option>
                      <option value="missing">Missing Bags</option>
                      <option value="both">Both Damaged & Missing</option>
                    </select>
                  </div>

                  <div>
                    <Label>Affected Bags</Label>
                    <Input
                      type="number"
                      min="0"
                      value={damageReport.affectedBags}
                      onChange={(e) => setDamageReport({...damageReport, affectedBags: parseInt(e.target.value)})}
                      className="border-orange-300"
                    />
                  </div>

                  <div>
                    <Label>Detailed Description</Label>
                    <Textarea
                      placeholder="Describe the damage or issue in detail..."
                      value={damageReport.description}
                      onChange={(e) => setDamageReport({...damageReport, description: e.target.value})}
                      rows={4}
                      className="border-orange-300"
                    />
                  </div>

                  <div>
                    <Label>Upload Photos</Label>
                    <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center">
                      <Camera className="w-12 h-12 text-orange-400 mx-auto mb-2" />
                      <p className="text-sm text-orange-800 mb-2">
                        Click to upload damage photos
                      </p>
                      <Button variant="outline" size="sm" className="border-orange-600 text-orange-600">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Photo Documentation */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Photo Documentation</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Upload photos of received commodity (recommended)
                </p>
                <Button variant="outline" size="sm">
                  Take Photos
                </Button>
              </div>
            </Card>

            {/* Storage Location */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Storage Location Assignment</h3>
              <div>
                <Label htmlFor="storage">Assign Storage Location *</Label>
                <Input
                  id="storage"
                  placeholder="e.g., Warehouse A, Section 2, Row 5"
                  value={storageLocation}
                  onChange={(e) => setStorageLocation(e.target.value)}
                />
                <p className="text-xs text-gray-600 mt-1">
                  Where will this commodity be stored?
                </p>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <BeautifulButton
                variant="gradient"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => {
                  if (checklist.every(item => item.status !== 'pending')) {
                    setCurrentView('confirmation');
                  } else {
                    alert('Please complete all inspection items');
                  }
                }}
                disabled={checklist.some(item => item.status === 'pending')}
              >
                Proceed to Confirmation
              </BeautifulButton>
              
              <Button
                variant="outline"
                onClick={() => setCurrentView('access')}
              >
                Back to Access
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: FORMAL ACCEPTANCE */}
        {currentView === 'confirmation' && (
          <div className="space-y-6">
            
            {/* Summary Card */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-green-600 rounded-full">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">
                    Ready for Formal Acceptance
                  </h3>
                  <p className="text-green-800">
                    Review the summary below and confirm receipt with OTP verification
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Received By</p>
                  <p className="font-semibold">{receiverDetails.name}</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Role</p>
                  <p className="font-semibold capitalize">{receiverDetails.role.replace('_', ' ')}</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Inspection Status</p>
                  <p className="font-semibold text-green-600">
                    {passedItems} Passed, {failedItems} Failed
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Storage</p>
                  <p className="font-semibold">{storageLocation}</p>
                </div>
              </div>

              {hasDamage && (
                <div className="mt-4 p-4 bg-orange-100 rounded-lg border-2 border-orange-300">
                  <p className="font-semibold text-orange-900 mb-2">⚠️ Damage Reported</p>
                  <p className="text-sm text-orange-800">
                    {damageReport.type}: {damageReport.affectedBags} bags affected.
                    Producer has been notified.
                  </p>
                </div>
              )}
            </Card>

            {/* Final Confirmation */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Final Confirmation</h3>
              <p className="text-gray-700 mb-6">
                By confirming, you formally accept this commodity on behalf of {receiverDetails.role.replace('_', ' ')}.
                An OTP will be sent to your mobile for verification.
              </p>

              <BeautifulButton
                variant="gold"
                size="lg"
                icon={CheckCircle}
                shimmer
                glow
                onClick={handleFinalConfirmation}
              >
                Confirm Receipt with OTP
              </BeautifulButton>
            </Card>
          </div>
        )}
      </div>

      {/* OTP Verification Modal */}
      {showOTP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <OTPDoubleVerification
              transactionType="commodity_receiving"
              transactionAmount={0}
              requireBoth={true}
              onComplete={currentView === 'access' ? handleAccessOTPComplete : handleFinalOTPComplete}
              onCancel={() => setShowOTP(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationReceiving;
