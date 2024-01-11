import { Avatar, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useCachedUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'
import Follow from '../follow/follow.component'
import useUserPresence from '../../../hooks/useUserPresence'
import BasicDate from '../basic-date/basic-date.component'
import AvatarOnlineBadge from '../avatar-online-badge/avatar-online-badge.component'

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
    <Flex justifyContent={'space-between'} alignItems={'center'} gap={5}>
      <Flex justifyContent={'space-between'} alignItems={'center'} gap={2}>
        <Avatar src={photoURL}>
          {presence?.connections && <AvatarOnlineBadge />}
        </Avatar>
        <Flex direction={'column'} alignItems={'flex-start'}>
          <Link to={`/${userId}`}>
            <Text noOfLines={2}>{displayName}</Text>
          </Link>
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
