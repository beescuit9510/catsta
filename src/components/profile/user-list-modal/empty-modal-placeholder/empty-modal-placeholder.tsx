import { Center, Icon, Stack, Text } from '@chakra-ui/react'
import { RxAvatar } from 'react-icons/rx'

export default function EmptyModalPlaceholder({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Stack textAlign={'center'}>
      <Center>
        <Icon as={RxAvatar} fontSize={'3.5rem'} />
      </Center>

      <Text fontSize={'xl'} fontWeight={'700'}>
        {children}
      </Text>
    </Stack>
  )
}
