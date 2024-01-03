import { AuthError, signInWithPopup } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useMutation } from '@tanstack/react-query'
import { GoogleAuthProvider } from 'firebase/auth'
import { setUserDoc } from './common/setUserDoc'

async function createGoogleUser() {
  return signInWithPopup(auth, new GoogleAuthProvider())
    .then(({ user }) =>
      setUserDoc({ id: user.uid, displayName: user.displayName })
    )
    .catch((error) => {
      // TODO: error handling
      if (error.message !== 'User is already in the firestore') throw error
    })
}

export default function useCreateGoogleUser() {
  return useMutation({
    mutationFn: createGoogleUser,
    // onSuccess: (userCredential) => {},
    onError: (error: Error | AuthError) => {
      // TODO: firebase ERROR HANDLING
      // ErrorMessage[error.code] : error.message
      return error.message
    },
  })
}
