import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, ChevronLeft, Smartphone, Tablet, Monitor, 
  Moon, Sun, Keyboard, Eye, Menu, Home, User, Settings,
  Building2, Users, LogIn, Plus, Edit, Trash2, CheckCircle,
  Upload, Mail, Phone, MapPin, FileText, Shield, AlertCircle
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Alert, AlertDescription } from "./ui/alert";
import tradieLogo from "figma:asset/f956260347dc5e875bfaa9ef290c3ac5a8e7e3d9.png";

type ViewportSize = "mobile" | "tablet" | "desktop";
type WireframeScreen = "role-selection" | "entity-registration" | "staff-management" | "login";

interface ResponsiveUserManagementWireframeProps {
  onBack?: () => void;
}

export function ResponsiveUserManagementWireframe({ onBack }: ResponsiveUserManagementWireframeProps) {
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");
  const [currentScreen, setCurrentScreen] = useState<WireframeScreen>("role-selection");
  const [highContrast, setHighContrast] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);

  // Viewport dimensions
  const viewportDimensions = {
    mobile: { width: "375px", height: "667px", label: "Mobile (375x667)" },
    tablet: { width: "768px", height: "1024px", label: "Tablet (768x1024)" },
    desktop: { width: "100%", height: "100%", label: "Desktop (Responsive)" }
  };

  const currentDimensions = viewportDimensions[viewportSize];

  // Color schemes
  const colors = {
    normal: {
      primary: "#003E6D",
      accent: "#FFD700",
      background: "linear-gradient(to bottom right, #F7FAFC, #E8F4FC, #D9F2FF)",
      text: "#003E6D",
      border: "#003E6D20"
    },
    highContrast: {
      primary: "#000000",
      accent: "#FFFF00",
      background: "#FFFFFF",
      text: "#000000",
      border: "#000000"
    }
  };

  const activeColors = highContrast ? colors.highContrast : colors.normal;

  // Navigation component (adaptive)
  const Navigation = ({ viewport }: { viewport: ViewportSize }) => {
    if (viewport === "mobile") {
      // Bottom navigation for mobile
      return (
        <div 
          className="absolute bottom-0 left-0 right-0 h-16 border-t-2 flex items-center justify-around"
          style={{ 
            backgroundColor: activeColors.primary,
            borderColor: activeColors.border
          }}
          role="navigation"
          aria-label="Bottom navigation"
        >
          <button className="flex flex-col items-center gap-1 p-2" aria-label="Home">
            <Home className="w-5 h-5 text-white" />
            <span className="text-xs text-white">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2" aria-label="Profile">
            <User className="w-5 h-5 text-white" />
            <span className="text-xs text-white">Profile</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2" aria-label="Settings">
            <Settings className="w-5 h-5 text-white" />
            <span className="text-xs text-white">Settings</span>
          </button>
        </div>
      );
    }

    if (viewport === "tablet") {
      // Side drawer navigation for tablet
      return (
        <div 
          className="absolute left-0 top-0 bottom-0 w-20 border-r-2 flex flex-col items-center py-4 gap-4"
          style={{ 
            backgroundColor: activeColors.primary,
            borderColor: activeColors.border
          }}
          role="navigation"
          aria-label="Side navigation"
        >
          <button className="flex flex-col items-center gap-1 p-3" aria-label="Home">
            <Home className="w-6 h-6 text-white" />
            <span className="text-xs text-white">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-3" aria-label="Profile">
            <User className="w-6 h-6 text-white" />
            <span className="text-xs text-white">Profile</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-3" aria-label="Settings">
            <Settings className="w-6 h-6 text-white" />
            <span className="text-xs text-white">Settings</span>
          </button>
        </div>
      );
    }

    // Top navigation for desktop
    return (
      <div 
        className="absolute top-0 left-0 right-0 h-16 border-b-2 flex items-center justify-between px-6"
        style={{ 
          backgroundColor: "white",
          borderColor: activeColors.border
        }}
        role="navigation"
        aria-label="Top navigation"
      >
        <div className="flex items-center gap-4">
          <img src={tradieLogo} alt="TRADIE Logo" className="w-10 h-10" />
          <span className="font-bold text-lg" style={{ color: activeColors.primary }}>
            TRADIE
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg" aria-label="Home">
            <Home className="w-5 h-5" style={{ color: activeColors.primary }} />
            <span style={{ color: activeColors.primary }}>Home</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg" aria-label="Profile">
            <User className="w-5 h-5" style={{ color: activeColors.primary }} />
            <span style={{ color: activeColors.primary }}>Profile</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg" aria-label="Settings">
            <Settings className="w-5 h-5" style={{ color: activeColors.primary }} />
            <span style={{ color: activeColors.primary }}>Settings</span>
          </button>
        </div>
      </div>
    );
  };

  // Screen content with responsive layouts
  const ScreenContent = () => {
    const contentPadding = {
      mobile: "pt-4 pb-20 px-4",
      tablet: "pl-24 pt-4 pb-4 pr-4",
      desktop: "pt-20 pb-4 px-8"
    };

    const gridColumns = {
      mobile: "grid-cols-1",
      tablet: "grid-cols-2",
      desktop: "grid-cols-3"
    };

    switch (currentScreen) {
      case "role-selection":
        return (
          <div className={contentPadding[viewportSize]} role="main" aria-labelledby="screen-title">
            <h1 
              id="screen-title"
              className={`mb-2 ${viewportSize === 'mobile' ? 'text-2xl' : viewportSize === 'tablet' ? 'text-3xl' : 'text-4xl'}`}
              style={{ 
                color: activeColors.text,
                fontFamily: "Playfair Display, serif",
                fontWeight: 700
              }}
            >
              Select Your Role or Entity Type
            </h1>
            <p 
              className={`mb-6 ${viewportSize === 'mobile' ? 'text-sm' : 'text-base'}`}
              style={{ color: `${activeColors.text}90` }}
            >
              Please choose your role or register your entity to continue
            </p>

            {/* Accessibility Alert */}
            {showAccessibility && (
              <Alert className="mb-4 border-2" style={{ borderColor: activeColors.accent }}>
                <Keyboard className="h-4 w-4" />
                <AlertDescription>
                  <strong>Keyboard Navigation:</strong> Use Tab to navigate, Enter to select, Arrow keys to move between options
                </AlertDescription>
              </Alert>
            )}

            {/* Role Cards Grid */}
            <div className={`grid ${gridColumns[viewportSize]} gap-4`}>
              {/* Producer Card */}
              <Card 
                className={`p-4 border-2 cursor-pointer transition-all hover:shadow-lg ${
                  viewportSize === 'mobile' ? 'min-h-[120px]' : 'min-h-[160px]'
                }`}
                style={{ borderColor: activeColors.border }}
                tabIndex={0}
                role="button"
                aria-label="Producer role - Individual farmer or agricultural producer"
              >
                <div className="flex items-start gap-3">
                  <div 
                    className={`${viewportSize === 'mobile' ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0`}
                  >
                    <User className={`${viewportSize === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'} text-green-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className={`font-semibold mb-1 ${viewportSize === 'mobile' ? 'text-base' : 'text-lg'}`}
                      style={{ color: activeColors.text }}
                    >
                      Producer
                    </h3>
                    <p 
                      className={`${viewportSize === 'mobile' ? 'text-xs' : 'text-sm'}`}
                      style={{ color: `${activeColors.text}70` }}
                    >
                      Individual farmer
                    </p>
                    <Badge className="mt-2 bg-green-500 text-white text-xs">Individual</Badge>
                  </div>
                </div>
              </Card>

              {/* Commission Agent Card */}
              <Card 
                className={`p-4 border-2 cursor-pointer transition-all hover:shadow-lg ${
                  viewportSize === 'mobile' ? 'min-h-[120px]' : 'min-h-[160px]'
                }`}
                style={{ borderColor: activeColors.border }}
                tabIndex={0}
                role="button"
                aria-label="Commission Agent - Register your organization and manage authorized staff"
              >
                <div className="flex items-start gap-3">
                  <div 
                    className={`${viewportSize === 'mobile' ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0`}
                  >
                    <Users className={`${viewportSize === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'} text-blue-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className={`font-semibold mb-1 ${viewportSize === 'mobile' ? 'text-base' : 'text-lg'}`}
                      style={{ color: activeColors.text }}
                    >
                      Commission Agent
                    </h3>
                    <p 
                      className={`${viewportSize === 'mobile' ? 'text-xs' : 'text-sm'}`}
                      style={{ color: `${activeColors.text}70` }}
                    >
                      Represent producers
                    </p>
                    <Badge className="mt-2 bg-blue-500 text-white text-xs">Entity</Badge>
                  </div>
                </div>
                {viewportSize !== 'mobile' && (
                  <p 
                    className="text-xs italic mt-2 flex items-start gap-1"
                    style={{ color: `${activeColors.text}60` }}
                  >
                    <Building2 className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    Register your organization and manage authorized staff
                  </p>
                )}
              </Card>

              {/* Trader Card */}
              <Card 
                className={`p-4 border-2 cursor-pointer transition-all hover:shadow-lg ${
                  viewportSize === 'mobile' ? 'min-h-[120px]' : 'min-h-[160px]'
                }`}
                style={{ borderColor: activeColors.border }}
                tabIndex={0}
                role="button"
                aria-label="Trader - Buy and sell commodities"
              >
                <div className="flex items-start gap-3">
                  <div 
                    className={`${viewportSize === 'mobile' ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0`}
                  >
                    <Building2 className={`${viewportSize === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'} text-purple-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className={`font-semibold mb-1 ${viewportSize === 'mobile' ? 'text-base' : 'text-lg'}`}
                      style={{ color: activeColors.text }}
                    >
                      Trader
                    </h3>
                    <p 
                      className={`${viewportSize === 'mobile' ? 'text-xs' : 'text-sm'}`}
                      style={{ color: `${activeColors.text}70` }}
                    >
                      Buy and sell commodities
                    </p>
                    <Badge className="mt-2 bg-purple-500 text-white text-xs">Entity</Badge>
                  </div>
                </div>
                {viewportSize !== 'mobile' && (
                  <p 
                    className="text-xs italic mt-2 flex items-start gap-1"
                    style={{ color: `${activeColors.text}60` }}
                  >
                    <Building2 className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    Register your organization and manage authorized staff
                  </p>
                )}
              </Card>
            </div>

            {/* Next Button - Touch-friendly on mobile */}
            <div className="mt-6 flex justify-end">
              <Button
                className={`${
                  viewportSize === 'mobile' 
                    ? 'w-full h-14 text-lg' 
                    : viewportSize === 'tablet'
                    ? 'px-8 h-12'
                    : 'px-12 h-12'
                }`}
                style={{ 
                  background: `linear-gradient(to right, ${activeColors.primary}, ${activeColors.accent}30)`,
                  color: "white"
                }}
                aria-label="Continue to next step"
              >
                Next
                <ChevronRight className="ml-2" />
              </Button>
            </div>
          </div>
        );

      case "entity-registration":
        return (
          <div className={contentPadding[viewportSize]} role="main" aria-labelledby="screen-title">
            <h1 
              id="screen-title"
              className={`mb-2 ${viewportSize === 'mobile' ? 'text-2xl' : viewportSize === 'tablet' ? 'text-3xl' : 'text-4xl'}`}
              style={{ 
                color: activeColors.text,
                fontFamily: "Playfair Display, serif",
                fontWeight: 700
              }}
            >
              Register Your Organization
            </h1>
            <p 
              className={`mb-6 ${viewportSize === 'mobile' ? 'text-sm' : 'text-base'}`}
              style={{ color: `${activeColors.text}90` }}
            >
              Complete the form below to register your entity
            </p>

            {/* Form */}
            <div className={`space-y-${viewportSize === 'mobile' ? '4' : '6'} max-w-3xl`}>
              {/* Organization Name */}
              <div>
                <label 
                  className={`block mb-2 font-semibold ${viewportSize === 'mobile' ? 'text-sm' : 'text-base'}`}
                  style={{ color: activeColors.text }}
                  htmlFor="org-name"
                >
                  <Building2 className="inline w-4 h-4 mr-2" />
                  Organization Name *
                </label>
                <input
                  id="org-name"
                  type="text"
                  placeholder="Enter your organization's legal name"
                  className={`w-full border-2 rounded-lg px-4 ${
                    viewportSize === 'mobile' ? 'h-12 text-base' : 'h-14 text-lg'
                  }`}
                  style={{ borderColor: activeColors.border }}
                  aria-required="true"
                  aria-label="Organization name input"
                />
              </div>

              {/* Registration Number */}
              <div>
                <label 
                  className={`block mb-2 font-semibold ${viewportSize === 'mobile' ? 'text-sm' : 'text-base'}`}
                  style={{ color: activeColors.text }}
                  htmlFor="reg-number"
                >
                  <FileText className="inline w-4 h-4 mr-2" />
                  Registration Number *
                </label>
                <input
                  id="reg-number"
                  type="text"
                  placeholder="e.g., PAN, GST, Company Registration Number"
                  className={`w-full border-2 rounded-lg px-4 ${
                    viewportSize === 'mobile' ? 'h-12 text-base' : 'h-14 text-lg'
                  }`}
                  style={{ borderColor: activeColors.border }}
                  aria-required="true"
                  aria-label="Registration number input"
                />
              </div>

              {/* Contact Details - Responsive Grid */}
              <div className={`grid ${viewportSize === 'mobile' ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                <div>
                  <label 
                    className={`block mb-2 font-semibold ${viewportSize === 'mobile' ? 'text-sm' : 'text-base'}`}
                    style={{ color: activeColors.text }}
                    htmlFor="phone"
                  >
                    <Phone className="inline w-4 h-4 mr-2" />
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className={`w-full border-2 rounded-lg px-4 ${
                      viewportSize === 'mobile' ? 'h-12 text-base' : 'h-14 text-lg'
                    }`}
                    style={{ borderColor: activeColors.border }}
                    aria-required="true"
                    aria-label="Phone number input"
                  />
                </div>

                <div>
                  <label 
                    className={`block mb-2 font-semibold ${viewportSize === 'mobile' ? 'text-sm' : 'text-base'}`}
                    style={{ color: activeColors.text }}
                    htmlFor="email"
                  >
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="contact@organization.com"
                    className={`w-full border-2 rounded-lg px-4 ${
                      viewportSize === 'mobile' ? 'h-12 text-base' : 'h-14 text-lg'
                    }`}
                    style={{ borderColor: activeColors.border }}
                    aria-required="true"
                    aria-label="Email address input"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label 
                  className={`block mb-2 font-semibold ${viewportSize === 'mobile' ? 'text-sm' : 'text-base'}`}
                  style={{ color: activeColors.text }}
                  htmlFor="address"
                >
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Registered Address *
                </label>
                <textarea
                  id="address"
                  placeholder="Enter complete registered address including city, state, and pincode"
                  rows={4}
                  className={`w-full border-2 rounded-lg px-4 py-3 ${
                    viewportSize === 'mobile' ? 'text-base' : 'text-lg'
                  }`}
                  style={{ borderColor: activeColors.border }}
                  aria-required="true"
                  aria-label="Address textarea"
                />
              </div>

              {/* Document Upload - Touch-friendly */}
              <div>
                <label 
                  className={`block mb-2 font-semibold ${viewportSize === 'mobile' ? 'text-sm' : 'text-base'}`}
                  style={{ color: activeColors.text }}
                >
                  <Upload className="inline w-4 h-4 mr-2" />
                  Upload Registration Proof *
                </label>
                <Button
                  variant="outline"
                  className={`w-full border-2 border-dashed ${
                    viewportSize === 'mobile' ? 'h-16 text-base' : 'h-20 text-lg'
                  }`}
                  style={{ borderColor: activeColors.accent }}
                  aria-label="Click to upload documents"
                >
                  <Upload className="mr-2" />
                  Click to Upload Documents
                </Button>
              </div>

              {/* Action Buttons - Stacked on mobile */}
              <div className={`flex ${viewportSize === 'mobile' ? 'flex-col' : 'flex-row'} gap-4 pt-4`}>
                <Button
                  variant="outline"
                  className={`${viewportSize === 'mobile' ? 'w-full h-14 order-2' : 'flex-1 h-12'}`}
                  aria-label="Go back to previous screen"
                >
                  <ChevronLeft className="mr-2" />
                  Back
                </Button>
                <Button
                  className={`${viewportSize === 'mobile' ? 'w-full h-14 order-1' : 'flex-1 h-12'}`}
                  style={{ 
                    background: `linear-gradient(to right, ${activeColors.primary}, ${activeColors.accent}30)`,
                    color: "white"
                  }}
                  aria-label="Submit and continue"
                >
                  Submit & Continue
                  <ChevronRight className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        );

      case "staff-management":
        return (
          <div className={contentPadding[viewportSize]} role="main" aria-labelledby="screen-title">
            <h1 
              id="screen-title"
              className={`mb-2 ${viewportSize === 'mobile' ? 'text-2xl' : viewportSize === 'tablet' ? 'text-3xl' : 'text-4xl'}`}
              style={{ 
                color: activeColors.text,
                fontFamily: "Playfair Display, serif",
                fontWeight: 700
              }}
            >
              Manage Staff and Assign Roles
            </h1>
            <p 
              className={`mb-6 ${viewportSize === 'mobile' ? 'text-sm' : 'text-base'}`}
              style={{ color: `${activeColors.text}90` }}
            >
              Add staff members and assign appropriate roles
            </p>

            {/* Add Staff Button - Touch-friendly */}
            <div className="mb-6 flex justify-end">
              <Button
                className={`${
                  viewportSize === 'mobile' 
                    ? 'w-full h-14 text-base' 
                    : 'px-6 h-12'
                }`}
                style={{ 
                  background: `linear-gradient(to right, ${activeColors.accent}, ${activeColors.accent}CC)`,
                  color: activeColors.text
                }}
                aria-label="Add new staff member"
              >
                <Plus className="mr-2" />
                Add Staff Member
              </Button>
            </div>

            {/* Staff List */}
            <div className="space-y-4">
              {/* Staff Member 1 */}
              <Card 
                className={`p-4 border-2`}
                style={{ borderColor: activeColors.border }}
              >
                <div className={`flex ${viewportSize === 'mobile' ? 'flex-col' : 'flex-row'} gap-4`}>
                  {/* Avatar */}
                  <div 
                    className={`${viewportSize === 'mobile' ? 'w-12 h-12' : 'w-14 h-14'} rounded-full flex items-center justify-center flex-shrink-0`}
                    style={{ background: `linear-gradient(to bottom right, ${activeColors.primary}, ${activeColors.accent}30)` }}
                  >
                    <span className="text-white font-bold text-lg">PS</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <h3 
                          className={`font-semibold ${viewportSize === 'mobile' ? 'text-base' : 'text-lg'}`}
                          style={{ color: activeColors.text }}
                        >
                          Priya Sharma
                        </h3>
                        <p 
                          className={`${viewportSize === 'mobile' ? 'text-xs' : 'text-sm'} truncate`}
                          style={{ color: `${activeColors.text}70` }}
                        >
                          admin@agritraders.com
                        </p>
                      </div>
                      <Badge className="bg-green-500 text-white text-xs">Active</Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" style={{ borderColor: activeColors.accent, color: activeColors.accent }}>
                        Admin
                      </Badge>
                      <Badge variant="outline">Manager</Badge>
                      <Badge variant="outline">Trading</Badge>
                    </div>

                    {/* Actions - Touch-friendly spacing on mobile */}
                    <div className={`flex gap-${viewportSize === 'mobile' ? '3' : '2'}`}>
                      <Button
                        variant="ghost"
                        size={viewportSize === 'mobile' ? 'default' : 'sm'}
                        className="text-blue-600 hover:bg-blue-50"
                        aria-label="Edit staff member"
                      >
                        <Edit className="w-4 h-4" />
                        {viewportSize !== 'mobile' && <span className="ml-2">Edit</span>}
                      </Button>
                      <Button
                        variant="ghost"
                        size={viewportSize === 'mobile' ? 'default' : 'sm'}
                        className="text-red-600 hover:bg-red-50"
                        aria-label="Delete staff member"
                      >
                        <Trash2 className="w-4 h-4" />
                        {viewportSize !== 'mobile' && <span className="ml-2">Delete</span>}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Staff Member 2 */}
              <Card 
                className={`p-4 border-2`}
                style={{ borderColor: activeColors.border }}
              >
                <div className={`flex ${viewportSize === 'mobile' ? 'flex-col' : 'flex-row'} gap-4`}>
                  <div 
                    className={`${viewportSize === 'mobile' ? 'w-12 h-12' : 'w-14 h-14'} rounded-full flex items-center justify-center flex-shrink-0`}
                    style={{ background: `linear-gradient(to bottom right, ${activeColors.primary}, ${activeColors.accent}30)` }}
                  >
                    <span className="text-white font-bold text-lg">AP</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <h3 
                          className={`font-semibold ${viewportSize === 'mobile' ? 'text-base' : 'text-lg'}`}
                          style={{ color: activeColors.text }}
                        >
                          Amit Patel
                        </h3>
                        <p 
                          className={`${viewportSize === 'mobile' ? 'text-xs' : 'text-sm'} truncate`}
                          style={{ color: `${activeColors.text}70` }}
                        >
                          manager@agritraders.com
                        </p>
                      </div>
                      <Badge className="bg-amber-500 text-white text-xs">Pending</Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline">Manager</Badge>
                      <Badge variant="outline">Operations</Badge>
                    </div>

                    <div className={`flex gap-${viewportSize === 'mobile' ? '3' : '2'}`}>
                      <Button
                        variant="ghost"
                        size={viewportSize === 'mobile' ? 'default' : 'sm'}
                        className="text-blue-600 hover:bg-blue-50"
                        aria-label="Edit staff member"
                      >
                        <Edit className="w-4 h-4" />
                        {viewportSize !== 'mobile' && <span className="ml-2">Edit</span>}
                      </Button>
                      <Button
                        variant="ghost"
                        size={viewportSize === 'mobile' ? 'default' : 'sm'}
                        className="text-red-600 hover:bg-red-50"
                        aria-label="Delete staff member"
                      >
                        <Trash2 className="w-4 h-4" />
                        {viewportSize !== 'mobile' && <span className="ml-2">Delete</span>}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Complete Button */}
            <div className="mt-6">
              <Button
                className={`${
                  viewportSize === 'mobile' 
                    ? 'w-full h-14 text-lg' 
                    : 'w-full h-12'
                }`}
                style={{ 
                  background: `linear-gradient(to right, ${activeColors.primary}, ${activeColors.accent}30)`,
                  color: "white"
                }}
                aria-label="Complete setup"
              >
                <CheckCircle className="mr-2" />
                Complete Setup
              </Button>
            </div>
          </div>
        );

      case "login":
        return (
          <div className={`${contentPadding[viewportSize]} flex items-center justify-center min-h-full`} role="main" aria-labelledby="screen-title">
            <div className={`w-full ${viewportSize === 'desktop' ? 'max-w-md' : ''}`}>
              <div className="text-center mb-8">
                <img 
                  src={tradieLogo} 
                  alt="TRADIE Logo" 
                  className={`mx-auto mb-4 ${
                    viewportSize === 'mobile' ? 'w-16 h-16' : 'w-20 h-20'
                  }`}
                />
                <h1 
                  id="screen-title"
                  className={`mb-2 ${viewportSize === 'mobile' ? 'text-2xl' : 'text-3xl'}`}
                  style={{ 
                    color: activeColors.text,
                    fontFamily: "Playfair Display, serif",
                    fontWeight: 700
                  }}
                >
                  Welcome Back
                </h1>
                <p 
                  className={`${viewportSize === 'mobile' ? 'text-sm' : 'text-base'}`}
                  style={{ color: `${activeColors.text}90` }}
                >
                  Sign in to access your account
                </p>
              </div>

              <div className="space-y-6">
                {/* Email/Phone */}
                <div>
                  <label 
                    className={`block mb-2 font-semibold ${viewportSize === 'mobile' ? 'text-sm' : 'text-base'}`}
                    style={{ color: activeColors.text }}
                    htmlFor="login-email"
                  >
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email or Phone
                  </label>
                  <input
                    id="login-email"
                    type="text"
                    placeholder="your@email.com or +91 XXXXX XXXXX"
                    className={`w-full border-2 rounded-lg px-4 ${
                      viewportSize === 'mobile' ? 'h-12 text-base' : 'h-14 text-lg'
                    }`}
                    style={{ borderColor: activeColors.border }}
                    aria-label="Email or phone input"
                  />
                </div>

                {/* Password */}
                <div>
                  <label 
                    className={`block mb-2 font-semibold ${viewportSize === 'mobile' ? 'text-sm' : 'text-base'}`}
                    style={{ color: activeColors.text }}
                    htmlFor="login-password"
                  >
                    <Shield className="inline w-4 h-4 mr-2" />
                    Password
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    className={`w-full border-2 rounded-lg px-4 ${
                      viewportSize === 'mobile' ? 'h-12 text-base' : 'h-14 text-lg'
                    }`}
                    style={{ borderColor: activeColors.border }}
                    aria-label="Password input"
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm" style={{ color: activeColors.text }}>
                      Remember me
                    </span>
                  </label>
                  <button 
                    className="text-sm underline"
                    style={{ color: activeColors.primary }}
                    aria-label="Forgot password link"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login Button - Touch-friendly */}
                <Button
                  className={`w-full ${
                    viewportSize === 'mobile' ? 'h-14 text-lg' : 'h-12 text-base'
                  }`}
                  style={{ 
                    background: `linear-gradient(to right, ${activeColors.primary}, ${activeColors.accent}30)`,
                    color: "white"
                  }}
                  aria-label="Login to your account"
                >
                  <LogIn className="mr-2" />
                  Login
                </Button>

                {/* Register Link */}
                <div className="text-center pt-4 border-t-2" style={{ borderColor: activeColors.border }}>
                  <p className="text-sm" style={{ color: `${activeColors.text}70` }}>
                    Don't have an account?{" "}
                    <button 
                      className="font-semibold underline"
                      style={{ color: activeColors.primary }}
                      aria-label="Register for new account"
                    >
                      Register Now
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* Control Panel */}
      <Card className="max-w-7xl mx-auto mb-6 p-6 bg-white shadow-xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Responsive User Management Wireframes
              </h1>
              <p className="text-sm text-gray-600">
                Cross-platform design system with adaptive layouts and accessibility features
              </p>
            </div>
            {onBack && (
              <Button onClick={onBack} variant="outline">
                <ChevronLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
            )}
          </div>

          {/* Screen Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Screen
            </label>
            <Tabs value={currentScreen} onValueChange={(value) => setCurrentScreen(value as WireframeScreen)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="role-selection">Role Selection</TabsTrigger>
                <TabsTrigger value="entity-registration">Entity Registration</TabsTrigger>
                <TabsTrigger value="staff-management">Staff Management</TabsTrigger>
                <TabsTrigger value="login">Login</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Viewport Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Viewport Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Viewport Size
              </label>
              <div className="flex gap-2">
                <Button
                  variant={viewportSize === "mobile" ? "default" : "outline"}
                  onClick={() => setViewportSize("mobile")}
                  className="flex-1"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile
                </Button>
                <Button
                  variant={viewportSize === "tablet" ? "default" : "outline"}
                  onClick={() => setViewportSize("tablet")}
                  className="flex-1"
                >
                  <Tablet className="w-4 h-4 mr-2" />
                  Tablet
                </Button>
                <Button
                  variant={viewportSize === "desktop" ? "default" : "outline"}
                  onClick={() => setViewportSize("desktop")}
                  className="flex-1"
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  Desktop
                </Button>
              </div>
            </div>

            {/* Accessibility Features */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Accessibility Features
              </label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span className="text-sm font-medium">
                      {highContrast ? "High Contrast Mode" : "Normal Mode"}
                    </span>
                  </div>
                  <Switch
                    checked={highContrast}
                    onCheckedChange={setHighContrast}
                    aria-label="Toggle high contrast mode"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Keyboard className="w-4 h-4" />
                    <span className="text-sm font-medium">Keyboard Navigation Tips</span>
                  </div>
                  <Switch
                    checked={showAccessibility}
                    onCheckedChange={setShowAccessibility}
                    aria-label="Toggle accessibility tips"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Design Specifications */}
          <Alert className="bg-blue-50 border-2 border-blue-200">
            <Eye className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              <strong>Design Features:</strong> {currentDimensions.label} • 
              {viewportSize === "mobile" && " Bottom Navigation • Touch-optimized (44px min) • "} 
              {viewportSize === "tablet" && " Side Navigation • Hybrid input • "}
              {viewportSize === "desktop" && " Top Navigation • Mouse-optimized • "}
              Scalable Typography • ARIA Labels • Keyboard Accessible
            </AlertDescription>
          </Alert>
        </div>
      </Card>

      {/* Wireframe Display */}
      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewportSize}-${currentScreen}-${highContrast}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-xl shadow-2xl overflow-hidden"
            style={{
              width: viewportSize === "desktop" ? "100%" : currentDimensions.width,
              maxWidth: viewportSize === "desktop" ? "1200px" : currentDimensions.width,
              height: viewportSize === "desktop" ? "800px" : currentDimensions.height,
              background: highContrast ? "#FFFFFF" : activeColors.background
            }}
          >
            {/* Navigation */}
            <Navigation viewport={viewportSize} />

            {/* Screen Content */}
            <div className="relative w-full h-full overflow-y-auto">
              <ScreenContent />
            </div>

            {/* Screen Reader Announcement */}
            <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              Viewing {currentScreen.replace("-", " ")} screen on {viewportSize} viewport
              {highContrast && " with high contrast mode enabled"}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Notes */}
      <Card className="max-w-7xl mx-auto mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <strong>Responsive Design Implemented:</strong> Adaptive navigation (bottom/side/top), 
            touch-friendly targets (min 44px), scalable typography (rem-based), consistent branding, 
            high contrast mode, keyboard navigation (Tab/Enter/Arrow keys), and ARIA labels for screen readers.
          </div>
        </div>
      </Card>
    </div>
  );
}
