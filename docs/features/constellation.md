# ⭐ Constellation

> **Feature:** Constellation
> **Category:** Core Experience
> **Status:** MVP
> **Priority:** High

---

# Overview

Constellation merupakan representasi visual dari perjalanan sebuah hubungan.

Setiap momen penting yang terjadi dalam hubungan akan menghasilkan sebuah bintang pada langit digital milik pasangan.

Constellation bukan media sosial, bukan gamifikasi, dan bukan sistem poin.

Constellation adalah cara OurSky mengubah kenangan menjadi pengalaman visual.

---

# Purpose

Memberikan visualisasi yang indah terhadap perjalanan hubungan sehingga pasangan dapat melihat bagaimana hubungan mereka tumbuh dari waktu ke waktu.

---

# User Story

Sebagai pasangan,

Saya ingin melihat perjalanan hubungan kami dalam bentuk langit berbintang,

Sehingga setiap momen kecil terasa memiliki arti.

---

# Permissions

Relationship Member

* View Constellation
* Click Star
* View Star Detail

Guest

* No Access

---

# Functional Requirements

* Menampilkan langit digital.
* Menampilkan seluruh bintang berdasarkan Relationship Event.
* Menampilkan detail ketika bintang dipilih.
* Mengurutkan bintang berdasarkan waktu.
* Mendukung penambahan event baru secara otomatis.
* Memperbarui langit setelah event baru dibuat.

---

# Business Rules

* Satu Relationship Event menghasilkan satu bintang.
* Bintang tidak dapat dibuat secara manual.
* Bintang tidak dapat dihapus oleh pengguna.
* Bintang merupakan bagian dari sejarah hubungan.
* Jika data asli dihapus, bintang tetap ada sebagai catatan sejarah.
* Seluruh bintang hanya dapat dilihat oleh kedua anggota relationship.

---

# Validation Rules

Tidak ada input langsung dari pengguna.

Seluruh data berasal dari Relationship Event.

---

# User Flow

```text
Relationship Event Created

↓

Event Stored

↓

Constellation Refresh

↓

New Star Appears

↓

User Clicks Star

↓

Star Detail Opens
```

---

# UI Components

* Sky Canvas
* Star Component
* Star Tooltip
* Star Detail Modal
* Year Filter *(future)*
* Zoom Control *(future)*

---

# API Requirements

GET /constellation

Mengambil seluruh data bintang.

---

GET /constellation/:id

Mengambil detail sebuah bintang.

---

# Database Requirements

Constellation **tidak memiliki tabel sendiri.**

Data berasal dari:

* relationship_events

---

# Relationship Events

Constellation membaca seluruh event berikut.

* Memory Added
* Question Answered
* Time Capsule Created
* Time Capsule Opened
* Countdown Completed
* Important Day
* Dream Completed *(future)*
* Open When Opened *(future)*

---

# Notifications

Tidak mengirim notifikasi.

Constellation hanya memperbarui tampilan ketika event baru tersedia.

---

# Edge Cases

## Event Dihapus

Jika data asli dihapus oleh pengguna, bintang tetap dipertahankan sebagai bagian dari sejarah hubungan.

---

## Relationship Berakhir

Constellation menjadi arsip.

Tidak menerima event baru.

---

## Tidak Ada Event

Langit tetap ditampilkan.

Muncul ilustrasi langit kosong dengan pesan:

> "Your story begins with the first shared moment."

---

# Acceptance Criteria

* Seluruh Relationship Event ditampilkan sebagai bintang.
* Klik bintang menampilkan detail event.
* Penambahan event otomatis menghasilkan bintang baru.
* Tidak ada bintang yang dibuat secara manual.
* Constellation hanya dapat diakses oleh anggota relationship.

---

# Future Improvements

* Animated Star Birth
* Shooting Star
* Monthly Sky
* Yearly Sky
* Interactive Zoom
* Constellation Timeline
* Star Search
* Favorite Star
* Sky Theme
* Season Theme

---

# References

* 00_KITAB_PROJECT.md
* 01_PRODUCT_REQUIREMENT.md
* architecture/event_system.md
* architecture/relationship_model.md
