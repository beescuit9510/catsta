import {
  Box,
  Button,
  Center,
  Container,
  Image,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import useCreatePost from '../../hooks/mutations/useCreatePost'
import { auth } from '../../utils/firebase'
import useShowToast from '../../hooks/useShowToast'

export default function Create() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [photoURL, setPhotoURL] = useState('')
  const [content, setContent] = useState('')
  const toast = useShowToast()

  const { mutate, isPending } = useCreatePost({
    post: {
      file: file!,
      content,
      userId: auth.currentUser!.uid,
    },
    onSuccess: () => {
      toast('success', 'Successfully saved.')
    },
    onError: () => {
      toast('error', 'Sorry, unexpected error has occured.')
    },
  })

  return (
    <Center marginY={20}>
      <Container>
        <Stack>
          <Box boxSize={{ sm: 'sm', md: 'xl' }}>
            <Image
              src={photoURL || undefined}
              objectFit='cover'
              boxSize={'100%'}
              onClick={() => inputRef.current?.click()}
              cursor={'pointer'}
            />
          </Box>
          <Input
            ref={inputRef}
            hidden
            type='file'
            accept='image/*'
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (!file) return
              setFile(file)
              setPhotoURL(URL.createObjectURL(file))
            }}
          />
          <Textarea
            placeholder='Caption for your photo...'
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <Button
            isDisabled={file === null || isPending}
            isActive={isPending}
            isLoading={isPending}
            width='full'
            onClick={() => mutate()}
          >
            POST
          </Button>
        </Stack>
      </Container>
    </Center>
  )
}
