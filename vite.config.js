import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
    hmr: {
      clientPort: 8080
    },
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' https://calm-kit-56.clerk.accounts.dev https://challenges.cloudflare.com 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://img.clerk.com data:; connect-src 'self' https://calm-kit-56.clerk.accounts.dev https://clerk-telemetry.com wss://*.cs-asia-southeast1-palm.cloudshell.dev; frame-src 'self' https://challenges.cloudflare.com; worker-src 'self' blob:;"
    }
  }
})
