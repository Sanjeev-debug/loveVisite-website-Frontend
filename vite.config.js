import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
  base: '/',
  build: {
    copyPublicDir: true, // make sure public files (like _redirects) are copied
  },
})
