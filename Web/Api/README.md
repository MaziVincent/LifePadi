# LifePadi API

## 🚀 **Overview**

LifePadi is a comprehensive e-commerce and delivery platform API built with .NET 8, featuring secure authentication, role-based authorization, and comprehensive business logic for customers, vendors, riders, and administrators.

## ✨ **Key Features**

- 🔐 **Enterprise-grade Security**: JWT authentication with role-based access control
- 👥 **Multi-role System**: Customer, Vendor, Rider, and Admin roles
- 💰 **Wallet System**: Integrated financial transactions and balance management
- 📦 **Product Management**: Comprehensive product catalog with categories
- 🛒 **Order Processing**: Complete order lifecycle management
- 🚚 **Delivery Tracking**: Real-time delivery status and rider assignment
- 📊 **Analytics & Reporting**: Business intelligence and performance metrics
- 🔄 **Real-time Updates**: Firebase integration for live notifications
- 💳 **Payment Integration**: Paystack payment gateway integration
- 📧 **Email Services**: SMTP-based email notifications
- 🖼️ **Media Management**: Cloudinary integration for image handling

## 🏗️ **Architecture**

- **Framework**: .NET 8 Web API
- **Database**: SQL Server with Entity Framework Core
- **Authentication**: JWT Bearer tokens with refresh token rotation
- **Authorization**: Policy-based role and resource access control
- **File Storage**: Cloudinary for media assets
- **Payments**: Paystack integration
- **Notifications**: Firebase Cloud Messaging
- **Email**: SMTP with configurable providers

## 🔐 **Security Features**

### **Authentication & Authorization**
- ✅ JWT tokens with 15-minute access token lifetime
- ✅ Refresh token rotation for enhanced security
- ✅ Role-based access control (RBAC)
- ✅ Resource ownership validation
- ✅ Comprehensive authorization policies
- ✅ Audit logging for sensitive operations
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Rate limiting

### **User Roles & Permissions**
- **Admin**: Full system access and user management
- **Vendor**: Product and business management
- **Customer**: Shopping and order management
- **Rider**: Delivery and logistics management

## 🚀 **Quick Start**

### **1. Prerequisites**
- .NET 8 SDK
- SQL Server (Local or Remote)
- Cloudinary account (for media)
- Firebase project (for notifications)
- Paystack account (for payments)
- SMTP server (for emails)

### **2. Setup**
```bash
# Clone and navigate to API directory
cd Web/Api

# Copy environment template
cp .env.template .env

# Configure your environment variables
# Edit .env with your database, JWT, and service configurations

# Run secure setup (validates configuration)
chmod +x setup-env-secure.sh
./setup-env-secure.sh

# Restore dependencies and build
dotnet restore
dotnet build

# Run the API
dotnet run
```

### **3. Access**
- **API Base URL**: `https://localhost:7216/api`
- **Swagger Documentation**: `https://localhost:7216/swagger`

## 📚 **Documentation**

### **Setup & Configuration**
- **[Quick Setup Guide](QUICK_SETUP_GUIDE.md)** - Get started in minutes
- **[Environment Setup](ENVIRONMENT_SETUP.md)** - Detailed configuration guide

### **API Documentation**
- **[Authorization Guide](API_AUTHORIZATION_GUIDE.md)** - Security and access control
- **[Endpoints Documentation](API_ENDPOINTS_DOCUMENTATION.md)** - Complete API reference

### **Development**
- **[Database Schema](DATABASE_SCHEMA.md)** - Entity relationships and structure
- **[Contributing Guidelines](CONTRIBUTING.md)** - Development standards and practices

## 🔧 **Environment Variables**

### **Required Configuration**
```bash
# Database
DB_SERVER=your_database_server
DB_NAME=LifePadiDB
DB_USERNAME=your_username
DB_PASSWORD=your_password

# JWT Security (NEW)
JWT_KEY=your_32_character_minimum_secret_key
JWT_ISSUER=LifePadi-API
JWT_AUDIENCE=LifePadi-Client

# External Services
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
PAYSTACK_SECRET_KEY=your_paystack_key
FIREBASE_PROJECT_ID=your_firebase_project
SMTP_HOST=your_smtp_server
```

