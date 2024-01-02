import { Button, Stack } from '@chakra-ui/react'
import Comment from '../comment/comment.component'
import { useIntiniteComments } from '../../../hooks/queries/useComments'
import { useParams } from 'react-router-dom'

export default function CommentList() {
  const { postId } = useParams()
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useIntiniteComments(postId!)
  // TODO: shared comment code .
  return (
    <Stack spacing={6} marginTop={'1rem'}>
      {data?.pages
        .flatMap((page) => page.comments)
        .map((comment) => {
          return (
            <Comment
              key={comment.id}
              userId={comment.user.id}
              photoURL={comment.user.photoURL}
              displayName={comment.user.displayName}
              content={comment.content}
              createdAt={comment.createdAt}
            />
          )
        })}
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
