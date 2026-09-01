/**
 * Crop Batch Provenance & Tokenization API Service
 * Frontend service for interacting with provenance tracking backend APIs
 */

// Get API URL safely (works in browser and Node.js)
const getApiBaseUrl = (): string => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Browser environment - check window object or use default
    return (window as any).__TRADIE_API_URL__ || 'http://localhost:3001/api';
  }
  // Node.js environment - use process.env
  return (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) || 'http://localhost:3001/api';
};

const API_BASE_URL = getApiBaseUrl();

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface FarmLocation {
  state: string;
  district: string;
  village?: string;
  pincode?: string;
  gpsCoords?: {
    latitude: number;
    longitude: number;
  };
}

export interface InitialCropData {
  plantingDate: string;
  estimatedHarvest: string;
  quantity: number;
  unit: string;
}

export interface CropBatchCreation {
  producerId: string;
  category: string;
  variety: string;
  farmLocation: FarmLocation;
  initialData: InitialCropData;
}

export interface HistoryEntry {
  stage: 'planting' | 'growing' | 'harvesting' | 'grading' | 'processing' | 'packing' | 'tokenized' | 'delivered';
  eventType: string;
  description: string;
  data?: Record<string, any>;
  createdBy: string;
}

export interface TokenMetadata {
  certifications?: Array<{
    type: string;
    issuer: string;
    documentUrl?: string;
    issueDate?: string;
  }>;
  qualityReport?: Record<string, any>;
  packingDetails?: {
    numberOfBags: number;
    packingDate: string;
    packingMethod?: string;
    storageConditions?: string;
  };
}

