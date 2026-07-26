# 05 Database Design

> **Document ID:** 05
> **Document Type:** Database Design
> **Project:** OurSky
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# 1. Purpose

Dokumen ini mendefinisikan rancangan database aplikasi **OurSky** sebagai dasar implementasi sistem penyimpanan data.

Database dirancang untuk mendukung seluruh kebutuhan fungsional aplikasi, menjaga integritas data, serta menyediakan struktur yang mudah dikembangkan pada masa mendatang.

Dokumen ini menjadi acuan utama dalam proses implementasi database, pengembangan REST API, dan pengembangan backend.

---

# 2. Objectives

Database Design bertujuan untuk:

* Menerjemahkan kebutuhan bisnis menjadi model data yang terstruktur.
* Mendefinisikan entitas dan hubungan antar entitas.
* Menjamin konsistensi dan integritas data.
* Mengurangi redundansi data melalui normalisasi.
* Mendukung skalabilitas aplikasi.
* Menjadi referensi implementasi database MySQL.

---

# 3. Scope

Dokumen ini mencakup:

* Conceptual Database Design
* Logical Database Design
* Physical Database Design
* Entity Relationship
* Naming Convention
* Relationship Rules
* Constraints
* Index Strategy
* Data Lifecycle

Dokumen ini tidak membahas implementasi SQL secara langsung maupun konfigurasi server database.

---

# 4. Database Overview

OurSky menggunakan database relasional untuk menyimpan seluruh data utama aplikasi.

Database dipilih karena mampu menangani hubungan antar data secara konsisten serta mendukung transaksi yang diperlukan dalam berbagai fitur aplikasi.

Seluruh aktivitas pengguna, hubungan pasangan, memori, pertanyaan, notifikasi, dan fitur lainnya akan direpresentasikan sebagai entitas yang saling berelasi.

---

# 5. Database Design Principles

Perancangan database mengikuti prinsip-prinsip berikut.

## 5.1 Single Source of Truth

Setiap data hanya memiliki satu sumber utama sehingga tidak terjadi duplikasi informasi yang dapat menyebabkan inkonsistensi.

---

## 5.2 Data Integrity

Integritas data dijaga melalui penggunaan Primary Key, Foreign Key, Constraint, dan aturan relasi yang sesuai.

---

## 5.3 Normalization

Struktur database dirancang mengikuti prinsip normalisasi agar redundansi data dapat diminimalkan tanpa mengorbankan kebutuhan performa aplikasi.

---

## 5.4 Scalability

Struktur database harus mampu mengakomodasi penambahan fitur baru tanpa memerlukan perubahan besar terhadap entitas yang sudah ada.

---

## 5.5 Maintainability

Penamaan tabel, atribut, dan relasi mengikuti standar yang konsisten sehingga mudah dipahami dan dipelihara oleh pengembang.

---

## 5.6 Security

Database hanya menyimpan data yang diperlukan.

Informasi sensitif seperti kata sandi disimpan dalam bentuk hash, sedangkan akses terhadap data dikendalikan melalui mekanisme autentikasi dan otorisasi yang telah didefinisikan pada dokumen arsitektur.

---

# 6. Database Design Approach

Perancangan database dilakukan dalam tiga tahap utama.

## 6.1 Conceptual Database Design

Tahap ini berfokus pada identifikasi seluruh entitas bisnis beserta hubungan antar entitas.

Belum ditentukan atribut, tipe data, maupun implementasi fisik database.

---

## 6.2 Logical Database Design

Tahap ini mendefinisikan atribut setiap entitas, Primary Key, Foreign Key, serta aturan hubungan antar data.

Tahap ini masih bersifat independen terhadap DBMS tertentu.

---

## 6.3 Physical Database Design

Tahap terakhir menerjemahkan desain logis menjadi struktur database yang siap diimplementasikan menggunakan MySQL.

Tahap ini meliputi penentuan tipe data, indeks, constraint, serta strategi optimasi query.

---

# 7. Entity Identification

Entity Identification merupakan proses mengidentifikasi seluruh objek bisnis (business object) yang terdapat pada domain aplikasi **OurSky**.

Setiap entity merepresentasikan objek yang memiliki identitas, atribut, dan siklus hidup di dalam sistem.

Pada tahap ini belum ditentukan atribut, tipe data, maupun implementasi tabel database. Fokus utama hanya pada identifikasi entity yang diperlukan untuk mendukung seluruh kebutuhan bisnis aplikasi.

---

## 7.1 Core Entities

Core Entity merupakan entity utama yang menjadi fondasi sistem.

| Entity       | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| User         | Merepresentasikan pengguna aplikasi.                            |
| Relationship | Merepresentasikan hubungan antara dua pengguna.                 |
| Invitation   | Merepresentasikan proses undangan untuk membentuk Relationship. |

---

### 7.2 Feature Entities

Feature Entity merupakan entity yang merepresentasikan fitur utama aplikasi OurSky.

| Entity          | Description                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| Memory          | Menyimpan kenangan yang dibuat oleh pasangan.                                                                       |
| Memory Media    | Menyimpan foto atau media lain yang terkait dengan sebuah Memory. Satu Memory dapat memiliki lebih dari satu media. |
| Question        | Menyimpan daftar pertanyaan yang tersedia dalam aplikasi.                                                           |
| Question Answer | Menyimpan jawaban pengguna terhadap setiap pertanyaan.                                                              |
| Dream           | Menyimpan daftar impian atau target yang ingin dicapai bersama pasangan.                                            |
| Important Day   | Menyimpan tanggal-tanggal penting dalam hubungan, seperti anniversary atau ulang tahun.                             |
| Time Capsule    | Menyimpan pesan yang hanya dapat dibuka pada waktu tertentu.                                                        |
| Open When       | Menyimpan surat atau pesan yang dibuka berdasarkan kondisi tertentu, misalnya "Open When You Miss Me".              |


---

### 7.3 Supporting Entities

Supporting Entity digunakan untuk mendukung proses bisnis aplikasi tanpa menjadi fitur utama.

| Entity             | Description                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Relationship Event | Menyimpan seluruh aktivitas penting yang terjadi dalam Relationship dan menjadi sumber utama timeline maupun aktivitas sistem. |
| Notification       | Menyimpan notifikasi yang diterima pengguna berdasarkan aktivitas yang terjadi di dalam sistem.                                |

Entity pada kategori ini mendukung komunikasi antar fitur serta meningkatkan konsistensi aktivitas aplikasi.

> **Catatan:** Countdown **bukan** merupakan entity database. Countdown merupakan **derived data** yang dihitung secara dinamis berdasarkan tanggal pada entity **Important Day** dan tanggal saat ini. Oleh karena itu, Countdown tidak memiliki tabel maupun proses CRUD tersendiri.


---

### 7.4 System Entities

Pada versi pertama (MVP), OurSky tidak memiliki System Entity khusus.

Fitur seperti Audit Log, Activity Log, maupun System Configuration belum menjadi kebutuhan utama dan dapat ditambahkan pada pengembangan berikutnya apabila diperlukan.

Pendekatan ini menjaga struktur database tetap sederhana, mudah dipahami, dan sesuai dengan ruang lingkup proyek.


---

# 8. Entity Classification

Setelah seluruh entity berhasil diidentifikasi, langkah berikutnya adalah mengelompokkan entity berdasarkan perannya di dalam sistem.

Pengelompokan ini bertujuan untuk mempermudah proses desain database, perancangan relasi, serta pengembangan aplikasi.

---

## 8.1 Core Domain

Core Domain merupakan pusat dari seluruh sistem.

```text
User
│
├── Relationship
│
└── Invitation
```

Entity pada Core Domain menjadi dasar bagi seluruh fitur aplikasi.

---

### 8.2 Feature Domain

Feature Domain berisi entity yang merepresentasikan seluruh fitur utama aplikasi.

```text
Relationship
│
├── Memory
├── Dream
├── Question
├── Important Day
├── Time Capsule
└── Open When
```

Seluruh Feature Domain dimiliki oleh satu Relationship sehingga seluruh data yang dibuat pengguna selalu berada dalam konteks hubungan mereka.


---

### 8.3 Media Domain

Media Domain bertanggung jawab terhadap penyimpanan seluruh media yang dimiliki sebuah Memory.

```text
Memory
│
└── Memory Media
```

Pemisahan entity ini memungkinkan satu Memory memiliki banyak foto atau media lainnya tanpa membatasi jumlah file yang dapat disimpan.


---

## 8.4 Activity Domain

Activity Domain menyimpan seluruh aktivitas yang terjadi selama Relationship berlangsung.

```text
Relationship
│
└── Relationship Event
```

Relationship Event menjadi pusat pencatatan aktivitas yang dapat dimanfaatkan oleh fitur lain seperti Timeline maupun Notification.

---

### 8.5 Communication Domain

Communication Domain menangani penyampaian informasi kepada pengguna berdasarkan aktivitas yang terjadi di dalam sistem.

```text
Relationship Event
        │
        ▼
Notification
```

Relationship Event menjadi sumber aktivitas, sedangkan Notification bertugas menyampaikan informasi kepada pengguna.

Countdown tidak termasuk ke dalam Communication Domain karena merupakan nilai yang dihitung secara dinamis dari **Important Day**.


---

## 8.6 System Domain

System Domain digunakan untuk mendukung operasional aplikasi.

```text
Audit Log
```

Entity pada domain ini tidak berhubungan langsung dengan fitur pengguna namun penting untuk kebutuhan administrasi, keamanan, dan pemeliharaan sistem.

---

# 9. Conceptual Entity Relationship

Conceptual Entity Relationship menggambarkan hubungan antar entity pada tingkat konseptual.

Tahap ini belum membahas Primary Key, Foreign Key, maupun implementasi tabel.

Fokus utama adalah memahami bagaimana setiap entity saling berinteraksi dalam domain bisnis OurSky.

---

### 9.1 Relationship Overview

Hubungan antar entity pada tingkat konseptual digambarkan sebagai berikut.

```text
User
 │
 ├──────────── Invitation
 │
 └──────────── Relationship
                   │
                   ├──────────── Memory
                   │                 │
                   │                 └──────── Memory Media
                   │
                   ├──────────── Question
                   │                 │
                   │                 └──────── Question Answer
                   │
                   ├──────────── Dream
                   │
                   ├──────────── Important Day
                   │
                   ├──────────── Time Capsule
                   │
                   ├──────────── Open When
                   │
                   ├──────────── Relationship Event
                   │
                   └──────────── Notification
```

Diagram di atas menggambarkan hubungan konseptual antar entity tanpa menampilkan Primary Key, Foreign Key, maupun detail implementasi database.

> **Catatan Desain:** Countdown tidak dimodelkan sebagai entity karena nilainya merupakan hasil perhitungan berdasarkan tanggal pada **Important Day**. Pendekatan ini menjaga normalisasi database, mengurangi redundansi data, serta menghindari proses sinkronisasi yang tidak diperlukan.



---

## 9.2 Relationship Principles

Perancangan hubungan antar entity mengikuti prinsip berikut.

