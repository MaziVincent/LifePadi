# GCP CORS and API Access Troubleshooting Guide

## Problem Solved

Your API requests from Postman and VS Code REST Client were being blocked due to overly restrictive CORS policies and security headers.

## What Was Fixed

### 1. CORS Policy Updated

- **Before**: Only allowed specific frontend origins with conflicting `SetIsOriginAllowed(origin => true)`
- **After**: Now properly handles requests without origin headers (Postman, curl, server-to-server calls)

### 2. Security Headers Made API-Friendly

- **Before**: Strict CSP and cross-origin policies blocked API testing tools
- **After**: Conditional security headers - more relaxed for `/api/*` endpoints

### 3. Environment-Based Permissions

- **Development**: Allows any origin for easy testing
- **Production**: Allows specific origins + requests without origin headers

## Key Changes Made

### SecurityMiddleware.cs

```csharp
// Now allows requests without origin (Postman, etc.)
builder.SetIsOriginAllowed(origin =>
{
    if (string.IsNullOrEmpty(origin)) return true; // No origin header
    return allowedOrigins.Contains(origin) || !isProduction;
})

// Conditional CSP for API vs web requests
var isApiRequest = context.Request.Path.StartsWithSegments("/api");
if (isApiRequest)
{
    // More relaxed CSP for API endpoints
    context.Response.Headers.Append("Cross-Origin-Resource-Policy", "cross-origin");
}
```

### Program.cs

```csharp
// Dynamic CORS based on environment and origin
app.UseCors(builder =>
{
    builder.SetIsOriginAllowed(origin =>
    {
        if (string.IsNullOrEmpty(origin)) return true; // Postman, curl, etc.
        return allowedOrigins.Contains(origin) || !isProduction;
    })
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials();
});
```

## Testing Your GCP Deployment

### 1. Get Your GCP Cloud Run URL

```bash
gcloud run services describe lifepadi-v2 --region=us-east1 --format="value(status.url)"
```

### 2. Test with curl

```bash
# Test without API key (should get 401)
curl -X GET "https://your-cloud-run-url.run.app/api/yonko/delivery-fee?Origin=Lagos&Destination=Abuja"

# Test with API key (should work)
curl -H "X-API-Key: your-api-key" \
     -X GET "https://your-cloud-run-url.run.app/api/yonko/delivery-fee?Origin=Lagos&Destination=Abuja"
```

### 3. Test with Postman

1. **URL**: `https://your-cloud-run-url.run.app/api/yonko/delivery-fee`
2. **Method**: GET
3. **Headers**:
   - `X-API-Key`: `your-production-api-key`
4. **Query Params**:
   - `Origin`: `Lagos`
   - `Destination`: `Abuja`

### 4. Test with VS Code REST Client

```http
@baseUrl = https://your-cloud-run-url.run.app

### Test Yonko API
GET {{baseUrl}}/api/yonko/delivery-fee?Origin=Lagos&Destination=Abuja
X-API-Key: your-production-api-key
```

## If Still Having Issues

### Check Environment Variables

Make sure `YONKO_API_KEY` is set in your Cloud Run service:

```bash
gcloud run services update lifepadi-v2 \
  --region=us-east1 \
  --set-env-vars="YONKO_API_KEY=your-production-api-key"
```

### Check Cloud Run Logs

```bash
gcloud logs read --limit=20 --service=lifepadi-v2
```

### Common Error Responses

1. **CORS Error**: Should be fixed with the changes above
2. **401 "API key is required"**: Add `X-API-Key` header
3. **401 "Invalid API key"**: Check your production API key
4. **500 "API key configuration not found"**: Set `YONKO_API_KEY` environment variable

## Security Notes

- The changes maintain security for web requests while allowing API testing
- Production still restricts frontend origins appropriately
- API endpoints allow cross-origin requests for testing tools
- All API endpoints still require valid API keys

## Deploy the Changes

1. **Commit your changes**:

```bash
git add .
git commit -m "Fix CORS policy for API testing tools"
git push
```

2. **Trigger Cloud Build**:

```bash
gcloud builds submit --config cloudbuild.yaml
```

3. **Or deploy manually**:

```bash
gcloud run deploy lifepadi-v2 \
  --source . \
  --region=us-east1 \
  --allow-unauthenticated
```

Your API should now be accessible from Postman, VS Code REST Client, and other testing tools when deployed to GCP!
