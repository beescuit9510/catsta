import Feed from '../../components/home/feed/feed.component'
import { Container, Flex, Hide, Show } from '@chakra-ui/react'
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
      <Flex gap={5} flex={1}>
        <Show above='md'>
          <Container size={'lg'} flex={1}>
            <Suspense fallback={<PostLoader length={3} />}>
              <Feed />
            </Suspense>
          </Container>
        </Show>
        <Hide above='md'>
          <Flex width={'95%'} marginX={'auto'} justifyItems={'center'}>
            <Suspense fallback={<PostLoader length={3} />}>
              <Feed />
            </Suspense>
          </Flex>
        </Hide>

        <Show above='md'>
          <SuggestedForYou />
        </Show>
      </Flex>
    </PageContainer>
  )
}
