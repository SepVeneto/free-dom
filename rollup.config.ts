import esbuild from 'rollup-plugin-esbuild'
import scss from 'rollup-plugin-scss'

const esbuildPlugin = esbuild()

const configs = [
  {
    input: 'packages/core/index.ts',
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
      scss(),
    ],
    external: [
      'vue-demi'
    ]
  }
]

export default configs