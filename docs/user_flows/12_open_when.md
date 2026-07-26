# User Flow: Open When

> **Flow ID:** UF-12
> **Flow Type:** Feature Flow
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna dalam menggunakan fitur **Open When**.

Open When memungkinkan pasangan membuat surat digital yang ditujukan untuk dibuka pada momen atau kondisi tertentu.

Berbeda dengan Time Capsule yang menggunakan tanggal pembukaan, Open When menggunakan situasi atau perasaan sebagai pemicu pengguna untuk membuka surat.

Setiap surat yang telah dibuka akan menjadi bagian dari perjalanan Relationship melalui **Relationship Event**.

---

# Open When Principles

Open When mengikuti prinsip berikut:

* Surat dibuat untuk momen tertentu.
* Setiap surat memiliki satu kondisi pembukaan.
* Surat hanya dapat dibuka satu kali.
* Setelah dibuka, surat tetap dapat dibaca kembali.
* Membuka surat menghasilkan satu Relationship Event.
* Surat menjadi arsip permanen setelah dibuka.

---

# Actors

## Primary Actors

* User A
* User B

## Supporting System

* Open When Service
* Relationship Event Service

---

# Preconditions

Sebelum flow dimulai:

* Pengguna telah login.
* Relationship aktif.

---

# Trigger

Pengguna membuka menu **Open When** dari Dashboard.

---

# Main Flow

## 1. Open Open When

Pengguna membuka halaman Open When.

↓

## 2. View Letter List

Sistem menampilkan seluruh surat yang tersedia.

↓

## 3. Create Letter

Pengguna membuat surat baru.

↓

## 4. Fill Letter

Pengguna mengisi:

* Title
* Message
* Open When Condition

↓

## 5. Save Letter

Sistem menyimpan surat.

Status menjadi:

**Sealed**

↓

## 6. Recipient Views Letter

Pasangan melihat daftar surat yang tersedia.

↓

## 7. Open Letter

Ketika kondisi telah sesuai, pasangan memilih membuka surat.

↓

## 8. Display Letter

Sistem menampilkan isi surat.

↓

## 9. Update Status

Status berubah menjadi:

**Opened**

↓

## 10. Create Relationship Event

Sistem membuat satu Relationship Event.

↓

## 11. Return

Pengguna kembali ke Dashboard.

Flow selesai.

---

# Flow Diagram

```text
Dashboard
      │
      ▼
Open When
      │
      ▼
View Letters
      │
      ▼
Create Letter
      │
      ▼
Write Letter
      │
      ▼
Save
      │
      ▼
Sealed
      │
      ▼
Recipient Opens
      │
      ▼
Display Letter
      │
      ▼
Opened
      │
      ▼
Relationship Event
      │
      ▼
Dashboard
```

---

# Letter Information

Setiap surat minimal memiliki:

* Title
* Message
* Open When Condition
* Sender
* Recipient
* Created Date
* Opened Date

---

# Open When Conditions

Contoh kondisi bawaan:

* ❤️ Open when you miss me.
* 😊 Open when you're happy.
* 😢 Open when you're sad.
* 😡 Open when we're fighting.
* 🎂 Open on your birthday.
* 💼 Open when you get your dream job.
* 🌧️ Open when you're having a bad day.
* 🎯 Custom Condition.

Pengguna dapat memilih kondisi bawaan atau membuat kondisi sendiri.

---

# Letter Status

| Status | Description         |
| ------ | ------------------- |
| Draft  | Sedang dibuat       |
| Sealed | Siap untuk penerima |
| Opened | Sudah dibuka        |

---

# Opening Experience

Saat surat dibuka:

* Amplop digital ditampilkan.
* Animasi pembukaan amplop dijalankan.
* Isi surat ditampilkan.
* Status berubah menjadi **Opened**.

---

# Letter History

Setelah dibuka, surat tetap tersedia pada riwayat.

Contoh:

```text
💌 Open when you miss me
Opened

💌 Open when you're sad
Opened

💌 Open when you get your dream job
Sealed
```

---

# Alternative Flows

## A1. Edit Draft

Pengguna mengubah isi surat sebelum dikirim.

---

## A2. Read Opened Letter

Pengguna membaca kembali surat yang telah dibuka.

---

# Exception Flows

## E1. Failed Saving

Surat gagal disimpan.

Pengguna dapat mencoba kembali.

---

## E2. Connection Lost

Surat tidak dapat dimuat.

---

# Postconditions

Setelah flow selesai:

* Surat berhasil dibuat atau dibuka.
* Status surat diperbarui.
* Jika surat dibuka, Relationship Event berhasil dibuat.
* Surat menjadi arsip permanen.

---

# Business Rules

## Creation Rules

* Surat hanya dapat dibuat oleh pasangan yang memiliki Relationship aktif.
* Setiap surat wajib memiliki Title.
* Setiap surat wajib memiliki Message.
* Setiap surat memiliki satu penerima.
* Setiap surat memiliki satu kondisi pembukaan.
* Status awal adalah **Draft**.

---

## Opening Rules

* Surat hanya dapat dibuka oleh penerima.
* Setelah dibuka, status berubah menjadi **Opened**.
* Surat tidak dapat dikembalikan ke status **Sealed**.
* Membuka surat menghasilkan satu Relationship Event.

---

## History Rules

* Surat yang telah dibuka tetap dapat dibaca kembali.
* Riwayat surat diurutkan berdasarkan tanggal pembukaan.
* Surat yang belum dibuka tetap berada pada daftar dengan status **Sealed**.

---

# Related Features

* Dashboard
* Time Capsule
* Relationship Event
* Notification

---

# Previous Flow

* UF-11 Dream Board

---

# Next Flow

* UF-13 Notification

---

# References

* 02_FEATURE_SPECIFICATION.md
* features/open_when.md
* 09_RELATIONSHIP_EVENT.md
