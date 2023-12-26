import { Heading, Flex, useColorModeValue, Avatar } from '@chakra-ui/react'
import { BiLogOut } from 'react-icons/bi'
import { AiFillHome } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { FaRegHeart } from 'react-icons/fa'
import SidebarItem from '../sidebar-item/sidebar-item.component'

export default function Sidebar() {
  const borderColor = useColorModeValue('gray.100', 'whiteAlpha.300')
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
        padding={5}
      >
        <Heading
          size={'xl'}
          marginBottom={5}
          fontWeight={'500'}
          display={{ base: 'none', lg: 'block' }}
        >
          Catsta
        </Heading>
        <SidebarItem Icon={<AiFillHome size={25} />} text='Home' />
        <SidebarItem Icon={<FaSearch size={25} />} text='Search' />
        <SidebarItem Icon={<FaRegSquarePlus size={25} />} text='Create' />
        <SidebarItem Icon={<FaRegHeart size={25} />} text='Notification' />
        <SidebarItem Icon={<Avatar src={''} size={'sm'} />} text='Profile' />
      </Flex>
      <Flex direction={'column'} alignItems={'center'} gap={15} padding={5}>
        <SidebarItem Icon={<BiLogOut size={24} />} text='Logout' />
      </Flex>
    </Flex>
  )
}
