# UI-07 Motion & Animation

> **Document ID:** UI-07
> **Document Type:** Design System
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan standar Motion Design dan Animation yang digunakan pada aplikasi **OurSky**.

Motion digunakan untuk meningkatkan pengalaman pengguna, memberikan umpan balik visual, memperjelas perubahan status, dan memperkuat hubungan emosional pengguna dengan aplikasi.

Animasi harus mendukung pengalaman pengguna, bukan mengganggu atau memperlambat interaksi.

---

# Motion Philosophy

Motion pada OurSky harus terasa:

* Natural
* Soft
* Calm
* Responsive
* Meaningful

Setiap animasi harus memiliki tujuan yang jelas.

Jika suatu animasi tidak membantu pengguna memahami sesuatu atau meningkatkan pengalaman, maka animasi tersebut tidak perlu digunakan.

---

# Motion Principles

## Functional

Animasi harus menjelaskan perubahan.

Contoh:

* Membuka Dialog
* Menutup Bottom Sheet
* Berpindah halaman

---

## Emotional

Animasi dapat memperkuat momen penting.

Contoh:

* Dream Completed
* Time Capsule Opened
* Invitation Accepted

---

## Fast

Animasi harus cepat.

Pengguna tidak boleh merasa dipaksa menunggu.

---

## Consistent

Animasi dengan fungsi yang sama harus memiliki pola yang sama di seluruh aplikasi.

---

# Motion Categories

## Transition Motion

Digunakan saat berpindah halaman.

Contoh:

* Push
* Fade
* Slide

---

## Feedback Motion

Digunakan setelah pengguna melakukan aksi.

Contoh:

* Button Press
* Save Success
* Validation Error

---

## Attention Motion

Digunakan untuk menarik perhatian pengguna.

Contoh:

* Notification Badge
* Countdown hampir selesai
* Event baru

Gunakan secara terbatas.

---

## Celebration Motion

Digunakan pada momen spesial.

Contoh:

* Dream Completed
* Anniversary
* Milestone
* Relationship Connected

---

## Loading Motion

Digunakan ketika sistem sedang bekerja.

Prioritas:

* Skeleton
* Progress
* Spinner

Spinner digunakan hanya untuk proses singkat.

---

# Page Transition

Perpindahan halaman harus:

* Halus
* Cepat
* Konsisten

Hindari efek transisi yang terlalu dramatis.

---

# Component Animation

Komponen interaktif dapat memiliki animasi ringan.

Contoh:

* Hover
* Press
* Focus
* Expand
* Collapse

Animasi harus memberikan umpan balik yang jelas.

---

# Dialog Animation

Dialog muncul dengan:

* Fade
* Scale ringan

Dialog ditutup menggunakan transisi yang sama secara terbalik.

---

# Bottom Sheet Animation

Bottom Sheet muncul dari bawah layar.

Gerakan harus mengikuti arah alami pengguna.

---

# Navigation Animation

Perubahan tab atau halaman utama harus terasa mulus.

Active indicator berpindah secara halus tanpa mengganggu fokus pengguna.

---

# Loading Animation

Loading harus memberikan informasi bahwa sistem sedang bekerja.

Prioritas:

1. Skeleton Loading
2. Linear Progress
3. Circular Progress

Hindari layar kosong saat proses berlangsung.

---

# Feature Motion

## Constellation

Animasi:

* Zoom In
* Zoom Out
* Star Highlight
* Star Selection
* Smooth Pan

Gerakan kamera harus terasa lembut.

---

## Time Capsule

Saat membuka Capsule:

* Capsule muncul.
* Animasi pembukaan.
* Cahaya lembut keluar.
* Isi Capsule ditampilkan.

Animasi harus menciptakan rasa penasaran dan nostalgia.

---

## Open When

Saat surat dibuka:

* Amplop muncul.
* Amplop terbuka.
* Surat terbentang.
* Isi surat tampil secara bertahap.

Fokus utama adalah memberikan pengalaman yang hangat dan personal.

---

## Dream Board

Saat Dream selesai:

* Progress mencapai 100%.
* Badge Completed muncul.
* Efek perayaan sederhana.
* Card diperbarui.

Tidak menggunakan animasi berlebihan.

---

## Memory

Saat Memory berhasil disimpan:

* Thumbnail muncul.
* Fade In.
* Toast Success.

---

## Question

Saat kedua pasangan selesai menjawab:

* Reveal Animation.
* Jawaban muncul secara bertahap.
* Card berubah menjadi Completed.

---

# Notification Animation

Notification baru dapat menggunakan:

* Fade
* Slide

Badge berubah secara halus.

Hindari efek berkedip.

---

# Empty State Animation

Apabila menggunakan animasi:

* Sangat ringan.
* Berulang secara perlahan.
* Tidak mengganggu.

---

# Error Animation

Animasi Error harus:

* Singkat.
* Tidak agresif.
* Membantu pengguna memahami bahwa aksi gagal.

---

# Motion Duration

Gunakan beberapa kategori durasi.

* Fast
* Normal
* Slow

Nilai teknis akan ditentukan pada **UI-10 Design Tokens**.

---

# Motion Easing

Gunakan easing yang terasa alami.

Contoh:

* Ease Out
* Ease In Out

Seluruh easing didefinisikan pada Design Tokens.

---

# Accessibility

Pengguna harus dapat menggunakan aplikasi meskipun animasi dikurangi.

Prinsip:

* Hormati preferensi "Reduce Motion".
* Jangan menjadikan animasi sebagai satu-satunya cara menyampaikan informasi.
* Semua informasi penting harus tetap tersedia tanpa animasi.

---

# Performance

Animasi harus:

* Ringan.
* Tidak menghambat navigasi.
* Tidak menyebabkan frame drop.
* Dioptimalkan untuk perangkat kelas menengah.

---

# Design Rules

* Setiap animasi harus memiliki tujuan.
* Hindari animasi dekoratif yang berlebihan.
* Gunakan pola animasi yang konsisten.
* Prioritaskan kenyamanan pengguna.
* Animasi harus mendukung pengalaman emosional OurSky.

---

# Future Enhancements

Motion System dapat dikembangkan untuk mendukung:

* Shared Celebration Animation
* Seasonal Animation
* Dynamic Background Animation
* Interactive Constellation Effects
* Micro Interaction Library

---

# Relationship with Other Documents

Dokumen ini mengacu pada:

* UI-01 Design Philosophy
* UI-02 Color System
* UI-05 Components
* UI-06 Icons & Illustrations
* UI-08 Responsive
* UI-10 Design Tokens

---

# References

* Material Design 3 – Motion
* Apple Human Interface Guidelines
* WCAG Accessibility Guidelines
* Fluent Motion Principles
