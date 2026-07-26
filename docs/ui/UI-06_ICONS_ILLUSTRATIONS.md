# UI-06 Icons & Illustrations

> **Document ID:** UI-06
> **Document Type:** Design System
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan standar penggunaan ikon, ilustrasi, gambar, dan aset visual pada aplikasi **OurSky**.

Tujuan utama dokumen ini adalah menjaga identitas visual agar tetap konsisten, mudah dikenali, serta mendukung pengalaman pengguna yang hangat, sederhana, dan personal.

---

# Design Philosophy

Aset visual OurSky harus membantu pengguna memahami informasi tanpa mengalihkan perhatian dari konten utama.

Visual digunakan untuk memperkuat emosi, bukan sebagai dekorasi semata.

---

# Visual Identity

Karakter visual OurSky adalah:

* Warm
* Calm
* Friendly
* Minimalist
* Elegant
* Modern

Seluruh aset visual harus mencerminkan karakter tersebut.

---

# Icon System

Ikon digunakan untuk membantu pengguna mengenali fungsi dengan cepat.

Ikon bukan pengganti teks, tetapi pendukung informasi.

---

# Icon Style

Gunakan gaya ikon yang konsisten.

Karakteristik:

* Rounded
* Simple
* Clean
* Modern
* Mudah dikenali

Hindari penggunaan beberapa gaya ikon dalam satu aplikasi.

---

# Icon Usage

Ikon digunakan pada:

* Navigation
* Button
* Card
* Empty State
* Notification
* Status
* Form
* Dialog

---

# Icon Size

Gunakan ukuran yang konsisten.

Kategori:

* Small
* Medium
* Large

Ukuran mengikuti Design Tokens.

---

# Icon Color

Ikon mengikuti Color System.

Gunakan:

* Primary
* Secondary
* Disabled
* Error
* Success
* Warning

Hindari penggunaan warna dekoratif tanpa fungsi.

---

# Illustration System

Ilustrasi digunakan untuk memberikan konteks dan membangun hubungan emosional dengan pengguna.

Ilustrasi tidak digunakan sebagai elemen dekorasi yang memenuhi halaman.

---

# Illustration Style

Seluruh ilustrasi mengikuti karakter berikut:

* Flat Design
* Soft Color
* Rounded Shape
* Minimal Detail
* Friendly Character
* Clean Composition

---

# Illustration Usage

Ilustrasi digunakan pada:

* Onboarding
* Empty State
* Success State
* Error State
* Welcome Screen
* Feature Introduction

---

# Empty State Illustration

Setiap fitur utama memiliki ilustrasi Empty State sendiri.

Contoh:

* Memory belum tersedia
* Dream Board kosong
* Belum memiliki Relationship
* Belum ada Notification
* Belum ada Time Capsule

Ilustrasi harus membantu menjelaskan kondisi, bukan hanya mempercantik tampilan.

---

# Success Illustration

Digunakan ketika pengguna berhasil menyelesaikan aktivitas penting.

Contoh:

* Dream Completed
* Time Capsule Opened
* Invitation Accepted
* Random Date Completed

---

# Error Illustration

Digunakan ketika terjadi kesalahan.

Contoh:

* Tidak ada koneksi
* Halaman tidak ditemukan
* Data gagal dimuat

Ilustrasi harus tetap memberikan kesan yang ramah dan tidak menyalahkan pengguna.

---

# Feature Identity

Setiap fitur utama dapat memiliki ikon identitas.

Contoh:

| Feature        | Visual Identity      |
| -------------- | -------------------- |
| Question       | Dialog / Chat Bubble |
| Memory         | Photo / Album        |
| Random Date    | Compass / Location   |
| Important Days | Calendar             |
| Countdown      | Clock                |
| Constellation  | Star                 |
| Time Capsule   | Capsule              |
| Dream Board    | Target / Flag        |
| Open When      | Envelope             |
| Notification   | Bell                 |

Ikon ini digunakan secara konsisten pada seluruh aplikasi.

---

# Photography

Apabila menggunakan foto, ikuti prinsip berikut:

* Natural Lighting
* High Quality
* Fokus pada pasangan
* Tidak berlebihan dalam editing
* Mendukung suasana hangat

---

# Avatar

Avatar pengguna harus:

* Berbentuk lingkaran.
* Mendukung foto maupun inisial.
* Memiliki placeholder apabila foto belum tersedia.

---

# Emoji Usage

Emoji dapat digunakan sebagai elemen pendukung.

Contoh:

* Kategori Dream
* Reaksi ringan
* Empty State

Emoji tidak boleh menjadi satu-satunya cara menyampaikan informasi.

---

# Decorative Elements

Elemen dekoratif seperti:

* Bintang
* Bulan
* Langit malam
* Awan
* Kilauan cahaya

Digunakan secara halus untuk memperkuat identitas OurSky.

Hindari penggunaan dekorasi yang mengganggu keterbacaan.

---

# Asset Quality

Seluruh aset visual harus:

* Beresolusi tinggi.
* Konsisten dalam gaya.
* Dioptimalkan untuk performa aplikasi.
* Mendukung Light Mode dan Dark Mode.

---

# Accessibility

Visual harus tetap mudah dipahami oleh seluruh pengguna.

Perhatikan:

* Kontras warna.
* Alt Text (Web).
* Hindari penyampaian informasi hanya melalui warna atau ilustrasi.

---

# Asset Naming Convention

Gunakan penamaan yang konsisten.

Contoh:

```text
ic_notification.svg

ic_memory.svg

ic_dream_board.svg

ic_constellation.svg

img_empty_memory.webp

img_success_dream.webp

img_error_network.webp

avatar_placeholder.webp
```

---

# Recommended Folder Structure

```text
assets/
├── icons/
│   ├── navigation/
│   ├── features/
│   ├── actions/
│   └── status/
│
├── illustrations/
│   ├── onboarding/
│   ├── empty-state/
│   ├── success/
│   ├── error/
│   └── welcome/
│
├── images/
│   ├── backgrounds/
│   ├── placeholders/
│   └── gallery/
│
└── avatars/
    └── placeholder/
```

---

# Design Rules

* Gunakan satu gaya ikon di seluruh aplikasi.
* Gunakan ilustrasi hanya ketika memberikan nilai tambah.
* Hindari ilustrasi yang terlalu kompleks.
* Jangan menggunakan foto berkualitas rendah.
* Seluruh aset harus mengikuti Design System.

---

# Future Enhancements

Sistem aset visual dapat dikembangkan untuk mendukung:

* Animated Illustration
* Seasonal Theme
* Event Illustration
* Lottie Animation
* Dynamic Avatar Decoration

---

# Relationship with Other Documents

Dokumen ini berkaitan dengan:

* UI-01 Design Philosophy
* UI-02 Color System
* UI-05 Components
* UI-07 Motion & Animation
* UI-10 Design Tokens

---

# References

* Material Design 3 – Icons
* Apple Human Interface Guidelines
* WCAG Accessibility Guidelines
