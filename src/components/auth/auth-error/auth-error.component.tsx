import { FormControl, FormErrorMessage } from '@chakra-ui/react'
import { AuthError, AuthErrorCodes } from 'firebase/auth'
import useShowToast from '../../../hooks/useShowToast'
import { useEffect } from 'react'

const AuthErrorCodeMessage: { [key: string]: string } = {
  [AuthErrorCodes.INVALID_EMAIL]: 'Given email is not valid',
  [AuthErrorCodes.EMAIL_EXISTS]: 'Given email is already in use',
  [AuthErrorCodes.INVALID_LOGIN_CREDENTIALS]:
    'Given email or password is wrong. Please try again',
} as const

export default function AuthFormError({
  isError,
  error,
}: {
  isError: boolean
  error: Error | AuthError | null
}) {
  const message =
    error! && 'code' in error
      ? AuthErrorCodeMessage[error.code]
      : error?.message

  const toast = useShowToast()

  useEffect(() => {
    if (isError && message) toast('error', message)
  }, [isError])

  return (
    <FormControl isInvalid={isError}>
      <FormErrorMessage>{message}</FormErrorMessage>
    </FormControl>
  )
}
