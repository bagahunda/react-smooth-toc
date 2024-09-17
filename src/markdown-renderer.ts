import * as jsxRuntime from 'react/jsx-runtime'
import rehype2react, { Components as JSXComponents } from 'rehype-react'
import rehypeSlug from 'rehype-slug'
import frontMatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import { unified } from 'unified'
import { createRehypedHeading } from './components/heading'

const rehypeReactComponents: Partial<JSXComponents> = {
  h1: createRehypedHeading(1),
  h2: createRehypedHeading(2),
  h3: createRehypedHeading(3),
  h4: createRehypedHeading(4),
  h5: createRehypedHeading(5),
  h6: createRehypedHeading(6)
}

export class MarkdownRenderer {
  processor: ReturnType<typeof this.createProcessor> | null = null

  createProcessor() {
    const remarkParser = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(frontMatter)

    const rehypeRemark = remarkParser()
      .use(remark2rehype, {
        allowDangerousHtml: true
      })
      .use(rehypeSlug)

    const renderer = rehypeRemark.use(rehype2react, {
      Fragment: jsxRuntime.Fragment as any,
      jsx: jsxRuntime.jsx as any,
      jsxs: jsxRuntime.jsxs as any,
      components: rehypeReactComponents
    })

    this.processor = renderer

    return renderer
  }

  async getProcessor() {
    if (this.processor) return this.processor
    return this.createProcessor()
  }

  async render(markdown: string) {
    const processor = await this.getProcessor()
    const mdast = processor.parse(markdown)
    const hast = await processor.run(mdast)
    const result = processor.stringify(hast)
    return { result, mdast, hast }
  }
}
