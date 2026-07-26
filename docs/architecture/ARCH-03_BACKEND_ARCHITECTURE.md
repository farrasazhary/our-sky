# ARCH-03 Backend Architecture

> **Document ID:** ARCH-03
> **Document Type:** Backend Architecture
> **Status:** Final
> **Version:** 2.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan arsitektur backend aplikasi **OurSky**.

Backend bertindak sebagai pusat pemrosesan seluruh business logic, pengelolaan data, autentikasi, validasi, integrasi layanan eksternal, serta komunikasi dengan database.

Arsitektur ini dirancang menggunakan pendekatan **Feature-Based Modular Architecture** yang dikombinasikan dengan **Layered Architecture**, **Service Layer Pattern**, dan **Repository Pattern** sehingga setiap fitur dapat dikembangkan secara independen namun tetap konsisten.

---

# Architecture Goals

Backend dirancang untuk memenuhi tujuan berikut.

* Modular
* Maintainable
* Scalable
* Secure
* Testable
* Reusable
* Consistent
* Easy to Extend

---

# Technology Stack

Backend menggunakan teknologi berikut.

| Layer            | Technology |
| ---------------- | ---------- |
| Runtime          | Node.js    |
| Framework        | Express.js |
| Database         | MySQL      |
| Authentication   | JWT        |
| Password Hashing | bcrypt     |
| Validation       | Zod / Yup  |
| File Upload      | Multer     |
| Environment      | dotenv     |
| Scheduler        | node-cron  |
| HTTP Security    | Helmet     |
| CORS             | cors       |

---

# Architecture Pattern

Backend menggunakan kombinasi beberapa pola arsitektur.

* Feature-Based Modular Architecture
* Layered Architecture
* Repository Pattern
* Service Layer Pattern
* RESTful API

Pendekatan ini memastikan setiap lapisan memiliki tanggung jawab yang jelas serta meminimalkan ketergantungan antar modul.

---

# Request Lifecycle

Seluruh request mengikuti alur berikut.

```text
HTTP Request
      │
      ▼
Route
      │
      ▼
Middleware
      │
      ▼
Controller
      │
      ▼
Validator
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
Database
      │
      ▼
Repository
      │
      ▼
Service
      │
      ▼
Controller
      │
      ▼
HTTP Response
```

Tidak diperbolehkan melewati lapisan yang telah ditentukan.

---

# Layer Responsibilities

## Route

Bertanggung jawab untuk:

* Mendefinisikan endpoint.
* Menghubungkan endpoint dengan Controller.
* Menentukan middleware.
* Mengelompokkan endpoint berdasarkan fitur.

Route tidak boleh berisi business logic.

---

## Middleware

Middleware bertanggung jawab terhadap proses yang dijalankan sebelum Controller.

Contoh:

* Authentication
* Authorization
* Rate Limiting
* Request Logging
* File Upload
* Input Sanitization

---

## Controller

Controller bertanggung jawab untuk:

* Menerima Request.
* Memanggil Service.
* Mengembalikan Response.
* Menentukan HTTP Status Code.

Controller tidak boleh mengandung business logic maupun query database.

---

## Validator

Validator memastikan data yang diterima telah memenuhi format yang diharapkan.

Contoh:

* Required Field
* Email Format
* Date Format
* Password Rules

Validator tidak menjalankan aturan bisnis.

---

## Service

Service merupakan pusat seluruh business logic.

Contoh:

* Membuat Relationship.
* Menentukan Countdown.
* Membuka Time Capsule.
* Membuat Relationship Event.
* Mengirim Notification.

Service dapat menggunakan lebih dari satu Repository apabila diperlukan.

---

## Repository

Repository menjadi satu-satunya lapisan yang berkomunikasi dengan database.

Repository bertanggung jawab terhadap:

* SELECT
* INSERT
* UPDATE
* DELETE

Repository tidak memiliki business logic.

---

## Database

Database hanya bertanggung jawab menyimpan data.

Seluruh komunikasi dilakukan melalui Repository.

---

# Feature-Based Modular Architecture

Backend menggunakan pendekatan **feature-first**.

Setiap fitur memiliki seluruh file yang dibutuhkan di dalam satu folder.

```text
backend/
└── src/
    ├── app.js
    ├── server.js
    │
    ├── config/
    ├── middleware/
    ├── database/
    ├── scheduler/
    ├── integrations/
    │
    ├── shared/
    │   ├── constants/
    │   ├── errors/
    │   ├── responses/
    │   ├── utils/
    │   └── validators/
    │
    ├── routes/
    │   └── index.js
    │
    └── features/
        ├── auth/
        ├── user/
        ├── relationship/
        ├── dashboard/
        ├── question/
        ├── memory/
        ├── random-date/
        ├── important-days/
        ├── countdown/
        ├── constellation/
        ├── time-capsule/
        ├── dream-board/
        ├── open-when/
        ├── notification/
        ├── relationship-event/
        └── ai/
```

---

# Standard Feature Structure

Seluruh fitur wajib menggunakan struktur berikut.

```text
features/
└── memory/
    ├── memory.route.js
    ├── memory.controller.js
    ├── memory.validator.js
    ├── memory.service.js
    ├── memory.repository.js
    ├── memory.model.js
    ├── memory.mapper.js
    ├── memory.constant.js
    ├── memory.event.js
    ├── memory.types.js
    ├── README.md
    └── index.js
```

