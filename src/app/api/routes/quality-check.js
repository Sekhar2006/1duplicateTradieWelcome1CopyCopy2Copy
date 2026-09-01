/**
 * Quality Check API Routes
 * Handles quality verification, grading, tokenization, and QR scanning
 */

const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const { authenticateToken } = require('../middleware/auth');

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

/**
 * POST /api/quality-check
 * Submit a new quality check record
 */
router.post('/', authenticateToken, async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const {
      producerId,
      commodity,
      grading,
      harvestMethod,
      processingDone,
      qualityCheckTiers,
      salesListing,
      packingDetails
    } = req.body;

    // Validate required fields
    if (!producerId || !commodity || !grading || !packingDetails) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        required: ['producerId', 'commodity', 'grading', 'packingDetails']
      });
    }

    await connection.beginTransaction();

    // 1. Insert quality check record
    const [qualityCheckResult] = await connection.execute(
      `INSERT INTO quality_checks 
       (producer_id, commodity_type, grading_criteria, harvest_method, 
        processing_done, self_assessment, external_assessment_type, 
        external_rating, external_comments, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        producerId,
        commodity,
        JSON.stringify(grading),
        JSON.stringify(harvestMethod || []),
        processingDone || false,
        qualityCheckTiers?.selfAssessment || false,
        qualityCheckTiers?.externalAssessment?.type || null,
        qualityCheckTiers?.externalAssessment?.rating || null,
        qualityCheckTiers?.externalAssessment?.comments || null
      ]
    );

    const qualityCheckId = qualityCheckResult.insertId;

    // 2. Handle external verification document
    if (qualityCheckTiers?.externalAssessment?.documentUrl) {
      await connection.execute(
        `INSERT INTO certifications 
         (producer_id, quality_check_id, certification_type, issuer, 
          document_url, issue_date, status, created_at)
         VALUES (?, ?, ?, ?, ?, NOW(), 'verified', NOW())`,
        [
          producerId,
          qualityCheckId,
          qualityCheckTiers.externalAssessment.type,
          'External Verifier',
          qualityCheckTiers.externalAssessment.documentUrl
        ]
      );
    }

    // 3. Insert sales listing information
    if (salesListing) {
      await connection.execute(
        `INSERT INTO sales_listings 
         (producer_id, quality_check_id, sale_type, agent_rating, 
          quality_specification, created_at)
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [
          producerId,
          qualityCheckId,
          salesListing.saleType || 'Direct',
          salesListing.agentRating || null,
          salesListing.qualitySpecification || null
        ]
      );
    }

    // 4. Generate and insert token
    const tokenId = packingDetails.tokenId || generateTokenId(commodity);
    
    await connection.execute(
      `INSERT INTO tokens 
       (token_id, producer_id, quality_check_id, commodity_type, 
        variety_name, quality_grade, number_of_bags, harvest_date, 
        processing_date, packing_date, qr_code_url, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW())`,
      [
        tokenId,
        producerId,
        qualityCheckId,
        commodity,
        packingDetails.variety || commodity,
        grading.grade || 'A',
        packingDetails.numberOfBags || 0,
        packingDetails.harvestDate || null,
        packingDetails.processingDate || null,
        packingDetails.packingDate || null,
        `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${tokenId}`
      ]
    );

    // 5. Log activity
    await connection.execute(
      `INSERT INTO activities 
       (user_id, user_type, activity_type, description, metadata, created_at)
       VALUES (?, 'producer', 'quality_check', ?, ?, NOW())`,
      [
        producerId,
        `Quality check completed for ${commodity}`,
        JSON.stringify({
          qualityCheckId,
          tokenId,
          commodity,
          grade: grading.grade
        })
      ]
    );

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Quality check submitted successfully',
      data: {
        qualityCheckId,
        tokenId,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${tokenId}`,
        commodity,
        grade: grading.grade,
        status: 'active'
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Quality check submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quality check',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

/**
 * GET /api/quality-check/:id
 * Retrieve quality check details by ID
 */
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute(
      `SELECT qc.*, 
              p.farmer_name as producer_name,
              p.contact_number,
              p.district,
              p.state
       FROM quality_checks qc
       LEFT JOIN producers p ON qc.producer_id = p.producer_id
       WHERE qc.quality_check_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quality check not found'
      });
    }

    const qualityCheck = rows[0];

    // Get associated certifications
    const [certifications] = await pool.execute(
      `SELECT * FROM certifications WHERE quality_check_id = ?`,
      [id]
    );

    // Get associated token
    const [tokens] = await pool.execute(
      `SELECT * FROM tokens WHERE quality_check_id = ?`,
      [id]
    );

    res.json({
      success: true,
      data: {
        ...qualityCheck,
        grading_criteria: JSON.parse(qualityCheck.grading_criteria || '{}'),
        harvest_method: JSON.parse(qualityCheck.harvest_method || '[]'),
        certifications,
        token: tokens[0] || null
      }
    });

  } catch (error) {
    console.error('Quality check retrieval error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve quality check',
      error: error.message
    });
  }
});

