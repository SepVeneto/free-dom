import esbuild from 'rollup-plugin-esbuild'
import scss from 'rollup-plugin-scss'
import dts from 'rollup-plugin-dts'

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
  },
  {
    input: 'packages/core/wrapper.ts',
    output: {
      file: 'packages/core/dist/index.d.ts',
      format: 'es'
    },
    plugins: [dts()],
    external: [
      'vue-demi'
    ]
  }
]

export default configs