# ARCH-01 System Architecture

> **Document ID:** ARCH-01
> **Document Type:** System Architecture
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan arsitektur sistem secara menyeluruh untuk aplikasi **OurSky**.

Dokumen ini menjadi acuan utama dalam memahami bagaimana seluruh komponen sistem saling berinteraksi, mulai dari antarmuka pengguna hingga penyimpanan data dan layanan pendukung.

Seluruh keputusan teknis pada frontend, backend, database, API, keamanan, dan deployment harus mengacu pada arsitektur yang dijelaskan dalam dokumen ini.

---

# Architecture Goals

Arsitektur OurSky dirancang untuk memenuhi tujuan berikut:

* Mudah dikembangkan.
* Mudah dipelihara.
* Memiliki struktur yang jelas.
* Mendukung penambahan fitur baru.
* Meminimalkan ketergantungan antar modul.
* Menjaga konsistensi data.
* Memberikan performa yang baik.
* Mendukung keamanan data pengguna.

---

# Architecture Principles

## Separation of Concerns

Setiap lapisan sistem memiliki tanggung jawab yang jelas.

Frontend bertanggung jawab pada presentasi.

Backend bertanggung jawab pada logika bisnis.

Database bertanggung jawab pada penyimpanan data.

---

## Modular Design

Setiap fitur dikembangkan sebagai modul yang terpisah namun saling terintegrasi.

Contoh:

* Relationship
* Question
* Memory
* Dream Board
* Time Capsule
* Open When
* Notification
* Constellation

Perubahan pada satu modul harus seminimal mungkin memengaruhi modul lain.

---

## Single Source of Truth

Setiap jenis data hanya memiliki satu sumber utama.

Contoh:

* Data Relationship berasal dari modul Relationship.
* Data Memory berasal dari modul Memory.
* Relationship Event menjadi sumber utama Timeline dan Constellation.
* Countdown berasal dari Important Days.

Prinsip ini mengurangi duplikasi data dan menjaga konsistensi sistem.

---

## Layered Architecture

Sistem dibangun menggunakan pendekatan berlapis (Layered Architecture).

Setiap lapisan hanya berkomunikasi dengan lapisan yang berada tepat di bawahnya.

---

## Scalability

Arsitektur harus memungkinkan penambahan fitur tanpa perubahan besar pada sistem yang sudah berjalan.

---

# High Level Architecture

```text
+---------------------------+
|        User Device        |
| (Mobile / Web Browser)    |
+-------------+-------------+
              |
              v
+---------------------------+
|     React Frontend        |
|   User Interface Layer    |
+-------------+-------------+
              |
          REST API
              |
              v
+---------------------------+
|     Express Backend       |
|  Business Logic Layer     |
+-------------+-------------+
              |
    +---------+----------+
    |                    |
    v                    v
+-----------+      +----------------+
|   MySQL   |      | External Service|
| Database  |      | (AI, Storage)   |
+-----------+      +----------------+
```

---

# System Layers

## Presentation Layer

Presentation Layer bertanggung jawab menampilkan informasi kepada pengguna.

Tanggung jawab:

* Menampilkan UI.
* Mengelola navigasi.
* Mengirim permintaan ke API.
* Menampilkan hasil dari backend.
* Validasi dasar pada sisi klien.

Teknologi:

* React
* React Router
* Tailwind CSS

---

## Application Layer

Lapisan ini menangani logika aplikasi.

Tanggung jawab:

* Validasi data.
* Menjalankan aturan bisnis.
* Mengatur alur proses.
* Menghubungkan frontend dengan data.

Teknologi:

* Node.js
* Express.js

---

## Data Layer

Lapisan ini bertanggung jawab terhadap penyimpanan data.

Tanggung jawab:

* CRUD Data.
* Integritas data.
* Relasi antar tabel.
* Optimasi query.

Teknologi:

* MySQL

---

## External Services

Layanan eksternal digunakan apabila dibutuhkan.

Contoh:

* AI Service
* File Storage
* Email Service
* Push Notification

Seluruh layanan eksternal diakses melalui backend, bukan langsung dari frontend.

---

# Core Modules

OurSky terdiri dari beberapa modul utama:

* Authentication
* User
* Relationship
* Dashboard
* Question
* Memory
* Random Date
* Important Days
* Countdown
* Time Capsule
* Dream Board
* Open When
* Notification
* Constellation
* Relationship Event

Masing-masing modul memiliki tanggung jawab dan logika bisnis yang terpisah.

---

# Data Flow

Secara umum, alur data dalam sistem adalah sebagai berikut:

```text
User Action
      │
      ▼
Frontend
      │
REST API Request
      │
      ▼
Backend Controller
      │
      ▼
Business Service
      │
      ▼
Repository
      │
      ▼
Database
      │
      ▼
Business Service
      │
      ▼
Controller
      │
      ▼
Frontend
      │
      ▼
User Interface Update
```

Semua perubahan data mengikuti alur ini untuk menjaga konsistensi dan validasi.

---

# Relationship Event Architecture

Relationship Event merupakan pusat integrasi aktivitas pada OurSky.

Setiap fitur yang menghasilkan aktivitas penting akan membuat Relationship Event.

Relationship Event kemudian digunakan oleh:

* Timeline
* Constellation
* Dashboard
* Notification
* Statistics

Modul lain tidak membuat Timeline secara langsung.

---

# Communication Pattern

Komunikasi antar lapisan menggunakan pola berikut:

* Frontend ↔ Backend : REST API (JSON)
* Backend ↔ Database : Repository Pattern
* Backend ↔ External Service : Service Integration

Setiap komunikasi dilakukan melalui antarmuka yang jelas untuk mengurangi ketergantungan langsung.

---

# Error Handling Strategy

Setiap kesalahan harus ditangani pada lapisan yang sesuai.

Prinsip:

* Frontend menampilkan pesan yang ramah kepada pengguna.
* Backend mengelola logika penanganan kesalahan.
* Database menjaga integritas data.
* Error tidak membocorkan informasi sensitif.

---

# Security Principles

Arsitektur sistem mengikuti prinsip keamanan berikut:

* Authentication untuk setiap pengguna.
* Authorization pada setiap akses data.
* Validasi input pada frontend dan backend.
* Enkripsi data sensitif.
* Penggunaan HTTPS.
* Pengelolaan sesi yang aman.

Detail implementasi dijelaskan pada dokumen arsitektur keamanan.

---

# Performance Principles

Sistem dirancang agar:

* Meminimalkan jumlah request yang tidak diperlukan.
* Mengoptimalkan query database.
* Mendukung pagination pada data besar.
* Memanfaatkan caching apabila diperlukan di masa depan.

---

# Scalability Strategy

Arsitektur mendukung pengembangan di masa depan, seperti:

* Penambahan modul baru.
* Integrasi layanan pihak ketiga.
* Migrasi ke arsitektur microservices jika diperlukan.
* Dukungan aplikasi mobile native.

---

# Logging and Monitoring

Seluruh aktivitas penting sistem dapat dicatat untuk:

* Audit.
* Debugging.
* Monitoring performa.
* Analisis kesalahan.

Strategi logging dijelaskan lebih rinci pada dokumen Monitoring & Logging.

---

# Architecture Decisions

Keputusan utama pada versi awal:

* Menggunakan Layered Architecture.
* Menggunakan REST API.
* Menggunakan React sebagai Frontend.
* Menggunakan Express.js sebagai Backend.
* Menggunakan MySQL sebagai Database.
* Menggunakan Relationship Event sebagai pusat integrasi aktivitas.
* Menggunakan pendekatan Modular Design.

---

# Relationship with Other Documents

Dokumen ini menjadi dasar bagi:

* ARCH-02 Frontend Architecture
* ARCH-03 Backend Architecture
* ARCH-04 Database Architecture
* ARCH-05 Authentication & Authorization
* ARCH-06 Storage Architecture
* ARCH-07 Notification Architecture
* ARCH-08 AI Architecture
* ARCH-09 Security Architecture
* ARCH-10 Deployment Architecture
* ARCH-11 Monitoring & Logging
* ARCH-12 Decision Record

---

# References

* Layered Architecture Pattern
* Domain-Driven Design (DDD) Concepts
* REST Architectural Style
* SOLID Principles
* Clean Architecture (Conceptual Reference)