### Ownership

Setiap data harus memiliki pemilik yang jelas.

Sebagian besar Feature Entity dimiliki oleh satu Relationship.

---

### Integrity

Hubungan antar entity harus menjaga integritas data melalui aturan relasi yang akan didefinisikan pada tahap Logical Database Design.

---

### Independence

Setiap entity memiliki tanggung jawab yang spesifik sehingga perubahan pada satu entity tidak memberikan dampak besar terhadap entity lainnya.

---

### Extensibility

Model relasi dirancang agar mudah dikembangkan ketika fitur baru ditambahkan tanpa memerlukan perubahan besar terhadap struktur entity yang sudah ada.

---

## 9.3 Next Stage

Setelah Conceptual Entity Relationship selesai, proses dilanjutkan ke **Logical Database Design**.

Pada tahap tersebut setiap entity akan mulai memiliki:

* Attribute
* Primary Key
* Foreign Key
* Business Rules
* Cardinality
* Validation Rules

Logical Database Design akan menjadi dasar penyusunan struktur tabel pada tahap Physical Database Design.


# 10. Logical Database Design

## 10.1 Overview

Logical Database Design merupakan tahap perancangan struktur data secara logis berdasarkan hasil identifikasi entity dan hubungan antar entity yang telah didefinisikan pada bab sebelumnya.

Pada tahap ini setiap entity mulai didefinisikan secara lebih rinci, meliputi tujuan entity, atribut yang dimiliki, hubungan dengan entity lain, aturan bisnis, aturan validasi, serta siklus hidup data. Logical Database Design belum membahas implementasi fisik database seperti tipe data SQL, panjang karakter, indeks, maupun Foreign Key. Seluruh aspek tersebut akan dijelaskan pada Bab 11 (Physical Database Design).

Tujuan utama dari tahap ini adalah memastikan bahwa seluruh kebutuhan data aplikasi telah terdefinisi secara lengkap sebelum diterjemahkan menjadi struktur tabel pada database MySQL.

---

## 10.2 Database Dictionary

Database Dictionary memberikan gambaran umum mengenai seluruh entity yang digunakan dalam sistem OurSky.

| Entity             | Domain     | Description                                      |
| ------------------ | ---------- | ------------------------------------------------ |
| User               | Core       | Menyimpan informasi pengguna aplikasi.           |
| Relationship       | Core       | Menyimpan hubungan antara dua pengguna.          |
| Invitation         | Core       | Menyimpan proses undangan hubungan.              |
| Memory             | Feature    | Menyimpan kenangan pasangan.                     |
| Memory Media       | Feature    | Menyimpan media pada setiap Memory.              |
| Question           | Feature    | Menyimpan daftar pertanyaan hubungan.            |
| Question Answer    | Feature    | Menyimpan jawaban pengguna terhadap pertanyaan.  |
| Dream              | Feature    | Menyimpan daftar impian pasangan.                |
| Important Day      | Feature    | Menyimpan tanggal penting hubungan.              |
| Time Capsule       | Feature    | Menyimpan pesan yang dibuka pada waktu tertentu. |
| Open When          | Feature    | Menyimpan surat berdasarkan kondisi tertentu.    |
| Relationship Event | Supporting | Menyimpan aktivitas hubungan.                    |
| Notification       | Supporting | Menyimpan notifikasi pengguna.                   |

Seluruh entity di atas telah diidentifikasi berdasarkan kebutuhan bisnis aplikasi dan akan dijelaskan secara rinci pada subbab berikutnya.

---

# 10.3 User Entity

## Purpose

Entity **User** merupakan entity utama dalam sistem yang merepresentasikan setiap individu yang menggunakan aplikasi OurSky. Seluruh data pribadi pengguna disimpan pada entity ini dan menjadi dasar bagi proses autentikasi, otorisasi, serta kepemilikan data pada fitur-fitur lainnya.

---

## Attributes

| Attribute       | Description                                               |
| --------------- | --------------------------------------------------------- |
| User ID         | Identitas unik pengguna.                                  |
| Full Name       | Nama lengkap pengguna.                                    |
| Email           | Alamat email yang digunakan untuk login.                  |
| Password        | Password pengguna yang disimpan dalam bentuk terenkripsi. |
| Profile Picture | Foto profil pengguna.                                     |
| Created At      | Waktu akun dibuat.                                        |
| Updated At      | Waktu terakhir data diperbarui.                           |

---

## Relationships

| Related Entity | Relationship                                                   |
| -------------- | -------------------------------------------------------------- |
| Relationship   | Seorang User dapat memiliki satu Relationship aktif.           |
| Invitation     | Seorang User dapat mengirim maupun menerima banyak Invitation. |
| Notification   | Seorang User dapat menerima banyak Notification.               |

---

## Business Rules

* Email harus bersifat unik.
* Setiap akun hanya dapat dimiliki oleh satu pengguna.
* Seorang pengguna hanya dapat memiliki satu Relationship yang aktif pada satu waktu.
* Pengguna dapat menggunakan aplikasi tanpa memiliki pasangan.
* Pengguna menjadi pemilik seluruh data yang dibuat melalui aplikasi.

---

## Validation Rules

* Full Name wajib diisi.
* Email wajib diisi dan menggunakan format email yang valid.
* Password wajib diisi saat registrasi.
* Profile Picture bersifat opsional.

---

## Lifecycle

```text
Register
      │
      ▼
Account Created
      │
      ▼
Login
      │
      ▼
Update Profile
      │
      ▼
Deactivate (Optional)
```

---

## Usage

Entity User digunakan oleh modul berikut.

* Authentication
* User Profile
* Relationship
* Invitation
* Notification

---

# 10.4 Relationship Entity

## Purpose

Entity **Relationship** merepresentasikan hubungan romantis antara dua pengguna. Seluruh fitur utama OurSky berpusat pada entity ini sehingga Relationship menjadi pemilik (owner) bagi hampir seluruh data fitur di dalam aplikasi.

---

## Attributes

| Attribute         | Description                         |
| ----------------- | ----------------------------------- |
| Relationship ID   | Identitas unik hubungan.            |
| Partner One       | Pengguna pertama dalam hubungan.    |
| Partner Two       | Pengguna kedua dalam hubungan.      |
| Relationship Date | Tanggal dimulainya hubungan.        |
| Status            | Status hubungan.                    |
| Created At        | Waktu hubungan dibuat.              |
| Updated At        | Waktu terakhir hubungan diperbarui. |

---

## Relationships

| Related Entity     | Relationship                                              |
| ------------------ | --------------------------------------------------------- |
| User               | Relationship dimiliki oleh dua User.                      |
| Memory             | Satu Relationship dapat memiliki banyak Memory.           |
| Dream              | Satu Relationship dapat memiliki banyak Dream.            |
| Important Day      | Satu Relationship dapat memiliki banyak Important Day.    |
| Question Answer    | Satu Relationship memiliki kumpulan jawaban pasangan.     |
| Time Capsule       | Satu Relationship dapat memiliki banyak Time Capsule.     |
| Open When          | Satu Relationship dapat memiliki banyak Open When.        |
| Relationship Event | Satu Relationship menghasilkan banyak Relationship Event. |

---

## Business Rules

* Relationship harus terdiri dari tepat dua pengguna.
* Seorang pengguna tidak dapat memiliki lebih dari satu Relationship aktif.
* Relationship hanya dapat dibuat setelah Invitation diterima.
* Seluruh data fitur dimiliki oleh Relationship.
* Relationship dapat dinonaktifkan tanpa menghapus data historis.

---

## Validation Rules

* Partner One wajib diisi.
* Partner Two wajib diisi.
* Kedua partner tidak boleh merupakan pengguna yang sama.
* Relationship Date wajib diisi.

---

## Lifecycle

```text
Invitation Accepted
         │
         ▼
Relationship Created
         │
         ▼
Active
         │
         ▼
Updated
         │
         ▼
Ended (Optional)
```

---

## Usage

Entity Relationship digunakan oleh hampir seluruh fitur aplikasi.

* Memory
* Dream
* Important Day
* Question
* Time Capsule
* Open When
* Relationship Timeline
* Dashboard

---

# 10.5 Invitation Entity

## Purpose

Entity **Invitation** digunakan untuk mengelola proses pembentukan Relationship. Invitation memungkinkan seorang pengguna mengundang pengguna lain untuk menjadi pasangan di dalam aplikasi.

---

## Attributes

| Attribute     | Description                      |
| ------------- | -------------------------------- |
| Invitation ID | Identitas unik undangan.         |
| Sender        | Pengguna yang mengirim undangan. |
| Receiver      | Pengguna yang menerima undangan. |
| Status        | Status undangan.                 |
| Sent At       | Waktu undangan dikirim.          |
| Responded At  | Waktu undangan dijawab.          |

---

## Relationships

| Related Entity | Relationship                                                  |
| -------------- | ------------------------------------------------------------- |
| User           | Invitation memiliki satu pengirim dan satu penerima.          |
| Relationship   | Invitation yang diterima akan menghasilkan satu Relationship. |

---

## Business Rules

* Pengguna tidak dapat mengirim Invitation kepada dirinya sendiri.
* Pengguna tidak dapat mengirim Invitation apabila sudah memiliki Relationship aktif.
* Hanya satu Invitation aktif yang diperbolehkan untuk pasangan pengguna yang sama.
* Invitation hanya dapat berada pada satu status aktif pada satu waktu.
* Invitation yang diterima akan membentuk Relationship baru.

---

## Validation Rules

* Sender wajib diisi.
* Receiver wajib diisi.
* Sender dan Receiver tidak boleh sama.
* Status wajib memiliki nilai yang valid.

---

## Lifecycle

```text
Created
     │
     ▼
Sent
     │
     ├────────► Accepted ───────► Relationship Created
     │
     ├────────► Rejected
     │
     └────────► Expired
```

---

## Usage

Entity Invitation digunakan oleh modul berikut.

* Pairing Process
* Relationship Management
* Notification


# 10.6 Memory Entity

## Purpose

Entity **Memory** digunakan untuk menyimpan setiap kenangan yang dibuat oleh pasangan selama menjalani hubungan. Memory menjadi pusat dokumentasi aktivitas bersama dan dapat dilengkapi dengan satu atau lebih media pendukung.

---

## Attributes

| Attribute    | Description                            |
| ------------ | -------------------------------------- |
| Memory ID    | Identitas unik Memory.                 |
| Relationship | Relationship yang memiliki Memory.     |
| Title        | Judul Memory.                          |
| Description  | Deskripsi atau cerita mengenai Memory. |
| Memory Date  | Tanggal terjadinya Memory.             |
| Location     | Lokasi Memory (opsional).              |
| Created At   | Waktu Memory dibuat.                   |
| Updated At   | Waktu terakhir Memory diperbarui.      |

---

## Relationships

| Related Entity     | Relationship                                           |
| ------------------ | ------------------------------------------------------ |
| Relationship       | Satu Memory dimiliki oleh satu Relationship.           |
| Memory Media       | Satu Memory dapat memiliki banyak Memory Media.        |
| Relationship Event | Pembuatan Memory menghasilkan satu Relationship Event. |

