<div align="center">

  <img src="client/public/OurSkyNewIcon.jpeg" alt="OurSky Logo" width="128" height="128" style="border-radius: 50%; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />

  # 🌌 OurSky
  ### *A Private Celestial Sanctuary & Shared Digital Space for Couples*

  [![Release](https://img.shields.io/badge/Release-v1.1.0--beta-purple.svg?logo=github)](https://github.com/farrasazhary/our-sky/releases/tag/v1.1.0-beta)
  [![React](https://img.shields.io/badge/React-18.x-blue.svg?logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-1.5_Flash-8E75FF.svg?logo=google&logoColor=white)](https://ai.google.dev/)
  [![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Express](https://img.shields.io/badge/Express-4.x-000000.svg?logo=express&logoColor=white)](https://expressjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748.svg?logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1.svg?logo=mysql&logoColor=white)](https://www.mysql.com/)
  [![PWA Ready](https://img.shields.io/badge/PWA-Ready-success.svg?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
  [![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

  <p align="center">
    <b>OurSky</b> is a modern, ultra-private couple web application designed to deepen intimacy, record daily memories, track milestones, and create lasting digital keepsakes under a shared starry sky.
  </p>

  [Features](#-key-features) •
  [What's New in v1.1.0-beta](#-whats-new-in-v110-beta) •
  [Tech Stack](#-tech-stack) •
  [Installation](#-quick-start) •
  [PWA Setup](#-pwa--mobile-installation) •
  [License](#-license)

</div>

---

## 🌟 Overview

Relationships are made of small, meaningful moments. **OurSky** brings couples together into a dedicated private digital space free from social media noise. Powered by **Google Gemini 1.5 Flash AI**, daily emotional prompts, shared photo memory albums, 365 couple date activities, custom constellation stars, and real-time push notifications make every day with your partner feel magical.

---

## 🔥 What's New in v1.1.0-beta

- 🤖 **Google Gemini 1.5 Flash AI Engine**: Dynamic AI-generated romantic couple questions and custom date ideas with automatic multi-model fallback cascade and 429 rate limit cooldown protection.
- 🔔 **W3C Web Push Protocol & High-Urgency OS Push**: Background system notifications via VAPID keypair that deliver alerts even when the PWA is completely closed or phone screen is locked.
- 🎯 **Target Destination Navigation**: Tapping any notification card, toast banner, or system push automatically marks it as read and navigates directly to the relevant feature page (`/question`, `/memory`, `/random-date`, `/dream-board`, etc.).
- 💖 **Animated NotificationBell & Real-time Badge**: Real-time spring physics badge counter pop-up accompanied by a 3-heart floating burst animation (`💕✨`) whenever your partner interacts.
- 🧹 **Auto-Clear Status Bar Notifications**: Opening or focusing the OurSky PWA automatically dismisses and clears active OurSky notification banners from the OS top status bar.
- 📳 **2-Second Haptic Vibrations**: Unified 2000ms smooth vibration pattern for Instant Heartbeat Pulses ("Aku Lagi Kangen Kamu! 💓") and partner activity.
- 📅 **365 Couple Date Activities Pool**: A full 365-day curated Indonesian date activities library ensuring a unique activity for every day of the year.
- 📸 **Native Camera Capture & WebP Compression**: Direct camera photo capture for memory posts with dual-layer WebP compression (~50KB per photo).

---

## 🚀 Key Features

<table>
  <tr>
    <td width="50%">
      <h3>🤖 Question of the Day (Gemini AI)</h3>
      <p>Daily romantic questions generated on-demand by Google Gemini AI. Tracks assigned questions per relationship so both partners answer the exact same prompt before unlocking each other's response.</p>
    </td>
    <td width="50%">
      <h3>📸 Little Memory Album</h3>
      <p>Record 1 daily photo memory together using direct native camera capture or gallery upload with WebP compression (~50KB per photo).</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🌌 Constellation Galaxy</h3>
      <p>Watch your love story expand in an interactive 3D starry galaxy where memories and special events scatter organic glowing stars across the night sky.</p>
    </td>
    <td width="50%">
      <h3>🎲 Random Date & 365 Activities</h3>
      <p>Spin the random date generator backed by 365 unique Indonesian couple date ideas or Gemini AI, propose dates, and accept invitations in real-time.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>💌 Open When Letters</h3>
      <p>Write emotional letters sealed for specific moments ("Open when you miss me", "Open when you feel sad"). Unlocked only when the right time arrives.</p>
    </td>
    <td width="50%">
      <h3>🔒 Time Capsules</h3>
      <p>Seal secret messages, photos, and dreams into digital time capsules locked until a specific future date or anniversary.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🎯 Shared Dream Board</h3>
      <p>Track your shared bucket list, travel goals, and life dreams with interactive progress milestones and cover photo customization.</p>
    </td>
    <td width="50%">
      <h3>🔔 W3C Web Push & Animated Bell</h3>
      <p>Receive high-urgency background push notifications with 2s haptic vibrations, real-time spring pop badge counters, and automatic status bar notification clearing.</p>
    </td>
  </tr>
</table>

---

## 📱 PWA & Mobile Installation

OurSky is built as a **Progressive Web App (PWA)**, allowing you to install it directly to your phone's Home Screen without downloading from the App Store or Google Play:

- **Android (Chrome)**: Tap the in-app **"Install OurSky App"** banner or select *Add to Home screen* from Chrome's menu.
- **iOS (Safari)**: Tap the **Share** icon in Safari, then select **Add to Home Screen**.
- **Windows (Chrome / Edge)**: Click the **Install Icon (⤓)** in the address bar or install directly from the Settings page.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/) + [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- **Styling**: Vanilla CSS + [TailwindCSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Database
- **Runtime**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **AI Engine**: [Google Generative AI (Gemini 1.5 Flash)](https://ai.google.dev/)
- **Push Protocol**: W3C Web Push (`web-push` library with VAPID keypairs)
- **ORM**: [Prisma ORM 5](https://www.prisma.io/)
- **Database**: [MySQL 8](https://www.mysql.com/)
- **Image Compression**: [Sharp](https://sharp.pixelplumbing.com/) + HTML5 Canvas API
- **Auth**: JWT (JSON Web Tokens) & HTTP-only secure cookies

---

## ⚙️ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) >= 18.x
- [MySQL](https://www.mysql.com/) >= 8.x
- `npm` or `yarn`

### 1. Clone Repository
```bash
git clone https://github.com/farrasazhary/our-sky.git
cd our-sky
```

### 2. Backend Setup
```bash
cd server
npm install

# Copy environment example
cp .env.example .env

# Configure database & API keys in .env:
# DATABASE_URL="mysql://user:password@localhost:3306/oursky_db"
# JWT_SECRET="your_secure_jwt_secret"
# GEMINI_API_KEY="your_google_gemini_api_key"

# Run Prisma schema push & client generator
npm run db:push
npm run db:generate

# Start backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install

# Start Vite dev server
npm run dev
```

Visit `http://localhost:5173` in your browser to experience OurSky!

---

## 📂 Project Structure

```
our-sky/
├── client/                     # Frontend Vite + React PWA application
│   ├── public/                 # PWA icons, sw-push-handler.js, & manifest
│   ├── src/
│   │   ├── components/         # NotificationBell, NotificationToast, Modals...
│   │   ├── contexts/           # AuthContext & State management
│   │   ├── hooks/              # Notification Listener & WebPush subscription hooks
│   │   ├── pages/              # Dashboard, Memory, Question, Constellation, RandomDate...
│   │   └── services/           # Axios-like Fetch API wrapper
├── server/                     # Backend Express REST API server
│   ├── prisma/                 # Database schema & seeds
│   ├── src/
│   │   ├── config/             # Database & WebPush VAPID config
│   │   ├── features/           # AI, Question, Notification, Memory, RandomDate features...
│   │   ├── middleware/         # Auth, Upload, & Authorization middleware
│   │   └── shared/             # Response wrappers & error handlers
└── deploy.sh                   # Automated 1-click VPS deployment script
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Crafted with ❤️ by <a href="https://github.com/farrasazhary">Farras Azhary</a></sub>
</div>
