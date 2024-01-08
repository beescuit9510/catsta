import { Stack } from '@chakra-ui/react'
import PostLogo from '../../common/post-logo'
import PlaceholderText from '../../common/placeholder-text'

export default function EmptyModalPlaceholder({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Stack textAlign={'center'}>
      <PostLogo />
      <PlaceholderText>{children}</PlaceholderText>
    </Stack>
  )
}
