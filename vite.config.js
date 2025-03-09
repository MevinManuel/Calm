import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/calm/', // Ensure this matches the repository name
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this matches the deploy script
    esbuild: {
      jsxInject: `import React from 'react'`  // Ensures JSX works properly
    }
  },
});