---

## Business Rules

* Memory harus dimiliki oleh satu Relationship.
* Setiap Memory dapat memiliki nol atau lebih media.
* Memory dapat dibuat tanpa menyertakan media.
* Memory dapat diubah maupun dihapus oleh pasangan yang memiliki Relationship.

---

## Validation Rules

* Title wajib diisi.
* Memory Date wajib diisi.
* Description bersifat opsional.
* Location bersifat opsional.

---

## Lifecycle

```text
Created
    │
    ▼
Media Added (Optional)
    │
    ▼
Updated
    │
    ▼
Deleted (Optional)
```

---

## Usage

Entity Memory digunakan oleh modul berikut.

* Timeline
* Gallery
* Dashboard
* Search
* Relationship Event

---

# 10.7 Memory Media Entity

## Purpose

Entity **Memory Media** digunakan untuk menyimpan seluruh media yang berkaitan dengan sebuah Memory. Pemisahan entity ini memungkinkan satu Memory memiliki banyak foto atau media lainnya tanpa membatasi jumlah file.

---

## Attributes

| Attribute   | Description                            |
| ----------- | -------------------------------------- |
| Media ID    | Identitas unik media.                  |
| Memory      | Memory yang memiliki media.            |
| File URL    | Lokasi penyimpanan file.               |
| Media Type  | Jenis media, seperti image atau video. |
| Uploaded At | Waktu media diunggah.                  |

---

## Relationships

| Related Entity | Relationship                                   |
| -------------- | ---------------------------------------------- |
| Memory         | Banyak Memory Media dimiliki oleh satu Memory. |

---

## Business Rules

* Setiap Memory Media harus dimiliki oleh satu Memory.
* Satu file hanya merepresentasikan satu media.
* Penghapusan Memory akan menghapus seluruh Memory Media yang dimilikinya.

---

## Validation Rules

* File URL wajib diisi.
* Media Type wajib diisi.
* Memory wajib diisi.

---

## Lifecycle

```text
Upload
   │
   ▼
Stored
   │
   ▼
Viewed
   │
   ▼
Deleted (Optional)
```

---

## Usage

Entity Memory Media digunakan oleh modul berikut.

* Gallery
* Timeline
* Memory Detail

---

# 10.8 Question Entity

## Purpose

Entity **Question** menyimpan daftar pertanyaan yang tersedia pada aplikasi untuk membantu pasangan saling mengenal, berdiskusi, maupun membangun komunikasi yang lebih baik.

Question bersifat master data sehingga dapat digunakan oleh seluruh pengguna.

---

## Attributes

| Attribute     | Description                     |
| ------------- | ------------------------------- |
| Question ID   | Identitas unik pertanyaan.      |
| Question Text | Isi pertanyaan.                 |
| Category      | Kategori pertanyaan.            |
| Is Active     | Status ketersediaan pertanyaan. |
| Created At    | Waktu pertanyaan dibuat.        |

---

## Relationships

| Related Entity  | Relationship                                         |
| --------------- | ---------------------------------------------------- |
| Question Answer | Satu Question dapat memiliki banyak Question Answer. |

---

## Business Rules

* Question dapat digunakan oleh banyak Relationship.
* Question yang tidak aktif tidak dapat dijawab.
* Isi Question bersifat tetap dan tidak berubah berdasarkan pengguna.

---

## Validation Rules

* Question Text wajib diisi.
* Category wajib diisi.

---

## Lifecycle

```text
Created
    │
    ▼
Published
    │
    ▼
Used
    │
    ▼
Archived (Optional)
```

---

## Usage

Entity Question digunakan oleh modul berikut.

* Daily Question
* Couple Question
* Question History

---

# 10.9 Question Answer Entity

## Purpose

Entity **Question Answer** digunakan untuk menyimpan jawaban setiap pengguna terhadap pertanyaan yang tersedia di dalam aplikasi.

Jawaban bersifat personal sehingga dua pengguna dalam satu Relationship dapat memberikan jawaban yang berbeda untuk Question yang sama.

---

## Attributes

| Attribute    | Description                       |
| ------------ | --------------------------------- |
| Answer ID    | Identitas unik jawaban.           |
| Question     | Pertanyaan yang dijawab.          |
| Relationship | Relationship pemilik jawaban.     |
| User         | Pengguna yang memberikan jawaban. |
| Answer Text  | Isi jawaban.                      |
| Answered At  | Waktu jawaban dikirim.            |

---

## Relationships

| Related Entity     | Relationship                                            |
| ------------------ | ------------------------------------------------------- |
| Question           | Banyak Question Answer berasal dari satu Question.      |
| Relationship       | Banyak Question Answer dimiliki oleh satu Relationship. |
| User               | Banyak Question Answer dibuat oleh satu User.           |
| Relationship Event | Jawaban baru dapat menghasilkan Relationship Event.     |

---

## Business Rules

* Seorang User hanya dapat memberikan satu jawaban untuk satu Question.
* Kedua pasangan dapat memberikan jawaban terhadap Question yang sama.
* Jawaban dapat diperbarui sebelum ditutup apabila fitur mengizinkan.

---

## Validation Rules

* Question wajib diisi.
* User wajib diisi.
* Answer Text wajib diisi.
* Relationship wajib diisi.

---

## Lifecycle

```text
Question Open
      │
      ▼
Answered
      │
      ▼
Updated (Optional)
```

---

## Usage

Entity Question Answer digunakan oleh modul berikut.

* Couple Question
* Question History
* Dashboard
* Relationship Event


# 10.10 Dream Entity

## Purpose

Entity **Dream** digunakan untuk menyimpan daftar impian, target, maupun tujuan yang ingin dicapai bersama oleh pasangan. Entity ini membantu pasangan merencanakan masa depan serta memantau perkembangan setiap impian yang telah dibuat.

---

## Attributes

| Attribute    | Description                         |
| ------------ | ----------------------------------- |
| Dream ID     | Identitas unik Dream.               |
| Relationship | Relationship yang memiliki Dream.   |
| Title        | Judul impian.                       |
| Description  | Penjelasan mengenai impian.         |
| Target Date  | Target waktu pencapaian (opsional). |
| Status       | Status pencapaian Dream.            |
| Created At   | Waktu Dream dibuat.                 |
| Updated At   | Waktu terakhir Dream diperbarui.    |

---

## Relationships

| Related Entity     | Relationship                                                             |
| ------------------ | ------------------------------------------------------------------------ |
| Relationship       | Banyak Dream dimiliki oleh satu Relationship.                            |
| Relationship Event | Pembuatan atau penyelesaian Dream dapat menghasilkan Relationship Event. |

---

## Business Rules

* Dream harus dimiliki oleh satu Relationship.
* Status Dream hanya dapat memiliki satu nilai aktif pada satu waktu.
* Dream dapat ditandai sebagai selesai tanpa harus dihapus.
* Dream dapat diperbarui selama masih aktif.

---

## Validation Rules

* Title wajib diisi.
* Relationship wajib diisi.
* Status wajib memiliki nilai yang valid.
* Target Date bersifat opsional.

---

## Lifecycle

```text
Created
    │
    ▼
In Progress
    │
    ├────────► Completed
    │
    └────────► Archived (Optional)
```

---

## Usage

Entity Dream digunakan oleh modul berikut.

* Dream List
* Dashboard
* Relationship Event

---

# 10.11 Important Day Entity

## Purpose

Entity **Important Day** digunakan untuk menyimpan seluruh tanggal penting dalam hubungan, seperti hari jadi, ulang tahun pasangan, atau momen spesial lainnya.

Entity ini juga menjadi sumber utama untuk perhitungan countdown secara dinamis tanpa memerlukan penyimpanan data countdown di database.

---

## Attributes

| Attribute        | Description                              |
| ---------------- | ---------------------------------------- |
| Important Day ID | Identitas unik hari penting.             |
| Relationship     | Relationship yang memiliki hari penting. |
| Title            | Nama hari penting.                       |
| Event Date       | Tanggal terjadinya peristiwa.            |
| Description      | Keterangan tambahan (opsional).          |
| Created At       | Waktu data dibuat.                       |
| Updated At       | Waktu terakhir data diperbarui.          |

---

## Relationships

| Related Entity     | Relationship                                                          |
| ------------------ | --------------------------------------------------------------------- |
| Relationship       | Banyak Important Day dimiliki oleh satu Relationship.                 |
| Relationship Event | Pembuatan Important Day menghasilkan Relationship Event.              |
| Notification       | Notification dapat dibuat berdasarkan Important Day yang akan datang. |

---

## Business Rules

* Important Day harus dimiliki oleh satu Relationship.
* Satu Relationship dapat memiliki banyak Important Day.
* Countdown dihitung secara dinamis berdasarkan Event Date.
* Important Day dapat digunakan sebagai dasar pengingat (reminder).

---

## Validation Rules

* Title wajib diisi.
* Event Date wajib diisi.
* Relationship wajib diisi.
* Description bersifat opsional.

---

## Lifecycle

```text
Created
    │
    ▼
Upcoming
    │
    ▼
Reminder Sent (Optional)
    │
    ▼
Occurred
```

---

## Usage

Entity Important Day digunakan oleh modul berikut.

* Calendar
* Countdown
* Dashboard
* Notification
* Relationship Event

---

# 10.12 Time Capsule Entity

## Purpose

Entity **Time Capsule** digunakan untuk menyimpan pesan yang hanya dapat dibuka pada tanggal atau waktu tertentu yang telah ditentukan oleh pasangan.

Fitur ini memberikan pengalaman menyimpan pesan untuk masa depan dan menjaga pesan tetap terkunci hingga waktu pembukaannya tiba.

---

## Attributes

| Attribute       | Description                        |
| --------------- | ---------------------------------- |
| Time Capsule ID | Identitas unik kapsul waktu.       |
| Relationship    | Relationship pemilik kapsul waktu. |
| Title           | Judul kapsul waktu.                |
| Message         | Isi pesan.                         |
| Open Date       | Tanggal kapsul dapat dibuka.       |
| Status          | Status kapsul waktu.               |
| Created At      | Waktu kapsul dibuat.               |

---

## Relationships

| Related Entity     | Relationship                                            |
| ------------------ | ------------------------------------------------------- |
| Relationship       | Banyak Time Capsule dimiliki oleh satu Relationship.    |
| Relationship Event | Pembukaan Time Capsule menghasilkan Relationship Event. |

---

## Business Rules

* Time Capsule hanya dapat dibuka setelah mencapai Open Date.
* Pesan tidak dapat diubah setelah kapsul dikunci.
* Kapsul hanya dapat dibuka oleh pasangan yang memiliki Relationship tersebut.

---

## Validation Rules

* Title wajib diisi.
* Message wajib diisi.
* Open Date wajib diisi.
* Relationship wajib diisi.

---

## Lifecycle

```text
Created
    │
    ▼
Locked
    │
    ▼
Opened
```

---

## Usage

Entity Time Capsule digunakan oleh modul berikut.

