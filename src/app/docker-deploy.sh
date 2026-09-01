#!/bin/bash

# ============================================================================
# TRADIE Docker Deployment Script
# Quick deployment for development or production
# ============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo ""
    echo -e "${BLUE}============================================${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}============================================${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    else
        print_success "Docker is installed ($(docker --version))"
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    else
        print_success "Docker Compose is installed ($(docker-compose --version))"
    fi
    
    # Check if Docker daemon is running
    if ! docker info &> /dev/null; then
        print_error "Docker daemon is not running. Please start Docker."
        exit 1
    else
        print_success "Docker daemon is running"
    fi
}

# Generate secrets
generate_secrets() {
    print_header "Generating Secure Secrets"
    
    JWT_SECRET=$(docker run --rm node:18-alpine node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
    PROVENANCE_JWT_SECRET=$(docker run --rm node:18-alpine node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
    
    print_success "JWT_SECRET generated"
    print_success "PROVENANCE_JWT_SECRET generated"
    
    echo ""
    echo -e "${YELLOW}IMPORTANT: Save these secrets securely!${NC}"
    echo ""
    echo "JWT_SECRET=$JWT_SECRET"
    echo "PROVENANCE_JWT_SECRET=$PROVENANCE_JWT_SECRET"
    echo ""
}

# Setup environment
setup_env() {
    print_header "Setting Up Environment"
    
    if [ -f .env ]; then
        print_warning ".env file already exists"
        read -p "Do you want to overwrite it? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Keeping existing .env file"
            return
        fi
    fi
    
    # Copy template
    if [ -f .env.docker ]; then
        cp .env.docker .env
        print_success "Created .env from template"
    else
        print_error ".env.docker template not found"
        exit 1
    fi
    
    # Update with generated secrets
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env
        sed -i '' "s/PROVENANCE_JWT_SECRET=.*/PROVENANCE_JWT_SECRET=$PROVENANCE_JWT_SECRET/" .env
    else
        # Linux
        sed -i "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env
        sed -i "s/PROVENANCE_JWT_SECRET=.*/PROVENANCE_JWT_SECRET=$PROVENANCE_JWT_SECRET/" .env
    fi
    
    print_success "Updated .env with generated secrets"
    
    print_warning "Please review and update other settings in .env:"
    echo "  - DB_PASSWORD"
    echo "  - DB_ROOT_PASSWORD"
    echo "  - APP_URL"
    echo "  - CORS_ORIGIN"
    echo "  - GROK_API_KEY"
    echo ""
}

# Deploy development
deploy_dev() {
    print_header "Deploying Development Environment"
    
    print_info "Starting services with hot-reload..."
    docker-compose -f docker-compose.dev.yml up -d
    
    print_success "Development environment started!"
    echo ""
    echo "Services available at:"
    echo "  Frontend:    http://localhost:3000"
    echo "  Backend API: http://localhost:3001"
    echo "  MySQL:       localhost:3307"
    echo "  phpMyAdmin:  http://localhost:8080 (if --profile tools)"
    echo ""
    echo "View logs: docker-compose -f docker-compose.dev.yml logs -f"
    echo "Stop:      docker-compose -f docker-compose.dev.yml down"
    echo ""
}

# Deploy production
deploy_prod() {
    print_header "Deploying Production Environment"
    
    # Check if .env exists
    if [ ! -f .env ]; then
        print_error ".env file not found. Run setup first."
        exit 1
    fi
    
    print_info "Building production images..."
    docker-compose build
    
    print_info "Starting services..."
    docker-compose up -d
    
    print_success "Production environment started!"
    echo ""
    echo "Services available at:"
    echo "  Application: http://localhost:3001"
    echo "  MySQL:       localhost:3306 (internal)"
    echo ""
    echo "View logs: docker-compose logs -f"
    echo "Stop:      docker-compose down"
    echo ""
    
    # Wait for health check
    print_info "Waiting for application to be healthy..."
    sleep 10
    
    # Test health endpoint
    if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
        print_success "Application is healthy!"
    else
        print_warning "Health check failed. Check logs: docker-compose logs app"
    fi
}

# Show status
show_status() {
    print_header "Docker Container Status"
    
    if docker-compose ps | grep -q "Up"; then
        docker-compose ps
        echo ""
        print_info "Container Logs (last 20 lines):"
        docker-compose logs --tail=20
    else
        print_warning "No containers are running"
        echo ""
        echo "Start development: ./docker-deploy.sh dev"
        echo "Start production:  ./docker-deploy.sh prod"
    fi
}

# Stop services
stop_services() {
    print_header "Stopping Services"
    
    if [ "$1" == "dev" ]; then
        print_info "Stopping development services..."
        docker-compose -f docker-compose.dev.yml down
    else
        print_info "Stopping production services..."
        docker-compose down
    fi
    
    print_success "Services stopped"
}

# Clean up
cleanup() {
    print_header "Cleaning Up Docker Resources"
    
    print_warning "This will remove:"
    echo "  - Stopped containers"
    echo "  - Unused networks"
    echo "  - Dangling images"
    echo ""
    read -p "Continue? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker system prune -f
        print_success "Cleanup complete"
    else
        print_info "Cleanup cancelled"
    fi
}

# Backup database
backup_db() {
    print_header "Backing Up Database"
    
    BACKUP_DIR="./backups"
    mkdir -p $BACKUP_DIR
    
    BACKUP_FILE="$BACKUP_DIR/tradie_backup_$(date +%Y%m%d_%H%M%S).sql.gz"
    
    print_info "Creating backup..."
    
    if docker-compose ps mysql | grep -q "Up"; then
        docker-compose exec -T mysql mysqldump -u root -p${DB_ROOT_PASSWORD:-tradie_root_password_change_this} \
            tradie_production | gzip > $BACKUP_FILE
        print_success "Backup created: $BACKUP_FILE"
    else
        print_error "MySQL container is not running"
        exit 1
    fi
}

# Main menu
show_menu() {
    clear
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║     TRADIE Docker Deployment Tool         ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
    echo ""
    echo "1) Setup Environment (.env file)"
    echo "2) Deploy Development"
    echo "3) Deploy Production"
    echo "4) Show Status"
    echo "5) Stop Services (Dev)"
    echo "6) Stop Services (Prod)"
    echo "7) Backup Database"
    echo "8) Cleanup Docker Resources"
    echo "9) Generate Secrets"
    echo "0) Exit"
    echo ""
    read -p "Select option: " choice
    
    case $choice in
        1) generate_secrets && setup_env ;;
        2) check_prerequisites && deploy_dev ;;
        3) check_prerequisites && deploy_prod ;;
        4) show_status ;;
        5) stop_services dev ;;
        6) stop_services prod ;;
        7) backup_db ;;
        8) cleanup ;;
        9) generate_secrets ;;
        0) exit 0 ;;
        *) print_error "Invalid option" ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    show_menu
}

# Command line arguments
if [ $# -eq 0 ]; then
    show_menu
else
    case $1 in
        setup)
            check_prerequisites
            generate_secrets
            setup_env
            ;;
        dev)
            check_prerequisites
            deploy_dev
            ;;
        prod)
            check_prerequisites
            deploy_prod
            ;;
        status)
            show_status
            ;;
        stop)
            stop_services ${2:-prod}
            ;;
        backup)
            backup_db
            ;;
        clean)
            cleanup
            ;;
        secrets)
            generate_secrets
            ;;
        *)
            echo "Usage: $0 {setup|dev|prod|status|stop|backup|clean|secrets}"
            echo ""
            echo "Commands:"
            echo "  setup    - Setup environment and generate secrets"
            echo "  dev      - Deploy development environment"
            echo "  prod     - Deploy production environment"
            echo "  status   - Show container status"
            echo "  stop     - Stop services (add 'dev' or 'prod')"
            echo "  backup   - Backup MySQL database"
            echo "  clean    - Clean Docker resources"
            echo "  secrets  - Generate new secrets"
            echo ""
            echo "Run without arguments for interactive menu"
            exit 1
            ;;
    esac
fi
