# ARCH-07 Notification Architecture

> **Document ID:** ARCH-07
> **Document Type:** Notification Architecture
> **Status:** Final
> **Version:** 2.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan arsitektur sistem notifikasi pada aplikasi **OurSky**.

Notification Service bertanggung jawab menyampaikan informasi penting kepada pengguna berdasarkan aktivitas yang terjadi di dalam sistem. Layanan ini bersifat lintas fitur (cross-cutting service) sehingga dapat digunakan oleh seluruh modul aplikasi.

---

# Objectives

Notification Architecture dirancang untuk:

* Menyampaikan informasi secara tepat waktu.
* Mengurangi ketergantungan antar fitur.
* Menjaga konsistensi proses pengiriman notifikasi.
* Mendukung penambahan jenis notifikasi baru.
* Mendukung pengembangan ke berbagai kanal notifikasi.

---

# Architecture Principles

## Event-Driven Notification

Notifikasi tidak dibuat secara langsung oleh Controller.

Sebaliknya, setiap fitur menghasilkan **event bisnis** setelah proses berhasil diselesaikan.

Notification Service kemudian menentukan apakah event tersebut memerlukan notifikasi.

---

## Centralized Notification Service

Seluruh notifikasi diproses oleh satu layanan terpusat.

Contoh fitur yang dapat memicu notifikasi:

* Relationship
* Memory
* Question
* Dream Board
* Time Capsule
* Important Days
* Countdown
* Open When

Dengan pendekatan ini, setiap fitur tidak perlu mengetahui bagaimana notifikasi dikirimkan.

---

## User-Centric Delivery

Notifikasi selalu dikirim kepada pengguna yang menjadi target event.

Setiap notifikasi memiliki:

* Penerima.
* Jenis notifikasi.
* Isi notifikasi.
* Waktu dibuat.
* Status baca.

---

# Notification Flow

```text
Business Event
      │
      ▼
Relationship Event Service
      │
      ▼
Notification Service
      │
      ▼
Notification Repository
      │
      ▼
Database
      │
      ▼
Client
```

Relationship Event menjadi sumber utama aktivitas yang dapat menghasilkan notifikasi.

---

# Notification Sources

Notifikasi dapat berasal dari:

* Invitation Accepted
* Memory Created
* Question Answered
* Dream Completed
* Countdown Reminder
* Important Day Reminder
* Time Capsule Available
* Open When Available

Sumber notifikasi dapat bertambah tanpa mengubah arsitektur utama.

---

# Notification Types

Versi awal mendukung jenis berikut.

## Information

Informasi umum mengenai aktivitas pasangan.

Contoh:

* Memory baru ditambahkan.
* Dream berhasil dibuat.

---

## Reminder

Pengingat terhadap aktivitas yang memiliki waktu tertentu.

Contoh:

* Countdown H-7.
* Countdown H-1.
* Anniversary hari ini.
* Time Capsule siap dibuka.

---

## Relationship

Notifikasi yang berkaitan dengan hubungan pasangan.

Contoh:

* Invitation diterima.
* Relationship berhasil dibuat.

---

# Notification Lifecycle

```text
Business Event
      │
      ▼
Notification Created
      │
      ▼
Unread
      │
      ▼
Read
      │
      ▼
Archived (Optional)
```

Status notifikasi dapat berubah sepanjang siklus hidupnya.

---

# Notification Data

Setiap notifikasi minimal memiliki informasi berikut:

* Notification ID
* User ID
* Relationship ID
* Event ID (opsional)
* Type
* Title
* Message
* Status
* Created At
* Read At

---

# Delivery Strategy

Versi awal aplikasi menggunakan **In-App Notification**.

Notifikasi ditampilkan di dalam aplikasi ketika pengguna membuka OurSky.

Pada versi berikutnya, sistem dapat dikembangkan untuk mendukung:

* Push Notification
* Email Notification
* Web Notification

Tanpa mengubah arsitektur utama.

---

# Scheduler Integration

Beberapa notifikasi dihasilkan oleh Scheduler.

Contoh:

* Countdown Reminder.
* Anniversary Reminder.
* Time Capsule Reminder.

Scheduler akan memicu Notification Service sesuai jadwal yang telah ditentukan.

---

# Relationship Event Integration

Notification Service menggunakan Relationship Event sebagai sumber utama aktivitas.

```text
Feature
    │
    ▼
Relationship Event
    │
    ▼
Notification Service
    │
    ▼
Notification Database
```

Pendekatan ini menjaga konsistensi seluruh aktivitas aplikasi.

---

# Read Status

Setiap notifikasi memiliki status:

* Unread
* Read

Perubahan status hanya dilakukan oleh pengguna yang menerima notifikasi.

---

# Security Principles

Notification mengikuti prinsip berikut:

* Pengguna hanya dapat melihat notifikasi miliknya.
* Notifikasi tidak boleh bocor ke Relationship lain.
* Seluruh akses divalidasi melalui Authentication dan Authorization.

---

# Performance Strategy

Strategi performa meliputi:

* Pagination.
* Lazy Loading.
* Index pada User ID dan Created At.
* Query berdasarkan status baca.

---

# Future Enhancements

Arsitektur ini mendukung pengembangan untuk:

* Push Notification
* Email Notification
* Notification Queue
* Notification Preferences
* Silent Notification
* Scheduled Notification
* Real-Time Notification (WebSocket)

---

# Relationship with Other Documents

Dokumen ini berkaitan dengan:

* ARCH-03 Backend Architecture
* ARCH-04 Database Architecture
* ARCH-05 Authentication & Authorization
* ARCH-11 Monitoring & Logging
* Relationship Event Documentation

---

# References

* Event-Driven Architecture Concepts
* Notification System Best Practices
* REST API Notification Guidelines
