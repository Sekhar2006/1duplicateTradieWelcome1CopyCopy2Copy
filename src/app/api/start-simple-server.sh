#!/bin/bash

# TRADIE Simple Quality Check API - Quick Start Script
# This script starts the simplified demo server for testing

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  TRADIE Simple Quality Check API - Quick Start            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Navigate to API directory
cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "⚠️  package.json not found. Creating minimal package.json..."
    cat > package.json << 'EOF'
{
  "name": "tradie-quality-check-api",
  "version": "1.0.0",
  "description": "TRADIE Quality Check API Server",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "start:simple": "node simple-quality-server.js",
    "dev": "nodemon server.js",
    "test": "node test_services_api.sh"
  },
  "dependencies": {
    "express": "^4.18.2",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "uuid": "^9.0.0",
    "mysql2": "^3.6.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
EOF
    npm install
    echo ""
fi

echo "🚀 Starting Simple Quality Check API Server..."
echo ""
echo "📝 Note: This is a simplified demo server using in-memory storage"
echo "   For production, use the full server.js with MySQL database"
echo ""
echo "─────────────────────────────────────────────────────────────"
echo ""

# Start the simple server
node simple-quality-server.js
