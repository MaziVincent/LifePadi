# Review System API Documentation

## Overview

The LifePadi Review System provides comprehensive APIs for managing customer reviews of both products and vendors. This system enables customers to share their experiences, helps maintain quality standards, and provides valuable insights for business decisions.

## Table of Contents

1. [Product Review API](#product-review-api)
2. [Vendor Review API](#vendor-review-api)
3. [Authentication & Authorization](#authentication--authorization)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)

---

## Product Review API

Base URL: `/api/productreview`

### Endpoints

#### Get All Product Reviews (Admin Only)

```http
GET /api/productreview/all
```

**Authorization**: Admin only  
**Description**: Retrieves all product reviews in the system  
**Response**: Array of ProductReviewDto objects

#### Get All Product Reviews (Paginated, Admin Only)

```http
GET /api/productreview/all/paginated?pageNumber=1&pageSize=10
```

**Authorization**: Admin only  
**Parameters**:

- `pageNumber` (query, optional): Page number (default: 1)
- `pageSize` (query, optional): Items per page (1-100, default: 10)

**Response**:

```json
{
  "data": [ProductReviewDto],
  "pageNumber": 1,
  "pageSize": 10,
  "totalPages": 5,
  "totalRecords": 50
}
```

#### Get Reviews by Product ID

```http
GET /api/productreview/allByProduct/{productId}
```

**Authorization**: None required  
**Parameters**:

- `productId` (path): Product ID to fetch reviews for

**Response**: Array of ProductReviewDto objects

#### Get Reviews by Product ID (Paginated)

```http
GET /api/productreview/allByProduct/{productId}/paginated?pageNumber=1&pageSize=10
```

**Authorization**: None required  
**Parameters**:

- `productId` (path): Product ID to fetch reviews for
- `pageNumber` (query, optional): Page number (default: 1)
- `pageSize` (query, optional): Items per page (1-100, default: 10)

#### Get Product Average Rating

```http
GET /api/productreview/averageRating/{productId}
```

**Authorization**: None required  
**Parameters**:

- `productId` (path): Product ID to get average rating for

**Response**:

```json
{
	"averageRating": 4.2
}
```

#### Get Specific Product Review

```http
GET /api/productreview/{id}
```

**Authorization**: None required  
**Parameters**:

- `id` (path): Review ID

**Response**: ProductReviewDto object

#### Create Product Review

```http
POST /api/productreview/create
Content-Type: application/json
```

**Authorization**: Authenticated users only  
**Request Body**:

```json
{
	"rating": 4.5,
	"body": "Great product! Really satisfied with the quality.",
	"customerId": 123,
	"productId": 456
}
```

**Response**: Created ProductReviewDto object  
**Status Codes**:

- `201 Created`: Review created successfully
- `409 Conflict`: Customer has already reviewed this product

#### Update Product Review

```http
PUT /api/productreview/update/{id}
Content-Type: application/json
```

**Authorization**: Authenticated users only (resource owner or admin)  
**Parameters**:

- `id` (path): Review ID to update

**Request Body**: Same as create request

#### Delete Product Review

```http
DELETE /api/productreview/delete/{id}
```

**Authorization**: Authenticated users only (resource owner or admin)  
**Parameters**:

- `id` (path): Review ID to delete

#### Get Product Review Statistics

```http
GET /api/productreview/stats/{productId}
```

**Authorization**: None required  
**Parameters**:

- `productId` (path): Product ID to get statistics for

**Response**:

```json
{
	"totalReviews": 25,
	"averageRating": 4.2,
	"ratingDistribution": {
		"5": 10,
		"4": 8,
		"3": 5,
		"2": 1,
		"1": 1
	}
}
```

#### Get Product Rating Breakdown

```http
GET /api/productreview/ratingBreakdown/{productId}
```

**Authorization**: None required  
**Parameters**:

- `productId` (path): Product ID to get rating breakdown for

#### Get Reviews by Customer

```http
GET /api/productreview/customer/{customerId}
```

**Authorization**: Authenticated users only (resource owner or admin)  
**Parameters**:

- `customerId` (path): Customer ID to get reviews for

---

## Vendor Review API

Base URL: `/api/vendorreview`

### Endpoints

#### Get All Vendor Reviews (Admin Only)

```http
GET /api/vendorreview/all
```

**Authorization**: Admin only  
**Description**: Retrieves all vendor reviews in the system

#### Get All Vendor Reviews (Paginated, Admin Only)

```http
GET /api/vendorreview/all/paginated?pageNumber=1&pageSize=10
```

**Authorization**: Admin only  
**Parameters**:

- `pageNumber` (query, optional): Page number (default: 1)
- `pageSize` (query, optional): Items per page (1-100, default: 10)

#### Get Reviews by Vendor ID

```http
GET /api/vendorreview/allByVendor/{vendorId}
```

**Authorization**: None required  
**Parameters**:

- `vendorId` (path): Vendor ID to fetch reviews for

#### Get Reviews by Vendor ID (Paginated)

```http
GET /api/vendorreview/allByVendor/{vendorId}/paginated?pageNumber=1&pageSize=10
```

**Authorization**: None required  
**Parameters**:

- `vendorId` (path): Vendor ID to fetch reviews for
- `pageNumber` (query, optional): Page number (default: 1)
- `pageSize` (query, optional): Items per page (1-100, default: 10)

#### Get Vendor Average Rating

```http
GET /api/vendorreview/averageRating/{vendorId}
```

**Authorization**: None required  
**Parameters**:

- `vendorId` (path): Vendor ID to get average rating for

#### Get Specific Vendor Review

```http
GET /api/vendorreview/{id}
```

**Authorization**: None required  
**Parameters**:

- `id` (path): Review ID

#### Create Vendor Review

```http
POST /api/vendorreview/create
Content-Type: application/json
```

**Authorization**: Authenticated users only  
**Request Body**:

```json
{
	"rating": 4.0,
	"body": "Excellent service and fast delivery!",
	"customerId": 123,
	"vendorId": 789
}
```

**Status Codes**:

- `201 Created`: Review created successfully
- `409 Conflict`: Customer has already reviewed this vendor

#### Update Vendor Review

```http
PUT /api/vendorreview/update/{id}
Content-Type: application/json
```

**Authorization**: Authenticated users only (resource owner or admin)

#### Delete Vendor Review

```http
DELETE /api/vendorreview/delete/{id}
```

**Authorization**: Authenticated users only (resource owner or admin)

#### Get Vendor Review Statistics

```http
GET /api/vendorreview/stats/{vendorId}
```

**Authorization**: None required  
**Parameters**:

- `vendorId` (path): Vendor ID to get statistics for

#### Get Vendor Business Insights

```http
GET /api/vendorreview/businessInsights/{vendorId}
```

**Authorization**: None required  
**Parameters**:

- `vendorId` (path): Vendor ID to get business insights for

**Response**: Comprehensive analytics including trends, sentiment analysis, and improvement suggestions

#### Get Reviews by Customer

```http
GET /api/vendorreview/customer/{customerId}
```

**Authorization**: Authenticated users only (resource owner or admin)

---

## Authentication & Authorization

### Authentication

All endpoints requiring authentication use JWT Bearer tokens:

```http
Authorization: Bearer <your_jwt_token>
```

### Authorization Policies

1. **Public Access**: Review reading, statistics, and average ratings
2. **Authenticated Users**: Creating, updating, and deleting own reviews
3. **Resource Owner or Admin**: Accessing specific customer reviews
4. **Admin Only**: Accessing all reviews and administrative functions

### Resource Ownership

Users can only modify their own reviews unless they have admin privileges. The system uses the `ResourceOwnerOrAdmin` attribute to enforce this.

---

## Data Models

### ProductReviewDto

```json
{
	"id": 1,
	"rating": 4.5,
	"body": "Great product! Really satisfied with the quality.",
	"customerId": 123,
	"customer": {
		"id": 123,
		"firstName": "John",
		"lastName": "Doe"
	},
	"productId": 456,
	"product": {
		"id": 456,
		"name": "Wireless Headphones",
		"price": 99.99
	},
	"createdAt": "2025-07-02T10:30:00Z",
	"updatedAt": "2025-07-02T10:30:00Z"
}
```

### VendorReviewDto

```json
{
	"id": 1,
	"rating": 4.0,
	"body": "Excellent service and fast delivery!",
	"customerId": 123,
	"customer": {
		"id": 123,
		"firstName": "John",
		"lastName": "Doe"
	},
	"vendorId": 789,
	"vendor": {
		"id": 789,
		"businessName": "Tech Solutions Ltd",
		"email": "contact@techsolutions.com"
	},
	"createdAt": "2025-07-02T10:30:00Z",
	"updatedAt": "2025-07-02T10:30:00Z"
}
```

### Validation Rules

#### Rating

- **Required**: Yes
- **Range**: 1.0 to 5.0
- **Type**: Double

#### Body (Review Text)

- **Required**: No
- **Maximum Length**: 1000 characters
- **Validation**: No HTML or script content allowed

#### Customer ID

- **Required**: Yes
- **Type**: Integer

#### Product/Vendor ID

- **Required**: Yes
- **Type**: Integer

---

## Error Handling

### Common HTTP Status Codes

- `200 OK`: Successful GET requests
- `201 Created`: Successful POST requests
- `400 Bad Request`: Invalid request data or validation errors
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate review (customer already reviewed)
- `500 Internal Server Error`: Server-side errors

### Error Response Format

```json
{
	"error": "Error message describing what went wrong",
	"details": "Additional details if available"
}
```

### Validation Error Response

```json
{
	"errors": {
		"Rating": ["Rating must be between 1 and 5"],
		"Body": ["Review body cannot exceed 1000 characters"]
	}
}
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Global Limit**: 100 requests per minute per user/IP
- **Login Endpoint**: Special rate limiting applied
- **Headers**: Rate limit information is included in response headers:
  - `X-Rate-Limit-Remaining`: Remaining requests
  - `X-Rate-Limit-Reset`: Reset time

---

## Best Practices

### For API Consumers

1. **Authentication**: Always include valid JWT tokens for protected endpoints
2. **Pagination**: Use paginated endpoints for large datasets
3. **Error Handling**: Implement proper error handling for all status codes
4. **Rate Limiting**: Respect rate limits and implement backoff strategies
5. **Validation**: Validate data before sending requests

### For Review Content

1. **Quality**: Encourage detailed, helpful reviews
2. **Moderation**: Reviews should not contain inappropriate content
3. **Authenticity**: Only allow reviews from verified customers
4. **Updates**: Allow customers to update their reviews within reasonable time limits

### Security Considerations

1. **Input Validation**: All inputs are validated and sanitized
2. **HTML Prevention**: Review bodies cannot contain HTML or scripts
3. **Authorization**: Strict access controls for sensitive operations
4. **Rate Limiting**: Protection against abuse and spam

---

## Example Usage

### JavaScript/TypeScript Example

```javascript
// Create a product review
const createProductReview = async (reviewData, token) => {
	try {
		const response = await fetch("/api/productreview/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(reviewData),
		});

		if (response.ok) {
			const review = await response.json();
			console.log("Review created:", review);
			return review;
		} else {
			const error = await response.json();
			console.error("Error creating review:", error);
		}
	} catch (error) {
		console.error("Network error:", error);
	}
};

// Get product reviews with pagination
const getProductReviews = async (productId, page = 1, size = 10) => {
	try {
		const response = await fetch(
			`/api/productreview/allByProduct/${productId}/paginated?pageNumber=${page}&pageSize=${size}`
		);

		if (response.ok) {
			const reviews = await response.json();
			return reviews;
		}
	} catch (error) {
		console.error("Error fetching reviews:", error);
	}
};
```

### cURL Examples

```bash
# Get product reviews
curl -X GET "https://lifepadi-v2-225229879541.us-east1.run.app/api/productreview/allByProduct/123"

# Create a review (requires authentication)
curl -X POST "https://lifepadi-v2-225229879541.us-east1.run.app/api/productreview/create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "rating": 4.5,
    "body": "Great product!",
    "customerId": 123,
    "productId": 456
  }'

# Get average rating
curl -X GET "https://lifepadi-v2-225229879541.us-east1.run.app/api/productreview/averageRating/123"
```

---

## Support

For additional support or questions about the Review System API:

- **Technical Documentation**: Check the API endpoint documentation
- **Error Troubleshooting**: Refer to the error handling section
- **Rate Limits**: Monitor response headers for rate limit information
- **Authentication Issues**: Verify JWT token validity and permissions

---

_This documentation is current as of July 2, 2025. Please refer to the latest API documentation for any updates._
