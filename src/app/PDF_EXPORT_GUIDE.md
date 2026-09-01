# 📄 TRADIE Documentation - PDF Export Guide

Complete guide for exporting all documentation to professional PDF format.

---

## 🚀 Quick Start

### Single Command Export

```bash
pandoc VERSION_77_COMPLETE_DOCUMENTATION.md \
  -o TRADIE_V77_Documentation.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --metadata title="TRADIE Version 77 Documentation" \
  --metadata author="TRADIE Project Team" \
  --metadata date="October 2025" \
  --highlight-style=tango \
  --variable mainfont="Helvetica" \
  --variable monofont="Courier New" \
  --variable fontsize=11pt \
  --variable geometry:margin=1in \
  --css=custom_style.css
```

### Batch Export (All Documentation)

```bash
chmod +x export_to_pdf.sh
./export_to_pdf.sh
```

---

## 📦 Prerequisites

### 1. Install Pandoc

**macOS:**
```bash
brew install pandoc
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install pandoc
```

**Windows:**
- Download from: https://pandoc.org/installing.html
- Run installer

**Verify installation:**
```bash
pandoc --version
```

### 2. Install wkhtmltopdf (PDF Engine)

**macOS:**
```bash
brew install --cask wkhtmltopdf
```

**Ubuntu/Debian:**
```bash
sudo apt-get install wkhtmltopdf
```

**Windows:**
- Download from: https://wkhtmltopdf.org/downloads.html
- Run installer
- Add to PATH

**Verify installation:**
```bash
wkhtmltopdf --version
```

### 3. Verify Files Present

```bash
# Check required files
ls -l VERSION_77_COMPLETE_DOCUMENTATION.md
ls -l custom_style.css
ls -l export_to_pdf.sh
```

---

## 📋 Export Options

### Option 1: Export Main Documentation Only

**Command:**
```bash
pandoc VERSION_77_COMPLETE_DOCUMENTATION.md \
  -o TRADIE_V77_Documentation.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --metadata title="TRADIE Version 77 Documentation" \
  --metadata author="TRADIE Project Team" \
  --metadata date="October 2025" \
  --css=custom_style.css
```

**Output:**
- File: `TRADIE_V77_Documentation.pdf`
- Size: ~2-3 MB
- Pages: ~150-200 pages
- Features: Table of contents, styled formatting

### Option 2: Export All Documentation

**Command:**
```bash
chmod +x export_to_pdf.sh
./export_to_pdf.sh
```

**Output directory:** `./pdf_exports/`

**Files created:**
```
pdf_exports/
├── TRADIE_V77_Documentation.pdf              (Main documentation)
├── TRADIE_Quick_Start_Guide.pdf              (README)
├── TRADIE_Role_System.pdf                    (Role system)
├── TRADIE_KYC_System.pdf                     (KYC documentation)
├── TRADIE_User_Management.pdf                (User management)
├── TRADIE_Producer_Onboarding.pdf            (Producer flow)
├── TRADIE_Quick_Role_Guide.pdf               (Role guide)
├── TRADIE_Design_System.pdf                  (Design system)
├── TRADIE_Motion_System.pdf                  (Animations)
├── TRADIE_Prototype.pdf                      (Prototypes)
├── Design_System_Quick_Start.pdf             (DS quick start)
├── Design_System_Cheat_Sheet.pdf             (DS cheat sheet)
├── Design_System_Visual_Guide.pdf            (DS visual guide)
├── Design_System_Migration_Guide.pdf         (DS migration)
├── TRADIE_Integration_Status.pdf             (Integration)
└── TRADIE_AI_Dashboard.pdf                   (AI dashboard)

Total: 16 PDF files
```

### Option 3: Custom Export (Specific Files)

**Role System Only:**
```bash
pandoc ROLE_SYSTEM_COMPLETE.md \
  -o TRADIE_Role_System.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --css=custom_style.css
```

**Design System Only:**
```bash
pandoc DESIGN_SYSTEM_SUMMARY.md \
  -o TRADIE_Design_System.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --css=custom_style.css
```

**KYC System Only:**
```bash
pandoc KYC_SYSTEM_COMPLETE.md \
  -o TRADIE_KYC_System.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --css=custom_style.css
```

---

## 🎨 Customization Options

### Change Page Size

**A4 (default):**
```bash
--variable geometry:papersize=a4
```

**Letter:**
```bash
--variable geometry:papersize=letter
```

**Legal:**
```bash
--variable geometry:papersize=legal
```

### Change Margins

**Default (1 inch all sides):**
```bash
--variable geometry:margin=1in
```

**Custom margins:**
```bash
--variable geometry:top=1.5in \
--variable geometry:bottom=1.5in \
--variable geometry:left=1in \
--variable geometry:right=1in
```

### Change Font Size

