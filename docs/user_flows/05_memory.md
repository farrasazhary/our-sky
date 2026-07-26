# User Flow: Memory

> **Flow ID:** UF-05
> **Flow Type:** Daily Flow
> **Status:** Draft
> **Version:** 1.1
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna dalam menggunakan fitur **Memory**.

Memory memungkinkan pasangan menyimpan satu momen terbaik setiap hari dalam bentuk foto dan caption, sehingga perjalanan Relationship terdokumentasi sebagai kumpulan kenangan yang dapat dilihat kembali melalui **Calendar Gallery**.

Flow dimulai ketika pengguna membuka fitur Memory dan berakhir ketika Memory berhasil tersimpan atau diperbarui pada hari tersebut.

---

# Memory Principles

Memory mengikuti prinsip berikut:

* Satu Relationship memiliki satu Memory setiap hari.
* Memory terdiri dari satu foto dan satu caption.
* Memory dapat dibuat oleh salah satu pasangan.
* Memory dapat diperbarui sebelum hari berganti.
* Setelah hari berganti, Memory menjadi permanen.
* Seluruh Memory ditampilkan dalam Calendar Gallery sebagai dokumentasi perjalanan Relationship.

---

# Actors

## Primary Actors

* User A
* User B

## Supporting System

* Memory Service
* Media Storage Service
* Relationship Event Service

---

# Preconditions

Sebelum flow dimulai:

* Pengguna telah login.
* Relationship telah aktif.
* Pengguna membuka halaman Memory.

---

# Trigger

Flow dimulai ketika pengguna:

* Memilih menu **Memory** dari Dashboard.
* Memilih tombol **Add Today's Memory**.

---

# Main Flow

## 1. Open Memory

Pengguna membuka halaman Memory.

Sistem memeriksa apakah Memory untuk hari ini sudah ada.

↓

## 2. Display Today's Status

Jika belum ada Memory:

* Sistem menampilkan Empty State.
* Tombol **Add Today's Memory** ditampilkan.

Jika sudah ada Memory:

* Sistem menampilkan foto dan caption hari ini.
* Tombol **Edit** tersedia selama hari belum berganti.

↓

## 3. Add Memory

Pengguna memilih **Add Today's Memory**.

Sistem membuka formulir Memory.

Field yang tersedia:

* Upload Photo
* Caption

↓

## 4. Submit Memory

Pengguna mengunggah satu foto dan menulis caption.

Kemudian memilih **Save Memory**.

↓

## 5. Memory Saved

Sistem menyimpan Memory.

Apabila ini adalah Memory pertama pada hari tersebut:

* Memory dibuat.
* Relationship Event dibuat.

↓

## 6. Edit Memory (Optional)

Sebelum hari berganti, salah satu pasangan dapat memperbarui:

* Foto
* Caption

Perubahan akan menggantikan Memory hari itu.

Relationship Event tidak dibuat ulang.

↓

## 7. Memory Locked

Saat hari berganti, Memory otomatis dikunci.

Memory tidak dapat diubah lagi.

↓

## 8. View Calendar Gallery

Pengguna membuka Calendar Gallery.

Sistem menampilkan kalender yang berisi seluruh Memory berdasarkan tanggal.

Hari yang memiliki Memory diberi indikator visual.

Pengguna memilih salah satu tanggal untuk melihat:

* Foto
* Caption
* Tanggal Memory

Flow selesai.

---

# Flow Diagram

```text
Dashboard
      │
      ▼
Memory
      │
      ▼
Today's Memory?
      │
 ┌────┴─────┐
 │          │
 ▼          ▼
No        Exists
 │          │
 ▼          ▼
Add      View / Edit
 │          │
 └────┬─────┘
      ▼
Save Memory
      │
      ▼
Memory Saved
      │
      ▼
Calendar Gallery
      │
      ▼
View Memory Detail
```

---

# Calendar Gallery

Calendar Gallery merupakan tampilan utama untuk melihat seluruh Memory.

Setiap hari pada kalender merepresentasikan satu kesempatan untuk menyimpan kenangan.

Hari yang memiliki Memory ditandai dengan indikator visual.

Contoh tampilan:

```text
July 2026

Su Mo Tu We Th Fr Sa

      1📷  2📷  3
 4📷  5📷  6📷  7📷
 8    9📷 10📷 11📷
12📷 13📷 14   15📷
```

Ketika pengguna memilih salah satu tanggal, sistem menampilkan:

* Foto Memory
* Caption
* Tanggal dibuat

Calendar Gallery menjadi arsip perjalanan Relationship dari waktu ke waktu.

---

# Alternative Flows

## A1. Memory Already Exists

Memory hari ini telah dibuat.

Pengguna dapat melihat atau memperbaruinya selama hari belum berganti.

---

## A2. Partner Creates Memory First

Pasangan lebih dahulu membuat Memory.

Pengguna lain langsung melihat Memory tersebut dan dapat memperbaruinya jika diperlukan.

---

## A3. View Previous Memories

Pengguna membuka Calendar Gallery dan memilih tanggal tertentu untuk melihat kembali Memory lama.

---

# Exception Flows

## E1. Photo Upload Failed

Unggahan foto gagal.

Sistem meminta pengguna mencoba kembali.

---

## E2. Invalid File

File tidak memenuhi format atau ukuran yang diizinkan.

Sistem menampilkan pesan kesalahan.

---

## E3. Day Already Locked

Pengguna mencoba mengubah Memory setelah hari berganti.

Sistem menolak perubahan dan menjelaskan bahwa Memory hari tersebut telah dikunci.

---

## E4. Connection Lost

Koneksi terputus saat menyimpan Memory.

Sistem memberi tahu bahwa proses belum berhasil dan pengguna dapat mencoba kembali.

---

# Postconditions

Setelah flow selesai:

* Memory hari itu berhasil tersimpan.
* Calendar Gallery diperbarui.
* Relationship Event dibuat apabila Memory pertama hari itu berhasil dibuat.
* Memory dapat diperbarui hingga hari berganti.
* Setelah hari berganti, Memory menjadi permanen.

---

# Business Rules

## Memory Rules

* Satu Relationship hanya memiliki satu Memory per hari.
* Memory terdiri dari satu foto dan satu caption.
* Memory dapat dibuat oleh salah satu pasangan.
* Memory dapat diperbarui sebelum hari berganti.
* Setelah hari berganti, Memory tidak dapat diubah.
* Relationship Event hanya dibuat saat Memory pertama kali dibuat.
* Perubahan pada Memory tidak membuat Relationship Event baru.
* Calendar Gallery merupakan tampilan utama untuk menampilkan seluruh Memory.

---

# Related Features

* Dashboard
* Constellation
* Relationship Event
* Gallery

---

# Previous Flow

* UF-03 Dashboard

---

# Next Flow

* Kembali ke UF-03 Dashboard

---

# References

* 02_FEATURE_SPECIFICATION.md
* features/memory.md
* 09_RELATIONSHIP_EVENT.md
