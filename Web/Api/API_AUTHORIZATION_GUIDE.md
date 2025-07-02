# LifePadi API Authorization Guide

## 🔒 **Overview**

The LifePadi API implements comprehensive role-based access control (RBAC) to ensure secure access to resources. This guide explains the authorization system, user roles, and endpoint access requirements.

## 🎭 **User Roles**

### **1. Customer**
- **Description**: End users who place orders and purchase products
- **Permissions**: 
  - View and manage their own profile
  - Place and view their own orders
  - Access their own wallet and transactions
  - Leave product and vendor reviews
  - Manage their own addresses and favorites

### **2. Vendor**
- **Description**: Business owners who sell products on the platform
- **Permissions**:
  - Manage their own vendor profile
  - Create, update, and delete their own products
  - View orders for their products
  - Access their own financial data
  - Manage their own vendor categories

### **3. Rider**
- **Description**: Delivery personnel who handle order deliveries
- **Permissions**:
  - View and update their own profile
  - Access assigned delivery orders
  - Update delivery status
  - View their own delivery history

### **4. Admin**
- **Description**: Platform administrators with full system access
- **Permissions**:
  - Full access to all system resources
  - User management (create, update, delete, activate/deactivate)
  - Financial operations and reporting
  - System configuration and monitoring
  - Access to all orders, transactions, and analytics

## 🔐 **Authentication Requirements**

### **JWT Token Structure**
All API requests (except public endpoints) require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### **Token Properties**
- **Access Token Lifetime**: 15 minutes
- **Refresh Token Lifetime**: 7 days
- **Issuer**: LifePadi-API
- **Audience**: LifePadi-Client

### **Token Claims**
- `nameid`: User ID
- `role`: User role (Customer, Vendor, Rider, Admin)
- `email`: User email address
- `jti`: Unique token identifier
- `iat`: Token issued at timestamp
- `user_type`: Custom user type claim

## 🛡️ **Authorization Policies**

### **Policy Definitions**

| Policy Name | Required Roles | Description |
|-------------|----------------|-------------|
| `AdminOnly` | Admin | Restricts access to admin users only |
| `VendorOrAdmin` | Vendor, Admin | Allows vendors and admins |
| `CustomerOrVendor` | Customer, Vendor | Allows customers and vendors |
| `RiderOnly` | Rider | Restricts to riders only |
| `VendorOnly` | Vendor | Restricts to vendors only |
| `CustomerOnly` | Customer | Restricts to customers only |
| `CanManageOrders` | Customer, Vendor, Admin, Rider | Multi-role order management |
| `CanManageProducts` | Vendor, Admin | Product management access |
| `CanManageDeliveries` | Rider, Admin | Delivery management access |
| `CanManageFinancials` | Admin | Financial operations access |
| `CanViewReports` | Vendor, Admin | Reporting and analytics access |
| `AuthenticatedUser` | Any authenticated user | Basic authentication requirement |

## 📋 **Endpoint Authorization Matrix**

