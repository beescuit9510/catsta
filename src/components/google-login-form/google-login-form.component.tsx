import { Button } from '@chakra-ui/react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { FcGoogle } from 'react-icons/fc'
import { auth } from '../../utils/firebase'

export default function GoogleLoginForm() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

  const signIn = () => {
    signInWithGoogle()
  }

  return (
    <Button onClick={signIn} isLoading={loading} leftIcon={<FcGoogle />}>
      Log in with Google
    </Button>
  )
}
