// Example: Trading Card Component using TRADIE Design System
// This demonstrates how to build a commodity trading card using design tokens

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  DSCard, 
  DSCardHeader, 
  DSCardTitle, 
  DSCardDescription, 
  DSCardContent,
  DSCardFooter,
  DSButton,
  DSBadge,
  designTokens 
} from '../index';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

interface TradingCardProps {
  commodity: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  lastUpdate: string;
  onTrade?: () => void;
  onViewDetails?: () => void;
}

export function ExampleTradingCard({
  commodity,
  price,
  change,
  changePercent,
  volume,
  lastUpdate,
  onTrade,
  onViewDetails,
}: TradingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const { colors, typography, spacing, radius } = designTokens;
  const isPositive = change >= 0;

  // Styles using design tokens
  const priceContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'baseline',
    gap: spacing[2],
    marginBottom: spacing[4],
  };

  const priceStyle: React.CSSProperties = {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.blue.primary,
  };

  const changeContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[1],
    padding: `${spacing[1]} ${spacing[2]}`,
    backgroundColor: isPositive ? `${colors.status.success}15` : `${colors.status.error}15`,
    color: isPositive ? colors.status.success : colors.status.error,
    borderRadius: radius.md,
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  };

  const statsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing[4],
    marginTop: spacing[4],
    paddingTop: spacing[4],
    borderTop: `1px solid ${colors.border.light}`,
  };

  const statItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
  };

  const statLabelStyle: React.CSSProperties = {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.wide,
  };

  const statValueStyle: React.CSSProperties = {
    fontFamily: typography.fonts.subheading,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    gap: spacing[3],
    marginTop: spacing[4],
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <DSCard 
        variant={isHovered ? 'elevated' : 'default'} 
        padding="lg"
      >
        <DSCardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <DSCardTitle>{commodity}</DSCardTitle>
              <DSCardDescription>Commodity Futures</DSCardDescription>
            </div>
            <DSBadge variant="gold">Live</DSBadge>
          </div>
        </DSCardHeader>

        <DSCardContent>
          {/* Price Display */}
          <div style={priceContainerStyle}>
            <span style={priceStyle}>₹{price.toLocaleString()}</span>
            <div style={changeContainerStyle}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{isPositive ? '+' : ''}{change.toFixed(2)}</span>
              <span>({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={statsGridStyle}>
            <div style={statItemStyle}>
              <span style={statLabelStyle}>24h Volume</span>
              <span style={statValueStyle}>{volume}</span>
            </div>
            <div style={statItemStyle}>
              <span style={statLabelStyle}>Last Update</span>
              <span style={statValueStyle}>{lastUpdate}</span>
            </div>
          </div>
        </DSCardContent>

        <div style={footerStyle}>
          <DSButton 
            variant="primary" 
            size="md"
            onClick={onTrade}
            style={{ flex: 1 }}
          >
            Trade Now
          </DSButton>
          <DSButton 
            variant="ghost" 
            size="md"
            onClick={onViewDetails}
            leftIcon={<Info size={18} />}
          >
            Details
          </DSButton>
        </div>
      </DSCard>
    </motion.div>
  );
}

// Example Usage:
/*
import { ExampleTradingCard } from './design-system/examples/ExampleTradingCard';

<ExampleTradingCard
  commodity="Wheat"
  price={25450}
  change={325.50}
  changePercent={1.29}
  volume="12.5K tons"
  lastUpdate="2 min ago"
  onTrade={() => console.log('Trade clicked')}
  onViewDetails={() => console.log('Details clicked')}
/>
*/
