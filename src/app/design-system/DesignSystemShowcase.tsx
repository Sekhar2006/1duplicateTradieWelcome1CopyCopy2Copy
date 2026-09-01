// Design System Visual Showcase
// Use this component to view all design tokens and components
import { useState } from 'react';
import { designTokens } from './tokens';
import { DSButton } from './components/DSButton';
import { DSInput } from './components/DSInput';
import { DSCard, DSCardHeader, DSCardTitle, DSCardDescription, DSCardContent, DSCardFooter } from './components/DSCard';
import { DSAlert } from './components/DSAlert';
import { DSBadge } from './components/DSBadge';
import { Mail, Lock, Search, ArrowRight, Heart, Star } from 'lucide-react';

const { colors, typography, spacing, radius, shadows } = designTokens;

export default function DesignSystemShowcase() {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'components'>('colors');

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: `linear-gradient(to bottom right, ${colors.gradient.start}, ${colors.gradient.middle}, ${colors.gradient.end})`,
    padding: spacing[8],
    fontFamily: typography.fonts.body,
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: spacing[12],
  };

  const titleStyle: React.CSSProperties = {
    ...typography.styles.h1,
    color: colors.blue.primary,
    marginBottom: spacing[4],
  };

  const descriptionStyle: React.CSSProperties = {
    ...typography.styles.body,
    color: colors.text.secondary,
    maxWidth: '600px',
    margin: '0 auto',
  };

  const tabsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: spacing[4],
    marginBottom: spacing[8],
  };

  const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: `${spacing[3]} ${spacing[6]}`,
    backgroundColor: isActive ? colors.accent.gold : 'transparent',
    color: isActive ? '#FFFFFF' : colors.blue.primary,
    border: `2px solid ${isActive ? colors.accent.gold : colors.border.default}`,
    borderRadius: radius.xl,
    fontFamily: typography.fonts.label,
    fontWeight: typography.weights.semibold,
    cursor: 'pointer',
    transition: 'all 200ms ease',
  });

  const sectionStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>🎨 TRADIE Design System</h1>
        <p style={descriptionStyle}>
          A comprehensive design system for the TRADIE commodity trading platform,
          ensuring visual and functional consistency across all platforms.
        </p>
      </div>

      {/* Tabs */}
      <div style={tabsStyle}>
        <button
          style={tabButtonStyle(activeTab === 'colors')}
          onClick={() => setActiveTab('colors')}
        >
          Colors
        </button>
        <button
          style={tabButtonStyle(activeTab === 'typography')}
          onClick={() => setActiveTab('typography')}
        >
          Typography
        </button>
        <button
          style={tabButtonStyle(activeTab === 'components')}
          onClick={() => setActiveTab('components')}
        >
          Components
        </button>
      </div>

      {/* Content */}
      <div style={sectionStyle}>
        {activeTab === 'colors' && <ColorsSection />}
        {activeTab === 'typography' && <TypographySection />}
        {activeTab === 'components' && <ComponentsSection />}
      </div>
    </div>
  );
}

// Colors Section
function ColorsSection() {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: spacing[6],
  };

  const ColorPalette = ({ title, colors: colorSet }: { title: string; colors: Record<string, string> }) => (
    <DSCard variant="elevated" padding="lg">
      <h3 style={{ ...typography.styles.h3, marginBottom: spacing[4] }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
        {Object.entries(colorSet).map(([name, value]) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: value,
                borderRadius: radius.lg,
                border: `1px solid ${colors.border.light}`,
                boxShadow: shadows.md,
              }}
            />
            <div>
              <div style={{ ...typography.styles.label, color: colors.text.primary }}>{name}</div>
              <div style={{ ...typography.styles.caption, color: colors.text.muted }}>{value}</div>
            </div>
          </div>
        ))}
      </div>
    </DSCard>
  );

  return (
    <div style={gridStyle}>
      <ColorPalette title="Accent Colors" colors={colors.accent} />
      <ColorPalette title="Blue Shades" colors={colors.blue} />
      <ColorPalette title="Status Colors" colors={colors.status} />
      <ColorPalette title="Text Colors" colors={colors.text} />
      <ColorPalette title="Surface Colors" colors={colors.surface} />
    </div>
  );
}

// Typography Section
function TypographySection() {
  const examples = [
    { name: 'H1 - Display Heading', style: 'h1', text: 'Welcome to TRADIE' },
    { name: 'H2 - Section Header', style: 'h2', text: 'Your Trading Dashboard' },
    { name: 'H3 - Subsection Header', style: 'h3', text: 'Market Insights' },
    { name: 'Body Large', style: 'bodyLarge', text: 'The commodity trading platform built for the future.' },
    { name: 'Body', style: 'body', text: 'Access real-time market data, AI-powered insights, and secure transactions.' },
    { name: 'Body Small', style: 'bodySmall', text: 'Available on mobile, web, and desktop platforms.' },
    { name: 'Label', style: 'label', text: 'BUTTON LABEL' },
    { name: 'Caption', style: 'caption', text: 'Last updated: 2 minutes ago' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[6] }}>
      {examples.map((example) => (
        <DSCard key={example.name} variant="elevated" padding="lg">
          <div style={{ marginBottom: spacing[3] }}>
            <DSBadge variant="gold">{example.name}</DSBadge>
          </div>
          <p style={{ ...typography.styles[example.style as keyof typeof typography.styles], margin: 0 }}>
            {example.text}
          </p>
          <div style={{ marginTop: spacing[3], ...typography.styles.caption, color: colors.text.muted }}>
            Font: {typography.styles[example.style as keyof typeof typography.styles].fontFamily} • 
            Size: {typography.styles[example.style as keyof typeof typography.styles].fontSize} • 
            Weight: {typography.styles[example.style as keyof typeof typography.styles].fontWeight}
          </div>
        </DSCard>
      ))}
    </div>
  );
}

