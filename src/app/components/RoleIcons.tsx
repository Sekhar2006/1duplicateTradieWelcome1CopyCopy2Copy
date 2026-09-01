// Role Icons Component - Using imported icons from design
import roleIconsImage from "figma:asset/aed49425b79325841e85b2396e7f75cb4cc77a7e.png";

interface RoleIconProps {
  type: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

// Icon position mapping (row, column) in the sprite sheet
// Each icon is approximately 200x200px in a 5x3 grid
const iconPositions: Record<string, { row: number; col: number }> = {
  "producer": { row: 0, col: 0 }, // Wheat/grain icon
  "commission-agent": { row: 0, col: 1 }, // Business person
  "buyer": { row: 0, col: 2 }, // Person with helmet
  "trader": { row: 0, col: 4 }, // Hand with calculator/money
  
  "bank": { row: 1, col: 0 }, // Stack of coins
  "insurance": { row: 1, col: 2 }, // Shopping cart with upward arrow
  "company": { row: 1, col: 4 }, // Company/organization symbol
  
  "verifier": { row: 2, col: 3 }, // Hand with magnifying glass
  "regulatory": { row: 2, col: 2 }, // Trophy/award
  "logistics": { row: 2, col: 4 }, // Delivery truck
  "storage": { row: 1, col: 1 }, // Rupee/currency symbol (for storage facility)
};

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
  "2xl": 56,
};

export function RoleIcon({ type, size = "md", className = "" }: RoleIconProps) {
  const position = iconPositions[type];
  
  if (!position) {
    return null;
  }

  const { row, col } = position;
  const iconSize = 200; // Size of each icon in the sprite sheet
  const displaySize = sizeMap[size];
  
  // Calculate the background position as percentages for better accuracy
  const xPercent = (col / 4) * 100; // 5 columns = 4 gaps between
  const yPercent = (row / 2) * 100; // 3 rows = 2 gaps between

  return (
    <div 
      className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        width: `${displaySize}px`,
        height: `${displaySize}px`,
        backgroundImage: `url(${roleIconsImage})`,
        backgroundSize: '500% 300%', // 5 columns x 3 rows
        backgroundPosition: `${xPercent}% ${yPercent}%`,
        backgroundRepeat: 'no-repeat',
      }}
      aria-label={`${type} icon`}
    />
  );
}