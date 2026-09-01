# Figma Prompts - Multi-Role KYC & Entity Registration System

## 🎯 Overview

**Complete Figma text-to-design prompts** for creating a comprehensive KYC and entity registration system for the TRADIE commodity trading platform. Covers all roles: Producers, Commission Agents, Buyers, Traders, Storage Facilities, and Transport/Logistics Companies.

**Created**: October 22, 2025  
**Platform**: Cross-platform (Android, iOS, Web, Desktop)  
**Roles Covered**: 6 major roles with entity types and hierarchies

---

## 📱 Screen 1: Role Selection with Entity Type

### Figma Prompt

```
Create a mobile app screen (390×844px) for role selection in a commodity trading platform.

Design Elements:
- Top header with gradient background from #F7FAFC to #D9F2FF
- Logo and title "Select Your Role" in Playfair Display font, color #003E6D
- Subtitle "Choose how you want to use TRADIE" in Lato font, gray

Main Content:
- 6 large card options in a scrollable grid (2 columns on mobile):
  1. Producer - with wheat icon, green accent
  2. Commission Agent - with handshake icon, gold #FFD700 accent
  3. Buyer/Trader - with shopping cart icon, blue accent
  4. Storage Facility - with warehouse icon, purple accent
  5. Transport/Logistics - with truck icon, orange accent
  6. Multiple Roles - with layers icon, teal accent

Each card shows:
- Large icon (48×48px) at top
- Role name in Montserrat SemiBold
- Short description (2 lines) in Lato Regular
- Subtle shadow and rounded corners (12px radius)
- White background with 90% opacity, backdrop blur

Bottom section:
- Continue button (full width, gold #FFD700, 56px height)
- "Already registered? Sign In" link below

Style: Modern, clean, agricultural theme with soft gradients
```

---

## 📱 Screen 2: Entity Type Selection

### Figma Prompt

```
Create a mobile KYC screen (390×844px) for selecting entity type in a trading platform.

Header:
- Back arrow (left)
- "Entity Type" title in Playfair Display, #003E6D
- Progress indicator showing "Step 1 of 8" at top right

Main Content Area:
- Question text: "What type of entity are you registering?" in Montserrat Medium
- Subtitle: "This determines required documents" in smaller gray text

Entity Type Cards (vertical stack with 16px spacing):
1. Individual/Proprietor
   - Radio button (left)
   - "Individual Proprietor" title
   - "Sole ownership, complete control" description
   - Icon: person icon

2. Partnership Firm
   - "Partnership Firm" title
   - "2-20 partners, shared ownership" description
   - Icon: people icon

3. LLP (Limited Liability Partnership)
   - "LLP" title
   - "Limited liability, flexible structure" description
   - Icon: building icon

4. Private Limited Company
   - "Private Limited Company" title
   - "Corporate entity, board-driven" description
   - Icon: corporate building icon

5. Public Limited Company
   - "Public Limited Company" title
   - "Publicly traded, regulated" description
   - Icon: stock chart icon

6. Society/Trust/Cooperative
   - "Society/Trust/Cooperative" title
   - "Non-profit, member-based" description
   - Icon: group icon

Each card:
- White background with subtle shadow
- 16px padding
- Radio button indicator on left
- Blue border when selected (#003E6D, 2px)
- Light blue background tint when selected (5% opacity)

Bottom:
- "Next" button (gold #FFD700, 56px height, disabled until selection)

Style: Clean, professional, easy to scan
```

---

## 📱 Screen 3: Entity Basic Details

### Figma Prompt

