# 📄 Feature Specification

> **Project:** OurSky
> **Document:** Feature Specification Index
> **Version:** 1.0.0
> **Status:** Approved
> **Last Updated:** July 2026

---

# Purpose

Dokumen ini merupakan **indeks resmi seluruh spesifikasi fitur** pada proyek OurSky.

Dokumen ini **tidak menjelaskan implementasi setiap fitur secara detail**.

Seluruh detail implementasi berada pada folder:

```text
docs/features/
```

Setiap file pada folder tersebut menjadi **single source of truth** untuk fitur yang bersangkutan.

---

# Objectives

Feature Specification dibuat untuk:

* Menjadi daftar seluruh fitur dalam sistem.
* Menentukan prioritas pengembangan.
* Menjelaskan hubungan antar fitur.
* Menjadi referensi utama bagi developer maupun AI sebelum implementasi.
* Memastikan seluruh fitur tetap sesuai dengan Product Requirement dan Kitab Project.

---

# Feature Development Principles

Seluruh fitur harus mengikuti prinsip berikut.

* Setiap fitur harus memiliki tujuan yang jelas.
* Setiap fitur harus memberikan nilai bagi hubungan pengguna.
* Setiap fitur harus bersifat privat.
* Setiap fitur harus sederhana digunakan.
* Setiap fitur harus konsisten dengan filosofi OurSky.

---

# Feature Categories

## Core System

Fitur yang menjadi fondasi aplikasi.

| Feature        | Document                     |
| -------------- | ---------------------------- |
| Authentication | `features/authentication.md` |
| Couple         | `features/couple.md`         |
| Dashboard      | `features/dashboard.md`      |

---

## Core Experience

Fitur utama yang membentuk identitas produk.

| Feature             | Document                     |
| ------------------- | ---------------------------- |
| Constellation       | `features/constellation.md`  |
| Time Capsule        | `features/time_capsule.md`   |
| Little Memory       | `features/memory.md`         |
| Question of the Day | `features/question.md`       |
| Countdown           | `features/countdown.md`      |
| Important Days      | `features/important_days.md` |
| Random Date         | `features/random_date.md`    |

---

## Future Experience

Fitur yang direncanakan setelah MVP.

| Feature            | Document                  |
| ------------------ | ------------------------- |
| Shared Dream Board | `features/dream_board.md` |
| Open When          | `features/open_when.md`   |

---

# Development Priority

## Priority 1

Fondasi sistem.

* Authentication
* Couple
* Dashboard

---

## Priority 2

Core MVP.

* Question of the Day
* Countdown
* Important Days
* Time Capsule

---

## Priority 3

Engagement Features.

* Little Memory
* Random Date
* Basic Constellation

---

## Priority 4

Post MVP.

* Dream Board
* Open When
* Advanced Constellation

---

# Feature Dependency

Seluruh fitur memiliki hubungan satu sama lain.

```text
Authentication
        │
        ▼
     Couple
        │
        ▼
    Dashboard
        │
        ▼
───────────────────────────────
│  Time Capsule               │
│  Question of the Day        │
│  Little Memory             │
│  Countdown                 │
│  Important Days            │
│  Random Date               │
───────────────────────────────
        │
        ▼
  Relationship Events
        │
        ▼
  Constellation
```

Seluruh aktivitas hubungan akan menghasilkan **Relationship Event**.

Relationship Event kemudian digunakan oleh sistem lain seperti:

* Constellation
* Timeline *(future)*
* Achievement *(future)*
* Analytics *(future)*

---

# Feature Status

| Feature             | MVP | Status  |
| ------------------- | --- | ------- |
| Authentication      | ✅   | Planned |
| Couple              | ✅   | Planned |
| Dashboard           | ✅   | Planned |
| Constellation       | ✅   | Planned |
| Time Capsule        | ✅   | Planned |
| Little Memory       | ✅   | Planned |
| Question of the Day | ✅   | Planned |
| Countdown           | ✅   | Planned |
| Important Days      | ✅   | Planned |
| Random Date         | ✅   | Planned |
| Dream Board         | ❌   | Future  |
| Open When           | ❌   | Future  |

---

# Feature Document Structure

Setiap file pada folder `features/` wajib menggunakan struktur yang sama agar mudah dipahami oleh developer maupun AI.

```text
Feature Overview

Purpose

User Story

Functional Requirements

Business Rules

User Flow

UI Components

API Requirements

Database Requirements

Relationship Events

Notifications

Edge Cases

Acceptance Criteria

Future Improvements

References
```

---

# Development Rules

Seluruh implementasi fitur harus mengikuti aturan berikut.

1. Tidak boleh bertentangan dengan Kitab Project.
2. Harus memenuhi Product Requirement.
3. Harus memiliki Business Rules yang jelas.
4. Harus memiliki Acceptance Criteria.
5. Harus mempertimbangkan Edge Cases.
6. Harus mendefinisikan kebutuhan API.
7. Harus mendefinisikan kebutuhan Database.
8. Harus mendefinisikan Relationship Event yang dihasilkan.

---

# Relationship Events

Setiap fitur wajib menentukan apakah menghasilkan Relationship Event.

Contoh:

| Feature      | Event                 |
| ------------ | --------------------- |
| Question     | Question Answered     |
| Memory       | Memory Added          |
| Time Capsule | Capsule Created       |
| Countdown    | Countdown Created     |
| Random Date  | Date Activity Started |
| Dream Board  | Dream Completed       |

Relationship Event akan digunakan oleh sistem lain tanpa perlu mengubah logika fitur utama.

---

# References

Dokumen ini bergantung pada:

* `00_KITAB_PROJECT.md`
* `01_PRODUCT_REQUIREMENT.md`

Detail implementasi setiap fitur berada pada folder:

```text
docs/features/
```

Dokumen arsitektur yang mendukung implementasi fitur berada pada folder:

```text
docs/architecture/
```

Keputusan teknis proyek berada pada folder:

```text
docs/decisions/
```

---

# Notes

Feature Specification Index merupakan pusat navigasi seluruh fitur OurSky.

Seluruh implementasi harus mengacu pada dokumen ini sebelum membuka spesifikasi fitur masing-masing.
