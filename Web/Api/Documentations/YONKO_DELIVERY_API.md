# Yonko Delivery API Documentation

This document describes the Yonko Delivery endpoints exposed via `YonkoController`.

Base URL: `/api/yonko`

## Authentication & Authorization

Currently no role attributes are defined on the controller. Apply auth/role policies as needed. All examples assume a bearer token is supplied if global auth is enforced.

---

## 1. Calculate Delivery Fee

GET `/api/yonko/delivery-fee`

Query Parameters:

- `Origin` (string) – required
- `Destination` (string) – required

Description: Uses Google Maps distance matrix to compute distance (in meters), converts to km, and applies internal pricing rule (`PRICE_PER_KILOMETER`) to return a delivery fee.

Response 200 Body Example:

```
{
  "DeliveryFee": 1200.50
}
```

Errors: `400 BadRequest` on invalid model or calculation issues.

---

## 2. Create Yonko Delivery

POST `/api/yonko`

Request Body (CreateYonkoDeliveryDTO):

```
{
  "PickUpAddress": "24 Ajao Rd, Lagos",
  "DeliveryAddress": "7 Marina Rd, Lagos",
  "PickupType": "Express",        // optional (defaults to Normal)
  "DeliveryFee": 1500,
  "Status": "Pending",            // optional (defaults to Pending if null)
  "CustomerFirstName:"Ngolo",
  "CustomerLastName":"Kante",
  "CustomerEmail":"kante@gmail.com",
  "PhoneNumber":"09124341324"
}
```

Response:

- `201 Created` with created resource.
- Location header points to `GET /api/yonko/{id}`.

Example Response:

```
{
  "Id": 5,
  "PickUpAddress": "24 Ajao Rd, Lagos",
  "DeliveryAddress": "7 Marina Rd, Lagos",
  "PickupType": "Express",
  "DeliveryFee": 1500,
  "Status": "Pending",
  "CustomerFirstName:"Ngolo",
  "CustomerLastName":"Kante",
  "CustomerEmail":"kante@gmail.com",
  "PhoneNumber":"09124341324"
  "RiderId": null,
  "Rider": null,
  "CreatedAt": "2025-08-28T12:34:56Z",
  "UpdatedAt": "2025-08-28T12:34:56Z"
}
```

---

## 3. Update Yonko Delivery

PUT `/api/yonko/{id}`

Request Body: Same shape as create. Only non-null / non-zero fields overwrite existing values. `createdAt` is preserved internally.

Responses:

- `200 OK` with updated resource
- `404 NotFound` if `id` not found

---

## 4. Get Paginated Yonko Deliveries

GET `/api/yonko`

Query Parameters:

- `pageNumber` (int, default 1)
- `pageSize` (int, default 10, max 20 enforced internally via `SearchPaging`)
- `searchString` (string, optional; filters by pickup address, delivery address, status, pickup type, customer first/last name)

Returns `PagedList<YonkoDeliveryDTO>` with pagination metadata also set as headers:

- `X-Total-Count`
- `X-Total-Pages`
- `X-Current-Page`
- `X-Page-Size`

Example Response Body:

```
[
  {
    "Id": 5,
  "PickUpAddress": "24 Ajao Rd, Lagos",
  "DeliveryAddress": "7 Marina Rd, Lagos",
  "PickupType": "Express",
  "DeliveryFee": 1500,
  "Status": "Pending",
  "CustomerFirstName:"Ngolo",
  "CustomerLastName":"Kante",
  "CustomerEmail":"kante@gmail.com",
  "PhoneNumber":"09124341324"
  "RiderId": null,
  "Rider": null,
  "CreatedAt": "2025-08-28T12:34:56Z",
  "UpdatedAt": "2025-08-28T12:34:56Z"
  }
]
```

---

## 5. Get Single Yonko Delivery

GET `/api/yonko/{id}`

Responses:

- `200 OK` with `YonkoDeliveryDTO`
- `404 NotFound` if not found

---

## 6. Delete Yonko Delivery

DELETE `/api/yonko/{id}`

Responses:

- `204 No Content` on success
- `404 NotFound` if not found

---

## Data Models

`YonkoDeliveryDTO`

```
{
  "Id": 0,
  "PickUpAddress": "string",
  "DeliveryAddress": "string",
  "PickupType": "string",
  "DeliveryFee": 0,
  "Status": "string",
  "CustomerFirstName:"string",
  "CustomerLastName":"string",
  "CustomerEmail":"string",
  "PhoneNumber":"string"
  "RiderId": 0,
  "Rider": { /* Rider object or null */ },
  "CreatedAt": "2025-08-28T00:00:00Z",
  "UpdatedAt": "2025-08-28T00:00:00Z"
}
```

`CreateYonkoDeliveryDTO` (input):

```
{
 "PickUpAddress": "24 Ajao Rd, Lagos",
  "DeliveryAddress": "7 Marina Rd, Lagos",
  "PickupType": "Express",        // optional (defaults to Normal)
  "DeliveryFee": 1500,
  "Status": "Pending",            // optional (defaults to Pending if null)
  "CustomerFirstName:"Ngolo",
  "CustomerLastName":"Kante",
  "CustomerEmail":"kante@gmail.com",
  "PhoneNumber":"09124341324"
}
```

Distance Query Object (for fee endpoint):

```
?Origin=no. 12 marina&Destination=no 16 hill top
```

---

## Error Handling

Standard responses:

- `400 BadRequest` for validation/model errors
- `404 NotFound` when resource missing
- `500 InternalServerError` (unhandled exceptions; consider adding global exception middleware for uniform formatting)


```

---

Document Version: 1.0 | Last Updated: 2025-08-28