```
Create a mobile form screen (390×844px) for entity registration details.

Header:
- Back arrow, "Entity Details" title, "Step 2 of 8" progress

Form Fields (vertical stack, 24px spacing):

1. Entity Name
   - Label: "Registered Entity Name*" in Montserrat SemiBold
   - Input field: 48px height, gray background #F3F4F6
   - Placeholder: "Enter official registered name"

2. Entity Type Display
   - Label: "Entity Type"
   - Read-only chip showing selected type with icon
   - Small edit button to go back

3. Registration/License Number
   - Label: "Registration/License Number*"
   - Input field with info icon
   - Helper text: "As per government registration certificate"

4. Registration Date
   - Label: "Date of Registration*"
   - Date picker input (calendar icon on right)
   - Placeholder: "DD/MM/YYYY"

5. Issuing Authority
   - Label: "Issuing Authority*"
   - Dropdown select (chevron icon)
   - Options: Registrar of Companies, State Government, Ministry of MSME, etc.

6. PAN Number
   - Label: "Entity PAN Number*"
   - Input field (uppercase auto-format)
   - Validation: Shows green checkmark when valid format

7. Business Category
   - Label: "Business Category*"
   - Dropdown with options:
     - Micro Enterprise
     - Small Enterprise (MSME)
     - Medium Enterprise
     - Large Enterprise
     - Startup (< 5 years)

8. Udyam Aadhar (conditional - shows only for Indian entities)
   - Toggle: "Do you have Udyam Aadhar?"
   - If yes: Input field for Udyam number
   - If no: Skip

9. Area of Operation
   - Label: "Geographical Area of Operation*"
   - Multi-select chips:
     - Local (within district)
     - Inter-state (within country)
     - International
   - Can select multiple

10. Operating States/Regions
    - Label: "Operating States/Regions*"
    - Multi-select dropdown
    - Shows based on country selected earlier
    - Search functionality

Bottom Section:
- "Save & Continue" button (gold, 56px)
- "Save as Draft" text link

Validation:
- Required fields marked with red asterisk
- Real-time validation with green checkmarks or red error messages
- Error messages in small red text below fields

Style: Form-focused, clear hierarchy, accessible
```

---

## 📱 Screen 4: Role & Hierarchy Setup (For Non-Proprietor Entities)

### Figma Prompt

```
Create a mobile screen (390×844px) for adding organizational roles and hierarchy.

Header:
- Back arrow, "Add Team Members" title, "Step 3 of 8" progress
- Info badge: "You can add up to 30 members"

Top Section:
- Entity name display in card (gray background)
- Entity type badge
- "Add roles and assign decision-making powers"

Current Members List:
- Show owner/primary contact first (locked, cannot remove)
  - Avatar (64×64px circle)
  - Name and designation
  - "Primary Owner" badge (gold)
  - Decision power: 100% (non-editable)

Add Member Section (repeatable):
- "Add New Member" button (outline style, + icon)

When adding member:
- Form card with white background, shadow, 20px padding

Fields for each member:
1. Full Name
   - Input field, 48px height

2. Designation (conditional based on entity type)
   For Private/Public Limited:
   - Dropdown: Chairman, Managing Director, CEO, Director, CFO, Treasurer, Company Secretary
   
   For Partnership:
   - Dropdown: Managing Partner, Partner
   
   For Society/Trust:
   - Dropdown: President, Vice President, Secretary, Treasurer, Director, Member

3. Role(s) in Platform
   - Multi-select chips:
     - Admin (full access)
     - Financial Approver
     - Operations Manager
     - Quality Controller
     - Inventory Manager
     - Sales & Marketing
     - Procurement
   - Can assign multiple roles

4. Decision-Making Power (%)
   - Slider from 0-100%
   - Shows percentage as you drag
   - Live calculation of total percentage
   - Warning if total > 100%: "Total exceeds 100%. Please adjust."

5. Contact Details
   - Email input (verified with icon)
   - Phone number input (verified with OTP)

6. Send Invitation
   - Toggle: "Send app invitation immediately"
   - If yes: Email and SMS sent with signup link

Action Buttons per Member Card:
- "Save Member" (primary button)
- "Remove" (text link, red)

Summary Card at Bottom:
- Total members: X/30
- Total decision power allocated: Y%
- Status indicator:
  - Green if exactly 100%
  - Yellow if < 100%
  - Red if > 100%

Bottom Navigation:
- "Add Another Member" (secondary button)
- "Continue to Documents" (primary button, gold, enabled only if total = 100%)

Style: Organized, clear hierarchy, color-coded validation
```

---

## 📱 Screen 5: Document Upload (Dynamic by Country/Region)

### Figma Prompt

