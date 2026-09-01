# 🗄️ TRADIE Producer Database

Complete MySQL/MariaDB database schema for the 7-screen producer management system.

---

## 📁 Files in this Directory

| File | Purpose |
|------|---------|
| `schema_mysql.sql` | Complete database schema (12 tables) |
| `MIGRATION_GUIDE.md` | Detailed migration from simple to complete schema |
| `quick_setup.sh` | Automated setup script |
| `README.md` | This file |

---

## 🚀 Quick Start

### Option 1: Using Setup Script (Recommended)

```bash
# Make script executable
chmod +x quick_setup.sh

# Run setup
./quick_setup.sh
```

The script will guide you through:
1. Fresh installation
2. Migration from existing schema
3. Development setup with sample data

### Option 2: Manual Setup

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE tradie_producer CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Import schema
mysql -u root -p tradie_producer < schema_mysql.sql

# Verify
mysql -u root -p tradie_producer -e "SHOW TABLES;"
```

---

## 📊 Database Schema Overview

### 12 Tables

```
users ─────────┐
               ↓
producers ─────┴──→ plots
     ↓                ↓
   crops ←────────────┘
     ├──→ activities ──→ evidence
     ├──→ crop_health ──→ health_issues
     ├──→ storage
     ├──→ schedule
     └──→ alerts

varieties (reference data)
```

### Table Descriptions

1. **users** - Authentication & user management
2. **producers** - Producer profiles & farm information
3. **plots** - Land/field management
4. **crops** - Crop cultivation records
5. **varieties** - Crop varieties reference data
6. **activities** - Day-to-day activity logging (15 types)
7. **evidence** - Media files (photo/video/voice)
8. **crop_health** - Health monitoring metrics
9. **health_issues** - Specific health issues tracking
10. **alerts** - Notifications & system alerts
11. **storage** - Inventory management
12. **schedule** - Activity planning & reminders

---

## 🔧 System Requirements

- **MySQL:** 8.0 or higher
- **MariaDB:** 10.5 or higher
- **Storage:** Minimum 1 GB for database
- **Character Set:** utf8mb4
- **Collation:** utf8mb4_unicode_ci

---

## 📋 Features Supported

### By Screen

| Screen | Features Supported |
|--------|-------------------|
| Dashboard | Grok AI monitoring, Quick stats, Recent activities |
| Post Requirement | Multi-crop, Intercropping, 200+ varieties |
| Activities | 15 activity types, 50+ custom fields, Evidence upload |
| Crop Health | 6 metrics, Issue tracking, Weather integration |
| Inventory | Storage management, Quality tracking, NFT support |
| Profile | Personal info, Farm details, KYC, Bank details |
| Settings | Preferences, Language (94), Support |

### Key Capabilities

- ✅ **200+ Features** across all screens
- ✅ **JSON Fields** for flexible data storage
- ✅ **Foreign Keys** for referential integrity
- ✅ **Indexes** for query performance
- ✅ **Timestamps** for audit trail
- ✅ **Soft Deletes** via status fields
- ✅ **Cascade Deletes** for data cleanup
- ✅ **UTF-8MB4** for emoji support

---

## 🔄 Migration Path

### From Simple Schema

If you have the basic 10-table schema, follow these steps:

1. **Backup existing data**
   ```bash
   mysqldump -u root -p tradie_producer > backup.sql
   ```

2. **Review migration guide**
   ```bash
   cat MIGRATION_GUIDE.md
   ```

3. **Run migration** (or use setup script option 2)
   ```bash
   mysql -u root -p tradie_producer < migrate_v1_to_v3.sql
   ```

4. **Verify migration**
   ```bash
   mysql -u root -p tradie_producer -e "SELECT COUNT(*) FROM crops;"
   ```

### From Scratch

Use the quick_setup.sh script with option 1 for a clean installation.

---

## 📈 Sample Queries

### Get Producer Dashboard Data
```sql
SELECT 
  p.producer_id,
  p.name,
  COUNT(DISTINCT c.crop_id) as active_crops,
  COUNT(DISTINCT a.activity_id) as total_activities,
  COUNT(DISTINCT al.alert_id) as active_alerts,
  SUM(s.estimated_value) as inventory_value
FROM producers p
LEFT JOIN crops c ON p.producer_id = c.producer_id AND c.is_active = TRUE
LEFT JOIN activities a ON c.crop_id = a.crop_id
LEFT JOIN alerts al ON p.producer_id = al.producer_id AND al.status = 'active'
LEFT JOIN storage s ON p.producer_id = s.producer_id AND s.is_active = TRUE
WHERE p.producer_id = 1
GROUP BY p.producer_id;
```

### Get Crop with All Activities
```sql
SELECT 
  c.*,
  COUNT(a.activity_id) as activity_count,
  MAX(a.activity_date) as last_activity_date
