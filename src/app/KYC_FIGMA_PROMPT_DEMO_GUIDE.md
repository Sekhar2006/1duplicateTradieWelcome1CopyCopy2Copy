# KYC Figma Prompt Demo & Usage Guide

## 🎯 Quick Start - How to Use These Prompts

### Method 1: Figma AI Text-to-Design (Recommended)

**Step-by-Step**:

1. **Open Figma**
   - Go to figma.com and create new file
   - Name it: "TRADIE-Multi-Role-KYC-System"

2. **Access AI Features**
   - Click on Frame tool or press `F`
   - Look for "Generate with AI" or text input field
   - Or use Figma AI plugins like:
     - "Magician" by Diagram
     - "Genius" by Diagram
     - "Automator"

3. **Copy & Paste Prompt**
   - Open `FIGMA_PROMPTS_MULTI_ROLE_KYC_SYSTEM.md`
   - Copy any complete prompt (e.g., "Screen 1: Role Selection")
   - Paste into Figma AI text field
   - Click "Generate"

4. **Refine & Iterate**
   - Review generated design
   - Make manual adjustments
   - Re-generate with modified prompts if needed

---

## 📱 Demo Walkthrough - Producer KYC Journey

### Scenario: Rajesh (Wheat Farmer) Signs Up

**User Story**:
> "I'm Rajesh, a wheat farmer from Punjab. I want to register on TRADIE to sell my produce directly to buyers."

---

### **Screen 1: Role Selection**

**What User Sees**:
```
┌─────────────────────────────────┐
│ [TRADIE Logo]                   │
│ Select Your Role                │
│ Choose how you want to use TRADIE│
│                                 │
│ ┌─────────┐  ┌─────────┐       │
│ │ 🌾      │  │ 🤝      │       │
│ │ Producer│  │ Agent   │       │
│ └─────────┘  └─────────┘       │
│                                 │
│ ┌─────────┐  ┌─────────┐       │
│ │ 🛒      │  │ 🏭      │       │
│ │ Buyer   │  │ Storage │       │
│ └─────────┘  └─────────┘       │
│                                 │
│ ┌─────────┐  ┌─────────┐       │
│ │ 🚛      │  │ 📊      │       │
│ │ Logistics│ │ Multiple│       │
│ └─────────┘  └─────────┘       │
│                                 │
│ [Continue Button - Disabled]    │
│                                 │
│ Already registered? Sign In     │
└─────────────────────────────────┘
```

**User Action**: Taps "Producer" card

**State Change**: 
- Producer card gets blue border
- Continue button turns gold and enables
- User taps "Continue"

---

### **Screen 2: Entity Type Selection**

**What User Sees**:
```
┌─────────────────────────────────┐
│ [← Back]  Entity Type  Step 1/8│
│                                 │
│ What type of entity are you     │
│ registering?                    │
│ This determines required docs   │
│                                 │
│ ○ Individual/Proprietor         │
│   Sole ownership, complete ctrl │
│                                 │
│ ○ Partnership Firm              │
│   2-20 partners, shared own.    │
│                                 │
│ ○ LLP                           │
│   Limited liability, flexible   │
│                                 │
│ ○ Private Limited Company       │
│   Corporate entity, board-driven│
│                                 │
│ ○ Public Limited Company        │
│   Publicly traded, regulated    │
│                                 │
│ ○ Society/Trust/Cooperative     │
│   Non-profit, member-based      │
│                                 │
│ [Next Button - Disabled]        │
└─────────────────────────────────┘
```

**User Action**: Taps "Individual/Proprietor"

**State Change**:
- Radio button fills
- Card gets blue border and light blue background
- Next button enables

**Decision Point**:
- **If Individual**: Skip to Screen 5 (Documents) - No team setup needed
- **If Company/Partnership**: Go to Screen 3 & 4 - Team setup required

**Rajesh's Path**: Selected Individual, so jumps to Documents

---

### **Screen 5: Document Upload (Individual Producer - India)**

