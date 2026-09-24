RESTRUCTURE THIS EXISTING TRADIE PRODUCER APP INTO ONE COHERENT, MOBILE-FIRST FARMER APP.

IMPORTANT:
• DO NOT use, copy, or preserve the screen/flow called:
  “✨ TRADIE V1 Refined — 18-Screen Complete Producer Journey”
• Use:
  “🌾 Complete Flow Navigator”
  as the MASTER INFORMATION ARCHITECTURE and primary reference.
• Integrate the existing:
  “🚀 End-to-End Trading Flow (11 Steps)”
  and
  “🎯 12-Screen Figma Presentation”
  into that master flow.
• DO NOT create duplicate screens, duplicate functions, duplicate forms, duplicate navigation, or duplicate workflows.
• Reuse existing components, styling, data structures, icons, and functionality wherever possible.
• MODIFY/CONSOLIDATE existing screens instead of generating parallel versions.
• Preserve working functionality; only restructure, simplify, combine and improve UX/UI.
• Do not create unnecessary documentation/demo/reference screens inside the main farmer journey.

PRIMARY OBJECTIVE:
Create ONE production-oriented TRADIE Producer mobile application that is extremely easy for farmers to understand and operate, even with limited digital literacy.

MASTER FARMER JOURNEY:

1. ONBOARDING
   Mobile / OTP
   → Language
   → Role / Producer Type
   → KYC / Identity
   → Producer Profile

2. HOME / PRODUCER DASHBOARD
   → Today’s farm status
   → Active crop
   → Tasks
   → Costs
   → Harvest status
   → Lot status
   → Sell / Store status
   → AI recommendations
   → notifications

3. FARM & CROP SETUP
   → Farm
   → Field
   → Crop selection
   → AI crop recommendation

4. CULTIVATION
   → Log Activity
   → Inputs
   → Cost
   → Crop Journal
   → Crop Health
   → Photos / Media evidence

5. HARVEST
   → Record Harvest
   → Commodity details
   → Quantity
   → Harvest media
   → Create Lot

6. QUALITY
   → Sampling
   → Dynamic Quality Form
   → AI Quality Check
   → Grade / QC result
   → Approve / Correct

7. LOT & DIGITAL IDENTITY
   → Lot Management
   → Lot details
   → QR
   → Provenance
   → Tokenization
   NOTE: diagrams/tutorials/wireframes are SUPPORTING HELP, not mandatory transaction screens.

8. STORE OR SELL DECISION
   Make this a simple farmer-friendly decision screen:
   [SELL NOW]
   [STORE & SELL LATER]

9A. STORE PATH
   → Storage options
   → Compare distance/cost/basic conditions
   → Select storage
   → Confirm storage
   → Track stored lot
   → Return later to Sell

9B. SELL PATH
   → Marketplace / requirements
   → AI matchmaking
   → Optional commission agent
   → Buyer verification
   → Order confirmation

10. TRANSACTION
   → Market / Auction where applicable
   → Transport
   → Destination receiving
   → Final weighing
   → Settlement / payment record
   → Transaction complete

11. AFTER TRANSACTION
   → Transaction history
   → Lot/provenance history
   → Cost/profit summary
   → AI insights
   → reports/export

INTEGRATE THESE EXISTING CAPABILITIES INTO THE ABOVE JOURNEY:

• Producer Dashboard & AI
• Producer Profile & Identity
• Activities & Cost Management
• Input Cost & Activity Tracker
• Quality Management
• AI Quality Check
• Dynamic Quality Form
• Lot Creation & Tokenization
• Lot Flow Diagram
• Lot Guide / Tutorial
• Lot Management Wireframes
• QR Code Manager
• Provenance Tracker
• Storage & Sell Dashboard
• Storage / Sell Flow
• AI Media Capture
• Simple Media Capture
• Camera Permission States
• ChatGPT / Grok AI Assistant
• Figma JSON Exporter
• Low-Fi Wireframes
• Onboarding Wireframe
• Entity Wireframe
• Full KYC Wireframe
• Entity KYC Wireframe

DEDUPLICATION RULES:

