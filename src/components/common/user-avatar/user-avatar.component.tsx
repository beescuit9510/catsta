import { Avatar, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useCachedUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'
import Follow from '../follow/follow.component'

export default function UserAvatar({
  userId,
  displayName,
  photoURL,
  bio,
}: {
  userId: string
  displayName: string
  photoURL: string
  bio: string
}) {
  const currentUser = useCachedUser(auth.currentUser!.uid)

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Flex justifyContent={'space-between'} alignItems={'center'} gap={2}>
        <Avatar src={photoURL} />
        <Flex direction={'column'} alignItems={'flex-start'}>
          <Link to={`/${userId}`}>
            <Text>{displayName}</Text>
          </Link>
          <Text fontSize={12}>{bio}</Text>
        </Flex>
      </Flex>
      {currentUser?.id !== userId && <Follow followingUserId={userId} />}
    </Flex>
  )
}
