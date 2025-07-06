#!/bin/bash

# Test script to verify JWT key loading
# This script helps debug JWT key issues

echo "=== LifePadi JWT Key Testing ==="
echo ""

# Test 1: Check if .env file exists and contains JWT_KEY
if [ -f ".env" ]; then
    echo "✅ .env file exists"
    JWT_KEY_FROM_FILE=$(grep "JWT_KEY" .env | cut -d'=' -f2)
    if [ -n "$JWT_KEY_FROM_FILE" ]; then
        echo "✅ JWT_KEY found in .env file"
        echo "   Length: ${#JWT_KEY_FROM_FILE} characters"
        if [ ${#JWT_KEY_FROM_FILE} -ge 16 ]; then
            echo "✅ JWT_KEY length is sufficient (≥16 characters)"
        else
            echo "❌ JWT_KEY length is insufficient (<16 characters)"
        fi
    else
        echo "❌ JWT_KEY not found in .env file"
    fi
else
    echo "❌ .env file not found"
fi

echo ""

# Test 2: Check if environment variable is set
if [ -n "$JWT_KEY" ]; then
    echo "✅ JWT_KEY environment variable is set"
    echo "   Length: ${#JWT_KEY} characters"
else
    echo "❌ JWT_KEY environment variable is not set"
fi

echo ""

# Test 3: Check if Secret Manager is configured
if [ -n "$GOOGLE_CLOUD_PROJECT" ]; then
    echo "✅ GOOGLE_CLOUD_PROJECT is set: $GOOGLE_CLOUD_PROJECT"
    
    # Check if secret exists
    if command -v gcloud &> /dev/null; then
        echo "✅ gcloud CLI is available"
        if gcloud secrets describe lifepadi-env --project="$GOOGLE_CLOUD_PROJECT" &> /dev/null; then
            echo "✅ Secret 'lifepadi-env' exists in Secret Manager"
        else
            echo "❌ Secret 'lifepadi-env' not found in Secret Manager"
        fi
    else
        echo "❌ gcloud CLI not available"
    fi
else
    echo "❌ GOOGLE_CLOUD_PROJECT not set"
fi

echo ""

# Test 4: Generate a sample JWT key
echo "=== Sample JWT Key Generation ==="
echo "If you need a new JWT key, here's a secure one:"
openssl rand -base64 32
echo ""

# Test 5: Test local application startup
echo "=== Testing Local Application ==="
echo "Starting application for 5 seconds to test JWT key loading..."
timeout 5 dotnet run --environment Development --no-build 2>&1 | grep -E "(JWT|environment|error|warning)" || echo "Application started without JWT-related errors"
echo ""

echo "=== Test Complete ==="