```
Create a mobile screen (390×844px) for document upload with AI scanning.

Header:
- Back arrow, "Upload Documents" title, "Step 4 of 8" progress
- Auto-detected location badge: "India - Maharashtra" (with GPS icon)

Introduction Card:
- Icon: document with checkmark
- "Required documents based on your location and entity type"
- "Use AI scan for faster verification" with AI sparkle icon

Document Upload Cards (accordion style, expandable):

Card 1: Certificate of Incorporation/Registration
- Status badge: "Required" (red) or "Uploaded" (green)
- Expand arrow
- When expanded:
  - Upload area with dashed border
  - Camera icon and upload icon
  - "Scan with AI" button (gold) or "Upload from device" button (outline)
  - "Supported: PDF, JPG, PNG (max 10MB)"
  
  If uploaded:
  - Thumbnail preview (80×80px)
  - File name and size
  - AI analysis results:
    - Green checkmark: "Document verified"
    - Document type: "Certificate of Incorporation"
    - Validity: "Valid"
    - Extracted data:
      - Entity name: [auto-filled from OCR]
      - Registration number: [auto-filled]
      - Date: [auto-filled]
    - Edit button to correct AI data
  - Remove button (small, red icon)

Card 2: PAN Card (Entity)
- Same structure as above
- AI extracts: PAN number, entity name

Card 3: GST Registration Certificate (if applicable)
- Toggle: "Is your entity GST registered?"
- If yes: Upload area
- AI extracts: GSTIN, state, date

Card 4: Udyam Aadhar Certificate (India only, MSME)
- Conditional based on earlier selection
- AI extracts: Udyam number, category

Card 5: Address Proof (Latest utility bill or bank statement)
- AI extracts: Address, date

Card 6: Bank Account Proof (Cancelled cheque or bank statement)
- AI extracts: Account number, IFSC, bank name

Card 7: License to Operate (specific to role)
For Commission Agent:
- Trading license / APMC license
- AI extracts: License number, validity, area

For Storage Facility:
- Warehouse license / WDRA certificate
- AI extracts: Capacity, location

For Transport:
- Transport operator license
- Vehicle registration (if individual vehicle)

Card 8: Board Resolution (for companies)
- Authorizing signatory to register
- Manual upload only (no AI)

Card 9: Partnership Deed (for partnerships)
- Manual upload

Card 10: MOA & AOA (for companies)
- Manual upload

AI Scan Process (when user clicks "Scan with AI"):
- Camera view opens full screen
- Overlay guide showing document frame
- "Align document within frame" instruction
- Auto-capture when edges detected
- Processing animation (1-3 seconds)
- Results shown with extracted data
- "Confirm & Upload" or "Retake" buttons

Progress Indicator:
- "X of Y documents uploaded"
- Progress bar (green fill)

Bottom Section:
- "Save & Continue" button (enabled when all required docs uploaded)
- "Save Draft" link

Style: Document-focused, AI-powered, guided experience
```

---

## 📱 Screen 6: AI Document Verification Results

### Figma Prompt

```
Create a mobile screen (390×844px) showing AI verification results.

Header:
- Back arrow, "Verification Results" title

Hero Section:
- Large icon: AI robot with magnifying glass
- Status badge (dynamic):
  - If all passed: Green circle with checkmark, "All Documents Verified"
  - If some failed: Yellow triangle, "Review Required"
  - If major issues: Red X, "Verification Failed"

Overall Summary Card:
- Documents uploaded: 8/8
- AI confidence: 94% (green if >80%, yellow if 60-80%, red if <60%)
- Processing time: 2 minutes 34 seconds

Detailed Results (expandable cards):

Card 1: Certificate of Incorporation - ✅ Verified
- AI confidence: 96%
- Extracted data matches input: Yes
- Document quality: Excellent
- Validity check: Valid until 2030
- Fraud check: No anomalies detected
- Details (expandable):
  - Entity name: ✅ Matches
  - Registration number: ✅ Matches
  - Date: ✅ Matches
  - Issuing authority: ✅ Verified

Card 2: PAN Card - ✅ Verified
- AI confidence: 98%
- PAN format: Valid
- Name verification: Matches
- Cross-check with govt database: Pending (manual)

Card 3: Address Proof - ⚠️ Needs Review
- AI confidence: 72%
- Issue: Date is older than 3 months
- Action required: Upload recent document
- "Upload New Document" button

Card 4: License - ❌ Failed
- AI confidence: 45%
- Issues:
  - Document blurry (quality too low)
  - Expiry date not clearly visible
- Action required: Retake photo or upload clearer scan
- "Retake with AI Scanner" button (gold)
- "Upload Different File" button (outline)

Fraud Detection Card (if any issues):
- Red border, warning icon
- "Potential Issues Detected"
- List of issues:
  - Document may be tampered (rare)
  - Information mismatch
- "Contact Support" button

Action Items Section:
- Shows count of items needing attention
- "Fix 2 issues" button (prominent)

Bottom Buttons:
- If all verified: "Proceed to Review" (gold, 56px)
- If issues: "Fix Issues" (gold) and "Review Later" (outline)

Benefits Reminder (small card):
- Icon: star
- "Complete verification to unlock:"
- Bullet points:
  - Higher transaction limits
  - Verified badge
  - Priority support
  - Access to financing

Style: Results-focused, clear action items, confidence-building
```

