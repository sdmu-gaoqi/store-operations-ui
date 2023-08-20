import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import postCssPxToRem from 'wa-postcss-pxtorem'
import svgLoader from 'vite-svg-loader'
import tailwindCss from 'tailwindcss'

// https://vitejs.dev/confi/g
export default defineConfig({
  outDir: 'es',
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({
      defaultImport: 'component'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      hooks: resolve(__dirname, 'src/hooks'),
      styles: resolve(__dirname, 'src/styles'),
      pages: resolve(__dirname, 'src/pages'),
      components: resolve(__dirname, 'src/components'),
      mocks: resolve(__dirname, 'mocks')
    }
  },
  server: {
    https: false
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 75,
          propList: ['*'],
          selectorBlackList: ['./to', 'html'], // to开头的不进行转换,
          exclude: '/node_modules',
          unit: 'wx'
        }),
        tailwindCss()
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/main.scss";'
      }
    }
  },
  optimizeDeps: {
    exclude: ['fsevents']
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'store-operations-ui',
      fileName: (format) => `store-operations-ui.${format}.js`
    }
  },
  rollupOptions: {
    external: ['vue'],
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'store-operations-ui',
      fileName: (format) => `store-operations-ui.${format}.js`
    }
  }
})
