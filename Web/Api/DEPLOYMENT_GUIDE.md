# JWT Key Cloud Deployment Fix Guide

## Problem Summary
- **Local**: JWT key loads correctly from .env file (43 characters)
- **Cloud**: Environment variables not loaded from Secret Manager, causing fallback to shorter key (80 bits)

## Solution Steps

### Step 1: Upload your .env file to Google Cloud Secret Manager

```bash
# Make sure you're authenticated
gcloud auth login

# Set your project ID
export GOOGLE_CLOUD_PROJECT="your-project-id"

# Upload your .env file to Secret Manager
./upload-env-to-secret-manager.sh
```

### Step 2: Verify the secret was uploaded correctly

```bash
# Check if the secret exists
gcloud secrets describe lifepadi-env --project="$GOOGLE_CLOUD_PROJECT"

# View the first 100 characters of the secret
gcloud secrets versions access latest --secret=lifepadi-env --project="$GOOGLE_CLOUD_PROJECT" | head -c 100
```

### Step 3: Update your cloudbuild.yaml with the correct project ID

Edit `cloudbuild.yaml` and replace any project ID references with your actual project:

```yaml
# Make sure this matches your actual project ID
--set-env-vars=GOOGLE_CLOUD_PROJECT=$PROJECT_ID
```

### Step 4: Deploy to Google Cloud

```bash
# Deploy using Cloud Build
gcloud builds submit --config=cloudbuild.yaml

# Or deploy manually
gcloud run deploy lifepadi-v2 \
    --image=us-east1-docker.pkg.dev/YOUR-PROJECT-ID/lifepadi-repo/lifepadi-v2:latest \
    --region=us-east1 \
    --platform=managed \
    --allow-unauthenticated \
    --set-env-vars=GOOGLE_CLOUD_PROJECT=YOUR-PROJECT-ID \
    --memory=1Gi \
    --cpu=1 \
    --max-instances=10 \
    --port=8080
```

### Step 5: Check deployment logs

```bash
# View the logs to verify environment variables are loaded
gcloud logs read --service=lifepadi-v2 --limit=50
```

Look for these log messages:
- "Running in Google Cloud - loading environment variables from Secret Manager"
- "Successfully loaded environment variables from Secret Manager"
- "[generateRefreshToken] Final JWT key length: 43" (or similar)

### Step 6: Test the deployed application

```bash
# Test an endpoint that requires JWT generation
curl -X POST https://your-cloud-run-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpassword"}'
```

## Troubleshooting

### If you see "JWT_KEY from environment: NOT SET" in logs:

1. **Check Secret Manager permissions**:
   ```bash
   gcloud secrets add-iam-policy-binding lifepadi-env \
     --member="serviceAccount:YOUR-PROJECT-ID-compute@developer.gserviceaccount.com" \
     --role="roles/secretmanager.secretAccessor"
   ```

2. **Verify the secret name**: Make sure the secret is named exactly "lifepadi-env"

3. **Check the secret content**: Ensure the secret contains your full .env file content

### If you see "Failed to load environment variables from secret":

1. **Check if the secret exists**:
   ```bash
   gcloud secrets list --filter="name:lifepadi-env"
   ```

2. **Verify project ID**: Make sure GOOGLE_CLOUD_PROJECT environment variable is set correctly

3. **Check service account permissions**: The Cloud Run service account needs Secret Manager access

## Testing Locally

Use the test script to verify your setup:

```bash
./test-jwt-key.sh
```

This will check:
- .env file existence and JWT_KEY length
- Environment variable setup
- Secret Manager configuration
- Local application startup

## Security Notes

- Never commit .env files to source control
- Use different JWT keys for different environments
- Rotate JWT keys regularly
- Use Google Cloud Secret Manager for production secrets

## Quick Fix for Immediate Deployment

If you need to deploy immediately without Secret Manager:

1. Edit `cloudbuild.yaml` and add your JWT key directly:
   ```yaml
   --set-env-vars=GOOGLE_CLOUD_PROJECT=$PROJECT_ID,JWT_KEY=your-jwt-key-here
   ```

2. Deploy:
   ```bash
   gcloud builds submit --config=cloudbuild.yaml
   ```

**Warning**: This approach is less secure and only recommended for testing.
