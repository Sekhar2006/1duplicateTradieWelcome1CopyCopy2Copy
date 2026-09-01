/**
 * Figma JSON Exporter
 * 
 * Generates Figma-compatible JSON from React components
 * Following the Figma REST API JSON structure
 */

import React from 'react';

// ============================================================================
// TYPES
// ============================================================================

interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

interface FigmaBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FigmaNode {
  id: string;
  name: string;
  type: string;
  absoluteBoundingBox?: FigmaBoundingBox;
  children?: FigmaNode[];
  fills?: Array<{ type: string; color: FigmaColor }>;
  strokes?: Array<{ type: string; color: FigmaColor }>;
  strokeWeight?: number;
  characters?: string;
  style?: any;
  constraints?: any;
}

interface FigmaDocument {
  document: {
    children: FigmaNode[];
  };
}

// ============================================================================
// FIGMA JSON GENERATORS
// ============================================================================

/**
 * Generate Camera Capture Screen JSON
 */
export function generateCameraCaptureJSON(): FigmaDocument {
  return {
    document: {
      children: [
        {
          id: 'camera-screen-1',
          name: 'CameraCaptureScreen',
          type: 'FRAME',
          absoluteBoundingBox: { x: 0, y: 0, width: 375, height: 667 },
          children: [
            // Video View (Black Background)
            {
              id: 'camera-1-1',
              type: 'RECTANGLE',
              name: 'VideoView',
              absoluteBoundingBox: { x: 0, y: 0, width: 375, height: 667 },
              fills: [
                {
                  type: 'SOLID',
                  color: { r: 0, g: 0, b: 0 }, // Black
                },
              ],
            },

            // Framing Guide Overlay
            {
              id: 'camera-1-2',
              type: 'FRAME',
              name: 'FramingGuide',
              absoluteBoundingBox: { x: 47.5, y: 167, width: 280, height: 333 },
              children: [
                // Main frame border
                {
                  id: 'camera-1-2-1',
                  type: 'RECTANGLE',
                  name: 'FrameBorder',
                  absoluteBoundingBox: { x: 47.5, y: 167, width: 280, height: 333 },
                  fills: [],
                  strokes: [
                    {
                      type: 'SOLID',
                      color: { r: 0.06, g: 0.73, b: 0.51 }, // #10B981 green
                    },
                  ],
                  strokeWeight: 3,
                },

                // Top-left corner marker
                {
                  id: 'camera-1-2-2',
                  type: 'RECTANGLE',
                  name: 'CornerTopLeft',
                  absoluteBoundingBox: { x: 47.5, y: 167, width: 32, height: 32 },
                  fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.73, b: 0.51 } }],
                },

                // Top-right corner marker
                {
                  id: 'camera-1-2-3',
                  type: 'RECTANGLE',
                  name: 'CornerTopRight',
                  absoluteBoundingBox: { x: 295.5, y: 167, width: 32, height: 32 },
                  fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.73, b: 0.51 } }],
                },

                // Bottom-left corner marker
                {
                  id: 'camera-1-2-4',
                  type: 'RECTANGLE',
                  name: 'CornerBottomLeft',
                  absoluteBoundingBox: { x: 47.5, y: 468, width: 32, height: 32 },
                  fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.73, b: 0.51 } }],
                },

                // Bottom-right corner marker
                {
                  id: 'camera-1-2-5',
                  type: 'RECTANGLE',
                  name: 'CornerBottomRight',
                  absoluteBoundingBox: { x: 295.5, y: 468, width: 32, height: 32 },
                  fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.73, b: 0.51 } }],
                },
              ],
            },

            // Confidence Meter
            {
              id: 'camera-1-3',
              type: 'FRAME',
              name: 'ConfidenceMeter',
              absoluteBoundingBox: { x: 280, y: 20, width: 80, height: 32 },
              fills: [
                {
                  type: 'SOLID',
                  color: { r: 0, g: 0, b: 0, a: 0.7 }, // Semi-transparent black
                },
              ],
              children: [
                {
                  id: 'camera-1-3-1',
                  type: 'TEXT',
                  name: 'ConfidenceText',
                  characters: '92%',
                  absoluteBoundingBox: { x: 290, y: 26, width: 60, height: 20 },
                  style: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    textAlignHorizontal: 'CENTER',
                  },
                  fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }], // White
                },
              ],
            },

            // Capture Button
            {
              id: 'camera-1-4',
              type: 'ELLIPSE',
              name: 'CaptureButton',
              absoluteBoundingBox: { x: 157.5, y: 587, width: 60, height: 60 },
              fills: [
                {
                  type: 'SOLID',
                  color: { r: 1, g: 0.84, b: 0 }, // #FFD700 gold
                },
              ],
            },

            // Switch Camera Button
            {
              id: 'camera-1-5',
              type: 'RECTANGLE',
              name: 'SwitchCameraButton',
              absoluteBoundingBox: { x: 15, y: 20, width: 40, height: 40 },
              fills: [
                {
                  type: 'SOLID',
                  color: { r: 1, g: 1, b: 1, a: 0.3 }, // Semi-transparent white
                },
              ],
            },

            // Flash Toggle Button
            {
              id: 'camera-1-6',
              type: 'RECTANGLE',
              name: 'FlashToggleButton',
              absoluteBoundingBox: { x: 65, y: 20, width: 40, height: 40 },
              fills: [
                {
                  type: 'SOLID',
                  color: { r: 1, g: 1, b: 1, a: 0.3 }, // Semi-transparent white
                },
              ],
            },

            // Instruction Text
            {
              id: 'camera-1-7',
              type: 'TEXT',
              name: 'InstructionText',
              characters: 'Frame your produce under good lighting',
              absoluteBoundingBox: { x: 50, y: 620, width: 275, height: 20 },
              style: {
                fontSize: 14,
                textAlignHorizontal: 'CENTER',
              },
              fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }], // White
            },

            // Grid Overlay (optional)
            {
              id: 'camera-1-8',
              type: 'FRAME',
              name: 'GridOverlay',
              absoluteBoundingBox: { x: 47.5, y: 167, width: 280, height: 333 },
              children: Array.from({ length: 9 }).map((_, i) => ({
                id: `camera-1-8-${i}`,
                type: 'RECTANGLE',
                name: `GridCell${i}`,
                absoluteBoundingBox: {
                  x: 47.5 + (i % 3) * 93.33,
                  y: 167 + Math.floor(i / 3) * 111,
                  width: 93.33,
                  height: 111,
                },
                fills: [],
                strokes: [
                  {
                    type: 'SOLID',
                    color: { r: 1, g: 1, b: 1, a: 0.3 },
                  },
                ],
                strokeWeight: 1,
              })),
            },
          ],
        },
      ],
    },
  };
}