---

## 📱 Screen 7: KYC Review & Submit

### Figma Prompt

```
Create a mobile screen (390×844px) for final KYC review before submission.

Header:
- Back arrow, "Review & Submit" title, "Step 7 of 8" progress

Introduction:
- Icon: checklist
- "Please review all information before submitting"
- "You can edit any section by tapping on it"

Review Sections (accordion cards):

Section 1: Entity Information
- Collapsed state shows:
  - Entity name
  - Entity type badge
  - "Edit" button (small, right aligned)
- Expanded state shows all details:
  - Registration number
  - PAN
  - Category
  - Area of operation
  - All fields as read-only text

Section 2: Team & Roles (for non-proprietor)
- Collapsed: "5 members added, 100% power allocated"
- Expanded: List of all members with:
  - Name, designation, role, decision power %
  - "Edit" button per member

Section 3: Documents
- Collapsed: "8/8 documents uploaded, 95% AI verified"
- Expanded: List with thumbnails:
  - Document name
  - Status badge (verified, pending, failed)
  - View button

Section 4: Verification Timeline
- Expected verification time card:
  - For Producer: "2-7 working days"
  - For Others: "5-15 working days"
- Physical verification notice (for paid tiers):
  - "After paid subscription, physical verification will be scheduled"
  - Benefits list

Terms & Conditions:
- Checkbox (large, 24×24px): "I confirm all information is accurate"
- Link to T&C (opens in modal)
- Checkbox: "I agree to TRADIE Terms of Service and Privacy Policy"
- Warning text (small, gray): "Providing false information may result in account suspension"

Declaration Section:
- "Digital Signature" heading
- Name input: "Type your full name to sign"
- Date auto-filled: "October 22, 2025"
- Location auto-filled: "Mumbai, Maharashtra, India"

Bottom Section:
- "Submit for Verification" button (gold, 56px, disabled until checkboxes checked)
- Warning banner above button:
  - "Once submitted, you cannot edit details during verification"

Style: Summary-focused, trust-building, legal clarity
```

---

## 📱 Screen 8: KYC Status (Three States)

### Figma Prompt A: Producer - Pending Verification

```
Create a mobile success screen (390×844px) for KYC submission confirmation.

Hero Section:
- Large animated checkmark icon (lottie animation: checkmark drawing)
- "Congratulations!" heading in Playfair Display, #003E6D
- "You have signed up successfully" subheading

Status Card (white background, rounded, shadow):
- Icon: hourglass (animated)
- "KYC Under Review" status
- "Verification in progress" subtitle
- Expected time: "Few hours - 7 working days"
- Progress bar (indeterminate animation)

Information Card:
- Icon: info circle
- "What happens next?"
- Numbered list:
  1. "Our team is reviewing your documents"
  2. "You'll receive updates via SMS and email"
  3. "Verification time may vary by location"

Benefits While Waiting Card:
- Icon: party popper
- "You can access all features now!"
- Feature list with checkmarks:
  - ✅ List your produce
  - ✅ Browse buyers and markets
  - ✅ Use AI quality scanner
  - ✅ Create lots and tokenize
  - ✅ Access learning resources
  - ✅ Chat with support

SMS Message Preview (gray box):
- Icon: message
- "SMS sent to +91-XXXXX-X1234:"
- Message text: "Congratulations! You have signed up successfully. Your KYC is under review (few hours – 7 working days). Meanwhile, you can access all app features."

Action Buttons:
- "Go to Dashboard" (gold, 56px, primary)
- "Track Verification Status" (outline, secondary)

Bottom tip:
- Lightbulb icon
- "Tip: Complete your profile to get more visibility"

Style: Celebratory, encouraging, reassuring
```

