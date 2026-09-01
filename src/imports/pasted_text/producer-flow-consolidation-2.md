# TRADIE — MASTER PRODUCER FLOW CONSOLIDATION LOOP

## MISSION

You are working inside the existing TRADIE Figma Make project.

Your mission is to transform the existing collection of Producer-related implementations into **ONE authoritative, complete, logically connected, end-to-end PRODUCER FLOW**.

This is NOT a redesign project.

This is NOT a rebuild project.

This is NOT a request to create hundreds of new screens.

This is an **intelligent consolidation, deduplication, integration and navigation-correction project**.

Think like a principal product architect, business-process architect, UX architect, systems architect and senior React engineer working together.

The existing project contains many iterations of the same Producer capabilities. Some versions are incomplete, some are demonstrations, some are wireframes, some are enhanced versions, and some contain functionality that other versions do not.

Your job is to determine:

**WHAT IS THE BEST EXISTING IMPLEMENTATION + WHAT UNIQUE FUNCTIONALITY EXISTS ELSEWHERE + HOW SHOULD EVERYTHING CONNECT INTO ONE COMPLETE PRODUCER JOURNEY?**

---

# 1. ABSOLUTE SOURCE-OF-TRUTH RULE

Treat the existing TRADIE project as the primary source of truth.

Do NOT silently invent new business requirements.

Do NOT remove existing Producer functionality because a screen appears redundant.

Do NOT simplify the business process merely to reduce screen count.

Do NOT redesign working Producer screens unless consolidation genuinely requires it.

Preserve existing:

* screens
* components
* fields
* labels
* business rules
* activities
* forms
* validations
* calculations
* states
* data relationships
* navigation
* error handling
* success handling
* confirmation steps
* history
* AI functionality
* media functionality
* QR functionality
* provenance
* tokenization
* storage
* selling
* commission-agent workflows
* quality/sampling
* documentation
* identity
* dashboards

The goal is:

**ONE FLOW, NOT LESS FUNCTIONALITY.**

---

# 2. DO NOT BUILD FROM SCRATCH

Before creating anything:

SEARCH THE EXISTING PROJECT.

Reuse existing:

* components
* screens
* workflows
* navigators
* forms
* cards
* dialogs
* dashboards
* configuration
* data structures
* services
* API integrations
* existing mock data
* existing design-system components

If a required capability already exists, CONNECT OR REUSE IT.

Do not create another implementation of the same capability.

---

# 3. IMPORTANT PROJECT CONTEXT

The existing project already contains multiple Producer implementations and supporting modules.

Known Producer-related implementations include, among others:

* ProducerCompleteFlow
* ProducerMasterFlowNavigator
* Producer12ScreenPresentation
* Complete8ScreenDashboard
* ActivityLogger
* ActivityLoggerEnhanced
* ActivityTracking
* ProducerProfile
* ProducerTypeSelection
* CropSelectionWithAI
* CropLifecycleTracker
* AdvancedMultiCropTracker
* CropHealthMonitor
* CropHistoryWithGrokInsights
* CropJournalingTokenization
* InputCostTracker
* InputCostTrackerEnhanced
* FinanceSection
* QualityCheckWorkflow
* EnhancedQualityCheckWithAI
* GrokAIQualityAssessmentScreen
* GradingCompletionScreen
* CreateLotsScreen
* CreateLotWorkflow
* LotsOverviewScreen
* LotCreationTokenizationWorkflow
* LotTokenizationFlowDiagram
* LotTokenizationGuide
* LotManagementWireframes
* ProvenanceTracker
* ProvenanceTrackerWithAuth
* ProvenanceAPI
* QR/Grok QR functionality
* AI media capture
* camera permission handling
* media upload
* storage
* selling
* marketplace
* matchmaking
* commission-agent engagement
* commission-agent order form
* buyer verification
* order confirmation
* transaction-related dashboards
* Producer AI Dashboard
* AI Insights
* AI Analysis
* ChatGPT assistance
* Producer-specific identity/KYC
* documents
* extended identity
* dashboards
* history
* reporting

