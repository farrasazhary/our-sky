# ARCH-04 Database Architecture

> **Document ID:** ARCH-04
> **Document Type:** Database Architecture
> **Status:** Final
> **Version:** 2.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan arsitektur database aplikasi **OurSky**.

Database merupakan fondasi utama dalam penyimpanan seluruh data aplikasi, mulai dari informasi pengguna, hubungan (relationship), hingga aktivitas yang dihasilkan oleh setiap fitur.

Dokumen ini menjadi pedoman dalam merancang struktur tabel, relasi data, integritas data, serta strategi pengelolaan database agar tetap konsisten, aman, dan mudah dikembangkan.

---

# Database Goals

Database OurSky dirancang untuk memenuhi tujuan berikut.

* Data Consistency
* Data Integrity
* High Maintainability
* High Readability
* Scalability
* Performance
* Security
* Extensibility

---

# Database Technology

| Component            | Technology         |
| -------------------- | ------------------ |
| Database Engine      | MySQL              |
| Character Set        | UTF8MB4            |
| Collation            | utf8mb4_unicode_ci |
| Time Zone            | UTC                |
| Primary Key Strategy | UUID               |
| ORM / Query Builder  | TBD                |

---

# Architecture Principles

## Single Source of Truth

Setiap data hanya memiliki satu sumber utama.

Contoh:

* Relationship hanya disimpan pada tabel Relationship.
* Memory hanya disimpan pada tabel Memory.
* Countdown berasal dari Important Days.
* Relationship Event menjadi pusat aktivitas sistem.

Tidak diperbolehkan melakukan duplikasi data tanpa alasan yang jelas.

---

## Normalization

Database mengikuti prinsip normalisasi hingga minimal Third Normal Form (3NF).

Tujuan:

* Mengurangi redundansi.
* Menjaga konsistensi data.
* Mempermudah pemeliharaan.

Denormalisasi hanya dilakukan apabila terdapat kebutuhan performa yang dapat dibuktikan.

---

## Referential Integrity

Seluruh relasi antar tabel dijaga menggunakan Foreign Key.

Apabila sebuah data memiliki ketergantungan terhadap data lain, maka integritas relasinya harus dipastikan oleh database maupun aplikasi.

---

## Soft Delete

Data penting tidak langsung dihapus dari database.

Sebagai gantinya digunakan kolom:

* deleted_at

Pendekatan ini memungkinkan proses audit serta pemulihan data apabila diperlukan.

---

# High-Level Data Model

```text
User
   │
   ▼
Relationship
   │
   ├──────────────┐
   ▼              ▼
Relationship Event
   │
   ├── Memory
   ├── Question
   ├── Random Date
   ├── Important Day
   ├── Dream Board
   ├── Open When
   └── Time Capsule
```

Relationship menjadi pusat kepemilikan data, sedangkan Relationship Event menjadi pusat aktivitas aplikasi.

---

# Database Layers

```text
Application
      │
      ▼
Repository
      │
      ▼
MySQL Database
      │
      ▼
Tables
      │
      ▼
Indexes
```

Database tidak diakses secara langsung oleh aplikasi selain melalui Repository.

---

# Entity Organization

Database dikelompokkan menjadi beberapa domain utama.

## User Domain

* users
* user_sessions
* user_preferences

---

## Relationship Domain

* relationships
* relationship_invitations

---

## Activity Domain

* relationship_events
* notifications

---

## Feature Domain

* memories
* questions
* random_dates
* important_days
* countdowns
* dream_boards
* open_when
* time_capsules

---

## System Domain

* audit_logs
* migrations

---

# Primary Key Strategy

Seluruh tabel menggunakan UUID sebagai Primary Key.

Keuntungan:

* Sulit ditebak.
* Aman digunakan pada API.
* Mempermudah sinkronisasi data di masa depan.
* Mendukung distribusi sistem.

---

# Foreign Key Strategy

Setiap relasi antar tabel menggunakan Foreign Key.

Contoh:

```text
relationship_id
      │
      ▼
relationships.id
```

Foreign Key digunakan untuk menjaga integritas referensial antar tabel.

---

# Naming Convention

Penamaan mengikuti standar berikut.

## Table

Menggunakan bentuk jamak.

Contoh:

* users
* relationships
* memories
* notifications

---

## Column

Menggunakan snake_case.

Contoh:

* created_at
* updated_at
* relationship_id
* partner_id

---

## Primary Key

Seluruh tabel menggunakan:

```text
id
```

---

## Foreign Key

Format:

```text
<entity>_id
```

Contoh:

* user_id
* relationship_id
* event_id

---

# Audit Columns

Seluruh tabel wajib memiliki kolom berikut.

```text
created_at
updated_at
deleted_at
```

Khusus tabel tertentu dapat ditambahkan:

* created_by
* updated_by

---

# Index Strategy

Index dibuat pada kolom yang sering digunakan untuk:

* WHERE
* JOIN
* ORDER BY
* UNIQUE

Contoh:

* email
* invitation_code
* relationship_id
* created_at

Index dibuat berdasarkan kebutuhan performa, bukan pada seluruh kolom.

---

# Transaction Strategy

Transaction digunakan untuk operasi yang melibatkan lebih dari satu tabel.

Contoh:

* Membuat Relationship.
* Membuat Memory dan Relationship Event.
* Menghapus Relationship beserta data terkait.

Seluruh operasi harus memenuhi prinsip ACID.

---

# Cascade Strategy

Cascade digunakan secara selektif.

Prinsip:

* Hindari CASCADE DELETE pada data penting.
* Gunakan Soft Delete apabila memungkinkan.
* CASCADE UPDATE diperbolehkan jika aman.

---

# Data Security

Database menerapkan prinsip berikut.

* Password disimpan dalam bentuk hash.
* Data sensitif tidak disimpan dalam bentuk plaintext.
* Seluruh query menggunakan parameterized query.
* Backup dilakukan secara berkala.

---

# Backup and Recovery

Strategi backup meliputi:

* Full Backup
* Incremental Backup
* Recovery Testing

Backup harus dapat digunakan untuk proses pemulihan apabila terjadi kegagalan sistem.

---

# Performance Strategy

Strategi optimasi meliputi:

* Indexing
* Query Optimization
* Pagination
* Lazy Loading Data
* Selective Column Retrieval

Optimasi dilakukan berdasarkan hasil pengukuran performa.

---

# Future Enhancements

Arsitektur database mendukung pengembangan untuk:

* Database Replication
* Read Replica
* Partitioning
* Archiving
* Sharding (jika diperlukan)
* Data Warehouse Integration

---

# Relationship with Other Documents

Dokumen ini berkaitan dengan:

* ARCH-01 System Architecture
* ARCH-03 Backend Architecture
* 05_DATABASE_DESIGN.md
* 06_API_SPEC.md

---

# References

* MySQL Documentation
* Database Normalization (3NF)
* ACID Transaction Principles
* SQL Style Guide
