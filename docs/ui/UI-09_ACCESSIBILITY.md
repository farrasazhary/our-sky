# UI-09 Accessibility

> **Document ID:** UI-09
> **Document Type:** Design System
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan standar Accessibility (A11y) pada aplikasi **OurSky**.

Tujuan utama Accessibility adalah memastikan aplikasi dapat digunakan oleh sebanyak mungkin pengguna tanpa mengurangi kenyamanan, kemudahan, maupun pengalaman emosional yang ingin dibangun.

Accessibility merupakan bagian dari kualitas produk, bukan fitur tambahan.

---

# Accessibility Philosophy

OurSky dirancang agar:

* Mudah dipahami.
* Mudah dibaca.
* Mudah dioperasikan.
* Mudah dinavigasi.
* Memberikan pengalaman yang setara kepada seluruh pengguna.

---

# Accessibility Principles

## Perceivable

Informasi harus dapat dipahami melalui berbagai cara.

Pengguna tidak boleh kehilangan informasi hanya karena keterbatasan penglihatan, pendengaran, atau kondisi lingkungan.

---

## Operable

Seluruh fitur harus dapat dioperasikan dengan mudah.

Interaksi tidak boleh bergantung pada satu jenis input saja.

---

## Understandable

Navigasi, istilah, ikon, dan komponen harus memiliki perilaku yang konsisten sehingga mudah dipelajari.

---

## Robust

Aplikasi harus kompatibel dengan teknologi bantu serta perkembangan platform di masa depan.

---

# Readability

Teks harus:

* Mudah dibaca.
* Memiliki kontras yang baik.
* Menggunakan ukuran yang nyaman.
* Tidak terlalu rapat.
* Tidak terlalu panjang dalam satu baris.

---

# Color Accessibility

Warna tidak boleh menjadi satu-satunya cara menyampaikan informasi.

Contoh yang benar:

* Warna + ikon.
* Warna + teks.
* Warna + badge.

Bukan hanya perubahan warna saja.

---

# Contrast

Seluruh teks dan komponen harus memiliki rasio kontras yang memadai sesuai standar WCAG.

Nilai teknis akan ditentukan pada Design Tokens.

---

# Touch Target

Seluruh elemen interaktif harus memiliki area sentuh yang nyaman.

Contoh:

* Button
* Chip
* Switch
* Checkbox
* Navigation

Ukuran minimum ditentukan pada Design Tokens.

---

# Keyboard Navigation

Versi Web dan Desktop harus mendukung:

* Tab Navigation
* Shift + Tab
* Enter
* Escape
* Arrow Key (jika relevan)

Fokus harus berpindah secara logis.

---

# Focus Indicator

Seluruh elemen interaktif harus memiliki indikator fokus yang jelas.

Pengguna harus mengetahui posisi fokus saat menggunakan keyboard.

---

# Screen Reader Support

Seluruh elemen penting harus memiliki label yang dapat dibaca Screen Reader.

Contoh:

* Button
* Input
* Avatar
* Icon Button
* Dialog
* Navigation

---

# Form Accessibility

Setiap form harus memiliki:

* Label.
* Placeholder (opsional, bukan pengganti label).
* Pesan kesalahan yang jelas.
* Petunjuk apabila diperlukan.

---

# Error Message

Pesan kesalahan harus:

* Menjelaskan masalah.
* Menjelaskan cara memperbaiki.
* Menggunakan bahasa yang sederhana.

Contoh:

❌ "Error."

✅ "Kode undangan tidak ditemukan. Periksa kembali atau minta pasangan mengirim ulang."

---

# Motion Accessibility

Animasi harus:

* Dapat dikurangi apabila pengguna mengaktifkan pengaturan "Reduce Motion".
* Tidak menyebabkan ketidaknyamanan.
* Tidak menjadi satu-satunya cara menyampaikan informasi.

---

# Time-Based Interaction

Apabila terdapat batas waktu:

* Pengguna harus diberi informasi.
* Pengguna memiliki kesempatan untuk memperpanjang waktu jika memungkinkan.

---

# Notification Accessibility

Notifikasi harus:

* Mudah dikenali.
* Tidak hanya mengandalkan warna.
* Tidak mengganggu aktivitas utama pengguna.

---

# Icon Accessibility

Ikon yang berdiri sendiri harus memiliki label atau deskripsi yang jelas.

Ikon dekoratif tidak perlu dibaca oleh Screen Reader.

---

# Image Accessibility

Seluruh gambar informatif harus memiliki deskripsi (Alt Text) pada platform yang mendukung.

Gambar dekoratif dapat diabaikan oleh Screen Reader.

---

# Dialog Accessibility

Dialog harus:

* Memindahkan fokus ke dalam dialog saat dibuka.
* Mengembalikan fokus ke elemen sebelumnya saat ditutup.
* Dapat ditutup menggunakan metode yang sesuai (misalnya tombol Close atau Escape pada Web).

---

# Responsive Accessibility

Seluruh fitur harus tetap nyaman digunakan pada:

* Smartphone.
* Tablet.
* Desktop (Future).

Ukuran layar tidak boleh mengurangi akses terhadap fitur utama.

---

# Cognitive Accessibility

Antarmuka harus:

* Menggunakan istilah yang sederhana.
* Menghindari informasi berlebihan.
* Menampilkan satu fokus utama dalam setiap layar.
* Memberikan umpan balik yang jelas setelah pengguna melakukan aksi.

---

# Accessibility Testing

Setiap halaman sebaiknya diuji menggunakan:

* Keyboard Navigation.
* Screen Reader.
* Color Contrast Checker.
* Touch Target Validation.
* Responsive Testing.

---

# Accessibility Checklist

Sebelum halaman dirilis, pastikan:

* Semua Button memiliki label yang jelas.
* Semua Input memiliki label.
* Focus Indicator berfungsi.
* Kontras warna memenuhi standar.
* Error Message mudah dipahami.
* Navigasi konsisten.
* Seluruh aksi dapat dilakukan dengan nyaman.

---

# Compliance Target

OurSky menargetkan kepatuhan terhadap:

* WCAG 2.2 Level AA.

Standar ini menjadi acuan utama dalam pengembangan antarmuka.

---

# Design Rules

* Jangan menyampaikan informasi hanya melalui warna.
* Hindari teks yang terlalu kecil.
* Hindari istilah yang membingungkan.
* Selalu berikan umpan balik setelah aksi pengguna.
* Pastikan seluruh komponen dapat digunakan secara konsisten.

---

# Future Enhancements

Ke depan, Accessibility dapat dikembangkan dengan dukungan untuk:

* Dynamic Font Scaling.
* High Contrast Mode.
* Voice Navigation.
* Keyboard Shortcut.
* Advanced Screen Reader Optimization.

---

# Relationship with Other Documents

Dokumen ini berkaitan dengan:

* UI-02 Color System
* UI-03 Typography
* UI-04 Spacing & Layout
* UI-05 Components
* UI-07 Motion & Animation
* UI-08 Responsive
* UI-10 Design Tokens

---

# References

* WCAG 2.2 Guidelines
* Material Design Accessibility
* Apple Human Interface Guidelines
* Android Accessibility Guidelines