/**
 * Generate AI Result Card JSON
 */
export function generateAIResultCardJSON(): FigmaDocument {
  return {
    document: {
      children: [
        {
          id: 'ai-result-1',
          name: 'AIResultCard',
          type: 'FRAME',
          absoluteBoundingBox: { x: 0, y: 0, width: 360, height: 500 },
          fills: [
            {
              type: 'SOLID',
              color: { r: 1, g: 1, b: 1 }, // White
            },
          ],
          children: [
            // Header with gradient background
            {
              id: 'ai-result-1-1',
              type: 'RECTANGLE',
              name: 'HeaderBackground',
              absoluteBoundingBox: { x: 0, y: 0, width: 360, height: 120 },
              fills: [
                {
                  type: 'GRADIENT_LINEAR',
                  color: { r: 0.97, g: 0.98, b: 0.99 }, // #F7FAFC → #D9F2FF
                },
              ],
            },

            // Icon badge
            {
              id: 'ai-result-1-2',
              type: 'RECTANGLE',
              name: 'IconBadge',
              absoluteBoundingBox: { x: 24, y: 24, width: 40, height: 40 },
              fills: [
                {
                  type: 'SOLID',
                  color: { r: 1, g: 0.84, b: 0 }, // #FFD700 gold
                },
              ],
            },

            // Title
            {
              id: 'ai-result-1-3',
              type: 'TEXT',
              name: 'Title',
              characters: 'AI Quality Assessment',
              absoluteBoundingBox: { x: 76, y: 28, width: 260, height: 32 },
              style: {
                fontSize: 24,
                fontWeight: 'bold',
                fontFamily: 'Playfair Display',
              },
              fills: [{ type: 'SOLID', color: { r: 0, g: 0.24, b: 0.43 } }], // #003E6D
            },

            // Timestamp
            {
              id: 'ai-result-1-4',
              type: 'TEXT',
              name: 'Timestamp',
              characters: 'Analyzed 2:30 PM • 2000ms',
              absoluteBoundingBox: { x: 76, y: 64, width: 260, height: 16 },
              style: {
                fontSize: 12,
              },
              fills: [{ type: 'SOLID', color: { r: 0.42, g: 0.45, b: 0.49 } }], // Gray
            },

            // Overall Confidence Badge
            {
              id: 'ai-result-1-5',
              type: 'RECTANGLE',
              name: 'ConfidenceBadge',
              absoluteBoundingBox: { x: 286, y: 32, width: 60, height: 24 },
              fills: [
                {
                  type: 'SOLID',
                  color: { r: 0.06, g: 0.73, b: 0.51 }, // #10B981 green
                },
              ],
            },

            {
              id: 'ai-result-1-5-1',
              type: 'TEXT',
              name: 'ConfidenceBadgeText',
              characters: '92%',
              absoluteBoundingBox: { x: 296, y: 37, width: 40, height: 14 },
              style: {
                fontSize: 12,
                fontWeight: 'bold',
                textAlignHorizontal: 'CENTER',
              },
              fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }], // White
            },

            // Metrics Section Title
            {
              id: 'ai-result-1-6',
              type: 'TEXT',
              name: 'MetricsTitle',
              characters: 'Quality Metrics',
              absoluteBoundingBox: { x: 24, y: 136, width: 312, height: 20 },
              style: {
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Montserrat',
              },
              fills: [{ type: 'SOLID', color: { r: 0, g: 0.24, b: 0.43 } }], // #003E6D
            },

            // Metric 1: Size
            {
              id: 'ai-result-1-7',
              type: 'FRAME',
              name: 'MetricSize',
              absoluteBoundingBox: { x: 24, y: 172, width: 312, height: 56 },
              children: [
                {
                  id: 'ai-result-1-7-1',
                  type: 'TEXT',
                  characters: 'Size',
                  absoluteBoundingBox: { x: 32, y: 180, width: 100, height: 16 },
                  style: { fontSize: 14, fontFamily: 'Montserrat' },
                  fills: [{ type: 'SOLID', color: { r: 0.42, g: 0.45, b: 0.49 } }],
                },
                {
                  id: 'ai-result-1-7-2',
                  type: 'TEXT',
                  characters: 'Large (6-8mm)',
                  absoluteBoundingBox: { x: 236, y: 180, width: 92, height: 16 },
                  style: { fontSize: 14, fontWeight: 'bold', fontFamily: 'Montserrat' },
                  fills: [{ type: 'SOLID', color: { r: 0, g: 0.24, b: 0.43 } }],
                },
                {
                  id: 'ai-result-1-7-3',
                  type: 'TEXT',
                  characters: '95%',
                  absoluteBoundingBox: { x: 304, y: 204, width: 24, height: 12 },
                  style: { fontSize: 10 },
                  fills: [{ type: 'SOLID', color: { r: 0.42, g: 0.45, b: 0.49 } }],
                },
                {
                  id: 'ai-result-1-7-4',
                  type: 'RECTANGLE',
                  name: 'ProgressBar',
                  absoluteBoundingBox: { x: 32, y: 204, width: 265, height: 8 },
                  fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.73, b: 0.51 } }],
                },
              ],
            },

            // Metric 2: Color
            {
              id: 'ai-result-1-8',
              type: 'FRAME',
              name: 'MetricColor',
              absoluteBoundingBox: { x: 24, y: 244, width: 312, height: 56 },
              children: [
                {
                  id: 'ai-result-1-8-1',
                  type: 'TEXT',
                  characters: 'Color',
                  absoluteBoundingBox: { x: 32, y: 252, width: 100, height: 16 },
                  style: { fontSize: 14, fontFamily: 'Montserrat' },
                  fills: [{ type: 'SOLID', color: { r: 0.42, g: 0.45, b: 0.49 } }],
                },
                {
                  id: 'ai-result-1-8-2',
                  type: 'TEXT',
                  characters: 'Golden Yellow',
                  absoluteBoundingBox: { x: 220, y: 252, width: 108, height: 16 },
                  style: { fontSize: 14, fontWeight: 'bold', fontFamily: 'Montserrat' },
                  fills: [{ type: 'SOLID', color: { r: 0, g: 0.24, b: 0.43 } }],
                },
                {
                  id: 'ai-result-1-8-3',
                  type: 'RECTANGLE',
                  name: 'ProgressBar',
                  absoluteBoundingBox: { x: 32, y: 276, width: 246, height: 8 },
                  fills: [{ type: 'SOLID', color: { r: 0.06, g: 0.73, b: 0.51 } }],
                },
              ],
            },

            // Fraud Alert
            {
              id: 'ai-result-1-9',
              type: 'FRAME',
              name: 'FraudAlert',
              absoluteBoundingBox: { x: 24, y: 380, width: 312, height: 48 },
              fills: [
                {
                  type: 'SOLID',
                  color: { r: 0.95, g: 1, b: 0.95 }, // Light green background
                },
              ],
              children: [
                {
                  id: 'ai-result-1-9-1',
                  type: 'TEXT',
                  characters: '✓ No anomalies detected',
                  absoluteBoundingBox: { x: 40, y: 394, width: 280, height: 20 },
                  style: { fontSize: 14, fontWeight: 'bold', fontFamily: 'Montserrat' },
                  fills: [{ type: 'SOLID', color: { r: 0, g: 0.56, b: 0.24 } }], // Green
                },
              ],
            },

            // Recommendation
            {
              id: 'ai-result-1-10',
              type: 'FRAME',
              name: 'Recommendation',
              absoluteBoundingBox: { x: 24, y: 444, width: 312, height: 40 },
              fills: [
                {
                  type: 'SOLID',
                  color: { r: 0.93, g: 0.96, b: 1 }, // Light blue background
                },
              ],
              children: [
                {
                  id: 'ai-result-1-10-1',
                  type: 'TEXT',
                  characters: 'Excellent quality. Consider capturing additional angles.',
                  absoluteBoundingBox: { x: 40, y: 452, width: 280, height: 24 },
                  style: { fontSize: 12, fontStyle: 'italic', fontFamily: 'Lato' },
                  fills: [{ type: 'SOLID', color: { r: 0.22, g: 0.51, b: 0.96 } }], // Blue
                },
              ],
            },
          ],
        },
      ],
    },
  };
}

