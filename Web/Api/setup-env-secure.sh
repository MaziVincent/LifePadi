#!/bin/bash

# LifePadi Secure Environment Setup Script
# This script helps setup environment variables securely for development

echo "🔒 LifePadi Secure Environment Setup"
echo "======================================"

# Check if .env file exists
if [ -f ".env" ]; then
    echo "✅ .env file found. Loading environment variables..."
    export $(cat .env | grep -v '^#' | xargs)
    echo "✅ Environment variables loaded from .env file"
else
    echo "❌ .env file not found!"
    echo ""
    echo "Please create a .env file based on .env.template:"
    echo "1. Copy .env.template to .env"
    echo "2. Fill in your actual values"
    echo "3. Run this script again"
    echo ""
    echo "Commands:"
    echo "  cp .env.template .env"
    echo "  nano .env  # Edit with your values"
    echo ""
    exit 1
fi

# Validate required environment variables
echo ""
echo "🔍 Validating required environment variables..."

required_vars=(
    "DB_SERVER"
    "DB_PORT"
    "DB_NAME"
    "DB_USERNAME"
    "DB_PASSWORD"
    "JWT_KEY"
    "JWT_ISSUER"
    "JWT_AUDIENCE"
)

missing_vars=()

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "❌ Missing required environment variables:"
    for var in "${missing_vars[@]}"; do
        echo "   - $var"
    done
    echo ""
    echo "Please update your .env file with these variables."
    exit 1
fi

# Validate JWT key length (should be at least 32 characters)
if [ ${#JWT_KEY} -lt 32 ]; then
    echo "❌ JWT_KEY must be at least 32 characters long for security"
    echo "   Current length: ${#JWT_KEY}"
    exit 1
fi

echo "✅ All required environment variables are set"
echo "✅ JWT key length is sufficient (${#JWT_KEY} characters)"

# Test database connection (optional)
echo ""
echo "🔍 Testing database connection..."
if command -v psql &> /dev/null; then
    if PGPASSWORD="$DB_PASSWORD" psql -h "$DB_SERVER" -p "$DB_PORT" -U "$DB_USERNAME" -d "$DB_NAME" -c "SELECT 1;" &> /dev/null; then
        echo "✅ Database connection successful"
    else
        echo "⚠️  Database connection failed - please check your credentials"
    fi
else
    echo "ℹ️  psql not found - skipping database connection test"
fi

echo ""
echo "🎉 Environment setup completed successfully!"
echo ""
echo "You can now run your application with:"
echo "  dotnet run"
echo ""
echo "🔒 Security reminders:"
echo "  - Never commit .env files to source control"
echo "  - Rotate credentials regularly"
echo "  - Use different credentials for different environments"
echo "  - Keep production credentials secure and separate"
