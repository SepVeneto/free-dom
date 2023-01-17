import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    dedupe: [
      'vue',
      'vue-demi',
      '@vue/runtime-core',
    ],
  },
  test: {
    globals: true,
  },
});
