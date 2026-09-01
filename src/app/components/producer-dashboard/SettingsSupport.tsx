import { useState } from "react";
import { motion } from "motion/react";
import {
  Settings,
  Globe,
  Bell,
  Moon,
  Sun,
  Smartphone,
  Wifi,
  Database,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Shield,
  Info,
  ChevronRight,
  Download,
  Trash2,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Play,
  Book,
  ExternalLink,
} from "lucide-react";
import { DSButton, DSCard, DSBadge, designTokens } from "../../design-system";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { toast } from "sonner@2.0.3";

const { colors, typography, spacing } = designTokens;

export function SettingsSupport() {
  const [activeTab, setActiveTab] = useState<"settings" | "support" | "compliance" | "about">("settings");
  
  // Settings state
  const [language, setLanguage] = useState("english");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  const indianLanguages = [
    { code: "hindi", name: "हिंदी (Hindi)" },
    { code: "punjabi", name: "ਪੰਜਾਬੀ (Punjabi)" },
    { code: "tamil", name: "தமிழ் (Tamil)" },
    { code: "telugu", name: "తెలుగు (Telugu)" },
    { code: "bengali", name: "বাংলা (Bengali)" },
    { code: "marathi", name: "मराठी (Marathi)" },
    { code: "gujarati", name: "ગુજરાતી (Gujarati)" },
    { code: "kannada", name: "ಕನ್ನಡ (Kannada)" },
    { code: "malayalam", name: "മലയാളം (Malayalam)" },
    { code: "english", name: "English" },
  ];

  const faqs = [
    {
      question: "How do I log my daily crop activities?",
      answer: "Navigate to the Activity Tracker from the dashboard. Select your crop, click 'Log Activity', choose the activity type, and fill in the details. You can also upload photos, videos, or voice notes as evidence."
    },
    {
      question: "What is NFT tokenization and why should I use it?",
      answer: "NFT tokenization creates a unique digital certificate for your produce on the blockchain. It helps verify authenticity, track the complete journey from farm to market, and can increase buyer trust and prices."
    },
    {
      question: "How does Grok AI help detect fraud?",
      answer: "Grok AI monitors all activities for unusual patterns, validates timing of operations (like pesticide pre-harvest intervals), checks for duplicate entries, and alerts you to potential issues in real-time."
    },
    {
      question: "How do I add intercropping details?",
      answer: "When posting a requirement or managing crops, enable the 'Intercropping' toggle. Then add each intercrop with its commodity, variety, and proportion of the plot area."
    },
    {
      question: "What certifications can I add to my profile?",
      answer: "You can add organic farming certificates, Good Agricultural Practices (GAP), export quality certifications, GI tags, and any other relevant agricultural certifications."
    },
  ];

  const tutorials = [
    { id: 1, title: "Getting Started with TRADIE", duration: "5:30", category: "Basics" },
    { id: 2, title: "Logging Daily Activities", duration: "8:45", category: "Activities" },
    { id: 3, title: "Understanding AI Insights", duration: "6:20", category: "AI Features" },
    { id: 4, title: "NFT Tokenization Guide", duration: "10:15", category: "Blockchain" },
    { id: 5, title: "Managing Inventory", duration: "7:00", category: "Storage" },
  ];

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast.success(`Language changed to ${indianLanguages.find(l => l.code === value)?.name}`);
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  const handleClearCache = () => {
    toast.success("Cache cleared successfully");
  };

  const handleExportData = () => {
    toast.success("Data export initiated. You'll receive an email shortly.");
  };

  const handleDeleteAccount = () => {
    toast.error("Please contact support to delete your account");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2
          style={{
            fontFamily: typography.fonts.heading,
            fontSize: typography.sizes["2xl"],
            fontWeight: typography.weights.bold,
            color: colors.blue.primary,
          }}
        >
          ⚙️ Settings & Support
        </h2>
        <p
          style={{
            fontSize: typography.sizes.sm,
            color: colors.text.secondary,
            marginTop: spacing.xs,
          }}
        >
          Configure app preferences and get help when you need it
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
          <TabsTrigger value="support">❓ Support</TabsTrigger>
          <TabsTrigger value="compliance">📋 Compliance</TabsTrigger>
          <TabsTrigger value="about">ℹ️ About</TabsTrigger>
        </TabsList>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          {/* Language Settings */}
          <DSCard variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <Globe size={24} style={{ color: colors.blue.primary }} />
              <h3
                style={{
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.primary,
                }}
              >
                Language & Region
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  style={{
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.medium,
                    color: colors.text.primary,
                    display: "block",
                    marginBottom: spacing.xs,
                  }}
                >
                  App Language
                </label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {indianLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p
                  style={{
                    fontSize: typography.sizes.xs,
                    color: colors.text.secondary,
                    marginTop: spacing.xs,
                  }}
                >
                  34 Indian languages + 60 global languages supported
                </p>
              </div>
            </div>
          </DSCard>

          {/* Notification Settings */}
          <DSCard variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <Bell size={24} style={{ color: colors.status.warning }} />
              <h3
                style={{
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.primary,
                }}
              >
                Notifications
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                <div>
                  <p
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      color: colors.text.primary,
                    }}
                  >
                    Push Notifications
                  </p>
                  <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                    Receive alerts about crop health, activities, and updates
                  </p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                <div>
                  <p
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      color: colors.text.primary,
                    }}
                  >
                    SMS Alerts
                  </p>
                  <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                    Critical alerts sent via SMS
                  </p>
                </div>
                <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                <div>
                  <p
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      color: colors.text.primary,
                    }}
                  >
                    Email Updates
                  </p>
                  <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                    Weekly summaries and newsletters
                  </p>
                </div>
                <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
              </div>
            </div>
          </DSCard>

          {/* App Settings */}
          <DSCard variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone size={24} style={{ color: colors.status.info }} />
              <h3
                style={{
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.primary,
                }}
              >
                App Preferences
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                <div>
                  <p
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      color: colors.text.primary,
                    }}
                  >
                    Theme
                  </p>
                  <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                    {theme === "light" ? "Light mode" : "Dark mode"}
                  </p>
                </div>
                <DSButton
                  variant="outline"
                  size="sm"
                  leftIcon={theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
                  onClick={handleThemeToggle}
                >
                  Toggle
                </DSButton>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                <div>
                  <p
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      color: colors.text.primary,
                    }}
                  >
                    Offline Mode
                  </p>
                  <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                    Work without internet, sync later
                  </p>
                </div>
                <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                <div>
                  <p
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      color: colors.text.primary,
                    }}
                  >
                    Auto Sync
                  </p>
                  <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                    Automatically sync data when online
                  </p>
                </div>
                <Switch checked={autoSync} onCheckedChange={setAutoSync} />
              </div>
            </div>
          </DSCard>

          {/* Data Management */}
          <DSCard variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <Database size={24} style={{ color: colors.status.success }} />
              <h3
                style={{
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.primary,
                }}
              >
                Data Management
              </h3>
            </div>

            <div className="space-y-3">
              <DSButton
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<Download size={16} />}
                onClick={handleExportData}
              >
                Export My Data
              </DSButton>
              <DSButton
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<Trash2 size={16} />}
                onClick={handleClearCache}
              >
                Clear Cache
              </DSButton>
              <DSButton
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<Trash2 size={16} />}
                onClick={handleDeleteAccount}
                style={{ color: colors.status.error, borderColor: colors.status.error }}
              >
                Delete Account
              </DSButton>
            </div>
          </DSCard>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-4">
          {/* Help Center */}
          <DSCard variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle size={24} style={{ color: colors.blue.primary }} />
              <h3
                style={{
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.primary,
                }}
              >
                Help Center
              </h3>
            </div>

            <div className="space-y-3">
              <DSButton
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<Book size={16} />}
                rightIcon={<ChevronRight size={16} />}
              >
                User Guide
              </DSButton>
              <DSButton
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<Play size={16} />}
                rightIcon={<ChevronRight size={16} />}
              >
                Video Tutorials
              </DSButton>
            </div>
          </DSCard>

          {/* FAQs */}
          <DSCard variant="elevated" padding="lg">
            <h3
              style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
                marginBottom: spacing.md,
              }}
            >
              Frequently Asked Questions
            </h3>

            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      color: colors.text.primary,
                    }}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    style={{
                      fontSize: typography.sizes.sm,
                      color: colors.text.secondary,
                    }}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </DSCard>

          {/* Video Tutorials */}
          <DSCard variant="elevated" padding="lg">
            <h3
              style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
                marginBottom: spacing.md,
              }}
            >
              Video Tutorials
            </h3>

            <div className="space-y-3">
              {tutorials.map((tutorial) => (
                <div
                  key={tutorial.id}
                  className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-white/50 transition-colors"
                  style={{ borderColor: colors.border.default }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.status.info}20`, color: colors.status.info }}
                  >
                    <Play size={20} />
                  </div>
                  <div className="flex-1">
                    <p
                      style={{
                        fontSize: typography.sizes.sm,
                        fontWeight: typography.weights.medium,
                        color: colors.text.primary,
                      }}
                    >
                      {tutorial.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <DSBadge variant="blue" size="sm">
                        {tutorial.category}
                      </DSBadge>
                      <span style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                        {tutorial.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DSCard>

          {/* Contact Support */}
          <DSCard variant="elevated" padding="lg">
            <h3
              style={{
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.semibold,
                color: colors.blue.primary,
                marginBottom: spacing.md,
              }}
            >
              Contact Support
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                <Phone size={20} style={{ color: colors.status.info }} />
                <div>
                  <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Phone</p>
                  <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary }}>
                    1800-123-4567 (Toll Free)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                <Mail size={20} style={{ color: colors.status.info }} />
                <div>
                  <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Email</p>
                  <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary }}>
                    support@tradie.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.surface.secondary }}>
                <MessageSquare size={20} style={{ color: colors.status.info }} />
                <div>
                  <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>Live Chat</p>
                  <p style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary }}>
                    Available 24/7
                  </p>
                </div>
              </div>

              <DSButton variant="primary" size="md" fullWidth leftIcon={<MessageSquare size={16} />}>
                Start Live Chat
              </DSButton>
            </div>
          </DSCard>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-4">
          <DSCard variant="elevated" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={24} style={{ color: colors.status.success }} />
              <h3
                style={{
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.semibold,
                  color: colors.text.primary,
                }}
              >
                Legal & Compliance
              </h3>
            </div>

            <div className="space-y-3">
              <button
                className="flex items-center justify-between w-full p-3 rounded-lg border hover:bg-white/50 transition-colors"
                style={{ borderColor: colors.border.default }}
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} style={{ color: colors.text.muted }} />
                  <span
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      color: colors.text.primary,
                    }}
                  >
                    Terms of Service
                  </span>
                </div>
                <ExternalLink size={16} style={{ color: colors.text.muted }} />
              </button>

              <button
                className="flex items-center justify-between w-full p-3 rounded-lg border hover:bg-white/50 transition-colors"
                style={{ borderColor: colors.border.default }}
              >
                <div className="flex items-center gap-3">
                  <Shield size={20} style={{ color: colors.text.muted }} />
                  <span
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      color: colors.text.primary,
                    }}
                  >
                    Privacy Policy
                  </span>
                </div>
                <ExternalLink size={16} style={{ color: colors.text.muted }} />
              </button>

              <button
                className="flex items-center justify-between w-full p-3 rounded-lg border hover:bg-white/50 transition-colors"
                style={{ borderColor: colors.border.default }}
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} style={{ color: colors.text.muted }} />
                  <span
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      color: colors.text.primary,
                    }}
                  >
                    Data Protection Guidelines
                  </span>
                </div>
                <ExternalLink size={16} style={{ color: colors.text.muted }} />
              </button>

              <button
                className="flex items-center justify-between w-full p-3 rounded-lg border hover:bg-white/50 transition-colors"
                style={{ borderColor: colors.border.default }}
              >
                <div className="flex items-center gap-3">
                  <Book size={20} style={{ color: colors.text.muted }} />
                  <span
                    style={{
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.medium,
                      color: colors.text.primary,
                    }}
                  >
                    Regulatory Compliance
                  </span>
                </div>
                <ExternalLink size={16} style={{ color: colors.text.muted }} />
              </button>
            </div>

            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${colors.status.info}10` }}>
              <div className="flex items-start gap-3">
                <Info size={20} style={{ color: colors.status.info, marginTop: 2 }} />
                <div>
                  <p
                    style={{
                      fontSize: typography.sizes.sm,
                      color: colors.text.primary,
                      marginBottom: spacing.xs,
                    }}
                  >
                    TRADIE is not designed for collecting Personally Identifiable Information (PII) or securing sensitive personal data.
                  </p>
                  <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                    We recommend not storing sensitive information like Aadhaar numbers, bank passwords, or other confidential data in the app.
                  </p>
                </div>
              </div>
            </div>
          </DSCard>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-4">
          <DSCard variant="elevated" padding="lg">
            <div className="text-center mb-6">
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${colors.blue.primary}, ${colors.accent.gold})` }}
              >
                <span style={{ fontSize: typography.sizes["3xl"], color: "white" }}>🌾</span>
              </div>
              <h3
                style={{
                  fontSize: typography.sizes.xl,
                  fontWeight: typography.weights.bold,
                  color: colors.blue.primary,
                  marginBottom: spacing.xs,
                }}
              >
                TRADIE Producer App
              </h3>
              <p style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                Version 3.0.0 (Build 300)
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border" style={{ borderColor: colors.border.default }}>
                <h4
                  style={{
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.primary,
                    marginBottom: spacing.sm,
                  }}
                >
                  What's New
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} style={{ color: colors.status.success, marginTop: 2 }} />
                    <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                      Enhanced Grok AI fraud detection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} style={{ color: colors.status.success, marginTop: 2 }} />
                    <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                      Multi-crop intercropping support
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} style={{ color: colors.status.success, marginTop: 2 }} />
                    <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                      Advanced activity logging with 15 types
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} style={{ color: colors.status.success, marginTop: 2 }} />
                    <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>
                      Real-time crop health monitoring
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border" style={{ borderColor: colors.border.default }}>
                <h4
                  style={{
                    fontSize: typography.sizes.sm,
                    fontWeight: typography.weights.semibold,
                    color: colors.text.primary,
                    marginBottom: spacing.sm,
                  }}
                >
                  Platform Support
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} style={{ color: colors.status.success }} />
                    <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>Android</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} style={{ color: colors.status.success }} />
                    <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>iOS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} style={{ color: colors.status.success }} />
                    <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>Web</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} style={{ color: colors.status.success }} />
                    <span style={{ fontSize: typography.sizes.sm, color: colors.text.secondary }}>Desktop</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary }}>
                  © 2025 TRADIE. All rights reserved.
                </p>
                <p style={{ fontSize: typography.sizes.xs, color: colors.text.secondary, marginTop: spacing.xs }}>
                  Made with ❤️ for Indian farmers
                </p>
              </div>
            </div>
          </DSCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
