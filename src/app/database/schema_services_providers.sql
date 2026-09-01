-- ================================================================
-- TRADIE Platform - Services & Resources Provider Schema
-- Version: 2.0 (Enhanced)
-- Date: October 22, 2025
-- Purpose: Complete database schema for Producer Services Hub
-- ================================================================

-- ================================================================
-- 1. MAIN SERVICE PROVIDERS TABLE
-- ================================================================
CREATE TABLE service_providers (
    provider_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    service_type VARCHAR(100) NOT NULL, -- 'equipment', 'labor', 'seller', 'consultant'
    provider_type ENUM('rental', 'seller', 'service', 'consultant') NOT NULL DEFAULT 'service',
    category VARCHAR(100) NOT NULL, -- 'equipment-rental', 'materials', 'labor', 'support'
    subcategory VARCHAR(100), -- 'JCB', 'Seeds - Hybrid', 'Skilled Labor - Mechanics', etc.
    contact_info JSON NOT NULL, -- {phone, email, whatsapp, address}
    location VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    distance_km DECIMAL(10, 2), -- Distance from requesting producer
    availability ENUM('available', 'busy', 'booked') DEFAULT 'available',
    available_dates JSON, -- ["2025-10-23", "2025-10-24"]
    rating DECIMAL(3, 2) DEFAULT 0.00,
    reviews_count INT DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    description TEXT,
    services JSON, -- ["JCB 3DX", "Excavation", "Land Leveling"]
    experience_years INT DEFAULT 0,
    certifications JSON, -- ["JCB Certified Operator", "Safety Training"]
    images JSON, -- ["url1", "url2"]
    documents JSON, -- {license: "url", certificate: "url"}
    pricing JSON NOT NULL, -- {type: "hourly", amount: 1200, unit: "per hour"}
    response_time VARCHAR(50), -- "< 2 hours"
    completion_rate INT DEFAULT 0, -- 0-100
    grok_score INT DEFAULT 0, -- 0-100 AI trust score
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT, -- User who added this provider
    status ENUM('pending', 'approved', 'rejected', 'suspended') DEFAULT 'pending',
    
    INDEX idx_service_type (service_type),
    INDEX idx_provider_type (provider_type),
    INDEX idx_category (category),
    INDEX idx_subcategory (subcategory),
    INDEX idx_location (district, state),
    INDEX idx_availability (availability),
    INDEX idx_rating (rating),
    INDEX idx_verified (verified),
    INDEX idx_status (status),
    INDEX idx_grok_score (grok_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 2. EQUIPMENT RENTAL DETAILS
-- ================================================================
CREATE TABLE equipment_details (
    equipment_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    equipment_type VARCHAR(100) NOT NULL, -- 'JCB', 'Harvester', 'Solar Pump', 'Drone'
    equipment_name VARCHAR(255) NOT NULL,
    model VARCHAR(100),
    manufacturer VARCHAR(100),
    year_of_manufacture YEAR,
    condition_status ENUM('excellent', 'good', 'fair') DEFAULT 'good',
    hourly_rate DECIMAL(10, 2),
    daily_rate DECIMAL(10, 2),
    weekly_rate DECIMAL(10, 2),
    monthly_rate DECIMAL(10, 2),
    security_deposit DECIMAL(10, 2),
    fuel_included BOOLEAN DEFAULT FALSE,
    operator_included BOOLEAN DEFAULT FALSE,
    operator_charges DECIMAL(10, 2),
    delivery_available BOOLEAN DEFAULT FALSE,
    delivery_charges DECIMAL(10, 2),
    pickup_location VARCHAR(255),
    availability_calendar JSON, -- {date: "available/booked"}
    specifications JSON, -- {power: "100HP", capacity: "5ton"}
    features JSON, -- ["GPS Tracking", "Air Conditioning"]
    maintenance_records JSON,
    insurance_valid_till DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    INDEX idx_equipment_type (equipment_type),
    INDEX idx_hourly_rate (hourly_rate),
    INDEX idx_daily_rate (daily_rate)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 3. LABOR SERVICE DETAILS
-- ================================================================
CREATE TABLE labor_details (
    labor_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    labor_type ENUM('Skilled', 'Unskilled', 'Association') NOT NULL,
    labor_category VARCHAR(100), -- 'Operators', 'Mechanics', 'Drivers', 'Technicians', 'Manual'
    total_workers INT DEFAULT 1,
    skills JSON, -- ["Tractor Operation", "Repair", "Maintenance"]
    languages JSON, -- ["Kannada", "Hindi", "Tamil"]
    hourly_rate DECIMAL(10, 2),
    daily_rate DECIMAL(10, 2),
    weekly_rate DECIMAL(10, 2),
    monthly_rate DECIMAL(10, 2),
    minimum_hours INT,
    minimum_days INT,
    available_from DATE,
    available_to DATE,
    contract_type ENUM('hourly', 'daily', 'contract', 'seasonal'),
    accommodation_required BOOLEAN DEFAULT FALSE,
    food_required BOOLEAN DEFAULT FALSE,
    transport_required BOOLEAN DEFAULT FALSE,
    travel_distance_km INT, -- How far they can travel
    group_size_min INT DEFAULT 1,
    group_size_max INT DEFAULT 1,
    association_name VARCHAR(255), -- If labor_type is 'Association'
    association_registration VARCHAR(100),
    worker_ids JSON, -- Array of worker IDs in association
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    INDEX idx_labor_type (labor_type),
    INDEX idx_labor_category (labor_category),
    INDEX idx_daily_rate (daily_rate),
    INDEX idx_available_dates (available_from, available_to)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 4. SELLER PRODUCTS (Seeds, Fertilizers, Nurseries, etc.)
-- ================================================================
CREATE TABLE seller_products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    product_category VARCHAR(100) NOT NULL, -- 'Seeds', 'Fertilizers', 'Nurseries', 'Shade Net', etc.
    product_subcategory VARCHAR(100), -- 'Hybrid', 'Organic', 'Chemical', 'Bio'
    product_name VARCHAR(255) NOT NULL,
    product_code VARCHAR(100),
    brand VARCHAR(100),
    description TEXT,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    unit_type VARCHAR(50) NOT NULL, -- 'kg', 'bag', 'liter', 'plant', 'sq meter'
    minimum_order_quantity DECIMAL(15, 3) DEFAULT 1,
    available_quantity DECIMAL(15, 3),
    stock_status ENUM('in_stock', 'low_stock', 'out_of_stock') DEFAULT 'in_stock',
    product_images JSON, -- ["url1", "url2"]
    certifications JSON, -- ["Organic Certified", "Seed Certification"]
    quality_grade VARCHAR(50), -- 'Grade A', 'Premium', 'Standard'
    manufacturing_date DATE,
    expiry_date DATE,
    origin VARCHAR(100), -- Manufacturing/farming location
    specifications JSON, -- {npk: "10:26:26", purity: "98%"}
    delivery_available BOOLEAN DEFAULT TRUE,
    delivery_charges DECIMAL(10, 2),
    bulk_discount JSON, -- [{min_qty: 100, discount_percent: 10}]
    seasonal_availability JSON, -- {season: "kharif", months: ["Jun", "Jul"]}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    INDEX idx_product_category (product_category),
    INDEX idx_product_subcategory (product_subcategory),
    INDEX idx_price (price_per_unit),
    INDEX idx_stock_status (stock_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 5. WORKER SUPPORT SERVICES (Housing & Transport)
-- ================================================================
CREATE TABLE worker_support_services (
    support_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    service_type ENUM('Housing', 'Transport', 'Meals') NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    description TEXT,
    contact_info JSON, -- {phone, email, address}
    location VARCHAR(255),
    district VARCHAR(100),
    state VARCHAR(100),
    
    -- Housing specific
    accommodation_type VARCHAR(100), -- 'Dormitory', 'Shared Room', 'Individual Room'
    capacity INT, -- Total persons capacity
    available_beds INT,
    amenities JSON, -- ["Clean Bedding", "Toilets", "Kitchen", "Water"]
    room_rate_per_person DECIMAL(10, 2),
    food_included BOOLEAN DEFAULT FALSE,
    food_charges DECIMAL(10, 2),
    
    -- Transport specific
    vehicle_type VARCHAR(100), -- 'Bus', 'Van', 'Truck'
    seating_capacity INT,
    transport_rate_per_km DECIMAL(10, 2),
    transport_rate_per_trip DECIMAL(10, 2),
    route_coverage JSON, -- ["Route 1", "Route 2"]
    
    -- Meals specific
    meal_types JSON, -- ["Breakfast", "Lunch", "Dinner"]
    meal_rate_per_person DECIMAL(10, 2),
    cuisine_type VARCHAR(100), -- 'Vegetarian', 'Non-Vegetarian', 'Both'
    
    rating DECIMAL(3, 2) DEFAULT 0.00,
    reviews_count INT DEFAULT 0,
    images JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    INDEX idx_service_type (service_type),
    INDEX idx_location (district, state),
    INDEX idx_capacity (capacity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 6. SERVICE REQUESTS (Producers requesting services)
-- ================================================================
CREATE TABLE service_requests (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    producer_id INT NOT NULL,
    provider_id INT NOT NULL,
    service_type VARCHAR(100) NOT NULL, -- From service_providers.service_type
    subcategory VARCHAR(100),
    request_description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    district VARCHAR(100),
    state VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE,
    quantity VARCHAR(100), -- For sellers
    budget DECIMAL(10, 2),
    urgency ENUM('low', 'medium', 'high') DEFAULT 'medium',
    status ENUM('pending', 'accepted', 'rejected', 'completed', 'cancelled') DEFAULT 'pending',
    provider_response TEXT,
    provider_quoted_price DECIMAL(10, 2),
    actual_price DECIMAL(10, 2),
    payment_status ENUM('unpaid', 'paid', 'partial') DEFAULT 'unpaid',
    rating_given INT, -- 1-5 stars
    review_text TEXT,
    grok_anomaly_detected BOOLEAN DEFAULT FALSE,
    grok_analysis JSON, -- AI fraud detection results
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    INDEX idx_producer (producer_id),
    INDEX idx_provider (provider_id),
    INDEX idx_service_type (service_type),
    INDEX idx_status (status),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_urgency (urgency)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 7. PROVIDER REVIEWS & RATINGS
-- ================================================================
CREATE TABLE provider_reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    producer_id INT NOT NULL,
    request_id INT, -- Link to service request
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_title VARCHAR(255),
    review_text TEXT,
    pros TEXT,
    cons TEXT,
    images JSON,
    response_time_rating INT CHECK (response_time_rating >= 1 AND response_time_rating <= 5),
    quality_rating INT CHECK (quality_rating >= 1 AND quality_rating <= 5),
    professionalism_rating INT CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5),
    value_for_money_rating INT CHECK (value_for_money_rating >= 1 AND value_for_money_rating <= 5),
    would_recommend BOOLEAN DEFAULT TRUE,
    verified_purchase BOOLEAN DEFAULT FALSE,
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    FOREIGN KEY (request_id) REFERENCES service_requests(request_id) ON DELETE SET NULL,
    INDEX idx_provider (provider_id),
    INDEX idx_producer (producer_id),
    INDEX idx_rating (rating),
    INDEX idx_verified (verified_purchase)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 8. SEASONAL ALERTS & RECOMMENDATIONS
-- ================================================================
CREATE TABLE seasonal_alerts (
    alert_id INT PRIMARY KEY AUTO_INCREMENT,
    alert_type ENUM('labor', 'equipment', 'materials', 'support') NOT NULL,
    category VARCHAR(100),
    severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    message TEXT NOT NULL,
    suggestion TEXT,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    regions JSON, -- ["Karnataka", "Tamil Nadu"]
    districts JSON, -- ["Mandya", "Mysuru"]
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT, -- Admin user
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_alert_type (alert_type),
    INDEX idx_severity (severity),
    INDEX idx_dates (valid_from, valid_to),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 9. PROVIDER CERTIFICATIONS & DOCUMENTS
-- ================================================================
CREATE TABLE provider_certifications (
    certification_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    certification_type VARCHAR(100) NOT NULL, -- 'License', 'Certificate', 'Registration'
    certification_name VARCHAR(255) NOT NULL,
    issuing_authority VARCHAR(255),
    registration_number VARCHAR(100),
    issue_date DATE,
    expiry_date DATE,
    document_url VARCHAR(500),
    verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    verified_by INT, -- Admin who verified
    verified_at TIMESTAMP NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    INDEX idx_provider (provider_id),
    INDEX idx_verification_status (verification_status),
    INDEX idx_expiry (expiry_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 10. PROVIDER AVAILABILITY CALENDAR
-- ================================================================
CREATE TABLE provider_availability (
    availability_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    date DATE NOT NULL,
    status ENUM('available', 'partially_booked', 'fully_booked', 'unavailable') DEFAULT 'available',
    available_slots INT, -- Number of slots/units available
    booked_slots INT DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    UNIQUE KEY unique_provider_date (provider_id, date),
    INDEX idx_provider_date (provider_id, date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- SAMPLE DATA INSERTS
-- ================================================================

-- Sample Service Provider 1: Equipment Rental
INSERT INTO service_providers (
    name, service_type, provider_type, category, subcategory,
    contact_info, location, district, state,
    availability, rating, reviews_count, verified,
    description, services, experience_years, certifications,
    pricing, response_time, completion_rate, grok_score, status
) VALUES (
    'Kumar Earth Movers',
    'equipment',
    'rental',
    'equipment-rental',
    'JCB',
    JSON_OBJECT('phone', '+91 98765 43210', 'email', 'kumar.earthmovers@gmail.com', 'whatsapp', '+91 98765 43210'),
    'Mandya, Karnataka',
    'Mandya',
    'Karnataka',
    'available',
    4.8,
    156,
    TRUE,
    'Professional earth moving services with modern JCB equipment. 10+ years experience in farm land preparation.',
    JSON_ARRAY('JCB 3DX', 'Excavation', 'Land Leveling', 'Digging'),
    12,
    JSON_ARRAY('JCB Certified Operator', 'Safety Training'),
    JSON_OBJECT('type', 'hourly', 'amount', 1200, 'unit', 'per hour'),
    '< 2 hours',
    98,
    92,
    'approved'
);

-- Sample Service Provider 2: Material Seller
INSERT INTO service_providers (
    name, service_type, provider_type, category, subcategory,
    contact_info, location, district, state,
    availability, rating, reviews_count, verified,
    description, services, experience_years, certifications,
    pricing, response_time, completion_rate, grok_score, status
) VALUES (
    'Karnataka Seed Corporation',
    'seller',
    'seller',
    'materials',
    'Seeds - Hybrid',
    JSON_OBJECT('phone', '+91 99876 54321', 'email', 'ksc@example.com'),
    'Mysuru, Karnataka',
    'Mysuru',
    'Karnataka',
    'available',
    4.6,
    234,
    TRUE,
    'Government certified hybrid seeds with high yield guarantee. All major crops available.',
    JSON_ARRAY('Hybrid Seeds', 'Vegetable Seeds', 'Grain Seeds', 'Certified Quality'),
    25,
    JSON_ARRAY('Seed Certification', 'Quality Assured'),
    JSON_OBJECT('type', 'per_unit', 'amount', 450, 'unit', 'per kg'),
    '< 6 hours',
    95,
    88,
    'approved'
);

-- Sample Service Provider 3: Labor Service
INSERT INTO service_providers (
    name, service_type, provider_type, category, subcategory,
    contact_info, location, district, state,
    availability, rating, reviews_count, verified,
    description, services, experience_years,
    pricing, response_time, completion_rate, grok_score, status
) VALUES (
    'Karnataka Farm Labor Association',
    'labor',
    'service',
    'labor',
    'Unskilled Labor - Group',
    JSON_OBJECT('phone', '+91 99876 54321', 'email', 'kfla@example.com'),
    'Mysuru, Karnataka',
    'Mysuru',
    'Karnataka',
    'available',
    4.6,
    234,
    TRUE,
    'Reliable labor pool of 500+ workers. Available for seasonal work and general farm labor.',
    JSON_ARRAY('Manual Labor', 'Harvesting', 'Planting', 'Weeding'),
    8,
    JSON_OBJECT('type', 'daily', 'amount', 400, 'unit', 'per person/day'),
    '< 4 hours',
    95,
    88,
    'approved'
);

-- ================================================================
-- VIEWS FOR COMMON QUERIES
-- ================================================================

-- View: Top Rated Providers by Category
CREATE OR REPLACE VIEW v_top_rated_providers AS
SELECT 
    provider_id,
    name,
    category,
    subcategory,
    rating,
    reviews_count,
    location,
    district,
    state,
    grok_score,
    verified
FROM service_providers
WHERE status = 'approved' AND rating >= 4.5
ORDER BY rating DESC, reviews_count DESC;

-- View: Available Equipment with Pricing
CREATE OR REPLACE VIEW v_available_equipment AS
SELECT 
    sp.provider_id,
    sp.name AS provider_name,
    sp.location,
    sp.district,
    sp.rating,
    ed.equipment_type,
    ed.equipment_name,
    ed.model,
    ed.hourly_rate,
    ed.daily_rate,
    ed.operator_included,
    ed.delivery_available
FROM service_providers sp
JOIN equipment_details ed ON sp.provider_id = ed.provider_id
WHERE sp.availability = 'available' AND sp.status = 'approved';

-- View: Active Service Requests Summary
CREATE OR REPLACE VIEW v_active_service_requests AS
SELECT 
    sr.request_id,
    sr.producer_id,
    sp.name AS provider_name,
    sp.provider_type,
    sr.service_type,
    sr.start_date,
    sr.status,
    sr.budget,
    sr.urgency,
    sr.created_at
FROM service_requests sr
JOIN service_providers sp ON sr.provider_id = sp.provider_id
WHERE sr.status IN ('pending', 'accepted')
ORDER BY sr.urgency DESC, sr.created_at DESC;

-- ================================================================
-- STORED PROCEDURES
-- ================================================================

DELIMITER //

-- Procedure: Update Provider Rating
CREATE PROCEDURE update_provider_rating(IN p_provider_id INT)
BEGIN
    UPDATE service_providers
    SET rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM provider_reviews
        WHERE provider_id = p_provider_id
    ),
    reviews_count = (
        SELECT COUNT(*)
        FROM provider_reviews
        WHERE provider_id = p_provider_id
    )
    WHERE provider_id = p_provider_id;
END //

-- Procedure: Get Nearby Providers
CREATE PROCEDURE get_nearby_providers(
    IN p_district VARCHAR(100),
    IN p_state VARCHAR(100),
    IN p_category VARCHAR(100),
    IN p_limit INT
)
BEGIN
    SELECT *
    FROM service_providers
    WHERE district = p_district
    AND state = p_state
    AND category = p_category
    AND status = 'approved'
    AND availability = 'available'
    ORDER BY rating DESC, grok_score DESC
    LIMIT p_limit;
END //

-- Procedure: Create Service Request with Grok Analysis
CREATE PROCEDURE create_service_request_with_grok(
    IN p_producer_id INT,
    IN p_provider_id INT,
    IN p_service_type VARCHAR(100),
    IN p_description TEXT,
    IN p_location VARCHAR(255),
    IN p_start_date DATE,
    IN p_budget DECIMAL(10,2),
    IN p_urgency ENUM('low', 'medium', 'high'),
    IN p_grok_analysis JSON,
    OUT p_request_id INT
)
BEGIN
    DECLARE v_anomaly_detected BOOLEAN;
    
    -- Check if Grok detected high/critical anomaly
    SET v_anomaly_detected = JSON_EXTRACT(p_grok_analysis, '$.level') IN ('high', 'critical');
    
    INSERT INTO service_requests (
        producer_id, provider_id, service_type,
        request_description, location, start_date,
        budget, urgency, grok_analysis, grok_anomaly_detected
    ) VALUES (
        p_producer_id, p_provider_id, p_service_type,
        p_description, p_location, p_start_date,
        p_budget, p_urgency, p_grok_analysis, v_anomaly_detected
    );
    
    SET p_request_id = LAST_INSERT_ID();
END //

DELIMITER ;

-- ================================================================
-- INDEXES FOR PERFORMANCE
-- ================================================================

-- Additional composite indexes for common query patterns
CREATE INDEX idx_provider_category_rating ON service_providers(category, rating DESC);
CREATE INDEX idx_provider_location_type ON service_providers(district, state, provider_type);
CREATE INDEX idx_requests_producer_status ON service_requests(producer_id, status);
CREATE INDEX idx_equipment_type_rate ON equipment_details(equipment_type, daily_rate);

-- ================================================================
-- END OF SCHEMA
-- ================================================================