There are also supporting APIs, services, configuration files and documentation.

Do not assume the list above is exhaustive.

SEARCH THE PROJECT FOR ALL OTHER PRODUCER-RELATED FUNCTIONALITY.

---

# 4. EXCLUDE THESE FROM THE PRODUCER PRESENTATION

Do NOT create separate Producer navigation sections for:

### Platform Overview

### Generic Authentication

### Generic Onboarding

This means the final Producer Flow must NOT be organized around:

* Welcome
* Sign In
* Sign Up
* OTP
* 2FA
* Welcome Bonus
* Refer & Earn
* Generic Role Selection
* Generic Trading Role

Authentication and identity may remain technically necessary underneath the application.

Producer-specific identity/KYC must remain where required.

But these generic sections must NOT dominate or fragment the final Producer Flow.

---

# 5. THE CENTRAL OBJECTIVE

Create one authoritative entry point:

# COMPLETE PRODUCER FLOW

Everything Producer-related must ultimately be reachable from this flow.

There should NOT be:

* Producer Flow A
* Producer Flow B
* Producer Flow C
* Producer Flow Demo
* Producer Flow Enhanced
* Producer Flow V1
* Producer Flow Final
* Producer Flow Alternate

Instead:

# ONE AUTHORITATIVE PRODUCER FLOW

Internally reuse the best existing implementation of each capability.

---

# 6. DO NOT MEASURE SUCCESS BY SCREEN COUNT

The objective is NOT:

"Reduce the number of screens."

The objective is:

"Remove duplicate implementations while preserving 100% of unique business functionality."

Therefore:

### Duplicate UI + same functionality

MERGE.

### Similar UI + different functionality

MERGE functionality.

### Older screen + unique business rule

RETAIN the rule.

### Newer screen + better implementation

PREFER the better implementation.

### Wireframe + implemented screen

Use the implemented screen, but retain any unique requirements from the wireframe.

### Demo + production-like implementation

Prefer the functional implementation while retaining unique demo functionality.

### Multiple navigators

Create ONE authoritative navigator.

---

# 7. INTELLIGENT DUPLICATE-RESOLUTION LOOP

Execute the following loop repeatedly.

## LOOP

### STEP A — DISCOVER

Search the existing code/project for one Producer capability.

Examples:

* Activity
* Crop
* Harvest
* Quality
* Lot
* Storage
* Sell
* Provenance
* QR
* Tokenization
* Commission Agent
* AI
* Media
* Documents

### STEP B — COLLECT

Identify every implementation of that capability.

Do not modify anything yet.

### STEP C — COMPARE

Compare:

* UI
* fields
* actions
* business rules
* validation
* navigation
* states
* data
* API calls
* error handling
* success handling
* unique functionality

### STEP D — SELECT

Select the strongest existing implementation as the canonical implementation.

### STEP E — MERGE

Copy/retain any unique functionality from the other implementations into the canonical implementation.

### STEP F — CONNECT

Connect the canonical implementation to the Producer Master Flow.

### STEP G — VERIFY

Confirm that no unique functionality disappeared.

### STEP H — MOVE ON

Proceed to the next capability.

Do NOT repeatedly rebuild the same capability.

END LOOP.

---

# 8. CREDIT-EFFICIENCY RULE — VERY IMPORTANT

Figma Make credits are limited.

Therefore:

## DO NOT

* rebuild all screens
* regenerate existing UI
* recreate existing components
* rewrite working components unnecessarily
* make large stylistic changes
* regenerate the entire application
* create duplicate components
* repeatedly inspect the same files
* repeatedly modify the same screen

## DO

Use:

**SCAN → CLASSIFY → REUSE → PATCH → CONNECT → TEST**

Prefer small targeted modifications.

Make one logical change per iteration.

After a capability is consolidated, mark it as completed conceptually and do not repeatedly reprocess it.

---

# 9. FIRST PASS MUST BE ANALYSIS ONLY

Before changing the UI significantly, perform a lightweight internal inventory.

Classify existing Producer functionality into:

