import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import ProfileLoader from '../../components/profile/profile-loader/profile-loader.component'
import UserProfile from './user-profile.component'
import ErrorBoundary from '../error-boundary/error-boundary.component'
import Error from '../error-boundary/error.component'
import { useCachedUser } from '../../hooks/queries/useUser'
import { auth } from '../../utils/firebase'
import Me from './me.component'

export default function Profile() {
  const { userId } = useParams()
  const currentUser = useCachedUser(auth.currentUser!.uid)

  return (
    <ErrorBoundary
      fallback={
        <Error errorMessage='Sorry, The user you are looking for are not found.'></Error>
      }
    >
      <Suspense fallback={<ProfileLoader />}>
        {currentUser?.id === userId ? <Me /> : <UserProfile userId={userId} />}
      </Suspense>
    </ErrorBoundary>
  )
}
