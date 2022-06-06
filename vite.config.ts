import path from 'path';
import { defineConfig } from 'vite';
import packageJson from './package.json';

const getPackageName = () => packageJson.name;
const fileName = {
  index: `index.js`,
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.iife.js`,
};

module.exports = defineConfig({
  base: './',
  resolve: {
    alias: {
      '@donskelle/pwa-helpers': path.resolve(__dirname, 'src/index.ts'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'pwaHelpers',
      formats: ['es', 'cjs'],
      fileName: (format) => fileName[format],
    },
  },
});