* Time Capsule
* Dashboard
* Relationship Event

---

# 10.13 Open When Entity

## Purpose

Entity **Open When** digunakan untuk menyimpan surat atau pesan yang dapat dibuka ketika kondisi tertentu terjadi, misalnya *"Open When You Miss Me"* atau *"Open When You're Sad"*.

Berbeda dengan Time Capsule yang bergantung pada tanggal, Open When dibuka berdasarkan konteks atau kondisi tertentu.

---

## Attributes

| Attribute         | Description                      |
| ----------------- | -------------------------------- |
| Open When ID      | Identitas unik surat.            |
| Relationship      | Relationship pemilik surat.      |
| Title             | Judul surat.                     |
| Trigger Condition | Kondisi pembukaan surat.         |
| Message           | Isi surat.                       |
| Created At        | Waktu surat dibuat.              |
| Updated At        | Waktu terakhir surat diperbarui. |

---

## Relationships

| Related Entity     | Relationship                                                          |
| ------------------ | --------------------------------------------------------------------- |
| Relationship       | Banyak Open When dimiliki oleh satu Relationship.                     |
| Relationship Event | Pembuatan atau pembukaan surat dapat menghasilkan Relationship Event. |

---

## Business Rules

* Open When harus dimiliki oleh satu Relationship.
* Trigger Condition harus ditentukan saat surat dibuat.
* Surat dapat dibuka kapan saja oleh pasangan ketika kondisi tersebut dirasa sesuai.
* Surat dapat diperbarui sebelum dibaca apabila fitur mengizinkan.

---

## Validation Rules

* Title wajib diisi.
* Trigger Condition wajib diisi.
* Message wajib diisi.
* Relationship wajib diisi.

---

## Lifecycle

```text
Created
    │
    ▼
Available
    │
    ▼
Opened
```

---

## Usage

Entity Open When digunakan oleh modul berikut.

* Open When
* Dashboard
* Relationship Event

# 10.14 Relationship Event Entity

## Purpose

Entity **Relationship Event** digunakan untuk mencatat seluruh aktivitas penting yang terjadi di dalam suatu Relationship. Entity ini berfungsi sebagai pusat aktivitas (*activity timeline*) yang menghubungkan berbagai fitur di dalam aplikasi.

Relationship Event tidak menyimpan data utama suatu fitur, tetapi menyimpan informasi bahwa suatu aktivitas telah terjadi sehingga dapat ditampilkan pada Timeline, Dashboard, maupun digunakan sebagai sumber pembuatan Notification.

---

## Attributes

| Attribute     | Description                                                                           |
| ------------- | ------------------------------------------------------------------------------------- |
| Event ID      | Identitas unik aktivitas.                                                             |
| Relationship  | Relationship pemilik aktivitas.                                                       |
| Event Type    | Jenis aktivitas yang terjadi.                                                         |
| Source Entity | Nama entity yang menjadi sumber aktivitas, seperti Memory, Dream, atau Important Day. |
| Source ID     | Identitas data pada Source Entity yang memicu aktivitas.                              |
| Description   | Ringkasan aktivitas yang ditampilkan kepada pengguna.                                 |
| Event Date    | Waktu aktivitas terjadi.                                                              |
| Created At    | Waktu event dicatat ke dalam sistem.                                                  |

---

## Relationships

| Related Entity | Relationship                                               |
| -------------- | ---------------------------------------------------------- |
| Relationship   | Banyak Relationship Event dimiliki oleh satu Relationship. |

Relationship Event dapat dibuat oleh aktivitas dari beberapa entity berikut.

* Memory
* Question Answer
* Dream
* Important Day
* Time Capsule
* Open When

---

## Business Rules

* Setiap Relationship Event harus berasal dari satu Relationship.
* Setiap Event hanya merepresentasikan satu aktivitas.
* Source Entity dan Source ID harus mengacu pada data yang valid.
* Relationship Event tidak boleh menjadi sumber data utama suatu fitur.
* Penghapusan data sumber tidak mengharuskan Relationship Event ikut dihapus apabila histori aktivitas masih ingin dipertahankan.

---

## Validation Rules

* Relationship wajib diisi.
* Event Type wajib memiliki nilai yang valid.
* Source Entity wajib diisi.
* Source ID wajib diisi.
* Event Date wajib diisi.

---

## Lifecycle

```text
Activity Occurred
        │
        ▼
Event Created
        │
        ▼
Displayed
        │
        ▼
Archived (Optional)
```

---

## Usage

Entity Relationship Event digunakan oleh modul berikut.

* Timeline
* Dashboard
* Activity Feed
* Notification

---

### Example

| Source Entity | Source ID | Event Type            | Description                                      |
| ------------- | --------- | --------------------- | ------------------------------------------------ |
| Memory        | 15        | MEMORY_CREATED        | "Memory baru berhasil ditambahkan."              |
| Dream         | 8         | DREAM_COMPLETED       | "Impian 'Liburan ke Jepang' telah diselesaikan." |
| Important Day | 3         | IMPORTANT_DAY_CREATED | "Hari penting baru berhasil ditambahkan."        |
| Time Capsule  | 2         | TIME_CAPSULE_OPENED   | "Time Capsule berhasil dibuka."                  |


---

# 10.15 Notification Entity

## Purpose

Entity **Notification** digunakan untuk menyimpan seluruh notifikasi yang diterima pengguna berdasarkan aktivitas yang terjadi di dalam aplikasi.

Notification berfungsi sebagai media penyampaian informasi kepada pengguna mengenai aktivitas Relationship maupun pengingat terhadap fitur tertentu.

---

## Attributes

| Attribute         | Description                            |
| ----------------- | -------------------------------------- |
| Notification ID   | Identitas unik notifikasi.             |
| User              | Pengguna penerima notifikasi.          |
| Title             | Judul notifikasi.                      |
| Message           | Isi notifikasi.                        |
| Notification Type | Jenis notifikasi.                      |
| Is Read           | Status apakah notifikasi telah dibaca. |
| Sent At           | Waktu notifikasi dibuat atau dikirim.  |

---

## Relationships

| Related Entity     | Relationship                                              |
| ------------------ | --------------------------------------------------------- |
| User               | Banyak Notification dimiliki oleh satu User.              |
| Relationship Event | Notification dapat dibuat berdasarkan Relationship Event. |
| Important Day      | Notification dapat dibuat sebagai pengingat hari penting. |

---

## Business Rules

* Notification hanya dimiliki oleh satu User.
* Notification dapat ditandai sebagai sudah dibaca tanpa dihapus.
* Notification dapat berasal dari berbagai sumber aktivitas.
* Notification tidak boleh mengubah data sumbernya.

---

## Validation Rules

* User wajib diisi.
* Title wajib diisi.
* Message wajib diisi.
* Notification Type wajib memiliki nilai yang valid.

---

## Lifecycle

```text
Generated
     │
     ▼
Delivered
     │
     ▼
Read
     │
     ▼
Archived (Optional)
```

---

## Usage

Entity Notification digunakan oleh modul berikut.

* Notification Center
* Dashboard
* Reminder
* Timeline

---

# 10.16 Summary

Logical Database Design telah mendefinisikan seluruh entity utama yang digunakan dalam aplikasi OurSky beserta atribut, hubungan, aturan bisnis, aturan validasi, dan siklus hidup datanya.

Sebanyak **13 entity** telah dirancang dan dikelompokkan ke dalam tiga domain utama, yaitu Core Domain, Feature Domain, dan Supporting Domain. Seluruh entity tersebut telah disusun berdasarkan kebutuhan bisnis aplikasi sehingga mampu mendukung implementasi seluruh fitur utama OurSky.

Logical Database Design menjadi dasar bagi tahap berikutnya, yaitu **Physical Database Design**, yang akan menerjemahkan setiap entity menjadi struktur tabel, kolom, tipe data, primary key, foreign key, indeks, serta aturan implementasi pada database MySQL.


# 11. Physical Database Design

## 11.1 Overview

Physical Database Design merupakan tahap penerjemahan hasil Logical Database Design ke dalam struktur fisik database yang akan diimplementasikan menggunakan MySQL.

Pada tahap ini setiap entity yang telah didefinisikan pada Bab 10 diterjemahkan menjadi tabel beserta kolom, tipe data, Primary Key, Foreign Key, indeks, dan aturan implementasi lainnya.

Tujuan utama Physical Database Design adalah memastikan struktur database dapat diimplementasikan secara efisien, konsisten, mudah dipelihara, serta mampu mendukung seluruh kebutuhan aplikasi OurSky.

---

# 11.2 Database Platform

OurSky menggunakan **MySQL** sebagai Relational Database Management System (RDBMS).

Pemilihan MySQL didasarkan pada beberapa pertimbangan berikut.

* Bersifat open-source.
* Stabil dan banyak digunakan pada aplikasi web.
* Memiliki performa yang baik untuk aplikasi skala kecil hingga menengah.
* Mendukung transaksi (ACID).
* Mendukung Foreign Key dan Referential Integrity.
* Mudah diintegrasikan dengan Node.js dan Express.

Spesifikasi implementasi database sebagai berikut.

| Component      | Value                                                        |
| -------------- | ------------------------------------------------------------ |
| DBMS           | MySQL                                                        |
| Storage Engine | InnoDB                                                       |
| Character Set  | utf8mb4                                                      |
| Collation      | utf8mb4_unicode_ci                                           |
| Time Zone      | UTC                                                          |
| ORM            | Prisma ORM *(atau ORM yang dipilih pada tahap implementasi)* |

---

# 11.3 Naming Convention

Untuk menjaga konsistensi implementasi database, seluruh objek database mengikuti standar penamaan berikut.

## Table Naming

Seluruh nama tabel menggunakan format **snake_case** dengan bentuk jamak (plural).

Contoh:

```text
users
relationships
memories
notifications
```

---

## Column Naming

Seluruh nama kolom menggunakan format **snake_case**.

Contoh:

```text
full_name

created_at

updated_at

relationship_id
```

---

## Primary Key

Seluruh tabel menggunakan kolom **id** sebagai Primary Key.

Contoh:

```text
id
```

---

## Foreign Key

Foreign Key menggunakan pola:

```text
<entity>_id
```

Contoh:

```text
user_id

relationship_id

memory_id

question_id
```

---

## Timestamp

Seluruh tabel yang menyimpan data utama menggunakan:

```text
created_at

updated_at
```

---

## Boolean

Penamaan atribut bertipe Boolean menggunakan awalan:

```text
is_

has_
```

Contoh:

```text
is_read

is_active
```

---

# 11.4 Physical Design Principles

Implementasi database mengikuti prinsip-prinsip berikut.

### Data Integrity

Integritas data dijaga melalui penggunaan Primary Key, Foreign Key, dan aturan referensial pada setiap relasi antar tabel.

---

### Data Consistency

Seluruh tabel menggunakan standar penamaan, tipe data, serta struktur kolom yang seragam sehingga memudahkan pengembangan maupun pemeliharaan aplikasi.

---

### Scalability

