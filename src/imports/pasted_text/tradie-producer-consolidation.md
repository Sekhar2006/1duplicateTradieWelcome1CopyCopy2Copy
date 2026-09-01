TRADIE PRODUCER MASTER CONSOLIDATION
====================================

IMPORTANT:
This is an EXISTING large TRADIE Figma Make project.

DO NOT rebuild the application.

DO NOT redesign the application.

DO NOT recreate existing screens.

DO NOT generate duplicate components.

DO NOT unnecessarily inspect/rewrite hundreds of files.

Your mission is to perform a surgical consolidation of the existing Producer ecosystem into ONE authoritative Producer Flow while preserving ALL unique functionality.

The guiding principle is:

    REUSE → SELECT BEST → MERGE UNIQUE FEATURES → CONNECT → VALIDATE

NOT:

    REBUILD → REDESIGN → DUPLICATE


============================================================
PHASE 0 — IMMEDIATE CLEANUP
============================================================

FIRST perform only this small cleanup.

COMPLETELY REMOVE the Export Plugin Demo UI and its visible controls.

Remove from the application UI:

❌ "Export Plugin Demo"
❌ "Export Screen"
❌ "Batch Export"

Also remove any equivalent export-toolbar UI that exists solely for these tools.

The attached reference image shows the exact unwanted UI.

The final Producer application must NOT display:

- Export Plugin Demo
- Export Screen
- Batch Export
- Export Tools toolbar
- Export Plugin Showcase navigation
- Floating export toolbar
- Compact export toolbar
- Export demo buttons

Remove the associated navigation entry/route from App.tsx.

Remove the ExportPluginShowcase route.

Remove imports that become unused.

Remove ExportToolbar imports/usages if they are only related to this UI.

Remove ScreenExportPlugin / WireframeBatchExporter UI references if they are only used by this export-demo functionality.

IMPORTANT:

Do NOT delete unrelated Producer functionality.

Do NOT delete Figma/React functionality simply because the word "export" exists somewhere.

Only remove the EXPORT DEMO / EXPORT TOOL UI requested above.

Do not spend credits redesigning anything during this phase.


============================================================
PHASE 1 — PROTECT THE EXISTING SYSTEM
============================================================

Before consolidating Producer functionality, establish these rules:

PROTECTED:

- existing Producer business logic
- existing Producer screens
- existing components
- existing API integrations
- existing data structures
- existing validations
- existing error handling
- existing bug fixes
- existing AI functionality
- existing camera functionality
- existing quality functionality
- existing tokenization functionality
- existing provenance functionality
- existing storage functionality
- existing selling functionality
- existing Commission Agent functionality
- existing dashboards

The project already contains numerous documented bug fixes.

DO NOT regress them.

In particular preserve fixes related to:

- ProducerCompleteFlow step handling
- camera permissions
- QR reader
- provenance hooks
- lot tokenization hooks
- quality-check fetch/API handling
- Select empty-value errors
- Card/Button ref forwarding
- uncontrolled/controlled inputs
- Create Lot errors
- DSBadge safeguards
- Producer AI Dashboard errors
- Grok transaction-date handling
- API/process.env handling

Treat working fixes as PROTECTED.


============================================================
PHASE 2 — ONE AUTHORITATIVE PRODUCER FLOW
============================================================

There must ultimately be:

ONE:

    COMPLETE PRODUCER FLOW

and ONE authoritative Producer navigation structure.

Do not leave multiple competing Producer flows exposed to the user.

Known Producer implementations include:

