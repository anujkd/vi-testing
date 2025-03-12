import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    // you might also want to adjust other settings:
    // coverage: {
    //   reporter: ['text', 'json', 'html'],
    // },
  },
});