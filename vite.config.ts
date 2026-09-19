import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  root: 'app',
  publicDir: '../public',
  base: '/Portfolio/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url))
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => (
          assetInfo.names?.some((name) => name.endsWith('.css'))
            ? 'assets/app.css'
            : 'assets/[name][extname]'
        )
      }
    }
  }
});
