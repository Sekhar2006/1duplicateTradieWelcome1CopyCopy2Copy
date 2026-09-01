# 🗄️ TRADIE App - Complete Database Schema

## Overview
Comprehensive database design for the TRADIE commodity trading platform with producer activity tracking, crop management, inventory, and blockchain integration.

---

## 📊 Database Tables

### 1. **producers** Table
**Purpose:** Store producer profile and farm information

```sql
CREATE TABLE producers (
  producer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id),
  name VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  contact_email VARCHAR(255),
  location JSONB NOT NULL, -- {state, district, village, pincode, gps_coords}
  farm_size DECIMAL(10,2), -- Total farm size in acres
  farm_address TEXT,
  preferences JSONB, -- Language, notification settings, etc.
  kyc_status VARCHAR(50) DEFAULT 'pending', -- pending, verified, rejected
  kyc_documents JSONB, -- Document references
  bank_details JSONB, -- Account info for payments
  certifications TEXT[], -- Organic, FairTrade, etc.
  rating DECIMAL(3,2) DEFAULT 0.00,
  total_trades INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  nft_wallet_address VARCHAR(255),
  blockchain_verified BOOLEAN DEFAULT false
);

-- Indexes
CREATE INDEX idx_producers_user_id ON producers(user_id);
CREATE INDEX idx_producers_location ON producers USING GIN(location);
CREATE INDEX idx_producers_kyc_status ON producers(kyc_status);
```

---

### 2. **plots** Table
**Purpose:** Track individual land plots/fields

```sql
CREATE TABLE plots (
  plot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  producer_id UUID REFERENCES producers(producer_id) ON DELETE CASCADE,
  plot_name VARCHAR(255) NOT NULL,
  geo_location JSONB, -- GPS coordinates, boundaries
  total_area DECIMAL(10,2) NOT NULL,
  area_unit VARCHAR(20) DEFAULT 'acres', -- acres, hectares
  soil_type VARCHAR(100),
  irrigation_type VARCHAR(100), -- drip, flood, sprinkler, rain-fed
  crops_grown TEXT[], -- Array of crop IDs currently grown
  plot_status VARCHAR(50) DEFAULT 'active', -- active, fallow, under_development
  ownership_proof JSONB, -- Document references
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_plots_producer ON plots(producer_id);
CREATE INDEX idx_plots_status ON plots(plot_status);
```

---

### 3. **crops** Table
**Purpose:** Store crop cultivation records

```sql
CREATE TABLE crops (
  crop_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  producer_id UUID REFERENCES producers(producer_id) ON DELETE CASCADE,
  plot_id UUID REFERENCES plots(plot_id) ON DELETE SET NULL,
  category VARCHAR(100) NOT NULL, -- Spices, Pulses, Grains, etc.
  commodity_name VARCHAR(255) NOT NULL, -- Wheat, Rice, etc.
  variety VARCHAR(255) NOT NULL,
  area DECIMAL(10,2) NOT NULL,
  area_unit VARCHAR(20) DEFAULT 'acres',
  
  -- Intercropping
  has_intercrop BOOLEAN DEFAULT false,
  intercrop_id UUID REFERENCES crops(crop_id) ON DELETE SET NULL,
  intercrop_proportion DECIMAL(5,2), -- Percentage of area
  
  -- Dates
  sowing_date DATE,
  expected_harvest_date DATE,
  actual_harvest_date DATE,
  
  -- Yields
  expected_yield DECIMAL(10,2),
  actual_yield DECIMAL(10,2),
  yield_unit VARCHAR(20) DEFAULT 'quintals',
  
  -- Stages
  current_stage VARCHAR(50), -- planning, sown, growing, flowering, harvesting, harvested
  health_score INTEGER DEFAULT 0, -- 0-100
  quality_grade VARCHAR(20),
  
  -- NFT
  nft_tokenized BOOLEAN DEFAULT false,
  nft_token_id VARCHAR(255),
  qr_code_url TEXT,
  
  -- Metadata
  metadata JSONB, -- Additional crop-specific data
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Indexes
CREATE INDEX idx_crops_producer ON crops(producer_id);
CREATE INDEX idx_crops_plot ON crops(plot_id);
CREATE INDEX idx_crops_category ON crops(category);
CREATE INDEX idx_crops_stage ON crops(current_stage);
CREATE INDEX idx_crops_nft ON crops(nft_tokenized);
```