1. Identity
2. Producer Profile
3. Farm
4. Field/Plot
5. Crop
6. Crop Lifecycle
7. Activities
8. Cost
9. Harvest
10. Post-Harvest
11. Media
12. Quality
13. Sampling
14. AI Quality
15. Lot
16. QR
17. Provenance
18. Tokenization
19. Storage
20. Selling
21. Commission Agent
22. Buyer Interaction
23. Transaction
24. Documents
25. Notifications
26. History
27. Reports
28. AI Insights
29. Producer Dashboard
30. Producer AI Dashboard

Also identify any additional Producer functionality not included above.

Do not delete anything during this first classification.

---

# 10. PRODUCER MASTER BUSINESS JOURNEY

The consolidated flow must logically represent:

**Producer Identity**

↓

**Producer Profile**

↓

**Farm / Field / Plot**

↓

**Crop Selection**

↓

**Crop Lifecycle**

↓

**Log Activities**

↓

**Input / Cost Tracking**

↓

**Crop Health / Monitoring**

↓

**Harvest**

↓

**Post-Harvest**

↓

**Create Lot**

↓

**Lot Management**

↓

**Quality Sampling**

↓

**Quality Assessment**

↓

**AI Quality Assessment**

↓

**Grading / Confirmation**

↓

**QR Identification**

↓

**Provenance Tracking**

↓

**Lot Tokenization**

↓

**Storage OR Sell**

↓

**Storage Management OR Selling Workflow**

↓

**Buyer / Commission Agent / Marketplace Interaction**

↓

**Quantity / Weighing / Quality Confirmation**

↓

**Order / Sale Confirmation**

↓

**Transaction**

↓

**Documentation**

↓

**History**

↓

**Analytics**

↓

**AI Insights**

This is the target business backbone.

Do not remove intermediate steps simply to shorten the flow.

---

# 11. PRODUCER ACTIVITY SYSTEM — ZERO LOSS

The Activity system is a CORE Producer capability.

Preserve the complete Activity functionality.

Retain every activity already implemented.

At minimum retain:

* Ploughing
* Sowing / Transplanting
* Irrigation
* Fertigation
* Pesticide Spraying
* Fertilizer Application
* Weed Management
* Mulching
* Biological Amendment
* Micronutrient Spraying
* Plant Health Care
* Pruning / Training
* Harvesting
* Post Harvest
* Post-Harvest Process
* Custom Activity

If additional activities exist in the project:

RETAIN THEM.

Do not replace the activity list with a smaller list.

---

# 12. ACTIVITY DATA MUST SURVIVE CONSOLIDATION

Retain all existing activity information, including wherever implemented:

* Activity Type
* Date
* Time
* Farm
* Field
* Plot
* Crop
* Crop Cycle
* Growth Stage
* Area
* Input
* Material
* Quantity
* Unit
* Labour
* Machinery
* Equipment
* Service Provider
* Cost
* Location
* GPS
* Weather/context
* Photos
* Videos
* Documents
* Notes
* Remarks
* Attachments
* Verification
* Approval
* Status
* Created By
* Created Date
* Updated Date

Do not invent replacements for existing fields.

---

# 13. ACTIVITY LIFECYCLE

Ensure:

**Log New Activity**

→ Activity Type

→ Activity Details

→ Input/Material

→ Quantity/Unit

→ Labour/Equipment

→ Cost

→ Media/Evidence

→ Notes

→ Save

→ Confirmation

→ History

→ View/Edit

→ Analytics

The exact existing implementation should be reused wherever possible.

---

# 14. CROP SYSTEM

Consolidate all existing crop functionality.

Retain:

* Crop Selection
* AI Crop Selection
* Crop Profile
* Crop Lifecycle
* Multi-Crop Tracking
* Crop Health
* Crop History
* Crop Journal
* Crop Tokenization
* Crop-related AI insights

Do not allow crop functionality to exist in disconnected parallel implementations.

---

# 15. HARVEST AND POST-HARVEST

Connect:

**Crop Lifecycle**

→ Activities

→ Harvest

→ Post-Harvest

→ Lot Creation

