import { Center, Container } from '@chakra-ui/react'
import { Suspense } from 'react'
import PostDetail from '../../components/post/post-detail/post-detail.component'
import PostLoader from '../../components/common/loader/post-loader.component'

export default function Post() {
  return (
    <>
      <Center marginY={20}>
        <Container>
          <Suspense fallback={<PostLoader />}>
            <PostDetail />
          </Suspense>
        </Container>
      </Center>
    </>
  )
}
