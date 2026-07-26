# ARCH-12 Architecture Decision Record

> **Document ID:** ARCH-12
> **Document Type:** Architecture Decision Record (ADR)
> **Status:** Final
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendokumentasikan keputusan-keputusan arsitektur utama yang diambil selama proses perancangan aplikasi **OurSky**.

Setiap keputusan disertai alasan, manfaat, serta dampaknya terhadap pengembangan sistem agar dapat menjadi referensi pada pengembangan berikutnya.

---

# Objectives

Architecture Decision Record bertujuan untuk:

* Mendokumentasikan alasan di balik keputusan arsitektur.
* Menjaga konsistensi pengembangan.
* Mempermudah proses evaluasi.
* Membantu pengembang baru memahami sistem.
* Menjadi referensi ketika melakukan perubahan arsitektur.

---

# ADR-001

## Decision

Menggunakan arsitektur **Client–Server**.

## Rationale

Pemisahan antara frontend dan backend membuat pengembangan lebih terstruktur, mudah dipelihara, dan memungkinkan masing-masing komponen dikembangkan secara independen.

## Impact

* Frontend dan backend memiliki tanggung jawab yang jelas.
* Komunikasi dilakukan melalui REST API.

---

# ADR-002

## Decision

Menggunakan **React** sebagai framework frontend.

## Rationale

React mendukung pengembangan antarmuka berbasis komponen sehingga kode lebih modular dan mudah digunakan kembali.

## Impact

* UI lebih mudah dipelihara.
* Struktur aplikasi lebih terorganisasi.

---

# ADR-003

## Decision

Menggunakan **Node.js** dan **Express** sebagai backend.

## Rationale

Express ringan, fleksibel, dan sesuai untuk membangun REST API yang modular.

## Impact

* Backend lebih sederhana.
* Mudah dikembangkan untuk fitur baru.

---

# ADR-004

## Decision

Menggunakan **Feature-Based Modular Architecture** pada backend.

## Rationale

Setiap fitur memiliki struktur modul sendiri sehingga perubahan pada satu fitur tidak memengaruhi fitur lainnya.

## Impact

* Modularitas meningkat.
* Skalabilitas lebih baik.
* Pengembangan fitur menjadi lebih terisolasi.

---

# ADR-005

## Decision

Menggunakan **Layered Architecture** di dalam setiap modul.

## Rationale

Pemisahan Route, Controller, Service, dan Repository membuat setiap lapisan memiliki tanggung jawab yang jelas.

## Impact

* Business Logic terpisah dari akses data.
* Pengujian lebih mudah dilakukan.

---

# ADR-006

## Decision

Menggunakan **MySQL** sebagai database utama.

## Rationale

MySQL stabil, mudah digunakan, dan sesuai dengan kebutuhan aplikasi relasional seperti OurSky.

## Impact

* Mendukung relasi data yang kompleks.
* Mudah diintegrasikan dengan backend.

---

# ADR-007

## Decision

Menggunakan **JWT** sebagai mekanisme autentikasi.

## Rationale

JWT sederhana diimplementasikan, sesuai untuk REST API, dan tidak memerlukan session berbasis server pada implementasi awal.

## Impact

* Autentikasi menjadi stateless.
* Backend lebih mudah diskalakan.

---

# ADR-008

## Decision

Menggunakan **Relationship Event** sebagai pusat aktivitas aplikasi.

## Rationale

Seluruh aktivitas penting dicatat sebagai Relationship Event sehingga dapat dimanfaatkan oleh berbagai layanan seperti Timeline dan Notification.

## Impact

* Aktivitas lebih konsisten.
* Integrasi antar fitur menjadi lebih mudah.
* Mempermudah pengembangan fitur baru.

---

# ADR-009

## Decision

Menggunakan **Storage terpisah** untuk file.

## Rationale

File tidak disimpan langsung di database sehingga ukuran database tetap efisien dan pengelolaan aset menjadi lebih baik.

## Impact

* Database lebih ringan.
* Mudah bermigrasi ke cloud storage.

---

# ADR-010

## Decision

Menjadikan **Notification Service** sebagai layanan lintas fitur.

## Rationale

Seluruh modul menggunakan mekanisme notifikasi yang sama sehingga tidak terjadi duplikasi implementasi.

## Impact

* Konsistensi notifikasi.
* Pemeliharaan lebih mudah.

---

# ADR-011

## Decision

Menjadikan **AI** sebagai Supporting Service.

## Rationale

AI dapat digunakan oleh berbagai fitur tanpa menanamkan logika AI di masing-masing modul.

## Impact

* Integrasi AI lebih fleksibel.
* Mudah mengganti provider AI di masa depan.

---

# ADR-012

## Decision

Menerapkan **Security by Design**.

## Rationale

Keamanan menjadi bagian dari desain sistem sejak awal, bukan ditambahkan setelah aplikasi selesai dibuat.

## Impact

* Risiko keamanan berkurang.
* Arsitektur lebih siap dikembangkan.

---

# ADR-013

## Decision

Memisahkan konfigurasi aplikasi menggunakan **Environment Variables**.

## Rationale

Data sensitif seperti API Key, JWT Secret, dan kredensial database tidak disimpan di source code.

## Impact

* Keamanan meningkat.
* Deployment lebih fleksibel.

---

# ADR-014

## Decision

Menggunakan **Monitoring & Logging** sebagai layanan pendukung operasional.

## Rationale

Pencatatan aktivitas dan pemantauan sistem membantu proses debugging, audit, dan pemeliharaan aplikasi.

## Impact

* Troubleshooting lebih cepat.
* Kualitas operasional meningkat.

---

# Review Process

Setiap keputusan arsitektur baru harus:

1. Didokumentasikan pada ADR.
2. Menjelaskan alasan pengambilan keputusan.
3. Menjelaskan dampaknya terhadap sistem.
4. Mendapatkan persetujuan sebelum diterapkan.

---

# Relationship with Other Documents

Dokumen ini berkaitan dengan seluruh dokumen pada folder `architecture/`:

* ARCH-01 System Architecture
* ARCH-02 Frontend Architecture
* ARCH-03 Backend Architecture
* ARCH-04 Database Architecture
* ARCH-05 Authentication & Authorization
* ARCH-06 Storage Architecture
* ARCH-07 Notification Architecture
* ARCH-08 AI Architecture
* ARCH-09 Security Architecture
* ARCH-10 Deployment Architecture
* ARCH-11 Monitoring & Logging

---

# References

* Architecture Decision Records (ADR)
* Documenting Architecture Decisions
* Software Architecture Best Practices
