#!/bin/bash

# Script to upload .env file to Google Cloud Secret Manager
# Make sure you have gcloud CLI installed and authenticated

set -e

# Configuration
PROJECT_ID="${GOOGLE_CLOUD_PROJECT:-$(gcloud config get-value project)}"
SECRET_NAME="lifepadi-Secret"
ENV_FILE=".env"

echo "=== LifePadi Environment Variables Setup ==="
echo "Project ID: $PROJECT_ID"
echo "Secret Name: $SECRET_NAME"
echo "Environment File: $ENV_FILE"
echo ""

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE file not found!"
    echo "Please create a .env file with your environment variables first."
    echo "You can copy from .env.template:"
    echo "  cp .env.template .env"
    echo "Then edit .env with your actual values."
    exit 1
fi

# Validate that .env has some content
if [ ! -s "$ENV_FILE" ]; then
    echo "Error: $ENV_FILE file is empty!"
    echo "Please add your environment variables to $ENV_FILE first."
    exit 1
fi

# Check if secret already exists
if gcloud secrets describe "$SECRET_NAME" --project="$PROJECT_ID" > /dev/null 2>&1; then
    echo "Secret '$SECRET_NAME' already exists."
    read -p "Do you want to create a new version? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Creating new version of secret '$SECRET_NAME'..."
        gcloud secrets versions add "$SECRET_NAME" --data-file="$ENV_FILE" --project="$PROJECT_ID"
        echo "✅ New version of secret '$SECRET_NAME' created successfully!"
    else
        echo "Skipping secret creation."
    fi
else
    echo "Creating new secret '$SECRET_NAME'..."
    gcloud secrets create "$SECRET_NAME" --data-file="$ENV_FILE" --project="$PROJECT_ID"
    echo "✅ Secret '$SECRET_NAME' created successfully!"
fi

# Set IAM permissions for Cloud Run service account
SERVICE_ACCOUNT_EMAIL="${PROJECT_ID}-compute@developer.gserviceaccount.com"
echo ""
echo "Setting IAM permissions for Cloud Run service account..."
gcloud secrets add-iam-policy-binding "$SECRET_NAME" \
    --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
    --role="roles/secretmanager.secretAccessor" \
    --project="$PROJECT_ID"

echo "✅ IAM permissions set successfully!"

echo ""
echo "=== Setup Complete ==="
echo "Your .env file has been uploaded to Google Cloud Secret Manager."
echo "The secret name is: $SECRET_NAME"
echo "Your application will now load environment variables from this secret when running in Google Cloud."
echo ""
echo "To deploy your application, run:"
echo "  gcloud builds submit --config=cloudbuild.yaml"
echo ""
echo "To view your secret (first 100 characters):"
echo "  gcloud secrets versions access latest --secret=$SECRET_NAME --project=$PROJECT_ID | head -c 100"
echo ""
