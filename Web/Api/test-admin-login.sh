#!/bin/bash

# Admin Login Test Script
# This script tests the admin login functionality after JWT fix

echo "🧪 Admin Login Test"
echo "==================="

# Check if the server is running
echo "🔍 Checking if server is running..."
if ! curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "❌ Server is not running!"
    echo "💡 Please start the server first:"
    echo "   ./fix-jwt-and-run.sh"
    echo "   or"
    echo "   export \$(cat .env | grep -v '^#' | xargs) && dotnet run"
    exit 1
fi

echo "✅ Server is running"

# Test admin login
echo ""
echo "🔐 Testing admin login..."
echo "Email: ikenna@gmail.com"
echo "Password: ikenna123"

RESPONSE=$(curl -s -X POST "http://localhost:5000/api/Auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ikenna@gmail.com",
    "password": "ikenna123"
  }')

echo ""
echo "📝 Response:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

# Check if login was successful
if echo "$RESPONSE" | grep -q '"accessToken"'; then
    echo ""
    echo "✅ Admin login successful!"
    echo "🔑 JWT token generation working properly"
    
    # Extract token for further testing
    TOKEN=$(echo "$RESPONSE" | jq -r '.data.accessToken' 2>/dev/null)
    if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
        echo "🧪 Testing token validation..."
        
        # Test a protected admin endpoint
        ADMIN_RESPONSE=$(curl -s -X GET "http://localhost:5000/api/Admin/verifyEmail" \
          -H "Authorization: Bearer $TOKEN" \
          -H "Content-Type: application/json")
        
        echo "📋 Admin endpoint test:"
        echo "$ADMIN_RESPONSE" | jq . 2>/dev/null || echo "$ADMIN_RESPONSE"
        
        if echo "$ADMIN_RESPONSE" | grep -q -v "Unauthorized"; then
            echo "✅ JWT authorization working correctly!"
        else
            echo "⚠️  JWT token generated but authorization may need checking"
        fi
    fi
else
    echo ""
    echo "❌ Admin login failed!"
    echo "🔍 Please check:"
    echo "   1. Database connection"
    echo "   2. Admin user exists (run database seeding)"
    echo "   3. JWT configuration"
    echo "   4. Server logs for detailed error"
fi

echo ""
echo "🏁 Test completed"
