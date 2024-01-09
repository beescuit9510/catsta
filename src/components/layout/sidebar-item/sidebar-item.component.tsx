import {
  Box,
  Link,
  useColorModeValue,
  Icon as ChakraIcon,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { Link as RouterLink } from 'react-router-dom'

interface SidebarItemPropsWithIcon {
  leftIcon: IconType
  to: string
  text: string
  onClick?: () => void
  leftElement?: never
}

interface SidebarItemPropsWithElement {
  leftElement: React.ReactNode
  to: string
  text: string
  onClick?: () => void
  leftIcon?: never
}

type SidebarItemProps = SidebarItemPropsWithIcon | SidebarItemPropsWithElement

export default function SidebarItem({
  leftIcon,
  leftElement,
  to,
  text,
  onClick = () => {},
}: SidebarItemProps) {
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
      {leftIcon && <ChakraIcon as={leftIcon} fontSize={'1.25rem'} />}
      {leftElement && leftElement}
      <Box display={{ base: 'none', lg: 'block' }}>{text}</Box>
    </Link>
  )
}
