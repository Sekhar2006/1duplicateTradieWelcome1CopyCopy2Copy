import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  FileText, 
  Award, 
  TrendingUp,
  Package,
  Users,
  Shield,
  Star,
  Download,
  ExternalLink,
  ChevronRight,
  Info,
  ClipboardCheck,
  BarChart3,
  Calendar,
  Hash,
  Carrot,
  Salad,
  Cherry,
  Apple,
  Wheat,
  Nut,
  Flame,
  Flower2,
  Bean,
  Leaf,
  Droplet,
  Boxes,
  Check,
  ChevronsUpDown,
  Search
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { toast } from 'sonner';
import { copyToClipboard } from '../ui/clipboard-utils';
import { 
  getCommodityConfig, 
  getGradingCriteriaLabels,
  sizeOptions,
  colorOptions,
  moistureOptions,
  aromaOptions,
  textureOptions,
  firmnessOptions,
  type CommodityConfig
} from './CommodityConfig';

// Types
interface QualityCheckData {
  commodityType: string;
  customCommodity?: string;
  harvestMethod: {
    labor: boolean;
    machinery: boolean;
  };
  initialGrading: {
    size: string;
    color: string;
    other: string;
  };
  processing: {
    dried: boolean;
    processed: boolean;
    reGraded: boolean;
  };
  qualityTier: {
    selfAssessment: {
      completed: boolean;
      comments: string;
    };
    externalAssessment: {
      type: 'none' | '3rd Party Verifier' | 'Government Appointee' | 'Lab Report' | 'Buyer Classification';
      verifierName?: string;
      documentUrl?: string;
      rating?: number;
      comments?: string;
    };
  };
  salesChannel: {
    atCultivation: boolean;
    commissionAgent: boolean;
    agentRating?: number;
    agentQualitySpecs?: string;
    marketYardRating?: number;
  };
  tokenization: {
    numberOfBags: number;
    varietyName: string;
    qualityGrade: string;
    harvestDate: string;
    processingDate: string;
    packingDate: string;
  };
  documents: Array<{
    type: string;
    name: string;
    url: string;
  }>;
}

interface FeedbackItem {
  stage: string;
  rating: number;
  comment: string;
  date: string;
  source: string;
}

