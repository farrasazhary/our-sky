# ARCH-09 Security Architecture

> **Document ID:** ARCH-09
> **Document Type:** Security Architecture
> **Status:** Final
> **Version:** 2.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan arsitektur keamanan aplikasi **OurSky**.

Tujuan utama Security Architecture adalah melindungi aplikasi, data pengguna, serta infrastruktur dari akses tidak sah, kebocoran data, dan ancaman keamanan yang umum terjadi pada aplikasi web modern.

Dokumen ini menjadi pedoman penerapan prinsip keamanan pada seluruh lapisan sistem.

---

# Security Objectives

Arsitektur keamanan dirancang untuk memenuhi tujuan berikut:

* Confidentiality
* Integrity
* Availability
* Accountability
* Traceability

---

# Security Principles

OurSky menerapkan prinsip:

* Defense in Depth
* Least Privilege
* Secure by Default
* Fail Secure
* Input Validation
* Output Encoding

Keamanan diterapkan pada seluruh lapisan aplikasi, bukan hanya pada proses login.

---

# Security Layers

```text
Client
   │
   ▼
HTTPS
   │
   ▼
Authentication
   │
   ▼
Authorization
   │
   ▼
Validation
   │
   ▼
Business Logic
   │
   ▼
Database
```

Setiap lapisan memiliki mekanisme perlindungan masing-masing.

---

# Authentication Security

Autentikasi mengikuti prinsip berikut:

* Password disimpan menggunakan bcrypt.
* JWT digunakan untuk autentikasi.
* Token memiliki masa berlaku terbatas.
* Token divalidasi pada setiap request.

---

# Authorization Security

Backend wajib memastikan bahwa:

* Pengguna hanya mengakses data miliknya.
* Pengguna hanya mengakses Relationship yang valid.
* Tidak ada akses lintas Relationship.

Authorization selalu dilakukan di backend.

---

# Input Validation

Seluruh input pengguna harus divalidasi.

Contoh validasi:

* Required Field
* Data Type
* Email Format
* File Type
* Maximum Length
* Maximum File Size

Validasi dilakukan pada frontend dan backend.

---

# SQL Injection Protection

Seluruh query database harus menggunakan parameterized query atau ORM/Query Builder yang mendukung prepared statement.

Tidak diperbolehkan menyusun query SQL menggunakan penggabungan string dari input pengguna.

---

# Cross-Site Scripting (XSS)

Data yang ditampilkan kepada pengguna harus diperlakukan sebagai data tidak tepercaya.

Prinsip:

* Lakukan output encoding saat diperlukan.
* Hindari menyisipkan HTML mentah dari input pengguna tanpa proses sanitasi.
* Validasi dan batasi format konten yang diterima.

---

# Cross-Site Request Forgery (CSRF)

Apabila autentikasi menggunakan cookie pada pengembangan berikutnya, mekanisme perlindungan CSRF harus diterapkan.

Pada versi awal yang menggunakan JWT melalui Authorization Header, risiko CSRF berkurang namun tetap perlu dipertimbangkan apabila strategi autentikasi berubah.

---

# File Upload Security

Setiap file yang diunggah harus melalui:

* Validasi MIME Type.
* Validasi ekstensi file.
* Validasi ukuran file.
* Penamaan file acak.
* Penyimpanan di luar direktori publik bila memungkinkan.

Backend tidak boleh mengeksekusi file yang diunggah pengguna.

---

# API Security

Seluruh endpoint API mengikuti prinsip berikut:

* HTTPS.
* Authentication untuk endpoint yang dilindungi.
* Authorization pada setiap akses resource.
* Validasi input.
* Response yang konsisten.
* Tidak mengungkap detail internal sistem.

---

# Environment Security

Informasi sensitif tidak disimpan di dalam source code.

Contoh:

* JWT Secret
* Database Password
* API Key
* SMTP Credential

Seluruh nilai sensitif dikelola melalui Environment Variables.

---

# Password Security

Password mengikuti kebijakan berikut:

* Minimal 8 karakter.
* Mengandung kombinasi huruf dan angka.
* Disimpan dalam bentuk hash menggunakan bcrypt.
* Tidak pernah ditampilkan kembali kepada pengguna.

---

# Error Handling Security

Pesan kesalahan tidak boleh mengungkap:

* Query SQL.
* Struktur database.
* Stack trace.
* Konfigurasi server.
* Informasi sensitif lainnya.

Detail teknis dicatat pada sistem logging, bukan ditampilkan kepada pengguna.

---

# Rate Limiting

Endpoint tertentu sebaiknya menerapkan pembatasan jumlah permintaan.

Contoh:

* Login
* Register
* Invitation Validation

Tujuannya untuk mengurangi risiko brute-force dan penyalahgunaan layanan.

---

# Logging and Audit

Aktivitas penting yang perlu dicatat:

* Login.
* Logout.
* Relationship Created.
* Failed Authentication.
* Server Error.
* File Upload.

Log digunakan untuk kebutuhan audit dan investigasi apabila terjadi insiden.

---

# Data Protection

Data pengguna harus dilindungi melalui:

* Authentication.
* Authorization.
* Password Hashing.
* Secure Transmission.
* Backup Strategy.

---

# Incident Response

Apabila ditemukan insiden keamanan:

1. Identifikasi sumber masalah.
2. Batasi dampak insiden.
3. Pulihkan layanan.
4. Analisis akar penyebab.
5. Dokumentasikan hasil evaluasi.

---

# Future Enhancements

Arsitektur keamanan mendukung pengembangan untuk:

* Two-Factor Authentication (2FA)
* Refresh Token Rotation
* Device Management
* Session Revocation
* Intrusion Detection
* Web Application Firewall (WAF)
* Security Monitoring

---

# Relationship with Other Documents

Dokumen ini berkaitan dengan:

* ARCH-03 Backend Architecture
* ARCH-04 Database Architecture
* ARCH-05 Authentication & Authorization
* ARCH-06 Storage Architecture
* ARCH-11 Monitoring & Logging

---

# References

* OWASP Top 10
* OWASP ASVS
* OWASP Authentication Cheat Sheet
* OWASP File Upload Cheat Sheet
* OWASP SQL Injection Prevention Cheat Sheet
* OWASP Cross-Site Scripting Prevention Cheat Sheet
