import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import { defineConfig } from 'rollup'


export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.mjs',
      format: 'esm',
    }, {
      file: 'dist/index.cjs',
      format: 'cjs',
    }
  ],
  plugins: [typescript({
    tsconfig: 'tsconfig.json',
  }), json()]
})