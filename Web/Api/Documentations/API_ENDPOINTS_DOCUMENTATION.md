# LifePadi API Endpoints Documentation

## 🔗 **Base URL**
- **Development**: `https://localhost:7216/api`
- **Production**: `https://your-production-domain.com/api`

## 🔐 **Authentication**
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📋 **Endpoint Categories**

### **🔑 Authentication Endpoints**

#### **POST /api/auth/login**
- **Description**: Authenticate user and receive JWT tokens
- **Authorization**: None (Public)
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```
- **Response**:
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "Customer",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "wallet": { ... }
}
```

#### **POST /api/auth/refresh**
- **Description**: Refresh expired access token
- **Authorization**: Refresh Token (Cookie)
- **Response**: New access token

---

### **👑 Admin Endpoints**

#### **GET /api/admin/all**
- **Authorization**: `AdminOnly`
- **Description**: Get all administrators
- **Query Parameters**: `SearchPaging` (page, size, search)

#### **POST /api/admin/create**
- **Authorization**: `AdminOnly`
- **Audit**: Logged as "Create Admin"
- **Description**: Create new administrator
- **Request Body**: `AdminDto`

#### **GET /api/admin/get/{id}**
- **Authorization**: `AdminOnly`
- **Description**: Get administrator by ID

#### **PUT /api/admin/update/{id}**
- **Authorization**: `AdminOnly`
- **Description**: Update administrator

#### **DELETE /api/admin/delete/{id}**
- **Authorization**: `AdminOnly`
- **Audit**: Logged as "Delete Admin"
- **Description**: Delete administrator

#### **PUT /api/admin/activate/{id}**
- **Authorization**: `AdminOnly`
- **Description**: Activate administrator account

#### **PUT /api/admin/deactivate/{id}**
- **Authorization**: `AdminOnly`
- **Description**: Deactivate administrator account

---

### **👤 Customer Endpoints**

#### **GET /api/customer/all**
- **Authorization**: `AdminOnly`
- **Description**: Get all customers (Admin only)
- **Query Parameters**: `SearchPaging`

#### **GET /api/customer/get/{id}**
- **Authorization**: `ResourceOwnerOrAdmin`
- **Description**: Get customer details (own data or admin)

#### **POST /api/customer/create**
- **Authorization**: None (Public registration)
- **Description**: Create new customer account
- **Request Body**: `CustomerDto`

#### **PUT /api/customer/update/{id}**
- **Authorization**: `ResourceOwnerOrAdmin`
- **Description**: Update customer profile (own data or admin)

#### **DELETE /api/customer/delete/{id}**
- **Authorization**: `AdminOnly`
- **Audit**: Logged as "Delete Customer"
- **Description**: Delete customer account (Admin only)

#### **GET /api/customer/orders/{id}**
- **Authorization**: `ResourceOwnerOrAdmin`
- **Description**: Get customer's orders (own orders or admin)

#### **GET /api/customer/addresses/{id}**
- **Authorization**: `ResourceOwnerOrAdmin`
- **Description**: Get customer's addresses (own addresses or admin)

#### **GET /api/customer/getByPhone/{phone}**
- **Authorization**: `AdminOnly`
- **Description**: Find customer by phone number (Admin only)

---

### **🏪 Vendor Endpoints**

#### **GET /api/vendor/all**
- **Authorization**: `AdminOnly`
- **Description**: Get all vendors (Admin only)

#### **GET /api/vendor/get/{id}**
- **Authorization**: `VendorResourceOwner`
- **Description**: Get vendor details (own data or admin)

#### **POST /api/vendor/create**
- **Authorization**: None (Public registration)
- **Description**: Create new vendor account

#### **PUT /api/vendor/update/{id}**
- **Authorization**: `VendorResourceOwner`
- **Description**: Update vendor profile (own data or admin)

#### **DELETE /api/vendor/delete/{id}**
- **Authorization**: `AdminOnly`
- **Description**: Delete vendor account (Admin only)

---

### **📦 Product Endpoints**

#### **GET /api/product/all**
- **Authorization**: None (Public)
- **Description**: Get all products
- **Query Parameters**: `SearchPaging`

#### **GET /api/product/get/{id}**
- **Authorization**: None (Public)
- **Description**: Get product details

#### **POST /api/product/create**
- **Authorization**: `CanManageProducts` (Vendor, Admin)
- **Description**: Create new product

#### **PUT /api/product/update/{id}**
- **Authorization**: `CanManageProducts` (Vendor, Admin)
- **Description**: Update product (own products or admin)

#### **DELETE /api/product/delete/{id}**
- **Authorization**: `CanManageProducts` (Vendor, Admin)
- **Description**: Delete product (own products or admin)

---

### **🛒 Order Endpoints**

#### **GET /api/order/all**
- **Authorization**: `AdminOnly`
- **Description**: Get all orders (Admin only)
- **Query Parameters**: `SearchPaging`

