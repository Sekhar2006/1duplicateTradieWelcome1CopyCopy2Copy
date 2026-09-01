# 🔌 Practical API Examples - Services Hub

**Real-world examples matching your API format**  
**Date:** October 22, 2025  
**Base URL:** `http://localhost:3001/api`

---

## 📝 Example 1: Add New Service Provider

### Request

**Endpoint:** `POST /api/providers`

**Headers:**
```
Content-Type: application/json
User-Id: 1
```

**Request Body:**
```json
{
  "name": "Green Farm Equipment Rentals",
  "service_type": "equipment",
  "category": "JCB",
  "contact_info": {
    "phone": "+911234567890",
    "email": "contact@greenfarmequip.com",
    "address": "123 Rural Rd, Guntur"
  },
  "location": "Guntur, Andhra Pradesh",
  "description": "Provider of JCB and other earth moving machinery on lease with operator.",
  "rating": 4.5,
  "documents": ["https://example.com/licenses/greenfarm_jcb_license.pdf"]
}
```

### Response

**Status:** `201 Created`

```json
{
  "success": true,
  "message": "Provider submitted for review",
  "data": {
    "provider_id": 101,
    "status": "pending"
  }
}
```

### cURL Command

```bash
curl -X POST http://localhost:3001/api/providers \
  -H "Content-Type: application/json" \
  -H "User-Id: 1" \
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
    "description": "Provider of JCB and other earth moving machinery on lease with operator.",
    "rating": 4.5,
    "documents": ["https://example.com/licenses/greenfarm_jcb_license.pdf"]
  }'
```

### JavaScript (Fetch)

```javascript
const response = await fetch('http://localhost:3001/api/providers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Id': '1'
  },
  body: JSON.stringify({
    name: "Green Farm Equipment Rentals",
    service_type: "equipment",
    category: "JCB",
    contact_info: {
      phone: "+911234567890",
      email: "contact@greenfarmequip.com",
      address: "123 Rural Rd, Guntur"
    },
    location: "Guntur, Andhra Pradesh",
    description: "Provider of JCB and other earth moving machinery on lease with operator.",
    rating: 4.5,
    documents: ["https://example.com/licenses/greenfarm_jcb_license.pdf"]
  })
});

const data = await response.json();
console.log(data);
// { success: true, data: { provider_id: 101, status: "pending" } }
```

---

## 🔍 Example 2: Get Service Providers (Filtered)

### Request

**Endpoint:** `GET /api/providers?service_type=equipment&category=JCB&location=Guntur`

**Headers:**
```
Content-Type: application/json
```

**Query Parameters:**
- `service_type` = equipment
- `category` = JCB
- `location` = Guntur

### Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "provider_id": 101,
      "name": "Green Farm Equipment Rentals",
      "service_type": "equipment",
      "category": "JCB",
      "contact_info": {
        "phone": "+911234567890",
        "email": "contact@greenfarmequip.com",
        "address": "123 Rural Rd, Guntur"
      },
      "location": "Guntur, Andhra Pradesh",
      "description": "Provider of JCB and other earth moving machinery on lease with operator.",
      "rating": 4.5,
      "verified": false,
      "availability": "available",
      "reviews_count": 0,
      "grok_score": 0,
      "status": "pending",
      "documents": ["https://example.com/licenses/greenfarm_jcb_license.pdf"]
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20,
    "offset": 0,
    "hasMore": false
  }
}
```

### cURL Command

```bash
curl "http://localhost:3001/api/providers?service_type=equipment&category=JCB&location=Guntur"
```

### JavaScript (Fetch)

```javascript
const params = new URLSearchParams({
  service_type: 'equipment',
  category: 'JCB',
  location: 'Guntur'
});

const response = await fetch(`http://localhost:3001/api/providers?${params}`);
const data = await response.json();

