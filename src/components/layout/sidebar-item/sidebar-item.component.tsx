import { Box, Link, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

export default function SidebarItem({
  Icon,
  to,
  text,
  onClick = () => {},
}: {
  Icon: React.ReactNode
  to: string
  text: string
  onClick?: () => void
}) {
  const bg = useColorModeValue('gray.100', 'whiteAlpha.200')
  return (
    <Link
      to={to}
      as={RouterLink}
      display={'flex'}
      alignItems={'center'}
      gap={4}
      _hover={{ bg }}
      borderRadius={6}
      p={2}
      w={{ base: 10, lg: 'full' }}
      justifyContent={{ base: 'center', lg: 'flex-start' }}
      onClick={onClick}
    >
      {Icon}
      <Box display={{ base: 'none', lg: 'block' }}>{text}</Box>
    </Link>
  )
}
