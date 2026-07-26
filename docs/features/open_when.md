# 🌙 Open When

> **Feature:** Open When
> **Category:** Future Experience
> **Feature Type:** Primary Feature
> **Primary Table:** open_when_messages
> **Status:** Future (v1.1)
> **Priority:** Medium

---

# Overview

Open When memungkinkan pasangan menulis surat yang akan dibuka ketika penerima berada dalam kondisi atau momen tertentu.

Berbeda dengan Time Capsule yang dibuka berdasarkan tanggal, Open When dibuka berdasarkan situasi emosional yang dipilih oleh penerima.

Fitur ini dirancang untuk memberikan dukungan, semangat, atau kasih sayang tepat pada saat dibutuhkan.

---

# Purpose

Membantu pasangan tetap hadir secara emosional, bahkan ketika tidak dapat berada di sisi satu sama lain.

---

# User Story

Sebagai pasangan,

Saya ingin menulis pesan yang dapat dibuka pada kondisi tertentu,

Sehingga pasangan saya dapat merasakan dukungan atau kasih sayang saya di saat yang tepat.

---

# Permissions

Relationship Member

- Create Open When Message
- View Sent Messages
- Open Received Message
- Browse Opened Messages

Guest

- No Access

---

# Functional Requirements

- Membuat pesan Open When.
- Memilih kategori kondisi.
- Menulis judul dan isi pesan.
- Menampilkan daftar pesan yang belum dibuka.
- Membuka pesan berdasarkan pilihan pengguna.
- Menampilkan riwayat pesan yang telah dibuka.

---

# Business Rules

- Pesan dikirim kepada pasangan.
- Pesan tidak dapat diedit setelah dikirim.
- Pesan dapat dibuka kapan saja sesuai keputusan penerima.
- Pesan tetap dapat dibaca kembali setelah dibuka.
- Relationship Event hanya dibuat saat pesan pertama kali dibuka.

---

# Validation Rules

Title

- Required
- Maksimum 100 karakter

Message

- Required
- Maksimum 5000 karakter

Category

- Required

---

# User Flow

Create Message

↓

Choose Category

↓

Write Message

↓

Send

↓

Waiting

↓

Recipient Opens Message

↓

Relationship Event Created

↓

Constellation Updated

---

# UI Components

- Open When Card
- Category Badge
- Message Detail
- Sent List
- Received List
- Open Button

---

# API Requirements

GET /open-when

GET /open-when/:id

POST /open-when

POST /open-when/:id/open

---

# Database Requirements

Tables

- open_when_messages

---

# Relationship Events

Event yang dihasilkan:

- Open When Opened

---

# Notifications

- Notifikasi ketika pesan baru diterima.
- Notifikasi ketika pesan berhasil dibuka.

---

# Edge Cases

## Pesan Sudah Dibuka

Masih dapat dibaca kembali.

---

## Relationship Berakhir

Seluruh pesan menjadi arsip relationship.

---

## Pengirim Menghapus Akun

Pesan tetap tersedia sebagai bagian dari arsip relationship.

---

# Acceptance Criteria

- Pengguna dapat membuat pesan Open When.
- Pengguna dapat memilih kategori kondisi.
- Penerima dapat membuka pesan kapan saja.
- Pesan tetap dapat dibaca kembali.
- Pembukaan pertama menghasilkan Relationship Event.

---

# Future Improvements

- Voice Message
- Video Message
- Photo Attachment
- Music Attachment
- AI Suggested Categories
- Secret Letter Theme
- Animated Opening Experience

---

# References

- 00_KITAB_PROJECT.md
- 01_PRODUCT_REQUIREMENT.md
- time_capsule.md
- constellation.md
- architecture/event_system.md