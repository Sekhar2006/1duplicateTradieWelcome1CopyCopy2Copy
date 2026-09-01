# 🔄 Database Migration Guide - Simple to Complete Schema

## Overview
This guide helps migrate from the basic database schema to the comprehensive schema that supports all 7 screens.

---

## 📊 Schema Comparison

### Original Schema (10 tables)
- ✅ Basic structure
- ❌ Missing advanced features
- ❌ Limited field support
- ❌ No JSON flexibility

### Complete Schema (12 tables)
- ✅ Comprehensive structure
- ✅ All 7-screen features
- ✅ 200+ features supported
- ✅ JSON for flexible data

---

## 🔄 Migration Strategy

### Option 1: Fresh Installation (Recommended)
For new deployments or development environments.

```bash
# Backup existing data (if any)
mysqldump -u username -p database_name > backup.sql

# Drop existing database
mysql -u username -p -e "DROP DATABASE IF EXISTS tradie_producer;"

# Create new database
mysql -u username -p -e "CREATE DATABASE tradie_producer CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Import complete schema
mysql -u username -p tradie_producer < schema_mysql.sql
```

### Option 2: In-Place Migration
For existing deployments with data to preserve.

```bash
# Run migration script
mysql -u username -p tradie_producer < migration_scripts/migrate_v1_to_v3.sql
```

---

## 📋 Field-by-Field Changes

### 1. USERS Table

**New Fields Added:**
```sql
ALTER TABLE users
ADD COLUMN password_hash VARCHAR(255) AFTER email,
ADD COLUMN role VARCHAR(50) AFTER account_type,
ADD COLUMN full_name VARCHAR(255) AFTER role,
ADD COLUMN profile_image_url TEXT AFTER full_name,
ADD COLUMN language_preference VARCHAR(10) DEFAULT 'en' AFTER profile_image_url,
ADD COLUMN email_verified BOOLEAN DEFAULT FALSE AFTER language_preference,
ADD COLUMN phone_verified BOOLEAN DEFAULT TRUE AFTER email_verified,
ADD COLUMN two_factor_enabled BOOLEAN DEFAULT FALSE AFTER phone_verified,
ADD COLUMN account_status VARCHAR(50) DEFAULT 'active' AFTER two_factor_enabled,
ADD COLUMN kyc_completed BOOLEAN DEFAULT FALSE AFTER account_status,
ADD COLUMN last_login DATETIME AFTER kyc_completed,
ADD COLUMN login_count INT DEFAULT 0 AFTER last_login,
ADD COLUMN failed_login_attempts INT DEFAULT 0 AFTER login_count,
ADD COLUMN password_changed_at DATETIME AFTER failed_login_attempts,
ADD COLUMN signup_source VARCHAR(100) AFTER password_changed_at,
ADD COLUMN device_info JSON AFTER signup_source,
ADD COLUMN ip_address VARCHAR(45) AFTER device_info,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;
```

**Field Type Changes:**
```sql
ALTER TABLE users
MODIFY COLUMN account_type ENUM('producer', 'trader', 'buyer', 'advisor', 'admin') NOT NULL;
```

### 2. PRODUCERS Table

**New Fields Added:**
```sql
ALTER TABLE producers
ADD COLUMN user_id INT UNIQUE AFTER producer_id,
ADD COLUMN contact_phone VARCHAR(20) NOT NULL AFTER name,
ADD COLUMN contact_email VARCHAR(255) AFTER contact_phone,
ADD COLUMN farm_unit VARCHAR(20) DEFAULT 'acres' AFTER farm_size,
ADD COLUMN farm_address TEXT AFTER farm_unit,
ADD COLUMN kyc_status VARCHAR(50) DEFAULT 'pending' AFTER farm_address,
ADD COLUMN kyc_documents JSON AFTER kyc_status,
ADD COLUMN bank_details JSON AFTER kyc_documents,
ADD COLUMN certifications JSON AFTER bank_details,
ADD COLUMN rating DECIMAL(3,2) DEFAULT 0.00 AFTER certifications,
ADD COLUMN total_trades INT DEFAULT 0 AFTER rating,
ADD COLUMN total_earnings DECIMAL(12,2) DEFAULT 0.00 AFTER total_trades,
ADD COLUMN nft_wallet_address VARCHAR(255) AFTER total_earnings,
ADD COLUMN blockchain_verified BOOLEAN DEFAULT FALSE AFTER nft_wallet_address,
ADD COLUMN is_active BOOLEAN DEFAULT TRUE AFTER blockchain_verified,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER is_active,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;
```