### Figma Prompt B: Other Roles - Pending with Physical Verification Notice

```
Create a mobile screen (390×844px) for KYC pending status with upgrade path.

Hero Section:
- Checkmark icon
- "Congratulations!" heading
- "You have signed up successfully" subheading

Status Card:
- Icon: hourglass
- "KYC Under Review" status
- Expected time: "Few hours - 15 working days"

Upgrade Notice Card (premium style with gradient border):
- Icon: crown or star
- "Unlock Premium Benefits" heading
- "After upgrading to a paid subscription:"
- Text: "Our verification team will contact you for physical validation"

Benefits of Physical Verification (list with icons):
- ✅ Priority listing and faster approvals
- ✅ Eligibility for verified-partner badge (gold checkmark icon)
- ✅ Higher transaction and settlement limits (rupee icon)
- ✅ Access to finance, logistics, insurance tie-ins (handshake icon)
- ✅ Dedicated support and AI insights unlock (robot icon)
- ✅ Featured in search results (star icon)

Current Access Card:
- "You can access these features now:"
- Feature list with checkmarks
- "Limited access" badge

Pricing Card (collapsible):
- "View Subscription Plans" button
- When expanded:
  - Basic: Free (current)
  - Silver: ₹999/month
  - Gold: ₹2,499/month
  - Platinum: ₹4,999/month
  - "Compare Plans" button

SMS Preview (same as above, 15 days version)

Action Buttons:
- "Upgrade Now" (gold, prominent)
- "Go to Dashboard" (outline)
- "Maybe Later" (text link)

Style: Premium feel, clear value proposition, non-pushy
```

### Figma Prompt C: KYC Failed / Retry

```
Create a mobile screen (390×844px) for KYC failure with clear next steps.

Hero Section:
- Icon: exclamation mark in orange/yellow circle (not harsh red)
- "Action Required" heading
- "Your KYC could not be verified" subheading

Issue Summary Card:
- "Verification Status: Needs Attention"
- Date: "Reviewed on: October 22, 2025"
- Review ID: "KYC-2025-XXXXX"

Issues Found (expandable cards):

Issue 1: Document Quality
- Icon: image with warning
- "Address Proof - Low Quality"
- Problem: "Document is blurry and text is not readable"
- Solution: "Please re-upload a clear photo or scan"
- "Fix Now" button

Issue 2: Information Mismatch
- Icon: alert triangle
- "PAN Name Mismatch"
- Problem: "Name on PAN doesn't match entity registration"
- Solution: "Verify spelling or upload correct document"
- "Fix Now" button

Issue 3: Missing Document
- Icon: document with X
- "License Document Missing"
- Problem: "Trading license not uploaded"
- Solution: "Please upload valid license"
- "Upload Now" button

Current Status Banner:
- Yellow background
- "Your account is active in limited-access mode"
- "Complete verification to unlock all features"

Limited Access Notice:
- What you can do:
  - ✅ Browse marketplace
  - ✅ View prices and trends
  - ✅ Access learning resources
  
- What's restricted:
  - ❌ Cannot create listings
  - ❌ Cannot make transactions
  - ❌ Limited to 3 inquiries per day

Help & Support Card:
- Icon: headset
- "Need help?"
- "Our support team is here to assist"
- "Contact Support" button
- "WhatsApp Support" button (if available)

Action Buttons:
- "Re-Submit Documents" (gold, 56px, primary)
- "Contact Support" (outline)
- "Go to Dashboard" (text link)

Encouragement Message:
- Icon: thumbs up
- "Most verifications are resolved within 24 hours!"

SMS Preview (gray box):
- "SMS sent: Your KYC could not be verified. Please re-submit the required documents to complete verification and continue using all app features."

Style: Helpful, non-threatening, solution-focused, encouraging
```

---

## 📱 Screen 9: AI Media Capture Interface

### Figma Prompt

