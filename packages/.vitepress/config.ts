import { defineConfig } from 'vitepress'
import { mdPlugin } from './plugin'

export default defineConfig({
  base: '/free-dom',
  title: '@sepveneto/free-dom',
  markdown: {
    config: mdPlugin,
  },
  themeConfig: {
    sidebar: [
      {
        text: 'free-dom',
        items: [
          { text: '介绍', link: '/free-dom/introduction' },
          { text: '基本用法', link: '/free-dom/basic' },
          { text: '禁止拖曳', link: '/free-dom/disabled-drag' },
          { text: '禁止缩放', link: '/free-dom/disabled-resize' },
          { text: '锁定纵横比', link: '/free-dom/lock-aspect-ratio' },
          { text: '限制最小尺寸', link: '/free-dom/min-size' },
          { text: '自定义缩放操作点', link: '/free-dom/custom-handler' },
          { text: '边缘吸附', link: '/free-dom/diff' },
          { text: '同步尺寸', link: '/free-dom/sync-size' },
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