#### **GET /api/order/get/{id}**
- **Authorization**: `CanManageOrders` (Customer, Vendor, Admin, Rider)
- **Description**: Get order details (related users only)

#### **POST /api/order/create**
- **Authorization**: `AuthenticatedUser`
- **Description**: Create new order

#### **PUT /api/order/update/{id}**
- **Authorization**: `CanManageOrders`
- **Description**: Update order status

---

### **💰 Wallet Endpoints**

#### **GET /api/wallet/all**
- **Authorization**: `AdminOnly`
- **Description**: Get all wallets (Admin only)

#### **GET /api/wallet/balance/{id}**
- **Authorization**: `ResourceOwnerOrAdmin`
- **Description**: Get wallet balance (own wallet or admin)

#### **GET /api/wallet/get/{id}**
- **Authorization**: `ResourceOwnerOrAdmin`
- **Description**: Get wallet details (own wallet or admin)

#### **GET /api/wallet/customer/{customerId}**
- **Authorization**: `ResourceOwnerOrAdmin`
- **Description**: Get customer's wallet (own wallet or admin)

#### **POST /api/wallet/create**
- **Authorization**: `AdminOnly`
- **Audit**: Logged as "Create Wallet"
- **Description**: Create new wallet (Admin only)

#### **PUT /api/wallet/update/{id}**
- **Authorization**: `AdminOnly`
- **Description**: Update wallet (Admin only)

#### **DELETE /api/wallet/delete/{id}**
- **Authorization**: `AdminOnly`
- **Audit**: Logged as "Delete Wallet"
- **Description**: Delete wallet (Admin only)

#### **GET /api/wallet/transactions/{id}**
- **Authorization**: `ResourceOwnerOrAdmin`
- **Description**: Get wallet transactions (own transactions or admin)
- **Query Parameters**: `SearchPaging`

#### **GET /api/wallet/last-five-transactions/{walletId}**
- **Authorization**: `ResourceOwnerOrAdmin`
- **Description**: Get last 5 transactions (own transactions or admin)

---

### **🚚 Delivery Endpoints**

#### **GET /api/delivery/all**
- **Authorization**: `AdminOnly`
- **Description**: Get all deliveries (Admin only)

#### **GET /api/delivery/rider/{riderId}**
- **Authorization**: `RiderResourceAccess`
- **Description**: Get rider's deliveries (own deliveries or admin)

#### **PUT /api/delivery/update/{id}**
- **Authorization**: `CanManageDeliveries` (Rider, Admin)
- **Description**: Update delivery status

---

### **🏃‍♂️ Rider Endpoints**

#### **GET /api/rider/all**
- **Authorization**: `AdminOnly`
- **Description**: Get all riders (Admin only)

#### **GET /api/rider/get/{id}**
- **Authorization**: `RiderResourceAccess`
- **Description**: Get rider details (own data or admin)

#### **GET /api/rider/{id}/getOrders**
- **Authorization**: `RiderResourceAccess`
- **Description**: Get rider's assigned orders

#### **DELETE /api/rider/delete/{id}**
- **Authorization**: `AdminOnly`
- **Description**: Delete rider account (Admin only)

---

### **📂 Category Endpoints**

#### **GET /api/category/all**
- **Authorization**: None (Public)
- **Description**: Get all categories

---

### **🎫 Voucher Endpoints**

#### **PUT /api/voucher/activate/{id}**
- **Authorization**: `AdminOnly`
- **Description**: Activate voucher (Admin only)

#### **GET /api/voucher/all-active**
- **Authorization**: None (Public)
- **Description**: Get all active vouchers

---

### **👤 User Endpoints**

#### **GET /api/user/{id}/get**
- **Authorization**: `ResourceOwnerOrAdmin`
- **Description**: Get user details (own data or admin)

#### **GET /api/user/all**
- **Authorization**: `AdminOnly`
- **Description**: Get all users (Admin only)

## 🔒 **Authorization Summary**

### **Public Endpoints (No Authentication)**
- Product listings and details
- Category listings
- Active vouchers
- User registration
- User login

### **User-Specific Endpoints (ResourceOwnerOrAdmin)**
- Personal profile management
- Own wallet and transactions
- Own orders and addresses
- Own delivery assignments (for riders)

### **Role-Based Endpoints**
- **Admin Only**: User management, system administration, financial oversight
- **Vendor**: Product management for own products
- **Rider**: Delivery management for assigned orders
- **Customer**: Order placement and management

### **Multi-Role Endpoints**
- Order management (Customer, Vendor, Admin, Rider)
- Product management (Vendor, Admin)
- Delivery management (Rider, Admin)

## 📝 **Notes**

1. **Resource Ownership**: Users can only access their own data unless they're admins
2. **Audit Logging**: Sensitive operations are logged for security monitoring
3. **Token Expiration**: Access tokens expire in 15 minutes, refresh tokens in 7 days
4. **Error Handling**: Proper HTTP status codes and error messages for authorization failures
5. **CORS**: Configured for secure cross-origin requests from approved domains
