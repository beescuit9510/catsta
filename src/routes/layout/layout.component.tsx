import { Box, Flex, Hide, Show } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/layout/sidebar/sidebar.component'
import ErrorBoundary from '../error-boundary/error-boundary.component'
import MobileTopBar, {
  MobileBottomBar,
} from '../../components/layout/mobile-bar/mobile-bar.component'

export default function Layout() {
  return (
    <>
      <Show above='md'>
        <Flex>
          <Box w={{ base: '70px', lg: '240px' }}>
            <Sidebar />
          </Box>

          <Box flex={1} w={{ base: 'calc(100%-70px)', lg: 'calc(100%-240px)' }}>
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </Box>
        </Flex>
      </Show>

      <Hide above='md'>
        <MobileTopBar />

        <Flex overflow={'hidden'} minH={'100vh'}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Flex>

        <MobileBottomBar />
      </Hide>
    </>
  )
}
