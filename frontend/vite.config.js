// vite.config.js - RECOMMENDED FIX
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // FIX: Remove or set to absolute path '/'
  // base: './', // <-- DELETE THIS LINE OR CHANGE IT
  base: '/', // <-- RECOMMENDED absolute path for Vercel root deployment
  build: {
    // ... (rest of your build config)
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and React DOM
          react: ['react', 'react-dom', 'react-router', 'zustand'],
          // Split Stream SDKs
          stream: ['stream-chat', 'stream-chat-react', '@stream-io/video-react-sdk'],
          // You can add more libraries if needed
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})