1. ONE dashboard only.
2. ONE producer profile only.
3. ONE activity + input-cost experience; combine activity and cost intelligently.
4. ONE crop lifecycle/journal experience.
5. ONE quality journey; combine sampling + dynamic form + AI QC + grading.
6. ONE lot management journey; tokenization and digital identity belong inside it.
7. ONE traceability experience; QR + provenance belong together.
8. ONE media service; use contextual camera/photo capture instead of separate duplicate screens.
9. ONE store/sell decision.
10. One reusable marketplace/matchmaking experience.
11. One buyer verification step.
12. One transaction confirmation mechanism.
13. One transport flow.
14. One receiving flow.
15. One weighing/settlement flow.
16. AI assistant must be contextual and reusable, not a separate mandatory journey.
17. Wireframes/tutorials/diagrams are reference/help layers, not duplicate production screens.

MOBILE-FIRST REDESIGN:

Target:
• Android-first mobile app
• Responsive for small and large phones
• Primary design width: 360–430 px
• Touch-first interaction
• Minimum comfortable touch target: 44 px
• One-column layouts
• Bottom navigation
• Sticky primary action where useful
• Avoid desktop grids
• Avoid wide tables
• Replace dense forms with cards, steppers, accordions and progressive disclosure
• Use large readable labels
• Keep one primary action per screen
• Secondary actions should be visually subordinate
• Minimize typing
• Prefer dropdowns, chips, radio cards, camera, voice input and smart defaults
• Use familiar farmer language
• Avoid technical terminology in primary UI
• Support Telugu + English + other existing languages
• Keep critical information visible without scrolling excessively

FARMER UX PRINCIPLES:

• Show WHAT I NEED TO DO NOW.
• Hide complexity unless needed.
• Never ask the farmer to understand internal system architecture.
• Do not expose token/NFT terminology prominently; present it as “Digital Lot ID” or “Lot Record” and place technical details behind More Info.
• AI should recommend, explain simply, and allow farmer control.
• Use icons + text, never icon-only controls for critical actions.
• Use confirmations before irreversible actions.
• Save progress automatically.
• Allow Back without losing data.
• Display progress for multi-step flows.
• Make Store vs Sell extremely obvious.
• Provide offline-friendly visual behavior and retry states where appropriate.
• Use camera/media capture contextually during crop, harvest and quality workflows.

VISUAL SYSTEM:

Retain the existing TRADIE identity and improve it consistently:
• Deep agricultural blue
• Green
• Gold/yellow accent
• White/light backgrounds
• High contrast
• Clean cards
• Rounded but professional components
• Consistent spacing
• Consistent typography
• Consistent buttons, inputs, chips, badges and progress indicators

NAVIGATION:

BOTTOM NAVIGATION:
Home | Farm | Lots | Sell | Profile

Use contextual sub-navigation inside each section.

HOME:
• Today
• Crop status
• Pending actions
• AI insight
• Sell/Store CTA

FARM:
• Farms
• Crops
• Activities
• Costs
• Crop health

LOTS:
• Harvest
• Quality
• Lots
• QR
• Provenance

SELL:
• Sell / Store
• Marketplace
• Matches
• Buyers
• Orders
• Transport
• Settlement

PROFILE:
• Identity
• KYC
• Documents
• Settings
• Language
• Help

SCREEN STRATEGY:

Do NOT attempt to create dozens of separate screens.

Instead consolidate into a small number of reusable mobile screens with internal sections, sheets, dialogs and step-based states.

Preferred production structure:
• Onboarding
• KYC/Profile
• Dashboard
• Farm/Crop
• Activities & Costs
• Crop Journal/Health
• Harvest
• Quality
• Lot
• Store/Sell
• Marketplace/Match
• Buyer/Order
• Transport/Receiving
• Weighing/Settlement
• History/Profile

Use modal sheets, accordions, tabs and progressive disclosure for secondary information.

IMPORTANT IMPLEMENTATION RULE:

Before creating anything new, inspect the existing implementation and identify which existing screen/component already performs that function.

REUSE FIRST.
MERGE SECOND.
SIMPLIFY THIRD.
CREATE NEW ONLY WHEN ABSOLUTELY NECESSARY.

Do not generate alternative versions of the same feature.

FINAL RESULT:
A single unified TRADIE Producer mobile application with:
Identity → Farm → Crop → Activities → Costs → Crop Health → Harvest → Quality → Lot → QR/Provenance → Store/Sell → Marketplace/Match → Buyer → Order → Transport → Receiving → Weighing → Settlement → History/AI.

Make the prototype visually mobile-native, farmer-friendly, simple, consistent, and ready to become the production mobile app.

Do not rebuild unrelated modules.
Do not remove working business functionality.
Do not add decorative complexity.
Do not create duplicate screens.
Prioritize reuse and consolidation to minimize generation cost.