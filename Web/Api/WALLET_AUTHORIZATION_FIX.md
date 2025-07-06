# Wallet Authorization Fix

## Problem
The original `GET /api/wallet/balance/{id}` endpoint was using `[ResourceOwnerOrAdmin("id")]` which compared the wallet ID against the user ID from the JWT token. This failed because:

- **Wallet ID**: 124 (database ID of the wallet)
- **User ID**: User's ID from JWT token (different number)

## Solution Implemented

### 1. New Customer-Based Endpoint (Recommended)
Added a new endpoint that uses customer ID directly:

```http
GET /api/wallet/balance/customer/{customerId}
```

This endpoint:
- Uses `[ResourceOwnerOrAdmin("customerId")]`
- Compares the `customerId` parameter with the user's ID from JWT
- Finds the wallet by customer ID, then gets the balance

### 2. Enhanced Wallet ID Endpoint
Kept the original endpoint but improved it with a custom authorization attribute:

```http
GET /api/wallet/balance/{id}
```

This endpoint now:
- Uses `[WalletOwnerOrAdmin("id")]`
- Looks up the wallet by ID
- Checks if the wallet's customer ID matches the user's ID from JWT
- Allows admin access to any wallet

### 3. Applied Authorization to All Wallet Endpoints

| Endpoint | Authorization | Description |
|----------|---------------|-------------|
| `GET /api/wallet/balance/{id}` | `[WalletOwnerOrAdmin]` | Owner or admin can access |
| `GET /api/wallet/balance/customer/{customerId}` | `[ResourceOwnerOrAdmin]` | Customer or admin can access |
| `GET /api/wallet/get/{id}` | `[WalletOwnerOrAdmin]` | Owner or admin can access |
| `GET /api/wallet/stats/{id}` | `[ResourceOwnerOrAdmin]` | Customer or admin can access |
| `GET /api/wallet/customer/{customerId}` | `[ResourceOwnerOrAdmin]` | Customer or admin can access |
| `GET /api/wallet/initial-balance/{id}` | `[WalletOwnerOrAdmin]` | Owner or admin can access |
| `GET /api/wallet/last-five-transactions/{walletId}` | `[WalletOwnerOrAdmin]` | Owner or admin can access |
| `GET /api/wallet/transactions/{id}` | `[WalletOwnerOrAdmin]` | Owner or admin can access |

## Testing Your Request

### Option 1: Use Customer ID (Easiest)
```http
GET /api/wallet/balance/customer/{your-user-id}
Authorization: Bearer {your-jwt-token}
```

### Option 2: Use Wallet ID (Advanced)
```http
GET /api/wallet/balance/124
Authorization: Bearer {your-jwt-token}
```

This now works because the `WalletOwnerOrAdmin` attribute:
1. Gets wallet ID 124 from the URL
2. Looks up wallet 124 in the database
3. Checks if wallet 124 belongs to your user ID
4. Allows access if you own the wallet or are an admin

## Key Changes Made

1. **AuthorizationAttributes.cs**: Added `WalletOwnerOrAdminAttribute` class
2. **WalletController.cs**: 
   - Added new `/balance/customer/{customerId}` endpoint
   - Applied proper authorization attributes to all endpoints
   - Enhanced security for wallet-specific operations

## JWT Token Requirements

Your JWT token must contain:
- **NameIdentifier claim**: Your user ID
- **Role claim**: Your role (Customer, Admin, etc.)

The authorization will work if:
- You're accessing your own wallet resources, OR
- You have the "Admin" role
