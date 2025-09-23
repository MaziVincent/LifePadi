# Yonko API Key Setup Guide

## Environment Configuration

To secure the Yonko delivery endpoints, you need to configure the API key in your environment:

### Development Environment

The development API key is already configured in `appsettings.Development.json`:

```json
{
	"ApiKeys": {
		"YonkoExternalAccess": "dev-yonko-key-2025-external-access"
	}
}
```

### Production Environment

For production, set the environment variable:

```bash
export YONKO_API_KEY="your-secure-production-api-key-here"
```

Or in your hosting platform (Azure, GCP, AWS, etc.), configure:

```
YONKO_API_KEY = your-secure-production-api-key-here
```

### API Key Requirements

- Must be a strong, randomly generated key
- Recommended length: 32+ characters
- Should include alphanumeric characters and special characters
- Store securely and rotate periodically

### Example Strong API Key Generation

```bash
# Using OpenSSL (Linux/Mac)
openssl rand -base64 32

# Using PowerShell (Windows)
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### Implementation Details

- API key validation is handled by the `ApiKeyAuthAttribute`
- Expected header: `X-API-Key`
- All endpoints in `YonkoController` are protected
- Invalid/missing keys return 401 Unauthorized

### Security Best Practices

1. **Never commit API keys to source control**
2. **Use different keys for different environments**
3. **Rotate keys regularly (quarterly recommended)**
4. **Monitor API key usage and access logs**
5. **Consider implementing rate limiting per API key**
6. **Store keys in secure key management services (Azure Key Vault, AWS Secrets Manager, etc.)**

### Testing

Use the provided `test-yonko-api-key.http` file to verify authentication is working correctly.

### Troubleshooting

- **401 "API key is required"**: Missing `X-API-Key` header
- **401 "Invalid API key"**: Wrong key value
- **500 "API key configuration not found"**: Environment variable not set
