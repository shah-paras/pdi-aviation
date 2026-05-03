import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('mapbox-gl') || id.includes('react-map-gl')) return 'maps'
            if (id.includes('recharts') || id.includes('d3-')) return 'charts'
            if (id.includes('framer-motion')) return 'animations'
            if (id.includes('jspdf')) return 'pdf'
            if (id.includes('html2canvas')) return 'pdf'
            if (id.includes('@radix-ui')) return 'ui'
            if (id.includes('@tanstack')) return 'query'
            if (id.includes('react-router') || id.includes('@remix-run')) return 'router'
            if (id.includes('zod') || id.includes('@hookform') || id.includes('react-hook-form')) return 'forms'
          }
        },
      },
    },
  },
})
