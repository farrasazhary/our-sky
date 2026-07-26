# 📆 Important Days

> **Feature:** Important Days  
> **Category:** Core Experience  
> **Status:** MVP  
> **Priority:** High

---

# Overview

Important Days menyimpan seluruh tanggal penting dalam sebuah hubungan.

Tanggal-tanggal ini menjadi dasar bagi berbagai fitur lain seperti Countdown, Dashboard, Notification, dan Relationship Events.

Important Days bukan sekadar kalender, tetapi arsip seluruh milestone penting dalam perjalanan hubungan.

---

# Purpose

Membantu pasangan mengingat dan merayakan setiap momen penting dalam hubungan mereka.

---

# User Story

Sebagai pasangan,

Saya ingin menyimpan tanggal-tanggal penting,

Sehingga kami tidak melewatkan momen yang berarti dalam hubungan kami.

---

# Permissions

Relationship Member

- Create Important Day
- View Important Days
- Edit Important Day
- Delete Custom Important Day

Guest

- No Access

---

# Functional Requirements

- Menambahkan tanggal penting.
- Mengubah tanggal penting.
- Menghapus tanggal custom.
- Menampilkan daftar tanggal penting.
- Menampilkan kategori.
- Mendukung event tahunan maupun satu kali.

---

# Business Rules

- Birthday hanya boleh satu per pasangan.
- Anniversary hanya boleh satu.
- Custom Important Day dapat dibuat lebih dari satu.
- Event dapat bersifat One Time atau Yearly.
- Event tahunan akan muncul kembali setiap tahun.
- Relationship Event hanya dibuat ketika tanggal tersebut tiba.

---

# Validation Rules

Title

- Required
- Maksimum 100 karakter

Date

- Required

Category

- Required

Repeat

- One Time
- Yearly

---

# User Flow

Create Important Day

↓

Choose Category

↓

Choose Date

↓

Save

↓

Waiting

↓

Important Day Arrives

↓

Relationship Event Created

---

# UI Components

- Important Day List
- Category Badge
- Create Form
- Edit Form
- Calendar Picker

---

# API Requirements

GET /important-days

POST /important-days

PATCH /important-days/:id

DELETE /important-days/:id

---

# Database Requirements

Tables

- important_days

---

# Relationship Events

Event yang dihasilkan:

- Important Day Reached

---

# Notifications

- Reminder H-7
- Reminder H-1
- Reminder Today

---

# Edge Cases

## Duplicate Anniversary

Ditolak.

---

## Leap Year Birthday

Sistem menggunakan aturan kalender yang telah ditentukan (misalnya 28 Februari atau 1 Maret, sesuai kebijakan aplikasi).

---

## Relationship Berakhir

Important Days menjadi arsip.

---

# Acceptance Criteria

- Pengguna dapat membuat tanggal penting.
- Pengguna dapat mengedit tanggal penting.
- Event tahunan muncul setiap tahun.
- Countdown dapat membaca data dari Important Days.
- Relationship Event dibuat saat hari tersebut tiba.

---

# Future Improvements

- Shared Calendar Sync
- Google Calendar Integration
- Apple Calendar Integration
- Recurring Rules
- Smart Reminder
- AI Celebration Ideas

---

# References

- 00_KITAB_PROJECT.md
- 01_PRODUCT_REQUIREMENT.md
- countdown.md
- architecture/event_system.md