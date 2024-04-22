import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from "node:url";
import { resolve } from 'node:path';
import path from 'path';





// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],

  
  resolve: {
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions:{
      main: resolve('./index.html'),
    }
  }

})
