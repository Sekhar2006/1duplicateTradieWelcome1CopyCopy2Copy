# 🚀 Services Hub API - Quick Reference Card

**Base URL:** `http://localhost:3001/api`  
**Version:** 2.0  
**Date:** October 22, 2025

---

## 📌 Quick Links

| Resource | Endpoint | Method |
|----------|----------|--------|
| **Providers** | `/providers` | GET, POST |
| **Provider Detail** | `/providers/:id` | GET, PUT, DELETE |
| **Equipment** | `/equipment` | GET, POST |
| **Labor** | `/labor` | GET, POST |
| **Products** | `/seller-products` | GET, POST |
| **Worker Support** | `/worker-support` | GET, POST |
| **Requests** | `/service-requests` | GET, POST |
| **Alerts** | `/seasonal-alerts` | GET |

---

## 🔍 Common Queries

### Get Available Equipment in District
```bash
GET /api/providers?category=equipment-rental&district=Mandya&availability=available
```

### Get Hybrid Seeds Sellers
```bash
GET /api/seller-products?product_category=Seeds&product_subcategory=Hybrid
```

### Get Skilled Labor (Mechanics)
```bash
GET /api/labor?labor_type=Skilled&labor_category=Mechanics
```

### Get Top Rated Providers
```bash
GET /api/providers?rating=4.5&verified=true&limit=10
```

### Get Housing Services
```bash
GET /api/worker-support?service_type=Housing&district=Mandya
```

---

## 📝 Request Examples

### Create Service Request

```bash
curl -X POST http://localhost:3001/api/service-requests \
  -H "Content-Type: application/json" \
  -H "User-Id: 1" \
  -d '{
    "provider_id": 1,
    "service_type": "equipment",
    "subcategory": "JCB",
    "request_description": "Need JCB for land leveling",
    "location": "My Farm, Mandya",
    "district": "Mandya",
    "state": "Karnataka",
    "start_date": "2025-10-25",
    "budget": 25000,
    "urgency": "high"
  }'
```

### Add New Provider

```bash
curl -X POST http://localhost:3001/api/providers \
  -H "Content-Type: application/json" \
  -H "User-Id: 1" \
  -d '{
    "name": "New Equipment Rental",
    "service_type": "equipment",
    "provider_type": "rental",
    "category": "equipment-rental",
    "subcategory": "Harvester",
    "contact_info": {
      "phone": "+91 98765 12345",
      "email": "newprovider@example.com"
    },
    "location": "Mysuru, Karnataka",
    "district": "Mysuru",
    "state": "Karnataka",
    "description": "Modern harvesting equipment",
    "services": ["Combine Harvester"],
    "experience_years": 10,
    "pricing": {
      "type": "daily",
      "amount": 5000,
      "unit": "per day"
    }
  }'
```

---

## 🎯 Filter Parameters

### Providers Endpoint

| Parameter | Type | Example | Description |
|-----------|------|---------|-------------|
| `category` | string | `equipment-rental` | Filter by category |
| `providerType` | string | `rental` | rental/seller/service/consultant |
| `subcategory` | string | `JCB` | Specific subcategory |
| `district` | string | `Mandya` | Location filter |
| `state` | string | `Karnataka` | State filter |
| `availability` | string | `available` | available/busy/booked |
| `rating` | number | `4.5` | Minimum rating |
| `verified` | boolean | `true` | Verified only |
| `search` | string | `organic` | Search query |
| `limit` | number | `20` | Results per page |
| `offset` | number | `0` | Pagination offset |

---

## 📊 Response Formats

### Success Response
```json
{
  "success": true,
  "data": [ /* array of results */ ],
  "pagination": {
    "total": 50,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Failed to fetch providers",
  "message": "Detailed error message"
}
```

---

## 🔑 Provider Types

| Type | Badge | Description |
|------|-------|-------------|
| `rental` | 🔵 Rental | Equipment and machinery for hire |
| `seller` | 🟢 Seller | Material and input sellers |
| `service` | 🟡 Service | Labor and service providers |
| `consultant` | 🟣 Consultant | Professional advisors |

---

## 📦 Database Tables

| Table | Purpose |
|-------|---------|
| `service_providers` | Main provider info |
| `equipment_details` | Equipment rental details |
| `labor_details` | Labor service details |
| `seller_products` | Product listings |
| `worker_support_services` | Housing/transport |
| `service_requests` | Service requests |
| `provider_reviews` | Reviews & ratings |
| `seasonal_alerts` | Season alerts |

