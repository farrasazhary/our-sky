# UI-04 Spacing & Layout

> **Document ID:** UI-04
> **Document Type:** Design System
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan sistem spacing, layout, grid, dan pengaturan visual dasar yang digunakan pada seluruh antarmuka aplikasi **OurSky**.

Tujuan utama dokumen ini adalah memastikan seluruh halaman memiliki struktur yang konsisten, rapi, mudah dipahami, dan nyaman digunakan di berbagai ukuran layar.

---

# Layout Philosophy

Layout pada OurSky harus terasa:

* Bersih
* Lapang
* Terstruktur
* Mudah dipindai
* Tidak melelahkan mata

Setiap elemen harus memiliki ruang yang cukup agar konten menjadi fokus utama.

---

# Layout Principles

## Consistency

Gunakan nilai spacing yang sama untuk kebutuhan yang sama.

---

## Predictability

Posisi komponen harus mudah diprediksi oleh pengguna.

---

## Breathing Space

Berikan ruang kosong (white space) yang cukup agar tampilan tidak terasa penuh.

---

## Content First

Layout harus mendukung konten, bukan mengalihkan perhatian darinya.

---

# Spacing Scale

Gunakan satu skala spacing di seluruh aplikasi.

Contoh skala:

```text
4
8
12
16
20
24
32
40
48
64
```

Seluruh margin, padding, gap, dan jarak antar komponen harus mengacu pada skala ini.

---

# Margin

Margin digunakan untuk memberikan jarak antar komponen.

Prinsip:

* Margin antar section lebih besar daripada margin antar komponen.
* Hindari margin yang tidak konsisten.
* Gunakan spacing scale sebagai acuan.

---

# Padding

Padding digunakan untuk memberikan ruang di dalam komponen.

Contoh penggunaan:

* Button
* Card
* Dialog
* Bottom Sheet
* Input
* Navigation

Padding harus proporsional terhadap ukuran komponen.

---

# Grid System

OurSky menggunakan layout berbasis grid yang fleksibel.

Prinsip:

* Grid membantu menjaga konsistensi.
* Komponen harus mengikuti grid.
* Hindari penempatan elemen secara acak.

---

# Container

Container digunakan sebagai pembatas area konten.

Container harus:

* Memberikan margin yang konsisten terhadap tepi layar.
* Menjaga kenyamanan membaca.
* Menyesuaikan ukuran layar.

---

# Section Layout

Setiap halaman terdiri dari beberapa section.

Contoh:

* Header
* Content
* Footer

Jarak antar section harus lebih besar dibandingkan jarak antar elemen di dalam section.

---

# Card Layout

Card merupakan komponen utama dalam OurSky.

Setiap Card harus memiliki:

* Padding internal yang konsisten.
* Jarak antar Card yang seragam.
* Tinggi yang menyesuaikan isi.
* Sudut membulat sesuai Design System.

---

# Form Layout

Form mengikuti aturan berikut:

* Label berada dekat dengan Input.
* Jarak antar Input konsisten.
* Error Message berada tepat di bawah Input.
* Tombol aksi ditempatkan pada posisi yang mudah dijangkau.

---

# List Layout

Daftar data harus:

* Mudah dipindai.
* Memiliki jarak antar item yang konsisten.
* Menggunakan divider hanya jika diperlukan.

---

# Navigation Layout

Navigasi harus:

* Konsisten di seluruh aplikasi.
* Mudah dijangkau oleh ibu jari pada perangkat mobile.
* Tidak menghalangi konten utama.

---

# Empty State Layout

Empty State terdiri dari:

* Illustration
* Title
* Description
* Primary Action

Seluruh elemen disusun secara vertikal dengan jarak yang proporsional.

---

# Dialog Layout

Dialog terdiri dari:

* Title
* Content
* Action Button

Gunakan padding yang cukup agar isi dialog mudah dibaca.

---

# Bottom Sheet Layout

Bottom Sheet digunakan untuk:

* Pilihan cepat
* Konfirmasi
* Form sederhana

Bottom Sheet harus:

* Mudah ditutup.
* Tidak menutupi seluruh layar kecuali diperlukan.

---

# Border Radius

Gunakan radius yang konsisten pada seluruh komponen.

Border Radius diterapkan pada:

* Button
* Card
* Input
* Dialog
* Bottom Sheet
* Badge
* Chip

Hindari penggunaan radius yang berbeda-beda tanpa alasan yang jelas.

---

# Elevation

Gunakan elevation hanya untuk menunjukkan hierarki visual.

Prioritas penggunaan:

* Modal
* Dialog
* Floating Action Button
* Dropdown

Hindari penggunaan shadow yang berlebihan.

---

# Visual Density

OurSky menggunakan **Comfortable Density**.

Karakteristiknya:

* Tidak terlalu rapat.
* Tidak terlalu renggang.
* Nyaman digunakan dalam sesi penggunaan yang panjang.

---

# Responsive Layout

Layout harus mampu beradaptasi pada:

* Mobile (Prioritas utama)
* Tablet
* Desktop (Future)

Perubahan ukuran layar tidak boleh mengubah pola navigasi utama secara drastis.

---

# Safe Area

Pastikan layout memperhatikan:

* Status Bar
* Navigation Bar
* Notch
* Rounded Screen Corner

Konten penting tidak boleh tertutup oleh area sistem perangkat.

---

# Design Rules

* Gunakan spacing scale yang telah ditetapkan.
* Hindari penempatan elemen yang terlalu rapat.
* Gunakan white space sebagai bagian dari desain.
* Seluruh halaman harus memiliki ritme visual yang konsisten.

---

# Future Enhancements

Layout System dapat dikembangkan untuk mendukung:

* Foldable Device
* Desktop Layout
* Split View
* Landscape Optimization

---

# Relationship with Other Documents

Dokumen ini menjadi acuan bagi:

* UI-05 Components
* UI-08 Responsive
* UI-10 Design Tokens
* UI-11 Page Templates

---

# References

* Material Design 3 – Layout
* Apple Human Interface Guidelines
* WCAG Accessibility Guidelines
