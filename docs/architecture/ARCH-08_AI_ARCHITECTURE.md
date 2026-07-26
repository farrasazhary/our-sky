# ARCH-08 AI Architecture

> **Document ID:** ARCH-08
> **Document Type:** AI Architecture
> **Status:** Final
> **Version:** 2.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan arsitektur integrasi Artificial Intelligence (AI) pada aplikasi **OurSky**.

AI berperan sebagai layanan pendukung (Supporting Service) yang membantu meningkatkan pengalaman pengguna melalui analisis, rekomendasi, dan pembuatan konten.

AI bukan merupakan fitur yang berdiri sendiri, melainkan layanan lintas fitur yang dapat digunakan oleh berbagai modul aplikasi.

---

# Objectives

AI Architecture dirancang untuk:

* Mendukung berbagai fitur aplikasi.
* Mengurangi duplikasi implementasi AI.
* Memisahkan Business Logic dari AI Logic.
* Memudahkan pergantian AI Provider.
* Mendukung pengembangan fitur AI di masa depan.

---

# Architecture Principles

## AI as a Service

AI diposisikan sebagai layanan terpusat.

Seluruh fitur yang membutuhkan AI harus mengakses AI Service melalui backend.

Frontend tidak diperbolehkan berkomunikasi langsung dengan AI Provider.

---

## Provider Independence

Implementasi AI tidak bergantung pada satu penyedia layanan.

Contoh AI Provider:

* OpenAI
* Google Gemini
* Anthropic Claude
* Local LLM

Pergantian provider tidak boleh memengaruhi business logic aplikasi.

---

## Human-Centered AI

AI berfungsi membantu pengguna, bukan menggantikan keputusan pengguna.

Seluruh hasil AI bersifat rekomendasi dan tetap berada di bawah kendali pengguna.

---

# High-Level Architecture

```text
Feature
    │
    ▼
AI Service
    │
    ▼
AI Provider Adapter
    │
    ▼
External AI Provider
```

Seluruh komunikasi AI dilakukan melalui AI Service.

---

# AI Request Flow

```text
User Request
      │
      ▼
Feature Service
      │
      ▼
AI Service
      │
      ▼
Prompt Builder
      │
      ▼
AI Provider
      │
      ▼
Response Formatter
      │
      ▼
Feature Service
      │
      ▼
Client
```

Business Logic tetap berada pada Feature Service.

AI hanya bertanggung jawab menghasilkan respons.

---

# AI Components

## AI Service

Berfungsi sebagai pintu masuk seluruh permintaan AI.

Tanggung jawab:

* Mengelola permintaan AI.
* Memilih provider.
* Menangani error.
* Mengatur retry jika diperlukan.

---

## Prompt Builder

Prompt Builder bertanggung jawab membangun prompt berdasarkan konteks fitur.

Contoh:

* Memory Prompt
* Question Prompt
* Dream Board Prompt
* Open When Prompt

Setiap fitur memiliki template prompt sendiri.

---

## Provider Adapter

Provider Adapter menjadi lapisan abstraksi antara aplikasi dan AI Provider.

Keuntungan:

* Mudah mengganti provider.
* Mengurangi ketergantungan.
* Menjaga konsistensi respons.

---

## Response Formatter

Response Formatter mengubah hasil AI menjadi format yang seragam sehingga mudah digunakan oleh fitur lain.

---

# AI Usage

Contoh penggunaan AI pada OurSky.

## Question

* Membuat pertanyaan baru.
* Mengelompokkan kategori pertanyaan.

---

## Memory

* Membuat ringkasan cerita.
* Membantu penulisan deskripsi.

---

## Dream Board

* Memberikan ide aktivitas.
* Memberikan rekomendasi tujuan.

---

## Open When

* Membantu menyusun isi surat.

---

## Time Capsule

* Membantu menyusun pesan berdasarkan tema.

---

# Prompt Management

Seluruh prompt dikelola secara terpusat.

Setiap prompt memiliki:

* Nama.
* Tujuan.
* Versi.
* Template.

Prompt tidak ditulis langsung di dalam Controller maupun Service.

---

# Error Handling

Jika AI gagal memberikan respons:

* Sistem menampilkan pesan yang ramah.
* Business Logic tetap berjalan apabila memungkinkan.
* Error dicatat pada sistem logging.

---

# Security Principles

AI mengikuti prinsip berikut.

* Tidak mengirim password.
* Tidak mengirim token autentikasi.
* Tidak mengirim data sensitif tanpa kebutuhan yang jelas.
* Seluruh komunikasi menggunakan HTTPS.

---

# Performance Strategy

Strategi performa meliputi:

* Timeout Request.
* Retry terbatas.
* Caching hasil AI jika relevan.
* Pembatasan ukuran prompt.

---

# Future Enhancements

Arsitektur ini mendukung pengembangan untuk:

* Multi AI Provider.
* AI Fallback Provider.
* Prompt Versioning.
* AI Analytics.
* Semantic Search.
* Personalized Recommendation.
* Local AI Model.

---

# Relationship with Other Documents

Dokumen ini berkaitan dengan:

* ARCH-03 Backend Architecture
* ARCH-04 Database Architecture
* ARCH-07 Notification Architecture
* ARCH-09 Security Architecture
* AI Prompt Guideline

---

# References

* Prompt Engineering Best Practices
* Retrieval-Augmented Generation (Concept)
* AI API Integration Patterns
* Responsible AI Principles
