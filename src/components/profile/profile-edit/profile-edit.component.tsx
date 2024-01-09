import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Stack,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useCachedUser } from '../../../hooks/queries/useUser'
import { useUpdateUser } from '../../../hooks/mutations/useUpdateUser'
import useShowToast from '../../../hooks/useShowToast'
import BasicAvatar from '../../common/basic-avatar/basic-avatar.component'
import BasicModal from '../../common/basic-modal/basic-modal.component'

export default function ProfileEdit({ userId }: { userId: string }) {
  //TODO: extract preview code
  // TODO: limit the photo size under 2mb(2*1024*1024)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useCachedUser(userId)
  const [photoURL, setPhotoURL] = useState(user!.photoURL)
  const [displayName, setDisplayName] = useState(user!.displayName)
  const [bio, setBio] = useState(user!.bio)

  const [file, setFile] = useState<File | null | undefined>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const toast = useShowToast()

  const { mutate, isPending } = useUpdateUser({
    onSuccess: () => {
      toast('success', 'Successfully saved.')
    },
    onError: () => {
      toast('error', 'Sorry, unexpected error has occured.')
    },
  })

  const onSave = () => {
    if (file) mutate({ userId, file, displayName, bio })
    else mutate({ userId, photoURL, displayName, bio })
  }

  return (
    <>
      <Button onClick={onOpen}>Edit Profile</Button>
      <BasicModal
        isOpen={isOpen}
        onClose={() => {
          setPhotoURL(user!.photoURL)
          setDisplayName(user!.displayName)
          setBio(user!.bio)
          onClose()
        }}
      >
        <ModalHeader>Edit profile</ModalHeader>
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>User photo</FormLabel>
              <Stack
                alignItems={'center'}
                direction={['column', 'row']}
                spacing={6}
              >
                <Center>
                  <BasicAvatar size='xl' src={photoURL}>
                    <AvatarBadge
                      as={IconButton}
                      size='sm'
                      rounded='full'
                      top='-10px'
                      colorScheme='red'
                      aria-label='remove Image'
                      icon={<IoClose />}
                      onClick={() => {
                        setFile(null)
                        setPhotoURL('')
                      }}
                    />
                  </BasicAvatar>
                </Center>
                <Input
                  hidden
                  type='file'
                  accept='image/*'
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (!file) return
                    setFile(file)
                    setPhotoURL(URL.createObjectURL(file))
                  }}
                  ref={inputRef}
                />
                <Button width='full' onClick={() => inputRef.current?.click()}>
                  Change profile photo
                </Button>
              </Stack>
            </FormControl>
            <FormControl id='userName' isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder='UserName'
                _placeholder={{ color: 'gray.500' }}
                type='text'
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Bio</FormLabel>
              <Input
                placeholder='Bio'
                _placeholder={{ color: 'gray.500' }}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={onSave}
            isLoading={isPending}
            disabled={isPending}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </BasicModal>
    </>
  )
}
