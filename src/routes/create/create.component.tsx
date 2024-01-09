import { Button, Stack, Textarea } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import useCreatePost from '../../hooks/mutations/useCreatePost'
import { auth } from '../../utils/firebase'
import useShowToast from '../../hooks/useShowToast'
import BasicImage from '../../components/common/basic-image/basic-image.component'
import PageContainer from '../../components/common/page-container/page-container.component'
import Error from '../error-boundary/error.component'
import ImageInput from '../../components/common/image-input/image-Input.component'

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
    onSuccess: () => toast('success', 'Successfully saved.'),
    onError: () => toast('error', 'Sorry, unexpected error has occured.'),
  })

  return (
    <PageContainer
      fallback={
        <Error>
          Sorry, an unexpected error has occurred in the create page
        </Error>
      }
    >
      <Stack>
        <BasicImage
          src={photoURL || undefined}
          onClick={() => inputRef.current?.click()}
          cursor={'pointer'}
        />
        <ImageInput
          inputRef={inputRef}
          setFile={setFile}
          setPreviewURL={setPhotoURL}
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
    </PageContainer>
  )
}