console.log(data.data); // Array of providers
console.log(data.pagination); // Pagination info
```

---

## 📊 Example 3: Get All Equipment in a District

### Request

**Endpoint:** `GET /api/providers?service_type=equipment&district=Guntur&state=Andhra Pradesh`

### Response

```json
{
  "success": true,
  "data": [
    {
      "provider_id": 101,
      "name": "Green Farm Equipment Rentals",
      "service_type": "equipment",
      "category": "JCB",
      "location": "Guntur, Andhra Pradesh",
      "district": "Guntur",
      "state": "Andhra Pradesh",
      "rating": 4.5,
      "verified": false,
      "availability": "available"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20,
    "offset": 0,
    "hasMore": false
  }
}
```

### cURL Command

```bash
curl "http://localhost:3001/api/providers?service_type=equipment&district=Guntur&state=Andhra%20Pradesh"
```

---

## 🌾 Example 4: Add Seller Provider (Seeds)

### Request

**Endpoint:** `POST /api/providers`

**Request Body:**
```json
{
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
  "description": "Premium hybrid seeds for all crops. Government certified.",
  "rating": 0,
  "documents": {
    "license": "https://example.com/licenses/seed_license.pdf",
    "certification": "https://example.com/certs/govt_certified.pdf"
  }
}
```

### Response

```json
{
  "success": true,
  "message": "Provider submitted for review",
  "data": {
    "provider_id": 102,
    "status": "pending"
  }
}
```

---

## 👷 Example 5: Add Labor Provider

### Request

**Endpoint:** `POST /api/providers`

**Request Body:**
```json
{
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
  "description": "Reliable labor pool of 300+ workers for all farm activities.",
  "rating": 0
}
```

### Response

```json
{
  "success": true,
  "message": "Provider submitted for review",
  "data": {
    "provider_id": 103,
    "status": "pending"
  }
}
```

---

## 🏗️ Example 6: Add Equipment Details

After adding a provider, add equipment details:

### Request

**Endpoint:** `POST /api/equipment`

**Request Body:**
```json
{
  "provider_id": 101,
  "equipment_type": "JCB",
  "model": "JCB 3DX",
  "hourly_rate": 1500,
  "daily_rate": 10000,
  "operator_included": true,
  "delivery_available": true,
  "specifications": {
    "power": "74 HP",
    "digging_depth": "4.3m",
    "bucket_capacity": "1.0 cum"
  }
}
```

### Response

```json
{
  "success": true,
  "message": "Equipment added successfully",
  "data": {
    "equipment_id": 1
  }
}
```

---

## 🛒 Example 7: Add Seller Product

### Request

**Endpoint:** `POST /api/seller-products`

**Request Body:**
```json
{
  "provider_id": 102,
  "product_category": "Seeds",
  "product_name": "Chili Hybrid Seeds - G4",
  "price_per_unit": 500,
  "unit_type": "100g packet",
  "available_quantity": 1000,
  "stock_status": "in_stock",
  "certifications": ["Government Certified", "High Yield Variety"]
}
```

### Response

```json
{
  "success": true,
  "message": "Product added successfully",
  "data": {
    "product_id": 1
  }
}
```

---

## 📝 Example 8: Create Service Request

Producer requests equipment from a provider:

### Request

**Endpoint:** `POST /api/service-requests`

**Headers:**
```
Content-Type: application/json
User-Id: 1
```

**Request Body:**
```json
{
  "provider_id": 101,
  "service_type": "equipment",
  "subcategory": "JCB",
  "request_description": "Need JCB for land leveling of 5 acres. Soil is clay type.",
  "location": "My Farm, Pedanandipadu, Guntur",
  "district": "Guntur",
  "state": "Andhra Pradesh",
  "start_date": "2025-10-28",
  "end_date": "2025-10-30",
  "budget": 30000,
  "urgency": "high"
}
```

### Response

```json
{
  "success": true,
  "message": "Service request submitted successfully",
  "data": {
    "request_id": 1,
    "grok_anomaly_detected": false
  }
}
```

---

## 🔍 Example 9: Get My Service Requests

### Request

**Endpoint:** `GET /api/service-requests`

**Headers:**
```
User-Id: 1
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "request_id": 1,
      "provider_id": 101,
      "provider_name": "Green Farm Equipment Rentals",
      "provider_type": "rental",
      "service_type": "equipment",
      "subcategory": "JCB",
      "request_description": "Need JCB for land leveling of 5 acres. Soil is clay type.",
      "location": "My Farm, Pedanandipadu, Guntur",
      "start_date": "2025-10-28",
      "end_date": "2025-10-30",
      "budget": 30000,
      "urgency": "high",
      "status": "pending",
      "created_at": "2025-10-22T14:30:00Z"
    }
  ]
}
```

---

## ⚠️ Example 10: Get Seasonal Alerts

### Request

**Endpoint:** `GET /api/seasonal-alerts?district=Guntur&state=Andhra Pradesh`

### Response

```json
{
  "success": true,
  "data": [
    {
      "alert_id": 1,
      "alert_type": "labor",
      "severity": "high",
      "message": "Labor scarcity expected during harvest season (Nov-Dec)",
      "suggestion": "Book labor services 2 weeks in advance",
      "valid_from": "2025-10-22",
      "valid_to": "2025-12-31",
      "regions": ["Karnataka", "Tamil Nadu", "Andhra Pradesh"],
      "is_active": true
    }
  ]
}
```

---

## 🎯 Complete Workflow Example

### Step 1: Producer Searches for Equipment

```javascript
// Search for JCB in Guntur
const response = await fetch(
  'http://localhost:3001/api/providers?' + new URLSearchParams({
    service_type: 'equipment',
    category: 'JCB',
    district: 'Guntur',
    availability: 'available'
  })
);

const { data: providers } = await response.json();
console.log(providers); // List of JCB providers in Guntur
```

### Step 2: Producer Views Provider Details

```javascript
// Get full details of provider
const response = await fetch('http://localhost:3001/api/providers/101');
const { data: provider } = await response.json();