```
Create a full-screen mobile camera interface (390×844px) for AI-powered document scanning.

Camera Viewport (fills screen):
- Live camera feed showing real-time capture
- Semi-transparent overlay for guidance

Top Bar (overlay on camera, gradient background for readability):
- Back/Close button (white, top-left)
- "Scan Document" title (white, centered)
- Info icon (white, top-right)

Document Frame Guide (center of screen):
- Animated dashed rectangle outline (white, 4px dashes)
- Size: 300×200px (adjusts for different document types)
- Corners highlighted with small white squares
- Pulsing animation to draw attention

Guidance Text (bottom of frame, semi-transparent black background):
- Dynamic messages:
  - "Align document within frame"
  - "Move closer" (if too far)
  - "Hold steady" (if moving)
  - "Reduce glare" (if too bright)
  - "Increase lighting" (if too dark)
  - "✓ Perfect! Capturing..." (when aligned)

AI Detection Indicators:
- Green checkmarks appear at corners when edges detected
- Red X marks if document not detected
- Real-time edge detection overlay (blue lines tracing document)

Bottom Controls (overlay, white icons on semi-transparent black):
- Flash toggle (left): Auto / On / Off
- Capture button (center, large 72×72px circle, gold #FFD700 when ready, gray when not)
- Flip camera (right): Front/rear switch
- Grid toggle (far right): Show/hide alignment grid

AI Confidence Meter (top of frame):
- Progress bar showing detection confidence
- "Confidence: 87%" label
- Green when >80%, yellow 60-80%, red <60%

Auto-Capture Toggle (top-right corner):
- Switch: "Auto capture when aligned"
- If on: Captures automatically when all edges detected and confidence >90%

Recently Captured (bottom-left thumbnail):
- Small 60×60px thumbnail of last capture
- Badge showing count if multiple
- Tap to review

Tips Card (collapsible from bottom):
- Swipe up to reveal tips
- "Document Scanning Tips"
- Bullet points:
  - Place document on contrasting surface
  - Ensure good lighting
  - Avoid shadows and glare
  - Keep camera parallel to document
- "Got it" button to dismiss

Processing State (after capture):
- Full screen overlay (white, 90% opacity)
- Animated spinner (gold)
- "Analyzing document..." text
- Progress: "Extracting data... 67%"
- AI animation (robot icon processing)

Results Preview (after processing):
- Captured image shown full screen
- AI-extracted data overlay:
  - Highlighted text boxes showing detected fields
  - Labels: "Name", "Number", "Date", etc.
  - Confidence % next to each field
- Bottom sheet with extracted data fields (editable)
- Buttons:
  - "Confirm & Upload" (gold, primary)
  - "Retake" (outline)
  - "Edit Data" (text link)

Style: Full-screen immersive, AI-guided, confidence-building, professional
```

---

## 📱 Screen 10: Staff Permission Assignment (For Entity Admins)

### Figma Prompt

