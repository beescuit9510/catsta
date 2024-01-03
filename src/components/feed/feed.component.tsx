import { Box, Button, Flex, Image, Stack, Text } from '@chakra-ui/react'
import useFeed from '../../hooks/queries/useFeed'
import { auth } from '../../utils/firebase'
import UserAvatar from '../common/user-avatar/user-avatar.component'
import Like from '../post/like/like.component'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export default function Feed() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useFeed()

  return (
    <Stack spacing={10}>
      <Stack spacing={10}>
        {data?.pages
          .flatMap((page) => page.posts)
          .map(({ post, user }) => {
            return (
              <>
                <Stack>
                  <UserAvatar
                    userId={user.id}
                    displayName={user.displayName}
                    photoURL={user.photoURL}
                  />

                  <Box>
                    {/* TODO: fallback image since its too slow */}
                    {/* TODO: fixed image size like insta */}
                    {/* TODO: image +box and extract shared image code */}
                    <Image
                      src={post.photoURL}
                      objectFit={'cover'}
                      fallbackSrc={'https://placehold.co/600x500?text=...'}
                    />
                  </Box>

                  <Box>
                    <Flex gap={2}>
                      <Like
                        liked={post.likes.includes(auth.currentUser!.uid)}
                        userId={auth.currentUser!.uid}
                        postId={post.id}
                      />
                      <Link to={`/posts/${post.id}`}>
                        <IoChatbubbleOutline size={25} />
                      </Link>
                    </Flex>
                    <Text>{post.likes.length} likes</Text>
                  </Box>

                  <Stack>
                    <Flex gap={2}>
                      <Text fontWeight={'700'}>{user.displayName}</Text>
                      <Text>{post.content}</Text>
                    </Flex>
                    {/* <CreateComment /> */}

                    {/* <Suspense fallback={<CommentLisLoader />}>
                    <CommentList />
                  </Suspense> */}
                  </Stack>
                </Stack>
              </>
            )
          })}
      </Stack>
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
