# User Flow: Notification

> **Flow ID:** UF-13
> **Flow Type:** System Flow
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna dalam menggunakan fitur **Notification**.

Notification bertugas menyampaikan informasi penting kepada pengguna berdasarkan aktivitas Relationship, pembaruan fitur, serta berbagai peristiwa yang terjadi di dalam aplikasi.

Notification berfungsi sebagai penghubung antar fitur sehingga pengguna tidak melewatkan momen penting dalam perjalanan Relationship.

---

# Notification Principles

Notification mengikuti prinsip berikut:

* Notification dihasilkan oleh suatu event.
* Notification tidak pernah dibuat secara manual oleh pengguna.
* Setiap Notification memiliki kategori.
* Notification dapat dibaca kembali kapan saja.
* Notification tidak mengubah data Relationship.
* Notification hanya memberikan informasi dan mengarahkan pengguna ke fitur terkait.

---

# Actors

## Primary Actors

* User A
* User B

## Supporting System

* Notification Service
* Relationship Event Service
* Dashboard Service

---

# Preconditions

Sebelum flow dimulai:

* Pengguna telah login.
* Relationship aktif.

---

# Trigger

Salah satu fitur menghasilkan event yang memerlukan pemberitahuan kepada pengguna.

---

# Main Flow

## 1. Event Occurs

Sistem menerima event dari salah satu fitur.

↓

## 2. Generate Notification

Notification dibuat berdasarkan jenis event.

↓

## 3. Save Notification

Notification disimpan pada Notification Center.

↓

## 4. Deliver Notification

Sistem mengirimkan Notification kepada pengguna.

↓

## 5. User Opens Notification

Pengguna memilih Notification.

↓

## 6. Navigate to Related Feature

Sistem membuka halaman yang berkaitan dengan Notification.

↓

## 7. Mark as Read

Notification ditandai sebagai telah dibaca.

↓

## 8. Return

Pengguna kembali ke Dashboard.

Flow selesai.

---

# Flow Diagram

```text
Feature Event
      │
      ▼
Generate Notification
      │
      ▼
Save Notification
      │
      ▼
Deliver Notification
      │
      ▼
Notification Center
      │
      ▼
Open Notification
      │
      ▼
Related Feature
      │
      ▼
Mark as Read
```

---

# Notification Sources

Notification dapat berasal dari berbagai fitur.

Contoh:

* Today's Question
* Memory
* Random Date
* Time Capsule
* Dream Board
* Open When
* Important Days
* Relationship Event

---

# Notification Categories

Notification dikelompokkan berdasarkan kategori.

Kategori bawaan:

* ❤️ Relationship
* ❓ Question
* 📷 Memory
* 🎯 Random Date
* 🎁 Time Capsule
* 💌 Open When
* 🌙 Dream Board
* 🎉 Important Day
* 🌟 Milestone
* ⚙️ System

Kategori digunakan untuk filtering pada Notification Center.

---

# Notification Center

Seluruh Notification disimpan pada Notification Center.

Contoh:

```text
🔴 Your Time Capsule is ready.

🟢 Your partner answered today's Question.

🔵 Tomorrow is your Anniversary.

🟣 Dream "Visit Japan" has been completed.
```

Notification terbaru ditampilkan di bagian atas daftar.

---

# Notification Status

| Status | Description  |
| ------ | ------------ |
| Unread | Belum dibaca |
| Read   | Sudah dibaca |

---

# Notification Detail

Saat Notification dipilih, sistem akan:

* Menandai Notification sebagai Read.
* Membuka halaman fitur terkait.
* Menampilkan informasi yang relevan.

---

# Alternative Flows

## A1. Open Multiple Notifications

Pengguna membuka beberapa Notification secara berurutan.

---

## A2. Filter Notifications

Pengguna memfilter Notification berdasarkan kategori.

---

## A3. Mark All as Read

Pengguna menandai seluruh Notification sebagai telah dibaca.

---

# Exception Flows

## E1. Failed Delivery

Notification gagal dikirim.

Sistem mencoba mengirim ulang sesuai mekanisme internal.

---

## E2. Connection Lost

Notification tidak dapat dimuat karena koneksi terputus.

---

# Postconditions

Setelah flow selesai:

* Notification berhasil dibuat.
* Notification tersimpan pada Notification Center.
* Notification dikirim kepada pengguna.
* Jika dibuka, Notification berubah menjadi **Read**.

---

# Business Rules

## Generation Rules

* Notification hanya dibuat oleh sistem.
* Setiap Notification berasal dari satu event.
* Setiap Notification memiliki satu kategori.
* Notification harus memiliki waktu pembuatan.

---

## Reading Rules

* Notification berubah menjadi **Read** ketika dibuka.
* Notification tetap tersimpan meskipun telah dibaca.
* Notification dapat dibuka kembali kapan saja.

---

## Navigation Rules

* Notification harus mengarahkan pengguna ke fitur yang relevan.
* Notification tidak boleh mengubah data Relationship.

---

## History Rules

* Notification diurutkan berdasarkan waktu terbaru.
* Notification lama tetap dapat diakses sebagai riwayat.
* Riwayat Notification tidak memengaruhi Relationship Event.

---

# Related Features

* Dashboard
* Relationship Event
* Question
* Memory
* Random Date
* Time Capsule
* Dream Board
* Open When
* Important Days

---

# Previous Flow

* UF-12 Open When

---

# Next Flow

* UF-14 Relationship Event

---

# References

* 02_FEATURE_SPECIFICATION.md
* features/notification.md
* 09_RELATIONSHIP_EVENT.md
