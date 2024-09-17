import '@/App.css'
import { Box, HStack } from '@kuma-ui/core'
import { Container } from '@/atoms/container'
import { MainContent } from './components/main-content'
import { MarkdownView } from './components/markdown-view'
import { PageTitle } from './components/page-title'

function App() {
  return (
    <Container>
      <MainContent>
        <PageTitle />
        <HStack gap={[0, 0, 0, '1em', '2em']}>
          <Box flexGrow={1} minWidth={0}>
            <MarkdownView />
          </Box>
          <Box
            display={['none', 'none', 'block', 'block']}
            flexGrow={0}
            flexShrink={0}
            flexBasis={['0', '0', '200px', '200px', '300px']}
          >
            <Box
              position={'sticky'}
              top={16}
              maxHeight={'calc(100vh - 70px)'}
              overflowY={'auto'}
            >
              Outline goes here
            </Box>
          </Box>
        </HStack>
      </MainContent>
    </Container>
  )
}

export default App
