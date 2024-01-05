import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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

function UserList({
  query,
}: {
  query: (userId: string) => UseQueryResult<User[]>
}) {
  const { userId } = useParams()
  const { data } = query(userId!)

  return (
    <>
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
}: {
  counts: number
  caption: string
  title: string
  query: (userId: string) => UseQueryResult<User[]>
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

      <Modal isOpen={isOpen} onClose={() => onClose()}>
        <ModalOverlay />
        <ModalContent
          width={'90%'}
          bg={useColorModeValue('gray.50', 'gray.900')}
        >
          <ModalCloseButton />
          <ModalHeader>{title}</ModalHeader>
          <ModalBody maxH={'350px'} overflowY={'auto'} marginBottom={5}>
            <Stack spacing={'5'}>
              <Suspense fallback={<UserAvatarLoader length={4} />}>
                <UserList query={query} />
              </Suspense>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
