#!/bin/bash

# JWT Configuration Fix Script
# This script ensures the JWT key is properly configured for HS256 algorithm

echo "🔑 JWT Configuration Fix"
echo "========================="

# Load environment variables
echo "📋 Loading environment variables..."
if [ -f ".env" ]; then
    export $(cat .env | grep -v '^#' | xargs)
    echo "✅ Environment variables loaded"
else
    echo "❌ .env file not found!"
    exit 1
fi

# Check JWT key length
JWT_KEY_LENGTH=${#JWT_KEY}
echo "🔍 Current JWT key length: $JWT_KEY_LENGTH characters"

if [ $JWT_KEY_LENGTH -lt 32 ]; then
    echo "❌ JWT key is too short! HS256 requires at least 32 characters (256 bits)"
    echo "🔧 Generating new secure JWT key..."
    
    # Generate new secure key
    NEW_JWT_KEY=$(openssl rand -base64 32)
    
    # Update .env file
    sed -i.backup "s/JWT_KEY=.*/JWT_KEY=$NEW_JWT_KEY/" .env
    
    echo "✅ New JWT key generated and saved to .env"
    echo "🔄 Old .env backed up as .env.backup"
else
    echo "✅ JWT key length is sufficient"
fi

# Validate JWT configuration
echo "🧪 Testing JWT configuration..."
echo "JWT_KEY: ${JWT_KEY:0:10}... (truncated for security)"
echo "JWT_ISSUER: ${JWT_ISSUER:-LifePadi-API}"
echo "JWT_AUDIENCE: ${JWT_AUDIENCE:-LifePadi-Client}"

echo ""
echo "🚀 Starting application with environment variables..."
echo "📝 Monitor the logs for any JWT-related errors"
echo ""

# Start the application with environment variables loaded
dotnet run --environment Development
