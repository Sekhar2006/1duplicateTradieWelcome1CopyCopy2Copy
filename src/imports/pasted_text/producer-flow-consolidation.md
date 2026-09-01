# Figma Make Prompt — Complete Producer Flow Consolidation

## OBJECTIVE

Reorganize the current TRADIE Figma Make application so that the final application focuses exclusively on the **complete Producer Flow and every producer-related business, operational, quality, traceability, storage, selling, documentation, AI, dashboard, and activity-management capability**.

Do NOT redesign the business logic from scratch.

Do NOT simplify the Producer Flow.

Do NOT remove screens merely because they appear similar.

Your task is to **inspect the complete existing project, identify every Producer-related screen, component, flow, activity, state, navigation path, validation, action, and supporting feature, then consolidate them into one complete, logically ordered Producer ecosystem.**

The result must preserve the full business functionality while eliminating only genuine duplicates.

---

# 1. EXCLUDE THESE THREE SECTIONS COMPLETELY

Remove the following sections from the main TRADIE Platform Demo/navigation:

### 1. Platform Overview

Do not retain the generic "Platform Overview" section as a separate module.

### 2. Authentication

Do not include these as part of the Producer Flow presentation:

* Sign In
* Sign Up
* 2-Step Verification
* OTP Verification

Authentication may remain technically necessary in the application architecture, but it must NOT be presented as part of this Producer Flow consolidation.

### 3. Onboarding

Do not include the generic onboarding section:

* Welcome Bonus
* Refer & Earn
* Role Selection
* Trading Role

These must NOT appear as separate Producer Flow modules.

---

# 2. IMPORTANT — DO NOT DELETE PRODUCER FUNCTIONALITY

Removing the above three sections must NOT result in removal of any functionality that is required later by the Producer Flow.

If any producer workflow internally depends on authentication, identity, permissions, or onboarding data, preserve the underlying functionality as required by the application architecture, but do not expose the excluded generic sections in the Producer Flow navigation.

---

# 3. PRODUCER FLOW MUST BECOME THE PRIMARY EXPERIENCE

Make **Complete Producer Flow** the central and authoritative producer experience.

All existing Producer-related implementations must be consolidated into one coherent flow.

The final structure should represent the complete producer journey:

**Producer Identity → Producer Profile → Farm/Production Context → Activities → Crop/Commodity → Cost → Quality → Media → Lot → Traceability → Verification → Storage → Sell → Transaction → Documentation → History → Analytics → AI Insights**

Do not assume that the existing ordering is correct.

Inspect the complete project and establish the most logical business sequence.

---

# 4. MERGE ALL EXISTING PRODUCER FLOWS

Inspect and consolidate ALL existing Producer-related implementations, including but not limited to:

* TRADIE V1 Refined — 18 Screens
* End-to-End Trading Flow — 11 Steps
* 12-Screen Figma Presentation
* Complete Producer Flow
* Producer Login-related producer screens
* Producer Dashboard
* Cost Tracking
* Quality Check
* Dynamic Quality Form
* QR Code Manager
* Provenance Tracker
* Lot & Tokenization
* Flow Diagram
* Complete Guide & Tutorial
* Producer Wireframes
* Storage/Sell Flow
* AI Media Capture
* Simple Media Capture
* Figma JSON Exporter where producer-specific
* Complete AI Quality Check
* Storage & Sell Dashboard
* Confirmation
* Documents
* Extended Identity
* Producer AI Dashboard
* Producer-related KYC/identity screens
* Producer-related notification/status screens
* Producer-related transaction/history screens
* Any other producer functionality already implemented anywhere in the project

Search the entire project before deciding that a Producer feature does not exist.

---

# 5. DUPLICATE HANDLING — CRITICAL

There are multiple versions and implementations of Producer screens.

DO NOT simply keep every duplicate.

DO NOT simply delete every screen with a similar name.

Instead:

### Step 1

Identify all versions of each Producer feature.

### Step 2

Compare their:

* UI
* Fields
* Buttons
* Actions
* Business rules
* Navigation
* Validation
* Data captured
* Statuses
* Error states
* Success states
* Empty states
* Loading states
* Edit functionality
* Confirmation functionality
* Back navigation
* Next navigation
* Conditional navigation

### Step 3

Create ONE authoritative implementation for each business capability.

### Step 4

When two screens are duplicates, merge the best functionality from both.

### Step 5

If one version contains functionality missing from another version, RETAIN that functionality.

### Step 6

Never remove a unique field, action, activity, validation, state, or business rule merely because another screen looks similar.

### GOLDEN RULE

**Remove duplicate implementations, NOT functionality.**

