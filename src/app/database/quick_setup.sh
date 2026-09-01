#!/bin/bash

# ============================================================================
# TRADIE Producer System - Quick Database Setup Script
# Version: 3.0
# ============================================================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DB_NAME="tradie_producer"
DB_USER="root"
DB_HOST="localhost"
DB_PORT="3306"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}TRADIE Producer Database Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Function to print messages
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if MySQL is installed
print_info "Checking MySQL installation..."
if ! command -v mysql &> /dev/null; then
    print_error "MySQL is not installed. Please install MySQL 8.0+ or MariaDB 10.5+"
    exit 1
fi
print_success "MySQL found"

# Get database credentials
echo ""
print_info "Database Configuration"
read -p "Database name [tradie_producer]: " input_db_name
DB_NAME=${input_db_name:-$DB_NAME}

read -p "Database user [root]: " input_db_user
DB_USER=${input_db_user:-$DB_USER}

read -p "Database host [localhost]: " input_db_host
DB_HOST=${input_db_host:-$DB_HOST}

read -p "Database port [3306]: " input_db_port
DB_PORT=${input_db_port:-$DB_PORT}

read -sp "Database password: " DB_PASSWORD
echo ""

# Test connection
print_info "Testing database connection..."
if mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "SELECT 1" &> /dev/null; then
    print_success "Database connection successful"
else
    print_error "Failed to connect to database"
    exit 1
fi

# Ask for setup type
echo ""
print_info "Setup Type:"
echo "1. Fresh Installation (recommended for new projects)"
echo "2. Migration from existing schema"
echo "3. Development setup with sample data"
read -p "Select option [1]: " setup_type
setup_type=${setup_type:-1}

# Fresh Installation
if [ "$setup_type" == "1" ]; then
    print_warning "This will DROP the database if it exists. Continue? (y/N)"
    read -p "" confirm
    if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
        print_info "Setup cancelled"
        exit 0
    fi
    
    print_info "Dropping existing database (if exists)..."
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "DROP DATABASE IF EXISTS $DB_NAME;" 2>/dev/null
    
    print_info "Creating database..."
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    
    if [ $? -eq 0 ]; then
        print_success "Database created successfully"
    else
        print_error "Failed to create database"
        exit 1
    fi
    
    print_info "Importing schema..."
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < schema_mysql.sql
    
    if [ $? -eq 0 ]; then
        print_success "Schema imported successfully"
    else
        print_error "Failed to import schema"
        exit 1
    fi
fi

# Migration
if [ "$setup_type" == "2" ]; then
    print_warning "This will modify your existing schema. Backup recommended! Continue? (y/N)"
    read -p "" confirm
    if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
        print_info "Setup cancelled"
        exit 0
    fi
    
    print_info "Creating backup..."
    mysqldump -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" > "backup_$(date +%Y%m%d_%H%M%S).sql"
    
    if [ $? -eq 0 ]; then
        print_success "Backup created"
    else
        print_error "Backup failed"
        exit 1
    fi
    
    print_info "Running migration..."
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < migrate_v1_to_v3.sql
    
    if [ $? -eq 0 ]; then
        print_success "Migration completed"
    else
        print_error "Migration failed"
        print_info "Restore from backup: mysql -u $DB_USER -p $DB_NAME < backup_*.sql"
        exit 1
    fi
fi

# Development setup
if [ "$setup_type" == "3" ]; then
    print_info "Setting up development environment with sample data..."
    
    # Same as option 1
    print_warning "This will DROP the database if it exists. Continue? (y/N)"
    read -p "" confirm
    if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
        print_info "Setup cancelled"
        exit 0
    fi
    
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "DROP DATABASE IF EXISTS $DB_NAME;" 2>/dev/null
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < schema_mysql.sql
    
    print_success "Schema created with sample data"
fi

# Verify installation
print_info "Verifying installation..."

# Check tables
table_count=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -e "SHOW TABLES;" | wc -l)
table_count=$((table_count - 1)) # Subtract header row

if [ $table_count -eq 12 ]; then
    print_success "All 12 tables created successfully"
else
    print_warning "Expected 12 tables, found $table_count"
fi

# Print summary
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Database: ${BLUE}$DB_NAME${NC}"
echo -e "Host: ${BLUE}$DB_HOST:$DB_PORT${NC}"
echo -e "User: ${BLUE}$DB_USER${NC}"
echo -e "Tables: ${BLUE}$table_count${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Update your application's .env file:"
echo "   DB_HOST=$DB_HOST"
echo "   DB_PORT=$DB_PORT"
echo "   DB_NAME=$DB_NAME"
echo "   DB_USER=$DB_USER"
echo "   DB_PASSWORD=your_password"
echo ""
echo "2. Test the connection from your application"
echo ""
echo "3. Review documentation:"
echo "   - DATABASE_SCHEMA_COMPLETE.md"
echo "   - MIGRATION_GUIDE.md"
echo ""
print_success "Database is ready to use!"
