import { Stack, useColorModeValue, Text } from '@chakra-ui/react'
import PostLogo from '../../common/post-logo'

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
      <Text variant='placeholder'>{title}</Text>
      <Text color={useColorModeValue('gray.800', 'whiteAlpha.900')}>
        {children}
      </Text>
    </Stack>
  )
}
