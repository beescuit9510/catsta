import { Button } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import useCreateGoogleUser from '../../../hooks/mutations/useCreateGoogleUser'

export default function GoogleLoginForm() {
  const { mutate, isPending } = useCreateGoogleUser()

  return (
    <Button
      onClick={() => mutate()}
      isLoading={isPending}
      isDisabled={isPending}
      leftIcon={<FcGoogle />}
    >
      Log in with Google
    </Button>
  )
}
