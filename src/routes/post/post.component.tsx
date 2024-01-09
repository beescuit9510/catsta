import { Suspense } from 'react'
import PostDetail from '../../components/post/post-detail/post-detail.component'
import PostLoader from '../../components/common/loader/post-loader.component'
import Error from '../error-boundary/error.component'
import PageContainer from '../../components/common/page-container/page-container.component'

export default function Post() {
  return (
    <PageContainer
      fallback={
        <Error>Sorry, an unexpected error has occurred in the post page</Error>
      }
    >
      <Suspense fallback={<PostLoader />}>
        <PostDetail />
      </Suspense>
    </PageContainer>
  )
}
