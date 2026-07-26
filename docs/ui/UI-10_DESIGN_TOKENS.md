# UI-10 Design Tokens

> **Document ID:** UI-10
> **Document Type:** Design System
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan Design Tokens yang digunakan sebagai sumber nilai teknis untuk seluruh antarmuka OurSky.

Design Tokens menjadi acuan bersama antara tim Design dan Development sehingga seluruh implementasi memiliki konsistensi visual.

Nilai detail dapat berkembang seiring iterasi desain, tetapi struktur token harus tetap konsisten.

---

# Design Token Philosophy

Seluruh nilai visual harus berasal dari Design Tokens.

Komponen tidak diperbolehkan menggunakan nilai yang ditulis langsung (hardcoded) apabila token yang sesuai telah tersedia.

---

# Token Categories

Design Tokens dibagi menjadi beberapa kategori:

* Color
* Typography
* Spacing
* Border Radius
* Elevation
* Shadow
* Opacity
* Icon
* Motion
* Breakpoint
* Z-Index

---

# Color Tokens

Seluruh warna harus menggunakan Semantic Color.

Contoh kategori:

* Primary
* Secondary
* Surface
* Background
* Text
* Success
* Warning
* Error
* Info

Nilai warna akan mengacu pada Theme Palette.

---

# Typography Tokens

Typography menggunakan token untuk:

* Font Family
* Font Size
* Font Weight
* Line Height
* Letter Spacing

Semua komponen menggunakan token ini.

---

# Spacing Tokens

Gunakan sistem spacing yang konsisten.

Kategori:

* XS
* SM
* MD
* LG
* XL
* XXL

Nilai numerik akan ditentukan pada Theme Palette / Implementation.

---

# Radius Tokens

Kategori radius:

* None
* Small
* Medium
* Large
* Extra Large
* Full

Digunakan pada:

* Card
* Button
* Avatar
* Dialog
* Chip

---

# Shadow Tokens

Kategori shadow:

* None
* Small
* Medium
* Large

Shadow digunakan untuk memberikan hierarki visual, bukan dekorasi.

---

# Elevation Tokens

Kategori:

* Level 0
* Level 1
* Level 2
* Level 3
* Level 4

Elevation menentukan kedalaman visual suatu komponen.

---

# Opacity Tokens

Kategori:

* Disabled
* Overlay
* Hover
* Pressed

Digunakan secara konsisten di seluruh aplikasi.

---

# Icon Tokens

Token ikon mencakup:

* Small
* Medium
* Large

Seluruh ikon mengikuti ukuran yang telah ditentukan.

---

# Motion Tokens

Motion menggunakan token untuk:

* Duration Fast
* Duration Normal
* Duration Slow

Serta kategori easing:

* Ease In
* Ease Out
* Ease In Out

---

# Breakpoint Tokens

Breakpoint digunakan untuk Responsive Design.

Kategori:

* Small Mobile
* Standard Mobile
* Large Mobile
* Tablet
* Desktop

Nilai spesifik ditentukan saat implementasi.

---

# Z-Index Tokens

Digunakan untuk mengatur urutan layer.

Kategori:

* Base Content
* Sticky Component
* App Bar
* Bottom Navigation
* Bottom Sheet
* Dialog
* Modal
* Toast
* Tooltip

---

# Semantic Naming

Gunakan nama berdasarkan fungsi.

Contoh yang benar:

* Primary
* Error
* Surface
* Background

Bukan:

* Blue
* Green
* Red

Hal ini memudahkan perubahan tema tanpa mengubah nama token.

---

# Token Usage Rules

* Gunakan token pada seluruh komponen.
* Hindari nilai hardcoded.
* Gunakan semantic naming.
* Pertahankan konsistensi antar platform.

---

# Theme Support

Design Tokens harus mendukung:

* Light Theme
* Dark Theme

Di masa depan dapat diperluas menjadi tema musiman atau tema khusus tanpa mengubah struktur token.

---

# Implementation Strategy

Design Tokens akan menjadi sumber untuk:

* Figma Variables
* Tailwind CSS Configuration
* CSS Variables
* React Theme Provider

Dengan demikian seluruh platform menggunakan nilai yang sama.

---

# Versioning

Perubahan token harus:

* Didokumentasikan.
* Memiliki versi.
* Memperhatikan kompatibilitas dengan komponen yang sudah ada.

---

# Future Enhancements

Ke depan Design Tokens dapat dikembangkan untuk mendukung:

* Dynamic Theme
* Seasonal Theme
* Brand Theme
* High Contrast Theme
* AMOLED Theme

---

# Relationship with Other Documents

Dokumen ini berkaitan dengan:

* UI-02 Color System
* UI-03 Typography
* UI-04 Spacing & Layout
* UI-05 Components
* UI-07 Motion & Animation
* UI-08 Responsive
* UI-09 Accessibility
* UI-12 Theme Palette (Future)

---

# References

* Design Tokens Community Group
* Material Design 3
* Apple Human Interface Guidelines
* W3C Design Tokens Community Group
