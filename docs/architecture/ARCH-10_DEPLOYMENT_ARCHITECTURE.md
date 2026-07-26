# ARCH-10 Deployment Architecture

> **Document ID:** ARCH-10
> **Document Type:** Deployment Architecture
> **Status:** Final
> **Version:** 2.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan arsitektur deployment aplikasi **OurSky**.

Deployment Architecture menjelaskan bagaimana seluruh komponen aplikasi dijalankan, saling terhubung, serta dipersiapkan untuk proses pengembangan, pengujian, dan implementasi.

Dokumen ini tidak membahas penyedia hosting tertentu, tetapi mendefinisikan struktur deployment yang bersifat independen terhadap platform.

---

# Objectives

Deployment Architecture dirancang untuk:

* Memisahkan setiap komponen aplikasi.
* Mempermudah proses deployment.
* Mendukung skalabilitas.
* Mempermudah proses maintenance.
* Mendukung lingkungan pengembangan dan produksi.
* Menjaga keamanan konfigurasi aplikasi.

---

# Deployment Principles

## Environment Separation

Setiap lingkungan memiliki konfigurasi yang terpisah.

Environment yang digunakan:

* Development
* Testing
* Production

Perubahan pada satu environment tidak boleh memengaruhi environment lainnya.

---

## Independent Components

Setiap komponen aplikasi dijalankan secara independen.

Komponen utama:

* Frontend
* Backend
* Database
* Storage

Pendekatan ini mempermudah pengelolaan dan pengembangan aplikasi.

---

## Configuration Management

Konfigurasi aplikasi tidak disimpan di dalam source code.

Seluruh konfigurasi dikelola menggunakan environment variables.

Contoh:

* Database URL
* JWT Secret
* API Key
* SMTP Configuration
* Storage Configuration

---

# High-Level Deployment Architecture

```text
+----------------------+
|     User Browser     |
+----------+-----------+
           │
           ▼
+----------------------+
|   React Frontend     |
+----------+-----------+
           │ HTTPS
           ▼
+----------------------+
|   Express Backend    |
+----------+-----------+
           │
   +-------+--------+
   │                │
   ▼                ▼
+--------+     +-------------+
| MySQL  |     | File Storage|
+--------+     +-------------+
```

Frontend menjadi satu-satunya antarmuka yang berkomunikasi dengan pengguna.

Backend menjadi pusat seluruh logika bisnis dan akses data.

---

# Deployment Components

## Frontend

Frontend bertanggung jawab untuk:

* Menampilkan antarmuka pengguna.
* Mengelola navigasi.
* Berkomunikasi dengan Backend melalui REST API.

---

## Backend

Backend bertanggung jawab untuk:

* Business Logic.
* Authentication.
* Authorization.
* Notification.
* AI Integration.
* Database Access.

---

## Database

Database bertanggung jawab terhadap penyimpanan data relasional.

Seluruh akses dilakukan melalui Backend.

---

## Storage

Storage digunakan untuk menyimpan aset non-relasional.

Contoh:

* Foto Profil
* Foto Memory
* Lampiran

Backend bertanggung jawab mengelola akses terhadap storage.

---

# Deployment Workflow

```text
Developer
      │
      ▼
Source Code
      │
      ▼
Build
      │
      ▼
Deployment
      │
      ▼
Application Server
      │
      ▼
User Access
```

Proses deployment dilakukan setelah build berhasil.

---

# Environment Configuration

Setiap environment memiliki konfigurasi tersendiri.

Contoh variabel:

* APP_PORT
* DB_HOST
* DB_PORT
* DB_NAME
* DB_USER
* DB_PASSWORD
* JWT_SECRET
* STORAGE_PATH
* AI_API_KEY

File konfigurasi tidak boleh dimasukkan ke dalam version control.

---

# Scalability Strategy

Arsitektur deployment mendukung pengembangan untuk:

* Horizontal Scaling.
* Vertical Scaling.
* Load Balancer.
* CDN.
* Cloud Storage.
* Database Replication.

Seluruh strategi tersebut dapat diterapkan tanpa mengubah arsitektur utama aplikasi.

---

# Backup Strategy

Komponen yang wajib memiliki backup:

* Database
* Storage
* Configuration

Backup dilakukan secara berkala sesuai kebutuhan operasional.

---

# Deployment Security

Deployment mengikuti prinsip berikut:

* HTTPS.
* Environment Variables.
* Firewall.
* Secure File Permission.
* Least Privilege.

---

# Logging Integration

Seluruh komponen menghasilkan log masing-masing.

Contoh:

* Backend Log
* Application Error
* Scheduler Log
* Deployment Log

Log dikumpulkan untuk mempermudah proses monitoring dan troubleshooting.

---

# Disaster Recovery

Apabila terjadi kegagalan sistem, proses pemulihan mengikuti tahapan berikut:

1. Identifikasi penyebab gangguan.
2. Pulihkan layanan utama.
3. Pulihkan database jika diperlukan.
4. Verifikasi integritas data.
5. Kembalikan layanan kepada pengguna.

---

# Future Enhancements

Deployment Architecture mendukung pengembangan untuk:

* Docker
* Kubernetes
* CI/CD Pipeline
* Blue-Green Deployment
* Rolling Update
* Auto Scaling
* Cloud Deployment

---

# Relationship with Other Documents

Dokumen ini berkaitan dengan:

* ARCH-01 System Architecture
* ARCH-03 Backend Architecture
* ARCH-04 Database Architecture
* ARCH-06 Storage Architecture
* ARCH-09 Security Architecture
* ARCH-11 Monitoring & Logging

---

# References

* Twelve-Factor App
* Docker Documentation
* Kubernetes Concepts
* CI/CD Best Practices
* Environment Variable Best Practices
