# AI Media Capture - Complete Customization Guide

## 📋 Overview

This guide shows you how to customize every aspect of the AI Media Capture components to fit your TRADIE app's specific needs.

**Your Components** (in `components/producer-dashboard/`):
- ✅ AIMediaCaptureCamera.tsx (350 lines)
- ✅ AIAnalysisCard.tsx (300 lines)
- ✅ CameraFramingGuide.tsx (150 lines)
- ✅ MediaUploadModal.tsx (450 lines)
- ✅ SimpleWrappers.tsx (400 lines)
- ✅ FigmaJSONExporter.tsx (500 lines)

**Your Utilities** (in `components/producer-dashboard/utils/`):
- ✅ MediaCompressor.ts
- ✅ OfflineMediaCache.ts

---

## 🎯 Quick Customization Index

| What to Customize | Jump to Section |
|-------------------|-----------------|
| Camera colors & styling | [Camera Styling](#1-camera-styling) |
| Camera behavior (auto-capture, etc.) | [Camera Behavior](#2-camera-behavior) |
| Framing guide appearance | [Framing Guide](#3-framing-guide) |
| AI results card layout | [Results Card](#4-results-card) |
| Add new metrics | [Custom Metrics](#5-custom-metrics) |
| Upload modal features | [Upload Modal](#6-upload-modal) |
| Connect to real AI API | [AI Integration](#7-ai-integration) |
| Integrate with Quality Check | [Quality Check](#8-quality-check-integration) |
| Integrate with Lot Creation | [Lot Creation](#9-lot-creation-integration) |
| Change design tokens | [Design Tokens](#10-design-tokens) |
| Add new commodity types | [Commodity Config](#11-commodity-config) |
| Offline behavior | [Offline Support](#12-offline-support) |

---

## 1. Camera Styling

### **File**: `components/producer-dashboard/AIMediaCaptureCamera.tsx`

### **Change Camera Background Color**

```tsx
// Line 315: Current implementation
<video
  ref={videoRef}
  autoPlay
  playsInline
  muted
  className="h-full w-full object-cover"
  style={{ backgroundColor: '#000' }}  // ← Change this
/>

// Customization options:
style={{ backgroundColor: '#1a1a1a' }}  // Darker black
style={{ backgroundColor: '#003E6D' }}  // TRADIE blue
style={{ 
  background: 'linear-gradient(135deg, #F7FAFC 0%, #D9F2FF 100%)' 
}}  // TRADIE gradient
```

---

### **Change Capture Button Color**

```tsx
// Line 445: Current implementation
<Button
  onClick={handleCapture}
  className="w-20 h-20 rounded-full"
  style={{ backgroundColor: '#FFD700' }}  // ← Gold accent
>
  <Camera className="w-8 h-8 text-white" />
</Button>

// Customization: Use your design system
<DSButton  // Use your design system button
  onClick={handleCapture}
  variant="primary"
  size="lg"
  className="w-20 h-20 rounded-full"
>
  <Camera className="w-8 h-8" />
</DSButton>
```

---

### **Change Instruction Text**

```tsx
// Line 471: Current implementation
<p className="text-white text-sm text-center">
  {autoCapture
    ? 'Camera will auto-capture when aligned'
    : 'Frame your produce under good lighting'
  }
</p>

// Customization: Add your branding
<p 
  className="text-white text-sm text-center"
  style={{ fontFamily: 'Montserrat, sans-serif' }}  // Your design system
>
  {autoCapture
    ? '🎯 Auto-capture enabled - Align your produce'
    : '📸 Frame your commodity in the box'
  }
</p>
```

---

### **Change Confidence Meter Colors**

```tsx
// Line 355: Current implementation
const getConfidenceColor = (confidence: number) => {
  if (confidence >= 90) return '#10B981';  // Green
  if (confidence >= 70) return '#F59E0B';  // Yellow
  return '#EF4444';  // Red
};

// Customization: Use TRADIE colors
const getConfidenceColor = (confidence: number) => {
  if (confidence >= 90) return '#10B981';  // Keep green
  if (confidence >= 70) return '#FFD700';  // TRADIE gold
  return '#EF4444';  // Keep red
};
```

---

## 2. Camera Behavior

### **File**: `components/producer-dashboard/AIMediaCaptureCamera.tsx`

### **Change Auto-Capture Threshold**

```tsx
// Line 145: Current threshold
useEffect(() => {
  if (autoCapture && detection.confidence >= 90) {  // ← 90% threshold
    handleCapture();
  }
}, [detection.confidence, autoCapture]);

// Customization: More lenient
if (autoCapture && detection.confidence >= 80) {  // 80% threshold
  handleCapture();
}

// Customization: Stricter
if (autoCapture && detection.confidence >= 95) {  // 95% threshold
  handleCapture();
}
```

---

### **Disable Auto-Capture by Default**

```tsx
// Line 65: Current default
const [autoCapture, setAutoCapture] = useState(false);  // ← Already disabled

// Or make it a prop:
interface AIMediaCaptureCameraProps {
  onCapture: (image: CapturedImage) => void;
  onClose: () => void;
  mode?: 'product' | 'document' | 'quality';
  autoCapture?: boolean;  // ← Add this
  autoCaptureDefault?: boolean;  // ← Control default
}

// Then use:
const [autoCapture, setAutoCapture] = useState(
  props.autoCaptureDefault ?? false
);
```

---

### **Change Camera Facing Direction**

```tsx
// Line 92: Current default (rear camera)
const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

// Customization: Default to front camera
const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

// Or make it smart based on mode:
const [facingMode, setFacingMode] = useState<'user' | 'environment'>(
  mode === 'document' ? 'environment' : 'user'
);
```

---

### **Add Custom Capture Sound**

```tsx
// Add after line 120:
const playCaptureSoundCustom = () => {
  const audio = new Audio('/sounds/camera-shutter.mp3');  // Add your sound file
  audio.play().catch(err => console.log('Sound play failed:', err));
};

// Then in handleCapture function (line 185):
const handleCapture = async () => {
  playCaptureSoundCustom();  // Play sound
  // ... rest of capture logic
};
```

---

## 3. Framing Guide

### **File**: `components/producer-dashboard/CameraFramingGuide.tsx`

### **Change Frame Colors**

```tsx
// Line 75: Current colors
const getFrameColor = () => {
  if (detectionStatus === 'aligned') return '#10B981';  // Green
  if (detectionStatus === 'detecting') return '#F59E0B';  // Yellow
  return '#6B7280';  // Gray
};

// Customization: TRADIE colors
const getFrameColor = () => {
  if (detectionStatus === 'aligned') return '#10B981';  // Green
  if (detectionStatus === 'detecting') return '#FFD700';  // TRADIE gold
  return '#003E6D';  // TRADIE blue
};
```

---

### **Change Frame Size**

```tsx
// Line 125: Current frame dimensions
<div
  className="absolute inset-0 border-4 rounded-lg"
  style={{
    borderColor: getFrameColor(),
    width: '75%',    // ← Change width
    height: '50%',   // ← Change height
    margin: 'auto',
    top: '25%',
  }}
/>

// Customization: Larger frame
style={{
  width: '85%',    // Wider
  height: '60%',   // Taller
  margin: 'auto',
  top: '20%',
}}

// Customization: Square frame
style={{
  width: '70%',
  height: '70%',   // Same as width
  margin: 'auto',
  top: '15%',
}}
```

---

### **Add Custom Feedback Messages**

```tsx
// Line 42: Current messages
const getFeedbackMessage = () => {
  switch (mode) {
    case 'product':
      return confidence >= 90 
        ? '✓ Perfect alignment!' 
        : 'Center your produce in the frame';
    case 'document':
      return confidence >= 90 
        ? '✓ Document clear!' 
        : 'Align document edges with frame';
    default:
      return 'Position item in frame';
  }
};

// Customization: Commodity-specific
const getFeedbackMessage = () => {
  if (confidence >= 90) return '✓ Perfect - Ready to capture!';
  if (confidence >= 70) return '⚠️ Almost there - Hold steady...';
  if (confidence >= 50) return '📍 Move closer to align';
  return '🔍 Center your commodity in the frame';
};
```

---

## 4. Results Card

### **File**: `components/producer-dashboard/AIAnalysisCard.tsx`

### **Change Card Layout**

```tsx
// Line 90: Current layout
<Card className="w-full max-w-2xl mx-auto overflow-hidden">
  {/* Header */}
  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
    {/* Title, icon, confidence */}
  </div>
  
  {/* Metrics */}
  <div className="p-6 space-y-4">
    {/* Size, Color, Quality */}
  </div>
  
  {/* Fraud Alert */}
  {/* Recommendation */}
  {/* Actions */}
</Card>

// Customization: Compact layout
<Card className="w-full max-w-md mx-auto">  {/* Smaller */}
  <div className="p-4">  {/* Less padding */}
    <h3 className="text-lg mb-3">{title}</h3>  {/* Smaller title */}
    {/* Compact metrics */}
  </div>
</Card>

// Customization: Full-width layout
<Card className="w-full">  {/* No max-width */}
  <div className="grid grid-cols-2 gap-4">  {/* 2-column grid */}
    <div>{/* Left: Metrics */}</div>
    <div>{/* Right: Image & Actions */}</div>
  </div>
</Card>
```

---

### **Change Metric Display**

```tsx
// Line 115: Current metric display
{metrics.map((metric, index) => (
  <div key={index} className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm">{metric.label}</span>
      <span className="text-base font-semibold">{metric.value}</span>
    </div>
    <Progress value={metric.confidence} className="h-2" />
  </div>
))}

// Customization: Horizontal bars with icons
{metrics.map((metric, index) => (
  <div key={index} className="flex items-center gap-3">
    {metric.icon && <div className="text-blue-600">{metric.icon}</div>}
    <div className="flex-1">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-600">{metric.label}</span>
        <span className="text-xs font-bold">{metric.confidence}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500"
          style={{ width: `${metric.confidence}%` }}
        />
      </div>
    </div>
    <span className="text-sm font-semibold min-w-[100px] text-right">
      {metric.value}
    </span>
  </div>
))}
```

---

### **Change Fraud Alert Styling**

```tsx
// Line 147: Current fraud alert
{fraudAlert && (
  <div
    className={`p-4 rounded-lg border-2 ${
      fraudAlert.severity === 'high'
        ? 'bg-red-50 border-red-200'
        : fraudAlert.severity === 'medium'
        ? 'bg-yellow-50 border-yellow-200'
        : 'bg-green-50 border-green-200'
    }`}
  >
    <p>{fraudAlert.message}</p>
  </div>
)}

// Customization: Banner style
{fraudAlert && fraudAlert.severity === 'high' && (
  <div className="bg-red-600 text-white p-4 shadow-lg">
    <div className="flex items-center gap-3">
      <AlertCircle className="w-6 h-6" />
      <div>
        <p className="font-bold">⚠️ FRAUD ALERT</p>
        <p className="text-sm">{fraudAlert.message}</p>
      </div>
    </div>
  </div>
)}

// Customization: TRADIE style
{fraudAlert && (
  <DSAlert  // Use your design system
    variant={fraudAlert.severity === 'high' ? 'destructive' : 'default'}
    className="my-4"
  >
    {fraudAlert.message}
  </DSAlert>
)}
```

---

## 5. Custom Metrics

### **Add New Metrics to AI Results**

```tsx
// In your screen component:
import { AIAnalysisCard } from './components/producer-dashboard/AIAnalysisCard';
import { Ruler, Eye, Sparkles, Droplets, Leaf, TrendingUp } from 'lucide-react';

// Add custom metrics:
const customMetrics = [
  // Existing metrics
  { label: 'Size', value: 'Large (6-8mm)', confidence: 95, icon: <Ruler /> },
  { label: 'Color', value: 'Golden Yellow', confidence: 92, icon: <Eye /> },
  { label: 'Quality', value: 'Premium Grade', confidence: 88, icon: <Sparkles /> },
  
  // NEW: Moisture content
  { 
    label: 'Moisture', 
    value: '12.5%', 
    confidence: 90, 
    icon: <Droplets />,
    trend: 'stable'  // 'up' | 'down' | 'stable'
  },
  
  // NEW: Freshness
  { 
    label: 'Freshness', 
    value: 'Very Fresh', 
    confidence: 94, 
    icon: <Leaf />,
    trend: 'up'
  },
  
  // NEW: Market Grade
  { 
    label: 'Market Grade', 
    value: 'Grade A', 
    confidence: 91, 
    icon: <TrendingUp />,
    trend: 'up'
  },
];

// Use in component:
<AIAnalysisCard
  metrics={customMetrics}
  // ... other props
/>
```

---

### **Add Metric Trends**

```tsx
// Modify AIAnalysisCard.tsx (line 115):
{metrics.map((metric, index) => (
  <div key={index}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {metric.icon}
        <span className="text-sm">{metric.label}</span>
        
        {/* NEW: Trend indicator */}
        {metric.trend && (
          <span className="text-xs">
            {metric.trend === 'up' && '📈'}
            {metric.trend === 'down' && '📉'}
            {metric.trend === 'stable' && '➡️'}
          </span>
        )}
      </div>
      <span className="text-base font-semibold">{metric.value}</span>
    </div>
    <Progress value={metric.confidence} className="h-2" />
  </div>
))}
```

---

## 6. Upload Modal

### **File**: `components/producer-dashboard/MediaUploadModal.tsx`

### **Change Max Files Allowed**

```tsx
// In your screen component:
<MediaUploadModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onUploadComplete={handleUploadComplete}
  maxFiles={5}  // ← Change this (default: 5)
  
  // Options:
  maxFiles={1}   // Single file only
  maxFiles={10}  // Up to 10 files
  maxFiles={20}  // Bulk upload
/>
```

---

### **Change Accepted File Types**

```tsx
// Line 245: Current implementation
<input
  type="file"
  id="file-upload"
  accept="image/*,video/*"  // ← All images and videos
  multiple
  onChange={handleFileSelect}
/>

// Customization: Images only
accept="image/jpeg,image/png,image/webp"

// Customization: Videos only
accept="video/mp4,video/quicktime"

// Customization: Add PDFs for documents
accept="image/*,application/pdf"
```

---

### **Change Upload Button Text**

```tsx
// Line 252: Current text
<DSButton
  variant="outline"
  onClick={() => document.getElementById('file-upload')?.click()}
>
  <Upload className="w-4 h-4 mr-2" />
  Browse Files
</DSButton>

// Customization: Custom text
<DSButton variant="outline" onClick={...}>
  <Upload className="w-4 h-4 mr-2" />
  Upload Commodity Photos  {/* Custom text */}
</DSButton>

// Customization: Icon only
<DSButton variant="outline" size="icon" onClick={...}>
  <Upload className="w-4 h-4" />
</DSButton>
```

---

### **Add Custom Validation**

```tsx
// Add after line 155:
const validateFile = (file: File): boolean => {
  // Max file size: 10MB
  if (file.size > 10 * 1024 * 1024) {
    toast.error(`${file.name} is too large (max 10MB)`);
    return false;
  }
  
  // Min dimensions for images
  if (file.type.startsWith('image/')) {
    const img = new Image();
    img.onload = () => {
      if (img.width < 640 || img.height < 480) {
        toast.error(`${file.name} resolution too low (min 640x480)`);
        return false;
      }
    };
    img.src = URL.createObjectURL(file);
  }
  
  return true;
};

// Then in handleFileSelect (line 180):
const validFiles = Array.from(selectedFiles).filter(validateFile);
```

---

## 7. AI Integration

### **Connect to Real Grok AI API**

You already have GrokAIService! Integrate it:

```tsx
// File: components/producer-dashboard/GrokAIService.tsx (already exists!)

// In your screen component:
import { analyzeImage } from './components/producer-dashboard/GrokAIService';

const handleCapture = async (image: CapturedImage) => {
  try {
    // Show loading
    setIsAnalyzing(true);
    
    // Call real Grok AI API
    const result = await analyzeImage(
      image.dataUrl,
      'commodity',  // analysis type
      {
        commodity: 'wheat',
        grade: 'premium',
        // ... other metadata
      }
    );
    
    // Convert to your format
    const metrics = [
      { label: 'Size', value: result.size, confidence: result.sizeConfidence },
      { label: 'Color', value: result.color, confidence: result.colorConfidence },
      { label: 'Quality', value: result.quality, confidence: result.qualityConfidence },
      { label: 'Moisture', value: result.moisture, confidence: result.moistureConfidence },
    ];
    
    const fraudAlert = result.fraudScore > 0.7 ? {
      severity: 'high',
      message: result.fraudReason,
    } : null;
    
    setAnalysisResults({ metrics, fraudAlert, recommendation: result.recommendation });
    
  } catch (error) {
    console.error('AI analysis failed:', error);
    toast.error('AI analysis failed. Please try again.');
  } finally {
    setIsAnalyzing(false);
  }
};
```

---

### **Connect to ChatGPT for Recommendations**

```tsx
// You have ChatGPT integration! Use it:
import { ChatGPTIntegrationDemo } from './components/ChatGPTIntegrationDemo';

// In your analysis results:
const getRecommendation = async (metrics: Metric[]) => {
  const prompt = `Analyze this commodity:
  - Size: ${metrics[0].value} (${metrics[0].confidence}% confidence)
  - Color: ${metrics[1].value} (${metrics[1].confidence}% confidence)
  - Quality: ${metrics[2].value} (${metrics[2].confidence}% confidence)
  
  Provide a brief recommendation for the farmer.`;
  
  // Call ChatGPT API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    }),
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
};
```

---

## 8. Quality Check Integration

### **Integrate with Existing Quality Check Workflow**

```tsx
// File: components/producer-dashboard/QualityCheckWorkflow.tsx (already exists!)

// Combine AI Media Capture with Quality Check:
import { AIMediaCaptureCamera } from './components/producer-dashboard/AIMediaCaptureCamera';
import { QualityCheckWorkflow } from './components/producer-dashboard/QualityCheckWorkflow';
import { QualityCheckAPI } from './components/producer-dashboard/QualityCheckAPI';

function EnhancedQualityCheck() {
  const [step, setStep] = useState<'camera' | 'analysis' | 'form' | 'submit'>('camera');
  const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(null);
  const [aiResults, setAiResults] = useState<any>(null);

  // Step 1: Capture with AI
  if (step === 'camera') {
    return (
      <AIMediaCaptureCamera
        onCapture={(img) => {
          setCapturedImage(img);
          setStep('analysis');
          // Run AI analysis
          analyzeImage(img).then(results => {
            setAiResults(results);
            setStep('form');
          });
        }}
        onClose={() => {}}
        mode="quality"
      />
    );
  }

  // Step 2: Show AI results
  if (step === 'analysis') {
    return <div>Analyzing...</div>;
  }

  // Step 3: Quality check form (pre-filled with AI data)
  if (step === 'form') {
    return (
      <QualityCheckWorkflow
        initialData={{
          // Pre-fill with AI results
          size: aiResults.size,
          color: aiResults.color,
          quality: aiResults.quality,
          moisture: aiResults.moisture,
          imageUrl: capturedImage?.dataUrl,
        }}
        onSubmit={async (data) => {
          // Submit to backend
          await QualityCheckAPI.submitQualityCheck({
            ...data,
            aiConfidence: aiResults.overallConfidence,
            fraudScore: aiResults.fraudScore,
          });
          setStep('submit');
        }}
      />
    );
  }

  // Step 4: Success
  return <div>Quality check submitted! ✅</div>;
}
```

---

## 9. Lot Creation Integration

### **Integrate with Create Lot Workflow**

```tsx
// File: components/producer-dashboard/CreateLotWorkflow.tsx (already exists!)

// Add AI quality assessment to lot creation:
import { AIMediaCaptureCamera } from './components/producer-dashboard/AIMediaCaptureCamera';
import { CreateLotWorkflow } from './components/producer-dashboard/CreateLotWorkflow';

function EnhancedLotCreation() {
  const [lotData, setLotData] = useState({
    commodity: '',
    quantity: 0,
    qualityGrade: '',
    photos: [] as string[],
    aiAssessment: null as any,
  });

  return (
    <CreateLotWorkflow
      // Add AI photo capture step
      renderPhotoCapture={() => (
        <AIMediaCaptureCamera
          onCapture={async (img) => {
            // Analyze image
            const aiResults = await analyzeImage(img.dataUrl);
            
            // Update lot data with AI results
            setLotData(prev => ({
              ...prev,
              photos: [...prev.photos, img.dataUrl],
              qualityGrade: aiResults.quality,  // Auto-set grade
              aiAssessment: aiResults,
            }));
          }}
          onClose={() => {}}
          mode="product"
        />
      )}
      
      // Pre-fill form with AI data
      initialData={lotData}
      
      onSubmit={(data) => {
        // Submit lot with AI assessment
        console.log('Creating lot with AI data:', data);
      }}
    />
  );
}
```

---

## 10. Design Tokens

### **Change Colors Using Design System**

```tsx
// File: design-system/tokens.ts (already exists!)

// Update tokens:
export const tokens = {
  colors: {
    primary: '#003E6D',      // TRADIE blue
    accent: '#FFD700',       // TRADIE gold
    success: '#10B981',      // Green (keep)
    warning: '#FFD700',      // Use gold instead of yellow
    error: '#EF4444',        // Red (keep)
    // ... rest
  },
};

// Then in your components:
import { useDesignTokens } from './design-system/hooks/useDesignTokens';

function MyComponent() {
  const tokens = useDesignTokens();
  
  return (
    <div style={{ backgroundColor: tokens.colors.primary }}>
      <button style={{ backgroundColor: tokens.colors.accent }}>
        Capture
      </button>
    </div>
  );
}
```

---

### **Change Typography**

```tsx
// File: styles/globals.css (already exists!)

// Add to @layer base:
@layer base {
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;  // ← Your headings font
    color: #003E6D;  // TRADIE blue
  }
  
  button, label, .label {
    font-family: 'Montserrat', sans-serif;  // ← Your labels font
  }
  
  body, p, span {
    font-family: 'Lato', sans-serif;  // ← Your body font
  }
}

// No need to change component code - it inherits!
```

---

## 11. Commodity Config

### **Add New Commodities**

```tsx
// File: components/producer-dashboard/commodity-config.json (already exists!)

// Add your commodities:
{
  "commodities": [
    {
      "id": "wheat",
      "name": "Wheat",
      "icon": "🌾",
      "qualityChecks": [
        {
          "id": "moisture",
          "label": "Moisture Content",
          "type": "number",
          "unit": "%",
          "min": 8,
          "max": 14,
          "optimal": 12
        },
        {
          "id": "protein",
          "label": "Protein Content",
          "type": "number",
          "unit": "%",
          "min": 10,
          "max": 15,
          "optimal": 12.5
        },
        {
          "id": "size",
          "label": "Grain Size",
          "type": "select",
          "options": ["Small", "Medium", "Large", "Extra Large"]
        }
      ]
    },
    // Add more commodities...
  ]
}
```

---

### **Use Commodity Config in AI Analysis**

```tsx
// In your analysis component:
import commodityConfig from './components/producer-dashboard/commodity-config.json';

const analyzeWithConfig = async (image: string, commodityId: string) => {
  // Get commodity config
  const commodity = commodityConfig.commodities.find(c => c.id === commodityId);
  
  if (!commodity) {
    throw new Error('Commodity not found');
  }
  
  // Analyze based on config
  const metrics = commodity.qualityChecks.map(check => ({
    label: check.label,
    value: '...', // AI result
    confidence: 90,
    optimal: check.optimal,
    unit: check.unit,
  }));
  
  return { metrics, commodity };
};
```

---

## 12. Offline Support

### **Customize Offline Behavior**

```tsx
// File: components/producer-dashboard/utils/OfflineMediaCache.ts (already exists!)

// Use in your component:
import { OfflineMediaCache } from './components/producer-dashboard/utils/OfflineMediaCache';

const cache = new OfflineMediaCache();

// Save for offline
const handleCapture = async (image: CapturedImage) => {
  try {
    // Try to analyze online
    const results = await analyzeImage(image.dataUrl);
    setResults(results);
  } catch (error) {
    // Save for offline processing
    await cache.saveMedia({
      id: Date.now().toString(),
      dataUrl: image.dataUrl,
      type: 'quality-check',
      metadata: {
        commodity: 'wheat',
        timestamp: new Date().toISOString(),
      },
    });
    
    toast.info('Saved offline. Will sync when online.');
  }
};

// Sync when online
useEffect(() => {
  const handleOnline = async () => {
    const pending = await cache.getPendingUploads();
    
    for (const item of pending) {
      try {
        await analyzeImage(item.dataUrl);
        await cache.markAsUploaded(item.id);
        toast.success(`Synced ${pending.length} items`);
      } catch (error) {
        console.error('Sync failed:', error);
      }
    }
  };
  
  window.addEventListener('online', handleOnline);
  return () => window.removeEventListener('online', handleOnline);
}, []);
```

---

## 13. Complete Integration Example

### **Full Screen with All Features**

```tsx
// Create: components/producer-dashboard/EnhancedQualityCheckWithAI.tsx

import React, { useState } from 'react';
import { AIMediaCaptureCamera } from './AIMediaCaptureCamera';
import { AIAnalysisCard } from './AIAnalysisCard';
import { MediaUploadModal } from './MediaUploadModal';
import { QualityCheckAPI } from './QualityCheckAPI';
import { analyzeImage } from './GrokAIService';
import { OfflineMediaCache } from './utils/OfflineMediaCache';
import { DSButton } from '../../design-system/components/DSButton';
import { DSCard } from '../../design-system/components/DSCard';
import { toast } from 'sonner@2.0.3';

export function EnhancedQualityCheckWithAI() {
  const [step, setStep] = useState<'start' | 'camera' | 'upload' | 'analysis' | 'review' | 'done'>('start');
  const [capturedImages, setCapturedImages] = useState<any[]>([]);
  const [aiResults, setAiResults] = useState<any>(null);
  const [commodityType, setCommodityType] = useState('wheat');

  // Step 1: Start screen
  if (step === 'start') {
    return (
      <div className="p-6">
        <h1 className="text-3xl mb-6">Quality Check with AI</h1>
        
        <DSCard className="p-6 mb-4">
          <h2 className="text-xl mb-4">Select Commodity</h2>
          <select
            value={commodityType}
            onChange={(e) => setCommodityType(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="wheat">🌾 Wheat</option>
            <option value="rice">🌾 Rice</option>
            <option value="corn">🌽 Corn</option>
          </select>
        </DSCard>

        <DSButton
          onClick={() => setStep('camera')}
          className="w-full"
          size="lg"
        >
          Start AI Quality Check
        </DSButton>
      </div>
    );
  }

  // Step 2: Camera capture
  if (step === 'camera') {
    return (
      <AIMediaCaptureCamera
        onCapture={async (img) => {
          setCapturedImages([img]);
          setStep('analysis');
          
          // Analyze with AI
          try {
            const results = await analyzeImage(img.dataUrl, 'commodity', {
              commodity: commodityType,
            });
            setAiResults(results);
            setStep('review');
          } catch (error) {
            toast.error('Analysis failed. Saved offline.');
            // Save offline
            const cache = new OfflineMediaCache();
            await cache.saveMedia({
              id: Date.now().toString(),
              dataUrl: img.dataUrl,
              type: 'quality-check',
              metadata: { commodity: commodityType },
            });
          }
        }}
        onClose={() => setStep('start')}
        mode="quality"
        autoCapture={true}
      />
    );
  }

  // Step 3: Analyzing
  if (step === 'analysis') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🔄</div>
          <p className="text-xl">Analyzing with Grok AI...</p>
        </div>
      </div>
    );
  }

  // Step 4: Review results
  if (step === 'review' && aiResults) {
    return (
      <div className="p-6">
        <AIAnalysisCard
          title="AI Quality Assessment"
          metrics={[
            { label: 'Size', value: aiResults.size, confidence: aiResults.sizeConfidence },
            { label: 'Color', value: aiResults.color, confidence: aiResults.colorConfidence },
            { label: 'Quality', value: aiResults.quality, confidence: aiResults.qualityConfidence },
            { label: 'Moisture', value: aiResults.moisture, confidence: aiResults.moistureConfidence },
          ]}
          fraudAlert={aiResults.fraudScore > 0.7 ? {
            severity: 'high',
            message: aiResults.fraudReason,
          } : {
            severity: 'low',
            message: 'No anomalies detected',
          }}
          recommendation={aiResults.recommendation}
          imageUrl={capturedImages[0]?.dataUrl}
          timestamp={new Date()}
          processingTime={aiResults.processingTime}
        />

        <div className="mt-6 flex gap-4">
          <DSButton
            variant="outline"
            onClick={() => {
              setCapturedImages([]);
              setAiResults(null);
              setStep('camera');
            }}
            className="flex-1"
          >
            Retake Photo
          </DSButton>
          
          <DSButton
            onClick={async () => {
              // Submit to backend
              try {
                await QualityCheckAPI.submitQualityCheck({
                  commodity: commodityType,
                  metrics: aiResults,
                  images: capturedImages.map(img => img.dataUrl),
                  aiConfidence: aiResults.overallConfidence,
                  timestamp: new Date().toISOString(),
                });
                toast.success('Quality check submitted!');
                setStep('done');
              } catch (error) {
                toast.error('Submission failed');
              }
            }}
            className="flex-1"
          >
            Submit Quality Check
          </DSButton>
        </div>
      </div>
    );
  }

  // Step 5: Done
  if (step === 'done') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl mb-4">Quality Check Complete!</h2>
          <DSButton onClick={() => {
            setCapturedImages([]);
            setAiResults(null);
            setStep('start');
          }}>
            Start New Check
          </DSButton>
        </div>
      </div>
    );
  }

  return null;
}
```

---

## 🎯 Quick Customization Checklist

Use this checklist to track your customizations:

- [ ] Camera background color changed
- [ ] Capture button styled with DSButton
- [ ] Instruction text updated with branding
- [ ] Auto-capture threshold adjusted
- [ ] Framing guide colors customized
- [ ] AI results card layout modified
- [ ] Custom metrics added (moisture, freshness, etc.)
- [ ] Fraud alert styling updated
- [ ] Upload modal max files configured
- [ ] Accepted file types restricted
- [ ] Real Grok AI API connected
- [ ] ChatGPT recommendations integrated
- [ ] Quality Check workflow integrated
- [ ] Lot Creation flow integrated
- [ ] Design tokens updated
- [ ] Commodity config added
- [ ] Offline support configured
- [ ] Complete flow tested

---

## 📚 Files to Edit

Quick reference for which files to edit:

| What to Change | File to Edit |
|----------------|--------------|
| Camera styling/behavior | `components/producer-dashboard/AIMediaCaptureCamera.tsx` |
| Framing guide | `components/producer-dashboard/CameraFramingGuide.tsx` |
| Results card layout | `components/producer-dashboard/AIAnalysisCard.tsx` |
| Upload modal | `components/producer-dashboard/MediaUploadModal.tsx` |
| Simple interface | `components/producer-dashboard/SimpleWrappers.tsx` |
| Design colors | `design-system/tokens.ts` |
| Typography | `styles/globals.css` |
| Commodities | `components/producer-dashboard/commodity-config.json` |
| AI integration | `components/producer-dashboard/GrokAIService.tsx` |
| Offline cache | `components/producer-dashboard/utils/OfflineMediaCache.ts` |

---

## ✅ Next Steps

1. **Choose what to customize** (use the index above)
2. **Open the file** (see "Files to Edit" section)
3. **Make the change** (copy examples from this guide)
4. **Test in your app**
5. **Repeat!**

---

**Need help with a specific customization?** Let me know which section you want to dive deeper into!
