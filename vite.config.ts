import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
    strictPort: false,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'Abdallah Ahmed — Senior Frontend Engineer',
        short_name: 'Abdallah Ahmed',
        description: 'Portfolio of Abdallah Ahmed, Senior Frontend Engineer specializing in React, Vue 3, TypeScript, and 3D web.',
        theme_color: '#3b82f6',
        background_color: '#0a0e17',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/src/images/logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/src/images/logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,webp,woff,woff2}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://www.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'lenis'],
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-core': ['three'],
          'three-fiber': ['@react-three/fiber', '@react-three/drei'],
          'three-postprocessing': ['@react-three/postprocessing', 'postprocessing'],
          'animation': ['framer-motion', 'lenis'],
        },
      },
    },
  },
})
