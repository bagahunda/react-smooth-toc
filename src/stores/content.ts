import { EXIT, visit } from 'unist-util-visit'
import YAML from 'yaml'
import { create } from 'zustand'
import { MarkdownRenderer } from '@/markdown-renderer'
import type { Root as HastRoot } from 'hast'
import type { Root as MdastRoot } from 'mdast'

type ContentType = React.ReactElement<
  unknown,
  string | React.JSXElementConstructor<any>
>

interface ContentState {
  dom: ContentType | null
  mdast: MdastRoot | null
  hast: HastRoot | null
  title: string | null
  render: (markdown: string) => Promise<void>
  lastError: Error | null | undefined
}

const renderer = new MarkdownRenderer()

export const useContentStore = create<ContentState>(set => ({
  renderId: 0,
  dom: null,
  mdast: null,
  hast: null,
  title: null,
  lastError: null,
  render: async (markdown: string) => {
    try {
      const { result, hast, mdast } = await renderer.render(markdown)
      let title = null
      visit(mdast, 'yaml', node => {
        const frontmatter = YAML.parse(node.value)
        title = frontmatter.title || ''
        return EXIT
      })
      set({
        dom: result,
        hast,
        mdast,
        title,
        lastError: null
      })
    } catch (error: any) {
      console.error(`Failed to render markdown: ${error.stack}`)
      set({
        dom: null,
        hast: null,
        mdast: null,
        title: null,
        lastError: new Error('Failed to render markdown')
      })
    }
  }
}))
