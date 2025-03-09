import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/calm/', // Set this to the name of your GitHub repository
  plugins: [react()],
  build: {
    outDir: 'build', // Ensure the output directory is set to 'build'
    esbuild: {
      jsxInject: `import React from 'react'`  // Ensures JSX works properly
    }
  },
});