- ProducerCompleteFlow
- ProducerMasterFlowNavigator
- Producer12ScreenPresentation
- Complete8ScreenDashboard
- ProducerAIDashboard
- ActivityLogger
- ActivityLoggerEnhanced
- ActivityTracking
- ProducerProfile
- ProducerTypeSelection
- CropSelectionWithAI
- CropLifecycleTracker
- CropHealthMonitor
- CropHistoryWithGrokInsights
- CropJournalingTokenization
- InputCostTracker
- InputCostTrackerEnhanced
- FinanceSection
- QualityCheckWorkflow
- EnhancedQualityCheckWithAI
- GrokAIQualityAssessmentScreen
- GradingCompletionScreen
- CreateLotsScreen
- CreateLotWorkflow
- LotsOverviewScreen
- LotCreationTokenizationWorkflow
- LotTokenizationFlowDiagram
- LotTokenizationGuide
- ProvenanceTracker
- ProvenanceTrackerWithAuth
- ProvenanceAPI
- GrokQRScanner
- AIMediaCaptureCamera
- MediaUploadModal
- InventoryStorage
- EnhancedStorageSelectionScreen
- CommodityListingScreen
- HarvestCommodityListing
- MatchmakingScreen
- MarketplaceAgentBrowsingScreen
- MarketDisplayAuction
- PostRequirement
- PostRequirementAdvanced
- CommissionAgentEngagementScreen
- CommissionAgentFlowNavigator
- CommissionAgentOrderForm
- BuyerVerificationView
- OrderConfirmationVerificationScreen
- DestinationReceiving
- AIAnalysisCard
- AIInsightsCard
- ChatScreen

There may be additional Producer-related implementations.

Do NOT assume the list above is exhaustive.


============================================================
PHASE 3 — THE INTELLIGENT SELECTION RULE
============================================================

For every Producer capability:

SEARCH ONLY THE RELEVANT EXISTING IMPLEMENTATIONS.

Then classify them:

A. BEST IMPLEMENTATION
B. DUPLICATE WITH UNIQUE FEATURES
C. TRUE DUPLICATE
D. SUPPORTING COMPONENT
E. DOCUMENTATION / REFERENCE ONLY

Use:

A → KEEP AS CANONICAL

B → MERGE UNIQUE FEATURES INTO CANONICAL

C → DO NOT EXPOSE AS A SECOND FLOW

D → REUSE

E → DO NOT put into runtime navigation


NEVER decide based only on:

- filename
- newest file
- oldest file
- number of screens
- visual appearance
- code length

Decide based on:

FUNCTIONAL COMPLETENESS
+
BUSINESS LOGIC
+
UX QUALITY
+
DATA COMPLETENESS
+
NAVIGATION
+
ERROR STATES
+
UNIQUE FEATURES


============================================================
PHASE 4 — ZERO FEATURE LOSS
============================================================

The goal is NOT to reduce functionality.

The goal is:

    REMOVE DUPLICATION
    WITHOUT REMOVING UNIQUE FUNCTIONALITY.

If two screens perform the same function:

MERGE them.

If Screen A has 5 features and Screen B has 3 additional features:

FINAL SCREEN = all 8 features.

If two screens have different business purposes:

KEEP BOTH, but place them correctly within ONE Producer Flow.

Never delete a business capability merely because another screen looks similar.


============================================================
PHASE 5 — PRODUCER BUSINESS BACKBONE
============================================================

Build the final navigation around this business lifecycle:

PRODUCER
   ↓
PRODUCER PROFILE
   ↓
FARM / FIELD / PLOT
   ↓
CROP
   ↓
CROP LIFECYCLE
   ↓
ACTIVITIES
   ↓
INPUTS / COST
   ↓
CROP HEALTH / AI
   ↓
HARVEST
   ↓
POST-HARVEST
   ↓
CREATE LOT
   ↓
QUALITY / SAMPLING
   ↓
AI QUALITY
   ↓
GRADING
   ↓
QR
   ↓
PROVENANCE
   ↓
TOKENIZATION
   ↓
STORE OR SELL
   ↓
------------------------------------------------
|                                              |
STORE                                         SELL
|                                              |
STORAGE                                       BUYER
INVENTORY                                     MARKETPLACE
STORAGE STATUS                                MATCHMAKING
                                              COMMISSION AGENT
                                              MARKET/AUCTION
                                              POST REQUIREMENT
                                              |
                                              ↓
                                           ORDER
                                              ↓
                                      QUALITY CONFIRMATION
                                              ↓
                                      QUANTITY / WEIGHING
                                              ↓
                                          CONFIRMATION
                                              ↓
                                      DESTINATION / RECEIVING
                                              ↓
                                         TRANSACTION
                                              ↓
                                         DOCUMENTS
                                              ↓
                                          HISTORY
                                              ↓
                                        AI INSIGHTS


