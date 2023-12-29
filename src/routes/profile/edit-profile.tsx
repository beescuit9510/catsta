import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useUploadFile } from 'react-firebase-hooks/storage'
import { doc, updateDoc } from 'firebase/firestore'
import { firestore, storage } from '../../utils/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import useShowToast from '../../hooks/useShowToast'

export default function EditProfile({
  userId,
  photoURL: _photoURL,
  displayName: _displayName,
  bio: _bio,
}: {
  userId: string
  photoURL: string
  displayName: string
  bio: string
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [photoURL, setPhotoURL] = useState(_photoURL)
  const [displayName, setDisplayName] = useState(_displayName)
  const [bio, setBio] = useState(_bio)

  const [file, setFile] = useState<File | null | undefined>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [uploadFile, uploading] = useUploadFile()
  const toast = useShowToast()

  //TODO: extract firebase code
  //TODO: extract modal code
  //TODO: extract file saving code
  //TODO: extract previe code

  const onSave = () =>
    Promise.resolve()
      .then(
        () =>
          file &&
          uploadFile(ref(storage, `users/${userId}`), file!, {
            contentType: 'image/jpeg',
          })
      )
      .then((snapshot) => (snapshot ? getDownloadURL(snapshot.ref) : photoURL))
      .then((photoURL) =>
        updateDoc(doc(firestore, `users/${userId}`), {
          photoURL,
          displayName,
          bio,
        })
      )
      .then(() => toast('success', 'Successfully saved.'))
      .catch(() => toast('error', 'Sorry, unexpected error has occured.'))

  return (
    <>
      <Button onClick={onOpen}>Edit Profile</Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => {
          setPhotoURL(_photoURL)
          setDisplayName(_displayName)
          setBio(_bio)
          onClose()
        }}
      >
        <Flex>
          <ModalOverlay />
          <ModalContent w={'90%'} bg={useColorModeValue('gray.50', 'gray.900')}>
            <ModalCloseButton />

            <ModalHeader>Edit profile</ModalHeader>
            <ModalBody>
              <Stack spacing={4}>
                <FormControl id='userName'>
                  <FormLabel>User Icon</FormLabel>
                  <Stack
                    alignItems={'center'}
                    direction={['column', 'row']}
                    spacing={6}
                  >
                    <Center>
                      <Avatar size='xl' src={photoURL}>
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
                      </Avatar>
                    </Center>
                    <Input
                      hidden
                      type='file'
                      onChange={(event) => {
                        const file = event.target.files?.[0]
                        console.log(file)
                        if (!file) return
                        setFile(file)
                        setPhotoURL(URL.createObjectURL(file))
                      }}
                      ref={inputRef}
                    />
                    <Button w='full' onClick={() => inputRef.current?.click()}>
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
                isLoading={uploading}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Flex>
      </Modal>
    </>
  )
}
