# ⏳ Countdown

> **Feature:** Countdown  
> **Category:** Core Experience  
> **Status:** MVP  
> **Priority:** High

---

# Overview

Countdown menampilkan sisa waktu menuju setiap Important Day dalam sebuah relationship.

Countdown bukan penyimpan data, melainkan representasi visual yang dihitung secara otomatis berdasarkan data pada Important Days.

---

# Purpose

Membantu pasangan mengetahui berapa lama lagi hingga momen penting berikutnya tiba.

---

# User Story

Sebagai pasangan,

Saya ingin melihat hitung mundur menuju hari-hari penting,

Sehingga saya dapat mempersiapkan dan merayakan momen tersebut bersama pasangan.

---

# Permissions

Relationship Member

- View Countdown

Guest

- No Access

---

# Functional Requirements

- Menampilkan seluruh countdown aktif.
- Mengurutkan countdown berdasarkan tanggal terdekat.
- Menampilkan jumlah hari tersisa.
- Menampilkan status countdown.
- Memperbarui countdown secara otomatis setiap hari.

---

# Business Rules

- Countdown berasal dari Important Days.
- Countdown tidak memiliki data sendiri.
- Countdown dihitung secara otomatis.
- Countdown hanya ditampilkan untuk Important Days yang masih relevan.
- Countdown berulang mengikuti aturan Repeat pada Important Days.

---

# Validation Rules

Tidak ada input pengguna.

Seluruh data berasal dari Important Days.

---

# User Flow

Important Days

↓

Calculate Remaining Days

↓

Sort by Nearest

↓

Display Countdown

---

# UI Components

- Countdown Card
- Countdown List
- Days Remaining Badge
- Status Badge
- Category Badge

---

# API Requirements

GET /countdowns

---

# Database Requirements

Tidak memiliki tabel sendiri.

Data berasal dari:

- important_days

---

# Relationship Events

Countdown tidak menghasilkan Relationship Event.

Relationship Event berasal dari Important Days.

---

# Notifications

Countdown menjadi sumber informasi untuk:

- Reminder H-7
- Reminder H-1
- Reminder Today

---

# Edge Cases

## Event Hari Ini

Status:

Today

---

## Event Sudah Lewat

Jika Repeat = Yearly

↓

Hitung menuju tahun berikutnya.

Jika Repeat = One Time

↓

Status Completed.

---

## Leap Year

Mengikuti aturan kalender yang digunakan oleh Important Days.

---

# Acceptance Criteria

- Countdown berhasil ditampilkan.
- Countdown diurutkan berdasarkan tanggal terdekat.
- Countdown diperbarui otomatis setiap hari.
- Countdown tidak menyimpan data sendiri.
- Countdown membaca seluruh data dari Important Days.

---

# Future Improvements

- Widget Dashboard
- Monthly Timeline
- Calendar View
- Smart Celebration Reminder
- AI Preparation Suggestion
- Shared Checklist Before Event

---

# References

- 00_KITAB_PROJECT.md
- 01_PRODUCT_REQUIREMENT.md
- important_days.md