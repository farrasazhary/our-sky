# 💌 Time Capsule

> **Feature:** Time Capsule
> **Category:** Core Experience
> **Status:** MVP
> **Priority:** High

---

# Overview

Time Capsule memungkinkan pasangan menulis pesan untuk masa depan yang akan tetap terkunci hingga tanggal atau kondisi tertentu tercapai.

Pesan tidak dapat dibaca maupun diubah setelah dikunci. Saat waktu pembukaan tiba, kedua pasangan dapat membuka capsule dan menikmati kembali kenangan yang telah mereka tinggalkan untuk diri mereka di masa depan.

---

# Purpose

Membantu pasangan menciptakan momen kejutan dan refleksi di masa depan, sehingga hubungan terasa terus berkembang seiring waktu.

---

# User Story

Sebagai pasangan,

Saya ingin menulis pesan untuk masa depan,

Sehingga kami dapat mengenang kembali perasaan kami pada waktu yang telah ditentukan.

---

# Permissions

Relationship Member

- Create Time Capsule
- View Locked Capsule
- Open Capsule (ketika tersedia)
- View Opened Capsule

Guest

- No Access

---

# Functional Requirements

- Membuat Time Capsule.
- Menentukan tanggal pembukaan.
- Menampilkan daftar capsule.
- Menampilkan status Locked / Opened.
- Membuka capsule ketika waktu telah tiba.
- Menampilkan isi capsule setelah dibuka.

---

# Business Rules

- Capsule hanya dimiliki oleh satu relationship.
- Capsule tidak dapat diedit setelah dibuat.
- Capsule tidak dapat dihapus setelah dibuat.
- Capsule tidak dapat dibuka sebelum waktunya.
- Setelah dibuka, capsule tetap dapat dibaca kapan saja.
- Pembukaan capsule mengubah status untuk kedua pasangan.

---

# Validation Rules

Title

- Required
- Maksimum 100 karakter

Message

- Required
- Maksimum 5.000 karakter

Open Date

- Harus berada di masa depan.

---

# User Flow

Create Capsule

↓

Fill Title & Message

↓

Choose Open Date

↓

Lock Capsule

↓

Waiting Period

↓

Open Date Arrives

↓

Open Capsule

↓

Relationship Event Created

---

# UI Components

- Capsule List
- Capsule Card
- Locked Capsule View
- Capsule Detail
- Create Capsule Form
- Open Capsule Button

---

# API Requirements

GET /time-capsules

GET /time-capsules/:id

POST /time-capsules

POST /time-capsules/:id/open

---

# Database Requirements

Table

- time_capsules

---

# Relationship Events

Event yang dihasilkan:

- Time Capsule Opened

---

# Notifications

- Pengingat ketika tanggal pembukaan tiba.
- Notifikasi ketika pasangan membuka capsule.

---

# Edge Cases

## Open Date Belum Tiba

Capsule tetap terkunci.

---

## Relationship Berakhir

Capsule menjadi arsip dan tetap dapat dibaca sesuai kebijakan relationship archive.

---

## User Menghapus Akun

Capsule tetap menjadi bagian dari riwayat relationship selama relationship masih aktif.

---

# Acceptance Criteria

- Pengguna dapat membuat capsule.
- Capsule terkunci setelah dibuat.
- Capsule tidak dapat dibuka sebelum waktunya.
- Capsule dapat dibuka setelah tanggal pembukaan.
- Pembukaan menghasilkan Relationship Event.
- Capsule tetap dapat dibaca setelah dibuka.

---

# Future Improvements

- Photo Capsule
- Voice Capsule
- Video Capsule
- Music Attachment
- Conditional Capsule ("Open after Anniversary")
- AI Reflection Summary

---

# References

- 00_KITAB_PROJECT.md
- 01_PRODUCT_REQUIREMENT.md
- architecture/event_system.md
- constellation.md