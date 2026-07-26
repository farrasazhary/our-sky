# User Flow: Constellation

> **Flow ID:** UF-09
> **Flow Type:** Experience Flow
> **Status:** Draft
> **Version:** 1.4
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna dalam menggunakan fitur **Constellation**.

Constellation merupakan representasi visual dari seluruh **Relationship Events** yang telah terjadi sepanjang perjalanan Relationship.

Setiap Relationship Event divisualisasikan sebagai sebuah **Star** yang memiliki karakteristik visual serta posisi yang konsisten berdasarkan waktu dan kategori event. Kumpulan Star tersebut membentuk langit Relationship yang terus berkembang seiring bertambahnya perjalanan pasangan.

Flow dimulai ketika pengguna membuka halaman Constellation dan berakhir ketika pengguna selesai menjelajahi perjalanan Relationship.

---

# Constellation Principles

Constellation mengikuti prinsip berikut:

* Constellation bukan sumber data.
* Seluruh Star berasal dari Relationship Events.
* Setiap Relationship Event menghasilkan satu Star.
* Setiap Star memiliki atribut visual yang unik.
* Posisi Star bersifat konsisten.
* Semakin penting suatu momen, semakin menonjol tampilan Star.
* Pengguna dapat menjelajahi perjalanan Relationship melalui Journey Mode.
* Perubahan pada Relationship Events langsung memengaruhi Constellation.

---

# Actors

## Primary Actors

* User A
* User B

## Supporting System

* Constellation Service
* Relationship Event Service

---

# Preconditions

* Pengguna telah login.
* Relationship aktif.
* Minimal terdapat satu Relationship Event.

---

# Trigger

Pengguna membuka menu **Constellation** dari Dashboard.

---

# Main Flow

## 1. Open Constellation

Pengguna membuka halaman Constellation.

↓

## 2. Load Relationship Events

Sistem mengambil seluruh Relationship Event.

↓

## 3. Generate Stars

Setiap Relationship Event diubah menjadi satu Star.

↓

## 4. Calculate Star Attributes

Untuk setiap Star, sistem menghitung:

* Position
* Size
* Brightness
* Importance Level
* Category
* Date

↓

## 5. Calculate Sky Position

Sistem menentukan posisi Star menggunakan **Sky Coordinate System**.

↓

## 6. Display Constellation

Seluruh Star ditampilkan sebagai satu langit Relationship.

↓

## 7. Journey Mode

Pengguna dapat:

* Zoom In
* Zoom Out
* Pan
* Filter Category
* Filter Year
* Select Star

↓

## 8. View Star Detail

Sistem menampilkan detail Relationship Event.

↓

## 9. Return

Flow selesai.

---

# Flow Diagram

```text
Dashboard
      │
      ▼
Constellation
      │
      ▼
Load Relationship Events
      │
      ▼
Generate Stars
      │
      ▼
Calculate Attributes
      │
      ▼
Sky Coordinate System
      │
      ▼
Display Sky
      │
      ▼
Journey Mode
      │
      ▼
View Event Detail
```

---

# Sky Coordinate System

Constellation menggunakan sistem koordinat yang konsisten sehingga posisi setiap Star tidak berubah setiap kali aplikasi dibuka.

Setiap Star dihitung berdasarkan dua sumbu utama:

* Horizontal Axis (Time)
* Vertical Axis (Category Band)

---

# Horizontal Axis (Time)

Sumbu horizontal menggambarkan perjalanan waktu Relationship.

Semakin ke kiri berarti semakin lama.

Semakin ke kanan berarti semakin baru.

```text
2025 ────── 2026 ────── 2027
```

Pengguna dapat membaca perjalanan Relationship secara alami dari kiri menuju kanan.

---

# Vertical Axis (Category Band)

Berbeda dengan koordinat tetap, setiap kategori memiliki **band** atau area vertikal.

Contoh:

```text
Milestone Band

⭐

       ⭐

Relationship Band

      ⭐

Important Day Band

⭐

      ⭐

Random Date Band

     ⭐

Memory Band

  ⭐

         ⭐

     ⭐

Question Band

⭐

      ⭐
```

Band menjaga agar setiap kategori tetap mudah dikenali tanpa membuat tampilan terlihat kaku.

---

# Category Band Positioning

Setiap kategori memiliki rentang koordinat vertikal.

Contoh ilustrasi:

| Category         | Area      |
| ---------------- | --------- |
| 🌟 Milestone     | Y 0–100   |
| ❤️ Relationship  | Y 100–200 |
| 🎉 Important Day | Y 200–300 |
| 🎯 Random Date   | Y 300–400 |
| 📷 Memory        | Y 400–500 |
| ❓ Question       | Y 500–600 |

