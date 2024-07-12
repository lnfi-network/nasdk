import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-node-polyfills'

import commonjs from 'rollup-plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
// const clear = require('rollup-plugin-clear')

const isUMD = process.env.BUILD === 'umd'
let output = []
if (isUMD) {
  output = [{
    file: 'dist/nasdk.umd.js',
    format: 'umd',
    name: 'NASDK',
    globals: { NostrTools: 'NostrTools' }
  }]
} else {
  output = [{
    file: 'dist/nasdk.cjs.js',
    format: 'cjs'
  }, {
    file: 'dist/nasdk.esm.js',
    format: 'es'
  }]
}
export default {
  input: 'src/index.js',
  external: isUMD ? [] : ['NostrTools'],
  output: [...output],
  plugins: [
    nodePolyfills(),
    /*  clear({
      targets: ['dist'], 
      watch: true 
    }), */
    json(),
    resolve({
      browser: true
    }),
    commonjs(),
    babel({
      extensions: ['.js', '.ts'],
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/env',
          {
            targets: {
              browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
            }
          }
        ]
      ]
    }),

    terser()

  ]

}
