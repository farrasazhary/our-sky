# User Flow: Important Days

> **Flow ID:** UF-08
> **Flow Type:** Core Flow
> **Status:** Draft
> **Version:** 1.1
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna dalam menggunakan fitur **Important Days**.

Important Days merupakan sumber utama seluruh tanggal penting dalam Relationship.

Data pada fitur ini digunakan oleh fitur lain seperti Countdown, Notification, Relationship Event, dan Constellation.

Flow dimulai ketika pengguna membuka halaman Important Days dan berakhir ketika data berhasil dibuat, diperbarui, dihapus, atau dilihat.

---

# Important Days Principles

Important Days mengikuti prinsip berikut:

* Menjadi sumber data seluruh tanggal penting.
* Mendukung event satu kali maupun berulang.
* Setiap event memiliki kategori.
* Countdown berasal dari Important Days.
* Notification berasal dari Important Days.
* Relationship Event dibuat ketika tanggal penting terjadi.
* Milestone dihitung otomatis berdasarkan Relationship Start Date.

---

# Actors

## Primary Actors

* User A
* User B

## Supporting System

* Important Days Service
* Countdown Service
* Notification Service
* Relationship Event Service

---

# Preconditions

Sebelum flow dimulai:

* Pengguna telah login.
* Relationship aktif.

---

# Trigger

Flow dimulai ketika pengguna membuka menu **Important Days** dari Dashboard.

---

# Main Flow

## 1. Open Important Days

Pengguna membuka halaman Important Days.

↓

## 2. Display Event List

Sistem menampilkan seluruh event berdasarkan tanggal terdekat.

↓

## 3. Add Important Day

Pengguna memilih **Add Event**.

Form terdiri dari:

* Event Name
* Category
* Event Date
* Event Type
* Reminder
* Notes (Optional)

↓

## 4. Save Event

Sistem menyimpan event.

Countdown langsung tersedia secara otomatis.

↓

## 5. Edit Event

Pengguna dapat memperbarui informasi event.

Perubahan langsung memengaruhi Countdown dan Notification.

↓

## 6. Delete Event

Pengguna menghapus event.

Sistem menghapus Countdown yang terkait.

↓

## 7. Automatic Milestone Check

Sistem menghitung apakah Relationship mencapai Milestone baru.

Apabila tercapai:

* Milestone dibuat.
* Relationship Event dibuat.
* Notifikasi dapat dikirim.

↓

## 8. Return

Pengguna kembali ke Dashboard.

Flow selesai.

---

# Flow Diagram

```text
Dashboard
      │
      ▼
Important Days
      │
      ▼
Display Event List
      │
 ┌────┼─────────────┐
 │    │             │
 ▼    ▼             ▼
Add  Edit        Delete
 │    │             │
 └────┴─────────────┘
          │
          ▼
Update Countdown
          │
          ▼
Milestone Check
          │
          ▼
Dashboard
```

---

# Event Categories

Setiap Important Day memiliki salah satu kategori berikut.

| Category        | Contoh                              |
| --------------- | ----------------------------------- |
| ❤️ Relationship | Anniversary, First Meet, First Chat |
| 🎂 Personal     | Birthday                            |
| ✈️ Travel       | First Vacation                      |
| 🎓 Achievement  | Graduation                          |
| 🎉 Celebration  | Valentine's Day, New Year           |
| 📌 Custom       | Event buatan pengguna               |

---

# Event Types

## Recurring

Contoh:

* Birthday
* Anniversary

Countdown akan menggunakan **Recurring Cycle**.

---

## One-Time

Contoh:

* Proposal
* Graduation
* First Vacation

Countdown berhenti setelah event selesai.

---

# Automatic Milestones

Selain event yang dibuat pengguna, sistem juga menghasilkan Milestone otomatis berdasarkan Relationship Start Date.

Contoh:

```text
❤️ Together

100 Days
365 Days
500 Days
1000 Days
1500 Days
2000 Days
```

Milestone tidak dapat diubah maupun dihapus oleh pengguna.

Saat Milestone tercapai:

* Relationship Event dibuat.
* Notification dapat dikirim.
* Constellation diperbarui.

---

# Alternative Flows

## A1. Edit Event

Pengguna memperbarui tanggal atau nama event.

Countdown diperbarui otomatis.

---

## A2. Delete Event

Event dihapus.

Countdown terkait ikut dihapus.

---

## A3. View Upcoming Events

Pengguna hanya melihat daftar event tanpa melakukan perubahan.

---

# Exception Flows

## E1. Duplicate Event

Apabila sistem mendeteksi event identik pada tanggal yang sama, sistem meminta konfirmasi pengguna sebelum menyimpan.

---

## E2. Invalid Date

Tanggal tidak valid.

Sistem menolak penyimpanan.

---

## E3. Connection Lost

Penyimpanan gagal.

Pengguna dapat mencoba kembali.

---

# Postconditions

Setelah flow selesai:

* Important Day berhasil dibuat, diperbarui, atau dihapus.
* Countdown diperbarui.
* Notification diperbarui.
* Milestone diperiksa secara otomatis.
* Relationship Event dibuat jika syarat terpenuhi.

---

# Business Rules

## Important Days Rules

* Important Days merupakan sumber data Countdown.
* Important Days merupakan sumber data Notification.
* Event memiliki Category.
* Event memiliki Type.
* Event Recurring menggunakan Recurring Cycle.
* Event One-Time hanya berlaku satu kali.
* Milestone dihitung otomatis.
* Milestone tidak dapat diedit.
* Relationship Event dibuat ketika event terjadi.
* Relationship Event juga dibuat ketika Milestone tercapai.

---

# Related Features

* Countdown
* Notification
* Constellation
* Relationship Event

---

# Previous Flow

* UF-07 Countdown

---

# Next Flow

* UF-03 Dashboard

---

# References

* 02_FEATURE_SPECIFICATION.md
* features/important_days.md
* features/countdown.md
* 09_RELATIONSHIP_EVENT.md