**Field Type Changes:**
```sql
-- Convert location to JSON
ALTER TABLE producers
ADD COLUMN location_json JSON AFTER contact_email;

-- Migrate data
UPDATE producers SET location_json = JSON_OBJECT('address', location);

-- Drop old column and rename
ALTER TABLE producers DROP COLUMN location;
ALTER TABLE producers CHANGE location_json location JSON NOT NULL;

-- Convert preferences to JSON
ALTER TABLE producers
MODIFY COLUMN preferences JSON;
```

**Add Foreign Key:**
```sql
ALTER TABLE producers
ADD CONSTRAINT fk_producers_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;
```

### 3. PLOTS Table

**New Fields Added:**
```sql
ALTER TABLE plots
ADD COLUMN plot_name VARCHAR(255) NOT NULL AFTER producer_id,
ADD COLUMN area_unit VARCHAR(20) DEFAULT 'acres' AFTER total_area,
ADD COLUMN soil_type VARCHAR(100) AFTER area_unit,
ADD COLUMN irrigation_type VARCHAR(100) AFTER soil_type,
ADD COLUMN plot_status VARCHAR(50) DEFAULT 'active' AFTER crops_grown,
ADD COLUMN ownership_proof JSON AFTER plot_status,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER ownership_proof,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;
```

**Field Type Changes:**
```sql
-- Convert geo_location to JSON
ALTER TABLE plots
MODIFY COLUMN geo_location JSON;

-- Convert crops_grown to JSON array
ALTER TABLE plots
MODIFY COLUMN crops_grown JSON;
```

### 4. CROPS Table

**New Fields Added:**
```sql
ALTER TABLE crops
ADD COLUMN commodity_name VARCHAR(255) NOT NULL AFTER category,
ADD COLUMN area_unit VARCHAR(20) DEFAULT 'acres' AFTER area,
ADD COLUMN has_intercrop BOOLEAN DEFAULT FALSE AFTER area_unit,
ADD COLUMN intercrop_proportion DECIMAL(5,2) AFTER intercrop_id,
ADD COLUMN expected_harvest_date DATE AFTER sowing_date,
ADD COLUMN actual_harvest_date DATE AFTER expected_harvest_date,
ADD COLUMN expected_yield DECIMAL(10,2) AFTER actual_harvest_date,
ADD COLUMN actual_yield DECIMAL(10,2) AFTER expected_yield,
ADD COLUMN yield_unit VARCHAR(20) DEFAULT 'quintals' AFTER actual_yield,
ADD COLUMN current_stage VARCHAR(50) AFTER yield_unit,
ADD COLUMN health_score INT DEFAULT 0 AFTER current_stage,
ADD COLUMN quality_grade VARCHAR(20) AFTER health_score,
ADD COLUMN nft_tokenized BOOLEAN DEFAULT FALSE AFTER quality_grade,
ADD COLUMN nft_token_id VARCHAR(255) AFTER nft_tokenized,
ADD COLUMN qr_code_url TEXT AFTER nft_token_id,
ADD COLUMN metadata JSON AFTER qr_code_url,
ADD COLUMN is_active BOOLEAN DEFAULT TRUE AFTER metadata,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER is_active,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;
```

**Rename Column:**
```sql
ALTER TABLE crops
CHANGE COLUMN name variety VARCHAR(100) NOT NULL;
```

