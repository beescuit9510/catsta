import { AvatarBadge, AvatarBadgeProps } from '@chakra-ui/react'

export default function AvatarOnlineBadge({ ...rest }: AvatarBadgeProps) {
  return <AvatarBadge boxSize='1em' bg='green.500' {...rest} />
}
