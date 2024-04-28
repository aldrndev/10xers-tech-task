# Api Documentation

## Endpoints :

List of available endpoints:

- `POST /v1/auth/register`
- `POST /v1/auth/login`
- `POST /v1/product/add`
- `GET /v1/product/get`
- `GET /v1/product/get/:id`
- `PUT /v1/product/edit/:id`
- `DELETE /v1/product/delete/:id`

## 1. POST /v1/auth/register

Request :

- body

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "User {name} created successfully"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Phone Number is required"
}

```

## 2. POST /v1/auth/login

Request :

- body

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - Ok)_

```json
{
  "message": "Welcome back aldrin",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGRyaW5AZ21haWwuY29tIiwibmFtZSI6ImFsZHJpbiIsInJvbGUiOiJhZG1pbiIsInBob25lTnVtYmVyIjoiMTIzNDU2NyIsImlhdCI6MTcxNDI3OTAyOCwiZXhwIjoxNzE0MzY1NDI4fQ.UmyrbMNFHVX_w9JPz4qpUmiUjrRgjuFE0xfJQn3yGWg",
  "user": {
    "id": 1,
    "email": "aldrin@gmail.com",
    "name": "aldrin",
    "role": "admin",
    "phoneNumber": "1234567"
  }
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Invalid Email/Password"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please provide email and password"
}
```

## 3. POST /v1/product/add

Request :

- headers

```json
{
  "access_token": "string"
}
```

- body

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "brand": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Success create product Samsung S23 Ultra",
  "data": {
    "id": 8,
    "name": "Samsung S23 Ultra",
    "description": "New Samsung S23 Ultra",
    "price": 500,
    "stock": 2,
    "brand": "Samsung",
    "UserId": 1,
    "updatedAt": "2024-04-28T04:38:15.546Z",
    "createdAt": "2024-04-28T04:38:15.546Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Stock is required"
}
OR
{
  "message": "Brand is required"
}

```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first to your account"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Only admin allowed to this action"
}
```

## 4. GET /v1/product/get

Request :

- headers

```json
{
  "access_token": "string"
}
```

- params
```json
{
  "filter": "string",
  "search": "string",
  "sort": "string"
}
```

_Response (200 - Ok)_

```json
{
  "message": "Success get product data",
  "data": [
    {
      "id": 3,
      "name": "iPhone 15 Pro",
      "description": "New Iphone 15 Pro",
      "price": 1500,
      "stock": 2,
      "brand": "Apple",
      "UserId": 1,
      "createdAt": "2024-04-27T15:13:07.317Z",
      "updatedAt": "2024-04-27T15:13:07.317Z",
      "User": {
        "id": 1,
        "name": "aldrin",
        "email": "aldrin@gmail.com",
        "role": "admin",
        "phoneNumber": "1234567"
      }
    },
    {
      "id": 5,
      "name": "Samsung S23 Ultra",
      "description": "New Samsung S23 Ultra",
      "price": 500,
      "stock": 2,
      "brand": "Samsung",
      "UserId": 1,
      "createdAt": "2024-04-27T15:13:47.904Z",
      "updatedAt": "2024-04-27T15:13:47.904Z",
      "User": {
        "id": 1,
        "name": "aldrin",
        "email": "aldrin@gmail.com",
        "role": "admin",
        "phoneNumber": "1234567"
      }
    }
  ]
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first to your account"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Only admin allowed to this action"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "No product found"
}
```

## 5. GET /v1/product/get/:id

Request :

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

_Response (200 - Ok)_

```json
{
  "message": "Success get product detail",
  "data": {
    "id": 3,
    "name": "iPhone 15 Pro",
    "description": "New Iphone 15 Pro",
    "price": 1500,
    "stock": 2,
    "brand": "Apple",
    "UserId": 1,
    "createdAt": "2024-04-27T15:13:07.317Z",
    "updatedAt": "2024-04-27T15:13:07.317Z",
    "User": {
      "id": 1,
      "name": "aldrin",
      "email": "aldrin@gmail.com",
      "role": "admin",
      "phoneNumber": "1234567"
    }
  }
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first to your account"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "No product found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Only admin allowed to this action"
}
```

## 6. PUT /v1/product/edit/:id

Request :

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

- body

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "brand": "string"
}
```

_Response (200 - Ok)_

```json
{
  "message": "Success edit product",
  "data": {
    "id": 2,
    "name": "Samsung S23 Ultra",
    "description": "New Samsung S23 Ultra",
    "price": 500,
    "stock": 2,
    "brand": "Samsung",
    "UserId": 1,
    "createdAt": "2024-04-27T15:12:59.316Z",
    "updatedAt": "2024-04-28T04:33:58.941Z"
  }
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first to your account"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "No product found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Only admin allowed to this action"
}
```

## 7. DELETE /v1/product/delete/:id

Request :

- headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

_Response (200 - Ok)_

```json
{
  "message": "Success delete product"
}
```

_Response (401 - Not Authorized)_

```json
{
  "message": "Please login first to your account"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "No product found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Only admin allowed to this action"
}
```
