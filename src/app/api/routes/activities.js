// ============================================================================
// TRADIE Activities API Routes
// File: api/routes/activities.js
// ============================================================================

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const auth = require('../middleware/auth');

// ============================================================================
// POST /api/activities - Create New Activity
// ============================================================================
router.post('/', auth, async (req, res) => {
  try {
    const {
      cropId,
      date,
      type,
      method,
      inputUsed,
      remarks
    } = req.body;
    
    // Validate required fields
    if (!cropId || !date || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const [result] = await db.query(`
      INSERT INTO activities 
      (crop_id, date, type, method, input_used, remarks)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [cropId, date, type, method, inputUsed, remarks]);
    
    res.status(201).json({
      activityId: result.insertId,
      message: 'Activity created successfully'
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// GET /api/activities/:activityId - Get Single Activity
// ============================================================================
router.get('/:activityId', auth, async (req, res) => {
  try {
    const { activityId } = req.params;
    
    const [rows] = await db.query(`
      SELECT 
        a.*,
        c.name as crop_name,
        c.variety as crop_variety,
        c.producer_id,
        COUNT(e.evidence_id) as evidence_count
      FROM activities a
      JOIN crops c ON a.crop_id = c.crop_id
      LEFT JOIN evidence e ON a.activity_id = e.activity_id
      WHERE a.activity_id = ?
      GROUP BY a.activity_id
    `, [activityId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// PUT /api/activities/:activityId - Update Activity
// ============================================================================
router.put('/:activityId', auth, async (req, res) => {
  try {
    const { activityId } = req.params;
    const { date, type, method, inputUsed, remarks } = req.body;
    
    const [result] = await db.query(`
      UPDATE activities
      SET 
        date = COALESCE(?, date),
        type = COALESCE(?, type),
        method = COALESCE(?, method),
        input_used = COALESCE(?, input_used),
        remarks = COALESCE(?, remarks)
      WHERE activity_id = ?
    `, [date, type, method, inputUsed, remarks, activityId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    
    res.json({ message: 'Activity updated successfully' });
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// DELETE /api/activities/:activityId - Delete Activity
// ============================================================================
router.delete('/:activityId', auth, async (req, res) => {
  try {
    const { activityId } = req.params;
    
    const [result] = await db.query(`
      DELETE FROM activities WHERE activity_id = ?
    `, [activityId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// GET /api/activities/:activityId/evidence - Get Activity Evidence
// ============================================================================
router.get('/:activityId/evidence', auth, async (req, res) => {
  try {
    const { activityId } = req.params;
    
    const [evidence] = await db.query(`
      SELECT * FROM evidence
      WHERE activity_id = ?
      ORDER BY timestamp DESC
    `, [activityId]);
    
    res.json(evidence);
  } catch (error) {
    console.error('Error fetching evidence:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