/**
 * Generate Complete Media Capture Flow JSON
 */
export function generateCompleteFlowJSON(): FigmaDocument {
  const cameraScreen = generateCameraCaptureJSON().document.children[0];
  const resultCard = generateAIResultCardJSON().document.children[0];

  // Position result card next to camera
  if (resultCard.absoluteBoundingBox) {
    resultCard.absoluteBoundingBox.x = 400;
  }

  return {
    document: {
      children: [cameraScreen, resultCard],
    },
  };
}

// ============================================================================
// EXPORT COMPONENT
// ============================================================================

export function FigmaJSONExporter() {
  const [selectedExport, setSelectedExport] = React.useState<
    'camera' | 'result' | 'complete'
  >('complete');
  const [jsonOutput, setJsonOutput] = React.useState('');

  const handleExport = () => {
    let json: FigmaDocument;

    switch (selectedExport) {
      case 'camera':
        json = generateCameraCaptureJSON();
        break;
      case 'result':
        json = generateAIResultCardJSON();
        break;
      case 'complete':
        json = generateCompleteFlowJSON();
        break;
    }

    setJsonOutput(JSON.stringify(json, null, 2));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    alert('JSON copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `figma-${selectedExport}-export.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-4xl mb-2"
          style={{ fontFamily: 'Playfair Display, serif', color: '#003E6D' }}
        >
          Figma JSON Exporter
        </h1>
        <p className="text-gray-600 mb-8" style={{ fontFamily: 'Lato, sans-serif' }}>
          Export TRADIE AI Media Capture components to Figma-compatible JSON format
        </p>

        {/* Selection */}
        <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-xl mb-4" style={{ color: '#003E6D' }}>
            Select Export
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedExport('camera')}
              className={`px-6 py-3 rounded-lg ${
                selectedExport === 'camera'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Camera Screen Only
            </button>
            <button
              onClick={() => setSelectedExport('result')}
              className={`px-6 py-3 rounded-lg ${
                selectedExport === 'result'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              AI Result Card Only
            </button>
            <button
              onClick={() => setSelectedExport('complete')}
              className={`px-6 py-3 rounded-lg ${
                selectedExport === 'complete'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Complete Flow
            </button>
          </div>

          <button
            onClick={handleExport}
            className="mt-4 px-8 py-3 rounded-lg text-white"
            style={{ backgroundColor: '#FFD700' }}
          >
            Generate JSON
          </button>
        </div>

        {/* Output */}
        {jsonOutput && (
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl" style={{ color: '#003E6D' }}>
                Figma JSON Output
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 text-white rounded-lg"
                  style={{ backgroundColor: '#FFD700' }}
                >
                  Download
                </button>
              </div>
            </div>

            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono">
              {jsonOutput}
            </pre>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm mb-2" style={{ color: '#003E6D' }}>
                How to Import to Figma:
              </h3>
              <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                <li>Copy or download the JSON above</li>
                <li>Open Figma and create a new file</li>
                <li>Use Figma Plugin: "JSON to Figma" or "Figma API"</li>
                <li>Paste the JSON or import the file</li>
                <li>Components will be created in your Figma file</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FigmaJSONExporter;
