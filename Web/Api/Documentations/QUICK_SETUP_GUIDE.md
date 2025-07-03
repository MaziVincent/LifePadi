# LifePadi API Quick Setup Guide

## 🚀 **Quick Start**

### **1. Environment Setup**

#### **Copy Environment Template**
```bash
cp .env.template .env
```

#### **Configure Required Variables**
Edit the `.env` file with your values:

```bash
# Database Configuration
DB_SERVER=your_database_server
DB_PORT=1433
DB_NAME=LifePadiDB
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

# JWT Configuration (NEW - Required for Authorization)
JWT_KEY=your_super_secret_jwt_key_minimum_32_characters_long
JWT_ISSUER=LifePadi-API
JWT_AUDIENCE=LifePadi-Client

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Firebase Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY_ID=your_firebase_private_key_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_CLIENT_ID=your_firebase_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token

# Paystack Configuration
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key

# Email Configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USERNAME=your_smtp_username
SMTP_PASSWORD=your_smtp_password
FROM_EMAIL=noreply@lifepadi.com
```

### **2. Secure Setup (Recommended)**

Run the secure setup script to validate your environment:

```bash
chmod +x setup-env-secure.sh
./setup-env-secure.sh
```

This script will:
- ✅ Validate all required environment variables
- ✅ Check JWT key strength (minimum 32 characters)
- ✅ Verify database connectivity
- ✅ Test JWT token generation
- ✅ Validate Cloudinary configuration
- ✅ Check Firebase setup

### **3. Build and Run**

```bash
# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run the API
dotnet run
```

The API will be available at:
- **HTTPS**: `https://localhost:7216`
- **HTTP**: `http://localhost:5216`

## 🔐 **New Authorization Features**

### **What's New**
1. **Enhanced JWT Security**: Proper issuer/audience validation
2. **Short-lived Tokens**: 15-minute access tokens for better security
3. **Role-based Access Control**: Comprehensive authorization policies
4. **Resource Ownership**: Users can only access their own data
5. **Audit Logging**: Security events are tracked

### **JWT Configuration Changes**
- **NEW**: `JWT_ISSUER` environment variable (default: LifePadi-API)
- **NEW**: `JWT_AUDIENCE` environment variable (default: LifePadi-Client)
- **CHANGED**: Access token lifetime reduced from 1 day to 15 minutes
- **ENHANCED**: Token validation with proper issuer/audience checks

### **Frontend Integration Updates**

#### **Token Handling**
```javascript
// Store tokens
localStorage.setItem('accessToken', response.data.accessToken);
// Refresh token is handled via HTTP-only cookies

// Add to requests
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

// Handle token expiration (NEW)
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401 && 
        error.response?.headers['token-expired']) {
      // Token expired - refresh and retry
      await refreshToken();
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }
);
```

#### **Role-based UI**
```javascript
// Check user role
const userRole = getUserRole(); // From JWT token

// Show/hide features based on role
if (userRole === 'Admin') {
  showAdminPanel();
} else if (userRole === 'Vendor') {
  showVendorDashboard();
} else if (userRole === 'Customer') {
  showCustomerInterface();
}
```

## 🛡️ **Security Features**

### **Authorization Policies**
- `AdminOnly` - Admin-exclusive endpoints
- `VendorOrAdmin` - Vendor and admin access
- `CustomerOrVendor` - Customer and vendor access
- `ResourceOwnerOrAdmin` - Own data or admin access

### **Protected Endpoints**
- **Admin Panel**: Full system access
- **User Management**: Admin-only operations
- **Financial Operations**: Secure wallet transactions
- **Personal Data**: Resource ownership validation

### **Audit Logging**
Sensitive operations are automatically logged:
- User creation/deletion
- Wallet operations
- Admin actions
- Security events

## 🔧 **Development Tips**

### **Testing Authorization**

#### **Get Admin Token**
```bash
curl -X POST https://localhost:7216/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lifepadi.com","password":"adminpassword"}'
```

#### **Test Protected Endpoint**
```bash
curl -X GET https://localhost:7216/api/admin/all \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### **Test Resource Ownership**
```bash
# This should work (own data)
curl -X GET https://localhost:7216/api/customer/get/123 \
  -H "Authorization: Bearer CUSTOMER_123_TOKEN"

# This should fail (other user's data)
curl -X GET https://localhost:7216/api/customer/get/456 \
  -H "Authorization: Bearer CUSTOMER_123_TOKEN"
```

### **Common Issues**

#### **401 Unauthorized**
- Check if JWT token is included in Authorization header
- Verify token hasn't expired (15-minute lifetime)
- Ensure JWT_ISSUER and JWT_AUDIENCE match configuration

#### **403 Forbidden**
- User doesn't have required role for the endpoint
- Trying to access another user's resources
- Check authorization policy requirements

#### **Token Expired**
- Implement token refresh logic in frontend
- Look for `Token-Expired: true` header in 401 responses

### **Environment Variables Validation**

The setup script checks for:
- ✅ All required variables are set
- ✅ JWT key is at least 32 characters
- ✅ Database connection works
- ✅ External service configurations are valid

## 📚 **Documentation**

- **[API Authorization Guide](API_AUTHORIZATION_GUIDE.md)** - Comprehensive authorization documentation
- **[API Endpoints Documentation](API_ENDPOINTS_DOCUMENTATION.md)** - Complete endpoint reference
- **[Environment Setup](ENVIRONMENT_SETUP.md)** - Detailed environment configuration

## 🆘 **Troubleshooting**

### **Build Issues**
```bash
# Clean and rebuild
dotnet clean
dotnet restore
dotnet build
```

### **Database Issues**
```bash
# Check connection string
dotnet ef database update
```

### **JWT Issues**
- Verify JWT_KEY is at least 32 characters
- Check JWT_ISSUER and JWT_AUDIENCE are set
- Ensure system clock is synchronized

### **Authorization Issues**
- Check user role in JWT token claims
- Verify endpoint authorization requirements
- Test with admin account first

## 📞 **Support**

For setup issues:
1. Check this guide first
2. Review error messages carefully
3. Verify environment variables
4. Test with provided examples
5. Contact development team if needed

---

**🎉 Your LifePadi API is now secured with enterprise-grade authorization!**
