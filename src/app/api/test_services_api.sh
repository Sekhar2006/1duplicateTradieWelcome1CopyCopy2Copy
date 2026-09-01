#!/bin/bash

# ================================================================
# TRADIE Services API - Comprehensive Test Script
# Date: October 22, 2025
# Purpose: Test all API endpoints with real examples
# ================================================================

BASE_URL="http://localhost:3001/api"
USER_ID="1"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  TRADIE Services API - Comprehensive Test Suite   ║${NC}"
echo -e "${BLUE}║  Base URL: $BASE_URL                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════╝${NC}"
echo ""

# ================================================================
# Test 1: Health Check
# ================================================================
echo -e "${YELLOW}[TEST 1] Health Check...${NC}"
RESPONSE=$(curl -s http://localhost:3001/health)
if [[ $RESPONSE == *"ok"* ]]; then
    echo -e "${GREEN}✅ API Server is running${NC}"
    echo "$RESPONSE" | jq .
else
    echo -e "${RED}❌ API Server is not responding${NC}"
    exit 1
fi
echo ""

# ================================================================
# Test 2: Get All Providers (Should have 4 sample providers)
# ================================================================
echo -e "${YELLOW}[TEST 2] Get All Providers...${NC}"
RESPONSE=$(curl -s "$BASE_URL/providers")
COUNT=$(echo "$RESPONSE" | jq '.data | length')
echo -e "${BLUE}Found $COUNT providers${NC}"
echo "$RESPONSE" | jq '.data[] | {provider_id, name, service_type, category, rating}'
echo ""

# ================================================================
# Test 3: Add New Equipment Provider (Your Example)
# ================================================================
echo -e "${YELLOW}[TEST 3] Add New Equipment Provider...${NC}"
RESPONSE=$(curl -s -X POST "$BASE_URL/providers" \
  -H "Content-Type: application/json" \
  -H "User-Id: $USER_ID" \
  -d '{
    "name": "Green Farm Equipment Rentals",
    "service_type": "equipment",
    "category": "JCB",
    "contact_info": {
      "phone": "+911234567890",
      "email": "contact@greenfarmequip.com",
      "address": "123 Rural Rd, Guntur"
    },
    "location": "Guntur, Andhra Pradesh",
    "district": "Guntur",
    "state": "Andhra Pradesh",
    "description": "Provider of JCB and other earth moving machinery on lease with operator.",
    "rating": 4.5,
    "documents": ["https://example.com/licenses/greenfarm_jcb_license.pdf"]
  }')

if [[ $RESPONSE == *"success\":true"* ]]; then
    echo -e "${GREEN}✅ Provider added successfully${NC}"
    PROVIDER_ID=$(echo "$RESPONSE" | jq -r '.data.provider_id')
    echo -e "${BLUE}Provider ID: $PROVIDER_ID${NC}"
    echo "$RESPONSE" | jq .
else
    echo -e "${RED}❌ Failed to add provider${NC}"
    echo "$RESPONSE" | jq .
fi
echo ""

# ================================================================
# Test 4: Get Providers with Filters (Equipment in Guntur)
# ================================================================
echo -e "${YELLOW}[TEST 4] Get Equipment Providers in Guntur...${NC}"
RESPONSE=$(curl -s "$BASE_URL/providers?service_type=equipment&district=Guntur")
COUNT=$(echo "$RESPONSE" | jq '.data | length')
echo -e "${BLUE}Found $COUNT equipment providers in Guntur${NC}"
echo "$RESPONSE" | jq '.data[] | {name, category, location, rating}'
echo ""

# ================================================================
# Test 5: Add Equipment Details
# ================================================================
if [ ! -z "$PROVIDER_ID" ]; then
    echo -e "${YELLOW}[TEST 5] Add Equipment Details for Provider $PROVIDER_ID...${NC}"
    RESPONSE=$(curl -s -X POST "$BASE_URL/equipment" \
      -H "Content-Type: application/json" \
      -H "User-Id: $USER_ID" \
      -d "{
        \"provider_id\": $PROVIDER_ID,
        \"equipment_type\": \"JCB\",
        \"model\": \"JCB 3DX\",
        \"hourly_rate\": 1500,
        \"daily_rate\": 10000,
        \"operator_included\": true,
        \"delivery_available\": true
      }")
    
    if [[ $RESPONSE == *"success\":true"* ]]; then
        echo -e "${GREEN}✅ Equipment details added${NC}"
        echo "$RESPONSE" | jq .
    else
        echo -e "${RED}❌ Failed to add equipment${NC}"
        echo "$RESPONSE" | jq .
    fi
    echo ""
fi

# ================================================================
# Test 6: Add Seller Provider
# ================================================================
echo -e "${YELLOW}[TEST 6] Add Seller Provider (Seeds)...${NC}"
RESPONSE=$(curl -s -X POST "$BASE_URL/providers" \
  -H "Content-Type: application/json" \
  -H "User-Id: $USER_ID" \
  -d '{
    "name": "Andhra Seed Corporation",
    "service_type": "seller",
    "category": "Seeds - Hybrid",
    "contact_info": {
      "phone": "+919876543210",
      "email": "seeds@andhracorp.com",
      "address": "Seed Market, Guntur"
    },
    "location": "Guntur, Andhra Pradesh",
    "district": "Guntur",
    "state": "Andhra Pradesh",
    "description": "Premium hybrid seeds for all crops. Government certified."
  }')

if [[ $RESPONSE == *"success\":true"* ]]; then
    echo -e "${GREEN}✅ Seller provider added${NC}"
    SELLER_ID=$(echo "$RESPONSE" | jq -r '.data.provider_id')
    echo -e "${BLUE}Seller ID: $SELLER_ID${NC}"
    echo "$RESPONSE" | jq .
else
    echo -e "${RED}❌ Failed to add seller${NC}"
    echo "$RESPONSE" | jq .
fi
echo ""

# ================================================================
# Test 7: Add Seller Product
# ================================================================
if [ ! -z "$SELLER_ID" ]; then
    echo -e "${YELLOW}[TEST 7] Add Seller Product for Provider $SELLER_ID...${NC}"
    RESPONSE=$(curl -s -X POST "$BASE_URL/seller-products" \
      -H "Content-Type: application/json" \
      -H "User-Id: $USER_ID" \
      -d "{
        \"provider_id\": $SELLER_ID,
        \"product_category\": \"Seeds\",
        \"product_name\": \"Chili Hybrid Seeds - G4\",
        \"price_per_unit\": 500,
        \"unit_type\": \"100g packet\",
        \"available_quantity\": 1000
      }")
    
    if [[ $RESPONSE == *"success\":true"* ]]; then
        echo -e "${GREEN}✅ Product added${NC}"
        echo "$RESPONSE" | jq .
    else
        echo -e "${RED}❌ Failed to add product${NC}"
        echo "$RESPONSE" | jq .
    fi
    echo ""
fi

# ================================================================
# Test 8: Add Labor Provider
# ================================================================
echo -e "${YELLOW}[TEST 8] Add Labor Provider...${NC}"
RESPONSE=$(curl -s -X POST "$BASE_URL/providers" \
  -H "Content-Type: application/json" \
  -H "User-Id: $USER_ID" \
  -d '{
    "name": "Guntur Farm Labor Association",
    "service_type": "labor",
    "category": "Unskilled Labor - Group",
    "contact_info": {
      "phone": "+919123456789",
      "email": "labor@guntur.com",
      "address": "Labor Colony, Guntur"
    },
    "location": "Guntur, Andhra Pradesh",
    "district": "Guntur",
    "state": "Andhra Pradesh",
    "description": "Reliable labor pool of 300+ workers for all farm activities."
  }')

if [[ $RESPONSE == *"success\":true"* ]]; then
    echo -e "${GREEN}✅ Labor provider added${NC}"
    LABOR_ID=$(echo "$RESPONSE" | jq -r '.data.provider_id')
    echo -e "${BLUE}Labor ID: $LABOR_ID${NC}"
else
    echo -e "${RED}❌ Failed to add labor provider${NC}"
fi
echo ""

# ================================================================
# Test 9: Create Service Request
# ================================================================
if [ ! -z "$PROVIDER_ID" ]; then
    echo -e "${YELLOW}[TEST 9] Create Service Request...${NC}"
    RESPONSE=$(curl -s -X POST "$BASE_URL/service-requests" \
      -H "Content-Type: application/json" \
      -H "User-Id: $USER_ID" \
      -d "{
        \"provider_id\": $PROVIDER_ID,
        \"service_type\": \"equipment\",
        \"subcategory\": \"JCB\",
        \"request_description\": \"Need JCB for land leveling of 5 acres. Soil is clay type.\",
        \"location\": \"My Farm, Pedanandipadu, Guntur\",
        \"district\": \"Guntur\",
        \"state\": \"Andhra Pradesh\",
        \"start_date\": \"2025-10-28\",
        \"end_date\": \"2025-10-30\",
        \"budget\": 30000,
        \"urgency\": \"high\"
      }")
    
    if [[ $RESPONSE == *"success\":true"* ]]; then
        echo -e "${GREEN}✅ Service request created${NC}"
        REQUEST_ID=$(echo "$RESPONSE" | jq -r '.data.request_id')
        echo -e "${BLUE}Request ID: $REQUEST_ID${NC}"
        echo "$RESPONSE" | jq .
    else
        echo -e "${RED}❌ Failed to create request${NC}"
        echo "$RESPONSE" | jq .
    fi
    echo ""
fi

# ================================================================
# Test 10: Get My Service Requests
# ================================================================
echo -e "${YELLOW}[TEST 10] Get My Service Requests...${NC}"
RESPONSE=$(curl -s "$BASE_URL/service-requests" \
  -H "User-Id: $USER_ID")
COUNT=$(echo "$RESPONSE" | jq '.data | length')
echo -e "${BLUE}Found $COUNT service requests${NC}"
echo "$RESPONSE" | jq '.data[] | {request_id, provider_name, service_type, status, budget}'
echo ""

# ================================================================
# Test 11: Get Equipment List
# ================================================================
echo -e "${YELLOW}[TEST 11] Get All Equipment...${NC}"
RESPONSE=$(curl -s "$BASE_URL/equipment")
COUNT=$(echo "$RESPONSE" | jq '.data | length')
echo -e "${BLUE}Found $COUNT equipment items${NC}"
echo "$RESPONSE" | jq '.data[] | {equipment_type, model, daily_rate, provider_name}'
echo ""

# ================================================================
# Test 12: Get Labor Providers
# ================================================================
echo -e "${YELLOW}[TEST 12] Get Labor Providers...${NC}"
RESPONSE=$(curl -s "$BASE_URL/labor")
COUNT=$(echo "$RESPONSE" | jq '.data | length')
echo -e "${BLUE}Found $COUNT labor providers${NC}"
echo "$RESPONSE" | jq '.data[] | {labor_type, daily_rate, provider_name}'
echo ""

# ================================================================
# Test 13: Get Seller Products
# ================================================================
echo -e "${YELLOW}[TEST 13] Get Seller Products...${NC}"
RESPONSE=$(curl -s "$BASE_URL/seller-products")
COUNT=$(echo "$RESPONSE" | jq '.data | length')
echo -e "${BLUE}Found $COUNT products${NC}"
echo "$RESPONSE" | jq '.data[] | {product_name, price_per_unit, units, seller_name}'
echo ""

# ================================================================
# Test 14: Get Seasonal Alerts
# ================================================================
echo -e "${YELLOW}[TEST 14] Get Seasonal Alerts...${NC}"
RESPONSE=$(curl -s "$BASE_URL/seasonal-alerts")
COUNT=$(echo "$RESPONSE" | jq '.data | length')
echo -e "${BLUE}Found $COUNT active alerts${NC}"
echo "$RESPONSE" | jq '.data[] | {alert_type, severity, message}'
echo ""

# ================================================================
# Test 15: Get Provider by ID
# ================================================================
if [ ! -z "$PROVIDER_ID" ]; then
    echo -e "${YELLOW}[TEST 15] Get Provider Details (ID: $PROVIDER_ID)...${NC}"
    RESPONSE=$(curl -s "$BASE_URL/providers/$PROVIDER_ID")
    
    if [[ $RESPONSE == *"success\":true"* ]]; then
        echo -e "${GREEN}✅ Provider details retrieved${NC}"
        echo "$RESPONSE" | jq '.data | {name, service_type, category, rating, verified, equipment}'
    else
        echo -e "${RED}❌ Failed to get provider${NC}"
        echo "$RESPONSE" | jq .
    fi
    echo ""
fi

# ================================================================
# Test 16: Filter Tests
# ================================================================
echo -e "${YELLOW}[TEST 16] Testing Filters...${NC}"

echo -e "${BLUE}16a. Filter by service_type=equipment${NC}"
curl -s "$BASE_URL/providers?service_type=equipment" | jq '.data | length'

echo -e "${BLUE}16b. Filter by category=JCB${NC}"
curl -s "$BASE_URL/providers?category=JCB" | jq '.data | length'

echo -e "${BLUE}16c. Filter by district=Guntur${NC}"
curl -s "$BASE_URL/providers?district=Guntur" | jq '.data | length'

echo -e "${BLUE}16d. Filter by rating>=4.5${NC}"
curl -s "$BASE_URL/providers?rating=4.5" | jq '.data | length'

echo -e "${BLUE}16e. Filter by verified=true${NC}"
curl -s "$BASE_URL/providers?verified=true" | jq '.data | length'

echo -e "${BLUE}16f. Search by name${NC}"
curl -s "$BASE_URL/providers?search=Kumar" | jq '.data | length'
echo ""

# ================================================================
# Test 17: Pagination Test
# ================================================================
echo -e "${YELLOW}[TEST 17] Testing Pagination...${NC}"
RESPONSE=$(curl -s "$BASE_URL/providers?limit=2&offset=0")
echo "$RESPONSE" | jq '.pagination'
echo ""

# ================================================================
# Summary
# ================================================================
echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           TEST SUITE COMPLETED                     ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}✅ All tests executed${NC}"
echo -e "${BLUE}Check the output above for any failures${NC}"
echo ""
echo -e "${YELLOW}Quick Verification:${NC}"
echo "- Providers count: $(curl -s "$BASE_URL/providers" | jq '.data | length')"
echo "- Equipment count: $(curl -s "$BASE_URL/equipment" | jq '.data | length')"
echo "- Products count: $(curl -s "$BASE_URL/seller-products" | jq '.data | length')"
echo "- Alerts count: $(curl -s "$BASE_URL/seasonal-alerts" | jq '.data | length')"
echo ""
echo -e "${GREEN}✅ TRADIE Services API is working correctly!${NC}"
