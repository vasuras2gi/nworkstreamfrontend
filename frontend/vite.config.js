import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // important for Vercel
  build: {
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
    chunkSizeWarningLimit: 1000, // optional: increase limit to 1MB to suppress warnings
  },
})
