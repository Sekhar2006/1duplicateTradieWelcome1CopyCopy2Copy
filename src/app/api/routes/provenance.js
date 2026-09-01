/**
 * Crop Batch Provenance & Tokenization API Routes
 * Handles crop batch lifecycle tracking, NFT tokenization, and QR code generation
 * 
 * Features:
 * - Unique Crop Batch ID generation
 * - Multi-stage history tracking (planting, growing, harvesting, grading, packing)
 * - NFT/Token generation with QR codes
 * - Full provenance chain retrieval
 * - Timeline visualization data
 */

const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/auth');

// JWT Secret for token signing
const JWT_SECRET = process.env.JWT_SECRET || 'tradie_provenance_secret_key_2025';

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tradie_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate unique Crop Batch ID
 * Format: CB-[CATEGORY]-[VARIETY]-[TIMESTAMP]-[RANDOM]
 */
function generateCropBatchId(category, variety) {
  const categoryCode = category.substring(0, 3).toUpperCase();
  const varietyCode = variety.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CB-${categoryCode}-${varietyCode}-${timestamp}${random}`;
}

/**
 * Generate unique Token ID for NFT
 * Format: NFT-TRD-[TIMESTAMP]-[RANDOM]
 */
function generateTokenId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `NFT-TRD-${timestamp}${random}`;
}

/**
 * Generate QR code data URL
 */
async function generateQRCodeDataUrl(data) {
  try {
    return await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 1,
      margin: 1,
      width: 300
    });
  } catch (error) {
    console.error('QR Code generation error:', error);
    throw new Error('Failed to generate QR code');
  }
}

// ============================================================================
// CROP BATCH ENDPOINTS
// ============================================================================

/**
 * POST /api/provenance/crop-batch
 * Create new crop batch and generate unique Crop Batch ID
 * 
 * Body:
 * {
 *   producerId: string,
 *   category: string (e.g., "Vegetables", "Fruits"),
 *   variety: string (e.g., "Tomato", "Mango"),
 *   farmLocation: { state, district, village },
 *   initialData: { plantingDate, estimatedHarvest, quantity, unit }
 * }
 */
router.post('/crop-batch', authenticateToken, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const {
      producerId,
      category,
      variety,
      farmLocation,
      initialData
    } = req.body;

    // Validate required fields
    if (!producerId || !category || !variety) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        required: ['producerId', 'category', 'variety']
      });
    }

    // Generate unique Crop Batch ID
    const cropBatchId = generateCropBatchId(category, variety);

    await connection.beginTransaction();

    // Insert crop batch record
    const [batchResult] = await connection.execute(
      `INSERT INTO crop_batches 
       (crop_batch_id, producer_id, category, variety, farm_location, 
        planting_date, estimated_harvest_date, initial_quantity, quantity_unit,
        current_stage, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'planting', 'active', NOW(), NOW())`,
      [
        cropBatchId,
        producerId,
        category,
        variety,
        JSON.stringify(farmLocation || {}),
        initialData?.plantingDate || null,
        initialData?.estimatedHarvest || null,
        initialData?.quantity || null,
        initialData?.unit || 'kg'
      ]
    );

    // Add initial history entry
    await connection.execute(
      `INSERT INTO crop_batch_history 
       (crop_batch_id, stage, event_type, description, data, timestamp, created_by)
       VALUES (?, 'planting', 'crop_batch_created', ?, ?, NOW(), ?)`,
      [
        cropBatchId,
        `Crop batch created for ${variety} (${category})`,
        JSON.stringify({
          category,
          variety,
          farmLocation,
          initialData
        }),
        producerId
      ]
    );

    // Log activity
    await connection.execute(
      `INSERT INTO activities 
       (user_id, user_type, activity_type, description, metadata, created_at)
       VALUES (?, 'producer', 'crop_batch_created', ?, ?, NOW())`,
      [
        producerId,
        `Created crop batch ${cropBatchId} for ${variety}`,
        JSON.stringify({
          cropBatchId,
          category,
          variety
        })
      ]
    );

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Crop batch created successfully',
      data: {
        cropBatchId,
        category,
        variety,
        status: 'active',
        currentStage: 'planting',
        createdAt: new Date().toISOString()
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Crop batch creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create crop batch',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

/**
 * POST /api/provenance/crop-batch/:id/history
 * Add history entry to crop batch (growing, harvesting, grading, etc.)
 * 
 * Body:
 * {
 *   stage: 'growing' | 'harvesting' | 'grading' | 'processing' | 'packing',
 *   eventType: string,
 *   description: string,
 *   data: object (stage-specific data),
 *   createdBy: string (producer ID)
 * }
 */
router.post('/crop-batch/:id/history', authenticateToken, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { id } = req.params;
    const { stage, eventType, description, data, createdBy } = req.body;

    // Validate crop batch exists
    const [batchRows] = await connection.execute(
      `SELECT * FROM crop_batches WHERE crop_batch_id = ?`,
      [id]
    );

    if (batchRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Crop batch not found'
      });
    }

    await connection.beginTransaction();

    // Insert history entry
    const [historyResult] = await connection.execute(
      `INSERT INTO crop_batch_history 
       (crop_batch_id, stage, event_type, description, data, timestamp, created_by)
       VALUES (?, ?, ?, ?, ?, NOW(), ?)`,
      [
        id,
        stage,
        eventType,
        description,
        JSON.stringify(data || {}),
        createdBy
      ]
    );

    // Update crop batch current stage
    await connection.execute(
      `UPDATE crop_batches 
       SET current_stage = ?, updated_at = NOW() 
       WHERE crop_batch_id = ?`,
      [stage, id]
    );

    // If this is a grading entry, update quality grade
    if (stage === 'grading' && data?.grade) {
      await connection.execute(
        `UPDATE crop_batches 
         SET quality_grade = ? 
         WHERE crop_batch_id = ?`,
        [data.grade, id]
      );
    }

    // If this is a harvesting entry, update harvest date
    if (stage === 'harvesting' && data?.harvestDate) {
      await connection.execute(
        `UPDATE crop_batches 
         SET actual_harvest_date = ? 
         WHERE crop_batch_id = ?`,
        [data.harvestDate, id]
      );
    }

    await connection.commit();

    // Fetch updated history
    const [historyRows] = await connection.execute(
      `SELECT * FROM crop_batch_history 
       WHERE crop_batch_id = ? 
       ORDER BY timestamp ASC`,
      [id]
    );

    res.json({
      success: true,
      message: 'History entry added successfully',
      data: {
        historyId: historyResult.insertId,
        cropBatchId: id,
        stage,
        eventType,
        timestamp: new Date().toISOString(),
        totalHistoryEntries: historyRows.length
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('History entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add history entry',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

/**
 * GET /api/provenance/crop-batch/:id
 * Get crop batch details and full history
 */
router.get('/crop-batch/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Get crop batch details
    const [batchRows] = await pool.execute(
      `SELECT cb.*, 
              p.name as producer_name,
              p.contact_phone as producer_contact,
              p.location as producer_location
       FROM crop_batches cb
       LEFT JOIN producers p ON cb.producer_id = p.producer_id
       WHERE cb.crop_batch_id = ?`,
      [id]
    );

    if (batchRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Crop batch not found'
      });
    }

    const cropBatch = batchRows[0];

    // Get full history
    const [historyRows] = await pool.execute(
      `SELECT * FROM crop_batch_history 
       WHERE crop_batch_id = ? 
       ORDER BY timestamp ASC`,
      [id]
    );

    // Get associated token (if tokenized)
    const [tokenRows] = await pool.execute(
      `SELECT * FROM crop_batch_tokens 
       WHERE crop_batch_id = ? 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [id]
    );

    res.json({
      success: true,
      data: {
        cropBatchId: cropBatch.crop_batch_id,
        category: cropBatch.category,
        variety: cropBatch.variety,
        farmLocation: JSON.parse(cropBatch.farm_location || '{}'),
        plantingDate: cropBatch.planting_date,
        estimatedHarvestDate: cropBatch.estimated_harvest_date,
        actualHarvestDate: cropBatch.actual_harvest_date,
        quantity: cropBatch.initial_quantity,
        unit: cropBatch.quantity_unit,
        qualityGrade: cropBatch.quality_grade,
        currentStage: cropBatch.current_stage,
        status: cropBatch.status,
        producer: {
          name: cropBatch.producer_name,
          contact: cropBatch.producer_contact,
          location: JSON.parse(cropBatch.producer_location || '{}')
        },
        history: historyRows.map(h => ({
          id: h.history_id,
          stage: h.stage,
          eventType: h.event_type,
          description: h.description,
          data: JSON.parse(h.data || '{}'),
          timestamp: h.timestamp,
          createdBy: h.created_by
        })),
        token: tokenRows[0] ? {
          tokenId: tokenRows[0].token_id,
          qrCodeUrl: tokenRows[0].qr_code_url,
          createdAt: tokenRows[0].created_at
        } : null,
        createdAt: cropBatch.created_at,
        updatedAt: cropBatch.updated_at
      }
    });

  } catch (error) {
    console.error('Crop batch retrieval error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve crop batch',
      error: error.message
    });
  }
});

