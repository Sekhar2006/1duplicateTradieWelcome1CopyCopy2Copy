-- ============================================================================
-- TRADIE Crop Batch Provenance & Tokenization Database Schema
-- Version: 1.0
-- Compatible with: MySQL 8.0+, MariaDB 10.5+
-- Created: October 22, 2025
-- ============================================================================

-- ============================================================================
-- 1. CROP BATCHES TABLE
-- Stores individual crop batch information with unique IDs
-- ============================================================================
CREATE TABLE IF NOT EXISTS crop_batches (
    batch_id INT PRIMARY KEY AUTO_INCREMENT,
    crop_batch_id VARCHAR(100) UNIQUE NOT NULL,
    producer_id INT NOT NULL,
    
    -- Crop Details
    category VARCHAR(100) NOT NULL,
    variety VARCHAR(100) NOT NULL,
    
    -- Location
    farm_location JSON,
    
    -- Dates
    planting_date DATE,
    estimated_harvest_date DATE,
    actual_harvest_date DATE,
    
    -- Quantity
    initial_quantity DECIMAL(10,2),
    quantity_unit VARCHAR(20) DEFAULT 'kg',
    
    -- Quality
    quality_grade VARCHAR(10),
    
    -- Status Tracking
    current_stage ENUM('planting', 'growing', 'harvesting', 'grading', 'processing', 'packing', 'tokenized', 'delivered') DEFAULT 'planting',
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_crop_batch_id (crop_batch_id),
    INDEX idx_producer (producer_id),
    INDEX idx_category (category),
    INDEX idx_variety (variety),
    INDEX idx_status (status),
    INDEX idx_stage (current_stage),
    INDEX idx_created_at (created_at),
    
    -- Foreign Key
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 2. CROP BATCH HISTORY TABLE
-- Tracks all events/stages in crop batch lifecycle
-- ============================================================================
CREATE TABLE IF NOT EXISTS crop_batch_history (
    history_id INT PRIMARY KEY AUTO_INCREMENT,
    crop_batch_id VARCHAR(100) NOT NULL,
    
    -- Event Details
    stage ENUM('planting', 'growing', 'harvesting', 'grading', 'processing', 'packing', 'tokenized', 'delivered') NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Event Data (stage-specific information stored as JSON)
    data JSON,
    
    -- Metadata
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(50),
    
    -- Indexes
    INDEX idx_crop_batch (crop_batch_id),
    INDEX idx_stage (stage),
    INDEX idx_timestamp (timestamp),
    
    -- Foreign Key
    FOREIGN KEY (crop_batch_id) REFERENCES crop_batches(crop_batch_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 3. CROP BATCH TOKENS TABLE (NFT/QR)
-- Stores tokenization data and QR codes for crop batches
-- ============================================================================
CREATE TABLE IF NOT EXISTS crop_batch_tokens (
    token_record_id INT PRIMARY KEY AUTO_INCREMENT,
    token_id VARCHAR(100) UNIQUE NOT NULL,
    crop_batch_id VARCHAR(100) NOT NULL,
    producer_id INT NOT NULL,
    
    -- Token Details
    category VARCHAR(100) NOT NULL,
    variety VARCHAR(100) NOT NULL,
    quality_grade VARCHAR(10),
    
    -- QR Code
    qr_code_url TEXT NOT NULL,
    qr_code_data LONGTEXT,
    
    -- Metadata
    metadata JSON,
    
    -- Tracking
    scan_count INT DEFAULT 0,
    last_scanned_at TIMESTAMP NULL,
    
    -- Status
    status ENUM('active', 'revoked', 'expired') DEFAULT 'active',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    
    -- Indexes
    INDEX idx_token_id (token_id),
    INDEX idx_crop_batch (crop_batch_id),
    INDEX idx_producer (producer_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    
    -- Foreign Keys
    FOREIGN KEY (crop_batch_id) REFERENCES crop_batches(crop_batch_id) ON DELETE CASCADE,
    FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 4. TOKEN VERIFICATIONS TABLE
-- Tracks when and where tokens are scanned/verified
-- ============================================================================
CREATE TABLE IF NOT EXISTS token_verifications (
    verification_id INT PRIMARY KEY AUTO_INCREMENT,
    token_id VARCHAR(100) NOT NULL,
    
    -- Verification Details
    verified_by VARCHAR(100),
    verification_type ENUM('qr_scan', 'manual_lookup', 'api_call') DEFAULT 'qr_scan',
    
    -- Location (GPS coordinates, address, etc.)
    location JSON,
    
    -- User Agent / Device Info
    device_info JSON,
    
    -- Timestamp
    verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_token (token_id),
    INDEX idx_verified_at (verified_at),
    
    -- Foreign Key
    FOREIGN KEY (token_id) REFERENCES crop_batch_tokens(token_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 5. PROVENANCE DOCUMENTS TABLE
-- Stores certificates, reports, and documents linked to crop batches
-- ============================================================================
CREATE TABLE IF NOT EXISTS provenance_documents (
    document_id INT PRIMARY KEY AUTO_INCREMENT,
    crop_batch_id VARCHAR(100) NOT NULL,
    
    -- Document Details
    document_type ENUM('quality_certificate', 'lab_report', 'organic_certificate', 'photo', 'video', 'other') NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_url TEXT NOT NULL,
    
    -- File Info
    file_size INT,
    mime_type VARCHAR(100),
    
    -- Metadata
    description TEXT,
    uploaded_by VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_crop_batch (crop_batch_id),
    INDEX idx_document_type (document_type),
    INDEX idx_uploaded_at (uploaded_at),
    
    -- Foreign Key
    FOREIGN KEY (crop_batch_id) REFERENCES crop_batches(crop_batch_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 6. VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View: Complete crop batch overview with token info
CREATE OR REPLACE VIEW vw_crop_batches_complete AS
SELECT 
    cb.*,
    p.name as producer_name,
    p.contact_phone as producer_contact,
    p.location as producer_location,
    t.token_id,
    t.qr_code_url,
    t.scan_count,
    t.last_scanned_at,
    (SELECT COUNT(*) FROM crop_batch_history WHERE crop_batch_id = cb.crop_batch_id) as history_count,
    (SELECT COUNT(*) FROM provenance_documents WHERE crop_batch_id = cb.crop_batch_id) as document_count
FROM crop_batches cb
LEFT JOIN producers p ON cb.producer_id = p.producer_id
LEFT JOIN crop_batch_tokens t ON cb.crop_batch_id = t.crop_batch_id;

-- View: Token verification statistics
CREATE OR REPLACE VIEW vw_token_stats AS
SELECT 
    t.token_id,
    t.crop_batch_id,
    t.category,
    t.variety,
    t.quality_grade,
    t.scan_count,
    t.created_at,
    p.name as producer_name,
    (SELECT COUNT(*) FROM token_verifications WHERE token_id = t.token_id) as verification_count,
    (SELECT MAX(verified_at) FROM token_verifications WHERE token_id = t.token_id) as last_verified_at
FROM crop_batch_tokens t
LEFT JOIN producers p ON t.producer_id = p.producer_id;

-- ============================================================================
-- 7. SAMPLE DATA (Optional - for testing)
-- ============================================================================

-- Sample crop batch
-- INSERT INTO crop_batches 
-- (crop_batch_id, producer_id, category, variety, farm_location, planting_date, estimated_harvest_date, initial_quantity, quantity_unit, current_stage, status)
-- VALUES 
-- ('CB-VEG-TOM-L5X7M2ABC', 1, 'Vegetables', 'Tomato', '{"state":"Karnataka","district":"Bangalore","village":"Whitefield"}', '2025-01-15', '2025-04-15', 500, 'kg', 'growing', 'active');

-- Sample history entry
-- INSERT INTO crop_batch_history 
-- (crop_batch_id, stage, event_type, description, data, created_by)
-- VALUES 
-- ('CB-VEG-TOM-L5X7M2ABC', 'planting', 'crop_batch_created', 'Crop batch created for Tomato', '{"variety":"Tomato","category":"Vegetables"}', '1');

-- ============================================================================
-- 8. STORED PROCEDURES (Optional - for common operations)
-- ============================================================================

DELIMITER //

-- Procedure: Get complete crop batch timeline
CREATE PROCEDURE sp_get_crop_batch_timeline(IN p_crop_batch_id VARCHAR(100))
BEGIN
    SELECT 
        h.history_id,
        h.stage,
        h.event_type,
        h.description,
        h.data,
        h.timestamp,
        h.created_by
    FROM crop_batch_history h
    WHERE h.crop_batch_id = p_crop_batch_id
    ORDER BY h.timestamp ASC;
END //

-- Procedure: Get producer provenance statistics
CREATE PROCEDURE sp_get_producer_provenance_stats(IN p_producer_id INT)
BEGIN
    SELECT 
        COUNT(*) as total_batches,
        COUNT(DISTINCT category) as unique_categories,
        COUNT(DISTINCT variety) as unique_varieties,
        SUM(CASE WHEN current_stage = 'tokenized' THEN 1 ELSE 0 END) as tokenized_batches,
        SUM(initial_quantity) as total_quantity
    FROM crop_batches
    WHERE producer_id = p_producer_id AND status = 'active';
END //

DELIMITER ;

-- ============================================================================
-- 9. TRIGGERS (Optional - for automatic updates)
-- ============================================================================

DELIMITER //

-- Trigger: Auto-update crop batch stage when history added
CREATE TRIGGER trg_update_batch_stage_after_history
AFTER INSERT ON crop_batch_history
FOR EACH ROW
BEGIN
    UPDATE crop_batches 
    SET current_stage = NEW.stage, updated_at = NOW()
    WHERE crop_batch_id = NEW.crop_batch_id;
END //

-- Trigger: Increment scan count on verification
CREATE TRIGGER trg_increment_scan_count
AFTER INSERT ON token_verifications
FOR EACH ROW
BEGIN
    UPDATE crop_batch_tokens 
    SET scan_count = scan_count + 1, last_scanned_at = NOW()
    WHERE token_id = NEW.token_id;
END //

DELIMITER ;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
