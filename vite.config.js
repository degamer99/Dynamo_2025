import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'atbu_crest.png'],
      manifest: {
        name: 'THE DYNAMOS — Beyond The Blueprint',
        short_name: 'The Dynamos',
        description: 'Class of 2025 EEE Balewite Final-Year Magazine & Yearbook — ATBU Bauchi',
        theme_color: '#022c22',
        background_color: '#FAF8F4',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,json}'],
        globIgnores: ['**/*.pdf', '**/images/dinner/**'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
      }
    })
  ],
  server: {
    port: 3000,
    open: false
  }
});
