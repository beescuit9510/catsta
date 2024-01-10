import {
  Flex,
  useColorModeValue,
  useColorMode,
  Icon,
  Box,
  FlexProps,
} from '@chakra-ui/react'
import { BiLogOut } from 'react-icons/bi'
import { AiFillHome } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { FaRegSquarePlus } from 'react-icons/fa6'
import SidebarItem from '../sidebar-item/sidebar-item.component'
import { auth } from '../../../utils/firebase'
import { MdDarkMode } from 'react-icons/md'
import { IoIosSunny } from 'react-icons/io'
import { useUser } from '../../../hooks/queries/useUser'
import BasicAvatar from '../../common/basic-avatar/basic-avatar.component'
import Logo from '../../common/logo/logo.component'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      direction={'column'}
      minHeight={'100vh'}
      borderRight={'1px solid'}
      borderColor={useColorModeValue('gray.100', 'whiteAlpha.300')}
      position={'sticky'}
      top={0}
      left={0}
      py={8}
      px={{ base: 2, lg: 4 }}
    >
      {children}
    </Flex>
  )
}

function Stack({
  children,
  ...rest
}: { children: React.ReactNode } & FlexProps) {
  return (
    <Flex
      direction={'column'}
      gap={'15'}
      alignItems={'center'}
      paddingY={5}
      paddingX={2}
      {...rest}
    >
      {children}
    </Flex>
  )
}

function ToggleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Icon
      fontSize={'xl'}
      cursor={'pointer'}
      marginLeft={'0.5rem'}
      alignSelf={'flex-start'}
      as={colorMode === 'light' ? MdDarkMode : IoIosSunny}
      _hover={{
        color: colorMode === 'light' ? '#FFCC33' : '#D14009',
      }}
      onClick={toggleColorMode}
    />
  )
}

export default function Sidebar() {
  const { data: currentUser } = useUser(auth.currentUser!.uid)

  return (
    <Container>
      <Stack flex={1}>
        <Box marginLeft={'0.75rem'} marginRight={'auto'}>
          <Logo
            marginBottom={'1rem'}
            size={'lg'}
            display={{ base: 'none', lg: 'block' }}
          />
        </Box>
        <SidebarItem leftIcon={AiFillHome} to='/' text='Home' />
        <SidebarItem leftIcon={FaSearch} to='/search' text='Search' />
        <SidebarItem leftIcon={FaRegSquarePlus} to='/create' text='Create' />
        <SidebarItem
          leftElement={<BasicAvatar src={currentUser!.photoURL} size={'sm'} />}
          to={`/${currentUser!.id}`}
          text='Profile'
        />
      </Stack>

      <Stack>
        <ToggleColorMode />
        <SidebarItem
          leftIcon={BiLogOut}
          to='/auth'
          text='Logout'
          onClick={() => auth.signOut()}
        />
      </Stack>
    </Container>
  )
}
