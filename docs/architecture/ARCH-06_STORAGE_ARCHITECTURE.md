# ARCH-06 Storage Architecture

> **Document ID:** ARCH-06
> **Document Type:** Storage Architecture
> **Status:** Final
> **Version:** 2.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan arsitektur penyimpanan berkas (Storage Architecture) pada aplikasi **OurSky**.

Storage digunakan untuk menyimpan seluruh aset non-relasional seperti gambar, dokumen, dan berkas lain yang tidak sesuai disimpan di dalam database.

Dokumen ini menjadi pedoman dalam pengelolaan file agar aman, efisien, dan mudah dikembangkan.

---

# Objectives

Storage Architecture dirancang untuk:

* Menyimpan file secara aman.
* Memisahkan data file dari database.
* Mempermudah pengelolaan aset.
* Mendukung skalabilitas.
* Memudahkan migrasi penyimpanan di masa depan.

---

# Storage Principles

## Database is Not File Storage

Database hanya menyimpan metadata file.

Contoh metadata:

* File ID
* File Name
* MIME Type
* File Size
* Storage Path
* Uploaded By
* Created At

Konten file disimpan pada media penyimpanan (storage).

---

## Single Source of Truth

Setiap file hanya memiliki satu lokasi penyimpanan.

Database menyimpan referensi terhadap lokasi file tersebut.

---

## Storage Abstraction

Backend menjadi satu-satunya komponen yang berkomunikasi dengan media penyimpanan.

Frontend tidak boleh mengetahui lokasi fisik penyimpanan file.

---

# Storage Flow

```text
Client
   │
Upload File
   │
Backend
   │
Validation
   │
Storage Service
   │
File Storage
   │
Metadata Database
```

---

# Supported File Types

Versi awal aplikasi mendukung:

* JPG
* JPEG
* PNG
* WEBP

Jenis file lain dapat ditambahkan pada pengembangan berikutnya.

---

# File Validation

Setiap file yang diunggah harus melalui proses validasi.

Validasi meliputi:

* Ukuran maksimum.
* Jenis file.
* MIME Type.
* Ekstensi file.

File yang tidak memenuhi aturan akan ditolak.

---

# File Naming Strategy

Nama file yang disimpan tidak menggunakan nama asli pengguna.

Contoh:

```text
8d7f2d54-92e8-4c8d-a6a4.webp
```

Strategi ini menghindari konflik nama dan meningkatkan keamanan.

---

# Directory Structure

Contoh struktur penyimpanan:

```text
storage/
├── profile/
├── memories/
├── dream-board/
├── time-capsule/
├── attachments/
└── temporary/
```

Setiap kategori file memiliki direktori tersendiri.

---

# File Metadata

Database hanya menyimpan informasi berikut:

* File ID
* Original Name
* Stored Name
* MIME Type
* File Size
* Storage Path
* Uploaded By
* Created At

---

# Access Strategy

Seluruh akses file dilakukan melalui backend.

Alur akses:

```text
Client
   │
Request File
   │
Backend
   │
Permission Check
   │
Storage
   │
Response
```

Backend bertanggung jawab memverifikasi hak akses sebelum file dikirimkan.

---

# Security Principles

Storage mengikuti prinsip berikut:

* Validasi tipe file.
* Validasi ukuran file.
* Penamaan file acak.
* Pemeriksaan hak akses.
* Tidak mengeksekusi file yang diunggah pengguna.

---

# Backup Strategy

Backup file dilakukan secara berkala.

Strategi backup harus memastikan sinkronisasi antara metadata database dan file fisik.

---

# Future Enhancements

Storage Architecture mendukung pengembangan untuk:

* Cloud Storage (AWS S3, Google Cloud Storage, Cloudflare R2)
* CDN
* Image Compression
* Automatic Thumbnail Generation
* Versioning
* File Encryption

---

# Relationship with Other Documents

Dokumen ini berkaitan dengan:

* ARCH-03 Backend Architecture
* ARCH-04 Database Architecture
* ARCH-09 Security Architecture

---

# References

* OWASP File Upload Cheat Sheet
* Object Storage Best Practices
* REST API File Upload Guidelines
