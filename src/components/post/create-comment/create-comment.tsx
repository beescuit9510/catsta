import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react'
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

  const [isOpen, setIsOpen] = useState(false)

  const [timeoutFn, setTimeoutFn] = useState<NodeJS.Timeout>()

  const hanldlePost = () => {
    if (!content) {
      setIsOpen(true)

      clearTimeout(timeoutFn)

      const ref = setTimeout(() => {
        setIsOpen(false)
      }, 1000)

      setTimeoutFn(ref)

      return
    }

    mutate()
  }

  return (
    <>
      <InputGroup variant={'flushed'}>
        <Input
          placeholder='Add a comment...'
          onChange={(event) => setContent(event.target.value)}
        />
        <InputRightElement>
          <Tooltip
            placement={'top'}
            isOpen={isOpen}
            label='Type something'
            aria-label='A tooltip'
          >
            <Button
              variant={'post'}
              isDisabled={isPending}
              isLoading={isPending}
              onClick={hanldlePost}
            >
              Post
            </Button>
          </Tooltip>
        </InputRightElement>
      </InputGroup>
      {isPending && <CommentLisLoader />}
    </>
  )
}
