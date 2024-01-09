import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import { auth } from '../../../utils/firebase'
import UserAvatar from '../../common/user-avatar/user-avatar.component'
import Like from '../../post/like/like.component'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import PostLoader from '../../common/loader/post-loader.component'
import BasicImage from '../../common/basic-image/basic-image.component'
import useInfiniteFeed from '../../../hooks/queries/infinite/useInfiniteFeed'
import LoadMoreBtn from '../../common/load-more-btn/load-more-btn.component'

export default function Feed() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteFeed()

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
          <Button variant={'go-link'}>
            <Link to={'/search'}> Why don't you start following today?</Link>
          </Button>
        </Flex>
      )}
      <Stack spacing={10}>
        {data?.pages
          .flatMap((page) => page.data)
          .map(({ post, user }) => {
            return (
              // TODO: when click post, redirects to the post.
              <Stack key={post.id}>
                <UserAvatar
                  userId={user.id}
                  displayName={user.displayName}
                  photoURL={user.photoURL}
                  bio={user.bio}
                />

                <BasicImage src={post.photoURL} />

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
      <LoadMoreBtn
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
      {isFetchingNextPage && <PostLoader length={data!.pages.at(0)!.perPage} />}
    </Stack>
  )
}
