import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/free-dom',
  title: '@sepveneto/free-dom',
  themeConfig: {
    sidebar: [
      {
        text: 'free-dom',
        items: [
          { text: '介绍', link: '/free-dom/introduction' },
          { text: '自定义缩放操作点', link: '/free-dom/custom-handler' },
        ],
      },
      {
        text: 'grid-layout',
        items: [
          { text: '介绍', link: '/grid-layout/introduction' },
        ],
      },
    ],
  },
})
