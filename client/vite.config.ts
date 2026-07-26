import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['OurSkyNewIcon.jpeg', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'OurSky - Private Couple Space',
        short_name: 'OurSky',
        description: 'Private space for couples to share memories, daily questions, constellations, and countdowns.',
        theme_color: '#0B0F19',
        background_color: '#0B0F19',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'OurSkyNewIcon.jpeg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'OurSkyNewIcon.jpeg',
            sizes: '512x512',
            type: 'image/jpeg'
          },
          {
            src: 'OurSkyNewIcon.jpeg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpeg}'],
        navigateFallbackDenylist: [/^\/api/, /^\/uploads/, /^\/storage/]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/storage': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
