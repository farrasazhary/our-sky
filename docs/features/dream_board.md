# 🌱 Dream Board

> **Feature:** Dream Board
> **Category:** Future Experience
> **Feature Type:** Primary Feature
> **Primary Table:** dreams
> **Status:** Future (v1.1)
> **Priority:** Medium

---

# Overview

Dream Board memungkinkan pasangan membuat dan mengelola impian yang ingin dicapai bersama.

Setiap Dream dapat memiliki target waktu, progress, serta beberapa milestone yang membantu pasangan mencapai tujuan tersebut.

Dream Board berfokus pada perjalanan menuju impian, bukan sekadar daftar tugas.

---

# Purpose

Membantu pasangan membangun masa depan bersama melalui tujuan dan impian yang dapat dipantau perkembangannya.

---

# User Story

Sebagai pasangan,

Saya ingin membuat impian bersama,

Sehingga kami dapat merencanakan dan merayakan setiap pencapaian dalam hubungan kami.

---

# Permissions

Relationship Member

- Create Dream
- View Dream
- Edit Dream
- Archive Dream
- Manage Milestones
- Complete Milestones

Guest

- No Access

---

# Functional Requirements

- Membuat Dream baru.
- Menentukan kategori.
- Menentukan target date (opsional).
- Menambahkan milestone.
- Mengubah status milestone.
- Menghitung progress otomatis.
- Menandai Dream selesai.
- Mengarsipkan Dream.

---

# Business Rules

- Dream dimiliki oleh Relationship.
- Dream dapat dibuat oleh salah satu anggota relationship.
- Progress dihitung dari milestone yang selesai.
- Dream tanpa milestone memiliki progress manual.
- Dream selesai ketika seluruh milestone selesai atau ditandai selesai secara manual.
- Relationship Event hanya dibuat saat Dream selesai.

---

# Validation Rules

Title

- Required
- Maksimum 100 karakter

Description

- Optional
- Maksimum 1000 karakter

Category

- Required

Target Date

- Optional

---

# User Flow

Create Dream

↓

Add Milestones

↓

Start Progress

↓

Complete Milestones

↓

Dream Completed

↓

Relationship Event Created

↓

Constellation Updated

---

# UI Components

- Dream Card
- Progress Bar
- Milestone List
- Category Badge
- Target Date
- Archive View

---

# API Requirements

GET /dreams

GET /dreams/:id

POST /dreams

PATCH /dreams/:id

DELETE /dreams/:id

POST /dreams/:id/milestones

PATCH /dreams/:id/milestones/:milestoneId

---

# Database Requirements

Tables

- dreams
- dream_milestones

---

# Relationship Events

Event yang dihasilkan:

- Dream Completed

---

# Notifications

- Reminder target date.
- Notifikasi milestone selesai.
- Notifikasi ketika Dream berhasil diselesaikan.

---

# Edge Cases

## Dream Tanpa Milestone

Progress dapat diperbarui secara manual.

---

## Target Date Terlewati

Dream tetap dapat dilanjutkan.

---

## Dream Diarsipkan

Tidak muncul pada daftar aktif, tetapi tetap dapat dilihat pada arsip.

---

## Relationship Berakhir

Dream menjadi arsip relationship.

---

# Acceptance Criteria

- Pengguna dapat membuat Dream.
- Pengguna dapat mengelola milestone.
- Progress dihitung otomatis.
- Dream dapat diselesaikan.
- Penyelesaian menghasilkan Relationship Event.

---

# Future Improvements

- AI Goal Recommendation
- Shared Budget
- Vision Board
- Photo Progress
- Habit Integration
- Achievement Badge
- Smart Timeline

---

# References

- 00_KITAB_PROJECT.md
- 01_PRODUCT_REQUIREMENT.md
- constellation.md
- architecture/event_system.md