import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import UserLoader from './user-loader'
import UserProfile from './user-profile'
import ErrorBoundary from '../error-boundary/error-boundary'
import Error from '../error-boundary/error'

export default function Profile() {
  const { userId } = useParams()

  return (
    <ErrorBoundary
      fallback={
        <Error errorMessage='Sorry, The user you are looking for are not found.'></Error>
      }
    >
      <Suspense fallback={<UserLoader />}>
        <UserProfile userId={userId} />
      </Suspense>
    </ErrorBoundary>
  )
}
