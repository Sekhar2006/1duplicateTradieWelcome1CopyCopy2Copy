import React, { useState } from "react";
import ProducerCompleteFlow from "./components/producer-dashboard/ProducerCompleteFlow";
import { EnhancedStorageSelectionScreen } from "./components/producer-dashboard/EnhancedStorageSelectionScreen";
import { CropHistoryWithGrokInsights, generateMockCropHistory } from "./components/producer-dashboard/CropHistoryWithGrokInsights";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Toaster } from "./components/ui/sonner";

/**
 * Enhanced Producer Flow Demo
 * 
 * This demo showcases the new features:
 * 1. Complete Producer Flow (10 steps) with Grok AI
 * 2. 4 Storage Type Selection (Warehouse, Cold, Farm, Silo)
 * 3. Crop History with Grok Insights for buyers
 */
export default function EnhancedProducerFlowDemo() {
  const [view, setView] = useState<'menu' | 'complete-flow' | 'storage' | 'history'>('menu');

  // Complete Flow View
  if (view === 'complete-flow') {
    return (
      <>
        <ProducerCompleteFlow onBack={() => setView('menu')} />
        <Toaster />
      </>
    );
  }

  // Storage Selection View
  if (view === 'storage') {
    return (
      <>
        <EnhancedStorageSelectionScreen
          onSelectFacility={(facility) => {
            alert(`Selected: ${facility.name} (${facility.type})\nPrice: ${facility.priceUnit} ₹${facility.pricePerKg}`);
          }}
          onBack={() => setView('menu')}
          lotData={{
            commodity: 'Wheat',
            quality: 'A',
            quantity: 5000
          }}
        />
        <Toaster />
      </>
    );
  }

  // Crop History View
  if (view === 'history') {
    return (
      <>
        <CropHistoryWithGrokInsights
          history={generateMockCropHistory()}
          viewMode="full"
          onClose={() => setView('menu')}
        />
        <Toaster />
      </>
    );
  }

  // Menu View
  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(to bottom, #F7FAFC, #D9F2FF)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}>
            Enhanced Producer Flow Demo
          </h1>
          <p className="text-gray-600">
            Experience the complete producer journey with Grok AI, activity logging, and 4 storage options
          </p>
        </div>

        {/* Demo Cards */}
        <div className="space-y-4">
          
          {/* Complete Flow */}
          <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl" style={{ backgroundColor: '#003E6D20' }}>
                  🚀
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
                  Complete Producer Flow (10 Steps)
                </h2>
                <p className="text-gray-600 mb-4">
                  End-to-end journey from crop selection to settlement with Grok AI, activity logging, 4 storage options, and buyer history view.
                </p>
                <div className="flex flex-wrap gap-2 mb-4 text-sm">
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-800">
                    ✅ Grok AI Crop Selection
                  </div>
                  <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    ✅ Activity Logging (14 types)
                  </div>
                  <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                    ✅ 4 Storage Options
                  </div>
                  <div className="px-3 py-1 rounded-full bg-orange-100 text-orange-800">
                    ✅ Buyer History & Insights
                  </div>
                </div>
                <Button 
                  onClick={() => setView('complete-flow')} 
                  className="w-full" 
                  style={{ backgroundColor: '#003E6D', color: 'white' }}
                >
                  Start Complete Flow →
                </Button>
              </div>
            </div>
          </Card>

          {/* Storage Selection */}
          <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl" style={{ backgroundColor: '#3B82F620' }}>
                  🏭
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
                  4 Storage Type Selection
                </h2>
                <p className="text-gray-600 mb-4">
                  Explore and compare 4 different storage options: Warehouse, Cold Storage, Farm Storage, and Silo Storage with detailed facility information.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏭</span>
                    <span>Warehouse Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">❄️</span>
                    <span>Cold Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏡</span>
                    <span>Farm Storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌾</span>
                    <span>Silo Storage</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setView('storage')} 
                  className="w-full" 
                  style={{ backgroundColor: '#3B82F6', color: 'white' }}
                >
                  View Storage Options →
                </Button>
              </div>
            </div>
          </Card>

          {/* Buyer History */}
          <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl" style={{ backgroundColor: '#9333EA20' }}>
                  ✨
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl mb-2" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
                  Crop History with Grok Insights
                </h2>
                <p className="text-gray-600 mb-4">
                  View what buyers will see: complete crop history with Grok AI trust score, activity timeline, quality metrics, and certifications.
                </p>
                <div className="flex flex-wrap gap-2 mb-4 text-sm">
                  <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                    📊 Trust Score: 94%
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-800">
                    ✅ Low Risk
                  </div>
                  <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    📝 Complete Timeline
                  </div>
                  <div className="px-3 py-1 rounded-full bg-orange-100 text-orange-800">
                    🎯 Quality Metrics
                  </div>
                </div>
                <Button 
                  onClick={() => setView('history')} 
                  className="w-full" 
                  style={{ backgroundColor: '#9333EA', color: 'white' }}
                >
                  View Buyer History →
                </Button>
              </div>
            </div>
          </Card>

          {/* Features Summary */}
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
            <h3 className="text-lg mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
              ✨ New Features Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <div>
                  <p className="text-gray-900">Grok AI-Powered Crop Selection</p>
                  <p className="text-gray-600 text-xs">Market trends, price predictions, confidence scoring</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <div>
                  <p className="text-gray-900">14 Types of Activity Tracking</p>
                  <p className="text-gray-600 text-xs">Fertilizers, pesticides, irrigation, and more</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <div>
                  <p className="text-gray-900">4 Storage Options</p>
                  <p className="text-gray-600 text-xs">Warehouse, Cold, Farm, Silo with filtering</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <div>
                  <p className="text-gray-900">Complete Buyer Transparency</p>
                  <p className="text-gray-600 text-xs">History, AI trust score, quality metrics</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <div>
                  <p className="text-gray-900">Real-time Grok AI Validation</p>
                  <p className="text-gray-600 text-xs">Activity analysis, warnings, suggestions</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">✓</span>
                <div>
                  <p className="text-gray-900">NFT/QR Tokenization</p>
                  <p className="text-gray-600 text-xs">Blockchain verification, immutable history</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Reference */}
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-lg mb-3" style={{ fontFamily: 'Montserrat, sans-serif', color: '#003E6D' }}>
              📚 Documentation
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <strong>Full Guide:</strong> See <code>/PRODUCER_COMPLETE_FLOW_WITH_GROK_STORAGE_GUIDE.md</code>
              </p>
              <p className="text-gray-700">
                <strong>Quick Start:</strong> See <code>/QUICK_START_ENHANCED_PRODUCER_FLOW.md</code>
              </p>
              <p className="text-gray-700">
                <strong>Components:</strong> 
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• ProducerCompleteFlow.tsx (Main coordinator)</li>
                  <li>• EnhancedStorageSelectionScreen.tsx (4 storage types)</li>
                  <li>• CropHistoryWithGrokInsights.tsx (Buyer view)</li>
                  <li>• ActivityLoggerEnhanced.tsx (14 activity types)</li>
                  <li>• CropSelectionWithAI.tsx (Grok recommendations)</li>
                </ul>
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
