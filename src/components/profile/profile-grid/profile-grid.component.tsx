import { Button, Grid, Stack } from '@chakra-ui/react'
import ProfileGridItem from '../profile-grid-item/profile-grid-item.component'
import usePosts from '../../../hooks/queries/usePosts'
import { useParams } from 'react-router-dom'

export default function ProfileGrid() {
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
            <ProfileGridItem
              key={post.id}
              imageURL={post.photoURL}
              likes={0}
              comments={0}
            />
          ))}
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