---

## 🔐 Authentication

**Header Required:**
```
User-Id: 1
```

**Coming Soon:**
```
Authorization: Bearer <JWT_TOKEN>
```

---

## ⚡ Quick Setup

```bash
# 1. Setup database
mysql -u root -p tradie_db < database/schema_services_providers.sql

# 2. Install dependencies
cd api && npm install

# 3. Start server
npm start

# 4. Test
curl http://localhost:3001/api/providers
```

---

## 🧪 Testing Commands

```bash
# Health check
curl http://localhost:3001/health

# Get all providers
curl http://localhost:3001/api/providers

# Get equipment in Mandya
curl "http://localhost:3001/api/providers?category=equipment-rental&district=Mandya"

# Get top rated
curl "http://localhost:3001/api/providers?rating=4.5&limit=5"

# Get alerts
curl http://localhost:3001/api/seasonal-alerts
```

---

## 📱 Frontend Integration

### React Hook Example

```typescript
function useProviders(filters = {}) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(filters);
    fetch(`/api/providers?${params}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setProviders(data.data);
        setLoading(false);
      });
  }, [filters]);

  return { providers, loading };
}

// Usage
const { providers, loading } = useProviders({
  category: 'equipment-rental',
  district: 'Mandya'
});
```

---

## 🎨 Sample Provider Object

```json
{
  "provider_id": 1,
  "name": "Kumar Earth Movers",
  "service_type": "equipment",
  "provider_type": "rental",
  "category": "equipment-rental",
  "subcategory": "JCB",
  "location": "Mandya, Karnataka",
  "district": "Mandya",
  "state": "Karnataka",
  "rating": 4.8,
  "reviews_count": 156,
  "verified": true,
  "grok_score": 92,
  "availability": "available",
  "contact_info": {
    "phone": "+91 98765 43210",
    "email": "kumar.earthmovers@gmail.com"
  },
  "pricing": {
    "type": "hourly",
    "amount": 1200,
    "unit": "per hour"
  },
  "services": ["JCB 3DX", "Excavation", "Land Leveling"],
  "experience_years": 12,
  "certifications": ["JCB Certified Operator"],
  "response_time": "< 2 hours",
  "completion_rate": 98
}
```

---

## 🔄 Status Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Success |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate entry |
| 500 | Server Error | Internal error |

---

## 📚 Documentation

- **Full API Docs:** `/SERVICES_BACKEND_API_COMPLETE.md`
- **Integration Guide:** `/SERVICES_BACKEND_INTEGRATION_SUMMARY.md`
- **Frontend Docs:** `/SERVICES_ENHANCED_COMPLETE.md`
- **Database Schema:** `/database/schema_services_providers.sql`

---

## 🎯 Common Use Cases

### 1. Find Equipment to Rent
```javascript
const equipment = await fetch('/api/providers?' + new URLSearchParams({
  category: 'equipment-rental',
  subcategory: 'JCB',
  district: 'Mandya',
  availability: 'available'
})).then(r => r.json());
```

### 2. Buy Seeds
```javascript
const seeds = await fetch('/api/seller-products?' + new URLSearchParams({
  product_category: 'Seeds',
  product_subcategory: 'Hybrid',
  district: 'Mysuru'
})).then(r => r.json());
```

### 3. Hire Labor
```javascript
const labor = await fetch('/api/labor?' + new URLSearchParams({
  labor_type: 'Unskilled',
  district: 'Mandya'
})).then(r => r.json());
```

### 4. Get Housing for Workers
```javascript
const housing = await fetch('/api/worker-support?' + new URLSearchParams({
  service_type: 'Housing',
  district: 'Mandya'
})).then(r => r.json());
```

---

## ⚠️ Important Notes

1. **Authentication:** Currently uses `User-Id` header - implement JWT in production
2. **Pagination:** Use `limit` and `offset` for large datasets
3. **Filtering:** Combine multiple filters for precise results
4. **Status:** Only `approved` providers returned in GET requests
5. **Grok AI:** Service requests include AI fraud detection

---

## 🚀 Production Checklist

- [ ] Implement JWT authentication
- [ ] Add rate limiting
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure CORS for production domain
- [ ] Add request logging
- [ ] Set up monitoring (e.g., PM2)
- [ ] Add caching layer (Redis)

---

**TRADIE Services Hub API - Quick Reference v2.0**  
**Ready for Production - October 22, 2025**