**What User Sees**:
```
┌─────────────────────────────────┐
│ [← Back]  Upload Docs  Step 2/8│
│ 📍 Auto-detected: India-Punjab  │
│                                 │
│ Required documents for          │
│ Individual Producer in Punjab   │
│                                 │
│ ▼ Aadhaar Card              [!] │
│ ┌─────────────────────────────┐ │
│ │ 📷 Scan with AI             │ │
│ │ or Upload from device       │ │
│ └─────────────────────────────┘ │
│                                 │
│ ▼ PAN Card                   [!] │
│ ┌─────────────────────────────┐ │
│ │ 📷 Scan with AI             │ │
│ │ or Upload from device       │ │
│ └─────────────────────────────┘ │
│                                 │
│ ▼ Land Ownership Proof       [!] │
│   (Revenue Records/Patta)       │
│ ┌─────────────────────────────┐ │
│ │ 📷 Scan with AI             │ │
│ │ or Upload from device       │ │
│ └─────────────────────────────┘ │
│                                 │
│ ▼ Bank Account Proof          ✓ │
│ ┌───────────────┐               │
│ │ [Thumbnail]   │  cheque.jpg   │
│ │ ✓ Verified    │  Acc: ***8765 │
│ └───────────────┘  HDFC Bank    │
│                    [Remove]      │
│                                 │
│ ▽ Address Proof (Optional)      │
│                                 │
│ Progress: 1/4 docs uploaded     │
│ ▓▓▓░░░░░░░░░░░ 25%             │
│                                 │
│ [Save & Continue - Disabled]    │
│ Save Draft                      │
└─────────────────────────────────┘
```

**User Action**: Taps "Scan with AI" on Aadhaar Card

---

### **Screen 9: AI Camera Interface (Scanning Aadhaar)**

**What User Sees**:
```
┌─────────────────────────────────┐
│[X]  Scan Aadhaar Card       [i] │
│                                 │
│         LIVE CAMERA VIEW        │
│    ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐    │
│    │                       │    │
│    │   [AADHAAR CARD       │    │
│    │    IN VIEW]           │    │
│    │                       │    │
│    └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘    │
│         ↑                       │
│   Align card within frame       │
│                                 │
│ Confidence: 92% ▓▓▓▓▓▓▓▓▓░     │
│                                 │
│ [💡]  [⭕ CAPTURE]  [🔄]       │
│ Flash    (Gold)      Flip       │
└─────────────────────────────────┘
```

**Real-Time AI Feedback**:
- Green corners appear when edges detected
- "Hold steady..." message shows
- Confidence meter fills up
- Auto-captures at 95% confidence

**After Capture**:
```
┌─────────────────────────────────┐
│    Analyzing document...        │
│                                 │
│    🤖 [Spinner Animation]       │
│                                 │
│    Extracting data... 78%       │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░         │
└─────────────────────────────────┘
```

**Results Screen**:
```
┌─────────────────────────────────┐
│ [Preview of Aadhaar Card Photo] │
│                                 │
│ ✅ AI Verification Complete     │
│ Confidence: 96%                 │
│                                 │
│ Extracted Data:                 │
│ ┌─────────────────────────────┐ │
│ │ Name: RAJESH KUMAR       ✓  │ │
│ │ Aadhaar: XXXX-XXXX-8765  ✓  │ │
│ │ DOB: 15/08/1985          ✓  │ │
│ │ Address: Village Khanna, ✓  │ │
│ │          Punjab, 141401     │ │
│ └─────────────────────────────┘ │
│                                 │
│ [Edit Data] (if needed)         │
│                                 │
│ [Confirm & Upload]  [Retake]    │
└─────────────────────────────────┘
```

**User Action**: Taps "Confirm & Upload"

**Back to Document Upload Screen**:
```
┌─────────────────────────────────┐
│ ▼ Aadhaar Card               ✓  │
│ ┌───────────────┐               │
│ │ [Thumbnail]   │  aadhaar.jpg  │
│ │ ✓ AI Verified │  96% conf.    │
│ │               │  Rajesh Kumar │
│ └───────────────┘  [Remove]     │
│                                 │
│ Progress: 2/4 docs uploaded     │
│ ▓▓▓▓▓▓▓░░░░░░░ 50%             │
└─────────────────────────────────┘
```

