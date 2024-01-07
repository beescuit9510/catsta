import { AvatarProps, Avatar } from '@chakra-ui/react'

export default function BasicAvatar({
  children,
  ...rest
}: {
  children?: React.ReactNode
} & AvatarProps) {
  return (
    <Avatar bg='teal.500' {...rest}>
      {children}
    </Avatar>
  )
}
