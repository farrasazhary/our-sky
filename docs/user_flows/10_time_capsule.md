# User Flow: Time Capsule

> **Flow ID:** UF-10
> **Flow Type:** Feature Flow
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna dalam menggunakan fitur **Time Capsule**.

Time Capsule memungkinkan pasangan menyimpan pesan, foto, video, atau kenangan digital yang hanya dapat dibuka pada tanggal tertentu di masa depan.

Fitur ini dirancang untuk memberikan pengalaman emosional ketika pengguna kembali melihat kenangan yang telah mereka simpan bersama.

Setiap Time Capsule yang berhasil dibuka akan menjadi bagian dari sejarah Relationship melalui **Relationship Event**.

---

# Time Capsule Principles

Time Capsule mengikuti prinsip berikut:

* Time Capsule dibuat untuk masa depan.
* Isi Capsule tidak dapat diakses sebelum tanggal pembukaan.
* Setiap Capsule memiliki satu tanggal pembukaan.
* Setelah dibuka, Capsule menjadi arsip permanen.
* Membuka Capsule akan membuat satu Relationship Event.
* Capsule tidak dapat dikunci kembali setelah dibuka.

---

# Actors

## Primary Actors

* User A
* User B

## Supporting System

* Time Capsule Service
* Relationship Event Service
* Notification Service

---

# Preconditions

Sebelum flow dimulai:

* Pengguna telah login.
* Relationship aktif.

---

# Trigger

Pengguna membuka menu **Time Capsule** dari Dashboard.

---

# Main Flow

## 1. Open Time Capsule

Pengguna membuka halaman Time Capsule.

↓

## 2. View Capsule List

Sistem menampilkan seluruh Time Capsule.

↓

## 3. Create New Capsule

Pengguna membuat Capsule baru.

↓

## 4. Add Contents

Pengguna dapat menambahkan:

* Message
* Photo
* Video
* Voice Note (Future Enhancement)

↓

## 5. Set Open Date

Pengguna menentukan tanggal Capsule dapat dibuka.

↓

## 6. Review Capsule

Pengguna meninjau kembali isi Capsule.

↓

## 7. Save Capsule

Sistem menyimpan Capsule.

Status berubah menjadi:

**Scheduled**

↓

## 8. Waiting Period

Capsule menunggu hingga tanggal pembukaan.

↓

## 9. Open Date Arrives

Ketika tanggal telah tiba, sistem mengubah status menjadi:

**Ready to Open**

↓

## 10. Open Capsule

Pengguna membuka Capsule.

↓

## 11. Display Contents

Sistem menampilkan seluruh isi Capsule.

↓

## 12. Create Relationship Event

Sistem membuat satu Relationship Event.

↓

## 13. Return

Pengguna kembali ke Dashboard.

Flow selesai.

---

# Flow Diagram

```text
Dashboard
      │
      ▼
Time Capsule
      │
      ▼
Create Capsule
      │
      ▼
Add Contents
      │
      ▼
Set Open Date
      │
      ▼
Review
      │
      ▼
Save
      │
      ▼
Scheduled
      │
      ▼
Waiting
      │
      ▼
Ready to Open
      │
      ▼
Open Capsule
      │
      ▼
Display Contents
      │
      ▼
Relationship Event
      │
      ▼
Dashboard
```

---

# Capsule Contents

Setiap Capsule dapat memiliki satu atau beberapa jenis konten.

Jenis konten yang didukung:

* 💌 Text Message
* 📷 Photo
* 🎥 Video

Future Enhancement:

* 🎤 Voice Note
* 📄 Letter Template
* 🎵 Music Attachment

---

# Capsule Status

Setiap Capsule memiliki status berikut.

| Status        | Description                |
| ------------- | -------------------------- |
| Draft         | Sedang dibuat              |
| Scheduled     | Menunggu tanggal pembukaan |
| Ready to Open | Sudah dapat dibuka         |
| Opened        | Sudah dibuka               |

---

# Opening Experience

Ketika Capsule telah memasuki status **Ready to Open**, pengguna akan melihat tampilan khusus.

Contoh:

```text
🎁

Your Time Capsule is Ready

[ Open Capsule ]
```

Saat tombol **Open Capsule** ditekan:

* Animasi pembukaan Capsule dijalankan.
* Isi Capsule ditampilkan secara bertahap.
* Setelah seluruh isi ditampilkan, Capsule berubah menjadi **Opened**.

---

# Capsule History

Halaman utama menampilkan seluruh riwayat Capsule.

Contoh:

```text
🎁 First Anniversary Letter
Opened

🎁 Birthday Surprise
Ready to Open

🎁 Wedding Letter
Scheduled
```

Pengguna dapat membuka kembali Capsule yang telah berstatus **Opened** kapan saja.

---

# Alternative Flows

## A1. Create Multiple Capsules

Pengguna dapat memiliki lebih dari satu Capsule dengan tanggal pembukaan yang berbeda.

---

## A2. Open Previous Capsule

Pengguna membuka Capsule yang telah berstatus **Opened** untuk melihat kembali isinya.

---

# Exception Flows

## E1. Open Too Early

Pengguna mencoba membuka Capsule sebelum tanggal pembukaan.

Sistem menampilkan informasi bahwa Capsule belum dapat dibuka.

---

## E2. Failed Saving

Penyimpanan Capsule gagal.

Pengguna dapat mencoba kembali.

---

## E3. Connection Lost

Koneksi terputus.

Capsule tidak dapat dimuat.

---

# Postconditions

Setelah flow selesai:

* Capsule berhasil dibuat atau dibuka.
* Status Capsule diperbarui sesuai kondisi.
* Jika Capsule dibuka, satu Relationship Event berhasil dibuat.
* Seluruh isi Capsule tersimpan sebagai arsip permanen.

---

# Business Rules

## Creation Rules

* Capsule hanya dapat dibuat oleh pasangan yang memiliki Relationship aktif.
* Setiap Capsule wajib memiliki Open Date.
* Minimal terdapat satu konten di dalam Capsule.
* Capsule dapat berisi lebih dari satu jenis konten.

---

## Opening Rules

* Capsule tidak dapat dibuka sebelum Open Date.
* Setelah Open Date tercapai, status berubah menjadi **Ready to Open**.
* Membuka Capsule menghasilkan satu Relationship Event.
* Capsule yang telah dibuka tidak dapat dikunci kembali.

---

## History Rules

* Seluruh Capsule tetap tersimpan meskipun telah dibuka.
* Capsule yang telah dibuka dapat dilihat kembali kapan saja.
* Riwayat Capsule diurutkan berdasarkan tanggal pembukaan.

---

# Related Features

* Dashboard
* Notification
* Relationship Event
* Memory
* Important Days

---

# Previous Flow

* UF-03 Dashboard

---

# Next Flow

* UF-11 Dream Board

---

# References

* 02_FEATURE_SPECIFICATION.md
* features/time_capsule.md
* 09_RELATIONSHIP_EVENT.md
