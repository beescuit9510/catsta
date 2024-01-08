import { Center, Stack } from '@chakra-ui/react'

export default function Placeholder({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Center>
      <Stack>{children}</Stack>
    </Center>
  )
}
