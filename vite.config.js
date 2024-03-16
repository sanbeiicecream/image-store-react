import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import stylexPlugin from '@stylexjs/rollup-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '' : '/image-store/',
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    react(),
    stylexPlugin({
      // Required. File path for the generated CSS file.
      fileName: 'stylex.css',
      // default: false
      dev: false,
      // prefix for all generated classNames
      classNamePrefix: 'x',
      // Required for CSS variable support
      unstable_moduleResolution: {
        // type: 'commonJS' | 'haste'
        // default: 'commonJS'
        type: 'commonJS',
        // The absolute path to the root directory of your project
        rootDir: __dirname,
      },
    })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
