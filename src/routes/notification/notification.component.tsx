import { Stack } from '@chakra-ui/react'
import Error from '../error-boundary/error.component'
import PageContainer from '../../components/common/page-container/page-container.component'
import { Suspense } from 'react'
import NotificationList from '../../components/notification/notification-list/notification-list'
import NotificationLoader from '../../components/notification/notification-loader/notification-loader'

export default function Notificiation() {
  return (
    <PageContainer
      fallback={
        <Error>
          Sorry, an unexpected error has occurred in the notification page
        </Error>
      }
    >
      <Stack flex={1}>
        <Suspense fallback={<NotificationLoader length={3} />}>
          <NotificationList />
        </Suspense>
      </Stack>
    </PageContainer>
  )
}
