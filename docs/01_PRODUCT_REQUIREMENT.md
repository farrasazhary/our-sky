# 📄 Product Requirement Document (PRD)

> **Project:** OurSky
> **Document:** Product Requirement Document (PRD)
> **Version:** 0.1.0 (Draft)
> **Status:** Draft
> **Last Updated:** July 2026

---

# 1. Overview

## Product Name

**OurSky** *(Working Title)*

## Product Type

Private Relationship Companion Website

## Vision

OurSky adalah sebuah website yang membantu pasangan membangun, menyimpan, dan mengenang perjalanan hubungan mereka melalui momen-momen sederhana yang bermakna.

Website ini bukan media sosial dan bukan aplikasi chatting.

---

# 2. Problem Statement

Saat ini pasangan LDR biasanya menggunakan banyak aplikasi secara bersamaan.

Contohnya:

* WhatsApp untuk chatting
* Google Photos untuk foto
* Notes untuk menulis
* Google Calendar untuk mengingat tanggal penting
* Spotify untuk berbagi lagu

Tidak ada satu tempat khusus yang benar-benar dibuat untuk menyimpan perjalanan hubungan mereka.

Akibatnya, momen-momen kecil sering terlupakan atau tersebar di berbagai platform.

---

# 3. Solution

OurSky menjadi rumah digital bagi sebuah hubungan.

Tempat untuk:

* menciptakan momen
* menyimpan kenangan
* merencanakan masa depan
* merayakan perjalanan bersama

---

# 4. Goals

## Business Goal

Membangun website yang memberikan pengalaman unik bagi pasangan tanpa bersaing langsung dengan aplikasi chatting.

---

## User Goal

Membantu pasangan merasa lebih dekat meskipun terpisah oleh jarak.

---

## Product Goal

Mendorong terciptanya minimal satu interaksi bermakna setiap hari.

---

# 5. Product Principles

Seluruh fitur yang dibuat harus memenuhi minimal salah satu prinsip berikut.

* Encourage interaction
* Create memories
* Strengthen emotional connection
* Keep things simple
* Stay private

Jika sebuah fitur tidak memenuhi prinsip-prinsip tersebut, maka fitur tersebut tidak akan menjadi prioritas pengembangan.

---

# 6. Target Users

## Primary Users

* Long Distance Relationship (LDR)
* International Couple
* Married Couple
* Engaged Couple

## Age Range

18–35 tahun

---

# 7. MVP Scope

## Authentication

* Register
* Login
* Logout
* Forgot Password
* Email Verification

---

## Couple

* Create Relationship
* Invite Partner
* Accept Invitation
* Relationship Dashboard

---

## Dashboard

* Relationship Summary
* Today's Activity
* Upcoming Events
* Quick Access Menu

---

## ⭐ Constellation (Basic)

* Menampilkan langit hubungan
* Aktivitas menghasilkan bintang
* Klik bintang untuk melihat detail aktivitas

---

## 💌 Time Capsule

* Create Capsule
* Schedule Opening
* Open Capsule
* Edit sebelum dibuka
* Delete sebelum dibuka

---

## 📷 Little Memory

* Upload satu foto per hari
* Caption singkat
* Riwayat foto

---

## ❓ Question of the Day

* Daily Question
* Jawaban hanya terlihat setelah kedua pasangan menjawab
* Riwayat pertanyaan

---

## 🎲 Random Date

* Generate aktivitas acak
* Refresh rekomendasi
* Simpan aktivitas favorit *(opsional pada MVP jika waktu memungkinkan)*

---

## ⏳ Countdown

* Tambah countdown
* Edit countdown
* Hapus countdown
* Notifikasi ketika mendekati tanggal

---

## 📆 Important Days

* Birthday
* Anniversary
* First Meet
* Custom Important Dates

---

# 8. Future Scope

## Version 1.1

* Shared Dream Board
* Open When
* Advanced Constellation Animation

---

## Version 1.2

* Relationship Timeline
* Statistics
* Theme Customization

