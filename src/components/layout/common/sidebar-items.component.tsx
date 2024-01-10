import SidebarItem from '../sidebar-item/sidebar-item.component'
import { AiFillHome } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { FaRegSquarePlus } from 'react-icons/fa6'
import BasicAvatar from '../../common/basic-avatar/basic-avatar.component'
import { useUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'
import { BiLogOut } from 'react-icons/bi'
import { Icon, useColorMode } from '@chakra-ui/react'
import { MdDarkMode } from 'react-icons/md'
import { IoIosSunny } from 'react-icons/io'

export function HomeItem() {
  return <SidebarItem leftIcon={AiFillHome} to='/' text='Home' />
}

export function SearchItem() {
  return <SidebarItem leftIcon={FaSearch} to='/search' text='Search' />
}

export function CreateItem() {
  return <SidebarItem leftIcon={FaRegSquarePlus} to='/create' text='Create' />
}

export function ProfileItem() {
  const { data: currentUser } = useUser(auth.currentUser!.uid)

  return (
    <SidebarItem
      leftElement={<BasicAvatar src={currentUser!.photoURL} size={'sm'} />}
      to={`/${currentUser!.id}`}
      text='Profile'
    />
  )
}

export function LogoutItem() {
  return (
    <SidebarItem
      leftIcon={BiLogOut}
      to='/auth'
      text='Logout'
      onClick={() => auth.signOut()}
    />
  )
}

export function ToggleColorMode() {
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
