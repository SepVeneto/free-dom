import { defineConfig } from 'vitepress'

import mdContainer from 'markdown-it-container'
import * as fs from 'node:fs'
import * as path from 'node:path'

export function preWrapperPlugin(md: MarkdownIt, options: Options) {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    // remove title from info
    token.info = token.info.replace(/\[.*\]/, '')

    const lang = extractLang(token.info)
    const rawCode = fence(...args)
    return `<div class="language-${lang}${getAdaptiveThemeMarker(options)}${
      / active( |$)/.test(token.info) ? ' active' : ''
    }"><button title="Copy Code" class="copy"></button><span class="lang">${lang}</span>${rawCode}</div>`
  }
}

export default defineConfig({
  base: '/free-dom',
  title: '@sepveneto/free-dom',
  markdown: {
    config: (md) => {
      md.use(mdContainer, 'demo', {
        render(tokens, idx) {
          const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/)

          if (tokens[idx].nesting === 1) {
            const mdToken = tokens[idx + 2]
            const sourcePath = mdToken.children[0].content
            const filePath = path.resolve(__dirname, '../examples', `${sourcePath}.vue`)
            const source = fs.readFileSync((filePath), 'utf-8')
            console.log(filePath)
            // console.log(md.renderer.)
            // const sourcePath = mdToken.children[0]
            // if (mdToken.type === 'inline') {
            //   source
            // }
            return `<vp-demo :demos="demos" path="${sourcePath}" source="${encodeURIComponent(source)}">`
          } else {
            return '</vp-demo>'
          }
        },
      })
    },
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
          { text: '边缘吸附', link: '/free-dom/dom-diff' },
          { text: '对齐线', link: '/free-dom/mark-line' },
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