---

### 4. **varieties** Table
**Purpose:** Maintain crop varieties database

```sql
CREATE TABLE varieties (
  variety_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_name VARCHAR(255) NOT NULL,
  variety_name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  traits JSONB, -- {duration, yield_potential, disease_resistance, etc.}
  recommended_area VARCHAR(255), -- Climate zones, regions
  seed_rate DECIMAL(10,2),
  spacing VARCHAR(100),
  fertilizer_schedule JSONB,
  irrigation_schedule JSONB,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(crop_name, variety_name)
);

-- Indexes
CREATE INDEX idx_varieties_crop ON varieties(crop_name);
CREATE INDEX idx_varieties_category ON varieties(category);
```

---

### 5. **activities** Table
**Purpose:** Day-to-day crop activity logging

```sql
CREATE TABLE activities (
  activity_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id UUID REFERENCES crops(crop_id) ON DELETE CASCADE,
  producer_id UUID REFERENCES producers(producer_id) ON DELETE CASCADE,
  
  -- Activity Details
  activity_type VARCHAR(100) NOT NULL, -- ploughing, sowing, irrigation, etc.
  sub_type VARCHAR(100),
  activity_date DATE NOT NULL,
  completed BOOLEAN DEFAULT true,
  status VARCHAR(50) DEFAULT 'completed', -- completed, due, overdue
  
  -- Common Fields
  remarks TEXT,
  voice_note_url TEXT,
  
  -- Ploughing
  ploughing_method VARCHAR(50), -- manual, tractor, bullock
  
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
  pre_harvest_interval INTEGER, -- days
  
  -- Weeding
  weeding_method VARCHAR(50),
  time_taken DECIMAL(5,2), -- hours
  
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
  harvest_type VARCHAR(50), -- partial, final, selective
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
  ai_warnings TEXT[],
  ai_suggestions TEXT[],
  risk_level VARCHAR(20), -- low, medium, high
  
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_activities_crop ON activities(crop_id);
CREATE INDEX idx_activities_producer ON activities(producer_id);
CREATE INDEX idx_activities_type ON activities(activity_type);
CREATE INDEX idx_activities_date ON activities(activity_date);
CREATE INDEX idx_activities_status ON activities(status);
```

---

### 6. **evidence** Table
**Purpose:** Store activity evidence (photos, videos, voice notes)

```sql
CREATE TABLE evidence (
  evidence_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES activities(activity_id) ON DELETE CASCADE,
  media_type VARCHAR(20) NOT NULL, -- photo, video, voice
  file_url TEXT NOT NULL,
  file_size INTEGER, -- bytes
  mime_type VARCHAR(100),
  caption TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  gps_location JSONB, -- Capture GPS at time of photo
  metadata JSONB, -- Camera details, device info, etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_evidence_activity ON evidence(activity_id);
CREATE INDEX idx_evidence_type ON evidence(media_type);
CREATE INDEX idx_evidence_timestamp ON evidence(timestamp);
```

---

### 7. **alerts** Table
**Purpose:** Health alerts, Grok AI alerts, system notifications

```sql
CREATE TABLE alerts (
  alert_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  producer_id UUID REFERENCES producers(producer_id) ON DELETE CASCADE,
  crop_id UUID REFERENCES crops(crop_id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(activity_id) ON DELETE SET NULL,
  
  alert_type VARCHAR(100) NOT NULL, -- grok_warning, health_issue, pest_alert, weather_alert
  severity VARCHAR(20) NOT NULL, -- low, medium, high, critical
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  action_required BOOLEAN DEFAULT false,
  
  status VARCHAR(50) DEFAULT 'active', -- active, acknowledged, resolved, dismissed
  acknowledged_at TIMESTAMP,
  resolved_at TIMESTAMP,
  
  metadata JSONB, -- Additional context
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_alerts_producer ON alerts(producer_id);
CREATE INDEX idx_alerts_crop ON alerts(crop_id);
CREATE INDEX idx_alerts_severity ON alerts(severity);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_created ON alerts(created_at DESC);
```

---

### 8. **storage** Table
**Purpose:** Inventory and storage management

