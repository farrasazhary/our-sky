# UI-05 Components

> **Document ID:** UI-05
> **Document Type:** Design System
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan seluruh komponen antarmuka (UI Components) yang digunakan pada aplikasi **OurSky**.

Seluruh komponen harus mengikuti Design System agar memiliki tampilan, perilaku, dan pengalaman pengguna yang konsisten.

Komponen harus bersifat **reusable**, **accessible**, dan **responsive**.

---

# Design Philosophy

Komponen pada OurSky harus:

* Konsisten
* Mudah dipahami
* Mudah digunakan
* Reusable
* Modular
* Mendukung Accessibility

Komponen tidak boleh dibuat hanya untuk satu halaman apabila masih dapat digunakan kembali.

---

# Component Principles

## Reusable

Komponen harus dapat digunakan pada banyak halaman.

---

## Consistent

Komponen dengan fungsi yang sama harus memiliki tampilan dan perilaku yang sama.

---

## Predictable

Setiap interaksi harus mudah dipahami pengguna.

---

## Accessible

Seluruh komponen harus mendukung standar aksesibilitas.

---

## Responsive

Komponen harus bekerja dengan baik pada berbagai ukuran layar.

---

# Component Structure

Setiap komponen wajib memiliki dokumentasi berikut.

* Purpose
* Anatomy
* Variants
* States
* Behavior
* Accessibility
* Usage
* Do
* Don't

---

# Component Categories

---

# Navigation Components

Digunakan untuk membantu perpindahan halaman.

Komponen:

* App Bar
* Bottom Navigation
* Navigation Rail (Future)
* Navigation Drawer (Future)
* Breadcrumb (Web Future)
* Tabs

---

# Input Components

Digunakan untuk memasukkan data.

Komponen:

* Text Field
* Password Field
* Search Field
* Text Area
* Number Input
* Date Picker
* Time Picker
* Checkbox
* Radio Button
* Switch
* Dropdown
* Multi Select

---

# Button Components

Jenis tombol yang tersedia.

* Primary Button
* Secondary Button
* Text Button
* Icon Button
* Floating Action Button (FAB)
* Danger Button

Setiap Button memiliki state:

* Default
* Hover
* Focus
* Active
* Disabled
* Loading

---

# Feedback Components

Digunakan untuk memberikan umpan balik.

Komponen:

* Snackbar
* Toast
* Alert
* Banner
* Progress Indicator
* Circular Loader
* Linear Loader
* Skeleton Loading

---

# Dialog Components

Komponen yang muncul di atas halaman.

Komponen:

* Dialog
* Confirmation Dialog
* Bottom Sheet
* Modal
* Full Screen Dialog

---

# Display Components

Komponen untuk menampilkan informasi.

Komponen:

* Card
* Avatar
* Badge
* Chip
* Tag
* Divider
* Timeline
* Progress Bar
* Statistic Card

---

# Media Components

Digunakan untuk media.

Komponen:

* Image
* Gallery
* Carousel
* Video (Future)

---

# List Components

Komponen daftar.

* List Item
* Section Header
* Expandable List
* Timeline List

---

# Empty State Components

Digunakan ketika data belum tersedia.

Harus terdiri dari:

* Illustration
* Title
* Description
* Primary Action

---

# Error Components

Digunakan ketika terjadi kesalahan.

Harus memiliki:

* Error Illustration
* Error Message
* Retry Button

---

# Success Components

Digunakan ketika aksi berhasil dilakukan.

Contoh:

* Dream Completed
* Time Capsule Opened
* Invitation Accepted

---

# Loading Components

Loading harus memberikan informasi kepada pengguna.

Prioritas:

* Skeleton
* Progress Indicator
* Spinner

Gunakan Spinner hanya untuk proses yang sangat singkat.

---

# Notification Components

Komponen khusus Notification.

Terdiri dari:

* Notification Card
* Notification Badge
* Notification List

---

# Relationship Components

Komponen khusus OurSky.

