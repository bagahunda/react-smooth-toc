import { Box, Heading } from '@kuma-ui/core'
import { useTOCStore } from '@/stores/toc'
import { MarkdownOutlineItem } from './markdown-outline-item'

export const MarkdownOutlineView = () => {
  const sections = useTOCStore(state => state.sections)
  const minimumLevel = (sections || []).reduce(
    (p, c) => Math.min(p, c.level),
    6
  )

  return (
    <Box className="markdown-outline-view" fontSize="0.9em">
      <Heading as="h2" fontSize="1em">
        On this page
      </Heading>
      <Box
        position="relative"
        top={0}
        left="0.5em"
        bottom={0}
        width="1px"
        height={100}
        backgroundColor="var(--color-muted)"
      />
      <Box as="ul" role="list" m={0} pl="1.5rem" listStyle="none" mt="1rem">
        {sections?.map(heading => (
          <MarkdownOutlineItem
            {...heading}
            key={heading.id}
            level={heading.level - minimumLevel}
            active={false}
          />
        ))}
      </Box>
    </Box>
  )
}
