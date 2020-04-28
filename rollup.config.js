import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy';

// const { generateSW } = require("rollup-plugin-workbox");

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'esm',
    name: 'bundle',
  },
  plugins: [
    babel({
      //   babelrc: false,
      //   runtimeHelpers: true,
      presets: [
        [
          '@babel/preset-env',
          {
            corejs: 3,
            modules: false,
            useBuiltIns: 'usage',
            targets: {
              chrome: 81,
              edge: 81,
              firefox: 75,
              safari: 12,
            },
          },
        ],
      ],
    }),
    resolve(),
    copy({
      targets: [{ src: 'public/**/*', dest: 'dist' }],
      flatten: false,
    }),
  ],
};
