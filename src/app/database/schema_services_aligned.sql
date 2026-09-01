-- ================================================================
-- TRADIE Platform - Services & Resources Provider Schema (Aligned)
-- Version: 2.1 (Aligned with existing structure)
-- Date: October 22, 2025
-- Purpose: Aligned with existing backend schema design
-- ================================================================

-- ================================================================
-- 1. MAIN SERVICE PROVIDERS TABLE
-- ================================================================
CREATE TABLE service_providers (
    provider_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    service_type ENUM('equipment', 'labor', 'seller', 'consultant', 'logistics', 'housing', 'others') NOT NULL,
    category VARCHAR(150), -- e.g., JCB, Skilled Labor, Seeds, Solar Equipment
    contact_info JSON, -- {phone, email, address, website}
    location VARCHAR(255),
    description TEXT,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    documents JSON, -- {licenses, certifications URLs}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Additional fields for enhanced functionality
    district VARCHAR(100),
    state VARCHAR(100),
    verified BOOLEAN DEFAULT FALSE,
    availability ENUM('available', 'busy', 'booked') DEFAULT 'available',
    reviews_count INT DEFAULT 0,
    grok_score INT DEFAULT 0,
    status ENUM('pending', 'approved', 'rejected', 'suspended') DEFAULT 'pending',
    
    INDEX idx_service_type (service_type),
    INDEX idx_category (category),
    INDEX idx_location (district, state),
    INDEX idx_rating (rating),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 2. EQUIPMENT DETAILS (for rentals)
-- ================================================================
CREATE TABLE equipment_details (
    equipment_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    equipment_type VARCHAR(150),
    model VARCHAR(100),
    hourly_rate DECIMAL(12, 2),
    daily_rate DECIMAL(12, 2),
    availability JSON, -- {dates: [...], status: "available"}
    
    -- Additional useful fields
    operator_included BOOLEAN DEFAULT FALSE,
    delivery_available BOOLEAN DEFAULT FALSE,
    specifications JSON, -- {power: "100HP", capacity: "5ton"}
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    INDEX idx_equipment_type (equipment_type),
    INDEX idx_rates (hourly_rate, daily_rate)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 3. LABOR DETAILS
-- ================================================================
CREATE TABLE labor_details (
    labor_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    labor_type ENUM('Skilled', 'Unskilled', 'Association') NOT NULL,
    skills TEXT,
    hourly_rate DECIMAL(12, 2),
    daily_rate DECIMAL(12, 2),
    available_from DATE,
    available_to DATE,
    
    -- Additional useful fields
    total_workers INT DEFAULT 1,
    group_size_min INT DEFAULT 1,
    group_size_max INT DEFAULT 1,
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    INDEX idx_labor_type (labor_type),
    INDEX idx_availability (available_from, available_to)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 4. SELLER PRODUCTS (Seeds, Fertilizers, Nursery, Solar, etc.)
-- ================================================================
CREATE TABLE seller_products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    product_category VARCHAR(150), -- 'Seeds', 'Fertilizers', 'Nursery', etc.
    product_name VARCHAR(255),
    price_per_unit DECIMAL(12, 2),
    available_quantity DECIMAL(15, 3),
    units VARCHAR(50), -- 'kg', 'bag', 'liter', 'plant'
    
    -- Additional useful fields
    stock_status ENUM('in_stock', 'low_stock', 'out_of_stock') DEFAULT 'in_stock',
    certifications JSON, -- ["Organic Certified", "Quality Assured"]
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    INDEX idx_product_category (product_category),
    INDEX idx_stock_status (stock_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 5. WORKER HOUSING AND TRANSPORT SERVICES
-- ================================================================
CREATE TABLE worker_support_services (
    support_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    support_type ENUM('Housing', 'Transport') NOT NULL,
    description TEXT,
    contact_info JSON, -- {phone, email, address}
    
    -- Additional useful fields
    capacity INT, -- for housing: beds, for transport: seats
    rate_per_person DECIMAL(12, 2),
    amenities JSON, -- ["Clean Bedding", "Meals", "Transport"]
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    INDEX idx_support_type (support_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 6. SERVICE REQUESTS (Producer requests to providers)
-- ================================================================
CREATE TABLE service_requests (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    producer_id INT NOT NULL,
    provider_id INT NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    request_description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    budget DECIMAL(12, 2),
    urgency ENUM('low', 'medium', 'high') DEFAULT 'medium',
    status ENUM('pending', 'accepted', 'rejected', 'completed', 'cancelled') DEFAULT 'pending',
    grok_analysis JSON, -- AI fraud detection results
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    INDEX idx_producer (producer_id),
    INDEX idx_provider (provider_id),
    INDEX idx_status (status),
    INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 7. PROVIDER REVIEWS (for trust building)
-- ================================================================
CREATE TABLE provider_reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    producer_id INT NOT NULL,
    request_id INT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    verified_purchase BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    FOREIGN KEY (request_id) REFERENCES service_requests(request_id) ON DELETE SET NULL,
    INDEX idx_provider (provider_id),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 8. SEASONAL ALERTS (for planning)
-- ================================================================
CREATE TABLE seasonal_alerts (
    alert_id INT PRIMARY KEY AUTO_INCREMENT,
    alert_type ENUM('labor', 'equipment', 'materials', 'support') NOT NULL,
    severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    message TEXT NOT NULL,
    suggestion TEXT,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    regions JSON, -- ["Karnataka", "Tamil Nadu"]
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_alert_type (alert_type),
    INDEX idx_dates (valid_from, valid_to),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- SAMPLE DATA INSERTS
-- ================================================================

-- Sample Provider 1: Equipment Rental (JCB)
INSERT INTO service_providers (
    name, service_type, category, contact_info, location, district, state,
    description, rating, verified, availability, reviews_count, grok_score, status
) VALUES (
    'Kumar Earth Movers',
    'equipment',
    'JCB',
    JSON_OBJECT('phone', '+91 98765 43210', 'email', 'kumar.earthmovers@gmail.com', 'whatsapp', '+91 98765 43210'),
    'Mandya, Karnataka',
    'Mandya',
    'Karnataka',
    'Professional earth moving services with modern JCB equipment. 10+ years experience in farm land preparation.',
    4.8,
    TRUE,
    'available',
    156,
    92,
    'approved'
);

-- Equipment details for Kumar Earth Movers
INSERT INTO equipment_details (
    provider_id, equipment_type, model, hourly_rate, daily_rate,
    operator_included, delivery_available,
    availability, specifications
) VALUES (
    1,
    'JCB',
    'JCB 3DX Super',
    1200,
    8000,
    TRUE,
    TRUE,
    JSON_OBJECT('dates', JSON_ARRAY('2025-10-23', '2025-10-24', '2025-10-25'), 'status', 'available'),
    JSON_OBJECT('power', '100HP', 'capacity', '5 ton', 'features', JSON_ARRAY('GPS Tracking', 'Air Conditioning'))
);

-- Sample Provider 2: Seller (Seeds)
INSERT INTO service_providers (
    name, service_type, category, contact_info, location, district, state,
    description, rating, verified, availability, reviews_count, grok_score, status
) VALUES (
    'Karnataka Seed Corporation',
    'seller',
    'Seeds - Hybrid',
    JSON_OBJECT('phone', '+91 99876 54321', 'email', 'ksc@example.com'),
    'Mysuru, Karnataka',
    'Mysuru',
    'Karnataka',
    'Government certified hybrid seeds with high yield guarantee. All major crops available.',
    4.6,
    TRUE,
    'available',
    234,
    88,
    'approved'
);

-- Seller products for Karnataka Seed Corporation
INSERT INTO seller_products (
    provider_id, product_category, product_name, price_per_unit,
    available_quantity, units, stock_status,
    certifications
) VALUES (
    2,
    'Seeds',
    'Tomato Hybrid Seeds - Premium',
    450,
    500,
    'kg',
    'in_stock',
    JSON_ARRAY('Seed Certification', 'Quality Assured', 'Government Approved')
);

-- Sample Provider 3: Labor (Unskilled Group)
INSERT INTO service_providers (
    name, service_type, category, contact_info, location, district, state,
    description, rating, verified, availability, reviews_count, grok_score, status
) VALUES (
    'Karnataka Farm Labor Association',
    'labor',
    'Unskilled Labor - Group',
    JSON_OBJECT('phone', '+91 99876 54321', 'email', 'kfla@example.com'),
    'Mysuru, Karnataka',
    'Mysuru',
    'Karnataka',
    'Reliable labor pool of 500+ workers. Available for seasonal work and general farm labor.',
    4.6,
    TRUE,
    'available',
    234,
    88,
    'approved'
);

-- Labor details for Karnataka Farm Labor Association
INSERT INTO labor_details (
    provider_id, labor_type, skills, hourly_rate, daily_rate,
    available_from, available_to, total_workers, group_size_min, group_size_max
) VALUES (
    3,
    'Unskilled',
    'Manual Labor, Harvesting, Planting, Weeding, Farm Maintenance',
    50,
    400,
    '2025-10-22',
    '2026-03-31',
    500,
    10,
    100
);

-- Sample Provider 4: Worker Housing
INSERT INTO service_providers (
    name, service_type, category, contact_info, location, district, state,
    description, rating, verified, availability, reviews_count, grok_score, status
) VALUES (
    'Farm Worker Housing - Mandya',
    'housing',
    'Worker Housing',
    JSON_OBJECT('phone', '+91 95432 10987', 'email', 'farmhousing@example.com'),
    'Mandya, Karnataka',
    'Mandya',
    'Karnataka',
    'Clean and safe temporary housing for seasonal workers. Capacity: 50 workers.',
    4.4,
    TRUE,
    'available',
    78,
    86,
    'approved'
);

-- Worker support details
INSERT INTO worker_support_services (
    provider_id, support_type, description, contact_info,
    capacity, rate_per_person, amenities
) VALUES (
    4,
    'Housing',
    'Dormitory style housing with basic amenities. Meals available on request.',
    JSON_OBJECT('phone', '+91 95432 10987', 'manager', 'Ravi Kumar'),
    50,
    150,
    JSON_ARRAY('Clean Bedding', 'Toilets', 'Kitchen', 'Water', 'Security')
);

-- Sample Seasonal Alert
INSERT INTO seasonal_alerts (
    alert_type, severity, message, suggestion,
    valid_from, valid_to, regions, is_active
) VALUES (
    'labor',
    'high',
    'Labor scarcity expected during harvest season (Nov-Dec)',
    'Book labor services 2 weeks in advance',
    '2025-10-22',
    '2025-12-31',
    JSON_ARRAY('Karnataka', 'Tamil Nadu', 'Andhra Pradesh'),
    TRUE
),
(
    'equipment',
    'medium',
    'High demand for harvesters in next 2 weeks',
    'Pre-book equipment to ensure availability',
    '2025-10-22',
    '2025-11-15',
    JSON_ARRAY('Karnataka'),
    TRUE
);

-- ================================================================
-- VIEWS FOR COMMON QUERIES
-- ================================================================

-- View: Top Rated Providers
CREATE OR REPLACE VIEW v_top_rated_providers AS
SELECT 
    provider_id,
    name,
    service_type,
    category,
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

-- View: Available Equipment
CREATE OR REPLACE VIEW v_available_equipment AS
SELECT 
    sp.provider_id,
    sp.name AS provider_name,
    sp.location,
    sp.district,
    sp.rating,
    sp.verified,
    ed.equipment_type,
    ed.model,
    ed.hourly_rate,
    ed.daily_rate,
    ed.operator_included,
    ed.delivery_available
FROM service_providers sp
JOIN equipment_details ed ON sp.provider_id = ed.provider_id
WHERE sp.availability = 'available' AND sp.status = 'approved';

-- View: In Stock Products
CREATE OR REPLACE VIEW v_available_products AS
SELECT 
    sp.provider_id,
    sp.name AS seller_name,
    sp.location,
    sp.district,
    sp.rating,
    sp.verified,
    p.product_category,
    p.product_name,
    p.price_per_unit,
    p.units,
    p.available_quantity,
    p.stock_status
FROM service_providers sp
JOIN seller_products p ON sp.provider_id = sp.provider_id
WHERE p.stock_status IN ('in_stock', 'low_stock') AND sp.status = 'approved';

-- ================================================================
-- STORED PROCEDURES
-- ================================================================

DELIMITER //

-- Update provider rating based on reviews
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

-- Get nearby providers by location
CREATE PROCEDURE get_nearby_providers(
    IN p_district VARCHAR(100),
    IN p_state VARCHAR(100),
    IN p_service_type VARCHAR(50)
)
BEGIN
    SELECT *
    FROM service_providers
    WHERE district = p_district
    AND state = p_state
    AND service_type = p_service_type
    AND status = 'approved'
    AND availability = 'available'
    ORDER BY rating DESC, grok_score DESC;
END //

-- Create service request with validation
CREATE PROCEDURE create_service_request(
    IN p_producer_id INT,
    IN p_provider_id INT,
    IN p_service_type VARCHAR(100),
    IN p_description TEXT,
    IN p_location VARCHAR(255),
    IN p_start_date DATE,
    IN p_budget DECIMAL(12,2),
    IN p_urgency ENUM('low', 'medium', 'high'),
    OUT p_request_id INT
)
BEGIN
    INSERT INTO service_requests (
        producer_id, provider_id, service_type,
        request_description, location, start_date,
        budget, urgency
    ) VALUES (
        p_producer_id, p_provider_id, p_service_type,
        p_description, p_location, p_start_date,
        p_budget, p_urgency
    );
    
    SET p_request_id = LAST_INSERT_ID();
END //

DELIMITER ;

-- ================================================================
-- PERFORMANCE INDEXES
-- ================================================================

-- Composite indexes for common query patterns
CREATE INDEX idx_provider_service_rating ON service_providers(service_type, rating DESC);
CREATE INDEX idx_provider_location_service ON service_providers(district, state, service_type);
CREATE INDEX idx_requests_producer_status ON service_requests(producer_id, status);

-- ================================================================
-- END OF SCHEMA
-- ================================================================
