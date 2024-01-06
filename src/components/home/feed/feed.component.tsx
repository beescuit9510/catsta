import { Box, Button, Flex, Image, Stack, Text } from '@chakra-ui/react'
import useFeed from '../../../hooks/queries/useFeed'
import { auth } from '../../../utils/firebase'
import UserAvatar from '../../common/user-avatar/user-avatar.component'
import Like from '../../post/like/like.component'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import PostDetailLoader from '../../post/post-detail/post-detail-loader.component'

export default function Feed() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useFeed()

  return (
    <Stack spacing={10}>
      {data?.pages.at(0)?.data.length === 0 && (
        <Flex
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={2.5}
        >
          <Text fontSize={'2xl'} fontWeight={'700'}>
            No Followings
          </Text>
          <Button variant={'link'} color={'twitter.500'}>
            <Link to={'/search'}> Why don't you start following today?</Link>
          </Button>
        </Flex>
      )}
      <Stack spacing={10}>
        {data?.pages
          .flatMap((page) => page.data)
          .map(({ post, user }) => {
            return (
              <Stack key={post.id}>
                <UserAvatar
                  userId={user.id}
                  displayName={user.displayName}
                  photoURL={user.photoURL}
                  bio={user.bio}
                />

                <Box>
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
                </Stack>
              </Stack>
            )
          })}
      </Stack>
      {/* TODO: extract code */}
      {hasNextPage && !isFetchingNextPage && (
        <Button onClick={() => fetchNextPage()}>Load more</Button>
      )}
      {isFetchingNextPage && (
        <Stack spacing={10} flex={1}>
          {Array(data!.pages.at(0)!.perPage)
            .fill(1)
            .map((v, idx) => (
              <PostDetailLoader key={v + idx} />
            ))}
        </Stack>
      )}
    </Stack>
  )
}
