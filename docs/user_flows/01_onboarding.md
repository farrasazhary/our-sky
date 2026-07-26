# User Flow: Onboarding

> **Flow ID:** UF-01
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna sejak pertama kali membuka aplikasi hingga berhasil masuk ke Dashboard OurSky.

Tujuan utama dari proses onboarding adalah membantu pengguna membuat akun dengan mudah, memahami konsep OurSky, dan mempersiapkan akun sebelum membangun Relationship dengan pasangannya.

Flow ini berakhir ketika pengguna berhasil masuk ke Dashboard dalam keadaan **belum memiliki pasangan (Not Connected)**.

---

# Actors

### Primary Actor

* User (Pengguna baru)

### Supporting System

* Authentication System
* Email Verification System
* User Profile Service

---

# Preconditions

Sebelum flow dimulai, kondisi berikut harus terpenuhi:

* Pengguna belum memiliki akun OurSky.
* Pengguna membuka aplikasi melalui browser.
* Koneksi internet tersedia.

---

# Trigger

Flow dimulai ketika pengguna memilih tombol **Get Started** atau **Sign Up** pada Landing Page.

---

# Main Flow

## 1. Landing Page

Pengguna membuka website OurSky.

Landing Page memperkenalkan konsep aplikasi secara singkat, termasuk nilai utama OurSky sebagai ruang digital pribadi bagi pasangan.

Pilihan yang tersedia:

* Get Started
* Sign In

↓

## 2. Registration

Pengguna memilih **Get Started**.

Sistem menampilkan formulir pendaftaran.

Informasi yang diminta:

* Full Name
* Email Address
* Password
* Confirm Password

Pengguna mengisi seluruh data dan mengirim formulir.

↓

## 3. Account Created

Sistem membuat akun baru.

Status akun:

* Registered
* Email belum terverifikasi

Sistem mengirim Email Verification.

↓

## 4. Email Verification

Pengguna membuka email.

Pengguna menekan tombol verifikasi.

Jika berhasil:

Status akun berubah menjadi:

* Email Verified

↓

## 5. First Login

Pengguna melakukan login menggunakan email dan password.

Apabila email belum diverifikasi, sistem meminta pengguna menyelesaikan proses verifikasi terlebih dahulu.

↓

## 6. Complete Profile

Setelah login pertama, pengguna diminta melengkapi profil.

Informasi yang dapat diisi:

* Display Name
* Birthday (Optional)
* Gender (Optional)
* Profile Picture (Optional)

Pengguna dapat melewati informasi opsional dan melengkapinya di kemudian hari.

↓

## 7. Welcome Screen

Sistem menampilkan halaman sambutan.

Pengguna diperkenalkan pada konsep utama OurSky, seperti:

* Membangun kenangan bersama.
* Menjawab pertanyaan harian.
* Membuat Time Capsule.
* Menjelajahi Constellation hubungan.

Halaman ini hanya muncul pada penggunaan pertama.

↓

## 8. Dashboard (Not Connected)

Pengguna masuk ke Dashboard.

Karena belum memiliki pasangan, Dashboard menampilkan Empty State.

Pilihan yang tersedia:

* Invite Partner
* Enter Invitation Code (jika digunakan)
* Learn More

Flow selesai.

---

# Alternative Flows

## A1. User Already Has Account

Pada halaman Register, email sudah terdaftar.

Sistem menampilkan pesan bahwa akun sudah ada.

Pengguna diarahkan menuju halaman Login.

---

## A2. Skip Optional Profile

Pengguna tidak mengisi data opsional.

Sistem tetap mengizinkan proses onboarding selesai.

Profil dapat dilengkapi kapan saja melalui halaman Profile.

---

## A3. Resend Verification Email

Pengguna belum menerima email verifikasi.

Sistem menyediakan tombol **Resend Verification Email**.

---

# Exception Flows

## E1. Invalid Registration Data

Apabila data yang dimasukkan tidak valid, sistem menampilkan pesan kesalahan dan meminta pengguna memperbaiki data.

---

## E2. Email Verification Failed

Jika tautan verifikasi sudah tidak berlaku atau tidak valid, sistem memberikan pilihan untuk mengirim ulang email verifikasi.

---

## E3. Network Error

Apabila terjadi gangguan koneksi saat registrasi atau login, sistem menampilkan informasi bahwa proses tidak dapat dilanjutkan dan pengguna dapat mencoba kembali.

---

# Postconditions

Setelah flow selesai:

* User berhasil memiliki akun OurSky.
* Email telah diverifikasi.
* Profil dasar telah dibuat.
* User berhasil login.
* User berada pada Dashboard.
* User belum memiliki Relationship.
* User siap melanjutkan ke Relationship Flow.

---

# Related Features

* Authentication
* User Profile
* Dashboard

---

# Next Flow

Setelah onboarding selesai, pengguna melanjutkan ke:

`UF-02 Relationship`

---

# References

* 00_KITAB_PROJECT.md
* 01_PRODUCT_REQUIREMENT.md
* 02_FEATURE_SPECIFICATION.md
* features/authentication.md
* features/dashboard.md
