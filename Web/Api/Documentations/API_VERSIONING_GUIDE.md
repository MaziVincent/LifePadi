# LifePadi API Versioning Guide

## Overview

The LifePadi API uses semantic versioning to ensure backward compatibility and smooth transitions when introducing new features or breaking changes.

## Current Version

**Current API Version: v1.0**

- Base URL: `https://api.lifepadi.com/api/v1`
- Documentation: `https://api.lifepadi.com/api-docs/v1`

## Versioning Strategy

### Semantic Versioning (SemVer)

We follow semantic versioning principles:

- **MAJOR.MINOR.PATCH** (e.g., 1.2.3)
- **MAJOR**: Breaking changes that require client updates
- **MINOR**: New features that are backward compatible
- **PATCH**: Bug fixes and minor improvements

### Version Support Policy

- **Current Version (v1.x)**: Full support with new features and bug fixes
- **Previous Major Version**: Security updates and critical bug fixes for 12 months
- **Deprecated Versions**: 6-month notice before removal

## Version History

### Version 1.0 (Current)

**Release Date**: January 2024
**Status**: Stable

**Features:**

- Complete authentication system with JWT
- Product catalog management
- Order processing and tracking
- Payment integration with multiple providers
- Real-time delivery tracking
- Review and rating system
- Wallet functionality
- Vendor management portal
- Customer support system

**Breaking Changes from Beta:**

- Authentication endpoint moved from `/auth` to `/api/auth`
- Response format standardized with `ApiResponse<T>` wrapper
- Error codes restructured for consistency

### Version 0.9 (Beta) - DEPRECATED

**Release Date**: October 2023
**Status**: Deprecated (End of life: July 2024)

**Features:**

- Basic CRUD operations
- Simple authentication
- Limited payment options

## API Versioning Implementation

### URL Versioning (Recommended)

```
https://api.lifepadi.com/api/v1/products
https://api.lifepadi.com/api/v1/orders
https://api.lifepadi.com/api/v1/auth/login
```

### Header Versioning (Alternative)

```http
GET /api/products
Accept: application/vnd.lifepadi.v1+json
API-Version: 1.0
```

### Version-Specific Endpoints

Some endpoints may have version-specific behavior:

#### Authentication

```http
# v1.0 - Current
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}

# Response includes refresh token and user roles
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt_token",
    "refreshToken": "refresh_token",
    "expiresIn": 3600
  }
}
```

#### Product Search

```http
# v1.0 - Enhanced search with filters
GET /api/v1/products/search?q=pizza&category=food&priceMin=10&priceMax=25&rating=4

# v0.9 - Basic search (deprecated)
GET /api/v0.9/products/search?term=pizza
```

## Migration Guides

### Migrating from v0.9 to v1.0

#### 1. Authentication Changes

**Old (v0.9):**

```javascript
// Login request
POST /auth/login
{
  "username": "user@example.com",
  "pass": "password"
}

// Response
{
  "token": "jwt_token",
  "user": { ... }
}
```

**New (v1.0):**

```javascript
// Login request
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password"
}

// Response
{
  "success": true,
  "data": {
    "token": "jwt_token",
    "refreshToken": "refresh_token",
    "user": { ... }
  },
  "message": "Login successful",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### 2. Response Format Changes

**Old (v0.9):**

```json
// Success response
{
  "data": [...],
  "status": "ok"
}

// Error response
{
  "error": "Something went wrong",
  "status": "error"
}
```

**New (v1.0):**

```json
// Success response
{
  "success": true,
  "data": [...],
  "message": "Operation completed successfully",
  "timestamp": "2024-01-01T12:00:00Z"
}

// Error response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [...]
  },
  "timestamp": "2024-01-01T12:00:00Z",
  "correlationId": "abc123"
}
```

#### 3. Pagination Changes

**Old (v0.9):**

```http
GET /products?page=1&limit=10

