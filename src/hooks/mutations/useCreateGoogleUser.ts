import { signInWithPopup } from 'firebase/auth'
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

// Uncaught (in promise) Error: User is already in the firestore (google)

export default function useCreateGoogleUser() {
  return useMutation({
    mutationFn: createGoogleUser,
  })
}
