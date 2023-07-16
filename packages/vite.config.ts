import { defineConfig } from 'vite'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({
      dirs: resolve(__dirname, '.vitepress/theme/components'),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      transformer: 'vue3',
    }),
    {
      name: 'transform-markdown',
      enforce: 'pre',
      transform(code, id) {
        if (!id.endsWith('.md') || id.endsWith('index.md')) return
        const exampleId = id.split('/').splice(-2)[0]
        code += `\n<script setup>const demos = import.meta.globEager('../examples/${exampleId}/*.vue'); console.log('demos', demos);</script>`
        console.log(code)
        return code
      },
    },
  ],
  resolve: {
    alias: {
      'free-dom': resolve(__dirname, './core/src'),
    },
    dedupe: ['vue', 'vue-demi'],
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
})
