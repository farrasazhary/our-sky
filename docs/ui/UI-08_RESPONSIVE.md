# UI-08 Responsive

> **Document ID:** UI-08
> **Document Type:** Design System
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan standar Responsive Design yang digunakan pada aplikasi **OurSky**.

Tujuannya adalah memastikan seluruh halaman, komponen, dan interaksi tetap memberikan pengalaman yang konsisten pada berbagai ukuran layar tanpa mengubah identitas visual aplikasi.

Responsive Design bukan hanya tentang memperkecil atau memperbesar tampilan, tetapi memastikan pengalaman pengguna tetap nyaman pada setiap perangkat.

---

# Responsive Philosophy

OurSky dirancang dengan pendekatan:

**Mobile First**

Seluruh pengalaman utama dirancang terlebih dahulu untuk perangkat mobile, kemudian dikembangkan untuk layar yang lebih besar.

---

# Design Principles

## Mobile First

Seluruh desain dimulai dari ukuran layar mobile.

Desktop merupakan pengembangan dari desain mobile, bukan sebaliknya.

---

## Progressive Enhancement

Semakin besar layar, semakin banyak ruang yang dapat dimanfaatkan.

Namun fitur utama tetap memiliki perilaku yang sama.

---

## Consistency

Navigasi, komponen, dan pola interaksi tetap konsisten pada seluruh perangkat.

---

## Comfortable Reading

Panjang baris, ukuran teks, dan ruang kosong harus tetap nyaman dibaca.

---

# Supported Devices

Versi saat ini mendukung:

* Smartphone (Prioritas utama)
* Tablet

Versi Desktop disiapkan sebagai pengembangan di masa depan.

---

# Screen Categories

Kategori ukuran layar:

* Small Mobile
* Standard Mobile
* Large Mobile
* Tablet
* Desktop (Future)

Nilai teknis breakpoint akan ditentukan pada **UI-10 Design Tokens**.

---

# Layout Behavior

## Mobile

Karakteristik:

* Single Column
* Bottom Navigation
* Full Width Content
* Thumb Friendly

---

## Tablet

Karakteristik:

* Ruang lebih luas
* Card dapat ditampilkan dalam beberapa kolom
* Margin lebih besar
* Ilustrasi memiliki ukuran lebih besar

---

## Desktop (Future)

Karakteristik:

* Sidebar Navigation
* Multi Column Layout
* Expanded Content Area
* Keyboard Friendly

---

# Navigation Strategy

## Mobile

Gunakan:

* Bottom Navigation
* App Bar
* Bottom Sheet

---

## Tablet

Gunakan:

* Bottom Navigation
* Expanded Content

---

## Desktop

Rencana:

* Sidebar
* Top Navigation
* Multi Panel Layout

---

# Grid System

Layout menggunakan sistem grid yang fleksibel.

Grid harus:

* Mudah beradaptasi.
* Konsisten.
* Mengikuti Design Tokens.

---

# Flexible Components

Komponen harus dapat menyesuaikan ukuran tanpa mengubah fungsi.

Contoh:

* Card
* Dialog
* Input
* Button
* Image

---

# Responsive Images

Gambar harus:

* Menyesuaikan ukuran layar.
* Tetap proporsional.
* Tidak terpotong secara ekstrem.
* Dioptimalkan untuk performa.

---

# Responsive Typography

Typography harus:

* Tetap mudah dibaca.
* Menyesuaikan ruang yang tersedia.
* Mempertahankan hirarki visual.

---

# Responsive Spacing

Spacing mengikuti ukuran layar.

Layar yang lebih besar dapat memiliki:

* Margin lebih besar.
* Padding lebih besar.
* White Space lebih luas.

---

# Responsive Cards

Card harus:

* Fleksibel.
* Tidak memiliki tinggi tetap.
* Menyesuaikan isi.

Pada Tablet dan Desktop, Card dapat disusun dalam beberapa kolom.

---

# Responsive Dialog

Dialog harus:

* Mudah dibaca.
* Tidak memenuhi seluruh layar kecuali memang diperlukan.
* Menyesuaikan ukuran perangkat.

---

# Responsive Forms

Form harus:

* Mudah diisi menggunakan sentuhan.
* Label tetap terbaca.
* Tombol aksi mudah dijangkau.

---

# Responsive Tables

Apabila tabel digunakan pada masa depan:

* Gunakan horizontal scrolling jika diperlukan.
* Hindari memaksa seluruh kolom tampil pada layar kecil.

---

# Orientation

OurSky mendukung:

* Portrait
* Landscape

Seluruh halaman harus tetap dapat digunakan pada kedua orientasi tersebut.

---

# Safe Area

Layout harus memperhatikan:

* Notch
* Status Bar
* Navigation Bar
* Rounded Corner

Konten penting tidak boleh berada pada area sistem perangkat.

---

# Responsive Rules

* Jangan menyembunyikan fitur penting hanya karena ukuran layar.
* Hindari ukuran tombol yang terlalu kecil.
* Gunakan ruang tambahan secara efektif pada layar besar.
* Pertahankan pengalaman pengguna yang konsisten.

---

# Future Enhancements

Responsive System dapat dikembangkan untuk mendukung:

* Foldable Devices
* Desktop Web
* Split Screen
* Multi Window
* External Display

---

# Relationship with Other Documents

Dokumen ini mengacu pada:

* UI-03 Typography
* UI-04 Spacing & Layout
* UI-05 Components
* UI-09 Accessibility
* UI-10 Design Tokens
* UI-11 Page Templates

---

# References

* Material Design 3 – Responsive Layout
* Apple Human Interface Guidelines
* WCAG Accessibility Guidelines
