import { Button, Center, Grid, Stack, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import LikeGridItem from './like-grid-item.component'
import useLikes from '../../../../hooks/queries/useLikes'
import { auth } from '../../../../utils/firebase'
import ProfileTabLoader from '../../profile-tab/profile-tab-loader.component'

export default function LikeGrid() {
  const { userId } = useParams()
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useLikes(
    userId!
  )

  return (
    <Stack spacing={5}>
      <Center>
        <Stack>
          {data?.pages!.at(0)!.data.length === 0 &&
            (userId === auth.currentUser!.uid ? (
              <>
                <Text fontSize={'xl'} fontWeight={'700'}>
                  Like a post and share with the world!
                </Text>
                <Button variant={'link'} color={'twitter.500'}>
                  <Link to={'/'}>like your friends' post!</Link>
                </Button>
              </>
            ) : (
              <Text fontSize={'xl'} fontWeight={'700'}>
                No Likes Yet
              </Text>
            ))}
        </Stack>
      </Center>

      <Grid templateColumns='repeat(3, 1fr)' gap={3}>
        {data?.pages
          .flatMap((page) => page.data)
          .map(({ post, like }) => (
            <LikeGridItem
              key={post.id}
              postId={post.id}
              imageURL={post.photoURL}
              likedAt={like.createdAt}
            />
          ))}
      </Grid>
      {/* TODO: shared code */}
      {hasNextPage && !isFetchingNextPage && (
        <Button onClick={() => fetchNextPage()}>Load more</Button>
      )}
      {isFetchingNextPage && <ProfileTabLoader />}
    </Stack>
  )
}
