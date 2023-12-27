import { Avatar, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'

export default function Comment({
  displayName,
  createdAt,
  content,
}: {
  displayName: string
  createdAt: string
  content: string
}) {
  const creaetdAtColor = useColorModeValue('gray', 'whiteAlpha.600')

  return (
    <Flex gap={3}>
      <Avatar />
      <Stack gap={0}>
        <Flex gap={2} alignItems={'flex-start'}>
          <Text fontWeight={'700'}>{displayName}</Text>
          <Text color={creaetdAtColor} fontSize={'0.8rem'}>
            {createdAt}
          </Text>
        </Flex>
        <Text fontSize={'0.9rem'}>{content}</Text>
      </Stack>
    </Flex>
  )
}
