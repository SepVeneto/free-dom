import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@sepveneto/free-dom/css': resolve(__dirname, '../../packages/core/dist/index.css'),
      '@sepveneto/free-dom': resolve(__dirname, '../../packages/core/src/index.ts')
    }
  }
})
