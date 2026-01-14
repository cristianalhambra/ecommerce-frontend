import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/test-setup.ts',
    isolate: true,
    threads: false,
    coverage: {
      provider: 'v8', // fast coverage via V8
      reporter: ['text', 'lcov'],
      // Enforce global minimum thresholds (can be adjusted)
      all: true,
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
    include: ['src/**/*.spec.ts'],
  },
});