Posisi akhir Star dipilih **di dalam area kategori tersebut**, bukan pada satu garis lurus.

---

# Deterministic Positioning

Untuk menghasilkan langit yang konsisten, sistem menggunakan **deterministic positioning**.

Artinya posisi Star dihitung menggunakan informasi Relationship Event, misalnya:

* Event ID
* Event Date
* Category

Bukan menggunakan angka acak.

Keuntungan pendekatan ini:

* Posisi Star selalu sama setiap kali aplikasi dibuka.
* Tidak perlu menyimpan koordinat pada database.
* Langit tetap terlihat alami.
* Pengguna membangun ingatan spasial terhadap momen-momen penting.

---

# Journey Mode

Journey Mode memungkinkan pengguna:

* Zoom In
* Zoom Out
* Pan
* Filter berdasarkan kategori
* Filter berdasarkan tahun
* Memilih Star
* Kembali ke tampilan awal

Journey Mode hanya memengaruhi tampilan.

---

# Star Attributes

Setiap Star memiliki:

* Position
* Size
* Brightness
* Importance Level
* Event Category
* Event Date

---

# Star Importance

Importance Level menentukan ukuran dan cahaya Star.

| Level | Contoh Event                                        |
| ----- | --------------------------------------------------- |
| 1     | Daily Question                                      |
| 2     | Memory                                              |
| 3     | Random Date Completed                               |
| 4     | Anniversary, Birthday                               |
| 5     | Proposal, Marriage, Milestone (100, 365, 1000 Days) |

Importance Level ditentukan otomatis oleh sistem.

---

# Star Visual Rules

Semakin tinggi Importance Level:

* Ukuran Star semakin besar.
* Cahaya Star semakin terang.
* Star lebih mudah terlihat dari tampilan keseluruhan.

Visual ini membantu pengguna langsung mengenali momen yang paling berkesan.

---

# Star Categories

Kategori mengikuti Relationship Event.

* ❤️ Relationship
* 📷 Memory
* ❓ Question
* 🎯 Random Date
* 🎉 Important Day
* 🎁 Time Capsule
* 🌟 Milestone

Kategori digunakan pada filter Journey Mode.

---

# Star Legend

```text
⭐      Level 1

⭐⭐     Level 2

⭐⭐⭐    Level 3

⭐⭐⭐⭐   Level 4

⭐⭐⭐⭐⭐  Level 5
```

Legenda membantu pengguna memahami arti ukuran dan cahaya Star.

---

# Star Information

Saat pengguna memilih sebuah Star, sistem menampilkan:

* Event Title
* Event Date
* Event Category
* Description
* Related Feature

Contoh:

```text
⭐ First Memory

12 July 2026

Category : Memory

"Our first sunset together."
```

---

# Alternative Flows

## A1. Filter Stars

Pengguna memfilter Star berdasarkan kategori.

---

## A2. Filter by Year

Pengguna memfilter Star berdasarkan tahun.

---

## A3. Empty Constellation

Belum terdapat Relationship Event.

Sistem menampilkan Empty State yang mengajak pengguna mulai menciptakan perjalanan Relationship.

---

# Exception Flows

## E1. Failed Loading

Relationship Event gagal dimuat.

---

## E2. Connection Lost

Constellation tidak dapat diperbarui.

---

# Postconditions

* Seluruh Relationship Event divisualisasikan sebagai Star.
* Position setiap Star dihitung menggunakan Sky Coordinate System.
* Deterministic Positioning telah diterapkan.
* Importance Level telah dihitung.
* Pengguna dapat menjelajahi Relationship melalui Journey Mode.
* Tidak ada perubahan pada Relationship Event.

---

# Business Rules

## Constellation Rules

* Constellation hanya membaca Relationship Events.
* Tidak ada proses Create, Update, maupun Delete.
* Setiap Relationship Event menghasilkan satu Star.
* Position dihitung menggunakan Sky Coordinate System.
* Horizontal Axis merepresentasikan waktu.
* Vertical Axis menggunakan Category Band.
* Posisi Star harus bersifat deterministik.
* Importance Level ditentukan otomatis berdasarkan jenis Relationship Event.
* Filter hanya memengaruhi tampilan.
* Penghapusan Relationship Event menghapus Star terkait.

---

# Related Features

* Relationship Event
* Memory
* Question
* Random Date
* Important Days
* Time Capsule
* Dream Board
* Open When

---

# Previous Flow

* UF-03 Dashboard

---

# Next Flow

* Kembali ke UF-03 Dashboard

---

# References

* 02_FEATURE_SPECIFICATION.md
* features/constellation.md
* 09_RELATIONSHIP_EVENT.md