FROM crops c
LEFT JOIN activities a ON c.crop_id = a.crop_id
WHERE c.crop_id = 1
GROUP BY c.crop_id;
```

### Get Inventory Summary
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
WHERE producer_id = 1 AND is_active = TRUE
GROUP BY commodity, variety, unit
ORDER BY total_value DESC;
```

### Get Active Health Issues
```sql
SELECT 
  hi.*,
  c.commodity_name,
  c.variety
FROM health_issues hi
JOIN crops c ON hi.crop_id = c.crop_id
WHERE hi.status = 'active'
  AND hi.severity IN ('high', 'critical')
ORDER BY hi.severity DESC, hi.detected_date DESC;
```

---

## 🔐 Security Considerations

### Data Protection
- ✅ Use prepared statements to prevent SQL injection
- ✅ Encrypt sensitive fields at application level
- ✅ Store passwords hashed (bcrypt)
- ✅ Use SSL/TLS for database connections

### Recommended Practices
```sql
-- Create application user with limited privileges
CREATE USER 'tradie_app'@'localhost' IDENTIFIED BY 'secure_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON tradie_producer.* TO 'tradie_app'@'localhost';
FLUSH PRIVILEGES;

-- Enable binary logging for point-in-time recovery
SET GLOBAL binlog_format = 'ROW';
```

---

## 🔍 Troubleshooting

### Common Issues

**Issue:** Tables not created
```bash
# Check MySQL version
mysql --version

# Should be 8.0+ or MariaDB 10.5+
```

**Issue:** Foreign key errors
```sql
-- Check if parent tables exist
SHOW TABLES;

-- Check if foreign key constraints are enabled
SHOW VARIABLES LIKE 'foreign_key_checks';
```

**Issue:** Character encoding problems
```sql
-- Verify database charset
SHOW CREATE DATABASE tradie_producer;

-- Should show: CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
```

**Issue:** JSON column errors (for older MySQL versions)
```sql
-- Check MySQL version (must be 5.7.8+)
SELECT VERSION();

-- Alternative: Use TEXT columns and parse JSON in application
```

---

## 📊 Performance Optimization

### Indexes Created
All tables include appropriate indexes for:
- Primary keys (automatically indexed)
- Foreign keys
- Frequently queried columns
- Date columns for sorting

### Query Optimization Tips
```sql
-- Use EXPLAIN to analyze queries
EXPLAIN SELECT * FROM activities WHERE crop_id = 1;

-- Add indexes for specific query patterns
CREATE INDEX idx_activities_date_type ON activities(activity_date, activity_type);

-- Use LIMIT for large result sets
SELECT * FROM activities ORDER BY activity_date DESC LIMIT 50;
```

### Maintenance
```sql
-- Optimize tables regularly
OPTIMIZE TABLE activities;
OPTIMIZE TABLE evidence;

-- Analyze tables for query optimization
ANALYZE TABLE crops;
ANALYZE TABLE storage;
```

---

## 🔄 Backup Strategy

### Daily Backups
```bash
#!/bin/bash
# backup_daily.sh
DATE=$(date +%Y%m%d)
mysqldump -u root -p tradie_producer > "backup_${DATE}.sql"
gzip "backup_${DATE}.sql"
```

### Automated Backups (Cron)
```bash
# Add to crontab: crontab -e
0 2 * * * /path/to/backup_daily.sh
```

### Restore from Backup
```bash
# Decompress if gzipped
gunzip backup_20251021.sql.gz

# Restore
mysql -u root -p tradie_producer < backup_20251021.sql
```

---

## 📚 Additional Resources

### Documentation
- [DATABASE_SCHEMA_COMPLETE.md](../DATABASE_SCHEMA_COMPLETE.md) - PostgreSQL version
- [INTEGRATED_PRODUCER_SYSTEM_COMPLETE.md](../INTEGRATED_PRODUCER_SYSTEM_COMPLETE.md) - System overview
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Detailed migration guide

### API Endpoints
See API documentation for endpoints that interact with these tables.

### Frontend Components
All 7 screens in `/components/producer-dashboard/` use this schema.

---

## ✅ Verification Checklist

After setup, verify:

- [ ] All 12 tables created
- [ ] Sample data inserted (if dev setup)
- [ ] Foreign keys working
- [ ] Indexes created
- [ ] Character set is utf8mb4
- [ ] Application can connect
- [ ] Basic CRUD operations work
- [ ] JSON fields accept data
- [ ] Cascading deletes work correctly

---

## 📞 Support

**Issues:** Create an issue in the project repository  
**Email:** dev@tradie.com  
**Documentation:** See main README.md

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 3.0 | Oct 21, 2025 | Complete 12-table schema |
| 2.0 | - | Added health monitoring tables |
| 1.0 | - | Initial basic schema (10 tables) |

---

**Last Updated:** October 21, 2025  
**Schema Version:** 3.0  
**Compatible With:** MySQL 8.0+, MariaDB 10.5+  
**Status:** ✅ Production Ready