Preserve every existing harvest and post-harvest feature.

---

# 16. COST AND FINANCE

Consolidate:

* Input Cost Tracker
* Enhanced Input Cost Tracker
* Cost Tracking
* Finance Section
* Cost-related AI dashboard functionality

Retain unique functionality from each.

The final relationship should support:

**Activity Cost → Crop Cost → Production Cost → Harvest/Lot Cost → Selling Economics**

Do not remove existing cost information.

---

# 17. QUALITY + SAMPLING

Consolidate all quality implementations.

Retain:

* Quality Check
* Dynamic Quality Form
* Quality Check Workflow
* Enhanced AI Quality Check
* Grok AI Quality Assessment
* Grading
* Sampling
* Quality Results
* Quality Confirmation
* Quality History

The quality journey must remain:

**Lot**

→ Sampling

→ Quality Data

→ Manual/AI Assessment

→ Grading

→ Confirmation

→ Final Quality Record

Do not remove sampling.

---

# 18. AI QUALITY

Where multiple AI quality implementations exist:

SELECT THE BEST.

Then merge unique functionality from the others.

Retain:

* Image/media input
* AI analysis
* Quality parameters
* Results
* Confidence information where implemented
* Manual review
* Grading
* Confirmation
* Error
* Retry
* Final record

Do not create multiple competing AI Quality screens.

---

# 19. MEDIA SYSTEM

Consolidate:

* AI Media Capture
* Simple Media Capture
* Complete Media Capture
* Media Upload
* Camera
* Camera Framing
* Permission handling

Retain all unique functionality.

Do not repeatedly rebuild camera/media UI.

---

# 20. CAMERA STATES

Preserve:

* Permission request
* Granted
* Denied
* Permanently denied
* Camera unavailable
* Retry
* Upload alternative
* Error state

The existing camera fixes must not be broken.

---

# 21. LOT MANAGEMENT

Consolidate:

* Create Lots
* Create Lot Workflow
* Lots Overview
* Lot Management Wireframes
* Lot Creation Tokenization
* Lot Tokenization Guide
* Lot Tokenization Diagram

The canonical Lot journey should connect:

**Harvest → Lot → Quality → QR → Provenance → Tokenization → Storage/Sell**

---

# 22. QR

Consolidate all QR implementations.

Retain:

* QR generation
* QR scanning
* QR display
* QR association
* QR status
* QR history
* Grok QR Scanner where it contains unique functionality

Do not create competing QR implementations.

---

# 23. PROVENANCE

Consolidate:

* Provenance Tracker
* Provenance Tracker with Auth
* Provenance API
* QR/NFT provenance

Preserve unique authentication, API, traceability and UI functionality.

The final provenance system must connect to the Producer Lot.

---

# 24. TOKENIZATION

Consolidate:

* Lot & Tokenization
* Lot Creation Tokenization
* Crop Journaling Tokenization
* Token-related Producer functionality
* Existing token verification/commit functionality

Do not delete token functionality because it is technically complex.

---

# 25. STORAGE

Consolidate:

* Inventory Storage
* Enhanced Storage Selection
* Storage/Sell Flow
* Storage Dashboard
* Storage Management

The Producer must be able to:

**Create Lot**

→ Choose

**STORE**

→ Storage workflow

OR

**SELL**

→ Selling workflow

Do not eliminate either branch.

---

# 26. SELLING

Retain ALL existing Producer selling paths.

Where implemented, preserve:

* Sell Now
* Sell at Producer Location
* Commission Agent
* Marketplace
* Buyer
* Post Requirement
* Advanced Post Requirement
* Matchmaking
* Market/Auction
* Commodity Listing
* Harvest Commodity Listing

Do not collapse distinct business pathways into one generic Sell screen if they have different functionality.

---

# 27. COMMISSION AGENT FLOW

This is a significant Producer business pathway.

Consolidate:

* Commission Agent Engagement
* Commission Agent Flow Navigator
* Commission Agent Order Form
* Commission Agent Configuration

Preserve the complete flow.

Do not treat Commission Agent functionality as a separate unrelated application.

