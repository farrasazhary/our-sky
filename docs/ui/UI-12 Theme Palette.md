# UI-12 Theme Palette

> **Document ID:** UI-12
> **Document Type:** Design System
> **Status:** Draft
> **Version:** 1.0
> **Last Updated:** YYYY-MM-DD

---

# Purpose

Dokumen ini mendefinisikan nilai visual resmi (Theme Palette) yang digunakan pada seluruh aplikasi **OurSky**.

Theme Palette merupakan implementasi konkret dari **UI-10 Design Tokens** dan menjadi sumber utama bagi:

* Figma Variables
* Tailwind CSS Configuration
* CSS Variables
* React Theme
* Native Mobile Theme (Future)

Semua nilai warna, ukuran, spacing, radius, shadow, breakpoint, dan motion harus mengacu pada dokumen ini.

---

# Theme Philosophy

OurSky memiliki identitas visual yang:

* Hangat
* Romantis
* Tenang
* Modern
* Minimalis
* Elegan

Palet warna dipilih untuk menciptakan suasana yang nyaman digunakan dalam waktu lama, terutama pada malam hari.

---

# Light Theme

## Primary

| Token          | Value   |
| -------------- | ------- |
| Primary        | #7C5CFC |
| Primary Hover  | #6E4DF0 |
| Primary Active | #5E3FE2 |
| On Primary     | #FFFFFF |

---

## Secondary

| Token            | Value   |
| ---------------- | ------- |
| Secondary        | #F4A261 |
| Secondary Hover  | #EA9146 |
| Secondary Active | #D98237 |
| On Secondary     | #FFFFFF |

---

## Background

| Token           | Value   |
| --------------- | ------- |
| Background      | #F8FAFC |
| Surface         | #FFFFFF |
| Surface Variant | #F1F5F9 |

---

## Text

| Token          | Value   |
| -------------- | ------- |
| Primary Text   | #1E293B |
| Secondary Text | #475569 |
| Tertiary Text  | #64748B |
| Disabled Text  | #94A3B8 |

---

## Border

| Token   | Value   |
| ------- | ------- |
| Border  | #E2E8F0 |
| Divider | #CBD5E1 |

---

## Semantic Colors

| Token   | Value   |
| ------- | ------- |
| Success | #22C55E |
| Warning | #F59E0B |
| Error   | #EF4444 |
| Info    | #3B82F6 |

---

# Dark Theme

## Primary

| Token          | Value   |
| -------------- | ------- |
| Primary        | #9D8CFF |
| Primary Hover  | #8B79FF |
| Primary Active | #7A67F4 |
| On Primary     | #FFFFFF |

---

## Background

| Token           | Value   |
| --------------- | ------- |
| Background      | #0F172A |
| Surface         | #1E293B |
| Surface Variant | #334155 |

---

## Text

| Token          | Value   |
| -------------- | ------- |
| Primary Text   | #F8FAFC |
| Secondary Text | #CBD5E1 |
| Tertiary Text  | #94A3B8 |
| Disabled Text  | #64748B |

---

## Border

| Token   | Value   |
| ------- | ------- |
| Border  | #334155 |
| Divider | #475569 |

---

## Semantic Colors

| Token   | Value   |
| ------- | ------- |
| Success | #22C55E |
| Warning | #FBBF24 |
| Error   | #F87171 |
| Info    | #60A5FA |

---

# Typography

## Font Family

Primary

```text
Inter
```

Fallback

```text
system-ui, sans-serif
```

---

## Font Size

| Token   | Size |
| ------- | ---- |
| Display | 48px |
| H1      | 36px |
| H2      | 30px |
| H3      | 24px |
| H4      | 20px |
| Title   | 18px |
| Body    | 16px |
| Small   | 14px |
| Caption | 12px |

---

## Font Weight

| Token    | Value |
| -------- | ----- |
| Regular  | 400   |
| Medium   | 500   |
| SemiBold | 600   |
| Bold     | 700   |

---

# Spacing Scale

| Token | Value |
| ----- | ----- |
| XS    | 4px   |
| SM    | 8px   |
| MD    | 16px  |
| LG    | 24px  |
| XL    | 32px  |
| XXL   | 48px  |

---

# Border Radius

| Token  | Value  |
| ------ | ------ |
| None   | 0px    |
| Small  | 8px    |
| Medium | 12px   |
| Large  | 16px   |
| XL     | 24px   |
| Full   | 9999px |

---

# Elevation

| Level | Usage             |
| ----- | ----------------- |
| 0     | Flat              |
| 1     | Card              |
| 2     | Bottom Navigation |
| 3     | Dialog            |
| 4     | Modal             |

---

# Shadow

| Token  | Value                       |
| ------ | --------------------------- |
| Small  | 0 1px 3px rgba(0,0,0,.10)   |
| Medium | 0 4px 10px rgba(0,0,0,.12)  |
| Large  | 0 10px 25px rgba(0,0,0,.18) |

---

# Opacity

| Token    | Value |
| -------- | ----- |
| Disabled | 38%   |
| Hover    | 8%    |
| Focus    | 12%   |
| Pressed  | 16%   |
| Overlay  | 60%   |

---

# Icon Size

| Token | Value |
| ----- | ----- |
| XS    | 16px  |
| SM    | 20px  |
| MD    | 24px  |
| LG    | 32px  |
| XL    | 48px  |

---

# Button Height

| Token  | Value |
| ------ | ----- |
| Small  | 36px  |
| Medium | 44px  |
| Large  | 52px  |

---

# Touch Target

Minimum:

```text
44px × 44px
```

---

# Motion Duration

| Token  | Value |
| ------ | ----- |
| Fast   | 150ms |
| Normal | 250ms |
| Slow   | 400ms |

---

# Motion Easing

| Token       | Value                     |
| ----------- | ------------------------- |
| Ease In     | cubic-bezier(0.4,0,1,1)   |
| Ease Out    | cubic-bezier(0,0,0.2,1)   |
| Ease In Out | cubic-bezier(0.4,0,0.2,1) |

---

# Breakpoints

| Device        | Width  |
| ------------- | ------ |
| Small Mobile  | 360px  |
| Mobile        | 390px  |
| Large Mobile  | 428px  |
| Tablet        | 768px  |
| Desktop       | 1024px |
| Large Desktop | 1440px |

---

# Z-Index

| Layer             | Value |
| ----------------- | ----- |
| Base              | 0     |
| Sticky            | 100   |
| App Bar           | 200   |
| Bottom Navigation | 300   |
| Bottom Sheet      | 400   |
| Dialog            | 500   |
| Modal             | 600   |
| Toast             | 700   |
| Tooltip           | 800   |

---

# Naming Convention

Gunakan Semantic Token.

Contoh:

```text
color.primary
color.background

spacing.md

radius.large

shadow.medium

motion.fast

font.body

breakpoint.tablet
```

Hindari penggunaan nama berdasarkan warna seperti `purple500` atau `blue700` pada level aplikasi.

---

# Versioning

Perubahan nilai Theme Palette harus:

* Didokumentasikan pada Changelog.
* Divalidasi oleh tim desain.
* Tidak mengubah nama token tanpa alasan yang jelas.

---

# Relationship with Other Documents

* UI-02 Color System
* UI-03 Typography
* UI-04 Spacing & Layout
* UI-05 Components
* UI-10 Design Tokens

---

# References

* Material Design 3
* Apple Human Interface Guidelines
* W3C Design Tokens Community Group