const QualityCheckWorkflow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState<QualityCheckData>({
    commodityType: '',
    harvestMethod: { labor: false, machinery: false },
    initialGrading: { size: '', color: '', other: '' },
    processing: { dried: false, processed: false, reGraded: false },
    qualityTier: { 
      selfAssessment: {
        completed: false,
        comments: ''
      },
      externalAssessment: {
        type: 'none',
        rating: 0,
        comments: ''
      }
    },
    salesChannel: { 
      atCultivation: false, 
      commissionAgent: false 
    },
    tokenization: {
      numberOfBags: 0,
      varietyName: '',
      qualityGrade: '',
      harvestDate: '',
      processingDate: '',
      packingDate: ''
    },
    documents: []
  });

  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackItem[]>([
    {
      stage: 'Initial Harvest',
      rating: 4.5,
      comment: 'Excellent initial quality. Good size consistency.',
      date: '2025-10-15',
      source: 'Self-Assessment'
    },
    {
      stage: 'Market Yard',
      rating: 4.2,
      comment: 'Minor color variations noted. Overall good quality.',
      date: '2025-10-18',
      source: 'Market Inspector'
    }
  ]);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [tokenGenerated, setTokenGenerated] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('');

  // Commodity options with icons
  const commodityOptions = [
    { value: 'vegetables', label: 'Vegetables', icon: Carrot, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { value: 'leafy-vegetables', label: 'Leafy Vegetables', icon: Salad, color: 'text-green-600', bgColor: 'bg-green-100' },
    { value: 'berries', label: 'Berries', icon: Cherry, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { value: 'fruits', label: 'Fruits', icon: Apple, color: 'text-red-600', bgColor: 'bg-red-100' },
    { value: 'grains', label: 'Grains', icon: Wheat, color: 'text-amber-600', bgColor: 'bg-amber-100' },
    { value: 'nuts', label: 'Nuts', icon: Nut, color: 'text-brown-600', bgColor: 'bg-brown-100' },
    { value: 'spices', label: 'Spices', icon: Flame, color: 'text-red-700', bgColor: 'bg-red-100' },
    { value: 'flowers', label: 'Flowers', icon: Flower2, color: 'text-pink-600', bgColor: 'bg-pink-100' },
    { value: 'pulses', label: 'Pulses', icon: Bean, color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
    { value: 'herbs', label: 'Herbs', icon: Leaf, color: 'text-green-700', bgColor: 'bg-green-100' },
    { value: 'oil-seeds', label: 'Oil Seeds', icon: Droplet, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { value: 'other', label: 'Other', icon: Boxes, color: 'text-gray-600', bgColor: 'bg-gray-100' }
  ];
  
  // Commodities that require drying processing (mandatory)
  const dryingRequiredCommodities = ['spices', 'grains', 'nuts', 'oil-seeds', 'herbs'];
  
  // Get current commodity details
  const currentCommodity = commodityOptions.find(opt => opt.value === formData.commodityType);
  const isDryingMandatory = dryingRequiredCommodities.includes(formData.commodityType);
  
  // Get dynamic commodity configuration
  const commodityConfig = currentCommodity ? getCommodityConfig(currentCommodity.label) : null;
  const gradingCriteriaLabels = commodityConfig ? getGradingCriteriaLabels(commodityConfig.gradingCriteria) : [];

  // Quality grades
  const qualityGrades = [
    { value: 'premium', label: 'Premium (A+)', color: 'bg-green-500' },
    { value: 'grade-a', label: 'Grade A', color: 'bg-green-400' },
    { value: 'grade-b', label: 'Grade B', color: 'bg-yellow-400' },
    { value: 'grade-c', label: 'Grade C', color: 'bg-orange-400' },
    { value: 'grade-d', label: 'Grade D', color: 'bg-red-400' }
  ];

  // Third-party verifiers
  const verifiers = [
    { value: 'sgsvt', label: 'SGS Verification & Testing' },
    { value: 'bureau-veritas', label: 'Bureau Veritas' },
    { value: 'intertek', label: 'Intertek Quality Services' },
    { value: 'apeda', label: 'APEDA Certified Inspector' },
    { value: 'fssai', label: 'FSSAI Inspector' }
  ];

  // Lab options
  const labs = [
    { value: 'nabl-lab-1', label: 'NABL Accredited Lab - Hyderabad' },
    { value: 'nabl-lab-2', label: 'NABL Accredited Lab - Guntur' },
    { value: 'fssai-lab', label: 'FSSAI Reference Lab' },
    { value: 'apeda-lab', label: 'APEDA Testing Lab' }
  ];

  // Workflow steps
  const steps = [
    { id: 1, name: 'Commodity Selection', icon: Package },
    { id: 2, name: 'Harvest & Grading', icon: ClipboardCheck },
    { id: 3, name: 'Processing', icon: BarChart3 },
    { id: 4, name: 'Quality Verification', icon: Shield },
    { id: 5, name: 'Sales Listing', icon: TrendingUp },
    { id: 6, name: 'Tokenization', icon: Hash }
  ];

  // Calculate overall compliance score
  const calculateComplianceScore = (): number => {
    let score = 0;
    if (formData.commodityType) score += 15;
    if (formData.harvestMethod.labor || formData.harvestMethod.machinery) score += 15;
    if (formData.initialGrading.size && formData.initialGrading.color) score += 15;
    if (formData.processing.dried || formData.processing.processed) score += 10;
    if (formData.qualityTier.selfAssessment.completed) score += 10;
    if (formData.qualityTier.externalAssessment.type !== 'none') score += 20;
    if (formData.salesChannel.atCultivation || formData.salesChannel.commissionAgent) score += 10;
    if (formData.tokenization.numberOfBags > 0) score += 5;
    return score;
  };

  const complianceScore = calculateComplianceScore();

  // Get compliance status
  const getComplianceStatus = (score: number) => {
    if (score >= 80) return { color: 'bg-green-500', text: 'Excellent Compliance', icon: CheckCircle2 };
    if (score >= 60) return { color: 'bg-yellow-500', text: 'Good Compliance', icon: AlertCircle };
    return { color: 'bg-red-500', text: 'Needs Improvement', icon: AlertCircle };
  };

  const status = getComplianceStatus(complianceScore);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFiles(prev => [...prev, file]);
      
      // Simulate file upload
      const newDoc = {
        type: docType,
        name: file.name,
        url: URL.createObjectURL(file)
      };
      
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, newDoc]
      }));

      toast.success(`${docType} uploaded successfully`);
    }
  };

  // Generate token and submit quality check to API
  const handleGenerateToken = async () => {
    if (!formData.tokenization.numberOfBags || !formData.tokenization.varietyName) {
      toast.error('Please fill in all tokenization details');
      return;
    }

    try {
      // Prepare API payload matching backend schema
      const payload = {
        producerId: "PROD1234", // TODO: Get from auth context
        commodity: currentCommodity?.label || formData.commodityType,
        grading: {
          ...(commodityConfig?.gradingCriteria.size && { size: formData.initialGrading.size }),
          ...(commodityConfig?.gradingCriteria.color && { color: formData.initialGrading.color }),
          ...(commodityConfig?.gradingCriteria.aroma && { aroma: formData.initialGrading.other }),
          ...(commodityConfig?.gradingCriteria.moisture && { moisture: formData.initialGrading.size }),
          ...(commodityConfig?.gradingCriteria.firmness && { firmness: formData.initialGrading.color }),
          ...(commodityConfig?.gradingCriteria.texture && { texture: formData.initialGrading.other }),
          grade: formData.tokenization.qualityGrade || 'A'
        },
        harvestMethod: [
          ...(formData.harvestMethod.labor ? ['labor'] : []),
          ...(formData.harvestMethod.machinery ? ['machine'] : [])
        ],
        processingDone: formData.processing.dried || formData.processing.processed,
        qualityCheckTiers: {
          selfAssessment: {
            completed: formData.qualityTier.selfAssessment.completed,
            comments: formData.qualityTier.selfAssessment.comments
          },
          ...(formData.qualityTier.externalAssessment.type !== 'none' && {
            externalAssessment: {
              type: formData.qualityTier.externalAssessment.type,
              documentUrl: formData.qualityTier.externalAssessment.documentUrl || '',
              rating: formData.qualityTier.externalAssessment.rating || 0,
              comments: formData.qualityTier.externalAssessment.comments || ''
            }
          })
        },
        salesListing: {
          saleType: formData.salesChannel.commissionAgent ? 'Commission Agent' : 'Direct',
          ...(formData.salesChannel.agentRating && { agentRating: formData.salesChannel.agentRating }),
          ...(formData.salesChannel.agentQualitySpecs && { qualitySpecification: formData.salesChannel.agentQualitySpecs })
        },
        packingDetails: {
          numberOfBags: formData.tokenization.numberOfBags,
          variety: formData.tokenization.varietyName,
          harvestDate: formData.tokenization.harvestDate,
          processingDate: formData.tokenization.processingDate,
          packingDate: formData.tokenization.packingDate
        }
      };

      // Call API (using the imported service)
      const { submitQualityCheck } = await import('./QualityCheckAPI');
      const response = await submitQualityCheck(payload);

      if (response.success && response.data) {
        setGeneratedToken(response.data.tokenId);
        setTokenGenerated(true);
        
        // Check if this is a mock response
        const isMockMode = response.message?.includes('Mock Mode');
        
        if (isMockMode) {
          toast.success(`Token ${response.data.tokenId} generated successfully! (Mock Mode)`, {
            description: 'Quality check submitted - Start API server for full functionality',
            duration: 5000
          });
          
          // Show additional info after delay
          setTimeout(() => {
            toast.info('Using Mock Mode', {
              description: 'Run: cd api && npm run simple-server',
              duration: 6000
            });
          }, 1000);
        } else {
          toast.success(`Token ${response.data.tokenId} generated successfully!`, {
            description: 'Quality check submitted and token created'
          });
        }
      }
    } catch (error: any) {
      console.error('Quality check submission error:', error);
      
      // Fallback: Generate token locally if API fails
      const fallbackToken = `TRD-${formData.commodityType.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`;
      setGeneratedToken(fallbackToken);
      setTokenGenerated(true);
      
      toast.warning('Token generated locally (API unavailable)', {
        description: `Token: ${fallbackToken}. Start API: cd api && npm run simple-server`,
        duration: 6000
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7FAFC] to-[#D9F2FF] p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[#003E6D] mb-2">
              Producer Quality Verification & Quality Check
            </h1>
            <p className="text-gray-600">
              Comprehensive quality tracking from harvest to market with token management
            </p>
          </div>
          
          {/* Compliance Score Badge */}
          <Card className="p-4 border-2 border-[#FFD700] bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${status.color} flex items-center justify-center`}>
                <status.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Compliance Score</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#003E6D]">{complianceScore}%</span>
                  <Badge variant="outline" className="border-[#FFD700] text-[#003E6D]">
                    {status.text}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress Steps */}
        <Card className="p-6 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.div
                  className={`flex flex-col items-center cursor-pointer ${
                    currentStep >= step.id ? 'opacity-100' : 'opacity-40'
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      currentStep >= step.id
                        ? 'bg-[#FFD700] text-[#003E6D]'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs text-center text-gray-600 max-w-[100px]">
                    {step.name}
                  </span>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#FFD700]"
                      initial={{ width: 0 }}
                      animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Card>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Commodity Selection */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#003E6D]" />
                  </div>
                  <div>
                    <h2 className="text-xl text-[#003E6D]">Commodity Selection</h2>
                    <p className="text-sm text-gray-600">Select your commodity type</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Searchable Commodity Combobox */}
                  <div>
                    <Label htmlFor="commodity-type">Commodity Type *</Label>
                    <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                      <PopoverTrigger asChild>
                        <Button
                          id="commodity-type"
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCombobox}
                          className="w-full h-12 justify-between hover:bg-white"
                        >
                          {currentCommodity ? (
                            <div className="flex items-center gap-2">
                              <currentCommodity.icon className={`w-4 h-4 ${currentCommodity.color}`} />
                              <span>{currentCommodity.label}</span>
                            </div>
                          ) : (
                            <span className="text-gray-500">Search or select commodity type...</span>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput 
                            placeholder="Search commodities..." 
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No commodity found.</CommandEmpty>
                            <CommandGroup>
                              {commodityOptions.map((option) => (
                                <CommandItem
                                  key={option.value}
                                  value={option.label}
                                  onSelect={() => {
                                    setFormData(prev => ({ ...prev, commodityType: option.value }));
                                    setOpenCombobox(false);
                                  }}
                                  className="cursor-pointer"
                                >
                                  <div className="flex items-center gap-2 flex-1">
                                    <div className={`w-8 h-8 rounded-full ${option.bgColor} flex items-center justify-center`}>
                                      <option.icon className={`w-4 h-4 ${option.color}`} />
                                    </div>
                                    <span>{option.label}</span>
                                  </div>
                                  <Check
                                    className={`ml-auto h-4 w-4 ${
                                      formData.commodityType === option.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    }`}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Search className="w-3 h-3" />
                      Type to search or choose from the exact crop type for quality verification
                    </p>
                  </div>

                  {/* Visual Grid Display */}
                  {!formData.commodityType && (
                    <>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white px-2 text-gray-500">Or select visually</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {commodityOptions.map((option) => (
                          <motion.button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, commodityType: option.value }));
                              setOpenCombobox(false);
                            }}
                            className={`p-4 rounded-lg border-2 transition-all hover:border-[#FFD700] hover:shadow-md ${
                              formData.commodityType === option.value
                                ? 'border-[#FFD700] bg-[#FFD700]/10'
                                : 'border-gray-200 bg-white'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className={`w-10 h-10 rounded-full ${option.bgColor} flex items-center justify-center mx-auto mb-2`}>
                              <option.icon className={`w-5 h-5 ${option.color}`} />
                            </div>
                            <p className="text-xs text-center text-gray-700">{option.label}</p>
                          </motion.button>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Selected Commodity Info Card */}
                  {formData.commodityType && currentCommodity && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-gradient-to-r from-[#FFD700]/10 to-[#FFD700]/5 rounded-lg border-2 border-[#FFD700]"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full ${currentCommodity.bgColor} flex items-center justify-center`}>
                          <currentCommodity.icon className={`w-6 h-6 ${currentCommodity.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Selected Commodity</p>
                          <p className="font-medium text-[#003E6D]">{currentCommodity.label}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, commodityType: '' }))}
                        >
                          Change
                        </Button>
                      </div>
                      
                      {isDryingMandatory && (
                        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded flex items-center gap-2">
                          <Info className="w-4 h-4 text-amber-600" />
                          <p className="text-xs text-amber-700">
                            Drying/processing step is mandatory for {currentCommodity.label}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Custom Commodity Input for "Other" */}
                  {formData.commodityType === 'other' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <Label htmlFor="custom-commodity">Specify Commodity *</Label>
                      <Input
                        id="custom-commodity"
                        placeholder="Enter commodity name (e.g., Exotic Mushrooms, Dragon Fruit)"
                        value={formData.customCommodity || ''}
                        onChange={(e) => 
                          setFormData(prev => ({ ...prev, customCommodity: e.target.value }))
                        }
                      />
                    </motion.div>
                  )}

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => setCurrentStep(2)}
                      className="bg-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/90"
                      disabled={!formData.commodityType || (formData.commodityType === 'other' && !formData.customCommodity)}
                    >
                      Next: Harvest & Grading
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Harvest & Initial Grading */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <ClipboardCheck className="w-5 h-5 text-[#003E6D]" />
                  </div>
                  <div>
                    <h2 className="text-xl text-[#003E6D]">Harvest & Initial Grading</h2>
                    <p className="text-sm text-gray-600">Record harvest method and initial grading</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Harvest Method */}
                  <div>
                    <Label className="mb-3 block">Harvest Method *</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
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
                        <Label htmlFor="labor" className="cursor-pointer">
                          Labor Harvesting
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="machinery"
                          checked={formData.harvestMethod.machinery}
                          onCheckedChange={(checked) =>
                            setFormData(prev => ({
                              ...prev,
                              harvestMethod: { ...prev.harvestMethod, machinery: checked === true }
                            }))
                          }
                        />
                        <Label htmlFor="machinery" className="cursor-pointer">
                          Machine Harvesting
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Dynamic Initial Grading Criteria based on Commodity */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="block">Initial Grading Criteria</Label>
                      {commodityConfig && (
                        <Badge variant="outline" className="text-xs">
                          {gradingCriteriaLabels.length} criteria
                        </Badge>
                      )}
                    </div>
                    
                    {commodityConfig ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Size Classification */}
                        {commodityConfig.gradingCriteria.size && (
                          <div>
                            <Label htmlFor="size">Size Classification</Label>
                            <Select
                              value={formData.initialGrading.size}
                              onValueChange={(value) =>
                                setFormData(prev => ({
                                  ...prev,
                                  initialGrading: { ...prev.initialGrading, size: value }
                                }))
                              }
                            >
                              <SelectTrigger id="size">
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                              <SelectContent>
                                {(sizeOptions.generic).map(option => (
                                  <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Color Classification */}
                        {commodityConfig.gradingCriteria.color && (
                          <div>
                            <Label htmlFor="color">Color Classification</Label>
                            <Select
                              value={formData.initialGrading.color}
                              onValueChange={(value) =>
                                setFormData(prev => ({
                                  ...prev,
                                  initialGrading: { ...prev.initialGrading, color: value }
                                }))
                              }
                            >
                              <SelectTrigger id="color">
                                <SelectValue placeholder="Select color" />
                              </SelectTrigger>
                              <SelectContent>
                                {(colorOptions.generic).map(option => (
                                  <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Aroma Quality (for Spices/Herbs) */}
                        {commodityConfig.gradingCriteria.aroma && (
                          <div>
                            <Label htmlFor="aroma">Aroma Quality</Label>
                            <Select
                              value={formData.initialGrading.other}
                              onValueChange={(value) =>
                                setFormData(prev => ({
                                  ...prev,
                                  initialGrading: { ...prev.initialGrading, other: value }
                                }))
                              }
                            >
                              <SelectTrigger id="aroma">
                                <SelectValue placeholder="Select aroma" />
                              </SelectTrigger>
                              <SelectContent>
                                {aromaOptions.map(option => (
                                  <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Moisture Content */}
                        {commodityConfig.gradingCriteria.moisture && (
                          <div>
                            <Label htmlFor="moisture">Moisture Content</Label>
                            <Select
                              value={formData.initialGrading.size}
                              onValueChange={(value) =>
                                setFormData(prev => ({
                                  ...prev,
                                  initialGrading: { ...prev.initialGrading, size: value }
                                }))
                              }
                            >
                              <SelectTrigger id="moisture">
                                <SelectValue placeholder="Select moisture level" />
                              </SelectTrigger>
                              <SelectContent>
                                {moistureOptions.map(option => (
                                  <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Firmness */}
                        {commodityConfig.gradingCriteria.firmness && (
                          <div>
                            <Label htmlFor="firmness">Firmness Level</Label>
                            <Select
                              value={formData.initialGrading.color}
                              onValueChange={(value) =>
                                setFormData(prev => ({
                                  ...prev,
                                  initialGrading: { ...prev.initialGrading, color: value }
                                }))
                              }
                            >
                              <SelectTrigger id="firmness">
                                <SelectValue placeholder="Select firmness" />
                              </SelectTrigger>
                              <SelectContent>
                                {firmnessOptions.map(option => (
                                  <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Texture */}
                        {commodityConfig.gradingCriteria.texture && (
                          <div>
                            <Label htmlFor="texture">Texture Assessment</Label>
                            <Select
                              value={formData.initialGrading.other}
                              onValueChange={(value) =>
                                setFormData(prev => ({
                                  ...prev,
                                  initialGrading: { ...prev.initialGrading, other: value }
                                }))
                              }
                            >
                              <SelectTrigger id="texture">
                                <SelectValue placeholder="Select texture" />
                              </SelectTrigger>
                              <SelectContent>
                                {textureOptions.map(option => (
                                  <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Custom Criteria for "Others" */}
                        {commodityConfig.gradingCriteria.custom && (
                          <div className="md:col-span-2">
                            <Label htmlFor="custom-criteria">Custom Grading Criteria *</Label>
                            <Textarea
                              id="custom-criteria"
                              placeholder="Describe quality parameters for this commodity..."
                              value={formData.initialGrading.other}
                              onChange={(e) =>
                                setFormData(prev => ({
                                  ...prev,
                                  initialGrading: { ...prev.initialGrading, other: e.target.value }
                                }))
                              }
                              rows={3}
                            />
                          </div>
                        )}

                        {/* Additional Notes (always shown) */}
                        {!commodityConfig.gradingCriteria.custom && (
                          <div className="md:col-span-2">
                            <Label htmlFor="other-criteria">Additional Notes (Optional)</Label>
                            <Textarea
                              id="other-criteria"
                              placeholder="Any additional quality observations..."
                              value={formData.initialGrading.other}
                              onChange={(e) =>
                                setFormData(prev => ({
                                  ...prev,
                                  initialGrading: { ...prev.initialGrading, other: e.target.value }
                                }))
                              }
                              rows={2}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600">
                          Select a commodity type to see specific grading criteria
                        </p>
                      </div>
                    )}
                    
                    {/* Quality Parameters Info */}
                    {commodityConfig && commodityConfig.qualityParameters && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-blue-900 mb-1">
                              Key Quality Parameters for {currentCommodity?.label}:
                            </p>
                            <ul className="text-xs text-blue-700 space-y-1">
                              {commodityConfig.qualityParameters.map((param, idx) => (
                                <li key={idx}>• {param}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(3)}
                      className="bg-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/90"
                      disabled={!formData.harvestMethod.labor && !formData.harvestMethod.machinery}
                    >
                      Next: Processing
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Processing & Secondary Grading */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[#003E6D]" />
                  </div>
                  <div>
                    <h2 className="text-xl text-[#003E6D]">Processing & Secondary Grading</h2>
                    <p className="text-sm text-gray-600">Record processing steps and re-grading</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Mandatory Drying Notice for Specific Commodities */}
                  {isDryingMandatory && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-amber-50 border-2 border-amber-400 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-900">Drying Required</p>
                          <p className="text-sm text-amber-700 mt-1">
                            {currentCommodity?.label} typically requires drying/processing as a mandatory step for quality preservation and market standards.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Processing Options */}
                  <div>
                    <Label className="mb-3 block">
                      Processing Steps {isDryingMandatory && <span className="text-amber-600">*</span>}
                    </Label>
                    <div className="space-y-3">
                      <div className={`flex items-center justify-between p-3 border-2 rounded-lg ${
                        isDryingMandatory ? 'border-amber-300 bg-amber-50/50' : 'border-gray-200'
                      }`}>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="dried"
                            checked={formData.processing.dried}
                            onCheckedChange={(checked) =>
                              setFormData(prev => ({
                                ...prev,
                                processing: { ...prev.processing, dried: checked === true }
                              }))
                            }
                          />
                          <div>
                            <Label htmlFor="dried" className="cursor-pointer">
                              Dried {isDryingMandatory && <span className="text-amber-600">*</span>}
                            </Label>
                            {isDryingMandatory && (
                              <p className="text-xs text-amber-600">Required for this commodity</p>
                            )}
                          </div>
                        </div>
                        {formData.processing.dried && (
                          <Badge variant="outline" className="border-green-500 text-green-700">
                            Applied
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="processed"
                            checked={formData.processing.processed}
                            onCheckedChange={(checked) =>
                              setFormData(prev => ({
                                ...prev,
                                processing: { ...prev.processing, processed: checked === true }
                              }))
                            }
                          />
                          <Label htmlFor="processed" className="cursor-pointer">
                            Processed (Cleaned, Sorted, Packaged)
                          </Label>
                        </div>
                        {formData.processing.processed && (
                          <Badge variant="outline" className="border-green-500 text-green-700">
                            Applied
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Re-grading */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Re-evaluation Post-Processing</Label>
                      <Switch
                        checked={formData.processing.reGraded}
                        onCheckedChange={(checked) =>
                          setFormData(prev => ({
                            ...prev,
                            processing: { ...prev.processing, reGraded: checked }
                          }))
                        }
                      />
                    </div>
                    
                    {formData.processing.reGraded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <div className="flex items-start gap-2">
                          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-900">Re-grading Enabled</p>
                            <p className="text-sm text-blue-700 mt-1">
                              Quality will be re-evaluated after processing. This may affect the final grade and pricing.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => {
                        if (isDryingMandatory && !formData.processing.dried) {
                          toast.error('Drying is required for ' + currentCommodity?.label);
                          return;
                        }
                        setCurrentStep(4);
                      }}
                      className="bg-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/90"
                      disabled={isDryingMandatory && !formData.processing.dried}
                    >
                      Next: Quality Verification
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Quality Check Tiers */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#003E6D]" />
                  </div>
                  <div>
                    <h2 className="text-xl text-[#003E6D]">Quality Check Tiers</h2>
                    <p className="text-sm text-gray-600">Choose verification method</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Tier 1: Self-Assessment */}
                  <div className="p-4 border-2 border-[#FFD700]/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">1</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#003E6D]">Tier 1: Self-Assessment</h3>
                          <p className="text-xs text-gray-600">Producer's own quality evaluation</p>
                        </div>
                      </div>
                      <Checkbox
                        id="self-assessment"
                        checked={formData.qualityTier.selfAssessment.completed}
                        onCheckedChange={(checked) =>
                          setFormData(prev => ({
                            ...prev,
                            qualityTier: { 
                              ...prev.qualityTier, 
                              selfAssessment: {
                                ...prev.qualityTier.selfAssessment,
                                completed: checked === true
                              }
                            }
                          }))
                        }
                      />
                    </div>
                    {formData.qualityTier.selfAssessment.completed && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 pt-3 border-t space-y-3"
                      >
                        <Badge variant="outline" className="border-blue-500 text-blue-700">
                          ✓ Self-assessment completed
                        </Badge>
                        <div>
                          <Label htmlFor="self-comments">Assessment Comments</Label>
                          <Textarea
                            id="self-comments"
                            placeholder="Describe your quality assessment..."
                            value={formData.qualityTier.selfAssessment.comments}
                            onChange={(e) =>
                              setFormData(prev => ({
                                ...prev,
                                qualityTier: {
                                  ...prev.qualityTier,
                                  selfAssessment: {
                                    ...prev.qualityTier.selfAssessment,
                                    comments: e.target.value
                                  }
                                }
                              }))
                            }
                            rows={3}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Tier 2: External Assessment */}
                  <div className="p-4 border-2 border-[#FFD700] rounded-lg bg-gradient-to-r from-white to-[#FFD700]/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center">
                        <span className="text-sm font-bold text-[#003E6D]">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#003E6D]">Tier 2: External Assessment</h3>
                        <p className="text-xs text-gray-600">Independent quality verification</p>
                      </div>
                    </div>

                    <Tabs defaultValue="third-party" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="third-party">Third-Party</TabsTrigger>
                        <TabsTrigger value="government">Government</TabsTrigger>
                        <TabsTrigger value="lab">Lab Report</TabsTrigger>
                        <TabsTrigger value="buyer">Buyer</TabsTrigger>
                      </TabsList>

                      {/* Third-Party Verifier */}
                      <TabsContent value="third-party" className="space-y-4">
                        <div>
                          <Label htmlFor="verifier">Select Trusted Verifier</Label>
                          <Select
                            value={formData.qualityTier.externalAssessment.verifierName}
                            onValueChange={(value) => {
                              setFormData(prev => ({
                                ...prev,
                                qualityTier: { 
                                  ...prev.qualityTier, 
                                  externalAssessment: {
                                    ...prev.qualityTier.externalAssessment,
                                    type: '3rd Party Verifier',
                                    verifierName: value
                                  }
                                }
                              }));
                            }}
                          >
                            <SelectTrigger id="verifier">
                              <SelectValue placeholder="Choose verifier" />
                            </SelectTrigger>
                            <SelectContent>
                              {verifiers.map(v => (
                                <SelectItem key={v.value} value={v.value}>
                                  <div className="flex items-center gap-2">
                                    <Award className="w-4 h-4" />
                                    {v.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Verification Report
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Upload Verification Report</DialogTitle>
                              <DialogDescription>
                                Upload the verification report from your third-party verifier
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => handleFileUpload(e, 'Third-Party Verification')}
                              />
                              <p className="text-xs text-gray-500">
                                Accepted formats: PDF, JPG, PNG (Max 5MB)
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TabsContent>

                      {/* Government Inspector */}
                      <TabsContent value="government" className="space-y-4">
                        <div>
                          <Label htmlFor="govt-inspector">Government Inspector</Label>
                          <Select
                            onValueChange={(value) => {
                              setFormData(prev => ({
                                ...prev,
                                qualityTier: { 
                                  ...prev.qualityTier, 
                                  externalAssessment: {
                                    ...prev.qualityTier.externalAssessment,
                                    type: 'Government Appointee',
                                    verifierName: value
                                  }
                                }
                              }));
                            }}
                          >
                            <SelectTrigger id="govt-inspector">
                              <SelectValue placeholder="Select government inspector" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="apeda-inspector-1">APEDA Inspector - District Office</SelectItem>
                              <SelectItem value="fssai-inspector-1">FSSAI Inspector - Regional Office</SelectItem>
                              <SelectItem value="agmark-inspector-1">AgMark Inspector</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Government Certificate
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Upload Government Certificate</DialogTitle>
                              <DialogDescription>
                                Upload the quality certificate from government inspector
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => handleFileUpload(e, 'Government Certificate')}
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TabsContent>

                      {/* Lab Report */}
                      <TabsContent value="lab" className="space-y-4">
                        <div>
                          <Label htmlFor="lab">Accredited Laboratory</Label>
                          <Select
                            onValueChange={(value) => {
                              setFormData(prev => ({
                                ...prev,
                                qualityTier: { 
                                  ...prev.qualityTier, 
                                  externalAssessment: {
                                    ...prev.qualityTier.externalAssessment,
                                    type: 'Lab Report',
                                    verifierName: value
                                  }
                                }
                              }));
                            }}
                          >
                            <SelectTrigger id="lab">
                              <SelectValue placeholder="Select laboratory" />
                            </SelectTrigger>
                            <SelectContent>
                              {labs.map(lab => (
                                <SelectItem key={lab.value} value={lab.value}>
                                  {lab.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              <FileText className="w-4 h-4 mr-2" />
                              Upload Lab Report
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Upload Laboratory Report</DialogTitle>
                              <DialogDescription>
                                Upload the quality testing report from accredited lab
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => handleFileUpload(e, 'Lab Report')}
                              />
                              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                                <p className="text-xs text-blue-700">
                                  💡 Lab reports should include: Pesticide residue, Heavy metals, Microbiological tests, Nutritional analysis
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TabsContent>

                      {/* Buyer Classification */}
                      <TabsContent value="buyer" className="space-y-4">
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <div className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-amber-900">Confidential Classification</p>
                              <p className="text-sm text-amber-700 mt-1">
                                Buyer's quality classification will be shared after successful sale
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              qualityTier: { 
                                ...prev.qualityTier, 
                                externalAssessment: {
                                  ...prev.qualityTier.externalAssessment,
                                  type: 'Buyer Classification'
                                }
                              }
                            }));
                            toast.success('Buyer classification enabled');
                          }}
                        >
                          Enable Buyer Classification
                        </Button>
                      </TabsContent>
                    </Tabs>

                    {/* Rating & Comments */}
                    {formData.qualityTier.externalAssessment.type !== 'none' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 pt-4 border-t space-y-3"
                      >
                        <div>
                          <Label>Quality Rating</Label>
                          <div className="flex items-center gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-6 h-6 cursor-pointer ${
                                  (formData.qualityTier.externalAssessment.rating || 0) >= star
                                    ? 'fill-[#FFD700] text-[#FFD700]'
                                    : 'text-gray-300'
                                }`}
                                onClick={() =>
                                  setFormData(prev => ({
                                    ...prev,
                                    qualityTier: { 
                                      ...prev.qualityTier, 
                                      externalAssessment: {
                                        ...prev.qualityTier.externalAssessment,
                                        rating: star
                                      }
                                    }
                                  }))
                                }
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                              {formData.qualityTier.externalAssessment.rating || 0}/5
                            </span>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="comments">Comments & Specifications</Label>
                          <Textarea
                            id="comments"
                            placeholder="Additional quality notes, specifications, or observations..."
                            value={formData.qualityTier.externalAssessment.comments || ''}
                            onChange={(e) =>
                              setFormData(prev => ({
                                ...prev,
                                qualityTier: { 
                                  ...prev.qualityTier,
                                  externalAssessment: {
                                    ...prev.qualityTier.externalAssessment,
                                    comments: e.target.value
                                  }
                                }
                              }))
                            }
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(3)}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(5)}
                      className="bg-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/90"
                      disabled={!formData.qualityTier.selfAssessment.completed && formData.qualityTier.externalAssessment.type === 'none'}
                    >
                      Next: Sales Listing
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 5: Sales & Listing Options */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#003E6D]" />
                  </div>
                  <div>
                    <h2 className="text-xl text-[#003E6D]">Sales & Listing Options</h2>
                    <p className="text-sm text-gray-600">Choose your sales channels</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Sales Channels */}
                  <div className="space-y-4">
                    {/* At Cultivation */}
                    <div className="p-4 border-2 rounded-lg hover:border-[#FFD700] transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id="at-cultivation"
                            checked={formData.salesChannel.atCultivation}
                            onCheckedChange={(checked) =>
                              setFormData(prev => ({
                                ...prev,
                                salesChannel: { ...prev.salesChannel, atCultivation: checked === true }
                              }))
                            }
                          />
                          <div>
                            <Label htmlFor="at-cultivation" className="cursor-pointer font-semibold">
                              Listing at Place of Cultivation
                            </Label>
                            <p className="text-xs text-gray-600">Direct sale from farm</p>
                          </div>
                        </div>
                        {formData.salesChannel.atCultivation && (
                          <Badge className="bg-green-100 text-green-700 border-green-300">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Commission Agent */}
                    <div className="p-4 border-2 rounded-lg hover:border-[#FFD700] transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id="commission-agent"
                            checked={formData.salesChannel.commissionAgent}
                            onCheckedChange={(checked) =>
                              setFormData(prev => ({
                                ...prev,
                                salesChannel: { ...prev.salesChannel, commissionAgent: checked === true }
                              }))
                            }
                          />
                          <div>
                            <Label htmlFor="commission-agent" className="cursor-pointer font-semibold">
                              Listing through Commission Agent
                            </Label>
                            <p className="text-xs text-gray-600">Agent-assisted sale</p>
                          </div>
                        </div>
                        {formData.salesChannel.commissionAgent && (
                          <Badge className="bg-green-100 text-green-700 border-green-300">
                            Active
                          </Badge>
                        )}
                      </div>

                      {formData.salesChannel.commissionAgent && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 space-y-3 pl-7"
                        >
                          <div>
                            <Label>Agent Rating</Label>
                            <div className="flex items-center gap-2 mt-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-5 h-5 cursor-pointer ${
                                    (formData.salesChannel.agentRating || 0) >= star
                                      ? 'fill-[#FFD700] text-[#FFD700]'
                                      : 'text-gray-300'
                                  }`}
                                  onClick={() =>
                                    setFormData(prev => ({
                                      ...prev,
                                      salesChannel: { ...prev.salesChannel, agentRating: star }
                                    }))
                                  }
                                />
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="agent-specs">Quality Specifications from Agent</Label>
                            <Textarea
                              id="agent-specs"
                              placeholder="Agent's quality requirements and specifications..."
                              value={formData.salesChannel.agentQualitySpecs || ''}
                              onChange={(e) =>
                                setFormData(prev => ({
                                  ...prev,
                                  salesChannel: { ...prev.salesChannel, agentQualitySpecs: e.target.value }
                                }))
                              }
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Market Yard */}
                    <div className="p-4 border-2 rounded-lg bg-gradient-to-r from-white to-blue-50">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-[#003E6D]">Market Yard Ratings</h3>
                          <p className="text-xs text-gray-600">Buyer ratings from market yard</p>
                        </div>
                      </div>
                      <div>
                        <Label>Average Buyer Rating</Label>
                        <div className="flex items-center gap-3 mt-2">
                          <Input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            value={formData.salesChannel.marketYardRating || ''}
                            onChange={(e) =>
                              setFormData(prev => ({
                                ...prev,
                                salesChannel: { ...prev.salesChannel, marketYardRating: parseFloat(e.target.value) }
                              }))
                            }
                            className="max-w-[120px]"
                          />
                          <span className="text-sm text-gray-600">/ 5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(4)}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setCurrentStep(6)}
                      className="bg-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/90"
                      disabled={!formData.salesChannel.atCultivation && !formData.salesChannel.commissionAgent}
                    >
                      Next: Tokenization
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 6: Tokenization & Packaging */}
          {currentStep === 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center">
                    <Hash className="w-5 h-5 text-[#003E6D]" />
                  </div>
                  <div>
                    <h2 className="text-xl text-[#003E6D]">Tokenization & Packaging Details</h2>
                    <p className="text-sm text-gray-600">Generate unique tracking token</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="num-bags">Number of Bags/Units *</Label>
                      <Input
                        id="num-bags"
                        type="number"
                        min="1"
                        placeholder="e.g., 50"
                        value={formData.tokenization.numberOfBags || ''}
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            tokenization: { ...prev.tokenization, numberOfBags: parseInt(e.target.value) || 0 }
                          }))
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="variety">Variety Name *</Label>
                      <Input
                        id="variety"
                        placeholder="e.g., Guntur Sannam Chili"
                        value={formData.tokenization.varietyName}
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            tokenization: { ...prev.tokenization, varietyName: e.target.value }
                          }))
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="quality-grade">Quality Grade *</Label>
                      <Select
                        value={formData.tokenization.qualityGrade}
                        onValueChange={(value) =>
                          setFormData(prev => ({
                            ...prev,
                            tokenization: { ...prev.tokenization, qualityGrade: value }
                          }))
                        }
                      >
                        <SelectTrigger id="quality-grade">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {commodityConfig && commodityConfig.specificGrades ? (
                            // Use commodity-specific grades
                            commodityConfig.specificGrades.map((grade, idx) => (
                              <SelectItem key={grade} value={grade.toLowerCase().replace(/\s+/g, '-')}>
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${
                                    idx === 0 ? 'bg-green-500' : 
                                    idx === 1 ? 'bg-green-400' : 
                                    idx === 2 ? 'bg-yellow-400' : 
                                    'bg-orange-400'
                                  }`} />
                                  {grade}
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            // Default grades
                            qualityGrades.map(grade => (
                              <SelectItem key={grade.value} value={grade.value}>
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${grade.color}`} />
                                  {grade.label}
                                </div>
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {commodityConfig && commodityConfig.specificGrades && (
                        <p className="text-xs text-gray-500 mt-1">
                          Grades specific to {currentCommodity?.label}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="harvest-date">Harvest Date</Label>
                      <Input
                        id="harvest-date"
                        type="date"
                        value={formData.tokenization.harvestDate}
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            tokenization: { ...prev.tokenization, harvestDate: e.target.value }
                          }))
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="processing-date">Processing Date</Label>
                      <Input
                        id="processing-date"
                        type="date"
                        value={formData.tokenization.processingDate}
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            tokenization: { ...prev.tokenization, processingDate: e.target.value }
                          }))
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="packing-date">Packing Date</Label>
                      <Input
                        id="packing-date"
                        type="date"
                        value={formData.tokenization.packingDate}
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            tokenization: { ...prev.tokenization, packingDate: e.target.value }
                          }))
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Token Generation */}
                  <div className="p-6 bg-gradient-to-r from-[#FFD700]/10 to-[#FFD700]/5 rounded-lg border-2 border-[#FFD700]">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-[#003E6D]">Generate Unique Token</h3>
                        <p className="text-sm text-gray-600">Create tracking ID for this batch</p>
                      </div>
                      <Package className="w-8 h-8 text-[#FFD700]" />
                    </div>

                    {!tokenGenerated ? (
                      <Button
                        onClick={handleGenerateToken}
                        className="w-full bg-[#FFD700] text-[#003E6D] hover:bg-[#FFD700]/90"
                        size="lg"
                      >
                        <Hash className="w-5 h-5 mr-2" />
                        Generate Token
                      </Button>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-4"
                      >
                        <div className="p-4 bg-white rounded-lg border-2 border-[#FFD700]">
                          <Label className="text-xs text-gray-600">Token ID</Label>
                          <div className="flex items-center justify-between mt-1">
                            <code className="text-lg font-mono font-bold text-[#003E6D]">
                              {generatedToken}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(generatedToken, {
                                successMessage: 'Token copied to clipboard!',
                                fallbackMessage: `Token: ${generatedToken}`
                              })}
                            >
                              Copy
                            </Button>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Download QR
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <FileText className="w-4 h-4 mr-2" />
                            Print Label
                          </Button>
                        </div>

                        <div className="p-3 bg-green-50 rounded border border-green-200">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <p className="text-sm text-green-800">
                              Token generated and logged in the system
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(5)}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => {
                        toast.success('Quality check workflow completed!', {
                          description: 'All data has been saved successfully'
                        });
                      }}
                      className="bg-green-600 text-white hover:bg-green-700"
                      disabled={!tokenGenerated}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Complete Workflow
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Uploaded Documents */}
          <Card className="p-4 bg-white/90 backdrop-blur-sm">
            <h3 className="font-semibold text-[#003E6D] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Uploaded Documents ({formData.documents.length})
            </h3>
            {formData.documents.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No documents uploaded yet
              </p>
            ) : (
              <div className="space-y-2">
                {formData.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg border flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500">{doc.type}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Feedback History */}
          <Card className="p-4 bg-white/90 backdrop-blur-sm">
            <h3 className="font-semibold text-[#003E6D] mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Feedback & Quality Loop
            </h3>
            <div className="space-y-3">
              {feedbackHistory.map((feedback, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#003E6D]">
                      {feedback.stage}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                      <span className="text-sm font-semibold">{feedback.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{feedback.comment}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{feedback.source}</span>
                    <span>{feedback.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Review Feedback
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                <Award className="w-4 h-4 mr-2" />
                Take Corrective Measures
              </Button>
            </div>
          </Card>

          {/* Progress Tracker */}
          <Card className="p-4 bg-gradient-to-br from-[#FFD700]/10 to-white backdrop-blur-sm border-2 border-[#FFD700]">
            <h3 className="font-semibold text-[#003E6D] mb-4">Overall Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Workflow Completion</span>
                  <span className="text-sm font-semibold text-[#003E6D]">
                    {Math.round((currentStep / steps.length) * 100)}%
                  </span>
                </div>
                <Progress value={(currentStep / steps.length) * 100} className="h-2" />
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Quality Score</span>
                  <span className="text-sm font-semibold text-[#003E6D]">
                    {complianceScore}%
                  </span>
                </div>
                <Progress value={complianceScore} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QualityCheckWorkflow;