**Rajesh continues** and uploads PAN and Land Records similarly.

---

### **Screen 6: AI Verification Results**

**What User Sees After All Uploads**:
```
┌─────────────────────────────────┐
│ [← Back]  Verification Results  │
│                                 │
│     🤖🔍                        │
│                                 │
│   ✅ All Documents Verified     │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Documents: 4/4            ✓ │ │
│ │ AI Confidence: 94%          │ │
│ │ Processing: 2 min 18 sec    │ │
│ └─────────────────────────────┘ │
│                                 │
│ Detailed Results:               │
│                                 │
│ ✅ Aadhaar Card - 96% conf.     │
│    All fields verified          │
│                                 │
│ ✅ PAN Card - 98% conf.         │
│    PAN format valid             │
│                                 │
│ ✅ Land Records - 91% conf.     │
│    Land area: 5 acres           │
│                                 │
│ ✅ Bank Proof - 89% conf.       │
│    HDFC Bank verified           │
│                                 │
│ 🚫 No fraud detected            │
│                                 │
│ [Proceed to Review]             │
└─────────────────────────────────┘
```

**User Action**: Taps "Proceed to Review"

---

### **Screen 7: Review & Submit**

**What User Sees**:
```
┌─────────────────────────────────┐
│ [← Back]  Review & Submit  7/8  │
│                                 │
│ Please review all information   │
│                                 │
│ ▼ Personal Information      [Edit]│
│   Name: Rajesh Kumar            │
│   Phone: +91-98765-43210        │
│   Location: Punjab, India       │
│                                 │
│ ▼ Documents                  [View]│
│   4/4 uploaded, 94% AI verified │
│   ✓ Aadhaar, PAN, Land, Bank   │
│                                 │
│ ▼ Verification Timeline         │
│   Expected: 2-7 working days    │
│   You can use app meanwhile     │
│                                 │
│ ☑ I confirm all info accurate   │
│ ☑ I agree to T&C and Privacy    │
│                                 │
│ Digital Signature:              │
│ [Rajesh Kumar_____________]     │
│                                 │
│ Date: 22 Oct 2025               │
│ Location: Ludhiana, Punjab      │
│                                 │
│ ⚠️ Cannot edit after submission │
│                                 │
│ [Submit for Verification]       │
└─────────────────────────────────┘
```

**User Action**: 
- Checks both boxes
- Types "Rajesh Kumar" in signature field
- Taps "Submit for Verification"

**Loading State**:
```
┌─────────────────────────────────┐
│                                 │
│         [Spinner]               │
│                                 │
│    Submitting your KYC...       │
│    Please wait...               │
│                                 │
└─────────────────────────────────┘
```

---

### **Screen 8A: Success - Producer Pending**

**What User Sees**:
```
┌─────────────────────────────────┐
│                                 │
│         ✓                       │
│      [Checkmark                 │
│       Animation]                │
│                                 │
│    Congratulations!             │
│ You have signed up successfully │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ⏳ KYC Under Review         │ │
│ │                             │ │
│ │ Verification in progress    │ │
│ │ ▓▓▓▓░░░░░░░░░░░░░           │ │
│ │                             │ │
│ │ Expected: Few hours - 7 days│ │
│ └─────────────────────────────┘ │
│                                 │
│ 📱 SMS sent to +91-***-**-3210 │
│ "Your KYC is under review..."  │
│                                 │
│ 🎉 You can access all features! │
│ ✓ List your produce            │
│ ✓ Browse buyers                │
│ ✓ Use AI quality scanner       │
│ ✓ Create & tokenize lots       │
│ ✓ Chat with support            │
│                                 │
│ [Go to Dashboard]              │
│ Track Verification Status      │
│                                 │
│ 💡 Complete profile for better  │
│    visibility                   │
└─────────────────────────────────┘
```

**User Action**: Taps "Go to Dashboard"

---

## 🏢 Demo 2: Company Entity Registration

