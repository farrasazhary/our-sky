# UI-11 Page Templates

> **Document ID:** UI-11
> **Document Type:** Design System
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan template halaman (Page Templates) yang digunakan pada aplikasi **OurSky**.

Page Template menjadi acuan penyusunan layout, struktur informasi, serta pola interaksi sehingga seluruh halaman memiliki pengalaman pengguna yang konsisten.

Template ini tidak mengatur detail visual komponen, tetapi mengatur bagaimana komponen tersebut disusun menjadi sebuah halaman.

---

# Design Philosophy

Seluruh halaman harus:

* Sederhana
* Konsisten
* Mudah dipahami
* Mudah dinavigasi
* Fokus pada satu tujuan utama

Pengguna tidak boleh merasa bingung mengenai tindakan yang harus dilakukan pada setiap halaman.

---

# Standard Page Structure

Sebagian besar halaman mengikuti struktur berikut.

```text
App Bar

↓

Page Header (Optional)

↓

Primary Content

↓

Secondary Content

↓

Floating Action (Optional)

↓

Bottom Navigation
```

---

# Common Layout Principles

Seluruh halaman harus:

* Menggunakan spacing yang konsisten.
* Memiliki hirarki visual yang jelas.
* Menghindari kepadatan informasi.
* Mendukung scrolling secara alami.

---

# Dashboard Template

Tujuan:

Memberikan ringkasan seluruh aktivitas Relationship.

Komponen utama:

* Greeting
* Relationship Summary
* Countdown
* Today's Question
* Recent Memories
* Upcoming Important Days
* Recent Notifications
* Quick Actions

Dashboard menjadi halaman pertama setelah pengguna berhasil login.

---

# Relationship Template

Digunakan untuk menampilkan informasi hubungan.

Komponen:

* Couple Profile
* Relationship Status
* Anniversary
* Statistics
* Timeline Ringkas

---

# Question Template

Komponen:

* Today's Question
* Answer Form
* Waiting State
* Reveal Result
* History

---

# Memory Template

Komponen:

* Search
* Filter
* Memory Grid
* Memory Card
* Floating Action Button

State:

* Empty
* Loading
* Filled

---

# Random Date Template

Komponen:

* Challenge Card
* Recommendation
* Progress
* Completion History

---

# Important Days Template

Komponen:

* Calendar
* Upcoming Events
* Add Button
* Event List

---

# Countdown Template

Komponen:

* Countdown Card
* Event Detail
* Timeline

---

# Constellation Template

Komponen:

* Star Map
* Timeline Filter
* Category Filter
* Star Detail Panel

Layout harus memberikan ruang visual yang luas.

---

# Dream Board Template

Komponen:

* Dream Summary
* Category Filter
* Dream Cards
* Progress
* Add Dream

---

# Time Capsule Template

Komponen:

* Capsule List
* Capsule Status
* Create Capsule
* Schedule Information

---

# Open When Template

Komponen:

* Letter List
* Condition Filter
* Letter Detail
* Create Letter

---

# Notification Template

Komponen:

* Notification List
* Category Filter
* Read Status

---

# Profile Template

Komponen:

* User Information
* Partner Information
* Settings
* Privacy
* Account

---

# Settings Template

Komponen:

* Appearance
* Notification
* Security
* Language
* About Application

---

# Search Template

Komponen:

* Search Bar
* Recent Search
* Result List
* Empty Result

---

# Empty State Template

Setiap halaman harus memiliki Empty State.

Komponen:

* Illustration
* Title
* Description
* Primary Action

---

# Loading Template

Loading mengikuti urutan berikut:

* Skeleton
* Progress Indicator
* Spinner

Hindari layar kosong saat data sedang dimuat.

---

# Error Template

Komponen:

* Error Illustration
* Error Message
* Retry Button

---

# Success Template

Komponen:

* Success Illustration
* Success Message
* Primary Action

---

# Bottom Sheet Template

Bottom Sheet digunakan untuk:

* Filter
* Quick Action
* Picker
* Confirmation

---

# Dialog Template

Dialog digunakan untuk:

* Konfirmasi
* Informasi Penting
* Peringatan
* Hapus Data

Dialog tidak digunakan untuk proses yang kompleks.

---

# Navigation Consistency

Seluruh halaman harus memiliki pola navigasi yang konsisten.

Prinsip:

* Posisi tombol tidak berubah-ubah.
* Ikon memiliki makna yang sama.
* Navigasi mudah dipelajari.

---

# Responsive Behavior

Template harus dapat beradaptasi terhadap:

* Smartphone
* Tablet
* Desktop (Future)

Tanpa mengubah struktur utama halaman.

---

# Accessibility

Seluruh template harus:

* Mendukung Screen Reader.
* Memiliki urutan fokus yang logis.
* Menggunakan kontras yang baik.
* Memiliki area sentuh yang nyaman.

---

# Design Rules

* Fokus pada satu tujuan utama setiap halaman.
* Hindari menampilkan terlalu banyak aksi dalam satu layar.
* Gunakan komponen dari Design System.
* Pertahankan konsistensi antar halaman.
* Optimalkan ruang kosong untuk meningkatkan keterbacaan.

---

# Future Enhancements

Template dapat dikembangkan untuk mendukung:

* Dashboard Widget Customization
* Desktop Multi Panel
* Tablet Optimized Layout
* Dynamic Dashboard
* Split View

---

# Relationship with Other Documents

Dokumen ini mengacu pada:

* UI-04 Spacing & Layout
* UI-05 Components
* UI-08 Responsive
* UI-09 Accessibility
* UI-10 Design Tokens

---

# References

* Material Design 3 – Layout
* Apple Human Interface Guidelines
* Nielsen Norman Group – Page Layout
