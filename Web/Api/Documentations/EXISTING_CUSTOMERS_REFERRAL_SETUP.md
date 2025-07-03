# Adding Referral Codes to Existing Customers

## Overview

This guide provides multiple approaches to add referral codes to existing customers who were created before the referral system was implemented.

## 🎯 Recommended Approaches

### Option 1: Database Migration (Recommended for Production)

Use the Entity Framework migration to safely update the database schema and populate referral codes.

**File:** `/Migrations/AddReferralCodeToExistingCustomers.cs`

**To apply:**

```bash
dotnet ef database update
```

**Benefits:**

- Version controlled
- Rollback capability
- Safe schema changes
- Works across all environments

### Option 2: API Endpoint (Recommended for Admin Control)

Use the new admin-only API endpoint to generate referral codes for existing customers.

**Endpoint:** `POST /api/customer/generate-referral-codes`

**Authorization:** Admin only

**Example:**

```bash
curl -X POST "https://your-api.com/api/customer/generate-referral-codes" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Response:**

```json
{
	"success": true,
	"message": "Successfully generated referral codes for 150 customers",
	"updatedCount": 150,
	"failedCount": 0,
	"failedCustomerIds": []
}
```

### Option 3: Direct SQL Script

Execute the SQL script directly on your database for immediate updates.

**File:** `/Scripts/AddReferralCodesToExistingCustomers.sql`

**To run:**

```bash
psql -d your_database -f Scripts/AddReferralCodesToExistingCustomers.sql
```

## 🔧 Additional Management Endpoints

### Regenerate Individual Referral Code

If you need to regenerate a referral code for a specific customer:

**Endpoint:** `PUT /api/customer/regenerate-referral-code/{id}`

**Example:**

```bash
curl -X PUT "https://your-api.com/api/customer/regenerate-referral-code/123" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Response:**

```json
{
	"success": true,
	"message": "Referral code regenerated successfully",
	"customerId": 123,
	"oldReferralCode": "ABC123",
	"newReferralCode": "XYZ789"
}
```

## 📊 Verification Steps

After running any of the above methods, verify the results:

### 1. Check Database Directly

```sql
-- Count customers with and without referral codes
SELECT
    COUNT(*) as total_customers,
    COUNT("ReferralCode") as customers_with_codes,
    COUNT(*) - COUNT("ReferralCode") as customers_without_codes
FROM "Users"
WHERE "Discriminator" = 'Customer';

-- Verify referral codes are unique
SELECT "ReferralCode", COUNT(*)
FROM "Users"
WHERE "Discriminator" = 'Customer'
AND "ReferralCode" IS NOT NULL
GROUP BY "ReferralCode"
HAVING COUNT(*) > 1;
```

### 2. Test API Response

Create a new customer and verify they receive a referral code:

```bash
curl -X POST "https://your-api.com/api/customer/create" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phoneNumber": "+1234567890",
    "password": "SecurePass123!",
    "dob": "1990-01-01"
  }'
```

## ⚠️ Important Considerations

### 1. Backup First

Always backup your database before running any bulk updates:

```bash
pg_dump your_database > backup_before_referral_codes.sql
```

### 2. Test in Development

Run the chosen method in your development environment first to ensure it works correctly.

### 3. Monitor Performance

For large databases (100k+ customers), consider running updates in batches to avoid locking issues.

### 4. Uniqueness Guarantee

All methods ensure referral codes are unique by:

- Checking existing codes before generation
- Using a retry mechanism for duplicates
- Creating database constraints

## 🔄 Rollback Procedures

### If Using Migration

```bash
# Rollback to previous migration
dotnet ef database update PreviousMigrationName
```

### If Using SQL Script

```sql
-- Remove referral codes
UPDATE "Users"
SET "ReferralCode" = NULL
WHERE "Discriminator" = 'Customer';

-- Drop column if needed
ALTER TABLE "Users" DROP COLUMN IF EXISTS "ReferralCode";
```

### If Using API

Currently no built-in rollback for API method. You would need to run SQL to clear the codes if needed.

## 📈 Expected Results

After successful execution, you should see:

- All existing customers have unique 6-character referral codes
- New customers automatically receive referral codes on registration
- Referral system works for both new and existing customers
- No duplicate referral codes in the system

## 🆘 Troubleshooting

### Common Issues:

1. **Duplicate Key Errors**: The system has retry logic to handle this
2. **Performance Issues**: Consider running in smaller batches
3. **Permission Errors**: Ensure proper database/API permissions
4. **Memory Issues**: For very large datasets, use the SQL approach

### Getting Help:

Check the application logs for detailed error messages when using the API endpoints. For SQL issues, check your database logs.