```
Create a mobile screen (390×844px) for assigning granular permissions to staff members.

Header:
- Back arrow
- "Assign Permissions" title
- Staff name badge: "Amit Kumar - Operations Manager"

Introduction Card:
- Icon: key
- "Control what Amit can do in the app"
- "Assign specific permissions for different modules"

Permission Modules (grouped accordion sections):

Module 1: Dashboard & Analytics
- Collapsed: "Dashboard Access" with permission count "3/5 enabled"
- Expanded:
  - Toggle: View dashboard (ON)
  - Toggle: View analytics (ON)
  - Toggle: Export reports (OFF)
  - Toggle: View financial data (OFF)
  - Toggle: View team performance (ON)

Module 2: Inventory Management
- Collapsed: "Inventory" with "5/7 enabled"
- Expanded:
  - Toggle: View inventory (ON)
  - Toggle: Add new items (ON)
  - Toggle: Edit items (ON)
  - Toggle: Delete items (OFF)
  - Toggle: Transfer inventory (ON)
  - Toggle: Adjust stock levels (ON)
  - Toggle: Approve stock adjustments (OFF - requires higher role)

Module 3: Lot Creation & Tokenization
- Collapsed: "Lots & Tokens" with "3/6 enabled"
- Expanded:
  - Toggle: Create lots (ON)
  - Toggle: Edit lots (ON)
  - Toggle: Delete lots (OFF)
  - Toggle: Tokenize lots (OFF)
  - Toggle: Verify quality (ON)
  - Toggle: Approve tokenization (OFF)

Module 4: Quality Checks
- Collapsed: "Quality Control" with "4/5 enabled"
- Expanded:
  - Toggle: Perform quality checks (ON)
  - Toggle: Use AI scanner (ON)
  - Toggle: Override AI results (OFF)
  - Toggle: Approve quality reports (ON)
  - Toggle: Issue quality certificates (ON)

Module 5: Financial Operations
- Collapsed: "Finance" with "2/8 enabled"
- Expanded (with role-based restrictions):
  - Toggle: View transactions (ON)
  - Toggle: View pricing (ON)
  - Toggle: Create invoices (OFF - locked, shows lock icon)
  - Toggle: Approve payments (OFF - locked)
  - Toggle: Access bank details (OFF - locked)
  - Toggle: Generate financial reports (OFF - locked)
  - Toggle: Manage credits (OFF - locked)
  - Toggle: Approve settlements (OFF - locked)
  - Info: "Financial approvals require Treasurer or Director role"

Module 6: Customer & Buyer Management
- Collapsed: "Customers" with "3/4 enabled"
- Expanded:
  - Toggle: View customer list (ON)
  - Toggle: Add new customers (ON)
  - Toggle: Edit customer details (ON)
  - Toggle: Delete customers (OFF)

Module 7: Orders & Transactions
- Collapsed: "Orders" with "4/7 enabled"
- Expanded:
  - Toggle: View orders (ON)
  - Toggle: Create orders (ON)
  - Toggle: Modify orders (ON)
  - Toggle: Cancel orders (OFF)
  - Toggle: Process payments (OFF)
  - Toggle: Generate delivery notes (ON)
  - Toggle: Approve large orders (OFF)

Module 8: Logistics & Transport
- Collapsed: "Logistics" with "3/4 enabled"
- Expanded:
  - Toggle: View shipments (ON)
  - Toggle: Schedule pickups (ON)
  - Toggle: Track deliveries (ON)
  - Toggle: Approve transport vendors (OFF)

Module 9: Communications
- Collapsed: "Communications" with "3/5 enabled"
- Expanded:
  - Toggle: Chat with buyers (ON)
  - Toggle: Send notifications (ON)
  - Toggle: Access chat history (ON)
  - Toggle: Send bulk messages (OFF)
  - Toggle: Manage support tickets (OFF)

Module 10: Settings & Administration
- Collapsed: "Admin" with "1/6 enabled"
- Expanded (mostly locked for staff):
  - Toggle: View settings (ON)
  - Toggle: Edit company profile (OFF - locked)
  - Toggle: Manage users (OFF - locked)
  - Toggle: Assign permissions (OFF - locked)
  - Toggle: View audit logs (OFF - locked)
  - Toggle: Configure integrations (OFF - locked)

Permission Summary Card (sticky at bottom):
- Total permissions enabled: 32/64
- Risk level indicator:
  - Green: Low risk (view-only permissions)
  - Yellow: Medium risk (edit permissions)
  - Red: High risk (delete/approve/financial)
- "Current role allows up to 45 permissions"

Quick Permission Templates (expandable):
- "Use a template to quickly assign common permission sets"
- Templates:
  - View Only (all view permissions)
  - Basic Operator (view + add/edit, no delete)
  - Quality Controller (quality module full access)
  - Inventory Manager (inventory full access)
  - Custom (current selection)
- "Apply Template" button

Action Buttons:
- "Save Changes" (gold, 56px)
- "Reset to Default" (outline)
- "Cancel" (text link)

Confirmation Dialog (appears after save):
- "Changes will take effect immediately"
- "Amit will be notified of updated permissions"
- "Confirm" and "Cancel" buttons

Style: Detailed, organized, clear hierarchy, security-conscious
```

---

## 🎨 AI Integration Best Practices Summary

### Real-Time Feedback Components

