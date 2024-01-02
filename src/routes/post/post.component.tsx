import { Container } from '@chakra-ui/react'
import { Suspense } from 'react'
import PostDetail from '../../components/post/post-detail/post-detail.component'
import PostDetailLoader from '../../components/post/post-detail/post-detail-loader.component'

export default function Post() {
  return (
    <>
      <Container marginY='2rem'>
        <Suspense fallback={<PostDetailLoader />}>
          <PostDetail />
        </Suspense>
      </Container>
    </>
  )
}
