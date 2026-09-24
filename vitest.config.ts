import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const TODO_COVERAGE = [
  'src/pages/**',
  'src/components/**',
  'src/hook/**',
  'src/decorator/**',
  'src/redux/**',
  'src/api/**',
  'src/App.tsx',
  'src/i18n.ts',
  'src/appInsights.ts',
  'src/utils/**'
];

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled', 'i18next', 'react-i18next'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    css: true,
    restoreMocks: true,
    exclude: ['node_modules', 'dist', 'e2e'],
    deps: {
      optimizer: { web: { include: ['@mui/material', '@mui/icons-material'] } },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/setupTests.ts',
        'src/main.tsx',
        'src/routes.tsx',
        'src/mocks/**',
        'src/types/**',
        'src/theme/**',
        'src/locales/**',
        ...TODO_COVERAGE,
      ],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 70,
      },
    },
  },
});