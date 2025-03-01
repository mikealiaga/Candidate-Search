import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    envDir: './env',
    plugins: [react()],
    server: {
      host: '0.0.0.0', // Allow external access (required for Render)
      port: Number(env.VITE_PORT) || 3000, // Ensure correct port assignment
      strictPort: true, // Ensures Vite binds to the exact port
      allowedHosts: ["candidate-search-205g.onrender.com"], // Allow Render's host
    },
  };
});