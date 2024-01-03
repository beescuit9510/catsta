import ErrorBoundary from '../error-boundary/error-boundary.component'
import Error from '../error-boundary/error.component'
import { Center, Container, Stack } from '@chakra-ui/react'
import ProfileTabs from '../../components/profile/profile-tab/profile-tabs.component'
import { Suspense } from 'react'
import ProfileHeaderLoader from '../../components/profile/profile-header/profile-header-loader.component'
import ProfileHeader from '../../components/profile/profile-header/profile-header'

export default function Profile() {
  return (
    <ErrorBoundary
      fallback={
        <Error errorMessage='Sorry, The user you are looking for are not found.'></Error>
      }
    >
      <Center marginY={20}>
        <Container maxW='container.lg'>
          <Stack spacing={10}>
            <Suspense fallback={<ProfileHeaderLoader />}>
              <ProfileHeader />
            </Suspense>

            <ProfileTabs />
          </Stack>
        </Container>
      </Center>
    </ErrorBoundary>
  )
}