============================================================
PHASE 6 — ACTIVITY CONSOLIDATION
============================================================

Activity functionality is CORE.

Consolidate:

ActivityLogger
ActivityLoggerEnhanced
ActivityTracking

into the strongest implementation.

Retain ALL unique capabilities.

At minimum preserve:

- Ploughing
- Sowing / Transplanting
- Irrigation
- Fertigation
- Pesticide Spraying
- Fertilizer Application
- Weed Management
- Mulching
- Biological Amendment
- Micronutrient Spraying
- Plant Health Care
- Pruning / Training
- Harvesting
- Post Harvest
- Post-Harvest Process
- Custom Activity

Also retain all existing:

- dates
- times
- crop
- field
- plot
- activity details
- inputs
- quantity
- unit
- labour
- machinery
- equipment
- service provider
- cost
- notes
- media
- documents
- evidence
- GPS/location
- verification
- status
- history

Do NOT reduce the activity system to a simplified form.


============================================================
PHASE 7 — CROP CONSOLIDATION
============================================================

Merge the strongest functionality from:

- CropSelectionWithAI
- CropLifecycleTracker
- CropHealthMonitor
- CropHistoryWithGrokInsights
- CropJournalingTokenization

Preserve:

- crop selection
- AI crop recommendations
- multi-crop capability
- crop lifecycle
- crop stages
- crop health
- crop history
- journal
- AI insights
- tokenization relationships

Use one coherent Crop section.


============================================================
PHASE 8 — COST CONSOLIDATION
============================================================

Merge:

InputCostTracker
InputCostTrackerEnhanced
FinanceSection

Preserve unique functionality from all.

Final relationship:

ACTIVITY
   ↓
INPUT
   ↓
COST
   ↓
CROP COST
   ↓
PRODUCTION ECONOMICS
   ↓
HARVEST / LOT
   ↓
SELLING ECONOMICS


============================================================
PHASE 9 — HARVEST + LOT
============================================================

Consolidate:

- HarvestCommodityListing
- CreateLotsScreen
- CreateLotWorkflow
- LotsOverviewScreen
- LotManagementWireframes
- LotCreationTokenizationWorkflow

Final relationship:

CROP
 ↓
HARVEST
 ↓
POST-HARVEST
 ↓
LOT

Preserve every unique field and business rule.


============================================================
PHASE 10 — QUALITY + SAMPLING
============================================================

Consolidate:

- QualityCheckWorkflow
- EnhancedQualityCheckWithAI
- GrokAIQualityAssessmentScreen
- GradingCompletionScreen
- QualityCheckAPI
- sampling functionality

Final relationship:

LOT
 ↓
SAMPLING
 ↓
QUALITY DATA
 ↓
AI QUALITY
 ↓
MANUAL REVIEW
 ↓
GRADING
 ↓
CONFIRMATION

Do NOT remove sampling.

Do NOT bypass quality.

Do NOT reduce AI quality functionality.


============================================================
PHASE 11 — MEDIA + CAMERA
============================================================

Consolidate only the runtime functionality from:

- AIMediaCaptureCamera
- CompleteMediaCaptureExample
- MediaUploadModal
- CameraFramingGuide

Preserve:

- camera
- permissions
- permission denied handling
- retry
- upload alternative
- media capture
- image/video
- AI analysis
- evidence attachment

DO NOT remove the existing camera fixes.

DO NOT reimplement the camera.

REUSE THE WORKING CAMERA COMPONENT.


============================================================
PHASE 12 — QR + PROVENANCE
============================================================

Consolidate:

- GrokQRScanner
- ProvenanceTracker
- ProvenanceTrackerWithAuth
- ProvenanceAPI

Final relationship:

LOT
 ↓
QR
 ↓
PROVENANCE
 ↓
TRACEABILITY

Preserve authentication, verification, scanning and API functionality.


