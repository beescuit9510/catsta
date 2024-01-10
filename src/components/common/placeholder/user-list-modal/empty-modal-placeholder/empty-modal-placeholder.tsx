import { Stack, Text } from '@chakra-ui/react'
import PostLogo from '../../common/post-logo'

export default function EmptyModalPlaceholder({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Stack textAlign={'center'}>
      <PostLogo />
      <Text variant='placeholder'>{children}</Text>
    </Stack>
  )
}
