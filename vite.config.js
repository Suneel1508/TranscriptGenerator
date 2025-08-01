import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3001,
    },
  },
  optimizeDeps: {
    exclude: ['fsevents']
  },
  define: {
    global: 'globalThis',
  }
})