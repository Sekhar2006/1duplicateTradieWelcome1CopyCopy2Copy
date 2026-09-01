#!/bin/bash

# ========================================
# TRADIE Documentation PDF Export Script
# ========================================

echo "🚀 Starting TRADIE Documentation Export..."

# Create output directory
mkdir -p pdf_exports

# ============================================
# Main Documentation Export (wkhtmltopdf)
# ============================================

echo "📄 Exporting VERSION_77_COMPLETE_DOCUMENTATION.md..."

pandoc VERSION_77_COMPLETE_DOCUMENTATION.md \
  -o pdf_exports/TRADIE_V77_Documentation.pdf \
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

echo "✅ Main documentation exported!"

# ============================================
# Quick Start Guide
# ============================================

echo "📘 Exporting README.md..."

pandoc README.md \
  -o pdf_exports/TRADIE_Quick_Start_Guide.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --metadata title="TRADIE Quick Start Guide" \
  --metadata author="TRADIE Project Team" \
  --metadata date="October 2025" \
  --css=custom_style.css

echo "✅ Quick start guide exported!"

# ============================================
# Feature Documentation
# ============================================

echo "📊 Exporting feature documentation..."

# Role System
pandoc ROLE_SYSTEM_COMPLETE.md \
  -o pdf_exports/TRADIE_Role_System.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --metadata title="TRADIE Role System" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

# KYC System
pandoc KYC_SYSTEM_COMPLETE.md \
  -o pdf_exports/TRADIE_KYC_System.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --metadata title="TRADIE KYC System" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

# User Management
pandoc USER_MANAGEMENT_COMPLETE.md \
  -o pdf_exports/TRADIE_User_Management.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --metadata title="TRADIE User Management" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

# Producer Onboarding
pandoc PRODUCER_ONBOARDING_COMPLETE.md \
  -o pdf_exports/TRADIE_Producer_Onboarding.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --metadata title="TRADIE Producer Onboarding" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

# Quick Role Guide
pandoc QUICK_ROLE_GUIDE.md \
  -o pdf_exports/TRADIE_Quick_Role_Guide.pdf \
  --pdf-engine=wkhtmltopdf \
  --metadata title="TRADIE Quick Role Guide" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

echo "✅ Feature documentation exported!"

# ============================================
# Design Documentation
# ============================================

echo "🎨 Exporting design documentation..."

# Design System Summary
pandoc DESIGN_SYSTEM_SUMMARY.md \
  -o pdf_exports/TRADIE_Design_System.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --metadata title="TRADIE Design System" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

# Motion System
pandoc MOTION_SYSTEM_COMPLETE.md \
  -o pdf_exports/TRADIE_Motion_System.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --metadata title="TRADIE Motion System" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

# Prototype
pandoc PROTOTYPE_COMPLETE.md \
  -o pdf_exports/TRADIE_Prototype.pdf \
  --pdf-engine=wkhtmltopdf \
  --metadata title="TRADIE Prototype Specifications" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

echo "✅ Design documentation exported!"

# ============================================
# Design System Guides
# ============================================

echo "📚 Exporting design system guides..."

# Quick Start
pandoc design-system/QUICK_START.md \
  -o pdf_exports/Design_System_Quick_Start.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --metadata title="Design System Quick Start" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

# Cheat Sheet
pandoc design-system/CHEAT_SHEET.md \
  -o pdf_exports/Design_System_Cheat_Sheet.pdf \
  --pdf-engine=wkhtmltopdf \
  --metadata title="Design System Cheat Sheet" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

# Visual Guide
pandoc design-system/VISUAL_GUIDE.md \
  -o pdf_exports/Design_System_Visual_Guide.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --metadata title="Design System Visual Guide" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

# Migration Guide
pandoc design-system/MIGRATION_GUIDE.md \
  -o pdf_exports/Design_System_Migration_Guide.pdf \
  --pdf-engine=wkhtmltopdf \
  --toc \
  --metadata title="Design System Migration Guide" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

echo "✅ Design system guides exported!"

# ============================================
# Implementation Details
# ============================================

echo "🔧 Exporting implementation documentation..."

# Integration Status
pandoc INTEGRATION_STATUS.md \
  -o pdf_exports/TRADIE_Integration_Status.pdf \
  --pdf-engine=wkhtmltopdf \
  --metadata title="TRADIE Integration Status" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

# AI Dashboard
pandoc AI_DASHBOARD_COMPLETE.md \
  -o pdf_exports/TRADIE_AI_Dashboard.pdf \
  --pdf-engine=wkhtmltopdf \
  --metadata title="TRADIE AI Dashboard" \
  --metadata author="TRADIE Project Team" \
  --css=custom_style.css

echo "✅ Implementation documentation exported!"

# ============================================
# Summary
# ============================================

echo ""
echo "======================================"
echo "✅ Export Complete!"
echo "======================================"
echo ""
echo "📁 Output directory: ./pdf_exports/"
echo ""
echo "📄 Files created:"
ls -lh pdf_exports/
echo ""
echo "📊 Total files: $(ls pdf_exports/ | wc -l)"
echo "💾 Total size: $(du -sh pdf_exports/ | cut -f1)"
echo ""
echo "🎉 All documentation exported successfully!"