/**
 * GET /api/provenance/crop-batch/producer/:producerId
 * Get all crop batches for a producer
 */
router.get('/crop-batch/producer/:producerId', authenticateToken, async (req, res) => {
  try {
    const { producerId } = req.params;
    const { 
      limit = 20, 
      offset = 0, 
      category, 
      stage, 
      status = 'active' 
    } = req.query;

    let query = `
      SELECT cb.*,
             (SELECT COUNT(*) FROM crop_batch_history WHERE crop_batch_id = cb.crop_batch_id) as history_count,
             (SELECT token_id FROM crop_batch_tokens WHERE crop_batch_id = cb.crop_batch_id ORDER BY created_at DESC LIMIT 1) as token_id
      FROM crop_batches cb
      WHERE cb.producer_id = ? AND cb.status = ?
    `;
    const params = [producerId, status];

    if (category) {
      query += ` AND cb.category = ?`;
      params.push(category);
    }

    if (stage) {
      query += ` AND cb.current_stage = ?`;
      params.push(stage);
    }

    query += ` ORDER BY cb.created_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.execute(query, params);

    res.json({
      success: true,
      data: rows.map(batch => ({
        ...batch,
        farm_location: JSON.parse(batch.farm_location || '{}')
      })),
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: rows.length
      }
    });

  } catch (error) {
    console.error('Producer crop batches retrieval error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve crop batches',
      error: error.message
    });
  }
});

// ============================================================================
// TOKENIZATION ENDPOINTS (NFT/QR)
// ============================================================================

/**
 * POST /api/provenance/tokenize/:cropBatchId
 * Tokenize crop batch to generate NFT Token ID and QR code
 * 
 * Body:
 * {
 *   tokenMetadata: {
 *     certifications: array,
 *     qualityReport: object,
 *     packingDetails: object
 *   }
 * }
 */
router.post('/tokenize/:cropBatchId', authenticateToken, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { cropBatchId } = req.params;
    const { tokenMetadata } = req.body;

    // Validate crop batch exists
    const [batchRows] = await connection.execute(
      `SELECT * FROM crop_batches WHERE crop_batch_id = ?`,
      [cropBatchId]
    );

    if (batchRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Crop batch not found'
      });
    }

    const cropBatch = batchRows[0];

    await connection.beginTransaction();

    // Generate unique Token ID
    const tokenId = generateTokenId();

    // Create JWT payload with crop batch and token info
    const jwtPayload = {
      tokenId,
      cropBatchId,
      category: cropBatch.category,
      variety: cropBatch.variety,
      producerId: cropBatch.producer_id
    };

    // Sign JWT token (expires in 30 days like MongoDB example)
    const signedJWT = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '30d' });

    // Generate QR code with signed JWT for validation
    // Option 1: Use JWT directly in QR (like MongoDB example)
    const qrDataJWT = `${process.env.APP_URL || 'https://tradie.app'}/api/provenance/validate/${signedJWT}`;
    
    // Option 2: Use simple token ID in QR (original approach)
    const qrDataSimple = `${process.env.APP_URL || 'https://tradie.app'}/verify/${tokenId}`;
    
    // Use JWT-based QR for enhanced security
    const qrData = qrDataJWT;
    const qrCodeDataUrl = await generateQRCodeDataUrl(qrData);

    // Insert token record
    const [tokenResult] = await connection.execute(
      `INSERT INTO crop_batch_tokens 
       (token_id, crop_batch_id, producer_id, category, variety, 
        quality_grade, qr_code_url, qr_code_data, metadata, 
        status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW())`,
      [
        tokenId,
        cropBatchId,
        cropBatch.producer_id,
        cropBatch.category,
        cropBatch.variety,
        cropBatch.quality_grade || 'A',
        qrData,
        qrCodeDataUrl,
        JSON.stringify(tokenMetadata || {})
      ]
    );

    // Add tokenization history entry
    await connection.execute(
      `INSERT INTO crop_batch_history 
       (crop_batch_id, stage, event_type, description, data, timestamp, created_by)
       VALUES (?, 'packing', 'tokenized', ?, ?, NOW(), ?)`,
      [
        cropBatchId,
        `Crop batch tokenized with NFT ID: ${tokenId}`,
        JSON.stringify({
          tokenId,
          qrCodeUrl: qrData,
          metadata: tokenMetadata
        }),
        cropBatch.producer_id
      ]
    );

    // Update crop batch status
    await connection.execute(
      `UPDATE crop_batches 
       SET current_stage = 'tokenized', updated_at = NOW() 
       WHERE crop_batch_id = ?`,
      [cropBatchId]
    );

    // Log activity
    await connection.execute(
      `INSERT INTO activities 
       (user_id, user_type, activity_type, description, metadata, created_at)
       VALUES (?, 'producer', 'crop_tokenized', ?, ?, NOW())`,
      [
        cropBatch.producer_id,
        `Tokenized crop batch ${cropBatchId}`,
        JSON.stringify({
          cropBatchId,
          tokenId,
          category: cropBatch.category,
          variety: cropBatch.variety
        })
      ]
    );

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Crop batch tokenized successfully',
      data: {
        tokenId,
        cropBatchId,
        qrCodeUrl: qrData,
        qrCodeDataUrl,
        category: cropBatch.category,
        variety: cropBatch.variety,
        qualityGrade: cropBatch.quality_grade,
        status: 'active',
        createdAt: new Date().toISOString()
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Tokenization error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to tokenize crop batch',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

/**
 * GET /api/provenance/validate/:jwtToken
 * Validate JWT token and fetch crop batch info (like MongoDB example)
 * Public endpoint - no authentication required
 * This endpoint validates the signed JWT from QR code
 */
router.get('/validate/:jwtToken', async (req, res) => {
  try {
    const { jwtToken } = req.params;

    // Verify and decode JWT
    let decoded;
    try {
      decoded = jwt.verify(jwtToken, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
        error: err.message
      });
    }

    // Extract crop batch ID and token ID from JWT
    const { cropBatchId, tokenId } = decoded;

    // Validate that the token exists in database
    const [tokenRows] = await pool.execute(
      `SELECT t.*,
              cb.category,
              cb.variety,
              cb.farm_location,
              cb.planting_date,
              cb.actual_harvest_date,
              cb.initial_quantity,
              cb.quantity_unit,
              cb.quality_grade,
              cb.current_stage,
              cb.status as batch_status,
              p.name as producer_name,
              p.contact_phone as producer_contact,
              p.location as producer_location
       FROM crop_batch_tokens t
       LEFT JOIN crop_batches cb ON t.crop_batch_id = cb.crop_batch_id
       LEFT JOIN producers p ON t.producer_id = p.producer_id
       WHERE t.token_id = ? AND t.crop_batch_id = ?`,
      [tokenId, cropBatchId]
    );

    if (tokenRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Crop batch or token not found'
      });
    }

    const token = tokenRows[0];

    // Get complete crop batch history
    const [historyRows] = await pool.execute(
      `SELECT * FROM crop_batch_history 
       WHERE crop_batch_id = ? 
       ORDER BY timestamp ASC`,
      [cropBatchId]
    );

    // Return crop batch data with history (similar to MongoDB response)
    res.json({
      success: true,
      data: {
        cropBatchId: token.crop_batch_id,
        category: token.category,
        variety: token.variety,
        farmLocation: JSON.parse(token.farm_location || '{}'),
        plantingDate: token.planting_date,
        actualHarvestDate: token.actual_harvest_date,
        quantity: token.initial_quantity,
        unit: token.quantity_unit,
        qualityGrade: token.quality_grade,
        currentStage: token.current_stage,
        status: token.batch_status,
        tokenId: token.token_id,
        tokenCreatedAt: token.created_at,
        producer: {
          name: token.producer_name,
          contact: token.producer_contact,
          location: JSON.parse(token.producer_location || '{}')
        },
        history: historyRows.map(h => ({
          timestamp: h.timestamp,
          stage: h.stage,
          eventType: h.event_type,
          description: h.description,
          data: JSON.parse(h.data || '{}')
        }))
      }
    });

  } catch (error) {
    console.error('JWT validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate token',
      error: error.message
    });
  }
});

/**
 * GET /api/provenance/token/:tokenId
 * Get full crop batch history and token info by Token ID (QR scan endpoint)
 * Public endpoint - no authentication required for verification
 */
router.get('/token/:tokenId', async (req, res) => {
  try {
    const { tokenId } = req.params;

    // Get token details
    const [tokenRows] = await pool.execute(
      `SELECT t.*,
              cb.category,
              cb.variety,
              cb.farm_location,
              cb.planting_date,
              cb.estimated_harvest_date,
              cb.actual_harvest_date,
              cb.initial_quantity,
              cb.quantity_unit,
              cb.quality_grade,
              cb.current_stage,
              cb.status as batch_status,
              p.name as producer_name,
              p.contact_phone as producer_contact,
              p.contact_email as producer_email,
              p.location as producer_location,
              p.farm_size,
              p.certifications as producer_certifications
       FROM crop_batch_tokens t
       LEFT JOIN crop_batches cb ON t.crop_batch_id = cb.crop_batch_id
       LEFT JOIN producers p ON t.producer_id = p.producer_id
       WHERE t.token_id = ?`,
      [tokenId]
    );

    if (tokenRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Token not found'
      });
    }

    const token = tokenRows[0];

    // Get complete crop batch history
    const [historyRows] = await pool.execute(
      `SELECT * FROM crop_batch_history 
       WHERE crop_batch_id = ? 
       ORDER BY timestamp ASC`,
      [token.crop_batch_id]
    );

    // Build timeline for visualization
    const timeline = historyRows.map(h => ({
      id: h.history_id,
      stage: h.stage,
      eventType: h.event_type,
      description: h.description,
      data: JSON.parse(h.data || '{}'),
      timestamp: h.timestamp
    }));

    res.json({
      success: true,
      data: {
        // Token Information
        tokenId: token.token_id,
        tokenStatus: token.status,
        tokenCreatedAt: token.created_at,
        qrCodeUrl: token.qr_code_url,
        
        // Crop Batch Information
        cropBatchId: token.crop_batch_id,
        category: token.category,
        variety: token.variety,
        qualityGrade: token.quality_grade,
        currentStage: token.current_stage,
        status: token.batch_status,
        
        // Cultivation Details
        farmLocation: JSON.parse(token.farm_location || '{}'),
        plantingDate: token.planting_date,
        estimatedHarvestDate: token.estimated_harvest_date,
        actualHarvestDate: token.actual_harvest_date,
        quantity: token.initial_quantity,
        unit: token.quantity_unit,
        
        // Producer Information
        producer: {
          name: token.producer_name,
          contact: token.producer_contact,
          email: token.producer_email,
          location: JSON.parse(token.producer_location || '{}'),
          farmSize: token.farm_size,
          certifications: JSON.parse(token.producer_certifications || '[]')
        },
        
        // Token Metadata
        metadata: JSON.parse(token.metadata || '{}'),
        
        // Complete History Timeline
        timeline,
        
        // Summary Statistics
        stats: {
          totalEvents: timeline.length,
          stages: [...new Set(timeline.map(t => t.stage))],
          daysFromPlantingToHarvest: token.planting_date && token.actual_harvest_date
            ? Math.ceil((new Date(token.actual_harvest_date) - new Date(token.planting_date)) / (1000 * 60 * 60 * 24))
            : null
        }
      }
    });

  } catch (error) {
    console.error('Token retrieval error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve token data',
      error: error.message
    });
  }
});

/**
 * PUT /api/provenance/token/:tokenId/verify
 * Add verification record when token is scanned
 */
router.put('/token/:tokenId/verify', async (req, res) => {
  try {
    const { tokenId } = req.params;
    const { verifiedBy, verificationType, location } = req.body;

    await pool.execute(
      `INSERT INTO token_verifications 
       (token_id, verified_by, verification_type, location, verified_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [
        tokenId,
        verifiedBy || 'anonymous',
        verificationType || 'qr_scan',
        JSON.stringify(location || {})
      ]
    );

    // Update token scan count
    await pool.execute(
      `UPDATE crop_batch_tokens 
       SET scan_count = scan_count + 1, last_scanned_at = NOW() 
       WHERE token_id = ?`,
      [tokenId]
    );

    res.json({
      success: true,
      message: 'Token verification recorded',
      data: {
        tokenId,
        verifiedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record verification',
      error: error.message
    });
  }
});

/**
 * GET /api/provenance/token/:tokenId/verifications
 * Get verification history for a token
 */
router.get('/token/:tokenId/verifications', async (req, res) => {
  try {
    const { tokenId } = req.params;

    const [rows] = await pool.execute(
      `SELECT * FROM token_verifications 
       WHERE token_id = ? 
       ORDER BY verified_at DESC`,
      [tokenId]
    );

    res.json({
      success: true,
      data: rows.map(v => ({
        ...v,
        location: JSON.parse(v.location || '{}')
      }))
    });

  } catch (error) {
    console.error('Verification history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve verification history',
      error: error.message
    });
  }
});

