import React from 'react';
import QualityCheckWorkflow from './producer-dashboard/QualityCheckWorkflow';

/**
 * Quality Check Workflow Demo
 * 
 * This is a standalone demo component that showcases the complete
 * Producer Quality Verification & Feedback System.
 * 
 * Features:
 * - 6-step workflow (Commodity → Harvest → Processing → Quality → Sales → Tokenization)
 * - Compliance scoring
 * - Document upload
 * - Feedback tracking
 * - Token generation
 * 
 * Usage:
 * Import this component in App.tsx to test the quality check workflow
 */

const QualityCheckDemo: React.FC = () => {
  return (
    <div className="min-h-screen">
      <QualityCheckWorkflow />
    </div>
  );
};

export default QualityCheckDemo;