```sql
CREATE TABLE storage (
  storage_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  producer_id UUID REFERENCES producers(producer_id) ON DELETE CASCADE,
  crop_id UUID REFERENCES crops(crop_id) ON DELETE SET NULL,
  
  commodity VARCHAR(255) NOT NULL,
  variety VARCHAR(255) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit VARCHAR(20) NOT NULL, -- kg, quintals, tons, bags
  
  grade VARCHAR(50),
  quality_score INTEGER, -- 0-100
  status VARCHAR(50), -- fresh, good, average, deteriorating
  
  -- Storage Details
  location VARCHAR(255) NOT NULL,
  storage_type VARCHAR(50), -- warehouse, cold-storage, farm-storage, open
  warehouse_id UUID, -- Reference to warehouse table if applicable
  
  -- Conditions
  temperature DECIMAL(5,2),
  humidity DECIMAL(5,2),
  pest_control BOOLEAN DEFAULT false,
  fumigated BOOLEAN DEFAULT false,
  last_inspection DATE,
  
  -- Dates
  entry_date DATE NOT NULL,
  expiry_date DATE,
  
  -- Valuation
  estimated_value DECIMAL(12,2),
  market_price_per_unit DECIMAL(10,2),
  
  -- Certifications
  certifications TEXT[],
  certification_docs JSONB,
  
  -- NFT
  nft_tokenized BOOLEAN DEFAULT false,
  nft_token_id VARCHAR(255),
  qr_code_url TEXT,
  
  -- Metadata
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Indexes
CREATE INDEX idx_storage_producer ON storage(producer_id);
CREATE INDEX idx_storage_crop ON storage(crop_id);
CREATE INDEX idx_storage_commodity ON storage(commodity);
CREATE INDEX idx_storage_status ON storage(status);
CREATE INDEX idx_storage_nft ON storage(nft_tokenized);
```

---

### 9. **schedule** Table
**Purpose:** Planned activities and reminders

```sql
CREATE TABLE schedule (
  schedule_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id UUID REFERENCES crops(crop_id) ON DELETE CASCADE,
  producer_id UUID REFERENCES producers(producer_id) ON DELETE CASCADE,
  
  planned_activity VARCHAR(100) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, overdue, cancelled
  
  description TEXT,
  reminder_sent BOOLEAN DEFAULT false,
  reminder_date DATE,
  
  completed_activity_id UUID REFERENCES activities(activity_id),
  completed_date DATE,
  
  recurring BOOLEAN DEFAULT false,
  recurrence_pattern VARCHAR(50), -- daily, weekly, monthly, seasonal
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_schedule_crop ON schedule(crop_id);
CREATE INDEX idx_schedule_producer ON schedule(producer_id);
CREATE INDEX idx_schedule_due_date ON schedule(due_date);
CREATE INDEX idx_schedule_status ON schedule(status);
```

---

### 10. **users** Table
**Purpose:** Authentication and user management

```sql
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  
  account_type VARCHAR(50) NOT NULL, -- producer, trader, buyer, advisor, admin
  role VARCHAR(50), -- From role system
  
  -- Profile
  full_name VARCHAR(255),
  profile_image_url TEXT,
  language_preference VARCHAR(10) DEFAULT 'en',
  
  -- Authentication
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT true,
  two_factor_enabled BOOLEAN DEFAULT false,
  
  -- Status
  account_status VARCHAR(50) DEFAULT 'active', -- active, suspended, banned, deleted
  kyc_completed BOOLEAN DEFAULT false,
  
  -- Security
  last_login TIMESTAMP,
  login_count INTEGER DEFAULT 0,
  failed_login_attempts INTEGER DEFAULT 0,
  password_changed_at TIMESTAMP,
  
  -- Metadata
  signup_source VARCHAR(100), -- web, android, ios
  device_info JSONB,
  ip_address INET,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_account_type ON users(account_type);
CREATE INDEX idx_users_status ON users(account_status);
```

---

### 11. **crop_health** Table
**Purpose:** Real-time crop health monitoring metrics

