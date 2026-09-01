/**
 * TRADIE Platform - Service Providers API Routes
 * Version: 2.0 (Enhanced)
 * Date: October 22, 2025
 * 
 * RESTful API endpoints for Services & Resources Hub
 */

const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tradie_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// ================================================================
// MIDDLEWARE
// ================================================================

// Authentication middleware (placeholder - implement your auth logic)
const authenticateUser = (req, res, next) => {
  // TODO: Implement JWT or session-based authentication
  req.userId = req.headers['user-id'] || 1; // Placeholder
  next();
};

// ================================================================
// SERVICE PROVIDERS ENDPOINTS
// ================================================================

/**
 * GET /api/providers
 * List all service providers with filtering
 * 
 * Query Params:
 * - category: equipment-rental, materials, labor, support
 * - providerType: rental, seller, service, consultant
 * - subcategory: JCB, Seeds - Hybrid, etc.
 * - district: District name
 * - state: State name
 * - availability: available, busy, booked
 * - rating: Minimum rating (e.g., 4.5)
 * - verified: true/false
 * - search: Search in name, description, services
 * - limit: Results per page (default: 20)
 * - offset: Pagination offset (default: 0)
 */
router.get('/providers', async (req, res) => {
  try {
    const {
      category,
      providerType,
      subcategory,
      district,
      state,
      availability,
      rating,
      verified,
      search,
      limit = 20,
      offset = 0
    } = req.query;

    let query = `
      SELECT 
        provider_id, name, service_type, provider_type, category, subcategory,
        contact_info, location, district, state, availability, rating, reviews_count,
        verified, description, services, experience_years, certifications,
        pricing, response_time, completion_rate, grok_score, last_active
      FROM service_providers
      WHERE status = 'approved'
    `;

    const params = [];

    // Add filters
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    if (providerType) {
      query += ' AND provider_type = ?';
      params.push(providerType);
    }
    if (subcategory) {
      query += ' AND subcategory = ?';
      params.push(subcategory);
    }
    if (district) {
      query += ' AND district = ?';
      params.push(district);
    }
    if (state) {
      query += ' AND state = ?';
      params.push(state);
    }
    if (availability) {
      query += ' AND availability = ?';
      params.push(availability);
    }
    if (rating) {
      query += ' AND rating >= ?';
      params.push(parseFloat(rating));
    }
    if (verified) {
      query += ' AND verified = ?';
      params.push(verified === 'true');
    }
    if (search) {
      query += ` AND (
        name LIKE ? OR 
        description LIKE ? OR 
        JSON_SEARCH(services, 'one', ?) IS NOT NULL
      )`;
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, `%${search}%`);
    }

    // Order by rating and grok score
    query += ' ORDER BY rating DESC, grok_score DESC';
    
    // Pagination
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [providers] = await pool.execute(query, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM service_providers WHERE status = "approved"';
    const countParams = params.slice(0, -2); // Remove limit and offset
    
    if (params.length > 2) {
      // Rebuild count query with same filters
      const filterQuery = query.split('WHERE status = \'approved\'')[1].split('ORDER BY')[0];
      countQuery += filterQuery;
    }

    const [[{ total }]] = await pool.execute(countQuery, countParams);

    res.json({
      success: true,
      data: providers,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: offset + providers.length < total
      }
    });
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service providers',
      message: error.message
    });
  }
});

/**
 * GET /api/providers/:id
 * Get details of a specific provider
 */
router.get('/providers/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [providers] = await pool.execute(
      'SELECT * FROM service_providers WHERE provider_id = ? AND status = "approved"',
      [id]
    );

    if (providers.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Provider not found'
      });
    }

    // Get additional details based on provider type
    const provider = providers[0];
    let additionalDetails = null;

    if (provider.provider_type === 'rental') {
      const [equipment] = await pool.execute(
        'SELECT * FROM equipment_details WHERE provider_id = ?',
        [id]
      );
      additionalDetails = { equipment };
    } else if (provider.provider_type === 'service' && provider.category === 'labor') {
      const [labor] = await pool.execute(
        'SELECT * FROM labor_details WHERE provider_id = ?',
        [id]
      );
      additionalDetails = { labor };
    } else if (provider.provider_type === 'seller') {
      const [products] = await pool.execute(
        'SELECT * FROM seller_products WHERE provider_id = ?',
        [id]
      );
      additionalDetails = { products };
    }

    // Get recent reviews
    const [reviews] = await pool.execute(
      `SELECT review_id, rating, review_text, created_at 
       FROM provider_reviews 
       WHERE provider_id = ? 
       ORDER BY created_at DESC 
       LIMIT 5`,
      [id]
    );

    res.json({
      success: true,
      data: {
        ...provider,
        ...additionalDetails,
        recent_reviews: reviews
      }
    });
  } catch (error) {
    console.error('Error fetching provider details:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch provider details',
      message: error.message
    });
  }
});

