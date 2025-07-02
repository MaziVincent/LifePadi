# LifePadi API Usage Examples

This document provides comprehensive examples of how to use the LifePadi API endpoints.

## Authentication

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response:**

```json
{
	"success": true,
	"data": {
		"user": {
			"id": 1,
			"email": "user@example.com",
			"firstName": "John",
			"lastName": "Doe",
			"role": "Customer"
		},
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"refreshToken": "refresh_token_here"
	},
	"message": "Login successful",
	"timestamp": "2024-01-01T12:00:00Z"
}
```

### Register Customer

```http
POST /api/customer/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "password": "SecurePassword123!",
  "confirmPassword": "SecurePassword123!"
}
```

## Product Management

### Get All Products

```http
GET /api/product/all?pageNumber=1&pageSize=10&searchString=pizza
Authorization: Bearer your_jwt_token
```

**Response:**

```json
{
	"success": true,
	"data": [
		{
			"id": 1,
			"name": "Margherita Pizza",
			"description": "Classic Italian pizza with tomato sauce and mozzarella",
			"price": 15.99,
			"category": "Food",
			"vendor": {
				"id": 5,
				"name": "Mario's Pizzeria",
				"rating": 4.5
			},
			"images": ["https://example.com/pizza1.jpg"],
			"isAvailable": true
		}
	],
	"metadata": {
		"totalCount": 50,
		"pageNumber": 1,
		"pageSize": 10,
		"totalPages": 5
	},
	"timestamp": "2024-01-01T12:00:00Z"
}
```

### Create Product (Vendor Only)

```http
POST /api/product/create
Authorization: Bearer vendor_jwt_token
Content-Type: application/json

{
  "name": "Deluxe Burger",
  "description": "Juicy beef patty with premium toppings",
  "price": 12.99,
  "categoryId": 3,
  "images": [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
  ],
  "preparationTime": 15,
  "isAvailable": true
}
```

## Order Management

### Create Order

```http
POST /api/order/create
Authorization: Bearer customer_jwt_token
Content-Type: application/json

{
  "vendorId": 5,
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "specialInstructions": "Extra cheese"
    },
    {
      "productId": 3,
      "quantity": 1
    }
  ],
  "deliveryAddressId": 10,
  "paymentMethod": "card",
  "notes": "Ring doorbell twice"
}
```

### Get Order Status

```http
GET /api/order/status/12345
Authorization: Bearer your_jwt_token
```

**Response:**

```json
{
	"success": true,
	"data": {
		"orderId": 12345,
		"status": "preparing",
		"estimatedDeliveryTime": "2024-01-01T13:30:00Z",
		"trackingSteps": [
			{
				"step": "order_placed",
				"timestamp": "2024-01-01T12:00:00Z",
				"completed": true
			},
			{
				"step": "confirmed",
				"timestamp": "2024-01-01T12:05:00Z",
				"completed": true
			},
			{
				"step": "preparing",
				"timestamp": "2024-01-01T12:10:00Z",
				"completed": true
			},
			{
				"step": "out_for_delivery",
				"timestamp": null,
				"completed": false
			}
		]
	}
}
```

## Wallet Operations

### Get Wallet Balance

```http
GET /api/wallet/balance
Authorization: Bearer your_jwt_token
```

**Response:**

```json
{
	"success": true,
	"data": {
		"balance": 150.75,
		"currency": "USD",
		"lastUpdated": "2024-01-01T11:30:00Z"
	}
}
```

### Add Funds to Wallet

```http
POST /api/walletdeposite/deposit
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "amount": 50.00,
  "paymentMethod": "card",
  "cardToken": "card_token_from_payment_processor"
}
```

## Address Management

### Add New Address

```http
POST /api/address/create
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "street": "123 Main Street",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "country": "USA",
  "isDefault": true,
  "addressType": "home",
  "additionalInfo": "Apartment 4B"
}
```

## Vendor Operations

### Get Vendor Profile

```http
GET /api/vendor/profile/123
Authorization: Bearer your_jwt_token
```

**Response:**

