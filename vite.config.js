import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  build: {
    minify: false,
    outDir: '../dist',
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.html'),
        other: path.resolve(__dirname, 'src/other.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          // [hash]
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          if (/otf|ttf|woff|woff2/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      },
    },
  }
})