/**
 * POST /api/providers
 * Add a new service provider (requires authentication)
 */
router.post('/providers', authenticateUser, async (req, res) => {
  try {
    const {
      name,
      service_type,
      provider_type,
      category,
      subcategory,
      contact_info,
      location,
      district,
      state,
      description,
      services,
      experience_years,
      pricing
    } = req.body;

    // Validation
    if (!name || !service_type || !provider_type || !category || !contact_info || !location || !pricing) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO service_providers (
        name, service_type, provider_type, category, subcategory,
        contact_info, location, district, state, description,
        services, experience_years, pricing, created_by, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        name,
        service_type,
        provider_type,
        category,
        subcategory,
        JSON.stringify(contact_info),
        location,
        district,
        state,
        description,
        JSON.stringify(services || []),
        experience_years || 0,
        JSON.stringify(pricing),
        req.userId
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Provider submitted for review',
      data: {
        provider_id: result.insertId,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Error creating provider:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create provider',
      message: error.message
    });
  }
});

/**
 * PUT /api/providers/:id
 * Update provider details (requires authentication)
 */
router.put('/providers/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove fields that shouldn't be updated via this endpoint
    delete updates.provider_id;
    delete updates.created_at;
    delete updates.created_by;

    // Build dynamic update query
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No fields to update'
      });
    }

    // JSON fields need to be stringified
    const jsonFields = ['contact_info', 'services', 'certifications', 'images', 'documents', 'pricing', 'available_dates'];
    values.forEach((val, idx) => {
      if (jsonFields.includes(fields[idx]) && typeof val === 'object') {
        values[idx] = JSON.stringify(val);
      }
    });

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE service_providers SET ${setClause} WHERE provider_id = ?`;

    const [result] = await pool.execute(query, [...values, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Provider not found'
      });
    }

    res.json({
      success: true,
      message: 'Provider updated successfully'
    });
  } catch (error) {
    console.error('Error updating provider:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update provider',
      message: error.message
    });
  }
});

/**
 * DELETE /api/providers/:id
 * Delete a provider (requires authentication & admin role)
 */
router.delete('/providers/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM service_providers WHERE provider_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Provider not found'
      });
    }

    res.json({
      success: true,
      message: 'Provider deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting provider:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete provider',
      message: error.message
    });
  }
});

// ================================================================
// EQUIPMENT ENDPOINTS
// ================================================================

/**
 * GET /api/equipment
 * List equipment items with provider info
 */
router.get('/equipment', async (req, res) => {
  try {
    const { equipment_type, district, max_daily_rate } = req.query;

    let query = `
      SELECT 
        e.*,
        sp.name as provider_name,
        sp.location,
        sp.district,
        sp.state,
        sp.rating,
        sp.verified,
        sp.contact_info
      FROM equipment_details e
      JOIN service_providers sp ON e.provider_id = sp.provider_id
      WHERE sp.status = 'approved' AND sp.availability = 'available'
    `;

    const params = [];

    if (equipment_type) {
      query += ' AND e.equipment_type = ?';
      params.push(equipment_type);
    }
    if (district) {
      query += ' AND sp.district = ?';
      params.push(district);
    }
    if (max_daily_rate) {
      query += ' AND e.daily_rate <= ?';
      params.push(parseFloat(max_daily_rate));
    }

    query += ' ORDER BY sp.rating DESC, e.daily_rate ASC';

    const [equipment] = await pool.execute(query, params);

    res.json({
      success: true,
      data: equipment
    });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch equipment',
      message: error.message
    });
  }
});

/**
 * POST /api/equipment
 * Add new equipment listing
 */
router.post('/equipment', authenticateUser, async (req, res) => {
  try {
    const {
      provider_id,
      equipment_type,
      equipment_name,
      model,
      hourly_rate,
      daily_rate,
      operator_included,
      delivery_available
    } = req.body;

    if (!provider_id || !equipment_type || !equipment_name) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO equipment_details (
        provider_id, equipment_type, equipment_name, model,
        hourly_rate, daily_rate, operator_included, delivery_available
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        provider_id,
        equipment_type,
        equipment_name,
        model,
        hourly_rate,
        daily_rate,
        operator_included || false,
        delivery_available || false
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Equipment added successfully',
      data: { equipment_id: result.insertId }
    });
  } catch (error) {
    console.error('Error adding equipment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add equipment',
      message: error.message
    });
  }
});

/**
 * GET /api/equipment/:id
 * Get equipment details
 */
router.get('/equipment/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [equipment] = await pool.execute(
      `SELECT 
        e.*,
        sp.name as provider_name,
        sp.location,
        sp.contact_info,
        sp.rating,
        sp.verified
      FROM equipment_details e
      JOIN service_providers sp ON e.provider_id = sp.provider_id
      WHERE e.equipment_id = ?`,
      [id]
    );

    if (equipment.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Equipment not found'
      });
    }

    res.json({
      success: true,
      data: equipment[0]
    });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch equipment details',
      message: error.message
    });
  }
});

// ================================================================
// LABOR ENDPOINTS
// ================================================================

/**
 * GET /api/labor
 * List labor providers
 */
router.get('/labor', async (req, res) => {
  try {
    const { labor_type, labor_category, district, max_daily_rate } = req.query;

    let query = `
      SELECT 
        l.*,
        sp.name as provider_name,
        sp.location,
        sp.district,
        sp.state,
        sp.rating,
        sp.verified,
        sp.contact_info
      FROM labor_details l
      JOIN service_providers sp ON l.provider_id = sp.provider_id
      WHERE sp.status = 'approved' AND sp.availability = 'available'
    `;

    const params = [];

    if (labor_type) {
      query += ' AND l.labor_type = ?';
      params.push(labor_type);
    }
    if (labor_category) {
      query += ' AND l.labor_category = ?';
      params.push(labor_category);
    }
    if (district) {
      query += ' AND sp.district = ?';
      params.push(district);
    }
    if (max_daily_rate) {
      query += ' AND l.daily_rate <= ?';
      params.push(parseFloat(max_daily_rate));
    }

    query += ' ORDER BY sp.rating DESC';

    const [labor] = await pool.execute(query, params);

    res.json({
      success: true,
      data: labor
    });
  } catch (error) {
    console.error('Error fetching labor:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch labor providers',
      message: error.message
    });
  }
});

/**
 * POST /api/labor
 * Add labor details
 */
router.post('/labor', authenticateUser, async (req, res) => {
  try {
    const {
      provider_id,
      labor_type,
      labor_category,
      total_workers,
      skills,
      daily_rate
    } = req.body;

    if (!provider_id || !labor_type) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO labor_details (
        provider_id, labor_type, labor_category, total_workers, skills, daily_rate
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        provider_id,
        labor_type,
        labor_category,
        total_workers || 1,
        JSON.stringify(skills || []),
        daily_rate
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Labor details added successfully',
      data: { labor_id: result.insertId }
    });
  } catch (error) {
    console.error('Error adding labor:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add labor details',
      message: error.message
    });
  }
});

// ================================================================
// SELLER PRODUCTS ENDPOINTS
// ================================================================

/**
 * GET /api/seller-products
 * List products sold by sellers
 */
router.get('/seller-products', async (req, res) => {
  try {
    const { product_category, product_subcategory, district, max_price } = req.query;

    let query = `
      SELECT 
        p.*,
        sp.name as seller_name,
        sp.location,
        sp.district,
        sp.state,
        sp.rating,
        sp.verified,
        sp.contact_info
      FROM seller_products p
      JOIN service_providers sp ON p.provider_id = sp.provider_id
      WHERE sp.status = 'approved' AND p.stock_status IN ('in_stock', 'low_stock')
    `;

    const params = [];

    if (product_category) {
      query += ' AND p.product_category = ?';
      params.push(product_category);
    }
    if (product_subcategory) {
      query += ' AND p.product_subcategory = ?';
      params.push(product_subcategory);
    }
    if (district) {
      query += ' AND sp.district = ?';
      params.push(district);
    }
    if (max_price) {
      query += ' AND p.price_per_unit <= ?';
      params.push(parseFloat(max_price));
    }

    query += ' ORDER BY sp.rating DESC, p.price_per_unit ASC';

    const [products] = await pool.execute(query, params);

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
      message: error.message
    });
  }
});

/**
 * POST /api/seller-products
 * Add new product listing
 */
router.post('/seller-products', authenticateUser, async (req, res) => {
  try {
    const {
      provider_id,
      product_category,
      product_name,
      price_per_unit,
      unit_type,
      available_quantity
    } = req.body;

    if (!provider_id || !product_category || !product_name || !price_per_unit || !unit_type) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO seller_products (
        provider_id, product_category, product_name, price_per_unit, unit_type, available_quantity
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [provider_id, product_category, product_name, price_per_unit, unit_type, available_quantity || 0]
    );

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: { product_id: result.insertId }
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add product',
      message: error.message
    });
  }
});

// ================================================================
// WORKER SUPPORT SERVICES ENDPOINTS
// ================================================================

/**
 * GET /api/worker-support
 * List housing/transport services for workers
 */
router.get('/worker-support', async (req, res) => {
  try {
    const { service_type, district } = req.query;

    let query = `
      SELECT 
        w.*,
        sp.name as provider_name,
        sp.rating,
        sp.verified
      FROM worker_support_services w
      JOIN service_providers sp ON w.provider_id = sp.provider_id
      WHERE sp.status = 'approved'
    `;

    const params = [];

    if (service_type) {
      query += ' AND w.service_type = ?';
      params.push(service_type);
    }
    if (district) {
      query += ' AND w.district = ?';
      params.push(district);
    }

    query += ' ORDER BY sp.rating DESC';

    const [services] = await pool.execute(query, params);

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Error fetching worker support services:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch worker support services',
      message: error.message
    });
  }
});

/**
 * POST /api/worker-support
 * Add new support service
 */
router.post('/worker-support', authenticateUser, async (req, res) => {
  try {
    const {
      provider_id,
      service_type,
      service_name,
      description,
      location,
      district,
      state
    } = req.body;

    if (!provider_id || !service_type || !service_name) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO worker_support_services (
        provider_id, service_type, service_name, description, location, district, state
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [provider_id, service_type, service_name, description, location, district, state]
    );

    res.status(201).json({
      success: true,
      message: 'Support service added successfully',
      data: { support_id: result.insertId }
    });
  } catch (error) {
    console.error('Error adding support service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add support service',
      message: error.message
    });
  }
});

// ================================================================
// SERVICE REQUESTS ENDPOINTS
// ================================================================

/**
 * POST /api/service-requests
 * Create a new service request
 */
router.post('/service-requests', authenticateUser, async (req, res) => {
  try {
    const {
      provider_id,
      service_type,
      subcategory,
      request_description,
      location,
      district,
      state,
      start_date,
      end_date,
      quantity,
      budget,
      urgency,
      grok_analysis
    } = req.body;

    if (!provider_id || !service_type || !request_description || !start_date) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Determine if Grok detected anomaly
    const grok_anomaly_detected = grok_analysis && 
      (grok_analysis.level === 'high' || grok_analysis.level === 'critical');

    const [result] = await pool.execute(
      `INSERT INTO service_requests (
        producer_id, provider_id, service_type, subcategory, request_description,
        location, district, state, start_date, end_date, quantity, budget, urgency,
        grok_analysis, grok_anomaly_detected
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.userId,
        provider_id,
        service_type,
        subcategory,
        request_description,
        location,
        district,
        state,
        start_date,
        end_date,
        quantity,
        budget,
        urgency || 'medium',
        JSON.stringify(grok_analysis || {}),
        grok_anomaly_detected
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Service request submitted successfully',
      data: {
        request_id: result.insertId,
        grok_anomaly_detected
      }
    });
  } catch (error) {
    console.error('Error creating service request:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create service request',
      message: error.message
    });
  }
});

