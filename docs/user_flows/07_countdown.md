# User Flow: Countdown

> **Flow ID:** UF-07
> **Flow Type:** Daily Flow
> **Status:** Draft
> **Version:** 1.2
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna dalam menggunakan fitur **Countdown**.

Countdown membantu pasangan mengetahui berapa lama waktu yang tersisa menuju hari-hari penting dalam Relationship.

Countdown tidak memiliki data sendiri. Seluruh informasi ditampilkan berdasarkan data yang berasal dari **Important Days** dan divisualisasikan melalui **Cycle-Based Progress Timeline**, sehingga pengguna dapat melihat perkembangan waktu menuju momen spesial mereka dalam satu siklus perjalanan.

Flow dimulai ketika pengguna membuka Countdown dan berakhir ketika pengguna kembali ke Dashboard atau membuka detail Important Day.

---

# Countdown Principles

Countdown mengikuti prinsip berikut:

* Countdown merupakan representasi visual dari Important Days.
* Countdown tidak dapat dibuat atau diubah secara langsung.
* Seluruh Countdown dihitung secara otomatis berdasarkan tanggal saat ini.
* Countdown selalu menampilkan informasi terbaru.
* Countdown membantu pengguna mempersiapkan hari penting berikutnya.
* Progress Timeline memberikan gambaran visual mengenai perjalanan menuju hari spesial.
* Event tahunan menggunakan siklus berulang (Recurring Cycle).
* Event satu kali menggunakan satu siklus (One-Time Cycle).

---

# Actors

## Primary Actors

* User A
* User B

## Supporting System

* Countdown Service
* Important Days Service

---

# Preconditions

Sebelum flow dimulai:

* Pengguna telah login.
* Relationship aktif.
* Minimal terdapat satu Important Day.

---

# Trigger

Flow dimulai ketika pengguna:

* Memilih menu **Countdown** dari Dashboard.
* Memilih kartu Countdown pada Dashboard.

---

# Main Flow

## 1. Open Countdown

Pengguna membuka halaman Countdown.

↓

## 2. Load Important Days

Sistem mengambil seluruh Important Days yang aktif.

↓

## 3. Calculate Countdown

Untuk setiap Important Day, sistem menghitung:

* Remaining Days
* Countdown Status
* Progress Timeline berdasarkan jenis event

↓

## 4. Display Countdown

Sistem menampilkan daftar Countdown berdasarkan tanggal terdekat.

Setiap Countdown menampilkan:

* Event Name
* Event Date
* Remaining Days
* Countdown Status
* Progress Timeline

↓

## 5. View Countdown Detail

Pengguna memilih salah satu Countdown.

Sistem menampilkan detail Important Day beserta informasi siklus Countdown.

↓

## 6. Return

Pengguna kembali ke Dashboard atau daftar Countdown.

Flow selesai.

---

# Flow Diagram

```text
Dashboard
      │
      ▼
Countdown
      │
      ▼
Load Important Days
      │
      ▼
Calculate Countdown
      │
      ▼
Determine Event Type
      │
 ┌────┴─────────┐
 │              │
 ▼              ▼
Recurring    One-Time
 │              │
 └────┬─────────┘
      ▼
Generate Progress Timeline
      │
      ▼
Display Countdown
      │
      ▼
View Detail
      │
      ▼
Dashboard
```

---

# Countdown Information

Setiap Countdown minimal menampilkan:

* Event Name
* Event Category
* Event Date
* Remaining Days
* Countdown Status
* Progress Timeline

Contoh:

```text
❤️ Anniversary

25 December 2026

157 Days Remaining
```

---

# Progress Timeline

Setiap Countdown memiliki **Cycle-Based Progress Timeline**.

Timeline memperlihatkan posisi pengguna dalam satu siklus menuju hari penting berikutnya.

Visual yang digunakan dapat berupa garis progres, indikator, maupun progress bar.

Contoh:

```text
Today ───────────────────── ❤️
             157 Days
```

atau

