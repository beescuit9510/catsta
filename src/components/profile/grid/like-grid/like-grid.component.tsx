import { Button, Grid, Stack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import LikeGridItem from './like-grid-item.component'
import useLikes from '../../../../hooks/queries/useLikes'

export default function LikeGrid() {
  const { userId } = useParams()
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useLikes(
    userId!
  )

  return (
    <Stack spacing={5}>
      <Grid templateColumns='repeat(3, 1fr)' gap={3}>
        {data?.pages
          .flatMap((page) => page.posts)
          .map((post) => (
            <LikeGridItem
              key={post.id}
              postId={post.id}
              imageURL={post.photoURL}
              likedAt={post.likedAt}
            />
          ))}
        {/* TODO: loading something else when post array is empty */}
        {data?.pages[0].posts.length === 0 && 'No posts..'}
      </Grid>
      {/* TODO: shared code */}
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
