-- ============================================================================
-- TRADIE Producer System - Complete MySQL Database Schema
-- Version: 3.0
-- Compatible with: MySQL 8.0+, MariaDB 10.5+
-- Created: October 21, 2025
-- ============================================================================

-- Drop existing tables (in reverse dependency order)
DROP TABLE IF EXISTS evidence;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS health_issues;
DROP TABLE IF EXISTS crop_health;
DROP TABLE IF EXISTS alerts;
DROP TABLE IF EXISTS schedule;
DROP TABLE IF EXISTS storage;
DROP TABLE IF EXISTS varieties;
DROP TABLE IF EXISTS crops;
DROP TABLE IF EXISTS plots;
DROP TABLE IF EXISTS producers;
DROP TABLE IF EXISTS users;

-- ============================================================================
-- 1. USERS TABLE (Authentication & User Management)
-- ============================================================================
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Account Info
    account_type ENUM('producer', 'trader', 'buyer', 'advisor', 'admin') NOT NULL,
    role VARCHAR(50),
    
    -- Profile
    full_name VARCHAR(255),
    profile_image_url TEXT,
    language_preference VARCHAR(10) DEFAULT 'en',
    
    -- Authentication
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT TRUE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    
    -- Status
    account_status VARCHAR(50) DEFAULT 'active',
    kyc_completed BOOLEAN DEFAULT FALSE,
    
    -- Security
    last_login DATETIME,
    login_count INT DEFAULT 0,
    failed_login_attempts INT DEFAULT 0,
    password_changed_at DATETIME,
    
    -- Metadata
    signup_source VARCHAR(100),
    device_info JSON,
    ip_address VARCHAR(45),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_phone (phone_number),
    INDEX idx_email (email),
    INDEX idx_account_type (account_type),
    INDEX idx_status (account_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 2. PRODUCERS TABLE (Producer Profile & Farm Information)
-- ============================================================================
CREATE TABLE producers (
    producer_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    
    -- Personal Information
    name VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(255),
    
    -- Location (stored as JSON for flexibility)
    location JSON NOT NULL, -- {state, district, village, pincode, gps_coords}
    
    -- Farm Details
    farm_size DECIMAL(10,2),
    farm_unit VARCHAR(20) DEFAULT 'acres',
    farm_address TEXT,
    
    -- Preferences (stored as JSON)
    preferences JSON, -- {language, notifications, theme, etc.}
    
    -- KYC Status
    kyc_status VARCHAR(50) DEFAULT 'pending',
    kyc_documents JSON,
    
    -- Bank Details (encrypted in application)
    bank_details JSON, -- {account_number, ifsc, bank_name, upi_id}
    
    -- Certifications
    certifications JSON, -- Array of certification objects
    
    -- Rating & Stats
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_trades INT DEFAULT 0,
    total_earnings DECIMAL(12,2) DEFAULT 0.00,
    
    -- Blockchain
    nft_wallet_address VARCHAR(255),
    blockchain_verified BOOLEAN DEFAULT FALSE,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    
    INDEX idx_user (user_id),
    INDEX idx_kyc_status (kyc_status),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 3. PLOTS TABLE (Land/Field Management)
-- ============================================================================
CREATE TABLE plots (
    plot_id INT PRIMARY KEY AUTO_INCREMENT,
    producer_id INT NOT NULL,
    
    -- Plot Information
    plot_name VARCHAR(255) NOT NULL,
    geo_location JSON, -- {lat, lng, boundaries}
    total_area DECIMAL(10,2) NOT NULL,
    area_unit VARCHAR(20) DEFAULT 'acres',
    
    -- Soil & Irrigation
    soil_type VARCHAR(100),
    irrigation_type VARCHAR(100), -- drip, flood, sprinkler, rain-fed
    
    -- Crops
    crops_grown JSON, -- Array of crop IDs
    
    -- Status
    plot_status VARCHAR(50) DEFAULT 'active',
    ownership_proof JSON,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE,
    
    INDEX idx_producer (producer_id),
    INDEX idx_status (plot_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 4. CROPS TABLE (Crop Cultivation Records)
-- ============================================================================
CREATE TABLE crops (
    crop_id INT PRIMARY KEY AUTO_INCREMENT,
    producer_id INT NOT NULL,
    plot_id INT,
    
    -- Crop Details
    category VARCHAR(100) NOT NULL,
    commodity_name VARCHAR(255) NOT NULL,
    variety VARCHAR(255) NOT NULL,
    area DECIMAL(10,2) NOT NULL,
    area_unit VARCHAR(20) DEFAULT 'acres',
    
    -- Intercropping
    has_intercrop BOOLEAN DEFAULT FALSE,
    intercrop_id INT,
    intercrop_proportion DECIMAL(5,2),
    
    -- Dates
    sowing_date DATE,
    expected_harvest_date DATE,
    actual_harvest_date DATE,
    
    -- Yields
    expected_yield DECIMAL(10,2),
    actual_yield DECIMAL(10,2),
    yield_unit VARCHAR(20) DEFAULT 'quintals',
    
    -- Stages & Health
    current_stage VARCHAR(50),
    health_score INT DEFAULT 0,
    quality_grade VARCHAR(20),
    
    -- NFT Integration
    nft_tokenized BOOLEAN DEFAULT FALSE,
    nft_token_id VARCHAR(255),
    qr_code_url TEXT,
    
    -- Metadata
    metadata JSON,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE,
    FOREIGN KEY (plot_id) REFERENCES plots(plot_id) ON DELETE SET NULL,
    FOREIGN KEY (intercrop_id) REFERENCES crops(crop_id) ON DELETE SET NULL,
    
    INDEX idx_producer (producer_id),
    INDEX idx_plot (plot_id),
    INDEX idx_category (category),
    INDEX idx_stage (current_stage),
    INDEX idx_nft (nft_tokenized),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 5. VARIETIES TABLE (Crop Varieties Reference Data)
-- ============================================================================
CREATE TABLE varieties (
    variety_id INT PRIMARY KEY AUTO_INCREMENT,
    crop_name VARCHAR(255) NOT NULL,
    variety_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    
    -- Traits (stored as JSON)
    traits JSON, -- {duration, yield_potential, disease_resistance, etc.}
    
    -- Recommendations
    recommended_area VARCHAR(255),
    seed_rate DECIMAL(10,2),
    spacing VARCHAR(100),
    
    -- Schedules (stored as JSON)
    fertilizer_schedule JSON,
    irrigation_schedule JSON,
    
    -- Additional Info
    description TEXT,
    image_url TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_variety (crop_name, variety_name),
    INDEX idx_crop (crop_name),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 6. ACTIVITIES TABLE (Day-to-Day Activity Logging)
-- ============================================================================
CREATE TABLE activities (
    activity_id INT PRIMARY KEY AUTO_INCREMENT,
    crop_id INT NOT NULL,
    producer_id INT NOT NULL,
    
    -- Activity Details
    activity_type VARCHAR(100) NOT NULL,
    sub_type VARCHAR(100),
    activity_date DATE NOT NULL,
    completed BOOLEAN DEFAULT TRUE,
    status VARCHAR(50) DEFAULT 'completed',
    
    -- Common Fields
    remarks TEXT,
    voice_note_url TEXT,
    
    -- Ploughing
    ploughing_method VARCHAR(50),
    
    -- Sowing
    sowing_method VARCHAR(50),
    seed_source VARCHAR(255),
    seed_variety VARCHAR(255),
    
    -- Irrigation
    irrigation_type VARCHAR(50),
    water_volume DECIMAL(10,2),
    water_unit VARCHAR(20),
    
    -- Fertilizer
    fertilizer_type VARCHAR(50),
    n_value DECIMAL(5,2),
    p_value DECIMAL(5,2),
    k_value DECIMAL(5,2),
    fertilizer_name VARCHAR(255),
    dosage VARCHAR(100),
    application_method VARCHAR(100),
    
    -- Pesticide
    pesticide_type VARCHAR(50),
    chemical_name VARCHAR(255),
    pesticide_dosage VARCHAR(100),
    pesticide_method VARCHAR(100),
    pre_harvest_interval INT,
    
    -- Weeding
    weeding_method VARCHAR(50),
    time_taken DECIMAL(5,2),
    
    -- Mulching
    mulching_type VARCHAR(100),
    mulching_reason TEXT,
    
    -- Intercultural
    intercultural_operation VARCHAR(100),
    
    -- Pest Scouting
    symptoms TEXT,
    action_taken TEXT,
    
    -- Health Check
    crop_height DECIMAL(10,2),
    leaf_color VARCHAR(100),
    biomass_index VARCHAR(50),
    growth_stage VARCHAR(50),
    health_notes TEXT,
    
    -- Pruning
    pruning_method VARCHAR(100),
    
    -- Harvesting
    harvest_type VARCHAR(50),
    yield_estimate DECIMAL(10,2),
    yield_unit VARCHAR(20),
    actual_yield DECIMAL(10,2),
    
    -- Post-Harvest
    post_harvest_activity VARCHAR(50),
    location VARCHAR(255),
    output VARCHAR(255),
    sale_price DECIMAL(10,2),
    
    -- Inspection
    inspected_by VARCHAR(255),
    inspection_purpose VARCHAR(100),
    inspection_notes TEXT,
    
    -- AI Analysis
    ai_warnings JSON,
    ai_suggestions JSON,
    risk_level VARCHAR(20),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (crop_id) REFERENCES crops(crop_id) ON DELETE CASCADE,
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE,
    
    INDEX idx_crop (crop_id),
    INDEX idx_producer (producer_id),
    INDEX idx_type (activity_type),
    INDEX idx_date (activity_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 7. EVIDENCE TABLE (Media Files for Activities)
-- ============================================================================
CREATE TABLE evidence (
    evidence_id INT PRIMARY KEY AUTO_INCREMENT,
    activity_id INT NOT NULL,
    
    -- Media Details
    media_type ENUM('photo', 'video', 'voice') NOT NULL,
    file_url TEXT NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    
    -- Additional Info
    caption TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    gps_location JSON,
    metadata JSON,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE CASCADE,
    
    INDEX idx_activity (activity_id),
    INDEX idx_type (media_type),
    INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 8. CROP_HEALTH TABLE (Health Monitoring Metrics)
-- ============================================================================
CREATE TABLE crop_health (
    health_id INT PRIMARY KEY AUTO_INCREMENT,
    crop_id INT NOT NULL,
    
    -- Health Details
    check_date DATE NOT NULL,
    health_score INT NOT NULL,
    status VARCHAR(50),
    
    -- Metrics
    soil_moisture DECIMAL(5,2),
    leaf_color_index DECIMAL(5,2),
    plant_height DECIMAL(10,2),
    biomass_index DECIMAL(5,2),
    pest_pressure DECIMAL(5,2),
    disease_risk DECIMAL(5,2),
    
    -- Issues & Recommendations
    active_issues JSON,
    recommendations JSON,
    
    -- Weather
    temperature DECIMAL(5,2),
    humidity DECIMAL(5,2),
    rainfall DECIMAL(10,2),
    weather_forecast VARCHAR(50),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (crop_id) REFERENCES crops(crop_id) ON DELETE CASCADE,
    
    INDEX idx_crop (crop_id),
    INDEX idx_date (check_date DESC),
    INDEX idx_score (health_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 9. HEALTH_ISSUES TABLE (Specific Crop Health Issues)
-- ============================================================================
CREATE TABLE health_issues (
    issue_id INT PRIMARY KEY AUTO_INCREMENT,
    crop_id INT NOT NULL,
    health_check_id INT,
    
    -- Issue Details
    issue_type ENUM('pest', 'disease', 'nutrient', 'water', 'weather') NOT NULL,
    severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    action_required BOOLEAN DEFAULT FALSE,
    
    -- Dates
    detected_date DATE NOT NULL,
    resolved_date DATE,
    resolution_notes TEXT,
    
    -- Status
    status VARCHAR(50) DEFAULT 'active',
    
    -- Evidence
    evidence_ids JSON,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (crop_id) REFERENCES crops(crop_id) ON DELETE CASCADE,
    FOREIGN KEY (health_check_id) REFERENCES crop_health(health_id) ON DELETE CASCADE,
    
    INDEX idx_crop (crop_id),
    INDEX idx_type (issue_type),
    INDEX idx_severity (severity),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 10. ALERTS TABLE (Notifications & System Alerts)
-- ============================================================================
CREATE TABLE alerts (
    alert_id INT PRIMARY KEY AUTO_INCREMENT,
    producer_id INT NOT NULL,
    crop_id INT,
    activity_id INT,
    
    -- Alert Details
    alert_type VARCHAR(100) NOT NULL,
    severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    action_required BOOLEAN DEFAULT FALSE,
    
    -- Status
    status VARCHAR(50) DEFAULT 'active',
    acknowledged_at DATETIME,
    resolved_at DATETIME,
    
    -- Metadata
    metadata JSON,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE,
    FOREIGN KEY (crop_id) REFERENCES crops(crop_id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(activity_id) ON DELETE SET NULL,
    
    INDEX idx_producer (producer_id),
    INDEX idx_crop (crop_id),
    INDEX idx_severity (severity),
    INDEX idx_status (status),
    INDEX idx_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 11. STORAGE TABLE (Inventory Management)
-- ============================================================================
CREATE TABLE storage (
    storage_id INT PRIMARY KEY AUTO_INCREMENT,
    producer_id INT NOT NULL,
    crop_id INT,
    
    -- Commodity Details
    commodity VARCHAR(255) NOT NULL,
    variety VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    
    -- Quality
    grade VARCHAR(50),
    quality_score INT,
    status VARCHAR(50),
    
    -- Storage Details
    location VARCHAR(255) NOT NULL,
    storage_type VARCHAR(50),
    warehouse_id INT,
    
    -- Conditions
    temperature DECIMAL(5,2),
    humidity DECIMAL(5,2),
    pest_control BOOLEAN DEFAULT FALSE,
    fumigated BOOLEAN DEFAULT FALSE,
    last_inspection DATE,
    
    -- Dates
    entry_date DATE NOT NULL,
    expiry_date DATE,
    
    -- Valuation
    estimated_value DECIMAL(12,2),
    market_price_per_unit DECIMAL(10,2),
    
    -- Certifications
    certifications JSON,
    certification_docs JSON,
    
    -- NFT Integration
    nft_tokenized BOOLEAN DEFAULT FALSE,
    nft_token_id VARCHAR(255),
    qr_code_url TEXT,
    
    -- Metadata
    metadata JSON,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE,
    FOREIGN KEY (crop_id) REFERENCES crops(crop_id) ON DELETE SET NULL,
    
    INDEX idx_producer (producer_id),
    INDEX idx_crop (crop_id),
    INDEX idx_commodity (commodity),
    INDEX idx_status (status),
    INDEX idx_nft (nft_tokenized),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 12. SCHEDULE TABLE (Activity Planning & Reminders)
-- ============================================================================
CREATE TABLE schedule (
    schedule_id INT PRIMARY KEY AUTO_INCREMENT,
    crop_id INT NOT NULL,
    producer_id INT NOT NULL,
    
    -- Activity Details
    planned_activity VARCHAR(100) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    
    description TEXT,
    
    -- Reminders
    reminder_sent BOOLEAN DEFAULT FALSE,
    reminder_date DATE,
    
    -- Completion
    completed_activity_id INT,
    completed_date DATE,
    
    -- Recurrence
    recurring BOOLEAN DEFAULT FALSE,
    recurrence_pattern VARCHAR(50),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (crop_id) REFERENCES crops(crop_id) ON DELETE CASCADE,
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE,
    FOREIGN KEY (completed_activity_id) REFERENCES activities(activity_id) ON DELETE SET NULL,
    
    INDEX idx_crop (crop_id),
    INDEX idx_producer (producer_id),
    INDEX idx_due_date (due_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SAMPLE DATA INSERTION
-- ============================================================================

-- Sample User
INSERT INTO users (phone_number, email, password_hash, account_type, full_name, language_preference) VALUES
('+919876543210', 'rajesh@example.com', '$2b$10$sample_hash', 'producer', 'Rajesh Kumar', 'en');

-- Sample Producer
INSERT INTO producers (user_id, name, contact_phone, location, farm_size, farm_unit, kyc_status) VALUES
(1, 'Rajesh Kumar', '+919876543210', 
 '{"state":"Punjab","district":"Ludhiana","village":"Kila Raipur","pincode":"141118"}',
 15.00, 'acres', 'verified');

-- Sample Plot
INSERT INTO plots (producer_id, plot_name, total_area, area_unit, soil_type, irrigation_type) VALUES
(1, 'North Field', 5.00, 'acres', 'Loamy', 'Flood');

-- Sample Crop
INSERT INTO crops (producer_id, plot_id, category, commodity_name, variety, area, sowing_date, current_stage) VALUES
(1, 1, 'Grains', 'Wheat', 'PBW 343', 5.00, '2025-11-15', 'planning');

-- Sample Variety Reference
INSERT INTO varieties (crop_name, variety_name, category, recommended_area, description) VALUES
('Wheat', 'PBW 343', 'Grains', 'Punjab, Haryana, UP', 'High-yielding wheat variety suitable for irrigated conditions');

-- ============================================================================
-- USEFUL QUERIES
-- ============================================================================

-- Get Producer Dashboard Summary
-- SELECT 
--   p.producer_id,
--   p.name,
--   COUNT(DISTINCT c.crop_id) as active_crops,
--   COUNT(DISTINCT a.activity_id) as total_activities,
--   COUNT(DISTINCT al.alert_id) as active_alerts,
--   SUM(s.estimated_value) as inventory_value
-- FROM producers p
-- LEFT JOIN crops c ON p.producer_id = c.producer_id AND c.is_active = TRUE
-- LEFT JOIN activities a ON c.crop_id = a.crop_id
-- LEFT JOIN alerts al ON p.producer_id = al.producer_id AND al.status = 'active'
-- LEFT JOIN storage s ON p.producer_id = s.producer_id AND s.is_active = TRUE
-- WHERE p.producer_id = 1
-- GROUP BY p.producer_id;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
