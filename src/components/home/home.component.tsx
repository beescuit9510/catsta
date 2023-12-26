import Feed from '../feed/feed.component'
import { Container, Flex } from '@chakra-ui/react'
import MostRecentlyActive from '../most-recently-active/most-recently-active.component'

export default function Home() {
  return (
    <Container maxW='container.lg' marginTop={'5%'}>
      <Flex gap={10}>
        <Feed />
        <MostRecentlyActive />
      </Flex>
    </Container>
  )
}
