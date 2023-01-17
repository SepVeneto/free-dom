import { defineConfig } from 'vite';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  plugins: [
    Components({
      dirs: resolve(__dirname, '.vitepress/theme/components'),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      transformer: 'vue3',
    }),
  ],
  resolve: {
    alias: {
      'free-dom': resolve(__dirname, './core/src/index.ts'),
    },
    dedupe: ['vue', 'vue-demi'],
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
});
