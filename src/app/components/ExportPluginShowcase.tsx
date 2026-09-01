import React from 'react';
import { FileText, Download, FolderDown, Sparkles, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import ScreenExportPlugin from './ScreenExportPlugin';
import WireframeBatchExporter from './WireframeBatchExporter';
import { CompactExportButton, FloatingExportToolbar, FullExportToolbar } from './ExportToolbar';

interface ExportPluginShowcaseProps {
  onBack?: () => void;
}

export default function ExportPluginShowcase({ onBack }: ExportPluginShowcaseProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] via-[#E8F4FC] to-[#D9F2FF] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        {onBack && (
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-4 bg-white shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        )}

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Download className="h-12 w-12 text-[var(--accent-gold)]" />
            <h1 
              className="text-5xl"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: 'var(--blue-primary)',
                fontWeight: 700
              }}
            >
              Screen & Wireframe Export Plugin
            </h1>
          </div>
          
          <p className="text-xl text-[var(--text-secondary)]" style={{ fontFamily: 'Lato, sans-serif' }}>
            Convert entire screens and wireframes to PDF, Word, or Image format
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-green-500 text-white">✅ Production Ready</Badge>
            <Badge className="bg-blue-500 text-white">3 Export Formats</Badge>
            <Badge className="bg-purple-500 text-white">25 Wireframes</Badge>
            <Badge className="bg-orange-500 text-white">4 Components</Badge>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1: PDF Export */}
          <Card className="p-6 bg-white shadow-xl hover:shadow-2xl transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-lg">
                  <FileText className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--blue-primary)' }}>
                    PDF Export
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">Professional documents</p>
                </div>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>High-quality pagination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Custom page sizes (A4, Letter, Legal)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Headers & footers with branding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Portrait & landscape orientation</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Feature 2: Word Export */}
          <Card className="p-6 bg-white shadow-xl hover:shadow-2xl transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--blue-primary)' }}>
                    Word Export
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">Editable documents</p>
                </div>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Editable .doc format</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Maintains TRADIE styling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Embedded images</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Perfect for reports</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Feature 3: Batch Export */}
          <Card className="p-6 bg-white shadow-xl hover:shadow-2xl transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FolderDown className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--blue-primary)' }}>
                    Batch Export
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">Multiple wireframes</p>
                </div>
              </div>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>25 pre-configured screens</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Category-based selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>One PDF with all screens</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Auto page numbering</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Live Demo Tabs */}
        <Card className="p-6 bg-white shadow-xl">
          <h2 
            className="text-3xl mb-6"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              color: 'var(--blue-primary)'
            }}
          >
            <Sparkles className="inline-block h-8 w-8 text-[var(--accent-gold)] mr-2" />
            Live Demo - Try It Now!
          </h2>

          <Tabs defaultValue="single" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100">
              <TabsTrigger value="single">Single Export</TabsTrigger>
              <TabsTrigger value="batch">Batch Export</TabsTrigger>
              <TabsTrigger value="toolbar">Toolbars</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            {/* Single Export Demo */}
            <TabsContent value="single" className="space-y-4 mt-6">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                <h3 className="font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Export This Card to PDF/Word/Image
                </h3>
                
                <div className="space-y-4">
                  <p className="text-[var(--text-secondary)]">
                    Click the button below to export this entire card (or any component) to your desired format.
                    You can configure quality, page size, orientation, and more!
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Sample Content</h4>
                      <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
                        <li>• Producer Dashboard</li>
                        <li>• Quality Check Workflow</li>
                        <li>• KYC Verification</li>
                        <li>• Lot Tokenization</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Export Options</h4>
                      <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
                        <li>• 3 formats (PDF, Word, PNG)</li>
                        <li>• 3 quality levels</li>
                        <li>• Custom headers/footers</li>
                        <li>• Full page capture</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <ScreenExportPlugin 
                      fileName="TRADIE-Export-Demo"
                      buttonVariant="default"
                    />
                    <div className="flex-1 text-sm text-[var(--text-secondary)] flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Click to configure and export this content
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Batch Export Demo */}
            <TabsContent value="batch" className="space-y-4 mt-6">
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                <h3 className="font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Export Multiple Wireframes at Once
                </h3>
                
                <div className="space-y-4">
                  <p className="text-[var(--text-secondary)]">
                    Select from 25 pre-configured TRADIE wireframes organized by category.
                    Export all selected screens to a single, organized PDF document.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { name: 'Producer', count: 5, color: 'bg-green-100 text-green-700' },
                      { name: 'KYC', count: 5, color: 'bg-blue-100 text-blue-700' },
                      { name: 'Dashboards', count: 4, color: 'bg-purple-100 text-purple-700' },
                      { name: 'Quality', count: 3, color: 'bg-orange-100 text-orange-700' },
                      { name: 'Lot Mgmt', count: 3, color: 'bg-red-100 text-red-700' },
                      { name: 'Services', count: 2, color: 'bg-teal-100 text-teal-700' },
                      { name: 'Utilities', count: 3, color: 'bg-indigo-100 text-indigo-700' },
                    ].map((category) => (
                      <div key={category.name} className={`p-3 rounded-lg ${category.color}`}>
                        <div className="font-bold">{category.name}</div>
                        <div className="text-sm">{category.count} screens</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <WireframeBatchExporter />
                    <div className="flex-1 text-sm text-[var(--text-secondary)] flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Click to select and export wireframes
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Toolbar Variants */}
            <TabsContent value="toolbar" className="space-y-4 mt-6">
              <div className="space-y-6">
                <Card className="p-6 bg-white">
                  <h4 className="font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    1. Full Export Toolbar
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    Complete toolbar with all options, statistics, and quick actions
                  </p>
                  <FullExportToolbar fileName="Full-Toolbar-Demo" />
                </Card>

                <Card className="p-6 bg-white">
                  <h4 className="font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    2. Compact Dropdown Button
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    Space-saving dropdown for navigation bars and tight spaces
                  </p>
                  <CompactExportButton fileName="Compact-Demo" />
                </Card>

                <Card className="p-6 bg-white">
                  <h4 className="font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    3. Floating Toolbar (see top-right corner)
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Fixed position overlay that's always accessible. Perfect for documentation and long pages.
                    Look for the floating toolbar in the top-right corner of this showcase!
                  </p>
                </Card>
              </div>
            </TabsContent>

            {/* Statistics */}
            <TabsContent value="stats" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <div className="text-4xl font-bold mb-2">4</div>
                  <div className="text-sm opacity-90">Components Created</div>
                </Card>
                
                <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <div className="text-4xl font-bold mb-2">3</div>
                  <div className="text-sm opacity-90">Export Formats</div>
                </Card>
                
                <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <div className="text-4xl font-bold mb-2">25</div>
                  <div className="text-sm opacity-90">Pre-configured Wireframes</div>
                </Card>
                
                <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                  <div className="text-4xl font-bold mb-2">~1.9k</div>
                  <div className="text-sm opacity-90">Lines of Code</div>
                </Card>
              </div>

              <Card className="p-6 bg-white">
                <h3 className="font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Feature Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>PDF Export</span>
                      <Badge className="bg-green-500">✓</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Word Export</span>
                      <Badge className="bg-green-500">✓</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Image Export</span>
                      <Badge className="bg-green-500">✓</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Batch Export</span>
                      <Badge className="bg-green-500">✓</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Progress Tracking</span>
                      <Badge className="bg-green-500">✓</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Error Handling</span>
                      <Badge className="bg-green-500">✓</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>TRADIE Branding</span>
                      <Badge className="bg-green-500">✓</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Documentation</span>
                      <Badge className="bg-green-500">✓</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Documentation Links */}
        <Card className="p-6 bg-white shadow-xl">
          <h2 
            className="text-2xl mb-4"
            style={{ 
              fontFamily: 'Playfair Display, serif',
              color: 'var(--blue-primary)'
            }}
          >
            📚 Documentation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
              <h4 className="font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Quick Start Guide
              </h4>
              <p className="text-sm text-[var(--text-secondary)]">
                30-second setup and common use cases
              </p>
              <code className="text-xs mt-2 block bg-white p-2 rounded">
                /EXPORT_PLUGIN_QUICK_START.md
              </code>
            </Card>
            
            <Card className="p-4 bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
              <h4 className="font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Complete Guide
              </h4>
              <p className="text-sm text-[var(--text-secondary)]">
                Full API documentation and advanced usage
              </p>
              <code className="text-xs mt-2 block bg-white p-2 rounded">
                /SCREEN_EXPORT_PLUGIN_GUIDE.md
              </code>
            </Card>
            
            <Card className="p-4 bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer">
              <h4 className="font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Complete Summary
              </h4>
              <p className="text-sm text-[var(--text-secondary)]">
                Overview, statistics, and checklist
              </p>
              <code className="text-xs mt-2 block bg-white p-2 rounded">
                /EXPORT_PLUGIN_COMPLETE_SUMMARY.md
              </code>
            </Card>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-[var(--text-secondary)]">
          <p>TRADIE Screen & Wireframe Export Plugin</p>
          <p className="text-xs mt-1">Production Ready • Fully Documented • Easy to Use</p>
        </div>
      </div>

      {/* Floating Toolbar Demo */}
      <FloatingExportToolbar fileName="TRADIE-Showcase" position="top-right" />
    </div>
  );
}