It must be one branch of Producer selling.

---

# 28. BUYER INTERACTION

Retain Producer-facing buyer functionality including:

* Buyer Verification
* Buyer interaction
* Matchmaking
* Order
* Order confirmation
* Quantity
* Quality
* Destination
* Receiving
* Transaction

Preserve all unique fields and states.

---

# 29. TRANSACTION

The final Producer flow must not stop after "Sell".

Connect:

**Sell**

→ Buyer/Agent

→ Lot

→ Quality

→ Quantity

→ Weighing/Measurement where implemented

→ Confirmation

→ Order

→ Destination/Receiving where implemented

→ Transaction

→ Documentation

→ History

---

# 30. DASHBOARDS

Create ONE authoritative Producer Dashboard.

Reuse the strongest existing implementation.

Integrate unique functionality from:

* Producer Dashboard
* Complete 8 Screen Dashboard
* Enhanced Dashboard
* Producer AI Dashboard
* AI Insights
* AI Analysis

Do not create multiple duplicate Producer dashboards.

---

# 31. PRODUCER AI

Retain the Producer AI layer.

Preserve:

* AI Dashboard
* AI Insights
* AI Analysis
* AI Quality
* AI Media
* Crop AI
* ChatGPT assistance
* Existing Grok-related Producer intelligence

Do not remove AI functionality during UI consolidation.

---

# 32. DOCUMENTS AND IDENTITY

Retain Producer-specific:

* Producer Profile
* Extended Producer Identity Verification
* Documents
* Confirmation
* Producer KYC dependencies

Do not delete these merely because generic KYC exists elsewhere.

---

# 33. KYC RULE

Generic KYC/Onboarding can remain in the application architecture.

But only **Producer-relevant identity/KYC functionality** should be integrated into the Producer Flow.

Do not duplicate:

* Generic Entity Onboarding
* Generic Role Selection
* Generic Authentication
* Generic Platform Overview

unless the Producer workflow genuinely requires a specific identity step.

---

# 34. HISTORY

The final Producer Flow must preserve history for:

* Activities
* Crops
* Harvest
* Costs
* Lots
* Quality
* QR
* Provenance
* Storage
* Sales
* Transactions
* Documents

Where existing history implementations exist, reuse them.

---

# 35. ERROR / EMPTY / LOADING / SUCCESS STATES

Do not consolidate only the happy path.

Preserve existing:

* Loading
* Empty
* Error
* Permission denied
* Validation failure
* Retry
* Save failure
* API failure
* AI failure
* Camera failure
* Success
* Confirmation
* Pending
* Verified
* Rejected

The existing bug fixes and stability work must not be lost.

---

# 36. NAVIGATION AUDIT

After consolidation, test the entire Producer Flow.

There must be:

NO dead ends.

NO broken Next buttons.

NO broken Back buttons.

NO orphan screens.

NO unreachable unique functionality.

NO duplicated competing navigators.

NO screen that stops the Producer journey prematurely.

Every branch must eventually reconnect to the appropriate Producer hub/history/dashboard.

---

# 37. MASTER NAVIGATION PRINCIPLE

Use:

# ProducerMasterFlowNavigator

as the conceptual authoritative navigation layer if it is already the strongest implementation.

Do not create another competing master navigator.

If another navigator contains better functionality:

MERGE that functionality INTO the authoritative navigator.

---

# 38. DESIGN PRINCIPLE

Preserve the established TRADIE visual language.

Do not perform a broad visual redesign.

Use existing:

* design system
* components
* typography
* colors
* buttons
* cards
* forms
* spacing
* navigation
* icons

Only adjust layout where required to make the unified Producer Flow coherent.

---

# 39. CODE QUALITY RULE

While consolidating:

* remove unreachable duplicate routes only after replacement is connected
* remove unused duplicate imports
* preserve working APIs
* preserve existing services
* preserve data structures
* preserve existing configuration
* avoid unnecessary refactoring
* avoid large unrelated code changes

Do not destabilize working functionality for cosmetic cleanup.

---

# 40. THREE-STATE DECISION MODEL