```json
{
	"success": true,
	"data": {
		"id": 123,
		"businessName": "Mario's Pizzeria",
		"description": "Authentic Italian cuisine since 1985",
		"rating": 4.7,
		"totalReviews": 342,
		"categories": ["Italian", "Pizza", "Pasta"],
		"location": {
			"address": "456 Food Street",
			"city": "New York",
			"coordinates": {
				"latitude": 40.7128,
				"longitude": -74.006
			}
		},
		"operatingHours": {
			"monday": "11:00-22:00",
			"tuesday": "11:00-22:00",
			"wednesday": "11:00-22:00",
			"thursday": "11:00-22:00",
			"friday": "11:00-23:00",
			"saturday": "11:00-23:00",
			"sunday": "12:00-21:00"
		},
		"isOpen": true,
		"estimatedDeliveryTime": "30-45 minutes"
	}
}
```

## Review System

### Submit Product Review

```http
POST /api/productreview/create
Authorization: Bearer customer_jwt_token
Content-Type: application/json

{
  "productId": 1,
  "orderId": 12345,
  "rating": 5,
  "comment": "Absolutely delicious! Will order again.",
  "images": [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
  ]
}
```

### Get Product Reviews

```http
GET /api/productreview/product/1?pageNumber=1&pageSize=5
```

**Response:**

```json
{
	"success": true,
	"data": [
		{
			"id": 101,
			"rating": 5,
			"comment": "Absolutely delicious! Will order again.",
			"customer": {
				"firstName": "John",
				"lastName": "D.",
				"avatar": "https://example.com/avatar.jpg"
			},
			"createdAt": "2024-01-01T10:00:00Z",
			"images": ["https://example.com/review_image.jpg"]
		}
	],
	"metadata": {
		"averageRating": 4.6,
		"totalReviews": 23,
		"ratingDistribution": {
			"5": 15,
			"4": 6,
			"3": 2,
			"2": 0,
			"1": 0
		}
	}
}
```

## Error Handling

All API endpoints return errors in a consistent format:

```json
{
	"success": false,
	"error": {
		"code": "VALIDATION_ERROR",
		"message": "The provided data is invalid",
		"details": [
			{
				"field": "email",
				"message": "Email is required"
			},
			{
				"field": "password",
				"message": "Password must be at least 8 characters"
			}
		]
	},
	"timestamp": "2024-01-01T12:00:00Z",
	"correlationId": "abc123-def456-ghi789"
}
```

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- **Authenticated users**: 1000 requests per hour
- **Anonymous users**: 100 requests per hour

Rate limit headers are included in responses:

- `X-Rate-Limit-Limit`: Maximum requests allowed
- `X-Rate-Limit-Remaining`: Requests remaining in current window
- `X-Rate-Limit-Reset`: Time when limit resets (Unix timestamp)

## Webhooks (For Vendors)

Vendors can register webhook endpoints to receive real-time updates:

### Order Status Updates

```json
{
	"event": "order.status_changed",
	"timestamp": "2024-01-01T12:00:00Z",
	"data": {
		"orderId": 12345,
		"oldStatus": "confirmed",
		"newStatus": "preparing",
		"vendorId": 5
	}
}
```

### Payment Notifications

```json
{
	"event": "payment.received",
	"timestamp": "2024-01-01T12:00:00Z",
	"data": {
		"transactionId": "txn_67890",
		"orderId": 12345,
		"amount": 25.99,
		"vendorId": 5,
		"commission": 2.6
	}
}
```

## SDKs and Client Libraries

- **JavaScript/TypeScript**: `npm install lifepadi-api-client`
- **Python**: `pip install lifepadi-api-client`
- **PHP**: `composer require lifepadi/api-client`

### JavaScript Example

```javascript
import { LifePadiClient } from "lifepadi-api-client";

const client = new LifePadiClient({
	apiKey: "your_api_key",
	baseUrl: "https://api.lifepadi.com",
});

// Login
const auth = await client.auth.login({
	email: "user@example.com",
	password: "password",
});

// Get products
const products = await client.products.getAll({
	pageNumber: 1,
	pageSize: 10,
	searchString: "pizza",
});
```

## Testing

Use the provided Postman collection or the interactive API documentation at `/api-docs` for testing endpoints.

### Environment Variables for Testing

```
BASE_URL=https://api.lifepadi.com
API_VERSION=v1
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=TestPassword123!
```