### Scenario: ABC Trading Pvt Ltd (Buyer/Trader)

**Different Path**:

After selecting "Buyer/Trader" and "Private Limited Company":

### **Screen 3: Entity Basic Details**

```
┌─────────────────────────────────┐
│ [← Back]  Entity Details  2/8   │
│                                 │
│ Entity Name*                    │
│ [ABC Trading Pvt Ltd_______]    │
│                                 │
│ Entity Type                     │
│ [Private Limited Company 🏢][Edit]│
│                                 │
│ CIN (Corporate Identity No.)*   │
│ [U51909MH2018PTC123456_____]    │
│ ℹ️ As per ROC certificate       │
│                                 │
│ Incorporation Date*             │
│ [15/03/2018] 📅                │
│                                 │
│ Issuing Authority*              │
│ [Registrar of Companies ▼]      │
│                                 │
│ Entity PAN*                     │
│ [AABCA1234C] ✓                 │
│                                 │
│ Business Category*              │
│ [Medium Enterprise (MSME) ▼]    │
│                                 │
│ Area of Operation*              │
│ ☑ Local ☑ Inter-state           │
│ ☑ International                 │
│                                 │
│ Operating States*               │
│ [Maharashtra, Gujarat, Delhi▼]  │
│                                 │
│ [Save & Continue]              │
│ Save as Draft                   │
└─────────────────────────────────┘
```

---

### **Screen 4: Add Board Members & Roles**

```
┌─────────────────────────────────┐
│ [← Back]  Add Team Members  3/8 │
│ 📊 ABC Trading Pvt Ltd          │
│ You can add up to 30 members    │
│                                 │
│ Current Members:                │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 👤 Amit Sharma            🔒│ │
│ │ Managing Director            │ │
│ │ Primary Owner               │ │
│ │ Decision Power: 100%  [LOCK]│ │
│ └─────────────────────────────┘ │
│                                 │
│ [+ Add New Member]              │
│                                 │
│ ┌─────────────────────────────┐ │ ← Expanded
│ │ Full Name*                  │ │
│ │ [Priya Verma__________]     │ │
│ │                             │ │
│ │ Designation*                │ │
│ │ [Director ▼]                │ │
│ │                             │ │
│ │ Platform Roles (multi):     │ │
│ │ ☑ Admin                     │ │
│ │ ☑ Financial Approver        │ │
│ │ □ Operations Manager        │ │
│ │ ☑ Quality Controller        │ │
│ │                             │ │
│ │ Decision Power: [40%] ━●─   │ │
│ │                             │ │
│ │ Email*                      │ │
│ │ [priya@abctrading.com] ✓   │ │
│ │                             │ │
│ │ Phone*                      │ │
│ │ [+91-98123-45678_____]      │ │
│ │ Send OTP for verification   │ │
│ │                             │ │
│ │ ☑ Send invitation now       │ │
│ │                             │ │
│ │ [Save Member]    Remove     │ │
│ └─────────────────────────────┘ │
│                                 │
│ Summary:                        │
│ ┌─────────────────────────────┐ │
│ │ Total Members: 2/30         │ │
│ │ Decision Power: 140% ⚠️     │ │
│ │ ❌ Exceeds 100% - adjust!   │ │
│ └─────────────────────────────┘ │
│                                 │
│ [Continue - Disabled]           │
└─────────────────────────────────┘
```

**User adjusts**: Changes Amit to 60%, Priya to 40%

**Summary updates**:
```
│ ┌─────────────────────────────┐ │
│ │ Total Members: 2/30         │ │
│ │ Decision Power: 100% ✓      │ │
│ │ ✅ Ready to continue        │ │
│ └─────────────────────────────┘ │
```

**Continue button enables**

---

### **Screen 5: Corporate Documents**

