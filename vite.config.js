import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    laravel({
        input: [
            'resources/assets/sass/global.scss', 
            'resources/assets/sass/default.scss'],
        refresh: true,
    }),
    react()
],

  build: { chunkSizeWarningLimit: 1600, }

})
