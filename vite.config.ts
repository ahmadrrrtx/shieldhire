import { defineConfig } from 'vite';

export default defineConfig({
  root: './src/ui',

  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },

  server: {
    port: 5173,
    open: true,
    host: true,
    proxy: {
      '/proof': {
        target:      'https://lace-proof-pub.preprod.midnight.network',
        changeOrigin: true,
        rewrite:     (path) => path.replace(/^\/proof/, ''),
      },
    },
  },
});