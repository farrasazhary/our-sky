# 🎲 Random Date

> **Feature:** Random Date  
> **Category:** Core Experience  
> **Status:** MVP  
> **Priority:** Medium

---

# Overview

Random Date memberikan rekomendasi aktivitas sederhana yang dapat dilakukan bersama pasangan untuk menciptakan pengalaman baru.

Setiap aktivitas dirancang agar mudah dilakukan, menyenangkan, dan cocok untuk pasangan LDR maupun non-LDR.

Fokus utama fitur ini bukan sekadar memberikan ide, tetapi mendorong pasangan menciptakan momen baru bersama.

---

# Purpose

Membantu pasangan mengurangi kebosanan dalam hubungan melalui aktivitas sederhana yang dapat dilakukan bersama secara rutin.

---

# User Story

Sebagai pasangan,

Saya ingin mendapatkan ide aktivitas bersama,

Sehingga kami dapat terus menciptakan kenangan baru tanpa harus bingung menentukan kegiatan.

---

# Permissions

Relationship Member

- View Date Recommendation
- Refresh Recommendation
- Complete Date
- Skip Recommendation

Guest

- No Access

---

# Functional Requirements

- Menampilkan satu rekomendasi aktivitas.
- Menampilkan detail aktivitas.
- Mengizinkan refresh rekomendasi.
- Menandai aktivitas sebagai selesai.
- Menyimpan riwayat aktivitas.

---

# Business Rules

- Satu recommendation aktif pada satu waktu.
- Aktivitas yang selesai dapat diulang di masa depan.
- Sistem menghindari rekomendasi kategori yang sama secara berurutan.
- Refresh memiliki batas harian untuk mencegah spam.
- Relationship Event hanya dibuat ketika aktivitas diselesaikan.

---

# Validation Rules

Tidak ada input wajib.

Completion hanya dapat dilakukan oleh anggota relationship.

---

# User Flow

Generate Recommendation

↓

View Activity

↓

Start Activity

↓

Complete Date

↓

Relationship Event Created

↓

Constellation Updated

---

# UI Components

- Random Date Card
- Activity Detail
- Category Badge
- Difficulty Badge
- Duration Badge
- Complete Button
- Skip Button
- Refresh Button
- History List

---

# API Requirements

GET /random-date

POST /random-date/refresh

POST /random-date/:id/complete

GET /random-date/history

---

# Database Requirements

Tables

- date_activities
- relationship_date_history

---

# Relationship Events

Event yang dihasilkan:

- Date Completed

---

# Notifications

- Pengingat mencoba aktivitas hari ini.
- Notifikasi ketika pasangan menyelesaikan aktivitas.

---

# Edge Cases

## User Skip

Tidak menghasilkan Relationship Event.

---

## Refresh Berulang

Refresh dibatasi sesuai Business Rules.

---

## Aktivitas Sudah Pernah Dilakukan

Masih dapat direkomendasikan kembali setelah periode tertentu.

---

## Relationship Berakhir

Riwayat aktivitas menjadi arsip.

---

# Acceptance Criteria

- Sistem menampilkan rekomendasi aktivitas.
- Pengguna dapat melihat detail aktivitas.
- Pengguna dapat menyelesaikan aktivitas.
- Penyelesaian menghasilkan Relationship Event.
- Riwayat aktivitas tersimpan.

---

# Future Improvements

- AI Generated Date Ideas
- Personalized Recommendation
- Seasonal Activities
- Couple Preference Learning
- Location Based Activity
- Spotify Integration
- Achievement System
- Surprise Challenge Mode

---

# References

- 00_KITAB_PROJECT.md
- 01_PRODUCT_REQUIREMENT.md
- constellation.md
- architecture/event_system.md