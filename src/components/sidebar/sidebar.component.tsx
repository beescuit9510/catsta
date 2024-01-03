import {
  Heading,
  Flex,
  useColorModeValue,
  Avatar,
  useColorMode,
  Icon,
} from '@chakra-ui/react'
import { BiLogOut } from 'react-icons/bi'
import { AiFillHome } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { FaRegHeart } from 'react-icons/fa'
import SidebarItem from '../sidebar-item/sidebar-item.component'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { MdDarkMode } from 'react-icons/md'
import { IoIosSunny } from 'react-icons/io'
import { useCachedUser } from '../../hooks/queries/useUser'

export default function Sidebar() {
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.300')
  const [logout] = useSignOut(auth)
  const { colorMode, toggleColorMode } = useColorMode()
  const currentUser = useCachedUser(auth.currentUser!.uid)

  return (
    <Flex
      minHeight={'100vh'}
      borderRight={'1px solid'}
      borderColor={borderColor}
      py={8}
      position={'sticky'}
      top={0}
      left={0}
      px={{ base: 2, lg: 4 }}
      direction={'column'}
    >
      <Flex
        flex={1}
        direction={'column'}
        alignItems={'center'}
        gap={15}
        paddingY={5}
        paddingX={2}
      >
        {/* //TODO: refactor heading logo from login, signup and sidebar. */}
        <Heading
          marginRight={'auto'}
          marginLeft={2}
          size={'lg'}
          marginBottom={5}
          fontWeight={'500'}
          display={{ base: 'none', lg: 'block' }}
        >
          Catsta
        </Heading>
        <SidebarItem Icon={<AiFillHome size={20} />} to='/' text='Home' />
        <SidebarItem Icon={<FaSearch size={20} />} to='/search' text='Search' />
        <SidebarItem
          Icon={<FaRegSquarePlus size={20} />}
          to='/create'
          text='Create'
        />
        <SidebarItem
          Icon={<FaRegHeart size={20} />}
          to='/notification'
          text='Notification'
        />
        <SidebarItem
          Icon={<Avatar src={currentUser!.photoURL} size={'sm'} />}
          to={`/${currentUser?.id}`}
          text='Profile'
        />
      </Flex>
      <Flex
        direction={'column'}
        gap={'15'}
        alignItems={'center'}
        paddingY={5}
        paddingX={2}
      >
        <Icon
          marginLeft={'0.5rem'}
          alignSelf={'flex-start'}
          onClick={toggleColorMode}
          as={colorMode === 'light' ? MdDarkMode : IoIosSunny}
          cursor={'pointer'}
          _hover={{
            color: colorMode === 'light' ? '#FFCC33' : '#D14009',
          }}
          fontSize={'xl'}
        />
        <SidebarItem
          Icon={<BiLogOut size={20} />}
          to='/auth'
          text='Logout'
          onClick={logout}
        />
      </Flex>
    </Flex>
  )
}
