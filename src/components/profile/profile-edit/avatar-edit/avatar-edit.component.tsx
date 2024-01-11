import { useRef } from 'react'
import { Avatar, AvatarBadge, IconButton, Stack } from '@chakra-ui/react'
import { IoClose } from 'react-icons/io5'
import ImageInput from '../../../common/image-input/image-Input.component'

export default function AvatarEdit({
  photoURL,
  setPhotoURL,
  setFile,
}: {
  photoURL: string
  setPhotoURL: React.Dispatch<React.SetStateAction<string>>
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <Stack>
      <Avatar
        size='xl'
        src={photoURL}
        onClick={() => inputRef.current?.click()}
        cursor={'pointer'}
      >
        <AvatarBadge
          as={IconButton}
          size='sm'
          rounded='full'
          top='-10px'
          colorScheme='red'
          aria-label='remove Image'
          icon={<IoClose />}
          onClick={(event) => {
            setFile(null)
            setPhotoURL('')
            event.stopPropagation()
          }}
        />
      </Avatar>
      <ImageInput
        inputRef={inputRef}
        setFile={setFile}
        setPreviewURL={setPhotoURL}
      />
    </Stack>
  )
}
