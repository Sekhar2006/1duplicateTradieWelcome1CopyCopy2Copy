// ============================================================================
// TRADIE Crops API Routes
// File: api/routes/crops.js
// ============================================================================

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const auth = require('../middleware/auth');

// ============================================================================
// POST /api/crops - Create New Crop
// ============================================================================
router.post('/', auth, async (req, res) => {
  try {
    const {
      producerId,
      plotId,
      category,
      name,
      variety,
      area,
      sowingDate,
      intercropId
    } = req.body;
    
    // Validate required fields
    if (!producerId || !category || !name || !variety || !area) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const [result] = await db.query(`
      INSERT INTO crops 
      (producer_id, plot_id, category, name, variety, area, sowing_date, intercrop_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [producerId, plotId, category, name, variety, area, sowingDate, intercropId]);
    
    res.status(201).json({
      cropId: result.insertId,
      message: 'Crop created successfully'
    });
  } catch (error) {
    console.error('Error creating crop:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// GET /api/crops/:cropId - Get Single Crop Details
// ============================================================================
router.get('/:cropId', auth, async (req, res) => {
  try {
    const { cropId } = req.params;
    
    const [rows] = await db.query(`
      SELECT 
        c.*,
        p.geo_location as plot_location,
        p.total_area as plot_area,
        ic.name as intercrop_name,
        ic.variety as intercrop_variety,
        ic.area as intercrop_area,
        COUNT(DISTINCT a.activity_id) as activity_count,
        MAX(a.date) as last_activity_date
      FROM crops c
      LEFT JOIN plots p ON c.plot_id = p.plot_id
      LEFT JOIN crops ic ON c.intercrop_id = ic.crop_id
      LEFT JOIN activities a ON c.crop_id = a.crop_id
      WHERE c.crop_id = ?
      GROUP BY c.crop_id
    `, [cropId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Crop not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching crop:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// PUT /api/crops/:cropId - Update Crop
// ============================================================================
router.put('/:cropId', auth, async (req, res) => {
  try {
    const { cropId } = req.params;
    const { category, name, variety, area, sowingDate, intercropId } = req.body;
    
    const [result] = await db.query(`
      UPDATE crops
      SET 
        category = COALESCE(?, category),
        name = COALESCE(?, name),
        variety = COALESCE(?, variety),
        area = COALESCE(?, area),
        sowing_date = COALESCE(?, sowing_date),
        intercrop_id = COALESCE(?, intercrop_id)
      WHERE crop_id = ?
    `, [category, name, variety, area, sowingDate, intercropId, cropId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Crop not found' });
    }
    
    res.json({ message: 'Crop updated successfully' });
  } catch (error) {
    console.error('Error updating crop:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// DELETE /api/crops/:cropId - Delete Crop
// ============================================================================
router.delete('/:cropId', auth, async (req, res) => {
  try {
    const { cropId } = req.params;
    
    const [result] = await db.query(`
      DELETE FROM crops WHERE crop_id = ?
    `, [cropId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Crop not found' });
    }
    
    res.json({ message: 'Crop deleted successfully' });
  } catch (error) {
    console.error('Error deleting crop:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// GET /api/crops/:cropId/activities - Get Crop Activities
// ============================================================================
router.get('/:cropId/activities', auth, async (req, res) => {
  try {
    const { cropId } = req.params;
    
    const [activities] = await db.query(`
      SELECT 
        a.*,
        COUNT(e.evidence_id) as evidence_count
      FROM activities a
      LEFT JOIN evidence e ON a.activity_id = e.activity_id
      WHERE a.crop_id = ?
      GROUP BY a.activity_id
      ORDER BY a.date DESC
    `, [cropId]);
    
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// GET /api/crops/:cropId/schedule - Get Crop Schedule
// ============================================================================
router.get('/:cropId/schedule', auth, async (req, res) => {
  try {
    const { cropId } = req.params;
    const { status } = req.query;
    
    let query = `SELECT * FROM schedule WHERE crop_id = ?`;
    const params = [cropId];
    
    if (status) {
      query += ` AND status = ?`;
      params.push(status);
    }
    
    query += ` ORDER BY due_date ASC`;
    
    const [schedule] = await db.query(query, params);
    
    res.json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// GET /api/crops/:cropId/alerts - Get Crop Alerts
// ============================================================================
router.get('/:cropId/alerts', auth, async (req, res) => {
  try {
    const { cropId } = req.params;
    const { status } = req.query;
    
    let query = `SELECT * FROM alerts WHERE crop_id = ?`;
    const params = [cropId];
    
    if (status) {
      query += ` AND status = ?`;
      params.push(status);
    }
    
    query += ` ORDER BY timestamp DESC`;
    
    const [alerts] = await db.query(query, params);
    
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