Response:
{
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

**New (v1.0):**

```http
GET /api/products?pageNumber=1&pageSize=10

Response:
{
  "success": true,
  "data": [...],
  "metadata": {
    "totalCount": 100,
    "pageNumber": 1,
    "pageSize": 10,
    "totalPages": 10
  }
}
```

## Version-Specific Features

### v1.0 Features

- **Enhanced Security**: Advanced JWT with refresh tokens
- **Real-time Updates**: WebSocket support for live order tracking
- **Advanced Search**: Multiple filters and sorting options
- **Webhook Support**: Event-driven integrations
- **Rate Limiting**: API usage controls
- **Comprehensive Logging**: Detailed audit trails

### v1.1 Features (Planned - Q2 2024)

- **GraphQL Endpoint**: Flexible data querying
- **Batch Operations**: Multiple operations in single request
- **Advanced Analytics**: Business intelligence endpoints
- **Multi-language Support**: Internationalization features

### v2.0 Features (Planned - Q4 2024)

- **Microservices Architecture**: Distributed system design
- **Advanced ML Features**: Recommendation engine
- **Blockchain Integration**: Decentralized payments
- **IoT Support**: Smart device integration

## Deprecation Process

### Phase 1: Announcement (3 months before deprecation)

- Official announcement via email and documentation
- Addition of deprecation warnings in API responses
- Migration guide publication

### Phase 2: Warning Period (2 months before deprecation)

- Deprecation headers in API responses
- Reduced support for deprecated endpoints
- Active migration assistance

### Phase 3: End of Life

- Deprecated endpoints return 410 Gone status
- Complete removal from documentation
- No further support

## Client Implementation

### Version Detection

```javascript
// Automatic version detection
const response = await fetch('/api/version');
const versionInfo = await response.json();

console.log(versionInfo);
// Output:
{
  "apiVersion": "1.0",
  "supportedVersions": ["1.0", "0.9"],
  "deprecatedVersions": ["0.9"],
  "latestVersion": "1.0"
}
```

### Client Library Versioning

```javascript
// Install specific version
npm install lifepadi-api-client@^1.0.0

// Use with version specification
import { LifePadiClient } from 'lifepadi-api-client';

const client = new LifePadiClient({
  apiVersion: '1.0',
  baseUrl: 'https://api.lifepadi.com'
});
```

## Testing Across Versions

### Environment Setup

```bash
# Development environment
export API_BASE_URL=https://dev-api.lifepadi.com
export API_VERSION=1.0

# Staging environment
export API_BASE_URL=https://staging-api.lifepadi.com
export API_VERSION=1.0

# Production environment
export API_BASE_URL=https://api.lifepadi.com
export API_VERSION=1.0
```

### Version-Specific Testing

```javascript
// Test suite for version compatibility
describe("API Version Compatibility", () => {
	test("v1.0 authentication", async () => {
		const response = await client.v1.auth.login(credentials);
		expect(response.data.refreshToken).toBeDefined();
	});

	test("v0.9 migration compatibility", async () => {
		const v09Response = await client.v09.auth.login(credentials);
		const v10Response = await client.v1.auth.login(credentials);

		expect(v10Response.data.user.id).toBe(v09Response.user.id);
	});
});
```

## Version-Specific Documentation

- **v1.0**: `/api-docs/v1/` (Current)
- **v0.9**: `/api-docs/v0.9/` (Deprecated)

## Support and Communication

### Getting Help

- **Current Version Support**: support@lifepadi.com
- **Migration Assistance**: migration@lifepadi.com
- **Developer Community**: https://developers.lifepadi.com

### Stay Updated

- **API Changelog**: https://developers.lifepadi.com/changelog
- **Migration Notices**: https://developers.lifepadi.com/migrations
- **Developer Newsletter**: Subscribe at https://developers.lifepadi.com/newsletter

## Best Practices

### For API Consumers

1. **Always specify version** in your requests
2. **Monitor deprecation warnings** in response headers
3. **Test against multiple versions** during migration periods
4. **Subscribe to API announcements** for early notification
5. **Use semantic versioning** in your client libraries

### For Internal Development

1. **Maintain backward compatibility** within major versions
2. **Document all breaking changes** thoroughly
3. **Provide migration tools** where possible
4. **Test version compatibility** in CI/CD pipeline
5. **Gradual rollout** of new versions
