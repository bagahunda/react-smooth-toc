import React, { useEffect } from 'react'
import { Box } from '@kuma-ui/core'
import markdownContent from '@/example.md?raw'
import { useContentStore } from '@/stores/content'
import './markdown-view.css'

export const MarkdownView: React.FC = () => {
  const { dom, render } = useContentStore()
  useEffect(() => {
    render(markdownContent)
  }, [render])
  return <Box className="markdown-view">{dom || <div>Loading...</div>}</Box>
}
