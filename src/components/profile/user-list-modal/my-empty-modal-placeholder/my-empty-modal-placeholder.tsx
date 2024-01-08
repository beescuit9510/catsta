import { Center, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { RxAvatar } from 'react-icons/rx'

export default function MyEmptyModalPlaceholder({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Stack textAlign={'center'}>
      <Center>
        <Icon as={RxAvatar} fontSize={'3.5rem'} />
      </Center>

      <Text fontSize={'xl'} fontWeight={'700'}>
        {title}
      </Text>
      <Text color={useColorModeValue('gray.800', 'whiteAlpha.900')}>
        {children}
      </Text>
    </Stack>
  )
}