---

# 6. PRODUCER ACTIVITY MANAGEMENT MUST BE FULLY RETAINED

This is a critical requirement.

The complete Producer Activity functionality must remain intact.

Do not omit, simplify, rename away, or hide any producer activity.

Retain the complete activity lifecycle:

**Log New Activity → Select Activity Type → Enter Activity Details → Capture Date/Time → Location → Inputs/Materials → Quantity → Cost → Media/Evidence → Notes → Save → Verification → Activity History → Edit/View → Analytics**

Preserve every existing Producer Activity type already implemented in the project.

In particular, retain activity categories such as:

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

If additional activities exist anywhere in the project, retain them too.

Do NOT restrict the system to the activity list above if the existing application contains more.

---

# 7. ACTIVITY DETAILS MUST NOT BE LOST

Every activity must retain all currently implemented data fields and functionality.

Where applicable, preserve:

* Activity type
* Activity date
* Start/end time
* Farm
* Field
* Plot
* Crop
* Variety
* Growth stage
* Area
* Input/material
* Input quantity
* Unit
* Labour
* Machinery
* Equipment
* Service provider
* Cost
* Weather/context information if already implemented
* GPS/location information if already implemented
* Photos
* Videos
* Documents
* Notes
* Remarks
* Attachments
* Verification status
* Approval status
* Activity status
* Created date
* Updated date
* User information

Do not invent unnecessary fields, but do not remove existing fields.

---

# 8. PRESERVE THE COMPLETE PRODUCER CROP/COMMODITY JOURNEY

The Producer Flow must support the complete relationship between:

**Producer → Farm → Field/Plot → Crop → Crop Cycle → Activities → Harvest → Lot → Quality → Storage/Sale**

Every existing implementation supporting this relationship must be retained.

The user must never reach a dead-end where an activity, crop, harvest, lot, quality record, storage record, or sale cannot be connected to the appropriate parent record.

---

# 9. COST TRACKING MUST BE INTEGRATED WITH ACTIVITIES

Do not keep Cost Tracking as an isolated feature if the existing business logic allows activity-level costs.

Integrate cost information logically with:

* Activities
* Inputs
* Labour
* Machinery
* Services
* Production
* Harvest
* Lot
* Storage
* Sale

Preserve all existing cost fields and calculations.

Where already supported, allow the Producer to understand:

**Activity Cost → Crop Cost → Production Cost → Lot Cost → Selling Economics**

Do not invent financial calculations that are not already supported, but preserve existing ones.

---

# 10. HARVEST AND POST-HARVEST FLOW

Ensure that harvesting is connected to the producer's previous crop/activity history.

The flow should logically support:

**Crop → Activities → Harvest → Post-Harvest → Lot Creation → Quality → Storage/Sale**

Retain all existing post-harvest functionality.

Do not treat harvesting as an isolated screen.

---

# 11. LOT MANAGEMENT

Retain and consolidate all Lot functionality.

The Producer must be able to associate relevant information with a lot, including whatever is already implemented for:

* Crop
* Harvest
* Quantity
* Unit
* Date
* Location
* Quality
* Media
* QR
* Provenance
* Storage
* Sale
* Transaction
* Documentation
* Tokenization

Do not remove any existing lot fields or relationships.

---

# 12. QUALITY MANAGEMENT

Integrate all Producer Quality functionality.

Retain:

* Quality Check
* Dynamic Quality Form
* AI Quality Check
* Quality parameters
* Sampling information
* Sample records
* Quality results
* Quality grades
* Quality status
* Supporting media
* Supporting documentation
* Confirmation
* Verification
* History

If the project already contains different quality workflows, merge them into a coherent Producer Quality lifecycle.

The flow should logically support:

**Lot → Sample → Quality Assessment → Result → Confirmation → Quality Record**

Do not lose any existing sampling or quality-related functionality.

---

# 13. AI QUALITY CHECK

Retain the complete AI Quality Check functionality.

Do not replace it with a simple placeholder.

Preserve all existing:

* Input methods
* Media capture
* AI processing states
* Results
* Quality indicators
* Confidence information if implemented
* Manual review
* Confirmation
* Error handling
* Retry handling
* Final quality record

AI-assisted results must remain distinguishable from manually entered/verified results where the existing implementation supports this distinction.

---

# 14. MEDIA CAPTURE

Consolidate:

* AI Media Capture Demo
* Simple Media Capture
* Camera functionality
* Upload functionality
* Producer evidence capture

Do not remove functionality simply because two media screens are similar.

Create one coherent media-capture architecture while preserving all capabilities.

Support existing functionality for:

* Camera
* Gallery/upload
* Photos
* Videos
* Documents
* Evidence
* Attachments
* Preview
* Retake
* Delete
* Confirm
* Upload status
* Error handling

---

# 15. CAMERA PERMISSION STATES

Retain the existing camera-permission test and convert it into proper application states where appropriate.

Handle:

* Permission not requested
* Permission granted
* Permission denied
* Permission permanently denied
* Camera unavailable
* Retry
* Alternative upload

Do not remove the existing camera-permission functionality.

---

# 16. QR CODE MANAGER

Retain the complete QR Code Manager.

Ensure QR functionality can be connected to the relevant producer records where already implemented:

**Producer → Crop → Harvest → Lot → Quality → Storage → Sale**

Preserve:

* QR generation
* QR display
* QR scanning
* QR identification
* QR status
* QR association
* QR history

Only implement capabilities that already exist or are clearly part of the existing Producer Flow.

---

# 17. PROVENANCE TRACKER

Retain the complete:

**Provenance Tracker — NFT/QR**

functionality.

Preserve the relationship between the physical commodity and its digital traceability record.

The provenance journey should remain connected to:

* Crop
* Harvest
* Lot
* Quality
* Storage
* Movement
* Sale
* Supporting evidence

Do not remove any existing provenance steps.

---

# 18. TOKENIZATION

Retain:

**Lot & Tokenization**

as part of the Producer ecosystem.

Do not separate it into an unrelated feature.

Where already implemented, preserve the relationship between:

**Physical Lot → Digital Identity → Traceability → Tokenization**

Do not remove existing token-related screens or states.

---

# 19. STORAGE FLOW

Retain the complete:

**Storage/Sell Flow — 8 Screens**

and integrate it with the Producer Flow.

The Producer must be able to logically move from a commodity/lot to:

### Option A — Store

or

### Option B — Sell

Do not remove either branch.

Preserve all existing screens, decisions, forms, validations and states in both branches.

---

# 20. STORAGE MANAGEMENT

Retain all existing storage-related Producer functionality.

Where implemented, preserve:

* Storage selection
* Storage details
* Commodity quantity
* Lot information
* Storage status
* Storage duration
* Storage records
* Stored quantity
* Available quantity
* Movement
* Release
* Sale after storage

Do not invent functionality merely to fill gaps.

---

# 21. SELL FLOW

Retain every existing Producer selling pathway.

If multiple selling methods already exist, preserve all of them.

For example, if the project contains:

* Sell Now
* Sell at Producer Location
* Sell through Commission Agent
* Other existing selling routes

they must all remain accessible.

Do not collapse different business pathways into one generic "Sell" button if that causes business logic to disappear.

---

# 22. TRANSACTION FLOW

Retain all existing Producer transaction-related functionality.

Where already implemented, preserve the complete sequence around:

* Sale initiation
* Buyer/agent selection
* Commodity/lot selection
* Quantity
* Quality
* Sampling
* Confirmation
* Weighing/measuring
* Sale confirmation
* Documentation
* Status
* History

Do not remove intermediate business steps simply to shorten the UI.

---

# 23. DOCUMENTS AND IDENTITY

Retain Producer-specific:

* Confirmation
* Documents
* Extended Identity

Integrate them wherever they logically belong within the Producer lifecycle.

Do not expose the generic Authentication or generic Onboarding sections that were explicitly excluded.

Producer-specific identity/KYC requirements may remain where they are necessary for Producer operations.

---

# 24. PRODUCER DASHBOARD

Create one authoritative **Producer Dashboard**.

Do not retain multiple duplicate Producer Dashboards.

Merge the strongest functionality from all existing versions.

The dashboard should provide access to the Producer's major operational areas already present in the project, including where implemented:

* Farms
* Crops
* Activities
* Costs
* Harvest
* Lots
* Quality
* QR
* Provenance
* Storage
* Sell
* Transactions
* Documents
* Notifications
* AI insights
* Reports
* History

Do not remove existing dashboard functionality.

---

# 25. PRODUCER AI DASHBOARD

Retain the **Producer AI Dashboard**.

Integrate it with the main Producer Dashboard rather than creating unnecessary duplicate dashboard experiences.

Preserve existing AI functionality and clearly distinguish:

**Operational Dashboard**
from
**AI/Insight Dashboard**

If the existing design supports a unified dashboard with separate sections/tabs, use that approach.

---

# 26. PRODUCER HISTORY

Ensure the consolidated Producer Flow preserves historical records.

Where already implemented, provide access to:

* Activity History
* Crop History
* Harvest History
* Lot History
* Quality History
* Storage History
* Sale History
* Transaction History
* Document History

