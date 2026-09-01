// ============================================================================
// TRADIE Producer API Routes
// File: api/routes/producers.js
// ============================================================================

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const auth = require('../middleware/auth');

// ============================================================================
// GET /api/producers/:producerId - Get Producer Profile
// ============================================================================
router.get('/:producerId', auth, async (req, res) => {
  try {
    const { producerId } = req.params;
    
    // Authorization check
    if (req.user.producerId !== parseInt(producerId)) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    
    const [rows] = await db.query(`
      SELECT 
        p.*,
        u.phone_number,
        u.email,
        COUNT(DISTINCT c.crop_id) as total_crops,
        COUNT(DISTINCT pl.plot_id) as total_plots,
        SUM(c.area) as total_cultivated_area,
        COUNT(DISTINCT a.activity_id) as total_activities,
        SUM(s.quantity) as total_inventory
      FROM producers p
      LEFT JOIN users u ON p.user_id = u.user_id
      LEFT JOIN crops c ON p.producer_id = c.producer_id
      LEFT JOIN plots pl ON p.producer_id = pl.producer_id
      LEFT JOIN activities a ON c.crop_id = a.crop_id
      LEFT JOIN storage s ON p.producer_id = s.producer_id
      WHERE p.producer_id = ?
      GROUP BY p.producer_id
    `, [producerId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Producer not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching producer:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// PUT /api/producers/:producerId - Update Producer Profile
// ============================================================================
router.put('/:producerId', auth, async (req, res) => {
  try {
    const { producerId } = req.params;
    const { name, contact, location, farmSize, preferences } = req.body;
    
    // Authorization check
    if (req.user.producerId !== parseInt(producerId)) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    
    const [result] = await db.query(`
      UPDATE producers
      SET 
        name = COALESCE(?, name),
        contact = COALESCE(?, contact),
        location = COALESCE(?, location),
        farm_size = COALESCE(?, farm_size),
        preferences = COALESCE(?, preferences)
      WHERE producer_id = ?
    `, [name, contact, location, farmSize, preferences, producerId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producer not found' });
    }
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating producer:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// GET /api/producers/:producerId/dashboard - Get Dashboard Data
// ============================================================================
router.get('/:producerId/dashboard', auth, async (req, res) => {
  try {
    const { producerId } = req.params;
    
    // Authorization check
    if (req.user.producerId !== parseInt(producerId)) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    
    // Get statistics
    const [stats] = await db.query(`
      SELECT 
        (SELECT COUNT(*) FROM crops WHERE producer_id = ?) as total_crops,
        (SELECT COUNT(*) FROM crops WHERE producer_id = ? AND sowing_date IS NOT NULL) as active_crops,
        (SELECT COUNT(*) FROM activities WHERE crop_id IN (SELECT crop_id FROM crops WHERE producer_id = ?)) as total_activities,
        (SELECT COUNT(*) FROM alerts WHERE crop_id IN (SELECT crop_id FROM crops WHERE producer_id = ?) AND status = 'new') as active_alerts,
        (SELECT COALESCE(SUM(quantity), 0) FROM storage WHERE producer_id = ?) as total_inventory,
        (SELECT COUNT(*) FROM schedule WHERE crop_id IN (SELECT crop_id FROM crops WHERE producer_id = ?) AND status = 'pending') as pending_tasks
    `, [producerId, producerId, producerId, producerId, producerId, producerId]);
    
    // Get recent activities
    const [recentActivities] = await db.query(`
      SELECT 
        a.*,
        c.name as crop_name,
        c.variety as crop_variety
      FROM activities a
      JOIN crops c ON a.crop_id = c.crop_id
      WHERE c.producer_id = ?
      ORDER BY a.date DESC
      LIMIT 10
    `, [producerId]);
    
    // Get upcoming schedule
    const [upcomingSchedule] = await db.query(`
      SELECT 
        s.*,
        c.name as crop_name,
        c.variety as crop_variety
      FROM schedule s
      JOIN crops c ON s.crop_id = c.crop_id
      WHERE c.producer_id = ?
        AND s.status = 'pending'
      ORDER BY s.due_date ASC
      LIMIT 10
    `, [producerId]);
    
    // Get active alerts
    const [alerts] = await db.query(`
      SELECT 
        al.*,
        c.name as crop_name,
        c.variety as crop_variety
      FROM alerts al
      JOIN crops c ON al.crop_id = c.crop_id
      WHERE c.producer_id = ?
        AND al.status = 'new'
      ORDER BY al.timestamp DESC
      LIMIT 10
    `, [producerId]);
    
    res.json({
      stats: stats[0],
      recentActivities,
      upcomingSchedule,
      alerts
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// GET /api/producers/:producerId/plots - Get Producer Plots
// ============================================================================
router.get('/:producerId/plots', auth, async (req, res) => {
  try {
    const { producerId } = req.params;
    
    const [plots] = await db.query(`
      SELECT 
        p.*,
        COUNT(c.crop_id) as crop_count,
        SUM(c.area) as cultivated_area
      FROM plots p
      LEFT JOIN crops c ON p.plot_id = c.plot_id
      WHERE p.producer_id = ?
      GROUP BY p.plot_id
      ORDER BY p.plot_id DESC
    `, [producerId]);
    
    res.json(plots);
  } catch (error) {
    console.error('Error fetching plots:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// POST /api/producers/:producerId/plots - Create New Plot
// ============================================================================
router.post('/:producerId/plots', auth, async (req, res) => {
  try {
    const { producerId } = req.params;
    const { geoLocation, totalArea, cropsGrown } = req.body;
    
    const [result] = await db.query(`
      INSERT INTO plots (producer_id, geo_location, total_area, crops_grown)
      VALUES (?, ?, ?, ?)
    `, [producerId, geoLocation, totalArea, cropsGrown]);
    
    res.status(201).json({
      plotId: result.insertId,
      message: 'Plot created successfully'
    });
  } catch (error) {
    console.error('Error creating plot:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// GET /api/producers/:producerId/crops - Get Producer Crops
// ============================================================================
router.get('/:producerId/crops', auth, async (req, res) => {
  try {
    const { producerId } = req.params;
    
    const [crops] = await db.query(`
      SELECT 
        c.*,
        p.geo_location as plot_location,
        p.total_area as plot_area,
        ic.name as intercrop_name,
        ic.variety as intercrop_variety,
        COUNT(DISTINCT a.activity_id) as activity_count,
        MAX(a.date) as last_activity_date
      FROM crops c
      LEFT JOIN plots p ON c.plot_id = p.plot_id
      LEFT JOIN crops ic ON c.intercrop_id = ic.crop_id
      LEFT JOIN activities a ON c.crop_id = a.crop_id
      WHERE c.producer_id = ?
      GROUP BY c.crop_id
      ORDER BY c.sowing_date DESC, c.crop_id DESC
    `, [producerId]);
    
    res.json(crops);
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// GET /api/producers/:producerId/storage - Get Storage Inventory
// ============================================================================
router.get('/:producerId/storage', auth, async (req, res) => {
  try {
    const { producerId } = req.params;
    
    const [storage] = await db.query(`
      SELECT 
        s.*,
        c.name as crop_name,
        c.variety as crop_variety
      FROM storage s
      LEFT JOIN crops c ON s.crop_id = c.crop_id
      WHERE s.producer_id = ?
      ORDER BY s.entry_date DESC
    `, [producerId]);
    
    res.json(storage);
  } catch (error) {
    console.error('Error fetching storage:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============================================================================
// GET /api/producers/:producerId/alerts - Get Alerts
// ============================================================================
router.get('/:producerId/alerts', auth, async (req, res) => {
  try {
    const { producerId } = req.params;
    const { status } = req.query;
    
    let query = `
      SELECT 
        al.*,
        c.name as crop_name,
        c.variety as crop_variety
      FROM alerts al
      LEFT JOIN crops c ON al.crop_id = c.crop_id
      WHERE c.producer_id = ?
    `;
    
    const params = [producerId];
    
    if (status) {
      query += ` AND al.status = ?`;
      params.push(status);
    }
    
    query += ` ORDER BY al.timestamp DESC`;
    
    const [alerts] = await db.query(query, params);
    
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
