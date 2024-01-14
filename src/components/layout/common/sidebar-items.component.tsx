import SidebarItem from '../sidebar-item/sidebar-item.component'
import { AiFillHome } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { useUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'
import { BiLogOut } from 'react-icons/bi'
import { Avatar, Box, Flex, Icon, Text, useColorMode } from '@chakra-ui/react'
import { MdDarkMode } from 'react-icons/md'
import { IoIosSunny } from 'react-icons/io'
import { GrNotification } from 'react-icons/gr'
import useNotifications from '../../../hooks/useNotifications'

export function HomeItem() {
  return <SidebarItem leftIcon={AiFillHome} to='/' text='Home' />
}

export function SearchItem() {
  return <SidebarItem leftIcon={FaSearch} to='/search' text='Search' />
}

export function CreateItem() {
  return <SidebarItem leftIcon={FaRegSquarePlus} to='/create' text='Create' />
}

export function NotificiationItem() {
  const count = useNotifications()

  return (
    <SidebarItem
      leftElement={
        <Flex justifyContent={'center'} position={'relative'}>
          <Icon as={GrNotification} fontSize={'1.25rem'} />
          {count !== 0 && (
            <Text
              position={'absolute'}
              top={'-25%'}
              left={'50%'}
              bg='red'
              color={'white'}
              borderRadius={'9999px'}
              px={'0.3rem'}
              fontSize={'0.75rem'}
            >
              {count}
            </Text>
          )}
        </Flex>
      }
      to='/notification'
      text='Notificiation'
    />
  )
}

export function ProfileItem() {
  const { data: currentUser } = useUser(auth.currentUser!.uid)

  return (
    <SidebarItem
      leftElement={<Avatar src={currentUser!.photoURL} size={'sm'} />}
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
