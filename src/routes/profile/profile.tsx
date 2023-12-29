import { Suspense, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserLoader from './user-loader'
import UserProfile from './user-profile'
import ErrorBoundary from '../error-boundary/error-boundary'
import Error from '../error-boundary/error'
import { auth } from '../../utils/firebase'

export default function Profile() {
  const { userId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (userId === auth.currentUser?.uid) {
      navigate('/profile')
    }
  }, [])

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