// ============================================================================
// STATISTICS & ANALYTICS
// ============================================================================

/**
 * GET /api/provenance/stats/:producerId
 * Get provenance statistics for a producer
 */
router.get('/stats/:producerId', authenticateToken, async (req, res) => {
  try {
    const { producerId } = req.params;

    // Total crop batches
    const [totalBatches] = await pool.execute(
      `SELECT COUNT(*) as total FROM crop_batches WHERE producer_id = ?`,
      [producerId]
    );

    // Tokenized batches
    const [tokenizedBatches] = await pool.execute(
      `SELECT COUNT(DISTINCT crop_batch_id) as total 
       FROM crop_batch_tokens 
       WHERE producer_id = ?`,
      [producerId]
    );

    // By category
    const [byCategory] = await pool.execute(
      `SELECT category, COUNT(*) as count 
       FROM crop_batches 
       WHERE producer_id = ? 
       GROUP BY category`,
      [producerId]
    );

    // By stage
    const [byStage] = await pool.execute(
      `SELECT current_stage, COUNT(*) as count 
       FROM crop_batches 
       WHERE producer_id = ? AND status = 'active'
       GROUP BY current_stage`,
      [producerId]
    );

    // Total scans
    const [totalScans] = await pool.execute(
      `SELECT SUM(scan_count) as total 
       FROM crop_batch_tokens 
       WHERE producer_id = ?`,
      [producerId]
    );

    res.json({
      success: true,
      data: {
        totalBatches: totalBatches[0].total,
        tokenizedBatches: tokenizedBatches[0].total,
        totalScans: totalScans[0].total || 0,
        byCategory: byCategory.reduce((acc, row) => {
          acc[row.category] = row.count;
          return acc;
        }, {}),
        byStage: byStage.reduce((acc, row) => {
          acc[row.current_stage] = row.count;
          return acc;
        }, {})
      }
    });

  } catch (error) {
    console.error('Statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve statistics',
      error: error.message
    });
  }
});

module.exports = router;
