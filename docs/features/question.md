# ❓ Question of the Day

> **Feature:** Question of the Day
> **Category:** Core Experience
> **Status:** MVP
> **Priority:** High

---

# Overview

Question of the Day menghadirkan satu pertanyaan yang sama setiap hari untuk kedua pasangan.

Masing-masing menjawab secara mandiri tanpa dapat melihat jawaban pasangannya.

Setelah kedua jawaban terkirim, jawaban akan dibuka sehingga pasangan dapat saling membaca dan mengenal satu sama lain lebih dalam.

Seluruh pertanyaan dan jawaban akan menjadi arsip perjalanan hubungan.

---

# Purpose

Mendorong komunikasi yang bermakna melalui pertanyaan sederhana setiap hari serta membangun kebiasaan untuk terus mengenal pasangan.

---

# User Story

Sebagai pasangan,

Saya ingin menjawab pertanyaan harian bersama pasangan saya,

Sehingga kami dapat saling memahami dan membangun komunikasi yang lebih dalam.

---

# Permissions

Relationship Member

- View Today's Question
- Submit Answer
- View Completed Answers
- Browse Question History

Guest

- No Access

---

# Functional Requirements

- Menampilkan satu pertanyaan setiap hari.
- Mengizinkan kedua pasangan menjawab secara terpisah.
- Menyembunyikan jawaban pasangan sampai keduanya selesai.
- Menampilkan hasil setelah kedua jawaban tersedia.
- Menyimpan riwayat seluruh pertanyaan.
- Menampilkan status "Waiting for Partner".

---

# Business Rules

- Satu relationship hanya memiliki satu pertanyaan per hari.
- Kedua pasangan menerima pertanyaan yang sama.
- Jawaban tidak dapat dilihat sebelum kedua pasangan menjawab.
- Jawaban yang telah dikirim tidak dapat diedit.
- Pertanyaan lama tetap dapat dijawab jika terlewat.
- Riwayat pertanyaan tidak dapat dihapus.

---

# Validation Rules

Answer

- Required
- Maksimum 500 karakter

---

# User Flow

Today's Question

↓

User Submit Answer

↓

Waiting for Partner

↓

Partner Submit Answer

↓

Question Completed

↓

Answers Revealed

↓

Relationship Event Created

---

# UI Components

- Today's Question Card
- Answer Form
- Waiting Screen
- Answer Comparison View
- Question History
- Daily Progress Badge

---

# API Requirements

GET /questions/today

POST /questions/:id/answer

GET /questions/history

GET /questions/:id

---

# Database Requirements

Tables

- questions
- question_answers

---

# Relationship Events

Event yang dihasilkan:

- Question Completed

---

# Notifications

- Pengingat menjawab pertanyaan hari ini.
- Notifikasi ketika pasangan telah menjawab.
- Notifikasi ketika jawaban berhasil dibuka.

---

# Edge Cases

## Partner Belum Menjawab

Status:

Waiting for Partner.

---

## Pertanyaan Terlewat

Tetap dapat dijawab di kemudian hari.

---

## Salah Satu User Menghapus Akun

Jawaban tetap menjadi arsip relationship sesuai kebijakan archive.

---

# Acceptance Criteria

- Pertanyaan harian berhasil ditampilkan.
- Kedua pasangan dapat menjawab.
- Jawaban pasangan tetap tersembunyi hingga kedua jawaban tersedia.
- Setelah selesai, kedua jawaban dapat dibaca.
- Riwayat pertanyaan tersimpan.
- Penyelesaian menghasilkan Relationship Event.

---

# Future Improvements

- AI Reflection
- Weekly Summary
- Monthly Insight
- Favorite Questions
- Question Categories
- Seasonal Questions
- AI Generated Questions
- Voice Answer

---

# References

- 00_KITAB_PROJECT.md
- 01_PRODUCT_REQUIREMENT.md
- constellation.md
- architecture/event_system.md