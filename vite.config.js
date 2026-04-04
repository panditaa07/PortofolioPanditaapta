import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/PortofolioPanditaapta/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@mui/material', '@mui/icons-material', 'lucide-react', 'framer-motion', 'lottie-react']
        }
      }
    },
    minify: 'terser',
    sourcemap: false
  }
})
