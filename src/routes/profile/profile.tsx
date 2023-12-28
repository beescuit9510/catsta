import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import UserLoader from './user-loader'
import UserProfile from './user-profile'

export default function Profile() {
  const { userId } = useParams()

  return (
    <Suspense fallback={<UserLoader />}>
      <UserProfile userId={userId} />
    </Suspense>
  )
}
