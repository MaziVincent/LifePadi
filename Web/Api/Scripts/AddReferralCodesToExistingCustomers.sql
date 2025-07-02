-- SQL Script to add referral codes to existing customers
-- Run this script directly in your database if you prefer SQL over migrations

-- Step 1: Add the ReferralCode column if it doesn't exist
ALTER TABLE "Users" 
ADD COLUMN IF NOT EXISTS "ReferralCode" TEXT;

-- Step 2: Create unique index on ReferralCode (optional but recommended)
CREATE UNIQUE INDEX IF NOT EXISTS "IX_Users_ReferralCode" 
ON "Users" ("ReferralCode") 
WHERE "ReferralCode" IS NOT NULL;

-- Step 3: Function to generate random 6-character referral codes
-- This generates codes using uppercase letters and numbers
DO $$
DECLARE
    customer_record RECORD;
    new_code TEXT;
    code_exists BOOLEAN;
BEGIN
    -- Loop through all customers without referral codes
    FOR customer_record IN 
        SELECT "Id" 
        FROM "Users" 
        WHERE "Discriminator" = 'Customer' 
        AND ("ReferralCode" IS NULL OR "ReferralCode" = '')
    LOOP
        -- Generate unique referral code
        LOOP
            -- Generate random 6-character code (A-Z, 0-9)
            new_code := UPPER(
                SUBSTR(
                    REPLACE(
                        REPLACE(
                            REPLACE(encode(gen_random_bytes(8), 'base64'), '+', ''), 
                            '/', ''
                        ), 
                        '=', ''
                    ), 
                    1, 6
                )
            );
            
            -- Check if code already exists
            SELECT EXISTS(
                SELECT 1 FROM "Users" 
                WHERE "ReferralCode" = new_code
            ) INTO code_exists;
            
            -- Exit loop if code is unique
            EXIT WHEN NOT code_exists;
        END LOOP;
        
        -- Update customer with new referral code
        UPDATE "Users" 
        SET "ReferralCode" = new_code,
            "UpdatedAt" = NOW()
        WHERE "Id" = customer_record."Id";
        
        -- Log progress (optional)
        RAISE NOTICE 'Updated customer % with referral code %', customer_record."Id", new_code;
    END LOOP;
END $$;

-- Step 4: Verify the update
SELECT 
    COUNT(*) as total_customers,
    COUNT("ReferralCode") as customers_with_codes,
    COUNT(*) - COUNT("ReferralCode") as customers_without_codes
FROM "Users" 
WHERE "Discriminator" = 'Customer';

-- Step 5: Show sample of generated codes
SELECT "Id", "FirstName", "LastName", "Email", "ReferralCode"
FROM "Users" 
WHERE "Discriminator" = 'Customer' 
AND "ReferralCode" IS NOT NULL
LIMIT 10;
