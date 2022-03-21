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
  publicDir: 'public',
  build: {
    minify: false,
    outDir: '../dist',
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.html'),
        other: path.resolve(__dirname, 'src/other.html')
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