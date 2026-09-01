import React from 'react';
import { Building2, User, Users, Briefcase, Factory, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export type EntityType = 'individual' | 'business' | 'cooperative' | 'partnership' | 'corporation' | 'family_enterprise';

export interface EntityTypeOption {
  type: EntityType;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  teamLimit: number;
  recommended?: boolean;
}

interface EntityTypeSelectionProps {
  selectedType?: EntityType;
  onSelect?: (type: EntityType) => void;
  onBack?: () => void;
  userRole?: string;
}

export const EntityTypeSelection: React.FC<EntityTypeSelectionProps> = ({
  selectedType,
  onSelect = () => {},
  onBack,
  userRole = 'producer'
}) => {
  const entityTypes: EntityTypeOption[] = [
    {
      type: 'individual',
      title: 'Individual',
      description: 'Single person operation',
      icon: <User className="w-8 h-8" />,
      benefits: ['Quick verification', 'Lower documentation', 'Ideal for small producers'],
      teamLimit: 3,
    },
    {
      type: 'family_enterprise',
      title: 'Family Enterprise',
      description: 'Family-owned business',
      icon: <Home className="w-8 h-8" />,
      benefits: ['Family member support', 'Shared responsibilities', 'Multi-generational'],
      teamLimit: 10,
      recommended: userRole === 'producer',
    },
    {
      type: 'partnership',
      title: 'Partnership',
      description: 'Two or more partners',
      icon: <Users className="w-8 h-8" />,
      benefits: ['Shared ownership', 'Partner verification', 'Flexible structure'],
      teamLimit: 15,
    },
    {
      type: 'cooperative',
      title: 'Cooperative',
      description: 'Member-owned organization',
      icon: <Users className="w-8 h-8" />,
      benefits: ['Collective ownership', 'Member benefits', 'Democratic control'],
      teamLimit: 30,
      recommended: userRole === 'trader',
    },
    {
      type: 'business',
      title: 'Private Company',
      description: 'Registered private entity',
      icon: <Building2 className="w-8 h-8" />,
      benefits: ['Limited liability', 'Professional structure', 'Tax benefits'],
      teamLimit: 30,
    },
    {
      type: 'corporation',
      title: 'Corporation',
      description: 'Large-scale enterprise',
      icon: <Factory className="w-8 h-8" />,
      benefits: ['Public trading', 'Advanced features', 'Unlimited scaling'],
      teamLimit: 30,
      recommended: userRole === 'buyer',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {onBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            color: '#003E6D'
          }}
        >
          ← Back
        </Button>
      )}
      <div className="mb-8 text-center">
        <h1 
          className="mb-3"
          style={{ 
            fontFamily: 'Playfair Display, serif',
            color: '#003E6D'
          }}
        >
          Select Entity Type
        </h1>
        <p 
          className="text-center"
          style={{
            fontFamily: 'Lato, sans-serif',
            color: '#5A6B7A'
          }}
        >
          Choose the type that best describes your organization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entityTypes.map((entity) => (
          <Card
            key={entity.type}
            className={`
              relative p-6 cursor-pointer transition-all duration-300
              border-2 hover:shadow-lg
              ${selectedType === entity.type
                ? 'border-[#FFD700] shadow-[0_10px_30px_-5px_rgba(255,215,0,0.3)]'
                : 'border-[rgba(0,62,109,0.1)] hover:border-[#FFD700]'
              }
            `}
            style={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F7FAFC 100%)',
            }}
            onClick={() => onSelect(entity.type)}
          >
            {entity.recommended && (
              <Badge 
                className="absolute -top-2 -right-2 px-3 py-1"
                style={{
                  background: '#FFD700',
                  color: '#003E6D',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  border: 'none',
                }}
              >
                Recommended
              </Badge>
            )}

            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{
                background: selectedType === entity.type 
                  ? 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)'
                  : 'linear-gradient(135deg, #D9F2FF 0%, #E8F4FC 100%)',
                color: selectedType === entity.type ? '#003E6D' : '#5A6B7A',
              }}
            >
              {entity.icon}
            </div>

            <h3 
              className="mb-2"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#003E6D',
              }}
            >
              {entity.title}
            </h3>

            <p 
              className="mb-4"
              style={{
                fontFamily: 'Lato, sans-serif',
                color: '#5A6B7A',
                fontSize: '0.875rem',
              }}
            >
              {entity.description}
            </p>

            <div className="mb-4">
              <p 
                className="mb-2"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#003E6D',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                Team Members: Up to {entity.teamLimit}
              </p>
            </div>

            <div className="space-y-2">
              {entity.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div 
                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: '#FFD700' }}
                  />
                  <p
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      color: '#5A6B7A',
                      fontSize: '0.8125rem',
                    }}
                  >
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            {selectedType === entity.type && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{
                  background: 'linear-gradient(90deg, #FFD700 0%, #FFC700 100%)',
                  borderRadius: '0 0 24px 24px',
                }}
              />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EntityTypeSelection;