============================================================
PHASE 13 — TOKENIZATION
============================================================

Consolidate:

- LotCreationTokenizationWorkflow
- LotTokenizationFlowDiagram
- LotTokenizationGuide
- CropJournalingTokenization
- CommitCoinsWallet

Do NOT remove token functionality.

Do NOT create multiple tokenization flows.

Create one logical tokenization capability connected to the Lot.


============================================================
PHASE 14 — STORE OR SELL
============================================================

This is a CRITICAL decision point.

After lot/quality/traceability:

        STORE
          OR
        SELL

Both must remain available.

Do not force the Producer into only selling.


============================================================
PHASE 15 — STORAGE
============================================================

Consolidate:

- InventoryStorage
- EnhancedStorageSelectionScreen
- StorageManagementDashboard

Final flow:

LOT
 ↓
STORE
 ↓
STORAGE SELECTION
 ↓
STORAGE RECORD
 ↓
INVENTORY
 ↓
STORAGE HISTORY

Preserve all unique functionality.


============================================================
PHASE 16 — SELLING
============================================================

Consolidate all Producer selling pathways:

- CommodityListingScreen
- HarvestCommodityListing
- MatchmakingScreen
- MarketplaceAgentBrowsingScreen
- MarketDisplayAuction
- PostRequirement
- PostRequirementAdvanced
- CommissionAgentEngagementScreen
- CommissionAgentFlowNavigator
- CommissionAgentOrderForm
- BuyerVerificationView

Do NOT collapse genuinely different selling pathways into one generic screen.

The Producer must be able to choose the appropriate route.


============================================================
PHASE 17 — COMMISSION AGENT
============================================================

Commission Agent is a BRANCH of Producer selling.

Preserve:

- agent discovery
- agent engagement
- agent selection
- agent order form
- OTP confirmation
- authorization
- AI assessment where implemented
- storage interaction
- marketplace interaction
- quality
- lot
- transaction relationships

Connect it into the unified Producer Sell branch.

Do NOT leave Commission Agent as an isolated application.


============================================================
PHASE 18 — BUYER / ORDER / TRANSACTION
============================================================

Connect:

BUYER
 ↓
MATCH
 ↓
ORDER
 ↓
QUALITY
 ↓
QUANTITY
 ↓
WEIGHING / MEASUREMENT
 ↓
CONFIRMATION
 ↓
DESTINATION
 ↓
RECEIVING
 ↓
TRANSACTION
 ↓
DOCUMENTS
 ↓
HISTORY

Preserve existing:

BuyerVerificationView
OrderConfirmationVerificationScreen
DestinationReceiving


============================================================
PHASE 19 — DASHBOARD CONSOLIDATION
============================================================

There must be ONE Producer Home/Dashboard.

Evaluate:

- ProducerAIDashboard
- Complete8ScreenDashboard
- Producer12ScreenPresentation
- existing Producer dashboard implementations

Select the strongest base.

Merge unique functionality.

Do NOT create several competing Producer dashboards.

The dashboard should provide access to:

- active crops
- activities
- costs
- harvest
- lots
- quality
- storage
- selling
- transactions
- AI insights
- notifications
- history


============================================================
PHASE 20 — AI
============================================================

Preserve all unique Producer AI functionality.

Integrate, where already implemented:

- Crop AI
- Crop Health AI
- AI Quality
- Grok Quality Assessment
- AI Media
- AI Insights
- Producer AI Dashboard
- ChatGPT Assistant
- Grok monitoring
- predictive/analytical features

Do not create duplicate AI dashboards.

Use AI as a layer across the Producer lifecycle.


============================================================
PHASE 21 — AUTHENTICATION / KYC
============================================================

Do NOT rebuild generic authentication.

Do NOT place generic:

- Welcome
- Login
- OTP
- Signup
- Generic Role Selection

inside the main Producer business-flow navigation.

Producer-specific identity/KYC may remain where required.

Keep generic authentication as an application-level dependency.


============================================================
PHASE 22 — HISTORY
============================================================

One Producer History area must expose the lifecycle records.

Preserve history for:

- activities
- crops
- crop cycles
- costs
- harvest
- lots
- sampling
- quality
- grading
- QR
- provenance
- tokenization
- storage
- sales
- orders
- transactions
- documents


============================================================
PHASE 23 — NAVIGATION RULE
============================================================

Every Producer screen must satisfy:

1. It is reachable.
2. It has a valid entry point.
3. It has a valid exit/next action.
4. It does not create a dead end.
5. It does not create a duplicate competing flow.
6. It reconnects to the Producer lifecycle.

No:

❌ dead-end screen
❌ orphan screen
❌ duplicate navigator
❌ duplicate dashboard
❌ duplicate activity flow
❌ duplicate quality flow
❌ duplicate lot flow
❌ duplicate selling flow


============================================================
PHASE 24 — LOW CREDIT EXECUTION LOOP
============================================================

THIS IS CRITICAL.

Use the following loop.

--------------------------------------------
LOOP
--------------------------------------------

1. FIND

Identify ONE capability only.

2. COMPARE

Find existing implementations of that capability.

3. SELECT

Choose the strongest implementation.

4. MERGE

Add only genuinely unique missing functionality.

5. CONNECT

Connect it to the existing Producer Master Flow.

6. VALIDATE

Check:

- navigation
- unique functionality
- error states
- existing fixes
- no duplicate entry point

7. FREEZE

Once validated, consider that capability COMPLETE.

8. MOVE FORWARD

Do NOT repeatedly revisit completed capabilities.

--------------------------------------------
END LOOP
--------------------------------------------


============================================================
PHASE 25 — BATCH ORDER
============================================================

Process in these batches.

BATCH 0:
Remove Export Plugin Demo / Export Screen / Batch Export.

BATCH 1:
Producer Dashboard + Producer Profile

BATCH 2:
Farm + Field + Crop + Crop Lifecycle

BATCH 3:
Activities + Activity Costs

BATCH 4:
Crop Health + AI Crop + Crop History

BATCH 5:
Harvest + Post-Harvest + Lot

BATCH 6:
Sampling + Quality + AI Quality + Grading

BATCH 7:
QR + Provenance + Tokenization

BATCH 8:
Storage

BATCH 9:
Selling + Marketplace + Buyer + Matchmaking

BATCH 10:
Commission Agent

BATCH 11:
Order + Quantity + Weighing + Confirmation + Destination + Receiving

BATCH 12:
Transaction + Documents + History

BATCH 13:
AI + Analytics + ChatGPT

BATCH 14:
FINAL NAVIGATION VALIDATION


============================================================
PHASE 26 — DO NOT REPROCESS
============================================================

After completing each batch:

DO NOT regenerate it.

DO NOT redesign it.

DO NOT repeatedly inspect it.

Only revisit it if a later batch requires a direct navigation connection.

This is specifically to minimize Figma Make credits.


============================================================
PHASE 27 — CODE CHANGE MINIMIZATION
============================================================

Prefer:

- existing component reuse
- existing props
- existing callbacks
- existing navigation
- existing data structures
- existing API services

over:

- new components
- new pages
- new data models
- new navigation systems
- new styling
- rewrites


============================================================
PHASE 28 — DELETE ONLY TRUE DUPLICATES
============================================================

Do NOT aggressively delete files.

First disconnect duplicate implementations from runtime navigation.

Only remove a file/component if ALL are true:

1. It is a true duplicate.
2. No unique functionality exists.
3. Nothing depends on it.
4. It is not required as documentation/reference.
5. Removing it will not break the build.

Otherwise leave the implementation in the codebase but do not expose it as a competing Producer flow.

This is safer and consumes fewer credits.


============================================================
PHASE 29 — FINAL PRODUCER STRUCTURE
============================================================

The user-facing Producer experience should ultimately feel like ONE application:

PRODUCER HOME
│
├── PROFILE
│
├── FARM & FIELDS
│
├── CROPS
│   ├── Crop Selection
│   ├── Lifecycle
│   ├── Health
│   ├── History
│   └── AI
│
├── ACTIVITIES
│   ├── Log Activity
│   ├── Activity Details
│   ├── Inputs
│   ├── Costs
│   └── History
│
├── HARVEST
│
├── LOTS
│   ├── Create Lot
│   ├── Quality
│   ├── QR
│   ├── Provenance
│   └── Tokenization
│
├── STORAGE
│
├── SELL
│   ├── Sell Now
│   ├── Marketplace
│   ├── Buyer
│   ├── Matchmaking
│   ├── Commission Agent
│   └── Auction/Market
│
├── ORDERS
│
├── TRANSACTIONS
│
├── HISTORY
│
└── AI / INSIGHTS


============================================================
PHASE 30 — FINAL VALIDATION
============================================================

Before finishing, verify the following.

EXPORT UI:

❌ Export Plugin Demo removed
❌ Export Screen removed
❌ Batch Export removed
❌ Export toolbar removed from user-facing application
❌ Export Plugin Showcase route removed

PRODUCER:

✅ One Producer entry point
✅ One Producer master navigation
✅ One Producer dashboard
✅ Farm/Field retained
✅ Crop retained
✅ Multi-crop retained
✅ Crop lifecycle retained
✅ Activities retained
✅ All activity types retained
✅ Cost tracking retained
✅ Harvest retained
✅ Post-harvest retained
✅ Lot creation retained
✅ Sampling retained
✅ Quality retained
✅ AI Quality retained
✅ Grading retained
✅ QR retained
✅ Provenance retained
✅ Tokenization retained
✅ Storage retained
✅ Sell retained
✅ Marketplace retained
✅ Buyer retained
✅ Matchmaking retained
✅ Commission Agent retained
✅ Order retained
✅ Quantity retained
✅ Weighing/measurement retained where implemented
✅ Confirmation retained
✅ Destination/Receiving retained
✅ Transaction retained
✅ Documents retained
✅ History retained
✅ AI retained
✅ ChatGPT retained where implemented
✅ Existing bug fixes protected
✅ Existing API integrations protected
✅ Existing camera fixes protected

NAVIGATION:

✅ No dead ends
✅ No orphan Producer screens
✅ No duplicate Producer dashboards
✅ No duplicate Producer navigators
✅ No duplicate user-facing implementations of the same function
✅ Every unique capability remains reachable


============================================================
FINAL INSTRUCTION
============================================================

DO NOT attempt a giant rewrite.

DO NOT rebuild all Producer screens.

DO NOT redesign the application.

DO NOT spend credits generating unnecessary UI.

Perform a surgical consolidation.

For each capability:

    FIND
      ↓
    COMPARE
      ↓
    SELECT BEST
      ↓
    MERGE UNIQUE FEATURES
      ↓
    CONNECT
      ↓
    VALIDATE
      ↓
    FREEZE
      ↓
    NEXT CAPABILITY

The final product must be:

ONE COMPLETE PRODUCER FLOW

with:

    MAXIMUM FUNCTIONALITY
    MINIMUM DUPLICATION
    MINIMUM CODE CHANGES
    MINIMUM CREDIT CONSUMPTION
    ZERO LOSS OF UNIQUE BUSINESS FUNCTIONALITY

The final business lifecycle must remain:

PRODUCER
→ FARM
→ FIELD
→ CROP
→ CROP LIFECYCLE
→ ACTIVITY
→ COST
→ HEALTH / AI
→ HARVEST
→ POST-HARVEST
→ LOT
→ SAMPLING
→ QUALITY
→ AI QUALITY
→ GRADING
→ QR
→ PROVENANCE
→ TOKENIZATION
→ STORE OR SELL
→ BUYER / MARKETPLACE / COMMISSION AGENT
→ ORDER
→ QUANTITY / WEIGHING
→ CONFIRMATION
→ DESTINATION / RECEIVING
→ TRANSACTION
→ DOCUMENTS
→ HISTORY
→ AI INSIGHTS

Do not stop at a visually complete flow.

The Producer Flow must be BUSINESS-FLOW COMPLETE,
NAVIGATION COMPLETE,
FEATURE COMPLETE,
AND DUPLICATION-FREE.