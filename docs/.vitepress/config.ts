import { createRequire } from 'module'
import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export default defineConfig({
  lang: 'en-US',
  title: 'VitePress',
  description: 'Vite & Vue powered static site generator.',

  lastUpdated: true,
  cleanUrls: true,

  sitemap: {
    hostname: 'https://vitepress.dev',
    transformItems(items) {
      return items.filter((item) => !item.url.includes('migration'))
    }
  },

  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../src'),
        hooks: resolve(__dirname, '../../src/hooks'),
        styles: resolve(__dirname, '../../src/styles'),
        pages: resolve(__dirname, '../../src/pages'),
        components: resolve(__dirname, '../../src/components')
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
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'AZBRSFGG',
        'data-spa': 'auto',
        defer: ''
      }
    ]
  ],

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/components/': sidebarGuide()
    },

    editLink: {
      pattern:
        'https://github.com/sdmu-gaoqi/wa-component/blob/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sdmu-gaoqi/wa-component' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    },

    carbonAds: {
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    }
  }
})

function nav() {
  return [
    {
      text: 'Compoment',
      link: '/components/input-component',
      activeMatch: '/components/'
    },
    {
      text: pkg.version,
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md'
        },
        {
          text: 'Contributing',
          link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md'
        }
      ]
    }
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'Base',
      collapsed: false,
      items: [
        { text: 'Input', link: '/components/input' },
        { text: 'AddressSelect', link: '/components/addressSelect' },
        { text: 'Login', link: '/components/login' },
        { text: 'TableRender', link: '/components/tableRender' }
      ]
    }
  ]
}
