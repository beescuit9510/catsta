import { AvatarBadge, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useCachedUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'
import Follow from '../follow/follow.component'
import useUserPresence from '../../../hooks/useUserPresence'
import BasicAvatar from '../basic-avatar/basic-avatar.component'
import BasicDate from '../basic-date/basic-date.component'

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
  const presence = useUserPresence(userId)

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <Flex justifyContent={'space-between'} alignItems={'center'} gap={2}>
        <BasicAvatar src={photoURL}>
          {presence?.connections && (
            <AvatarBadge boxSize='1em' bg='green.500' />
          )}
        </BasicAvatar>
        <Flex direction={'column'} alignItems={'flex-start'}>
          <Link to={`/${userId}`}>
            <Text>{displayName}</Text>
          </Link>
          {/* TODO: refactor code */}
          <Text fontSize={12}>
            {presence?.connections
              ? bio
              : presence?.lastOnline && (
                  <BasicDate date={presence.lastOnline} />
                )}
          </Text>
        </Flex>
      </Flex>
      {currentUser?.id !== userId && <Follow followingUserId={userId} />}
    </Flex>
  )
}