Struktur tabel dirancang agar dapat dikembangkan di masa mendatang tanpa memerlukan perubahan besar terhadap desain database yang sudah ada.

---

### Performance

Database dirancang agar mampu memberikan performa yang baik melalui penggunaan indeks pada kolom-kolom yang sering digunakan dalam proses pencarian maupun relasi.

---

### Maintainability

Seluruh struktur tabel dibuat sederhana, mudah dipahami, dan mengikuti prinsip normalisasi sehingga mempermudah proses pengembangan maupun debugging.


# 11.5 Table Specification

## 11.5.1 Users Table

Tabel **users** menyimpan seluruh informasi akun pengguna yang menggunakan aplikasi OurSky.

| Column          | Data Type | Length | Null | Default                                       | Description                     |
| --------------- | --------- | ------ | ---- | --------------------------------------------- | ------------------------------- |
| id              | BIGINT    | 20     | No   | AUTO_INCREMENT                                | Primary Key.                    |
| full_name       | VARCHAR   | 100    | No   | -                                             | Nama lengkap pengguna.          |
| email           | VARCHAR   | 255    | No   | -                                             | Email pengguna (unik).          |
| password        | VARCHAR   | 255    | No   | -                                             | Password yang telah di-hash.    |
| profile_picture | VARCHAR   | 255    | Yes  | NULL                                          | URL foto profil pengguna.       |
| created_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP                             | Waktu data dibuat.              |
| updated_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Waktu terakhir data diperbarui. |

### Constraints

* Primary Key : `id`
* Unique : `email`

### Index

| Column | Index Type | Purpose                                            |
| ------ | ---------- | -------------------------------------------------- |
| id     | PRIMARY    | Identifikasi utama.                                |
| email  | UNIQUE     | Mempercepat proses login dan mencegah email ganda. |

---

## 11.5.2 Relationships Table

Tabel **relationships** menyimpan hubungan yang dimiliki oleh dua pengguna. Hampir seluruh fitur utama OurSky terhubung dengan tabel ini.

| Column      | Data Type | Length | Null | Default                                       | Description                      |
| ----------- | --------- | ------ | ---- | --------------------------------------------- | -------------------------------- |
| id          | BIGINT    | 20     | No   | AUTO_INCREMENT                                | Primary Key.                     |
| user_one_id | BIGINT    | 20     | No   | -                                             | Foreign Key ke pengguna pertama. |
| user_two_id | BIGINT    | 20     | No   | -                                             | Foreign Key ke pengguna kedua.   |
| status      | ENUM      | -      | No   | 'ACTIVE'                                      | Status hubungan.                 |
| started_at  | DATE      | -      | No   | -                                             | Tanggal hubungan dimulai.        |
| created_at  | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP                             | Waktu data dibuat.               |
| updated_at  | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Waktu terakhir data diperbarui.  |

### Constraints

* Primary Key : `id`
* Foreign Key : `user_one_id → users.id`
* Foreign Key : `user_two_id → users.id`

### Index

| Column      | Index Type | Purpose                                                          |
| ----------- | ---------- | ---------------------------------------------------------------- |
| id          | PRIMARY    | Identifikasi utama.                                              |
| user_one_id | INDEX      | Mempercepat pencarian relationship berdasarkan pengguna pertama. |
| user_two_id | INDEX      | Mempercepat pencarian relationship berdasarkan pengguna kedua.   |
| status      | INDEX      | Mempercepat pencarian relationship aktif.                        |

---

## 11.5.3 Invitations Table

Tabel **invitations** digunakan untuk menyimpan proses undangan hubungan antar pengguna sebelum Relationship terbentuk.

| Column          | Data Type | Length | Null | Default                                       | Description                      |
| --------------- | --------- | ------ | ---- | --------------------------------------------- | -------------------------------- |
| id              | BIGINT    | 20     | No   | AUTO_INCREMENT                                | Primary Key.                     |
| sender_id       | BIGINT    | 20     | No   | -                                             | Pengguna yang mengirim undangan. |
| receiver_id     | BIGINT    | 20     | No   | -                                             | Pengguna penerima undangan.      |
| status          | ENUM      | -      | No   | 'PENDING'                                     | Status undangan.                 |
| invitation_code | VARCHAR   | 50     | No   | -                                             | Kode unik undangan.              |
| expires_at      | TIMESTAMP | -      | Yes  | NULL                                          | Batas waktu undangan.            |
| created_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP                             | Waktu data dibuat.               |
| updated_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Waktu terakhir data diperbarui.  |

### Constraints

* Primary Key : `id`
* Foreign Key : `sender_id → users.id`
* Foreign Key : `receiver_id → users.id`
* Unique : `invitation_code`

### Index

| Column          | Index Type | Purpose                                                |
| --------------- | ---------- | ------------------------------------------------------ |
| id              | PRIMARY    | Identifikasi utama.                                    |
| sender_id       | INDEX      | Mempercepat pencarian undangan yang dikirim pengguna.  |
| receiver_id     | INDEX      | Mempercepat pencarian undangan yang diterima pengguna. |
| invitation_code | UNIQUE     | Menjamin kode undangan bersifat unik.                  |
| status          | INDEX      | Mempercepat pencarian berdasarkan status undangan.     |

---

## Core Domain Relationship

Hubungan antar tabel pada Core Domain ditunjukkan sebagai berikut.

```text
users
   │
   ├──────────────┐
   │              │
   ▼              ▼
relationships   invitations
```

Keterangan:

* Satu pengguna dapat mengirim maupun menerima banyak undangan.
* Satu Relationship selalu menghubungkan tepat dua pengguna.
* Relationship hanya dapat dibuat setelah Invitation berstatus **Accepted**.


# 11.5 Table Specification

## 11.5.4 Memories Table

Tabel **memories** menyimpan seluruh kenangan yang dibuat oleh pasangan.

| Column          | Data Type | Length | Null | Default                                       | Description                     |
| --------------- | --------- | ------ | ---- | --------------------------------------------- | ------------------------------- |
| id              | BIGINT    | 20     | No   | AUTO_INCREMENT                                | Primary Key.                    |
| relationship_id | BIGINT    | 20     | No   | -                                             | Foreign Key ke relationships.   |
| title           | VARCHAR   | 150    | No   | -                                             | Judul kenangan.                 |
| description     | TEXT      | -      | Yes  | NULL                                          | Deskripsi kenangan.             |
| memory_date     | DATE      | -      | No   | -                                             | Tanggal kenangan.               |
| location        | VARCHAR   | 150    | Yes  | NULL                                          | Lokasi kenangan.                |
| created_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP                             | Waktu data dibuat.              |
| updated_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Waktu terakhir data diperbarui. |

### Constraints

* Primary Key : `id`
* Foreign Key : `relationship_id → relationships.id`

### Index

| Column          | Index Type | Purpose                                                |
| --------------- | ---------- | ------------------------------------------------------ |
| id              | PRIMARY    | Identifikasi utama.                                    |
| relationship_id | INDEX      | Mempercepat pencarian Memory berdasarkan Relationship. |
| memory_date     | INDEX      | Mempercepat pengurutan timeline.                       |

---

## 11.5.5 Memory Media Table

Tabel **memory_media** menyimpan seluruh file media yang dimiliki oleh sebuah Memory.

| Column      | Data Type | Length | Null | Default           | Description              |
| ----------- | --------- | ------ | ---- | ----------------- | ------------------------ |
| id          | BIGINT    | 20     | No   | AUTO_INCREMENT    | Primary Key.             |
| memory_id   | BIGINT    | 20     | No   | -                 | Foreign Key ke memories. |
| file_url    | VARCHAR   | 255    | No   | -                 | Lokasi penyimpanan file. |
| media_type  | ENUM      | -      | No   | 'IMAGE'           | Jenis media.             |
| uploaded_at | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP | Waktu file diunggah.     |

### Constraints

* Primary Key : `id`
* Foreign Key : `memory_id → memories.id`

### Index

| Column    | Index Type | Purpose                                     |
| --------- | ---------- | ------------------------------------------- |
| id        | PRIMARY    | Identifikasi utama.                         |
| memory_id | INDEX      | Mempercepat pengambilan media suatu Memory. |

---

## 11.5.6 Questions Table

Tabel **questions** menyimpan daftar pertanyaan yang dapat dijawab oleh pasangan.

| Column        | Data Type | Length | Null | Default           | Description        |
| ------------- | --------- | ------ | ---- | ----------------- | ------------------ |
| id            | BIGINT    | 20     | No   | AUTO_INCREMENT    | Primary Key.       |
| question_text | TEXT      | -      | No   | -                 | Isi pertanyaan.    |
| is_active     | BOOLEAN   | -      | No   | TRUE              | Status pertanyaan. |
| created_at    | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP | Waktu data dibuat. |

### Constraints

* Primary Key : `id`

### Index

| Column    | Index Type | Purpose                                 |
| --------- | ---------- | --------------------------------------- |
| id        | PRIMARY    | Identifikasi utama.                     |
| is_active | INDEX      | Mempercepat pencarian pertanyaan aktif. |

---

## 11.5.7 Question Answers Table

Tabel **question_answers** menyimpan jawaban masing-masing pengguna terhadap suatu pertanyaan.

| Column          | Data Type | Length | Null | Default           | Description                   |
| --------------- | --------- | ------ | ---- | ----------------- | ----------------------------- |
| id              | BIGINT    | 20     | No   | AUTO_INCREMENT    | Primary Key.                  |
| question_id     | BIGINT    | 20     | No   | -                 | Foreign Key ke questions.     |
| relationship_id | BIGINT    | 20     | No   | -                 | Foreign Key ke relationships. |
| user_id         | BIGINT    | 20     | No   | -                 | Foreign Key ke users.         |
| answer_text     | TEXT      | -      | No   | -                 | Jawaban pengguna.             |
| answered_at     | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP | Waktu menjawab.               |

### Constraints

* Primary Key : `id`
* Foreign Key : `question_id → questions.id`
* Foreign Key : `relationship_id → relationships.id`
* Foreign Key : `user_id → users.id`

### Index

| Column          | Index Type | Purpose                                               |
| --------------- | ---------- | ----------------------------------------------------- |
| id              | PRIMARY    | Identifikasi utama.                                   |
| question_id     | INDEX      | Mempercepat pencarian jawaban berdasarkan pertanyaan. |
| relationship_id | INDEX      | Mempercepat pencarian jawaban pasangan.               |
| user_id         | INDEX      | Mempercepat pencarian jawaban pengguna.               |

---

## 11.5.8 Dreams Table

Tabel **dreams** menyimpan daftar impian atau target yang dimiliki oleh pasangan.

