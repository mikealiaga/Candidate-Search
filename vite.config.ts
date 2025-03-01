import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      "process.env.VITE_GITHUB_TOKEN": JSON.stringify(env.VITE_GITHUB_TOKEN),
    },
    envDir: './env',
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_PORT) || 3000,
      strictPort: true,
      allowedHosts: ["candidate-search-205g.onrender.com"],
    },
  };
});