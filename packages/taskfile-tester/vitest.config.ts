import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/tests/**'],
    },
    testTimeout: 60000,
    hookTimeout: 60000,
    logHeapUsage: true,
    sequence: {
      shuffle: false
    },
    silent: false,
    reporters: 'verbose',
    onConsoleLog(log) {
      return false; // Show all console logs
    },
  },
});