Struktur ini berlaku untuk seluruh fitur sehingga memudahkan navigasi dan pemeliharaan kode.

---

# Shared Layer

Folder `shared` digunakan untuk komponen yang dipakai oleh lebih dari satu fitur.

Contoh:

* Logger
* Error Handler
* Response Builder
* Date Helper
* Validation Helper
* Constants
* Utility Functions

Shared Layer tidak boleh berisi business logic milik fitur tertentu.

---

# Feature Isolation

Setiap fitur merupakan modul yang berdiri sendiri.

Aturan:

* Setiap fitur memiliki Route sendiri.
* Setiap fitur memiliki Controller sendiri.
* Setiap fitur memiliki Validator sendiri.
* Setiap fitur memiliki Repository sendiri.
* Setiap fitur memiliki Service sendiri.

Komunikasi antar fitur dilakukan melalui Service.

Repository tidak boleh dipanggil oleh Repository lain.

---

# Module Communication

Komunikasi antar fitur dilakukan melalui Service.

Contoh:

```text
Question Service
        │
        ▼
Relationship Event Service
        │
        ▼
Notification Service
```

Dengan pendekatan ini, setiap modul tetap independen namun tetap dapat berkolaborasi.

---

# Dependency Rules

Dependency hanya boleh mengalir ke bawah.

```text
Route
   │
Middleware
   │
Controller
   │
Validator
   │
Service
   │
Repository
   │
Database
```

Aturan yang wajib dipatuhi:

* Route tidak boleh memanggil Repository.
* Middleware tidak boleh mengakses Database.
* Controller tidak boleh membuat query SQL.
* Validator tidak boleh menjalankan business logic.
* Repository tidak boleh memanggil Service.
* Model tidak boleh memiliki business logic.

---

# Validation Strategy

Validasi dilakukan dalam dua tahap.

### Request Validation

Memastikan format data benar.

Contoh:

* Required Field
* Data Type
* Format Email
* Panjang Password

### Business Validation

Memastikan aturan bisnis terpenuhi.

Contoh:

* Relationship masih aktif.
* Invitation belum kedaluwarsa.
* Time Capsule belum dapat dibuka.
* User merupakan bagian dari Relationship.

Business Validation dilakukan pada Service.

---

# Response Standard

Seluruh endpoint menggunakan format respons yang konsisten.

### Success

```json
{
  "success": true,
  "message": "Memory created successfully.",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": []
}
```

---

# Relationship Event Integration

Relationship Event merupakan pusat aktivitas aplikasi.

Fitur berikut menghasilkan Relationship Event.

* Question
* Memory
* Random Date
* Important Days
* Dream Board
* Time Capsule
* Open When

Service dari masing-masing fitur bertanggung jawab membuat Relationship Event setelah proses bisnis berhasil diselesaikan.

---

# Scheduler

Scheduler digunakan untuk proses otomatis.

Contoh:

* Countdown Update
* Notification Queue
* Time Capsule Activation
* Daily Reminder

Scheduler berjalan di luar siklus request pengguna.

---

# External Integrations

Seluruh integrasi layanan eksternal dilakukan melalui backend.

Contoh:

* AI Service
* Email Service
* Push Notification
* Cloud Storage

Frontend tidak diperbolehkan mengakses layanan tersebut secara langsung.

---

# Security Principles

Backend menerapkan prinsip berikut.

* JWT Authentication
* Password Hashing
* Input Validation
* Authorization
* Environment Variables
* Rate Limiting
* Secure HTTP Headers
* CORS Policy

Implementasi rinci dijelaskan pada ARCH-05 dan ARCH-09.

---

# Logging Strategy

Aktivitas berikut wajib dicatat.

* Login
* Logout
* Relationship Created
* Relationship Ended
* Memory Created
* Time Capsule Opened
* Failed Authentication
* Server Error

Strategi implementasi dijelaskan pada ARCH-11 Monitoring & Logging.

---

# Coding Standards

Seluruh backend mengikuti standar berikut.

* Gunakan Feature-Based Architecture.
* Hindari Business Logic di Controller.
* Hindari Query Database di Service.
* Gunakan Repository sebagai satu-satunya akses database.
* Gunakan penamaan file yang konsisten.
* Hindari duplikasi kode.
* Gunakan fungsi dengan nama yang deskriptif.

---

# Future Enhancements

Arsitektur ini dirancang agar mudah dikembangkan untuk mendukung:

* Redis Cache
* Queue Processing
* WebSocket
* Event Bus
* Background Worker
* Microservices
* Horizontal Scaling

Tanpa mengubah struktur utama aplikasi.

---

# Relationship with Other Documents

Dokumen ini berkaitan dengan:

* ARCH-01 System Architecture
* ARCH-02 Frontend Architecture
* ARCH-04 Database Architecture
* ARCH-05 Authentication & Authorization
* ARCH-06 Storage Architecture
* ARCH-07 Notification Architecture
* ARCH-08 AI Architecture
* ARCH-09 Security Architecture
* ARCH-11 Monitoring & Logging

---

# References

* Node.js Documentation
* Express.js Documentation
* Repository Pattern
* Layered Architecture
* REST API Best Practices
* Feature-Based Architecture
