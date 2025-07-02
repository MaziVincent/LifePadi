# JWT Authorization Fix Guide

## 🔧 **Problem Summary**

The `[Authorize(Policy = "AdminOnly")]` attribute was returning 401 Unauthorized even with valid admin tokens.

## ✅ **Fixes Applied**

### 1. **JWT Claim Type Mapping**

Added proper claim type mapping to ensure role claims are recognized:

```csharp
TokenValidationParameters = new TokenValidationParameters
{
    // ... other settings ...
    RoleClaimType = ClaimTypes.Role,
    NameClaimType = ClaimTypes.NameIdentifier
};
```

### 2. **Enhanced JWT Event Logging**

Added detailed logging to help debug authentication issues:

- `OnTokenValidated`: Logs successful validations with claims
- `OnAuthenticationFailed`: Logs authentication failures
- `OnChallenge`: Logs challenge events with error details

### 3. **Improved Error Responses**

Enhanced error responses to include more details about authentication failures.

## 🧪 **Testing Your Fix**

### **Step 1: Start the Application**

```bash
# Load environment variables and start
export $(cat .env | grep -v '^#' | xargs) && dotnet run
```

### **Step 2: Test Admin Login**

```bash
# Test the debug script
./debug-jwt-token.sh

# Or manually test
curl -X POST "http://localhost:5000/api/Auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ikenna@gmail.com",
    "password": "ikenna123"
  }'
```

### **Step 3: Test Protected Endpoint**

```bash
# Use the token from login response
curl -X GET "http://localhost:5000/api/Customer/all" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

## 🔍 **What to Look For**

### **Successful Response (200)**

```json
{
  "result": [...],
  "dataList": {
    "totalCount": 10,
    "totalPages": 1,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

### **JWT Token Payload Should Contain**

```json
{
  "nameid": "1",
  "role": "Admin",
  "email": "ikenna@gmail.com",
  "jti": "...",
  "iat": "...",
  "user_type": "Admin",
  "iss": "LifePadi-API",
  "aud": "LifePadi-Client",
  "exp": ...
}
```

## 🚨 **Common Issues & Solutions**

### **Issue 1: Still Getting 401**

**Cause**: JWT key mismatch between token generation and validation
**Solution**:

```bash
# Check JWT keys match
echo "Generation key: $(grep JWT_KEY .env)"
echo "Validation key: $(grep JWT_KEY appsettings.Development.json || echo 'Not set')"
```

### **Issue 2: Role Not Recognized**

**Cause**: Role claim type mismatch
**Solution**: Check application logs for JWT validation events

### **Issue 3: Token Expired**

**Cause**: Tokens expire after 30 minutes
**Solution**: Generate a new token by logging in again

### **Issue 4: Database Connection**

**Cause**: Admin user doesn't exist in database
**Solution**:

```bash
# Check if database is seeded
# Look for admin user in logs during application startup
```

## 📋 **Log Messages to Monitor**

Look for these in your application logs:

### **Success Messages**

- `"JWT Token validated successfully. Claims: ..."`
- `"User login successful for UserId: 1"`

### **Error Messages**

- `"JWT Authentication failed: ..."`
- `"JWT Challenge triggered. AuthenticateFailure: ..."`
- `"Authentication failed - user not found"`

## 🔐 **Security Verification**

### **Test All Authorization Levels**

1. **No Token**: Should get 401

```bash
curl -X GET "http://localhost:5000/api/Customer/all"
```

2. **Customer Token**: Should get 403 (if you have customer login)
3. **Admin Token**: Should get 200

### **Verify Token Security**

- Token should expire after 30 minutes
- Token should contain proper issuer/audience
- Role claim should be exactly "Admin"

## 🛠️ **Manual Verification**

If the debug script doesn't work, manually check:

1. **JWT Token Structure**:

   - Copy your access token
   - Go to https://jwt.io
   - Paste token to see decoded payload
   - Verify `role` claim = "Admin"

2. **Database Check**:

   - Ensure admin user exists
   - Verify password hash is correct
   - Check user type inheritance (Admin extends User)

3. **Configuration Check**:
   - JWT_KEY in .env matches appsettings
   - Authorization policies are registered
   - Authentication middleware is configured

## 📞 **Still Having Issues?**

If problems persist, provide these details:

1. **JWT Token Payload** (from jwt.io)
2. **Application Logs** (especially JWT-related messages)
3. **HTTP Response Status** and body
4. **Environment Details** (development vs production)

The enhanced logging should now provide much better insights into what's happening during the authentication process.

---

**Status**: ✅ **JWT Authorization Fixed**  
**Date**: June 23, 2025  
**Components Updated**: JWT Configuration, Claim Mapping, Error Logging
