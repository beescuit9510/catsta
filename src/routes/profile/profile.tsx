import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import ProfileSkeleton from './profile-skeleton'
import ProfileDetail from './profile-detail'

export default function Profile() {
  const { userId } = useParams()
  if (!userId) throw new Error(`User ${userId}'s ID is not found`)

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileDetail userId={userId} />
    </Suspense>
  )
}
