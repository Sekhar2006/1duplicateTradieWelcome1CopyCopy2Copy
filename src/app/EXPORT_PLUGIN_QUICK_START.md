# Screen Export Plugin - Quick Start Guide 🚀

## ⚡ 30-Second Setup

### 1. Import the Components

```tsx
import ScreenExportPlugin from './components/ScreenExportPlugin';
import WireframeBatchExporter from './components/WireframeBatchExporter';
```

### 2. Add to Your App

```tsx
// Single screen export
<ScreenExportPlugin fileName="My-Screen" />

// Batch export multiple wireframes
<WireframeBatchExporter />
```

**That's it!** The plugin is ready to use. 🎉

---

## 🎯 Common Use Cases

### Export Current Page to PDF
```tsx
<ScreenExportPlugin 
  fileName="TRADIE-Dashboard"
/>
// Click button → Select PDF → Export → Done!
```

### Export Specific Component
```tsx
const myComponentRef = useRef<HTMLDivElement>(null);

<ScreenExportPlugin 
  targetRef={myComponentRef}
  fileName="Producer-Profile"
/>

<div ref={myComponentRef}>
  {/* This specific content will be exported */}
</div>
```

### Export Multiple Wireframes at Once
```tsx
<WireframeBatchExporter />
// Opens dialog → Select screens → Export all to one PDF
```

---

## 📋 Available Export Formats

| Format | Extension | Best For |
|--------|-----------|----------|
| **PDF** | `.pdf` | Documentation, presentations, sharing |
| **Word** | `.doc` | Editable documents, reports |
| **Image** | `.png` | Screenshots, social media, quick sharing |

---

## 🎨 Export Options (All Configurable in UI)

- ✅ **Page Size**: A4, Letter, Legal
- ✅ **Orientation**: Portrait or Landscape
- ✅ **Quality**: Low (fast), Medium, High (best)
- ✅ **Headers/Footers**: With TRADIE branding
- ✅ **Full Page**: Capture scrollable content

---

## 📦 Pre-configured Wireframes (25 total)

The Batch Exporter includes all major TRADIE screens:

### Producer (5)
- Login, Dashboard, Onboarding, Identity, AI Dashboard

### KYC (5)
- Role Selection, Basic Details, ID Verification, Completion, Full System

### Dashboards (4)
- Storage & Sell, Trading, Packaging, Reports

### Quality (3)
- Quality Check, Provenance Tracker, QR Code Manager

### Lot Management (3)
- Create Lot, Tokenization, Wireframes

### Services (2)
- Resources, Commission Agent

### Utilities (3)
- Commit Coins, OTP, Crop Lifecycle

---

## 🔥 Pro Tips

### 1. Named Exports with Dates
```tsx
<ScreenExportPlugin 
  fileName={`Dashboard-${new Date().toISOString().split('T')[0]}`}
/>
// Result: Dashboard-2025-10-24.pdf
```

### 2. High Quality for Documentation
- Select "High" quality
- Enable "Capture full page"
- Include headers and footers

### 3. Quick Screenshots
- Select "Image" format
- Medium quality is usually enough
- Faster than PDF

### 4. Batch Export by Category
1. Open Batch Exporter
2. Click category header (e.g., "Producer")
3. All screens in that category selected
4. Export → Get organized PDF

---

## ✨ Features

### Real-time Progress
- See exactly what's happening
- Progress bar shows completion %
- Toast notifications for each step

### Error Handling
- Graceful fallbacks
- Clear error messages
- Retry capability

### TRADIE Branding
- Automatic design system colors
- Professional headers/footers
- Consistent typography

---

## 🐛 Quick Troubleshooting

**Q: Export is blank?**
- Enable "Capture full page"
- Ensure element is visible on screen

**Q: Large file size?**
- Use Medium or Low quality
- Export to PNG instead of PDF
- Split into multiple exports

**Q: Button not showing?**
- Check imports are correct
- Verify component is rendered
- Check browser console

---

## 📱 Where to Add Export Buttons

### Navigation Bar
```tsx
<nav className="flex justify-between p-4">
  <div>Logo & Nav</div>
  <div className="flex gap-2">
    <ScreenExportPlugin />
    <WireframeBatchExporter />
  </div>
</nav>
```

### Dashboard Header
```tsx
<div className="flex justify-between mb-6">
  <h1>Dashboard</h1>
  <ScreenExportPlugin fileName="Dashboard" />
</div>
```

### Toolbar
```tsx
<div className="toolbar flex gap-2">
  <Button>Settings</Button>
  <ScreenExportPlugin buttonVariant="ghost" />
</div>
```

---

## 🎬 Live Demo

The export buttons are already integrated in the TRADIE App:
1. Go to welcome screen (App.tsx)
2. Look for "Export Screen" and "Batch Export" buttons below the title
3. Click to try!

---

## 📊 What Gets Exported?

### Single Screen Export
- Everything visible in the target element (or full page)
- All styling, colors, images, text
- Maintains TRADIE design system

### Batch Export
- Each selected screen on a separate page
- Screen name header on each page
- Category labels
- Page numbers
- Automatic table of contents (page 1)

---

## 🎉 You're Ready!

Just add the import and component wherever you need export functionality. The plugin handles the rest automatically!

**Need more details?** See `SCREEN_EXPORT_PLUGIN_GUIDE.md` for complete documentation.

---

## 🔗 Quick Links

- **Full Guide**: `/SCREEN_EXPORT_PLUGIN_GUIDE.md`
- **Component 1**: `/components/ScreenExportPlugin.tsx`
- **Component 2**: `/components/WireframeBatchExporter.tsx`
- **Integration**: Already added to `/App.tsx`

Happy exporting! 📄✨
