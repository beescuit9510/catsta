import { Avatar } from '@chakra-ui/react'
import useUserPresence from '../../../../hooks/useUserPresence'
import AvatarOnlineBadge from '../../../common/avatar-online-badge/avatar-online-badge.component'

export default function ProfileAvatar({
  photoURL,
  userId,
}: {
  photoURL: string
  userId: string
}) {
  const presence = useUserPresence(userId!)

  return (
    <Avatar size={{ base: 'xl', md: '2xl' }} src={photoURL}>
      {presence?.connections && (
        <AvatarOnlineBadge
          boxSize='0.75em'
          borderWidth={'0.15em'}
          right={'0.15em'}
          bottom={'0.15em'}
        />
      )}
    </Avatar>
  )
}
