import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // No need to import process

  return {
    envDir: './env',
    plugins: [react()],
    server: {
      host: '0.0.0.0', // Ensure external access (required for Render)
      port: parseInt(env.VITE_PORT) || 3000, // Uses Render's assigned port or default
    },
  };
});