export interface CropBatch {
  cropBatchId: string;
  category: string;
  variety: string;
  farmLocation: FarmLocation;
  plantingDate: string;
  estimatedHarvestDate?: string;
  actualHarvestDate?: string;
  quantity: number;
  unit: string;
  qualityGrade?: string;
  currentStage: string;
  status: string;
  producer: {
    name: string;
    contact: string;
    location: FarmLocation;
  };
  history: Array<{
    id: number;
    stage: string;
    eventType: string;
    description: string;
    data: Record<string, any>;
    timestamp: string;
    createdBy: string;
  }>;
  token?: {
    tokenId: string;
    qrCodeUrl: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TokenData {
  tokenId: string;
  tokenStatus: string;
  tokenCreatedAt: string;
  qrCodeUrl: string;
  cropBatchId: string;
  category: string;
  variety: string;
  qualityGrade?: string;
  currentStage: string;
  status: string;
  farmLocation: FarmLocation;
  plantingDate?: string;
  estimatedHarvestDate?: string;
  actualHarvestDate?: string;
  quantity: number;
  unit: string;
  producer: {
    name: string;
    contact: string;
    email?: string;
    location: FarmLocation;
    farmSize?: number;
    certifications: string[];
  };
  metadata: TokenMetadata;
  timeline: Array<{
    id: number;
    stage: string;
    eventType: string;
    description: string;
    data: Record<string, any>;
    timestamp: string;
  }>;
  stats: {
    totalEvents: number;
    stages: string[];
    daysFromPlantingToHarvest?: number;
  };
}

export interface ProvenanceStats {
  totalBatches: number;
  tokenizedBatches: number;
  totalScans: number;
  byCategory: Record<string, number>;
  byStage: Record<string, number>;
}

export interface APIResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get authentication token from localStorage
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('tradie_auth_token');
}

/**
 * Make authenticated API request
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

// ============================================================================
// CROP BATCH OPERATIONS
// ============================================================================

/**
 * Create new crop batch with unique ID
 */
export async function createCropBatch(
  batchData: CropBatchCreation
): Promise<APIResponse<{
  cropBatchId: string;
  category: string;
  variety: string;
  status: string;
  currentStage: string;
  createdAt: string;
}>> {
  return apiRequest('/provenance/crop-batch', {
    method: 'POST',
    body: JSON.stringify(batchData),
  });
}

/**
 * Add history entry to crop batch
 */
export async function addCropBatchHistory(
  cropBatchId: string,
  historyEntry: HistoryEntry
): Promise<APIResponse<{
  historyId: number;
  cropBatchId: string;
  stage: string;
  eventType: string;
  timestamp: string;
  totalHistoryEntries: number;
}>> {
  return apiRequest(`/provenance/crop-batch/${cropBatchId}/history`, {
    method: 'POST',
    body: JSON.stringify(historyEntry),
  });
}

/**
 * Get crop batch by ID with full history
 */
export async function getCropBatch(cropBatchId: string): Promise<APIResponse<CropBatch>> {
  return apiRequest(`/provenance/crop-batch/${cropBatchId}`, {
    method: 'GET',
  });
}

/**
 * Get all crop batches for a producer
 */
export async function getProducerCropBatches(
  producerId: string,
  options?: {
    limit?: number;
    offset?: number;
    category?: string;
    stage?: string;
    status?: string;
  }
): Promise<APIResponse<CropBatch[]>> {
  const params = new URLSearchParams();
  if (options?.limit) params.append('limit', options.limit.toString());
  if (options?.offset) params.append('offset', options.offset.toString());
  if (options?.category) params.append('category', options.category);
  if (options?.stage) params.append('stage', options.stage);
  if (options?.status) params.append('status', options.status);

  const queryString = params.toString();
  const url = `/provenance/crop-batch/producer/${producerId}${queryString ? `?${queryString}` : ''}`;

  return apiRequest(url, {
    method: 'GET',
  });
}

// ============================================================================
// TOKENIZATION OPERATIONS (NFT/QR)
// ============================================================================

/**
 * Tokenize crop batch and generate NFT Token ID + QR code
 */
export async function tokenizeCropBatch(
  cropBatchId: string,
  metadata?: TokenMetadata
): Promise<APIResponse<{
  tokenId: string;
  cropBatchId: string;
  qrCodeUrl: string;
  qrCodeDataUrl: string;
  category: string;
  variety: string;
  qualityGrade: string;
  status: string;
  createdAt: string;
}>> {
  return apiRequest(`/provenance/tokenize/${cropBatchId}`, {
    method: 'POST',
    body: JSON.stringify({ tokenMetadata: metadata }),
  });
}

/**
 * Get full crop batch data by Token ID (QR scan)
 * Public endpoint - no authentication required
 */
export async function getTokenData(tokenId: string): Promise<APIResponse<TokenData>> {
  // Don't use apiRequest for this - it's a public endpoint
  const response = await fetch(`${API_BASE_URL}/provenance/token/${tokenId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to retrieve token data');
  }

  return data;
}

/**
 * Record token verification (when QR is scanned)
 */
export async function verifyToken(
  tokenId: string,
  verificationData?: {
    verifiedBy?: string;
    verificationType?: 'qr_scan' | 'manual_lookup' | 'api_call';
    location?: {
      latitude?: number;
      longitude?: number;
      address?: string;
    };
  }
): Promise<APIResponse<{
  tokenId: string;
  verifiedAt: string;
}>> {
  // Public endpoint - don't use authentication
  const response = await fetch(`${API_BASE_URL}/provenance/token/${tokenId}/verify`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(verificationData || {}),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to record verification');
  }

  return data;
}

/**
 * Get verification history for a token
 */
export async function getTokenVerifications(
  tokenId: string
): Promise<APIResponse<Array<{
  verification_id: number;
  token_id: string;
  verified_by: string;
  verification_type: string;
  location: Record<string, any>;
  verified_at: string;
}>>> {
  return apiRequest(`/provenance/token/${tokenId}/verifications`, {
    method: 'GET',
  });
}

// ============================================================================
// STATISTICS & ANALYTICS
// ============================================================================

/**
 * Get provenance statistics for a producer
 */
export async function getProvenanceStats(
  producerId: string
): Promise<APIResponse<ProvenanceStats>> {
  return apiRequest(`/provenance/stats/${producerId}`, {
    method: 'GET',
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate QR code URL for display (using external service)
 */
export function generateQRCodeUrl(tokenId: string, size: number = 300): string {
  // Get app URL safely
  const appUrl = (typeof window !== 'undefined' && (window as any).__TRADIE_APP_URL__) ||
                 (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_APP_URL) ||
                 'https://tradie.app';
  const verificationUrl = `${appUrl}/verify/${tokenId}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(verificationUrl)}`;
}

/**
 * Format crop batch ID for display
 */
export function formatCropBatchId(cropBatchId: string): string {
  return cropBatchId.replace(/-/g, ' ');
}

/**
 * Get stage display name
 */
export function getStageDisplayName(stage: string): string {
  const stageNames: Record<string, string> = {
    planting: 'Planting',
    growing: 'Growing',
    harvesting: 'Harvesting',
    grading: 'Quality Grading',
    processing: 'Processing',
    packing: 'Packing',
    tokenized: 'Tokenized (NFT)',
    delivered: 'Delivered'
  };
  return stageNames[stage] || stage;
}

/**
 * Get stage color for UI display
 */
export function getStageColor(stage: string): string {
  const stageColors: Record<string, string> = {
    planting: '#4CAF50',
    growing: '#8BC34A',
    harvesting: '#FFC107',
    grading: '#FF9800',
    processing: '#FF5722',
    packing: '#9C27B0',
    tokenized: '#3F51B5',
    delivered: '#009688'
  };
  return stageColors[stage] || '#757575';
}

/**
 * Calculate days between dates
 */
export function calculateDaysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Download token data as PDF
 */
export async function downloadTokenReport(
  tokenId: string,
  format: 'pdf' | 'json' = 'pdf'
): Promise<Blob> {
  const token = getAuthToken();
  
  const response = await fetch(
    `${API_BASE_URL}/provenance/token/${tokenId}/report?format=${format}`,
    {
      method: 'GET',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to download report');
  }

  return response.blob();
}

/**
 * Export timeline as JSON for external use
 */
export function exportTimelineAsJSON(timeline: TokenData['timeline']): string {
  return JSON.stringify(timeline, null, 2);
}

// ============================================================================
// EXPORT ALL AS SINGLE OBJECT
// ============================================================================

export const ProvenanceAPI = {
  // Crop Batch Operations
  createCropBatch,
  addCropBatchHistory,
  getCropBatch,
  getProducerCropBatches,
  
  // Tokenization
  tokenizeCropBatch,
  getTokenData,
  verifyToken,
  getTokenVerifications,
  
  // Statistics
  getProvenanceStats,
  
  // Utilities
  generateQRCodeUrl,
  formatCropBatchId,
  getStageDisplayName,
  getStageColor,
  calculateDaysBetween,
  downloadTokenReport,
  exportTimelineAsJSON,
};

export default ProvenanceAPI;
