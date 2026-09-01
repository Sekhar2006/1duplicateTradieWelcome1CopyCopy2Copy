/**
 * SIMPLIFIED Quality Check API Server
 * Quick start demo server for testing frontend integration
 * 
 * Usage:
 *   node api/simple-quality-server.js
 * 
 * For production, use the full server.js with all routes
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data store (for demo only - use database in production)
const qualityChecks = {};
const tokens = {};

/**
 * POST /api/quality-check
 * Submit quality check and generate token
 */
app.post('/api/quality-check', (req, res) => {
  try {
    const data = req.body;

    // Basic validation
    if (!data.producerId || !data.commodity) {
      return res.status(400).json({ 
        success: false,
        error: "producerId and commodity are required" 
      });
    }

    // Generate unique token ID
    const tokenId = `TRD-${data.commodity.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`;
    
    // Generate QR code URL (using public QR API)
    const qrData = JSON.stringify({
      tokenId,
      commodity: data.commodity,
      producerId: data.producerId,
      grade: data.grading?.grade || 'N/A',
      timestamp: new Date().toISOString()
    });
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;

    // Create quality check record
    const qualityCheckId = uuidv4();
    const qualityCheck = {
      qualityCheckId,
      ...data,
      tokenId,
      qrCodeUrl,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    // Save to in-memory store
    qualityChecks[qualityCheckId] = qualityCheck;
    tokens[tokenId] = qualityCheck;

    console.log(`✅ Quality check created: ${qualityCheckId}`);
    console.log(`🎫 Token generated: ${tokenId}`);
    console.log(`📊 Commodity: ${data.commodity}`);
    console.log(`⭐ Grade: ${data.grading?.grade || 'N/A'}`);

    // Response
    res.json({
      success: true,
      data: {
        qualityCheckId,
        tokenId,
        qrCodeUrl,
        commodity: data.commodity,
        grade: data.grading?.grade || 'N/A',
        status: 'active',
        message: 'Quality check submitted successfully'
      }
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/quality-check/:tokenId
 * Retrieve quality check by token ID
 */
app.get('/api/quality-check/:tokenId', (req, res) => {
  try {
    const { tokenId } = req.params;
    const qualityCheck = tokens[tokenId];

    if (!qualityCheck) {
      return res.status(404).json({
        success: false,
        error: 'Token not found'
      });
    }

    console.log(`🔍 Token retrieved: ${tokenId}`);

    res.json({
      success: true,
      data: qualityCheck
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/quality-check/producer/:producerId
 * Get all quality checks for a producer
 */
app.get('/api/quality-check/producer/:producerId', (req, res) => {
  try {
    const { producerId } = req.params;
    
    const producerChecks = Object.values(qualityChecks)
      .filter(check => check.producerId === producerId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    console.log(`📋 Retrieved ${producerChecks.length} checks for producer: ${producerId}`);

    res.json({
      success: true,
      data: producerChecks,
      total: producerChecks.length
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * POST /api/quality-check/:tokenId/verify
 * Verify token (QR scan)
 */
app.post('/api/quality-check/:tokenId/verify', (req, res) => {
  try {
    const { tokenId } = req.params;
    const qualityCheck = tokens[tokenId];

    if (!qualityCheck) {
      return res.status(404).json({
        success: false,
        verified: false,
        error: 'Invalid or expired token'
      });
    }

    console.log(`✅ Token verified: ${tokenId}`);

    res.json({
      success: true,
      verified: true,
      data: {
        tokenId,
        commodity: qualityCheck.commodity,
        producerId: qualityCheck.producerId,
        grade: qualityCheck.grading?.grade || 'N/A',
        quality: qualityCheck.qualityCheckTiers,
        packingDetails: qualityCheck.packingDetails,
        createdAt: qualityCheck.createdAt,
        status: qualityCheck.status
      }
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/stats
 * Get summary statistics
 */
app.get('/api/stats', (req, res) => {
  try {
    const totalChecks = Object.keys(qualityChecks).length;
    const activeTokens = Object.values(tokens).filter(t => t.status === 'active').length;
    
    const commodityCounts = {};
    Object.values(qualityChecks).forEach(check => {
      commodityCounts[check.commodity] = (commodityCounts[check.commodity] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        totalQualityChecks: totalChecks,
        activeTokens,
        commodityBreakdown: commodityCounts,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    message: 'Simple Quality Check API is running',
    timestamp: new Date().toISOString(),
    totalRecords: Object.keys(qualityChecks).length
  });
});

/**
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.json({
    message: 'TRADIE Simple Quality Check API',
    version: '1.0.0',
    endpoints: {
      'POST /api/quality-check': 'Submit quality check',
      'GET /api/quality-check/:tokenId': 'Get quality check by token',
      'GET /api/quality-check/producer/:producerId': 'Get producer quality checks',
      'POST /api/quality-check/:tokenId/verify': 'Verify token (QR scan)',
      'GET /api/stats': 'Get statistics',
      'GET /health': 'Health check'
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 TRADIE Simple Quality Check API Server');
  console.log('='.repeat(60));
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API Docs: http://localhost:${PORT}/`);
  console.log('='.repeat(60) + '\n');
  console.log('💡 TIP: For production, use the full server.js with database\n');
});

// Handle shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...');
  console.log(`📊 Total quality checks processed: ${Object.keys(qualityChecks).length}`);
  console.log(`🎫 Total tokens generated: ${Object.keys(tokens).length}`);
  process.exit(0);
});

module.exports = app;