```
Figma Prompt for AI Feedback Components:

Create a set of reusable AI feedback components for a mobile app:

1. AI Processing Indicator
   - Animated robot icon (24×24px)
   - "Analyzing..." text with dots animation
   - Circular progress ring (36×36px)
   - Percentage display in center
   - Colors: Gold #FFD700 (active), Gray (inactive)

2. AI Confidence Score Badge
   - Small pill-shaped badge
   - Icon: AI sparkle
   - Text: "AI Confidence: 94%"
   - Color coding:
     - Green (#10B981) if >80%
     - Yellow (#F59E0B) if 60-80%
     - Red (#EF4444) if <60%
   - Size: Auto width, 24px height

3. AI Suggestion Card
   - Light blue background (#F0F9FF)
   - Robot icon (left, 20×20px)
   - Heading: "AI Recommendation"
   - Suggestion text (Body/Medium)
   - Action button: "Apply Suggestion" (small, outline)
   - Dismiss X icon (top-right)
   - Padding: 12px
   - Border radius: 8px

4. Live AI Analysis Overlay (for camera)
   - Semi-transparent detection boxes
   - Green outlines for detected fields
   - Labels with confidence %
   - Pulsing animation on active detection
   - Corner markers (L-shaped) for document edges

5. AI Error State
   - Yellow warning triangle icon
   - "AI couldn't analyze this image" heading
   - Reason: "Image too blurry" or "Insufficient lighting"
   - Suggestions: "Try retaking in better light"
   - "Retry with AI" button (gold)
   - "Enter Manually" link

6. AI Success Confirmation
   - Green checkmark icon (animated)
   - "Verified by AI" badge
   - Extracted data summary
   - Edit option (small pencil icon)
   - Confidence indicator

Style: Trustworthy, modern, non-intrusive, helpful
```

---

## 📊 Complete Flow Diagram

### Figma Prompt for Flow Visualization

```
Create a user flow diagram for multi-role KYC system (landscape 1920×1080px):

Starting Point:
- "App Launch" circle (gray)

Branch 1: Role Selection
- "Select Role" rectangle (6 options shown as smaller boxes)
- Arrow to Entity Type Selection

Branch 2: Entity Type
- "Choose Entity Type" rectangle (6 options)
- Decision diamond: "Proprietor?"
  - Yes: Skip to Documents
  - No: Go to Role Assignment

Branch 3: Role Assignment (Non-Proprietor only)
- "Add Team Members" rectangle
- "Assign Permissions" rectangle
- Loop: "Add up to 30 members"

Branch 4: Document Upload
- "Upload Documents" rectangle
- AI Processing animation
- "AI Verification" rectangle
- Decision diamond: "All Verified?"
  - Yes: Go to Review
  - No: "Fix Issues" loop back

Branch 5: Review & Submit
- "Review All Details" rectangle
- "Sign Digitally" rectangle
- "Submit KYC" rectangle

Branch 6: Status (3 outcomes)
- "Pending - Producer" (7 days)
- "Pending - Others" (15 days + physical verification)
- "Failed/Retry" (loop back to documents)

End Points:
- "Dashboard Access" (all users get limited access)
- "Full Verification Complete" (after review period)

Color Coding:
- Start: Gray
- User Input: Blue (#003E6D)
- AI Process: Gold (#FFD700)
- Decision: Orange diamond
- Success: Green
- Error/Retry: Red
- End: Purple

Annotations:
- Show expected time at each stage
- Show conditional paths with dashed lines
- Show loops with curved arrows
- Add icons for each major step

Style: Professional, easy to follow, color-coded, complete
```

---

## 🎯 Summary

This comprehensive set of Figma prompts covers:

✅ **10 Complete Screen Designs**:
1. Role Selection
2. Entity Type Selection
3. Entity Basic Details
4. Role & Hierarchy Setup
5. Dynamic Document Upload with AI
6. AI Verification Results
7. KYC Review & Submit
8. KYC Status (3 variations)
9. AI Media Capture Interface
10. Staff Permission Assignment

✅ **AI Integration Components**:
- Real-time feedback indicators
- Confidence score displays
- Processing animations
- Error states with suggestions
- Success confirmations

✅ **Best Practices Implemented**:
- Camera guidance overlays
- Auto-capture when aligned
- Real-time edge detection
- Quality confidence meters
- Clear error messaging
- Fallback manual options
- Progress indicators
- Responsive feedback
- Accessibility considerations

✅ **Multi-Role Support**:
- Producer (simplified path)
- Commission Agent (with licenses)
- Buyer/Trader (with trading credentials)
- Storage Facility (with capacity licenses)
- Transport/Logistics (with vehicle credentials)
- Multiple Roles (combined verification)

✅ **International & Regional Compliance**:
- Country-specific document requirements
- State/region-based licenses
- Dynamic form fields based on location
- Multi-currency support (implied)
- Multi-language ready (structure allows)

---

**Status**: ✅ Ready for Figma Implementation  
**Next Step**: Copy any prompt into Figma's text-to-design feature or use with Figma AI plugins  
**Created**: October 22, 2025
