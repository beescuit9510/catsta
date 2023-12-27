import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'

export default function RedirectTo({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  const [user, loading, error] = useAuthState(auth)

  const navigate = useNavigate()

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <p>Error: {error.name}</p>
      </div>
    )
  }
  if (user) {
    navigate(to)
  }

  return <>{children}</>
}
