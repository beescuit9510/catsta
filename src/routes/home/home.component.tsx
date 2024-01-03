import Feed from '../../components/home/feed/feed.component'
import { Container, Flex, Stack } from '@chakra-ui/react'
import WhoIsActive from '../../components/home/who-is-active/who-is-active.component'
import { Suspense } from 'react'
import PostDetailLoader from '../../components/post/post-detail/post-detail-loader.component'

export default function Home() {
  return (
    <Container maxW='container.lg' marginTop={'5%'} marginY={20}>
      <Flex gap={10}>
        <Suspense
          fallback={
            <Stack spacing={10} flex={1}>
              <PostDetailLoader />
              <PostDetailLoader />
              <PostDetailLoader />
            </Stack>
          }
        >
          <Feed />
        </Suspense>
        <WhoIsActive />
      </Flex>
    </Container>
  )
}