| Column          | Data Type | Length | Null | Default                                       | Description                     |
| --------------- | --------- | ------ | ---- | --------------------------------------------- | ------------------------------- |
| id              | BIGINT    | 20     | No   | AUTO_INCREMENT                                | Primary Key.                    |
| relationship_id | BIGINT    | 20     | No   | -                                             | Foreign Key ke relationships.   |
| title           | VARCHAR   | 150    | No   | -                                             | Judul impian.                   |
| description     | TEXT      | -      | Yes  | NULL                                          | Penjelasan impian.              |
| target_date     | DATE      | -      | Yes  | NULL                                          | Target pencapaian.              |
| status          | ENUM      | -      | No   | 'IN_PROGRESS'                                 | Status impian.                  |
| created_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP                             | Waktu data dibuat.              |
| updated_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Waktu terakhir data diperbarui. |

### Constraints

* Primary Key : `id`
* Foreign Key : `relationship_id → relationships.id`

### Index

| Column          | Index Type | Purpose                                |
| --------------- | ---------- | -------------------------------------- |
| id              | PRIMARY    | Identifikasi utama.                    |
| relationship_id | INDEX      | Mempercepat pencarian impian pasangan. |
| status          | INDEX      | Mempercepat filter berdasarkan status. |

---

## 11.5.9 Important Days Table

Tabel **important_days** menyimpan seluruh tanggal penting dalam suatu hubungan.

| Column          | Data Type | Length | Null | Default                                       | Description                     |
| --------------- | --------- | ------ | ---- | --------------------------------------------- | ------------------------------- |
| id              | BIGINT    | 20     | No   | AUTO_INCREMENT                                | Primary Key.                    |
| relationship_id | BIGINT    | 20     | No   | -                                             | Foreign Key ke relationships.   |
| title           | VARCHAR   | 150    | No   | -                                             | Nama hari penting.              |
| event_date      | DATE      | -      | No   | -                                             | Tanggal peristiwa.              |
| description     | TEXT      | -      | Yes  | NULL                                          | Keterangan tambahan.            |
| created_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP                             | Waktu data dibuat.              |
| updated_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Waktu terakhir data diperbarui. |

### Constraints

* Primary Key : `id`
* Foreign Key : `relationship_id → relationships.id`

### Index

| Column          | Index Type | Purpose                                   |
| --------------- | ---------- | ----------------------------------------- |
| id              | PRIMARY    | Identifikasi utama.                       |
| relationship_id | INDEX      | Mempercepat pencarian data pasangan.      |
| event_date      | INDEX      | Mempercepat proses reminder dan kalender. |

---

## 11.5.10 Feature Domain Relationship

```text
relationships
      │
      ├──────────► memories
      │               │
      │               ▼
      │         memory_media
      │
      ├──────────► dreams
      │
      ├──────────► important_days
      │
      └──────────► question_answers
                       ▲
                       │
                  questions
```


# 11.5 Table Specification

## 11.5.10 Time Capsules Table

Tabel **time_capsules** menyimpan pesan yang hanya dapat dibuka setelah tanggal yang telah ditentukan.

| Column          | Data Type | Length | Null | Default           | Description                            |
| --------------- | --------- | ------ | ---- | ----------------- | -------------------------------------- |
| id              | BIGINT    | 20     | No   | AUTO_INCREMENT    | Primary Key.                           |
| relationship_id | BIGINT    | 20     | No   | -                 | Foreign Key ke relationships.          |
| title           | VARCHAR   | 150    | No   | -                 | Judul Time Capsule.                    |
| message         | TEXT      | -      | No   | -                 | Isi pesan.                             |
| open_date       | DATETIME  | -      | No   | -                 | Tanggal dan waktu kapsul dapat dibuka. |
| status          | ENUM      | -      | No   | 'LOCKED'          | Status Time Capsule.                   |
| created_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP | Waktu data dibuat.                     |

### Constraints

* Primary Key : `id`
* Foreign Key : `relationship_id → relationships.id`

### Index

| Column          | Index Type | Purpose                                                |
| --------------- | ---------- | ------------------------------------------------------ |
| id              | PRIMARY    | Identifikasi utama.                                    |
| relationship_id | INDEX      | Mempercepat pencarian kapsul berdasarkan Relationship. |
| open_date       | INDEX      | Mempercepat pengecekan kapsul yang siap dibuka.        |
| status          | INDEX      | Mempercepat filter status kapsul.                      |

**ENUM Status**

```text id="9lm5nk"
LOCKED
OPENED
```

---

## 11.5.11 Open Whens Table

Tabel **open_whens** menyimpan surat atau pesan yang dapat dibuka berdasarkan kondisi tertentu.

| Column          | Data Type | Length | Null | Default                                       | Description                     |
| --------------- | --------- | ------ | ---- | --------------------------------------------- | ------------------------------- |
| id              | BIGINT    | 20     | No   | AUTO_INCREMENT                                | Primary Key.                    |
| relationship_id | BIGINT    | 20     | No   | -                                             | Foreign Key ke relationships.   |
| title           | VARCHAR   | 150    | No   | -                                             | Judul surat.                    |
| category        | ENUM      | -      | No   | -                                             | Kategori Open When.             |
| message         | TEXT      | -      | No   | -                                             | Isi surat.                      |
| created_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP                             | Waktu data dibuat.              |
| updated_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Waktu terakhir data diperbarui. |

### Constraints

* Primary Key : `id`
* Foreign Key : `relationship_id → relationships.id`

### Index

| Column          | Index Type | Purpose                                               |
| --------------- | ---------- | ----------------------------------------------------- |
| id              | PRIMARY    | Identifikasi utama.                                   |
| relationship_id | INDEX      | Mempercepat pencarian surat berdasarkan Relationship. |
| category        | INDEX      | Mempercepat filter berdasarkan kategori.              |

**ENUM Category**

```text id="7rxyv5"
MISS_YOU
SAD
HAPPY
MOTIVATION
ANNIVERSARY
OTHER
```

---

## 11.5.12 Relationship Events Table

Tabel **relationship_events** menyimpan riwayat aktivitas yang terjadi dalam suatu Relationship dan menjadi sumber utama Timeline aplikasi.

| Column          | Data Type | Length | Null | Default           | Description                   |
| --------------- | --------- | ------ | ---- | ----------------- | ----------------------------- |
| id              | BIGINT    | 20     | No   | AUTO_INCREMENT    | Primary Key.                  |
| relationship_id | BIGINT    | 20     | No   | -                 | Foreign Key ke relationships. |
| event_type      | VARCHAR   | 50     | No   | -                 | Jenis aktivitas.              |
| source_entity   | VARCHAR   | 50     | No   | -                 | Nama entity sumber aktivitas. |
| source_id       | BIGINT    | 20     | No   | -                 | ID data sumber aktivitas.     |
| description     | VARCHAR   | 255    | No   | -                 | Ringkasan aktivitas.          |
| event_date      | DATETIME  | -      | No   | -                 | Waktu aktivitas terjadi.      |
| created_at      | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP | Waktu event dicatat.          |

### Constraints

* Primary Key : `id`
* Foreign Key : `relationship_id → relationships.id`

### Index

| Column          | Index Type | Purpose                                    |
| --------------- | ---------- | ------------------------------------------ |
| id              | PRIMARY    | Identifikasi utama.                        |
| relationship_id | INDEX      | Mempercepat pengambilan timeline pasangan. |
| event_type      | INDEX      | Mempercepat filter jenis aktivitas.        |
| event_date      | INDEX      | Mempercepat pengurutan timeline terbaru.   |

---

## 11.5.13 Notifications Table

Tabel **notifications** menyimpan seluruh notifikasi yang diterima pengguna.

| Column            | Data Type | Length | Null | Default           | Description              |
| ----------------- | --------- | ------ | ---- | ----------------- | ------------------------ |
| id                | BIGINT    | 20     | No   | AUTO_INCREMENT    | Primary Key.             |
| user_id           | BIGINT    | 20     | No   | -                 | Foreign Key ke users.    |
| title             | VARCHAR   | 150    | No   | -                 | Judul notifikasi.        |
| message           | VARCHAR   | 255    | No   | -                 | Isi notifikasi.          |
| notification_type | VARCHAR   | 50     | No   | -                 | Jenis notifikasi.        |
| is_read           | BOOLEAN   | -      | No   | FALSE             | Status baca notifikasi.  |
| created_at        | TIMESTAMP | -      | No   | CURRENT_TIMESTAMP | Waktu notifikasi dibuat. |

### Constraints

* Primary Key : `id`
* Foreign Key : `user_id → users.id`

### Index

| Column            | Index Type | Purpose                                          |
| ----------------- | ---------- | ------------------------------------------------ |
| id                | PRIMARY    | Identifikasi utama.                              |
| user_id           | INDEX      | Mempercepat pengambilan notifikasi pengguna.     |
| is_read           | INDEX      | Mempercepat filter notifikasi yang belum dibaca. |
| notification_type | INDEX      | Mempercepat filter berdasarkan jenis notifikasi. |

---

## 11.5.14 Complete Physical Schema Overview

```text id="t2h6ko"
users
├── relationships
│   ├── memories
│   │   └── memory_media
│   ├── dreams
│   ├── important_days
│   ├── time_capsules
│   ├── open_whens
│   ├── relationship_events
│   └── question_answers
│        └── questions
│
├── invitations
│
└── notifications
```

Seluruh tabel pada Physical Database Design saling terhubung melalui Primary Key dan Foreign Key sesuai dengan kebutuhan fitur aplikasi. Struktur ini menjaga integritas data, meminimalkan redundansi, dan mendukung pengembangan aplikasi secara berkelanjutan.


# 11.6 Primary Key Strategy

Seluruh tabel pada database OurSky menggunakan **surrogate key** berupa kolom `id` sebagai Primary Key.

Strategi ini dipilih karena memberikan beberapa keuntungan, yaitu:

* Menjamin setiap baris data memiliki identitas yang unik.
* Mempermudah pembuatan relasi antar tabel.
* Mengurangi kompleksitas perubahan data bisnis karena Primary Key tidak bergantung pada atribut bisnis.
* Meningkatkan kompatibilitas dengan ORM seperti Prisma.

Setiap Primary Key menggunakan spesifikasi berikut.

| Property       | Value  |
| -------------- | ------ |
| Data Type      | BIGINT |
| Auto Increment | Ya     |
| Nullable       | Tidak  |
| Unique         | Ya     |

---

# 11.7 Foreign Key Strategy

Foreign Key digunakan untuk menjaga integritas referensial antar tabel sehingga setiap relasi selalu mengacu pada data yang valid.

Seluruh Foreign Key mengikuti pola penamaan:

```text
<entity>_id
```

Contoh:

```text
user_id
relationship_id
memory_id
question_id
```

Kebijakan implementasi Foreign Key pada OurSky adalah sebagai berikut.

| Rule                    | Implementation           |
| ----------------------- | ------------------------ |
| ON UPDATE               | CASCADE                  |
| ON DELETE (Master Data) | RESTRICT                 |
| ON DELETE (Child Data)  | CASCADE sesuai kebutuhan |

Contoh penerapan:

* Penghapusan **Memory** akan menghapus seluruh **Memory Media** yang terkait (`ON DELETE CASCADE`).
* Penghapusan **Relationship** dibatasi (`ON DELETE RESTRICT`) apabila masih terdapat data yang bergantung padanya.
* Perubahan nilai Primary Key akan diteruskan secara otomatis ke tabel terkait (`ON UPDATE CASCADE`).