---

## Version 2.0

* AI Recommendation
* AI Date Planner
* Calendar Synchronization
* Spotify Integration

---

# 9. Out of Scope

Fitur berikut **tidak akan dibuat**.

* Chat
* Voice Call
* Video Call
* Story
* Feed
* Followers
* Public Profile
* User Search
* Marketplace
* Advertisement

---

# 10. User Persona

## Persona 1

**Name:** Alya

**Age:** 23

**Country:** Indonesia

**Partner:** Japan

Needs:

* Mengingat tanggal penting
* Menyimpan kenangan
* Mendapat ide aktivitas bersama

---

## Persona 2

**Name:** Dimas

**Age:** 29

**Country:** Australia

**Partner:** Indonesia

Needs:

* Menjaga hubungan tetap hangat
* Menyusun rencana masa depan
* Memiliki tempat khusus untuk hubungan mereka

---

# 11. Success Metrics

North Star Metric

**Shared Moments Created**

Contoh aktivitas:

* Time Capsule dibuat
* Daily Question selesai dijawab
* Memory ditambahkan
* Countdown dibuat
* Random Date digunakan

---

# 12. Non Functional Requirements

## Performance

* Initial page load < 2 detik
* API response < 500 ms (target)

---

## Security

* JWT Authentication
* Password Hashing
* HTTPS
* Input Validation
* Rate Limiting

---

## Availability

Target uptime:

99%

---

## Responsiveness

Support:

* Desktop
* Tablet
* Mobile

---

## Scalability

Arsitektur harus memungkinkan penambahan fitur baru tanpa mengubah struktur utama aplikasi.

---

# 13. Risks

Kemungkinan risiko selama pengembangan.

* Storage foto bertambah
* Spam invitation
* Timezone berbeda
* Relationship berakhir
* Email tidak terkirim
* Duplicate account

---

# 14. Acceptance Criteria

## Authentication

* User dapat membuat akun.
* User dapat login.
* User menerima email verifikasi.
* User dapat melakukan reset password.

---

## Couple

* User dapat mengundang pasangan.
* Pasangan dapat menerima undangan.
* Relationship aktif setelah undangan diterima.

---

## Time Capsule

* User dapat membuat kapsul.
* User dapat mengedit kapsul sebelum dibuka.
* User dapat menghapus kapsul sebelum dibuka.
* Capsule tidak dapat dibuka sebelum waktunya.

---

## Little Memory

* Maksimal satu foto per hari.
* Foto memiliki caption opsional.
* Riwayat dapat dilihat kembali.

---

## Question of the Day

* Kedua pasangan menerima pertanyaan yang sama.
* Jawaban baru terbuka setelah kedua pengguna menjawab.

---

## Countdown

* User dapat membuat countdown baru.
* User dapat mengubah countdown.
* User dapat menghapus countdown.

---

## Constellation

* Aktivitas tertentu menghasilkan satu bintang.
* Detail aktivitas dapat dilihat saat bintang dipilih.

---

# 15. Roadmap

## Phase 1

* Authentication
* Relationship System

---

## Phase 2

* Dashboard
* Time Capsule

---

## Phase 3

* Question of the Day
* Countdown

---

## Phase 4

* Little Memory
* Random Date

---

## Phase 5

* Basic Constellation
* MVP Release

---

# 16. Definition of MVP Done

MVP dianggap selesai apabila:

* Seluruh fitur MVP dapat digunakan tanpa bug kritis.
* Dua pengguna dapat membentuk satu relationship.
* Seluruh data tersimpan di database.
* Website responsive pada desktop dan mobile.
* Authentication berjalan dengan baik.
* Deployment berhasil dilakukan.
* Dokumentasi backend dan frontend telah tersedia.

---

# 17. References

* `00_KITAB_PROJECT.md`

Seluruh keputusan pada dokumen ini harus tetap mengikuti visi, filosofi, dan prinsip yang telah ditetapkan pada Kitab Project.
