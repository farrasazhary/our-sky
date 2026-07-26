# User Flow: Relationship Event

> **Flow ID:** UF-14
> **Flow Type:** Core System Flow
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan alur pembentukan dan pengelolaan **Relationship Event** sebagai pusat seluruh aktivitas di dalam OurSky.

Relationship Event merupakan representasi dari setiap momen penting yang terjadi selama perjalanan Relationship.

Relationship Event menjadi **Single Source of Truth** yang digunakan oleh berbagai fitur seperti Constellation, Notification, Timeline, Statistics, dan fitur lain yang akan dikembangkan di masa depan.

---

# Relationship Event Principles

Relationship Event mengikuti prinsip berikut:

* Relationship Event hanya dibuat oleh sistem.
* Relationship Event tidak dapat dibuat secara manual oleh pengguna.
* Setiap Relationship Event berasal dari satu aktivitas yang valid.
* Relationship Event bersifat permanen.
* Relationship Event tidak dapat diedit.
* Relationship Event hanya dapat dihapus apabila sumber event dihapus.
* Relationship Event menjadi pusat integrasi seluruh fitur.

---

# Actors

## Primary Actors

* User A
* User B

## Supporting System

* Relationship Event Service
* Notification Service
* Constellation Service

---

# Preconditions

Sebelum flow dimulai:

* Relationship aktif.
* Salah satu fitur menghasilkan aktivitas yang memenuhi syarat.

---

# Trigger

Terjadi aktivitas yang memenuhi aturan pembentukan Relationship Event.

---

# Main Flow

## 1. Feature Activity

Pengguna melakukan aktivitas pada salah satu fitur.

↓

## 2. Validate Event Rule

Sistem memeriksa apakah aktivitas tersebut memenuhi syarat untuk membuat Relationship Event.

↓

## 3. Generate Relationship Event

Jika valid, sistem membuat Relationship Event baru.

↓

## 4. Save Event

Relationship Event disimpan sebagai arsip permanen.

↓

## 5. Notify Related Services

Relationship Event dikirim ke layanan lain.

* Constellation
* Notification
* Statistics (Future)
* Timeline (Future)

↓

## 6. Update Visualizations

Fitur yang bergantung pada Relationship Event memperbarui tampilannya.

↓

Flow selesai.

---

# Flow Diagram

```text id="w8j5eh"
Feature Activity
       │
       ▼
Validate Rule
       │
       ▼
Generate Relationship Event
       │
       ▼
Save Event
       │
       ▼
Notify Services
       │
       ▼
Constellation
Notification
Statistics
Timeline
```

---

# Event Sources

Relationship Event dapat berasal dari berbagai fitur.

| Feature        | Generate Event                                |
| -------------- | --------------------------------------------- |
| Question       | Setelah kedua pasangan menjawab               |
| Memory         | Saat Memory pertama pada hari tersebut dibuat |
| Random Date    | Saat aktivitas diselesaikan                   |
| Time Capsule   | Saat Capsule dibuka                           |
| Dream Board    | Saat Dream selesai                            |
| Open When      | Saat surat dibuka                             |
| Important Days | Saat tanggal event tercapai                   |
| Milestone      | Saat milestone otomatis tercapai              |

---

# Event Categories

Relationship Event memiliki kategori.

Kategori bawaan:

* ❤️ Relationship
* 📷 Memory
* ❓ Question
* 🎯 Random Date
* 🎁 Time Capsule
* 🌙 Dream Board
* 💌 Open When
* 🎉 Important Day
* 🌟 Milestone

Kategori digunakan oleh:

* Constellation
* Notification
* Timeline
* Statistics

---

# Event Information

Minimal informasi yang dimiliki setiap Relationship Event:

* Event ID
* Relationship ID
* Source Feature
* Category
* Title
* Description
* Event Date
* Created At

Relationship Event tidak menyimpan data lengkap dari fitur asal, melainkan menjadi referensi terhadap data tersebut.

---

# Event Lifecycle

```text id="jjlwm8"
Feature Activity
        │
        ▼
Relationship Event Created
        │
        ▼
Permanent Archive
```

Relationship Event tidak memiliki proses edit.

---

# Event Consumers

Relationship Event digunakan oleh berbagai fitur.

| Consumer            | Purpose                         |
| ------------------- | ------------------------------- |
| Constellation       | Membentuk Star                  |
| Notification        | Menghasilkan Notification       |
| Timeline (Future)   | Menampilkan kronologi           |
| Statistics (Future) | Analisis aktivitas Relationship |

---

# Alternative Flows

## A1. Activity Does Not Meet Rules

Aktivitas tidak memenuhi syarat.

Relationship Event tidak dibuat.

---

## A2. Multiple Activities

Beberapa aktivitas dapat menghasilkan beberapa Relationship Event secara independen.

---

# Exception Flows

## E1. Failed Generation

Relationship Event gagal dibuat.

Sistem mencoba kembali sesuai mekanisme internal.

---

## E2. Connection Lost

Relationship Event gagal disinkronkan ke layanan lain.

Sinkronisasi dilakukan kembali ketika koneksi tersedia.

---

# Postconditions

Setelah flow selesai:

* Relationship Event berhasil dibuat.
* Relationship Event tersimpan sebagai arsip permanen.
* Constellation diperbarui.
* Notification diperbarui.
* Seluruh layanan terkait menerima Event terbaru.

---

# Business Rules

## General Rules

* Relationship Event hanya dibuat oleh sistem.
* Relationship Event tidak dapat dibuat manual.
* Relationship Event tidak dapat diedit.
* Relationship Event hanya dapat dihapus apabila data sumber dihapus.

---

## Generation Rules

Relationship Event dibuat ketika:

* Kedua pasangan menjawab Question.
* Memory pertama pada hari tersebut dibuat.
* Random Date selesai.
* Time Capsule dibuka.
* Dream berhasil diselesaikan.
* Open When dibuka.
* Important Day tercapai.
* Milestone otomatis tercapai.

---

## Integration Rules

Relationship Event menjadi sumber data untuk:

* Constellation
* Notification
* Timeline
* Statistics

Tidak ada fitur yang membuat salinan Relationship Event.

---

## Consistency Rules

* Satu aktivitas hanya menghasilkan satu Relationship Event.
* Relationship Event harus memiliki sumber yang valid.
* Seluruh Relationship Event harus memiliki Relationship ID.

---

# Related Features

* Question
* Memory
* Random Date
* Countdown
* Important Days
* Constellation
* Time Capsule
* Dream Board
* Open When
* Notification

---

# Previous Flow

* UF-13 Notification

---

# Next Flow

* End of User Flow Documentation

---

# References

* 02_FEATURE_SPECIFICATION.md
* 09_RELATIONSHIP_EVENT.md
* features/
