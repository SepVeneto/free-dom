import { defineConfig } from 'tsup';
import sassPlugin from 'esbuild-plugin-sass';

export default defineConfig({
  entry: ['./src/*.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  esbuildPlugins: [sassPlugin()],
});
