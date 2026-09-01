import React, { useState } from 'react';
import { Download, FileText, CheckSquare, Square, Loader2, FolderDown, Settings2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

interface WireframeScreen {
  id: string;
  name: string;
  category: string;
  componentPath: string;
  selected: boolean;
}

const WIREFRAME_SCREENS: WireframeScreen[] = [
  // Producer Flow
  { id: 'producer-login', name: 'Producer Login', category: 'Producer', componentPath: 'ProducerLoginScreen', selected: false },
  { id: 'producer-dashboard', name: 'Producer Dashboard', category: 'Producer', componentPath: 'ProducerDashboardScreen', selected: false },
  { id: 'producer-onboarding', name: 'Producer Onboarding', category: 'Producer', componentPath: 'ProducerOnboarding', selected: false },
  { id: 'producer-identity', name: 'Identity Confirmation', category: 'Producer', componentPath: 'ProducerIdentityConfirmation', selected: false },
  { id: 'producer-ai-dashboard', name: 'AI Dashboard', category: 'Producer', componentPath: 'ProducerAIDashboardComplete', selected: false },
  
  // KYC System
  { id: 'kyc-role-selection', name: 'KYC Role Selection', category: 'KYC', componentPath: 'KYCRoleSelection', selected: false },
  { id: 'kyc-basic-details', name: 'KYC Basic Details', category: 'KYC', componentPath: 'KYCBasicDetails', selected: false },
  { id: 'kyc-id-verification', name: 'ID Verification', category: 'KYC', componentPath: 'KYCIDVerification', selected: false },
  { id: 'kyc-completion', name: 'KYC Completion', category: 'KYC', componentPath: 'KYCCompletion', selected: false },
  { id: 'kyc-comprehensive', name: 'Comprehensive KYC System', category: 'KYC', componentPath: 'ComprehensiveKYCSystem', selected: false },
  
  // Dashboards
  { id: 'storage-sell', name: 'Storage & Sell Dashboard', category: 'Dashboards', componentPath: 'UnifiedStorageSellPackagingDashboard', selected: false },
  { id: 'trading-dashboard', name: 'Trading Dashboard', category: 'Dashboards', componentPath: 'TradingDashboard', selected: false },
  { id: 'packaging-dashboard', name: 'Packaging Management', category: 'Dashboards', componentPath: 'PackagingManagementDashboard', selected: false },
  { id: 'reports-dashboard', name: 'Reports & Analytics', category: 'Dashboards', componentPath: 'ReportsAnalyticsDashboard', selected: false },
  
  // Quality & Provenance
  { id: 'quality-check', name: 'Quality Check Workflow', category: 'Quality', componentPath: 'QualityCheckWorkflow', selected: false },
  { id: 'provenance-tracker', name: 'Provenance Tracker', category: 'Quality', componentPath: 'ProvenanceTrackerWithAuth', selected: false },
  { id: 'qr-code-manager', name: 'QR Code Manager', category: 'Quality', componentPath: 'QRCodeManager', selected: false },
  
  // Lot Management
  { id: 'create-lot', name: 'Create Lot Workflow', category: 'Lot Management', componentPath: 'CreateLotWorkflow', selected: false },
  { id: 'lot-tokenization', name: 'Lot Tokenization', category: 'Lot Management', componentPath: 'LotCreationTokenizationWorkflow', selected: false },
  { id: 'lot-wireframes', name: 'Lot Management Wireframes', category: 'Lot Management', componentPath: 'LotManagementWireframes', selected: false },
  
  // Services
  { id: 'services-resources', name: 'Services & Resources', category: 'Services', componentPath: 'ServicesResourcesEnhanced', selected: false },
  { id: 'commission-agent', name: 'Commission Agent Flow', category: 'Services', componentPath: 'CommissionAgentFlowNavigator', selected: false },
  
  // Utilities
  { id: 'commit-coins', name: 'Commit Coins Wallet', category: 'Utilities', componentPath: 'CommitCoinsWallet', selected: false },
  { id: 'otp-verification', name: 'OTP Double Verification', category: 'Utilities', componentPath: 'OTPDoubleVerification', selected: false },
  { id: 'crop-lifecycle', name: 'Crop Lifecycle Tracker', category: 'Utilities', componentPath: 'CropLifecycleTracker', selected: false },
];

export default function WireframeBatchExporter() {
  const [isOpen, setIsOpen] = useState(false);
  const [screens, setScreens] = useState<WireframeScreen[]>(WIREFRAME_SCREENS);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [currentExporting, setCurrentExporting] = useState('');
  const [exportFormat, setExportFormat] = useState<'pdf' | 'word'>('pdf');

  const categories = Array.from(new Set(screens.map(s => s.category)));
  const selectedCount = screens.filter(s => s.selected).length;

  const toggleScreen = (id: string) => {
    setScreens(screens.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const toggleCategory = (category: string) => {
    const categoryScreens = screens.filter(s => s.category === category);
    const allSelected = categoryScreens.every(s => s.selected);
    
    setScreens(screens.map(s => 
      s.category === category ? { ...s, selected: !allSelected } : s
    ));
  };

  const selectAll = () => {
    const allSelected = screens.every(s => s.selected);
    setScreens(screens.map(s => ({ ...s, selected: !allSelected })));
  };

  const exportSelectedScreens = async () => {
    const selectedScreens = screens.filter(s => s.selected);
    
    if (selectedScreens.length === 0) {
      toast.error('No screens selected', {
        description: 'Please select at least one screen to export'
      });
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    try {
      // Import required libraries
      const [html2canvas, jsPDF] = await Promise.all([
        import('html2canvas'),
        import('jspdf')
      ]);

      const pdf = new jsPDF.default({
        orientation: 'portrait',
        unit: 'mm',
        format: 'A4'
      });

      for (let i = 0; i < selectedScreens.length; i++) {
        const screen = selectedScreens[i];
        setCurrentExporting(screen.name);
        
        // Find the component in the DOM
        const element = document.querySelector(`[data-wireframe="${screen.id}"]`) as HTMLElement;
        
        if (element) {
          try {
            const canvas = await html2canvas.default(element, {
              scale: 2,
              useCORS: true,
              allowTaint: true,
              backgroundColor: '#F7FAFC',
              logging: false,
              imageTimeout: 15000,
              ignoreElements: (el) => {
                return el.tagName === 'IFRAME' || el.classList.contains('no-export');
              }
            });

            // Validate canvas
            if (!canvas || canvas.width === 0 || canvas.height === 0) {
              console.log(`Skipping ${screen.name} - invalid canvas`);
              continue;
            }

            const imgWidth = 190; // A4 width in mm minus margins
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const imgData = canvas.toDataURL('image/png', 1.0);
            
            // Validate image data
            if (!imgData || !imgData.startsWith('data:image/png')) {
              console.log(`Skipping ${screen.name} - invalid image data`);
              continue;
            }

            if (i > 0) {
              pdf.addPage();
            }

            // Add header
            pdf.setFontSize(14);
            pdf.setTextColor(0, 62, 109);
            pdf.text(screen.name, 10, 15);
            
            pdf.setFontSize(9);
            pdf.setTextColor(90, 107, 122);
            pdf.text(`${screen.category} | Page ${i + 1} of ${selectedScreens.length}`, 10, 21);

            // Add image
            pdf.addImage(imgData, 'PNG', 10, 25, imgWidth, Math.min(imgHeight, 250));

            // Add footer
            pdf.setFontSize(8);
            pdf.setTextColor(139, 154, 168);
            pdf.text('TRADIE Platform Wireframes', 10, 287);
            pdf.text(new Date().toLocaleDateString(), 180, 287);
          } catch (err) {
            console.log(`Skipping ${screen.name} - element not visible`);
          }
        }

        setExportProgress(((i + 1) / selectedScreens.length) * 100);
      }

      // Save the PDF
      const timestamp = new Date().toISOString().split('T')[0];
      pdf.save(`TRADIE-Wireframes-${timestamp}.pdf`);

      toast.success('Export successful!', {
        description: `Exported ${selectedScreens.length} wireframe(s) to PDF`
      });

      setTimeout(() => {
        setIsOpen(false);
        setIsExporting(false);
        setExportProgress(0);
        setCurrentExporting('');
      }, 2000);

    } catch (error) {
      console.error('Export error:', error);
      toast.error('Export failed', {
        description: 'An error occurred during export. Please try again.'
      });
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0"
        >
          <FolderDown className="h-4 w-4" />
          Batch Export
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] bg-gradient-to-br from-[var(--gradient-start)] via-[var(--gradient-middle)] to-[var(--gradient-end)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--blue-primary)]" style={{ fontFamily: 'Playfair Display, serif' }}>
            <FolderDown className="h-6 w-6 text-[var(--accent-gold)]" />
            Batch Wireframe Exporter
          </DialogTitle>
          <DialogDescription className="text-[var(--text-secondary)]">
            Select and export multiple wireframes at once to PDF format with organized categories.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="select" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/50">
            <TabsTrigger value="select">Select Screens</TabsTrigger>
            <TabsTrigger value="settings">Export Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="select" className="space-y-4">
            {/* Selection Summary */}
            <Card className="p-4 bg-white/70">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-[var(--accent-gold)]" />
                  <span className="font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedCount} of {screens.length} selected
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAll}
                  className="gap-2"
                >
                  {screens.every(s => s.selected) ? (
                    <>
                      <Square className="h-4 w-4" />
                      Deselect All
                    </>
                  ) : (
                    <>
                      <CheckSquare className="h-4 w-4" />
                      Select All
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Screen Selection by Category */}
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {categories.map((category) => {
                  const categoryScreens = screens.filter(s => s.category === category);
                  const selectedInCategory = categoryScreens.filter(s => s.selected).length;
                  
                  return (
                    <Card key={category} className="p-4 bg-white/80">
                      <div className="space-y-3">
                        {/* Category Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`category-${category}`}
                              checked={categoryScreens.every(s => s.selected)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <Label
                              htmlFor={`category-${category}`}
                              className="font-semibold cursor-pointer"
                              style={{ fontFamily: 'Montserrat, sans-serif', color: 'var(--blue-primary)' }}
                            >
                              {category}
                            </Label>
                          </div>
                          <span className="text-sm text-[var(--text-secondary)]">
                            {selectedInCategory}/{categoryScreens.length}
                          </span>
                        </div>

                        {/* Screens in Category */}
                        <div className="space-y-2 pl-6">
                          {categoryScreens.map((screen) => (
                            <div key={screen.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={screen.id}
                                checked={screen.selected}
                                onCheckedChange={() => toggleScreen(screen.id)}
                              />
                              <Label
                                htmlFor={screen.id}
                                className="cursor-pointer text-sm flex-1"
                              >
                                {screen.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="p-6 bg-white/70 space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <Settings2 className="h-4 w-4" />
                  Export Format
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      exportFormat === 'pdf'
                        ? 'border-[var(--accent-gold)] bg-white shadow-md'
                        : 'border-gray-200 bg-white/50'
                    }`}
                    onClick={() => setExportFormat('pdf')}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FileText className={`h-8 w-8 ${exportFormat === 'pdf' ? 'text-[var(--accent-gold)]' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">PDF Document</span>
                      <span className="text-xs text-[var(--text-secondary)]">All screens in one file</span>
                    </div>
                  </Card>
                  
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      exportFormat === 'word'
                        ? 'border-[var(--accent-gold)] bg-white shadow-md'
                        : 'border-gray-200 bg-white/50'
                    }`}
                    onClick={() => setExportFormat('word')}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FileText className={`h-8 w-8 ${exportFormat === 'word' ? 'text-[var(--accent-gold)]' : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">Word Document</span>
                      <span className="text-xs text-[var(--text-secondary)]">Editable format</span>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Export will include:
                </h4>
                <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-gold)]" />
                    Screen names and categories
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-gold)]" />
                    Page numbers and timestamps
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-gold)]" />
                    TRADIE branding and styling
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-gold)]" />
                    High-resolution screenshots
                  </li>
                </ul>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export Progress */}
        {isExporting && (
          <Card className="p-4 bg-white border-[var(--accent-gold)]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Exporting wireframes...
                </span>
                <span className="text-sm text-[var(--text-secondary)]">
                  {Math.round(exportProgress)}%
                </span>
              </div>
              <Progress value={exportProgress} className="h-2" />
              {currentExporting && (
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Currently exporting: {currentExporting}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Export Button */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isExporting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={exportSelectedScreens}
            disabled={isExporting || selectedCount === 0}
            className="flex-1 bg-gradient-to-r from-[var(--blue-primary)] to-[var(--blue-light)] hover:from-[var(--blue-dark)] hover:to-[var(--blue-primary)] text-white"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export {selectedCount} Screen{selectedCount !== 1 ? 's' : ''}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
