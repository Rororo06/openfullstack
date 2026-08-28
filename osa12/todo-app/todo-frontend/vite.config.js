import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // The dev server is reached through the nginx container, not localhost.
    allowedHosts: ['app', 'localhost'],
    // Needed for hot reloading when the dev server runs inside a container.
    watch: { usePolling: true },
  },
});
