/**
 * Simplified Quality Check Form - Dynamic Grading Demo
 * Demonstrates commodity-based dynamic field rendering
 */

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';
import commodityConfigData from './commodity-config.json';

// Commodity types
const commodities = [
  "Vegetables",
  "Leafy Vegetables",
  "Berries",
  "Fruits",
  "Grains",
  "Nuts",
  "Spices",
  "Flowers",
  "Pulses",
  "Herbs",
  "Oil Seeds",
  "Others"
];

// Grading criteria map with field types
const gradingCriteriaConfig = {
  default: {
    fields: ["size", "color", "grade"],
    labels: { size: "Size", color: "Color", grade: "Grade" },
    options: {
      size: ["Small", "Medium", "Large", "Extra Large"],
      color: ["Light", "Medium", "Dark", "Uniform Color"],
      grade: ["Grade C", "Grade B", "Grade A", "Premium (A+)"]
    }
  },
  Spices: {
    fields: ["aroma", "color", "moisture", "grade"],
    labels: { aroma: "Aroma", color: "Color", moisture: "Moisture Content", grade: "Grade" },
    options: {
      aroma: ["Mild", "Moderate", "Strong", "Excellent/Strong"],
      color: ["Light Color", "Medium Color", "Rich Color", "Deep Color"],
      moisture: ["Above 15%", "10-15%", "Below 10%", "Below 8%"],
      grade: ["Grade C", "Grade B", "Grade A", "Export Quality"]
    }
  },
  Fruits: {
    fields: ["color", "size", "firmness", "grade"],
    labels: { color: "Color", size: "Size", firmness: "Firmness", grade: "Grade" },
    options: {
      color: ["Pale", "Light", "Medium", "Rich/Vibrant"],
      size: ["Small", "Medium", "Large", "Jumbo"],
      firmness: ["Soft", "Medium Firm", "Firm", "Very Firm"],
      grade: ["Grade C", "Grade B", "Grade A", "Premium (A+)"]
    }
  },
  Grains: {
    fields: ["size", "color", "moisture", "grade"],
    labels: { size: "Grain Size", color: "Color", moisture: "Moisture Content", grade: "Grade" },
    options: {
      size: ["Small", "Medium", "Bold", "Extra Bold"],
      color: ["Off-White", "Creamy", "Golden", "Uniform Color"],
      moisture: ["Above 14%", "12-14%", "10-12%", "Below 10%"],
      grade: ["Grade C", "Grade B", "Grade A", "Premium"]
    }
  },
  Nuts: {
    fields: ["size", "color", "moisture", "grade"],
    labels: { size: "Size", color: "Color", moisture: "Moisture Content", grade: "Grade" },
    options: {
      size: ["Small", "Medium", "Large", "Jumbo"],
      color: ["Light Brown", "Medium Brown", "Rich Brown", "Uniform"],
      moisture: ["Above 12%", "8-12%", "Below 8%", "Below 6%"],
      grade: ["Grade C", "Grade B", "Grade A", "Export Quality"]
    }
  },
  Pulses: {
    fields: ["size", "color", "moisture", "grade"],
    labels: { size: "Size", color: "Color", moisture: "Moisture Content", grade: "Grade" },
    options: {
      size: ["Small", "Medium", "Large", "Bold"],
      color: ["Pale", "Light", "Medium", "Rich Color"],
      moisture: ["Above 14%", "12-14%", "10-12%", "Below 10%"],
      grade: ["Grade C", "Grade B", "Grade A", "Premium"]
    }
  },
  Herbs: {
    fields: ["aroma", "color", "leafQuality", "moisture", "grade"],
    labels: { aroma: "Aroma", color: "Color", leafQuality: "Leaf Quality", moisture: "Moisture", grade: "Grade" },
    options: {
      aroma: ["Mild", "Moderate", "Strong", "Excellent"],
      color: ["Pale Green", "Light Green", "Medium Green", "Rich Green"],
      leafQuality: ["Fair", "Good", "Very Good", "Excellent"],
      moisture: ["Above 15%", "10-15%", "8-10%", "Below 8%"],
      grade: ["Grade C", "Grade B", "Grade A", "Premium"]
    }
  },
  "Oil Seeds": {
    fields: ["size", "color", "moisture", "oilContent", "grade"],
    labels: { size: "Size", color: "Color", moisture: "Moisture", oilContent: "Oil Content", grade: "Grade" },
    options: {
      size: ["Small", "Medium", "Large", "Bold"],
      color: ["Light", "Medium", "Dark", "Rich Color"],
      moisture: ["Above 10%", "8-10%", "6-8%", "Below 6%"],
      oilContent: ["Below 30%", "30-35%", "35-40%", "Above 40%"],
      grade: ["Grade C", "Grade B", "Grade A", "Premium"]
    }
  },
  Others: {
    fields: ["quality", "appearance", "grade"],
    labels: { quality: "Overall Quality", appearance: "Appearance", grade: "Grade" },
    options: {
      quality: ["Fair", "Good", "Very Good", "Excellent"],
      appearance: ["Poor", "Average", "Good", "Excellent"],
      grade: ["Grade C", "Grade B", "Grade A", "Premium"]
    }
  }
};

