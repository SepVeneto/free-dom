import type MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import * as fs from 'node:fs'
import * as path from 'node:path'

export function mdPlugin(md: MarkdownIt) {
  md.use(mdContainer, 'demo', {
    render(tokens: any, idx: number) {
      // 提取:::demo 后面的参数
      // const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
      if (tokens[idx].nesting === 1) {
        const mdToken = tokens[idx + 2]
        const sourcePath = mdToken.children[0].content
        const filePath = path.resolve(__dirname, '../examples', `${sourcePath}.vue`)
        const source = fs.readFileSync((filePath), 'utf-8')

        return `<vp-demo
            :demos="demos"
            path="${sourcePath}"
            source="${encodeURIComponent(source)}">
            <template #source>${renderSource(source)}</template>
            `
      } else {
        return '</vp-demo>'
      }
    },
  })
  function renderSource(html: string) {
    const highlight = md.parse('```vue\n' + html + '```', null)[0]
    const source = md.options.highlight?.(highlight.content, highlight.info, '') || ''
    return `<div class="language-vue"><button title="Copy Code" class="copy" /><span class="lang">vue</span>${source}</div>`
  }
}
