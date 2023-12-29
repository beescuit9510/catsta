import { Suspense } from 'react'
import UserLoader from './user-loader'
import { auth } from '../../utils/firebase'
import MyProfile from './my-profile'

export default function Me() {
  return (
    <Suspense fallback={<UserLoader />}>
      <MyProfile userId={auth.currentUser?.uid} />
    </Suspense>
  )
}
