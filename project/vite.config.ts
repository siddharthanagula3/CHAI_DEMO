import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Complete Health AI',
        short_name: 'Health AI',
        description: 'Your AI-powered health and wellness companion',
        theme_color: '#3B82F6',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets'
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts'
            }
          },
          {
            urlPattern: /^https:\/\/api\.elevenlabs\.io/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'elevenlabs-api'
            }
          },
          {
            urlPattern: /^https:\/\/api\.tavus\.io/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'tavus-api'
            }
          }
        ]
      }
    })
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['recharts'],
          'animation-vendor': ['framer-motion'],
          'i18n-vendor': ['i18next', 'react-i18next'],
          'ai-vendor': ['@tensorflow/tfjs', 'ml5'],
          'audio-vendor': ['tone', 'wavesurfer.js']
        }
      }
    }
  }
});