# User Flow: Dashboard

> **Flow ID:** UF-03
> **Flow Type:** Core Flow
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna ketika membuka Dashboard OurSky.

Dashboard merupakan pusat aktivitas aplikasi yang menampilkan ringkasan Relationship, aktivitas harian, navigasi menuju seluruh fitur utama, serta berbagai informasi penting yang relevan bagi pengguna.

Flow ini dimulai setiap kali pengguna berhasil login atau kembali ke Dashboard.

---

# Dashboard Principles

Dashboard OurSky mengikuti prinsip berikut:

* Dashboard adalah pusat navigasi aplikasi.
* Informasi yang ditampilkan harus relevan dengan kondisi Relationship saat ini.
* Aktivitas harian menjadi prioritas utama.
* Pengguna dapat mengakses seluruh fitur utama dari Dashboard.
* Dashboard harus tetap sederhana, nyaman, dan tidak terasa penuh.

---

# Actors

## Primary Actor

* Connected User

## Supporting System

* Dashboard Service
* Relationship Service
* Notification Service

---

# Preconditions

Sebelum flow dimulai:

* Pengguna telah login.
* Pengguna memiliki Relationship aktif.
* Relationship dalam status Connected.

---

# Trigger

Flow dimulai ketika:

* Pengguna berhasil login.
* Pengguna membuka aplikasi.
* Pengguna kembali dari halaman fitur lain.
* Pengguna menekan logo atau tombol Home.

---

# Main Flow

## 1. Open Dashboard

Pengguna membuka Dashboard.

↓

## 2. Load Relationship Summary

Sistem menampilkan informasi Relationship, seperti:

* Nama pasangan
* Foto profil pasangan
* Lama Relationship
* Sapaan personal

↓

## 3. Load Daily Summary

Dashboard memuat informasi yang berkaitan dengan hari ini.

Contohnya:

* Today's Question
* Today's Memory
* Countdown terdekat
* Important Day terdekat
* Aktivitas Random Date (jika ada)

↓

## 4. Display Feature Navigation

Dashboard menampilkan akses menuju seluruh fitur utama.

Pengguna dapat memilih salah satu fitur berikut:

* Constellation
* Question
* Memory
* Random Date
* Countdown
* Important Days
* Time Capsule
* Dream Board *(Future)*
* Open When *(Future)*

↓

## 5. Navigate to Feature

Pengguna memilih salah satu fitur.

Sistem membuka halaman fitur yang dipilih.

↓

## 6. Return to Dashboard

Setelah selesai menggunakan fitur, pengguna kembali ke Dashboard.

Dashboard diperbarui apabila terdapat perubahan data.

Flow selesai.

---

# Flow Diagram

```text
Login
      │
      ▼
Open Dashboard
      │
      ▼
Load Relationship Summary
      │
      ▼
Load Daily Summary
      │
      ▼
Display Feature Navigation
      │
      ▼
Choose Feature
      │
      ▼
Feature Screen
      │
      ▼
Return to Dashboard
```

---

# Dashboard Sections

Dashboard terdiri dari beberapa bagian utama.

## Relationship Summary

Menampilkan informasi singkat mengenai Relationship.

Contoh:

* Partner
* Together Since
* Relationship Duration

---

## Daily Activities

Menampilkan aktivitas yang dapat dilakukan hari ini.

* Today's Question
* Today's Memory
* Random Date

---

## Upcoming

Menampilkan informasi mendatang.

* Countdown
* Important Days
* Time Capsule yang akan dibuka

---

## Navigation

Akses menuju seluruh fitur utama.

---

# Alternative Flows

## A1. User Opens Dashboard Multiple Times

Dashboard selalu memuat data terbaru.

---

## A2. User Returns from Feature

Dashboard memperbarui bagian yang berubah tanpa memuat ulang seluruh halaman.

---

# Exception Flows

## E1. Relationship Not Found

Relationship tidak ditemukan.

Pengguna diarahkan ke Relationship Flow.

---

## E2. Failed to Load Dashboard

Apabila data gagal dimuat, sistem menampilkan halaman kesalahan beserta tombol **Try Again**.

---

## E3. Internet Connection Lost

Dashboard tetap ditampilkan dengan data terakhir yang tersedia apabila memungkinkan, kemudian meminta pengguna mencoba kembali saat koneksi pulih.

---

# Postconditions

Setelah flow selesai:

* Dashboard berhasil ditampilkan.
* Informasi Relationship telah diperbarui.
* Aktivitas harian telah dimuat.
* Pengguna dapat mengakses seluruh fitur utama.

---

# Business Rules

## Dashboard Rules

* Dashboard hanya dapat diakses oleh pengguna yang telah login.
* Dashboard harus menampilkan data sesuai kondisi Relationship saat ini.
* Dashboard menjadi titik kembali (Home) dari seluruh fitur.
* Aktivitas harian selalu diprioritaskan dibanding informasi lainnya.
* Informasi yang telah berubah harus diperbarui ketika pengguna kembali ke Dashboard.

---

# Related Features

* Relationship
* Question
* Memory
* Random Date
* Countdown
* Important Days
* Time Capsule
* Constellation
* Dream Board
* Open When
* Notification

---

# Previous Flow

* UF-02 Relationship

---

# Next Flows

* UF-04 Question
* UF-05 Memory
* UF-06 Random Date
* UF-07 Countdown
* UF-08 Important Days
* UF-09 Constellation
* UF-10 Time Capsule
* UF-11 Dream Board
* UF-12 Open When

---

# References

* 01_PRODUCT_REQUIREMENT.md
* 02_FEATURE_SPECIFICATION.md
* features/dashboard.md