**Different docs required**:
```
┌─────────────────────────────────┐
│ [← Back]  Upload Docs     4/8   │
│ 📍 India - Maharashtra          │
│                                 │
│ Required for Private Limited:   │
│                                 │
│ ▼ Certificate of Incorporation*│
│ ▼ PAN Card (Entity)*           │
│ ▼ GST Registration Certificate* │
│ ▼ MOA (Memorandum of Assoc.)*  │
│ ▼ AOA (Articles of Assoc.)*    │
│ ▼ Board Resolution*             │
│   (Authorizing signatory)       │
│ ▼ Bank Account Proof*           │
│ ▼ Address Proof (Regd Office)* │
│ ▼ Trading License*              │
│   (APMC or state license)       │
│ ▽ Udyam Certificate (Optional)  │
│                                 │
│ Progress: 0/9 required          │
│ ▓░░░░░░░░░░░░░░ 0%             │
│                                 │
│ [Save & Continue - Disabled]    │
└─────────────────────────────────┘
```

**More complex verification process**

---

### **Screen 8B: Company Status (15-day verification)**

```
┌─────────────────────────────────┐
│         ✓                       │
│    Congratulations!             │
│ You have signed up successfully │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ⏳ KYC Under Review         │ │
│ │                             │ │
│ │ Expected: Few hours-15 days │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 👑 Unlock Premium Benefits  │ │
│ │                             │ │
│ │ After paid subscription:    │ │
│ │ • Physical verification     │ │
│ │ • Verified partner badge    │ │
│ │ • Higher limits             │ │
│ │ • Finance & logistics access│ │
│ │ • Dedicated AI insights     │ │
│ │ • Priority support          │ │
│ │                             │ │
│ │ [View Plans]                │ │
│ └─────────────────────────────┘ │
│                                 │
│ Current Access:                 │
│ ✓ Browse marketplace            │
│ ✓ Limited inquiries (3/day)     │
│ ✓ View prices                   │
│                                 │
│ [Upgrade Now]  [Go to Dashboard]│
└─────────────────────────────────┘
```

---

## 🔄 Demo 3: KYC Failure & Retry

### Scenario: Document Quality Issues

**User uploaded blurry PAN card**

### **Screen 8C: KYC Failed**

```
┌─────────────────────────────────┐
│         ⚠️                      │
│    Action Required              │
│ Your KYC could not be verified  │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Status: Needs Attention     │ │
│ │ Reviewed: 22 Oct 2025       │ │
│ │ ID: KYC-2025-78945          │ │
│ └─────────────────────────────┘ │
│                                 │
│ Issues Found:                   │
│                                 │
│ ▼ Document Quality              │
│ ┌─────────────────────────────┐ │
│ │ ⚠️ PAN Card - Low Quality   │ │
│ │                             │ │
│ │ Problem: Document is blurry │ │
│ │ and text not readable       │ │
│ │                             │ │
│ │ Solution: Re-upload clear   │ │
│ │ photo or scan               │ │
│ │                             │ │
│ │ [Fix Now]                   │ │
│ └─────────────────────────────┘ │
│                                 │
│ ▼ Information Mismatch          │
│ ┌─────────────────────────────┐ │
│ │ ⚠️ Name Mismatch            │ │
│ │                             │ │
│ │ Problem: PAN name differs   │ │
│ │ from Aadhaar name           │ │
│ │                             │ │
│ │ Solution: Verify spelling   │ │
│ │ or upload correct document  │ │
│ │                             │ │
│ │ [Fix Now]                   │ │
│ └─────────────────────────────┘ │
│                                 │
│ ⚠️ Account in limited-access mode│
│                                 │
│ What you can do:                │
│ ✓ Browse marketplace            │
│ ✓ View prices                   │
│                                 │
│ What's restricted:              │
│ ❌ Cannot create listings       │
│ ❌ Cannot transact              │
│                                 │
│ 💬 Need help?                   │
│ [Contact Support] [WhatsApp]    │
│                                 │
│ 👍 Most issues resolved in 24hrs│
│                                 │
│ [Re-Submit Documents]           │
│ Go to Dashboard                 │
└─────────────────────────────────┘
```

**User Action**: Taps "Fix Now" on PAN issue

