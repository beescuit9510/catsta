import { Button, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import useCreateGoogleUser from '../../../hooks/mutations/useCreateGoogleUser'

export default function GoogleLoginForm() {
  const { mutate, isPending, isError, error } = useCreateGoogleUser()

  return (
    <>
      <Button
        onClick={() => mutate()}
        isLoading={isPending}
        isDisabled={isPending}
        leftIcon={<FcGoogle />}
      >
        Log in with Google
      </Button>
      <FormControl isInvalid={isError}>
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    </>
  )
}
