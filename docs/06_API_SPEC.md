# 06_API_SPEC.md

# API Specification (API Contract)

## Tujuan

Dokumen ini berfungsi sebagai **API Contract** antara Frontend (React)
dan Backend (Express.js). Dokumen ini menjadi acuan selama proses vibe
coding sehingga struktur endpoint tetap konsisten.

> Catatan: - Dokumen ini **bukan** dokumentasi Swagger/OpenAPI. - Detail
> implementasi (JWT, middleware, validasi, dsb.) akan ditentukan saat
> pengembangan backend.

------------------------------------------------------------------------

# Base URL

``` text
/api/v1
```

------------------------------------------------------------------------

# Response Format

## Success

``` json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

## Error

``` json
{
  "success": false,
  "message": "Error message"
}
```

------------------------------------------------------------------------

# Authentication

## Register

**POST** `/auth/register`

Request

``` json
{
  "full_name": "string",
  "email": "string",
  "password": "string"
}
```

Response

``` json
{
  "success": true,
  "message": "Account created."
}
```

------------------------------------------------------------------------

## Login

**POST** `/auth/login`

Request

``` json
{
  "email": "string",
  "password": "string"
}
```

------------------------------------------------------------------------

## Logout

**POST** `/auth/logout`

------------------------------------------------------------------------

# Relationship

  Method   Endpoint                Description
  -------- ----------------------- -------------------------------
  POST     /relationships/invite   Mengirim undangan pasangan
  POST     /relationships/accept   Menerima undangan
  GET      /relationships/me       Mendapatkan data relationship

------------------------------------------------------------------------

# Memories

  Method   Endpoint
  -------- ---------------
  GET      /memories
  GET      /memories/:id
  POST     /memories
  PUT      /memories/:id
  DELETE   /memories/:id

------------------------------------------------------------------------

# Memory Media

  Method   Endpoint
  -------- ---------------------
  POST     /memories/:id/media
  DELETE   /media/:id

------------------------------------------------------------------------

# Daily Questions

  Method   Endpoint
  -------- -----------------------
  GET      /questions/today
  POST     /questions/:id/answer
  GET      /questions/history

------------------------------------------------------------------------

# Dreams

  Method   Endpoint
  -------- -------------
  GET      /dreams
  POST     /dreams
  PUT      /dreams/:id
  DELETE   /dreams/:id

------------------------------------------------------------------------

# Important Days

  Method   Endpoint
  -------- ---------------------
  GET      /important-days
  POST     /important-days
  PUT      /important-days/:id
  DELETE   /important-days/:id

------------------------------------------------------------------------

# Time Capsules

  Method   Endpoint
  -------- --------------------
  GET      /time-capsules
  POST     /time-capsules
  GET      /time-capsules/:id
  DELETE   /time-capsules/:id

------------------------------------------------------------------------

# Open Whens

  Method   Endpoint
  -------- -----------------
  GET      /open-whens
  POST     /open-whens
  PUT      /open-whens/:id
  DELETE   /open-whens/:id

------------------------------------------------------------------------

# Notifications

  Method   Endpoint
  -------- -------------------------
  GET      /notifications
  PUT      /notifications/:id/read

------------------------------------------------------------------------

# HTTP Status

  Code   Meaning
  ------ -----------------------
  200    OK
  201    Created
  400    Bad Request
  401    Unauthorized
  403    Forbidden
  404    Not Found
  500    Internal Server Error

------------------------------------------------------------------------

# Catatan Pengembangan

-   Gunakan REST API.
-   Semua response mengikuti format yang telah ditentukan.
-   Endpoint dapat berkembang selama implementasi, tetapi perubahan
    harus dicatat pada `08_CHANGELOG.md`.
-   Dokumen ini menjadi referensi utama saat membuat controller,
    service, dan frontend request.
