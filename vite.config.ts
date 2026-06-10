import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress non-critical warnings from wallet adapter dependencies (ox, walletconnect, etc.)
        if (warning.code === 'INVALID_ANNOTATION') return
        warn(warning)
      },
    },
  },
})
