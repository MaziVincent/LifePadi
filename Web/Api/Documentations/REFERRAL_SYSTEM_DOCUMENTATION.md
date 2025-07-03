# Customer Referral System

## Overview

The LifePadi API now includes a customer referral system that rewards customers for referring new users to the platform.

## Features

### 1. Automatic Referral Code Generation

- Each customer receives a unique 6-character referral code when they register
- Referral codes consist of uppercase letters and numbers (A-Z, 0-9)
- The system ensures all referral codes are unique

### 2. Referral Rewards

- When a new customer registers using a valid referral code, the referring customer receives ₦200 in their wallet
- The reward is automatically credited as a wallet deposit transaction
- The transaction is recorded with type "referral" for tracking purposes

### 3. Error Handling

- Invalid or non-existent referral codes are handled gracefully (no errors thrown)
- If referral processing fails, the customer registration still succeeds
- The system continues to work normally even if the referring customer's wallet doesn't exist

## API Changes

### Models Updated

- **Customer Model**: Added `ReferralCode` property
- **CustomerDto**: Added `ReferredByCode` (input) and `ReferralCode` (output) properties
- **AuthCustomerDto**: Added `ReferralCode` property for authentication responses

### Database Changes

- Migration `AddReferralCodeToCustomer` adds the `ReferralCode` column to the Customer table

### Services Updated

- **CustomerService**: Enhanced with referral code generation and bonus processing
- **GenerateCode Helper**: Added `GenerateReferralCode()` method
- **AutoMapperProfile**: Added mapping for AuthCustomerDto

## Usage

### For New Customer Registration

```json
POST /api/customer/create
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phoneNumber": "+1234567890",
  "password": "SecurePass123!",
  "dob": "1990-01-01",
  "referredByCode": "ABC123"  // Optional: referral code of existing customer
}
```

### Response

```json
{
	"id": 123,
	"firstName": "John",
	"lastName": "Doe",
	"email": "john@example.com",
	"phoneNumber": "+1234567890",
	"referralCode": "XYZ789", // Generated unique code for this customer
	"accessToken": "...",
	"refreshToken": "...",
	"wallet": {
		"balance": 0.0,
		"initialBalance": 0.0
	}
}
```

## Implementation Details

### Referral Code Generation

- Uses cryptographically random character selection
- Generates codes until a unique one is found
- 6-character length ensures 36^6 (over 2 billion) possible combinations

### Wallet Credit Process

1. Validates the provided referral code
2. Finds the referring customer and their wallet
3. Credits ₦200 to the referring customer's wallet
4. Records a deposit transaction with type "referral"
5. Updates wallet balance and timestamps

### Security Considerations

- Referral codes are case-sensitive
- Only valid, existing referral codes trigger rewards
- The system prevents crashes from malformed or missing referral data
- All database operations are wrapped in try-catch blocks

## Future Enhancements

- Configurable referral bonus amounts
- Referral tracking and analytics
- Limits on referral rewards per customer
- Referral code expiration
- Multi-level referral programs
