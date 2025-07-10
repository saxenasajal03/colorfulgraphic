import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // <-- THIS IS IMPORTANT
    port: 80        // optional: match Docker port
  },
  preview: {
    host: '0.0.0.0', // <-- THIS TOO
    port: 80
  }
})
