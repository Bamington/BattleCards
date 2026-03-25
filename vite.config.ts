/**
 * vite.config.ts — Vite build tool configuration
 *
 * Plugins:
 * - react:      Enables React/JSX support and fast refresh during development
 * - tailwindcss: Processes Tailwind utility classes at build time (v4 uses a
 *               Vite plugin instead of a PostCSS config)
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
