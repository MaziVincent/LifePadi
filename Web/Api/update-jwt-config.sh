#!/bin/bash

# LifePadi API - JWT Configuration Update Script
# This script helps update existing .env files with new JWT configuration

echo "🔐 LifePadi API - JWT Configuration Update"
echo "=========================================="
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "Please copy .env.template to .env first:"
    echo "   cp .env.template .env"
    exit 1
fi

echo "✅ Found .env file"

# Check if JWT_ISSUER already exists
if grep -q "JWT_ISSUER" .env; then
    echo "✅ JWT_ISSUER already configured"
else
    echo "➕ Adding JWT_ISSUER to .env"
    echo "" >> .env
    echo "# JWT Issuer (Added by update script)" >> .env
    echo "JWT_ISSUER=LifePadi-API" >> .env
fi

# Check if JWT_AUDIENCE already exists
if grep -q "JWT_AUDIENCE" .env; then
    echo "✅ JWT_AUDIENCE already configured"
else
    echo "➕ Adding JWT_AUDIENCE to .env"
    echo "" >> .env
    echo "# JWT Audience (Added by update script)" >> .env
    echo "JWT_AUDIENCE=LifePadi-Client" >> .env
fi

# Check JWT_KEY strength
echo ""
echo "🔍 Checking JWT_KEY strength..."

JWT_KEY=$(grep "^JWT_KEY=" .env | cut -d'=' -f2)
if [ -z "$JWT_KEY" ]; then
    echo "⚠️  JWT_KEY not found in .env file"
    echo "Please set a strong JWT_KEY (minimum 32 characters)"
elif [ ${#JWT_KEY} -lt 32 ]; then
    echo "⚠️  JWT_KEY is too short (${#JWT_KEY} characters)"
    echo "Please use a key with at least 32 characters for security"
    echo ""
    echo "You can generate a strong key with:"
    echo "   openssl rand -base64 32"
else
    echo "✅ JWT_KEY strength is adequate (${#JWT_KEY} characters)"
fi

echo ""
echo "🔧 Configuration Summary:"
echo "========================"

# Show current JWT configuration
echo "JWT_KEY: $(grep "^JWT_KEY=" .env | cut -d'=' -f2 | sed 's/./*/g')"
echo "JWT_ISSUER: $(grep "^JWT_ISSUER=" .env | cut -d'=' -f2)"
echo "JWT_AUDIENCE: $(grep "^JWT_AUDIENCE=" .env | cut -d'=' -f2)"

echo ""
echo "📋 Next Steps:"
echo "=============="
echo "1. Review your .env file to ensure all values are correct"
echo "2. If JWT_KEY is weak, generate a new one:"
echo "   openssl rand -base64 32"
echo "3. Run the secure setup script to validate:"
echo "   ./setup-env-secure.sh"
echo "4. Build and run the API:"
echo "   dotnet build && dotnet run"
echo ""
echo "📚 For more information, see:"
echo "   - QUICK_SETUP_GUIDE.md"
echo "   - API_AUTHORIZATION_GUIDE.md"
echo ""
echo "✅ JWT configuration update complete!"
