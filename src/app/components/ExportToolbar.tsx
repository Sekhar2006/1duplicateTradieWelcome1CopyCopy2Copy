import React, { useState } from 'react';
import { Download, FileText, Image, FolderDown, Settings, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './ui/dropdown-menu';
import ScreenExportPlugin from './ScreenExportPlugin';
import WireframeBatchExporter from './WireframeBatchExporter';

interface ExportToolbarProps {
  fileName?: string;
  showLabels?: boolean;
  variant?: 'default' | 'compact' | 'floating';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export default function ExportToolbar({
  fileName = 'TRADIE-Export',
  showLabels = true,
  variant = 'default',
  position = 'top-right'
}: ExportToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Compact dropdown version
  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <Download className="h-4 w-4" />
            {showLabels && 'Export'}
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <Download className="h-4 w-4 text-[var(--accent-gold)]" />
            Export Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>Export to PDF</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>Export to Word</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer">
            <Image className="mr-2 h-4 w-4" />
            <span>Export to Image</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="cursor-pointer">
            <FolderDown className="mr-2 h-4 w-4" />
            <span>Batch Export Wireframes</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Floating toolbar version
  if (variant === 'floating') {
    const positionClasses = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4'
    };

    return (
      <div className={`fixed ${positionClasses[position]} z-50`}>
        <Card className="p-2 bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-[var(--accent-gold)]/20">
          <div className="flex gap-2">
            <ScreenExportPlugin 
              fileName={fileName}
              buttonVariant="ghost"
            />
            <WireframeBatchExporter />
          </div>
        </Card>
      </div>
    );
  }

  // Default horizontal toolbar
  return (
    <div className="export-toolbar">
      <Card className="p-3 bg-gradient-to-r from-white to-gray-50 shadow-md border border-gray-200">
        <div className="flex items-center gap-3">
          {/* Toolbar Label */}
          {showLabels && (
            <div className="flex items-center gap-2 pr-3 border-r border-gray-300">
              <Download className="h-5 w-5 text-[var(--accent-gold)]" />
              <span 
                className="font-semibold text-sm"
                style={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  color: 'var(--blue-primary)'
                }}
              >
                Export Tools
              </span>
            </div>
          )}

          {/* Export Buttons */}
          <div className="flex items-center gap-2">
            <ScreenExportPlugin 
              fileName={fileName}
              buttonVariant="outline"
            />
            
            <WireframeBatchExporter />

            {/* Quick Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <Settings className="h-4 w-4" />
                  {showLabels && 'More'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Quick Export Options
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4 text-red-500" />
                  <div className="flex-1">
                    <div className="font-medium">High Quality PDF</div>
                    <div className="text-xs text-gray-500">Best for documentation</div>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="cursor-pointer">
                  <Image className="mr-2 h-4 w-4 text-blue-500" />
                  <div className="flex-1">
                    <div className="font-medium">Screenshot (PNG)</div>
                    <div className="text-xs text-gray-500">Quick image export</div>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4 text-green-500" />
                  <div className="flex-1">
                    <div className="font-medium">Word Document</div>
                    <div className="text-xs text-gray-500">Editable format</div>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="cursor-pointer">
                  <FolderDown className="mr-2 h-4 w-4 text-purple-500" />
                  <div className="flex-1">
                    <div className="font-medium">Export All Screens</div>
                    <div className="text-xs text-gray-500">Batch export to PDF</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Export Stats (Optional) */}
          <div className="ml-auto pl-3 border-l border-gray-300 hidden lg:block">
            <div className="text-xs text-gray-500">
              <div>25 wireframes ready</div>
              <div className="text-[var(--accent-gold)] font-medium">3 formats available</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Convenience exports for common configurations
export function CompactExportButton({ fileName }: { fileName?: string }) {
  return <ExportToolbar fileName={fileName} variant="compact" showLabels={false} />;
}

export function FloatingExportToolbar({ 
  fileName,
  position = 'top-right' 
}: { 
  fileName?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}) {
  return <ExportToolbar fileName={fileName} variant="floating" position={position} />;
}

export function FullExportToolbar({ fileName }: { fileName?: string }) {
  return <ExportToolbar fileName={fileName} variant="default" showLabels={true} />;
}
