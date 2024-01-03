import Feed from '../../components/feed/feed.component'
import { Container, Flex, Stack } from '@chakra-ui/react'
// import WhoIsActive from '../../components/who-is-active/who-is-active.component'
import { Suspense } from 'react'
import PostDetailLoader from '../../components/post/post-detail/post-detail-loader.component'

export default function Home() {
  return (
    <Container maxW='container.lg' marginTop={'5%'} marginY={20}>
      {/* <Flex gap={10} wid> */}
      <Suspense
        fallback={
          <Stack spacing={10}>
            <PostDetailLoader />
            <PostDetailLoader />
            <PostDetailLoader />
          </Stack>
        }
      >
        <Feed />
      </Suspense>
      {/* <WhoIsActive /> */}
      {/* </Flex> */}
    </Container>
  )
}
