import { Center, Container } from '@chakra-ui/react'
import { Suspense } from 'react'
import PostDetail from '../../components/post/post-detail/post-detail.component'
import PostDetailLoader from '../../components/post/post-detail/post-detail-loader.component'

export default function Post() {
  return (
    <>
      <Center marginY={20}>
        <Container>
          <Suspense fallback={<PostDetailLoader />}>
            <PostDetail />
          </Suspense>
        </Container>
      </Center>
    </>
  )
}
