import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Stack,
  Center,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useCachedUser } from '../../../hooks/queries/useUser'
import { useUpdateUser } from '../../../hooks/mutations/useUpdateUser'
import useShowToast from '../../../hooks/useShowToast'
import BasicModal from '../../common/basic-modal/basic-modal.component'
import AvatarEdit from './avatar-edit/avatar-edit.component'
import ProfileInput from './profile-input/profile-input.component'

export default function ProfileEdit({ userId }: { userId: string }) {
  const user = useCachedUser(userId)
  const [photoURL, setPhotoURL] = useState(user!.photoURL)
  const [displayName, setDisplayName] = useState(user!.displayName)
  const [bio, setBio] = useState(user!.bio)
  const [file, setFile] = useState<File | null>(null)

  const toast = useShowToast()

  const { mutate, isPending } = useUpdateUser({
    onSuccess: () => toast('success', 'Successfully saved.'),
    onError: () => toast('error', 'Sorry, unexpected error has occured.'),
  })

  const onSave = () => {
    if (file) mutate({ userId, file, displayName, bio })
    else mutate({ userId, photoURL, displayName, bio })
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

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
            <Center>
              <AvatarEdit
                setFile={setFile}
                photoURL={photoURL}
                setPhotoURL={setPhotoURL}
              />
            </Center>
            <ProfileInput
              value={displayName}
              setValue={setDisplayName}
              label={'Display name'}
            />
            <ProfileInput value={bio} setValue={setBio} label={'Bio'} />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={onSave}
            isLoading={isPending}
            disabled={isPending}
            variant={'inverted-post'}
          >
            Submit
          </Button>
        </ModalFooter>
      </BasicModal>
    </>
  )
}
