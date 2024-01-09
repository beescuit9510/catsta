import Feed from '../../components/home/feed/feed.component'
import { Container, Flex } from '@chakra-ui/react'
import SuggestedForYou from '../../components/home/suggested-for-you/suggested-for-you.component'
import { Suspense } from 'react'
import PostLoader from '../../components/common/loader/post-loader.component'
import Error from '../error-boundary/error.component'
import PageContainer from '../../components/common/page-container/page-container.component'

export default function Home() {
  return (
    <PageContainer
      fallback={
        <Error>Sorry, an unexpected error has occurred in the home page</Error>
      }
      size='lg'
    >
      <Flex gap={5}>
        <Container size={'lg'} flex={1}>
          <Suspense fallback={<PostLoader length={3} />}>
            <Feed />
          </Suspense>
        </Container>

        <SuggestedForYou />
      </Flex>
    </PageContainer>
  )
}
