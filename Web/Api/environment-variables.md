# Environment Variables Setup Guide

## Overview

This document outlines the process of moving sensitive configuration from `appsettings.json` to environment variables for improved security.

## Step 1: Create Environment Variables

Create a `.env` file in the project root with the following structure (DO NOT commit this file):

```env
# Database Configuration
DB_SERVER=lifepadi.cjkuw0skw142.us-east-1.rds.amazonaws.com
DB_PORT=5432
DB_NAME=lifepadi_db
DB_USERNAME=postgres
DB_PASSWORD=your_password_here

# JWT Configuration
JWT_KEY=your_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Payment Gateway Configurations
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_TEST_KEY=your_paystack_test_key

BANI_PUBLIC_KEY=your_bani_public_key
BANI_PRIVATE_KEY=your_bani_private_key
BANI_ACCOUNT_TRIBE_REF=your_bani_account_ref
BANI_ACCESS_TOKEN=your_bani_access_token
BANI_MERCHANT_KEY=your_bani_merchant_key

FW_PAYMENT_SECRET_KEY=your_fw_payment_secret_key

# Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Termii SMS Configuration
TERMII_API_KEY=your_termii_api_key
TERMII_SENDER_ID=your_sender_id

# SMTP Configuration
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_smtp_username
SMTP_PASSWORD=your_smtp_password
SMTP_SENDER=LifePadi
SMTP_SENDER_EMAIL=your_sender_email
SMTP_ENABLE_SSL=true

# Base URLs
API_LOCAL_URL=https://localhost:7216/api
API_REMOTE_URL=your_remote_api_url
API_REMOTE_GCP_URL=your_gcp_api_url
FRONTEND_LOCAL_URL=http://localhost:5173
FRONTEND_REMOTE_URL=https://lifepadi.com
FRONTEND_REMOTE_SUBDOMAIN_URL=https://app.lifepadi.com

# Distance Configuration
PRICE_PER_KILOMETER=300
```

## Step 2: Update Program.cs

We need to modify the Program.cs file to use environment variables. Here's how we'll do it:

1. Add the following NuGet package:

```bash
dotnet add package Microsoft.Extensions.Configuration.EnvironmentVariables
```

2. Update the configuration setup in Program.cs to include environment variables.

## Step 3: Update appsettings.json

Create a new structure in appsettings.json that uses environment variables:

```json
{
	"ConnectionStrings": {
		"LifePadiDBConnection": "Server=${DB_SERVER};Port=${DB_PORT};Database=${DB_NAME};Username=${DB_USERNAME};Password=${DB_PASSWORD};"
	},
	"Jwt": {
		"Key": "${JWT_KEY}"
	},
	"Cloudinary": {
		"Cloud_Name": "${CLOUDINARY_CLOUD_NAME}",
		"Api_Key": "${CLOUDINARY_API_KEY}",
		"Api_Secret": "${CLOUDINARY_API_SECRET}"
	}
	// ... other configurations following the same pattern
}
```

## Step 4: Implementation Plan

1. **Phase 1 - Database Connection**

   - Move database credentials to environment variables
   - Test database connectivity
   - Verify all database operations work

2. **Phase 2 - Authentication**

   - Move JWT key to environment variables
   - Test authentication flow
   - Verify token generation and validation

3. **Phase 3 - External Services**

   - Move API keys and secrets to environment variables
   - Test each service integration
   - Verify all external service calls work

4. **Phase 4 - Email and SMS**

   - Move SMTP and Termii credentials to environment variables
   - Test email sending
   - Test SMS sending

5. **Phase 5 - Payment Gateways**
   - Move payment gateway credentials to environment variables
   - Test payment flows
   - Verify webhook handling

## Step 5: Testing Strategy

For each phase:

1. Create a test branch
2. Implement changes
3. Run all unit tests
4. Run integration tests
5. Test in development environment
6. Test in staging environment
7. Document any issues found
8. Fix issues and retest
9. Merge to main branch

## Step 6: Deployment Considerations

1. Update deployment scripts to include environment variables
2. Update CI/CD pipeline to handle environment variables
3. Update documentation for deployment process
4. Create environment variable setup guide for new developers

## Security Notes

1. Never commit the actual `.env` file
2. Use different values for different environments
3. Regularly rotate sensitive credentials
4. Use secure methods to share credentials with team members
5. Implement proper access controls for environment variables

## Rollback Plan

1. Keep backup of original appsettings.json
2. Document all changes made
3. Create rollback scripts
4. Test rollback process
5. Have monitoring in place to detect issues quickly

## Next Steps

1. Review this plan with the team
2. Get approval for the changes
3. Create a timeline for implementation
4. Assign responsibilities
5. Begin implementation in phases