### **Authentication Endpoints** (No Authorization Required)
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/register` - User registration (if public)

### **Admin Endpoints** (AdminOnly)
- `GET /api/admin/all` - List all admins
- `POST /api/admin/create` - Create new admin
- `DELETE /api/admin/delete/{id}` - Delete admin
- `PUT /api/admin/activate/{id}` - Activate admin
- `PUT /api/admin/deactivate/{id}` - Deactivate admin

### **Customer Endpoints**
- `GET /api/customer/get/{id}` - **ResourceOwnerOrAdmin** - Get customer details
- `GET /api/customer/all` - **AdminOnly** - List all customers
- `PUT /api/customer/update/{id}` - **ResourceOwnerOrAdmin** - Update customer
- `DELETE /api/customer/delete/{id}` - **AdminOnly** - Delete customer
- `GET /api/customer/orders/{id}` - **ResourceOwnerOrAdmin** - Get customer orders
- `GET /api/customer/addresses/{id}` - **ResourceOwnerOrAdmin** - Get customer addresses

### **Vendor Endpoints**
- `GET /api/vendor/get/{id}` - **VendorResourceOwner** - Get vendor details
- `GET /api/vendor/all` - **AdminOnly** - List all vendors
- `PUT /api/vendor/update/{id}` - **VendorResourceOwner** - Update vendor
- `DELETE /api/vendor/delete/{id}` - **AdminOnly** - Delete vendor

### **Product Endpoints**
- `GET /api/product/all` - **Public** - List all products
- `GET /api/product/get/{id}` - **Public** - Get product details
- `POST /api/product/create` - **CanManageProducts** - Create product
- `PUT /api/product/update/{id}` - **CanManageProducts** - Update product
- `DELETE /api/product/delete/{id}` - **CanManageProducts** - Delete product

### **Order Endpoints**
- `GET /api/order/all` - **AdminOnly** - List all orders
- `GET /api/order/get/{id}` - **CanManageOrders** - Get order details
- `POST /api/order/create` - **AuthenticatedUser** - Create order
- `PUT /api/order/update/{id}` - **CanManageOrders** - Update order

### **Wallet Endpoints** (All require authentication)
- `GET /api/wallet/balance/{id}` - **ResourceOwnerOrAdmin** - Get wallet balance
- `GET /api/wallet/all` - **AdminOnly** - List all wallets
- `GET /api/wallet/get/{id}` - **ResourceOwnerOrAdmin** - Get wallet details
- `POST /api/wallet/create` - **AdminOnly** - Create wallet
- `DELETE /api/wallet/delete/{id}` - **AdminOnly** - Delete wallet
- `GET /api/wallet/transactions/{id}` - **ResourceOwnerOrAdmin** - Get transactions

### **Delivery Endpoints**
- `GET /api/delivery/all` - **AdminOnly** - List all deliveries
- `GET /api/delivery/rider/{riderId}` - **RiderResourceAccess** - Get rider deliveries
- `PUT /api/delivery/update/{id}` - **CanManageDeliveries** - Update delivery

## 🔧 **Resource Ownership Validation**

### **ResourceOwnerOrAdmin**
- Users can only access their own resources
- Admins can access any resource
- Validates user ID from JWT token against resource owner ID

### **VendorResourceOwner**
- Vendors can only access their own business resources
- Admins can access any vendor resource
- Validates vendor ID from JWT token

### **RiderResourceAccess**
- Riders can only access their assigned deliveries
- Admins can access any delivery resource
- Validates rider ID from JWT token

## 🚨 **Error Responses**

### **401 Unauthorized**
```json
{
  "error": "You are not authorized to access this resource."
}
```

### **403 Forbidden**
```json
{
  "error": "You do not have permission to access this resource."
}
```

### **Token Expired**
```json
{
  "error": "Token has expired"
}
```
Response includes header: `Token-Expired: true`

## 🔄 **Token Refresh Flow**

1. **Access Token Expires** (15 minutes)
2. **Client receives 401** with `Token-Expired: true` header
3. **Client sends refresh request** with refresh token
4. **Server validates refresh token** and issues new access token
5. **Client retries original request** with new access token

## 🛠️ **Implementation Examples**

### **Frontend Token Handling**
```javascript
// Add token to requests
const token = localStorage.getItem('accessToken');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Handle token expiration
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401 && 
        error.response?.headers['token-expired']) {
      // Refresh token and retry
      await refreshToken();
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }
);
```

### **Backend Authorization Usage**
```csharp
[HttpGet("{id}")]
[Authorize]
[ResourceOwnerOrAdmin("id")]
public async Task<IActionResult> GetCustomer(int id)
{
    // Only the customer themselves or admin can access
    var customer = await _customerService.GetAsync(id);
    return Ok(customer);
}
```

## 🔒 **Security Best Practices**

1. **Always validate tokens** on protected endpoints
2. **Use HTTPS** in production environments
3. **Implement proper CORS** policies
4. **Log security events** for monitoring
5. **Rotate JWT secrets** regularly
6. **Use short-lived access tokens** (15 minutes)
7. **Implement token blacklisting** for logout
8. **Validate user permissions** at the resource level
9. **Use environment variables** for sensitive configuration
10. **Monitor for suspicious activities**

## 📞 **Support**

For questions about API authorization:
- Check this documentation first
- Review the endpoint-specific requirements
- Ensure proper JWT token format
- Verify user role permissions
- Contact the development team for additional support
