# ARCH-05 Authentication & Authorization

> **Document ID:** ARCH-05
> **Document Type:** Authentication & Authorization Architecture
> **Status:** Final
> **Version:** 2.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan arsitektur autentikasi (Authentication) dan otorisasi (Authorization) pada aplikasi **OurSky**.

Tujuannya adalah memastikan bahwa hanya pengguna yang sah dapat mengakses aplikasi serta setiap pengguna hanya dapat mengakses data yang menjadi haknya.

Dokumen ini menjadi pedoman implementasi login, manajemen sesi, kontrol akses, dan perlindungan data pengguna.

---

# Objectives

Arsitektur Authentication & Authorization dirancang untuk:

* Memastikan identitas pengguna.
* Melindungi data pribadi.
* Mencegah akses tidak sah.
* Mengelola sesi pengguna secara aman.
* Menjaga konsistensi hak akses di seluruh sistem.

---

# Authentication vs Authorization

## Authentication

Authentication menjawab pertanyaan:

> "Siapa pengguna ini?"

Authentication dilakukan melalui proses login menggunakan kredensial yang valid.

---

## Authorization

Authorization menjawab pertanyaan:

> "Apa yang boleh dilakukan oleh pengguna ini?"

Authorization dilakukan setelah proses Authentication berhasil.

---

# Authentication Flow

```text
User
   │
   ▼
Login Request
   │
   ▼
Validation
   │
   ▼
Credential Verification
   │
   ▼
Generate JWT
   │
   ▼
Return Access Token
```

Setelah token diterbitkan, pengguna dapat mengakses endpoint yang memerlukan autentikasi.

---

# Authentication Strategy

OurSky menggunakan **JWT (JSON Web Token)** sebagai mekanisme autentikasi.

JWT digunakan untuk:

* Mengidentifikasi pengguna.
* Memvalidasi sesi.
* Mengakses endpoint yang dilindungi.

JWT dikirim pada setiap request melalui header:

```text
Authorization: Bearer <token>
```

---

# Session Management

Backend bertanggung jawab untuk:

* Membuat sesi saat login.
* Memvalidasi token.
* Mengakhiri sesi saat logout.
* Menolak token yang tidak valid atau kedaluwarsa.

Implementasi refresh token dapat ditambahkan pada versi berikutnya apabila diperlukan.

---

# Authorization Strategy

OurSky menggunakan pendekatan **resource-based authorization**.

Hak akses ditentukan berdasarkan kepemilikan data, bukan berdasarkan peran (role).

Contoh:

* Pengguna hanya dapat mengakses data miliknya.
* Pasangan hanya dapat mengakses data dalam Relationship yang sama.
* Pengguna tidak dapat mengakses Relationship milik pengguna lain.

---

# Access Control Principles

Seluruh endpoint harus memverifikasi:

1. Identitas pengguna.
2. Kepemilikan Relationship.
3. Kepemilikan Resource.
4. Hak akses terhadap aksi yang diminta.

Tidak ada endpoint yang mengandalkan validasi dari frontend.

---

# Relationship-Based Access

Relationship menjadi batas utama kepemilikan data.

```text
User A
     │
Relationship
     │
User B
     │
     ├── Memory
     ├── Question
     ├── Dream Board
     ├── Time Capsule
     ├── Open When
     └── Relationship Event
```

Seluruh resource harus dikaitkan dengan satu Relationship yang valid.

---

# Protected Resources

Endpoint berikut wajib memerlukan autentikasi.

* Dashboard
* Relationship
* Memory
* Question
* Random Date
* Important Days
* Countdown
* Dream Board
* Time Capsule
* Open When
* Notification
* Constellation
* Relationship Event

---

# Public Resources

Endpoint berikut dapat diakses tanpa login.

* Register
* Login
* Health Check
* Invitation Validation
* Landing Page

---

# Middleware Responsibilities

Authentication Middleware bertugas:

* Membaca JWT.
* Memvalidasi token.
* Mengidentifikasi pengguna.
* Menambahkan informasi pengguna ke Request.

Authorization Middleware bertugas:

* Memastikan pengguna memiliki akses ke resource.
* Memastikan Relationship sesuai.
* Menolak akses yang tidak sah.

---

# Token Lifecycle

```text
Login
   │
Generate Token
   │
Client Stores Token
   │
Authenticated Requests
   │
Token Expired
   │
Login Again / Refresh Token
```

Pada versi awal, proses autentikasi menggunakan login ulang ketika token kedaluwarsa.

---

# Password Policy

Password harus memenuhi aturan berikut.

* Minimal 8 karakter.
* Memiliki huruf besar.
* Memiliki huruf kecil.
* Memiliki angka.
* Disimpan menggunakan hash bcrypt.

Password tidak pernah disimpan dalam bentuk plaintext.

---

# Security Principles

Authentication mengikuti prinsip berikut.

* HTTPS Only.
* JWT Validation.
* Password Hashing.
* Secure Environment Variables.
* Parameterized Query.
* Input Validation.
* Rate Limiting.

---

# Error Responses

Contoh respons ketika autentikasi gagal.

```json
{
  "success": false,
  "message": "Unauthorized."
}
```

Contoh respons ketika otorisasi gagal.

```json
{
  "success": false,
  "message": "Forbidden."
}
```

---

# Future Enhancements

Arsitektur ini mendukung pengembangan untuk:

* Refresh Token
* Multi Device Session
* Device Management
* Two-Factor Authentication (2FA)
* OAuth Login (Google, Apple)
* Session Revocation

---

# Relationship with Other Documents

Dokumen ini berkaitan dengan:

* ARCH-01 System Architecture
* ARCH-03 Backend Architecture
* ARCH-04 Database Architecture
* ARCH-09 Security Architecture

---

# References

* JSON Web Token (JWT)
* OAuth 2.0 Concepts
* OWASP Authentication Cheat Sheet
* OWASP Authorization Cheat Sheet
