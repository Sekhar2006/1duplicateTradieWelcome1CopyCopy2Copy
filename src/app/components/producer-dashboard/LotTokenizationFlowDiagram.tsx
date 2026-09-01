import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  CheckCircle,
  Package,
  List,
  Sparkles,
  Shield,
  Eye,
  AlertCircle,
  ArrowRight,
  Info,
  X
} from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface FlowNode {
  id: string;
  label: string;
  type: 'start' | 'process' | 'decision' | 'end';
  details?: string;
  position: { x: number; y: number };
}

interface FlowEdge {
  from: string;
  to: string;
  condition?: string;
}

const LotTokenizationFlowDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Define nodes with positions for visual layout
  const nodes: FlowNode[] = [
    {
      id: 'start',
      label: 'Start',
      type: 'start',
      position: { x: 50, y: 5 }
    },
    {
      id: 'grading_complete',
      label: 'Grading Complete',
      type: 'process',
      position: { x: 50, y: 15 }
    },
    {
      id: 'create_lots',
      label: 'Create Lots',
      type: 'process',
      details: 'Input lot qualities (A grade, B grade, etc.), create multiple lots per batch',
      position: { x: 50, y: 28 }
    },
    {
      id: 'lot_list',
      label: 'Display Lots List',
      type: 'decision',
      details: 'Show lots with assigned qualities, allow edit or add',
      position: { x: 50, y: 43 }
    },
    {
      id: 'initiate_tokenization',
      label: 'Initiate Tokenization',
      type: 'process',
      details: 'Generate unique batch ID + individual token IDs per lot',
      position: { x: 50, y: 58 }
    },
    {
      id: 'token_data_enrichment',
      label: 'Token Data Enrichment',
      type: 'process',
      details: 'Add/update info by verifiers and producers at various stages',
      position: { x: 50, y: 71 }
    },
    {
      id: 'verify_token',
      label: 'Token/NFT Verification by Buyer',
      type: 'decision',
      position: { x: 50, y: 86 }
    },
    {
      id: 'buyer_view',
      label: 'Buyer Views Details',
      type: 'process',
      details: 'Show cultivation history, certificates, AI insights by Grok',
      position: { x: 30, y: 95 }
    },
    {
      id: 'end',
      label: 'End',
      type: 'end',
      position: { x: 50, y: 95 }
    }
  ];

  const edges: FlowEdge[] = [
    { from: 'start', to: 'grading_complete' },
    { from: 'grading_complete', to: 'create_lots' },
    { from: 'create_lots', to: 'lot_list' },
    { from: 'lot_list', to: 'initiate_tokenization' },
    { from: 'initiate_tokenization', to: 'token_data_enrichment' },
    { from: 'token_data_enrichment', to: 'verify_token' },
    { from: 'verify_token', to: 'buyer_view', condition: 'Token Valid' },
    { from: 'verify_token', to: 'end', condition: 'Token Invalid' }
  ];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'start':
        return Play;
      case 'process':
        return Package;
      case 'decision':
        return AlertCircle;
      case 'end':
        return CheckCircle;
      default:
        return Package;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'start':
        return { bg: 'bg-green-500', border: 'border-green-600', text: 'text-white' };
      case 'process':
        return { bg: 'bg-blue-500', border: 'border-blue-600', text: 'text-white' };
      case 'decision':
        return { bg: 'bg-yellow-500', border: 'border-yellow-600', text: 'text-white' };
      case 'end':
        return { bg: 'bg-red-500', border: 'border-red-600', text: 'text-white' };
      default:
        return { bg: 'bg-gray-500', border: 'border-gray-600', text: 'text-white' };
    }
  };

  const getNodeShape = (type: string) => {
    switch (type) {
      case 'start':
      case 'end':
        return 'rounded-full';
      case 'decision':
        return 'rotate-45';
      case 'process':
      default:
        return 'rounded-lg';
    }
  };

  const renderNode = (node: FlowNode) => {
    const Icon = getNodeIcon(node.type);
    const colors = getNodeColor(node.type);
    const shape = getNodeShape(node.type);
    const isHovered = hoveredNode === node.id;

    return (
      <motion.div
        key={node.id}
        style={{
          position: 'absolute',
          left: `${node.position.x}%`,
          top: `${node.position.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 10
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 * nodes.findIndex(n => n.id === node.id) }}
        whileHover={{ scale: 1.1 }}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
        onClick={() => setSelectedNode(node)}
      >
        <div className="flex flex-col items-center cursor-pointer">
          {/* Node Shape */}
          <div
            className={`
              ${shape}
              ${colors.bg}
              ${colors.border}
              border-4
              shadow-lg
              flex items-center justify-center
              transition-all duration-300
              ${node.type === 'start' || node.type === 'end' ? 'w-20 h-20' : 'w-24 h-24'}
              ${node.type === 'decision' ? 'w-28 h-28' : ''}
              ${isHovered ? 'shadow-2xl ring-4 ring-white' : ''}
            `}
          >
            {node.type === 'decision' ? (
              <div className="-rotate-45 flex items-center justify-center">
                <Icon className="w-8 h-8 text-white" />
              </div>
            ) : (
              <Icon className={`w-10 h-10 ${colors.text}`} />
            )}
          </div>

          {/* Node Label */}
          <div className="mt-2 text-center max-w-[150px]">
            <p className="text-sm font-bold text-[#003E6D]">{node.label}</p>
            {node.details && (
              <Badge className="mt-1 bg-[#FFD700] text-[#003E6D] text-xs">
                <Info className="w-3 h-3 mr-1" />
                Details
              </Badge>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderEdge = (edge: FlowEdge) => {
    const fromNode = nodes.find(n => n.id === edge.from);
    const toNode = nodes.find(n => n.id === edge.to);

    if (!fromNode || !toNode) return null;

    const fromX = fromNode.position.x;
    const fromY = fromNode.position.y;
    const toX = toNode.position.x;
    const toY = toNode.position.y;

    // Calculate path
    const isStraight = fromX === toX;
    const path = isStraight
      ? `M ${fromX} ${fromY} L ${toX} ${toY}`
      : `M ${fromX} ${fromY} Q ${fromX} ${(fromY + toY) / 2} ${toX} ${toY}`;

    return (
      <g key={`${edge.from}-${edge.to}`}>
        {/* Arrow Line */}
        <motion.path
          d={path}
          stroke="#003E6D"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          markerEnd="url(#arrowhead)"
        />

        {/* Condition Label */}
        {edge.condition && (
          <text
            x={(fromX + toX) / 2}
            y={(fromY + toY) / 2}
            textAnchor="middle"
            className="text-xs fill-[#003E6D]"
            style={{ fontWeight: 'bold' }}
          >
            {edge.condition}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFC] to-[#D9F2FF] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-[#003E6D] mb-2">Lot Creation & Tokenization Flow</h1>
          <p className="text-gray-600">Interactive workflow diagram with AI insights integration</p>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm">Start/End</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500"></div>
              <span className="text-sm">Process</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rotate-45 bg-yellow-500"></div>
              <span className="text-sm">Decision</span>
            </div>
          </div>
        </div>

        {/* Flow Diagram */}
        <Card className="p-8 bg-white shadow-lg border-2 border-[#003E6D]">
          <div className="relative" style={{ height: '900px' }}>
            {/* SVG for connections */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1 }}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#003E6D" />
                </marker>
              </defs>

              {edges.map(edge => renderEdge(edge))}
            </svg>

            {/* Nodes */}
            {nodes.map(node => renderNode(node))}
          </div>
        </Card>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-start gap-3">
              <Package className="w-8 h-8 text-[#003E6D] flex-shrink-0" />
              <div>
                <h3 className="text-[#003E6D] mb-1">Lot Creation</h3>
                <p className="text-sm text-gray-700">Create quality-graded lots from batches with A, B, C grades</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-start gap-3">
              <Sparkles className="w-8 h-8 text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="text-[#003E6D] mb-1">AI Insights</h3>
                <p className="text-sm text-gray-700">Grok AI provides quality scores, fraud detection, and market trends</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-start gap-3">
              <Shield className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-[#003E6D] mb-1">Tokenization</h3>
                <p className="text-sm text-gray-700">Blockchain-based tokens with unique IDs and verified provenance</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Process Steps Summary */}
        <Card className="p-6 mt-6 bg-white">
          <h3 className="text-[#003E6D] mb-4">Process Overview</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <p className="text-sm"><strong>Grading Complete:</strong> After quality assessment, proceed to lot creation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <p className="text-sm"><strong>Create Lots:</strong> Divide batch into quality-graded lots (A+, A, B+, B, C)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <p className="text-sm"><strong>Review & Edit:</strong> Display lots list with option to modify or add more</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <p className="text-sm"><strong>Tokenization:</strong> Generate global batch ID and unique token IDs per lot</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                5
              </div>
              <div>
                <p className="text-sm"><strong>Data Enrichment:</strong> Upload certificates, add verifications, update cultivation history</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center flex-shrink-0">
                6
              </div>
              <div>
                <p className="text-sm"><strong>Buyer Verification:</strong> Buyer scans token/NFT QR code for validation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                7
              </div>
              <div>
                <p className="text-sm"><strong>Buyer View:</strong> Display complete product details, history, certificates, and Grok AI insights</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Node Details Dialog */}
      <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedNode && (() => {
                const Icon = getNodeIcon(selectedNode.type);
                return <Icon className="w-6 h-6 text-[#003E6D]" />;
              })()}
              {selectedNode?.label}
            </DialogTitle>
          </DialogHeader>
          
          {selectedNode && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Node Type:</p>
                <Badge className={getNodeColor(selectedNode.type).bg}>
                  {selectedNode.type.toUpperCase()}
                </Badge>
              </div>

              {selectedNode.details && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Details:</p>
                  <p className="text-sm text-gray-800">{selectedNode.details}</p>
                </div>
              )}

              {/* Specific content based on node */}
              {selectedNode.id === 'create_lots' && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-sm mb-2">Available Grades:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-500 text-white">A+ Grade (Premium)</Badge>
                    <Badge className="bg-green-400 text-white">A Grade (High)</Badge>
                    <Badge className="bg-blue-500 text-white">B+ Grade (Good)</Badge>
                    <Badge className="bg-blue-400 text-white">B Grade (Standard)</Badge>
                    <Badge className="bg-yellow-500 text-white">C Grade (Fair)</Badge>
                  </div>
                </div>
              )}

              {selectedNode.id === 'initiate_tokenization' && (
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="text-sm mb-2">Token Generation:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Global Batch ID: GB-{'{batchId}'}-{'{timestamp}'}</li>
                    <li>• Token ID: TKN-{'{lotNumber}'}-{'{timestamp}'}</li>
                    <li>• Blockchain verification</li>
                    <li>• NFT minting</li>
                  </ul>
                </div>
              )}

              {selectedNode.id === 'buyer_view' && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="text-sm mb-2">Grok AI Insights Include:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Quality Score (0-100)</li>
                    <li>• Risk Level (Low/Medium/High)</li>
                    <li>• Fraud Probability Percentage</li>
                    <li>• Market Recommendations</li>
                    <li>• Current Market Trends</li>
                  </ul>
                </div>
              )}

              {selectedNode.id === 'token_data_enrichment' && (
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="text-sm mb-2">Data Enrichment Options:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Upload certificates (Organic, Quality, Export, Safety)</li>
                    <li>• Add verifier information</li>
                    <li>• Update cultivation history</li>
                    <li>• Attach supporting documents</li>
                    <li>• Real-time metadata updates</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LotTokenizationFlowDiagram;
