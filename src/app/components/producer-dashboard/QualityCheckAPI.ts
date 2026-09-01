/**
 * Quality Check API Service
 * Frontend service for interacting with quality check backend APIs
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

// Types
export interface QualityCheckGrading {
  size?: string;
  color?: string;
  grade?: string;
  aroma?: string;
  moisture?: string;
  firmness?: string;
  texture?: string;
  [key: string]: any;
}

export interface ExternalAssessment {
  type: '3rd Party Verifier' | 'Government Appointee' | 'Lab Report' | 'Buyer Classification';
  documentUrl?: string;
  rating?: number;
  comments?: string;
  verifierName?: string;
}

export interface QualityCheckTiers {
  selfAssessment: boolean;
  externalAssessment?: ExternalAssessment;
}

export interface SalesListing {
  saleType: 'Commission Agent' | 'Direct' | 'Market Yard';
  agentRating?: number;
  qualitySpecification?: string;
}

export interface PackingDetails {
  numberOfBags: number;
  variety: string;
  harvestDate: string;
  processingDate?: string;
  packingDate: string;
  tokenId?: string;
}

export interface QualityCheckSubmission {
  producerId: string;
  commodity: string;
  grading: QualityCheckGrading;
  harvestMethod: string[];
  processingDone: boolean;
  qualityCheckTiers: QualityCheckTiers;
  salesListing?: SalesListing;
  packingDetails: PackingDetails;
}

export interface QualityCheckResponse {
  success: boolean;
  message: string;
  data?: {
    qualityCheckId: number;
    tokenId: string;
    qrCodeUrl: string;
    commodity: string;
    grade: string;
    status: string;
  };
  error?: string;
}

export interface TokenData {
  tokenId: string;
  commodityType: string;
  varietyName: string;
  qualityGrade: string;
  numberOfBags: number;
  harvestDate: string;
  processingDate?: string;
  packingDate: string;
  producerName: string;
  producerLocation: string;
  producerContact?: string;
  grading: QualityCheckGrading;
  harvestMethod: string[];
  processingDone: boolean;
  qualityTier: {
    selfAssessment: boolean;
    externalAssessment?: string;
    rating?: number;
    comments?: string;
  };
  certifications: Array<{
    type: string;
    issuer: string;
    documentUrl: string;
    issueDate: string;
    status: string;
  }>;
  salesListing?: {
    sale_type: string;
    agent_rating?: number;
    quality_specification?: string;
  };
  feedback: Array<{
    stage: string;
    rating: number;
    comment: string;
    source: string;
    date: string;
  }>;
  qrCodeUrl: string;
  status: string;
}

export interface FeedbackSubmission {
  stage: string;
  rating: number;
  comment?: string;
  source: string;
}

/**
 * Get authentication token from localStorage
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('tradie_auth_token');
}

/**
 * Make authenticated API request with better error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `API request failed with status ${response.status}`);
      }

      return data;
    } else {
      // Non-JSON response
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      // Try to parse as JSON anyway
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        throw new Error('Invalid JSON response from server');
      }
    }
  } catch (error: any) {
    // Enhanced error message for network issues
    if (error.message.includes('fetch') || error.name === 'TypeError') {
      throw new Error(`Network error: Cannot connect to ${API_BASE_URL}. Please ensure the API server is running.`);
    }
    throw error;
  }
}

/**
 * Submit a new quality check with mock mode fallback
 */
