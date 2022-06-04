import path from 'path';
import { defineConfig } from 'vite';
import packageJson from './package.json';

const getPackageName = () => {
  return packageJson.name;
};

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
  iife: `${getPackageName()}.iife.js`,
};

module.exports = defineConfig({
  base: './',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'pwaHelpers',
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => fileName[format],
    },
  },
});
