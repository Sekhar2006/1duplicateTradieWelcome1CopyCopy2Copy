// ============================================================================
// TRADIE Producer API Server
// File: api/server.js
// ============================================================================

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// ============================================================================
// Middleware
// ============================================================================

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('dev'));

// Static files (for uploaded media)
app.use('/uploads', express.static('uploads'));

// ============================================================================
// Routes
// ============================================================================

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/producers', require('./routes/producers'));
app.use('/api/crops', require('./routes/crops'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/evidence', require('./routes/evidence'));
app.use('/api/storage', require('./routes/storage'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/schedule', require('./routes/schedule'));
app.use('/api/varieties', require('./routes/varieties'));

// Quality Check & Tokenization routes
app.use('/api/quality-check', require('./routes/quality-check'));

// Crop Batch Provenance & NFT Tokenization routes
app.use('/api/provenance', require('./routes/provenance'));

// Services & Resources Hub routes
app.use('/api', require('./routes/service-providers'));

// ============================================================================
// Error Handling
// ============================================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // MySQL errors
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ error: 'Duplicate entry' });
  }
  
  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({ error: 'Invalid reference' });
  }
  
  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// ============================================================================
// Server Startup
// ============================================================================

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  TRADIE Producer API Server            ║
║  Status: ✅ Running                    ║
║  Port: ${PORT}                           ║
║  Environment: ${process.env.NODE_ENV || 'development'}              ║
╚════════════════════════════════════════╝

📡 API Base URL: http://localhost:${PORT}/api
📋 Health Check: http://localhost:${PORT}/health
📁 Uploads: http://localhost:${PORT}/uploads

Available Routes:
- POST   /api/auth/register
- POST   /api/auth/login
- GET    /api/producers/:id
- POST   /api/crops
- GET    /api/crops/:id/activities
- POST   /api/activities
- GET    /api/storage
- GET    /api/alerts

Quality Check & Tokenization:
- POST   /api/quality-check
- GET    /api/quality-check/:id
- GET    /api/quality-check/token/:tokenId
- GET    /api/quality-check/producer/:producerId
- POST   /api/quality-check/:id/feedback
- PUT    /api/quality-check/:id
- DELETE /api/quality-check/:id

Crop Batch Provenance & NFT:
- POST   /api/provenance/crop-batch
- POST   /api/provenance/crop-batch/:id/history
- GET    /api/provenance/crop-batch/:id
- GET    /api/provenance/crop-batch/producer/:producerId
- POST   /api/provenance/tokenize/:cropBatchId (JWT-signed QR)
- GET    /api/provenance/validate/:jwtToken (Public - JWT QR Scan)
- GET    /api/provenance/token/:tokenId (Public - Simple QR Scan)
- PUT    /api/provenance/token/:tokenId/verify
- GET    /api/provenance/token/:tokenId/verifications
- GET    /api/provenance/stats/:producerId

Services & Resources Hub:
- GET    /api/providers
- POST   /api/providers
- GET    /api/providers/:id
- GET    /api/equipment
- POST   /api/equipment
- GET    /api/labor
- POST   /api/labor
- GET    /api/seller-products
- POST   /api/seller-products
- GET    /api/worker-support
- POST   /api/worker-support
- POST   /api/service-requests
- GET    /api/service-requests
- GET    /api/seasonal-alerts

Press CTRL+C to stop
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, shutting down gracefully...');
  process.exit(0);
});

module.exports = app;
