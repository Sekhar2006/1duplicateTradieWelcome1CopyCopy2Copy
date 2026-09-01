import React from 'react';
import { Maximize2, ZoomIn, ZoomOut, Move, CheckCircle2, AlertCircle } from 'lucide-react';

interface CameraFramingGuideProps {
  mode: 'product' | 'document' | 'quality';
  detectionStatus: 'detecting' | 'aligned' | 'misaligned';
  confidence: number;
  feedbackMessage: string;
  showGrid?: boolean;
  commodityType?: string;
}

export const CameraFramingGuide: React.FC<CameraFramingGuideProps> = ({
  mode,
  detectionStatus,
  confidence,
  feedbackMessage,
  showGrid = true,
  commodityType,
}) => {
  const frameColor =
    detectionStatus === 'aligned' && confidence > 80
      ? '#10B981' // Green
      : detectionStatus === 'misaligned'
      ? '#EF4444' // Red
      : '#FFFFFF'; // White

  const frameSize =
    mode === 'document'
      ? { width: '85%', height: '60%' }
      : mode === 'product'
      ? { width: '70%', height: '70%' }
      : { width: '75%', height: '75%' };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Main Frame */}
      <div
        className="relative transition-all duration-300"
        style={{
          width: frameSize.width,
          height: frameSize.height,
          maxWidth: '600px',
          border: `3px solid ${frameColor}`,
          borderRadius: '16px',
          boxShadow: `0 0 20px ${frameColor}40`,
        }}
      >
        {/* Corner Markers */}
        {[
          { position: 'top-0 left-0', rotation: 0 },
          { position: 'top-0 right-0', rotation: 90 },
          { position: 'bottom-0 left-0', rotation: -90 },
          { position: 'bottom-0 right-0', rotation: 180 },
        ].map((corner, index) => (
          <div
            key={index}
            className={`absolute ${corner.position} w-8 h-8 transition-all duration-300`}
            style={{
              backgroundColor: frameColor,
              transform: `rotate(${corner.rotation}deg)`,
              clipPath: 'polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%)',
            }}
          />
        ))}

        {/* Center Target (for product mode) */}
        {mode === 'product' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full border-2 transition-all duration-300"
              style={{
                borderColor: frameColor,
                borderStyle: 'dashed',
              }}
            >
              <div
                className="w-full h-full rounded-full border-2 transition-all duration-300 animate-pulse"
                style={{
                  borderColor: frameColor,
                  margin: '6px',
                }}
              />
            </div>
          </div>
        )}

        {/* Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-white" />
            ))}
          </div>
        )}

        {/* Alignment Guides */}
        {mode === 'document' && (
          <>
            {/* Horizontal center line */}
            <div
              className="absolute left-0 right-0 h-px opacity-30"
              style={{
                top: '50%',
                backgroundColor: frameColor,
              }}
            />
            {/* Vertical center line */}
            <div
              className="absolute top-0 bottom-0 w-px opacity-30"
              style={{
                left: '50%',
                backgroundColor: frameColor,
              }}
            />
          </>
        )}

        {/* Commodity Type Label */}
        {commodityType && mode === 'product' && (
          <div className="absolute top-4 left-4 pointer-events-auto">
            <div
              className="px-3 py-1 rounded-full text-xs backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(0, 62, 109, 0.8)',
                color: '#FFFFFF',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              {commodityType}
            </div>
          </div>
        )}

        {/* Instructions Overlay */}
        <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
          <div
            className="px-4 py-3 rounded-lg backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              {detectionStatus === 'aligned' && confidence > 80 ? (
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              )}
              <p
                className="text-sm text-white"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {feedbackMessage}
              </p>
            </div>

            {/* Mode-specific instructions */}
            <div className="flex items-center gap-3 text-xs text-gray-300">
              {mode === 'document' && (
                <>
                  <div className="flex items-center gap-1">
                    <Move className="w-3 h-3" />
                    <span>Center document</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    <span>Fill frame</span>
                  </div>
                </>
              )}
              {mode === 'product' && (
                <>
                  <div className="flex items-center gap-1">
                    <ZoomIn className="w-3 h-3" />
                    <span>Get closer</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Move className="w-3 h-3" />
                    <span>Center product</span>
                  </div>
                </>
              )}
              {mode === 'quality' && (
                <>
                  <div className="flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    <span>Show details</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ZoomIn className="w-3 h-3" />
                    <span>Focus on defects</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Confidence Meter */}
        <div className="absolute top-4 right-4 pointer-events-auto">
          <div
            className="px-3 py-2 rounded-lg backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="h-1 w-16 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${confidence}%`,
                      backgroundColor:
                        confidence > 80
                          ? '#10B981'
                          : confidence > 60
                          ? '#F59E0B'
                          : '#EF4444',
                    }}
                  />
                </div>
              </div>
              <span
                className="text-xs text-white"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {confidence}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips (outside frame) */}
      {mode === 'product' && (
        <div className="absolute bottom-20 left-0 right-0 pointer-events-auto">
          <div className="max-w-md mx-auto px-4">
            <div
              className="px-4 py-2 rounded-lg backdrop-blur-md text-center"
              style={{
                backgroundColor: 'rgba(255, 215, 0, 0.2)',
                border: '1px solid rgba(255, 215, 0, 0.4)',
              }}
            >
              <p
                className="text-xs text-white"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                💡 Tip: Ensure good lighting and avoid shadows for best results
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraFramingGuide;