Meliputi:

* Couple Card
* Relationship Status
* Anniversary Card
* Countdown Card

---

# Memory Components

Komponen khusus fitur Memory.

* Memory Card
* Memory Gallery
* Memory Calendar

---

# Question Components

Komponen khusus fitur Question.

* Question Card
* Answer Card
* Reveal Animation

---

# Random Date Components

Komponen untuk Date Challenge.

* Challenge Card
* Progress Card
* Completion Card

---

# Time Capsule Components

Komponen khusus Time Capsule.

* Capsule Card
* Capsule Preview
* Capsule Opening Animation

---

# Dream Board Components

Komponen Dream Board.

* Dream Card
* Progress Indicator
* Dream Category Badge
* Dream Status Chip

---

# Open When Components

Komponen Open When.

* Letter Card
* Envelope Animation
* Letter Viewer

---

# Constellation Components

Komponen visualisasi Constellation.

* Star
* Star Detail
* Star Tooltip
* Filter Panel
* Timeline Indicator

---

# Component States

Setiap komponen interaktif minimal memiliki state berikut.

* Default
* Hover
* Focus
* Active
* Disabled
* Loading
* Error

Komponen yang tidak memiliki interaksi dapat menghilangkan state yang tidak relevan.

---

# Accessibility Requirements

Seluruh komponen harus:

* Mendukung keyboard navigation (Web)
* Memiliki focus indicator
* Memiliki label yang jelas
* Mendukung Screen Reader
* Memiliki area sentuh yang nyaman pada perangkat mobile

---

# Naming Convention

Gunakan penamaan PascalCase.

Contoh:

```text
PrimaryButton
SecondaryButton

AppBar

BottomNavigation

MemoryCard

DreamCard

QuestionCard

RelationshipCard

NotificationCard

ProgressBar

Timeline

Avatar

Badge

Dialog

BottomSheet

LoadingSpinner

SkeletonCard
```

---

# Folder Structure Recommendation

```text
src/
└── components/
    ├── common/
    │   ├── Button/
    │   ├── Card/
    │   ├── Input/
    │   ├── Dialog/
    │   ├── Avatar/
    │   └── Badge/
    │
    ├── layout/
    │   ├── AppBar/
    │   ├── BottomNavigation/
    │   ├── Container/
    │   └── Section/
    │
    ├── features/
    │   ├── relationship/
    │   ├── question/
    │   ├── memory/
    │   ├── dream-board/
    │   ├── constellation/
    │   ├── time-capsule/
    │   ├── open-when/
    │   └── notification/
    │
    └── feedback/
        ├── Loading/
        ├── EmptyState/
        ├── ErrorState/
        └── SuccessState/
```

---

# Design Rules

* Gunakan komponen yang sudah tersedia sebelum membuat komponen baru.
* Hindari duplikasi komponen dengan fungsi yang sama.
* Seluruh komponen harus mengikuti Color System.
* Seluruh komponen harus mengikuti Typography.
* Seluruh komponen harus mengikuti Spacing & Layout.
* Komponen harus mendukung Dark Mode.
* Komponen harus mendukung Responsive Layout.

---

# Future Enhancements

Ke depan, setiap komponen dapat memiliki dokumen spesifikasi sendiri.

Contoh:

```text
Button.md
Card.md
Input.md
Dialog.md
BottomSheet.md
MemoryCard.md
DreamCard.md
Constellation.md
```

Dokumen tersebut akan berisi spesifikasi visual, anatomi, perilaku, dan contoh implementasi yang lebih rinci.

---

# Relationship with Other Documents

Dokumen ini mengacu pada:

* UI-01 Design Philosophy
* UI-02 Color System
* UI-03 Typography
* UI-04 Spacing & Layout
* UI-06 Icons & Illustrations
* UI-07 Motion & Animation
* UI-10 Design Tokens

---

# References

* Material Design 3 – Components
* Apple Human Interface Guidelines
* WCAG Accessibility Guidelines
