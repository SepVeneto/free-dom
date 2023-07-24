import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  resolve: {
    alias: {
      '@sepveneto/free-dom/css': resolve(__dirname, '../../packages/core/dist/index.css'),
      '@sepveneto/free-dom': resolve(__dirname, '../../packages/core/src/index.ts'),
    },
  },
})