Strategi ini menjaga konsistensi data sekaligus mencegah terbentuknya data yatim (*orphan records*).

---

# 11.8 Data Type Strategy

Pemilihan tipe data dilakukan berdasarkan karakteristik data yang disimpan agar penggunaan ruang penyimpanan tetap efisien serta mendukung performa database.

| Data Category    | Data Type        | Example                 |
| ---------------- | ---------------- | ----------------------- |
| Identifier       | BIGINT           | id                      |
| Short Text       | VARCHAR(100–255) | full_name, title        |
| Long Text        | TEXT             | description, message    |
| Email            | VARCHAR(255)     | email                   |
| URL              | VARCHAR(255)     | file_url                |
| Boolean          | BOOLEAN          | is_read, is_active      |
| Date             | DATE             | memory_date, event_date |
| Date & Time      | DATETIME         | open_date, answered_at  |
| System Timestamp | TIMESTAMP        | created_at, updated_at  |
| Enumeration      | ENUM             | status, media_type      |

Strategi ini menghasilkan struktur database yang lebih efisien dibandingkan penggunaan tipe data yang sama untuk seluruh kolom.

---

# 11.9 Database Normalization

Desain database OurSky menerapkan prinsip normalisasi hingga **Third Normal Form (3NF)** untuk mengurangi redundansi data serta menjaga konsistensi informasi.

## First Normal Form (1NF)

Seluruh tabel memiliki Primary Key dan setiap kolom menyimpan satu nilai atomik (tidak ada data multivalue).

Contoh:

* Satu Memory disimpan sebagai satu baris data.
* Setiap foto atau video disimpan pada tabel **memory_media**, bukan dalam satu kolom yang berisi banyak nilai.

---

## Second Normal Form (2NF)

Seluruh atribut non-key bergantung sepenuhnya pada Primary Key.

Contoh:

* Informasi pengguna hanya disimpan pada tabel **users**.
* Informasi Relationship tidak disalin ke tabel lain, tetapi direferensikan menggunakan Foreign Key.

---

## Third Normal Form (3NF)

Tidak terdapat ketergantungan transitif antar atribut non-key.

Contoh:

* Countdown tidak disimpan sebagai tabel karena dapat dihitung dari `event_date`.
* Relationship Event hanya menyimpan referensi terhadap data sumber melalui `source_entity` dan `source_id`.
* Notification tidak menduplikasi isi data dari fitur lain, melainkan hanya menyimpan informasi yang diperlukan untuk notifikasi.

Dengan menerapkan normalisasi hingga 3NF, database menjadi lebih mudah dipelihara, mengurangi duplikasi data, dan menjaga konsistensi informasi.

---

# 11.10 Storage Strategy

Database dirancang untuk mendukung kebutuhan aplikasi OurSky pada tahap Minimum Viable Product (MVP) dengan tetap mempertimbangkan pengembangan di masa mendatang.

Strategi penyimpanan yang diterapkan meliputi:

* Seluruh data relasional disimpan pada MySQL menggunakan Storage Engine InnoDB.
* File media seperti foto dan video tidak disimpan langsung di database, melainkan pada media penyimpanan terpisah. Database hanya menyimpan URL atau lokasi file pada kolom `file_url`.
* Kolom yang sering digunakan dalam proses pencarian dan relasi diberikan indeks untuk meningkatkan performa.
* Struktur tabel dirancang modular sehingga fitur baru dapat ditambahkan tanpa mengubah struktur inti database.

Strategi ini menjaga ukuran database tetap efisien sekaligus mempermudah proses backup, pemeliharaan, dan pengembangan aplikasi.

---

# 11.11 Summary

Physical Database Design telah menerjemahkan seluruh hasil Logical Database Design menjadi spesifikasi implementasi database yang siap digunakan pada MySQL.

Sebanyak **13 tabel** telah dirancang untuk mendukung seluruh kebutuhan fungsional aplikasi OurSky. Setiap tabel telah dilengkapi dengan spesifikasi kolom, tipe data, Primary Key, Foreign Key, indeks, serta aturan implementasi yang konsisten.

Selain itu, strategi penggunaan Primary Key, Foreign Key, tipe data, normalisasi, dan penyimpanan telah ditetapkan untuk memastikan database memiliki integritas yang tinggi, mudah dipelihara, serta mampu mendukung pengembangan aplikasi di masa mendatang.

Dokumen Physical Database Design ini menjadi acuan utama dalam pembuatan skema database, migrasi, Prisma Schema, Entity Relationship Diagram (ERD), serta implementasi backend menggunakan Node.js, Express, dan MySQL.


# 12. Database Constraints

## 12.1 Overview

Database Constraints merupakan sekumpulan aturan yang diterapkan pada database untuk menjaga integritas, konsistensi, dan validitas data. Setiap tabel pada database OurSky menerapkan constraint sesuai dengan kebutuhan bisnis sehingga data yang tersimpan tetap akurat dan saling terhubung dengan benar.

Constraint diterapkan baik pada level kolom maupun relasi antar tabel.

---

# 12.2 Primary Key Constraint

Seluruh tabel menggunakan Primary Key berupa kolom `id`.

Primary Key berfungsi untuk:

* Mengidentifikasi setiap baris data secara unik.
* Mencegah duplikasi identitas data.
* Menjadi acuan relasi antar tabel.

Karakteristik Primary Key pada OurSky:

| Property       | Value  |
| -------------- | ------ |
| Data Type      | BIGINT |
| Auto Increment | Ya     |
| Nullable       | Tidak  |
| Unique         | Ya     |

Seluruh tabel menggunakan pola Primary Key yang sama untuk menjaga konsistensi implementasi.

---

# 12.3 Foreign Key Constraint

Foreign Key digunakan untuk menghubungkan data antar tabel sehingga setiap relasi selalu mengacu pada data yang valid.

Contoh relasi Foreign Key yang digunakan pada OurSky antara lain:

| Child Table         | Foreign Key     | Parent Table  |
| ------------------- | --------------- | ------------- |
| relationships       | user_one_id     | users         |
| relationships       | user_two_id     | users         |
| invitations         | sender_id       | users         |
| invitations         | receiver_id     | users         |
| memories            | relationship_id | relationships |
| memory_media        | memory_id       | memories      |
| question_answers    | question_id     | questions     |
| question_answers    | relationship_id | relationships |
| question_answers    | user_id         | users         |
| dreams              | relationship_id | relationships |
| important_days      | relationship_id | relationships |
| time_capsules       | relationship_id | relationships |
| open_whens          | relationship_id | relationships |
| relationship_events | relationship_id | relationships |
| notifications       | user_id         | users         |

Seluruh Foreign Key mengikuti aturan referential integrity sehingga tidak diperbolehkan mengacu pada data yang tidak ada.

---

# 12.4 Unique Constraint

Unique Constraint digunakan untuk memastikan suatu nilai tidak muncul lebih dari satu kali apabila memang harus bersifat unik.

Beberapa kolom yang menggunakan Unique Constraint adalah sebagai berikut.

| Table            | Column                                | Purpose                                                                                              |
| ---------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| users            | email                                 | Mencegah penggunaan email yang sama oleh lebih dari satu pengguna.                                   |
| invitations      | invitation_code                       | Menjamin setiap kode undangan bersifat unik.                                                         |
| question_answers | question_id, relationship_id, user_id | Menjamin satu pengguna hanya dapat menjawab satu kali untuk satu pertanyaan dalam satu Relationship. |

---

# 12.5 NOT NULL Constraint

Kolom yang bersifat wajib menggunakan NOT NULL agar data penting tidak dapat disimpan dalam keadaan kosong.

Contoh kolom wajib antara lain:

* full_name
* email
* password
* relationship_id
* title
* question_text
* answer_text
* event_date
* open_date

Kolom opsional seperti `description`, `profile_picture`, `location`, dan `target_date` diperbolehkan bernilai NULL.

---

# 12.6 CHECK Constraint

CHECK Constraint digunakan untuk memastikan nilai yang disimpan memenuhi aturan bisnis tertentu.

Contoh aturan yang diterapkan meliputi:

| Rule                       | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| user_one_id <> user_two_id | Mencegah pengguna berpasangan dengan dirinya sendiri.       |
| open_date >= created_at    | Time Capsule hanya dapat dibuka setelah dibuat.             |
| target_date >= created_at  | Target Dream tidak boleh lebih awal dari tanggal pembuatan. |

Apabila implementasi CHECK Constraint tidak didukung secara penuh oleh versi MySQL yang digunakan, validasi dilakukan pada tingkat aplikasi (backend).

---

# 12.7 Default Constraint

Beberapa kolom memiliki nilai awal (default value) sehingga tidak perlu selalu diisi secara manual.

| Column              | Default Value     |
| ------------------- | ----------------- |
| created_at          | CURRENT_TIMESTAMP |
| updated_at          | CURRENT_TIMESTAMP |
| is_read             | FALSE             |
| is_active           | TRUE              |
| relationship.status | ACTIVE            |
| invitation.status   | PENDING           |
| dream.status        | IN_PROGRESS       |
| time_capsule.status | LOCKED            |

Penggunaan default value membantu menjaga konsistensi data sekaligus menyederhanakan proses penyimpanan.

---

# 12.8 Referential Actions

Referential Action menentukan perilaku database ketika data pada tabel induk diubah atau dihapus.

| Action                  | Implementation |
| ----------------------- | -------------- |
| ON UPDATE               | CASCADE        |
| ON DELETE (Child Data)  | CASCADE        |
| ON DELETE (Master Data) | RESTRICT       |

Contoh implementasi:

* Penghapusan Memory akan menghapus seluruh Memory Media yang terkait.
* Penghapusan Relationship akan ditolak apabila masih terdapat data yang bergantung padanya.
* Perubahan nilai Primary Key akan diteruskan secara otomatis ke tabel terkait.

---

# 12.9 Summary

Database Constraints memastikan seluruh data pada aplikasi OurSky memenuhi aturan integritas dan konsistensi yang telah ditetapkan. Dengan penerapan Primary Key, Foreign Key, Unique Constraint, NOT NULL, CHECK, Default Value, dan Referential Action, struktur database menjadi lebih aman, stabil, dan mampu mencegah terjadinya inkonsistensi data selama proses operasional aplikasi.


# 13. Index Strategy

## 13.1 Overview

Index Strategy merupakan strategi yang digunakan untuk meningkatkan performa proses pencarian, penyaringan, pengurutan, dan relasi data pada database OurSky.

Tanpa penggunaan indeks yang tepat, setiap proses pengambilan data harus melakukan pemindaian seluruh isi tabel (*Full Table Scan*), yang dapat menurunkan performa seiring bertambahnya jumlah data.

Strategi indeks pada OurSky dirancang untuk:

* Mempercepat proses pencarian data.
* Mengoptimalkan proses JOIN antar tabel.
* Mendukung fitur penyaringan (*filtering*) dan pengurutan (*sorting*).
* Menjaga keseimbangan antara performa baca (*read performance*) dan performa tulis (*write performance*).

