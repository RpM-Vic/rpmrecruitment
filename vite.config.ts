import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host:'0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:4000', 
        changeOrigin: true, // Recommended for virtual hosts
      },
    },
  },
})
