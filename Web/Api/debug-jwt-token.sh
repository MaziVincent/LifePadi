#!/bin/bash

# JWT Token Debug Script
# This script helps debug JWT token issues by showing token contents

echo "🔍 JWT Token Debug Tool"
echo "======================="

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "❌ jq is not installed. Please install it first:"
    echo "   brew install jq  # On macOS"
    echo "   sudo apt-get install jq  # On Ubuntu"
    exit 1
fi

# Function to decode JWT token
decode_jwt() {
    local token=$1
    echo "🔐 Decoding JWT Token:"
    echo "====================="
    
    # Split token into parts
    IFS='.' read -ra PARTS <<< "$token"
    
    if [ ${#PARTS[@]} -ne 3 ]; then
        echo "❌ Invalid JWT token format"
        return 1
    fi
    
    # Decode header
    echo "📋 Header:"
    echo "${PARTS[0]}" | base64 -d 2>/dev/null | jq . 2>/dev/null || echo "Failed to decode header"
    
    echo ""
    echo "📄 Payload:"
    # Decode payload
    echo "${PARTS[1]}" | base64 -d 2>/dev/null | jq . 2>/dev/null || echo "Failed to decode payload"
    
    echo ""
    echo "🔑 Signature: ${PARTS[2]}"
}

# Test admin login and decode token
echo "🧪 Testing Admin Login..."
echo "========================="

# Test admin login
RESPONSE=$(curl -s -X POST "http://localhost:5000/api/Auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ikenna@gmail.com",
    "password": "ikenna123"
  }')

echo "📝 Login Response:"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

# Extract token
TOKEN=$(echo "$RESPONSE" | jq -r '.data.accessToken' 2>/dev/null)

if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
    echo ""
    decode_jwt "$TOKEN"
    
    echo ""
    echo "🧪 Testing Authorization..."
    echo "==========================="
    
    # Test the protected endpoint
    AUTH_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X GET "http://localhost:5000/api/Customer/all" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json")
    
    # Extract status code
    HTTP_STATUS=$(echo "$AUTH_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
    RESPONSE_BODY=$(echo "$AUTH_RESPONSE" | sed '/HTTP_STATUS/d')
    
    echo "📊 HTTP Status: $HTTP_STATUS"
    echo "📄 Response Body:"
    echo "$RESPONSE_BODY" | jq . 2>/dev/null || echo "$RESPONSE_BODY"
    
    if [ "$HTTP_STATUS" = "200" ]; then
        echo "✅ Authorization successful!"
    elif [ "$HTTP_STATUS" = "401" ]; then
        echo "❌ 401 Unauthorized - Token validation failed"
        echo "🔍 Possible issues:"
        echo "   1. Role claim not set correctly"
        echo "   2. JWT validation settings mismatch"
        echo "   3. Token expired"
        echo "   4. Authorization policy configuration issue"
    elif [ "$HTTP_STATUS" = "403" ]; then
        echo "❌ 403 Forbidden - Token valid but insufficient permissions"
        echo "🔍 Check role claim in token payload above"
    else
        echo "❌ Unexpected status code: $HTTP_STATUS"
    fi
    
else
    echo "❌ Failed to extract access token from login response"
fi

echo ""
echo "🔧 Troubleshooting Tips:"
echo "========================"
echo "1. Check that JWT_KEY environment variable is set correctly"
echo "2. Verify role claim in token payload matches 'Admin'"
echo "3. Check JWT validation parameters in Program.cs"
echo "4. Ensure 'AdminOnly' policy is configured correctly"
echo "5. Check application logs for detailed error messages"
