# ARCH-02 Frontend Architecture

> **Document ID:** ARCH-02
> **Document Type:** Frontend Architecture
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan arsitektur frontend aplikasi **OurSky**.

Tujuan utamanya adalah menciptakan struktur frontend yang mudah dipahami, mudah dikembangkan, mudah diuji, serta mampu mendukung pertumbuhan fitur tanpa menyebabkan kompleksitas yang berlebihan.

---

# Frontend Goals

Frontend OurSky dirancang agar:

* Modular
* Reusable
* Responsive
* Maintainable
* Scalable
* Accessible
* Consistent

---

# Technology Stack

Frontend menggunakan teknologi berikut:

* React
* React Router
* Tailwind CSS
* Axios
* Context API
* React Hook Form
* Yup / Zod (Validation)
* Vite

Pemilihan teknologi dapat berubah apabila terdapat kebutuhan baru.

---

# Frontend Principles

## Component-Based

Seluruh UI dibangun menggunakan komponen yang dapat digunakan kembali.

Contoh:

* Button
* Card
* Dialog
* Avatar
* Badge
* Timeline

Komponen tidak dibuat khusus untuk satu halaman apabila masih dapat digunakan ulang.

---

## Feature-Based Organization

Seluruh halaman dan logika dikelompokkan berdasarkan fitur, bukan berdasarkan jenis file.

Contoh:

* Memory
* Question
* Dream Board
* Relationship

Pendekatan ini membuat setiap fitur lebih mudah dikembangkan secara mandiri.

---

## Separation of Concerns

Pisahkan dengan jelas antara:

* UI
* Business Logic
* API Communication
* State Management
* Utilities

---

## Single Responsibility

Setiap file hanya memiliki satu tanggung jawab utama.

Sebagai contoh:

* Component hanya menangani tampilan.
* Service hanya menangani komunikasi API.
* Hook hanya menangani logika yang dapat digunakan kembali.

---

# Frontend Layers

Frontend terdiri dari beberapa lapisan.

```text
Pages
    │
    ▼
Components
    │
    ▼
Hooks
    │
    ▼
Services
    │
    ▼
API Client
```

Setiap lapisan memiliki tanggung jawab yang berbeda.

---

# Recommended Folder Structure

```text
frontend/
└── src/
    ├── assets/
    ├── components/
    ├── features/
    ├── hooks/
    ├── layouts/
    ├── pages/
    ├── routes/
    ├── services/
    ├── contexts/
    ├── utils/
    ├── constants/
    ├── types/
    ├── styles/
    ├── config/
    └── main.jsx
```

---

# Feature Structure

Setiap fitur memiliki struktur yang seragam.

```text
features/
└── memory/
    ├── components/
    ├── hooks/
    ├── services/
    ├── pages/
    ├── utils/
    ├── types/
    └── index.js
```

Pola yang sama diterapkan pada seluruh fitur.

---

# Routing Architecture

Routing menggunakan React Router.

Kategori halaman:

* Public Route
* Protected Route
* Error Route

Navigasi dikelola secara terpusat.

---

# Layout Architecture

Layout dipisahkan dari halaman.

Contoh:

* Authentication Layout
* Main Layout
* Empty Layout

Halaman hanya berisi konten utama.

---

# State Management

State dibagi menjadi beberapa kategori.

## Local State

Digunakan untuk data yang hanya digunakan oleh satu komponen.

---

## Feature State

Digunakan oleh satu fitur tertentu.

---

## Global State

Digunakan untuk data yang dibutuhkan oleh banyak halaman.

Contoh:

* User
* Relationship
* Theme
* Authentication

---

# API Communication

Seluruh komunikasi API dilakukan melalui Service Layer.

Komponen tidak diperbolehkan melakukan HTTP Request secara langsung.

Alur komunikasi:

```text
Component
    │
    ▼
Hook
    │
    ▼
Service
    │
    ▼
Axios Client
    │
    ▼
Backend API
```

---

# Form Management

Seluruh form menggunakan pola yang konsisten.

Komponen:

* Form
* Validation
* Submit Handler

Validasi dilakukan di frontend dan backend.

---

# Error Handling

Error dibagi menjadi beberapa kategori.

* Validation Error
* Network Error
* Authentication Error
* Server Error

Pesan yang ditampilkan kepada pengguna harus mudah dipahami.

---

# Loading Strategy

Loading mengikuti urutan berikut:

* Skeleton
* Progress Indicator
* Spinner

Hindari halaman kosong selama proses pemuatan data.

---

# Authentication Flow

Frontend bertanggung jawab untuk:

* Menyimpan status login.
* Mengelola sesi pengguna.
* Melindungi halaman yang memerlukan autentikasi.
* Mengarahkan pengguna ke halaman yang sesuai.

Detail implementasi dijelaskan pada dokumen Authentication Architecture.

---

# Responsive Strategy

Seluruh halaman harus mengikuti prinsip:

* Mobile First
* Flexible Layout
* Responsive Components

Mengacu pada UI-08 Responsive.

---

# Accessibility

Frontend harus mendukung:

* Keyboard Navigation
* Screen Reader
* Focus Indicator
* Touch Target
* Color Contrast

Mengacu pada UI-09 Accessibility.

---

# Performance Strategy

Frontend dirancang agar:

* Lazy Load halaman jika diperlukan.
* Mengurangi re-render yang tidak perlu.
* Mengoptimalkan gambar.
* Memanfaatkan code splitting.

---

# Coding Standards

Seluruh kode frontend harus mengikuti standar berikut:

* Nama file konsisten.
* Penamaan komponen menggunakan PascalCase.
* Hook menggunakan awalan `use`.
* Tidak ada logika bisnis kompleks di dalam komponen UI.
* Hindari duplikasi kode.

---

# Testing Strategy

Frontend sebaiknya mendukung:

* Unit Test
* Component Test
* Integration Test

Pengujian dilakukan secara bertahap sesuai kebutuhan proyek.

---

# Future Enhancements

Arsitektur frontend dapat dikembangkan untuk mendukung:

* Progressive Web App (PWA)
* Offline Mode
* Internationalization (i18n)
* Theme Customization
* Real-Time Updates

---

# Relationship with Other Documents

Dokumen ini berkaitan dengan:

* ARCH-01 System Architecture
* ARCH-03 Backend Architecture
* UI-05 Components
* UI-08 Responsive
* UI-09 Accessibility
* UI-10 Design Tokens

---

# References

* React Documentation
* React Router Documentation
* Vite Documentation
* Tailwind CSS Documentation
* Axios Documentation
