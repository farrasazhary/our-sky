# 📷 Little Memory

> **Feature:** Little Memory  
> **Category:** Core Experience  
> **Status:** MVP  
> **Priority:** High

---

# Overview

Little Memory memungkinkan pasangan menyimpan satu momen terbaik setiap hari dalam bentuk foto dan caption.

Berbeda dengan galeri biasa, Little Memory menekankan kualitas dibanding kuantitas. Setiap hari hanya dapat memiliki satu kenangan sehingga setiap foto menjadi bagian penting dari perjalanan hubungan.

---

# Purpose

Mendorong pasangan untuk mengabadikan satu momen yang paling berarti setiap hari dan membangun arsip kenangan yang sederhana namun bermakna.

---

# User Story

Sebagai pasangan,

Saya ingin menyimpan satu foto terbaik setiap hari,

Sehingga kami memiliki album perjalanan hubungan yang dapat dikenang kembali di masa depan.

---

# Permissions

Relationship Member

- Upload Memory
- View Memory
- Edit Memory (hari yang sama)
- Replace Photo (hari yang sama)

Guest

- No Access

---

# Functional Requirements

- Upload satu foto.
- Menambahkan caption.
- Menampilkan galeri memory.
- Menampilkan detail memory.
- Mengganti foto sebelum hari berganti.
- Mengunci memory setelah hari berganti.

---

# Business Rules

- Satu relationship hanya memiliki satu memory per hari.
- Memory terdiri dari satu foto dan satu caption.
- Memory dapat diperbarui selama hari yang sama.
- Setelah hari berganti, memory menjadi terkunci.
- Memory tidak dapat dihapus setelah terkunci.
- Memory hanya dapat dilihat oleh anggota relationship.

---

# Validation Rules

Photo

- Required
- JPG
- PNG
- WEBP
- Maksimum 5 MB

Caption

- Optional
- Maksimum 300 karakter

---

# User Flow

Open Memory

↓

Upload Photo

↓

Add Caption

↓

Save Memory

↓

Relationship Event Created

↓

Constellation Updated

---

# UI Components

- Memory Calendar
- Memory Gallery
- Memory Card
- Upload Form
- Memory Detail
- Photo Viewer

---

# API Requirements

GET /memories

GET /memories/:id

POST /memories

PATCH /memories/:id

---

# Database Requirements

Tables

- memories

---

# Relationship Events

Event yang dihasilkan:

- Memory Added

---

# Notifications

- Pengingat jika hari ini belum memiliki Memory.
- Notifikasi ketika pasangan berhasil menambahkan Memory.

---

# Edge Cases

## Sudah Ada Memory Hari Ini

Upload baru akan menggantikan memory lama selama masih di hari yang sama.

---

## Hari Sudah Berganti

Memory menjadi terkunci dan tidak dapat diubah.

---

## Relationship Berakhir

Seluruh memory menjadi arsip relationship.

---

## Gagal Upload

Memory tidak dibuat dan pengguna dapat mencoba kembali.

---

# Acceptance Criteria

- Pengguna dapat mengunggah satu foto per hari.
- Caption berhasil disimpan.
- Memory dapat diperbarui pada hari yang sama.
- Memory terkunci setelah hari berganti.
- Upload pertama menghasilkan Relationship Event.
- Gallery menampilkan seluruh memory berdasarkan tanggal.

---

# Future Improvements

- Video Memory
- Voice Memory
- Multiple Photos
- AI Memory Recap
- Monthly Album
- Yearly Album
- Memory Search
- Favorite Memory
- Memory Map

---

# References

- 00_KITAB_PROJECT.md
- 01_PRODUCT_REQUIREMENT.md
- constellation.md
- architecture/event_system.md