For every discovered Producer capability, classify it as exactly one of:

### KEEP

Unique or best existing implementation.

### MERGE

Duplicate implementation containing additional unique functionality.

### IGNORE

True duplicate containing no unique functionality.

IMPORTANT:

"IGNORE" means do not use that duplicate implementation in the final Producer Flow.

It does NOT mean delete business functionality blindly.

---

# 41. NEVER USE THIS RULE

Never use:

"Newest screen wins."

Never use:

"Oldest screen wins."

Never use:

"Shortest flow wins."

Never use:

"Fewest screens wins."

Instead use:

# BEST FUNCTIONALITY + COMPLETE BUSINESS LOGIC + BEST UX + ZERO UNIQUE FEATURE LOSS

---

# 42. CREDIT-MINIMIZATION LOOP

Execute the work in these compact batches.

## BATCH 1

Audit and consolidate:

Producer Dashboard
Producer Profile
Producer Identity

## BATCH 2

Audit and consolidate:

Farm
Field
Crop
Crop Lifecycle
Crop Health
Crop History

## BATCH 3

Audit and consolidate:

Activities
Activity Logger
Activity Tracking
Activity Costs

## BATCH 4

Audit and consolidate:

Harvest
Post-Harvest
Commodity Listing

## BATCH 5

Audit and consolidate:

Quality
Sampling
AI Quality
Grading

## BATCH 6

Audit and consolidate:

Lot
QR
Provenance
Tokenization

## BATCH 7

Audit and consolidate:

Media
AI Media
Camera
Permissions

## BATCH 8

Audit and consolidate:

Storage
Inventory
Storage Dashboard

## BATCH 9

Audit and consolidate:

Sell
Marketplace
Buyer
Matchmaking
Commission Agent
Orders

## BATCH 10

Audit and consolidate:

Transaction
Confirmation
Destination
Receiving
Documents
History

## BATCH 11

Audit and consolidate:

AI Dashboard
AI Insights
ChatGPT
Producer Analytics

## BATCH 12

Perform final navigation and completeness validation.

---

# 43. DO NOT REPROCESS COMPLETED BATCHES

Once a batch is consolidated successfully:

MARK IT COMPLETE.

Do not repeatedly revisit it unless a later integration genuinely requires a connection.

This is critical for reducing Figma Make credit consumption.

---

# 44. CROSS-BATCH INTEGRATION

After all batches are complete, perform ONE lightweight integration pass.

Connect:

**Identity**

→ **Producer Dashboard**

→ **Farm/Crop**

→ **Activities**

→ **Harvest**

→ **Lot**

→ **Quality**

→ **Traceability**

→ **Storage/Sell**

→ **Transaction**

→ **History/AI**

Do not rebuild the individual screens.

Only connect them.

---

# 45. FINAL MASTER PRODUCER FLOW

The final experience should conceptually resemble:

## 01 — Producer Home

Dashboard
AI Dashboard
Notifications
Quick Actions

↓

## 02 — Producer Profile

Identity
Documents
KYC-dependent information

↓

## 03 — Farm & Crop

Farm
Field/Plot
Crop
Crop Lifecycle

↓

## 04 — Activities

Log Activity
Activity Details
Inputs
Cost
Media
History

↓

## 05 — Crop Monitoring

Crop Health
AI Insights
Crop History

↓

## 06 — Harvest

Harvest
Post-Harvest

↓

## 07 — Lot

Create Lot
Lot Details
Lot History

↓

## 08 — Quality

Sampling
Quality Check
AI Quality
Grading
Confirmation

↓

## 09 — Traceability

QR
Provenance
NFT/QR

↓

## 10 — Tokenization

Lot Tokenization
Token Records

↓

## 11 — Decision

STORE

OR

SELL

↓

## 12A — Storage

Storage Selection
Inventory
Storage Dashboard
Stored Lot

↓

## 12B — Selling

Sell Now
Producer Location
Commission Agent
Marketplace
Buyer
Matchmaking

↓

## 13 — Order / Sale

Order
Quality
Quantity
Weighing/Measurement
Confirmation

