# 🔒 LifePadi Security Setup Guide

## ⚠️ CRITICAL SECURITY NOTICE

**Hardcoded credentials have been removed from this repository for security reasons.**

## 🚀 Quick Setup for Development

### 1. Create Environment File
```bash
# Copy the template
cp .env.template .env

# Edit with your actual values
nano .env  # or use your preferred editor
```

### 2. Run Secure Setup
```bash
./setup-env-secure.sh
```

### 3. Start Application
```bash
dotnet run
```

## 📋 Required Environment Variables

### Database Configuration
- `DB_SERVER` - Database server hostname
- `DB_PORT` - Database port (usually 5432 for PostgreSQL)
- `DB_NAME` - Database name
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password

### Authentication
- `JWT_KEY` - JWT signing key (minimum 32 characters)

### Third-Party Services
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `PAYSTACK_SECRET_KEY` - Paystack secret key
- `PAYSTACK_PUBLIC_KEY` - Paystack public key
- `PAYSTACK_TEST_KEY` - Paystack test key
- `GOOGLE_MAPS_API_KEY` - Google Maps API key
- `TERMII_API_KEY` - Termii SMS API key
- `TERMII_SENDER_ID` - Termii sender ID

### Email Configuration
- `SMTP_SERVER` - SMTP server hostname
- `SMTP_PORT` - SMTP port
- `SMTP_USERNAME` - SMTP username
- `SMTP_PASSWORD` - SMTP password
- `SMTP_SENDER` - Sender name
- `SMTP_SENDER_EMAIL` - Sender email address
- `SMTP_ENABLE_SSL` - Enable SSL (true/false)

## 🔐 Security Best Practices

### For Development
1. **Never commit .env files** - They are in .gitignore
2. **Use different credentials** for development and production
3. **Rotate credentials regularly**
4. **Use strong, unique passwords**
5. **Enable 2FA** where possible

### For Production
1. **Use environment variables** or secure secret management
2. **Rotate credentials monthly**
3. **Monitor for credential leaks**
4. **Use least privilege access**
5. **Enable audit logging**

## 🚨 What Was Changed

### Files Secured
- ✅ `setup-env.sh` - Removed hardcoded credentials
- ✅ `publish/appsettings.json` - Moved to backup
- ✅ `.gitignore` - Added environment files
- ✅ `Program.cs` - Enhanced environment variable usage

### Files Added
- ✅ `.env.template` - Template for environment variables
- ✅ `setup-env-secure.sh` - Secure setup script
- ✅ `SECURITY_SETUP.md` - This documentation

## 🔧 Troubleshooting

### Application Won't Start
1. Check if `.env` file exists
2. Verify all required variables are set
3. Run `./setup-env-secure.sh` to validate
4. Check database connectivity

### Database Connection Issues
1. Verify database credentials
2. Check network connectivity
3. Ensure database server is running
4. Verify firewall settings

### JWT Issues
1. Ensure JWT_KEY is at least 32 characters
2. Use a strong, random key
3. Don't reuse keys across environments

## 📞 Emergency Procedures

### If Credentials Are Compromised
1. **Immediately rotate** all affected credentials
2. **Check logs** for unauthorized access
3. **Update environment variables**
4. **Restart applications**
5. **Monitor for suspicious activity**

### If Credentials Are Accidentally Committed
1. **Remove from repository** immediately
2. **Rotate all credentials** in the commit
3. **Force push** to remove from history (if possible)
4. **Notify team members**
5. **Update all environments**

## 📚 Additional Resources

- [OWASP Security Guidelines](https://owasp.org/)
- [.NET Security Best Practices](https://docs.microsoft.com/en-us/aspnet/core/security/)
- [Environment Variable Security](https://12factor.net/config)

## 🆘 Support

If you need help with the security setup:
1. Check this documentation first
2. Run `./setup-env-secure.sh` for validation
3. Contact the development team
4. Review the project improvement plan

---

**Remember: Security is everyone's responsibility!** 🛡️
