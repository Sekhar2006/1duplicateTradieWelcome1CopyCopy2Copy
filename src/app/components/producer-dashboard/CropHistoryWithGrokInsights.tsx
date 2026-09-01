import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  History,
  Sprout,
  Droplets,
  Leaf,
  Bug,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Shield,
  Award,
  Calendar,
  MapPin,
  Thermometer,
  CloudRain,
  Sun,
  Eye,
  Download,
  Share2,
  QrCode,
  Sparkles,
  BarChart3,
  Clock,
  User,
  FileText,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface Activity {
  id: string;
  type: string;
  date: Date;
  description: string;
  details?: any;
  media?: string[];
  grokAnalysis?: {
    rating: 'excellent' | 'good' | 'fair' | 'poor';
    notes: string[];
  };
}

interface CropHistory {
  cropId: string;
  cropName: string;
  variety: string;
  producer: {
    name: string;
    id: string;
    location: string;
    rating: number;
  };
  landDetails: {
    area: number;
    soilType: string;
    waterSource: string;
    location: string;
  };
  timeline: {
    sowingDate: Date;
    harvestDate: Date;
    duration: number;
  };
  activities: Activity[];
  qualityMetrics: {
    overallRating: number;
    organicScore: number;
    sustainabilityScore: number;
    tracabilityScore: number;
  };
  grokInsights: {
    overallAssessment: string;
    strengths: string[];
    concerns: string[];
    recommendations: string[];
    trustScore: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
  certifications?: string[];
  tokenId: string;
}

interface CropHistoryWithGrokInsightsProps {
  history: CropHistory;
  viewMode?: 'full' | 'summary';
  onClose?: () => void;
}

export const CropHistoryWithGrokInsights: React.FC<CropHistoryWithGrokInsightsProps> = ({
  history,
  viewMode = 'full',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedActivities, setExpandedActivities] = useState<Set<string>>(new Set());

  const toggleActivity = (activityId: string) => {
    const newExpanded = new Set(expandedActivities);
    if (newExpanded.has(activityId)) {
      newExpanded.delete(activityId);
    } else {
      newExpanded.add(activityId);
    }
    setExpandedActivities(newExpanded);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#22C55E';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return '#22C55E';
      case 'good': return '#3B82F6';
      case 'fair': return '#F59E0B';
      case 'poor': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sowing': return <Sprout className="w-5 h-5" />;
      case 'irrigation': return <Droplets className="w-5 h-5" />;
      case 'fertilizer': return <Leaf className="w-5 h-5" />;
      case 'pesticide': return <Bug className="w-5 h-5" />;
      case 'harvesting': return <Package className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-2" style={{ color: '#003E6D', fontFamily: 'Playfair Display, serif' }}>
                Crop History & AI Insights
              </h1>
              <p className="text-gray-600">
                Complete journey from seed to harvest with AI-verified quality
              </p>
            </div>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>

        {/* Grok AI Trust Score - Prominent Display */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: getRiskColor(history.grokInsights.riskLevel) + '20' }}
              >
                <Sparkles className="w-10 h-10" style={{ color: getRiskColor(history.grokInsights.riskLevel) }} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 style={{ color: '#003E6D', fontFamily: 'Montserrat, sans-serif' }}>
                  Grok AI Trust Score
                </h2>
                <Badge
                  className="text-white"
                  style={{ backgroundColor: getRiskColor(history.grokInsights.riskLevel) }}
                >
                  {history.grokInsights.riskLevel.toUpperCase()} RISK
                </Badge>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl" style={{ color: getRiskColor(history.grokInsights.riskLevel) }}>
                      {history.grokInsights.trustScore}%
                    </span>
                    <span className="text-sm text-gray-600">Trust Score</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${history.grokInsights.trustScore}%`,
                        backgroundColor: getRiskColor(history.grokInsights.riskLevel)
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 italic">
                "{history.grokInsights.overallAssessment}"
              </p>
            </div>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download Report</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View QR Code</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </Card>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Activity Timeline</TabsTrigger>
            <TabsTrigger value="insights">Grok Insights</TabsTrigger>
            <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            
            {/* Crop & Producer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="mb-4 flex items-center gap-2" style={{ color: '#003E6D', fontFamily: 'Montserrat, sans-serif' }}>
                  <Sprout className="w-5 h-5" />
                  Crop Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Crop Name</p>
                    <p style={{ color: '#003E6D' }}>{history.cropName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Variety</p>
                    <p style={{ color: '#003E6D' }}>{history.variety}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Token ID</p>
                    <p className="font-mono text-sm" style={{ color: '#003E6D' }}>{history.tokenId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Land Area</p>
                    <p style={{ color: '#003E6D' }}>{history.landDetails.area} acres</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Soil Type</p>
                    <p style={{ color: '#003E6D' }}>{history.landDetails.soilType}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white shadow-lg">
                <h3 className="mb-4 flex items-center gap-2" style={{ color: '#003E6D', fontFamily: 'Montserrat, sans-serif' }}>
                  <User className="w-5 h-5" />
                  Producer Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Producer Name</p>
                    <p style={{ color: '#003E6D' }}>{history.producer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Producer ID</p>
                    <p className="font-mono text-sm" style={{ color: '#003E6D' }}>{history.producer.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span style={{ color: '#003E6D' }}>{history.producer.location}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Producer Rating</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Award
                            key={i}
                            className={`w-4 h-4 ${i < history.producer.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span style={{ color: '#003E6D' }}>{history.producer.rating}/5</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Timeline Summary */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="mb-4 flex items-center gap-2" style={{ color: '#003E6D', fontFamily: 'Montserrat, sans-serif' }}>
                <Calendar className="w-5 h-5" />
                Cultivation Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Sowing Date</p>
                  <p style={{ color: '#003E6D' }}>{history.timeline.sowingDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Harvest Date</p>
                  <p style={{ color: '#003E6D' }}>{history.timeline.harvestDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Duration</p>
                  <p style={{ color: '#003E6D' }}>{history.timeline.duration} days</p>
                </div>
              </div>
            </Card>

            {/* Certifications */}
            {history.certifications && history.certifications.length > 0 && (
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="mb-4 flex items-center gap-2" style={{ color: '#003E6D', fontFamily: 'Montserrat, sans-serif' }}>
                  <Shield className="w-5 h-5" />
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {history.certifications.map((cert) => (
                    <Badge key={cert} className="bg-blue-100 text-blue-800 px-3 py-1">
                      <Shield className="w-3 h-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Activity Timeline Tab */}
          <TabsContent value="timeline" className="space-y-4">
            {history.activities.map((activity, index) => {
              const isExpanded = expandedActivities.has(activity.id);
              const activityIcon = getActivityIcon(activity.type);
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: '#3B82F620' }}
                        >
                          {activityIcon}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 style={{ color: '#003E6D', fontFamily: 'Montserrat, sans-serif' }}>
                              {activity.type}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              {activity.date.toLocaleDateString()} at {activity.date.toLocaleTimeString()}
                            </div>
                          </div>
                          {activity.grokAnalysis && (
                            <Badge
                              className="text-white"
                              style={{ backgroundColor: getRatingColor(activity.grokAnalysis.rating) }}
                            >
                              {activity.grokAnalysis.rating.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">{activity.description}</p>
                        
                        {activity.grokAnalysis && activity.grokAnalysis.notes.length > 0 && (
                          <div className="bg-purple-50 rounded-lg p-3 mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="w-4 h-4 text-purple-600" />
                              <span className="text-sm text-purple-900">Grok AI Analysis</span>
                            </div>
                            <ul className="space-y-1 text-sm text-gray-700">
                              {activity.grokAnalysis.notes.map((note, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-purple-600">•</span>
                                  <span>{note}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {activity.media && activity.media.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleActivity(activity.id)}
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="w-4 h-4 mr-2" />
                                Hide Media
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                View Media ({activity.media.length})
                              </>
                            )}
                          </Button>
                        )}
                        
                        <AnimatePresence>
                          {isExpanded && activity.media && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 grid grid-cols-3 gap-2"
                            >
                              {activity.media.map((mediaUrl, idx) => (
                                <div key={idx} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                                  <img
                                    src={mediaUrl}
                                    alt={`${activity.type} media ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </TabsContent>

          {/* Grok Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            
            {/* Strengths */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="mb-4 flex items-center gap-2" style={{ color: '#22C55E', fontFamily: 'Montserrat, sans-serif' }}>
                <CheckCircle className="w-5 h-5" />
                Strengths
              </h3>
              <ul className="space-y-2">
                {history.grokInsights.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Concerns */}
            {history.grokInsights.concerns.length > 0 && (
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="mb-4 flex items-center gap-2" style={{ color: '#F59E0B', fontFamily: 'Montserrat, sans-serif' }}>
                  <AlertCircle className="w-5 h-5" />
                  Concerns
                </h3>
                <ul className="space-y-2">
                  {history.grokInsights.concerns.map((concern, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{concern}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Recommendations */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="mb-4 flex items-center gap-2" style={{ color: '#3B82F6', fontFamily: 'Montserrat, sans-serif' }}>
                <TrendingUp className="w-5 h-5" />
                Recommendations
              </h3>
              <ul className="space-y-2">
                {history.grokInsights.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>

          {/* Quality Metrics Tab */}
          <TabsContent value="quality" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(history.qualityMetrics).map(([key, value]) => {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                const color = value >= 80 ? '#22C55E' : value >= 60 ? '#3B82F6' : value >= 40 ? '#F59E0B' : '#EF4444';
                
                return (
                  <Card key={key} className="p-6 bg-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 style={{ color: '#003E6D', fontFamily: 'Montserrat, sans-serif' }}>
                        {label}
                      </h4>
                      <span className="text-2xl" style={{ color }}>
                        {value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{ width: `${value}%`, backgroundColor: color }}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Mock data generator for testing
export const generateMockCropHistory = (): CropHistory => {
  return {
    cropId: 'CROP-001',
    cropName: 'Wheat',
    variety: 'PBW 343',
    producer: {
      name: 'Rajesh Kumar',
      id: 'PROD-001',
      location: 'Ludhiana, Punjab',
      rating: 5
    },
    landDetails: {
      area: 10,
      soilType: 'Alluvial Soil',
      waterSource: 'Canal Irrigation',
      location: 'Village Raikot, Punjab'
    },
    timeline: {
      sowingDate: new Date('2024-11-01'),
      harvestDate: new Date('2025-04-15'),
      duration: 165
    },
    activities: [
      {
        id: 'ACT-001',
        type: 'Sowing',
        date: new Date('2024-11-01'),
        description: 'Seeds sown using drill method with government certified seeds',
        details: { method: 'drill', seedRate: '100 kg/acre' },
        media: ['https://via.placeholder.com/400x300?text=Sowing+1', 'https://via.placeholder.com/400x300?text=Sowing+2'],
        grokAnalysis: {
          rating: 'excellent',
          notes: ['Optimal sowing date for region', 'Certified seeds used', 'Good soil moisture at sowing']
        }
      },
      {
        id: 'ACT-002',
        type: 'Irrigation',
        date: new Date('2024-11-15'),
        description: 'First irrigation applied - 50mm water depth',
        details: { volume: 50, method: 'flood' },
        grokAnalysis: {
          rating: 'good',
          notes: ['Appropriate timing', 'Good water management']
        }
      },
      {
        id: 'ACT-003',
        type: 'Fertilizer',
        date: new Date('2024-12-01'),
        description: 'NPK fertilizer applied - 150kg/acre',
        details: { type: 'NPK', dosage: '150 kg/acre', npk: '12-32-16' },
        media: ['https://via.placeholder.com/400x300?text=Fertilizer'],
        grokAnalysis: {
          rating: 'excellent',
          notes: ['Balanced NPK ratio', 'Applied at correct growth stage', 'Dosage appropriate for soil type']
        }
      },
      {
        id: 'ACT-004',
        type: 'Pesticide',
        date: new Date('2025-01-20'),
        description: 'Organic pesticide spray for aphid control',
        details: { type: 'organic', chemical: 'Neem oil' },
        grokAnalysis: {
          rating: 'excellent',
          notes: ['Organic method used', 'Early pest detection', 'Safe pre-harvest interval maintained']
        }
      },
      {
        id: 'ACT-005',
        type: 'Harvesting',
        date: new Date('2025-04-15'),
        description: 'Crop harvested using combine harvester',
        details: { method: 'combine', yield: '45 quintals/acre' },
        media: ['https://via.placeholder.com/400x300?text=Harvest+1', 'https://via.placeholder.com/400x300?text=Harvest+2', 'https://via.placeholder.com/400x300?text=Harvest+3'],
        grokAnalysis: {
          rating: 'excellent',
          notes: ['Optimal harvest timing', 'Excellent yield achieved', 'Good grain quality observed']
        }
      }
    ],
    qualityMetrics: {
      overallRating: 92,
      organicScore: 88,
      sustainabilityScore: 90,
      tracabilityScore: 95
    },
    grokInsights: {
      overallAssessment: 'Excellent crop management with sustainable practices. High traceability and quality standards maintained throughout the cultivation cycle.',
      strengths: [
        'Used certified seeds from authorized source',
        'Followed scientific crop management practices',
        'Maintained detailed activity logs with photo documentation',
        'Used organic pest control methods',
        'Optimal water and nutrient management',
        'Timely interventions at critical growth stages',
        'Achieved above-average yield for the region'
      ],
      concerns: [],
      recommendations: [
        'Continue using organic pest control methods',
        'Consider soil testing for next season planning',
        'Explore crop rotation for sustained soil health'
      ],
      trustScore: 94,
      riskLevel: 'low'
    },
    certifications: ['FSSAI', 'Organic India', 'NPOP', 'Fair Trade'],
    tokenId: 'TKN-CROP-001-1729584000000'
  };
};