**Returns to Document Upload** with PAN card section highlighted:
```
│ ▼ PAN Card                   ❌ │
│ ┌─────────────────────────────┐ │
│ │ ⚠️ Previous upload failed   │ │
│ │ Reason: Poor image quality  │ │
│ │                             │ │
│ │ 📷 Scan Again with AI       │ │
│ │    (Recommended)            │ │
│ │                             │ │
│ │ or Upload Different File    │ │
│ └─────────────────────────────┘ │
```

---

## 🎨 Visual Design Consistency

### Color Coding Across All Screens

**Status Indicators**:
- ✅ Green (#10B981): Verified, Success, Completed
- ⏳ Yellow (#F59E0B): Pending, In Progress, Warning
- ❌ Red (#EF4444): Failed, Error, Required Action
- 🔒 Gray (#9CA3AF): Locked, Disabled, Read-Only
- 🔵 Blue (#003E6D): Selected, Active, Primary
- 🟡 Gold (#FFD700): CTA buttons, Premium features

**Typography Hierarchy**:
- Titles: Playfair Display, 24-32px, #003E6D
- Headings: Montserrat SemiBold, 16-20px, #003E6D
- Body: Lato Regular, 14-16px, #4B5563
- Labels: Montserrat Medium, 12-14px, #6B7280
- Captions: Lato Regular, 12px, #9CA3AF

**Spacing**:
- Section spacing: 24px
- Card padding: 20px
- Input fields: 48px height, 16px padding
- Button height: 56px (primary), 48px (secondary)
- Grid gaps: 16px (mobile), 24px (desktop)

---

## 🔧 How to Customize Prompts

### Example: Adding New Document Type

**Original Prompt Section**:
```
Card 4: Udyam Aadhar Certificate (India only, MSME)
- Conditional based on earlier selection
- AI extracts: Udyam number, category
```

**Customized for Different Country**:
```
Card 4: Tax Registration Certificate (USA, EIN)
- Conditional: Shows only if country = USA
- Upload area with AI scan
- AI extracts: EIN, Business name, State, Date
- Validation: EIN format XX-XXXXXXX
```

### Example: Adding New Role Designation

**Original**:
```
For Private/Public Limited:
- Dropdown: Chairman, Managing Director, CEO, Director, CFO, Treasurer
```

**Customized**:
```
For Private/Public Limited:
- Dropdown: Chairman, Managing Director, CEO, Director, CFO, Treasurer, CTO, COO, VP Sales, VP Operations
- Allow custom designation with "Other" option
```

---

## ✅ Implementation Checklist

### Before Starting in Figma

- [ ] Read all 10 screen prompts
- [ ] Understand user flows (Producer vs Company)
- [ ] Review AI integration requirements
- [ ] Check regional compliance needs
- [ ] Identify which screens apply to your use case

### During Figma Design

- [ ] Create design system first (colors, typography, components)
- [ ] Build reusable components (buttons, inputs, cards)
- [ ] Create master components for AI feedback elements
- [ ] Design for mobile first, then scale up
- [ ] Add interactive prototyping for key flows
- [ ] Test with realistic content lengths

### After Design

- [ ] Export screen specs for developers
- [ ] Create design system documentation
- [ ] Prepare asset library (icons, images)
- [ ] Write developer handoff notes
- [ ] Create interactive prototype link
- [ ] Conduct user testing

---

## 🎯 Summary

This guide demonstrates:

✅ **Complete User Journeys**:
- Individual Producer (simplified)
- Company Entity (complex)
- Failure & Retry scenarios

✅ **Visual Examples**:
- ASCII mockups of each screen state
- State transitions and interactions
- Real-time feedback displays

✅ **Practical Tips**:
- How to use prompts in Figma
- Customization examples
- Design consistency guidelines

✅ **Implementation Workflow**:
- Step-by-step checklist
- Design system approach
- Handoff preparation

**Next Steps**:
1. Open Figma
2. Copy prompts from main document
3. Generate screens with AI
4. Refine and connect prototype
5. Test with users

---

**Created**: October 22, 2025  
**Status**: Ready for Implementation  
**Demo Format**: Visual ASCII + Detailed Walkthrough