### 5. ACTIVITIES Table

**Major Changes - 50+ New Fields:**
```sql
-- Add producer reference
ALTER TABLE activities
ADD COLUMN producer_id INT NOT NULL AFTER crop_id,
ADD CONSTRAINT fk_activities_producer FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE;

-- Add activity details
ALTER TABLE activities
ADD COLUMN sub_type VARCHAR(100) AFTER activity_type,
ADD COLUMN completed BOOLEAN DEFAULT TRUE AFTER activity_date,
ADD COLUMN status VARCHAR(50) DEFAULT 'completed' AFTER completed,
CHANGE COLUMN remarks remarks TEXT,
ADD COLUMN voice_note_url TEXT AFTER remarks;

-- Ploughing fields
ALTER TABLE activities
ADD COLUMN ploughing_method VARCHAR(50) AFTER voice_note_url;

-- Sowing fields
ALTER TABLE activities
ADD COLUMN sowing_method VARCHAR(50) AFTER ploughing_method,
ADD COLUMN seed_source VARCHAR(255) AFTER sowing_method,
ADD COLUMN seed_variety VARCHAR(255) AFTER seed_source;

-- Irrigation fields
ALTER TABLE activities
ADD COLUMN irrigation_type VARCHAR(50) AFTER seed_variety,
ADD COLUMN water_volume DECIMAL(10,2) AFTER irrigation_type,
ADD COLUMN water_unit VARCHAR(20) AFTER water_volume;

-- Fertilizer fields
ALTER TABLE activities
ADD COLUMN fertilizer_type VARCHAR(50) AFTER water_unit,
ADD COLUMN n_value DECIMAL(5,2) AFTER fertilizer_type,
ADD COLUMN p_value DECIMAL(5,2) AFTER n_value,
ADD COLUMN k_value DECIMAL(5,2) AFTER p_value,
ADD COLUMN fertilizer_name VARCHAR(255) AFTER k_value,
ADD COLUMN dosage VARCHAR(100) AFTER fertilizer_name,
ADD COLUMN application_method VARCHAR(100) AFTER dosage;

-- Pesticide fields
ALTER TABLE activities
ADD COLUMN pesticide_type VARCHAR(50) AFTER application_method,
ADD COLUMN chemical_name VARCHAR(255) AFTER pesticide_type,
ADD COLUMN pesticide_dosage VARCHAR(100) AFTER chemical_name,
ADD COLUMN pesticide_method VARCHAR(100) AFTER pesticide_dosage,
ADD COLUMN pre_harvest_interval INT AFTER pesticide_method;

-- Weeding fields
ALTER TABLE activities
ADD COLUMN weeding_method VARCHAR(50) AFTER pre_harvest_interval,
ADD COLUMN time_taken DECIMAL(5,2) AFTER weeding_method;

-- Mulching fields
ALTER TABLE activities
ADD COLUMN mulching_type VARCHAR(100) AFTER time_taken,
ADD COLUMN mulching_reason TEXT AFTER mulching_type;

-- Intercultural fields
ALTER TABLE activities
ADD COLUMN intercultural_operation VARCHAR(100) AFTER mulching_reason;

-- Pest scouting fields
ALTER TABLE activities
ADD COLUMN symptoms TEXT AFTER intercultural_operation,
ADD COLUMN action_taken TEXT AFTER symptoms;

-- Health check fields
ALTER TABLE activities
ADD COLUMN crop_height DECIMAL(10,2) AFTER action_taken,
ADD COLUMN leaf_color VARCHAR(100) AFTER crop_height,
ADD COLUMN biomass_index VARCHAR(50) AFTER leaf_color,
ADD COLUMN growth_stage VARCHAR(50) AFTER biomass_index,
ADD COLUMN health_notes TEXT AFTER growth_stage;

-- Pruning fields
ALTER TABLE activities
ADD COLUMN pruning_method VARCHAR(100) AFTER health_notes;

-- Harvesting fields
ALTER TABLE activities
ADD COLUMN harvest_type VARCHAR(50) AFTER pruning_method,
ADD COLUMN yield_estimate DECIMAL(10,2) AFTER harvest_type,
ADD COLUMN yield_unit VARCHAR(20) AFTER yield_estimate,
ADD COLUMN actual_yield DECIMAL(10,2) AFTER yield_unit;

-- Post-harvest fields
ALTER TABLE activities
ADD COLUMN post_harvest_activity VARCHAR(50) AFTER actual_yield,
ADD COLUMN location VARCHAR(255) AFTER post_harvest_activity,
ADD COLUMN output VARCHAR(255) AFTER location,
ADD COLUMN sale_price DECIMAL(10,2) AFTER output;

-- Inspection fields
ALTER TABLE activities
ADD COLUMN inspected_by VARCHAR(255) AFTER sale_price,
ADD COLUMN inspection_purpose VARCHAR(100) AFTER inspected_by,
ADD COLUMN inspection_notes TEXT AFTER inspection_purpose;

-- AI Analysis fields
ALTER TABLE activities
ADD COLUMN ai_warnings JSON AFTER inspection_notes,
ADD COLUMN ai_suggestions JSON AFTER ai_warnings,
ADD COLUMN risk_level VARCHAR(20) AFTER ai_suggestions;

-- Timestamps
ALTER TABLE activities
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER risk_level,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

-- Drop old columns
ALTER TABLE activities
DROP COLUMN method,
DROP COLUMN input_used,
DROP COLUMN evidence_id;
```

