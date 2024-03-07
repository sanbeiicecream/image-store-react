import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '' : '/image-store/',
  plugins: [resolve(), babel({ babelHelpers: 'bundled' }), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
