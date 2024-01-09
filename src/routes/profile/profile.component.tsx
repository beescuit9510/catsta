import { Stack } from '@chakra-ui/react'
import ProfileTabs from '../../components/profile/profile-tab/profile-tabs.component'
import { Suspense } from 'react'
import ProfileHeaderLoader from '../../components/profile/profile-header/profile-header-loader.component'
import ProfileHeader from '../../components/profile/profile-header/profile-header'
import Error from '../error-boundary/error.component'
import PageContainer from '../../components/common/page-container/page-container.component'

export default function Profile() {
  // TODO: delete post
  // TODO: delete comment

  return (
    <PageContainer
      fallback={
        <Error>
          Sorry, an unexpected error has occurred in the profile page
        </Error>
      }
      size='lg'
    >
      <Stack spacing={10}>
        <Suspense fallback={<ProfileHeaderLoader />}>
          <ProfileHeader />
        </Suspense>

        <ProfileTabs />
      </Stack>
    </PageContainer>
  )
}