```sql
CREATE TABLE crop_health (
  health_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id UUID REFERENCES crops(crop_id) ON DELETE CASCADE,
  
  check_date DATE NOT NULL,
  health_score INTEGER NOT NULL, -- 0-100
  status VARCHAR(50), -- excellent, good, fair, poor, critical
  
  -- Metrics
  soil_moisture DECIMAL(5,2), -- percentage
  leaf_color_index DECIMAL(5,2),
  plant_height DECIMAL(10,2), -- cm
  biomass_index DECIMAL(5,2),
  pest_pressure DECIMAL(5,2),
  disease_risk DECIMAL(5,2),
  
  -- Issues
  active_issues JSONB[], -- Array of issue objects
  recommendations TEXT[],
  
  -- Weather
  temperature DECIMAL(5,2),
  humidity DECIMAL(5,2),
  rainfall DECIMAL(10,2),
  weather_forecast VARCHAR(50),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_crop_health_crop ON crop_health(crop_id);
CREATE INDEX idx_crop_health_date ON crop_health(check_date DESC);
CREATE INDEX idx_crop_health_score ON crop_health(health_score);
```

---

### 12. **health_issues** Table
**Purpose:** Track specific crop health issues

```sql
CREATE TABLE health_issues (
  issue_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id UUID REFERENCES crops(crop_id) ON DELETE CASCADE,
  health_check_id UUID REFERENCES crop_health(health_id) ON DELETE CASCADE,
  
  issue_type VARCHAR(50) NOT NULL, -- pest, disease, nutrient, water, weather
  severity VARCHAR(20) NOT NULL, -- low, medium, high, critical
  
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  action_required BOOLEAN DEFAULT false,
  
  detected_date DATE NOT NULL,
  resolved_date DATE,
  resolution_notes TEXT,
  
  status VARCHAR(50) DEFAULT 'active', -- active, monitoring, resolved
  
  evidence_ids UUID[], -- References to evidence table
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_health_issues_crop ON health_issues(crop_id);
CREATE INDEX idx_health_issues_type ON health_issues(issue_type);
CREATE INDEX idx_health_issues_severity ON health_issues(severity);
CREATE INDEX idx_health_issues_status ON health_issues(status);
```

---

## 🔗 Relationships

### Entity Relationships

```
users (1) ←→ (1) producers
producers (1) ←→ (*) plots
producers (1) ←→ (*) crops
plots (1) ←→ (*) crops
crops (1) ←→ (*) activities
activities (1) ←→ (*) evidence
crops (1) ←→ (*) crop_health
crop_health (1) ←→ (*) health_issues
crops (1) ←→ (*) storage
crops (1) ←→ (*) schedule
producers (1) ←→ (*) alerts
crops (1) ←→ (*) alerts
```

---

## 📊 Sample Queries

### 1. Get Producer's Complete Profile
```sql
SELECT 
  p.*,
  u.phone_number,
  u.email,
  COUNT(DISTINCT pl.plot_id) as total_plots,
  COUNT(DISTINCT c.crop_id) as active_crops,
  SUM(c.area) as total_cultivated_area
FROM producers p
JOIN users u ON p.user_id = u.user_id
LEFT JOIN plots pl ON p.producer_id = pl.producer_id
LEFT JOIN crops c ON p.producer_id = c.producer_id AND c.is_active = true
WHERE p.producer_id = '...'
GROUP BY p.producer_id, u.user_id;
```

### 2. Get Crop with All Activities
```sql
SELECT 
  c.*,
  json_agg(json_build_object(
    'activity_id', a.activity_id,
    'type', a.activity_type,
    'date', a.activity_date,
    'evidence_count', (SELECT COUNT(*) FROM evidence WHERE activity_id = a.activity_id)
  ) ORDER BY a.activity_date DESC) as activities
FROM crops c
LEFT JOIN activities a ON c.crop_id = a.crop_id
WHERE c.crop_id = '...'
GROUP BY c.crop_id;
```

### 3. Get Inventory Summary
```sql
SELECT 
  commodity,
  variety,
  SUM(quantity) as total_quantity,
  unit,
  SUM(estimated_value) as total_value,
  COUNT(*) as storage_locations,
  AVG(quality_score) as avg_quality
FROM storage
WHERE producer_id = '...' AND is_active = true
GROUP BY commodity, variety, unit
ORDER BY total_value DESC;
```

