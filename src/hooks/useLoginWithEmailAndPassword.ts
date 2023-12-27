import { ErrorMessage } from '../utils/constant'
import { auth } from '../utils/firebase'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'

export default function useLoginWithEmailAndPassword() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth)

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(email, password)

  return {
    signIn,
    user,
    loading,
    error: error !== undefined,
    errorMessage:
      error !== undefined
        ? ErrorMessage[error.code] ?? error.message
        : undefined,
  }
}
