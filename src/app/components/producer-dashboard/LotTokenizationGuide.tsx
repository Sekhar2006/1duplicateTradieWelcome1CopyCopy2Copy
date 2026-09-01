import React from 'react';
import { motion } from 'motion/react';
import {
  Play,
  CheckCircle,
  Package,
  Sparkles,
  Shield,
  Eye,
  ArrowRight,
  BookOpen,
  Video,
  FileText,
  Zap
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface LotTokenizationGuideProps {
  onStartWorkflow?: () => void;
  onViewDiagram?: () => void;
}

const LotTokenizationGuide: React.FC<LotTokenizationGuideProps> = ({
  onStartWorkflow,
  onViewDiagram
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full mb-4"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm">AI-Powered Lot Creation & Tokenization</span>
          </motion.div>
          
          <h1 className="text-[#003E6D] mb-3">Complete Lot Tokenization System</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Transform your commodity lots into blockchain-verified tokens with AI-powered quality insights,
            complete provenance tracking, and buyer transparency
          </p>

          {/* Quick Actions */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={onStartWorkflow}
              className="bg-[#003E6D] text-white hover:bg-[#003E6D]/90"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Workflow
            </Button>
            <Button
              onClick={onViewDiagram}
              variant="outline"
              className="border-[#003E6D] text-[#003E6D]"
              size="lg"
            >
              <Eye className="w-5 h-5 mr-2" />
              View Flow Diagram
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6 bg-white">
              <h2 className="text-[#003E6D] mb-4">System Overview</h2>
              <p className="text-gray-700 mb-6">
                The Lot Creation & Tokenization system is a comprehensive 4-step workflow that enables producers 
                to create quality-graded commodity lots, generate blockchain tokens, enrich data with certificates, 
                and provide buyers with complete transparency through AI-powered insights.
              </p>

              {/* 4 Step Process */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300">
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center mb-3">
                      <Package className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm mb-2">Step 1: Create Lots</h3>
                    <p className="text-xs text-gray-600">
                      Select batch, assign quality grades (A+ to C), and create multiple lots
                    </p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300">
                    <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center mb-3">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm mb-2">Step 2: Tokenization</h3>
                    <p className="text-xs text-gray-600">
                      Generate unique blockchain tokens with global batch ID and individual token IDs
                    </p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300">
                    <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center mb-3">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm mb-2">Step 3: Data Enrichment</h3>
                    <p className="text-xs text-gray-600">
                      Upload certificates, add verifications, and build cultivation history timeline
                    </p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300">
                    <div className="w-12 h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center mb-3">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm mb-2">Step 4: Buyer View</h3>
                    <p className="text-xs text-gray-600">
                      Preview buyer experience with AI insights, history, and verified certificates
                    </p>
                  </Card>
                </motion.div>
              </div>
            </Card>

            {/* Flow Process */}
            <Card className="p-6 bg-white">
              <h3 className="text-[#003E6D] mb-4">Workflow Process</h3>
              <div className="space-y-4">
                {[
                  { step: 'Grading Complete', desc: 'Quality assessment completed' },
                  { step: 'Create Lots', desc: 'Input lot qualities (A, B, C grades), create multiple lots per batch' },
                  { step: 'Display Lots List', desc: 'Show lots with assigned qualities, allow edit or add' },
                  { step: 'Initiate Tokenization', desc: 'Generate unique batch ID + individual token IDs per lot' },
                  { step: 'Token Data Enrichment', desc: 'Add/update info by verifiers and producers at various stages' },
                  { step: 'Token/NFT Verification', desc: 'Buyer scans and verifies token authenticity' },
                  { step: 'Buyer Views Details', desc: 'Show cultivation history, certificates, AI insights by Grok' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#003E6D] to-[#0066CC] text-white flex items-center justify-center flex-shrink-0 text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm"><strong>{item.step}</strong></p>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                    {index < 6 && (
                      <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lot Management */}
              <Card className="p-6 bg-white">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-6 h-6 text-[#003E6D]" />
                  <h3 className="text-[#003E6D]">Lot Management</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Batch selection from existing harvests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>5 quality grades: A+, A, B+, B, C with color coding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Create multiple lots from single batch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Flexible quantity and unit selection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Edit and delete lots before tokenization</span>
                  </li>
                </ul>
              </Card>

              {/* Tokenization */}
              <Card className="p-6 bg-white">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h3 className="text-[#003E6D]">Blockchain Tokenization</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Global Batch ID for batch-level tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Unique Token ID per lot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Bulk tokenization for multiple lots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Real-time progress tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Status indicators (Pending, In Progress, Tokenized)</span>
                  </li>
                </ul>
              </Card>

              {/* Certificate Management */}
              <Card className="p-6 bg-white">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                  <h3 className="text-[#003E6D]">Certificate & Verification</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Upload multiple certificate types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Organic, Quality, Export, Food Safety certifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Multi-stage verifier support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Complete cultivation history timeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Timestamp and verifier tracking</span>
                  </li>
                </ul>
              </Card>

              {/* AI Insights */}
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h3 className="text-[#003E6D]">Grok AI Insights</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Quality Score (0-100) with visual progress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Risk Level Assessment (Low/Medium/High)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Fraud Probability Detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Market Recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>Current Market Trends Analysis</span>
                  </li>
                </ul>
              </Card>
            </div>
          </TabsContent>

          {/* Benefits Tab */}
          <TabsContent value="benefits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* For Producers */}
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                <h3 className="text-[#003E6D] mb-4">For Producers</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>Easy lot creation with quality grading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>Blockchain-backed provenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>Professional certificate management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>Enhanced buyer confidence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>Premium pricing opportunities</span>
                  </li>
                </ul>
              </Card>

              {/* For Buyers */}
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
                <h3 className="text-[#003E6D] mb-4">For Buyers</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Complete product transparency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>AI-powered quality assurance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Verified cultivation history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Certificate authenticity verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Fraud risk assessment</span>
                  </li>
                </ul>
              </Card>

              {/* For Platform */}
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
                <h3 className="text-[#003E6D] mb-4">For Platform</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span>Standardized tokenization process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span>Data enrichment at multiple stages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span>Audit trail for compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span>Trust-building mechanism</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span>Market differentiation</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* ROI Section */}
            <Card className="p-6 bg-gradient-to-r from-[#003E6D] to-[#0066CC] text-white">
              <h3 className="mb-4">Return on Investment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl mb-1">15-25%</p>
                  <p className="text-sm opacity-90">Premium pricing for verified products</p>
                </div>
                <div>
                  <p className="text-3xl mb-1">80%</p>
                  <p className="text-sm opacity-90">Reduction in buyer disputes</p>
                </div>
                <div>
                  <p className="text-3xl mb-1">3x</p>
                  <p className="text-sm opacity-90">Faster buyer decision-making</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Quick Start Tab */}
          <TabsContent value="quickstart" className="space-y-6">
            <Card className="p-6 bg-white">
              <h3 className="text-[#003E6D] mb-4">Getting Started in 3 Minutes</h3>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2">Select Your Batch</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Choose from your existing harvested batches or create a new one. Each batch contains 
                      commodity type, harvest date, and total quantity.
                    </p>
                    <div className="p-3 bg-blue-50 rounded border border-blue-200 text-sm">
                      <strong>Tip:</strong> Ensure your batch has completed quality grading before proceeding.
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2">Create Quality-Graded Lots</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Divide your batch into lots based on quality grades. Select grade (A+ to C), 
                      enter quantity, and create as many lots as needed.
                    </p>
                    <div className="p-3 bg-blue-50 rounded border border-blue-200 text-sm">
                      <strong>Example:</strong> 1000kg batch → 600kg A+ grade, 300kg A grade, 100kg B grade
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2">Tokenize & Enrich</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Click "Tokenize All" to generate blockchain tokens. Then add certificates, 
                      verifications, and cultivation history to build buyer trust.
                    </p>
                    <div className="p-3 bg-blue-50 rounded border border-blue-200 text-sm">
                      <strong>Result:</strong> Each lot gets a unique Token ID that buyers can scan and verify.
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <Button
                  onClick={onStartWorkflow}
                  className="flex-1 bg-[#003E6D] text-white hover:bg-[#003E6D]/90"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Launch Workflow Now
                </Button>
                <Button
                  onClick={onViewDiagram}
                  variant="outline"
                  className="flex-1 border-[#003E6D] text-[#003E6D]"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Visual Diagram
                </Button>
              </div>
            </Card>

            {/* Resources */}
            <Card className="p-6 bg-white">
              <h3 className="text-[#003E6D] mb-4">Additional Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-[#003E6D] cursor-pointer transition-colors">
                  <Video className="w-8 h-8 text-[#003E6D] mb-2" />
                  <h4 className="text-sm mb-1">Video Tutorial</h4>
                  <p className="text-xs text-gray-600">5-minute walkthrough</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-[#003E6D] cursor-pointer transition-colors">
                  <FileText className="w-8 h-8 text-[#003E6D] mb-2" />
                  <h4 className="text-sm mb-1">Documentation</h4>
                  <p className="text-xs text-gray-600">Complete reference guide</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-[#003E6D] cursor-pointer transition-colors">
                  <BookOpen className="w-8 h-8 text-[#003E6D] mb-2" />
                  <h4 className="text-sm mb-1">Best Practices</h4>
                  <p className="text-xs text-gray-600">Tips from top producers</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LotTokenizationGuide;
