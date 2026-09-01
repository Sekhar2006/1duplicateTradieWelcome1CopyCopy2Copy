import React, { useState } from 'react';
import { motion } from 'motion/react';
import { QrCode, Workflow, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import QualityCheckWorkflow from './producer-dashboard/QualityCheckWorkflow';
import QualityTokenScanner from './producer-dashboard/QualityTokenScanner';

const QualityTokenDemo: React.FC = () => {
  const [activeView, setActiveView] = useState<'intro' | 'workflow' | 'scanner'>('intro');

  const renderIntro = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#F7FAFC] to-[#D9F2FF] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFD700]/20 mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-[#003E6D]" />
          </motion.div>
          <h1 className="text-[#003E6D] mb-4">
            Producer Quality Verification System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete end-to-end quality tracking from harvest to market with QR token generation and scanning
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Quality Check Workflow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 h-full hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-[#FFD700]" onClick={() => setActiveView('workflow')}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-colors">
                  <Workflow className="w-8 h-8 text-blue-600 group-hover:text-[#003E6D]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl text-[#003E6D] mb-2">
                    Quality Check Workflow
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Complete 6-step verification process
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Commodity selection & harvest grading</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Processing & secondary grading</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Multi-tier quality verification</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Sales channel configuration</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Token generation with QR code</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Feedback loop & corrective measures</span>
                </div>
              </div>

              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 group-hover:bg-[#FFD700] group-hover:text-[#003E6D]">
                Start Quality Workflow
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </motion.div>

          {/* QR Token Scanner */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8 h-full hover:shadow-xl transition-all cursor-pointer group border-2 hover:border-[#FFD700]" onClick={() => setActiveView('scanner')}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-colors">
                  <QrCode className="w-8 h-8 text-purple-600 group-hover:text-[#003E6D]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl text-[#003E6D] mb-2">
                    QR Token Scanner
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Scan & verify quality tokens instantly
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Camera scan or image upload</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Complete commodity information</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Quality grades & certifications</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Full traceability timeline</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Download PDF reports</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Share quality details</span>
                </div>
              </div>

              <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 group-hover:bg-[#FFD700] group-hover:text-[#003E6D]">
                Open Scanner
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* System Overview */}
        <Card className="p-8 bg-gradient-to-r from-[#FFD700]/10 to-white border-2 border-[#FFD700]">
          <h3 className="text-xl text-[#003E6D] mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[#FFD700]" />
            Complete Quality Verification System
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                <span className="text-xl text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-[#003E6D] mb-2">Record & Verify</h4>
              <p className="text-sm text-gray-600">
                Complete 6-step workflow captures harvest, grading, processing, quality checks, and sales channels
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
                <span className="text-xl text-purple-600">2</span>
              </div>
              <h4 className="font-semibold text-[#003E6D] mb-2">Generate Token</h4>
              <p className="text-sm text-gray-600">
                Unique token ID with QR code generated for each verified batch with downloadable labels
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-3">
                <span className="text-xl text-green-600">3</span>
              </div>
              <h4 className="font-semibold text-[#003E6D] mb-2">Scan & Share</h4>
              <p className="text-sm text-gray-600">
                Anyone can scan QR to view complete quality details, certifications, and traceability
              </p>
            </div>
          </div>
        </Card>

        {/* Features List */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-white/80">
            <h4 className="font-semibold text-[#003E6D] mb-3">Quality Verification Features</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD700]">▸</span>
                <span>Self-assessment + external verification (third-party, government, lab, buyer)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD700]">▸</span>
                <span>Star ratings, quality comments, and specifications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD700]">▸</span>
                <span>Document upload for certificates and lab reports</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD700]">▸</span>
                <span>Compliance score tracking (0-100%)</span>
              </li>
            </ul>
          </Card>

          <Card className="p-4 bg-white/80">
            <h4 className="font-semibold text-[#003E6D] mb-3">Scanner Features</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD700]">▸</span>
                <span>Camera scan or upload QR code image</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD700]">▸</span>
                <span>Manual token ID entry for quick access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD700]">▸</span>
                <span>Tabbed interface: Overview, Quality, Sales, Certificates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD700]">▸</span>
                <span>Download PDF reports and share token details</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );

  if (activeView === 'workflow') {
    return (
      <div>
        <div className="bg-gradient-to-r from-[#003E6D] to-[#004A87] p-4">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setActiveView('intro')}
              className="text-white hover:bg-white/10"
            >
              ← Back to Overview
            </Button>
          </div>
        </div>
        <QualityCheckWorkflow />
      </div>
    );
  }

  if (activeView === 'scanner') {
    return (
      <div>
        <div className="bg-gradient-to-r from-[#003E6D] to-[#004A87] p-4">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setActiveView('intro')}
              className="text-white hover:bg-white/10"
            >
              ← Back to Overview
            </Button>
          </div>
        </div>
        <QualityTokenScanner standalone={true} />
      </div>
    );
  }

  return renderIntro();
};

export default QualityTokenDemo;
