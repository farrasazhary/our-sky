# UI-02 Color System

> **Document ID:** UI-02
> **Document Type:** Design System
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan sistem warna (Color System) yang digunakan pada seluruh antarmuka aplikasi **OurSky**.

Color System bertujuan untuk menjaga konsistensi visual, meningkatkan keterbacaan, memperkuat identitas merek, serta membantu pengguna memahami status dan aksi melalui penggunaan warna yang tepat.

Seluruh halaman, komponen, dan ilustrasi harus menggunakan warna yang telah ditetapkan dalam dokumen ini.

---

# Design Philosophy

Warna pada OurSky harus menciptakan pengalaman yang:

* Hangat
* Tenang
* Nyaman
* Modern
* Bersih
* Personal

Hindari penggunaan warna yang terlalu mencolok atau memberikan kesan agresif.

---

# Color Palette

## Primary

Digunakan untuk aksi utama.

Contoh penggunaan:

* Primary Button
* Active Navigation
* Progress Indicator
* Link
* Highlight

---

## Secondary

Digunakan sebagai warna pendukung.

Contoh:

* Secondary Button
* Badge
* Tag
* Informasi tambahan

---

## Accent

Digunakan untuk memberikan penekanan visual.

Contoh:

* Celebration
* Highlight khusus
* Decorative Element

Gunakan secara terbatas agar tetap memiliki efek visual yang kuat.

---

# Neutral Colors

Neutral digunakan sebagai dasar tampilan aplikasi.

Kategori:

* Background
* Surface
* Border
* Divider
* Disabled
* Overlay

Neutral harus mendominasi tampilan sehingga konten menjadi fokus utama.

---

# Text Colors

Gunakan hirarki warna teks yang konsisten.

Kategori:

* Primary Text
* Secondary Text
* Tertiary Text
* Disabled Text
* Inverse Text

Pastikan kontras warna memenuhi standar aksesibilitas.

---

# Semantic Colors

Semantic Color digunakan untuk menyampaikan makna.

## Success

Contoh:

* Berhasil menyimpan data.
* Dream berhasil diselesaikan.

---

## Warning

Contoh:

* Data belum lengkap.
* Pengingat.

---

## Error

Contoh:

* Validasi gagal.
* Kesalahan sistem.
* Gagal menghubungkan server.

---

## Information

Contoh:

* Informasi umum.
* Tips.
* Panduan.

---

# Feature Accent Colors

Beberapa fitur utama memiliki warna identitas sendiri untuk memudahkan pengguna mengenali konteks.

| Feature        | Purpose                        |
| -------------- | ------------------------------ |
| Question       | Identitas fitur Question       |
| Memory         | Identitas fitur Memory         |
| Random Date    | Identitas fitur Random Date    |
| Important Days | Identitas fitur Important Days |
| Constellation  | Identitas fitur Constellation  |
| Time Capsule   | Identitas fitur Time Capsule   |
| Dream Board    | Identitas fitur Dream Board    |
| Open When      | Identitas fitur Open When      |

Penggunaan warna identitas hanya sebagai aksen, bukan sebagai warna dominan halaman.

---

# Component Usage

## Button

* Primary → Primary Color
* Secondary → Secondary Color
* Danger → Error Color

---

## Input

Gunakan Border Neutral.

Saat Focus gunakan Primary Color.

Saat Error gunakan Error Color.

---

## Card

Gunakan Surface Color.

Border hanya digunakan apabila diperlukan.

---

## Badge & Chip

Gunakan kombinasi:

* Secondary
* Success
* Warning
* Error
* Information

sesuai konteks.

---

# Elevation Colors

Gunakan Overlay untuk:

* Modal
* Dialog
* Bottom Sheet
* Loading Screen

Overlay tidak boleh mengurangi keterbacaan konten.

---

# Dark Mode

Dark Mode bukan sekadar membalik warna.

Prinsip:

* Tetap nyaman dipandang.
* Kontras tetap tinggi.
* Warna aksen tetap mudah dikenali.
* Hindari penggunaan warna hitam murni.

---

# Accessibility

Semua kombinasi warna harus:

* Mudah dibedakan.
* Tidak bergantung pada warna saja.
* Memiliki kontras yang memadai.
* Tetap dapat dipahami oleh pengguna dengan gangguan penglihatan warna.

---

# Color Naming Convention

Gunakan penamaan yang bersifat semantik.

Contoh:

```text
primary

secondary

accent

background

surface

border

text-primary

text-secondary

success

warning

error

info
```

Hindari penamaan berdasarkan warna fisik seperti:

* blue-01
* pink-light
* red-button

Penamaan semantik mempermudah perubahan tema di masa depan.

---

# Design Rules

* Jangan menggunakan lebih dari satu warna utama dalam satu aksi.
* Gunakan warna sebagai alat komunikasi, bukan dekorasi.
* Prioritaskan keterbacaan dibanding estetika.
* Gunakan warna aksen secara konsisten.
* Hindari penggunaan warna yang terlalu jenuh.

---

# Future Enhancements

Color System dapat dikembangkan untuk mendukung:

* Multiple Theme
* Seasonal Theme
* Event Theme
* Accessibility Theme

tanpa mengubah struktur Design System.

---

# Relationship with Other Documents

Dokumen ini menjadi acuan bagi:

* UI-03 Typography
* UI-04 Spacing & Layout
* UI-05 Components
* UI-07 Motion & Animation
* UI-10 Design Tokens

---

# References

* Material Design 3 – Color System
* WCAG 2.2 Contrast Guidelines
* Apple Human Interface Guidelines
