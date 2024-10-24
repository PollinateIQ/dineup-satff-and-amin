import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';  // Add this import at the top

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Add the alias configuration
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://backenddineup.up.railway.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});