/**
 * GET /api/quality-check/token/:tokenId
 * Retrieve quality check details by token ID (QR scan)
 */
router.get('/token/:tokenId', async (req, res) => {
  try {
    const { tokenId } = req.params;

    const [tokenRows] = await pool.execute(
      `SELECT t.*, 
              qc.grading_criteria,
              qc.harvest_method,
              qc.processing_done,
              qc.self_assessment,
              qc.external_assessment_type,
              qc.external_rating,
              qc.external_comments,
              p.farmer_name as producer_name,
              p.contact_number,
              p.district,
              p.state
       FROM tokens t
       LEFT JOIN quality_checks qc ON t.quality_check_id = qc.quality_check_id
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

    const tokenData = tokenRows[0];

    // Get certifications
    const [certifications] = await pool.execute(
      `SELECT * FROM certifications WHERE quality_check_id = ?`,
      [tokenData.quality_check_id]
    );

    // Get sales listing
    const [salesListing] = await pool.execute(
      `SELECT * FROM sales_listings WHERE quality_check_id = ?`,
      [tokenData.quality_check_id]
    );

    // Get feedback
    const [feedback] = await pool.execute(
      `SELECT * FROM feedback WHERE quality_check_id = ? ORDER BY created_at DESC`,
      [tokenData.quality_check_id]
    );

    res.json({
      success: true,
      data: {
        tokenId: tokenData.token_id,
        commodityType: tokenData.commodity_type,
        varietyName: tokenData.variety_name,
        qualityGrade: tokenData.quality_grade,
        numberOfBags: tokenData.number_of_bags,
        harvestDate: tokenData.harvest_date,
        processingDate: tokenData.processing_date,
        packingDate: tokenData.packing_date,
        producerName: tokenData.producer_name,
        producerLocation: `${tokenData.district}, ${tokenData.state}`,
        producerContact: tokenData.contact_number,
        grading: JSON.parse(tokenData.grading_criteria || '{}'),
        harvestMethod: JSON.parse(tokenData.harvest_method || '[]'),
        processingDone: tokenData.processing_done,
        qualityTier: {
          selfAssessment: tokenData.self_assessment,
          externalAssessment: tokenData.external_assessment_type,
          rating: tokenData.external_rating,
          comments: tokenData.external_comments
        },
        certifications: certifications.map(cert => ({
          type: cert.certification_type,
          issuer: cert.issuer,
          documentUrl: cert.document_url,
          issueDate: cert.issue_date,
          status: cert.status
        })),
        salesListing: salesListing[0] || null,
        feedback: feedback.map(fb => ({
          stage: fb.feedback_stage,
          rating: fb.rating,
          comment: fb.comment,
          source: fb.feedback_source,
          date: fb.created_at
        })),
        qrCodeUrl: tokenData.qr_code_url,
        status: tokenData.status
      }
    });

  } catch (error) {
    console.error('Token scan error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve token data',
      error: error.message
    });
  }
});

/**
 * GET /api/quality-check/producer/:producerId
 * Get all quality checks for a producer
 */
router.get('/producer/:producerId', authenticateToken, async (req, res) => {
  try {
    const { producerId } = req.params;
    const { limit = 10, offset = 0, commodity } = req.query;

    let query = `
      SELECT qc.*, 
             t.token_id,
             t.quality_grade,
             t.number_of_bags
      FROM quality_checks qc
      LEFT JOIN tokens t ON qc.quality_check_id = t.quality_check_id
      WHERE qc.producer_id = ?
    `;
    const params = [producerId];

    if (commodity) {
      query += ` AND qc.commodity_type = ?`;
      params.push(commodity);
    }

    query += ` ORDER BY qc.created_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.execute(query, params);

    res.json({
      success: true,
      data: rows.map(row => ({
        ...row,
        grading_criteria: JSON.parse(row.grading_criteria || '{}'),
        harvest_method: JSON.parse(row.harvest_method || '[]')
      })),
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });

  } catch (error) {
    console.error('Producer quality checks retrieval error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve quality checks',
      error: error.message
    });
  }
});