**10pt (smaller):**
```bash
--variable fontsize=10pt
```

**11pt (default):**
```bash
--variable fontsize=11pt
```

**12pt (larger):**
```bash
--variable fontsize=12pt
```

### Change Fonts

**Main font:**
```bash
--variable mainfont="Times New Roman"
```

**Monospace font:**
```bash
--variable monofont="Consolas"
```

**Sans-serif font:**
```bash
--variable sansfont="Arial"
```

### Table of Contents Depth

**Level 2 (default):**
```bash
--toc --toc-depth=2
```

**Level 3 (more detail):**
```bash
--toc --toc-depth=3
```

**Level 4 (maximum detail):**
```bash
--toc --toc-depth=4
```

### Syntax Highlighting

Available styles:
- `tango` (default, colorful)
- `pygments` (classic)
- `kate` (IDE-style)
- `monochrome` (print-friendly)
- `breezedark` (dark theme)
- `espresso` (brown theme)
- `zenburn` (gray theme)
- `haddock` (minimal)

**Change style:**
```bash
--highlight-style=pygments
```

---

## 🛠️ Advanced Options

### Print-Optimized PDF

```bash
pandoc VERSION_77_COMPLETE_DOCUMENTATION.md \
  -o TRADIE_V77_Print.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --toc-depth=3 \
  --metadata title="TRADIE Version 77 Documentation" \
  --variable fontsize=12pt \
  --variable geometry:margin=0.75in \
  --variable mainfont="Times New Roman" \
  --css=custom_style.css \
  --dpi=300
```

**Features:**
- Larger font (12pt) for readability
- Narrower margins (0.75in) to save paper
- High DPI (300) for crisp printing
- Classic serif font

### Screen-Optimized PDF

```bash
pandoc VERSION_77_COMPLETE_DOCUMENTATION.md \
  -o TRADIE_V77_Screen.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --metadata title="TRADIE Version 77 Documentation" \
  --variable fontsize=11pt \
  --variable geometry:margin=1in \
  --variable mainfont="Helvetica" \
  --css=custom_style.css \
  --highlight-style=tango
```

**Features:**
- Sans-serif font for screen reading
- Standard margins
- Colorful syntax highlighting
- Optimized for digital viewing

### Executive Summary Only

Extract just the first few sections:

```bash
# Create temporary file with first 500 lines
head -500 VERSION_77_COMPLETE_DOCUMENTATION.md > temp_summary.md

# Convert to PDF
pandoc temp_summary.md \
  -o TRADIE_V77_Executive_Summary.pdf \
  --pdf-engine=wkhtmltopdf \
  --metadata title="TRADIE V77 - Executive Summary" \
  --css=custom_style.css

# Clean up
rm temp_summary.md
```

---

## 📊 Expected Output

### File Sizes

```
Main Documentation:           2-3 MB    (150-200 pages)
Quick Start Guide:            200-300 KB  (15-20 pages)
Role System:                  300-500 KB  (25-35 pages)
KYC System:                   200-400 KB  (20-30 pages)
User Management:              200-300 KB  (15-25 pages)
Design System:                400-600 KB  (30-40 pages)
Design System Guides:         100-200 KB  (10-15 pages each)
Implementation Docs:          100-200 KB  (10-15 pages each)

Total (all 16 files):         5-8 MB
```

### Processing Time

```
Single file (main doc):       30-60 seconds
All files (batch):           3-5 minutes
```

---

## 🔧 Troubleshooting

### Error: "pandoc: command not found"

**Solution:** Install pandoc
```bash
# macOS
brew install pandoc

# Ubuntu/Debian
sudo apt-get install pandoc

# Windows
# Download from pandoc.org/installing.html
```

### Error: "wkhtmltopdf: command not found"

**Solution:** Install wkhtmltopdf
```bash
# macOS
brew install --cask wkhtmltopdf

# Ubuntu/Debian
sudo apt-get install wkhtmltopdf

# Windows
# Download from wkhtmltopdf.org/downloads.html
```

### Error: "custom_style.css: file not found"

**Solution:** Ensure CSS file is in the same directory
```bash
ls -l custom_style.css

# If missing, the file should be present in project root
```

### Error: "Failed to load PDF"

**Possible causes:**
1. Incomplete conversion (check terminal for errors)
2. File corruption
3. Large file size

**Solution:**
```bash
# Try with smaller sections
pandoc README.md -o test.pdf --pdf-engine=wkhtmltopdf

# If works, the issue is with large file size
# Try splitting main documentation into parts
```

### PDF Missing Images

**Issue:** Images not showing in PDF

**Solution:** Ensure image paths are correct
```bash
# Images should be referenced with relative paths
# Example: ![Logo](./images/logo.png)
```

### Broken Table of Contents

**Issue:** TOC not generated

