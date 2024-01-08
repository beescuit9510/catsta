import { Button, Grid, Stack } from '@chakra-ui/react'
import PostGridItem from './post-grid-item.component'
import { useParams } from 'react-router-dom'
import { auth } from '../../../../utils/firebase'
import ProfileTabLoader from '../../profile-tab/profile-tab-loader.component'
import MyPostGridPlaceholder from '../../../common/placeholder/grid/post-grid/my-post-grid-placeholder.component'
import PostGridPlaceholder from '../../../common/placeholder/grid/post-grid/post-grid-placeholder.component'
import useInfinitePosts from '../../../../hooks/queries/infinite/useInfinitePosts'

export default function PostGrid() {
  const { userId } = useParams()
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfinitePosts(userId!)
  const isEmpty = data?.pages!.at(0)!.data.length === 0

  // TODO:shared code
  return (
    <Stack spacing={5}>
      {isEmpty &&
        (userId === auth.currentUser!.uid ? (
          <MyPostGridPlaceholder />
        ) : (
          <PostGridPlaceholder />
        ))}

      <Grid templateColumns='repeat(3, 1fr)' gap={3}>
        {data?.pages
          .flatMap((page) => page.data)
          .map((post) => (
            <PostGridItem
              key={post.id}
              postId={post.id}
              imageURL={post.photoURL}
              likes={post.likes.length}
              comments={post.comments}
            />
          ))}
      </Grid>
      {hasNextPage && !isFetchingNextPage && (
        <Button onClick={() => fetchNextPage()}>Load more</Button>
      )}
      {isFetchingNextPage && <ProfileTabLoader />}
    </Stack>
  )
}
