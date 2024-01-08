import { Stack } from '@chakra-ui/react'
import Comment from '../comment/comment.component'
import { useParams } from 'react-router-dom'
import CommentLisLoader from './comment-list-loader.component'
import { useIntiniteComments } from '../../../hooks/queries/infinite/useInfiniteComments'
import LoadMoreBtn from '../../common/load-more-btn/load-more-btn.component'

export default function CommentList() {
  const { postId } = useParams()
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useIntiniteComments(postId!)
  // TODO: shared comment code .
  return (
    <>
      <Stack spacing={6} marginTop={'1rem'}>
        {data?.pages
          .flatMap((page) => page.data)
          .map(({ comment, user }) => {
            return (
              <Comment
                key={comment.id}
                userId={user.id}
                photoURL={user.photoURL}
                displayName={user.displayName}
                content={comment.content}
                createdAt={comment.createdAt}
              />
            )
          })}
        <LoadMoreBtn
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </Stack>
      {isFetchingNextPage && <CommentLisLoader />}
    </>
  )
}