interface GradingData {
  [key: string]: string;
}

interface FormData {
  commodity: string;
  otherCommodity: string;
  grading: GradingData;
  harvestMethod: {
    labor: boolean;
    machine: boolean;
  };
  processingDone: boolean;
  selfAssessment: {
    completed: boolean;
    comments: string;
  };
  externalAssessment: {
    type: string;
    rating: number;
    comments: string;
  };
  packingDetails: {
    numberOfBags: string;
    variety: string;
    harvestDate: string;
    packingDate: string;
  };
}

export default function SimplifiedQualityCheckForm() {
  const [formData, setFormData] = useState<FormData>({
    commodity: '',
    otherCommodity: '',
    grading: {},
    harvestMethod: { labor: false, machine: false },
    processingDone: false,
    selfAssessment: {
      completed: false,
      comments: ''
    },
    externalAssessment: {
      type: 'none',
      rating: 0,
      comments: ''
    },
    packingDetails: {
      numberOfBags: '',
      variety: '',
      harvestDate: '',
      packingDate: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Get current commodity config
  const currentCommodityConfig = gradingCriteriaConfig[formData.commodity as keyof typeof gradingCriteriaConfig] || gradingCriteriaConfig.default;

  // Reset grading fields when commodity changes
  useEffect(() => {
    if (!formData.commodity) return;

    const config = gradingCriteriaConfig[formData.commodity as keyof typeof gradingCriteriaConfig] || gradingCriteriaConfig.default;
    const newGrading: GradingData = {};
    
    config.fields.forEach((field: string) => {
      newGrading[field] = '';
    });
    
    setFormData(prev => ({ ...prev, grading: newGrading }));
  }, [formData.commodity]);

  const selectedCommodity = formData.commodity === 'Others' ? formData.otherCommodity : formData.commodity;

  const handleGradingChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      grading: { ...prev.grading, [field]: value }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!selectedCommodity) {
      toast.error('Please select a commodity');
      return;
    }

    if (!formData.harvestMethod.labor && !formData.harvestMethod.machine) {
      toast.error('Please select at least one harvest method');
      return;
    }

    if (!formData.selfAssessment.completed && formData.externalAssessment.type === 'none') {
      toast.error('Please complete at least self-assessment or external assessment');
      return;
    }

    setLoading(true);

    try {
      // Prepare payload matching backend schema
      const payload = {
        producerId: "PROD1234", // TODO: Get from auth context
        commodity: selectedCommodity,
        grading: {
          ...formData.grading,
          grade: formData.grading.grade || 'A'
        },
        harvestMethod: [
          ...(formData.harvestMethod.labor ? ['labor'] : []),
          ...(formData.harvestMethod.machine ? ['machine'] : [])
        ],
        processingDone: formData.processingDone,
        qualityCheckTiers: {
          selfAssessment: {
            completed: formData.selfAssessment.completed,
            comments: formData.selfAssessment.comments
          },
          ...(formData.externalAssessment.type !== 'none' && {
            externalAssessment: {
              type: formData.externalAssessment.type,
              rating: formData.externalAssessment.rating,
              comments: formData.externalAssessment.comments
            }
          })
        },
        packingDetails: {
          numberOfBags: parseInt(formData.packingDetails.numberOfBags) || 0,
          variety: formData.packingDetails.variety,
          harvestDate: formData.packingDetails.harvestDate,
          packingDate: formData.packingDetails.packingDate
        }
      };

      // Check if mock mode is enabled (API server not running)
      const USE_MOCK_MODE = (typeof window !== 'undefined' && (window as any).__TRADIE_MOCK_MODE__) !== false;
      const API_URL = (typeof window !== 'undefined' && (window as any).__TRADIE_API_URL__) || 'http://localhost:3000';
      
      try {
        const response = await fetch(`${API_URL}/api/quality-check`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
            // Add auth header when using full server:
            // 'Authorization': `Bearer ${localStorage.getItem('tradie_auth_token')}`
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          toast.success('Quality check submitted successfully!', {
            description: `Token ID: ${result.data?.tokenId}`
          });
          setSubmitted(true);
        } else {
          const error = await response.json();
          toast.error('Error submitting quality check', {
            description: error.message
          });
        }
      } catch (fetchError: any) {
        // If fetch fails and mock mode is enabled, use mock response
        if (USE_MOCK_MODE && fetchError.message.includes('fetch')) {
          console.log('API not available, using mock mode');
          
          // Generate mock token ID
          const mockTokenId = `TQC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
          
          // Simulate successful response
          toast.success('Quality check submitted successfully! (Mock Mode)', {
            description: `Token ID: ${mockTokenId}`,
            duration: 5000,
          });
          
          // Show info about starting the API server
          setTimeout(() => {
            toast.info('Using Mock Mode', {
              description: 'Start the API server for full functionality. Run: cd api && npm start',
              duration: 8000,
            });
          }, 1000);
          
          setSubmitted(true);
        } else {
          throw fetchError;
        }
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error('Quality check submission failed', {
        description: 'Please ensure the API server is running on http://localhost:3000',
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F7FAFC] to-[#D9F2FF] p-6 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-[#003E6D] text-2xl mb-2">Quality Check Submitted!</h2>
          <p className="text-gray-600 mb-6">Your quality check has been recorded successfully.</p>
          <Button 
            onClick={() => setSubmitted(false)}
            className="bg-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/90"
          >
            Submit Another
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7FAFC] to-[#D9F2FF] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-[#003E6D] mb-2">Dynamic Quality Check Form</h1>
          <p className="text-gray-600">
            Grading criteria changes based on selected commodity type
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm">
            <h3 className="font-semibold text-[#003E6D] mb-4">1. Commodity Selection</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="commodity">Commodity Type *</Label>
                <Select
                  value={formData.commodity}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, commodity: value }))}
                >
                  <SelectTrigger id="commodity">
                    <SelectValue placeholder="Select commodity type" />
                  </SelectTrigger>
                  <SelectContent>
                    {commodities.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.commodity === 'Others' && (
                <div>
                  <Label htmlFor="other-commodity">Specify Commodity *</Label>
                  <Input
                    id="other-commodity"
                    type="text"
                    placeholder="Enter commodity name"
                    value={formData.otherCommodity}
                    onChange={(e) => setFormData(prev => ({ ...prev, otherCommodity: e.target.value }))}
                    required
                  />
                </div>
              )}

              {formData.commodity && (
                <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                  📊 {currentCommodityConfig.fields.length} grading criteria for {formData.commodity}
                </Badge>
              )}
            </div>
          </Card>

          {formData.commodity && (
            <>
              {/* Dynamic Grading Criteria */}
              <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm">
                <h3 className="font-semibold text-[#003E6D] mb-4">
                  2. Grading Criteria - {formData.commodity}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentCommodityConfig.fields.map((field: string) => (
                    <div key={field}>
                      <Label htmlFor={field}>
                        {currentCommodityConfig.labels[field as keyof typeof currentCommodityConfig.labels]} *
                      </Label>
                      <Select
                        value={formData.grading[field] || ''}
                        onValueChange={(value) => handleGradingChange(field, value)}
                      >
                        <SelectTrigger id={field}>
                          <SelectValue placeholder={`Select ${currentCommodityConfig.labels[field as keyof typeof currentCommodityConfig.labels]}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {currentCommodityConfig.options[field as keyof typeof currentCommodityConfig.options]?.map((option: string) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Harvest Method */}
              <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm">
                <h3 className="font-semibold text-[#003E6D] mb-4">3. Harvest Method *</h3>
                
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="labor"
                      checked={formData.harvestMethod.labor}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          harvestMethod: { ...prev.harvestMethod, labor: checked === true }
                        }))
                      }
                    />
                    <Label htmlFor="labor">Manual Labor</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="machine"
                      checked={formData.harvestMethod.machine}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({
                          ...prev,
                          harvestMethod: { ...prev.harvestMethod, machine: checked === true }
                        }))
                      }
                    />
                    <Label htmlFor="machine">Machine Harvesting</Label>
                  </div>
                </div>
              </Card>

              {/* Processing */}
              <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm">
                <h3 className="font-semibold text-[#003E6D] mb-4">4. Processing</h3>
                
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="processing"
                    checked={formData.processingDone}
                    onCheckedChange={(checked) =>
                      setFormData(prev => ({ ...prev, processingDone: checked === true }))
                    }
                  />
                  <Label htmlFor="processing">Processing Done (Drying, Cleaning, etc.)</Label>
                </div>
              </Card>

              {/* Quality Assessment */}
              <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm">
                <h3 className="font-semibold text-[#003E6D] mb-4">5. Quality Assessment *</h3>
                
                <div className="space-y-4">
                  {/* Self Assessment */}
                  <div className="p-4 border-2 border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Checkbox
                        id="self-assessment"
                        checked={formData.selfAssessment.completed}
                        onCheckedChange={(checked) =>
                          setFormData(prev => ({
                            ...prev,
                            selfAssessment: { ...prev.selfAssessment, completed: checked === true }
                          }))
                        }
                      />
                      <Label htmlFor="self-assessment" className="font-semibold">Self-Assessment</Label>
                    </div>

                    {formData.selfAssessment.completed && (
                      <div>
                        <Label htmlFor="self-comments">Assessment Comments</Label>
                        <Textarea
                          id="self-comments"
                          placeholder="Describe your quality assessment..."
                          value={formData.selfAssessment.comments}
                          onChange={(e) =>
                            setFormData(prev => ({
                              ...prev,
                              selfAssessment: { ...prev.selfAssessment, comments: e.target.value }
                            }))
                          }
                          rows={3}
                        />
                      </div>
                    )}
                  </div>

                  {/* External Assessment */}
                  <div className="p-4 border-2 border-[#FFD700] rounded-lg">
                    <Label htmlFor="external-type" className="font-semibold">External Assessment (Optional)</Label>
                    <Select
                      value={formData.externalAssessment.type}
                      onValueChange={(value) =>
                        setFormData(prev => ({
                          ...prev,
                          externalAssessment: { ...prev.externalAssessment, type: value }
                        }))
                      }
                    >
                      <SelectTrigger id="external-type" className="mt-2">
                        <SelectValue placeholder="Select assessment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="3rd Party Verifier">3rd Party Verifier</SelectItem>
                        <SelectItem value="Government Appointee">Government Appointee</SelectItem>
                        <SelectItem value="Lab Report">Lab Report</SelectItem>
                        <SelectItem value="Buyer Classification">Buyer Classification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Packing Details */}
              <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm">
                <h3 className="font-semibold text-[#003E6D] mb-4">6. Packing Details *</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bags">Number of Bags *</Label>
                    <Input
                      id="bags"
                      type="number"
                      min="1"
                      placeholder="Enter number"
                      value={formData.packingDetails.numberOfBags}
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          packingDetails: { ...prev.packingDetails, numberOfBags: e.target.value }
                        }))
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="variety">Variety Name *</Label>
                    <Input
                      id="variety"
                      type="text"
                      placeholder="e.g., Basmati, Alphonso"
                      value={formData.packingDetails.variety}
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          packingDetails: { ...prev.packingDetails, variety: e.target.value }
                        }))
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="harvest-date">Harvest Date *</Label>
                    <Input
                      id="harvest-date"
                      type="date"
                      value={formData.packingDetails.harvestDate}
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          packingDetails: { ...prev.packingDetails, harvestDate: e.target.value }
                        }))
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="packing-date">Packing Date *</Label>
                    <Input
                      id="packing-date"
                      type="date"
                      value={formData.packingDetails.packingDate}
                      onChange={(e) =>
                        setFormData(prev => ({
                          ...prev,
                          packingDetails: { ...prev.packingDetails, packingDate: e.target.value }
                        }))
                      }
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/90 px-8"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Quality Check'
                  )}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
