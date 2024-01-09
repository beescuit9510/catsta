import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import useCreateComment from '../../../hooks/mutations/useCreateComment'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth } from '../../../utils/firebase'
import CommentLisLoader from '../comment-list/comment-list-loader.component'

export default function CreateComment() {
  const { postId } = useParams()

  const [content, setContent] = useState('')

  const { mutate, isPending } = useCreateComment({
    postId: postId!,
    userId: auth.currentUser!.uid,
    content,
  })

  return (
    <>
      <InputGroup variant={'flushed'}>
        <Input
          placeholder='Add a comment...'
          onChange={(event) => setContent(event.target.value)}
        />
        <InputRightElement>
          {/* TODO: prevent empty string to be inserted */}
          <Button
            variant={'post'}
            isDisabled={isPending}
            isLoading={isPending}
            onClick={() => mutate()}
          >
            Post
          </Button>
        </InputRightElement>
      </InputGroup>
      {isPending && <CommentLisLoader />}
    </>
  )
}