/**
 * POST /api/quality-check/:id/feedback
 * Add feedback to a quality check
 */
router.post('/:id/feedback', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { stage, rating, comment, source } = req.body;

    if (!stage || !rating || !source) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: stage, rating, source'
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO feedback 
       (quality_check_id, feedback_stage, rating, comment, feedback_source, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [id, stage, rating, comment || '', source]
    );

    res.status(201).json({
      success: true,
      message: 'Feedback added successfully',
      data: {
        feedbackId: result.insertId,
        qualityCheckId: id,
        stage,
        rating,
        comment,
        source
      }
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: error.message
    });
  }
});

/**
 * PUT /api/quality-check/:id
 * Update quality check record
 */
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      grading,
      processingDone,
      qualityCheckTiers,
      salesListing
    } = req.body;

    const updates = [];
    const params = [];

    if (grading) {
      updates.push('grading_criteria = ?');
      params.push(JSON.stringify(grading));
    }

    if (processingDone !== undefined) {
      updates.push('processing_done = ?');
      params.push(processingDone);
    }

    if (qualityCheckTiers) {
      if (qualityCheckTiers.selfAssessment !== undefined) {
        updates.push('self_assessment = ?');
        params.push(qualityCheckTiers.selfAssessment);
      }
      if (qualityCheckTiers.externalAssessment) {
        updates.push('external_assessment_type = ?');
        updates.push('external_rating = ?');
        updates.push('external_comments = ?');
        params.push(
          qualityCheckTiers.externalAssessment.type,
          qualityCheckTiers.externalAssessment.rating,
          qualityCheckTiers.externalAssessment.comments
        );
      }
    }

    updates.push('updated_at = NOW()');
    params.push(id);

    if (updates.length === 1) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    await pool.execute(
      `UPDATE quality_checks SET ${updates.join(', ')} WHERE quality_check_id = ?`,
      params
    );

    res.json({
      success: true,
      message: 'Quality check updated successfully',
      data: { qualityCheckId: id }
    });

  } catch (error) {
    console.error('Quality check update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update quality check',
      error: error.message
    });
  }
});

/**
 * DELETE /api/quality-check/:id
 * Delete quality check (soft delete - set status to inactive)
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete - update token status
    await pool.execute(
      `UPDATE tokens SET status = 'inactive' WHERE quality_check_id = ?`,
      [id]
    );

    res.json({
      success: true,
      message: 'Quality check deactivated successfully',
      data: { qualityCheckId: id }
    });

  } catch (error) {
    console.error('Quality check deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete quality check',
      error: error.message
    });
  }
});

/**
 * Helper function to generate token ID
 */
function generateTokenId(commodity) {
  const prefix = commodity.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TRD-${prefix}-${timestamp}${random}`;
}

module.exports = router;
