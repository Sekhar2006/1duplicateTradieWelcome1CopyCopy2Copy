import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  Shield,
  Award,
  Sparkles,
  FileCheck,
  Users,
  MapPin,
  Building2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { EntityTypeSelection, EntityType } from './EntityTypeSelection';
import { RegionalDocumentRequirements, DocumentRequirement } from './RegionalDocumentRequirements';
import { AIDocumentVerification, VerificationResult } from './AIDocumentVerification';
import { TeamMemberManagement, TeamMember } from './TeamMemberManagement';

type KYCStep = 'entity' | 'location' | 'documents' | 'team' | 'review' | 'complete';

interface KYCState {
  currentStep: KYCStep;
  entityType?: EntityType;
  country: string;
  state?: string;
  documentRequirements: DocumentRequirement[];
  verifiedDocuments: VerificationResult[];
  teamMembers: TeamMember[];
  completedAt?: Date;
}

interface ComprehensiveKYCSystemProps {
  userRole?: 'producer' | 'trader' | 'buyer';
  initialData?: Partial<KYCState>;
  onComplete?: (kycData: KYCState) => void;
}

export const ComprehensiveKYCSystem: React.FC<ComprehensiveKYCSystemProps> = ({
  userRole = 'producer',
  initialData,
  onComplete,
}) => {
  const [kycState, setKycState] = useState<KYCState>({
    currentStep: 'entity',
    country: 'India',
    documentRequirements: [],
    verifiedDocuments: [],
    teamMembers: [],
    ...initialData,
  });

  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);

  const steps: Array<{
    id: KYCStep;
    label: string;
    icon: React.ReactNode;
    description: string;
  }> = [
    {
      id: 'entity',
      label: 'Entity Type',
      icon: <Building2 className="w-5 h-5" />,
      description: 'Select your organization type',
    },
    {
      id: 'location',
      label: 'Location',
      icon: <MapPin className="w-5 h-5" />,
      description: 'Specify your location',
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: <FileCheck className="w-5 h-5" />,
      description: 'Verify required documents',
    },
    {
      id: 'team',
      label: 'Team',
      icon: <Users className="w-5 h-5" />,
      description: 'Add team members',
    },
    {
      id: 'review',
      label: 'Review',
      icon: <Shield className="w-5 h-5" />,
      description: 'Review and submit',
    },
    {
      id: 'complete',
      label: 'Complete',
      icon: <Award className="w-5 h-5" />,
      description: 'KYC verification complete',
    },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === kycState.currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const entityTypeMaxMembers = {
    individual: 3,
    family_enterprise: 10,
    partnership: 15,
    cooperative: 30,
    business: 30,
    corporation: 30,
  };

  const handleEntityTypeSelect = (type: EntityType) => {
    setKycState({ ...kycState, entityType: type });
  };

  const handleLocationChange = (country: string, state?: string) => {
    setKycState({ ...kycState, country, state });
  };

  const handleRequirementsLoaded = (requirements: DocumentRequirement[]) => {
    setKycState({ ...kycState, documentRequirements: requirements });
  };

  const handleDocumentVerification = (result: VerificationResult) => {
    const updatedVerified = [...kycState.verifiedDocuments];
    const existingIndex = updatedVerified.findIndex((v) => v.documentId === result.documentId);

    if (existingIndex >= 0) {
      updatedVerified[existingIndex] = result;
    } else {
      updatedVerified.push(result);
    }

    setKycState({ ...kycState, verifiedDocuments: updatedVerified });

    // Move to next document or next step
    const mandatoryDocs = kycState.documentRequirements.filter((d) => d.mandatory);
    const nextMandatoryDoc = mandatoryDocs.find(
      (doc) => !updatedVerified.some((v) => v.documentId === doc.id && v.verified)
    );

    if (nextMandatoryDoc) {
      const nextIndex = kycState.documentRequirements.findIndex((d) => d.id === nextMandatoryDoc.id);
      setCurrentDocumentIndex(nextIndex);
    }
  };

  const handleTeamMembersChange = (members: TeamMember[]) => {
    setKycState({ ...kycState, teamMembers: members });
  };

  const canProceedToNextStep = () => {
    switch (kycState.currentStep) {
      case 'entity':
        return !!kycState.entityType;
      case 'location':
        return !!kycState.country && (kycState.country !== 'India' || !!kycState.state);
      case 'documents': {
        const mandatoryDocs = kycState.documentRequirements.filter((d) => d.mandatory);
        const verifiedMandatory = mandatoryDocs.filter((doc) =>
          kycState.verifiedDocuments.some((v) => v.documentId === doc.id && v.verified)
        );
        return verifiedMandatory.length === mandatoryDocs.length;
      }
      case 'team':
        return true; // Team members are optional
      case 'review':
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceedToNextStep()) return;

    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setKycState({ ...kycState, currentStep: steps[nextIndex].id });
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setKycState({ ...kycState, currentStep: steps[prevIndex].id });
    }
  };

  const handleComplete = () => {
    const completedState = { ...kycState, completedAt: new Date(), currentStep: 'complete' as KYCStep };
    setKycState(completedState);
    onComplete?.(completedState);
  };

  const renderStepContent = () => {
    switch (kycState.currentStep) {
      case 'entity':
        return (
          <EntityTypeSelection
            selectedType={kycState.entityType}
            onSelect={handleEntityTypeSelect}
            userRole={userRole}
          />
        );

      case 'location':
        return (
          <RegionalDocumentRequirements
            country={kycState.country}
            state={kycState.state}
            entityType={kycState.entityType!}
            onCountryChange={(country) => handleLocationChange(country, undefined)}
            onStateChange={(state) => handleLocationChange(kycState.country, state)}
            onRequirementsLoaded={handleRequirementsLoaded}
          />
        );

      case 'documents': {
        const currentDoc = kycState.documentRequirements[currentDocumentIndex];
        if (!currentDoc) {
          return (
            <div className="text-center p-12">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: '#27AE60' }} />
              <h3 style={{ fontFamily: 'Poppins, sans-serif', color: '#003E6D' }}>
                All Documents Verified
              </h3>
              <p style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A' }}>
                You can proceed to the next step
              </p>
            </div>
          );
        }

        const isVerified = kycState.verifiedDocuments.some(
          (v) => v.documentId === currentDoc.id && v.verified
        );

        return (
          <div>
            {/* Document Progress */}
            <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(0,62,109,0.05)' }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D', fontSize: '0.875rem', fontWeight: 600 }}>
                  Document {currentDocumentIndex + 1} of {kycState.documentRequirements.length}
                </span>
                <span style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '0.875rem' }}>
                  {kycState.verifiedDocuments.filter((v) => v.verified).length} verified
                </span>
              </div>
              <Progress value={(kycState.verifiedDocuments.filter((v) => v.verified).length / kycState.documentRequirements.filter((d) => d.mandatory).length) * 100} />
            </div>

            {!isVerified ? (
              <AIDocumentVerification
                document={currentDoc}
                onVerificationComplete={handleDocumentVerification}
                onSkip={
                  currentDoc.mandatory
                    ? undefined
                    : () => {
                        if (currentDocumentIndex < kycState.documentRequirements.length - 1) {
                          setCurrentDocumentIndex(currentDocumentIndex + 1);
                        }
                      }
                }
              />
            ) : (
              <Card className="p-8 text-center" style={{ borderRadius: '24px', border: '2px solid rgba(39,174,96,0.3)' }}>
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: '#27AE60' }} />
                <h3 className="mb-2" style={{ fontFamily: 'Poppins, sans-serif', color: '#27AE60' }}>
                  {currentDoc.name} Verified
                </h3>
                <p className="mb-6" style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A' }}>
                  This document has been successfully verified
                </p>
                <div className="flex gap-4 justify-center">
                  {currentDocumentIndex < kycState.documentRequirements.length - 1 && (
                    <Button
                      onClick={() => setCurrentDocumentIndex(currentDocumentIndex + 1)}
                      style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
                        color: '#003E6D',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 700,
                      }}
                    >
                      Next Document
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </div>
        );
      }

      case 'team':
        return (
          <TeamMemberManagement
            entityType={kycState.entityType || 'individual'}
            maxMembers={entityTypeMaxMembers[kycState.entityType || 'individual']}
            currentMembers={kycState.teamMembers}
            onMembersChange={handleTeamMembersChange}
          />
        );

      case 'review':
        return <ReviewStep kycState={kycState} onComplete={handleComplete} />;

      case 'complete':
        return <CompletionStep kycState={kycState} />;

      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F4FC 50%, #D9F2FF 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
            }}
          >
            <Shield className="w-5 h-5" style={{ color: '#003E6D' }} />
            <span 
              style={{
                fontFamily: 'Montserrat, sans-serif',
                color: '#003E6D',
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
              }}
            >
              COMPREHENSIVE KYC VERIFICATION
            </span>
          </div>

          <h1 
            className="mb-3"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              color: '#003E6D'
            }}
          >
            Know Your Customer
          </h1>
          <p 
            style={{
              fontFamily: 'Lato, sans-serif',
              color: '#5A6B7A',
              fontSize: '1.125rem',
            }}
          >
            Complete your verification with AI-powered document authentication
          </p>
        </div>

        {/* Progress Steps */}
        {kycState.currentStep !== 'complete' && (
          <Card className="p-6 mb-8" style={{ borderRadius: '24px' }}>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D', fontSize: '0.875rem', fontWeight: 600 }}>
                  Overall Progress
                </span>
                <span style={{ fontFamily: 'Poppins, sans-serif', color: '#003E6D', fontSize: '1.125rem', fontWeight: 600 }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {steps.filter((s) => s.id !== 'complete').map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div
                    key={step.id}
                    className={`p-4 rounded-lg transition-all ${isCurrent ? 'ring-2 ring-[#FFD700]' : ''}`}
                    style={{
                      background: isCompleted
                        ? 'linear-gradient(135deg, #27AE60 0%, #6FCF97 100%)'
                        : isCurrent
                        ? 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)'
                        : 'rgba(0,62,109,0.05)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isCompleted || isCurrent ? 'white' : 'transparent',
                          color: isCompleted ? '#27AE60' : isCurrent ? '#FFD700' : '#8B9AA8',
                        }}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="truncate"
                          style={{
                            fontFamily: 'Montserrat, sans-serif',
                            color: isCompleted || isCurrent ? 'white' : '#5A6B7A',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                          }}
                        >
                          {step.label}
                        </div>
                      </div>
                    </div>
                    <p
                      className="text-xs truncate"
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        color: isCompleted || isCurrent ? 'rgba(255,255,255,0.9)' : '#8B9AA8',
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Step Content */}
        <div className="mb-8">{renderStepContent()}</div>

        {/* Navigation */}
        {kycState.currentStep !== 'complete' && kycState.currentStep !== 'review' && (
          <div className="flex justify-between max-w-5xl mx-auto px-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className="gap-2"
              style={{
                border: '2px solid rgba(0,62,109,0.2)',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
              }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceedToNextStep()}
              className="gap-2"
              style={{
                background: canProceedToNextStep()
                  ? 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)'
                  : '#C4CDD5',
                color: '#003E6D',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.5px',
                border: 'none',
              }}
            >
              Next Step
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Review Step Component
const ReviewStep: React.FC<{ kycState: KYCState; onComplete: () => void }> = ({ kycState, onComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }} className="mb-2">
          Review Your Information
        </h2>
        <p style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A' }}>
          Please review all information before submitting
        </p>
      </div>

      <div className="space-y-6">
        {/* Entity Info */}
        <Card className="p-6" style={{ borderRadius: '16px' }}>
          <h3 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: '#003E6D' }}>
            Entity Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="block mb-1" style={{ fontFamily: 'Lato, sans-serif', color: '#8B9AA8', fontSize: '0.75rem' }}>
                Entity Type
              </span>
              <span style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D', fontWeight: 600 }}>
                {kycState.entityType?.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            </div>
            <div>
              <span className="block mb-1" style={{ fontFamily: 'Lato, sans-serif', color: '#8B9AA8', fontSize: '0.75rem' }}>
                Location
              </span>
              <span style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D', fontWeight: 600 }}>
                {kycState.state ? `${kycState.state}, ${kycState.country}` : kycState.country}
              </span>
            </div>
          </div>
        </Card>

        {/* Documents */}
        <Card className="p-6" style={{ borderRadius: '16px' }}>
          <h3 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: '#003E6D' }}>
            Verified Documents ({kycState.verifiedDocuments.filter((v) => v.verified).length})
          </h3>
          <div className="space-y-3">
            {kycState.verifiedDocuments.filter((v) => v.verified).map((doc) => {
              const docInfo = kycState.documentRequirements.find((d) => d.id === doc.documentId);
              return (
                <div key={doc.documentId} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(39,174,96,0.1)' }}>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" style={{ color: '#27AE60' }} />
                    <span style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D', fontWeight: 600 }}>
                      {docInfo?.name}
                    </span>
                  </div>
                  <Badge style={{ background: '#27AE60', color: 'white', fontFamily: 'Montserrat, sans-serif' }}>
                    {Math.round(doc.confidence)}% Confidence
                  </Badge>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Team */}
        {kycState.teamMembers.length > 0 && (
          <Card className="p-6" style={{ borderRadius: '16px' }}>
            <h3 className="mb-4" style={{ fontFamily: 'Poppins, sans-serif', color: '#003E6D' }}>
              Team Members ({kycState.teamMembers.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {kycState.teamMembers.map((member) => (
                <div key={member.id} className="px-3 py-2 rounded-lg" style={{ background: 'rgba(0,62,109,0.1)' }}>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D', fontSize: '0.875rem', fontWeight: 600 }}>
                    {member.name}
                  </span>
                  <span className="ml-2" style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '0.75rem' }}>
                    ({member.role})
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="gap-2 px-12 py-6"
          style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
            color: '#003E6D',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            letterSpacing: '0.5px',
            fontSize: '1.125rem',
            border: 'none',
            borderRadius: '16px',
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              Submit KYC Application
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

// Completion Step Component
const CompletionStep: React.FC<{ kycState: KYCState }> = ({ kycState }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <div
        className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #27AE60 0%, #6FCF97 100%)',
          boxShadow: '0 20px 40px -10px rgba(39, 174, 96, 0.4)',
        }}
      >
        <Award className="w-16 h-16" style={{ color: 'white' }} />
      </div>

      <h1 className="mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}>
        KYC Verification Complete!
      </h1>

      <p className="mb-8" style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '1.125rem' }}>
        Your KYC application has been successfully submitted and is under review
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #FFFFFF 0%, #F0FFF4 100%)' }}>
          <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: '#27AE60' }} />
          <div className="mb-1" style={{ fontFamily: 'Poppins, sans-serif', color: '#003E6D', fontSize: '1.5rem', fontWeight: 600 }}>
            {kycState.verifiedDocuments.filter((v) => v.verified).length}
          </div>
          <div style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '0.875rem' }}>
            Documents Verified
          </div>
        </Card>

        <Card className="p-6" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFEF0 100%)' }}>
          <Sparkles className="w-12 h-12 mx-auto mb-3" style={{ color: '#FFD700' }} />
          <div className="mb-1" style={{ fontFamily: 'Poppins, sans-serif', color: '#003E6D', fontSize: '1.5rem', fontWeight: 600 }}>
            AI Powered
          </div>
          <div style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '0.875rem' }}>
            Advanced Verification
          </div>
        </Card>

        <Card className="p-6" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 100%)' }}>
          <Users className="w-12 h-12 mx-auto mb-3" style={{ color: '#2F80ED' }} />
          <div className="mb-1" style={{ fontFamily: 'Poppins, sans-serif', color: '#003E6D', fontSize: '1.5rem', fontWeight: 600 }}>
            {kycState.teamMembers.length}
          </div>
          <div style={{ fontFamily: 'Lato, sans-serif', color: '#5A6B7A', fontSize: '0.875rem' }}>
            Team Members
          </div>
        </Card>
      </div>

      <Badge
        className="px-6 py-3 text-base"
        style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
          color: '#003E6D',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          letterSpacing: '0.5px',
          border: 'none',
        }}
      >
        <Shield className="w-5 h-5 mr-2 inline-block" />
        Verification ID: KYC-{Math.random().toString(36).substr(2, 9).toUpperCase()}
      </Badge>

      <p className="mt-6" style={{ fontFamily: 'Lato, sans-serif', color: '#8B9AA8', fontSize: '0.875rem' }}>
        You will receive an email notification once your KYC is approved
      </p>
    </div>
  );
};

export default ComprehensiveKYCSystem;