**Solution:** Add `--toc` flag
```bash
pandoc file.md -o output.pdf --pdf-engine=wkhtmltopdf --toc
```

### Fonts Not Applied

**Issue:** Custom fonts not showing

**Solution:** Use system fonts or install custom fonts
```bash
# List available fonts
fc-list  # Linux/macOS
```

---

## 📝 Alternative Export Formats

### Word Document (.docx)

```bash
pandoc VERSION_77_COMPLETE_DOCUMENTATION.md \
  -o TRADIE_V77_Documentation.docx \
  --toc
```

### HTML (Standalone)

```bash
pandoc VERSION_77_COMPLETE_DOCUMENTATION.md \
  -o TRADIE_V77_Documentation.html \
  --standalone \
  --toc \
  --css=custom_style.css
```

### EPUB (eBook)

```bash
pandoc VERSION_77_COMPLETE_DOCUMENTATION.md \
  -o TRADIE_V77_Documentation.epub \
  --toc \
  --metadata title="TRADIE Platform Documentation"
```

### LaTeX

```bash
pandoc VERSION_77_COMPLETE_DOCUMENTATION.md \
  -o TRADIE_V77_Documentation.tex
```

---

## 🎯 Recommended Workflows

### For Stakeholder Review

```bash
# Create executive summary + full documentation
pandoc VERSION_77_COMPLETE_DOCUMENTATION.md \
  -o TRADIE_V77_Stakeholder_Review.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --toc-depth=2 \
  --variable fontsize=12pt \
  --variable mainfont="Times New Roman" \
  --css=custom_style.css
```

### For Developer Handoff

```bash
# Export all technical documentation
./export_to_pdf.sh

# Create ZIP archive
zip -r TRADIE_V77_Developer_Pack.zip pdf_exports/
```

### For Design Review

```bash
# Export design-specific docs
pandoc DESIGN_SYSTEM_SUMMARY.md -o Design_System.pdf --pdf-engine=wkhtmltopdf --toc --css=custom_style.css
pandoc MOTION_SYSTEM_COMPLETE.md -o Motion_System.pdf --pdf-engine=wkhtmltopdf --toc --css=custom_style.css
pandoc design-system/VISUAL_GUIDE.md -o Visual_Guide.pdf --pdf-engine=wkhtmltopdf --toc --css=custom_style.css

# Combine into single package
zip TRADIE_V77_Design_Pack.zip Design_System.pdf Motion_System.pdf Visual_Guide.pdf
```

---

## 📦 Complete Export Package

Create a comprehensive export with everything:

```bash
#!/bin/bash

# Create directory structure
mkdir -p TRADIE_V77_Complete_Package/{PDFs,DOCs,HTML,Source}

# Export PDFs
./export_to_pdf.sh
mv pdf_exports/* TRADIE_V77_Complete_Package/PDFs/

# Export Word documents
pandoc VERSION_77_COMPLETE_DOCUMENTATION.md -o TRADIE_V77_Complete_Package/DOCs/Complete_Documentation.docx
pandoc README.md -o TRADIE_V77_Complete_Package/DOCs/Quick_Start_Guide.docx

# Export HTML
pandoc VERSION_77_COMPLETE_DOCUMENTATION.md -o TRADIE_V77_Complete_Package/HTML/index.html --standalone --toc --css=custom_style.css

# Copy source files
cp *.md TRADIE_V77_Complete_Package/Source/
cp custom_style.css TRADIE_V77_Complete_Package/

# Create archive
zip -r TRADIE_V77_Complete_Package.zip TRADIE_V77_Complete_Package/

echo "✅ Complete package created: TRADIE_V77_Complete_Package.zip"
```

---

## ✅ Verification Checklist

After export, verify:

- [ ] PDF opens without errors
- [ ] Table of contents is generated
- [ ] All pages are present
- [ ] Formatting is correct
- [ ] Code blocks are readable
- [ ] Tables are formatted properly
- [ ] Links work (if applicable)
- [ ] Images display (if any)
- [ ] Font sizes are appropriate
- [ ] Page breaks are logical
- [ ] Headers/footers are correct (if any)

---

## 📞 Support

**Issue:** Can't generate PDF  
**Solution:** Check prerequisites are installed

**Issue:** Formatting issues  
**Solution:** Modify custom_style.css

**Issue:** Large file size  
**Solution:** Split into multiple files or reduce images

**Issue:** Missing content  
**Solution:** Verify source .md file is complete

---

## 🎉 Success!

Your documentation is now ready for distribution in professional PDF format!

**Next Steps:**
1. Review generated PDFs
2. Share with stakeholders
3. Archive for version control
4. Update as needed

---

**Last Updated:** October 21, 2025  
**Version:** 77  
**Export Tool:** Pandoc with wkhtmltopdf engine
