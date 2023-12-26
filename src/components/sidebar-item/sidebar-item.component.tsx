import { Box, Link, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

export default function SidebarItem({
  Icon,
  text,
}: {
  Icon: React.ReactNode
  text: string
}) {
  const bg = useColorModeValue('gray.100', 'whiteAlpha.200')
  return (
    <Link
      display={'flex'}
      to={'/'}
      as={RouterLink}
      alignItems={'center'}
      gap={4}
      _hover={{ bg: bg }}
      borderRadius={6}
      p={2}
      w={{ base: 10, lg: 'full' }}
      justifyContent={{ base: 'center', lg: 'flex-start' }}
    >
      {Icon}
      <Box display={{ base: 'none', lg: 'block' }}>{text}</Box>
    </Link>
  )
}
