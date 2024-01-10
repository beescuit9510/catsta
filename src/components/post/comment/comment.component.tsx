import { Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import BasicAvatar from '../../common/basic-avatar/basic-avatar.component'
import BasicDate from '../../common/basic-date/basic-date.component'

export default function Comment({
  userId,
  displayName,
  photoURL,
  createdAt,
  content,
}: {
  userId: string
  displayName: string
  photoURL: string
  createdAt: number
  content: string
}) {
  const creaetdAtColor = useColorModeValue('gray', 'whiteAlpha.600')

  return (
    <Flex gap={'0.5rem'}>
      <BasicAvatar src={photoURL} />
      <Stack gap={0}>
        <Flex gap={2} alignItems={'flex-start'}>
          <Link to={`/${userId}`}>
            <Text fontWeight={'700'}>{displayName}</Text>
          </Link>
          <Text color={creaetdAtColor} fontSize={'0.8rem'}>
            <BasicDate date={createdAt} />
          </Text>
        </Flex>
        <Text fontSize={'0.9rem'}>{content}</Text>
      </Stack>
    </Flex>
  )
}
