import path from 'path'

import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"
import uglify from "rollup-plugin-uglify"
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'

const dist = 'dist/'
const src = 'src/'

export default {
  input: path.join(src, 'js/main.jsx'),
	output: {
		file: path.join(dist, 'js/bundle.js'),
		format: 'iife',
		sourcemap: true
	},
  plugins: [
    postcss({
      modules: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      presets: [
        "hyperapp",
        [
          "env",
          {
            modules: false
          }
        ]
      ],
      plugins: [
        "external-helpers"
      ],
      exclude: 'node_modules/**',
      babelrc: false
    }),
    resolve({
      jsnext: true
    }),
    uglify()
  ]
}
