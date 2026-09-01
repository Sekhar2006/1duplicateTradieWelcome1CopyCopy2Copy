/**
 * Camera Permission Test Component
 * 
 * Use this to test if camera permission error handling works
 */

import React, { useState } from 'react';
import { AIMediaCaptureCamera, CapturedImage } from './AIMediaCaptureCamera';
import { DSButton } from '../../design-system/components/DSButton';
import { DSCard } from '../../design-system/components/DSCard';

export function CameraPermissionTest() {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(null);

  const handleCapture = (image: CapturedImage) => {
    console.log('Image captured:', image);
    setCapturedImage(image);
    setShowCamera(false);
  };

  if (showCamera) {
    return (
      <AIMediaCaptureCamera
        onCapture={handleCapture}
        onClose={() => setShowCamera(false)}
        mode="quality"
        autoCapture={false}
        showConfidence={true}
        guidanceOverlay={true}
      />
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #D9F2FF 100%)' }}>
      <div className="max-w-2xl mx-auto">
        <DSCard className="p-6">
          <h1 className="text-3xl mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}>
            Camera Permission Test
          </h1>
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="font-semibold mb-2" style={{ color: '#003E6D' }}>
              Test Instructions:
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Click "Open Camera" button below</li>
              <li>When browser asks for camera permission → Click "Block" or "Deny"</li>
              <li>You should see a beautiful help screen (not a crash!)</li>
              <li>The help screen should have:
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Red camera icon</li>
                  <li>"Camera Access Required" title</li>
                  <li>Error message</li>
                  <li>4-step instructions</li>
                  <li>"Try Again" button</li>
                  <li>"Upload Image Instead" button</li>
                  <li>"Cancel" button</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2" style={{ color: '#003E6D' }}>
              Expected Console Output:
            </h2>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
{`Camera access error: NotAllowedError: Permission denied
↑ This is NORMAL and EXPECTED
↓ Help screen should appear on screen`}
            </pre>
          </div>

          {capturedImage && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <h2 className="font-semibold mb-2 text-green-800">
                ✅ Image Captured Successfully!
              </h2>
              <p className="text-sm text-green-700">
                Either camera worked or you uploaded an image via the fallback option.
              </p>
            </div>
          )}

          <DSButton
            onClick={() => {
              setCapturedImage(null);
              setShowCamera(true);
            }}
            className="w-full text-white"
            size="lg"
            style={{ backgroundColor: '#FFD700' }}
          >
            {capturedImage ? 'Test Again' : 'Open Camera (Test Permission Error)'}
          </DSButton>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">
              ⚠️ Important:
            </h3>
            <p className="text-sm text-yellow-700">
              The console error "NotAllowedError: Permission denied" is <strong>NORMAL</strong> and <strong>EXPECTED</strong>. 
              It's being caught and handled. What matters is that the help screen appears on your actual screen!
            </p>
          </div>
        </DSCard>
      </div>
    </div>
  );
}

export default CameraPermissionTest;
