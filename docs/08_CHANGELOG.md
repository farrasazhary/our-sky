# 08_CHANGELOG.md

# Changelog

Dokumen ini mencatat setiap perubahan penting selama pengembangan proyek
**OurSky**. Tujuannya agar seluruh perubahan fitur, database, API,
maupun perbaikan bug terdokumentasi dengan baik.

------------------------------------------------------------------------

## Format Penulisan

``` text
## [Versi] - YYYY-MM-DD

### Added
- Fitur baru

### Changed
- Perubahan fitur atau implementasi

### Fixed
- Perbaikan bug

### Removed
- Fitur yang dihapus
```

------------------------------------------------------------------------

# Version History

## \[0.1.0\] - Initial Planning

### Added

-   Dokumen Project Overview
-   Product Requirement
-   Feature Specification
-   User Flow
-   UI Guideline
-   Database Design
-   Conceptual ERD
-   Logical ERD
-   Physical ERD (DBML)
-   API Contract
-   AI Prompt Guideline

### Changed

-   Finalisasi struktur database menjadi 13 entitas.
-   Menetapkan React + Vite, Express.js, dan MySQL sebagai teknologi
    utama.

### Fixed

-   Perbaikan struktur DBML agar kompatibel dengan parser dbdiagram.io.

------------------------------------------------------------------------

# Release Rules

## Major (X.0.0)

Digunakan jika terdapat perubahan besar yang memengaruhi arsitektur atau
kompatibilitas.

Contoh: - Migrasi framework. - Perubahan besar struktur database.

## Minor (0.X.0)

Digunakan saat menambahkan fitur baru tanpa merusak fitur lama.

Contoh: - Menambahkan fitur Dream. - Menambahkan Time Capsule.

## Patch (0.0.X)

Digunakan untuk perbaikan bug atau penyempurnaan kecil.

Contoh: - Memperbaiki validasi. - Optimasi query. - Perbaikan tampilan.

------------------------------------------------------------------------

# Catatan

-   Setiap perubahan penting harus dicatat sebelum merge atau commit
    utama.
-   Changelog menjadi referensi perkembangan proyek selama pengerjaan
    skripsi.
-   Hindari menghapus riwayat perubahan; tambahkan entri versi baru di
    bagian atas.
