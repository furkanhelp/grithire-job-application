import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          // Group React-related dependencies
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Group utility libraries
          'utils': ['dayjs', 'axios'],
          // Group UI/icon libraries
          'ui': ['react-icons'],
          // Group state management
          'state': ['@tanstack/react-query'],
        },
      },
    },
  },
  },
});