/**
 * GET /api/service-requests
 * Get service requests for logged-in producer
 */
router.get('/service-requests', authenticateUser, async (req, res) => {
  try {
    const { status } = req.query;

    let query = `
      SELECT 
        sr.*,
        sp.name as provider_name,
        sp.provider_type,
        sp.contact_info
      FROM service_requests sr
      JOIN service_providers sp ON sr.provider_id = sp.provider_id
      WHERE sr.producer_id = ?
    `;

    const params = [req.userId];

    if (status) {
      query += ' AND sr.status = ?';
      params.push(status);
    }

    query += ' ORDER BY sr.created_at DESC';

    const [requests] = await pool.execute(query, params);

    res.json({
      success: true,
      data: requests
    });
  } catch (error) {
    console.error('Error fetching service requests:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service requests',
      message: error.message
    });
  }
});

// ================================================================
// SEASONAL ALERTS ENDPOINTS
// ================================================================

/**
 * GET /api/seasonal-alerts
 * Get active seasonal alerts
 */
router.get('/seasonal-alerts', async (req, res) => {
  try {
    const { alert_type, district, state } = req.query;
    const today = new Date().toISOString().split('T')[0];

    let query = `
      SELECT * FROM seasonal_alerts
      WHERE is_active = TRUE
      AND valid_from <= ?
      AND valid_to >= ?
    `;

    const params = [today, today];

    if (alert_type) {
      query += ' AND alert_type = ?';
      params.push(alert_type);
    }

    if (district || state) {
      query += ' AND (';
      const conditions = [];
      if (district) {
        conditions.push('JSON_SEARCH(districts, "one", ?) IS NOT NULL');
        params.push(district);
      }
      if (state) {
        conditions.push('JSON_SEARCH(regions, "one", ?) IS NOT NULL');
        params.push(state);
      }
      query += conditions.join(' OR ');
      query += ')';
    }

    query += ' ORDER BY severity DESC, created_at DESC';

    const [alerts] = await pool.execute(query, params);

    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch seasonal alerts',
      message: error.message
    });
  }
});

module.exports = router;
