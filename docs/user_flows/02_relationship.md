# User Flow: Relationship

> **Flow ID:** UF-02
> **Status:** Draft
> **Version:** 1.1
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini menjelaskan perjalanan pengguna dalam membangun sebuah Relationship di OurSky.

Relationship merupakan fondasi utama aplikasi. Hampir seluruh fitur OurSky hanya dapat digunakan setelah dua pengguna berhasil terhubung sebagai pasangan.

Flow ini dimulai ketika pengguna berada di Dashboard tanpa pasangan (**Not Connected**) dan berakhir ketika kedua pengguna berhasil membentuk sebuah Relationship.

---

# Relationship Principles

Relationship di OurSky mengikuti prinsip berikut:

* Setiap akun hanya dapat memiliki satu Relationship aktif.
* Relationship hanya dapat dibentuk melalui Invitation.
* Invitation dapat diterima menggunakan Invitation Link maupun Invitation Code.
* Invitation Link dan Invitation Code merepresentasikan Invitation yang sama.
* Setelah Relationship berhasil dibuat, seluruh fitur utama akan aktif.
* Kedua pengguna memiliki hak akses yang setara terhadap Relationship.
* Relationship tidak memiliki owner maupun administrator.

---

# Actors

## Primary Actors

* User A (Invitation Creator)
* User B (Invitation Receiver)

## Supporting System

* Relationship Service
* Invitation Service
* Notification Service

---

# Preconditions

Sebelum flow dimulai:

* Kedua pengguna telah memiliki akun OurSky.
* Kedua pengguna telah login.
* Kedua pengguna belum memiliki Relationship aktif.
* User A berada pada Dashboard dengan status **Not Connected**.

---

# Trigger

Flow dimulai ketika User A memilih tombol **Invite Partner** pada Dashboard.

---

# Main Flow

## 1. Dashboard (Not Connected)

Pengguna membuka Dashboard.

Karena belum memiliki pasangan, Dashboard menampilkan Empty State.

Pilihan yang tersedia:

* Invite Partner
* Enter Invitation Code

↓

## 2. Create Invitation

User A memilih **Invite Partner**.

Sistem membuat sebuah Invitation baru.

↓

## 3. Invitation Created

Sistem menghasilkan satu Invitation yang terdiri dari:

* Invitation Link
* Invitation Code
* Expiration Time
* Status: Pending

Invitation Link dan Invitation Code mengarah pada Invitation yang sama.

↓

## 4. Share Invitation

User A memilih salah satu cara membagikan Invitation.

### Option A — Share Link

Invitation Link dibagikan melalui:

* WhatsApp
* Telegram
* Discord
* Email
* Copy Link

### Option B — Share Code

User A mengirimkan Invitation Code kepada pasangannya.

↓

## 5. Partner Opens Invitation

User B dapat menerima Invitation dengan dua cara.

### Option A — Open Invitation Link

Partner membuka Invitation Link.

### Option B — Enter Invitation Code

Partner memilih **Enter Invitation Code** pada Dashboard.

Sistem memverifikasi bahwa:

* Invitation masih aktif.
* Invitation belum digunakan.
* Invitation belum kedaluwarsa.
* Partner belum memiliki Relationship aktif.

↓

## 6. Accept Invitation

Partner memilih **Accept Invitation**.

Sistem meminta konfirmasi sebelum Relationship dibuat.

↓

## 7. Relationship Created

Sistem:

* Membuat Relationship baru.
* Menghubungkan kedua akun.
* Mengubah status Invitation menjadi **Accepted**.
* Menonaktifkan Invitation agar tidak dapat digunakan kembali.

↓

## 8. Welcome Together

Kedua pengguna menerima halaman sambutan.

OurSky menampilkan ucapan selamat karena Relationship berhasil dibuat.

↓

## 9. Connected Dashboard

Dashboard diperbarui.

Seluruh fitur utama kini tersedia.

* Question
* Memory
* Random Date
* Countdown
* Important Days
* Time Capsule
* Constellation

