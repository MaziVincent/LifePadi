# Environment Variables Setup Guide

## Overview

This guide explains how to set up environment variables for the LifePadi API project. The project uses environment variables for sensitive configuration to improve security.

## Setup Instructions

### Development Environment

1. Run the setup script:

```bash
source ./setup-env.sh
```

2. Verify the environment variables are set:

```bash
echo $DB_SERVER
```

### Production Environment

1. Set up environment variables in your hosting platform (AWS, GCP, etc.)
2. Never commit the actual environment values to source control
3. Use different values for different environments (development, staging, production)

## Environment Variables List

### Database Configuration

- `DB_SERVER`: Database server hostname
- `DB_PORT`: Database port
- `DB_NAME`: Database name
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password

### JWT Configuration

- `JWT_KEY`: JWT signing key (minimum 32 characters)
- `JWT_ISSUER`: JWT token issuer (default: LifePadi-API)
- `JWT_AUDIENCE`: JWT token audience (default: LifePadi-Client)

### Cloudinary Configuration

- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

### Payment Gateway Configurations

#### Paystack

- `PAYSTACK_SECRET_KEY`: Paystack secret key
- `PAYSTACK_PUBLIC_KEY`: Paystack public key
- `PAYSTACK_TEST_KEY`: Paystack test key

#### Bani

- `BANI_PUBLIC_KEY`: Bani public key
- `BANI_PRIVATE_KEY`: Bani private key
- `BANI_ACCOUNT_TRIBE_REF`: Bani account tribe reference
- `BANI_ACCESS_TOKEN`: Bani access token
- `BANI_MERCHANT_KEY`: Bani merchant key

#### FW Payment

- `FW_PAYMENT_SECRET_KEY`: FW Payment secret key

### Google Maps

- `GOOGLE_MAPS_API_KEY`: Google Maps API key

### Termii SMS Configuration

- `TERMII_API_KEY`: Termii API key
- `TERMII_SENDER_ID`: Termii sender ID

### SMTP Configuration

- `SMTP_SERVER`: SMTP server hostname
- `SMTP_PORT`: SMTP server port
- `SMTP_USERNAME`: SMTP username
- `SMTP_PASSWORD`: SMTP password
- `SMTP_SENDER`: SMTP sender name
- `SMTP_SENDER_EMAIL`: SMTP sender email
- `SMTP_ENABLE_SSL`: SMTP SSL enabled flag

### Base URLs

- `API_LOCAL_URL`: Local API URL
- `API_REMOTE_URL`: Remote API URL
- `API_REMOTE_GCP_URL`: GCP API URL
- `FRONTEND_LOCAL_URL`: Local frontend URL
- `FRONTEND_REMOTE_URL`: Remote frontend URL
- `FRONTEND_REMOTE_SUBDOMAIN_URL`: Remote subdomain frontend URL

### Distance Configuration

- `PRICE_PER_KILOMETER`: Price per kilometer

## Security Notes

1. Never commit sensitive values to source control
2. Use different values for different environments
3. Regularly rotate sensitive credentials
4. Use secure methods to share credentials with team members
5. Implement proper access controls for environment variables

## Troubleshooting

If you encounter issues with environment variables:

1. Verify the variables are set:

```bash
env | grep DB_
```

2. Check the application logs for configuration errors

3. Verify the environment variables are being loaded in Program.cs

4. Ensure the setup script has been sourced correctly

## Best Practices

1. Use strong, unique values for each environment
2. Regularly rotate sensitive credentials
3. Use a secrets management service in production
4. Implement proper access controls
5. Monitor for unauthorized access attempts
6. Keep the setup script updated with new variables
7. Document any changes to the environment setup
