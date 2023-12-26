import Feed from '../feed/feed.component'
import { Container, Flex } from '@chakra-ui/react'
import WhoIsActive from '../who-is-active/who-is-active.component'

export default function Home() {
  return (
    <Container maxW='container.lg' marginTop={'5%'}>
      <Flex gap={10}>
        <Feed />
        <WhoIsActive />
      </Flex>
    </Container>
  )
}
