import { auth } from '../../utils/firebase'
import { useMutation } from '@tanstack/react-query'
import { AuthError, signInWithEmailAndPassword } from 'firebase/auth'

async function login(email: string, password: string) {
  if (!email) throw new Error('Email is required')
  if (!password) throw new Error('Password is required')

  // TODO: last seen
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => userCredential
  )
}

export function useLogin({
  email,
  password,
}: {
  email: string
  password: string
}) {
  return useMutation({
    mutationFn: () => login(email, password),
    // onSuccess: (userCredential) => {},
    onError: (error: Error | AuthError) => {
      // TODO: firebase ERROR HANDLING
      // ErrorMessage[error.code] : error.message
      return error.message
    },
  })
}