↓

## 14 — Destination

Destination
Receiving

↓

## 15 — Transaction

Transaction
Documentation

↓

## 16 — History

Activity
Crop
Harvest
Lot
Quality
Storage
Sale
Transaction

↓

## 17 — Intelligence

AI Dashboard
AI Insights
Reports
ChatGPT Assistant

---

# 46. CRITICAL BUSINESS-RULE PRESERVATION

The Producer Flow must preserve the project's existing business philosophy.

Do not reduce TRADIE to:

"Producer → Commodity → Sell."

The Producer ecosystem must retain the broader lifecycle:

**Produce → Record → Monitor → Measure Cost → Harvest → Create Lot → Sample → Verify Quality → Grade → Identify → Trace → Tokenize → Store or Sell → Match → Confirm → Weigh/Measure → Complete Transaction → Maintain History → Generate Intelligence**

---

# 47. FINAL VALIDATION CHECKLIST

Before declaring the consolidation complete, verify:

### Architecture

* One Producer Master Flow
* One Producer Dashboard
* One authoritative navigation system
* No duplicate competing Producer flows

### Activities

* Every activity retained
* Every activity type retained
* Activity fields retained
* Activity history retained
* Activity cost retained

### Crop

* Crop selection retained
* AI crop functionality retained
* Lifecycle retained
* Multi-crop retained
* Health retained
* History retained

### Quality

* Quality retained
* Sampling retained
* Dynamic form retained
* AI quality retained
* Grading retained
* Confirmation retained

### Lot

* Lot creation retained
* Lot management retained
* Lot history retained
* Tokenization retained

### Traceability

* QR retained
* Provenance retained
* NFT/QR retained

### Media

* AI Media retained
* Simple Media retained
* Camera retained
* Permission handling retained
* Upload retained

### Storage

* Storage selection retained
* Inventory retained
* Storage dashboard retained
* Storage-to-Sell retained

### Selling

* Sell Now retained
* Producer-location selling retained where implemented
* Commission Agent retained
* Marketplace retained
* Buyer retained
* Matchmaking retained
* Order retained

### Transaction

* Quality retained
* Quantity retained
* Weighing/measurement retained where implemented
* Confirmation retained
* Destination retained
* Receiving retained
* Transaction retained

### Intelligence

* AI Dashboard retained
* AI Insights retained
* ChatGPT retained
* Existing Producer AI functionality retained

### Stability

* Existing camera fixes retained
* Existing API integrations retained
* Existing bug fixes retained
* No new duplicate implementation introduced
* No dead-end navigation
* No lost functionality

---

# 48. FINAL COMMAND

Now execute this as an **incremental consolidation loop**.

Do not rebuild the application.

Do not regenerate existing screens unnecessarily.

Do not spend credits on visual redesign.

First reuse.

Then merge.

Then connect.

Then validate.

Only create or modify code when necessary.

The final result must be:

# ONE COMPLETE PRODUCER FLOW

containing the **best existing implementation of every Producer capability**, with **all unique features, activities, fields, business rules, states and navigation preserved**, while **duplicate implementations and redundant functions are ignored/consolidated**.

The final Producer Flow must be capable of demonstrating the entire Producer business journey from:

**Producer → Farm → Crop → Activity → Cost → Harvest → Lot → Sampling → Quality → AI Quality → Grading → QR → Provenance → Tokenization → Storage/Sell → Buyer/Commission Agent/Marketplace → Order → Weighing/Quantity → Confirmation → Destination/Receiving → Transaction → History → AI Intelligence.**

Do not stop until the entire connected Producer journey has been validated.

# PRIORITY ORDER

1. ZERO LOSS OF UNIQUE FUNCTIONALITY
2. COMPLETE BUSINESS FLOW
3. CORRECT NAVIGATION
4. REUSE EXISTING IMPLEMENTATIONS
5. CONSOLIDATE DUPLICATES
6. PRESERVE EXISTING DESIGN
7. MINIMUM CODE CHANGES
8. MINIMUM FIGMA MAKE CREDIT CONSUMPTION