export async function submitQualityCheck(
  data: QualityCheckSubmission
): Promise<QualityCheckResponse> {
  // Check if mock mode is enabled (default: true)
  const USE_MOCK_MODE = typeof window !== 'undefined' 
    ? (window as any).__TRADIE_MOCK_MODE__ !== false 
    : true;

  try {
    return await apiRequest<QualityCheckResponse>('/quality-check', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error: any) {
    // If network error and mock mode enabled, return mock response
    if (USE_MOCK_MODE && error.message.includes('Network error')) {
      console.log('API not available, using mock mode for quality check submission');
      
      // Generate mock token ID
      const mockTokenId = `TQC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Return mock response
      return {
        success: true,
        message: 'Quality check submitted successfully (Mock Mode)',
        data: {
          qualityCheckId: Date.now(),
          tokenId: mockTokenId,
          qrCodeUrl: generateQRCodeUrl(mockTokenId),
          commodity: data.commodity,
          grade: data.grading.grade || 'N/A',
          status: 'active'
        }
      };
    }
    // Re-throw if mock mode disabled or different error
    throw error;
  }
}

/**
 * Get quality check by ID
 */
export async function getQualityCheck(id: number): Promise<any> {
  return apiRequest(`/quality-check/${id}`, {
    method: 'GET',
  });
}

/**
 * Get quality check by token ID (QR scan) with mock mode fallback
 */
export async function getQualityCheckByToken(tokenId: string): Promise<{
  success: boolean;
  data: TokenData;
}> {
  const USE_MOCK_MODE = typeof window !== 'undefined' 
    ? (window as any).__TRADIE_MOCK_MODE__ !== false 
    : true;

  try {
    return await apiRequest(`/quality-check/token/${tokenId}`, {
      method: 'GET',
    });
  } catch (error: any) {
    // If network error and mock mode enabled, return mock data
    if (USE_MOCK_MODE && error.message.includes('Network error')) {
      console.log('API not available, using mock data for token verification');
      
      // Return mock token data
      return {
        success: true,
        data: {
          tokenId: tokenId,
          commodityType: 'Mock Commodity',
          varietyName: 'Mock Variety',
          qualityGrade: 'Premium (A+)',
          numberOfBags: 100,
          harvestDate: new Date().toISOString().split('T')[0],
          packingDate: new Date().toISOString().split('T')[0],
          producerName: 'Mock Producer',
          producerLocation: 'Mock Location',
          grading: {
            grade: 'Premium (A+)',
            color: 'Excellent',
            size: 'Large'
          },
          harvestMethod: ['Manual', 'Sustainable'],
          processingDone: true,
          qualityTier: {
            selfAssessment: true,
            externalAssessment: '3rd Party Verified',
            rating: 5,
            comments: 'Mock quality check data (API not available)'
          },
          certifications: [],
          feedback: [],
          qrCodeUrl: generateQRCodeUrl(tokenId),
          status: 'active'
        }
      };
    }
    throw error;
  }
}

/**
 * Get all quality checks for a producer
 */
export async function getProducerQualityChecks(
  producerId: string,
  options?: {
    limit?: number;
    offset?: number;
    commodity?: string;
  }
): Promise<any> {
  const params = new URLSearchParams();
  if (options?.limit) params.append('limit', options.limit.toString());
  if (options?.offset) params.append('offset', options.offset.toString());
  if (options?.commodity) params.append('commodity', options.commodity);

  const queryString = params.toString();
  const url = `/quality-check/producer/${producerId}${queryString ? `?${queryString}` : ''}`;

  return apiRequest(url, {
    method: 'GET',
  });
}

/**
 * Add feedback to quality check
 */
export async function addQualityCheckFeedback(
  qualityCheckId: number,
  feedback: FeedbackSubmission
): Promise<any> {
  return apiRequest(`/quality-check/${qualityCheckId}/feedback`, {
    method: 'POST',
    body: JSON.stringify(feedback),
  });
}

/**
 * Update quality check
 */
export async function updateQualityCheck(
  qualityCheckId: number,
  updates: Partial<QualityCheckSubmission>
): Promise<any> {
  return apiRequest(`/quality-check/${qualityCheckId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

/**
 * Delete (deactivate) quality check
 */
export async function deleteQualityCheck(qualityCheckId: number): Promise<any> {
  return apiRequest(`/quality-check/${qualityCheckId}`, {
    method: 'DELETE',
  });
}

/**
 * Upload document for external verification
 * Note: This would typically go to a separate file upload endpoint
 */
export async function uploadVerificationDocument(
  file: File,
  qualityCheckId?: number
): Promise<{ success: boolean; documentUrl: string }> {
  const formData = new FormData();
  formData.append('file', file);
  if (qualityCheckId) {
    formData.append('qualityCheckId', qualityCheckId.toString());
  }

  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}/upload/verification`, {
    method: 'POST',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'File upload failed');
  }

  return data;
}

/**
 * Generate QR code URL for a token
 */
export function generateQRCodeUrl(tokenId: string, size: number = 300): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(tokenId)}`;
}

/**
 * Download quality check report as PDF
 */
export async function downloadQualityReport(
  tokenId: string,
  format: 'pdf' | 'json' = 'pdf'
): Promise<Blob> {
  const token = getAuthToken();
  
  const response = await fetch(
    `${API_BASE_URL}/quality-check/token/${tokenId}/report?format=${format}`,
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
 * Get quality check statistics for a producer
 */
export async function getQualityCheckStats(producerId: string): Promise<{
  total: number;
  byGrade: Record<string, number>;
  byCommodity: Record<string, number>;
  avgRating: number;
}> {
  return apiRequest(`/quality-check/producer/${producerId}/stats`, {
    method: 'GET',
  });
}

/**
 * Search quality checks
 */
export async function searchQualityChecks(query: {
  commodity?: string;
  grade?: string;
  dateFrom?: string;
  dateTo?: string;
  producerId?: string;
}): Promise<any> {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  return apiRequest(`/quality-check/search?${params.toString()}`, {
    method: 'GET',
  });
}

// Export all functions
export const QualityCheckAPI = {
  submitQualityCheck,
  getQualityCheck,
  getQualityCheckByToken,
  getProducerQualityChecks,
  addQualityCheckFeedback,
  updateQualityCheck,
  deleteQualityCheck,
  uploadVerificationDocument,
  generateQRCodeUrl,
  downloadQualityReport,
  getQualityCheckStats,
  searchQualityChecks,
};

export default QualityCheckAPI;