Do not lose historical data access during consolidation.

---

# 27. STATUS AND STATE MANAGEMENT

Every existing Producer workflow must retain its important states.

Do not design only the successful "happy path".

Preserve existing states such as:

* Draft
* In Progress
* Pending
* Submitted
* Under Review
* Approved
* Rejected
* Verified
* Completed
* Cancelled
* Failed
* Error
* Retry
* Empty
* Loading

Only use states that already exist or are required by the current workflow.

---

# 28. NAVIGATION — CRITICAL

The entire Producer Flow must be navigable from beginning to end.

There must be NO dead-end screens.

Every relevant screen must have an appropriate:

* Next
* Continue
* Save
* Submit
* Confirm
* Back
* Cancel
* Skip where applicable
* Finish
* View
* Edit
* Retry

Do not allow a workflow to stop at an intermediate screen.

This is especially important for all long Producer flows.

---

# 29. NO BROKEN FLOW

Perform a complete navigation audit after consolidation.

Test every Producer pathway from start to finish.

Specifically verify:

### Activity Flow

**Log Activity → Details → Media → Cost → Save → Confirmation → History**

### Crop Flow

**Crop → Activities → Harvest → Lot**

### Quality Flow

**Lot → Sampling → Quality → AI/Manual Assessment → Confirmation**

### Traceability Flow

**Lot → QR → Provenance → Digital Record**

### Storage Flow

**Lot → Storage → Storage Dashboard → Stored Commodity**

### Sell Flow

**Lot → Sell → Selling Method → Quality/Quantity → Confirmation → Transaction**

### Storage-to-Sell Flow

**Stored Lot → Release/Select → Sell → Confirmation → Transaction**

Every path must continue to completion.

---

# 30. DO NOT LOSE BUSINESS LOGIC DURING UI CONSOLIDATION

This is a business-flow consolidation exercise, NOT merely a visual redesign.

When merging screens, preserve:

* Business rules
* Data fields
* Relationships
* Validation
* Conditional logic
* Navigation
* Statuses
* User actions
* Calculations
* Confirmations
* Error states
* Data persistence
* Existing mock data
* Existing interactions

---

# 31. WIREFRAMES

The existing **36-screen Low-Fi Wireframes** should be treated as supporting design references.

Do not automatically delete them.

Use them to identify Producer-related functionality and ensure that no unique business requirement represented in the wireframes is lost.

If a wireframe duplicates an implemented Producer screen, use the implemented screen as the primary version while retaining any unique functionality from the wireframe.

---

# 32. FLOW DIAGRAM

Retain the Producer Flow Diagram as a reference for validating the final navigation.

After consolidation, the actual clickable prototype must correspond to the business flow represented by the diagram.

If there is a conflict between duplicate implementations, identify the correct business sequence from the combined project rather than arbitrarily choosing one screen.

---

# 33. COMPLETE GUIDE & TUTORIAL

Retain Producer-specific guide/tutorial content where it contains unique information.

Do not allow documentation screens to become dead-end screens.

Where appropriate, connect the guide to the relevant Producer feature.

---

# 34. REMOVE ONLY TRUE DUPLICATES

Before deleting anything, classify each item as:

### A. Unique Producer Functionality

KEEP.

### B. Duplicate Screen With Same Functionality

MERGE.

### C. Duplicate Screen With Additional Functionality

MERGE and retain the additional functionality.

### D. Generic Authentication

EXCLUDE from the Producer presentation.

### E. Generic Onboarding

EXCLUDE from the Producer presentation.

### F. Generic Platform Overview

EXCLUDE from the Producer presentation.

### G. Producer-Specific Functionality Hidden Inside Another Module

EXTRACT/INTEGRATE into Producer Flow.

---

# 35. FINAL PRODUCER INFORMATION ARCHITECTURE

Organize the final Producer experience approximately around the following structure, but use the existing project logic wherever it provides a better sequence:

## Producer Home

* Producer Dashboard
* AI Dashboard
* Notifications
* Quick Actions

## Producer Profile & Identity

* Profile
* Extended Identity
* Documents
* Producer-specific KYC

## Farm / Production

* Farm
* Field/Plot
* Crop
* Crop Cycle

## Activities

* Log New Activity
* All Activity Types
* Activity Details
* Activity Media
* Activity Cost
* Activity History
* Activity Edit/View

## Crop & Harvest

* Crop Progress
* Harvest
* Post-Harvest
* Harvest Records

## Cost Management

* Cost Tracking
* Activity Costs
* Production Costs
* Lot Costs

## Quality

