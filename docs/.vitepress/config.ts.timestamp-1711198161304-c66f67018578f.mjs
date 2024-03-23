// docs/.vitepress/config.ts
import { createRequire } from "module";
import { defineConfig } from "file:///D:/code/store-operations-ui/node_modules/vitepress/dist/node/index.js";
import vueJsx from "file:///D:/code/store-operations-ui/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "D:\\code\\store-operations-ui\\docs\\.vitepress";
var __vite_injected_original_import_meta_url = "file:///D:/code/store-operations-ui/docs/.vitepress/config.ts";
var require2 = createRequire(__vite_injected_original_import_meta_url);
var pkg = require2("vitepress/package.json");
var config_default = defineConfig({
  lang: "en-US",
  title: "VitePress",
  description: "Vite & Vue powered static site generator.",
  lastUpdated: true,
  cleanUrls: true,
  sitemap: {
    hostname: "https://vitepress.dev",
    transformItems(items) {
      return items.filter((item) => !item.url.includes("migration"));
    }
  },
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "../../src"),
        hooks: resolve(__vite_injected_original_dirname, "../../src/hooks"),
        styles: resolve(__vite_injected_original_dirname, "../../src/styles"),
        pages: resolve(__vite_injected_original_dirname, "../../src/pages"),
        components: resolve(__vite_injected_original_dirname, "../../src/components")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "../../src/styles/main.scss";'
        }
      }
    }
  },
  head: [
    ["meta", { name: "theme-color", content: "#3c8772" }],
    [
      "script",
      {
        src: "https://cdn.usefathom.com/script.js",
        "data-site": "AZBRSFGG",
        "data-spa": "auto",
        defer: ""
      }
    ]
  ],
  themeConfig: {
    nav: nav(),
    sidebar: {
      "/components/": sidebarGuide()
    },
    editLink: {
      pattern: "https://github.com/sdmu-gaoqi/wa-component/blob/main/docs/:path",
      text: "Edit this page on GitHub"
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/sdmu-gaoqi/wa-component" }
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright \xA9 2019-present Evan You"
    },
    carbonAds: {
      code: "CEBDT27Y",
      placement: "vuejsorg"
    }
  }
});
function nav() {
  return [
    {
      text: "Compoment",
      link: "/components/input-component",
      activeMatch: "/components/"
    },
    {
      text: pkg.version,
      items: [
        {
          text: "Changelog",
          link: "https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md"
        },
        {
          text: "Contributing",
          link: "https://github.com/vuejs/vitepress/blob/main/.github/contributing.md"
        }
      ]
    }
  ];
}
function sidebarGuide() {
  return [
    {
      text: "Base",
      collapsed: false,
      items: [
        { text: "Input", link: "/components/input" },
        { text: "AddressSelect", link: "/components/addressSelect" },
        { text: "Login", link: "/components/login" },
        { text: "TableRender", link: "/components/tableRender" },
        { text: "FormRender", link: "/components/formRender" }
      ]
    }
  ];
}
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcc3RvcmUtb3BlcmF0aW9ucy11aVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcc3RvcmUtb3BlcmF0aW9ucy11aVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlL3N0b3JlLW9wZXJhdGlvbnMtdWkvZG9jcy8udml0ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGNyZWF0ZVJlcXVpcmUgfSBmcm9tICdtb2R1bGUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcblxuY29uc3QgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUoaW1wb3J0Lm1ldGEudXJsKVxuY29uc3QgcGtnID0gcmVxdWlyZSgndml0ZXByZXNzL3BhY2thZ2UuanNvbicpXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGxhbmc6ICdlbi1VUycsXG4gIHRpdGxlOiAnVml0ZVByZXNzJyxcbiAgZGVzY3JpcHRpb246ICdWaXRlICYgVnVlIHBvd2VyZWQgc3RhdGljIHNpdGUgZ2VuZXJhdG9yLicsXG5cbiAgbGFzdFVwZGF0ZWQ6IHRydWUsXG4gIGNsZWFuVXJsczogdHJ1ZSxcblxuICBzaXRlbWFwOiB7XG4gICAgaG9zdG5hbWU6ICdodHRwczovL3ZpdGVwcmVzcy5kZXYnLFxuICAgIHRyYW5zZm9ybUl0ZW1zKGl0ZW1zKSB7XG4gICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiAhaXRlbS51cmwuaW5jbHVkZXMoJ21pZ3JhdGlvbicpKVxuICAgIH1cbiAgfSxcblxuICB2aXRlOiB7XG4gICAgcGx1Z2luczogW3Z1ZUpzeCgpXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vc3JjJyksXG4gICAgICAgIGhvb2tzOiByZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3NyYy9ob29rcycpLFxuICAgICAgICBzdHlsZXM6IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vc3JjL3N0eWxlcycpLFxuICAgICAgICBwYWdlczogcmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9zcmMvcGFnZXMnKSxcbiAgICAgICAgY29tcG9uZW50czogcmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi9zcmMvY29tcG9uZW50cycpXG4gICAgICB9XG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIi4uLy4uL3NyYy9zdHlsZXMvbWFpbi5zY3NzXCI7J1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGhlYWQ6IFtcbiAgICBbJ21ldGEnLCB7IG5hbWU6ICd0aGVtZS1jb2xvcicsIGNvbnRlbnQ6ICcjM2M4NzcyJyB9XSxcbiAgICBbXG4gICAgICAnc2NyaXB0JyxcbiAgICAgIHtcbiAgICAgICAgc3JjOiAnaHR0cHM6Ly9jZG4udXNlZmF0aG9tLmNvbS9zY3JpcHQuanMnLFxuICAgICAgICAnZGF0YS1zaXRlJzogJ0FaQlJTRkdHJyxcbiAgICAgICAgJ2RhdGEtc3BhJzogJ2F1dG8nLFxuICAgICAgICBkZWZlcjogJydcbiAgICAgIH1cbiAgICBdXG4gIF0sXG5cbiAgdGhlbWVDb25maWc6IHtcbiAgICBuYXY6IG5hdigpLFxuXG4gICAgc2lkZWJhcjoge1xuICAgICAgJy9jb21wb25lbnRzLyc6IHNpZGViYXJHdWlkZSgpXG4gICAgfSxcblxuICAgIGVkaXRMaW5rOiB7XG4gICAgICBwYXR0ZXJuOlxuICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL3NkbXUtZ2FvcWkvd2EtY29tcG9uZW50L2Jsb2IvbWFpbi9kb2NzLzpwYXRoJyxcbiAgICAgIHRleHQ6ICdFZGl0IHRoaXMgcGFnZSBvbiBHaXRIdWInXG4gICAgfSxcblxuICAgIHNvY2lhbExpbmtzOiBbXG4gICAgICB7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3NkbXUtZ2FvcWkvd2EtY29tcG9uZW50JyB9XG4gICAgXSxcblxuICAgIGZvb3Rlcjoge1xuICAgICAgbWVzc2FnZTogJ1JlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4nLFxuICAgICAgY29weXJpZ2h0OiAnQ29weXJpZ2h0IFx1MDBBOSAyMDE5LXByZXNlbnQgRXZhbiBZb3UnXG4gICAgfSxcblxuICAgIGNhcmJvbkFkczoge1xuICAgICAgY29kZTogJ0NFQkRUMjdZJyxcbiAgICAgIHBsYWNlbWVudDogJ3Z1ZWpzb3JnJ1xuICAgIH1cbiAgfVxufSlcblxuZnVuY3Rpb24gbmF2KCkge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHRleHQ6ICdDb21wb21lbnQnLFxuICAgICAgbGluazogJy9jb21wb25lbnRzL2lucHV0LWNvbXBvbmVudCcsXG4gICAgICBhY3RpdmVNYXRjaDogJy9jb21wb25lbnRzLydcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IHBrZy52ZXJzaW9uLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdDaGFuZ2Vsb2cnLFxuICAgICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdml0ZXByZXNzL2Jsb2IvbWFpbi9DSEFOR0VMT0cubWQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnQ29udHJpYnV0aW5nJyxcbiAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3ZpdGVwcmVzcy9ibG9iL21haW4vLmdpdGh1Yi9jb250cmlidXRpbmcubWQnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF1cbn1cblxuZnVuY3Rpb24gc2lkZWJhckd1aWRlKCkge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHRleHQ6ICdCYXNlJyxcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7IHRleHQ6ICdJbnB1dCcsIGxpbms6ICcvY29tcG9uZW50cy9pbnB1dCcgfSxcbiAgICAgICAgeyB0ZXh0OiAnQWRkcmVzc1NlbGVjdCcsIGxpbms6ICcvY29tcG9uZW50cy9hZGRyZXNzU2VsZWN0JyB9LFxuICAgICAgICB7IHRleHQ6ICdMb2dpbicsIGxpbms6ICcvY29tcG9uZW50cy9sb2dpbicgfSxcbiAgICAgICAgeyB0ZXh0OiAnVGFibGVSZW5kZXInLCBsaW5rOiAnL2NvbXBvbmVudHMvdGFibGVSZW5kZXInIH0sXG4gICAgICAgIHsgdGV4dDogJ0Zvcm1SZW5kZXInLCBsaW5rOiAnL2NvbXBvbmVudHMvZm9ybVJlbmRlcicgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxTQUFTLHFCQUFxQjtBQUNqVixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFlBQVk7QUFDbkIsU0FBUyxlQUFlO0FBSHhCLElBQU0sbUNBQW1DO0FBQXlKLElBQU0sMkNBQTJDO0FBS25QLElBQU1BLFdBQVUsY0FBYyx3Q0FBZTtBQUM3QyxJQUFNLE1BQU1BLFNBQVEsd0JBQXdCO0FBRTVDLElBQU8saUJBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxF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
