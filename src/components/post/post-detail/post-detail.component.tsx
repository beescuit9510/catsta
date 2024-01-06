import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import UserAvatar from '../../common/user-avatar/user-avatar.component'
import usePost from '../../../hooks/queries/usePost'
import Like from '../like/like.component'
import CreateComment from '../create-comment/create-comment'
import CommentList from '../comment-list/comment-list.component'
import { Suspense } from 'react'
import CommentLisLoader from '../comment-list/comment-list-loader.component'
import { auth } from '../../../utils/firebase'
import PostImage from '../../common/post-image/post-image.component'

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
        bio={data!.user!.bio}
      />

      <PostImage src={data!.post!.photoURL} />

      <Box>
        <Like
          liked={data!.post!.likes.includes(auth.currentUser!.uid)}
          userId={auth.currentUser!.uid}
          postId={postId}
        />
        <Text>{data!.post!.likes.length} likes</Text>
      </Box>

      <Stack>
        <Flex gap={2}>
          <Text fontWeight={'700'}>{data!.user!.displayName}</Text>
          <Text>{data!.post!.content}</Text>
        </Flex>
        <CreateComment />

        <Suspense fallback={<CommentLisLoader />}>
          <CommentList />
        </Suspense>
      </Stack>
    </Stack>
  )
}
