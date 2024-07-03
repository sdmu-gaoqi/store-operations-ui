// vite.config.ts
import vue from "file:///D:/code/store-operations-ui/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/code/store-operations-ui/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { resolve } from "path";
import { defineConfig } from "file:///D:/code/store-operations-ui/node_modules/vite/dist/node/index.js";
import postCssPxToRem from "file:///D:/code/store-operations-ui/node_modules/wa-postcss-pxtorem/index.js";
import svgLoader from "file:///D:/code/store-operations-ui/node_modules/vite-svg-loader/index.js";
import tailwindCss from "file:///D:/code/store-operations-ui/node_modules/tailwindcss/lib/index.js";
var __vite_injected_original_dirname = "D:\\code\\store-operations-ui";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({
      defaultImport: "component"
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src"),
      hooks: resolve(__vite_injected_original_dirname, "src/hooks"),
      styles: resolve(__vite_injected_original_dirname, "src/styles"),
      pages: resolve(__vite_injected_original_dirname, "src/pages"),
      components: resolve(__vite_injected_original_dirname, "src/components"),
      mocks: resolve(__vite_injected_original_dirname, "mocks")
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
          propList: ["*"],
          selectorBlackList: ["./to", "html"],
          // to开头的不进行转换,
          exclude: "/node_modules",
          unit: "wx"
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
    exclude: ["fsevents"]
  },
  build: {
    // target: 'es2015',
    // outDir: './dist',
    // cssCodeSplit: false,
    // cssTarget: ['chrome61'],
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "store-operations-ui",
      fileName: (format) => `store-operations-ui.${format}.js`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXHN0b3JlLW9wZXJhdGlvbnMtdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcc3RvcmUtb3BlcmF0aW9ucy11aVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS9zdG9yZS1vcGVyYXRpb25zLXVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcG9zdENzc1B4VG9SZW0gZnJvbSAnd2EtcG9zdGNzcy1weHRvcmVtJ1xuaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInXG5pbXBvcnQgdGFpbHdpbmRDc3MgZnJvbSAndGFpbHdpbmRjc3MnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maS9nXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlSnN4KCksXG4gICAgc3ZnTG9hZGVyKHtcbiAgICAgIGRlZmF1bHRJbXBvcnQ6ICdjb21wb25lbnQnXG4gICAgfSlcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICBob29rczogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaG9va3MnKSxcbiAgICAgIHN0eWxlczogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc3R5bGVzJyksXG4gICAgICBwYWdlczogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvcGFnZXMnKSxcbiAgICAgIGNvbXBvbmVudHM6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMnKSxcbiAgICAgIG1vY2tzOiByZXNvbHZlKF9fZGlybmFtZSwgJ21vY2tzJylcbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGh0dHBzOiBmYWxzZVxuICB9LFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbXG4gICAgICAgIHBvc3RDc3NQeFRvUmVtKHtcbiAgICAgICAgICByb290VmFsdWU6IDc1LFxuICAgICAgICAgIHByb3BMaXN0OiBbJyonXSxcbiAgICAgICAgICBzZWxlY3RvckJsYWNrTGlzdDogWycuL3RvJywgJ2h0bWwnXSwgLy8gdG9cdTVGMDBcdTU5MzRcdTc2ODRcdTRFMERcdThGREJcdTg4NENcdThGNkNcdTYzNjIsXG4gICAgICAgICAgZXhjbHVkZTogJy9ub2RlX21vZHVsZXMnLFxuICAgICAgICAgIHVuaXQ6ICd3eCdcbiAgICAgICAgfSksXG4gICAgICAgIHRhaWx3aW5kQ3NzKClcbiAgICAgIF1cbiAgICB9LFxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwiLi9zcmMvc3R5bGVzL21haW4uc2Nzc1wiOydcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnZnNldmVudHMnXVxuICB9LFxuICBidWlsZDoge1xuICAgIC8vIHRhcmdldDogJ2VzMjAxNScsXG4gICAgLy8gb3V0RGlyOiAnLi9kaXN0JyxcbiAgICAvLyBjc3NDb2RlU3BsaXQ6IGZhbHNlLFxuICAgIC8vIGNzc1RhcmdldDogWydjaHJvbWU2MSddLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICBuYW1lOiAnc3RvcmUtb3BlcmF0aW9ucy11aScsXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYHN0b3JlLW9wZXJhdGlvbnMtdWkuJHtmb3JtYXR9LmpzYFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsndnVlJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogJ1Z1ZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVEsT0FBTyxTQUFTO0FBQ3pSLE9BQU8sWUFBWTtBQUNuQixTQUFTLGVBQWU7QUFDeEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTyxlQUFlO0FBQ3RCLE9BQU8saUJBQWlCO0FBTnhCLElBQU0sbUNBQW1DO0FBU3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxNQUNSLGVBQWU7QUFBQSxJQUNqQixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUM3QixPQUFPLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQ3JDLFFBQVEsUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDdkMsT0FBTyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUNyQyxZQUFZLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDL0MsT0FBTyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUNuQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsUUFDUCxlQUFlO0FBQUEsVUFDYixXQUFXO0FBQUEsVUFDWCxVQUFVLENBQUMsR0FBRztBQUFBLFVBQ2QsbUJBQW1CLENBQUMsUUFBUSxNQUFNO0FBQUE7QUFBQSxVQUNsQyxTQUFTO0FBQUEsVUFDVCxNQUFNO0FBQUEsUUFDUixDQUFDO0FBQUEsUUFDRCxZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxJQUNBLHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxVQUFVO0FBQUEsRUFDdEI7QUFBQSxFQUNBLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBS0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsV0FBVyx1QkFBdUIsTUFBTTtBQUFBLElBQ3JEO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsS0FBSztBQUFBLE1BQ2hCLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
