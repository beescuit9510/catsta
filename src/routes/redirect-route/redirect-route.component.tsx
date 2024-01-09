import { useEffect, useState } from 'react'
import { auth } from '../../utils/firebase'
import { Outlet, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { Flex, Spinner } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

export default function RedirectRoute() {
  const navigate = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)

      if (user && location.pathname === '/auth') {
        navigate('/')
      }
      if (!user && location.pathname === '/') {
        navigate('/auth')
      }
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <Flex minHeight={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <Spinner size='xl' />
      </Flex>
    )
  }

  return <Outlet />
}
