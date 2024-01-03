import { Button, Grid, Stack } from '@chakra-ui/react'
import PostGridItem from './post-grid-item.component'
import { useParams } from 'react-router-dom'
import usePosts from '../../../../hooks/queries/usePosts'

export default function PostGrid() {
  const { userId } = useParams()
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = usePosts(
    userId!
  )

  return (
    <Stack spacing={5}>
      <Grid templateColumns='repeat(3, 1fr)' gap={3}>
        {data?.pages
          .flatMap((page) => page.posts)
          .map((post) => (
            <PostGridItem
              key={post.id}
              postId={post.id}
              imageURL={post.photoURL}
              likes={post.likes.length}
              comments={post.comments}
            />
          ))}
        {data?.pages[0].posts.length === 0 && 'No posts..'}
      </Grid>
      {hasNextPage && (
        <Button
          disabled={isFetchingNextPage}
          isLoading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Load more
        </Button>
      )}
    </Stack>
  )
}
