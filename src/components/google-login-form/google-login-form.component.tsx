import { Button } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import useLoginWithGoogle from '../../hooks/useLoginWithGoogle'

export default function GoogleLoginForm() {
  const { signIn, loading } = useLoginWithGoogle()

  return (
    <Button onClick={signIn} isLoading={loading} leftIcon={<FcGoogle />}>
      Log in with Google
    </Button>
  )
}
