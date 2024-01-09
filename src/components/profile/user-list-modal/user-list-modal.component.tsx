import {
  Button,
  ModalBody,
  ModalHeader,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import UserAvatar from '../../common/user-avatar/user-avatar.component'
import { Suspense, useEffect } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import UserAvatarLoader from '../../common/user-avatar-loader/user-avatar-loader.component'
import { User } from '../../../utils/firestore-collections-docs'
import BasicModal from '../../common/basic-modal/basic-modal.component'

function UserList({
  query,
  placeholder,
}: {
  query: (userId: string) => UseQueryResult<User[]>
  placeholder: React.ReactNode
}) {
  const { userId } = useParams()
  const { data } = query(userId!)

  return (
    <>
      {data?.length === 0 && placeholder}
      {data?.map((user) => (
        <UserAvatar
          key={user.id}
          displayName={user.displayName}
          userId={user.id}
          photoURL={user.photoURL}
          bio={user.bio}
        />
      ))}
    </>
  )
}
// TODO: fix code error
export default function UserListModal({
  counts,
  caption,
  title,
  query,
  placeholder,
}: {
  counts: number
  caption: string
  title: string
  query: (userId: string) => UseQueryResult<User[]>
  placeholder: React.ReactNode
}) {
  const { userId } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    onClose()
  }, [userId])

  return (
    <>
      <Button
        display={'flex'}
        variant={'link'}
        onClick={onOpen}
        fontWeight={'400'}
        color={useColorModeValue('black', 'whiteAlpha.900')}
      >
        <Text fontWeight={'900'} mr={'0.25em'}>
          {counts}
        </Text>
        {caption}
      </Button>

      <BasicModal isOpen={isOpen} onClose={() => onClose()}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody maxH={'350px'} overflowY={'auto'} marginBottom={5}>
          <Stack spacing={'5'}>
            <Suspense fallback={<UserAvatarLoader length={4} />}>
              <UserList query={query} placeholder={placeholder} />
            </Suspense>
          </Stack>
        </ModalBody>
      </BasicModal>
    </>
  )
}
