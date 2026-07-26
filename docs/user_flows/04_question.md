# User Flow: Question

> **Flow ID:** UF-04
> **Flow Type:** Daily Flow
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna dalam menggunakan fitur **Question of the Day**.

Question merupakan aktivitas harian yang mendorong pasangan untuk saling mengenal lebih dalam melalui satu pertanyaan setiap hari.

Flow dimulai ketika pengguna membuka Today's Question dan berakhir ketika kedua pasangan dapat melihat jawaban masing-masing.

---

# Question Principles

Question mengikuti prinsip berikut:

* Satu Relationship menerima satu pertanyaan setiap hari.
* Kedua pasangan menerima pertanyaan yang sama.
* Jawaban pasangan tidak dapat dilihat sebelum pengguna mengirim jawabannya sendiri.
* Setelah kedua pasangan menjawab, jawaban dibuka secara bersamaan.
* Jawaban menjadi bagian dari perjalanan Relationship.

---

# Actors

## Primary Actors

* User A
* User B

## Supporting System

* Question Service
* Relationship Service
* Notification Service

---

# Preconditions

Sebelum flow dimulai:

* Relationship telah aktif.
* Pertanyaan hari ini tersedia.
* Pengguna telah login.

---

# Trigger

Flow dimulai ketika pengguna:

* Memilih **Today's Question** pada Dashboard.
* Membuka notifikasi Today's Question.

---

# Main Flow

## 1. Open Today's Question

Pengguna membuka halaman Today's Question.

↓

## 2. Display Question

Sistem menampilkan satu pertanyaan untuk hari ini.

Contoh:

> "Apa hal kecil yang membuatmu tersenyum hari ini?"

↓

## 3. Submit Answer

Pengguna menuliskan jawaban.

Kemudian memilih tombol **Submit Answer**.

↓

## 4. Waiting for Partner

Apabila pasangan belum menjawab, sistem menampilkan halaman Waiting.

Informasi yang ditampilkan:

* Jawaban berhasil dikirim.
* Menunggu pasangan menjawab.
* Jawaban pasangan akan terbuka setelah keduanya selesai.

↓

## 5. Partner Answers

Pasangan membuka pertanyaan yang sama.

Pasangan mengirim jawabannya.

↓

## 6. Reveal Answers

Setelah kedua jawaban tersedia, sistem membuka jawaban kedua pengguna secara bersamaan.

Pengguna dapat membaca:

* Jawaban sendiri.
* Jawaban pasangan.

↓

## 7. Complete

Today's Question selesai.

Flow berakhir.

---

# Flow Diagram

```text
Dashboard
      │
      ▼
Today's Question
      │
      ▼
Display Question
      │
      ▼
Write Answer
      │
      ▼
Submit Answer
      │
      ▼
Waiting Partner
      │
      ▼
Partner Answers
      │
      ▼
Reveal Both Answers
      │
      ▼
Complete
```

---

# Alternative Flows

## A1. Partner Already Answered

Saat pengguna membuka pertanyaan, pasangan ternyata sudah lebih dahulu menjawab.

Sistem tetap menyembunyikan jawaban pasangan.

Jawaban baru akan terbuka setelah pengguna mengirim jawabannya sendiri.

---

## A2. User Revisits Waiting Screen

Pengguna membuka kembali halaman Question.

Sistem tetap menampilkan status **Waiting for Partner** hingga pasangan selesai menjawab.

---

## A3. User Opens Completed Question

Apabila kedua pasangan telah menjawab, sistem langsung menampilkan kedua jawaban.

---

# Exception Flows

## E1. No Question Available

Belum ada pertanyaan untuk hari ini.

Sistem menampilkan informasi bahwa pertanyaan belum tersedia.

---

## E2. User Already Answered

Pengguna mencoba menjawab untuk kedua kalinya.

Sistem menampilkan jawaban yang telah dikirim dan tidak mengizinkan pengiriman ulang.

---

## E3. Connection Lost

Apabila koneksi terputus saat mengirim jawaban, sistem memberi tahu bahwa jawaban belum berhasil dikirim dan pengguna dapat mencoba kembali.

---

# Postconditions

Setelah flow selesai:

* Jawaban pengguna tersimpan.
* Setelah kedua pengguna menjawab, kedua jawaban dapat dilihat.
* Aktivitas Question hari itu dianggap selesai.
* Relationship Event dibuat sesuai aturan sistem.

---

# Business Rules

## Question Rules

* Setiap Relationship menerima satu pertanyaan setiap hari.
* Kedua pengguna menerima pertanyaan yang sama.
* Satu pengguna hanya dapat mengirim satu jawaban.
* Jawaban tidak dapat diubah setelah dikirim.
* Jawaban pasangan disembunyikan hingga kedua pengguna menjawab.
* Relationship Event dibuat setelah kedua jawaban tersedia.

---

# Related Features

* Dashboard
* Relationship
* Constellation
* Relationship Event
* Notification

---

# Previous Flow

* UF-03 Dashboard

---

# Next Flow

* Kembali ke UF-03 Dashboard

---

# References

* 02_FEATURE_SPECIFICATION.md
* features/question.md
* 09_RELATIONSHIP_EVENT.md
