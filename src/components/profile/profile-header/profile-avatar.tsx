import useUserPresence from '../../../hooks/useUserPresence'
import AvatarOnlineBadge from '../../common/avatar-online-badge/avatar-online-badge.component'
import BasicAvatar from '../../common/basic-avatar/basic-avatar.component'

export default function ProfileAvatar({
  photoURL,
  userId,
}: {
  photoURL: string
  userId: string
}) {
  const presence = useUserPresence(userId!)

  return (
    <BasicAvatar size={{ base: 'xl', md: '2xl' }} src={photoURL}>
      {presence?.connections && (
        <AvatarOnlineBadge
          boxSize='0.75em'
          borderWidth={'0.15em'}
          right={'0.15em'}
          bottom={'0.15em'}
        />
      )}
    </BasicAvatar>
  )
}
