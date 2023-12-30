import { AuthError, signInWithPopup } from 'firebase/auth'
import { auth, firestore } from '../../utils/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useMutation } from '@tanstack/react-query'
import { GoogleAuthProvider } from 'firebase/auth'

async function createGoogleUser() {
  // TODO: filter already existing username (especially google and email,pw users should not have duplicates)
  // TODO: extract shared code between createGoogleUser and createUser
  // TODO: fix overwritting already existing google user
  // TODO: last seen
  return signInWithPopup(auth, new GoogleAuthProvider()).then(
    (userCredential) => {
      const { user } = userCredential
      const ref = `users/${user.uid}`
      setDoc(doc(firestore, ref), {
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        bio: user.displayName,
        posts: 0,
        followers: [],
        followings: [],
        createdAt: Date.now(),
      })
      return userCredential
    }
  )
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
