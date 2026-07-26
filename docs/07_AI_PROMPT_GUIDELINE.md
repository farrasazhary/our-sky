# 07_AI_PROMPT_GUIDELINE.md

# AI Prompt Guideline

## Tujuan

Dokumen ini menjadi standar penggunaan AI selama pengembangan **OurSky**
agar hasil kode konsisten, mudah dipelihara, dan sesuai dengan
arsitektur proyek.

------------------------------------------------------------------------

# Tech Stack

-   Frontend : React + Vite
-   Styling : Tailwind CSS
-   Backend : Node.js + Express.js
-   Database : MySQL

------------------------------------------------------------------------

# Aturan Umum

-   Jangan mengubah struktur folder tanpa diminta.
-   Ikuti API Contract pada `06_API_SPEC.md`.
-   Ikuti struktur database pada `05_DATABASE_DESIGN.md`.
-   Tulis kode yang mudah dibaca.
-   Berikan komentar hanya jika diperlukan.

------------------------------------------------------------------------

# Template Prompt

## Membuat Komponen React

``` text
Buat komponen React menggunakan Functional Component.
Gunakan Tailwind CSS.
Pisahkan logic dan UI jika diperlukan.
```

------------------------------------------------------------------------

## Membuat Halaman

``` text
Buat halaman sesuai desain Figma.
Gunakan React + Vite.
Gunakan komponen yang reusable.
```

------------------------------------------------------------------------

## Membuat Express Controller

``` text
Buat Express Controller sesuai endpoint pada 06_API_SPEC.md.
Gunakan async/await.
Gunakan try/catch.
Kembalikan response sesuai format API.
```

------------------------------------------------------------------------

## Membuat Service

``` text
Pisahkan business logic ke dalam service.
Controller hanya menerima request dan mengirim response.
```

------------------------------------------------------------------------

## Membuat Query Database

``` text
Gunakan MySQL.
Ikuti struktur tabel pada 05_DATABASE_DESIGN.md.
Jangan mengubah skema database.
```

------------------------------------------------------------------------

## Refactoring

``` text
Refactor kode tanpa mengubah perilaku aplikasi.
Tingkatkan keterbacaan dan kurangi duplikasi.
```

------------------------------------------------------------------------

## Debugging

``` text
Analisis penyebab error.
Jelaskan akar masalah.
Berikan solusi beserta perubahan kode yang diperlukan.
```

------------------------------------------------------------------------

## Code Review Checklist

-   Apakah sesuai API Contract?
-   Apakah sesuai Database Design?
-   Apakah nama variabel jelas?
-   Apakah ada duplikasi kode?
-   Apakah mudah dipelihara?
-   Apakah ada potensi bug?

------------------------------------------------------------------------

# Prinsip Vibe Coding

1.  Implementasikan satu fitur hingga selesai.
2.  Commit setelah satu fitur stabil.
3.  Hindari perubahan besar pada banyak modul sekaligus.
4.  Gunakan AI untuk mempercepat implementasi, bukan menggantikan proses
    review.
5.  Semua perubahan penting dicatat pada `08_CHANGELOG.md`.

------------------------------------------------------------------------

# Workflow

``` text
Pilih fitur
      ↓
Baca Requirement
      ↓
Baca API Spec
      ↓
Implementasi
      ↓
Testing
      ↓
Commit
      ↓
Update Changelog
```
