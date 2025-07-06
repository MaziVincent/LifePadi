#!/bin/bash

# Script to create .env file from .env.template
# This helps you set up your environment variables locally

set -e

ENV_TEMPLATE=".env.template"
ENV_FILE=".env"

echo "=== LifePadi Environment Setup ==="
echo ""

# Check if .env.template exists
if [ ! -f "$ENV_TEMPLATE" ]; then
    echo "Error: $ENV_TEMPLATE file not found!"
    exit 1
fi

# Check if .env already exists
if [ -f "$ENV_FILE" ]; then
    echo "Warning: $ENV_FILE already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Keeping existing $ENV_FILE file."
        exit 0
    fi
fi

# Copy template to .env
cp "$ENV_TEMPLATE" "$ENV_FILE"

echo "✅ Created $ENV_FILE from $ENV_TEMPLATE"
echo ""
echo "⚠️  IMPORTANT: Please edit $ENV_FILE and replace the placeholder values with your actual values."
echo ""
echo "Required values to update:"
echo "- Database connection details (DB_SERVER, DB_NAME, DB_USERNAME, DB_PASSWORD)"
echo "- JWT_KEY (generate a secure key at least 32 characters long)"
echo "- Payment gateway keys (PAYSTACK_SECRET_KEY, etc.)"
echo "- API keys (GOOGLE_MAPS_API_KEY, TERMII_API_KEY, etc.)"
echo "- Cloudinary credentials"
echo "- SMTP configuration"
echo ""
echo "To generate a secure JWT key, you can use:"
echo "  openssl rand -base64 32"
echo ""
echo "After editing $ENV_FILE, you can upload it to Google Cloud Secret Manager with:"
echo "  ./upload-env-to-secret-manager.sh"
echo ""