// Components Section
function ComponentsSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[8] }}>
      {/* Buttons */}
      <DSCard variant="elevated" padding="xl">
        <h3 style={{ ...typography.styles.h3, marginBottom: spacing[6] }}>Buttons</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: spacing[4] }}>
          <div>
            <p style={{ ...typography.styles.caption, marginBottom: spacing[2], color: colors.text.muted }}>Primary</p>
            <DSButton variant="primary" fullWidth>Primary Button</DSButton>
          </div>
          <div>
            <p style={{ ...typography.styles.caption, marginBottom: spacing[2], color: colors.text.muted }}>Secondary</p>
            <DSButton variant="secondary" fullWidth>Secondary Button</DSButton>
          </div>
          <div>
            <p style={{ ...typography.styles.caption, marginBottom: spacing[2], color: colors.text.muted }}>Ghost</p>
            <DSButton variant="ghost" fullWidth>Ghost Button</DSButton>
          </div>
          <div>
            <p style={{ ...typography.styles.caption, marginBottom: spacing[2], color: colors.text.muted }}>With Icon</p>
            <DSButton variant="primary" fullWidth rightIcon={<ArrowRight size={20} />}>
              Continue
            </DSButton>
          </div>
          <div>
            <p style={{ ...typography.styles.caption, marginBottom: spacing[2], color: colors.text.muted }}>Loading</p>
            <DSButton variant="primary" fullWidth isLoading>Loading...</DSButton>
          </div>
          <div>
            <p style={{ ...typography.styles.caption, marginBottom: spacing[2], color: colors.text.muted }}>Disabled</p>
            <DSButton variant="primary" fullWidth disabled>Disabled</DSButton>
          </div>
        </div>
      </DSCard>

      {/* Inputs */}
      <DSCard variant="elevated" padding="xl">
        <h3 style={{ ...typography.styles.h3, marginBottom: spacing[6] }}>Inputs</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: spacing[6] }}>
          <DSInput
            label="Email Address"
            placeholder="your.email@example.com"
            leftIcon={<Mail size={20} />}
            helperText="We'll never share your email"
          />
          <DSInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            leftIcon={<Lock size={20} />}
            showPasswordToggle
          />
          <DSInput
            label="Search"
            placeholder="Search commodities..."
            leftIcon={<Search size={20} />}
          />
          <DSInput
            label="Error State"
            placeholder="Invalid input"
            errorText="This field is required"
            variant="error"
          />
        </div>
      </DSCard>

      {/* Alerts */}
      <DSCard variant="elevated" padding="xl">
        <h3 style={{ ...typography.styles.h3, marginBottom: spacing[6] }}>Alerts</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
          <DSAlert
            variant="success"
            title="Success"
            description="Your KYC verification has been completed successfully."
            dismissible
          />
          <DSAlert
            variant="warning"
            title="Warning"
            description="Your session will expire in 5 minutes."
            dismissible
          />
          <DSAlert
            variant="error"
            title="Error"
            description="Failed to process payment. Please try again."
            dismissible
          />
          <DSAlert
            variant="info"
            title="Information"
            description="New market insights are available for wheat futures."
            dismissible
          />
        </div>
      </DSCard>

      {/* Badges */}
      <DSCard variant="elevated" padding="xl">
        <h3 style={{ ...typography.styles.h3, marginBottom: spacing[6] }}>Badges</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[4] }}>
          <DSBadge variant="default">Default</DSBadge>
          <DSBadge variant="success" dot>Verified</DSBadge>
          <DSBadge variant="warning">Pending</DSBadge>
          <DSBadge variant="error">Failed</DSBadge>
          <DSBadge variant="info">New</DSBadge>
          <DSBadge variant="gold" size="lg">Premium</DSBadge>
        </div>
      </DSCard>

      {/* Cards */}
      <DSCard variant="elevated" padding="xl">
        <h3 style={{ ...typography.styles.h3, marginBottom: spacing[6] }}>Card Variants</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: spacing[6] }}>
          <DSCard variant="default" padding="lg">
            <DSCardHeader>
              <DSCardTitle>Default Card</DSCardTitle>
              <DSCardDescription>Standard card with light border</DSCardDescription>
            </DSCardHeader>
            <DSCardContent>
              <p style={{ ...typography.styles.body, color: colors.text.secondary }}>
                Used for general content containers.
              </p>
            </DSCardContent>
          </DSCard>

          <DSCard variant="elevated" padding="lg">
            <DSCardHeader>
              <DSCardTitle>Elevated Card</DSCardTitle>
              <DSCardDescription>Card with enhanced shadow</DSCardDescription>
            </DSCardHeader>
            <DSCardContent>
              <p style={{ ...typography.styles.body, color: colors.text.secondary }}>
                Used for important content that needs emphasis.
              </p>
            </DSCardContent>
          </DSCard>

          <DSCard variant="gold" padding="lg" hoverable>
            <DSCardHeader>
              <DSCardTitle>Gold Card</DSCardTitle>
              <DSCardDescription>Premium card with gold accent</DSCardDescription>
            </DSCardHeader>
            <DSCardContent>
              <p style={{ ...typography.styles.body, color: colors.text.secondary }}>
                Used for premium features, rewards, bonuses.
              </p>
            </DSCardContent>
            <DSCardFooter>
              <DSButton variant="primary" size="sm" leftIcon={<Star size={16} />}>
                Claim Reward
              </DSButton>
            </DSCardFooter>
          </DSCard>
        </div>
      </DSCard>
    </div>
  );
}
