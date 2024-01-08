import { Stack, useColorModeValue, Text } from '@chakra-ui/react'
import PostLogo from '../../common/post-logo'
import PlaceholderText from '../../common/placeholder-text'

export default function MyEmptyModalPlaceholder({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Stack textAlign={'center'}>
      <PostLogo />
      <PlaceholderText>{title}</PlaceholderText>
      <Text color={useColorModeValue('gray.800', 'whiteAlpha.900')}>
        {children}
      </Text>
    </Stack>
  )
}
