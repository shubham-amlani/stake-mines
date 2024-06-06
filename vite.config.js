import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Specify the output directory here
  },
  server: {
    port: process.env.PORT || 3000, // Use the port provided by Render or default to 3000
  }
})

