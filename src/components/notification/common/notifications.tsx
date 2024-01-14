import { Avatar, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import BasicImage from '../../common/basic-image/basic-image.component'

export function Header({
  photoURL,
  userId,
  displayName,
  action,
}: {
  photoURL: string
  userId: string
  displayName: string
  action: string
}) {
  return (
    <Flex alignItems={'center'} gap={2}>
      <Avatar src={photoURL}></Avatar>
      <Flex direction={'column'} alignItems={'flex-start'}>
        <Link to={`/${userId}`}>
          <Text noOfLines={2}>{displayName}</Text>
        </Link>
      </Flex>

      <Text fontWeight={'700'}>{action}</Text>
    </Flex>
  )
}

export function Body({
  photoURL,
  displayName,
  comment,
}: {
  photoURL: string
  displayName: string
  comment: string | null
}) {
  return (
    <Stack>
      <BasicImage src={photoURL} cursor={'pointer'} />
      {comment && (
        <Stack>
          <Flex gap={2}>
            <Text fontWeight={'700'}>{displayName}</Text>
            <Text wordBreak={'break-word'} noOfLines={1}>
              {comment}
            </Text>
          </Flex>
        </Stack>
      )}
    </Stack>
  )
}

export function Content({
  readYet,
  children,
}: {
  readYet: boolean
  children: React.ReactNode
}) {
  const readYetBg = useColorModeValue('gray.100', 'whiteAlpha.200')
  const readBg = useColorModeValue('white', 'black')

  return (
    <Stack
      borderRadius={'19px'}
      py={'1rem'}
      px={'1rem'}
      bg={readYet ? readYetBg : readBg}
      transition={'all 0.250s ease'}
    >
      {children}
    </Stack>
  )
}
