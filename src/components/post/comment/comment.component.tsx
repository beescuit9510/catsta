import { Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { formatDistance, formatRelative } from 'date-fns'
import { Link } from 'react-router-dom'
import BasicAvatar from '../../common/basic-avatar/basic-avatar.component'

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
  // TODO: i18n
  const creaetdAtColor = useColorModeValue('gray', 'whiteAlpha.600')
  const twoDays = 86400000
  const twoDayyAgo = Date.now() - twoDays

  return (
    <Flex gap={'0.5rem'}>
      <BasicAvatar src={photoURL} />
      <Stack gap={0}>
        <Flex gap={2} alignItems={'flex-start'}>
          <Link to={`/${userId}`}>
            <Text fontWeight={'700'}>{displayName}</Text>
          </Link>
          <Text color={creaetdAtColor} fontSize={'0.8rem'}>
            {twoDayyAgo >= createdAt
              ? formatRelative(createdAt, Date.now())
              : formatDistance(createdAt, Date.now(), {
                  addSuffix: true,
                })}
          </Text>
        </Flex>
        <Text fontSize={'0.9rem'}>{content}</Text>
      </Stack>
    </Flex>
  )
}
