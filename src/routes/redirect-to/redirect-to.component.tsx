import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { Flex, Spinner } from '@chakra-ui/react'
import Error from '../error-boundary/error.component'

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
      <Flex minHeight={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <Spinner size='xl' />
      </Flex>
    )
  }
  if (error) {
    return <Error errorMessage={error.message} />
  }
  if (user) {
    navigate(to)
  }

  return <>{children}</>
}
