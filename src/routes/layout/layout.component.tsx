import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/sidebar.component'
import ErrorBoundary from '../error-boundary/error-boundary'
import Error from '../error-boundary/error'

export default function Layout() {
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