---

# 13.2 Index Design Principles

Perancangan indeks pada database OurSky mengikuti prinsip-prinsip berikut.

### Primary Key Index

Seluruh Primary Key secara otomatis memiliki indeks untuk mempercepat identifikasi setiap baris data.

---

### Foreign Key Index

Seluruh Foreign Key diberikan indeks karena sering digunakan dalam proses JOIN maupun pencarian data berdasarkan relasi.

Contoh:

* relationship_id
* user_id
* memory_id
* question_id

---

### Search Index

Kolom yang sering digunakan dalam proses pencarian diberikan indeks untuk mengurangi waktu pencarian.

Contoh:

* email
* invitation_code
* title (pada tabel tertentu jika diperlukan)

---

### Filter Index

Kolom yang sering digunakan sebagai kondisi filter diberikan indeks agar proses pengambilan data menjadi lebih cepat.

Contoh:

* status
* is_active
* is_read
* category

---

### Sorting Index

Kolom yang sering digunakan untuk mengurutkan data diberikan indeks.

Contoh:

* created_at
* updated_at
* event_date
* memory_date
* open_date

---

# 13.3 Composite Index Strategy

Selain indeks pada satu kolom, beberapa kebutuhan query memerlukan Composite Index (indeks gabungan) agar proses pencarian lebih efisien.

Composite Index digunakan ketika beberapa kolom sering digunakan secara bersamaan dalam klausa `WHERE`, `JOIN`, maupun `ORDER BY`.

Contoh penerapan:

| Table               | Composite Index                         | Purpose                                                                    |
| ------------------- | --------------------------------------- | -------------------------------------------------------------------------- |
| question_answers    | (question_id, relationship_id, user_id) | Memastikan jawaban pengguna bersifat unik sekaligus mempercepat pencarian. |
| notifications       | (user_id, is_read)                      | Mempercepat pengambilan notifikasi yang belum dibaca.                      |
| relationship_events | (relationship_id, event_date)           | Mempercepat penampilan Timeline berdasarkan urutan waktu.                  |
| important_days      | (relationship_id, event_date)           | Mempercepat pengambilan kalender dan pengingat berdasarkan pasangan.       |

Composite Index hanya diterapkan pada query yang benar-benar sering digunakan agar tidak menambah beban proses penyimpanan data.

---

# 13.4 Query Optimization Strategy

Beberapa strategi optimasi query yang diterapkan pada OurSky adalah sebagai berikut.

### Menggunakan Foreign Key yang Terindeks

Seluruh proses JOIN dilakukan melalui kolom yang telah memiliki indeks sehingga proses relasi data lebih cepat.

---

### Menghindari Full Table Scan

Query dirancang menggunakan kolom yang telah diindeks sehingga database tidak perlu membaca seluruh isi tabel.

---

### Menggunakan LIMIT untuk Data Bertahap

Data seperti Timeline, Gallery, maupun Notification ditampilkan secara bertahap menggunakan `LIMIT` dan pagination sehingga mengurangi beban database.

---

### Memilih Kolom yang Diperlukan

Query hanya mengambil kolom yang dibutuhkan, bukan menggunakan `SELECT *`, sehingga mengurangi jumlah data yang dikirim dari database ke aplikasi.

---

# 13.5 Performance Considerations

Walaupun indeks mampu mempercepat proses pembacaan data, penggunaan indeks yang berlebihan dapat memperlambat proses penyimpanan, pembaruan, dan penghapusan data.

Oleh karena itu, indeks hanya diterapkan pada kolom yang:

* Sering digunakan dalam pencarian.
* Sering digunakan pada proses JOIN.
* Digunakan sebagai kondisi filter.
* Digunakan dalam pengurutan data.
* Memiliki nilai selektivitas yang cukup baik untuk mendukung optimasi query.

Pendekatan ini menjaga keseimbangan antara performa operasi baca dan tulis pada database.

---

# 13.6 Monitoring and Maintenance

Agar performa database tetap optimal seiring bertambahnya jumlah data, dilakukan beberapa langkah pemeliharaan sebagai berikut.

* Meninjau query yang sering digunakan selama proses pengembangan.
* Mengevaluasi kebutuhan indeks baru berdasarkan pola penggunaan aplikasi.
* Menghapus indeks yang tidak lagi memberikan manfaat.
* Melakukan pengujian performa setelah perubahan struktur tabel atau indeks.

Strategi ini memastikan bahwa indeks yang digunakan tetap relevan dengan kebutuhan aplikasi.

---

# 13.7 Summary

Strategi indeks pada database OurSky dirancang untuk mendukung performa aplikasi tanpa mengorbankan efisiensi penyimpanan data. Dengan penerapan Primary Key Index, Foreign Key Index, Search Index, Filter Index, Sorting Index, dan Composite Index secara selektif, proses pencarian, relasi, penyaringan, serta pengurutan data dapat dilakukan dengan lebih cepat dan konsisten.

Selain itu, penerapan strategi optimasi query dan pemeliharaan indeks secara berkala mendukung skalabilitas aplikasi apabila jumlah pengguna dan volume data meningkat di masa mendatang.


# 14. Data Lifecycle

## 14.1 Overview

Data Lifecycle menjelaskan bagaimana data dikelola sejak pertama kali dibuat hingga tidak lagi digunakan dalam sistem. Pengelolaan data yang terstruktur membantu menjaga integritas database, meningkatkan keamanan informasi, serta mempermudah proses pemeliharaan aplikasi.

Pada aplikasi OurSky, setiap data mengikuti siklus hidup yang disesuaikan dengan kebutuhan bisnis dan karakteristik masing-masing fitur.

---

# 14.2 Data Lifecycle Stages

Secara umum, data pada aplikasi OurSky melewati lima tahapan utama.

```text
Data Creation
      │
      ▼
Data Usage
      │
      ▼
Data Update
      │
      ▼
Data Archive (Optional)
      │
      ▼
Data Deletion
```

---

## 14.3 Data Creation

Tahap Data Creation merupakan proses ketika data pertama kali dibuat dan disimpan ke dalam database.

Pada tahap ini sistem melakukan:

* Validasi seluruh data masukan.
* Pemeriksaan aturan bisnis.
* Pemeriksaan integritas referensial.
* Penyimpanan data ke database.
* Pencatatan waktu pembuatan (`created_at`).

Contoh proses Data Creation meliputi:

* Registrasi pengguna.
* Pembuatan Relationship.
* Penambahan Memory.
* Penambahan Dream.
* Penambahan Important Day.
* Pembuatan Time Capsule.
* Pembuatan Open When.

---

## 14.4 Data Usage

Data yang telah tersimpan dapat digunakan oleh berbagai fitur aplikasi.

Aktivitas pada tahap ini meliputi:

* Menampilkan Dashboard.
* Menampilkan Timeline.
* Menampilkan Gallery.
* Menampilkan Kalender.
* Menampilkan Notification.
* Menampilkan Detail Data.

Tahap ini merupakan aktivitas baca (*read operation*) dan tidak mengubah isi database.

---

## 14.5 Data Update

Beberapa data dapat diperbarui selama masih memenuhi aturan bisnis yang telah ditetapkan.

Contoh proses pembaruan meliputi:

* Mengubah nama pengguna.
* Memperbarui Dream.
* Mengubah Memory.
* Memperbarui Important Day.
* Menandai Notification sebagai telah dibaca.
* Mengubah status Time Capsule setelah dibuka.

Setiap proses pembaruan akan memperbarui nilai `updated_at` pada tabel yang bersangkutan apabila kolom tersebut tersedia.

---

## 14.6 Data Archive

Tidak semua data perlu langsung dihapus ketika sudah tidak aktif.

Beberapa data dapat dipertahankan sebagai histori agar perjalanan hubungan tetap dapat ditelusuri.

Contoh data yang dapat dipertahankan meliputi:

* Relationship Event.
* Dream yang telah selesai.
* Time Capsule yang telah dibuka.
* Notification yang telah dibaca.

Pada tahap Minimum Viable Product (MVP), proses arsip dilakukan secara logis melalui perubahan status atau tetap mempertahankan data sebagai histori. Mekanisme arsip khusus dapat ditambahkan pada pengembangan berikutnya apabila diperlukan.

---

## 14.7 Data Deletion

Penghapusan data dilakukan secara hati-hati agar tidak menyebabkan inkonsistensi database.

Prinsip yang digunakan adalah sebagai berikut.

### Cascade Deletion

Digunakan pada data yang tidak memiliki makna tanpa data induknya.

Contoh:

* Memory → Memory Media

Apabila sebuah Memory dihapus, seluruh Memory Media yang terkait juga akan dihapus.

---

### Restricted Deletion

Digunakan pada data utama yang masih memiliki relasi dengan tabel lain.

Contoh:

* Relationship
* User
* Question

Penghapusan akan ditolak apabila masih terdapat data yang bergantung pada data tersebut.

---

### Business Deletion

Pada beberapa kasus, data tidak benar-benar dihapus, tetapi statusnya diubah agar histori tetap tersedia.

Contoh:

* Dream diubah menjadi `COMPLETED` atau `ARCHIVED`.
* Time Capsule diubah menjadi `OPENED`.
* Notification ditandai sebagai `is_read = TRUE`.

Pendekatan ini membantu menjaga riwayat aktivitas tanpa menghilangkan informasi yang masih bernilai.

---

## 14.8 Data Integrity Throughout the Lifecycle

Selama seluruh tahapan siklus hidup data, sistem menjaga integritas melalui mekanisme berikut.

* Validasi input pada backend.
* Primary Key dan Foreign Key.
* Constraint pada database.
* Pemeriksaan aturan bisnis sebelum perubahan data.
* Penggunaan transaksi database untuk operasi yang melibatkan lebih dari satu tabel.

Dengan mekanisme tersebut, perubahan data tetap konsisten meskipun melibatkan beberapa proses secara bersamaan.

---

## 14.9 Future Improvements

Beberapa mekanisme pengelolaan data dapat dipertimbangkan pada pengembangan berikutnya, antara lain:

* Soft Delete menggunakan kolom `deleted_at`.
* Audit Log untuk mencatat perubahan data.
* Versioning pada data tertentu.
* Kebijakan retensi data.
* Backup dan pemulihan data secara otomatis.

Fitur-fitur tersebut belum menjadi bagian dari MVP, namun desain database yang telah dibuat memungkinkan penambahan mekanisme tersebut tanpa perubahan besar pada struktur inti.

---

## 14.10 Summary

Data Lifecycle menggambarkan bagaimana data dikelola sejak proses pembuatan hingga penghapusan. Setiap tahapan dirancang untuk menjaga integritas, konsistensi, dan ketersediaan data selama aplikasi digunakan.

Dengan menerapkan proses validasi, pembaruan yang terkontrol, pengelolaan histori, serta strategi penghapusan yang sesuai, database OurSky mampu mendukung kebutuhan aplikasi saat ini sekaligus menyediakan fondasi yang baik untuk pengembangan di masa mendatang.
