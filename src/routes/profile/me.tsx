import { Suspense } from 'react'
import UserLoader from './user-loader'
import MyProfile from './my-profile'

export default function Me() {
  return (
    <Suspense fallback={<UserLoader />}>
      <MyProfile />
    </Suspense>
  )
}
