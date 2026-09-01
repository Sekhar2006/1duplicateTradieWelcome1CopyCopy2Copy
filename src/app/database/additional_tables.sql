-- ================================================================
-- TRADIE Platform - Additional Tables for Complete Integration
-- Version: 1.0
-- Date: October 22, 2025
-- Purpose: Users, documents, and other supporting tables
-- ================================================================

-- ================================================================
-- 1. USERS TABLE (Core authentication)
-- ================================================================
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('producer', 'provider', 'trader', 'buyer', 'admin') NOT NULL,
    phone VARCHAR(20),
    profile_image VARCHAR(500),
    
    -- Account status
    status ENUM('active', 'inactive', 'suspended', 'pending') DEFAULT 'pending',
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    
    -- Authentication
    refresh_token TEXT,
    otp VARCHAR(6),
    otp_expires_at TIMESTAMP NULL,
    reset_token VARCHAR(255),
    reset_token_expires_at TIMESTAMP NULL,
    
    -- Activity tracking
    last_login TIMESTAMP NULL,
    login_count INT DEFAULT 0,
    failed_login_attempts INT DEFAULT 0,
    last_failed_login TIMESTAMP NULL,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status),
    INDEX idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 2. DOCUMENTS TABLE (File storage metadata)
-- ================================================================
CREATE TABLE IF NOT EXISTS documents (
    document_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    provider_id INT,
    
    -- Document info
    document_type ENUM('license', 'certificate', 'id_proof', 'address_proof', 'contract', 'other') NOT NULL,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    filepath VARCHAR(500) NOT NULL,
    filesize INT NOT NULL, -- in bytes
    mime_type VARCHAR(100),
    
    -- S3 info (if using cloud storage)
    s3_bucket VARCHAR(255),
    s3_key VARCHAR(500),
    s3_url VARCHAR(1000),
    
    -- Verification
    verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    verified_by INT,
    verified_at TIMESTAMP NULL,
    rejection_reason TEXT,
    
    -- Metadata
    description TEXT,
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_provider (provider_id),
    INDEX idx_type (document_type),
    INDEX idx_verification (verification_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 3. PROVIDER AVAILABILITY TABLE (Enhanced)
-- ================================================================
CREATE TABLE IF NOT EXISTS provider_availability (
    availability_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    date DATE NOT NULL,
    status ENUM('available', 'partially_booked', 'fully_booked', 'unavailable') DEFAULT 'available',
    
    -- Slot management
    available_slots INT DEFAULT 1,
    booked_slots INT DEFAULT 0,
    
    -- Time slots (JSON array)
    time_slots JSON, -- [{"start": "09:00", "end": "12:00", "available": true}]
    
    -- Notes
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    UNIQUE KEY unique_provider_date (provider_id, date),
    INDEX idx_provider_date (provider_id, date),
    INDEX idx_status (status),
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 4. NOTIFICATIONS TABLE
-- ================================================================
CREATE TABLE IF NOT EXISTS notifications (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    
    -- Notification content
    type ENUM('service_request', 'booking', 'payment', 'review', 'alert', 'system') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Related entities
    related_type VARCHAR(50), -- 'service_request', 'provider', etc.
    related_id INT,
    
    -- Status
    read_status BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    
    -- Delivery
    delivery_method ENUM('in_app', 'email', 'sms', 'push') NOT NULL DEFAULT 'in_app',
    delivered BOOLEAN DEFAULT FALSE,
    delivered_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_read (user_id, read_status),
    INDEX idx_created (created_at),
    INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 5. PAYMENTS TABLE
-- ================================================================
CREATE TABLE IF NOT EXISTS payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    request_id INT NOT NULL,
    producer_id INT NOT NULL,
    provider_id INT NOT NULL,
    
    -- Amount
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    
    -- Payment details
    payment_method ENUM('cash', 'upi', 'card', 'bank_transfer', 'wallet') NOT NULL,
    transaction_id VARCHAR(255),
    payment_gateway VARCHAR(100),
    
    -- Status
    status ENUM('pending', 'processing', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    
    -- Timestamps
    initiated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    
    -- Additional info
    notes TEXT,
    receipt_url VARCHAR(500),
    
    FOREIGN KEY (request_id) REFERENCES service_requests(request_id) ON DELETE CASCADE,
    FOREIGN KEY (producer_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_request (request_id),
    INDEX idx_producer (producer_id),
    INDEX idx_provider (provider_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 6. SAVED PROVIDERS (Favorites/Bookmarks)
-- ================================================================
CREATE TABLE IF NOT EXISTS saved_providers (
    saved_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    provider_id INT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_provider (user_id, provider_id),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 7. SEARCH HISTORY (For autocomplete & recommendations)
-- ================================================================
CREATE TABLE IF NOT EXISTS search_history (
    search_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    search_query VARCHAR(500) NOT NULL,
    search_type VARCHAR(50), -- 'provider', 'equipment', 'labor', etc.
    filters JSON,
    results_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_query (search_query),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 8. ACTIVITY LOG (Audit trail)
-- ================================================================
CREATE TABLE IF NOT EXISTS activity_log (
    log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    
    -- Activity details
    action VARCHAR(100) NOT NULL, -- 'login', 'create_provider', 'update_request', etc.
    entity_type VARCHAR(50), -- 'provider', 'request', 'user', etc.
    entity_id INT,
    
    -- Request info
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    -- Details
    details JSON,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 9. EMAIL VERIFICATION TOKENS
-- ================================================================
CREATE TABLE IF NOT EXISTS email_verification_tokens (
    token_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user (user_id),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- 10. PROVIDER CERTIFICATIONS (Detailed tracking)
-- ================================================================
CREATE TABLE IF NOT EXISTS provider_certifications (
    certification_id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    
    -- Certification info
    certification_type ENUM('license', 'certificate', 'training', 'accreditation') NOT NULL,
    certification_name VARCHAR(255) NOT NULL,
    issuing_authority VARCHAR(255),
    registration_number VARCHAR(100),
    
    -- Validity
    issue_date DATE,
    expiry_date DATE,
    
    -- Document
    document_id INT,
    
    -- Verification
    verification_status ENUM('pending', 'verified', 'rejected', 'expired') DEFAULT 'pending',
    verified_by INT,
    verified_at TIMESTAMP NULL,
    
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (provider_id) REFERENCES service_providers(provider_id) ON DELETE CASCADE,
    FOREIGN KEY (document_id) REFERENCES documents(document_id) ON DELETE SET NULL,
    INDEX idx_provider (provider_id),
    INDEX idx_verification (verification_status),
    INDEX idx_expiry (expiry_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================================================
-- SAMPLE DATA
-- ================================================================

-- Sample admin user (password: Admin@123)
INSERT INTO users (email, password_hash, name, role, status, email_verified) VALUES
('admin@tradie.com', '$2a$10$XxXxXxXxXxXxXxXxXxXxXuXxXxXxXxXxXxXxXxXxXxXxXxXxXx', 'Admin User', 'admin', 'active', TRUE);

-- Sample producer user (password: Producer@123)
INSERT INTO users (email, password_hash, name, role, phone, status, email_verified) VALUES
('producer@tradie.com', '$2a$10$YyYyYyYyYyYyYyYyYyYyYuYyYyYyYyYyYyYyYyYyYyYyYyYyYy', 'Ram Kumar', 'producer', '+919876543210', 'active', TRUE);

-- Sample provider user (password: Provider@123)
INSERT INTO users (email, password_hash, name, role, phone, status, email_verified) VALUES
('provider@tradie.com', '$2a$10$ZzZzZzZzZzZzZzZzZzZzZuZzZzZzZzZzZzZzZzZzZzZzZzZzZz', 'Kumar Earth Movers', 'provider', '+919876543211', 'active', TRUE);

-- ================================================================
-- VIEWS
-- ================================================================

-- Active users summary
CREATE OR REPLACE VIEW v_active_users AS
SELECT 
    role,
    COUNT(*) as user_count,
    COUNT(CASE WHEN email_verified = TRUE THEN 1 END) as verified_count,
    COUNT(CASE WHEN last_login >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) as active_7days
FROM users
WHERE status = 'active'
GROUP BY role;

-- Recent activity summary
CREATE OR REPLACE VIEW v_recent_activity AS
SELECT 
    al.action,
    al.entity_type,
    u.name as user_name,
    u.role as user_role,
    al.created_at
FROM activity_log al
LEFT JOIN users u ON al.user_id = u.user_id
ORDER BY al.created_at DESC
LIMIT 100;

-- Pending verifications
CREATE OR REPLACE VIEW v_pending_verifications AS
SELECT 
    d.document_id,
    d.document_type,
    u.name as user_name,
    u.email,
    u.role,
    d.original_filename,
    d.created_at
FROM documents d
JOIN users u ON d.user_id = u.user_id
WHERE d.verification_status = 'pending'
ORDER BY d.created_at ASC;

-- ================================================================
-- STORED PROCEDURES
-- ================================================================

DELIMITER //

-- Create notification for user
CREATE PROCEDURE create_notification(
    IN p_user_id INT,
    IN p_type VARCHAR(50),
    IN p_title VARCHAR(255),
    IN p_message TEXT,
    IN p_related_type VARCHAR(50),
    IN p_related_id INT
)
BEGIN
    INSERT INTO notifications (user_id, type, title, message, related_type, related_id)
    VALUES (p_user_id, p_type, p_title, p_message, p_related_type, p_related_id);
END //

-- Log user activity
CREATE PROCEDURE log_activity(
    IN p_user_id INT,
    IN p_action VARCHAR(100),
    IN p_entity_type VARCHAR(50),
    IN p_entity_id INT,
    IN p_ip_address VARCHAR(45),
    IN p_details JSON
)
BEGIN
    INSERT INTO activity_log (user_id, action, entity_type, entity_id, ip_address, details)
    VALUES (p_user_id, p_action, p_entity_type, p_entity_id, p_ip_address, p_details);
END //

-- Get user statistics
CREATE PROCEDURE get_user_stats(IN p_user_id INT)
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM service_requests WHERE producer_id = p_user_id) as total_requests,
        (SELECT COUNT(*) FROM service_requests WHERE producer_id = p_user_id AND status = 'completed') as completed_requests,
        (SELECT COUNT(*) FROM saved_providers WHERE user_id = p_user_id) as saved_providers,
        (SELECT COUNT(*) FROM provider_reviews WHERE producer_id = p_user_id) as reviews_given,
        (SELECT SUM(amount) FROM payments WHERE producer_id = p_user_id AND status = 'completed') as total_spent;
END //

DELIMITER ;

-- ================================================================
-- TRIGGERS
-- ================================================================

DELIMITER //

-- Update provider rating when review is added
CREATE TRIGGER update_provider_rating_after_review
AFTER INSERT ON provider_reviews
FOR EACH ROW
BEGIN
    UPDATE service_providers
    SET rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM provider_reviews
        WHERE provider_id = NEW.provider_id
    ),
    reviews_count = (
        SELECT COUNT(*)
        FROM provider_reviews
        WHERE provider_id = NEW.provider_id
    )
    WHERE provider_id = NEW.provider_id;
END //

-- Prevent double booking
CREATE TRIGGER prevent_double_booking
BEFORE UPDATE ON provider_availability
FOR EACH ROW
BEGIN
    IF NEW.booked_slots > NEW.available_slots THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot book more slots than available';
    END IF;
END //

-- Auto-update user login count
CREATE TRIGGER update_login_count
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    IF NEW.last_login > OLD.last_login THEN
        SET NEW.login_count = OLD.login_count + 1;
    END IF;
END //

DELIMITER ;

-- ================================================================
-- PERFORMANCE INDEXES
-- ================================================================

-- Users - login and search
CREATE INDEX idx_users_email_status ON users(email, status);
CREATE INDEX idx_users_role_status ON users(role, status);

-- Documents - verification workflow
CREATE INDEX idx_documents_user_type ON documents(user_id, document_type);
CREATE INDEX idx_documents_verification ON documents(verification_status, created_at);

-- Notifications - user inbox
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, read_status, created_at);

-- Payments - financial reporting
CREATE INDEX idx_payments_status_date ON payments(status, completed_at);
CREATE INDEX idx_payments_producer_completed ON payments(producer_id, status, completed_at);

-- ================================================================
-- END OF ADDITIONAL TABLES
-- ================================================================