Flow selesai.

---

# Flow Diagram

```text
Dashboard (Not Connected)
        │
        ▼
Invite Partner
        │
        ▼
Create Invitation
        │
        ▼
Invitation Created
        │
        ▼
 ┌──────────────┐
 │              │
 ▼              ▼
Share Link   Share Code
 │              │
 └──────┬───────┘
        ▼
Partner Opens Invitation
(Link / Code)
        │
        ▼
Accept Invitation
        │
        ▼
Relationship Created
        │
        ▼
Connected Dashboard
```

---

# Dashboard Empty State

Dashboard menampilkan tampilan sederhana ketika pengguna belum memiliki pasangan.

```text
❤️ Welcome to OurSky

You haven't connected with your partner yet.

[ Invite Partner ]

──────── OR ────────

Already have an invitation?

[ Enter Invitation Code ]
```

---

# Alternative Flows

## A1. Invitation Declined

Partner menolak Invitation.

Status Invitation berubah menjadi **Declined**.

Relationship tidak dibuat.

---

## A2. User Cancels Invitation

Invitation dibatalkan oleh pembuat sebelum diterima.

Status berubah menjadi **Cancelled**.

Partner tidak lagi dapat menggunakan Invitation tersebut.

---

## A3. Resend Invitation

Invitation telah kedaluwarsa.

User A membuat Invitation baru.

---

# Exception Flows

## E1. Invitation Not Found

Invitation tidak ditemukan.

Sistem menampilkan halaman bahwa Invitation tidak valid.

---

## E2. Invitation Expired

Invitation telah melewati masa berlaku.

Partner diminta meminta Invitation baru.

---

## E3. Invitation Already Used

Invitation sudah pernah digunakan.

Sistem menolak proses.

---

## E4. Partner Already Connected

Partner telah memiliki Relationship aktif.

Invitation tidak dapat diterima.

---

## E5. Creator Already Connected

Pembuat Invitation telah memiliki Relationship sebelum Invitation diterima.

Invitation otomatis dibatalkan.

---

## E6. Self Invitation

Pengguna mencoba menerima Invitation miliknya sendiri.

Sistem menolak proses.

---

## E7. Invitation Expired During Acceptance

Invitation kedaluwarsa ketika proses penerimaan sedang berlangsung.

Relationship tidak dibuat.

Partner diminta menggunakan Invitation baru.

---

# Postconditions

Setelah flow selesai:

* Relationship berhasil dibuat.
* Kedua akun berada pada Relationship yang sama.
* Invitation berubah menjadi **Accepted**.
* Invitation tidak dapat digunakan kembali.
* Dashboard kedua pengguna berubah menjadi **Connected**.
* Seluruh fitur utama aktif.
* Relationship siap digunakan oleh seluruh fitur OurSky.

---

# Business Rules

## Relationship Rules

* Satu akun hanya dapat memiliki satu Relationship aktif.
* Relationship tidak memiliki owner.
* Kedua pengguna memiliki hak akses yang sama.

## Invitation Rules

* Setiap Relationship dibuat melalui satu Invitation.
* Setiap Invitation memiliki Link dan Code.
* Link dan Code merepresentasikan Invitation yang sama.
* Invitation hanya dapat digunakan satu kali.
* Invitation memiliki masa berlaku.
* Invitation dapat dibatalkan sebelum diterima.
* Invitation tidak dapat diterima oleh pembuatnya sendiri.
* Invitation tidak dapat digunakan setelah Accepted, Cancelled, maupun Expired.

---

# Related Features

* Authentication
* Couple Management
* Dashboard
* Notification

---

# Previous Flow

* UF-01 Onboarding

---

# Next Flow

* UF-03 Dashboard

---

# References

* 00_KITAB_PROJECT.md
* 01_PRODUCT_REQUIREMENT.md
* 02_FEATURE_SPECIFICATION.md
* features/couple.md
* features/dashboard.md
