import { Button, Center, Grid, Icon, Stack, Text } from '@chakra-ui/react'
import PostGridItem from './post-grid-item.component'
import { Link, useParams } from 'react-router-dom'
import usePosts from '../../../../hooks/queries/usePosts'
import { auth } from '../../../../utils/firebase'
import { MdOutlinePhotoLibrary } from 'react-icons/md'

export default function PostGrid() {
  const { userId } = useParams()
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = usePosts(
    userId!
  )

  // TODO:shared code
  return (
    <Stack spacing={5}>
      <Center>
        <Stack>
          {data?.pages!.at(0)!.data.length === 0 &&
            (userId === auth.currentUser!.uid ? (
              <>
                <Center>
                  <Icon as={MdOutlinePhotoLibrary} fontSize={'3rem'} />
                </Center>
                <Text fontSize={'xl'} fontWeight={'700'}>
                  Share a moment with the world!
                </Text>
                <Button variant={'link'} color={'twitter.500'}>
                  <Link to={'/create'}>create your first post!</Link>
                </Button>
              </>
            ) : (
              <>
                <Center>
                  <Icon as={MdOutlinePhotoLibrary} fontSize={'3rem'} />
                </Center>

                <Text fontSize={'xl'} fontWeight={'700'}>
                  No Posts Yet
                </Text>
              </>
            ))}
        </Stack>
      </Center>

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
