import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@mui/system',
      '@emotion/react',
      '@emotion/styled',
      'i18next',        
      'react-i18next', 
    ],
  },
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
    ],
  },
  build: {
  rollupOptions: {
    onwarn(warning, warn) {
        if (warning.code === 'INVALID_ANNOTATION') return;
        warn(warning);
      }
    }
  }
});