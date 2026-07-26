# User Flow: Dream Board

> **Flow ID:** UF-11
> **Flow Type:** Feature Flow
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna dalam menggunakan fitur **Dream Board**.

Dream Board memungkinkan pasangan menyusun, mengelola, dan mewujudkan impian bersama dalam satu tempat.

Setiap impian yang berhasil diselesaikan akan menjadi bagian dari perjalanan Relationship melalui **Relationship Event**.

Dream Board tidak hanya berfungsi sebagai daftar keinginan, tetapi juga sebagai ruang untuk membangun masa depan Relationship secara bersama.

---

# Dream Board Principles

Dream Board mengikuti prinsip berikut:

* Dream dibuat untuk masa depan.
* Dream dapat dibuat oleh salah satu atau kedua pasangan.
* Setiap Dream memiliki status perkembangan.
* Dream dapat diperbarui hingga selesai.
* Dream yang selesai akan menjadi Relationship Event.
* Dream yang telah selesai tetap menjadi arsip permanen.

---

# Actors

## Primary Actors

* User A
* User B

## Supporting System

* Dream Board Service
* Relationship Event Service

---

# Preconditions

Sebelum flow dimulai:

* Pengguna telah login.
* Relationship aktif.

---

# Trigger

Pengguna membuka menu **Dream Board** dari Dashboard.

---

# Main Flow

## 1. Open Dream Board

Pengguna membuka halaman Dream Board.

↓

## 2. View Dream List

Sistem menampilkan seluruh Dream yang dimiliki Relationship.

↓

## 3. Create Dream

Pengguna membuat Dream baru.

↓

## 4. Fill Dream Information

Pengguna mengisi informasi Dream.

Minimal meliputi:

* Title
* Description
* Category

↓

## 5. Set Progress

Pengguna menentukan progress awal.

↓

## 6. Save Dream

Sistem menyimpan Dream.

Status menjadi:

**Planned**

↓

## 7. Update Dream

Pengguna dapat memperbarui:

* Progress
* Description
* Status

↓

## 8. Complete Dream

Ketika Dream selesai, pengguna menandai sebagai **Completed**.

↓

## 9. Create Relationship Event

Sistem membuat satu Relationship Event.

↓

## 10. Return

Pengguna kembali ke Dashboard.

Flow selesai.

---

# Flow Diagram

```text
Dashboard
      │
      ▼
Dream Board
      │
      ▼
View Dreams
      │
      ▼
Create Dream
      │
      ▼
Fill Information
      │
      ▼
Save
      │
      ▼
Planned
      │
      ▼
Update Progress
      │
      ▼
Completed
      │
      ▼
Relationship Event
      │
      ▼
Dashboard
```

---

# Dream Information

Setiap Dream minimal memiliki informasi berikut.

* Dream Title
* Description
* Category
* Progress
* Status
* Created Date
* Last Updated

---

# Dream Categories

Dream dapat dikelompokkan berdasarkan kategori.

Kategori bawaan:

* ✈️ Travel
* 🏡 Home
* 💰 Finance
* 🎓 Education
* 💼 Career
* ❤️ Relationship
* 🎯 Custom

Kategori digunakan untuk mempermudah pencarian dan filtering.

---

# Dream Status

Setiap Dream memiliki status.

| Status      | Description       |
| ----------- | ----------------- |
| Planned     | Baru dibuat       |
| In Progress | Sedang diwujudkan |
| Completed   | Berhasil dicapai  |

---

# Dream Progress

Setiap Dream memiliki progress perkembangan.

Progress dapat diperbarui kapan saja.

Contoh:

```text
Visit Japan 🇯🇵

██████░░░░

60%
```

Progress membantu pasangan melihat perkembangan menuju impian mereka.

---

# Dream History

Seluruh Dream tetap tersimpan meskipun telah selesai.

Contoh:

```text
✈️ Visit Japan
Completed

🏡 Buy First House
In Progress

🎓 Graduate Together
Completed
```

---

# Alternative Flows

## A1. Update Progress

Pengguna memperbarui progress tanpa mengubah status.

---

## A2. Edit Dream

Pengguna memperbarui informasi Dream sebelum selesai.

---

## A3. View Completed Dreams

Pengguna melihat seluruh Dream yang telah selesai.

---

# Exception Flows

## E1. Failed Saving

Dream gagal disimpan.

Pengguna dapat mencoba kembali.

---

## E2. Connection Lost

Dream tidak dapat dimuat karena koneksi terputus.

---

# Postconditions

Setelah flow selesai:

* Dream berhasil dibuat atau diperbarui.
* Progress tersimpan.
* Jika Dream selesai, Relationship Event berhasil dibuat.
* Seluruh Dream tetap tersimpan sebagai arsip.

---

# Business Rules

## Creation Rules

* Dream hanya dapat dibuat oleh pasangan yang memiliki Relationship aktif.
* Setiap Dream wajib memiliki Title.
* Setiap Dream memiliki satu kategori.
* Progress awal adalah **0%**.
* Status awal adalah **Planned**.

---

## Progress Rules

* Progress dapat diperbarui kapan saja.
* Progress berada pada rentang **0% hingga 100%**.
* Progress tidak otomatis mengubah status.

---

## Completion Rules

* Dream hanya dapat berstatus **Completed** jika progress mencapai **100%**.
* Menyelesaikan Dream menghasilkan satu Relationship Event.
* Dream yang telah selesai tetap dapat dilihat kembali.

---

## History Rules

* Seluruh Dream disimpan sebagai arsip permanen.
* Dream diurutkan berdasarkan pembaruan terakhir secara default.
* Completed Dream tetap muncul pada daftar Dream.

---

# Related Features

* Dashboard
* Relationship Event
* Constellation
* Notification

---

# Previous Flow

* UF-10 Time Capsule

---

# Next Flow

* UF-12 Open When

---

# References

* 02_FEATURE_SPECIFICATION.md
* features/dream_board.md
* 09_RELATIONSHIP_EVENT.md
