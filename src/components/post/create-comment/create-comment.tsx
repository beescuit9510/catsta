import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import useCreateComment from '../../../hooks/mutations/useCreateComment'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth } from '../../../utils/firebase'

export default function CreateComment() {
  const { postId } = useParams()

  const [content, setContent] = useState('')

  const { mutate, isPending } = useCreateComment({
    postId: postId!,
    userId: auth.currentUser!.uid,
    content,
  })

  return (
    <InputGroup variant={'flushed'}>
      <Input
        placeholder='Add a comment...'
        onChange={(event) => setContent(event.target.value)}
      />
      <InputRightElement>
        <Button
          variant={'ghost'}
          cursor={'link'}
          color={'blue.500'}
          _hover={{ color: 'blue.700' }}
          isDisabled={isPending}
          isLoading={isPending}
          onClick={() => mutate()}
        >
          Post
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}