```text
████████░░░░░░░░░░

157 Days Remaining
```

Progress Timeline dihitung secara otomatis berdasarkan jenis Important Day.

---

# Countdown Cycle

## Recurring Cycle

Digunakan untuk event yang berulang secara berkala, misalnya:

* Anniversary
* Birthday
* Valentine's Day

Setiap siklus dimulai setelah event sebelumnya selesai dan berakhir ketika event berikutnya tiba.

Contoh:

```text
Anniversary 2025
        │
        ▼
██████████░░░░░░░░
        │
        ▼
Anniversary 2026
        │
Restart Cycle
        │
        ▼
Anniversary 2027
```

Ketika event selesai:

* Countdown diperbarui ke tanggal berikutnya.
* Progress Timeline kembali ke awal.
* Siklus baru dimulai secara otomatis.

---

## One-Time Cycle

Digunakan untuk event yang hanya terjadi sekali, misalnya:

* First Trip Together
* Graduation Celebration
* Proposal Day

Progress hanya berjalan satu kali.

Contoh:

```text
Today ─────────────── ❤️
```

Ketika event selesai:

* Status berubah menjadi **Completed**.
* Countdown berhenti.
* Progress Timeline tidak dimulai kembali.

---

# Countdown Status

Setiap Countdown memiliki salah satu status berikut:

## Upcoming

Hari penting masih cukup jauh.

---

## Soon

Hari penting mulai mendekat.

---

## Tomorrow

Hari penting akan terjadi besok.

---

## Today

Hari penting terjadi hari ini.

---

## Completed

Hari penting telah berlalu.

Untuk event tahunan, status ini hanya bersifat sementara sebelum sistem memulai siklus berikutnya secara otomatis.

---

# Alternative Flows

## A1. Multiple Countdowns

Apabila terdapat beberapa Important Days, sistem mengurutkannya berdasarkan tanggal yang paling dekat.

---

## A2. Recurring Event

Sistem memulai siklus Countdown berikutnya secara otomatis setelah event selesai.

---

## A3. One-Time Event

Countdown berubah menjadi **Completed** dan tidak dimulai kembali.

---

# Exception Flows

## E1. No Important Days

Belum terdapat Important Day.

Sistem menampilkan Empty State.

Contoh:

```text
No countdown yet.

Create your first Important Day to start tracking special moments.
```

---

## E2. Invalid Event

Data Important Day tidak dapat diproses.

Sistem menyembunyikan Countdown tersebut dan menampilkan pesan kesalahan apabila diperlukan.

---

## E3. Connection Lost

Data Countdown gagal dimuat.

Pengguna dapat mencoba kembali.

---

# Postconditions

Setelah flow selesai:

* Countdown berhasil ditampilkan.
* Remaining Days telah dihitung.
* Progress Timeline berhasil ditampilkan.
* Jenis siklus event telah ditentukan.
* Pengguna mengetahui hari penting berikutnya.
* Pengguna dapat membuka detail Important Day.

---

# Business Rules

## Countdown Rules

* Countdown tidak memiliki data sendiri.
* Countdown selalu berasal dari Important Days.
* Countdown dihitung secara otomatis.
* Countdown tidak dapat dibuat, diubah, maupun dihapus secara langsung.
* Setiap Countdown wajib memiliki Progress Timeline.
* Progress Timeline dihitung berdasarkan jenis event.
* Event tahunan menggunakan **Recurring Cycle**.
* Event satu kali menggunakan **One-Time Cycle**.
* Event tahunan otomatis membuat siklus Countdown baru setelah event selesai.
* Event satu kali berhenti pada status **Completed**.
* Countdown selalu diperbarui berdasarkan tanggal saat ini.

---

# Related Features

* Dashboard
* Important Days
* Notification

---

# Previous Flow

* UF-03 Dashboard

---

# Next Flow

* UF-08 Important Days
* Kembali ke UF-03 Dashboard

---

# References

* 02_FEATURE_SPECIFICATION.md
* features/countdown.md
* features/important_days.md
