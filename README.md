<div align="center">

  <img src="client/public/OurSkyNewIcon.jpeg" alt="OurSky Logo" width="128" height="128" style="border-radius: 50%; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />

  # 🌌 OurSky
  ### *A Private Celestial Sanctuary & Shared Digital Space for Couples*

  [![Release](https://img.shields.io/badge/Release-v1.0.0--beta-purple.svg?logo=github)](https://github.com/farrasazhary/our-sky/releases/tag/v1.0.0-beta)
  [![React](https://img.shields.io/badge/React-18.x-blue.svg?logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Node.js](https://img.shields.io/badge/Express-4.x-000000.svg?logo=express&logoColor=white)](https://expressjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748.svg?logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1.svg?logo=mysql&logoColor=white)](https://www.mysql.com/)
  [![PWA Ready](https://img.shields.io/badge/PWA-Ready-success.svg?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
  [![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

  <p align="center">
    <b>OurSky</b> is a modern, ultra-private couple web application designed to deepen intimacy, record daily memories, track milestones, and create lasting digital keepsakes under a shared starry sky.
  </p>

  [Features](#-key-features) •
  [Tech Stack](#-tech-stack) •
  [Installation](#-quick-start) •
  [PWA Setup](#-pwa--mobile-installation) •
  [License](#-license)

</div>

---

## 🌟 Overview

Relationships are made of small, meaningful moments. **OurSky** brings couples together into a dedicated private digital space free from social media noise. From daily emotional prompts and shared photo memory albums to custom constellation stars and real-time push notifications, OurSky makes every day with your partner feel magical.

---

## 🚀 Key Features

<table>
  <tr>
    <td width="50%">
      <h3>💬 Question of the Day</h3>
      <p>A daily prompt system designed to spark deep, meaningful conversations. Both partners must submit their answers before unlocking each other's response.</p>
    </td>
    <td width="50%">
      <h3>📸 Little Memory Album</h3>
      <p>Record 1 daily photo memory together. Features dual-layer WebP compression (HTML5 Canvas + Sharp Engine) reducing image size to ~50KB while preserving crisp 1080p visual quality.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🌌 Constellation Galaxy</h3>
      <p>Watch your love story expand in a interactive 3D starry galaxy where memories and special events scatter organic glowing stars across the night sky.</p>
    </td>
    <td width="50%">
      <h3>🎲 Random Date Generator</h3>
      <p>Stuck on date night ideas? Spin the random date generator, invite your partner, and accept date invitations with distinct real-time notifications.</p>
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
      <h3>🔔 Real-Time Push Notifications</h3>
      <p>System Push Notifications alert your partner instantly on Android, iOS, or Windows whenever a memory is posted, a letter is opened, or a date is invited.</p>
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

# Configure your database credentials in .env:
# DATABASE_URL="mysql://user:password@localhost:3306/oursky"
# JWT_SECRET="your_secure_jwt_secret"

# Run Prisma migrations & seed default questions
npm run db:push
npm run db:seed

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
├── client/                     # Frontend Vite + React application
│   ├── public/                 # PWA icons, manifest, and assets
│   ├── src/
│   │   ├── components/         # Modals, UI components, & PWA prompt
│   │   ├── contexts/           # AuthContext & State management
│   │   ├── hooks/              # Notification Listener hooks
│   │   ├── pages/              # Dashboard, Memory, Question, Constellation...
│   │   └── services/           # Axios-like Fetch API wrapper
├── server/                     # Backend Express REST API server
│   ├── prisma/                 # Database schema & seeds
│   ├── src/
│   │   ├── features/           # Feature-based modular routes & controllers
│   │   ├── middleware/         # Auth, Upload, & Authorization middleware
│   │   └── shared/             # Response wrappers & error handlers
└── docs/                       # Project specifications & architecture docs
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Crafted with ❤️ by <a href="https://github.com/farrasazhary">Farras Azhary</a></sub>
</div>
