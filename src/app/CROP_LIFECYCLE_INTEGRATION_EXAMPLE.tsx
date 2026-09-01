// ============================================================================
// EXAMPLE: How to Add Crop Lifecycle Tracker to Post Requirement Button
// ============================================================================

import { useState } from "react";
import { Sprout } from "lucide-react";
import { DSButton } from "./design-system";
import { Dialog, DialogContent } from "./ui/dialog";
import { CropLifecycleTracker } from "./CropLifecycleTracker";

// ============================================================================
// Option 1: Add to ProducerAIDashboard Quick Actions
// ============================================================================

export function ProducerAIDashboardExample() {
  const [showCropLifecycle, setShowCropLifecycle] = useState(false);

  const quickActions = [
    {
      id: "post-req",
      label: "Post Requirement",
      icon: <Plus size={24} />,
      color: "#FFD700",
      onClick: () => setActiveSection("post-requirement"),
    },
    {
      id: "crop-lifecycle",  // NEW ACTION
      label: "Crop Lifecycle",
      icon: <Sprout size={24} />,
      color: "#22C55E",
      onClick: () => setShowCropLifecycle(true),
    },
    // ... other actions
  ];

  return (
    <>
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <DSCard
            key={action.id}
            onClick={action.onClick}
            className="cursor-pointer"
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${action.color}20`,
                  color: action.color,
                }}
              >
                {action.icon}
              </div>
              <p>{action.label}</p>
            </div>
          </DSCard>
        ))}
      </div>

      {/* Crop Lifecycle Modal */}
      {showCropLifecycle && (
        <Dialog open={showCropLifecycle} onOpenChange={setShowCropLifecycle}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <CropLifecycleTracker onClose={() => setShowCropLifecycle(false)} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

// ============================================================================
// Option 2: Add to Tabs (Alongside Post Requirement)
// ============================================================================

export function ProducerAIDashboardWithTabsExample() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <Tabs value={activeSection} onValueChange={setActiveSection}>
      <TabsList className="mb-6 grid grid-cols-5 md:grid-cols-10">
        <TabsTrigger value="dashboard">🏠 Dashboard</TabsTrigger>
        <TabsTrigger value="post-requirement">🌾 Post</TabsTrigger>
        <TabsTrigger value="crop-lifecycle">🌱 Lifecycle</TabsTrigger>
        <TabsTrigger value="activities">📅 Activities</TabsTrigger>
        {/* ... other tabs */}
      </TabsList>

      <TabsContent value="dashboard">
        {/* Dashboard content */}
      </TabsContent>

      <TabsContent value="post-requirement">
        <PostRequirementAdvanced />
      </TabsContent>

      <TabsContent value="crop-lifecycle">
        <CropLifecycleTracker />
      </TabsContent>

      {/* ... other tab contents */}
    </Tabs>
  );
}

// ============================================================================
// Option 3: Add Button Inside Post Requirement Component
// ============================================================================

export function PostRequirementWithLifecycleButton() {
  const [showLifecycle, setShowLifecycle] = useState(false);

  return (
    <div className="space-y-6">
      {/* Post Requirement Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">🌾 Post Requirement</h2>
        <DSButton
          variant="primary"
          onClick={() => setShowLifecycle(true)}
        >
          <Sprout className="w-5 h-5 mr-2" />
          Track Crop Lifecycle
        </DSButton>
      </div>

      {/* Post Requirement Content */}
      <div>
        {/* ... existing post requirement content ... */}
      </div>

      {/* Crop Lifecycle Tracker (Full Screen Overlay) */}
      {showLifecycle && (
        <div className="fixed inset-0 z-50 bg-white">
          <CropLifecycleTracker onClose={() => setShowLifecycle(false)} />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Option 4: Add to PostRequirementAdvanced Component
// ============================================================================

export function PostRequirementAdvancedWithLifecycle() {
  const [view, setView] = useState<"planning" | "lifecycle">("planning");

  return (
    <div className="max-w-7xl mx-auto">
      {/* View Switcher */}
      <div className="flex gap-3 mb-6">
        <DSButton
          variant={view === "planning" ? "primary" : "outline"}
          onClick={() => setView("planning")}
        >
          🌾 Multi-Crop Planning
        </DSButton>
        <DSButton
          variant={view === "lifecycle" ? "primary" : "outline"}
          onClick={() => setView("lifecycle")}
        >
          <Sprout className="w-5 h-5 mr-2" />
          Crop Lifecycle Tracker
        </DSButton>
      </div>

      {/* Content */}
      {view === "planning" ? (
        <div>{/* Post Requirement Advanced Content */}</div>
      ) : (
        <CropLifecycleTracker />
      )}
    </div>
  );
}

// ============================================================================
// Option 5: As a Separate Route/Screen
// ============================================================================

export function AppWithCropLifecycle() {
  const [screen, setScreen] = useState<"dashboard" | "post-req" | "lifecycle">("dashboard");

  return (
    <>
      {screen === "dashboard" && (
        <ProducerAIDashboard
          onNavigate={(dest) => setScreen(dest)}
        />
      )}

      {screen === "post-req" && (
        <PostRequirementAdvanced
          onNavigate={(dest) => setScreen(dest)}
        />
      )}

      {screen === "lifecycle" && (
        <CropLifecycleTracker
          onClose={() => setScreen("dashboard")}
        />
      )}
    </>
  );
}

// ============================================================================
// Option 6: Integrated in Sidebar Navigation
// ============================================================================

export function ProducerAIDashboardWithSidebar() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "post-requirement", label: "Post Requirement", icon: "🌾" },
    { id: "crop-lifecycle", label: "Crop Lifecycle", icon: "🌱" },
    { id: "activities", label: "Activities", icon: "📅" },
    // ... more items
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-100 p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeSection === item.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-slate-200"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeSection === "dashboard" && <Dashboard />}
        {activeSection === "post-requirement" && <PostRequirementAdvanced />}
        {activeSection === "crop-lifecycle" && <CropLifecycleTracker />}
        {/* ... other sections */}
      </main>
    </div>
  );
}

// ============================================================================
// RECOMMENDED: Simple Integration (Best Practice)
// ============================================================================

export function RecommendedIntegration() {
  const [showLifecycle, setShowLifecycle] = useState(false);

  return (
    <>
      {/* Trigger Button (Place anywhere) */}
      <DSButton
        variant="primary"
        size="lg"
        onClick={() => setShowLifecycle(true)}
      >
        <Sprout className="w-5 h-5 mr-2" />
        Track Crop from Selection to Harvest
      </DSButton>

      {/* Modal with Crop Lifecycle Tracker */}
      <Dialog open={showLifecycle} onOpenChange={setShowLifecycle}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <CropLifecycleTracker onClose={() => setShowLifecycle(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

// ============================================================================
// Usage in Your App.tsx
// ============================================================================

export default function App() {
  return (
    <div>
      {/* Place the button wherever you want */}
      <RecommendedIntegration />
    </div>
  );
}

// ============================================================================
// Key Points:
// ============================================================================
// 1. Import CropLifecycleTracker component
// 2. Add a button/action to open it
// 3. Use Dialog for modal view OR render directly for full-screen
// 4. Pass onClose prop to handle closing
// 5. That's it! Component is fully self-contained

// ============================================================================
// File Locations:
// ============================================================================
// Component: /components/producer-dashboard/CropLifecycleTracker.tsx
// Documentation: /CROP_LIFECYCLE_TRACKER_COMPLETE.md
// This Example: /CROP_LIFECYCLE_INTEGRATION_EXAMPLE.tsx