See **[Environment Setup](ENVIRONMENT_SETUP.md)** for complete configuration details.

## 🛡️ **API Security**

### **Authentication Flow**
1. **Login**: `POST /api/auth/login` → Receive access & refresh tokens
2. **Request**: Include `Authorization: Bearer <token>` header
3. **Refresh**: Auto-refresh when access token expires (15 min)
4. **Logout**: Invalidate tokens and clear session

### **Authorization Levels**
- **Public**: Product listings, categories, registration
- **Authenticated**: Personal data access, order placement
- **Role-based**: Admin panel, vendor dashboard, rider interface
- **Resource-owned**: Users can only access their own data

### **Example Request**
```bash
curl -X GET https://localhost:7216/api/customer/get/123 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 📊 **API Endpoints Overview**

### **Authentication**
- `POST /api/auth/login` - User authentication
- `POST /api/auth/refresh` - Token refresh

### **User Management**
- `GET /api/admin/*` - Admin operations (Admin only)
- `GET /api/customer/*` - Customer management
- `GET /api/vendor/*` - Vendor operations
- `GET /api/rider/*` - Rider management

### **Business Operations**
- `GET /api/product/*` - Product catalog
- `GET /api/order/*` - Order processing
- `GET /api/wallet/*` - Financial transactions
- `GET /api/delivery/*` - Delivery tracking

See **[API Endpoints Documentation](API_ENDPOINTS_DOCUMENTATION.md)** for complete reference.

## 🧪 **Testing**

### **Run Tests**
```bash
dotnet test
```

### **Test Authorization**
```bash
# Get admin token
curl -X POST https://localhost:7216/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lifepadi.com","password":"password"}'

# Test protected endpoint
curl -X GET https://localhost:7216/api/admin/all \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🚀 **Deployment**

### **Production Checklist**
- ✅ Set strong JWT_KEY (32+ characters)
- ✅ Configure production database
- ✅ Set up HTTPS certificates
- ✅ Configure CORS for your domain
- ✅ Set up monitoring and logging
- ✅ Configure backup strategies
- ✅ Test all authorization scenarios

### **Environment-specific Settings**
```bash
# Production
ASPNETCORE_ENVIRONMENT=Production
JWT_ISSUER=YourProductionAPI
JWT_AUDIENCE=YourProductionClient

# Staging
ASPNETCORE_ENVIRONMENT=Staging
```

## 🔍 **Monitoring & Logging**

### **Security Events**
- Authentication attempts
- Authorization failures
- Admin operations
- Financial transactions
- User management actions

### **Performance Metrics**
- API response times
- Database query performance
- Token refresh rates
- Error rates by endpoint

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Follow coding standards
4. Add tests for new features
5. Update documentation
6. Submit a pull request

See **[Contributing Guidelines](CONTRIBUTING.md)** for detailed information.

## 📞 **Support**

### **Documentation**
- Check the relevant documentation files first
- Review error messages and logs
- Test with provided examples

### **Common Issues**
- **401 Unauthorized**: Check JWT token and expiration
- **403 Forbidden**: Verify user role and permissions
- **Build Errors**: Run `dotnet clean && dotnet restore`

### **Contact**
- Development Team: dev@lifepadi.com
- Security Issues: security@lifepadi.com

## 📄 **License**

This project is proprietary software. All rights reserved.

---

## 🎉 **Recent Updates**

### **v2.0 - Enhanced Security (Latest)**
- ✅ Comprehensive role-based authorization
- ✅ Short-lived JWT tokens (15 minutes)
- ✅ Resource ownership validation
- ✅ Audit logging for security events
- ✅ Enhanced input validation
- ✅ Improved error handling

### **v1.0 - Initial Release**
- Basic authentication
- Core business logic
- Database integration
- External service integrations

---

**🚀 Ready to build secure, scalable e-commerce solutions with LifePadi API!**