* Quality Check
* Dynamic Quality Form
* Sampling
* AI Quality Check
* Quality Results
* Quality History

## Lot Management

* Create Lot
* Lot Details
* Lot History
* Lot Status

## Traceability

* QR Code Manager
* Provenance Tracker
* NFT/QR
* Digital Record

## Tokenization

* Lot & Tokenization
* Token-related Producer functionality already implemented

## Storage

* Storage/Sell Flow
* Storage Selection
* Storage Records
* Storage Dashboard
* Stored Lots
* Storage History

## Selling

* Sell Now
* Existing Producer selling pathways
* Commission Agent pathway where already implemented
* Producer-location selling pathway where already implemented
* Sale Confirmation
* Transaction

## Media

* AI Media Capture
* Simple Media Capture
* Camera
* Gallery
* Documents/Evidence

## History

* Activities
* Crops
* Harvest
* Lots
* Quality
* Storage
* Sales
* Transactions

## AI

* Producer AI Dashboard
* AI Quality
* AI Media
* Existing Producer AI functionality

---

# 36. RESPONSIVE AND MULTI-PLATFORM REQUIREMENT

Maintain the existing responsive and multi-platform design principles.

The consolidated Producer Flow must work consistently across the supported application layouts.

Do not create a desktop-only Producer experience.

---

# 37. DESIGN CONSISTENCY

While consolidating screens:

* Preserve the existing TRADIE visual identity.
* Maintain consistent typography.
* Maintain consistent buttons.
* Maintain consistent cards.
* Maintain consistent form controls.
* Maintain consistent spacing.
* Maintain consistent status indicators.
* Maintain consistent navigation.
* Maintain consistent icons.
* Maintain consistent colors.

Do not unnecessarily redesign the existing visual language.

---

# 38. DO NOT CREATE FAKE FEATURES

Do not add arbitrary new business functionality simply to make the flow appear complete.

Use the existing project as the primary source of truth.

Where functionality exists in multiple forms, consolidate it.

Where functionality exists only once, preserve it.

Where a navigation connection is missing but the next existing Producer screen is obvious, connect the existing screen rather than inventing a new feature.

---

# 39. FINAL VALIDATION — MANDATORY

After making the changes, perform a complete Producer Flow audit.

Verify:

1. Every Producer screen has been identified.
2. Every Producer feature has been retained.
3. Every Producer activity has been retained.
4. Every activity type has been retained.
5. Every unique field has been retained.
6. Every unique business rule has been retained.
7. Every unique validation has been retained.
8. Every meaningful state has been retained.
9. Duplicate screens have been consolidated.
10. Generic Platform Overview has been excluded.
11. Generic Authentication has been excluded from the Producer presentation.
12. Generic Onboarding has been excluded.
13. Producer-specific identity/KYC functionality has been retained where required.
14. Quality functionality has been retained.
15. Sampling functionality has been retained.
16. AI Quality functionality has been retained.
17. QR functionality has been retained.
18. Provenance functionality has been retained.
19. Lot functionality has been retained.
20. Tokenization functionality has been retained.
21. Storage functionality has been retained.
22. Sell functionality has been retained.
23. Storage-to-Sell functionality has been retained.
24. Media capture functionality has been retained.
25. Camera permission/error handling has been retained.
26. Documents and Extended Identity have been retained.
27. Producer Dashboard has been consolidated.
28. Producer AI Dashboard has been retained.
29. Producer history has been retained.
30. No Producer flow ends prematurely.
31. No Producer screen is unreachable.
32. No important action leads to a dead end.
33. Back/Next/Save/Confirm/Submit navigation works correctly.
34. The complete Producer journey can be demonstrated from beginning to end.

---

# 40. FINAL SUCCESS CRITERION

The final result must NOT be judged by the number of screens.

It must be judged by **business-flow completeness**.

The objective is:

**FEWER DUPLICATES + ZERO LOSS OF UNIQUE PRODUCER FUNCTIONALITY + COMPLETE END-TO-END PRODUCER FLOW.**

The final TRADIE Producer experience must behave as one coherent ecosystem rather than a collection of independently created demos.

### MOST IMPORTANT RULE

**DO NOT DELETE ANY PRODUCER BUSINESS ACTIVITY OR UNIQUE FUNCTIONALITY IN ORDER TO REMOVE DUPLICATES.**

When in doubt:

**MERGE → PRESERVE → CONNECT → VALIDATE**

rather than:

**DELETE → SIMPLIFY → REPLACE**

Complete the consolidation only after verifying the entire Producer Flow from **Producer activity creation through crop/harvest, lot, quality, traceability, storage/sell, transaction, history and AI-assisted functionality**.