### 4. Get Active Alerts
```sql
SELECT 
  a.*,
  c.commodity_name,
  c.variety,
  p.plot_name
FROM alerts a
JOIN crops c ON a.crop_id = c.crop_id
JOIN plots p ON c.plot_id = p.plot_id
WHERE a.producer_id = '...' 
  AND a.status = 'active'
  AND a.severity IN ('high', 'critical')
ORDER BY a.created_at DESC;
```

### 5. Get Health Trends
```sql
SELECT 
  DATE_TRUNC('week', check_date) as week,
  AVG(health_score) as avg_health,
  AVG(soil_moisture) as avg_moisture,
  AVG(pest_pressure) as avg_pest_pressure
FROM crop_health
WHERE crop_id = '...'
  AND check_date >= NOW() - INTERVAL '3 months'
GROUP BY week
ORDER BY week;
```

---

## 🔒 Security Considerations

### Row-Level Security (RLS)
```sql
-- Producers can only see their own data
ALTER TABLE producers ENABLE ROW LEVEL SECURITY;
CREATE POLICY producer_isolation ON producers
  FOR ALL
  USING (producer_id = current_setting('app.current_producer_id')::uuid);

-- Similar policies for crops, activities, storage, etc.
```

### Data Encryption
- Sensitive fields encrypted at application level
- Bank details, KYC documents encrypted
- SSL/TLS for all connections

---

## 📈 Performance Optimization

### Partitioning Strategy
```sql
-- Partition activities by year
CREATE TABLE activities_2025 PARTITION OF activities
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

CREATE TABLE activities_2026 PARTITION OF activities
  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
```

### Materialized Views
```sql
-- Producer dashboard summary
CREATE MATERIALIZED VIEW producer_dashboard_summary AS
SELECT 
  p.producer_id,
  COUNT(DISTINCT c.crop_id) as active_crops,
  SUM(c.area) as total_area,
  COUNT(DISTINCT a.activity_id) as total_activities,
  COUNT(DISTINCT al.alert_id) FILTER (WHERE al.status = 'active') as active_alerts,
  SUM(s.estimated_value) as inventory_value
FROM producers p
LEFT JOIN crops c ON p.producer_id = c.producer_id AND c.is_active = true
LEFT JOIN activities a ON c.crop_id = a.crop_id
LEFT JOIN alerts al ON p.producer_id = al.producer_id
LEFT JOIN storage s ON p.producer_id = s.producer_id AND s.is_active = true
GROUP BY p.producer_id;

-- Refresh strategy
CREATE INDEX ON producer_dashboard_summary(producer_id);
REFRESH MATERIALIZED VIEW CONCURRENTLY producer_dashboard_summary;
```

---

## 🌐 API Integration Points

### REST API Endpoints
```
POST   /api/crops                    - Create crop
GET    /api/crops/:id                - Get crop details
PUT    /api/crops/:id                - Update crop
DELETE /api/crops/:id                - Delete crop

POST   /api/activities               - Log activity
GET    /api/activities/:cropId       - Get crop activities
PUT    /api/activities/:id           - Update activity
DELETE /api/activities/:id           - Delete activity

POST   /api/evidence                 - Upload evidence
GET    /api/evidence/:activityId     - Get activity evidence

GET    /api/health/:cropId           - Get crop health
POST   /api/health                   - Record health check

GET    /api/storage                  - Get inventory
POST   /api/storage                  - Add storage entry
PUT    /api/storage/:id              - Update storage
DELETE /api/storage/:id              - Delete storage

GET    /api/alerts                   - Get alerts
PUT    /api/alerts/:id/acknowledge   - Acknowledge alert
PUT    /api/alerts/:id/resolve       - Resolve alert
```

---

## 🔄 Data Migration Strategy

### Initial Setup
1. Create schema
2. Load varieties reference data
3. Import producers from KYC system
4. Set up RLS policies
5. Create indexes
6. Set up materialized views

### Ongoing Maintenance
- Daily: Refresh materialized views
- Weekly: Analyze and vacuum tables
- Monthly: Archive old activities to cold storage
- Quarterly: Review and optimize indexes

---

**Last Updated:** October 21, 2025  
**Schema Version:** 2.0  
**Database:** PostgreSQL 14+  
**Production Ready:** ✅ Yes