console.log(provider.name); // "Green Farm Equipment Rentals"
console.log(provider.equipment); // Array of equipment details
console.log(provider.recent_reviews); // Recent reviews
```

### Step 3: Producer Submits Request

```javascript
// Create service request
const response = await fetch('http://localhost:3001/api/service-requests', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Id': '1'
  },
  body: JSON.stringify({
    provider_id: 101,
    service_type: 'equipment',
    request_description: 'Need JCB for 3 days',
    location: 'My Farm, Guntur',
    start_date: '2025-10-28',
    budget: 30000,
    urgency: 'high'
  })
});

const { data } = await response.json();
console.log('Request ID:', data.request_id);
```

### Step 4: Producer Checks Request Status

```javascript
// Get my requests
const response = await fetch('http://localhost:3001/api/service-requests', {
  headers: { 'User-Id': '1' }
});

const { data: requests } = await response.json();
console.log(requests[0].status); // "pending", "accepted", "completed"
```

---

## 🧪 Postman Collection

### Import these into Postman:

**Collection Name:** TRADIE Services API

**Requests:**

1. **Add Provider**
   - Method: POST
   - URL: `{{base_url}}/providers`
   - Body: See Example 1

2. **Get Providers**
   - Method: GET
   - URL: `{{base_url}}/providers?service_type=equipment&category=JCB`

3. **Get Provider by ID**
   - Method: GET
   - URL: `{{base_url}}/providers/101`

4. **Add Equipment**
   - Method: POST
   - URL: `{{base_url}}/equipment`
   - Body: See Example 6

5. **Add Product**
   - Method: POST
   - URL: `{{base_url}}/seller-products`
   - Body: See Example 7

6. **Create Request**
   - Method: POST
   - URL: `{{base_url}}/service-requests`
   - Body: See Example 8

7. **Get My Requests**
   - Method: GET
   - URL: `{{base_url}}/service-requests`
   - Headers: User-Id: 1

8. **Get Alerts**
   - Method: GET
   - URL: `{{base_url}}/seasonal-alerts`

**Environment Variables:**
```
base_url = http://localhost:3001/api
user_id = 1
```

---

## 🔒 Authentication

Currently using **User-Id header** for testing:

```
User-Id: 1
```

**For Production:** Replace with JWT authentication:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ❌ Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": "Missing required fields"
}
```

### 404 Not Found

```json
{
  "success": false,
  "error": "Provider not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "error": "Failed to create provider",
  "message": "Duplicate entry for key 'contact_phone'"
}
```

---

## 🎯 Quick Testing Script

Save as `test_api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:3001/api"

echo "Testing TRADIE Services API..."

# Test 1: Get all providers
echo -e "\n1. Getting all providers..."
curl -s "$BASE_URL/providers" | jq .

# Test 2: Get equipment providers in Guntur
echo -e "\n2. Getting equipment in Guntur..."
curl -s "$BASE_URL/providers?service_type=equipment&district=Guntur" | jq .

# Test 3: Add new provider
echo -e "\n3. Adding new provider..."
curl -s -X POST "$BASE_URL/providers" \
  -H "Content-Type: application/json" \
  -H "User-Id: 1" \
  -d '{
    "name": "Test Equipment Rentals",
    "service_type": "equipment",
    "category": "Tractors",
    "contact_info": {"phone": "+911234567890"},
    "location": "Guntur, AP",
    "description": "Test provider"
  }' | jq .

# Test 4: Get seasonal alerts
echo -e "\n4. Getting seasonal alerts..."
curl -s "$BASE_URL/seasonal-alerts" | jq .

echo -e "\n✅ All tests completed!"
```

Make executable and run:
```bash
chmod +x test_api.sh
./test_api.sh
```

---

## 📊 Response Time Benchmarks

**Target Performance:**
- GET /api/providers: < 50ms
- POST /api/providers: < 100ms
- GET /api/providers/:id: < 30ms
- POST /api/service-requests: < 80ms

**Test with:**
```bash
time curl "http://localhost:3001/api/providers"
```

---

## ✅ Verification Checklist

After API deployment:

- [ ] Can add new provider (POST /providers)
- [ ] Can get all providers (GET /providers)
- [ ] Can filter by service_type
- [ ] Can filter by category
- [ ] Can filter by location/district
- [ ] Can get provider details (GET /providers/:id)
- [ ] Can add equipment details
- [ ] Can add seller products
- [ ] Can create service request
- [ ] Can get my requests
- [ ] Can get seasonal alerts
- [ ] Error handling works (404, 400, 500)
- [ ] Pagination works
- [ ] JSON responses valid

---

**TRADIE Services API - Practical Examples**  
**All Examples Match Your Expected Format** ✅  
**Ready for Integration** 🚀
