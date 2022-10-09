import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import scss from 'rollup-plugin-scss'

const esbuildPlugin = esbuild()

export default defineConfig([
  {
    input: 'packages/core/src/index.ts',
    output: [
      {
        file: 'packages/core/dist/index.mjs',
        format: 'es',
      },
      {
        file: 'packages/core/dist/index.cjs',
        format: 'cjs',
      }
    ],
    plugins: [
      esbuildPlugin,
      scss({ output: 'packages/core/dist/theme.css' })
    ],
    external: [
      'vue-demi',
      'uuid',
      '@vueuse/core'
    ]
  },
])