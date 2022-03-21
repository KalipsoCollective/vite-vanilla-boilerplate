import path from 'path'
import { defineConfig } from 'vite'
import Handlebars from 'vite-plugin-handlebars';

const PAGE_DATA = {
  '/index.html': {
    subTitle: 'Home Page',
  },
  '/other.html': {
    subTitle: 'Other Page',
  },
};

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
  },
  plugins: [Handlebars({
    partialDirectory: path.resolve(__dirname, 'src/partials'),
    compileOptions: {
      preventIndent: true,
    },
    context(pagePath) {
      return {
        title: "VVB",
        ...PAGE_DATA[pagePath]
      }
    },
  })],
})