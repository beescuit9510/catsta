import { AvatarBadge, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useCachedUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'
import Follow from '../follow/follow.component'
import { formatDistance, formatRelative } from 'date-fns'
import useUserPresence from '../../../hooks/useUserPresence'
import BasicAvatar from '../basic-avatar/basic-avatar.component'

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
  const twoDays = 86400000
  const twoDayyAgo = Date.now() - twoDays

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
          {/* TODO: refactor shared dateformatting code */}
          <Text fontSize={12}>
            {presence?.connections
              ? bio
              : presence?.lastOnline &&
                (twoDayyAgo >= presence.lastOnline
                  ? formatRelative(presence.lastOnline, Date.now())
                  : formatDistance(presence.lastOnline, Date.now(), {
                      addSuffix: true,
                    }))}
          </Text>
        </Flex>
      </Flex>
      {currentUser?.id !== userId && <Follow followingUserId={userId} />}
    </Flex>
  )
}