### 6. EVIDENCE Table

**New Fields:**
```sql
ALTER TABLE evidence
ADD COLUMN file_size INT AFTER file_url,
ADD COLUMN mime_type VARCHAR(100) AFTER file_size,
ADD COLUMN caption TEXT AFTER mime_type,
ADD COLUMN gps_location JSON AFTER timestamp,
ADD COLUMN metadata JSON AFTER gps_location,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER metadata;
```

### 7. CROP_HEALTH Table (NEW)

```sql
CREATE TABLE crop_health (
    health_id INT PRIMARY KEY AUTO_INCREMENT,
    crop_id INT NOT NULL,
    check_date DATE NOT NULL,
    health_score INT NOT NULL,
    status VARCHAR(50),
    soil_moisture DECIMAL(5,2),
    leaf_color_index DECIMAL(5,2),
    plant_height DECIMAL(10,2),
    biomass_index DECIMAL(5,2),
    pest_pressure DECIMAL(5,2),
    disease_risk DECIMAL(5,2),
    active_issues JSON,
    recommendations JSON,
    temperature DECIMAL(5,2),
    humidity DECIMAL(5,2),
    rainfall DECIMAL(10,2),
    weather_forecast VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (crop_id) REFERENCES crops(crop_id) ON DELETE CASCADE,
    INDEX idx_crop (crop_id),
    INDEX idx_date (check_date DESC),
    INDEX idx_score (health_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 8. HEALTH_ISSUES Table (NEW)

```sql
CREATE TABLE health_issues (
    issue_id INT PRIMARY KEY AUTO_INCREMENT,
    crop_id INT NOT NULL,
    health_check_id INT,
    issue_type ENUM('pest', 'disease', 'nutrient', 'water', 'weather') NOT NULL,
    severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    action_required BOOLEAN DEFAULT FALSE,
    detected_date DATE NOT NULL,
    resolved_date DATE,
    resolution_notes TEXT,
    status VARCHAR(50) DEFAULT 'active',
    evidence_ids JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (crop_id) REFERENCES crops(crop_id) ON DELETE CASCADE,
    FOREIGN KEY (health_check_id) REFERENCES crop_health(health_id) ON DELETE CASCADE,
    INDEX idx_crop (crop_id),
    INDEX idx_type (issue_type),
    INDEX idx_severity (severity),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 9. ALERTS Table

**New Fields:**
```sql
ALTER TABLE alerts
ADD COLUMN producer_id INT NOT NULL FIRST,
ADD COLUMN severity ENUM('low', 'medium', 'high', 'critical') NOT NULL AFTER alert_type,
ADD COLUMN title VARCHAR(255) NOT NULL AFTER severity,
ADD COLUMN action_required BOOLEAN DEFAULT FALSE AFTER message,
ADD COLUMN acknowledged_at DATETIME AFTER status,
ADD COLUMN resolved_at DATETIME AFTER acknowledged_at,
ADD COLUMN metadata JSON AFTER resolved_at,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER metadata,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

-- Add foreign key
ALTER TABLE alerts
ADD CONSTRAINT fk_alerts_producer FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE;

-- Update type column
ALTER TABLE alerts
MODIFY COLUMN type VARCHAR(100);
```

### 10. STORAGE Table

**New Fields:**
```sql
ALTER TABLE storage
ADD COLUMN commodity VARCHAR(255) NOT NULL AFTER crop_id,
ADD COLUMN variety VARCHAR(255) NOT NULL AFTER commodity,
ADD COLUMN unit VARCHAR(20) NOT NULL AFTER quantity,
ADD COLUMN quality_score INT AFTER grade,
ADD COLUMN status VARCHAR(50) AFTER quality_score,
ADD COLUMN storage_type VARCHAR(50) AFTER location,
ADD COLUMN warehouse_id INT AFTER storage_type,
ADD COLUMN temperature DECIMAL(5,2) AFTER warehouse_id,
ADD COLUMN humidity DECIMAL(5,2) AFTER temperature,
ADD COLUMN pest_control BOOLEAN DEFAULT FALSE AFTER humidity,
ADD COLUMN fumigated BOOLEAN DEFAULT FALSE AFTER pest_control,
ADD COLUMN last_inspection DATE AFTER fumigated,
ADD COLUMN expiry_date DATE AFTER entry_date,
ADD COLUMN estimated_value DECIMAL(12,2) AFTER expiry_date,
ADD COLUMN market_price_per_unit DECIMAL(10,2) AFTER estimated_value,
ADD COLUMN certifications JSON AFTER market_price_per_unit,
ADD COLUMN certification_docs JSON AFTER certifications,
ADD COLUMN nft_tokenized BOOLEAN DEFAULT FALSE AFTER certification_docs,
ADD COLUMN nft_token_id VARCHAR(255) AFTER nft_tokenized,
ADD COLUMN qr_code_url TEXT AFTER nft_token_id,
ADD COLUMN metadata JSON AFTER qr_code_url,
ADD COLUMN is_active BOOLEAN DEFAULT TRUE AFTER metadata,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER is_active,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

-- Convert certification to JSON
UPDATE storage SET certifications = JSON_ARRAY(certification) WHERE certification IS NOT NULL;
ALTER TABLE storage DROP COLUMN certification;
```

### 11. SCHEDULE Table

**New Fields:**
```sql
ALTER TABLE schedule
ADD COLUMN producer_id INT NOT NULL AFTER crop_id,
ADD COLUMN description TEXT AFTER status,
ADD COLUMN reminder_sent BOOLEAN DEFAULT FALSE AFTER description,
ADD COLUMN reminder_date DATE AFTER reminder_sent,
ADD COLUMN completed_activity_id INT AFTER reminder_date,
ADD COLUMN completed_date DATE AFTER completed_activity_id,
ADD COLUMN recurring BOOLEAN DEFAULT FALSE AFTER completed_date,
ADD COLUMN recurrence_pattern VARCHAR(50) AFTER recurring,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER recurrence_pattern,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

-- Add foreign keys
ALTER TABLE schedule
ADD CONSTRAINT fk_schedule_producer FOREIGN KEY (producer_id) REFERENCES producers(producer_id) ON DELETE CASCADE,
ADD CONSTRAINT fk_schedule_activity FOREIGN KEY (completed_activity_id) REFERENCES activities(activity_id) ON DELETE SET NULL;
```

---

## 🔄 Complete Migration Script

Save as `/database/migrate_v1_to_v3.sql`:

```sql
-- Start transaction
START TRANSACTION;

-- 1. Backup existing data
CREATE TABLE users_backup AS SELECT * FROM users;
CREATE TABLE producers_backup AS SELECT * FROM producers;
CREATE TABLE plots_backup AS SELECT * FROM plots;
CREATE TABLE crops_backup AS SELECT * FROM crops;
CREATE TABLE activities_backup AS SELECT * FROM activities;
CREATE TABLE evidence_backup AS SELECT * FROM evidence;
CREATE TABLE alerts_backup AS SELECT * FROM alerts;
CREATE TABLE storage_backup AS SELECT * FROM storage;
CREATE TABLE schedule_backup AS SELECT * FROM schedule;

-- 2. Apply all ALTER TABLE statements (from sections above)
-- [Include all ALTER TABLE statements here]

-- 3. Create new tables
-- [Include CREATE TABLE for crop_health and health_issues]

-- 4. Verify migration
SELECT 
    'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'producers', COUNT(*) FROM producers
UNION ALL
SELECT 'crops', COUNT(*) FROM crops
UNION ALL
SELECT 'activities', COUNT(*) FROM activities;

-- Commit if everything looks good
COMMIT;

-- Or rollback if there are issues
-- ROLLBACK;
```

---

## ✅ Post-Migration Checklist

### 1. Data Verification
```sql
-- Check record counts match
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM producers;
SELECT COUNT(*) FROM crops;
SELECT COUNT(*) FROM activities;

-- Check for NULL values in required fields
SELECT * FROM producers WHERE name IS NULL OR contact_phone IS NULL;
SELECT * FROM crops WHERE commodity_name IS NULL OR variety IS NULL;
```

### 2. Index Verification
```sql
-- Check all indexes exist
SHOW INDEX FROM users;
SHOW INDEX FROM producers;
SHOW INDEX FROM crops;
SHOW INDEX FROM activities;
```

### 3. Foreign Key Verification
```sql
-- Check all foreign keys
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'tradie_producer'
AND REFERENCED_TABLE_NAME IS NOT NULL;
```

### 4. Application Testing
- [ ] Login works
- [ ] Dashboard loads
- [ ] Post requirement saves
- [ ] Activity logging works
- [ ] Health monitoring displays
- [ ] Inventory management works
- [ ] Profile loads correctly
- [ ] Settings save properly

---

## 🆘 Rollback Procedure

If migration fails:

```sql
-- Drop new tables
DROP TABLE IF EXISTS crop_health;
DROP TABLE IF EXISTS health_issues;

-- Restore from backups
DROP TABLE users;
DROP TABLE producers;
DROP TABLE plots;
DROP TABLE crops;
DROP TABLE activities;
DROP TABLE evidence;
DROP TABLE alerts;
DROP TABLE storage;
DROP TABLE schedule;

CREATE TABLE users AS SELECT * FROM users_backup;
CREATE TABLE producers AS SELECT * FROM producers_backup;
CREATE TABLE plots AS SELECT * FROM plots_backup;
CREATE TABLE crops AS SELECT * FROM crops_backup;
CREATE TABLE activities AS SELECT * FROM activities_backup;
CREATE TABLE evidence AS SELECT * FROM evidence_backup;
CREATE TABLE alerts AS SELECT * FROM alerts_backup;
CREATE TABLE storage AS SELECT * FROM storage_backup;
CREATE TABLE schedule AS SELECT * FROM schedule_backup;

-- Recreate indexes and foreign keys (from original schema)
```

---

## 📞 Support

If you encounter issues during migration:
- Email: dev@tradie.com
- Documentation: See DATABASE_SCHEMA_COMPLETE.md
- Backup location: /backups/

---

**Migration Guide Version:** 1.0  
**Last Updated:** October 21, 2025  
**Compatible With:** MySQL 8.0+, MariaDB 10.5+
