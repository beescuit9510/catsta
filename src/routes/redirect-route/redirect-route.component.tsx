import { useEffect, useState } from 'react'
import { auth } from '../../utils/firebase'
import { Outlet, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { Flex, Spinner } from '@chakra-ui/react'

export default function RedirectRoute() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (user) {
        navigate('/')
      } else {
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
