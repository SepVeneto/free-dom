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
        text: '快速开始',
        link: '/quick-start',
      },
      {
        text: 'free-dom',
        items: [
          { text: '介绍', link: '/free-dom/introduction' },
          { text: '基本用法', link: '/free-dom/basic' },
          { text: '禁止拖曳', link: '/free-dom/disabled-drag' },
          { text: '禁止缩放', link: '/free-dom/disabled-resize' },
          { text: '禁止选中', link: '/free-dom/disabled-select' },
          { text: '锁定纵横比', link: '/free-dom/lock-aspect-ratio' },
          { text: '限制最小尺寸', link: '/free-dom/min-size' },
          { text: '自定义缩放操作点', link: '/free-dom/custom-handler' },
          { text: '边缘吸附', link: '/free-dom/diff' },
          { text: '同步尺寸', link: '/free-dom/sync-size' },
          { text: '指定拖曳对象', link: '/free-dom/drag-handle' },
          { text: '自动更正', link: '/free-dom/auto-correct' },
          { text: '缩放补偿', link: '/free-dom/transform-scale' },
          { text: '批量操作', link: '/free-dom/batch-select' },
          { text: '从外部添加', link: '/free-dom/from-outside' },
          { text: '手动选中', link: '/free-dom/manual-select' },
        ],
      },
      {
        text: 'grid-layout',
        items: [
          { text: '介绍', link: '/grid-layout/introduction' },
          { text: '禁用拖曳/缩放', link: '/grid-layout/only-layout' },
          { text: '静态元素', link: '/grid-layout/static' },
          { text: '元素的最小尺寸', link: '/grid-layout/min-size' },
          { text: '元素碰撞', link: '/grid-layout/collision' },
          { text: '缩放操作点', link: '/grid-layout/scale-handler' },
          { text: '与外部元素交互(beta)', link: '/grid-layout/group' },
        ],
      },
    ],
  },
})
