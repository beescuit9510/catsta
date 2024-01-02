import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import UserAvatar from '../../common/user-avatar/user-avatar.component'
import usePost from '../../../hooks/queries/usePost'
import { auth } from '../../../utils/firebase'
import Like from '../like/like.component'
import CreateComment from '../create-comment/create-comment'
import CommentList from '../comment-list/comment-list.component'
import { Suspense } from 'react'

export default function PostDetail() {
  const { postId } = useParams()
  if (!postId) throw new Error('Post is not found')

  const { data } = usePost(postId)

  return (
    <Stack>
      <UserAvatar
        userId={data!.user!.id}
        displayName={data!.user!.displayName}
        photoURL={data!.user!.photoURL}
      />

      <Box>
        {/* TODO: fallback image! since its too slow */}
        {/* TODO: fixed image size like insta */}
        {/* TODO: image +box and extract shared image code */}
        <Image
          src={data!.post!.photoURL}
          fallbackSrc={'https://placehold.co/600x500?text=...'}
        />
      </Box>

      <Box>
        <Like liked={data!.post!.likes.includes(auth.currentUser!.uid)} />
      </Box>

      <Stack>
        <Text>{data!.post!.likes.length} likes</Text>
        <Flex gap={2}>
          <Text fontWeight={'700'}>{data!.user!.displayName}</Text>
          <Text>{data!.post!.content}</Text>
        </Flex>

        <CreateComment />

        <Suspense fallback={<>Loading...</>}>
          <CommentList />
        </Suspense>
      </Stack>
    </Stack>
  )
}
