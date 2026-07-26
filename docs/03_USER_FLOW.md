# 03 User Flow

> **Document:** User Flow
> **Version:** 1.0
> **Status:** Draft
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna (User Journey) secara menyeluruh di dalam aplikasi OurSky.

Tujuan utama dokumen ini adalah menjadi panduan bagi seluruh proses desain UI, implementasi frontend, backend, database, serta pengujian aplikasi.

Dokumen ini tidak menjelaskan detail setiap fitur. Detail interaksi masing-masing fitur dijelaskan pada folder `user_flows/`.

---

# Objectives

Dokumen ini bertujuan untuk:

- Menjelaskan pengalaman pengguna dari awal hingga penggunaan jangka panjang.
- Menjadi referensi utama dalam perancangan UI.
- Menjadi acuan implementasi navigasi aplikasi.
- Menjadi dasar penyusunan database dan API.
- Menjaga konsistensi pengalaman pengguna pada seluruh fitur.

---

# User Journey Principles

Seluruh User Flow pada OurSky mengikuti prinsip berikut.

## 1. Relationship First

Seluruh pengalaman pengguna berpusat pada hubungan antara dua orang.

Bukan pada akun pengguna.

---

## 2. Minimal Friction

Setiap tugas utama harus dapat diselesaikan dengan langkah sesedikit mungkin.

---

## 3. Daily Habit

Pengguna didorong untuk kembali menggunakan aplikasi setiap hari melalui aktivitas sederhana.

---

## 4. Emotional Experience

Setiap interaksi dirancang untuk memperkuat hubungan, bukan sekadar menyelesaikan tugas.

---

## 5. Shared Journey

Sebagian besar fitur merupakan pengalaman bersama, bukan pengalaman individual.

---

# Master User Journey

Berikut merupakan perjalanan utama pengguna menggunakan OurSky.

```text
Landing Page

↓

Register

↓

Email Verification

↓

Complete Profile

↓

Create / Join Relationship

↓

Relationship Connected

↓

Dashboard

↓

Daily Activities

↓

Relationship Journey

↓

Long-term Memories
```

---

# Primary User Journeys

OurSky memiliki beberapa perjalanan utama pengguna.

## 1. Onboarding Journey

Perjalanan pengguna sejak pertama kali membuka aplikasi hingga berhasil memiliki akun.

Detail:

`user_flows/onboarding.md`

---

## 2. Relationship Journey

Perjalanan membuat atau bergabung ke dalam Relationship.

Detail:

`user_flows/relationship.md`

---

## 3. Dashboard Journey

Perjalanan pengguna ketika membuka aplikasi setiap hari.

Detail:

`user_flows/dashboard.md`

---

## 4. Daily Activity Journey

Perjalanan pengguna menggunakan fitur-fitur utama setiap hari.

Meliputi:

- Question
- Memory
- Random Date
- Countdown
- Important Days

---

## 5. Feature Journeys

Setiap fitur memiliki User Flow tersendiri.

Lihat folder:

`user_flows/`

---

## 6. Notification Journey

Perjalanan pengguna ketika membuka aplikasi melalui notifikasi.

---

## 7. Relationship Event Journey

Menjelaskan bagaimana aktivitas pengguna menghasilkan Relationship Event yang digunakan oleh berbagai fitur lain.

---

# Navigation Structure

Navigasi utama aplikasi mengikuti struktur berikut.

```text
Dashboard

├── Constellation

├── Question

├── Memory

├── Random Date

├── Countdown

├── Important Days

├── Time Capsule

├── Dream Board

├── Open When

└── Profile
```

---

# Feature Flow Index

Detail User Flow masing-masing fitur tersedia pada folder:

```text
user_flows/

├── onboarding.md

├── relationship.md

├── dashboard.md

├── constellation.md

├── question.md

├── memory.md

├── random_date.md

├── important_days.md

├── countdown.md

├── time_capsule.md

├── dream_board.md

├── open_when.md

├── notification.md

└── relationship_event.md
```

---

# Relationship Event Integration

Sebagian besar fitur menghasilkan Relationship Event.

Relationship Event menjadi sumber data bagi fitur lain seperti:

- Constellation
- Timeline (Future)
- Statistics (Future)
- Achievement (Future)

Diagram lengkap dijelaskan pada:

`architecture/event_system.md`

---

# User Journey Lifecycle

Perjalanan pengguna dalam jangka panjang.

```text
First Day

↓

First Week

↓

First Month

↓

First Year

↓

Years Together
```

Semakin lama Relationship berlangsung, semakin banyak kenangan, aktivitas, dan pencapaian yang tersimpan di dalam aplikasi.

---

# Out of Scope

Dokumen ini tidak membahas:

- UI Design
- Database Design
- API Specification
- Business Rules setiap fitur
- Validasi Form
- Detail implementasi frontend

Seluruh informasi tersebut dijelaskan pada dokumen masing-masing.

---

# References

- 00_KITAB_PROJECT.md
- 01_PRODUCT_REQUIREMENT.md
- 02_FEATURE_SPECIFICATION.md
- features/
- architecture/