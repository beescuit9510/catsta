import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/layout/sidebar/sidebar.component'
import ErrorBoundary from '../error-boundary/error-boundary.component'
import Error from '../error-boundary/error.component'
import { useUser } from '../../hooks/queries/useUser'
import { auth } from '../../utils/firebase'

export default function Layout() {
  // TODO: change to Prefetch
  useUser(auth.currentUser!.uid)

  return (
    <>
      <Flex>
        <Box w={{ base: '70px', lg: '240px' }}>
          <Sidebar />
        </Box>
        <Box flex={1} w={{ base: 'calc(100%-70px)', lg: 'calc(100%-240px)' }}>
          <ErrorBoundary fallback={<Error />}>
            <Outlet />
          </ErrorBoundary>
        </Box>
      </Flex>
    </>
  )
}

// <Flex overflow={'hidden'}>
//   <Outlet />
// </Flex>
// <Flex
//   height={'10'}
//   bg={'white'}
//   position={'sticky'}
//   bottom={0}
//   px={{ base: 2, lg: 4 }}
//   direction={'row'}
// >
//   <Flex
//     flex={1}
//     alignItems={'center'}
//     justifyContent={'space-around'}
//     padding={5}
//   >
//     <SidebarItem Icon={<AiFillHome size={25} />} text='Home' />
//     <SidebarItem Icon={<FaSearch size={25} />} text='Search' />
//     <SidebarItem Icon={<FaRegSquarePlus size={25} />} text='Create' />
//     {/* <SidebarItem Icon={<FaRegHeart size={25} />} text='Notification' /> */}
//     <SidebarItem Icon={<Avatar src={''} size={'sm'} />} text='Profile' />
//     <SidebarItem Icon={<BiLogOut size={24} />} text='Logout' />
//   </Flex>
// </Flex>
