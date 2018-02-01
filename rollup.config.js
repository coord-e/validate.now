import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"
import uglify from "rollup-plugin-uglify"
import postcss from 'rollup-plugin-postcss'

export default {
  plugins: [
    postcss({
      modules: true
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
