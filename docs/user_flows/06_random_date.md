# User Flow: Random Date

> **Flow ID:** UF-06
> **Flow Type:** Daily Flow
> **Status:** Draft
> **Version:** 1.1
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna dalam menggunakan fitur **Random Date**.

Random Date membantu pasangan menemukan aktivitas sederhana yang dapat dilakukan bersama untuk menciptakan momen baru.

Setiap aktivitas yang pernah dijalankan akan disimpan dalam **Random Date History**, sehingga pasangan dapat melihat kembali perjalanan dan pengalaman yang telah mereka lakukan bersama.

Flow dimulai ketika pengguna membuka Random Date dan berakhir ketika aktivitas selesai atau pengguna kembali ke Dashboard.

---

# Random Date Principles

Random Date mengikuti prinsip berikut:

* Satu aktivitas dipilih untuk satu Relationship pada satu waktu.
* Aktivitas dipilih secara acak berdasarkan kategori yang tersedia.
* Aktivitas tidak boleh terlalu sering berulang.
* Pengguna dapat meminta aktivitas baru (Refresh) dengan batas tertentu.
* Relationship Event hanya dibuat setelah aktivitas dinyatakan selesai.
* Aktivitas yang selesai disimpan dalam Random Date History.
* Setelah aktivitas selesai, pasangan dianjurkan menyimpan Memory dari momen tersebut.

---

# Actors

## Primary Actors

* User A
* User B

## Supporting System

* Random Date Service
* Relationship Event Service
* Memory Service

---

# Preconditions

Sebelum flow dimulai:

* Pengguna telah login.
* Relationship aktif.
* Pengguna membuka fitur Random Date.

---

# Trigger

Flow dimulai ketika pengguna memilih menu **Random Date** dari Dashboard.

---

# Main Flow

## 1. Open Random Date

Pengguna membuka halaman Random Date.

↓

## 2. Generate Activity

Sistem memilih satu aktivitas yang sesuai.

Informasi yang ditampilkan:

* Activity Title
* Description
* Category
* Duration
* Difficulty
* Mood
* LDR Friendly
* Equipment (jika diperlukan)

↓

## 3. User Reviews Activity

Pengguna membaca detail aktivitas.

Pilihan yang tersedia:

* Start Activity
* Refresh Activity

↓

## 4. Start Activity

Pengguna memilih **Start Activity**.

Status aktivitas berubah menjadi **In Progress**.

↓

## 5. Complete Activity

Setelah aktivitas selesai, salah satu pengguna memilih **Mark as Completed**.

↓

## 6. Activity Completed

Sistem:

* Menandai aktivitas selesai.
* Membuat Relationship Event.
* Menyimpan aktivitas ke Random Date History.
* Menampilkan ucapan selamat.

↓

## 7. Save Memory (Optional)

Sistem menawarkan pengguna untuk menyimpan Memory dari aktivitas yang baru selesai.

Pengguna dapat langsung menuju fitur Memory.

↓

## 8. View Random Date History (Optional)

Pengguna dapat membuka halaman **History** untuk melihat seluruh aktivitas yang pernah dilakukan bersama.

↓

## 9. Return to Dashboard

Pengguna kembali ke Dashboard.

Flow selesai.

---

# Flow Diagram

```text
Dashboard
      │
      ▼
Random Date
      │
      ▼
Generate Activity
      │
      ▼
Review Activity
      │
 ┌────┴────┐
 │         │
 ▼         ▼
Refresh   Start
 │         │
 └────┬────┘
      ▼
Activity In Progress
      │
      ▼
Complete Activity
      │
      ▼
Relationship Event
      │
      ▼
Random Date History
      │
      ▼
Save Memory (Optional)
      │
      ▼
Dashboard
```

---

# Activity Information

Setiap aktivitas minimal memiliki informasi berikut:

* Title
* Description
* Category
* Duration
* Difficulty
* Mood
* LDR Friendly
* Equipment

Contoh:

**Movie Night**

* Category: Entertainment
* Duration: 2 Hours
* Difficulty: Easy
* Mood: Relaxing
* LDR Friendly: Yes

---

# Random Date History

Random Date History menyimpan seluruh aktivitas yang pernah dilakukan oleh Relationship.

Riwayat ini membantu pasangan melihat kembali pengalaman yang telah mereka jalani bersama.

Setiap riwayat minimal menampilkan:

* Activity Title
* Completion Date
* Category
* Status
* Optional Note (Future)

Contoh tampilan:

```text
Random Date History

✔ Movie Night
12 July 2026

✔ Cook Together
19 July 2026

⏭ Stargazing
Skipped

✔ Virtual Museum Tour
24 July 2026
```

History dapat digunakan sebagai referensi untuk menghindari aktivitas yang terlalu sering berulang.

---

# Alternative Flows

## A1. Refresh Activity

Pengguna merasa aktivitas kurang sesuai.

Sistem menghasilkan aktivitas lain.

Jumlah Refresh mengikuti batas yang ditentukan sistem.

---

## A2. Skip Activity

Pengguna memutuskan untuk tidak menjalankan aktivitas.

Aktivitas dicatat dengan status **Skipped** pada History.

Relationship Event tidak dibuat.

---

## A3. Open Existing Activity

Apabila masih ada aktivitas yang sedang berjalan (**In Progress**), sistem menampilkan aktivitas tersebut alih-alih membuat aktivitas baru.

---

## A4. View Activity History

Pengguna membuka halaman History untuk melihat seluruh aktivitas yang pernah dilakukan bersama.

---

# Exception Flows

## E1. No Activity Available

Tidak ada aktivitas yang memenuhi kriteria.

Sistem meminta pengguna mencoba kembali nanti.

---

## E2. Refresh Limit Reached

Pengguna telah mencapai batas Refresh harian.

Sistem menampilkan informasi bahwa aktivitas berikutnya dapat diperoleh pada hari berikutnya.

---

## E3. Connection Lost

Koneksi terputus saat memperbarui status aktivitas.

Sistem meminta pengguna mencoba kembali.

---

# Postconditions

Setelah flow selesai:

* Aktivitas berada pada status **Completed** atau **Skipped**.
* Random Date History diperbarui.
* Relationship Event dibuat apabila aktivitas selesai.
* Pengguna dapat melanjutkan ke fitur Memory untuk menyimpan momen dari aktivitas tersebut.

---

# Business Rules

## Random Date Rules

* Sistem hanya memiliki satu aktivitas aktif untuk setiap Relationship.
* Aktivitas dipilih secara acak berdasarkan kategori.
* Aktivitas yang sama tidak boleh muncul terlalu sering.
* Refresh dibatasi sesuai kebijakan sistem.
* Relationship Event hanya dibuat ketika aktivitas selesai.
* Aktivitas yang di-skip tidak membuat Relationship Event.
* Aktivitas Completed dan Skipped disimpan pada Random Date History.
* Pengguna dapat langsung membuat Memory setelah aktivitas selesai.

---

# Related Features

* Dashboard
* Memory
* Relationship Event
* Constellation

---

# Previous Flow

* UF-03 Dashboard

---

# Next Flow

* UF-05 Memory *(Opsional, setelah aktivitas selesai)*
* Kembali ke UF-03 Dashboard

---

# References

* 02_FEATURE_SPECIFICATION.md
* features/random_date.md
* features/memory.md
* 09_RELATIONSHIP_EVENT.md
