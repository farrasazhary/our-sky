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

## [1.0.0-beta] - 2026-07-26 (First Beta Release)

### Added
- **Progressive Web App (PWA)**: Dukungan PWA full-featured via `vite-plugin-pwa`, Service Worker (`sw.js`), dan Web App Manifest (`manifest.webmanifest`).
- **System Push Notifications**: Notifikasi resmi OS (HP & Desktop) via `useNotificationListener` untuk aktivitas pasangan real-time.
- **Set Ikon PWA High Resolution**: Integrasi ikon berbintang `OurSkyNewIcon.jpeg` (192x192, 512x512, Apple Touch Icon, & Favicon).
- **Banner & Tombol Pemasangan PWA**: Banner melayang `InstallPwaPrompt.tsx` dan tombol "Install OurSky App" di halaman Settings.
- **Kompresi Gambar Dual-Layer WebP**: Kompresi foto memori harian (~50KB per foto) menggunakan HTML5 Canvas di frontend dan Sharp engine di backend Express.
- **Sistem Auto Deployment VPS**: Skrip `deploy.sh` dan konfigurasi Nginx (`oursky.farrasazhary.my.id.conf`) untuk deployment 1-click di VPS dengan HTTPS.

### Changed
- **Pemberitahuan Notifikasi Cancel vs Decline**: Membedakan pesan notifikasi pembatalan ide kencan acak oleh pengusul ("Date Proposal Canceled 🚫") vs penolakan pasangan ("Date Idea Declined 💔").
- **Tampilan Profile & Cover Banner**: Mengatur ulang tata letak foto cover banner, presisi nickame 100% center di bawah avatar, dan pembacaan tanggal jadian `startedAt`.
- **Restrukturisasi Port Server**: Mengubah port default backend dari `5000` ke `5050` untuk menghindari konflik port di VPS.

### Fixed
- **Pertanyaan Harian Question of the Day**: Perbaikan pembacaan riwayat jawaban pasangan dan rotasi pertanyaan harian `dayOfYear` setiap 24 jam.
- **Scroll Overlapping Profile Banner**: Memperbaiki `z-index` header sticky (`z-30`) dan tombol kamera (`z-0`) agar tidak saling menimpa saat di-scroll.
- **PWA Mobile Oversscroll Navbar**: Mengunci posisi Bottom Navigation (`fixed bottom-0 left-1/2 -translate-x-1/2 max-w-md w-full z-50`) agar tidak tenggelam saat di-scroll paksa di HP.

------------------------------------------------------------------------

## [0.1.0] - Initial Planning

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
-   Menetapkan React + Vite, Express.js, dan MySQL sebagai teknologi utama.

### Fixed

-   Perbaikan struktur DBML agar kompatibel dengan parser dbdiagram.io.

------------------------------------------------------------------------

# Release Rules

## Major (X.0.0)

Digunakan jika terdapat perubahan besar yang memengaruhi arsitektur atau kompatibilitas.

Contoh: - Migrasi framework. - Perubahan besar struktur database.

## Minor (0.X.0)

Digunakan saat menambahkan fitur baru tanpa merusak fitur lama.

Contoh: - Menambahkan fitur Dream. - Menambahkan Time Capsule.

## Patch (0.0.X)

Digunakan untuk perbaikan bug atau penyempurnaan kecil.

Contoh: - Memperbaiki validasi. - Optimasi query. - Perbaikan tampilan.

------------------------------------------------------------------------

# Catatan

-   Setiap perubahan penting harus dicatat sebelum merge atau commit utama.
-   Changelog menjadi referensi perkembangan proyek selama pengerjaan skripsi.
-   Hindari menghapus riwayat perubahan; tambahkan entri versi baru di bagian atas.
